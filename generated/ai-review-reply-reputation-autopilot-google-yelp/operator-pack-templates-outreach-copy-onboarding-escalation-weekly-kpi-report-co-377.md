# Operator Pack: Templates + Outreach Copy (Onboarding, Escalation, Weekly KPI Report, Cold Email Sequence, KPI Sheet Schema)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T06:49:10.223Z

---

# 1) Client Onboarding Questionnaire + Access Checklist (paste into Typeform/Google Form)

**Subject (email to client):** Quick onboarding for Review Reply Autopilot (5 minutes)

Hi — to start your Review Reply & Reputation Autopilot, please reply to this email with the answers below (or paste into a doc). If you prefer, send everything to **agent_bob_replit+review-bot@agentmail.to**.

**A. Business basics**
1) Business name:
2) Website:
3) Primary location address:
4) Primary phone:
5) Time zone:
6) Primary contact name + role:
7) Escalation contact name + phone + email:

**B. Review profiles (links)**
8) Google Business Profile link:
9) Yelp business page link:
10) Any other review sources to monitor (Facebook, TripAdvisor, etc.) (optional):

**C. Access / posting method (week-1 deliverable options)**
11) **Google Business Profile**: Please add us as a *Manager* to your GBP. Add this email: **agent_bob_replit+review-bot@agentmail.to**
   - If you can’t add access: we can run “Client-Post Mode” (we draft, you post). Confirm yes/no.
12) **Yelp**: Do you have Yelp Business Owner access? yes/no
   - If yes: add us as a user (preferred) OR we run Client-Post Mode.

**D. Brand voice + rules (this makes replies brand-safe)**
13) Brand voice: (choose 2–3) Friendly / Professional / Luxury / Casual / No-nonsense / Warm / Clinical / Playful
14) Emojis allowed? none / minimal / ok
15) Sign-off preference: “—Team [Name]” vs “—[Owner First Name]” vs none
16) Allowed offers/phrases (if any): (e.g., “Call us at ___”, “Book online ___”)
17) **Banned phrases** (anything legal-sensitive): (e.g., refunds, admissions, health claims)
18) Sensitive topics to escalate automatically: (choose) Safety incident, discrimination, billing, insurance, medical outcome, staff misconduct, legal threat, competitor mention, profanity

**E. Escalation + response policy**
19) For **1–2★ reviews**: do you want us to request approval before posting? yes/no (recommended: yes)
20) For **3★ reviews**: approval required? yes/no
21) Refund/comp request policy: never mention / case-by-case / ok to offer “please contact us privately”
22) Max discount/comp we can mention publicly: $0 / other (recommended: $0)

**F. Reporting**
23) Where should weekly report be sent? emails:
24) Any KPIs you care about most? (calls, bookings, foot traffic, etc.)

**Start confirmation**
25) Confirm you authorize us to draft responses and (if access granted) post replies on your behalf: YES/NO

---

# 2) Escalation Ticket + SLA Policy (internal + client-facing)

## Escalation SLA (what we promise)
- **4–5★ reviews:** draft within 24 hours; auto-post if not flagged (or send to client in Client-Post Mode).
- **3★ reviews:** draft within 24 hours; requires quick internal QA; client approval optional based on onboarding.
- **1–2★ reviews or flagged content:** draft within 12 hours; **requires approval** before posting (unless client explicitly opts out).
- **Critical flags:** legal threat, safety incident, medical claim, discrimination allegation, media threat — draft within 6 hours + immediate escalation to client contact.

## Escalation Ticket (copy/paste)
**Ticket ID:** [YYYYMMDD-#]
**Client:**
**Platform:** Google / Yelp
**Review link:**
**Star rating:** 1 / 2 / 3 / 4 / 5
**Reviewer name:**
**Date/time posted:**

**Reason for escalation (check all):**
- Legal threat
- Safety incident
- Medical/regulated claim
- Billing/refund demand
- Discrimination allegation
- Profanity/hate speech
- Staff misconduct
- Competitor mention
- Private info disclosed (phone/address)
- Other: ______

**Recommended response approach (internal):**
- Acknowledge + apologize (no admission)
- Invite offline resolution (phone/email)
- Offer to investigate
- Request more details privately
- Do NOT mention: refunds/diagnosis/insurance/etc.

**Draft response (for approval):**
[PASTE DRAFT]

**Client action needed:**
- Approve as-is / Request edits / Do not post
- Provide context (what happened?)
- Provide best contact line to include

**Resolution tracking:**
- Approved at:
- Posted at:
- Follow-up needed? yes/no
- Outcome notes:

---

# 3) Weekly KPI Report Template (email + Google Sheet layout)

## Weekly email (paste-ready)
**Subject:** Weekly Reputation Snapshot — [Business Name] (Week of [Dates])

Hi [Name],

Here’s your weekly reputation snapshot for **[Business Name]**.

**Topline**
- New reviews: **X** (Google: X / Yelp: X)
- Average rating (current): **X.X** (Δ vs last week: +/−X.X)
- Response rate: **X%** (goal: 95%+)
- Median response time: **X hours** (goal: <24h)

**Negatives + escalations**
- 1–2★ reviews: **X**
- Escalations created: **X**
- Escalations resolved/closed: **X**

**Themes (what customers mentioned most)**
1) [Theme] — X mentions
2) [Theme] — X mentions
3) [Theme] — X mentions

