# MVP Implementation Pack (Calendly + Twilio): Routes, Schema, Jobs, and Core Code Scaffolding

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:16:31.608Z

---

Below is a build-ready implementation pack for the Appointment No-Show Reducer MVP (Calendly-first, one location, one Twilio number). It is designed for a Node/Express web app with a Postgres DB (or SQLite with minor adjustments). Replace pieces to match the existing Replit codebase structure.

GOAL (Pilot-ready scope)
- Ingest upcoming appointments from Calendly via webhooks.
- Send SMS reminders at 48h + 4h with options: Reply Y=confirm, R=reschedule, N=cancel.
- Two-way inbound parsing for intents: confirm, cancel, reschedule, late, stop.
- Reschedule: send a short reschedule link (Calendly reschedule URL if available; else generic scheduling link).
- Waitlist fill: if slot opens, text waitlist contacts “Reply YES to claim”; first YES wins; log outcome.
- Analytics: event log + simple metrics per location.

SYSTEM OVERVIEW
- Web server (Express): REST endpoints + webhook receivers
- DB tables: locations, appointments, waitlist, conversations/messages, events
- Background job: runs every minute to send due reminders + waitlist claim expirations

ENV VARS
- BASE_URL=https://<your-deployed-domain>
- DATABASE_URL=...
- TWILIO_ACCOUNT_SID=...
- TWILIO_AUTH_TOKEN=...
- TWILIO_FROM_NUMBER=+1XXXXXXXXXX (per-location supported via DB override)
- CALENDLY_WEBHOOK_SIGNING_KEY=... (Calendly webhook signing key)
- CALENDLY_DEFAULT_SCHEDULING_LINK=https://calendly.com/<org>/<event>

DB SCHEMA (SQL)

-- locations: one phone number + templates per location
CREATE TABLE locations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'America/New_York',
  twilio_from_number TEXT NOT NULL,
  calendly_org_uri TEXT,
  calendly_user_uri TEXT,
  default_scheduling_link TEXT,
  reminder_template_48h TEXT NOT NULL,
  reminder_template_4h TEXT NOT NULL,
  waitlist_template TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- appointments: created from calendly events
CREATE TABLE appointments (
  id TEXT PRIMARY KEY,
  location_id TEXT NOT NULL REFERENCES locations(id),
  external_source TEXT NOT NULL DEFAULT 'calendly',
  external_event_uri TEXT UNIQUE,
  invitee_uri TEXT,
  customer_name TEXT,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  status TEXT NOT NULL DEFAULT 'scheduled', -- scheduled|confirmed|cancelled|reschedule_requested|no_show
  confirmation_status TEXT NOT NULL DEFAULT 'unconfirmed', -- unconfirmed|confirmed|declined
  last_outbound_at TIMESTAMP,
  last_inbound_at TIMESTAMP,
  reminder_48h_sent_at TIMESTAMP,
  reminder_4h_sent_at TIMESTAMP,
  reschedule_url TEXT,
  cancel_url TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_appointments_location_start ON appointments(location_id, start_time);
CREATE INDEX idx_appointments_phone_start ON appointments(customer_phone, start_time);

-- waitlist: contacts who want earlier slot
CREATE TABLE waitlist (
  id TEXT PRIMARY KEY,
  location_id TEXT NOT NULL REFERENCES locations(id),
  name TEXT,
  phone TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_waitlist_location_active ON waitlist(location_id, active);

-- waitlist_claims: race control for first-come claims
CREATE TABLE waitlist_claims (
  id TEXT PRIMARY KEY,
  location_id TEXT NOT NULL REFERENCES locations(id),
  appointment_id TEXT REFERENCES appointments(id),
  slot_start TIMESTAMP NOT NULL,
  slot_end TIMESTAMP,
  status TEXT NOT NULL DEFAULT 'open', -- open|claimed|expired
  claimed_by_phone TEXT,
  claimed_at TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_waitlist_claims_open ON waitlist_claims(location_id, status, expires_at);

-- messages: raw inbound/outbound SMS logs
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  location_id TEXT REFERENCES locations(id),
  appointment_id TEXT REFERENCES appointments(id),
  direction TEXT NOT NULL, -- inbound|outbound
  from_phone TEXT,
  to_phone TEXT,
  body TEXT,
  provider TEXT DEFAULT 'twilio',
  provider_message_sid TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- events: analytics event stream
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  location_id TEXT NOT NULL REFERENCES locations(id),
  appointment_id TEXT REFERENCES appointments(id),
  type TEXT NOT NULL, -- appointment_ingested|reminder_sent|inbound_received|confirmed|cancelled|reschedule_requested|stop|waitlist_blast|waitlist_claimed|waitlist_expired
  meta JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_events_location_type_time ON events(location_id, type, created_at);

ROUTES (SERVER)

1) Calendly Webhook Ingest
POST /webhooks/calendly
- Verify signature using CALENDLY_WEBHOOK_SIGNING_KEY
- Handle events: invitee.created, invitee.canceled (minimum)
- Upsert appointment using event payload fields

2) Twilio Inbound SMS
POST /webhooks/twilio/inbound
- Parse From, To, Body, MessageSid
- Identify location by To (twilio_from_number)
- Find nearest upcoming appointment for From within ±7 days (or most recent scheduled)
- Parse intent (confirm/cancel/reschedule/late/stop)
- Update appointment + send response SMS

3) Admin API (minimal)
GET /api/location/:id/analytics
POST /api/location (create)
PATCH /api/location/:id (templates, scheduling link, timezone)
GET /api/location/:id/appointments?from=...&to=...
POST /api/location/:id/waitlist (add contact)

