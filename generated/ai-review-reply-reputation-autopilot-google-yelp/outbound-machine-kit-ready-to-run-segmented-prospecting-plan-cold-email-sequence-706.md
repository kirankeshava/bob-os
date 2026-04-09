# Outbound Machine Kit (Ready-to-Run): Segmented Prospecting Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:43:36.233Z

---

BUSINESS REFS (use in every outbound touch)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact email (replies + forwards): agent_bob_replit+review-bot@agentmail.to

1) ICP + VERTICALS (2–3 to start)
We will run 2 direct lanes + 1 reseller lane:
A) Dentists / dental practices (high LTV, constant review velocity, front-desk time constraints)
B) Med spas / aesthetic clinics (high competition, reputation sensitivity, high review volume)
C) HVAC + plumbing (high intent from ratings, strong “speed of response” signal)
D) Agencies/resellers serving these verticals (faster scaling via bundles)

2) SEGMENTATION + PRIORITY ROUTING (what we target first)
Core fields to capture for each prospect: google_rating, review_count, last_review_date, response_rate_proxy (owner responses in last 10 / 10), plus 1 recent review snippet.

Segments:
- NOT_RESPONDING: response_rate_proxy <= 0.2 OR no owner replies visible in last ~10 reviews.
- LOW_RATING: google_rating < 4.2.
- HIGH_VOLUME: review_count >= 200 OR last_review_date within 14 days.

Priority tiers (who gets emailed first):
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
  Rationale: most immediate revenue impact; clear operational pain.
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only

Messaging angle by segment:
- NOT_RESPONDING: “response gap” + missed conversion + we respond within 12 hours, brand-safe, approval workflow.
- LOW_RATING: escalation workflow + negative-review triage + protect team + weekly KPIs.
- HIGH_VOLUME: operational throughput + consistency + reduce front-desk time.

3) ZERO-COST LEAD LIST BUILD WORKFLOW (500–1,000) — REPEATABLE
Decision needed from owner: geography (Top 25 US metros vs 5–10 states vs US-wide). Once chosen, use the following process.

3.1 Query structure (Google Maps / Google Search)
Use consistent footprints to avoid irrelevant categories.
- Dental: “dentist” OR “dental clinic” + {city, state}
- Med spa: “med spa” OR “aesthetic clinic” OR “botox” + {city, state}
- Home services: “HVAC” OR “air conditioning repair” OR “plumber” + {city, state}
Agency lane:
- “dental marketing agency” + {state}
- “med spa marketing” + {state}
- “HVAC marketing agency” + {state}

3.2 Data capture SOP (per lead)
For each business:
1) Capture: business name, phone, website, city/state, Google Maps URL.
2) Capture: rating + review count.
3) Capture: last review date (open reviews, sort newest).
4) Compute response_rate_proxy: look at last ~10 reviews and count how many have an owner/manager response. Divide by 10.
5) Save one personalization snippet:
   - Prefer paraphrase of a positive review or a neutral quote fragment (avoid medical claims or sensitive info).
   - If negative review: capture the theme (e.g., “wait time”, “billing confusion”) not personal details.
6) Find email(s): website contact page, staff page, “info@”, “office@”, “appointments@”. For agencies, look for “hello@ / partnerships@ / sales@”.

3.3 CSV columns (paste as headers)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

3.4 QA rules (avoid garbage leads)
- Exclude: franchises with corporate-only contact (unless location email exists), businesses without a website/email, categories that don’t match the vertical, listings with < 20 reviews (low signal), closed/permanently closed.
- Spot-check 10% of rows daily for: wrong category, broken website, missing email, wrong city.

4) COLD EMAIL SEQUENCE PACK (3 touches) — WITH TOKENS
Tokens:
- {{first_name}} {{business_name}} {{city}} {{service_type}} {{google_rating}} {{review_count}} {{recent_review_snippet}} {{response_gap_observation}}
- Include the legitimacy link and reply-to email in every email.

4.1 UNIVERSAL SUBJECT LINES (choose 1)
- Quick fix for your Google reviews at {{business_name}}
- Noticed a review response gap ({{business_name}})
- 12-hour review replies (you approve) — {{city}}

4.2 EMAIL 1 (INITIAL) — NOT_RESPONDING variant (local business)
Hi {{first_name}} — I was looking at {{business_name}} on Google and noticed a response gap on recent reviews (e.g., {{response_gap_observation}}).

