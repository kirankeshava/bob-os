# 48-Hour Pilot QA Simulation Script + Monitoring & Client Comms Pack (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:59:22.886Z

---

Below is a ready-to-execute internal QA simulation script and pilot monitoring/comms pack for the Appointment No-Show Reducer (SMS + two-way confirmations). Use this during pilot onboarding and again whenever integrations or rules change.

Legitimacy URL to share with clients: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/Contact email: agent_bob_replit+no-show-bot@agentmail.to

-------------------------------------------------------------------
A) 48-HOUR INTERNAL QA SIMULATION SCRIPT (STEP-BY-STEP)
Goal: Validate reliability and measurable outcomes before scaling beyond 2–3 pilots.

Pre-req setup (30 minutes)
1) Create a test location profile:
   - Location timezone: (Test A) America/New_York, (Test B) America/Phoenix, (Test C) Europe/London
   - Business hours: 9am–5pm local
   - Reminder schedule: 24h + 2h before appointment
   - Confirmation rules: “Reply YES to confirm, NO to cancel, R to reschedule.”
   - Opt-out language included in first message: “Reply STOP to opt out.”
   - Escalation contact (internal): owner email/SMS (for pilots, use agent_bob_replit+no-show-bot@agentmail.to as stand-in)
2) Seed synthetic appointments:
   - 6 appointments/day for next 2 days per test location
   - Include at least: same-day appointment, early morning, late afternoon, and one appointment on DST boundary scenario (simulate by changing system clock or using an appointment date near DST change)
3) Ensure logging is enabled:
   - Event log must capture: reminder_sent, reply_received, intent_classified, confirmation_recorded, reschedule_requested, reschedule_completed, cancellation_recorded, waitlist_offer_sent, waitlist_filled, opt_out_recorded, delivery_failed, integration_error, escalation_sent.

Defect logging format (use for every anomaly)
- Defect ID:
- Date/time observed:
- Test location/timezone:
- Steps to reproduce:
- Expected result:
- Actual result:
- Severity: Sev1 (critical), Sev2 (major), Sev3 (minor)
- Workaround/mitigation:
- Owner notified? (Y/N)


TEST BLOCK 1 — Timezone & DST correctness (Sev1)
1.1 Create appointment at 10:00am local time for each timezone.
Expected:
- 24h reminder sends at 10:00am local time (previous day).
- 2h reminder sends at 8:00am local time (same day).
Pass/Fail:
- FAIL if any reminder fires in the wrong local time window (>10 minutes drift) or uses wrong timezone label.

1.2 DST edge simulation (if feasible): create appointment on DST transition date/time.
Expected:
- Reminders still send at correct local wall time.
- No duplicate reminders.


TEST BLOCK 2 — Two-way confirmations & threading (Sev1)
2.1 After first reminder, reply “YES”.
Expected:
- System classifies intent=CONFIRM (rule-based override).
- Confirmation is recorded against correct appointment.
- Thread continues; no new unrelated thread created.
- Customer receives a confirmation acknowledgment.

2.2 Reply variations:
- “Yes”, “Y”, “Yep”, “confirm”, “OK”, “k”
Expected:
- All map to CONFIRM with high confidence and never to RESCHEDULE/CANCEL.

2.3 Multi-appointment threading test:
- Same phone number has two appointments on different days.
- Reply “YES” after receiving reminder for appointment #2.
Expected:
- Confirmation links to appointment #2 (most recent reminder) and does not mistakenly confirm appointment #1.


TEST BLOCK 3 — Reschedule loops & double-book prevention (Sev1)
3.1 Reply “R” or “RESCHEDULE”.
Expected:
- System asks for preferred times OR sends reschedule link/workflow.
- Appointment is not canceled until reschedule is successfully completed (fail-safe).

3.2 Attempt reschedule to an already-booked slot.
Expected:
- Slot rejected; alternative times offered.
- No double-book event occurs.

3.3 Reschedule loop prevention:
- User replies “R” repeatedly, then goes silent.
Expected:
- System does not spam.
- After N attempts/timeouts, escalates to owner/concierge: “Reschedule pending; manual follow-up needed.”


TEST BLOCK 4 — Opt-out, HELP, compliance (Sev1)
4.1 Reply “STOP”.
Expected:
- Immediate opt_out_recorded.
- Confirm opt-out message sent.
- No further reminders for that phone number.

4.2 Reply “UNSTOP” or “START” (if supported).
Expected:
- If supported, re-consent flow required; otherwise instruct to contact office.

4.3 Reply “HELP”.
Expected:
- Respond with business identity + support email: agent_bob_replit+no-show-bot@agentmail.to
- No change to appointment status.


TEST BLOCK 5 — Delivery failures & error handling (Sev1/Sev2)
5.1 Simulate SMS delivery failure (use invalid test number or provider sandbox failure).
Expected:
- delivery_failed logged.
- Escalation sent to owner within SLA (e.g., 15 minutes): “SMS failed; call patient manually.”

5.2 Calendar API failure simulation:
- Temporarily revoke calendar permissions or mock API error.
Expected:
- integration_error logged.
- System stops automated changes that could corrupt schedule.
- Owner alert fired with clear action: “Reconnect calendar or switch to manual confirmation for next 24h.”


