# Pilot Onboarding System (Google Form Spec + Customer Onboarding Email + Internal Ops SOP + 30-Day Distribution Plan)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T06:48:20.808Z

---

## 1) Pilot Intake Form (Google Form) — exact spec (multi-location)

**Form title:** Review Reply & Reputation Autopilot — Free 7‑Day Pilot

**Form description (paste):**
Thanks for trying the free 7‑day pilot. We’ll draft brand-safe replies to your new Google/Yelp reviews, escalate negative reviews fast, and send a weekly KPI summary. This is a human-in-the-loop autopilot (you approve before posting). Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  Contact: agent_bob_replit+review-bot@agentmail.to

**Q1 (Required, short answer):** Business name

**Q2 (Required, short answer):** Your name + role (owner/manager/front desk/etc.)

**Q3 (Required, short answer):** Best email for approvals (where we send “Approve/Edit”)

**Q4 (Optional, short answer):** Mobile number for urgent escalations (email-only is fine)

**Q5 (Required, multiple choice):** Platforms to manage
- Google Business Profile
- Yelp
- Other (short answer)

**Q6 (Required, dropdown):** Primary industry
- Dentist
- Med spa
- HVAC
- Plumbing
- Restaurant
- Law firm
- Other

**Q7 (Required, paragraph):** Locations (one per line)
Ask them to provide per location:
- Location nickname (e.g., “Downtown”, “Austin North”)
- Address
- Google Maps link (if available)
- Yelp page link (if available)

**Q8 (Required, paragraph):** Brand voice (pick one style + any do/don’ts)
Prompt them:
- Style: Friendly / Professional / Luxury / No-nonsense / Casual
- Must-say phrases (optional)
- Never say (optional)
- How to handle discounts/refunds publicly (e.g., “Take it offline”)

**Q9 (Required, paragraph):** Escalation contacts & rules
- Who should be alerted on negative reviews? (names + emails)
- Any special keywords to escalate? (e.g., “refund”, “lawsuit”, “mold”, “injury”)

**Q10 (Required, multiple choice):** SLA target for first draft
- Within 2 business hours
- Within 6 business hours
- Within 24 hours

**Q11 (Required, checkbox):** Permissions & confirmation
- I confirm I own/manage these listings and can post replies.
- I understand this pilot provides drafted replies + posting instructions; posting is done by my team during Phase 1.

**Form settings:**
- Collect emails: ON
- Send response receipts: ON (include next steps link to onboarding page if you have it; otherwise a plain message)
- Notifications: email notifications to agent_bob_replit+review-bot@agentmail.to

---

## 2) Customer Onboarding Email (send after form submission)

**Subject:** Next step for your free 7‑day Review Reply Autopilot (Forward review emails)

Hi {{Name}},

Thanks for starting the free 7‑day pilot.

To begin drafting replies automatically, please forward your new-review notification emails to:
**agent_bob_replit+review-bot@agentmail.to**

This forwarding method keeps things safe and simple (no risky account access needed). You’ll receive brand‑safe draft responses from us for approval before anything gets posted.

### A) Google Business Profile (Gmail/Google Workspace)
1) Find a recent Google “You received a new review” email.
2) In Gmail, click the three dots → **Filter messages like these**.
3) Create filter: from: `googlemybusiness-noreply@google.com` (or the sender you see).
4) Click **Create filter** → check **Forward it to** → enter:
   **agent_bob_replit+review-bot@agentmail.to**
5) Save.

### B) Yelp
1) Find a Yelp review notification email.
2) Create a filter and forward to:
   **agent_bob_replit+review-bot@agentmail.to**

### What happens next (human-in-the-loop autopilot)
- We ingest the review email and tag it (positive/neutral/negative).
- We draft a reply in your brand voice.
- We email you an approval message (Approve / Request edits / Skip).
- Once approved, we send you a “post it here” link to the exact Google/Yelp review so your team can paste and post in under 60 seconds.

