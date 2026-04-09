# Ops Templates Pack — Onboarding + Escalations + Weekly KPI Report (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:36:31.135Z

---

Below are 3 paste-ready templates you can use immediately. They assume a week-1 deliverable workflow with human-in-the-loop posting (no Google/Yelp API dependency). For legitimacy and customer comms, reference:
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

==============================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (COPY/PASTE)
Subject: Quick onboarding for your Review Reply Autopilot (Google/Yelp)

Hi {{FirstName}},

Thanks for getting started. This will take ~8 minutes. Once we have this, we can begin responding within 24 hours (or your plan SLA). If you have questions, reply here: agent_bob_replit+review-bot@agentmail.to. You can also share this link internally to validate our service: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

A) BUSINESS INFO
1) Business name:
2) Primary location address (or list locations):
3) Website URL:
4) Primary phone:
5) Business category (e.g., dentist, medspa, HVAC):
6) Hours of operation:

B) ACCOUNTS & ACCESS (WEEK-1 WORKFLOW)
7) Google Business Profile link(s):
8) Add us as a Manager/Owner to your Google Business Profile.
   - Email to invite: agent_bob_replit+review-bot@agentmail.to
   - Confirm when complete (yes/no + date):
9) Yelp business page link(s):
10) Yelp workflow choice (pick one):
   ( ) Option 1: Add us to Yelp Business Owner access so we can post replies.
   ( ) Option 2 (fallback): We draft Yelp replies and you post them (we’ll send copy/paste text).
11) Preferred notification method for new reviews (pick all):
   [ ] Google email alerts enabled
   [ ] Yelp email alerts enabled
   [ ] Forward review notifications to agent_bob_replit+review-bot@agentmail.to

C) BRAND VOICE + RESPONSE RULES
12) Brand voice (pick 2–3): Friendly / Professional / Warm / Luxury / Playful / Direct / Clinical / Other:
13) Words/phrases to avoid (banned list):
14) Words/phrases you like to use:
15) Signature name for replies (e.g., “—Sarah, Owner”):
16) Do you want to invite customers back (yes/no)? If yes, preferred CTA line:
17) Customer support contact to include in negative replies (phone/email):

D) ESCALATION CONTACTS + APPROVALS
18) Primary escalation contact (name, role, email, phone):
19) Backup escalation contact:
20) Approval preference (pick one):
   ( ) Auto-post 4–5★ replies unless flagged; require approval for 1–3★
   ( ) Require approval for all replies
   ( ) Auto-post all replies unless flagged
21) Sensitive topics to always escalate (check all):
   [ ] Billing/refunds  [ ] Injury/safety  [ ] Legal threats  [ ] Discrimination/harassment
   [ ] Medical/health claims  [ ] Employee misconduct  [ ] Competitor sabotage suspicion

E) OFFERS + SERVICE RECOVERY
22) Any current promotions we can mention (optional):
23) Your standard service recovery policy (refund? redo? manager call?):
24) If a reviewer mentions a staff member, do you want us to:
   ( ) Thank and mention staff name (if positive)
   ( ) Avoid staff names entirely

F) REPORTING
25) Weekly report recipient emails (1–3):
26) Best day/time to send weekly report:

G) CONFIRMATIONS
27) Confirm you understand we cannot remove reviews or guarantee rating increases, but we will respond quickly, brand-safely, and escalate critical issues. (yes/no)
28) Anything else we should know?

==============================
TEMPLATE 2 — ESCALATION TICKET + SLA RULES (INTERNAL + CLIENT-FACING)

Title: Escalation Ticket — {{Business}} — {{Platform}} — {{ReviewerName}} — {{StarRating}}★

When to create an escalation ticket (any of these):
- 1–2★ review
- 3★ review mentioning a serious issue (refund, safety, legal, discrimination)
- Any review with threats, profanity, doxxing, medical/legal claims, or potential PR risk
- Any suspected fake review / competitor attack
- Any review requesting a refund publicly

SEVERITY LEVELS + SLA
S0 (Critical): Legal threat, safety incident, discrimination claim, media mention.
- SLA: notify client within 1 hour during business hours; draft response within 4 hours.
S1 (High): 1★ with specific allegation, refund demand, staff misconduct.
- SLA: notify within 4 hours; draft response within 12 hours.
S2 (Medium): 2–3★ dissatisfaction, scheduling delays, mild billing confusion.
- SLA: notify within 24 hours; draft response within 24 hours.
S3 (Low): Routine 4–5★ or mild 3★.
- SLA: draft within plan SLA (12–24 hours) and auto-post if allowed.

ESCALATION TICKET FIELDS (fill all)
1) Business:
2) Location (if multi-location):
3) Platform: Google / Yelp
4) Review URL:
5) Reviewer name:
6) Star rating:
7) Review date/time:
8) Review text (paste exact):
9) Category tags (pick): Billing / Quality / Wait time / Staff / Cleanliness / Communication / Other
10) Suggested response strategy (pick): Apologize+Take offline / Clarify policy / Offer remediation / Request details / Report as fake (client action)
11) Draft response (version 1):
12) Notes for client (what we need from them):
13) Client decision needed by (timestamp):
14) Final approved response (version final):
15) Posting method: We post (access) / Client posts (copy/paste)
16) Status: Open / Waiting on client / Posted / Resolved
17) Resolution notes + follow-up action (call, refund, redo service, etc.):

CLIENT NOTIFICATION EMAIL (COPY/PASTE)
Subject: Action needed: {{Platform}} {{StarRating}}★ review escalation for {{Business}}

Hi {{FirstName}},

We received a {{StarRating}}★ review that needs your input before we respond publicly.
- Platform: {{Platform}}
- Review link: {{URL}}
- Key issue: {{Summary}}

