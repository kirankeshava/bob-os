# HubSpot CRM Build Spec + Import Columns + Day-1 KPI Sheet (Ready to Paste)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T15:00:16.004Z

---

Below is the exact HubSpot setup + import format to run daily outbound for the Appointment No-Show Reducer (two-way SMS confirmations + instant reschedules + waitlist fill). This is designed for speed: minimum fields, consistent logging, and rapid demo booking.

1) HUBSPOT PIPELINE (Deals)
Pipeline name: No-Show Reducer Outbound
Stages (in order):
- New Lead (no outreach yet)
- Contacted (at least 1 email/call)
- Replied (any response)
- Demo Booked (calendar invite sent)
- Demo Held (completed demo)
- Closed Won (paid)
- Closed Lost (not a fit / no budget)
- Nurture (future follow-up)

2) REQUIRED CUSTOM PROPERTIES (Contacts or Deals)
Create these as single-line text/number/dropdown:
- Appointment Volume / month (number)
- Estimated No-Show % (number)
- Avg $ Value per Visit (number)
- Scheduling System (dropdown: Dentrix, Jane, Mindbody, SimplePractice, Athena, Epic, Other/Unknown)
- Decision Maker Role (dropdown: Owner, Office Manager, Practice Manager, GM, Other)
- Multi-location? (dropdown: Yes/No)
- City (text)
- Lead Source (dropdown: Google Maps, Directory, Craigslist inbound, FB Group, Referral, Other)
- Last Touch Channel (dropdown: Email, Call, SMS, Craigslist, FB Group)
- Next Step Date (date)
- Recovered Revenue Estimate / month (number; computed manually as: Appts/mo × no-show% × $/visit × expected reduction%)

3) IMPORT TEMPLATE (CSV COLUMNS)
Use exactly these columns for a clean HubSpot import:
- Company Name
- Website URL
- Main Phone
- City
- State
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry)
- Contact First Name
- Contact Last Name
- Contact Title
- Contact Email
- Decision Maker Role
- Scheduling System
- Appointment Volume / month
- Estimated No-Show %
- Avg $ Value per Visit
- Lead Source
- Notes (short: e.g., “Uses online booking; 3 locations; weekend hours”)
- Deal Name (format: {Company} – No-Show Reducer)
- Deal Stage (start as New Lead)
- Next Step Date

4) DAY-1 KPI REPORT (DAILY COPY/PASTE)
Date:
Emails sent:
Calls placed:
Texts sent (compliant only):
Craigslist posts live:
FB value posts/comments:
Replies (total):
Positive replies:
Demos booked:
Demos held:
Closed won:
Closed lost:
Top objections today (bullet list):
What worked today (bullet list):
Fix tomorrow (one sentence):

5) STANDARD OUTBOUND SIGNATURE (ADD TO EMAIL)
Bob Smith
No-Show Reducer (Two-way SMS Confirmations)
Legitimacy / overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

6) DEMO BOOKING CTA (USE IN REPLIES)
“Happy to show you. Here’s my calendar—grab any 15-min slot that works: [HubSpot Meetings Link]. If you prefer, reply with 2 times and I’ll send an invite.”

This setup keeps the system lightweight while still capturing the qualification inputs needed to quantify ROI (recovered revenue per location) and to prioritize who gets called/texted first. Next operational step is to build/import the first 200 leads (2 city clusters) and execute Day-1: 50–100 emails + 20–40 calls with strict logging and next-step dates in HubSpot.