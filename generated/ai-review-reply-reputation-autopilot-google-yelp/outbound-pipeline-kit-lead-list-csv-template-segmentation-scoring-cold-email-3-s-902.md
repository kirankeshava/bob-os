# Outbound Pipeline Kit — Lead List CSV Template + Segmentation/Scoring + Cold Email (3-step) + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:25:11.399Z

---

Below is a complete, ready-to-run outbound kit for AI Review Reply & Reputation Autopilot (Google/Yelp).

A) GEO + VERTICAL PLAN (for first 1,000 prospects)
- Geography: Top 25 US metros (use city + state in queries). Example metros: New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, San Francisco, Columbus, Fort Worth, Indianapolis, Charlotte, Seattle, Denver, Washington DC, Boston, El Paso, Detroit, Nashville, Portland.
- Direct-to-local list: 850 leads total
  - Dentists: 300
  - Med spas / aesthetics: 300
  - HVAC + plumbers: 250
- Agency lane (parallel): 150 leads total (marketing agencies specializing in local SEO, reputation management, dental marketing, med spa marketing, home services marketing)

B) CSV TEMPLATE (copy/paste headers)
business_name,vertical,metro,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_reviews_owner_responses,last_10_reviews_total,response_rate_proxy,segment_not_responding,segment_low_rating,segment_high_volume,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,yelp_url,yelp_rating,yelp_review_count,personalization_snippet,notes,source

C) SEGMENTATION + PRIORITY SCORING (Google Sheets formulas)
Assume columns:
- google_rating in H
- review_count in I
- last_review_date in J
- last_10_reviews_owner_responses in K
- last_10_reviews_total in L
- response_rate_proxy in M

1) Response rate proxy (M2):
=IFERROR(K2/L2,0)

2) Not responding flag (N2 as segment_not_responding):
=IF(M2<=0.2,TRUE,FALSE)

3) Low rating flag (O2 as segment_low_rating):
=IF(H2<4.2,TRUE,FALSE)

4) High volume flag (P2 as segment_high_volume):
=IF(OR(I2>=200, TODAY()-J2<=14), TRUE, FALSE)

5) Priority tier (Q2):
=IF(OR(AND(N2=TRUE,P2=TRUE),AND(O2=TRUE,P2=TRUE)),"A",IF(OR(N2=TRUE,O2=TRUE),"B",IF(P2=TRUE,"C","D")))

Segment definitions (for routing message angle):
- not_responding: response_rate_proxy <= 20% (0.2)
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within 14 days

D) LEAD COLLECTION WORKFLOW (zero-cost)
For each metro + vertical, run Google Maps searches:
- Dentists: “dentist”, “dental clinic”, “cosmetic dentist”, “family dentist” + [metro]
- Med spas: “med spa”, “aesthetic clinic”, “botox”, “laser hair removal” + [metro]
- HVAC/plumbing: “HVAC”, “air conditioning repair”, “plumber”, “water heater repair” + [metro]
For each prospect, capture:
- Rating, review count (from GBP panel)
- Last review date + whether owner responded (open reviews; check last 10)
- Website + phone
- Personalization snippet: either (a) paraphrase the latest review pain point/praise, or (b) quote 6–12 words max (avoid sensitive info)
Then find emails:
- On website: Contact/About, footer, booking pages
- If none: use formats (info@, hello@, office@) + owner name if available

E) COLD EMAIL — 3-STEP SEQUENCE (with personalization + segment hooks)
Use these tokens:
{{first_name}} {{business_name}} {{city}} {{vertical}} {{recent_review_snippet}} {{response_gap}} {{rating}} {{review_count}} {{last_review_date}} {{cal_link}}

Always include legitimacy references:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

Email 1 (Initial) — choose one subject
Subjects:
1) Quick fix for your Google reviews at {{business_name}}
2) Noticed a review response gap for {{business_name}}
3) {{business_name}} reputation → replies within 12 hours

