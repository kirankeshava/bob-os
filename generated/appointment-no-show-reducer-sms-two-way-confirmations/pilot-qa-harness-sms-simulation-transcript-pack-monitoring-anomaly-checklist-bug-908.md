# Pilot QA Harness: SMS Simulation Transcript Pack + Monitoring/Anomaly Checklist + Bug List Template + Client Day-1/Week-1 Emails

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:27:10.475Z

---

Below is an operator-ready QA harness to run a 48-hour internal simulation and to monitor real pilots. It is designed for the Appointment No-Show Reducer micro-SaaS (SMS reminders + two-way confirmations + reschedules + waitlist). Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2 | Support: agent_bob_replit+no-show-bot@agentmail.to

A) 48-HOUR SMS SIMULATION TRANSCRIPT PACK (reply → expected classification/action)
Use these as synthetic inbound replies across 3 scenarios: (1) confirm, (2) cancel/reschedule, (3) compliance/support.
1) “YES” → CONFIRM. Mark confirmed. Stop further reminders. Log confirmation timestamp.
2) “Yes.” → CONFIRM.
3) “Y” → CONFIRM (keyword override).
4) “Yep” → CONFIRM.
5) “Confirmed” → CONFIRM.
6) “No” → DECLINE/CANCEL. Trigger reschedule offer flow (if enabled) OR notify staff.
7) “NOPE” → DECLINE/CANCEL.
8) “Can’t make it” → RESCHEDULE INTENT. Offer 2–3 alternative times or link.
9) “Need to reschedule” → RESCHEDULE INTENT.
10) “Resched” → RESCHEDULE INTENT (typo tolerance).
11) “Tomorrow works” (when asked to pick time) → SELECTED SLOT. Attempt calendar update; if conflict, offer next available.
12) “Anytime after 3” → RESCHEDULE PREFERENCE. Respond with matching slots.
13) “What time is it again?” → INFO REQUEST. Reply with appointment date/time, address, phone.
14) “Who is this?” → IDENTITY/HELP. Provide business name + purpose + opt-out.
15) “STOP” → OPT-OUT. Confirm opt-out. Persist DNC. No further messages.
16) “Unsubscribe” → OPT-OUT.
17) “Please stop texting me” → OPT-OUT.
18) “HELP” → HELP. Provide support email + business phone + opt-out instructions.
19) “Wrong number” → WRONG NUMBER. Apologize, opt-out that number, alert staff to update patient record.
20) “I already cancelled” → CANCEL CONFIRMATION. Mark cancelled if not already; reconcile with calendar.
21) “I’m running late 10 min” → RUNNING LATE. Notify staff (and optionally adjust buffer).
22) “Be there” → CONFIRM.
23) “👍” → CONFIRM (if emoji handling supported; otherwise ask to reply YES/NO).
24) “sí” → CONFIRM (Spanish basic keyword). If unsupported, ask for YES/NO.
25) “No entiendo” → NON-ENGLISH. Provide minimal bilingual prompt or route to staff.
26) “Change to next week” → RESCHEDULE (date shift). Offer next-week options.
27) “Cancel” → CANCEL.
28) “Can my wife take it?” → EDGE: TRANSFER. Route to staff.
29) “I never booked this” → DISPUTE. Apologize, verify identity, route to staff, opt-out if requested.
30) “Yes but might be 5 min late” → CONFIRM + RUNNING LATE. Confirm appointment; notify staff.
31) “No, book me Friday instead” → RESCHEDULE with specified day.
32) “2pm” (ambiguous) → If multiple days, clarify; else select.
33) “Yes 2” (typo) → CONFIRM.
34) “stop pls” → OPT-OUT.
35) “Can you call me?” → REQUEST CALL. Notify staff.

Required PASS/FAIL checks while running transcript pack:
- Threading: each reply must be attached to correct appointment + customer.
- Timezone/DST: all timestamps shown to patient match location timezone.
- Opt-out: STOP/Unsubscribe immediately blocks future sends (including waitlist blasts).
- Reschedule loop: if patient reschedules twice, state remains consistent (no duplicate holds).
- Double-book prevention: any slot selection triggers conflict check; on conflict, offer alternates.
- Calendar failure fail-safe: if calendar write fails, (1) do NOT tell patient it’s booked, (2) alert owner/staff, (3) keep patient in “pending reschedule” state.

