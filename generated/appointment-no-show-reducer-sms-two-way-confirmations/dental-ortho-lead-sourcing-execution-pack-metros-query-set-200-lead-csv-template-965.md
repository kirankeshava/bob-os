# Dental/Ortho Lead Sourcing Execution Pack (Metros + Query Set + 200-Lead CSV Template + QA Rules)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:56:57.269Z

---

Business legitimacy URL (include in outreach when needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Business contact email: agent_bob_replit+no-show-bot@agentmail.to

GOAL
Build a daily pipeline that reliably produces 80–150 qualified dental/ortho practice leads/day (scaling to 400–800/week) with phone + website + at least one decision-maker contact path.

A) PRIORITIZED METRO LIST (TOP 30)
Use these metros for dense practice counts + higher spend tolerance.
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
17. Indianapolis, IN
18. Seattle, WA
19. Denver, CO
20. Washington, DC
21. Boston, MA
22. Nashville, TN
23. Las Vegas, NV
24. Detroit, MI
25. Portland, OR
26. Oklahoma City, OK
27. Toronto, ON
28. Vancouver, BC
29. Calgary, AB
30. Montreal, QC

B) SEARCH QUERY SET (GOOGLE MAPS + YELP)
Run per metro. Capture 20–40 leads per query before switching.
Core queries (Google Maps):
- “dentist {city}”
- “family dentist {city}”
- “cosmetic dentist {city}”
- “orthodontist {city}”
- “pediatric dentist {city}”
- “dental clinic {city}”

High-intent operational queries (good for no-show pain):
- “emergency dentist {city}” (often high cancellation/no-show volatility)
- “same day crowns {city}”
- “invisalign {city}”

Yelp queries:
- Category: Dentists / Orthodontists
- Filters: “Open Now” OFF (avoid time bias), Rating >= 3.5 optional (don’t over-filter)

Exclusion rules (to keep list closeable):
- Exclude DSOs/large chains: Aspen Dental, Gentle Dental, Western Dental, Heartland/Smile Brands offices (if clearly branded as chain)
- Exclude universities/hospitals
- Exclude “Medicaid-only” clinics if clearly indicated (optional)
- Prefer 1–5 locations; if >5, only include if independently branded and locally managed

Inclusion signals (score higher):
- “By appointment only”
- Busy phone line / call tracking number
- Online booking widget present (NexHealth, LocalMed, Solutionreach, Zocdoc, Doctible, etc.)
- “New patients welcome” / promos (often indicates schedule gaps matter)

C) LEAD LIST SCHEMA (CSV/SHEETS) + VALIDATION
Create a sheet with these columns exactly (avoid schema drift):
1) lead_id (format: DENT-{metrocode}-{001…})
2) date_added (YYYY-MM-DD)
3) business_name
4) specialty (Dental / Ortho / Pediatric / Cosmetic)
5) street_address
6) city
7) state_province
8) postal_code
9) country
10) phone_primary
11) website_url
12) google_maps_url
13) yelp_url
14) locations_count (1 / 2–5 / 6+)
15) decision_maker_name
16) decision_maker_role (Owner Dentist / Orthodontist / Office Manager / Practice Manager)
17) decision_maker_email
18) frontdesk_email
19) contact_form_url
20) booking_link_present (Yes/No)
21) booking_vendor_if_visible (NexHealth/LocalMed/Solutionreach/Zocdoc/Other/Unknown)
22) notes (2–10 words max; e.g., “online booking; 2 locations”)
23) outreach_stage (New / To Contact / Contacted / Replied / Booked / Won / Lost)
24) next_step_date (YYYY-MM-DD)

Validation / QA rules (must pass before “To Contact”):
- Phone present AND website OR Google Maps URL present
- No obvious chain branding
- Email requirement: at least one of (decision_maker_email, frontdesk_email, contact_form_url). If only contact form is available, mark emails blank but include form URL.
- Notes max 10 words (prevents essays)

D) 200-LEAD SEED LIST TEMPLATE (CSV-READY) WITH SAMPLE ROWS
Use this as the exact output format. Replace sample rows with real leads.

lead_id,date_added,business_name,specialty,street_address,city,state_province,postal_code,country,phone_primary,website_url,google_maps_url,yelp_url,locations_count,decision_maker_name,decision_maker_role,decision_maker_email,frontdesk_email,contact_form_url,booking_link_present,booking_vendor_if_visible,notes,outreach_stage,next_step_date
DENT-NYC-001,2026-04-09,Sample Midtown Family Dentistry,Dental,123 W 34th St,New York,NY,10001,USA,+1-212-555-0101,https://example.com,https://maps.google.com/?q=sample1,https://yelp.com/biz/sample1,1,,Office Manager,,,https://example.com/contact,Yes,Unknown,"online booking",New,2026-04-10
DENT-LA-001,2026-04-09,Sample West LA Orthodontics,Ortho,456 Wilshire Blvd,Los Angeles,CA,90010,USA,+1-310-555-0133,https://example2.com,https://maps.google.com/?q=sample2,https://yelp.com/biz/sample2,2–5,Jamie Chen,Practice Manager,jamie@example2.com,,,No,Unknown,"2 locations",New,2026-04-10

E) DAILY PRODUCTION PLAN (FOR YOU OR A VA)
Per day per metro:
- Pick 1 metro (from the list) + run 3 queries (e.g., dentist, cosmetic dentist, orthodontist)
- Collect 30 leads from Google Maps
- Collect 20 leads from Yelp (only if unique vs Maps)
- Visit each website and attempt to capture:
  1) decision-maker email (doctor/owner) OR office manager email
  2) front desk email
  3) contact form URL (fallback)
- Mark booking_link_present and vendor if visible (look for “powered by NexHealth/LocalMed/Solutionreach” in page footer or script hints)
- QA pass: remove duplicates + chains

F) BOOKING LINK STANDARD (FREE-FIRST)
Outreach templates should include a single scheduling CTA.
- Preferred: a dedicated booking page URL (can be Calendly free tier if available; otherwise use a simple web form on the legitimacy site).
- Placeholder to insert everywhere: {BOOKING_LINK}
- When used in posts, also include the legitimacy URL so prospects can verify: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

If you want, next cycle I will produce the first real 150–200 leads (starting with NYC, LA, Chicago, Houston, Phoenix, Toronto, Vancouver, Dallas, Boston, Seattle) in this exact CSV format so outbound can start immediately.