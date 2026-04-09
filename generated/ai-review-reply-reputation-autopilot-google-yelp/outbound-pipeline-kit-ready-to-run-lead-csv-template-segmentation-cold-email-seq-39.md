# Outbound Pipeline Kit (Ready-to-Run) — Lead CSV Template + Segmentation + Cold Email Sequences + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:19:11.093Z

---

Below is a single, execution-ready outbound kit you (or a VA) can run immediately.

====================================================
A) LEAD LIST CSV TEMPLATE (copy/paste headers)
====================================================
Required columns (CSV headers):
prospect_id,vertical,segment,priority_tier,business_name,city,state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,response_rate_proxy_last10,owner_manager_name,role_guess,email_1,email_2,source_notes,personalization_hook,offer_angle,sequence_variant,crm_stage,next_touch_date

Data dictionary (how to fill quickly):
- vertical: dentist | med_spa | hvac_plumbing | agency
- google_rating/review_count/last_review_date: from Google Business Profile (GBP)
- last_review_snippet: 1 sentence max; if sensitive, paraphrase (don’t include health details)
- response_rate_proxy_last10: count of owner responses in last 10 reviews / 10 (0.0–1.0)
- segment rules:
  1) not_responding = response_rate_proxy_last10 <= 0.2 OR 0 replies in last 10
  2) low_rating = google_rating < 4.2
  3) high_volume = review_count >= 200 OR last_review_date within last 14 days
  (If multiple apply, pick the most urgent for first-touch: low_rating > not_responding > high_volume)
- priority_tier rules:
  Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
  Priority B: not_responding OR low_rating
  Priority C: high_volume only
- personalization_hook examples:
  - “Saw your recent review mentioning {{topic}} and noticed there wasn’t a public reply yet.”
  - “Noticed you get steady reviews each week; replying quickly could lift conversion.”
- offer_angle mapping:
  - not_responding → “12-hour replies + brand-safe + you approve”
  - low_rating → “negative review escalation + calm, compliant responses”
  - high_volume → “throughput: consistent replies without staff time”
- sequence_variant: e.g., dentist_notresponding_v1

Optional Google Sheets formulas (adjust column letters as needed):
- segment (example logic):
  =IFS(google_rating<4.2,"low_rating",response_rate_proxy_last10<=0.2,"not_responding",OR(review_count>=200,last_review_date>=TODAY()-14),"high_volume",TRUE,"baseline")
- priority_tier:
  =IFS(AND(segment="low_rating",OR(review_count>=200,last_review_date>=TODAY()-14)),"A",AND(segment="not_responding",OR(review_count>=200,last_review_date>=TODAY()-14)),"A",OR(segment="low_rating",segment="not_responding"),"B",segment="high_volume","C",TRUE,"C")

====================================================
B) COLD EMAIL COPY (3-step sequence)
Include your legitimacy URL in every initial email:
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Important personalization tokens:
- {{first_name}} (if unknown: “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (quote or safe paraphrase)
- {{response_gap}} (e.g., “I didn’t see a public reply yet”)

----------------------------------------
1) DENTIST — Not Responding (Variant)
----------------------------------------
Subject options:
1) Quick question about replying to reviews at {{business_name}}
2) Noticed a response gap on your Google reviews
3) Simple way to reply within 12 hours (without extra staff)

Email 1:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}} and saw a recent one: “{{recent_review_snippet}}.” {{response_gap}}.

We built a small “reputation autopilot” that drafts brand-safe replies to Google (and Yelp) reviews, flags negatives for escalation, and keeps response time fast. You can approve responses before anything posts.

If helpful, I can show you what a compliant, on-brand reply would look like for that review and set you up to respond within ~12 hours going forward.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute walkthrough this week?

— {{your_name}}

Follow-up 1 (2–3 days later):
Subject: Want me to draft the reply for that review?

Hi {{first_name}},

If you want, I’ll draft 2 reply options for the review mentioning “{{recent_review_snippet}}” so you can pick the tone (warm/clinical/brief). If you like it, we can automate the rest so replies go out quickly and safely.

Worth a quick call?

— {{your_name}}

Follow-up 2 (4–6 days later):
Subject: Should I close the loop?

Hi {{first_name}},

Totally fine if now’s not a priority. Last check: do you want faster review replies handled for {{business_name}} (Google/Yelp), with negative reviews escalated and a weekly KPI email?

If yes, what’s the best email/number to reach you?

— {{your_name}}

----------------------------------------
2) DENTIST — Low Rating (Variant)
----------------------------------------
Subject options:
1) Quick help improving rating perception for {{business_name}}
2) Negative reviews: calm, compliant responses (you approve)
3) Reputation quick win in {{city}}

Email 1:
Hi {{first_name}},

I saw {{business_name}} on Google and noticed a recent review: “{{recent_review_snippet}}.” When reviews like that sit without a public reply, it can quietly cost new patient calls.

We help practices respond fast with brand-safe drafts (HIPAA-aware tone), escalate negatives to staff privately, and send weekly KPIs so you can see response time + sentiment changes.

If you’re open, I can send a sample reply for that specific review and show the simple workflow. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

10 minutes this week?

— {{your_name}}

Follow-up 1:
Subject: Sample reply draft for “{{recent_review_snippet}}”

Hi {{first_name}},

Want me to draft a response that (1) de-escalates, (2) avoids any PHI, and (3) invites the patient to resolve offline? You can approve/edit before posting.

If yes, reply “draft” and I’ll send it.

