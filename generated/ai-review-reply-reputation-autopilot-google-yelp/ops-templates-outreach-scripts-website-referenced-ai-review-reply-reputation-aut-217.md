# Ops Templates + Outreach Scripts (Website-Referenced) — AI Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T04:54:36.053Z

---

## 1) Client Onboarding Questionnaire (paste into Typeform/Google Form/email)
Subject: Quick onboarding for Review Reply Autopilot (10 minutes)

Hi {{FirstName}},

To launch your Review Reply & Reputation Autopilot, please reply with the info below (or paste into a doc). Website for reference/legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

A) Business basics
1) Business name + primary location address:
2) Website URL:
3) Primary services (top 5):
4) Any offers we should mention (optional):

B) Brand voice (how replies should sound)
5) Choose tone: (Professional / Friendly / Warm / Luxury / Straightforward / Other: ___)
6) Words/phrases we should use often (3–10):
7) Words/phrases we must NOT use (banned list):
8) Do you want us to invite customers to call/text? If yes, what number?

C) Policies & boundaries
9) Topics we must never comment on publicly (pricing, refunds, medical advice, legal, etc.):
10) Do you want us to offer to “make it right” publicly on 1–3★ reviews (Yes/No)?
11) Preferred sign-off name (e.g., “—The {{BusinessName}} Team” or “—{{OwnerName}}”):

D) Escalation routing
12) Who should be alerted for negative reviews? Name + email + phone:
13) Backup contact:
14) Hours to contact (e.g., 9am–6pm):

E) Access (week-1 deliverable without API)
15) Google Business Profile: can you add us as a Manager? (Yes/No)
   If Yes: send invite to {{YOUR_EMAIL}} (role: Manager).
16) Yelp: choose one
   - Option 1 (Preferred): add us via Yelp Business Owner access (if available)
   - Option 2 (Fast start): Client-post workflow (we draft replies; you post)

F) Approval rules (choose default)
17) Auto-post 4–5★ replies (unless flagged)? (Yes/No)
18) Require approval for 1–3★ replies? (Yes/No)
19) Keywords that always require approval (examples: “refund”, “lawsuit”, “injury”, “HIPAA”, “fraud”):

G) Reporting
20) Weekly report recipient(s) email(s):
21) Best day/time to receive report:

Done — once we have this, we can start replying within 24 hours.

---

## 2) Escalation / Incident Ticket Template (copy into email/Slack/Sheet)
Title: [ESCALATION] {{BusinessName}} — {{Platform}} {{StarRating}}★ — {{ReviewerName}} — {{Date}}

Severity (choose one):
- S1 Urgent: legal/medical risk, threat, harassment, discrimination claim
- S2 High: 1★–2★ with specific allegation, refund/chargeback mention
- S3 Medium: 3★ complaint, service issue

Review details
- Platform: Google / Yelp
- Location: {{LocationName}}
- Link to review: {{URL}}
- Reviewer name/handle: {{ReviewerName}}
- Star rating: {{StarRating}}
- Review text (paste):

Proposed public response draft (for approval)
"{{DraftResponse}}"

Recommended internal action
- Contact customer? (Yes/No)
- Owner/manager to call within: 4h / 12h / 24h
- Suggested resolution options (no promises if policy forbids):

SLA & routing
- Alert sent to: {{PrimaryContact}} (email/text)
- Backup alerted if no response in: 2 hours (S1) / 6 hours (S2) / 12 hours (S3)
- Status: New / Waiting approval / Posted / Resolved / Monitoring
- Notes:

---

## 3) Weekly KPI Report (email + dashboard layout)

### Weekly email (paste-ready)
Subject: Weekly Reputation KPI Report — {{BusinessName}} ({{WeekStart}}–{{WeekEnd}})

Hi {{FirstName}},

Here’s your weekly reputation snapshot. (Service details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)

1) New reviews
- Google: {{G_NewReviews}} (avg {{G_AvgRatingThisWeek}}★)
- Yelp: {{Y_NewReviews}} (avg {{Y_AvgRatingThisWeek}}★)

2) Rating trend
- Current avg rating: {{CurrentAvg}}★ (Δ {{DeltaVsLastWeek}})

