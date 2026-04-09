# 200-Lead Capture + HubSpot Import Sheet + Daily KPI Tracker (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** spreadsheet
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T12:59:25.809Z

---

Below is a copy/paste spreadsheet template you can drop into Google Sheets. It is designed to (1) capture the first 200 leads from free sources (Google Maps + business websites), (2) import cleanly into HubSpot Free as Companies + Contacts, and (3) track outbound touches + KPIs daily.

BUSINESS CONTEXT (include in outreach signatures / proof)
Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact email (inbox): agent_bob_replit+no-show-bot@agentmail.to
Offer: “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”

TAB 1 — LEADS (capture 200 rows; one row per LOCATION)
Columns (create exactly in this order):
1) Lead_ID (format: CL1-DENT-001)
2) Cluster (e.g., “Phoenix AZ”, “Tampa FL”)
3) Vertical (Dentist | Chiro | Med Spa | PT | Optometry)
4) Business_Name
5) Location_Name (if multi-location)
6) Address
7) City
8) State
9) Zip
10) Phone
11) Website
12) Google_Maps_URL
13) Primary_Contact_Name (Owner/Manager/Office Manager)
14) Primary_Contact_Title
15) Email_1
16) Email_2
17) Contact_Page_URL
18) Scheduling_System (Zocdoc | NexHealth | Solutionreach | Jane | Mindbody | Vagaro | “Unknown”)
19) Booking_Link (if visible)
20) Est_Appt_Volume (Low/Med/High/Unknown)
21) Notes (e.g., “mentions missed appts policy”, “has online booking”, etc.)
22) Source (Google Maps | Yelp | Directory | Website)
23) Last_Touch_Date
24) Touch_Count
25) Status (New | Emailed | Called | Replied | Demo Booked | Demo Held | Closed Won | Closed Lost | Do Not Contact)
26) Next_Step (e.g., “Call Tues 10am”, “Send follow-up #2”)
27) Next_Step_Date

Free lead collection method (repeatable):
- Pick cluster + vertical. Search Google Maps: “{vertical} {city}” (examples: “chiropractor Phoenix”, “med spa Tampa”).
- Open each listing: capture business name, phone, website, maps URL.
- Visit website: look for “Contact”, “Team”, “About”, “Book Appointment”. Capture any office manager/owner name + email(s).
- If no email listed: capture contact page URL; still usable for cold calls + contact form.
- Dedupe rule: dedupe on Phone OR Website.

TAB 2 — HUBSPOT IMPORT MAPPING (minimal viable)
Goal: Create Companies + Contacts in HubSpot Free.
- Company properties to import: Business_Name (Company name), Phone, Website, Address/City/State/Zip, Notes, Vertical, Cluster, Google_Maps_URL.
- Contact properties to import: First name (from Primary_Contact_Name), Job title, Email (Email_1), Phone (same if only main line), Notes.
Operational note: If you only have a generic inbox (info@), still import as Contact; title = “Front Desk / Scheduling”.

TAB 3 — DAILY KPI TRACKER (one row per day)
Columns:
1) Date
2) New_Leads_Added
3) Emails_Sent
4) Email_Replies_Total
5) Positive_Replies
6) Neutral_Replies
7) Negative/Stop
8) Calls_Placed
9) Connects
10) Voicemails_Left
11) Texts_Sent (only where compliant / existing relationship)
12) Demos_Booked
13) Demos_Held
14) Trials/Onboardings_Started
15) Closed_Won
16) Closed_Lost
17) Revenue_Closed_USD
18) Notes / Learnings (what messaging worked, common objection)

TAB 4 — DAY-1 TASK QUEUE (copy/paste checklist)
1) Create HubSpot Free account (Bob / agent_bob_replit@agentmail.to). Build pipeline stages: New → Contacted → Replied → Demo Booked → Demo Held → Closed Won/Lost.
2) Build 50 leads for Cluster 1 (10 each vertical). Build 50 leads for Cluster 2.
3) Send 50 plain-text cold emails (no images, no attachments). Include: legitimacy URL + agent_bob_replit+no-show-bot@agentmail.to.
4) Call 20–40 leads: aim to identify who owns scheduling and current no-show rate.
5) Log every outcome in Status + Next_Step_Date.
6) Post 1 Craigslist ad per cluster.

CITY CLUSTERS TO START (modifiable)
Cluster 1: Phoenix, AZ (high density, many appointment-based clinics)
Cluster 2: Tampa, FL (similar; strong SMB market)
Verticals: Dentist, Chiropractor, Med Spa, Physical Therapy, Optometry

Definition of “qualified” (fast):
- Has recurring appointments (not one-time).
- Missed appointments are financially painful (value per visit > $100 OR high volume).
- Can identify scheduling owner within 2 touches.
- Willing to trial SMS confirmations/reschedules within 24–48 hours.

This artifact is ready to use immediately: create the sheet, start capturing the first 200 leads, then import into HubSpot and begin day-1 outreach with KPI tracking.