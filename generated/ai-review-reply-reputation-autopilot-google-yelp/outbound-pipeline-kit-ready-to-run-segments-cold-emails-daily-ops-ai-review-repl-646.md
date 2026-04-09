# Outbound Pipeline Kit (Ready-to-Run): Segments + Cold Emails + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:44:55.335Z

---

Business links to reference in outreach
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

1) Targeting: verticals + who to contact
Primary verticals (high review velocity + high LTV)
A) Dentists / dental clinics
B) Med spas / aesthetic clinics
C) HVAC + plumbers (home services)
Primary personas: Owner, Practice Manager, Office Manager, GM, Operations Manager, Marketing Manager.

Agency lane (parallel)
Target: small-to-mid marketing agencies that manage local SEO/GBP for dentists/med spas/home services. Persona: agency owner, head of SEO, account manager.
Offer: white-label “review response + escalation + weekly KPI report” that reduces their account workload.

2) Segmentation + priority scoring (for routing + messaging)
Capture these fields for segmentation (minimum): rating, review_count, last_review_date, response_rate_proxy.

Definitions
- Response-rate proxy (manual): look at last 10 Google reviews; count how many have an owner response. response_rate_proxy = responses/10.
Segments
- Not Responding: response_rate_proxy ≤ 0.2 (≤2/10) OR clearly no recent owner replies.
- Low Rating: google_rating < 4.2.
- High Volume: review_count ≥ 200 OR last_review_date ≤ 14 days.

Priority tiers (who to email first)
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: Not Responding OR Low Rating
- Priority C: High Volume only
Messaging angle mapping
- Not Responding → “response gap” + lost revenue/SEO trust + 12-hour SLA
- Low Rating → “save-the-account” + escalation workflows + manager approval
- High Volume → “throughput/ops” + brand-safe templates + weekly KPIs

3) Lead list build spec (zero-cost workflow)
Recommended geo for first 500–1,000: Top 25 US metros (keeps list relevant + predictable review volume).
Google Maps query structure (examples)
- “dentist in Austin TX”, “cosmetic dentist in Phoenix AZ”, “med spa in Miami FL”, “aesthetic clinic in Chicago IL”, “HVAC contractor in Denver CO”, “plumber in Seattle WA”.

CSV columns (copy/paste headers)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

Personalization snippet rule (safe)
Use 8–20 words from the most recent review OR paraphrase. Do not mention medical details; keep it generic (service quality, wait time, staff friendliness).

4) Cold email sequences (3-step) — LOCAL BUSINESSES
Personalization tokens you’ll fill per lead:
{{FirstName}} {{BusinessName}} {{City}} {{RecentReviewSnippet}} {{ResponseGap}} {{Vertical}}

4A) Variant: NOT RESPONDING (use for Priority A/B)
Subject options:
1) Quick question about your Google reviews
2) Noticed a response gap for {{BusinessName}}
3) Review replies—can I help?

Email 1
Hi {{FirstName}} — I was looking at {{BusinessName}}’s Google reviews and saw: “{{RecentReviewSnippet}}”.

It looks like some recent reviews don’t have an owner response yet ({{ResponseGap}}). For local businesses, that can quietly cost calls/bookings—people read the replies.

We run a simple Review Reply & Reputation Autopilot: brand-safe responses drafted and posted within 12 hours, negative reviews escalated, and a weekly KPI email (rating, response rate, volume). You can approve replies before anything posts.

If you want, I can send 3 draft responses for your most recent reviews so you can see the tone.

Worth trying for {{BusinessName}}?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (2 days later)
Subject: Re: {{BusinessName}} reviews
Hi {{FirstName}} — quick follow-up.

If I draft 3 replies based on your latest Google reviews (no commitment), do you want them in:
A) “friendly + short” tone, or
B) “premium/professional” tone?

— Bob

Follow-up 2 (4–5 days later)
Subject: Close the loop?
Hi {{FirstName}} — should I close this out?

If review replies aren’t a priority right now, no worries. If they are, I can set you up with:
- 12-hour reply SLA
- approval before posting
- negative-review escalation
- weekly reputation KPIs

Reply with “send drafts” and I’ll draft 3 responses for {{BusinessName}}.
— Bob

4B) Variant: LOW RATING (use for Priority A/B)
Subject options:
1) Quick idea to protect {{BusinessName}}’s rating
2) Saw a few tough reviews
3) Can I help with review recovery?

