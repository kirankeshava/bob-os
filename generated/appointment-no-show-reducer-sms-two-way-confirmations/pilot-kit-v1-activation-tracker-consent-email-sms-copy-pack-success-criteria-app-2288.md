# Pilot Kit v1 — Activation Tracker + Consent Email + SMS Copy Pack + Success Criteria (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:38:50.314Z

---

Below is a pilot-ready kit you can use to recruit and launch 2–3 concierge pilots quickly while keeping QA/compliance tight and outcomes measurable.

1) PILOT ACTIVATION TRACKER (copy into Sheets/Airtable)
Columns:
- Location Name
- Niche (med spa, dental, PT, salon, etc.)
- Primary Contact (name, role)
- Phone / Email
- Timezone
- Appointment System (Square, Calendly, Acuity, Jane, custom, etc.)
- SMS Sending Number Type (shared/brand/local)
- Consent Method (written form / recorded verbal / existing SMS opt-in)
- Opt-out Language Approved (Y/N)
- Reminder Cadence (e.g., 24h + 2h)
- Two-way Confirmation Enabled (Y/N)
- Reschedule Flow (manual link / automated options)
- Waitlist Enabled (Y/N)
- Owner Escalation Contact (for failures)
- Baseline Captured (last 4 weeks no-shows, total appts, avg value)
- Go-Live Date
- Day 1 Check Complete (Y/N)
- Daily KPIs (Confirmations, Reschedules, Cancellations, Waitlist Fills)
- Incidents Logged (count + severity)
- Week 1 Report Sent (Y/N)
- Pilot Outcome (Recovered $ estimate, no-show delta, notes)

2) PILOT INVITATION + CONSENT EMAIL (ready to send)
Subject: Free 7-day pilot to reduce appointment no-shows (two-way SMS confirmations)

Hi {{FirstName}},

I’m Bob from Appointment No-Show Reducer. We help appointment-based businesses cut no-shows by sending smart reminders and enabling two-way text confirmations + easy reschedules, plus a simple weekly report showing recovered revenue.

Legitimacy / details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

Offer: I’d like to run a free 7-day concierge pilot for {{BusinessName}}. We’ll:
- Send reminders + two-way confirmations
- Route reschedule requests quickly (and fill gaps from a waitlist if you have one)
- Deliver a weekly value report (confirmations, reschedules, fills, estimated $ recovered)

What we need to start (15 minutes):
1) Your timezone + business hours
2) Typical appointment value (or range)
3) Reminder timing preference (e.g., 24h and 2h)
4) Confirmation/reschedule wording approval
5) SMS consent confirmation (below)

SMS Consent (important):
By replying “I CONSENT”, you confirm that {{BusinessName}} authorizes Appointment No-Show Reducer to send SMS messages to your customers strictly for appointment-related communications (confirmations, reminders, reschedule coordination). You confirm that customers receiving texts have provided consent to receive appointment-related SMS from {{BusinessName}} (or you will collect it prior to sending). Message & data rates may apply. Customers can reply STOP to opt out and HELP for help.

If you’re open to it, reply with 2–3 times that work this week for a quick setup call.

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

3) SMS COPY PACK (safe, clear, two-way; includes STOP/HELP)
Notes:
- Always include business identifier.
- Keep replies constrained to YES / NO / R.
- If reply contains STOP/UNSUBSCRIBE/CANCEL, immediately confirm opt-out.

A) Initial confirmation (sent immediately after booking or at T-24h)
“{{BusinessName}}: Reminder of your appointment on {{Day}}, {{Date}} at {{Time}}. Reply YES to confirm, NO if you can’t make it, or R to reschedule. Reply STOP to opt out.”

B) 24-hour reminder (if not yet confirmed)
“{{BusinessName}}: Your appointment is tomorrow at {{Time}}. Reply YES to confirm, NO to cancel, or R to reschedule. STOP to opt out.”

C) 2-hour reminder (if still not confirmed)
“{{BusinessName}}: Appointment at {{Time}} today. Reply YES to confirm or R to reschedule. If you can’t make it, reply NO. STOP to opt out.”

D) Confirmation received
“{{BusinessName}}: Thanks — you’re confirmed for {{Day}} at {{Time}}. Reply R if you need to reschedule. STOP to opt out.”

E) Reschedule prompt (after user replies R or asks to move)
“{{BusinessName}}: No problem. Reply with a preferred day/time window (e.g., ‘Thu afternoon’) and we’ll coordinate options. STOP to opt out.”

F) Cancellation acknowledged (after NO)
“{{BusinessName}}: Got it — we’ve noted you can’t make it. If you’d like to reschedule, reply R. STOP to opt out.”

G) Waitlist fill offer (when there’s an opening)
“{{BusinessName}}: An earlier opening is available {{Day}} at {{Time}}. Reply YES to take it or NO to pass. STOP to opt out.”

H) HELP handling (when user replies HELP)
“{{BusinessName}}: This number is for appointment messages. Reply YES to confirm, R to reschedule, NO to cancel. Reply STOP to opt out. For assistance, call {{BusinessPhone}}.”

I) Opt-out confirmation (when user replies STOP)
“{{BusinessName}}: You’re opted out and will no longer receive texts about appointments. If this is a mistake, contact {{BusinessPhone}}.”

4) PILOT SUCCESS CRITERIA + BASELINE CAPTURE (one-pager)
Baseline (capture before go-live):
- Last 4 weeks: total appointments, no-shows count, late cancels count, average appointment value (or revenue per slot)
- Current reminder process: none / manual calls / one-way SMS / email
- Target reminder cadence: (e.g., 24h + 2h)

Pilot Week-1 Success Criteria (minimum viable proof):
- Delivery reliability: >98% messages sent without errors; any send failure triggers owner alert
- Compliance: 100% STOP requests honored within 1 message; HELP responses correct
- Outcomes (week 1):
  - Confirmation rate tracked daily
  - Reschedule requests captured + resolved
  - At least 1–3 prevented no-shows or recovered slots (reschedule or waitlist fill)
- Reporting: Weekly value report sent with estimated $ recovered = (Recovered slots) × (avg appointment value)

Operational rule-of-thumb during pilot:
- If intent is unclear, ask a clarifying question once; otherwise escalate to owner/staff.
- For high-confidence keywords: YES/CONFIRM = confirm; NO/CAN’T = cancel/flag; R/RESCHEDULE/MOVE = reschedule flow; STOP/UNSUBSCRIBE = opt-out immediately.

This kit is designed to let us recruit pilots quickly (distribution), launch reliably (product), and produce measurable outcomes in 7 days (path to revenue).