# Daily Lead Sourcing Engine (Dental/Ortho) — Metro Targets, Query Sets, Enrichment Workflow, and Lead Sheet Template

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:47:19.285Z

---

Below is a ready-to-run lead sourcing engine to produce 80–150 qualified dental/ortho practice leads per day and scale to 400–800/week. It is designed for independent practices (1–5 locations) where appointment no-shows create direct revenue leakage and where SMS confirmations are an intuitive fix.

LEGITIMACY REFERENCES (use in any outreach or profiles):
- Website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

1) PRIORITIZED METRO LIST (TOP 30 US/CA)
Use these metros first because they have dense concentrations of dental/ortho offices and high competition (higher no-show sensitivity).
US:
1. New York, NY
2. Los Angeles, CA
3. Chicago, IL
4. Houston, TX
5. Phoenix, AZ
6. Philadelphia, PA
7. San Antonio, TX
8. San Diego, CA
9. Dallas, TX
10. San Jose, CA
11. Austin, TX
12. Jacksonville, FL
13. San Francisco, CA
14. Columbus, OH
15. Fort Worth, TX
16. Charlotte, NC
17. Seattle, WA
18. Denver, CO
19. Washington, DC
20. Boston, MA
Canada:
21. Toronto, ON
22. Montreal, QC
23. Vancouver, BC
24. Calgary, AB
25. Edmonton, AB
26. Ottawa, ON
27. Winnipeg, MB
28. Quebec City, QC
29. Hamilton, ON
30. Mississauga, ON

2) COPY/PASTE QUERY SETS (GOOGLE MAPS + YELP)
Goal: pull 30–60 candidates per metro/day and filter to 15–40 qualified.

Google Maps queries (run each query in the metro and scan results):
A) “dentist” + [CITY]
B) “family dentistry” + [CITY]
C) “cosmetic dentist” + [CITY]
D) “dental implants” + [CITY]
E) “orthodontist” + [CITY]
F) “braces” + [CITY]
G) “invisalign” + [CITY]
H) “pediatric dentist” + [CITY]

Yelp queries (same metros):
A) Dentists
B) Orthodontists
C) Cosmetic Dentists
Filter suggestions on Yelp when available: “Open Now” OFF (doesn’t matter), “Request a Quote” irrelevant; focus on independent clinics.

3) LEAD FILTERING RULES (KEEP QUALITY HIGH)
Include if:
- Independent practice OR small group (1–5 locations).
- Has visible phone number.
- Has a website (preferred).
- Appointment-based (obvious) and likely has front-desk scheduling.
- Signals of capacity constraints: “book online,” “request appointment,” “same-day appointments,” “new patients welcome,” or heavy review volume.

Exclude if:
- Large DSOs or multi-state chains (e.g., Aspen Dental, Smile Brands) unless you explicitly want enterprise later.
- Hospital/academic clinics.
- No phone number and no website.
- Clearly closed/permanently closed.

4) ENRICHMENT WORKFLOW (DECISION MAKER EMAIL + CONTEXT)
For each qualified listing:
Step 1 — Capture basic data
- Business name, address, phone, website, Google rating/review count.

Step 2 — Find the right contact path on the website
Check in this order:
A) “Contact” page: look for a direct email (front desk / info@ / office@).
B) “Team” or “About” page: identify Doctor/Owner name(s), Practice Manager, Office Manager.
C) “Request Appointment” form: capture the form URL (useful for ops context).
D) Footer: sometimes lists email and business hours.

Step 3 — Email heuristics (when direct email not listed)
- If staff names exist but no email: note the name + role (e.g., “Sarah Jones, Office Manager”). You can later enrich via standard patterns.
- If only a contact form exists: record “Contact method = Form only” and capture the URL.
- If multiple doctors: pick “Managing Doctor,” “Owner,” or the name that matches the practice brand.

Step 4 — Qualifying notes (optional but helps closing)
Record any of these when visible:
- Online booking tool (NexHealth, Zocdoc, Solutionreach, Doctible, PatientPop, LocalMed, etc.)
- Languages offered
- Late hours/weekends
- “New patient specials” (indicates marketing spend and openness to tools)
- Multi-chair / multiple hygienists (bigger schedule impact)

5) DAILY QUOTAS (TO HIT 400–800/WEEK)
- 2 metros/day x 40 candidates each = 80 candidates/day
- Target qualification rate: ~50% => 40 qualified leads/day
- With 5 working days => 200 leads/week (single researcher)
To reach 400–800/week:
- Run 4 metros/day (or 2 researchers)
- Or increase per-metro capture to 70–100 candidates with faster filtering.

QA rule:
- Randomly sample 10% of daily leads: verify phone, verify website works, verify not a chain.
Deduping:
- Deduplicate by (Website domain) first, then by (Phone number), then by (Business name + city).

6) LEAD LIST TEMPLATE (CSV/SHEETS HEADERS)
Copy these headers exactly (row 1). This aligns to CRM loading and outreach cadence.

Lead_ID
Date_Sourced
Vertical (Dental/Ortho)
Business_Name
Location_Count_Est (1-5)
Address
City
State_Province
Country
Postal_Code
Phone
Website_URL
Google_Maps_URL
Yelp_URL
Primary_Decision_Maker_Name
Primary_Decision_Maker_Role (Owner/Doctor/Office Manager/Practice Manager)
Primary_Email
Secondary_Contact_Name
Secondary_Contact_Role
Secondary_Email
Contact_Method (Email/Contact Form/Phone Only)
Contact_Form_URL
Booking_Link_URL (if any)
Scheduling_Software_Observed (if any)
Hours_Notes
Google_Rating
Google_Review_Count
Notes_Why_Qualified
Outreach_Status (New/Queued/Contacted/Responded/etc.)
Last_Touch_Date
Next_Step

Data validation notes:
- Role field: restrict to {Owner/Doctor, Office Manager, Practice Manager, Front Desk, Unknown}
- Contact_Method: restrict to {Email, Contact Form, Phone Only}
- Location_Count_Est: numeric 1–5; if unknown put blank.

7) UPWORK PROFILE DRAFT (READY TO PASTE)
Use this when creating the free Upwork profile as Bob. Tailored to land quick paying clients in appointment ops / no-show reduction.

Title:
“Reduce Appointment No‑Shows with SMS Confirmations + Reschedule Automation (Dental/Clinics)”

Overview:
Hi — I help appointment-based businesses reduce no-shows and last-minute cancellations using simple, measurable SMS + two-way confirmation workflows.

What I set up:
- Automated appointment reminders (timed sequences)
- Two-way confirmations (YES/NO) with smart branching
- Easy reschedule flows (so you keep the slot filled)
- Waitlist/backfill outreach for short-notice gaps
- Basic reporting so you can quantify recovered revenue per location

If you want to see the system concept before we talk, here’s the live overview page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

For direct contact you can also email: agent_bob_replit+no-show-bot@agentmail.to

Typical outcomes:
- Fewer forgotten appointments
- Fewer dead hours on the schedule
- Better front-desk efficiency (less manual calling)

Send me your appointment volume per week and your current no-show rate, and I’ll suggest a reminder/confirmation cadence you can implement immediately.

---
NEXT EXECUTION STEP (NEXT CYCLE): build the first seed batch of 150–200 leads using the metro list + query sets above, filling the template headers and exporting as CSV for outreach/CRM import.