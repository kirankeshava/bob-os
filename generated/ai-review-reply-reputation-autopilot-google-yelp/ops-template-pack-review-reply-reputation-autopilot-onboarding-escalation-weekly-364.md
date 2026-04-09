# Ops Template Pack — Review Reply & Reputation Autopilot (Onboarding + Escalation + Weekly KPI Report)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T06:27:19.979Z

---

# 1) Client Onboarding Questionnaire (Copy/Paste Form)

**Subject (email):** Quick onboarding for your Review Reply Autopilot

Hi — to launch your Review Reply & Reputation Autopilot, reply to this email with the info below (or paste into a doc). If you want to confirm we’re legit, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1

**A. Business details**
1) Business name + primary location address:
2) Website URL:
3) Phone number:
4) Hours:

**B. Review profiles (required)**
5) Google Business Profile link (paste the public link):
6) Yelp business page link (paste the public link):
7) Any other review sources to monitor (Facebook, TripAdvisor, etc.):

**C. Access & posting method (week-1 friendly)**
8) Google Business Profile access (choose one):
- (Preferred) Add us as a *Manager* to GBP: send invite to **agent_bob_replit+review-bot@agentmail.to**
- (Fallback) We draft; your team posts (we’ll send ready-to-paste responses)

9) Yelp access (default = client-post workflow):
- Default: We draft; your team posts in Yelp Owner account
- Optional: If you can add us as a user, invite **agent_bob_replit+review-bot@agentmail.to**

**D. Brand voice & compliance**
10) Brand voice (pick 2–3): Friendly / Professional / Warm / Premium / Direct / Playful
11) Words/phrases to ALWAYS use (if any):
12) Words/phrases to NEVER use (banned list):
13) Any compliance rules (medical, legal, financial, insurance, etc.):
14) Do we mention promos/discounts? If yes, list the offer + terms:

**E. Escalation contacts (for negative reviews)**
15) Primary escalation contact name + title:
16) Phone:
17) Email:
18) Backup contact name + phone/email:

**F. Resolution policy (how we handle 1–3★ reviews)**
19) When a review is 1–3★, we should (choose one):
- Draft a public apology + invite offline; send escalation ticket
- Hold response until you approve
- Auto-respond unless it includes certain keywords

20) Keywords that require approval before posting (examples: refund, lawsuit, injury, discrimination, HIPAA, police, fraud). Add yours:

**G. Response SLAs (confirm)**
21) Desired response time for new reviews: 12h / 24h / 48h
22) Weekend coverage needed? Yes/No

**H. Success metrics (so our weekly KPI report matches what you care about)**
23) Top priority: Improve rating / Increase review volume / Faster responses / Reduce negatives / All
24) Target star rating in 90 days (if any):
25) Target response rate (e.g., 95% within SLA):

—

# 2) Negative Review Escalation Ticket + SLA (Internal + Client-Facing)

**When to open an escalation ticket (automatic triggers):**
- Any 1★–3★ review
- Any mention of: refund, chargeback, lawsuit, injury, discrimination, harassment, HIPAA/PHI, police, fraud, threat, “scam”, “stole”, “rude staff”, “unsafe”, “food poisoning”
- Any reviewer claims ongoing issue or demands specific compensation

**SLA / Workflow Rules**
- **Within 2 hours (business hours):** Create escalation ticket + notify client contact
- **Within 24 hours:** Provide recommended public response + private resolution steps
- **Posting rule:** Do not post a response to flagged reviews until either (a) client approves, or (b) 24h passes with no reply and client has opted into “auto-post unless legal/compliance keyword”.

---

## Escalation Ticket (Copy/Paste)
**Ticket ID:** (YYYYMMDD-###)
**Client:**
**Location:**
**Platform:** Google / Yelp
**Review URL:**
**Star rating:** 1 / 2 / 3
**Reviewer name:**
**Review text (verbatim):**

**Risk flags (check all that apply):**
- Legal threat
- Medical/privacy (HIPAA/PHI)
- Refund/chargeback
- Discrimination/harassment
- Safety issue
- Staff named
- Contains personal data

**Recommended response approach (choose one):**
1) Apologize + invite offline + no specifics
2) Clarify misunderstanding + invite offline
3) Correct factual inaccuracy (careful, non-argumentative)
4) No public response (rare; explain why)

**Draft public response (brand-safe):**
[PASTE DRAFT]

