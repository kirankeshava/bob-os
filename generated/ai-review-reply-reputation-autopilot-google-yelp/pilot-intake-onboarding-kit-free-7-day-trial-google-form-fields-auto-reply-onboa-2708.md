# Pilot Intake + Onboarding Kit (Free 7-Day Trial) — Google Form Fields, Auto-Reply, Onboarding Email, and Internal SOP

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T05:55:49.952Z

---

Below is a paste-ready kit to turn outreach into onboarded pilots for the AI Review Reply & Reputation Autopilot.

A) PILOT INTAKE FORM (Google Form) — Title + Description
Title: Review Reply & Reputation Autopilot — Free 7-Day Pilot
Description (paste):
Thanks for requesting a free 7-day pilot. We’ll draft brand-safe responses to your new Google/Yelp reviews, escalate negatives fast, and send a weekly KPI summary.

To verify we’re a real service: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Questions (fields):
1) Business name (short answer)
2) Website (optional)
3) Primary contact name + role (short answer)
4) Contact email for approvals (short answer)
5) Mobile phone for urgent escalations (optional) (short answer)
6) Locations (checkbox): Single location / Multiple locations
7) If multiple locations: list each location name + address (paragraph)
8) Platforms to cover (checkbox): Google Business Profile / Yelp / Other (short answer)
9) How do you want approvals? (multiple choice): Approve by email reply / Approve via link (preferred) / No approval needed (we’ll draft only)
10) Brand voice (multiple choice): Friendly & casual / Professional & direct / Luxury & polished / Other (short answer)
11) Things we should never say (paragraph)
12) Escalation triggers you care about (checkbox): Refund request / Legal threat / Health & safety / Discrimination/harassment / Staff named / Competitor suspicion / Other (short answer)
13) Who should be CC’d on escalations? (emails) (paragraph)
14) Anything else we should know? (paragraph)

B) AUTO-REPLY / CONFIRMATION EMAIL (send immediately after form submit)
Subject: Confirmed — your free 7-day Review Reply Autopilot pilot
Body:
Hi {{FirstName}},

Confirmed — we received your pilot request.

What happens next:
1) We’ll help you forward new review notifications (Google/Yelp) to our inbox.
2) When new reviews arrive, we draft a brand-safe reply and send it to you for approval.
3) You post it (manual link-out) — low risk, no platform/API access required.
4) Negative reviews are escalated quickly.
5) You receive a weekly KPI summary.

For legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you want to speed this up, reply with:
- Your Google Business Profile link(s)
- Your Yelp page link(s)
- Preferred approval method (reply “approve” by email, or approval links)

Talk soon,
Bob
agent_bob_replit+review-bot@agentmail.to

C) ONBOARDING EMAIL (send within 1 business day of confirmation)
Subject: Next step — forward your new Google/Yelp review notifications to us
Body:
Hi {{FirstName}},

To start your free 7-day Review Reply Autopilot pilot, please forward new review notification emails to:
agent_bob_replit+review-bot@agentmail.to

Service overview page (for internal sharing):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

1) Google Business Profile (GBP) notifications
- In Google, ensure you (or a manager) are receiving “New review” notification emails for your location.
- When a new review email arrives, forward it to agent_bob_replit+review-bot@agentmail.to
- Important (multi-location): Put the location name in the forward subject line like:
  “FWD: NEW REVIEW — {{LocationName}} — Google”

2) Yelp notifications
- Make sure Yelp review notification emails are enabled for the account that manages your Yelp page.
- Forward any “new review” emails to agent_bob_replit+review-bot@agentmail.to
- Multi-location subject format:
  “FWD: NEW REVIEW — {{LocationName}} — Yelp”

3) Approval workflow
When we draft a reply, we’ll email it to: {{ApprovalEmail}}
Reply with one of these:
- “APPROVE” (we’ll send you the exact text + link-out instructions to post)
- “EDIT:” followed by your edits
- “REJECT” (we’ll draft a different angle)

4) Escalations (negatives)
If a review is negative (e.g., <3 stars, refund/legal/health concerns), we will escalate immediately to the contacts you listed. If there’s a preferred internal note format (e.g., ticket number, store manager), reply with that and we’ll follow it.

Reply to this email with:
- Your GBP link(s) + Yelp link(s)
- Confirmation of your subject-line location naming (so we map locations correctly)

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to

D) INTERNAL SOP (human-in-the-loop fulfillment, Phase 1)
Goal: Turn forwarded review emails into approved, posted responses + logs + weekly KPIs without requiring platform/API access.

1) Ingest & classify
- Check AgentMail inbox (agent_bob_replit+review-bot@agentmail.to) 3x/day minimum.
- For each forwarded review notification:
  a) Identify client + location from subject convention (or from email body).
  b) Extract: platform (Google/Yelp), reviewer name (if present), star rating (if present), review text, review URL (if present), timestamp.
  c) Sentiment tag (quick rule-based):
     - Positive: 4–5 stars or clearly praising language
     - Neutral: 3 stars / mixed feedback
     - Negative: 1–2 stars, complaint language, or strong negative tone

2) Escalation rules (immediate)
Escalate if any of:
- Rating <3 stars
- Keywords: refund, chargeback, lawsuit, attorney, HIPAA, health, safety, injury, police, scam, fraud, discrimination, harassment
- Reviewer threatens public escalation or media
Action:
- Email escalation summary to client escalation contacts + include the raw review text, platform, location, and recommended next step.

3) Draft the response
- Use brand voice selection and “never say” constraints from intake.
- Keep responses:
  - Polite, concise, no admissions of liability
  - Invite offline resolution for negatives
  - No incentives, no policy violations
- Produce two drafts for negatives (A: empathetic + invite offline, B: concise + boundary-setting) when appropriate.

4) Approval
- Send draft email to approval contact.
- Track status as: Pending → Approved/Edited/Rejected.
- SLA: if pending >24 hours, send reminder. If negative and pending >4 hours, escalate reminder.

5) Posting (manual link-out)
- When approved, send:
  - Final copy/paste response text
  - Direct link to the review (or the business profile/reviews page)
  - Simple instruction: “Paste this as your public response.”
- Optional: ask client to reply “posted” once done.

6) Logging
Record per review:
- Received timestamp
- Draft sent timestamp
- Approval timestamp
- Posted confirmed timestamp (or “unconfirmed”)
- Escalation triggered? (Y/N + reason)

7) Weekly KPI email (every 7 days per client)
Send a summary:
- # reviews received (by platform, by location)
- Average rating (this week vs prior week)
- % negative / neutral / positive
- Median response time (received → approval; received → posted if confirmed)
- # escalations + reasons
- Oldest unresolved review age

All client-facing emails must include:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to
