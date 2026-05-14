# MVP Implementation Spec (Build-Ready): Appointment No-Show Reducer — Calendly + Twilio Two-Way SMS

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T06:49:24.542Z

---

# Goal
Deploy a narrow MVP that reduces appointment no-shows by sending SMS reminders, collecting two-way confirmations, handling reschedule/cancel intents, and filling newly-opened slots from a waitlist. Scope: **Calendly only** (1 connected Calendly account per location), **1 Twilio number per location**, minimal admin UI.

Business proof URL to share with pilots: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

---

## 1) Architecture (minimal)
- Web app (existing Replit app) with:
  - REST endpoints for **Calendly webhooks** and **Twilio inbound SMS**.
  - A small admin UI (location config + analytics).
- Background job/cron:
  - Runs every 1–5 minutes to enqueue/send reminders and waitlist offers.
- Database:
  - Store locations, appointments, messages, waitlist entries, and events.

No paid infra required beyond whatever is already available. If no background worker exists, use a simple cron endpoint (e.g., `/api/jobs/tick`) hit by Replit scheduled task (free tier permitting) or a lightweight in-app interval if always-on.

---

## 2) Data model (tables)
Use Postgres/SQLite/Prisma—adapt to existing stack. Names below are generic.

### `locations`
- `id` (pk)
- `name`
- `timezone` (IANA string, e.g., `America/Chicago`)
- `twilio_phone` (E.164)
- `default_reminder_offsets_minutes` (json array, default `[2880, 240]` = 48h, 4h)
- `calendly_user_uri` (string)
- `calendly_org_uri` (string)
- `calendly_signing_key` (optional if using Calendly webhook signing verification)
- `created_at`, `updated_at`

### `appointments`
- `id` (pk)
- `location_id` (fk)
- `provider_name` (optional)
- `customer_name`
- `customer_phone` (E.164)
- `customer_email` (optional)
- `start_time` (UTC)
- `end_time` (UTC)
- `status` (enum: `scheduled|confirmed|cancelled|reschedule_requested|completed|no_show`)
- `external_type` (enum: `calendly`)
- `external_event_uri` (unique)
- `external_invitee_uri` (unique)
- `external_reschedule_url` (string)
- `last_reminder_sent_at` (UTC, nullable)
- `confirmation_received_at` (UTC, nullable)
- `cancelled_at` (UTC, nullable)
- `created_at`, `updated_at`

### `messages`
- `id` (pk)
- `location_id` (fk)
- `appointment_id` (fk nullable)
- `direction` (`outbound|inbound`)
- `to_phone`
- `from_phone`
- `body`
- `twilio_sid` (nullable)
- `status` (`queued|sent|delivered|failed|received`)
- `created_at`

### `waitlist_entries`
- `id` (pk)
- `location_id` (fk)
- `name`
- `phone` (E.164)
- `desired_service` (optional)
- `status` (`active|offered|claimed|expired|stopped`)
- `last_offered_at` (UTC, nullable)
- `created_at`, `updated_at`

### `waitlist_offers`
- `id` (pk)
- `location_id` (fk)
- `appointment_id` (fk)
- `slot_start_time` (UTC)
- `slot_end_time` (UTC)
- `status` (`open|claimed|expired`)
- `claimed_by_waitlist_entry_id` (fk nullable)
- `claim_token` (string unique)
- `expires_at` (UTC)
- `created_at`, `updated_at`

### `events` (analytics log)
- `id` (pk)
- `location_id` (fk)
- `appointment_id` (fk nullable)
- `type` (string; see list below)
- `payload_json`
- `created_at`

**Event types:**
- `appointment.ingested`
- `reminder.sent`
- `inbound.received`
- `appointment.confirmed`
- `appointment.reschedule_requested`
- `appointment.cancelled`
- `waitlist.offer_sent`
- `waitlist.claimed`
- `waitlist.claim_lost`
- `stop.opt_out`

---

## 3) External integrations

