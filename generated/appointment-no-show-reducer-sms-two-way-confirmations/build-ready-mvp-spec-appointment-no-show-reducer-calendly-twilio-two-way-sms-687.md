# Build-Ready MVP Spec: Appointment No‑Show Reducer (Calendly + Twilio Two‑Way SMS)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T09:05:07.862Z

---

Goal
Build the smallest pilot-ready micro-SaaS that reduces no-shows for appointment-based businesses via Twilio two-way SMS: reminders at 48h + 4h, reply-driven confirmations and reschedules, waitlist fill when a slot opens, and analytics that quantify recovered revenue. Scope is deliberately narrow: Calendly-first (one integration), one Twilio phone number per location, minimal admin UI (location setup, templates, analytics). Public legitimacy link for customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Support contact email: agent_bob_replit+no-show-bot@agentmail.to.

Architecture (Minimal)
- Web app (existing Replit app) exposes:
  1) Admin UI (single-tenant to start): create location, connect Calendly, configure Twilio number, set message templates, upload waitlist.
  2) Webhooks: Calendly (appointment ingest + cancellations), Twilio inbound SMS.
  3) Background worker/cron: scans upcoming appointments and sends reminders (48h and 4h).
- Data persistence: Postgres/SQLite (whatever the Replit app already uses). Keep schema simple.

Core Objects (DB Tables)
1) locations
- id (pk)
- name
- timezone (IANA string, default "America/New_York")
- twilio_phone (E.164)
- business_reply_name (e.g., "Acme Dental")
- default_appt_value_cents (for analytics estimate)
- created_at, updated_at

2) calendly_connections
- id (pk)
- location_id (fk)
- calendly_user_uri (string)
- signing_key (string) // from Calendly webhook signing secret
- scheduling_link (string) // used for reschedule flow (simple)
- active (bool)
- created_at, updated_at

3) appointments
- id (pk)
- location_id (fk)
- calendly_event_uri (unique)
- calendly_invitee_uri
- start_at (datetime)
- end_at (datetime)
- customer_name
- customer_phone (E.164)
- customer_email (nullable)
- status (enum: scheduled, canceled, completed, no_show, rescheduled)
- confirmed_at (nullable datetime)
- last_reminder_48h_at (nullable datetime)
- last_reminder_4h_at (nullable datetime)
- created_at, updated_at

4) waitlist_contacts
- id (pk)
- location_id (fk)
- name
- phone (E.164)
- tags (nullable)
- active (bool)
- created_at, updated_at

5) waitlist_offers
Used to manage first-come claim and avoid double booking.
- id (pk)
- location_id (fk)
- appointment_id (fk) // the slot that opened
- status (enum: offering, claimed, expired)
- claimed_by_waitlist_contact_id (nullable fk)
- claim_token (string, unique)
- expires_at (datetime)
- created_at, updated_at

6) message_logs
- id (pk)
- location_id (fk)
- appointment_id (nullable fk)
- waitlist_offer_id (nullable fk)
- direction (enum: outbound, inbound)
- from_phone
- to_phone
- body
- twilio_sid (nullable)
- intent (nullable enum: confirm, reschedule, cancel, late, stop, unknown)
- created_at

7) events (analytics/event log)
- id (pk)
- location_id
- appointment_id (nullable)
- type (string: reminder_sent_48h, reminder_sent_4h, inbound_confirm, inbound_reschedule, inbound_stop, slot_opened, waitlist_offer_sent, waitlist_claimed, waitlist_expired, etc.)
- meta_json (text/json)
- created_at

Key Flows
A) Calendly → Appointment ingest
- Support Calendly webhooks for:
  - invitee.created (scheduled)
  - invitee.canceled (canceled)
Implementation notes:
- Endpoint: POST /webhooks/calendly
- Verify signature using Calendly signing secret (stored in calendly_connections.signing_key). If verification too time-consuming for pilot, allow a feature flag to disable verification but log a warning (do not ship to broader usage without verification).
- On invitee.created:
  - Upsert appointment by calendly_event_uri.
  - Parse invitee name, phone (best-effort), email, start/end times.
  - If phone missing, mark appointment as “unreachable” (status scheduled but no reminders). Log event appointment_missing_phone.
