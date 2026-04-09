# Outbound Pipeline Kit (Execution-Ready): Lead List Build Spec + Segmentation + Cold Email Sequences + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T04:04:43.720Z

---

BUSINESS / LEGITIMACY LINK
- Product site (share in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

PART A — LEAD LIST CSV TEMPLATE (PASTE AS HEADERS)
prospect_id,vertical,segment,priority_tier,business_name,city,state,phone,website,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_reviews_responses_count,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,personalization_snippet,notes

Data dictionary (how to fill fast):
- vertical: Dental | MedSpa | HVAC-Plumbing | Agency
- google_rating/review_count: from GBP panel.
- last_review_date: date of most recent Google review.
- response_rate_proxy: (# owner replies in last 10 reviews) / 10. If fewer than 10 reviews visible, divide by visible count.
- personalization_snippet: 8–18 word excerpt OR a paraphrase of the most recent review. Do not include private health info; keep neutral.

PART B — SEGMENTATION RULES (CONSISTENT + QUICK)
Compute:
- NotResponding = response_rate_proxy <= 0.20 OR last_10_reviews_responses_count = 0
- LowRating = google_rating < 4.2
- HighVolume = review_count >= 200 OR (today - last_review_date) <= 14 days

Segment assignment (choose strongest signal; if multiple, pick the “highest urgency”):
1) If LowRating AND HighVolume → segment=low_rating
2) Else if NotResponding AND HighVolume → segment=not_responding
3) Else if LowRating → segment=low_rating
4) Else if NotResponding → segment=not_responding
5) Else if HighVolume → segment=high_volume
6) Else → segment=high_volume (lowest urgency but still relevant)

Priority tiers:
- Priority A: (LowRating AND HighVolume) OR (NotResponding AND HighVolume)
- Priority B: LowRating OR NotResponding
- Priority C: HighVolume only

PART C — QUERY PACK (ZERO-COST GOOGLE MAPS COLLECTION)
Goal: 500–1,000 local businesses + 100–200 agencies.

Recommended starting footprint (Top 15 metros; expand to 25 if needed):
New York NY, Los Angeles CA, Chicago IL, Houston TX, Phoenix AZ, Philadelphia PA, San Antonio TX, San Diego CA, Dallas TX, San Jose CA, Austin TX, Jacksonville FL, San Francisco CA, Columbus OH, Fort Worth TX.

Google Maps queries (copy/paste; run per metro):
DENTAL
- “dentist in {metro}”
- “cosmetic dentist in {metro}”
- “family dentistry in {metro}”
- “dental implants in {metro}”
MED SPA
- “med spa in {metro}”
- “aesthetic clinic in {metro}”
- “botox in {metro}”
- “laser hair removal in {metro}”
HVAC/PLUMBING
- “HVAC in {metro}”
- “air conditioning repair in {metro}”
- “plumber in {metro}”
- “drain cleaning in {metro}”

Agency lane queries (for reseller partners):
- “dental marketing agency {metro/state}”
- “med spa marketing agency {metro/state}”
- “home services marketing agency {metro/state}”
- “local SEO agency {metro/state}”

Collection SOP (per lead; 60–90 seconds once practiced):
1) Open GBP result → record rating + review count + phone + website + Maps URL.
2) Click Reviews → capture most recent review date + snippet.
3) Check last 10 reviews quickly: count how many have “Owner response.” → compute response_rate_proxy.
4) Find email: first from website contact page; second from site footer or “info@domain”; for agencies also check team page.
5) Apply segment + priority tier.

Quality filters (skip):
- Multi-location national brands/franchises with corporate review teams (unless location has poor response rate).
- Businesses with no website (unless strong Priority A).
- Very new profiles with < 15 reviews (weak signal).

PART D — COLD EMAIL SEQUENCES (READY TO SEND)
Use tokens: {{first_name}}, {{business_name}}, {{city}}, {{recent_review_snippet}}, {{rating}}, {{review_count}}, {{response_gap_observation}}, {{vertical_specific_service}}.
Always include product site link for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

1) LOCAL BUSINESS — NOT RESPONDING (Initial)
Subject options:
A) Quick question about {{business_name}} reviews
B) Noticed a response gap on Google
C) Can we help reply to reviews this week?

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed {{response_gap_observation}}.

Example from a recent review: “{{recent_review_snippet}}”.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google (and Yelp), escalates negatives to you, and sends a weekly KPI report. You can approve replies before anything posts.

