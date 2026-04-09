# Seed Lead List (120) + Metro Query Engine + CRM Import/QA SOP (Dental/Ortho)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:29:29.117Z

---

Below is a ready-to-use seed lead list template (120 rows structure) plus the metro/query engine and a tight QA/import SOP. This is designed so an agent/VA can expand it to 400–800/week while keeping each row actionable for outbound.

BUSINESS LEGITIMACY LINKS (use in outreach):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

A) METRO LIST (Top 30 to pull from Google Maps)
1 New York, NY  2 Los Angeles, CA  3 Chicago, IL  4 Houston, TX  5 Phoenix, AZ
6 Philadelphia, PA  7 San Antonio, TX  8 San Diego, CA  9 Dallas, TX  10 San Jose, CA
11 Austin, TX  12 Jacksonville, FL  13 Fort Worth, TX  14 Columbus, OH  15 Charlotte, NC
16 San Francisco, CA  17 Indianapolis, IN  18 Seattle, WA  19 Denver, CO  20 Washington, DC
21 Boston, MA  22 Nashville, TN  23 Portland, OR  24 Las Vegas, NV  25 Detroit, MI
26 Toronto, ON  27 Vancouver, BC  28 Calgary, AB  29 Montreal, QC  30 Ottawa, ON

B) REPEATABLE GOOGLE MAPS QUERY SET (copy/paste)
Run each query per metro; open listings; capture fields in the schema below.
Primary queries:
- “dentist near [CITY]”
- “family dentistry [CITY]”
- “orthodontist [CITY]”
- “pediatric dentist [CITY]”
High-intent operational queries (often indicates active scheduling):
- “dentist same day appointment [CITY]”
- “dentist online booking [CITY]”
- “orthodontist consultation [CITY]”
Filters/heuristics for prioritization:
- Rating >= 4.0 and reviews >= 20 (signals steady volume)
- Has website (required)
- Mentions “appointments”, “book online”, “text us”, or has forms (signals scheduling workflow)
- 1–5 locations (skip DSOs/corporate chains unless a specific local manager email is present)

C) LEAD LIST SCHEMA (CSV/Sheets columns)
Use exactly these columns so it imports cleanly into the CRM and supports outreach.
- Lead_ID (auto)
- Practice_Name
- Vertical (Dental / Ortho)
- City
- State_Province
- Country
- Address
- Main_Phone
- Website_URL
- Google_Maps_URL
- Decision_Maker_Name (Doctor/Owner if found)
- Decision_Maker_Role (Owner/Dentist/Orthodontist)
- Decision_Maker_Email
- Office_Manager_Name (if found)
- Office_Manager_Email
- Contact_Page_URL
- Contact_Form_URL (if no email)
- Booking_Software_Clue (Zocdoc, Solutionreach, NexHealth, Weave, etc. if visible)
- Notes (e.g., “has online booking”, “multiple providers”, “Spanish-speaking”, etc.)
- Priority (A/B/C)
- Next_Step (Email1 / Call1 / Form / Skip)
- Source (GMaps/Yelp/Directory)
- Date_Added

D) SEED LEAD LIST (120) — CSV-READY FORMAT
Note: Because this environment cannot reliably browse and verify 120 real-world emails/phones live, the seed list is delivered as an immediately-usable compilation framework with the 120-row structure pre-built and the extraction steps below. The fastest operational path is: (1) pull 120–200 listings from Google Maps using the queries above, (2) paste name/phone/website, (3) open each website and capture the best email/contact.

Row template (copy down to 120 rows):
Lead_ID,Practice_Name,Vertical,City,State_Province,Country,Address,Main_Phone,Website_URL,Google_Maps_URL,Decision_Maker_Name,Decision_Maker_Role,Decision_Maker_Email,Office_Manager_Name,Office_Manager_Email,Contact_Page_URL,Contact_Form_URL,Booking_Software_Clue,Notes,Priority,Next_Step,Source,Date_Added
1,,,,,,,,,,,,,,,,,,,,,,,
2,,,,,,,,,,,,,,,,,,,,,,,
3,,,,,,,,,,,,,,,,,,,,,,,
...
120,,,,,,,,,,,,,,,,,,,,,,,

E) FAST EMAIL CAPTURE RULES (what to look for on each practice website)
1) Check footer first: often has a direct email.
2) Check /contact, /about, /team pages for staff emails.
3) If no email, record Contact_Form_URL and proceed with form outreach.
4) If multiple locations, capture the location-specific contact email if present.
5) If only a generic form exists, still keep the lead if phone + website are valid.

F) QA + DEDUPE SOP (so outbound doesn’t stall)
Minimum viable row for outreach (PASS): Practice_Name + City + Main_Phone + Website_URL + (any of: Decision_Maker_Email OR Office_Manager_Email OR Contact_Form_URL).
Fail conditions (SKIP):
- No phone AND no form
- Website is dead/parked
- Corporate chain where you cannot reach a local decision maker
Dedupe rules:
- If Website_URL matches an existing row, merge into one and keep best contact.
- If Main_Phone matches, treat as duplicate unless clearly different location.
Priority rules:
- Priority A: has email + mentions booking/appointments + reviews >= 50
- Priority B: has email or form + some reviews
- Priority C: phone only + low reviews
Next step assignment:
- If email exists: Next_Step=Email1
- If only form: Next_Step=Form
- If phone only: Next_Step=Call1

G) UPWORK FREE-TIER LAUNCH CHECKLIST (for quick revenue while SaaS ramps)
Profile positioning:
- Title: “Reduce Appointment No-Shows (SMS Confirmations + Reschedules) | Dental/Clinic Ops”
- Overview must reference legitimacy URL and contact email.
Saved searches (3):
1) “appointment reminders” OR “sms reminders” OR “no show”
2) “medical receptionist” OR “dental admin” OR “appointment scheduling”
3) “CRM follow up” OR “patient reactivation”
Daily action:
- 3 proposals/day using the existing proposal templates; customize first 2 lines with their niche and pain.

If you want the list to contain 400–800 fully populated, real verified contacts (emails/phones/websites) as a single CSV artifact, the next execution step is mechanical: run the metro query set, export business name/phone/site, then do website contact extraction for email/form URLs until the quota is hit, applying the QA rules above.