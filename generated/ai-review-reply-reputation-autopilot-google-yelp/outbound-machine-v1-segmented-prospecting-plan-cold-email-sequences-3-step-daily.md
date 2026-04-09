# Outbound Machine v1 — Segmented Prospecting Plan + Cold Email Sequences (3-step) + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:15:08.389Z

---

BUSINESS / LEGITIMACY LINK (include in emails when needed)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

1) TARGETING + SEGMENTED PROSPECTING PLAN
Verticals (initial focus):
A) Dental practices (high LTV, high trust sensitivity, consistent reviews)
B) Med spas / aesthetic clinics (high review volume, competitive, reputation-driven)
C) HVAC / Plumbing (home services; review response impacts call volume)
Parallel lane: local marketing agencies (resell/whitelabel to many clients)

Required lead fields (CSV columns):
business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy_last10, segment, priority, personalization_snippet, contact_name, contact_role, email_1, email_2, notes

Segmentation rules (apply from Google Business Profile):
- Not Responding: response_rate_proxy_last10 ≤ 20% OR 0 owner responses in last 10 reviews
- Low Rating: google_rating < 4.2
- High Volume: review_count ≥ 200 OR last_review_date within 14 days
Priority scoring:
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: (Not Responding) OR (Low Rating)
- Priority C: High Volume only
Routing to templates:
- Not Responding → “response gap” angle + 12-hour SLA
- Low Rating → “escalation + brand-safe recovery” angle + negative-review triage
- High Volume → “ops throughput + weekly KPIs” angle

Offer positioning (keep consistent):
- We draft and post brand-safe review replies for Google/Yelp
- We escalate negative reviews immediately
- We report weekly reputation KPIs
- Operational promise: replies within 12 hours (or by next business day), with an approval option

2) COLD EMAIL SEQUENCES (READY TO SEND)
General personalization tokens:
{{first_name}} {{business_name}} {{city}} {{vertical}} {{recent_review_snippet}} {{last_review_date}} {{response_gap_observation}} {{rating}} {{review_count}}

Compliance note for personalization: Use short quoted snippets or paraphrase; do not include private health/service details. If in doubt, paraphrase sentiment (e.g., “they mentioned wait time”).

2.1) DIRECT-TO-LOCAL — EMAIL 1 (choose variant by segment)

VARIANT A — NOT RESPONDING (Dental / Med Spa / Home Services)
Subject options:
1) Quick fix for your Google reviews
2) {{business_name}} — replying to reviews
3) 12-hour review replies for {{business_name}}

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed a few recent ones haven’t gotten a reply yet (e.g., “{{recent_review_snippet}}”).

We run an AI-assisted review reply & reputation autopilot: brand-safe responses for Google/Yelp, negative-review escalation, and a weekly KPI report. You can approve replies before they post, or we can auto-post within 12 hours using your guidelines.

If you want to sanity-check it, I can draft 3 replies for your most recent reviews (free) so you can see the tone.

Want me to send those drafts?
— {{your_name}}
(About us: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)

VARIANT B — LOW RATING
Subject options:
1) Recovering rating for {{business_name}}
2) Quick reputation triage
3) A safer way to respond to negative reviews

Body:
Hi {{first_name}} — I saw {{business_name}} is at ~{{rating}} on Google. In competitive local search, even small shifts in rating/response rate can change calls and bookings.

We help businesses respond to reviews in a brand-safe way (Google + Yelp), escalate negative reviews immediately, and track weekly KPIs so you can see if sentiment and responsiveness improve.

If you share 2–3 examples of replies you like (or just a tone: “warm + concise”), I’ll draft responses to your last 3 reviews for free.

Open to a quick look?
— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

VARIANT C — HIGH VOLUME
Subject options:
1) Keeping up with review volume
2) Review replies without extra staff time
3) Weekly reputation KPIs for {{business_name}}

Body:
Hi {{first_name}} — looks like {{business_name}} gets steady review volume ({{review_count}}+). Most owners I talk to like the reviews but don’t want to spend time writing replies every week.

