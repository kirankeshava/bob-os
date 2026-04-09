# Ops Templates Pack — Onboarding + Escalations/SLA + Weekly KPI Report (Copy/Paste Ready)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:53:15.951Z

---

Below are 3 paste-ready templates to fulfill the DFY Review Reply Autopilot + Weekly KPI report and the White-label plan immediately (week 1) without relying on Google/Yelp APIs. These templates reference the public website URL for legitimacy and the business contact email for replies.

==================================================
1) CLIENT ONBOARDING EMAIL + QUESTIONNAIRE (send after payment)
==================================================
Subject: Next step: activate your Review Reply Autopilot (Google/Yelp)

Hi {{FirstName}},

Thanks for getting started. We’ll activate your Review Reply & Reputation Autopilot and begin drafting responses within 24 hours once we have the details below.

Company legitimacy link (overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/contact: agent_bob_replit+review-bot@agentmail.to

Please reply with the answers (you can paste in-line) or complete in a doc.

A) Locations & Profiles
1. Business name + location(s):
2. Google Business Profile URL(s):
3. Yelp business page URL(s):
4. Any other review sources to monitor (optional): Facebook, TripAdvisor, etc.

B) Access (Week-1, no API required)
Google (preferred):
5. Can you add us as a Manager on Google Business Profile? If yes, invite this email: agent_bob_replit+review-bot@agentmail.to
   - If not possible: we will draft + you post (copy/paste).

Yelp (default week-1 workflow is client-post):
6. Preferred option (choose one):
   ( ) Option 1: Add us as a user on Yelp Business Owner account (preferred if available)
   ( ) Option 2: We draft replies; you/your team posts them on Yelp (default)

C) Brand Voice & Rules
7. Brand voice (choose 2–3): Friendly / Professional / Warm / Direct / Luxury / Casual / Humorous / Clinical
8. Must-use phrases (if any):
9. Never-use phrases (if any):
10. Any compliance constraints (HIPAA/medical, legal, financial, regulated claims):

D) Operations & Offers
11. Business hours + typical response expectations:
12. Primary services (top 3) + typical ticket size:
13. Current promo/offer allowed to mention (optional):
14. Do you want us to invite dissatisfied reviewers to private resolution? (Yes/No)

E) Escalation Contacts (for negative reviews)
15. Escalation contact name + role:
16. Escalation email + phone:
17. Backup contact:

F) Approval Preferences (choose default)
18. Approval mode:
   ( ) Auto-post 4–5★ replies unless flagged
   ( ) Require approval for every reply
   ( ) Hybrid: auto-post 4–5★; approval required for 1–3★ (recommended)

G) Competitor Benchmarks (if included)
19. List 3 competitors (links or names):

Once we receive the above, you’ll get a confirmation email with your response rules, escalation rules, and reporting cadence.

Best,
Bob Smith
Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to

==================================================
2) ESCALATION TICKET + SLA (internal form OR client-facing email)
==================================================
Use this whenever a review meets escalation criteria (1–3★, allegation of harm, refund demand, discrimination, legal threat, HIPAA/medical keywords, safety issue, employee misconduct claim, or media/viral risk).

Subject: Escalation Needed — Review on {{Platform}} ({{StarRating}}★) — Response required

Escalation Ticket ID: {{TicketID}}
Date/Time detected: {{Timestamp}}
Client: {{ClientName}} / Location: {{Location}}
Platform: {{Google|Yelp}}
Review link: {{URL}}
Reviewer name (if visible): {{Reviewer}}
Star rating: {{1-5}}
Review text (paste exact):
---
{{ReviewText}}
---

Why escalated (check all):
[ ] 1–3★ rating
[ ] Request for refund/chargeback
[ ] Legal threat (lawsuit, attorney, “reporting”)
[ ] Discrimination/harassment allegation
[ ] Safety issue/injury
[ ] HIPAA/medical privacy concern
[ ] Explicit content/hate speech
[ ] Employee misconduct allegation
[ ] Suspected fake/competitor review
[ ] Other: {{OtherReason}}

