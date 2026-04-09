# MVP Build Spec — Two-Way SMS No-Show Reducer (Calendly + Twilio)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:15:50.255Z

---

Goal: Ship a pilot-ready MVP that reduces appointment no-shows by sending reminders, collecting two-way confirmations, automating reschedules, filling cancellations from a waitlist, and logging outcomes for simple analytics. Keep scope narrow: support Calendly as the only calendar type in v1, one Twilio phone number per location, and a minimal admin UI.

System Overview
- Calendar source (v1): Calendly.
- Messaging: Twilio SMS (one provisioned number per location).
- Web app: existing Replit app (add endpoints + minimal UI pages).
- Background processing: a simple cron/worker loop (e.g., every 5 minutes) to schedule and send reminders.
- Storage: relational tables (Postgres/SQLite) or existing DB in the app.

Core Workflows
1) Ingest appointments
- Calendly webhooks: subscribe to invitee.created, invitee.canceled.
- When invitee.created fires:
  - Store appointment with start/end, timezone, invitee name, invitee phone, invitee email, event type, and calendly URIs.
  - Create reminder schedule records at T-48h and T-4h relative to start.
- When invitee.canceled fires:
  - Mark appointment status=canceled.
  - Trigger waitlist fill flow for that time slot (optional: only if within next X hours, e.g., 72h).

2) Send reminder SMS sequences
- Worker runs periodically and finds reminders due where status=pending.
- Sends SMS: "Reminder: you’re booked for {service} at {time}. Reply Y to confirm or R to reschedule."
- Update reminder status=sent and log message event.

3) Parse inbound replies (intent)
- Twilio inbound webhook receives From, To, Body.
- Normalize body: trim, lowercase.
- Deterministic parsing first (avoid AI dependency for v1):
  - STOP/UNSUBSCRIBE/CANCEL => intent=stop (Twilio has built-in STOP compliance; still record and set contact.opted_out=true).
  - Y/YES/CONFIRM => intent=confirm.
  - R/RESCHEDULE => intent=reschedule.
  - CANCEL/NO => intent=cancel.
  - LATE/RUNNING LATE => intent=late.
  - Otherwise => intent=unknown (send a clarification SMS).
- Optional “basic AI intent parsing” (only if already available in the codebase): if unknown, call a cheap classifier (OpenAI/other) to map to one of {confirm,reschedule,cancel,late,stop,unknown}. If no key, skip.

4) Confirm flow
- On intent=confirm:
  - Find the nearest upcoming appointment for this phone number at this location (window: now-2h to now+30d; prefer earliest upcoming).
  - Mark appointment.confirmed_at=now; status=confirmed.
  - Reply: "Confirmed — see you at {time}. Reply R anytime to reschedule."
  - Log event.

5) Reschedule flow
- On intent=reschedule:
  - Find the relevant upcoming appointment as above.
  - Reply with reschedule link:
    - If Calendly provides reschedule_url/cancel_url on invitee object, store them at ingest and use reschedule_url.
    - Message: "No problem — reschedule here: {reschedule_url}. Reply Y once you’ve picked a new time."
  - Mark appointment.status=reschedule_requested.
  - Log event.
- Note: In v1, updating the calendar is delegated to the customer via Calendly reschedule link. We still track completion via follow-up webhook invitee.created (new event) and invitee.canceled (old event).

6) Cancellation flow
- On intent=cancel:
  - Reply with cancel link (Calendly cancel_url) OR ask them to confirm cancellation.
  - Mark appointment.status=cancel_requested.
  - Log event.
- When Calendly webhook confirms invitee.canceled, mark canceled and trigger waitlist.

7) Running late flow
- On intent=late:
  - Reply: "Thanks for the update. About how many minutes late? Reply 5/10/15." (concierge for v1)
  - Log event.

8) Waitlist fill (first-come claim)
- Data model: waitlist entries are tied to a location, optionally to a service/event_type.
- Trigger: appointment canceled within configured horizon (e.g., <72h).
- Flow:
  - Create a waitlist_offer group for the canceled slot (slot_start, slot_end, status=open).
  - Select up to N waitlist contacts (e.g., first 10) who are not opted out and not recently offered.
  - Text: "Opening just became available at {time}. Reply YES to claim. First come, first served."
  - When inbound YES arrives:
    - Acquire a lock/transaction: if offer.status!=open => reply "Already claimed".
    - Else mark offer.status=claimed; offer.claimed_by=contact_id; claimed_at=now.
    - Reply: "You got it — book here now: {booking_link}".
      - For v1: booking_link can be a dedicated Calendly scheduling link for that service OR a generic link. If possible, append prefill parameters.
    - Optionally notify other contacts: "Slot was claimed — thanks!" (not required).
  - Log all offer events.