4) Waitlist Claim
POST /webhooks/twilio/claim
(Alternative: reuse /webhooks/twilio/inbound to detect “YES” and open claim)
- On “YES”, atomically claim the open waitlist_claims row.

BACKGROUND JOBS

A) Reminder Scheduler (every minute)
- Query appointments where status in (scheduled, confirmed) and reminder_X not sent and start_time within window
  - 48h reminder: start_time between now+47h and now+49h (or exact due time calculation)
  - 4h reminder: start_time between now+3h50m and now+4h10m
- Send SMS and mark reminder_X_sent_at
- Log event reminder_sent

B) Waitlist Claim Expirer (every minute)
- For open waitlist_claims where expires_at < now, mark expired and log waitlist_expired

CORE HELPERS (CODE SCAFFOLDING)

A) Intent Parsing (basic “AI-like” rules)

function parseIntent(bodyRaw) {
  const body = (bodyRaw || '').trim().toLowerCase();
  if (!body) return { intent: 'unknown' };

  // STOP compliance
  if (/(^stop$|^unsubscribe$|^cancel$|^end$|^quit$)/i.test(body)) return { intent: 'stop' };

  // Confirm
  if (/^(y|yes|confirm|confirmed|ok|okay|k)$/i.test(body)) return { intent: 'confirm' };

  // Reschedule
  if (/^(r|resched|reschedule|change|move)$/i.test(body) || body.includes('resched')) {
    return { intent: 'reschedule' };
  }

  // Cancel appointment (distinct from STOP)
  if (/^(n|no|cancel appt|cancel appointment|cannot make|can\'t make)$/i.test(body) || body.includes("can't")) {
    return { intent: 'cancel_appt' };
  }

  // Late
  if (body.includes('late') || body.includes('running late') || body.includes('behind')) {
    return { intent: 'late' };
  }

  // Waitlist claim
  if (/^(yes|y)$/i.test(body)) return { intent: 'maybe_claim' };

  return { intent: 'unknown' };
}

B) Twilio Send SMS

import twilio from 'twilio';
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSms({ from, to, body }) {
  const msg = await client.messages.create({ from, to, body });
  return msg; // contains sid
}

C) Calendly Webhook Verification (outline)
Calendly uses a signing key and signature header. Implement per Calendly docs:
- Get raw request body bytes
- Compute HMAC SHA256 with signing key
- Compare to signature header

