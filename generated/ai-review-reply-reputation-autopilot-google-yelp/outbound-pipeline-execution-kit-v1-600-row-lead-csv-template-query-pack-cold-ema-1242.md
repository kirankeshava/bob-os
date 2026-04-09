# Outbound Pipeline Execution Kit (v1): 600-Row Lead CSV Template + Query Pack + Cold Email (3-step) + Daily Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:10:23.601Z

---

Business to reference in outreach
- Website (legitimacy link to include): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact email to include: agent_bob_replit+review-bot@agentmail.to

A) Target geos (Top 25 US metros) for fast list quality
Use these metros for all three verticals; it keeps the list dense and reduces irrelevant results:
1) New York, NY  2) Los Angeles, CA  3) Chicago, IL  4) Houston, TX  5) Phoenix, AZ
6) Philadelphia, PA  7) San Antonio, TX  8) San Diego, CA  9) Dallas, TX  10) San Jose, CA
11) Austin, TX  12) Jacksonville, FL  13) Fort Worth, TX  14) Columbus, OH  15) Charlotte, NC
16) San Francisco, CA  17) Indianapolis, IN  18) Seattle, WA  19) Denver, CO  20) Washington, DC
21) Boston, MA  22) Nashville, TN  23) Detroit, MI  24) Oklahoma City, OK  25) Las Vegas, NV

B) Google Maps query pack (copy/paste)
Run each query in Google Maps, open listings, collect fields below.

Vertical 1: Dentists
- “dentist in {metro}”
- “dental clinic in {metro}”
- “cosmetic dentist in {metro}”
- “family dentist in {metro}”

Vertical 2: Med spas / aesthetics
- “med spa in {metro}”
- “aesthetic clinic in {metro}”
- “botox in {metro}”
- “laser hair removal in {metro}”

Vertical 3: HVAC / plumbing (home services)
- “hvac contractor in {metro}”
- “air conditioning repair in {metro}”
- “plumber in {metro}”
- “water heater repair in {metro}”

Agency lane (resellers)
- “dental marketing agency {metro}”
- “med spa marketing agency {metro}”
- “home services marketing agency {metro}”
- “local seo agency {metro}”

C) Lead CSV template (columns + formulas)
Create a Google Sheet with these columns. Export CSV when done.

Required columns (copy as header row):
lead_id,lead_type(business/agency),vertical,subvertical,priority_tier(A/B/C),segment_primary(not_responding/low_rating/high_volume),business_name,city,state,metro,website,google_maps_url,phone,google_rating,review_count,last_review_date,last_10_reviews_count,last_10_owner_responses_count,response_rate_proxy,personalization_snippet_safe,decision_maker_name,decision_maker_role,email_1,email_2,linkedin_url,notes,source(query)

Formulas (Google Sheets examples):
- response_rate_proxy (as %): =IFERROR(last_10_owner_responses_count/last_10_reviews_count,0)
- segment_primary:
  =IFS(google_rating<4.2,"low_rating",review_count>=200,"high_volume",response_rate_proxy<=0.2,"not_responding",TRUE,"high_volume")
  (Operational note: you can override manually if a business obviously never responds.)
- priority_tier:
  =IFS(AND(segment_primary="not_responding",review_count>=200),"A",AND(segment_primary="low_rating",review_count>=200),"A",OR(segment_primary="not_responding",segment_primary="low_rating"),"B",TRUE,"C")

How to capture required fields quickly (no paid tools)
1) Open listing in Google Maps.
2) Record: business_name, phone, website, rating, review_count, maps URL.
3) Click “Reviews” → set sort to “Newest”.
4) Capture last_review_date from the newest review.
5) Response-rate proxy: look at the last 10 reviews and count how many have an “Owner response” (some show a reply under the review). Fill:
   - last_10_reviews_count = 10 (or fewer if the business has <10)
   - last_10_owner_responses_count = count of owner replies
6) Personalization snippet (brand-safe): do NOT paste sensitive medical details; prefer paraphrase.
   - Safe example: “A recent reviewer mentioned wait time + front desk helpfulness.”
   - Avoid: patient identifiers, specific treatments, allegations.
7) Email capture (free-first):
   - Check website footer/contact page for owner/manager email.
   - If none: use contact form OR generic email (info@, hello@) but label role as “Front desk” or “General inbox”.
   - Optional free enrichment: try the company domain on Hunter’s free tier or manual patterns (first@domain).

D) 600-row build structure (how to reach 500–1,000 fast)
Target output: 600 businesses + 100 agencies (optional) = 700 total.
- Dentists: 200 (8 per metro x 25 metros)
- Med spas: 200 (8 per metro x 25 metros)
- HVAC/plumbing: 200 (8 per metro x 25 metros)
- Agencies: 100 (4 per metro x 25 metros) OR focus only on metros with dense agency results

Row allocation rule: For each metro+vertical query, collect top 8 independent businesses (skip obvious national franchises when possible; skip listings with no website).

E) Cold email pack (3-step) — Direct-to-local (segment aware)
All versions include legitimacy link + reply-to email.

