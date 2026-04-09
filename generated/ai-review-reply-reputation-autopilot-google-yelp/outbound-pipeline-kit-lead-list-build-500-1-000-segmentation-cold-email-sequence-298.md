# Outbound Pipeline Kit — Lead List Build (500–1,000) + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T05:59:41.439Z

---

BUSINESS
Offer: AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp (drafts + posts brand-safe replies, escalates negative reviews, weekly KPI report).
Legitimacy URL (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email (include in templates): agent_bob_replit+review-bot@agentmail.to

1) ICP + VERTICALS (use 2–3 in parallel)
A. Dentists (cosmetic + family): high LTV, reputation-sensitive, consistent review flow.
B. Med spas/aesthetic clinics: high competition, high review velocity, strong responsiveness signal.
C. HVAC/Plumbing: urgent-intent buyers, ratings affect inbound calls, lots of reviews.
Secondary lane: agencies managing local SEO/GBP for these verticals.

2) LEAD LIST CSV SCHEMA (copy headers exactly)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_response_count,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

Field definitions:
- last_review_date: date of most recent Google review (or Yelp if that’s the primary profile).
- last_10_response_count: how many of last 10 reviews have an owner/management response.
- response_rate_proxy = last_10_response_count / 10 (as %).
- personalization_snippet: short excerpt or paraphrase of the most recent review (avoid sensitive info; see compliance rules).

3) SEGMENTATION RULES (apply after you capture rating + review data)
Segments (can be multiple; pick primary by order below):
1) not_responding: response_rate_proxy ≤ 20% OR 0 responses in last 10 reviews.
2) low_rating: google_rating < 4.2.
3) high_volume: review_count ≥ 200 OR last_review_date within past 14 days.

Priority tiers:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume).
- Priority B: not_responding OR low_rating.
- Priority C: high_volume only.

Routing guidance:
- not_responding → angle = “response gap + speed + brand-safe approvals.”
- low_rating → angle = “negative review escalation + recovery + consistency.”
- high_volume → angle = “ops throughput + save staff time + weekly KPI reporting.”

4) ZERO-COST LEAD LIST BUILD WORKFLOW (repeatable)
Goal: 500–1,000 prospects with enough review signals to personalize.

Step A — Choose geography (owner decision needed):
Option 1: Top 25 US metros (fastest to scale, broad).
Option 2: 5–10 target states (tighter operational focus).
Option 3: US-wide (harder QA).

Step B — Google Maps query pack (examples; swap city)
Dentists:
- “cosmetic dentist {city}”
- “family dentistry {city}”
- “dentist {city}”
Med spas:
- “med spa {city}”
- “aesthetic clinic {city}”
- “botox {city}”
HVAC/Plumbing:
- “HVAC {city}”
- “air conditioning repair {city}”
- “plumber {city}”

Step C — Qualification filters (to avoid junk)
Keep if: has active website, ≥ 30 reviews, and is not a national call-center listing.
Skip if: pure directory listing, closed/permanently closed, franchise corporate-only contact, no website, or category mismatch.

Step D — Data capture (per prospect)
1) Capture rating + review count from Maps card.
2) Open reviews: note most recent review date.
3) Count owner responses in last 10 reviews.
4) Grab a safe personalization snippet (1 sentence) from most recent review.
5) Find email:
   - On website Contact/About pages.
   - If none: look for “info@”, “office@”, “support@”, “hello@” patterns.
   - For dentists/med spas: often “frontdesk@”, “appointments@”.
   - For HVAC/plumbing: “service@”, “dispatch@”.
6) Owner/manager name (best-effort): About page, team page, or LinkedIn.

QA sampling rule:
- For every 50 leads collected, audit 5 randomly: verify category, website works, review fields correct, email plausibly deliverable.

5) CRM PIPELINE (simple stages + rules)
Stages:
1) Prospects (raw) → meets qualification filters.
2) Ready to Send → has email + segment + priority.
3) Sent (Initial)
4) Follow-up 1 Sent
5) Follow-up 2 Sent
6) Replied
7) Qualified (pain confirmed: lack of responses / low rating / too many reviews)
8) Demo Booked
9) Trial / Pilot (e.g., 7–14 days)
10) Paid
11) Lost (reason codes: no need, already managed, wrong contact, not now)

KPIs to track weekly:
- Delivered rate, bounce rate, reply rate, positive reply rate, demos booked, trials started, conversion to paid.
- Operational reputation KPIs for customers: response time, % reviews responded, rating trend, negative-review escalations.

6) DAILY SENDING OPS (14-day ramp, per inbox)
Assumes 1 inbox to start; multiply cautiously if more.
Day 1–2: 10/day
Day 3–4: 15/day
Day 5–6: 20/day
Day 7–8: 25/day
Day 9–10: 30/day
Day 11–14: 40/day
Rules:
- Max 1–2 links in first email (include legitimacy URL only).
- Plain text, no attachments.
- Stop sending if bounce rate > 5% in a day; fix list.
- Reply SLA: same business day (aim < 4 hours).

