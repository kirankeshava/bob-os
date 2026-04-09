# Pilot Activation Kit v1 — Synthetic QA Test Script, Bug Triage Template, and Client Go‑Live Comms

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:52:45.382Z

---

Below is a pilot-ready package you can use to (1) QA the workflow with synthetic data before any live location, (2) log/resolve issues consistently during pilots, and (3) set client expectations clearly at go-live.

1) SYNTHETIC QA TEST SCRIPT (run in staging or a test calendar)
Goal: validate timezones/DST, calendar updates, no double-booking, opt-out, threading, and fail-safes.

Pre-setup (5 min)
- Choose Business Timezone: test at least 2 (e.g., America/New_York and America/Los_Angeles).
- Configure reminder schedule for test: T-24h + T-2h + T-30m.
- Define allowed reschedule windows: same-day allowed until 2 hours before; otherwise offer next-day.
- Escalation contact: owner email = agent_bob_replit+no-show-bot@agentmail.to.

Create synthetic appointments (use unique patient names + phone numbers reserved for test)
A. Standard confirmation
- Appt A1: Tomorrow 10:00 AM local, “Haircut”, $60.
Expected: T-24h reminder sent; reply “YES” confirms; system records confirmed state; no further nagging beyond configured schedule.

B. Late confirmation
- Appt B1: Today 3:00 PM local, booked yesterday, $150.
Expected: T-2h reminder sent; reply “Yes” at T-20m still counts; confirmation recorded; message thread stays intact.

C. Reschedule request (explicit)
- Appt C1: Tomorrow 1:00 PM local.
Test replies:
  1) “reschedule”
  2) “Can we move this to Friday afternoon?”
Expected: system flags reschedule intent; offers acceptable slots; once new slot chosen, calendar update occurs (old slot freed, new slot booked) with no duplicate booking.

D. Negative / cancel
- Appt D1: Tomorrow 9:00 AM.
Reply: “NO” then “I can’t make it”.
Expected: appointment marked unconfirmed/cancel intent; workflow offers reschedule; if cancel supported, cancels and optionally triggers waitlist fill.

E. STOP / opt-out compliance
- Appt E1: Tomorrow 11:00 AM.
Reply: “STOP”.
Expected: immediate opt-out; no further SMS; record opt-out timestamp + source message; send compliant confirmation (“You’re opted out…”). Also verify HELP response if user texts “HELP”.

F. DST / timezone boundary test (critical)
- Create appt F1 on the next DST transition weekend in the selected timezone (or simulate by switching TZ).
Expected: reminders fire at correct local times; no off-by-one-hour errors; logs show timezone used.

G. Double-book prevention
- Create two appointments same staff/resource at same time (G1 and G2).
Expected: system refuses second booking OR flags conflict; never sends confirmations that imply both are valid; raises owner alert.

H. Calendar API failure fail-safe
- Temporarily revoke calendar permissions or simulate API error.
Trigger: reschedule flow (attempt write-back).
Expected: system stops automation, alerts owner at agent_bob_replit+no-show-bot@agentmail.to with clear instructions; sends patient a safe message (“We’re confirming manually; we’ll text you shortly.”) rather than creating bad data.

Pass/Fail recording
- For each test A–H, record: timestamp, expected, actual, screenshots/log lines, and final status.

2) BUG / INCIDENT TRIAGE TEMPLATE (copy/paste into Notion/Sheet)
Columns:
- ID (e.g., PILOT-001)
- Date/Time detected
- Pilot Location
- Severity: S0 Outage (automation unsafe/off), S1 Major (client-visible wrong behavior), S2 Minor (annoying but safe), S3 Cosmetic
- Category: Timezone/DST, Calendar read, Calendar write, Threading, Opt-out/Compliance, NLP Intent, Waitlist Fill, Analytics, UX Copy
- Summary (one sentence)
- Steps to Reproduce (numbered)
- Expected Result
- Actual Result
- Evidence (log line / screenshot / message transcript)
- Owner (Bob)
- Status: New / Triaging / In Progress / Fix Ready / Verified / Closed
- Fix Notes
- Verification Steps (what to re-test)
- Client Impact (Y/N) + Mitigation message sent (Y/N)

Severity rubric
- S0: risk of sending wrong reminders or corrupting calendar; must disable automation for that location until fixed.
- S1: wrong confirmation/reschedule outcomes; patient confusion; immediate fix within 24h.
- S2: copy/formatting issues; non-blocking.

3) CLIENT GO-LIVE COMMUNICATIONS (ready to send)

A) Pilot Go-Live Confirmation Email (to owner/manager)
Subject: Your No‑Show Reducer pilot is live — what to expect this week

Hi <Name>,

We’re live for your pilot location. Starting today, your customers will receive smart SMS reminders and can reply to confirm or request a reschedule.

What customers will see
- A reminder text before their appointment
- They can reply YES to confirm
- They can reply NO or RESCHEDULE to change plans
- They can reply STOP to opt out at any time

What you should expect operationally
- Confirmations and reschedule requests will be tracked automatically.
- If anything fails (e.g., calendar connection issues), we’ll pause automation for safety and alert you immediately.

Weekly value report
At the end of 7 days, you’ll receive a simple report showing confirmations, reschedules, prevented no‑shows, and an estimated recovered revenue figure.

Legitimacy + support
- Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to

Reply to this email with any special instructions (business hours, same-day reschedule rules, VIP handling).

— Bob

B) Internal “Safe Reply Interpretation” One‑Pager (for concierge operators)
High-confidence overrides (apply before any AI):
- STOP/UNSUBSCRIBE/CANCEL/SUBSCRIBE=STOP → Opt-out immediately; confirm opt-out; suppress all future messages.
- HELP → Send help message with support email and opt-out instructions.
- YES/Y/CONFIRM/OK/I’LL BE THERE → Confirm appointment.
- NO/N/CAN’T/MISS → Mark not confirmed; offer reschedule options.
- RESCHEDULE/CHANGE/MOVE/DIFFERENT TIME → Start reschedule flow.

Threading rule: only apply a reply to the most recent upcoming appointment for that phone number within the next 14 days; if multiple, ask a clarifying question (never assume).

Escalation rule: if calendar write fails or conflict detected, stop automation for that thread and alert agent_bob_replit+no-show-bot@agentmail.to with transcript + appointment identifiers.

4) MINIMUM BASELINE METRICS CAPTURE (Week-0)
Collect from the location before go-live (last 2–4 weeks):
- Total appointments booked
- No-shows count
- Late cancellations count (define window)
- Average appointment value (or by service tier)
- Current reminder method (none/manual/one-way)
Then during pilot (Week-1):
- Reminders sent
- Confirmations received
- Reschedule requests
- Successfully rescheduled
- Waitlist fills (if enabled)
- Estimated recovered revenue = (no-shows prevented + gaps filled) × avg appointment value (show calculation in weekly report).

This kit is designed to keep pilots safe (no calendar corruption, compliant opt-outs) while generating clean week-1 proof for sales conversion.