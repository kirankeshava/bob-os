# Pilot QA Simulation + Defect Workflow + Baseline/Go-Live Client Comms (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:59:34.475Z

---

## 1) 48-Hour Internal QA Simulation Script (run before Pilot #1 goes live)

**Goal:** Catch reliability issues that would break trust in the first 7 days: timezone/DST errors, reply parsing/threading, opt-out compliance, reschedule loops, calendar update failures, and double-booking prevention.

**Test data setup (30 minutes):**
- Create 12 synthetic appointments across 3 days.
- Include 3 timezones (e.g., America/New_York, America/Chicago, America/Los_Angeles).
- Include 1 appointment that crosses a DST boundary scenario (simulate by changing system TZ or using a known DST date).
- Include 2 appointments with the same patient name/phone across different days.
- Include 2 appointments that would conflict if rescheduled into a filled slot.

**Global acceptance criteria (must pass):**
- No reminder sends outside business hours unless explicitly configured.
- Every outbound message includes business identification and a clear instruction (confirm/reschedule/stop).
- STOP immediately suppresses future messages (and logs opt-out).
- Replies thread correctly to the right appointment context (or the system asks a clarifying question).
- Calendar changes (cancel/reschedule) do not create double-bookings.
- If calendar API fails, owner gets an alert within 5 minutes and automation pauses for affected appointments.

### Test Case A — Timezone correctness (core)
1. Set business timezone = America/New_York. Create appointment tomorrow at 10:00 AM local.
2. Configure reminder = 24 hours before.
3. Expected: reminder scheduled at 10:00 AM local time the day before (not UTC drift).
4. Switch business timezone to America/Los_Angeles (simulate another location).
5. Expected: the same “10:00 AM local” appointment triggers at 10:00 AM PT for that location.

**Pass/Fail:** Any reminder >15 minutes off local time = FAIL.

### Test Case B — DST boundary
1. Create appointment on a known DST transition day (or simulate date) at 9:00 AM local.
2. Configure reminder = 24 hours before.
3. Expected: reminder occurs at 9:00 AM local the prior day (no 23/25-hour drift).

### Test Case C — Reply parsing: YES/NO/RESCHEDULE
Send reminder. Reply with:
- “YES” → Expected: appointment confirmed, logged confirmation timestamp.
- “Yes, see you then” → Expected: confirmed.
- “NO” → Expected: system offers reschedule flow (or cancels per configuration).
- “reschedule” / “can we move it?” → Expected: reschedule flow.

**Rule-based overrides must win:** YES/NO/STOP/UNSUBSCRIBE/CANCEL/RESCHEDULE keywords should bypass AI if present.

### Test Case D — Ambiguous reply + clarifying question
Reply: “I can’t make it.”
- Expected: system asks: “Would you like to reschedule? Reply RESCHEDULE or NO to cancel.”
- Expected: no accidental cancellation without confirmation unless policy says otherwise.

### Test Case E — Threading correctness (two appointments)
1. Same phone number has two upcoming appointments (Day+1 and Day+3).
2. Reply “YES” after receiving the first reminder.
3. Expected: confirms the correct appointment.
4. If system cannot disambiguate, expected: asks which date/time to confirm.

### Test Case F — Opt-out compliance
Reply: “STOP”
- Expected: immediate opt-out, confirmation message (“You’re opted out…”), and zero further reminders.
- Verify: attempt to send another reminder → must be blocked.

Also test: “unsubscribe”, “opt out”, “do not text” → same expected behavior.

### Test Case G — Reschedule loop prevention
1. Reply “RESCHEDULE”. Offer 3 alternate slots.
2. User replies with an invalid time (“tomorrow afternoon”).
3. Expected: system asks for clarification or presents slots again.
4. After 3 back-and-forth attempts, expected: escalation to human/owner with transcript and suggested next action.

### Test Case H — Double-booking prevention
1. Pick a slot that is already occupied.
2. User requests that slot.
3. Expected: system refuses and offers next available options; no calendar write that overwrites.

### Test Case I — Calendar API failure fail-safe
1. Simulate calendar API error (invalid token / forced failure).
2. Attempt to confirm or reschedule.
3. Expected:
   - Automation pauses for affected appointment(s).
   - Owner alert is sent with clear text: what failed, which patient/time, and what manual step to take.
   - System logs incident with timestamp and error payload.

