# Outbound SOP (Day 1–7) + HubSpot Import Template + Email/Call/SMS Assets — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T13:37:40.560Z

---

## 1) Offer (what we sell)
**Appointment No-Show Reducer (SMS + Two-Way Confirmations)**
We reduce no-shows for appointment-based businesses using two-way SMS confirmations, instant reschedules, and waitlist fill to backfill cancellations. Done-for-you setup in 24–48 hours. Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Primary reply inbox: agent_bob_replit+no-show-bot@agentmail.to

## 2) HubSpot Free CRM pipeline (Deals)
Create 1 pipeline named: **No-Show Reducer – Outbound**
Stages (in order):
1. **Prospect – Not Contacted**
2. **Emailed – Attempt 1**
3. **Emailed – Attempt 2**
4. **Called/SMS – Attempted**
5. **Connected – Qualifying**
6. **Demo Booked**
7. **Demo Held**
8. **Closed Won**
9. **Closed Lost**
10. **Nurture (Not Now)**

Required properties (create as custom fields where needed):
- Business Name
- Website
- Vertical (dentist/chiro/med spa/PT/optometry/etc.)
- City
- Phone
- Contact Name
- Contact Role (Owner/Manager/Front Desk/Office Admin)
- Contact Email
- Scheduling System (Zocdoc, Dentrix, JaneApp, Vagaro, Square, Mindbody, etc.)
- Approx Appts/Week
- No-show Rate (estimate)
- Value per Visit ($)
- Current Reminder Method (none/manual/one-way SMS/email)
- Next Step (free text)
- Last Touch Date

Logging standard (fast): every touch adds a Note with: **[Channel] [Outcome] [Next step + date]**.

## 3) Lead-capture / import template (CSV columns)
Use these exact columns for a CSV import into HubSpot Contacts (and optionally create a Deal per account after first reply):
- business_name
- vertical
- website
- city
- state
- phone
- contact_first_name
- contact_last_name
- contact_role
- email
- source_url
- notes (ex: “Google Maps; 4.8★; 120 reviews; hours…”) 
- status (default: Prospect – Not Contacted)

Dedupe rules:
- If same website domain OR same phone number → keep the newest record and merge notes.
- If no email, keep record for calling/SMS only.

Free list-building sources (no paid tools):
- Google Maps: “{city} + dentist”, “{city} + chiropractor”, “{city} + med spa”, “{city} + physical therapy”, “{city} + optometrist”
- Yelp category pages (cross-check phone/website)
- Zocdoc/Healthgrades (medical-focused), StyleSeat (beauty), Vagaro directory (salons/spas)

## 4) Day 1–7 execution schedule (targets)
Daily KPI targets (minimum viable):
- **Emails sent:** 50–100/day (plain text)
- **Calls:** 20–40/day
- **FB Groups:** 1 value post or 3–5 helpful comments/day (5–10 touches/week)
- **Craigslist:** 1–2 posts/week per city cluster
- **Goal outcomes:** 2–4 positive replies/day → 1–2 demos booked/day

### Day 1 (Launch)
1) Import first 100–200 leads into HubSpot.
2) Send Email #1 to 50–100 leads.
3) Call 20–40 leads (same day) and log outcomes.
4) Post 1 Craigslist ad in each city cluster.

### Day 2
1) Build/import next 50–100 leads.
2) Calls first (20–40), then send Email #1 to new leads.
3) Send Email #2 to Day-1 non-responders.

### Day 3
1) Continue new lead build + Email #1.
2) Call/SMS follow-up to “Opened/visited site” if known; otherwise call top leads.
3) Book demos; confirm via email + SMS.

### Day 4
1) Email #2 to Day-2 non-responders.
2) Call block focused on “front desk/office manager” to identify decision maker.

### Day 5
1) Email #3 to Day-1 non-responders.
2) Push for 15-minute fit-check calls.

