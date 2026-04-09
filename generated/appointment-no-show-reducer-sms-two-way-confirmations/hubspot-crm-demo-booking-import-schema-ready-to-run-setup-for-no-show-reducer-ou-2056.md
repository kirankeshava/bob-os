# HubSpot CRM + Demo Booking + Import Schema (Ready-to-Run Setup for No-Show Reducer Outbound)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T19:29:18.660Z

---

Below is the exact operational setup to run outbound from HubSpot Free for the Appointment No-Show Reducer (two-way SMS confirmations + reschedules + waitlist fill).

1) HUBSPOT PIPELINE (Deals or Leads pipeline)
Use one pipeline named: “No-Show Reducer – Locations”. Stages:
1. New Lead (uncontacted)
2. Contacted (1st touch sent/call attempted)
3. Replied (any response, positive or negative)
4. Demo Booked (meeting scheduled)
5. Demo Held (call completed)
6. Trial/Setup (Free) (7-day free setup running)
7. Won (Paying) (converted after trial)
8. Lost (not a fit / no response / competitor)

Stage exit criteria:
- Contacted: at least 1 email OR 1 call logged.
- Replied: any email reply, voicemail returned, or inbound form.
- Demo Booked: calendar invite exists.
- Demo Held: demo completed; next step scheduled.
- Trial/Setup (Free): business connected/forwarded reminders, messaging copy approved, first reminders sent.
- Won: payment collected after week-1 (later—do not collect in week 1).

2) REQUIRED CONTACT/COMPANY PROPERTIES (create custom fields)
Company:
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City
- Location count
- Scheduling system (Zocdoc, NexHealth, Calendly, JaneApp, PracticeMgmt, Other)
- Appointments per week (number)
- No-show rate % (number)
- Avg value per visit $ (number)
- Estimated monthly recovered revenue $ (calc manually in notes)
- Current reminder method (None/Manual calls/One-way SMS/Email only)
- Waitlist used? (Yes/No)
Contact:
- Role (Owner/Office Manager/Front Desk/GM)
- Decision maker? (Yes/No)
- Best phone
- Best email
- Compliance notes (ONLY text if opt-in exists)

Activity/Deal fields:
- Last touch date
- Next step date
- Objection (Price/Busy/Already have solution/No SMS/Other)
- Outcome (Booked demo / Not interested / Follow-up)

3) HUBSPOT MEETINGS LINK (DEMO BOOKING)
Create a meeting type: “15-min No-Show Audit (Free)”. Settings:
- Duration: 15 minutes
- Availability: 2 blocks/day (e.g., 11:00–1:00 and 3:00–5:00)
- Questions (form): appointments/week, no-show %, scheduling tool, best # for reminders.
Add this booking link to every positive reply.

4) HUBSPOT IMPORT SCHEMA (CSV COLUMNS)
Prepare a CSV with these headers (minimum viable):
- Company name
- Website URL
- Company phone
- City
- State
- Vertical
- Contact first name
- Contact last name (if unknown, leave blank)
- Contact role/title
- Contact email
- Contact phone (if different)
- Source (Google Maps / Website / Yelp / Association)
- Notes (hours, “book online” link, any observed reminder language)

Rules:
- If no email is found, still import (phone + website). Use calls first; then use website contact form.
- Dedupe by website domain + phone.

5) DAY-1 OUTBOUND TASK QUEUE (IN HUBSPOT)
Create 3 task queues:
A) Email – First Touch (50–100/day)
B) Calls – First Dial (20–40/day)
C) Follow-ups – Replies/No reply (daily)

6) FIRST-TOUCH EMAIL SIGNATURE (include legitimacy assets)
—
Bob
Appointment No-Show Reducer (SMS confirmations + reschedules)
Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

7) KPI LOGGING (DAILY)
Track daily totals:
- Emails sent
- Calls placed
- Replies (positive/neutral/negative)
- Demos booked
- Demos held
- Trials started (free)
- Conversions (post-week-1)

If you follow the pipeline + import schema above, we can start today by importing the first 200 leads, running the first email/call blocks, and immediately moving any responders into Demo Booked with the HubSpot Meetings link. All outbound templates should reference the legitimacy URL and route responses to agent_bob_replit+no-show-bot@agentmail.to.