TEST BLOCK 6 — Waitlist fill (Sev2)
6.1 Cancel an appointment (reply “NO” or “CANCEL”).
Expected:
- Slot becomes available.
- Waitlist_offer_sent to top waitlist candidates.
- First YES claimant gets slot; others notified slot filled.
- waitlist_filled recorded.


TEST BLOCK 7 — Analytics integrity (Sev2)
7.1 Verify event counts match reality:
- confirmations = number of confirmed appointments
- reschedules = number of appointments moved to a new time
- cancellations = number canceled
- opt-outs = number opted out
7.2 Estimated recovered revenue/week logic (sanity check):
- recovered_revenue = (confirmed_saves + reschedule_saves + waitlist_fills) * avg_appointment_value
Expected:
- No negative values.
- No double-counting a single appointment as both confirmed_save and reschedule_save unless policy explicitly allows.

-------------------------------------------------------------------
B) DAILY PILOT MONITORING + ALERTING CHECKLIST (CONCIERGE MODE)
Run daily for each pilot location (10 minutes/location).

Daily checks
1) Message delivery health:
   - Any delivery_failed events in last 24h?
   - If yes: list patients, appointment times, and notify location.
2) Opt-out compliance:
   - Ensure STOP replies recorded and no subsequent outbound sent.
3) Threading correctness:
   - Spot-check 5 conversations: replies mapped to correct appointment.
4) Reschedule pending queue:
   - Any reschedules not completed within 2 hours?
   - Escalate to location for manual follow-up.
5) Calendar sync health:
   - Any integration_error or auth warnings?
   - If yes (Sev1): switch to “read-only/no-auto-update mode” if available and alert location.
6) KPI snapshot (daily):
   - reminders_sent, replies_received, confirmations, reschedules, cancellations, waitlist_fills.

Red-flag thresholds (trigger immediate escalation)
- Sev1: Calendar API failure, sending reminders at wrong local time, opt-out ignored, double-book created.
- Sev2: >3% delivery failures/day, repeated misclassification of YES/NO intents, reschedule loop causing spam.

Escalation template (internal)
Subject: [Pilot Alert][SevX] <Location> — <Issue>
Body: What happened, impact (patients/appointments affected), immediate mitigation, next steps, and time of next update.

-------------------------------------------------------------------
C) CLIENT COMMUNICATION PACK (READY TO SEND)

C1) Day-0 Pilot Kickoff Email (to location owner/manager)
Subject: Pilot kickoff — reduce no-shows with 2-way SMS confirmations (Week 1)
Hi <Name>,

Thanks for joining the Appointment No-Show Reducer pilot. Starting <Go-Live Date>, we’ll send smart SMS reminders and collect two-way confirmations, automate reschedules, and attempt to fill canceled slots from your waitlist.

What you can expect in Week 1:
- Patients receive reminders 24h and 2h before the appointment (local time).
- Patients can reply YES to confirm, NO to cancel, or R to reschedule.
- Reply STOP opts them out immediately.
- We’ll send you a weekly value report with confirmations, reschedules, waitlist fills, and estimated recovered revenue.

Legitimacy link (for your team):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Please reply “APPROVED” confirming:
1) Your reminder timing rules are correct.
2) Your opt-out/consent workflow is acceptable.
3) Your escalation contact for urgent issues is: <phone/email>.

Thanks,
Bob Smith


C2) Day-1 Check-in Email
Subject: Pilot check-in (Day 1) — confirmations + any issues?
Hi <Name>,

Quick Day-1 check-in. We’re monitoring delivery, confirmations, reschedules, and opt-outs.

Two questions:
1) Any patient complaints or confusion about the wording?
2) Any scheduling edge cases we should account for (multi-provider, walk-ins, or special services)?

We’ll send your first weekly value report on <Monday Date>.
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob Smith


C3) Incident Notification Email (when something breaks)
Subject: Action required — SMS reminder issue detected (we’re on it)
Hi <Name>,

We detected an issue that may impact reminders/reschedules for <Location>.

What happened: <plain-English description>
When: <timestamp + timezone>
Impact: <# patients / appointments affected>
What we’re doing now: <mitigation>
What we need from you (if anything): <action>

We’ll send an update by <time>.
Support: agent_bob_replit+no-show-bot@agentmail.to
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Thanks,
Bob Smith


C4) Week-1 Value Report Cover Email (send with metrics table)
Subject: Week 1 results — confirmations, saves, and recovered revenue estimate
Hi <Name>,

Here’s your Week 1 pilot value report for <Location>. Summary:
- Confirmation rate: <X%>
- Reschedules completed: <N>
- Waitlist fills: <N>
- Estimated recovered revenue: $<amount> (based on your avg appointment value)

If you reply with your latest avg appointment value (or revenue per appointment), we can tighten the recovered revenue estimate.

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob Smith

-------------------------------------------------------------------
Execution note: Once pilot #1 is identified, run Test Blocks 1–5 immediately (within 48 hours), then keep Blocks 6–7 running in parallel during week 1 to validate waitlist behavior and analytics integrity. Any Sev1 defect pauses automation and triggers owner/location escalation until resolved.