7) COLD EMAIL SEQUENCES (3-step) — LOCAL BUSINESS
Use tokens:
{{first_name}} (optional), {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap}}, {{vertical}}

COMPLIANCE-SAFE PERSONALIZATION RULES:
- Do NOT include reviewer full name, phone, health details, or anything sensitive.
- Prefer paraphrase: “a recent review mentioned long wait times” vs quoting verbatim.
- If quoting, keep to 6–12 words and remove identifiers.

7A) INITIAL EMAIL — Not Responding angle
Subject options:
1) Quick idea for {{business_name}} reviews
2) Noticed a response gap on Google
3) Re: your recent Google reviews

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw a recent one mentioning: “{{recent_review_snippet}}.” I also noticed {{response_gap}}.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google + Yelp, escalates negative reviews to you, and sends a weekly KPI recap. You can approve responses before they post, and we aim to respond within 12 hours.

If it’s helpful, I can send 2–3 drafted replies based on your latest reviews so you can see the tone. Details here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a 10-minute call this week?

– Bob
agent_bob_replit+review-bot@agentmail.to

7B) INITIAL EMAIL — Low Rating angle
Subject options:
1) Improving rating without discounting
2) Quick win for negative review handling
3) Reputation fix for {{business_name}}

Body:
Hi {{first_name}},

I saw {{business_name}}’s Google rating and a recent review that mentioned: “{{recent_review_snippet}}.” When negative reviews come in, fast, consistent replies often reduce churn and increase follow-up calls.

Our Reputation Autopilot drafts calm, brand-safe replies for Google/Yelp, flags high-risk reviews for escalation, and gives you a weekly KPI report (response time, % responded, rating trend).

If you want, I’ll draft replies for your 3 most recent reviews (no cost) so you can evaluate tone and approach. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a quick 10-minute chat?

– Bob
agent_bob_replit+review-bot@agentmail.to

7C) INITIAL EMAIL — High Volume angle
Subject options:
1) Keeping up with review volume at {{business_name}}
2) 12-hour review responses (without staff time)
3) Weekly reputation KPIs for {{business_name}}

Body:
Hi {{first_name}},

{{business_name}} gets a solid amount of reviews, and a recent one said: “{{recent_review_snippet}}.” Many {{vertical}} teams struggle to respond consistently when volume spikes.

We run a lightweight autopilot: draft responses for Google/Yelp, route negative reviews to you for approval/escalation, and send a weekly KPI email. The goal is consistent, brand-safe replies within 12 hours.

Want me to send a sample set of replies for your last few reviews?

– Bob
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP #1 (2–3 business days later)
Subject: Re: {{business_name}} reviews

Hi {{first_name}},

Should I send a few draft replies for {{business_name}}’s most recent reviews? If you prefer, I can match your current tone (formal vs friendly) and you can approve everything before posting.

If you’re not the right person for reviews, who should I contact?

– Bob
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP #2 (5–7 business days later)
Subject: Last note — review replies

Hi {{first_name}},

Closing the loop. The main value we see for local businesses is: (1) faster replies, (2) fewer “no response” impressions, (3) negative reviews escalated immediately, and (4) a weekly KPI summary so reputation doesn’t drift.

If it makes sense, reply “sample” and I’ll send 2–3 drafted replies based on your latest reviews.

– Bob
agent_bob_replit+review-bot@agentmail.to

8) AGENCY / RESELLER LANE (faster scale)
Who to target: local SEO agencies, GBP management firms, web shops serving dentists/med spas/home services.
Search footprints:
- “Google Business Profile management agency”
- “local SEO agency dentist” / “local SEO med spa” / “HVAC marketing agency”
- Clutch/UpCity categories (free browsing) + agency websites.
Decision-makers: Founder, Head of SEO, Director of Client Services.

Agency initial email:
Subject: Add-on for your GBP clients (review replies)

Hi {{first_name}},

We built a white-label friendly Review Reply & Reputation Autopilot for Google/Yelp: brand-safe draft replies, negative review escalation, and weekly reputation KPIs.

Agencies use it to cover the “review response” workload without adding headcount. Happy to show a 10-minute demo and discuss margin/resell.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’re open, what’s the best email to send details to?

– Bob
agent_bob_replit+review-bot@agentmail.to

9) DAILY ACTIVITY TARGETS (starting point)
- New emails/day: 30–40 (during ramp) then 50–100/day once stable deliverability.
- Follow-ups/day: 15–30 (auto-queued via CRM).
- Agency prospects/day: 10 new + 10 follow-ups.
- Manual personalization: 20–30/day (Priority A only; use snippet + response gap).

NEXT REQUIRED OWNER INPUT
Choose geography for the first 500–1,000 lead build:
A) Top 25 US metros
B) 5–10 states
C) US-wide
Once chosen, the query pack becomes a fixed checklist and the list can be produced consistently.