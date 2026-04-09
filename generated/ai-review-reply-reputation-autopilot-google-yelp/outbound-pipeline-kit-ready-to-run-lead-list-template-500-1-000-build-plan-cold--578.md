# Outbound Pipeline Kit (Ready-to-Run): Lead List Template + 500–1,000 Build Plan + Cold Email Sequences + Daily Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:24:12.348Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit

## A) Lead list CSV template (copy/paste headers)
**CSV headers (exact):**
- business_name
- vertical (dentist | med_spa | hvac_plumbing | agency)
- city
- state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- last_review_excerpt (personalization)
- response_rate_proxy_last10 (0–100)
- segment (not_responding | low_rating | high_volume | combo)
- priority (A | B | C)
- owner_or_manager_name
- role_guess
- email_1
- email_2
- linkedin_url (optional)
- notes

### Data dictionary + how to fill fast
- **google_rating / review_count / last_review_date:** from Google Business Profile panel.
- **last_review_excerpt:** first 8–20 words from most recent review (or paraphrase). Avoid medical details; keep it generic.
- **response_rate_proxy_last10:** open Reviews → scan last 10 reviews; count owner replies; (replies/10)*100.
- **segment rules:**
  - not_responding = response_rate_proxy_last10 <= 20
  - low_rating = google_rating < 4.2
  - high_volume = review_count >= 200 OR last_review_date within 14 days
  - combo = meets 2+ conditions
- **priority scoring:**
  - Priority A = (not_responding AND high_volume) OR (low_rating AND high_volume) OR combo
  - Priority B = not_responding OR low_rating
  - Priority C = high_volume only

## B) Lead sourcing plan (500–1,000, zero-cost workflow)
### Target geos (Top 15 metros to start)
NYC, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, San Francisco, Columbus, Charlotte.

### Exact Google Maps query strings (copy/paste)
**Dentists:**
- "dentist" + {city}
- "cosmetic dentist" + {city}
- "family dentistry" + {city}

**Med spas / aesthetics:**
- "med spa" + {city}
- "aesthetic clinic" + {city}
- "botox" + {city}

**HVAC / plumbing:**
- "HVAC" + {city}
- "air conditioning repair" + {city}
- "plumber" + {city}

**Agency lane (reseller):**
- "dental marketing agency" + {city}
- "med spa marketing" + {city}
- "home services marketing agency" + {city}

### Production targets (so you actually hit 1,000)
- **Day 1–2:** 100 leads/day (focus Priority A/B only)
- **Day 3–7:** 150 leads/day (mix A/B/C)
- **Goal:** 800 local businesses + 100–200 agencies = 900–1,000

### QA checklist (every 25 leads sample 5)
- Category matches vertical (no schools/franchises/irrelevant categories)
- Has active reviews (last_review_date not older than 90 days unless review_count > 300)
- Website exists (or at least a strong phone + maps URL)
- Personalization excerpt is safe (no patient identifiers, no sensitive details)
- Response proxy computed correctly (counted last 10 only)

## C) Cold email sequences (3-step) — includes website + contact email
**Your legitimacy link:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Your contact email:** agent_bob_replit+review-bot@agentmail.to

### 1) Local business sequence — Variant: NOT RESPONDING (responsiveness gap)
**Subject options:**
1) Quick fix for your Google reviews
2) Noticed a response gap on {BusinessName}
3) Can we draft your review replies?

**Email 1 (Day 1):**
Hi {FirstName},

I was looking at {BusinessName}’s recent Google reviews—saw "{last_review_excerpt}…" and it looks like a few reviews haven’t gotten a reply.

We run an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** responses to Google (and Yelp), escalates negative reviews, and sends weekly KPI reporting. **You approve** replies (or we can auto-post with guardrails).

Offer: we can start by drafting replies for your latest 10 reviews and you can judge quality before committing.

Worth a 10-minute call this week? If easier, reply with “draft” and I’ll send a sample response pack.

Legit link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3):**
Hi {FirstName}—quick bump.

Most owners want to reply fast but it slips. We aim for **responses within 12 hours**, and we flag anything negative for a human escalation.

Want me to draft replies for the newest 5 reviews at {BusinessName} (no charge) so you can see the tone?
— Bob

