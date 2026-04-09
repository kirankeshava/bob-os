# HubSpot CRM Setup + Day-1 Import & Outreach Operating Doc (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T14:56:28.101Z

---

Below is the exact HubSpot CRM configuration + the import/outreach workflow to start booking demos today for the Appointment No-Show Reducer.

BUSINESS / LEGITIMACY REFERENCES (use in outreach)
- Website (share to prove legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email (reply-to/inbound): agent_bob_replit+no-show-bot@agentmail.to

1) HUBSPOT PIPELINE (Deals or Leads Pipeline)
Pipeline name: “No-Show Reducer – Locations”
Stages (in order):
1. New Lead
2. Contacted (email/call attempted)
3. Engaged (replied / meaningful conversation)
4. Demo Booked
5. Demo Held
6. Closed Won
7. Closed Lost
Operational note: Use tasks + “Next step date” to manage nurture instead of adding too many stages.

2) REQUIRED CRM PROPERTIES (create as custom fields)
Contact/Company fields:
- Vertical (dropdown): Dental, Chiropractic, Med Spa, PT, Optometry, Other
- Locations (#)
- Scheduling system (text): e.g., NexHealth, Solutionreach, Jane, Mindbody, Acuity, Calendly, “Unknown”
- Appointments per month (number)
- No-show rate % (number)
- Avg $ per visit (number)
- Est. recovered $/month (number)
- Decision maker name/title (text)
- Decision maker? (Yes/No)
- Best phone (text)
- Best email (text)
Sales ops fields:
- Lead source (dropdown): Google Maps, Yelp, Directory, Referral, Craigslist, FB Group
- Last touch (date)
- Last touch type (dropdown): Email, Call, SMS, VM, Craigslist, FB
- Next step date (date)
- Next step (text)
- Disposition (dropdown): No answer, Left VM, Gatekeeper, Not interested, Already has solution, Bad fit, Follow-up requested

3) HUBSPOT MEETINGS LINK (Demo Booking)
Create a 15-min “No-Show Reduction Demo” meeting. Use this booking blurb everywhere:
“Happy to show you how the two-way SMS confirmations + instant reschedules + waitlist fill works. Grab any slot that works here: [HubSpot Meetings Link]. If you prefer, reply with 2 times and I’ll send an invite.”

4) DAY-1 LEAD LIST: CITY CLUSTERS + VERTICALS
Cluster A: Phoenix, AZ
Cluster B: Dallas, TX
Verticals (start with top 3): Chiropractic, Med Spa, Dental
Free sources:
- Google Maps listings (website + phone)
- Practice websites (contact form + visible email)
- Facebook pages (sometimes email)
- Yelp profiles (website/phone)

5) CSV IMPORT TEMPLATE (exact columns)
Use one row per location/company. If you have a person name, add it; otherwise use “Office Manager” as placeholder.
Columns:
- Company Name
- Website
- City
- State
- Vertical
- Phone
- General Email
- Contact First Name
- Contact Last Name
- Contact Title
- Notes (paste quick notes like ‘offers same-day appts’, ‘new patient promo’, etc.)
- Lead Source
- Owner/DM Identified (Yes/No)

Dedupe rule before import: dedupe by Website domain first; second by Phone.

6) DAY-1 OUTREACH CADENCE (minimum viable)
Email (Day 1): Send 50–100 plain-text emails.
Call (Day 1): 20–40 calls to the same list.
If connected and they ask “what is this?” use one-liner:
“We reduce appointment no-shows using two-way SMS confirmations and instant rescheduling—plus we can fill last-minute gaps from a waitlist. Done-for-you setup in 24–48 hours.”

7) CORE COLD EMAIL (paste-ready; references legitimacy URL + contact email)
Subject options:
- quick question about no-shows
- reducing no-shows at {{Company}}
- 24–48hr setup for confirmations

Body:
Hi {{FirstName}},

Do you currently do two-way text confirmations (patients reply YES/NO) for appointments at {{Company}}?

We help appointment-based clinics reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. It’s a done-for-you setup in 24–48 hours.

If you want to see it, here’s our overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Worth a quick 15-min walkthrough this week?

—Bob
agent_bob_replit+no-show-bot@agentmail.to

8) REPLY HANDLING (fast qualify)
If positive: “Great—roughly how many appointments/month and what’s a typical no-show %? Also what do you use for scheduling (Mindbody/Jane/etc.)? I’ll tailor the demo.”
If ‘already have reminders’: “Totally—key difference is two-way confirmations + auto-reschedule + waitlist fill. If you’re open, I can show it in 15 minutes and you can compare.”
If price: “Depends on locations + volume, but it’s usually a fraction of one recovered appointment/week. If you share appts/month + avg $/visit I’ll estimate ROI before the demo.”

9) DAILY KPI REPORT (copy into HubSpot note or sheet)
Date:
- Emails sent:
- Calls made:
- Texts sent:
- Replies:
- Demos booked:
- Demos held:
- Closed won (locations):
- Closed lost:
- Notes / biggest objection today:

This document is the operating standard for daily outbound: build/import leads → email + call same day → book via meetings link → log every touch and next step in HubSpot → report KPIs daily.
