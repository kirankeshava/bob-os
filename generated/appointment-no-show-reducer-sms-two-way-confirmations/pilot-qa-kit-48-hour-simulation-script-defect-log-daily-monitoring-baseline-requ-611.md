# Pilot QA Kit (48-hour Simulation Script + Defect Log + Daily Monitoring + Baseline Request Email)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:45:43.919Z

---

Below is an operator-ready Pilot QA Kit for the Appointment No-Show Reducer (SMS + Two-Way Confirmations). Use this before and during 2–3 concierge pilots to catch edge cases early, keep reliability high, and produce measurable outcomes.

==============================
A) 48-HOUR INTERNAL QA SIMULATION SCRIPT (RUN BEFORE GO-LIVE)
==============================
Goal: Validate reliability and message quality across the highest-risk workflows: timezones/DST, two-way confirmations, reschedules, waitlist fills, opt-out compliance, message threading, and fail-safes when calendar or messaging fails.

Test data setup (synthetic):
- Business timezone: pick one pilot timezone (e.g., America/Los_Angeles) and one non-local tester timezone (e.g., America/New_York).
- Business hours: 9am–5pm.
- Services: “Initial Consult (60m)”, “Follow-up (30m)”.
- Appointment values: $150 consult, $90 follow-up.
- Create 12 test appointments over next 7 days: mix of morning/afternoon, including one on a DST boundary week if possible.
- Create a waitlist of 5 contacts with preferred time windows.

Test Case 1 — Timezone correctness (system vs business timezone)
Steps:
1) Schedule an appointment for 10:00am business local time.
2) Trigger reminder schedule creation.
Expected:
- All outbound reminders display times in business local time (not tester/device time).
- If the recipient is in a different timezone, the system still uses the appointment’s intended local time consistently (no shifting).
Pass/Fail notes: _______

Test Case 2 — DST edge (if within 30 days of DST change; otherwise simulate by changing environment config)
Steps:
1) Create an appointment on the week DST changes.
2) Ensure reminder timing (e.g., 24h + 2h) fires at correct local time.
Expected:
- No reminders fire 1 hour early/late.
- Confirmation links/flows still map to correct appointment.
Notes: _______

Test Case 3 — Basic confirmation “YES”
Steps:
1) Send reminder: “Reply YES to confirm, NO to cancel, RESCHEDULE to move.”
2) Reply “YES”.
Expected:
- Appointment marked Confirmed.
- Confirmation acknowledgment message sent.
- Analytics increments: reminders_sent +1, confirmations +1.
Notes: _______

Test Case 4 — Confirmation variants (rule-based overrides)
Steps: reply with: “Y”, “Yep”, “Yeah”, “confirm”, “confirmed”, “ok”.
Expected:
- All map to CONFIRM with high confidence.
- No AI misclassification.
Notes: _______

Test Case 5 — Cancellation “NO”
Steps:
1) Reply “NO”.
Expected:
- Appointment marked Cancelled (or flagged for staff action, per design).
- Offer reschedule option.
- Analytics increments: cancellations +1.
Notes: _______

Test Case 6 — Reschedule intent “RESCHEDULE”
Steps:
1) Reply “RESCHEDULE”.
2) System asks for preferred times (e.g., “What day/time works?”).
3) Reply with “Tomorrow after 3pm”.
Expected:
- Intent parsed as reschedule.
- If automation exists: proposes available slots; otherwise: creates a task/alert for owner.
- No double-booking.
Notes: _______

Test Case 7 — Natural language reschedule (hard case)
Steps: reply “I’m running late can we do next week?”
Expected:
- Classified as RESCHEDULE (not CONFIRM).
- A safe follow-up question is sent if exact slot can’t be determined.
Notes: _______

Test Case 8 — Late confirmation after cutoff
Setup: configure cutoff rule (e.g., confirmations within 60 minutes require manual approval).
Steps:
1) Appointment starts in 45 minutes.
2) Reply “YES”.
Expected:
- System responds with safe message: “Thanks—please call/text the office to confirm arrival” OR alerts owner.
- No unsafe auto-changes.
Notes: _______

Test Case 9 — Message threading / multiple appointments same number
Setup: same phone has two future appointments.
Steps:
1) Send reminder for Appointment A.
2) Then send reminder for Appointment B.
3) Reply “YES” once.
Expected:
- System asks disambiguation: “Which appointment are you confirming? Reply 1 or 2.”
- No wrong appointment marked confirmed.
Notes: _______

Test Case 10 — Double-book prevention
Steps:
1) Attempt to reschedule into an already-booked slot.
Expected:
- Slot is rejected; alternative slots are offered.
- No calendar conflict created.
Notes: _______

Test Case 11 — Waitlist fill on cancellation
Setup: create waitlist entries with preferences.
Steps:
1) Cancel an appointment tomorrow at 2pm.
Expected:
- System checks waitlist and sends offer to best-match contacts.
- First “YES” claims the slot; others get “Slot filled” message.
- Analytics increments: waitlist_offers_sent, waitlist_fills.
Notes: _______

