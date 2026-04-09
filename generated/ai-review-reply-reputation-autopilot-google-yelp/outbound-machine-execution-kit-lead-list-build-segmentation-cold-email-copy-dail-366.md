# Outbound Machine (Execution Kit) — Lead List Build + Segmentation + Cold Email Copy + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:24:53.316Z

---

## 1) Offer + legitimacy references (use in all outbound)
**Product:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**What it does:** drafts (and can post) brand-safe responses to Google Business Profile and Yelp reviews, escalates negative reviews fast, and emails weekly reputation KPIs.
**Legitimacy link (include in footer or PS):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
**Reply/contact email (include in footer):** agent_bob_replit+review-bot@agentmail.to

---

## 2) Vertical + Geo plan (recommended starting scope)
Start with **Top 25 US metros** to keep categories consistent and maximize review velocity:
New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

### Google Maps query pack (copy/paste)
Run each query once per metro; collect the first 20–40 qualified businesses.

**Dentists**
- “dentist in {{metro}}”
- “cosmetic dentist in {{metro}}”
- “family dentist in {{metro}}”

**Med spas / aesthetic clinics**
- “med spa in {{metro}}”
- “aesthetic clinic in {{metro}}”
- “botox in {{metro}}”

**HVAC / Plumbing**
- “HVAC company in {{metro}}”
- “air conditioning repair in {{metro}}”
- “plumber in {{metro}}”

**Exclusions (skip):** national franchises (unless independently owned and locally marketed), businesses without a public website, listings with <25 reviews (unless very recent velocity), duplicate locations for the same brand in the same city.

---

## 3) Lead CSV template (headers) + segmentation/scoring
Create a Google Sheet with these exact headers; export CSV for sending.

### Column headers
business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date, last_review_excerpt, last_10_owner_responses_count, response_rate_proxy, segment, priority, owner_or_manager_name, role_guess, email_1, email_2, notes

### How to collect the fields (fast method)
1) Open Google Maps listing → copy **business name**, **phone**, **website**, **Maps URL**, **rating**, **review count**.
2) Click Reviews → sort by newest → capture:
   - **last_review_date** (date on newest review)
   - **last_review_excerpt** (first ~160 chars; avoid sensitive info)
3) In the last 10 reviews, count how many have an “Owner response” → put into **last_10_owner_responses_count**.
4) Compute **response_rate_proxy** = last_10_owner_responses_count / 10.
5) Find email(s):
   - On website header/footer/contact page.
   - If none: look for “appointments@ / info@ / admin@ / office@”.
   - For med spas: “concierge@” sometimes.
6) Guess role: “Owner”, “Practice Manager”, “Office Manager”, “Clinic Manager”, “General Manager”.

### Segmentation rules (set as formulas or manual)
- **not_responding:** response_rate_proxy <= 0.2
- **low_rating:** google_rating < 4.2
- **high_volume:** review_count >= 200 OR (TODAY - last_review_date) <= 14

**segment** assignment (choose primary):
1) If low_rating AND high_volume → segment = “low_rating”
2) Else if not_responding AND high_volume → “not_responding”
3) Else if not_responding → “not_responding”
4) Else if low_rating → “low_rating”
5) Else if high_volume → “high_volume”
6) Else → “baseline” (optional; deprioritize)

### Priority scoring
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only

---

## 4) Cold email sequences (3-step) — include website + contact email
Use personalization tokens:
- {{first_name}} (if unknown, use “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (from last_review_excerpt)
- {{response_gap}} (e.g., “looks like the last few reviews didn’t get a reply”)

### 4A) Direct-to-local: NOT RESPONDING variant
**Subject options:**
1) Quick fix for {{business_name}}’s reviews
2) Noticed a reply gap on your Google reviews
3) 12-hour review replies for {{business_name}}

**Email 1 (initial)**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”. It also looks like some recent reviews haven’t received a reply.

