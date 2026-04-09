# Pilot Activation Bundle v1 (Synthetic QA Simulation + Kickoff/Consent Email + Defect Log)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:25:20.537Z

---

## 1) 48-hour Internal Synthetic QA Simulation Plan (Pre-Pilot)
Goal: before any live pilot, validate the highest-risk workflows end-to-end so we don’t burn trust. Run this over 48 hours with synthetic appointments spanning timezones, DST edge cases, and realistic patient/customer reply behavior.

### A. Test data fixtures (create 20 synthetic appointments)
Create appointments with these attributes (even if manually in your system):
1. Timezones: 5 in America/New_York, 5 in America/Chicago, 5 in America/Denver, 5 in America/Los_Angeles.
2. Business hours boundaries: include 2 appointments right at opening, 2 right at closing.
3. Lead times: 6 same-day, 6 next-day, 8 3–7 days out.
4. DST edge: at least 2 appointments on the week of DST change (spring forward/fall back) and confirm reminder schedule uses local timezone.
5. Phone formats: E.164 and common local formats; verify normalization.
6. Duplicate scenarios: 2 pairs where the same customer has two appointments in the same week (threading + correct mapping).

### B. Reminder schedule scenarios (expected behavior)
For each appointment, configure reminders at:
- T-24h and T-2h (or your current default).
Validate:
- Messages are sent at the correct local time (not server time).
- Customer name/service/time are correct.
- If appointment time changes, future reminders update accordingly.

### C. Scripted reply simulation (send these replies)
For each reply, verify parsing outcome + resulting action + message back to customer.
1. Confirm: “YES”, “Yep”, “Confirm”, “I’ll be there”, “Y”.
Expected: status=CONFIRMED; confirmation message sent; no further nag reminders.
2. Decline: “NO”, “Can’t make it”, “cancel”, “Nope”.
Expected: status=CANCEL_REQUESTED or CANCELLED per rules; notify staff/owner; free slot for waitlist fill.
3. Reschedule: “RESCHEDULE”, “need to move”, “different time”, “tomorrow instead”.
Expected: status=RESCHEDULE_REQUESTED; ask for preferred times/days; alert staff if automation cannot complete.
4. Ambiguous: “Maybe”, “not sure”, “what time is it?”, “who is this?”.
Expected: ask clarifying question; do not mark confirmed.
5. STOP compliance: “STOP”, “Unsubscribe”, “Stop texting me”.
Expected: immediate opt-out; confirmation of opt-out; hard block all future outbound (critical).
6. HELP: “HELP”, “support”, “human”.
Expected: send help message with support contact: agent_bob_replit+no-show-bot@agentmail.to and a brief explanation.
7. Late reply: send “YES” after appointment start time.
Expected: do not incorrectly mark as attended; log as late confirmation; optionally notify staff.
8. Thread collision: two customers reply “YES” around same time; ensure mapping to correct appointment via phone + context.

### D. Failure injection (must-have fail-safes)
1. Calendar/API failure simulation: temporarily disable calendar write-back (or mock failure).
Expected: system alerts owner/staff; continues sending reminders without corrupting appointment state; logs incident.
2. Delivery failure: simulate unreachable number.
Expected: incident logged; fallback alert to owner (if configured); no infinite retries.
3. Double-book prevention: attempt to reschedule into an occupied slot.
Expected: system refuses; proposes alternatives; logs attempt.

### E. Exit criteria (pass/fail)
Pilot-ready if:
- 0 critical failures (STOP compliance, wrong timezone, wrong patient/appointment mapping, or reminders sending at incorrect times).
- <3 major failures, each with workaround documented.
- All parsing overrides for YES/NO/STOP/RESCHEDULE work deterministically.


## 2) Client-Facing Pilot Kickoff Email (Concierge Pilot + Consent)
Subject: Quick kickoff — reduce appointment no-shows (free 7-day pilot)

Hi {{OwnerName}},

Thanks for agreeing to the free 7-day pilot of our Appointment No-Show Reducer. We send smart SMS reminders, collect two-way confirmations, and help automate reschedules so you recover revenue from missed appointments.

For reference/legitimacy, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

Before we turn anything on, please reply to confirm:
1) Timezone for this location: {{Timezone}}
2) Reminder timing preference (choose one):
   A) 24h + 2h before
   B) 48h + 4h before
   C) Custom: {{Custom}}
3) Confirmation wording preference:
   - “Reply YES to confirm, NO to cancel, RESCHEDULE to change.” (recommended)
4) Consent/opt-in confirmation (required):
   Please confirm: “We will only text customers who have provided their phone number for appointment communication and have consented to receive SMS reminders. We will honor STOP immediately.”

During the pilot we’ll track: confirmations, reschedules handled, any waitlist fills, and an estimate of recovered revenue per week.

If you want, send your last 4 weeks baseline (approx.):
- Appointments/week: {{#}}
- No-show rate (%): {{%}}
- Avg appointment value ($): {{Value}}

Once confirmed, we’ll go live within 24 hours and monitor daily.

Best,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to


## 3) Pilot Defect/Bug Log Format (for rapid iteration)
Use one row per issue; keep a single source of truth.

Fields:
- ID: BUG-001
- Date/Time detected:
- Detected by: (internal QA / pilot client / monitoring)
- Environment: (pilot location, timezone, integration)
- Severity:
  - Critical: compliance risk (STOP), wrong recipient, wrong timezones/DST, system spamming, data corruption
  - Major: core workflow broken (confirm/reschedule/cancel fails), calendar write-back failing without alert
  - Minor: copy/typo, formatting, non-blocking analytics mismatch
- Steps to reproduce (exact):
- Expected result:
- Actual result:
- Logs/Message IDs (if available):
- Suspected root cause:
- Owner:
- Workaround (if any):
- Fix PR/Change reference:
- Verification steps (re-test):
- Status: Open / In progress / Fixed / Verified / Won’t fix

Verification checklist for each fix:
- Confirm no regression on STOP/HELP and YES/NO parsing.
- Confirm timezone correctness for the pilot’s location.
- Confirm message threading still maps to the correct appointment.
- Confirm analytics counters (confirmation/reschedule/cancel) update exactly once per event.

This bundle is intended to be used immediately: run the synthetic simulation first, then use the kickoff email to onboard the first pilot location, and log every incident/defect using the format above so we can resolve issues quickly and protect client trust.