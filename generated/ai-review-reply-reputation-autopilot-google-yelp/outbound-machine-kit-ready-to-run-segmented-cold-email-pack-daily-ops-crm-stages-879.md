# Outbound Machine Kit (Ready-to-Run) — Segmented Cold Email Pack + Daily Ops + CRM Stages (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:14:04.024Z

---

# AI Review Reply & Reputation Autopilot — Outbound Machine Kit
Website to reference in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact email to reference: agent_bob_replit+review-bot@agentmail.to

## 1) ICP + Segmentation (what to target)
**Verticals (start with these 3):**
1) Dentists / dental clinics
2) Med spas / aesthetics / cosmetic clinics
3) HVAC + plumbing (local home services)

**Data to capture per lead (minimum viable for segmentation + personalization):**
- business_name, vertical, city_state, website, phone
- google_maps_url
- google_rating, review_count
- last_review_date
- response_rate_proxy = owner responses in last 10 reviews / 10
- last_review_snippet (1–2 lines) OR paraphrase

**Segments (apply all that match; choose primary):**
- **not_responding:** response_rate_proxy ≤ 0.2 OR 0 owner replies in last 10 reviews
- **low_rating:** google_rating < 4.2
- **high_volume:** review_count ≥ 200 OR last_review_date within last 14 days

**Priority scoring (for send order):**
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only

**Template routing (which email variant to use):**
- not_responding → “Response gap” angle
- low_rating → “Service recovery + escalation” angle
- high_volume → “Ops throughput + 12-hour SLA” angle


## 2) Cold Email Pack — Direct to Local Businesses
**Personalization tokens (copy/paste into your sending tool):**
- {{first_name}} (if unknown: “there”)
- {{business_name}}
- {{city}}
- {{vertical}}
- {{recent_review_snippet}} (quote or paraphrase)
- {{last_review_date}}
- {{rating}} / {{review_count}}
- {{response_gap}} (e.g., “looks like many recent reviews don’t have an owner response yet”)

### 2.1 Email #1 (Initial) — NOT RESPONDING variant (all verticals)
**Subject options (pick 1):**
- Quick idea re: your Google reviews
- Noticed a response gap on {{business_name}}
- Re: replying to reviews (without more work)

**Body:**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw this recent note: “{{recent_review_snippet}}” ({{last_review_date}}). It also looks like {{response_gap}}.

We run an **AI Review Reply & Reputation Autopilot** for local businesses: we draft brand-safe responses for Google Business Profile + Yelp, **escalate negatives**, and send a weekly KPI email (rating trend, response rate, new review volume). You can **approve** replies (or let us auto-post within your rules). We aim to respond within **12 hours**.

If I sent 3 draft responses for your next few reviews (free), would you want to see them?

– Bob
{{website_url}}
Reply here: agent_bob_replit+review-bot@agentmail.to


### 2.2 Email #1 (Initial) — LOW RATING variant
**Subject options:**
- Quick fix for reputation leakage
- 4.1 → 4.5 plan for {{business_name}}
- Helping recover from negative reviews

**Body:**
Hi {{first_name}},

I noticed {{business_name}} has strong review volume ({{review_count}}) but the rating is around {{rating}}. One recent review said: “{{recent_review_snippet}}”.

We help businesses **recover rating over time** by responding fast, consistently, and safely: draft replies for Google + Yelp, **flag urgent negatives** for escalation, and track weekly KPIs so you can see whether the changes are working.

Would it be crazy if I mocked up 2–3 response drafts (including one for a negative) in your brand voice so you can judge quality?

– Bob
{{website_url}}
agent_bob_replit+review-bot@agentmail.to


### 2.3 Email #1 (Initial) — HIGH VOLUME variant
**Subject options:**
- Keeping up with review volume at {{business_name}}
- 12-hour review replies (Google + Yelp)
- Review ops help (without hiring)

**Body:**
Hi {{first_name}},

{{business_name}} gets a lot of reviews ({{review_count}}) and it looks like new ones are coming in regularly.

We provide a **review reply autopilot**: drafts brand-safe responses for Google + Yelp, routes negatives for escalation, and reports weekly KPIs. You can approve replies or set guardrails for auto-posting.

Open to a 10-minute look at how we’d handle your next 5 reviews? I can send examples first.

– Bob
{{website_url}}
agent_bob_replit+review-bot@agentmail.to


### 2.4 Follow-Up #1 (2–3 business days later) — same thread
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}},

Quick bump — happy to send a **free sample pack**: 3 draft responses based on your recent reviews + a suggested escalation rule for negatives.

Worth sending?

– Bob
{{website_url}}
agent_bob_replit+review-bot@agentmail.to


