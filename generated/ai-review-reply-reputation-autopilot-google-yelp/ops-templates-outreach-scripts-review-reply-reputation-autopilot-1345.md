# Ops Templates + Outreach Scripts (Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:14:08.017Z

---

# 1) Client Onboarding Questionnaire (copy/paste into Google Form or email)

**Subject:** Quick onboarding for AI Review Reply & Reputation Autopilot (10 minutes)

Hi {{FirstName}},

To start replying to Google/Yelp reviews within our SLA, please answer the questions below. If easier, reply inline.

**A) Business basics**
1) Business name:
2) Primary contact name + role:
3) Best email for escalations (can be multiple):
4) Best phone for urgent escalations:
5) Business website URL:
6) Locations covered (name + address for each). If single-location, just confirm:

**B) Review platforms & access (Week 1 deliverable without API)**
7) Google Business Profile link(s):
8) Do you approve adding us as a Manager on your Google Business Profile? (Yes/No)
   - If yes: please invite **agent_bob_replit+review-bot@agentmail.to** as a Manager.
9) Yelp business page link(s):
10) Yelp workflow preference (choose one):
   - Option 1 (preferred): Add us to Yelp Business Owner account / provide collaborator access
   - Option 2 (fallback): We draft responses; you post them (we provide copy/paste text)

**C) Brand voice & policy**
11) Brand voice (pick up to 2): Professional / Friendly / Warm / Funny / Luxury / Direct / Other:
12) Any words/phrases to avoid (banned list):
13) Any promises we must NOT make (e.g., health outcomes, refunds, turnaround times):
14) Do you want to mention offers or CTAs in 4–5★ replies? (Yes/No)
   - If yes, paste the exact CTA copy + URL/phone (must be compliant):
15) Public-facing signature: (e.g., “— Bob, Owner” or “— The {{Brand}} Team”)

**D) Escalation rules (negative reviews)**
16) Who should be notified for 1–2★ reviews? (names + emails + phones)
17) Who can approve responses for 1–3★ reviews? (name + email)
18) Are there any topics that must ALWAYS be escalated before replying? (examples: billing, legal threats, discrimination, injury/medical claims, privacy/HIPAA):
19) Refund/redo policy summary (1–2 sentences) we can reference if appropriate:

**E) Reporting**
20) Where should the weekly KPI report go? (emails)
21) Preferred cadence: Monday morning / Friday afternoon / Other:
22) Do you want a 15-min monthly insights call? (Yes/No)

**Confirmation**
23) Confirm your plan: Growth / Pro / Agency Starter / Agency Pro
24) Confirm your billing start date:

—
AI Review Reply & Reputation Autopilot
Proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to


---

# 2) Escalation Ticket + SLA Form (internal or client-facing)

**Ticket title:** {{Platform}} {{Stars}}★ Review Escalation — {{Location}} — {{ReviewerName}} — {{Date}}

**1) Review details**
- Platform: Google / Yelp
- Location:
- Star rating:
- Review URL (paste link):
- Review text (paste exact):
- Reviewer name:
- Date/time posted:

**2) Category (check all that apply)**
- Service quality complaint
- Staff behavior / professionalism
- Pricing / billing dispute
- Wait time / scheduling
- Product issue
- Safety/medical claim
- Legal threat / “lawsuit” / “attorney” mention
- Discrimination / harassment
- Privacy / HIPAA
- Possible fake/spam
- Other:

**3) Severity & SLA**
- Severity: Low / Medium / High
- Default SLA: 
  - 4–5★: response drafted + posted within 24h (or per plan)
  - 3★: draft within 24h, approval required before posting
  - 1–2★: draft within 12–24h, approval required before posting; notify escalation contacts immediately
- If High severity (legal/medical/privacy): **Do not post** until client approves.

**4) What we need from client (to resolve)**
- Order/invoice # (if applicable):
- Staff involved / date of visit:
- Any constraints on what we can say publicly:
- Preferred remedy (if any): refund / redo / call customer / none:

**5) Draft response options (we provide 2)**
- Draft A (more apologetic):
- Draft B (more direct/firm):

**6) Approval**
- Approver name:
- Approved draft: A / B / edits provided below
- Edits (client paste):
- Approved to post? Yes/No
- If No, next action:

**7) Resolution tracking**
- Posted date/time:
- Follow-up action (call/email customer):
- Outcome: resolved / pending / no response


---

# 3) Weekly KPI Report (email + sheet layout)

## 3A) Weekly email (copy/paste)

**Subject:** Weekly Reputation KPI Report — {{BusinessName}} — Week of {{DateRange}}

Hi {{FirstName}},

Here’s your weekly reputation snapshot for {{DateRange}}.

