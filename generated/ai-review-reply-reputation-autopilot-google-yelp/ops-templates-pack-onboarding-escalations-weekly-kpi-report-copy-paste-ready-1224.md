# Ops Templates Pack — Onboarding + Escalations + Weekly KPI Report (Copy/Paste Ready)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:02:07.272Z

---

Below are three paste-ready templates for immediate operations. Use these exactly as-is; they reference the business site and contact email.

====================================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (DFY + AGENCY)
====================================================
Subject: Quick onboarding for AI Review Reply & Reputation Autopilot (10 minutes)

Hi {{ClientName}},

Thanks for signing up for AI Review Reply & Reputation Autopilot.
Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support email: agent_bob_replit+review-bot@agentmail.to

Please reply to this email with the answers below (copy/paste), or fill it out in one message.

A) Business + Locations
1) Business name:
2) Primary location address (and any additional locations):
3) Primary phone:
4) Website:
5) Hours:

B) Access (week-1 workflow is designed to work even without API access)
6) Google Business Profile (GBP): can you add us as a Manager? (Preferred)
   - If yes, please invite: agent_bob_replit+review-bot@agentmail.to
   - If no, we can run “draft-only” and you post (copy/paste) until access is granted.
7) Yelp: do you have Yelp Business Owner access?
   - If yes: we can set up direct workflow.
   - If no: we’ll run “draft-only” for Yelp (you post) until access is granted.

C) Brand Voice + Do/Don’t Rules
8) Brand voice (pick up to 2): Friendly | Professional | Luxury | Casual | Empathetic | Direct | Playful
9) Words/phrases we should NOT use (banned phrases):
10) Words/phrases you WANT us to use (preferred phrases):
11) Allowed offers (if any): (e.g., “10% off next visit” / “free consultation”) 
12) Disallowed topics: pricing, refunds, legal threats, medical claims, etc.

D) Escalation Contacts + Approval Rules
13) Who should receive escalations? (name + email + phone)
14) Business hours for escalations:
15) Default approval rule (choose one):
   (a) Auto-post 4–5★ unless flagged; approval required for 1–3★
   (b) Approval required for all reviews
   (c) Auto-post all unless flagged (not recommended)

E) Service/Operations
16) Top 5 services (exact names you want referenced):
17) Top 5 FAQs we should be ready to address:
18) Competitors you care about (optional):

F) Risk & Compliance (required)
19) Any legal/compliance constraints? (healthcare/HIPAA, financial, minors, etc.)
20) Confirm: We will NOT request customers to remove negative reviews and we will NOT offer incentives in exchange for reviews. (Yes/No)

Once we have this, we’ll start within 1 business day and you’ll receive your first weekly KPI report next week.

— Bob
agent_bob_replit+review-bot@agentmail.to


====================================================
TEMPLATE 2 — ESCALATION TICKET + SLA RULES (INTERNAL + CLIENT-FACING)
====================================================
Use this whenever a review meets escalation criteria.

ESCALATION TICKET
Ticket ID: {{YYYYMMDD-Client-###}}
Client/Location: {{ClientName}} — {{Location}}
Platform: Google | Yelp
Review URL: {{link}}
Reviewer name: {{name}}
Star rating: {{1-5}}
Date/time seen: {{timestamp}}

1) Why escalated? (check all that apply)
[ ] 1★ or 2★ review
[ ] 3★ with negative sentiment
[ ] Safety/legal risk (threats, discrimination, doxxing, accusations)
[ ] Medical/financial claims risk
[ ] Refund/billing dispute
[ ] Staff named directly
[ ] Suspected fake review
[ ] Contains private info
[ ] Other: {{describe}}

2) Suggested response (draft)
{{DraftResponse}}

3) Questions for owner/manager (what we need to finalize)
- {{Q1}}
- {{Q2}}

4) SLA + next step
Severity:
- P0 (legal/safety threat, doxxing): notify within 1 hour; response on hold until explicit approval.
- P1 (1–2★, refund dispute, staff allegation): notify within 4 business hours; response requires approval.
- P2 (3★ mild issue): notify within 1 business day; approval recommended.

