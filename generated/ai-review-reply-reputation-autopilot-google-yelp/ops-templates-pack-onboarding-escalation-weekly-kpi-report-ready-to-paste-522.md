# Ops Templates Pack — Onboarding + Escalation + Weekly KPI Report (Ready to Paste)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:52:30.797Z

---

Below are 3 paste-ready templates you can use immediately to fulfill the AI Review Reply & Reputation Autopilot offers in week 1 without any API build.

============================================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (Google Form / Typeform / Doc)
============================================================
Subject: Review Reply Autopilot — Onboarding (takes ~7 minutes)

Welcome! To start your Review Reply & Reputation Autopilot, please complete this onboarding. If you get stuck, email us at agent_bob_replit+review-bot@agentmail.to.

A) Business & Locations
1) Business legal name:
2) Public-facing brand name (if different):
3) Website URL:
4) Primary location address (and any additional locations):
5) Main phone number:
6) Industry/category (dental, medspa, HVAC, etc.):

B) Review Profiles Access
7) Google Business Profile link (paste URL):
8) Are you able to add us as a Manager on Google Business Profile? (Yes/No)
   - If Yes: invite this email as Manager: agent_bob_replit+review-bot@agentmail.to
   - If No: we will use “Draft + Client-Post” workflow.
9) Yelp business page link (paste URL):
10) Yelp posting workflow preference:
   - Option A (default): Draft + Client-Post (we send approved reply text; you paste into Yelp)
   - Option B: Provide Yelp Business Owner/Manager access (if available)

C) Brand Voice & Reply Rules
11) Choose a reply tone (pick one): Friendly & brief / Warm & detailed / Formal / Premium concierge / Other:
12) Do you want to use the customer’s first name when available? (Yes/No)
13) Signature format (choose one): “—Team {Brand}” / “—{Name}, Owner” / “—Customer Care” / Other:
14) Any words/phrases we must NOT use? (e.g., “cheap”, “discount”, medical claims)
15) Any offers we CAN mention? (e.g., “Ask about our new patient special”) Include exact wording.
16) Compliance constraints (check any): HIPAA/medical / Legal / Financial / Other:

D) Escalation & Negative Review Handling
17) Escalation contact name:
18) Escalation contact email + phone:
19) Preferred escalation window for urgent issues (e.g., 9am–6pm):
20) Which reviews should ALWAYS be escalated? (check all)
   - 1★
   - 2★
   - 3★
   - Mentions “refund”, “lawsuit”, “attorney”, “chargeback”
   - Mentions discrimination/harassment/safety
   - Mentions injury/medical outcome
   - Mentions staff by full name
   - Other keywords (list):

E) Response Approval Mode
21) Approval mode (choose one):
   - Autopilot for 4–5★ (we post without approval when not flagged)
   - Always approve before posting (we send drafts)
22) For 1–3★ reviews, approval is required before posting. Who approves? (name + email)

F) Reporting
23) Weekly report recipient emails (comma-separated):
24) Best day/time to receive weekly KPI report:
25) Any competitors you want included in benchmarking (optional):

Confirmation
26) By submitting, you confirm we will never offer incentives for reviews or attempt to remove legitimate reviews, and you want brand-safe drafted replies posted or provided for posting.

Website for reference/legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

============================================================
TEMPLATE 2 — ESCALATION / TRIAGE TICKET + SLA (Use as Google Form + internal tracker)
============================================================
Title: Reputation Escalation Ticket (Required for 1–3★ or flagged keywords)

Ticket Metadata
- Ticket ID:
- Date/time created:
- Location:
- Platform: Google / Yelp
- Review URL:
- Star rating: 1 / 2 / 3
- Reviewer name/handle:
- Review date:

Why this is escalated (check all)
- 1★ or 2★
- Mentions refund/chargeback
- Mentions lawsuit/attorney
- Safety concern
- Medical outcome/health claim
- Discrimination/harassment
- Staff member named
- Potential fake review
- Other keyword: ________

