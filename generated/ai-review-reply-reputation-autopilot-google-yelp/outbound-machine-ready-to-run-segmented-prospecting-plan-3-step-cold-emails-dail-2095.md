# Outbound Machine (Ready-to-Run) — Segmented Prospecting Plan + 3-Step Cold Emails + Daily Sending Ops + CRM Stages (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T19:40:54.141Z

---

Business link to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Business contact email to include: agent_bob_replit+review-bot@agentmail.to

1) ICP + VERTICALS (focus)
A) Dentists / Dental clinics
- Why: high-margin services, high frequency of “front desk experience” reviews, strong local SEO sensitivity.
B) Med spas / Aesthetic clinics
- Why: highly review-driven, appointment-based revenue, frequent reputation volatility.
C) HVAC + Plumbing
- Why: emergency/urgent services, high review velocity, missed responses directly impact call volume.
D) Agency/Reseller lane (parallel)
- Local SEO agencies, web/marketing agencies serving these verticals; they can resell and bundle.

2) SEGMENTATION + PRIORITY RULES (to decide who gets emailed first)
Capture these fields per prospect: google_rating, review_count, last_review_date, response_rate_proxy (owner responses in last 10 reviews), plus a personalization_snippet (recent review excerpt or paraphrase).

Segments:
- NOT_RESPONDING: response_rate_proxy <= 20% OR 0 owner responses in last 10 reviews.
- LOW_RATING: google_rating < 4.2.
- HIGH_VOLUME: review_count >= 200 OR last_review_date within last 14 days.

Priority score (simple routing):
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: (NOT_RESPONDING) OR (LOW_RATING)
- Priority C: HIGH_VOLUME only

Message angle by segment:
- NOT_RESPONDING → “response gap” + speed/SLA + owner approval.
- LOW_RATING → “recovery + escalation” + brand-safe tone + protect rating.
- HIGH_VOLUME → “ops throughput” + consistent voice + weekly KPI report.

3) LEAD LIST CSV TEMPLATE (headers to use)
Recommended columns:
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy_last10
- segment (NOT_RESPONDING / LOW_RATING / HIGH_VOLUME)
- priority (A/B/C)
- contact_name (owner/manager if known)
- role_guess
- email_1
- email_2
- personalization_snippet (recent review snippet or paraphrase)
- notes

4) COLD EMAIL SEQUENCES (3-step) — LOCAL BUSINESS
Use placeholders:
{{business_name}}, {{city}}, {{vertical}}, {{personalization_snippet}}, {{response_gap}}, {{rating}}, {{review_count}}

4A) DENTIST — Initial Email (choose based on segment)
Subject options (pick one):
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed a review response gap at {{business_name}}
3) 12-hour review replies for dental practices

Template — NOT_RESPONDING angle:
Hi {{contact_name_or_owner}},

I was looking at {{business_name}}’s Google reviews and noticed a few recent ones like “{{personalization_snippet}}” that don’t have a response yet (or responses are inconsistent).

We run an AI Review Reply & Reputation Autopilot for local businesses: brand-safe draft replies within 12 hours, escalation for negative reviews, and you can approve everything before it posts.

If you want, I can send 3 draft replies for your most recent reviews so you can see the tone (free). Would you like me to do that?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Template — LOW_RATING angle:
Hi {{contact_name_or_owner}},

Noticed {{business_name}} is at ~{{rating}} on Google. In dental, even a small rating drop can reduce calls/bookings.

We help by drafting brand-safe responses quickly (including the tough ones), escalating urgent issues, and tracking weekly KPIs so you can see whether sentiment and response rate are improving.

If you share your Google Business Profile link, I’ll reply with 3 example responses tailored to your latest reviews (free). Interested?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Template — HIGH_VOLUME angle:
Hi {{contact_name_or_owner}},

{{business_name}} has a lot of review activity ({{review_count}}+). Most practices struggle to keep a consistent, compliant voice when reviews pile up.

Our Reputation Autopilot drafts replies within 12 hours, flags negative reviews for escalation, and sends a weekly KPI summary (response rate, sentiment trend, rating movement).

Want me to send a quick sample: 3 draft replies based on your latest reviews (free)?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

4B) MED SPA — Initial Email
Subject options:
1) Med spa review replies in 12 hours (you approve)
2) Quick win for {{business_name}}’s Google/Yelp reviews
3) Reputation autopilot for aesthetic clinics

Email:
Hi {{contact_name_or_owner}},