- On invitee.canceled:
  - Update appointment status=canceled.
  - Trigger waitlist fill (Flow E) if within a fill window (e.g., start_at within next 72h) and location has active waitlist.

B) Reminder sending (48h + 4h)
- Cron/worker runs every 5–10 minutes.
- Query appointments where:
  - status=scheduled
  - customer_phone is not null
  - start_at in future
  - now is within [start_at - 48h ± 30m] and last_reminder_48h_at is null → send 48h reminder
  - now is within [start_at - 4h ± 15m] and last_reminder_4h_at is null → send 4h reminder
- Send outbound SMS from location.twilio_phone to appointment.customer_phone.
- After send, update last_reminder_*_at, create message_log, create events.

C) Two-way inbound SMS intent parsing
- Endpoint: POST /webhooks/twilio/inbound
- Parse inbound body; normalize: trim, lowercase.
- Minimal intent rules (fast + robust; “basic AI” can be added later):
  - STOP / UNSUBSCRIBE / CANCEL / END / QUIT → intent=stop (Twilio also handles some automatically but we log and mark patient as opted-out in a simple blocked list if implemented)
  - startswith("y") or contains("confirm") → confirm
  - startswith("r") or contains("resched") or contains("different time") → reschedule
  - contains("cancel") or contains("can’t") or contains("cannot") → cancel
  - contains("late") or contains("running late") → late
  - else unknown
- Identify location by To phone number (twilio number). Identify appointment by matching From phone with nearest upcoming appointment for that location (start_at within next 7 days, status scheduled). If multiple matches, choose nearest start_at.
- For each intent:
  1) confirm: set appointment.confirmed_at=now; log event inbound_confirm; reply with confirmation acknowledgement.
  2) reschedule: log event inbound_reschedule; reply with reschedule link (calendly_connections.scheduling_link). Optionally include: “If you need help reply HELP.”
  3) cancel: set appointment.status=canceled; log event inbound_cancel; reply acknowledging cancellation; trigger waitlist fill.
  4) late: log event inbound_late; reply with “Thanks — we’ll note you’re running late.” (No calendar write needed).
  5) stop: log event inbound_stop; reply with opt-out acknowledgement.
  6) unknown: reply with a short menu (Y=confirm, R=reschedule, STOP=opt out) + support email.

D) Reschedule handling (minimal)
For pilot simplicity, do not attempt to programmatically reschedule inside Calendly.
- On reschedule intent: send the location’s Calendly scheduling link.
- When user reschedules via Calendly, Calendly will send:
  - invitee.canceled for original slot
  - invitee.created for new slot
This is enough to keep appointments accurate and trigger waitlist fill.

E) Waitlist fill (slot opened)
Trigger conditions:
- Appointment becomes canceled (via Calendly cancel webhook or inbound cancel intent).
Algorithm:
1) Create waitlist_offer for the opened appointment.
2) Select N waitlist_contacts (e.g., first 10 active) and send “claim” SMS to each with the same claim token.
3) Inbound handler recognizes “YES” reply when a waitlist_offer is active:
   - Endpoint reuse: /webhooks/twilio/inbound
   - If user replies YES, attempt atomic claim:
     - In a transaction: if offer.status==offering and now < expires_at, set status=claimed, claimed_by=contact_id.
   - If claimed:
     - Reply: “You got it—please book here: {scheduling_link}”
     - Optionally mark offer as claimed and stop messaging others (not necessary; but can send “slot claimed” message to others if desired).
   - If already claimed:
     - Reply: “That slot was just claimed. Reply YES to join the next opening.”
4) Expiry:
- Worker marks offers expired after expires_at and logs event waitlist_expired.

IMPORTANT: In this minimal version we are not reserving the slot in Calendly. We are using urgency + first-come claim to drive booking via Calendly. This is acceptable for pilot; true slot reservation requires deeper API integration.

