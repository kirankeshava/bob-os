# Outbound Pipeline Kit (Zero-Cost): Lead List Template + Segmentation + 3-Step Cold Email + Daily Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T22:22:01.218Z

---

BUSINESS CONTEXT (for templates + trust)
- Product: AI Review Reply & Reputation Autopilot (Google/Yelp)
- Legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email to include: agent_bob_replit+review-bot@agentmail.to
- Week 1 policy: FREE service / 7-day trial, no payment collection.

1) VERTICALS + GEO (to hit 500–1,000 leads on $0)
Choose ONE to start (recommended):
A) Top 25 US metros (recommended for density + review velocity)
B) 5–10 states you can serve strongly (if you have regional proof)
C) US-wide (harder QA; more noise)

Recommended Top 25 metros list (use as default):
NYC, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

Vertical categories to search on Google Maps:
- Dentists: “dentist”, “dental clinic”, “cosmetic dentist”, “family dentist”
- Med spas: “med spa”, “aesthetic clinic”, “botox”, “laser hair removal”
- HVAC/Plumbing: “HVAC contractor”, “air conditioning repair”, “plumber”, “plumbing service”

2) LEAD LIST CSV / GOOGLE SHEETS TEMPLATE (copy-paste headers)
Use one row per location (avoid corporate HQ unless it’s single-location).

HEADERS:
business_name,vertical,category_query,city_state,metro,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,owner_response_count_last10,segment,priority,personalization_hook,contact_name,contact_role,email_1,email_2,linkedin_url,notes,source_date

How to fill key fields (manual, $0):
- google_rating, review_count: from Google Maps listing
- last_review_date + excerpt: open “Reviews” → sort “Newest” → copy date + 1–2 sentences (or paraphrase if safer)
- owner_response_count_last10: count how many of the newest 10 reviews have an owner response
- response_rate_proxy_last10 = owner_response_count_last10 / 10

SEGMENT RULES (apply in Sheets):
- not_responding: response_rate_proxy_last10 <= 0.2
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within last 14 days

PRIORITY SCORING (simple and operational):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only

Personalization hook (1 line max):
- Example: “Saw a new review mentioning ‘{snippet}’ — looks like there wasn’t an owner reply yet.”

3) QUERY PACK (repeatable, low-noise pulls)
For each metro + vertical, run 2–3 searches to generate enough leads:
Dentists:
- “dentist {metro}”
- “cosmetic dentist {metro}”
- “family dentist {metro}”
Med spas:
- “med spa {metro}”
- “aesthetic clinic {metro}”
- “botox {metro}”
HVAC/Plumbing:
- “HVAC repair {metro}”
- “air conditioning repair {metro}”
- “plumber {metro}”

Collection target to reach 750 leads quickly:
- 25 metros x (10 dentists + 10 med spas + 10 HVAC/plumbing) = 750
Then oversample Priority A/B by continuing searches until you have ~300 Priority A/B.

4) 3-STEP COLD EMAIL SEQUENCE (free 7-day trial, brand-safe, approval-based)
Use this sequence for owners/managers. Personalize the first line using: {{business_name}}, {{recent_review_snippet}}, {{response_gap}}, {{rating}}, {{review_count}}.

EMAIL 1 (Initial)
Subject options:
- Quick help with Google/Yelp review replies for {{business_name}}
- Noticed a recent review—want us to draft the reply?
- Free 7-day review reply autopilot (you approve)

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”. {{response_gap}}

We run an AI Review Reply & Reputation Autopilot for local businesses: we draft brand-safe responses for Google Business Profile + Yelp, flag negatives for escalation, and send weekly KPI snapshots.

Free this week: we’ll run a 7-day trial where we respond within 12 hours (you approve everything before it posts).

If you want to verify we’re legit, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
You can also reach me here: agent_bob_replit+review-bot@agentmail.to

Worth trying this on {{business_name}}? Reply “yes” and I’ll send the 2-minute setup.

— Bob

EMAIL 2 (Follow-up, 2–3 days later)
Subject:
- Should I close this out?
- Want me to draft 3 replies as a sample?

Body:
Hi {{first_name}} — quick follow-up.

If you’d like, I can draft 3 sample replies for {{business_name}} (based on your newest reviews) so you can see tone + quality. No login needed; you just tell me “post” or “don’t post.”

Want the samples?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

EMAIL 3 (Breakup, 4–7 days later)
Subject:
- OK to pause?
- Last note re: review replies

Body:
Hi {{first_name}},

No worries if now’s not the right time. I can either:
1) Run the free 7-day trial and you approve replies before posting, or
2) Send a one-time “reputation quick audit” (rating, response rate, and 3 fixes).

Which is more useful for {{business_name}}—(1) or (2)?

— Bob

Segment-specific insertion lines (use in Email 1 after the first paragraph):
- Not responding: “It looks like a number of recent reviews didn’t get an owner reply—quick wins for trust + conversions.”
- Low rating: “When ratings dip, fast, calm replies can recover leads—especially on the newest 1-star/2-star reviews.”
- High volume: “With {{review_count}} reviews, speed + consistency matters; we keep replies timely without staff time.”

5) DAILY SENDING OPS (14-day ramp, $0 tools)
Tooling (free):
- Sending inbox: existing mailbox (keep volume low initially)
- CRM: Google Sheets with columns: Stage, Last touch date, Next action date, Notes
- Tracking: no pixel links initially (maximize deliverability); use plain text.

Ramp schedule (per inbox):
Day 1–2: 15/day (all Priority A)
Day 3–4: 25/day (A + B)
Day 5–7: 40/day
Week 2: 60–80/day if bounces <3% and replies healthy

Daily workflow (60–90 minutes):
1) Add 20–50 new leads to sheet (Priority A/B first)
2) QA: remove duplicates, franchises you can’t reach, missing website/phone, clearly irrelevant categories
3) Personalize first line + snippet for each Email 1
4) Send new emails (per ramp cap)
5) Send follow-ups due today (Email 2/3)
6) Reply SLA: respond to any inbound within 4 business hours

Quality thresholds:
- Bounce rate >3% in a day: pause and clean list
- Complaint/unsub >0.3%: reduce volume and tighten targeting

6) CRM STAGES (simple, enforceable)
Stages + exit criteria:
- Prospect: lead in sheet, not contacted
- Sent: Email 1 sent
- Follow-up queued: Email 2 or 3 scheduled
- Replied: any reply received
- Qualified: confirms they manage GBP/Yelp and has recurring reviews
- Trial (Free 7-day): started; collecting brand voice + escalation contacts
- Converted (Paid later): post-trial conversion target (after Week 1)
- Lost: not interested / wrong contact / unreachable

7) AGENCY / RESELLER LANE (optional but high LTV)
Target: local SEO agencies, reputation management agencies, web shops serving dentists/med spas/home services.
Hook: “white-label review reply autopilot; you keep margin; brand-safe; your team approves.”
CTA: “Want to pilot on 2 client locations for free this week?”

EXECUTION NEXT STEP (today)
- Confirm geography (default: Top 25 metros).
- Build first 200 leads (aim for 80 Priority A, 80 Priority B, 40 Priority C).
- Start Day 1 sending: 15 personalized Email 1 messages from the primary inbox using the copy above.