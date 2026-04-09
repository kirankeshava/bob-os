# Outbound Pipeline Kit (Direct Local + Agency Lane): Lead List Template + Segmentation + 3-Step Cold Email + Daily Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:26:10.669Z

---

BUSINESS LEGITIMACY REFERENCES (use in outreach)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
- Contact email (for replies / signatures): agent_bob_replit+review-bot@agentmail.to

A) TARGETING + GEO (DEFAULT RECOMMENDATION)
Goal: 500–1,000 high-intent local businesses with active reviews and a visible “response gap.”
Recommended initial geo scope: Top 25 US metros (high density + high review velocity).
Top metro list (use “near <metro>” in Google Maps): New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; Nashville TN; Detroit MI; Oklahoma City OK; Portland OR.

Vertical categories (Google Maps query footprints):
1) DENTAL
- “dentist near <metro>”
- “cosmetic dentist near <metro>”
- “pediatric dentist near <metro>”
2) MED SPA / AESTHETICS
- “med spa near <metro>”
- “botox near <metro>”
- “laser hair removal near <metro>”
3) HVAC / PLUMBING
- “HVAC near <metro>”
- “air conditioning repair near <metro>”
- “plumber near <metro>”

B) LEAD LIST CSV TEMPLATE (HEADERS)
Create a CSV with exactly these columns (in this order):
1 business_name
2 vertical
3 city_state
4 phone
5 website
6 google_maps_url
7 google_rating
8 review_count
9 last_review_date
10 last_review_excerpt
11 owner_response_in_last_review (yes/no)
12 responses_in_last_10_reviews (0-10)
13 response_rate_proxy (0.0-1.0)
14 segment (not_responding | low_rating | high_volume | mixed)
15 priority (A | B | C)
16 owner_or_manager_name
17 role_guess
18 email_1
19 email_2
20 notes

Data collection rules (fast, consistent):
- google_rating + review_count: from the business panel on Google Maps.
- last_review_date + excerpt: open “Reviews” → sort by “Newest” → copy the most recent review’s date and 8–20 words excerpt (do not include health info; keep it generic).
- response_rate_proxy: check the last 10 reviews; count how many have an “Owner response.”
- email(s): use the website contact page; if none, use patterns like info@, hello@, contact@ only if published on site.

C) SEGMENTATION + PRIORITY RULES (GOOGLE SHEETS)
Definitions:
- Not Responding: response_rate_proxy <= 0.2 OR responses_in_last_10_reviews <= 2
- Low Rating: google_rating < 4.2
- High Volume: review_count >= 200 OR (TODAY - last_review_date) <= 14 days

Suggested Priority:
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: Not Responding OR Low Rating
- Priority C: High Volume only (good rating + responding but lots of volume)

Example Sheets formulas (adjust column letters to your sheet):
- response_rate_proxy (if responses_in_last_10_reviews is column L):
  =L2/10
- segment (example rating in G, review_count in H, last_review_date in I, response_rate_proxy in M):
  =IF(OR(M2<=0.2,L2<=2),"not_responding",IF(G2<4.2,"low_rating",IF(OR(H2>=200,TODAY()-I2<=14),"high_volume","mixed")))
- priority:
  =IF(OR(AND(OR(M2<=0.2,L2<=2),OR(H2>=200,TODAY()-I2<=14)),AND(G2<4.2,OR(H2>=200,TODAY()-I2<=14))),"A",IF(OR(OR(M2<=0.2,L2<=2),G2<4.2),"B",IF(OR(H2>=200,TODAY()-I2<=14),"C","C")))

D) COLD EMAIL COPY (3-STEP SEQUENCE) — DIRECT LOCAL BUSINESSES
Use one primary angle based on segment. Keep personalization to ONE line.
Signature (use on all emails):
— Bob Smith
AI Review Reply & Reputation Autopilot
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
Reply: agent_bob_replit+review-bot@agentmail.to

Token legend:
- {{business_name}}
- {{city}}
- {{recent_review_excerpt}}
- {{rating}}
- {{response_gap}} (e.g., “no owner reply visible” / “few replies lately”)
- {{vertical_phrase}} (e.g., “dental practice” / “med spa” / “HVAC company”)

SUBJECT LINES (rotate)
- “Quick fix for {{business_name}} reviews”
- “Noticed a response gap on Google”
- “12-hour review replies (you approve)” 

