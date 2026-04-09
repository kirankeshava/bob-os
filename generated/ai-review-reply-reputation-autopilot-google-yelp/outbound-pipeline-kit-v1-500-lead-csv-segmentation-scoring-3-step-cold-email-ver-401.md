# Outbound Pipeline Kit v1 — 500-Lead CSV + Segmentation/Scoring + 3-Step Cold Email (Vertical+Segment) + Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:57:00.314Z

---

BUSINESS
Offer: AI Review Reply & Reputation Autopilot (Google/Yelp)
Legitimacy URL (include in emails): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-qfdl4ouo.picard.replit.dev/sites/1
Contact email (for replies/forwarding): agent_bob_replit+review-bot@agentmail.to

====================================================
PART 1) 500-LEAD CSV (READY)
====================================================
IMPORTANT NOTE: Without running a live scraper in this chat, I cannot truthfully claim these are verified real-world businesses. Instead, I’m providing (a) a 500-row CSV “build sheet” that is ready for immediate population and (b) a finished, deterministic query pack + data-entry SOP that produces 500 real leads in 1–2 days (solo) or <1 day (VA). This is the fastest zero-cost method and avoids paying for scrapers.

If you want a paid extractor (Outscraper/Apify) for real-time 500–1,000 rows with live business data, I can request approval and then provide exact run settings.

A) CSV HEADERS (paste as row 1)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_owner_responses_count,response_rate_proxy,segment,priority,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,notes

B) 500-ROW CSV TEMPLATE (rows 2–501)
How to use: paste into Google Sheets. Fill columns in this order: google_maps_url → business_name/phone/website → google_rating/review_count/last_review_date → last_10_owner_responses_count → segment/priority auto.

To keep this artifact readable, below is the exact CSV generation pattern for 500 rows (you can paste and then fill). It is structured as 200 Dentists + 150 Med Spas + 150 HVAC/Plumbing (balanced for LTV + review velocity). Replace “TBD” fields as you collect.

CSV START
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_owner_responses_count,response_rate_proxy,segment,priority,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,notes
TBD Dental Lead 001,Dentist,TBD,,,
TBD Dental Lead 002,Dentist,TBD,,,
TBD Dental Lead 003,Dentist,TBD,,,
TBD Dental Lead 004,Dentist,TBD,,,
TBD Dental Lead 005,Dentist,TBD,,,
TBD Dental Lead 006,Dentist,TBD,,,
TBD Dental Lead 007,Dentist,TBD,,,
TBD Dental Lead 008,Dentist,TBD,,,
TBD Dental Lead 009,Dentist,TBD,,,
TBD Dental Lead 010,Dentist,TBD,,,
TBD Dental Lead 011,Dentist,TBD,,,
TBD Dental Lead 012,Dentist,TBD,,,
TBD Dental Lead 013,Dentist,TBD,,,
TBD Dental Lead 014,Dentist,TBD,,,
TBD Dental Lead 015,Dentist,TBD,,,
TBD Dental Lead 016,Dentist,TBD,,,
TBD Dental Lead 017,Dentist,TBD,,,
TBD Dental Lead 018,Dentist,TBD,,,
TBD Dental Lead 019,Dentist,TBD,,,
TBD Dental Lead 020,Dentist,TBD,,,
... (continue sequentially)
TBD Dental Lead 200,Dentist,TBD,,,
TBD MedSpa Lead 201,Med Spa,TBD,,,
TBD MedSpa Lead 202,Med Spa,TBD,,,
... 
TBD MedSpa Lead 350,Med Spa,TBD,,,
TBD HomeSvc Lead 351,HVAC/Plumbing,TBD,,,
...
TBD HomeSvc Lead 500,HVAC/Plumbing,TBD,,,
CSV END

If you want, I can output the full 500 lines explicitly in the next cycle, but the above pattern is the same and keeps this doc usable.

C) SEGMENTATION + PRIORITY (fill or formula)
Definitions:
- response_rate_proxy = last_10_owner_responses_count / 10
- segment rules:
  1) not_responding if last_10_owner_responses_count <= 2
  2) low_rating if google_rating < 4.2
  3) high_volume if review_count >= 200 OR last_review_date within last 14 days
If multiple apply, use combined label like: low_rating+high_volume.

Priority scoring:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: (not_responding) OR (low_rating)
- Priority C: high_volume only

Safe personalization snippet rules:
- Prefer paraphrase over quoting full review text.
- Never include sensitive medical details.
- Use 8–20 words max.
Examples:
- “Saw a recent note praising your front desk but asking about scheduling.”
- “Noticed a recent review mentioned a long wait time.”

D) QUERY PACK (to produce 500 real leads fast)
Pick 10 metros; pull 50 leads/metro across verticals.
Suggested metros (high SMB density): Phoenix AZ, Dallas TX, Houston TX, Atlanta GA, Tampa FL, Orlando FL, Charlotte NC, Denver CO, San Diego CA, Las Vegas NV.

Google Maps search strings:
Dentist:
- “dentist + {metro}”
- “cosmetic dentist + {metro}”
- “family dentistry + {metro}”

Med Spa:
- “med spa + {metro}”
- “aesthetic clinic + {metro}”
- “botox + {metro}”

HVAC/Plumbing:
- “HVAC contractor + {metro}”
- “air conditioning repair + {metro}”
- “plumber + {metro}”

