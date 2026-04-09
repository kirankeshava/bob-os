# Internal QA Simulation Pack + Bug Log + Baseline/Report Client Emails (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:18:10.050Z

---

Below is a ready-to-run internal QA simulation pack for the Appointment No-Show Reducer (SMS + Two-Way Confirmations). It is designed to catch edge cases before 2–3 pilots go live and to ensure outcomes are measurable.

LEGITIMACY + SUPPORT (use in all client comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to

A) SIMULATION DATASET (synthetic)
Assumptions:
- Pilot Location A timezone: America/New_York
- Business hours: Mon–Fri 9:00–17:00
- Reminder rules (initial): T-24h and T-2h; send only 9:00–19:30 local.
- Confirmation keywords: YES/Y/CONFIRM; NO/N/CANCEL; RESCHEDULE/RS; STOP/UNSUBSCRIBE; HELP.

Test patients (name / phone / notes)
P01 Jamie Lee / +15550000001 / straightforward confirmer
P02 Taylor Kim / +15550000002 / late confirmer (within 1h)
P03 Morgan Patel / +15550000003 / asks to reschedule
P04 Casey Nguyen / +15550000004 / opt-out STOP
P05 Jordan Smith / +15550000005 / ambiguous reply “k” then “yes”
P06 Riley Chen / +15550000006 / typo “YESS”
P07 Sam Rivera / +15550000007 / negative “can’t make it”
P08 Alex Brooks / +15550000008 / requests different day/time explicitly
P09 Quinn Davis / +15550000009 / reply after appointment time (no-show follow-up)
P10 Avery Park / +15550000010 / messages HELP
P11 Drew Wilson / +15550000011 / double-book attempt scenario
P12 Cameron Fox / +15550000012 / waitlist fill candidate

Appointments (ID / patient / start local / duration / provider / service / value)
A-101 / P01 / Tue 10:00 / 30m / Dr A / Consult / $150
A-102 / P02 / Tue 16:30 / 30m / Dr A / Follow-up / $100
A-103 / P03 / Wed 09:30 / 60m / Dr B / Treatment / $250
A-104 / P04 / Wed 14:00 / 30m / Dr A / Consult / $150
A-105 / P05 / Thu 11:00 / 30m / Dr A / Follow-up / $100
A-106 / P06 / Thu 18:15 / 30m / Dr B / Consult / $150 (after hours edge)
A-107 / P07 / Fri 09:00 / 30m / Dr A / Consult / $150
A-108 / P08 / Fri 15:30 / 60m / Dr B / Treatment / $250
A-109 / P09 / Mon 10:30 / 30m / Dr A / Follow-up / $100
A-110 / P10 / Mon 13:00 / 30m / Dr A / Consult / $150
A-111 / P11 / Tue 10:00 / 30m / Dr A / Consult / $150 (same slot as A-101 = double-book test)
A-112 / P12 / Tue 11:30 / 30m / Dr A / Follow-up / $100 (waitlist candidate)

Special timing edge cases to include in simulation run:
1) DST/timezone: repeat the dataset with Location B set to America/Phoenix and confirm reminder send times are local and don’t shift unexpectedly.
2) Quiet hours: any reminder that would be sent outside allowed window must be deferred to next allowed time.
3) Threading: each appointment should maintain message context; replies for A-103 should not accidentally confirm A-105.

B) EXECUTABLE QA TEST SCRIPT (step-by-step)
For each test below: record (i) outbound message content quality, (ii) inbound reply classification, (iii) resulting state changes (confirmed/cancelled/reschedule requested), (iv) calendar update behavior, (v) any owner alerting.

Test 1: Basic confirmation
- Trigger: Send T-24h reminder for A-101 to P01.
- Expected outbound: includes business name, appointment date/time in local TZ, simple YES/RESCHEDULE/STOP options.
- Reply: “YES”.
- Expected: mark confirmed; no additional reminders or send only T-2h “See you soon” (config-dependent); log confirmation.
PASS if confirmation recorded + no further action required.

Test 2: Late confirmation near appointment
- Trigger: T-2h reminder for A-102 to P02.
- Reply at T-45m: “Yes”.
- Expected: mark confirmed; do NOT propose reschedule; no owner alert.
PASS if still treated as valid confirmation and shown in analytics.

Test 3: Reschedule request loop prevention
- Trigger: T-24h reminder for A-103 to P03.
- Reply: “RESCHEDULE”.
- System action: send reschedule options (at least 2–3 slots) OR ask for preferred times.
- Reply: “tomorrow morning”.
- Expected: propose nearest matching slots; once a slot selected, update calendar, cancel old slot.
- Loop test: patient replies again “reschedule” after new slot proposed.
- Expected: system recognizes in-progress reschedule thread; does not create multiple parallel reschedules.
PASS if exactly one active reschedule thread and one final booked slot.

Test 4: Opt-out compliance
- Trigger: any reminder to P04 (A-104).
- Reply: “STOP”.
- Expected: immediately mark opted-out; send confirmation of opt-out (one message); no further messages ever.
- Regression: attempt to send T-2h reminder.
PASS if blocked + logged as opt-out.

Test 5: Ambiguous then clarify
- Trigger: reminder A-105 to P05.
- Reply: “k”.
- Expected: treat as unknown; reply with clarification prompt (“Reply YES to confirm or RESCHEDULE”).
- Reply: “yes”.
- Expected: confirm.
PASS if “k” does not auto-confirm.

Test 6: Typo tolerance
- Trigger: reminder A-106 to P06 (18:15).
- Constraint: outbound message must not be sent after 19:30 local; ensure it still sends on schedule.
- Reply: “YESS”.
- Expected: rule-based override: treat as YES (high confidence typo match) OR AI classification must map to confirm.
PASS if confirmed.

