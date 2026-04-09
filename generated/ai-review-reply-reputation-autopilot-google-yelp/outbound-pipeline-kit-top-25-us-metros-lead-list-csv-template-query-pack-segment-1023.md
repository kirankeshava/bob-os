# Outbound Pipeline Kit (Top 25 US Metros): Lead List CSV Template + Query Pack + Segmentation + Cold Email (3-step) + Daily Ops/CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:59:12.678Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit (Operator-Ready)
Business website (legitimacy link to include in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email to include in outreach: agent_bob_replit+review-bot@agentmail.to

## 1) Targeting: verticals + geo scope
**Verticals (high review velocity + high LTV):**
1) Dental practices
2) Med spas / aesthetic clinics
3) HVAC + Plumbers (home services)

**Geo for first 500–1,000 leads (US-only): Top 25 metros**
New York, Los Angeles, Chicago, Dallas, Houston, Washington DC, Miami, Philadelphia, Atlanta, Phoenix, Boston, San Francisco, Riverside-San Bernardino, Detroit, Seattle, Minneapolis-St Paul, San Diego, Tampa, Denver, Baltimore, St. Louis, Orlando, San Antonio, Portland, Sacramento.

Why: high density + high review volume + easier category filtering; keeps list quality high for first sending ramp.

---
## 2) Lead List CSV template (paste headers into Google Sheets)
**Headers (Row 1):**
prospect_id,business_name,vertical,service_type_guess,city,state,metro,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,response_rate_proxy_last10,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,contact_source,notes

### Data dictionary (what each field means)
- **prospect_id**: unique ID like DENT-NYC-001.
- **vertical**: dentist | med_spa | hvac_plumbing.
- **service_type_guess**: e.g., “cosmetic dentist”, “botox/fillers”, “HVAC repair”.
- **website/phone/google_maps_url**: from Google Business Profile.
- **google_rating/review_count**: from Google listing.
- **last_review_date**: date of most recent review.
- **last_review_snippet**: 8–20 words; either quote or paraphrase (avoid sensitive details).
- **response_rate_proxy_last10**: % of the last 10 reviews that have an owner response (0–100).
- **segment**: not_responding | low_rating | high_volume (rules below).
- **priority_tier**: A | B | C (rules below).
- **owner_or_manager_name/role_guess**: best guess from About/Team/LinkedIn/Contact pages.
- **email_1/email_2**: best available (owner/manager first; then info@).
- **contact_source**: website | GBP | Facebook | LinkedIn | directory.

### Segmentation rules (apply per row)
Use these exact definitions for consistent routing into templates:
- **Not Responding**: response_rate_proxy_last10 ≤ 20% (or 0 responses in last 10)
- **Low Rating**: google_rating < 4.2
- **High Volume**: review_count ≥ 200 OR last_review_date within last 14 days

If multiple match, keep **segment** as the dominant pain:
1) low_rating (highest urgency)
2) not_responding
3) high_volume

### Priority scoring → Priority tier
- **Priority A**: (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B**: (not_responding) OR (low_rating)
- **Priority C**: high_volume only

---
## 3) Google Maps query pack (exact search strings)
Open Google Maps and use these queries; then open each listing to capture rating, reviews, website, phone, and last review info.

### Dentist queries (run per metro)
- “Dentist in {METRO}”
- “Cosmetic dentist in {METRO}”
- “Dental implants in {METRO}”

### Med spa queries (run per metro)
- “Med spa in {METRO}”
- “Aesthetic clinic in {METRO}”
- “Botox in {METRO}”

### HVAC/Plumbing queries (run per metro)
- “HVAC contractor in {METRO}”
- “Air conditioning repair in {METRO}”
- “Plumber in {METRO}”

**List hygiene rules while collecting:**
- Skip national directories and leadgen aggregators.
- Prefer single-location or small multi-location operators (2–15 locations).
- Skip listings with no website unless review_count ≥ 200 (then keep, but expect weaker email find).

---
## 4) Cold email copy (3-step sequence) — includes legitimacy URL + contact email
Personalization tokens:
- {{first_name}} (or “Hi there”)
- {{business_name}}
- {{metro}}
- {{recent_review_snippet}}
- {{response_gap}} (e.g., “looks like most recent reviews aren’t getting a reply”)
- {{vertical_phrase}} (e.g., “dental”, “med spa”, “HVAC/plumbing”)

### 4A) INITIAL EMAIL — Not Responding variant
**Subject options (pick 1):**
1) Quick fix for unanswered reviews at {{business_name}}
2) {{business_name}} — replying to reviews (12-hour SLA)
3) Noticed a review-response gap in {{metro}}

Body:
Hi {{first_name}} — quick note. I was looking at {{business_name}}’s Google reviews and saw: “{{recent_review_snippet}}”.

