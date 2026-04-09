# Outbound Pipeline Kit (Ready-to-Run) — Lead List Build Spec (500–1,000), Segmentation Plan, Cold Email Sequences, Daily Sending Ops + CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:55:48.014Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit

## 0) Offer (use consistently)
**Product:** AI Review Reply & Reputation Autopilot (Google/Yelp)
- Drafts and posts brand-safe responses to reviews
- Escalates negative reviews quickly
- Weekly reputation KPI report
- Promise: **responses within 12 hours**, **you approve**, **brand-safe**

**Legitimacy link:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Reply/contact email:** agent_bob_replit+review-bot@agentmail.to

---

## 1) Verticals + why they’re high-intent
Target 2–3 verticals first (already selected):
1) **Dental practices** (high LTV, steady review flow, front-desk time constraints)
2) **Med spas / aesthetic clinics** (reputation-sensitive, high competition, frequent reviews)
3) **HVAC + Plumbing** (lead-gen tied to rating + recency, high review velocity in-season)

Parallel lane:
- **Agencies** serving those verticals (resell/white-label; higher volume per close)

---

## 2) Lead list CSV schema (required fields)
Create a CSV with these headers (exact spelling):
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (0–100%)
- segment (not_responding | low_rating | high_volume | mixed)
- priority (A | B | C)
- owner_or_manager_name
- role_guess (Owner | Practice Manager | Office Manager | GM | Marketing)
- email_1
- email_2
- personalization_snippet (latest review excerpt OR paraphrase)
- notes

### Data dictionary (how to fill each column)
- **google_rating / review_count:** from Google Business Profile panel
- **last_review_date:** open “Reviews” → sort by “Newest” → capture date of newest review
- **response_rate_proxy:** last 10 newest reviews: count how many have “Response from the owner” ÷ 10
- **personalization_snippet:** 1–2 lines from newest review (or a short paraphrase). Avoid health/PHI or sensitive details; keep it generic.

---

## 3) Segmentation + priority scoring (operational rules)
### Segment rules
- **not_responding:** response_rate_proxy ≤ 20% OR 0 owner responses in last 10 reviews
- **low_rating:** google_rating < 4.2
- **high_volume:** review_count ≥ 200 OR last_review_date within last 14 days
- **mixed:** qualifies for 2+ segments (e.g., low_rating + not_responding)

### Priority routing
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume) OR (mixed with low_rating)
- **Priority B:** not_responding OR low_rating (but not high_volume)
- **Priority C:** high_volume only

### Angle by segment
- **Not responding:** “You’re getting reviews but leaving money on the table—no owner replies”
- **Low rating:** “Fast escalation + consistent replies to reduce damage and earn back trust”
- **High volume:** “Ops problem—reply SLA + weekly KPI reporting; we handle throughput”

---

## 4) Zero-cost lead sourcing workflow (500–1,000)
This is the fastest **no-spend** method; it trades time for money.

### Step-by-step (VA/human)
1) Choose geography (see Section 9 decision).
2) Run Google Maps searches using the query pack below.
3) For each listing, fill:
   - name, city/state, phone, website, maps URL, rating, review count
4) Click Reviews → “Newest”:
   - capture last_review_date
   - capture personalization_snippet
   - compute response_rate_proxy from last 10 (count owner responses)
5) Find contact email (in order):
   - website contact page
   - footer
   - “appointments@ / info@ / office@ / hello@”
   - LinkedIn company page
6) Apply segment + priority rules.

### Production targets
- Trained VA can do **35–60 leads/day** with full review proxy + email capture.
- 2 VAs for 10 business days ≈ 700–1,200 leads.

---

## 5) Google Maps query pack (use per metro)
Use: “{vertical keyword} in {city, state}”

**Dental:**
- dentist
- dental clinic
- cosmetic dentist
- family dentist

**Med spa:**
- med spa
- aesthetics clinic
- botox clinic
- laser hair removal

**HVAC/Plumbing:**
- hvac contractor
- air conditioning repair
- plumber
- plumbing service

**Agency lane:**
- “dental marketing agency {city}”
- “med spa marketing agency {city}”
- “home services marketing agency {city}”

---

## 6) Cold email sequences (3-step) — include URL + contact
**Personalization tokens:**
- {{first_name}} (if unknown, use “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}}
- {{response_gap}} (e.g., “no owner replies on the last 10 reviews”)
- {{vertical}}

### 6A) Local business — Initial email (Not Responding angle)
**Subject options:**
1) Quick fix for Google reviews at {{business_name}}
2) Noticed you’re getting reviews in {{city}}
3) Re: replying to Google reviews

**Body:**
Hi {{first_name}},

I was looking at {{business_name}}’s recent Google reviews (e.g., “{{recent_review_snippet}}”). It looks like {{response_gap}}.

