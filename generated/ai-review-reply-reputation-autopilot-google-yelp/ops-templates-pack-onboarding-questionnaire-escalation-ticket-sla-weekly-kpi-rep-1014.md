# Ops Templates Pack — Onboarding Questionnaire + Escalation Ticket/SLA + Weekly KPI Report (Email + Sheet Layout)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:19:00.368Z

---

Below are paste-ready templates that let us fulfill the DFY Review Reply Autopilot + Weekly KPI Report and the White-label Agency plan in week 1 without any engineering or paid tools. Use the public legitimacy URL in customer comms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Primary inbox for all onboarding and review escalations: agent_bob_replit+review-bot@agentmail.to

============================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (copy/paste into email or form)
Subject: Quick setup for Review Reply Autopilot (10 minutes)

Hi {{FirstName}},

To start drafting brand-safe replies to your Google/Yelp reviews, please answer the questions below. Once received, we’ll begin within 1 business day. (Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1)

A) Business details
1) Business name + primary location address:
2) Website + phone number:
3) Hours of operation:
4) Primary services (top 5) + any specialties:
5) Any regulated claims we must avoid? (medical/legal/financial etc.)

B) Review sources & access (Week-1 deliverable options)
6) Google Business Profile link (GBP):
7) Do you have GBP Manager access you can grant? (Recommended)  Yes / No
   If yes: send invite to agent_bob_replit+review-bot@agentmail.to
   If no: we can draft replies and you post; confirm who will post.
8) Yelp Business link:
9) Do you have Yelp Business Owner access you can grant?  Yes / No
   Default workflow if “No”: we draft replies, you post (copy/paste).

C) Brand voice & response rules
10) Brand voice: (choose 1) Friendly & casual / Warm & professional / Premium & formal / Other:
11) “Must-use” phrases (if any):
12) “Never use” phrases (banned words, offers, competitor mentions):
13) Can we invite customers back / offer a callback in replies? Yes / No
14) Approved contact method for unhappy customers: phone/email?
15) Signature format to use in replies (e.g., “– The {{BusinessName}} Team”):

D) Approval settings (defaults shown)
16) Default auto-approve rules (recommended):
   • 4–5★: auto-post unless flagged keywords appear
   • 1–3★: requires your approval before posting
   Confirm: Yes / No (if no, specify)
17) Sensitive/flag keywords that ALWAYS require approval (e.g., “refund”, “lawsuit”, “injury”, “discrimination”, “HIPAA”, etc.):

E) Escalation contacts (for negative reviews)
18) Primary escalation contact name + role:
19) Best phone + email:
20) Backup contact:
21) Hours we can contact you for urgent issues:

F) Weekly report
22) Where should weekly KPI reports be sent? (emails)
23) Preferred report day/time:

Reply to this email or send answers to agent_bob_replit+review-bot@agentmail.to.

============================
TEMPLATE 2 — ESCALATION TICKET + SLA POLICY (internal + client-facing)
Use this as a form entry (copy/paste) whenever a 1–3★ review comes in, or whenever a review contains sensitive keywords.

ESCALATION TICKET
Ticket ID: {{YYYYMMDD-###}}
Client: {{BusinessName}}
Location: {{City}} / {{LocationID}}
Platform: Google / Yelp
Review date/time: {{timestamp}}
Star rating: {{1-5}}
Reviewer name: {{name}}
Review URL: {{url}}
Review text (verbatim):
---
{{review_text}}
---
Risk flags (check all):
[ ] Legal threat / lawsuit
[ ] Medical safety / injury
[ ] Discrimination / harassment
[ ] Payment dispute / chargeback
[ ] Profanity / hate speech
[ ] HIPAA/PII risk (mentions private details)
[ ] Other:

Recommended response approach (draft notes):
- Empathize + acknowledge
- Move offline to {{phone/email}}
- Avoid admissions of fault; avoid policy violations
- Offer next step: {{callback / manager review / appointment follow-up}}

Client action required (choose one):
A) Approve draft reply as-is
B) Request edits (notes below)
C) Do not respond publicly (we will log as “no public reply”)
D) Escalate to legal/PR (client-owned)

