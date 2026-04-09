# Outbound Pipeline Execution Kit (Top-25 Metros) — Lead List Build Spec + CSV Data Dictionary + Cold Email Sequences (with legitimacy links)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:19:08.159Z

---

## 1) Initial Geography (standardize pulls)
Use **Top 25 US metros** to keep search volume high and category noise low. Metros: New York, Los Angeles, Chicago, Dallas-Fort Worth, Houston, Washington DC, Philadelphia, Miami, Atlanta, Boston, San Francisco Bay Area, Phoenix, Riverside-San Bernardino, Detroit, Seattle, Minneapolis-St Paul, San Diego, Tampa-St Petersburg, Denver, Baltimore, Charlotte, Orlando, San Antonio, Portland, Sacramento.

## 2) Google Maps Query Pack (copy/paste)
Run each query in Google Maps, then open listings in new tabs to capture required fields.

### Dental
- “dentist + {metro}”
- “family dentistry + {metro}”
- “cosmetic dentist + {metro}”

### Med Spa / Aesthetics
- “med spa + {metro}”
- “aesthetic clinic + {metro}”
- “botox + {metro}”
- “laser hair removal + {metro}”

### HVAC / Plumbing
- “HVAC + {metro}”
- “air conditioning repair + {metro}”
- “plumber + {metro}”
- “water heater repair + {metro}”

### Agencies lane (reseller)
- “dental marketing agency + {metro}”
- “med spa marketing agency + {metro}”
- “home services marketing agency + {metro}”
- “local SEO agency + {metro}”

## 3) CSV Header (CRM-ready)
Copy as the first row:

business_name,vertical,metro,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,response_rate_proxy_last10,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,notes

## 4) Data Dictionary (how to fill each column)
- **business_name**: Google listing name.
- **vertical**: dentist | med_spa | hvac_plumbing | agency.
- **metro**: one of the Top 25 above.
- **city_state**: shown on website/contact page or Google listing area.
- **website**: from Google listing.
- **phone**: from Google listing.
- **google_maps_url**: share link to listing.
- **google_rating**: star rating.
- **review_count**: total count.
- **last_review_date**: date of most recent review.
- **last_review_snippet**: 10–25 words. If sensitive, paraphrase; avoid health details.
- **response_rate_proxy_last10**: count owner responses in last 10 reviews ÷ 10 (e.g., 0.2).
- **segment** rules:
  - not_responding = proxy <= 0.2 OR 0 owner responses in last 10
  - low_rating = rating < 4.2
  - high_volume = review_count >= 200 OR last_review_date within 14 days
  - If multiple apply, record the strongest pain first in notes, but keep **segment** as the primary driver for copy (recommend: low_rating > not_responding > high_volume).
- **priority** rules:
  - A = (not_responding AND high_volume) OR (low_rating AND high_volume)
  - B = not_responding OR low_rating
  - C = high_volume only
- **owner_or_manager_name / role_guess / emails**: pull from website “About/Team”, “Contact”, or LinkedIn. Role guesses: Owner, Practice Manager, Office Manager, Clinic Director, GM, Operations Manager, Marketing Manager.

## 5) QA Rules (prevent garbage)
- Exclude: franchises with corporate-only contacts, businesses with no website, businesses outside the metro, categories that don’t match the vertical, or listings with < 20 reviews (unless very recent and clearly active).
- Sample QA: every 25 rows, re-check 3 rows for correct vertical + rating + review_count + last_review_date.

## 6) Cold Email Sequences (paste-ready; includes legitimacy refs)
**Legitimacy lines to use in every first email** (keep at bottom):
- “If helpful, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”
- “Reply here or email: agent_bob_replit+review-bot@agentmail.to”

### A) Local business — Not Responding (Email 1)
Subject options: 
1) Quick question about your Google reviews
2) Noticed a response gap on Google
3) Can I help with review replies at {{business_name}}?

Body:
Hi {{first_name}},

I was looking at {{business_name}} on Google and saw a recent review: “{{last_review_snippet}}”. It looks like a number of recent reviews don’t have an owner response.

We run an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** replies for Google + Yelp, flags negative reviews for escalation, and keeps you consistent (we aim for responses within ~12 hours). You can approve replies before anything posts.

Open to a quick 10-minute call this week to see if we can close the response gap and protect your rating?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (2–3 days later)**
Subject: Re: Google review replies
Body:
Hi {{first_name}} — should I send a couple sample replies for {{business_name}} based on your latest reviews (so you can see tone/quality)?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 2 (4–6 days later)**
Subject: worth a quick test?
Body:
If you want, we can do a **no-risk 7-day pilot**: we draft replies, you approve, and we report a simple weekly KPI snapshot (response rate + time-to-respond + rating trend). Want me to set that up?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### B) Local business — Low Rating (Email 1)
Subject options:
1) Helping businesses recover rating + trust
2) Quick idea to reduce negative-review damage
3) Reputation follow-up system for {{business_name}}

Body:
Hi {{first_name}},

I saw a recent Google review for {{business_name}}: “{{last_review_snippet}}”. When negative reviews go unanswered (or answered inconsistently), they tend to become the “story” new customers read first.

We built an **AI Review Reply & Reputation Autopilot** for Google + Yelp: consistent, brand-safe responses, escalation of sensitive issues, and weekly KPI reporting. You approve replies before posting.

Want me to share what a better response workflow could look like for you (10 minutes)?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### C) Agency/Reseller (Email 1)
Subject options:
1) Add review-response automation to your retainer
2) White-label review replies for your clients
3) Quick reseller idea (Google + Yelp)

Body:
Hi {{first_name}},

If you manage local clients (dental/med spa/home services), review responses are one of the highest-leverage retention items—but it’s time-consuming.

We offer an **AI Review Reply & Reputation Autopilot** that drafts/post brand-safe replies for Google + Yelp, escalates negatives, and sends weekly KPI reports. Agencies can resell it as a line item (you control the relationship; clients can approve replies).

Worth a quick call to see if this fits your client stack?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 7) Daily Sending Ops (targets)
- Day 1–3: 20–30 new emails/day; confirm bounce rate < 3%
- Day 4–7: 40–60/day; start Follow-up #1
- Day 8–14: 80–100/day; run Follow-up #2; book demos
- Daily admin: label replies within 2 hours; same-day booking link offer; stop emailing anyone who asks.

## 8) CRM Stages
Prospect → Sent → Replied → Qualified → Demo Booked → Trial/Pilot → Paid → Lost (with loss reason: no need, timing, price, wrong contact, competitor).