Recommended action (our draft):
- Public response approach (high-level): {{Approach}}
- Do we invite to private resolution? (Y/N)
- Do we avoid specifics due to compliance? (Y/N)

SLA (set expectations):
- We acknowledge internally within: 2 business hours
- Client decision/inputs needed within: 24 hours (or we will post a neutral, de-escalating response if approved in contract)
- Target public response posted within: 12–24 hours depending on plan and approval mode

Client Questions (answer to proceed):
1) What happened? (2–4 bullet summary)
2) Who handled the customer? (name/role)
3) What resolution can you offer? (refund, redo service, call back, apology only, etc.)
4) Is there any info we must NOT mention publicly?

Approval:
[ ] Approved to post our draft as-is
[ ] Approved with edits (paste edits)
[ ] Do not post yet; we will handle offline first

==================================================
3) WEEKLY KPI REPORT (email template + sheet layout)
==================================================
Send every Monday (or agreed day). Works for DFY and Agency white-label.

A) EMAIL TEMPLATE
Subject: Weekly Reputation KPI Report — {{ClientName}} — Week of {{StartDate}}–{{EndDate}}

Hi {{FirstName}},

Here’s your weekly Reputation KPI snapshot for {{Location/Brand}}.

Highlights (this week):
- New reviews: {{NewReviews}} (Google: {{GNew}}, Yelp: {{YNew}})
- Average rating: {{AvgRating}} (change: {{DeltaRating}})
- Response rate: {{ResponseRate}}%
- Median response time: {{MedianResponseTime}}
- Negative reviews (≤3★): {{NegCount}}
- Escalations opened/resolved: {{EscOpened}} / {{EscResolved}}

Top themes (what customers mentioned most):
1) {{Theme1}}
2) {{Theme2}}
3) {{Theme3}}

Action items (next 7 days):
- {{Action1}}
- {{Action2}}
- {{Action3}}

Link to full KPI sheet/report: {{ReportLink}}

As always, if anything needs urgent attention, forward it to agent_bob_replit+review-bot@agentmail.to.

Best,
Bob Smith
Review Reply & Reputation Autopilot
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

B) SHEET LAYOUT (tabs + columns)
Tab 1: Weekly Summary
Columns:
- Week Start
- Week End
- Location
- Platform Split (Google New / Yelp New)
- Total New Reviews
- Avg Rating (Current)
- Avg Rating (Prev)
- Rating Δ
- Response Rate %
- Median Response Time (hrs)
- # Responses Posted
- # Escalations Opened
- # Escalations Resolved
- Top Theme 1
- Top Theme 2
- Top Theme 3
- Notes / Risks

Tab 2: Review Log
Columns:
- Date
- Platform
- Location
- Reviewer Name
- Stars
- Review Text
- Category/Theme
- Sentiment (Pos/Neu/Neg)
- Response Drafted (Y/N)
- Response Posted (Y/N)
- Posted By (Us/Client)
- Needs Approval (Y/N)
- Escalated (Y/N)
- Escalation Ticket ID
- Resolution Status
- Link

Tab 3: SLA & Delivery
Columns:
- Date
- # New Reviews
- # Drafts Created
- # Posted
- Avg Time to Draft (hrs)
- Avg Time to Post (hrs)
- SLA Met? (Y/N)
- Blockers

Default week-1 workflow note (add to sheet header):
- Google: we post if granted GBP Manager access; otherwise we draft + client posts.
- Yelp: default is we draft + client posts (copy/paste) unless owner access is provided.

==================================================
Optional: CLIENT-POST INSTRUCTIONS (for Yelp or no-access Google)
==================================================
Subject: Your queued review replies (copy/paste)

Hi {{FirstName}},

Below are your ready-to-post replies. Please copy/paste each reply into {{Yelp|Google}}.

1) Review link: {{URL1}}
Proposed reply:
“{{Reply1}}”

2) Review link: {{URL2}}
Proposed reply:
“{{Reply2}}”

If you want us to post directly, you can add agent_bob_replit+review-bot@agentmail.to as a manager/user on the platform.

— Bob
