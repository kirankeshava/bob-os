# Ops Templates Pack (Week-1 Ready): Onboarding Intake + Escalation/SLA + Weekly KPI Report (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:34:57.965Z

---

Below are paste-ready templates to run fulfillment in week 1 for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). These templates assume zero engineering and no API dependency. Website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Primary ops email: agent_bob_replit+review-bot@agentmail.to

============================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (Copy/Paste into Google Form or Email)
Subject: Quick intake (10 minutes) — we’ll start replying within 24 hours

Hi {{ClientName}},
To start your free 7-day trial, please reply with the info below (or paste into a doc). If you get stuck, email agent_bob_replit+review-bot@agentmail.to.

A) Business details
1) Business name:
2) Website URL:
3) Primary location address (for GBP/Yelp matching):
4) Time zone:
5) Primary phone:

B) Review sources + access (Week-1 method)
Google Business Profile (GBP)
6) GBP listing link (or business name as it appears on Google):
7) Can you add us as a Manager on GBP? (Yes/No)
   - If yes: send invite to agent_bob_replit+review-bot@agentmail.to

Yelp
8) Yelp business page link:
9) Week-1 Yelp workflow (choose one):
   ( ) Client-post: we draft responses, you paste/post (default)
   ( ) Owner access: you add us to Yelp Business Owner account (if available)

C) Brand voice + boundaries (this prevents “off-brand” replies)
10) Choose tone (pick up to 2): Friendly / Professional / Warm / Direct / Premium / Playful
11) 3 words that should describe your brand voice:
12) Words/phrases we must NEVER use:
13) Do you want us to mention promotions, pricing, or guarantees? (Yes/No)
14) Any compliance constraints? (medical, legal, insurance, etc.) If yes, list required disclaimers.

D) Operating rules
15) Who should negative reviews be escalated to?
   Name + email + phone:
16) Business hours (for “please contact us” references):
17) Preferred contact method for escalations: Email / Text / Call
18) Approved “make-it-right” offers (optional): e.g., “Please call us and we’ll fix this” vs “We can offer a refund” (note: we won’t promise refunds unless you approve)

E) Approval policy
19) Auto-approve rules (recommended):
   - 4–5★: auto-post unless flagged keyword appears
   - 1–3★: require approval OR escalate depending on category
Choose one:
   ( ) Auto-post 4–5★; approval needed for 1–3★
   ( ) Approval needed for ALL replies

F) Competitors (optional, improves reporting)
20) Top 3 local competitors (names/links):

Once we have the above, we’ll begin drafting within 24 hours and send your first weekly KPI snapshot within 7 days.

============================
TEMPLATE 2 — ESCALATION TICKET + SLA (Internal + Client-Facing)
Title: Review Escalation Ticket — {{BusinessName}} — {{Platform}} — {{StarRating}}★

Trigger conditions (auto-escalate if any are true):
- 1–2★ review
- Mentions: lawsuit, fraud, discrimination, harassment, HIPAA/medical privacy, injury, police, chargeback, “reporting you”, “BBB”, “attorney”, “insurance”, “scam”
- Staff named explicitly + accusation
- Media threat (“I’m posting this on TikTok/news”)
- Any request for refund/compensation above ${{ClientSetThreshold}} (default: $100)

SLA commitments (Week 1):
- Draft response turnaround: within 24 hours of detection (12 hours for Pro tier)
- Escalation notification: within 4 business hours of detection
- If client-post workflow is used: draft delivered within SLA; posting depends on client

Ticket fields:
1) Detected at (date/time):
2) Platform: Google / Yelp
3) Review link:
4) Reviewer name/handle:
5) Star rating:
6) Review text (paste):
7) Category (choose one): Service quality / Billing / Wait time / Staff behavior / Product / Other
8) Risk level: Low / Medium / High
9) Recommended action (choose one):
   - A) Draft apology + take offline
   - B) Request details privately (no admission)
   - C) Dispute guidance (client-owned action)
   - D) No public reply recommended (rare)
