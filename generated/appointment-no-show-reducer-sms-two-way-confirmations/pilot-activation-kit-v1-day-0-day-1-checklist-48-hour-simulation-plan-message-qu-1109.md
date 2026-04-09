# Pilot Activation Kit v1 (Day 0→Day 1 Checklist, 48-Hour Simulation Plan, Message-Quality Rubric, Client Welcome Email)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:39:08.326Z

---

## 1) Pilot Activation Checklist (Day 0 → Day 1)
Goal: get a location live within 24 hours while protecting compliance, avoiding double-booking, and capturing baseline metrics.

### Day 0 (Pre-Go-Live)
1) **Confirm pilot scope + consent**
- Pilot length: 14 days (minimum) with Week 1 report.
- Confirm the business is authorized to message clients about appointments.
- Confirm opt-out language is included in initial reminder message (e.g., “Reply STOP to opt out”).

2) **Collect baseline metrics (required before sending any reminders)**
- Last 4 weeks (or last 100 appointments): total booked, total no-shows, cancellations, reschedules.
- Average appointment value (or average invoice) and any deposit/no-show fee policy.
- Typical no-show rate (if known).

3) **Business configuration intake**
- Location timezone (explicit; do not assume): e.g., America/Chicago.
- Business hours + “quiet hours” for texting.
- Reminder cadence (recommended starting point):
  - 24 hours before
  - 2 hours before
- Confirmation logic: ask for YES/NO/RESCHEDULE.
- Reschedule rules: who can reschedule (self-serve vs staff-only), earliest allowed date/time, and whether to offer a callback.
- Waitlist rules: how many people to notify for a newly opened slot, hold duration, and selection priority.

4) **Compliance + copy lock**
- First message includes: business name, reason for text, clear next step, STOP opt-out.
- HELP response includes: support email **agent_bob_replit+no-show-bot@agentmail.to**.

5) **Integration verification (must pass before live)**
- Calendar read: can we list upcoming appointments?
- Calendar write-back (if enabled): can we update status/notes or create a rescheduled event?
- Failure alert channel: owner/staff email/SMS for “calendar API failed” or “message send failed.”

6) **Test messages (staff-only dry run)**
- Send test reminder to staff phone.
- Staff replies: YES, NO, RESCHEDULE, STOP, HELP.
- Verify threading: replies attach to correct appointment.

### Day 1 (Go-Live)
1) Enable reminders for real appointments starting with the next 24–48 hours only.
2) Monitor the first 10 conversations manually.
3) Validate opt-outs are honored within 1 minute.
4) Confirm reschedule path does not create double-booking.
5) Log anything unclear (message quality rubric below) and create fixes before scaling volume.

---

## 2) 48-Hour Internal QA Simulation Plan (Synthetic Scenarios)
Purpose: catch edge cases before contacting large volumes of real clients.

### Setup
- Create synthetic appointments across 3 timezones (e.g., PT/CT/ET).
- Include at least one DST-boundary case if applicable.
- Create overlapping appointment times to test double-book prevention.

### Scenario Set A: Time + Timezone + DST
1) Appointment created in calendar at 10:00 local time → reminder fires at correct local time.
2) Business timezone differs from client phone area code → still use business timezone.
3) DST transition week: 24-hour reminder lands at correct local time.

### Scenario Set B: Reply Parsing + Overrides
- Reply “YES”, “Yep”, “Y”, “Confirm” → Confirmed.
- Reply “NO”, “Can’t”, “Cancel” → Cancellation flow.
- Reply “RESCHEDULE”, “Move it”, “Different time” → Reschedule flow.
- Reply “STOP”, “Unsubscribe” → Immediate opt-out; no further messages.
- Reply “HELP” → provide support instructions and email.

### Scenario Set C: Reschedule Loops + Double-Booking
1) Client requests reschedule → system offers 3 slots → client chooses one.
2) Two clients attempt to take the same opened slot (waitlist fill) → only one is booked; the other gets an apology + next available.
3) Client replies late after slot is gone → system offers next best options, not the stale slot.

### Scenario Set D: Fail-safes
1) Calendar API fails on read → alert owner + pause sends for that location.
2) Calendar API fails on write-back → do not claim reschedule success; alert staff for manual follow-up.
3) Messaging provider fails → retry policy triggers; if still failed, alert owner.

### Outputs
- Defect log entries with: scenario, expected vs actual, screenshots/logs, severity (P0/P1/P2), workaround, and retest date.

---

## 3) Daily Message-Quality Review Rubric (Use During Pilots)
Score each conversation (first 20/day during Week 1):

1) **Clarity (0–2)**
- 2: message states appointment time, action needed, and how to respond.
- 1: minor ambiguity.
- 0: confusing or missing key info.

2) **Correct Next Step (0–2)**
- 2: system’s reply matches user intent and offers concrete next action.
- 1: partial match.
- 0: wrong intent or dead-end.

3) **Compliance (0–2)**
- 2: STOP/HELP handled correctly; opt-out honored.
- 1: slow/missing some info.
- 0: opt-out not honored or missing required language.

4) **Tone + Brand Fit (0–2)**
- 2: professional, brief, friendly.
- 1: acceptable but wordy/awkward.
- 0: unprofessional or risky.

5) **Operational Safety (0–2)**
- 2: no double-booking risk; confirms before finalizing changes.
- 1: minor risk.
- 0: can cause double booking or incorrect cancellation.

Action rules:
- Any 0 in Compliance or Operational Safety = P0 defect + immediate fix/rollback.

---

## 4) Client-Facing Email: Pilot Welcome + Data Request (Send After “Yes”)
Subject: Quick setup for your no-show reduction pilot (go live in 24 hours)

Hi {{OwnerName}},

Excited to get your no-show reduction pilot live. Here’s the fastest path to launch within 24 hours.

1) **Please reply with:**
- Your location timezone (e.g., America/New_York)
- Business hours + quiet hours (when we should NOT text)
- Reminder timing preference (recommended: 24 hours + 2 hours before)
- Average appointment value (or typical ticket size)
- Your last 4 weeks: total appointments + number of no-shows (rough is fine)

2) **Calendar + texting notes**
We’ll send smart reminders, collect confirmations (YES/NO/RESCHEDULE), and handle opt-outs (Reply STOP to opt out). If anything fails (calendar access, message delivery), we’ll alert you immediately so nothing breaks silently.

3) **What you’ll receive weekly**
A simple value report: confirmations, reschedules saved, waitlist fills, and estimated recovered revenue.

Legitimacy page (feel free to share internally):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you have questions, reply here or email support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob Smith
Appointment No-Show Reducer