### Test Case J — Idempotency / duplicate sends
Trigger the scheduler twice (or replay webhook).
- Expected: no duplicate reminders; system should detect already-sent message by appointment+template+send-window.

### Output of simulation (required artifacts):
- Completed test run log (date/time, tester, pass/fail per test case).
- Defect log entries for each failure.
- Screenshot or transcript for any message-quality issue.

---

## 2) Defect / Incident Log Template (Pilot-ready)

**Severity definitions:**
- **S0 (Critical):** Compliance breach (opt-out ignored), wrong patient/time messaging, double-booking created, or owner not alerted on integration failure.
- **S1 (High):** Key workflow broken (cannot confirm/reschedule), repeated duplicates, timezone wrong.
- **S2 (Medium):** Confusing copy, minor threading issue with safe fallback, analytics missing.
- **S3 (Low):** Cosmetic/report wording.

**Defect record fields (copy/paste format):**
- ID:
- Date discovered:
- Location (pilot name):
- Severity (S0–S3):
- Summary (one sentence):
- Environment: prod / staging
- Steps to reproduce:
- Expected result:
- Actual result:
- Impact (how many patients / messages):
- Workaround (if any):
- Owner/client communication needed? (Y/N + draft)
- Logs/links (message IDs, webhook payloads, screenshots):
- Root cause (once known):
- Fix description:
- Verification steps:
- Verified by + date:

**Pilot incident SLA (concierge):**
- S0: acknowledge < 15 min, mitigate < 60 min
- S1: acknowledge < 2 hrs, mitigate same day
- S2/S3: weekly batch

---

## 3) Client-Facing Week-0 Baseline Request + Go-Live Email (ready to send)

**Subject:** Quick baseline + go-live details for your no-show reduction pilot

Hi {{OwnerName}},

Thanks again for agreeing to the pilot. To make sure we can prove results in week 1, can you reply with these baseline numbers (last 4 weeks is ideal):
1) Total scheduled appointments per week (average)
2) Average number of no-shows per week
3) Average appointment value ($) OR your best estimate of revenue per kept appointment
4) Your business hours + timezone

**Reminder rules (confirm so we match your preferences):**
- First reminder timing (e.g., 24 hrs before)
- Second reminder timing (e.g., 2 hrs before)
- Do you want a reschedule link/flow when someone replies NO?

**Compliance note:** Patients can opt out anytime by replying STOP. We honor opt-outs immediately.

We’ll send the weekly value report every Monday showing confirmations, reschedules saved, waitlist fills (if enabled), and estimated recovered revenue.

Legitimacy/info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Once you confirm the baseline + reminder rules, we can go live within 24 hours.

Best,
Bob Smith

---

## 4) Weekly Value Report Table Layout (paste into email)

**Subject:** Weekly No-Show Savings Report ({{LocationName}}) — Week of {{StartDate}}–{{EndDate}}

Hi {{OwnerName}},

Here’s your weekly pilot report:

**A) Activity & outcomes**
| Metric | This Week | Notes |
|---|---:|---|
| Total appointments messaged | {{N_messaged}} | Sent within business hours + configured timing |
| Confirmations received | {{N_confirmed}} | Confirmation rate: {{confirmed_rate}} |
| Reschedules completed | {{N_rescheduled}} | Saved from becoming no-shows |
| Cancellations (advance notice) | {{N_canceled}} | Allows backfill |
| Waitlist fills (if enabled) | {{N_waitlist_fills}} | Backfilled canceled/no-show risk slots |
| Opt-outs | {{N_optouts}} | Opt-out rate: {{optout_rate}} |

**B) Estimated revenue recovered**
- Baseline no-shows/week: {{baseline_noshows}}
- No-shows/week (observed): {{observed_noshows}}
- No-shows reduced: {{noshows_reduced}}
- Avg value per kept appointment: ${{avg_value}}
- **Estimated recovered revenue (this week): ${{recovered_revenue}}**

**C) Reliability / incidents**
- Incidents: {{incident_count}} ({{incident_summary}})
- Any messages escalated to your team: {{escalations}}

Reply with any preference changes (timing, wording, reschedule rules). We can tune this week-to-week.

Legitimacy/info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Best,
Bob Smith
