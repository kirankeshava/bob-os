# Pilot QA Test Suite + Defect Log + SMS Override Matrix + Weekly Value Report (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:10:07.562Z

---

Business legitimacy URL (share with prospects/clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support / contact email: agent_bob_replit+no-show-bot@agentmail.to

========================
A) PILOT QA TEST SUITE (Executable)
========================
How to use: Execute each case in staging or pilot mode. Record Actual Result + Pass/Fail + Notes in the Defect Log (section B). For SMS tests, use at least two phone numbers to validate threading + opt-out.

A1. Timezone + DST
1) TZ-01 Business timezone respected
- Preconditions: Business timezone set to America/New_York; appointment at 10:00 AM local.
- Steps: Schedule appointment; send reminder at “24h before 10:00 AM local”.
- Expected: Message is sent at 10:00 AM ET (not server timezone). No drift.

2) TZ-02 Client outside business timezone
- Preconditions: Business in PT; client phone area code in ET (informational only).
- Steps: Create appt at 2:00 PM PT; send 2h reminder.
- Expected: Reminder timing follows business timezone (2h before 2:00 PM PT). Message content displays appointment time in business timezone consistently.

3) TZ-03 DST spring forward
- Preconditions: Appointment exists on DST transition day.
- Steps: Create appt at 9:00 AM local on the day after DST shift; run 24h reminder.
- Expected: Reminder triggers exactly 24 hours before local appointment time; no 1-hour offset.

4) TZ-04 DST fall back
- Preconditions: Appointment exists across fall-back hour.
- Steps: Create appt at 9:00 AM local after fall-back; run 24h reminder.
- Expected: Reminder triggers correctly; no duplicate sends due to repeated hour.

A2. Reminder Scheduling + Rate Limiting
5) SCH-01 Standard cadence
- Steps: Set reminders at 48h + 24h + 2h; schedule appointment.
- Expected: Exactly 3 reminders; no extra sends.

6) SCH-02 Same-day booking
- Steps: Appointment booked 1 hour before start; cadence includes 2h reminder.
- Expected: 2h reminder is suppressed; immediate confirmation message can send once; no spam.

7) SCH-03 Quiet hours
- Preconditions: Quiet hours 9pm–8am local.
- Steps: Reminder would normally send at 7:30am.
- Expected: Message delayed to 8:00am local; audit shows delayed reason.

8) SCH-04 Throttling
- Steps: Create 200 appointments to send reminders within 5 minutes.
- Expected: System sends without provider rejection; if rate-limited, retries with backoff; no duplicate messages.

A3. Two-Way Confirmations + Threading
9) 2W-01 Simple YES confirm
- Steps: Reminder sent; client replies “YES”.
- Expected: Appointment status becomes Confirmed; confirmation acknowledgement sent once; analytics increments confirmation_count.

10) 2W-02 Lowercase + punctuation
- Steps: Reply “yes!”
- Expected: Treated as YES; confirmed.

11) 2W-03 No response
- Steps: Do not reply.
- Expected: Appointment remains unconfirmed; optional follow-up message triggers once per policy.

12) 2W-04 Wrong thread (multiple appointments)
- Preconditions: Client has two upcoming appointments.
- Steps: Send reminders for both; reply “YES” once.
- Expected: System asks clarifying question (“Which appointment?”) OR confirms the nearest appointment only per policy; must not confirm both silently.

A4. Reschedule Flows
13) RSC-01 Client requests reschedule keyword
- Steps: Client replies “RESCHEDULE”.
- Expected: System offers next available slots or asks preferred times; current appointment marked “Pending reschedule” (not cancelled until new time chosen) per policy.

14) RSC-02 Natural language reschedule
- Steps: Reply “Can we do Friday afternoon instead?”
- Expected: Classified as RESCHEDULE intent; system proposes Friday slots.

15) RSC-03 Reschedule loop prevention
- Steps: Client keeps replying with unavailable times (3 times).
- Expected: After N attempts, system escalates to owner/staff with summary; stops auto-looping.

16) RSC-04 Reschedule creates conflict
- Preconditions: Slot selected already booked.
- Steps: Client selects time that was available but became booked.
- Expected: System apologizes, offers next slots, does not double-book.

