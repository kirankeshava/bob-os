# Outbound Pipeline Runbook (Top 25 US Metros) — Lead List Build Spec + Segmentation + Cold Email Sequences + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:21:33.294Z

---

Business legitimacy references (use in emails):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Reply-to / contact: agent_bob_replit+review-bot@agentmail.to

GOAL
Build a targeted outbound machine for 3 local-business verticals (Dentists, Med Spas, HVAC/Plumbing) plus an agency/reseller lane. Output: 500–1,000 prospects with segmentation (Not Responding / Low Rating / High Volume), then run daily cold email with a 14-day ramp.

A) GEO SCOPE (LOCKED FOR V1)
Use Top 25 US metros to maximize review velocity and buying power:
New York, Los Angeles, Chicago, Dallas, Houston, Atlanta, Washington DC, Miami, Philadelphia, Phoenix, Boston, San Francisco, Riverside-San Bernardino, Detroit, Seattle, Minneapolis, San Diego, Tampa, Denver, Baltimore, Charlotte, Orlando, San Antonio, Portland, Austin.

B) GOOGLE MAPS QUERY PACK (COPY/PASTE)
Run each query inside Google Maps. Collect top relevant results; avoid franchises when possible.

Dentists:
- “dentist + {metro}”
- “family dentistry + {metro}”
- “cosmetic dentist + {metro}”
- “dental implants + {metro}”

Med Spas / Aesthetic Clinics:
- “med spa + {metro}”
- “aesthetic clinic + {metro}”
- “botox + {metro}”
- “laser hair removal + {metro}”

HVAC / Plumbing:
- “HVAC + {metro}”
- “air conditioning repair + {metro}”
- “plumber + {metro}”
- “water heater repair + {metro}”

Agency/Reseller lane (marketing agencies serving these verticals):
- “dental marketing agency + {metro}”
- “med spa marketing agency + {metro}”
- “HVAC marketing agency + {metro}”
- “local SEO agency + {metro}”
- “reputation management agency + {metro}”

C) LEAD LIST CSV — REQUIRED COLUMNS
Create a Google Sheet with these columns (export to CSV):
1 business_name
2 vertical (dentist | med_spa | hvac_plumbing | agency)
3 city_state
4 phone
5 website
6 google_maps_url
7 google_rating
8 review_count
9 last_review_date (date of most recent Google review)
10 last_review_excerpt (max ~20–30 words; or paraphrase)
11 owner_response_in_last_review (Y/N)
12 responses_in_last_10 (0–10)  → count of owner/manager responses in the last 10 reviews
13 response_rate_proxy (=responses_in_last_10/10)
14 segment (not_responding | low_rating | high_volume)
15 priority (A | B | C)
16 contact_name (best guess; optional)
17 role_guess (Owner | Office Manager | Practice Manager | GM | Marketing)
18 email_1
19 email_2
20 notes (anything useful: “reviews mention no reply”, “multiple recent 1-stars”, etc.)

Email sourcing (zero-cost hierarchy):
1) Website contact page (best)
2) About/team pages (practice manager)
3) Footer / privacy policy email
4) If none, use contact form URL in notes and set email blank (still usable for a form-based variant later)

D) SEGMENTATION RULES (APPLY CONSISTENTLY)
Compute segment from these rules:
- Not Responding: response_rate_proxy ≤ 0.2 (0–2 replies out of last 10 reviews) OR no owner replies visible in last 10
- Low Rating: google_rating < 4.2
- High Volume: review_count ≥ 200 OR last_review_date within last 14 days

If multiple apply, choose primary segment by this precedence:
1) Low Rating
2) Not Responding
3) High Volume

Priority scoring:
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: Not Responding OR Low Rating (without High Volume)
- Priority C: High Volume only

E) DAILY SENDING OPS (14-DAY RAMP, 1 INBOX)
Assumes one outbound inbox. If multiple inboxes, split volumes evenly.
Day 1–2: 15/day new sends, 0 follow-ups
Day 3–4: 25/day new sends, start follow-ups (5/day)
Day 5–7: 40/day new sends, follow-ups (10/day)
Day 8–10: 60/day new sends, follow-ups (15/day)
Day 11–14: 80–100/day new sends, follow-ups (20/day)

Rules:
- Stop/slowdown if bounce rate > 3% daily or spam complaints > 0.1%.
- Reply SLA: respond within 2 hours during business hours; same day otherwise.
- Always personalize first line with last_review_excerpt or response-gap observation.

