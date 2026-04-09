# Outbound Machine Runbook (Ready-to-Execute): Segmentation Plan + Cold Emails + Daily Ops + Lead List Build SOP

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T05:23:35.236Z

---

# AI Review Reply & Reputation Autopilot — Outbound Machine Runbook
Website to reference in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply-to email to use in templates: {{your_email}} (set to your sending inbox)

## 1) Target verticals + who to contact
**Verticals (start):** Dental, Med Spa/Aesthetics, HVAC/Plumbing.
**Titles:** Owner, Practice Manager, Office Manager, Operations Manager, General Manager, Clinic Director.

## 2) Segmentation + priority routing
Capture from Google Business Profile (GBP): rating, review_count, last_review_date, last_10_reviews_owner_reply_count.
Compute:
- **response_rate_proxy** = last_10_reviews_owner_reply_count / 10.

Segments (tag one primary):
- **not_responding:** response_rate_proxy ≤ 0.2 OR 0 replies in last 10 reviews.
- **low_rating:** google_rating < 4.2.
- **high_volume:** review_count ≥ 200 OR last_review_date within 14 days.

Priority score:
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume).
- **Priority B:** not_responding OR low_rating.
- **Priority C:** high_volume only.

Messaging map:
- Not responding → “response gap / speed SLA / brand-safe approvals.”
- Low rating → “recovery + escalation + get ahead of the narrative.”
- High volume → “ops throughput / never miss a review / weekly KPIs.”

## 3) Lead list CSV schema (copy headers)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_reply_count,response_rate_proxy,segment,priority,personalization_snippet,contact_name,role_guess,email_1,email_2,notes

Personalization snippet rule: copy **one short phrase** from the most recent review (8–20 words) OR paraphrase if it contains sensitive info. Never include health details, treatment specifics, or pricing.

## 4) Zero-cost lead build SOP (Google Maps)
Daily goal: 50–100 net-new rows.
1) Open Google Maps → search query (examples below) → open listing.
2) Record rating + review count + website + phone.
3) Click “Reviews” → sort by “Newest.”
4) Inspect last 10 reviews: count owner responses (yes/no) → fill last_10_reply_count.
5) Record last review date.
6) Capture a safe personalization snippet from the newest review.
7) Find an email:
   - Check website footer/contact page.
   - If none: look for “appointments@ / info@ / office@ / hello@”.
   - If still none: use contact form URL and note “no email found.”
8) Apply segment + priority rules.

Quality filters (skip if true):
- Pure franchise directory pages with no direct operator contact.
- Category mismatch (e.g., “Dental laboratory” instead of “Dentist”).
- No website AND no email AND only a call center number (unless Priority A and in target geo).

## 5) Query pack (examples)
Use: “{vertical keyword} {city}” and stick to metros you can sell into.
Dental:
- “dentist downtown {city}”
- “family dentistry {city}”
- “cosmetic dentist {city}”
Med spa:
- “med spa {city}”
- “aesthetic clinic {city}”
- “botox {city} clinic”
HVAC/Plumbing:
- “HVAC company {city}”
- “air conditioning repair {city}”
- “plumber {city}”

## 6) Cold email sequences (paste-ready)
General tokens:
- {{first_name}}, {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap_observation}}, {{your_name}}, {{your_email}}

### A) Local business — NOT RESPONDING (primary)
**Email 1 — Subject options:**
1) Quick question about your Google reviews
2) {{business_name}} review responses
3) 12-hour review replies for {{business_name}}?

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s recent Google reviews.

I noticed {{response_gap_observation}} (e.g., “a few of the newest reviews don’t have an owner reply yet”), including one that mentioned: “{{recent_review_snippet}}”.

We built a lightweight **AI Review Reply & Reputation Autopilot** that drafts brand-safe responses for Google/Yelp, flags negatives for escalation, and sends weekly reputation KPIs. You can **approve** replies (or set rules) and we respond within **12 hours**.

If I send 2–3 example replies based on your latest reviews, would you like them?

