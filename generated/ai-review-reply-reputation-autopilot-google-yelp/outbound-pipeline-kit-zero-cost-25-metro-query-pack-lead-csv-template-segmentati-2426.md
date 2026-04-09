# Outbound Pipeline Kit (Zero-Cost): 25-Metro Query Pack + Lead CSV Template/Segmentation + 3-Step Cold Email Sequences + Daily Ops/CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T21:21:25.032Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit (Zero-Cost)

**Legitimacy links to use in outreach**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

---
## 1) Target verticals + initial geography
**Verticals (high review velocity + strong LTV):**
1) Dentists (incl. cosmetic dentistry)
2) Med spas / aesthetics clinics
3) HVAC + Plumbers (home services)

**Initial geography (to avoid analysis paralysis):** Top 25 US metros
New York, Los Angeles, Chicago, Dallas, Houston, Atlanta, Washington DC, Philadelphia, Miami, Phoenix, Boston, San Francisco, Riverside, Detroit, Seattle, Minneapolis, San Diego, Tampa, Denver, Baltimore, St. Louis, Charlotte, Orlando, San Antonio, Portland.

---
## 2) Google Maps Query Pack (75 exact queries)
Run each query in Google Maps and collect the first ~10–20 relevant results per query (skip chains/franchises if possible).

### Dentists (25 queries)
“dentist in New York NY”
“dentist in Los Angeles CA”
“dentist in Chicago IL”
“dentist in Dallas TX”
“dentist in Houston TX”
“dentist in Atlanta GA”
“dentist in Washington DC”
“dentist in Philadelphia PA”
“dentist in Miami FL”
“dentist in Phoenix AZ”
“dentist in Boston MA”
“dentist in San Francisco CA”
“dentist in Riverside CA”
“dentist in Detroit MI”
“dentist in Seattle WA”
“dentist in Minneapolis MN”
“dentist in San Diego CA”
“dentist in Tampa FL”
“dentist in Denver CO”
“dentist in Baltimore MD”
“dentist in St. Louis MO”
“dentist in Charlotte NC”
“dentist in Orlando FL”
“dentist in San Antonio TX”
“dentist in Portland OR”

### Med Spas (25 queries)
“med spa in New York NY”
“med spa in Los Angeles CA”
“med spa in Chicago IL”
“med spa in Dallas TX”
“med spa in Houston TX”
“med spa in Atlanta GA”
“med spa in Washington DC”
“med spa in Philadelphia PA”
“med spa in Miami FL”
“med spa in Phoenix AZ”
“med spa in Boston MA”
“med spa in San Francisco CA”
“med spa in Riverside CA”
“med spa in Detroit MI”
“med spa in Seattle WA”
“med spa in Minneapolis MN”
“med spa in San Diego CA”
“med spa in Tampa FL”
“med spa in Denver CO”
“med spa in Baltimore MD”
“med spa in St. Louis MO”
“med spa in Charlotte NC”
“med spa in Orlando FL”
“med spa in San Antonio TX”
“med spa in Portland OR”

### HVAC/Plumbing (25 queries)
“hvac company in New York NY”
“hvac company in Los Angeles CA”
“hvac company in Chicago IL”
“hvac company in Dallas TX”
“hvac company in Houston TX”
“hvac company in Atlanta GA”
“hvac company in Washington DC”
“hvac company in Philadelphia PA”
“hvac company in Miami FL”
“hvac company in Phoenix AZ”
“hvac company in Boston MA”
“hvac company in San Francisco CA”
“hvac company in Riverside CA”
“hvac company in Detroit MI”
“hvac company in Seattle WA”
“hvac company in Minneapolis MN”
“hvac company in San Diego CA”
“hvac company in Tampa FL”
“hvac company in Denver CO”
“hvac company in Baltimore MD”
“hvac company in St. Louis MO”
“hvac company in Charlotte NC”
“hvac company in Orlando FL”
“hvac company in San Antonio TX”
“hvac company in Portland OR”

---
## 3) Lead List CSV Template (copy/paste headers)
Paste into Google Sheets row 1, then export CSV when done.

**Headers:**
prospect_id,business_name,vertical,city,state,metro,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,response_rate_proxy_last10,segment_not_responding,segment_low_rating,segment_high_volume,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

### Data dictionary (what each field means)
- **prospect_id:** simple unique ID (e.g., DENT-NYC-001)
- **google_rating/review_count:** from GBP panel
- **last_review_date:** most recent review date (Month Day, Year)
- **last_review_snippet:** 10–25 words max; optionally paraphrase
- **response_rate_proxy_last10:** count owner replies in last 10 reviews / 10 (e.g., 0.1, 0.3)
- **segment flags:** TRUE/FALSE
- **priority_tier:** A/B/C using rules below

---
## 4) Segmentation rules + Priority scoring (use formulas)
Set these thresholds (adjust later based on results):
- **Not Responding:** response_rate_proxy_last10 <= 0.2
- **Low Rating:** google_rating < 4.2
- **High Volume:** review_count >= 200 OR last_review_date within last 14 days

**Priority tiers:**
- **A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **B:** Not Responding OR Low Rating
- **C:** High Volume only

