# Pilot QA + Value Pack (48-hour Simulation, Defect Triage, Day 0–7 Monitoring, Weekly Value Report + Metric Definitions)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:15:17.441Z

---

# Appointment No-Show Reducer — Pilot QA + Value Pack
Website (legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2  
Support: agent_bob_replit+no-show-bot@agentmail.to

## 1) 48-hour Internal QA Simulation Script (run before Pilot #1 go-live)
**Goal:** Validate reliability + message quality + measurable event tracking before exposing real customers.

### Setup (60 minutes)
- Configure a *test location* with:
  - Timezone: run once in America/New_York, once in America/Los_Angeles.
  - Business hours: 9am–5pm.
  - Reminder schedule: T-24h and T-2h.
  - Reschedule rule: allow reschedule within business hours; if outside, offer next-day slots.
  - Waitlist rule: maintain waitlist of 5 test contacts; offer slot in FIFO order; expire offer after 15 minutes.
- Create **20 synthetic appointments** across 2 days:
  - 6 same-day appointments, 10 next-day, 4 two-days-out.
  - Include edge times: 8:50am, 4:55pm, 11:55pm local.

### What to log for every test case
- Test Case ID
- Location timezone
- Appointment ID
- Outbound message body
- Patient reply (if any)
- Parsed intent (rule-based + AI)
- Final system action (confirm/reschedule/cancel/escalate)
- Calendar action result (success/failure + error)
- Analytics events emitted (confirmation/reschedule/waitlist_fill/opt_out)
- Notes + screenshots

### Test Cases (25)
**TC-01 Timezone correctness (T-24h)**
- Create appointment for tomorrow 10:00am local.
- Expect reminder sends exactly at 10:00am local minus 24h (not server time).
- Log send timestamp and local conversion.

**TC-02 DST boundary**
- Create appointment on a DST transition date (simulated).
- Expect reminder timing stays aligned to local time.

**TC-03 T-2h reminder respects business hours**
- Appointment at 8:00am; T-2h is 6:00am.
- Expect either: (a) send at business opening with adjusted copy, or (b) policy-driven send allowed—document chosen behavior.

**TC-04 Reply threading — YES**
- Reply: “Yes”.
- Expect: mark confirmed; no further confirmation prompts.

**TC-05 Reply threading — lowercase/whitespace**
- Reply: “  yes  ”
- Expect: confirmed.

**TC-06 Reply threading — emoji/short**
- Reply: “👍”
- Expect: confirmed OR ask a clarification depending on policy; document.

**TC-07 Negative confirmation**
- Reply: “No”.
- Expect: trigger reschedule flow; do not cancel silently.

**TC-08 Reschedule keyword**
- Reply: “reschedule”
- Expect: present 3 next available slots + ask to pick.

**TC-09 Natural language reschedule**
- Reply: “Can we do Friday afternoon?”
- Expect: AI parses intent=reschedule; offers Friday afternoon slots; if none, offers nearest alternatives.

**TC-10 Ambiguous reply**
- Reply: “Maybe”
- Expect: clarification question: “Reply YES to confirm, NO to reschedule.”

**TC-11 STOP compliance**
- Reply: “STOP”
- Expect: opt-out immediately; send one confirmation of opt-out; suppress future messages; emit opt_out event.

**TC-12 STOP variant**
- Reply: “Stop texting me”
- Expect: opt-out.

**TC-13 HELP compliance**
- Reply: “HELP”
- Expect: support info + how to opt out; include support email: agent_bob_replit+no-show-bot@agentmail.to

**TC-14 Wrong-number handling**
- Reply: “Wrong number”
- Expect: opt-out + mark contact as invalid; notify owner.

**TC-15 Double-booking prevention**
- Two patients attempt to take the same newly opened slot via waitlist link.
- Expect: first wins; second is told slot taken + offered alternatives.

**TC-16 Calendar update success**
- Reschedule chosen.
- Expect: old appointment canceled/updated; new slot created; patient receives confirmation.

**TC-17 Calendar API failure fail-safe**
- Simulate calendar API down on reschedule.
- Expect: do NOT claim reschedule succeeded; send patient: “We’re confirming with the office—stand by.”
- Expect owner alert within 2 minutes (email/SMS per config). Log alert content.

**TC-18 Duplicate reminders suppression**
- Trigger scheduler twice.
- Expect: only one outbound reminder per window.

**TC-19 Late confirmation after reschedule started**
- Patient replies YES to the original appointment after being offered reschedule slots.
- Expect: system asks: “Confirm original time or pick a new time?” and avoids conflicting states.

**TC-20 Cancellation intent**
- Reply: “Cancel”
- Expect: either (a) confirm cancellation + calendar update, or (b) escalate for staff approval. Document policy.

**TC-21 Multi-appointment patient**
- Same phone has 2 appointments.
- Expect: messages clearly identify which appointment; replies map correctly.

**TC-22 Non-English reply**
- Reply in Spanish: “Sí”
- Expect: confirm OR ask clarification; document and create override if frequent.

**TC-23 Rate-limit / carrier failure**
- Simulate message send failure.
- Expect: retry policy; if final failure, owner alert; log error.

**TC-24 Waitlist fill event**
- Create cancellation; offer slot to waitlist.
- Expect: first accept triggers booking + waitlist_fill event.

**TC-25 Analytics integrity**
- After all tests, verify counts:
  - confirmations == number of YES-confirmed appointments
  - reschedules == number of completed reschedules
  - opt_out == STOP events
  - waitlist_fill == accepted offers

## 2) Defect List Template + Triage Rubric
### Severity levels
- **S0 (Critical):** Compliance/privacy breach, STOP not honored, wrong patient data, confirms/reschedules the wrong appointment, double booking occurs.
- **S1 (High):** Calendar updates fail without owner alert; reminders sent at wrong time/timezone; repeated messages causing spam.
- **S2 (Medium):** Message quality confusing; ambiguous replies not handled well; analytics off by >10%.
- **S3 (Low):** Typos, minor formatting, non-blocking UX improvements.

### Defect entry format
- ID:
- Severity:
- Environment (pilot/internal):
- Steps to reproduce:
- Expected:
- Actual:
- Logs/IDs (message SID, appointment ID):
- User impact:
- Mitigation (immediate workaround):
- Fix owner:
- Fix ETA:
- Verification steps:
- Verified by + date:

### Comms / SLA
- S0: notify owner immediately + pause automation for affected location.
- S1: notify owner within 2 hours, ship mitigation same day.
- S2: weekly batch.
- S3: backlog.

## 3) Day 0–Day 7 Pilot Monitoring Checklist (concierge ops)
**Day 0 (Go-live)**
- Confirm timezone + business hours.
- Confirm reminder schedule (T-24h, T-2h).
- Confirm consent language approved by client.
- Send 1 test reminder to owner phone, validate YES/NO/STOP.

**Day 1–7 (Daily, 10 minutes/location)**
- Review yesterday’s metrics: reminders sent, confirmations, reschedules, opt-outs, failures.
- Spot-check 5 conversations for tone/clarity.
- Verify calendar updates for all reschedules.
- Check for duplicate reminders.
- Review incident log; escalate any S0/S1.

**Escalation message to owner (if calendar/API fails)**
Subject: Action needed: appointment automation could not update calendar
Body: “We attempted to [confirm/reschedule] an appointment at [time] for [patient initials]. Calendar update failed with error: [error]. Please update manually and reply to confirm once done. Support: agent_bob_replit+no-show-bot@agentmail.to. Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2”

## 4) Weekly Client Value Report (email template)
**Send:** Every Monday 9:00am local time.

Subject: Weekly No‑Show Reduction Report — [Location Name] — Week of [Date]

Hi [Owner Name],

Here’s your weekly summary from Appointment No‑Show Reducer (legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2). Reply to this email (agent_bob_replit+no-show-bot@agentmail.to) if you want any reminder timing or reschedule rules adjusted.

**1) Outcomes (last 7 days)**
- Reminders sent: [X]
- Confirmations received (YES): [X] ([X%] of reminded appointments)
- Reschedules completed: [X]
- Waitlist fills (open slots filled): [X]
- Opt-outs (STOP): [X]

