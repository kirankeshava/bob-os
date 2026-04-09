# Outbound Execution System (Week 1): HubSpot Setup + Import Sheet + 7-Day Cadence + Craigslist/FB Distribution + Daily KPI Report

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T21:09:28.620Z

---

## 1) HubSpot Free CRM Setup (do this first)
**Signup (free):** HubSpot CRM → use
- Name: Bob Smith
- Email: agent_bob_replit@agentmail.to

**Pipeline (Deals) name:** No-Show Reducer – Locations
**Stages (in order):**
1. New Lead (not contacted)
2. Contacted (Email 1 / Call 1)
3. Engaged (reply / conversation started)
4. Demo Scheduled
5. Demo Held
6. Trial/Setup Started (free 7-day)
7. Closed Won (Location Live)
8. Closed Lost
9. Nurture (future)

**Required custom properties (create as Deal properties):**
- Vertical (Dentist / Chiro / Med Spa / PT / Optometry / Other)
- City Cluster (e.g., “Austin TX”, “Phoenix AZ”)
- Appointment Volume (visits/week)
- No-Show Rate (%)
- Avg Value per Visit ($)
- Scheduling System (Practice mgmt / Google Calendar / paper / other)
- Decision Maker Role (Owner / Office Manager / GM)
- Demo Date/Time
- Next Step (text)
- Last Touch Date
- Next Touch Date

**Contact properties to capture:**
- First Name, Last Name
- Title
- Email
- Phone
- Source (Google Maps / Yelp / Zocdoc / Directory)

**Logging rule:** Every touch gets a note: “Channel + what sent/said + outcome + next step date”. Speed > perfection.

---
## 2) Import-Ready Lead Capture Sheet (copy/paste into Sheets)
Create a Google Sheet with these exact columns (matches HubSpot import cleanly):

**Company Columns**
- Company Name
- Website
- Main Phone
- Address
- City
- State
- Zip
- Google Maps URL
- Vertical
- City Cluster

**Primary Contact Columns**
- Contact First Name
- Contact Last Name
- Title/Role
- Email
- Direct Phone (if different)

**Deal / Outreach Columns**
- Deal Name (format: “{Company Name} – {City}”)
- Deal Stage (start: New Lead)
- Last Touch Date
- Last Touch Channel (Email/Call/Text/FB/CL)
- Last Touch Notes
- Next Touch Date
- Next Touch Channel
- Status (Open / Nurture / Lost)

**Data quality rules:**
- If no email: keep the row anyway (call-first lead)
- If no decision-maker name: use “Office” and capture the front-desk name on first call
- Dedupe by Website + Main Phone

---
## 3) Week-1 Outbound Cadence (Day 1–7)
**Daily targets:** 50–100 emails/day, 20–40 calls/day, 1–2 Craigslist posts/week per city cluster, 5–10 FB value posts/comments/week.

### Email sequence (plain text, short, personalized first line)
**Email 1 (Day 1):**
Subject: quick question about no-shows at {Business}

Hi {Name} — quick question.

Do you currently confirm appointments by two-way text (so patients reply YES/NO), or is it mostly one-way reminders?

We reduce no-shows for appointment-based businesses using two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.

If you’re open, I can show a 10-minute demo and estimate recovered revenue for {Business}.

Legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Best email to reply: agent_bob_replit+no-show-bot@agentmail.to

— Bob

**Email 2 (Day 3):**
Subject: {Business} — fill last-minute gaps?

Hi {Name} — following up.

If someone cancels/no-shows, do you have a reliable way to fill that spot the same day?

Our system confirms by text, auto-reschedules “NO” replies, and can message a waitlist to fill gaps. Happy to set up a free 7-day trial for one location.

Can I send a couple times for a quick demo?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

**Email 3 (Day 6):**
Subject: should I close the loop?

Hi {Name} — should I close the loop here, or is reducing no-shows a priority this month?

If you tell me roughly (1) appointments/week and (2) typical no-show %, I’ll estimate recovered revenue and send it back.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Call blocks
**Day 1–2:** Call same-day as Email 1 to priority leads (no email leads are call-first).
**Day 3–5:** Call non-responders again; attempt to reach owner/manager.
**Day 6–7:** Last attempt; move to Nurture if no contact.

**Call opener (20 seconds):**
“Hi, is this {Name}? Bob here — I help clinics reduce appointment no-shows using two-way SMS confirmations and instant reschedules. Quick question: are confirmations currently two-way (patients reply YES/NO), or mostly reminders?”

If interest: “Great — can we do a 10-minute screen share? I’ll estimate recovered revenue per month for your location.”

---
## 4) Craigslist Post Templates (1 per city cluster)
**Title:** Reduce appointment no-shows (two-way SMS confirmations) — free 7-day trial
**Body:**
If your clinic/shop loses revenue from no-shows and last-minute cancellations, we can help.

We set up two-way SMS confirmations (clients reply YES/NO), automate reschedules, and fill gaps from a simple waitlist. Setup is done-for-you in 24–48 hours.

Free 7-day trial for one location.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

---
## 5) FB Group Value Comment/Post (non-spam)
**Value post idea:** “No-show reduction checklist: 5 quick wins (two-way confirmations, reschedule flow, waitlist fill, reminder timing, confirmation language)”.
**CTA line:** “If anyone wants, I can share the exact SMS confirmation wording + the reschedule flow we deploy. Email: agent_bob_replit+no-show-bot@agentmail.to | overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

---
## 6) Daily KPI Report (copy/paste)
**Date:**
- Emails sent:
- Email replies:
- Positive replies:
- Calls placed:
- Conversations:
- Demos booked:
- Demos held:
- Trials started:
- Closed won:
- Notes / blockers:

**Pipeline counts:**
- New Lead:
- Contacted:
- Engaged:
- Demo Scheduled:
- Demo Held:
- Trial/Setup Started:
- Closed Won:
- Closed Lost:

**Non-negotiable:** Every demo scheduled gets a calendar invite + same-day confirmation email from agent_bob_replit+no-show-bot@agentmail.to.
