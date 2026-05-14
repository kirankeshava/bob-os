# Outbound Machine (Zero-Spend) — Segmented Prospecting Plan + 3-Step Cold Email Pack + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T06:20:44.580Z

---

BUSINESS ID (use in all outreach)
Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to
Sender name: Bob Smith

1) ICP + VERTICALS (pick 2–3 to start)
A) Dentists (high LTV, heavy review influence on bookings)
B) Med spas / aesthetics (high ticket, reputation-sensitive)
C) HVAC + Plumbers (lead-gen driven, review velocity)
Parallel lane: Local marketing agencies serving these verticals (resell/white-label)

2) SEGMENTATION + PRIORITY ROUTING
Capture: rating, review_count, last_review_date, and response-rate proxy (owner replies in last 10 reviews).
Segments:
- NOT_RESPONDING: response_rate_proxy <= 20% OR 0 owner replies in last 10 reviews.
- LOW_RATING: google_rating < 4.2.
- HIGH_VOLUME: review_count >= 200 OR last_review_date <= 14 days.
Priority score (use for send order):
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only
Template routing:
- NOT_RESPONDING → “response gap / missed revenue” angle
- LOW_RATING → “damage control + escalation + brand-safe replies” angle
- HIGH_VOLUME → “ops throughput + 12-hour SLA + weekly KPI report” angle

3) LEAD LIST CSV HEADERS (paste into Google Sheets)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_review_excerpt,owner_or_manager_name,role_guess,email_1,email_2,segment,priority,notes

4) ZERO-COST LIST BUILD SOP (to reach 500–1,000)
Goal: 100 leads/day manual (single operator) or 250+/day with a VA.
Step-by-step:
1) Google Maps search query format:
   - “dentist + {metro}”, “cosmetic dentist + {metro}”, “med spa + {metro}”, “aesthetic clinic + {metro}”, “HVAC contractor + {metro}”, “plumber + {metro}”.
2) Open business profile → record rating + review count.
3) Click reviews → capture last review date + copy 1 short excerpt (1–2 sentences max).
4) Response proxy: scan last ~10 reviews and count owner replies. response_rate_proxy = replies/10.
5) Find website → look for contact/manager email. If none: use contact form and log as “form_only”. Also check Facebook page for an email.
6) Segment + priority using the rules above.
QA rules (10% sample daily):
- Must be independently owned (avoid national franchises unless multi-location owner email is clear)
- Must have an active website OR a contact email somewhere
- Category must match vertical (no “dental lab” when targeting dentists)

5) 3-STEP COLD EMAIL SEQUENCE (LOCAL BUSINESSES)
Personalization tokens:
{{Business}}, {{City}}, {{FirstName}}, {{Vertical}}, {{RecentReviewSnippet}}, {{ResponseGap}} (e.g., “looks like several recent reviews didn’t get a public reply”), {{Rating}}, {{ReviewCount}}

5A) INITIAL — NOT RESPONDING (Vertical-agnostic)
Subject options:
1) Quick question about your Google reviews
2) Noticed a response gap at {{Business}}
3) {{Business}} reviews (12-hour replies?)

Body:
Hi {{FirstName}} — Bob here.

I was looking at {{Business}}’s recent Google reviews and saw: “{{RecentReviewSnippet}}”. It also looks like {{ResponseGap}}.

We built a simple “review reply autopilot” for local businesses: brand-safe draft responses for Google/Yelp, negative-review escalation, and a weekly KPI report. You approve replies (or we can run in draft-only mode).

If it’s helpful, I can set you up on a free 7-day trial and have replies drafted within 12 hours.

Want me to send a 2-minute walkthrough + examples? Here’s our site for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up #1 (2 days later):
Subject: Re: {{Business}} reviews
Hi {{FirstName}} — circling back.

If you forward me 1–2 recent reviews (or just confirm you want Google only vs Google+Yelp), I’ll draft a few on-brand replies so you can see the quality. Free.

Should I send examples?
— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-up #2 (4 days later):
Subject: Close the loop?
Totally fine if now isn’t a priority.

