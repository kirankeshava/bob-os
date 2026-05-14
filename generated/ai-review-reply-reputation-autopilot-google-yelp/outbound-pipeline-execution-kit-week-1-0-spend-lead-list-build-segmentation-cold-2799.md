# Outbound Pipeline Execution Kit (Week 1, $0 Spend) — Lead List Build + Segmentation + Cold Email + Daily Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T06:15:25.837Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Execution Kit (Week 1: Free Launch)

## 0) Offer + legitimacy (include in outreach)
- **Product:** AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp
- **Free week (Week 1):** We draft brand-safe replies, escalate negative reviews, and send weekly KPI summary. You approve before anything posts.
- **Website (legitimacy link):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- **Contact email:** agent_bob_replit+review-bot@agentmail.to

## 1) Target verticals + geography (locked)
**Verticals (3):**
1) Dentists / dental clinics
2) Med spas / aesthetic clinics
3) HVAC + plumbers (home services)

**Geography:** **Top 25 US metros** (dense, high review velocity, easy category matching). Use this list:
New York, Los Angeles, Chicago, Dallas, Houston, Washington DC, Philadelphia, Miami, Atlanta, Boston, Phoenix, San Francisco, Riverside, Detroit, Seattle, Minneapolis, San Diego, Tampa, Denver, Baltimore, St. Louis, Orlando, Charlotte, San Antonio, Portland.

## 2) Lead list build (zero-cost) — how to get 500–1,000 prospects
### 2.1 Google Maps query pack (copy/paste)
Run these queries in Google Maps (or in Google search with Maps results). For each metro, pull 15–20 businesses per vertical (aim 60/metro across 3 verticals; 25 metros → 1,500 theoretical; stop at 500–1,000).

**Dentists:**
- "dentist" + {City}
- "cosmetic dentist" + {City}
- "dental clinic" + {City}

**Med spas:**
- "med spa" + {City}
- "aesthetic clinic" + {City}
- "botox" + {City}

**HVAC / Plumbing:**
- "hvac" + {City}
- "air conditioning repair" + {City}
- "plumber" + {City}

### 2.2 CSV / Google Sheet columns (copy headers)
Use these exact headers:

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy_last10,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

### 2.3 How to collect each field (fast workflow)
For each listing:
1) **Business name / phone / website / rating / review count / Maps URL:** from Google Business Profile panel.
2) **Last review date + personalization snippet:** open Reviews → sort by Newest → copy a short excerpt (8–20 words). If quoting feels risky, **paraphrase** (e.g., “customer mentioned long wait time”).
3) **Response-rate proxy (last 10):** in the newest 10 reviews, count how many have an “Owner response.”
   - Formula: response_rate_proxy_last10 = (owner_responses_in_last10 / 10)
4) **Email(s):** from the business website Contact page (best), then footer, then About page. If none: leave blank for now and keep as a “call/DM/contact form” prospect.

## 3) Segmentation + priority scoring (rules)
### 3.1 Segments
- **Not Responding:** response_rate_proxy_last10 <= 0.2
- **Low Rating:** google_rating < 4.2
- **High Volume:** review_count >= 200 OR last_review_date within 14 days

If multiple apply, keep the most painful in notes and pick the segment used for copy routing:
1) Low Rating (if rating < 4.2)
2) Not Responding (if response proxy low)
3) High Volume (otherwise)

### 3.2 Priority tiers
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** Not Responding OR Low Rating
- **Priority C:** High Volume only

## 4) Cold email — 3-step sequence (paste-ready, includes URL + contact)
Use tokens:
- {{first_name}} (if unknown: “there”)
- {{business_name}}, {{city}}, {{vertical}}
- {{recent_review_snippet}} (quote or paraphrase)
- {{response_gap}} (e.g., “looks like a few recent reviews didn’t get a reply”)

### 4.1 Email 1 — Not Responding variant
**Subject options:**
1) Quick idea for {{business_name}} reviews
2) Re: Google reviews in {{city}}
3) 12-hour review replies (you approve)

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s recent Google reviews and noticed: “{{recent_review_snippet}}”.

