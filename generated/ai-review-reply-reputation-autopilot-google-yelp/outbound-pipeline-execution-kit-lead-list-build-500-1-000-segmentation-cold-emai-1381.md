# Outbound Pipeline Execution Kit — Lead List Build (500–1,000) + Segmentation + Cold Email (3-step) + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:36:37.664Z

---

## 1) Target verticals (initial)
- Dentists / Dental clinics
- Med spas / Aesthetic clinics
- HVAC + Plumbers (home services)
Plus: agency/reseller lane (marketing agencies that service these verticals).

## 2) Geography (default): Top 25 US metros
New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, Nashville, Detroit, Oklahoma City, Portland.

If you prefer states instead: swap metros with “{service} + {state}” and focus on 5–10 states.

## 3) Lead capture CSV schema (copy headers exactly)
created_at,vertical,segment,priority,business_name,city_state,address,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,owner_or_manager_name,role_guess,email_1,email_2,contact_page_url,notes

### Segments
- not_responding: response_rate_proxy_last10 <= 0.2 OR 0 owner responses visible in last 10 reviews
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR (TODAY()-last_review_date) <= 14

### Priority scoring (simple, operational)
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: (not_responding) OR (low_rating)
- Priority C: (high_volume only)

## 4) Google Maps query pack (exact strings)
Run each query in Google Maps. Collect the first 20–40 non-franchise, non-chain results per query/metro.

### Dentists
- “dentist {metro}”
- “dental clinic {metro}”
- “cosmetic dentist {metro}”
- “emergency dentist {metro}”

### Med spas
- “med spa {metro}”
- “aesthetic clinic {metro}”
- “botox {metro}”
- “laser hair removal {metro}”

### HVAC/Plumbing
- “HVAC {metro}”
- “air conditioning repair {metro}”
- “plumber {metro}”
- “water heater repair {metro}”

### Exclusion/QA rules (avoid garbage)
Exclude if: national chain/franchise location pages, no website, out-of-area service with no local presence, category mismatch (e.g., dental lab), closed/permanently closed.

## 5) How to collect review metrics fast (manual, zero-cost)
For each GBP listing:
1) Record rating + review count from the listing header.
2) Click “Reviews” → sort by “Newest.”
3) Capture last_review_date (latest review).
4) Copy a short last_review_excerpt (8–20 words). If it’s sensitive, paraphrase in your sheet.
5) Compute response_rate_proxy_last10:
   - Scan the last 10 reviews and count how many have an “Owner response.”
   - response_rate_proxy_last10 = owner_responses / 10.

## 6) Agency/reseller lane (lead list build)
### Who to target
Small-to-mid marketing agencies, “local SEO” shops, reputation management consultants, and web agencies with local business clients.

### Search footprints
- “dental marketing agency {metro}”
- “med spa marketing {metro}”
- “local SEO agency {metro}”
- “reputation management agency {metro}”

### Roles to email
Owner/Founder, Head of Client Success, Account Manager, Operations.

### Agency segmentation
- Agencies with many local clients = high potential (bundle resale)
- Agencies advertising “GBP management” but not “review responses” = strong fit

## 7) Cold email pack (3-step) — LOCAL BUSINESSES
Use personalization tokens:
- {{business_name}}, {{city}}, {{vertical}}, {{recent_review_excerpt}}, {{response_gap_fact}}, {{rating}}, {{review_count}}

### Personalization hook options (choose 1)
A) “Saw a recent review: ‘{{recent_review_excerpt}}’ — looks like it didn’t get a public reply yet.”
B) “Noticed you’ve got {{review_count}} reviews (nice). Quick question: who’s owning replies day-to-day?”
C) “I checked the last ~10 reviews and only a couple had owner responses (might just be time constraints).”

### Email 1 (Initial) — Not Responding angle
Subject options:
- “Quick idea for {{business_name}} reviews”
- “Replying to Google reviews (hands-off)” 
- “12-hour review replies for {{vertical}}”

Body:
Hi {{first_name}},

{{personalized_hook}}

We run an AI Review Reply & Reputation Autopilot for local businesses: brand-safe draft responses to Google Business Profile + Yelp, negative-review escalation, and a weekly KPI report.

