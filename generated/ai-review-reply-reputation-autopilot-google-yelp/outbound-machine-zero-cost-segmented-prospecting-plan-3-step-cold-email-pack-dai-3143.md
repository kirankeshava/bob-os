# Outbound Machine (Zero-Cost) — Segmented Prospecting Plan + 3-Step Cold Email Pack + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T22:31:27.202Z

---

OVERVIEW
Offer: AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp. We draft brand-safe responses, escalate negatives fast, and send weekly KPI reports.
Legitimacy links to include in every email: Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  | Contact: agent_bob_replit+review-bot@agentmail.to
Week 1 policy: FREE (7-day trial). No payment collection.

PART 1 — TARGETING + SEGMENTATION (WHAT TO PULL AND WHY)
Verticals (high review velocity + high LTV):
1) Dentists (general dentistry, cosmetic, orthodontics)
2) Med spas / aesthetic clinics (Botox/fillers/laser)
3) HVAC + plumbers (home services, high local intent)

Geography approach (choose ONE for the first 500–1,000 leads):
A) Top 25 US metros (fastest scale, consistent volume)
B) 5–10 target states (easier operations + regional familiarity)
C) US-wide (broadest, but noisier)

Segments (apply per GBP):
1) NOT RESPONDING: response_rate_proxy ≤ 20% OR 0 owner replies in last 10 reviews.
2) LOW RATING: Google rating < 4.2 (tweakable per vertical; med spas often need 4.5+).
3) HIGH VOLUME: review_count ≥ 200 OR last_review_date within 14 days.

Priority scoring (for routing & personalization intensity):
Priority A: (NOT RESPONDING AND HIGH VOLUME) OR (LOW RATING AND HIGH VOLUME)
Priority B: (NOT RESPONDING) OR (LOW RATING)
Priority C: (HIGH VOLUME only)

Positioning by segment:
- Not Responding: “you’re leaving trust/revenue on the table; we reply within 12 hours; you approve.”
- Low Rating: “turn negatives into recoveries; escalation + owner notification; reduce 1-star damage.”
- High Volume: “ops problem—too many reviews to keep up; consistent voice + weekly KPIs.”

PART 2 — LEAD LIST CSV TEMPLATE (HEADERS + DATA DICTIONARY)
CSV Headers (paste into Google Sheets row 1):
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_owner_replies_count,segment,priority,personalization_snippet,contact_name,role_guess,email_1,email_2,notes

Data dictionary + how to collect (zero-cost):
- google_rating/review_count: from Google Business Profile panel.
- last_review_date: open reviews → sort by newest → record date of most recent.
- last_10_owner_replies_count: open newest 10 reviews; count how many have an “Owner response.”
- response_rate_proxy = last_10_owner_replies_count/10.
- personalization_snippet: copy a short phrase (5–12 words) from a recent review OR paraphrase. Avoid sensitive health/medical claims; keep it generic (service, timeliness, friendliness).
- contact fields: start with website “Contact” page; look for owner/manager/practice manager/office manager. If no direct email, use info@/hello@ as fallback.

Segment formula (Sheets example):
- segment (pseudo):
IF(google_rating<4.2,"low_rating", IF(response_rate_proxy<=0.2,"not_responding", IF(review_count>=200,"high_volume","")))
- priority (pseudo):
IF(AND(segment="not_responding", review_count>=200),"A", IF(AND(segment="low_rating", review_count>=200),"A", IF(OR(segment="not_responding",segment="low_rating"),"B", IF(segment="high_volume","C","C"))))

PART 3 — GOOGLE MAPS QUERY PACK (ZERO-COST)
Goal: build 500–1,000 prospects by repeating consistent searches.
For each metro/state, run 5–10 searches per vertical to reduce irrelevant categories.

Dentist queries:
- “dentist in {city}”
- “cosmetic dentist in {city}”
- “orthodontist in {city}”
- “family dentistry in {city}”
- “dental implants in {city}”

Med spa queries:
- “med spa in {city}”
- “botox in {city}”
- “laser hair removal in {city}”
- “aesthetic clinic in {city}”
- “dermal fillers in {city}”

HVAC/plumbing queries:
- “HVAC company in {city}”
- “air conditioning repair in {city}”
- “heating repair in {city}”
- “plumber in {city}”
- “emergency plumber in {city}”

Agency/reseller lane queries:
- “dental marketing agency”
- “med spa marketing agency”
- “home services marketing agency”
- “reputation management agency local businesses”

PART 4 — COLD EMAIL PACK (3-STEP) WITH TOKENS + VARIANTS
Rules:
- Always include the legitimacy link and contact email in the footer.
- Personalize with 1 hook max (snippet + response gap) to keep production fast.
Tokens:
{{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap_observation}}, {{google_rating}}, {{review_count}}

A) LOCAL BUSINESS — NOT RESPONDING VARIANT (Primary)
Subject options:
1) Quick idea for {{business_name}}’s Google reviews
2) Noticed something on your reviews
3) 12-hour review responses (you approve)

Email 1:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and saw a recent one mentioning “{{recent_review_snippet}}.”

I also noticed {{response_gap_observation}} (lots of reviews without an owner reply). That’s a missed trust signal for new customers.

I’m building an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google + Yelp, escalates negative reviews immediately, and sends weekly KPIs. You approve everything before it posts.

If you want, I’ll run this free for 7 days: we respond within 12 hours in your brand voice and you can approve/deny with one click.

Worth a 10-minute setup call this week?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (2–3 days later):
Subject: Re: {{business_name}} reviews
Hi {{first_name}} — circling back.