Tokens to personalize:
{{business_name}}, {{metro}}, {{recent_snippet}}, {{rating}}, {{review_count}}, {{response_rate_proxy}}, {{last_review_date}}, {{website}}

1) NOT RESPONDING (Primary segment)
Subject options:
- Quick fix for Google reviews at {{business_name}}
- Noticed unanswered reviews (can I help?)
- 12-hour review responses for {{business_name}}

Email 1:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and noticed a few recent reviews don’t have an owner response (latest around {{last_review_date}}). One mentioned: “{{recent_snippet}}”.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe replies for Google + Yelp and escalates negatives. You can approve responses (or let it auto-post) and we aim to respond within 12 hours.

If helpful, here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Want me to draft 3 responses for {{business_name}} (free) so you can see the tone?

– Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (2–3 days later):
Subject: Re: reviews at {{business_name}}
Hi {{first_name}} — if I draft 3 replies from your last reviews, do you prefer:
1) “Warm + short” or 2) “Detailed + service-recovery”?

Either way, you can approve before anything posts.
– Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up 2 (5–7 days later):
Subject: Should I close the loop?
Hi {{first_name}}, last try — many local businesses see bookings move when they consistently respond to reviews.

If you want, I’ll send:
- 3 draft replies (brand-safe)
- a quick KPI snapshot (rating, response rate proxy, review velocity)

Reply “drafts” and I’ll send them.
– Bob
agent_bob_replit+review-bot@agentmail.to

2) LOW RATING (Primary segment)
Subject options:
- Quick reputation turnaround for {{business_name}}
- Fixing negatives without sounding robotic
- Service recovery replies (Google/Yelp)

Email 1:
Hi {{first_name}},

I saw {{business_name}} is at ~{{rating}} on Google and a recent reviewer mentioned: “{{recent_snippet}}”. When negatives sit unanswered, it can quietly cost calls/bookings.

We help local businesses respond fast and safely: AI drafts replies, flags high-risk reviews for escalation, and sends a weekly KPI report. You approve replies (or we can auto-post if you prefer).

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Open to a 10-minute call? Or I can draft 2 “service recovery” replies based on your recent negatives.

– Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up 1:
If you send me the link to your GBP/Yelp, I’ll draft a response that:
- acknowledges the issue
- moves it offline
- protects the brand tone

No obligation.
– Bob

Follow-up 2:
If now’s not a fit, who owns reviews at {{business_name}}? Front desk/office manager/marketing?
– Bob

3) HIGH VOLUME (Primary segment)
Subject options:
- Keeping up with review volume at {{business_name}}
- Review responses in under 12 hours
- Automate Google/Yelp replies (with approval)

Email 1:
Hi {{first_name}},

{{business_name}} gets a lot of review activity ({{review_count}} total). When volume is high, consistency is hard—even for great teams.

Our Reputation Autopilot drafts (and can post) brand-safe replies for Google + Yelp, escalates negatives, and sends weekly KPIs. You can set it to “approve-first” so nothing goes out without your OK.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Worth a quick look if I send a sample response in your brand voice?
– Bob
agent_bob_replit+review-bot@agentmail.to

F) Agency/reseller email (higher leverage)
Subject options:
- White-label review response automation for your clients
- Add “review replies in 12 hours” to your retainers
- Reputation KPI reporting + auto-replies (agency)

Email 1:
Hi {{first_name}},

If you manage local clients (dental/med spa/home services), I built an AI Review Reply & Reputation Autopilot that drafts and posts brand-safe responses to Google + Yelp, escalates negatives, and emails weekly KPIs.

Agencies use it to:
- increase client retention (reviews handled consistently)
- add an easy upsell (“responses within 12 hours”)
- reduce time spent writing replies

Product overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Open to a 10-minute chat about a white-label / reseller setup for 5–20 locations?

– Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up 1:
If I send a demo client report (weekly KPIs + flags), would you want it branded for your agency or co-branded?
– Bob

Follow-up 2:
Should I talk to whoever owns fulfillment/ops for your local clients?
– Bob

G) Daily sending ops (quick start)
- CRM stages: Prospect → Sent → Opened → Replied → Qualified → Demo Booked → Trial → Paid → Lost
- Daily minimums (single inbox): 30 new/day + 20 follow-ups/day (ramp to 60 new/day after day 10 if replies/complaints stay healthy)
- QA gates before sending:
  1) website exists, 2) correct vertical, 3) no duplicates, 4) personalization_snippet_safe filled, 5) email format plausible
- Reply handling SLA: same-day for positive replies; <2 hours for angry/negative replies
- Stop rules: if bounce rate > 3% on a batch, pause and clean; if spam complaints > 0.1%, reduce volume and tighten targeting.

What the owner/VA should do next (to produce the real 500–1,000 CSV)
1) Duplicate the sheet with the headers above.
2) For each metro, run 3–4 queries per vertical and collect 8 businesses per metro (skip no-website listings).
3) Fill response proxy using last 10 reviews, add safe snippet, and compute segment/priority.
4) Export CSV and begin sending with the segment-matched email variant.