Simple offer: we respond within 12 hours, you can approve (or we follow a strict brand voice), and we flag anything negative immediately.

Want me to show you 2–3 draft replies for your latest reviews so you can see the tone? If yes, reply “drafts” and I’ll send them.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Email 1 variant — Low Rating angle
Subject: “Fixing the review ‘story’ for {{business_name}}”

Hi {{first_name}},

I noticed {{business_name}} is around {{rating}} on Google. Sometimes the fastest win isn’t “more reviews,” it’s consistent, professional replies that show future customers you’re on it.

We draft brand-safe responses for every Google/Yelp review, escalate negatives the same day, and send a weekly KPI snapshot (rating trend, response rate, negative themes).

Open to a quick 10-min look? I can share a mini plan + a few draft replies based on your most recent reviews.

— Bob
[site + email as above]

### Email 1 variant — High Volume angle
Subject: “Keeping up with {{review_count}} reviews”

Hi {{first_name}},

{{business_name}} has {{review_count}} reviews — that’s a real inbound channel. Most teams fall behind on replies just from volume.

We handle Google/Yelp review responses within 12 hours (brand-safe, optional approval), escalate negatives, and report weekly KPIs so it’s managed like a pipeline.

Should I send 2–3 example replies in your voice for recent reviews?

— Bob
[site + email]

### Follow-up 1 (Email 2) — 2 days later
Subject: “Re: {{business_name}} reviews”

Hi {{first_name}},

Circling back—if you want, I can draft replies to your latest 3 reviews (no charge) so you can see how we keep it brand-safe and non-cringey.

If someone else owns reviews at {{business_name}}, who’s the right person?

— Bob
[site + email]

### Follow-up 2 (Email 3) — 5–7 days later
Subject: “Worth a quick test?”

Hi {{first_name}},

Last try from me. If review replies are already handled, no worries.

If they’re not: want a 7-day pilot where we reply to every new Google/Yelp review within 12 hours and send a weekly KPI email? You can approve replies or set rules.

Reply “pilot” and I’ll send next steps.

— Bob
[site + email]

## 8) Cold email — AGENCY/RESELLER (initial + 2 follow-ups)
### Agency Email 1
Subject: “White-label review replies for your local clients”

Hi {{first_name}},

If you manage Google Business Profiles for local businesses: we offer a white-label review reply autopilot (Google + Yelp). Brand-safe drafts, negative escalation, and weekly KPI reporting.

This helps agencies add a retention-friendly line item without staffing a rep to answer reviews daily.

Open to a 15-min chat? If you tell me your main niches (dental/med spa/home services), I’ll share packaging + margin options.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Agency Follow-ups
Follow-up 1: ask if they want a sample “client-ready” report + sample reply set.
Follow-up 2: propose a small pilot with 3 clients for 14 days.

## 9) Daily sending ops (14-day ramp)
Assuming 1 inbox:
- Days 1–3: 15/day (mix new + follow-ups)
- Days 4–7: 25/day
- Days 8–10: 35/day
- Days 11–14: 50/day
Rules:
- Keep bounce rate < 3% (pause list if higher; fix emails)
- Complaints must be ~0; if any spike, reduce volume + tighten targeting
- Reply SLA: same business day; negative replies get a “thanks + 2 questions” response within 2 hours

## 10) CRM stages (minimum viable)
Prospect → Queued → Sent → Opened (optional) → Replied → Qualified → Demo Booked → Trial/Pilot → Paid → Lost
Entry/exit criteria:
- Qualified: confirms they manage reviews + has GBP + agrees review replies matter
- Demo Booked: calendar set
- Trial: pilot terms confirmed + access method agreed

## 11) Production targets to reach 500–1,000 leads (manual)
- 1 trained VA can produce ~40–60 good rows/day with review-proxy and a snippet.
- 10–15 working days → 500–900 rows.

## 12) What to do next (most direct path)
1) Use the Top-25 metro queries and collect the first 200 rows (balanced across verticals, prioritize Priority A/B).
2) Start sending at 15/day while list build continues.
3) Track replies + book demos; refine query categories based on best reply rates.
