# Outbound Pipeline Kit (Execution-Ready): Lead List Build + Segmentation + Cold Emails + Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:44:23.454Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact email (use in signatures): agent_bob_replit+review-bot@agentmail.to

1) VERTICALS + GEO (high-intent)
Primary verticals (direct-to-local):
A. Dental practices
B. Med spas / aesthetic clinics
C. HVAC + plumbers (home services)
Parallel lane (higher leverage): marketing agencies that serve these verticals.

Recommended initial geography (fastest + consistent): Top US metros. Pick 10–25 metros and pull ~20–40 leads/vertical/metro.
Top metros list (choose 10–25): NYC, LA, Chicago, Houston, Phoenix, Philly, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, SF, Columbus, Fort Worth, Indianapolis, Charlotte, Seattle, Denver, DC, Nashville, El Paso, Detroit, Boston, Portland.

2) GOOGLE MAPS QUERY PACK (copy/paste)
Use these footprints per metro (swap city):
Dentists:
- “dentist in {CITY}”
- “dental clinic in {CITY}”
- “cosmetic dentist in {CITY}”
Med spas:
- “med spa in {CITY}”
- “aesthetic clinic in {CITY}”
- “botox in {CITY}”
Home services:
- “HVAC in {CITY}”
- “air conditioning repair in {CITY}”
- “plumber in {CITY}”
Agency/reseller lane:
- “dental marketing agency {CITY}”
- “medical spa marketing agency {CITY}”
- “home services marketing agency {CITY}”
- “local SEO agency {CITY}”

Lead selection rules (to keep list high-intent):
- Prioritize independent/local brands; skip national franchises unless multi-location owner is identifiable.
- Prefer review_count >= 50 OR last_review_date within 30 days.
- Prefer businesses with a website.

3) LEAD LIST CSV TEMPLATE (headers)
Paste as your first row in CSV/Sheets:
Business Name,Vertical,City,State,Website,Phone,Google Maps URL,Google Rating,Review Count,Last Review Date,Response Rate Proxy (last10),Segment,Priority,Personalization Snippet (review excerpt),Owner/Manager Name,Role Guess,Email 1,Email 2,LinkedIn URL,Notes

Data dictionary + how to fill (zero-cost sources):
- Business Name/Phone/Website/Rating/Review Count/Maps URL: from Google Business Profile panel.
- Last Review Date: open Reviews → sort by newest; record date of newest review.
- Response Rate Proxy (last10): count owner responses in the last 10 reviews / 10 (e.g., 0.1, 0.3). If you can’t count quickly, use buckets: 0%, 10%, 20%, 50%+.
- Personalization Snippet: use 6–20 words from the most recent review OR paraphrase (safer). Avoid medical info and anything that feels sensitive; stick to service + sentiment (e.g., “mentioned long wait time at front desk”).
- Owner/Manager Name + Email(s): first look on website Contact/About/Team pages; then Google “{business} owner” and check LinkedIn; then use free patterns from the website domain (info@, hello@, office@, admin@, support@). If you find a named person, use firstname@domain guesses.

4) SEGMENTATION RULES (simple + consistent)
Define:
- not_responding = Response Rate Proxy <= 0.2
- low_rating = Google Rating < 4.2
- high_volume = Review Count >= 200 OR Last Review Date within 14 days

Assign Segment (pick the strongest match):
- If low_rating AND high_volume → Segment=low_rating
- Else if not_responding AND high_volume → Segment=not_responding
- Else if low_rating → Segment=low_rating
- Else if not_responding → Segment=not_responding
- Else if high_volume → Segment=high_volume
- Else Segment=baseline

Priority tiers (routing):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: low_rating OR not_responding
- Priority C: high_volume only
- Priority D: baseline

5) COLD EMAIL SEQUENCE (3-step) — DIRECT TO LOCAL BUSINESS
Personalization tokens:
{{first_name}} {{business_name}} {{city}} {{vertical}} {{recent_review_snippet}} {{response_gap}} {{rating}} {{review_count}}
Always include legitimacy URL + contact email.

5.1 Email 1 (use segment-specific angle)
Subject options:
A) “Quick idea for {{business_name}}’s Google reviews”
B) “Replying to reviews (without adding work)”
C) “12-hour review replies for {{business_name}}?”

Body (Not Responding variant):
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed a few recent ones like “{{recent_review_snippet}}” haven’t gotten an owner response yet ({{response_gap}}).

