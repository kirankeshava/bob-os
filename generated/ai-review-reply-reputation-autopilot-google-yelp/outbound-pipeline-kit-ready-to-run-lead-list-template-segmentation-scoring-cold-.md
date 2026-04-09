# Outbound Pipeline Kit (Ready-to-Run): Lead List Template + Segmentation/Scoring + Cold Email Sequences + Daily Ops/CRM (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:24:34.453Z

---

BUSINESS PROOF URL (include in outreach when credibility matters):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

====================================================
1) TARGETING: 3 VERTICALS + 3 SEGMENTS + PRIORITY TIERS
====================================================
Verticals (initial):
A) Dental practices
B) Med spas / aesthetic clinics
C) HVAC + plumbing (home services)

Segments (label each lead with one primary segment):
1) NOT_RESPONDING: response_rate_proxy <= 20% OR 0 owner responses in last 10 reviews
2) LOW_RATING: google_rating < 4.2
3) HIGH_VOLUME: review_count >= 200 OR last_review_date within 14 days

Priority scoring (use for send order):
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only

Message mapping:
- NOT_RESPONDING → “response gap + speed + brand-safe approvals”
- LOW_RATING → “recovery + escalation + stop-the-bleed + owner alerting”
- HIGH_VOLUME → “ops throughput + consistency + weekly KPI reporting”

====================================================
2) LEAD LIST CSV TEMPLATE (PASTE AS HEADERS)
====================================================
Recommended columns (minimum viable + personalization):
prospect_id,vertical,segment,priority_tier,business_name,city,state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_review_snippet,service_keywords,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

How to compute response_rate_proxy (manual, from last 10 reviews):
response_rate_proxy = (# of the last 10 reviews that have an “Owner response”) / 10

Quick segmentation formulas (Google Sheets example; assumes columns):
- LOW_RATING: =IF(H2<4.2,TRUE,FALSE)
- HIGH_VOLUME: =IF(OR(I2>=200, TODAY()-J2<=14), TRUE, FALSE)
- NOT_RESPONDING: =IF(K2<=0.2,TRUE,FALSE)
- Priority tier:
=IF(OR(AND(L2=TRUE,M2=TRUE),AND(N2=TRUE,M2=TRUE)),"A",IF(OR(L2=TRUE,N2=TRUE),"B",IF(M2=TRUE,"C","C")))
Where:
H=google_rating, I=review_count, J=last_review_date, K=response_rate_proxy, L=NOT_RESPONDING, M=HIGH_VOLUME, N=LOW_RATING

====================================================
3) ZERO-COST LIST BUILD WORKFLOW (GOOGLE MAPS → SHEETS)
====================================================
Goal: 500–1,000 leads with rating, review count, last review date, response proxy, and at least one email.

Step-by-step (per lead):
1) Search Google Maps with query: “{vertical keyword} in {metro/state}”.
   - Dental: “dentist”, “cosmetic dentist”, “family dentistry”, “dental implants”
   - Med spa: “med spa”, “aesthetic clinic”, “botox”, “laser hair removal”
   - HVAC/plumbing: “HVAC”, “air conditioning repair”, “plumber”, “water heater repair”
2) Open the GBP listing:
   - Capture business name, rating, review count, phone, website URL, maps URL.
3) Click Reviews:
   - Set sort to “Newest”
   - Record last_review_date
   - Inspect last 10 reviews: count how many have an Owner response → response_rate_proxy
   - Copy a SHORT safe snippet (6–14 words) from most recent review OR paraphrase (preferred).
4) Find email:
   - Check website Contact page, footer, About page.
   - If none: try “privacy policy” or “support” page; capture any valid email.
   - If still none: use contact form URL in notes and set email blank for later enrichment.
5) QA rules (skip leads that fail these):
   - No website and no email (unless very high volume + phone present)
   - Obvious franchises with central call centers (unless you want multi-location deals)
   - Wrong category (e.g., dental supply store, training school)

Production targets (human/VA):
- 25–40 leads/hour once practiced.
- Build 200 leads in 1–2 days, then scale to 500–1,000.

====================================================
4) COLD EMAIL SEQUENCES (READY TO SEND)
====================================================
IMPORTANT: Replace {{your_name}} and {{your_email}} with your real sending identity.
Always include the proof URL when trust is needed:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Personalization tokens:
{{first_name}} (if known), {{business_name}}, {{city}}, {{recent_review_snippet}}, {{last_review_date}}, {{response_rate_proxy}}, {{vertical}}, {{pain_point}}

------------------------------
4A) DENTAL — NOT_RESPONDING (3-step)
------------------------------
Email 1 (Day 1)
Subject options:
1) Quick question about your Google reviews
2) {{business_name}} — replying to reviews
3) Small fix that lifts bookings

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}}—one recent one said: “{{recent_review_snippet}}”. I didn’t see a reply on a few of the newest reviews.

We run an AI-assisted “review reply + escalation” autopilot: brand-safe draft responses for Google + Yelp, negative reviews get flagged immediately, and you can approve everything before it posts.

We typically respond within 12 hours so prospects see you’re active.
You can see what it is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute call this week to show how it would work for your practice?

— {{your_name}}
{{your_email}}

Email 2 (Day 3)
Subject: Worth a quick look?
Body:
Hi {{first_name}}—following up.

Most practices lose high-intent calls when reviews look “unattended” (no owner replies). We can:
- Draft compliant, empathetic replies (HIPAA-safe language)
- Escalate negatives to you immediately
- Send a weekly KPI summary (rating trend, response rate, new reviews)

If I send 2 sample replies based on your latest reviews, would you want to see them?

— {{your_name}}
{{your_email}}

Email 3 (Day 6)
Subject: Close the loop?
Body:
Hi {{first_name}}, last note from me.

