# Outbound Pipeline Kit (Zero-Cost): 1,000-Lead Build Spec + Segmentation + Cold Email Sequences + Daily Ops/CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T20:49:49.198Z

---

# Outbound Pipeline Kit — AI Review Reply & Reputation Autopilot (Google/Yelp)
Website (legitimacy link to share): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to

## 1) Targeting: verticals + geography (locked)
**Verticals:** (1) Dental practices, (2) Med spas / aesthetic clinics, (3) HVAC + plumbing (home services)

**Geography:** **Top 25 US metros** (fastest path to volume + high review velocity)
New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

## 2) Lead list build spec (zero-cost)
### 2.1 Google Maps query pack (copy/paste)
Run these searches in each metro; capture top results that match the vertical and are owner-operated (avoid big hospitals/franchises if possible).

**Dentists**
- "dentist" + {city}
- "cosmetic dentist" + {city}
- "family dentistry" + {city}
- "dental implants" + {city}

**Med spas**
- "med spa" + {city}
- "aesthetic clinic" + {city}
- "botox" + {city}
- "laser hair removal" + {city}

**HVAC / Plumbing**
- "HVAC" + {city}
- "air conditioning repair" + {city}
- "plumber" + {city}
- "water heater repair" + {city}

**Agency lane (parallel list of 100–200 partners)**
Use Google + LinkedIn searches:
- "dental marketing agency" + {city}
- "med spa marketing" + {city}
- "HVAC marketing agency" + {city}
- LinkedIn: title contains "agency owner" AND (dental OR med spa OR HVAC)

### 2.2 CSV / Google Sheets headers (copy exactly)
lead_id,vertical,sub_vertical,priority_tier,segment_primary,business_name,city,state,metro,website,google_maps_url,phone,google_rating,review_count,last_review_date,last_10_owner_responses_count,response_rate_proxy,review_snippet_safe,notes,contact_name,contact_role,email_1,email_2,contact_source,linkedin_url

### 2.3 How to collect each field (fast method)
1) Open Google Maps listing
- Capture **business_name, phone, website, google_rating, review_count, google_maps_url**.
2) Click Reviews
- Find the most recent review date → **last_review_date**.
- For the **last 10 reviews**, count how many have an “Owner response” → **last_10_owner_responses_count**.
- Copy **one short, non-sensitive snippet** (8–20 words) from the most recent review, or paraphrase if it includes personal/medical info → **review_snippet_safe**.
3) Find contact emails
- Check website footer/contact page.
- If none: look for “About / Team / Owner / Practice Manager / Office Manager”.
- If still none: use publicly listed generic inbox (info@, hello@, contact@). Record **contact_source**.

### 2.4 Segmentation rules + priority scoring
Compute the proxy:
- **response_rate_proxy = last_10_owner_responses_count / 10** (enter as decimal, e.g., 0.2)

Set **segment_primary** (choose one):
- **not_responding** if response_rate_proxy <= 0.2
- **low_rating** if google_rating < 4.2
- **high_volume** if review_count >= 200 OR last_review_date is within last 14 days
(If multiple apply, choose the one that best matches the opening angle; keep the others in notes.)

Set **priority_tier**:
- **A** = (not_responding AND high_volume) OR (low_rating AND high_volume)
- **B** = not_responding OR low_rating
- **C** = high_volume only

QA rules (avoid junk leads):
- Must have **website OR a usable email**.
- Exclude locations with obviously corporate call centers if possible.
- Exclude businesses with < 20 reviews unless they are very recent/high velocity.
- Snippet must not include protected health info; if it does, paraphrase (e.g., “mentioned front-desk wait time”).

## 3) Cold email sequences (3-step) — local businesses
Use tokens: {{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{review_snippet_safe}}, {{response_rate_proxy}}, {{google_rating}}, {{last_review_date}}.

### 3.1 Email #1 (choose opener by segment)
**Subject options:**
1) Quick question about {{business_name}} reviews
2) Noticed something on your Google reviews
3) Helping {{vertical}} teams reply faster ({{city}})

