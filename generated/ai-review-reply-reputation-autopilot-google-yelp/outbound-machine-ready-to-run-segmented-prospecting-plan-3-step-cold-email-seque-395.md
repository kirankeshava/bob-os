# Outbound Machine (Ready-to-Run): Segmented Prospecting Plan + 3-Step Cold Email Sequences + Daily Ops + CRM (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:45:12.602Z

---

BUSINESS CONTEXT
Offer: AI Review Reply & Reputation Autopilot (Google/Yelp) — drafts and posts brand-safe responses, escalates negative reviews, weekly KPIs.
Legitimacy link to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
Reply-to / contact: agent_bob_replit+review-bot@agentmail.to

1) TARGETING + SEGMENTATION (WHAT TO PULL FIRST)
Verticals (high review velocity + high LTV):
A) Dentists / dental clinics
B) Med spas / aesthetic clinics
C) HVAC + plumbing (home services)
Parallel lane: Local marketing agencies that serve these verticals.

Lead CSV minimum columns (recommended):
business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy (0–100%), segment, priority_tier, personalization_snippet, contact_name, role_guess, email_1, email_2, notes

Segmentation rules:
- Not Responding: response_rate_proxy <= 20% OR 0 owner responses in last 10 reviews.
- Low Rating: google_rating < 4.2 (for some trades you can also treat <4.5 as “at risk”).
- High Volume: review_count >= 200 OR last_review_date within last 14 days.
Priority tiers (routing):
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: (Not Responding) OR (Low Rating)
- Priority C: High Volume only
Personalization snippet rule: use either (a) 8–15 word excerpt from the most recent review, or (b) a paraphrase such as “a recent review mentioned scheduling / wait time / front desk / pricing.” Avoid sensitive info.

2) PROSPECTING PLAN (HOW TO USE THE SEGMENTS)
Primary message by segment:
- Not Responding: “You’re leaving money on the table by not replying; we respond within 12 hours; you approve.”
- Low Rating: “Fast, brand-safe recovery responses + escalation to fix root issues; weekly KPI report.”
- High Volume: “Ops + consistency: remove the daily burden; maintain tone; weekly reporting.”

Geo options for list-building (choose 1 for the first 500–1,000):
Option 1 (fast + consistent): Top 25 US metros (easier querying, more high-volume listings).
Option 2 (focus): 5–10 states where you can build deeper density.
Option 3 (broad): US-wide (more noise; QA burden higher).

3) COLD EMAIL COPY PACK (3-STEP SEQUENCE)
NOTES:
- Replace tokens: {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap_fact}}, {{rating}}, {{review_count}}, {{last_review_date}}.
- Always include legitimacy URL + contact email.
- Keep “posting” phrasing flexible: “draft (and optionally post)”; some accounts require owner authorization.

A) DENTAL — VARIANT: NOT RESPONDING
Subject options:
1) Quick note about your Google reviews
2) Saw a recent review for {{business_name}}
3) Replying to reviews (without adding work)

Email 1:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}} — a recent one said “{{recent_review_snippet}}.” I also noticed several recent reviews don’t have an owner response ({{response_gap_fact}}).

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe replies for Google/Yelp and keeps a consistent tone. You can approve replies (or we can run on pre-approved guidelines). We aim to respond within 12 hours and escalate negative reviews so they don’t sit.

If I send 2–3 sample replies for your latest reviews, would you want to see them?

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
Or reply here: agent_bob_replit+review-bot@agentmail.to

— Bob

Follow-up 1 (Day 3–4):
Subject: sample replies for {{business_name}}?
Hi {{first_name}} — quick follow-up.

If you share which tone you prefer (friendly / professional / concise), I’ll draft a few review responses for {{business_name}} based on your most recent reviews. No commitment.

Should I send the samples here, or is there a better email?
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 2 (Day 7–9):
Subject: close the loop
Hi {{first_name}},

Totally fine if now isn’t the time. Last question: are you currently replying to Google/Yelp reviews in-house, or is it something that tends to slip?

If helpful, I can still send 2–3 sample replies for your latest reviews.
— Bob

B) DENTAL — VARIANT: LOW RATING
Subject options:
1) Quick idea to lift rating (without more work)
2) Reputation follow-up for {{business_name}}
3) Fast responses to negative reviews

Email 1:
Hi {{first_name}},

Noticed {{business_name}} is at {{rating}} on Google with ~{{review_count}} reviews. A recent review mentioned “{{recent_review_snippet}}.”

We run an AI reputation autopilot that drafts careful, brand-safe responses and escalates negative reviews quickly (so the right person can fix the issue). Most clinics see the biggest impact when negative reviews get a thoughtful reply within 12–24 hours.

