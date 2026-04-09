# Outbound Pipeline Kit (Top 25 US Metros): Lead List Build Plan + 3-Step Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:09:36.105Z

---

Business legitimacy references (use in all outreach)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

PART A — Lead list build (500–1,000) using Google Maps (zero-cost workflow)
Goal: Build 500–1,000 prospects across 3 verticals in Top 25 US metros with fields needed for segmentation: rating, review count, last review date, and a response-rate proxy from the last 10 reviews.

A1) Top 25 metro targets (use “City, ST”)
1 New York, NY
2 Los Angeles, CA
3 Chicago, IL
4 Houston, TX
5 Phoenix, AZ
6 Philadelphia, PA
7 San Antonio, TX
8 San Diego, CA
9 Dallas, TX
10 San Jose, CA
11 Austin, TX
12 Jacksonville, FL
13 Fort Worth, TX
14 Columbus, OH
15 Charlotte, NC
16 San Francisco, CA
17 Indianapolis, IN
18 Seattle, WA
19 Denver, CO
20 Washington, DC
21 Boston, MA
22 El Paso, TX
23 Nashville, TN
24 Detroit, MI
25 Oklahoma City, OK

A2) Google Maps query pack (copy/paste)
Run queries in Google Maps, open each result, and capture required fields.

Dentists:
- “dentist City, ST”
- “dental clinic City, ST”
- “cosmetic dentist City, ST”

Med spas / aesthetics:
- “med spa City, ST”
- “aesthetic clinic City, ST”
- “botox City, ST”

HVAC / Plumbing:
- “HVAC City, ST”
- “air conditioning repair City, ST”
- “plumber City, ST”

Agency lane (reseller partners):
- “digital marketing agency dentist City, ST”
- “marketing agency med spa City, ST”
- “seo agency HVAC City, ST”

A3) CSV columns (exact headers)
business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy_last10, segment, priority_tier, owner_or_manager_name, role_guess, email_1, email_2, personalization_snippet, notes

A4) How to compute response_rate_proxy_last10 (manual but fast)
1) In the Google reviews panel, sort by “Newest”.
2) Look at the last 10 reviews. Count how many have an “Owner response”.
3) response_rate_proxy_last10 = owner_responses / 10 (e.g., 2/10 = 0.2).
4) Capture last_review_date from the newest review.

A5) Segmentation + priority scoring rules
Segments:
- not_responding: response_rate_proxy_last10 <= 0.2 OR 0 owner responses in last 10 reviews
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within 14 days

Priority tiers (for send order):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: (not_responding) OR (low_rating)
- Priority C: (high_volume only)

A6) Personalization snippet rules (brand-safe)
- Prefer quoting a short phrase from a 5-star review when available (5–12 words).
- If the latest review is negative, paraphrase the theme without inflammatory language (e.g., “wait time” / “front desk communication”) and avoid repeating insults.
- Never mention protected health information; keep to generic service experience.

A7) Production targets to hit 500–1,000 quickly (manual/VA)
- One list-builder can do ~40–60 rows/day with response proxy + snippet.
- Two list-builders for 5 business days = ~400–600 rows.
- Add agency lane 50–100 rows to diversify pipeline.


PART B — Cold email sequences (3-step) with segment-specific variants
How to personalize every email:
- {{first_name}} if known; otherwise “Hi {{business_name}} team,”
- {{business_name}}, {{city}}
- {{recent_review_snippet}} (short quote or paraphrase)
- {{response_gap}} e.g., “Looks like only 1 of the last 10 reviews has a response.”
- Always include legitimacy line with website + contact email.

B0) Universal subject lines (pick one)
- “Quick question about your Google reviews”
- “Saw a recent review for {{business_name}}”
- “Re: responding to reviews at {{business_name}}”

B1) INITIAL EMAIL — Not responding (use for Priority A/B)
Subject: Quick question about your Google reviews

Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}}. I noticed {{response_gap}}.

We run an AI Review Reply & Reputation Autopilot that drafts (and can post) brand-safe responses within 12 hours, escalates negatives to you, and sends a weekly KPI recap (rating trend, response rate, volume).

If you want, I can generate 3 sample replies using a recent review like: “{{recent_review_snippet}}” — you approve/edit before anything goes live.

Worth a 10-minute call this week to see if it saves your team time and protects the rating?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

B2) INITIAL EMAIL — Low rating (use for Priority A/B)
Subject: Re: reputation cleanup for {{business_name}}

