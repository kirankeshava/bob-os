# Outbound Pipeline Kit v1 — Lead Build SOP + Segmentation + Cold Email Pack + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T05:50:15.427Z

---

Business legitimacy references (use in outreach signatures and as proof link):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

1) ICP + VERTICALS (use 2–3 in parallel)
A) Dentists (general, cosmetic, ortho): high LTV, heavy reputation sensitivity, steady review flow.
B) Med spas / aesthetic clinics: extremely reputation-driven, high ticket, high review velocity.
C) HVAC + plumbers: high competition in Maps pack, high review velocity, missed calls = lost jobs.
Secondary lane (reseller): local marketing agencies managing GBP/Yelp for 10+ clients.

2) LEAD LIST CSV SCHEMA (columns)
Required columns:
business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy_last10, segment, priority, owner_or_manager_name, role_guess, email_1, email_2, personalization_snippet, notes

3) SEGMENTATION RULES (simple + operational)
Compute response_rate_proxy_last10 = (# of last 10 Google reviews with an owner response) / 10.
Segments:
- not_responding: response_rate_proxy_last10 <= 0.2 OR 0 owner replies in last 10.
- low_rating: google_rating < 4.2.
- high_volume: review_count >= 200 OR last_review_date within last 14 days.
Priority scoring:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only
Routing to pitch angle:
- not_responding → “response gap / speed / consistency”
- low_rating → “escalate + recover + brand-safe”
- high_volume → “ops throughput + weekly KPI report”

4) ZERO-COST LEAD BUILD SOP (Google Maps + websites)
Goal: 500–1,000 records with emails.

Step-by-step (per lead):
1. Open Google Maps and search: "{vertical} in {metro}" (example: “med spa in Scottsdale AZ”).
2. Open a result; confirm it is independent/local (avoid franchises unless multi-location is desired).
3. Capture:
   - business_name, phone, website, google_maps_url
   - google_rating, review_count
4. Open Reviews tab:
   - Identify last_review_date (most recent review date)
   - For the last 10 reviews, count how many have an owner response → response_rate_proxy_last10
   - Copy a short personalization_snippet from the most recent review (5–15 words). If sensitive, paraphrase (see policy below).
5. Find emails (free methods first):
   - Website → Contact page, footer, team page (look for owner/manager emails)
   - If no email visible: try “about”, “privacy policy”, “careers”, or “appointments” pages
   - If still no email: use a role-based guess ONLY if domain is owned (info@, hello@, contact@). Put as email_2 and mark notes=role_based.
6. Owner/manager name:
   - Pull from About/Team page, LinkedIn business page, or “Meet the Doctor/Provider” page.
7. Apply segment + priority.
8. QA rule: skip if website missing AND no email can be found AND category irrelevant.

Daily production targets (manual, one operator):
- 60–100 leads/day if only capturing rating/reviews/last date.
- 30–60 leads/day if also finding emails + response proxy + snippet.

5) PERSONALIZATION + COMPLIANCE MINI-POLICY (use in cold email)
Do:
- Quote small, non-sensitive excerpts (5–15 words) from public reviews.
- Prefer paraphrase for medical contexts (med spa/dental) to avoid referencing procedures/health details.
- Keep tone neutral; never imply the reviewer is a patient/client if not explicit.
Don’t:
- Mention protected/medical details, treatment specifics, or anything that could be construed as PHI.
- Shame the business for negative reviews.
- Paste full reviews; keep it brief.
Safe snippet examples:
- “Quick service but hard to reach by phone.”
- “Front desk was helpful, wait was long.”
Paraphrase pattern:
- Original: “My Botox results weren’t even…” → Use: “A recent reviewer mentioned expectations weren’t met.”

6) COLD EMAIL PACK (3-step) — includes website + contact email

Global tokens:
{{first_name}} {{business_name}} {{city}} {{vertical}} {{google_rating}} {{review_count}} {{last_review_date}} {{response_rate_proxy}} {{recent_review_snippet}}

6.1 INITIAL EMAIL — Not Responding (vertical-agnostic)
Subject options:
- Quick question about your Google reviews
- {{business_name}}: reply coverage
- Responding to reviews (12-hour SLA)

Body:
Hi {{first_name}} — I was looking at {{business_name}} on Google and noticed a recent review: “{{recent_review_snippet}}”.

A lot of local businesses want to reply consistently, but it’s hard to keep up (especially when reviews come in at random times). We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google Business Profile and Yelp, escalates negative reviews, and sends weekly reputation KPIs.

Offer: we can respond within 12 hours, and you can approve/edit before anything posts.

