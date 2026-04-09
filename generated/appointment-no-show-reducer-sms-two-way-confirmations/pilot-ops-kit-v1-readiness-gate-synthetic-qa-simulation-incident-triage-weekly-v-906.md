# Pilot Ops Kit v1 (Readiness Gate + Synthetic QA Simulation + Incident Triage + Weekly Value Report v2)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:01:33.969Z

---

Appointment No-Show Reducer — Pilot Ops Kit v1

Legitimacy + contact (include in all client comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to

1) Pilot Readiness Gate (Go/No-Go)
Purpose: prevent launching a pilot that will fail due to missing consent, timezone mistakes, or unclear reschedule rules.

A. Compliance + consent (must be YES to go live)
- Client confirms they only message customers who provided a mobile number for appointment communications.
- Client approves opt-out language: “Reply STOP to opt out. Reply HELP for help.”
- Client provides an escalation contact (owner/manager phone + email) for urgent failures.

B. Business configuration (must be complete)
- Location timezone confirmed (e.g., America/Los_Angeles). Verify DST behavior by checking next DST change date.
- Business hours provided (e.g., Mon–Fri 9–6) and “quiet hours” rules set (no outbound outside hours).
- Appointment types/services list (at minimum: standard appointment length and average value).

C. Reminder schedule (must be explicit)
- Default reminder cadence agreed (example: T-48h, T-24h, T-3h).
- Confirmation request wording approved (YES/NO/RESCHEDULE options).
- Reschedule policy agreed: how close to appointment can reschedules occur (e.g., not within 2 hours).

D. Calendar + write-back rules (if integrated)
- Create/update/cancel behavior defined (what counts as source of truth).
- Double-booking prevention rule defined (reject overlaps; propose alternatives).
- Failure mode defined: if calendar API fails, system alerts owner immediately and pauses automated reschedules.

E. Analytics baseline capture (required before first message)
- Last 4 weeks: total appointments, no-shows count, no-show rate %, average appointment value, typical lead time.
- Current reminder process documented (manual call/text? none?).

Go/No-Go decision
- Go live only if A–E complete.
- If any item missing: delay go-live; schedule 24h follow-up.


2) Synthetic QA Simulation Script (internal, 48-hour pass)
Goal: validate reply parsing, threading, timezone behavior, opt-out, and safe fallbacks before exposing to real customers.

How to run
- Create 6 synthetic “patients/customers” with unique phone numbers (test numbers) and names.
- Create 12 synthetic appointments spanning: same-day, next-day, weekend boundary, and a DST edge (if feasible).
- For each test below: send the outbound reminder (or simulate it), then send the inbound reply exactly as written.
- Log actual behavior vs expected. Any mismatch becomes a bug ticket.

Test Case 01 — Basic confirmation
- Inbound: “YES”
- Expected: status=confirmed; no further confirmation nags; confirmation timestamp recorded; message thread continues.

Test Case 02 — Natural language confirmation
- Inbound: “Yep I’ll be there”
- Expected: status=confirmed; intent=confirm; no reschedule flow triggered.

Test Case 03 — Negative / cancel intent
- Inbound: “No can’t make it”
- Expected: status=declined; system offers reschedule options OR routes to staff per policy; no double-book.

Test Case 04 — Explicit reschedule keyword
- Inbound: “RESCHEDULE”
- Expected: reschedule flow begins; proposes next 3 available slots within business hours; preserves thread.

Test Case 05 — Time suggestion parsing
- Inbound: “Can we do tomorrow at 3?”
- Expected: system checks availability; if free, offers to book; if not free, offers closest alternatives; never creates overlap.

Test Case 06 — Ambiguous message (needs clarification)
- Inbound: “I’m not sure yet”
- Expected: system asks a clarifying question; does not mark confirmed/declined.

Test Case 07 — STOP compliance (hard requirement)
- Inbound: “STOP”
- Expected: opt-out applied immediately; confirmation message sent (“You’re opted out…”); no further messages to that number.

Test Case 08 — HELP keyword
- Inbound: “HELP”
- Expected: help response with website + support email + opt-out instructions; no status change.

Test Case 09 — Thread continuity
- Inbound 1: “Yes” (confirm)
- Inbound 2 (later): “Actually can we move it to next week?”
- Expected: second message reopens reschedule flow without losing context; original appointment not double-booked.

