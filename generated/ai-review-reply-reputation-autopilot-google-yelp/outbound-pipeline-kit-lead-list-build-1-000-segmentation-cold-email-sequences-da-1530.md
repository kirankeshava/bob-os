# Outbound Pipeline Kit — Lead List Build (1,000) + Segmentation + Cold Email Sequences + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T16:22:19.688Z

---

BUSINESS
- Product: AI Review Reply & Reputation Autopilot (Google/Yelp)
- Proof/legitimacy URL to share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Reply-to / contact: agent_bob_replit+review-bot@agentmail.to

1) VERTICALS + GEO (recommended default)
Primary verticals (high review velocity + high LTV):
A) Dentists (includes “cosmetic dentist”, “orthodontist” optional)
B) Med spas / Aesthetic clinics (includes “aesthetic clinic”, “botox”, “laser hair removal”)
C) HVAC + Plumbers (home services; high volume, often poor response ops)

Geography: Top 25 US metros for speed + density (easy to reach 1,000 without garbage).
Suggested metros list (use as city targets in queries): New York NY, Los Angeles CA, Chicago IL, Houston TX, Phoenix AZ, Philadelphia PA, San Antonio TX, San Diego CA, Dallas TX, San Jose CA, Austin TX, Jacksonville FL, Fort Worth TX, Columbus OH, Charlotte NC, San Francisco CA, Indianapolis IN, Seattle WA, Denver CO, Washington DC, Boston MA, Nashville TN, El Paso TX, Detroit MI, Oklahoma City OK.

2) GOOGLE MAPS QUERY PACK (copy/paste)
Goal: pull businesses with meaningful review presence. For each metro, run 2–3 queries per vertical.

Dentists:
- “dentist in {CITY}”
- “cosmetic dentist in {CITY}”
- “family dentist in {CITY}”

Med spas:
- “med spa in {CITY}”
- “aesthetic clinic in {CITY}”
- “botox in {CITY}”

HVAC/Plumbing:
- “HVAC contractor in {CITY}”
- “air conditioning repair in {CITY}”
- “plumber in {CITY}”

Agency lane (resellers):
- “dental marketing agency {CITY}”
- “med spa marketing agency {CITY}”
- “home services marketing agency {CITY}”
- “reputation management agency {CITY}”

3) LEAD LIST CSV TEMPLATE (headers)
Create a CSV/Google Sheet with these columns (exact names):
- business_name
- vertical
- website
- city_state
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- last_review_excerpt
- last_10_reviews_responses_count (0–10)
- response_rate_proxy (formula)
- segment (formula)
- priority (formula)
- contact_name
- role_guess (Owner/Manager/Office Manager/Practice Manager/GM/Marketing)
- email_1
- email_2
- linkedin_url (optional)
- notes

Data dictionary (how to fill):
- google_rating/review_count: from Google Business Profile card.
- last_review_date/excerpt: open Reviews → sort by “Newest” → capture date + 10–25 word snippet (or paraphrase if safer).
- last_10_reviews_responses_count: count owner responses in the last 10 newest reviews.
- website: from “Website” link on GBP; if none, skip.
- email_1/email_2: from website contact page; if none, use publicly listed admin emails (info@, office@, hello@). Do NOT guess personal emails unless you can validate from site.

4) SEGMENTATION + PRIORITY SCORING (formulas)
Definitions:
- Not Responding: response_rate_proxy <= 0.2 OR last_10_reviews_responses_count = 0
- Low Rating: google_rating < 4.2
- High Volume: review_count >= 200 OR (TODAY()-last_review_date) <= 14

Google Sheets formulas (assume columns):
- response_rate_proxy =IFERROR([last_10_reviews_responses_count]/10,0)
- segment (choose primary):
  =IF(OR([response_rate_proxy]<=0.2,[last_10_reviews_responses_count]=0),"not_responding",
    IF([google_rating]<4.2,"low_rating",
      IF(OR([review_count]>=200,(TODAY()-[last_review_date])<=14),"high_volume","other")))
- priority:
  =IF(OR(AND([segment]="not_responding",OR([review_count]>=200,(TODAY()-[last_review_date])<=14)),AND([segment]="low_rating",OR([review_count]>=200,(TODAY()-[last_review_date])<=14))),"A",
    IF(OR([segment]="not_responding",[segment]="low_rating"),"B",
      IF([segment]="high_volume","C","D")))

Routing rules:
- Priority A: send immediately; personalize heavily; offer “12-hour response SLA + escalation”.
- Priority B: send next; focus on response gap OR rating lift.
- Priority C: sell throughput/ops (volume handling + weekly KPI report).

