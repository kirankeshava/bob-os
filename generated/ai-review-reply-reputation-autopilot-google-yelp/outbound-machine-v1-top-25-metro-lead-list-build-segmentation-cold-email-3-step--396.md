# Outbound Machine v1 — Top-25 Metro Lead List Build + Segmentation + Cold Email (3-step) + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:43:14.239Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Proof URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-3djp6rf9.picard.replit.dev/sites/1
Reply/contact email: agent_bob_replit+review-bot@agentmail.to

1) ICP + GEO (locked)
GEO: Top 25 US metros to maximize review volume density + avoid thin rural leads.
Metros: New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

Verticals (3):
A) Dentists (high trust, high local search intent)
B) Med spas / Aesthetic clinics (extremely review-driven)
C) HVAC + Plumbing (high ticket, urgent inbound; rating swings matter)
Agency lane (parallel): small marketing agencies serving these verticals.

2) Lead List CSV Template (copy headers exactly)
business_name,vertical,city_state,metro,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,owner_response_in_last_10 (0-10),response_rate_proxy,segment,priority_tier,contact_name,contact_role,email_1,email_2,contact_page_url,notes

Data dictionary (how to fill fast):
- google_rating/review_count: from Google Business Profile card.
- last_review_date + last_review_excerpt: open reviews, sort by newest, take first review. Excerpt: first ~12–20 words (or paraphrase if sensitive).
- owner_response_in_last_10: count how many of the last 10 reviews have an “Owner response”.
- response_rate_proxy = owner_response_in_last_10 / 10.
- email_1/email_2: from business website Contact page first; fallback to Facebook page “About”; last fallback: generic format guess only if domain is clear.

3) Segmentation Rules (apply per row)
Not Responding:
- response_rate_proxy <= 0.2 OR owner_response_in_last_10 <= 2
Low Rating:
- google_rating < 4.2
High Volume:
- review_count >= 200 OR (today - last_review_date) <= 14 days

Set “segment” as one of:
- not_responding
- low_rating
- high_volume
- not_responding+high_volume
- low_rating+high_volume

Priority tiers:
Priority A:
- not_responding+high_volume OR low_rating+high_volume
Priority B:
- not_responding OR low_rating
Priority C:
- high_volume only

4) Google Maps Query Pack (Top 25 metros)
Goal: consistent categories, fewer irrelevant results.
For each metro, run these searches in Google Maps and collect top ~10–20 per query (skip franchises with corporate review teams if obvious).

Dentists:
- “dentist [METRO]”
- “cosmetic dentist [METRO]”
- “family dentistry [METRO]”

Med spas:
- “med spa [METRO]”
- “aesthetic clinic [METRO]”
- “botox [METRO]” (often surfaces relevant clinics)

HVAC/Plumbing:
- “HVAC [METRO]”
- “air conditioning repair [METRO]”
- “plumber [METRO]”

Agency lane queries:
- “dental marketing agency [METRO]”
- “med spa marketing agency [METRO]”
- “HVAC marketing agency [METRO]”
- “local SEO agency [METRO]” (then filter by case studies)

5) Cold Email Copy (3-step) — include legitimacy links
Tokens:
{{first_name}}, {{business_name}}, {{metro}}, {{vertical}}, {{recent_review_snippet}}, {{last_review_date}}, {{response_gap}} (e.g., “no owner responses on recent reviews”), {{rating}}, {{review_count}}

Universal Footer for all emails:
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-3djp6rf9.picard.replit.dev/sites/1
Reply here: agent_bob_replit+review-bot@agentmail.to

A) INITIAL — Not Responding variant
Subject options:
1) Quick question about your Google reviews
2) Noticed a response gap on {{business_name}}’s reviews
3) Review replies for {{business_name}} (hands-off)

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed a few recent ones like: “{{recent_review_snippet}}” ({{last_review_date}}).

It looks like there aren’t many owner responses lately (which can quietly hurt conversion even when the rating is solid).

We run an AI Review Reply & Reputation Autopilot for local businesses: brand-safe draft replies for every Google/Yelp review, negative-review escalation, and a weekly KPI report. You can approve replies before anything posts.

