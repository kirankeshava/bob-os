# MVP Build Doc (Calendly + Twilio): Two-Way SMS Confirm/Reschedule + Waitlist Fill + Analytics

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T17:57:44.830Z

---

## Goal
Ship a pilot-ready MVP that reduces no-shows by: ingesting upcoming appointments from Calendly, sending 48h + 4h SMS reminders, handling inbound two-way replies (confirm/reschedule/cancel/late/stop), sending reschedule links, filling cancellations from a waitlist (first-come), and logging outcomes for analytics. Scope: Calendly only, one Twilio number per location, minimal admin UI.

## Assumptions / Constraints
- Week 1 = $0 spend. Use free tiers where possible. Twilio and Calendly accounts may exist; if not, integration can be coded and tested with mock payloads until credentials are provided.
- Admin UI is intentionally minimal: Location setup, template editor (optional), basic analytics/events.
- Calendar update strategy: for reschedule we primarily send a scheduling link; appointment record is updated when Calendly sends new webhook events (cancellation + new booking). For waitlist fill we send a “claim” flow that directs to a booking link; the first claimant receives the link.

## High-Level Architecture
1) **Calendly Webhooks** -> ingest events -> upsert appointment records.
2) **Reminder scheduler** (cron/worker) queries appointments needing reminders and sends Twilio SMS.
3) **Twilio inbound webhook** parses inbound text, updates appointment status, triggers reschedule flow or stop/opt-out.
4) **Waitlist fill** triggers when an appointment is canceled (Calendly event or inbound CANCEL). It texts waitlist contacts; first YES wins claim lock; winner receives booking link.
5) **Event log** records everything (sent, delivered if available, inbound, status changes, waitlist claims) for analytics.

## Data Model (SQL-ish)
### locations
- id (pk)
- name
- timezone (e.g., "America/Los_Angeles")
- twilio_phone (E.164)
- calendly_org_uri (string)
- calendly_webhook_secret (string) // for signature verification if used
- default_reschedule_url (string) // e.g., Calendly scheduling page
- created_at

### patients (or contacts)
- id (pk)
- location_id (fk)
- phone (E.164, unique per location)
- name (nullable)
- opted_out (boolean default false)
- created_at

### appointments
- id (pk)
- location_id (fk)
- calendly_event_uri (unique)
- calendly_invitee_uri (nullable)
- contact_phone (E.164)
- contact_name (nullable)
- start_time_utc (datetime)
- end_time_utc (datetime)
- status (enum: scheduled, confirmed, canceled, completed, reschedule_requested)
- last_reminder_48h_at (datetime nullable)
- last_reminder_4h_at (datetime nullable)
- last_inbound_at (datetime nullable)
- created_at, updated_at

### waitlist
- id (pk)
- location_id
- phone (E.164)
- name (nullable)
- priority (int default 0)
- active (boolean default true)
- created_at

### waitlist_claims
- id (pk)
- location_id
- canceled_appointment_id (fk appointments.id)
- claimant_phone (E.164)
- status (enum: offered, claimed, expired)
- claim_token (string unique)
- claimed_at (datetime nullable)
- expires_at (datetime)
- created_at
Unique constraint suggestion: (canceled_appointment_id, status=claimed) to ensure single winner.

### message_events
- id (pk)
- location_id
- appointment_id (nullable)
- direction (inbound|outbound)
- to_phone
- from_phone
- body
- twilio_sid (nullable)
- event_type (enum: reminder_48h, reminder_4h, confirm_prompt, confirmed, reschedule_prompt, cancel, late, stop, waitlist_offer, waitlist_claimed, waitlist_lost, system)
- created_at

## Integrations
### Calendly
**Webhook endpoint:** POST /webhooks/calendly
- Verify signature if using Calendly signing secret.
- Handle event types:
  - invitee.created -> create/upsert appointment (scheduled)
  - invitee.canceled -> update appointment status=canceled; trigger waitlist fill
  - (Optional) invitee_no_show not in Calendly; ignore
Store calendly_event_uri + invitee URI and start/end times.

**Upsert logic:**
- Find appointment by calendly_event_uri.
- If exists, update times/status/phone/name.
- Else create.

### Twilio
**Inbound SMS webhook:** POST /webhooks/twilio/inbound
- Inputs: From, To, Body, MessageSid.
- Normalize Body to trimmed uppercase.
- Find location by To (our Twilio number).
- Find active appointment by (location_id, contact_phone=From) with start_time_utc in [now-24h, now+14d] order by soonest.
- If no appointment: respond politely and log.

**Outbound send utility:**
- sendSMS({to, from, body, appointment_id, event_type})
- logs message_events immediately.

## Reminder Scheduler
Run every 5 minutes via cron/worker.

Query logic (per location timezone):
- For 48h reminder: appointments with status in (scheduled) and start_time between now+47h50m and now+48h10m and last_reminder_48h_at is null.
- For 4h reminder: appointments with status in (scheduled) and start_time between now+3h50m and now+4h10m and last_reminder_4h_at is null.
- Send SMS and set corresponding last_reminder_*_at.