**Follow-up 2 (Day 6):**
Last try—should I close the loop?

If you reply with “1) approve-only” or “2) auto-post,” I’ll tell you the simplest setup for {BusinessName}.
— Bob

### 2) Local business sequence — Variant: LOW RATING (recovery + escalation)
**Subject options:**
1) Quick reputation win for {BusinessName}
2) Fixing review replies (without sounding robotic)
3) 4.0→4.4 playbook?

**Email 1:**
Hi {FirstName},

I noticed {BusinessName} is around **{google_rating} stars** on Google. One recent review said: “{last_review_excerpt}…”

We help local businesses recover rating impact by:
- drafting calm, brand-safe replies (Google + Yelp)
- escalating negative reviews immediately (so you can resolve offline)
- tracking weekly KPIs (rating trend, response rate, negative themes)

If you want, I can draft a response to that review in your brand voice and send 2 tone options for approval.

Legit link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob | agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
If you’re already handling replies internally, we can still help by drafting + escalating only the negatives and reporting themes weekly.

Open to a quick chat?
— Bob

**Follow-up 2:**
Should I send the drafted reply for your approval, or is review management not a priority right now?
— Bob

### 3) Local business sequence — Variant: HIGH VOLUME (ops + throughput)
**Subject options:**
1) Keeping up with your review volume
2) Review replies in 12 hours
3) Automating Google/Yelp responses

**Email 1:**
Hi {FirstName},

{BusinessName} has **{review_count} Google reviews** and you’re still getting new ones (latest: “{last_review_excerpt}…”). At that volume, replying consistently becomes a time sink.

We draft and (optionally) post replies within **12 hours**, keep tone consistent, and send a simple weekly KPI email (response rate, rating trend, hotspots).

Want to see a sample “week” report + 5 drafted replies for {BusinessName}?

Legit link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob

**Follow-up 1:**
If you forward this to whoever owns reviews, I can send the sample pack directly.
— Bob

**Follow-up 2:**
Okay to close this out, or should I send the sample draft pack first?
— Bob

## D) Agency/reseller initial email (sell to marketers who manage multiple clients)
**Subject options:**
1) Add-on for your local clients: review replies
2) White-label review response automation
3) Quick win for your SMB retainers

Hi {FirstName},

If you manage Google Business Profiles for {vertical} clients: we built an **AI Review Reply & Reputation Autopilot** (Google + Yelp) that drafts brand-safe replies, escalates negatives, and emails weekly KPIs.

Agencies use it as a **retainer add-on** (you keep margin). We can do approve-only mode so your team stays in control.

Want a 10-minute walkthrough + a sample weekly report?

Legit link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

## E) Daily sending ops + CRM pipeline
### 14-day ramp (per inbox)
- Days 1–2: 20/day
- Days 3–4: 30/day
- Days 5–6: 40/day
- Days 7–10: 60/day
- Days 11–14: 80–100/day (only if bounces < 3% and spam complaints ~0)

### Daily operating checklist (60–90 minutes)
1) Pull 30–100 new leads (Priority A then B) and QA 10% sample.
2) Personalize only the **first line** using last_review_excerpt + response gap.
3) Send new emails before noon local time; schedule follow-ups.
4) Triage replies 2x/day (morning + late afternoon):
   - Interested → book demo
   - Objection → send 2-line rebuttal + CTA
   - Not now → set 30-day recycle
5) Log outcomes + update segments if needed.

### CRM stages (minimum viable)
- Prospect (validated)
- Sent (E1)
- Follow-up Scheduled
- Replied — Positive
- Replied — Neutral/Question
- Replied — Negative
- Qualified (has GBP/Yelp, wants faster replies, decision-maker)
- Demo Booked
- Trial/Proof (sample pack sent)
- Paid
- Lost (reason)

### KPI targets (weekly)
- Bounce rate < 3%
- Positive reply rate 3–8% (with strong personalization)
- Meetings booked: 1–3 per 200 sends initially

---
If you want me to tailor the first-line personalization rules further, the main input I need is whether you prefer quoting reviews verbatim or paraphrasing them for safety/compliance.