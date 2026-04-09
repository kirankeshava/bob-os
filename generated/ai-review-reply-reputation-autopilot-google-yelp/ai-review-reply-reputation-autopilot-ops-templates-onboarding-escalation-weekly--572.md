# AI Review Reply & Reputation Autopilot — Ops Templates (Onboarding + Escalation + Weekly KPI Report) + Outreach Copy

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:23:11.516Z

---

# 1) Client Onboarding Questionnaire (copy/paste)

**Subject:** Review Reply Autopilot — Onboarding (5 minutes)

Hi {{FirstName}},

To start drafting and posting brand-safe replies, please answer the questions below. If easier, reply with short bullets. You can also send screenshots.

**Business + Access**
1) Business name + primary location address:
2) Website URL:
3) Google Business Profile (GBP) link:
4) Do you grant **GBP Manager access**? (Recommended)
   - If yes: invite **agent_bob_replit+review-bot@agentmail.to** as Manager.
   - If no: we’ll use “draft + you post” workflow.
5) Yelp business page link:
6) Yelp access preference (choose one):
   - A) You grant Yelp Business Owner access (if available)
   - B) Default: **we draft, you post** (copy/paste)

**Brand Voice + Compliance**
7) Brand voice (choose 2–3): Friendly / Professional / Warm / Direct / Luxury / Playful / Clinical / Other:
8) Any words/phrases to avoid (banned list):
9) Any promises we must not make (compliance):
10) For regulated industries (medical/legal/financial): do you require approval for *all* replies? (Yes/No)

**Customer Service + Escalations**
11) Primary escalation contact (name, email, phone):
12) Secondary escalation contact:
13) Refund/redo policy in 1–2 sentences:
14) Scheduling or support link to share in replies (if any):
15) Are you okay with us offering a “make it right” next step (e.g., ‘Call us at X / email Y’)? (Yes/No)

**Review Reply Rules**
16) Default signer name in replies (e.g., “— Bob, Owner” or “— The {{Business}} Team”):
17) Any competitor mentions, legal threats, HIPAA/PII sensitivity, or special constraints:
18) Incentives: confirm you will **not** request/offer incentives for reviews (required): Yes

**Weekly Reporting**
19) Report recipient emails (1–3):
20) Best day/time to receive weekly KPI report:

**Confirmation**
21) Reply “APPROVED” if we can auto-respond to 4–5★ reviews unless flagged. (1–3★ always escalated by default.)

—
If you want a legitimacy link to share internally, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1


# 2) Escalation Ticket Template + SLA Rules (internal + client-facing)

## 2A) Escalation Rules (default)
**Escalate immediately (no auto-post) if any of the following:**
- Rating is **1–3 stars** (or any review expressing dissatisfaction)
- Mentions: refund, scam, lawsuit, lawyer, BBB, chargeback, fraud, discrimination, harassment
- Medical/legal/financial claims, privacy concerns, HIPAA/PII, or “you told me my diagnosis…”
- Employee named explicitly or allegation of misconduct
- Requests a direct remedy (refund, redo) or threatens social media/news

**Auto-approve eligible (post without approval) if:**
- **4–5★** and no flagged keywords
- No customer private info
- No pricing disputes or legal/compliance issues

**Response SLA (DFY plans):**
- Growth: responses drafted within **24 business hours**
- Pro: responses drafted within **12 business hours**
- Escalations: acknowledgement draft within **4 business hours** (business hours)

**Yelp default workflow:**
- We draft response in the shared doc/thread → client posts (copy/paste) unless Yelp Owner access is granted.


## 2B) Escalation Ticket (copy/paste)
**Subject:** Escalation — {{Platform}} {{StarRating}}★ Review (Action Needed)

**Client:** {{BusinessName}} / {{Location}}
**Platform:** Google | Yelp
**Review URL:** {{URL}}
**Reviewer name:** {{Name}}
**Star rating:** {{1-5}}
**Date posted:** {{Date}}

**Review text (verbatim):**
“{{ReviewText}}”

**Why escalated (check all):**
- 1–3★ rating
- Refund/chargeback/legal threat
- Compliance/PII risk
- Employee misconduct allegation
- Other: {{Other}}

**Recommended response approach (draft direction):**
- Apologize + acknowledge
- Offer offline resolution path
- Avoid admissions of fault beyond policy
- Request order/date info privately

**Questions for business (reply inline):**
1) Did this person purchase/visit? (Yes/No/Unsure)
2) What happened from your perspective (2–3 bullets)?
3) What remedy are you willing to offer (if any)?
4) Best phone/email for them to contact:

**Draft reply (awaiting approval):**
{{DraftReply}}

**Approval needed by:** {{Deadline}} (per SLA)


# 3) Weekly KPI Report — Email + Sheet Layout (paste-ready)

## 3A) Weekly KPI Email Template
**Subject:** Weekly Reputation Report — {{BusinessName}} ({{WeekStart}}–{{WeekEnd}})

Hi {{FirstName}},

Here’s your weekly reputation snapshot for **{{BusinessName}}**.

**Top-line KPIs (this week)**
- New reviews: **{{NewReviews}}** (Google {{GNew}} / Yelp {{YNew}})
- Average rating: **{{AvgRating}}** (change vs last week: {{DeltaAvg}})
- Response rate: **{{ResponseRate}}%**
- Median response time: **{{MedianResponseTime}}**
- Negative reviews (1–3★): **{{NegCount}}**
- Escalations opened: **{{EscOpened}}** | Resolved: **{{EscResolved}}**

**What we posted (highlights)**
- 5★ themes: {{TopPositiveThemes}}
- Issues to watch: {{TopNegativeThemes}}

**Open items / needs your input**
- {{Escalation1}}
- {{Escalation2}}

**Next-week focus**
1) {{Focus1}}
2) {{Focus2}}

If you want to share our service internally, our site is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Reply to this email or reach us at **agent_bob_replit+review-bot@agentmail.to** for any changes to brand voice or escalation rules.

— Bob


## 3B) Weekly KPI Sheet Layout (Google Sheet tabs/columns)
**Tab 1: Weekly Summary** (one row per week)
- Week Start | Week End
- Google: New Reviews | Avg Rating | 1★ | 2★ | 3★ | 4★ | 5★
- Yelp: New Reviews | Avg Rating | 1★ | 2★ | 3★ | 4★ | 5★
- Total New Reviews
- Response Rate % (= Responses Posted / New Reviews)
- Median Response Time (hrs)
- Escalations Opened | Escalations Resolved | Open Escalations
- Notes / Themes

**Tab 2: Review Log** (one row per review)
- Date | Platform | Reviewer | Stars | Review URL | Review Text
- Category (optional) | Sentiment (Pos/Neutral/Neg)
- Drafted By | Draft Time | Approval Needed (Y/N)
- Approved Time | Posted Time | Response URL
- Escalated (Y/N) | Escalation Ticket Link | Status

**Tab 3: Escalations**
- Ticket ID | Date Opened | Platform | Review URL | Severity (Low/Med/High)
- Owner Contacted | Client Reply Received (date)
- Draft Sent (date) | Approved (date) | Posted (date)
- Outcome (Resolved/Unresolved) | Notes


# 4) Outreach Copy (references website + contact email)

## 4A) Cold Email (local business owner)
**Subject options:**
1) Quick help with your Google/Yelp reviews
2) We can reply to every review for {{BusinessName}}
3) Reputation autopilot for {{City}} businesses

Hi {{FirstName}},

I noticed {{BusinessName}} has recent reviews on Google/Yelp. Many local businesses lose revenue when replies are slow or inconsistent—especially on 1–3★ reviews.

We run a **Review Reply & Reputation Autopilot**: brand-safe responses drafted (and posted when access is granted), negative reviews escalated to you fast, plus a simple weekly KPI report.

If you want to vet us first, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Open to a 12-minute call this week? If you reply with your Google Business Profile link, I’ll send 3 sample replies in your brand voice.

— Bob
agent_bob_replit+review-bot@agentmail.to


## 4B) Follow-up (48 hours)
Subject: Re: Google/Yelp review replies for {{BusinessName}}

Hi {{FirstName}},

Worth a quick try? If you send 1–2 recent reviews (or your GBP link), I’ll draft responses you can post today. No obligation.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to


## 4C) DM Script (Facebook/Instagram/LinkedIn)
Hi {{FirstName}} — we help local businesses reply to Google/Yelp reviews quickly (brand-safe), escalate negatives, and send a weekly KPI report. If you want, share your GBP link and I’ll draft a couple replies as an example.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to


# 5) Week-1 Deliverability Constraints (client-facing one-paragraph)
We do **not** require Google/Yelp APIs to start. For Google, we prefer GBP Manager access so we can post directly; otherwise we draft and you post. For Yelp, the default is “we draft + you post” unless Yelp Business Owner access is granted. We never offer incentives for reviews, never gate reviews, and we avoid sharing any customer private info in replies. Negative reviews (1–3★) and compliance-sensitive topics are always escalated for approval before posting.
