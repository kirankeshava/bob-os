# Outbound Pipeline Execution Kit — Lead List Build (500–1,000), Segmentation, Cold Email (3-step), Daily Ops + CRM (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:32:32.958Z

---

## 0) Offer + Legitimacy Links (use everywhere)
**Product:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Website (share to prove legitimacy):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
**Contact email:** agent_bob_replit+review-bot@agentmail.to

**Core promise (put in email + calls):** “Brand-safe responses within 12 hours. You approve (or we run with pre-approved guidelines). Negative reviews are escalated. Weekly KPI report.”

---

## 1) Target Verticals + Geo (locked for initial list)
**Verticals (3):** Dentists, Med Spas/Aesthetics, HVAC/Plumbing.
**Geography for first 500–1,000:** Top 25 US metros.
Suggested metros: New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Nashville, Oklahoma City, El Paso, Boston, Portland.

---

## 2) Lead CSV Template (copy/paste headers)
Create a Google Sheet with the exact headers below, then export CSV:

business_name,vertical,service_subtype,city_state,street_address,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,owner_reply_in_last_review (yes/no),responses_in_last_10 (0-10),response_rate_proxy,segment,priority_tier,contact_name,contact_role_guess,email_1,email_2,facebook_url,linkedin_url,notes

### Data dictionary (how to fill each column)
- **vertical:** dentist | med_spa | home_services
- **service_subtype:** e.g., “cosmetic dentist”, “hydrofacial”, “HVAC repair”, “plumber”.
- **google_maps_url:** the GBP share link.
- **google_rating / review_count:** from the GBP card.
- **last_review_date:** the most recent review date (e.g., “2 weeks ago” → convert to approximate date if possible, or store as text consistently).
- **last_review_snippet:** 8–20 words from the most recent review. If sensitive, paraphrase (do not include names/PHI-like details).
- **responses_in_last_10:** open Reviews tab, scan last 10 reviews; count owner responses.
- **response_rate_proxy:** responses_in_last_10 / 10 (store as decimal, e.g., 0.2).
- **segment (rules):**
  - not_responding = response_rate_proxy <= 0.2 OR responses_in_last_10 == 0
  - low_rating = google_rating < 4.2
  - high_volume = review_count >= 200 OR last_review_date within last 14 days
  - If multiple apply, choose primary as: low_rating > not_responding > high_volume and note the rest in notes.
- **priority_tier (routing):**
  - Priority A = (not_responding AND high_volume) OR (low_rating AND high_volume)
  - Priority B = not_responding OR low_rating
  - Priority C = high_volume only
- **contact_role_guess:** owner | practice_manager | office_manager | marketing_manager | general
- **emails:** from website contact page, footer, or staff pages. Acceptable generic emails: info@, hello@, office@ (better than none).

---

## 3) Query Pack (Google Maps) — exact searches
Run these queries in each metro (replace {CITY}):

### Dentists
1) “dentist {CITY}”
2) “cosmetic dentist {CITY}”
3) “pediatric dentist {CITY}”

### Med Spas
1) “med spa {CITY}”
2) “aesthetic clinic {CITY}”
3) “botox {CITY}”

### Home Services
1) “HVAC company {CITY}”
2) “air conditioning repair {CITY}”
3) “plumber {CITY}”

**Pull strategy:** Aim 20–25 leads per query per metro until you hit 500–1,000 total. Prefer independent locations over obvious national chains/franchises.

---

## 4) VA/Owner SOP — Build 500–1,000 leads (zero-cost)
**Daily production target:** 80–120 leads/day (one person) once familiar.

Step-by-step (per lead):
1) Open Google Maps search results for a query.
2) Open a business profile in a new tab.
3) Record: business_name, address, phone, rating, review_count, google_maps_url.
4) Click **Reviews**:
   - Capture **last_review_date** and **last_review_snippet** (8–20 words, or paraphrase).
   - Scan last 10 reviews and count **responses_in_last_10**.
   - Set **owner_reply_in_last_review** yes/no.
5) Compute **response_rate_proxy** = responses_in_last_10/10.
6) Apply **segment** + **priority_tier** rules.
7) Find website and emails:
   - Click website from GBP.
   - Check /contact, footer, about/team.
   - Fill email_1/email_2. If none, leave blank and add a contact form URL in notes.
8) Quick QA before moving on:
   - Must have rating + review_count.
   - Must be in correct vertical.
   - Exclude: storage units, schools, supply stores that match loosely.

**QA sampling rule (prevent garbage):** Every 50 rows, spot-check 5 at random. If >1 is wrong category or missing key fields, pause and fix the process.

---

## 5) Cold Email Sequences (3-step) — paste-ready
**Personalization tokens to fill from CSV:**
{{first_name}}, {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap}}, {{vertical_specific_hook}}

**Universal compliance note:** Use paraphrase if review mentions personal data. Do not quote full names.

### A) Not Responding Variant (Primary)
**Subject options:**
1) Quick win for {{business_name}} reviews
2) Saw a new review for {{business_name}}
3) Are you replying to reviews?

**Email 1**
Hi {{first_name}} — I was looking at {{business_name}} on Google and noticed a recent review: “{{recent_review_snippet}}”.

It looks like reviews don’t always get a response (easy to miss when you’re busy). We run an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** replies for Google/Yelp and gets them out **within 12 hours**. You can **approve everything**, or we follow pre-approved guidelines.

