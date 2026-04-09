# Outbound Pipeline (Zero-Cost): Lead List Build (500–1,000) + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T20:12:36.022Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Proof/website to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email to include: agent_bob_replit+review-bot@agentmail.to

========================
1) Vertical + Geo Focus (Week 1)
========================
Pick ONE for fastest execution. Recommended: Top 25 US metros (high density, high review velocity).
Top metros list (use as city tokens): New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; Nashville TN; El Paso TX; Detroit MI; Portland OR.

Verticals:
A) Dentists / Dental practices (high LTV, high sensitivity to reputation)
B) Med spas / Aesthetic clinics (high LTV, frequent reviews)
C) HVAC + Plumbers (home services; high competition + fast review cadence)
Secondary lane: Local marketing agencies that manage GBP for these verticals.

========================
2) Google Maps Query Pack (copy/paste)
========================
Goal: collect 500–1,000 prospects total. Target mix: 200 dental, 200 med spa, 200 home services, 50–200 agencies.

For each metro, run these searches in Google Maps:
DENTAL:
- “dentist in {CITY}”
- “cosmetic dentist in {CITY}”
- “family dentist in {CITY}”
MED SPA:
- “med spa in {CITY}”
- “botox in {CITY}”
- “laser hair removal in {CITY}”
HVAC/PLUMBING:
- “hvac in {CITY}”
- “air conditioning repair in {CITY}”
- “plumber in {CITY}”
AGENCIES (reseller lane):
- “digital marketing agency in {CITY}”
- “seo agency in {CITY}”
- “google business profile management in {CITY}”

Filters (manual, fast QA):
- Prefer independents (avoid huge national franchises unless local owner-operated)
- Prefer businesses with a website listed
- Prefer businesses with review_count >= 30

========================
3) Lead CSV Template (headers)
========================
Create a Google Sheet with this exact header row:
lead_id,business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy,last_10_responses_count,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

How to fill key fields (zero-cost sources):
- google_rating, review_count, last_review_date: from GBP panel.
- last_review_excerpt: copy 10–25 words from the most recent review (or paraphrase if sensitive).
- response_rate_proxy: look at last 10 reviews; count how many have “Response from the owner”.
  Enter last_10_responses_count (0–10), then response_rate_proxy = last_10_responses_count/10.
- emails: website contact page + footer email; if none, use “info@domain” format only if site suggests it (avoid guessing too aggressively).

========================
4) Segmentation + Priority Rules (Google Sheets formulas)
========================
Assume:
- google_rating in column H
- review_count in column I
- last_review_date in column J
- response_rate_proxy in column L (0.0–1.0)

Segment (column N) formula (adjust cell refs as needed):
=IF(H2<4.2,"low_rating",IF(OR(L2<=0.2,L2=""),"not_responding",IF(OR(I2>=200,TODAY()-J2<=14),"high_volume","baseline")))

Priority (column O) formula:
=IF(OR(AND(N2="not_responding",OR(I2>=200,TODAY()-J2<=14)),AND(N2="low_rating",OR(I2>=200,TODAY()-J2<=14))),"A",IF(OR(N2="not_responding",N2="low_rating"),"B",IF(N2="high_volume","C","C")))

Routing:
- Priority A: fastest send + strongest angle + “12-hour response” promise.
- Priority B: send next; emphasize approval workflow + brand safety.
- Priority C: nurture; emphasize weekly KPI report + consistency.

========================
5) Cold Email Sequences (3-step) — include legitimacy links
========================
Personalization tokens:
{{business_name}}, {{city}}, {{recent_review_excerpt}}, {{segment}}, {{rating}}, {{review_count}}, {{last_review_date}}

GENERAL OFFER (keep consistent):
- “We draft brand-safe replies to Google/Yelp reviews and can post them (or send for approval).”
- “We respond within 12 hours.”
- “We escalate negative reviews to you with a suggested resolution template.”
- “Weekly KPI email: new reviews, avg rating trend, response time, response rate.”
- Proof: website URL + contact email.

----
5.1 Dentist — Email 1 (segment-aware)
Subject options:
A) Quick question about your Google reviews
B) Saw a recent review for {{business_name}}
C) Helping dentists reply faster (brand-safe)

Body:
Hi {{first_name_or_team}},

I was looking at {{business_name}} on Google and noticed a recent review: “{{recent_review_excerpt}}”.

Question: do you have a consistent process to respond to reviews (especially when things get tense), or does it happen when someone has time?

We run an AI Review Reply & Reputation Autopilot for local businesses: brand-safe draft replies for Google/Yelp, optional approval before posting, and negative reviews get escalated with a suggested resolution message. We aim to respond within 12 hours.

If it helps, here’s our site for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
You can also reach me at agent_bob_replit+review-bot@agentmail.to.

Open to a 10-minute call this week to see if we can take review responses off your plate?

– Bob

