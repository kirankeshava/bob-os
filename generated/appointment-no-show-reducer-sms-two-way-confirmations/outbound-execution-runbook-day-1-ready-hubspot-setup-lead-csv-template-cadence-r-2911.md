# Outbound Execution Runbook (Day-1 Ready): HubSpot Setup + Lead CSV Template + Cadence + Reply Library

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T06:38:56.201Z

---

## 1) Offer + legitimacy (use everywhere)
**Offer (1 sentence):** We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.
**Legitimacy URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
**Reply email:** agent_bob_replit+no-show-bot@agentmail.to

## 2) HubSpot Free CRM (setup checklist)
Create HubSpot free account with:
- Name: Bob Smith
- Email: agent_bob_replit@agentmail.to

### Pipeline stages (Deals OR Contacts lifecycle—pick one and keep it consistent)
Recommended: **Deals pipeline** called “No-Show Reducer – Outbound”. Stages:
1. **Prospect – Not Contacted** (import lands here)
2. **Emailed – Attempt 1**
3. **Called/Texted – Attempt 1**
4. **Engaged (Reply/Connect)**
5. **Demo Booked**
6. **Demo Held**
7. **Trial/Setup Started (Free 7-day)**
8. **Closed Won (Paid Location)**
9. **Closed Lost**
10. **Do Not Contact**

### Required properties (create as custom fields)
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City Cluster (e.g., “Phoenix AZ”, “Tampa FL”)
- Website
- Main Phone
- Contact Name
- Contact Role (Owner/Office Manager/Practice Manager/Front Desk)
- Email (if known)
- Scheduling System (Unknown / Calendly / Acuity / NexHealth / Weave / Jane / Other)
- Est. appts/week (Unknown / <25 / 25–75 / 75–150 / 150+)
- No-show rate (Unknown / <5% / 5–10% / 10–20% / 20%+)
- Value per visit (Unknown / <$100 / $100–$250 / $250–$500 / $500+)
- Last Touch Date
- Next Step (free text)
- Next Step Date
- Outcome (No answer / Left VM / Gatekeeper / Wrong contact / Interested / Not now / Not a fit)

### Daily KPI fields (track in a simple note or HubSpot report)
- Emails sent
- Calls placed
- Texts sent
- Replies (positive/neutral/negative)
- Demos booked
- Demos held
- Trials started
- Closed won

## 3) Lead capture CSV template (copy these exact columns)
Use this header row in a Google Sheet and export CSV:
Company Name,Vertical,City,State,City Cluster,Website,Main Phone,General Email,Contact Name,Contact Role,Contact Email,Google Maps URL,Notes,Scheduling System,Est. appts/week,No-show rate,Value per visit,Owner/Decision Maker?,Source,Status

**Dedupe rule:** dedupe by Website OR Main Phone. If both missing, dedupe by Company Name + City.

## 4) Free lead sourcing (200 leads in 1 day)
Pick **2 city clusters** (example: Phoenix AZ + Tampa FL). For each cluster, pull ~20 businesses per vertical (5 verticals = 100 per city; 200 total).

Vertical search queries (Google/Maps):
- Dentists: "dentist" + city, "family dentistry" + city
- Chiropractors: "chiropractor" + city
- Med spas: "med spa" + city, "aesthetic clinic" + city
- Physical therapy: "physical therapy" + city
- Optometry: "optometrist" + city, "eye doctor" + city

Capture: company, phone, website, maps URL, and any visible emails. If email isn’t visible, log phone + website and we’ll call first and/or use contact form.

## 5) Day-1 outreach cadence (minimum viable)
### Email volume
- **50–100 emails/day** (plain text, no links except legitimacy URL when needed).
- Send window: 9:00–11:00am local + 1:00–3:00pm local.

### Call volume
- **20–40 calls/day** in two blocks:
  - Block A: 11:00am–12:00pm
  - Block B: 3:30pm–5:00pm
Log outcome immediately.

### Touch pattern (first 5 business days)
- Day 1: Email #1 + Call #1
- Day 2: Call #2 + (optional) short bump email
- Day 3: Email #2
- Day 5: Call #3 + “close the loop” email

## 6) Email copy (Day-1 primary)
**Subject options:**
- Quick fix for no-shows at {{Company}}?
- Two-way confirmations for {{Company}}
- Cut no-shows without more staff time

**Body (plain text):**
Hi {{FirstName}} — I’m Bob.

We help appointment-based clinics cut no-shows with two-way SMS confirmations, instant rescheduling, and waitlist fill (done-for-you setup in 24–48 hours).

If you’re open to it, I can show you a quick 10-min demo and estimate how much revenue you’d recover per month per location.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Worth a quick look this week?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

## 7) Call opener (front desk / gatekeeper)
“Hi, this is Bob. Quick question—who handles appointment reminders and no-shows for the practice? I’m calling because we help reduce no-shows with two-way SMS confirmations and automatic reschedules.”

If they ask what it is:
“We’re a lightweight reminder + confirmation workflow that gets patients to reply YES/NO, then automates rescheduling and can fill last-minute gaps from a waitlist. Usually it’s a quick setup.”

Goal: get owner/manager name + best email + best time to call OR book demo.

## 8) SMS (only where compliant / existing relationship / opt-in contexts)
“Hi {{Name}} — Bob here. We help clinics cut no-shows with two-way SMS confirmations + instant reschedules. Who’s best to speak with about reminders/no-shows at {{Company}}?”

## 9) Reply-handling library (copy/paste)
### Positive reply
“Great — what does your appointment volume look like per week, and roughly what % no-shows? If you share those two numbers, I’ll estimate recovered revenue per location. Also, who owns scheduling (owner/manager/front desk)?”

### “Send info”
“Absolutely. 1-liner: two-way SMS confirmations + auto reschedules + waitlist fill, done-for-you setup in 24–48 hours. Here’s our legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
What’s a good email + who should join a 10-min walkthrough?”

### Price objection
“Totally fair. We start with a free 7-day trial and quantify recovered revenue first. If it doesn’t pay for itself quickly, you won’t keep it. Roughly how many appointments/week and what’s an average visit worth?”

### Not now
“No problem — when should I circle back? If you tell me your appts/week and no-show %, I can send a quick estimate so you have numbers before we reconnect.”

### Not a fit
“Understood. Before I close my notes: do you already have two-way confirmations (patients reply YES/NO) and automatic rescheduling? If yes, you’re probably covered.”

### Stop
“Got it — I’ll mark you as do-not-contact. Thanks for the quick reply.”

## 10) What to log after every touch (minimum)
- Date/time
- Channel (email/call/text)
- Outcome
- Any numbers: appts/week, no-show %, value/visit, scheduling system
- Next step + date

This runbook is designed so we can start immediately: create HubSpot, build/import 200 leads, then run the day-1 cadence and log KPIs daily to drive demo volume (target 40) and closes (target 20–25 locations).