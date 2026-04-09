# Outbound Pipeline Runbook (Ready-to-Execute): Lead List Build (500–1,000) + Segmentation + Cold Email Sequences + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:52:04.537Z

---

BUSINESS / LEGITIMACY LINK
Use this in every outbound touch for trust: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

GOAL
Build a targeted outbound machine for local businesses + agencies to sell an “AI Review Reply & Reputation Autopilot” (Google Business Profile + Yelp): draft/post brand-safe review replies, escalate negatives, weekly KPI report.

PART 1 — VERTICALS + ICP
Primary verticals (high review velocity + high LTV):
1) Dentists (family, cosmetic, orthodontics)
2) Med spas / aesthetic clinics
3) HVAC + Plumbers (home services)
Secondary lane (faster scale): marketing agencies serving these verticals.

PART 2 — LEAD LIST CSV SPEC (500–1,000)
CSV headers (copy/paste into Sheets):
created_at, business_name, vertical, subvertical, city, state, metro, website, phone, google_maps_url, google_rating, review_count, last_review_date, last_review_snippet, yelp_url, response_rate_proxy_last10, segment, priority_tier, owner_or_manager_name, role_guess, email_1, email_2, linkedin_url, notes

Data dictionary / how to fill key fields:
- google_rating, review_count: from Google Business Profile card
- last_review_date: open reviews → sort “Newest” → take date of latest review
- last_review_snippet: take 8–18 words max. If it’s sensitive, paraphrase. Do NOT paste anything medical/PHI-like.
- response_rate_proxy_last10: open newest reviews; count owner responses in last 10 reviews. Example: 1/10 = 10%.
- segment rules:
  • not_responding = response_rate_proxy_last10 <= 20% OR 0 responses in last 10
  • low_rating = google_rating < 4.2
  • high_volume = review_count >= 200 OR last_review_date within 14 days
- priority_tier:
  • A = (not_responding AND high_volume) OR (low_rating AND high_volume)
  • B = (not_responding) OR (low_rating)
  • C = (high_volume only)

PART 3 — ZERO-COST LEAD COLLECTION WORKFLOW (GOOGLE MAPS)
Step-by-step (repeatable):
1) Pick a metro from your chosen geo list (see Part 4).
2) Google Maps search query templates:
   Dentists:
   - “dentist in {city, state}”
   - “cosmetic dentist in {city, state}”
   - “orthodontist in {city, state}”
   Med spas:
   - “med spa in {city, state}”
   - “aesthetic clinic in {city, state}”
   - “botox in {city, state}”
   Home services:
   - “hvac in {city, state}”
   - “air conditioning repair in {city, state}”
   - “plumber in {city, state}”
3) For each result, capture: name, website, phone, rating, reviews, Maps URL.
4) Click Reviews → get last_review_date + last_review_snippet.
5) Count responses in last 10 reviews → compute response_rate_proxy_last10.
6) Segment + priority tag using the rules above.
7) Find email(s) (free-first):
   - Website → Contact page
   - Footer email
   - “About” page
   - If none: use contact form URL (put into notes) and skip email (or use generic info@ if shown)
8) QA filter rules (skip if true):
   - Franchise directory page with no local decision-maker
   - No website + no contact method
   - Clearly irrelevant category
   - Business permanently closed

Daily production targets (manual):
- 50 leads/day per person is realistic with the proxy scoring. 10 business days = 500 leads.

PART 4 — GEO OPTIONS (OWNER CHOICE)
Choose ONE for the first batch so data stays consistent.
Option A: Top 25 US metros (recommended for speed + volume)
Option B: 5–10 states where you want density
Option C: US-wide (harder to QA)

PART 5 — SEGMENTED PROSPECTING PLAN (WHO GETS WHAT)
Send order by priority:
1) Priority A first (biggest pain + likely urgency)
2) Priority B next
3) Priority C last

Angle by segment:
- not_responding: “you’re leaving trust signals on the table; we reply within 12 hours; you approve; we escalate negatives”
- low_rating: “damage control + service recovery; escalate; protect brand; weekly KPI report”
- high_volume: “ops problem; we handle throughput; consistent voice; measurable KPIs”

PART 6 — COLD EMAIL COPY (READY TO SEND)
Include legitimacy link in every email: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

TOKENS
{{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{last_review_date}}, {{response_rate_proxy}}, {{google_rating}}, {{review_count}}, {{booking_link_if_any}}

A) LOCAL BUSINESS — INITIAL EMAIL (NOT RESPONDING) [works for all verticals]
Subject options:
1) Quick fix for your Google reviews at {{business_name}}
2) Noticed a response gap on your recent reviews
3) 12-hour review replies (you approve)

Body:
Hi {{first_name}} — quick note.

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}” ({{last_review_date}}).

