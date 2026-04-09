# Outbound Pipeline Kit — Lead List CSV Template + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:02:56.572Z

---

BUSINESS REFERENCES (use in all outreach)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

1) LEAD LIST CSV TEMPLATE (copy header row into Sheets/CSV)
lead_id,business_name,vertical,city,state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,response_rate_proxy_last10,segment_not_responding,segment_low_rating,segment_high_volume,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,source_notes,personalization_hook_line,email_variant_to_send

DATA DICTIONARY (how to fill each field quickly)
- vertical: dentist | med_spa | hvac_plumbing | agency
- google_rating/review_count: from Google Business Profile (GBP) panel
- last_review_date: date shown on the most recent review
- last_review_snippet: 8–20 words. Prefer paraphrase; if quoting, keep short and non-sensitive.
- response_rate_proxy_last10: count of owner responses among the last 10 reviews / 10. Example: 0.1 = 10%.
- segment_not_responding: TRUE if response_rate_proxy_last10 <= 0.2 OR 0 replies in last 10
- segment_low_rating: TRUE if google_rating < 4.2
- segment_high_volume: TRUE if review_count >= 200 OR last_review_date within 14 days
- priority_tier:
  - A if (not_responding AND high_volume) OR (low_rating AND high_volume)
  - B if (not_responding) OR (low_rating)
  - C if (high_volume only)
- owner_or_manager_name/role_guess: from website “Team/About”, LinkedIn, or GBP if listed
- emails: from website contact pages first; then LinkedIn; then patterns from domain (owner@, info@, office@). Capture best-available.
- personalization_hook_line: 1 sentence referencing review activity and response gap (no judgment).
- email_variant_to_send: map using rules below.

2) GEO + QUERY PACK (ZERO-COST GOOGLE MAPS COLLECTION)
Use these searches in Google Maps. Collect top 20–40 per query per metro until you hit 500–1,000.

Recommended starting metros (edit after owner confirms): New York NY, Los Angeles CA, Chicago IL, Houston TX, Phoenix AZ, Philadelphia PA, San Antonio TX, San Diego CA, Dallas TX, San Jose CA, Austin TX, Jacksonville FL, Fort Worth TX, Columbus OH, Charlotte NC.

DENTIST queries (per metro)
- “dentist {metro}”
- “cosmetic dentist {metro}”
- “family dentistry {metro}”

MED SPA queries (per metro)
- “med spa {metro}”
- “aesthetic clinic {metro}”
- “botox {metro}”

HVAC/PLUMBING queries (per metro)
- “HVAC company {metro}”
- “air conditioning repair {metro}”
- “plumber {metro}”

AGENCY lane queries (optional parallel list)
- “dental marketing agency {metro/state}”
- “med spa marketing agency {metro/state}”
- “home services marketing agency {metro/state}”
Collect agencies with case studies and service pages that mention reputation management/local SEO.

3) SEGMENTATION → EMAIL VARIANT ROUTING
Set email_variant_to_send using:
- If vertical in (dentist, med_spa, hvac_plumbing):
  - If segment_not_responding=TRUE and priority_tier in (A,B): use VARIANT-NR (Not Responding)
  - Else if segment_low_rating=TRUE: use VARIANT-LR (Low Rating)
  - Else if segment_high_volume=TRUE: use VARIANT-HV (High Volume)
- If vertical=agency: use VARIANT-AGENCY

4) COLD EMAIL SEQUENCES (3-step) — WITH REQUIRED WEBSITE + CONTACT EMAIL

GLOBAL PERSONALIZATION TOKENS
{{first_name}} (if unknown use “there”), {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap_fact}}, {{vertical_label}}, {{website_link}}, {{contact_email}}
Use website_link as the legitimacy proof link above. Use contact_email as the reply-to/forward-to.

SUBJECT LINE BANK (pick 1)
- “Quick idea for {{business_name}} reviews”
- “Noticed your recent Google reviews”
- “Re: responding to reviews (12-hour SLA)”
- “{{business_name}} — review replies”

EMAIL 1 — VARIANT-NR (Not Responding / response gap)
Subject: Noticed your recent Google reviews
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and saw a recent one that mentioned “{{recent_review_snippet}}”.

It also looks like some reviews aren’t getting responses ({{response_gap_fact}}). Responding fast tends to lift conversion from Maps because prospects see you’re active.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe replies for Google + Yelp, escalates negatives, and sends weekly KPI reporting. You can approve before anything posts.

If it’s helpful, I can send 3 sample replies in your tone for your latest reviews. Here’s our site for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1

Want me to draft those samples and email them back here (or to agent_bob_replit+review-bot@agentmail.to)?
— Bob

FOLLOW-UP 1 (2–3 days later)
Subject: Re: {{business_name}} review replies
Hi {{first_name}} — quick follow-up.
If you send me the link to your GBP (or confirm it’s this one: {{google_maps_url}}), I’ll draft 3 replies (1 positive, 1 neutral, 1 negative) that match your brand voice. No commitment.

