# Outbound Pipeline Kit (Ready-to-Run): Lead List CSV Template + Segmentation + Cold Email Sequences + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T05:28:40.937Z

---

# Outbound Pipeline Kit — AI Review Reply & Reputation Autopilot (Google/Yelp)
Website to reference for legitimacy in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 1) Lead List CSV Template (copy/paste headers)
**CSV headers:**
lead_id,vertical,segment,priority_tier,business_name,city,state,zip,phone,website_url,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,owner_or_manager_name,role_guess,email_1,email_2,contact_source,notes

### Data dictionary (what to fill + how)
- **vertical:** dentist | med_spa | hvac_plumbing | agency
- **google_rating / review_count:** from Google Business Profile panel.
- **last_review_date:** date shown on most recent review.
- **last_review_excerpt:** 8–20 words; if sensitive, paraphrase.
- **response_rate_proxy_last10:** count of owner responses in last 10 reviews / 10. Example: 0.2.
- **segment rules (use these exact cutoffs):**
  - **not_responding:** response_rate_proxy_last10 <= 0.2
  - **low_rating:** google_rating < 4.2
  - **high_volume:** review_count >= 200 OR last_review_date within 14 days
  - If multiple apply, keep the “most painful” first in notes and set segment to the primary trigger you’ll email on.
- **priority_tier:**
  - **A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
  - **B:** not_responding OR low_rating
  - **C:** high_volume only

## 2) Zero-Cost Lead Build Plan (to reach 500–1,000)
### Vertical focus (start with these 3)
1) Dentists
2) Med spas / aesthetics
3) HVAC + plumbers
Parallel lane: marketing agencies serving those verticals.

### Geo approach (you choose one)
- **Option A:** Top 25 US metros (best for scale, consistent demand)
- **Option B:** 5–10 states (best if you want tighter territory focus)
- **Option C:** US-wide (harder QA, more variance)

### Google Maps query pack (use per metro)
Run each query in Google Maps and collect top results (skip obvious chains/franchises if you want owner-led).
- Dentists:
  - “dentist [city]”
  - “cosmetic dentist [city]”
  - “family dentistry [city]”
- Med spa:
  - “med spa [city]”
  - “botox [city]”
  - “aesthetic clinic [city]”
- HVAC/Plumbing:
  - “HVAC [city]”
  - “air conditioning repair [city]”
  - “plumber [city]”

### Daily production targets (manual)
- **One person:** 40–60 leads/day (with rating/reviews/last review + response proxy)
- **Two people / owner + VA:** 100–150 leads/day
- Goal: first 200 leads in 48 hours, then scale to 800–1,000 in week 1.

### QA sampling rules (prevents junk)
- Spot-check 10% of daily entries:
  - correct category/vertical
  - real local business (not directory)
  - website exists and matches business name
  - google_maps_url opens correctly
  - response proxy computed correctly (count replies in last 10)
- Disqualify if: closed/permanently closed, no usable contact path, or irrelevant category.

## 3) Cold Email Sequences (3-step) — include website URL for legitimacy
**Personalization tokens:** {{first_name}}, {{business_name}}, {{city}}, {{recent_review_excerpt}}, {{rating}}, {{review_count}}, {{response_gap}}.
**Standard offer line:** “We draft brand-safe replies within 12 hours; you approve before anything posts.”

### A) Local business sequence — NOT RESPONDING variant
**Email 1 (Day 1)**
Subject: Quick fix for {{business_name}} reviews

Hi {{first_name}} — I was looking at {{business_name}} on Google and saw a recent review: “{{recent_review_excerpt}}”.

Not sure if it’s intentional, but it looks like there aren’t many owner replies lately ({{response_gap}}). Fast, consistent responses tend to lift conversion from search.

We built an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** Google/Yelp replies and can escalate negatives instantly. You can approve every response before it posts.

If helpful, I can send 3 drafted replies for your latest reviews so you can see the tone.

Want me to do that? Also for legitimacy: {{website}} = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{your_name}}

**Email 2 (Day 3)**
Subject: Should I draft a few replies for you?

Hi {{first_name}} — quick follow-up. If you send 2–3 review links (or just confirm you want Google only vs Google+Yelp), I’ll draft replies that match your brand voice.

We aim for **<12 hour** turnaround, and we flag anything negative for human escalation.

Open to a 10-minute call this week?
— {{your_name}}

