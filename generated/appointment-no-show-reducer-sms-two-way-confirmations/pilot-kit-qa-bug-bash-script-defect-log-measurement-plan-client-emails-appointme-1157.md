# Pilot Kit: QA Bug Bash Script + Defect Log + Measurement Plan + Client Emails (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:28:40.312Z

---

Below is a pilot-ready kit you can use to (1) catch reliability issues before scaling, (2) run consistent pilots at 2–3 locations, and (3) generate credible sales-proof metrics.

=================================================================
A) QA BUG BASH SCRIPT (Run pre-pilot + during first 72 hours)
=================================================================
Goal: Validate timezone handling, threading, opt-out, reschedules, calendar updates, double-book prevention, and fail-safes.

Setup prerequisites (per location):
- Confirm business timezone (e.g., America/Los_Angeles) and business hours.
- Confirm appointment types, durations, buffer times, and any “do not book” rules.
- Confirm reminder schedule (e.g., 24h + 2h) and whether same-day bookings get reminders.
- Confirm escalation contact (owner/manager phone + email) for failures.

Test Case 1 — Timezone correctness (basic)
- Create appointment for tomorrow 10:00 AM local.
- Expected: reminders scheduled relative to local time, not UTC.
- Pass/Fail: reminder timestamps match local time.

Test Case 2 — DST transition (forward/back)
- Create appointment on DST change date (if feasible in sandbox) or simulate offset.
- Expected: reminders still land at correct local hour.

Test Case 3 — Short-notice appointment
- Create appointment starting in 90 minutes.
- Expected: only the 2h reminder is adjusted (or suppressed) per rules; no duplicate reminders.

Test Case 4 — Same-day booking after first reminder window
- Book appointment 1 hour from now.
- Expected: system sends an immediate confirmation request (if configured) or next eligible reminder.

Test Case 5 — Cancellation in calendar
- Cancel appointment in calendar after initial reminder scheduled.
- Expected: all future reminders stop; if user replies, system responds gracefully (“Looks like this was canceled—need to reschedule?”).

Test Case 6 — Reschedule in calendar (time change)
- Change time from 3 PM to 4 PM.
- Expected: prior reminders cancel; new reminders schedule.

Test Case 7 — Patient replies YES
- Reply: “Yes”
- Expected: mark confirmed; send short confirmation acknowledgment; no further confirmation prompts.

Test Case 8 — Patient replies NO
- Reply: “No”
- Expected: marked not-confirmed/cancel-intent; trigger reschedule flow or notify staff (per rules).

Test Case 9 — Patient requests reschedule (common)
- Reply: “Can we move this to next week?”
- Expected: system offers options or asks for preferred times; flags staff if automation cannot complete.

Test Case 10 — High-confidence keyword overrides
- Reply variations: “Y”, “Yep”, “Confirm”, “NOPE”, “Cancel”, “Reschedule”, “Move it”, “Stop”, “Unsubscribe”.
- Expected: rule-based override wins over AI; correct state transitions.

Test Case 11 — Opt-out compliance STOP
- Reply: “STOP”
- Expected: immediate opt-out confirmation; no further messages; log opt-out.

Test Case 12 — HELP handling
- Reply: “HELP”
- Expected: help response with business name + support contact + opt-out instructions.

Test Case 13 — Threading correctness
- Multi-message reply: “Yes
Also running 5 min late”
- Expected: confirmation captured; second message routed to staff note or acknowledged.

Test Case 14 — Late reply after appointment start
- Reply “Yes” after appointment time.
- Expected: do not change anything critical; log as late; optionally notify staff.

Test Case 15 — Duplicate booking attempt
- Two appointments created with same provider/time.
- Expected: system flags conflict; does not send confusing reminders; alerts owner.

Test Case 16 — Waitlist fill
- Cancel one appointment; there is a waitlist entry.
- Expected: waitlist offer goes out; first YES wins; others get “slot taken” message.

Test Case 17 — Race condition on waitlist
- Two people reply YES simultaneously.
- Expected: atomic assignment; no double-book.

Test Case 18 — Invalid number / undeliverable
- Simulate delivery failure.
- Expected: incident created; owner alerted; fallback to manual call.

Test Case 19 — Message quiet hours
- Appointment reminder would send outside business-approved quiet hours.
- Expected: message is delayed until allowed window.

Test Case 20 — Multi-location number collision
- Same patient number appears in two locations.
- Expected: messages are scoped correctly; no cross-location confusion.

Test Case 21 — Language edge
- Reply: “sí” / “oui” (if you plan to support multilingual)
- Expected: either recognized or safely escalated to staff; no wrong cancel.

Test Case 22 — Profanity / hostile reply
- Expected: polite safe response + escalation; avoid loops.

Test Case 23 — Calendar API outage (fail-safe)
- Simulate calendar read/write failure.
- Expected: do not send misleading confirmations; alert owner; queue retries; log incident.

