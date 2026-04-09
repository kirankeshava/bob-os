# Pilot QA Simulation + Incident Log + Day-0 Client Comms Pack (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:50:44.839Z

---

Below is a ready-to-run package for (1) internal QA simulation, (2) defect/incident logging, and (3) Day-0 client communications for pilots.

=== 1) 48-Hour Internal QA Simulation Script (Executable) ===
Goal: validate reliability and message quality before/while pilots are live. Execute in one sitting (about 2 hours), then re-run after any fix.
Legitimacy URL to reference when needed: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

A. Test Data Setup (Synthetic Appointments)
Create 12 appointments across 2 locations:
Location A timezone: America/New_York
Location B timezone: America/Los_Angeles
For each appointment record include: patient_name, mobile, appt_datetime_local, provider, service, duration, location_id.

Dataset (minimum):
1) NY-1: Tomorrow 9:00 AM local
2) NY-2: Tomorrow 9:15 AM local (tests close spacing)
3) NY-3: Tomorrow 4:00 PM local
4) NY-4: Next Monday 9:00 AM local
5) NY-5: DST boundary case (set to next DST change date if applicable; otherwise simulate by changing timezone offset)
6) NY-6: Today 30 minutes from now (late reminder behavior)
7) LA-1: Tomorrow 9:00 AM local
8) LA-2: Tomorrow 1:00 PM local
9) LA-3: Next Monday 9:00 AM local
10) LA-4: Overlapping slot attempt (same provider as LA-2, same time)
11) LA-5: Cancel scenario
12) LA-6: Waitlist candidate for gap-fill

B. Reminder Schedule Assumptions (for test)
Use simple pilot defaults unless overridden:
- 24h reminder: “Reply YES to confirm, NO to cancel, or R to reschedule.”
- 2h reminder: short confirmation ping.
- If no reply: one final nudge 60 minutes before.
- Quiet hours: no messages outside 8am–8pm local.

C. Reply Parsing Rules (High-confidence overrides)
Treat these as rule-based overrides before any AI parsing:
- Confirm: YES, Y, CONFIRM, OK, K (case-insensitive)
- Cancel: NO, N, CANCEL, CANT, CAN’T
- Reschedule: R, RESCHEDULE, MOVE, CHANGE, LATER, DIFFERENT TIME
- Stop: STOP, UNSUBSCRIBE, END, QUIT
- Help: HELP, INFO
Expected: STOP immediately disables future messages and sends a single compliance acknowledgement.

D. Test Cases + Expected Outcomes Matrix
1) Timezone correctness
Action: schedule NY-1 and LA-1 for “Tomorrow 9AM local”.
Expected: reminders send at correct local times; timestamps in logs reflect location timezone; no cross-timezone drift.

2) DST behavior
Action: run NY-5 and simulate DST offset change.
Expected: reminders continue at correct local clock time; no duplicate reminders caused by offset change.

3) Message threading / conversation continuity
Action: For NY-1 reply “YES”; for LA-1 reply “R”.
Expected: system associates replies to correct appointment, not to any other active appointment for that phone.

4) Multiple upcoming appointments for same phone
Action: use same mobile for NY-1 and NY-3; reply “YES” once.
Expected: system asks clarifying question (“Which appointment are you confirming: 9:00am or 4:00pm?”) OR applies deterministic rule (most imminent) and logs ambiguity.

5) Reschedule loop prevention
Action: for LA-1 reply “R”, then reply “tomorrow afternoon”, then reply “actually next week”.
Expected: system does not spam; it should present allowed options, limit to N attempts, and escalate to owner if ambiguous after 2 back-and-forth messages.

6) Double-booking prevention
Action: attempt to reschedule LA-4 into LA-2 slot (same provider/time).
Expected: system rejects conflicting slot, proposes alternatives, and logs a conflict-prevented event.

7) Opt-out compliance
Action: any user replies STOP.
Expected: immediate opt-out confirmation; no further reminders; opt-out recorded with timestamp; HELP should still respond with minimal info if permitted.

8) Quiet hours
Action: schedule a reminder that would trigger at 7:30am local.
Expected: message is deferred to 8:00am local.

9) Calendar API failure fallback
Action: simulate calendar update failure when confirming/rescheduling.
Expected: user receives safe message: “We’re having trouble updating the calendar right now. We’ve alerted the office and will confirm shortly.” Owner alert is triggered (email to agent_bob_replit+no-show-bot@agentmail.to or configured escalation contact). Incident logged Sev-0 if it blocks confirmations.

10) Duplicate message suppression
Action: trigger same reminder job twice.
Expected: only one message sent; idempotency key prevents duplicates.

11) Waitlist gap-fill
Action: cancel LA-5; there is LA-6 on waitlist.
Expected: system offers newly available slot to waitlist in priority order; if accepted, calendar slot filled and reported as “waitlist fill”.