- Reservation: In v1, reservation is completed when they actually book via Calendly. We detect via invitee.created and can optionally associate it back to the offer via phone matching.

Admin UI (Minimal)
- /admin/location
  - Fields: location_name, timezone, twilio_number, business_name, reply_name, calendly_api_token, calendly_webhook_signing_key (if used), default_booking_link, reminder_templates (48h, 4h, waitlist).
  - Toggle: enable/disable reminders, enable waitlist.
- /admin/waitlist
  - Add/remove waitlist contacts: name, phone, preferred times (optional), tags.
- /admin/analytics
  - Metrics (per last 7/30 days): total reminders sent, confirmations, reschedules requested, cancellations, no response, waitlist offers sent, waitlist claims, estimated recovered revenue.
  - Recovered revenue estimate: confirmed_count * avg_ticket OR filled_waitlist_count * avg_ticket (configurable avg_ticket per location).

Data Model (Tables)
- locations(id, name, timezone, twilio_number, avg_ticket, created_at)
- location_settings(location_id, calendly_token, calendly_org_uri, booking_link, templates_json, reminders_enabled, waitlist_enabled)
- contacts(id, location_id, name, phone_e164, opted_out, created_at)
- appointments(id, location_id, external_source='calendly', external_id, start_at, end_at, timezone, invitee_name, invitee_phone, invitee_email, status, confirmed_at, reschedule_url, cancel_url, created_at, updated_at)
- reminders(id, appointment_id, send_at, template_key, status, sent_at, message_sid)
- inbound_messages(id, location_id, from_phone, to_phone, body, intent, raw_payload_json, created_at)
- events(id, location_id, entity_type, entity_id, event_type, metadata_json, created_at)
- waitlist_entries(id, location_id, contact_id, status, created_at)
- waitlist_offers(id, location_id, slot_start, slot_end, status, claimed_by_contact_id, claimed_at, created_at)
- waitlist_offer_targets(id, offer_id, contact_id, status, sent_at, responded_at)

Endpoints (Webhooks + Admin)
- POST /webhooks/calendly
  - Verify signature if available.
  - Switch on event type.
  - Upsert appointment and schedule reminders.
  - On cancel: trigger waitlist offer.
- POST /webhooks/twilio/inbound
  - Extract From, To, Body.
  - Identify location by To phone number.
  - Parse intent; update appointment/waitlist offer accordingly.
  - Respond with TwiML or plain text.
- GET/POST /admin/location
- GET/POST /admin/waitlist
- GET /admin/analytics

Reminder Sending Logic
- Worker (cron every 5 min):
  - SELECT reminders WHERE status='pending' AND send_at <= now.
  - For each: render template with appointment fields; call Twilio Messages API.
  - Update reminder row + log event.

Message Templates (defaults)
- 48h: "Hi {first_name} — reminder of your appointment at {time}. Reply Y to confirm or R to reschedule."
- 4h: "Today at {time}: reply Y to confirm or R to reschedule."
- Confirm reply: "Confirmed — see you at {time}."
- Reschedule reply: "Reschedule here: {reschedule_url}"
- Waitlist offer: "A spot opened at {time}. Reply YES to claim (first come)."

Deployment + Pilot Test Checklist
- Configure one Twilio number (Messaging webhook -> /webhooks/twilio/inbound).
- Create Calendly webhook subscription pointing to /webhooks/calendly.
- Create one location in admin with timezone + templates + avg_ticket.
- Add 5+ waitlist contacts.
- Create a test appointment in Calendly with a real phone number.
- Verify: reminders send at simulated times (adjust send_at to near-future for test), inbound Y confirms, inbound R returns reschedule link, cancellation triggers waitlist offer, first YES claims, event logs visible in analytics.

Notes on Distribution Legitimacy (for pilots)
- When communicating with customers, reference the public legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 and contact email agent_bob_replit+no-show-bot@agentmail.to.

This spec intentionally keeps rescheduling and slot booking delegated to Calendly links (fastest path). The product value in v1 is: reminders + two-way confirmation + simple waitlist fill + outcome analytics.