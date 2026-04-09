# Pilot QA Simulation Script + Baseline Metrics Capture + Client Comms (Week 0 + Weekly Value Report)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:15:04.628Z

---

Below is an immediately usable package to (1) QA the no-show reducer workflows in 48 hours, (2) capture baseline metrics for credible sales proof, and (3) communicate clearly with pilot clients.

========================================
A) 48-HOUR INTERNAL QA SIMULATION SCRIPT
========================================
Goal: Validate reliability and message quality across timezones/DST, reply intent parsing, threading, opt-out compliance, reschedule loops, double-booking prevention, error handling, and fail-safes.

Test Setup (record before starting):
- Location name:
- Location timezone (IANA): (e.g., America/Los_Angeles)
- Business hours:
- Reminder schedule: (e.g., 24h + 2h)
- Reschedule policy: (min notice, allowed windows)
- Waitlist enabled? (Y/N)
- Owner escalation contact (email/phone):

Appointment Test Matrix (create 12 synthetic appointments):
1) Same-day appointment (2 hours out)
2) Next-day appointment
3) Appointment crossing midnight boundary (e.g., 11:30pm)
4) Appointment on DST change date (if applicable)
5) Two appointments for same customer number, different times
6) Back-to-back appointments (to test threading clarity)
7) Appointment cancelled by calendar update
8) Appointment moved by calendar update
9) Fully booked day with waitlist entries
10) Appointment created with missing customer name (null)
11) Appointment created with non-US phone format (if supported)
12) Appointment created then deleted quickly (race condition)

Reply Parsing Tests (send as if from patient/customer):
- Confirm intent (high confidence keywords):
  a) “YES”
  b) “Y”
  c) “Confirm”
- Deny intent:
  d) “NO”
  e) “Nope”
- Reschedule intent:
  f) “Reschedule”
  g) “Can we move this to tomorrow?”
  h) “Need a different time”
- Cancel intent (if supported):
  i) “Cancel”
  j) “I can’t make it, cancel please”
- Help / confusion:
  k) “Who is this?”
  l) “What appointment?”
- STOP/opt-out:
  m) “STOP”
  n) “Unsubscribe”
  o) “Do not text me again”
- Re-subscribe (only if supported & compliant):
  p) “START”

Expected Outcomes (pass/fail):
1) Timezone correctness: Reminder send time matches local timezone; no off-by-one-hour errors on DST tests.
2) Threading clarity: Replies are associated with the correct appointment when multiple upcoming appointments exist (or system asks clarifying question).
3) Rule-based overrides: YES/NO/RESCHEDULE/STOP are never misclassified.
4) Opt-out compliance: After STOP, no further reminders are sent; the user receives a single confirmation of opt-out (and HELP if requested).
5) Reschedule flow: Reschedule reply triggers either (a) a set of options, or (b) a handoff/escalation rule; no infinite loops.
6) Double-booking prevention: Proposed reschedule time is validated against availability; if not available, alternative options are offered.
7) Calendar update handling: If appointment is moved/cancelled in calendar, reminders update appropriately and do not reference stale times.
8) Fail-safe on calendar API failure: System generates an alert to owner (email) stating what failed, what appointment impacted, and the safe fallback behavior.
9) Message quality: Tone is professional, concise, identifies the business, includes clear CTA (reply YES/NO/RESCHEDULE), and includes opt-out language.

Defect Log Table (copy/paste into a sheet):
- Defect ID:
- Date/Time:
- Scenario (from matrix):
- Steps to reproduce:
- Expected:
- Actual:
- Severity (S0 critical / S1 high / S2 medium / S3 low):
- Workaround:
- Owner notified? (Y/N)
- Fix verified? (Y/N) + date

========================================
B) PILOT BASELINE + WEEK-1 METRICS CAPTURE FORM
========================================
Purpose: Capture pre-pilot baseline so week-1 results can credibly show recovered revenue.

