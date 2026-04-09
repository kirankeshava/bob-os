# Ops Templates Pack — Onboarding + Escalation + Weekly KPI Report (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:06:13.223Z

---

Below are 3 paste-ready templates to run delivery in week 1. They assume a “human-in-the-loop” workflow (we draft + QA; posting via access when possible; Yelp client-post fallback).

BUSINESS LEGITIMACY LINKS/CONTACT
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Delivery/Support email: agent_bob_replit+review-bot@agentmail.to

====================================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (COPY/PASTE)
Subject: Quick onboarding to start responding to your Google/Yelp reviews in 24 hours

Hi {{ClientName}},

To start your Review Reply & Reputation Autopilot, please reply to this email with the info below (or paste into a doc). Once we have it, we’ll begin drafting responses within 1 business day.

A) BUSINESS + ACCESS
1) Business name + location(s):
2) Primary contact for approvals (name/phone/email):
3) Escalation contact for negative reviews (name/phone/email):
4) Google Business Profile (GBP):
   - Can you add us as a Manager? (preferred)
   - If yes, invite: agent_bob_replit+review-bot@agentmail.to
   - If no, do you want “draft-only” where we send replies for you to post?
5) Yelp:
   - Default: draft-only (we send responses; you paste/post)
   - If you want us to post directly, please add Business Owner access (if available) or confirm the best way to grant access.

B) BRAND VOICE (WHAT TO SOUND LIKE)
6) Choose tone (pick one): Friendly / Professional / Warm & premium / Casual / Other:
7) Do you want to sign replies as a person? (e.g., “—Sam, Owner”):
8) Words/phrases to use often (e.g., “thank you,” “we appreciate,” “locally owned”):
9) Words/phrases NEVER to use (banned phrases):

C) RULES (IMPORTANT)
10) Do NOT mention pricing, promos, insurance, or discounts unless approved? (Yes/No)
11) Do NOT mention medical/legal details? (Yes/No)
12) Are there compliance constraints? (HIPAA, financial, legal, etc.):

D) OPERATIONS
13) Business hours:
14) Preferred response window for negative reviews (call-back time):
15) Customer support line / scheduling link to reference (optional):
16) Top 3 services/products you want emphasized subtly in replies:

E) “MAKE IT RIGHT” GUIDANCE (NEGATIVE REVIEWS)
17) What remedies are allowed? (refund, redo, discount, call manager, etc.)
18) Red lines (what you never offer):
19) If a reviewer mentions staff by name, do we acknowledge names? (Yes/No)

F) SUCCESS METRICS
20) Your goal for the next 30 days (pick up to 2): Improve rating / Increase review volume / Faster responses / Reduce 1-star impact / Improve conversion

Once received, we will:
- Start daily monitoring and drafting
- Send approval requests for flagged reviews
- Deliver a weekly KPI report

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

—Bob

====================================================
TEMPLATE 2 — ESCALATION TICKET + SLA RULES (INTERNAL + CLIENT-FACING)
Use this whenever a review is 1–3 stars OR contains risk keywords.

ESCALATION TRIGGERS (AUTO-FLAG)
- Rating: 1★, 2★, 3★
- Keywords: “refund”, “lawsuit”, “scam”, “fraud”, “BBB”, “attorney”, “HIPAA”, “privacy”, “discrimination”, “racist”, “sexual”, “assault”, “stole”, “chargeback”, “police”, “unsafe”, “injury”, “infection”, “malpractice”
- Mentions employee by full name + allegation
- Requests removal / threatens platform complaint

SLA PROMISES (WHAT WE SELL)
- Drafting SLA: within {{SLAHours}} hours of detection (Growth=24h, Pro=12h)
- Escalation notification SLA: within 4 business hours of flagging (email + optional SMS if purchased)
- Approval window: client requested within 24h; if no response, we hold posting (do not auto-post negative review replies)

ESCALATION TICKET (COPY/PASTE FORM)
Ticket ID: {{YYYYMMDD-Client-###}}
Date/time detected:
Platform: Google / Yelp
Reviewer name + link:
Star rating:
Review text (paste):
Risk flags (choose): Legal / Medical / Privacy / Threat / Employee allegation / Other
Proposed response draft (v1):

Client action requested (choose one):
1) APPROVE response as-is
2) EDIT: please specify changes
3) DO NOT RESPOND publicly (we will log as “no public reply”)
4) TAKE OFFLINE ONLY: provide contact name/number to include

