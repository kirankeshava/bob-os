# Outbound Pipeline Execution Kit (Zero-Cost Lead Build + Segmentation + Cold Email Pack w/ Website Proof)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:48:51.226Z

---

Business proof link to include in outreach (use exactly): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

A) LEAD LIST CSV TEMPLATE (paste headers into Google Sheets)
Columns (in order):
1 business_name
2 vertical (dentist | med_spa | hvac_plumbing | agency)
3 city
4 state
5 address
6 phone
7 website
8 google_maps_url
9 google_rating
10 review_count
11 last_review_date
12 last_review_excerpt (for personalization)
13 owner_reply_in_last_10 (count 0–10)
14 response_rate_proxy (formula)
15 segment (formula)
16 priority (formula)
17 contact_name (if found)
18 role_guess (Owner | Manager | Marketing)
19 email_1
20 email_2
21 linkedin_url (optional)
22 notes

Formulas (Google Sheets):
- response_rate_proxy (col 14, row 2): =IFERROR(M2/10,0)
- segment (col 15):
=IF(I2<4.2,"low_rating",IF(OR(N2<=0.2,M2=0),"not_responding",IF(OR(J2>=200,TODAY()-DATEVALUE(K2)<=14),"high_volume","")))
- priority (col 16):
=IF(OR(AND(O2="not_responding",OR(J2>=200,TODAY()-DATEVALUE(K2)<=14)),AND(O2="low_rating",OR(J2>=200,TODAY()-DATEVALUE(K2)<=14))),"A",IF(OR(O2="not_responding",O2="low_rating"),"B",IF(O2="high_volume","C","")))

B) ZERO-COST LEAD BUILD WORKFLOW (repeatable)
Goal: 500–1,000 local businesses with (rating, review count, last review date, response proxy, snippet).
1) Pick geography (owner decision):
   - Option 1: Top 25 US metros (fastest volume, broad)
   - Option 2: 5–10 target states (tighter ops/time zones)
   - Option 3: US-wide (harder to QA)
2) Google Maps query footprints (copy/paste):
   Dentists:
   - “dentist + {city, state}”
   - “cosmetic dentist + {city, state}”
   - “family dentistry + {city, state}”
   Med spas:
   - “med spa + {city, state}”
   - “aesthetic clinic + {city, state}”
   - “botox + {city, state}” (verify category is clinic/spa)
   HVAC/Plumbing:
   - “HVAC contractor + {city, state}”
   - “air conditioning repair + {city, state}”
   - “plumber + {city, state}”
3) For each prospect, collect:
   - Rating + review count (from listing)
   - Last review date + 1–2 line excerpt (for hook; avoid health details—paraphrase if needed)
   - Response proxy: open “Reviews” → scan last 10 reviews → count business-owner replies (0–10)
   - Website URL and phone
4) Exclusions (QA): franchises with corporate comms only, businesses with no website, closed/permanently closed, clearly irrelevant categories.
5) Daily production target (manual): 50–75 leads/day per person with basic fields; response-proxy adds time (plan 30–50/day if counting last 10).

C) SEGMENT ROUTING (what to send to whom)
- Segment: not_responding
  Trigger: response_rate_proxy <= 20% OR 0 replies in last 10.
  Angle: “You’re getting reviews but not responding; we draft brand-safe replies within 12 hours; you approve.”
- Segment: low_rating
  Trigger: rating < 4.2.
  Angle: “Negative reviews need fast, consistent, calm replies + escalation; prevent losses + show accountability.”
- Segment: high_volume
  Trigger: 200+ reviews OR last review within 14 days.
  Angle: “Operational load; never miss a review; weekly KPI reporting; escalation workflow.”

D) COLD EMAIL SEQUENCES (paste-ready; includes website proof link)
Tokens: {{first_name}}, {{business_name}}, {{city}}, {{recent_review_excerpt}}, {{rating}}, {{review_count}}, {{response_gap}} (e.g., “no owner replies on recent reviews”), {{vertical}}

1) DIRECT-TO-BUSINESS — INITIAL (Not Responding variant)
Subject options:
- Quick question about your Google reviews
- {{business_name}} — responding to reviews?
- 12-hour review replies (you approve)

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed {{response_gap}}.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses to every new Google/Yelp review within 12 hours, flags negatives for escalation, and sends a weekly KPI recap. You approve before anything posts.

If helpful, here’s our site for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Would you be open to a 10-minute call this week to see 3 example replies (including one for: “{{recent_review_excerpt}}”)?

— {{your_name}}

2) FOLLOW-UP #1 (2–3 days later)
Subject: Re: {{business_name}} reviews
Hi {{first_name}} — circling back.

Most owners we talk to *want* to respond, but it falls behind once volume picks up. We can:
- draft replies in your brand voice,
- escalate negatives immediately,
- keep you consistent (which customers notice).

Want me to send 2–3 sample replies for your most recent reviews?
— {{your_name}}

3) FOLLOW-UP #2 (5–7 days later; low friction)
Subject: Close the loop?
Hi {{first_name}} — should I close the loop on this?

If you reply with “samples,” I’ll send draft responses for your latest 3 Google reviews and you can judge quality quickly.

Site (for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— {{your_name}}

E) LOW RATING VARIANT (swap into initial email when rating <4.2)
Subject: Quick fix for negative reviews at {{business_name}}
Hi {{first_name}} — I saw {{business_name}} is at {{rating}} on Google and a recent review said: “{{recent_review_excerpt}}”.

Even when the situation is unfair, fast, calm, consistent replies usually stop the bleeding and signal accountability to future customers.

We draft brand-safe Google/Yelp responses within 12 hours, escalate negatives immediately, and send weekly KPIs. You approve before posting.

Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a 10-minute look so I can show you sample replies in your voice?
— {{your_name}}

F) HIGH VOLUME VARIANT (swap into initial email when 200+ reviews or very recent activity)
Subject: Keeping up with review volume at {{business_name}}
Hi {{first_name}} — {{business_name}} has {{review_count}} Google reviews, which usually means reviews come in steadily.

We help local businesses never miss a review: draft replies within 12 hours, route negatives for escalation, and provide a weekly KPI summary. You approve before posting.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Want me to send sample replies for your 3 most recent reviews?
— {{your_name}}

G) AGENCY / RESELLER VERSION (initial)
Subject: White-label review reply autopilot for your clients?
Hi {{first_name}} — do you handle reputation or GBP optimization for local clients?

We built an AI review-reply autopilot: drafts brand-safe responses for Google/Yelp within 12 hours, escalates negatives, and emails weekly KPI reports. It’s easy to run as a managed add-on (you can position it as white-label).

Site for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you have 5–20 clients who get steady reviews (dentists/med spas/home services), open to a quick chat about a reseller setup?
— {{your_name}}

H) DAILY SENDING OPS (minimum viable)
- Build/QA 50 new leads/day (or 30/day if capturing response proxy).
- Send 30–80 emails/day total during ramp; follow-ups scheduled automatically.
- CRM stages: Prospect → Sent → Replied → Qualified → Demo Booked → Trial → Paid → Lost.
- Reply SLA: same day for positive replies; negatives/escalations within 2 hours during business hours.
- Quality thresholds: bounce rate <3%; pause sends if >5% in a day; remove any “info@” that bounces repeatedly.

Owner decision needed next (no spend required): choose initial geography so the query pack can be locked and the first 200-lead batch can be built fast.