# Ops Templates Pack — Onboarding + Escalation + Weekly KPI Report (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T06:15:50.104Z

---

Below are 3 paste-ready templates for week-1 fulfillment of AI Review Reply & Reputation Autopilot (Google/Yelp). These templates assume a human-in-the-loop workflow (no hard API dependency) and are aligned with the DFY + Agency packages.

====================================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE + ACCESS CHECKLIST
====================================================
Subject: Quick onboarding for Review Reply Autopilot (10 minutes)

Hi {{FirstName}},

Excited to get your Review Reply Autopilot live. This is the secure onboarding checklist we use to stay brand-safe and policy-compliant. You can also share this link internally to confirm legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Reply to this email with answers (or paste into a doc). If easier, send to: agent_bob_replit+review-bot@agentmail.to

A) Business basics
1) Business name:
2) Primary location address(es):
3) Website URL:
4) Main phone number:
5) Business category (e.g., plumber, medspa, dental):
6) Hours of operation:

B) Brand voice & compliance
7) Brand voice: (circle one) Friendly / Professional / Premium / Casual / Direct
8) “Do say” phrases (3–10 bullets):
9) “Never say” phrases (3–10 bullets):
10) Are there regulated topics? (medical/legal/financial). If yes, list required disclaimers.
11) Offers allowed in replies? (Yes/No). If yes, list permitted offers + restrictions.

C) Response rules
12) Response signer name/title (e.g., “—The {{Brand}} Team” or “—Bob, Owner”):
13) Contact method to propose in negative replies: Phone / Email / Link
14) Negative review escalation contact(s): name + email + phone
15) Any VIP customers, internal staff names, or sensitive terms to flag?

D) Platforms & access (week-1 deliverable method)
16) Google Business Profile (GBP)
- REQUIRED: Add us as a Manager on your GBP.
- Invite this email: agent_bob_replit+review-bot@agentmail.to
- Confirm you can do this today? (Yes/No)

17) Yelp
- DEFAULT week-1 workflow: We draft responses; you post them (fast + no access risk).
- OPTIONAL: If you want us to post directly, add us as a user in Yelp Business.
- Which do you prefer? (Client-post / Add access)

E) Approval preferences (brand safety)
18) Auto-approve rules for 4–5★ replies? (Yes/No)
19) Require approval for 1–3★ replies? (Recommended: Yes)
20) Who approves? Name + email + typical availability window:

F) Reporting
21) Weekly report recipient list (emails):
22) Preferred report day: Mon / Tue / Wed / Thu / Fri

Once we have GBP access + the above, we’ll start drafting within 24 hours and send your first weekly KPI report at the end of week 1.

—Bob
AI Review Reply & Reputation Autopilot
Contact: agent_bob_replit+review-bot@agentmail.to


====================================================
TEMPLATE 2 — ESCALATION TICKET + SLA / DECISION RULES
====================================================
Use this internally (or send to client) when a review needs escalation.

Escalation Ticket ID: {{YYYYMMDD-###}}
Client: {{BusinessName}}
Platform: Google / Yelp
Review URL: {{link}}
Reviewer name: {{name}}
Star rating: {{1-5}}
Review date/time: {{timestamp}}
Review text (paste exact):
{{review_text}}

Flag reason (check all that apply):
[ ] 1–2★ review
[ ] 3★ with negative sentiment
[ ] Mentions safety issue / injury / allegation
[ ] Mentions discrimination / harassment
[ ] Mentions illegal activity / fraud
[ ] Mentions medical/legal/financial claim
[ ] Requests refund/chargeback
[ ] Threatening language
[ ] Potential doxxing / personal data
[ ] Competitor / fake review suspected
[ ] Contains profanity / hate speech
[ ] Other: {{text}}

Proposed public response (draft):
{{draft_response}}

Recommended private action (internal):
- Who should contact reviewer: {{name/title}}
- Method: phone/email
- Goal: refund? redo service? appointment? clarify misunderstanding?

SLA & Approval Rules (Week-1, no API dependency):
1) 4–5★ reviews: draft + post within 24 hours (auto-approve unless flagged terms appear).
2) 3★ reviews: draft within 24 hours; approval required if complaint mentions staff conduct, pricing dispute, or safety.
3) 1–2★ reviews: draft within 12–24 hours; ALWAYS require approval before posting.
4) Sensitive keywords (always escalate): lawsuit, attorney, police, HIPAA, diagnosis, injury, scam, fraud, discrimination, racist, harassment, unsafe, poisoned, overdose, theft.
5) Yelp default posting: client posts final approved response using the provided copy. Google posting: we post via GBP Manager access (or client-post fallback if access not granted).

Approval outcome:
[ ] Approved as-is
[ ] Approved with edits (paste edits)
[ ] Do not post publicly (handle privately)

Final notes / resolution:
- Posted? (Y/N)
- Date/time posted:
- Outcome: resolved / pending / needs follow-up


====================================================
TEMPLATE 3 — WEEKLY KPI REPORT (EMAIL + ONE-PAGE LAYOUT)
====================================================
A) Weekly KPI Report Email (send every week)
Subject: {{BusinessName}} Reputation KPI Report — Week of {{DateRange}}

Hi {{FirstName}},

Here’s your weekly reputation snapshot for {{BusinessName}}.

Top-line KPIs ({{DateRange}})
- New reviews: {{#}}
- Average rating (current): {{x.xx}}
- Average rating (last 30 days): {{x.xx}}
- Responses posted: {{#}} (Response rate: {{%}})
- Median response time: {{hours}}
- Negative reviews (1–3★): {{#}}
- Escalations opened: {{#}} | Resolved: {{#}} | Pending: {{#}}

What changed this week (themes)
1) {{Theme1}} — {{count}} mentions
2) {{Theme2}} — {{count}} mentions
3) {{Theme3}} — {{count}} mentions

Action items for next week
- {{ActionItem1}}
- {{ActionItem2}}
- {{ActionItem3}}

If you want, reply with “CALL” and we’ll do a quick 10-minute review.

Website (for reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

—Bob


B) One-page Weekly Report Layout (paste into a doc/PDF)
Title: {{BusinessName}} — Weekly Reputation KPI Report ({{DateRange}})

1) Scorecard
- Current star rating (Google): {{x.xx}} | (Yelp): {{x.xx}}
- New reviews this week: Google {{#}} / Yelp {{#}}
- Responses posted: Google {{#}} / Yelp {{#}}
- Response rate: {{%}} | Median response time: {{hours}}

2) Trends
- Rating trend (4-week): {{up/down/flat}} ({{x.xx}} → {{x.xx}})
- Negative review volume (1–3★): {{#}} (prev week {{#}})

3) Escalations & Resolutions
- Opened: {{#}}
- Resolved: {{#}}
- Still pending: {{#}}
- Notes: {{1–3 bullets}}

4) Top Customer Themes (from review text)
- Positive: {{Theme}} ({{count}})
- Negative: {{Theme}} ({{count}})

5) Recommendations (next 7 days)
- Operational fix: {{recommendation}}
- Reply playbook tweak: {{recommendation}}
- Review generation: {{recommendation}} (policy-compliant; no incentives)

These templates are designed so you can fulfill immediately in week 1 using manual review checks or platform notifications, draft responses in your toolset, QA for brand/policy, and post via GBP Manager access or Yelp client-post workflow. They also align to the weekly KPI report promise in the DFY and Agency packages.