If you’d rather, reply “send” and I’ll forward the drafts to agent_bob_replit+review-bot@agentmail.to.
— Bob

FOLLOW-UP 2 (5–7 days later)
Subject: Last note — review replies
Hi {{first_name}} — last note.
If review replies are already handled, I can step out. If not, would a simple “we reply within 12 hours + you approve” workflow be useful?

Either way, here’s the product overview again: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
— Bob

EMAIL 1 — VARIANT-LR (Low Rating / reputation recovery)
Subject: {{business_name}} — quick reputation fix
Hi {{first_name}} — I noticed {{business_name}} is at {{google_rating}} on Google.

Totally fixable, but the fastest lever is consistent, calm responses to every review (especially negatives) + escalation so issues get resolved before they snowball.

Our AI Review Reply & Reputation Autopilot drafts brand-safe responses for Google/Yelp, flags high-risk reviews for human escalation, and reports weekly KPIs. You approve before posting.

If you want, I’ll draft responses for your last 5 reviews (free) so you can see the tone. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1

Should I send the drafts to you here, or to agent_bob_replit+review-bot@agentmail.to?
— Bob

FOLLOW-UP 1
Subject: Re: {{business_name}} rating
Hi {{first_name}} — if you share any do-not-say rules (HIPAA-sensitive, pricing, etc.), I’ll make sure the drafts avoid them.

Want 5 draft replies for your latest reviews?
— Bob

FOLLOW-UP 2
Subject: Closing the loop
Hi {{first_name}} — should I close this out, or is improving review responses a priority this month?
— Bob

EMAIL 1 — VARIANT-HV (High Volume / operations)
Subject: Keeping up with review volume
Hi {{first_name}} — {{business_name}} is getting a lot of review activity ({{review_count}} total; last review {{last_review_date}}).

When volume is high, the challenge is operational: consistent tone, fast replies, and catching negatives early.

We built an AI Review Reply & Reputation Autopilot for Google/Yelp: drafts replies, routes negatives for escalation, and sends weekly reputation KPIs. You can approve before anything posts.

If you’re open, I can show a 2-minute workflow and send 3 sample replies. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1

Worth a quick look?
— Bob

FOLLOW-UP 1
Subject: Re: review volume
Hi {{first_name}} — do you have a target reply time (same-day vs 24–48h)? We can align the workflow to that.
— Bob

FOLLOW-UP 2
Subject: Last check
Hi {{first_name}} — last check: should I send the sample replies or pause outreach?
— Bob

EMAIL 1 — VARIANT-AGENCY (reseller)
Subject: Add-on for your local clients (reviews)
Hi {{first_name}} — I’m reaching out because you work with {{vertical_label}} clients.

We built an AI Review Reply & Reputation Autopilot for Google/Yelp that agencies can offer as a white-glove add-on: brand-safe draft replies, negative-review escalation, and weekly KPI reporting. Client can approve before posting.

If you want to evaluate, I can set you up with a demo workflow and a reseller margin option. Product overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1

Who’s best to talk to about add-on services/retainers? You can also reply and I’ll route everything via agent_bob_replit+review-bot@agentmail.to.
— Bob

5) DAILY SENDING OPS + CRM (READY TO RUN)
CRM Stages:
1. Prospect (in CSV, not contacted)
2. Sent (Email 1 sent)
3. Engaged (opened/clicked or reply)
4. Replied – Positive
5. Replied – Not now
6. Qualified (has GBP/Yelp + wants help + decision maker)
7. Demo Booked
8. Trial/Proof (we draft samples or run limited pilot)
9. Paid
10. Lost (reason)

14-Day Ramp (per inbox)
- Days 1–2: 10/day
- Days 3–4: 20/day
- Days 5–6: 30/day
- Days 7–10: 40/day
- Days 11–14: 50/day
Rules: stop increasing if bounce >3% in a day or spam complaints >0.1%.

Daily minimum activity targets (single operator)
- New sends: 50/day (after ramp)
- Follow-ups: 25/day
- Manual personalization upgrades: 10/day (Priority A only)
- Agency outreach: 10/day (separate list)

QA rules before sending
- Must have: business_name, website OR phone, google_rating, review_count, last_review_date, google_maps_url
- Exclude: national franchises (unless owner-operated), businesses with no website and generic emails only (optional), categories that don’t match vertical
- Personalization safety: avoid quoting patient/medical specifics; prefer paraphrase; no mention of protected classes; stay neutral.

Reply handling SLA
- Same-day response to positive replies
- For “send samples” requests: deliver within 12 business hours
- Always include legitimacy link and contact email

KPI targets (weekly)
- Bounce rate < 3%
- Positive reply rate 2–5% (early), 5–10% (optimized)
- Demo booked rate 0.5–1.5% of sent

This kit is ready: once geography is confirmed, a human/VA can populate 500–1,000 rows using the query pack and routing rules, then start sending with the sequences above.