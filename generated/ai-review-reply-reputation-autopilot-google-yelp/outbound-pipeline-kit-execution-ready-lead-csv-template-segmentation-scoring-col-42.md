# Outbound Pipeline Kit (Execution-Ready): Lead CSV Template + Segmentation/Scoring + Cold Email Sequences (w/ Website URL) + Daily Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:21:47.774Z

---

## 1) Lead List CSV Template (copy/paste headers)
Use these columns in a CSV/Google Sheet. This is designed so a VA can fill from Google Business Profile (and optionally Yelp) in <3 minutes/lead.

**Columns (in order):**
lead_id, vertical, business_name, city, state, metro, website, phone, google_maps_url, yelp_url, google_rating, google_review_count, last_review_date, last_review_excerpt, owner_response_in_last10 (0-10), response_rate_proxy_pct, segment_not_responding (Y/N), segment_low_rating (Y/N), segment_high_volume (Y/N), priority_tier (A/B/C), contact_name, contact_role_guess, email_1, email_2, linkedin_url, personalization_hook, notes, assigned_sequence, send_status

### Segmentation rules (enter as formulas or apply as rules)
- **response_rate_proxy_pct** = owner_response_in_last10 / 10
- **segment_not_responding** = Y if response_rate_proxy_pct <= 0.2 OR owner_response_in_last10 = 0
- **segment_low_rating** = Y if google_rating < 4.2
- **segment_high_volume** = Y if google_review_count >= 200 OR last_review_date is within 14 days

### Priority scoring (simple, operational)
- **Priority A**: (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B**: (not_responding) OR (low_rating)
- **Priority C**: high_volume only

### Sequence routing
- If low_rating=Y → use **“Low Rating”** sequence variant.
- Else if not_responding=Y → use **“Response Gap”** sequence variant.
- Else if high_volume=Y → use **“High Volume”** sequence variant.

### Data dictionary (what to capture exactly)
- **last_review_excerpt**: 8–20 words from the most recent review (or paraphrase if sensitive). Avoid personal health details; keep it generic.
- **owner_response_in_last10**: count owner/management responses visible in the last 10 reviews.
- **personalization_hook**: one sentence tying their category + a safe review theme + response gap.

---
## 2) Segmented Prospecting Plan (Direct Local + Agency Lane)

### Verticals (start with these 3)
1) Dentists
2) Med spas / aesthetic clinics
3) HVAC / plumbers

### Direct Local lane (high intent)
**Ideal prospects:**
- Recent reviews (last 14 days) + low/no owner responses
- High review volume (200+) where reputation ops is painful
- Ratings <4.2 where rapid, brand-safe responses reduce churn

**Daily activity targets (per 1 sender inbox):**
- New sends: 40/day (ramp to 80–100/day once deliverability is stable)
- Follow-ups: 20–40/day
- Personalizations: minimum 1 per email (review theme + response gap)

**Offer positioning (one-liner):**
“We draft brand-safe replies to your Google/Yelp reviews within 12 hours, escalate negatives, and send weekly reputation KPIs—so your rating and conversions don’t slip.”

**Proof/legitimacy link (use in all sequences):**
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### Agency/reseller lane (faster scale)
**Targets:** local SEO agencies, web/design agencies, PPC agencies serving dental/medspa/home services.
**Angle:** “White-label reputation reply autopilot; you keep margin; your clients get faster review response and weekly KPI reporting.”
**Daily targets:** 10–20 agency emails/day, 5 follow-ups/day.

---
## 3) Cold Email Copy Pack (3-step sequences)
**Tokens:** {{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_excerpt}}, {{response_gap_fact}}, {{website_url}}
**Website URL (always include):** {{website_url}} = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### 3.1 Direct Local — Response Gap variant (Not Responding)
**Subject options:**
1) Quick fix for {{business_name}} reviews
2) Noticed a response gap on Google
3) 12-hour review replies for {{business_name}}

**Email 1 (Day 1):**
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and saw a recent one mentioning “{{recent_review_excerpt}}.”

It also looks like you’re not able to respond to many reviews right now ({{response_gap_fact}}). That’s common—owners are busy—but it can cost bookings when prospects compare places that reply vs don’t.

We run a simple “Reputation Autopilot”: brand-safe draft replies to Google/Yelp reviews within 12 hours, negative reviews get escalated, and you get weekly KPI reporting. You can approve replies, or let us auto-post within your guidelines.

If I send 3 draft replies based on your current reviews (free), would you want them?

You can see what we do here: {{website_url}}

