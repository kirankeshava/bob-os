# Pilot Ops + QA Runbook (48-hour Simulation, Incident Triage, Kickoff/Consent, and Weekly Metrics Rules)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:21:02.594Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL (share with clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/Contact Email: agent_bob_replit+no-show-bot@agentmail.to
Owner/Operator Name: Bob Smith

1) 48-HOUR INTERNAL QA SIMULATION PLAN (RUN BEFORE/ALONGSIDE FIRST PILOT)
Goal: Validate the end-to-end reminder + two-way confirmation workflow, edge-case handling, and fail-safes with consistent pass/fail criteria.

Setup (30 minutes)
- Create a synthetic “test location” configuration:
  - Timezone: pick 2 (e.g., America/Los_Angeles and America/New_York)
  - Business hours: 9am–5pm local
  - Reminder schedule: T-24h and T-2h
  - Reschedule allowed: yes, only within business hours, minimum 2h lead time
  - Waitlist: enabled, max 10 entries
  - Escalation contact: agent_bob_replit+no-show-bot@agentmail.to
- Prepare 20 synthetic appointments across 3 days in both timezones.

Test Matrix (execute and log each case)
A. Timezones + DST
1. Same appointment time displayed correctly for the location’s timezone.
2. DST boundary test (if near DST change, simulate by using a known DST date): reminder triggers at correct local time.
Expected: No reminder is sent early/late; timestamps in logs are consistent (store in UTC, display in local).

B. Confirmation Threading + Idempotency
3. Customer replies “YES” once.
4. Customer replies “YES” twice.
5. Customer replies “Yes!” with punctuation.
Expected: first YES confirms; duplicates are ignored; conversation remains in same thread; no duplicate calendar updates.

C. Negative / Cancel / Reschedule Loops
6. Customer replies “NO”.
7. Customer replies “RESCHEDULE”.
8. Customer proposes time: “Can we do tomorrow at 3?”
9. Customer replies with unclear intent: “maybe” / “idk”.
Expected: NO triggers cancellation policy flow (or owner escalation if policy unknown). RESCHEDULE triggers reschedule flow; ambiguous replies trigger a clarifying question + owner escalation after 1 failed clarification.

D. Opt-out + Compliance
10. Customer replies “STOP”.
11. Customer replies “unsubscribe”.
12. Customer replies “HELP”.
Expected: STOP/unsubscribe immediately suppresses future messages and sends confirmation of opt-out; HELP returns support message + contact email.

E. Double-booking / Slot Integrity
13. Two customers attempt to reschedule into same slot.
14. A slot is filled externally while reschedule is in progress.
Expected: system detects conflict and offers next available options; never confirms two bookings for one slot.

F. Calendar/API Failure Fail-safes
15. Simulate calendar API failure during confirmation.
16. Simulate calendar API failure during reschedule.
Expected: system does NOT tell customer it’s confirmed if write fails; it alerts owner/support immediately with appointment details, and sends customer a “We’re checking availability—confirming shortly” holding message.

G. Waitlist Fill
17. Cancellation occurs for a high-demand slot.
18. First waitlist member accepts; second also replies YES later.
Expected: only the first acceptance gets the slot; second is offered alternatives.

H. Quiet Hours / Business Hours Guardrails
19. Reminder would send outside business hours.
20. Customer replies outside business hours.
Expected: reminders follow configured quiet hours; after-hours replies get an automated receipt + next-business-hour follow-up.

Logging Fields for Each Test
- Test case ID
- Location timezone
- Appointment ID
- Trigger time (UTC + local)
- Customer message
- Parsed intent (AI + rule override)
- Action taken (confirm/cancel/reschedule/opt-out/escalate)
- Calendar write result (success/failure)
- Customer-facing message sent
- Pass/Fail + notes

2) INCIDENT + BUG TRIAGE WORKFLOW (PILOT OPERATIONS)
Goal: Prevent silent failures, minimize client risk, and produce a clean “bugs found/fixed” narrative.

Severity Levels
- SEV0 (Critical): Compliance risk (STOP not honored), wrong patient/customer messaged, double-booking, or false confirmation when calendar write failed.
  - SLA: acknowledge within 15 minutes (during business hours), mitigate immediately (pause automation if needed).
- SEV1 (High): Reminders sent at wrong time (timezone), reschedule loop stuck, messages not sending to multiple customers.
  - SLA: acknowledge within 1 hour; workaround same day.