It looks like many recent reviews don’t get an owner response (roughly {{response_rate_proxy}} of the last 10). That’s a missed trust signal for new patients/customers.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google + Yelp, escalates negative reviews, and sends a weekly KPI report. Replies can be posted fast, and you can approve everything before it goes live.

If I send 3 drafted replies in your tone for your latest reviews, would you like to see them?

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{your_name}}

B) LOCAL BUSINESS — INITIAL EMAIL (LOW RATING)
Subject options:
1) Helping {{business_name}} recover rating momentum
2) Service recovery on Google reviews
3) Quick reputation win (without extra staff)

Body:
Hi {{first_name}},

I’m reaching out because Google shows {{business_name}} at ~{{google_rating}} stars, and the newest reviews include: “{{recent_review_snippet}}”.

When negatives aren’t handled quickly (public reply + private escalation), the rating can drift and bookings/leads follow.

Our Reputation Autopilot drafts brand-safe replies for Google/Yelp, flags high-risk reviews for immediate escalation, and gives you a simple weekly KPI summary (volume, rating trend, response time).

Open to a 10-minute look? I can also send sample replies for your last 2–3 reviews first.

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{your_name}}

C) LOCAL BUSINESS — INITIAL EMAIL (HIGH VOLUME)
Subject options:
1) Keeping up with {{review_count}} reviews
2) Review replies at scale (consistent voice)
3) Ops help for Google/Yelp reviews

Body:
Hi {{first_name}},

{{business_name}} has strong review velocity ({{review_count}} total; latest on {{last_review_date}}: “{{recent_review_snippet}}”).

At that volume, consistent responses become an ops problem—especially across Google + Yelp.

We run an AI Review Reply & Reputation Autopilot that drafts replies in your brand voice, routes negatives for escalation, and reports weekly KPIs (response time, rating trend, review volume). You can approve before posting.

Worth seeing 3 draft replies for your most recent reviews?

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{your_name}}

FOLLOW-UP 1 (Day 2–3)
Subject: Re: {{business_name}} reviews
Body:
Hi {{first_name}} — should I send a few sample replies for the latest Google reviews at {{business_name}}?

If yes, tell me: (1) “formal vs friendly” and (2) any words to avoid.

Link again for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{your_name}}

FOLLOW-UP 2 (Day 6–7)
Subject: Close the loop?
Body:
Hi {{first_name}} — closing the loop.

If review replies aren’t a priority right now, no worries. If you want, I can still send 3 brand-safe draft replies based on your newest reviews (Google/Yelp) so you can compare “before vs after.”

Want me to send those, or should I check back next month?

— {{your_name}}

D) AGENCY / RESELLER LANE — INITIAL EMAIL
Subject options:
1) White-label review response for your clients
2) Add a reputation “autopilot” to your retainers
3) Quick upsell for dentists/med spas/home services

Body:
Hi {{first_name}},

If you manage local clients (dentists, med spas, HVAC/plumbing): we built a review response + reputation reporting autopilot you can white-label.

It drafts brand-safe Google/Yelp replies, escalates negative reviews, and produces weekly KPIs your clients understand (response time, rating trend, review volume). Your team can approve before posting.

If you tell me your top client vertical, I’ll send a simple partner offer + sample report.

Product link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{your_name}}

PART 7 — DAILY SENDING OPS + 14-DAY RAMP (NO TOOLS ASSUMED)
Core rules:
- Only send to verified emails; avoid role accounts if possible.
- Keep daily volume low at start; scale with reply-rate and bounce-rate.
- SLA: reply to replies within 1 business hour.

Ramp schedule (per inbox):
Days 1–2: 10–15/day
Days 3–4: 20/day
Days 5–7: 30/day
Week 2: 40–60/day if bounce <3% and spam complaints ~0

Daily checklist:
1) Pull 25–100 leads from Priority A/B first.
2) Personalize first line with snippet + response gap.
3) Send initial emails.
4) Process replies twice daily; tag outcomes.
5) Send follow-ups to non-responders per schedule.
6) Track: sent, delivered, bounced, replied, positive replies, demos booked.

CRM stages (simple):
Prospect → Sent → Follow-up Due → Replied (Positive/Neutral/Negative) → Qualified → Demo Booked → Trial → Paid → Lost
Exit criteria examples:
- Qualified: confirms they manage GBP/Yelp and have review volume + wants help
- Lost: “not interested” or wrong contact (log reason)

PART 8 — KPI TARGETS (FIRST 2 WEEKS)
- Bounce rate: < 3%
- Positive reply rate: 2–6% (cold)
- Demo booking rate: 0.5–2% of sends
- Time-to-first-response (your side): < 1 hour

NEXT OWNER DECISION
Reply with one geography choice (Top 25 metros / 5–10 states / US-wide). Once chosen, start building the first 200 leads using the workflow above; after QA, scale to 500–1,000 and begin the 14-day ramp.
