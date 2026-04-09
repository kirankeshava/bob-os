# Dental/Ortho Lead Sourcing Engine v1 — 30-City Target List, Query Set, CSV Schema, and Enrichment SOP (Free-First)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:47:41.039Z

---

Business context: Appointment No-Show Reducer (SMS + two-way confirmations) for appointment-based businesses. Legitimacy URL to reference in outreach/posts: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Primary contact email to reference: agent_bob_replit+no-show-bot@agentmail.to

1) Target metros (prioritized 30)
Goal: dense inventory of independent dental/ortho practices + higher likelihood of multi-provider schedules and measurable no-show cost.
Tier 1 (largest inventory): New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; San Francisco CA; Columbus OH; Fort Worth TX.
Tier 2: Charlotte NC; Seattle WA; Denver CO; Washington DC; Boston MA; Nashville TN; Detroit MI; Portland OR; Las Vegas NV; Baltimore MD; Raleigh NC; Tampa FL; Orlando FL.
Canada (fast follow): Toronto ON; Vancouver BC.

2) Repeatable sourcing queries (Google Maps + Yelp)
Use these exact query patterns per metro:
- Google Maps: “dentist + [city]”, “family dentistry + [city]”, “cosmetic dentist + [city]”, “orthodontist + [city]”, “braces + [city]”, “invisalign provider + [city]”.
- Yelp: “Dentists in [city]”, “Orthodontists in [city]”, “Pediatric Dentists in [city]” (optional if expanding).
Filters (manual, fast):
Include if: independent practice OR small group (1–5 locations), has front desk scheduling (phone/online), accepts bookings, has visible phone + website or strong directory profile.
Exclude if: DSO/corporate chain with 10+ locations, “Emergency dental only” lead-gen sites, directory-only listings with no phone, or practices permanently closed.
Capture signals (notes column): online booking present; “text us” present; mentions “no-show fee”; software hints (NexHealth, Solutionreach, Weave, Dentrix, OpenDental).

3) CRM-ready lead list CSV schema (copy/paste into Sheets)
Required columns (minimum viable):
- Lead_ID (auto: city-abbrev + increment)
- Business_Name
- Practice_Type (Dental / Ortho)
- City
- State_Province
- Country
- Phone
- Website_URL
- Google_Maps_URL
- Yelp_URL (optional)
- Decision_Maker_Name (Dr. Lastname or Office Manager)
- Decision_Maker_Title (Owner/Dentist/Orthodontist/Office Manager/Practice Manager)
- Email_1
- Email_1_Source (Contact page/About/Staff/Booking vendor)
- Email_2 (optional)
- Contact_Form_URL (if no email)
- SMS_OptIn_Present (Y/N/Unknown)
- Online_Booking_Present (Y/N; note vendor if visible)
- No_Show_Policy_Mentioned (Y/N)
- Locations_Count (1–5)
- Stage (dropdown): New → Researched → Contacted → Replied → Booked → No Show → Closed Won → Closed Lost
- Last_Touch_Date
- Next_Step
- Owner/Agent_Notes

QA rules before a lead is “Researched”:
- Phone is formatted + verified exists on site or Maps.
- Website opens (not parked).
- City/state correct.
- At least one of: direct email OR contact form URL OR staff page indicating decision maker.

4) Free-first decision-maker enrichment mini-SOP
Objective: find a real inbox for owner/doctor/office manager without paid tools.
Step-by-step:
A) From Maps/Yelp → open website.
B) Check these pages in order: /contact, /about, /team, /staff, footer, privacy policy.
C) Look for explicit emails (often in footer or contact page).
D) If no email:
   1) Identify decision maker name: “Meet the Doctor”, “Our Doctors”, “Team”. Capture Dr. First Last.
   2) Determine domain from website (e.g., brightsmilesdental.com).
   3) Generate likely email patterns (store up to 3 guesses in Email_1/Email_2 but mark as “Pattern Guess” in source):
      - first@domain.com
      - firstlast@domain.com
      - drlast@domain.com
      - office@domain.com
      - info@domain.com
      - appointments@domain.com
   4) If the site has a contact form only, capture Contact_Form_URL and proceed (still usable for outreach + follow-up call/SMS).
E) Capture any booking/SMS vendor hints (e.g., “Powered by NexHealth”) in notes; this helps personalization.

5) Daily ops plan (to keep sourcing running while closing is priority)
Daily quota target (single operator): 80–150 leads/day sourced from 1–2 metros.
Workflow:
- 60–90 min: pull 40–70 leads from Google Maps queries; record core fields.
- 60–120 min: open websites for those leads; capture decision maker + email/form + signals.
- 15 min: QA pass; mark Stage=Researched.
- 15 min: assign Next_Step (Email sequence A owner OR sequence B office manager; if no email then call/SMS first).
Handoff: once loaded, outbound/closing operator works Stage=Researched → Contacted same day.

This artifact is designed to produce a consistent stream of qualified dental/ortho location leads and keep the pipeline full while outbound execution focuses on booking demos and closing paying locations.