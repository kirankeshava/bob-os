# 500–1,000 Lead CSV Build Playbook (Zero-Cost) — Queries, Sheet Template, Segmentation + QA (Dentists / Med Spas / HVAC-Plumbing + Agencies)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T00:59:12.077Z

---

Objective
Build a 500–1,000 row outbound CSV for “AI Review Reply & Reputation Autopilot” with segmentation and personalization hooks. This playbook is designed for zero-cost execution using Google Maps + company websites + free lookup sources. You (or a VA) can follow it exactly.

A) Target verticals + pull strategy (recommended split)
1) Dentists: 300 leads
2) Med spas / aesthetic clinics: 300 leads
3) HVAC + plumbers (home services): 300 leads
Optional agencies/resellers: 100–200 leads (separate tab)

B) Geography (choose one approach)
Approach 1 (fast + consistent): Top 25 US metros. Pull 30–40 leads per vertical per metro until you hit volume.
Approach 2 (focus): 5–10 states where you can sell/serve best. Pull 100–200 leads per vertical across major cities in those states.
Approach 3 (broad): US-wide by rotating metros weekly.

C) CSV / Google Sheet template (headers)
Create a Google Sheet with these columns (row 1):
1. business_name
2. vertical (dental | med_spa | home_services)
3. subtype (optional: “cosmetic dentist”, “aesthetic clinic”, “plumber”, “hvac contractor”)
4. city
5. state
6. address
7. phone
8. website
9. google_maps_url
10. google_rating
11. review_count
12. last_review_date (YYYY-MM-DD)
13. last_review_snippet (max 160 chars; paraphrase if needed)
14. owner_response_rate_last10 (0–1 decimal)
15. segment_primary (not_responding | low_rating | high_volume)
16. priority_tier (A | B | C)
17. contact_name (owner/manager if known)
18. contact_role (Owner | Practice Manager | Office Manager | General Manager | Marketing)
19. email_1
20. email_2
21. linkedin_url (optional)
22. notes
23. datasource (Google Maps manual)
24. date_added

D) Google Maps query pack (copy/paste search footprints)
Use Google Maps search. For each metro/state, run these searches and open results in new tabs. The goal is to find businesses with meaningful review activity.

Dentists:
- “dentist near {{city}}”
- “cosmetic dentist {{city}}”
- “family dentistry {{city}}”
- “dental clinic {{city}}”

Med spas:
- “med spa {{city}}”
- “aesthetic clinic {{city}}”
- “botox {{city}}”
- “laser hair removal {{city}}”

Home services (split into HVAC + plumbing):
- “HVAC contractor {{city}}”
- “air conditioning repair {{city}}”
- “heating repair {{city}}”
- “plumber {{city}}”
- “emergency plumber {{city}}”

Selection rule (to keep quality high):
- Must have: website OR a strong GBP presence (phone + active reviews).
- Prefer: review_count ≥ 75 OR at least 2 reviews in last 30 days.
- Skip: obvious national franchises unless locally owner-operated and review volume is high.

E) How to capture required Google data (fast workflow)
For each selected business:
1) From the Google business panel, capture: business_name, address, phone, website, rating, review_count.
2) Click reviews and sort by “Newest.”
3) Capture last_review_date from the newest review.
4) Copy a safe personalization snippet:
   - Use a short excerpt (max 160 characters) OR paraphrase (“someone mentioned wait time at checkout”).
   - Avoid sensitive personal info; do not include patient details. If in doubt, paraphrase.

F) Response-rate proxy (last 10 reviews)
Goal: estimate whether they respond to reviews.
Steps:
1) In the review list, examine the 10 most recent reviews.
2) Count how many have an “Owner response” (or business reply).
3) owner_response_rate_last10 = responses / 10.
Example: 1 response out of last 10 → 0.1.

G) Segmentation rules (deterministic)
Compute these segments:
1) not_responding:
   - owner_response_rate_last10 ≤ 0.2
2) low_rating:
   - google_rating < 4.2
3) high_volume:
   - review_count ≥ 200 OR last_review_date within last 14 days

segment_primary assignment (pick the highest urgency):
- If low_rating AND high_volume → segment_primary = low_rating
- Else if not_responding AND high_volume → segment_primary = not_responding
- Else if low_rating → low_rating
- Else if not_responding → not_responding
- Else if high_volume → high_volume

Priority tier:
- Tier A: (low_rating AND high_volume) OR (not_responding AND high_volume)
- Tier B: low_rating OR not_responding
- Tier C: high_volume only

H) Contact + email capture (zero-cost enrichment)
Primary method: business website.
1) Check website header/footer/contact page for direct emails.
2) Check “Team” / “About” pages for Practice Manager / Office Manager / GM.
3) If no email shown, use format guesses only when domain is clear:
   - common patterns: info@, contact@, hello@, office@, support@, appointments@ (dental), scheduling@.
4) If you use guessed emails, mark notes = “pattern guess” and keep a second email blank unless confirmed.

Secondary method (free): Google “{{business_name}} {{city}} email” and look for citations, Facebook pages, directory listings that show email.

I) Agency/reseller lead list (separate tab)
Goal: agencies already selling local marketing can resell “review reply autopilot” to their clients.
Search footprints (Google):
- “dental marketing agency {{state}}”
- “med spa marketing agency {{state}}”
- “home services marketing agency {{state}}”
- “local SEO agency {{city}}”
- “reputation management agency {{city}}”

Agency sheet columns (minimum):
agency_name, website, city_state, niche_focus, contact_name, role (Founder/Partner/Head of Client Success), email_1, linkedin_url, notes.

J) QA checklist (sample 10% daily)
Reject/replace any row that fails:
- Wrong category (not actually a dentist/med spa/HVAC/plumbing).
- No website AND extremely low activity (e.g., <20 reviews and last review > 6 months) unless rating <4.2.
- Duplicate locations for the same chain unless you explicitly want multi-location rollups.
- Missing google_maps_url.
- last_review_snippet includes personal medical details → paraphrase.

K) Daily production targets (manual)
A single person can typically do 40–80 rows/day depending on email availability.
- Day 1–2: 50 rows/day (learn workflow)
- Day 3–7: 80 rows/day (steady state)
With a VA: 150–250 rows/day is realistic with QA.

L) Output format
Export as CSV with UTF-8 encoding. Keep dates normalized YYYY-MM-DD. Ensure URLs are full https links.

M) Next step after list is built (for outbound)
Use priority tiers for send order:
- Week 1: Tier A only (highest pain, highest response likelihood)
- Week 2: Tier B
- Week 3: Tier C + agencies

Owner decision needed to finalize queries:
Reply with your chosen geography approach (Top 25 metros vs 5–10 states vs US-wide) and, if states, list them. I will then generate the exact metro/state list and per-vertical quotas to hit 1,000 rows with even coverage.