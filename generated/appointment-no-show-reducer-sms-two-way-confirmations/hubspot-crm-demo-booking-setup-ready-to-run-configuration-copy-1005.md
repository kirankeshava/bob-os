# HubSpot CRM + Demo Booking Setup (Ready-to-Run Configuration + Copy)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T11:51:22.576Z

---

Below is the exact HubSpot Free CRM configuration and copy to run outbound for the Appointment No-Show Reducer.

1) PIPELINE (Deals)
Pipeline name: No-Show Reducer – Outbound
Stages (in order):
- New Lead (not touched)
- Contacted (email/call/text sent)
- Replied (any reply or live conversation)
- Demo Booked (meeting scheduled)
- Demo Held (completed)
- Proposal Sent (Stripe link / terms sent)
- Closed Won (paid location)
- Closed Lost (no fit / timing / competitor)

Stage exit criteria (fast qualification):
- Move to Replied only if a human response occurs.
- Move to Demo Booked only if meeting is on the calendar.
- Move to Demo Held only after the call ends.
- Move to Proposal Sent only after sending payment link or written next steps.

2) REQUIRED FIELDS (Contact + Deal properties)
Capture these on first touch / first reply:
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City + State
- Phone
- Website
- Decision maker role (Owner/Office Manager/GM)
- Scheduling system (Zocdoc/ChiroTouch/Mindbody/Square/Acuity/Other/Unknown)
- Appt volume per week (range ok)
- No-show rate estimate (%)
- Avg value per visit ($)
- Notes (free text)
- Last touch date
- Next step date
- Outcome tag (Interested / Not now / No fit / Wrong person / Do not contact)

3) TASK QUEUES (daily execution)
Create three repeating task blocks:
A) Email Day-1: send first touch to 50–100 prospects (stagger morning/afternoon).
B) Call Block A: 10–20 calls to the same-day emailed list (2–4 hours after send).
C) Call Block B: 10–20 calls to prior-day non-responders + leave voicemail.
Logging rule: every touch gets an activity note with the template: “Touch type / date / outcome / next step date”.

4) HUBSPOT MEETINGS LINK (demo booking)
Meeting name: No-Show Reduction Demo (15 min)
Duration: 15 minutes
Availability: weekdays (set as needed)
Location: Google Meet / Zoom / phone

Calendar invite description (paste into the meeting description):
“Thanks for booking. We’ll walk through how two-way SMS confirmations + instant reschedules + waitlist fill reduces no-shows (typically within 7 days). Please be ready with: (1) approx appointments/week, (2) no-show rate estimate, (3) what system you schedule in (e.g., Mindbody/Square/Acuity/Zocdoc). If you need anything, email agent_bob_replit+no-show-bot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

5) OUTBOUND SIGNATURE (use in all emails)
—
Bob
Appointment No-Show Reducer
Two-way SMS confirmations • Reschedules • Waitlist fill
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

6) LEAD IMPORT FORMAT (CSV columns)
Use these columns for manual sourcing + import:
- Company Name
- Website
- City
- State
- Vertical
- Contact First Name (if known)
- Contact Last Name (if known)
- Title (Owner/Office Manager/etc.)
- Email
- Phone
- Source URL (Google Maps / directory link)
- Notes
Dedupe rule before import: if Website domain matches OR Phone matches an existing record, skip.

This setup is intentionally minimal so we can start sending today, book demos quickly, and only add complexity after the first 5–10 closes.