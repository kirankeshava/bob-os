# AI Review Reply & Reputation Autopilot — Ops Templates Pack (Onboarding + Escalations + Weekly KPI Report) + Default Policies

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T06:05:44.921Z

---

Below are paste-ready templates and default policies to operate the DFY Review Reply Autopilot + Weekly KPI Report and the White‑Label Agency plan immediately (no API dependency required).

WEBSITE + CONTACT (use in all customer comms)
- Proof/landing page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

DEFAULT PLATFORM WORKFLOW POLICY (Week 1 deliverability)
1) Google Business Profile (GBP): Default requirement = add us as Manager on the GBP location(s). This enables direct posting of owner responses.
2) Yelp: Default = “client-post workflow” (we draft responses; client posts them). If the client grants Yelp Business Owner access, we can post directly; otherwise we deliver copy/paste-ready replies via email.
3) No hard API dependency: We rely on platform access + notifications + human-in-the-loop QA.
4) Exclusions (must be explicit): No review gating, incentivizing reviews, purchasing reviews, deleting reviews, or disputing reviews on behalf of client without explicit written authorization.

DISCOUNT / SETUP WAIVER POLICY (protects $12k cash-in-month)
- DFY setup fee ($500) is standard and not discounted.
- Setup may be waived only if: (a) client has 2+ locations onboarded at once, OR (b) agency plan prepays 3 months upfront.
- Any other discount requires owner approval.

TEMPLATE 1 — ONBOARDING QUESTIONNAIRE (copy/paste into form or email)
Subject: Quick Onboarding — Review Reply & Reputation Autopilot

Hi {{FirstName}},

To start your AI Review Reply & Reputation Autopilot, please reply with the items below (or paste into a doc). This lets us draft brand-safe responses and start within 24–48 hours.

A) BUSINESS INFO
1) Business name:
2) Primary location address(es):
3) Website URL:
4) Top 3 services/products (and any you want to prioritize):
5) Business hours + phone:

B) PLATFORM ACCESS (choose one per platform)
GOOGLE BUSINESS PROFILE (preferred):
- Please add: agent_bob_replit+review-bot@agentmail.to as a Manager to your Google Business Profile location(s).
- If you can’t add access, confirm who will post replies on your team (name + email).

YELP:
- Option 1 (preferred): grant Yelp Business Owner access for direct posting.
- Option 2 (default): client-post workflow (we draft; your team posts). Who will post? (name + email)

C) BRAND VOICE + DO/DO NOT SAY
6) Brand voice (pick 2–3): friendly / professional / warm / concise / playful / luxury / clinical
7) Words/phrases we should NEVER use:
8) Offers we CAN mention (if any): (e.g., “10% off next visit”, “call us”, “free consult”) — include any required disclaimers
9) Topics to avoid entirely (pricing, medical, legal, refunds, staff names, etc.):
10) Languages needed (English only by default):

D) APPROVAL RULES
11) Auto-approval preference:
- Auto-post 4–5★ replies unless flagged? (Yes/No)
- Require approval for all 1–3★ replies? (Yes/No)
12) Who approves sensitive replies? (name + email + phone)

E) ESCALATION CONTACTS (NEGATIVE REVIEWS)
13) Primary escalation contact (name, role, email, phone):
14) Backup escalation contact:
15) Internal SLA for escalations (how fast can you respond to us?):

F) SUCCESS CRITERIA
16) What matters most in the next 30 days? (rating increase, response time, more reviews, fewer negatives, better messaging)
17) Any competitor(s) you want us to benchmark? (names or links)

Once we receive this, we’ll confirm your posting workflow and start drafting within the agreed SLA.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


TEMPLATE 2 — ESCALATION TICKET + SLA RULES (internal + client-facing)
Use this whenever a review is 1–3★ OR contains keywords: refund, lawsuit, discrimination, injury, HIPAA/medical details, staff misconduct, harassment, fraud, chargeback.

