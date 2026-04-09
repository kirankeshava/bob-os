# Outbound Pipeline Kit (Ready-to-Run): Lead List Build (500–1,000) + Segmentation Plan + Cold Email Sequences + Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:15:12.066Z

---

Business
- Product: AI Review Reply & Reputation Autopilot (Google/Yelp)
- Proof/website to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email to include in outreach: agent_bob_replit+review-bot@agentmail.to

1) Target verticals + why
A) Dentists: high LTV, steady review flow, high value of trust signals.
B) Med spas/aesthetic clinics: competitive markets, reputation swings revenue quickly.
C) HVAC/Plumbing: high call-driven conversion, review responsiveness matters.

2) Geography (zero-cost, consistent): Top 25 US metros
Use these metros as the first list-build scope (fastest to reach 500–1,000 without scrapers):
New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Detroit, Nashville, Portland.

3) Google Maps query pack (copy/paste)
For each metro run each query; aim 10–20 qualified prospects per query.
Dentist queries:
- “dentist {metro}”
- “family dentist {metro}”
- “cosmetic dentist {metro}”
- “dental implants {metro}”
Med spa queries:
- “med spa {metro}”
- “aesthetic clinic {metro}”
- “botox {metro}”
- “laser hair removal {metro}”
HVAC/Plumbing queries:
- “HVAC {metro}”
- “air conditioning repair {metro}”
- “plumber {metro}”
- “drain cleaning {metro}”

4) Lead list CSV template (headers)
business_name,vertical,service_keyword,city,state,metro,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_owner_reply_count,response_rate_proxy,segment,priority,personalization_snippet,contact_name,contact_role_guess,email_1,email_2,notes

5) Data dictionary (how to fill each field)
- google_rating/review_count: from Google business panel.
- last_review_date: open Reviews → sort by “Newest” and capture date of most recent.
- last_10_owner_reply_count: count owner/management responses across the 10 newest reviews.
- response_rate_proxy = last_10_owner_reply_count / 10 (as %).
- personalization_snippet: 8–20 word excerpt OR paraphrase from most recent review (avoid health/PII; do not mention specific treatments if sensitive—paraphrase sentiment).
- contact emails: take from website Contact page; if none, use generic role inboxes (info@, office@, hello@, support@, contact@). Optional: add a second email from staff directory if available.

6) Segmentation + priority scoring (operational rules)
Segments:
- not_responding: response_rate_proxy <= 0.2 (2/10 or fewer replies)
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within 14 days
Priority tiers (for sending order):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only
Routing to email variants:
- not_responding → “response gap / speed + approval” variant
- low_rating → “escalation + recovery workflow” variant
- high_volume → “ops/throughput + weekly KPI report” variant

7) Daily production targets (list building)
- Goal: 500–1,000 leads in 5–7 working days, zero-cost method.
- Per day: 100–150 new rows collected + 30-row QA sample.
- QA sample checks: correct category, has website or usable email, review data filled, last_review_date present, response proxy counted correctly.

8) Cold email sequences (3-step) — include website + email
Tokens to personalize:
{{first_name}} (if unknown, use “there”), {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap}}, {{rating}}, {{review_count}}, {{website}}

8A) Universal opener rules (safe personalization)
- If using review snippet: quote only a short, non-sensitive excerpt OR paraphrase sentiment.
- Always focus on operational help (speed, brand safety, approvals), not “we’ll remove bad reviews.”

8B) Direct-to-local: Initial email (Not responding variant)
Subject options:
1) Quick question about your Google reviews
2) Noticed a response gap at {{business_name}}
3) Re: replying to new reviews
Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}}—recent feedback like “{{recent_review_snippet}}” is great, but it looks like not every review is getting a reply.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google + Yelp, escalates negatives, and keeps you consistent. Typical workflow:
- New review → draft within 12 hours
- You approve (or set rules) → we post
- Weekly KPI email (rating trend, response rate, negatives flagged)

If helpful, I can send 3 draft replies for your latest reviews so you can see the tone. No cost.

Want me to do that?

– Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (2–3 days later)
Subject: Should I send the drafts?
Hi {{first_name}}—quick follow-up.

If you share which tone you prefer (warm/professional/short), I’ll send 3 ready-to-post replies for your most recent reviews at {{business_name}}.

