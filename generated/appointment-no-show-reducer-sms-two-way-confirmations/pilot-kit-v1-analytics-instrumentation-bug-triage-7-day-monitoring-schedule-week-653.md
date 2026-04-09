# Pilot Kit v1 — Analytics Instrumentation + Bug Triage + 7‑Day Monitoring Schedule + Weekly Value Report (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:48:07.500Z

---

## 1) Pilot Analytics Instrumentation Spec (what we must log)
Goal: quantify operational outcomes and $$ recovered per location/week. All events should be attributable to a location, patient/customer (anonymized ID), and appointment ID.

### Core entities
- Location: location_id, timezone, business_hours, avg_appt_value, services
- Appointment: appt_id, location_id, scheduled_start (ISO), scheduled_end, created_at, status (scheduled/confirmed/rescheduled/cancelled/completed/no_show)
- Customer: customer_id (hashed), phone_last4 (optional), consent_status (opted_in/opted_out)

### Events to capture (minimum viable)
1) reminder_sent
- event_time, location_id, appt_id, channel (sms), template_id, send_status (success/fail), provider_message_id

2) inbound_reply_received
- event_time, location_id, appt_id (if linked), raw_text, normalized_text, classification (confirm/decline/reschedule/stop/help/unknown), classifier_mode (rule_override/ai/manual), confidence (0–1), thread_id

3) confirmation_recorded
- event_time, location_id, appt_id, method (reply/owner/manual), previous_status, new_status

4) reschedule_initiated
- event_time, location_id, appt_id, initiated_by (customer/owner/bot), reason (customer_request/conflict)

5) reschedule_completed
- event_time, location_id, old_appt_id, new_appt_id, calendar_writeback_status (success/fail), double_booking_detected (true/false)

6) waitlist_offer_sent
- event_time, location_id, slot_start, slot_end, offer_count, send_status

7) waitlist_fill_confirmed
- event_time, location_id, slot_start, filled_appt_id, time_to_fill_minutes

8) opt_out
- event_time, location_id, customer_id, method (STOP keyword/manual), compliance_status

9) system_alert
- event_time, location_id, alert_type (calendar_api_down/sms_send_fail/reply_parse_error/unknown), severity (sev1–sev3), delivered_to (owner_email/phone), acknowledged_at

### Weekly rollups (what gets shown to clients)
- reminders_sent_total
- confirmation_rate = confirmations / reminders_sent
- reschedules_completed
- prevented_no_shows_est (see below)
- waitlist_fills
- estimated_recovered_revenue = (prevented_no_shows_est * avg_appt_value) + (waitlist_fills * avg_appt_value)

### Prevented no-shows estimate (simple, defensible)
Option A (baseline comparison):
- baseline_no_show_rate (from last 4 weeks)
- pilot_no_show_rate (from pilot week)
- prevented_no_shows_est = (baseline_no_show_rate - pilot_no_show_rate) * total_appointments_in_pilot_week

Option B (confirmation proxy, when baseline missing):
- prevented_no_shows_est = confirmed_appointments * conservative_factor (e.g., 0.15–0.25)
Use only if baseline data cannot be obtained; label clearly.

---

## 2) Rule-Based Reply Overrides (to protect pilots)
These run BEFORE any AI classification. If matched, set classification with confidence=1.0 and classifier_mode=rule_override.

### STOP / Opt-out (highest priority)
- Contains: STOP, UNSUBSCRIBE, CANCEL SMS, END
Action: mark opted_out immediately; send compliant confirmation message; suppress future reminders.

### HELP
- Contains: HELP, SUPPORT
Action: send help text + route to owner if repeated.

### Confirm
- Exact/contains (word-boundary): YES, Y, CONFIRM, OK, OKAY, I’LL BE THERE, SEE YOU
Action: mark appointment confirmed.

### Decline / Cancel
- Contains: NO, CAN’T, CANNOT, WON’T MAKE IT, CANCEL
Action: mark declined; offer reschedule link/options.

### Reschedule intent
- Contains: RESCHEDULE, MOVE, CHANGE, DIFFERENT TIME, LATER, EARLIER
Action: begin reschedule flow; ask for preferred times.

