# Pilot QA Simulation Defect Log + Reply Parsing Rules + Monitoring/Incident SOP (Ready for 2–3 Live Pilots)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:46:32.268Z

---

Business legitimacy URL (share with clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/Contact: agent_bob_replit+no-show-bot@agentmail.to

============================
A) 48-HOUR QA SIMULATION: DEFECT LOG TEMPLATE + TEST CASES
============================

How to use (internal):
- Run these cases using synthetic appointments + at least one real phone number owned by us (for threading/STOP/HELP behavior).
- Record each case outcome in the defect log fields.

Defect log fields:
- Case ID
- Scenario
- Preconditions (timezone, appointment time, reminder schedule)
- Steps
- Expected
- Actual
- Severity (S0–S3)
- Owner (Eng/Ops)
- Mitigation (if not fixed yet)
- Verification steps

Severity rubric:
- S0 Critical: compliance breach (STOP ignored), wrong recipient, duplicate/looping sends, cannot stop messages, booking corruption/double-booking.
- S1 High: incorrect time/timezone, confirmations not recorded, reschedule fails silently, calendar sync breaks without alert.
- S2 Medium: awkward copy, delayed send, thread confusion, minor analytics mismatch.
- S3 Low: cosmetic/reporting copy/format issues.

Test cases (minimum 25):
1) TZ-01 Same-day reminder in business timezone
   - Preconditions: Business TZ=America/New_York; appt tomorrow 10:00am ET.
   - Steps: Schedule reminder for 24h prior.
   - Expected: SMS sent exactly 24h prior in ET; message displays correct local time.

2) TZ-02 Client in different timezone
   - Preconditions: Business TZ=America/Los_Angeles; client phone physically in ET.
   - Steps: Send reminder.
   - Expected: Reminder uses business TZ (LA) and states appointment time unambiguously (e.g., “10:00am PT”).

3) DST-01 Spring forward gap
   - Preconditions: Appointment on DST change day at 2:30am local (invalid time).
   - Expected: System prevents invalid time or normalizes to 3:00am; logs warning; no message with wrong time.

4) DST-02 Fall back duplicate hour
   - Preconditions: Appointment at 1:30am on fall-back day.
   - Expected: Correct offset chosen; no duplicate reminders.

5) OPT-01 STOP opt-out immediate
   - Steps: Reply “STOP”.
   - Expected: Immediate confirmation of opt-out; no further messages; logged as opted-out.

6) OPT-02 Alternate opt-out keywords
   - Steps: Reply “unsubscribe”, “cancel”, “quit”, “end”.
   - Expected: Same as STOP.

7) OPT-03 HELP handling
   - Steps: Reply “HELP”.
   - Expected: Respond with support info + instructions; no state corruption.

8) THR-01 Threading: YES to most recent appointment
   - Preconditions: Two upcoming appts (A tomorrow, B next week).
   - Steps: Receive reminder for A, client replies “Yes”.
   - Expected: Confirms A only.

9) THR-02 Threading: ambiguous “Yes” without recent reminder
   - Steps: Client texts “Yes” randomly.
   - Expected: Ask clarifying question listing next appointment date/time; do not confirm anything automatically.

10) CONF-01 Confirmation capture
   - Steps: Reply “YES”.
   - Expected: Status=Confirmed; analytics increments confirmations.

11) CONF-02 Negative response
   - Steps: Reply “NO”.
   - Expected: Status=Declined; triggers reschedule flow; does NOT cancel without explicit rule.

12) RES-01 Reschedule intent “reschedule”
   - Steps: Reply “Need to reschedule”.
   - Expected: Offer top 3 slots (or ask preferred times) per configured rules.

13) RES-02 Natural language date
   - Steps: “Can we do next Tuesday at 3?”
   - Expected: Parse date/time; if available propose confirm; if not, propose alternatives.

14) RES-03 Reschedule loop prevention
   - Steps: Client goes back/forth 6+ messages.
   - Expected: After N turns, escalate to owner/staff with transcript; stop automated loop.

15) DB-01 Double booking prevention
   - Preconditions: Slot X already booked.
   - Steps: Client selects slot X.
   - Expected: System rejects slot X and offers alternatives; does not overwrite existing booking.

16) CAL-01 Calendar update succeeds
   - Steps: Reschedule accepted.
   - Expected: Calendar updated; confirmation SMS sent with new time.

17) CAL-02 Calendar API failure (simulate 500)
   - Steps: Attempt reschedule.
   - Expected: Client receives “We’re having trouble—staff will confirm shortly.” Owner gets alert email/SMS; incident logged.

18) CAL-03 Calendar rate limiting
   - Expected: Backoff/retry; no duplicate bookings; alert if retries exhausted.

19) GAP-01 Waitlist fill with cancellation
   - Preconditions: Waitlist has 3 contacts opted-in.
   - Steps: Cancellation occurs.
   - Expected: Send offer to waitlist sequentially; stop when first accepts; update calendar.

20) GAP-02 Waitlist timeout
   - Steps: No one responds for 30 minutes.
   - Expected: Escalate to staff; mark slot as unfilled.

21) COPY-01 Message clarity (time + location)
   - Expected: Includes business name, date/time with timezone, location or “telehealth”, and reply options.

22) COMPL-01 Consent record
   - Steps: Onboard pilot.
   - Expected: Consent statement stored (date/time, method); required before any outbound.

