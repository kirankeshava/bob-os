# 48-Hour Pilot QA Simulation + Defect Log + Client Comms Pack (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:08:38.117Z

---

Below is a ready-to-run internal QA simulation and pilot operations pack for the Appointment No-Show Reducer micro-SaaS.

LEGITIMACY + SUPPORT (include in all customer comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to

A) 48-HOUR INTERNAL QA SIMULATION (execute before each pilot go-live)
Goal: prove reliability of messaging, parsing, calendar updates, and fail-safes using synthetic appointments + controlled replies.

Pre-req setup (30–45 min)
1) Create 12 synthetic appointments across 3 “providers” (A/B/C) with varying durations (15/30/60), plus 2 double-book attempts.
2) Create appointments across timezones: America/New_York, America/Chicago, America/Los_Angeles. Include a DST edge (appointment date near DST change if possible).
3) Define reminder schedule for test: T-24h and T-2h messages.
4) Prepare 5 test phone numbers (or SMS simulator numbers) to generate realistic reply threads.

Test Case 1 — Timezone correctness (Pass/Fail)
- Action: Schedule identical “10:00 AM local time” appointments in 3 timezones.
- Expectation: Reminder content shows correct local date/time for each recipient; no “server time” leakage.
- Fail if: any reminder is off by ≥ 30 minutes or shows wrong AM/PM.

Test Case 2 — DST boundary (Pass/Fail)
- Action: Create appointment spanning the DST change weekend; send reminder.
- Expectation: Time displayed matches the calendar’s local time after DST adjustment.
- Fail if: time shifts by 1 hour incorrectly.

Test Case 3 — Threading / conversation continuity
- Action: Send reminder; user replies “Yes” then later “Actually can’t make it”.
- Expectation: System links both replies to the same appointment; second reply triggers reschedule flow (or escalation rule), not a new unrelated thread.
- Fail if: second reply is ignored or mapped to wrong patient/appointment.

Test Case 4 — High-confidence keyword overrides (anti-AI misclass)
- Replies to test: YES, Y, CONFIRM, OK, NO, N, CANCEL, RESCHEDULE, MOVE, LATE, RUNNING LATE, STOP, UNSUBSCRIBE, HELP.
- Expectation:
  - YES-family => Confirmed status
  - NO/CANCEL => Cancellation/reschedule offer (per business rules)
  - RESCHEDULE/MOVE => reschedule flow
  - STOP/UNSUBSCRIBE => immediate opt-out + confirmation message; no further reminders
  - HELP => help response + escalation path
- Fail if: STOP doesn’t opt out immediately, or YES is treated as reschedule/cancel.

Test Case 5 — Opt-out compliance (critical)
- Action: Recipient replies STOP.
- Expectation: (1) Instant confirmation: “You’re opted out. Reply START to re-subscribe.” (2) No further messages sent.
- Fail if: any additional reminder is sent after STOP.

Test Case 6 — Reschedule loop protection
- Action: User replies RESCHEDULE; system proposes times; user says “none work”, then “tomorrow afternoon”.
- Expectation: system either (a) offers next set of slots OR (b) escalates to owner/staff after 2 failed attempts; does not loop indefinitely.
- Fail if: more than 3 automated back-and-forths without escalation or state change.

Test Case 7 — Double-booking prevention
- Action: Attempt to reschedule into a time that is already booked for the same provider.
- Expectation: system refuses that slot and offers alternatives.
- Fail if: system confirms a conflicting slot.

Test Case 8 — Calendar update correctness
- Action: Confirm appointment; then reschedule; then cancel.
- Expectation: calendar reflects the latest state (confirmed/rescheduled/canceled) exactly once; no orphan events remain.
- Fail if: duplicate events exist or canceled events remain active.

Test Case 9 — “Late” intent handling
- Action: Reply “Running 10 min late”.
- Expectation: rule-based intent recognized as LATE; system acknowledges and optionally notifies staff/owner.
- Fail if: interpreted as cancel/reschedule.

Test Case 10 — Non-English / ambiguity fallback
- Action: Reply “👍”, “k”, “maybe”, or non-English message.
- Expectation: safe fallback question: “Reply YES to confirm, NO to cancel, or RESCHEDULE to change.” If still ambiguous, escalate.
- Fail if: system marks confirmed/canceled without clarity.

