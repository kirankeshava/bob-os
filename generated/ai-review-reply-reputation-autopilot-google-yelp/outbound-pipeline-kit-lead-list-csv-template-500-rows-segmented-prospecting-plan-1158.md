# Outbound Pipeline Kit — Lead List CSV Template (500 rows), Segmented Prospecting Plan, Cold Email Sequences (3-step), Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:28:52.790Z

---

Below is a complete, ready-to-run outbound pipeline kit for AI Review Reply & Reputation Autopilot (Google/Yelp). It includes (A) a lead list CSV template with formulas and segmentation rules, (B) a segmented prospecting plan (verticals + geo + priority routing), (C) a 3-step cold email sequence with vertical and segment variants, and (D) daily sending ops checklist + CRM stages.

BUSINESS REFERENCES (use in all outreach)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

A) LEAD LIST CSV TEMPLATE (500 ROWS)
Copy/paste the header row into Google Sheets, then export CSV.

CSV HEADERS:
business_name,vertical,service_subtype,city,state,zip,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy,last_10_responses_count,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes,source_query,date_added

DATA DICTIONARY (what to enter)
- vertical: Dental | MedSpa | HVAC/Plumbing | Agency
- service_subtype: e.g., “cosmetic dentist”, “aesthetic clinic”, “plumber”, “HVAC contractor”
- google_rating/review_count/last_review_date: from Google Business Profile
- last_review_excerpt: 8–20 words max OR paraphrase; avoid sensitive info
- last_10_responses_count: count of owner responses in last 10 reviews (0–10)
- response_rate_proxy: formula = last_10_responses_count/10
- segment (rules):
  • not_responding = response_rate_proxy<=0.2 OR last_10_responses_count<=2
  • low_rating = google_rating<4.2
  • high_volume = review_count>=200 OR last_review_date within 14 days
  • if multiple apply, set segment to the most painful: low_rating > not_responding > high_volume
- priority (rules):
  • A = (not_responding AND high_volume) OR (low_rating AND high_volume)
  • B = not_responding OR low_rating
  • C = high_volume only

SHEET FORMULAS (Google Sheets)
Assume columns:
- google_rating = J
- review_count = K
- last_review_date = L
- last_10_responses_count = O
- response_rate_proxy = N

In N2 (response_rate_proxy):
=IF(O2="","",O2/10)

In P2 (segment):
=IF(J2="","",IF(J2<4.2,"low_rating",IF(N2<=0.2,"not_responding",IF(OR(K2>=200,TODAY()-L2<=14),"high_volume",""))))

In Q2 (priority):
=IF(P2="","",IF(OR(AND(P2="not_responding",OR(K2>=200,TODAY()-L2<=14)),AND(P2="low_rating",OR(K2>=200,TODAY()-L2<=14))),"A",IF(OR(P2="not_responding",P2="low_rating"),"B",IF(P2="high_volume","C",""))))

B) SEGMENTED PROSPECTING PLAN
Goal: high-intent local businesses where review responsiveness directly impacts bookings.

VERTICALS (start with these 3)
1) Dental practices
   - Why: high-margin procedures, strong reliance on trust, frequent review mentions of staff/service
   - Targets: independent practices (avoid huge DSOs initially)
2) Med spas / aesthetic clinics
   - Why: review-driven acquisition, high competition, consistent review velocity
   - Targets: “med spa”, “aesthetic clinic”, “botox”, “laser hair removal” clinics
3) HVAC + Plumbing (home services)
   - Why: call-driven revenue, reviews influence local pack ranking and conversions
   - Targets: “HVAC contractor”, “plumber”, “air conditioning repair”

AGENCY/RESELLER LANE (parallel)
- Targets: local SEO agencies, reputation management agencies, web design shops serving these verticals
- Offer: white-label review reply autopilot + weekly KPI report; agency margin preserved

GEO STRATEGY (recommended to start)
Pick Top 15 US metros and pull ~35 leads per vertical per metro (adjust to hit 500–1,000):
- New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, San Francisco, Columbus, Fort Worth

GOOGLE MAPS QUERIES (examples)
- Dental: “cosmetic dentist {city}”, “family dentist {city}”, “dental implant {city}”
- Med spa: “med spa {city}”, “aesthetic clinic {city}”, “botox {city}”
- HVAC/Plumbing: “HVAC contractor {city}”, “air conditioning repair {city}”, “plumber {city}”
- Agencies: “local SEO agency {city} dentists”, “reputation management agency {city}”, “digital marketing agency {city} med spa”

PRIORITY ROUTING (what to contact first)
- Priority A: not responding + high volume OR low rating + high volume (highest urgency)
- Priority B: not responding or low rating (clear pain)
- Priority C: high volume only (process/scale angle)

OFFER POSITIONING BY SEGMENT
- not_responding: “You’re leaving trust + conversions on the table; we reply within 12 hours with brand-safe drafts and you approve.”
- low_rating: “Damage control + escalation; respond fast to negatives, flag issues, and show prospects you care.”
- high_volume: “Operational burden; consistent voice, fewer staff hours, weekly KPIs.”

C) COLD EMAIL COPY (3-STEP) — WITH WEBSITE + CONTACT INCLUDED
Personalization tokens:
- {{first_name}} {{business_name}} {{city}} {{vertical}} {{recent_review_excerpt}} {{response_gap_note}} {{rating}} {{review_count}}

SUBJECT LINES (rotate)
1) Quick fix for your Google reviews at {{business_name}}
2) Noticed a review response gap ({{business_name}})
3) 12-hour review replies (brand-safe) for {{business_name}}

