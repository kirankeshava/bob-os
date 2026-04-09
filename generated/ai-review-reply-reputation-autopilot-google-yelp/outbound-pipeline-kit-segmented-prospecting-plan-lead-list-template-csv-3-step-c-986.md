# Outbound Pipeline Kit — Segmented Prospecting Plan + Lead List Template (CSV) + 3-Step Cold Email Sequences + Daily Ops/CRM (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:06:33.021Z

---

## 1) Segmented prospecting plan (who we target + how we route)

### Core offer (used in all outreach)
AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp: drafts brand-safe responses to reviews, escalates negative reviews fast, and sends weekly reputation KPI reporting. Proof/legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1  
Contact: agent_bob_replit+review-bot@agentmail.to

### Vertical focus (2–3 lanes)
1) Dentists (incl. orthodontists, cosmetic dentists)  
2) Med spas / aesthetic clinics  
3) HVAC + plumbers (home services)

### Geography approach (choose one)
A) Top 25 US metros (best for density + fast list building)  
B) 5–10 states (best for regional reputation play)  
C) US-wide (largest pool, most noise)

### Segments (based on Google profile signals)
We segment each prospect into one primary segment:
- **Not Responding**: response_rate_proxy ≤ 20% OR 0 owner responses in last 10 reviews
- **Low Rating**: google_rating < 4.2
- **High Volume**: review_count ≥ 200 OR last_review_date ≤ 14 days

### Priority scoring (used to determine send order)
- **Priority A**: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B**: Not Responding OR Low Rating (without high volume)
- **Priority C**: High Volume only

### Routing rules (which email variant gets used)
- Not Responding → “response gap / speed / approval workflow” angle
- Low Rating → “service recovery / escalation / consistency” angle
- High Volume → “throughput + weekly KPIs + reduces admin load” angle

### Weekly operating cadence
- Monday: Build/pull 125–250 new leads (depending on send capacity) + QA sample 10%.
- Tue–Thu: Send new outbound + follow-ups; handle replies within SLA.
- Friday: KPI review (reply rate, positive replies, meetings booked); refresh hooks and subjects.


## 2) Lead list CSV template (copy/paste headers) + data dictionary

### CSV headers
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_reviews_owner_responses,segment,priority_tier,personalization_snippet,contact_name,contact_role_guess,email_1,email_2,notes

### Data dictionary (what each column means)
- **business_name**: GBP listing name.
- **vertical**: dentist | med_spa | hvac_plumbing | agency.
- **city_state**: “Austin, TX” etc.
- **website**: from GBP.
- **phone**: from GBP.
- **google_maps_url**: the share link.
- **google_rating**: star rating.
- **review_count**: total reviews.
- **last_review_date**: date of most recent review.
- **last_10_reviews_owner_responses**: count of owner replies visible in the last 10 reviews.
- **response_rate_proxy**: last_10_reviews_owner_responses / 10.
- **segment**: not_responding | low_rating | high_volume.
- **priority_tier**: A | B | C.
- **personalization_snippet**: 1–2 lines from most recent review OR a paraphrase (safer) + note “no public response seen” if applicable.
- **contact_name / role_guess**: owner/manager/practice manager/office manager.
- **email_1/email_2**: best contact emails (site contact page, staff page, or public sources).

### Simple formulas (Google Sheets)
Assume:
- google_rating in column H, review_count in I, last_review_date in J, response_rate_proxy in K

**segment (pseudo-logic):**
IF(H<4.2,"low_rating", IF(OR(K<=0.2, L=0),"not_responding", IF(OR(I>=200, TODAY()-J<=14),"high_volume","")))

**priority_tier:**
IF(AND(segment="not_responding", OR(I>=200, TODAY()-J<=14)),"A",
 IF(AND(segment="low_rating", OR(I>=200, TODAY()-J<=14)),"A",
 IF(OR(segment="not_responding", segment="low_rating"),"B",
 IF(segment="high_volume","C",""))))


## 3) Cold email sequences (3-step) — includes tokens + segment variants

### Personalization tokens
{{first_name}} {{business_name}} {{city}} {{vertical}} {{recent_review_snippet}} {{response_gap}} {{rating}} {{review_count}} {{website_url}}

### Universal signature (use in all emails)
Bob Smith  
AI Review Reply & Reputation Autopilot  
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1  
agent_bob_replit+review-bot@agentmail.to


### A) Local business — NOT RESPONDING variant (works for all 3 verticals)

**Email 1 (initial)**
Subject options:
1) Quick question about your Google reviews
2) Noticed a response gap on {{business_name}}
3) Re: new reviews coming in

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and saw new feedback like: “{{recent_review_snippet}}”.

I didn’t see a public owner response on a few recent ones (totally normal when you’re busy). We run a simple “reputation autopilot” that:
- drafts brand-safe replies within 12 hours
- escalates negative reviews fast
- you can approve/edit before anything posts

Worth a 10-minute look? If you share your review link, I can show 2–3 sample replies in your tone.

— Bob
(Proof: {{website_url}})

