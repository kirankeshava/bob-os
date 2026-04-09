# Outbound Pipeline Kit (Ready-to-Run) — Segmented Prospecting Plan + 3-Step Cold Email Sequences + Daily Ops/CRM (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T03:55:32.282Z

---

Website (legitimacy link to include in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

IMPORTANT SETUP INPUTS (owner fills once)
- Sender email address: {{sender_email}} (example: hello@yourdomain.com)
- Sender name: {{sender_name}}
- Calendar link (optional): {{calendar_link}}

====================
1) SEGMENTED PROSPECTING PLAN
====================
Target verticals (start with 2 if bandwidth is limited; keep 3 for scale):
A) Dentists / dental practices (high LTV, steady review flow)
B) Med spas / aesthetics / cosmetic clinics (high LTV, reputation sensitive)
C) HVAC + plumbers (high lead velocity; reviews directly impact calls)
Parallel lane: Agencies that manage marketing for these verticals (reseller model).

Segments (use Google rating + review volume + response-rate proxy):
- NOT RESPONDING: business has few/no owner replies in last ~10 reviews OR response-rate proxy <= 20%.
- LOW RATING: Google rating < 4.2.
- HIGH VOLUME: review_count >= 200 OR last_review_date within 14 days.

Priority scoring (routing to offers and copy):
- Priority A: (NOT RESPONDING AND HIGH VOLUME) OR (LOW RATING AND HIGH VOLUME). These are bleeding opportunities; fastest ROI.
- Priority B: NOT RESPONDING OR LOW RATING (but not high volume).
- Priority C: HIGH VOLUME only (they respond sometimes; pitch speed + consistency).

Offer positioning by segment:
- Not responding: “We respond within 12 hours, brand-safe, and you approve.” Emphasize responsiveness + trust.
- Low rating: “We triage negatives, escalate internally, and prevent one-star pile-ons.” Emphasize recovery + calm handling.
- High volume: “We handle throughput + weekly KPI report so nothing slips.” Emphasize operations.

Daily activity targets (starter):
- New sends: 30/day days 1–3; 50/day days 4–7; 75/day week 2; 100/day week 3+ if deliverability is stable.
- Follow-ups: match new sends once you’re at steady state (e.g., 50 new + 50 follow-ups/day).
- Replies SLA: reply within 1 business hour during business hours; within 12 hours otherwise.

====================
2) COLD EMAIL COPY — DIRECT TO LOCAL BUSINESSES (3-STEP)
====================
Personalization tokens to fill from Google reviews:
- {{biz_name}}, {{city}}, {{owner_name}} (if available)
- {{recent_review_snippet}} (quote or paraphrase, 6–15 words max)
- {{response_gap}} (e.g., “I didn’t see a response on your last few reviews.”)
- {{rating}}, {{review_count}}, {{last_review_date}}

Compliance note: If quoting reviews, keep it short and accurate; prefer paraphrase if unsure.

---
2A) UNIVERSAL EMAIL 1 (works for all verticals; choose a segment angle below)
Subject line options:
1) Quick question about {{biz_name}}’s Google reviews
2) Noticed something on your reviews
3) Review replies for {{biz_name}} (12-hour SLA)

Body:
Hi {{owner_name|there}} — I was looking at {{biz_name}} in {{city}} and noticed a recent review: “{{recent_review_snippet}}.”

{{response_gap}}

We built a simple “review reply autopilot” that drafts brand-safe responses for Google/Yelp, escalates negatives to you, and sends a weekly reputation KPI recap. The promise is straightforward: replies within 12 hours, and you can approve/edit before anything posts.

If I send 2–3 sample replies (based on your most recent reviews), would you want to see them?

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{sender_name}}
{{sender_email}}

---
2B) EMAIL 1 VARIANTS BY SEGMENT (swap the middle paragraph)

NOT RESPONDING angle (replace the middle paragraph above):
A lot of businesses lose easy revenue when great reviews sit without a reply (and unhappy ones go unanswered). We handle responses within 12 hours, keep them on-brand, and flag anything sensitive so you can approve before it posts.

LOW RATING angle:
When the rating is under ~4.2, one or two unaddressed negatives can disproportionately hurt calls/bookings. We triage negative reviews, draft calm professional responses, and escalate the issue internally so you can recover the relationship (and prevent follow-on negatives).

HIGH VOLUME angle:
When reviews come in frequently, it’s easy for replies to slip through the cracks. We handle the throughput, keep tone consistent, and send a weekly KPI email so you can see response time, rating trend, and unresolved negatives at a glance.

---
2C) EMAIL 2 (Follow-up #1)
Subject:
1) Want me to draft a couple replies?
2) Re: {{biz_name}} reviews

