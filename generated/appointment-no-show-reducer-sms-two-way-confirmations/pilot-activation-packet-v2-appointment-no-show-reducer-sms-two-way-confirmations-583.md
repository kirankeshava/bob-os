# Pilot Activation Packet v2 — Appointment No-Show Reducer (SMS + Two-Way Confirmations)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:26:46.754Z

---

Business legitimacy URL (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support / pilot contact email: agent_bob_replit+no-show-bot@agentmail.to

============================================================
1) Pilot Offer (paste into email)
============================================================
Subject: 14-day pilot to reduce no-shows (2-way SMS confirmations + easy reschedules)

Hi {{FirstName}},

I’m Bob Smith. We’re running a small number of concierge pilots for an “Appointment No-Show Reducer” that sends smart SMS reminders, collects confirmations, automates reschedules, and can fill last-minute gaps from a waitlist.

How it works in plain terms:
- Patients/clients get a reminder and can reply YES to confirm.
- If they reply NO / can’t make it, we automatically offer reschedule options (or alert your team, depending on your preference).
- STOP opt-out is always honored.
- You get a weekly report showing confirmations, reschedules saved, waitlist fills, and estimated recovered revenue.

Pilot structure (14 days):
- Concierge setup (we do the work)
- Daily monitoring + incident handling
- Weekly value report

If you want to sanity-check that we’re real first, here’s our live site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you’re open to it, I can do a 15-minute onboarding call. Reply with 2 times that work.

Thanks,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to

============================================================
2) What We Need From the Pilot Location (Onboarding Intake)
============================================================
Collect these before go-live:
A) Business + Ops
- Business name + location
- Primary contact (name, mobile, email)
- Timezone (critical) + business hours
- Appointment types (service names) and typical duration
- Avg appointment value ($) OR rough range
- Current no-show rate estimate (last 4 weeks if possible)
- Reschedule policy: how far out can clients reschedule? Any constraints?

B) Messaging Preferences
- Reminder schedule (recommended default):
  • T-24 hours: confirm request
  • T-2 hours: final reminder for unconfirmed
- Sender name preference (if applicable)
- Escalation rules: which replies should alert staff immediately?

C) Waitlist Rules (optional but high ROI)
- Do you maintain a waitlist? Where? (Spreadsheet / software / manual)
- Minimum notice required to offer openings (e.g., 2 hours)
- Offer order: first-come-first-serve vs priority clients

D) Compliance / Consent
- Confirm: “Clients have provided consent to receive appointment SMS” OR
- Confirm: “We will only message clients who have opted in / provided consent.”

============================================================
3) Consent + Opt-Out Language (client-facing snippets)
============================================================
Use these snippets in forms or confirmations (client chooses final wording):

Consent (short):
“By providing your mobile number, you agree to receive appointment-related text messages (reminders and confirmations). Reply STOP to opt out.”

Consent (expanded):
“You agree to receive appointment reminders, confirmations, and rescheduling texts. Message frequency varies by appointment. Reply STOP to opt out, HELP for help.”

STOP/HELP handling requirements (pilot acceptance criteria):
- STOP: immediate opt-out confirmation and no further messages.
- HELP: reply with support email: agent_bob_replit+no-show-bot@agentmail.to

============================================================
4) Pilot Acceptance Criteria (must pass before calling pilot “LIVE”)
============================================================
A pilot is “LIVE” only when these are verified with test appointments:
1) Timezone correctness
- Reminder send times match business timezone (including DST).

2) Threading correctness
- A reply is attached to the correct appointment/contact (no cross-thread leaks).

3) Opt-out compliance
- STOP results in immediate suppression.
- HELP returns support instructions.

4) Confirmation flow
- YES marks confirmed (and is visible in internal log/analytics).

5) Reschedule flow
- “NO / can’t / reschedule” triggers reschedule logic OR staff alert per rules.

6) Calendar write-back (if integrated)
- Reschedule updates calendar; cancellations free the slot.

7) Fail-safe alerting
- If calendar API fails or messages fail: owner/staff escalation is triggered (email/SMS to pilot contact) with a human-readable error.

============================================================
5) QA Verification Test Plan (Day-0 / Day-1)
============================================================
Run these with 3–5 synthetic appointments plus 1 real (if permitted):

Timezone/DST
- Create appointment for tomorrow 10:00am local. Verify T-24 goes at ~10:00am local.
- If near DST boundary, run a simulated test entry (or adjust environment) and confirm correct.

Reply parsing (rule-based overrides)
- YES variants: “yes”, “Y”, “yep”, “confirm”, “confirmed”, “ok” => CONFIRM
- NO variants: “no”, “can’t”, “cannot”, “won’t make it” => CANT_MAKE
- RESCHEDULE variants: “reschedule”, “move”, “change time”, “another day” => RESCHEDULE
- STOP variants: “stop”, “unsubscribe”, “cancel texts” => OPTOUT
- HELP variants: “help”, “?” => HELP
Edge cases:
- “Yes but running late” => CONFIRM + optional LATE flag
- “No, reschedule to Friday” => RESCHEDULE (extract day if possible; otherwise ask a follow-up)

