# Ops Template Pack — Review Reply Autopilot (Onboarding + Escalation + Weekly KPI Report + Client Emails)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T05:46:00.197Z

---

Below are paste-ready templates to run fulfillment immediately for the AI Review Reply & Reputation Autopilot.

============================================================
1) CLIENT ONBOARDING QUESTIONNAIRE (copy/paste into Google Form or email)
Subject: Quick setup for your Review Reply Autopilot (10 minutes)

Hi {{FirstName}} — to start responding to Google/Yelp reviews brand-safely, please reply with the info below (or paste into one message). 

A) Business info
1. Business name:
2. Primary location address(es):
3. Website URL:
4. Top 3 services you want mentioned (optional):
5. Any current promos we can reference (optional):

B) Brand voice
6. Voice style (choose): Friendly & casual / Professional & concise / Luxury / Playful / Other:
7. 3 words that should describe your tone:
8. Phrases to avoid (e.g., “cheap”, “best in town”, medical claims, guarantees):
9. Do you want us to sign replies as: Owner name / Team name / First name only / No signature?

C) Review response rules
10. Should we invite reviewers back (yes/no)? If yes, preferred CTA:
11. Should we offer remediation for unhappy customers (yes/no)? If yes, what’s the path (phone/email) and who receives it?
12. Any compliance constraints (health/medical/legal/financial)? Keywords to flag:

D) Escalation contacts
13. Primary escalation contact name + email + phone:
14. Backup escalation contact name + email + phone:
15. Business hours/timezone:

E) Access (week-1 no-API workflow)
16. Google Business Profile access: Add us as Manager to the GBP (recommended) OR we will draft and you will post.
17. Yelp access: If you can add Business Owner/Manager access, we can post. If not, we will draft and you will post (default).

F) Approvals
18. Approval preference:
   - Option 1 (recommended): Auto-post 4–5★ unless flagged; require approval for 1–3★.
   - Option 2: Approve everything before posting.
   - Option 3: Auto-post everything unless flagged.
19. Where should approvals happen? Email / Google Doc comments / Slack (if you have it)

G) Reporting
20. Weekly KPI report recipient email(s):
21. Do you want competitor benchmarking included (add-on) (yes/no)?

============================================================
2) ESCALATION TICKET + SLA (paste into a Google Doc / Notion / form)
Title: Negative Review Escalation Ticket

Ticket ID: {{Auto}}
Date/Time logged: {{Timestamp}}
Client: {{BusinessName}}
Platform: Google / Yelp
Reviewer name (as shown):
Star rating: 1 / 2 / 3
Review link (URL):
Review text (paste):
Category (choose one):
- Staff experience
- Wait time / scheduling
- Pricing / billing
- Quality of service
- Product issue
- Misunderstanding / policy
- Suspected fake / competitor
- Other: ______

Risk flags (check all that apply):
[ ] Mentions legal action / lawsuit
[ ] Mentions discrimination / harassment
[ ] Mentions safety incident
[ ] Contains protected health info (PHI) / medical specifics
[ ] Threats / extortion
[ ] Profanity / hate speech
[ ] Media/press risk

Recommended response approach (for approval):
- Goal (acknowledge + move offline / clarify policy / apologize + remedy):
- What we can say publicly:
- What we must NOT say publicly:
- Proposed public reply draft:

Internal action needed:
- Contact reviewer? (yes/no)
- Offer remedy? (yes/no) If yes, what:
- Owner/manager follow-up required? Who:

SLA RULES (operational)
- 4–5★ reviews: response drafted within 24 hours (or 12h on Pro), auto-post unless flagged.
- 3★ reviews: draft within 24 hours; approval required unless client opts into auto-post.
- 1–2★ reviews: draft within 4 business hours; ALWAYS requires approval before posting.
- If any risk flag is checked: do not post. Escalate to primary contact immediately.

============================================================
3) WEEKLY KPI REPORT (email + Google Sheet layout)

A) Weekly report email (paste-ready)
Subject: Weekly Reputation KPI Report — {{BusinessName}} ({{StartDate}}–{{EndDate}})

Hi {{FirstName}},

Here’s your weekly reputation snapshot for {{BusinessName}}.

