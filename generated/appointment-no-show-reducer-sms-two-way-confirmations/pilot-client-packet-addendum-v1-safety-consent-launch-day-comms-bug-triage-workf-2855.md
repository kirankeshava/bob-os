# Pilot Client Packet Addendum v1 — Safety/Consent + Launch-Day Comms + Bug Triage Workflow (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:27:02.758Z

---

Below is a ready-to-send addendum you can paste into onboarding emails and use internally during pilots.

==============================
1) Pilot Safety + Consent Addendum (Client-Facing)
==============================
What this pilot does
- We send appointment reminders via SMS, collect confirmations (two-way), and handle simple reschedule requests.
- We can also notify a waitlist when a slot opens (only for contacts you’ve explicitly approved to receive those messages).

Consent / opt-in expectations
- You confirm you have permission to text your customers about their appointments (transactional messages).
- If you currently collect mobile numbers for reminders, this is typically covered as a service message. If you want marketing messages later, that’s separate and requires separate consent.

Opt-out and help keywords (always honored)
- Any recipient can reply STOP, UNSUBSCRIBE, CANCEL, END, or QUIT to opt out immediately.
- Any recipient can reply HELP for assistance.
- Once opted out, they will not receive further messages from this reminder system unless they re-consent.

Message timing + quiet hours
- We will not send messages outside your preferred business hours/quiet hours (configured in onboarding).

Escalation / human fallback
- If a message thread becomes unclear or a customer asks a complex question, we will route it for manual handling (concierge mode) or respond with a prompt to call the location.
- If the calendar integration fails or we cannot verify appointment status safely, we fail “safe” (no automated changes), and we alert the owner/manager.

Privacy
- We only use appointment data needed to send reminders and measure pilot outcomes (confirmations, reschedules, waitlist fills).
- Support contact: agent_bob_replit+no-show-bot@agentmail.to
- Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

==============================
2) Pilot Launch Day Email (Client-Facing, Ready to Send)
==============================
Subject: Your no-show reduction pilot is live — what to expect (and how to escalate)

Hi {{FirstName}},

We’re live with your 7-day no-show reduction pilot.

What your customers will receive:
- A reminder SMS before their appointment
- A simple confirmation prompt (reply YES to confirm)
- If they need to change, they can reply RESCHEDULE (or similar) and we’ll route it correctly

Important keywords (always honored):
- STOP to opt out immediately
- HELP for assistance

Your escalation path during the pilot:
- Email: agent_bob_replit+no-show-bot@agentmail.to
- If anything looks off (wrong time, wrong customer, duplicate bookings, etc.), email us and we’ll pause automation and fix it.

To keep outcomes measurable, please reply to this email with your baseline numbers from the last 4 weeks (estimates are fine):
1) Approx. # of appointments/week
2) Estimated no-shows/week
3) Average appointment value ($)

Our legitimacy page (feel free to share internally):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Thanks,
Bob
Appointment No-Show Reducer Pilot Team
agent_bob_replit+no-show-bot@agentmail.to

==============================
3) Pilot Launch Day SMS Templates (Client-Facing, Ready to Paste)
==============================
Template A — Reminder + confirm
“Hi {{FirstName}} — reminder of your appointment with {{BusinessName}} on {{Day}} at {{Time}}. Reply YES to confirm, NO if you can’t make it, or RESCHEDULE to pick a different time. Reply STOP to opt out.”

Template B — Confirmed acknowledgement
“Thanks {{FirstName}} — you’re confirmed for {{Day}} at {{Time}} with {{BusinessName}}. Reply STOP to opt out.”

Template C — Can’t make it (capture intent)
“No problem. Would you like to reschedule? Reply RESCHEDULE to choose another time, or reply STOP to opt out.”

Template D — Help
“Need help? Reply with your question, or call {{BusinessPhone}}. Reply STOP to opt out.”

==============================
4) Baseline + Outcome Metrics (Exact Definitions)
==============================
Baseline (last 4 weeks; per location)
- AppointmentsScheduled: total booked appointments
- NoShows: appointments where the customer did not attend and did not cancel in advance
- AvgAppointmentValue: average revenue per kept appointment (or average invoice)

Pilot weekly tracking (week 1 and onward)
- RemindersSent
- ConfirmationsYes (unique appointments confirmed)
- ConfirmationsNo (unique appointments declined)
- RescheduleRequests (unique conversations requesting a change)
- ReschedulesCompleted (appointment successfully moved to a new slot)
- WaitlistOffersSent
- WaitlistFills (open slots filled from waitlist)
- OptOuts

Recovered revenue estimate (weekly)
RecoveredRevenue = (ReschedulesCompleted + WaitlistFills) * AvgAppointmentValue

Notes:
- If the location already has a baseline reschedule process, track NetRecovered: (RecoveredRevenue – estimated business-as-usual recovered) once we have 2–3 weeks of data.

==============================
5) Bug Triage + Resolution Workflow (Internal)
==============================
Severity definitions
S0 — Critical: compliance or safety risk (STOP not honored, messages sent to wrong person, wrong time zone causing major errors, unintended booking changes)
S1 — High: workflow broken for multiple users (confirmations not recorded, reschedule loop failing, threading broken causing incorrect replies)
S2 — Medium: degraded experience but workaround exists (minor copy issues, delayed messages, partial analytics)
S3 — Low: cosmetic/reporting nit or edge-case suggestion

Response targets (pilot mode)
- S0: acknowledge within 30 minutes; mitigate within 2 hours (pause automation if needed)
- S1: acknowledge within 2 hours; fix within 24 hours
- S2: acknowledge within 1 business day; fix within 72 hours
- S3: backlog

Reproduction checklist
- Location + timezone
- Customer phone (redacted), appointment ID, message thread excerpt
- Expected behavior vs actual behavior
- Steps taken + timestamps
- Integration status (calendar reachable? webhook events?)

Fix verification checklist
- Test in same timezone
- Confirm STOP/HELP behavior unchanged
- Confirm no duplicate booking created
- Confirm analytics counters update correctly
- Document the fix + add a regression test case to the QA execution matrix

Fail-safe rules (always)
- If calendar API fails or appointment cannot be verified: do not write changes; alert owner/manager; route to human.
- If intent uncertain: ask a clarifying question or route to human; do not auto-reschedule.

End of packet.