Internal notes:
- Recommended approach: Apologize + acknowledge + invite offline contact + no admissions of wrongdoing + no PHI/PII.
- If reviewer is identifiable patient/customer: avoid details; keep generic.

CLIENT-FACING EMAIL (SEND WHEN ESCALATED)
Subject: Approval needed — response to a {{Star}}★ review on {{Platform}} (Ticket {{TicketID}})

Hi {{ClientName}},

We flagged a {{Star}}★ review that requires approval before posting.

Link: {{ReviewLink}}
Review (copy):
“{{ReviewText}}”

Recommended response draft:
“{{DraftReply}}”

Reply with one of:
- APPROVE
- EDIT: (paste changes)
- HOLD (no public response)

If you want us to route this to the right person, tell us who should handle it.

Support: agent_bob_replit+review-bot@agentmail.to
Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

—Bob

====================================================
TEMPLATE 3 — WEEKLY KPI REPORT (EMAIL + SHEET LAYOUT)

A) WEEKLY EMAIL (COPY/PASTE)
Subject: Weekly Reputation KPI Report — {{BusinessName}} ({{StartDate}}–{{EndDate}})

Hi {{ClientName}},

Here’s your weekly Reputation KPI snapshot for {{BusinessName}}.

1) Review Volume
- New reviews: {{NewReviews}} (Google: {{G_New}} | Yelp: {{Y_New}})
- Total reviews (current): Google {{G_Total}} | Yelp {{Y_Total}}

2) Rating Health
- Avg rating (current): Google {{G_Avg}} | Yelp {{Y_Avg}}
- Change vs last week: {{Delta}}
- Negative reviews (1–3★): {{NegCount}} (Escalated: {{EscalatedCount}} | Resolved offline: {{ResolvedCount}})

3) Responsiveness (Key Conversion Signal)
- Response rate this week: {{ResponseRate}}%
- Median response time: {{MedianResponseTime}} hours
- Replies posted: {{RepliesPosted}} (Draft-only queued: {{DraftQueued}})

4) Themes (What customers are saying)
Top positives:
- {{ThemePos1}}
- {{ThemePos2}}
Top issues:
- {{ThemeNeg1}}
- {{ThemeNeg2}}

5) Recommendations (next 7 days)
- {{Reco1}}
- {{Reco2}}

If you’d like, we can add competitor benchmarking or review-request SMS to increase review volume.

Support: agent_bob_replit+review-bot@agentmail.to
Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

—Bob

B) GOOGLE SHEET LAYOUT (ONE TAB PER CLIENT)
Create columns exactly as below; enter rows daily (or per batch).

Tab: WEEKLY_SUMMARY
Row fields:
- Week Start
- Week End
- Google New Reviews
- Yelp New Reviews
- Total New Reviews (formula)
- Google Avg Rating (current)
- Yelp Avg Rating (current)
- Negative Reviews (1–3★)
- Replies Posted
- Drafts Sent (client-post)
- Response Rate % (Replies Posted / Total New Reviews; adjust if replying to older reviews)
- Median Response Time (hrs)
- Escalations Opened
- Escalations Resolved
- Notes

Tab: REVIEW_LOG (optional but recommended)
Columns:
- Date detected
- Platform (Google/Yelp)
- Review link
- Reviewer name
- Star rating
- Review text
- Drafted reply
- Status (Drafted / Sent for approval / Approved / Posted / Held)
- Posted date
- Response time hours (Posted date - detected date)
- Escalation? (Y/N)
- Ticket ID
- Outcome notes

====================================================
DEFAULT WEEK-1 WORKFLOW RULE (CLARITY)
- Google: Preferred is GBP Manager access so we can post responses directly. If not granted, we operate in draft-only mode.
- Yelp: Default is draft-only (we draft; client posts) to avoid API/access constraints. If Yelp Business Owner access is available, we can post directly.
- Negative reviews (1–3★) never auto-posted: always require client approval unless client explicitly opts into “pre-approved templates” for certain categories.

These templates are ready to paste into your ops docs, email sequences, and onboarding flow today.