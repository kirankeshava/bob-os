# Outbound Runbook v1 — Lead List Build (500–1,000) + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:20:41.372Z

---

BUSINESS ASSETS (use in outreach)
- Website (proof/legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

GOAL
Build a repeatable outbound machine targeting local businesses with high review velocity + high LTV that are not responding to reviews, have low ratings, and/or have high review volume.

PART 1 — VERTICALS + GEO (recommendation)
Verticals (run in parallel lanes):
1) Dentists / dental clinics
2) Med spas / aesthetic clinics
3) HVAC + Plumbers (home services)

Recommended geo for first 500–1,000: Top US metros (25). This keeps Google results dense and comparable.
Top 25 metros list (use “City, ST”): New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

PART 2 — GOOGLE MAPS QUERY PACK (copy/paste)
For each metro, run each query in Google Maps and collect the top results until you hit your daily production target.

DENTAL
- “dentist {City, ST}”
- “cosmetic dentist {City, ST}”
- “family dentistry {City, ST}”
- “dental implants {City, ST}”

MED SPA
- “med spa {City, ST}”
- “aesthetic clinic {City, ST}”
- “botox {City, ST}”
- “laser hair removal {City, ST}”

HVAC / PLUMBING
- “HVAC {City, ST}”
- “air conditioning repair {City, ST}”
- “plumber {City, ST}”
- “water heater repair {City, ST}”

Quick filters while collecting:
- Prefer independent local brands over national franchises.
- Prefer businesses with an active Google Business Profile (recent reviews visible).
- Skip businesses with no website (unless phone-only home services is common in that metro).

PART 3 — CSV TEMPLATE (headers)
Create a Google Sheet with this header row (export as CSV later):

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_owner_responses,response_rate_proxy,segment_not_responding,segment_low_rating,segment_high_volume,priority_tier,personalization_snippet,notes,owner_or_manager_name,role_guess,email_1,email_2

How to fill key fields (zero-cost method):
- google_rating + review_count: from the Google Maps listing.
- last_review_date: open Reviews → sort by “Newest” → capture the date of the most recent review.
- last_10_owner_responses: open the 10 newest reviews; count how many have an “Owner response”.
- response_rate_proxy = last_10_owner_responses / 10 (e.g., 0.1, 0.3).
- personalization_snippet: copy 10–25 words from the most recent review OR paraphrase it (safer).

Segmentation rules (set TRUE/FALSE columns):
- segment_not_responding = (response_rate_proxy <= 0.2)
- segment_low_rating = (google_rating < 4.2)
- segment_high_volume = (review_count >= 200) OR (last_review_date within 14 days)

Priority scoring (priority_tier):
- Priority A: (segment_not_responding AND segment_high_volume) OR (segment_low_rating AND segment_high_volume)
- Priority B: segment_not_responding OR segment_low_rating
- Priority C: segment_high_volume only

Minimum viable list rules (quality bar):
- Must have google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy, and a personalization_snippet.
- Emails: try to capture at least one (email_1). If not found, keep the record but flag notes=“needs email enrichment”.

Free email capture steps (in order):
1) Website footer/contact page (“Contact”, “About”, “Appointments”, “Book”, “Support”).
2) Look for “mailto:” links in page source (right click → view source → search “mailto”).
3) If no direct email: use a role inbox guess ONLY if it exists on site (e.g., “info@domain.com” shown anywhere). Don’t fabricate.

PART 4 — DAILY PRODUCTION TARGETS (list build)
If done manually by one person:
- 50 leads/day is realistic with full review checks.
- 500 leads ≈ 10 working days at 50/day.
If using a VA team (2 people):
- 100 leads/day total → 500 leads in ~5 working days.

QA sampling checklist (10% sample daily):
- Category matches vertical?
- Website present and correct?
- Last review date captured correctly?
- Response-rate proxy computed from newest 10 reviews?
- Personalization snippet is accurate and non-sensitive?

PART 5 — COLD EMAIL SEQUENCES (3-step) 
Send from a real person name (Bob) and include website + contact email.

PERSONALIZATION TOKENS
- {{first_name}} (if unknown, omit)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (10–25 words or paraphrase)
- {{response_gap}} (e.g., “I didn’t see an owner reply on your last few reviews”)
- {{vertical_specific_phrase}} (dentistry/med spa/home services)

SEQUENCE A (Not Responding angle) — Local businesses
Email 1 (Day 1)
Subject options:
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed a response gap on your recent reviews

Body:
Hi {{first_name}},

I was looking at {{business_name}} on Google and saw a recent review: “{{recent_review_snippet}}”. {{response_gap}}.

We run an AI-assisted review reply + reputation autopilot that drafts brand-safe responses and helps you reply within ~12 hours. You can approve/edit before anything posts.

If it helps, I can send 2–3 sample replies for your latest reviews so you can see the tone. Our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Worth testing on Google first?
— Bob
agent_bob_replit+review-bot@agentmail.to

