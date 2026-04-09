# Pilot QA Simulation Pack + Defect Log + Daily Monitoring SOP (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:12:13.383Z

---

Below is an operator-ready pack to run a 48-hour internal QA simulation and manage early pilot reliability for the Appointment No-Show Reducer.

LEGITIMACY + SUPPORT
- Website (share with clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to

A) 48-HOUR QA SIMULATION DATASET (12 SCENARIOS)
Use one test business with a known timezone. Create synthetic appointments (or staged entries) and simulate inbound SMS replies. For each scenario, record: (1) message(s) sent, (2) reply received, (3) system classification, (4) calendar outcome, (5) owner alerts, (6) opt-out compliance.

Scenario 1 — Basic confirmation
- Appt: Tomorrow 10:00 AM
- Reminder: 24h
- Reply: “Yes”
- Expected: Status=Confirmed; no further nag reminders; message thread continues normally.

Scenario 2 — Case/emoji/short reply confirmation
- Reply: “Y”, “Yep”, “👍”, “ok”
- Expected: Rule-based override maps to CONFIRM; no AI ambiguity.

Scenario 3 — Decline / can’t make it
- Reply: “No I can’t”
- Expected: Status=Needs reschedule or cancel workflow triggered; client-friendly next step sent.

Scenario 4 — Reschedule intent with time proposal
- Reply: “Can we do Friday at 2?”
- Expected: RESCHEDULE intent; propose allowed slots or route to staff; no double-booking.

Scenario 5 — Reschedule loop protection
- Conversation: user proposes time outside hours twice
- Expected: after N attempts, route to human escalation (“We’ll have staff reach out”) and alert owner.

Scenario 6 — STOP compliance
- Reply: “STOP”
- Expected: Immediately set opted_out=true; confirmation message sent; no further SMS.

Scenario 7 — HELP compliance
- Reply: “HELP”
- Expected: Provide business name + support email/phone guidance; do not mark opt-out.

Scenario 8 — Wrong number
- Reply: “Wrong person”
- Expected: Mark as do_not_contact for that number (or equivalent); alert owner to update patient/client record.

Scenario 9 — Timezone mismatch
- Business timezone: America/New_York
- Appt created in UTC or different tz
- Expected: Reminder time matches local business timezone; message content shows correct local time.

Scenario 10 — DST edge
- Appt scheduled on DST transition weekend
- Expected: Reminder sends at correct local time; no 1-hour drift; report any drift as Sev-1.

Scenario 11 — Duplicate booking attempt
- Two appointments same provider/time (or same customer)
- Expected: System prevents confirming a slot that would double-book; escalates to owner.

Scenario 12 — Calendar API failure fail-safe
- Simulate: calendar write fails (timeout/401)
- Expected: Reminder still sent, but any confirm/reschedule that requires calendar update triggers immediate owner alert with details; system avoids claiming “You’re rescheduled” if it can’t verify.

B) DEFECT / INCIDENT LOG TEMPLATE (COPY/PASTE)
Use one row per issue.
- ID:
- Date/Time Detected:
- Location (pilot/test):
- Severity (S0 Blocker / S1 Critical / S2 Major / S3 Minor):
- Category (Timezone/DST, Opt-out, Threading, Intent parsing, Calendar sync, Waitlist, Reporting, Other):
- Summary:
- Environment (prod/stage, build/version if known):
- Steps to Reproduce:
- Expected Result:
- Actual Result:
- Customer Impact (what breaks / risk):
- Workaround (if any):
- Owner Notification Needed? (Y/N) If Y, include message text:
- Fix Owner (who will implement):
- Verification Steps (how we’ll retest):
- Status (Open / In progress / Fixed / Verified / Won’t fix):

C) PILOT DAILY MONITORING SOP (CONCIERGE OPS)
Goal: catch failures before they create missed appointments or compliance issues.

Every morning (9–10am local business time)
1) Delivery health: verify previous day’s reminders had normal send volume; check for spikes in failures/bounces.
2) Opt-out audit: confirm all STOP messages were honored (no messages sent after opt-out). Any violation = S0.
3) Thread review: scan unread inbound replies; ensure each is classified into Confirm / Reschedule / Cancel / Help / Unknown within SLA.
4) Calendar sync spot-check: pick 3 confirmed and 3 rescheduled items and verify calendar status matches.
5) Incident scan: look for any calendar API errors; if present, notify owner immediately with affected appointment IDs and recommended manual action.

Midday (1–2pm)
1) High-risk appointments: appointments within next 24h with no response—confirm reminders are scheduled.
2) Reschedule queue: ensure any “needs human” cases have been handed off and acknowledged.

End of day (5–6pm)
1) Summary: counts for the day—sent, delivered, replies, confirmed, rescheduled, opt-outs, unknown intents.
2) Log incidents/defects: anything that required manual intervention goes into the defect log.
3) Client note (optional during pilot): if any customer-affecting issue occurred, send a brief transparency update and what was done.

Escalation triggers (notify owner immediately)
- Any STOP not honored, or any messaging to an opted-out number.
- Calendar write failures when a customer confirmed/rescheduled.
- Any timezone/DST mismatch suspected.
- Any double-booking risk.

D) WEEK-0 BASELINE REQUEST EMAIL (TO PILOT LOCATION)
Subject: Quick baseline numbers needed before we start (No-Show Reducer pilot)

Hi <Name>,

To make sure we can show clear before/after results during the pilot, could you reply with the baseline numbers below (either last 4 weeks or last 30 days):
1) Total scheduled appointments:
2) Total no-shows:
3) Average appointment value (or typical revenue per visit):
4) Any current reminder method (none / calls / SMS / email) and when it goes out.

Once we have that, we’ll turn on smart SMS reminders + two-way confirmations and send you a simple weekly value report showing confirmations, reschedules saved, waitlist fills (if used), and estimated recovered revenue.

Reference page (for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob
Appointment No-Show Reducer

This pack is designed to (1) surface edge cases fast, (2) create a clean defect list with verification, and (3) keep pilots stable enough to generate credible week-1 sales proof (recovered revenue).