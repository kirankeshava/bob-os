# Pilot Onboarding + Human-in-the-Loop Ops Packet (Day 0–7) — AI Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T06:36:25.897Z

---

Below is a copy/paste-ready packet to onboard and fulfill the free 7‑day pilot for the AI Review Reply & Reputation Autopilot.

SERVICE IDENTITY (for customers)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

A) PILOT INTAKE FORM (create as Google Form)
Title: “Free 7‑Day Review Reply Autopilot Pilot Intake”
Collect emails: Yes
Fields (all required unless noted):
1) Business name
2) Website URL (optional)
3) Primary contact name
4) Primary contact email
5) Mobile number for urgent escalations (optional)
6) Platforms used (checkbox): Google Business Profile, Yelp, Other (short text)
7) How many locations? (1, 2–5, 6–20, 20+)
8) Location list (repeatable): Location name + Address + GBP link (optional) + Yelp link (optional)
9) Approval method: “Reply YES/NO by email” or “Approve via link” (we support both)
10) Brand voice (choose one): Warm & friendly / Professional & concise / Luxury / Casual / Custom (text)
11) Must-avoid phrases (optional)
12) Escalation keywords to treat as urgent (pre-filled suggestions): refund, lawsuit/legal, allergy/health, harassment, discrimination, scam, chargeback
13) Internal escalation recipient(s): email(s)
14) Pilot goal (choose one): Increase responses / Protect rating / Reduce owner time / All

Auto-confirmation message (paste):
“Thanks — your free 7‑day pilot request is in. Next step: forward your Google/Yelp review notification emails to agent_bob_replit+review-bot@agentmail.to so we can start drafting replies. Details + setup steps will arrive by email. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

B) CUSTOMER ONBOARDING EMAIL (send immediately after intake)
Subject: Your 7‑Day Review Reply Autopilot Pilot — next steps (forwarding setup)
Body:
Hi {{FirstName}},

Welcome to the free 7‑day pilot of AI Review Reply & Reputation Autopilot.
Website for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

To start drafting replies, please forward your review notification emails to:
agent_bob_replit+review-bot@agentmail.to

Step 1 — Choose your approval method
Reply to this email with ONE of the following:
A) “APPROVAL: Email” (you approve by replying APPROVE / EDIT / SKIP)
B) “APPROVAL: Link” (you approve via an approve/edit link)

Step 2 — Turn on forwarding (Google + Yelp)
Option 1 (fast): Whenever you get a review notification, hit Forward to agent_bob_replit+review-bot@agentmail.to
Option 2 (recommended): Set an automatic forwarding rule so we catch every review.

Step 3 — Map locations
Please reply with a quick mapping so we know which emails correspond to which location:
- Location 1: {{Name + Address}}
- Notification email address used for this location (the inbox receiving review notifications): {{email}}
Repeat for each location.

What happens next
- We draft a brand‑safe reply for each new review.
- You approve/adjust.
- We send posting instructions (link‑out) so you can post safely on Google/Yelp.
- If a review is negative/urgent, we escalate immediately.

If you get stuck, reply here or email agent_bob_replit+review-bot@agentmail.to.

— Bob

C) REVIEW DRAFT DELIVERY EMAIL (human-in-the-loop)
Subject: Draft reply ready — {{Platform}} {{Stars}}★ for {{LocationName}} (Approval needed)
Body:
Hi {{FirstName}},

New review received for {{LocationName}}.
Platform: {{Platform}}
Rating: {{Stars}}★
Reviewer: {{ReviewerName or “(not provided)”}}
Review text:
“{{ReviewText}}”

Recommended reply draft:
{{DraftReply}}

Approve options (reply with one):
1) APPROVE
2) EDIT: {{type the changes you want}}
3) SKIP (do not respond)

Posting link(s):
- Google/Yelp link: {{DirectLinkIfAvailableOrSearchInstruction}}

Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Questions: agent_bob_replit+review-bot@agentmail.to

— Bob

D) ESCALATION EMAIL (SLA/urgent)
Subject: URGENT review escalation — {{Platform}} {{Stars}}★ ({{LocationName}})
Body:
This review requires urgent handling.

Location: {{LocationName}}
Platform: {{Platform}}
Rating: {{Stars}}★
Reason(s): {{Triggers: <3 stars / negative sentiment / keywords: refund|legal|health etc.}}
Review text:
“{{ReviewText}}”

Recommended next action:
- {{ActionGuidance: call customer, offer resolution offline, request details, etc.}}

Reply to approve a public response draft, or tell us to hold.
Contact: agent_bob_replit+review-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

E) WEEKLY KPI REPORT EMAIL (send every 7 days during pilot)
Subject: Weekly reputation report — {{BusinessName}} ({{StartDate}}–{{EndDate}})
Body:
Here’s your weekly reputation snapshot.

1) Volume
- New reviews: {{CountReviews}}
- Responded: {{CountResponded}} ({{ResponseRate}}%)

2) Rating
- Average rating (new reviews): {{AvgRating}}
- 1–2★ share: {{NegShare}}%

3) Speed (SLA)
- Median time-to-draft: {{MedianDraftMins}} mins
- Median time-to-approval: {{MedianApprovalMins}} mins
- Median time-to-response (posted): {{MedianResponseMins}} mins
- Reviews currently unhandled: {{OpenCount}} (oldest: {{OldestAgeHours}} hrs)

4) Escalations
- Escalations triggered: {{EscalationCount}}
- Top triggers: {{TopTriggers}}

5) Notes + recommended actions
- {{ShortBullets}}

If you want, we can refine brand voice and add custom rules per location.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

F) INTERNAL OPS SOP (run the pilot manually)
Goal: deliver “autopilot feel” without posting via APIs.

Daily cadence (Mon–Sun)
1) Inbox triage (2–4x/day): check agent_bob_replit+review-bot@agentmail.to for forwarded review notifications.
2) Identify client + location:
- If sender/subject matches known mapping, assign automatically.
- If unknown, tag “Needs mapping” and email client: “Which location is this for?”
3) Extract review facts: platform, stars, reviewer, text, date, location.
4) Sentiment + escalation check:
- Escalate immediately if: stars < 3 OR sentiment negative OR contains keywords (refund, lawsuit/legal, health/allergy, discrimination, harassment, scam, chargeback) OR mentions staff names with misconduct.
5) Draft reply:
- Use brand voice chosen.
- Always: thank + acknowledge + invite offline resolution for negatives.
- Never: admit liability, mention incentives, reveal private info.
6) Send draft delivery email (Section C). Log timestamp.
7) Handle approvals:
- If APPROVE: send posting instructions (link-out) + mark “Approved”.
- If EDIT: revise draft and resend.
- If SKIP: mark “No response requested”.
8) SLA reminders:
- If no approval within X hours (suggest 24h): send reminder.
- If negative review unhandled > X hours (suggest 4h): send escalation again.
9) Weekly report:
- Every 7 days: compile KPIs and send Section E.

Minimum tracking fields (sheet/DB)
- Client, Location, Platform, Stars, Review received time, Draft sent time, Approval time, Status (Open/Approved/Skipped/Escalated), Escalation reason, Notes.

G) DAY 0 → DAY 7 DELIVERY PROMISE (what we tell pilots)
- Day 0: forwarding + location mapping live.
- Days 1–7: we draft replies for every incoming review; urgent issues escalated fast.
- Day 7: weekly KPI report + recommended improvements.

All customer-facing communications should include:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Email: agent_bob_replit+review-bot@agentmail.to
