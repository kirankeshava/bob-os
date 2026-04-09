# Pilot Test & Monitoring Packet (QA Simulation + Incident Log + Client Comms + Outreach Sequence)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:27:54.819Z

---

Below is a pilot-ready packet you can use immediately to (1) QA the system internally in 48 hours, (2) monitor live pilots daily, and (3) recruit/onboard 2–3 locations with compliant, trust-building comms.

A) 48-HOUR INTERNAL QA SIMULATION (EXECUTABLE)
Goal: Validate reliability + message quality + edge cases before and during pilots.

Setup (30–45 min)
1) Pick 2 simulated locations:
   - Location A: America/New_York (tests DST)
   - Location B: America/Phoenix (no DST)
2) Define reminder schedule (initial pilot default):
   - T-24h: Reminder + confirm
   - T-3h: If unconfirmed, gentle ping + confirm
   - T-60m: If still unconfirmed, final confirm + call-us fallback
3) Define keyword override rules (rule-based wins over AI intent):
   - CONFIRM: YES, Y, YEP, CONFIRM, OK, K, SURE
   - CANCEL: CANCEL, CXL, CAN’T, CANT, WON’T MAKE, NOT COMING
   - RESCHEDULE: RESCHEDULE, MOVE, CHANGE, LATER, DIFFERENT TIME, TOMORROW, NEXT WEEK
   - STOP: STOP, UNSUBSCRIBE, END, QUIT
   - HELP: HELP, INFO, WHO IS THIS
   - Anything else: route to AI intent parsing; if confidence < threshold, escalate to human/owner.

Synthetic appointment set (create 20 appointments total)
For each location, create 10 appointments across the next 3 days:
- 2 same-day appointments
- 3 next-day appointments
- 2 appointments crossing midnight boundaries (e.g., 11:30pm local)
- 2 appointments around DST boundary (if within season, simulate with manual time offset)
- 1 double-book attempt (same staff/time) to verify prevention
Capture fields: appointment_id, customer_name, phone, start_time_local, timezone, service, staff, duration, status.

Test Cases (run in order; log each result)
TC1 Timezone correctness
- Trigger reminders for both locations at the same UTC time.
Expected: Messages reference correct local time; send times match configured schedule per timezone.
Pass/Fail notes: __________________

TC2 DST edge behavior (NY)
- Simulate appointment on DST shift day (or manually adjust system clock/test fixture).
Expected: Reminder times remain consistent in local time; no duplicate sends.
Notes: __________________

TC3 Basic confirmation happy path
- Customer replies “YES”.
Expected: Status set to Confirmed; no further “unconfirmed” nudges; confirmation acknowledgment sent.
Notes: __________________

TC4 Typo/variant confirmation
- Customer replies “yep”, “Ok”, “K”.
Expected: Rule-based override confirms.
Notes: __________________

TC5 Cancel flow
- Customer replies “cancel”.
Expected: Status set to Canceled; cancellation acknowledgment; optional waitlist trigger if enabled.
Notes: __________________

TC6 Reschedule loop prevention
- Customer replies “reschedule”. Then replies with ambiguous options “later”, then gives a day.
Expected: System requests new time; if more than N back-and-forth (recommend N=4), escalate to owner/staff instead of looping.
Notes: __________________

TC7 STOP compliance
- Customer replies “STOP”.
Expected: Immediate opt-out confirmation; no further messages ever; opt-out logged with timestamp.
Notes: __________________

TC8 HELP compliance
- Customer replies “HELP”.
Expected: Sends support info including: business legitimacy URL + support email.
Use:
Legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to
Notes: __________________

TC9 Message threading / multiple appointments
- Same phone has two appointments in one week; reply “YES” once.
Expected: System clarifies which appointment or confirms the nearest upcoming appointment correctly; no cross-linking errors.
Notes: __________________

TC10 Duplicate booking prevention
- Attempt to reschedule into an already-booked slot.
Expected: System rejects and offers alternatives; never creates double-book.
Notes: __________________

TC11 Calendar API failure fail-safe
- Simulate calendar update failure (disconnect token / mock error).
Expected: Owner alert sent within SLA (e.g., <5 minutes) with appointment details; customer gets safe fallback message (“We’re checking availability; we’ll confirm shortly.”). No silent failure.
Notes: __________________

TC12 Rate limiting / retry behavior
- Force transient send error.
Expected: Retries with backoff; if exhausted, owner alert + log.
Notes: __________________

Exit criteria (48-hour simulation complete)
- 0 critical defects open.
- All STOP/HELP compliance tests pass.
- Timezone/DST accuracy verified for both sample locations.
- Calendar failure generates an owner alert and safe customer fallback.


B) DAILY PILOT MONITORING + INCIDENT LOG (TEMPLATE)
Use this daily during live pilots to catch issues before clients notice.

