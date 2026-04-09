# Outbound Launch Runbook (Day-1 to Day-7): HubSpot Setup + Lead CSV + Cadence + Scripts (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T14:14:13.107Z

---

## 0) Offer + Legitimacy (use everywhere)
**Offer (1 sentence):** We reduce appointment no-shows using two-way SMS confirmations + instant reschedules + waitlist fill, with done-for-you setup in 24–48 hours.
**Legitimacy URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
**Business contact email:** agent_bob_replit+no-show-bot@agentmail.to

---

## 1) HubSpot Free CRM Setup (do this first; ~20–30 min)
### 1.1 Pipeline stages (Deal Pipeline: “No-Show Reducer - Outbound”)
1) New Lead (not yet touched)
2) Touched (email/call attempt made)
3) Replied / Engaged
4) Demo Booked
5) Demo Held
6) Verbal Yes
7) Closed Won
8) Closed Lost
9) Nurture (later)

### 1.2 Contact properties (create custom fields)
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City
- Website
- Primary Phone
- Owner/Manager Name
- Scheduling System (unknown / Dentrix / Jane / Mindbody / NexHealth / Acuity / Other)
- Appointment Volume (est.)
- No-Show Rate (est.)
- Value per Visit (est.)
- SMS Consent Status (unknown / yes / no)
- Last Touch Date
- Next Step (short text)

### 1.3 Deal properties (minimum)
- Location Count (1, 2–5, 6–20, 20+)
- Expected Monthly Recovered Revenue (est.)
- Close Probability (0/25/50/75/90)

### 1.4 Task queues
- Daily: “Call Attempts” (20–40)
- Daily: “Email Follow-ups” (50–100)
- Daily: “Reply Handling” (respond within 15 minutes)

---

## 2) Lead Capture CSV (copy exactly; import into HubSpot)
Create a CSV with these columns:
- Company Name
- Website
- City
- State
- Vertical
- Contact First Name
- Contact Last Name
- Title (Owner/Office Manager/Practice Manager)
- Email
- Phone
- Source URL (Google Maps listing or directory page)
- Notes (any quick observation: “online booking”, “late hours”, etc.)

**Formatting rules:**
- One row per location.
- If email unknown, leave blank (still import; you can call).
- If contact name unknown, set First Name = “Office” and Title = “Front Desk” (for calling).

---

## 3) Free Lead Sourcing Workflow (200 leads in 1–2 days)
### 3.1 Pick 2 city clusters (example)
- Cluster A: Phoenix + Tempe + Mesa
- Cluster B: Austin + Round Rock + Cedar Park

### 3.2 Verticals (start here)
1) Dentists
2) Chiropractors
3) Med spas
4) Physical therapy
5) Optometry

### 3.3 Google Maps queries (copy/paste)
- “dentist in {city}”
- “chiropractor in {city}”
- “med spa in {city}”
- “physical therapy in {city}”
- “optometrist in {city}”

**Capture:** business name, site URL, phone, address/city. 

### 3.4 Find owner/manager email (free methods)
- Website contact page (often has email)
- Footer (privacy/terms sometimes shows emails)
- “About / Team” pages (names)
- Google query: "{business name}" + "office manager" OR "practice manager" OR "@{domain}"
- If no email found quickly: keep the lead for calling.

**Target:** 100 leads per cluster (20 per vertical) = 200 leads.

---

## 4) Day-1 Execution Schedule (do this daily)
### 4.1 Email blocks (50–100/day)
- Block 1 (AM): 25–50 new sends
- Block 2 (early PM): 25–50 new sends
**Rule:** Plain-text only, no images, no attachments. Keep under ~120 words.

### 4.2 Call blocks (20–40/day)
- Block 1 (late AM): 10–20 calls
- Block 2 (late PM): 10–20 calls
**Log every outcome** in HubSpot immediately.

### 4.3 Craigslist
- 1 post per cluster per week (services > small biz ads). Track inbound in HubSpot.

### 4.4 FB Groups
- 5–10 comments/posts per week (answer questions, share a no-show calculator insight, offer quick audit).

---

## 5) Ready-to-Send Email Copy (First touch)
**Subject options:**
- Quick question about no-shows
- reducing no-shows at {{Company}}
- 2-way SMS confirmations for {{City}} clinics

**Body (paste):**
Hi {{FirstName}} — Bob here.

Do you have a no-show / late-cancel problem at {{Company}}?

We reduce no-shows with two-way SMS confirmations (patients confirm/cancel), instant reschedules, and waitlist fill to backfill openings. Done-for-you setup in 24–48 hours.

If you tell me roughly your appointments/week and average $/visit, I’ll estimate recovered revenue.

Legitimacy/info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply here or email: agent_bob_replit+no-show-bot@agentmail.to

— Bob

---

## 6) Call Script (front desk -> owner/manager)
“Hi, this is Bob. Quick question—who handles your appointment reminders and no-shows: the office manager or the owner?”

If transferred/manager:
“We help clinics reduce no-shows using two-way SMS confirmations + quick reschedules + waitlist fill. Takes 24–48 hours to set up. Are no-shows/late cancels something you’re actively trying to reduce right now?”

Qualify (fast):
1) About how many appointments per week?
2) Rough no-show/late-cancel rate?
3) What’s the average value per visit?
4) What scheduling system do you use?

Close to demo:
“If I can show you a simple workflow that typically recovers a few visits/week, is it crazy to book 15 minutes tomorrow or Thursday?”

---

## 7) Optional SMS (only where compliant/appropriate)
“Hi {{Name}}, Bob here—quick one: we help {{Company}} reduce no-shows with 2-way SMS confirmations + instant reschedules + waitlist fill. Worth a 10–15 min look? Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  Reply yes/no.”

---

## 8) 7-Touch Cadence (Day 1–7)
- Day 1: Email #1 + Call attempt
- Day 2: Call attempt + VM + Email #2 (short bump)
- Day 3: Email #3 (mini case/math) + Call attempt
- Day 4: “Permission” email (close file?)
- Day 5: Call attempt + (optional compliant SMS)
- Day 6: Email (waitlist/backfill angle)
- Day 7: Breakup email

**Email #2 bump (copy):**
“Bumping this—should I talk with you or whoever owns scheduling/no-shows at {{Company}}?”

**Email #3 math (copy):**
“If you have ~{{appts}} appts/week and even 5% no-shows, that’s {{appts*0.05}} missed visits/week. Two-way confirmations + waitlist fill usually recovers part of that. Want me to run the numbers with you?”

**Breakup (copy):**
“Seems like timing may be off. If reducing no-shows becomes a priority later, email me anytime: agent_bob_replit+no-show-bot@agentmail.to (info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2). I’ll close this out for now.”

---

## 9) Reply Handling Library (paste snippets)
### Positive
“Great—what does your schedule look like tomorrow/Thu for a quick 15-min walkthrough? If you share appts/week + avg $/visit + scheduling system, I’ll come prepared with a recovered-revenue estimate.”

### Price
“Totally—pricing depends mainly on location count and appointment volume. Usually it’s far less than 1–2 recovered visits/month. If you share appts/week + avg $/visit, I’ll quote a tight range before the demo.”

### Already have reminders
“Makes sense. The difference is two-way confirmations + automated reschedules + waitlist backfill (not just reminders). If I can show a workflow that fills last-minute gaps, worth 15 minutes?”

### Not now
“No problem—when should I circle back? Also, who’s the right person to own anything related to scheduling/no-shows?”

### Stop
“Understood—removing you now. Thanks for the quick reply.”
