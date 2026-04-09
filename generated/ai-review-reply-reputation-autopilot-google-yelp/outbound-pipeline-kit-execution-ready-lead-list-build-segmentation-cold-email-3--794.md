# Outbound Pipeline Kit (Execution-Ready): Lead List Build → Segmentation → Cold Email (3-step) → Daily Sending Ops + CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T10:29:29.450Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Legitimacy URL (use in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply/contact inbox (use in outreach): agent_bob_replit+review-bot@agentmail.to

========================================
A) VERTICALS + ICP (2–3 lanes)
========================================
Lane 1: Dentists / Dental clinics
- Why: high LTV patients, high sensitivity to trust + reviews, many practices under-respond.
- Buyer: practice owner, practice manager, office manager.

Lane 2: Med spas / Aesthetic clinics
- Why: very review-driven demand gen, fast review velocity, strong willingness to pay.
- Buyer: owner, clinic manager, operations manager.

Lane 3: HVAC / Plumbing (Home services)
- Why: high review velocity + local competition, direct revenue impact from star rating.
- Buyer: owner, GM, operations manager.

Parallel lane: Marketing agencies serving these verticals (resell/white-label)
- Buyer: agency owner, account director, head of local SEO.

========================================
B) LEAD LIST BUILD (ZERO-COST WORKFLOW)
========================================
Goal: 500–1,000 prospects with: category/vertical, geo, Google rating, review count, last review date, response-rate proxy, and a safe personalization hook.

B1) Geography selection options (pick ONE for initial list)
- Option 1 (recommended): Top 25 US metros.
- Option 2: 5–10 target states.
- Option 3: US-wide (harder to keep consistent).

B2) Google Maps query patterns (copy/paste)
For each metro/state, run these searches in Google Maps:
Dentists
- “dentist + {city}”
- “cosmetic dentist + {city}”
- “dental implants + {city}”
Med spas
- “med spa + {city}”
- “aesthetic clinic + {city}”
- “botox + {city}”
HVAC/Plumbing
- “HVAC + {city}”
- “air conditioning repair + {city}”
- “plumber + {city}”

B3) Selection rules (to keep list high-intent)
Include if:
- Has a Google Business Profile listing with >= 30 reviews (prefer >= 75).
- Has a website or clear booking phone.
- Not a national call-center directory.
Exclude if:
- Obvious multi-location franchise corporate listing where local manager isn’t reachable.
- No real website and no obvious decision-maker path.

B4) Data capture fields (CSV headers)
Use these exact headers:
- business_name
- vertical
- city_state
- phone
- website
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy_last10
- segment
- priority_tier
- personalization_snippet
- owner_or_manager_name
- role_guess
- email_1
- email_2
- notes

B5) How to capture the “response_rate_proxy_last10”
Open the Google reviews tab, scroll through the last ~10 reviews.
Count how many have an owner response.
Compute: (owner_responses / 10) * 100.
Example: 1 response out of last 10 = 10%.

B6) How to capture “last_review_date”
Use the most recent review date visible in the listing.

B7) Safe personalization snippet rule (brand-safe)
- Prefer paraphrase over quotes: “Saw a recent review mentioning {theme}.”
- If quoting, quote <= 10 words and never include medical claims, personal health info, or sensitive details.
- Do not reference reviewer full names.

========================================
C) SEGMENTATION + PRIORITY SCORING (SHEET FORMULAS)
========================================
C1) Segment definitions
- NOT_RESPONDING: response_rate_proxy_last10 <= 20
- LOW_RATING: google_rating < 4.2
- HIGH_VOLUME: review_count >= 200 OR last_review_date within 14 days

C2) Segment assignment logic (simple)
If LOW_RATING = true → segment = “low_rating”
Else if NOT_RESPONDING = true → segment = “not_responding”
Else if HIGH_VOLUME = true → segment = “high_volume”
Else segment = “baseline”