Owner choices (pick one):
[ ] Approve as written
[ ] Edit notes: {{notes}}
[ ] Do not respond publicly (we will document & monitor)
[ ] Request removal/dispute (owner must initiate; we can provide steps)

Posting method for escalations (default):
- Google: we post if GBP Manager access is granted; otherwise client posts from provided copy.
- Yelp: default client posts from provided copy unless Yelp Business Owner access is granted.


====================================================
TEMPLATE 3 — WEEKLY KPI REPORT (EMAIL + SHEET LAYOUT)
====================================================
Client email subject: Weekly Reputation KPIs — {{ClientName}} ({{StartDate}}–{{EndDate}})

Email body:
Hi {{ClientName}},

Here’s your weekly reputation snapshot from AI Review Reply & Reputation Autopilot.
(Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1)
Questions: agent_bob_replit+review-bot@agentmail.to

1) Review Volume
- New Google reviews: {{#}}
- New Yelp reviews: {{#}}
- Total new reviews: {{#}}

2) Rating Trend
- Google average rating (start → end): {{x.x}} → {{x.x}}
- Yelp rating (start → end): {{x.x}} → {{x.x}}

3) Responsiveness
- Responses posted: {{#}}
- Response rate (responses/new reviews): {{%}}
- Median response time: {{hours}}
- SLA compliance: {{% within SLA}}

4) Risk & Escalations
- Negative reviews (1–2★): {{#}}
- Escalations opened: {{#}}
- Escalations resolved: {{#}}
- Open issues needing owner input: {{#}} (listed below)

5) Top Themes (what customers are actually saying)
- Positive themes: {{Theme1}}, {{Theme2}}, {{Theme3}}
- Improvement themes: {{Theme1}}, {{Theme2}}

6) Next-week actions (recommended)
- {{Action1}}
- {{Action2}}

Open items requiring your input:
- {{TicketID}} — {{summary}} — {{link}}

— Bob
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to


Weekly KPI Sheet Layout (copy into Google Sheets)
Tab 1: “Weekly Summary” (one row per week)
Columns:
A Week Start Date
B Week End Date
C Google New Reviews
D Yelp New Reviews
E Total New Reviews (=C+D)
F Google Avg Rating Start
G Google Avg Rating End
H Yelp Rating Start
I Yelp Rating End
J Responses Posted
K Response Rate (=J/E)
L Median Response Time (hrs)
M SLA Compliance %
N Negative Reviews (1–2★)
O Escalations Opened
P Escalations Resolved
Q Open Escalations
R Top Positive Theme 1
S Top Positive Theme 2
T Top Improvement Theme 1
U Notes / Actions

Tab 2: “Review Log” (one row per review)
Columns:
A Date
B Platform (Google/Yelp)
C Location
D Reviewer
E Stars
F Review URL
G Category/Theme
H Drafted Response Link/Text
I Approved? (Y/N)
J Posted? (Y/N)
K Posted Timestamp
L Response Time (hrs)
M Escalated? (Y/N)
N Ticket ID
O Status (Open/Resolved)


====================================================
POLICY — DEFAULT YELP WORKFLOW (WEEK 1 SAFE)
====================================================
Default = “Draft + Client-Post” for Yelp (lowest onboarding friction).
- We draft brand-safe responses + escalation notes.
- Client posts via Yelp Business Owner account.
- If/when Yelp Business Owner access is granted to us, we can switch to direct posting.

====================================================
DISCOUNT POLICY (TO IMPROVE CLOSE RATE WITHOUT BREAKING $12K)
====================================================
Setup fee default: required.
Allowed waivers (pick ONE):
1) Waive setup if client prepays 2 months upfront.
2) Waive setup for 2+ locations on DFY Pro.
3) Agency plans: waive setup if they onboard 5+ locations within 14 days.
Never discount monthly recurring price in month 1 (protects MRR).