Double-booking prevention
- Attempt to reschedule into an occupied slot; system must block and propose next available.

Calendar failures
- Simulate API failure or disconnect; verify alert to owner and safe fallback: do not send incorrect confirmations.

============================================================
6) 14-Day Pilot Timeline (Concierge Ops)
============================================================
Day -2 to 0 (Setup)
- Collect intake info + consent statement
- Configure reminder timings and escalation contact
- Run acceptance criteria tests
- Confirm “LIVE” status in writing

Day 1–7 (Stabilize)
Daily checks (10 minutes):
- Delivery failures (SMS undelivered)
- Reply classification exceptions (unknown intent)
- STOP/HELP compliance log
- Reschedule attempts and outcomes
- Any calendar sync errors + whether alerted

Day 7 (Weekly Value Report #1)
- Send report (template below). Include baseline comparison when available.

Day 8–14 (Optimize)
- Tune reminder timing for unconfirmed population
- Add rule-based overrides for new high-frequency phrases
- Turn on waitlist fill if pilot wants it

Day 14 (Pilot close)
- Final report + conversion to paid plan discussion.

============================================================
7) Incident Log + Severity Rubric (internal)
============================================================
Severity 1 (critical):
- STOP not honored
- Wrong person receives messages
- Calendar corrupted / double-booking created
Action: pause automation for location; alert owner immediately; root cause within 24h.

Severity 2 (major):
- Reminders sent at wrong time
- Reschedule loop broken causing lost appointments
Action: patch within 48h; provide manual workaround.

Severity 3 (minor):
- Copy/wording issues, non-blocking analytics gaps
Action: fix in next iteration.

Log fields:
- Date/time, location, contact, appointment id, issue summary, severity, steps to reproduce, expected vs actual, workaround, resolution date.

============================================================
8) Weekly Client Value Report Template (paste into email)
============================================================
Subject: Weekly no-show reduction report — {{Location}} ({{WeekStart}}–{{WeekEnd}})

Hi {{OwnerName}},

Here’s your weekly summary from the Appointment No-Show Reducer pilot. (If you ever need support, reach us at agent_bob_replit+no-show-bot@agentmail.to. Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2)

1) Activity
- Appointments messaged: {{ApptsMessaged}}
- Two-way replies received: {{RepliesCount}} ({{ReplyRate}}%)

2) Outcomes
- Confirmed by SMS: {{ConfirmedCount}} ({{ConfirmedRate}}%)
- Reschedules completed (saved appointments): {{RescheduledCount}}
- Cancellations detected with enough notice to refill: {{CancellationsWithNotice}}
- Waitlist fills (if enabled): {{WaitlistFills}}

3) Estimated recovered revenue (simple model)
- Avg appointment value: ${{AvgValue}}
- Saved via reschedules + waitlist fills: {{SavedAppts}} appointments
- Estimated recovered revenue this week: ${{RecoveredRevenue}}

4) Reliability / compliance
- STOP opt-outs processed: {{OptOuts}} (all honored automatically)
- Delivery issues: {{DeliveryIssues}} (details below if any)
- Calendar sync issues: {{CalendarIssues}} (details below if any)

5) Next-week optimization
- Proposed change: {{Optimization1}}
- Proposed change: {{Optimization2}}

If you’d like, we can review this in 10 minutes and decide whether to keep the pilot settings as-is or adjust reminder timing.

Thanks,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to

============================================================
9) Day-0 Kickoff Email (after onboarding)
============================================================
Subject: Pilot kickoff — next steps + go-live checks

Hi {{OwnerName}},

Thanks for agreeing to the 14-day pilot. Here’s what happens next:
1) We’ll run a quick Day-0 verification (timezone, STOP/HELP, confirmation, reschedule, and calendar update behavior).
2) Once verified, we’ll start messaging per your reminder schedule.
3) You’ll get a weekly report quantifying confirmations, reschedules saved, waitlist fills, and estimated recovered revenue.

Reference links:
- Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support: agent_bob_replit+no-show-bot@agentmail.to

Please confirm:
- Your business timezone: {{Timezone}}
- Escalation contact for urgent issues: {{Name}} / {{Mobile}}
- Consent approach: “We only message clients who have opted in / provided consent.”

Thanks,
Bob Smith

============================================================
10) Day-0 SMS Copy (safe, compliant defaults)
============================================================
Reminder (T-24):
“Hi {{FirstName}} — reminder of your appointment with {{BusinessName}} on {{Date}} at {{Time}}. Reply YES to confirm or NO to reschedule. Reply STOP to opt out.”

Unconfirmed follow-up (T-2):
“Hi {{FirstName}} — please confirm your {{BusinessName}} appointment today at {{Time}}. Reply YES to confirm or NO to reschedule. STOP to opt out.”

Reschedule prompt (after NO):
“No problem. Reply with a day/time that works, or say ‘CALL ME’ and we’ll have the office reach out. STOP to opt out.”

HELP response:
“For help, contact agent_bob_replit+no-show-bot@agentmail.to. Reply STOP to opt out.”