Email 1
Hi {{FirstName}} — I came across {{BusinessName}} and saw a recent review: “{{RecentReviewSnippet}}”.

When ratings dip (even slightly), it can reduce click-through and calls—especially in {{City}} where people comparison-shop.

We run a Review Reply & Reputation Autopilot that:
- drafts brand-safe responses fast (you approve)
- escalates negative reviews to you immediately
- sends a weekly KPI report (rating trend, response rate, new-review volume)

If you want, I’ll draft responses to your 2–3 most recent critical reviews so you can see how we’d handle tone and de-escalation.

Open to that?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Follow-up 1
Hi {{FirstName}} — if you tell me which tone you prefer (firm / apologetic / neutral), I’ll draft a couple responses for the toughest recent reviews.
— Bob

Follow-up 2
Hi {{FirstName}} — last try. Want me to send 2 draft responses (copy/paste ready) for {{BusinessName}}?
— Bob

4C) Variant: HIGH VOLUME (use for Priority A/C)
Subject options:
1) Keeping up with review volume at {{BusinessName}}
2) Quick ops fix for review replies
3) 12-hour review response coverage

Email 1
Hi {{FirstName}} — noticed {{BusinessName}} gets a steady stream of Google reviews.

When volume is high, the challenge becomes consistency: fast replies, on-brand tone, and making sure negative reviews get escalated.

Our Review Reply & Reputation Autopilot drafts and posts replies within 12 hours (or sends for approval), flags negatives immediately, and emails weekly KPIs so you can see response rate + rating trend.

If I send 3 example replies in your brand voice for recent reviews, would that be helpful?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

5) Cold email — AGENCY / RESELLER lane
Subject options:
1) White-label review replies for your local SEO clients
2) Offload GBP review responses (white-label)
3) Add a retention lever for your clients

Email 1
Hi {{FirstName}} — I’m reaching out because you work with local businesses on GBP/local SEO.

We run a white-label Review Reply & Reputation Autopilot: brand-safe Google review responses within 12 hours, negative-review escalation, and a weekly KPI report you can forward to clients. You can choose “client approves” or “agency approves” workflows.

If you tell me your main verticals (dentist/med spa/home services/etc.), I’ll send a simple package + margin suggestion.

Open to a 10-minute chat?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

6) Daily sending ops (14-day ramp + targets)
Tooling assumptions: start with 1 inbox, no attachments, plain text, 1 link max (use website link above).

14-day ramp (per inbox)
- Days 1–2: 10–15 sends/day
- Days 3–4: 20 sends/day
- Days 5–6: 30 sends/day
- Days 7–8: 40 sends/day
- Days 9–10: 50 sends/day
- Days 11–14: 60–80 sends/day (only if bounce rate <3% and spam complaints ~0)

Daily activity targets (starter)
- New sends: 40–80/day (after ramp)
- Follow-ups: 20–60/day (as replies allow)
- Manual personalizations: 10–20/day for Priority A (include snippet + response gap)

List QA rules (before sending)
- Verify category matches vertical (avoid irrelevant listings)
- Must have website or clear contact method
- Exclude: national franchises (optional), closed/permanently closed, duplicate listings
- Check emails: prefer on-site contact page; if none, use manager email if listed; avoid generic “support@” when possible

Thresholds / safety
- Bounce rate: pause if >5% in any day; investigate list quality
- Spam complaints: pause immediately if any pattern appears
- Reply SLA: respond within 2 business hours to positive replies

7) CRM stages (simple)
Stages: Prospect → Sent → Follow-up Due → Replied → Qualified → Demo Booked → Trial/Pilot → Paid → Lost
Entry/exit criteria
- Prospect: lead validated + segmented
- Sent: initial email sent
- Follow-up Due: no reply after 2 days
- Replied: any response
- Qualified: confirms they manage reviews + has GBP/Yelp + wants help
- Demo Booked: calendar set
- Trial/Pilot: drafting/posting workflow started
- Paid: subscription confirmed

8) What to do next (owner action)
1) Confirm geo scope (recommended: Top 25 US metros).
2) Build first 200 leads using the CSV headers + segmentation rules above.
3) Start ramp: 10–15/day and scale to 60–80/day per inbox.
4) Track KPIs weekly: deliverability (bounce), reply rate, demos booked, trials started, closes.

If you want the fastest path to 500–1,000 leads, a paid Google Maps scraper can be used, but it requires explicit spend approval first.