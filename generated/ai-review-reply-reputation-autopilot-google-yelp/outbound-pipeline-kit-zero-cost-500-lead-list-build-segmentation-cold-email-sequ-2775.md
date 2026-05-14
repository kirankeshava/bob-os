# Outbound Pipeline Kit (Zero-Cost): 500-Lead List Build + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T06:09:41.197Z

---

BUSINESS CONTEXT
Offer: AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp. Drafts brand-safe responses, escalates negative reviews, weekly KPI reporting.
Legitimacy link to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email to include: agent_bob_replit+review-bot@agentmail.to

PART A — VERTICALS + TARGETING (HIGH INTENT)
Primary verticals (start with 2 for speed; keep 3rd as overflow):
1) Dentists / Dental clinics
2) Med spas / Aesthetic clinics
3) HVAC + Plumbers (home services)
High-intent triggers:
- Not Responding: business rarely responds to reviews (weak trust signal)
- Low Rating: <4.2 (reputation drag)
- High Volume: 200+ reviews OR last review within 14 days (high review velocity)

Recommended GEO for v1 (fast list quality): Top 25 US metros.
Example metros (use as the core): New York NY, Los Angeles CA, Chicago IL, Houston TX, Phoenix AZ, Philadelphia PA, San Antonio TX, San Diego CA, Dallas TX, San Jose CA, Austin TX, Jacksonville FL, Fort Worth TX, Columbus OH, Charlotte NC, San Francisco CA, Indianapolis IN, Seattle WA, Denver CO, Washington DC, Boston MA, El Paso TX, Nashville TN, Detroit MI, Oklahoma City OK.

PART B — GOOGLE MAPS QUERY PACK (COPY/PASTE)
Run these searches in Google Maps (or Google Search with “site:google.com/maps”):
Dentists:
- “dentist {city}”
- “cosmetic dentist {city}”
- “family dentistry {city}”
Med spas:
- “med spa {city}”
- “aesthetic clinic {city}”
- “botox {city}”
HVAC/Plumbing:
- “hvac {city}”
- “air conditioning repair {city}”
- “plumber {city}”

Filters while collecting:
- Avoid obvious national franchises unless independently owned
- Prefer businesses with an actual website (not only Facebook)
- Prefer businesses with review velocity (last review within 60 days)

PART C — LEAD LIST CSV TEMPLATE (HEADERS)
Use exactly these columns in Google Sheets and export CSV:
- business_name
- vertical (dentist | med_spa | hvac_plumbing)
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (0–100)
- segment (not_responding | low_rating | high_volume | combo)
- priority (A | B | C)
- owner_or_manager_name (if found)
- role_guess (owner | manager | office_manager | practice_manager)
- email_1
- email_2
- personalization_snippet (short quote OR paraphrase of last review)
- notes

How to capture fields quickly (manual, $0):
1) Open the Google Business Profile listing.
2) Copy rating + review count.
3) Click “Reviews” → sort by “Newest” → record date of most recent review.
4) For response_rate_proxy: scan the last ~10 reviews and count how many have an “Owner response.” Response proxy = (responses/10)*100.
5) For website: use the “Website” button in GBP. If absent, skip or mark blank.
6) For emails: check the business website Contact/About page first; if absent, use a contact form and put “CONTACT_FORM” in email_1.

Segmentation rules:
- not_responding if response_rate_proxy <= 20
- low_rating if google_rating < 4.2
- high_volume if review_count >= 200 OR (today - last_review_date) <= 14 days
- combo if multiple apply (e.g., low_rating + high_volume)

Priority scoring:
Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume) OR (low_rating AND not_responding)
Priority B: not_responding OR low_rating
Priority C: high_volume only

Suggested Google Sheets formulas (assumes columns):
- segment (pseudo-logic):
IF(AND(not_responding,low_rating,high_volume),"combo",
 IF(AND(not_responding,low_rating),"combo",
 IF(AND(low_rating,high_volume),"combo",
 IF(AND(not_responding,high_volume),"combo",
 IF(not_responding,"not_responding", IF(low_rating,"low_rating", IF(high_volume,"high_volume","")))))))
- priority:
IF(OR(AND(not_responding,high_volume),AND(low_rating,high_volume),AND(low_rating,not_responding)),"A",
 IF(OR(not_responding,low_rating),"B",
 IF(high_volume,"C","")))

PART D — DAILY PRODUCTION TARGETS (TO HIT 500 LEADS FAST)
Goal: 500 leads in 5 working days (100/day) with one person.
Daily plan:
- 40 dentists
- 40 med spas
- 20 HVAC/plumbing
Time expectation: ~2–4 minutes/lead once in rhythm.
QA sampling: every 25 leads, re-check 3 random rows for rating/review count/date accuracy.

