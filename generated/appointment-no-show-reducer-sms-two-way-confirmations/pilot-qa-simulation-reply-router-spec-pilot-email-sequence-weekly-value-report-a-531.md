# Pilot QA Simulation + Reply Router Spec + Pilot Email Sequence + Weekly Value Report (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:59:51.719Z

---

Business legitimacy URL (share with prospects/clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

============================================================
A) 48-HOUR INTERNAL QA SIMULATION SCRIPT (EXECUTABLE)
============================================================
Goal: catch edge cases before first pilot(s) go live; validate timezones/DST handling, message quality/threading, opt-out compliance, reschedule flow, waitlist fill logic, and fail-safes if calendar/SMS delivery fails.

Pre-reqs (Day 0, 30 minutes)
1) Pick 2 test timezones: America/Los_Angeles and America/New_York. Confirm business timezone setting exists and can be changed.
2) Create synthetic appointments spanning: same-day, next-day, 7-days out, and DST boundary dates (if feasible).
3) Decide reminder schedule for test: T-24h and T-2h.
4) Create 3 synthetic customers with distinct phone numbers.
5) Ensure logging is enabled (even if only console logs): message sent, delivery status (if available), inbound reply payload, parsed intent, action taken, and any errors.

Defect logging fields (use for every failed step)
- Defect ID:
- Date/time observed (with timezone):
- Environment:
- Steps to reproduce:
- Expected:
- Actual:
- Severity (S0 blocker / S1 high / S2 medium / S3 low):
- Impacted workflow (confirm, reschedule, waitlist, opt-out, analytics):
- Mitigation/workaround:
- Owner:
- Fix verified? (Y/N) + verification notes:

Test Case 1: Timezone correctness (basic)
Steps:
1) Set location timezone = America/Los_Angeles.
2) Create appointment for tomorrow 10:00 AM PT.
3) Trigger/simulate T-24h reminder.
Expected:
- SMS copy references correct local time for the customer (“10:00 AM”).
- Analytics event timestamp stored in a consistent canonical format (UTC) but reported in local timezone.
Fail conditions:
- Any 1-hour offset or time displayed in wrong timezone.

Test Case 2: DST boundary
Steps:
1) Create appointment near DST shift (if the next DST is not near, set system/test date or use a known historical date in test mode).
2) Send T-24h and T-2h reminders.
Expected:
- Reminders fire at correct local times relative to appointment.
- No double-send or missing send around DST.

Test Case 3: Message threading / duplicate sends
Steps:
1) Trigger T-24h reminder twice (simulate scheduler retry).
Expected:
- Customer receives only one message OR a clearly deduplicated second attempt is suppressed.
- System logs show dedupe key used (appointment_id + reminder_type + scheduled_time).

Test Case 4: Basic confirmation flow
Steps:
1) Customer replies: “YES”.
Expected:
- Intent = CONFIRM (rule-based override).
- Appointment status updated to confirmed.
- Confirmation acknowledgment sent (“You’re confirmed…”).
- Confirmation event increments metrics.

Test Case 5: Negative reply / cancellation intent
Steps:
1) Customer replies: “No”.
Expected:
- Intent = DECLINE.
- System responds with reschedule prompt or cancellation instructions per configuration.
- No double-booking occurs.

Test Case 6: Reschedule flow (single loop)
Steps:
1) Customer replies: “reschedule”.
2) System offers next 3 slots.
3) Customer selects “2” (or “tomorrow at 3”).
Expected:
- Intent transitions: RESCHEDULE_REQUEST → RESCHEDULE_SELECT.
- New slot is reserved, old appointment released.
- Customer gets confirmation for new time.
- Reschedule saved metric increments.

Test Case 7: Reschedule loop / ambiguous reply
Steps:
1) Customer replies: “Can’t make it, maybe next week?”
Expected:
- Intent = RESCHEDULE_REQUEST (AI or fallback).
- System asks a clarifying question.
- If ambiguity persists after 2 turns, escalate to owner/staff notification.

