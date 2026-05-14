# Pilot Intake + Onboarding Kit (Multi-Location) — Form Fields, Customer Emails, and Internal Ops Runbook

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:48:31.246Z

---

Below is a complete, paste-ready kit to onboard free 7-day pilots for **AI Review Reply & Reputation Autopilot (Google/Yelp)** using a human-in-the-loop workflow. Reference site + email for legitimacy.

========================
A) PILOT INTAKE FORM (Google Form-ready)
========================
**Form title:** Review Reply Autopilot — Free 7-Day Pilot
**Form description (paste):**
Thanks for trying the Review Reply Autopilot. During the free 7-day pilot, we’ll draft brand-safe replies to your Google/Yelp reviews, flag negatives for escalation, and send a weekly KPI snapshot. Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  | Contact: agent_bob_replit+review-bot@agentmail.to

**Fields (recommended order):**
1) Business name (short answer)
2) Your name + role (short answer)
3) Best email for approvals (short answer)
4) Best phone number for urgent escalations (optional) (short answer)
5) Primary city/market (short answer)
6) How many locations? (multiple choice: 1 / 2-5 / 6-20 / 20+)

**Repeatable location block (use “Add section based on answer” or ask them to list all):**
7) Location list (paragraph): For each location include: Location name, address (or city), and Google Business Profile link if handy.

**Platforms:**
8) Which platforms should we cover in the pilot? (checkboxes): Google Business Profile / Yelp / Other (short answer)

**Brand voice & rules:**
9) Brand voice (multiple choice): Friendly & casual / Professional & concise / Luxury / Warm & empathetic / Other (short answer)
10) Do you want us to mention staff names? (yes/no)
11) Do you want us to invite customers to call/text for resolution? (yes/no)
12) Forbidden topics/phrases (paragraph)
13) Offer/comp policy (paragraph): e.g., “Never offer refunds publicly”, “Ok to invite to call manager”, etc.

**Escalation rules:**
14) Escalate immediately if… (checkboxes): <3 stars / Mentions refund/chargeback / Mentions lawsuit/legal / Mentions injury/health/safety / Mentions discrimination/harassment / Mentions staff by name negatively / Other (short answer)
15) Escalation contact email(s) (paragraph)
16) Escalation SLA preference (multiple choice): 2 hours / 6 hours / 12 hours / 24 hours

**Pilot success criteria:**
17) What would make this pilot a win? (paragraph)
18) Anything else we should know? (paragraph)

========================
B) CUSTOMER EMAIL #1 — PILOT WELCOME + NEXT STEPS
========================
**Subject:** Your free 7-day Review Reply Autopilot pilot — next steps

Hi {{FirstName}},

Thanks for starting the free 7-day pilot for Review Reply Autopilot.

How it works (human-in-the-loop, low-risk):
1) You forward your Google/Yelp review notification emails to: agent_bob_replit+review-bot@agentmail.to
2) We draft a brand-safe response (and flag anything negative/urgent)
3) You approve (or request an edit)
4) We send you the exact final reply + a direct link/instructions to post it (you stay in control of posting)

Quick legitimacy links:
- Service page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

To start today, reply with:
- The best email to use for approvals (if different from this one)
- Your location list (name + city/address)
- Any brand voice notes (e.g., professional, friendly, no emojis, etc.)

Then follow the forwarding setup instructions in the next email.

— Bob
agent_bob_replit+review-bot@agentmail.to

========================
C) CUSTOMER EMAIL #2 — FORWARDING SETUP (GOOGLE + YELP)
========================
**Subject:** 10-minute setup: forward your review notifications to us

Hi {{FirstName}},

To power the pilot, please forward review notification emails to:
agent_bob_replit+review-bot@agentmail.to

Option A (fastest): Manual forwarding
- When you receive a Google/Yelp “new review” email, just forward it to the address above.

Option B (recommended): Auto-forwarding rule (Gmail / Google Workspace)
1) In Gmail: Settings → See all settings → Forwarding and POP/IMAP
2) Add forwarding address: agent_bob_replit+review-bot@agentmail.to
3) Create a filter (Settings → Filters and Blocked Addresses → Create a new filter)
4) Suggested filters (use what matches your notifications):
   - From contains: “google” and/or “noreply”
   - Subject contains: “review” or “New review”
   - Also add Yelp notifications if applicable
5) Choose action: Forward to agent_bob_replit+review-bot@agentmail.to

If you’re unsure which emails to catch, forward one sample notification and we’ll confirm the best filter.

Once forwarding is live, we’ll start drafting replies and sending approvals.

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

========================
D) INTERNAL OPS RUNBOOK (DAY-1 MANUAL FULFILLMENT)
========================
**Goal:** deliver “autopilot feel” without direct posting access.

1) **Create client record (manual tracking ok):**
- Client name, approval email, escalation contacts, SLA target, locations list.
- Assign each location a short code (e.g., ACME-DT, ACME-NORTH).

2) **Inbox monitoring (agent_bob_replit+review-bot@agentmail.to):**
- Check at least 3x/day (or more for high volume).
- For each incoming review email, log:
  - Timestamp received
  - Platform (Google/Yelp)
  - Location code
  - Star rating (if present)
  - Reviewer name + review text
  - Review URL (if present)

3) **Triage + escalation:**
Escalate immediately if ANY:
- <3 stars
- Contains keywords: refund, chargeback, lawsuit, attorney, legal, fraud, scam, BBB, health, injury, safety, discrimination, harassment
- Reviewer threatens PR/social/media

Escalation action:
- Email escalation contacts + approval email: subject “URGENT: New negative review requires response ({{Location}})”
- Include: review text, suggested private resolution line, and a short proposed response.

4) **Draft response (brand-safe):**
- Thank them, be specific, avoid admitting fault, invite offline resolution.
- Never disclose personal/health info.
- Keep under ~600 chars unless client prefers longer.

5) **Approval loop:**
- Send approval email with:
  - Proposed reply (final form)
  - 2 options: “Approve as-is” or “Reply with edits”
  - Include posting instructions + link to the review (if available)

6) **Post link-out:**
- Once approved, send a “Ready to post” message with exact copy/paste response.
- If the client wants you to post, respond: “Phase 1 is link-out posting only to reduce platform risk; posting automation can be added later.”

7) **Logging:**
- Record: draft sent time, approval time, posted confirmed time (if client confirms).
- Response time metric = approval sent time minus review received time.

8) **Weekly KPI email (every 7 days):**
- Total reviews by location + platform
- Avg star rating (weekly + trailing if available)
- Response time (median + % within SLA)
- Negatives (<3 stars) count + escalation count
- Unanswered reviews (if any)

This kit is ready to use immediately for outreach → intake → forwarding → fulfillment while the full MVP UI finishes.