Test 7: Negative language
- Trigger: reminder A-107 to P07.
- Reply: “can’t make it”.
- Expected: classify as NO/CANCEL; ask if want to reschedule; free slot created.
PASS if cancellation recorded and slot freed.

Test 8: Explicit alternate time request
- Trigger: reminder A-108 to P08.
- Reply: “Can we do next Monday at 3?”
- Expected: classify as RESCHEDULE; offer closest available; if requested time unavailable, propose alternatives.
PASS if does not confirm original inadvertently.

Test 9: Reply after appointment start (no-show follow-up)
- Trigger: A-109 passes without confirmation and time has passed.
- Reply from P09: “sorry I missed it can I reschedule”.
- Expected: classify as RESCHEDULE; do not mark as confirmed; create follow-up workflow; optionally tag as no-show prevented? (should be no-show occurred, but recovered opportunity).
PASS if system state consistent.

Test 10: HELP keyword
- Trigger: reminder A-110 to P10.
- Reply: “HELP”.
- Expected: send help message with support email agent_bob_replit+no-show-bot@agentmail.to and brief instructions; do not change appointment state.
PASS if help sent and state unchanged.

Test 11: Double-booking prevention
- Setup: A-101 and A-111 same provider/time.
- Expected: system detects conflict; either blocks creation of A-111 or flags it.
- If both exist: confirmations must not override and must alert owner.
PASS if conflict identified and owner notified with actionable detail.

Test 12: Calendar API failure fail-safe
- Simulate: calendar update fails during reschedule for A-103.
- Expected: send patient a polite “We’re confirming a new time; we’ll follow up shortly” message; alert owner immediately with error + manual fix steps; do NOT send duplicate confirmations.
PASS if owner alert triggered and patient not misled.

Test 13: Waitlist fill
- Trigger: A-107 cancelled (from Test 7) creates open slot Fri 09:00.
- Waitlist contains P12 (A-112) who prefers mornings.
- Expected: system offers slot to P12; if P12 replies YES within window, books slot; if no response, offer next waitlist person (not in dataset).
PASS if slot filled and logged as waitlist fill.

C) BUG/INCIDENT LOG TEMPLATE (CSV-ready)
Columns:
- timestamp_utc
- location_id
- test_case_id
- severity (S0 Critical / S1 High / S2 Medium / S3 Low)
- component (SMS outbound / reply parsing / calendar sync / analytics / opt-out / threading)
- steps_to_reproduce
- expected_result
- actual_result
- screenshots_or_message_ids
- mitigation_workaround
- owner_alert_sent (Y/N)
- fix_owner
- status (Open/In Progress/Fixed/Verified)
- verified_by
- verified_timestamp_utc

Severity rubric:
- S0: could cause illegal messaging (opt-out failure), wrong patient data disclosure, or double-booking that disrupts schedule.
- S1: missed confirmations/reschedules, calendar not updating, or silent failures without alert.
- S2: copy/UX issues, minor analytics mismatch.
- S3: cosmetic.

D) CLIENT EMAILS (ready to send; references legitimacy URL + support email)

Email #1: Week-0 Baseline Request (send after pilot agrees, before go-live)
Subject: Quick baseline request to measure no-show reduction (Pilot)

Hi {{OwnerName}},

To make sure our pilot proves measurable results, can you reply with 3 baseline numbers from the last 4 weeks (estimate is fine):
1) Total appointments scheduled per week (avg)
2) Typical no-shows per week (avg) OR no-show rate (%)
3) Average appointment value ($) (or your best estimate)

We’ll use this to calculate recovered revenue during the pilot and include it in a simple weekly report.

For reference, our product overview is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
If you have any questions, email us anytime at agent_bob_replit+no-show-bot@agentmail.to.

Thanks,
Bob Smith
Appointment No-Show Reducer


Email #2: Week-1 Value Report Delivery (send every Monday)
Subject: Your weekly no-show reduction report (Week {{WeekNumber}})

Hi {{OwnerName}},

Here’s your weekly pilot report for {{LocationName}} ({{WeekStart}}–{{WeekEnd}}):

1) Outcomes
- Appointments messaged: {{ApptsMessaged}}
- Confirmed by SMS: {{ConfirmedCount}} ({{ConfirmedRate}}%)
- Reschedules completed: {{RescheduledCount}}
- Cancellations captured in advance: {{CancelledCount}}
- Waitlist fills: {{WaitlistFills}}

2) Estimated recovered revenue
- Baseline no-shows/week: {{BaselineNoShows}}
- No-shows this week: {{ThisWeekNoShows}}
- No-shows avoided: {{NoShowsAvoided}}
- Avg appt value: ${{AvgValue}}
- Estimated revenue recovered: ${{RecoveredRevenue}}

3) Notes / incidents
- Any delivery/parsing/calendar issues: {{IncidentSummary}}
- Fixes applied (if any): {{FixSummary}}

If you want to adjust reminder timing or the reschedule rules, reply here and we’ll update it.

Product reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob Smith
Appointment No-Show Reducer

E) MINIMUM PASS CRITERIA BEFORE FIRST LIVE PILOT
- 100% pass on STOP/opt-out (Tests 4) and HELP (Test 10)
- Threading accuracy: replies apply to correct appointment (no cross-confirm)
- Calendar update safety: reschedule/cancel operations are idempotent (no duplicates)
- Fail-safe alerting: calendar/API failure triggers owner alert + patient-safe message
- Analytics integrity: counts in report match event logs for each test case

This pack is intended to be run in ~2–4 hours end-to-end and then repeated once in a second timezone (e.g., America/Phoenix) to validate timezone/DST handling before onboarding real pilot locations.