PART E — COLD EMAIL SEQUENCES (3-STEP) WITH PERSONALIZATION
Personalization tokens:
- {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap}} (e.g., “looks like the last few reviews didn’t get a reply”), {{rating}}, {{review_count}}
Compliance/policy note: Prefer paraphrase over long quotes; avoid mentioning sensitive topics; keep snippets short.

EMAIL 1 (Not Responding angle)
Subject options:
1) Quick help with review replies for {{business_name}}
2) Noticed a review reply gap ({{city}})
3) 12-hour review responses (you approve)

Body:
Hi {{first_name_or_role}},

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”. It also looks like a few of the latest reviews didn’t get an owner reply.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses to Google + Yelp reviews, escalates negatives, and sends a weekly KPI recap. You stay in control: replies can be approval-first.

Free for the first 7 days: we’ll respond within 12 hours to new reviews (and can backfill a few recent ones if you want).

Want me to send 3 ready-to-post replies for your latest reviews so you can see the tone? You can also see what we do here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

EMAIL 1 (Low Rating angle)
Subject options:
1) Fixing review damage (without sounding robotic)
2) Quick win for {{business_name}}’s rating
3) Reply playbook for tough reviews

Body:
Hi {{first_name_or_role}},

I noticed {{business_name}} is at {{rating}} on Google. One recent review mentioned: “{{recent_review_snippet}}”.

We help local teams respond fast and safely: drafted replies (Google/Yelp), negative-review escalation, and a weekly reputation report so issues don’t get buried. Everything is brand-safe and can be approval-first.

I can draft 3 responses tailored to your voice (free, 7-day trial) — including one for a negative review — and you can decide if it’s useful.

Should I send the drafts here?

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

EMAIL 1 (High Volume angle)
Subject options:
1) Keeping up with {{review_count}} reviews
2) High-volume review replies in 12 hours
3) Review ops for {{business_name}}

Body:
Hi {{first_name_or_role}},

{{business_name}} has {{review_count}} Google reviews and they’re coming in steadily. Most teams fall behind on replies once volume picks up.

We run a simple “reputation autopilot”: draft/post brand-safe replies (Google/Yelp), escalate negatives to your team, and report weekly KPIs. Free for 7 days — and you can choose approval-first.

If I draft replies for the 3 newest reviews, would you like them in a Google Doc or email?

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

FOLLOW-UP 1 (2–3 days later)
Subject: Re: review replies for {{business_name}}
Body:
Hi {{first_name_or_role}},

Quick follow-up — want me to send 3 example replies for your most recent reviews? If you like the tone, we can run this free for 7 days and respond within 12 hours going forward.

If there’s a specific tone you prefer (friendly/clinical/luxury), tell me and I’ll match it.

— Bob
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 2 (5–7 days later)
Subject: close the loop?
Body:
Hi {{first_name_or_role}},

Should I close the loop on this, or is review response help relevant right now?

If it is, I can start with a no-risk setup: you approve everything, and we send a weekly reputation KPI summary.

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

PART F — DAILY SENDING OPS (NO PAID TOOLS REQUIRED)
Tooling (free):
- Gmail/Google Workspace (if already owned) or any existing inbox
- Google Sheets as CRM
- Manual sending: 30–50/day/inbox to stay safe; ramp gradually

14-day ramp (per inbox):
- Days 1–3: 20/day (Priority A only)
- Days 4–7: 35/day (A + best B)
- Days 8–14: 50/day (A + B; keep C for later)

List hygiene + safety:
- Never attach files on cold emails; use plain text.
- If bounce rate > 5% in a day: pause sending, fix list.
- If complaint/unsubscribe negative replies increase: reduce volume and tighten targeting.
- Reply SLA: respond to interested replies within 2 hours during business day.

PART G — CRM PIPELINE (SHEETS OR HUBSPOT FREE)
Stages + entry criteria:
1) Prospect (meets segment rules, has contact method)
2) Sent (email 1 sent)
3) Replied (any reply)
4) Qualified (has GBP/Yelp + wants help + can approve)
5) Demo Booked (calendar time set)
6) Trial Active (7-day free)
7) Paid (post-week-1)
8) Lost (not now / wrong fit / no response)

Daily operator checklist (30 minutes):
- Pull 30–50 Priority A/B prospects
- Personalize {{recent_review_snippet}} + {{response_gap}}
- Send Email 1
- Send Follow-up 1 to due list
- Log replies and move stages
- End of day: record sent, replies, positive replies, demos booked