— {{your_name}}

**Follow-up 1 (Day 3):**
Hi {{first_name}} — circling back. If you want, I can draft replies for the last 3 reviews at {{business_name}} (including the one about “{{recent_review_excerpt}}”) and send them over.

Would you prefer “approval before posting,” or “auto-post unless negative”?

{{website_url}}
— {{your_name}}

**Follow-up 2 (Day 7):**
Last note, {{first_name}} — most {{vertical}} owners we talk to want two things:
1) reply consistently (without sounding generic)
2) catch negatives fast before they spiral

If that’s useful, reply “drafts” and I’ll send 3 example responses for {{business_name}}.

{{website_url}}
— {{your_name}}

### 3.2 Direct Local — Low Rating variant
**Subject options:**
1) Helping {{business_name}} bounce back from reviews
2) Quick reputation win (Google)
3) Fixing negative reviews fast

**Email 1:**
Hi {{first_name}} — I saw {{business_name}} on Google and noticed the rating is a bit under where most {{vertical}} prospects feel confident.

One fast lever is response speed + tone on negative reviews. We draft brand-safe replies within 12 hours, escalate issues, and track weekly KPIs so you can see if sentiment is improving.

If you share your preferred tone (formal/friendly/clinical) I’ll draft replies for 2 recent negative reviews for free.

Details: {{website_url}}
— {{your_name}}

**Follow-up 1:**
{{first_name}}, want the drafts in a “short + calm” style or “detailed + corrective”? I can send them today.

{{website_url}}
— {{your_name}}

**Follow-up 2:**
If review response is already handled, who owns reputation at {{business_name}}? I’ll reach out to the right person.

{{website_url}}
— {{your_name}}

### 3.3 Direct Local — High Volume variant
**Subject options:**
1) Managing high review volume at {{business_name}}
2) Review replies without staff time
3) Weekly reputation KPIs

**Email 1:**
Hi {{first_name}} — {{business_name}} is getting a strong volume of reviews. That’s great, but it usually turns into an ops problem to keep up.

We help businesses reply quickly and consistently: draft + post brand-safe responses to Google/Yelp, escalate negatives, and send a weekly KPI report (rating trend, response rate, sentiment themes).

Would it be crazy to offload review replies for a 2-week pilot?

{{website_url}}
— {{your_name}}

**Follow-up 1:**
If you’re open to it, I can map your last 10 reviews into 3 themes and propose reply templates for each (so replies sound like you).

{{website_url}}
— {{your_name}}

**Follow-up 2:**
Should I talk to whoever manages Google Business Profile access for {{business_name}}?

{{website_url}}
— {{your_name}}

### 3.4 Agency/Reseller version (initial)
**Subject options:**
1) White-label review reply autopilot for your clients
2) Add-on for dental/medspa/home services clients
3) Improve client ratings without more labor

**Email 1:**
Hi {{first_name}} — do you manage Google Business Profile / reputation for local clients?

We offer a white-label “AI Review Reply & Reputation Autopilot” that drafts and (optionally) posts brand-safe replies to Google/Yelp reviews within 12 hours, escalates negatives, and sends a weekly KPI report.

Agencies use it to improve client response rate + protect ratings without adding headcount. You keep margin; we handle ops.

Open to a quick call to see if this fits your client base?

{{website_url}}
— {{your_name}}

---
## 4) Outbound Ops Checklist (daily execution)
1) Pull 25–50 new leads/day into the sheet (per sender inbox) and tag vertical + segment.
2) QA 10% sample daily: correct category, local business (not franchise HQ), valid website/phone, recent review exists.
3) Personalize 1 line: include {{recent_review_excerpt}} + {{response_gap_fact}} (e.g., “I didn’t see owner replies on the last 10”).
4) Send new emails first, then follow-ups; keep replies handled within 4 business hours.
5) Update CRM stage: Prospect → Sent → Replied → Qualified → Demo Booked → Trial → Paid / Lost.
6) Weekly KPI: sends, open rate (if available), reply rate, positive reply rate, demos booked, trials started, paid conversions.

**Ramp suggestion (per inbox):** Day 1–2: 20/day; Day 3–4: 30/day; Day 5–7: 40/day; Week 2: 60–80/day if bounce <3% and spam complaints ~0.

---
## 5) What I need from you to execute next (no spend required)
- Pick geography scope for the first batch (Top 25 US metros OR 5–10 states). Once chosen, you/VA can build the 500–1,000 CSV using the template above and start sending immediately with the sequences.
