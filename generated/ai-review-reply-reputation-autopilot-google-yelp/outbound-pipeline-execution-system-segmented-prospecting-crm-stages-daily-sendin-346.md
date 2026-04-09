# Outbound Pipeline Execution System (Segmented Prospecting + CRM Stages + Daily Sending Ops) — AI Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:16:25.027Z

---

Business / legitimacy references to use in outreach:
- Public site (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
- Reply/contact inbox: agent_bob_replit+review-bot@agentmail.to

1) ICP + Verticals (first 30 days)
Focus verticals (high review velocity + high LTV + clear ROI from ratings):
A) Dentists / dental groups
B) Med spas / aesthetic clinics
C) HVAC + plumbing (home services)
Parallel lane (bigger tickets): local marketing agencies that manage multiple SMBs (dental/med spa/home services).

2) Segmentation rules (operational + simple)
Capture from Google Business Profile (GBP) / Yelp pages:
- google_rating
- review_count
- last_review_date
- response_rate_proxy = % of last 10 reviews that have an owner/manager response (count responses in the review feed)

Segments (can overlap; pick primary segment in this order):
- Not Responding: response_rate_proxy ≤ 20% OR 0 replies in last 10 reviews
- Low Rating: rating < 4.2
- High Volume: review_count ≥ 200 OR last_review_date within 14 days

Priority scoring (for send order):
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: Not Responding OR Low Rating (but not Priority A)
- Priority C: High Volume only

Template routing:
- Not Responding → “response gap” angle (speed + consistency + brand safety)
- Low Rating → “recovery + escalation” angle (negative review triage + prevent spirals)
- High Volume → “ops throughput” angle (keep up with volume, weekly KPI reporting)

3) Lead list build sprint (zero-cost) to reach 500–1,000
Goal: 100–150 leads/day for 5–7 days (1 VA or owner).
Data sources: Google Maps/GBP, Yelp, business websites (Contact/About), LinkedIn (owner/office manager), free enrichment.

Daily workflow (repeatable):
1) Pull 30–50 prospects per vertical from Google Maps using geo + category queries.
   Example query pattern: “{city} dentist”, “{city} med spa”, “{city} hvac”, “{city} plumber”.
2) Open GBP, record: rating, review count, last review date, and response_rate_proxy (scan last ~10 reviews).
3) Copy a safe personalization snippet:
   - Preferred: paraphrase the theme (e.g., “a recent patient mentioned wait time and front desk communication”).
   - If quoting: keep it short and neutral; do not include sensitive health info.
4) Visit website → capture best email(s) from Contact page:
   - Priority email patterns: info@, office@, hello@, appointments@, admin@, manager@.
   - Also capture name/role if available (“Office Manager”, “Practice Manager”).
5) If no email: use LinkedIn to identify owner/manager name (still valuable for future enrichment).
6) Apply segment + priority.

Minimum viable columns for CSV:
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy
- segment_primary
- priority (A/B/C)
- owner_or_manager_name
- role_guess
- email_1
- email_2
- personalization_snippet
- notes

4) CRM pipeline (stages + rules)
Use a free tool (Google Sheets, HubSpot Free, Airtable Free). Stages and entry/exit criteria:
1. Prospect (not contacted)
   - Required: email_1 OR phone OR LinkedIn URL, plus segment + priority
2. Sent – Step 1
   - Exit to “Replied” if any reply
   - Exit to “Bounced” if hard bounce
3. Sent – Follow-up 1
4. Sent – Follow-up 2
5. Replied
   - Tag reply type: Interested / Not now / Unsubscribe / Wrong person / Objection
6. Qualified
   - Criteria: confirms they manage reviews OR wants help OR asks for pricing/demo
7. Demo Booked
8. Trial / Pilot
9. Paid
10. Lost
   - Reason codes: happy with current, no time, price, already using tool, wrong contact

Required CRM fields:
- last_touch_date, next_touch_date
- template_variant_used (NR/LR/HV + vertical)
- objection_tag
- meeting_link / notes

5) Daily sending ops (14-day ramp + targets)
Assumes 1 inbox to start; scale by adding inboxes later (no paid spend assumed in this SOP).

Ramp schedule (per inbox; adjust if deliverability issues):
- Days 1–2: 20/day (80% plain text, no links except in follow-ups if needed)
- Days 3–4: 30/day
- Days 5–7: 40/day
- Week 2: 50–70/day depending on bounce and spam complaints

Daily activity targets (owner/operator):
- New prospects added: 50/day (until 500–1,000 list built)
- Emails sent: 30–70/day (per ramp)
- Follow-ups queued: 1–2 follow-ups per sent email based on schedule
- Manual personalization: 1 line per email using personalization_snippet + response gap
- Reply SLA: respond within 2–4 business hours

Follow-up timing:
- Step 1 (Day 0)
- Follow-up 1 (Day 3)
- Follow-up 2 (Day 7)
Stop rules:
- Stop on reply, unsubscribe, or 2+ bounces from same domain pattern.

List hygiene + safety thresholds:
- Hard bounce rate: keep < 3% (pause and fix list if higher)
- Spam complaint: any complaint → immediately remove and review copy
- Unsubscribe: always honor within 24 hours

6) Signature + trust elements (include in emails)
Use a simple signature that makes it easy to verify legitimacy:
- Bob Smith
- AI Review Reply & Reputation Autopilot
- agent_bob_replit+review-bot@agentmail.to
- https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1

7) Segment-specific offer framing (what you promise)
- “We draft brand-safe replies to every Google/Yelp review within 12 hours. You can approve before anything posts.”
- “Negative reviews get escalated with a recommended resolution + response that protects your brand.”
- “Weekly KPI email: rating trend, response rate, negative-review themes, and backlog.”

8) Weekly KPI targets (outbound + product proof)
Outbound:
- 1,000 prospects contacted / month (across 1–3 inboxes)
- Reply rate: 3–8% baseline; aim 10% with strong personalization
- Meetings booked: 1–3% of sent
Product proof for prospects (talk track):
- Response time reduced to < 12 hours
- Response rate increased to > 80%
- Negative-review escalation within 1 business hour

This system is ready to run as soon as geography is selected and the first 200 leads are collected; then the exact same workflow scales to 500–1,000 with consistent segmentation and daily ops.