It also looks like recent reviews often don’t get a response ({{response_gap}}). That’s a missed conversion lever—especially for {{vertical_phrase}} where people compare 2–3 options fast.

We built an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** responses to Google (and Yelp), flags negative reviews for escalation, and sends a weekly KPI summary. **You approve** before anything posts.

If I send 2–3 sample replies in your tone for your latest reviews, would you want to see them?

Legitimacy link: {{business_name}} can verify what it is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Or reply here and I’ll send samples: agent_bob_replit+review-bot@agentmail.to

— Bob

### 4B) INITIAL EMAIL — Low Rating variant
**Subject options:**
1) Helping {{business_name}} recover reviews (without canned replies)
2) Quick reputation triage for {{business_name}}
3) Negative reviews: faster response + escalation

Body:
Hi {{first_name}} — I saw a recent review for {{business_name}} that said: “{{recent_review_snippet}}”.

When ratings dip (even slightly), the *speed and quality* of the owner response matters a lot—future customers read those replies.

Our **AI Review Reply & Reputation Autopilot** drafts calm, brand-safe responses and **escalates negatives** so you can resolve them quickly. Nothing posts without approval. We also track weekly KPIs (rating trend, response speed, unresolved negatives).

Want me to draft a response to that review (and one more) for you to compare?

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply to: agent_bob_replit+review-bot@agentmail.to

— Bob

### 4C) INITIAL EMAIL — High Volume variant
**Subject options:**
1) Keeping up with review volume at {{business_name}}
2) Review replies without extra admin time
3) 12-hour review response coverage

Body:
Hi {{first_name}} — {{business_name}} gets a lot of review activity, and I saw: “{{recent_review_snippet}}”.

If you’re getting steady volume, it’s hard to keep replies consistent (and on-brand) without someone living in the inbox.

We run an **AI Review Reply & Reputation Autopilot** for Google/Yelp: draft replies within 12 hours, escalate negatives, and send a weekly KPI report. **You approve** everything before it posts.

Open to a 10-minute walkthrough, or should I send a few sample replies first?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

— Bob

---
### FOLLOW-UP #1 (2 business days later)
Subject: Re: {{business_name}} review replies

Hi {{first_name}} — checking back.

If it’s easier, I can send **3 sample replies** (1 positive, 1 neutral, 1 negative) in a tone that matches {{business_name}}. You can edit/approve—nothing auto-posts.

Is the right person for review responses you, or someone else on the team?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### FOLLOW-UP #2 (5–7 business days later)
Subject: Close the loop?

Hi {{first_name}} — last try.

If review responses aren’t a priority, no worries. If they are, we can cover:
- Replies drafted within 12 hours
- Negative review escalation
- Weekly reputation KPIs (response rate, response time, rating trend)

Reply with “samples” and I’ll draft a few from your latest reviews.

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---
## 5) Daily sending ops + 14-day ramp (safe defaults)
**Goal:** reach 50–100 cold emails/day per inbox while keeping bounce/complaint low.

### List QA before sending (non-negotiable)
- Sample 20 leads per 200: confirm correct category, has real website, not a directory, and the review snippet matches the listing.
- Verify email format aligns with domain (avoid obvious typos).
- Remove role accounts if possible (but keep info@ as fallback).

### Ramp schedule (per inbox)
- Days 1–2: 10/day
- Days 3–4: 20/day
- Days 5–6: 30/day
- Days 7–9: 40/day
- Days 10–14: 50/day
(Scale by adding inboxes; do not spike volumes.)

### Reply handling SLA
- Reply within 2 hours during business day.
- If they request samples: deliver 3 sample replies same day and ask for a 10-minute call.

### Stop/adjust thresholds
- Bounce rate > 3% in a day → pause, fix list, re-verify.
- Spam complaints > 0.1% → pause and reduce volume.

---
## 6) CRM stages (minimum viable pipeline)
1) **Prospect (New)** → imported lead not yet sent
2) **Sent** → initial email sent
3) **Engaged** → replied or clicked
4) **Qualified** → confirmed decision maker + has Google/Yelp activity
5) **Demo Booked**
6) **Trial / Samples Delivered**
7) **Paid**
8) **Lost** (reason required: no need, timing, price, already covered, wrong contact)

**Required CRM fields:** business_name, vertical, metro, segment, priority_tier, last_touch_date, next_step, status, email, phone, google_rating, review_count.

---
## 7) How to produce 500–1,000 leads fast (human/VA workflow)
- Day 1: pick 5 metros; collect 25 per vertical (375 total capacity if 25×3×5) but target 150–200 for QA.
- Day 2–3: expand to remaining metros; prioritize **Priority A** rules first.
- Day 4+: fill to 500–1,000; start sending as soon as first 100 clean leads are ready (don’t wait for full 1,000).

This kit is designed so list-building and sending can run in parallel: collect → QA → segment → send → follow-up.