- SEV2 (Medium): Minor parsing errors that still get corrected, formatting issues, analytics mismatch.
  - SLA: 24 hours.
- SEV3 (Low): Copy tweaks, UX polish, edge cases with minimal impact.
  - SLA: weekly batch.

Incident Record Template
- Incident ID
- Date/time detected (UTC/local)
- Client/location
- Impacted appointment(s)
- Description
- Severity
- Root cause hypothesis
- Immediate mitigation taken
- Customer/client communication sent (yes/no + copy)
- Fix applied (commit/version)
- Verification steps + result
- Postmortem notes / prevention rule

Verification Checklist (close criteria)
- Repro steps documented
- Fix confirmed in a controlled test
- No regression in adjacent flows (confirm/reschedule/stop)
- Analytics counters remain consistent

3) RULE-BASED OVERRIDES (FOR HIGH-CONFIDENCE REPLY PARSING)
Use deterministic overrides before AI intent classification when keyword match confidence is high.
- OPT-OUT: STOP, UNSUBSCRIBE, CANCEL SUBSCRIPTION, END, QUIT
  Action: set opt_out=true; confirm opt-out; suppress future messages.
- HELP: HELP, SUPPORT
  Action: send help message with contact email agent_bob_replit+no-show-bot@agentmail.to and brief instructions.
- CONFIRM: YES, Y, CONFIRM, OK, K, SURE
  Action: confirm appointment if still scheduled.
- DECLINE: NO, N, CAN’T, CANT, WON’T
  Action: move to cancel/reschedule prompt.
- RESCHEDULE: RESCHEDULE, MOVE, CHANGE TIME, DIFFERENT TIME
  Action: initiate reschedule flow.
If override triggers but calendar state is unknown or write fails => escalate to owner and send holding message.

4) PILOT KICKOFF EMAIL (CLIENT-FACING, READY TO SEND)
Subject: Pilot kickoff — reduce appointment no-shows with two-way SMS confirmations

Hi {{OwnerName}},

Thanks for agreeing to a short pilot of our Appointment No-Show Reducer. Here’s the overview and what we need to start.

What this does (simple): we send smart SMS reminders, collect confirmations/replies, automate reschedules, and (optionally) fill last-minute gaps from a waitlist. You’ll also receive a weekly report quantifying confirmations, reschedules, and estimated recovered revenue.

Legitimacy link (overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

To launch, please reply with:
1) Location name + timezone
2) Reminder timing preference (example: 24h + 2h before)
3) Your reschedule rules (how late is allowed, and what days/hours)
4) Average appointment value (or revenue per visit) and a rough no-show rate estimate (for baseline)
5) Confirmation that you have consent to text your clients/patients for appointment-related reminders (standard practice for most scheduling systems)

Opt-out/consent note (important):
- Every message includes opt-out language. If a customer replies STOP/UNSUBSCRIBE, we immediately stop all future messages.

Once we have the above, we can go live within 24–48 hours and monitor daily during the first week.

Thanks,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to

5) WEEKLY VALUE REPORT: DATA DICTIONARY + CALCULATION RULES
Purpose: produce consistent sales proof and reduce churn by quantifying value.

Core Counts (weekly)
- Total reminders sent
- Unique customers messaged
- Confirmations received (# and % of appointments)
- Declines/cancellations received
- Reschedule requests received
- Successful reschedules completed
- Opt-outs (count)
- Waitlist invites sent
- Waitlist fills completed
- Manual escalations to owner (count) + reason breakdown

Baseline Inputs (captured once at pilot start)
- Average appointment value (AAV) in $ (or gross profit per visit if available)
- Historical no-show rate (HNSR) for last 4 weeks (percentage)
- Weekly appointment volume (WAV)

Outcome Metrics (weekly)
- Pilot no-show rate (PNSR) = no-shows / total scheduled
- Delta no-show rate = HNSR − PNSR
- Estimated recovered appointments = WAV * (HNSR − PNSR)
- Estimated recovered revenue = Estimated recovered appointments * AAV

Conservative Option (recommended for credibility)
- If PNSR is not reliably measurable in week 1, use “Confirmed appointments” as leading indicator:
  - Leading indicator recovered revenue = Confirmations received * AAV * 0.25
  (0.25 is a conservative attribution factor; adjust only with evidence.)

Report Notes
- Always disclose assumptions (AAV, baseline window, attribution factor).
- Include top 3 outcomes and top 1–2 issues/next fixes to show active management.

End of runbook.
