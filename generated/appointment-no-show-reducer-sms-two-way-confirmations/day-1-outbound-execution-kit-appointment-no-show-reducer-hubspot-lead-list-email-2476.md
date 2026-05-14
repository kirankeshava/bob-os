# Day-1 Outbound Execution Kit — Appointment No-Show Reducer (HubSpot + Lead List + Email/Call/SMS + KPI)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T05:01:44.405Z

---

## 1) Offer + proof (use everywhere)
**One-liner:** We reduce appointment no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.
**Legitimacy URL (share with prospects):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
**Contact email:** agent_bob_replit+no-show-bot@agentmail.to

## 2) HubSpot Free CRM setup (pipeline + required fields)
### Pipeline stages (names + exit criteria)
1. **New Lead** — record created, not contacted.
2. **Attempted Contact** — at least 1 email or call logged.
3. **Connected** — two-way conversation started (reply or live call).
4. **Qualified** — confirmed: appointments/week, est. no-show %, value/visit, scheduling system, decision maker.
5. **Demo Scheduled** — meeting booked (date/time set).
6. **Demo Held** — completed demo; next step set.
7. **Trial / Pilot (7 days free)** — onboarding started; reminder flow live.
8. **Closed Won** — location agrees to paid continuation post-trial.
9. **Closed Lost** — disqualified or “no”.
10. **Nurture** — “not now”; set follow-up date.

### Custom properties to create (minimum viable)
- Vertical (dentist/chiro/med spa/PT/optometry/other)
- City Cluster
- Website
- Main Phone
- Contact Role (owner/office manager/front desk)
- Appointments per week (numeric)
- No-show rate % (estimate)
- Avg value per visit ($)
- Scheduling software (e.g., Square, Acuity, Jane, Mindbody, NexHealth, etc.)
- Current reminders? (Y/N)
- Pain (free text)
- Next Step Date (date)
- Last Touch (auto or manual)
- Dispo (No answer/Left VM/Answered/Interested/Not interested)

### Daily task queues
- **Queue A: First touches** (New Lead → Attempted Contact)
- **Queue B: Follow-ups** (Attempted Contact/Connected)
- **Queue C: Pre-demo confirmations** (Demo Scheduled)

## 3) Lead list build SOP (free sources) — first 200 leads
### City clusters (example)
- Cluster 1: Phoenix metro (Phoenix/Scottsdale/Mesa/Tempe)
- Cluster 2: Tampa metro (Tampa/St. Petersburg/Clearwater)

### Verticals (5)
Dentist, Chiropractor, Med Spa, Physical Therapy, Optometry

### Where to source (free)
1) Google Maps listings + website contact pages
2) Yelp category pages (then visit business site)
3) Healthgrades/Zocdoc (for clinics; confirm via business site)
4) Local chamber directories

### Search queries (copy/paste)
- "chiropractor" + "City" + "appointment"
- "med spa" + "City" + "book online"
- "dentist" + "City" + "schedule"
- "physical therapy" + "City" + "request appointment"
- "optometrist" + "City" + "appointments"

### Capture columns (CSV for HubSpot import)
Company Name | Website | Location Address | City | State | Phone | Contact Name | Contact Role | Email | Vertical | Notes (hours, booking link, scheduling tool guess)

### Dedupe rules
- Dedupe by Website domain first; if none, by Phone.
- Skip if business is permanently closed or no appointment taking.

## 4) Day-1 volume plan (no spend)
- **Emails:** 50–100 (plain text) in two blocks (morning + afternoon)
- **Calls:** 20–40 in two call blocks; leave brief VM if no answer
- **Texts:** only to numbers where you have a reasonable business basis and local compliance norms; keep it opt-out friendly
- **Logging:** every touch gets a HubSpot activity + Dispo + Next Step Date

## 5) Cold email templates (12 variants)
### Subject lines (mix and match)
1) Quick question about no-shows
2) Cutting no-shows at {Clinic}
3) Two-way confirmations for {Clinic}
4) Filling last-minute cancellations
5) Missed appointments = lost revenue
6) Fast idea for your schedule

### Email #1 (short)
Subject: Two-way confirmations for {Clinic}

Hi {FirstName} — I noticed {Clinic} books appointments online. Do you have an issue with last-minute cancellations or no-shows?

We help appointment-based businesses reduce no-shows using **two-way SMS confirmations**, **instant reschedules**, and **waitlist fill**. Setup is done-for-you in 24–48 hours.

If you’re open, I can show you a 10-min walkthrough this week.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email #2 (numbers angle)
Subject: Missed appointments = lost revenue

Hi {FirstName} — quick math question. If {Clinic} sees ~{X} appointments/week and even 5–10% don’t show, that’s a lot of recoverable revenue.

Our system sends smart reminders, collects confirmations (Y/N), automates reschedules, and pings a waitlist to fill gaps.

