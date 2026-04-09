# AI Review Reply & Reputation Autopilot — Operator Pack (Templates + SOP + 30-Day KPI Dashboard)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T20:28:59.743Z

---

BUSINESS LINKS (use in all customer comms)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact / onboarding email: agent_bob_replit+review-bot@agentmail.to

A) QUICK PRICING RECAP (2 core offers)
1) Done-for-You Review Reply Autopilot + Weekly KPI Report
- Growth: $500 setup + $1,250/mo (1 location; Google + Yelp; up to 120 replies/mo; 24h SLA; 4 escalations/mo; weekly KPI email)
- Pro: $500 setup + $1,750/mo (1 location; up to 250 replies/mo; 12h SLA; 10 escalations/mo; competitor benchmark; monthly insights call)
Overages: $0.75 per reply above plan limit OR upgrade. Additional locations: +$349/location/mo (DFY).

2) White-label Agency Plan
- Starter: $199 setup + $399/mo (up to 3 locations)
- Pro: $399 setup + $899/mo (up to 10 locations)
Overage: +$59/location/mo. Includes response drafting + weekly KPI rollup; agency posts or we post if granted access.

B) WEEK-1 FULFILLMENT SCOPE (deliverable without APIs)
Review sources:
- Google Business Profile (GBP) reviews (primary)
- Yelp reviews (secondary)

Posting method hierarchy (no API dependency):
1) Preferred: Client adds us as manager on GBP. We reply directly in GBP.
2) Yelp: If client grants Yelp Business Owner access, we reply inside Yelp.
3) Default fallback (Yelp and/or GBP if access delayed): We draft responses in a shared doc/email; client posts. We supply “copy/paste-ready” responses with clear posting instructions.

Response SLAs (from detection time):
- Growth: within 24 business hours
- Pro: within 12 business hours

Escalation rules (always create a ticket + notify):
- Any 1★–2★ review
- Any review mentioning: refund, chargeback, lawsuit/legal, discrimination, injury, HIPAA/medical details, harassment/threats, unsafe work, fraud/scam
- Any review from a known VIP customer (client-provided list)
- Any review where facts are unclear or response could admit liability

Auto-approve vs approval required:
- 4★–5★: Auto-approve (unless flagged keyword/topic)
- 3★: Approval required unless client opts in to auto-approve 3★
- 1★–2★: Always approval required

Brand safety constraints:
- No incentives for reviews, no “review gating,” no requesting only positive reviews.
- No claims of removing reviews or disputing reviews without client instruction.
- No disclosure of private customer info. Keep responses general and invite offline resolution.

C) SOP OUTLINE (daily execution)
1) Capture reviews
- Morning check (Mon–Fri): Check GBP + Yelp dashboards OR rely on email alerts if client has them enabled.
- Log each new review into the Review Log (date, platform, rating, reviewer name, text, location).

2) Draft responses
- Use brand voice rules from onboarding.
- Keep replies short, warm, and policy-safe.
- Include offline resolution CTA for 1–3★ (phone/email) without admitting fault.

3) QA (human-in-the-loop)
- Verify: no private data, no legal admissions, no prohibited claims.
- Confirm correct business/location name.

4) Approvals
- If auto-approved category: proceed to posting.
- If approval required: send approval email with 2 options: (A) approve as-is, (B) edit suggestion.

5) Post
- Post directly (if access) OR send copy/paste instructions to client.

6) Escalate (if triggered)
- Open an Escalation Ticket, notify contact, track outcome.

7) Weekly report
- Every Monday: send KPI email + attach/inline metrics snapshot.

D) TEMPLATE 1 — ONBOARDING QUESTIONNAIRE (paste-ready)
Subject: Quick onboarding for Review Reply Autopilot (10 minutes)

Hi {{FirstName}},

To activate your Review Reply & Reputation Autopilot, please reply with the answers below (or paste into a doc). You can also send them to agent_bob_replit+review-bot@agentmail.to.

1) Business + locations
- Business name:
- Location(s) + address(es):
- Primary phone number for customers:
- Public support email (if any):

2) Platform access (preferred)
- Google Business Profile: can you add us as a Manager? (Yes/No)
  If yes, invite this email: agent_bob_replit+review-bot@agentmail.to
- Yelp: do you have Yelp Business Owner access you can share? (Yes/No)
  If no, we can draft and you can post (copy/paste workflow).

3) Brand voice
- Choose tone: Friendly / Professional / Premium / Playful / Other:
- Words/phrases to avoid (banned list):
- Must-include phrases or CTAs (if any):
- Competitors we should never mention:

4) Escalation contacts
- Who should we notify for negative reviews? (name + email + phone)
- Backup contact:
- Preferred escalation channel: Email / SMS / Slack (if Slack, share workspace invite instructions)

5) Policies (so we don’t over-promise)
- Refund policy (1–2 sentences):
- Cancellation/reschedule policy (if service business):
- Any regulated constraints (medical/legal/finance):

