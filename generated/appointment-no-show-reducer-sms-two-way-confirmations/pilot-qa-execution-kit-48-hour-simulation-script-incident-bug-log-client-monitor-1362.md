# Pilot QA Execution Kit (48-hour Simulation Script + Incident/Bug Log + Client Monitoring Comms + Weekly Metrics Block)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:24:22.794Z

---

## 1) 48-Hour Internal QA Simulation Script (Run exactly as written)
Goal: catch reliability + edge cases before (and during) the first 2–3 concierge pilots. Log every anomaly into the Incident/Bug Log (Section 2).

### Pre-Flight Setup (T-0)
1. Confirm environment variables/config:
   - Business timezone set (test at least: America/New_York and America/Los_Angeles).
   - Reminder schedule configured (e.g., T-24h and T-2h) and a same-day reminder (e.g., T-1h) if offered.
   - Owner escalation contact is configured (email/SMS) for system failures.
2. Confirm message policy:
   - Outbound SMS includes business name + opt-out language where required.
   - Inbound STOP/UNSUBSCRIBE immediately suppresses future messaging.
   - HELP returns support contact (agent_bob_replit+no-show-bot@agentmail.to).
3. Create synthetic appointments:
   - 12 total appointments over next 48 hours.
   - Mix: 1) new patient, 2) returning, 3) multi-service, 4) two appointments for same patient number, 5) back-to-back slots.
   - Include at least 2 appointments that will be rescheduled, 2 that will be canceled, 2 that will confirm normally, 2 that will not respond.

### Test Suite A — Timezones/DST (Hour 0–4)
A1. Create appointment in ET for 10:00 AM tomorrow.
- Expected: Reminder times compute correctly in ET; message shows correct local time.
A2. Create appointment in PT for 10:00 AM tomorrow.
- Expected: Reminder times compute correctly in PT; no ET leakage.
A3. DST boundary simulation (if you can set system clock/test date): appointment on DST change weekend.
- Expected: No double-send or missed reminder; time displayed correctly.

### Test Suite B — Threading & Identity (Hour 4–10)
B1. Patient replies “Yes” to confirm.
- Expected: System marks confirmed and stops further confirmation prompts; still sends informational reminder if policy says so.
B2. Patient replies with extra text: “Yes I’ll be there thanks”.
- Expected: Classified as CONFIRM (rule-based override wins).
B3. Patient replies from same number about different appointment (“Can you move me to Friday?”).
- Expected: System requests clarification or lists next steps; does not modify wrong appointment.
B4. Two-way thread continuity check:
- Send two outbound messages; patient replies once.
- Expected: Reply links to the latest open appointment context.

### Test Suite C — Reschedule Loop & Double-Booking Prevention (Hour 10–20)
C1. Patient replies “Reschedule”.
- Expected: System offers reschedule options or hands off to concierge flow; does not cancel unless confirmed.
C2. Patient replies “Tomorrow at 3 works”.
- Expected: Interprets as reschedule intent; if slot unavailable, propose alternates. Must never double-book.
C3. Attempt conflicting booking:
- Create a second appointment occupying the reschedule slot, then attempt reschedule into it.
- Expected: System refuses and proposes other times; logs event.
C4. Reschedule loop prevention:
- Patient changes mind multiple times (“Actually 4”, “No 5”).
- Expected: System limits attempts or escalates to owner/concierge after N tries (define N=3).

### Test Suite D — Opt-Out, HELP, and Compliance (Hour 20–28)
D1. Patient replies “STOP”.
- Expected: Immediate suppression + confirmation message; no more reminders.
D2. Patient replies “Unsubscribe”.
- Expected: Same as STOP.
D3. Patient replies “HELP”.
- Expected: Returns: support email agent_bob_replit+no-show-bot@agentmail.to and brief instructions.
D4. Patient opts out, then later replies “YES”.
- Expected: Do NOT re-enable automatically; respond explaining they are opted out and how to opt back in (if allowed).

### Test Suite E — Failure Modes & Fail-safes (Hour 28–40)
E1. Simulate calendar API failure (disconnect token / force error).
- Expected: System logs P0 incident + alerts owner immediately (email/SMS). Outbound messages should pause if state is uncertain.
E2. Message send failure (simulate provider error if possible).
- Expected: Retry policy applies (e.g., 2 retries); after failure, escalate to owner; do not spam.
E3. Analytics write failure (DB/write error).
- Expected: System continues core messaging but logs incident; queues event for retry if supported.

