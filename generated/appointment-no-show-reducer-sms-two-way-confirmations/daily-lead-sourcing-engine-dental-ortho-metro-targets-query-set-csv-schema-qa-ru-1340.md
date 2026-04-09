# Daily Lead Sourcing Engine (Dental/Ortho): Metro Targets, Query Set, CSV Schema + QA Rules

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:11:00.239Z

---

Objective
Build a daily pipeline of qualified independent dental + orthodontic practices (1–5 locations) with phone + website, and decision-maker contact info when available, sized to support closing 20–25 locations in 30 days. This engine is designed to be executed by an agent/VA in 60–120 minutes/day for 80–150 leads/day (scaling to 400–800/week).

Legitimacy references (include in outreach assets, not in the lead list)
Website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Contact email: agent_bob_replit+no-show-bot@agentmail.to

A) Prioritized Metro List (Top 30)
US:
1) New York, NY 2) Los Angeles, CA 3) Chicago, IL 4) Houston, TX 5) Phoenix, AZ 6) Philadelphia, PA 7) San Antonio, TX 8) San Diego, CA 9) Dallas, TX 10) San Jose, CA 11) Austin, TX 12) Jacksonville, FL 13) San Francisco, CA 14) Columbus, OH 15) Fort Worth, TX 16) Charlotte, NC 17) Indianapolis, IN 18) Seattle, WA 19) Denver, CO 20) Washington, DC
Canada:
21) Toronto, ON 22) Montréal, QC 23) Vancouver, BC 24) Calgary, AB 25) Edmonton, AB 26) Ottawa, ON
High-growth/healthcare-dense add-ons:
27) Miami, FL 28) Tampa, FL 29) Nashville, TN 30) Raleigh, NC

Why these: high density of practices, high appointment volume, and higher receptivity to revenue-recovery ROI messaging.

B) Search Query Set (Copy/Paste)
Use Google Maps first, then Yelp for backfill.

Google Maps queries (rotate through each metro):
1) “dentist” + City, State
2) “dental clinic” + City, State
3) “family dentistry” + City, State
4) “cosmetic dentist” + City, State
5) “orthodontist” + City, State
6) “braces” + City, State
7) “invisalign” + City, State
8) “pediatric dentist” + City, State
9) “emergency dentist” + City, State

Yelp queries:
- Category: Dentists / Orthodontists
- Filter: “Open Now” off (avoid bias), sort default
- City: same metro list

Batching plan (daily):
- Pick 2 metros/day.
- Pull 40–60 leads per metro (mix dentist + orthodontist queries).
- Stop when you hit diminishing returns (duplicate chains or no website).

C) Inclusion/Exclusion Rules (Quality Filters)
Include if:
- Independent practice or small group (1–5 locations). If uncertain, include but mark “Multi-location?”
- Has a working phone number.
- Has a website OR strong directory presence (Google Business Profile with booking link).

Exclude if:
- National DSOs/large chains (e.g., Aspen Dental). If unsure, mark and keep.
- No phone number.
- Website is dead AND no usable contact path.

D) Lead Enrichment Steps (Fast + Repeatable)
For each practice:
1) Capture core fields from Google Maps/Yelp: name, address, phone, website, rating/reviews.
2) Visit website:
   - Look for “Contact”, “About”, “Team”, “Meet the Doctor”, “Staff”, “Locations”.
   - Extract any direct email(s). Priority order:
     a) Office manager/admin email (front desk)
     b) Scheduling/appointments email
     c) Generic (info@ / contact@)
     d) Doctor/owner email
3) Identify decision-maker names:
   - If “Meet the Doctor” lists Dr. First Last, capture as Owner/Doctor name.
   - If “Team” lists Office Manager, capture as Office Manager name.
4) Booking signal (for targeting):
   - Note if they have online booking (Zocdoc, NexHealth, Solutionreach, LocalMed, Dental Intelligence, Weave, Podium, practice-branded scheduler).
   - If unknown, leave blank.

Confidence labeling:
- EmailConfidence = High (direct staff email found), Medium (generic email on domain), Low (no email; only form).
- DMConfidence = High (named doctor/office manager found), Medium (only doctor name), Low (no names found).

E) CSV Header (Lead List Schema)
Use exactly this header row:
PracticeName,Vertical,City,StateProvince,Country,Phone,Website,GoogleMapsURL,YelpURL,PrimaryContactName,PrimaryContactRole,PrimaryEmail,SecondaryEmail,ContactFormURL,EmailConfidence,DMConfidence,OwnerDoctorName,OfficeManagerName,LocationsCountEstimate,OnlineBookingProvider,Notes,Source,DateCaptured

Data dictionary (how to fill):
- Vertical: Dental or Orthodontics
- PrimaryContactRole: Owner/Doctor or Office Manager or Front Desk or Unknown
- Source: GoogleMaps or Yelp
- DateCaptured: YYYY-MM-DD
- LocationsCountEstimate: 1 / 2–5 / 6+ / Unknown

F) QA Checklist (Before Importing to CRM)
For a batch of 50 leads:
- 50/50 have Phone.
- ≥35/50 have Website.
- ≥15/50 have at least one email (any confidence).
- Duplicates removed (same phone or same domain).
- Notes are short, factual (e.g., “Online booking via NexHealth; has waitlist form”).

G) CRM Operating Routine (So sourcing supports closing)
Daily (30–45 min):
- Add new leads to CRM stage “New”.
- Immediately assign next step: “Send Email 1” with date.
- Move any replies to “Engaged” same day.

Weekly (30 min):
- Review stalled leads in “Contacted” > 7 days; recycle into a new thread or mark “No Response”.
- Keep sourcing capped: if there are >300 unworked leads in CRM, pause sourcing and focus on booking/closing.

Target throughput to hit 20–25 locations in 30 days (guide)
- Leads/week: 400–800
- Contact rate (email/phone reachable): 60–80%
- Reply rate: 2–6% (cold)
- Booked demos: 1–3% of total leads
- Close rate from demos: 20–40% (if ROI is clear)

This engine produces the raw fuel for outreach while enforcing a rule: if follow-up/booking is behind, reduce sourcing and prioritize closing activity.