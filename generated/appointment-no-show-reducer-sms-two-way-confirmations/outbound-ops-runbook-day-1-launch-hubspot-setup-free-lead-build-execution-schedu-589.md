# Outbound Ops Runbook (Day-1 Launch): HubSpot Setup + Free Lead Build + Execution Schedule + Reply Handling

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T08:33:51.754Z

---

## Goal
Book demos fast for Appointment No-Show Reducer (two-way SMS confirmations + instant reschedules + waitlist fill) and close locations with a done-for-you setup in 24–48 hours.

Legitimacy URL to include in outreach when needed: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Reply/contact email for prospects: agent_bob_replit+no-show-bot@agentmail.to

---

## 1) HubSpot (Free) — Setup Steps (15–25 min)
1. Create HubSpot free account using:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
2. Create a Pipeline named: **No-Show Reducer – Outbound**
3. Pipeline stages:
   - New Lead (Not Contacted)
   - Emailed – Attempt 1
   - Emailed – Attempt 2
   - Called – No Answer
   - Connected – Qualifying
   - Demo Booked
   - Demo Held
   - Closed Won
   - Closed Lost
   - Nurture (Later)
4. Create required properties (simple text/number fields):
   - Vertical (Dental/Chiro/Med Spa)
   - City
   - Role (Owner/Office Manager/GM)
   - Scheduling system (unknown / Dentrix / ChiroTouch / Vagaro / Mindbody / etc.)
   - Appts per week (estimate)
   - No-show rate % (estimate)
   - Value per visit ($)
   - Next step (date + action)
   - Last touch (Email/Call/Text)
   - Notes (free text)
5. Create task queues:
   - “Day-1 Calls” (call all leads after email send block)
   - “Follow-ups Today” (any replies + warm leads)

Minimum logging standard (speed > perfection): Every record must have Business Name, Website, Phone, City, Vertical, and at least one contact method (email OR phone).

---

## 2) Lead Build (First 200) — Free Sources Only
### City clusters (start here)
- Cluster A: Phoenix, AZ
- Cluster B: Dallas, TX

### Verticals (start here)
- Chiropractors
- Med Spas
- Dental practices

### How to find leads quickly
Use Google Maps + business websites.

Copy/paste query examples:
- “chiropractor Phoenix AZ”
- “med spa Phoenix AZ”
- “dentist Phoenix AZ”
- “chiropractor Dallas TX”
- “med spa Dallas TX”
- “dentist Dallas TX”

For each business:
1) Open the website from the map listing.
2) Capture: Business name, website URL, main phone, address/city.
3) Find email:
   - Look for Contact page / footer email.
   - If no email: capture contact form URL and use phone-first.
4) Identify decision-maker:
   - Owner, practice manager, office manager, GM.
   - If unknown, set Role=Unknown and call.

### Dedupe rule (fast)
Deduplicate by **website domain** + **phone number**.

### Lead capture columns (ready for HubSpot import)
- Company
- Website
- Phone
- City
- State
- Vertical
- Contact First Name
- Contact Last Name
- Contact Role
- Email
- Contact Form URL
- Notes (hours, multiple locations, anything relevant)

Target mix for first 200:
- Phoenix: 35 chiro, 35 dental, 30 med spa = 100
- Dallas: 35 chiro, 35 dental, 30 med spa = 100

---

## 3) Day-1 Execution Schedule (50–100 emails + 20–40 calls)
### Block 1 (AM): Email send
- Send 25–50 emails (plain text).
- Immediately move those companies to “Emailed – Attempt 1”.

### Block 2 (Late AM): Calls to same batch
- Call 10–20 of the emailed businesses.
- Outcomes to log:
  - Connected → Qualifying
  - Voicemail → Called – No Answer
  - Gatekeeper → note name + best time

### Block 3 (PM): Email send
- Send next 25–50 emails.
- Log the same way.

### Block 4 (Late PM): Calls
- Call another 10–20.

### Daily KPI log (copy/paste)
Date:
Emails sent:
Calls placed:
Connects:
Replies:
Demos booked:
Demos held:
Closed won:
Closed lost:
Top objections:
Notes / what to change tomorrow:

---

## 4) Qualifying (fast)
Ask on the first real conversation:
1) “Roughly how many appointments do you have per week?”
2) “Do no-shows/cancellations hit you hard? What % would you guess?”
3) “What’s the typical value of a kept visit?”
4) “Who owns scheduling and patient reminders today?”
5) “What system do you schedule in?”

If they have meaningful volume (e.g., 50+/week) and any no-show pain, book demo.

---

## 5) Reply Handling Mini-Library (paste-ready)
### Positive reply → book demo
“Totally. The quick version: we reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill, and we do setup in 24–48 hours.

What’s the best email to send a couple times for a 12-min walkthrough? Or just reply with 2 times that work and I’ll lock it in.

If helpful, here’s our info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to”

### “How much is it?”
“Depends on location volume, but it’s typically less than the revenue from recovering just a handful of missed visits.

If you tell me (1) appts/week and (2) your average visit value, I’ll give an exact number. Either way, the demo is 12 minutes and we can tell you what you’d recover.

— Bob (agent_bob_replit+no-show-bot@agentmail.to)” 

### “We already have reminders”
“Makes sense—most practices do. The difference is we do *two-way* confirmations + auto-reschedules + waitlist fill (so you don’t just remind people—you replace the empty spots).

Open to a 12-min look to see if it would add incremental kept visits on top of what you already use?”

### Stop / unsubscribe
“Understood — I won’t reach out again. Thanks.”

---

## 6) Offer positioning (one line)
“We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”

Use this consistently across email, calls, Craigslist, and FB posts.
