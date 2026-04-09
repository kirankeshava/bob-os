# Outbound Pipeline Kit (Zero-Cost): Lead List CSV Template (500 rows), Segmentation Plan, Cold Email Sequences, Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:50:13.958Z

---

BUSINESS CONTEXT (use in every outreach)
- Product: AI Review Reply & Reputation Autopilot (Google/Yelp)
- Proof/website to include: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email to include: agent_bob_replit+review-bot@agentmail.to
- Offer (Week 1 free): We draft brand-safe replies to all new reviews within 12 hours; you approve (or autopost later); negative reviews get escalated; weekly KPI report.

1) VERTICALS + GEOGRAPHY (LOCK THIS FIRST)
Recommended verticals (high review velocity + high LTV):
A. Dental practices
B. Med spas / aesthetic clinics
C. HVAC / plumbing (home services)
Parallel lane: Marketing agencies serving those verticals.

Recommended geography for fast zero-cost list building:
Option A (default): Top 25 US metros (better density; fewer irrelevant results)
Option B: 10 target states (if you prefer regional focus)

Top 25 metros (starter list you can use):
New York, Los Angeles, Chicago, Dallas-Fort Worth, Houston, Washington DC, Miami, Philadelphia, Atlanta, Phoenix, Boston, San Francisco Bay Area, Riverside/San Bernardino, Detroit, Seattle, Minneapolis–St. Paul, San Diego, Tampa–St. Petersburg, Denver, Baltimore, St. Louis, Orlando, Charlotte, San Antonio, Portland.

2) LEAD LIST CSV TEMPLATE (500-ROW STRUCTURE)
Create a Google Sheet named: review-reply-leads_v1
Tab 1: Leads
Use these headers (copy/paste as row 1):
lead_id,vertical,segment,priority_tier,business_name,city,state,metro,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_response_count,review_snippet_1,review_snippet_date_1,reviewer_first_name_1,owner_reply_present_1,decision_maker_name,decision_maker_role,email_1,email_2,contact_form_url,linkedin_url,notes,source,added_date,last_touch_date,next_step,crm_stage

How to fill key fields quickly (zero-cost):
- google_rating, review_count: from Google Maps listing.
- last_review_date: open “Reviews” sort by “Newest” and capture date.
- response proxy: inspect last 10 reviews; count how many have an owner response.
  * last_10_response_count = number with owner replies among last 10
  * response_rate_proxy = last_10_response_count/10 (enter as 0.0–1.0)
- review_snippet_1: copy 8–20 words from the most recent review (or paraphrase if sensitive).
- decision maker: use About/Team/Contact pages; roles like Owner, Practice Manager, Office Manager, Clinic Director, General Manager.
- emails: from website contact page; if none, infer pattern from staff names (first@domain, firstname.lastname@domain) and/or use contact form URL.

Segmentation rules (fill segment):
- not_responding: response_rate_proxy <= 0.2 OR last_10_response_count <= 2
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within last 14 days
If multiple apply, choose primary segment by priority: low_rating > not_responding > high_volume.

Priority tier rules (fill priority_tier):
- Priority A: (high_volume AND not_responding) OR (high_volume AND low_rating)
- Priority B: (not_responding) OR (low_rating)
- Priority C: (high_volume only) OR everything else that still fits vertical

CRM stages (fill crm_stage): Prospect (not sent), Sent, Follow-up 1, Follow-up 2, Replied, Qualified, Demo Booked, Trial Started, Won, Lost.

3) QUERY PACK (GOOGLE MAPS SEARCHES)
Run these searches per metro:
Dentists:
- “dentist {city}”
- “cosmetic dentist {city}”
- “dental implant {city}”
Med spas:
- “med spa {city}”
- “aesthetic clinic {city}”
- “botox {city}”
HVAC/plumbing:
- “HVAC {city}”
- “air conditioning repair {city}”
- “plumber {city}”

Agency lane (parallel):
- “dental marketing agency {city}”
- “med spa marketing agency {city}”
- “home services marketing agency {city}”

Lead collection pacing targets:
- 25 leads/day per person = conservative
- 50 leads/day per person = realistic after day 2
- 100 leads/day per person = aggressive (requires strict QA sampling)

QA sampling (pre-send hygiene):
- Sample 10% of new rows daily.
- Verify: correct vertical, has website/contact method, rating & review count filled, last_review_date filled, segment & priority_tier consistent with rules.
- Remove: franchises/aggregators without local manager contact, businesses without any online presence besides Maps, irrelevant categories.

4) COLD EMAIL COPY (3-STEP) — INCLUDE WEBSITE + CONTACT
Rules:
- Always include a 1-line personalized hook using review_snippet_1 + the response gap.
- Keep under ~120–140 words.
- Week 1 is free; ask for permission to send 2–3 sample replies.
- Include proof URL + contact email in signature.

TOKENS
{{BusinessName}}, {{City}}, {{Vertical}}, {{RecentReviewSnippet}}, {{LastReviewDate}}, {{ResponseGap}}, {{YourName}} (=Bob)

A) TEMPLATE — NOT RESPONDING (local business)
Subject options:
1) Quick win for {{BusinessName}}’s reviews
2) Noticed a review-response gap
3) Can I draft 2 replies for you (free)?

Email 1:
Hi {{FirstName}} — I was looking at {{BusinessName}}’s recent Google reviews.

