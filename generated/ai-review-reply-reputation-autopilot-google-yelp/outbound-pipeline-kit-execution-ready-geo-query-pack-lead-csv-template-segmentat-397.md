# Outbound Pipeline Kit (Execution-Ready): Geo Query Pack + Lead CSV Template/Segmentation + Cold Email (3-Step) + Daily Ops/CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:45:29.684Z

---

BUSINESS
Offer: AI Review Reply & Reputation Autopilot (Google/Yelp)
Legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-p0ktnbl0.picard.replit.dev/sites/1
Reply-to / contact: agent_bob_replit+review-bot@agentmail.to

1) TARGETING: VERTICALS + GEOGRAPHY
Verticals (high review velocity + high LTV):
A) Dentists / Dental Clinics
B) Med Spas / Aesthetic Clinics
C) HVAC + Plumbers (home services)
Parallel lane: Marketing agencies serving these verticals.

Recommended geo for first 500–1,000: Top 25 US metros (high density, fast list build)
1 New York, NY
2 Los Angeles, CA
3 Chicago, IL
4 Houston, TX
5 Phoenix, AZ
6 Philadelphia, PA
7 San Antonio, TX
8 San Diego, CA
9 Dallas, TX
10 San Jose, CA
11 Austin, TX
12 Jacksonville, FL
13 San Francisco, CA
14 Columbus, OH
15 Fort Worth, TX
16 Indianapolis, IN
17 Charlotte, NC
18 Seattle, WA
19 Denver, CO
20 Washington, DC
21 Boston, MA
22 El Paso, TX
23 Nashville, TN
24 Detroit, MI
25 Portland, OR

2) LEAD LIST BUILD: QUERY PACK (GOOGLE MAPS)
Goal: pull 20–40 qualified leads per metro per vertical to reach 500–1,000 quickly.
Use these searches in Google Maps (repeat per metro):
Dentists:
- “dentist {metro}”
- “cosmetic dentist {metro}”
- “family dental {metro}”
Med spas:
- “med spa {metro}”
- “aesthetic clinic {metro}”
- “botox {metro}” (filter to clinics, not solo injectors if possible)
HVAC/Plumbing:
- “HVAC {metro}”
- “air conditioning repair {metro}”
- “plumber {metro}”
- “water heater repair {metro}”

Agency lane queries (per metro or state):
- “dental marketing agency {state}”
- “med spa marketing agency”
- “home services marketing agency”
- “local seo agency dentists”

Exclusions/QA rules while collecting:
- Exclude franchises where outreach will be blocked by corporate (e.g., multi-state national brands) unless location manager email is visible.
- Prefer businesses with: website present, review_count ≥ 40, last review within 60 days.
- Skip listings with no website and only a generic contact form unless phone outreach is planned.

3) CSV TEMPLATE (HEADERS) + DATA DICTIONARY
Create a Google Sheet with these columns (exact header row):
prospect_id,vertical,priority_tier,segment,business_name,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_response_count,response_rate_proxy,personalization_snippet,decision_maker_name,decision_maker_role,email_1,email_2,linkedin_url,notes,source

Data dictionary (how to fill):
- prospect_id: unique ID (e.g., DENT-NY-001)
- vertical: dentist | med_spa | hvac_plumbing | agency
- google_rating: star rating shown on GBP
- review_count: total reviews shown on GBP
- last_review_date: date of most recent review (approx ok)
- last_10_response_count: count owner responses in last 10 reviews (manual skim)
- response_rate_proxy: =last_10_response_count/10
- personalization_snippet: 1–2 lines from most recent review OR paraphrase (avoid sensitive health details)
- decision_maker_name/role: owner, practice manager, office manager, clinic manager, GM, operations manager
- email_1/email_2: from website contact page, team page, or common patterns (first@domain). Use best-available.

Segmentation rules (apply after entering review data):
- segment =
  IF(response_rate_proxy<=0.2, "not_responding",
    IF(google_rating<4.2, "low_rating",
      IF(review_count>=200 OR (TODAY()-last_review_date)<=14, "high_volume", "other")))

Priority tiers:
- Priority A: (segment in [not_responding, low_rating] AND (review_count>=200 OR (TODAY()-last_review_date)<=14))
- Priority B: segment in [not_responding, low_rating]
- Priority C: segment = high_volume
- Drop/Deprioritize: other

4) COLD EMAIL SEQUENCE (3-STEP) — READY TO SEND
General rules:
- Use plain text.
- Personalize first line with {personalization_snippet} + observable “response gap” (e.g., no owner reply).
- Always include legitimacy URL + simple CTA.
- Keep claim language conservative: “drafts brand-safe replies” + “you approve” + “escalates negatives.”

TOKENS
{first_name} {business_name} {city} {vertical_word} {personalization_snippet} {google_rating} {review_count} {response_gap}
Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-p0ktnbl0.picard.replit.dev/sites/1
Reply-to: agent_bob_replit+review-bot@agentmail.to

A) NOT RESPONDING — LOCAL BUSINESS (Initial)
Subject options:
1) Quick fix for {business_name}’s Google reviews
2) Noticed no replies to recent reviews
3) Review responses (done-for-you, 12h)

