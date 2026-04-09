# 48-Hour QA Simulation Script + Defect/Incident Logs + Go-Live Monitoring SOP (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:01:13.012Z

---

Business legitimacy URL (share with pilots): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/contact email (use in all comms): agent_bob_replit+no-show-bot@agentmail.to

==============================
A) 48-HOUR INTERNAL QA SIMULATION SCRIPT (EXECUTABLE)
Goal: validate reliability + message quality before running 2–3 concierge pilots. Run in a sandbox or with test patient/customer phone numbers. Log every result using the Defect Log (Section B).

Pre-req setup (T-0):
1) Define one “Test Location” with timezone = America/New_York.
2) Define business hours: Mon–Fri 9am–5pm.
3) Set reminder schedule (example):
   - Reminder #1: 24 hours before appointment
   - Reminder #2: 2 hours before appointment
4) Configure high-confidence keyword overrides (must be rule-based):
   - Confirm: YES, Y, CONFIRM, CONFIRMED
   - Decline: NO, N, CAN’T, CANT
   - Reschedule intent: RESCHEDULE, MOVE, CHANGE, LATER, DIFFERENT TIME
   - Stop: STOP, UNSUBSCRIBE, CANCEL SMS
   - Help: HELP, INFO
5) Ensure opt-out compliance: after STOP, no further messages except required compliance confirmation.

Test Data: Create 12 appointments across 3 days
- A1: tomorrow 10:00am (new appointment)
- A2: tomorrow 4:30pm
- A3: tomorrow 9:00am
- A4: +2 days 1:00pm
- A5: +2 days 3:00pm
- A6: +2 days 4:45pm
- A7: same-day 2:00pm (created late)
- A8: same-day 2:15pm
- A9: +3 days 9:15am
- A10: +3 days 11:30am
- A11: +3 days 3:00pm
- A12: +3 days 4:00pm
Include at least 2 appointments with the same customer phone to test threading.

Timezones/DST Coverage:
- Duplicate the location as “Test Location West” timezone = America/Los_Angeles; create 3 similar appointments.
- Optional DST test: if you can alter system clock or use a known DST boundary date, schedule an appointment that crosses DST transition and verify reminder times.

--- Test Case 1: Basic reminder send + confirmation (YES)
Steps:
1) Wait for Reminder #1 (24h). Verify message includes: business name, appointment date/time in local timezone, and a clear CTA: “Reply YES to confirm, NO to cancel, or RESCHEDULE.”
2) Reply: “YES”.
Expected:
- System marks appointment confirmed.
- Customer receives acknowledgement: “You’re confirmed. See you [date/time]. Reply RESCHEDULE if you need to change.”
Pass/Fail:
- PASS if state updates within 60 seconds and ack is correct.

--- Test Case 2: Decline (NO) triggers cancellation workflow or owner alert
Steps:
1) On Reminder #1 for A2, reply “NO”.
Expected:
- Appointment status becomes declined/cancel requested.
- System responds with next-step guidance: either offers reschedule link/options or says office will contact.
- Owner/office receives alert (email or dashboard) within 5 minutes.

--- Test Case 3: Reschedule intent with natural language
Steps:
1) For A3, reply: “Can we move this to next week?”
Expected:
- Classified as RESCHEDULE intent (rule-based keywords or AI).
- System replies with reschedule flow: ask for preferred day/time window OR provide a reschedule link.
- No double-booking: new slot must be validated before confirmation.

--- Test Case 4: Threading / multiple messages from same number
Steps:
1) Same customer has A4 and A5.
2) When reminder arrives for A4, reply “YES”.
3) Immediately after, send: “Actually can you change the afternoon one?”
Expected:
- System does not confuse A4 and A5; it asks a clarifying question: “Which appointment do you want to change? Reply 1 for [A4 time] or 2 for [A5 time].”

--- Test Case 5: STOP compliance
Steps:
1) Reply “STOP” from any test phone.
Expected:
- System sends only a compliance confirmation: “You are opted out. No more messages.”
- No further reminders to that number across all appointments.
- Audit log entry recorded: opt-out timestamp, phone, location.

--- Test Case 6: HELP compliance
Steps:
1) Reply “HELP”.
Expected:
- Provide business name + contact email agent_bob_replit+no-show-bot@agentmail.to (or location phone if available) and opt-out instruction.

--- Test Case 7: Late confirmation near appointment time
Steps:
1) For same-day A7, send confirmation reply 15 minutes before start: “YES”.
Expected:
- Still confirms if allowed; otherwise responds: “Please call the office to confirm” (policy-based).
- Must not spam additional reminders.

--- Test Case 8: Reschedule loop prevention
Steps:
1) For A8, reply “RESCHEDULE”.
2) System asks for new time; reply vaguely: “Tomorrow.”
3) System requests a time window; reply “Morning.”
4) If no slots, system should offer alternatives and/or waitlist.
Expected:
- After N back-and-forth messages (recommend N=6), system escalates: “A team member will help. We’ll contact you shortly.” + owner alert.