**Email 3 (Day 7)**
Subject: Close the loop on review replies

Hi {{first_name}} — totally fine if now isn’t a priority. Last note: most businesses don’t lose on ratings alone; they lose when prospects see unanswered reviews.

If you want, I’ll record a 2-minute loom-style breakdown (no login needed) of where responses are missing on {{business_name}}.

Should I send it?
— {{your_name}}

### B) Local business sequence — LOW RATING variant
**Email 1 (Day 1)**
Subject: {{business_name}} reputation quick win

Hi {{first_name}} — I saw {{business_name}} has a {{rating}} rating on Google. The good news: you can often improve conversion without “more reviews” immediately by responding well to the tough ones.

We built an AI-assisted workflow that drafts **calm, brand-safe** replies, escalates negatives the same day, and tracks weekly KPIs. You approve before posting.

Want me to draft a response to your latest 1–2 negative reviews (free) so you can see how it would look?
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{your_name}}

**Email 2 (Day 3)**
Subject: Drafting a reply to the last negative review

If you tell me whether you prefer a more formal or friendly voice, I’ll draft a response that:
- acknowledges the issue
- avoids admitting fault inappropriately
- moves the convo offline

Want “formal” or “friendly”?
— {{your_name}}

**Email 3 (Day 7)**
Subject: Worth fixing review responses?

If ratings are already top-of-mind, we can start with just the negative-review handling + escalation and add full autopilot later.

Is someone currently responsible for review replies at {{business_name}}?
— {{your_name}}

### C) Local business sequence — HIGH VOLUME variant
**Email 1 (Day 1)**
Subject: Handling {{review_count}} reviews without more staff

Hi {{first_name}} — {{business_name}} has {{review_count}} Google reviews, which usually means steady lead flow.

When volume is high, the problem becomes consistency + speed. We draft replies in your brand voice, queue them for approval, and escalate negatives immediately.

If I send a sample weekly KPI report (reply time, response rate, negative escalation count), would that be useful?
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{your_name}}

**Email 2 (Day 3)**
Subject: Sample KPI report for {{business_name}}?

We track:
- response rate last 7/30 days
- median response time
- negative-review response SLA
- rating trend

Want the sample report format?
— {{your_name}}

**Email 3 (Day 7)**
Subject: Who owns reputation / reviews?

Quick one: who handles Google/Yelp reviews internally—front desk, GM, or owner?
— {{your_name}}

## 4) Agency / Reseller lane (faster path to volume)
**Target:** small marketing agencies doing local SEO/PPC for dentists/med spas/home services.

**Agency Email 1**
Subject: Add “review responses” to your SEO retainers

Hi {{first_name}} — quick idea for your local clients: we run an AI-assisted review response + escalation workflow (Google/Yelp) so your clients respond within 12 hours and look attentive.

It’s easy to bundle into SEO retainers: you get predictable fulfillment + a weekly KPI report for the client.

Want to see a reseller/white-label outline? Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{your_name}}

## 5) Daily sending ops + CRM stages
### 14-day ramp (per inbox)
Day 1–2: 10/day
Day 3–4: 15/day
Day 5–6: 20/day
Day 7–8: 25/day
Day 9–10: 30/day
Day 11–14: 35–40/day (hold if bounce/complaints rise)

### Daily checklist (owner/ops)
- Add 40–100 new prospects (depending on inbox count)
- QA 10% of new rows
- Send new Email 1s + scheduled follow-ups
- Reply to all positive replies within 2 hours (business hours)
- Tag replies in CRM same day
- Stop sequence immediately on: “not interested”, “remove”, “wrong person”

### Bounce/complaint thresholds
- If hard bounce > 3% in a day: pause new sends, clean list
- Any spam complaint spike: reduce volume 30–50% for 72 hours

### CRM stages (simple)
Prospect → Sent E1 → Sent E2 → Sent E3 → Replied → Qualified → Demo Booked → Trial → Paid → Lost
Entry/exit rule: only move to Qualified if they confirm they manage reviews and have Google/Yelp access or want managed service.

## What I need from you next
1) Choose geography scope (A top metros / B states / C US-wide).
2) Decide who will do list building (you vs VA). If VA: I can provide a 1-page task brief and acceptance criteria.
3) Tell me the email address you want referenced as the sender (so I can hardwire it into the signatures).