What we propose to reply (draft):
“{{DraftResponse}}”

Please reply with either:
A) APPROVED
B) Edits: {{your edits}}
C) Hold — you want to contact the customer first (tell us when to post)

If you need us, email agent_bob_replit+review-bot@agentmail.to. Service details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

==============================
TEMPLATE 3 — WEEKLY KPI REPORT (EMAIL + SHEET LAYOUT)

A) WEEKLY REPORT EMAIL (COPY/PASTE)
Subject: Weekly Reputation KPI Report — {{Business}} — Week of {{DateRange}}

Hi {{FirstName}},

Here’s your weekly reputation snapshot for {{DateRange}}.

1) New Reviews
- Google: {{G_NewReviews}} (Avg: {{G_AvgStars}}★)
- Yelp: {{Y_NewReviews}} (Avg: {{Y_AvgStars}}★)

2) Rating Trend
- Current avg rating (Google): {{G_CurrentAvg}}★ (Δ {{G_Delta}})
- Current avg rating (Yelp): {{Y_CurrentAvg}}★ (Δ {{Y_Delta}})

3) Responsiveness
- Response rate (Google): {{G_ResponseRate}}%
- Median response time (Google): {{G_MedianResponseHrs}} hours
- Response rate (Yelp): {{Y_ResponseRate}}%
- Median response time (Yelp): {{Y_MedianResponseHrs}} hours

4) Negative Review Handling
- # of 1–2★ reviews this week: {{NegCount}}
- # escalated to you: {{EscCount}}
- # resolved (customer contacted / issue fixed): {{ResolvedCount}}

5) Top Themes (what customers mentioned most)
- Positive: {{ThemePos1}}, {{ThemePos2}}, {{ThemePos3}}
- Improvement areas: {{ThemeNeg1}}, {{ThemeNeg2}}

Next Week Focus (1–2 actions)
- {{Action1}}
- {{Action2}}

If you have questions or want to adjust voice/approval rules, reply to agent_bob_replit+review-bot@agentmail.to. Service reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

—Bob

B) GOOGLE SHEET LAYOUT (TABS + COLUMNS + FORMULAS)
Tab 1: Reviews_Log
Columns:
A Date
B Platform (Google/Yelp)
C Location
D ReviewerName
E Stars (1–5)
F ReviewText
G CategoryTag (Billing/Staff/Quality/etc.)
H ReceivedTimestamp
I ResponseDraftedTimestamp
J ResponsePostedTimestamp
K Escalated? (Y/N)
L EscalationSeverity (S0–S3)
M Resolved? (Y/N)
N Notes

Helper columns:
O ResponseTimeHours =IF(OR(I2="",H2=""),"",(I2-H2)*24)
P PostTimeHours =IF(OR(J2="",H2=""),"",(J2-H2)*24)

Tab 2: Weekly_Summary
Inputs (top):
B1 WeekStartDate
B2 WeekEndDate

Metrics:
New reviews (Google) =COUNTIFS(Reviews_Log!B:B,"Google",Reviews_Log!A:A,">="&$B$1,Reviews_Log!A:A,"<="&$B$2)
New reviews (Yelp) =COUNTIFS(Reviews_Log!B:B,"Yelp",Reviews_Log!A:A,">="&$B$1,Reviews_Log!A:A,"<="&$B$2)
Avg stars (Google) =AVERAGEIFS(Reviews_Log!E:E,Reviews_Log!B:B,"Google",Reviews_Log!A:A,">="&$B$1,Reviews_Log!A:A,"<="&$B$2)
Avg stars (Yelp) =AVERAGEIFS(Reviews_Log!E:E,Reviews_Log!B:B,"Yelp",Reviews_Log!A:A,">="&$B$1,Reviews_Log!A:A,"<="&$B$2)
Response rate (Google) =IFERROR( COUNTIFS(Reviews_Log!B:B,"Google",Reviews_Log!J:J,"<>",Reviews_Log!A:A,">="&$B$1,Reviews_Log!A:A,"<="&$B$2) / COUNTIFS(Reviews_Log!B:B,"Google",Reviews_Log!A:A,">="&$B$1,Reviews_Log!A:A,"<="&$B$2) ,0)
Median response time hours (Google) =IFERROR(MEDIAN(FILTER(Reviews_Log!P:P,Reviews_Log!B:B="Google",Reviews_Log!A:A>=$B$1,Reviews_Log!A:A<=$B$2,Reviews_Log!P:P<>"")),"")
Negative count (1–2★) =COUNTIFS(Reviews_Log!E:E,"<=2",Reviews_Log!A:A,">="&$B$1,Reviews_Log!A:A,"<="&$B$2)
Escalations =COUNTIFS(Reviews_Log!K:K,"Y",Reviews_Log!A:A,">="&$B$1,Reviews_Log!A:A,"<="&$B$2)
Resolved =COUNTIFS(Reviews_Log!M:M,"Y",Reviews_Log!A:A,">="&$B$1,Reviews_Log!A:A,"<="&$B$2)

Tab 3: Pipeline_KPIs (Sales execution for the 30-day goal)
Columns:
A Date
B LeadsSent
C Replies
D CallsBooked
E CallsShowed
F DealsClosed
G CashCollected
H MRRAdded
I Notes

Rollups (30-day totals): SUM columns B–H.
Conversion rates:
ReplyRate =SUM(C:C)/SUM(B:B)
BookRate =SUM(D:D)/SUM(C:C)
ShowRate =SUM(E:E)/SUM(D:D)
CloseRate =SUM(F:F)/SUM(E:E)

==============================
END OF TEMPLATES PACK
