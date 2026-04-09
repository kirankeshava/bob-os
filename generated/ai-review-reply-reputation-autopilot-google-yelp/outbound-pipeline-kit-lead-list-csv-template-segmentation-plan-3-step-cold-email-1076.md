# Outbound Pipeline Kit — Lead List CSV Template + Segmentation Plan + 3-Step Cold Emails + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:47:07.059Z

---

# 1) Targeting + List-Build Plan (500–1,000 leads)

## Default geography (recommended for first batch)
**Top 25 US metros** (enough density, consistent categories, high review velocity):
NYC, LA, Chicago, Houston, Phoenix, Philly, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, SF, Indianapolis, Seattle, Denver, DC, Nashville, OKC, El Paso, Boston, Portland.

## Volume plan
- **Dentists:** 300 (12–15 per metro x 20 metros)
- **Med spas / aesthetics:** 300
- **HVAC/Plumbing:** 300
- **Agencies (optional parallel lane):** 100–150
Total: **900–1,050** prospects.

## High-intent segments (what to prioritize)
You’ll tag each lead into one primary segment:
- **NOT_RESPONDING:** owner responses in last 10 reviews ≤ 2 (≤20%) OR no visible replies recently.
- **LOW_RATING:** Google rating < 4.2.
- **HIGH_VOLUME:** review_count ≥ 200 OR last_review_date within last 14 days.

## Priority scoring (for send order)
- **Priority A:** (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- **Priority B:** NOT_RESPONDING OR LOW_RATING
- **Priority C:** HIGH_VOLUME only
Send order: **A → B → C**.

## Google Maps query pack (copy/paste)
Run per metro (swap the city):
- Dentist: `dentist in {CITY}` / `cosmetic dentist in {CITY}` / `dental clinic in {CITY}`
- Med spa: `med spa in {CITY}` / `aesthetic clinic in {CITY}` / `botox in {CITY}`
- Home services: `hvac in {CITY}` / `plumber in {CITY}` / `air conditioning repair in {CITY}`

Agency lane queries:
- `dental marketing agency {CITY}`
- `med spa marketing agency {CITY}`
- `hvac marketing agency {CITY}`
- `local seo agency {CITY}`


# 2) Lead List CSV Template (copy header row)

Paste this header row into Google Sheets, then export CSV.

```
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,owner_reply_present_last10,owner_reply_count_last10,response_rate_proxy,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_hook,notes
```

## How to fill key fields fast (free workflow)
- **google_rating / review_count:** from Google Business Profile panel.
- **last_review_date + last_review_excerpt:** open “Reviews” → sort by newest.
- **owner_reply_count_last10:** count responses in the newest 10 reviews.
- **response_rate_proxy:** `owner_reply_count_last10/10` (example: 1 reply → 0.10).
- **segment:** use rules above.
- **priority_tier:** A/B/C using rules above.
- **emails:** website contact page, footer, staff page; if none, use contact form URL in notes and leave email blank (still usable for agency lane + phone fallback).
- **personalization_hook:** 1 short sentence referencing a *safe* snippet (avoid sensitive health details; paraphrase if needed).


# 3) Cold Email Sequences (3-step) — Direct-to-Local

**Important:** Always include legitimacy references:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

### Token legend
- {{first_name}} / {{business_name}} / {{city}}
- {{recent_review_snippet}} (or paraphrase)
- {{response_gap}} (e.g., “I didn’t see an owner response yet.”)
- {{vertical_phrase}} (dentist / med spa / HVAC & plumbing)


## 3A) Variant: NOT_RESPONDING (works across all verticals)

### Email 1 (Initial)
**Subject options:**
1) Quick question about your Google reviews
2) Noticed a response gap on {{business_name}}
3) Review replies for {{business_name}}

**Body:**
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed a recent one: “{{recent_review_snippet}}”. {{response_gap}}

We run a small **AI review reply & reputation autopilot** for local businesses. It drafts **brand-safe** replies to Google (and Yelp), escalates negative reviews, and sends a weekly KPI report. You can **approve replies before posting**, or we can run on pre-approved guidelines.

If I send 2–3 sample replies in your tone for your latest reviews, would you like to see them?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Email 2 (Follow-up #1, +2–3 days)
**Subject:** Re: reviews for {{business_name}}

Just bumping this — most owners I talk to want replies going out within **12 hours**, but reviews pile up fast.

If you’re open to it, I’ll:
1) draft replies for your 5 most recent reviews,
2) match your brand voice,
3) flag anything negative for escalation.

Worth a quick look? (Just reply “yes” and I’ll send drafts.)

– Bob

### Email 3 (Follow-up #2, +5–7 days)
**Subject:** Should I close the loop?

Should I close the loop on this, or is someone already managing review replies at {{business_name}}?

If it’s helpful, I can also share a simple weekly reputation snapshot (rating trend + response rate proxy) for free.

