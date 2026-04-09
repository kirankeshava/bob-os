# Pilot Recruitment + Onboarding Pack (Email Sequence, Qualification Rubric, Call Script, Success Dashboard)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** copy
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:36:22.840Z

---

## 1) Pilot Candidate Qualification Rubric (score 0–2 each; target ≥10/14)
Use this to quickly decide whether a prospect is worth a concierge pilot.

1) Appointment volume: 0 (<10/wk), 1 (10–40/wk), 2 (40+/wk)
2) No-show pain admitted: 0 (dismissive), 1 (some), 2 ("it’s a big problem")
3) Has a reminder process today: 0 (none + resistant), 1 (manual texts/calls), 2 (inconsistent + wants automation)
4) Booking system clarity: 0 (paper/messy), 1 (basic online calendar), 2 (single primary system + willing to share workflow)
5) Decision-maker access: 0 (gatekept), 1 (manager), 2 (owner/GM responds)
6) Speed to launch: 0 (>2 weeks), 1 (1–2 weeks), 2 (this week)
7) Compliance readiness (consent + opt-out): 0 (won’t do), 1 (needs guidance), 2 (already collecting phone consent)

Best pilot niches (fastest measurable impact): med spas, PT/chiro, dental, salons with deposits/no-deposit issues, car service, clinics, tutoring centers.

---

## 2) Pilot Recruitment Email Sequence (Ready to send)
Sender: Bob Smith (use business contact email)
Reply-to/support: agent_bob_replit+no-show-bot@agentmail.to
Legitimacy link to include in every email: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Email #1 (Initial)
Subject options (pick one):
A) Quick pilot to cut no-shows (2-way SMS confirmations)
B) Reduce no-shows in 7 days — concierge pilot
C) Can we stop last-minute no-shows at {{BusinessName}}?

Body:
Hi {{FirstName}},

I’m Bob Smith. We’re running 2–3 concierge pilots of a micro-tool that reduces appointment no-shows using SMS reminders + two-way confirmations (customers reply YES/NO), with automated reschedule prompts and optional waitlist gap-filling.

If you’re dealing with late cancellations/no-shows, I can set up a 7-day pilot for {{BusinessName}} so you can measure impact quickly.

What you get in the pilot:
- Smart reminders + two-way confirmations (reply YES/NO/RESCHEDULE)
- Simple weekly report showing confirmations, reschedules, and estimated recovered revenue
- Concierge setup (we do the heavy lifting)

What I need from you:
- Your timezone + business hours
- Your typical appointment value (or range)
- How you currently confirm appointments

If you’re open, can we do a 15-minute call this week to see if it’s a fit?

Legitimacy/info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Thanks,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to


### Email #2 (Follow-up, +1–2 days)
Subject: Re: quick pilot to reduce no-shows

Hi {{FirstName}},

Following up—are no-shows/cancellations a meaningful issue for {{BusinessName}} right now?

If yes, I can run a 7-day concierge pilot and send a weekly value report (confirmations, reschedules, and estimated recovered revenue). If no, I won’t bug you.

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Want to take a quick 15-minute look this week?

—Bob
agent_bob_replit+no-show-bot@agentmail.to


### Email #3 (Follow-up, +3–5 days; “breakup”)
Subject: Close the loop?

Hi {{FirstName}},

Should I close the loop on this?

If you want, reply with just a number:
1) Yes—no-shows are a problem, let’s do a quick pilot call
2) Maybe later
3) Not a priority

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Thanks,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to

---

## 3) 15-Minute Pilot Onboarding Call Script (Concierge)
Goal: confirm fit, capture baseline, confirm consent/opt-out expectations, and schedule go-live.

0:00–1:30 — Context + outcome
- “Thanks {{Name}}—in 15 minutes we’ll confirm whether a 7-day pilot will measurably reduce no-shows for {{Business}}. If it’s not a fit, we’ll stop there.”

1:30–5:00 — Volume + baseline (must capture)
- “Roughly how many appointments per week per location?”
- “What’s your current no-show rate (even a guess)?”
- “Average appointment value? If it varies, give me a range or your most common service.”
- “Do you currently send reminders? If yes: when (24h/2h) and via what channel?”

5:00–9:00 — Workflow + rules
- “What are acceptable reminder times (business hours only vs evenings)?”
- “Do you allow same-day reschedules? Any cutoff window?”
- “If someone replies NO, should we offer reschedule automatically or route to staff?”
- “Do you have a waitlist we can use to fill openings? If yes, how do you prioritize it (first-come, VIP, by service)?”

9:00–12:00 — Compliance + consent (non-negotiable)
- “Do customers already provide phone numbers for appointment communications?”
- “Is your intake/booking flow already stating they can receive texts about their appointment?”
- “We include STOP to opt out. If someone opts out, do you want staff alerted?”
- “For the pilot, we’ll only message appointment-related communications and honor opt-out immediately.”

12:00–14:00 — Go-live plan
- Confirm timezone
- Choose reminder schedule (default suggestion): 24h + 2h before appointment
- Confirm escalation contact (owner/manager phone/email)
- Set go-live date and a daily check-in time (5 minutes)

14:00–15:00 — Close
- “I’ll send a short confirmation email with what we collected and next steps. After 7 days, you’ll get a weekly value report with confirmed/rescheduled counts and estimated recovered revenue.”
- Share legitimacy link and support email again.

---

## 4) 7-Day Pilot Success Dashboard (What to track daily + weekly)
Track these to produce sales-proof and enable conversion.

### Inputs (baseline)
- Location timezone
- Appointments/week
- Baseline no-show rate (last 4 weeks if possible)
- Avg appointment value (or by service)

### Daily operational metrics
- Messages sent (reminders + follow-ups)
- Confirmations received (YES)
- Cancellations (NO)
- Reschedule requests (RESCHEDULE or similar)
- Opt-outs (STOP)
- Exceptions/errors (delivery failures, parsing failures, calendar failures)

### Weekly outcome metrics
- Confirmation rate = YES / contacted appointments
- Reschedule rate = reschedules / contacted appointments
- Prevented no-shows estimate (conservative) = incremental shows vs baseline OR (reschedules + confirmed-at-risk)
- Waitlist fills = openings filled via waitlist
- Estimated recovered revenue/week = (prevented no-shows + waitlist fills) * avg appointment value

### Client-facing proof points (include in report)
- “Recovered revenue this week (est.)”
- “No-show reduction trend (baseline vs pilot)”
- “Staff time saved (qualitative + any quantifiable notes)”

All client communications should include:
- Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to
