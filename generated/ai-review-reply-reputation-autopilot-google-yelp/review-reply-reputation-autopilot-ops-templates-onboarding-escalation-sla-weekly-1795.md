# Review Reply & Reputation Autopilot — Ops Templates (Onboarding + Escalation SLA + Weekly KPI Report + Pipeline Targets)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T18:11:38.543Z

---

Below are paste-ready templates for week-1 fulfillment of AI Review Reply & Reputation Autopilot.

---
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (copy/paste into Google Form / Typeform / email)
Subject: Quick onboarding for Review Reply Autopilot (10 minutes)

Hi {{Name}},

To activate your Review Reply & Reputation Autopilot, please reply with the answers below. You can also review our overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

1) Business basics
- Business name:
- Website:
- Primary location address:
- Hours:
- Primary services (top 5):
- Any regulated claims we must avoid (medical, legal, financial, etc.):

2) Review profiles (links)
- Google Business Profile link(s):
- Yelp business page link(s):
- Any other review sites we should monitor (TripAdvisor, Facebook, etc.):

3) Access (week-1 options; no API required)
Google (choose one):
A) Add us as Manager on Google Business Profile (preferred)
B) We draft replies and you post them (client-post workflow)

Yelp (choose one):
A) Add us as a user in Yelp for Business (preferred)
B) We draft replies and you post them (client-post workflow)

Access contact who can grant permissions (name + email):

4) Brand voice + response rules
- Pick tone: (Professional / Friendly / High-end / Direct / Warm / Other)
- Do you want to sign replies as a person? If yes, name/title:
- 3 phrases we SHOULD use (e.g., “Thank you for choosing…”):
- 3 phrases we MUST NOT use:
- Any offers/coupons we can mention? (Yes/No + details + restrictions)
- Do you want us to invite unhappy customers to contact you offline? (Yes/No + preferred contact method)

5) Approvals
- Auto-approve 4–5★ replies? (Yes/No)
- Require approval for 1–3★ replies? (Yes/No)
- Approval method: (Email / Google Doc / Slack / Other)
- Approver name + email/phone:

6) Escalation
- Escalation contact for urgent issues (name + phone + email):
- Backup escalation contact:
- Keywords/topics that must be escalated immediately (e.g., “refund”, “lawsuit”, “injury”, “HIPAA”, “fraud”):

7) Reporting
- Where should weekly KPI reports be sent? (emails)
- Preferred day/time (e.g., Mondays 9am):

Once received, we’ll activate monitoring and begin responding under the agreed SLA.
Questions: agent_bob_replit+review-bot@agentmail.to

---
TEMPLATE 2 — ESCALATION / INCIDENT TICKET + SLA (use in Notion/Trello/Sheet)
Title: Review Escalation Ticket — {{Business}} — {{Platform}} — {{Date}}

A) Review details
- Platform: (Google / Yelp)
- Star rating: (1–5)
- Reviewer name/handle:
- Review URL:
- Review text (paste):
- Date/time posted:
- Location (if multi-location):

B) Severity (choose one)
- S1 Critical: legal threat, safety issue, discrimination allegation, medical/legal compliance risk, press risk
- S2 High: refund demand, severe service failure, repeat complaint, employee misconduct allegation
- S3 Standard: general dissatisfaction, minor complaint

C) SLA & handling rules
- S1: Draft reply within 2 hours; requires client approval before posting. Also draft internal response plan.
- S2: Draft reply within 12 hours; requires client approval before posting.
- S3: Draft reply within 24 hours; can be auto-posted if client opted into auto-approve for negative reviews; otherwise approval required.

D) Proposed public reply (draft)
[Paste proposed reply here]

E) Private action plan (internal)
- What happened (best guess):
- What we need from client (facts, receipt, staff names, timeline):
- Proposed resolution options (3 bullets):
- Who will contact the customer and how:

F) Approval
- Approver:
- Approved? (Yes/No)
- Notes/edits:
- Timestamp:

