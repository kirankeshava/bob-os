# Pilot Activation Kit v1 — QA Simulation Plan, Bug Triage Template, Kickoff/Consent Comms, and Baseline→Recovered Revenue Calc (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:54:57.678Z

---

Business legitimacy link to share with all pilots: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email: agent_bob_replit+no-show-bot@agentmail.to

1) 48-HOUR INTERNAL QA SIMULATION PLAN (RUN BEFORE FIRST LIVE PILOT)
Goal: catch high-risk failures (timezone/DST, calendar write-backs, threading/opt-out, double booking) using synthetic appointments + controlled reply scripts.

Pre-reqs:
- Create 25 synthetic appointments across 3 providers (Provider A/B/C) and 2 locations if supported.
- Set location timezone explicitly; record it.
- Ensure a test phone number is configured; ensure opt-out keywords are respected.
- Enable logging for: outgoing message payload, inbound reply payload, parsed intent, calendar update attempts, and failures.

Scenarios (execute + record expected vs actual):
S1 Timezone sanity: Appointment at 9:00am local time; confirm reminder sends at configured offsets in local timezone.
Expected: reminder timestamps reflect location timezone; no UTC drift.
S2 DST edge: Create appointment on DST transition week (or simulate by changing timezone/DST setting).
Expected: reminder offsets still correct; no double-send.
S3 Late confirmation: Reply “YES” 5 minutes before appointment.
Expected: status updates to Confirmed; no additional nag reminders.
S4 Conflicting responses: Reply “YES” then “NO”.
Expected: latest intent wins; audit trail keeps both; final status = Not confirmed/needs reschedule depending on rules.
S5 Reschedule request: Reply “RESCHEDULE” then provide a time (“tomorrow 3pm”).
Expected: system asks a follow-up if needed; creates/updates appointment without double booking.
S6 Free-text ambiguity: “Can we do earlier?”
Expected: classified as reschedule intent OR escalated to owner with safe message; never marks confirmed incorrectly.
S7 STOP compliance: Reply “STOP”.
Expected: opt-out recorded immediately; no further messages; confirmation to user.
S8 HELP compliance: Reply “HELP”.
Expected: sends help text including business contact email (agent_bob_replit+no-show-bot@agentmail.to) and opt-out instructions.
S9 Wrong number: Reply “wrong number”.
Expected: opt-out or suppression applied; escalation optional.
S10 Threading: Two appointments same patient same day; reply “YES” once.
Expected: system clarifies which appointment or applies to nearest upcoming; never confirms the wrong one silently.
S11 Double-book prevention: Attempt to reschedule into a slot already booked.
Expected: system refuses and suggests next options; no calendar overwrite.
S12 Calendar API failure: Simulate API error on write-back.
Expected: patient receives safe fallback (“We received your request; we’ll confirm shortly.”); owner alert triggered; incident logged.

Pass/Fail criteria:
- Any STOP/opt-out failure = Blocker.
- Any timezone drift > 15 minutes = Critical.
- Any wrong-appointment confirmation = Critical.
- Any silent calendar failure without owner alert = Critical.

2) DEFECT / BUG INTAKE + TRIAGE TEMPLATE (COPY/PASTE)
Use one row per incident.

Incident ID:
Date/Time (with timezone):
Pilot Location:
Environment: (test / live)
Severity: Blocker / Critical / Major / Minor
Category: Timezone/DST / Opt-out/Compliance / Threading / Calendar read / Calendar write / Reschedule / Waitlist / Analytics / Messaging Quality
Summary (1 sentence):
Steps to Reproduce:
Expected Result:
Actual Result:
Customer Impact (who/what was affected):
Evidence (message IDs, phone, appointment ID, screenshots/log snippet):
Immediate Mitigation Taken: (paused messages, manual confirmation, etc.)
Owner Notification Sent? (Y/N; timestamp):
Root Cause Hypothesis:
Fix Owner:
Fix ETA:
Verification Steps:
Status: Open / In progress / Needs retest / Resolved / Won’t fix

Severity rubric:
- Blocker: legal/compliance risk (STOP not honored), mass wrong sends, or data leak.
- Critical: wrong appointment confirmed/rescheduled, timezone/dst causing missed appointments, silent calendar failure.
- Major: degraded workflow requiring frequent manual intervention.
- Minor: copy issues, small UX annoyances, non-impacting analytics mismatch.

3) CLIENT-FACING PILOT KICKOFF + CONSENT COMMUNICATIONS (READY TO SEND)

3A) Pilot Kickoff Email (to owner/manager)
Subject: Pilot kickoff — two-way SMS confirmations start tomorrow (free 7-day pilot)

Hi {FirstName},

Thanks for joining our free 7-day pilot for Appointment No-Show Reducer. Here’s the legitimacy link you can share internally: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Go-live plan:
- Start date/time: {GoLiveDateTime} ({Timezone})
- Reminder schedule: {ReminderOffsets} (e.g., 24h + 2h)
- Two-way replies enabled: YES/NO/RESCHEDULE/STOP
- Escalation contact (for edge cases): {EscalationName} {EscalationPhone}

What we’ll measure (weekly): confirmations, reschedules completed, waitlist fills (if enabled), and estimated recovered revenue.

If anything looks off (wrong time, wrong patient, or opt-out issues), email us immediately at agent_bob_replit+no-show-bot@agentmail.to and we’ll pause messaging while we correct it.

Reply “CONFIRM” to this email to approve go-live.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

3B) Patient-facing Consent/Info SMS (first message template)
“Hi {FirstName} — this is {BusinessName} appointment reminders. Reply YES to confirm, NO if you can’t make it, or RESCHEDULE to change your time. Reply STOP to opt out. Help: agent_bob_replit+no-show-bot@agentmail.to”

3C) Safe fallback SMS when calendar update fails
“Thanks — we received your message and we’re confirming your appointment details now. If urgent, contact {BusinessName} directly. (You can reply STOP to opt out.)”

4) BASELINE DATA CAPTURE + RECOVERED REVENUE CALC (MINIMUM VIABLE)
Collect before Day 1 (even estimates are acceptable if documented):
- Appointments per week (Appts/Wk):
- Historical no-show rate (NS%):
- Avg appointment value (AOV): (or avg gross profit per appointment if they prefer)
- Cancellation window policy (hours):
- Current reminder method (none/manual/1 SMS/etc.):

During pilot (daily tally):
- Reminders sent:
- Confirmations (YES):
- Declines (NO):
- Reschedule requests:
- Reschedules successfully completed:
- Waitlist fills (if enabled):
- Opt-outs (STOP):

Simple recovered revenue estimate (weekly):
1) Baseline no-shows per week = Appts/Wk × NS%
2) Pilot no-shows prevented proxy = (Reschedules completed + Waitlist fills) + (Incremental confirmations that would have been no-shows)
Practical conservative option for week 1:
- Count only: Reschedules completed + Waitlist fills
3) Estimated recovered revenue = (Reschedules completed + Waitlist fills) × AOV

Note for reporting integrity:
- In week 1, use conservative counting (reschedules + fills only) unless the client can confirm “would-have-no-showed” cases.
- Always include assumptions in the weekly report so the number is defensible.

Operational note (fail-safe): If calendar API/write-back fails at any point, pause automated reschedules, send safe fallback SMS, and alert the owner immediately; log a Critical incident using the triage template above.
