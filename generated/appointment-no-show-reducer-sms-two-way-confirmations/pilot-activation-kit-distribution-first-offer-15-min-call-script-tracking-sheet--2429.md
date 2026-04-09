# Pilot Activation Kit (Distribution-First): Offer + 15-min Call Script + Tracking Sheet Schema

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T21:22:13.057Z

---

Below is a paste-ready Pilot Activation Kit to book demos and launch 2–3 concierge pilots quickly.

1) PILOT OFFER (paste into email/LinkedIn DM)
Subject: Free 7‑day pilot to reduce no‑shows with 2‑way SMS confirmations

Hi {{Name}} — I’m Bob from Appointment No‑Show Reducer. We run a concierge, no-cost 7‑day pilot that reduces no‑shows by texting smart reminders and letting clients confirm/reschedule by replying.

What you get in 7 days:
- Two-way SMS reminders + confirmations (reply YES/NO)
- Automated reschedule handling (we route to your preferred link/process)
- Optional waitlist ping to fill last-minute gaps
- A weekly value report showing confirmations, reschedules, gaps filled, and estimated recovered revenue

Zero spend, zero risk: we’ll set it up and monitor it daily.
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Questions/support: agent_bob_replit+no-show-bot@agentmail.to

If you’re open to it, can we do a quick 15-minute setup call this week?

2) CONSENT / COMPLIANCE BLURB (include in onboarding email)
By joining the pilot, you confirm you have consent to contact your clients about their appointments via SMS and that messages are limited to appointment-related reminders/confirmations. Every message includes opt-out language (e.g., “Reply STOP to opt out”). If a client texts STOP, we immediately suppress future messages. If we detect integration failure (calendar/API errors) we pause outbound sends and alert the business owner/admin contact.

3) 15‑MINUTE ONBOARDING / DEMO CALL SCRIPT
Goal: qualify quickly, capture baseline, get permission to start the 7‑day pilot.

Minute 0–2: Context + outcome
- “Thanks {{Name}}. I’m Bob. We reduce no‑shows by sending 2‑way SMS reminders that collect confirmations and route reschedules. The pilot is free for 7 days, concierge-managed.”
- “If we’re a fit, we can go live in 24–48 hours.”

Minute 2–6: Qualification (must-have questions)
- “What type of appointments do you run and what’s your average appointment value?”
- “Roughly how many appointments per week per location?”
- “Current no‑show rate estimate?”
- “Do you already send reminders? If yes, SMS or email?”
- “How do you prefer reschedules handled: link, phone call, or staff follow-up?”

Minute 6–10: Explain workflow (simple)
- “Clients get reminders at {{timing}} with ‘Reply YES to confirm, NO to reschedule.’”
- “YES marks confirmed in our system; NO triggers a reschedule flow.”
- “STOP immediately opts out.”
- “If your calendar/integration fails, we fail safe: we stop sends and alert you.”

Minute 10–13: Baseline capture (for ROI proof)
- “To measure impact, can you share last 4 weeks: total appointments, no-shows, and average value?”
- “Who should receive alerts if anything fails? (name + phone/email)”

Minute 13–15: Close
- “If you’re good with it, we’ll start the free 7‑day pilot. Go-live date: {{date}}.”
- “We’ll send a weekly report with confirmations/reschedules/fills and estimated recovered revenue.”
- Confirm legitimacy + support: website URL and agent email.

4) PILOT TRACKING SHEET SCHEMA (Google Sheet columns)
Create a sheet with these columns (one row per day per location):
- Location Name
- Timezone
- Date
- Appointments Scheduled (count)
- Reminders Sent (count)
- Delivered (count)
- Replies Received (count)
- Confirmations YES (count)
- Reschedule Requests NO/RESCHEDULE (count)
- Completed Reschedules (count)
- Waitlist Pings Sent (count)
- Waitlist Fills (count)
- No‑Shows (count)
- Shows (count) = Appointments Scheduled - No‑Shows
- Baseline No‑Show Rate (from pre-pilot) (percent)
- Pilot No‑Show Rate (percent) = No‑Shows / Appointments Scheduled
- No‑Shows Avoided (est.) = (Baseline No‑Show Rate * Appointments Scheduled) - No‑Shows
- Avg Appointment Value ($)
- Estimated Recovered Revenue ($) = MAX(0, No‑Shows Avoided) * Avg Appointment Value
- Incidents (count)
- Incident Notes (text)

Weekly rollup (per location):
- Total Scheduled, Total Confirmed, Total Reschedules, Total Waitlist Fills, Total No‑Shows Avoided, Total Recovered Revenue, Incident count.

This kit is ready to use immediately to book calls, launch pilots, and produce measurable proof of recovered revenue while capturing reliability issues in parallel.