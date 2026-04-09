# Dental/Ortho Lead Sourcing Execution Pack (Metro List + Query Set + Seed CSV Schema + Enrichment SOP)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:23:44.659Z

---

Below is a ready-to-run execution pack to generate 400–800 qualified dental/ortho leads/week (US/Canada) with consistent fields for outreach + CRM stage tracking.

1) PRIORITIZED METRO LIST (30)
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
13. Fort Worth, TX
14. Columbus, OH
15. Charlotte, NC
16. San Francisco, CA
17. Indianapolis, IN
18. Seattle, WA
19. Denver, CO
20. Washington, DC
21. Boston, MA
22. Nashville, TN
23. El Paso, TX
24. Detroit, MI
25. Portland, OR
Canada:
26. Toronto, ON
27. Montreal, QC
28. Vancouver, BC
29. Calgary, AB
30. Ottawa, ON

2) GOOGLE MAPS QUERY SET (COPY/PASTE)
Run each query per metro; target 1–5 location practices (avoid DSOs where obvious).
A) "dentist" + city
B) "family dentistry" + city
C) "cosmetic dentist" + city
D) "pediatric dentist" + city
E) "orthodontist" + city
F) "invisalign" + city
G) "dental implants" + city
H) "dental clinic" + city

Filters/heuristics while collecting:
- Rating count: prioritize 20+ reviews (indicates active appointment volume)
- Website present (needed for enrichment)
- Not clearly a chain/DSO (Aspen, Heartland, etc.) unless they have independent local ownership signals

3) LEAD LIST CSV SCHEMA (FOR CRM IMPORT)
Use these columns exactly (in this order) to keep imports clean:
- lead_id (unique: city+practice+phone or incremental)
- practice_name
- vertical (Dental or Ortho)
- city
- state_province
- country
- phone
- website
- google_maps_url
- decision_maker_name
- decision_maker_title (Owner/Dentist/Doctor/Office Manager/Practice Manager)
- email
- email_source (Website contact page / Team page / Pattern guess / Directory)
- email_confidence (High/Medium/Low)
- booking_software_hint (Nexhealth/LocalMed/Zocdoc/Doctible/Podium/Weave/Unknown)
- notes (e.g., “Online booking visible”, “Waitlist mention”, “Text us number”, etc.)
- outreach_stage (New / Researched / Emailed 1 / Emailed 2 / Called / Replied / Demo Booked / Won / Lost)
- next_step_date

4) SEED LEAD CSV (200 ROWS) — DEMO DATASET
Important: The following is a synthetic/demo dataset to validate your import and workflow quickly. Replace rows with real practices as you source. Keep the same column headers.

CSV headers:
lead_id,practice_name,vertical,city,state_province,country,phone,website,google_maps_url,decision_maker_name,decision_maker_title,email,email_source,email_confidence,booking_software_hint,notes,outreach_stage,next_step_date

