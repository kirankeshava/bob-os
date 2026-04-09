# Outbound Pipeline Kit (Execution-Ready) — Lead CSV Template, Segmentation Plan, 3-Step Cold Email, Daily Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:48:26.574Z

---

## 1) Lead List CSV (copy/paste headers)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_review_snippet,segment,priority,contact_name,contact_role,email_1,email_2,linkedin_url,notes

### Data dictionary (what “good” looks like)
- google_rating: numeric (e.g., 4.6). 
- review_count: integer.
- last_review_date: YYYY-MM-DD.
- response_rate_proxy: % of last 10 reviews that have an owner response (0–100). If you can’t compute, leave blank but set segment using rating/volume/recency.
- last_review_snippet: 8–20 words from the most recent review (or paraphrase). Avoid sensitive info; don’t include patient data.
- segment (choose one): not_responding | low_rating | high_volume
- priority (choose one): A | B | C

## 2) Segmentation + Priority Rules (apply in Sheets)
Segment rules:
- not_responding: response_rate_proxy <= 20 OR no owner replies visible in last 10 reviews
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR (today - last_review_date) <= 14 days

Priority rubric:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: (not_responding) OR (low_rating)
- Priority C: high_volume only

Routing:
- not_responding → angle = “response gap / speed / brand-safe”
- low_rating → angle = “damage control + escalation + service recovery”
- high_volume → angle = “throughput + weekly KPI reporting”

## 3) Prospecting Plan (2 lanes)
### Lane 1 — Local businesses (owner/operator)
Verticals: Dentists, Med Spas/Aesthetics, HVAC/Plumbing.
Daily pull target (first 14 days): 30–50 new prospects/day.
Order of attack: Priority A first, then B, then C.
Qualification quick checks (skip if fails): no website, obvious franchise/call center, irrelevant category, no reviews at all.

### Lane 2 — Agencies (reseller/partner)
Targets: local SEO agencies, reputation management agencies, web design shops serving local SMB.
Search footprints: “digital marketing agency dentist”, “local SEO med spa”, “reputation management HVAC”, “Google Business Profile management agency”.
Offer positioning: “We run review replies + escalation + weekly KPI reporting; you keep the client relationship.”

## 4) Master Cold Email Sequence (3 steps) — references website + contact email
Sender name suggestion: Bob
From email: (your sending inbox)
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact email (for replies/forwarding internally): agent_bob_replit+review-bot@agentmail.to

### Personalization instructions (do this for every email)
- Include ONE short hook: {{last_review_snippet}} OR a paraphrase.
- Mention ONE observable fact: rating/review_count/response gap.
- Keep it non-creepy: don’t say “I was reading all your reviews”; say “I noticed a recent review mentioning…”

### Email 1 (initial)
Subject options (pick 1):
1) Quick help with review replies for {{business_name}}
2) Noticed a recent Google review for {{business_name}}
3) 12-hour review responses (you approve)

Body:
Hi {{contact_name_or_owner}},

I noticed a recent Google review for {{business_name}} mentioning: “{{last_review_snippet}}.”

A lot of {{vertical}} owners want to respond quickly but it falls behind—especially when review volume spikes or replies feel risky.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe Google/Yelp responses, escalates negative reviews, and sends weekly reputation KPIs. You can approve replies before anything posts.

If it helps, we can start with a 7-day pilot: we respond within 12 hours and flag anything negative for escalation.

Worth a quick 10 minutes this week to see if it fits? 

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
If easier, reply here: agent_bob_replit+review-bot@agentmail.to

### Email 2 (follow-up #1, 2–3 days later)
Subject: Re: review replies for {{business_name}}

Hi {{contact_name_or_owner}},

Quick follow-up—based on what I can see publicly, {{business_name}} looks like a {{segment_angle_observation}}:
- Rating/reviews: {{google_rating}} stars across {{review_count}} reviews
- Recent activity: last review on {{last_review_date}}
- Reply coverage (rough): {{response_rate_proxy}}%

If you want, I’ll send 2–3 sample draft replies (including one for a tougher review) in your tone. No commitment.

Want me to do that?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

### Email 3 (follow-up #2, 5–7 days later)
Subject: Should I close the loop?

Hi {{contact_name_or_owner}},

Should I close the loop, or is someone already handling Google/Yelp review replies at {{business_name}}?

If you’re open to it, we can run a lightweight pilot:
- Draft replies in your brand voice
- You approve (or set rules for auto-post)
- Escalate negative reviews to a manager
- Weekly KPI recap (rating trend, response time, unresolved negatives)

Reply with “pilot” and I’ll send next steps.

– Bob
agent_bob_replit+review-bot@agentmail.to

### Segment-specific opening lines (swap into Email 1 line 1)
Not responding:
- “I noticed several recent reviews don’t have an owner response yet—easy to miss when it’s busy.”
Low rating:
- “I saw your rating is close to the ‘choice’ threshold in your area—small response improvements can move it.”
High volume:
- “You’re getting steady review volume—replying fast and consistently can be a real revenue lever.”

## 5) Daily Sending Ops (14-day ramp)
Day 1–3: 20–30 new sends/day, manual personalization, monitor bounces/spam.
Day 4–7: 40–60 new sends/day + follow-ups; pause any list source with >3% bounce.
Day 8–14: 60–100 new sends/day if bounce <2% and replies healthy.

Rules:
- Stop/adjust if bounce rate >3% in any 24h window.
- Reply SLA: same day for positive intent; within 12 hours for “interested”.
- Track: sent, delivered, bounced, replies, positive replies, demos booked.

## 6) CRM Stages (simple + enforceable)
1. Prospect (has required fields)
2. Queued (assigned segment + priority)
3. Sent (Email 1)
4. Follow-up 1 sent
5. Follow-up 2 sent
6. Replied — Positive
7. Replied — Neutral/Objection
8. Replied — Not now (set remind)
9. Demo booked
10. Trial/Pilot started
11. Paid
12. Lost

Required CRM fields: segment, priority, last_review_date, response_rate_proxy, next_followup_date, objection_tag, outcome.

## 7) QA Checklist (sample 20 leads per batch)
- Correct category (dentist / med spa / HVAC/plumbing)
- Website present and matches business name
- Rating + review_count captured
- last_review_date within last 90 days preferred (unless high volume)
- last_review_snippet is short and safe (no sensitive info)
- segment/priority consistent with rules

Next required owner input: pick the initial geography scope so the team can build the first 200 leads fast, then scale to 500–1,000.