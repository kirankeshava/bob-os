# 48-Hour Internal QA Simulation Kit + Defect Log + Pilot Monitoring SOP (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:31:28.757Z

---

Below is a ready-to-execute internal QA simulation kit for the Appointment No-Show Reducer (SMS + two-way confirmations + reschedules + waitlist). Use this before and during the first 2–3 concierge pilots to surface edge cases early and ensure we can quantify outcomes.

LEGITIMACY LINKS (include in any client comms during pilots)
- Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to

A) SYNTHETIC SIMULATION DATASET (12 APPOINTMENTS)
Assumptions:
- Location A timezone: America/New_York
- Location B timezone: America/Los_Angeles
- Reminder schedule: T-24h and T-2h for confirmations. If “NO” or “RESCHEDULE”, trigger reschedule flow.
- Waitlist: if slot opens <24h, offer slot to waitlist in priority order.

Table fields: ApptID | Location | TZ | Start (local) | Patient | Phone | Status baseline | Notes
1 | A | ET | Tue 10:00 | Alex P | +1-555-0101 | Scheduled | Standard confirm YES
2 | A | ET | Tue 10:30 | Bri Q | +1-555-0102 | Scheduled | Replies “yep” (intent YES)
3 | A | ET | Tue 11:00 | Cam R | +1-555-0103 | Scheduled | Replies “No” (intent NO -> cancel + waitlist)
4 | A | ET | Tue 11:30 | Dee S | +1-555-0104 | Scheduled | Replies “Reschedule” -> propose 3 options
5 | A | ET | Tue 12:00 | Eli T | +1-555-0105 | Scheduled | Replies “STOP” at T-24h
6 | A | ET | Tue 12:30 | Fay U | +1-555-0106 | Scheduled | Replies “HELP”
7 | B | PT | Wed 09:00 | Gio V | +1-555-0201 | Scheduled | Late confirm at T-15m
8 | B | PT | Wed 09:30 | Hal W | +1-555-0202 | Scheduled | Two-message thread: “Can’t” then “tomorrow?”
9 | B | PT | Wed 10:00 | Ian X | +1-555-0203 | Scheduled | Double-book attempt (existing appt same provider/time)
10 | B | PT | Wed 10:30 | Jan Y | +1-555-0204 | Scheduled | Calendar API failure during reschedule
11 | A | ET | DST edge | Sun 01:30 | Kim Z | +1-555-0107 | Scheduled | DST transition handling (local time ambiguity)
12 | B | PT | Fri 16:00 | Lee A | +1-555-0205 | Scheduled | Waitlist fill: slot opens <6h; offer to 2 waitlist entries

Waitlist sample (Location A):
- WL1: +1-555-0111 Pat 1, preferred Tue 11:00–14:00
- WL2: +1-555-0112 Pat 2, preferred Tue 10:00–12:00
Waitlist sample (Location B):
- WL1: +1-555-0211 Pat 3, preferred Wed 09:00–11:00
- WL2: +1-555-0212 Pat 4, preferred Fri 15:00–17:00

B) 48-HOUR QA TEST SCRIPT (STEP-BY-STEP)
Run window: simulate reminders and inbound replies. Capture logs for each step (message content, timestamps, threading, state changes).

Global pass criteria (must pass):
1) Timezone correctness: all outgoing timestamps and “Your appointment is at …” reflect location TZ.
2) Opt-out compliance: “STOP” results in immediate confirmation of opt-out and no further messages.
3) Threading: multiple replies from same number update the same appointment thread unless patient explicitly references a different date/time.
4) Reschedule safety: no double-booking; reschedule only to open slots.
5) Fail-safe: any calendar/API error triggers owner alert and pauses automated changes to avoid data corruption.

Scenario 1 (YES confirmation): ApptID 1
- Trigger T-24h reminder.
- Expected SMS copy includes appointment time (ET), business name, and reply options.
- Simulate reply: “YES”.
- Expected: Status -> Confirmed; send confirmation acknowledgement.

Scenario 2 (fuzzy YES): ApptID 2
- Simulate reply: “yep”.
- Expected: Intent parsed as YES (rule-based override). Confirmed.

Scenario 3 (NO + waitlist fill): ApptID 3
- Simulate reply: “No”.
- Expected: Appt canceled (or marked needs-cancel if policy). Slot opened.
- Trigger waitlist offer to WL entries matching time window.
- Expected: WL1 gets offer; if WL1 replies YES within X minutes, book slot; if no response, offer WL2.

