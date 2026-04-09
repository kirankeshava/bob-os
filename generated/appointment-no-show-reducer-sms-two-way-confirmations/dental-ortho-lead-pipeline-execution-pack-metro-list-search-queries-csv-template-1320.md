# Dental/Ortho Lead Pipeline Execution Pack (Metro List + Search Queries + CSV Template + Enrichment & QA SOP)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:57:49.695Z

---

Purpose: generate 80–150 qualified dental/ortho leads/day (400–800/week) with phone + decision-maker contact details, ready to load into the CRM and begin outreach. This pack is designed to be executed by Bob or a VA.

A) PRIORITIZED METRO LIST (TOP 30)
US:
1) New York, NY  2) Los Angeles, CA  3) Chicago, IL  4) Houston, TX  5) Phoenix, AZ
6) Philadelphia, PA  7) San Antonio, TX  8) San Diego, CA  9) Dallas, TX  10) San Jose, CA
11) Austin, TX  12) Jacksonville, FL  13) Fort Worth, TX  14) Columbus, OH  15) Charlotte, NC
16) San Francisco, CA  17) Indianapolis, IN  18) Seattle, WA  19) Denver, CO  20) Washington, DC
21) Nashville, TN  22) Oklahoma City, OK  23) Las Vegas, NV  24) Portland, OR  25) Baltimore, MD
Canada:
26) Toronto, ON  27) Montreal, QC  28) Vancouver, BC  29) Calgary, AB  30) Ottawa, ON

Why these: high density of independent practices, high appointment volume, and high no-show sensitivity.

B) REPEATABLE SEARCH QUERIES (GOOGLE MAPS + YELP)
Goal: find independent practices (1–5 locations) with appointment scheduling.

Google Maps queries (run each per metro, then zoom slightly and repeat):
1) “dentist near [CITY]”
2) “family dentistry [CITY]”
3) “cosmetic dentist [CITY]”
4) “orthodontist [CITY]”
5) “pediatric dentist [CITY]”
6) “dental implant [CITY]”
7) “invisalign [CITY]”

Yelp queries:
- Category: Dentists; Orthodontists; Pediatric Dentists
- Location: [CITY]
- Filter: Rating 3.5+ (optional); “Open Now” optional

Inclusion rules:
- Has a working phone number
- Has website OR a booking link OR clear appointment call-to-action
- Avoid: DSO mega-brands (Heartland, Aspen, Pacific, etc.) unless local manager contact is visible and location-level decisions are possible

C) DAILY LEAD PULL WORKFLOW (80–150/DAY)
1) Pick 2 metros/day (e.g., Dallas + Austin). Spend ~60–90 minutes each.
2) Google Maps: open query, list businesses with:
   - Name
   - Address/city
   - Phone
   - Website
   - Notes: “online booking” yes/no; “multi-location” yes/no
3) Click website → find “Contact”, “Team”, “About”, “Meet the Doctor”, “Staff”, “Locations”. Capture:
   - Decision maker name: Doctor/Owner OR Practice Manager/Office Manager
   - Email (best) and/or contact form URL
4) Optional secondary enrichment (manual, free):
   - Site search in Google: "[domain]" + ("@" OR “contact” OR “office manager” OR “practice manager”)
   - Look for PDF forms that contain emails.
5) QA before adding to CRM:
   - Phone matches Google listing
   - Website loads
   - City/state correct
   - If email missing: mark “Email Status = Missing” and still keep lead (phone-first cadence can work)

Time expectation: 3–6 minutes/lead once you’re moving.

D) LEAD LIST CSV TEMPLATE (COPY/PASTE HEADERS)
Use exactly these headers (1 row per location):
- Lead_ID
- Business_Name
- Practice_Type (Dental / Ortho / Pediatric / Cosmetic)
- Location_Count (1 / 2-5 / 6+ / Unknown)
- Address
- City
- State_Prov
- Postal_Code
- Country
- Primary_Phone
- Website_URL
- Booking_URL (if visible)
- Google_Maps_URL
- Yelp_URL
- Decision_Maker_Name
- Decision_Maker_Role (Owner/Doctor / Office Manager / Practice Manager / Front Desk / Unknown)
- Decision_Maker_Email
- Alt_Email
- Contact_Form_URL
- SMS_Consent_Risk (Low/Med/High) (High if no published business number or unclear)
- Notes (e.g., “uses NexHealth”, “has online booking”, “2 locations”, “new patient promo”)
- Source (GMaps/Yelp/Directory)
- Date_Sourced
- Outreach_Stage (New / Attempting Contact / Engaged / Demo Booked / Trial / Won / Lost)
- Next_Step_Date
- Last_Touch_Channel (Email/SMS/Call/FB/Upwork)

Data validation rules (simple):
- Practice_Type must be one of: Dental, Ortho, Pediatric, Cosmetic, Multi
- Decision_Maker_Role must be one of: Owner/Doctor, Office Manager, Practice Manager, Front Desk, Unknown
- Outreach_Stage dropdown as listed above
- Date fields in YYYY-MM-DD

E) MANUAL ENRICHMENT PLAYBOOK (OWNER/MANAGER EMAIL)
Fast paths on practice websites:
1) Footer: look for “info@domain”, “office@domain”, “hello@domain”
2) Contact page: often lists direct emails for front desk or manager
3) Team page: sometimes shows “Practice Administrator” or “Office Manager” with email
4) New patient forms: PDFs sometimes contain staff email addresses
Role labeling standard:
- If doctor’s name appears with “DDS/DMD/Orthodontist” and practice named after them → Decision_Maker_Role = Owner/Doctor
- If you find “Office Manager/Practice Manager/Administrator” → use that over generic inbox
- If only “info@” found → role = Unknown, name blank

F) QA CHECKLIST (BEFORE OUTREACH)
Minimum viable lead:
- Business_Name + City/State + Primary_Phone + Website OR Google_Maps_URL
Best lead (prioritize first):
- Decision_Maker_Email present AND Decision_Maker_Role = Office Manager OR Owner/Doctor
Disqualify:
- Phone missing AND no website
- Clearly a corporate DSO with centralized contact only (unless location manager email exists)

G) CRM OPERATING RULES (WHAT TO WORK FIRST)
Daily priority order:
1) Engaged replies (respond same day)
2) Demo Booked (confirm + prep)
3) Attempting Contact with email present (highest likelihood)
4) Phone-only leads (call/SMS first)
Recycling:
- If no response after full cadence, move to “Nurture/Recycle” and retry in 30–45 days with a new angle (recovered revenue + waitlist fill).

Legitimacy reference (include in outreach when helpful): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Primary contact email for replies: agent_bob_replit+no-show-bot@agentmail.to