We run an “AI Review Reply & Reputation Autopilot” that drafts brand-safe responses to Google (and Yelp), escalates negative reviews to you, and keeps replies consistent.

Offer: we respond within 12 hours, you can approve/edit, and we send a weekly KPI email (rating trend, response rate, negative-review alerts).

If I send 2–3 draft replies based on your latest reviews (no commitment), would you want to see them?

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply here: agent_bob_replit+review-bot@agentmail.to

— Bob

4.3 EMAIL 1 (INITIAL) — LOW_RATING variant
Hi {{first_name}} — I saw {{business_name}} is at {{google_rating}} on Google and a few recent reviews mention themes like “{{recent_review_snippet}}”.

We help local businesses respond fast and safely: drafts for every review (Google + Yelp), negative reviews get escalated immediately, and you get a weekly KPI report so nothing slips.

Would it be helpful if I sent a couple draft responses you could post (or tweak) to start turning the narrative?

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

4.4 EMAIL 1 (INITIAL) — HIGH_VOLUME variant
Hi {{first_name}} — {{business_name}} has ~{{review_count}} reviews and it looks like new ones are coming in regularly.

If replying is falling on the floor (or taking staff time), we run an autopilot that drafts brand-safe replies, routes negative reviews to you, and keeps response times tight.

Open to a quick look? I can send example replies based on your latest reviews and a suggested response workflow.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

4.5 FOLLOW-UP 1 (2–3 days later) — UNIVERSAL
Subject: Re: {{business_name}} reviews
Hi {{first_name}} — quick follow-up.

If you share the link to your Google Business Profile (or just confirm it’s the right listing), I’ll send 2 draft replies tailored to your recent reviews. You can post them yourself or use them as-is.

Would that be useful?

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

4.6 FOLLOW-UP 2 (5–7 days later) — BREAKUP
Subject: Should I close this?
Hi {{first_name}} — last note.

Should I close the loop, or is someone at {{business_name}} the right person to handle review replies?

Either way, here’s the overview link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

4.7 AGENCY/RESELLER VERSION (INITIAL)
Subject: White-label review reply autopilot for your clients
Hi {{first_name}} — do you manage Google Business Profile reputation for local clients (dentists / med spas / home services)?

We built an “AI Review Reply & Reputation Autopilot” that drafts brand-safe responses for Google + Yelp, escalates negatives, and emails weekly KPI reporting. Agencies can resell it as an add-on (you stay client-facing).

If you tell me your main vertical + typical client count, I’ll outline a simple workflow + pricing you can margin.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

5) DAILY SENDING OPS (14-DAY RAMP + KPIs)
Goal: build deliverability, keep complaint rates low, and generate replies/demos.

5.1 CRM stages (minimal)
- Prospect (in list, not sent)
- Sent (Email 1 sent)
- Follow-up queued (FU1/FU2 scheduled)
- Replied — Interested
- Replied — Not now
- Replied — Not a fit
- Demo booked
- Trial started
- Paid
- Lost

5.2 14-day ramp (per inbox; scale only if metrics are healthy)
Day 1–2: 10–15/day (highly targeted Priority A)
Day 3–4: 20/day
Day 5–7: 30/day
Week 2: 40–60/day
Rules:
- Stop scaling if bounce rate > 3% or spam complaints > 0.1%.
- Always send to Priority A first, then B, then C.

5.3 Daily checklist (operator)
- Pull 25–100 new prospects (depending on ramp day)
- QA 10% sample (category match, website works, email present)
- Personalization: insert {{recent_review_snippet}} + {{response_gap_observation}} (1 line)
- Send Email 1
- Process replies twice/day:
  - Interested: offer to send sample replies today + ask for GBP link
  - Objection: time/cost/control → emphasize approval + brand-safe + escalation
  - Wrong person: ask for referral
- Queue FU1/FU2 automatically for non-replies
- Weekly: export KPIs (sent, delivered, replies, positive replies, demos, trials, paid)

5.4 Reply-handling SLA
- Respond to any interested reply within 2 business hours.
- If they share their Google Business Profile link, respond same day with: (a) 2 example draft replies, (b) proposed workflow (approval + escalation), (c) CTA to a 15-min call.

6) NEXT EXECUTION DECISION (BLOCKER)
Choose geography for the first 500–1,000 leads:
A) Top 25 US metros (fastest learning, dense markets)
B) 5–10 states (easier operationally if you want regional focus)
C) US-wide (largest but messier)
Once chosen, the query pack can be finalized and list production can begin immediately.