10) Proposed public reply (draft):
11) Private follow-up script (optional):
12) Client decision needed by (deadline):
13) Client approver name:
14) Approval status: Pending / Approved / Revised / Declined
15) Posted? Yes/No
16) Resolution outcome notes (after 7 days):

Client-facing escalation email (copy/paste):
Subject: Action needed — new {{StarRating}}★ review on {{Platform}} for {{BusinessName}}

Hi {{ClientName}},
We detected a {{StarRating}}★ review that meets our escalation criteria. Here’s the link: {{ReviewLink}}

Recommended next step: {{RecommendedAction}}.
Draft public response (ready to post):
“{{DraftReply}}”

Please reply with APPROVE or REVISE (and any details you want included). If you prefer, tell us who should call the customer and we’ll tailor the message.

— Bob (Ops)
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

============================
TEMPLATE 3 — WEEKLY KPI REPORT (Email + Google Sheet Layout)

A) Weekly KPI Email (send every Monday)
Subject: Weekly Reputation KPIs — {{BusinessName}} — Week of {{DateRange}}

Hi {{ClientName}},
Here’s your weekly reputation snapshot for {{BusinessName}}.

1) Review volume
- New reviews (Google): {{G_NewReviews}}
- New reviews (Yelp): {{Y_NewReviews}}

2) Rating health
- Avg rating (Google): {{G_AvgRating}} (Δ {{G_Delta}})
- Avg rating (Yelp): {{Y_AvgRating}} (Δ {{Y_Delta}})
- 1–2★ reviews this week: {{NegCount}}

3) Responsiveness
- Response rate (all platforms): {{ResponseRate}}%
- Median response time: {{MedianResponseTime}}
- SLA hits/misses: {{SLA_Stats}}

4) Escalations & outcomes
- Escalations opened: {{EscOpened}}
- Escalations resolved: {{EscResolved}}
- Top negative themes: {{TopThemes}}

5) What we recommend next week (2 bullets)
- {{Rec1}}
- {{Rec2}}

If you want, reply with 1–2 customer-service details you’d like us to emphasize (e.g., “family-owned”, “same-day appointments”, “warranty”), and we’ll tune next week’s replies accordingly.

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

B) Weekly KPI Google Sheet Layout (tabs + columns)
Tab 1: Review Log
Columns:
- Date detected
- Platform (Google/Yelp)
- Location (if multi-location)
- Reviewer name
- Stars
- Review text
- Category/theme
- Drafted at
- Approved at
- Posted at
- Response time (hours)
- Escalated? (Y/N)
- Escalation ID
- Status (Open/Resolved)

Tab 2: Weekly Summary
Rows (by week):
- Week start date
- New reviews (Google)
- New reviews (Yelp)
- Avg rating (Google)
- Avg rating (Yelp)
- Negative count (1–2★)
- Response rate %
- Median response time
- # Escalations opened
- # Escalations resolved
- Top themes (text)
- Notes / wins

Tab 3: SLA & Quality Checks
- Total replies posted
- Replies requiring approval
- SLA met %
- Flagged keywords count
- Brand violations (should be 0)

============================
DEFAULT WEEK-1 POLICY (so delivery is always possible)
- Google: prefer GBP Manager access; otherwise client-post workflow.
- Yelp: client-post workflow by default in week 1 (we draft; client pastes/posts). If Yelp Business Owner access is available, we can post directly.
- No API dependency required.
- We do not: remove reviews, gate reviews, incentivize reviews, or impersonate the business owner; we draft brand-safe replies and provide guidance.

============================
30-DAY KPI DASHBOARD (sales pipeline, tracked daily)
Create a simple table with these columns:
- Date
- Leads sourced
- Outreach sent
- Replies received
- Calls booked
- Calls showed
- Deals closed
- Cash collected (setup + month 1)
- MRR added
- Notes (objections, wins)

Default daily targets to hit ~$12k cash-in-month (adjust by channel):
- Leads/day: 40–50
- Replies/day: 6–8 (assuming ~15% reply)
- Calls booked/day: 2–3
- Shows/day: 1–2
- Closes/week: 2

These templates are ready to copy/paste into your ops stack and begin onboarding immediately with the free 7-day trial.