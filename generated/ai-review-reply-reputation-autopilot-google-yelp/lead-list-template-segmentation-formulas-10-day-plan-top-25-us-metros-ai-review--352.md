# Lead List Template + Segmentation Formulas + 10-Day Plan (Top 25 US Metros) — AI Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:32:51.582Z

---

Below is a ready-to-paste Google Sheets/CSV template plus formulas and an execution plan to produce 500–1,000 prospects (dentists, med spas, HVAC/plumbing) in the Top 25 US metros. Use this for direct-to-local outbound and keep a separate tab for agencies.

A) SHEET/CSV HEADERS (Row 1)
business_name,vertical,category_used,city,state,metro,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,response_gap_note,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,contact_source,notes

B) DATA ENTRY RULES (what the collector fills manually)
1) Pull from Google Maps/GBP listing: business_name, phone, website, google_maps_url, google_rating, review_count.
2) Click “Reviews” and record:
   - last_review_date (most recent review date)
   - last_review_excerpt (first ~120–180 characters; if sensitive, paraphrase instead)
   - response_rate_proxy_last10: look at the last 10 reviews; count how many have an “Owner response.” Enter as a decimal: e.g., 2/10 = 0.20.
   - response_gap_note: short note like “No owner responses visible in last 10 reviews” or “Responds sometimes; last owner reply 6 months ago.”
3) Find emails (email_1/email_2) via free sources in this order:
   - Website contact page
   - Footer / privacy policy
   - Google Business listing ‘Website’ → contact
   - LinkedIn company page / owner profile (if available)
   - If none found, leave blank and keep for later enrichment.

C) SEGMENTATION LOGIC (in-Sheet formulas)
Assume columns:
- google_rating in J
- review_count in K
- last_review_date in L (date type)
- response_rate_proxy_last10 in N (0.00–1.00)

1) segment (column P) formula (Google Sheets):
=IF(OR($N2="",$N2<=0.2),"not_responding",IF($J2<4.2,"low_rating",IF(OR($K2>=200, TODAY()-$L2<=14),"high_volume","standard")))

2) priority_tier (column Q) formula:
=IF(OR(AND($P2="not_responding",OR($K2>=200, TODAY()-$L2<=14)),AND($P2="low_rating",OR($K2>=200, TODAY()-$L2<=14))),"A",IF(OR($P2="not_responding",$P2="low_rating"),"B",IF($P2="high_volume","C","D")))

3) response gap note helper (optional) (column O) if you want auto-text:
=IF(OR($N2="",$N2<=0.2),"Low/No visible owner responses recently",IF($N2<=0.5,"Inconsistent owner responses", "Frequently responds"))

D) TOP 25 US METROS (use as a dropdown list in column F)
New York City, Los Angeles, Chicago, Dallas–Fort Worth, Houston, Washington DC, Philadelphia, Atlanta, Miami, Phoenix, Boston, San Francisco Bay Area, Riverside–San Bernardino, Detroit, Seattle, Minneapolis–St Paul, San Diego, Tampa–St Petersburg, Denver, Baltimore, Charlotte, Orlando, San Antonio, Portland, Austin

E) QUERY FORMAT (copy/paste into Google Maps)
For each metro, run 3 searches (one per vertical). Use the “category_used” column to record what you used.
- Dentists: “dentist [CITY] [STATE]” and/or “cosmetic dentist [CITY]”
- Med spa: “med spa [CITY] [STATE]” and/or “aesthetic clinic [CITY]”
- HVAC/plumbing: “HVAC [CITY] [STATE]” and “plumber [CITY] [STATE]”

Agency lane (separate tab):
- “dental marketing agency [CITY]”
- “medical spa marketing agency [CITY]”
- “home services marketing agency [CITY]”
Capture: agency_name, city_state, website, linkedin, email, niche focus, estimated client count, notes.

F) QA / ACCEPTANCE CRITERIA (fast checks)
- Must have website OR email_1 (at least one contact route).
- Must have review_count >= 30 (avoid low-signal GBPs).
- Exclude chains/franchises when possible unless independently owned.
- Ensure category matches (avoid ‘orthodontist’ unless you choose to include).
- Random QA: every 25 rows, re-check 3 listings for rating/review count/date accuracy.

G) 10-DAY PRODUCTION PLAN (to reach 500–1,000 leads without paid tools)
Day 1: Set up Sheet, dropdowns, formulas, and 3 tabs (Dentist / Med Spa / HVAC-Plumbing) + 1 tab (Agencies). Produce 50 leads total to calibrate speed.
Day 2–3: Produce 75–100 leads/day focusing on Priority A/B signals: high review_count and low response_rate_proxy. Keep 70% direct businesses, 30% high-quality maybes.
Day 4: QA pass on first 250 leads; fix missing websites/maps URLs; standardize metros; remove duplicates.
Day 5–7: Produce 100 leads/day (300 total). Maintain a running count by vertical: Dentist 40%, Med Spa 30%, HVAC/Plumbing 30%.
Day 8: Enrichment sprint: fill missing emails from websites for at least 150 records; add owner/manager names where easily found.
Day 9: Produce final 150–250 leads; ensure at least 200 Priority A/B combined.
Day 10: Final QA + export CSV; freeze columns; ensure last_review_excerpt is compliant (paraphrase if needed).

H) OUTREACH TEMPLATE REFERENCES (for your copy)
When sending cold email, reference:
- Website (legitimacy proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to
Include these in signature/footer or “about us” line in sequence #1.

If you want, I can convert this into a single downloadable CSV header row + a companion “collector checklist” that a VA can follow step-by-step in under 10 minutes per lead.