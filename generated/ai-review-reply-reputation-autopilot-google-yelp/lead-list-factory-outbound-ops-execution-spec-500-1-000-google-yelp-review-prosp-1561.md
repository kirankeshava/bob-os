# Lead List Factory + Outbound Ops (Execution Spec): 500–1,000 Google/Yelp Review Prospects + Agency Lane

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T16:38:52.886Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Proof/website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email to use in outreach: agent_bob_replit+review-bot@agentmail.to

GOAL
Build a 500–1,000 record CSV of local businesses + a smaller agency/reseller list, segmented into:
- not_responding
- low_rating
- high_volume
…and prioritized A/B/C for outbound.

RECOMMENDED GEO (to keep categories clean and lead quality high)
Top 25 US metros (copy/paste list):
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

VERTICALS + EXACT GOOGLE MAPS QUERY STRINGS
Use these patterns (replace {METRO}):

1) Dentists
- “dentist {METRO}”
- “cosmetic dentist {METRO}”
- “family dentistry {METRO}”
- “dental implant {METRO}”

2) Med Spas / Aesthetics
- “med spa {METRO}”
- “botox {METRO}”
- “laser hair removal {METRO}”
- “aesthetic clinic {METRO}”

3) HVAC / Plumbing (home services)
- “hvac {METRO}”
- “air conditioning repair {METRO}”
- “plumber {METRO}”
- “drain cleaning {METRO}”

VOLUME TARGET
- 200–350 dentists
- 200–350 med spas
- 200–350 HVAC/plumbing
Optional: 50–150 agencies (separate tab/list)

CSV COLUMN HEADERS (PASTE INTO SHEETS ROW 1)
business_name,vertical,city_state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_10_reviews_owner_responses,response_rate_proxy,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

DATA DICTIONARY (WHAT EACH FIELD MEANS)
- business_name: Exact GBP name.
- vertical: dentist | med_spa | hvac_plumbing | agency.
- city_state: e.g., “Austin, TX”.
- phone: from GBP.
- website: from GBP (if missing, skip unless exceptionally high intent).
- google_maps_url: share link to the listing.
- google_rating: star rating.
- review_count: total Google reviews.
- last_review_date: date of most recent review (from Reviews tab).
- last_10_reviews_owner_responses: integer 0–10 counting whether the owner/business replied.
- response_rate_proxy: = last_10_reviews_owner_responses/10 (as %).
- segment rules:
  * not_responding = response_rate_proxy <= 0.2 OR 0/10 replies
  * low_rating = google_rating < 4.2
  * high_volume = review_count >= 200 OR last_review_date within last 14 days
  * if multiple apply, keep the “most painful” first in notes (e.g., low_rating+not_responding)
- priority_tier:
  * Priority A = (not_responding AND high_volume) OR (low_rating AND high_volume)
  * Priority B = not_responding OR low_rating
  * Priority C = high_volume only
- owner_or_manager_name / role_guess: best available from site/about/team/LinkedIn.
- email_1/email_2: from website contact page; if none, use publicly listed management email formats (avoid guessing if possible).
- personalization_snippet: 10–25 words from the most recent review OR a paraphrase (safer) + the gap (“noticed no public reply”).

ZERO-COST COLLECTION WORKFLOW (HUMAN/VA)
1) Run query in Google Maps (desktop).
2) Open listing → capture: name, rating, review count, phone, website, share URL.
3) Click Reviews → sort by “Newest” → record last_review_date.
4) For the newest ~10 reviews: count how many have an owner response → fill last_10_reviews_owner_responses.
5) Pull a personalization_snippet:
   - Safe approach: paraphrase the theme (e.g., “Saw a recent review praising the front desk… noticed no public reply.”)
   - If quoting, keep it short and exact; do not include medical specifics for med spas.
6) Find email:
   - Website footer/contact page.
   - “Team” or “About” page for manager/owner name.
   - If only form exists, mark email blank and put contact URL in notes.

QA RULES (PREVENT GARBAGE LEADS)
- Exclude: franchises with corporate review teams (unless location clearly independent), listings with no website, closed/permanently closed, or categories clearly mismatched.
- Dedupe by website + phone.
- QA sample 10% per batch of 100 leads: verify vertical, website works, last_review_date not older than 12 months (unless low_rating).

AGENCY / RESELLER LANE (SEPARATE TAB)
Target: small marketing agencies managing local SEO/GBP.
Search footprints (Google):
- “dental marketing agency {STATE}”
- “med spa marketing agency”
- “hvac marketing agency”
- “local seo agency dentist”
Fields: agency_name, website, city_state, services, contact_name, role, email, linkedin_url, notes.
Offer positioning: “white-label review reply + escalation + weekly KPI report; you keep margin.”

OUTBOUND ROUTING (TIED TO SEGMENTS)
- not_responding: lead with responsiveness gap + “respond within 12 hours, brand-safe, you approve.”
- low_rating: lead with “negative review escalation + calm, compliant replies + trend reporting.”
- high_volume: lead with “ops throughput: never miss a review; weekly KPI report for owners.”
Always include proof link + direct reply-to email: agent_bob_replit+review-bot@agentmail.to and the website URL above.

DAILY OPS TARGETS (ONCE LIST EXISTS)
- Day 1–3: 30–50 new emails/day (mostly Priority A)
- Day 4–7: 50–80/day
- Day 8–14: 80–120/day
Follow-ups: 1st follow-up on day 2–3; 2nd follow-up on day 5–7.
CRM stages: Prospect → Sent → Replied → Qualified → Demo Booked → Trial → Paid → Lost.

NEXT DECISION NEEDED (NON-FINANCIAL)
Pick the geography scope for the first list build. Default recommendation: Top 25 metros above to reach 500–1,000 quickly with consistent quality.