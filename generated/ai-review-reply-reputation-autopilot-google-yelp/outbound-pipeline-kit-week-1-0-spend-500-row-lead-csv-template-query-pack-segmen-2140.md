# Outbound Pipeline Kit (Week 1 / $0 Spend): 500-Row Lead CSV Template + Query Pack + Segmented Cold Emails + Daily Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T19:53:24.788Z

---

BUSINESS ID (use in all outreach)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

A) GEO SCOPE (locked for initial list)
Top 25 US metros (use city + state in queries):
1 NYC NY, 2 Los Angeles CA, 3 Chicago IL, 4 Houston TX, 5 Phoenix AZ, 6 Philadelphia PA, 7 San Antonio TX, 8 San Diego CA, 9 Dallas TX, 10 San Jose CA, 11 Austin TX, 12 Jacksonville FL, 13 Fort Worth TX, 14 Columbus OH, 15 Charlotte NC, 16 San Francisco CA, 17 Indianapolis IN, 18 Seattle WA, 19 Denver CO, 20 Washington DC, 21 Boston MA, 22 El Paso TX, 23 Nashville TN, 24 Detroit MI, 25 Oklahoma City OK

B) GOOGLE MAPS QUERY PACK (copy/paste)
Goal: pull 20 leads per query x 25 metros x 1–2 vertical queries each to reach 500–1,000 quickly.

DENTAL (choose 1 per metro)
- “dentist in {CITY, ST}”
- “cosmetic dentist in {CITY, ST}”
- “family dentistry in {CITY, ST}”

MED SPA / AESTHETICS (choose 1 per metro)
- “med spa in {CITY, ST}”
- “aesthetic clinic in {CITY, ST}”
- “botox in {CITY, ST}”

HVAC / PLUMBING (choose 1 per metro)
- “hvac company in {CITY, ST}”
- “air conditioning repair in {CITY, ST}”
- “plumber in {CITY, ST}”

AGENCY/RESELLER (5–10 per week, not 500)
- “marketing agency dental in {CITY, ST}”
- “marketing agency med spa in {CITY, ST}”
- “digital marketing agency home services in {CITY, ST}”

C) LEAD LIST CSV TEMPLATE (500 rows) — HEADERS (paste into Google Sheets row 1)
lead_id,vertical,priority_tier,segment_primary,segment_secondary,business_name,city,state,metro,website,google_maps_url,phone,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,example_response_gap_note,owner_or_manager_name,role_guess,email_1,email_2,contact_source,personalization_line_1,personalization_line_2,notes

How to fill key fields (zero-cost):
- google_rating, review_count: from Google Business Profile card.
- last_review_date + last_review_excerpt: open “Reviews”, sort “Newest”, copy 1–2 sentences (or paraphrase).
- response_rate_proxy_last10: check newest 10 reviews; count how many have an “Owner response”. response_rate_proxy = responses/10.
- example_response_gap_note: “No owner responses visible on newest reviews” OR “Last owner response appears >60 days ago”.
- emails: from website contact page, footer, or “mailto:” links. If none, use contact form URL in notes and queue for phone outreach.

Segmentation rules (apply in Sheets):
- segment_primary:
  - not_responding if response_rate_proxy_last10 <= 0.2
  - low_rating if google_rating < 4.2
  - high_volume if review_count >= 200 OR (TODAY - last_review_date) <= 14 days
- priority_tier:
  - A if (not_responding AND high_volume) OR (low_rating AND high_volume)
  - B if (not_responding) OR (low_rating)
  - C if (high_volume only)

D) AGENCY/RESELLER LIST TEMPLATE (150 rows) — HEADERS
lead_id,vertical_focus,agency_name,city,state,website,linkedin_url,phone,decision_maker_name,role,email_1,email_2,clients_proof_snippet,offer_angle,notes

E) COLD EMAIL COPY (3-step) — LOCAL BUSINESS (segment-specific)
Tokens: {{first_name}}, {{business}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap}}, {{rating}}, {{review_count}}, {{website}}

1) INITIAL — Not Responding (primary)
Subject options:
- “Quick fix for your Google reviews”
- “{{business}}: replying to reviews in 12 hours”
- “Noticed a review response gap”