We run an AI Review Reply & Reputation Autopilot for local businesses: brand-safe responses drafted + posted for Google Business Profile and Yelp, negative reviews escalated fast, and a weekly KPI report.

Offer: we reply within 12 hours. You can approve everything first (or set rules so only negatives require approval).

If you want to sanity-check it, I can send 3 draft replies for your most recent reviews (free) so you can see tone/quality.

Worth trying for {{business_name}}?
— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Body (Low Rating variant):
Hi {{first_name}} — I saw {{business_name}} is at {{rating}} on Google and you’re getting ongoing review volume. One recent review mentioned “{{recent_review_snippet}}”.

We help businesses respond quickly and consistently (Google + Yelp), escalate negatives the same day, and track weekly reputation KPIs so ratings don’t drift.

If I send 3 brand-safe draft replies (including one for the toughest recent review), would you want them?
— Bob
agent_bob_replit+review-bot@agentmail.to
[legitimacy URL]

Body (High Volume variant):
Hi {{first_name}} — {{business_name}} has {{review_count}} Google reviews and you’re still getting new ones регулярно. Keeping replies consistent is a lot.

We draft and post brand-safe replies for Google + Yelp, escalate negatives, and send weekly KPI reporting (response time, response rate, rating trend).

Open to a quick look? I can draft replies for your 3 newest reviews to show how it works.
— Bob
agent_bob_replit+review-bot@agentmail.to
[legitimacy URL]

5.2 Follow-up #1 (2 business days later)
Subject: “Want me to draft 3 replies for {{business_name}}?”
Body:
Hi {{first_name}} — circling back. If you share which channel matters most (Google or Yelp), I’ll send 3 draft responses in your brand voice.

No login needed for the draft step.

Should I send them?
— Bob
agent_bob_replit+review-bot@agentmail.to
[legitimacy URL]

5.3 Follow-up #2 (5–7 business days later)
Subject: “Close the loop?”
Body:
Hi {{first_name}} — should I close the loop on this?

If review replies aren’t a priority right now, no worries. If they are, we can take it off your plate: 12-hour replies, escalation for negatives, weekly KPI report.

Reply with “drafts” and I’ll send 3 example replies for {{business_name}}.
— Bob
agent_bob_replit+review-bot@agentmail.to
[legitimacy URL]

6) AGENCY/RESELLER VERSION (initial email)
Subject: “White-label review reply autopilot for your clients?”
Body:
Hi {{first_name}} — do you manage Google Business Profile / local SEO for dental, med spa, or home-service clients?

We built an AI Review Reply & Reputation Autopilot (Google + Yelp): brand-safe responses, negative-review escalation, and weekly reputation KPIs. Agencies resell it to keep clients’ GBP engagement high without adding headcount.

If I send a 1-page overview + sample weekly KPI report you can forward to a client, would that help?
— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

7) DAILY SENDING OPS + 14-DAY RAMP (deliverability-safe)
Tools (free-first): Gmail/Workspace inbox, Google Sheets CRM, manual sending initially.
Ramp schedule (per inbox; keep steady):
- Days 1–2: 20/day (10 new + 10 follow-ups)
- Days 3–4: 30/day
- Days 5–7: 40/day
- Days 8–10: 60/day
- Days 11–14: 80/day
Target steady-state: 80–120/day per warmed inbox.

Daily checklist:
1) Pull 20–40 Priority A/B prospects.
2) Personalize first line with review snippet + response gap.
3) Send new emails within a 2–3 hour window.
4) Log in CRM immediately.
5) Process replies twice/day; SLA: same-day response for interested/negative.
6) Handle bounces: if bounce rate > 3% in any 48h window, pause and clean list.
7) Never include attachments in cold email; use the legitimacy URL instead.

CRM stages (simple):
Prospect → Sent → Replied → Qualified → Demo Booked → Trial → Paid → Lost
Definitions:
- Qualified = they confirm they want help with reviews OR ask pricing OR ask how it works.
- Lost = explicit no, wrong contact, or no response after sequence.

8) WHAT THE VA/OWNER DOES NEXT (to get 500–1,000 leads)
- Pick geography scope: Top 25 metros (recommended).
- For each metro: collect 20 leads/vertical using the query pack.
- Fill required columns (rating, review count, last review date, response proxy, snippet, emails).
- Apply segmentation rules + Priority A/B/C.
- Start sending to Priority A first using the matching email variant.

If you confirm geography (metros or states), this kit becomes a step-by-step production line to generate the 500–1,000 lead CSV and start outbound immediately.