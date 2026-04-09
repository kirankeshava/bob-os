# Outbound Machine Kit (Ready-to-Run): Segmented Prospecting Plan + 3-Step Cold Email Sequences + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:08:29.637Z

---

BUSINESS
- Offer: AI Review Reply & Reputation Autopilot (Google/Yelp)
- Legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Reply/contact email to include: agent_bob_replit+review-bot@agentmail.to

1) ICP + VERTICALS (run 2–3 in parallel)
A) Dental practices (high LTV, constant review flow, front-desk time pressure)
B) Med spas / aesthetic clinics (review-driven conversion, high competition)
C) HVAC + Plumbing (urgent services, reputation impacts call volume)
Optional parallel lane: marketing agencies that manage local SMBs’ GBP/Yelp.

2) SEGMENTS + PRIORITY TIERS (routing rules)
Core segments (tag each prospect with one or more):
- NOT_RESPONDING: response-rate proxy <= 20% (0–2 owner responses in last 10 reviews) OR clearly no owner replies visible.
- LOW_RATING: Google rating < 4.2.
- HIGH_VOLUME: review_count >= 200 OR last_review_date within 14 days.

Priority tiers (for send order):
- Priority A (highest intent/pain): (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only

Positioning by segment:
- NOT_RESPONDING angle: “you’re leaving trust on the table; we respond within 12 hours; brand-safe; you approve.”
- LOW_RATING angle: “fast escalation + calm replies to stop bleeding; route critical reviews to owner; fix perception.”
- HIGH_VOLUME angle: “ops/offload; consistent voice; weekly KPI report; never miss a review.”

3) DATA FIELDS TO PERSONALIZE (minimum viable personalization)
Use 1–2 only (don’t overdo it):
- {{business_name}}
- {{city}}
- {{vertical}}
- {{recent_review_snippet}} (quote 6–14 words max OR paraphrase)
- {{response_gap}} (e.g., “looks like several recent reviews didn’t get a public reply”)
- {{rating}} and {{review_count}} (optional if confident)
- {{legitimacy_url}} = business URL above
- {{reply_email}} = agent_bob_replit+review-bot@agentmail.to

Compliance/safety note: If unsure, paraphrase the review instead of quoting. Never mention sensitive health details; keep it general.

4) COLD EMAIL SEQUENCES (3-step) — MASTER TEMPLATES

4.1 INITIAL EMAIL — NOT RESPONDING (generic, then vertical tweaks)
Subject options:
1) Quick win for {{business_name}} reviews
2) Noticed a small review gap
3) Re: Google reviews for {{business_name}}

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}} and noticed {{response_gap}} (ex: “a few recent reviews don’t have a public reply yet”). One example mentioned: “{{recent_review_snippet}}.”

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp, escalates negative reviews to you, and reports weekly reputation KPIs. Typical promise: responses within ~12 hours, and you can approve/edit before anything posts.

If you want to see what this would look like on your listings, I can send 2–3 sample replies (free) based on your latest reviews.

Want me to do that for {{business_name}}?

— Bob
{{reply_email}}
{{legitimacy_url}}

Vertical tweak line (add after first sentence):
- Dental: “Most practices I talk to mean to respond — it just falls on a busy front desk.”
- Med spa: “In aesthetics, the reply tone matters almost as much as the rating.”
- HVAC/Plumbing: “For home services, replies are often the difference between a call and a scroll.”


4.2 FOLLOW-UP #1 — NOT RESPONDING
Subject options:
1) Should I send sample replies?
2) 2 sample responses for {{business_name}}?

Body:
Hi {{first_name}} — quick follow-up.

If you share which platform matters most (Google vs Yelp), I’ll send 2–3 brand-safe draft replies for {{business_name}} based on your most recent reviews. If you like the tone, we can automate it so every new review gets handled quickly and negatives get escalated.

Ok to send the drafts here?

— Bob
{{reply_email}}
{{legitimacy_url}}


4.3 FOLLOW-UP #2 — NOT RESPONDING (breakup)
Subject: Close the loop?

Body:
Hi {{first_name}},

I don’t want to be a pest. Should I stop reaching out about helping {{business_name}} respond to reviews?

