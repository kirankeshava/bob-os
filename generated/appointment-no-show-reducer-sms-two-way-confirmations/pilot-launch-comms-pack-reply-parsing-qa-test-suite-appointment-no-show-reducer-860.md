# Pilot Launch Comms Pack + Reply Parsing QA Test Suite (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:04:58.228Z

---

Below is a ready-to-use communications pack for launching 2–3 concierge pilots, plus a reply-parsing QA test suite to validate two-way confirmations, reschedules, opt-out, and message threading.

LEGITIMACY LINKS (include in every client email)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/Contact: agent_bob_replit+no-show-bot@agentmail.to

A) CLIENT-FACING EMAIL TEMPLATES

1) Pilot Kickoff + Consent Confirmation (send after they say “yes”)
Subject: Pilot kickoff: reduce no-shows with two-way SMS confirmations (quick consent step)
Hi {{OwnerName}},
Thanks for agreeing to the pilot. We’ll reduce no-shows by sending smart SMS reminders and letting clients confirm or request a reschedule by replying to the text.

Before we turn anything on, please confirm:
1) You authorize us to send SMS reminders to clients who have an appointment scheduled with {{BusinessName}}.
2) You confirm clients have provided consent to receive SMS related to their appointment (or you will obtain consent at booking).
3) You want opt-out enabled on every message (“Reply STOP to opt out”).

Reply with: “I confirm” (and the best escalation number/email for urgent issues).

For legitimacy, here’s our product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Next step: a 10-minute setup call. We’ll confirm timezone, reminder timing, and reschedule rules.
— Bob

2) Setup Call Agenda (send to confirm the 10-min call)
Subject: 10-min setup for your no-show reduction pilot
Hi {{OwnerName}},
Confirming our quick setup call:
- Timezone + business hours
- Which appointments get reminders (all vs. certain services)
- Reminder timing (e.g., 24h + 2h)
- What “reschedule” should do (offer times / call back / link)
- Escalation contact if calendar integration fails

If anything urgent comes up during the pilot, email agent_bob_replit+no-show-bot@agentmail.to.
Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob

3) Go-Live Confirmation (send immediately before activation)
Subject: You’re live: SMS confirmations now active for {{BusinessName}}
Hi {{OwnerName}},
We’re live. Starting {{GoLiveDate}}, clients will receive SMS reminders and can reply to confirm or request a reschedule.

Key behaviors:
- Confirm: client replies YES/CONFIRM
- Reschedule: client replies RESCHEDULE (or similar)
- Opt out: client replies STOP (we will suppress future messages)

If you see any unexpected behavior or a calendar issue, email agent_bob_replit+no-show-bot@agentmail.to and we’ll respond quickly.
Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob

4) Day-2 Check-in (send 48 hours after go-live)
Subject: Quick check-in: pilot performance + any adjustments?
Hi {{OwnerName}},
Quick check-in after the first 48 hours:
1) Any client complaints about reminders?
2) Any reschedule requests that didn’t route correctly?
3) Do you want timing tweaks (e.g., 48h + 3h instead of 24h + 2h)?

Reply with any notes and we’ll adjust the rules today.
Support: agent_bob_replit+no-show-bot@agentmail.to
Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob

5) Incident Notice (only if something breaks)
Subject: Issue update: {{ShortDescription}} (pilot)
Hi {{OwnerName}},
We identified an issue: {{WhatHappened}}.
Impact: {{ClientImpact}} (e.g., reminders delayed / confirmations not logged / reschedule flow paused).
Workaround right now: {{Workaround}}.
Next update by: {{Time}}.

If you need immediate help, reply here or email agent_bob_replit+no-show-bot@agentmail.to.
Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob

6) Week-1 Report Cover Email (attach/paste the weekly value report)
Subject: Week 1 pilot results: confirmations, reschedules, and estimated revenue recovered
Hi {{OwnerName}},
Here are your Week 1 pilot results. Highlights:
- Confirmation rate: {{ConfirmRate}}%
- Reschedule saves: {{RescheduleSaves}}
- Waitlist fills (if enabled): {{WaitlistFills}}
- Estimated revenue recovered: ${{RecoveredRevenue}}

Full report below/attached. If you want us to adjust reminder timing or reschedule rules, reply with “adjust” and what you prefer.
Support: agent_bob_replit+no-show-bot@agentmail.to
Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob

7) Week-2 Conversion Nudge (end of pilot)
Subject: Pilot wrap-up: keep the no-show reduction running?
Hi {{OwnerName}},
We’re at the end of the pilot window. Based on results so far:
- No-show reduction: {{DeltaNoShow}} points
- Estimated revenue recovered: ${{RecoveredRevenue2w}} over 2 weeks

If you’d like to continue, reply “continue” and we’ll keep it running with the same settings (and keep sending weekly value reports).
Support: agent_bob_replit+no-show-bot@agentmail.to
Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob

B) SMS TEMPLATES (for client-facing appointment messages)
Note: keep consistent opt-out language. Ensure business name included.

1) 24h Reminder
“{{BusinessName}} reminder: you have an appointment on {{Date}} at {{Time}}. Reply YES to confirm, RESCHEDULE to change, or STOP to opt out.”

2) 2h Reminder
“{{BusinessName}}: your appointment is at {{Time}} today. Reply YES to confirm, RESCHEDULE to change, or STOP to opt out.”