**2) Estimated recovered revenue**
- Average appointment value: $[A] (from your baseline)
- Estimated saves from reschedules + confirmations that prevented no-shows: [X]
- **Estimated recovered revenue this week:** **$[X * A]**

**3) Notable saves (examples)**
- [Day]: Appointment at [time] rescheduled successfully instead of no-show.
- [Day]: Cancellation filled via waitlist in [N] minutes.

**4) Reliability / issues**
- Calendar update failures: [0/X]
- Any incidents: [none] OR [summary + resolution]

**5) Next week optimization (1–2 suggestions)**
- Suggestion 1: [e.g., add T-48h for high-ticket services]
- Suggestion 2: [e.g., tighten waitlist offer expiry from 30m → 15m]

Thanks,  
Bob Smith  
Appointment No‑Show Reducer  
agent_bob_replit+no-show-bot@agentmail.to

## 5) Report Appendix (metric definitions + recovered revenue rules)
- **Reminder sent:** outbound message successfully delivered for an upcoming appointment.
- **Confirmation:** patient replies YES (or equivalent) and system marks appointment confirmed.
- **Reschedule completed:** patient selects an alternative slot and calendar reflects the updated time.
- **Waitlist fill:** an open slot is offered to waitlist and accepted, resulting in a booked appointment.
- **Opt-out:** STOP (or equivalent) received; no further messages sent.

### Recovered revenue calculation (standard)
- Input: average appointment value ($A) provided by client.
- **Recovered revenue/week** = $A × (reschedules_completed + waitlist_fills + confirmations_flagged_as_at-risk)
- For early pilots, default: confirmations_flagged_as_at-risk = 0 unless client provides a baseline no-show risk model. Keep conservative to maintain credibility.

### Baseline fields required (per location)
- Last 4 weeks: total appointments, no-shows, cancellations, average appointment value, and current reminder method.

---
This pack is ready to use for internal QA and then for live pilots; it ensures we catch edge cases, log defects consistently, and produce a weekly client report that ties behavior to dollars.