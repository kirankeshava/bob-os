# Outbound Pipeline Kit (Zero-Cost): Lead List Template + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T17:29:30.465Z

---

# Outbound Pipeline Kit (Zero-Cost)
Business: **AI Review Reply & Reputation Autopilot (Google/Yelp)**
Proof URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email to include in outreach: agent_bob_replit+review-bot@agentmail.to

---
## 1) Verticals + ICP
Focus verticals (high review velocity + high LTV):
1) **Dentists** (general + cosmetic + orthodontics)
2) **Med spas / aesthetic clinics** (Botox/fillers/laser)
3) **HVAC + plumbing** (home services; high competition; reviews drive calls)

Buyer: owner, practice manager, office manager, GM.

---
## 2) Geography (recommended)
**Recommended for first 500–1,000 leads:** Top 25 US metros.
Why: consistent review volume; more owner-operated locations; less fragmented.

If you prefer states instead: pick 5–10 states and reuse the same query patterns.

---
## 3) Google Maps Query Pack (copy/paste)
Use these in Google Maps, then open each listing and collect fields.

### Dentists
- “dentist in {{city}}”
- “cosmetic dentist in {{city}}”
- “orthodontist in {{city}}”

### Med Spas
- “med spa in {{city}}”
- “aesthetic clinic in {{city}}”
- “botox in {{city}}”

### HVAC/Plumbing
- “hvac company in {{city}}”
- “air conditioning repair in {{city}}”
- “plumber in {{city}}”

### Agency / Reseller lane (optional parallel list)
- “dental marketing agency {{city}}”
- “med spa marketing agency {{city}}”
- “home services marketing agency {{city}}”
- “local seo agency {{city}}”

**Filtering rules (QA):**
- Prefer independent businesses (avoid obvious national chains/franchises unless multi-location is desired).
- Must have **website** or at least a contact page.
- Must have **recent review activity** (ideally within last 60 days).

---
## 4) Lead List CSV Template (headers)
Create a Google Sheet with these columns (row 1):

1. business_name
2. vertical
3. city
4. state
5. address
6. phone
7. website
8. google_maps_url
9. google_rating
10. review_count
11. last_review_date
12. last_review_excerpt (for personalization; keep to 15–25 words)
13. owner_response_in_last_10 (count 0–10)
14. response_rate_proxy (formula)
15. yelp_url (optional)
16. yelp_rating (optional)
17. yelp_review_count (optional)
18. contact_name (best guess)
19. contact_role (owner/practice manager/office manager/gm/marketing)
20. email_1
21. email_2
22. linkedin_url (optional)
23. segment_not_responding (TRUE/FALSE)
24. segment_low_rating (TRUE/FALSE)
25. segment_high_volume (TRUE/FALSE)
26. priority_tier (A/B/C)
27. personalization_hook (1 sentence)
28. notes

### Formulas (Google Sheets)
Assume:
- review_count in column J
- owner_response_in_last_10 in column M
- google_rating in column I
- last_review_date in column K

**response_rate_proxy (column N):**
`=IFERROR(M2/10,0)`

**segment_not_responding (column W):**
`=IF(N2<=0.2,TRUE,FALSE)`

**segment_low_rating (column X):**
`=IF(I2<4.2,TRUE,FALSE)`

**segment_high_volume (column Y):**
`=IF(OR(J2>=200, K2>=TODAY()-14), TRUE, FALSE)`

**priority_tier (column Z):**
`=IF(OR(AND(W2=TRUE,Y2=TRUE),AND(X2=TRUE,Y2=TRUE)),"A",IF(OR(W2=TRUE,X2=TRUE),"B",IF(Y2=TRUE,"C","C")))`

### Personalization capture rules (brand-safe)
- Prefer paraphrasing vs quoting verbatim if the review contains sensitive details.
- Keep excerpt short; avoid names; avoid health details (med spa/dental).
- If excerpt is risky, set `personalization_hook` to something neutral:
  - “Noticed you’re getting a steady stream of new reviews this month.”
  - “Saw a recent review mentioning wait time / scheduling / communication.”

---
## 5) Segmented Offer (what we’re selling in Week 1)
**Free 7-day trial (Week 1 policy):**
- Draft responses to every new Google (and optionally Yelp) review within **12 hours**
- Brand-safe tone matched to business voice
- Negative review escalation + suggested resolution language
- Weekly KPI summary (rating trend, response time, response rate proxy)
- “You approve” option (approve-by-email) OR “autopost” option later

---
## 6) Cold Email Sequences (3-step) — Local Businesses
Use {{tokens}} from the sheet.
Always include proof URL + contact email.

### A) Not Responding (primary pain: silence)
**Subject options:**
1) Quick fix for your Google reviews
2) {{business_name}} — replying to reviews in 12 hours
3) Noticed a response gap on your reviews

**Email 1 (Day 1):**
Hi {{contact_name | there}} — I was looking at {{business_name}} on Google and noticed a few recent reviews aren’t getting owner replies (e.g., “{{last_review_excerpt}}”).

We built a lightweight **AI review-reply autopilot** for local businesses: it drafts **brand-safe** responses and sends them for approval (or you can have us post once you’re comfortable). During the free 7‑day trial we aim to respond within **12 hours** and flag anything negative for escalation.

