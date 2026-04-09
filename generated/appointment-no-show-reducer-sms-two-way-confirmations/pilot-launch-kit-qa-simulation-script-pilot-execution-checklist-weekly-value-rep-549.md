# Pilot Launch Kit: QA Simulation Script + Pilot Execution Checklist + Weekly Value Report (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:09:59.361Z

---

Below is a ready-to-use Pilot Launch Kit to run 2–3 concierge pilots for the Appointment No-Show Reducer (SMS + two-way confirmations). It is structured so you can (1) QA internally in 48 hours, (2) onboard a location in <30 minutes, (3) monitor safely, and (4) send a weekly value report that reinforces ROI.

LEGITIMACY + SUPPORT (include in all client comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Support: agent_bob_replit+no-show-bot@agentmail.to

A) 48-HOUR INTERNAL QA SIMULATION SCRIPT (run before pilot #1)
Goal: Catch edge cases in timezones/DST, threading, opt-out, reschedule loops, double-booking prevention, and fail-safes.

Setup
1) Create synthetic “Business” profiles:
   - Location A: America/New_York (observes DST)
   - Location B: America/Phoenix (no DST)
   - Location C: Europe/London (DST but different rules)
2) Create synthetic appointment book with:
   - Same-day appointment, next-day appointment, next-week appointment
   - Two appointments at the same time (double-book attempt)
   - Appointment created then moved (calendar update)
   - Appointment canceled
3) Reminder schedule to test:
   - T-24h reminder
   - T-2h reminder
   - T-30m reminder (optional)

Test Cases (execute and record Pass/Fail + Notes)
TC1 Timezone correctness
- Create appointment at 9:00 AM local time for each location.
- Expected: SMS contains correct local time formatting and correct date.
- Expected: “Reply YES to confirm / NO to cancel / RESCHEDULE” (or equivalent) appears.

TC2 DST boundary
- Create appointment on DST transition week (simulate if needed).
- Expected: reminder times stay aligned to local time; no “off by one hour” errors.

TC3 Two-way confirmation: YES
- Reply “YES”, “Yes”, “Y”, “Confirm”, “👍” (if supported).
- Expected: status set to Confirmed; no further “are you coming?” reminders for that appointment; confirmation logged.

TC4 Two-way negative: NO / cancel
- Reply “NO”, “No”, “Cancel”, “can’t make it”.
- Expected: appointment marked Needs-Action/Canceled (per policy); reschedule prompt offered; slot becomes eligible for waitlist fill.

TC5 Reschedule intent (high confidence keywords)
- Reply “RESCHEDULE”, “move it”, “different time”, “can we do tomorrow?”.
- Expected: reschedule flow starts; provides 2–5 alternative times or requests preferred times; prevents infinite loops by capping back-and-forth attempts (e.g., max 3 cycles before human escalation).

TC6 Message threading / appointment disambiguation
- Same patient has two future appointments.
- Reply “YES”.
- Expected: system asks “Which appointment are you confirming? 1) Tue 3pm 2) Fri 9am” OR confirms the nearest upcoming appointment based on explicit rule; logs decision.

TC7 Late confirmation
- Reply YES after appointment start time.
- Expected: system responds politely (“Looks like this appointment has started/passed—need to reschedule?”) and does NOT mark it as attended; logs as late.

TC8 STOP / opt-out compliance
- Reply “STOP”, “Unsubscribe”, “Stop texting me”.
- Expected: opt-out immediately applied; confirmation sent (“You’re opted out…”); no further reminders sent; opt-out logged with timestamp.

TC9 HELP
- Reply “HELP”.
- Expected: sends support instructions and support email agent_bob_replit+no-show-bot@agentmail.to.

TC10 Calendar update propagation
- Move an appointment time after reminders have been scheduled.
- Expected: old scheduled reminders canceled; new reminders scheduled; user gets correct updated info.

TC11 Calendar API failure fail-safe
- Simulate calendar read/write failure.
- Expected: owner alert triggered (email or dashboard alert); system does not send misleading confirmations; incident logged with severity.

TC12 Waitlist fill
- Cancel an appointment with a waitlist entry available.
- Expected: waitlist offer message sent; first “YES” wins; once filled, no further offers; logs fill event.