EMAIL 1 — BASE TEMPLATE (edit first line per segment)
Hi {{first_name}} — quick note after looking at {{business_name}}’s Google reviews.

{{segment_hook}}

We run an AI Review Reply & Reputation Autopilot for local businesses: we draft (and can post) brand-safe responses to Google Business Profile + Yelp reviews, escalate negatives, and send a weekly KPI report (rating trend, response rate, unresolved issues).

What you get:
- Replies drafted within 12 hours
- Consistent “on-brand” voice (no risky AI outputs)
- Negative reviews flagged/escalated immediately
- Weekly reputation KPIs so you can see improvement

If you want, I can send 3 draft replies for your latest reviews so you can see the tone first.

Worth a 10-minute look this week?
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply here: agent_bob_replit+review-bot@agentmail.to

— Bob

SEGMENT HOOKS (drop into {{segment_hook}})
- not_responding hook:
“Your recent review said: ‘{{recent_review_excerpt}}’ — but it looks like many reviews aren’t getting a public response. That’s often lost trust for the next person deciding who to book.”
- low_rating hook:
“I noticed your rating is around {{rating}} and there are a few negative reviews near the top. Fast, calm responses (and escalation internally) can prevent those from becoming the story prospects see.”
- high_volume hook:
“You’ve got ~{{review_count}} reviews and recent activity—at that volume, responding consistently is basically a part-time job. We systematize it so it stays consistent and fast.”

VERTICAL TWEAKS (add one sentence after the hook)
- Dental add-on: “For dentists, we also avoid risky clinical claims and keep replies HIPAA-safe (no details, just professionalism and next steps).”
- Med spa add-on: “For med spas, we keep replies compliant and avoid over-promising results—tone stays premium and calm.”
- HVAC/Plumbing add-on: “For home services, we emphasize speed, accountability, and clear next steps—reduces call friction.”

FOLLOW-UP 1 (2–3 days later)
Subject: Re: Google review replies for {{business_name}}

Hi {{first_name}} — circling back.

If I draft 3 replies for {{business_name}} (based on your most recent reviews, including one negative if you have it), would you like them:
A) short + professional
B) warm + detailed
C) premium/concierge tone

No commitment—just reply A/B/C.
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

FOLLOW-UP 2 (5–7 days later)
Subject: Close the loop?

Hi {{first_name}} — should I close this out?

If review responses are already handled, no worries. If not, the simplest starting point is:
- we draft replies for all new reviews
- you approve (or we post)
- negatives get escalated same-day
- you get a weekly KPI report

Want me to send sample drafts for {{business_name}}?
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

AGENCY/RESELLER VERSION (INITIAL EMAIL)
Subject: White-label review response autopilot for your clients

Hi {{first_name}} — I’m reaching out because you work with local businesses ({{vertical_focus}}).

We offer a white-label AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp: brand-safe drafts, optional posting, negative review escalation, and weekly KPI reporting.

Agencies use it to:
- increase client response rate + trust
- reduce manual review workload
- add a sticky recurring service with margin

If you tell me your top 1–2 verticals (dentist/med spa/home services), I’ll send a one-pager and example outputs.
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

D) DAILY SENDING OPS CHECKLIST + CRM STAGES

TOOLS (free-first)
- CRM: Google Sheets (tab per stage) or HubSpot Free
- Sending: Gmail/Workspace inboxes (manual) initially; track replies in CRM
- Tracking: avoid heavy tracking early; prioritize deliverability

CRM STAGES (with entry/exit criteria)
1) Prospects (new rows added; QA passed)
2) Ready to Send (email validated; personalization snippet present)
3) Sent – Email 1
4) Follow-up 1 Sent
5) Follow-up 2 Sent
6) Replied – Interested (asked question, wants details)
7) Replied – Not Now (set follow-up date)
8) Qualified (has GBP/Yelp + wants help + authority)
9) Demo Booked
10) Trial/Onboarding
11) Paid
12) Lost (no fit / hostile / wrong contact)

14-DAY RAMP (per inbox)
- Days 1–3: 15/day (manual, high personalization)
- Days 4–6: 25/day
- Days 7–10: 40/day
- Days 11–14: 60/day (only if bounce rate <3% and reply rate healthy)

DAILY TARGETS (single-inbox start)
- New prospects added: 30/day
- Emails sent: 25–60/day (ramped)
- Follow-ups: 10–30/day
- Personalization: minimum 1 line (review excerpt/response gap) for Priority A/B

LIST QA RULES (before sending)
- Must have: business_name, google_maps_url, rating, review_count, last_review_date, website OR phone
- Exclude: chains/franchises with corporate review teams; businesses without GBP; irrelevant categories
- Email validation (free): check website contact page; if none, use pattern guess only if confident; otherwise keep phone for call/SMS later

THRESHOLDS (stop and fix if breached)
- Bounce rate > 3% in a day: pause, clean list, validate emails
- Spam complaints: pause immediately; reduce volume; improve targeting/personalization
- Reply SLA: respond to interested replies within 1 business hour

WEEKLY KPI REPORT (internal)
- Sent, delivered (if available), replies, positive replies, meetings booked
- Priority A conversion vs B/C
- Common objections and best-performing subject lines

NEXT EXECUTION STEP (what the owner does today)
1) Pick geography: Top 15 metros (recommended) OR 5–10 states.
2) Fill first 200 rows in the CSV template (Priority A/B first).
3) Send Email 1 to 25–40/day for week 1; log outcomes in CRM stages.
4) Iterate subject lines + segment hooks based on replies.

If you want me to lock the geo plan without further input: choose Top 15 metros and pull 60 leads per metro (20 per vertical) to reach ~900, then prioritize A/B for first sends.