A5. Double-Booking Prevention + Calendar Updates
17) CAL-01 Create confirmed appointment event
- Steps: Confirm appointment; ensure calendar entry exists with correct time, attendee, notes.
- Expected: Calendar event updated/flagged as confirmed.

18) CAL-02 Cancel then rebook
- Steps: Client cancels; system offers slot; rebook.
- Expected: Old event cancelled/updated; new event created; no duplicates.

19) CAL-03 Concurrent booking
- Steps: Two clients attempt to book same slot within seconds.
- Expected: Only one succeeds; other gets alternate options.

A6. Opt-out / Compliance
20) CMP-01 STOP keyword
- Steps: Client replies “STOP”.
- Expected: Immediate opt-out confirmation; no further messages sent; opt-out recorded.

21) CMP-02 Unsubscribe variants
- Steps: Reply “unsubscribe”, “cancel texts”, “stop all”.
- Expected: Treated as STOP; opt-out.

22) CMP-03 HELP keyword
- Steps: Reply “HELP”.
- Expected: Help message includes business name, support email agent_bob_replit+no-show-bot@agentmail.to, and opt-out instructions.

23) CMP-04 Opt-out with multiple locations
- Preconditions: Same phone appears in two pilot locations.
- Steps: STOP in one thread.
- Expected: Opt-out applies globally unless configured per-location; policy must be explicit and consistent.

A7. Error Handling + Fail-safes
24) ERR-01 Calendar API outage
- Steps: Simulate calendar API failure during reschedule.
- Expected: System enters safe state: stops auto-confirmation; sends internal alert to owner/staff; tells client “We’re having trouble—staff will confirm shortly.” No silent failures.

25) ERR-02 SMS provider delivery failure
- Steps: Simulate message undeliverable.
- Expected: Retry strategy; after final failure, alert owner and mark appointment “Needs manual confirmation”.

26) ERR-03 Webhook duplicate delivery
- Steps: Re-send same inbound SMS webhook twice.
- Expected: Idempotency prevents double-processing; single status update.

27) ERR-04 Invalid phone number
- Steps: Create appt with invalid number.
- Expected: Block send; staff notification; analytics counts invalid_contact.

A8. Analytics Integrity
28) ANA-01 Confirmation counted once
- Steps: Client replies YES multiple times.
- Expected: Only first confirmation increments confirmation_count; subsequent are ignored/acknowledged without affecting metrics.

29) ANA-02 Reschedule saved counted
- Steps: Client requests reschedule and completes.
- Expected: reschedule_count increments; “saved_no_show” increments if reschedule replaces likely no-show per policy.

30) ANA-03 Waitlist fill attribution
- Steps: Cancel appointment; system texts waitlist; first accepts.
- Expected: waitlist_fill_count increments; filled appointment links to original gap.

31) ANA-04 Recovered revenue calculation sanity
- Preconditions: avg_appt_value and baseline no-show rate provided.
- Steps: Run weekly report computation.
- Expected: recovered_revenue = (baseline_no_show_rate - pilot_no_show_rate) * total_appointments * avg_appt_value (bounded at >= 0) with notes.

A9. Message Quality / Tone
32) MSG-01 Clear CTA
- Steps: Review reminder message.
- Expected: Contains appointment date/time, location or virtual info, and simple instructions: “Reply YES to confirm, NO to cancel, RESCHEDULE to change, STOP to opt out.”

33) MSG-02 Language clarity for reschedule
- Steps: Trigger reschedule.
- Expected: Offers 3–5 options max; avoids long paragraphs; confirms final selection in one message.

34) MSG-03 Sensitive industries
- Steps: Configure for medical/dental.
- Expected: No PHI in messages; generic language: “appointment” not procedure.

A10. Security / Data Handling (Pilot-level)
35) SEC-01 Minimum data in SMS logs
- Steps: Inspect logs.
- Expected: Do not store unnecessary personal data; mask phone numbers in admin views where possible.

36) SEC-02 Access control
- Steps: Attempt to access another location’s analytics.
- Expected: Blocked; location-scoped access.

