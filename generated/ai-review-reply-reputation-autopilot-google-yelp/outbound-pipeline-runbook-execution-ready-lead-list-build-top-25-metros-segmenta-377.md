# Outbound Pipeline Runbook (Execution-Ready): Lead List Build (Top 25 Metros) + Segmentation + 3-Step Cold Email (w/ Website & Contact) + Daily Ops/CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:38:54.934Z

---

BUSINESS
Offer: AI Review Reply & Reputation Autopilot (Google/Yelp)
Legitimacy URL (include in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dta1w77k.picard.replit.dev/sites/1
Contact email (for replies): agent_bob_replit+review-bot@agentmail.to

GOAL (30 DAYS)
Build a predictable outbound machine: 500–1,000 local business leads + segmented messaging + daily sending ops that can be executed by owner or VA.

PART 1 — VERTICALS + ICP
Primary verticals (high review velocity + high LTV + clear ROI from response speed):
1) Dentists / dental clinics
2) Med spas / aesthetic clinics
3) HVAC + plumbers (home services)
Ideal accounts:
- Multiple new reviews per month (recent review within last 14 days)
- Review count: 50–1,000+
- Rating: <4.2 OR visible negative reviews in last 90 days OR low owner response rate
Buyer: owner, practice manager, office manager, GM.

PART 2 — TOP 25 US METROS (for consistent pulls)
Use these metros for Google Maps searches (city + state):
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

PART 3 — LEAD LIST CSV TEMPLATE (COLUMNS)
Create a Google Sheet with these columns (export CSV when complete):
- business_name
- vertical (dental | med_spa | hvac_plumbing)
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- last_review_excerpt (1–2 sentences; safe quote or paraphrase)
- response_rate_proxy (0–100%: owner replies in last 10 / 10)
- segment (not_responding | low_rating | high_volume)
- priority (A | B | C)
- owner_or_manager_name (if found)
- role_guess (owner | practice_manager | office_manager | gm)
- email_1
- email_2
- linkedin_url (optional)
- notes

PART 4 — EXACT GOOGLE MAPS QUERY PACK (COPY/PASTE)
Do NOT overcomplicate categories; use these exact strings.

DENTAL
For each metro, run:
- “dentist {CITY} {STATE}”
- “dental clinic {CITY} {STATE}”
- “cosmetic dentist {CITY} {STATE}”
- “family dentistry {CITY} {STATE}”

MED SPA / AESTHETICS
For each metro, run:
- “med spa {CITY} {STATE}”
- “aesthetic clinic {CITY} {STATE}”
- “botox {CITY} {STATE}”
- “laser hair removal {CITY} {STATE}”

HVAC + PLUMBING
For each metro, run:
- “HVAC {CITY} {STATE}”
- “air conditioning repair {CITY} {STATE}”
- “plumber {CITY} {STATE}”
- “emergency plumber {CITY} {STATE}”

Collection workflow per listing (manual/VA):
1) Open Google Maps listing.
2) Record rating + review_count.
3) Click Reviews → sort by Newest → capture last_review_date.
4) In the last 10 reviews: count owner responses (response_rate_proxy = responses/10).
5) Copy 1–2 sentences from most recent review (or paraphrase if sensitive).
6) Add website and phone.
7) Put listing link.

Email enrichment (free-first):
- If website exists: open site → find Contact/About; capture email.
- If none visible: try “privacy policy” or footer.
- Try format guesses only if domain is clear (keep as email_2, mark as guessed).

PART 5 — SEGMENTATION RULES (OPERATIONAL)
Compute:
A) Not Responding:
- response_rate_proxy ≤ 20% OR 0 owner replies in last 10.
B) Low Rating:
- google_rating < 4.2.
C) High Volume:
- review_count ≥ 200 OR last_review_date within 14 days.

Priority scoring:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: (not_responding) OR (low_rating)
- Priority C: high_volume only

PART 6 — 3-STEP COLD EMAIL (MASTER) WITH PLUG-IN SEGMENT BLOCKS
Use one template and swap the segment block. Always include legitimacy URL + contact email.

PERSONALIZATION TOKENS
{{first_name}} (if unknown: “there”)
{{business_name}}
{{city}}
{{recent_review_excerpt}}
{{rating}}
{{response_gap_observation}} (e.g., “couldn’t find many owner replies on recent reviews”)
{{vertical_specific_line}} (dentist/med spa/HVAC relevant)

EMAIL #1 (INITIAL)
Subject options (pick one):
1) Quick question about {{business_name}} reviews
2) Noticed a recent review ({{business_name}})
3) {{business_name}}: faster review replies?

Body:
Hi {{first_name}} — I’m Bob.

I was looking at {{business_name}} in {{city}} and saw this recent review: “{{recent_review_excerpt}}”.

{{SEGMENT_BLOCK_1}}

We run an AI Review Reply & Reputation Autopilot for Google/Yelp: brand-safe draft replies, negative-review escalation, and a simple weekly KPI report. You stay in control (approve before posting, or set rules).

