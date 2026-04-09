# Executable MVP Implementation Spec — Appointment No-Show Reducer (Calendly + Twilio Two-Way SMS)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T21:32:21.992Z

---

Goal
Deploy an MVP web app that (1) ingests upcoming appointments from Calendly, (2) sends reminder SMS at 48h + 4h with Y=confirm / R=reschedule, (3) parses inbound replies for core intents, (4) sends reschedule link when needed, (5) fills openings via waitlist first-come claim, (6) logs events for analytics.

Constraints (MVP)
- Calendar: Calendly only (one connected Calendly org/user per location).
- Phone: one Twilio number per location.
- Admin UI: single location setup, templates, basic analytics.
- Concierge-friendly: if a step is uncertain, log + alert admin rather than fail silently.

System Overview
Components
1) Web app (Replit-hosted) with:
- Public webhooks: /webhooks/calendly, /webhooks/twilio/inbound
- Admin pages: /admin/location, /admin/templates, /admin/analytics
2) Background job/cron:
- Poll upcoming appointments and schedule reminders
- Send due reminders and follow-ups
3) DB (Postgres/SQLite depending on current stack) storing locations, appointments, waitlist entries, message logs, events.

Data Model (tables)
locations
- id (pk)
- name
- timezone (e.g., "America/New_York")
- twilio_phone (E.164)
- twilio_account_sid (optional if multi-acct later)
- calendly_org_uri
- calendly_user_uri (optional)
- calendly_webhook_secret (or signing key / token depending on Calendly version)
- reschedule_base_url (usually Calendly scheduling link)
- created_at

patients (or contacts)
- id
- location_id
- name (nullable)
- phone_e164 (unique per location)
- created_at

appointments
- id
- location_id
- calendly_event_uri (unique)
- calendly_invitee_uri (unique)
- start_time_utc
- end_time_utc
- status ENUM('scheduled','confirmed','reschedule_requested','canceled','completed','no_show','unknown')
- patient_id
- last_reminder_48h_at (nullable)
- last_reminder_4h_at (nullable)
- confirmed_at (nullable)
- canceled_at (nullable)
- reschedule_requested_at (nullable)
- created_at
- updated_at

waitlist
- id
- location_id
- patient_id
- active BOOLEAN
- created_at

waitlist_offers
- id
- location_id
- appointment_id (the opening)
- offered_to_patient_id
- status ENUM('offered','claimed','expired')
- claim_token (random)
- offered_at
- expires_at

messages
- id
- location_id
- direction ENUM('outbound','inbound')
- to_phone
- from_phone
- body
- provider ENUM('twilio')
- provider_message_sid (unique nullable)
- appointment_id (nullable)
- patient_id (nullable)
- created_at

events (analytics)
- id
- location_id
- appointment_id (nullable)
- patient_id (nullable)
- type ENUM(
  'APPT_CREATED','APPT_UPDATED','REMINDER_SENT_48H','REMINDER_SENT_4H',
  'INBOUND_CONFIRM','INBOUND_RESCHEDULE','INBOUND_CANCEL','INBOUND_LATE','INBOUND_STOP','INBOUND_UNKNOWN',
  'RESCHEDULE_LINK_SENT','WAITLIST_TRIGGERED','WAITLIST_OFFER_SENT','WAITLIST_CLAIMED','WAITLIST_EXPIRED'
)
- meta_json (string/json)
- created_at

Idempotency / dedupe
- calendly_event_uri unique
- calendly_invitee_uri unique
- messages.provider_message_sid unique
- For Twilio inbound: dedupe by MessageSid

Core Flows

A) Calendly Ingest (Webhook)
Endpoint: POST /webhooks/calendly
Responsibilities:
1) Verify webhook signature (Calendly signing secret) if available.
2) Handle event types: invitee.created, invitee.canceled (and/or event.created depending on payload).
3) Upsert patient by phone (from invitee questions or custom fields; if not present, store placeholder and mark appointment "unknown" and log for concierge).
4) Upsert appointment with start/end times, URIs, status.
5) Log events APPT_CREATED/APPT_UPDATED.

Pseudo-logic
- Parse payload -> get event_uri, invitee_uri, start_time, end_time, invitee phone.
- location resolved via calendly_org_uri or webhook subscription mapped to location.
- if invitee phone missing: create appointment with status='unknown'; log meta "missing phone".
- else upsert patient; create appointment scheduled.

B) Reminder Scheduler (Cron/Worker)
Job runs every 5 minutes.
1) Fetch appointments status in ('scheduled','confirmed','reschedule_requested') where start_time_utc between now and now+72h.
2) For each appointment:
- If start_time - now within 48h window and last_reminder_48h_at null: send 48h reminder.
- If start_time - now within 4h window and last_reminder_4h_at null: send 4h reminder.
3) Log reminder events.

Message templates (MVP defaults)
48h reminder:
"Hi {firstName}, reminder of your appointment on {date} at {time}. Reply Y to confirm or R to reschedule."
4h reminder:
"Reminder: appointment today at {time}. Reply Y to confirm or R to reschedule."
STOP compliance:
"You’re opted out and won’t receive SMS from us. Reply START to re-enable."