import crypto from 'crypto';

function verifyCalendlySignature({ rawBody, signatureHeader, signingKey }) {
  const computed = crypto.createHmac('sha256', signingKey).update(rawBody).digest('hex');
  // Depending on Calendly format, may be prefixed; normalize accordingly.
  return timingSafeEqualHex(computed, signatureHeader);
}

D) Appointment Matching by Phone
- Normalize phone to E.164 when possible
- Query nearest upcoming appointment: where customer_phone = From and start_time between now-1day and now+14days order by start_time asc limit 1

E) Reminder Templates (default copy)
48h: "Hi {{first_name}} — reminder of your appointment on {{date}} at {{time}}. Reply Y to confirm or R to reschedule."
4h:  "Hi {{first_name}} — see you at {{time}} today. Reply Y to confirm, R to reschedule, or N to cancel."
Waitlist blast: "A spot opened at {{time}} today. Reply YES to claim it. First to reply gets it."

WAITLIST FILL LOGIC (NARROW MVP)
Trigger: when appointment becomes cancelled OR reschedule_requested (slot potentially opens)
1) Create waitlist_claims row with slot_start/end and expires_at=now+15min status=open
2) Blast active waitlist contacts for that location with template (log waitlist_blast)
3) On inbound “YES”, attempt atomic claim:
   UPDATE waitlist_claims
   SET status='claimed', claimed_by_phone=$from, claimed_at=now
   WHERE id=$claimId AND status='open' AND expires_at>now
   RETURNING *;
4) If claimed: send winner message with scheduling link (or manual instructions)
5) Notify others (optional MVP): “Sorry, that slot was claimed.” (can skip)

RESCHEDULE FLOW (NARROW MVP)
- When intent=reschedule:
  1) set appointment.status='reschedule_requested'
  2) send SMS: "No problem—reschedule here: {{link}}" where link is appointment.reschedule_url OR location.default_scheduling_link
  3) optionally cancel old event via Calendly (skip for MVP; staff handles if needed)

ANALYTICS (MINIMAL VIEW)
Compute per location over last 7/30 days:
- reminders_sent = count(events where type='reminder_sent')
- confirmations = count(type='confirmed')
- reschedule_requests = count(type='reschedule_requested')
- cancellations = count(type='cancelled')
- waitlist_claimed = count(type='waitlist_claimed')
- estimated_recovered = confirmations * (avg_appt_value) (avg_appt_value can be a location setting later; for MVP show counts only)

MINIMAL ADMIN UI (ONE PAGE)
- Location setup: name, timezone, twilio_from_number, default_scheduling_link
- Templates: 48h reminder, 4h reminder, waitlist
- Analytics: cards + basic table of recent events

WEBHOOK URLS TO CONFIGURE
- Calendly: POST {BASE_URL}/webhooks/calendly
- Twilio Messaging webhook: POST {BASE_URL}/webhooks/twilio/inbound

TEST PLAN (END-TO-END)
1) Create location row with twilio_from_number and templates.
2) Create a Calendly event type and webhook subscription for invitee.created/canceled.
3) Book an appointment with phone number.
4) Confirm appointment ingested in DB and event appointment_ingested logged.
5) Fast-forward start_time to within 4h in DB (for test) and run reminder job; verify SMS out and reminder_sent event.
6) Reply “Y” from the test phone; verify appointment.confirmation_status=confirmed and confirmation response SMS.
7) Reply “R”; verify reschedule_requested and reschedule link sent.
8) Cancel appointment (via Calendly webhook invitee.canceled) and ensure waitlist blast created; reply YES from a waitlist number; verify claim and messaging.

NOTES / PILOT CONCIERGE OPTION
If Calendly reschedule/cancel URLs are not easily accessible in webhook payloads, the MVP can use a single location.default_scheduling_link and rely on staff to handle cleanup. This still demonstrates measurable no-show reduction in a pilot.

Customer-facing legitimacy references (for templates/docs)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to
