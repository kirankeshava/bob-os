# Pilot Activation + QA Simulation Runbook (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:05:13.178Z

---

Business legitimacy URL (share with pilot clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/contact email: agent_bob_replit+no-show-bot@agentmail.to

1) Pilot Activation SOP (Goal: go-live within 48 hours of “yes”)

A. Intake (15 minutes, required fields)
- Business name + location
- Primary owner/operator contact (name, mobile, email)
- Timezone (explicit; do not infer), business hours
- Appointment types + average appointment value ($)
- Current booking system (name) + how reminders are sent today
- Reminder schedule preferences (recommended default):
  - T-24h reminder + confirm
  - T-2h reminder if not confirmed
- Reschedule policy: allowed windows (e.g., >6h before appt), reschedule link/phone
- Waitlist policy: do they keep one? max distance (e.g., within 48 hours) and how to contact
- Consent/opt-in confirmation: “These customers have provided permission to receive SMS about their appointments.”

B. Baseline capture (must be collected before Day 1)
- Last 4 weeks totals:
  - Appointments scheduled
  - No-shows
  - Late cancels
  - Avg appointment value
- Optional: average lead time + busiest days

C. Configuration checklist (concierge setup)
- Set timezone and confirm with a known appointment time (“Your 2pm appointment should be treated as 2pm local time.”)
- Load/test 3 sample appointments (tomorrow + next week + DST edge if applicable)
- Enable rule-based keyword overrides (high confidence):
  - CONFIRM: YES, Y, CONFIRM, CONFIRMED
  - CANCEL/DECLINE: NO, N, CAN’T, CANT, CANCEL
  - RESCHEDULE: RESCHEDULE, MOVE, CHANGE, LATER, DIFFERENT TIME
  - OPT-OUT: STOP, UNSUBSCRIBE, CANCEL SMS
  - HELP: HELP, INFO
- Threading rules: always reply in-thread; never create a new thread for the same appointment
- Fail-safe behavior:
  - If calendar API fails OR appointment lookup fails: send a neutral message to customer and alert owner immediately
  - If ambiguity persists after 1 clarification: escalate to owner

D. Go-live readiness test (pass/fail)
- Confirmations update appointment status correctly
- Reschedule attempts do not double-book; system checks availability before offering times
- STOP immediately suppresses future messages; HELP returns support text
- Timezone correctness for all reminders (including DST when relevant)

E. Monitoring cadence
- Day 1–3: twice-daily checks (morning + late afternoon)
- Day 4–14: daily check
- Incident SLA: respond within same business day; critical issues within 1 hour

2) 48-hour Internal QA Simulation Message Set (copy/paste)

Use these synthetic appointments (local timezone unless stated). For each test, verify: correct timing, correct threading, correct status updates, correct escalation.

Test Set A — Timezone/DST
A1. Appointment: “Tue 2:00pm local”. Configure business in America/New_York.
- Expected: T-24h reminder arrives at 2:00pm the day prior (not in UTC).
A2. DST edge (if near DST period): appointment at 9:00am the first business day after DST shift.
- Expected: reminders still align to local wall clock.

Test Set B — Confirm flow
B1. Reminder SMS -> customer replies: “Yes”
- Expected: mark confirmed; send short acknowledgment.
B2. Customer replies: “Y”
- Expected: same as B1 (keyword override).
B3. Customer replies: “Confirmed for tomorrow”
- Expected: confirmed.

Test Set C — Decline/Cancel
C1. Reply: “No”
- Expected: ask if they want to reschedule; free the slot if policy allows; notify owner.
C2. Reply: “can’t make it”
- Expected: treat as decline; ask reschedule.

Test Set D — Reschedule loop prevention
D1. Reply: “reschedule”
- Expected: offer link or propose 2–3 available times; do not book without confirmation.
D2. Customer responds with ambiguous: “later”
- Expected: ask a clarifying question once: “What day/time works?”
D3. Customer keeps looping: “later” again
- Expected: escalate to owner per rule.

Test Set E — Double-book prevention
E1. Customer requests “tomorrow at 2pm” but slot is already booked.
- Expected: do not book; offer nearest alternatives.

Test Set F — Opt-out + Help compliance
F1. Reply: “STOP”
- Expected: immediate opt-out confirmation; suppress all future reminders.
F2. Reply: “HELP”
- Expected: return support info: “Support: agent_bob_replit+no-show-bot@agentmail.to” and optionally the legitimacy URL.

Test Set G — Calendar/API failure fail-safe
G1. Simulate appointment lookup failure.
- Expected outbound to customer (neutral): “We’re having trouble locating your appointment details. Please contact the office to confirm.”
- Expected owner alert: includes customer number (masked if required), timestamp, error code, and next steps.

3) Client-Facing Templates (ready to send)

3.1 Pilot Welcome + What To Expect (Email)
Subject: Your No-Show Reducer pilot — kickoff + what we need to go live

Hi {{OwnerName}},

Thanks for joining the 14-day pilot for Appointment No-Show Reducer.

What it does: sends smart SMS reminders, captures two-way confirmations, helps reschedule, and can fill gaps from a waitlist. We’ll quantify impact weekly.

For legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

To go live, please reply with:
1) Your timezone + business hours
2) Reminder timing preference (recommended: 24h + 2h if not confirmed)
3) Reschedule policy + reschedule link/phone
4) (Baseline) Last 4 weeks: total appointments, no-shows, late cancels, average appointment value
5) Confirmation that customers have consented to receive SMS about their appointments

Once received, we can go live within 48 hours. During the pilot, you’ll get a weekly value report showing confirmations, reschedules saved, waitlist fills, and estimated recovered revenue.

— Bob

3.2 Daily Incident/Issue Update (Email)
Subject: Pilot daily check-in ({{Date}}) — status + any issues

Hi {{OwnerName}},

Daily pilot status for {{Location}}:
- Messages sent: {{#}}
- Confirmations received: {{#}} ({{%}})
- Reschedule requests: {{#}} ({{#}} successfully rebooked)
- Waitlist fills: {{#}}
- Opt-outs: {{#}}

Incidents (if any):
- Severity: {{S1/S2/S3}}
- Summary: {{What happened}}
- Impact: {{Customer count / appointment count}}
- Mitigation applied: {{What we did now}}
- Next step + ETA: {{Fix/verify plan}}

If anything looks off, reply here or email agent_bob_replit+no-show-bot@agentmail.to.

— Bob

4) Bug List Format + Verification Checklist

Bug record fields:
- ID:
- Date/time detected:
- Pilot location:
- Severity (S1 critical / S2 major / S3 minor):
- Title:
- Environment (prod/pilot/sim):
- Steps to reproduce (numbered):
- Expected result:
- Actual result:
- Screenshots/log excerpts:
- Workaround (if any):
- Owner notified? (Y/N + timestamp)
- Fix implemented by:
- Verification steps:
- Verification result + timestamp:

Verification checklist (close criteria):
- Reproduced on original scenario
- Fix tested on at least 1 adjacent edge case (e.g., YES vs “Yes!”; STOP lowercase; timezone check)
- No regression in opt-out compliance
- Owner notified of resolution if incident impacted customers

This runbook is designed to support 2–3 rapid concierge pilots with reliable workflows, clear fail-safes, and defensible weekly reporting for sales proof.