Test Case 11 — Calendar API failure fail-safe (critical)
- Action: simulate calendar API failure during reschedule.
- Expectation: system tells patient: “We’re having trouble updating the schedule—someone will confirm shortly.” AND alerts owner via email/SMS with incident details.
- Fail if: system silently fails or tells patient it’s confirmed when it isn’t.

Test Case 12 — Rate limiting / retry policy
- Action: trigger burst send of reminders (e.g., 100 scheduled sends in a minute in staging).
- Expectation: queue processes steadily; failures retried with backoff; no duplicate sends.
- Fail if: duplicates occur or backlog stalls without alert.

B) DEFECT LOG + BUG TRIAGE WORKFLOW (use during pilots)
Severity definitions
- S0 Critical: compliance breach (STOP ignored), wrong-patient messaging, duplicate booking created, calendar corruption, or inability to stop sending.
- S1 High: incorrect time/timezone, confirmations not recorded, reschedule fails without escalation.
- S2 Medium: message wording confusing, analytics mismatch, minor threading issues.
- S3 Low: cosmetic/reporting issues.

Defect log fields (copy into your tracker/spreadsheet)
- Defect ID
- Date/Time detected
- Location (Pilot # / business)
- Severity (S0–S3)
- Component (SMS sending, Parsing, Calendar sync, Analytics, Reporting)
- Steps to reproduce (numbered)
- Expected vs Actual
- Evidence (message IDs, screenshots, logs)
- Workaround (if any)
- Owner
- Status (New / In Progress / Fixed / Verified / Won’t Fix)
- Verification steps + verifier name/date

SLA / comms
- S0: acknowledge < 30 minutes; mitigation < 2 hours; customer update immediately.
- S1: acknowledge same day; fix or workaround < 24 hours.
- S2/S3: batch into weekly fix window.

C) CLIENT-FACING PILOT COMMS (ready to paste)

1) Pilot Kickoff Email (send after “yes”)
Subject: Pilot kickoff — reduce no-shows with two-way SMS confirmations

Hi {{OwnerName}},

Excited to get your pilot live. Here’s what we’ll do over the next 7 days:
1) Connect your appointment source (calendar or scheduling system)
2) Turn on two-way SMS reminders (customers can reply YES/NO/RESCHEDULE)
3) Track confirmations, reschedules saved, and estimated revenue recovered

To confirm legitimacy and how we operate, here’s our info:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Support: agent_bob_replit+no-show-bot@agentmail.to

Quick questions so we configure correctly:
- Business timezone:
- Business hours:
- Reminder timing (default: 24h + 2h):
- If customer replies RESCHEDULE, should we offer next-available times or route to staff?
- Best contact for escalation (name + phone + email):

Opt-out compliance: every message includes STOP to opt out; STOP requests are honored immediately.

Reply with the answers above and we’ll schedule a 15-minute setup.

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

2) Patient-facing Reminder Copy (default)
SMS (T-24h): “Reminder: you have an appointment at {{Time}} on {{Date}}. Reply YES to confirm, RESCHEDULE to change, or STOP to opt out.”
SMS (T-2h): “See you at {{Time}} today. Reply YES to confirm, RESCHEDULE to change, or STOP to opt out.”

3) STOP confirmation copy
SMS: “You’re opted out and will no longer receive messages. Reply START to re-subscribe.”

4) Ambiguous reply fallback
SMS: “Sorry—just to confirm: reply YES to keep your appointment, RESCHEDULE to change it, or NO to cancel.”

D) WEEK-1 METRICS CAPTURE (baseline vs pilot)
Baseline (collect prior 4 weeks, per location)
- Total appointments scheduled
- No-shows
- Same-day cancellations
- Avg appointment value ($)
Pilot week metrics
- Reminders sent
- Confirmation rate = confirmed / reminders delivered
- Reschedules completed (count)
- Waitlist fills (count)
- Estimated recovered revenue/week = (no-show reduction * avg appointment value) + (waitlist fills * avg appointment value)

Use this pack to run the internal 48-hour simulation, start pilots safely, and generate credible weekly value proof for conversions and future sales.