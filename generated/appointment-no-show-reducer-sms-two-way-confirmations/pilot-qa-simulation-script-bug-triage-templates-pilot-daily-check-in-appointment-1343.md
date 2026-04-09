# Pilot QA Simulation Script + Bug Triage Templates + Pilot Daily Check-in (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:12:34.346Z

---

Overview
This document is an executable QA + pilot monitoring package for Appointment No-Show Reducer (SMS + two-way confirmations). It is designed to be run in the 48 hours prior to a pilot go-live and repeated during week 1. It focuses on reliability, message quality, and measurable outcomes. Legitimacy URL to share with pilot clients: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support email for pilots: agent_bob_replit+no-show-bot@agentmail.to

A) 48-hour Internal QA Simulation Script (Step-by-step)
Pre-req data set (create 12 synthetic appointments):
- 3 appointments today (within 2–6 hours)
- 3 appointments tomorrow
- 3 appointments next week
- 3 edge-case times: 7:55am, 11:55pm, and during DST change window (if applicable)
For each appointment record include: client first name, mobile number, appointment datetime, service name, provider, location, and estimated appointment value.

A1. Timezone & DST correctness
Test 1: Location timezone set to America/New_York; appointment at 9:00am local.
- Expected: reminder references 9:00am local time; send occurs at configured offset relative to local time.
Test 2: Change location timezone to America/Los_Angeles; same appointment stored in UTC.
- Expected: reminder converts correctly; no “shift” visible to customer.
Test 3: DST boundary appointment (if in season). Use a time that would be ambiguous.
- Expected: system chooses correct offset; if ambiguous, triggers an internal alert + uses safest interpretation (send earlier, not later).

A2. Message threading & two-way confirmation
Test 4: Customer replies “YES”.
- Expected: status=confirmed; confirmation message sent; no further confirmation reminders.
Test 5: Customer replies “Yes, see you then”.
- Expected: status=confirmed; thread remains on same conversation.
Test 6: Customer replies “No”.
- Expected: status=declined/cancel requested; triggers reschedule/cancel flow; owner notified if configured.

A3. Rule-based intent overrides (high confidence)
Send each reply below and verify deterministic handling (no AI needed):
- “YES”, “Y”, “CONFIRM”, “CONFIRMED” => Confirm
- “NO”, “N”, “CANCEL” => Cancel/decline
- “RESCHEDULE”, “MOVE”, “CHANGE TIME” => Reschedule flow
- “STOP”, “UNSUBSCRIBE” => Opt-out immediate
- “HELP” => Help response + support email
Expected: override triggers even if AI service is down.

A4. Opt-out compliance & fail-safe
Test 7: Reply “STOP”.
- Expected: opt-out flag set; immediate compliance confirmation; no further SMS sent.
Test 8: After STOP, attempt to send another reminder.
- Expected: blocked; internal log entry created.

A5. Reschedule loop prevention
Test 9: Customer replies “reschedule”. System offers times A/B/C.
- Customer replies with an invalid time (“next month”).
- Expected: one clarification question; after 2 failures, escalate to owner/staff instead of looping.

A6. Double-booking prevention
Test 10: Two customers try to accept the same slot (simulate sequential replies within 60 seconds).
- Expected: first acceptance books; second gets apology + alternative slots; no calendar double-book.

A7. Calendar/API failure fail-safe
Test 11: Force calendar API failure (disable token or simulate timeout).
- Expected: system does NOT claim booking is complete; sends user a “We’re confirming with the office” message; immediately alerts owner/staff with details and manual action instructions.

A8. Delivery failures & unreachable numbers
Test 12: SMS delivery failure (simulate invalid number).
- Expected: log delivery failure; if possible, notify staff to confirm contact info; do not repeatedly retry indefinitely.