### Test Suite F — Analytics Integrity (Hour 40–48)
F1. Verify each event recorded:
- Appointment created, reminder sent, reply received, confirmation set, reschedule requested, reschedule completed, cancellation, waitlist fill (if simulated).
F2. Manually compute:
- Total reminders sent, unique patients messaged, confirmations.
- Expected: Dashboard/rollup matches manual counts.
F3. Produce a mock weekly report using the Weekly Metrics Block (Section 4).

Exit Criteria (Pass/Fail):
- P0/P1 incidents must be zero OR have a documented mitigation that prevents customer harm before any live pilot.
- STOP/HELP compliance must be perfect.
- No double-booking in any scenario.

---

## 2) Pilot Incident/Bug Log Template (Copy/paste into a sheet)
Use one row per issue.

Fields:
- ID: (e.g., PILOT-QA-001)
- Date/Time (UTC + local)
- Location/Pilot: (Internal QA / Client Name)
- Severity: P0 / P1 / P2 / P3
  - P0 = Compliance breach, wrong patient contacted, opt-out failure, double-booking, system down
  - P1 = Incorrect confirmation/reschedule state, wrong time/timezone, owner alert missing
  - P2 = Minor message quality issues, confusing copy, non-blocking analytics mismatch
  - P3 = Cosmetic/UI/report formatting
- Channel: SMS / Email / Calendar / Analytics
- Summary: 1 sentence
- Steps to Reproduce: numbered
- Expected Result:
- Actual Result:
- Impact: who/what affected
- Mitigation Applied (if any):
- Owner/Client Notified? (Y/N + when)
- Assigned To:
- Status: New / Investigating / Fixed / Verified / Won’t Fix
- Fix Notes:
- Verification Steps:
- Verified By + Date:

Comms SLA during pilots:
- P0: acknowledge within 15 minutes; mitigate within 1 hour.
- P1: acknowledge within 2 hours; mitigate within 1 business day.
- P2/P3: batch into next release/report.

---

## 3) Client-Facing Monitoring Comms (Ready to send)

### 3A) Pilot Day-0 Monitoring Email (to owner/manager)
Subject: Pilot is live — what to expect + how to reach us

Hi {{FirstName}},

We’re live for the no-show reduction pilot starting today.

What you’ll see:
- Patients will receive smart SMS reminders and can reply to confirm or request a reschedule.
- If a patient opts out (STOP), they will be suppressed from future messages.
- If anything looks off (calendar connection issues, message delivery problems), we’ll alert you quickly.

Monitoring & support:
- Daily monitoring during the first week.
- If you see anything urgent, reply to this email or reach us at: agent_bob_replit+no-show-bot@agentmail.to
- Business info / legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

To keep the pilot clean, please tell us right away if:
1) you change business hours, 2) you change appointment durations, or 3) you update your calendar system/settings.

Thanks — we’ll send your first weekly value report after 7 days with confirmations, reschedules saved, and estimated revenue recovered.

— Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to


### 3B) Day-1 Check-in SMS (to owner/manager, if they prefer text)
“Hi {{FirstName}} — Bob from Appointment No-Show Reducer. Quick check-in: reminders + confirmations are running today. If you notice anything odd (wrong time/timezone, reschedules not reflected, etc.) reply here or email agent_bob_replit+no-show-bot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2”

---

## 4) Weekly Metrics Block (Standardized for all pilots)
Use this exact block in weekly reports so outcomes are comparable across locations.

Week of: {{StartDate}}–{{EndDate}}
Location: {{LocationName}}

Volume
- Appointments scheduled: {{A}}
- Patients messaged (unique): {{B}}
- Reminders sent: {{C}}

Engagement & Outcomes
- Confirmations received: {{D}} ({{D/B}}% of patients messaged)
- Reschedule requests: {{E}}
- Reschedules completed: {{F}}
- Cancellations captured in advance: {{G}}
- Waitlist fills (if enabled): {{H}}

No-show Reduction (Estimate)
- Baseline no-show rate (from prior 4 weeks): {{R0}}%
- This week observed no-show rate: {{R1}}%
- Prevented no-shows (estimate): max(0, (R0 - R1) * A)

Recovered Revenue (Estimate)
- Avg appointment value: ${{V}}
- Estimated recovered revenue this week: ${{PreventedNoShows}} * ${{V}} + (${{H}} * ${{V}})

Reliability
- Incidents: P0={{P0Count}}, P1={{P1Count}}, P2={{P2Count}}
- Notes/Actions taken: {{ShortBullets}}

Client-facing takeaway sentence (include every week):
“Based on your baseline no-show rate, we estimate {{RecoveredRevenue}} in revenue was recovered this week through confirmations, proactive reschedules, and filled gaps.”