Selection filters (quick):
- Independent/local (skip obvious mega-franchises unless location pages have their own review management)
- Review count ≥ 50 preferred
- Last review within 60 days preferred

Email capture (free):
- From website: contact page, footer, “book now” pages
- Patterns: info@, office@, hello@, support@; for med spas often appointments@, concierge@
- If no email, capture web form URL and use it as outreach channel

====================================================
PART 2) 3-STEP COLD EMAIL SEQUENCE (VERTICAL + SEGMENT)
====================================================
Personalization tokens:
{{first_name}} {{business_name}} {{city}} {{vertical}} {{recent_review_snippet}} {{response_gap}} {{rating}} {{review_count}} {{legitimacy_url}}

Offer promise (consistent):
- Draft + post brand-safe responses to Google/Yelp reviews
- 12-hour response SLA
- Escalate negatives to owner/manager
- Weekly KPI report
- “You approve before anything posts” (or “autopost with guardrails” as upgrade)

EMAIL 1 (Initial)
Subject options (rotate):
1) Quick fix for {{business_name}}’s reviews
2) {{business_name}}: response gap on Google?
3) 12-hour review replies (you approve)

Body:
Hi {{first_name}} — Bob here.

I was looking at {{business_name}}’s Google reviews and noticed {{recent_review_snippet}}. I also saw {{response_gap}}.

We run an AI-assisted “review reply autopilot” for local businesses: we draft brand-safe responses for Google/Yelp, route negatives for escalation, and send a weekly KPI report. Typical outcome: faster responses + fewer unresolved 1–3 star reviews sitting unaddressed.

If you want, I can send 3 example replies written in your brand voice (no cost). If they look good, we can set up a 7-day trial where you approve before anything posts.

Should I send the 3 drafts based on your latest reviews?

– Bob
{{legitimacy_url}}
Reply to: agent_bob_replit+review-bot@agentmail.to

Segment-specific hook inserts (choose one):
- not_responding: “a few recent reviews didn’t have a public response yet”
- low_rating: “a couple 1–3 star reviews are still visible without a response”
- high_volume: “you’re getting steady review volume, which makes response time hard to keep up with”

EMAIL 2 (Follow-up, +value)
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

Here’s what we’d do in week 1 for {{business_name}}:
1) Draft replies for every new Google/Yelp review within 12 hours
2) Escalate any negative review to you with a suggested resolution note
3) Send a weekly report: rating trend, new reviews, response rate, unresolved negatives

If you reply with “OK”, I’ll send 3 draft responses first so you can judge quality.

– Bob
{{legitimacy_url}}
agent_bob_replit+review-bot@agentmail.to

EMAIL 3 (Breakup / low-friction)
Subject: Close the loop?

Hi {{first_name}} — should I close this out?

If review replies are already handled, no worries. If it’s just not a priority right now, I can also send a one-page “best-practice reply template pack” for {{vertical}} (free).

Want the templates?

– Bob
{{legitimacy_url}}
agent_bob_replit+review-bot@agentmail.to

AGENCY/RESELLER VERSION (Email 1)
Subject: White-label review reply autopilot for your clients?

Hi {{first_name}} — Bob here.

If you manage local SMB clients (dental/med spa/home services), we can white-label a review reply + reporting service: 12-hour SLA, brand-safe replies, escalation flow, weekly KPI report. You keep the client relationship; we handle ops.

If you tell me how many locations you manage, I’ll send pricing + a sample weekly report.

– Bob
{{legitimacy_url}}
agent_bob_replit+review-bot@agentmail.to

====================================================
PART 3) DAILY SENDING OPS + CRM
====================================================
A) CRM STAGES
Prospect → Enriched → Sent (E1) → Follow-up 1 (E2) → Follow-up 2 (E3) → Replied → Qualified → Demo Booked → Trial → Paid → Lost

B) 14-DAY RAMP (per inbox)
Day 1–2: 25/day
Day 3–4: 40/day
Day 5–7: 60/day
Day 8–10: 80/day
Day 11–14: 100/day
Rules: keep follow-ups separate from new sends; stop if bounce rate >3% or spam complaints >0.1%.

C) DAILY QUOTAS (starting point)
- New emails: 50/day (ramp with deliverability)
- Follow-ups: 30/day
- Agency lane: 10/day (separate segment)
- Manual personalization: 10–20/day for Priority A (use review snippet + response gap)

D) LIST QA (before sending)
- Check website exists and matches business name
- Confirm category fits vertical
- Confirm review_count and last_review_date present
- If email missing, use contact form URL + note “form outreach”

E) REPLY HANDLING SLA
- Same-day response to positive replies
- If objection: offer “send 3 drafts” as fallback CTA
- If angry: immediate removal + apology

F) WEEKLY KPI TRACKING
- Sent, delivered, bounced
- Open proxy (if available), replies, positive replies, meetings
- Conversion by segment (not_responding vs low_rating vs high_volume)

====================================================
NEXT ACTIONS (OWNER)
====================================================
1) Choose 10 metros (or 5–10 states). Use the query pack to fill 500 rows with real businesses.
2) Start Day 1 sending to Priority A/B first.
3) After 100 sends, share: bounce %, reply %, meeting rate—then we tighten targeting + rewrite subject lines as needed.
