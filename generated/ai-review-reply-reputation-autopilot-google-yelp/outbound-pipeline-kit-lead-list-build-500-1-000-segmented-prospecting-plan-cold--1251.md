# Outbound Pipeline Kit — Lead List Build (500–1,000) + Segmented Prospecting Plan + Cold Email (3-step) + Daily Ops/CRM (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:43:56.597Z

---

BUSINESS CONTEXT
Offer: AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp. Drafts brand-safe responses, escalates negatives, weekly KPI reporting.
Legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply-to/contact email to include in outreach: agent_bob_replit+review-bot@agentmail.to

1) VERTICALS + ICP (WHY THESE)
A) Dental practices (high LTV patients, frequent review decisions, front-desk bandwidth constraints)
B) Med spas / aesthetic clinics (high competition, reputation-sensitive, high review velocity)
C) HVAC/Plumbing (urgent, local search-driven, high volume, owners too busy)
Secondary lane: local marketing agencies managing multiple SMBs (resell/wholesale).

2) REQUIRED LEAD CSV SCHEMA (COPY/PASTE HEADERS)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_3_review_dates,response_rate_proxy_last10,segment,priority,personalization_snippet,notes,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url

Data dictionary (quick):
- google_rating: star rating shown on Google Business Profile.
- review_count: total reviews count on profile.
- last_review_date: date of most recent review.
- response_rate_proxy_last10: count of owner responses in last 10 reviews / 10 (as %). If fewer than 10 recent reviews visible, use available and note denominator in notes.
- personalization_snippet: 6–20 word excerpt OR paraphrase from the most recent review (avoid sensitive PHI/medical details; when in doubt paraphrase).
- segment and priority computed by rules below.

3) SEGMENTATION RULES (OPERATIONAL)
Compute segment flags:
- NOT_RESPONDING = response_rate_proxy_last10 <= 20% OR 0 responses observed in last 10 reviews.
- LOW_RATING = google_rating < 4.2
- HIGH_VOLUME = review_count >= 200 OR last_review_date within 14 days

Assign segment (pick primary, but you can include multiple in notes):
- If LOW_RATING and HIGH_VOLUME: segment=low_rating
- Else if NOT_RESPONDING and HIGH_VOLUME: segment=not_responding
- Else if LOW_RATING: segment=low_rating
- Else if NOT_RESPONDING: segment=not_responding
- Else if HIGH_VOLUME: segment=high_volume
- Else segment=general

Priority rubric:
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only
- Priority D: general

Message angle mapping:
- not_responding → “response gap” angle + speed (12 hours) + approval control
- low_rating → “save-the-next-review” + escalation + consistency/brand safety
- high_volume → “ops/offload” + weekly KPI report + consistency across staff

4) LEAD LIST BUILD WORKFLOW (ZERO-COST)
Goal: 500–1,000 rows in 5–10 working days with 1 person at ~50–120 rows/day depending on depth.

Step-by-step:
A) Choose geography scope (you decide):
- Option 1: Top 25 US metros (fast, broad)
- Option 2: 5–10 states where you want density (better territory focus)
- Option 3: US-wide (harder QA, more variance)

B) Google Maps query pack (use “city” + query). For each city, run these:
Dentists:
- “dentist city”
- “dental clinic city”
- “cosmetic dentist city”
Med spas:
- “med spa city”
- “aesthetic clinic city”
- “botox clinic city”
HVAC/Plumbing:
- “hvac company city”
- “air conditioning repair city”
- “plumber city”

Agency lane queries (for reseller list):
- “dental marketing agency city/state”
- “med spa marketing agency city/state”
- “home services marketing agency city/state”

C) Collection procedure per lead:
1. Open GBP listing in Google Maps
2. Capture: business name, phone, website, maps URL, rating, review count
3. Click Reviews → sort by “Newest”
4. Record last_review_date and last 3 review dates
5. For response proxy: scan newest ~10 reviews and count business-owner responses (fast method: search for “Response from the owner”)
6. Capture personalization_snippet from latest review (or paraphrase)
7. Segment + priority using rules in section 3
8. Find email(s):
   - Check website footer/contact page
   - Look for “appointments@ / info@ / office@ / support@”
   - If none, use a contact form URL in notes and keep email blank for later enrichment

QA rules (reject/skip):
- No website AND no clear contact method
- Big national franchise listings if decision-maker not reachable
- Category mismatch (e.g., “dental supply” not practice)
- Duplicate locations unless you want multi-location (if so, flag multi_location=yes)

5) COLD EMAIL COPY — 3-STEP SEQUENCE (INCLUDES LEGITIMACY URL + CONTACT EMAIL)

TOKENS
{{first_name}} {{business_name}} {{city}} {{vertical}} {{recent_review_snippet}} {{response_gap}} {{rating}} {{review_count}} {{last_review_date}}

GENERAL SUBJECTS (swap by segment)
- “Quick idea for {{business_name}} reviews”
- “Noticed a small review response gap”
- “Re: your Google reviews in {{city}}”
- “12-hour review replies (you approve)”

A) NOT RESPONDING — INITIAL (Local Business)
Subject: Noticed a review response gap at {{business_name}}

Hi {{first_name}} — Bob here.

I was looking at {{business_name}}’s recent Google reviews and saw: “{{recent_review_snippet}}”. I also noticed {{response_gap}} (looks like many reviews don’t get a public reply).

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google + Yelp, escalates negative reviews, and sends a weekly KPI recap. Key point: you can approve replies before they post, and we respond within 12 hours.

