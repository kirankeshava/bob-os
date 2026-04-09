# Dental/Ortho Lead Sourcing Runbook (400–800/week) + Query Library + QA/Enrichment Rules

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:37:50.367Z

---

Objective
Build a daily inbound list of qualified dental + orthodontic practices (1–5 locations) with phone + website for immediate outreach, and decision-maker email when available, sized to reach 400–800 new leads/week. This runbook is optimized for speed, repeatability, and data cleanliness.

Reference legitimacy assets in outreach (for later steps)
Website proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Contact email: agent_bob_replit+no-show-bot@agentmail.to

Target ICP filters (apply during collection)
1) Practice type: “Dentist”, “Dental clinic”, “Orthodontist”, “Pediatric dentist”.
2) Exclude: chains/DSOs if obvious (Aspen, Gentle Dental, etc.), hospitals, schools.
3) Must have: working phone number and a website OR a strong Google Business Profile with booking link.
4) Prefer: online booking widget, “Request appointment” form, or mention of Dentrix/OpenDental/Curve/PatientPop/Weave, etc. (note if seen).

Prioritized metro list (30) for repeatable pulls
US: New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Nashville TN; Boston MA; El Paso TX; Detroit MI; Portland OR.
Canada: Toronto ON; Montreal QC; Vancouver BC; Calgary AB; Edmonton AB.

Query library (copy/paste)
Use Google Maps first. Run each query per city; collect top results until you hit your daily quota.
Core:
- “dentist in {city}”
- “dental clinic in {city}”
- “family dentistry in {city}”
- “cosmetic dentist in {city}”
- “orthodontist in {city}”
Add-ons to find higher-intent practices:
- “dentist online booking {city}”
- “same day crowns {city} dentist”
- “invisalign provider {city}”
- “emergency dentist {city}”
Yelp backup queries (if Maps slows):
- Yelp category: Dentists / Orthodontists in {city}
- Filter: “Open Now” (optional) to surface active practices

Daily production targets (operator/VA)
- 80–150 new practices/day.
- Expect decision-maker email coverage: 25–55% depending on how often sites list emails.
- Time budget: ~2–4 minutes/lead (Maps → website → contact page).

Lead list schema (minimum viable columns)
1) Business Name
2) Practice Type (Dental/Ortho/Pedo)
3) City
4) State/Province
5) Country
6) Phone (primary)
7) Website
8) Google Maps URL (or place link)
9) Decision Maker Name (Dr/Owner) (if found)
10) Decision Maker Role (Owner/Doctor)
11) Office Manager Name (if found)
12) Best Email (required if found)
13) Email Source (Contact page/About/Team/Booking)
14) Secondary Email (optional)
15) Booking Software / Clues (Weave, PatientPop, NexHealth, etc.)
16) Notes (e.g., “has online booking”, “multiple locations”, “form only”)
17) Lead Source (Maps/Yelp/Directory)
18) Date Added
19) Status (New/Validated/Do Not Contact)

Collection steps (per lead)
Step 1: Pull candidate from Google Maps
- Open listing → confirm it’s a practice (not a chain HQ).
- Copy Business Name, Phone, Website, City/State.
- Copy the Maps URL.

Step 2: Visit the website (30–90 seconds)
- Look for: Contact, About, Team, Footer, “Book Appointment”.
- If email is visible, capture it and note source.
- If no email: check “Privacy Policy” and footer; many sites list admin emails there.
- If only a form: capture “form only” in Notes and skip email (do not guess).

Step 3: Identify decision maker (60 seconds)
- On “Team/About”: capture dentist/owner name(s) and/or office manager.
- If multiple doctors: choose the owner/founder if stated; otherwise leave blank.

Enrichment heuristics (free-first)
- If site shows staff names but no email, do NOT fabricate. Keep phone + website for SMS/call-first outreach.
- If a domain email is listed for any purpose (info@, office@), use it as Best Email and mark Email Source.
- If only personal emails appear (gmail), still capture—many small practices use them.

QA rules (must pass before import)
1) Phone format: include country code if non-US; otherwise store as 10-digit US format.
2) Website must be a real domain (not a Facebook page unless that’s all they have; note it).
3) Dedupe: if Business Name + Phone match an existing row, do not add again.
4) Email validation (light): contains “@” and a domain; no obvious typos/spaces.
5) Exclusions: if clearly a corporate chain location, mark “Do Not Contact” unless strategy changes.

CRM import mapping (from lead sheet to pipeline)
- New leads enter CRM Stage: “New – Not Contacted”.
- Required to start outreach: Business Name, Phone OR Email, City/State, Source, Date Added.
- If email exists: queue for Email Sequence Owner/Office Manager.
- If email missing but phone exists: queue for Call/SMS-first script.

Dedupe & hygiene rules
- Primary key: Phone + Website domain.
- If two locations share the same website but different phone/city, treat as separate locations but link with a “Group/Parent” note.
- Normalize domains (strip https:// and trailing paths) for easier dedupe.

Seed batch plan (first 200 leads in 1–2 days)
Day 1 (100 leads): Toronto, Austin, Denver, Seattle (25 each).
Day 2 (100 leads): Phoenix, Charlotte, Nashville, Vancouver (25 each).
For each city: run “dentist in {city}” + “orthodontist in {city}”, collect until quota hit.
Export as CSV with the schema above, then import into CRM.

Output expectations
- Week 1: 400–800 new practices added, 150–350 with usable emails, 400–800 with phone numbers.
- This is sufficient to support a high-tempo outbound cadence while continuing to replenish the top of funnel.

Operator checklist (what ‘done’ looks like each day)
- 80–150 new rows added
- 0 obvious duplicates
- ≥95% have phone
- ≥70% have website or strong Maps listing
- Emails captured where truly present (no guessing)
- CSV exported + imported into CRM with correct stage assignment