Client notes:
{{notes}}

SLA POLICY (include in onboarding + contract)
• Monitoring cadence: Daily business days (or 7 days/week if Pro tier).
• Draft SLA: drafts produced within 24 business hours of new review detection (12 hours on Pro).
• Posting SLA:
  - 4–5★: post within SLA window under auto-approve rules.
  - 1–3★ or flagged keywords: posting occurs only after client approval; we send escalation within 4 business hours of detection.
• Yelp default workflow (Week 1): We draft responses; client posts via Yelp owner account unless access is granted.
• Exclusions: We do not remove reviews, do not incentivize reviews, do not “gate” review requests, and do not dispute reviews without written client authorization.

============================
TEMPLATE 3 — WEEKLY KPI REPORT (email + spreadsheet layout)

A) Weekly report email (send every {{Day}})
Subject: Weekly Reputation KPI Report — {{BusinessName}} ({{WeekStart}}–{{WeekEnd}})

Hi {{FirstName}},

Here’s your weekly reputation snapshot for {{BusinessName}}. (Service info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1)

1) Review volume
• New reviews this week: Google {{#}} | Yelp {{#}} | Total {{#}}
• 4–5★: {{#}} | 1–3★: {{#}}

2) Ratings trend
• Current avg rating: Google {{x.x}} | Yelp {{x.x}}
• Change vs last week: Google {{+/-}} | Yelp {{+/-}}

3) Responsiveness
• Response rate (last 7 days): {{%}}
• Median response time: {{hh:mm}}
• SLA compliance: {{%}} (target {{24h/12h}})

4) Escalations (negative reviews)
• Escalations opened: {{#}}
• Resolved (customer contacted + outcome logged): {{#}}
• Still pending: {{#}} (see notes)

5) Top themes this week (from reviews)
• Theme 1: {{theme}} ({{#}} mentions)
• Theme 2: {{theme}} ({{#}} mentions)
• Theme 3: {{theme}} ({{#}} mentions)

6) Recommendations (1–3 actions)
• {{Action 1}}
• {{Action 2}}
• {{Action 3}}

If you’d like, we can add: (a) Review-request SMS, (b) Competitor benchmark, or (c) a Negative-Review Playbook. Reply to this email and we’ll set it up.

— Bob
agent_bob_replit+review-bot@agentmail.to

B) Spreadsheet layout (Google Sheet tabs)
TAB 1: Weekly Summary (one row per week)
Columns:
Week Start | Week End | Google New Reviews | Yelp New Reviews | Total New Reviews | Google Avg Rating | Yelp Avg Rating | Total 1–3★ | Total 4–5★ | Response Rate % | Median Response Time (hrs) | Drafts Created | Replies Posted | Escalations Opened | Escalations Resolved | Notes

TAB 2: Review Log (one row per review)
Date | Platform | Location | Rating | Reviewer | Review Text | Draft Link/ID | Posted? (Y/N) | Posted Date | Auto-approved? (Y/N) | Flagged Keyword? | Escalated? (Y/N) | Outcome | Owner Notes

TAB 3: Pipeline KPI Dashboard (30-day sales execution)
Date | Leads Sent | Replies | Calls Booked | Calls Held (Shows) | New Clients Closed | Cash Collected | MRR Added | Notes

Minimum daily targets to hit the recommended $12k mix (6 DFY + 2 agency in 30 days):
• Leads/day: 40–45
• Replies/day: 6–8 (assumes ~15% reply)
• Calls booked/day: 2–3 (assumes ~35% of replies)
• Shows/day: 1–2 (assumes ~70% show)
• Closes/week: 2 (assumes ~25% close on shows; adjust if inbound increases)

Discount guardrail (to protect $12k cash-in-month):
• Setup fee waivable only if (a) client prepays 2 months upfront OR (b) 2+ locations at signup. Otherwise keep setup fee.

Default access policy (Week 1 deliverability):
• Google: request GBP Manager access (preferred); fallback to client-post.
• Yelp: default to client-post unless Yelp owner access is granted.

End of templates pack.