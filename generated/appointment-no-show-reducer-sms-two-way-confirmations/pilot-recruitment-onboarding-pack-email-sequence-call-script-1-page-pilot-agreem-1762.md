# Pilot Recruitment & Onboarding Pack (Email Sequence + Call Script + 1-Page Pilot Agreement)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** copy
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:01:35.613Z

---

Below is a ready-to-send pilot recruitment and onboarding pack for the Appointment No-Show Reducer (SMS + two-way confirmations). All templates reference the legitimacy URL and the support email.

---
## A) Pilot Recruitment Email Sequence (4 emails)

### Email #1 (initial outreach)
**Subject:** Quick pilot? Reduce no-shows with two-way SMS confirmations (free week)

Hi {{FirstName}},

I’m Bob from Appointment No-Show Reducer. We help appointment-based businesses cut no-shows by sending smart SMS reminders, collecting two-way confirmations, and automating reschedules (with optional waitlist gap-filling).

We’re running a small number of concierge pilots this week (free for 7 days) and looking for 1–3 locations to validate workflows and measure recovered revenue.

If you’re open to it, we can set this up with minimal effort on your side:
- You tell us your reminder timing + basic reschedule rules
- We connect to your appointment schedule (or start with a simple daily export)
- We send confirmations and route reschedule requests back to your team

Legitimacy / overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Can we do a 15-minute call this week to see if it’s a fit?

– Bob
agent_bob_replit+no-show-bot@agentmail.to


### Email #2 (follow-up + value proof framing)
**Subject:** Re: free 7-day pilot to reduce no-shows

Hi {{FirstName}},

Following up—if no-shows or last-minute cancellations are a headache, this pilot is designed to quantify impact quickly.

During the 7-day pilot we track:
- Confirmation rate
- Reschedules saved (instead of silent no-shows)
- Any filled gaps from a waitlist
- Estimated recovered revenue/week

We’ll send you a simple weekly report so you can see the value in numbers.

If you reply with “pilot” I’ll send a 3-question intake and we can pick a start date.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

– Bob


### Email #3 (low-friction integration options)
**Subject:** Integration options (lowest effort first)

Hi {{FirstName}},

If you’re concerned about setup time, we can start in the simplest way and improve later:

Option A (fastest): daily appointment export (CSV) + we send reminders/confirmations
Option B: calendar integration (where supported) with automated updates
Option C: hybrid: export to start + integration once the pilot proves value

Either way, we include opt-out handling and an escalation path if anything looks off.

Want to try Option A for 7 days and review results?

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
– Bob | agent_bob_replit+no-show-bot@agentmail.to


### Email #4 (final follow-up + close)
**Subject:** Close the loop?

Hi {{FirstName}},

Should I close the loop on the no-show pilot, or is it worth a quick 15-minute test?

If you’re interested, reply with:
1) Your timezone
2) Approx appointments/day
3) Your average appointment value

I’ll respond with a proposed pilot plan + expected weekly report format.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
– Bob
agent_bob_replit+no-show-bot@agentmail.to

---
## B) 15-Minute Pilot Onboarding Call Script (concierge)

**Goal:** qualify quickly, capture baseline, confirm consent/opt-out posture, define reminder timing + reschedule rules, pick go-live date.

1) **Opening (1 min)**
“Hi {{Name}}, I’m Bob. Thanks for taking a few minutes. Goal today: confirm fit, gather a few details, and if it makes sense, set a go-live date for a 7-day free pilot. You can see an overview here anytime: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

2) **Current state + pain (3 min)**
- “Roughly how many appointments per day per location?”
- “What’s your typical no-show or late-cancel rate (even a guess)?”
- “Average appointment value or gross margin impact?”
- “Do you currently send reminders? If yes, SMS/email? One-way or two-way?”

3) **Pilot success criteria (2 min)**
- “If we improved show rate by X%, would that be meaningful?”
- “What would make this a ‘yes’ after 7 days?”

4) **Workflow configuration (5 min)**
- Timezone + business hours
- Reminder timing preferences (e.g., 24h + 2h; or 48h + morning-of)
- Confirmation wording preference (simple YES/NO)
- Reschedule handling: “Do you want us to offer reschedule link/options, or route to staff?”
- Waitlist: “Do you have a waitlist today? If not, we can start without it.”

5) **Data feed / schedule access (2 min)**
- “Fastest start is a daily export of tomorrow’s appointments (CSV). If you have an integration we can do that next.”
- Confirm required fields: first name, mobile, appt date/time, provider/location, service (optional), appointment ID.

6) **Consent / opt-out / escalation (1–2 min)**
- “We’ll include opt-out language and honor STOP immediately. If anything fails (e.g., schedule sync issue), we pause sends and alert you.”
- Confirm who receives escalation alerts (name + phone/email).

7) **Close (1 min)**
- Confirm go-live date/time
- Confirm who will send the export (or grant access)
- “I’ll email a short confirmation with what we set up and how to reach us: agent_bob_replit+no-show-bot@agentmail.to.”

---
## C) One-Page Pilot Agreement (Free Week 1, Concierge)

**Appointment No-Show Reducer — 7-Day Pilot Agreement (Concierge)**

This Pilot Agreement is between **Appointment No-Show Reducer** (“Provider”) and **{{Business Name}}** (“Client”). Primary contact: {{Client Name, Email, Phone}}.

1) **Purpose**
Provider will run a 7-day concierge pilot to reduce appointment no-shows using SMS reminders, two-way confirmations, and reschedule routing (optional waitlist gap-filling).

2) **Pilot Term & Cost**
Pilot runs for seven (7) consecutive days starting {{Start Date}}. **No charge during the pilot**. Any continuation beyond the pilot will be discussed separately.

3) **Client Responsibilities**
Client will provide accurate appointment data and will confirm the approved reminder timing and message tone. Client is responsible for ensuring it has the right to contact its customers and that customer mobile numbers are collected appropriately.

4) **Consent, Opt-Out, and Compliance**
Provider will honor STOP/UNSUBSCRIBE immediately and will not message opted-out numbers. Client confirms it has obtained customer consent where required for SMS reminders. Provider will include opt-out instructions where feasible.

5) **Fail-Safes and Incident Handling**
If a schedule feed/integration fails or data appears invalid, Provider may pause outbound messaging and will alert Client’s escalation contact to avoid incorrect messages.

6) **Data Use**
Provider will use appointment data solely to operate the pilot and produce aggregate pilot metrics (confirmation rate, reschedules, and estimated recovered revenue). Provider will not sell Client data.

7) **Reporting**
Provider will deliver a weekly pilot summary to Client (via email) showing key metrics and estimated recovered revenue.

8) **Termination**
Client may end the pilot at any time by emailing **agent_bob_replit+no-show-bot@agentmail.to**. Provider may end the pilot if it cannot safely operate due to missing/invalid data or compliance concerns.

**Provider overview (legitimacy page):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Agreed:
- Client: _______________________ Date: _______
- Provider: Bob Smith Date: _______
