# Ops Templates Pack — Onboarding Intake + Escalation Workflow + Weekly KPI Report (Ready to Paste)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:17:23.742Z

---

Below are 3 paste-ready templates to operate AI Review Reply & Reputation Autopilot immediately (week 1), without relying on Google/Yelp APIs.

====================================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (COPY/PASTE)
====================================================
Subject: Quick onboarding for Review Reply Autopilot (10 minutes)

Hi {{FirstName}},

To start your Review Reply & Reputation Autopilot, please reply with the answers below. This is the only info we need to begin drafting and posting brand-safe review responses.

Service legitimacy/reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support email: agent_bob_replit+review-bot@agentmail.to

A) BUSINESS INFO
1) Business name:
2) Primary location address (or “service area only”):
3) Website URL:
4) Primary phone #:
5) Business hours:
6) Top 3 services/products you want mentioned when relevant:

B) PLATFORMS + ACCESS (WEEK-1 NO-API WORKFLOW)
7) Google Business Profile (GBP):
   - Do you currently have a GBP listing? (Yes/No)
   - Best option (preferred): add us as a Manager to your GBP.
   - If you cannot grant access this week: we can draft responses and you post them (copy/paste).

8) Yelp:
   - Do you have a Yelp Business Owner account? (Yes/No)
   - Preferred: add us as a user (if supported) or share Business Owner access.
   - If you can’t share access: we will run “client-post workflow” (we draft; you post).

C) BRAND VOICE (THIS CONTROLS THE AI)
9) Choose a voice (pick one): Friendly & casual / Warm & professional / Luxury & formal / Short & direct
10) Words/phrases to AVOID (e.g., “cheap”, “guarantee”, competitor names):
11) Words/phrases to USE (e.g., “family-owned”, “same-day appointments”):
12) Sign-off preference (e.g., “—The {{Brand}} Team”, “—Bob, Owner”):

D) COMPLIANCE / SENSITIVE TOPICS
13) Are there regulated claims we must avoid? (medical outcomes, legal outcomes, pricing promises, etc.)
14) Do you want us to invite unhappy reviewers to contact you privately? (Yes/No) If yes, best email/phone:

E) ESCALATION CONTACTS (NEGATIVE REVIEWS)
15) Primary escalation contact name + email + phone:
16) Backup escalation contact name + email + phone:
17) Business hours for escalations (include weekend rules):

F) APPROVAL RULES (DEFAULTS)
18) Default approvals (choose one):
   Option 1 (fastest): Auto-post 4–5★ replies unless flagged; request approval for 1–3★.
   Option 2 (strict): Request approval for all replies.

G) PROMOS (OPTIONAL)
19) Any current offers we may mention occasionally? (If yes, exact wording + terms):

Once we have this, we start within 1 business day.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to


====================================================
TEMPLATE 2 — ESCALATION TICKET + SLA RULES (INTERNAL + CLIENT-FACING)
====================================================
Use this template whenever a review is negative, sensitive, or potentially damaging.

A) ESCALATION TICKET (COPY/PASTE INTO EMAIL OR DOC)
Ticket ID: {{YYYYMMDD-Platform-Last4}}
Client: {{BusinessName}}
Platform: Google / Yelp
Reviewer name: {{Name}}
Star rating: {{1-5}}
Review date/time: {{Timestamp}}
Review link: {{URL}}
Review text (paste exact):
"{{ReviewText}}"

Category (select one):
- Service complaint
- Staff behavior
- Billing/pricing dispute
- Safety issue
- Legal threat
- Medical/regulated claim
- Hate speech/harassment
- Suspected fake review
- Other: {{ }}

Risk level:
- Low: normal complaint; respond + move on
- Medium: potential refund request; potential public thread risk
- High: legal/medical/safety claim; do not admit fault; require approval

Proposed public response draft (v1):
"{{DraftResponse}}"

Private follow-up suggestion (optional):
"{{PrivateFollowUp}}"

Requested action from client:
- Approve draft as-is
- Provide missing facts (what happened, date, staff involved)
- Provide approved resolution language (refund? redo service?)
- Request removal/flagging guidance (client must execute on their account)

B) SLA RULES (DEFAULT POLICY)
- Monitoring cadence: daily (business days). If client is on Pro: twice daily.
- Draft SLA:
  - 4–5★: draft within 24h (Growth) / 12h (Pro).
  - 1–3★: draft + escalation ticket within 12h (Growth) / 6h (Pro).
- Posting rule (week-1 deliverability):
  - Preferred: We post via GBP Manager access and Yelp Business Owner access.
  - Fallback: Client-post workflow (we send final copy; client posts).