Test Case 24 — Retry/idempotency
- Repeat webhook/event delivery.
- Expected: no duplicate reminders; idempotent processing.

Test Case 25 — Analytics integrity
- Confirm one, reschedule one, cancel one, fill one from waitlist.
- Expected: dashboard counters match actual events; recovered revenue calculation uses correct appointment values.

=================================================================
B) DEFECT / INCIDENT LOG TEMPLATE (copy/paste)
=================================================================
Defect ID:
Date/Time:
Location:
Severity (S0 Outage / S1 High / S2 Medium / S3 Low):
Category (Timezone/DST, Opt-out, Threading, Calendar, Waitlist, Analytics, UX copy, Deliverability):
Summary:
Steps to Reproduce:
Expected Result:
Actual Result:
Customer Impact:
Logs/Links:
Mitigation/Workaround:
Owner Notified? (Y/N) + time:
Fix Owner:
Fix ETA:
Verification Steps:
Verified In Prod? (Y/N) + date:
Notes:

Severity guidance:
- S0: messages sending incorrectly to many users, opt-out broken, or calendar writes causing double-booking.
- S1: wrong appointment time in SMS, reschedule loop stuck, or analytics wildly incorrect.
- S2: occasional misclassification that escalates but doesn’t harm.
- S3: copy tweaks, minor formatting.

=================================================================
C) 2-WEEK PILOT MEASUREMENT PLAN (baseline → proof)
=================================================================
Objective: Demonstrate measurable outcomes: fewer no-shows, more confirmations, fewer schedule gaps, and estimated recovered revenue.

Baseline (Week 0) — collect BEFORE go-live:
1) Total appointments last 4 weeks (count)
2) No-shows last 4 weeks (count)
3) Late cancels (count) (define threshold, e.g., <24h)
4) Average appointment value ($)
5) If available: existing reminder method (none/manual/other)

Pilot KPIs (tracked daily, reported weekly):
- Reminders sent
- Confirmation requests delivered
- Confirmation rate = confirmed / confirmation requests delivered
- Unconfirmed rate
- Reschedules completed (automated + staff-assisted)
- Cancellations captured before visit time
- Waitlist offers sent
- Waitlist fills (accepted + booked)
- Opt-outs (count + rate)
- Incidents (by severity)

No-show delta calculation (simple, credible):
- Baseline no-show rate = baseline no-shows / baseline appointments
- Pilot no-show rate = pilot no-shows / pilot appointments
- No-show reduction (pp) = baseline rate − pilot rate

Recovered revenue estimate (weekly):
Recovered Revenue = (Avoided No-Shows * Avg Appointment Value) + (Waitlist Fills * Avg Appointment Value)
Where:
- Avoided No-Shows = (Baseline no-show rate * Pilot appointments) − Pilot no-shows
- Clamp at minimum 0 (do not report negative “recovered”).

Notes to keep it honest:
- Report both counts and rates.
- Include incident summary and any data caveats (holiday week, staffing change).

=================================================================
D) CLIENT EMAILS (reference legitimacy URL + support email)
=================================================================

Email 1 — Week 0 Baseline Request (send after pilot agrees)
Subject: Quick baseline numbers for your no-show pilot (5 minutes)

Hi {{Name}},

Thanks again for doing the Appointment No-Show Reducer pilot with us. To make sure we can quantify results in week 1 (and send you a clear value report), can you reply with these baseline numbers for the last 4 weeks?

1) Total scheduled appointments:
2) No-shows (did not arrive):
3) Late cancellations (if you track; e.g., canceled <24 hours):
4) Average appointment value (or average revenue per visit):
5) Your business timezone:

Once we have this, we’ll launch reminders + two-way confirmations and send a weekly report showing confirmations, reschedules, waitlist fills, and estimated recovered revenue.

Legitimacy / info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob


Email 2 — Week 1 Value Report (send every Monday)
Subject: Week 1 results: confirmations + recovered revenue estimate

Hi {{Name}},

Here’s your Week {{#}} Appointment No-Show Reducer summary ({{Date Range}}).

Top-line outcomes
- Appointments with reminders sent: {{N}}
- Confirmation rate: {{X%}} ({{Confirmed}} confirmed / {{RequestsDelivered}} delivered)
- Reschedules completed: {{N}}
- Waitlist fills: {{N}}
- No-shows this week: {{N}}
- Estimated recovered revenue: ${{Amount}} (see calculation notes below)

Operational notes
- Opt-outs: {{N}}
- Incidents/issues: {{N}} ({{S0}} S0, {{S1}} S1). Summary: {{1-2 lines}}

Recovered revenue calculation (transparent)
- Baseline no-show rate used: {{BaselineRate}} (from your last 4 weeks)
- Avoided no-shows estimate: {{Avoided}}
- Avg appointment value used: ${{AOV}}

If you’d like, we can tweak reminder timing (e.g., 48h + 3h) or adjust reschedule rules for even better results next week.

Legitimacy / info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob
