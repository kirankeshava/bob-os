# Outbound Pipeline Kit (Zero-Cost): 500–1,000 Lead CSV Template + Query Pack + Segmentation/Scoring + Cold Emails + Daily Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T20:43:50.972Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit (Week 1 / $0)

## 0) Business identifiers to include in outreach
- Legitimacy URL (include in emails when appropriate): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Reply-to / contact: agent_bob_replit+review-bot@agentmail.to
- Sender name: Bob

---

## 1) Vertical focus (3 lanes)
1) Dentists / Dental clinics
2) Med spas / Aesthetic clinics
3) HVAC + Plumbing (home services)

Secondary lane (for later in the week): marketing agencies that serve these verticals.

---

## 2) Recommended geography (fastest path to 500–1,000)
Use **Top 25 US metros** so you get enough density + high review volume.

Suggested metros (copy/paste list):
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

---

## 3) Copy/paste Google Maps query pack (by vertical)
Run these searches in Google Maps (or Google search with “site:google.com/maps”):

### Dental
- “dentist in {{metro}}”
- “cosmetic dentist in {{metro}}”
- “family dentistry in {{metro}}”

### Med spa
- “med spa in {{metro}}”
- “aesthetic clinic in {{metro}}”
- “botox in {{metro}}” (often yields high-intent listings)

### HVAC / Plumbing
- “HVAC company in {{metro}}”
- “air conditioning repair in {{metro}}”
- “plumber in {{metro}}”

**Collection rules (important):**
- Prefer independent locations (skip obvious national franchises unless locally owned).
- Prefer businesses with **review_count ≥ 75** (or ≥ 50 if metro is small).
- Capture “last review date” and whether owner responds.

---

## 4) Lead list CSV template (columns)
Create a Google Sheet with these headers (export to CSV later):

business_name,vertical,city_state,metro,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_owner_responses_count,response_rate_proxy,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

### Data dictionary (what each field means)
- **last_10_owner_responses_count**: count of owner/management responses visible in the last 10 reviews.
- **response_rate_proxy**: last_10_owner_responses_count / 10 (as %).
- **personalization_snippet**: 1–2 short lines from the most recent review OR a paraphrase (avoid sensitive info).
- **segment**: one of {not_responding, low_rating, high_volume, mixed}.
- **priority_tier**: one of {A, B, C}.

---

## 5) Segmentation rules (simple + consistent)
Compute these fields as you collect:

### Response proxy
- response_rate_proxy = (last_10_owner_responses_count/10)*100

### Segment assignment
- **not_responding** if response_rate_proxy ≤ 20 (0–2 responses in last 10)
- **low_rating** if google_rating < 4.2
- **high_volume** if review_count ≥ 200 OR last_review_date within last 14 days
- **mixed** if multiple conditions apply (e.g., low_rating + not_responding)

### Priority tiers (outreach order)
- **Priority A**: (not_responding AND high_volume) OR (low_rating AND high_volume) OR (mixed AND high_volume)
- **Priority B**: not_responding OR low_rating (without high_volume)
- **Priority C**: high_volume only (rating ok, some responses)

---

## 6) Cold email sequences (3 steps) — include URL + email
Use {{tokens}} from the CSV.

### 6A) Base offer (consistent across verticals)
- “We draft brand-safe replies to Google (and Yelp if you have it). You approve. We can respond within 12 hours. Negative reviews get escalated. Weekly KPI recap.”
- Week 1 offer: **Free setup + free 7-day trial**.

### 6B) Sequence — NOT RESPONDING (Variant NR)
**Email 1 (NR)**
Subject options:
1) Quick idea for {{business_name}}’s Google reviews
2) Noticed you’re getting reviews (but few replies)
3) 12-hour review replies for {{business_name}}?

Body:
Hi {{owner_or_manager_name | there}},

I was looking at {{business_name}} on Google — you’re getting new reviews (latest: “{{personalization_snippet}}”), but it looks like there aren’t many owner replies recently.

We built a simple “review reply autopilot” that drafts **brand-safe** responses for Google (and Yelp if you use it). You can approve/edit, and we can keep replies within **12 hours**, with negative reviews escalated.

If it’s helpful, I can set this up free for 7 days so you can see the impact on responsiveness + rating.

Want me to send 2–3 sample replies for your latest reviews?

— Bob
{{legitimacy_url}}
Reply: agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (NR) — 2 days later**
Subject: Re: replies for {{business_name}}

Hi {{owner_or_manager_name | there}},

Totally understand if review replies are “important but never urgent.” That’s exactly what this is meant to solve.

If you share 1 link to your Google profile (or just confirm it’s {{google_maps_url}}), I’ll draft replies for your last 3 reviews and you can tell me if the tone matches your brand.

— Bob
{{legitimacy_url}}

**Follow-up 2 (NR) — 4–5 days later**
Subject: Should I close the loop?

Hi {{owner_or_manager_name | there}},

Should I close the loop on this? If you want, I can run a 7-day trial where we:
1) Draft replies daily
2) Escalate any negative review immediately
3) Send a weekly KPI recap (new reviews, reply rate, avg rating)

Yes/no works.
— Bob


### 6C) Sequence — LOW RATING (Variant LR)
**Email 1 (LR)**
Subject options:
1) Quick fix for rating drag at {{business_name}}
2) Reducing 1-star fallout (without sounding scripted)
3) Reputation follow-up system for {{business_name}}

Body:
Hi {{owner_or_manager_name | there}},

I saw {{business_name}}’s Google rating is around {{google_rating}}. One thing that often helps fast is consistent, calm responses to negative reviews (and a clean escalation path internally).

We built an autopilot that drafts brand-safe replies (Google + Yelp) and flags/escales negatives so you can recover issues before they snowball. You approve everything.

If you’d like, I can draft a response to this recent review:
“{{personalization_snippet}}”

Want me to send a proposed reply you can post today?

— Bob
{{legitimacy_url}}
Reply: agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (LR)**
Subject: Re: proposed reply

Hi {{owner_or_manager_name | there}},

Even 3–5 strong owner responses can change how new customers interpret older negatives.

If you reply with “OK”, I’ll send:
- 1 reply for the most recent negative review
- 2 replies for recent positive reviews (so the profile looks active)

— Bob

**Follow-up 2 (LR)**
Subject: last try

Hi {{owner_or_manager_name | there}},

Last try—if rating management isn’t a focus right now, no worries. If you want a free 7-day run, we’ll handle daily drafts + escalations and send a simple KPI recap at the end.

Should I set it up?
— Bob


### 6D) Sequence — HIGH VOLUME (Variant HV)
**Email 1 (HV)**
Subject options:
1) Keeping up with {{review_count}} reviews at {{business_name}}
2) Scaling review replies without adding staff
3) 12-hour review reply coverage

Body:
Hi {{owner_or_manager_name | there}},

{{business_name}} has {{review_count}} Google reviews and you’re still getting new ones (latest: “{{personalization_snippet}}”). When volume is high, the hard part is keeping reply times consistent.

We help local businesses respond on Google/Yelp with brand-safe drafts, 12-hour turnaround, negative review escalation, and a weekly KPI recap. You approve/edit—nothing posts without your say.

Want me to send 3 sample replies matched to your tone?

— Bob
{{legitimacy_url}}
Reply: agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (HV)**
Subject: Re: sample replies

Hi {{owner_or_manager_name | there}},

If it helps, we can start with “reply backlog cleanup” (last 20 reviews) and then switch to daily coverage.

Where should I send the samples?
— Bob

**Follow-up 2 (HV)**
Subject: close the loop?

Hi {{owner_or_manager_name | there}},

Should I close the loop? Happy to run it free for 7 days and send a KPI recap (reply rate, avg rating, review velocity).

— Bob


### 6E) Agency/reseller opener (sell to marketing agencies)
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on service for GBP reviews (done-for-you)

Body:
Hi {{name | there}},

Do you manage Google Business Profiles for local clients (dental/med spa/home services)?

We built a small “review reply autopilot” that drafts brand-safe responses (Google + Yelp), escalates negatives, and sends weekly reputation KPIs. It’s designed to be white-labeled and fast (12-hour coverage). Free 7-day pilot.

If you tell me your top client vertical, I’ll send a one-page process + example replies you can resell.

— Bob
{{legitimacy_url}}
Reply: agent_bob_replit+review-bot@agentmail.to

---

## 7) Daily sending ops (Week 1, $0 stack)
### Tooling assumptions (free)
- Gmail/Workspace already available OR a single free email inbox.
- CRM: HubSpot Free (recommended) or Airtable Free.
- Tracking: none in week 1 (avoid deliverability risk). Use CRM “Sent date” + manual logging.

### 14-day ramp (per inbox)
- Day 1–2: 20 new/day
- Day 3–4: 30 new/day
- Day 5–7: 40 new/day
- Day 8–10: 50 new/day
- Day 11–14: 60 new/day

Follow-ups: send FU1 and FU2 daily to the appropriate prior cohorts.

### List QA rules (before sending)
- Must have: business_name, metro, google_maps_url, google_rating, review_count, last_review_date
- Must have at least one contact path: email_1 OR website contact form OR phone (for fallback)
- Exclude if: duplicate location, wrong category, P.O. box only, dead website, obviously spam listing

### Bounce/complaint thresholds
- If bounces > 5% in a day: pause, clean list, fix obvious bad domains
- If any spam complaints: reduce volume immediately and tighten targeting

### Reply handling SLA
- Reply within 2 business hours.
- If they ask “price”: Week 1 is free trial; offer to start same-day and send sample replies first.

---

## 8) CRM pipeline stages (simple)
1) Prospect (in CSV, not yet contacted)
2) Sent (Email 1 sent)
3) Replied
4) Qualified (has GBP/Yelp + has review volume + agrees to see samples)
5) Demo Booked (or “Setup Call Booked”)
6) Trial Active (7 days)
7) Converted (paid later)
8) Lost (no fit / no response after FU2)

**Entry/exit criteria:**
- Move to Qualified when they confirm the GBP link + decision-maker.
- Move to Trial Active once they provide access/approval workflow.

---

## 9) What the owner/VA should do next (48-hour sprint)
1) Pick 10 metros from the list above.
2) For each vertical, pull 20–30 leads per metro (aim 200 total in 48 hours).
3) Compute response_rate_proxy from last 10 reviews.
4) Assign segment + priority_tier.
5) Start sending Priority A first using the matching variant (NR/LR/HV).

If you want, send me a 30-row sample CSV export and I’ll QA it and tighten filters before you scale to 500–1,000.