Body:
Hi {{first_name}} — Bob here.

I was looking at {{business_name}}’s Google reviews and noticed {{personalization_snippet}}. Also saw {{response_gap}} (looks like not every recent review is getting a response).

We run an “AI Review Reply & Reputation Autopilot” for local businesses: brand-safe responses to Google/Yelp reviews, negative reviews escalated instantly, and weekly KPI reporting. You can approve replies before anything posts.

Concrete offer: we can start by drafting replies for your last 10 reviews and set a 12-hour response SLA going forward.

If helpful, here’s our site for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Should I send over 3 sample replies for real reviews from {{business_name}}? (No login needed.)

— Bob
agent_bob_replit+review-bot@agentmail.to

Email 2 (Follow-up, 2–3 days later)
Subject: Re: review replies for {{business_name}}

Hi {{first_name}} — quick follow-up.

Most {{vertical}} owners we talk to want the same thing: respond fast without risking an “off-brand” reply.

If you reply with “samples”, I’ll draft 3 responses (1 positive, 1 neutral, 1 negative-style) based on your recent reviews. You can edit/approve, and we’ll match your tone.

Worth sending?
— Bob
agent_bob_replit+review-bot@agentmail.to

Email 3 (Breakup / last touch, 4–6 days later)
Subject: Close the loop?

Hi {{first_name}} — should I close the loop on this?

If review responses aren’t a priority right now, no worries. If they are: we can take it off your plate and report weekly on response time, rating trend, and negative-review escalations.

If you want, I’ll send a short summary of what we’d fix first at {{business_name}} based on your last 10 reviews.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Segment-specific hook guidance:
- Not responding: {{response_gap}} = “several recent reviews don’t have an owner response”
- Low rating: reference fixing detractors + escalation workflow (“we flag 1–2 star reviews immediately”)
- High volume: emphasize throughput + SLA (“we keep up with volume so response time stays under 12 hours”)

F) AGENCY / RESELLER VERSION (Email 1)
Subject options: White-label review replies for your local clients / Reputation ops add-on

Hi {{first_name}} — Bob here.

Do you manage SEO/GBP for local clients (dental/med spa/home services)? We provide a white-label “review reply autopilot”: brand-safe drafts, approvals, negative-review escalation, and weekly KPI reporting.

If you tell me your client mix, I can send a simple package you can resell (per-location pricing) and a sample weekly report.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

Open to a 10-minute chat this week?
— Bob

G) DAILY SENDING OPS + CRM
Daily targets (once ramped):
- New sends: 50–100/day
- Follow-ups: 50–150/day (depending on cadence)
- Manual personalization: Priority A only (10–20/day) using snippet + response gap

14-day ramp (per inbox):
- Days 1–3: 10–15/day
- Days 4–7: 20–30/day
- Days 8–10: 35–45/day
- Days 11–14: 50/day (cap)
Guardrails:
- Stop/reroute list if bounce rate > 3% in a day or complaints > 0.1%
- Only one link max; plain text; consistent signature
- Remove invalid domains; avoid role accounts if you have a named manager email

CRM stages (minimum viable):
Prospect → Sent → Opened/Clicked → Replied → Qualified → Demo Booked → Trial/Onboarding → Paid → Lost
Definitions:
- Qualified = confirmed they own/manage GBP/Yelp OR handle marketing, and have review volume/pain
- Lost reasons: no control, not priority, already have service, wrong contact, do-not-contact

H) WHAT’S STILL NEEDED TO HIT THE DELIVERABLE “500–1,000 LEAD CSV”
- Populate 500–1,000 rows using the CSV template above (manual/VA or a scraper).
- Minimum quality bar: website + phone + maps URL + rating + review_count + last_review_date + response_rate_proxy + segment + priority.
- Email completion: best effort (at least one contact email per record; otherwise mark blank and keep for a call/DM lane).
