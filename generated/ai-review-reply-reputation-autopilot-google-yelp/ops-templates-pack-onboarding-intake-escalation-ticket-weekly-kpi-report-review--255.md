# Ops Templates Pack — Onboarding Intake + Escalation Ticket + Weekly KPI Report (Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T05:31:46.420Z

---

Below are paste-ready templates you can use immediately to onboard and fulfill for DFY clients and white-label agency clients. Reference website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

====================================================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (Google/Yelp Review Reply Autopilot)
Send as a form/email. Subject: “Onboarding: Review Reply Autopilot — Access + Brand Voice”

Hi {{FirstName}},

Excited to get your Review Reply & Reputation Autopilot live. For reference, our service overview is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Please reply to this email with the items below (or paste into a shared doc). If anything is unknown, write “TBD”.

A) Business & Locations
1) Business name:
2) Primary category (e.g., dentist, medspa, HVAC):
3) Location(s) covered (address or GBP listing links):
4) Hours of operation:

B) Access (choose your mode)
Google Business Profile (GBP) — Required for us to post directly.
- Preferred: Add us as “Manager” to your GBP.
- Backup: We draft responses; you paste/post.

Yelp — Choose one:
Mode 1 (Access Mode): Add us as a user in Yelp Business.
Mode 2 (Client-Post Mode): We draft; you post. (Less seamless but works week 1.)

Please confirm:
5) GBP posting method: Direct posting (add Manager) OR Draft-only (client posts)
6) Yelp posting method: Access Mode OR Client-Post Mode
7) Best contact for access/setup: name + email + phone

C) Brand Voice & Policy Guardrails
8) Brand tone (pick 2–3): Warm / Professional / Funny / Direct / Luxury / Casual / Family-friendly / Clinical
9) Words/phrases to avoid (e.g., “cheap”, “discount”, competitor names):
10) Must-include phrases (e.g., “Thank you for your feedback”, “Call us at…”):
11) Offers/promos allowed in replies? Yes/No. If yes, list approved offer text:
12) Compliance constraints (medical/legal/financial claims to avoid):

D) Escalation & Service Recovery
13) Escalation contact(s) for negative reviews (name + email + phone):
14) Preferred resolution path:
   - Ask reviewer to call: {{phone}}
   - Direct to email: {{supportEmail}}
   - Direct to web form: {{url}}
15) Refund/redo policy summary (1–2 sentences we can reference):
16) When we should NOT engage publicly (e.g., active litigation, harassment):

E) Response Rules (defaults; confirm or edit)
17) Auto-approve replies for 4–5★ reviews unless flagged? Yes/No
18) Require your approval for 1–3★ reviews before posting? Yes/No
19) Approval window: same-day / within 24h / within 48h

F) Reporting
20) Weekly report recipient(s) (emails):
21) Preferred report day/time/timezone:
22) KPIs you care about most (choose): rating, volume, response rate, response time, negative review themes, resolved issues, keyword sentiment

Once we have this, we’ll start responding within {{SLA}} and send your first weekly KPI report next week.

Thanks,
{{YourName}}
{{YourEmail}}

====================================================================
TEMPLATE 2 — ESCALATION / TRIAGE TICKET + SLA (Internal + Client-Facing)
Use as a simple ticket (email + spreadsheet row). Subject: “Escalation: {{Business}} — {{Platform}} {{StarRating}}★ Review”

Escalation Ticket ID: {{YYYYMMDD-###}}
Client: {{BusinessName}}
Location: {{Location}}
Platform: Google / Yelp
Review Link: {{URL}}
Reviewer Name (if visible): {{Name}}
Star Rating: {{1-5}}
Date/Time Posted: {{timestamp}}

A) Classification (check one)
[ ] 1–2★ Service complaint
[ ] 1–2★ Staff behavior
[ ] 1–2★ Pricing/billing
[ ] 1–2★ No-show/appointment issue
[ ] 1–2★ Possible fake/competitor
[ ] 3★ neutral / mixed
[ ] Legal/medical/privacy risk keyword present

B) Risk Flags (check all that apply)
[ ] Mentions: HIPAA/PHI, “lawsuit”, “attorney”, “fraud”, “scam”, “discrimination”, “refund demanded”, “chargeback”, “police”, “injury”, “harassment”, “threat”
[ ] Contains private details (names, phone numbers)
[ ] Reviewer requests direct contact immediately

