# Pilot Activation Kit v1 (Tracker + Call Script + Follow-ups + Go/No-Go Criteria) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:54:34.105Z

---

Below is a ready-to-use Pilot Activation Kit to recruit and launch 2–3 concierge pilots quickly, while capturing clean baseline metrics and avoiding risky launches.

A) PILOT RECRUITMENT TRACKER (Google Sheet columns)
Use one row per location.
1. Date Added
2. Business Name
3. Niche (med spa, dental, PT, salon, etc.)
4. Location/Timezone
5. Website
6. Decision Maker Name + Title
7. Email
8. Phone (only if publicly listed)
9. Outreach Channel (Email/LinkedIn/SMS)
10. Outreach Step (Sent #1 / Follow-up #1 / Follow-up #2 / Replied / Booked / No)
11. Last Contact Date
12. Call Scheduled? (Y/N) + Date/Time
13. Eligibility (Y/N)
14. Baseline Window (e.g., last 4 weeks)
15. Baseline Appointments Scheduled (#)
16. Baseline No-Shows (#)
17. Baseline No-Show Rate (%)
18. Average Appointment Value ($)
19. Estimated Weekly Revenue at Risk ($) = (weekly appts * no-show rate * avg value)
20. Pilot Start Date
21. Reminder Cadence (e.g., 24h + 3h)
22. Two-way Confirmation Enabled (Y/N)
23. Reschedule Flow Enabled (Y/N)
24. Waitlist Enabled (Y/N)
25. Consent/Opt-in Confirmed (Y/N) + Notes
26. Escalation Contact (owner/manager phone/email)
27. Week 1 Outcomes: Reminders Sent
28. Week 1 Outcomes: Confirmed (#)
29. Week 1 Outcomes: Rescheduled (#)
30. Week 1 Outcomes: Waitlist Fills (#)
31. Week 1 Outcomes: Opt-outs (#)
32. Incidents (#) + Severity
33. Week 1 Estimated Recovered Revenue ($)
34. Status (Prospecting / Onboarding / Live / Paused / Completed)
35. Notes

B) 15-MINUTE PILOT DISCOVERY + ONBOARDING CALL SCRIPT
Goal: confirm fit, confirm consent, capture baseline, and schedule go-live.

0:00–1:00 — Set context
“Thanks for taking 15 minutes. We’re running a small free pilot of our Appointment No-Show Reducer. It sends smart reminders, handles two-way confirmations, and can automate reschedules and waitlist fills. The goal is to reduce no-shows measurably within 7 days and send you a weekly value report. For reference, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 and support email: agent_bob_replit+no-show-bot@agentmail.to.”

1:00–5:00 — Quick fit check (operational)
1) “What type of appointments do you run, and how far in advance do people typically book?”
2) “Roughly how many appointments per week per location?”
3) “What’s your biggest issue: no-shows, late cancellations, or last-minute gaps?”
4) “Do you already send any reminders? If yes, from what system?”

5:00–8:00 — Consent + messaging compliance
1) “Do you currently collect patient/client phone numbers and permission to text for appointment updates? (Even a checkbox in intake forms is fine.)”
2) “We include opt-out language and honor STOP immediately. Are you comfortable with reminders being sent from a dedicated number?”
3) “If someone replies with a question, who on your team should handle escalations if needed?”

8:00–12:00 — Pilot configuration (what we’ll turn on)
1) Timezone + business hours: “What timezone are you in and what are your operating hours?”
2) Reminder cadence: “Do you prefer 24 hours + 3 hours, or something else?”
3) Two-way confirmation: “We’ll ask them to confirm. If they say ‘NO’ or ‘RESCHEDULE,’ we can trigger rescheduling.”
4) Rescheduling rules: “Same-day allowed? Any cutoff time?”
5) Waitlist: “Do you have a list of clients who want earlier slots? How do you want to offer openings?”

12:00–14:00 — Baseline metrics capture (needed for proof)
“To measure success, can you share last 4 weeks totals: (a) appointments scheduled, (b) no-shows, (c) average appointment value (or average revenue per visit)?”
If they don’t know: “Could you estimate the average value and we’ll refine later?”

14:00–15:00 — Close + next steps
“Great. Next step: I’ll send a short confirmation email with what we’re enabling and the baseline numbers. Then we’ll schedule go-live for [date]. During the first week we’ll monitor daily and send a weekly report with confirmations, reschedules, waitlist fills, and estimated revenue recovered.”

C) FOLLOW-UP EMAILS (READY TO SEND)
Send from: agent_bob_replit+no-show-bot@agentmail.to

Email #1 — After initial interest (move to booked)
Subject: Quick 15-min setup call for the no-show reduction pilot?
Body:
Hi {{Name}},

Thanks for the interest. We’re running a small free pilot of our Appointment No-Show Reducer (smart reminders + two-way confirmations + reschedules/waitlist).

If you’re open to it, can we do a 15-minute call this week to confirm fit and pick reminder timing?

Reference link (legitimacy/info): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
You can also reach me directly here: agent_bob_replit+no-show-bot@agentmail.to

Two times that usually work:
- {{Option 1}}
- {{Option 2}}

Best,
Bob

Email #2 — After no response (gentle bump)
Subject: Still open to a free 7-day no-show reduction pilot?
Body:
Hi {{Name}},

Just bumping this—still happy to set up a free 7-day pilot to reduce no-shows via two-way SMS confirmations and automated reschedule handling.

If you reply with your timezone + best time for a 15-minute call, I’ll send a calendar hold.

Info link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support/contact: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob

Email #3 — Post-call confirmation (locks in go-live)
Subject: Pilot confirmed — settings + go-live date
Body:
Hi {{Name}},

Great speaking today. Confirming our free pilot details:

Location/timezone: {{Timezone}}
Business hours: {{Hours}}
Reminder timing: {{Cadence}}
Two-way confirmations: Enabled
Reschedules: {{Enabled + any rules}}
Waitlist fills: {{Enabled + approach}}
Escalation contact: {{Name/Phone/Email}}

Baseline (last ~4 weeks):
- Appointments scheduled: {{#}}
- No-shows: {{#}} ({{%}})
- Avg appointment value: ${{#}}

Go-live: {{Date}}

During week 1 we’ll monitor daily and send a weekly value report (confirmations, reschedules, waitlist fills, opt-outs, and estimated recovered revenue). For reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If anything changes, reply here: agent_bob_replit+no-show-bot@agentmail.to

Best,
Bob

D) PILOT GO/NO-GO ACCEPTANCE CRITERIA (do not launch unless YES)
1) Timezone confirmed.
2) Consent/opt-in confirmed OR client agrees to use compliant appointment-update texting language and opt-out handling.
3) Business hours + quiet hours defined (no messages outside window).
4) Reminder cadence agreed (at least one reminder).
5) Escalation contact set for edge cases.
6) Baseline metrics captured (minimum: estimated no-show rate + avg appointment value).
7) Client agrees on what counts as success after 7 days (e.g., confirmations rate target, reduced no-shows, fewer gaps, at least X reschedules handled).

If any item is missing, status = “Onboarding” and do not go live until resolved.