If it’s useful later, just reply “later” and I’ll circle back.

— Bob
{{reply_email}}
{{legitimacy_url}}


5) SEGMENT VARIANTS (swap the “reason” paragraph)

5.1 LOW RATING variant (use when rating < 4.2)
Replace the second paragraph with:
“We focus on stopping reputation bleed: calm, brand-safe replies to negative reviews + escalation so you can resolve issues fast. Consistent replies often improve conversion even before the rating moves.”

Optional CTA alternative:
“If you want, I’ll draft responses to your 3 most recent critical reviews so you can see the tone before deciding.”


5.2 HIGH VOLUME variant (use when review_count >= 200 or last review <=14 days)
Replace the second paragraph with:
“With your review volume, the main win is operational: never missing a review, keeping a consistent voice, and getting a weekly KPI report so you know response time + sentiment trends.”


6) AGENCY / RESELLER VERSION (initial email)
Subject options:
1) White-label review replies for your clients?
2) Add-on offer for GBP/Yelp management

Body:
Hi {{first_name}},

If you manage Google Business Profile/Yelp for local clients: we built a brand-safe AI Review Reply & Reputation Autopilot that drafts + posts responses, escalates negatives, and ships weekly KPI reports.

Teams use it as:
- a white-label add-on (you keep margin), or
- an internal ops tool to handle higher client volume without hiring.

Want a quick look? Here’s our info: {{legitimacy_url}}. If you reply, I can send a short reseller outline + pricing structure.

— Bob
{{reply_email}}


7) DAILY SENDING OPS (14-day ramp + guardrails)
Goal: protect deliverability while building replies.

Day 1–3:
- 10–15 new emails/day per inbox; 0–1 follow-ups/day.
- Only Priority A leads.
- Plain text, no links except legitimacy URL; keep it one link max.

Day 4–7:
- 20–30 new/day; follow-ups to Day 1–3.
- Add Priority B.

Day 8–14:
- 40–60 new/day; consistent follow-ups.
- Add Priority C.

Guardrails:
- Bounce rate > 3%: stop new sends, clean list.
- Spam complaints > 0.1%: stop and revise copy/targeting.
- Reply SLA: same-day response to any interested reply.

Daily checklist (operator view):
1) Pull today’s batch (Priority A then B), 1–2 tokens personalized.
2) QA 10 random rows (email format, category correct, not a franchise directory listing).
3) Send new emails within cap.
4) Send scheduled follow-ups.
5) Triage replies into CRM within 2 hours.
6) For “send samples” yes: deliver 2–3 sample replies + ask for 15-min call.


8) CRM PIPELINE (simple stages + definitions)
Stages:
- Prospect (in list, not yet emailed)
- Sent (initial email sent)
- Engaged (opened/clicked or replied; if no tracking, use “replied” only)
- Replied – Interested (asks questions / wants samples)
- Replied – Not Now (timing; set reminder)
- Replied – Not a Fit (wrong contact / no need)
- Demo Booked
- Trial / Pilot (responding to reviews for them or running approval flow)
- Paid
- Lost

Minimum fields:
- business_name, vertical, city_state, email, phone, rating, review_count, last_review_date, segment, priority, last_touch_date, next_step, notes.

KPIs (weekly):
- Sent, Reply rate, Positive reply rate, Meetings booked, Trials started, Paid conversions.

9) WHAT TO DO WHEN THEY REPLY (response macros)
Interested:
“Great — if you share your GBP link (and Yelp if relevant), I’ll send 2–3 sample replies today. Do you prefer: (a) you approve before posting, or (b) fully automated with escalation only for negatives?”

Not now:
“No problem. When would revisiting be helpful — 30, 60, or 90 days? I’ll follow up then.”

Wrong person:
“Thanks — who’s best to speak with about Google/Yelp review responses for {{business_name}}?”


10) NEXT EXECUTION DECISIONS (owner)
- Pick initial geography to keep the list consistent: Top 25 US metros OR 5–10 states.
- Build/ingest 500–1,000 leads and tag segments + priority.
- Start ramp schedule immediately after list is loaded.