Outputs
- Defect log entries for every fail: severity (S0–S3), steps to reproduce, expected vs actual, mitigation/workaround, retest date.

B) PILOT EXECUTION CHECKLIST (Day -3 to Day 14)
Day -3 to Day 0: Onboarding + Baseline
1) Collect baseline (last 4 weeks):
   - Total appointments/week
   - No-show count/week
   - Avg revenue per appointment (or service mix)
   - Current reminder process (none / manual / other)
2) Collect config:
   - Timezone + business hours
   - Reminder timing (e.g., 24h + 2h)
   - Reschedule policy (min notice, allowed windows)
   - Waitlist policy (how many offers, expiration)
   - Owner escalation contact (name + email)
3) Consent/opt-in confirmation:
   - Confirm clients have agreed to receive SMS reminders as part of service.
   - Confirm STOP/HELP handling.
4) Go-live readiness checks:
   - Timezone sanity test: create 1 test appointment and verify reminder timestamp.
   - Reply-parsing sanity: YES/NO/RESCHEDULE/STOP.

Day 1–2: Soft Launch
- Monitor every outbound SMS and every inbound reply.
- Manually verify status transitions: Confirmed / Needs reschedule / Opt-out.
- Incident rules:
  - S0: Opt-out broken, wrong patient notified, or message sent at wrong time repeatedly → pause sending immediately.
  - S1: Reschedule loop or misclassification causing customer friction → apply rule-based override, escalate if needed.

Day 3–7: Full Pilot Week
- Daily review (10 minutes/location):
  - Confirmation rate (confirmed / total reminded)
  - Reschedule saves (# rescheduled instead of no-show)
  - Waitlist fills (#)
  - Opt-outs (#)
  - Incidents (#, severity)
- Mid-week tweak window: adjust reminder timings and high-confidence keyword rules.

Day 8–14: Stabilize + Expand
- Aim for <1% message errors; 100% STOP compliance; no timezone issues.
- Prepare conversion offer (discounted first month or concierge bundle).

C) WEEKLY VALUE REPORT TEMPLATE (ready to email each Monday)
Subject: Weekly No-Show Reduction Report — {Business Name} ({Week of MMM DD})

Hi {Owner Name},

Here’s your weekly performance summary from Appointment No-Show Reducer:
Website for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

1) Outcomes (this week)
- Appointments with reminders sent: {N_total_reminded}
- Confirmed by SMS: {N_confirmed} ({Pct_confirmed}%)
- Rescheduled (avoided likely no-show): {N_rescheduled}
- Waitlist fills: {N_waitlist_fills}
- Opt-outs: {N_optouts}

2) Estimated Revenue Recovered
- Avg revenue/appointment: ${Avg_value}
- Estimated saved appointments (reschedules + waitlist fills): {N_rescheduled}+{N_waitlist_fills} = {N_saved}
- Estimated recovered revenue this week: {N_saved} × ${Avg_value} = ${Revenue_recovered}

3) Baseline vs Pilot (if baseline provided)
- Baseline no-show rate: {Baseline_no_show_pct}%
- This week estimated no-show rate: {This_week_no_show_pct}%
- Change: {Delta_pct}%

4) Notable Replies / Customer Experience
- Most common reply types: YES ({Pct_yes}%), RESCHEDULE ({Pct_reschedule}%), NO ({Pct_no}%)
- Any issues encountered: {Incident_summary_or_None}

5) Next Week Optimization
- Proposed tweak(s): {e.g., move 2-hour reminder to 3 hours; add keyword override for “running late”}

If you’d like, I can also share a short breakdown by day-of-week/time-of-day to spot where no-shows concentrate.

Best,
Bob
agent_bob_replit+no-show-bot@agentmail.to

D) OUTREACH TRACKING STATUSES (for 30-prospect batch)
Use these statuses in a sheet/CRM so nothing drops:
1) Prospect Identified
2) Contacted (Email 1)
3) Replied — Interested
4) Kickoff Scheduled
5) Consent Confirmed
6) Baseline Received
7) Config Complete
8) Pilot Live
9) Week-1 Report Sent
10) Converted to Paid / Not a Fit

This kit is designed so we can quickly start outreach and onboard pilots while maintaining safety (STOP compliance, timezone correctness, calendar failure alerts) and producing weekly ROI proof for conversions.
