# Outbound Execution Runbook (Day-1 Launch + 30-Day Sprint) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T18:57:29.470Z

---

## 1) Offer + CTA (use everywhere)
**Offer:** “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”
**Legitimacy URL (share with prospects):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
**Reply-to / business contact:** agent_bob_replit+no-show-bot@agentmail.to
**Primary CTA:** “Open to a 12-minute demo this week?”
**Qualification targets:** appointments/month, no-show %, average value/visit, scheduling tool (Dentrix/ChiroTouch/Square/Acuity/etc.), who owns scheduling.

---

## 2) HubSpot Free CRM Setup (do this first)
### Pipeline stages
1. **New Lead** (not contacted)
2. **Contacted — No Reply**
3. **Engaged (Reply/Call Connect)**
4. **Demo Booked**
5. **Demo Held**
6. **Trial/Setup Started (Free Week 1)**
7. **Closed Won (Location Live)**
8. **Closed Lost**

### Required properties (create as custom fields if needed)
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City / State
- Role (Owner/Office Manager/Front Desk)
- Scheduling system
- Appts per month (estimate)
- No-show rate (estimate)
- Value per visit ($)
- Biggest pain (free text)
- Next step date
- Last touch date
- Lead source (Google Maps/Directory/Craigslist/FB)

### Tasks queues
- **Daily Email Sends (50–100)**
- **Daily Calls (20–40)**
- **Replies to Handle (same day)**
- **Demos Today / Tomorrow**

---

## 3) Lead Capture + Import Template (CSV-ready)
Use these exact columns so you can import cleanly into HubSpot:
- Company Name
- Website
- Main Phone
- Contact First Name
- Contact Last Name
- Contact Role
- Contact Email
- City
- State
- Vertical
- Notes (ex: “mentions missed appts on reviews”)
- Source URL (Google Maps / directory listing)

### Free lead sourcing (repeatable)
Pick **2 city clusters** to start (example: Phoenix AZ + Scottsdale AZ; Tampa FL + St. Pete FL). For each vertical, pull 20–25 leads per city.
**Google operators:**
- “dentist” + city + “book appointment”
- “chiropractic” + city + “schedule”
- “med spa” + city + “book now”
- “physical therapy” + city + “request appointment”
- “optometry” + city + “appointment”

**What to capture fast:** company, phone, website, and any visible email. If no email, capture contact form URL and call first.

---

## 4) Day-1 Execution Schedule (minimum viable)
### Block A (60–90 min): Build 25–40 leads
- Fill the CSV columns above.
- Prioritize businesses with online booking (signals appointment volume).

### Block B (60–90 min): Send 50–100 emails
Rules:
- Plain text only.
- No attachments.
- Keep to <120 words.
- Include legitimacy URL and reply-to email.

### Block C (60–90 min): Calls (20–40)
- Call main line.
- Ask for office manager / owner.
- If voicemail: leave the 15-second voicemail below.
- Log outcomes immediately.

### Block D (30 min): Post 1 Craigslist ad per city cluster
- Use the template below.

### Block E (15 min): KPI report
- Sends, replies, connects, demos booked, demos held, setups started.

---

## 5) Cold Email Templates (ready to paste)
### Email 1 (problem-first)
Subject: quick question about no-shows

Hi {{FirstName}} — I’m Bob.

Do you have an easy way to get **patients/clients to confirm** (or reschedule) by text before their appointment?

We help appointment-based locations reduce no-shows using **two-way SMS confirmations**, **instant reschedules**, and **waitlist fill** (done-for-you setup in 24–48 hours).

If helpful, here’s our page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Open to a 12-minute demo this week?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email 2 (ROI)
Subject: reduce no-shows at {{Company}}

Hi {{FirstName}} — quick one.

If you’re doing ~{{X}} appointments/month, even a small no-show reduction can recover a meaningful amount of revenue.

Our system texts reminders + asks for a simple confirmation (Y/N). If “No,” it offers a reschedule link and can pull from a waitlist to fill gaps.

Can I show you in 12 minutes?
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

### Follow-up (bump)
Subject: Re: {{Company}}

Hi {{FirstName}} — should I talk to you or the person who owns scheduling + reminders?

If you point me to the right contact, I’ll send a 2-sentence overview and a demo link.
— Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## 6) Cold Call Script + Voicemail
### Opener
“Hi — is this the front desk? Quick question: who handles appointment reminders and confirmations — the office manager or the owner?”

When transferred:
“Hi {{Name}}, I’m Bob. We help appointment-based locations reduce no-shows using two-way SMS confirmations and instant reschedules. If someone replies ‘No’, we trigger a reschedule link and can fill gaps from a waitlist. Could I ask two quick questions to see if it’s relevant?”

### Qualify (2 questions)
1) “About how many appointments do you have in a typical week?”
2) “Roughly what percent no-show or cancel late?”

### Close
“Got it. If I can show you exactly how the two-way confirmations + reschedules work in 12 minutes, are you open to a quick demo tomorrow or Thursday?”

### Voicemail (15 sec)
“Hi {{FirstName}}, Bob here. We reduce appointment no-shows with two-way SMS confirmations and instant reschedules. It’s a fast done-for-you setup. You can see what it is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 — or reply to agent_bob_replit+no-show-bot@agentmail.to. I’ll call back tomorrow.”

---

## 7) SMS (only where compliant / existing business context)
“Hi {{FirstName}} — Bob here. Quick one: we help practices reduce no-shows with two-way text confirmations + instant reschedules. Open to a 12-min demo? Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 (reply STOP to opt out)”

---

## 8) Reply Handling Library
### Positive
“Great — what does your calendar look like {{two options}}? Also, what scheduling system do you use and about how many appointments/week?”

### Not now
“No problem — when should I circle back? If you tell me your average appts/month and no-show %, I can estimate the revenue recovered.”

### Price
“Week 1 is free while we set it up and measure impact. After that it depends on appointment volume/location. If you share appts/month and value/visit, I’ll quote accurately.”

### Already have reminders
“Totally — the difference is **two-way confirmation + reschedule automation + waitlist fill**, not just reminders. Worth a 12-min compare?”

### Stop
“Understood — I won’t contact you again. (Confirming removal now.)”

---

## 9) Craigslist Template (per city cluster)
Title: Reduce appointment no-shows (two-way SMS confirmations) — setup in 48 hrs

Body:
If your clinic/spa/practice loses revenue from no-shows or late cancellations, we can help.

We set up two-way SMS confirmations so clients can reply YES/NO. If NO, they get an instant reschedule link and you can fill gaps from a waitlist.

Done-for-you setup in 24–48 hours.
See details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

---

## 10) Daily KPI Report (copy/paste)
Date:
Emails sent:
Calls placed:
Texts sent:
Replies:
Connects:
Demos booked:
Demos held:
Setups started (free week):
Closed won:
Key learnings / objections:
Top next actions (3):

---

## 11) Targets to stay on pace (30 days)
- 50–100 cold emails/day (Mon–Fri)
- 20–40 calls/day
- 1–2 Craigslist posts/week per city cluster
- 5–10 FB group value comments/posts/week
- KPI review daily; iterate subject lines + vertical focus weekly
