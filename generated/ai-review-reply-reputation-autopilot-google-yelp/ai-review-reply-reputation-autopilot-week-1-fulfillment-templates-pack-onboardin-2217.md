# AI Review Reply & Reputation Autopilot — Week-1 Fulfillment Templates Pack (Onboarding + Escalations + Weekly KPI Report)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T20:15:59.814Z

---

Below are 3 paste-ready templates to run fulfillment immediately (no API required). Use these for the 7-day free launch (week 1). Business legitimacy URL to share with customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Primary contact email for clients: agent_bob_replit+review-bot@agentmail.to

============================================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (COPY/PASTE)
Subject: Quick onboarding — review reply autopilot (10 minutes)

Hi {{FirstName}},

To start your 7-day free Review Reply & Reputation Autopilot, please reply to this email with the answers below (or paste into a Google Doc). If you want to verify the service/legitimacy page, here it is: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

A) Business + locations
1) Business name as shown on Google:
2) Location(s) included in this trial (address or GBP link):
3) Yelp business page link (if applicable):

B) Access (week-1 no-API workflow)
4) Google Business Profile: can you add us as a Manager? (preferred) Yes/No
   If Yes: please invite agent_bob_replit+review-bot@agentmail.to
   If No: we’ll draft responses and you’ll post (we’ll send copy/paste replies).
5) Yelp: default is client-post (we draft, you post). If you can grant Yelp Business Owner access, we can also post. Which do you prefer?
   ☐ Client-post (default)
   ☐ Grant access

C) Brand voice + rules
6) Brand voice: ☐ Friendly & casual ☐ Professional ☐ Luxury ☐ No-nonsense ☐ Other:
7) Signature name to use in replies (e.g., “— Sarah, Owner”):
8) Any words/phrases we must NOT use (e.g., “cheap”, “guarantee”, medical claims):
9) Any offers we CAN mention (optional):
10) Links we can include (website/booking/menu):

D) Escalation contacts + preferences
11) Best contact for urgent negatives (name + email + phone):
12) Business hours + preferred callback window:
13) Do you want us to request details offline for 1–2★ reviews? Yes/No

E) Review handling preferences
14) For 4–5★ reviews: can we auto-post without approval? Yes/No
15) For 1–3★ reviews: approval required before posting? (recommended) Yes/No
16) Any competitor names, staff names, or sensitive topics to handle carefully:

F) Success targets
17) Your current average rating (if known):
18) Your goal in 30 days (e.g., “respond to everything in 24h”, “recover 1-star situations”, “increase review volume”):

Once we have this, we’ll start drafting within 1 business day.

— Bob
agent_bob_replit+review-bot@agentmail.to

============================================================
TEMPLATE 2 — ESCALATION TICKET + SLA (INTERNAL + CLIENT-FACING)
Use this when a review is negative, legally sensitive, or requires owner intervention.

Escalation Ticket ID: {{YYYYMMDD-###}}
Client / Location: {{ClientName}} / {{Location}}
Platform: ☐ Google ☐ Yelp
Review URL: {{URL}}
Reviewer name: {{Name}}
Star rating: {{1-5}}
Review date/time: {{Timestamp}}
Review text (paste):
{{ReviewText}}

Classification (check all that apply):
☐ 1–2★ negative
☐ 3★ neutral/complaint
☐ Allegation of harm/safety issue
☐ Legal threat / discrimination claim
☐ Medical/financial sensitive claim
☐ Profanity/hate speech
☐ Mentions staff member by name
☐ Refund/billing dispute
☐ Suspected fake review

Draft response (proposed):
{{DraftResponse}}

Recommended action:
☐ Post after approval
☐ Do not post yet — gather facts
☐ Offer to continue offline (email/phone)
☐ Request order details / visit date
☐ Internal investigation needed

Owner/Manager questions (what we need answered):
1)
2)
3)

SLA RULES (WEEK 1 + ONGOING)
- 4–5★: respond within 24 hours (auto-post if client opted in).
- 3★: draft within 12–24 hours; recommend approval before posting.
- 1–2★ or sensitive flags: draft within 6–12 hours; approval REQUIRED before posting.
- If “Legal threat / harm claim / discrimination claim”: DO NOT post until owner approves and provides facts.