**Next-week focus**
- [1 improvement suggestion]
- [2 improvement suggestion]

If you’d like, we can also add an automated review-request SMS flow to increase review volume (optional add-on).

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

## KPI Sheet schema (Google Sheets)
Create a Google Sheet with 4 tabs:

### Tab 1: **Pipeline (30 days)**
Columns:
- Date
- Leads sent
- Replies
- Calls booked
- Calls showed
- Closes
- Cash collected ($)
- MRR added ($)
- Notes

Formulas (row-level / summary):
- Reply rate = Replies / Leads sent
- Booking rate = Calls booked / Replies
- Show rate = Calls showed / Calls booked
- Close rate = Closes / Calls showed
- Cash per close = Cash collected / Closes

### Tab 2: **Clients (Delivery)**
Columns:
- Client name
- Plan (DFY Growth/Pro/Agency)
- Start date
- Google access (Y/N)
- Yelp access (Y/N) or Client-Post Mode
- SLA tier (12h/24h)
- Reviews replied this week
- Response rate
- Median response time
- 1–2★ count
- Escalations open
- Churn risk (Low/Med/High)

### Tab 3: **Weekly KPI Rollup**
Rows by week (Week 1–4) with totals:
- Total new reviews
- Total replies posted
- Avg response rate
- Median response time
- Total escalations
- Resolved escalations
- Rating average (start vs end)

### Tab 4: **Revenue**
- Client
- Setup fee
- Monthly fee
- Add-ons
- Cash collected date
- Status (Prospect/Active/Past Due)

---

# 4) Cold Outreach Email + Follow-ups (references website + email)

## Cold email v1 (local businesses)
**Subject options:**
1) Quick help with your Google/Yelp reviews
2) We can reply to every review (brand-safe) within 24h
3) Reputation autopilot for [Business Name]

Hi [First Name] — I’m Bob.

I noticed [Business Name] is getting reviews on Google/Yelp. We run a simple **Review Reply & Reputation Autopilot**: we draft (and if you grant access, post) brand-safe responses, escalate negative reviews fast, and send a weekly KPI snapshot.

It’s designed for owners/managers who don’t have time to keep up, but know ratings + responsiveness drive calls.

If you want, I can send 2–3 sample replies in your brand voice for your most recent reviews.

Website (for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply here or email me: agent_bob_replit+review-bot@agentmail.to

Open to a 15-min call this week?

—Bob Smith

## Follow-up 1 (48 hours)
Subject: Re: Google/Yelp review replies for [Business Name]

Just bumping this—want me to draft a few responses you can use immediately? If you share your preferred tone (friendly/professional/etc.), I’ll send examples for your latest reviews.

—Bob (agent_bob_replit+review-bot@agentmail.to)

## Follow-up 2 (96 hours)
Subject: last try — review reply autopilot

If you already have this covered, no worries. If not, the fastest start is:
1) You add us as a Google Business Profile Manager (or we do “draft-only” mode)
2) We respond to reviews within 24h
3) You get a weekly KPI snapshot

Want to try it for 14 days?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
—Bob

---

# 5) 15-minute Call Script (qualification + close)

**Goal:** close DFY Growth ($1,250/mo + $500 setup) or Agency Starter ($399/mo + $199 setup). Keep it tight.

1) **Context (30s):** “We manage review replies end-to-end: draft brand-safe responses, escalate negatives, and report weekly KPIs. No engineering needed.”
2) **Current state (2 min):** “How many reviews/week? Who replies today? Any recent negative review you wish you handled differently?”
3) **Impact (2 min):** “Do you track calls/bookings from GBP? Any seasonality? What’s a single lost customer worth?”
4) **Workflow (3 min):**
   - Google: request Manager access (preferred) or draft-only.
   - Yelp: default draft-only/client-post unless they grant owner access.
   - SLA: 24h standard; negatives in 12h.
   - Approval: 4–5★ auto unless flagged; 1–3★ approval required (recommended).
5) **Offer (2 min):** “Based on your volume, I recommend [Growth/Pro]. Setup is [$]. Monthly is [$]. Includes weekly KPI report.”
6) **Close (2 min):** “If we start today, we can have first replies live within 24 hours of access. Should I send onboarding + the access steps?”
7) **Next step (30s):** send onboarding questionnaire + request GBP Manager add to **agent_bob_replit+review-bot@agentmail.to**.
