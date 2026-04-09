# Pilot QA Execution Pack (48-hour Simulation Script + Defect Log/Triage + Pilot Recruitment/Kickoff Emails)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:37:59.491Z

---

Pilot QA Execution Pack — Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL to share with prospects/clients: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/ops email: agent_bob_replit+no-show-bot@agentmail.to

SECTION A — 48-HOUR INTERNAL QA SIMULATION SCRIPT (run before/alongside Pilot #1)
Goal: Validate reliability, message quality, compliance, and measurable outcomes before scaling to many installs.

A1) Test data setup (Hour 0–2)
1) Choose a test timezone for primary run (e.g., America/New_York). Also create one “remote” location timezone (America/Los_Angeles) to verify cross-timezone handling.
2) Create synthetic appointments (at least 25) across 3 days:
   - 5 same-day appointments (within 2–6 hours)
   - 10 next-day appointments
   - 10 appointments 2–3 days out
   Include a mix of: new patient/client, returning, and “high-value service”.
3) Include edge-time appointments:
   - Early morning (8:00)
   - Lunch (12:00)
   - Late day (17:30)
4) Create at least 3 pairs that would cause double-booking if mishandled (same provider + overlapping times) to test prevention.

A2) Reminder timing + content checks (Hour 2–6)
Expected: Reminders fire at the configured offsets (e.g., 24h + 2h), in correct local time, with clear CTA.
1) Verify the reminder message includes:
   - Business name
   - Appointment date/time in local timezone
   - Simple reply instructions: “Reply YES to confirm, NO to cancel, R to reschedule”
   - STOP language support (even if not explicitly shown every time)
2) Quality review checklist (pass/fail):
   - No confusing abbreviations; time format consistent
   - Uses friendly tone, not spammy
   - Does not reveal sensitive details

A3) Two-way reply intent parsing (Hour 6–14)
Create a test matrix of inbound replies. For each, record: raw reply, parsed intent, system action, outbound response, and final appointment state.
High-confidence rules must override AI when matched:
- Confirm: YES, Y, CONFIRM, CONFIRMED, OK, K
- Cancel: NO, N, CANCEL, CANT, CAN’T, WON’T MAKE IT
- Reschedule: RESCHEDULE, R, MOVE, CHANGE TIME, DIFFERENT TIME
- Opt-out: STOP, UNSUBSCRIBE, END, QUIT
- Help: HELP, INFO
Test cases (minimum 20):
1) “Yes” -> Confirm, send confirmation acknowledgement
2) “Y” -> Confirm
3) “Ok” -> Confirm
4) “No” -> Cancel workflow + acknowledgement
5) “can’t make it” -> Cancel
6) “reschedule” -> Reschedule workflow prompt
7) “R” -> Reschedule
8) “STOP” -> Opt-out immediately, ensure no further messages
9) “Stop pls” -> Opt-out
10) “help” -> Help response
11) “?” -> Ask clarifying question (no destructive action)
12) Mixed intent: “Yes but can we do later?” -> Reschedule (rule: reschedule keywords override confirm)
13) Profanity / nonsense -> Ask clarifying question; do not cancel
14) Late reply after appointment time -> Do not alter attendance; log event for analytics
15) Duplicate replies “YES” twice -> Idempotent; no duplicate confirmations

A4) Threading + contact identity (Hour 14–20)
Expected: Replies map to correct appointment and do not cross-contaminate threads.
1) Same phone number with two upcoming appointments:
   - Confirm only one: ensure the system asks “Which appointment?” or uses nearest upcoming by default with disambiguation.
2) Family/shared phone number test:
   - Two names, one number: ensure clarification needed before changing schedule.

A5) Reschedule loop + calendar update validations (Hour 20–30)
Expected: Reschedule suggestions do not create double-bookings and reflect real availability.
1) Try reschedule into an occupied slot -> system must reject and offer alternatives.
2) Confirm reschedule into free slot -> system updates calendar correctly and sends new confirmation message.
3) Reschedule loop prevention:
   - If user keeps requesting unavailable times 3+ times, escalate to owner/staff via alert.