If you’re already covered, who handles review replies on your team?

– Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 2 (5–7 days later)
Subject: Close the loop?
Hi {{first_name}}, last note.

Most local businesses we talk to don’t need “more marketing”—they just need consistent review replies and a simple escalation path for negatives.

Reply with “drafts” and I’ll send examples for {{business_name}}.

– Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

8C) Direct-to-local: Initial email (Low rating variant)
Subject options:
1) Quick fix for reputation follow-through
2) A simple workflow to handle negative reviews
3) {{business_name}} reviews
Body:
Hi {{first_name}},

I’m reaching out because {{business_name}}’s Google rating ({{rating}}) suggests a few unhappy customers may not be getting fast, consistent follow-up.

We provide an AI-assisted review response workflow (Google + Yelp):
- Drafts within 12 hours in your brand voice
- Negative review escalation (internal alert + recommended response)
- Weekly KPI report (response rate, rating trend, top issues)

If you want, I can draft responses to your 2 most recent critical reviews so you can see how we handle it (calm, compliant, and non-defensive).

Open to that?

– Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

8D) Direct-to-local: Initial email (High volume variant)
Subject options:
1) Keeping up with {{review_count}} reviews
2) Systemize review replies at {{business_name}}
3) Quick idea for review operations
Body:
Hi {{first_name}},

{{business_name}} has a strong review footprint ({{review_count}} reviews). The hard part at that volume is consistency—fast replies, same tone, and a clear escalation path for negatives.

We run a review-reply autopilot for Google + Yelp: drafts in 12 hours, approval controls, negative escalation, and a weekly KPI summary.

If you’re open, I can send a 1-page sample weekly KPI report + 3 example replies matched to your recent reviews.

Worth a look?

– Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

8E) Agency/reseller lane (initial)
Subject options:
1) White-label review reply ops for your clients
2) Add-on revenue: Google/Yelp review responses
3) Quick partnership idea
Body:
Hi {{first_name}},

If you manage local clients (dental/med spa/home services), we can be your white-label “review response + escalation” layer.

We draft and post brand-safe Google/Yelp replies within 12 hours, escalate negatives, and send weekly reputation KPIs—so your team doesn’t spend time in review dashboards.

If you want, I’ll send:
- a sample KPI report template
- example replies in 3 tones
- simple reseller pricing options

Who’s the right person to discuss partnerships?

– Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

9) Outbound sending ops (14-day ramp + daily targets)
Tools (free-first): Google Sheets for list, HubSpot free CRM (or Airtable free), Gmail inbox (or Workspace if already owned), manual sending or mail merge with strict limits.
Ramp (per inbox):
- Days 1–2: 15/day (mostly Priority A), plain text, high personalization.
- Days 3–4: 25/day.
- Days 5–7: 40/day.
- Week 2: 60–80/day if bounce <3% and replies healthy.
Daily activity targets (solo operator):
- New prospects added: 30–60/day
- Sends: 40–80/day after ramp
- Follow-ups: 20–40/day
- Manual personalization: 10–20/day (Priority A only)
Reply SLA:
- Same business day for positive replies
- Under 2 hours for “negative review / urgent / legal” keywords
Bounce/complaint thresholds:
- Hard bounces >3%: stop, verify emails, tighten QA.
- Spam complaints >0.2%: reduce volume, simplify copy, remove links (keep only proof link if needed).

10) CRM stages (simple, enforceable)
Prospect (not sent) → Sent (E1) → Follow-up Scheduled → Replied → Qualified (pain + authority) → Demo Booked → Trial/Pilot → Paid → Lost (reason).
Minimum fields in CRM: vertical, segment, priority, last touch date, next step date, status, notes.

11) First-week execution order
1) Build 100 leads in 5 metros (dentist + med spa) and send to Priority A/B.
2) Track: reply rate, positive interest rate, bounce rate, objections.
3) Tighten: subject lines + CTA (“send 3 drafts?”) and segmentation thresholds.
4) Expand list build to full 500–1,000 across the 25 metros.

This document is designed so you can start immediately with zero paid tools: build the first batch from Google Maps using the template, segment by response behavior/rating/volume, and run the sequences with a controlled sending ramp. All outreach references the proof site and the business contact inbox for trust and reply handling.