3) Responsiveness
- Response rate: {{ResponseRate}}%
- Median response time: {{MedianResponseTime}}
- Replies posted: {{RepliesPosted}}

4) Negative reviews & escalations
- 1–3★ reviews: {{NegCount}}
- Escalations opened: {{EscOpened}}
- Escalations resolved: {{EscResolved}}

5) Top themes this week
- {{Theme1}}
- {{Theme2}}
- {{Theme3}}

Next-week focus
- {{OneActionableRecommendation}}

Reply to this email if you want any wording changes to match your brand voice more closely.

Thanks,
{{YourName}}
{{YourTitle}}
{{YourEmail}} | {{YourPhone}}

### Dashboard layout (Google Sheet tabs)
Tab A: Daily Reviews Log
Columns: Date | Platform | Location | Reviewer | Stars | Review Text | Drafted (Y/N) | Posted (Y/N) | Response Time (hrs) | Escalated (Y/N) | Theme Tag

Tab B: Weekly KPI Summary
Fields:
- Week range
- Total new reviews (G/Y)
- Avg rating (current vs last week)
- Response rate
- Median response time
- # replies posted
- # escalations opened/resolved
- Top 3 themes

Tab C: Pipeline (if client is agency/white-label or for internal use)
Fields: Leads contacted | Replies | Calls booked | Shows | Closes | Cash collected | MRR added

---

## 4) Outreach Scripts (reference website URL)

### A) Cold email to owner/operator (local business)
Subject options:
1) Quick fix for Google/Yelp reviews at {{BusinessName}}
2) Are you replying to reviews daily?
3) We can handle review replies + weekly KPIs for {{BusinessName}}

Body:
Hi {{FirstName}},

I noticed {{BusinessName}} is getting reviews on {{Platform}}. Most local businesses lose bookings when replies are slow/inconsistent—especially on 1–3★ reviews.

We run an AI-assisted, brand-safe “Review Reply & Reputation Autopilot” that drafts (and can post) responses to Google Business Profile + Yelp, escalates negative reviews to you, and sends a weekly KPI report.

You can see what it is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 12-minute call this week? If you share your preferred tone, we’ll send 3 sample replies to your recent reviews first.

— {{YourName}}
{{YourEmail}} | {{YourPhone}}

### B) Follow-up #1 (48 hours)
Subject: Re: review replies for {{BusinessName}}

Hi {{FirstName}},

Should I send a few sample replies for your latest Google/Yelp reviews? If yes, what tone do you prefer (professional/friendly/luxury/straightforward)?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— {{YourName}}

### C) Agency/white-label outreach email
Subject: White-label review reply autopilot for your clients

Hi {{FirstName}},

If your agency manages local SEO, review replies are the time-sink clients still expect.

We provide a white-label Review Reply Autopilot: Google/Yelp reply drafting + escalation workflow + weekly KPI reporting per location. You keep the client relationship; we deliver the ops.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Want pricing for 3–10 locations and a 7-day pilot?

— {{YourName}}
{{YourEmail}} | {{YourPhone}}

### D) 12-minute call script (discovery + close)
1) Context (1 min): “How many reviews do you get per week on Google/Yelp? Who replies today?”
2) Pain (2 min): “Any negative reviews recently? How fast do you typically respond?”
3) Stakes (1 min): “Do you feel rating/recency affects calls/appointments?”
4) Offer (3 min): “We draft brand-safe replies daily, escalate 1–3★ within SLA, and send weekly KPIs. Week 1 can run without APIs: you can grant manager access or we do a client-post workflow.”
5) Proof (1 min): “Here’s our overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”
6) Close (3 min): “Best fit is DFY Growth at $1,250/mo + $500 setup (1 location). If you’re ready, we can onboard today; you’ll see replies within 24 hours.”
7) Next step (1 min): confirm onboarding form + access invite + start date.

---

## Default Yelp Policy (choose one)
A) Recommended default (faster closes): Yelp client-post fallback is allowed. We draft replies; client posts within 24h. If/when access is granted, we post directly.
B) Stricter policy (cleaner ops, more friction): Yelp Business Owner access required to start. If not granted, service covers Google only until access is provided.
