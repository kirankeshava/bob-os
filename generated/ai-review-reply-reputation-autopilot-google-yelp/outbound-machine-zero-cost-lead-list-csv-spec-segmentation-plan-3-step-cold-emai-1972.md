# Outbound Machine (Zero-Cost): Lead List CSV Spec + Segmentation Plan + 3-Step Cold Email Sequences + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T19:03:03.776Z

---

# AI Review Reply & Reputation Autopilot — Outbound Machine (Zero-Cost)
Business website (legitimacy link to include): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Business contact email (reply-to + signature): agent_bob_replit+review-bot@agentmail.to

## 1) ICP + Vertical Focus (initial lanes)
Primary verticals (high review velocity + high LTV):
1) Dentists / Dental practices
2) Med spas / Aesthetics clinics
3) HVAC + Plumbing (home services)

Secondary lane (faster “bulk” deals):
4) Marketing agencies / local SEO agencies serving the above verticals

## 2) Lead List CSV — Required Columns (copy/paste header)
Use Google Sheets; export CSV when done.

business_name,vertical,city_state,address,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,contact_form_url,personalization_hook,notes

### Data dictionary (what each means)
- google_rating: the star rating shown on Google Business Profile
- review_count: total Google review count
- last_review_date: date of most recent review (e.g., 2026-04-01)
- last_review_excerpt: 8–20 words from most recent review OR paraphrase (safer). Avoid health/diagnosis details.
- response_rate_proxy_last10: count of owner responses in last 10 reviews ÷ 10. Example: 0.1, 0.3, 0.7
- segment: one of [not_responding, low_rating, high_volume]
- priority: one of [A, B, C]
- personalization_hook: 1 line you’ll paste into email (e.g., “Saw a recent review mentioning ‘quick appointment’—nice.”)

## 3) Segmentation Rules + Priority Scoring
Compute segment(s) based on these rules:
- not_responding: response_rate_proxy_last10 <= 0.2 OR no responses in last 10 reviews
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within last 14 days

Priority routing (pick highest that applies):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: (not_responding) OR (low_rating)
- Priority C: high_volume only

Operational note: if a business fits multiple segments, choose the email variant by Priority:
1) Low rating angle (if low_rating true)
2) Not responding angle (if not_responding true)
3) High volume ops angle (otherwise)

## 4) Zero-Cost Lead Sourcing Workflow (Google Maps + Sheets)
### Step-by-step (repeatable)
1) Choose a metro/state (owner decision). Use consistent footprints.
2) Google Maps search queries (examples):
   - Dentists: “dentist in {{city}}”, “cosmetic dentist in {{city}}”, “family dentistry in {{city}}”
   - Med spas: “med spa in {{city}}”, “aesthetic clinic in {{city}}”, “botox in {{city}}”
   - HVAC/Plumbing: “HVAC in {{city}}”, “air conditioning repair in {{city}}”, “plumber in {{city}}”
3) For each prospect, capture: business name, website, phone, rating, review count, and open the reviews panel.
4) last_review_date + excerpt: take the most recent review’s date and a short safe excerpt (or paraphrase).
5) response_rate_proxy_last10: skim last 10 reviews and count owner replies.
6) Find email(s) (free methods):
   - Website contact page/footer
   - “mailto:” links
   - Contact form URL if no email
   - If none, use generic patterns only when publicly shown (avoid guessing emails at scale).
7) Fill segment + priority fields.

QA rules (prevent garbage leads):
- Exclude franchises with corporate-only contact pages (unless you can find local manager email)
- Exclude businesses with no website AND no contact form (hard to reach)
- Exclude categories that are off-vertical (e.g., dental lab, supply store)
- Sample QA: every 50 rows, re-check 5 random rows for correct category + working website

## 5) Cold Email Sequences (3-step) — WITH Segment Variants
Instructions:
- Personalization tokens: {{first_name}}, {{business_name}}, {{city}}, {{recent_review_hook}}, {{response_gap_fact}}, {{rating}}, {{review_count}}
- Always include legitimacy link + contact email.
- CTA is low-friction: “Worth a 10-min call?” or “Want me to send 2 sample replies?”

### 5A) UNIVERSAL SIGNATURE (use in all emails)
— Bob Smith
AI Review Reply & Reputation Autopilot (Google/Yelp)
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply here: agent_bob_replit+review-bot@agentmail.to

### 5B) DENTAL — Initial Email (choose by segment)
Subject options (rotate):
1) Quick idea for {{business_name}} reviews
2) Patients are reviewing you — want replies handled?
3) Noticed your Google reviews in {{city}}

**Variant 1: NOT RESPONDING (Dental)**
Hi {{first_name}} — {{recent_review_hook}}

I noticed {{business_name}} has a steady flow of Google reviews, but it looks like many don’t get a public reply ({{response_gap_fact}}).

We run an “AI Review Reply & Reputation Autopilot” that drafts brand-safe responses for your Google Business Profile (and Yelp if you use it). You approve (or we follow a pre-approved style guide), and we respond within ~12 hours. Any negative review can be escalated to you immediately.

Want me to send 2 sample replies in your tone based on your latest reviews?

(Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)

— Bob Smith

**Variant 2: LOW RATING (Dental)**
Hi {{first_name}} — {{recent_review_hook}}

If you’re open to it: a simple lift for {{business_name}} is replying to every review (especially anything <4 stars) fast and consistently. It’s one of the few levers that can help future patients choose you even before the rating moves.