Daily checklist (5–10 min per location)
1) Delivery health: any failed sends in last 24h? Y/N
2) Reply handling: any unclassified replies? Count: ___
3) Opt-outs: any STOP not honored within 1 message? Y/N
4) Calendar sync: any update failures? Y/N
5) Anomalies: duplicate reminders, wrong time, wrong customer, threading errors? Notes: ____

Incident Log Entry
- Incident ID: __________
- Date/Time detected (UTC + local): __________
- Location: __________
- Severity: S0 Critical / S1 High / S2 Medium / S3 Low
  - S0: STOP compliance broken, wrong-customer PHI risk, spam/looping, calendar writes corrupt schedule
  - S1: wrong time/timezone, duplicate booking created, reminders missing for many appts
  - S2: single appointment mis-thread, minor wording issue, delayed send
  - S3: cosmetic, analytics mismatch without client impact
- Detected by: system alert / manual check / client report
- Customer impact: __________
- Repro steps: __________
- Expected vs actual: __________
- Immediate mitigation (what we did right now): __________
- Owner/client comms sent? Y/N (include timestamp)
- Root cause: __________
- Fix applied: __________
- Verification steps + result: __________
- Status: Open / Monitoring / Resolved


C) CLIENT COMMUNICATIONS (READY TO SEND)

C1) Pilot Welcome + Consent Confirmation Email
Subject: Quick kickoff for your no-show reduction pilot (consent + next steps)

Hi {{OwnerName}},

Thanks for agreeing to the Appointment No-Show Reducer pilot. This pilot reduces missed appointments by sending smart SMS reminders, collecting two-way confirmations, and handling reschedules.

For transparency, here’s our public business page you can share internally: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support email (me): agent_bob_replit+no-show-bot@agentmail.to

Consent/Compliance (please reply “I confirm”):
1) You confirm you have permission to text your customers regarding appointments they requested/booked.
2) You will include opt-out language (customers can reply STOP to opt out).
3) You want us to start reminders for appointments scheduled on/after: {{GoLiveDate}}.

To launch, please reply with:
- Your business timezone:
- Your preferred reminder timing (default: 24h + 3h + 60m):
- Your reschedule policy (earliest/latest, days/hours):
- A staff phone/email for escalation if a calendar update fails:
- Average appointment value ($) and last 4 weeks no-show % (estimate is fine):

Once I have this, I’ll confirm go-live and start daily monitoring.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

C2) Day-7 Check-in Email (sets up conversion)
Subject: Week 1 results — confirmations, saves, and recovered revenue estimate

Hi {{OwnerName}},

Checking in with your Week 1 pilot results. Here’s the summary:
- Appointments reminded: {{n_total}}
- Confirmed via SMS: {{n_confirmed}} ({{confirm_rate}}%)
- Rescheduled (avoided likely no-show): {{n_rescheduled}}
- Waitlist fills (if enabled): {{n_waitlist_fills}}
- Estimated recovered revenue this week: ${{recovered_revenue}}

Notes / incidents (if any):
{{incident_summary}}

If you’d like, we can keep the pilot running for {{next_period}} and convert it into a paid install after {{pilot_end_date}}.

Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

— Bob


D) PILOT RECRUITING OUTREACH SEQUENCE (EMAIL + LINKEDIN DM)

D1) Email #1 (Day 1)
Subject: Quick pilot to cut appointment no-shows via 2-way SMS confirmations

Hi {{Name}},

I’m Bob. We’re running 2–3 concierge pilots of an Appointment No-Show Reducer: it sends SMS reminders, collects “YES/NO/RESCHEDULE” replies, and helps fill gaps from a waitlist.

If you have even a few no-shows/week, this typically pays for itself quickly. I can set it up for you and send a simple weekly report showing confirmed appointments and estimated recovered revenue.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Reply here or email: agent_bob_replit+no-show-bot@agentmail.to

Open to a 15-minute pilot kickoff this week?

— Bob

D2) Follow-up (Day 3)
Subject: Re: pilot to reduce no-shows

Hi {{Name}},

Quick follow-up — are you the right person for reducing no-shows / appointment reminders?

If yes, we can run a 7–14 day pilot and measure:
- confirmation rate,
- reschedules saved,
- and estimated recovered revenue.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

— Bob

D3) Final follow-up (Day 7)
Subject: Close the loop?

Hi {{Name}},

Should I close the loop on this? If no-shows aren’t a focus right now, no problem.

If you want to test it, I can do a low-lift concierge pilot and send a weekly value report.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

— Bob

How to use this packet
1) Run Section A internally and log any failures using Section B.
2) As soon as a pilot says yes, send Section C1, collect consent + baseline, then go live.
3) Monitor daily with Section B and send Section C2 on Day 7.
4) Use Section D to recruit the next pilots in parallel.
