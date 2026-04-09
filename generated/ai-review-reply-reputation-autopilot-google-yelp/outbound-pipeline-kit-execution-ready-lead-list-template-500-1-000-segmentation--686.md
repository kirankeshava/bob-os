# Outbound Pipeline Kit (Execution-Ready): Lead List Template (500–1,000) + Segmentation/Scoring + Cold Email Sequences + Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:32:33.428Z

---

## 1) Scope decision (to start now)
**Recommended default:** Top 25 US metros (fastest path to 500–1,000 leads; high review velocity).
Metros: New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, San Francisco, Columbus, Fort Worth, Indianapolis, Charlotte, Seattle, Denver, Washington DC, Boston, Nashville, Detroit, Oklahoma City, Portland.

## 2) Lead list CSV template (copy headers exactly)
business_name,vertical,category_on_google,city_state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,owner_response_in_last_10,owner_responses_last_10,response_rate_proxy,segment_not_responding,segment_low_rating,segment_high_volume,priority_tier,contact_name,role_guess,email_1,email_2,linkedin_url,notes

### Data dictionary (how to fill)
- **google_rating / review_count:** from Google Business Profile panel.
- **last_review_date / last_review_snippet:** open Reviews → sort by newest (if available) → capture date + 1–2 sentence excerpt (or paraphrase if safer).
- **owner_responses_last_10:** count responses by owner in last 10 reviews (0–10).
- **response_rate_proxy:** =owner_responses_last_10/10.
- **Segments (TRUE/FALSE):**
  - not_responding: response_rate_proxy<=0.2 OR owner_responses_last_10=0
  - low_rating: google_rating<4.2
  - high_volume: review_count>=200 OR last_review_date within 14 days
- **Priority tier:**
  - A: (not_responding AND high_volume) OR (low_rating AND high_volume)
  - B: (not_responding) OR (low_rating)
  - C: high_volume only

## 3) Google Maps query pack (copy/paste search strings)
Run each query in Google Maps, filter/scroll, and collect qualifying businesses.

### Dentists
- "Dentist" + {metro}
- "Cosmetic dentist" + {metro}
- "Emergency dentist" + {metro}

### Med Spas / Aesthetics
- "Med spa" + {metro}
- "Aesthetic clinic" + {metro}
- "Botox" + {metro}

### HVAC / Plumbing (Home Services)
- "HVAC" + {metro}
- "Air conditioning repair" + {metro}
- "Plumber" + {metro}

**Qualification rules (quick):**
- Must have an active GBP with >=30 reviews (skip tiny profiles unless rating <4.2).
- Prefer independents (skip obvious national franchises unless location manager email is available).
- Must have a website or a public contact email somewhere online.

## 4) Cold email sequences (3-step) — direct-to-business
Use personalization tokens: {{business}}, {{city}}, {{recent_review_snippet}}, {{response_gap_fact}}, {{rating}}, {{review_count}}.
Include legitimacy links: Website = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1 | Contact = agent_bob_replit+review-bot@agentmail.to

### 4A) Segment: NOT RESPONDING (works for all 3 verticals)
**Subject options:**
1) Quick fix for your Google reviews at {{business}}
2) Noticed a response gap on your reviews
3) 12-hour review replies for {{business}}

**Email 1 (Day 1)**
Hi {{first_name}} — Bob here.

I was looking at {{business}}’s Google reviews in {{city}} and saw a recent one: “{{recent_review_snippet}}”. It looks like there aren’t many owner replies lately ({{response_gap_fact}}).

We run an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** responses for Google (and Yelp), escalates negative reviews, and sends a weekly KPI report. You can **approve replies before posting**, or we can run fully-managed.

If I send 3 example replies for your most recent reviews, would you like **polite & brief** or **warm & detailed**?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3)**
Subject: Want me to draft a few replies for {{business}}?

{{first_name}}, happy to do a quick sample.

If you share (1) preferred tone and (2) who should be alerted on 1–2★ reviews, I’ll draft responses for 3 recent Google reviews and you can decide if it’s worth automating.

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 2 (Day 7)**
Subject: Close the loop?

Last note — most local businesses see a lift in calls/bookings when review replies are consistent.

