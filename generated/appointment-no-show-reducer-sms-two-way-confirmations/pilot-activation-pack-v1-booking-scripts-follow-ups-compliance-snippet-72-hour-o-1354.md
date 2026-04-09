# Pilot Activation Pack v1 — Booking Scripts, Follow-Ups, Compliance Snippet, 72-Hour Onboarding, and 14-Day Success Scorecard

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:34:47.787Z

---

## 1) Pilot Booking Call Script (15 minutes)

**Goal:** Book a concierge pilot for Appointment No-Show Reducer (SMS reminders + two-way confirmations + reschedules + waitlist fills). Keep it simple, outcomes-focused, and low-risk.

**Opener (20–30 sec)**
“Hi — is this the owner/manager? I’m Bob. We help appointment-based businesses cut no-shows using two-way SMS confirmations and quick rescheduling. I can send you a legit link to what we’re running here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. If it’s easier, you can also reach me at agent_bob_replit+no-show-bot@agentmail.to.”

**Qualify (3 minutes)**
1) “About how many appointments do you have per day or per week?”
2) “What’s your current no-show or late-cancel situation?”
3) “What scheduling system do you use today (Square/Calendly/Acuity/Google Calendar/other)?”
4) “Do you already send reminder texts? If yes, do you collect replies and act on them?”

**Problem framing (30 sec)**
“What we typically see is reminders go out, but confirmations don’t get processed, reschedules create phone tag, and waitlists don’t get used—so the schedule still leaks revenue.”

**Offer (2 minutes)**
“We’re running 2–3 concierge pilots right now. We set it up with you, monitor daily, and send a weekly value report showing confirmations, reschedules, and estimated recovered revenue. You keep full control: anyone can reply STOP to opt out.”

**Define the pilot scope (2 minutes)**
- Duration: “14 days is enough to see signal.”
- Workflow: “Reminders + two-way confirmation + reschedule link/flow + optional waitlist fill.”
- Safety: “If anything fails (like calendar connectivity), we pause automation and alert you immediately.”

**Close (2 minutes)**
“Does it make sense to run this for 14 days? If yes, I’ll send a short intake form and we can go live within 48–72 hours.”

**Scheduling**
“Best email for the intake + confirmation? (We’ll send from agent_bob_replit+no-show-bot@agentmail.to.)”

---

## 2) Voicemail Script (20–25 sec)
“Hi, this is Bob. We help appointment-based businesses reduce no-shows with two-way SMS confirmations and automated rescheduling. Quick 14-day concierge pilot—simple weekly value report included. You can see what it is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Text or email me at agent_bob_replit+no-show-bot@agentmail.to. Thanks.”

---

## 3) Email Sequence (Ready to Send)

### Email #1 — Initial outreach (short)
**Subject:** Quick 14-day pilot to reduce no-shows (two-way SMS)

Hi {{FirstName}},

I’m Bob. We help appointment-based businesses reduce no-shows using smart SMS reminders + two-way confirmations + automated rescheduling (and optional waitlist fill).

Here’s our info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

We’re recruiting 2–3 concierge pilot locations for a 14-day run. We set it up with you, monitor daily, and send a weekly value report (confirmations, reschedules, fills, estimated recovered revenue).

Open to a 15-minute call this week? If yes, what scheduling system do you use (Square/Calendly/Acuity/Google Calendar/other) and roughly how many appointments/week?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email #2 — Follow-up (48 hours)
**Subject:** Re: 14-day no-show reduction pilot

Hi {{FirstName}},

Quick follow-up—if no-shows or late cancels are even 3–5% of bookings, two-way confirmations + fast rescheduling usually pays for itself quickly.

If helpful, here’s the overview again: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Are you open to being one of the 2–3 pilot locations? Reply with your scheduling tool + best time for a 15-minute setup call.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email #3 — Breakup (Day 6–7)
**Subject:** Should I close your file?

Hi {{FirstName}},

Totally fine if timing isn’t right. Should I close your file, or would you like to run a 14-day pilot to reduce no-shows with two-way SMS confirmations + rescheduling?

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Either way, reply “later” or “yes” and I’ll follow your lead.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## 4) SMS/DM Script (only where compliant / existing relationship)
“Hi {{Name}} — Bob here. We’re running a quick 14-day concierge pilot to cut appointment no-shows with two-way SMS confirmations + reschedules. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Want details? You can also email me: agent_bob_replit+no-show-bot@agentmail.to”

---

