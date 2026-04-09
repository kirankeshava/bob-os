# Outbound Pipeline Kit (Ready-to-Run) — Segmented Prospecting Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:36:47.375Z

---

## 1) ICP + Verticals (focus)
**Offer:** AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp: drafts and can post brand-safe responses, escalates negative reviews, weekly KPI reporting.
**Proof/legit link to include in outreach:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Primary reply-to inbox:** agent_bob_replit+review-bot@agentmail.to

### Chosen verticals (high review velocity + high LTV)
1) **Dentists** (incl. cosmetic dentistry, orthodontics)
2) **Med spas / aesthetic clinics**
3) **HVAC + plumbing** (home services)

### Target roles
Owner, GM/Practice Manager, Office Manager, Marketing Manager.

## 2) Segmentation + Priority (operational)
Capture per lead: rating, review_count, last_review_date, and a **response-rate proxy** from last 10 reviews: 
- response_rate_proxy = (# of owner/management responses in last 10 reviews) / 10

**Segments**
- **Not Responding:** response_rate_proxy ≤ 0.2 OR 0 responses in last 10
- **Low Rating:** google_rating < 4.2
- **High Volume:** review_count ≥ 200 OR last_review_date ≤ 14 days

**Priority scoring (route to template variant)**
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** Not Responding OR Low Rating
- **Priority C:** High Volume only

**Personalized hook required:**
- {{recent_review_snippet}} = 1 sentence from the most recent review (or paraphrase safely)
- {{response_gap}} = “looked like it wasn’t replied to yet” / “only a few recent reviews have owner replies”

## 3) Cold email sequences (3-step) — BASE TEMPLATE (then vertical/segment variants)

### 3.1 Email #1 (Initial)
**Subject options (rotate):**
1) “Quick idea for {{business_name}} reviews”
2) “Re: your Google reviews”
3) “12-hour review responses for {{business_name}}”

**Body (base):**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw: “{{recent_review_snippet}}”. {{response_gap}}.

We built a simple **AI Review Reply & Reputation Autopilot** that drafts (and can post) **brand-safe** responses to Google Business Profile + Yelp, flags negatives for escalation, and emails weekly reputation KPIs.

Concrete promise: **responses within 12 hours**, on-brand, and **you can approve** before anything goes live.

If I send 2–3 sample replies in your tone for the latest reviews, would you like to see them?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 3.2 Follow-up #1 (2 business days later)
**Subject:** “Worth a quick look?”

Hi {{first_name}},

Quick follow-up — most local teams lose time (and sometimes leads) simply because reviews pile up and the owner replies are inconsistent.

If you share the link to your Google profile (or just confirm you want Google only vs Google+Yelp), I’ll send **3 sample replies** for your most recent reviews today.

– Bob
agent_bob_replit+review-bot@agentmail.to

### 3.3 Follow-up #2 (5–7 business days later)
**Subject:** “Should I close this out?”

Hi {{first_name}},

Should I close the loop on this, or is someone on your team already handling review responses daily?

If it’s helpful, I can also show a weekly KPI snapshot (rating trend, response time, unresolved negatives) so it’s not guesswork.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 4) Segment-specific angle inserts (swap into Email #1 paragraph 2)

### 4.1 NOT RESPONDING angle
Replace paragraph 2 with:
“We built a simple autopilot that makes it painless to respond to every review (Google + Yelp) quickly and on-brand—without you living in the dashboards.”

### 4.2 LOW RATING angle (safety + escalation)
Replace paragraph 2 with:
“We built an autopilot that helps you respond to negatives fast and carefully (brand-safe), escalates the ones that need a human touch, and tracks whether the situation gets resolved.”

### 4.3 HIGH VOLUME angle (throughput + consistency)
Replace paragraph 2 with:
“When review volume is high, consistency becomes the issue. Our autopilot keeps replies fast, compliant, and in a consistent voice—even when the team is slammed.”

## 5) Vertical-specific personalization lines (add to Email #1 after first paragraph)

### Dentists
“Patients often mention scheduling, chairside manner, and wait time—your replies can reinforce trust for the next patient searching.”

### Med spas
“Prospects read reviews for tone, professionalism, and outcomes—fast, on-brand replies protect conversion from Google.”

### HVAC/Plumbing
“When someone has an urgent issue, they scan recent reviews fast—quick owner responses can directly influence call volume.”

## 6) Agency/reseller lane (separate initial email)
**Subject options:**
1) “White-label review response automation for your clients”
2) “Add-on: GBP + Yelp review replies in 12 hours”

**Body:**
Hi {{first_name}},

If you manage local clients (dental/med spa/home services), we can white-label an **AI Review Reply & Reputation Autopilot**: brand-safe draft replies, optional approval workflow, escalation for negatives, and weekly KPI reporting.

It’s positioned as an easy retainers add-on: clients get **12-hour response coverage** without adding headcount.

If you tell me your top 1–2 client verticals, I’ll share a quick outline + sample reports:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

– Bob
agent_bob_replit+review-bot@agentmail.to

## 7) Daily sending ops (14-day ramp + rules)

### Tooling (free-first)
- Start with 1 inbox, plain-text emails, no attachments.
- Track in a spreadsheet/CRM (Airtable/HubSpot free) with stages below.

### CRM stages (simple)
Prospect → Queued → Sent → Replied → Qualified → Demo Booked → Trial → Paid → Lost
**Exit criteria examples:**
- Qualified = confirms they manage GBP/Yelp and have review volume problem; agrees to see samples/demo.
- Lost = “not a priority”, “we have agency”, “wrong contact” (tag reason).

### Sending + ramp (per inbox)
- Day 1–2: 20/day
- Day 3–4: 30/day
- Day 5–7: 40/day
- Day 8–10: 60/day
- Day 11–14: 80/day
(Only scale if bounce rate < 3% and spam complaints = 0.)

### Daily checklist
1) Pull 25–100 new leads (depending on ramp day)
2) Add personalization snippet + response gap
3) Send new emails (70%) + follow-ups (30%)
4) Reply SLA: respond to positive replies within 2 hours during business day
5) Tag outcomes + schedule demos

### List hygiene / compliance rules
- Avoid sensitive personal data; only use publicly available business contact info.
- Keep opt-out line available on follow-ups if needed (e.g., “If this isn’t relevant, reply ‘no’ and I’ll stop.”)
- If bounce rate ≥ 5%: pause sending, fix list/enrichment.

## 8) Lead list CSV headers (copy/paste)
business_name,vertical,website,city_state,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

## 9) Minimal viable KPI targets (first 2 weeks)
- 500 sent emails total
- Reply rate: 5–10% (goal)
- Positive reply rate: 1–3%
- Booked demos: 5–10
- Trials started: 3–5

Use Priority A first (high volume + response gap or low rating) because the pain is obvious and the ROI is easiest to explain.