Open to a 10-minute call this week to see if it would save you time and help protect ratings?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

6.2 INITIAL EMAIL — Low Rating (recovery angle)
Subject options:
- Quick fix for reputation follow-through
- Ideas to lift Google rating (without discounts)
- {{business_name}} review follow-ups

Body:
Hi {{first_name}} — I saw {{business_name}}’s Google rating is around {{google_rating}} with {{review_count}} reviews. One recent review mentioned: “{{recent_review_snippet}}”.

When responses are delayed or inconsistent, it can make future customers assume the same about the service. Our Reputation Autopilot helps you respond fast and consistently on Google + Yelp, and it flags negatives for escalation so you can recover the relationship offline.

If helpful, I can show you a simple workflow: “respond within 12 hours + escalate negatives + weekly KPI report.” You approve responses before posting.

Worth a quick call?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

6.3 INITIAL EMAIL — High Volume (ops + reporting angle)
Subject options:
- Keeping up with {{review_count}} reviews
- Review response ops for {{business_name}}
- Weekly reputation KPIs

Body:
Hi {{first_name}} — {{business_name}} has a strong volume of reviews ({{review_count}}). With that pace, review response becomes an ops problem.

We built a small system that drafts brand-safe replies for Google + Yelp, escalates negative reviews to you immediately, and sends a weekly KPI email (new reviews, response time, sentiment notes).

If you want, I can walk you through the setup and what “12-hour response coverage” looks like in practice (with approval before posting).

Open to 10 minutes?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

6.4 FOLLOW-UP #1 (2–3 business days later)
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

If you’re the right person: would it be crazy to pilot this for 14 days? We cover Google + Yelp replies, escalate negatives, and send a weekly KPI snapshot. You approve/edit before anything posts.

If not you, who owns reputation/review responses at {{business_name}}?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

6.5 FOLLOW-UP #2 (4–7 business days later)
Subject: Should I close the loop?

Hi {{first_name}} — last note from me.

I can send 2–3 example replies written in your brand voice based on your most recent reviews (Google/Yelp). If you like them, we can talk about setting up 12-hour response coverage + negative review escalation.

Want me to send examples, or should I close the loop?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

7) AGENCY / RESELLER VERSION (initial)
Subject options:
- White-label review response ops for your clients
- Add-on: Google/Yelp responses + KPI report
- Helping agencies cover review replies

Body:
Hi {{first_name}} — do you manage Google Business Profile / reputation for local clients (dental, med spa, home services)?

We built an AI Review Reply & Reputation Autopilot: brand-safe draft replies for Google + Yelp, negative review escalation, and a weekly KPI email. Agencies use it as a white-label ops layer to keep response SLAs without adding headcount.

If you have 10+ locations/clients where review replies are inconsistent, I can show a simple workflow and reseller pricing structure.

Open to 15 minutes?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

8) DAILY SENDING OPS (targets + 14-day ramp)
Tools (free-first): Google Sheets (CRM-lite), Gmail/Workspace inbox, BCC to CRM sheet, manual follow-ups.

Daily activity targets (once ramped):
- 50–100 new emails/day (split across verticals)
- 30–60 follow-ups/day
- 10 LinkedIn/Instagram DMs/day (optional; owners/managers)
- Reply SLA: under 4 business hours

14-day ramp (per inbox):
- Days 1–3: 15–20/day
- Days 4–7: 25–40/day
- Days 8–14: 50–75/day
Stop/slowdown rules:
- Bounce rate > 3% in a day → pause new sends, clean list
- Spam complaints > 0.1% → pause, revise copy/targeting
- Reply rate < 1% after 200 sends → tighten segments to Priority A only + stronger personalization

9) CRM STAGES (simple + strict)
Stages:
- Prospect (in sheet, not yet emailed)
- Sent (initial sent; next_task_date set)
- Engaged (reply OR booked link click OR explicit interest)
- Qualified (meets ICP, has GBP/Yelp, agrees problem exists)
- Demo Booked
- Trial / Pilot
- Paid
- Lost (reason)
Minimum tracked fields:
- segment, priority, date_sent_1, date_sent_2, date_sent_3, last_touch, next_task_date, status, notes

10) NEXT REQUIRED OWNER DECISION (so list building can start immediately)
Choose initial geography scope for the first 500–1,000 leads:
A) Top 25 US metros (best balance of volume + recognizable markets)
B) 5–10 states (best for tight positioning + time zones)
C) US-wide (largest but noisier)
Once chosen, the query set is simply: “{vertical} in {metro/state}” repeated until quota is met, prioritizing Priority A segments first.