12) Analytics counters
Action: run through above and ensure events emitted.
Expected: counters increment: reminders_sent, confirmations, cancellations, reschedules_attempted, reschedules_completed, waitlist_offers_sent, waitlist_fills, opt_outs, incidents.

Pass/Fail Rule: Any failure in opt-out, timezone, or calendar failure alerting is automatic Sev-0 and blocks pilot expansion.

=== 2) Incident / Bug Log Template (Copy/Paste Table) ===
Use one row per issue.
Columns:
- ID
- Date/Time (local + UTC)
- Location
- Severity (Sev-0 Blocker / Sev-1 High / Sev-2 Medium / Sev-3 Low)
- Category (Timezone/DST, Threading, Parsing, Calendar, Opt-out, Deliverability, Analytics)
- Summary
- Customer Impact (who/what happened)
- Steps to Reproduce
- Expected Result
- Actual Result
- Suspected Root Cause
- Mitigation/Workaround (immediate)
- Fix Owner
- Fix ETA
- Verification Steps
- Verified? (Y/N) + verified date

Severity guide:
- Sev-0: compliance risk (STOP fail), wrong-time reminders, calendar update fails without alert, duplicate spamming.
- Sev-1: incorrect reply classification that causes wrong action; frequent ambiguity without escalation.
- Sev-2: minor copy issues, occasional delays within quiet-hour rules.
- Sev-3: cosmetic/reporting formatting.

=== 3) Day-0 Client Comms Pack (Email + SMS) ===
A) Pilot Is Live — Owner Email (send after setup)
Subject: Your No-Show Reducer pilot is live (what to expect + support)

Hi {{OwnerName}},

Your Appointment No-Show Reducer pilot is now live for {{LocationName}}.

What will happen starting today:
- Patients will receive reminder texts and can reply to confirm (YES), cancel (NO), or reschedule (R).
- If someone opts out by replying STOP, they will be automatically removed from reminders.
- If we ever can’t update your calendar due to an integration issue, we’ll alert you immediately and fail safely (no guessing).

Support / escalation:
- Email: agent_bob_replit+no-show-bot@agentmail.to
- Legitimacy page (for your team): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Reporting:
Every Monday you’ll receive a simple weekly value report covering confirmations, reschedules saved, waitlist fills, and an estimated recovered revenue range.

Reply to this email with your preferred “owner alert” phone number (for urgent issues), and confirm your business hours + timezone one last time.

— Bob

B) Patient-Facing SMS Templates (compliant defaults)
1) 24h Reminder
“Hi {{FirstName}}—reminder of your {{Service}} at {{BusinessName}} on {{Day}} at {{Time}}. Reply YES to confirm, NO to cancel, or R to reschedule. Reply STOP to opt out.”

2) 2h Reminder
“{{BusinessName}}: See you at {{Time}} today. Reply YES to confirm or R to reschedule. Reply STOP to opt out.”

3) Reschedule prompt (after ‘R’)
“Sure—what day/time works better? Example: ‘tomorrow after 3’ or ‘next Tue morning’. Reply STOP to opt out.”

4) Ambiguous multiple-appointment clarification
“You have more than one upcoming appointment. Reply 1 for {{Appt1Day}} {{Appt1Time}} or 2 for {{Appt2Day}} {{Appt2Time}}. Reply STOP to opt out.”

5) Calendar failure fail-safe
“Thanks—we’re having trouble updating the schedule right now. We’ve alerted the office and will confirm shortly. Reply STOP to opt out.”

6) STOP confirmation
“You’re opted out and will no longer receive texts from {{BusinessName}}. Reply START to re-subscribe.”

C) Internal Owner Alert Email (trigger on Sev-0)
Subject: [URGENT] No-Show Reducer needs attention for {{LocationName}}

Issue: {{ShortSummary}}
Time: {{Timestamp}}
Impact: {{Impact}}
Next step: {{RecommendedAction}}

This is an automated alert. Support: agent_bob_replit+no-show-bot@agentmail.to

=== 4) Outreach Tracker Schema (for recruiting 2–3 pilots) ===
Fields:
- Prospect Name
- Niche (dental, med spa, PT, etc.)
- City/State
- Contact Name/Title
- Email
- Phone
- Source URL
- Status (Not Contacted / Contacted / Interested / Call Booked / Pilot Approved / Live / Week1 Report Sent / Converted)
- Consent collected? (Y/N)
- Timezone
- Baseline received? (Y/N) + baseline no-show rate
- Go-live date
- Notes

This package is designed to be executed immediately: run the QA simulation, log defects in the table, and use the comms pack when a pilot says yes. It also ensures every pilot produces credible weekly proof (confirmations, reschedules, waitlist fills, incidents, and recovered revenue estimates).