Email 2 (Day 3)
Subject: Want me to draft a reply to that review?

Hi {{first_name}},

If you send me the link to your Google profile (or just confirm it’s the one in {{city}}), I’ll draft responses for your 3 most recent reviews and you can decide if it’s useful.

Goal is simple: faster, consistent replies (especially to negatives) without you spending time in GBP.

Open to a 10-minute walkthrough this week?
— Bob

Email 3 (Day 7)
Subject: Close the loop on reviews (light lift)

Hi {{first_name}},

Last try—if review replies are already handled, I’ll stop reaching out.

If not: we can set this up so every new review triggers a draft reply, negatives get escalated immediately, and you get a weekly KPI recap (ratings trend, response rate, volume).

Reply “sample” and I’ll send examples using your last review.
— Bob

SEQUENCE B (Low Rating angle) — Local businesses
Email 1 (Day 1)
Subject options:
1) Helping {{business_name}} recover rating + trust
2) Quick process for negative reviews

Body:
Hi {{first_name}},

I came across {{business_name}} and noticed your Google rating is {{google_rating}}. A recent reviewer said: “{{recent_review_snippet}}”.

We help local businesses respond to negative reviews fast (brand-safe drafts + escalation) so issues don’t sit unanswered. You approve before posting, and we flag patterns so you can fix root causes.

If you want, I’ll draft a response to that review in your brand voice and send it over—no login needed. Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Should I send a draft reply?
— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-ups: use Email 2/3 structure from Sequence A, but emphasize “fast escalation + consistent tone + weekly KPI report.”

SEQUENCE C (High Volume angle) — Local businesses
Email 1 (Day 1)
Subject options:
1) Keeping up with {{review_count}}+ reviews at {{business_name}}
2) A simple way to respond faster on Google

Body:
Hi {{first_name}},

{{business_name}} gets a lot of reviews ({{review_count}}). That’s great—until it becomes a time sink.

We set up an autopilot: new review → draft response in your tone → you approve (or auto-approve rules) → negative reviews escalate immediately. Weekly report included.

If you’re open to it, I can show a 5-minute demo and draft replies for 2 recent reviews. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Want me to send the sample drafts?
— Bob
agent_bob_replit+review-bot@agentmail.to

AGENCY / RESELLER VERSION (initial email)
Subject options:
1) White-label review reply autopilot for your clients
2) Add a “review response” upsell in 48 hours

Hi {{first_name}},

If you manage local clients (dental/med spa/home services), review responses are an easy retention lever but annoying to deliver consistently.

We built an AI review reply + reputation autopilot for Google/Yelp: brand-safe drafts, negative escalation, weekly KPI reporting. It’s designed to be resold/managed by an agency (you control tone + approvals).

If helpful, I can share the workflow and sample reports: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Open to a quick call? Reply here or reach me at agent_bob_replit+review-bot@agentmail.to.
— Bob

PART 6 — DAILY SENDING OPS (14-day ramp)
Core principle: start slow, protect deliverability, ramp volume.

Targets (assumes 1 inbox; adjust if multiple inboxes):
Days 1–3: 20 new/day + 10 follow-ups/day
Days 4–7: 35 new/day + 20 follow-ups/day
Days 8–14: 50–75 new/day + 30–50 follow-ups/day

Daily checklist:
1) Pull today’s send list: Priority A first, then B.
2) Personalize: insert snippet + response gap line (no sensitive info).
3) Send new emails in batches (morning + afternoon).
4) Handle replies within 2 business hours (goal). Same-day always for negatives.
5) Log outcomes in CRM (below).
6) Watch bounces/complaints. Stop and clean list if thresholds hit.

List hygiene thresholds:
- Hard bounce > 3% in a day: pause sends, re-check emails.
- Spam complaints > 0.1%: pause, adjust copy/sending.

Reply-handling SLA + routing:
- Interested: offer 2–3 sample replies + propose a 10-min call.
- “We already do this”: ask who owns it + offer overflow support for high volume/negatives.
- “Not now”: ask timing; set follow-up date.

CRM pipeline stages (simple)
1) Prospects (imported)
2) Sent – Step 1
3) Sent – Step 2
4) Sent – Step 3
5) Replied – Interested
6) Replied – Not Now
7) Replied – Not a Fit
8) Demo Booked
9) Trial / Pilot
10) Paid
11) Lost

What to track weekly (KPIs):
- New sent, replies, positive reply rate, demos booked, trials started, paid conversions
- Bounce rate, complaint rate
- Segment performance (Not Responding vs Low Rating vs High Volume)

NEXT ACTION NEEDED FROM OWNER
1) Confirm initial geography: Top 25 metros (recommended) OR specify 5–10 states.
2) Start list build using this runbook; produce first 200 leads as a test batch.
3) Begin sends at 20/day and iterate copy based on replies.