– Bob
agent_bob_replit+review-bot@agentmail.to


## 3B) Variant: LOW_RATING (de-escalation + recovery)

### Email 1
**Subject options:**
1) Quick idea to lift rating (without begging)
2) Review recovery for {{business_name}}
3) About your recent Google reviews

**Body:**
Hi {{first_name}} — I noticed {{business_name}} has a few tough reviews recently (example: “{{recent_review_snippet}}”).

We help local businesses respond in a **brand-safe, non-defensive** way and escalate issues fast so you can recover trust. Our autopilot drafts replies for Google/Yelp, flags negative reviews, and reports weekly KPIs (rating trend, response rate, unresolved issues).

Would it be crazy if I drafted a reply to that review (plus 2 more) for you to approve? No obligation.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

### Email 2
If you’re already working on improvements internally, totally get it.

Where this helps is consistency: every review gets a reply that’s calm, compliant, and points the customer toward resolution — which usually improves conversion from “browsing” to “booking.”

Want me to send sample replies?

– Bob

### Email 3
Last ping — if you tell me who handles reputation at {{business_name}}, I’ll reach out to the right person.

– Bob


## 3C) Variant: HIGH_VOLUME (ops + throughput)

### Email 1
**Subject options:**
1) Handling review volume at {{business_name}}
2) Quick fix for review reply backlog
3) Review ops for {{business_name}}

**Body:**
Hi {{first_name}} — {{business_name}} gets a lot of reviews (nice problem). I saw a recent one: “{{recent_review_snippet}}”.

When volume is high, the win is simple: **reply fast, consistently, in brand voice**. We run an AI-driven workflow that drafts and posts Google/Yelp replies, escalates negative reviews, and gives a weekly KPI report. You can require approval, or we run on a playbook.

If I can get you to “reply within 12 hours” without adding work to your team, is it worth a 10-minute call?

– Bob
agent_bob_replit+review-bot@agentmail.to

### Follow-ups
Use the NOT_RESPONDING follow-up #1 and #2 (they work well here too).


# 4) Cold Email — Agency/Reseller Lane (sell in bulk)

### Email 1
**Subject options:**
1) White-label review replies for your clients?
2) Add-on for your local SEO clients
3) Quick partnership idea

**Body:**
Hi {{first_name}} — saw you work with {{vertical_phrase}} / local businesses.

We built a lightweight **review reply & reputation autopilot** (Google + Yelp): brand-safe drafted replies, negative-review escalation, and a weekly KPI report. Agencies use it as a **retainer add-on** (done-for-you reputation ops) without hiring.

If I send pricing and a sample report, are you open to a quick chat about white-label/resell?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Follow-up #1
If you already offer reputation management, this usually plugs the “reply execution” gap (fast, consistent responses + escalation).

Open to seeing a demo workflow?

– Bob


# 5) Daily Sending Ops + CRM Stages

## Tooling (free-first)
- Draft + send: Gmail/Google Workspace (if you have it). If not, start with 1 inbox and low volume.
- CRM: Google Sheet or free HubSpot.
- Tracking: avoid heavy tracking early (links/pixels can hurt deliverability). Use plain text.

## 14-day ramp (per inbox)
- Days 1–2: 20/day (manual, high personalization)
- Days 3–4: 30/day
- Days 5–7: 40/day
- Week 2: 50–80/day
After stable replies + low bounces: add a second inbox/domain and scale.

## Daily activity targets (starting point)
- New sends: **50/day** (Priority A first)
- Follow-ups: **25/day**
- Agency lane: **10/day**
- Reply handling: within **4 business hours**

## List hygiene rules
- Hard bounce > 3% in a day: stop sending, audit list.
- Complaint/unsub > 0.3%: tighten targeting and reduce volume.
- Always include a simple opt-out line: “If you’re not the right person, tell me who is — or reply ‘no’ and I won’t follow up.”

## CRM stages (simple)
1) **Prospect (Queued)** — lead collected + segmented
2) **Sent (E1)** — initial email sent
3) **Follow-up (E2/E3)** — scheduled follow-ups
4) **Replied** — any reply
5) **Qualified** — has Google/Yelp access, wants faster replies, or has rating issue
6) **Demo Booked**
7) **Trial/Proof** — you deliver sample replies or connect accounts
8) **Paid**
9) **Lost** — no fit / no response after 3 touches

## Reply-handling playbook
- Positive interest: offer 10-min call + ask for preferred tone (friendly/formal), approval mode, and whether they want Google only or Google+Yelp.
- “We already do this”: ask if they want faster SLA + weekly KPI report; position as ops automation.
- Objection “AI risk”: emphasize brand-safe rules, approval option, and escalation for negatives.

---
If you want, I can also format the CSV template as a Google Sheets with built-in formulas (segment + priority auto-populated) once you confirm the exact fields you’ll reliably capture during collection.