5) COLD EMAIL SEQUENCES (3-step) — include legitimacy URL + reply-to
Use tokens: {{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap_fact}}, {{rating}}, {{review_count}}.

5.1 LOCAL BUSINESS — INITIAL (choose variant by segment)
SUBJECT OPTIONS:
- “Quick help with Google/Yelp reviews at {{business_name}}”
- “Noticed a review-response gap for {{business_name}}”
- “12-hour review replies (you approve)”

A) Variant: NOT RESPONDING
Hi {{first_name}} — I was looking at {{business_name}}’s recent Google reviews and noticed a few newer ones don’t have owner replies (e.g., “{{recent_review_snippet}}”).

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google Business Profile + Yelp, escalates negative reviews, and sends weekly reputation KPIs. You can approve replies or let it post automatically.

Offer: we respond within 12 hours, and anything negative gets flagged for you before posting.

If I send 2–3 example replies for your most recent reviews, would you want to see them?

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

B) Variant: LOW RATING
Hi {{first_name}} — I saw {{business_name}} is at ~{{rating}} on Google, and some recent feedback sounds fixable with the right public response (example: “{{recent_review_snippet}}”).

We help local businesses respond quickly and safely on Google/Yelp, escalate negatives for human handling, and track weekly KPIs (rating trend, response time, % responded, negative themes).

Would it be useful if I drafted responses to your 3 most recent negative/neutral reviews so you can compare with what you have today?

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

C) Variant: HIGH VOLUME
Hi {{first_name}} — {{business_name}} has strong review activity (~{{review_count}} total, and new reviews coming in regularly). Many teams fall behind on replies just due to volume.

Our Autopilot drafts/post brand-safe responses for Google/Yelp, escalates negatives, and emails a weekly KPI report so nothing slips.

Open to a quick 10-minute look? If you share your GBP link, I’ll send sample replies for your latest reviews.

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

5.2 FOLLOW-UP #1 (2–3 business days later)
Subject: “Want me to draft a couple replies?”
Hi {{first_name}} — checking in. If you send the link to your Google Business Profile (or confirm it’s the one I found), I’ll draft 2–3 review replies in your brand voice.

If this isn’t on your plate, who owns reviews/reputation at {{business_name}}?
— Bob
agent_bob_replit+review-bot@agentmail.to

5.3 FOLLOW-UP #2 (5–7 business days later, breakup)
Subject: “Close the loop?”
Hi {{first_name}} — last note from me.

If review replies aren’t a priority right now, no worries. If they are, we can cover Google + Yelp with a 12-hour response SLA, negative-review escalation, and weekly KPI reporting.

Should I:
1) send a few sample replies for {{business_name}}, or
2) circle back in 60 days?

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

6) AGENCY / RESELLER OUTREACH (initial)
Subject: “White-label review replies for your clients?”
Hi {{first_name}} — do you manage Google Business Profiles/reputation for local clients (dental, med spa, home services)?

We built an AI Review Reply & Reputation Autopilot: brand-safe drafts + optional posting for Google/Yelp, negative-review escalation, and weekly KPI reporting. Agencies can run it as a white-label add-on.

If you tell me your client mix + monthly review volume, I’ll suggest a simple packaging + pricing model.

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

7) DAILY SENDING OPS + 14-DAY RAMP (no paid tools assumed)
List QA (daily before sending):
- Must have: business_name, vertical, city_state, google_maps_url, rating, review_count, last_review_date, email_1.
- Exclude: franchises with corporate-only contact, businesses with no website and no email, irrelevant categories.
- Bounce guard: verify email format by checking website/contact page; avoid scraping-only guesses.

CRM stages (simple): Prospect → Enriched → Sent → Replied → Qualified → Demo Booked → Trial/Setup → Paid → Lost.

Ramp schedule (per inbox):
- Days 1–3: 10–20/day
- Days 4–7: 25–40/day
- Days 8–14: 40–80/day
Rules: stop/slow if bounce rate >3% or spam complaints >0.1%.

Daily activity targets (starting point):
- New prospects added: 30–50/day
- Emails sent: 30–80/day (depending on ramp)
- Follow-ups: 1 follow-up block per day (keep consistent)
- Reply SLA: same business day; negative-review pain replies within 2 hours

8) WHAT TO DO NEXT (execution order)
1) Confirm geography: Top 25 metros (recommended) OR specify 5–10 states.
2) Build first 200 leads using query pack + template (48 hours).
3) Start sends to Priority A first using correct segment variant.
4) Continue list build until 1,000; send daily on ramp; track replies + booked calls in CRM.

If you want me to tailor the query pack to a tighter niche (e.g., “pediatric dentists only” or “high-end cosmetic injectables only”), confirm and I’ll adjust the exact search terms and exclusion rules.