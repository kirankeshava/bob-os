# Pilot QA Test Matrix + Incident Log + Day-0–Day-7 Monitoring SOP (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:40:18.589Z

---

Business legitimacy URL (share with pilot clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support / contact email: agent_bob_replit+no-show-bot@agentmail.to

============================================================
A) PILOT QA TEST MATRIX (COPY/PASTE)
============================================================
How to use:
- Run these scenarios in each pilot location before go-live (or within the first 24 hours with owner awareness).
- Record each result as PASS/FAIL, capture screenshots/logs, and create an incident if any FAIL.
- Always test with the pilot’s real timezone and business hours.

Columns to track (add to sheet):
- Scenario ID | Category | Preconditions | Steps | Expected Result | PASS/FAIL | Notes/Artifacts

1) TIMEZONE / DST
T1. Timezone correctness
Pre: Business timezone set (e.g., America/Chicago)
Steps: Create an appointment for tomorrow 10:00am local. Trigger reminder schedule (e.g., 24h + 2h).
Expected: Reminders send exactly at configured offsets in LOCAL time.

T2. DST boundary (if applicable)
Pre: System supports DST; use a test date around DST change.
Steps: Create appointment across DST change week. Observe reminder send times.
Expected: Send times remain correct in local time; no 1-hour drift.

2) BASIC REMINDERS + THREADING
R1. Initial reminder content quality
Pre: Appointment exists; patient/client phone present.
Steps: Send first reminder.
Expected: Message includes business name, appointment date/time, clear CTA (Reply YES to confirm / NO to reschedule), and opt-out language (“Reply STOP to opt out”). Tone is professional.

R2. Thread continuity
Pre: A reminder has been sent.
Steps: Customer replies “Yes”. Later customer sends “Thanks”.
Expected: System associates replies to the same appointment thread; no duplicate new threads; “Thanks” does not trigger unintended state change.

3) CONFIRMATIONS (RULE OVERRIDES)
C1. Confirm with “YES”
Steps: Customer replies “YES”.
Expected: Appointment marked Confirmed; optional confirmation acknowledgment sent; analytics confirmation_count increments.

C2. Confirm with variants
Steps: Reply “Yep”, “Y”, “confirm”, “sure”.
Expected: High-confidence keyword mapping confirms (rule-based overrides should catch common variants); no AI misclassification.

C3. Negative reply
Steps: Reply “NO”.
Expected: System responds with reschedule flow or staff escalation per rules; appointment NOT marked confirmed.

4) RESCHEDULE FLOW (NO DOUBLE BOOK)
S1. Reschedule request keyword
Steps: Reply “reschedule”.
Expected: System offers available times or asks for preferred times; analytics reschedule_request_count increments.

S2. Reschedule loop protection
Steps: Customer requests reschedule, then provides an unavailable time repeatedly.
Expected: After N attempts (e.g., 2–3), escalate to manual staff follow-up; avoid infinite loop.

S3. Double-book prevention
Pre: Slot A is already booked.
Steps: Customer chooses Slot A.
Expected: System rejects Slot A and offers next available options; no calendar write that creates conflict.

S4. Calendar update integrity
Steps: Complete reschedule to Slot B.
Expected: Old appointment canceled/updated, new appointment created/updated exactly once; customer receives the final confirmed time; analytics rescheduled_success_count increments.

5) WAITLIST / GAP FILL
W1. Waitlist invite send
Pre: A cancellation creates a gap tomorrow; waitlist has entries.
Steps: Trigger waitlist outreach.
Expected: Waitlist SMS sent with clear CTA and expiration window; only eligible clients messaged.

W2. First-come-first-serve lock
Steps: Two waitlist recipients reply YES within seconds.
Expected: Only first successful confirmation gets the slot; second gets polite “Slot no longer available” + alternatives; no double-book.

6) OPT-OUT / COMPLIANCE
O1. STOP opt-out
Steps: Reply “STOP”.
Expected: Immediate confirmation of opt-out; no further messages sent; opt-out stored.

O2. HELP keyword
Steps: Reply “HELP”.
Expected: Sends help message with business name, support email agent_bob_replit+no-show-bot@agentmail.to, and instructions.

O3. Opt-out persistence
Steps: After STOP, attempt to send another reminder.
Expected: System suppresses sends; logs suppression reason.

7) ERROR HANDLING / FAIL-SAFES
E1. Calendar API failure on write
Pre: Simulate calendar outage or invalid credentials.
Steps: Trigger reschedule that requires calendar update.
Expected: Automation pauses; owner/staff alerted immediately with details; no “success” message sent to customer; incident created.

E2. SMS delivery failure
Steps: Simulate undeliverable number.
Expected: Delivery failure logged; staff alert optional; system does not retry indefinitely.