Who owns scheduling/fill-rate at {Clinic} — you or an office manager?

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob | agent_bob_replit+no-show-bot@agentmail.to

### Email #3 (process angle)
Subject: Filling last-minute cancellations

Hi {FirstName} — do you currently do confirmations manually (calls/texts) or rely on your scheduling software?

We’re focused on one thing: **reduce no-shows** with **two-way SMS confirmations** + **1-click reschedule** + **waitlist fill**. We also show simple analytics (recovered visits / revenue).

Open to a quick demo? If yes, what’s best: Tue/Wed morning or afternoon?

— Bob
agent_bob_replit+no-show-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Email #4 (owner/manager routing)
Subject: Who handles confirmations?

Hi {FirstName} — who’s the right person to talk to about appointment confirmations + reducing no-shows at {Clinic}?

We implement two-way SMS confirmations, instant reschedules, and waitlist fill (done-for-you in 24–48h).

If it’s you, I can send 2–3 quick questions to see if it’s worth a demo.

— Bob | agent_bob_replit+no-show-bot@agentmail.to

### Email #5 (follow-up 1)
Subject: Re: two-way confirmations

Hi {FirstName} — bumping this. If no-shows aren’t a priority, no worries.

If they are: are you closer to **10–20 appointments/day** or **20–50/day**? That tells me if this is worth a 10-min look.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email #6 (follow-up 2 w/ CTA)
Subject: Should I close the loop?

Hi {FirstName} — should I close the loop here, or is reducing no-shows something you want to tackle this month?

Happy to show the flow + analytics: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob | agent_bob_replit+no-show-bot@agentmail.to

## 6) Call openers + voicemails
### Call opener A (owner/manager)
“Hi, is this {FirstName}? Bob here — quick one. I work with appointment-based clinics to reduce no-shows using two-way SMS confirmations and easy reschedules. Are no-shows a problem at {Clinic}, or is your fill rate already solid?”

### Call opener B (front desk)
“Hi — quick question, who’s the best person to talk to about reducing no-shows and last-minute cancellations? We set up two-way SMS confirmations and waitlist fill for clinics.”

### Voicemail (short)
“Hi {FirstName}, Bob calling for {Clinic}. We help reduce no-shows with two-way SMS confirmations and instant reschedules. I’ll send a quick email as well. You can also reach me at agent_bob_replit+no-show-bot@agentmail.to.”

### Voicemail (with hook)
“Hi {FirstName}, Bob here. Quick idea to recover missed appointments: two-way SMS confirmations + auto-reschedule + waitlist fill. If you want, I can show you in 10 minutes. agent_bob_replit+no-show-bot@agentmail.to.”

## 7) SMS templates (keep compliant + easy opt-out)
1) “Hi {FirstName} — Bob here. Quick question: do no-shows/cancellations hurt your schedule at {Clinic}? We set up two-way SMS confirmations + easy reschedules. Reply YES and I’ll send details. (Reply STOP to opt out)”
2) “{FirstName}, can I point you to a 60-sec overview? https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  (Reply STOP to opt out)”
3) “If you’re the wrong person for scheduling/fill rate, who should I contact at {Clinic}? (Reply STOP to opt out)” 
4) “Happy to do a 10-min walkthrough this week. Tue or Wed better? (Reply STOP to opt out)” 

## 8) Qualification (ask fast; log answers)
- About how many appointments/week?
- Rough no-show %?
- Avg $ value per visit?
- Current reminder process (software/manual)?
- Who can approve changes to reminder workflows?
- Biggest pain: no-shows vs last-minute cancellations vs unfilled gaps?

## 9) Reply-handling library (email)
### Positive
“Perfect — happy to show you. Are you available {2 time options}? If easier, reply with 2 times that work and I’ll send an invite. Overview again: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

### Price push
“Totally fair to ask. It depends on appointment volume and locations, but the goal is always: recovered visits >> cost. If you share your weekly appointment volume + avg visit value, I’ll tell you whether this is a fit before we schedule anything.”

### Not now
“Got it — when should I follow up? If you tell me your approximate appointment volume, I can send one relevant suggestion in the meantime.”

### Objection: ‘we already have reminders’
“Makes sense. The difference is the **two-way confirmation + automated reschedule + waitlist fill** (not just one-way reminders). If you’re open, I can show the workflow and you can compare it to what you have.”

### Stop
“Understood — I won’t reach out again. (If you’d like, you can contact me anytime at agent_bob_replit+no-show-bot@agentmail.to.)”

## 10) Daily KPI report (paste into a doc each day)
Date:
- New leads added:
- Emails sent:
- Email replies (pos/neutral/neg):
- Calls placed:
- Live connects:
- Demos booked:
- Demos held:
- Trials started:
- Closed won:
- Notes: top objections, what worked, what to change tomorrow