- Approval rule (default):
  - Auto-post 4–5★ unless flagged for compliance.
  - Always require approval for 1–3★, legal/medical/safety claims, threats, harassment, or requests for personal data.
- Hard constraints:
  - No review gating (asking only happy customers to review).
  - No incentivized reviews.
  - No impersonation of the reviewer.
  - No promises of outcomes (regulated/medical/legal).

Client notification email (paste-ready):
Subject: Action needed: {{Platform}} {{StarRating}}★ review for {{BusinessName}}

Hi {{FirstName}},

A new {{StarRating}}★ review came in on {{Platform}} and needs approval before we post.

Review link: {{URL}}
Proposed response (ready to post):
"{{DraftResponse}}"

Please reply with one of:
1) APPROVE
2) EDITS: (paste changes)
3) CONTEXT: (what happened + desired resolution)

We can post immediately after your reply.

—Bob
agent_bob_replit+review-bot@agentmail.to


====================================================
TEMPLATE 3 — WEEKLY KPI REPORT (EMAIL + GOOGLE SHEET LAYOUT)
====================================================
A) WEEKLY KPI EMAIL (SEND EVERY MONDAY)
Subject: Weekly Reputation KPI Report — {{BusinessName}} ({{StartDate}}–{{EndDate}})

Hi {{FirstName}},

Here’s your weekly Reputation KPI snapshot for Google + Yelp.

1) NEW REVIEWS
- Google: {{G_NewReviews}}
- Yelp: {{Y_NewReviews}}
- Total: {{TotalNewReviews}}

2) RATING TREND
- Current average rating: {{AvgRating_Current}}
- Change vs last week: {{AvgRating_Change}}

3) RESPONSE PERFORMANCE
- Replies posted this week: {{RepliesPosted}}
- Response rate (new reviews replied to): {{ResponseRate}}%
- Median response time: {{MedianResponseTime}}
- SLA compliance: {{SLA_Compliance}}%

4) NEGATIVE REVIEW HANDLING (1–3★)
- New negative reviews: {{NegCount}}
- Escalations opened: {{EscOpened}}
- Escalations resolved: {{EscResolved}}
- Open escalations: {{EscOpen}}

5) THEMES (TOP 3)
- {{Theme1}} ({{Theme1Count}} mentions)
- {{Theme2}} ({{Theme2Count}} mentions)
- {{Theme3}} ({{Theme3Count}} mentions)

6) NEXT WEEK PRIORITIES (WE WILL EXECUTE)
- {{Priority1}}
- {{Priority2}}
- {{Priority3}}

If you’d like, reply with any upcoming promos or service changes so we can incorporate them into replies.

—Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


B) GOOGLE SHEET LAYOUT (TAB NAMES + COLUMNS)
Create a Google Sheet with these tabs.

TAB 1: Weekly Summary
Columns:
- Week Start
- Week End
- Google New Reviews
- Yelp New Reviews
- Total New Reviews
- Avg Rating (Current)
- Avg Rating (Prev)
- Avg Rating Change
- Replies Posted
- Response Rate
- Median Response Time (hrs)
- SLA Compliance %
- New Negative Reviews (1–3★)
- Escalations Opened
- Escalations Resolved
- Open Escalations
- Top Theme 1
- Top Theme 2
- Top Theme 3
- Notes / Actions

TAB 2: Review Log (source of truth)
Columns:
- Date
- Platform (Google/Yelp)
- Reviewer Name
- Stars
- Review Text
- Review URL
- Drafted By
- Draft Timestamp
- Posted? (Y/N)
- Posted Timestamp
- Approval Needed? (Y/N)
- Approved By
- Escalation Ticket ID
- Status (Drafted/Waiting Approval/Posted/Escalated)
- Tags (price, staff, wait time, quality, etc.)

TAB 3: Escalations
Columns:
- Ticket ID
- Date Opened
- Platform
- Stars
- Category
- Risk Level
- Owner (client contact)
- SLA Due
- Current Status
- Resolution Notes
- Date Closed

TAB 4: Monthly Rollup (for Pro clients)
Columns:
- Month
- Total New Reviews
- Avg Rating
- Total Replies Posted
- Response Rate
- Median Response Time
- Negative Review Count
- Escalations Resolved
- Notes

These templates align with:
- DFY Growth: 24h SLA; approvals required for 1–3★; weekly KPI email.
- DFY Pro: 12h SLA; competitor benchmarking and monthly insights call (added separately).
- Agency plans: same workflow per location with limits/overages.

Support: agent_bob_replit+review-bot@agentmail.to
Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
