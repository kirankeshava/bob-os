# Outbound Pipeline Kit (Execution-Ready): Lead CSV Template + Segmentation Formulas, Query Pack, Cold Emails (w/ Website + Contact), and Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:29:56.159Z

---

BUSINESS LINKS (use in every email footer / proof link)
Website (legitimacy/proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to
Sender name: Bob

====================================================
1) LEAD LIST CSV TEMPLATE (copy headers into Google Sheets)
====================================================
Column headers (row 1):
created_date,vertical,segment,priority_tier,business_name,city,state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

DATA DICTIONARY (what to put in each)
- vertical: dentist | med_spa | hvac_plumbing | agency
- google_rating: number like 4.6
- review_count: integer
- last_review_date: YYYY-MM-DD (most recent Google review date)
- last_review_excerpt: 10–25 words quoted OR paraphrased (safer) from the most recent review
- response_rate_proxy_last10: % of last 10 Google reviews with an owner response (0–100). If you can’t compute, leave blank and use segment=high_volume/low_rating only.
- email_1/email_2: best available public emails (website contact page, staff page, or WHOIS/press). If none, leave blank and add a contact form URL in notes.

SEGMENTATION RULES (use these in Sheets)
Assume columns:
- google_rating in column K
- review_count in column L
- last_review_date in column M
- response_rate_proxy_last10 in column O

A) segment formula (put in C2):
=IFS(
  AND($O2<>"", $O2<=20), "not_responding",
  $K2<4.2, "low_rating",
  OR($L2>=200, TODAY()-DATEVALUE($M2)<=14), "high_volume",
  TRUE, "general"
)

B) priority_tier formula (put in D2):
=IFS(
  OR(AND($C2="not_responding", OR($L2>=200, TODAY()-DATEVALUE($M2)<=14)), AND($C2="low_rating", OR($L2>=200, TODAY()-DATEVALUE($M2)<=14))), "A",
  OR($C2="not_responding", $C2="low_rating"), "B",
  $C2="high_volume", "C",
  TRUE, "C"
)

C) quick “sendable?” filter (optional helper column):
=IF(OR($R2<>"", $S2<>""), "send", "missing_email")

QA RULES (sample 20 leads/day)
- Must be truly local owner-operated (avoid national directories; avoid franchises unless you want multi-location deals).
- Must have a real website OR an email visible on GBP/FB. If neither, deprioritize.
- Verify category match (dentist vs orthodontist OK; med spa vs plastic surgeon optional; HVAC/plumbing must be service contractor not supply store).

====================================================
2) GOOGLE MAPS QUERY PACK (Top US metros)
====================================================
Recommended scope: Top 25 US metros. Pull 20–40 prospects per vertical per metro to hit 500–1,000 quickly.

Top metros (starter list):
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Nashville TN; Oklahoma City OK; El Paso TX; Boston MA; Portland OR.

A) Dentists (use these exact queries in Google Maps)
- “dentist in {metro}”
- “cosmetic dentist in {metro}”
- “family dentistry in {metro}”

B) Med spas / aesthetics
- “med spa in {metro}”
- “aesthetic clinic in {metro}”
- “botox in {metro}” (then filter out individual injectors without a clinic)

C) HVAC / plumbing
- “HVAC contractor in {metro}”
- “air conditioning repair in {metro}”
- “plumber in {metro}”

Collection procedure (fast manual)
1) Open top result → record name/phone/website/URL/rating/review count.
2) Click reviews → capture last review date + excerpt.
3) Count owner responses in last 10 reviews to compute response_rate_proxy_last10.
4) Visit website → find owner/GM/practice manager/office manager email.

D) Agency / reseller lane (parallel list)
- “digital marketing agency dentist {metro}”
- “medical spa marketing agency {metro}”
- “home services marketing agency {metro}”
Targets: founder/owner, account director, client success lead.
Offer: white-label review response + escalation + weekly KPI report.

====================================================
3) COLD EMAIL SEQUENCES (3 steps) — WITH WEBSITE + CONTACT
====================================================
Personalization tokens you must fill:
{{business_name}}, {{city}}, {{recent_review_excerpt}}, {{rating}}, {{review_count}}, {{response_rate_proxy}}, {{vertical_phrase}}

EMAIL 1 — NOT RESPONDING (Primary)
Subject options:
1) Quick idea for {{business_name}}’s Google reviews
2) Noticed you’re getting reviews but not replying
3) 12-hour review responses for {{business_name}}?

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}} and saw recent feedback like: “{{recent_review_excerpt}}.”

