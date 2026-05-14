# Outbound Pipeline Kit (Zero-Cost): Lead List CSV Template + Segmentation Plan + 3-Step Cold Email Sequences + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T22:17:29.778Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit (Zero-Cost)

Business proof link (include in outreach when needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Reply-to / contact: agent_bob_replit+review-bot@agentmail.to

## 1) Verticals + Segments (what we’re targeting)
**Verticals (start with 3):**
1) Dentists / dental practices
2) Med spas / aesthetic clinics
3) HVAC + plumbing (home services)

**Segments (tag each lead):**
- **Not responding:** In last 10 Google reviews, business replies in ≤2 (≤20%).
- **Low rating:** Google rating < 4.2.
- **High volume:** Review count ≥ 200 OR last review within 14 days.

**Priority scoring:**
- **Priority A:** (Not responding AND High volume) OR (Low rating AND High volume)
- **Priority B:** Not responding OR Low rating
- **Priority C:** High volume only

**Messaging map:**
- Not responding → “responsiveness gap + revenue leakage + we reply within 12 hours.”
- Low rating → “triage + escalation + brand-safe recovery responses (you approve).”
- High volume → “ops/throughput: we keep up with volume + weekly KPI reporting.”

## 2) Lead List CSV Template (copy/paste headers)
Use this exact header row:

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,contact_page_url,notes

**Data dictionary (how to fill columns):**
- **google_rating/review_count:** from Google Business Profile card.
- **last_review_date:** open “Reviews” → sort “Newest” → date shown.
- **last_review_excerpt:** first ~10–20 words (or paraphrase to avoid quoting sensitive content).
- **response_rate_proxy_last10:** count business replies in the last 10 reviews / 10 (e.g., 0.2).
- **segment/priority:** use rules above.
- **emails:** from website footer/contact page; if none, try “info@domain”, “office@domain”, “hello@domain”.

## 3) Zero-Cost Lead Sourcing Workflow (repeatable)
**Goal:** 500–1,000 leads without paying for scrapers.

### Step A — Choose geography (needed to start)
Pick ONE:
- **Top 25 US metros** (fastest scaling + consistent demand)
- **5–10 target states** (tight focus)
- **US-wide** (broad but noisier)

### Step B — Google Maps query pack (examples)
For each metro/state, run these queries:
- Dentists: “dentist + {city}”, “cosmetic dentist + {city}”, “family dentistry + {city}”
- Med spa: “med spa + {city}”, “botox + {city}”, “aesthetic clinic + {city}”
- Home services: “hvac + {city}”, “plumber + {city}”, “air conditioning repair + {city}”

**Collection rule:** Only add businesses with (a) a real website, (b) at least 30 reviews (so response behavior is visible), (c) not obvious national franchises unless location owner-managed.

### Step C — Capture review-response proxy quickly
Open the business’s reviews → scan last 10 → count how many have “Response from the owner.”

### Step D — Find emails (free)
1) Website “Contact” page and footer
2) About/team page (office manager/practice manager)
3) If still missing: use guessed role-based emails (info@, contact@, hello@) and log that it’s “guessed.”

### Step E — QA sampling
Every 50 leads, QA 5 leads:
- Correct category/vertical?
- Website works?
- Email present and plausible?
- Review count/rating accurate?
- Segment matches rules?

## 4) Cold Email Sequences (3-step) — Local Businesses
**Personalization tokens:**
- {{first_name}} (if unknown, use “Hi there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (short quote or paraphrase)
- {{response_gap}} (e.g., “I didn’t see an owner response on the last few reviews”)
- {{vertical_specific}} (dentistry / med spa / HVAC)

### 4.1 Email 1 (Not Responding angle)
**Subject options:**
1) Quick idea for {{business_name}} reviews
2) Noticed a response gap on Google
3) {{business_name}} — reply-to-reviews help?

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}.” {{response_gap}}.

We built an **AI Review Reply & Reputation Autopilot** for local businesses that drafts **brand-safe** responses and helps you keep up with reviews without spending staff time. You can **approve everything** before anything is posted.

Offer (free this week): we’ll respond to new reviews within **12 hours**, escalate negative reviews to you, and send a weekly KPI snapshot (rating trend, response rate, review velocity).

Want me to set up a 7-day free trial for {{business_name}}? If yes, reply with the best email to connect to your Google Business Profile.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 4.2 Email 1 (Low Rating angle)
**Subject options:**
1) Quick win to improve review optics
2) About {{business_name}}’s Google rating
3) Fixing review responses (without drama)