### 3.1 Calendly ingest (single calendar type)
We support Calendly via webhooks. Minimum needed:
- Subscribe to events: `invitee.created`, `invitee.canceled` (and optionally `invitee.rescheduled` if available in your plan/API version; otherwise treat reschedule as cancel+create).
- Store `event` + `invitee` URIs, start time, invitee name/phone.

**Phone number source:** Use invitee questions/custom fields. If not present, fall back to email and mark appointment `sms_unreachable` (optional) or skip.

### 3.2 Twilio SMS
- Outbound: send from location’s Twilio number to customer.
- Inbound: Twilio webhook hits `/api/twilio/inbound`.
- Respect STOP/UNSUBSCRIBE/HELP.

---

## 4) Core workflows

### 4.1 Appointment ingestion
**Endpoint:** `POST /api/webhooks/calendly`
- Verify signature if available (Calendly signing key or HMAC header).
- Parse payload.
- On `invitee.created`:
  - Upsert appointment by `external_invitee_uri`.
  - Set `status = scheduled`.
  - Persist `start_time/end_time`, customer data, `external_reschedule_url`.
  - Log `appointment.ingested`.
- On `invitee.canceled`:
  - Find appointment; set `status=cancelled`, `cancelled_at=now`.
  - Trigger waitlist fill (create `waitlist_offer` tied to this appointment slot).
  - Log `appointment.cancelled`.

### 4.2 Reminder sending (48h + 4h)
**Job:** runs every 1–5 minutes.
- Find appointments `status in (scheduled, confirmed)` with `start_time > now`.
- For each reminder offset (2880 and 240 minutes):
  - If `now` is within a small window (e.g., `start_time - offset ± 5 minutes`) and no prior reminder record exists for that offset, send.
- Store an event `reminder.sent` and a `messages` row.

**Reminder message template (default):**
“Hi {first_name} — reminder of your appointment on {date} at {time}. Reply Y to confirm or R to reschedule. Reply STOP to opt out.”

### 4.3 Two-way parsing (inbound intent)
**Endpoint:** `POST /api/twilio/inbound`
- Parse `From`, `To`, `Body`.
- Identify `location` by `To` (the Twilio number).
- Identify the relevant appointment:
  1) Find next upcoming appointment for this `From` within next 7 days at this location.
  2) If multiple, choose nearest start_time.
- Log `inbound.received`.

**Intent parsing (minimal, “basic AI” without spend):**
Rule-based first; optionally add lightweight local LLM later.
- Normalize body: trim, lowercase.
- STOP: if body contains `stop`, `unsubscribe`, `cancel sms` => mark waitlist entry and customer phone opted-out (can be a simple `opt_outs` table or `waitlist_entries.status=stopped` + location-level opt-out table). Respond: “You’re opted out. Reply START to opt back in.” Log `stop.opt_out`.
- Confirm: body in `[y, yes, yep, confirm, confirmed]` => set appointment `status=confirmed`, set `confirmation_received_at=now`. Reply: “Confirmed — see you then!” Log `appointment.confirmed`.
- Reschedule: body contains `r`, `reschedule`, `change`, `move` => set `status=reschedule_requested`. Reply with reschedule link: “Sure—use this link to pick a new time: {external_reschedule_url}”. Log `appointment.reschedule_requested`.
- Cancel: body contains `cancel`, `c` => set `status=cancelled`, trigger waitlist fill, reply: “Cancelled. If you’d like to rebook: {external_reschedule_url}”. Log `appointment.cancelled`.
- Running late: body contains `late`, `running late`, `behind` => reply: “Thanks—see you soon. Please arrive as soon as you can.” Log (optional) `appointment.late_notice`.
- Unknown: reply: “Reply Y to confirm, R to reschedule, or STOP to opt out.”

### 4.4 Reschedule flow (MVP)
Do not attempt to programmatically move the event initially.
- Use Calendly’s reschedule URL already tied to invitee.
- When a reschedule actually happens, Calendly will emit cancel/create events; ingestion updates the DB accordingly.

### 4.5 Waitlist fill flow
Trigger when a slot opens (appointment canceled) OR when a reschedule is requested (optional).

