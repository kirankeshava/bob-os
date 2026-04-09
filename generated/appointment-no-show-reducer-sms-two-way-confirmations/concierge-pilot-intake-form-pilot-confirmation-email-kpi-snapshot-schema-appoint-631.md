# Concierge Pilot Intake Form + Pilot Confirmation Email + KPI Snapshot Schema (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:38:02.421Z

---

Below are copy/paste-ready assets to activate 2–3 concierge pilots quickly while keeping QA/reliability tight and outcomes measurable.

============================
1) CONCIERGE PILOT INTAKE FORM (COPY/PASTE)
============================
Subject: Quick Pilot Intake — Appointment No-Show Reducer (5–8 minutes)

Hi! To set up your concierge pilot, please reply with the details below (you can answer inline). If you prefer, you can also email us at agent_bob_replit+no-show-bot@agentmail.to.

Legitimacy page (what clients can reference):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

A) BUSINESS + LOCATION
1. Business name + location name (if multi-location):
2. Address (for timezone verification):
3. Primary contact name + role:
4. Best email + phone for escalations (owner/manager):

B) TIMEZONE + OPERATING HOURS
5. Timezone (e.g., America/Chicago):
6. Business hours by day (Mon–Sun):
7. “Quiet hours” when we should NOT text (e.g., 8pm–8am):

C) APPOINTMENT TYPES + VALUE
8. Services offered (top 3 are enough):
9. Average appointment value ($):
10. Typical appointment duration (minutes):
11. If you have it: current no-show rate estimate (%):

D) REMINDER + CONFIRMATION RULES
12. Reminder schedule (choose one):
   - Option 1: 24h + 2h before
   - Option 2: 48h + 4h before
   - Option 3: custom (specify):
13. Confirmation wording preference (formal / friendly / very short):
14. If client replies YES/CONFIRM: do you want any extra info collected? (e.g., “Please arrive 10 min early”)
15. If client replies NO/CAN’T MAKE IT: should we offer reschedule automatically? (yes/no)

E) RESCHEDULE RULES
16. Reschedule window rules (pick one):
   - Allow reschedule up to X hours before appointment (specify X)
   - Allow reschedule anytime
17. Same-day reschedules: allowed? (yes/no)
18. Who approves reschedules (owner only / front desk / automatic within constraints):

F) WAITLIST RULES (OPTIONAL BUT RECOMMENDED)
19. Do you keep a waitlist today? (yes/no)
20. Waitlist fill strategy:
   - Text waitlist in order until a slot is taken
   - Text a subset (e.g., 10 people) then stop
21. How long should we hold a slot once offered? (e.g., 10 minutes):

G) CONSENT + COMPLIANCE
22. How do you currently collect SMS consent?
   - Checkbox on online booking
   - Intake form
   - Verbal consent
   - Not sure
23. Please confirm you want us to include opt-out language (STOP to opt out) on all messages: (yes/no)
24. Any special compliance constraints (medical/privacy, minors, etc.):

H) INTEGRATION / WORKFLOW (CONCIERGE PILOT OPTIONS)
25. What system do you use today?
   - Calendly / Acuity / Square / Google Calendar / other:
26. For the pilot, choose the integration mode:
   - Mode A (concierge/manual): you send us a daily schedule export (CSV) OR screenshot summary, we run reminders/confirmations
   - Mode B (connected): we connect to your calendar/booking tool (if available)
27. If Mode A: preferred daily handoff time (e.g., 6pm for next-day schedule):

I) SUCCESS METRICS (SO WE CAN REPORT VALUE)
28. Baseline period you want to compare against (last 4 weeks / last 8 weeks / other):
29. Your definition of “no-show” (not arrived within X minutes / didn’t cancel / other):
30. What outcome matters most?
   - Fewer no-shows
   - More confirmations
   - Faster reschedules
   - Filling last-minute gaps

============================
2) PILOT CONFIRMATION EMAIL (NON-LEGAL, READY TO SEND)
============================
Subject: Confirming Your No-Show Reducer Pilot — Next Steps + What to Expect

Hi [Name],

Confirming we’re starting a concierge pilot of Appointment No-Show Reducer for [Business/Location]. Reference page (legitimacy):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Support / contact during the pilot:
agent_bob_replit+no-show-bot@agentmail.to

What we’ll do during the pilot:
1) Send smart SMS reminders and request two-way confirmations (YES/NO).
2) If a client can’t make it, we’ll guide them to reschedule (based on your rules).
3) Optional: when there’s a cancellation, we’ll attempt to fill the gap from your waitlist.
4) Provide a weekly value report with confirmations, reschedules, waitlist fills, and estimated recovered revenue.

Compliance + safety:
- Every message includes opt-out language (reply STOP to opt out).
- We respect quiet hours you specify.
- If anything fails (calendar access issues, messaging errors), we will alert the owner/manager immediately and pause automation until confirmed.

Success metrics we’ll report weekly:
- Total appointments messaged
- Confirmed (YES)
- Cancelled/rescheduled
- No response
- Waitlist offers sent + slots filled
- Estimated recovered revenue (based on your average appointment value)

Next step (today):
Please reply confirming:
- Timezone + quiet hours
- Reminder schedule (e.g., 24h + 2h)
- Reschedule rules
- Escalation contact (name + phone)

Once confirmed, we can go live within 24–48 hours.

Best,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

============================
3) WEEKLY KPI SNAPSHOT SCHEMA (FOR 2–3 PILOTS)
============================
Use the following table fields for each location each week to maintain consistent reporting and sales-proof comparisons.

Location Identifiers
- pilot_location_id
- business_name
- location_name
- timezone
- week_start_date (YYYY-MM-DD)
- week_end_date (YYYY-MM-DD)

Volume + Delivery
- total_appointments_in_scope
- total_messages_sent
- delivery_failures_count
- opt_outs_count
- help_requests_count

Engagement Outcomes
- confirmations_yes_count
- cancellations_no_count
- reschedule_requests_count
- reschedules_completed_count
- no_response_count

Waitlist
- waitlist_offers_sent_count
- waitlist_accepts_count
- gaps_filled_count

Operational Reliability
- incident_count_total
- incident_count_sev1 (automation paused / major failure)
- incident_count_sev2 (partial degradation)
- incidents_notes (short text)

Revenue Proxy (Client Inputs)
- avg_appointment_value_usd
- baseline_no_show_rate_pct (from client)

Computed (Weekly)
- estimated_salvaged_appointments = reschedules_completed_count + gaps_filled_count
- estimated_recovered_revenue_usd = estimated_salvaged_appointments * avg_appointment_value_usd
- confirmation_rate_pct = confirmations_yes_count / total_appointments_in_scope

These fields map directly into the weekly value report and make pilot results comparable across 2–3 locations.