Should I send the 3 sample replies for {{business}}, or is this not a priority right now?

— Bob

### 4B) Segment: LOW RATING (apology + escalation angle)
**Subject options:**
1) Improving your rating without “generic” replies
2) A simple review-response system for {{business}}
3) Quick help with reputation + follow-up

**Email 1 (Day 1)**
Hi {{first_name}} — Bob here.

I noticed {{business}} is at about {{rating}} on Google with {{review_count}} reviews. One recent review said: “{{recent_review_snippet}}”.

We help local businesses respond **fast and on-brand**, and we **escalate negative reviews** so your team can follow up offline (instead of letting issues sit publicly). The system drafts responses for Google/Yelp and sends weekly KPIs (reply speed, % responded, rating trend).

Open to a 10-minute call this week? If you prefer, I can send a couple sample replies first.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
— Bob | agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3)**
Subject: Sample replies for the last 2–3 reviews?

If you point me to your Google profile link, I’ll draft responses that (1) acknowledge concerns, (2) protect the brand, and (3) move the convo offline.

Want the tone to be more clinical/professional or friendly/empathetic?

— Bob

**Follow-up 2 (Day 7)**
Subject: Should I stop reaching out?

Totally fine if timing’s off. If you want, I’ll send sample replies + a simple weekly KPI report example.

— Bob

### 4C) Segment: HIGH VOLUME (operations + speed)
**Subject options:**
1) Keeping up with review volume at {{business}}
2) We can respond within 12 hours (Google/Yelp)
3) Review replies without adding admin work

**Email 1 (Day 1)**
Hi {{first_name}} — Bob here.

{{business}} gets a lot of reviews ({{review_count}}). Many teams want to reply consistently but it becomes a time sink.

Our autopilot drafts brand-safe responses for Google/Yelp, flags anything sensitive/negative for human review, and produces a weekly KPI email. Typical goal: **reply within 12 hours** without adding workload.

If I send an example weekly KPI report + 3 sample replies, who’s the right person to review them?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-ups:** reuse NOT RESPONDING follow-ups (Day 3/Day 7).

## 5) Agency / reseller lane (marketing agencies serving these verticals)
### Agency Email 1
Subject: Add “review replies + reputation KPIs” to your retainers

Hi {{first_name}} — Bob here.

We built an **AI Review Reply & Reputation Autopilot** for Google + Yelp: brand-safe draft replies, negative review escalation, and weekly KPI reporting.

Agencies resell it as an add-on (or bundle into local SEO). We can run it white-label-ish: you stay client-facing; we provide the system + reporting.

Want a quick partner walkthrough? Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
— Bob | agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (Day 3): “Should I send pricing/margin options?”
Follow-up 2 (Day 7): “Worth a 10-min partner call?”

## 6) Daily sending ops (14-day ramp + QA)
**List QA (daily, before sending):**
- Verify category fit + local business (not directory, not franchise HQ).
- Ensure Google Maps URL works.
- Ensure at least one contact method: website contact page or email found.
- Random sample 10% for accuracy (rating/review_count/last_review_date).

**Ramp schedule (per inbox):**
- Days 1–2: 10–15/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Week 2: 40–60/day (only if bounces <3% and complaints ~0)

**Targets (single inbox starting point):** 30–60 new emails/day + follow-ups.

**Reply handling SLA:**
- Same business day for positive replies
- <2 hours for demo requests

**Hard thresholds (pause sends if hit):**
- Bounce rate >5% in a day
- Spam complaint >0.1%

## 7) CRM pipeline (simple stages)
Prospect (not contacted) → Sent (E1) → Follow-up 1 → Follow-up 2 → Replied → Qualified → Demo Booked → Trial/Setup → Paid → Lost.
**Qualified definition:** has Google/Yelp presence + agrees review replies are currently inconsistent OR rating improvement is a priority + has authority/budget.

## 8) Production math to reach 1,000 leads (no paid tools)
- 1 VA (or owner) at ~25–40 leads/hour once practiced.
- 1,000 leads = ~25–40 hours of collection + enrichment.
- Start with 200 Priority-A/B leads (high urgency), begin sending immediately while list continues to grow.