ESCALATION TICKET
- Ticket ID: ESC-{{YYYYMMDD}}-{{Client}}-{{Platform}}-{{Initials}}
- Client:
- Platform: Google / Yelp
- Review URL (if available):
- Rating: 1★ / 2★ / 3★
- Review date/time:
- Reviewer name:
- Review text (paste exact):
- Category tags (choose all): Service issue / Product issue / Billing / Wait time / Staff behavior / Quality / Delivery / Other
- Risk flags: Legal / Medical / Privacy / Threat / Profanity / None
- Recommended action (choose one):
  A) Respond publicly + invite offline resolution
  B) Request more details offline only (minimal public response)
  C) No response recommended (rare; explain)
- Proposed public reply (draft):
- Proposed private message (if platform supports):
- Owner approval required? Yes/No
- Approved by (name + timestamp):
- Posted by (us/client):
- Follow-up task: Call customer / Refund review / Rework job / Investigate
- Resolution status: Open / In progress / Resolved
- Resolution notes:

SLA RULES (what we promise + how we operate)
- Monitoring cadence: Daily business days (or 7 days/week if client is Pro).
- Drafting SLA:
  • 4–5★ reviews: draft within 24 hours.
  • 1–3★ reviews: draft within 12–24 hours + escalate immediately.
- Posting rule:
  • Auto-post allowed only for 4–5★ reviews AND no flagged keywords AND client opted into auto-approval.
  • All 1–3★ require explicit approval unless the client pre-approves a standard “offline resolution” response template.


TEMPLATE 3 — WEEKLY KPI REPORT (email + sheet layout)

A) WEEKLY EMAIL (send every Monday)
Subject: Weekly Reputation KPIs — {{BusinessName}} ({{StartDate}}–{{EndDate}})

Hi {{FirstName}},

Here are your weekly reputation KPIs for {{BusinessName}}.

TOPLINE
- New reviews this week: {{#}}
- Average rating (current): {{X.X}}
- Average rating (last week): {{X.X}} (Δ {{+/-}})
- Response rate (this week): {{%}} (responses / new reviews)
- Median response time: {{X}} hours

PLATFORM BREAKDOWN
Google:
- New reviews: {{#}} | Avg rating: {{X.X}} | Replied: {{#}} | Median reply time: {{X}}h
Yelp:
- New reviews: {{#}} | Avg rating: {{X.X}} | Replied: {{#}} | Median reply time: {{X}}h

NEGATIVE REVIEW MANAGEMENT
- 1–3★ reviews: {{#}}
- Escalations opened: {{#}}
- Resolved escalations: {{#}}
- Open escalations: {{#}} (see notes below)

TOP THEMES (from review text)
1) {{Theme1}} — {{#}} mentions
2) {{Theme2}} — {{#}} mentions
3) {{Theme3}} — {{#}} mentions

NOTES / RECOMMENDATIONS (next 7 days)
- {{Recommendation1}}
- {{Recommendation2}}

Links:
- Live dashboard/summary: {{LinkToSheetOrDoc}}
- Proof of service/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you want, we can add competitor benchmarking and a short monthly insights call.

Thanks,
Bob Smith
agent_bob_replit+review-bot@agentmail.to

B) KPI SHEET LAYOUT (tabs + columns)
Tab 1: WEEKLY SUMMARY
Columns:
- Week start
- Week end
- Platform (Google/Yelp/All)
- New reviews
- Avg rating (current)
- Avg rating (prev)
- Rating delta
- Replies posted
- Response rate
- Median response time (hrs)
- 1–3★ count
- Escalations opened
- Escalations resolved
- Open escalations
- Notes

Tab 2: REVIEW LOG
Columns:
- Date
- Platform
- Location
- Reviewer
- Rating
- Review text
- Drafted reply (Y/N)
- Posted reply (Y/N)
- Posted by (us/client)
- Draft time (timestamp)
- Post time (timestamp)
- Response time (hrs)
- Escalated (Y/N)
- Escalation ticket ID
- Theme tag

Tab 3: SALES / OFFERS IMPACT (optional)
Columns:
- Week
- Common praise points (for marketing)
- Common complaints (ops fixes)
- Suggested website copy updates
- Suggested frontline script updates

These templates are ready to paste into your onboarding email sequence, internal SOP docs, or a form tool. They align with the week-1 constraint: operate without Google/Yelp API access while maintaining brand safety via approvals and escalation rules.