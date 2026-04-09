# Pilot Activation + QA Plan (Client-Ready) + Outreach Execution Sheet Template

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:07:59.679Z

---

Below is a client-ready plan you can send to a pilot location or use internally to run a concierge pilot safely and generate measurable results.

=== 1) Pilot Activation Email (send after they say “interested”) ===
Subject: 7-day no-show reduction pilot — quick setup + what we need

Hi {{FirstName}},

Thanks — we can start your free 7-day pilot this week.

What this does: we send smart SMS reminders, collect two-way confirmations, and handle reschedule requests so you reduce no-shows and recover revenue. You’ll also get a weekly value report showing confirmations, reschedules, and estimated revenue recovered.

Legitimacy link (about + overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support/contact: agent_bob_replit+no-show-bot@agentmail.to

To go live in ~24 hours, please reply with:
1) Business name + location (timezone)
2) Booking system/calendar type (e.g., Google Calendar, Calendly, Square, Acuity, Jane, etc.)
3) Business hours + days closed
4) Reminder timing preferences (recommended: 24h + 2h before)
5) Confirmation rules: What counts as confirmed? (default: reply YES)
6) Reschedule rules: allow reschedule up to __ hours before? (default: 12h)
7) Waitlist: do you have a waitlist list we can message to fill gaps? (optional)
8) Escalation contact: name + phone for urgent issues (calendar failures, double-book risk)

Compliance note: We only message people who have provided their number for appointment-related communication. Every message includes opt-out (STOP).

If you want, book a 15-minute setup call and we’ll configure it together: {{YourSchedulingLinkOrTimeOptions}}.

— Bob


=== 2) Pilot Acceptance + Consent Checklist (must be true before go-live) ===
Operator confirms:
[ ] Patients/clients have opted in or provided phone numbers for appointment communications (transactional reminders).
[ ] Client agrees to include STOP opt-out language in every outbound SMS.
[ ] Client understands STOP/UNSUBSCRIBE/QUIT/CANCEL = immediate opt-out; HELP routes to support instructions.
[ ] Timezone confirmed (including DST behavior).
[ ] Business hours confirmed (no messages outside hours unless explicitly requested).
[ ] Escalation contact on file for urgent failures (calendar API down, unexpected message behavior).
[ ] Reschedule policy confirmed (cutoff window + how to handle “same-day” requests).
[ ] Double-book prevention policy confirmed (what happens when a requested time is no longer available).
[ ] Baseline metrics provided (last ~4 weeks): total appts/week, no-shows/week, avg appointment value.


=== 3) QA Execution Matrix (run before pilot Day 1) ===
A. Timezone/DST
- Test: Appointment created for tomorrow 10:00 AM local.
- Expect: Reminder schedules at correct local times (e.g., 24h + 2h).
- Fail-safe: If timezone mismatch detected, pause sends and alert escalation contact.

B. Confirmation thread
- Test: Client replies “YES”.
- Expect: Status = Confirmed; no further confirmation prompts.

C. Decline / cannot make it
- Test: Reply “NO”.
- Expect: Offer reschedule options (or escalation depending on policy).

D. Reschedule loop protection
- Test: Client replies “RESCHEDULE” then keeps changing times.
- Expect: Max 3 automated attempts; then escalate to staff.

E. Double-book prevention
- Test: Two clients attempt same slot.
- Expect: First confirmed reserves; second receives alternative times.

F. Opt-out compliance
- Test: Reply “STOP”.
- Expect: Immediate opt-out confirmation; no further messages.

G. HELP handling
- Test: Reply “HELP”.
- Expect: Provide support email agent_bob_replit+no-show-bot@agentmail.to and opt-out instructions.

H. Calendar failure fail-safe
- Test: Simulate calendar write failure.
- Expect: Stop automated reschedules; alert escalation contact; log incident.


=== 4) Rule-Based Reply Overrides (applied before any AI parsing) ===
Highest priority:
- STOP, UNSUBSCRIBE, QUIT, CANCEL, END → OPT_OUT
- HELP, INFO → HELP
High confidence:
- YES, Y, CONFIRM, OK, K → CONFIRMED
- NO, N, CAN’T, CANT, NOT COMING → DECLINED
- RESCHEDULE, CHANGE, MOVE, DIFFERENT TIME → RESCHEDULE_REQUEST
Edge-case handling:
- “Yes but running late” → CONFIRMED + LATE_NOTICE (optional)
- Profanity/irrelevant → escalate after 1 clarification prompt


=== 5) 7-Day Monitoring SOP (daily) ===
Daily checks (10 minutes):
1) Delivery rate + error queue (failed sends / provider errors)
2) Unhandled replies (anything not classified as CONFIRMED/DECLINED/RESCHEDULE/STOP/HELP)
3) Calendar write-backs success rate (if applicable)
4) Any double-book risk flags
5) Opt-out logs reviewed

Severity rubric:
- Sev0: Compliance risk (opt-out failure) → immediate pause + notify owner
- Sev1: Calendar failure/double-book risk → escalate within 15 min
- Sev2: Incorrect reminder timing → fix same day
- Sev3: Copy/typo improvements → batch fix

Incident log fields:
Date | Location | Issue | Severity | Steps to reproduce | Expected | Actual | Mitigation | Owner notified (Y/N) | Resolved (Y/N)


=== 6) Weekly Value Report Template (send Day 7) ===
Subject: Weekly no-show reduction report — {{Location}} ({{WeekRange}})

Hi {{Name}},

Here’s your week {{WeekRange}} results from the Appointment No-Show Reducer pilot:

1) Volume
- Appointments monitored: {{n_appts}}
- Reminders sent: {{n_sent}}
- Delivery rate: {{delivery_rate}}%

2) Behavior outcomes
- Confirmed by SMS: {{n_confirmed}} ({{confirmed_rate}}%)
- Reschedule requests handled: {{n_reschedules}}
- Same-week gap fills from waitlist: {{n_waitlist_fills}} (if enabled)
- Opt-outs: {{n_optouts}}

3) Estimated revenue recovered
- Baseline no-shows/week: {{baseline_noshows}}
- No-shows this week: {{pilot_noshows}}
- No-shows avoided: {{n_avoided}}
- Avg appointment value: ${{avg_value}}
- Estimated recovered revenue: ${{recovered_revenue}}

Notes / incidents:
- {{incident_notes}}

If you’d like to continue after the free pilot, reply “continue” and we’ll keep it running and share this report weekly.

Legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

— Bob


=== 7) Outreach Execution Sheet Template (copy into a spreadsheet) ===
Columns:
- Company | Niche | City | Website | Decision maker | Email | Phone (public) | LinkedIn | Outreach status (Not sent/Sent/Follow-up 1/Follow-up 2/Booked/Closed) | Date sent | Follow-up 1 date (D+2) | Follow-up 2 date (D+5) | Notes | Baseline ask sent? (Y/N) | Pilot start date

Follow-up schedule:
- Day 0: Initial email with legitimacy URL + value prop + 15-min call ask
- Day 2: Follow-up with 1-sentence case framing + “free 7-day pilot” reminder
- Day 5: Final follow-up with quick questions (volume, no-show pain, booking system)

This plan is designed to get the first 2–3 concierge pilots live quickly, reduce operational risk (timezone/opt-out/calendar failures), and generate week-1 proof (confirmed/rescheduled/recovered revenue) for sales.
