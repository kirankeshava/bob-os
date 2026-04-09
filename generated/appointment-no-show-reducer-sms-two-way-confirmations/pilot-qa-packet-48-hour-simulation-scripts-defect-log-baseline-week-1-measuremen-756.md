# Pilot QA Packet: 48-hour Simulation Scripts + Defect Log + Baseline/Week-1 Measurement + Escalation Comms

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:09:34.415Z

---

Appointment No-Show Reducer — Pilot QA Packet (Internal + Pilot Ops)
Legitimacy URL (share with clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/Contact: agent_bob_replit+no-show-bot@agentmail.to

1) 48-Hour Internal QA Simulation (Scripts + Synthetic Dataset)
Goal: Validate reliability + message quality + intent parsing + fail-safes before live pilots.

Test Environment Assumptions
- Reminder schedule (example default): T-24h and T-2h reminders; 2-way confirmation enabled.
- Reply intents supported: CONFIRM / CANCEL / RESCHEDULE / HELP / STOP.
- Rule-based overrides (high confidence):
  - CONFIRM: “YES”, “Y”, “CONFIRM”, “OK”, “K”, “I’LL BE THERE”, “SEE YOU THEN”
  - CANCEL: “CANCEL”, “CAN’T”, “WON’T MAKE IT”
  - RESCHEDULE: “RESCHEDULE”, “MOVE”, “CHANGE”, “DIFFERENT TIME”, “LATER”, “TOMORROW”
  - STOP: “STOP”, “UNSUBSCRIBE”, “END” (must immediately opt-out)
  - HELP: “HELP”, “?” (send help text + route to owner if still unclear)

Synthetic Appointment Dataset (20 appointments)
Use three simulated locations:
A) Location A — America/Los_Angeles (PDT/PST)
B) Location B — America/New_York (EDT/EST)
C) Location C — Europe/London (BST/GMT)

Appointments (ID | Loc | Start Local | Patient | Scenario)
01 | A | Mon 09:00 | Pat01 | Confirms immediately “YES”
02 | A | Mon 16:30 | Pat02 | Late confirm after 2nd reminder “Ok”
03 | A | Tue 11:00 | Pat03 | Reschedule request “Can we move to Thursday?”
04 | A | Tue 13:00 | Pat04 | Cancel “I can’t make it, cancel”
05 | A | Wed 08:00 | Pat05 | STOP opt-out “STOP”
06 | A | Wed 17:00 | Pat06 | Ambiguous “maybe” then “yes”
07 | B | Mon 10:00 | Pat07 | Threading: two replies “Yes” then “Actually reschedule”
08 | B | Mon 15:00 | Pat08 | No response (should remain unconfirmed)
09 | B | Tue 09:30 | Pat09 | HELP “?”
10 | B | Tue 18:00 | Pat10 | Reschedule loop: requests time not available
11 | B | Wed 12:00 | Pat11 | Double-book attempt (two appts same slot)
12 | B | Thu 14:00 | Pat12 | Cancel then rebook (waitlist fill candidate)
13 | C | Mon 09:00 | Pat13 | Confirm “CONFIRM”
14 | C | Mon 16:00 | Pat14 | International punctuation “yes.”
15 | C | Tue 11:15 | Pat15 | Non-English edge “sí” (should fall back to AI or ask)
16 | C | Tue 13:45 | Pat16 | Phone typo / wrong number simulation
17 | C | Wed 08:30 | Pat17 | DST edge: schedule around DST change week (validate offsets)
18 | A | Thu 10:00 | Pat18 | Calendar API failure during reschedule
19 | B | Fri 09:00 | Pat19 | Delivery failure (simulated) then retry policy
20 | C | Fri 17:30 | Pat20 | Waitlist fill: cancellation triggers offer to waitlist

Execution Steps (Run in order)
Step 1 — Timezone & DST correctness
- For each location, verify reminder timestamps are computed in local timezone.
- Validate DST appointment (ID 17) produces correct reminder times; no off-by-1-hour.
Pass criteria: All reminders scheduled at correct local times; stored timestamps consistent (UTC ok internally).

Step 2 — Two-way confirmations + threading
- Send reminders for IDs 01,02,07,14.
- Simulate replies:
  - 01: “YES” -> mark confirmed; send confirmation ack.
  - 02: no reply to T-24h; reply “Ok” after T-2h -> mark confirmed.
  - 07: reply “Yes” then 5 min later “Actually reschedule” -> status should end as reschedule-requested; previous confirm must not lock.
  - 14: reply “yes.” -> confirm via rule-based override (strip punctuation).
Pass criteria: Correct final state; all messages remain in single thread; no duplicate acks.

Step 3 — Opt-out compliance
- ID 05 reply “STOP”.
Pass criteria: immediate opt-out confirmation; future reminders suppressed; audit log entry written.