Test Case 12 — STOP opt-out compliance
Steps: reply “STOP”.
Expected:
- Immediate confirmation of opt-out.
- No further reminders to that number.
- Analytics increments: opt_outs +1.
Notes: _______

Test Case 13 — HELP compliance
Steps: reply “HELP”.
Expected:
- Returns help message with business identity and support contact:
  “You’re receiving appointment reminders. Reply STOP to opt out. Support: agent_bob_replit+no-show-bot@agentmail.to”
Notes: _______

Test Case 14 — Garbage/unrelated reply
Steps: reply “Who is this?” / “???”
Expected:
- Safe response explaining context + options (YES/NO/RESCHEDULE/STOP).
- No state corruption.
Notes: _______

Test Case 15 — Calendar API failure fail-safe
Setup: simulate calendar API outage/invalid token.
Steps:
1) Attempt to update appointment status or reschedule.
Expected:
- System does NOT silently fail.
- Owner alert triggered within SLA (email/SMS): includes error, affected appointment ID/time, and manual workaround.
Notes: _______

Test Case 16 — Messaging provider failure fail-safe
Setup: simulate SMS send error.
Steps:
1) Trigger reminders.
Expected:
- System retries per policy OR logs failure and alerts owner.
- Analytics: failed_sends +1.
Notes: _______

Exit criteria (must pass before pilot go-live):
- STOP/HELP compliance passes.
- Timezone correctness passes.
- Threading/disambiguation passes for multi-appointment numbers.
- Calendar/API and SMS failure alerts verified.

==============================
B) DEFECT / INCIDENT LOG TEMPLATE (COPY/PASTE)
==============================
Defect ID:
Date/Time Found:
Found By:
Environment: (pilot/sim; timezone; calendar provider; SMS provider)
Severity: S0 Blocker / S1 High / S2 Medium / S3 Low
Title:
Description:
Steps to Reproduce:
Expected Result:
Actual Result:
Scope/Affected Users:
Frequency: always / intermittent
Logs/Attachments:
Workaround (if any):
Owner Alert Sent? (Y/N) + Timestamp:
Fix Owner:
Fix ETA:
Verification Steps:
Verification Result: pass/fail + date
Client Comms Needed? (Y/N) Draft:

Severity definitions:
- S0 Blocker: compliance risk (STOP/HELP broken), wrong-time reminders, wrong patient appointment updated, or widespread send failures.
- S1 High: reschedule loop breaks, confirmations not recorded, duplicate booking risk.
- S2 Medium: confusing copy, delayed analytics, minor threading issues.
- S3 Low: formatting, wording, non-critical UI.

==============================
C) DAILY PILOT MONITORING CHECKLIST + ESCALATION
==============================
Do this each morning (15 minutes per pilot location):
1) Delivery health
- Reminders scheduled today: ___
- Successful sends vs failed sends: ___ / ___
- Any carrier/provider errors? If yes, open incident.

2) Reply handling health
- New inbound replies in last 24h: ___
- Any unclassified replies? List + fix rule override if obvious (YES/NO/RESCHEDULE/STOP).
- Any disambiguation needed (multiple appointments per number)? Ensure system asked correctly.

3) Calendar integrity
- Spot-check 5 appointments: status matches reply (Confirmed/Cancelled/Rescheduled).
- Check no double bookings created.

4) Compliance
- Any STOP received? Confirm opt-out applied.
- HELP responses correct.

5) Owner notifications
- Any API failures? Confirm owner alert sent with actionable steps.

Escalation triggers (send owner alert immediately):
- STOP not honored within 1 message.
- Wrong appointment updated (threading failure).
- Timezone bug causing incorrect appointment time in message.
- Calendar update fails for any reschedule/cancel.
- SMS provider failures >2% in a day or any burst failures.

Owner alert email content (minimum):
- What happened, when, affected customer/appointment identifier, next manual steps, and what we’re doing to prevent recurrence.

==============================
D) WEEK-0 BASELINE REQUEST EMAIL (CLIENT-FACING)
==============================
Subject: Quick baseline before we start reducing no-shows

Hi {{OwnerName}},

Excited to get your pilot live. Before we turn on reminders + two-way confirmations, I want to capture a quick baseline so we can quantify the revenue we recover for you in week 1.

Could you reply with the following (rough numbers are fine):
1) Avg appointments per week: __
2) Current no-show rate (last 4 weeks): __%
3) Avg $ value per appointment (or typical range): $__
4) Do you currently send reminders? (Y/N). If yes: SMS/email/call and when?
5) Your business timezone + hours (e.g., America/Chicago, 9–5): __

Once I have that, we’ll start the pilot and you’ll receive a simple weekly results email showing confirmations, reschedules saved, waitlist fills, and estimated recovered revenue.

For reference, here’s our business page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob Smith
Appointment No-Show Reducer