Client approval message (copy/paste):
Subject: Approval needed — response to {{StarRating}}★ review on {{Platform}}

Hi {{FirstName}},

We drafted a brand-safe response to a {{StarRating}}★ review. Please reply with either:
A) APPROVED
B) EDITS: (type changes)
C) HOLD: (we’ll pause posting)

Review link: {{URL}}
Proposed response:
“{{DraftResponse}}”

If Yelp is set to client-post, we’ll send final copy/paste format for posting.

— Bob
agent_bob_replit+review-bot@agentmail.to
Service page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

============================================================
TEMPLATE 3 — WEEKLY KPI REPORT (EMAIL + SHEET LAYOUT)
Send every Monday for prior Mon–Sun (or last 7 days).

A) CLIENT EMAIL (COPY/PASTE)
Subject: Weekly Reputation KPI Report — {{ClientName}} ({{StartDate}}–{{EndDate}})

Hi {{FirstName}},

Here’s your weekly Reputation KPI snapshot for {{StartDate}}–{{EndDate}}.

Top-line metrics
- New reviews: {{NewReviews}} (Google {{GNew}}, Yelp {{YNew}})
- Avg rating (current): {{AvgRating}} (change: {{WoWDelta}})
- Responses posted: {{ResponsesPosted}} / {{ReviewsNeedingResponse}} (response rate: {{ResponseRate}}%)
- Median response time: {{MedianResponseTime}}
- Negative reviews (1–2★): {{NegCount}} (Escalated: {{Escalations}}; Resolved/closed loop: {{Resolved}})

Themes we saw this week (top 3)
1) {{Theme1}}
2) {{Theme2}}
3) {{Theme3}}

Action items for next week
- {{Action1}}
- {{Action2}}
- {{Action3}}

Notes / risks
- {{RiskNotes}}

If you want, we can also set up a simple review-request flow (SMS/email) once the free week ends.

— Bob
agent_bob_replit+review-bot@agentmail.to
Service page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

B) KPI SHEET LAYOUT (GOOGLE SHEET TAB NAMES + COLUMNS)
Tab 1: “Weekly Summary” (one row per week)
Columns:
Week Start | Week End | Location | Platform Mix (G/Y) | New Reviews | Total Reviews (cum) | Avg Rating | Avg Rating WoW Δ | # Responses Posted | # Reviews Needing Response | Response Rate | Median Response Time (hrs) | 1★ Count | 2★ Count | 3★ Count | 4★ Count | 5★ Count | # Escalations | # Resolved | Top Theme 1 | Top Theme 2 | Top Theme 3 | Notes

Tab 2: “Review Log” (one row per review)
Review Date | Platform | Location | Reviewer | Stars | Review Text | Category/Theme | Drafted (Y/N) | Posted (Y/N) | Posted Date | Response Text | Escalated (Y/N) | Escalation ID | Status (Open/Waiting/Closed) | Owner Notes

Tab 3: “Pipeline KPI (30 days)” (sales execution, one row per day)
Date | Leads Sent | Replies | Reply Rate | Calls Booked | Shows | Closes | Close Rate (Shows) | Cash Collected | MRR Added | Active Trials | Active Paying | Churn Risks | Notes

Daily activity targets (to hit ~$12k cash-in-month plan):
- Leads/day: 40–45
- Replies/day: 6–7 (assume ~15% reply)
- Calls booked/day: 2–3 (assume ~35% book from replies)
- Shows/day: 1–2 (assume ~70% show)
- Closes/week: 2 (assume ~25% close on shows)

DEFAULT WEEK-1 POSTING METHOD (IMPORTANT)
- Google Business Profile: request Manager access so we can post. If not granted, we draft and client posts.
- Yelp: default is client-post (we draft, you post). If Yelp Business Owner access is granted, we can post; otherwise we send copy/paste responses.

COMPLIANCE / GUARANTEES (INTERNAL NOTE)
- Never incentivize reviews or do “review gating.”
- Never claim we can remove reviews.
- Never disclose private customer details in replies.
- Escalate legal/medical/safety claims before posting.