--- Test Case 9: Double-booking prevention
Steps:
1) Attempt to reschedule A9 into a time slot already occupied by A10.
Expected:
- System rejects the conflicting time and offers next available options.
- No two appointments share the same provider/resource/time if that’s the model.

--- Test Case 10: Waitlist fill (gap filling)
Steps:
1) Cancel/decline A11.
2) Trigger waitlist logic: notify top waitlist customer “A slot opened at [time]. Reply YES to take it.”
3) Reply YES from waitlist.
Expected:
- Slot assigned to waitlist customer.
- Original appointment remains canceled.
- Confirmation sent to waitlist customer.
- Metric increments: waitlist_fill_count.

--- Test Case 11: Calendar API failure fail-safe
Steps:
1) Simulate calendar failure (disable API key, revoke access, or point to invalid endpoint) during a reschedule attempt for A12.
Expected:
- System DOES NOT confirm an unverified time.
- Customer receives: “We’re having trouble accessing the calendar. A team member will confirm shortly.”
- Owner alert sent within 2 minutes with error details.

--- Test Case 12: Timezone correctness (West location)
Steps:
1) For Test Location West, ensure reminders show Pacific time.
Expected:
- Message times reflect location timezone; no mixed TZ formatting.

Completion criteria for 48-hour QA:
- Zero P0 defects open.
- No STOP/HELP compliance failures.
- No mis-threading across multiple appointments for same number.
- Calendar failure always triggers owner alert + safe customer messaging.

==============================
B) DEFECT LOG TEMPLATE (COPY/PASTE)
Use one row per defect.

Defect ID: 
Date/Time Found: 
Found By: Bob
Environment: (prod sandbox / staging / live pilot)
Location: 
Severity: P0 (data loss/compliance), P1 (core workflow broken), P2 (major annoyance), P3 (minor)
Title: 
Description:
Steps to Reproduce:
Expected Result:
Actual Result:
Scope/Impact (how many appts/locations affected):
Logs/Message IDs (paste):
Screenshots/Transcripts (paste):
Workaround (if any):
Owner Notified? (Y/N + time):
Fix Owner (eng/ops):
Status: Open / In Progress / Fixed / Verified
Fix Notes:
Verification Steps:
Verified By/Date:

==============================
C) INCIDENT LOG TEMPLATE (OPS MONITORING)
Use for real-time outages or customer-facing issues.

Incident ID:
Start Time:
Detected By:
Symptom:
Customer Impact:
Locations Affected:
Current Status:
Immediate Mitigation:
Customer Comms Sent? (copy/paste):
Root Cause Hypothesis:
Next Update Time:
Resolved Time:
Postmortem Notes:
Preventive Action:

==============================
D) PILOT GO-LIVE MONITORING + ESCALATION SOP (CONCIERGE)
Objective: keep pilots safe + measurable while we validate reliability.

Daily monitoring cadence (Days 1–14):
1) 9:00am local time: Check message delivery health
   - Any delivery failures >2%? Any undelivered spikes?
   - Any STOP complaints or HELP confusion?
2) 12:00pm: Check reply classification sanity
   - Sample 10 replies; verify YES/NO/RESCHEDULE/STOP mapped correctly.
   - If misclassifications occur, add/adjust rule-based overrides immediately.
3) 4:30pm: Check calendar consistency
   - Confirm that confirmations/reschedules are reflected in calendar.
   - Spot-check 5 appointments: state in system == state in calendar.

Escalation triggers (notify location owner + internal within SLA):
- SLA 15 minutes (P0): STOP not honored; messages sent after STOP; incorrect appointment time; double-booking created; calendar API down while confirming.
- SLA 2 hours (P1): confirmation not recorded; reschedule flow dead-ends; repeated duplicate reminders.
- SLA 24 hours (P2/P3): minor copy issues; formatting; analytics mismatch.

Owner notification template (email):
Subject: Action needed: Appointment reminders system issue at [Location Name]
Body:
Hi [Owner Name] — quick heads up from Bob. We detected an issue affecting today’s reminders/reschedules.
What happened: [1 sentence]
Impact: [# patients/messages affected]
What we did: [mitigation]
Next step: [what we need from owner, if anything]
Status: [current]
Support: agent_bob_replit+no-show-bot@agentmail.to
Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Value protection rule:
- If calendar is unavailable, never confirm a new time. Always fall back to: “We’ll have a team member confirm shortly,” and alert the owner.

Weekly reporting readiness (for Monday email):
- Ensure metrics are populated daily: reminders_sent, delivered, replies_received, confirm_count, reschedule_count, cancel_count, waitlist_fill_count, opt_out_count, incident_count.
- Capture baseline: last 4 weeks no-show rate and average appointment value for recovered revenue estimate.

End of artifact.
