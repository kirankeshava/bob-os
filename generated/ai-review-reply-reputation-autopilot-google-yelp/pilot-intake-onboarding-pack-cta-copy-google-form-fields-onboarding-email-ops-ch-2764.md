# Pilot Intake + Onboarding Pack (CTA Copy + Google Form Fields + Onboarding Email + Ops Checklist)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T06:07:10.369Z

---

## 1) Pilot Intake (Google Form) — exact fields to use
Create a Google Form titled: **“AI Review Reply & Reputation Autopilot — Free 7‑Day Pilot”**
Form description (paste):
“Try our human-in-the-loop Review Reply Autopilot for 7 days: we draft brand‑safe responses to new Google/Yelp reviews, escalate negatives fast, and send a weekly KPI snapshot. Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 — Questions: agent_bob_replit+review-bot@agentmail.to”

**Required fields**
1. Contact name
2. Business name
3. Best email for approvals
4. Best phone (optional)
5. Primary platform(s): Google / Yelp / Both
6. Number of locations (1 / 2–3 / 4+)
7. Location list (repeatable via “Add another response” instructions): 
   - Location name
   - Address
   - Google Business Profile link (optional)
   - Yelp page link (optional)
8. Brand voice (choose one): Friendly / Professional / Premium / Playful / Other (short text)
9. “Do-not-say / compliance notes” (short paragraph)
10. Escalation contact email (can be same as approvals)
11. Escalation triggers to prioritize (checkboxes): Refund/chargeback, Legal/threat, Health/safety, Discrimination, Staff misconduct, Privacy/HIPAA/PHI, Other
12. SLA preference: “Alert me if unhandled negative review exists for more than:” 2h / 6h / 12h / 24h
13. Consent checkbox: “I confirm I can forward review notification emails to your inbox for drafting support during the pilot.”

Completion message (paste):
“Thanks — you’re in. Next step: watch for an onboarding email from agent_bob_replit+review-bot@agentmail.to with forwarding instructions and what to expect in the first 24 hours.”

---
## 2) Website CTA block (paste onto the site page)
**Headline:** Never miss a review again — replies drafted for you in minutes.

**Subhead:** Our human‑in‑the‑loop autopilot drafts brand‑safe responses to Google/Yelp reviews, escalates negatives, and emails weekly reputation KPIs. No risky API connections required in Phase 1.

**Free 7‑Day Pilot:** We’ll run it for one location (multi‑location supported) so you can see impact fast.

**Call to action:**
“Start the free pilot → [Google Form link]”

**Trust line:**
Questions or prefer email? Contact **agent_bob_replit+review-bot@agentmail.to**

Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---
## 3) Pilot onboarding email (send immediately after form submission)
Subject: Free 7‑Day Review Reply Autopilot — forwarding setup (10 minutes)

Hi {{FirstName}},

Thanks for starting the free 7‑day pilot of **AI Review Reply & Reputation Autopilot**.

What you’ll get this week:
- Drafted, brand‑safe replies for each new Google/Yelp review
- Fast escalation on negative reviews (low stars, negative sentiment, refund/legal/health keywords)
- A weekly KPI email (review volume, avg rating trend, response time, negative share, escalations)

Quick setup (Phase 1 = email forwarding, no API connections):
1) **Forward your review notification emails** to: **agent_bob_replit+review-bot@agentmail.to**
   - Google: forward “New review” / “You’ve got a new review” notifications from Google Business Profile
   - Yelp: forward Yelp review notifications
   If you have multiple locations, either:
   - forward from each location manager email, or
   - forward all to us and include the location name in the forward note.

2) Reply to this email with:
- Your preferred sign‑off name (e.g., “—The {{BusinessName}} Team”)
- Any “do not say” phrases or compliance constraints
- The best person to contact for escalations (if different)

How approvals work during the pilot:
- For each new review, you’ll receive a draft reply by email.
- You can reply with “APPROVE” or edits.
- We’ll send back the final text plus a **link-out** to post it on Google/Yelp (you remain in control of posting in Phase 1).

Learn more about how it works: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Talk soon,
Bob
agent_bob_replit+review-bot@agentmail.to

---
## 4) Internal ops checklist (Day 0–Day 7 pilot fulfillment)
**Day 0 (intake + setup)**
- Confirm form submission: business, locations, platforms, SLA hours, escalation contact
- Create client + location records (even if manual spreadsheet for first pilot)
- Send onboarding email (above)

**Daily cadence (minimum viable SLA)**
- Check inbox every 2–4 hours during business hours
- For each forwarded review email:
  1) Log: received timestamp, platform, location, reviewer name (if available), star rating (if available), review text
  2) Run sentiment + escalation rules:
     - Escalate if <3 stars OR negative sentiment OR keywords: refund, chargeback, lawsuit, attorney, HIPAA, unsafe, injury, harassment, discrimination, fraud
  3) Draft reply using brand voice constraints
  4) Email client draft for approval (include escalation note if triggered)
  5) On approval: send “final reply text + posting instructions + direct link to the review if available”

**Escalations**
- If escalated: email escalation contact immediately with subject “ACTION NEEDED: Negative review escalation ({{Location}})”
- If unhandled beyond SLA window: send reminder email every 6–12 hours until acknowledged

**Weekly KPI report (end of pilot)**
- Count: total reviews, % responded, avg rating, rating distribution, median response time, # escalations, unresolved aging
- Email a short summary + bullets of top issues/keywords seen

This pack is ready to use immediately for outreach and onboarding while the MVP UI continues to be built.
