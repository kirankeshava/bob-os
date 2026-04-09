# Ops Templates Pack (Week-1 Deliverable): Onboarding Intake + Escalation SLA + Weekly KPI Report

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:47:20.108Z

---

Below are paste-ready templates you can use immediately for fulfillment. They are designed to work without Google/Yelp APIs using (a) manager/owner access when available or (b) a client-post workflow where we draft responses and the client posts them.

==============================
1) ONBOARDING INTAKE QUESTIONNAIRE (COPY/PASTE)
==============================
Subject: Quick onboarding for Review Reply & Reputation Autopilot (10 minutes)

Hi {{FirstName}},

To start your Review Reply & Reputation Autopilot, please reply to this email (or paste into a doc) with answers below. This lets us match your brand voice and respond safely.

A) Business Basics
1. Business name:
2. Primary location address (or service area):
3. Website:
4. Main phone number:
5. Primary services (top 5):
6. Hours of operation:

B) Review Profiles (Links + Access)
7. Google Business Profile link:
8. Do you currently receive Google review notifications? If yes, to what email?
9. Preferred posting method for Google:
   - Option 1 (recommended): Add us as Manager on Google Business Profile
   - Option 2: Client-post workflow (we draft; you post)
10. Yelp business page link:
11. Preferred posting method for Yelp:
   - Option 1: Add us to Yelp Business Owner account / delegate access (if available)
   - Option 2 (default fallback): Client-post workflow (we draft; you post)

C) Brand Voice & Messaging
12. Choose your default tone (pick 1–2): Warm / Professional / Casual / Luxury / Clinical / No-nonsense
13. Do you want replies signed with a name? If yes, which (e.g., “—The Team at {{Biz}}” or “—Bob, Owner”)?
14. “Never say” list (banned phrases/claims):
15. “Always include” list (values, phrases, compliance statements):
16. Approved call-to-action (CTA) for replies (pick one):
   - “Call us at {{Phone}}”
   - “Visit {{URL}}”
   - “Email {{SupportEmail}}”
   - “We’d love to make this right—please contact us directly”

D) Discounts / Offers Policy (to avoid platform violations)
17. Are you offering any discount for reviews? (Note: we do NOT recommend incentives tied to reviews.)
18. If you have a standard customer service recovery offer (e.g., “free re-check”), describe it:

E) Approvals & Escalation
19. Who approves sensitive replies? Name + email + phone:
20. Business hours for urgent escalation calls/texts:
21. What qualifies as “urgent” for you? (examples: safety issue, discrimination, legal threat, HIPAA/medical, refund demand)
22. Are there any topics that must always be escalated (refunds, staff discipline, legal, pricing disputes, etc.)?

F) Response Rules (defaults)
23. Default response SLA you want us to follow:
   - Standard: within 24 business hours
   - Rush: within 12 business hours
24. Auto-approve rule (recommended):
   - Auto-post 4–5★ unless flagged by keywords.
   - Require approval for 1–3★, legal/medical keywords, or if customer mentions staff by name.

G) Contacts for Weekly KPI Report
25. Who should receive the weekly KPI report? Emails:
26. Preferred report day/time (e.g., Monday 9am):

Once we have the above, we’ll start monitoring and replying within 1 business day.

—
Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


==============================
2) ESCALATION TICKET + SLA TEMPLATE (COPY/PASTE)
==============================
Title: Negative Review Escalation Ticket (Required for 1–3★ or flagged keywords)

Ticket ID: {{Auto}}
Date/Time opened: {{Timestamp}}
Platform: Google / Yelp
Review link: {{URL}}
Reviewer name/handle: {{Name}}
Star rating: {{1-5}}
Review text (copy):
{{Paste}}

A) Category (choose one)
- Service quality complaint
- Staff behavior / rudeness
- Billing / pricing dispute
- Wait time / scheduling
- Product issue
- Safety concern
- Legal threat / discrimination claim
- Medical / HIPAA-related (if applicable)
- Spam / competitor / suspicious

