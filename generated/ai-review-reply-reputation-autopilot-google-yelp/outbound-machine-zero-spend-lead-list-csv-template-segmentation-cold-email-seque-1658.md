# Outbound Machine (Zero-Spend) — Lead List CSV Template + Segmentation, Cold Email Sequences (3-step), and Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T17:23:01.915Z

---

## 1) Lead List CSV Template (copy/paste headers)
Use Google Sheets; export as CSV.

**Columns (in order):**
1. business_name
2. vertical (dentist | med_spa | hvac_plumbing)
3. city
4. state
5. website
6. phone
7. google_maps_url
8. google_rating
9. review_count
10. last_review_date (YYYY-MM-DD)
11. last_review_excerpt (<=160 chars; quote or paraphrase)
12. owner_reply_count_last10 (0-10)
13. response_rate_proxy (0.0–1.0)
14. segment (not_responding | low_rating | high_volume | mixed)
15. priority (A | B | C)
16. contact_name (if known)
17. role_guess (owner | manager | marketing)
18. email_1
19. email_2
20. linkedin_url (optional)
21. notes

### Google Sheets formulas
Assume:
- google_rating in column H
- review_count in column I
- last_review_date in column J
- owner_reply_count_last10 in column L

**response_rate_proxy (col M):**
`=IFERROR(L2/10,0)`

**segment (col N) rules:**
- Not responding: response_rate_proxy <= 0.2
- Low rating: google_rating < 4.2
- High volume: review_count >= 200 OR last_review_date within 14 days

Formula:
`=IF(AND(M2<=0.2,OR(H2<4.2,OR(I2>=200,TODAY()-J2<=14))),"mixed",IF(M2<=0.2,"not_responding",IF(H2<4.2,"low_rating",IF(OR(I2>=200,TODAY()-J2<=14),"high_volume",""))))`

**priority (col O):**
Priority A = mixed OR (not_responding AND high_volume condition) OR (low_rating AND high_volume condition)
Priority B = not_responding OR low_rating
Priority C = high_volume only

Formula (simple mapping):
`=IF(N2="mixed","A",IF(OR(N2="not_responding",N2="low_rating"),"B",IF(N2="high_volume","C","")))`

### Zero-spend lead sourcing workflow (repeatable)
1) Pick metro + vertical query (examples below).
2) On Google Maps, open each listing → record rating, review count.
3) Click “Reviews” → sort by newest → capture **last_review_date** and **last_review_excerpt** (<=160 chars).
4) For the last 10 reviews, count how many have an “Owner response” → put in **owner_reply_count_last10**.
5) Find email(s): go to business website → Contact/About/Booking pages → copy best owner/manager/marketing email.
6) QA rule: skip franchises where corporate-only contact; skip businesses without a real website unless they have a clear email on GBP.

### Query pack (use {metro} placeholders)
**Dentist**
- “dentist {metro}”
- “cosmetic dentist {metro}”
- “family dental {metro}”

**Med spa / aesthetics**
- “med spa {metro}”
- “aesthetic clinic {metro}”
- “botox {metro}”

**HVAC / plumbing**
- “hvac {metro}”
- “air conditioning repair {metro}”
- “plumber {metro}”

Recommended first geos (fastest review velocity): Phoenix, Dallas, Houston, Atlanta, Miami, Tampa, Orlando, Denver, Las Vegas, Los Angeles, San Diego, Austin, Charlotte, Nashville, Chicago.

---

## 2) Cold Email Sequences (3-step) — includes website + contact email
Sender signature (use on all):
**Bob Smith**
AI Review Reply & Reputation Autopilot
Proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

### Personalization tokens
- {{first_name}} (if unknown: “there”)
- {{business_name}}
- {{city}}
- {{recent_review_excerpt}}
- {{response_gap}} (ex: “looks like the last few reviews didn’t get an owner response”)
- {{vertical_phrase}} (dentist: “practice” | med spa: “clinic” | hvac: “team”)

### A) Dentist — Segment: Not Responding
**Subject options:**
1) Quick fix for {{business_name}} reviews
2) Patients are leaving reviews — who replies?
3) 12-hour review replies for {{business_name}}

**Email 1 (Day 1):**
Hi {{first_name}},

I was looking at {{business_name}} in {{city}} and saw a recent review: “{{recent_review_excerpt}}”. {{response_gap}}.

We run an **AI Review Reply & Reputation Autopilot** that drafts brand-safe Google/Yelp responses and helps you reply **within 12 hours** (you can approve before posting). For dental practices, fast responses tend to lift conversion from Maps and reduce “shopping around.”

If you want, I can do a **free 7-day trial**: we’ll draft replies for every new review + flag any negative ones for escalation.

Open to a 10-minute call this week?

— Bob
Proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3):**
Hi {{first_name}} — quick follow-up.

If I send you **3 example replies** (in your tone) to your newest reviews for {{business_name}}, would you want them? No commitment—just to show what we’d post.

— Bob

