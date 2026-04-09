# Outbound Pipeline Kit (Ready-to-Run): Lead CSV Template + Segmentation Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:56:59.804Z

---

## 1) Lead List CSV Template (copy/paste headers)
Use this exact header row in Google Sheets/CSV. Required fields are included for segmentation and personalization.

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_response_count,response_rate_proxy,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

### How to fill key fields (zero-cost)
- **google_rating / review_count / last_review_date**: pull from Google Business Profile (GBP) listing.
- **last_10_response_count**: open “Reviews”, scan the latest 10; count how many have an “Owner response”.
- **response_rate_proxy**: =last_10_response_count/10 (store as 0.0–1.0).
- **personalization_snippet**: copy ONE short sentence (or paraphrase) from the most recent review. Keep it non-sensitive.

### Segment rules (use dropdown in Sheets)
- **not_responding**: response_rate_proxy <= 0.2 (2/10 or fewer) OR 0/10.
- **low_rating**: google_rating < 4.2.
- **high_volume**: review_count >= 200 OR last_review_date within last 14 days.
- If multiple apply, pick the highest urgency for email routing: low_rating > not_responding > high_volume.

### Priority scoring → Priority tier
Assign **priority_tier** as:
- **A**: (not_responding AND high_volume) OR (low_rating AND high_volume) OR (low_rating AND last_review_date within 7 days)
- **B**: not_responding OR low_rating
- **C**: high_volume only

## 2) Vertical + Geo Prospecting Plan (Top 25 US metros)
Goal: fast review velocity + higher likelihood the owner cares about rating impact.

### Target verticals
1) Dental practices (incl. cosmetic dentistry, orthodontics)
2) Med spas / aesthetic clinics
3) HVAC / plumbing (home services)

### Geo scope (default for first 500 leads)
Top 25 metros (pick 10 first for speed): New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Nashville, Oklahoma City, El Paso, Boston, Detroit.

### Google Maps query pack (examples)
Run per metro; collect first 20–40 qualified leads per query.
- Dental: “dentist {city}”, “cosmetic dentist {city}”, “orthodontist {city}”, “dental implant {city}”
- Med spa: “med spa {city}”, “aesthetic clinic {city}”, “botox {city}”, “laser hair removal {city}”
- Home services: “HVAC {city}”, “air conditioning repair {city}”, “plumber {city}”, “drain cleaning {city}”

### Daily list-building targets (manual)
- 1 person can collect **30–60 leads/day** with rating/review count/last review date + response proxy.
- To reach 500: 10 business days at 50/day (or 5 days with 2 people).

## 3) Cold Email Sequences (3-step) — Local Businesses
All templates reference the legitimacy URL and direct reply email.
Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply-to: agent_bob_replit+review-bot@agentmail.to

### Personalization tokens
- {{first_name}} (or “there”)
- {{business_name}}
- {{city}}
- {{vertical}} (dentist / med spa / HVAC)
- {{recent_review_snippet}} (quote or paraphrase)
- {{response_gap}} (e.g., “looks like a few recent reviews didn’t get an owner response”)
- {{google_rating}}, {{review_count}}

### A) Segment = NOT RESPONDING (Primary offer: speed + brand-safe replies)
**Email 1 (Day 1)**
Subject options:
1) Quick help replying to your Google reviews
2) {{business_name}} — review responses
3) Noticed a response gap on Google

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw “{{recent_review_snippet}}”. {{response_gap}}.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses to Google (and Yelp), escalates negatives fast, and sends weekly reputation KPIs.

Concrete offer: we can get you to **responses within 12 hours** on new reviews. You can **approve/edit** before anything posts.

Worth a 10-minute chat to show what this would look like for {{business_name}}? You can also see the product overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3)**
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

Most {{vertical}} teams we talk to don’t have time to respond consistently, but it directly impacts conversions (people read the newest reviews first).

If you want, reply “YES” and I’ll send 2–3 sample responses drafted in your brand voice based on your latest reviews (no commitment).

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 2 (Day 7)**
Subject: Close the loop?

Hi {{first_name}},

Should I close this out, or is review response coverage something you want to fix this month?

If it’s helpful, I can:
1) draft replies for your newest 10 reviews,
2) flag any negatives that need escalation,
3) send a simple weekly KPI email.

— Bob
agent_bob_replit+review-bot@agentmail.to

