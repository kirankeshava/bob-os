# Outbound Pipeline Master Doc (Zero-Spend Week 1): Lead List Build (500–1,000) + Segmentation + Cold Email Sequences + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T22:55:24.099Z

---

## 0) Offer (what we’re selling in Week 1)
**AI Review Reply & Reputation Autopilot (Google/Yelp)**
- Drafts brand-safe responses to new reviews
- Escalates negative reviews (alerts + recommended remediation)
- Weekly KPI report (rating trend, response rate, negative review count, time-to-first-response)
- **Week 1 = free trial / free setup (no spend, no payment collection)**

Legitimacy links to use everywhere:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

---

## 1) ICP + Verticals (pick 2–3 to start)
Primary verticals (high review velocity + high LTV):
1) **Dentists / Orthodontists / Cosmetic dentistry**
2) **Med spas / Aesthetic clinics / Dermatology cosmetics**
3) **HVAC + Plumbing (home services)**

High-intent triggers (use for segmentation + personalization):
- Lots of new reviews but **few/no owner responses**
- **Rating < 4.2** (reputation pain)
- **Recent negative review** in last 30 days
- High review count (social proof worth protecting)

---

## 2) Lead list CSV schema (copy/paste header)
Use **one row per location**.

**CSV headers:**
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy_last10,segment,priority,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,notes

### Data dictionary (what each field means)
- **google_rating**: numeric (e.g., 4.6)
- **review_count**: integer
- **last_review_date**: YYYY-MM-DD
- **response_rate_proxy_last10**: % of last 10 reviews that have an owner/management response (0–100)
- **segment** (choose one primary): not_responding | low_rating | high_volume | mixed
- **priority**: A | B | C (rules below)
- **personalization_snippet**: either a short quote (<= 140 chars) from a recent review OR a paraphrase (safer) + date
- **owner_or_manager_name / role_guess / emails**: best-available; if unknown, leave blank and use generic opener

---

## 3) Segmentation rules (operational + consistent)
Compute these from Google Business Profile / Maps:

**Not responding**
- response_rate_proxy_last10 <= 20% OR 0 responses in last 10 reviews

**Low rating**
- google_rating < 4.2

**High volume**
- review_count >= 200 OR last_review_date within last 14 days

**Priority scoring (routing for outreach)**
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume) OR any business with a recent 1–2 star review in last 30 days
- **Priority B:** not_responding OR low_rating (but not high_volume)
- **Priority C:** high_volume only (rating ok, they respond somewhat)

Template mapping:
- not_responding → “response gap / missed revenue” template
- low_rating → “reputation recovery / escalation” template
- high_volume → “ops throughput / 12-hour SLA” template

---

## 4) Zero-cost lead sourcing workflow (500–1,000) — Google Maps manual
Goal: 500–1,000 leads without paid scrapers.

### Step A — Choose geography (needed from owner)
Pick ONE for consistency:
- Option 1: **Top 25 US metros** (breadth, strong density)
- Option 2: **5–10 target states** (focus + easier personalization)
- Option 3: US-wide (harder QA; not recommended initially)

### Step B — Query pack (repeatable searches)
For each metro/state, run these queries in Google Maps:
- “dentist + [city]” and “cosmetic dentist + [city]”
- “med spa + [city]” and “aesthetic clinic + [city]”
- “HVAC + [city]” and “plumber + [city]”

Filters (manual):
- Prefer independent locations over mega-franchises (unless franchisee-managed)
- Exclude closed/permanently closed
- Keep businesses with **>= 30 reviews** (minimum signal)

### Step C — Collect fields quickly
Per lead:
1) Copy business name, phone, website, Maps URL
2) Record rating + review count
3) Open reviews tab: capture last review date
4) Check last ~10 reviews for owner responses → compute response_rate_proxy_last10
5) Save one short “personalization snippet” (quote or paraphrase) from a recent review (ideally within 90 days)

### Step D — Email enrichment (free)
Best free sources (no spend):
- Business website Contact page
- Google Business “Website” link footer (often shows emails)
- Facebook page About section
- LinkedIn company page

Format guess (only if you find owner/manager name):
- first@domain, info@domain, office@domain, manager@domain

QA sampling rule:
- Every 50 rows, sample 5 rows and verify: category fit, correct website, not a duplicate, valid phone, plausible rating/review counts.

Production target (manual):
- 50–80 rows/day per person once workflow is smooth

---

## 5) Cold email sequences (3-step) — include website + contact
**General notes**
- Keep personalization in the first 2 lines.
- Use “you approve before posting” as the safety guarantee.
- Week 1 CTA is frictionless: “Want me to draft 3 replies free?”

### 5A) Local business — Not Responding variant
**Subject options:**
1) Quick fix for {BusinessName}’s review replies
2) Noticed a response gap on your Google reviews
3) Can I draft 3 replies for you this week?

**Email 1**
Hi {FirstName/Team},

I was looking at {BusinessName}’s recent Google reviews and noticed a few don’t have an owner response yet (e.g., “{ReviewSnippet}”).

I run **AI Review Reply & Reputation Autopilot** — we draft **brand-safe** responses for Google/Yelp and send them to you for approval (or we can post after you approve). We also flag negative reviews for fast escalation.

In Week 1 we’re doing free setup: I can draft **3 on-brand replies** for {BusinessName} within 12 hours so you can see the quality.

