# MVP Build Spec (Executable) — Appointment No‑Show Reducer (Calendly + Twilio Two‑Way SMS)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T19:50:57.812Z

---

Overview
This MVP reduces appointment no-shows by sending two-way SMS reminders and handling inbound replies to confirm/reschedule/cancel, plus a basic waitlist “fill gaps” flow. Scope is intentionally narrow for first pilots: Calendly as the only calendar source, one Twilio number per location, minimal admin UI (location setup, templates, analytics).

Public legitimacy assets to reference in onboarding/help text:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to

Architecture (minimal)
- Web app (existing Replit deployment) exposes:
  1) Calendly webhook endpoint to ingest appointments
  2) Twilio inbound webhook endpoint to receive SMS
  3) Background job/cron to send scheduled reminders
  4) Admin UI pages for one location’s settings + templates + analytics
- DB tables (Postgres/SQLite—keep SQL generic; adapt to existing ORM)
- One outbound sender abstraction that calls Twilio Messages API (or Twilio SDK)

Environment variables
- BASE_URL (public app URL)
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_MESSAGING_SERVICE_SID (preferred) OR TWILIO_FROM_NUMBER
- CALENDLY_WEBHOOK_SECRET (used to validate signature)
- APP_TIMEZONE_DEFAULT (e.g., America/Los_Angeles)

Data model (tables)
1) locations
- id (pk)
- name
- timezone
- twilio_from (string; E.164) OR messaging_service_sid
- owner_email
- created_at

2) location_settings
- location_id (pk/fk)
- calendly_org_uri (string)
- calendly_user_uri (string, optional)
- calendly_auth_token (string; encrypted-at-rest if available)
- reminder_offsets_minutes (json: [2880, 240] for 48h/4h)
- reschedule_base_url (string; usually Calendly scheduling link)
- waitlist_enabled (bool)

3) appointments
- id (pk)
- location_id (fk)
- calendly_event_uri (unique)
- calendly_invitee_uri (unique)
- start_time (timestamp)
- end_time (timestamp)
- customer_name
- customer_phone (E.164)
- status (enum: scheduled|confirmed|canceled|reschedule_requested|rescheduled|no_show_unknown)
- last_outbound_at (timestamp, nullable)
- created_at
- updated_at

4) reminder_jobs
- id (pk)
- appointment_id (fk)
- send_at (timestamp)
- status (enum: queued|sent|skipped|failed)
- message_type (enum: reminder_48h|reminder_4h)
- created_at

5) waitlist_contacts
- id (pk)
- location_id (fk)
- name
- phone (E.164)
- active (bool)
- created_at

6) waitlist_offers
- id (pk)
- location_id (fk)
- appointment_id (fk)  // the open slot we’re filling
- status (enum: open|claimed|expired|canceled)
- claim_deadline (timestamp)
- claimed_by_waitlist_contact_id (fk, nullable)
- claimed_at (timestamp, nullable)
- created_at

7) messages
- id (pk)
- location_id (fk)
- appointment_id (fk, nullable)
- waitlist_offer_id (fk, nullable)
- direction (enum: inbound|outbound)
- from_phone
- to_phone
- body
- twilio_sid (string, nullable)
- created_at

8) events (analytics/event log)
- id (pk)
- location_id (fk)
- appointment_id (fk, nullable)
- type (enum: appointment_ingested|reminder_sent|inbound_received|confirmed|reschedule_requested|canceled|waitlist_broadcast|waitlist_claimed|opted_out|error)
- meta_json (json)
- created_at

Core flows

A) Appointment ingest (Calendly)
Calendly Webhook Events to support:
- invitee.created (new booking)
- invitee.canceled (cancellation)

Endpoint
POST /api/webhooks/calendly
- Validate signature using Calendly webhook signing secret.
- Parse payload to get event URI, invitee URI, start/end, invitee name, and phone.
- Upsert appointment by calendly_invitee_uri.
- When created: status=scheduled; create reminder_jobs at start_time - offset(s).
- When canceled: status=canceled; mark related reminder_jobs as skipped if queued; trigger waitlist fill (if enabled).

Pseudo handling
1) if event=invitee.created:
   - appointment = upsert
   - enqueue reminders (reminder_jobs rows)
   - log events: appointment_ingested
2) if event=invitee.canceled:
   - update appointment.status=canceled
   - log event: canceled
   - call waitlistFill(location_id, appointment_id)

B) Reminder sender (cron/worker)
- Run every 1 minute (or 5 minutes) using platform cron.
- Query reminder_jobs where status=queued and send_at <= now()
- For each job:
  - Skip if appointment.status in (canceled, rescheduled)
  - Compose SMS from templates
  - Send via Twilio
  - Record messages row + reminder_jobs.status=sent
  - Log event reminder_sent

Message templates (copy-ready)
1) 48h reminder
“Hi {firstName}, reminder of your appointment at {bizName} on {date} at {time}. Reply Y to confirm or R to reschedule. Reply STOP to opt out.”

2) 4h reminder
“Hi {firstName}, your appointment at {bizName} is today at {time}. Reply Y to confirm, R to reschedule, or L if you’re running late.”

3) Reschedule link
“No problem—use this link to pick a new time: {rescheduleLink}. Reply STOP to opt out.”

4) Running late
“Thanks—how many minutes late will you be? Reply with a number (e.g., 10).”

5) Waitlist broadcast
“A spot just opened at {bizName} on {date} at {time}. Reply YES to claim it. First come, first served.”

6) Waitlist claimed
“You got it—please book/confirm here: {rescheduleLink}. If you can’t make it, reply NO.”