CRM PIPELINE STAGES (SIMPLE)
Prospect (in CSV) → Sent (E1) → Sent (FU1) → Sent (FU2) → Replied → Qualified → Demo Booked → Trial/Pilot → Paid → Lost.
Exit criteria:
- Qualified = they confirm they manage Google/Yelp and have pain/urgency OR ask pricing.
- Lost = explicit no, wrong contact, or repeated bounces.

F) COLD EMAIL COPY (3-STEP) — DIRECT TO LOCAL BUSINESSES
Use tokens: {{first_name}}, {{business}}, {{city}}, {{vertical}}, {{last_review_excerpt}}, {{last_review_date}}, {{response_gap_observation}}.

1) NOT RESPONDING — Email 1
Subject options:
- “Quick question about your Google reviews”
- “{{business}}: replying to reviews (12-hour promise)”
- “Missed replies on recent reviews?”

Body:
Hi {{first_name}} — I was looking at {{business}}’s Google reviews and noticed a few recent ones don’t have an owner response.

Example from {{last_review_date}}: “{{last_review_excerpt}}”

We run an AI-assisted review reply + escalation workflow for local businesses: brand-safe draft replies (Google + Yelp), negative reviews get flagged immediately, and you can approve everything before it posts.

If helpful, we can start by drafting responses for your last 10 reviews and set a rule to reply within 12 hours going forward.

Want me to send 2–3 sample replies for {{business}} (no charge) so you can see the tone? 

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply here: agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (2–3 days later)
Subject: “Re: {{business}} reviews”
Hi {{first_name}} — checking if you want sample replies for the reviews that currently have no response. If you paste 1–2 review links (or I can use the public listing), I’ll draft them in your brand voice and you can approve.

Worth a quick look?
— Bob

Follow-up 2 (4–6 days later)
Subject: “Close the loop?”
Last try — most businesses see more calls/bookings when they consistently respond, especially to 3-star and below.

If you want, I’ll set you up with a simple weekly report (rating trend, review velocity, response rate) and a 12-hour reply workflow. Interested, or should I close this out?
— Bob

2) LOW RATING — Email 1
Subject options:
- “Idea to prevent more 1-star damage”
- “{{business}} reputation quick win”
- “Fixing review replies (without sounding defensive)”

Body:
Hi {{first_name}} — I saw {{business}}’s current Google rating and a couple of recent critical reviews.

Recent example: “{{last_review_excerpt}}”

We help local businesses respond fast and safely: drafts that acknowledge, de-escalate, and move the conversation offline; plus an alert when a negative review hits so it doesn’t sit unanswered.

If you want, I can draft responses to the last 3 negative reviews in a calm, compliant tone for your approval.

Should I send the drafts?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1
If you’re not the right person: who handles Google/Yelp reviews for {{business}}?

Follow-up 2
We can also generate a weekly reputation KPI email (rating change, new reviews, response time, unresolved negatives). Want that set up?

3) HIGH VOLUME — Email 1
Subject options:
- “Keeping up with review volume at {{business}}”
- “High review volume → easy wins”
- “We can reply within 12 hours”

Body:
Hi {{first_name}} — {{business}} is getting a steady stream of reviews. Most teams fall behind simply because it’s time-consuming.

We run a lightweight “reputation autopilot”: drafts replies in your brand voice for Google/Yelp, flags negatives instantly, and sends a weekly KPI summary. You approve before anything posts.

If you want, I’ll draft replies for your most recent 10 reviews so you can see if it matches your tone.

Open to a 10-minute look?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

G) AGENCY / RESELLER EMAIL (THE “BULK DEAL” LANE)
Subject options:
- “White-label review reply autopilot for your clients”
- “Add-on offer: Google/Yelp replies + weekly KPIs”

Body:
Hi {{first_name}} — do you manage Google Business Profile / reputation for clients in {{vertical}}?

We provide a white-labelable workflow that:
- drafts brand-safe Google + Yelp responses
- escalates negative reviews same day
- sends weekly reputation KPIs (rating trend, review velocity, response rate)
- can run “approval-first” so you/clients control posting

If it’s interesting, I can share a simple reseller setup and pricing so you can bundle it into your retainers.

Want details?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

H) VA EXECUTION INSTRUCTIONS (DAILY)
Daily target (single VA): 60–80 new rows/day with full Google fields + website email capture; 20 rows/day with response-rate proxy (last 10 review scan) to keep quality.
QA checklist (sample 10% of rows daily): correct category, working website, real local business (not directory), rating/review count match listing, last_review_date captured, email present or contact-form noted.

NEXT ACTION TO GET TO SENDING
1) Use the query pack to collect the first 200 leads (Priority A/B weighted) in 48 hours.
2) Export CSV, then start Day 1 ramp (15/day) with the matching segment template.
3) Track replies + bounces; refine subject lines and segment thresholds after 100 sends.