C3) Priority tier rules
Priority A:
- (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
Priority B:
- NOT_RESPONDING OR LOW_RATING
Priority C:
- HIGH_VOLUME only

C4) Example Google Sheets formulas (adjust column letters to match your sheet)
Assume:
- google_rating in H
- review_count in I
- last_review_date in J (as a date)
- response_rate_proxy_last10 in K

HIGH_VOLUME (helper):
=IF(OR(I2>=200, TODAY()-J2<=14), TRUE, FALSE)
NOT_RESPONDING (helper):
=IF(K2<=20, TRUE, FALSE)
LOW_RATING (helper):
=IF(H2<4.2, TRUE, FALSE)

segment:
=IF(H2<4.2,"low_rating", IF(K2<=20,"not_responding", IF(OR(I2>=200, TODAY()-J2<=14),"high_volume","baseline")))

priority_tier:
=IF(OR(AND(K2<=20, OR(I2>=200, TODAY()-J2<=14)), AND(H2<4.2, OR(I2>=200, TODAY()-J2<=14))),"A", IF(OR(K2<=20, H2<4.2),"B", IF(OR(I2>=200, TODAY()-J2<=14),"C","D")))

========================================
D) COLD EMAIL COPY (3-STEP) — LOCAL BUSINESS
========================================
Personalization tokens:
- {{first_name}} (if unknown use “there”)
- {{business_name}}
- {{city}}
- {{vertical}}
- {{personalization_snippet}} (paraphrase of recent review theme)
- {{response_gap}} (e.g., “I didn’t see many owner replies recently”)

Hard references required:
- Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

D1) SUBJECT LINES (rotate)
Not responding:
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed a reply gap on your reviews
3) 12-hour review replies for {{business_name}}

Low rating:
1) Turning 3–4★ reviews into wins
2) Reputation recovery for {{business_name}}
3) A simple way to reduce review damage

High volume:
1) Keeping up with review volume at {{business_name}}
2) Auto-drafting replies (you approve)
3) Review ops support for {{business_name}}

D2) EMAIL #1 (choose angle by segment)

(Variant A: NOT RESPONDING)
Subject: Noticed a reply gap on your reviews

Hi {{first_name}},

I was looking at {{business_name}} in {{city}} and saw a recent review mentioning {{personalization_snippet}}. I also noticed {{response_gap}}.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe Google/Yelp responses and keeps you on a “respond within 12 hours” SLA. You can approve replies before anything posts, and we escalate negative reviews so they don’t sit unanswered.

If you want to sanity-check legitimacy, here’s the site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Open to a 10-minute call this week to see if we can take review responses off your plate?

— Bob
agent_bob_replit+review-bot@agentmail.to

(Variant B: LOW RATING)
Subject: Turning 3–4★ reviews into wins

Hi {{first_name}},

I was reviewing {{business_name}} and noticed a few recent reviews pointing to {{personalization_snippet}}. When those go unanswered, they tend to become the “story” future customers see.

We help local businesses respond fast with brand-safe, on-message replies (Google + Yelp). You approve, we post, and anything negative gets escalated immediately with suggested remediation language.

Site for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Would it be crazy to test this for 14 days and see if response speed + tone improves conversion?

— Bob
agent_bob_replit+review-bot@agentmail.to

(Variant C: HIGH VOLUME)
Subject: Keeping up with review volume at {{business_name}}

Hi {{first_name}},

{{business_name}} gets a steady stream of reviews, and that’s great—until the team has to stop and craft replies every day.

Our Reputation Autopilot drafts responses in your brand voice, routes sensitive/negative reviews for escalation, and sends a weekly KPI report (ratings, response rate, response time). You can approve replies before posting.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Worth a quick 10 minutes to see what “review ops” could look like for {{business_name}}?

— Bob
agent_bob_replit+review-bot@agentmail.to

D3) FOLLOW-UP #1 (2–3 business days later)
Subject: Re: {{business_name}} reviews

Hi {{first_name}},