**Private resolution steps (internal checklist):**
- Confirm facts with staff
- Identify transaction/appointment (if possible)
- Offer offline contact path (manager phone/email)
- Resolution options allowed (refund? redo service? credit?)

**Client decision needed:**
- Approve as-is
- Edit requested (paste edits)
- Do not respond publicly

**Owner/Manager approval (name + timestamp):**

**Status:** Open / Waiting on client / Approved / Posted / Resolved

**Outcome notes (post-resolution):**
- Was reviewer contacted? Y/N
- Resolution provided:
- Did reviewer update rating? Y/N

—

# 3) Weekly KPI Report Template (Email + Google Sheet Layout)

## 3A) Weekly KPI Report Email (Copy/Paste)
**Subject:** Weekly Reputation KPI Report — {{Business Name}} — Week of {{Date Range}}

Hi {{Name}},

Here’s your weekly reputation snapshot for **{{Business Name}}**. If you want to review our process or deliverables, our site is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1

**1) New reviews**
- Google: {{#}} (avg {{x.x}}★)
- Yelp: {{#}} (avg {{x.x}}★)
- Total: {{#}}

**2) Rating trend**
- Current overall rating: {{x.xx}}★ (was {{x.xx}}★ last week)
- 30-day trend: {{up/down/flat}} {{delta}}

**3) Responsiveness**
- Response rate: {{%}} (goal {{%}})
- Median response time: {{hh:mm}} (SLA {{12/24/48}}h)
- # responses posted: {{#}}

**4) Negative review handling (1–3★)**
- New negative reviews: {{#}}
- Escalations opened: {{#}}
- Resolved this week: {{#}}
- Waiting on client: {{#}}

**5) Top themes (what customers mention most)**
1) {{Theme}} — {{# mentions}}
2) {{Theme}} — {{# mentions}}
3) {{Theme}} — {{# mentions}}

**6) Actions completed by our team**
- {{Action 1}}
- {{Action 2}}
- {{Action 3}}

**7) Recommended next actions (to improve rating & conversions)**
- {{Recommendation 1}}
- {{Recommendation 2}}

If you need anything urgently (especially for a negative review), reply here: **agent_bob_replit+review-bot@agentmail.to**.

— Bob

---

## 3B) Google Sheet Layout (Tabs + Columns)

### Tab 1: `Reviews_Log`
Columns:
- Date
- Platform (Google/Yelp)
- Location (if multi-location)
- Reviewer Name
- Star Rating (1–5)
- Review Text (paste)
- Category/Theme (dropdown: service, wait time, pricing, staff, quality, cleanliness, communication, other)
- Sentiment (Positive/Neutral/Negative)
- Drafted Response (text)
- Approved? (Y/N)
- Posted? (Y/N)
- Posted Timestamp
- Response Time (hours) = (Posted Timestamp - Date)
- Escalation Needed? (Y/N)
- Escalation Ticket ID
- Status (Open/Waiting/Posted/Resolved)

### Tab 2: `Weekly_Summary`
Fields:
- Week Start / Week End
- New Reviews (Google)
- New Reviews (Yelp)
- Total New Reviews
- Avg Rating (new reviews)
- Overall Rating (current)
- Response Rate % = responses posted / total reviews
- Median Response Time (hrs)
- Negative Reviews (1–3★)
- Escalations Opened
- Escalations Resolved
- Notes / Wins

### Tab 3: `KPI_Dashboard`
Widgets (simple formulas):
- Current overall rating
- Last 4 weeks: new reviews (bar)
- Last 4 weeks: response rate (line)
- Last 4 weeks: median response time (line)
- Negative reviews count (last 4 weeks)
- Top themes (pivot: Theme → Count)

### Tab 4: `Client_Settings`
- Brand voice adjectives
- Banned phrases
- Approved sign-offs
- Approval rules (auto-approve 4–5★? Y/N)
- Escalation keywords list
- Escalation contacts

—

# Week-1 Delivery Cadence (How to Use These Templates)
**Daily (Mon–Fri):** Check new reviews → log into `Reviews_Log` → draft responses → QA for compliance → send for approval if needed → post (or send client-post copy) → open escalation tickets for 1–3★.

**Weekly (Friday):** Update `Weekly_Summary` → export 1-page email using template → include top themes + next actions → send from **agent_bob_replit+review-bot@agentmail.to**.

This workflow is intentionally designed to work immediately without Google/Yelp API access: it uses manager access where available, and a client-post fallback everywhere else so we can deliver value in week 1.