7) Opt-out confirmation
“You’re opted out and won’t receive further texts. For help email agent_bob_replit+no-show-bot@agentmail.to.”

C) Inbound SMS parsing (Twilio)
Endpoint
POST /api/webhooks/twilio/inbound
- Receive Twilio form params: From, To, Body, MessageSid
- Normalize Body (trim, lowercase)
- Find location by To number (or Messaging Service SID mapping)
- Identify appointment context:
  - Look up most recent upcoming appointment for From phone in that location within next 7 days, status in (scheduled, confirmed, reschedule_requested)
  - If none, treat as generic inquiry; respond with help message

Intent parsing (basic “AI-like” but deterministic first)
- If body contains “stop”, “unsubscribe”, “cancel texts” => intent=STOP
- If body in (“y”, “yes”, “confirm”) => CONFIRM
- If body in (“r”, “reschedule”, “change”) => RESCHEDULE
- If body contains “cancel appointment” or equals (“c”, “cancel”) => CANCEL_APPT
- If body in (“l”, “late”, “running late”) => RUNNING_LATE
- If body matches /^\d+$/ and last outbound asked for minutes late => LATE_MINUTES
- If body == “yes” and there is an open waitlist_offer recently sent => WAITLIST_CLAIM
Else => UNKNOWN (send help)

Actions
- STOP: mark phone opted-out (store in a simple blocklist table or add field to waitlist_contacts; easiest: create table opt_outs(phone, location_id)). Send opt-out confirmation. Log opted_out.
- CONFIRM: set appointment.status=confirmed; log confirmed; reply “Confirmed—see you then.”
- RESCHEDULE: set appointment.status=reschedule_requested; reply with reschedule link; log reschedule_requested.
- CANCEL_APPT: set appointment.status=canceled (note: without Calendly API cancel, this is “soft-cancel”; log and optionally notify owner). Trigger waitlist fill.
- RUNNING_LATE / LATE_MINUTES: log event; reply acknowledgement.
- WAITLIST_CLAIM: attempt to atomically claim an open waitlist_offer (see locking below). If won, reply with rescheduleLink.

D) Reschedule behavior (MVP)
Keep it simple: we do NOT directly modify the appointment in Calendly via API in v1. We send a reschedule link (Calendly reschedule page if available, or general scheduling link).
- For reschedule requests: send {location_settings.reschedule_base_url} (or Calendly reschedule URL if included in webhook payloads and stored).
- When the customer books a new slot, Calendly will emit invitee.created; we treat it as a new appointment. Optionally, correlate by phone and mark old one as rescheduled.

E) Waitlist fill
Trigger conditions
- Appointment canceled (from Calendly webhook or inbound CANCEL_APPT)
Process
1) Create waitlist_offers row: status=open, claim_deadline=now+15min
2) Broadcast message to up to N active waitlist_contacts (e.g., first 20)
3) Log waitlist_broadcast

Claim locking (first-come)
When inbound WAITLIST_CLAIM arrives:
- SELECT waitlist_offer WHERE location_id=? AND status='open' AND claim_deadline>now() ORDER BY created_at DESC LIMIT 1
- Attempt atomic update:
  UPDATE waitlist_offers
  SET status='claimed', claimed_by_waitlist_contact_id=?, claimed_at=now()
  WHERE id=? AND status='open'
- If rows_affected==1 => success; else => respond “Sorry, that spot was taken.”
- On success, reply with booking link (reschedule_base_url) and log waitlist_claimed.

Minimal Admin UI
1) /admin/location
Fields:
- Location name
- Timezone
- Twilio from number or messaging service SID
- Owner email
- Calendly org/user URI
- Calendly auth token (paste)
- Reschedule base URL (Calendly link)
- Reminder offsets (default 48h, 4h)
- Waitlist enabled toggle

2) /admin/templates
Editable text blobs for: reminder_48h, reminder_4h, reschedule, waitlist_broadcast, waitlist_claimed, help/unknown.

3) /admin/analytics
Simple counts last 7/30 days:
- Appointments ingested
- Confirmed count
- Reschedule requested count
- Canceled count
- Waitlist claimed count
- Estimated recovered revenue input (optional manual $/appointment) and computed “recovered” = confirmed + waitlist_claimed

API routes summary (exact)
- POST /api/webhooks/calendly
- POST /api/webhooks/twilio/inbound
- POST /api/admin/location (create/update)
- GET /api/admin/analytics?range=7d|30d
- POST /api/admin/templates
- POST /api/waitlist/import (optional CSV upload later; for MVP manual add is fine)

Testing checklist (end-to-end)
1) Set up location settings with a Twilio number and Calendly token.
2) Configure Calendly webhook to POST to /api/webhooks/calendly.
3) Configure Twilio Messaging webhook to POST to /api/webhooks/twilio/inbound.
4) Create a test appointment in Calendly with a phone number.
5) Verify appointment row created and reminder_jobs scheduled.
6) Manually set send_at to now and run worker: verify outbound SMS received.
7) Reply Y: verify confirmed status + event logged.
8) Reply R: verify reschedule link sent + status updated.
9) Cancel appointment (Calendly): verify waitlist broadcast + claim locking works by texting YES from two phones.

Operational notes
- Compliance: Always include “Reply STOP to opt out” in reminders.
- Phone normalization: store all phones in E.164.
- Safety: If no matching appointment, reply: “We couldn’t find an upcoming appointment for this number. For help: agent_bob_replit+no-show-bot@agentmail.to”
- Concierge fallback for pilots: if Calendly token/webhook setup is hard, allow manual CSV import of appointments into appointments table as a temporary bridge.