Our system drafts calm, HIPAA-aware, brand-safe replies for Google/Yelp, escalates sensitive cases to you, and gives a weekly KPI summary (volume, response rate, trends).

Want a quick 10-min call to see what the workflow looks like?

— Bob Smith
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

**Variant 3: HIGH VOLUME (Dental)**
Hi {{first_name}} — {{recent_review_hook}}

With {{review_count}} reviews, I’m guessing reviews come in regularly and replying becomes a time sink.

We handle review replies as an “ops layer”: drafts in your tone, you approve (or autopublish within guardrails), 12-hour response target, and negative reviews escalated immediately.

Worth it if I send 2 example replies for your most recent review(s)?

— Bob Smith

### 5C) MED SPA — Initial Email (choose by segment)
Subject options:
1) Review replies for {{business_name}} (12-hr SLA)
2) Quick win for your Google reviews in {{city}}
3) Keeping your reviews “on brand”

Body (NOT RESPONDING angle):
Hi {{first_name}} — {{recent_review_hook}}

I noticed reviews are coming in for {{business_name}}, but many aren’t getting an owner response ({{response_gap_fact}}). For med spas, fast + on-brand responses can be the difference between a browse and a booking.

We draft brand-safe replies for Google/Yelp, route anything negative/sensitive to you, and send weekly KPIs. You can approve replies, or we can follow a pre-approved style guide.

Want me to draft 2 replies in your brand voice as a sample?

— Bob Smith
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

(LOW RATING + HIGH VOLUME variants mirror dental; swap “patients” → “clients” and mention “brand voice + compliance/claims-safe language”.)

### 5D) HVAC/PLUMBING — Initial Email (choose by segment)
Subject options:
1) You’re getting reviews — want us to reply?
2) Quick help with Google reviews for {{business_name}}
3) Missed review replies (easy fix)

Body (NOT RESPONDING angle):
Hi {{first_name}} — {{recent_review_hook}}

Noticed {{business_name}} gets reviews, but a lot don’t get a public response ({{response_gap_fact}}). In home services, quick replies help conversion because prospects compare 2–3 providers fast.

We draft and post brand-safe responses to Google/Yelp reviews, escalate negative reviews to you right away, and send weekly reputation KPIs. 12-hour response target.

Want 2 sample replies drafted from your newest reviews?

— Bob Smith
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 6) Follow-ups (use across verticals)
### Follow-up #1 (2 business days later)
Subject: Re: {{business_name}} reviews
Hi {{first_name}} — should I send over 2 draft replies based on your most recent review(s), or is someone already handling review responses for {{business_name}}?

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### Follow-up #2 (5–7 business days later)
Subject: last try — review replies
Hi {{first_name}} — last try. If helpful, we can set a simple rule set like:
- reply to all 4–5 star reviews within 12 hours
- escalate anything negative/sensitive to you
- weekly KPI email (response rate + trends)

Want me to draft a mini “tone guide” + 2 sample replies for {{business_name}}?

— Bob Smith
agent_bob_replit+review-bot@agentmail.to

## 7) Agency/Reseller Lane (initial email)
Subject options:
1) White-label review reply automation for your clients
2) Add-on service for GBP/Yelp reviews
3) Quick reseller idea (high-margin, low lift)

Hi {{first_name}} — I’m reaching out because you work with local businesses (esp. dental/med spa/home services).

We run an AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp: brand-safe draft replies, optional approval workflow, 12-hour response target, negative-review escalation, and weekly KPI reporting.

This is easy to resell as a monthly add-on because it’s visible value (clients see replies + improved response rate). Want details on a white-label workflow?

— Bob Smith
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 8) Daily Sending Ops (14-day ramp, $0 tooling assumption)
Assumptions: 1 inbox, no paid warmup. Keep volume conservative.

Day 1–2: 10–15 new emails/day (no attachments). Reply fast to any response.
Day 3–4: 20/day.
Day 5–7: 25/day.
Week 2: 30–40/day if bounce rate <3% and no spam complaints.

Daily checklist:
1) Pull 25–40 prospects from Priority A/B first.
2) Personalize 1 line: {{recent_review_hook}} + {{response_gap_fact}}.
3) Send new emails before noon local time.
4) Send follow-up #1 to Day-2 non-responders; follow-up #2 to Day-7 non-responders.
5) Log outcomes in CRM.
6) Monitor metrics: bounces, replies, positive replies, unsubscribes.

Stop/adjust thresholds:
- Bounce rate > 5%: pause, clean list (remove bad emails), reduce volume.
- Spam complaints: pause immediately, revise copy, reduce links.

## 9) CRM Pipeline Stages (simple, enforceable)
Stages + entry/exit:
1) Prospect (has required fields)
2) Sent (initial email sent)
3) Replied (any reply)
4) Qualified (has Google/Yelp presence + interest + decision maker)
5) Demo Booked
6) Trial (7-day free launch policy)
7) Paid (post-week-1)
8) Lost (no fit / no response after sequence / wrong contact)

Core KPIs (weekly):
- Emails sent, deliverability (bounce %)
- Reply rate, positive reply rate
- Demos booked
- Trials started
- Review response rate improvements for active trials (product proof)

## 10) What I still need from owner to generate the actual 500–1,000 lead CSV
Choose ONE geography approach for the first batch:
A) Top 25 US metros (fastest to find high-volume prospects)
B) 5–10 states you prefer (easier to sell if you have presence)
C) US-wide (more variety, harder to QA)

Once chosen, the query set and collection targets per metro/state can be locked and executed to produce the final 500–1,000 row CSV.