========================
B) DEFECT / INCIDENT LOG TEMPLATE (Copy-paste)
========================
Use one row per issue; this can be a spreadsheet.
Fields:
- Defect ID:
- Date/Time detected:
- Location (pilot site):
- Environment (staging/pilot/live):
- Severity (S0/S1/S2/S3):
  S0 = Compliance/data loss/opt-out broken
  S1 = Customer-facing wrong behavior (double booking, wrong time)
  S2 = Degraded experience with workaround
  S3 = Cosmetic/logging only
- Category (Timezone, SMS, Calendar, Reschedule, Analytics, Compliance, Other):
- Summary:
- Steps to reproduce:
- Expected result:
- Actual result:
- Impact (appointments affected, revenue risk):
- Mitigation / manual workaround:
- Owner notified? (Y/N) + method:
- Proposed fix:
- Fix status (Open/In progress/Ready for verification/Closed):
- Verification steps:
- Verified by + date:

========================
C) SMS INTENT OVERRIDE MATRIX + SAFE-STATE POLICY
========================
Goal: avoid AI misclassification in early pilots. Apply these deterministic overrides BEFORE any AI/NLP step.

High-confidence intents (case-insensitive; trim punctuation):
1) STOP / Opt-out
- Match: "stop", "unsubscribe", "cancel texts", "end", "quit", "stop all"
- Action: set opted_out=true immediately; send opt-out confirmation; do not send any further reminders.

2) HELP
- Match: "help", "info"
- Action: send help message including business name, legitimacy URL (optional for email), and support: agent_bob_replit+no-show-bot@agentmail.to; include STOP instructions.

3) CONFIRM
- Match: "yes", "y", "confirm", "confirmed", "ok", "okay", "k"
- Guardrail: if multiple upcoming appts exist, ask clarification or default to nearest appointment only.

4) CANCEL / DECLINE
- Match: "no", "n", "cancel", "can't", "cannot", "won't make it"
- Action: mark as cancelled OR pending-cancel (based on business rules); offer reschedule option.

5) RESCHEDULE
- Match: "reschedule", "move", "change", "different time", "another time", "later", "earlier"
- Action: begin reschedule flow; do not cancel original until new time confirmed (recommended).

Ambiguous/unsafe messages (safe-state triggers):
- Examples: long paragraphs, anger/threats, legal terms, profanity, or messages mentioning emergencies.
- Action: stop automation; notify owner/staff with transcript; respond to client: “Thanks—our team will follow up shortly.”

========================
D) WEEKLY CLIENT VALUE REPORT TEMPLATE (Email)
========================
Subject: Weekly No-Show Reduction Report — {Business Name} — Week of {Date Range}

Hi {Owner Name},

Here’s your weekly performance summary from Appointment No-Show Reducer. (If you ever need us, reply here or email agent_bob_replit+no-show-bot@agentmail.to. Product info/legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2)

1) Outcomes (this week)
- Total appointments with reminders sent: {N}
- Confirmed by text: {Confirmed N} ({Confirmed %})
- Reschedules completed: {Rescheduled N}
- Cancellations captured early: {Cancelled N}
- Waitlist fills (gaps filled): {Waitlist fills N}

2) No-show impact (baseline vs pilot)
- Baseline no-show rate (pre-pilot): {Baseline %} (from last {4} weeks)
- This week’s no-show rate: {This week %}
- Estimated no-shows avoided: {Avoided N}  
  Calculation: (Baseline% − ThisWeek%) × Total appointments
- Estimated recovered revenue: ${Recovered $}
  Calculation: Avoided N × Avg appointment value (${Avg Value})

3) Operational notes / incidents
- {Incident summary: e.g., “1 calendar sync delay on Tue; resolved; no patient impact.”}
- {Any manual follow-ups needed}

4) Next-week optimization (optional)
- Recommendation 1: {e.g., adjust 2h reminder to 3h}
- Recommendation 2: {e.g., add waitlist prompt for cancellations within 24h}

If you’d like, I can hop on a quick 10-minute call to review and tune the reminder timing.

Best,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