If a negative review comes in, we **escalate it** immediately so you can take it offline fast. Weekly KPI report included.

I’m Bob — details here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1

Open to a 10-minute call this week to see if we can take reviews off your plate?
— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (2 days later)**
Subject: Re: {{business_name}} reviews

Quick follow-up. If you want, I can draft **3 sample replies** for {{business_name}} (using your tone) based on your most recent reviews — no commitment.

Should I send those over?
— Bob

**Follow-up 2 (5 days later)**
Subject: Last note — review replies

Last note from me. For businesses with steady review volume, faster replies usually mean:
- fewer “why didn’t you respond?” impressions
- better conversion from profile views to calls
- less risk from a single negative review spiraling

If handling reviews is already covered, just reply “covered” and I’ll close the loop.
— Bob

### B) Low Rating Variant (Escalation-first)
**Subject options:**
1) Quick fix after a tough review
2) Reputation help for {{business_name}}
3) Can I share a review-response plan?

**Email 1**
Hi {{first_name}} — I saw {{business_name}}’s Google profile and one recent review stood out: “{{recent_review_snippet}}”.

When ratings are under pressure, the fastest wins are (1) **tight, brand-safe public responses** and (2) **instant escalation** so you can resolve issues privately.

That’s exactly what our AI Review Reply & Reputation Autopilot does for Google/Yelp: responses within **12 hours**, you can **approve** (or we follow your guidelines), and negatives are **flagged immediately**. We also send a simple weekly KPI report so you can see trendlines.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1

Worth a quick 10 minutes to see if this would help stabilize ratings?
— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1**
If you reply with “sample”, I’ll send 2 example responses: one for a positive review and one for a negative review — written in a calm, professional tone.
— Bob

**Follow-up 2**
If now isn’t the right time, no worries. Who is the right person for review responses at {{business_name}}?
— Bob

### C) High Volume Variant (Ops/throughput)
**Subject options:**
1) Handling review volume at {{business_name}}
2) Keeping up with Google reviews
3) Quick question re: reviews

**Email 1**
Hi {{first_name}} — {{business_name}} is getting a solid flow of reviews.

When volume is high, consistent replies become an ops problem. We run an AI-assisted review reply workflow for Google/Yelp: **drafts instantly, brand-safe templates, 12-hour turnaround**, and a clear escalation path for anything negative.

You can approve everything (or pre-approve a style guide). Weekly KPI report included.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1

Open to a quick call to see if we can take this off your team’s plate?
— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1**
If it helps, tell me your preferred tone (warm/clinical/short) and whether you want “thank-you” replies to include a next-step CTA. I’ll send 3 samples.
— Bob

**Follow-up 2**
Should I talk to you or whoever manages marketing/office operations for review replies?
— Bob

---

## 6) Agency/Reseller Lane (separate list + email)
**Target agencies:** local SEO, PPC, web design shops serving dentists/med spas/home services.
**Offer:** white-label or referral fee; “we handle review replies + reporting, you keep the client relationship.”

**Agency Email (initial)**
Subject: Add-on for your local clients (reviews)

Hi {{first_name}} — do you manage Google Business Profiles for local clients?

We run an AI Review Reply & Reputation Autopilot for Google/Yelp: brand-safe replies within 12 hours, negative review escalation, and weekly KPI reporting. Agencies use it as a retention add-on (white-label or referral).

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1

If you tell me your main vertical, I’ll share how agencies package it + suggested pricing.
— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 7) CRM Pipeline (simple + strict)
Stages (minimum):
1) Prospect (has row + email)
2) Sent (Email 1 sent)
3) Engaged (reply OR booked)
4) Qualified (fits: steady reviews + decision maker)
5) Demo Booked
6) Trial/Onboarding
7) Paid
8) Lost (reason captured)

**Entry/exit criteria:**
- Prospect→Sent: valid email + segment + personalization snippet exists.
- Sent→Engaged: any reply, even “not now”.
- Engaged→Qualified: confirms they manage GBP/Yelp and want help.
- Qualified→Demo: meeting scheduled.
- Demo→Trial: agreed to pilot workflow + access path.
- Trial→Paid: payment started.

---

## 8) Daily Sending Ops (14-day ramp)
Assumes 1 inbox. If multiple inboxes, multiply volume cautiously.
- Days 1–2: 20/day (only Priority A)
- Days 3–4: 30/day
- Days 5–7: 40/day
- Week 2: 50–80/day depending on bounces/complaints

**Rules:**
- Keep bounce rate <3%. If >5% in a day, stop and clean list.
- Reply SLA: same-day responses to any positive/curious reply.
- Follow-ups: send FU1 on day 2, FU2 on day 5 (business days).

**Daily checklist (30–45 min):**
1) Add 25–50 new prospects to CRM (with segment/priority).
2) Personalize only Priority A/B first (snippet + response gap line).
3) Send today’s cap.
4) Process replies (tag: interested / not now / wrong person / unsubscribe).
5) Book calls and send confirmation.

**Weekly KPI report (internal):** sent, delivered, bounce%, reply%, positive reply%, meetings booked, trials started, paid conversions; segment performance (A/B/C) and vertical performance.

---

## 9) What’s required next to ship the 500–1,000 CSV fast
- Execute SOP until 500–1,000 rows are collected.
- Export CSV and run a final QA sweep: duplicates removed, missing rating/review_count fixed, segments consistent.
- Start sending to Priority A first (not_responding + high_volume, low_rating + high_volume).