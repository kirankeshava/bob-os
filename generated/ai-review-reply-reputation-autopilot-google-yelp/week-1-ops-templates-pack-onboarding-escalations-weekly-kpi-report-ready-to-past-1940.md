# Week-1 Ops Templates Pack — Onboarding + Escalations + Weekly KPI Report (Ready to Paste)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T18:53:27.169Z

---

Below are three paste-ready templates to run Week-1 delivery of AI Review Reply & Reputation Autopilot with $0 spend. These reference the legitimacy URL and the operating inbox.

====================================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (Copy into a form/email)
Subject: Quick onboarding — Review Reply Autopilot

Hi {{FirstName}},

To start your free launch onboarding, reply to this email with answers below (bullet answers are fine). If you prefer, you can send a doc.

1) Business basics
- Business name:
- Primary location address(es):
- Website:
- Google Business Profile link:
- Yelp business page link:

2) Access (so we can post replies)
Google:
- Can you add us as a Manager on your Google Business Profile? (Preferred)
  Add this email: agent_bob_replit+review-bot@agentmail.to
- If you can’t add access, we can run “draft-only” and you post. Which do you prefer?

Yelp (Week 1 default = draft + you post; owner access preferred):
- Do you have Yelp Business Owner access? If yes, can you invite agent_bob_replit+review-bot@agentmail.to
- If not, we’ll send ready-to-post replies daily/weekly.

3) Brand voice & boundaries
- Brand voice (choose 2–3): Friendly / Professional / Warm / Direct / Luxury / Casual / Clinical / Playful
- Words/phrases we should NEVER use:
- Offers/discounts we should NEVER mention:
- Any compliance constraints? (medical, legal, financial, etc.)

4) Escalation contacts
- Name + email + phone for escalations (negative reviews, sensitive topics):
- Backup contact:
- Business hours (for response expectations):

5) Response policy preferences
- Do you want us to sign replies as the owner name, team name, or just the business?
- Do you want to invite unhappy reviewers to call/text? If yes, best number:
- Refund policy or resolution policy we should reference (if any):

6) Competitors (optional but helpful)
- 2–3 local competitors to benchmark against:

Proof / website
If you need a reference link for our program, here it is:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Thanks — once we have the above, we can start drafting replies within 24 hours.
— Bob
agent_bob_replit+review-bot@agentmail.to

====================================================
TEMPLATE 2 — ESCALATION TICKET + SLA (Internal + Client-Facing)
Title: Reputation Escalation Ticket

Ticket ID: {{YYYYMMDD-Client-###}}
Client: {{BusinessName}}
Platform: Google | Yelp
Review link: {{URL}}
Reviewer name (as shown): {{Name}}
Star rating: 1★ | 2★ | 3★ | 4★ | 5★
Review date/time: {{Timestamp}}
Review text (paste exact):
"{{ReviewText}}"

Category (choose one):
- Safety / Threat / Harassment
- Discrimination / Hate speech
- Medical/Legal/Financial sensitivity
- Refund/Billing dispute
- Allegation of misconduct
- Competitor/fake review suspicion
- Privacy issue (names, PHI, personal details)
- Other: {{ }}

Severity:
- S0 (Critical): legal/safety/privacy risk
- S1 (High): strong allegation, potential viral
- S2 (Medium): standard negative experience

SLA + workflow (Week 1)
1) Immediately draft a “holding response” if needed (S0/S1): acknowledges concern, invites offline resolution, avoids admissions.
2) Require human approval BEFORE posting for:
- All 1–3★ reviews
- Any review mentioning injury, legality, discrimination, fraud, privacy, or explicit threats
- Any demand for refund/chargeback
3) Auto-approve allowed ONLY for:
- 4–5★ reviews with no sensitive content
- 3★ neutral reviews with no sensitive keywords (optional)
4) Response timing targets:
- 4–5★: within 24 hours
- 3★: within 24 hours (approval optional)
- 1–2★: draft within 12 hours; post after client approval
5) Resolution tracking fields:
- Client contacted reviewer? Y/N
- Outcome: resolved / pending / unable to reach
- Follow-up date:

Client escalation email snippet (paste into email/Slack):
Subject: Approval needed — {{Platform}} {{Star}} review for {{BusinessName}}

Hi {{FirstName}},
A new {{Star}} review came in on {{Platform}} that requires approval before we post.

Review: “{{ReviewText}}”
Link: {{URL}}

Recommended response (ready to post):
{{DraftReply}}

Reply with: APPROVE / EDITS (paste changes) / HOLD.
— Bob (agent_bob_replit+review-bot@agentmail.to)

====================================================
TEMPLATE 3 — WEEKLY KPI REPORT (Email + Sheet Layout)

A) Weekly email (send every {{Day}})
Subject: Weekly Reputation KPI Report — {{BusinessName}} ({{StartDate}}–{{EndDate}})

Hi {{FirstName}},

Here’s your weekly reputation snapshot for {{BusinessName}}.

1) New reviews
- Google: {{G_New}} new (Avg {{G_AvgThisWeek}}★)
- Yelp: {{Y_New}} new (Avg {{Y_AvgThisWeek}}★)

2) Rating trend
- Current Google rating: {{G_RatingNow}}★ (was {{G_RatingPrev}}★)
- Current Yelp rating: {{Y_RatingNow}}★ (was {{Y_RatingPrev}}★)

3) Responsiveness
- Replies posted: {{RepliesPosted}}
- Response rate: {{ResponseRate}}%
- Median response time: {{MedianRespTime}} hours

4) Negative-review handling
- New 1–2★ reviews: {{NegCount}}
- Escalations opened: {{EscOpened}}
- Escalations resolved: {{EscResolved}}
- Top negative themes (1–3): {{Theme1}}, {{Theme2}}, {{Theme3}}

5) Recommendations for next week (quick wins)
- {{Rec1}}
- {{Rec2}}

If you want, we can also add competitor benchmarking and a short “negative-review playbook” for staff (add-on).

Proof/Program link (if forwarding internally):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

B) Google Sheet layout (tabs + columns)
Tab 1: Weekly Summary
Columns:
Week Start | Week End | G New Reviews | Y New Reviews | G Rating Start | G Rating End | Y Rating Start | Y Rating End | Replies Posted | Response Rate % | Median Response Time (hrs) | 1★ Count | 2★ Count | Escalations Opened | Escalations Resolved | Top Theme 1 | Top Theme 2 | Top Theme 3 | Notes

Tab 2: Review Log
Columns:
Date | Platform | Reviewer | Stars | Review Text | Drafted By | Draft Time | Posted? (Y/N) | Post Time | Approval Needed? (Y/N) | Approved By | Escalation ID | Theme Tag | Link

Tab 3: Pipeline + Delivery KPIs (internal 30-day)
Day | Leads Sent | Replies | Calls Booked | Calls Showed | Closes | Cash Collected ($) | MRR Added ($) | Reviews Replied Today | SLA Met % | Escalations Open | Escalations Resolved

Daily activity targets (from plan assumptions; adjust as actuals come in):
- Leads/day: 40–45
- Replies/day: 6–7
- Calls booked/day: 2–3
- Shows/day: 1–2
- Closes/week: 2 (to reach ~8 deals / 30 days)

These templates are designed so Week-1 delivery works with no API work: we draft responses daily, use manager access where available, and otherwise send ‘ready-to-post’ responses to the client with approvals required for 1–3★ or sensitive content.
