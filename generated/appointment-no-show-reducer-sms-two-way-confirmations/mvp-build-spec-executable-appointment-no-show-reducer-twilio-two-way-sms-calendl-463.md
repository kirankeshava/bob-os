# MVP Build Spec (Executable) — Appointment No-Show Reducer (Twilio Two-Way SMS + Calendly + Waitlist Fill)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:18:01.749Z

---

## Goal (pilot-ready MVP)
Reduce appointment no-shows for a single location by sending two-way SMS reminders, collecting confirmations, handling reschedule/cancel intents, and filling canceled/open slots from a waitlist. Provide basic analytics (counts + estimated recovered revenue).

**Legitimacy link to share with pilot customers:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
**Business contact email:** agent_bob_replit+no-show-bot@agentmail.to

---

## Scope constraints (keep it shippable)
- Calendar source: **Calendly only** (one connected Calendly org/user per location).
- One Twilio phone number per location.
- Admin UI: one minimal page for (a) location setup, (b) template editing, (c) analytics table.
- No fancy auth: use a single admin password or a “magic link” later; for MVP assume one admin session.
- Reschedule: send **Calendly reschedule link** for the specific event; do not implement custom availability engine.
- Waitlist fill: first-come claim via SMS, then send booking link for the freed slot/service.

---

## Data model (DB tables)
Assume Postgres/SQLite; fields are minimal.

### `locations`
- `id` (pk)
- `name`
- `timezone` (IANA, e.g., `America/New_York`)
- `twilio_number` (E.164)
- `calendly_user_uri` (string)
- `calendly_webhook_signing_key` (string, if used)
- `created_at`

### `appointments`
Represents upcoming appointments we’ll message.
- `id` (pk)
- `location_id` (fk)
- `external_type` (enum: `calendly`)
- `external_id` (Calendly event UUID or URI hash)
- `invitee_uri` (string)
- `event_uri` (string)
- `start_time` (utc timestamp)
- `end_time` (utc timestamp)
- `customer_name` (string nullable)
- `customer_phone` (E.164)
- `status` (enum: `scheduled`, `canceled`, `completed`)
- `last_intent` (enum nullable: `confirm`, `reschedule`, `cancel`, `late`, `stop`, `unknown`)
- `confirmed_at` (timestamp nullable)
- `canceled_at` (timestamp nullable)
- `reschedule_link` (string nullable)
- `created_at`, `updated_at`

Indexes:
- (`location_id`, `start_time`)
- unique (`external_type`, `external_id`)

### `waitlist_contacts`
- `id` (pk)
- `location_id` (fk)
- `name` (nullable)
- `phone` (E.164)
- `active` (boolean default true)
- `created_at`

Unique: (`location_id`, `phone`)

### `waitlist_offers`
A record per opened slot blast.
- `id` (pk)
- `location_id`
- `appointment_id` (fk to the canceled/opened slot)
- `status` (enum: `open`, `claimed`, `expired`)
- `claimed_by_phone` (E.164 nullable)
- `claimed_at` (timestamp nullable)
- `expires_at` (timestamp)
- `created_at`

### `message_logs`
Every outbound/inbound SMS.
- `id` (pk)
- `location_id`
- `direction` (enum: `outbound`, `inbound`)
- `to_phone` / `from_phone`
- `body`
- `twilio_sid` (nullable)
- `appointment_id` (nullable)
- `waitlist_offer_id` (nullable)
- `created_at`

### `events`
Analytics/event sourcing.
- `id` (pk)
- `location_id`
- `type` (string: `reminder_sent`, `inbound_received`, `confirmed`, `reschedule_requested`, `cancel_requested`, `stop`, `waitlist_blast_sent`, `waitlist_claimed`, `appointment_canceled`, etc.)
- `appointment_id` (nullable)
- `metadata_json` (text/json)
- `created_at`

---

## External integrations
### Twilio
- Outbound: send SMS via REST API.
- Inbound: Twilio webhook hits `POST /webhooks/twilio/inbound`.
- Compliance: handle `STOP`/`UNSUBSCRIBE` by marking the phone as do-not-text (for MVP: store in `events` + optionally a `blocked_numbers` table).

### Calendly
- Webhooks: subscribe to `invitee.created`, `invitee.canceled` (optionally `invitee_no_show.created` if available).
- On invitee created: persist appointment and schedule reminders.
- On invitee canceled: mark appointment canceled and trigger waitlist offer.

---

## HTTP routes (server)
### Admin UI
- `GET /admin` → minimal UI page
- `GET /api/location` → fetch location config
- `POST /api/location` → update location fields (timezone, twilio_number, calendly_user_uri)
- `GET /api/templates` → message templates (stored in code or DB)
- `POST /api/templates` → update templates (optional; can be hardcoded for MVP)
- `GET /api/analytics?from=YYYY-MM-DD&to=YYYY-MM-DD` → counts + estimated saved revenue

### Webhooks
- `POST /webhooks/calendly` → ingest events
- `POST /webhooks/twilio/inbound` → ingest inbound SMS

### Internal jobs
- `POST /internal/jobs/send-reminders` (protected by secret) → runs reminder scan and sends due reminders

---

## Reminder logic (48h + 4h)
For each appointment with `status=scheduled` and `start_time` in future:
- Send first reminder at ~48h before start.
- Send second reminder at ~4h before start **only if not confirmed**.