Want me to send those drafts? If yes, which tone fits you best: warm & grateful, short & professional, or more detailed?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply here or email: agent_bob_replit+review-bot@agentmail.to
— Bob

**Follow-up 1 (Day 2–3)**
Subject: Re: review replies for {BusinessName}

Quick nudge — responding consistently tends to lift conversion from Maps.

If you share 1–2 example replies you like (or your website link is enough), I’ll match the voice and send 3 drafts for approval.

Ok to send them over?
— Bob

**Follow-up 2 (Day 6–7)**
Subject: Last try — 3 drafts ready

I can have 3 reply drafts ready today for {BusinessName}. No logins needed initially — just confirm preferred tone.

Should I proceed, or is someone else the right person for reputation/reviews?
— Bob

---

### 5B) Local business — Low Rating variant
**Subject options:**
1) Idea to lift {BusinessName}’s rating trajectory
2) Quick reputation win (no extra work)
3) Handling negative reviews faster

**Email 1**
Hi {FirstName/Team},

I saw {BusinessName} is at **{Rating} stars** on Google and there’s at least one recent review that sounds fixable (e.g., “{ReviewSnippet}”).

We built **AI Review Reply & Reputation Autopilot** to help local businesses respond quickly, stay brand-safe, and **escalate** negatives to the right person fast. You approve every response before anything posts.

This week we’re offering free setup: I’ll draft replies to your **last 3 reviews** (including the tough one) and include an escalation note (what to say + what to do offline).

Want me to send those drafts for approval?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to
— Bob

**Follow-up 1**
Subject: Re: {BusinessName} rating

If you’re already busy, the easiest win is simply responding fast + consistently.

I can draft the replies in your voice and send them as a single approval email.

Who should I coordinate with?
— Bob

**Follow-up 2**
Subject: Close the loop on reviews

Should I (1) send 3 draft replies, or (2) stop bugging you?

Either way, reply with “1” or “2”.
— Bob

---

### 5C) Local business — High Volume variant
**Subject options:**
1) Keeping up with review volume at {BusinessName}
2) 12-hour review reply SLA
3) Offload review responses (you approve)

**Email 1**
Hi {FirstName/Team},

{BusinessName} gets a lot of reviews (currently {ReviewCount}). Keeping response times tight is hard, even when service is great.

Our **Review Reply & Reputation Autopilot** drafts on-brand replies for Google/Yelp and sends them to you for approval. We can commit to a **12-hour draft turnaround** and highlight any negative reviews for immediate escalation.

Free this week: I’ll draft replies to your 3 most recent reviews so you can judge quality.

Want me to do that?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to
— Bob

---

## 6) Agency / reseller lane (faster path to volume)
Target: local marketing agencies, SEO agencies, reputation management firms.

**Subject options:**
1) White-label review replies for your clients
2) Add “review response SLA” to your retainers
3) Quick partnership idea

**Email 1 (agency)**
Hi {FirstName},

Noticed your agency works with local businesses (often the same ones that struggle to keep up with Google/Yelp reviews).

We built **AI Review Reply & Reputation Autopilot**: brand-safe drafted responses, negative-review escalation, and weekly KPI reporting. It’s easy to white-label because clients can approve before posting.

Week 1 is free — want to pilot this on 1 client account? I’ll draft replies to their last 3 reviews and share a simple weekly KPI snapshot.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to
— Bob

---

## 7) Daily sending ops (Week 1, no spend)
### Sending targets (per day)
- New cold emails: **30–60/day** per inbox (stay conservative)
- Follow-ups: **same volume as new sends** (1:1 ratio)
- Manual personalization: **Priority A only** gets review snippet line

### 14-day ramp (simple)
- Days 1–2: 20/day
- Days 3–4: 30/day
- Days 5–7: 40/day
- Days 8–10: 60/day
- Days 11–14: 80/day (only if bounce < 5% and replies healthy)

### List hygiene + thresholds
- Hard bounce threshold: **>5%** → stop, clean list
- Spam complaint: **any** → slow down, adjust copy
- Unsubscribe handling: immediate suppression
- Reply SLA: respond to positive replies within **2 hours** during business day

### Reply handling rules
- Interested: ask 3 questions (platforms used, volume/week, approval preference) and offer 10-min call
- Not now: move to “Nurture” and set 30-day follow-up
- Wrong person: ask for referral and forward

---

## 8) CRM stages (minimum viable pipeline)
Use Google Sheets if needed.
Stages + entry/exit:
1) **Prospect (New)** → has required fields + email
2) **Queued to Send** → assigned template + personalization
3) **Sent** → date/time logged
4) **Replied** → any response
5) **Qualified** → has pain (volume, low rating, no responses) + decision maker
6) **Demo Booked** → calendar time set
7) **Trial (Free Week 1)** → we drafted/post-approved replies + KPI report started
8) **Converted (Paid later)** → after week 1, move to paid plan (post-week-1 policy)
9) **Lost** → explicit no / non-responsive after full sequence

Track KPIs weekly:
- Sent, Delivered (est.), Reply rate, Positive reply rate, Demo booked, Trial started

---

## 9) What to do next (owner action)
1) Choose geography scope (Top 25 metros vs 5–10 states). 
2) Build first **200 leads** using the CSV header and workflow above.
3) Start sending to Priority A/B with the matching templates; log every send in CRM.
4) Use positive replies to onboard into Week 1 free trial (draft 3 replies within 12 hours and send approval email from agent_bob_replit+review-bot@agentmail.to).