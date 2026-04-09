# Outbound Machine (Ready-to-Run): Segmented Prospecting Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T05:47:02.738Z

---

Business context
Offer: AI Review Reply & Reputation Autopilot (Google/Yelp). We draft and (optionally) post brand-safe responses to reviews, escalate negative reviews fast, and send weekly KPI reporting so owners stay on top of reputation without spending hours.
Legitimacy link to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email to include: agent_bob_replit+review-bot@agentmail.to

1) ICP + verticals (start with these 3)
A) Dentists / dental practices (high LTV, reviews drive bookings)
B) Med spas / aesthetic clinics (high review sensitivity, high velocity)
C) HVAC + plumbing (home services; high volume + high competition)
Secondary lane: local marketing agencies that manage GBP for these verticals (resell/white-label).

2) Segmentation + priority scoring (use for routing + messaging)
Capture per lead:
- google_rating (e.g., 3.9)
- review_count (e.g., 427)
- last_review_date (YYYY-MM-DD)
- response_rate_proxy: count of owner responses in last 10 reviews / 10

Segments
- NOT_RESPONDING: response_rate_proxy <= 0.20 OR 0 owner replies in last 10 reviews
- LOW_RATING: google_rating < 4.2
- HIGH_VOLUME: review_count >= 200 OR (today - last_review_date) <= 14 days

Priority tiers (send order)
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only

Template routing
- If LOW_RATING → use “recovery + escalation” variant
- If NOT_RESPONDING → use “response gap + speed” variant
- If HIGH_VOLUME only → use “throughput + consistency” variant

3) Lead list CSV schema (headers)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

4) Zero-cost lead list build workflow (Google Maps)
Goal: produce 500–1,000 rows with consistent fields.

Step-by-step (per prospect)
1) Find prospects via Google Maps queries (see query pack below). Open the Google Business Profile.
2) Record: name, phone, website, rating, review count, maps URL.
3) Click “Reviews” and sort by “Newest.” Record last_review_date (date of newest review).
4) Response-rate proxy: scan the last 10 reviews and count how many have an “Owner response.” Divide by 10.
5) Personalization snippet: copy a short excerpt (8–20 words) from the newest review OR paraphrase if sensitive. Do not include health/diagnosis claims. Keep it neutral.
6) Email capture (free-first):
   - Check website “Contact,” “About,” “Team,” and footer for emails.
   - If no email on site: use a role inbox guess in notes (info@, hello@) only if you have a verified domain.
   - Optional free enrichment: LinkedIn company page for owner/manager name; then look for email patterns on the website.
7) Apply segmentation + priority using the rubric above.
8) QA rules (quick):
   - Exclude franchises with corporate-only contact if no local decision-maker.
   - Exclude profiles with no website AND no email route.
   - Ensure category matches vertical (e.g., “Dentist” not “Dental lab”).

Production targets
- One person can do ~40–60 leads/day if capturing response proxy + snippet.
- To reach 600 leads: ~10–15 working days at 40–60/day.

5) Query pack (use once geography is chosen)
Use format: “{vertical keyword} in {city, state}”
Dentists
- dentist, dental clinic, cosmetic dentist, pediatric dentist, orthodontist (optional)
Med spas
- med spa, medical spa, aesthetic clinic, laser clinic, Botox clinic
HVAC/Plumbing
- hvac contractor, air conditioning repair, heating contractor, plumber, emergency plumber
Agency lane
- “local SEO agency {city}”, “Google Business Profile management {city}”, “reputation management agency {city}”

6) Cold email sequence (3-step) — master templates
Sending note: always include legitimacy link + contact email in the footer. Personalize first line with {{business_name}} + {{city}} + {{recent_review_snippet}} and mention response gap only if observed.

6.1 Initial email — NOT_RESPONDING variant (response gap + speed)
Subject options (pick 1)
- Quick idea for {{business_name}} reviews
- Noticed a review-response gap at {{business_name}}
- 12-hour review replies for {{business_name}}?

Body
Hi {{first_name_or_owner}},

I was looking at {{business_name}} in {{city}} and saw a recent review: “{{recent_review_snippet}}”.

Not sure if it’s just busy season, but it looks like a lot of reviews aren’t getting an owner response. That’s a missed chance to reinforce trust (and it can hurt conversions even when ratings are solid).

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses to Google/Yelp reviews within 12 hours, flags negatives for escalation, and sends a weekly KPI summary. You can approve responses before anything is posted.

Open to a 10-minute walkthrough? If you share your GBP link, I can also send 3 sample replies in your tone for recent reviews.

— Bob Smith
AI Review Reply & Reputation Autopilot
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to


6.2 Initial email — LOW_RATING variant (recovery + escalation)
Subject options
- Quick help for {{business_name}} review recovery
- Reducing 1–2★ impact for {{business_name}}
- Review response system for {{business_name}}