### Escalations (negative reviews)
We immediately flag reviews that are **<3 stars**, contain keywords like **refund/legal/health/safety**, or read as angry/urgent. We’ll email the escalation contact(s) you listed.

### Legitimacy / contact
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
If forwarding is difficult, reply here and we’ll walk you through it.

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 3) Internal Ops SOP (run pilots immediately, no UI required)

**Goal:** Reply drafts delivered fast; negatives escalated; weekly KPI email sent.

### Inbox & triage (always-on)
- Monitor: agent_bob_replit+review-bot@agentmail.to
- SLA targets (pilot default):
  - Negative/urgent: draft within 2 hours (business hours)
  - Neutral/positive: draft within 24 hours

### Step 1 — Identify client + location
- Match by forwarded-to alias (if used) or by the listing link/address inside the email.
- If ambiguous: reply to client approval email asking which location.

### Step 2 — Extract fields into log
Log row (Sheet/DB):
- Date received, Client, Location, Platform, Star rating, Reviewer name, Review text, Listing/review URL, Sentiment, Status (New/Drafted/Waiting approval/Approved/Posted/Skipped), Escalated? (Y/N)

### Step 3 — Sentiment + escalation rules
Escalate if any:
- Stars <= 2
- “refund”, “chargeback”, “scam”, “lawsuit”, “attorney”, “HIPAA”, “injury”, “mold”, “food poisoning”, “health department”, “discrimination”, “racist”, “harassment”
- Explicit threats: “I’m reporting…”, “I’m suing…”, “I’ll post everywhere…”
Action:
- Email escalation contacts with review text + suggested private-resolution steps.

### Step 4 — Draft reply (brand-safe)
Rules:
- Never admit fault/legal liability.
- Offer to take offline for specifics.
- Thank, empathize, be concise.
- If positive: reinforce brand value, invite return.

### Step 5 — Send approval email
Send to approval address with:
- Review summary + draft reply
- Simple choices: “APPROVE”, “EDIT: …”, “SKIP” (reply-based approval works day 1)
- Include posting link(s) to Google/Yelp review page.

### Step 6 — Posting / confirmation
Phase 1: client posts. We:
- Ask them to reply “POSTED” once done.
- Update log status to Posted.

### Step 7 — Weekly KPI report (every Monday)
Per client + per location:
- New reviews count
- Avg star rating this week vs last week
- % responded (approved+posted)
- Median response time (received → posted)
- # escalations + time-to-first-touch
- Oldest unhandled review age
Email report from agent_bob_replit+review-bot@agentmail.to.

---

## 4) 30-Day, $0 Distribution Plan (to land first pilots)

**Positioning:** “Human-in-the-loop Review Reply Autopilot for Google/Yelp: drafts in your voice, negative review escalation, weekly KPIs. No account access required. Free 7‑day pilot.”

### Daily cadence (Mon–Fri)
- 30 cold emails/day to owners/managers in one niche batch (e.g., dentists week 1).
- 20 DMs/day (Facebook local business groups + Instagram).
- 10 calls/day (ask for email; offer free pilot).

### Lead sourcing (free)
- Google Maps search (city + niche). Record: business name, site, phone, owner/manager email if available.
- Yelp category pages.

### Tracking (simple sheet columns)
Date | Niche | Business | City | Contact | Email | Phone | Channel | Status | Next follow-up date | Notes | # locations | Platform (G/Y)

### Weekly targets
- Week 1: 2–3 pilot businesses (1 location each) OR 1 business with 3+ locations.
- Week 2: convert pilots to referrals/testimonials; expand to second niche.
- Week 3–4: systematize and upsell to multi-location packages once paid is allowed.

If we can’t get pilots after 200–300 outbound touches, reposition offer to a clearer ROI niche (e.g., med spas, dentists, HVAC) and tighten the promise to “responses within 24 hours + negative review escalation within 2 hours.”
