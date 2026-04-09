# Outbound Pipeline Runbook (Ready-to-Run): Lead List Build (500–1,000), Segmentation, Cold Email Sequences, Daily Sending Ops + CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:31:36.244Z

---

## 0) Business identity to reference in outreach
- Product: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
- Proof/legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact/reply inbox: agent_bob_replit+review-bot@agentmail.to

---
## 1) Verticals + who to target
**Primary verticals (direct-to-local):**
1) Dentists (practice owner, office manager, practice administrator)
2) Med spas / aesthetic clinics (owner, clinic manager)
3) HVAC + plumbing (owner, GM, service manager)

**Agency lane (reseller/white-label):**
- Local SEO agencies, reputation management agencies, web design shops that manage Google Business Profiles.
- Titles: Founder/Owner, Head of SEO, Account Manager, Ops.

---
## 2) Lead list build system (zero-cost, repeatable)
### 2.1 Output CSV headers (copy/paste into Google Sheets)
created_date,vertical,business_name,city_state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy,last_10_reviews_count,last_10_owner_responses,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,contact_page_url,notes

### 2.2 Google Maps query pack (use per metro)
Use: "{vertical keyword} {metro}" then open each listing.

**Dentist keywords:**
- dentist, dental clinic, cosmetic dentist, pediatric dentist, orthodontist (optional)

**Med spa keywords:**
- med spa, medical spa, aesthetic clinic, botox clinic, laser hair removal

**HVAC/Plumbing keywords:**
- hvac, air conditioning repair, heating contractor, plumber, plumbing service

**Suggested metros (choose 10–25):** NYC, LA, Chicago, Houston, Phoenix, Philly, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, SF, Columbus, Fort Worth, Charlotte, Indianapolis, Seattle, Denver, DC, Nashville, OKC, El Paso, Boston, Portland.

### 2.3 Data capture steps per lead (2–3 minutes each)
1) From Google listing: capture business name, phone, website, rating, review count, Maps URL.
2) Click “Reviews” and sort by newest. Capture:
   - **last_review_date** (date of most recent review)
   - **last_review_excerpt** (first ~140 characters; remove personal/medical info; if sensitive, paraphrase).
3) Compute **response_rate_proxy** from last 10 reviews:
   - last_10_reviews_count = 10 (or fewer if fewer exist)
   - last_10_owner_responses = count visible owner replies
   - response_rate_proxy = last_10_owner_responses / last_10_reviews_count
4) Website → find contact email:
   - Homepage footer, Contact page, About page.
   - Capture email_1 (best), email_2 (secondary), plus contact_page_url.
   - If no email, note “contact form only” in notes.

### 2.4 Segmentation rules (deterministic)
- **not_responding**: response_rate_proxy <= 0.20 OR last_10_owner_responses = 0
- **low_rating**: google_rating < 4.2
- **high_volume**: review_count >= 200 OR (today - last_review_date) <= 14 days

If multiple apply, set segment as: low_rating+high_volume, not_responding+high_volume, etc.

### 2.5 Priority scoring (for send order)
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only

---
## 3) Cold email sequences (3-step) — LOCAL BUSINESS
**Personalization tokens to fill:**
- {{first_name}} (if unknown use: “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (or paraphrase)
- {{response_gap}} (e.g., “looks like many recent reviews don’t have an owner reply”)
- {{vertical_specific_term}} (e.g., “appointments” for dental, “treatments” for med spa, “service calls” for HVAC)

### 3.1 Email 1 (initial)
**Subject options (rotate):**
1) Quick help with Google review replies at {{business_name}}
2) Noticed a response gap on your recent reviews
3) {{business_name}} — reply to reviews within 12 hours?

**Body:**
Hi {{first_name}} — I was looking at {{business_name}}’s recent Google reviews in {{city}} and saw: “{{recent_review_snippet}}”.

{{response_gap}}. That usually costs local businesses bookings because prospects read the reviews *and* whether the owner responds.

We built a small “Review Reply & Reputation Autopilot” that:
- drafts brand-safe replies for Google + Yelp
- escalates negative reviews the same day
- sends a weekly KPI recap (rating trend, response rate, new review velocity)

Workflow is simple: we respond within 12 hours, and you can approve/edit (or let it auto-post with guardrails).

If I record a 2-minute teardown of your current review response rate + what we’d change, who should I send it to?

— Bob
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply: agent_bob_replit+review-bot@agentmail.to

### 3.2 Email 2 (follow-up #1, 2–3 days later)
**Subject:** Re: review replies for {{business_name}}

Hi {{first_name}} — quick follow-up.

If you’re open to it, we can start with a lightweight pilot:
- we draft replies for your next 10 reviews (Google + Yelp)
- you approve/edit
- we track response rate + any rating lift over the week

Worth a quick yes/no? If yes, are you the right person for reputation/review responses at {{business_name}}?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 3.3 Email 3 (follow-up #2, 5–7 days later)
**Subject:** Close the loop?

Hi {{first_name}} — should I close the loop on this?

If you already have someone replying to reviews consistently, all good. If not, we can take it off your plate and keep replies brand-safe + fast (12-hour SLA) with an escalation path for negatives.

If you want, reply with just:
1) “Google only” or “Google + Yelp”
2) who approves replies (you / manager)

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---
## 4) Agency/reseller email (separate lane)
**Subject options:**
1) White-label review reply ops for your GBP clients
2) Add “review response within 12 hours” to your packages

**Body:**
Hi {{first_name}} — do you manage Google Business Profiles for local clients?

We run a “Review Reply & Reputation Autopilot” that drafts/posts brand-safe Google + Yelp replies, escalates negatives same-day, and sends weekly KPI reporting.

Agencies use us white-label to:
- increase client retention (response rate becomes a visible deliverable)
- reduce account manager time on review ops
- upsell reputation management without hiring

If you tell me your main client verticals (dentist/med spa/home services/etc.), I’ll send a 1-page overview and suggested pricing/margin.

— Bob
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---
## 5) Daily sending ops (14-day ramp)
**Goal:** consistent volume with low bounces/complaints.

### 5.1 Ramp schedule (per inbox)
Day 1–2: 15/day
Day 3–4: 25/day
Day 5–6: 35/day
Day 7–8: 45/day
Day 9–14: 50–75/day (only if bounce <3% and complaint ~0)

### 5.2 List hygiene + QA (non-negotiable)
- Remove duplicates, franchises, and wrong categories.
- Require: website OR a visible email somewhere on site.
- Spot-check 20 leads per 200 for category accuracy and email correctness.

### 5.3 Bounce/complaint thresholds
- If hard bounce > 3% in a day: pause that segment, validate emails, reduce volume 50% for 48 hours.
- Any spam complaints: pause sending and tighten personalization + targeting.

### 5.4 Reply handling SLA
- Same day reply to all positives/curious responses.
- For “not interested”: ask one clarification question OR close politely—do not argue.

---
## 6) CRM stages (simple pipeline)
1) Prospects (imported, not sent)
2) Sent (Email 1)
3) Engaged (opened/clicked/replied)
4) Qualified (correct persona + has review volume/pain)
5) Meeting Booked
6) Trial/Pilot Started
7) Paid
8) Lost (with loss reason)

Fields to track: vertical, segment, priority, last touch date, next step, objection, outcome.

---
## 7) What I need from the owner to execute next
1) Pick geography scope for the first 500–1,000 (Top 25 metros vs 5–10 states).
2) Decide whether you’ll build the list yourself or delegate to a VA using this runbook.
3) Choose inbox/tooling stack (free/low-cost) so we can start ramping sends.