— {{your_name}}
{{your_email}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

**Follow-up 1 (Day 2–3):**
Subject: Want me to draft replies for the last few reviews?

Hi {{first_name}} — quick follow-up.

Most local businesses see more calls/bookings when prospects see (1) recent reviews and (2) owner replies that feel human and consistent.

If you reply “yes,” I’ll send example responses for 3 recent reviews from {{business_name}} (including one with “{{recent_review_snippet}}”). No login needed—just examples.

— {{your_name}}
{{your_email}}

**Follow-up 2 (Day 6–7):**
Subject: Close the loop on review replies

Hi {{first_name}} — should I close this out?

If review responses are already handled, no worries. If not, we can take it off your plate: draft/post replies, escalate negatives, and report weekly KPIs.

Worth a 10-minute call next week?

— {{your_name}}
{{your_email}}

### B) Local business — LOW RATING (recovery angle)
**Email 1 — Subject options:**
1) Fixing the narrative on Google reviews
2) {{business_name}} reputation quick win
3) A simple way to protect bookings

Body:
Hi {{first_name}} — I’m reaching out because Google reviews strongly influence bookings in {{city}}, and {{business_name}}’s rating looks like it’s being pulled down.

One recent review mentioned: “{{recent_review_snippet}}”. If those don’t get a calm, brand-safe response quickly, prospects often assume the worst.

Our Reputation Autopilot drafts empathetic replies, escalates anything sensitive/negative to you, and helps keep response time under 12 hours (with approval rules).

Open to me sending 2 example responses + an escalation template you can use immediately?

— {{your_name}}
{{your_email}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

(Follow-ups mirror A, but emphasize recovery + escalation.)

### C) Local business — HIGH VOLUME (ops angle)
**Email 1 — Subject options:**
1) Keeping up with review volume at {{business_name}}
2) Never miss a review reply again
3) Weekly reputation KPIs for {{business_name}}

Body:
Hi {{first_name}} — {{business_name}} has strong review volume, which is great for SEO and conversions.

The hard part is consistency: replying fast, staying on-brand, and surfacing patterns (complaints vs praise) without someone manually living in Google/Yelp.

We built an Autopilot that drafts and can post replies, flags negative reviews for escalation, and emails a weekly KPI summary (response rate, response time, sentiment, top themes).

Want to see a 1-page KPI sample + 3 draft replies from your newest reviews?

— {{your_name}}
{{your_email}}

## 7) Agency/reseller lane (initial email)
Subject options:
1) Add “review reply + reputation KPIs” to your retainers
2) White-label reputation autopilot for your clients

Body:
Hi {{first_name}} — do you manage local clients (dental/med spa/home services) where Google reviews drive calls?

We offer a simple add-on: **brand-safe review replies (Google/Yelp), negative-review escalation, and weekly reputation KPIs**. Agencies typically resell it as a reputation management line item while we handle the ops.

If you tell me your client niches + avg client count, I can share packaging ideas and a sample report.

— {{your_name}}
{{your_email}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 8) Daily sending ops checklist (14-day ramp)
Assuming 1 inbox; scale linearly per inbox.
- Day 1–2: 15–20/day (mostly Priority A)
- Day 3–4: 25–35/day
- Day 5–7: 40–60/day
- Week 2: 60–100/day if bounce < 3% and replies steady

Rules:
- Stop sending if bounce rate > 5% in a day; fix list quality.
- Reply SLA: < 2 hours during business day.
- If prospect asks for examples: send 2–3 draft replies + 1-paragraph “how approvals work.”

## 9) CRM stages (minimal)
Prospect → Sent → Replied → Qualified → Demo Booked → Trial → Paid → Lost
Entry/exit criteria:
- Qualified = confirms they manage reviews + has Google/Yelp presence + agrees speed/consistency matters.
- Lost = explicit no, wrong contact, or 3 no-responses after sequence.

## 10) What I need from owner to execute tomorrow
1) Choose geography scope for list build.
2) Provide {{your_email}} and sender name.
3) (Optional) Decide whether you want “approve-first” default or “auto-post under rules” default for the offer.