E3. Unknown reply intent
Steps: Reply “I’m running late by 10 min”.
Expected: Does not incorrectly confirm/cancel; routes to “staff follow-up” path or asks a clarifying question.

8) ANALYTICS INSTRUMENTATION CHECK
A1. Event logging completeness
Steps: Run one confirmation, one reschedule, one STOP.
Expected: Each event increments correct counters with timestamp, location_id, appointment_id (or hashed key).

============================================================
B) INCIDENT / DEFECT LOG TEMPLATE
============================================================
Use this for every FAIL in the matrix or any pilot-reported issue.

Incident ID:
Date/Time detected:
Location / Pilot name:
Severity (S0–S3):
- S0 Critical: risk of double-booking, messages to opted-out users, wrong-day reminders, compliance risk.
- S1 High: reschedule/confirm broken, major customer confusion, repeated wrong responses.
- S2 Medium: message copy issues, minor timing drift, analytics missing non-critical event.
- S3 Low: cosmetic/reporting issues, edge-case wording improvements.

Customer impact summary (1–2 sentences):
Category (Timezone/Threading/Confirm/Reschedule/Waitlist/Opt-out/Delivery/API/Analytics/Other):
Environment (prod/pilot/sim):
Preconditions:
Steps to reproduce:
Expected result:
Actual result:
Logs/screenshots link or pasted evidence:
Immediate mitigation/workaround:
Owner/client communication sent (Y/N + copy):
Assigned to:
Fix ETA:
Verification steps:
Verified in (env) + date:
Status (Open/In progress/Blocked/Resolved/Closed):

============================================================
C) DAY-0 TO DAY-7 PILOT MONITORING SOP (CONCIERGE)
============================================================
Goal: keep reliability high, prevent compliance errors, and capture measurable outcomes.

Day 0 (Setup + Safety)
1) Confirm location timezone + business hours.
2) Confirm reminder schedule (e.g., 24h and 2h) + which appointments are eligible.
3) Confirm opt-out language appears in first message.
4) Verify escalation contact (owner/staff cell + email) and response SLA.
5) Run at least: T1, R1, C1, O1, E1 scenarios.
6) If any S0/S1 defects: do NOT go live until mitigated.

Daily checklist (Days 1–7)
1) Delivery health
- Check SMS send volume vs. expected appointments.
- Review any delivery failures/blocked numbers; ensure no repeated sends.

2) Reply handling audit (sample)
- Review last 20 inbound replies.
- Confirm YES/NO/RESCHEDULE/STOP are correctly classified.
- Any ambiguous replies (“late”, “sick”, “can’t make it”) should route to staff follow-up.

3) Calendar integrity
- Spot-check 5 rescheduled appointments: confirm no duplicates, correct time, correct client.
- Verify cancellations remove reminders for canceled slots.

4) Compliance
- Confirm STOP requests are honored immediately.
- Confirm no outbound messages to opted-out numbers.

5) Metrics capture (daily)
Record:
- reminders_sent
- confirmations_received
- reschedule_requests
- reschedules_completed
- waitlist_offers_sent
- waitlist_fills
- opt_outs
- incidents_opened (by severity)

6) Escalation / fail-safe rule
If calendar write fails OR integrity uncertain (S0):
- Immediately alert owner/staff: “Automation paused due to calendar sync issue; please handle reschedules manually until resolved.”
- Pause automation that can create conflicts.
- Open incident with E1 template fields.

Day 7 (Week-1 report readiness)
1) Collect baseline numbers (if not already): last 4 weeks no-shows, avg appointment value, weekly appointment volume.
2) Compute week-1 outcomes: confirmation rate, prevented no-shows estimate, recovered revenue estimate.
3) Send Week-1 value report email (use the weekly template) and include legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

============================================================
D) CLIENT EMAIL: WEEK-1 BASELINE REQUEST (READY TO SEND)
============================================================
Subject: Quick baseline numbers for your no-show reduction pilot (so we can measure $ impact)

Hi {{FirstName}},

To make sure this pilot produces clear, measurable results (and a simple weekly value report), could you reply with these baseline numbers from the last ~4 weeks (rough estimates are fine):

1) Avg appointments per week (or per day)
2) Typical no-show rate (%), or # of no-shows per week
3) Average revenue per completed appointment ($)
4) Your business timezone + normal operating hours

We’ll use this to calculate an estimated recovered revenue per week during the pilot (confirmed shows + saved reschedules + waitlist fills).

For reference, our info page is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
If anything looks off (wrong reminder times, odd replies, etc.), email us anytime at agent_bob_replit+no-show-bot@agentmail.to and we’ll respond quickly.

Thanks,
Bob
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to
