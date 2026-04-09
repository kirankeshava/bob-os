# Outbound Pipeline Kit (Ready-to-Run): Query Pack + CSV Template + Segmentation + Cold Emails + Daily Ops + CRM Stages (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:48:27.680Z

---

BUSINESS CREDENTIALS TO USE IN ALL OUTREACH
- Website (credibility link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

1) ICP + GEOGRAPHY (LOCK THIS FOR THE FIRST 30 DAYS)
Recommended scope for first list: Top 25 US metros (US-only). Rationale: lots of review volume, consistent operator sophistication, and easier personalization.
Verticals:
A) Dentists (general + cosmetic)
B) Med spas / aesthetic clinics
C) HVAC + Plumbing (home services)
Parallel lane: small marketing agencies serving these verticals (reseller).

2) GOOGLE MAPS QUERY PACK (COPY/PASTE)
Use format: "{vertical keyword} in {metro}". Example metros: New York NY, Los Angeles CA, Chicago IL, Houston TX, Phoenix AZ, Philadelphia PA, San Antonio TX, San Diego CA, Dallas TX, San Jose CA, Austin TX, Jacksonville FL, Fort Worth TX, Columbus OH, Charlotte NC, San Francisco CA, Indianapolis IN, Seattle WA, Denver CO, Washington DC, Nashville TN, Oklahoma City OK, El Paso TX, Boston MA, Portland OR.

DENTAL QUERIES (run 2–3 per metro)
- "dentist in {metro}"
- "cosmetic dentist in {metro}"
- "family dental in {metro}"

MED SPA QUERIES
- "med spa in {metro}"
- "aesthetic clinic in {metro}"
- "botox in {metro}" (yields many med spas; QA category)

HOME SERVICES QUERIES
- "HVAC in {metro}"
- "air conditioning repair in {metro}"
- "plumber in {metro}"

AGENCY/RESELLER QUERIES (per metro or statewide)
- "digital marketing agency dentists {state}" / "dental marketing agency"
- "med spa marketing agency"
- "home services marketing agency" / "HVAC marketing agency"
Roles to find: Founder, Owner, Managing Partner, Client Success, Account Manager.

3) LEAD CSV TEMPLATE (HEADERS)
Create a Google Sheet with these columns (export CSV later):
- business_name
- vertical (dentist|med_spa|hvac_plumbing|agency)
- city
- state
- metro
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- last_review_excerpt (short snippet for hook; 10–25 words)
- owner_response_rate_last10 (0–1; proxy)
- responded_to_last_review (yes/no)
- segment (not_responding|low_rating|high_volume|mixed)
- priority (A|B|C)
- contact_name (if found)
- role_guess (owner|manager|front_desk|marketing|unknown)
- email_1
- email_2
- source (maps|website|facebook|linkedin|other)
- notes

DATA DICTIONARY + HOW TO FILL FAST
- google_rating, review_count: from Google business card.
- last_review_date: open reviews → sort by newest → record date.
- owner_response_rate_last10: count owner replies in the latest 10 reviews / 10.
- responded_to_last_review: whether the most recent review has an owner reply.
- last_review_excerpt: copy a safe short excerpt (avoid health/PHI; paraphrase if sensitive).
- emails: check website Contact page, About page, footer; look for owner/manager email. If none: use generic (info@, hello@) if listed.

SEGMENTATION RULES (SIMPLE + OPERATIONAL)
- not_responding: owner_response_rate_last10 <= 0.2 OR responded_to_last_review = no
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within 14 days
- mixed: if multiple conditions true (store in notes; choose priority based on rubric below)

PRIORITY SCORING (ROUTING)
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating (but not high_volume)
- Priority C: high_volume only

4) 3-STEP COLD EMAIL SEQUENCE (LOCAL BUSINESSES)
Personalization tokens:
- {{business_name}}, {{first_name}}, {{city}}, {{vertical}}, {{recent_review_excerpt}}, {{response_gap_fact}}, {{rating}}, {{review_count}}
Credibility line must include website URL.

EMAIL 1 (INITIAL) — “12-hour responses, you approve”
Subject options (pick 1):
1) {{business_name}}: quick win on Google reviews
2) Noticed a response gap on your recent reviews
3) Can I draft replies for your next 10 reviews?

