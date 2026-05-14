# Phase-1 Pilot Ops Kit — AI Review Reply & Reputation Autopilot (Email Ingest → Draft → Approve → Post-Link → Log + SLA Escalations + Weekly KPI Report)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T06:30:49.576Z

---

Overview (what the customer experiences)
- Customer forwards Google Business Profile and/or Yelp review notification emails to: agent_bob_replit+review-bot@agentmail.to
- We reply with a brand-safe drafted response within the agreed SLA (e.g., < 12 business hours), plus an Approve/Change/Decline workflow.
- Customer (or staff) posts the approved response manually in Google/Yelp using a provided link-out. We log the outcome.
- If a review is negative (<3 stars), contains risky keywords, or sentiment is negative, we escalate immediately to the customer’s escalation contact.
- Every week, customer receives a KPI email summarizing volume, rating trend, response time, negatives, escalations, and unhandled items.

Legitimacy link to include in all customer communications
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support/Inbox: agent_bob_replit+review-bot@agentmail.to

A) Onboarding checklist (multi-location)
1) Intake (per business)
   - Business name + primary contact
   - Locations list (Location Name, Address, Google Maps link if available)
   - Platforms: Google Business Profile, Yelp (which locations are on which platform)
   - Brand voice: “friendly + professional”, “warm + casual”, or provide 3 examples of how they speak to customers
   - Do-not-say list (e.g., no admitting fault, no refunds promised, no medical/legal claims)
   - Escalation contact(s): name, email, phone (optional)
   - Hours/SLA expectations (e.g., 9am–6pm local time, weekends optional)

2) Forwarding setup (customer)
   - Google: In their email account that receives “New review” notifications, create a rule to forward to agent_bob_replit+review-bot@agentmail.to.
   - Yelp: Same—forward Yelp review alerts to agent_bob_replit+review-bot@agentmail.to.
   - If they cannot auto-forward, they can manually forward each review email.

3) Location mapping
   - When forwarding is enabled, customer forwards ONE example email per location/platform and writes in the email body:
     “Location: <Location Name> | Platform: Google/Yelp”
   - We confirm mapping so future emails auto-route.

4) Trial expectations (free 7-day)
   - We draft replies for every new review received via the forwarded emails.
   - Customer remains the final poster (manual post) during Phase 1.
   - We send weekly KPI summary at end of trial.

B) Internal triage workflow (back-office)
1) Check inbox (agent_bob_replit+review-bot@agentmail.to) on cadence (e.g., 9am, 12pm, 3pm, 6pm local time).
2) For each new review email:
   - Identify client + location + platform.
   - Extract: reviewer name (if present), star rating, review text, review date/time, platform link (if present).
   - If parsing is uncertain, mark “Needs human confirm” and ask client for missing details.
3) Sentiment + escalation triggers
   - Auto-negative if: stars <= 2 OR review contains keywords (refund, lawsuit, attorney, BBB, HIPAA, injury, scam, fraud, chargeback, health department, discrimination, racist, harassment) OR explicit threat.
   - Borderline if: 3 stars with complaints.
4) Draft response
   - Use brand voice + compliance rules (no personal data, no admitting liability, invite offline resolution, thank them).
   - Provide 1 primary draft + 1 shorter alternative if helpful.
5) Send approval email to customer (template below). Include:
   - The draft
   - Link-out instructions (where to paste it)
   - Ask for Approve / Request changes / Decline
6) When customer approves:
   - Log “Approved timestamp”.
   - If customer posts themselves: ask them to reply “Posted ✅” once done.
   - If they want us to post in the future: note as Phase 2 (requires platform access/API).
7) Logging fields (minimum)
   - client_name, location_name, platform (Google/Yelp)
   - review_received_at, stars, sentiment (pos/neutral/neg), escalation_flag
   - draft_sent_at, approved_at, posted_at (or “customer_confirmed_posted_at”)
   - status: new / drafted / awaiting_approval / approved / posted / escalated / closed

C) Customer-facing email templates (copy/paste)

1) Draft ready (approval request)
Subject: Draft reply ready for your new {Google/Yelp} review ({Location Name})

Hi {First Name},

A new {Google/Yelp} review came in for {Location Name}. I drafted a brand-safe response below.