If you want, I can show you what “respond within 12 hours” looks like for {{business_name}} using your current tone.

Would you be open to a 10-minute walkthrough this week?

(Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)

2) FOLLOW-UP #1 (Not responding)
Subject: Re: replies for {{business_name}}
Body:
Bumping this — most local buyers read responses almost as much as ratings.

If you forward 1–2 preferred reply examples (or just tell me “friendly + short”), we can draft 5 replies for your latest reviews so you can see quality before committing.

Worth trying on {{business_name}}?

3) FOLLOW-UP #2 (Not responding)
Subject: Should I close the loop?
Body:
Totally fine if now isn’t a priority.

If you want, I can send a quick screenshot-style audit: last 10 reviews + which ones lack an owner reply + a suggested response for the most recent one.

Reply “audit” and I’ll send it.

—

LOCAL BUSINESS — LOW RATING (Initial)
Subject options:
A) Quick fix for reputation recovery
B) {{business_name}}: review response + escalation
C) A way to reduce 1-star damage

Body:
Hi {{first_name}} — I saw {{business_name}} is at {{rating}} on Google. One lever that often moves the needle is fast, consistent owner responses—especially to 1–3 star reviews.

Recent feedback: “{{recent_review_snippet}}”.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses, flags negatives for escalation, and helps you respond within 12 hours (you can approve before posting). Also includes a weekly KPI report so you can track recovery.

Open to a 10-minute call? I can show you how we’d respond to that review in a way that protects the brand and invites the customer back.

(Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)

FOLLOW-UP #1 (Low rating)
Subject: Re: {{business_name}} reputation
Body:
If helpful, I can draft 2 options for responding to your most recent negative review: one short + one more detailed with a take-it-offline path.

Want me to send those over?

FOLLOW-UP #2 (Low rating)
Subject: Close the loop?
Body:
Should I stop reaching out, or is review response improvement on the roadmap?

If you reply “later,” I’ll follow up next month.

—

LOCAL BUSINESS — HIGH VOLUME (Initial)
Subject options:
A) Keeping up with {{review_count}} reviews
B) Review replies without adding work
C) 12-hour review response coverage

Body:
Hi {{first_name}} — {{business_name}} has strong visibility ({{review_count}} reviews). The hard part at that volume is consistency and speed.

We built an AI Review Reply & Reputation Autopilot: drafts brand-safe responses for Google/Yelp, escalates negatives, and sends weekly KPI reporting. You approve replies (or set rules) and we keep response time under 12 hours.

Would a quick 10-minute walkthrough be useful?

(Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)

AGENCY / RESELLER VERSION (Initial)
Subject options:
A) Add “review response” to your retainers
B) White-label review replies for your clients
C) New upsell for local SEO clients

Body:
Hi {{first_name}} — I’m reaching out because you work with local businesses where Google rating + owner responses directly impact calls.

We built an AI Review Reply & Reputation Autopilot (Google/Yelp): brand-safe draft replies, negative-review escalation, and weekly KPI reporting. It’s simple to package as an add-on (or white-label) for dental/med spa/home services clients.

If you have 10 minutes, I can show a partner workflow: client approvals, escalation rules, and weekly reporting.

Reference link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

PART E — DAILY SENDING OPS + CRM
14-day ramp (per inbox):
- Days 1–3: 10–15/day (mostly Priority A)
- Days 4–7: 20–30/day
- Days 8–14: 35–50/day
Rules:
- Keep total bounce rate < 3% (pause if higher; clean list).
- Complaints: if any spike, reduce volume and tighten targeting.
- Reply SLA: respond to interested replies within 60 minutes during business hours.

CRM stages (with entry/exit criteria):
1) Prospects (validated email + segment)
2) Sent (Email 1 sent)
3) Engaged (opened/clicked/replied)
4) Replied — Interested
5) Qualified (has GBP access owner/manager; review volume present; pain confirmed)
6) Demo Booked
7) Trial/POC
8) Paid
9) Lost (reason logged)

Daily targets (starting point):
- 50 new prospects added/day (or 25 if solo)
- 50–100 sends/day total across inboxes once warmed
- Follow-ups: 1x/day batch
- 10 manual “Priority A” personalized lines/day (use review snippet + response gap)

Owner decision needed to execute fastest:
- Pick geography for first pull: Top 25 metros vs 5–10 states vs US-wide. Once chosen, you (or a VA) can generate 500–1,000 rows using the SOP above and start sending the same day.