B) Risk Level
- Low: unhappy but no threats
- Medium: refund demand, staff named, potential viral
- High: legal threat, safety claim, discrimination, medical privacy

C) Required Next Step
- Draft empathetic response + invite offline resolution
- Offer service recovery (per policy)
- Request more info privately
- Flag as potential spam (client to decide whether to report)
- Escalate to owner/legal before any reply

D) Owner/Client Decision Needed
1) Approve response as written? Y/N
2) Do we mention compensation/recovery? (Keep generic on public platforms.)
3) Who will contact the customer offline? Name + deadline:

E) SLA (what we commit to)
- Draft response turnaround:
  - Low/Medium: within 12–24 business hours (per plan)
  - High: within 2 business hours during business hours; otherwise next business morning
- Posting:
  - If we have access: post immediately after approval/auto-approval rule
  - If client-post workflow: we send final copy; client posts within 24 hours

F) Resolution Tracking
Offline contact attempted? Date/time:
Outcome: Resolved / Pending / No response / Chargeback / Other
Notes:
Follow-up action due date:

Standard Public Reply Guardrails (always)
- Do not admit legal liability.
- Do not share private customer details.
- Do not argue.
- Invite offline resolution with direct contact.


==============================
3) WEEKLY KPI REPORT TEMPLATE (EMAIL + SHEET LAYOUT)
==============================
A) Weekly Email (copy/paste)
Subject: Weekly Reputation Report — {{BusinessName}} ({{StartDate}}–{{EndDate}})

Hi {{FirstName}},

Here’s your weekly Reputation KPI Report for {{BusinessName}}.

Top-line KPIs
- New reviews: {{#}} (Google: {{#}}, Yelp: {{#}})
- Average rating (current): {{X.X}} (WoW change: {{+/-}})
- Response rate: {{X%}} (goal: {{Goal%}})
- Median response time: {{X}} hours (goal: {{GoalHours}})
- Negative reviews (1–3★): {{#}}
- Escalations opened: {{#}} | Resolved: {{#}} | Pending: {{#}}

Highlights (what went well)
- {{Bullet 1}}
- {{Bullet 2}}

Risks / Issues (needs attention)
- {{Bullet 1}}
- {{Bullet 2}}

Voice-of-Customer Themes (top 3)
1) {{Theme}} — {{#}} mentions
2) {{Theme}} — {{#}} mentions
3) {{Theme}} — {{#}} mentions

Recommended Actions for Next Week (1–3)
1) {{Action}} (owner: {{Name}})
2) {{Action}} (owner: {{Name}})
3) {{Action}} (owner: {{Name}})

Link to the live KPI sheet: {{SheetURL}}

—
Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


B) Google Sheet Layout (columns to create)
Tab 1: Weekly Summary
Columns:
- Week Start
- Week End
- Platform (Google/Yelp/Total)
- New Reviews
- Avg Rating (start)
- Avg Rating (end)
- Rating Change
- Responses Posted
- Response Rate (=Responses Posted / New Reviews)
- Median Response Time (hrs)
- 1★ Count
- 2★ Count
- 3★ Count
- 4★ Count
- 5★ Count
- Escalations Opened
- Escalations Resolved
- Open Escalations
- Top Theme 1
- Top Theme 2
- Top Theme 3
- Notes / Actions

Tab 2: Review Log
Columns:
- Date
- Platform
- Reviewer Name
- Star Rating
- Review Text
- Category/Theme
- Drafted Response (Y/N)
- Posted Response (Y/N)
- Approval Needed (Y/N)
- Escalated (Y/N)
- Escalation Ticket ID
- Response Time (hrs)
- Link

Tab 3: SLA & Compliance Flags
Columns:
- Date
- Platform
- Review Link
- Flag Reason (keyword/risk)
- Required Approval (Y/N)
- Approved By
- Posted By (us/client)
- SLA Met (Y/N)
- Notes

These templates map directly to the DFY and agency plans and keep delivery consistent even when posting must be done by the client.
