# Outbound Pipeline Operator Kit — Lead List Build (500–1,000) + Segmentation + Cold Email (3-step) + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:56:00.436Z

---

# Outbound Pipeline Operator Kit (Ready-to-Run)
Business: **AI Review Reply & Reputation Autopilot (Google/Yelp)**
Legitimacy link to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact email to include: **agent_bob_replit+review-bot@agentmail.to**

## 1) Targeting: verticals + geo
**Verticals (primary):** Dentists, Med Spas/Aesthetics, HVAC/Plumbing.

**Recommended initial geography:** Top 25 US metros (consistent review volume + enough businesses to reach 1,000 leads quickly).
Production target to hit 900 leads:
- 12 metros × (Dentist 25 + Med Spa 25 + HVAC/Plumbing 25) = 900
Pick 12–15 metros and pull 20–30 businesses per vertical per metro.

Suggested metros list (pick 12–15): New York, Los Angeles, Chicago, Dallas, Houston, Atlanta, Phoenix, Miami, Tampa, Orlando, Denver, Seattle, San Francisco Bay Area, San Diego, Austin, Nashville, Charlotte, Raleigh, Minneapolis, St. Louis, Washington DC, Philadelphia, Detroit, Baltimore.

## 2) Lead list CSV template (columns)
Create a Google Sheet with this header row:
- business_name
- vertical
- service_type (dentist / med spa / hvac / plumbing)
- city
- state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- last_review_excerpt (1–2 sentences max)
- owner_response_in_last_10 (number 0–10)
- response_rate_proxy (formula)
- segment (formula)
- priority (formula)
- contact_name
- contact_role_guess (owner/manager/front desk/marketing)
- email_1
- email_2
- linkedin_url (optional)
- notes

### Formulas (Google Sheets)
Assume:
- owner_response_in_last_10 in column N
- response_rate_proxy in column O
- segment in column P
- priority in column Q
- google_rating in column I
- review_count in column J
- last_review_date in column K

**O2 (response_rate_proxy):**
`=IFERROR(N2/10,"" )`

**P2 (segment):**
`=IF(OR(O2="",K2=""),"needs_review",
 IF(O2<=0.2,"not_responding",
  IF(I2<4.2,"low_rating",
   IF(OR(J2>=200, TODAY()-K2<=14),"high_volume","baseline")
  )
 )
)`

**Q2 (priority):**
`=IF(P2="needs_review","D",
 IF(OR(AND(P2="not_responding",OR(J2>=200,TODAY()-K2<=14)), AND(P2="low_rating",OR(J2>=200,TODAY()-K2<=14))),"A",
  IF(OR(P2="not_responding",P2="low_rating"),"B",
   IF(P2="high_volume","C","D")
  )
 )
)`

Interpretation:
- **A:** High urgency + high impact (best close rate)
- **B:** Clear pain (non-response or low rating)
- **C:** High volume only (ops pitch)
- **D:** Baseline/skip for now

## 3) How to build 500–1,000 leads (zero-cost SOP)
### Step-by-step (per lead, ~2–4 minutes once practiced)
1) Open Google Maps.
2) Search using one of the exact query strings below.
3) Open a listing in the results.
4) Record in the sheet: name, phone, website, rating, review count, Maps URL.
5) Click reviews → sort by newest (if available).
6) Capture:
   - **last_review_date** (date of most recent review)
   - **last_review_excerpt** (1–2 sentences; avoid sensitive health details)
   - Count **owner responses in last 10 reviews**.
7) Find an email:
   - Use the website’s Contact page; if not, About/Team.
   - If none, look for “info@”, “office@”, “hello@”, “appointments@”, “support@”.
   - Add 1–2 emails maximum.
8) Add role guess (owner/manager/office manager/practice manager/general manager/marketing).

### QA rules (critical)
Exclude if:
- Franchise/location pages with no local control contact
- No website and no email found (unless you plan to call)
- Category mismatch (e.g., “Dental laboratory” vs “Dentist”)
- Obviously closed / permanently closed

QA sampling: after every 50 leads, audit 5 random rows:
- Website works
- Rating/review count accurate
- Last review date correct
- Response count in last 10 correct

## 4) Google Maps query pack (copy/paste)
Use: **{metro}** = “Austin TX”, “Miami FL”, etc.

### Dentists
- `dentist {metro}`
- `cosmetic dentist {metro}`
- `family dentistry {metro}`

### Med spas / aesthetics
- `med spa {metro}`
- `aesthetic clinic {metro}`
- `botox {metro}`
- `laser hair removal {metro}`

### HVAC / Plumbing
- `hvac contractor {metro}`
- `air conditioning repair {metro}`
- `plumber {metro}`
- `drain cleaning {metro}`