One quick win: replying consistently tends to lift conversion (people read responses almost as much as the reviews). It also helps when a new negative review hits.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe replies for Google + Yelp, escalates negatives instantly, and sends a weekly KPI report. You can approve everything, or we can auto-post with guardrails.

If you want, I can send 3 sample replies in your tone (free) based on your latest reviews.

Should I send those over?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 1 (2–3 days later)
Subject: Want me to draft a few replies for you?

Hi {{first_name}},

I can draft responses to your last 3 Google reviews for {{business_name}} so you can see the quality + how we keep it brand-safe.

We aim for: respond within 12 hours, escalate negatives, and report weekly (rating trend, response rate, new review velocity).

Reply “yes” and I’ll send drafts.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 2 (5–7 days later)
Subject: Close the loop?

Hi {{first_name}},

Should I (a) send sample replies, or (b) leave you alone?

Either way—if you’re ever short on time for review responses, this is exactly what we automate.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

EMAIL 1 — LOW RATING (Primary)
Subject options:
1) Quick fix to protect {{business_name}}’s rating
2) Reducing 1-star damage (without canned replies)
3) Reputation help for {{business_name}}

Body:
Hi {{first_name}},

I saw {{business_name}}’s rating is around {{rating}} with {{review_count}} reviews. A lot of customers decide in seconds based on how a business responds—especially to the tough ones.

We run an AI review-response autopilot for Google + Yelp that:
- drafts calm, brand-safe replies
- escalates negative reviews immediately (so you can take it offline)
- reports weekly KPIs so you can see improvement

If you share 1–2 examples of replies you like (or your website tone), I’ll send a few sample responses tailored to you.

Worth sending samples?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

EMAIL 1 — HIGH VOLUME (Primary)
Subject options:
1) Keeping up with {{review_count}} reviews
2) 12-hour responses for {{business_name}}
3) Review ops for {{business_name}}

Body:
Hi {{first_name}},

{{business_name}} is getting a lot of reviews ({{review_count}}). That’s great—until the replies pile up or a negative review sits unanswered.

We help local businesses respond within 12 hours on Google + Yelp with brand-safe drafts (you approve, or autopost with rules), escalate negatives, and send a weekly KPI report.

If I send 3 sample replies based on your most recent reviews (free), would you want them in a more formal tone or friendly tone?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

AGENCY / RESELLER EMAIL (Initial)
Subject options:
1) White-label review response for your local clients
2) Add-on offer: Google/Yelp review replies in 12 hours
3) Quick partnership idea

Body:
Hi {{first_name}},

Do you work with {{vertical_phrase}} clients who get steady Google reviews but don’t respond consistently?

We built a white-label “AI Review Reply & Reputation Autopilot” for Google + Yelp: brand-safe drafts, negative review escalation, and a weekly KPI report you can forward to clients.

If you tell me your client niche (dentists / med spas / home services), I’ll send a 1-page partner outline and sample outputs.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

====================================================
4) DAILY SENDING OPS (SOP) + CRM STAGES
====================================================
Daily targets (once deliverability is stable)
- New prospects: 50/day
- Sends: 50–100/day (split across segments)
- Follow-ups: 25–50/day
- Manual personalization: 30–60 seconds/lead (only for Priority A/B)

14-day ramp (per inbox)
Day 1–2: 10/day
Day 3–4: 15/day
Day 5–6: 20/day
Day 7–8: 25/day
Day 9–10: 30/day
Day 11–12: 35/day
Day 13–14: 40/day
Rules: if bounce rate > 3% in any 48h window, pause and clean list.

QA + Compliance
- No spammy claims; keep emails short; one clear CTA.
- Quote reviews lightly; when in doubt paraphrase to reduce risk.
- Always include legit link (site) and a human reply path (agent_bob_replit+review-bot@agentmail.to).

Reply handling SLA
- Respond to all positive replies in <2 hours during business day.
- For “not interested,” ask one clarifying question OR close politely.

CRM stages (minimum viable)
1) Prospect (in CSV)
2) Sent (Email 1 sent)
3) Engaged (opened/replied/clicked)
4) Qualified (has GBP/Yelp + review volume + decision-maker)
5) Demo Booked
6) Trial / Pilot (sample replies or 7-day trial)
7) Paid
8) Lost (reason tagged)

KPI tracking (weekly)
- Delivery rate, bounce rate, reply rate
- Positive reply rate (interested)
- Meetings booked
- Trials started → paid conversion

NEXT EXECUTION STEP (what to do tomorrow)
1) Pick geography: Top 25 metros (recommended).
2) Build 50 leads (Priority A/B focus) using the template.
3) Send Email 1 to those 50 (once inbox is ready), then follow the ramp.