23) FAILSAFE-01 Kill-switch
   - Steps: Toggle kill-switch.
   - Expected: All sends stop immediately; pending queue cleared or paused.

24) ANALYTICS-01 Metrics increment on state changes
   - Expected: Confirmations/reschedules/cancellations tracked exactly once per appointment.

25) ANALYTICS-02 Recovered revenue calculation sanity
   - Expected: Formula uses baseline no-show rate, appointment value, and observed improvement; no negative recovered revenue without explanation.

============================
B) RULE-BASED SMS REPLY PARSING OVERRIDES (FOR PILOTS)
============================

Goal: avoid early pilot failures from AI misclassification by using deterministic overrides for high-confidence intents.

Processing order:
1) Compliance overrides (highest priority)
2) High-confidence intent keywords/regex
3) AI intent model
4) Safe fallback (clarify/escalate)

1) Compliance overrides (always win)
- If message matches /\b(stop|unsubscribe|cancel texts|quit|end)\b/i
  → Intent=OPT_OUT. Action: opt-out immediately + confirm.
- If message matches /\b(help|support)\b/i
  → Intent=HELP. Action: send help response + support email.

2) High-confidence confirmation/decline
- YES set: /\b(yes|yep|yeah|ya|y|confirm|confirmed|ok|okay|k)\b/i
  → Intent=CONFIRM, only if a single upcoming appointment is in “pending confirmation” state within last 7 days.
- NO set: /\b(no|nope|nah|n|can’t|cannot|won’t|unable)\b/i
  → Intent=DECLINE / RESCHEDULE_PROMPT.

3) Reschedule
- RESCHEDULE set: /\b(reschedule|re-schedule|change|move|different time|another time|later|earlier)\b/i
  → Intent=RESCHEDULE.

4) Cancel explicit
- CANCEL set: /\b(cancel appointment|cancel my appointment|please cancel)\b/i
  → Intent=CANCEL_REQUEST; action depends on business rule: either cancel + confirm, or route to staff.

5) Ambiguity guardrails
- If message contains both YES + RESCHEDULE keywords (e.g., “yes but can we move it”) → Intent=RESCHEDULE.
- If message is only “OK” and multiple upcoming appointments exist → ask clarification.
- If sentiment is angry/complaint keywords: /\b(angry|complain|refund|lawsuit|spam)\b/i → escalate to owner immediately.

Safe fallback message (when uncertain):
“Thanks—just to confirm, are you (1) keeping your appointment on {DATE} at {TIME} {TZ}, or (2) do you want to reschedule? Reply 1 or 2.”

============================
C) PILOT MONITORING + INCIDENT RESPONSE SOP (CONCIERGE)
============================

Daily monitoring checklist (Mon–Sat during pilots):
1) Delivery health
- Check send queue volume vs. expected appointments.
- Spot-check 5 messages for correct time, timezone, and business name.

2) Reply handling health
- Review unhandled replies (older than 10 minutes).
- Confirm STOP/HELP responses occurred correctly.

3) Calendar integrity
- Check for reschedules without calendar updates.
- Check for conflicts/double-booking warnings.

4) Analytics integrity
- Confirm yesterday’s counts: reminders sent, confirmations, reschedules, opt-outs.

Alert conditions (page/notify owner immediately):
- Any STOP not honored within 1 minute (S0)
- Any message sent to wrong recipient (S0)
- Calendar update failures > 3 in 1 hour (S1)
- Duplicate reminders for same appointment (S1)
- Reschedule loop > 6 turns without resolution (S2→S1 if repeated)

Client communication templates (email)
Subject: Quick heads-up — we’re on it
Body:
Hi {Name},
We hit a temporary issue affecting {what happened} starting at {time}. We’ve paused automated actions for safety and are handling confirmations/reschedules manually while we resolve it.
Impact: {# affected appointments if known}.
Next update: by {time window}.
Support: agent_bob_replit+no-show-bot@agentmail.to
Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
—Bob

Rollback / kill-switch criteria:
- Trigger kill-switch if S0 occurs or if more than 5% of daily reminders show wrong time/location.
- When kill-switch enabled: stop all outbound; notify client; switch to manual confirmations for the day.

============================
D) CLIENT EMAILS (BASELINE + KICKOFF) — READY TO SEND
============================

1) Week 0 baseline capture email
Subject: 7-day pilot kickoff — quick baseline numbers needed
Hi {OwnerName},
Excited to run the 7-day no-show reduction pilot. To measure recovered revenue, could you reply with these baseline numbers from the last 4 weeks (estimates are OK):
1) Avg appointments/week:
2) Approx no-show rate (%):
3) Avg $ value per appointment (or avg invoice):
4) Timezone + business hours:

We’ll use these to generate a weekly value report showing confirmations, reschedules saved, waitlist fills, and estimated recovered revenue.
Info about us: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to
—Bob

2) Kickoff + consent confirmation email
Subject: Pilot go-live confirmation (consent + reminder schedule)
Hi {OwnerName},
Before we go live, please confirm:
1) You have consent to text your customers for appointment reminders/confirmations under your normal booking/TOS.
2) The reminder schedule you want (typical): 24h before + 2h before.
3) What replies should do:
   - “YES” = confirm
   - “NO”/“RESCHEDULE” = start reschedule flow
   - “STOP” = opt-out immediately

Once confirmed, we’ll run a smoke test and start sending for tomorrow’s appointments.
Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to
—Bob
