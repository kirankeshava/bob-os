# Outbound Pipeline Kit (Execution-Ready): Top-25-Metros Query Pack + CSV Fields + Cold Email Sequence + Daily Ops + CRM Stages (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T16:48:11.345Z

---

BUSINESS LINKS TO USE IN OUTREACH
- Legitimacy / site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email (reply-to): agent_bob_replit+review-bot@agentmail.to

1) INITIAL GEO (TOP 25 US METROS)
Use these metros to build the first 500–1,000 leads fast while keeping category noise low:
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; Nashville TN; El Paso TX; Detroit MI; Portland OR.

2) GOOGLE MAPS QUERY PACK (COPY/PASTE)
Goal: consistent categories with high review velocity.
Format: "{primary keyword} in {metro}".

A) DENTAL
- "dentist in {metro}"
- "cosmetic dentist in {metro}"
- "dental implants in {metro}"
- "orthodontist in {metro}" (optional add-on; tends to be high LTV)

B) MED SPA / AESTHETICS
- "med spa in {metro}"
- "aesthetic clinic in {metro}"
- "botox in {metro}"
- "laser hair removal in {metro}"

C) HVAC / PLUMBING (HOME SERVICES)
- "hvac company in {metro}"
- "air conditioning repair in {metro}"
- "plumber in {metro}"
- "water heater repair in {metro}"

D) AGENCY / RESELLER LANE (SEPARATE LIST)
- "dental marketing agency in {metro}"
- "medical spa marketing agency in {metro}"
- "home services marketing agency in {metro}"
- "local seo agency in {metro}"
What to capture: agency name, website, city/state, owner/founder name, email, LinkedIn, niche focus, client proof (case studies), and whether they mention GBP/reviews.

3) CSV TEMPLATE (HEADERS)
Copy this header row into Google Sheets/CSV:
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy_last10,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

4) SEGMENTATION RULES (SIMPLE + OPERATIONAL)
Compute these based on Google rating/review count/recency + a quick scan of the last 10 reviews.
- response_rate_proxy_last10 = (# of last 10 reviews with an owner/manager response) / 10
Segments:
- not_responding: response_rate_proxy_last10 <= 0.2 (0–2 replies out of last 10)
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within 14 days
Priority:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: (not_responding) OR (low_rating)
- Priority C: high_volume only

Personalization snippet rule:
- Capture either (a) a short excerpt (6–20 words) from the most recent review OR (b) a paraphrase like “a recent review mentioned wait time + front desk communication.” Avoid sensitive medical details; do not mention patient names.

5) COLD EMAIL SEQUENCE (3 STEPS) — LOCAL BUSINESSES
Use tokens:
{{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap}}, {{legitimacy_link}}

EMAIL 1 (Initial)
Subject options (choose 1):
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed a response gap on your recent reviews
3) 12-hour review replies (you approve)

Body:
Hi {{first_name}} — Bob here.

I was looking at {{business_name}}’s Google reviews in {{city}}. I noticed {{response_gap}} and a recent review mentioned “{{recent_review_snippet}}.”

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses to Google (and Yelp), escalates negative reviews, and sends weekly KPI reporting. The key promise: replies within 12 hours, and you can approve/edit before anything posts.

If it’s helpful, I can send 2–3 example replies for your most recent reviews so you can see the tone and quality first.

Want me to do that?

Legitimacy link: {{legitimacy_link}}
— Bob
agent_bob_replit+review-bot@agentmail.to

EMAIL 2 (Follow-up #1 — value + proof)
Subject options:
1) Want sample replies for {{business_name}}?
2) Re: review replies

Body:
Hi {{first_name}} — quick follow-up.

Most local businesses lose rating momentum when reviews come in but responses lag (or are inconsistent). Our autopilot keeps responses on-brand, routes negatives for human attention, and keeps a weekly pulse on rating/review velocity.

If you send me the link to your Google profile, I’ll draft replies for your latest 3 reviews and you can decide if it’s worth a 10-minute call.

— Bob
{{legitimacy_link}}
agent_bob_replit+review-bot@agentmail.to

EMAIL 3 (Follow-up #2 — low friction CTA)
Subject options:
1) Close the loop?
2) Should I stop reaching out?

Body:
Hi {{first_name}} — should I close the loop?

If review responses aren’t a focus right now, no worries. If they are: reply “samples” and I’ll send 3 drafted responses tailored to {{business_name}} (no commitment).

— Bob
{{legitimacy_link}}
agent_bob_replit+review-bot@agentmail.to

6) AGENCY/RESELLER VERSION (INITIAL EMAIL)
Subject options:
1) Add-on for your local clients: review reply autopilot
2) White-label review responses for GBP/Yelp

Body:
Hi {{first_name}} — Bob here.

If you support local SEO/GBP for {{niche}} clients, we have a simple add-on: AI-drafted, brand-safe Google/Yelp review responses + negative-review escalation + weekly KPI report.

You can resell it as a managed deliverable (your branding) while we handle the ops. Happy to share a sample report + example reply set.

Open to a quick chat this week?

{{legitimacy_link}}
— Bob
agent_bob_replit+review-bot@agentmail.to

7) DAILY SENDING OPS (FREE-TOOL FRIENDLY)
Tools (free): Google Sheets as CRM + Gmail/Workspace inbox.

Daily targets (start conservative):
- Day 1–3: 20 new emails/day
- Day 4–7: 35 new emails/day
- Day 8–14: 50 new emails/day
Follow-ups: 1 follow-up block/day (Email 2) + 1 block/day (Email 3). Keep total sends within ramp.

List QA (before sending):
- Must have: business name, website or phone, Google rating + review count, last review date, segment + priority, personalization snippet.
- Reject: franchises/mega-chains (unless location manager email found), closed/permanently closed, no reviews, irrelevant category.

Reply SLA:
- Same-day reply to positive interest.
- Negative/angry replies: acknowledge + offer to stop + do-not-contact tag.

Bounce/complaint thresholds:
- If bounces > 3% in a day: pause new sends, clean list.
- If complaints > 0.2%: tighten targeting + reduce volume.

8) CRM STAGES (GOOGLE SHEETS COLUMNS)
- Prospect (not sent)
- Sent (E1)
- Follow-up queued (E2/E3)
- Replied – Interested
- Replied – Not now
- Replied – Not a fit
- Demo booked
- Trial started
- Paid
- Lost

Minimum tracking fields per row: stage, last_contacted_date, next_follow_up_date, notes.

WHAT’S NEXT (DEPENDENCY)
To output the requested 500–1,000 lead CSV quickly with consistent data (rating/reviews/last review date + URLs + phones + websites and ideally emails), choose either:
- Manual/VA using this kit (no spend, slower), OR
- Approve a paid extractor run (Outscraper/Apify) so the CSV can be produced quickly and then enriched/segmented.
