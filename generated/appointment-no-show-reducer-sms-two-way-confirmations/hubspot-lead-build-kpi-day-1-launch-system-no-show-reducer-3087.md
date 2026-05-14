# HubSpot + Lead Build + KPI: Day-1 Launch System (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T22:22:28.804Z

---

Purpose: start outbound TODAY with a free CRM + repeatable lead capture + daily KPI reporting, to book 40 demos and close 20–25 locations in 30 days.

A) HubSpot Free CRM Setup (30 minutes)
1) Create account (free): use Name Bob Smith, email agent_bob_replit@agentmail.to. Business name: Appointment No-Show Reducer.
2) Create a Deal pipeline named “No-Show Reducer – Outbound”. Stages (in order):
   - New Lead (not contacted)
   - Emailed – No Reply
   - Replied – Qualifying
   - Demo Scheduled
   - Demo Held
   - Trial/Setup Started (7-day free)
   - Closed Won (Location Live)
   - Closed Lost
   - Nurture / Later
3) Create required Contact properties (custom fields) so qualification is consistent:
   - Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
   - City / State
   - Scheduling system (Dentrix, Jane, ChiroTouch, Mindbody, SimplePractice, Other/Unknown)
   - Appointment volume per week (number)
   - No-show rate % (number/unknown)
   - Value per visit $ (number/unknown)
   - Decision maker (Owner/Office Manager/GM/Other)
   - Best phone (already default) + SMS OK? (Yes/No/Unknown)
   - Last touch date (date)
   - Next step (short text)
4) Create Task Queues (to enforce daily blocks):
   - “Daily Email Sends (50–100)”
   - “Daily Calls (20–40)”
   - “Reply Follow-ups (same day)”
   - “Demo Confirmations (24h + 2h)”

B) Lead Capture + Import Template (copy into Google Sheets)
Create a sheet with these columns (exact header row):
1. Company Name
2. Website
3. First Name
4. Last Name
5. Title (Owner/Office Manager/GM)
6. Email
7. Phone
8. City
9. State
10. Vertical
11. Source URL (Google Maps/Yelp/Directory link)
12. Notes (e.g., “online booking”, “2 locations”, “new patient special”)
13. Status (New / Dedupe / Ready to Import)

Dedupe rules:
- Primary key: Website domain; secondary: Phone.
- If multiple contacts per location: keep Owner + Office Manager if available.

Free lead sources + how to pull fast (no paid tools):
1) Google Maps: search queries like:
   - “chiropractor {city}”
   - “dentist {city}”
   - “physical therapy {city}”
   - “med spa {city}”
   - “optometrist {city}”
Open top results, capture company name, phone, website. Then go to website Contact page for email.
2) Yelp: filter by category + city; capture website/phone.
3) Industry directories:
   - ADA dentist directory (where accessible)
   - PT association directories
   - Local chamber of commerce member directories
4) On-site email discovery (free/manual): look for “Contact”, “About”, “Team”, “Privacy”, “Appointments”. Common formats: info@, hello@, admin@, office@, scheduling@.

City cluster guidance (start with 2 clusters = 200 leads):
- Cluster 1: one large metro + surrounding suburbs (100 leads)
- Cluster 2: second metro in same time zone (100 leads)
Mix: 20 leads each across 5 verticals.

C) Demo Booking Link (free)
Use HubSpot Meetings (free) once HubSpot is created:
- Meeting name: “15-min No-Show Reduction Demo (SMS Confirmations + Reschedules)”
- Duration: 15 minutes
- Buffer: 10 minutes
- Working hours: 10am–4pm local time
- Confirmation email includes:
  - Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
  - Reply email: agent_bob_replit+no-show-bot@agentmail.to

D) Daily KPI Report (paste into a doc each day)
DATE:
Leads added today:
Emails sent today:
Calls placed today:
Texts sent today (where compliant):
Email replies (total / positive / neutral / negative):
Demos booked today:
Demos held today:
Trials started today (7-day free setup):
Closed won today:
Key objections heard (top 3):
Notes on list quality / deliverability:
Top 5 next actions for tomorrow:

Definitions (to avoid fuzzy reporting):
- “Demo booked” = calendar invite created + confirmed channel (email/SMS).
- “Demo held” = live conversation occurred (phone/video).
- “Trial/Setup started” = business provided scheduling access or exported appointment list and approved reminder start.

E) Day-1 Execution Blocks (minimum viable)
- 60–90 min: build 50 fresh leads (one vertical, one city).
- 60 min: send 50 plain-text emails (no images, no attachments).
- 60–90 min: 20–30 calls; log outcome + set next task.
- 15 min: post 1 Craigslist ad per city cluster.
- Same-day: handle replies within 2 hours; push to Meetings link; confirm demo with the legitimacy URL and agent email.

All outbound must reference:
- Website (legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to