Body:
Hi {{first_name}} — Bob here.

I was looking at {{business_name}}’s Google reviews and noticed: “{{recent_review_excerpt}}”. {{response_gap_fact}}.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses to Google Business Profile + Yelp reviews, escalates negative ones, and sends weekly KPI reports.

Offer: we respond within 12 hours, you approve before anything posts (or we can do “draft-only” to start).

Worth a 10-minute call this week to see if we can take review replies off your plate and protect your rating?

— Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

EMAIL 2 (FOLLOW-UP 2–3 DAYS) — “I’ll draft 5 for free”
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

If you want, I’ll draft responses to 5 recent reviews for {{business_name}} (including any negatives) so you can judge tone/quality. No commitment.

If that’s useful, which review platform matters most for you right now—Google, Yelp, or both?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

EMAIL 3 (FOLLOW-UP 5–7 DAYS) — “close the loop”
Subject options:
1) Should I close this out?
2) Last try — review replies

Body:
Hi {{first_name}} — should I close the loop?

Typical results we see when owners reply faster/more consistently: fewer public escalations, better conversion from “shopping” customers, and less staff time spent writing replies.

If review replies aren’t a priority, no worries—just reply “later” and I’ll follow up next month.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

SEGMENT-SPECIFIC HOOKS (DROP-IN LINES)
- Not responding: “I noticed several recent reviews don’t have an owner response (including the last one).”
- Low rating: “I saw you’re at {{rating}} stars—replying well to negatives is one of the fastest ways to stabilize that.”
- High volume: “Looks like you’re getting reviews consistently—having a 12-hour reply SLA keeps it from piling up.”

5) AGENCY/RESELLER EMAIL (INITIAL)
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on to improve client ratings (no extra headcount)

Body:
Hi {{first_name}} — Bob here.

If you manage local clients (dental/med spa/home services), we built an AI Review Reply & Reputation Autopilot that drafts brand-safe Google + Yelp responses, escalates negatives, and reports weekly KPIs.

Agencies use it as:
- a white-label add-on (you keep margin)
- or an internal tool to stop review replies from becoming a bottleneck

Open to a quick chat? If you tell me your niche + client count, I’ll suggest a simple packaging + pricing model.

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6) DAILY SENDING OPS + 14-DAY RAMP (SAFE DEFAULT)
Infrastructure-agnostic (works with any inbox):
- Day 1–3: 15–20 sends/day/inbox
- Day 4–7: 25–35 sends/day/inbox
- Day 8–14: 40–60 sends/day/inbox
Rules:
- Plain text only, no attachments.
- Keep links to 1 max (use the website link above).
- Bounce threshold: pause list source if >3% hard bounces in a day.
- Complaint threshold: stop and revise copy if any spam complaints.
- Replies SLA: same day response; negative replies = polite close.
- Booked calls: within 72 hours; send agenda + 2 bullets of value.

LIST QA (10-minute sampling per 100 leads)
- Verify category matches vertical.
- Verify website exists and is same business.
- Ensure review snippet is not sensitive; paraphrase if needed.
- Ensure last review date is recent enough for personalization.

7) CRM PIPELINE (MINIMAL + EFFECTIVE)
Stages:
1) Prospects (uncontacted)
2) Sent (Email 1 sent)
3) Engaged (replied/opened and clicked—if tracked)
4) Qualified (pain confirmed: time, negative reviews, response gap)
5) Demo Booked
6) Trial/POC (draft-only or approve-before-post)
7) Paid
8) Lost (reason: no need, wrong contact, price, timing)
Exit criteria examples:
- Sent → Engaged: any reply OR explicit interest OR asks questions.
- Engaged → Qualified: confirms they want faster replies / brand safety / escalation / reporting.

8) WHAT YOU NEED NEXT TO EXECUTE
Option 1 (free, slower): Use the query pack + Sheet template; build 50–100 leads/day manually (or with a VA).
Option 2 (faster, paid): use a Maps scraper + enrichment (requires spend approval).

If you confirm “Top 25 US metros” as the scope, this kit is ready to run immediately.