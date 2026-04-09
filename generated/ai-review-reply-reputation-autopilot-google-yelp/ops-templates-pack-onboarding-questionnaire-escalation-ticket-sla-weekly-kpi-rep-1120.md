# Ops Templates Pack — Onboarding Questionnaire + Escalation Ticket/SLA + Weekly KPI Report (Copy/Paste Ready)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:09:46.599Z

---

Below are 3 paste-ready templates to run DFY Review Reply Autopilot + Weekly KPI reporting immediately (no API dependency required). Use with customers by linking legitimacy via https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1 and support email agent_bob_replit+review-bot@agentmail.to.

========================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (send after payment)
Subject: Quick onboarding (10 minutes) — Review Reply Autopilot

Hi {{FirstName}},

To start your Review Reply & Reputation Autopilot, please reply to this email with the answers below (or paste into a doc). If easier, you can also send voice notes.

A) Business + locations
1) Business name as shown on Google:
2) Address(es) / location count:
3) Google Business Profile link(s):
4) Yelp page link(s):

B) Access / posting method (choose one)
5) Google: Can you add us as a Manager on Google Business Profile? (Yes/No)
   If yes: please invite agent_bob_replit+review-bot@agentmail.to
   If no: we’ll draft responses and send them for copy/paste posting.
6) Yelp: Do you have Yelp Business Owner access? (Yes/No)
   If yes: add us (or we’ll use an approved workflow). If no: we’ll use client-post workflow.

C) Brand voice + policy guardrails
7) Voice style (pick up to 2): Warm/Friendly, Professional, Luxury, Straight-to-the-point, Playful.
8) Words/phrases to avoid (e.g., “cheap”, “guarantee”, competitor names):
9) Required phrases or compliance language (if any):
10) Are there topics we must never mention publicly? (prices, medical outcomes, legal claims, refunds, etc.)

D) Escalation rules (negative reviews)
11) Main escalation contact name + mobile + email:
12) Secondary escalation contact:
13) What counts as “urgent” for you? (examples: safety issue, discrimination claim, fraud, HIPAA/medical, legal threat)
14) Resolution options you are willing to offer (choose): call-back, redo service, refund review, store credit, manager contact, none.

E) Review operations
15) Hours you want us to respond within for new reviews: 12h / 24h / 48h
16) Any promos/offers we should mention? (We recommend NOT mentioning discounts publicly unless you insist.)
17) Preferred phone number + booking link to include in escalations (not in public replies unless you want):

F) Weekly reporting
18) Who should receive the weekly KPI report (emails):
19) What matters most: rating increase, response time, reducing 1★ volume, more review volume, competitor position.

Once we have this, we’ll begin within 1 business day.

— Bob
Review Reply & Reputation Autopilot
Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

========================================
TEMPLATE 2 — ESCALATION TICKET + SLA RULES (internal + client-facing)

Use this when a review is 1–3★, contains legal/medical/safety keywords, alleges fraud/discrimination, or includes personally identifying/regulated info.

ESCALATION TICKET
Ticket ID: {{YYYYMMDD-Client-###}}
Client / Location: {{Client}} / {{Location}}
Platform: Google / Yelp
Review URL: {{URL}}
Star rating: {{1-5}}
Date/time received: {{Timestamp}}
Reviewer name (as shown): {{Name}}
Review text (paste exact):
{{Text}}

Classification (check all that apply):
[ ] Service complaint (non-urgent)
[ ] Refund/charge dispute
[ ] Staff conduct allegation
[ ] Safety issue
[ ] Discrimination/harassment allegation
[ ] Medical/legal/regulatory topic
[ ] Threat of lawsuit / police / regulator
[ ] Fake review suspected
[ ] Contains personal data (phone, email, address, patient info)

Recommended action path:
1) Public reply strategy:
   - Acknowledge + apologize (without admitting liability)
   - Move offline: “Please contact {{Phone/Email}} so we can make it right.”
   - Avoid specifics: do not confirm service details if sensitive.
2) Offline resolution steps:
   - Call within {{SLA}} hours
   - Offer: {{approved options}}
   - Document outcome

Draft public reply (for approval):
{{Draft}}

