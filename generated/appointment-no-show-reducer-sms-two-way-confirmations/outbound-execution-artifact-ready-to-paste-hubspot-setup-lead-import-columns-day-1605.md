# Outbound Execution Artifact (Ready-to-Paste): HubSpot Setup + Lead Import Columns + Day-1 SOP + Reply Library

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T16:50:21.676Z

---

## 1) HubSpot Free CRM Setup (15–25 minutes)

**Account**: create HubSpot Free CRM using **Bob Smith** / **agent_bob_replit@agentmail.to**.

### A. Pipeline (Deals)
Create a pipeline called **No-Show Reducer – Outbound** with these stages:
1. **New Lead (Unworked)**
2. **Attempted – No Response**
3. **Connected – Qualifying**
4. **Demo Booked**
5. **Demo Held**
6. **Trial/Pilot Offered**
7. **Closed Won**
8. **Closed Lost**

**Deal naming rule**: `[Business Name] – [City]`.

### B. Contact Properties (Custom)
Create these custom fields (or store in Notes if you want speed-first):
- **Vertical** (Dentist / Chiro / Med Spa / PT / Optometry / Other)
- **Location Count** (1 / 2–5 / 6+)
- **Appts per Week (est.)** (number)
- **No-Show Rate (est.)** (percent)
- **Avg Visit Value ($)** (number)
- **Scheduling System** (Zenoti / Vagaro / Mindbody / Dentrix / Athena / SimplePractice / Other)
- **Decision Maker Role** (Owner / Office Manager / GM)
- **SMS Consent Notes** (free text)
- **Next Step Date** (date)
- **Last Touch Channel** (Email/Call/Text)

### C. Task Queues
Create task queues:
- **Daily Calls (20–40)**
- **Follow-ups (Replies)**
- **Demo Scheduling**

### D. Minimum Logging Standard (speed)
For every touch, log one note:
- `2026-04-09 Email #1 sent – Variant A – subject: “quick question about no-shows”`
- `Call – no answer – left VM`
- `Connected – DM is Sarah (Office Mgr) – uses Vagaro – ~80 appts/wk – no-show ~8% – book demo Tue 2pm`

---

## 2) Lead Capture / Import Columns (copy/paste)
Use a spreadsheet with these columns (then import into HubSpot Contacts or Deals):
1. Business Name
2. Website
3. Google Maps URL
4. Address
5. City
6. State
7. Phone
8. Owner/Manager Name
9. Role
10. Email
11. Vertical
12. Notes (hours, # providers, etc.)
13. Source (Google Maps / Yelp / Directory)
14. First Touch Date
15. Status (New/Attempted/Connected/etc.)

**Dedupe rule**: unique by `Website` OR `Phone`. If duplicates, keep the record with an email.

**Free sourcing queries (copy/paste into Google)**:
- `site:maps.google.com dentist "[CITY]"`
- `"chiropractic" "[CITY]" "Book" "Appointment"`
- `"med spa" "[CITY]" "book online"`
- `"physical therapy" "[CITY]" "request appointment"`
- `"optometry" "[CITY]" "schedule"`

City cluster suggestion (pick 2 to start): Phoenix AZ, Tampa FL, Charlotte NC, Dallas TX, San Diego CA.

---

## 3) Day-1 Outbound SOP (Email + Calls/Text)

### Goal for Day-1
- **Emails sent**: 50–100
- **Calls**: 20–40
- **Demos booked**: 2–5 (target)

### Sending rules (deliverability-safe)
- Plain-text only, no images.
- 1 link max: use legitimacy URL only when relevant.
- Signature includes business contact email.

**Legitimacy URL**: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

**Reply-to / contact**: agent_bob_replit+no-show-bot@agentmail.to

### Schedule
**Block 1 (90 min):** build 25 leads + send Email #1 to those 25
**Block 2 (60 min):** call 10–15 of the same leads (who have phones)
**Block 3 (90 min):** build next 25 leads + send Email #1
**Block 4 (60 min):** call another 10–15
**Block 5 (30 min):** handle replies + book demos

### Email #1 (Variant A)
**Subject:** quick question about no-shows

Hi {{FirstName}} — do you handle scheduling/confirmations for {{Business}}?

We help appointment-based teams reduce no-shows using two-way SMS confirmations (patients reply 1 to confirm), instant reschedules, and a waitlist fill when cancellations happen.

If it’s relevant, I can show you what the reminders + confirmations flow looks like and estimate recovered visits for {{Business}}.

Worth a 10-minute look this week?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

### Call opener (10–20 seconds)
“Hi, is this {{Name}}? I’m Bob — quick one: do you handle appointment confirmations there? We help reduce no-shows with two-way SMS confirmations and instant rescheduling. If I asked you a question or two, I can tell you in 30 seconds if it’s worth a demo.”

**Qualify fast (only 4 questions):**
1) “Roughly how many appointments per week?”
2) “What’s your no-show rate or last-minute cancellation rate?”
3) “What’s an average visit worth?”
4) “What system do you use to schedule (or do reminders)?”

**Close to demo:**
“Based on that, this is likely worth a quick screen-share. I can do 10–12 minutes and show the two-way confirmation + reschedule flow. What’s better, {{Day}} or {{Day}}?”

### Optional compliant follow-up text (only if they explicitly request / existing relationship)
“Hi {{FirstName}} — Bob here. As mentioned, we reduce no-shows via two-way SMS confirmations + instant reschedules + waitlist fill. If you want, reply ‘YES’ and I’ll send 2 times for a 10-min demo. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

---

## 4) Reply-Handling Library (paste into email replies)

### A) Positive reply → book demo
“Great — happy to. What’s the best email to send a calendar link to (if different), and are you the right person for scheduling/confirmations? 

For context, here’s our overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If easier, send me 2 times that work and I’ll confirm: agent_bob_replit+no-show-bot@agentmail.to”

### B) “Send info”
“Sure — here’s the quick overview and what the two-way confirmation flow looks like:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Two quick questions so I can tailor it:
1) approx appts/week?
2) typical no-show %?

If you reply with those, I’ll estimate recovered visits and suggest whether a 10-min demo is worth it.”

### C) “We already have reminders” objection
“Makes sense — most do. The difference is **two-way confirmations** (patients reply to confirm) + **instant reschedule** + **waitlist fill** so you recover revenue, not just remind.

If you tell me what system you use (Mindbody/Vagaro/Zenoti/etc.), I can tell you if we integrate or run alongside. Worth 10 minutes?”

### D) Price question
“Depends on location count + appointment volume. Usually it’s priced so it’s covered by preventing just a small number of no-shows per month.

If you share (1) appts/week and (2) average visit value, I’ll give you a ballpark before we schedule anything.”

### E) Not interested
“Understood — I’ll close the loop. If anything changes and no-shows become a priority, you can reach me at agent_bob_replit+no-show-bot@agentmail.to and info is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

### F) Unsubscribe / stop
“Confirmed — I won’t reach out again. (Removed.)”

---

## 5) Daily KPI Report (copy/paste)
Date: ____
- Leads added: ____
- Emails sent: ____
- Email replies: ____ (positive ____ / neutral ____ / negative ____)
- Calls placed: ____
- Connects: ____
- Demos booked: ____
- Demos held: ____
- Closed won: ____
- Notes: top objection + what we changed tomorrow

This artifact is designed so you can (1) create HubSpot, (2) import leads, and (3) start sending/calling the same day while tracking demos and closes consistently.