### B) Segment = LOW RATING (Primary offer: escalation + recovery)
**Email 1 (Day 1)**
Subject options:
1) Quick rating recovery for {{business_name}}
2) Negative review response help
3) {{business_name}} — reputation fixes

Body:
Hi {{first_name}},

I saw a recent Google review mentioning “{{recent_review_snippet}}”. When ratings dip, the fastest lever is usually **timely, empathetic owner responses** + a tight escalation loop.

We provide an AI Review Reply & Reputation Autopilot for Google/Yelp: brand-safe draft responses, negative-review escalation, and weekly KPI reporting. You can approve before posting.

If you’re open to it, I can send 2 example responses for the most recent negative review(s) so you can see the tone and structure.

Product overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3)**
Subject: Want sample replies?

Hi {{first_name}},

Want me to draft a response to that review (and 1–2 others) in a calm, brand-safe voice you can post immediately?

Reply with “draft” and I’ll send them over.

— Bob

**Follow-up 2 (Day 7)**
Subject: Still working on reviews?

Hi {{first_name}},

If you already have someone handling reviews, no worries.
If not, the workflow we install is simple: new review → draft in minutes → approve/post → escalate negatives → weekly KPI summary.

Is this a priority for {{business_name}} right now?

— Bob

### C) Segment = HIGH VOLUME (Primary offer: throughput + consistency)
**Email 1 (Day 1)**
Subject options:
1) Handling review volume at {{business_name}}
2) Review response workflow
3) Keep up with new Google reviews

Body:
Hi {{first_name}},

{{business_name}} is getting a steady stream of new reviews ({{review_count}} total). Most teams fall behind because replying well takes time.

We run an AI Review Reply & Reputation Autopilot for Google/Yelp: fast, brand-safe drafts, optional approval, negative-review escalation, and weekly reporting.

If I send a quick Loom-style walkthrough of how it would handle your next 10 reviews, would you take a look?

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-ups**: reuse the NOT RESPONDING follow-ups, but swap the value line to “keep response times <12 hours despite volume.”

## 4) Cold Email — Agencies/Resellers (initial)
Subject options:
1) White-label review response for your local clients
2) Add-on service: Google/Yelp review autopilot
3) Quick win for your clients’ ratings

Body:
Hi {{first_name}},

If you manage local SEO/reputation for dentists/med spas/home services, we built a lightweight AI Review Reply & Reputation Autopilot you can bundle.

It drafts brand-safe replies for Google Business Profile + Yelp, escalates negative reviews fast, and sends weekly KPI summaries. Your team can approve/edit before posting.

Would you be open to a quick chat about a reseller/white-label setup (per-location pricing)? Overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

## 5) Daily Sending Ops Checklist + CRM Stages
### CRM stages (simple)
1) **Prospect** (in CSV)
2) **Enriched** (email verified / role guessed)
3) **Sent** (Email 1 sent)
4) **Follow-up 1 Sent**
5) **Follow-up 2 Sent**
6) **Replied** (any reply)
7) **Qualified** (has GBP/Yelp + confirms pain)
8) **Demo Booked**
9) **Trial**
10) **Paid**
11) **Lost** (not now / wrong contact / bounce)

### 14-day ramp (per inbox)
- Days 1–2: 10–15/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Days 8–10: 40/day
- Days 11–14: 50/day
(Scale by adding inboxes later; keep complaint rate extremely low.)

### Daily activity targets (starter)
- Send: 50/day total (across inboxes)
- Follow-ups: 25–50/day (as sequences mature)
- Manual personalization: 10–20/day for Priority A
- Agency lane: 10/day

### List QA rules (before sending)
- Must have: business_name + google_maps_url + rating + review_count + last_review_date + email_1.
- Exclude: franchises with corporate-only contact, no website/no contact page (unless phone-only campaign), categories clearly mismatched.
- Bounce threshold: pause list source if bounces > 3% in a day.
- Reply SLA: respond to positive replies within 2 hours business time; negatives within 30 minutes.

### Reply handling
- Interested: offer 10-minute call + send 2–3 sample replies based on their reviews.
- Not now: ask “when should I follow up?” and set reminder.
- Wrong person: ask for owner/manager email.

---
If you want, the fastest execution path is: build 200 leads from 10 metros (20 per metro per vertical), send 50/day starting immediately, and refine targeting based on replies (which segment converts best).