Test Case 8: Double-booking prevention
Steps:
1) Two customers attempt to take the same slot (simulate near-simultaneous selection).
Expected:
- Only first selection succeeds; second receives alternate options.
- System logs show atomic slot reservation.
Severity:
- S0 if both succeed.

Test Case 9: Waitlist fill
Steps:
1) Create a cancellation for a high-demand slot.
2) Waitlist has 3 entries.
3) Offer slot to #1; if no response within X minutes, roll to #2.
Expected:
- One customer takes slot; others are not confirmed into it.
- Waitlist fill metric increments.

Test Case 10: Opt-out compliance
Steps:
1) Customer replies “STOP”.
Expected:
- Intent = OPT_OUT (rule-based).
- System sends required confirmation of opt-out.
- Customer receives no further messages.
- Opt-out event recorded.
Severity:
- S0 if STOP is ignored.

Test Case 11: HELP handling
Steps:
1) Customer replies “HELP”.
Expected:
- Provide brief help message including support email: agent_bob_replit+no-show-bot@agentmail.to.
- Do not change appointment state.

Test Case 12: Calendar API failure fail-safe
Steps:
1) Simulate calendar update failure during reschedule confirmation.
Expected:
- System does NOT confirm new time to customer unless calendar write succeeded.
- Owner/staff gets alert with details + manual recovery steps.
- Incident logged as S0/S1.

Test Case 13: SMS delivery failure (if delivery status is available)
Steps:
1) Force an invalid number or use provider test failure.
Expected:
- Delivery failure detected.
- Owner/staff notified if appointment is within X hours.
- Metric: “undeliverable reminders” tracked.

============================================================
B) RULE-BASED SMS REPLY ROUTER SPEC (PILOT SAFETY)
============================================================
Purpose: reduce reliance on AI for high-confidence intents; prevent catastrophic misclassification (e.g., STOP interpreted as confirm).

Parsing order (highest priority first)
1) OPT-OUT hard stops:
   - If message contains any of: STOP, UNSUBSCRIBE, CANCEL (opt-out keyword), END, QUIT (case-insensitive; trimmed punctuation)
   - Action: mark opted_out=true; send opt-out confirmation; do not send any other workflow messages.
2) HELP:
   - If message contains HELP, INFO, SUPPORT
   - Action: send help response; keep state unchanged.
3) Confirmations:
   - If exact match or startswith: YES, Y, YEP, CONFIRM, CONFIRMED
   - Action: confirm appointment.
4) Declines / cannot make it:
   - NO, N, CAN’T, CANT, WON’T, WONT
   - Action: route to reschedule prompt (or cancellation prompt based on location policy).
5) Reschedule:
   - RESCHEDULE, MOVE, CHANGE TIME, DIFFERENT TIME, LATER, EARLIER
   - Action: start reschedule flow.

Ambiguity handling
- If message contains both YES and RESCHEDULE keywords (e.g., “Yes but can we reschedule?”), prefer RESCHEDULE.
- If message is freeform and no rule hits: pass to AI intent classifier.
- If AI confidence < threshold OR AI returns unknown: ask a single clarifying question.
- If still unknown after 2 turns: escalate to staff.

Escalation triggers (always notify staff)
- Any calendar write failure.
- Any message that indicates urgency: “urgent”, “emergency”, “call me”.
- Customer requests a time outside business hours.

============================================================
C) PILOT RECRUITMENT + KICKOFF EMAIL SEQUENCE (READY TO SEND)
============================================================

Email 1: Initial pilot outreach (concierge, discounted)
Subject: Quick pilot to reduce no-shows at {{BusinessName}} (2-way SMS confirmations)

Hi {{FirstName}},

I’m Bob. We’re running 2–3 concierge pilots of a simple SMS system that reduces appointment no-shows by sending smart reminders, collecting two-way confirmations, and automating reschedules (plus optional waitlist gap-filling).

If you’re open to a fast 14-day pilot, we’ll set it up for you and send a weekly value report showing confirmations, reschedules saved, and estimated recovered revenue.

Legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/contact: agent_bob_replit+no-show-bot@agentmail.to