Step 4 — Reschedule handling + availability constraints
- ID 03 reply “Can we move to Thursday?” -> system proposes available slots OR routes to owner if not integrated.
- ID 10 reschedule loop: request “later today” when full -> system offers next available options; prevent infinite loops (max 2 automated offers, then escalate).
Pass criteria: No loop beyond limit; clear user messaging; owner escalation triggered when needed.

Step 5 — Cancel flow + waitlist fill
- ID 04 cancel -> mark canceled; optional cancellation confirmation.
- ID 12 cancel then rebook -> ensure cancellation doesn’t block new booking.
- ID 20 waitlist fill triggered by cancellation -> send offer to waitlist contact; first YES gets slot; prevent double-fill.
Pass criteria: Slot released; only one patient receives slot; audit trail.

Step 6 — Double-booking prevention
- ID 11 create two appointments same start time for Pat11 + Pat11b.
Pass criteria: detection alert + safe handling (do not send conflicting confirmations; escalate to owner).

Step 7 — Error handling / fail-safes
- ID 18 simulate calendar API failure during reschedule.
Pass criteria: patient receives graceful message (“We’re having trouble confirming the new time; we’ll text you shortly”); owner alerted immediately with context.
- ID 19 simulated SMS delivery failure.
Pass criteria: retry policy applied (e.g., 2 retries); if still failing, alert owner.

Step 8 — Analytics instrumentation sanity
For each appointment, ensure events are captured:
- reminder_sent (timestamp, channel)
- reply_received (raw_text, normalized_intent, confidence, override_used yes/no)
- status_change (unconfirmed->confirmed/reschedule/canceled)
- waitlist_offer_sent / accepted
- error_event (type, severity)
Pass criteria: counts match scenarios; weekly rollup can be computed.

2) Bug / Defect Log Template (Copy/Paste)
Fields:
- Defect ID:
- Date/Time Found:
- Found By:
- Environment (internal sim / pilot location):
- Severity (S0 data loss/compliance, S1 revenue-impacting, S2 degraded UX, S3 cosmetic):
- Component (SMS, intent parsing, scheduling, analytics, calendar integration, reporting):
- Summary (1 sentence):
- Steps to Reproduce:
- Expected Result:
- Actual Result:
- Customer Impact (who/what breaks):
- Workaround/Mitigation:
- Owner:
- Status (open/in progress/fixed/verified/won’t fix):
- Fix ETA:
- Verification Steps (exact):
- Verification Result + Date:

3) Baseline + Week-1 Measurement Worksheet Spec (per location)
Inputs (Baseline: last 4 weeks)
- Total scheduled appointments (baseline):
- No-shows (baseline):
- No-show rate baseline = no_shows / scheduled
- Average appointment value ($):
- Average gross margin (optional %):

Week-1 Pilot Inputs
- Total scheduled appointments (week1):
- Confirmed via SMS (count):
- Rescheduled (count):
- Canceled with notice (count):
- Waitlist fills (count):
- No-shows (week1):

Core Metrics
- Confirmation rate = confirmed / week1_scheduled
- No-show rate week1 = week1_no_shows / week1_scheduled
- No-show reduction (pp) = baseline_rate - week1_rate
- Avoided no-shows (est.) = (baseline_rate - week1_rate) * week1_scheduled
- Estimated recovered revenue/week = avoided_no_shows * avg_appointment_value
- Additional recovered revenue from waitlist fills (if treated separately) = waitlist_fills * avg_appointment_value
Notes: If sample size is small, report both absolute counts and rates; include confidence note.

4) Client-Facing Escalation Comms (Owner Alerts + Patient-Friendly Fallbacks)
A) Owner Alert Email (Calendar API failure)
Subject: [Action Needed] Appointment reschedule could not be confirmed (calendar issue)
Body:
Hi — quick heads-up from Appointment No-Show Reducer.
We received a reschedule request but couldn’t confirm the new time due to a calendar/integration error.
- Patient: {{patient_name}}
- Original appt: {{original_time_local}} ({{timezone}})
- Requested: {{requested_time_text}}
- Error: {{error_message}}
Next step: Please reply with an approved new time (or call the patient). We will follow up once you confirm.
Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

B) Patient Fallback SMS (Calendar failure)
“Thanks — we’re having trouble confirming the new time right now. We’ll follow up shortly. If urgent, call {{business_phone}}.”

C) Owner Alert SMS (STOP/Opt-out audit)
“Opt-out processed: {{patient_name}} replied STOP. Future reminders suppressed. (If unexpected, update their contact consent.)”

D) Patient HELP Response
“Reply YES to confirm, NO to cancel, or RESCHEDULE to change the time. Reply STOP to opt out.”

This packet is ready to use for an internal 48-hour simulation and as the operational QA backbone for the first 2–3 live pilots.