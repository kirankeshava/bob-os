# Outbound Machine v1 — Segmented Cold Email Pack + Daily Sending Ops + Lead List Build Queries (with legitimacy links)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T17:06:20.069Z

---

Below is a ready-to-run outbound package for AI Review Reply & Reputation Autopilot (Google/Yelp). Use this site link in emails to prove legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 and this contact email in signatures + replies: agent_bob_replit+review-bot@agentmail.to.

1) TARGETING + SEGMENTATION (what to pull first)
Verticals:
A) Dentists
B) Med spas / Aesthetic clinics
C) HVAC + Plumbers (home services)

Segments (tag each lead):
- not_responding: owner responses in last 10 reviews ≤ 2 (≤20%) OR clearly no owner replies visible.
- low_rating: Google rating < 4.2
- high_volume: review_count ≥ 200 OR last_review_date within last 14 days

Priority scoring (for routing):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: (not_responding) OR (low_rating)
- Priority C: (high_volume only)

Personalization tokens to capture from Google:
- {{recent_review_snippet}} = 1 sentence max from latest review (or paraphrase if it contains sensitive personal health info)
- {{response_gap}} = “looks like many recent reviews don’t have a public response yet” / “last owner response appears to be from {{month}}”
- {{location}} = city

2) LEAD LIST BUILD (ZERO-COST) — GEO QUERY PACK
Recommended geo for first 500–1,000: Top metros (high density = faster list build). Use these 12 metros first to get to 500 quickly:
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL.

Google Maps search queries (copy/paste):
Dentists:
- “dentist in {{metro}}”
- “cosmetic dentist in {{metro}}”
- “family dentistry in {{metro}}”
Med spas:
- “med spa in {{metro}}”
- “aesthetic clinic in {{metro}}”
- “botox in {{metro}}”
Home services:
- “HVAC company in {{metro}}”
- “air conditioning repair in {{metro}}”
- “plumber in {{metro}}”

CSV headers (minimum viable for sending + segmentation):
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_owner_response_date,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

How to compute response_rate_proxy (fast manual): check last ~10 reviews on GBP; count how many have an owner response visible; response_rate_proxy = responses/10.

3) COLD EMAIL — 3-STEP SEQUENCE (DIRECT-TO-LOCAL)
Rules:
- Always include 1 personalization line using {{recent_review_snippet}} or {{response_gap}}.
- Keep CTA binary: “Want me to send 2–3 sample replies for approval?”
- Position as free for first 7 days (week 1 policy).

A) NOT RESPONDING variant (use when response gap is the hook)

Email 1 (Day 1)
Subject options:
1) Quick question about your Google reviews
2) Noticed a review response gap at {{business_name}}
3) Can I draft a few replies for you?

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw: “{{recent_review_snippet}}”. It looks like a lot of recent reviews don’t have a public response yet (or the last owner response was a while back).

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google + Yelp and flags any negative reviews for escalation. You approve before anything posts.

For the next 7 days we’ll do it free: replies drafted within 12 hours, in your brand voice, plus a weekly reputation KPI snapshot.

Want me to draft 2–3 sample replies for your newest reviews so you can see the tone?

– Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Email 2 (Day 3)
Subject: Re: {{business_name}} review replies
Body:
Hi {{first_name}} — quick follow-up.

If you send me the link to your Google Business Profile, I’ll reply back with 2–3 draft responses (free) using a brand-safe template. If you like them, we can keep drafts coming daily and only post after your OK.

Is there a manager who owns review responses?

– Bob
agent_bob_replit+review-bot@agentmail.to

Email 3 (Day 7)
Subject: Should I close the loop?
Body:
Hi {{first_name}},

No worries if timing is off. The reason we built this is that fast, consistent review responses tend to lift conversion (and prevent small issues turning into 1-star threads).

Last check: want a free 7-day trial where we draft replies within 12 hours and escalate anything negative to you?

– Bob

B) LOW RATING variant (use when rating <4.2)
Email 1 subject options:
1) Idea to lift {{business_name}} above {{google_rating}}
2) Quick fix for review fallout
3) 7-day free help with review responses

Body:
Hi {{first_name}},

I noticed {{business_name}} is at {{google_rating}} on Google. One recent review said: “{{recent_review_snippet}}”.

We help local businesses respond consistently (Google + Yelp), with an escalation flow for negatives so you can de-escalate fast and show prospects you’re on it. Everything is brand-safe and approval-first.

Happy to run this free for 7 days: we’ll draft responses within 12 hours and send you a weekly KPI summary (rating trend, response rate, negative themes).

Want me to draft a response to that latest review for your approval?

– Bob Smith
(links/signature as above)

Follow-ups: same as NOT RESPONDING but emphasize “de-escalation + public trust”.

C) HIGH VOLUME variant (use when review_count ≥200 or review velocity is high)
Email 1 subject options:
1) Keeping up with your review volume
2) Review responses in <12 hours (approval-first)
3) Can we take review replies off your plate?

Body:
Hi {{first_name}},

{{business_name}} gets a lot of reviews ({{review_count}}). Keeping responses consistent is basically a part-time job.

We draft brand-safe replies for Google + Yelp, route any negative reviews for escalation, and send weekly reputation KPIs. You approve before anything posts.

We can run it free for 7 days. Want 2–3 sample replies drafted from your newest reviews?

– Bob (signature)

4) AGENCY / RESELLER LANE (marketing agencies)
Email 1 subject options:
1) White-label review reply autopilot for your clients
2) Add-on: Google/Yelp review responses (done-for-you)
3) Quick partnership idea

Body:
Hi {{first_name}},

If you manage local clients (dentists/med spas/home services), review response management is a recurring pain and directly affects conversions.

We built an AI Review Reply & Reputation Autopilot (Google + Yelp): brand-safe draft replies within 12 hours, negative review escalation, weekly KPI report. Approval-first. You can resell it to clients as white-label or co-branded.

We’ll run a free 7-day pilot on 1 client so you can see workflow + quality. Quick call this week?

– Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

5) DAILY SENDING OPS (WEEK 1: FREE, ORGANIC, NO SPEND)
CRM stages:
Prospect → Sent → Opened/Engaged → Replied → Qualified → Demo Booked → Trial (7 days free) → Paid → Lost

Daily targets (starting small for deliverability):
Day 1–2: 20 new emails/day
Day 3–4: 30/day
Day 5–7: 40/day
Day 8–10: 60/day
Day 11–14: 80–100/day
Follow-ups: send Email 2 to non-replies on Day 3; Email 3 on Day 7.

QA rules before sending:
- Must have: website OR phone, and an active GBP (maps URL)
- Exclude: national chains/franchises (unless multi-location is a target later), businesses with no reviews, businesses with 1-star troll patterns only
- Confirm last_review_date is within 90 days for Priority A/B

Reply handling SLA:
- Positive interest: reply within 2 hours business time; propose 15-min call or request GBP link + brand tone notes.
- Negative/angry: acknowledge + offer to stop emailing; do not argue.

Core KPI tracking (weekly):
- Sent, deliverability (bounces %), replies %, positive replies %, demos booked, trials started.

This artifact is designed so execution can start immediately: pick metros, run the query pack, collect leads into the CSV headers above, tag segments, then send the matching email variant with a review snippet + response-gap personalization and legitimacy links.