Would you be open to a 15-minute setup call this week? If yes, reply with your timezone and two time windows that work.

Thanks,
Bob Smith

Email 2: Follow-up (2–3 days later)
Subject: Re: quick pilot to reduce no-shows at {{BusinessName}}

Hi {{FirstName}},

Just bumping this—happy to run a short pilot and show results in a weekly report (confirmation rate, reschedules saved, and recovered revenue estimate).

If you want, reply with “pilot” and your timezone. I’ll send a 5-question intake and we can go live in 24–48 hours.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

—Bob

Email 3: Pilot kickoff + consent/opt-in confirmation
Subject: Pilot kickoff — consent + reminder rules for {{BusinessName}}

Hi {{FirstName}},

Great—here’s what we need to start the pilot safely and compliantly.

1) Messaging consent
Please confirm one of the following is true:
A) Your clients already consent to receive SMS about their appointments (e.g., via intake form/online booking terms), OR
B) You want us to send a one-time opt-in request message before reminders.

2) Location settings
- Location timezone:
- Business hours:
- Reminder timing (default: 24h + 2h):
- Reschedule policy (how far in advance allowed):
- Escalation contact (name + phone/email for failures):

3) Baseline (last 4 weeks)
- Total appointments:
- No-shows:
- Average appointment value (or gross margin estimate):

Once you reply with the above, we’ll confirm go-live date/time and send you a Week 1 report.

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob

Email 4: Go-live confirmation
Subject: You’re live — what to watch for in Week 1 ({{BusinessName}})

Hi {{FirstName}},

You’re live. This week we’re watching:
- Delivery + reply rates
- Confirmation rate
- Reschedules saved (vs. silent no-shows)
- Any opt-outs/HELP requests

If you see any customer confusion, forward it here and we’ll tune the message copy and rules.
Support: agent_bob_replit+no-show-bot@agentmail.to
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

—Bob

============================================================
D) WEEKLY VALUE REPORT TEMPLATE (EMAIL FORMAT)
============================================================
Subject: Weekly No-Show Reduction Report — {{BusinessName}} (Week of {{StartDate}})

Hi {{FirstName}},

Here’s your weekly summary from the Appointment No-Show Reducer pilot.

1) Outcomes (this week)
- Appointments with reminders sent: {{RemindersSent}}
- Customer reply rate: {{ReplyRate}}%
- Confirmed appointments: {{ConfirmedCount}} ({{ConfirmationRate}}%)
- Reschedules completed: {{ReschedulesCompleted}}
- Waitlist fills (gaps filled): {{WaitlistFills}}
- Undeliverable SMS: {{Undeliverable}}
- Opt-outs: {{OptOuts}}

2) Estimated recovered revenue
Inputs:
- Average appointment value: ${{AvgValue}}
- Baseline no-show rate (last 4 weeks): {{BaselineNoShowRate}}%
- Pilot no-show rate (this week): {{PilotNoShowRate}}%

Calculation:
Recovered appointments ≈ (Baseline no-show rate − Pilot no-show rate) × Total appointments this week
Estimated recovered revenue ≈ Recovered appointments × Average appointment value

This week’s estimate: ${{RecoveredRevenue}} recovered

3) Notable conversations / issues
- {{Issue1}} (resolution: {{Resolution1}})
- {{Issue2}} (resolution: {{Resolution2}})

4) Next week optimization
- {{Optimization1}}
- {{Optimization2}}

If you’d like, we can also add: (a) tighter reschedule window rules, (b) waitlist prioritization, and (c) owner alerts for high-risk appointments.

Overview/legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob Smith

============================================================
E) MINIMUM BASELINE METRICS TO CAPTURE (BEFORE GO-LIVE)
============================================================
Ask every pilot location for:
- Timezone
- Total appointments for last 4 weeks
- No-shows for last 4 weeks
- Average appointment value (or revenue per visit)
- Current reminder process (none / manual calls / one-way SMS)
- Any compliance notes (explicit opt-in flow vs implied consent)

This ensures Week 1 report can show delta vs baseline and produce credible recovered revenue proof.