## 5) Client Acknowledgement Snippet (Consent + Opt-Out + Responsibilities)
**Client Pilot Acknowledgement (copy/paste into email)**

By participating in the 14-day pilot of Appointment No-Show Reducer, you confirm:
1) You will only upload/contact patients/customers who have provided permission to receive SMS related to their appointments (transactional reminders/updates).
2) All messages include opt-out language (e.g., “Reply STOP to opt out”). If a contact replies STOP, messaging to that number will cease.
3) You remain responsible for your customer communications policy and any required disclosures in your jurisdiction.
4) If an integration fails (e.g., calendar connectivity), automation may pause and we will alert you to prevent incorrect messaging.

Questions anytime: agent_bob_replit+no-show-bot@agentmail.to
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

---

## 6) “First 72 Hours” Onboarding Explainer (send after verbal yes)
**Subject:** Next steps — go live in 48–72 hours

Hi {{FirstName}},

Excited to run the 14-day pilot. Here’s what happens over the next 72 hours:

**Within 0–24 hours (Intake + baseline)**
- You share: business timezone, hours, reminder timing (e.g., 24h + 2h), reschedule rules, and average appointment value.
- We capture baseline: your last ~4 weeks (appointments booked, no-shows, late cancels if tracked).

**Within 24–48 hours (Configuration + safety checks)**
- We configure reminder messages, two-way confirmation handling (YES/NO/RESCHEDULE), and opt-out.
- We run a smoke test: timezone/DST, STOP/HELP, reschedule loop, and calendar update/write-back behavior.

**Within 48–72 hours (Go-live)**
- We turn on live sending.
- Daily monitoring begins (deliverability, reply handling, errors).

**What you’ll receive**
- A weekly value report showing: confirmations, reschedules completed, waitlist fills (if enabled), and estimated recovered revenue.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

— Bob

---

## 7) 14-Day Pilot Success Scorecard (Conversion-Ready Proof)

**Pilot goal:** Demonstrate measurable reduction in no-shows/late cancellations and/or measurable recovery via reschedules + waitlist fills.

### Inputs (collected Day 0)
- Location name:
- Timezone:
- Scheduling system:
- Avg appointments/week:
- Avg appointment value ($):
- Baseline no-show rate (last 4 weeks):
- Baseline late-cancel rate (if available):

### Core Metrics (tracked daily; rolled up weekly)
1) **Reminder delivery rate** = delivered / sent (target: ≥ 95%)
2) **Confirmation rate** = confirmed / sent (target: ≥ 35% in week 1; ≥ 45% by day 14)
3) **Negative response capture** = (NO + RESCHEDULE requests) / sent (target: track; success if acted on within SLA)
4) **Reschedule completion rate** = rescheduled / reschedule requests (target: ≥ 50%)
5) **Waitlist fill rate (optional)** = filled / openings created (target: ≥ 20% if waitlist enabled)
6) **Opt-out rate** = STOP / delivered (target: ≤ 2% weekly; investigate if > 2%)
7) **Incident count** (calendar failures, duplicate booking attempts, misclassifications) (target: 0 sev-1; ≤ 2 sev-2 per week)

### Outcome Metrics (end of Day 14)
- **Estimated recovered appointments** = (baseline no-show rate − pilot no-show rate) × total appointments
- **Estimated recovered revenue** = recovered appointments × avg appointment value
- **Admin time saved (qualitative)**: number of inbound calls reduced / staff feedback

### Pass/Fail (for conversion to paid)
**Pass if ANY of the following are true:**
- Pilot no-show rate improves by **≥ 20% relative** (e.g., 10% → 8%) OR
- Reschedules + waitlist fills generate **≥ $300/week** estimated recovered revenue OR
- Staff reports clear reduction in phone tag + at least **1 recovered appointment/day** on average in busy locations.

**Fail triggers (must fix before scaling):**
- Any STOP not honored within 5 minutes (sev-1)
- Any double-booking caused by automation (sev-1)
- Any timezone/DST mis-send confirmed by logs (sev-1)
- Delivery rate < 90% without explanation (sev-2)

### Client-facing proof pack (what we show)
- Before vs after: baseline no-show % vs pilot period
- Counts: sent, delivered, confirmed, rescheduled, filled
- Estimated recovered revenue/week
- 2–3 anonymized “reply transcript” examples (YES/RESCHEDULE) showing the system working

Support/legitimacy references to include in every client email:
- https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- agent_bob_replit+no-show-bot@agentmail.to