Implementation: a cron/worker runs every 5 minutes.
Pseudo:
1) Find appointments where `start_time between now+47h55m and now+48h05m` and no `events.type=reminder_sent` with `metadata.reminder_type=48h`.
2) Send reminder SMS with Y/R options. Log message + event.
3) Find appointments where `start_time between now+3h55m and now+4h05m` and not confirmed and no 4h reminder event.

---

## Inbound intent parsing (basic + AI optional)
For MVP, do deterministic parsing first; AI can be added later.
Normalize inbound body: trim, lowercase.

Rules:
- If contains `stop`, `unsubscribe`, `cancel texts` → intent=`stop`.
- If body is exactly `y` or contains `yes`/`confirm` → intent=`confirm`.
- If contains `r` or `reschedule` or `move` → intent=`reschedule`.
- If contains `cancel` → intent=`cancel`.
- If contains `late` or `running late` → intent=`late`.
- Else intent=`unknown`.

Appointment matching:
- Match inbound `From` phone to nearest upcoming appointment within next 7 days for that location.
- If multiple, pick the soonest.

Actions:
- confirm: set `confirmed_at`, `last_intent=confirm`, emit event `confirmed`, reply confirmation text.
- reschedule: set `last_intent=reschedule`, reply with Calendly reschedule link (from invitee URI if available), emit event.
- cancel: mark appointment canceled locally; optionally call Calendly cancel endpoint later (MVP can just instruct them + record). Trigger waitlist offer.
- late: log event, reply “Thanks—see you soon” message.
- stop: record in blocked list; reply compliance confirmation.

---

## Reschedule flow
When intent=`reschedule`:
- Reply: “No problem—use this link to reschedule: {reschedule_link}”.
- Reschedule link source:
  - Prefer Calendly invitee reschedule URL if available.
  - Else send generic scheduling link configured for the location.
- When Calendly webhook later sends cancel/create, update appointment records.

---

## Waitlist fill flow (first-come claim)
Trigger conditions:
- Appointment canceled (via Calendly webhook or inbound cancel).

Steps:
1) Create `waitlist_offers` row with `status=open`, `expires_at=now+15min`, linked to `appointment_id`.
2) Text a batch of waitlist contacts (e.g., first 20 actives) message: “A spot opened at {time}. Reply YES to claim.”
3) Inbound YES handler:
   - Find open `waitlist_offers` for location where `expires_at>now` and appointment time still in future.
   - **Race control**: atomic update `status` from `open` to `claimed` where id=? and status='open'. Only one wins.
   - Winner gets reply: “You got it—book here: {booking_link}”. Others get: “That spot was just claimed—want the next one? Reply WAITLIST.”

Booking link:
- For MVP, link to location’s Calendly booking page (or event type). The “reserve exact slot” is hard; we accept that they book the next available. If strict slot reservation is required, that’s phase 2.

---

## Message templates (copy-ready)
Store as constants or DB rows.

1) 48h reminder:
“Hi {first_name}—reminder of your appointment on {date} at {time}. Reply Y to confirm or R to reschedule.”

2) 4h reminder (only if not confirmed):
“Checking in for today’s appointment at {time}. Reply Y to confirm or R to reschedule.”

3) Confirmed reply:
“Confirmed—see you at {time}. If you need to reschedule, reply R.”

4) Reschedule reply:
“Sure—please reschedule here: {reschedule_link}. If you need help, reply HELP.”

5) Cancel reply:
“Understood. Your appointment has been canceled. If you’d like to rebook, use {booking_link}.”

6) Running late reply:
“Thanks for the heads up—we’ve noted you may be running late. See you soon.”

7) STOP compliance reply:
“You’re opted out and will no longer receive texts. Reply START to re-subscribe.”

8) Waitlist blast:
“A spot just opened on {date} at {time}. Reply YES within 15 minutes to claim it.”

9) Waitlist claimed winner:
“You got it. Please book here now: {booking_link}. If you can’t make it, reply NO.”

10) Waitlist claimed loser:
“That spot was just claimed. Reply WAITLIST to stay on the list for the next opening.”

---

## Analytics (minimal but useful)
`GET /api/analytics` returns:
- reminders_sent_48h, reminders_sent_4h
- confirmations_count
- reschedule_requests_count
- cancellations_count
- waitlist_blasts_count
- waitlist_claims_count
- estimated_recovered_revenue = waitlist_claims_count * avg_appointment_value (configure a single number in UI)

UI should show:
- Last 50 events (time, type, appointment phone, metadata)
- Summary counts for last 7/30 days

---

## Deployment/testing checklist (no paid spend required to code; creds required to test)
1) Set env vars:
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`
- `TWILIO_WEBHOOK_SECRET` (optional)
- `CALENDLY_TOKEN`
- `INTERNAL_JOB_SECRET`
2) Configure Twilio Messaging webhook URL: `/webhooks/twilio/inbound`
3) Configure Calendly webhook to `/webhooks/calendly`
4) Create one test location (timezone + Twilio number + Calendly user URI)
5) Create a Calendly test booking with a real phone number; ensure invitee.created webhook creates `appointments` row.
6) Run reminder job manually via `/internal/jobs/send-reminders` and confirm outbound SMS + logs.
7) Reply Y/R/STOP and confirm intent handling.
8) Cancel appointment in Calendly; confirm waitlist offer + waitlist blast + claim race behavior.

---

## Notes on pilot operations (concierge allowed)
If calendar phone capture is inconsistent, do concierge import for first pilot: manually add appointments via a simple internal endpoint or CSV upload (optional). The MVP spec above assumes Calendly invitee phone is available in webhook payload.

This is the minimum shippable system to support first paid pilots while keeping engineering surface area tight and verifiable end-to-end.