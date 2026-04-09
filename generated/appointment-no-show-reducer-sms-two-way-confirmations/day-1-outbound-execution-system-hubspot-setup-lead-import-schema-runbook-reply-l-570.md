# Day-1 Outbound Execution System (HubSpot Setup + Lead Import Schema + Runbook + Reply Library)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T08:23:00.510Z

---

Below is a complete, ready-to-execute Day-1 outbound system for Appointment No-Show Reducer (SMS + Two-Way Confirmations).

1) HubSpot FREE PIPELINE (single pipeline)
Stages (in order):
A. Prospecting (not yet touched)
B. Contacted (sent email and/or attempted call)
C. Engaged (reply, reached by phone, or meaningful interaction)
D. Demo Booked (calendar invite sent)
E. Demo Held (completed discovery/demo)
F. Closed Won
G. Closed Lost

Required contact/company properties to create (or map to existing):
- Vertical (Dental / Chiro / Med Spa / PT / Optometry)
- City Cluster (Phoenix / Dallas etc.)
- Location Count (1, 2–5, 6+)
- Scheduling System (unknown / SimplePractice / Dentrix / Jane / Mindbody / Other)
- Monthly Appts (estimate)
- No-show Rate (estimate)
- Value per Visit ($)
- Primary Pain (No-shows / Late cancels / Reschedules / Fill gaps)
- Decision Maker (Owner / Office Manager / GM)
- Best Phone
- Best Email
- Last Touch (date)
- Next Step (free text)
- Status Notes (free text)

2) LEAD CAPTURE + IMPORT SCHEMA (CSV columns)
Use exactly these columns so you can import cleanly into HubSpot:
- Company Name
- Website
- Address
- City
- State
- ZIP
- Phone
- Owner/Manager Name
- Title (Owner/Office Manager)
- Email
- Vertical
- City Cluster
- Source URL (Google Maps / directory link)
- Notes (anything useful: “online booking”, “multiple locations”, “mentions no-show policy”)
Dedupe rules: dedupe by Website first, then by Phone. If multiple contacts per location, keep 1 decision-maker + 1 office manager.

3) DAY-1 EXECUTION RUNBOOK (50–100 emails + 20–40 calls)
Goal: book demos, not educate.

Schedule (local time to each cluster):
- 8:30–10:00: Call Block #1 (10–20 dials)
- 10:30–11:30: Email Block #1 (25–50 sends)
- 1:30–3:00: Call Block #2 (10–20 dials)
- 3:30–4:30: Email Block #2 (25–50 sends)

Logging rule (non-negotiable): every touch gets logged same day. Update stage and set a task for the next action.

Call outcomes to log:
- No answer → leave voicemail (if appropriate) + stage=Contacted + task: email today
- Gatekeeper/Front desk → ask for office manager/owner + log name + task: call back time
- Reached decision maker → qualify 60 seconds; if fit, offer 15-min demo this week

4) CORE OFFER (one sentence)
“We reduce appointment no-shows with two-way SMS confirmations, instant reschedules, and waitlist fill—done-for-you setup in 24–48 hours.”

5) EMAIL #1 (plain text)
Subject options (rotate):
1) quick question about no-shows at {{clinic}}
2) reducing last-minute gaps at {{clinic}}
3) two-way SMS confirmations for {{clinic}}
4) fill cancellations automatically (waitlist)
5) cut no-shows—done-for-you
6) {{first_name}}, reschedules + confirmations

Body:
Hi {{first_name}} — I’m Bob.

We help appointment-based clinics reduce no-shows using two-way SMS confirmations + instant reschedules + a waitlist to fill last-minute gaps. Setup is done-for-you in 24–48 hours.

If you’re open to it, I can show you what this looks like in 15 minutes and estimate recovered revenue for {{clinic}}.

Legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Reply here or email: agent_bob_replit+no-show-bot@agentmail.to

Worth a quick look this week?
— Bob

6) EMAIL #2 (bump, 2 days later)
Subject: Re: no-shows at {{clinic}}
Body:
{{first_name}} — should I speak with you or whoever owns scheduling/confirmations?

If helpful, we can start with 2 numbers: monthly appointments + typical no-show rate, then I’ll estimate what you’re losing and what we can recover.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

7) EMAIL #3 (social proof angle without claims)
Subject: quick demo?
Body:
We’re seeing many clinics tighten confirmations/reschedules because cancellations are up.

If you want, I’ll walk you through:
- two-way confirmations (Y/N)
- auto-reschedule flow
- waitlist fill for last-minute openings
- simple reporting to quantify recovered revenue

15 minutes. If it’s not relevant, I’ll close the loop.
— Bob

8) EMAIL #4 (breakup)
Subject: close the loop
Body:
{{first_name}} — I haven’t heard back. Should I close this out, or is there someone else I should contact?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

9) CALL OPENER (10 seconds)
“Hi {{first_name}}, Bob here. Quick one—do you handle scheduling/confirmations? We help clinics reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Can I ask 2 questions to see if it’s even relevant?”

Qualifying questions:
1) “About how many appointments do you have in a typical month?”
2) “Roughly what % no-show or late-cancel do you see?”
3) “What’s the average value per visit (ballpark)?”
4) “What system do you schedule in?”

Close to demo:
“If we could recover even a handful of visits/week, it usually pays for itself quickly. Want to grab 15 minutes—tomorrow or Thursday?”

10) VOICEMAIL (20 seconds)
“Hi {{first_name}}, Bob. We help clinics reduce no-shows using two-way SMS confirmations + instant reschedules and a waitlist to fill gaps. If you want a 15-minute walkthrough, reply to my email or reach me at agent_bob_replit+no-show-bot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. Thanks.”

11) REPLY LIBRARY (copy/paste)
Positive:
“Great—happy to. Do you prefer a quick 15-min demo Tue/Wed, or Thu/Fri? If you share monthly appt volume + rough no-show rate, I’ll come prepared with an estimate of recovered revenue.”

Price:
“Totally fair. Pricing depends on location count + appointment volume. If you tell me those two numbers, I’ll give you an exact quote after a 10–15 min demo. We aim to be ROI-positive within the first couple weeks based on recovered visits.”

Not now:
“No problem—when is a better month to revisit? If you want, I can send a 2-minute overview link and circle back then.”

Objection (we already have reminders):
“Makes sense—most do. The difference is two-way confirmation (Y/N), automated reschedules, and waitlist fill for gaps. If it’s not better than what you have, you’ll know in 10 minutes.”

Stop:
“Understood—will not reach out again. Thanks for the quick reply.”

This system is designed so you can (1) build/import 200 leads, (2) execute day-1 outreach immediately, and (3) reliably move prospects into Demo Booked with clean CRM tracking.