If helpful, I can send 2–3 sample replies in your voice for your most recent reviews.

Want me to do that?
— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3):**
Hi {{contact_name | there}} — quick follow-up.

For businesses like {{business_name}}, we usually see that simply replying consistently increases call/booking conversion (people look for “owner responsiveness”). We’ll draft replies within 12 hours during the free week and you can approve by email.

Should I send a few draft replies for your latest reviews?
— Bob

**Follow-up 2 (Day 7):**
Last note — if you want, I can run a 7‑day “review coverage” trial for {{business_name}}: every new review gets a response drafted (and escalations flagged).

If you reply with “yes” + preferred tone (friendly/professional), I’ll send the first set.
— Bob

---
### B) Low Rating (primary pain: reputation recovery)
**Subject options:**
1) Helping raise ratings (without gaming reviews)
2) Quick plan to address negative reviews
3) {{business_name}} — response + escalation workflow

**Email 1 (Day 1):**
Hi {{contact_name | there}} — I saw {{business_name}}’s Google rating is around {{google_rating}} and a recent review mentioned “{{last_review_excerpt}}”.

We run a **reputation autopilot** that drafts calm, brand-safe replies and escalates negatives so you can address issues fast (and show future customers you handle problems professionally). Free 7‑day trial: replies drafted within **12 hours**, weekly KPI summary included.

If I draft responses for the last 3 reviews (including one negative) in your voice, would you like to review them?
— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3):**
Two quick levers that tend to move rating perception fast:
1) Respond publicly with empathy + resolution path
2) Route negatives internally the same day

We handle (1) with drafted replies and (2) with a simple escalation note. Want 2 sample replies?
— Bob

**Follow-up 2 (Day 7):**
If rating improvement is on the radar, I can do the free 7‑day trial for {{business_name}} starting this week. Reply “start” and I’ll send the simple onboarding steps.
— Bob

---
### C) High Volume (primary pain: time/ops)
**Subject options:**
1) Handling review volume without extra staff
2) {{business_name}} — review replies at scale
3) 12-hour review response coverage

**Email 1 (Day 1):**
Hi {{contact_name | there}} — {{business_name}} has a lot of Google reviews ({{review_count}}). Keeping up with replies is a real ops tax.

We built an AI-assisted workflow that drafts brand-safe replies and sends them for approval (or autopost later). Free 7‑day trial: **12-hour coverage** on new reviews + a weekly report on response rate and trends.

Worth trying for a week? I can send a quick sample reply set first.
— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3):**
Most teams don’t need “more marketing” — they need a consistent response system.

If you want, I’ll draft replies for your 5 most recent reviews so you can see tone + quality.
— Bob

**Follow-up 2 (Day 7):**
Should I close the loop on this, or do you want the sample replies for {{business_name}}?
— Bob

---
## 7) Cold Email Sequence — Agencies/Resellers
Goal: get 5–20 clients at once via agency bundles.

**Subject options:**
1) Add review reply automation to your retainers
2) White-label review responses (Google/Yelp)
3) Quick reseller idea for {{agency_name}}

**Email 1:**
Hi {{name | there}} — I’m reaching out because {{agency_name}} works with local clients who live/die by Google reviews.

We offer a simple **white-label review reply autopilot**: brand-safe drafts within 12 hours, negative-review escalation, and a weekly KPI snapshot. It’s designed to plug into an agency retainer (you can position it as “reputation management ops”).

We’re doing **free 7‑day trials** right now. Want to pilot this on 1–2 of your dentist/med spa/home services accounts?

Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
If you tell me your top client vertical, I’ll send a sample “weekly reputation KPI” report and a few example replies in the tone you like.
— Bob

**Follow-up 2:**
Should I keep a spot open for a 7‑day pilot, or not a fit?
— Bob

---
## 8) Daily Sending Ops (Week 1; $0 tools)
### List building production targets
- 50–100 leads/day manually (per person) is realistic once the workflow is smooth.
- QA sample: every 20 leads, re-check 2 listings for accuracy.

### Sending ramp (per inbox)
Day 1–2: 20/day
Day 3–4: 30/day
Day 5–7: 40/day
Day 8–14: 50/day

If you only have one inbox, start at 20–30/day to avoid spam flags.

### Hygiene rules
- No attachments.
- Plain text only.
- Personalization line must be true and non-sensitive.
- If bounce rate > 5% in a day: stop sending, fix list.
- If spam complaints: stop immediately, reduce volume, tighten targeting.

### Reply handling SLA
- Same-day replies for any “interested”.
- For negatives (“not now”): ask permission to follow up in 60 days.

---
## 9) CRM Stages (simple)
1) Prospect (in sheet, unsent)
2) Sent
3) Replied
4) Qualified (has Google Business Profile access path + wants help)
5) Trial Started (7 days free)
6) Converted (post-week-1 paid later)
7) Lost (reason)

**Minimum tracking fields:** last_touch_date, next_step, owner.

---
## 10) What you need to decide today
Choose ONE geography for the first list build so we can move into sending:
A) Top 25 US metros (recommended)
B) 5–10 target states
C) US-wide (harder QA; more variance)

Once chosen: build the first 200 leads using the template above, then start sending with Priority A first.