Email:
Hi {first_name} — quick note after looking at {business_name} on Google.

I saw a recent review: “{personalization_snippet}” and it looks like {response_gap}.

We run a simple “Review Reply & Reputation Autopilot” for local businesses: we draft brand-safe Google/Yelp replies and get them out within 12 hours (you can approve), and we flag negatives for escalation.

If you want, I can send 3 example replies for your latest reviews so you can see the tone. Interested?

Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-p0ktnbl0.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (2–3 days later)
Subject: Want me to draft 3 replies for {business_name}?
Body:
Hi {first_name} — circling back.

Most {vertical_word} owners don’t have time to reply consistently, but Google (and prospects) definitely notice.

If you reply “yes,” I’ll draft 3 responses based on your latest reviews and you can decide if it’s useful.
— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up 2 (5–7 days later)
Subject: Close the loop?
Body:
Hi {first_name} — should I close the loop on this?

If review replies aren’t a priority, no worries. If they are, we can run it fully managed (drafts + approval + escalation + weekly KPI email).

Want the 3 drafted replies sample?
— Bob
agent_bob_replit+review-bot@agentmail.to

B) LOW RATING — LOCAL BUSINESS (Initial)
Subject options:
1) Quick reputation win for {business_name}
2) Reducing 1–3 star impact (without being spammy)
3) Review response system (you approve)

Email:
Hi {first_name} — I was checking {business_name}’s Google profile.

When ratings are around {google_rating}, the fastest controllable lever is consistent, professional replies—especially on 1–3 star reviews.

We draft brand-safe responses (Google/Yelp), route negatives to you fast, and send a weekly KPI summary. You approve anything sensitive.

If you share the best email to send drafts to, I’ll send example replies for 2 recent reviews so you can see the approach.

Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-p0ktnbl0.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

C) HIGH VOLUME — LOCAL BUSINESS (Initial)
Subject options:
1) Handling review volume at {business_name}
2) 12-hour review reply coverage
3) Review replies: done-for-you ops

Email:
Hi {first_name} — {business_name} has strong review volume ({review_count}+).

When reviews come in frequently, the bottleneck becomes speed + consistency. We run a lightweight autopilot: replies drafted fast, brand-safe tone, optional approval, and negative-review escalation.

If I send a 1-page overview + a sample reply set for your latest reviews, would you take a look?

Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-p0ktnbl0.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

D) AGENCY / RESELLER (Initial)
Subject options:
1) Add review-reply autopilot to your client package
2) White-label review responses for local clients
3) Quick add-on for dentists/med spas/home services

Email:
Hi {first_name} — do you support local clients where Google/Yelp reviews impact bookings?

I run a “Review Reply & Reputation Autopilot” that agencies can bundle: brand-safe draft replies, optional client approval, negative escalation, and weekly KPI reporting.

If you tell me your main vertical (dentist / med spa / home services), I’ll send a simple reseller workflow + sample outputs.

Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-p0ktnbl0.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

5) DAILY SENDING OPS + CRM
Daily activity targets (starting conservative):
- Day 1–3: 20 new sends/day + follow-ups as replies come in
- Day 4–7: 40 new sends/day
- Day 8–14: 60–100 new sends/day (only if bounce <3% and spam complaints ~0)

Minimum daily cadence:
1) Pull 20–60 Priority A/B leads into “Ready to Send”
2) Personalize first line (review snippet + response gap)
3) Send initial emails
4) Log in CRM
5) Handle replies within same day (SLA)
6) Queue follow-ups automatically (2–3 days and 5–7 days)

CRM stages (simple):
- Prospect (not contacted)
- Ready to Send (email verified + personalized line ready)
- Sent (Step 1)
- Follow-up Scheduled
- Replied — Interested
- Replied — Not Now
- Qualified (has GBP/Yelp access path; has pain; decision maker)
- Demo Booked
- Trial / Pilot
- Paid
- Lost (no fit / no response / bad data)

Stop/health rules:
- If bounce rate >3% in a day: stop new sends, fix list hygiene.
- If any spam complaints: reduce volume, review copy, remove tracking, tighten targeting.
- QA sample: every 50 leads, check 5 for correct category + valid website + correct email domain.

6) HOW TO PRODUCE 500–1,000 LEADS FAST (FREE PATH)
Option (Free/manual):
- 2–3 hours/day yields ~30–60 good rows/day per person with this schema.
- To reach 750 rows: ~2 people x 7 days at 55/day each.
Workflow per lead (3–6 minutes):
1) Google Maps result → copy business name, phone, website, maps URL, rating, review count.
2) Click reviews → note last review date; skim last 10 reviews; count owner replies.
3) Capture short snippet (or paraphrase) for personalization.
4) Find email on website contact/team page; add email_1/email_2.
5) Sheet auto-computes segment + priority.

Option (Paid scraper) is faster but requires separate approval before spending.

WHAT I NEED FROM OWNER TO UNBLOCK THE CSV
- Confirm geo: Top 25 metros (recommended) OR specify 5–10 states.
- Confirm whether list build will be manual (free) or paid extractor (requires approval).

Once geo is confirmed, the next execution step is to start generating the 500–1,000 row CSV using the template above, then begin sending with Priority A first (not responding + high volume, and low rating + high volume).