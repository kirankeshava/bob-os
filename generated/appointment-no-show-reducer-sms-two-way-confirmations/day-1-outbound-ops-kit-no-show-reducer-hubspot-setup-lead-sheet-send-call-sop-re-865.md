# Day-1 Outbound Ops Kit (No-Show Reducer) — HubSpot Setup + Lead Sheet + Send/Call SOP + Reply Library

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T10:40:06.715Z

---

## 1) HubSpot Free CRM Setup (fast)
**Account:** Bob Smith — agent_bob_replit@agentmail.to (free tier)

### Pipeline (Deals) stages
1. **New Lead (Uncontacted)**
2. **Attempted Contact (No Reply Yet)**
3. **Engaged (Replied/Connected)**
4. **Demo Booked**
5. **Demo Held**
6. **Trial/Pilot Proposed** (if you offer a pilot)
7. **Closed Won (Location Live)**
8. **Closed Lost**
9. **Nurture (Later)**

### Contact properties (minimum viable)
Create these custom properties (or track in Notes if you want zero setup):
- **Vertical** (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- **City Cluster** (ex: “Phoenix-Scottsdale”, “Dallas-Fort Worth”)
- **Role** (Owner/Office Manager/Practice Manager/Front Desk)
- **Scheduling System** (Unknown/Square/Acuity/Calendly/Mindbody/Other)
- **Appts per week (est.)** (number)
- **No-show rate (est.)** (number or range)
- **Value per visit (est.)**
- **Next Step** (Call back / Send details / Booked demo / Not a fit)
- **Last Touch Channel** (Email/Call/Text)

### Daily task queues
Create 3 saved views or task queues:
- **Email today (50–100)**: New Lead + Attempted Contact
- **Call block (20–40)**: Attempted Contact + Engaged
- **Follow-ups**: Engaged + Demo Booked (confirmations)

## 2) Lead Capture Spreadsheet Template (copy/paste columns)
Use this exact header row for import to HubSpot:
- Business Name
- Website
- Phone
- City
- State
- Address
- Vertical
- Decision Maker Name
- Decision Maker Title
- Email
- Secondary Email
- Notes (ex: “mentions online booking”, “multiple locations”, “open Sat”)
- Scheduling System (if visible)
- Source URL (Google Maps listing or directory link)
- City Cluster
- Status (New/Attempted/Engaged/etc.)

### Free sourcing method (repeatable)
Pick **2 city clusters** and **5 verticals**. Use Google Maps + organic search.
Search strings:
- “dentist + [city]”
- “chiropractor + [city]”
- “med spa + [city]”
- “physical therapy + [city]”
- “optometrist + [city]”

For each listing, capture: business name, phone, website, and any “Contact” email. If email isn’t visible, capture website and use the contact form or common patterns (info@, office@, hello@). Deduplicate by **website domain + phone**.

## 3) Day-1 Outbound Execution SOP (do this today)
### Goal
Book demos by pitching a tight offer:
**“We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”**

### Email sending (50–100/day)
**Format:** plain text, short lines, no images, no attachments.
**From:** agent_bob_replit+no-show-bot@agentmail.to
**Legitimacy URL to include when asked / in follow-up:**
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

**Send schedule:**
- Block 1: 25 emails
- Block 2: 25 emails
- Block 3: 25 emails
- Block 4: 0–25 emails (only if bounce/reply rates normal)
Log each send in HubSpot (or BCC a logging inbox if you prefer later).

### Call block (20–40/day)
- Call 20 in the morning, 20 late afternoon.
- If gatekeeper: ask for “who manages scheduling/no-shows”.
- If voicemail: leave a 12–18s message and then send the matching email.

### Texts (only where compliant)
If you have an existing business relationship or clear permission context, send a short text after a call attempt:
“Hi {{Name}}—Bob here. Quick Q: are you the right person for scheduling/no-show reduction at {{Biz}}? If yes I can share how we cut no-shows with two-way SMS confirmations. Reply YES and I’ll send details.”

### Logging rules (non-negotiable)
After each touch, update:
- Last touch channel + date
- Outcome (no answer / wrong person / interested / not now / not a fit)
- Next step date (task)

## 4) Cold Email Templates (Day-1 set)
### Email A (default)
Subject: Quick question about no-shows at {{Business}}

Hi {{Name}}—Bob here.

Do you handle scheduling/no-shows for {{Business}}?

We help appointment-based locations reduce no-shows using two-way SMS confirmations, instant reschedules, and waitlist fills. Setup is done-for-you in 24–48 hours.

If you’re the right person, what’s your rough no-show rate and how many appointments/week?

—Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email B (owner-forward)
Subject: {{Business}} — reduce no-shows without changing your system

Hi {{Name}},

We plug into your current scheduling workflow and reduce no-shows with:
- two-way SMS confirmations
- auto-reschedule when someone cancels
- waitlist fill to backfill gaps

If it’s worth a quick look, I can show you a 10-min demo and estimate recovered revenue per month.

Where should I send details? (Or book time and I’ll confirm.)
—Bob

### Email C (social proof angle without claims)
Subject: Filling last-minute cancellations at {{Business}}

Hi {{Name}}—quick one.

When a patient/client cancels same-day, do you have a waitlist process that actually fills the slot?

Our tool automates reminders + confirmations and can text a waitlist to fill gaps fast. Here’s the info page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Open to a short demo this week?
—Bob
agent_bob_replit+no-show-bot@agentmail.to

## 5) Cold Call Script (20–40/day)
“Hi, is this {{Name}}? Hey {{Name}}—Bob here. I’ll be brief. I’m reaching out because we help appointment-based businesses reduce no-shows using two-way SMS confirmations and instant rescheduling.

Quick question: are you the person who owns scheduling/no-show processes?”

If YES:
“Roughly how many appointments do you run per week, and what’s your no-show rate? Even a ballpark is fine.”

Then:
“Based on that, it usually pays for itself quickly. Can we do a 10–15 minute demo? I can show the confirmation flow + how reschedules and waitlist fills work.”

If NOT decision maker:
“Got it—who’s the best person for scheduling/no-shows? Could you connect me or share their email?”

Voicemail:
“Hi {{Name}}, Bob calling—quickly, we reduce appointment no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. I’ll send an email as well. If you handle scheduling, reply with your no-show rate and I’ll send a quick estimate. Thanks.”

## 6) Reply Handling Library (copy/paste)
### Positive: “Interested / send info”
“Great—what scheduling system are you using today (Square/Acuity/Mindbody/other), and about how many appointments/week?

If you share your rough no-show % and avg value per visit, I’ll come to the demo with an estimate of recovered revenue.

Here’s the overview page as well: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

What time works: {{two time options}}?”

### Neutral: “Not now”
“No problem—what’s a better month to revisit? Also, are no-shows currently a problem or mostly under control?”

### Objection: “We already send reminders”
“Makes sense—most do. The lift usually comes from **two-way confirmations + auto-reschedule + waitlist fill**, not just reminders.

If I can show you in 10 minutes how we backfill cancelled slots, would it be worth a look?”

### Price ask
“Pricing depends mainly on appointment volume per location. If you tell me appts/week and number of locations, I’ll quote precisely.

Either way, we set it up done-for-you in 24–48 hours and track recovered revenue so you can see ROI.”

### Stop / unsubscribe
“Understood—won’t contact you again. I’ve removed you from my outreach list.”

## 7) Daily KPI Report (paste into notes each day)
Date:
- Emails sent:
- Email replies:
- Calls placed:
- Connections:
- Texts sent:
- Demos booked:
- Demos held:
- Closed won:
- Closed lost:
Top objections today:
What message performed best:
Pipeline risks / follow-ups due tomorrow:

---
If you want, I can also generate the first two city clusters + a 200-lead starter sheet structure for you to fill in immediately (or import once HubSpot is created).