It also looks like **some recent reviews didn’t get an owner reply** (totally normal when you’re busy). We run a simple **Review Reply & Reputation Autopilot**: brand-safe draft responses for Google/Yelp, **we send within 12 hours**, and **you approve before anything posts**.

Week 1 is free so you can see if it actually saves time and improves responsiveness. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Want me to draft replies for your last 10 reviews and send them for approval?

— Bob
agent_bob_replit+review-bot@agentmail.to

### 4.2 Email 1 — Low Rating variant
**Subject options:**
1) Quick win for improving review perception
2) About the recent feedback on {{business_name}}
3) Responding to tough reviews (brand-safe)

Body:
Hi {{first_name}} — saw a recent Google review for {{business_name}} that mentioned: “{{recent_review_snippet}}”.

When a rating dips, one of the fastest ways to stabilize perception is **consistent, calm owner responses** + an internal escalation loop so the same issues don’t repeat.

We provide an **AI-assisted, brand-safe reply workflow** for Google/Yelp: negative reviews get flagged, we draft a de-escalating response, and you approve before posting. Week 1 is free to prove value. Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute call, or I can just send draft replies for your last 5 negative reviews?

— Bob
agent_bob_replit+review-bot@agentmail.to

### 4.3 Email 1 — High Volume variant
**Subject options:**
1) Keeping up with review volume at {{business_name}}
2) Review reply backlog?
3) Weekly review KPI report + replies

Body:
Hi {{first_name}} — {{business_name}} gets a lot of review activity. If you’re like most local operators, replying consistently becomes a time sink.

We handle **drafting + posting-ready replies** for Google/Yelp with a simple rule: **brand-safe, fast turnaround (12 hours), and you approve**. We also send a weekly KPI snapshot (new reviews, avg rating, response rate, negative themes).

Week 1 is free. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Should I draft replies for your 10 most recent reviews and send them over?

— Bob
agent_bob_replit+review-bot@agentmail.to

### 4.4 Follow-up #1 (Day 3)
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick bump. If it helps, I can send **3 sample replies** (1 positive, 1 neutral, 1 negative) based on your recent reviews so you can judge tone/fit.

Still worth doing a free Week 1 trial for {{business_name}}?

— Bob
agent_bob_replit+review-bot@agentmail.to

### 4.5 Follow-up #2 (Day 7)
Subject: Last try — free review replies

Hi {{first_name}} — last note. If review replies aren’t a priority, no worries.

If you want, reply with “YES” and I’ll:
1) draft replies for your last 10 Google reviews,
2) flag any negatives that need escalation,
3) send a simple weekly KPI snapshot.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

## 5) Daily sending ops (Week 1, no paid tools required)
### 5.1 Minimum viable stack (free)
- **CRM:** Google Sheets (or HubSpot Free)
- **Sending:** 1 inbox (agent_bob_replit+review-bot@agentmail.to) initially, low volume
- **Tracking:** none initially (prioritize deliverability)

### 5.2 14-day ramp (conservative)
- Days 1–2: 15/day (manual, highly personalized)
- Days 3–4: 25/day
- Days 5–7: 40/day
- Week 2: 60–80/day if bounce rate < 3% and spam complaints = 0

### 5.3 List hygiene + thresholds
- Verify obvious typos, avoid generic catch-alls where possible.
- Stop a list source if: **bounce rate > 5%** in a day.
- Reply SLA: **same day** for positive replies; **<12 hours** for “interested.”

## 6) CRM stages (simple, operational)
1) **Prospect (Unsent)** → has required fields + segment
2) **Sent** → date_sent, template_used
3) **Replied** → interested/neutral/not now
4) **Qualified** → has Google/Yelp access path + confirms pain (time, low rating, high volume)
5) **Demo Booked**
6) **Trial (Free Week 1)**
7) **Paid** (post-week-1)
8) **Lost** (reason logged)

## 7) Production targets to reach 500–1,000 leads (manual)
- 1 person can collect **50–80 leads/day** once workflow is practiced.
- Plan: **10 business days** → 500–800 leads.
- Prioritize **Priority A/B** first; don’t waste time on businesses with no website and no contact method.