A6) Waitlist fill simulation (Hour 30–38)
Expected: When a cancel occurs, waitlist is notified in priority order; first to confirm wins; others receive closure message.
1) Cancel a prime-time appointment.
2) Trigger waitlist to fill:
   - Waitlist #1 receives offer; if no response in X minutes, move to #2.
   - If #1 confirms, stop outreach to others.
3) Confirm no double-booking created.

A7) Compliance: opt-out + quiet hours (Hour 38–44)
Expected: STOP is honored immediately; messages respect business rules.
1) Send STOP; verify:
   - Immediate confirmation of opt-out
   - No more reminders for that number
2) Quiet hours rule:
   - If reminder would send outside permitted time window, it should queue to next allowed window.

A8) Failure modes + fail-safes (Hour 44–48)
Expected: If calendar API fails or message delivery fails, owner is alerted and system does not silently misbehave.
1) Simulate calendar API failure:
   - Attempt confirm/reschedule
   - System should: (a) not assume success, (b) alert owner/staff via configured channel, (c) message user with “We’re checking availability—staff will confirm shortly.”
2) Simulate SMS delivery failure:
   - Log error, retry policy observed, alert if repeated failure.

SECTION B — DEFECT LOG + TRIAGE FORMAT (copy/paste into a sheet or issue tracker)
Fields (required):
- Defect ID:
- Date/Time found:
- Location (pilot/test):
- Severity (S0–S3):
  S0 = Compliance risk / could send messages after STOP / privacy leak
  S1 = Breaks core workflow (confirm/reschedule/cancel) or causes double-booking
  S2 = Degrades UX or reporting accuracy but workaround exists
  S3 = Cosmetic / copy tweak
- Title:
- Environment: (timezone, calendar system, SMS provider if relevant)
- Steps to reproduce (numbered):
- Expected result:
- Actual result:
- Logs/screenshots/IDs:
- Impact assessment (who/how many affected):
- Mitigation/workaround:
- Owner assigned:
- Status: New / Triaging / In Progress / Fixed / Verified / Won’t Fix
- Fix verification steps:
- Verified by + date:

SLA guidance:
- S0: immediate pause on outbound to affected segment; fix within 24 hours.
- S1: fix or hard mitigation within 48 hours.
- S2: schedule within 7 days.
- S3: batch.

SECTION C — PILOT RECRUITMENT EMAIL (ready to send)
Subject: Quick pilot to cut no-shows (2-way SMS confirmations) — can we try it for 7 days?

Hi {{FirstName}},

I’m Bob. We’re running a small set of concierge pilots for an Appointment No-Show Reducer that sends smart SMS reminders, collects two-way confirmations, and automates reschedules + waitlist fills.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

The pilot goal is simple: reduce no-shows and quantify recovered revenue in 7 days (confirmation rate, reschedules saved, waitlist fills).

If you’re open, can we do a 15-minute call this week? If it’s a fit, we’ll set it up concierge-style and send you a weekly report showing results.

Two quick questions:
1) Roughly how many appointments per week do you book?
2) Do you already send reminders (text/email), and do clients confirm?

Thanks,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to

SECTION D — PILOT KICKOFF + CONSENT CONFIRMATION EMAIL (to send once they agree)
Subject: Pilot kickoff + consent checklist (No-Show Reducer)

Hi {{FirstName}},

Excited to kick off your 7-day pilot.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

To keep this compliant and reliable, please confirm these items:

1) Client SMS consent
- You confirm your clients have opted in (or you have an established relationship where appointment-related texts are permitted).
- We will honor opt-outs immediately. If a client replies STOP/UNSUBSCRIBE/END, they will not receive further messages.

2) Baseline metrics (so we can prove value)
Please reply with your last 4 weeks (estimates are OK):
- Total appointments booked:
- No-shows (count):
- Avg appointment value ($):
- Current reminder method (none / manual text / automated / email):

3) Pilot settings
- Business timezone:
- Business hours + quiet hours:
- Reminder timing (recommended: 24h + 2h):
- Reschedule rules (same-day allowed? minimum notice?):
- Waitlist rules (how many clients on waitlist, priority rules):
- Escalation contact (name + phone/email) if calendar/SMS fails:

Once you confirm the above, we’ll start sending reminders and will share a weekly report every Monday showing confirmations, reschedules saved, waitlist fills, and estimated recovered revenue.

Thanks,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to
