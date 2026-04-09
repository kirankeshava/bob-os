# Outbound Execution SOP (14 Days) + KPI Scoreboard + Demo Booking/Close Templates — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T10:20:39.285Z

---

## Goal (30-day sprint)
Book 40 demos and close 25 locations for the Appointment No-Show Reducer (two-way SMS confirmations + instant reschedules + waitlist fill + recovered revenue analytics).

Legitimacy URL to include in outreach and follow-ups: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Contact email for replies: agent_bob_replit+no-show-bot@agentmail.to

---

## A) HubSpot (Free) — minimum viable setup
### Pipeline stages (simple + fast)
1) New Lead
2) Contacted (Email Sent)
3) Attempting Call
4) Connected / Qualifying
5) Demo Scheduled
6) Demo Held
7) Closed Won
8) Closed Lost
9) Nurture (Not Now)

### Required properties (custom fields)
- Vertical (Dental/Chiro/Med Spa/PT/Optometry/Other)
- City/Cluster
- Role (Owner/Office Manager/Front Desk/Operations)
- Appointment Volume (per week)
- Estimated No-Show %
- Value per Visit ($)
- Scheduling System (e.g., Dentrix, Jane, Mindbody, Acuity, “paper/other”)
- Qualified? (Y/N)
- Next Step Date
- Last Touch Type (Email/Call/Text)
- Outcome/Objection (drop-down: price, not decision maker, already using reminders, no time, not interested, send info)

### Task queues
- “Day-1 Calls” (20–40)
- “Day-1 Follow-ups” (email replies + voicemail follow-up)
- “Demo Reminders” (day-before/day-of)

---

## B) Qualification criteria (fast)
You only need 4 numbers to qualify:
1) Appointments/week (or month)
2) No-show % (or “out of 10, how many don’t show?”)
3) Avg value per visit ($)
4) Who owns scheduling + can approve tools?

Minimum fit (guideline):
- 50+ appointments/week OR high value/visit ($150+)
- No-show rate 5%+ (or frequent last-minute cancellations)
- They can receive SMS from patients (most can)

Simple ROI line (use verbally and in follow-ups):
Recovered visits/month ≈ appointments/month × no-show% × reduction%.
Example: 800 appts/mo × 10% no-show × 30% reduction = 24 recovered visits. If $200/visit → $4,800/mo recovered.

---

## C) 14-day outbound cadence SOP (Email + Call + optional text)
Daily volume targets:
- 50–100 cold emails/day (plain text)
- 20–40 calls/day (goal: 6–12 connects)
- Optional compliant texts ONLY when business has published mobile number / you reach a human and they agree / or it’s clearly a business texting line. When in doubt: do not text.

### Day 1
- Email #1 to 50–100 leads
- Call block: 20–40 dials (same leads)
- If voicemail: leave short VM + send “VM follow-up” email

### Day 2
- Call remaining non-connects (20–40)
- Email #1 to next batch (if list is ready)
- Reply handling within 1 hour

### Day 3
- Email #2 (follow-up) to Day-1 non-responders
- Call block + attempt to reach decision maker

### Day 5
- Email #3 (case/ROI prompt)
- Call block focused on warm opens/replies

### Day 7
- Email #4 (breakup + permission)

### Day 10–14
- Nurture email to “Not Now” leads
- Re-cycle top vertical/city that replied most

Disposition rules:
- Any positive signal (“send info”, “how does it work?”, “what’s pricing?”) → move to Connected/Qualifying and book demo.
- Not decision maker → ask for intro + best email/number; keep original contact in loop.
- “Already have reminders” → differentiate: two-way confirmations + instant reschedules + waitlist fill + recovered revenue analytics.

---

## D) Call opener (15 seconds)
“Hi — is this [Name]? This is Bob. Quick one: we help clinics reduce appointment no-shows using two-way SMS confirmations, instant reschedules, and waitlist fill. Would you be open to a 10-minute look to see if it pencils out for your location?”

If they ask for more:
“Most places already send reminders — the difference is two-way confirmation + automated reschedules, and we track recovered revenue per location. Setup is done-for-you in 24–48 hours.”

Voicemail (under 12 seconds):
“[Name], Bob here. We reduce no-shows with two-way SMS confirmations + automated reschedules. I’ll email details—if it’s useful, we can do a quick 10-minute demo.”

---

## E) Demo booking workflow (use 2 time options + link)
When they show interest:
“Great—are you the person who owns scheduling tools, or should someone else join? I can do today at 3:30 or tomorrow at 11:00, or you can grab any slot here: [MEETINGS LINK].”

Immediately send demo confirmation email (below).

---

## F) Templates (ready to paste)
### 1) Demo confirmation email
Subject: Confirmed — no-show reduction walkthrough

Hi [First Name],

Confirmed for [Day], [Time] [Time Zone].

We’ll cover:
1) Current appointment volume + no-show rate
2) Two-way SMS confirmations + instant reschedules
3) Waitlist fill to backfill gaps
4) Simple analytics: recovered visits + recovered revenue per location

If you’d like to see what we’re building ahead of time, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

If anything changes, reply here: agent_bob_replit+no-show-bot@agentmail.to

— Bob

### 2) Day-before demo reminder
Subject: Quick reminder for tomorrow

Hi [First Name] — quick reminder about our no-show reduction walkthrough tomorrow at [Time].

If you can share two numbers beforehand, I’ll tailor the ROI:
- Appointments/week (or month)
- Avg $ value per visit

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### 3) Day-of demo reminder (2–3 hours before)
Subject: Still good for [Time]?

Hi [First Name] — still good for [Time] today?

If you need to reschedule, reply with a better day/time and I’ll adjust.

— Bob

### 4) No-show recovery email (if they miss the demo)
Subject: Want to reschedule?

Hi [First Name],

Looks like we missed each other. No worries—want to reschedule?

A quick 10-minute walkthrough is usually enough to see if we can reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill.

You can grab a slot here: [MEETINGS LINK]
Or reply with two times that work.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### 5) Post-demo close email (Stripe ask + onboarding)
Subject: Next step to launch (24–48h setup)

Hi [First Name],

Thanks for the time today. If you’d like to move forward, the next step is getting your location activated—setup is done-for-you in 24–48 hours.

1) Pay/activate here: [STRIPE PAYMENT LINK]
2) Reply with your scheduling system + best number for your front desk
3) We’ll confirm messaging copy and go live

Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Questions welcome—reply anytime.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## G) Daily KPI scoreboard (copy into a sheet)
Columns:
Date | New Leads Added | Emails Sent | Emails Delivered (est) | Replies | Positive Replies | Calls Placed | Connects | Demos Booked | Demos Held | Trials/Onboardings Started | Closed Won | Closed Lost | Notes / Top Objections

Weekly math targets (to hit 40 demos):
- Aim 10 demos/week.
- Typical cold benchmarks: 1–3% positive reply rate on cold email + calling lifts connects.
- At 500–1,000 prospects touched in 2 weeks, you should see enough replies/connects to sustain 10 demos/week if copy + targeting are tight.

---

## H) Operating rules (speed)
- Reply SLA: respond to any email reply within 1 hour during business hours.
- Always ask: “Are you the person who owns scheduling tools?”
- Always attach credibility: include the site link and the reply-to email.
- Log every touch in HubSpot same day (no backlog).

This SOP is ready to run immediately once HubSpot is created, a meetings link exists, and the first 200 leads are loaded.