## Inbound Intent Parsing (Narrow, deterministic + light AI fallback)
Primary rule-based intents (fast, safe):
- STOP, UNSUBSCRIBE, CANCEL, END, QUIT -> opt out.
- Y, YES, CONFIRM, OK -> confirm.
- R, RESCHEDULE, MOVE, CHANGE -> reschedule.
- CANCEL APPT, C, NO -> cancel.
- LATE, RUNNING LATE, ETA -> running late.
Fallback: simple keyword scoring; optionally use an LLM later, but MVP can be 100% rules.

## Inbound Handlers
### Confirm
- Update appointment.status=confirmed.
- Log event_type=confirmed.
- Reply: "You’re confirmed for {date/time}. Reply R to reschedule or STOP to opt out."

### Reschedule
- Update appointment.status=reschedule_requested.
- Reply with location.default_reschedule_url: "No problem—reschedule here: {link}. If you need help, reply HELP."
- Log reschedule_prompt.

### Cancel
- Update appointment.status=canceled.
- Reply: "Your appointment has been canceled. If you’d like to book again: {reschedule_url}."
- Trigger waitlist fill (see below).

### Running late
- Log late.
- Reply: "Thanks for the update. Please arrive as soon as you can. If you need to reschedule reply R."

### Stop
- Set contact.opted_out=true.
- Reply: "You’re opted out and will no longer receive texts."

## Waitlist Fill Flow
Trigger conditions:
- Appointment status becomes canceled (from Calendly invitee.canceled or inbound cancel).

Algorithm:
1) Select active waitlist contacts for location where opted_out=false.
2) Create a waitlist_claims record for each offer batch (or single claim with multiple offers). MVP simplest:
   - Create ONE claim token for the canceled appointment.
   - Text top N waitlist contacts (e.g., 10) the same instruction: "An earlier slot opened on {date/time}. Reply YES to claim."
   - Set expires_at=now+30 minutes.
3) On inbound YES:
   - Attempt atomic claim: if no existing claimed record for canceled_appointment_id and now < expires_at, set status=claimed, claimant_phone=From.
   - Winner gets: "You got it—book here now: {reschedule_url} (first come)."
   - Losers (subsequent YES) get: "Sorry, that slot was just claimed. Reply YES to stay on the waitlist."
4) Log waitlist_claimed / waitlist_lost.

Note: Actual “reservation” is via booking link; Calendly will enforce availability. In later versions we can create a one-time-use link or hold slot; MVP relies on speed + link.

## Minimal Admin UI
Routes (server-rendered or simple SPA):
- /admin/login (if existing auth) or a shared secret for MVP.
- /admin/location
  - name, timezone
  - twilio_phone
  - default_reschedule_url
  - calendly_org_uri
- /admin/templates (optional)
  - Reminder 48h template
  - Reminder 4h template
  - Waitlist offer template
- /admin/analytics
  - counts: scheduled, confirmed, canceled, reschedule_requested
  - show table of last 100 message_events and appointment outcomes
  - “Recovered revenue” estimate: confirmed_count * avg_appt_value (manual input per location optional)

## Exact SMS Copy (Default Templates)
48h reminder:
"Reminder: you have an appointment on {date} at {time}. Reply Y to confirm or R to reschedule."

4h reminder:
"See you soon at {time}. Reply Y to confirm, R to reschedule, or STOP to opt out."

Confirm receipt:
"Confirmed—see you {date} at {time}. Reply R to reschedule."

Reschedule:
"No problem—reschedule here: {reschedule_url}. Reply STOP to opt out."

Cancel:
"Canceled. If you’d like to book again: {reschedule_url}."

Waitlist offer:
"An earlier slot opened on {date} at {time}. Reply YES to claim (first come)."

Waitlist winner:
"You claimed it. Book now: {reschedule_url}"

Waitlist loser:
"That slot was just claimed. We’ll text you if another opens."

## End-to-End Test Checklist
1) Create a test location with timezone + Twilio number + Calendly scheduling URL.
2) Configure Calendly webhook -> /webhooks/calendly.
3) Book an appointment in Calendly using a real phone number.
4) Verify appointment record created.
5) Fast-forward reminder scheduler by temporarily setting reminder windows (e.g., 5 minutes + 1 minute) for testing.
6) Confirm inbound reply “Y” updates status=confirmed and logs events.
7) Reply “R” returns reschedule link and sets status=reschedule_requested.
8) Cancel in Calendly -> webhook sets status=canceled and triggers waitlist offer texts.
9) Reply YES from two phones: verify only first gets winner message.
10) Validate analytics page shows counts and message log.

## Legitimacy / Customer-Facing References
If any customer asks for validation during pilot onboarding, share:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact: agent_bob_replit+no-show-bot@agentmail.to