C) Twilio Inbound (Two-way)
Endpoint: POST /webhooks/twilio/inbound
- Twilio sends form-encoded: From, To, Body, MessageSid.
Steps:
1) Deduplicate by MessageSid.
2) Resolve location by To (the Twilio number).
3) Resolve patient by From; if none, create patient.
4) Find nearest upcoming appointment for that patient+location in next 7 days (status not canceled) OR allow appointment_id in message context if you include short code later (MVP: nearest).
5) Parse intent.

Intent parsing (minimal AI + rules)
First pass: rule-based normalized body:
- confirm: body in ["y","yes","confirm","confirmed"]
- reschedule: contains ["r","resched","reschedule","change","move"]
- cancel: contains ["cancel","c"]
- late: contains ["late","running late","on my way"]
- stop: equals "stop" or contains "stop"
- start: equals "start"
Fallback: if unknown, call a lightweight LLM intent classifier ONLY if free tier exists; otherwise log unknown and ask a clarifying question.

Responses
- Confirm: mark appointment status='confirmed', confirmed_at=now; log INBOUND_CONFIRM; reply: "Confirmed. See you then!"
- Reschedule: mark status='reschedule_requested'; log INBOUND_RESCHEDULE; send reschedule link: "No problem—reschedule here: {reschedule_base_url}"
- Cancel: mark status='canceled'; log INBOUND_CANCEL; reply: "Canceled. Reply R to reschedule anytime." Then trigger waitlist fill for that slot.
- Late: log INBOUND_LATE; reply: "Thanks—drive safe. We’ll note you’re running late." (no calendar change in MVP)
- Stop: mark patient opted_out (add patients.opted_out boolean if needed); log INBOUND_STOP; reply STOP compliance message.
- Unknown: log INBOUND_UNKNOWN; reply: "Reply Y to confirm or R to reschedule." (keep narrow)

D) Waitlist Fill on Opening
Trigger conditions:
- Appointment canceled OR admin marks open slot (optional later).
MVP strategy:
1) Identify opening window: start_time_utc and duration.
2) Pull active waitlist patients for location.
3) Offer to top N (e.g., first 10) sequentially or small batches.
4) First-come claim: each offer includes unique token.

Outbound offer message
"A spot opened on {date} at {time}. Reply YES to claim it."
(MVP token-less is risky; better: "Reply YES {code}" where code is 4-6 chars.)
Example:
"A spot opened today at 3:00pm. Reply YES 4K7P to claim it."

Claim handling (via Twilio inbound)
- If body matches YES + token:
  - acquire lock: ensure waitlist_offers.status='offered' and not expired; update to claimed atomically.
  - confirm to claimer: "You got it—booked." (MVP booking action: send Calendly scheduling link pre-filled if possible; otherwise notify admin/concierge)
  - mark other offers expired.
- If token invalid/expired: reply "Sorry, that slot was taken. We’ll text you next opening."

Locking / concurrency
- Use DB transaction:
  UPDATE waitlist_offers
  SET status='claimed'
  WHERE id=? AND status='offered' AND expires_at>now();
  Check affected rows == 1 => success.

E) Analytics View (Minimal)
Admin endpoint: GET /admin/analytics
Compute per location in date range:
- reminders sent counts
- confirmations count
- reschedule requests count
- cancels count
- waitlist claims count
- estimated revenue recovered = waitlist_claims * avg_appt_value (set per location) OR confirmations delta vs baseline (MVP: manual avg_appt_value input).

Admin UI (Minimum Pages)
1) /admin/location
- Fields: location name, timezone, twilio phone (display), calendly org/user URI, reschedule link, avg appointment value.
2) /admin/templates
- Editable text for 48h, 4h, reschedule message, waitlist offer.
3) /admin/analytics
- Table + simple chart optional.

Environment Variables
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_MESSAGING_SERVICE_SID (optional) or use from number per location
- CALENDLY_API_TOKEN (for subscription mgmt if needed)
- CALENDLY_WEBHOOK_SIGNING_KEY (if using)
- APP_BASE_URL (used for webhook URLs)

Deployment Checklist (Replit)
1) Ensure HTTPS public URL is stable.
2) Configure Twilio webhook for inbound SMS to: {APP_BASE_URL}/webhooks/twilio/inbound
3) Configure Calendly webhook subscription to: {APP_BASE_URL}/webhooks/calendly
4) Create one location record (admin).
5) Create test appointment in Calendly with phone.
6) Verify ingest -> reminders -> reply Y/R -> logs -> analytics.

Customer-legitimacy references (for outreach / onboarding)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact email for pilots: agent_bob_replit+no-show-bot@agentmail.to

MVP Acceptance Tests
1) New Calendly booking with phone creates appointment and schedules reminders.
2) 48h reminder sends with Y/R.
3) Reply Y marks confirmed and logs.
4) Reply R sends reschedule link and logs.
5) Cancel triggers waitlist offers; first YES+token wins; logs reflect claimed.
6) Analytics page shows counts and estimated recovered revenue.