Body:
Hi {{first_name}},

I noticed {{business_name}}’s Google rating is around {{google_rating}}. One recent review mentioned: “{{recent_review_snippet}}.”

A lot of businesses lose bookings not from the rating alone, but from **no response / wrong tone** on the tough reviews. We run a review-response autopilot that drafts **on-brand, non-defensive** replies, escalates anything sensitive, and keeps an audit trail. You approve before posting.

If you want, I can run a **free 7-day trial**: we’ll handle new reviews within 12 hours + send a weekly report (response rate, sentiment, recurring issues).

Should I send a quick checklist of what we’d need to start (GBP access + preferred tone)?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 4.3 Email 1 (High Volume angle)
**Subject options:**
1) Keeping up with {{business_name}} review volume
2) Replying to reviews in under 12 hours
3) Operational fix for review backlog

Body:
Hi {{first_name}},

{{business_name}} has strong review activity ({{review_count}} reviews). Most teams fall behind when volume is high—especially across busy weeks.

We provide an AI-assisted workflow that drafts responses in your voice, routes negatives for escalation, and keeps your response rate high (which can influence conversion from Maps). You approve before posting.

Free for 7 days: we’ll keep you caught up + share weekly KPIs.

Open to trying it this week?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 4.4 Follow-up 1 (2 days later)
Subject: Re: {{business_name}} reviews

Hi {{first_name}},

Quick follow-up—happy to set this up as a **7-day free trial**. The simplest start is:
1) you tell us your preferred tone (formal/friendly/short)
2) we draft replies within 12 hours
3) you approve (or we hold posts if you prefer)

Worth a 10-minute setup this week?

— Bob
agent_bob_replit+review-bot@agentmail.to

### 4.5 Follow-up 2 (5–7 days later)
Subject: Close the loop?

Hi {{first_name}},

Should I close the loop on this, or is review response help something you’ll revisit later?

If you want, I can send 2–3 example replies in your brand voice based on your recent reviews.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 5) Agency / Reseller Lane (separate list + email)
**Targets:** local SEO agencies, web agencies, PPC shops serving dentists/med spas/home services.

**Agency Email 1**
Subject: White-label review response for your clients

Hi {{first_name}},

Do you support local clients who struggle to respond to Google/Yelp reviews?

We offer an **AI Review Reply & Reputation Autopilot** you can white-label (or resell) that drafts brand-safe replies, escalates negatives, and sends weekly reputation KPIs. It’s lightweight to implement and reduces client churn.

We’re running a **free 7-day trial** for agencies this week. Want to pilot with 1 client?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 6) Daily Sending Ops (14-day ramp, $0 tools)
**Tooling (free path):**
- 1 inbox (existing) + Google Sheet tracker + manual sending (or Gmail templates).
- Track opens/clicks later; week 1 focus is replies + meetings.

**Ramp (per inbox):**
- Days 1–2: 20/day
- Days 3–4: 30/day
- Days 5–7: 40/day
- Days 8–10: 50/day
- Days 11–14: 60/day (only if bounce rate < 3%)

**Stop rules:**
- Bounce rate > 5% in a day → stop, fix list.
- Any spam complaints → pause, tighten targeting + copy.

**Daily checklist (60–90 min):**
1) Pull 20–60 leads from sheet (Priority A first)
2) Add 1 personalization line (review snippet + response gap)
3) Send Email 1
4) Log into CRM sheet: Sent date + template + segment
5) Handle replies same day (SLA: <4 business hours)
6) Queue follow-ups (Day 2 and Day 5)

## 7) CRM Stages (simple, in Sheets)
**Stages + entry/exit criteria:**
1) **Prospect** (lead exists, not contacted)
2) **Sent** (Email 1 sent)
3) **Replied** (any response)
4) **Qualified** (has GBP access path + confirms pain)
5) **Demo Booked** (calendar time set)
6) **Trial Active (Free)** (7-day trial started)
7) **Paid** (post-week-1)
8) **Lost** (explicit no / no response after sequence)

**Core KPIs (track weekly):**
- Reply rate (goal: 5–10% early)
- Positive reply rate (goal: 2–4%)
- Meetings booked (goal: 5+/week once volume ramps)
- Trial starts (goal: 3+/week)

---
## Immediate next action needed
Reply with your chosen geography scope (Top 25 metros / 5–10 states / US-wide). Once selected, you can start building the first 200 leads today using the template above and begin sending on the same day.