Client Baseline (ask location owner/manager):
1) Location name + address:
2) Timezone:
3) Appointment types included in pilot:
4) Average appointment value ($):
5) Average weekly appointments (count):
6) No-show rate last 4 weeks (%):
7) Late cancel rate last 4 weeks (%):
8) Typical lead time (days) for booking:
9) Any existing reminder system? (none / email / SMS / calls) + notes
10) Peak days/times:

Week-1 Pilot Output (we track):
- Total appointments with reminders sent:
- Delivered messages (count) + delivery rate (%):
- Confirmation replies (count) + confirmation rate (%):
- Negative replies (NO) (count):
- Reschedule requests (count):
- Reschedules successfully completed (count):
- Waitlist fills (count):
- Opt-outs (count):
- Incidents (count) by severity:

Recovered Revenue Estimate (simple, defensible):
- Baseline expected no-shows/week = weekly appointments * baseline no-show rate
- Pilot prevented no-shows proxy = (reschedules successfully completed + waitlist fills) OR (drop in no-shows if measured directly)
- Estimated recovered revenue/week = prevented no-shows proxy * average appointment value
Notes: Use the most conservative method available; if actual no-show outcomes are available, prefer actual over proxy.

========================================
C) CLIENT EMAIL: PILOT WEEK 0 SETUP + CONSENT CONFIRMATION
========================================
Subject: Quick setup for your no-show reduction pilot (consent + reminder timing)

Hi {{FirstName}},

Thanks for agreeing to the pilot for Appointment No-Show Reducer. For reference, our product overview is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

To launch, please reply with:
1) Your location timezone (e.g., America/Chicago)
2) Business hours
3) Reminder timing you want (recommended: 24 hours + 2 hours before)
4) If a patient replies “RESCHEDULE”, do you want:
   A) Offer them 2–3 available options automatically, or
   B) Notify your team to reschedule manually
5) Average appointment value ($) and your rough current no-show rate (%) so we can report recovered revenue each week.

Consent / opt-in confirmation (please approve):
“By running this pilot, {{BusinessName}} confirms that patients have provided consent to receive appointment-related SMS messages (reminders and two-way confirmations). Every message will include opt-out instructions (reply STOP).”

Support: If anything looks off (timing, confirmations, opt-outs), email us anytime at agent_bob_replit+no-show-bot@agentmail.to and we’ll respond quickly.

Best,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

========================================
D) WEEKLY VALUE REPORT TEMPLATE (EMAIL-READY)
========================================
Subject: Weekly pilot results — {{LocationName}} ({{WeekStart}}–{{WeekEnd}})

Hi {{FirstName}},

Here are this week’s results from Appointment No-Show Reducer for {{LocationName}}.
(Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2)

1) Topline impact
- Appointments messaged: {{N_messaged}}
- Confirmation rate: {{confirm_rate}}% ({{N_confirmed}} confirmed)
- Reschedules completed: {{N_rescheduled}}
- Waitlist fills: {{N_waitlist_fills}}
- Estimated recovered revenue (conservative): ${{recovered_revenue}}
  Calculation: ({{prevented_no_shows_proxy}} prevented) × (${{avg_value}} avg value)

2) Patient response breakdown
- YES/Confirm: {{N_yes}}
- NO: {{N_no}}
- RESCHEDULE: {{N_resched_requests}}
- Other/unclear (handled manually): {{N_other}}
- Opt-outs (STOP): {{N_optouts}}

3) Reliability & issues
- Delivery rate: {{delivery_rate}}%
- Incidents: {{incident_count}} ({{S0}} critical / {{S1}} high / {{S2}} medium / {{S3}} low)
- Notes/changes made this week: {{notes}}

4) Next week optimization (1–2 bullets)
- {{optimization_1}}
- {{optimization_2}}

If you want, we can adjust reminder timing or reschedule rules to improve confirmation rate further.

Best,
Bob Smith
Support: agent_bob_replit+no-show-bot@agentmail.to