Test Case 10 — Late reply close to appointment
- Scenario: inbound arrives < 60 minutes before appointment.
- Inbound: “YES”
- Expected: confirm still recorded; optional staff notification if policy requires; no reschedule prompts.

Test Case 11 — Timezone boundary
- Create appointment at 9:00 AM local time.
- Verify reminders send at T-24h and T-3h in local time (not server time).
- Expected: timestamps and logs show correct timezone handling.

Test Case 12 — Calendar API failure fallback
- Simulate calendar failure during reschedule attempt.
- Inbound: “Reschedule to Friday 2pm”
- Expected: system does NOT promise booking; instead says it’s having trouble and will notify staff; sends alert to owner; incident logged as S0/S1.

Pass/Fail criteria
- Any STOP/HELP failure is automatic FAIL.
- Any double-booking created is FAIL.
- Any timezone misfire >15 minutes is FAIL.


3) Incident / Bug Triage Template (use during pilots)
Ticket header
- Ticket ID:
- Date/time detected:
- Pilot location:
- Severity: S0 / S1 / S2 / S3
- Reporter:

Severity definitions
- S0: Compliance or safety breach (STOP ignored; messages sent outside quiet hours; wrong recipient) — immediate pause + owner alert.
- S1: Revenue-impacting failure (confirmations not recorded; reschedules fail; double-book risk) — fix same day.
- S2: Degraded experience (awkward copy; slow responses; minor threading issues) — fix within 72h.
- S3: Nice-to-have (copy tweaks, formatting) — backlog.

Reproduction steps
1)
2)
3)

Expected vs actual
- Expected:
- Actual:

Logs to attach
- Message thread transcript
- Appointment ID/timezone
- Integration status (calendar API response/error)

Client comms requirement
- If S0/S1: notify owner within 15 minutes with a plain-language summary + mitigation.

Fix verification checklist
- Test repeated with same inputs
- Confirmed no regression on STOP/HELP
- Confirmed analytics counters update correctly


4) Weekly Value Report Template v2 (client-facing)
Subject: Weekly results — reduced no-shows + recovered revenue (Week of {{DATE_RANGE}})

Hi {{OWNER_NAME}},

Here’s your weekly Appointment No-Show Reducer summary for {{LOCATION_NAME}}.
Website for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

1) Activity (this week)
- Appointments with reminders sent: {{N_REMINDER_SENT}}
- Customers who replied: {{N_REPLIED}} ({{REPLY_RATE}}%)
- Confirmed: {{N_CONFIRMED}}
- Declined / can’t make it: {{N_DECLINED}}
- Reschedule conversations started: {{N_RESCHED_START}}
- Successful reschedules completed: {{N_RESCHED_DONE}}
- Waitlist fills (if enabled): {{N_WAITLIST_FILLED}}
- Opt-outs (STOP): {{N_OPTOUT}}

2) No-show impact (baseline vs this week)
Baseline (previous {{BASELINE_WEEKS}} weeks)
- Avg weekly appointments: {{BASELINE_WEEKLY_APPTS}}
- Avg no-show rate: {{BASELINE_NOSHOW_RATE}}%

This week
- No-show rate (estimated from attended vs missed): {{THIS_WEEK_NOSHOW_RATE}}%
- Change vs baseline: {{DELTA_PCT_POINTS}} percentage points

3) Estimated recovered revenue
Inputs
- Average appointment value: ${{AVG_APPT_VALUE}}
- Baseline expected no-shows this week: {{BASELINE_EXPECTED_NOSHOWS}}
- Actual no-shows this week: {{ACTUAL_NOSHOWS}}

Recovered appointments (estimated): {{RECOVERED_APPTS}}
Estimated recovered revenue: ${{RECOVERED_REVENUE}}

4) Notable conversations (examples)
- {{EXAMPLE_1}}
- {{EXAMPLE_2}}

5) Next-week improvements (1–2 experiments)
- Experiment A: {{EXPERIMENT_A}} (goal: increase reply rate or confirmations)
- Experiment B: {{EXPERIMENT_B}} (goal: reduce late cancellations / fill gaps)

If you’d like, reply to this email with your preferred reminder timing (e.g., 48h/24h/3h) and any wording preferences, and we’ll tune the workflow.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

End of Pilot Ops Kit v1
