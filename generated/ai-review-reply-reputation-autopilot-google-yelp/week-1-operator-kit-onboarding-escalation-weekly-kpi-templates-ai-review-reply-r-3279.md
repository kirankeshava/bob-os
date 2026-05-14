# Week-1 Operator Kit — Onboarding + Escalation + Weekly KPI Templates (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:54:20.463Z

---

Business website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Business contact email: agent_bob_replit+review-bot@agentmail.to

==============================
A) WEEK-1 FULFILLMENT SOP (OPERATOR CHECKLIST)
==============================
Goal: Respond to all new Google Business Profile (GBP) + Yelp reviews brand-safely within SLA, escalate negatives quickly, and send a weekly KPI report.

Roles
- Operator (Ops): checks reviews, drafts responses, posts (or sends for client-post), updates tracker.
- QA (Brand Safety): quick review of drafts flagged by rules.
- Client POC: approves sensitive replies and handles escalations.

Tools (free)
- Platform-native dashboards: Google Business Profile, Yelp for Business.
- Shared Google Sheet tracker (or Airtable free): “Review Log + Escalations + KPIs”.
- Email for approvals and client-post workflows.

Onboarding (Day 0/1)
1) Collect intake using Template #1 (below).
2) Access setup:
   - Google: Client adds us as Manager to GBP (preferred). If not possible, client-post workflow.
   - Yelp: Default = client-post workflow unless client grants Yelp Business Owner/Manager access.
3) Review alerts:
   - Enable platform email alerts to: agent_bob_replit+review-bot@agentmail.to (or forward).
4) Create “Review Log” sheet tabs:
   - Reviews (all)
   - Escalations
   - Weekly KPIs
   - Response Library (approved snippets)

Daily cadence (Mon–Fri; weekends optional by plan)
1) Capture new reviews (2x/day recommended: morning + afternoon).
   - Source A: GBP → Reviews → New
   - Source B: Yelp → Reviews
2) Log every new review in the Reviews tab:
   Fields: Date, Platform, Location, Reviewer name, Stars, Review text, Category/theme, Status (Drafted/Needs Approval/Posted/Client Posted/Escalated), SLA due time, Link, Draft response, Final response, Notes.
3) Draft response using the Brand Voice + Rules from onboarding.
4) Apply auto-approval rules:
   - 4–5★: auto-post unless contains red-flag keywords.
   - 3★: draft + send to client for approval OR post if client opted into auto-post.
   - 1–2★: ALWAYS escalate + require approval before posting.
   - Red-flag keywords (always approval): refund, lawsuit, injury, discrimination, harassment, HIPAA/medical details, pricing disputes, threats, doxxing, staff names, profanity, “scam/fraud”.
5) QA step (fast):
   Check brand safety rubric: no admissions of fault, no private data, no incentives, no review gating language, no platform-policy violations.
6) Posting method:
   - If we have access: post directly in GBP/Yelp.
   - If client-post workflow:
     Email client with subject: “Review Reply Ready — [Platform] [Star] [Reviewer]” and paste the exact response + link.
     Client confirms once posted; ops updates status to “Client Posted”.

SLA standards (match package)
- Default SLA: within 24 business hours from detection.
- Priority for negatives: 1–2★ draft within 4 business hours + escalation sent immediately.

Escalation workflow (for 1–2★ and sensitive 3★)
1) Create Escalation ticket (Template #2).
2) Notify client POC via email with:
   - Review link, summary, suggested resolution steps, and a proposed public reply.
3) Track resolution status weekly: Open → In Progress → Resolved (public follow-up posted if appropriate).

Weekly KPI report (every Monday for prior week)
1) Pull metrics from Review Log + platform dashboards.
2) Fill the Weekly KPIs table (Template #3) and email client.
3) Include “Top 3 themes” and “Next-week actions”.

Platform constraints (policy)
- No incentivizing reviews, no gating (do not ask only happy customers), no fake reviews.
- We do not remove reviews; we can suggest dispute steps, but client must authorize actions.
- For regulated businesses (medical/legal), avoid discussing case details; keep replies generic and privacy-safe.

==============================
B) TEMPLATE #1 — ONBOARDING QUESTIONNAIRE (PASTE-READY)
==============================
Subject: Quick Onboarding — Review Reply & Reputation Autopilot (5 minutes)

Hi! To start your 7-day free launch, reply with the answers below (bullets are fine). If easier, you can paste links + short notes.

1) Business info
- Business name:
- Website:
- Primary location address(es):
- Service area (if applicable):
- Primary phone:

2) Review profiles (links)
- Google Business Profile review link:
- Yelp business page link:
- Any other review sites to monitor (optional):

3) Access preference (choose one per platform)
Google (GBP):
- Option A (preferred): Add agent_bob_replit+review-bot@agentmail.to as “Manager”
- Option B: Client-post workflow (we draft; you post)
Yelp:
- Option A: Add agent_bob_replit+review-bot@agentmail.to as manager access
- Option B (default): Client-post workflow (we draft; you post)