**Create offer:**
- Create `waitlist_offers` row with `status=open`, `expires_at = now + 15 minutes`, `claim_token` random.

**Broadcast:**
- Select N active waitlist entries (e.g., first 10) with `status=active`.
- Send: “A spot opened for {date} {time}. Reply YES to claim. First reply wins.”
- Log `waitlist.offer_sent` per message.

**Claim handling:** inbound “YES” from waitlist contact.
- Endpoint `/api/twilio/inbound` routes YES to waitlist claim if no matching upcoming appointment exists.
- Find latest open offer for that location not expired.
- Attempt atomic claim:
  - Transaction: if `offer.status=open` and `expires_at>now`, set `status=claimed`, `claimed_by_waitlist_entry_id=<id>`.
  - If success: reply “You got it. Book here: {calendly_link_for_slot_or_general_link}” (MVP uses general scheduling link; true slot reservation later). Mark entry `claimed`.
  - If fail: reply “Sorry—someone else just claimed it. We’ll text you next time.” Log `waitlist.claim_lost`.

**Important MVP compromise:** Without paid Calendly API features to reserve specific slots, we provide a booking link and rely on first-come plus short expiry window. For pilots, this is acceptable; later add true slot holds.

---

## 5) Admin UI (minimal)
Single page per location:
- Location name, timezone
- Twilio phone (read-only if provisioned)
- Calendly user/org URIs + webhook status
- Template editor (reminder message)
- Analytics cards:
  - Upcoming appointments count
  - Confirmed count
  - Reschedule requested count
  - Cancelled count
  - Waitlist claims
  - “Recovered revenue estimate” = (#confirmed + #waitlist_claimed) * avg_ticket (set per location, default $100)

---

## 6) Endpoint contracts (copy/paste friendly)

### `POST /api/webhooks/calendly`
**Headers:**
- `Content-Type: application/json`
- `Calendly-Webhook-Signature` (if provided by Calendly)

**Body example (simplified):**
```json
{
  "event": "invitee.created",
  "payload": {
    "event": {"uri": "https://api.calendly.com/scheduled_events/AAA", "start_time": "2026-05-15T17:00:00Z", "end_time": "2026-05-15T17:30:00Z"},
    "invitee": {"uri": "https://api.calendly.com/scheduled_events/AAA/invitees/BBB", "name": "Jane Doe", "email": "jane@example.com", "questions_and_answers": [{"question": "Phone", "answer": "+14155551234"}], "reschedule_url": "https://calendly.com/resched/..."}
  }
}
```
**Response:** `200 OK` quickly.

### `POST /api/twilio/inbound`
Twilio form-encoded fields:
- `From=+14155551234`
- `To=+1TWILIONUMBER`
- `Body=Y`
- `MessageSid=...`
Return TwiML:
```xml
<Response><Message>Confirmed — see you then!</Message></Response>
```

### `POST /api/jobs/tick` (protected with secret)
- Scans for reminders due; sends; logs.
- Scans for expired waitlist offers; marks expired.

---

## 7) Testing checklist (end-to-end)
1) Create a Calendly test event type with phone required.
2) Book an appointment for +your phone; verify webhook ingests appointment.
3) Manually set appointment start_time to 4h+2m from now in DB (for rapid test) or adjust offsets to 5 minutes.
4) Confirm reminder sends.
5) Reply “Y” and verify appointment status `confirmed` and event logs.
6) Reply “R” verify reschedule link is sent and status updated.
7) Cancel in Calendly; verify cancellation ingested; waitlist offer broadcast.
8) From a waitlist number reply YES; verify only first claimant wins.

---

## 8) Pilot operations notes (wartime/concierge)
- If phone capture in Calendly is inconsistent, add a required phone question and provide the setup instructions to pilot customers.
- If waitlist slot reservation isn’t strict, position it as “text blast to fill gaps quickly; first to rebook wins.”
- Keep all service free during week 1; onboard via support email agent_bob_replit+no-show-bot@agentmail.to and show legitimacy via the business URL above.
