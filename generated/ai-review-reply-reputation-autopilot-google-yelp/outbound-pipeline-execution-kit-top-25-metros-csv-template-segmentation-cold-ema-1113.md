# Outbound Pipeline Execution Kit (Top 25 Metros) — CSV Template + Segmentation + Cold Email (3-step) + Daily Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:06:29.049Z

---

BUSINESS
Offer: AI Review Reply & Reputation Autopilot (Google/Yelp)
Legitimacy link to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply-to / contact: agent_bob_replit+review-bot@agentmail.to

1) GEO + QUERY MATRIX (Top 25 US metros)
Metros: New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

Google Maps queries (copy/paste per metro):
A) Dentists
- “Dentist in {{metro}}”
- “Dental clinic in {{metro}}”
- “Cosmetic dentist in {{metro}}”
- “Emergency dentist in {{metro}}”
B) Med spas / Aesthetics
- “Med spa in {{metro}}”
- “Aesthetic clinic in {{metro}}”
- “Botox in {{metro}}”
- “Laser hair removal in {{metro}}”
C) HVAC / Plumbing
- “HVAC contractor in {{metro}}”
- “Air conditioning repair in {{metro}}”
- “Plumber in {{metro}}”
- “Drain cleaning in {{metro}}”

Target pull size guideline:
- 25 metros x 3 verticals x ~10–15 businesses per metro per vertical = 750–1,125 prospects.

2) LEAD LIST CSV TEMPLATE (Sheets-ready)
Create a Google Sheet with these headers (row 1), then export CSV.
Required columns:
- business_name
- vertical (dentist | med_spa | hvac_plumbing)
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (0–1, based on last 10 reviews)
- segment (not_responding | low_rating | high_volume | combo)
- priority (A | B | C)
- owner_or_manager_name
- role_guess
- email_1
- email_2
- personalization_snippet (quote OR paraphrase of most recent review)
- response_gap_note (e.g., “no owner replies visible in last 10 reviews”)
- notes

Operational definitions (manual collection rules):
- last_review_date: the most recent Google review date.
- response_rate_proxy: count of the last 10 reviews that have an owner response / 10.
- personalization_snippet: 8–18 words from the most recent review OR a safe paraphrase (avoid health details; avoid profanity; do not mention protected classes).

Segmentation rules:
- not_responding = response_rate_proxy <= 0.2 OR 0 owner replies visible in last 10
- low_rating = google_rating < 4.2
- high_volume = review_count >= 200 OR (TODAY() - last_review_date) <= 14
- combo = if multiple are true

Priority scoring (simple):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only

Suggested Sheets formulas (adjust column letters to your sheet):
- segment (example logic):
  =IF(AND(not_responding,high_volume),"combo",IF(AND(low_rating,high_volume),"combo",IF(not_responding,"not_responding",IF(low_rating,"low_rating",IF(high_volume,"high_volume","")))))
- priority:
  =IF(OR(AND(not_responding,high_volume),AND(low_rating,high_volume)),"A",IF(OR(not_responding,low_rating),"B",IF(high_volume,"C","")))
(You can implement not_responding/low_rating/high_volume as helper columns first for simplicity.)

3) COLD EMAIL COPY (3-step) — include link + contact
General personalization tokens:
{{first_name}}, {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap_note}}, {{vertical}}, {{rating}}, {{review_count}}

3A) LOCAL BUSINESS — INITIAL (Variant routes by segment)
Subject line options:
1) Quick idea for {{business_name}} reviews
2) Noticed something on your Google reviews
3) Re: responding to new reviews at {{business_name}}

Body:
Hi {{first_name}} — Bob here.

I was looking at {{business_name}}’s Google reviews and noticed: “{{recent_review_snippet}}”. {{response_gap_note}}

We built a small Reputation Autopilot that drafts brand-safe replies for Google + Yelp, escalates negative reviews, and sends a weekly KPI summary. You can approve replies before anything posts.

Concrete offer: we reply within 12 hours, in your voice, and flag anything sensitive for human review.

If it helps, here’s our site so you know we’re real: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Open to a 10-minute call this week to see if we can clean up responses + protect your rating?
— Bob
agent_bob_replit+review-bot@agentmail.to

3B) FOLLOW-UP #1 (2–3 days later)
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

If I draft 3 example replies (using your recent reviews) and send them for approval, would that be useful? No posting unless you say yes.

If you want, reply with “send drafts” and I’ll email them over.
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

3C) FOLLOW-UP #2 (5–7 days later)
Subject: Close the loop?

Hi {{first_name}} — should I close the loop on this?

Most {{vertical}}s see better conversion when:
- every review gets a response quickly
- negative reviews get a calm, consistent escalation path
- weekly KPIs are visible (new reviews, response rate, rating trend)

If you’re the right person, I can send 3 drafts for your newest reviews. If not, who handles review replies at {{business_name}}?
— Bob
agent_bob_replit+review-bot@agentmail.to

4) AGENCY / RESELLER LANE — INITIAL EMAIL
Subject options:
1) White-label review replies for your local clients
2) Add-on offer for your dentists/med spas/home services

Body:
Hi {{first_name}} — Bob here.

If you manage local SEO or reputation for clients: we built a lightweight autopilot that drafts/queues brand-safe replies for Google + Yelp, escalates negatives, and sends weekly KPIs.

You can run it white-label (your team approves before posting), and it’s designed for high review-volume categories (dentists, med spas, HVAC/plumbing).

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Worth a 10-minute chat to see if this fits as a retainer add-on for your clients?
— Bob
agent_bob_replit+review-bot@agentmail.to

5) DAILY SENDING OPS (14-day ramp, list hygiene, reply SLAs)
List hygiene:
- Verify domain format (no typos), avoid contact forms as primary.
- Skip obvious franchises unless you can find local owner/manager email.
- QA sample 10% of new rows daily: correct category + real local business + valid website.

14-day sending ramp (per inbox):
- Days 1–2: 10/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Days 8–10: 40/day
- Days 11–14: 50/day
Follow-ups count toward the daily cap.

Handling rules:
- Reply SLA: same business day.
- Bounce threshold: pause list source if hard bounce rate > 3%.
- Complaint/unsub threshold: pause immediately if complaints > 0.2%.

Daily activity targets (starting week 2, assuming 1–2 inboxes):
- New sends: 50–100/day total
- Follow-ups: 25–50/day total
- Manual personalization: 20 Priority-A prospects/day (review snippet + response gap)

6) CRM PIPELINE (lightweight stages)
Stages + entry/exit criteria:
- Prospect (in CSV, not yet sent)
- Sent (email sent; waiting)
- Engaged (opened/clicked OR replied)
- Replied (any reply)
- Qualified (pain confirmed: low response rate / negative reviews / high volume + decision maker)
- Demo Booked (calendar time confirmed)
- Trial (connected GBP/Yelp or started draft workflow)
- Paid (invoice/subscription active)
- Lost (not now / no fit / unreachable)

Minimum KPI tracking weekly:
- Sends, replies, positive reply rate, meetings booked
- Bounce rate, spam complaints
- By segment: Priority A vs B vs C conversion

EXECUTION NOTES (what to do next)
1) Build first 200 leads using the query matrix (fast validation), then scale to 500–1,000.
2) Start with Priority A first (high volume + not responding / low rating).
3) Keep personalization safe: quote short and neutral; paraphrase if sensitive.
4) Always include the site link + contact email for legitimacy and easy reply handling.