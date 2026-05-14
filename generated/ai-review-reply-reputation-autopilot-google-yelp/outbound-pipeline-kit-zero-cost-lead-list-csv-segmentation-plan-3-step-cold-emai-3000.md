# Outbound Pipeline Kit (Zero-Cost): Lead List CSV + Segmentation Plan + 3-Step Cold Email + Daily Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T22:07:40.957Z

---

## 1) Lead List CSV (copy/paste headers)
Use Google Sheets first, then export CSV.

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy_last10,owner_or_manager_name,role_guess,email_1,email_2,segment,priority,personalization_snippet,notes

### How to fill key fields (manual, zero-cost)
- google_rating / review_count: from Google Business Profile panel.
- last_review_date: open “Reviews” → sort by newest → record the most recent date.
- response_rate_proxy_last10: open newest ~10 reviews and count owner replies (0–10). Compute: replies/10. Example: 2 replies → 0.2.
- personalization_snippet: copy 1–2 short sentences from the newest review OR paraphrase (preferred) if sensitive.
- owner_or_manager_name + emails: use website contact page + about/team page. If none: use generic (info@, hello@, office@, support@) from site. Optionally check Facebook page listed on website.

### Segment rules (apply in Sheet)
- not_responding: response_rate_proxy_last10 <= 0.2 OR 0 owner replies in last 10.
- low_rating: google_rating < 4.2.
- high_volume: review_count >= 200 OR last_review_date within 14 days.

### Priority scoring
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: (not_responding) OR (low_rating)
- Priority C: high_volume only

## 2) Prospecting plan (Top 25 US metros)
### Vertical 1: Dentists
Search queries per metro:
- “dentist in {metro}”
- “cosmetic dentist in {metro}”
- “family dentistry in {metro}”

### Vertical 2: Med Spas / Aesthetic clinics
Queries:
- “med spa in {metro}”
- “aesthetic clinic in {metro}”
- “botox in {metro}”

### Vertical 3: HVAC / Plumbers (home services)
Queries:
- “hvac company in {metro}”
- “air conditioning repair in {metro}”
- “plumber in {metro}”

### Pull order (fastest revenue signal)
1) Priority A businesses first (high volume + not responding / low rating).
2) Priority B next.
3) Priority C last (only if needing volume).

## 3) Cold email (3-step sequence) — includes legitimacy links
Send from: agent_bob_replit+review-bot@agentmail.to
Website for trust: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### Personalization tokens
- {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap}}, {{vertical_phrase}}
Examples:
- {{vertical_phrase}} = “dental practice” / “med spa” / “HVAC company”
- {{response_gap}} = “I didn’t see owner responses on the last ~10 reviews”

### Email 1 (Initial)
Subject options:
- “Quick idea for {{business_name}}’s Google reviews”
- “Re: responding to new reviews in {{city}}”
- “{{business_name}} — review replies (12-hour turnaround)”

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}} and noticed: “{{recent_review_snippet}}”.

{{response_gap}} — and that’s usually leaving easy wins on the table (more trust + better conversion from Maps).

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google + Yelp, escalates negative reviews, and sends a weekly KPI summary. You approve replies (or we can do an approval-first workflow).

For week 1 we can do this free: respond to new reviews within 12 hours + clean up any missed replies.

Open to a 10-minute call this week to see if it’s a fit?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Email 2 (Follow-up #1, 2–3 days later)
Subject: “Re: {{business_name}} reviews”

Hi {{first_name}},

Quick follow-up — if I draft 3 example replies for {{business_name}} based on the most recent reviews (so you can see tone/quality), would you want to review them?

If yes, tell me which voice you prefer:
1) warm + short, 2) professional + detailed, 3) premium/concierge.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Email 3 (Follow-up #2, 5–7 days later)
Subject: “Should I close this loop?”

Hi {{first_name}},

Should I close the loop on this?

If review replies aren’t a focus right now, no worries. If you want, I can still send a quick ‘reputation snapshot’ (rating, review velocity, response rate estimate, and 3 suggested reply templates) for {{business_name}}.

Reply with “snapshot” and I’ll send it over.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 4) Segment-specific angle mapping (use same sequence, swap 2 lines)
- not_responding: emphasize “response gap → trust + conversion”, offer “we respond within 12 hours”.
- low_rating: emphasize “escalate negatives + prevent future 1–3 star issues”, offer “negative review escalation + owner alert”.
- high_volume: emphasize “ops throughput + consistency”, offer “SLA + weekly KPI report”.

## 5) Daily sending ops (zero-cost)
### Day-by-day ramp (single inbox)
- Days 1–2: 25/day
- Days 3–4: 35/day
- Days 5–6: 50/day
- Days 7–10: 75/day
- Days 11–14: 100/day (only if bounce rate < 3% and replies are handled same-day)

### Daily checklist (45–75 minutes)
1) Add 25–100 new prospects to CRM and verify email from website.
2) Personalize 1 line (review snippet + response gap).
3) Send Email 1 to new prospects.
4) Send Email 2 to prospects at day 3.
5) Send Email 3 to prospects at day 7.
6) Reply handling SLA: respond within 4 business hours; offer a 10-min call.
7) Log outcomes (Qualified, Not now, Wrong contact, Bounce).

### Quality & compliance guardrails
- Don’t mention private info; keep review snippet short; paraphrase if sensitive.
- If asked to stop, mark “Do Not Contact”.
- If bounce rate > 5% in a day, pause sending and fix list quality.

## 6) CRM stages (Google Sheet tabs or columns)
Stages with entry/exit criteria:
1) Prospect (data captured)
2) Queued (ready to send)
3) Sent – Email 1
4) Sent – Follow-up 1
5) Sent – Follow-up 2
6) Replied
7) Qualified (pain confirmed; right contact)
8) Call Booked
9) Trial (Week 1 free)
10) Won (paid later)
11) Lost (no fit / no response)

KPIs to track weekly:
- Sent, Delivered (approx), Reply rate, Positive reply rate, Calls booked, Trials started.
- Segment performance: Priority A vs B vs C reply rates.

## 7) Agency/reseller lane (optional, 50–100 leads)
Search queries:
- “dental marketing agency {metro}”, “med spa marketing agency {metro}”, “HVAC marketing agency {metro}”, “reputation management agency {metro}”.
Who to email: founder, head of client success, account manager.
Angle: “white-label review response ops; you keep margin; weekly KPI report for your clients.”

This kit is designed so you can start building leads manually today (Top 25 metros) and begin sending immediately from the AgentMail inbox while staying on a $0 budget.