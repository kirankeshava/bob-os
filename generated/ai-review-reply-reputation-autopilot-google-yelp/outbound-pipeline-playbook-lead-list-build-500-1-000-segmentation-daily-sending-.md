# Outbound Pipeline Playbook — Lead List Build (500–1,000), Segmentation, Daily Sending Ops + Agency Lane (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:02:52.055Z

---

## Goal
Build a repeatable outbound machine that generates a segmented lead CSV (500–1,000 rows) for dentists, med spas, and HVAC/plumbing, plus an agency/reseller list. Then run daily sending with a simple CRM pipeline.

---

## 1) Decide the Geography (pick one)
Choose ONE to avoid list chaos:
- **Option A (recommended): Top 25 US metros** (fastest density, high review velocity)
- **Option B: 5–10 target states** (if you want tighter market focus)
- **Option C: US-wide** (only if you have scraper/enrichment capacity; manual becomes messy)

If you pick Option A, use: NYC, LA, Chicago, Houston, Phoenix, Philly, San Antonio, San Diego, Dallas, San Jose, Austin, Jax, SF, Columbus, Indy, Charlotte, Seattle, Denver, DC, Boston, Nashville, Detroit, OKC, Portland, Vegas.

---

## 2) Lead List Build Method (zero-cost, human/VA-driven)
### Output: Google Sheet → CSV export
Create a Google Sheet with these headers (exact):
- business_name
- vertical (dental | med_spa | hvac_plumbing | agency)
- category_on_maps
- city
- state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy_last10 (0–100%)
- segment (not_responding | low_rating | high_volume | mixed)
- priority (A | B | C)
- personalization_snippet (<=160 chars)
- contact_name
- contact_role_guess
- email_1
- email_2
- linkedin_url (optional)
- notes

### How to pull leads (repeatable, low-noise)
For each metro/state, run **Google Maps** searches using the query pack below. Open each listing, capture rating + reviews, click “Reviews” and note the **date of the most recent review**. For response-rate proxy: scan the last ~10 reviews and count how many have an “Owner response”.

#### Query pack (use quotes rarely; keep simple)
**Dental (choose one per run):**
- dentist [CITY]
- dental clinic [CITY]
- cosmetic dentist [CITY]
- pediatric dentist [CITY]
- orthodontist [CITY] (optional, good LTV)

**Med spa / aesthetics:**
- med spa [CITY]
- medical spa [CITY]
- aesthetic clinic [CITY]
- botox [CITY]
- laser hair removal [CITY]

**HVAC/Plumbing (combine as needed):**
- hvac company [CITY]
- air conditioning repair [CITY]
- heating repair [CITY]
- plumber [CITY]
- plumbing company [CITY]

**Agency lane:**
- dental marketing agency [STATE] / [CITY]
- med spa marketing agency [STATE] / [CITY]
- hvac marketing agency [STATE] / [CITY]
- local seo agency [CITY]

### Filters / exclusions (quality control)
Exclude:
- National chains/franchises where outreach won’t reach decision-maker (unless the location clearly has local management and a unique website)
- Listings without a website (email enrichment becomes harder; keep only if review volume is very high)
- Categories that don’t match (e.g., “beauty salon” when you need med spa)
- Businesses with <25 reviews (lower urgency), unless rating is <4.0

---

## 3) Segmentation Rules (apply per row)
Compute these fields:

### A) Response-rate proxy (last 10 reviews)
- response_rate_proxy_last10 = (owner_responses_in_last10 / 10) * 100
If there are fewer than 10 recent reviews visible, use the last available (e.g., 5) and compute accordingly; note in “notes”.

### B) Segments
- **not_responding:** response_rate_proxy_last10 <= 20%
- **low_rating:** google_rating < 4.2
- **high_volume:** review_count >= 200 OR last_review_date within 14 days
- **mixed:** if two conditions apply (e.g., low_rating + not_responding)

