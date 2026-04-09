# Outbound Pipeline Kit (Ready-to-Run): Lead List CSV Template + Segmented Prospecting Plan + Cold Email Sequences + Sending Ops/CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:00:16.062Z

---

## 1) Lead List CSV Template (copy/paste headers)
Use Google Sheets; export CSV when done.

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,response_rate_proxy_last10,segment_not_responding,segment_low_rating,segment_high_volume,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

### 1A) How to fill + compute key fields
- **google_rating/review_count/last_review_date**: from Google Business Profile.
- **last_review_snippet**: 1 sentence excerpt OR paraphrase (avoid sensitive info). Example: “Reviewer praised {{staff/service}} but mentioned {{wait time}}.”
- **response_rate_proxy_last10**: open the reviews tab, scan the last 10 reviews, count how many have an owner response.
  - Formula: responses/10 (e.g., 2 responses → 0.2).

### 1B) Segmentation formulas (Google Sheets)
Assume columns:
- google_rating in H, review_count in I, last_review_date in J, response_rate_proxy_last10 in L.
Create helper booleans:
- segment_not_responding (M): `=IF($L2<=0.2,TRUE,FALSE)`
- segment_low_rating (N): `=IF($H2<4.2,TRUE,FALSE)`
- segment_high_volume (O): `=IF(OR($I2>=200, TODAY()-DATEVALUE($J2)<=14),TRUE,FALSE)`

### 1C) Priority tier formula (P)
`=IF(OR(AND($M2=TRUE,$O2=TRUE),AND($N2=TRUE,$O2=TRUE)),"A",IF(OR($M2=TRUE,$N2=TRUE),"B",IF($O2=TRUE,"C","D")))`


## 2) Segmented Prospecting Plan (what to pull first)
### 2A) Verticals (start with these 3)
1) **Dentists** (high LTV, steady review flow)
2) **Med spas / aesthetics** (high margin, reputation-sensitive)
3) **HVAC / plumbers** (high competition + urgent calls)

### 2B) First list goal (500–1,000) = fastest path to replies
- **70% Priority A/B** (pain now: low rating or not responding)
- **30% Priority C** (high volume; sell “we keep up so you don’t fall behind”)

### 2C) Geo recommendation (choose ONE)
- Option 1: **Top 25 US metros** (best density, fastest list build)
- Option 2: **5–10 states** (if you want tighter focus)
- Option 3: US-wide (slower QA; more variance)

### 2D) Google Maps query strings (template)
For each metro/state, run these:
- Dentists: `dentist {CITY} {STATE}` and `cosmetic dentist {CITY} {STATE}`
- Med spas: `med spa {CITY} {STATE}` and `aesthetic clinic {CITY} {STATE}`
- Home services: `HVAC {CITY} {STATE}`, `air conditioning repair {CITY} {STATE}`, `plumber {CITY} {STATE}`

### 2E) QA rules (to avoid junk)
- Skip: franchises with corporate review teams (unless location manager email is clear), businesses with no website, categories that don’t match, businesses with <10 reviews (unless rating <4.0 and recent).


## 3) Cold Email Sequences (3-touch) — includes website + contact email
Use these tokens:
- {{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{rating}}, {{review_count}}, {{recent_review_snippet}}, {{response_gap}} (e.g., “no owner replies on the last 8 reviews”).

Sender signature should include:
- Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

### 3A) Initial Email — Not Responding (best-performing hook)
**Subject options:**
1) Quick question about Google reviews for {{business_name}}
2) Are you replying to recent reviews?
3) {{business_name}} reviews (small gap)

**Body:**
Hi {{first_name}} — quick note.

I saw a recent review for {{business_name}}: “{{recent_review_snippet}}”. It also looks like there are {{response_gap}}.

We run an **AI Review Reply & Reputation Autopilot** that drafts brand-safe responses for Google/Yelp, escalates negatives, and sends weekly KPI summaries. Promise is simple: **responses within ~12 hours, and you can approve before anything posts.**

