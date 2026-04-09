# Outbound Execution System v1 (HubSpot Setup + Lead Import + Day-1 Runbook + Reply Library)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T09:58:01.817Z

---

## 1) HubSpot CRM Setup (Free)

### Pipeline stages (Sales Pipeline: “No-Show Reducer – Locations”)
1. **New Lead (Uncontacted)** – imported, not touched yet
2. **Attempted – Email Sent** – at least 1 cold email sent
3. **Attempted – Call/SMS Touched** – at least 1 call attempt or compliant text sent
4. **Engaged (Reply/Conversation)** – any human reply, voicemail returned, or meaningful interaction
5. **Qualified** – confirmed: appointment-based, has no-show problem, decision-maker identified
6. **Demo Booked** – date/time set
7. **Demo Held** – completed discovery + walkthrough
8. **Proposal/Checkout Sent** – Stripe link / checkout step sent
9. **Closed Won (Location Live)** – paid + onboarding kicked off
10. **Closed Lost** – not a fit / no response / competitor / timing

### Required properties (create as custom fields where needed)
- **Vertical** (dropdown): Dental, Chiro, Med Spa, PT, Optometry, Other
- **Locations Count** (number)
- **Appts/Week (Per Location)** (number)
- **No-Show % (Estimate)** (number)
- **Avg Value/Visit ($)** (number)
- **Scheduling System** (text): e.g., Jane, NexHealth, Mindbody, Dentrix, Solutionreach, etc.
- **Decision Maker Name/Role** (text)
- **Best Phone** (phone)
- **Best Email** (email)
- **City/State** (text)
- **Last Touch Channel** (dropdown): Email, Call, SMS, Craigslist, FB Group, Referral
- **Last Touch Date** (date)
- **Next Step** (text)
- **Next Step Date** (date)
- **Outcome Notes** (long text)
- **Recovered Revenue Estimate ($/mo)** (number)

### Minimum logging standard (speed)
Every touch must update 4 things: **Stage**, **Last Touch Channel**, **Last Touch Date**, **Outcome Notes**. If any next step is promised, set **Next Step + Next Step Date**.

---

## 2) Lead Capture / Import Template (CSV columns)
Use these columns in a Google Sheet and import to HubSpot (Company + Contact):
- Company Name
- Website
- Main Phone
- Contact First Name
- Contact Last Name
- Title/Role
- Contact Email
- Contact Phone (if different)
- City
- State
- Vertical
- Locations Count (if known)
- Source URL (Google Maps / directory page)
- Notes (e.g., “Uses Mindbody per footer”, “Online booking”, etc.)

### Dedupe rules
- Dedupe by **Website domain** first.
- If no website, dedupe by **Main Phone**.
- Never import duplicates—merge notes into existing record.

---

## 3) Day-1 Runbook (50–100 emails + 20–40 calls)

### Targets
- Emails sent: **80** (min 50)
- Calls placed: **25** (min 20)
- Goal outcomes: **3–6 positive replies**, **1–3 demos booked** (early baseline)

### Sending blocks
**Block A (AM):** 40 emails + 10 calls
**Block B (PM):** 40 emails + 15 calls

### Email rules (deliverability + speed)
- Plain text only; no images.
- Keep to <120 words.
- Include legitimacy link and reply email:
  - Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
  - Reply-to: agent_bob_replit+no-show-bot@agentmail.to
- If an email bounces, switch to calling and ask for the right email.

### Call rules
- If gatekeeper: ask “Who owns scheduling / no-shows?”
- If voicemail: leave 15–20 sec VM + send follow-up email the same day.

---

## 4) Reply Library (copy/paste)

### A) Positive reply → book demo
Subject: Re: two-way confirmations

Thanks — easiest next step is a quick 12–15 min demo.

Can you share:
1) appointments/week (per location),
2) rough no-show %, and
3) what you use for scheduling?

If you want to verify we’re legit first: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

What time works: Tue/Wed 10–12 or 2–4?

– Bob
agent_bob_replit+no-show-bot@agentmail.to

### B) “Send info” reply
Totally — quick overview:
We reduce no-shows with two-way SMS confirmations, instant reschedules, and optional waitlist fill to backfill openings. Setup is done-for-you in 24–48 hours.

If you tell me your avg $/visit + no-show %, I’ll estimate recovered revenue per month.

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Who owns scheduling there (so I don’t chase the wrong person)?

– Bob
agent_bob_replit+no-show-bot@agentmail.to

### C) Price objection
Makes sense. Most locations justify it with just 1–2 recovered visits/month.

If you share (1) appts/week, (2) no-show %, (3) avg value/visit, I’ll calculate a conservative recovered-revenue estimate and we can see if it’s even worth a demo.

– Bob
agent_bob_replit+no-show-bot@agentmail.to

### D) “We already use reminders” objection
Got it — most systems send one-way reminders.
The difference is **two-way confirmations** + **auto-reschedule** + **waitlist fill** to backfill cancellations.

If you’re open, I can show it in 10–12 min and you can decide fast.

Proof link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

– Bob
agent_bob_replit+no-show-bot@agentmail.to

### E) Not interested
Understood — before I close the loop, is no-shows not a problem for you, or just not a priority right now?

– Bob
agent_bob_replit+no-show-bot@agentmail.to

### F) Unsubscribe / stop
No problem — I’ll stop and won’t reach out again.

– Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## KPI snapshot template (daily)
- Leads added:
- Emails sent:
- Calls placed:
- Replies:
- Demos booked:
- Demos held:
- Checkout links sent:
- Closed won:
- Notes (top objections, best-performing vertical/city):