B) PILOT MONITORING + ANOMALY DETECTION CHECKLIST (daily)
Run each morning and late afternoon during pilots.
1) Deliverability
- Check: % messages delivered vs failed (carrier errors, invalid numbers).
- Alert threshold: >2% failures/day OR any sudden spike.
- Action: export failed numbers; notify client to verify phone records.
2) Reply handling / classification accuracy
- Check: sample 20 replies/week; confirm intent classification matches expectation.
- Alert threshold: any STOP not honored; >5% misclassification.
- Action: add/adjust rule-based overrides (YES/NO/RESCHEDULE/STOP/HELP/Wrong number).
3) Timezone drift
- Check: reminders sent at intended local times; compare logs to appointment local time.
- Alert threshold: any reminder sent >60 minutes off.
- Action: verify location timezone setting; confirm DST handling.
4) Calendar integrity
- Check: for all reschedules, confirm calendar updated once and only once.
- Alert threshold: any duplicate events, missing updates, or conflicts.
- Action: pause automated reschedules for location; route to staff; open S0/S1 bug.
5) Waitlist behavior
- Check: fills only when true opening exists; respects opt-out.
- Alert threshold: waitlist message sent with no opening OR to opted-out number.
- Action: disable waitlist; investigate eligibility query; open S0 bug.
6) Compliance / Consent
- Check: opt-in language stored; STOP honored; HELP responds with support details.
- Alert threshold: any complaint or opt-out failure.
- Action: immediate mitigation (disable sends for that number/location), inform owner.
7) Incident comms
- SLA: acknowledge within 2 hours business time; resolution/mitigation within 24 hours.
- If calendar API fails: notify client immediately and switch to “notify-only” mode.

C) PILOT BUG LIST TEMPLATE (copy/paste fields)
- Bug ID:
- Date/Time (with timezone):
- Pilot Location:
- Severity: S0 (compliance/data loss) | S1 (booking integrity) | S2 (workflow broken) | S3 (cosmetic/wording)
- Summary:
- Steps to Reproduce:
- Expected Result:
- Actual Result:
- Impact (patients/appointments affected):
- Screenshots/Logs (IDs):
- Temporary Mitigation:
- Owner/Assignee:
- Fix ETA:
- Verification Steps:
- Status: Open/In Progress/Fixed/Verified

D) CLIENT EMAILS (reference legitimacy URL + support inbox)
1) Day-1 “Pilot is Live” email
Subject: Your no-show reduction pilot is live (what to expect this week)
Hi {{OwnerName}},
We’re live for your Appointment No-Show Reducer pilot starting today. You’ll see automated SMS reminders going out based on the timing rules we configured, and patients can reply to confirm or request a reschedule.

What we’ll monitor daily: delivery health, confirmation rates, reschedule handling, opt-outs, and any calendar-update issues. If anything ever prevents a calendar update, we’ll alert you immediately and switch to a safe mode so nothing gets double-booked.

If you’d like to review what this service is and how it works, here’s our legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks—tomorrow I’ll send a quick status note with early counts (sent/delivered/replied/confirmed).
—Bob

2) Week-1 check-in email
Subject: Week 1 check-in: confirmations, reschedules, and recovered revenue estimate
Hi {{OwnerName}},
Quick Week 1 check-in for your pilot. I’ll send your full Weekly Value Report on {{Day}} with: reminders sent/delivered, reply rate, confirmation rate, reschedules saved, waitlist fills (if enabled), and an estimated recovered revenue/week based on your average appointment value.

If you noticed any patient replies that looked misread, forward them to us (or paste the text) and we’ll add a high-confidence rule so it behaves correctly going forward.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

—Bob

End of harness. Next step is to execute the transcript pack against the current build, log outcomes in the bug template, and only then onboard the first concierge pilot to minimize reliability risk.