If I send 3 sample replies for your most recent reviews, would you want to see them?

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-3djp6rf9.picard.replit.dev/sites/1
Reply here: agent_bob_replit+review-bot@agentmail.to

B) INITIAL — Low Rating variant
Subject:
1) 4.0→4.4 plan for {{business_name}}?
2) Quick win: review replies + escalation
3) Reputation help for {{business_name}}

Body:
Hi {{first_name}} — I saw {{business_name}} is at {{rating}} on Google. One recent review said: “{{recent_review_snippet}}”.

A lot of businesses lose calls/bookings here because negative reviews sit without a fast, professional response.

Our Autopilot drafts brand-safe responses within 12 hours, flags anything sensitive for escalation, and sends a weekly KPI summary (new reviews, response rate, sentiment). You approve before posting if you want.

Open to a quick look? I can draft replies to your last 3 reviews so you can judge quality before any commitment.

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-3djp6rf9.picard.replit.dev/sites/1
Reply here: agent_bob_replit+review-bot@agentmail.to

C) INITIAL — High Volume variant
Subject:
1) Keeping up with {{review_count}} reviews
2) Faster review replies for {{business_name}}
3) Review response SLA for {{business_name}}

Body:
Hi {{first_name}} — {{business_name}} has {{review_count}} Google reviews and it looks like you’re getting new ones regularly.

When review volume is high, consistency matters: quick responses, on-brand tone, and a simple weekly report so nothing slips.

We draft replies for Google/Yelp, escalate negatives, and keep a weekly KPI dashboard. Typical target: every review gets a reply within 12 hours (with approval optional).

Worth sending you a few sample replies based on your latest reviews?

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4n4h4nuiq6w8j-3djp6rf9.picard.replit.dev/sites/1
Reply here: agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP #1 (2 business days later) — short bump
Subject: Re: {{business_name}} reviews
Hi {{first_name}} — should I send 3 sample replies for your most recent reviews (Google/Yelp), or is review management already handled internally?

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-3djp6rf9.picard.replit.dev/sites/1
Reply here: agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP #2 (5–7 business days later) — value + opt-out
Subject: I’ll close the loop
Hi {{first_name}} — last note from me.

If you want, reply “samples” and I’ll send:
1) 3 on-brand replies to your latest reviews
2) A suggested response policy (what to say/not say)
3) A weekly KPI snapshot template

If not a priority, reply “no” and I’ll stop.

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-3djp6rf9.picard.replit.dev/sites/1
Reply here: agent_bob_replit+review-bot@agentmail.to

6) Daily Sending Ops (Free-first) + 14-day Ramp
Assumptions: 1 inbox to start; manual sending (no paid tools). Keep volumes conservative.
Day 1–2: 10–15/day (mixed verticals), verify no spam flags.
Day 3–4: 20/day.
Day 5–7: 30/day.
Week 2: 40–60/day if bounce <3% and spam complaints = 0.

Daily workflow (60–90 minutes):
1) Add 20–60 new prospects into CRM with segment + priority.
2) Send new emails to Priority A first, then B.
3) Send Follow-up #1 to anyone from 2 business days ago with no reply.
4) Log replies within 2 hours during business day; same-day max.
5) If any bounce spike (>5% in a day), stop new sends and fix list quality.

QA rules (avoid garbage):
- Must have website OR a clearly valid email source.
- Skip “corporate/franchise HQ handles reviews” signals.
- Skip businesses with <20 reviews unless rating <4.0 AND recent activity.

7) CRM Stages (simple)
Prospect (not sent yet) → Sent (initial) → Follow-up 1 sent → Follow-up 2 sent → Replied
From Replied → Qualified (pain confirmed) → Demo booked → Trial/pilot → Paid → Lost

Qualification checklist (reply handling):
- Do they currently respond to reviews? Who does it?
- What platforms matter (Google/Yelp)?
- Desired SLA (12 hours?) and approval preference.
- Volume of reviews/month.

This kit is designed so you can start sending as soon as the first 50–100 leads are collected and segmented. Build the list in batches (100/day) and begin outreach immediately rather than waiting for all 1,000.