### C) Priority scoring (simple, operational)
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume) OR mixed + high_volume
- **Priority B:** not_responding OR low_rating (without high_volume)
- **Priority C:** high_volume only (rating ok + responding ok)

### Personalization snippet rule (safe)
Use one of:
- Quote a short fragment (no full name): “Saw a recent review mentioning ‘[2–6 word quote]’.”
- Or paraphrase: “Saw a recent review about scheduling / wait time / follow-up.”
Avoid mentioning medical specifics; keep it operational (wait time, billing, front desk, responsiveness, follow-up).

---

## 4) Daily Production Targets (for list building)
If manual:
- 1 person can produce **40–60 rows/day** with rating/review count/last review date/response proxy + website.
- If also finding emails (free methods), expect **25–40 rows/day**.

Plan:
- Day 1–2: build first 200 rows (mix of verticals, focus Priority A/B)
- Day 3–7: scale to 500–1,000 rows

---

## 5) Email Finding (free-first workflow)
For each website:
1) Check Contact page footer for email.
2) Look for “mailto:” in page source.
3) Try common patterns if domain is clear: info@, office@, hello@, support@.
4) For agencies, look for team/about pages and direct emails.
Log as email_1/email_2; if unknown, leave blank but keep the lead if Priority A.

---

## 6) CRM Pipeline (stages + entry/exit criteria)
Use a simple sheet or CRM with these stages:
1) **Prospect (Ready)** → has email_1 + google_maps_url + segment + priority
2) **Sent (Step 1)** → date_sent_1 logged
3) **Sent (Step 2)** → follow-up 1 sent
4) **Sent (Step 3)** → follow-up 2 sent
5) **Replied** → any response
6) **Qualified** → confirms they own/manage GBP/Yelp and want help
7) **Demo Booked** → calendar time set
8) **Trial/POC** → pilot running
9) **Paid** → converted
10) **Lost** → not a fit / no response after 3 steps + 21 days

---

## 7) Daily Sending Ops (human-executable cadence)
### 14-day ramp (per inbox)
- Days 1–2: 10/day
- Days 3–4: 20/day
- Days 5–6: 30/day
- Days 7–10: 40/day
- Days 11–14: 50/day
If you run 2 inboxes, double totals.

### Daily routine (60–90 minutes)
1) Add 25–50 new prospects (Priority A then B).
2) Send Step 1 to new prospects.
3) Send follow-ups due today (Step 2 after 2 business days; Step 3 after 4 business days).
4) Process replies twice/day. SLA: respond within 2–4 hours during business time.
5) Log outcomes in CRM (Qualified / Not now / Wrong person).

### Health thresholds
- Bounce rate > 3% in a day: stop, clean list, verify domains manually, reduce volume.
- Spam complaints: stop immediately and tighten targeting + copy.

---

## 8) Agency/Reseller Lane (parallel pipeline)
### Who to target
- Small-to-mid agencies doing Local SEO/PPC for dental/medspa/home services
- Titles: Owner, Founder, Head of Client Success, Operations

### Pitch (positioning)
- They resell “Review Reply Autopilot + weekly KPI reporting” as an add-on.
- Benefits: retention tool, protects reputation, reduces churn, easy upsell.

### Qualification questions
- How many local clients on GBP? Any on Yelp?
- Do clients complain about reviews or low response?
- Do they already offer reputation management? If yes, what’s missing (speed, staffing, reporting)?

---

## 9) What you should do next (execution order)
1) Confirm geography option (A/B/C).
2) Build first 200 leads using the query pack (focus Priority A/B).
3) Start sending to the first 50–100 while list-building continues (don’t wait for 1,000).
4) Add agency lane: build 50 agencies and run a separate sequence.

If you tell me which geography option you chose, I’ll refine the query pack into an exact run-list (by metro/state + vertical) and a day-by-day quota plan to hit 1,000 rows.