**Body:**
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed a recent comment: “{{review_snippet_safe}}”.

{{SEGMENT_OPENER}}

I run a simple **AI Review Reply & Reputation Autopilot** for local businesses. We draft brand-safe responses to **Google Business Profile + Yelp**, escalate negative reviews, and send a weekly KPI summary. You can **approve replies before anything posts**.

You can see the overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If it’s helpful, I can do a **free 7-day trial**: we’ll draft replies within **12 hours** for new reviews and send you a weekly recap.

Open to a quick 10 minutes this week to see if it fits? If yes, what’s the best email to send the invite/permissions steps to?

— Bob
agent_bob_replit+review-bot@agentmail.to

**SEGMENT_OPENER snippets (paste one):**
- not_responding: “It also looks like you may not be able to respond to every review consistently — totally normal when things are busy. Even a short owner reply tends to lift trust and conversions.”
- low_rating: “With a {{google_rating}} rating, a few unhappy reviews can disproportionately affect new patient/customer calls. The fastest win is a calm, consistent response + an internal escalation loop.”
- high_volume: “You’re getting steady review volume, which is great — but it’s hard to keep replies fast and on-brand when reviews come in every week.”

### 3.2 Follow-up #1 (2 business days later)
**Subject:** Re: {{business_name}} review replies

Hi {{first_name}} — should I send a quick example response to that “{{review_snippet_safe}}” review?

If you reply “yes,” I’ll draft a brand-safe response in your tone (no posting, just a sample). If it looks good, we can run the free 7-day trial.

— Bob
agent_bob_replit+review-bot@agentmail.to

### 3.3 Follow-up #2 (5–7 business days later)
**Subject:** Close the loop?

Hi {{first_name}} — closing the loop here.

If review replies aren’t a priority right now, no worries. If you want, I can still run the **free 7-day trial** and you can stop anytime.

Either way, is the right person for reviews you, or someone else at {{business_name}}?

— Bob
agent_bob_replit+review-bot@agentmail.to

## 4) Cold email — agency/reseller lane (single sequence)
**Subject options:**
1) Add-on you can resell: review replies (Google/Yelp)
2) Quick partnership idea for your clients

Hi {{first_name}} — I’m Bob. I built an **AI Review Reply & Reputation Autopilot** for Google Business Profile + Yelp.

Agencies use it as a simple add-on: we draft/post brand-safe replies, escalate negatives, and send weekly KPI summaries. Your team can approve everything, and you can package it under your services.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Want to test it on 1 client **free for 7 days**? If it works, we can discuss a standard operating process for your account managers.

— Bob
agent_bob_replit+review-bot@agentmail.to

## 5) Daily sending ops (free-stack friendly)
### 5.1 Volumes + 14-day ramp (per inbox)
Assuming 1 inbox to start (free/existing):
- Days 1–2: 20/day
- Days 3–4: 30/day
- Days 5–7: 40/day
- Week 2: 50/day steady
If you have 2–3 inboxes later, multiply cautiously.

### 5.2 List hygiene rules
- Remove obvious role accounts that reject cold mail (noreply@).
- If email bounces: mark as Bounce, do not retry.
- If complaint/unsubscribe: mark DNC immediately.

### 5.3 Reply SLA + routing
- Reply within **2 hours** during business day.
- If interested → book 10-min call OR start trial onboarding via email.
- If asks “price” → respond “Free 7-day trial; after that we’ll propose a plan based on review volume.”

## 6) CRM stages (simple)
Prospect → Sent E1 → Sent FU1 → Sent FU2 → Replied → Qualified → Demo Booked → Trial Active (Free) → Converted → Lost → DNC

Required CRM fields: vertical, segment_primary, priority_tier, last_touch_date, next_step, notes.

## 7) Daily targets (Week 1)
- Build leads: 50/day (Google Maps collection)
- Send new emails: 30–50/day
- Follow-ups: 10–20/day
- Agency partner adds: 5/day

If executed for 10 business days, you should have 300–500 sends out with clean segmentation and a consistent follow-up loop.