We draft and (optionally) post brand-safe responses to Google/Yelp reviews, escalate negatives, and send a weekly KPI summary (new reviews, response rate, sentiment flags).

If I draft a few replies in your existing voice, would you want to see them?
— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

2.2) DIRECT-TO-LOCAL — FOLLOW-UP 1 (2–3 business days later)
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up. I can send 3 draft replies based on your latest reviews (including one negative/neutral if you want) so you can judge tone and safety.

Would you prefer:
A) You approve before posting, or
B) Auto-post within 12 hours using guidelines?

— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

2.3) DIRECT-TO-LOCAL — FOLLOW-UP 2 (5–7 business days later)
Subject: Should I close the loop?

Hi {{first_name}} — last note from me. If review replies aren’t a priority right now, no worries.

If they are, reply with “draft” and I’ll send 3 sample responses for {{business_name}} using your preferred tone (concise/warm/formal).

— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

2.4) AGENCY / RESELLER — EMAIL 1
Subject options:
1) White-label review replies for your clients
2) Add-on: Google/Yelp review management
3) Reputation autopilot (resell)

Body:
Hi {{first_name}} — do you manage local SEO/GBP for {{agency_name}}’s clients?

We built an AI review reply & reputation autopilot that drafts (and can post) brand-safe Google/Yelp responses, escalates negative reviews, and produces a weekly KPI summary. Agencies use it as a recurring add-on so their clients stay responsive without extra account manager time.

If I send a 1-page overview + pricing for resell/white-label, who’s the right person to talk to?
— {{your_name}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

3) DAILY SENDING OPS CHECKLIST + CRM

3.1) CRM stages (minimal but strict)
- Prospect (meets vertical + geo + has GBP)
- Ready to Send (email verified / deliverable)
- Sent
- Replied
- Qualified (has GBP access path + review volume + pain)
- Demo Booked
- Trial / Pilot
- Paid
- Lost (No fit / Not now / Unreachable)

Entry/exit criteria:
- Prospect → Ready to Send: verified email OR alternate contact method noted
- Sent → Replied: any response (positive/negative)
- Replied → Qualified: confirms pain (time, negative reviews, inconsistent replies) + decision maker

3.2) 14-day ramp (per inbox; keep conservative)
Days 1–3: 10–15/day
Days 4–6: 20–30/day
Days 7–10: 35–50/day
Days 11–14: 50–80/day (only if bounces/complaints are low)
Rules:
- If hard bounce rate > 3% in a day, pause and clean list.
- If spam complaints > 0.1%, pause and adjust copy/targeting.

3.3) Daily workflow (60–90 minutes)
1) Pull 25–50 Priority A leads + 25 Priority B (keep verticals mixed)
2) Personalize: add {{recent_review_snippet}} and {{response_gap_observation}} (10–20 seconds per lead)
3) Send Email 1 to new leads; queue Follow-up 1 and 2 automatically in CRM
4) Reply SLA: same day for positive intent; within 12 hours for questions
5) Book demos: offer 15 minutes; propose 2 times

3.4) List QA sampling (before sending)
- Check business is independently owned (avoid franchises unless intentional)
- Confirm category matches vertical
- Ensure website exists or GBP is active
- Confirm review recency and that snippet is real/accurate
- Avoid sensitive/regulated wording (medical outcomes, accusations, etc.)

3.5) Weekly KPIs to track outbound performance
- Deliverability: sent, hard bounces, spam complaints
- Engagement: open (optional), reply rate, positive reply rate
- Pipeline: demos booked, trials started, paid conversions
- Target benchmarks (initial): 3–6% reply, 1–2% positive reply, 0.5–1% demo booked

NEXT OWNER DECISION (to unlock the 500–1,000 lead CSV build)
Choose initial geography for the first list:
A) Top 25 US metros (fastest to source, consistent volume)
B) 5–10 target states (if you want tighter territory focus)
C) US-wide (largest, but noisier)
Once you pick A/B/C, the query pack can be locked and the first 200 leads built within 48 hours using the SOP.