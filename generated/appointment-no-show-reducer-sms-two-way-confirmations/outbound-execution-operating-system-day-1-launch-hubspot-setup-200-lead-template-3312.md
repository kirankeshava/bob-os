# Outbound Execution Operating System (Day-1 Launch): HubSpot Setup + 200-Lead Template + Daily Cadence + Reply Library

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T23:01:02.276Z

---

## 1) HubSpot Free CRM — Setup Checklist (copy/paste)

### Pipeline stages (Deals)
Create a pipeline named: **No-Show Reducer – Locations**
Stages:
1. **Prospect (Not Contacted)**
2. **Contacted (Email/Call Sent)**
3. **Engaged (Reply/Conversation)**
4. **Demo Booked**
5. **Demo Held**
6. **Trial/Setup Scheduled (24–48h)**
7. **Closed Won (Location Live)**
8. **Closed Lost**

### Required custom properties (Contacts or Companies)
Create these fields so we can qualify fast:
- Vertical (Dentist/Chiro/MedSpa/PT/Optometry/Other)
- City Cluster
- Role (Owner/Manager/Front Desk)
- Scheduling Software (Unknown/AB/DS/etc.)
- Appts per Week (number)
- Est. No-Show % (number)
- Value per Visit ($)
- Pain Notes (text)
- Preferred Demo Times (text)
- Last Touch Date (date)
- Next Step (text)
- Opt-out/Do Not Contact (checkbox)

### Views / lists to create (speed)
- **Today Call List**: contacts with phone AND (Stage = Contacted or Engaged) AND Next Step contains “call”
- **Needs Follow-Up**: Last Touch Date > 2 days ago AND not Demo Booked/Held/Won/Lost
- **Demo Booked This Week**: Stage = Demo Booked

### Task queues
Create 3 task queues:
1) **Cold Call Block** (20–40/day)
2) **Follow-Up Calls** (10–20/day)
3) **Admin** (log replies, book demos, update properties)

---

## 2) 200-Lead Starter List — CSV Columns (copy into Google Sheet)

Use exactly these columns for import:
1. Company Name
2. Website
3. Location Address
4. City
5. State
6. Phone
7. Contact First Name
8. Contact Last Name
9. Title/Role
10. Contact Email
11. Vertical
12. City Cluster
13. Source URL (Google Maps / directory page)
14. Notes (e.g., “online booking”, “mentions missed appts”, “multiple locations”)
15. Status (Not Contacted / Contacted / Engaged / Demo Booked / etc.)
16. Last Touch Date
17. Next Step

### Dedupe rules
- Dedupe by **Website**, then by **Phone**, then by **Company Name + City**.
- If multi-location chain: create one record per location (our target is “per location”).

---

## 3) Free Lead Sourcing SOP (2 city clusters × 5 verticals = 200 leads)

### Choose 2 city clusters (example)
- Cluster A: Phoenix, AZ metro
- Cluster B: Tampa, FL metro

### Target verticals (start here)
1) Dentist
2) Chiropractor
3) Med Spa
4) Physical Therapy
5) Optometry

### Google queries (copy/paste)
For each city + vertical, search and open Google Maps results:
- “dentist Phoenix AZ”
- “chiropractor Phoenix AZ”
- “med spa Phoenix AZ”
- “physical therapy Phoenix AZ”
- “optometrist Phoenix AZ”
Repeat for Tampa.

### What to capture per lead
- Company name, address, phone, website
- If the website has staff/contacts: capture owner/manager email (look for Contact, About, Team)
- If no email: use contact form URL in Notes and still import (we can call first)

### Fast email-finding (free)
- Look on website footer/contact page for emails
- Try common patterns when a domain email is shown (frontdesk@, info@, office@)
- If only form exists, still keep the lead; call to get direct email for scheduler/owner.

---

## 4) Day-1 Outbound Cadence (minimum viable, high speed)

### Daily targets
- **Emails:** 50–100/day (plain text)
- **Calls:** 20–40/day
- **Texts:** only to existing business numbers after conversation or where clearly permissible; keep it minimal and compliant
- **FB Groups:** 1–2 value comments/day + 1 post/week
- **Craigslist:** 1 post per city cluster/week

### Day-1 schedule (example)
**09:00–10:00** Build/send first 25 emails + log in HubSpot
**10:00–11:30** Call block #1 (15–20 calls)
**11:30–12:00** Reply handling + book demos
**13:30–14:30** Send next 25–50 emails
**14:30–16:00** Call block #2 (15–20 calls)
**16:00–16:30** Update stages + KPI log

### Email signature (use everywhere)
Bob Smith
Appointment No-Show Reducer (SMS confirmations + reschedules + waitlist fill)
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

---

## 5) Core Cold Email (plain-text, ready to send)

**Subject:** quick fix for no-shows at {{Company}}

Hi {{FirstName}} — Bob here.

We help appointment-based locations reduce no-shows with **two-way SMS confirmations**, **instant reschedules**, and **waitlist fill** (so gaps get refilled).

If you’re open to it, I can show you a 10-minute demo and estimate recovered revenue based on your weekly appointment volume.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Worth a quick look this week?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## 6) Call Opener + Qualifying (fast)

“Hi, is this {{FirstName}}? I’m Bob. I’ll be brief — we help practices reduce appointment no-shows using two-way SMS confirmations and instant reschedules. Who’s the best person to talk to about scheduling or reducing no-shows?”

If correct person:
“Quick 3 questions to see if it’s worth a demo:
1) Roughly how many appointments do you run per week?
2) What’s your no-show rate (even a guess)?
3) What’s an average visit worth?”

Close for demo:
“If I could show you how we confirm by text, auto-reschedule, and fill gaps from a waitlist in 10 minutes, when are you free — today or tomorrow?”

---

## 7) Reply Library (copy/paste)

### Positive → book demo
“Great — easiest is a quick 10-minute walkthrough. What times work for you this week? If you prefer, reply with two options and I’ll send the invite.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob (agent_bob_replit+no-show-bot@agentmail.to)”

### “Send info”
“Absolutely. Here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you tell me (a) appts/week and (b) no-show %, I’ll reply with an estimate of recovered visits and we can decide if a 10-min demo is worth it.”

### Objection: “We already send reminders”
“Makes sense — most do. The difference is **two-way confirmation** (YES/NO), then **instant reschedule flow** if NO, plus **waitlist fill** to backfill openings. If you’re open, I can show the flow in 10 minutes and you can compare to what you have.”

### Pricing question
“Happy to share after I understand volume (appts/week) and value/visit — it’s location-based. If you reply with those two numbers, I’ll give you a range and whether it’s even worth a demo.”

### Not interested / stop
“No problem — I’ll close this out. If anything changes and you want to reduce no-shows quickly, you can reach me at agent_bob_replit+no-show-bot@agentmail.to.”

---

## 8) Daily KPI Log (paste into a sheet)
Date | Emails Sent | Emails Replied | Calls Placed | Conversations | Demos Booked | Demos Held | Trials/Setups Scheduled | Closed Won | Closed Lost | Notes/Bottleneck

Rule: Log at end of day; if Demos Booked < 2/day average, increase call volume first (calls are fastest feedback).