Saw a recent review mentioning “{{personalization_snippet}}”. Many med spas get busy and reviews go unanswered—then the next prospect sees silence.

We run a brand-safe review reply autopilot for Google/Yelp: drafts within 12 hours, escalation for negative reviews, and you can approve before anything posts.

Want me to draft replies for 3 of your most recent reviews (free) so you can see the tone?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

4C) HVAC/PLUMBING — Initial Email
Subject options:
1) Missed review replies = missed calls
2) Quick help for {{business_name}} reviews
3) 12-hour review response coverage for HVAC/plumbing

Email:
Hi {{contact_name_or_owner}},

I was checking {{business_name}} and saw a recent review like “{{personalization_snippet}}”. In home services, prospects often decide based on how you handle reviews—especially the negative ones.

We draft brand-safe responses within 12 hours (Google/Yelp), escalate negative reviews, and send a weekly KPI summary. You can approve replies before they post.

If you want, I can send 3 draft responses tailored to your latest reviews (free). Should I?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

5) FOLLOW-UP EMAILS (universal; lightly tweak per vertical)

Follow-up #1 (2–3 business days later)
Subject: Re: {{business_name}} reviews
Hi {{contact_name_or_owner}},

Quick follow-up—still happy to draft 3 brand-safe replies for {{business_name}}’s most recent reviews (free).

If it’s easier: reply with your Google Business Profile link (or confirm this is the right listing), and I’ll send the drafts.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up #2 (5–7 business days later)
Subject: Close the loop?
Hi {{contact_name_or_owner}},

Should I close the loop on this? If review management is already handled, no worries.

If not, we can cover replies within 12 hours, escalate negative reviews, and give you a weekly KPI snapshot—starting with a free sample of 3 draft replies.

Worth sending those drafts?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6) AGENCY / RESELLER OUTREACH (initial)
Subject options:
1) White-label review reply autopilot for your clients
2) Add a “review response SLA” to your local SEO packages
3) Quick partnership idea (Google/Yelp reviews)

Email:
Hi {{first_name}},

I’m reaching out because you work with local businesses ({{vertical_focus_if_known}}). We built an AI Review Reply & Reputation Autopilot for Google/Yelp: brand-safe drafts in 12 hours, escalation for negative reviews, and weekly KPI reporting.

Agencies use it to add a measurable deliverable to SEO/GBP management: “review responses covered within 12 hours” + consistent brand voice.

If you want, I can share a quick workflow + do a free sample for one client location so you can see quality.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

7) DAILY SENDING OPS (WEEK 1 = free + low volume to protect deliverability)
Goal: start conversations and book demos/trials, not blast volume.

Day-by-day ramp (per inbox; conservative):
- Day 1–2: 10 new/day (all highly targeted Priority A)
- Day 3–4: 15 new/day
- Day 5–7: 20 new/day
- Day 8–10: 25 new/day
- Day 11–14: 30 new/day

Reply handling SLA:
- Respond to positive replies within 1 hour during business time.
- Negative replies: same day; polite opt-out confirmation.

List QA rules (before sending):
- Must have: business_name, vertical, city_state, google_rating, review_count, last_review_date, google_maps_url, at least one email.
- Exclude: national franchises (unless multi-location strategy), businesses with no website and no email, categories mismatch.
- Personalization: use a short snippet or paraphrase from a recent review; do not reference sensitive personal/medical details.

Bounce/complaint thresholds:
- Pause list source if hard bounces > 3% in any day.
- Immediately suppress any opt-out; maintain a suppression list.

8) CRM STAGES (simple pipeline)
Stages + exit criteria:
- Prospect (in CSV, not yet emailed)
- Sent (email #1 sent)
- Replied (any reply)
- Qualified (has Google/Yelp listing + acknowledges pain + agrees to sample/draft)
- Demo Booked (calendar time set)
- Trial (7-day free; replies drafted/posted with approval)
- Paid (post week-1; convert after trial)
- Lost (not a fit / no response after sequence / asked not to contact)

9) EXECUTION NOTES (zero-cost lead building)
If staying $0: build the first 200 leads manually using Google Maps queries by vertical + metro, then expand to 500–1,000. Track response-rate proxy by checking last ~10 reviews for owner replies and computing percentage.

Operator daily checklist (15–30 minutes):
1) Add 20–30 new prospects (Priority A/B)
2) Send new emails within daily cap
3) Send follow-ups due today
4) Log replies + update CRM stage
5) Add notes on objections to refine copy

This document is ready to paste into your ops wiki and start sending as soon as the first lead batch is compiled.