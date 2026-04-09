# Dental/Ortho Lead Sourcing Engine v1 (Metro List + Search Queries + Sheets Schema + SOP)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:15:39.641Z

---

Objective: produce a steady pipeline sized to close 20–25 locations in 30 days by generating 400–800 qualified dental/orthodontic practice leads/week (phone + website + decision-maker contact when possible) and loading them into a simple CRM with next steps.

A) Prioritized metro list (repeatable Google Maps pulls)
US (20): New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; San Francisco CA; Columbus OH; Fort Worth TX; Charlotte NC; Seattle WA; Denver CO; Washington DC; Boston MA.
Canada (10): Toronto ON; Montreal QC; Vancouver BC; Calgary AB; Edmonton AB; Ottawa ON; Winnipeg MB; Quebec City QC; Hamilton ON; Mississauga ON.
Rule: Start with top 10 metros until daily quota is met; rotate the rest to avoid re-scraping the same practices.

B) Standard search query pack (copy/paste)
Google Maps base patterns (swap CITY):
1) “dentist CITY”
2) “cosmetic dentist CITY”
3) “family dentistry CITY”
4) “pediatric dentist CITY”
5) “orthodontist CITY”
6) “invisalign CITY”
7) “dental implant CITY”
8) “dental clinic CITY”
Yelp base patterns:
1) category = Dentists; location = CITY
2) category = Orthodontists; location = CITY
Filter heuristics (keep list quality high):
- Include: independent practices, 1–5 locations, clear phone number, operating hours, active website.
- Prefer: online booking, “request appointment” forms, mentions of Dentrix/OpenDental/Curve/Doxy.me (note if visible).
- Exclude: DSOs/corporate chains when obvious (e.g., “Smile Brands”, “Aspen Dental”), emergency-only listings with no scheduling, listings without a website AND without a usable phone.

C) Lead list schema (Google Sheets-ready)
Tab 1: Leads
Required columns:
- Lead ID (auto: CITY-SEQ)
- Practice Name
- Specialty (Dental / Ortho)
- City
- State/Province
- Country
- Address
- Main Phone
- Website URL
- Google Maps URL
- Source (GMaps/Yelp/Directory)
- # Locations (1 / 2–5 / unknown)
- Decision Maker Name (Doctor/Owner if found)
- Decision Maker Title (Owner/DDS/Practice Manager/Office Manager)
- Contact Email (generic@ / personal@)
- Contact Page URL
- Booking Method (Phone only / Web form / Online booking link)
- Notes (software hints, hours, language, etc.)
CRM columns (for stage + action):
- Stage (dropdown): New → Enrich Needed → Contact Ready → Emailed 1 → Emailed 2 → Called/SMS → Replied → Demo Booked → Won → Lost
- Next Step (text)
- Next Step Date (date)
- Last Touch (date)
- Owner (Bob/VA)
Validation rules:
- Main Phone must be present (no phone = do not import).
- Website URL OR Google Maps URL required (at least one).
- Stage cannot be “Contact Ready” unless Phone + Website and at least one of (email OR contact page URL) is present.

Tab 2: Activity Log
- Date; Lead ID; Channel (Email/Call/SMS/FB/CL/Upwork); Outcome; Next Step Date.

D) Enrichment + QA SOP (free-first)
Step 1 (Fast capture, 60–90 seconds/lead): From Google Maps listing capture: Practice Name, Phone, Address, Website, Maps URL, City/State, Specialty. Paste into Leads tab as Stage=“Enrich Needed”.
Step 2 (Website scrape, 2–4 minutes/lead): Open website → find Contact/Team/About pages. Capture: best email (prioritize office manager / front desk / info@), doctor name(s), and booking method. If only a form exists, save Contact Page URL.
Step 3 (Decision-maker heuristic): If email not listed, check footer, privacy policy, “mailto:”, or PDF forms. If none, keep Phone + Contact Page URL and mark “Contact Ready” (call/SMS path still works).
Step 4 (QA before outreach): verify phone is formatted, website loads, and practice appears active (hours/reviews within last 12 months). Remove duplicates by matching website domain or phone.
Daily quota plan:
- 1 hour: 30–40 fast-capture leads (Step 1)
- 2 hours: enrich 20–30 of them (Step 2–3)
- End of day target: 80–150 captured leads, with at least 30–50 “Contact Ready”. This supports 400–800/week output.

E) Seed batch (first 150–200 leads) execution plan
Day 1–2: Top 5 metros only. Pull 40 listings/metro across dentist + orthodontist queries. Capture 200 quickly (Step 1), then enrich the top 60 by strongest fit signals (online booking, clear team page, multiple operatories/services).
Deliverable format: export Leads tab to CSV for outreach + keep Sheets as system of record.

Reminder for templates/outreach legitimacy references (to include wherever relevant):
- Website (legitimacy URL): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to