Scenario 4 (RESCHEDULE flow): ApptID 4
- Reply: “RESCHEDULE”.
- Expected: bot asks for preferred day/time or offers 3 slots.
- Reply: “tomorrow morning”.
- Expected: propose valid slots; on selection, update calendar + confirm new time.

Scenario 5 (STOP): ApptID 5
- Reply: “STOP”.
- Expected: opt-out logged; send “You’re opted out…”; future reminders suppressed.

Scenario 6 (HELP): ApptID 6
- Reply: “HELP”.
- Expected: send support guidance + support email agent_bob_replit+no-show-bot@agentmail.to and/or business phone if configured; do not change appointment state.

Scenario 7 (late confirmation): ApptID 7
- Trigger T-2h reminder; no response.
- At T-15m reply “YES”.
- Expected: still confirm (unless business rule blocks late confirms); ensure no duplicate reminders are sent afterward.

Scenario 8 (multi-message intent): ApptID 8
- Reply 1: “Can’t” (ambiguous; should classify as NO/RESCHEDULE request).
- Expected: bot asks “Do you want to reschedule?” with quick replies.
- Reply 2: “tomorrow?”
- Expected: treat as reschedule request; offer slots.

Scenario 9 (double-book prevention): ApptID 9
- Attempt reschedule to a slot already occupied (simulate provider busy).
- Expected: system rejects slot and offers alternatives; no calendar overwrite.

Scenario 10 (calendar API failure fail-safe): ApptID 10
- During reschedule confirm step, simulate calendar write failure.
- Expected: (a) user gets “We’re having trouble updating—someone will confirm shortly”, (b) owner alert triggered with ApptID, patient, attempted new time, error payload, (c) appointment remains unchanged until manual resolution.

Scenario 11 (DST edge): ApptID 11
- Validate that reminder schedules are computed using timezone-aware datetimes.
- Expected: no reminder sent at wrong hour; appointment time displayed accurately; if time ambiguous, add disambiguation or avoid scheduling at ambiguous local times.

Scenario 12 (waitlist fill under 6h): ApptID 12
- Simulate cancellation 5 hours before.
- Expected: immediate waitlist offer with clear response window; on YES, book and notify both parties.

C) MESSAGE QUALITY CHECK (QUICK RUBRIC)
For every outbound SMS, verify:
- Clarity: time/date, location name, and what to reply.
- Compliance: opt-out text at least once in initial thread (“Reply STOP to opt out”).
- Brevity: <= 320 chars preferred.
- Tone: neutral, professional, non-salesy.
- Thread safety: does not leak details of other patients.

D) DEFECT / BUG LOG TEMPLATE (COPY-PASTE)
Fields:
- Defect ID:
- Date/Time found:
- Environment: (internal sim / pilot location name)
- Severity: S0 Critical (compliance/data loss) | S1 High (missed confirmations) | S2 Medium | S3 Low
- Component: timezone | reminders | threading | NLP/intent | opt-out | reschedule | waitlist | calendar integration | analytics
- Steps to reproduce:
- Expected result:
- Actual result:
- Screenshots/log snippets:
- Suspected cause:
- Mitigation (short-term):
- Fix owner:
- Verification steps (how we’ll confirm fixed):
- Status: Open / In progress / Mitigated / Fixed / Verified

E) DAILY PILOT MONITORING SOP (CONCIERGE)
Run once daily per pilot location (10–15 minutes):
1) Delivery health: confirm reminder sends succeeded; check for spikes in failed deliveries.
2) Opt-out audit: verify STOP requests were honored within minutes; ensure no further sends.
3) Reply handling audit: sample 10 replies; confirm correct classification (YES/NO/RESCHEDULE/HELP/Other). Flag any ambiguous phrases for rule-based overrides.
4) Calendar integrity: verify reschedules actually wrote to calendar; check for duplicates or overlaps.
5) Incident review: any calendar/API errors must have created an owner alert + been logged as S0/S1.
6) Metrics snapshot (daily): reminders sent, confirmations, reschedules completed, cancellations, waitlist offers, waitlist fills.
7) Client comms: if any S0/S1 incident occurred, email the owner same day with summary and next steps; reference our site for legitimacy if needed: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

This kit is designed so we can run an internal 48-hour simulation, generate a real defect list, and enter pilot #1 with proven fail-safes, cleaner reply parsing, and credible weekly outcome metrics.