A customer wrote: “{{RecentReviewSnippet}}” ({{LastReviewDate}}). It looks like some recent reviews aren’t getting a response ({{ResponseGap}}).

We run an AI Review Reply & Reputation Autopilot for local businesses: brand-safe responses drafted within ~12 hours, negative reviews escalated, and a weekly KPI recap. Week 1 is free and you approve replies before anything posts.

Want me to draft 2–3 replies to your most recent reviews so you can see the quality?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (2–3 days later):
Subject: Should I send the sample replies?
Hi {{FirstName}} — checking if you want me to draft a few ready-to-post responses for {{BusinessName}}. It’s free this week and takes you ~2 minutes to approve.

If you point me to the listing you care about most (Google or Yelp), I’ll send drafts the same day.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 2 (4–6 days later):
Subject: Close the loop?
Hi {{FirstName}} — should I close this out, or is improving review response time a priority for {{BusinessName}} right now?

If yes, reply “draft” and I’ll send 2–3 sample responses for your newest reviews.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

B) TEMPLATE — LOW RATING (local business)
Subject options:
1) Fixing 1–2 star review handling
2) Quick help with reputation recovery
3) Free week: draft responses + escalation

Email 1:
Hi {{FirstName}} — I’m reaching out because reviews directly impact calls/bookings, and {{BusinessName}} has a few tough ones mixed in.

Example: “{{RecentReviewSnippet}}” ({{LastReviewDate}}). When negative reviews don’t get a thoughtful response, it can turn into a pattern.

We run an AI Review Reply & Reputation Autopilot: we draft calm, brand-safe responses within ~12 hours, escalate negatives (so you can resolve offline), and send a weekly KPI report. Week 1 is free and nothing posts without approval.

Want me to draft responses for your 2 most recent negative reviews?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1:
Subject: I can draft the tough ones first
Hi {{FirstName}} — if you share which reviews you want handled first (Google/Yelp links), I’ll draft responses focused on de-escalation + next-step resolution.

Still free this week.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 2:
Subject: Worth a quick test?
Hi {{FirstName}} — should I send a couple sample replies for {{BusinessName}}? If it’s not useful, I’ll stop.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

C) TEMPLATE — HIGH VOLUME (local business)
Subject options:
1) Keeping up with review volume
2) 12-hour review replies for {{BusinessName}}
3) Reduce time spent on reviews

Email 1:
Hi {{FirstName}} — {{BusinessName}} gets steady review volume, which is great—until it becomes another daily task.

We run an AI Review Reply & Reputation Autopilot: brand-safe replies drafted within ~12 hours, negatives escalated, weekly KPI report. Week 1 is free; you approve responses before posting.

If you want, I can draft responses to your 5 most recent reviews today so you can see the tone/quality.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1:
Subject: Want me to draft the last 5?
Hi {{FirstName}} — quick yes/no: should I draft replies to the last 5 reviews for {{BusinessName}} and send them for approval?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 2:
Subject: Close the loop
Hi {{FirstName}} — okay to close this out? If review management is on your plate, I can take the first week free.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

D) AGENCY / RESELLER VERSION (initial)
Subject options:
1) White-label review replies for your clients
2) Add “review response in 12 hours” to your retainers
3) Quick partnership?

Hi {{FirstName}} — do you manage marketing for local {{Vertical}} clients?

We run an AI Review Reply & Reputation Autopilot (Google/Yelp): brand-safe replies drafted within ~12 hours, negative-review escalation, and a weekly KPI report. We can operate white-label so you can add it to your retainer with minimal lift.

Week 1 is free—happy to run this for 1 client so you can see workflows + reporting.

Open to a quick 10-minute call?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

5) DAILY SENDING OPS (ZERO-COST STACK)
Tools:
- Sending: any existing inbox (keep volume low at first)
- CRM: Google Sheets (Tab 2: Pipeline)
- Tracking: none (optional). Focus on replies + booked calls.

14-day ramp (per inbox):
- Days 1–2: 25/day
- Days 3–4: 40/day
- Days 5–7: 60/day
- Days 8–10: 80/day
- Days 11–14: 100/day
Follow-up rules:
- Send Follow-up 1 to non-replies after 2–3 business days.
- Send Follow-up 2 after 4–6 more days.
- Stop after 3 touches unless they reply.

Reply-handling SLA:
- Reply within 2 hours during business day.
- If interested: propose “send 2–3 sample replies today” and ask for the Google/Yelp link.

Bounce/complaint thresholds:
- If bounces >5% in a day, pause and clean list.
- Remove any “unsubscribe” requests immediately.

6) CRM PIPELINE (GOOGLE SHEETS)
Tab 2 headers:
lead_id,business_name,vertical,priority_tier,crm_stage,owner_name,email_1,last_touch_date,next_step,notes

Stage definitions:
- Prospect: in list, not emailed
- Sent: Email 1 sent
- Follow-up 1 / Follow-up 2: follow-ups sent
- Replied: any reply
- Qualified: has Google/Yelp link + confirms pain/ownership
- Demo Booked: scheduled
- Trial Started: week 1 free initiated
- Won: converts to paid after trial (week 2+)
- Lost: no fit / no response after 3 touches / opted out

WHAT I NEED FROM THE OWNER NEXT
1) Confirm geography: Top 25 metros vs 10 states.
2) Execute list build to produce the actual 500–1,000 filled rows using the template + SOP.
3) Start sending with Priority A first (high volume + not responding / low rating) using the matching template variant.