Admin UI (Minimal Pages)
1) /admin/location
- Fields: location name, timezone, twilio_phone, business_reply_name, default appointment value.
2) /admin/calendly
- Fields: scheduling_link, webhook signing key (optional for pilot), connect status.
- Display webhook URL to paste into Calendly.
3) /admin/waitlist
- Upload CSV (name, phone). Mark active/inactive.
4) /admin/templates
- Edit SMS templates (see defaults below).
5) /admin/analytics
- KPIs: reminders sent, confirmations, reschedules requested, cancellations, waitlist claims.
- Estimated recovered revenue = (confirmed_count * default_appt_value) + (waitlist_claimed_count * default_appt_value).

Default SMS Templates (copy-ready)
1) 48h reminder
"Hi {first_name} — reminder of your {business_name} appointment on {date} at {time}. Reply Y to confirm or R to reschedule. Reply STOP to opt out."

2) 4h reminder
"{first_name}, we’re seeing you today at {time} for your {business_name} appointment. Reply Y to confirm or R to reschedule."

3) Confirm acknowledgement
"Confirmed — see you {date} at {time}. If you need to change it, reply R anytime."

4) Reschedule link
"No problem. Use this link to pick a new time: {scheduling_link}. If you need help email agent_bob_replit+no-show-bot@agentmail.to"

5) Cancellation acknowledgement
"Got it — your appointment is canceled. If you’d like to rebook, use {scheduling_link}."

6) Running late
"Thanks for the heads-up — we’ll note you’re running late. Please arrive as soon as you can."

7) Unknown intent menu
"Sorry, I didn’t catch that. Reply Y to confirm, R to reschedule, or STOP to opt out. Need help? agent_bob_replit+no-show-bot@agentmail.to"

8) Waitlist offer
"A spot just opened at {business_name} on {date} at {time}. Reply YES within 10 minutes to claim it."

9) Waitlist claim success
"You’re first — please book it here now: {scheduling_link}"

Twilio Integration Details
- Outbound: use Twilio Messages API.
- Inbound: configure Twilio phone number webhook to POST /webhooks/twilio/inbound.
- Always respond with valid TwiML (MessagingResponse) to acknowledge inbound.
- Store message SID in message_logs.twilio_sid.

Calendly Integration Details
- Create a webhook subscription in Calendly pointing to POST /webhooks/calendly.
- Subscribe to invitee.created and invitee.canceled.
- Store signing key if using verification.
- For pilot, a single scheduling_link per location is sufficient for reschedules and waitlist booking.

Security / Compliance (Pilot Minimum)
- Verify Calendly webhook signature if feasible.
- Validate inbound Twilio signatures if feasible.
- Phone numbers stored in E.164; never store more PII than needed.
- Provide STOP support; record opt-outs (optional blocked_numbers table).

Acceptance Tests (End-to-End)
1) Create a Calendly booking with a phone number → webhook creates appointment row.
2) Fast-forward reminders (or temporarily set reminder windows to 5 min + 1 min) → system sends outbound SMS.
3) Reply “Y” → appointment gets confirmed_at set; reply ack is sent.
4) Reply “R” → reschedule link is sent.
5) Cancel the Calendly event (or text “cancel”) → appointment status becomes canceled; waitlist offer texts go out.
6) Reply “YES” from a waitlist contact → first claim wins; claimer receives booking link.
7) Analytics page shows counts + estimated recovered revenue.

Implementation Footnotes (to map into repo)
- Create modules: calendlyWebhookHandler, twilioInboundHandler, reminderWorker, waitlistService.
- Keep intent parsing in a single function parseIntent(body).
- Use DB transactions for waitlist claim.
- Log every state transition in events table for analytics and debugging.

This spec is intentionally narrow so we can ship for first paid pilots quickly, then iterate into deeper calendar write-back (true reschedule/reserve), multiple locations, richer analytics, and multi-channel reminders.