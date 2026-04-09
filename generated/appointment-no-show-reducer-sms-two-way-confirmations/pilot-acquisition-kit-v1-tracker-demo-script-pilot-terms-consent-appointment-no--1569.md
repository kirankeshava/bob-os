# Pilot Acquisition Kit v1 (Tracker + Demo Script + Pilot Terms/Consent) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:41:06.730Z

---

## 1) Pilot Outreach Tracker (copy/paste into Google Sheets)
Use this to manage the first 30–60 prospects and ensure we quickly convert 2–3 locations into live pilots.

**Columns (in order):**
1. Prospect ID
2. Business Name
3. Niche (Dental/Chiro/PT/MedSpa/Spa/Salon/Vet/etc.)
4. City/Area
5. Locations (#)
6. Decision Maker Name
7. Role (Owner/GM/Office Manager)
8. Email
9. Phone (public)
10. Website
11. Source URL (where contact info was found)
12. Pilot Fit Score (1–5)
13. Current Reminder Process (notes)
14. Pain Signals (notes)
15. Outreach Channel (Email/LinkedIn/SMS)
16. Date Sent
17. Sequence Step (1/2/3)
18. Reply (Y/N)
19. Meeting Booked (date/time)
20. Baseline Collected (Y/N)
21. Pilot Start Date
22. Status (Prospecting / Contacted / Replied / Booked / Onboarding / Live / Reporting / Converted / Closed Lost)
23. Compliance Notes (SMS consent status, do-not-text)
24. Next Action
25. Next Touch Date

**Pilot Fit Scoring (quick rubric):**
- 5: High volume bookings + clear no-show pain + multiple providers + has waitlist/cancellations.
- 3: Moderate volume, some pain, owner responsive.
- 1: Low volume or unclear scheduling process.

---

## 2) 10-Minute Demo + Close Script (goal: book a 14-day concierge pilot)

**Prep (30 seconds):** Open the legitimacy URL and have it ready to share: 
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support/contact email to share verbally: agent_bob_replit+no-show-bot@agentmail.to

### A) Opener (1 minute)
“Thanks for taking 10 minutes. I’m Bob. We help appointment-based businesses reduce no-shows by sending smart SMS reminders, collecting two-way confirmations, and handling reschedules—so your schedule stays full. 

Before I show anything, can I ask: roughly how many appointments do you have per week, and what percent no-show or late-cancel?”

### B) Diagnose + quantify (2 minutes)
Ask:
1) “What happens today when someone doesn’t confirm?”
2) “Do you have a waitlist or same-day fill process?”
3) “What’s an average appointment worth (or first visit)?”

Then summarize:
“If you’re seeing ~X no-shows/week at ~$Y each, that’s ~$X*Y in exposure weekly. Even recovering a fraction tends to pay for this quickly.”

### C) Explain workflow (3 minutes)
“Our flow is simple:
1) Appointment booked → reminder messages go out at your chosen times.
2) Client replies YES/NO/RESCHEDULE.
3) YES is logged as confirmed. NO/RESCHEDULE triggers an automated reschedule flow (or escalates to staff depending on your preference).
4) If a slot opens, we can message a waitlist to fill gaps.
5) You get a weekly report showing confirmations, reschedules, and estimated recovered revenue.

We’re running concierge pilots first to ensure reliability and to tailor timing/rules to your business.”

### D) Risk controls (1 minute)
“We’re careful on compliance and safety:
- Every message supports STOP to opt out.
- If anything fails (calendar sync issues, etc.), we alert the owner/staff rather than silently failing.
- We can start with a subset of appointments/providers to reduce risk.”

### E) Close: propose 14-day pilot (2–3 minutes)
“I’d like to propose a 14-day pilot. We’ll do concierge setup and daily monitoring. In exchange, we’ll need: (1) your timezone and business hours, (2) your reminder timing preferences, (3) baseline numbers from the last ~4 weeks (no-shows/late cancels + rough average appointment value), and (4) confirmation that your appointment reminders are permitted and include opt-out.

If we can reduce no-shows or fill gaps measurably in the first 7 days, would you be open to converting to a paid monthly plan after the pilot?”

**Booking language:**
“Can we schedule a 15-minute onboarding call to collect the baseline and turn this on for a subset of appointments?”

---

## 3) Pilot Terms + Consent (one-pager to paste into email)
Subject: 14-Day Pilot — Appointment No-Show Reducer (SMS + Two-Way Confirmations)

Hi [Name],

Confirming the terms for our 14-day concierge pilot of the Appointment No-Show Reducer.

**What we do during the pilot**
- Configure SMS reminders and two-way confirmations (YES/NO/RESCHEDULE).
- Enable automated reschedule handling or staff escalation (your choice).
- Optionally message a waitlist to fill last-minute openings.
- Monitor daily and provide a weekly value report (confirmations/reschedules/fills + estimated recovered revenue).

**What you provide**
1) Business timezone and operating hours.
2) Reminder timing rules (e.g., 48h + 24h + 2h).
3) Baseline metrics for comparison (last ~4 weeks):
   - Approx. appointments/week
   - No-shows/late cancels per week (estimate is okay)
   - Average appointment value (or first visit value)
4) An escalation contact (name + phone/email) for urgent issues.

**Consent & compliance**
- You confirm your clients have consented to receive appointment-related SMS messages from your business (or that your existing intake/booking flow provides that permission).
- All messages will include opt-out instructions. Clients can reply STOP to opt out.
- If you prefer, we can start with a smaller subset of appointments/providers to minimize risk.

**Success criteria (how we measure value)**
- Confirmations captured (YES) and reduction in unconfirmed appointments.
- Reschedules completed (instead of no-show).
- Open slots filled from waitlist (if enabled).
- Estimated recovered revenue = (appointments saved or filled) × (average appointment value).

**Legitimacy + support**
- Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support: agent_bob_replit+no-show-bot@agentmail.to

Reply “AGREE” to confirm these pilot terms and we’ll schedule onboarding.

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

---

## 4) 2-Pilot Activation Plan (fast path to live installs)
**Day 0–1 (Book):** Send outreach → book 10-minute demo → ask for 14-day pilot.
**Day 1 (Onboard):** Collect timezone, rules, baseline, escalation contact. Confirm consent language.
**Day 2 (Go live small):** Start with 1 provider or 1 appointment type; run QA matrix; enable monitoring.
**Day 3–7 (Optimize):** Adjust reminder timing and reschedule triggers; track confirmations/reschedules/fills.
**Day 7 (Report):** Send weekly value report; explicitly quantify recovered revenue and operational time saved.
**Day 10–14 (Convert):** If success criteria met, convert to paid plan immediately after pilot.