If it helps, the workflow is simple:
1) Connect Google/Yelp
2) We draft replies within 12 hours
3) You approve (or we auto-approve only 4–5★ if you prefer)
4) Negative reviews trigger an escalation email/text

Want me to send 2–3 sample replies in your tone using your most recent reviews?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 | agent_bob_replit+review-bot@agentmail.to

Follow-up 2 (5–7 days later):
Subject: Should I close this out?
Hi {{first_name}} — should I close the loop here?

Happy to set up a free 7-day trial for {{business_name}} and prove it by:
- replying to every new review within 12 hours
- flagging negatives immediately
- sending a weekly summary (rating trend, response rate, keyword themes)

If not a priority, just reply “later.”
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 | agent_bob_replit+review-bot@agentmail.to

B) LOCAL BUSINESS — LOW RATING VARIANT (Primary)
Subject options:
1) Helping {{business_name}} recover from negative reviews
2) Quick win for your rating trend
3) Review escalation + replies (free for 7 days)

Email 1:
Hi {{first_name}} — I noticed {{business_name}} is currently at {{google_rating}} on Google.

When a negative review sits without a thoughtful response, it tends to “anchor” future customers’ perception. We built a reputation autopilot that (1) drafts calm, brand-safe replies, (2) escalates negatives immediately, and (3) tracks weekly KPIs so you can see progress.

I can run it free for 7 days: you approve every reply before posting.

Open to a quick 10-minute call to set it up?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

Follow-ups: use the same Follow-up 1 and 2 as above, but replace the “missed trust signal” line with “reduce damage + show accountability quickly.”

C) LOCAL BUSINESS — HIGH VOLUME VARIANT (Primary)
Subject options:
1) Keeping up with {{review_count}} reviews
2) Too many reviews to answer?
3) Review replies without extra staff time

Email 1:
Hi {{first_name}} — {{business_name}} has {{review_count}} Google reviews, which is great social proof.

The hard part is keeping responses consistent and fast without adding admin workload. Our autopilot drafts brand-safe replies for Google + Yelp, keeps a consistent voice, escalates negatives, and sends weekly KPIs.

Free for 7 days: we’ll respond within 12 hours, and you approve before posting.

Should we do a quick setup call?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 | agent_bob_replit+review-bot@agentmail.to

D) VERTICAL-SPECIFIC ONE-LINERS (drop into Email 1 after the first sentence)
Dentist line: “Patients compare ‘chairside manner’ and responsiveness—review replies are part of that trust.”
Med spa line: “People shop heavily on before/after expectations—responses help set tone and calm concerns.”
HVAC/Plumbing line: “Home services buyers look for fast, accountable operators—owner replies reduce ‘will they show up?’ anxiety.”

E) AGENCY/RESELLER VERSION (Initial)
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on: Google/Yelp replies + weekly KPI report
3) Easy retention lever for local clients

Email 1:
Hi {{first_name}} — quick idea for your local clients ({{vertical}} and similar).

We built an AI Review Reply & Reputation Autopilot for Google + Yelp: brand-safe draft replies, negative-review escalation, and a weekly KPI report your clients understand.

Agencies use this as a retention add-on: “we respond within 12 hours; you approve; we send weekly reputation KPIs.”

If you want, I’ll set it up free for 7 days on one client account to prove the workflow and reporting.

Open to a 15-minute chat?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

PART 5 — DAILY SENDING OPS (FREE STACK + CADENCE)
Tooling (free-first):
- CRM: Google Sheets pipeline (or free HubSpot).
- Sending: existing inbox(es) with conservative ramp (avoid spam).
- Tracking: avoid heavy link tracking early; use plain-text + one legitimacy link.

14-day ramp (per inbox):
Days 1–3: 15 emails/day (highly personalized Priority A only)
Days 4–7: 25 emails/day
Days 8–10: 40 emails/day
Days 11–14: 60 emails/day (only if bounce < 3% and spam complaints = 0)

Daily checklist:
1) Build/QA list (20–50 new leads/day): verify category, remove franchises if desired, ensure website exists.
2) Personalize: add 1 review snippet + 1 response-gap observation.
3) Send batch: mix segments (mostly Priority A/B).
4) Handle replies within SLA:
   - Positive: offer 10-min setup call + free 7-day trial.
   - Neutral: send 2–3 sample replies.
   - Negative: confirm removal from list.
5) Update CRM stages and next follow-up date.

QA thresholds:
- Bounce rate: stop and fix list if >3% in a day or >5% over a week.
- Spam complaints: if any, reduce volume and remove tracking/extra links.
- Reply handling: same-day responses to all positive/neutral replies.

CRM stages (simple):
Prospect → Sent → Replied → Qualified → Demo Booked → Trial (Free 7 days) → Converted (Paid later) → Lost/Do Not Contact
Entry/exit rules:
- Qualified = confirms they manage reviews + has Google/Yelp presence + agrees to trial.
- Demo Booked = calendar time set.
- Trial = connected accounts + first replies drafted.

KPI targets (Week 1):
- Deliverability: >95% delivered
- Reply rate: 3–8% (higher with review-snippet personalization)
- Meetings booked: 0.5–2% of sends
- Trials started: 50%+ of meetings

NOTES ON SAFE PERSONALIZATION
- Prefer paraphrase over direct quote if review is sensitive.
- Do not mention medical outcomes or protected health information for med spas/dental.
- Keep “recent_review_snippet” generic: staff friendliness, timeliness, cleanliness, communication.

NEXT EXECUTION STEP
Choose geography scope, then build the first 200 leads in 48 hours using the CSV headers + query pack above. Start sending to Priority A/B with the Not Responding and Low Rating variants first.