Should I:
A) send a couple sample responses for {{business_name}}, or
B) circle back next month?

— {{your_name}}
{{your_email}}

------------------------------
4B) MED SPA — LOW_RATING (3-step)
------------------------------
Email 1 (Day 1)
Subject options:
1) Quick idea to protect {{business_name}}’s rating
2) Med spa reviews → faster recovery
3) Negative reviews: escalation + reply templates

Body:
Hi {{first_name}},

I noticed {{business_name}} has a few lower-star reviews recently (one mentioned “{{recent_review_snippet}}”). The big risk isn’t the review itself—it’s when it sits without a calm, brand-safe response.

We built an AI Review Reply & Reputation Autopilot for Google/Yelp:
- Drafts professional replies in your brand voice
- Escalates negatives instantly (so you can recover the customer offline)
- Weekly KPI report so you see rating/response-rate movement

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you want, I can show you exactly how we’d respond to the last 2 critical reviews (you approve before anything posts). 10 minutes this week?

— {{your_name}}
{{your_email}}

Email 2 (Day 3)
Subject: Want 2 draft replies to review #1?
Body:
Hi {{first_name}},

If it helps, I can send:
- 1 draft public reply (de-escalation, policy-safe)
- 1 private outreach script to recover the customer

No obligation—just reply “send” and I’ll tailor them to {{business_name}}.

— {{your_name}}
{{your_email}}

Email 3 (Day 6)
Subject: Should I close this out?
Body:
Hi {{first_name}},

Are you the right person for review responses at {{business_name}}?
If not, who should I reach out to?

— {{your_name}}
{{your_email}}

------------------------------
4C) HVAC/PLUMBING — HIGH_VOLUME (3-step)
------------------------------
Email 1 (Day 1)
Subject options:
1) Keeping up with review volume at {{business_name}}
2) 12-hour review replies for {{city}}
3) Reputation ops for busy home services

Body:
Hi {{first_name}},

{{business_name}} is getting consistent review volume (latest said “{{recent_review_snippet}}”). Most busy home-service shops fall behind on replies because it’s pure ops work.

We automate review responses for Google + Yelp with a simple approval flow:
- Draft replies in your tone
- Flag negatives immediately (so you can call the customer)
- Weekly KPIs (new reviews, response rate, rating trend)

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Would a quick walkthrough help? If you’re handling reviews now, we can take that off your plate.

— {{your_name}}
{{your_email}}

Email 2 (Day 3)
Subject: Who owns reviews at {{business_name}}?
Body:
Hi {{first_name}},

Quick one—who’s responsible for replying to Google/Yelp reviews?
If it’s you, I can send 2 example replies for your latest reviews and show the approval workflow.

— {{your_name}}
{{your_email}}

Email 3 (Day 6)
Subject: Sample replies?
Body:
If I send 2 sample replies today (one for a 5-star, one for a 3-star), would you like to see them?

— {{your_name}}
{{your_email}}

------------------------------
4D) AGENCY / RESELLER VERSION (initial email)
------------------------------
Subject options:
1) White-label review replies for your clients
2) Add-on offer for local SEO clients
3) Reputation ops product you can resell

Body:
Hi {{first_name}},

If you manage local clients (dental/med spa/home services): we built a lightweight “AI Review Reply & Reputation Autopilot” for Google Business Profile + Yelp.

It drafts brand-safe replies, escalates negative reviews to the account owner, and sends a weekly KPI report. You can run it as a done-for-you add-on or resell it.

Quick overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute partner chat? If it’s a fit, I’ll share pricing/margin options and onboarding flow.

— {{your_name}}
{{your_email}}

====================================================
5) DAILY SENDING OPS + 14-DAY RAMP (HUMAN-RUN)
====================================================
Core daily loop (Mon–Fri):
1) Pull/send list: 30–100 new/day depending on deliverability maturity.
2) Personalize: add 1 review snippet + 1 line about response gap/volume.
3) Send + log in CRM: status=Sent (store segment/priority).
4) Same-day reply handling (SLA):
   - Positive interest → propose 2 time slots within 24h.
   - “Not now” → ask when to follow up; set task.
   - Wrong person → ask for correct contact.
5) Follow-ups: run Email 2 and Email 3 by schedule.

14-day ramp (per inbox; keep conservative):
- Days 1–2: 10–15/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Days 8–10: 40/day
- Days 11–14: 50/day
Rules:
- Stop/slow if bounce rate > 3% or spam complaints occur.
- Keep personalization high for Priority A leads.

====================================================
6) CRM STAGES (SIMPLE PIPELINE)
====================================================
Stages + entry criteria:
1) Prospect (lead exists, not contacted)
2) Sent (Email 1 sent)
3) Replied (any reply)
4) Qualified (has GBP/Yelp + review volume + pain confirmed)
5) Demo Booked (date/time set)
6) Trial / Pilot (sample replies or short pilot running)
7) Paid (converted)
8) Lost (not a fit / no response after 3 touches / do-not-contact)

KPIs to track weekly:
- Sent/day, reply rate, positive reply rate, meetings booked, show rate, trials started, close rate
- Reputation KPI (post-sale): response time, response rate, rating trend, negative escalation count

====================================================
7) WHAT I NEED FROM YOU NEXT (TO UNLOCK THE CSV)
====================================================
1) Choose geography for initial 500–1,000 leads:
   A) Top 25 US metros (fastest learning + consistent density)
   B) 5–10 states (better focus for a single operator)
   C) US-wide (broadest but messier)
2) Decide who will execute list build: you vs VA.
Once you pick geography, I can provide a finalized query pack (exact metros/states list) and a 200-lead “first sprint” target so you can start sending within 48 hours of data entry.