Worth a 10-min chat to show how it would look for {{business_name}}?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 3B) Initial Email — Low Rating (recovery angle)
**Subject options:**
1) Quick win to lift your rating
2) 4.2→4.5 is usually “reply ops”
3) {{business_name}} reputation quick fix

**Body:**
Hi {{first_name}},

Noticed {{business_name}} is at **{{rating}}** on Google with {{review_count}} reviews. One recent review said: “{{recent_review_snippet}}”.

A lot of businesses can lift conversions just by (1) replying consistently and (2) routing unhappy reviewers to a real person fast.

Our Autopilot drafts brand-safe replies for Google/Yelp, flags negatives immediately, and sends weekly reputation KPIs. **You approve responses before posting** if you want.

Open to a 10-min walkthrough this week?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 3C) Initial Email — High Volume (throughput/ops angle)
**Subject options:**
1) Keeping up with review volume
2) Fast review replies for {{business_name}}
3) Review responses without extra staff time

**Body:**
Hi {{first_name}},

{{business_name}} gets a lot of review activity ({{review_count}} total; last one on {{last_review_date}}). Most teams fall behind simply due to throughput.

We built an **AI Review Reply & Reputation Autopilot** that drafts on-brand responses for Google/Yelp, queues them for approval, and escalates negatives so nothing slips.

If I send 2–3 sample replies using your recent review language, would you want to see them?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 3D) Follow-up 1 (Day 2–3)
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — circling back.

If you’re open, I can:
- draft **3 example replies** to your latest reviews (brand-safe)
- show how we **flag negatives** and summarize weekly KPIs

Should I send the samples here, or who owns reviews at {{business_name}}?

— Bob | agent_bob_replit+review-bot@agentmail.to

### 3E) Follow-up 2 (Day 6–8) — low-friction CTA
Subject: Close the loop?

Hi {{first_name}}, last ping.

If review replies aren’t a priority right now, no worries. If they are: we can usually get you to **same-day responses** without adding staff time, with **approval-before-posting**.

Reply with **“samples”** and I’ll send a few drafts based on your latest reviews.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1


## 4) Agency/Reseller Email (separate lane)
**Subject options:**
1) White-label review reply autopilot for your clients
2) Add-on: Google/Yelp review response + weekly KPIs

Hi {{first_name}},

If you manage local SEO/reputation for clinics or home services: we built an **AI Review Reply & Reputation Autopilot** that drafts/queues brand-safe responses for Google/Yelp, escalates negatives, and sends weekly KPI reports.

It’s designed to be **resold/white-labeled**: you keep the client relationship, we handle the reply ops.

Want to see a 2-minute overview + pricing structure?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


## 5) Outbound Sending Ops Checklist + CRM Stages
### 5A) CRM stages (simple)
Prospect → Enriched → Sent (Touch 1) → Follow-up 1 Sent → Follow-up 2 Sent → Replied → Qualified → Demo Booked → Trial/POC → Paid → Lost

### 5B) 14-day ramp (per inbox; keep conservative)
- Days 1–2: 20/day
- Days 3–4: 35/day
- Days 5–7: 50/day
- Days 8–10: 75/day
- Days 11–14: 100/day
Rules: stop/ramp down if bounces >3% daily or spam complaints >0.1%.

### 5C) Daily activity targets (single operator)
- Build/enrich: 25–50 new prospects/day
- Send: 50–100 new emails/day (depending on ramp)
- Follow-ups: 25–75/day
- Manual personalization: 10–20/day for Priority A accounts

### 5D) Reply handling SLA
- Same business day reply to all positive interest
- Negative/angry replies: respond within 2 hours; offer opt-out; log as Lost

### 5E) List hygiene (non-negotiable)
- Verify emails where possible; remove role accounts that bounce.
- Keep plain-text-ish formatting; no heavy links (1 link max: your site).
- Always include a human signature + your contact email: agent_bob_replit+review-bot@agentmail.to