Quick follow-up—would it help if you had replies drafted within 12 hours for new Google/Yelp reviews, with negative ones escalated immediately?

If you reply with “yes,” I’ll send:
1) a sample reply set in a safe, brand-neutral tone based on your recent reviews
2) a simple approval workflow (you approve → we post)

— Bob
agent_bob_replit+review-bot@agentmail.to

D4) FOLLOW-UP #2 (5–7 business days later)
Subject: Should I close the loop?

Hi {{first_name}},

Should I close the loop here, or is someone else best to talk to about reviews/reputation at {{business_name}}?

If it’s useful, I can also send a quick “before/after” plan: response-rate target, escalation rules, and the weekly KPI report format.

— Bob
agent_bob_replit+review-bot@agentmail.to

========================================
E) AGENCY / RESELLER EMAIL (SHORT)
========================================
Subject line options:
1) Add review-response automation to your local SEO deliverables
2) White-label review replies for your clients
3) Quick partnership idea (Google/Yelp replies)

Email:
Hi {{first_name}},

You likely already manage GBP/local SEO for {{agency_name}} clients. We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses (Google + Yelp), escalates negatives, and reports weekly KPIs.

Agencies can resell it as a managed add-on: “we respond within 12 hours; client approves; we handle posting + escalation.”

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Open to a 15-minute chat to see if this fits your retainer menu?

— Bob
agent_bob_replit+review-bot@agentmail.to

========================================
F) DAILY SENDING OPS + CRM (14-DAY RAMP)
========================================
F1) CRM stages (minimum viable)
1) Prospect (in list, not sent)
2) Sent (Email #1 sent)
3) Engaged (opened/clicked OR replied)
4) Qualified (pain confirmed: low response rate, negative reviews, high volume)
5) Demo Booked
6) Trial / Pilot
7) Paid
8) Lost (No fit / No response / Competitor / Bad timing)

F2) Reply handling SLA
- Same-day replies to any inbound.
- If negative-review pain is mentioned, respond within 2 hours during business time.

F3) Sending ramp (per inbox; keep conservative)
Day 1–2: 15 new/day + follow-ups
Day 3–4: 25 new/day
Day 5–7: 35 new/day
Week 2: 50 new/day
Add follow-ups daily (do not exceed 2x new sends in total volume).

F4) Daily activity targets (single-operator baseline)
- New prospects added + QA’d: 25–50/day
- New emails sent: 30–50/day (ramping)
- Follow-ups: 20–60/day depending on backlog
- “Manual personalization” (snippet/response gap) for Priority A: 10–20/day
- DMs (optional): 5–10/day to owners/managers

F5) List QA rules (prevent wasted sends)
- Verify website exists and matches business name/location.
- Avoid duplicated listings.
- Spot-check 10% of rows/day: rating, review_count, last_review_date accuracy.
- Keep a “Do Not Contact” column for any opt-out or wrong contact.

F6) KPI tracking (weekly)
Outbound KPIs:
- Delivery rate, bounce rate (target < 3%)
- Reply rate by segment/vertical
- Positive reply rate (qualified interest)
- Booked calls
Product-facing KPIs to mention on calls:
- Response rate (baseline vs target)
- Response time (baseline vs 12-hour SLA)
- Negative review escalation count + time-to-first-response

========================================
G) WHAT YOU NEED FROM OWNER TO UNBLOCK THE CSV
========================================
1) Choose geography scope (Top 25 metros vs 5–10 states vs US-wide).
2) Confirm whether the first 500–1,000 leads should be:
   - 70% direct local businesses / 30% agencies, OR
   - 90% direct / 10% agencies.
3) Decide execution method:
   - Free/manual (recommended first): use this workflow; optionally delegate to VA.
   - Paid scraping (faster): requires separate spend approval (not included here).

Once geography is selected, the query pack becomes fixed and list-building can start immediately, producing a send-ready CSV with segmentation and priority tiers.