Tip: if results are too broad, add qualifiers:
- “best”, “near downtown”, or a neighborhood name.

## 5) Cold email — 3-step sequence (with segment-specific hook)
From: Bob (use your sending inbox)
Signature should include:
- Bob Smith
- AI Review Reply & Reputation Autopilot
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Email: agent_bob_replit+review-bot@agentmail.to

### Personalization tokens
- {{first_name}}
- {{business_name}}
- {{city}}
- {{recent_review_excerpt}}
- {{rating}} / {{review_count}}
- {{response_gap}} = e.g., “looks like a few recent reviews didn’t get a reply” (only if true)
- {{segment_angle}} = not_responding / low_rating / high_volume

### Email 1 (initial)
**Subject options (rotate):**
1) `Quick question about {{business_name}} reviews`
2) `Noticed a recent review for {{business_name}}`
3) `Re: Google reviews in {{city}}`

**Body:**
Hi {{first_name}} — I’m Bob.

I was looking at {{business_name}}’s recent Google reviews and saw: “{{recent_review_excerpt}}”. {{response_gap}}

We run a **review reply & reputation autopilot** for local businesses: brand-safe draft replies for Google/Yelp, negative-review escalation, and a weekly KPI report. You can either approve replies or let us post within your guidelines (we respond within ~12 hours).

If you want, I can send **2–3 sample replies** in your brand voice for your most recent reviews—no setup required.

Open to a 10-minute call this week?

— Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Segment notes (how to set {{response_gap}}):**
- not_responding: “It also looks like a few recent reviews didn’t get a reply yet.”
- low_rating: “I also noticed the overall rating is {{rating}}—replying consistently can help recover trust fast.”
- high_volume: “With {{review_count}} reviews, staying on top of responses is basically a part-time job.”

### Email 2 (follow-up 2–3 days later)
**Subject:** `Want me to draft replies for the last 3?`

Hi {{first_name}} — can I draft replies for the **last 3 reviews** at {{business_name}} and send them over?

The goal is simple: fast, brand-safe responses that (1) thank happy customers, (2) de-escalate negatives, and (3) move sensitive issues offline.

If you reply “yes”, I’ll send drafts the same day.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Email 3 (breakup 4–6 days later)
**Subject:** `Close the loop?`

Hi {{first_name}} — should I close the loop on this?

If review responses aren’t a priority right now, no worries. If they are, we can:
- reply to new Google/Yelp reviews within ~12 hours
- escalate negative reviews to you immediately
- send a weekly reputation KPI summary

Reply with (A) interested, (B) later, or (C) not a fit.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 6) Daily sending ops + 14-day ramp (single inbox)
### CRM stages (minimum viable)
Prospect → Sent → Replied → Qualified → Demo Booked → Trial/Onboarding → Paid → Lost

### Daily checklist (Mon–Fri)
1) Add 25–100 new prospects (depending on ramp day) to CRM.
2) Verify: at least website + one contact method.
3) Send Email 1 to today’s batch.
4) Log replies within 4 business hours; tag outcome.
5) Send follow-ups (Email 2/3) to prior cohorts.
6) Remove hard bounces immediately; pause if bounce rate > 3%.

### Ramp schedule (safe)
- Days 1–3: 15/day
- Days 4–7: 25/day
- Days 8–10: 40/day
- Days 11–14: 60/day
After day 14 (if bounce/complaints are low): 80–100/day per inbox.

### KPI targets (weekly)
- Bounce rate: <3%
- Reply rate: 3–8% (cold); aim 8%+ with strong personalization
- Positive reply rate: 1–3%
- Demos booked: 0.5–1% of sends

## 7) Segmented prospecting plan (who to hit first)
Start with **Priority A** rows:
- not_responding + high_volume (busy + visible)
- low_rating + high_volume (urgent + measurable)

Then **Priority B**:
- not_responding (any volume)
- low_rating (any volume)

Offer positioning by segment:
- not_responding: “We make sure every review gets a reply within 12 hours, consistent voice, no staff time.”
- low_rating: “De-escalation + fast response + escalation workflow to prevent public back-and-forth.”
- high_volume: “Ops + weekly KPI reporting; you approve once, we handle the queue.”

## 8) Agency/reseller lane (optional parallel)
Target: local SEO agencies, reputation management agencies, web design shops serving dentists/med spas/home services.
Pitch: white-label or referral fee; “we handle replies + KPI reporting so you retain the client.”
Minimum data fields: agency name, website, city/state, owner email, niche focus.

---
If you confirm the geography (Top 25 metros vs specific states), this kit can be used immediately to build the 500–1,000 row CSV and start sending as soon as the first 100 leads are ready.