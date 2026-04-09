# Pilot Activation Kit (v1): Recruitment Tracker + Live Launch Checklist + Consent Language + Success Proof Pack

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:35:02.063Z

---

Below is a paste-ready Pilot Activation Kit to recruit, launch, and measure 2–3 concierge pilots for Appointment No-Show Reducer.

1) PILOT RECRUITMENT TRACKER (Spreadsheet Columns)
Use as Google Sheet columns. Stages: Prospect → Contacted → Replied → Call Booked → Qualified → Consent Confirmed → Baseline Captured → Configured → Live (Day 0) → Week 1 Report Sent → Converted.
Columns:
- Date added
- Business name
- Niche (med spa, dental, PT, salon, etc.)
- Location + timezone
- Contact name + role
- Email / phone
- Source (Google Maps / referral / LinkedIn)
- Stage (dropdown)
- Qualification notes (appt volume/week, no-show pain, staff capacity)
- Baseline no-show rate (last 4 weeks)
- Avg appointment value ($)
- Reminder strategy (24h + 2h, etc.)
- Reschedule policy (allowed windows, cutoff)
- Waitlist enabled? (Y/N)
- Consent confirmed? (Y/N + date + method)
- Go-live date
- Issues/risks (integration, timezone, etc.)
- Weekly recovered revenue estimate
- Next action + due date
- Owner escalation contact
- Notes

2) LIVE LAUNCH CHECKLIST (Day -2 → Day 0 Reliability Gates)
Day -2 (Preflight)
- Confirm business timezone (IANA if possible) and business hours.
- Confirm appointment source (calendar/booking system) and how updates are written back.
- Confirm message sending window rules (no texts outside permitted hours).
- Confirm opt-in mechanism (documented consent, see consent snippet below).
- Configure reminder schedule (e.g., 24 hours + 2 hours) and reschedule link/process.

Day -1 (QA Gates)
- Timezone/DST test: create 2 test appointments spanning morning/afternoon; verify reminder timestamps are correct.
- Reply parsing tests (from at least 2 phone numbers):
  - YES / Y / Confirm → marks confirmed
  - NO / N → marks not confirmed and triggers reschedule flow
  - RESCHEDULE / CHANGE → triggers reschedule flow
  - STOP / UNSUBSCRIBE → opt-out immediately; no further reminders
  - HELP → sends help instructions + support contact
- Threading: send multiple replies in same thread; ensure state is correct (last intent wins unless STOP).
- Calendar writeback test: confirm/reschedule updates are reflected; verify no double-booking behavior.
- Fail-safe: simulate calendar/API failure; verify owner alert is triggered and system falls back safely (no duplicate/conflicting messages).

Day 0 (Go-Live)
- Confirm first live reminders will send within business hours.
- Confirm owner escalation channel and response SLA for incidents.
- Enable daily monitoring (Day 1–7) and incident log.
- Capture baseline proof: last 4 weeks no-show count, show rate, avg value; store in pilot folder.

Rollback Criteria (stop/disable reminders immediately)
- Wrong-timezone sends
- STOP not honored
- Duplicate reminders for same appointment
- Incorrect reschedule that changes wrong appointment

3) CLIENT-FACING PILOT CONSENT + MESSAGING DISCLOSURE (Paste into Email/Intake Form)
Subject: Two-way SMS reminders pilot — consent + what to expect

Hi {{Name}},

To run the free 7-day pilot of Appointment No-Show Reducer, we need confirmation that your customers have consented to receive appointment-related SMS messages from your business (standard appointment reminders/confirmations). During the pilot, customers may receive reminders and can reply by text to confirm or reschedule.

What customers will see:
- Reminder texts for upcoming appointments
- Two-way replies supported (e.g., YES to confirm, RESCHEDULE to change)
- Opt-out is always available: reply STOP to unsubscribe
- Help is available: reply HELP for instructions

Support + legitimacy:
- Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to

By replying “I CONFIRM” to this email (or signing below), you confirm:
1) You have permission to send appointment-related SMS to your customers.
2) You want us to run two-way confirmation + rescheduling for the pilot period.
3) You understand customers can opt out at any time by texting STOP.

Signature / Name / Date:

4) PILOT SUCCESS PROOF PACK (What to Capture for Sales Proof)
Baseline (before Day 0)
- Last 4 weeks: total appointments, no-shows, cancellations, reschedules
- Avg appointment value ($) and/or revenue per day
- Current reminder process (none/manual)

During pilot (daily)
- # reminders sent
- # confirmations
- # reschedule requests
- # successful reschedules completed
- # waitlist fills (if enabled)
- # opt-outs (STOP)
- Any incidents (wrong time, duplicate, API failure)

Weekly proof (client-facing)
- No-show reduction estimate
- “Recovered revenue” estimate = (avoided no-shows + filled gaps) × avg appointment value
- 2–3 example anonymized message threads showing confirmations/reschedules working

This kit is designed to get pilots live quickly while protecting reliability (STOP/HELP, timezone/DST, calendar writebacks) and ensuring we collect baseline vs. outcome metrics for a conversion-ready Week 1 report.