Body:
Hi {{first_name}} — I was looking at {{business}}’s Google reviews and noticed {{response_gap}}.

One recent review mentioned: “{{recent_review_snippet}}”. A fast, brand-safe reply there can prevent doubt from new patients/customers.

I run a small service that drafts (and can post) review replies for local {{vertical}}s:
- responses within 12 hours
- brand-safe templates tailored to your tone
- you can approve before anything goes live
- negative reviews get escalated immediately

You can see what we do here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a free 7-day trial? If you reply “yes,” I’ll send 2 sample replies for your latest reviews.

— Bob
agent_bob_replit+review-bot@agentmail.to

2) FOLLOW-UP #1 — Low Rating angle
Subject: “Re: {{business}} reviews”
Body:
Hi {{first_name}} — quick follow-up.

If you’re trying to lift a {{rating}} rating, consistent owner responses help (especially on the most recent negatives). We draft calm, policy-safe replies and flag issues that should go offline.

Want me to send 2 example replies (including one for a tough review) for {{business}}? Free.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

3) FOLLOW-UP #2 — High Volume / time-saver
Subject: “Should I close the loop?”
Body:
Hi {{first_name}} — last note.

With {{review_count}} reviews, it’s easy for replies to fall behind. If you want, I’ll:
1) draft replies for your 5 newest reviews
2) share them in one approval link/email
3) escalate any negatives immediately

If you want that, reply with “draft 5” and I’ll start.

— Bob
agent_bob_replit+review-bot@agentmail.to

F) COLD EMAIL COPY (3-step) — AGENCY/RESELLER
1) INITIAL
Subject: “Add review response management to your retainers”
Body:
Hi {{first_name}} — I’m Bob. I built a lightweight review-reply autopilot for Google/Yelp that agencies can bundle for local clients.

It drafts brand-safe replies, escalates negative reviews, and sends weekly KPI reports. Simple approval flow.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a free 7-day trial on one client? If you tell me the niche (dental/med spa/home services), I’ll send sample replies based on their newest reviews.

— Bob
agent_bob_replit+review-bot@agentmail.to

2) FOLLOW-UP #1
Subject: “Re: trial for one client?”
Body:
If helpful, we can run it white-label: you stay client-facing, we just deliver drafts + KPIs.

Want to test on one client this week?

— Bob

3) FOLLOW-UP #2
Subject: “Close the loop?”
Body:
If review management isn’t a priority right now, no worries. If you do want an easy add-on for retention + reputation, reply “trial” and I’ll set it up.

— Bob

G) DAILY SENDING OPS (Week 1, conservative deliverability)
- Day 1–2: 20 new emails/day per inbox (text-only, no links except website once). 100% manual personalization for Priority A.
- Day 3–4: 35/day. Add Follow-up #1 for Day 1 sends.
- Day 5–7: 50/day. Start agency lane: 5/day.
Rules:
- Bounce threshold: pause list if hard bounces >3% in a day; re-check emails.
- Spam/complaint: if any complaint occurs, reduce volume 50% next 48 hours.
- SLA: reply to positive responses within 2 hours during business day; otherwise same day.

H) CRM PIPELINE (stages + definitions)
1 Prospect (in CSV, not contacted)
2 Sent (email 1 sent)
3 Engaged (opened/replied/clicked OR replied from alias)
4 Qualified (pain confirmed: response gap/low rating/high volume + decision maker)
5 Demo Booked (time scheduled)
6 Trial (7-day free trial live)
7 Won (paid post-week-1) / Lost (no fit, no response after 3 touches)

I) WHAT’S REQUIRED TO PRODUCE THE 500–1,000 ROW CSV (NO SPEND)
- Throughput target: 50 leads/day/person with review fields; 80/day without response-rate proxy.
- Recommended build order:
  1) Pull 200 Priority-A candidates first (high volume + response gap / low rating)
  2) Then fill to 500 with Priority B
  3) Keep Priority C only if you have email + clear website and recent reviews

If you want, I can also provide a one-page VA instruction sheet (copy/paste) to delegate this list build cleanly.