If you want, I can send 3 ready-to-post reply drafts for your most recent reviews so you can see the tone.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a 10-minute call this week?
— Bob
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 1 (2–3 days later)
Subject: Want me to draft replies for the latest reviews?

Hi {{first_name}} — I can draft replies for the latest 5 Google reviews at {{business_name}} (including a safe template for negatives) and you can approve/edit.

If it’s easier, just reply “yes” and tell me who should approve replies (you/front desk/manager).

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 2 (5–7 days later)
Subject: Close the loop?

{{first_name}}, should I (a) send the sample reply drafts, or (b) leave this for now?

Either way, if you want to stop reviews from sitting unanswered, we can take it off your plate with 12-hour drafts + weekly KPIs.

— Bob
agent_bob_replit+review-bot@agentmail.to

B) LOW RATING — INITIAL (Local Business)
Subject: Quick win to protect {{business_name}}’s rating

Hi {{first_name}} — Bob here.

I saw {{business_name}} is around {{rating}} on Google. A recent review said: “{{recent_review_snippet}}”.

We help businesses respond consistently (Google + Yelp), escalate negatives fast, and track weekly reputation KPIs. The goal is to prevent the next negative review by replying quickly, offering an offline resolution path, and showing prospects you’re attentive.

If you’d like, I’ll draft responses for the last 3–5 reviews (including a de-escalation reply) and send them over for approval.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a quick 10 minutes?
— Bob
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 1
Subject: I can draft a safe response to the toughest review

If you point me to the 1–2 reviews you’re most worried about, I’ll draft brand-safe replies that:
- acknowledge,
- move details offline,
- invite resolution,
- avoid sounding defensive.

Want me to send drafts?
— Bob
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 2
Subject: Should I send the drafts or pause?

{{first_name}} — should I send the sample drafts for {{business_name}}, or pause outreach?

— Bob

C) HIGH VOLUME — INITIAL (Local Business)
Subject: Offload review replies for {{business_name}}?

Hi {{first_name}} — Bob here.

{{business_name}} has ~{{review_count}} Google reviews and recent activity (last review {{last_review_date}}). When review volume is high, replies tend to get inconsistent or delayed.

We run an autopilot that drafts on-brand replies for Google + Yelp, routes negatives for escalation, and emails a weekly KPI report (new reviews, response rate, sentiment, and hotspots). You approve replies (or we can auto-post using rules).

Want me to show what your weekly report + reply drafts would look like?

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 1
Subject: Sample weekly KPI report for {{business_name}}?

I can generate a sample “week in reviews” snapshot and 5 reply drafts so you can judge tone + usefulness.

Who’s best to send it to?
— Bob

FOLLOW-UP 2
Subject: Last ping

Should I send the sample snapshot/drafts, or close this out?
— Bob

D) AGENCY / RESELLER — INITIAL
Subject: White-label review reply automation for your clients

Hi {{first_name}} — Bob here.

If you manage local SEO/reputation for multiple SMBs, we built an AI Review Reply & Reputation Autopilot for Google + Yelp: brand-safe drafts, negative escalation, and weekly KPI reporting.

Agencies use it to:
- keep response rates high across many locations,
- standardize tone,
- reduce account manager time.

We can support white-label or “powered by” and set approval workflows per client.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
If useful, I can share a demo account + pricing for agency bundles.
— Bob
agent_bob_replit+review-bot@agentmail.to

6) DAILY SENDING OPS (14-DAY RAMP) + RULES
Assumptions: 1 inbox to start, cold outbound only, manual personalization light.

Deliverability rules:
- Keep daily new sends low until domain/inbox reputation established.
- Remove any lead that bounces; if bounce rate >3% stop and clean list.
- Complaints/unsubscribes: honor immediately; if complaint rate spikes, pause.

Ramp schedule (per inbox):
Days 1–3: 10–15 new/day (no more than 25 total including follow-ups)
Days 4–7: 20–35 new/day (max 50 total)
Days 8–14: 40–60 new/day (max 80 total)
After day 14: 60–100 new/day only if bounce <3% and replies steady.

Daily workflow checklist (operator):
1) Add 50–120 new leads to CRM (as available)
2) QA sample 10% of new leads (category match, website, rating/reviews)
3) Personalize first line using {{recent_review_snippet}} + {{response_gap}}
4) Send new emails within cap
5) Process replies 2x/day (AM/PM), tag outcome, book demos
6) Send follow-ups automatically/manually per schedule
7) Weekly: export KPIs (sent, delivered, bounce, open if available, reply rate, positive reply rate, demos)

Reply handling SLA:
- Same business day response to any positive intent
- Negative response: polite close + opt-out

7) CRM STAGES (SIMPLE, OPERATIONAL)
Stages + entry/exit:
- Prospect (lead created, not emailed)
- Sent (initial sent)
- Replied (any reply)
- Qualified (has Google/Yelp presence + clear pain + decision-maker)
- Demo Booked (calendar set)
- Trial/POC (connected or drafting samples)
- Paid (subscription live)
- Lost (not interested/no fit/no response after 2 follow-ups)

Core KPI targets (initial):
- Bounce < 3%
- Reply rate 3–8% (cold)
- Demo rate 0.5–2% of sends
- Close rate 20–40% of demos for small-ticket SaaS if pain is real

WHAT I NEED FROM OWNER TO UNBLOCK EXECUTION
1) Choose initial geography scope (Top 25 US metros vs 5–10 states vs US-wide).
2) Decide who will do list build (you vs VA). Use the workflow above to generate 500–1,000 rows, then start day-1 sending ramp.

If you want, I can also provide a Google Sheet layout mirroring the CSV headers and formulas for segment/priority once geography is confirmed.