Business: {Business Name}
Location: {Location Name}
Rating: {X} stars
Review (excerpt): “{Review Text}”

Draft response (recommended):
{DRAFT_TEXT}

If you want a shorter version:
{ALT_DRAFT_TEXT}

Reply with one of these:
1) APPROVE
2) CHANGE: <tell me what to adjust>
3) DECLINE (we won’t respond)

Posting (Phase 1 manual link-out):
- Please paste the approved response directly in your {Google/Yelp} business account under the review.
- If you can, reply “Posted ✅” after it’s live so we can log it for your KPI report.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

—Bob

2) Change requested (ack + revised draft)
Subject: Updated draft for {Location Name} review

Hi {First Name},

Got it—thanks. Here’s the updated response based on your notes:

{UPDATED_DRAFT_TEXT}

Reply APPROVE to proceed, or send another tweak.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

—Bob

3) Negative review escalation (immediate)
Subject: ACTION NEEDED: Negative {Google/Yelp} review for {Location Name} ({X} stars)

Hi {First Name},

Flagging this for fast handling.

Location: {Location Name}
Platform: {Google/Yelp}
Rating: {X} stars
Review: “{Review Text}”

Recommended approach:
- Acknowledge, keep it short, move resolution offline.
- Do not mention private details.

Draft response:
{DRAFT_TEXT}

Please reply APPROVE or tell me what happened and I’ll adjust.
If you prefer we do not respond publicly, reply DECLINE.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

—Bob

D) SLA escalation alerts (internal + customer)

1) Aging reminder to customer (if awaiting approval > X hours)
Subject: Reminder: review reply pending approval ({Location Name})

Hi {First Name},

Quick reminder—your drafted reply is waiting for approval so we can respond within SLA.

Location: {Location Name}
Platform: {Google/Yelp}
Rating: {X} stars
Draft:
{DRAFT_TEXT}

Reply APPROVE / CHANGE / DECLINE.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

—Bob

2) Internal ops alert (if unhandled new review > X hours)
Subject: SLA ALERT: Unhandled review > {X}h — {Client} / {Location}

Queue item:
- Client: {Client}
- Location: {Location}
- Platform: {Google/Yelp}
- Stars: {X}
- Received: {timestamp}
- Status: {new/drafted/awaiting_approval/escalated}
- Risk flags: {keywords/sentiment}

Next action required: {Draft now | Send approval | Escalate | Follow up}

E) Weekly KPI report email template (multi-location)
Subject: Weekly Reputation KPI Report — {Business Name} ({Week Start}–{Week End})

Hi {First Name},

Here’s your weekly reputation snapshot.

Overall (all locations)
- New reviews: {N_TOTAL}
- Average star rating (this week): {AVG_THIS_WEEK}
- Average star rating (prior week): {AVG_LAST_WEEK}  (Δ {DELTA})
- Response coverage: {RESPONDED}/{N_TOTAL} ({PCT_RESPONDED}%)
- Median time-to-first-draft: {MEDIAN_DRAFT_HRS} hrs
- Median time-to-response (approved→posted): {MEDIAN_POST_HRS} hrs (based on confirmations)
- Negative reviews (≤2 stars): {N_NEG} ({PCT_NEG}%)
- Escalations triggered: {N_ESC}
- Oldest unhandled review age: {OLDEST_AGE_HRS} hrs

By location
{LOCATION_TABLE}

Notes / Action items
- {Item 1}
- {Item 2}

If you’d like, share 1–2 examples of your preferred tone and we’ll tighten the voice even more next week.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

—Bob

F) Brand-safe drafting rules (to reduce risk)
- Never disclose private customer info.
- Don’t admit legal liability; avoid definitive statements like “We messed up” → use “We’re sorry to hear…”
- Don’t promise refunds/compensation publicly.
- Invite offline resolution: “Please contact us at {phone/email} so we can make this right.”
- For medical/legal/regulated: avoid advice; keep generic.

G) Minimal manual tools (no spend)
- Use email threads as the approval system.
- Use a simple spreadsheet (or internal notes) for the logging fields in section B7.
- Weekly KPI email can be assembled from the log until automated reporting is ready.

This kit is sufficient to deliver a true ‘autopilot feel’ in Phase 1 while keeping posting access/API risk low, and it supports multiple locations from day one via location mapping in onboarding.