### Day 6–7 (Weekend maintenance)
- Light sends (25–50/day) only if inbox health is good; otherwise pause emails.
- Respond fast to replies; schedule demos for Mon/Tue.
- Post one FB value post each day.

## 5) Email assets (plain-text)
### Email #1 (primary)
Subject: quick question about no-shows at {{Business Name}}

Hi {{First Name}} — Bob here.

We help appointment-based businesses reduce no-shows using **two-way SMS confirmations + instant reschedules + waitlist fill** (so canceled slots get refilled automatically).

If you’re doing even ~{{X}} appointments/week, this usually recovers several visits/month.

Open to a 12-minute demo to see if this would fit {{Business Name}}?

Legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Or just reply here: agent_bob_replit+no-show-bot@agentmail.to

– Bob

### Email #2 (bump + quant)
Subject: re: no-shows at {{Business Name}}

Hi {{First Name}} — circling back.

If you have (roughly) a **{{NoShowRate}}%** no-show rate and your average visit is **${{ValuePerVisit}}**, even a small reduction can be meaningful.

We set this up done-for-you in **24–48 hours**: reminders → two-way confirm → reschedule link → waitlist backfill.

Worth a quick look this week?

– Bob | agent_bob_replit+no-show-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Email #3 (breakup)
Subject: should I close the loop?

Hi {{First Name}} — last note from me.

Should I close the loop, or is reducing no-shows / filling cancellations something you want to revisit later?

If later, tell me the best month and I’ll follow up.

– Bob
agent_bob_replit+no-show-bot@agentmail.to

## 6) Cold call script (tight)
Goal: identify decision maker + book demo.

Opener:
“Hi, is this {{Business Name}}? — quick one: who handles your appointment reminders / no-show process?”

If decision maker/manager:
“Bob here. We help reduce no-shows using two-way SMS confirmations plus instant reschedules and a waitlist to fill gaps. Setup is done-for-you in 24–48 hours. Can I ask two quick questions to see if it’s even relevant?”

Qual questions (fast):
1) “About how many appointments do you run per week?”
2) “Do no-shows/cancels cause gaps you can’t refill?”
3) “What system do you schedule in?”

Close:
“If I can show you how this confirms appointments and backfills cancellations automatically, are you open to a 12-minute demo tomorrow or Thursday?”

Voicemail:
“Hi {{First Name}}, Bob. We reduce no-shows with two-way SMS confirmations and instant reschedules + waitlist fill. If you want to see it, reply to agent_bob_replit+no-show-bot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

## 7) SMS follow-up (only when compliant: existing inquiry, explicit permission, or clear business context)
“Hi {{First Name}} — Bob here. Quick question: would reducing no-shows + filling last-minute cancels be helpful at {{Business Name}}? If yes, I can show a 12-min demo. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  Reply STOP to opt out.”

## 8) Reply-handling snippets
Positive:
“Great — what day/time is best for a 12-minute demo? If easier, share 2 times and I’ll send an invite. (You can also email me directly: agent_bob_replit+no-show-bot@agentmail.to.)”

Not me:
“Thanks — who’s the right person for appointment reminders / scheduling ops?”

Price:
“Happy to share. Quick context first: # appts/week, current no-show %, and avg value/visit? Then I can quote the right tier and ROI.”

Using existing reminders:
“Totally. The gap we usually fill is two-way confirmation + instant reschedule + waitlist backfill (most systems only do one-way reminders). Worth a quick look?”

Stop:
“Understood — I won’t reach out again. Thanks.”

## 9) Daily KPI report (copy/paste)
Date:
- Emails sent:
- Calls placed:
- SMS sent (compliant only):
- Replies (positive/neutral/negative):
- Demos booked:
- Demos held:
- Closed won:
- Closed lost:
Notes: top objections + what worked.

This SOP is designed so execution can start immediately after creating HubSpot (free) and importing the first 200 leads.