3) Reschedule Acknowledgement (auto-reply)
“{{BusinessName}}: got it—reschedule requested. Reply with a preferred day/time, or call us at {{BusinessPhone}}. Reply STOP to opt out.”

4) Confirmation Acknowledgement (auto-reply)
“{{BusinessName}}: confirmed—see you {{Date}} at {{Time}}. Reply STOP to opt out.”

5) Wrong Number (auto-reply)
“Sorry about that. We’ll stop messages to this number. Reply STOP to opt out.”

C) 10-MIN ONBOARDING CALL SCRIPT (baseline + config)
1) Confirm timezone: “What timezone are your appointments in? Any seasonal DST considerations?”
2) Appointment types: “All appointments or only certain services/providers?”
3) Reminder timing: “Default: 24h and 2h. Any preference?”
4) Reschedule policy: “If someone requests reschedule, should we (a) send a booking link, (b) collect preferred times by SMS, or (c) notify staff to call?”
5) Waitlist rules (optional): “Do you have a waitlist? How fast should we offer openings—text all vs. top 5?”
6) Baseline metrics (last 4 weeks): total appointments, no-shows, average appointment value, typical lead time.
7) Escalation: “Best contact if anything breaks (calendar issues, message failures)?”
8) Consent: “Confirm you have/collect SMS consent at booking and want STOP opt-out on every message.”

D) REPLY PARSING QA TEST SUITE (inbound SMS)
Goal: validate intent classification + rule overrides + safe fallbacks.
Each test includes: Inbound Message → Expected Intent → Notes/Overrides

CONFIRM / YES
1) “YES” → CONFIRM
2) “Yes.” → CONFIRM (punctuation)
3) “Y” → CONFIRM (short form)
4) “yep” → CONFIRM
5) “confirmed” → CONFIRM
6) “I’ll be there” → CONFIRM
7) “Ok see you then” → CONFIRM
8) “👍” → CONFIRM (emoji-only; if unsupported, route to MANUAL_REVIEW)

DECLINE / NO
9) “NO” → DECLINE
10) “Nope” → DECLINE
11) “can’t make it” → DECLINE or RESCHEDULE_REQUEST (prefer RESCHEDULE_REQUEST if business wants saves)
12) “I need to cancel” → CANCEL/DECLINE (should trigger staff alert)

RESCHEDULE
13) “RESCHEDULE” → RESCHEDULE_REQUEST (keyword override)
14) “resched” → RESCHEDULE_REQUEST
15) “Can we move it to Friday?” → RESCHEDULE_REQUEST
16) “Running late can I come at 3:30 instead?” → RESCHEDULE_REQUEST (also LATE flag)
17) “Need to change time” → RESCHEDULE_REQUEST
18) “What other times do you have?” → RESCHEDULE_REQUEST

MULTI-INTENT / AMBIGUOUS
19) “Yes but I’m going to be 10 min late” → CONFIRM + LATE flag; notify staff
20) “No—reschedule me” → RESCHEDULE_REQUEST (reschedule beats decline)
21) “Stop texting me. Yes I confirm.” → OPT_OUT (STOP wins)
22) “Help” → HELP (send help/assist message)

OPTOUT / COMPLIANCE
23) “STOP” → OPTOUT (immediate suppression)
24) “Stop” → OPTOUT
25) “unsubscribe” → OPTOUT
26) “do not text” → OPTOUT
27) “remove me” → OPTOUT
28) “START” (after STOP) → OPTIN_RESTART if supported; else MANUAL_REVIEW

WRONG NUMBER
29) “Wrong number” → WRONG_NUMBER (suppress + apologize)
30) “This isn’t Sarah” → WRONG_NUMBER

CALL ME / HUMAN HANDOFF
31) “Call me” → HUMAN_HANDOFF (notify staff)
32) “Please call” → HUMAN_HANDOFF
33) “I have a question” → HUMAN_HANDOFF or HELP

NOISE / SPAM / UNKNOWN
34) “” (empty) → UNKNOWN (no action)
35) “???” → UNKNOWN
36) “k” → CONFIRM (if configured) else UNKNOWN

THREADING / DUPLICATE HANDLING
37) Reply YES to an old reminder after appointment time → CONFIRM_LATE (should not change appointment state; log and optionally notify)
38) Send STOP then later YES → remain OPTOUT unless explicit START/OPTIN
39) Multiple messages: “RESCHEDULE” then “Actually YES” within 2 minutes → last-write-wins with audit log; optionally lock once reschedule flow started

E) PILOT DEFECT LOG TEMPLATE (copy/paste into a doc/sheet)
- Defect ID:
- Date/Time detected:
- Location:
- Severity (S0 outage / S1 major / S2 minor / S3 cosmetic):
- Summary:
- Steps to reproduce:
- Expected result:
- Actual result:
- Scope/Impact (# patients affected / missed confirmations / compliance risk):
- Suspected root cause:
- Workaround (if any):
- Owner:
- Fix PR/Change reference:
- Verification steps:
- Verified by + date:
- Client comms needed? (Y/N) + template used:

This pack is designed so that once the first pilot replies “I confirm,” we can go live with consistent consent language, predictable SMS behavior, and a repeatable QA regimen that produces clean weekly proof-of-value for sales.