6) Approval preferences
- Auto-approve 4–5★ replies? (Recommended: Yes)
- Auto-approve 3★ replies? (Recommended: No)
- OK to offer a make-good (e.g., “please contact us and we’ll make it right”)? (Yes/No)

7) Success goals
- What matters most: Higher rating / More reviews / Faster responses / Damage control:
- Any upcoming promo/seasonality we should know:

Once we have this, we’ll start replying immediately and your first weekly KPI report will arrive next Monday.

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

E) TEMPLATE 2 — ESCALATION TICKET + SLA (paste-ready)
Escalation Ticket ID: {{YYYYMMDD}}-{{Client}}-{{Platform}}-{{ReviewerName}}

1) Review details
- Platform: Google / Yelp
- Location:
- Star rating:
- Review text (paste):
- Review URL (if available):
- Timestamp found:

2) Risk flags (check any)
[ ] Legal threat / lawsuit wording
[ ] Refund/chargeback
[ ] Safety/injury
[ ] Discrimination/harassment
[ ] Medical privacy / HIPAA risk
[ ] Fraud/scam accusation
[ ] Employee named
[ ] VIP customer

3) Proposed response (draft)
- Draft reply text:

4) Questions for owner/manager
- What happened (1–3 bullets)?
- What remedy (if any) are we allowed to offer?
- Best contact method to provide publicly (phone/email)?

5) SLA + workflow
- We will NOT post until approval is received.
- Target turnaround after client input: within {{12h or 24h}} business hours.
- If no response from client in 48 business hours: we will send 2 reminders and pause posting for that review.

6) Outcome tracking
- Status: New / Waiting on client / Approved / Posted / Resolved offline / Closed
- Date posted:
- Notes:

F) TEMPLATE 3 — WEEKLY KPI REPORT (email + sheet layout)
Email subject: Weekly Reputation KPIs — {{Business}} ({{StartDate}}–{{EndDate}})

Email body:
Hi {{FirstName}},

Here are your weekly reputation KPIs for {{StartDate}}–{{EndDate}}:

1) Review volume
- New reviews: {{#}}
- Google: {{#}} | Yelp: {{#}}

2) Rating trend
- Current average rating: {{x.xx}}
- Change vs last week: {{+/- x.xx}}

3) Responsiveness
- Response rate: {{%}} (responses posted / reviews received)
- Median response time: {{hh:mm}}
- SLA compliance: {{%}} within {{12h or 24h}}

4) Negative review handling
- 1–2★ reviews: {{#}}
- Escalations opened: {{#}}
- Escalations resolved (confirmed): {{#}}

5) Themes (what customers mention most)
- Theme 1: {{e.g., “wait time”}} — {{# mentions}}
- Theme 2: {{…}}
- Theme 3: {{…}}

6) Next week focus
- {{1–3 bullets with operational suggestions}}

If you want, reply with any promos or announcements and we’ll weave them into 4–5★ replies (brand-safe).

— Bob
agent_bob_replit+review-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Weekly KPI Sheet layout (columns):
- Week Start | Week End | New Reviews (Total) | New Reviews (Google) | New Reviews (Yelp) | Avg Rating | Avg Rating Δ | Responses Posted | Response Rate | Median Response Time (hrs) | 1–2★ Count | Escalations Opened | Escalations Resolved | Top Theme 1 | Top Theme 2 | Notes

G) 30-DAY KPI DASHBOARD (pipeline + delivery KPIs)
Goal: $12,000 cash-in-month (Week 1 free service allowed, but KPI plan assumes closes by end of month).

Pipeline KPIs (daily):
- New leads added: target 42/day
- Replies/conversations: target 6/day (assumes ~15% reply on warm-ish outbound)
- Calls booked: target 2/day
- Calls showed: target 1.4/day (70% show)
- Closes: target ~0.27/day (≈8 closes / 30 days)

Conversion assumptions (editable):
- Reply rate: 15%
- Call-book rate from replies: 35%
- Show rate: 70%
- Close rate on shows: 25%

Delivery KPIs (weekly per client):
- Response rate ≥ 95%
- Median response time ≤ SLA (12h or 24h)
- Escalations handled within SLA
- Zero policy violations (no incentives, no private data)

30-day cadence checklist:
Daily (Mon–Fri): capture new reviews → draft → QA → approve/post → escalate as needed.
Weekly (Mon): send KPI report + list any unresolved escalations.
Weekly (Fri): internal quality audit: random sample 10 replies for brand/policy alignment.

H) DEFAULT WEEK-1 POLICY DECISION (to keep closes high)
- GBP: require Manager access as preferred; if delayed, run client-post for up to 7 days.
- Yelp: default to client-post workflow unless Yelp Business Owner access is provided.
Reason: avoids dependency on Yelp access and keeps fulfillment reliable in week 1.