Want me to draft responses to your 2 most recent critical reviews so you can compare to what’s currently posted?

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

C) MED SPA — VARIANT: HIGH VOLUME
Subject options:
1) Keeping up with reviews at {{business_name}}
2) Review replies in your brand voice
3) 12-hour review response coverage

Email 1:
Hi {{first_name}},

{{business_name}} has strong review activity ({{review_count}} total; last review on {{last_review_date}}). A recent reviewer said “{{recent_review_snippet}}.”

If reviews are coming in weekly, replying consistently becomes a time sink. Our Reputation Autopilot drafts on-brand replies for Google/Yelp, routes negatives for escalation, and sends a simple weekly KPI report (rating trend, response rate, negative themes).

If I draft a week’s worth of sample responses in your preferred tone, would you like to see them?

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

D) HVAC/PLUMBING — VARIANT: NOT RESPONDING
Subject options:
1) Missing review replies (quick fix)
2) Customers mention you — but no response
3) Review response coverage for {{business_name}}

Email 1:
Hi {{first_name}},

Saw a recent Google review for {{business_name}} that said “{{recent_review_snippet}}.” I also noticed a number of recent reviews don’t have an owner response ({{response_gap_fact}}).

We help home service businesses respond fast without pulling the owner/dispatcher off the phone: brand-safe draft replies for Google/Yelp, optional posting after approval, and escalation when a review is negative or mentions a callback/charge dispute.

Open to me sending a few ready-to-post replies for your most recent reviews?

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

E) AGENCY / RESELLER VERSION (INITIAL)
Subject options:
1) White-label review response (Google/Yelp)
2) Add-on for your local clients
3) Quick revenue add: reputation autopilot

Email 1:
Hi {{first_name}},

If you manage local clients (dentists, med spas, home services), review response is one of those tasks that directly impacts conversion but gets ignored.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe Google/Yelp replies, escalates negatives, and sends weekly KPI summaries. It’s designed to be run as a managed service: you set tone guidelines, clients approve (or you approve), and you can package it as an add-on.

Would it be useful if I show you how agencies are reselling this (pricing + workflow) and send a couple of sample replies from a client’s latest reviews?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

— Bob

4) DAILY SENDING OPS (14-DAY RAMP + RULES)
Goal: build deliverability safely, then scale.
Free-first tooling: Gmail/Workspace inboxes you already have; tracking disabled initially; use a Google Sheet or free HubSpot CRM.

Ramp schedule per inbox (conservative):
- Days 1–2: 10–15 new emails/day (mostly Priority A), plain text, no links first 10 sends.
- Days 3–4: 20/day; introduce legitimacy link after you see replies.
- Days 5–7: 30/day; start Follow-up 1.
- Days 8–10: 40/day; add Follow-up 2.
- Days 11–14: 50/day per inbox if bounce rate <3% and spam complaints ~0.

List hygiene + QA:
- Exclude: franchises with corporate-only contact, businesses without websites, categories mismatch, obviously closed locations.
- Bounce thresholds: pause list source if hard bounces >3% in any day.
- Personalization QA: verify snippet is not sensitive; paraphrase if needed.

Reply handling SLA:
- Same day for positive/curious replies.
- For “not interested,” tag Lost + reason.
- For “who are you / is this legit,” reply with the site URL and offer to send sample replies.

5) CRM PIPELINE (SIMPLE STAGES)
Stages + entry/exit:
1. Prospect (has required fields + segment + email)
2. Sent (Email 1 sent)
3. Engaged (opened/replied; or clicked if tracking is on)
4. Qualified (pain confirmed: not responding / low rating / high volume + decision maker)
5. Demo Booked (calendar scheduled)
6. Trial / Pilot (sample replies delivered; awaiting approval)
7. Paid (subscription or managed service started)
8. Lost (no fit / no response / wrong contact)

KPIs to track weekly:
- Deliverability: bounce %, spam complaint %, reply %
- Commercial: qualified %, demos booked, close rate
- Offer proof: # sample replies requested, time-to-first-response

6) NEXT EXECUTION STEP (TO GET TO 500–1,000 LEADS)
Pick geography scope, then run the Google Maps workflow:
- Use queries like: “dentist {{metro}}”, “cosmetic dentist {{metro}}”, “med spa {{metro}}”, “aesthetic clinic {{metro}}”, “HVAC contractor {{metro}}”, “plumber {{metro}}”.
- Capture rating, review_count, last_review_date, and response_rate_proxy (owner replies in last 10 reviews / 10).
- Segment + priority using rules above.

Once the first 200 leads are built, start sending immediately (don’t wait for 1,000). Prioritize Priority A first for fastest conversions.