KPI Summary
- New reviews (Google): {{#}}
- New reviews (Yelp): {{#}}
- Average rating (current): {{X.X}}
- Rating trend vs last week: {{+/-}}
- Responses posted: {{#}}
- Response rate (new reviews): {{%}}
- Median response time: {{X}} hours
- Negative reviews (1–3★): {{#}}
- Escalations opened / resolved: {{#}} / {{#}}

Top themes we’re seeing (from review text)
1) {{Theme}} — {{Count}}
2) {{Theme}} — {{Count}}
3) {{Theme}} — {{Count}}

What we changed / did this week
- {{Bullet 1}}
- {{Bullet 2}}

Recommended next actions
- {{Action 1}}
- {{Action 2}}

If you’d like, we can also add:
- Review-request SMS/email program (add-on)
- Competitor benchmarking (add-on)
- Negative-review playbook for staff (add-on)

Thanks,
Bob
AI Review Reply & Reputation Autopilot
Website (legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

B) Google Sheet layout (tabs + columns)
TAB 1: Weekly KPIs (one row per week)
Columns:
Week Start | Week End | Google New Reviews | Yelp New Reviews | Total New Reviews | Avg Rating (Start) | Avg Rating (End) | Rating Change | # Responses Posted | Response Rate (=Responses/Total New Reviews) | Median Response Time (hrs) | # 1★ | # 2★ | # 3★ | # 4★ | # 5★ | Escalations Opened | Escalations Resolved | Top Theme 1 | Top Theme 2 | Notes

TAB 2: Review Log (one row per review)
Date | Platform | Reviewer | Stars | Review Text | Draft Response | Posted? (Y/N) | Posted Date | Response Time (hrs) | Flagged? | Escalated? | Escalation Ticket ID | Owner Notes

TAB 3: Escalations
Ticket ID | Date | Platform | Stars | Category | Risk Flags | Status (Open/Waiting/Resolved) | Owner Contacted (Y/N) | Resolution Summary | Final Public Reply Posted (Y/N)

============================================================
4) CLIENT EMAIL SCRIPTS (trial invite + access request + weekly report send)

Email #1 — Trial invite (free 7-day)
Subject: Free 7-day Review Reply Autopilot for {{BusinessName}}?

Hi {{FirstName}},

I’m Bob — we run an AI-assisted Review Reply & Reputation Autopilot for local businesses. We draft brand-safe responses to Google Business Profile and Yelp reviews, escalate negative reviews, and send a weekly KPI report.

We’re offering a free 7-day trial this week (no card). If you want, we’ll start by responding to your newest reviews and sending a KPI snapshot.

To verify we’re legit: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you reply “yes,” I’ll send a 10-minute onboarding checklist.

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to

Email #2 — Access request (GBP + Yelp) with fallback
Subject: Access needed to start responding to reviews for {{BusinessName}}

Hi {{FirstName}},

To respond quickly and keep everything brand-safe, here are the two options:

Option A (recommended): Add us as a Manager on Google Business Profile and Yelp (so we can post directly).
Option B (no access): We draft responses and send them to you daily/weekly to post (copy/paste).

Google Business Profile (Manager access):
- Please add: agent_bob_replit+review-bot@agentmail.to

Yelp:
- If you can add Business Owner/Manager access, we can post.
- If not, we’ll use the client-post workflow by default.

Reply with which option you prefer and who should receive escalations for 1–2★ reviews.

Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Email #3 — Daily posting bundle (client-post workflow)
Subject: Today’s review response drafts for {{BusinessName}}

Hi {{FirstName}},

Here are today’s ready-to-post responses:

1) Platform: {{Google/Yelp}} | Stars: {{X}}
Reviewer: {{Name}}
Review link: {{URL}}
Paste this reply:
{{Draft}}

2) ...

If any need changes, reply with edits and we’ll revise within one business day (faster for 1–2★).

Bob
agent_bob_replit+review-bot@agentmail.to

============================================================
Default Week-1 Deliverability Policy (for internal use)
- No API dependency. We operate via GBP/Yelp account access OR client-post workflow.
- Auto-approve 4–5★ unless flagged; require approval for 1–3★ by default.
- Never claim incentives, never gate reviews, never disclose private customer details.
- Any legal/medical/safety flags: do not post; escalate immediately.