### Edge-case protections
- If message contains both YES and RESCHEDULE → treat as RESCHEDULE (more urgent intent).
- If message contains profanity/abuse → route to owner; suppress automation.

---

## 3) Bug/Defect Triage Template (for pilot stability)
Use one line per issue in an incident log.

### Fields
- Issue ID:
- Date/Time (with timezone):
- Location ID:
- Severity:
  - Sev1: compliance or revenue-critical failure (opt-out not honored, wrong-time reminders, missed reminders en masse, double-booking)
  - Sev2: degraded workflow (reschedule loop, misclassification corrected manually)
  - Sev3: cosmetic/reporting issue
- Symptoms (what happened):
- Expected behavior:
- Steps to reproduce:
- Impact (how many appointments/customers):
- Root cause hypothesis:
- Fix owner:
- Fix deployed at:
- Verification steps + result:

### Fix verification checklist
- Confirm timezone correctness (appt time displayed vs location timezone)
- Confirm calendar writeback success or safe fallback + owner alert
- Confirm STOP compliance (no further messages)
- Confirm no double-booking created
- Confirm thread continuity (same conversation for same appointment)

---

## 4) 7‑Day Pilot Monitoring Schedule (concierge ops)
Purpose: catch failures early and produce measurable proof.

### Day 0 (setup + baseline)
- Collect baseline: last 4 weeks appointments, no-show count/rate, avg appointment value, typical reminder cadence.
- Confirm location timezone + business hours.
- Confirm opt-in language process (how numbers were collected).
- Run test appointment end-to-end: reminder → YES → confirm; reminder → RESCHEDULE → new time; STOP → opt-out.

### Day 1–2 (high-touch)
Daily checks (15–20 min):
- SMS delivery failures (send_status=fail)
- Inbound replies stuck as unknown
- Calendar writeback failures
- Any double-book detections
- Verify STOP events suppressed correctly
Escalate to owner if: Sev1 or repeated Sev2.

### Day 3–5 (stabilize)
- Review classification accuracy; add 3–5 location-specific keywords if needed.
- Audit timezone/DST edge (morning reminders, next-day reminders).
- Confirm reschedule completion rate and any drop-offs.

### Day 6 (prep report)
- Pull weekly rollups and baseline comparison.
- Identify 2–3 specific ‘wins’ (confirmed, rescheduled, waitlist-filled).

### Day 7 (deliver value)
- Send Weekly Value Report (template below).
- Ask for testimonial + permission to use anonymized metrics.
- Offer conversion plan (paid) based on outcomes.

Fail-safe rule (always-on): If calendar API fails OR SMS provider errors spike, generate system_alert to owner immediately and pause automation if compliance risk.

---

## 5) Weekly Value Report Template (email, client-ready)
Subject: Weekly No‑Show Reduction Report — {Location Name} — {Week Start} to {Week End}

Hi {Owner Name},

Here’s your weekly performance summary from Appointment No‑Show Reducer (pilot). Dashboard/legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### 1) Highlights (plain English)
- Confirmed appointments: {confirmed_count}
- Rescheduled appointments saved (would-have-been lost): {rescheduled_completed}
- Waitlist fills (gap slots filled): {waitlist_fills}

### 2) Activity
- Reminders sent: {reminders_sent}
- Customer replies received: {inbound_replies}
- Opt-outs (STOP): {opt_outs} (all honored immediately)

### 3) No‑show impact (measurable)
Baseline (last 4 weeks): {baseline_no_show_rate}% no‑show rate
This week: {pilot_no_show_rate}% no‑show rate
Estimated no‑shows prevented: {prevented_no_shows_est}

### 4) Estimated recovered revenue
Average appointment value: ${avg_appt_value}
Estimated recovered revenue this week: ${estimated_recovered_revenue}

### 5) Notable conversations (examples)
- {Example 1: “Customer requested reschedule; moved from Tue 3pm → Thu 11am.”}
- {Example 2: “Waitlist filled a cancelled slot within 38 minutes.”}

### 6) Recommendations for next week
- {Recommendation A: adjust reminder timing}
- {Recommendation B: add waitlist segment}

If anything looks off (timing, message tone, reschedule rules), reply here and we’ll adjust immediately.

Support: agent_bob_replit+no-show-bot@agentmail.to

— Bob
Appointment No‑Show Reducer