EMAIL 1 (choose variant by segment)

Variant 1 — NOT RESPONDING
Hi {{first_name}},

I was looking at {{business_name}} in {{city}} and saw a recent review: “{{recent_review_excerpt}}” — but {{response_gap}}.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe Google/Yelp responses and escalates negatives. You can approve every reply, and we respond within 12 hours.

Want me to send 3 sample replies for your latest reviews (free), so you can judge tone/quality?

— Bob Smith
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Variant 2 — LOW RATING
Hi {{first_name}},

I saw {{business_name}} is at ~{{rating}} on Google. One recent review said: “{{recent_review_excerpt}}”.

We help {{vertical_phrase}} teams respond quickly and consistently, flag urgent negatives, and report weekly reputation KPIs so the rating trend improves (without sounding defensive).

Open to a quick look? I can draft replies for 3 recent reviews and include an escalation note for the toughest one.

— Bob Smith
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Variant 3 — HIGH VOLUME
Hi {{first_name}},

{{business_name}} gets a lot of reviews. I noticed a recent one: “{{recent_review_excerpt}}”.

We keep up with review volume by drafting on-brand replies for Google/Yelp, routing negatives to a manager, and sending a weekly KPI summary (rating trend, response rate, time-to-response).

If you want, I’ll send a mini “reply backlog cleanup plan” based on your last 10 reviews.

— Bob Smith
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 1 (2–3 business days later)
Subject: “Re: {{business_name}} reviews”

Hi {{first_name}},

Quick nudge — still happy to draft 3 brand-safe replies for {{business_name}} at no cost.

If you tell me who approves public replies (you vs office manager), I’ll tailor tone and send them over.

— Bob Smith
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 2 (5–7 business days later)
Subject: “Should I close the loop?”

Hi {{first_name}},

Should I close the loop on this, or is someone else best to talk to about review responses for {{business_name}}?

If it helps, here’s the simple offer: we draft replies within 12 hours, you approve, we escalate negatives, and you get a weekly KPI snapshot.

— Bob Smith
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

E) AGENCY / RESELLER LANE (INITIAL EMAIL)
Subject options:
- “White-label review response for your local clients”
- “Add a review-response SOP to your retainers”

Hi {{first_name}},

If you manage local SEO/reputation for dentists/med spas/home services: we built an AI Review Reply & Reputation Autopilot that drafts and posts brand-safe Google/Yelp responses, escalates negatives, and sends weekly reputation KPIs.

Agencies use it to (1) raise response rates fast, (2) standardize tone across clients, and (3) add a clean upsell line item.

Want a 10-minute walkthrough? Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1

— Bob Smith
agent_bob_replit+review-bot@agentmail.to

F) DAILY SENDING OPS (NO-TOOL ASSUMPTION)
Minimum viable daily cadence (single inbox):
- Day 1–2: 20 new emails/day
- Day 3–4: 30/day
- Day 5–7: 40/day
- Week 2: 50/day (only if bounce rate < 3% and complaint rate ~0)

Daily checklist:
1) Pull 20–50 Priority A/B leads from CSV.
2) Personalize only the first line using {{recent_review_excerpt}} + {{response_gap}}.
3) Send Email 1 to new prospects.
4) Send Follow-up 1 and Follow-up 2 according to schedule (do not skip follow-ups).
5) Reply SLA: respond to positive replies within 2 hours during business day.
6) Hygiene rules: stop sending to any domain after 2 bounces; remove role accounts that bounce; log all unsubscribes.

CRM stages (simple pipeline):
- Prospect (in CSV, not yet sent)
- Sent (Email 1 sent)
- Follow-up Due (FU1 or FU2 scheduled)
- Replied – Positive
- Replied – Not now
- Replied – Not a fit
- Qualified (has Google/Yelp access path + decision maker)
- Demo Booked
- Trial
- Paid
- Lost

KPIs to track weekly:
- Delivered rate, bounce rate, reply rate, positive reply rate, demo rate
- Segment performance (Not Responding vs Low Rating vs High Volume)
- Top metros/verticals by positive replies

Execution note: The fastest path to the 500–1,000 CSV without paid tools is to assign 2–3 hours/day of manual collection using the query pack above and the template. If/when paid extraction is desired, that will require explicit owner approval for spend.