APPROVAL REQUIRED FROM CLIENT?
[ ] Yes (default for 1–3★)
[ ] Yes (keyword flagged)
[ ] No (rare; only if client pre-approves a standard template)

SLA RULES (promise to client; enforce internally)
- 4–5★ reviews: respond within 24h (or 12h for Pro). Auto-approve unless red flags.
- 1–3★ reviews: draft within 12h; client approval requested immediately; post within 2h after approval.
- “Urgent” categories (safety/legal/regulatory/discrimination): notify escalation contact within 1h during business hours; do not post until approved.
- Yelp client-post fallback: send approved reply in a single copy/paste block + link to the review.

Client notification email (copy/paste)
Subject: Action needed — new {{rating}}★ review escalation

Hi {{FirstName}},

A new {{rating}}★ review came in on {{platform}} for {{location}} and needs approval before we post. Here’s the review: {{review_url}}

Recommended public reply (copy/paste):
“{{draft_reply}}”

Please reply with: APPROVE / EDITS (paste edits) / HOLD.
If you want us to call the reviewer (if contactable), confirm the best callback number and who should call.

— Bob
agent_bob_replit+review-bot@agentmail.to
Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

========================================
TEMPLATE 3 — WEEKLY KPI REPORT (email + sheet layout)

WEEKLY KPI REPORT EMAIL (send weekly, same weekday)
Subject: Weekly Reputation KPI Report — {{Client}} ({{WeekStart}}–{{WeekEnd}})

Hi {{FirstName}},

Here’s your weekly reputation snapshot for {{WeekStart}}–{{WeekEnd}}.

1) Review volume
- New Google reviews: {{#}}
- New Yelp reviews: {{#}}
- Total new reviews: {{#}}

2) Ratings
- Google average rating (start→end): {{x.x}} → {{x.x}} (Δ {{+/-}})
- Yelp average rating (start→end): {{x.x}} → {{x.x}} (Δ {{+/-}})

3) Responsiveness
- Response rate (Google): {{%}}  | Target: {{target%}}
- Response rate (Yelp): {{%}}   | Target: {{target%}}
- Median time-to-response: {{hh:mm}} | SLA: {{SLA}}

4) Negatives + escalations
- 1–3★ reviews this week: {{#}}
- Escalations opened: {{#}}
- Escalations resolved/closed: {{#}}
- Open escalations (need action): {{#}} — see notes below

5) Themes we’re seeing (top 3)
- {{Theme1}} ({{count}} mentions)
- {{Theme2}} ({{count}} mentions)
- {{Theme3}} ({{count}} mentions)

6) Recommended next actions (1–3)
- {{Action1}}
- {{Action2}}
- {{Action3}}

Notes / links
- Google profile: {{GBP link}}
- Yelp profile: {{Yelp link}}
- If you’d like, we can add competitor benchmarking and a “negative review prevention” playbook.

— Bob
Review Reply & Reputation Autopilot
Support: agent_bob_replit+review-bot@agentmail.to
Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

SHEET LAYOUT (tabs + columns)
Tab 1: Weekly Summary
Columns:
A Week Start | B Week End | C New Reviews (G) | D New Reviews (Y) | E Total New | F Avg Rating G Start | G Avg Rating G End | H Avg Rating Y Start | I Avg Rating Y End | J Response Rate G | K Response Rate Y | L Median Response Time (hrs) | M 1–3★ Count | N Escalations Opened | O Escalations Closed | P Open Escalations | Q Top Theme 1 | R Top Theme 2 | S Top Theme 3 | T Notes

Tab 2: Review Log
A Date | B Platform | C Location | D Reviewer | E Stars | F Review URL | G Review Text | H Drafted On | I Posted On | J Response SLA Met (Y/N) | K Escalated (Y/N) | L Escalation Ticket ID | M Status (Open/Closed) | N Resolution Notes

Tab 3: Pipeline (optional, internal)
A Client | B Plan | C Setup Paid (Y/N) | D MRR | E Start Date | F Access Status (GBP/Yelp) | G Risk Flag | H Notes

These three templates are sufficient to sell, onboard, and deliver the service in week 1 with a human-in-the-loop workflow and without any paid tools or API access.