We built an **AI Review Reply & Reputation Autopilot** that drafts (and can post) brand-safe responses to Google Business Profile + Yelp, escalates negative reviews immediately, and sends a weekly KPI recap.

Simple promise: **responses within ~12 hours**, in your tone, and **you can approve before anything posts**.

Open to a 10-minute call this week to see if it would help in {{city}}?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3–4)**
Subject: Re: reviews for {{business_name}}

Hi {{first_name}} — quick follow-up.

Most local businesses we talk to don’t need “marketing,” they need **consistent review responses** so future customers see engagement (and unhappy reviewers get handled fast).

Want me to send 2–3 sample replies in your brand voice for your latest reviews so you can judge quality?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 2 (Day 7–10)**
Subject: Should I close the loop?

Hi {{first_name}},

Should I close the loop on this, or is someone on the team already handling Google/Yelp responses daily?

If it’s helpful, I can set up a quick trial where you **approve replies by email** before anything posts.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 4B) Direct-to-local: LOW RATING variant
**Subject options:**
1) Fixing the “public conversation” on reviews
2) Quick win for ratings perception
3) Question about review replies at {{business_name}}

**Email 1 (initial)**
Hi {{first_name}},

I’m reaching out because reviews are often the first “sales page” customers see. I noticed a recent review for {{business_name}}: “{{recent_review_snippet}}”.

We run an **AI Review Reply & Reputation Autopilot** that helps you respond consistently (Google + Yelp), flags negatives for fast escalation, and keeps the tone brand-safe.

Even when you can’t change the rating, a strong reply often improves what the next customer thinks.

Would you be open to a quick call? I can also send a couple sample replies in your voice.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 4C) Direct-to-local: HIGH VOLUME variant
**Subject options:**
1) Keeping up with review volume
2) Scaling review replies without adding staff
3) Review response workflow for {{business_name}}

**Email 1 (initial)**
Hi {{first_name}},

{{business_name}} gets a lot of reviews, which is great — but it becomes a real ops burden to answer quickly and consistently.

We built an **AI Review Reply & Reputation Autopilot** for Google/Yelp: it drafts on-brand replies, routes negative reviews for escalation, and emails weekly KPIs so you can track responsiveness.

If you want, I’ll send a few sample replies for your newest reviews and you can tell me if they match your voice.

Open to 10 minutes this week?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---

## 5) Daily sending ops + CRM stages (do this every day)
### CRM stages
Prospect → Ready to Send → Sent (Step 1) → Follow-up 1 Sent → Follow-up 2 Sent → Replied → Qualified → Demo Booked → Trial → Paid → Lost

### 14-day ramp (per inbox)
- Days 1–3: 15/day
- Days 4–6: 25/day
- Days 7–10: 40/day
- Days 11–14: 60/day
Stop/adjust if bounce rate >3% or spam complaints >0.1%.

### Daily checklist (60–90 minutes)
1) Pull 25–100 new prospects (based on ramp) from Priority A then B.
2) QA sample 10% of today’s batch: correct vertical, real website, non-franchise, review snippet matches listing.
3) Personalize: add {{recent_review_snippet}} and one sentence about response gap.
4) Send Step 1.
5) Process replies same day:
   - Interested → book demo
   - Not now → ask permission to follow up in 60 days
   - Wrong contact → ask for manager/owner email
6) Schedule Follow-up 1 for non-responders on Day 3–4; Follow-up 2 on Day 7–10.

### Weekly KPI targets
- Deliverability: bounce <3%, spam complaints <0.1%
- Reply rate: 3–8% (goal)
- Positive reply rate (interested): 0.5–2%
- Meetings booked: 1–3 per 500 sends (starting benchmark)

---

## 6) What I need from the owner next
1) Confirm geo scope: Top 25 metros (recommended) vs states vs US-wide.
2) Choose who will execute list-building (owner vs VA). This kit is designed for zero-cost manual collection.
3) After first 100–200 sends, we’ll refine: subject lines, segment thresholds, and vertical focus based on reply/meeting rates.
