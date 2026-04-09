# Outbound Pipeline Kit — Lead CSV Template + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:50:17.277Z

---

## 1) Lead List CSV Template (copy headers into Google Sheets)
**File name:** review-reply-autopilot_leads_v1.csv

### Column headers
business_name,vertical,city,state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_reviews_owner_responses_count,response_rate_proxy,segment,priority,personalization_snippet,contact_name,contact_role_guess,email_1,email_2,notes

### Data dictionary (how to fill)
- **vertical**: Dental | Med Spa | HVAC/Plumbing | Agency
- **google_rating**: from Google Business Profile
- **review_count**: total Google reviews
- **last_review_date**: date of most recent review
- **last_10_reviews_owner_responses_count**: count owner/management replies in the last 10 reviews (manual check)
- **response_rate_proxy**: =last_10_reviews_owner_responses_count/10 (format as %)
- **segment** (set via rules below)
- **priority**: A/B/C (rules below)
- **personalization_snippet**: 1–2 sentences from the most recent review OR a safe paraphrase (avoid medical claims; don’t mention sensitive info)
- **email_1/email_2**: best available manager/owner email (website contact page first; then LinkedIn/about)

### Segmentation rules (Sheets-friendly)
Use these thresholds:
- **Not Responding**: response_rate_proxy <= 0.2 OR last_10_reviews_owner_responses_count = 0
- **Low Rating**: google_rating < 4.2
- **High Volume**: review_count >= 200 OR (TODAY()-last_review_date) <= 14

If multiple apply, keep the most revenue-urgent first:
1) low_rating_high_volume
2) not_responding_high_volume
3) low_rating
4) not_responding
5) high_volume

### Priority scoring
- **Priority A**: (High Volume AND (Not Responding OR Low Rating))
- **Priority B**: (Not Responding OR Low Rating) without High Volume
- **Priority C**: High Volume only

## 2) Prospecting Plan (to reach 1,000 leads)
### Recommended geography for v1: Top 25 US metros
Reason: dense SMB volume, frequent reviews, better odds of professional management emails on websites.

### Build targets (1,000 total)
- Dental: 350
- Med Spa/Aesthetics: 350
- HVAC/Plumbing: 250
- Agencies (reseller lane): 50

### Segment mix targets (aim)
- Priority A: 35% (highest conversion)
- Priority B: 45%
- Priority C: 20%

### Query patterns (Google Maps)
Use metro + keyword combos:
- Dental: "dentist", "cosmetic dentist", "dental clinic"
- Med Spa: "med spa", "aesthetic clinic", "botox", "laser hair removal"
- HVAC/Plumbing: "HVAC", "air conditioning repair", "plumber", "emergency plumber"

Agency lane:
- "dental marketing agency", "med spa marketing", "HVAC marketing agency", "local SEO agency" + metro

## 3) Cold Email Sequence Pack (direct-to-local + agency)
All emails must include:
- Proof/legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-65mml106.picard.replit.dev/sites/1
- Reply-to/contact: agent_bob_replit+review-bot@agentmail.to

### A) Direct-to-Local — Email 1 (Not Responding variant)
**Subject options:**
1) Quick fix for your Google reviews
2) Noticed a response gap on your reviews
3) Can I help handle review replies for {{business_name}}?

**Body:**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”. It looks like a few recent reviews haven’t gotten a response.

We built a simple Review Reply & Reputation Autopilot that drafts brand-safe replies for Google + Yelp, escalates negative reviews, and sends a weekly KPI report. You can approve replies before they post, and we target responding within ~12 hours.

If you want to sanity-check it, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-65mml106.picard.replit.dev/sites/1

Open to a 10-minute call this week to see if we can handle review responses for {{business_name}}?

— Bob
agent_bob_replit+review-bot@agentmail.to

### B) Direct-to-Local — Email 1 (Low Rating variant)
**Subject options:**
1) Reputation quick win for {{business_name}}
2) A way to reduce damage from negative reviews
3) Review response help (Google + Yelp)

**Body:**
Hi {{first_name}},

I saw a recent review for {{business_name}}: “{{recent_review_snippet}}”. When negative reviews sit without a response, it tends to compound (prospects assume the issue is unresolved).

We run an AI-assisted reputation autopilot: draft brand-safe replies for Google/Yelp, route negative reviews to you immediately, and provide weekly KPIs (rating trend, response rate, unresolved issues). You approve anything sensitive.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-65mml106.picard.replit.dev/sites/1

Want me to show you what a safer, de-escalating response would look like for that review? If you reply “yes,” I’ll send a draft.

— Bob
agent_bob_replit+review-bot@agentmail.to

### C) Direct-to-Local — Email 1 (High Volume variant)
**Subject options:**
1) Keeping up with review volume at {{business_name}}
2) Review response coverage in 12 hours
3) Outsource review replies (Google/Yelp)

**Body:**
Hi {{first_name}},

{{business_name}} gets a lot of reviews — congrats. The hard part is staying fast/consistent with responses while the team is busy.

We built a Review Reply & Reputation Autopilot that drafts on-brand replies for Google + Yelp, flags anything negative, and reports weekly KPIs. You can approve replies, and we aim for <12-hour response time.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-65mml106.picard.replit.dev/sites/1

Worth a quick call to see if we can take review responses off your plate?

— Bob
agent_bob_replit+review-bot@agentmail.to

### D) Follow-up 1 (2–3 days later)
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}},

Quick bump — do you want us to handle Google/Yelp replies for {{business_name}}?

If you share a link to your GBP, I can send 2–3 example replies (positive + negative) in your tone. If it’s not useful, no worries.

— Bob
agent_bob_replit+review-bot@agentmail.to

### E) Follow-up 2 (5–7 days later)
**Subject:** Close the loop?

Hi {{first_name}},

Should I close the loop here, or is review response coverage something you want to improve this month?

Either way, here’s the site again for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-65mml106.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

### F) Agency/Reseller — Email 1
**Subject options:**
1) Add “review reply management” to your retainers
2) White-label review response coverage (Google/Yelp)
3) Quick reseller idea for local clients

**Body:**
Hi {{first_name}},

If you manage local SEO/reputation for {{agency_name}} clients: we built a Review Reply & Reputation Autopilot for Google Business Profile + Yelp.

It drafts brand-safe replies, escalates negative reviews instantly, and sends weekly KPIs. Agencies can position it as “<12-hour review response coverage” and either resell it or bundle into retainers.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-65mml106.picard.replit.dev/sites/1

Open to a 10-minute chat? If you tell me your main vertical (dental/med spa/home services), I’ll share a suggested packaging + pricing.

— Bob
agent_bob_replit+review-bot@agentmail.to

## 4) Daily Sending Ops + CRM
### CRM stages (simple)
Prospect → Ready to Send (validated) → Sent → Replied → Qualified → Demo Booked → Trial/Pilot → Paid → Lost

### Minimum daily activity targets (single inbox)
- New prospects added + validated: 25/day
- New sends: 50/day (ramp up)
- Follow-ups: 25/day
- Manual personalization: 10/day for Priority A

### 14-day ramp (per inbox)
Day 1–2: 20/day
Day 3–4: 35/day
Day 5–7: 50/day
Day 8–10: 75/day
Day 11–14: 100/day
Rules: stop increases if bounce rate > 3% or spam complaints > 0.1%.

### List QA checklist (before sending)
- Website exists and matches business name
- Exclude franchises with corporate-only contacts unless local manager email found
- Confirm category matches vertical (avoid “school”, “supply store”, “training center”)
- Ensure at least one valid email; if none, put into “Needs Enrichment” and do not send

### Reply handling SLA
- Respond to interested replies within 2 business hours
- For “send me info”: reply with 3-bullet overview + booking link (owner supplies) + reference site URL
- For objections: use 2-line rebuttal + offer to draft 1 sample reply from their latest review

---
If you confirm geography (Top 25 metros vs 5–10 states), this kit becomes a single operating system: build list → segment/priority → send sequence → manage replies → move to demo/trial.