C) Draft Response Status
Draft prepared by: {{Agent}}
Draft link / text:
{{DraftText}}

D) Approval Rule Applied
Posting mode:
- Google: Direct post / Client-post
- Yelp: Access Mode / Client-post
Approval required?
- [ ] No (auto-approved per policy)
- [ ] Yes (client approval required)

Approval requested from: {{ClientContact}}
Approval sent at: {{timestamp}}
Approval due by (SLA): {{timestamp+24h}} (default)

E) Recommended Next Action (choose one)
[ ] Public reply + invite offline resolution
[ ] Hold reply; request internal facts first
[ ] Escalate to owner/GM immediately
[ ] Report review (platform policy) — client must authorize

F) Outcome Tracking
Resolution owner: {{Name}}
Customer contacted offline? Yes/No
Resolved? Yes/No
Resolution notes:
{{Notes}}
Final public reply posted? Yes/No
Posted at: {{timestamp}}

Client-facing SLA language (include in onboarding/proposal):
- 4–5★ reviews: draft within 24 hours (or 12 hours on Pro). Post automatically unless flagged.
- 1–3★ reviews: draft within 24 hours; we request approval before posting unless client opts into auto-post.
- Legal/medical/privacy risk: we pause and request guidance; no posting until approved.

====================================================================
TEMPLATE 3 — WEEKLY KPI REPORT (Email + Dashboard Layout)
Email Subject: “Weekly Reputation KPIs — {{Business}} ({{StartDate}}–{{EndDate}})”

Hi {{FirstName}},

Here’s your Weekly Reputation KPI report for {{StartDate}}–{{EndDate}}. (Service overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)

1) Volume & Rating
- New reviews this week: Google {{G_new}} | Yelp {{Y_new}} | Total {{T_new}}
- Average rating (current): Google {{G_avg}} | Yelp {{Y_avg}}
- Rating change vs last week: {{delta}}

2) Responsiveness
- Response rate (last 7 days): {{response_rate}}%
- Median response time: {{median_time}} (goal: {{SLA}})
- Replies posted: Google {{G_replies}} | Yelp {{Y_replies}}

3) Negative Reviews & Recovery
- 1–2★ reviews: {{neg_count}}
- Escalations opened: {{esc_opened}}
- Escalations resolved: {{esc_resolved}}
- Open escalations (need attention): {{esc_open}}

4) Themes (top 3)
- Theme #1: {{theme1}} ({{count1}} mentions)
- Theme #2: {{theme2}} ({{count2}} mentions)
- Theme #3: {{theme3}} ({{count3}} mentions)

5) Recommended Actions (next 7 days)
- {{action1}}
- {{action2}}
- {{action3}}

If you want, we can also add an SMS review-request flow to increase new positive reviews (optional add-on).

Thanks,
{{YourName}}
{{YourEmail}}

Dashboard layout (Google Sheet tabs)
TAB A: “Weekly Summary”
Columns:
Week Start | Week End | Google New Reviews | Yelp New Reviews | Total New Reviews | Google Avg Rating | Yelp Avg Rating | Total Replies Posted | Response Rate % | Median Response Time (hrs) | 1–2★ Count | Escalations Opened | Escalations Resolved | Notes

TAB B: “Review Log”
Date | Platform | Location | Star Rating | Reviewer | Review Text | Reply Status (Drafted/Posted/Pending Approval) | Escalation? (Y/N) | Theme Tag | Link

TAB C: “Escalations”
Ticket ID | Date | Platform | Star | Category | Risk Flags | Owner | Status (Open/Waiting/Resolved) | Next Step | Due Date

These three templates are sufficient to (1) close and onboard clients, (2) operate safely with human-in-the-loop controls, and (3) prove ROI weekly via a consistent KPI report.