Hi {{first_name}},

I’m reaching out because reviews directly impact bookings, and {{business_name}}’s current Google rating looks like it may be getting dragged by a few recent experiences.

We help by responding quickly (12 hours), keeping replies brand-safe, and escalating any negative review so you can resolve it offline. You also get a simple weekly KPI report so you can see if response rate + sentiment are improving.

If you share one recent review theme you want to handle better (e.g., “{{recent_review_snippet}}”), I’ll send back 2–3 response drafts in your voice.

Open to a quick call?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

B3) INITIAL EMAIL — High volume (use for Priority A/C)
Subject: Keeping up with review volume at {{business_name}}

Hi {{first_name}},

{{business_name}} is getting steady review volume. That’s great for growth, but it’s a lot to keep up with consistently.

Our Autopilot drafts on-brand responses fast (12 hours), routes anything sensitive for approval, and sends a weekly report (new reviews, response rate, rating trend).

If I send 3 sample replies based on a recent review (“{{recent_review_snippet}}”), would you tell me if the tone matches your brand?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

B4) FOLLOW-UP #1 (Day 2–3)
Subject: Re: {{business_name}} reviews

Hi {{first_name}},

Do you want me to send a few sample responses for {{business_name}} to review?

If yes, reply with either:
1) “Google only” or “Google + Yelp”, and
2) whether you prefer: “You approve first” vs “Auto-post safe positives, escalate negatives.”

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

B5) FOLLOW-UP #2 (Day 6–7)
Subject: Should I close the loop?

Hi {{first_name}},

Last note — if review responses aren’t a priority right now, no worries.

If they are, I can:
- draft responses within 12 hours,
- keep tone brand-safe,
- flag negatives for you,
- report weekly KPIs.

Want me to send 3 sample replies for {{business_name}}?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

B6) Agency/reseller initial email
Subject: White-label review response ops for your clients?

Hi {{first_name}},

If you manage local business marketing (dentists/med spas/home services), reviews are one of the highest-leverage but most neglected retention drivers.

We offer an AI Review Reply & Reputation Autopilot you can white-label: brand-safe draft responses in 12 hours, escalation of negatives, and weekly KPI reporting per location.

If you tell me how many locations you manage, I’ll propose a simple reseller setup (you can keep margin) and send a sample “weekly KPI report” format.

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to


PART C — Daily sending ops checklist + CRM stages
C1) Tooling (free-first default)
- Sending: Gmail/Google Workspace inbox (if already owned); otherwise any inbox you can legally operate.
- Tracking: avoid heavy tracking early; prioritize deliverability. (If you use tracking later, keep it minimal.)
- CRM: Google Sheets or free HubSpot.

C2) 14-day ramp (per inbox)
- Days 1–2: 10–15 new sends/day
- Days 3–4: 20/day
- Days 5–6: 30/day
- Days 7–10: 40/day
- Days 11–14: 50/day
Rules: 70% new / 30% follow-ups; send during local business hours; stop if bounce rate > 3% in a day.

C3) Daily workflow (60–90 minutes)
1) Pull today’s batch by Priority (A first) and segment.
2) Personalize first line (review snippet + response gap) for each.
3) Send initial emails.
4) Queue follow-ups for Day 2–3 and Day 6–7.
5) Process replies twice/day (morning + afternoon). SLA: respond within 2 business hours.

C4) QA / compliance
- Don’t email if no website and no public email; deprioritize those.
- Keep unsubscribe line in follow-ups if required by your jurisdiction and sending method.
- If a prospect asks to be removed, mark “Do Not Contact” immediately.

C5) CRM stages (simple)
Prospect (in list) → Sent → Replied → Qualified → Demo Booked → Trial/POC → Paid → Lost / Do Not Contact
Entry/exit rules:
- Qualified: confirms they manage GBP/Yelp and wants faster replies / reputation reporting.
- Demo Booked: calendar time set.
- Trial/POC: you send sample replies or run 7-day pilot.

C6) KPI targets (first 2 weeks)
- Bounce rate: < 3%
- Positive reply rate: 3–8% (segment-driven)
- Demos booked: 1–3 per 100 sends once targeting is dialed
- Time-to-first-response (you): < 2 hours

This kit is designed so a human/VA can generate the 500–1,000 row lead CSV using the Top-25 metro query pack, segment it using the rubric, and start sending the same day with consistent follow-up and CRM hygiene.