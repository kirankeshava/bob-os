# Outbound Pipeline Runbook (Ready-to-Run): Lead List (500–1,000) + Segmentation + Cold Email + Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:35:51.170Z

---

## 1) Goal + ICP
**Offer:** AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp. Drafts and (optionally) posts brand-safe responses, escalates negative reviews, and sends weekly KPI reports.
**Legitimacy link to include:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
**Contact email to include:** agent_bob_replit+review-bot@agentmail.to

**Target verticals (start with 3):**
1) Dentists / orthodontists
2) Med spas / aesthetic clinics
3) HVAC + plumbers

## 2) Geography (recommended default)
**Recommended for speed + density:** Top 25 US metros (easier to find high review volume + faster list build).
If you prefer states instead: pick **5–10 states** where you can sell/serve confidently.

## 3) Lead list: CSV columns (paste into Google Sheets)
Use these columns exactly (left-to-right):
- business_name
- vertical
- city_state
- metro
- phone
- website
- google_maps_url
- google_rating
- review_count
- last_review_date
- last_10_reviews_owner_responses (0–10)
- response_rate_proxy (formula)
- segment (formula)
- priority (formula)
- owner_or_manager_name
- role_guess
- email_1
- email_2
- personalization_snippet (latest review excerpt OR paraphrase)
- response_gap_note (e.g., “No owner replies in last 10 reviews”)
- notes

### 3.1 Formulas (Google Sheets)
Assume:
- review_count in column I
- google_rating in column H
- last_review_date in column J
- last_10_reviews_owner_responses in column K

**response_rate_proxy (column L):**
=IFERROR(K2/10,0)

**segment (column M):**
=IFS(
  H2<4.2,"low_rating",
  OR(L2<=0.2,K2=0),"not_responding",
  OR(I2>=200, TODAY()-J2<=14),"high_volume",
  TRUE,"other"
)

**priority (column N):**
=IFS(
  AND(M2="not_responding",OR(I2>=200, TODAY()-J2<=14)),"A",
  AND(M2="low_rating",OR(I2>=200, TODAY()-J2<=14)),"A",
  OR(M2="not_responding",M2="low_rating"),"B",
  M2="high_volume","C",
  TRUE,"C"
)

## 4) Zero-cost lead sourcing workflow (Google Maps)
### 4.1 Query pattern (by vertical + metro)
Use Google Maps and search (examples):
- "dentist" + "{metro}" (also try: “cosmetic dentist”, “orthodontist”)
- "med spa" + "{metro}" (also: “aesthetic clinic”, “botox”, “laser hair removal”)
- "HVAC" + "{metro}" and "plumber" + "{metro}"

### 4.2 What to capture per business (2–3 minutes each)
1) **Rating + review count** from the Maps listing.
2) Click reviews → sort by newest → capture **last_review_date** and a **safe snippet**:
   - Prefer paraphrase: “Customer praised staff friendliness + quick appointment”
   - If quoting, keep it short (5–12 words) and never include sensitive/medical details.
3) Compute response proxy: open last ~10 reviews and count **owner responses** (K column).
4) Find email:
   - Check website footer/contact page.
   - If none, use patterns: info@, hello@, contact@ (only if site indicates it’s monitored).
   - Capture 2 emails if available.

### 4.3 Production plan to reach 1,000 leads
- **Day 1–2:** Build 200 leads (validate segmentation mix + template fit).
- **Days 3–7:** Add 100–150/day (owner or VA). 
- **QA sampling:** Every 50 rows, spot-check 5 rows for: correct category, working website, rating/review count present, last review date captured.

## 5) Segmented prospecting plan (who to email first)
**Priority A (send first):**
- Not responding + high volume OR low rating + high volume.
**Angle:** “You’re getting reviews; you’re leaving revenue on the table by not responding quickly/consistently.”

**Priority B:**
- Not responding OR low rating.
**Angle:** “Brand-safe replies, escalation of negatives, weekly KPI report.”

**Priority C:**
- High volume only.
**Angle:** “Operationalize review management so staff doesn’t have to.”

## 6) Cold email copy (3-step) — Master version with tokens
**Personalization tokens:** {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap_note}}, {{vertical}}

### Email 1 (initial)
**Subject options:**
1) {{business_name}} — quick fix for review replies
2) Noticed a review response gap at {{business_name}}
3) 12-hour review replies for {{vertical}} teams

**Body:**
Hi {{first_name}},

I was looking at {{business_name}}’s recent Google reviews in {{city}} — one mentioned “{{recent_review_snippet}}”.

Not sure if it’s you or the team handling replies, but I noticed: {{response_gap_note}}.

We run an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** responses for Google Business Profile + Yelp, **escalates negative reviews**, and sends a **weekly KPI report**. You can keep it “approve-before-post” if you prefer.

If I send 2–3 draft replies based on your latest reviews (free), would you want to see them?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Email 2 (follow-up, 2–3 days later)
**Subject:** Re: {{business_name}} review replies

Hi {{first_name}} — quick follow-up.

Most {{vertical}} owners we talk to want two things:
1) **Respond fast** (same day) without sounding generic
2) **Never miss** a negative review

Would you be open to a 10-minute look at your current reviews and whether “approve-before-post” or “autopilot” makes sense?

— Bob

### Email 3 (final, 4–7 days later)
**Subject:** Should I close the loop?

Hi {{first_name}},

Should I close the loop on this?

If it helps, I can send a one-page summary of:
- current rating + review velocity
- response-rate estimate (last 10 reviews)
- 3 example replies in your brand voice

Reply with “yes” and I’ll send it over, or “later” and I’ll check back next month.

— Bob

## 7) Daily sending ops (no paid tools assumed)
### 7.1 CRM stages (simple pipeline)
Prospect (new) → Ready to Send (has email + personalization) → Sent → Replied → Qualified → Demo Booked → Trial/POC → Paid → Lost (reason)

### 7.2 14-day ramp (per inbox)
- Days 1–2: 10/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Week 2: 40–50/day
Rules: stop/rate-limit if bounce rate >3% in a day or spam complaints >0.

### 7.3 Daily checklist (30–60 minutes)
1) Pull 25–50 Priority A/B leads into “Ready to Send”.
2) Add personalization snippet + response gap note.
3) Send Email 1.
4) Log replies twice/day; respond within **4 business hours**.
5) Queue follow-ups: Email 2 at day 3; Email 3 at day 7 (only if no reply).

### 7.4 Reply handling SLA + routing
- Interested: book demo, ask for GBP/Yelp link access flow.
- Not now: set follow-up date 30–60 days.
- Wrong person: ask “Who handles reviews?” and update contact.
- Angry/negative: apologize, opt-out immediately, mark Lost.

## 8) Notes on compliance + safety
- Don’t paste long review quotes; paraphrase when possible.
- Always include opt-out line if your sending tool supports it (e.g., “Reply ‘no’ and I won’t follow up.”).
- Only email publicly available business contacts.

---
If you confirm geography (Top 25 metros vs states), this runbook becomes a literal checklist for a VA to generate 1,000 segmented leads and for you to start sending the same day.