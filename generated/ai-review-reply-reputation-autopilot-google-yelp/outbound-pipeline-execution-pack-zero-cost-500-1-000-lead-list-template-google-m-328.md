# Outbound Pipeline Execution Pack (Zero-Cost): 500–1,000 Lead List Template + Google Maps SOP + Segmentation/Priority + Updated Cold Email Hooks

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:17:58.433Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Proof/website to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Outbound reply/contact email: agent_bob_replit+review-bot@agentmail.to

A) GEOGRAPHY DEFAULT (RECOMMENDED)
Use “Top 25 US metros” for the first 500–1,000 leads (high density, consistent review velocity, easier QA). Examples: NYC, LA, Chicago, Houston, Phoenix, Philly, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, SF, Columbus, Fort Worth, Indy, Charlotte, Seattle, Denver, DC, Nashville, OKC, El Paso, Boston, Portland.

B) GOOGLE MAPS QUERY PACK (COPY/PASTE)
Run each query in Google Maps and collect leads into the Sheet.
Dentists:
- “dentist + {metro}”
- “cosmetic dentist + {metro}”
- “family dentistry + {metro}”
Med spas:
- “med spa + {metro}”
- “aesthetic clinic + {metro}”
- “botox + {metro}”
HVAC/Plumbing:
- “HVAC company + {metro}”
- “air conditioning repair + {metro}”
- “plumber + {metro}”

C) LEAD LIST CSV / GOOGLE SHEETS TEMPLATE (HEADERS)
Create a Google Sheet with these exact columns (row 1 headers). Export CSV when done.
1 business_name
2 vertical (dentist | med_spa | hvac_plumbing | agency)
3 city
4 state
5 metro
6 website
7 phone
8 google_maps_url
9 google_rating
10 review_count
11 last_review_date (YYYY-MM-DD)
12 last_review_snippet (keep <=160 chars)
13 last_10_reviews_count (enter 10 once you’ve checked last 10)
14 owner_responses_in_last_10 (0–10)
15 response_rate_proxy
16 segment (not_responding | low_rating | high_volume | combo)
17 priority (A | B | C)
18 contact_name (owner/manager if known)
19 role_guess (Owner | Practice Manager | Office Manager | GM | Marketing)
20 email_1
21 email_2
22 linkedin_url (optional)
23 yelp_url (optional)
24 notes

FORMULAS (Google Sheets)
- response_rate_proxy (col 15):
=IFERROR(N14/N13,"")
- segment (col 16) using rating/volume/response:
Use helper booleans or a single nested IF. Simple readable approach:
Create three helper columns (optional):
not_resp := (response_rate_proxy<=0.2)
low_rat := (google_rating<4.2)
high_vol := (review_count>=200)
Then segment rule:
If (not_resp AND high_vol) OR (low_rat AND high_vol) => “combo”
Else if not_resp => “not_responding”
Else if low_rat => “low_rating”
Else if high_vol => “high_volume”
Else blank

- priority (col 17):
Priority A: combo OR (not_responding AND last_review_date within 14 days) OR (low_rating AND last_review_date within 14 days)
Priority B: not_responding OR low_rating
Priority C: high_volume only
(If you want a formula, add a column “days_since_last_review” and compute with TODAY()-DATEVALUE(last_review_date), then nest IFs.)

D) MANUAL COLLECTION SOP (ZERO-COST)
Goal: 50–100 leads/day per person once practiced.
1) Open Google Maps, run one query from the pack.
2) For each business listing:
   - Confirm it’s not a national franchise directory listing and is a real local location.
   - Copy business name, phone, website, and the Maps URL.
   - Record google_rating and review_count from the listing.
3) Click reviews → sort by “Newest” if available.
   - Record last_review_date (date of most recent review).
   - Capture a short snippet from the most recent review (<=160 chars). Prefer paraphrase if the review contains sensitive medical details.
4) Response-rate proxy (last 10):
   - Scroll through the newest 10 reviews.
   - Count how many have an “Owner response” (or equivalent).
   - Enter last_10_reviews_count = 10 and owner_responses_in_last_10 = that count.
   - The sheet computes response_rate_proxy.
5) Segment + priority:
   - Let formulas assign segment/priority.
6) Find emails (free-first):
   - On the website, look for Contact page / footer emails.
   - Look for staff pages for “Office Manager”, “Practice Manager”, “General Manager”.
   - If none, use formats like info@, hello@, contact@ only as a fallback.
   - Add second email if present (marketing@, manager@, office@).
7) Quality rules (QA):
   - Require at least website OR a usable email.
   - Skip listings with obviously wrong category (e.g., “Dental laboratory” instead of “Dentist”).
   - Keep review_snippet short and professional; do not include profanity.

E) PERSONALIZATION SAFETY RULE (DELIVERABILITY + BRAND)
Use review context but avoid quoting sensitive medical details. Default to paraphrase: “I saw a recent review mentioning wait times…” instead of quoting names/conditions. Keep personalization to one sentence; the rest of the email should be standardized.

F) AGENCY/RESELLER LANE (SUB-LIST SOP)
Target: small marketing agencies serving local SMB verticals; offer them a reseller margin or white-label.
How to find:
- Google: “dental marketing agency {state}”, “med spa marketing agency {metro}”, “HVAC marketing agency {metro}”, “local SEO agency dentist”.
- Clutch directory (free browsing) + agency websites.
What to capture:
- agency_name, website, contact email, founder name (if present), vertical focus, notes.
Segment agencies separately as vertical=agency.

G) UPDATED COLD EMAIL HOOK (INSERT INTO YOUR SEQUENCE)
Include legitimacy proof + direct reply email.
Add this PS line to Email #1 or #2:
“P.S. If helpful, here’s our product page with what ‘brand-safe replies + escalation + weekly KPIs’ looks like: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 — you can also just reply here or forward me to whoever handles reviews: agent_bob_replit+review-bot@agentmail.to.”

H) DAILY PRODUCTION TARGETS (LIST BUILD)
- Per collector: 60 leads/day average (first day may be 30–40; day 3+ should hit 60–100).
- QA sampling: every 25 rows, spot-check 5 rows for correct category, valid URL, and correct last review date.
- Build order: Priority A first (combo/not responding with fresh reviews), then Priority B, then C.

When you confirm geography, this pack is ready to execute immediately to generate the 500–1,000 lead CSV.