**Example Google Sheets formulas (assuming columns):**
- response_rate_proxy_last10 in column O
- google_rating in column J
- review_count in column K
- last_review_date in column L

Segment not responding (P2):
`=IF($O2<=0.2,TRUE,FALSE)`

Segment low rating (Q2):
`=IF($J2<4.2,TRUE,FALSE)`

Segment high volume (R2):
`=IF(OR($K2>=200, $L2>=TODAY()-14),TRUE,FALSE)`

Priority tier (S2):
`=IF(OR(AND($P2=TRUE,$R2=TRUE),AND($Q2=TRUE,$R2=TRUE)),"A",IF(OR($P2=TRUE,$Q2=TRUE),"B",IF($R2=TRUE,"C","C")))`

---
## 5) Cold Email Sequences (3 steps) — includes legitimacy URL + contact email
**Personalization tokens:** {{first_name}}, {{business}}, {{city}}, {{recent_review_snippet}}, {{rating}}, {{review_count}}, {{response_gap}}

### 5A) Initial email — Not Responding (works for all 3 verticals)
**Subject options:**
1) Quick question about your Google reviews
2) Noticed a response gap at {{business}}
3) 12-hour review responses for {{business}}?

**Body:**
Hi {{first_name}} — quick note.

I was looking at {{business}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”. It looks like some reviews aren’t getting owner responses ({{response_gap}}).

We run an **AI Review Reply & Reputation Autopilot** that drafts brand-safe replies for Google + Yelp, escalates negatives, and sends weekly KPI reporting. You can **approve replies before posting**, and we can target a **<12 hour response time**.

If it’s helpful, I can do a free 7-day trial: we’ll draft replies for everything new and show the weekly report.

Want me to send 2–3 example replies in your tone first?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

### 5B) Initial email — Low Rating
**Subject options:**
1) Quick win to lift rating over time
2) About your recent Google feedback
3) Reputation help for {{business}}

**Body:**
Hi {{first_name}} — I was checking {{business}}’s Google profile ({{rating}} stars).

A recent review mentioned: “{{recent_review_snippet}}”. When negative reviews don’t get a timely, calm response, it tends to drag conversion.

We help local businesses respond **fast and consistently** on Google/Yelp: draft brand-safe replies, flag negatives for escalation, and report weekly KPIs. You approve replies before anything posts.

Open to a free 7-day trial where we handle new reviews and queue any negatives for you?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

### 5C) Initial email — High Volume
**Subject options:**
1) Handling {{review_count}} reviews without extra staff
2) Faster review replies for {{business}}
3) Review response ops for {{business}}

**Body:**
Hi {{first_name}} — {{business}} has strong review volume ({{review_count}}+).

If your team is busy, review responses usually slip—especially during peak weeks. We draft and (optionally) post brand-safe replies for Google + Yelp, escalate negatives, and send weekly KPI summaries. You can approve everything.

Would you like a free 7-day trial to prove we can keep replies within 12 hours?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

### Follow-up 1 (2–3 business days later)
Subject: Re: {{business}} reviews
Body:
Hi {{first_name}} — checking if this is worth exploring.

If you send me your preferred tone (friendly/clinical/short & direct), I’ll reply with **3 draft responses** to recent reviews at {{business}} so you can judge quality before any trial.

Should I do that?
— Bob | agent_bob_replit+review-bot@agentmail.to

### Follow-up 2 (4–7 business days later)
Subject: Close the loop?
Body:
Hi {{first_name}} — last note.

If review responses are already handled, no worries. If not, we can run a free 7-day trial: draft replies, escalate negatives, and send a weekly KPI snapshot.

Reply “trial” and I’ll send the 2-minute setup.
— Bob

---
## 6) Daily sending ops (no-spend) + CRM stages
### Daily targets (Week 1)
- **New emails/day:** 30–50 (manual sending, avoid spam triggers)
- **Follow-ups/day:** 20–40
- **Personalization:** 1 custom line per email using review snippet + response gap

### 14-day ramp (safe manual)
Day 1–2: 20/day
Day 3–4: 30/day
Day 5–7: 40/day
Day 8–10: 60/day (only if bounce <3% and replies are healthy)
Day 11–14: 80/day (cap if any deliverability issues)

### CRM stages (simple)
1) Prospects (not yet sent)
2) Sent
3) Replied
4) Qualified (has GBP/Yelp + acknowledges review pain)
5) Demo Booked
6) Trial Active (free week)
7) Converted (post-week-1 paid later)
8) Lost (no fit / no response)

### QA rules (before sending)
- Must have: website OR phone, Google rating, review count, last review date, Google Maps URL
- Skip: obvious national chains, closed locations, no recent reviews in last 12 months
- Prioritize: Priority A first, then B

### Reply-handling SLA
- Respond to replies within 2 hours during business day
- If they ask “price”: answer “free 7-day trial” (Week 1 policy) + ask for GBP access method

---
## 7) What to do next (owner/VA)
1) Use the 75 queries to collect **first 200 leads** in Sheets (1–2 days).
2) Compute segments + Priority tier with formulas.
3) Start sending to Priority A first using the matching email variant.
4) Continue list build to 500–1,000 while follow-ups run.
