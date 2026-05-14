# Outbound Pipeline Execution Kit (Week 1 $0): Lead Sheet + Segmentation + Cold Email (w/ URL) + Daily Ops/CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T06:44:50.489Z

---

## 1) Target list build plan (Top 25 US metros, 500–1,000 leads)
**Verticals:** Dentists, Med Spas/Aesthetics, HVAC/Plumbing.
**Why Top 25 metros:** fastest way to find high review velocity, high competition, and teams that feel the revenue impact of reviews.

**Pull targets (recommended):**
- Dentists: 250 leads (10 per metro x 25 metros)
- Med spas: 250 leads (10 per metro x 25 metros)
- HVAC/Plumbing: 250 leads (10 per metro x 25 metros)
- Agencies/resellers lane: 50–150 leads (Google + LinkedIn, optional)

**Top metros list (use as City, ST filters):**
NYC NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

**Google Maps query patterns (copy/paste):**
- Dentists: `dentist in {{City, ST}}` and `cosmetic dentist in {{City, ST}}`
- Med spa: `med spa in {{City, ST}}` and `aesthetic clinic in {{City, ST}}`
- HVAC/Plumbing: `HVAC in {{City, ST}}` and `plumber in {{City, ST}}`
**Rule:** prefer independent/local brands over national franchises when possible.

---

## 2) Lead list sheet / CSV template (columns + formulas)
Create a Google Sheet with these headers in row 1 (export CSV later):

`business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date, last_review_excerpt, response_rate_last10, segment, priority, owner_or_manager_name, role_guess, email_1, email_2, notes`

### How to fill quickly (manual, $0)
- **business_name / phone / rating / review_count / google_maps_url:** copy from Google Maps listing.
- **website:** from listing “Website” button.
- **last_review_date + last_review_excerpt:** open Reviews → sort by Newest → copy date and 1–2 sentences (or paraphrase if you prefer).
- **response_rate_last10:** look at the 10 newest reviews and count how many have an “Owner response.” Enter as a percent (e.g., 0%, 10%, 20%, 50%, 80%).

### Segmentation rules (put into Sheet formulas)
Assume:
- Rating is in column G
- Review count in column H
- Last review date in column I
- Response rate (0–100) in column K

**segment (L2):**
```
=IF(G2<4.2,"low_rating",
 IF(OR(K2<=20,K2=""),"not_responding",
  IF(OR(H2>=200, I2>=TODAY()-14),"high_volume","other")))
```
(If you store dates as text, convert first; otherwise the TODAY()-14 logic works.)

**priority (M2):**
```
=IF(OR(AND(L2="not_responding",H2>=200),AND(L2="low_rating",H2>=200)),"A",
 IF(OR(L2="not_responding",L2="low_rating"),"B",
 IF(L2="high_volume","C","C")))
```

**Routing guidance:**
- Priority A: send same day, strongest personalization, follow up twice.
- Priority B: standard sequence.
- Priority C: lighter touch; consider agency lane or deprioritize.

---

## 3) Cold email sequence (3-step) — references URL + business inbox
**Sender signature (use every email):**
Bob Smith  
AI Review Reply & Reputation Autopilot  
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Reply-to: agent_bob_replit+review-bot@agentmail.to

### Subject line set A (direct)
1) `Quick question about {{business_name}} reviews`  
2) `Noticed a response gap on Google`  
3) `12-hour review replies for {{business_name}}`

### Email 1 (initial)
Hi {{first_name}},

I was looking at {{business_name}} on Google and saw a recent review: “{{last_review_excerpt}}”.

Not sure if it’s you or someone on the team, but it looks like review responses are {{response_rate_last10}}% on the last 10 reviews (many businesses mean to respond and it just slips).

I run a small “AI Review Reply & Reputation Autopilot” that drafts brand-safe responses to Google/Yelp reviews and escalates negatives fast. You approve everything (or we can auto-post with guardrails). We respond within ~12 hours.

If helpful, I can do a free 7‑day trial: we’ll draft replies for every new review + a backlog of the last ~10.

Worth trying this week? If yes, tell me (1) Google only or Google+Yelp and (2) who should approve replies.

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Email 2 (follow-up, + social proof/clarity)
Subject: `Re: {{business_name}} review replies`

Hi {{first_name}} — quick follow-up.

The main win we see is simple: faster, consistent responses (especially to 3–4★ reviews) so prospects see an active owner and feel safer booking.

Free trial is lightweight:
- you forward invites / add us as manager (Google Business Profile),
- we draft responses within 12 hours,
- you approve (email) or we post with a pre-approved tone.

Want me to send the 2-minute setup steps?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Email 3 (breakup / close the loop)
Subject: `Close the loop?`

Hi {{first_name}},

Should I close this out or is review replying something you’d like off your plate?

If it’s a “not now,” tell me when to circle back. If you already have someone handling it, I’m happy to share a brand-safe response template pack (no charge).

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---

## 4) Segment-specific personalization hooks (use to increase replies)
- **not_responding:** mention response gap on last 10 reviews + “owners mean to respond but it slips.”
- **low_rating (<4.2):** reference a *specific complaint theme* from the last review excerpt (wait time, billing, bedside manner, no-show tech, etc.) and offer escalation workflow: “we flag negatives immediately + draft a calm, policy-safe reply.”
- **high_volume (200+ reviews or recent activity):** position as ops/throughput: “consistent tone across staff” + “weekly KPI report.”

Safety note: quote only 1–2 sentences of the review, avoid PHI/medical specifics, and avoid admitting fault; keep tone neutral.

---

## 5) Daily sending ops (Week 1 $0 stack)
**Tools (free):**
- Gmail/Google Workspace you already have access to (or a free Gmail for initial validation)
- Google Sheets as CRM + lead sheet
- Calendar booking link (optional; can be a free Google Calendar appointment slot)

**14-day ramp (per inbox):**
- Day 1–2: 10/day
- Day 3–4: 20/day
- Day 5–7: 35/day
- Day 8–10: 50/day
- Day 11–14: 75/day
**Rule:** if bounce rate > 5% in a day, stop and clean the list.

**Daily checklist (60–90 minutes):**
1) Add 25–50 new leads to sheet (or keep building list until 500+).
2) QA 10% sample: correct category, has website/phone, reviews present.
3) Send today’s new emails (ramp cap).
4) Log outcomes in CRM columns: Sent date, Reply status, Next follow-up date.
5) Respond to replies within 2 hours during business day (SLA).

**Simple CRM stages (in Sheets dropdown):**
Prospect → Sent → Replied → Qualified → Demo Booked → Trial Active (Free 7 days) → Won (Paid later) / Lost.

**Qualification rule (who gets a demo):**
- Has Google Business Profile, gets reviews monthly, and either response rate ≤20% OR rating <4.2 OR review volume high.

This kit lets a human/VA produce the full 500–1,000 CSV and begin sending immediately without any paid scrapers or paid sending tools (Week 1 $0 policy compliant).