Issue Summary (agent)
- One-sentence summary of complaint:
- Category: Billing / Wait time / Quality / Rude staff / Product issue / Other
- Severity: High / Medium / Low

Response Draft (agent)
- Proposed public reply text (paste):
- Proposed private action requested (if any):

Client Actions Needed
- What we need from the business to proceed (check all):
  - Confirm facts (what happened)
  - Provide resolution offer boundaries (refund/redo/no offer)
  - Provide contact name/phone for offline resolution
  - Approve/deny draft reply

SLA Rules (operational)
- 4–5★ reviews: respond within 24 hours (or faster if Pro tier)
- 1–3★ reviews: draft within 12 hours; do NOT post until approved
- High severity keywords: notify escalation contact within 1 hour during business hours; otherwise next business morning

Outcome Tracking
- Approved? (Y/N)
- Posted? (Y/N)
- Posting method: We posted (access) / Client-post
- Date/time posted:
- Resolution status: Open / In progress / Resolved
- Notes:

============================================================
TEMPLATE 3 — WEEKLY KPI REPORT (Email + Google Sheet layout)
============================================================
A) Weekly KPI Email (copy/paste)
Subject: Weekly Reputation KPI Report — {Business Name} — Week of {Date}

Hi {Name},

Here’s your weekly Reputation KPI snapshot for {Business Name}. Full details are tracked in our internal log; this email summarizes the metrics that impact calls, bookings, and walk-ins.

1) New Reviews (This Week)
- Google: {#}
- Yelp: {#}
- Total: {#}

2) Rating Trend
- Current average rating: {X.X}
- Change vs last week: {+/- X.XX}

3) Response Performance
- Response rate (replies / new reviews): {X}%
- Median response time: {X} hours
- SLA compliance: {X}% (target: 95%+)

4) Negatives & Escalations
- 1–3★ reviews received: {#}
- Escalations opened: {#}
- Escalations resolved: {#}
- Top negative themes (if any): {Theme 1}, {Theme 2}, {Theme 3}

5) Recommended Actions (Next 7 Days)
- {Action 1}
- {Action 2}
- {Action 3}

If you want us to adjust tone, banned phrases, or approval settings, reply to this email.

—Bob (Review Reply & Reputation Autopilot)
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

B) Weekly KPI Sheet Layout (columns to create in Google Sheets)
Tab 1: Weekly Summary
Columns:
- Week Start Date
- Week End Date
- Location
- Platform (Google/Yelp)
- New Reviews
- Avg Rating (end of week)
- Avg Rating (start of week)
- Rating Change
- Replies Posted
- Response Rate (=Replies Posted/New Reviews)
- Median Response Time (hrs)
- SLA Target (hrs)
- SLA Compliance %
- # 1–3★ Reviews
- Escalations Opened
- Escalations Resolved
- Open Escalations (end of week)
- Top Themes (comma-separated)
- Notes / Wins

Tab 2: Review Log (operational)
Columns:
- Date
- Platform
- Location
- Reviewer Name
- Stars
- Review Text (short)
- Flagged? (Y/N)
- Drafted By
- Draft Time
- Approved By
- Posted? (Y/N)
- Posted Time
- Posting Method (Access/Client-post)
- Escalated? (Y/N)
- Ticket ID
- Outcome

Tab 3: Competitor Benchmark (optional add-on)
Columns:
- Competitor Name
- Platform
- Avg Rating
- Total Reviews
- New Reviews (7d)
- Notable Themes

Default Yelp Constraint (so this is deliverable week 1)
- Yelp posting default is “Draft + Client-Post”: we provide the reply text (and approve internally), client pastes into Yelp.
- If the client grants Yelp Business Owner/Manager access, we can post directly; otherwise we do not block onboarding.

If you want, I can convert these into a single combined “Client Welcome Packet” (PDF/Doc) plus an internal checklist for daily ops and QA.