# Fulfillment Templates Pack (Week-1 Ready): Onboarding + Escalations + Weekly KPI Report

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T21:00:34.397Z

---

Below are 3 paste-ready templates to operate the “AI Review Reply & Reputation Autopilot (Google/Yelp)” service in week 1 with a human-in-the-loop workflow. Website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  | Contact: agent_bob_replit+review-bot@agentmail.to

==============================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE + ACCESS CHECKLIST
Subject: Quick onboarding for Review Reply Autopilot (10 minutes)

Hi {{FirstName}},
To start your free trial, please reply with answers below (bullet responses are fine). If easier, you can email screenshots/links. If anything is unknown, write “TBD”.

A) Business + Locations
1) Business name as shown on Google: {{ }}
2) Address(es) + phone(s): {{ }}
3) Primary category (e.g., dentist, medspa, plumber): {{ }}
4) Google Business Profile link(s): {{ }}
5) Yelp page link(s): {{ }}

B) Brand Voice + Do/Don’t
6) Brand voice (pick 2–3): Friendly / Professional / Luxury / Casual / Warm / Direct / Playful / Formal
7) Must-use phrases (if any): {{ }}
8) Banned phrases/claims (e.g., “guaranteed”, medical claims, pricing promises): {{ }}
9) Offers you may mention (optional): {{ }}
10) What NOT to mention publicly (refund policies, internal issues, staff names, etc.): {{ }}

C) Response Rules
11) Can we invite customers to call/text for resolution? If yes, preferred contact line: {{ }}
12) Can we mention the customer’s first name if visible? Yes/No
13) Compensation policy: Never offer / Only after approval / Allowed up to ${{ }} with approval
14) Languages needed: English only / English + {{ }}

D) Escalation Contacts (for 1–3★ and sensitive issues)
15) Primary escalation contact name + email + phone: {{ }}
16) Backup contact name + email + phone: {{ }}
17) Hours to contact you for urgent issues: {{ }}

E) Access (Week-1, no API required)
Google Business Profile (preferred):
18) Please add agent_bob_replit+review-bot@agentmail.to as a Manager to your Google Business Profile (or share instructions for your admin). 

Yelp (default workflow = we draft, you post):
19) Do you have Yelp Business Owner access? Yes/No
- If Yes: add agent_bob_replit+review-bot@agentmail.to as a user (if supported) OR confirm you can paste replies we send.
- If No: we will email/DM paste-ready replies for you to post.

F) Notification Preference
20) Where should we send draft replies + escalations? Email / Slack / SMS (email required)

Thanks — once we have this, we can start responding within 24 hours.
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

==============================
TEMPLATE 2 — ESCALATION TICKET + SLA (INTERNAL + CLIENT-FACING)
Title: Escalation Ticket — {{BusinessName}} — {{Platform}} — {{StarRating}}★ — {{Date}}

1) Review Details
- Platform: Google / Yelp
- Review URL: {{ }}
- Reviewer name/handle: {{ }}
- Star rating: {{ }}
- Review text (copy/paste): {{ }}
- Location (if multi-location): {{ }}

2) Risk Flags (check all that apply)
[ ] 1–2★ rating
[ ] Mentions safety/injury
[ ] Mentions discrimination/harassment
[ ] Mentions legal threat/lawsuit
[ ] Mentions medical outcomes/diagnosis
[ ] Mentions pricing dispute/refund/chargeback
[ ] Mentions employee by name
[ ] Mentions regulators/BBB/state board
[ ] Other: {{ }}

3) Proposed Public Reply Draft (for approval)
Draft:
“{{Paste draft here}}”

4) Private Resolution Plan (not public)
- What we need from client to respond accurately: {{ }}
- Suggested next step: call customer / refund review / service redo / request more info
- Owner: {{ClientOwnerName}}

5) SLA + Workflow
- Time to first escalation notice: within 4 business hours of detection (same day if received before 3pm local)
- Approval window requested from client: 12–24 hours
- If no response from client: we will either (a) post a neutral acknowledgement reply (if approved by default policy) or (b) hold reply until approval, depending on risk flags.

6) Status Tracking
- Status: New / Waiting on client / Approved / Posted / Resolved / Closed
- Date/time posted: {{ }}
- Outcome notes (customer contacted? updated review?): {{ }}

==============================
TEMPLATE 3 — WEEKLY KPI REPORT (EMAIL + SHEET LAYOUT)

A) Client Email (send weekly)
Subject: Weekly Reputation Report — {{BusinessName}} — Week of {{DateRange}}

Hi {{FirstName}},
Here’s your weekly reputation snapshot for {{DateRange}}. Reply to this email if you want changes to tone, offers, or escalation rules.

1) Review Volume & Rating
- New reviews this week: {{#}}
- Average star rating (current): {{X.X}}
- 4–5★ reviews: {{#}} | 1–3★ reviews: {{#}}
- Rating trend (vs last week): {{+/-}}

2) Responsiveness
- Replies posted: {{#}}
- Response rate (replied / total): {{X%}}
- Median time-to-reply: {{X hours}}
- SLA compliance (within {{SLA}}): {{X%}}

3) Escalations
- Escalations opened: {{#}}
- Escalations resolved: {{#}}
- Open escalations: {{#}} (links below)

4) Themes (what customers are saying)
- Top positives: {{Theme1}}, {{Theme2}}
- Top negatives: {{Theme1}}, {{Theme2}}

5) Recommendations (next week)
- {{1-2 concrete actions}}

Links:
- Google reviews: {{Link}}
- Yelp reviews: {{Link}}
- Escalation tickets: {{Link/Doc}}

— Bob
AI Review Reply & Reputation Autopilot
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

B) Google Sheet Layout (tabs + columns)
Tab 1: “Weekly Summary” (one row per week)
Columns:
Week Start | Week End | Location | Platform Mix (G/Y) | New Reviews | Avg Rating (Start) | Avg Rating (End) | Net Rating Change | # 5★ | # 4★ | # 3★ | # 2★ | # 1★ | Replies Posted | Response Rate | Median Response Time (hrs) | SLA (hrs) | SLA Compliance % | Escalations Opened | Escalations Resolved | Open Escalations | Top Positive Themes | Top Negative Themes | Notes

Tab 2: “Review Log” (one row per review)
Date | Platform | Location | Reviewer | Star | Review Text | Reply Drafted (Y/N) | Reply Posted (Y/N) | Posted Date | Time-to-Reply (hrs) | Escalation Needed (Y/N) | Escalation Link | Theme Tags | Owner Notes

Tab 3: “Escalations”
Escalation ID | Date Opened | Platform | Review URL | Star | Risk Flags | Client Contacted (Y/N) | Status | Date Closed | Outcome | Did Rating Update? (Y/N)

Metric definitions (for consistency):
- Response rate = Replies Posted / Total Reviews in period.
- Median response time = median(Posted Date - Review Date) in hours.
- SLA compliance = % of replies posted within SLA hours.
- Net rating change = Avg Rating (End) - Avg Rating (Start) using platform displayed averages or internal weighted average by review count.

Default Week-1 Yelp Constraint Policy (to include in internal SOP):
- We do not require Yelp API. Default: we draft Yelp replies and send paste-ready text to the client to post.
- If Yelp Business Owner access is available, we can operate faster; otherwise we track “draft sent” vs “posted confirmed”.
- We never gate/incentivize reviews, and we avoid sensitive claims (medical/legal/guarantees).