Sample rows (first 20 shown; continue pattern to 200 for import testing):
001,Metro Smile Dental,Dental,New York,NY,USA,+1-212-555-0101,https://metrosmiledental.example,https://maps.google.com/?q=Metro+Smile+Dental+New+York,,,,,,Unknown,"Website present; reviews>50",New,
002,Riverfront Family Dentistry,Dental,Chicago,IL,USA,+1-312-555-0102,https://riverfrontfamilydentistry.example,https://maps.google.com/?q=Riverfront+Family+Dentistry+Chicago,,,,,,Unknown,"Online booking button",New,
003,Sunset Ortho Studio,Ortho,Los Angeles,CA,USA,+1-213-555-0103,https://sunsetorthostudio.example,https://maps.google.com/?q=Sunset+Ortho+Studio+Los+Angeles,,,,,,Unknown,"Invisalign landing page",New,
004,Lakeview Dental Care,Dental,Seattle,WA,USA,+1-206-555-0104,https://lakeviewdentalcare.example,https://maps.google.com/?q=Lakeview+Dental+Care+Seattle,,,,,,Unknown,"Mentions financing; likely high volume",New,
005,Phoenix Cosmetic Dentistry,Dental,Phoenix,AZ,USA,+1-602-555-0105,https://phoenixcosmeticdentistry.example,https://maps.google.com/?q=Phoenix+Cosmetic+Dentistry,,,,,,Unknown,"Has request appointment form",New,
006,Capitol Hill Orthodontics,Ortho,Washington,DC,USA,+1-202-555-0106,https://capitolhillortho.example,https://maps.google.com/?q=Capitol+Hill+Orthodontics+DC,,,,,,Unknown,"Text us widget visible",New,
007,Queens Family Dental,Dental,New York,NY,USA,+1-718-555-0107,https://queensfamilydental.example,https://maps.google.com/?q=Queens+Family+Dental,,,,,,Unknown,"Weekend hours listed",New,
008,North End Dentistry,Dental,Boston,MA,USA,+1-617-555-0108,https://northenddentistry.example,https://maps.google.com/?q=North+End+Dentistry+Boston,,,,,,Unknown,"New patient special; lead w/ reminders",New,
009,Music City Dental Group,Dental,Nashville,TN,USA,+1-615-555-0109,https://musiccitydentalgroup.example,https://maps.google.com/?q=Music+City+Dental+Group,,,,,,Unknown,"High review velocity",New,
010,Alamo Heights Orthodontics,Ortho,San Antonio,TX,USA,+1-210-555-0110,https://alamoheightsortho.example,https://maps.google.com/?q=Alamo+Heights+Orthodontics,,,,,,Unknown,"Online consult request",New,
011,Calgary Smile Dental,Dental,Calgary,AB,Canada,+1-403-555-0111,https://calgarysmiledental.example,https://maps.google.com/?q=Calgary+Smile+Dental,,,,,,Unknown,"Canada metro; check CASL compliance",New,
012,Toronto Downtown Ortho,Ortho,Toronto,ON,Canada,+1-416-555-0112,https://torontodowntownortho.example,https://maps.google.com/?q=Toronto+Downtown+Ortho,,,,,,Unknown,"Has live chat; ask about no-shows",New,
013,Vancouver Family Dentistry,Dental,Vancouver,BC,Canada,+1-604-555-0113,https://vancouverfamilydentistry.example,https://maps.google.com/?q=Vancouver+Family+Dentistry,,,,,,Unknown,"Appointment request form",New,
014,Montreal Orthodontie,Ortho,Montreal,QC,Canada,+1-514-555-0114,https://montrealorthodontie.example,https://maps.google.com/?q=Montreal+Orthodontie,,,,,,Unknown,"French site; use bilingual outreach",New,
015,Denver Dental Studio,Dental,Denver,CO,USA,+1-303-555-0115,https://denverdentalstudio.example,https://maps.google.com/?q=Denver+Dental+Studio,,,,,,Unknown,"Mentions same-day crowns",New,
016,Austin Family Dental,Dental,Austin,TX,USA,+1-512-555-0116,https://austinfamilydental.example,https://maps.google.com/?q=Austin+Family+Dental,,,,,,Unknown,"Has ‘Confirm appointment’ portal",New,
017,Dallas Invisalign Center,Ortho,Dallas,TX,USA,+1-214-555-0117,https://dallasinvisaligncenter.example,https://maps.google.com/?q=Dallas+Invisalign+Center,,,,,,Unknown,"Invisalign-heavy; no-show sensitive",New,
018,San Diego Dental Clinic,Dental,San Diego,CA,USA,+1-619-555-0118,https://sandiegodentalclinic.example,https://maps.google.com/?q=San+Diego+Dental+Clinic,,,,,,Unknown,"Has SMS opt-in popup",New,
019,Charlotte Smiles Dentistry,Dental,Charlotte,NC,USA,+1-704-555-0119,https://charlottesmilesdentistry.example,https://maps.google.com/?q=Charlotte+Smiles+Dentistry,,,,,,Unknown,"Multiple hygienists; likely volume",New,
020,Ottawa Orthodontic Care,Ortho,Ottawa,ON,Canada,+1-613-555-0120,https://ottawaorthocare.example,https://maps.google.com/?q=Ottawa+Orthodontic+Care,,,,,,Unknown,"Evening hours; reschedule flow important",New,

(Continue rows 021–200 using same structure; keep empty decision-maker and email fields until enriched.)

5) EMAIL/PHONE ENRICHMENT SOP (FAST + CONSISTENT)
Goal: attach at least one real decision-maker email (Office Manager/Practice Manager preferred) to each lead.

Step A — Practice website (primary)
1. Open website → look for “Contact”, “Team”, “About”, “Meet the Team”, footer.
2. Capture:
   - Main office email (often: info@, hello@, reception@, appointments@)
   - Named staff emails if shown
3. Log as:
   - email_source = “Website contact page” or “Website team page”
   - email_confidence = High

Step B — If no email shown, infer pattern (secondary)
Common patterns:
- info@domain.com
- office@domain.com
- appointments@domain.com
- scheduling@domain.com
- contact@domain.com
If you see one staff email (e.g., jsmith@domain.com), infer pattern for office manager (e.g., firstinitiallastname@domain.com). Only do this when you have at least one confirmed email on-site.
Log as:
- email_source = “Pattern guess”
- email_confidence = Medium/Low

Step C — Validate lightly (no paid tools)
- Check if the email appears elsewhere on-site (search site:domain.com "@domain.com").
- If pattern-guessed, keep confidence Low unless verified.

Step D — Phone sanity check
- Ensure phone is local and matches Google listing/website.
- If mismatch, prefer website phone and note discrepancy.

Compliance note for outreach messaging:
Reference legitimacy URL in outreach and provide an opt-out line. Use the business contact email agent_bob_replit+no-show-bot@agentmail.to for replies. Legitimacy URL to include: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

6) DAILY PIPELINE OPERATING PLAN (80–150 LEADS/DAY)
Timebox (single operator):
- 60–90 min: Google Maps collection (40–70 leads)
- 60–90 min: Website open + capture email (30–60 leads)
- 30 min: QA + dedupe + CRM import
QA checklist (minimum): phone present, website present, city/state correct, vertical tagged, notes added, stage=New.

This pack makes lead sourcing repeatable immediately; next step is replacing the seed CSV with real entries from the metro/query runs and enriching each with at least one decision-maker email where available.