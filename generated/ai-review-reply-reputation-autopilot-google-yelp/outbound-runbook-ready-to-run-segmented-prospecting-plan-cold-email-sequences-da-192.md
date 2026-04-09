# Outbound Runbook (Ready-to-Run): Segmented Prospecting Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T04:12:33.729Z

---

Business proof URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

1) ICP + VERTICALS (start with 3)
A) Dentists (high LTV, frequent reviews, reputation-sensitive)
B) Med spas/aesthetic clinics (high ticket, heavy review influence, frequent negatives)
C) HVAC/Plumbing (local intent + high competition + review volume)

2) SEGMENTS + PRIORITY RULES (apply per prospect)
Collect: google_rating, review_count, last_review_date, response_rate_proxy (owner responses in last 10 reviews).
Segments:
- NOT_RESPONDING: response_rate_proxy ≤ 20% OR 0 responses in last 10 reviews.
- LOW_RATING: rating < 4.2.
- HIGH_VOLUME: review_count ≥ 200 OR last_review_date ≤ 14 days.
Priority:
- Priority A: (NOT_RESPONDING AND HIGH_VOLUME) OR (LOW_RATING AND HIGH_VOLUME)
- Priority B: NOT_RESPONDING OR LOW_RATING
- Priority C: HIGH_VOLUME only
Routing:
- NOT_RESPONDING → “response gap / missed revenue” angle
- LOW_RATING → “negative review escalation + brand-safe replies” angle
- HIGH_VOLUME → “throughput + 12-hour SLA + weekly KPI report” angle

3) OFFER (keep consistent across verticals)
Core offer line: “We draft (and optionally post) brand-safe replies to every Google/Yelp review within 12 hours, escalate negatives immediately, and send a weekly KPI report. You can approve replies before they go live.”
Low-friction CTA options:
- “Want me to mock up replies to your last 3 reviews so you can see the tone?”
- “Open to a 10-minute call this week?”
- “Reply ‘yes’ and I’ll send the 3-reply mockup.”
Proof/legitimacy (include in footer or P.S.): “Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

4) COLD EMAIL SEQUENCES (3-step) — LOCAL BUSINESSES
Personalization tokens:
{{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap_observation}}, {{rating}}, {{review_count}}

4.1 DENTAL — Initial (NOT_RESPONDING / HIGH_VOLUME)
Subject: Quick idea for {{business_name}} reviews
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews in {{city}}.

Noticed {{response_gap_observation}} (it looks like a lot of recent patients don’t get a reply). That usually leaves revenue on the table because people read the responses as much as the rating.

We run an AI Review Reply & Reputation Autopilot: brand-safe draft replies for every Google/Yelp review within 12 hours, negative reviews escalated fast, and a weekly KPI email. You can approve replies before anything posts.

Want me to mock up replies to your last 3 reviews (including “{{recent_review_snippet}}”) so you can see the tone?

— {{your_name}}
P.S. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

4.2 DENTAL — Follow-up 1
Subject: Re: {{business_name}} review replies
Hi {{first_name}} — quick follow-up.

If I send 3 sample replies for your latest reviews, do you prefer:
A) Conservative/clinical tone
B) Warm/family tone
C) “short + professional”

Reply A/B/C and I’ll draft them.
— {{your_name}}
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

4.3 DENTAL — Follow-up 2 (breakup)
Subject: close the loop
{{first_name}} — should I close the loop, or is review replies something you want to improve this month?

If helpful, I can also include a weekly report: new reviews, response time, negative-review alerts, and rating trend.
— {{your_name}}
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

4.4 MED SPA — Initial (LOW_RATING)
Subject: 1 fix for your next negative review
Hi {{first_name}} — saw {{business_name}}’s reviews and noticed a couple of tougher ones recently (e.g., “{{recent_review_snippet}}”).

Most clinics lose prospects when negatives sit without a calm, policy-safe response. We set up a Reputation Autopilot: brand-safe reply drafts within 12 hours, immediate escalation for negatives, and weekly KPIs. You approve before posting.

Open to a 10-minute call? Or I can draft responses to your last 2 negative reviews so you can see how we handle tone + compliance.
— {{your_name}}
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

4.5 HOME SERVICES (HVAC/PLUMBING) — Initial (HIGH_VOLUME)
Subject: Faster review replies for {{business_name}}
Hi {{first_name}} — quick note from looking at {{business_name}}’s Google reviews.

You’re getting steady volume ({{review_count}} total), but when reviews stack up it’s hard to reply consistently. We handle that: draft/post brand-safe replies within 12 hours, escalate negatives, and send weekly KPIs so you can see response rate + trends.

Want a free sample? I’ll draft replies to your 3 most recent reviews (including “{{recent_review_snippet}}”).
— {{your_name}}
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

5) AGENCY / RESELLER LANE (initial email)
Subject: Add “review response autopilot” to your retainers
Hi {{first_name}} — do you work with {{vertical}} clients who get frequent Google reviews?

We provide a white-label-ish fulfillment layer: brand-safe responses within 12 hours for Google/Yelp, negative-review escalation, and weekly KPI reporting. Agencies resell it as an add-on to SEO/PPC or reputation management.

If you tell me your client niches (dentist/med spa/home services), I’ll send pricing + a sample weekly report.
— {{your_name}}
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

6) DAILY SENDING OPS (14-day ramp)
Day 1–3: 15–25 new sends/day/inbox. Plain text only. No links except the website URL in P.S. Monitor bounces.
Day 4–7: 30–50/day/inbox. Start follow-up #1 to Day 1 prospects.
Day 8–14: 50–100/day/inbox (only if bounce <3%, spam complaints ~0). Start follow-up #2.
Rules:
- Stop sending if bounce rate >5% in a day; review list quality.
- Remove role-based emails (info@, support@) unless no alternative.
- Reply SLA: within 10 minutes during business hours; within 2 hours otherwise.
- Track: sent, delivered, reply rate, positive reply rate, meetings booked.

7) CRM STAGES (simple pipeline)
Prospect (new lead) → Sent (email #1) → Follow-up 1 sent → Follow-up 2 sent → Replied → Qualified (has Google/Yelp + pain) → Demo Booked → Trial/Pilot → Paid → Lost
Entry/Exit criteria:
- Qualified = confirms they manage/own listings + agrees response speed or negative escalation is a problem.
- Lost = explicit no, wrong contact, or 3 touches + no engagement.

8) WHAT THE OWNER MUST DECIDE NEXT
- Geography for lead pull: Top 25 US metros vs 5–10 states vs US-wide.
- Lead sourcing: $0 manual workflow vs paid scraper (Outscraper/Apify) vs vendor.
Once decided, produce 500–1,000 leads and start daily sends using Priority A first.