Body
Hi {{first_name_or_owner}},

I’m reaching out because I saw {{business_name}}’s recent review mentioning “{{recent_review_snippet}}”.

When ratings are under pressure, fast, consistent owner responses can materially change outcomes: prospects see accountability, and unhappy customers are more likely to update/remove after a good resolution.

Our AI Review Reply & Reputation Autopilot helps you respond quickly (brand-safe drafts in your voice), escalates negative reviews immediately (so you can resolve offline), and reports weekly KPIs so you can see if ratings/review velocity are improving.

Would it be helpful if I drafted responses for your last 5 reviews so you can compare them to your current approach? No obligation.

— Bob Smith
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to


6.3 Initial email — HIGH_VOLUME variant (throughput + consistency)
Subject options
- Keeping up with {{business_name}} review volume
- Review replies at scale for {{business_name}}
- Consistent responses without extra staff

Body
Hi {{first_name_or_owner}},

{{business_name}} is getting a steady stream of reviews (nice problem to have). I noticed a recent one: “{{recent_review_snippet}}”.

Most teams fall behind once review volume climbs—responses get inconsistent, delayed, or generic.

We built an AI Review Reply & Reputation Autopilot that drafts on-brand replies quickly, routes negatives for escalation, and provides a weekly reputation report (rating, response rate, trends). You can keep approvals in the loop or set rules for auto-posting.

Worth a quick chat to see if this would save time and protect your brand voice?

— Bob Smith
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to


6.4 Follow-up #1 (2–3 business days later)
Subject: Re: {{business_name}}

Hi {{first_name_or_owner}},

Quick bump—if I send 3 drafted replies (based on your recent reviews) in a tone that matches {{business_name}}, would you want them?

If yes, just reply with your preferred tone:
1) Warm & friendly
2) Short & professional
3) Premium/concierge

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


6.5 Follow-up #2 (5–7 business days after initial)
Subject: Close the loop?

Hi {{first_name_or_owner}},

Should I close the loop on this?

If review responses aren’t a priority right now, no worries. If they are, I can:
- draft responses within 12 hours,
- flag negatives for escalation,
- send a weekly KPI report (rating/response rate/trends).

Reply with “sample” and I’ll send sample replies for 3 recent reviews.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

7) Agency/reseller email (initial)
Subject options
- White-label review response system for your clients
- GBP review replies in 12 hours (white-label)
- Add-on service for your local SEO clients

Body
Hi {{first_name}},

Do you manage Google Business Profiles for local clients (dentists/med spas/home services)?

We built an AI Review Reply & Reputation Autopilot you can white-label: brand-safe review response drafts within 12 hours, negative-review escalation, and weekly KPI reporting per location. Your team can approve before posting, or set rules by client.

If you want, I’ll share a demo + example weekly report. Also happy to discuss reseller pricing so you can margin it as an add-on.

— Bob Smith
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

8) Daily sending ops checklist (with 14-day ramp)
List QA (daily, before sending)
- Remove duplicates, verify domain exists, ensure business matches vertical category.
- Ensure at least one of: verified email on website, contact form URL, or decision-maker LinkedIn.
- Keep personalization snippet short and non-sensitive.

Ramp schedule (per inbox; keep conservative)
Day 1–2: 10–15 new emails/day
Day 3–4: 20/day
Day 5–6: 30/day
Day 7–8: 40/day
Day 9–10: 50/day
Day 11–14: 60/day (only if bounce < 3% and complaints = 0)

Operational thresholds
- Bounce rate: pause campaign if >5% in a day; investigate list quality.
- Spam complaints: any complaint → pause, adjust copy + targeting.
- Reply SLA: respond to interested replies within 2 hours during business day; negatives/unsub within same day.

Daily activity targets (solo operator baseline)
- 40–60 new sends/day after ramp
- 20–40 follow-ups/day
- 5–10 manual personalizations/day for Priority A
- 5–10 agency prospects/week (higher deal size)

9) CRM stages (simple pipeline)
Prospect (not contacted) → Sent (Email 1) → Follow-up queued → Replied → Qualified (has GBP access path + pain confirmed) → Demo Booked → Trial/POC → Paid → Lost (reason logged)

Qualification checklist (what to confirm on call)
- Who owns GBP/Yelp responses? Any agency involved?
- Average weekly review volume + current response rate
- Desired tone/brand rules + escalation contact
- Approval preference (approve-all vs auto-post rules)
- Number of locations (upsell)

Owner decision needed to execute next (for lead list): choose geography scope
Pick one:
A) Top 25 US metros (fastest targeting, consistent density)
B) 5–10 states (focus markets where you can reference local knowledge)
C) US-wide (largest pool, more variance)
Once chosen, the query pack can be locked and the 500–1,000 lead CSV can be produced using the workflow above.