Exit criteria for QA simulation
- Must-pass: A1 Test 1–2, A2 Test 4, A4 Test 7–8, A6 Test 10, A7 Test 11.
- If any must-pass fails: do not go live; apply workaround (e.g., manual confirmation) or fix.

B) Pilot Bug/Incident Log Template + Triage Rubric
Copy/paste template (one row per issue):
- Issue ID:
- Date/time detected:
- Pilot location:
- Severity (S0/S1/S2/S3):
- Area (Timezone, Opt-out, Threading, Reschedule, Calendar, Waitlist, Analytics, Messaging, Delivery):
- Description (what happened):
- Steps to reproduce:
- Expected behavior:
- Actual behavior:
- Customer impact (how many clients affected):
- Workaround (if any):
- Owner escalation needed? (Y/N) If yes: who + when:
- Status (New / Investigating / Fix in progress / Mitigated / Fixed / Verified):
- Fix notes:
- Verification steps + date verified:

Severity rubric
- S0 Critical: legal/compliance (STOP not honored), double-booking confirmed, messages sent at wrong day/time causing harm, or data leak. Immediate stop-the-line.
- S1 High: reschedule/confirm fails for multiple users; calendar write fails without alert; threading broken causing wrong instructions.
- S2 Medium: copy issues, minor timing drift (<15 min), analytics mismatch but operations OK.
- S3 Low: cosmetic/reporting wording, small UX improvements.

C) Minimal Analytics Event Schema (for pilot instrumentation)
Track these events with timestamp, location_id, appointment_id, phone_hash (or customer id), channel=sms:
1) reminder_scheduled (offset_hours)
2) reminder_sent (template_id)
3) delivery_failed (carrier_code)
4) inbound_received (raw_text)
5) intent_classified (intent=confirm/decline/reschedule/stop/help/unknown; method=rule/ai)
6) confirmed (source=customer_reply)
7) declined (source=customer_reply)
8) reschedule_offered (slots_count)
9) reschedule_selected (slot_id)
10) calendar_write_success / calendar_write_failed (error_code)
11) waitlist_offered (slot_id, waitlist_size)
12) waitlist_accepted (slot_id)
13) opt_out (method=keyword)
14) owner_alert_sent (reason)

These events map to weekly metrics:
- Confirmation rate = confirmed / reminders_sent
- Reschedule saves = reschedule_selected count
- Waitlist fills = waitlist_accepted count
- Opt-out rate = opt_out / unique_recipients
- Estimated recovered revenue = (reschedule_selected + waitlist_accepted) * avg_appointment_value (or location-provided value)

D) Client-facing Pilot Daily Check-in + Escalation (ready to send)

D1. Daily check-in SMS (to owner/staff contact)
“Hi {{OwnerName}} — Bob here from Appointment No-Show Reducer. Quick daily pilot check-in: yesterday we sent {{RemindersSent}} reminders, got {{Confirmed}} confirmations and {{Rescheduled}} reschedules. Any issues from your team or clients? If anything looks off, reply here or email agent_bob_replit+no-show-bot@agentmail.to. Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2”

D2. Escalation email (calendar/API failure or critical incident)
Subject: [Action Needed] Pilot alert for {{BusinessName}} — {{IssueType}} ({{Date}})
Body:
Hi {{OwnerName}},
We detected an issue during the Appointment No-Show Reducer pilot that needs attention:
- Issue: {{IssueType}} (e.g., calendar update failed / reschedule could not be completed)
- Affected appointment(s): {{ApptSummary}}
- Customer phone (last 4): {{Last4}}
- What we did: We paused automated booking confirmation so we don’t accidentally double-book. We sent the customer a message that you’ll confirm shortly.
Next step (manual): Please confirm the appointment status in your calendar and reply to this email with the correct outcome (confirmed / cancelled / rescheduled to ___).
We’ll log this and ensure the automation handles it going forward. Support: agent_bob_replit+no-show-bot@agentmail.to
Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Thanks,
Bob Smith
Appointment No-Show Reducer
