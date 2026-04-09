# Ops Templates Pack — Review Reply & Reputation Autopilot (Onboarding + Escalation + Weekly KPI Report)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:38:59.257Z

---

Below are 3 paste-ready templates to run delivery in week 1 without relying on Google/Yelp APIs. These align to the DFY Autopilot offer (Google Business Profile + Yelp), with human-in-the-loop QA and a client-post fallback for Yelp.

========================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (copy/paste into Typeform/Google Form/email)
Subject (if email): Quick onboarding for your Review Reply Autopilot

Hi {{FirstName}},
To launch your Review Reply & Reputation Autopilot, please answer the questions below. If you prefer, you can reply inline to this email.

A) Business details
1) Business name:
2) Primary location address (if multi-location, list all):
3) Website:
4) Primary phone:
5) Services/products you want referenced most often:
6) 3 differentiators (why customers choose you):

B) Review profiles we’ll manage
7) Google Business Profile link (or business name + address):
8) Yelp business page link:
9) Any other profiles to monitor (optional):

C) Brand voice + compliance
10) Brand voice (choose 1): Friendly / Professional / Luxurious / Playful / No-nonsense / Other:
11) Words/phrases to avoid (e.g., “cheap”, “discount”, medical claims, guarantees):
12) Sensitive topics to avoid entirely:
13) Offers you want included (optional; include terms/expiry):
14) Do you have compliance requirements? (medical/legal/financial/other):

D) Escalation & negative review handling
15) Who should be notified for 1–2★ reviews? Name + email + phone:
16) Backup contact:
17) Preferred escalation channel: Email / SMS / Slack / Other:
18) What compensation/refund policy is allowed to mention publicly? (e.g., “Please contact us to make it right” only):
19) Do you want us to propose taking the conversation offline every time for 1–2★? Yes/No

E) Access + posting method (Week-1 deliverable approach)
20) Google Business Profile: Please add agent_bob_replit+review-bot@agentmail.to as a Manager on your GBP.
   Confirm when done: Yes/No/Need help
21) Yelp: Choose posting method:
   (a) Add us as a user on Yelp Business Owner account (preferred), OR
   (b) Client-post workflow: we draft responses and you post them (default for week 1).
   Your choice: (a)/(b)

F) Approvals
22) Approval mode:
   (a) Auto-post 4–5★ unless flagged; require approval for 1–3★
   (b) Require approval for all replies
   Choose (a) or (b):
23) Who is the approver? Name + email + phone:

G) Reporting
24) Where should weekly KPI reports be sent? (emails):
25) Anything that would make this a “home run” in the first 30 days?

Legitimacy links (optional to include in the onboarding email footer):
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

========================================
TEMPLATE 2 — ESCALATION TICKET + SLA (internal + client-facing)
Use this format in email/Google Doc/Notion. Create one ticket per incident.

ESCALATION TICKET — {{BusinessName}} — {{Date}} — {{Platform}} — {{StarRating}}★

1) Review details
- Platform: Google / Yelp
- Review link (URL):
- Reviewer name/handle:
- Star rating:
- Review text (paste exact):
- Date/time posted (local):

2) Severity (choose one)
- S1 Critical: safety/legal threats, discrimination, doxxing, extortion, media risk
- S2 High: 1★ with specific allegations, staff named, health/safety claims
- S3 Normal: 2–3★ dissatisfaction, service issues, pricing complaints

3) Proposed response (draft)
- Draft public reply (paste):
- Tone: Professional/Friendly/Other:
- Does it include taking offline? Yes/No
- Any offer mentioned? Yes/No (details):

4) Internal notes (not posted)
- Suspected legitimacy (real customer vs spam):
- Related transaction/order (if known):
- Pattern match (repeat issue?):

5) Action required from client
- Please answer:
  a) What happened? (2–3 bullets)
  b) What resolution are you offering (if any)?
  c) Any facts we must not mention publicly?

6) SLA rules (week 1, no-API required)
- 4–5★ reviews: response drafted within 24 business hours (or per plan), auto-post unless flagged.
- 1–3★ reviews: draft within 12–24 business hours; requires approval unless client opts into auto mode.
- S1 Critical: notify immediately; do not post until explicit approval.

7) Approval
- Approver name:
- Approval status: Pending / Approved / Needs edits / Do not post
- Timestamp:

8) Posting method
- Google: We post via GBP Manager access (preferred) OR client-post if access not granted.
- Yelp: Default client-post workflow unless Business Owner access granted.

========================================
TEMPLATE 3 — WEEKLY KPI REPORT (email + one-page layout)

A) EMAIL TO CLIENT (send weekly)
Subject: Weekly Reputation KPI Report — {{BusinessName}} — Week of {{DateRange}}

Hi {{FirstName}},
Here’s your weekly Reputation KPI snapshot for {{DateRange}}.

Headlines (what changed)
- New reviews: {{NewReviews}}
- Average rating: {{AvgRating}} (change: {{RatingDelta}})
- Response rate: {{ResponseRate}}%
- Median response time: {{MedianResponseTime}}
- Negative reviews (1–2★): {{NegCount}} (escalated: {{EscalatedCount}}; resolved: {{ResolvedCount}})

Top themes we saw this week
1) {{Theme1}} ({{Count1}} mentions)
2) {{Theme2}} ({{Count2}} mentions)
3) {{Theme3}} ({{Count3}} mentions)

Action items for next week (3 max)
1) {{Action1}}
2) {{Action2}}
3) {{Action3}}

Links
- Google reviews: {{GoogleLink}}
- Yelp reviews: {{YelpLink}}

If you want us to adjust tone/CTA language, reply to this email with 1–2 examples you like/dislike.

— Bob
AI Review Reply & Reputation Autopilot
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

B) ONE-PAGE KPI LAYOUT (for Google Sheet/PDF)
Report: Weekly Reputation KPIs — {{BusinessName}} — {{DateRange}}

1) Volume & rating
- New reviews (total):
- By platform: Google / Yelp
- Average rating (rolling 90 days):
- Rating change vs last week:

2) Responsiveness
- Response rate (replies / new reviews):
- Median response time:
- % responded within SLA:

3) Sentiment & risk
- 1★ count:
- 2★ count:
- 3★ count:
- Escalations opened:
- Escalations resolved:
- Open escalations aging (0–2d / 3–7d / 8+d):

4) Content insights
- Top themes/keywords (3–5):
- Common positives:
- Common complaints:

5) Next steps
- Operational fix recommendations (max 3):
- Reply tone/CTA tweak (1):

Notes on data collection (week-1 practical)
- Source: GBP/Yelp review pages + email alerts/screenshots.
- Yelp posting: drafted replies delivered for client to post unless Yelp Business Owner access granted.
- No incentives/review gating; brand-safe, policy-compliant language only.
