# Pilot QA Simulation Suite + Defect Log + 14-Day Monitoring SOP + Baseline/Check-in Emails (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:46:14.010Z

---

# Appointment No-Show Reducer — Pilot QA Simulation Suite + Defect Log + Monitoring SOP

Legitimacy URL (share with clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2  
Support email: agent_bob_replit+no-show-bot@agentmail.to

## 1) QA Simulation Test Suite (30 Test Cases)
**How to use:** For each case, record: Date/Time, Location timezone, Appointment start time, Reminder schedule, Patient reply (if any), Expected result, Actual result, Logs/screenshots, Pass/Fail, Notes.

### A. Timezone + DST correctness (6)
1. **TZ-01 Basic local time**: Location set to America/Chicago. Appointment 10:00am local tomorrow. Reminder at T-24h goes out at 10:00am local. **Expect:** correct local send time.
2. **TZ-02 Staff views in UTC**: Store appointment in UTC; render reminder in local time. **Expect:** message references correct local appointment time.
3. **TZ-03 DST spring forward**: Appointment scheduled on DST transition weekend. **Expect:** reminder timing doesn’t drift by 1 hour.
4. **TZ-04 DST fall back**: Appointment scheduled on fall-back day. **Expect:** no duplicate reminders; correct local time.
5. **TZ-05 Client changes timezone setting**: Update location timezone after setup. **Expect:** future reminders re-calculate; no retroactive spam.
6. **TZ-06 Multi-location**: Two locations different timezones. **Expect:** each location’s reminders follow its own timezone.

### B. Reminder schedule + cadence (5)
7. **REM-01 Standard cadence**: T-24h + T-2h reminders. **Expect:** exactly 2 reminders; no third message.
8. **REM-02 Same-day booking**: Appointment booked within 2 hours. **Expect:** only T-30min (or configured immediate) reminder; no missed sends.
9. **REM-03 After-hours message policy**: Reminder would send at 2:00am local. **Expect:** delayed to next allowed window (if policy enabled) or flagged.
10. **REM-04 Multiple appointments same patient**: Two appointments same number different times. **Expect:** correct threading + distinct context per appointment.
11. **REM-05 Cancellation before reminder**: Appointment canceled before T-24h. **Expect:** reminder suppressed; optional cancellation confirmation sent.

### C. Two-way confirmations + intent rules (7)
12. **INT-01 YES**: Reply “Yes”. **Expect:** mark confirmed; stop further confirmation prompts.
13. **INT-02 Y/Confirm/👍**: Reply “Y”. **Expect:** confirmed (rule-based override).
14. **INT-03 NO**: Reply “No”. **Expect:** mark unconfirmed; offer reschedule link/options.
15. **INT-04 RESCHEDULE**: Reply “reschedule” or “can we move it”. **Expect:** enter reschedule flow; prevent double-book.
16. **INT-05 STOP**: Reply “STOP”. **Expect:** immediate opt-out; confirmation message; no further sends.
17. **INT-06 HELP**: Reply “HELP”. **Expect:** send help/support text with support email; do not change appointment state.
18. **INT-07 Ambiguous**: Reply “maybe” / “not sure”. **Expect:** request clarification; do not confirm/cancel.

### D. Reschedule flow + loops (5)
19. **RSC-01 Simple reschedule**: Patient requests reschedule; chooses a slot; calendar updated. **Expect:** original canceled + new booked; confirmation sent.
20. **RSC-02 Reschedule loop prevention**: Patient keeps replying “reschedule” repeatedly. **Expect:** throttle; provide single link; do not create multiple tentative holds.
21. **RSC-03 Slot taken concurrently**: Two patients attempt same slot. **Expect:** first wins; second offered alternatives; no double-book.
22. **RSC-04 Provider constraints**: Only certain services at certain times. **Expect:** offered slots comply with rules.
23. **RSC-05 Late reschedule policy**: Reschedule request inside cutoff window. **Expect:** respond with policy + request staff approval/escalation.

### E. Calendar integrity + double-book prevention (4)
24. **CAL-01 External edit**: Staff moves appointment in calendar UI. **Expect:** reminder schedule updates; patient notified of new time.
25. **CAL-02 External cancel**: Staff cancels in calendar. **Expect:** stop reminders; optional cancellation note.
26. **CAL-03 Duplicate event detection**: Same appointment imported twice. **Expect:** dedupe; send single reminder thread.
27. **CAL-04 Overlapping appointments**: Attempt create overlap. **Expect:** blocked or flagged; no patient confirmation on invalid event.

### F. Failure handling + owner alerts (3)
28. **FAIL-01 Calendar API outage**: Simulate API failure during reschedule. **Expect:** fail-safe message to patient (“We’ll confirm shortly”); alert owner via email; incident logged.
29. **FAIL-02 SMS delivery failure**: Simulate unreachable number/carrier error. **Expect:** mark number invalid; alert staff; stop repeated retries.
30. **FAIL-03 Analytics write failure**: Event logging fails. **Expect:** retry/backoff; if persistent, alert owner; core messaging still proceeds.

**Pass criteria for go-live:** All STOP/HELP cases pass; timezone correctness passes; calendar update + no double-book passes; FAIL-01 produces owner alert + safe patient message.

---

## 2) Defect / Incident Log Template (Copy/Paste)
Use one row per issue.

- **ID:** (e.g., PILOT1-001)
- **Date/Time observed:**
- **Location:**
- **Reporter:**
- **Severity:**
  - **S0** Compliance/privacy risk (STOP ignored, wrong recipient, etc.)
  - **S1** Causes missed reminders / double-book / wrong appointment state
  - **S2** Degrades experience (wrong wording, minor timing drift)
  - **S3** Cosmetic / enhancement
- **Category:** Timezone / Messaging / Intent / Calendar / Reschedule / Waitlist / Analytics / Deliverability
- **Steps to reproduce:** (numbered)
- **Expected result:**
- **Actual result:**
- **Evidence:** logs, screenshots, message IDs, calendar event IDs
- **Customer impact:** # patients affected, $ impact estimate
- **Workaround:** (if any)
- **Owner:**
- **Status:** New / Triaged / In Progress / Fixed / Verified / Won’t Fix
- **Fix notes:**
- **Verification steps:**
- **Verified by + date:**

---

## 3) 14-Day Pilot Monitoring SOP (Concierge Ops)
**Goal:** Prevent silent failures, protect compliance, and generate weekly proof (confirmed/rescheduled/fill + recovered revenue).

### Daily (Mon–Sat) checklist (10–15 min per location)
1. **Delivery health:** Check message send success rate; investigate any carrier errors/unsub spikes.
2. **STOP compliance audit:** Confirm all STOPs are honored immediately; ensure no further sends after opt-out.
3. **Threading sanity:** Spot-check 5 random threads for correct appointment context.
4. **Calendar sync:** Verify new/edited/canceled appointments are reflected in reminders (spot-check today + tomorrow).
5. **Reschedule integrity:** Confirm reschedules cancel old slot and book new slot; verify no overlaps.
6. **Waitlist fills (if enabled):** Review any gaps filled and confirm correct order + consent.
7. **Incident review:** Any FAIL-01/02/03 triggers? Ensure owner alerted and patient got safe message.
8. **Metrics capture:** Record daily totals: reminders sent, confirmations, reschedule requests, completed reschedules, opt-outs.

### Alert thresholds (immediate escalation to owner)
- Any **S0** event (STOP ignored, wrong recipient, PII leak risk).
- Confirmation rate drops **>30%** vs prior 3-day average (potential deliverability or wording issue).
- Calendar API errors for **>15 min** or any reschedule attempt fails.
- Opt-out rate **>5%** in a day (check message content/frequency).

### Weekly (Monday) reporting inputs
- Baseline no-show rate (pre-pilot) vs pilot week no-show rate.
- Confirmations, reschedules saved, waitlist fills.
- Estimated recovered revenue = (no-show reduction * avg appt value) + (waitlist fills * avg appt value).
- Incident summary + mitigations.

---

## 4) Client Emails (Baseline Request + Week-1 Check-in)

### Email A — Week-0 Baseline Request (send immediately after pilot agrees)
**Subject:** Quick baseline info for your no-show reduction pilot (10 minutes)

Hi {{OwnerName}},

Excited to get your location live on the Appointment No-Show Reducer pilot. Here’s our legitimacy page you can share internally: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

To measure impact in Week 1 (and quantify recovered revenue), could you reply with these baseline numbers from the last 4 weeks (estimates are OK):
1) Approx. appointments/week: ___
2) Estimated no-show rate (%): ___
3) Average appointment value ($): ___
4) Typical reminder method today (calls/text/email/none): ___
5) Your business timezone + hours: ___

Also confirm the SMS consent approach you want to use:
- Option A: You already collect SMS consent at booking (preferred)
- Option B: We send a one-time opt-in text to existing clients before reminders start

If anything looks off or you want to pause messages at any time, email us at agent_bob_replit+no-show-bot@agentmail.to.

Thanks,
Bob Smith

### Email B — Week-1 Check-in (send Day 7)
**Subject:** Week 1 check-in — early results + any tweaks?

Hi {{OwnerName}},

Checking in after the first week. We’re tracking confirmations, reschedules saved, opt-outs, and any gaps filled (if waitlist is enabled). Next step is to send your Monday value report summarizing:
- Confirmation rate
- Reschedules handled without staff time
- No-show reduction estimate vs your baseline
- Estimated recovered revenue
- Any incidents + how we handled them

If you’ve noticed any messaging you’d like adjusted (tone, timing, or reschedule rules), reply here and we’ll update it the same day.

Legitimacy page (for your records): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob Smith