If it’s helpful, I can send 2–3 sample replies for your latest reviews (free) so you can see tone/quality.

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dta1w77k.picard.replit.dev/sites/1
Reply here or email: agent_bob_replit+review-bot@agentmail.to

Worth a 10-minute chat this week?
— Bob

SEGMENT_BLOCK_1 (choose one)
A) NOT RESPONDING:
“I also noticed {{response_gap_observation}}. A fast, consistent owner response can lift conversion from Maps (people read the replies), but it’s a time sink.”

B) LOW RATING:
“I noticed the rating is around {{rating}}. The biggest win usually isn’t ‘arguing’—it’s fast, calm responses + an escalation loop so the unhappy customer gets handled offline.”

C) HIGH VOLUME:
“You’re getting steady review volume, which is great—but it’s hard to keep replies consistent (and compliant) when things get busy.”

EMAIL #2 (FOLLOW-UP 1, +2 business days)
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

If I draft a couple replies in your voice based on your most recent reviews (including one negative/neutral if applicable), would you want to see them?

{{SEGMENT_BLOCK_2}}

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dta1w77k.picard.replit.dev/sites/1
Best email: agent_bob_replit+review-bot@agentmail.to

— Bob

SEGMENT_BLOCK_2
A) NOT RESPONDING:
“Most clients start with a simple rule: reply to every new review within 12 hours, or we alert you if it’s negative.”
B) LOW RATING:
“We can route anything <3 stars to you first, then post only after approval so nothing brand-risky goes out.”
C) HIGH VOLUME:
“We can batch + queue replies so you never fall behind, and keep tone consistent across locations/staff.”

EMAIL #3 (FOLLOW-UP 2, +4–6 business days)
Subject options:
1) Should I close the loop?
2) Okay to send examples?

Hi {{first_name}} — last note from me.

If review replies aren’t a focus right now, no worries—should I close your file?

If you are open to it, reply with “examples” and I’ll send a few draft responses for {{business_name}} (free) based on your latest reviews.

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dta1w77k.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

PART 7 — AGENCY / RESELLER LANE (OPTIONAL PARALLEL OUTREACH)
Target: local SEO agencies, reputation management agencies, web design shops serving dentists/med spas/home services.
Search footprints:
- “dental marketing agency {CITY}”
- “med spa marketing agency {CITY}”
- “HVAC marketing agency {CITY}”
- “reputation management agency {CITY}”

Agency Email #1 (initial)
Subject: White-label review reply autopilot for your clients?

Hi {{first_name}} — I’m Bob.

If you manage local clients (dentists/med spas/home services), we built a simple AI Review Reply & Reputation Autopilot for Google/Yelp: brand-safe replies, negative-review escalation, weekly KPIs.

You can offer it as:
- a white-label add-on, or
- a done-for-you service where you remain the primary.

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dta1w77k.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

Open to a 10-min chat to see if it fits your retainers?
— Bob

PART 8 — DAILY SENDING OPS (NO-TOOL ASSUMPTIONS)
Daily targets (conservative, deliverability-friendly):
- Day 1–2: 20 new sends/day
- Day 3–4: 30/day
- Day 5–7: 40/day
- Week 2: 50–80/day (depending on inbox health)

Rules:
- If bounce rate > 3% in a day: stop new sends, fix list hygiene.
- Replies SLA: respond within 2 business hours.
- Negative-review prospects: always propose “approve-before-post” to reduce brand-risk concerns.

PART 9 — CRM STAGES (SIMPLE)
Stages + exit criteria:
1) Prospect (in sheet)
2) Sent (Email #1 sent)
3) Engaged (reply OR explicit interest)
4) Qualified (has access to Google Business Profile/Yelp, has ongoing review volume, agrees to approval model)
5) Demo Booked
6) Trial / Pilot
7) Paid
8) Lost (reason logged: no need, in-house, wrong contact, budget)

PART 10 — PRODUCTION PLAN TO REACH 500–1,000 LEADS (MANUAL/VA)
Quota math (typical manual speed):
- 15–25 leads/hour if only listing data.
- 8–15 leads/hour if also capturing email from website.

Recommended workflow:
- Day 1: Build 100 leads (all three verticals, 5 metros) + QA 20%.
- Day 2–4: Build 300–400 leads + QA 10%.
- Day 5–7: Build remaining to 500–1,000 + QA 5–10%.

QA checklist (spot-check sample rows daily):
- Correct vertical/category
- Has website or at least phone
- Rating/review_count accurate
- last_review_date within 90 days for Priority A/B where possible
- response_rate_proxy computed consistently (last 10 reviews)

What to do next (execution order):
1) Pick metros from Top 25 list; start with 5–8 metros to reach first 200 leads fastest.
2) Build leads + segment + priority.
3) Start sending to Priority A first; log replies in CRM.
4) Iterate messaging based on top objections.