4) Brand voice (pick 1 + notes)
- ( ) Friendly & warm
- ( ) Professional & concise
- ( ) Premium / high-end
- ( ) Playful
Notes / examples of tone you like:

5) Must-say / must-not-say
- Words/phrases we should use (e.g., “free consult”, “family-owned”):
- Banned phrases (e.g., “cheap”, competitor names, guarantees):

6) Offers & CTAs (optional)
- Any offer to mention (if appropriate):
- Preferred call-to-action (call, book online, email):
- Booking link (if any):

7) Escalation contacts
- Primary contact name + email + phone:
- Backup contact:
- Hours you can respond to escalations:

8) Sensitive topics (check any that apply)
- ( ) Medical/health privacy
- ( ) Legal disputes
- ( ) Insurance billing
- ( ) Refunds/returns
- ( ) Staff safety concerns
Notes:

9) Approval rules
- 4–5★ replies can be auto-posted? (Yes/No)
- 3★ replies can be auto-posted? (Yes/No)
- 1–2★ always require approval (recommended): (Yes)

Once we have this, we’ll start same/next business day. You can always email us at agent_bob_replit+review-bot@agentmail.to.

==============================
C) TEMPLATE #2 — ESCALATION / INCIDENT TICKET + SLA POLICY (PASTE-READY)
==============================
Escalation Ticket (copy into email or sheet)

Ticket ID: [YYYYMMDD-Platform-Reviewer]
Client / Location: [Name + location]
Platform: [Google / Yelp]
Star rating: [1–5]
Reviewer: [Name]
Review link: [URL]
Date posted: [Date]
Detected at: [Timestamp]
SLA: Draft within 4 business hours; approval requested immediately; post after approval ASAP.

Summary (1–2 sentences):
- [What happened / what they claim]

Risk level (choose one):
- Low (service issue)
- Medium (pricing dispute / refund)
- High (legal threat, safety issue, discrimination claim, medical/legal privacy)

Recommended private action steps:
1) [Step]
2) [Step]
3) [Step]

Proposed public reply (draft):
[Paste reply]

Approval needed from:
- Name:
- Best contact:

Resolution status:
- Open / In Progress / Resolved
Resolution notes:
- [What was done]
Follow-up needed:
- [Yes/No + details]

SLA policy (what client can expect)
- 1–2★: escalation ticket + draft reply within 4 business hours (business days). Posting requires approval.
- Sensitive keywords: always require approval.
- If we cannot post directly (no access), we provide copy + link for client to post; SLA counts as “draft delivered”.

==============================
D) TEMPLATE #3 — WEEKLY KPI REPORT (EMAIL + TABLE LAYOUT)
==============================
Email subject: Weekly Reputation KPIs — [Business Name] — Week of [Date Range]

Email body:
Hi [Name],

Here are your weekly reputation KPIs for [Date Range] across Google and Yelp. Full detail is in the Review Log; highlights below.

1) Weekly summary
- New reviews: [#]
- Average rating (this week): [x.xx]
- Average rating (prior week): [x.xx] (Δ [+/−x.xx])
- Response rate (replied/new): [x%]
- Median response time: [x hrs]
- Negative reviews (1–2★): [#]
- Escalations opened: [#] | Resolved: [#] | Open: [#]

2) Top themes we’re seeing (from reviews)
- Theme 1: [e.g., “staff friendliness”] — [# mentions]
- Theme 2: [...]
- Theme 3: [...]

3) Actions taken
- Replies posted: [#]
- Replies drafted pending approval: [#]
- Key escalations: [1–3 bullets]

4) Next-week recommendations
- [Recommendation 1]
- [Recommendation 2]

Reply here if you want any wording adjusted or if you’d like us to prioritize a specific location/service line.

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

KPI Table Layout (paste into Google Sheet)
Columns:
- Week Start
- Week End
- Platform (Google/Yelp/All)
- Location
- New Reviews
- Avg Rating (This Week)
- Avg Rating (Prior Week)
- Rating Δ
- Replies Posted
- Response Rate
- Median Response Time (hrs)
- 1★ Count
- 2★ Count
- 3★ Count
- 4★ Count
- 5★ Count
- Escalations Opened
- Escalations Resolved
- Escalations Open (End of Week)
- Notes / Themes

==============================
E) DEFAULT “ACCESS & POSTING OPTIONS” (CLIENT-FACING SNIPPET)
==============================
To deliver week-1 without waiting on API access:
- Google (GBP): Preferred is adding us as a Manager so we can post directly. If you prefer not to grant access, we’ll draft replies and you can paste-post them.
- Yelp: Default is a client-post workflow (we draft; you post). If you grant Yelp manager access, we can post directly and reduce back-and-forth.

Either way, we can start immediately during the 7-day free launch, using the same SLAs for drafting and escalations.
