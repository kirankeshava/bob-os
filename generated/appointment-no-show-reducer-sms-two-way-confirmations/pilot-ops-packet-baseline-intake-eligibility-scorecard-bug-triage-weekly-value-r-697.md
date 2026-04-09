# Pilot Ops Packet — Baseline Intake, Eligibility Scorecard, Bug Triage, Weekly Value Report Template (v2)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:12:06.393Z

---

Below are four copy/paste-ready templates to run 2–3 concierge pilots with reliable measurement and client-facing proof. Reference link for legitimacy in client comms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Support contact: agent_bob_replit+no-show-bot@agentmail.to.

==============================
1) PILOT BASELINE METRICS INTAKE FORM (copy/paste)
==============================
Business / Location Name:
Location Address (optional):
Primary Contact Name + Role:
Phone (for escalation only):
Email:
Timezone (critical):
Business Hours:

Appointment System (choose): Square / Calendly / Acuity / Jane / Mindbody / Google Calendar / Other: ______
Number of providers/calendars that can be booked:
Typical appointment length(s):
Lead time (avg days between booking and visit):

Baseline (last 4 weeks preferred; if not available, last 2 weeks):
1) Total appointments scheduled:
2) No-shows (count):
3) Late cancellations (count):
4) Same-day cancellations (count):
5) Average appointment value ($):
6) % of openings filled within 24 hours (if known):
7) Current reminder process (none / manual calls / SMS / email / other):
8) If reminders exist: when are they sent (e.g., 48h + 2h)?

Policies:
- Cancellation/no-show policy (fees?):
- Preferred reschedule window rules (e.g., allow within 7 days only):
- Waitlist policy (do you maintain one today?):

Consent & compliance:
- Do you currently have SMS consent language in your intake forms? (Y/N)
- If yes, paste the exact language here:
- If no, we will provide recommended language for pilot.

Success target for pilot (choose 1–2):
[ ] Reduce no-shows by ____% 
[ ] Increase confirmations to ____% 
[ ] Fill ____ extra slots/week from waitlist
[ ] Recover $____/week estimated revenue

==============================
2) PILOT LOCATION ELIGIBILITY SCORECARD (one-page)
==============================
Use this to decide if a location is a good pilot and to predict edge cases.

A. Volume & economics (must-have)
- Appointments/week: ___ (target: 30+)
- Avg appointment value: $___ (target: $75+)
- Baseline no-show rate: ___% (target: 5%+)

B. Operational fit (green/yellow/red)
- Booking system supports updates or can be operated concierge-style: Green / Yellow / Red
- Single timezone for all appointments: Green / Yellow / Red
- Multiple providers/calendars (risk of double-booking): Green / Yellow / Red
- Walk-ins common (harder attribution): Green / Yellow / Red
- Strict reschedule rules documented: Green / Yellow / Red
- Has (or willing to add) SMS consent language: Green / Yellow / Red

C. Stakeholder readiness
- Decision-maker involved (owner/manager): Yes / No
- Can respond to escalation within 1 business day: Yes / No
- Will share baseline metrics (even estimates): Yes / No

D. Pilot classification
- Eligible now: Yes / No
- Pilot type: [ ] Full integration  [ ] Concierge-only (manual calendar updates)
- Known risks to monitor in Week 1:
  1)
  2)
  3)

==============================
3) BUG / EDGE-CASE TRIAGE TEMPLATE (for pilots)
==============================
Bug ID:
Reported by:
Date/time (include timezone):
Pilot location:
Severity:
- S0: Compliance risk (STOP/opt-out failure, unwanted messaging)
- S1: Revenue risk (wrong confirmations/reschedules, double-booking)
- S2: Degraded experience (wrong wording, delayed message)
- S3: Cosmetic/low impact

Category (choose): Timezone/DST / Threading / Reply parsing / Calendar read / Calendar write / Waitlist fill / Opt-out / Analytics / Other

Summary (one sentence):

Steps to reproduce:
1)
2)
3)

Expected result:

Actual result:

Evidence:
- Message IDs / screenshots:
- Appointment ID / time:
- Logs:

Root cause hypothesis:

Fix approach:

Verification checklist (must complete before closing):
[ ] Reproduced in test environment (or confirmed live)
[ ] Fix deployed
[ ] Retested with same scenario
[ ] Confirmed STOP/HELP behavior unaffected (if messaging-related)
[ ] Client-impact assessment sent (if S0/S1)

Status: Open / In progress / Blocked / Fixed / Verified / Closed
Owner:

==============================
4) WEEKLY VALUE REPORT TEMPLATE v2 (client-facing)
==============================
Subject: Weekly No-Show Recovery Report — {Business Name} ({Location}) — Week of {Date Range}

Email body (ready to send):
Hi {First Name},

Here’s your weekly performance report from Appointment No-Show Reducer. (For reference, our service page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Support: agent_bob_replit+no-show-bot@agentmail.to.)

1) Summary (this week)
- Appointments with reminders sent: {N}
- Patient/client confirmations received: {N} ({ConfirmRate}%)
- Reschedule requests handled: {N}
- Cancellations detected early (>= {X} hrs before): {N}
- Slots filled from waitlist / backfill outreach: {N}

2) Estimated revenue recovered (conservative)
- Baseline no-show rate (pre-pilot): {BaselineNoShowRate}%
- No-show rate this week (observed or estimated): {ThisWeekNoShowRate}%
- No-show reduction: {DeltaPoints} percentage points
- Estimated saved appointments: {SavedAppointments}
- Avg appointment value: ${AvgValue}
= Estimated recovered revenue: ${RecoveredRevenue}

Notes on calculation:
- We use your provided baseline plus observed confirmations/reschedules. We keep this conservative and exclude long-term retention effects.

3) Message quality & compliance
- Opt-outs (STOP): {OptOutCount}
- Help/assistance requests: {HelpCount}
- Any escalation events (calendar/API failures, manual intervention): {Escalations} (details below if any)

4) What we changed this week (pilot iteration)
- {Change1}
- {Change2}

5) Next week plan (to increase recovery)
- {NextAction1}
- {NextAction2}

If you want, I can also send a 2-minute Loom summary and confirm the exact recovered revenue assumptions with you.

Best,
Bob
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

Appendix (optional paste-in):
- Top reply intents: YES {Y}, NO {N}, RESCHEDULE {R}, STOP {S}
- Median time-to-confirm: {T}
- Appointments at risk (no response): {RiskN}

END