**Topline KPIs**
- New reviews: {{#}}
- Average rating (current): {{X.X}}
- Rating trend (vs last week): {{+/-}}
- Response rate: {{%}} (responses / total)
- Median response time: {{X hours}}
- Negative reviews (1–2★): {{#}}
- Escalations opened: {{#}} | Resolved: {{#}}

**Highlights**
- Biggest win: {{1 sentence}}
- Main customer theme(s): {{bullets}}

**Risks / actions needed**
- Reviews needing your approval: {{#}} (links below)
- Any high-severity issues: {{summary + link}}

**Links**
- Google reviews page: {{link}}
- Yelp reviews page: {{link}}
- Sheet report: {{GoogleSheetLink}}

Reply here if you want us to adjust tone/CTA or tighten escalation rules.

— Bob
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 3B) Google Sheet layout (tabs + columns)

**TAB 1: Weekly Summary**
Columns:
- Week Start
- Week End
- New Reviews (G)
- New Reviews (Y)
- Total New Reviews
- Avg Rating Start
- Avg Rating End
- Rating Δ
- Responses Posted
- Response Rate
- Median Response Time (hrs)
- 1–2★ Count
- Escalations Opened
- Escalations Resolved
- Notes / Themes

Suggested formulas:
- Total New Reviews = New Reviews (G) + New Reviews (Y)
- Rating Δ = Avg Rating End - Avg Rating Start
- Response Rate = Responses Posted / Total New Reviews

**TAB 2: Review Log**
Columns:
- Date
- Platform (Google/Yelp)
- Location
- Reviewer Name
- Stars
- Review Text (paste)
- Category/Theme
- Drafted By
- Draft Date
- Approval Needed? (Y/N)
- Approved By
- Posted? (Y/N)
- Posted Date
- Response Text (final)
- Escalated? (Y/N)
- Escalation Ticket Link

**TAB 3: Escalations**
Columns:
- Ticket ID
- Date Opened
- Platform
- Location
- Stars
- Severity
- Reason Category
- Owner Contacted (Y/N)
- Current Status (Open/Pending/Resolved)
- Resolution Notes
- Date Closed


---

# 4) Standardized Google/Yelp Workflow Policy (Week 1 deliverable)

**Google Business Profile (GBP)**
- Default requirement: Client invites **agent_bob_replit+review-bot@agentmail.to** as a **Manager** on GBP.
- If access delayed: we draft responses in a shared doc; client posts until access is granted.

**Yelp**
Two-track policy:
- **Preferred:** Client provides Yelp Business Owner/collaborator access so we can post.
- **Fallback (default-allowed):** We draft responses; client posts within SLA. We provide copy/paste text + “where to click” instructions.

**Approval rules**
- 4–5★: auto-approve + post (unless flagged keywords).
- 3★: draft within SLA; approval required before posting.
- 1–2★: immediate escalation + approval required; if legal/medical/privacy keywords appear, hold posting until explicit approval.

**Hard exclusions (brand-safety/compliance)**
- No review gating, incentives, or “only leave a review if happy.”
- No pretending to be the owner if not authorized.
- No disputing/removal requests submitted as the client without written authorization.


---

# 5) Outreach Email + Follow-up + Call Script (references website + email)

## 5A) Cold email v1 (local business owner)
**Subject options:**
1) Quick fix for unanswered Google/Yelp reviews at {{BusinessName}}
2) We can reply to your reviews daily (brand-safe) — 24h SLA

Hi {{FirstName}},

I noticed {{BusinessName}} has recent Google/Yelp reviews. Most local buyers read the owner responses—especially on 1–3★ reviews—and responsiveness can directly affect calls and bookings.

We run an **AI Review Reply & Reputation Autopilot** that:
- Drafts brand-safe replies for Google + Yelp
- Escalates negative reviews same-day (you approve before we post)
- Sends a simple weekly KPI report (new reviews, rating trend, response time)

If you want, I can send 3 example replies in your brand voice based on your latest reviews.

Website/proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply here or email: agent_bob_replit+review-bot@agentmail.to

Open to a 12-minute call Wed/Thu?

— Bob

## 5B) Follow-up (48 hours)
Subject: Re: replying to {{BusinessName}} reviews

Hi {{FirstName}},

Bumping this—want me to draft 3 ready-to-post replies (including one for a negative review) so you can see the tone and risk controls?

If yes, send your Google/Yelp links and I’ll turn it around today.

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

## 5C) 12-minute call script (discovery → close)
1) “How many locations and which platforms matter most—Google, Yelp, both?”
2) “How many reviews/week do you usually get, and who replies today?”
3) “What’s the risk: any regulated language (medical/legal), refunds, or sensitive topics?”
4) “Our workflow: we draft within 24h (or 12h on Pro). 4–5★ auto-post; 1–3★ require your approval; anything legal/medical is held.”
5) “Posting: ideally you add us as GBP Manager; for Yelp we either get owner access or we do a client-post workflow.”
6) Close: “Based on volume, Growth is usually the fit at $1,250/mo + $500 setup. Want to start this week? I’ll send onboarding and we can be live in 48 hours after access.”