**Follow-up 2 (Day 7):**
Last note, {{first_name}}.

Most practices we talk to either (1) don’t have time to respond consistently, or (2) worry about saying the wrong thing with HIPAA sensitivity. Our system keeps replies **brand-safe and non-specific** and escalates negatives.

Should I set up the free 7-day trial for {{business_name}} or close the loop?

— Bob

### B) Dentist — Segment: Low Rating
**Subject options:**
1) Helping {{business_name}} rebound from reviews
2) Quick reputation wins (no awkward replies)
3) Review triage for {{business_name}}

**Email 1:**
Hi {{first_name}},

I saw {{business_name}}’s recent review: “{{recent_review_excerpt}}”. When ratings dip, prospects often filter you out before calling.

We run a **review triage + response autopilot**: draft calm, brand-safe replies, escalate critical issues to you, and send a weekly KPI snapshot (new reviews, response rate, rating trend). Free for 7 days.

Worth a quick 10-minute chat to see if we can help stabilize things?

— Bob (website + email in signature)

(Follow-ups mirror above but reference “triage + weekly KPIs.”)

### C) Dentist — Segment: High Volume
Angle: throughput/ops.
**Email 1:**
Hi {{first_name}},

{{business_name}} is getting a steady stream of reviews (saw: “{{recent_review_excerpt}}”). When volume is high, consistency slips.

We help practices respond **fast and consistently** (drafts in minutes, approve-before-post) and report weekly KPIs. Free 7 days.

Open to a short call?

— Bob

---

### D) Med Spa — Not Responding (Email 1)
**Subject:** Keeping up with reviews at {{business_name}}

Hi {{first_name}},

I saw a recent review for {{business_name}}: “{{recent_review_excerpt}}”. {{response_gap}}.

We help med spas reply quickly with **brand-safe, conversion-minded** responses on Google/Yelp (you can approve). We also flag any negative reviews for immediate escalation so it doesn’t sit unanswered.

Want to try it free for 7 days?

— Bob (website + contact email)

(Follow-ups: offer 3 sample replies; then “close the loop.”)

### E) HVAC/Plumbing — Not Responding (Email 1)
**Subject:** Quick review reply help for {{business_name}}

Hi {{first_name}},

I’m reaching out because I saw a recent review for {{business_name}}: “{{recent_review_excerpt}}”. {{response_gap}}.

We run an **AI Review Reply & Reputation Autopilot** that drafts responses and helps you reply within 12 hours (approve-before-post). For home services, fast replies often convert “price shoppers” and reduce lost calls.

Open to a free 7-day trial?

— Bob (website + email)

---

### F) Agency/Reseller version (initial)
**Subject options:**
1) Add review response as a retainer line item
2) White-label review replies for your local clients

Hi {{first_name}},

If you manage local clients (dentists/med spas/home services), reviews are a constant time sink.

We provide a white-labelable **review response autopilot** (Google/Yelp): brand-safe drafts, approval workflows, negative-review escalation, and weekly KPI reporting. Free 7-day trial on one client so you can see workflow + turnaround.

If it fits, we can package it as a simple monthly add-on you resell.

Open to a 10-minute chat?

— Bob
Proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---

## 3) Daily Sending Ops Checklist + CRM Stages (zero spend)
### CRM stages (use a Google Sheet)
1. **Prospect (Not Sent)** — lead captured + email verified by eyeballing format
2. **Sent (Step 1)** — initial email sent
3. **Follow-up 1 Sent**
4. **Follow-up 2 Sent**
5. **Replied – Interested** — asks questions / asks for call
6. **Replied – Not Now** — set reminder date
7. **Replied – Unsubscribe** — suppress forever
8. **Bounced** — suppress + find alternate email
9. **Call Booked**
10. **Trial Started (Free 7 days)**
11. **Closed Won (Paid later)**
12. **Closed Lost**

### 14-day ramp (per inbox)
- Days 1–2: 10/day
- Days 3–4: 20/day
- Days 5–6: 30/day
- Days 7–10: 40/day
- Days 11–14: 50/day
Rules: stop ramp if bounce rate >3% or spam complaints >0.1%.

### Daily routine (60–90 minutes)
1) Build 20–50 new leads (per the template).
2) QA 10% sample: correct category, real website, real email, review snippet accurate.
3) Send Step 1 to daily cap.
4) Send Follow-up 1 to leads at Day 3.
5) Send Follow-up 2 to leads at Day 7.
6) Reply SLA: respond to positives within 2 hours; propose 10-min call.
7) Log outcomes in CRM sheet.

### Metrics to track weekly
- Sent, delivered, open proxy (if available), replies, positive replies
- Trials started
- Top segments by reply rate (A/B/C)

## Next required decision (so execution can start)
Pick **one** scope for the first list build:
- **Top 15–25 metros** (fastest to build, more consistent categories)
- **5–10 states** (focus where you have network/knowledge)

Once chosen: build the first 200 leads in 48 hours, start the ramp, then repeat until 500–1,000 total.