Body:
Hi {{owner_name|there}} — quick follow-up.

If you share (or confirm) which location page you watch most, I can draft 2–3 example replies for your latest reviews (including one negative if there is one). No obligation—just something you can copy/paste if it’s useful.

If it’s easier, reply with “yes” and I’ll send drafts today.

— {{sender_name}}
{{sender_email}}
Link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---
2D) EMAIL 3 (Follow-up #2 / breakup)
Subject:
1) Close the loop?
2) Should I stop reaching out?

Body:
Hi {{owner_name|there}} — should I close the loop?

Totally fine if review replies are already handled. If not, I can:
- draft/post brand-safe replies within 12 hours
- escalate negative reviews
- send a weekly KPI summary

Worth a 10-minute look this week, or should I stop emailing?

— {{sender_name}}
{{sender_email}}
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

====================
3) VERTICAL-SPECIFIC OPENERS (swap into Email 1 first line)
====================
Dentists:
“Hi {{owner_name|there}} — I was looking at {{biz_name}}’s Google reviews in {{city}} and saw: “{{recent_review_snippet}}.””

Med spas:
“Hi {{owner_name|there}} — I came across {{biz_name}}’s reviews and noticed someone mentioned “{{recent_review_snippet}}.””

HVAC/Plumbing:
“Hi {{owner_name|there}} — I found {{biz_name}} on Google and saw a recent customer said: “{{recent_review_snippet}}.””

====================
4) AGENCY / RESELLER EMAIL (3-STEP)
====================
Agency targets: small-to-mid marketing agencies managing dentists/med spas/home services; titles: Owner, Account Manager, Client Success, Reputation Manager.

Agency Email 1
Subject:
1) White-label review reply autopilot for your clients
2) Add-on offer for Google/Yelp reviews

Body:
Hi {{first_name}} — do you manage Google Business Profile / reputation for local clients (dentists, med spas, home services)?

We built a lightweight review response autopilot: brand-safe drafts for Google/Yelp, negative review escalation, and a weekly KPI email. It’s designed to be white-labeled (or co-branded) so you can add it as an add-on without adding headcount.

If I send you a 1-page overview + example weekly report, are you open to a quick chat?

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{sender_name}}
{{sender_email}}

Agency Follow-up #1
Subject: Re: white-label review replies
Body:
Bumping this—if you tell me your top client vertical, I’ll send sample responses + the KPI report template. If it’s not relevant, just reply “no” and I’ll close out.

— {{sender_name}} | {{sender_email}}

Agency Follow-up #2
Subject: Close the loop?
Body:
Should I close out, or is this worth 10 minutes? We can do white-label, approval workflows, and simple monthly per-location pricing.

— {{sender_name}} | {{sender_email}}

====================
5) OUTBOUND OPS CHECKLIST + CRM STAGES
====================
Daily pre-send (15 minutes):
- Random QA 10 prospects: correct vertical? not a national franchise? has active reviews? website present?
- Verify personalization snippet is short and non-sensitive.
- Remove obvious duplicates and spammy listings.

Sending rules:
- Start with Priority A only for first 3–5 days to maximize replies.
- Keep new sends under ramp caps (see below).
- Use plain text, no attachments, 1 link max (your legitimacy link).

14-day ramp (per inbox):
Days 1–2: 20/day
Days 3–4: 30/day
Days 5–7: 40/day
Days 8–10: 50/day
Days 11–14: 60/day
If bounce rate >3% or spam complaints >0.1%, pause increases and clean the list.

Reply handling SLA:
- Positive interest: reply within 1 hour; propose 2 times or share {{calendar_link}}.
- “Not now”: ask for the right month; set follow-up.
- Objection “we already respond”: ask if they want weekly KPI reporting + negative escalation + consistency.

CRM stages (minimal):
1) Prospect (in list, not contacted)
2) Sent (Email 1 sent)
3) Engaged (opened/clicked or replied)
4) Replied — Interested
5) Qualified (multi-location? review volume? decision-maker?)
6) Demo Booked
7) Trial / Pilot
8) Paid
9) Lost (reason)

Qualification fast checklist (in replies):
- Do you manage Google only, or Yelp too?
- How many locations?
- Who approves replies?
- Any compliance constraints (HIPAA, etc.)?

====================
6) NEXT STEP TO UNBLOCK EXECUTION
====================
Reply with:
(1) Geography choice for the first 500–1,000 leads: Top 25 US metros OR 5–10 states (name them) OR US-wide.
(2) Your exact sender email address and sender name to insert into templates.
Then you can start building leads using the schema and begin sending on Day 1 of the ramp.