If you want, I can:
1) Draft replies for your last 10 Google reviews
2) Flag any that should be escalated privately
3) Send a simple weekly KPI snapshot

Reply with “draft-only” and I’ll send a sample pack.
— Bob

5B) INITIAL — LOW RATING (damage control)
Subject options:
1) Helping stabilize review rating for {{Business}}
2) Quick fix for negative reviews
3) {{Business}}: response + escalation process

Body:
Hi {{FirstName}} — Bob here.

I noticed {{Business}} is at ~{{Rating}} on Google and a recent reviewer said: “{{RecentReviewSnippet}}”. When negative reviews don’t get a fast, careful response, it can keep costing calls.

We run a brand-safe review response process (Google/Yelp):
- Draft a calm public reply (you approve)
- Escalate sensitive issues privately (refund/redo/manager callback)
- Weekly KPI email (new reviews, avg rating movement, response rate)

No cost for the first 7 days. If you want, I’ll draft responses to the last 5 negative reviews so you can see the tone.

Can I send the sample drafts?
Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-ups: use the same Follow-up #1 and #2 as above, but change the sample ask to “last 3 negative reviews”.

5C) INITIAL — HIGH VOLUME (ops throughput)
Subject options:
1) Handling review volume at {{Business}}
2) Fast replies to Google/Yelp reviews
3) A simple weekly review KPI report

Body:
Hi {{FirstName}} — Bob here.

{{Business}} has a lot of review activity ({{ReviewCount}} total). When volume is high, the hard part is consistency: replies within 24 hours, brand-safe language, and catching issues early.

Our autopilot drafts replies for Google/Yelp, escalates negatives, and emails a weekly KPI report. You can approve everything or run draft-only.

Want a free 7-day trial? I can start by drafting replies for the last 10 reviews so you can judge quality.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

6) AGENCY / RESELLER LANE (initial email)
Subject options:
1) White-label review reply autopilot for your clients
2) Add “review responses + KPI report” to your retainers
3) Quick partnership?

Body:
Hi {{FirstName}} — Bob here.

If you manage local business marketing (dentists/med spas/home services), we built a lightweight review reply autopilot you can white-label: brand-safe drafts for Google/Yelp, negative-review escalation, and weekly reputation KPIs.

We’re offering a free 7-day trial for 1 client account so you can test it and see if it fits your retainer stack.

Want me to send a quick overview + example report? Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob
agent_bob_replit+review-bot@agentmail.to

7) DAILY SENDING OPS (ZERO-SPEND)
Tools (free): Google Sheets (CRM), Gmail, manual personalization.
CRM stages (columns): Prospect → Sent → Opened/Clicked (optional) → Replied → Qualified → Demo Booked → Trial Started → Trial Active → Converted → Lost.
Daily activity targets (single inbox):
- Day 1–2: 20 new sends/day
- Day 3–4: 30/day
- Day 5–7: 40/day
- Week 2: 50/day if bounce rate < 3% and replies are healthy
Follow-up rules:
- Follow-up #1 at +2 days, Follow-up #2 at +4 days (stop if replied)
Reply SLA: respond within 2 hours during business day; book calls within 48 hours.
List hygiene thresholds:
- Hard bounce > 3%: pause, verify emails, tighten sources
- Spam complaints > 0.1%: pause, reduce volume, simplify copy, remove tracking

8) 7-DAY EXECUTION PLAN (WHAT TO DO NEXT)
Day 1: Pick geography (top metros or target states). Build 100 leads (Priority A/B first). Send 20.
Day 2: Build 100 leads. Send 30. Log replies in CRM.
Day 3: Build 100 leads. Send 30 + Follow-up #1 to Day 1 non-replies.
Day 4: Build 100 leads. Send 40 + Follow-up #1 to Day 2.
Day 5: Build 100 leads. Send 40 + Follow-up #2 to Day 1.
Day 6: QA sample (10%), fix bad categories, continue sends.
Day 7: Summarize KPIs: sent, reply rate, qualified rate, demos booked; refine segments + subject lines.

If you want the highest-intent prospects first, only send Priority A for the first 200 emails (NOT_RESPONDING+HIGH_VOLUME and LOW_RATING+HIGH_VOLUME).