**Email 2 (follow-up, +2–3 days)**
Subject: Sample replies for {{business_name}}?

Body:
{{first_name}}, want me to draft a couple replies for your latest reviews (no obligation)?

Most local businesses see two quick wins: (1) higher conversion from searchers who read responses, and (2) fewer “silent” negatives because unhappy customers get routed to escalation.

If you reply with “yes” I’ll send drafts for approval.

— Bob

**Email 3 (follow-up, +5–7 days)**
Subject: Close the loop?

Body:
Should I close this out, or is review responses something you want off your team’s plate this month?

If it helps, we can start with a lightweight setup: Google only, weekly KPI email, and response drafts for approval.

— Bob


### B) Local business — LOW RATING variant

**Email 1**
Subject options:
1) Quick fix for reputation recovery
2) About your recent reviews on Google
3) Could help lift rating perception

Body:
Hi {{first_name}} — I was reviewing {{business_name}} and noticed the rating is around {{rating}}.

One thing that consistently improves conversion (even before the rating changes) is consistent, calm responses—especially on the 1–3 star reviews—plus fast escalation so issues don’t repeat.

We help by drafting brand-safe responses within 12 hours, routing negatives for internal follow-up, and sending weekly KPIs (new reviews, response rate, sentiment).

If you send your Google review link, I’ll draft replies to 2 recent critical reviews in your tone for approval.

— Bob
(Proof: {{website_url}})

**Email 2**
Subject: Want me to draft 2 replies?

Body:
I can draft two responses that (a) acknowledge, (b) de-escalate, and (c) invite offline resolution—without sounding defensive.

Ok to send?

— Bob

**Email 3**
Subject: Still the right person?

Body:
If someone else owns reputation/reviews at {{business_name}}, who should I talk to (office manager / practice manager / GM)?

— Bob


### C) Local business — HIGH VOLUME variant

**Email 1**
Subject options:
1) Keeping up with review volume
2) Review response ops for {{business_name}}
3) 12-hour review replies (approval-first)

Body:
Hi {{first_name}} — {{business_name}} has strong review volume ({{review_count}}+). Many teams fall behind simply because it’s operationally annoying.

We run an approval-first workflow that drafts brand-safe replies within 12 hours, escalates negatives, and sends a weekly KPI snapshot.

If you want, I’ll show what this would look like for {{business_name}} using your latest reviews (2–3 drafts).

— Bob
(Proof: {{website_url}})

**Email 2**
Subject: Who handles reviews at {{business_name}}?

Body:
Quick check—do you handle Google/Yelp responses, or should I reach your manager/office lead?

— Bob

**Email 3**
Subject: Last touch

Body:
If you’d like, we can start with just Google responses (no Yelp) and expand later. Want a 10-minute walkthrough?

— Bob


### D) Agency / Reseller version (sell to marketers serving these verticals)

**Email 1**
Subject options:
1) Add-on for your local clients (reviews)
2) White-label review response ops
3) Quick partnership?

Body:
Hi {{first_name}} — do you manage Google Business Profiles for local clients (dentists/med spas/home services)?

We provide a white-label “review reply + escalation + weekly KPI” service/workflow: brand-safe drafts within 12 hours, approval-first, and reporting your clients understand.

If you tell me your client vertical + typical client count, I’ll share partner pricing and a sample weekly report.

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1


## 4) Daily sending ops checklist + 14-day ramp + CRM stages

### Tool-agnostic daily checklist
1) Pull/build leads (new) + verify website + category match.
2) Collect last review date + 1 snippet + response-rate proxy (last 10).
3) Enrich emails (website contact page + team page; avoid generic forms when possible).
4) QA 10% sample: wrong vertical? missing website? franchise? duplicates? bad emails?
5) Send new emails (under daily cap) + schedule follow-ups.
6) Monitor bounces/complaints; pause if thresholds hit.
7) Reply handling within SLA; book calls; update CRM.

### 14-day ramp (per inbox)
- Days 1–2: 10/day
- Days 3–4: 15/day
- Days 5–6: 20/day
- Days 7–8: 25/day
- Days 9–10: 30/day
- Days 11–14: 40/day (only if bounce < 3% and spam complaints ~0)

### Safety thresholds
- Bounce rate: pause list/source if > 3–5% on a send.
- Spam complaints: any repeated complaints → reduce volume and tighten targeting.
- Reply SLA: respond same business day; negative replies get a polite close.

### CRM stages (simple pipeline)
1) Prospect (in CSV, not sent)
2) Sent (Email 1 sent)
3) Engaged (opened/replied/clicked if tracked)
4) Replied — Interested
5) Qualified (has Google/Yelp + decision maker + pain)
6) Demo Booked
7) Trial/Onboarding
8) Paid
9) Lost (reason tagged: no need, timing, wrong person, angry, already has solution)

### Minimum activity targets (single inbox)
- New sends: 25–50/day after ramp
- Follow-ups: 10–30/day
- New leads added: 25–50/day (so you don’t run out)
- KPI targets: 1–3% positive reply rate; 0.5–1% meeting-booked rate initially
