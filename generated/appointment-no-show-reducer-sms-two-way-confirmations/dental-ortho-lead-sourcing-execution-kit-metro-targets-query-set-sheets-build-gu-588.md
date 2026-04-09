# Dental/Ortho Lead Sourcing Execution Kit (Metro Targets + Query Set + Sheets Build Guide + QA Rubric)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:33:45.434Z

---

Below is the execution kit to generate 80–150 qualified dental/ortho leads/day and scale to 400–800/week.

A) PRIORITIZED METRO LIST (TOP 30)
US:
1) New York, NY  2) Los Angeles, CA  3) Chicago, IL  4) Houston, TX  5) Phoenix, AZ
6) Philadelphia, PA  7) San Antonio, TX  8) San Diego, CA  9) Dallas, TX  10) San Jose, CA
11) Austin, TX  12) Jacksonville, FL  13) Fort Worth, TX  14) Columbus, OH  15) Charlotte, NC
16) San Francisco, CA  17) Indianapolis, IN  18) Seattle, WA  19) Denver, CO  20) Washington, DC
21) Boston, MA  22) Nashville, TN  23) Las Vegas, NV  24) Detroit, MI  25) Portland, OR
Canada:
26) Toronto, ON  27) Montreal, QC  28) Vancouver, BC  29) Calgary, AB  30) Ottawa, ON

B) COPY/PASTE SEARCH QUERY SET (GOOGLE MAPS + YELP)
Use one metro at a time; keep radius tight by searching the city name.
Primary:
- "dentist" + {CITY}
- "orthodontist" + {CITY}
- "pediatric dentist" + {CITY}
- "cosmetic dentist" + {CITY}
High-intent scheduling signals:
- "same day dentist" + {CITY}
- "emergency dentist" + {CITY}
- "invisalign" + {CITY}
- "braces" + {CITY}
Operational fit (front desk scheduling):
- "family dental" + {CITY}
- "dental clinic" + {CITY}
Yelp categories:
- Dentists, Orthodontists, Pediatric Dentists (filter: Open Now optional; sort by distance or rating)

C) LEAD LIST SCHEMA (SHEETS TAB: “Leads”) — REQUIRED COLUMNS
1) Lead ID (auto) 
2) Practice Name
3) Specialty (Dental / Ortho / Pedo)
4) City
5) State/Prov
6) Country
7) Phone (main)
8) Website URL
9) Google Maps URL (or Yelp URL)
10) Decision Maker Name (Dr/Owner) — if found
11) Decision Maker Role (Owner/Doctor/Practice Manager/Office Manager)
12) Email 1 (best)
13) Email 1 Source (Website/Contact page/Directory)
14) Email 2 (backup)
15) Contact Page URL
16) Booking Method (Phone / Webform / Online booking)
17) Software Hint (if visible: NexHealth, Dentrix, OpenDental, etc.)
18) Notes (short: “has online booking”, “multi-location”, etc.)
19) Lead Status (dropdown; see CRM stages)
20) Next Touch Date
21) Channel (Cold email / Phone / Upwork / Craigslist / FB)

D) CRM PIPELINE (SHEETS TAB: “CRM”) — STAGES (DROPDOWN)
- New (not contacted)
- Researched (contact info ready)
- Contacted 1
- Contacted 2
- Contacted 3
- Replied — Interested
- Replied — Not now
- Booked Demo
- No-show to demo
- Trial/POC Started
- Closed Won
- Closed Lost

E) SHEETS IMPLEMENTATION GUIDE (FAST BUILD)
1) Create 3 tabs: Leads | CRM | Activity Log.
2) In Leads tab: paste the schema above as headers.
3) Add data validation dropdowns:
   - Specialty: Dental, Ortho, Pedo
   - Lead Status: use stages list above
   - Channel: Cold email, Phone, Craigslist, FB, Upwork
4) Dedupe rule: conditional format highlight duplicates on Website URL + Phone.
5) Required-field QA: conditional format empty cells for Practice Name, City, Phone, Website.
6) CRM tab: reference a row from Leads via Lead ID; add columns: Last Contacted Date, Last Message Sent (1/2/3), Outcome, Next Step.
7) Activity Log: Date | Lead ID | Action | Result | Notes.

F) QA RUBRIC (KEEP BOUNCES/CRAP LOW)
PASS conditions (all must be true):
- Practice is appointment-based dental/ortho (not a supplier, lab, or corporate directory listing)
- Phone present and matches the website location
- Website is valid (loads; not dead)
- At least one of: (a) contact email found, OR (b) named manager/office contact form + phone
- Not obviously corporate multi-brand chain unless the location can decide locally (1–5 locations preferred)

Email quality scoring:
- A: email on website contact page (info@, office@, or named staff)
- B: email found in directory that matches domain
- C: generic form only (still keep, but mark “form-only”)

G) CTA + LEGITIMACY REFERENCES (USE IN ALL OUTREACH)
When you need to prove legitimacy, reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact: agent_bob_replit+no-show-bot@agentmail.to

Suggested CTA line (paste into email/DM/posts):
“If you want, reply ‘YES’ and I’ll send details, or book a quick 10‑min walkthrough. You can also verify we’re live here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2 (contact: agent_bob_replit+no-show-bot@agentmail.to).”

H) BOOKING LINK STANDARD
Default: Calendly (free tier works for a single event type). If Calendly is not chosen yet, use “Reply YES and I’ll send times” as interim CTA.
Free/low-cost alternatives: Google Calendar appointment schedule (Google Workspace users), TidyCal (one-time fee; requires approval if purchased).
