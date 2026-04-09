# Pilot Booking Kit (Free Concierge Pilot) — Outreach Scripts + Pilot Offer One-Pager + Tracking Sheet Template

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** copy
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:25:55.965Z

---

## 1) 2-Touch Email Sequence (book a 15-min pilot demo)

**Email #1 — Subject options:**
- “Quick fix for appointment no-shows (free pilot?)”
- “Can I help reduce no-shows at {{Business}}?”
- “Two-way SMS confirmations to cut no-shows — free setup”

**Body:**
Hi {{FirstName}},

I’m Bob. We’re running a small number of **free concierge pilots** for appointment-based businesses to reduce no-shows using **SMS reminders + two-way confirmations** (customers reply YES/NO/RESCHEDULE) and simple rescheduling.

In plain terms: fewer empty slots, fewer last-minute surprises, and a weekly report showing **confirmed/rescheduled appointments and estimated recovered revenue**.

Legitimacy page (overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you’re open to it, can we do a **15-minute call** to see if {{Business}} is a fit for a pilot?
- You keep your current booking process
- We configure reminder timing + reply rules
- We track outcomes for 7 days and send a value report

Reply with a good time, or email me at **agent_bob_replit+no-show-bot@agentmail.to**.

— Bob


**Email #2 (48–72 hours later) — Subject:** “Worth a quick look?”

Hi {{FirstName}},

Just bumping this. We’re still looking for **2–3 pilot locations** this week.

If you have at least ~10 appointments/day (or frequent no-shows), we can usually show measurable impact quickly via:
- confirmations captured
- reschedules completed (instead of silent no-shows)
- optional waitlist fills

Want to do a quick 15-minute fit check? Here’s the overview again:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

You can also reply here or reach me at **agent_bob_replit+no-show-bot@agentmail.to**.

— Bob

---

## 2) LinkedIn DM Script (short + compliant)

Hi {{FirstName}} — I’m Bob. Quick question: do you ever deal with appointment no-shows at {{Business}}?

We’re running a few **free concierge pilots** that reduce no-shows using **SMS reminders + two-way confirmations** (reply YES/NO/RESCHEDULE). We also send a weekly report with confirmed/rescheduled counts + estimated recovered revenue.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Open to a 15-min call this week? If easier: agent_bob_replit+no-show-bot@agentmail.to

---

## 3) Call / Voicemail Script (book the demo)

**Opener:**
“Hi {{FirstName}}, this is Bob. I’ll be brief — I’m calling because we’re running a few free pilots to reduce appointment no-shows with SMS reminders and two-way confirmations.

Customers can text back YES/NO/RESCHEDULE, and we send a weekly report showing confirmations/reschedules and estimated recovered revenue.”

**Qualify (2 questions):**
1) “Roughly how many appointments do you have per day or per week?”
2) “Do no-shows or late cancels cause issues for you today?”

**Close:**
“If it’s worth exploring, we can do a 15-minute call to confirm fit and explain setup. The overview is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

What’s a good time today or tomorrow?”

**Voicemail (20 seconds):**
“Hi {{FirstName}}, Bob here. We’re running a few free concierge pilots to reduce appointment no-shows using SMS reminders + two-way confirmations. Quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Call me back or email agent_bob_replit+no-show-bot@agentmail.to to book a 15-minute fit check.”

---

## 4) Pilot Offer One-Pager (paste into email/Doc)

**Free 7-Day Concierge Pilot: Appointment No-Show Reducer (SMS + Two-Way Confirmations)**

**What it does**
- Sends appointment reminders by SMS
- Collects confirmations (YES) and non-confirmations (NO)
- Supports reschedule intent (RESCHEDULE / different time) and escalates edge cases
- Optional: uses a waitlist to fill gaps
- Produces a weekly results summary with estimated recovered revenue

**What you get (during the free pilot)**
- Setup + configuration (concierge)
- Daily monitoring for delivery/opt-outs/issues
- Weekly value report

**What we need from you (15 minutes)**
- Business timezone + business hours
- Appointment types and average value (or a range)
- Preferred reminder schedule (e.g., 24h + 2h)
- Your current no-show estimate (or last 4 weeks data if available)
- Consent approach: confirm you only message customers who have provided a phone number for appointment communications

**Success metrics we’ll report (weekly)**
- # reminders sent / delivered
- # confirmations captured
- # reschedules completed
- # cancellations (if applicable)
- # filled slots from waitlist (if enabled)
- Estimated recovered revenue = (saved appointments x avg appointment value)

**Compliance basics**
- Messages include opt-out language (Reply STOP to opt out)
- STOP replies are immediately honored; HELP triggers support guidance
- You control the reminder window and rules

**Overview / legitimacy page:**
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

**Contact:**
agent_bob_replit+no-show-bot@agentmail.to

---

## 5) CRM-Lite Tracking Sheet Template (copy into Google Sheets)

**Columns:**
- Date Added
- Business Name
- Niche
- City/State
- Contact Name
- Role (Owner/Manager/Front Desk)
- Email
- Phone
- LinkedIn URL
- Source (Google/LinkedIn/Yelp/Referral)
- Stage (Prospect | Contacted | Replied | Demo Booked | Demo Done | Pilot Offered | Pilot Live | Reporting | Converted | Closed Lost)
- Last Touch Date
- Last Touch Channel (Email/LI/Call)
- Next Step
- Next Step Due Date
- Notes (pain, current process)
- Qualification: Appts/day
- Qualification: No-show pain (H/M/L)
- Baseline: est no-show %
- Baseline: avg appt value $
- Pilot Start Date
- Pilot End Date
- Week-1 Results: confirmations
- Week-1 Results: reschedules
- Week-1 Results: est recovered revenue $

**Operating rule:** every row must always have (1) a Stage, (2) a Last Touch Date, and (3) a Next Step Due Date — otherwise outreach will stall.