G) Posting & closure
- Posted by: (Autopilot team / Client)
- Posted timestamp:
- Outcome after 7 days: (updated rating? follow-up? no change?)
- Close reason: (Resolved / No response / Pending)

---
TEMPLATE 3 — WEEKLY KPI REPORT (email + dashboard table)
Subject: Weekly Reputation KPI Report — {{Business}} — Week of {{Date Range}}

Hi {{Name}},

Here’s your weekly Reputation KPI snapshot for Google/Yelp. Full overview: response coverage, rating trend, negative-review escalations, and themes we’re seeing.

1) KPI Summary (this week)
- New reviews: Google {{#}} | Yelp {{#}}
- Average star rating (this week): Google {{x.x}} | Yelp {{x.x}}
- 30-day average star rating: Google {{x.x}} | Yelp {{x.x}}
- Response rate (responded / new): Google {{%}} | Yelp {{%}}
- Median response time: Google {{hrs}} | Yelp {{hrs}}
- Negative reviews (1–3★): Google {{#}} | Yelp {{#}}
- Escalations opened: {{#}} | Escalations resolved: {{#}}

2) Highlights
- Positive themes customers mention (top 3):
  1)
  2)
  3)
- Issues to fix (top 3):
  1)
  2)
  3)

3) Actions taken
- Replies posted: {{#}}
- Drafts pending approval: {{#}} (links or pasted below)
- Escalation tickets: {{#}} (summary)

4) Recommended next actions (next 7 days)
- Operational fix:
- Training/script tweak:
- Customer follow-up:

If you want, we can also add competitor benchmarking and a negative-review playbook (add-ons).

Reply here with any notes: agent_bob_replit+review-bot@agentmail.to

Weekly KPI Dashboard Table Layout (copy into a Sheet)
Columns:
Week Start | Week End | Google New Reviews | Yelp New Reviews | Google Avg Rating | Yelp Avg Rating | Google Responses | Yelp Responses | Google Response % | Yelp Response % | Median Response Time (hrs) | Neg Reviews (1-3★) | Escalations Opened | Escalations Resolved | Top Positive Theme | Top Issue Theme | Notes/Actions

---
TEMPLATE 4 — DISCOUNT + ACCESS GATING (paste into proposal)
Access & Posting:
- Google: Client adds us as Manager on Google Business Profile (preferred). If not available, we operate in “draft-only” mode and client posts.
- Yelp: Client adds us in Yelp for Business (preferred). If not available, we operate in “draft-only” mode and client posts.
- We do not require any API access in week 1; workflow is human-in-the-loop.

Discount policy (to accelerate closes without breaking the $12k plan):
- Setup fee is standard.
- Setup fee may be waived only if client prepays 2 months upfront OR has 2+ locations on the same account.

---
TEMPLATE 5 — 30-DAY PIPELINE KPI DASHBOARD (targets for $12k month)
Goal mix (recommended): 6 DFY Growth + 2 Agency Starter within 30 days.
Assumptions (conservative outbound): 15% reply rate, 35% book rate from replies, 70% show rate, 25% close rate on shows.

Required activity math (approx):
- Deals needed: 8
- Shows needed: 8 / 0.25 = 32 shows
- Calls booked needed: 32 / 0.70 ≈ 46 booked calls
- Replies needed: 46 / 0.35 ≈ 132 replies
- Leads needed: 132 / 0.15 ≈ 880 leads
- Daily (30 days): ~30 leads/day, ~4–5 replies/day, ~1–2 calls booked/day, ~1 show/day, ~2 closes/week

KPI tracker columns (daily):
Date | New leads contacted | Replies | Calls booked | Calls held (shows) | Proposals sent | Closes | Cash collected | MRR added | Notes (objections, vertical learnings)

This kit is designed to let us onboard and fulfill immediately while avoiding Google/Yelp API dependencies until we choose to engineer deeper integrations later.