----
5.2 Med Spa — Email 1
Subject options:
A) Reviews for {{business_name}} (quick fix)
B) Faster replies on Google/Yelp
C) One thing that lifts bookings

Body:
Hi {{first_name_or_team}},

Noticed a recent Google review for {{business_name}}: “{{recent_review_excerpt}}”.

A lot of med spas lose momentum when reviews come in fast but responses lag (or the tone isn’t consistent across staff). We draft on-brand responses to Google/Yelp reviews and can post them after your approval (or you can keep posting in-house). Negative reviews get escalated with a suggested recovery reply.

We’re legit/transparent here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

Want me to show you 2–3 example replies we’d write for your latest reviews?

– Bob

----
5.3 HVAC/Plumbing — Email 1
Subject options:
A) Quick win for {{business_name}} reviews
B) Missed responses on Google?
C) 12-hour review responses

Body:
Hi {{first_name_or_team}},

I pulled up {{business_name}} on Google—saw a recent review: “{{recent_review_excerpt}}”.

Home services are ultra-competitive on Maps. When review replies are inconsistent, it can cost calls. We draft brand-safe replies to Google/Yelp reviews, escalate negative ones to you immediately, and send a weekly KPI summary (new reviews, rating trend, response rate, response time). Target response time: within 12 hours.

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

Worth a quick 10 minutes to see if this would help your Maps conversions?

– Bob

----
5.4 Follow-up #1 (all verticals)
Subject: Re: {{business_name}} reviews

Hi {{first_name_or_team}},

If I drafted replies for your 3 most recent reviews (Google/Yelp), would you want them:
1) sent to you for approval, or
2) posted automatically after you ok the tone once?

Happy to send sample drafts first. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

– Bob (agent_bob_replit+review-bot@agentmail.to)

----
5.5 Follow-up #2 (all verticals, low-friction CTA)
Subject: Close the loop?

Hi {{first_name_or_team}},

Should I:
A) send a few sample replies for {{business_name}}, or
B) stop reaching out?

– Bob

----
5.6 Agency/Reseller Email (lane)
Subject options:
A) White-label review reply autopilot for your clients
B) Quick add-on for GBP clients
C) Review responses as a managed service

Body:
Hi {{first_name}},

If you manage Google Business Profiles for local clients: we can be a white-label “review response autopilot.” We draft brand-safe replies to Google/Yelp reviews, escalate negatives, and send weekly KPI summaries—so you can sell it as an add-on without adding labor.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

Open to a quick chat? If you tell me your client vertical (dentist/med spa/home services), I’ll send a sample workflow + example replies.

– Bob

========================
6) Daily Sending Ops (Zero-Cost) + 14-Day Ramp
========================
Assumptions: 1 inbox to start; keep volume conservative; plain-text only; no links besides the website; no attachments.

Ramp schedule (new sends/day):
Day 1: 20
Day 2: 25
Day 3: 30
Day 4: 35
Day 5: 40
Day 6: 45
Day 7: 50
Day 8: 60
Day 9: 70
Day 10: 80
Day 11: 90
Day 12: 100
Day 13: 100
Day 14: 100
Follow-ups: send follow-up #1 on day 3 after initial; follow-up #2 on day 7 after initial.

Daily workflow (60–90 minutes):
1) Pick today’s batch: 70% Priority A, 25% Priority B, 5% Priority C.
2) Personalize: insert {{recent_review_excerpt}} + one sentence about response gap (if not_responding).
3) Send initial emails (per ramp cap).
4) Process replies twice/day. SLA: reply within 2 hours during business day.
5) Update CRM stage for every touch.
6) End of day: record KPI totals (sent, delivered, replies, positive replies, bounces).

QA rules (prevent garbage leads):
- Must have website OR clear contact method.
- Exclude “supply store,” “school,” “corporate office,” “staffing,” irrelevant category.
- Exclude businesses with 4.8+ rating AND clearly high owner response rate (unless high volume and slow response).

Compliance basics:
- Include a real reply-to email (agent_bob_replit+review-bot@agentmail.to).
- Keep messages relevant and business-focused.
- Honor opt-outs immediately; maintain a do-not-contact sheet.

========================
7) CRM Pipeline (free) + required fields
========================
Use HubSpot Free or Airtable Free.
Stages:
Prospect → Sent → Follow-up 1 Sent → Follow-up 2 Sent → Replied → Qualified → Demo Booked → Trial (7-day free) → Paid → Lost / Do Not Contact

Minimum fields:
- business_name, vertical, city_state, priority, segment, email_1, phone, website, google_maps_url, last_review_date, response_rate_proxy, notes, last_touch_date, next_step

========================
8) What to do next (execution order)
========================
1) Build first 200 leads (Top 25 metros; 70% Priority A) using the sheet template.
2) Start sending at 20/day ramp; track replies in CRM.
3) After 200 leads: tighten targeting by reply rate (which vertical + segment performs best).
4) Only then scale list building to 500–1,000.