### 2.5 Follow-Up #2 (5–7 business days later) — same thread
**Subject:** Last try

Hi {{first_name}},

Last note from me. If review replies aren’t a priority, no worries.

If they are: we respond within **12 hours**, keep replies brand-safe, and give you weekly KPIs so you can see impact.

Should I send sample drafts for {{business_name}} or close the loop?

– Bob
{{website_url}}
agent_bob_replit+review-bot@agentmail.to


## 3) Vertical Micro-Tweaks (add 1 line in Email #1)
Use ONE add-on line to make it feel industry-specific:

**Dental add-on:**
- “Many practices use review responsiveness to lift call volume and case acceptance — especially for cosmetic/implant work.”

**Med spa add-on:**
- “For aesthetics, fast responses reduce price-shopping and help convert IG/SEO traffic into booked consults.”

**HVAC/Plumbing add-on:**
- “For home services, review responses influence ‘near me’ rankings and who gets the first call when pipes burst.”


## 4) Agency/Reseller Lane (sell to marketers who manage many local SMBs)
### Agency Email #1
**Subject options:**
- White-label review replies for your clients
- Add-on service: Google/Yelp responses in 12 hours
- Quick partnership idea

**Body:**
Hi {{first_name}},

Noticed your agency works with local businesses. We offer a white-label friendly **AI Review Reply & Reputation Autopilot** for Google Business Profile + Yelp: brand-safe draft replies, negative-review escalation, and weekly KPI reporting.

Agencies use this to:
- increase retention (“we handle reputation ops”) 
- upsell a measurable add-on (response rate + rating trend)
- avoid junior staff writing risky replies

If you tell me your top client vertical (dental/med spa/home services), I’ll send example responses + a simple reseller margin structure.

– Bob
{{website_url}}
agent_bob_replit+review-bot@agentmail.to

### Agency Follow-Up #1
Hi {{first_name}},

Do you have 5 minutes this week to see what the weekly KPI report looks like + how approvals/guardrails work?

– Bob
{{website_url}}


## 5) Daily Sending Ops (14-day ramp + rules)
**Goal:** get to 50–100 cold emails/day/inbox safely, while maintaining low bounces and high deliverability.

### 5.1 List QA rules (before any send)
- Verify business is truly in the target vertical (avoid unrelated categories)
- Must have Google rating + review count + last review date
- Pull last 10 reviews to compute response_rate_proxy
- Capture a safe personalization snippet (quote short) or paraphrase (safer)
- Avoid obvious chains/franchises in early days (more red tape)

### 5.2 Ramp schedule (per inbox)
- Days 1–2: 10/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Days 8–10: 40/day
- Days 11–14: 50/day
(Scale only if bounce <3% and spam complaints ~0)

### 5.3 Bounce/complaint thresholds
- If bounces > 3% in any 24h: pause sending, re-check list quality, remove risky domains
- If any spam complaint: pause, reduce volume, adjust copy, remove aggressive personalization

### 5.4 Reply handling SLA
- Respond to positive interest within 1–2 hours during business day
- For “not now”: ask permission to follow up in 60 days
- For “who are you?”: reply with website + short explanation + offer sample drafts


## 6) CRM Stages (simple pipeline)
1) **Prospect** (in sheet/CRM; segmented + priority assigned)
2) **Sent** (Email #1 sent)
3) **Replied** (any reply)
4) **Qualified** (has GBP/Yelp + has review flow + decision maker engaged)
5) **Demo Booked** (time scheduled)
6) **Trial / Sample Delivered** (sent 3 draft responses + escalation rules)
7) **Paid** (subscription active)
8) **Lost** (reason tagged: no need / in-house / agency competitor / wrong contact)


## 7) Daily activity targets (starter)
- 50 new sends/day total (split across Priority A then B)
- 20 follow-ups/day (FU1/FU2)
- 10 agency emails/day (parallel lane)
- 15 minutes/day: update CRM + tag outcomes


## 8) Lead List Build Instructions (zero-cost)
Until a paid scraper is approved, build leads via Google Maps manually or via a VA:
1) Choose geography (Top 25 metros recommended)
2) Search queries like:
   - “dentist {{metro}}”, “cosmetic dentist {{metro}}”
   - “med spa {{metro}}”, “aesthetic clinic {{metro}}”
   - “HVAC contractor {{metro}}”, “plumber {{metro}}”
3) For each listing, capture rating, review count, last review date, last 10 reviews response count, and a short snippet
4) Find email via website contact page (and/or public socials). If none, keep phone + contact form URL.

If you confirm geography, this becomes a repeatable production line to reach 500–1,000 leads.
