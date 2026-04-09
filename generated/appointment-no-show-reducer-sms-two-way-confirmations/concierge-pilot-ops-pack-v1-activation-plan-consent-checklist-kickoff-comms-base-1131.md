# Concierge Pilot Ops Pack v1 (Activation Plan + Consent Checklist + Kickoff Comms + Baseline Form)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:49:49.806Z

---

Concierge Pilot Ops Pack v1 — Appointment No-Show Reducer (SMS + Two-Way Confirmations)

Legitimacy link to share with every prospect/client:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support/ops email (clients can reply here anytime):
agent_bob_replit+no-show-bot@agentmail.to

1) 5-Day Pilot Activation Plan (distribution-first)
Goal: get 2–3 locations live (concierge) and produce Week-1 proof (no-show reduction and/or recovered revenue).

Day 1–2: Outreach + booking
- Send 30 targeted emails (med spa, dental, PT/chiro, salons, clinics) offering a 7-day pilot.
- CTA: “Reply ‘pilot’ and your timezone + booking system.”
- Book 15-min onboarding call.

Day 2–3: Onboarding + consent + baseline
- Collect Day-0 baseline (form below).
- Confirm consent language + opt-out handling (checklist below).
- Configure reminder timings (default: 24h + 2h) and confirmation flow.

Day 3–4: Go-live (concierge)
- Start with one appointment type / one provider if needed.
- Turn on two-way confirmations + reschedule routing rules.
- Owner escalation contact required for failures.

Day 5–7: Monitor + iterate
- Daily check: delivery, replies, confirmations, reschedules, opt-outs.
- Patch rule-based keyword overrides if AI misclassifications appear.

End of Day 7: Weekly Value Report
- Send report with baseline vs pilot metrics and estimated recovered revenue.
- Ask to convert to paid month 1 (or extend pilot only if data incomplete).

2) Pilot Agreement + Consent Checklist (must confirm before SMS starts)
Purpose: reduce legal/compliance risk and avoid pilots failing due to unclear responsibilities.

Client must confirm (email confirmation is sufficient for pilot):
A. Messaging consent
- Client confirms they already collect patient/customer mobile numbers as part of booking.
- Client confirms they have consent to send appointment-related texts (transactional reminders) OR will update their intake/booking language during pilot.
- Client understands messages include opt-out language and that STOP must immediately halt reminders.

B. Opt-out + help compliance
- System includes STOP to opt out and HELP for help.
- Client agrees not to manually text opted-out numbers using the system.
- Client provides a staff contact for handling HELP escalations if needed.

C. Content boundaries
- No sensitive medical details in messages; use generic appointment language.
- No marketing blasts during pilot—transactional reminders only.

D. Operational responsibilities
- Client provides correct timezone, business hours, and reschedule policy.
- Client provides escalation contact (owner/manager) for incidents.
- If calendar/booking system is inaccurate, pilot results may be impacted.

E. Success criteria (agreed up front)
- Primary: increase confirmations and reduce no-shows.
- Secondary: increase reschedules (instead of silent no-shows) and fill gaps from waitlist if used.

3) “Pilot Live” Kickoff Email (send after onboarding)
Subject: Your No-Show Reducer pilot is live — what to expect this week

Hi {{OwnerName}},

Thanks — your 7-day pilot is now live.

Here’s the quick overview:
- We’ll send smart reminders and collect two-way confirmations.
- If someone can’t make it, we’ll guide them to reschedule (instead of no-showing).
- You’ll get a weekly value report showing confirmations, reschedules, and estimated recovered revenue.

Important links/contacts:
- Business page (for reference/legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to

Escalation during pilot:
- If you notice anything odd (wrong timing, wrong patient names, duplicate reminders), reply to this email with “URGENT” and a screenshot. We will pause messages if needed and fix the rule before continuing.

What we’ll monitor daily:
- Delivery rate
- Reply/confirmation rate
- Reschedule requests
- STOP/HELP compliance

If you reply with “Approved” we’ll proceed under the consent/opt-out rules we reviewed and run the pilot through {{EndDate}}.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

4) Staff One-Pager (Front Desk / Manager)
Title: What to do when patients/customers reply to reminders

What the system does:
- Sends reminders before appointments.
- Lets the customer reply to confirm or indicate they need to reschedule.

How to handle common replies:
- “YES / Y / CONFIRM / OK” → No action needed; appointment is confirmed.
- “NO / CAN’T / CANCEL” → We will route to reschedule instructions (or notify you). If you see a cancellation, offer the next available slot.
- “RESCHEDULE / CHANGE TIME” → Treat as a reschedule request; prioritize moving them rather than losing them.
- “STOP” → Customer opts out. Do not text them further from the system.
- “HELP” → Escalate to manager/owner; reply via normal business process.

If something looks wrong:
- Wrong time/timezone, wrong name, duplicate reminders, or message sent outside business hours:
Email agent_bob_replit+no-show-bot@agentmail.to with subject “URGENT Pilot Issue” and include the phone number + screenshot.

5) Day-0 Baseline Capture Form (3 minutes)
Ask client to reply by email with answers (copy/paste):
1) Business name + location:
2) Timezone:
3) Booking system / calendar used (e.g., Square, Calendly, Acuity, Google Calendar, Jane, etc.):
4) Avg appointments per week (approx):
5) Current no-show rate (last 4 weeks, % or rough estimate):
6) Avg revenue per appointment ($):
7) Typical reminder process today (none / call / manual text / automated):
8) Your reschedule policy (how close to appt can they reschedule?):
9) Best escalation contact (name + phone/email):
10) Any appointment types to exclude from texting?

Computation we’ll use in weekly report (transparent):
Estimated recovered revenue/week = (Baseline no-shows/week − Pilot no-shows/week) × Avg revenue per appointment.
If baseline no-shows/week is unknown, we’ll estimate using (Avg appts/week × baseline no-show %).

This pack is ready to use to recruit and activate 2–3 concierge pilots quickly while preserving compliance, reliability, and measurable outcomes.