— {{your_name}}

Follow-up 2:
Subject: Close the file?

Hi {{first_name}},

Should I stop reaching out, or is review response + negative escalation something you want handled at {{business_name}}?

— {{your_name}}

----------------------------------------
3) MED SPA — High Volume (Variant)
----------------------------------------
Subject options:
1) You’re getting a lot of reviews—need help replying?
2) Keep review replies consistent (without staff time)
3) 12-hour review replies for {{business_name}}

Email 1:
Hi {{first_name}},

Noticed {{business_name}} is getting steady Google reviews in {{city}}. A recent one said: “{{recent_review_snippet}}.”

When volume is high, replies tend to become inconsistent (or delayed). We run an AI-assisted review reply workflow for Google + Yelp: brand-safe drafts, negative-review escalation, and weekly reputation KPIs. You approve before posting.

Quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute look?

— {{your_name}}

Follow-up 1:
Subject: Want 2 sample replies in your tone?

Hi {{first_name}},

If you reply with the vibe you prefer (luxury/clinical/friendly), I’ll send two sample replies for your latest reviews so you can see the quality.

Worth it?

— {{your_name}}

Follow-up 2:
Subject: Last touch

Hi {{first_name}},

Should I close this out, or do you want review replies + escalation handled so your team doesn’t have to chase it?

— {{your_name}}

----------------------------------------
4) HVAC/PLUMBING — Not Responding (Variant)
----------------------------------------
Subject options:
1) Home services reviews: quick reply gap
2) Responding faster can win more calls
3) Can I draft replies for {{business_name}}?

Email 1:
Hi {{first_name}},

I’m reaching out because I saw a recent Google review for {{business_name}}: “{{recent_review_snippet}}.” {{response_gap}}.

For home services, fast public replies are a simple trust signal (especially when prospects compare 3–4 companies). We draft brand-safe replies, escalate negative reviews for follow-up, and keep response time under ~12 hours. You approve before posting.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute walkthrough?

— {{your_name}}

Follow-up 1:
Subject: I can draft the reply today

Hi {{first_name}},

If you want, I’ll draft a reply to that review today so you can copy/paste (even if you don’t use the service). Just reply “yes” and I’ll send it.

— {{your_name}}

Follow-up 2:
Subject: Close this?

Hi {{first_name}},

Do you want review replies handled at {{business_name}}, or should I stop reaching out?

— {{your_name}}

----------------------------------------
5) AGENCY / RESELLER — Initial (Variant)
----------------------------------------
Subject options:
1) Add “review response” as an upsell for your clients
2) White-label review replies for Google/Yelp
3) Quick reseller idea for local SEO clients

Email 1:
Hi {{first_name}},

If you manage local SEO/GBP for dentists, med spas, or home services: we built a simple review-response autopilot for Google + Yelp—brand-safe drafts, negative-review escalation, and weekly reputation KPIs.

It’s easy to package as an upsell (or white-label workflow) because clients feel the impact quickly: faster responses, better perception, and less owner time.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you want, I can share pricing you can mark up + the onboarding checklist.

Open to a 15-minute chat?

— {{your_name}}

Follow-up 1:
Subject: Want the reseller pack?

Hi {{first_name}},

I can send:
- onboarding checklist
- sample client-facing report (weekly KPIs)
- suggested retail pricing + margin

Should I send it over?

— {{your_name}}

Follow-up 2:
Subject: Close the loop

Hi {{first_name}},

Still interested in adding review response automation as an offer for your local clients, or should I close this out?

— {{your_name}}

====================================================
C) DAILY SENDING OPS + CRM
====================================================
CRM stages (simple pipeline):
1) Prospect (lead collected, not contacted)
2) Sent (Email 1 sent)
3) Engaged (opened/clicked/replied)
4) Replied – Not Now
5) Qualified (pain confirmed: response gap/low rating/high volume; decision-maker)
6) Demo Booked
7) Trial/Onboarding
8) Paid
9) Lost (no fit/unresponsive)

14-day ramp (safe defaults):
- Days 1–3: 10–15 emails/day/inbox (only Priority A/B)
- Days 4–7: 20–30/day/inbox
- Days 8–14: 35–50/day/inbox (keep follow-ups running)
Rules:
- Keep bounce rate < 3% (pause sending if above)
- Complaints/spam flags: stop and review copy/list immediately
- Reply SLA: respond within 2 business hours; book calls within 48 hours

Daily checklist (execution):
1) Pull 25–50 new prospects into “Prospect” stage
2) QA sample 10%: correct category, real local business, review data present, no obvious franchise corporate listing
3) Personalize first line (review snippet + response gap)
4) Send Email 1 to new prospects; schedule follow-up 1 (Day 3) and follow-up 2 (Day 7)
5) Process replies twice daily: categorize (Qualified / Not Now / Wrong person)
6) Update CRM, set next_touch_date, and log objections

Weekly checklist:
- Report metrics: sent, delivered, open rate, reply rate, positive reply rate, demos booked, cost (if any)
- Identify best-performing segment (A/B/C) and double down
- Refresh lead pulls (new reviews in last 14 days = high intent)

====================================================
D) OWNER QUESTIONS TO UNBLOCK EXECUTION
====================================================
To lock the query pack and start list building today, pick ONE:
1) Top 25 US metros
2) 5–10 target states
3) US-wide

Once you choose geography, build the first 200 leads (Priority A/B first), then scale to 500–1,000.