We run an **AI Review Reply & Reputation Autopilot** for local businesses: brand-safe responses drafted and posted for Google/Yelp, negative reviews escalated fast, and a weekly KPI report. **We respond within 12 hours and you approve everything.**

If helpful, I can send 3 sample replies in your tone for your latest reviews.

Want me to do that?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 6B) Local business — Initial email (Low Rating angle)
**Subject options:**
1) Quick reputation wins for {{business_name}}
2) About your Google rating
3) Reduce damage from negative reviews

**Body:**
Hi {{first_name}},

I saw a recent review for {{business_name}} that mentioned “{{recent_review_snippet}}.” With a public rating under 4.2, every unanswered review can cost calls.

We help businesses respond **consistently and brand-safely** on Google/Yelp: we draft replies, flag/escalate negatives immediately, and send weekly reputation KPIs. **12-hour response SLA, and you approve posts.**

Would it be useful if I drafted replies for the last 5 reviews so you can see the tone?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 6C) Local business — Initial email (High Volume angle)
**Subject options:**
1) Handling review volume at {{business_name}}
2) 12-hour review reply coverage
3) Reputation ops for busy teams

**Body:**
Hi {{first_name}},

{{business_name}} is getting a steady flow of reviews in {{city}}—latest one: “{{recent_review_snippet}}.” When volume is high, replies become an ops problem.

We provide an **AI Review Reply & Reputation Autopilot** (Google/Yelp): draft + post brand-safe replies, escalate negatives quickly, and weekly KPIs. **We can cover replies within 12 hours, with your approval.**

Open to a 10-minute call to see if this would take work off your team?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Follow-up #1 (2 business days later)
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

If I send **3 draft replies** for your most recent reviews (Google/Yelp), would you like them:
A) more warm/thank-you
B) more concise/professional
C) closer to your current brand tone?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Follow-up #2 (5–7 business days later)
**Subject:** Should I close the loop?

Hi {{first_name}},

Last note—if review responses aren’t a priority right now, no worries.

If you want, reply “sample” and I’ll send a small set of brand-safe replies for {{business_name}} (including one negative-review escalation example) so you can evaluate without a call.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---

## 7) Agency/reseller email (initial)
**Subject options:**
1) White-label review reply autopilot for your clients
2) Add-on for dental/med spa/home services clients
3) Reviews managed in 12 hours (white-label)

**Body:**
Hi {{first_name}},

I’m Bob. We built an **AI Review Reply & Reputation Autopilot** for Google/Yelp that agencies can resell: brand-safe reply drafting + posting, negative-review escalation, and weekly KPI reporting.

Agencies use it to reduce account load and add a clean monthly line item. We can run it white-label or co-branded; replies are approval-based with a **12-hour SLA**.

If you tell me which verticals you serve (dental, med spa, HVAC/plumbing), I’ll send a 1-page overview and example weekly KPI report.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---

## 8) Daily sending ops checklist + 14-day ramp
### Stack (free/low-cost defaults)
- Use one inbox to start (existing email). Track in Google Sheets CRM.
- No paid tracking required initially; focus on replies booked.

### 14-day ramp (per inbox)
- Days 1–2: 15 new/day + 10 follow-ups/day
- Days 3–4: 25 new/day + 15 follow-ups/day
- Days 5–7: 35 new/day + 20 follow-ups/day
- Week 2: 50 new/day + 25 follow-ups/day (only if bounce <3% and complaints ~0)

### Daily targets (minimum viable)
- 50 new emails/day
- 20 follow-ups/day
- 10 LinkedIn touches/day (optional)
- Reply SLA: respond within 1 business hour to any positive reply

### List QA rules (before sending)
- Website present (or strong GBP) and not a national chain/franchise HQ
- Category matches vertical
- Has reviews in last 90 days
- Email validated by “looks real” check (domain matches website when possible)

### Deliverability safety thresholds
- Hard bounce > 3% in a day: stop sends, fix list
- Spam complaints > 0.1%: stop, reduce volume, adjust copy

---

## 9) CRM stages (simple + enforceable)
Use a Sheet or free CRM with these stages:
1) Prospect (has email + segment + priority)
2) Sent (date sent)
3) Replied
4) Qualified (has GBP access? uses Yelp? decision maker?)
5) Demo Booked
6) Trial / Pilot (respond to last 10 reviews)
7) Paid
8) Lost (reason)

Key fields in CRM: last_touch_date, next_step, segment, priority, notes.

---

## 10) Decision needed (to start list-building today)
Choose ONE geography scope for the first 500–1,000 leads:
- **Option A:** Top 25 US metros (best for volume + consistency)
- **Option B:** 5–10 target states (best for focus if you can service regionally)
- **Option C:** US-wide (broad; higher variance)

Once chosen, run the query pack per metro/state and start producing 50–100 leads/day; begin sending as soon as first 100 Priority A/B leads are ready.
