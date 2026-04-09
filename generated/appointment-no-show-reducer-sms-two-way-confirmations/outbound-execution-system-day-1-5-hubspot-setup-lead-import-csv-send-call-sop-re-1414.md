# Outbound Execution System (Day 1–5): HubSpot Setup + Lead Import CSV + Send/Call SOP + Reply Library

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T15:12:55.579Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email: agent_bob_replit+no-show-bot@agentmail.to

GOAL (30 days): book 40 demos, close 20–25 locations.
Core offer line: “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”

A) HUBSPOT FREE CRM SETUP (15–30 min)
1) Pipeline name: “No-Show Reducer – Outbound”.
2) Deal stages:
   - New Lead (uncontacted)
   - Attempted Contact (touched 1x)
   - Connected (spoke / meaningful reply)
   - Qualified (has volume + pain + decision path)
   - Demo Scheduled
   - Demo Held
   - Proposal/Checkout Sent
   - Closed Won
   - Closed Lost (reason)
   - Nurture (timing)
3) Required contact properties (create custom if needed):
   - Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
   - City / State
   - Role (Owner/Office Manager/Front Desk)
   - Scheduling system (Zocdoc, Mindbody, Dentrix, Jane, Acuity, etc.)
   - Appt volume per week (estimate)
   - No-show rate % (estimate)
   - Value per visit ($)
   - Qualified? (Y/N)
   - Last touch date
   - Next step (call/demo/follow-up)
   - Objection tag (price, not now, already have reminders, no authority)
4) Activity logging rule (speed standard):
   - Every email/call/text = log as an Activity note with outcome tag: {Emailed}, {Called-No Answer}, {Left VM}, {Connected}, {Text Sent}, {Reply-Positive}, {Reply-Negative}, {Booked Demo}.
5) Task queues:
   - “Today: Calls” (20–40)
   - “Today: Follow-ups” (20–50)
   - “Tomorrow: New sends” (50–100)

B) LEAD LIST / CSV IMPORT TEMPLATE (copy these as columns)
Minimum viable CSV columns for HubSpot import:
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
- Source (Google Maps / Yelp / Directory / Website)
- Notes (anything useful: hours, #providers, ‘online booking’, etc.)
- Status (New Lead / Attempted Contact / Connected)

Data capture rules:
- Prefer owner/manager email from the website ‘Contact’ page.
- If no email, capture phone + contact form URL; still import.
- Deduplicate by Website domain + Main Phone.

C) DAY 1–5 OUTBOUND SOP (DAILY BLOCKS)
Daily KPI targets:
- Emails sent: 50–100/day
- Calls placed: 20–40/day
- Meaningful replies: 3–8/day (depends on list quality)
- Demos booked: 1–3/day average

Day 1 (Build + Launch):
1) Build/import first 200 leads into HubSpot.
2) Send 50 plain-text emails (do not add images; keep formatting simple).
3) Call 20 leads after email send (same day).
4) Post 1 Craigslist ad per city cluster (2 ads total).
5) Log KPIs at end of day: sent, calls, connects, replies, demos booked.

Day 2 (Scale gently):
1) Add 50–100 new leads.
2) Send 75–100 emails (mix subject lines).
3) Call 30 leads (prioritize ‘openers’ and best vertical).
4) Follow-up to all Day-1 non-replies with “bump” email.

Day 3 (Follow-up + qualify):
1) Send new 50–75 emails.
2) Call 30–40 (focus: those who opened/replied).
3) Push demo scheduling via short, direct CTA.
4) Add 1–2 FB Group value comments/posts (no pitch first; then DM responders).

Day 4 (Tighten ICP):
1) Review replies; identify best converting vertical/city.
2) Double down on that segment (add 100 leads there).
3) Send 75–100 emails only to that segment.
4) Call 30 and aim to book demos live.

Day 5 (Demo week setup):
1) Confirm next week’s demos via two touches (email + call).
2) Send proposal/checkout link immediately after demos (or right after call if qualified).
3) Gather baseline metrics in every demo: appts/week, no-show %, $/visit.

D) READY-TO-SEND COLD EMAIL (PLAIN TEXT)
Subject options:
1) quick question about missed appointments
2) reducing no-shows at {{Company}}
3) 24–48h setup to cut no-shows
4) waitlist fill for last-minute gaps

Email body (Version A):
Hi {{FirstName}} — quick one.

We help appointment-based businesses reduce no-shows with two-way SMS confirmations (patients reply Y/N), instant reschedules, and a waitlist to fill last-minute gaps. Setup is done-for-you in 24–48 hours.

If you’re open to it, I can show a 10-minute demo and estimate recovered revenue for {{Company}}.

Is the right person for scheduling you, or should I speak with your office manager?

Legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob
agent_bob_replit+no-show-bot@agentmail.to

Bump follow-up (48 hours):
Subject: bump — no-shows at {{Company}}
Hi {{FirstName}}, circling back — worth a quick look if you’re seeing last-minute cancellations/no-shows.

Do you handle reminders/confirmations today, or is that someone else?
— Bob

E) COLD CALL OPENER (20–40/day)
“Hi, is this {{FirstName}}? This is Bob. I’m reaching out because we help clinics reduce no-shows using two-way SMS confirmations and instant reschedules. Takes 24–48 hours to set up. Quick question—about how many appointments do you have in a typical week?”

If they answer:
“Got it. And what would you estimate your no-show rate is—roughly? Even a ballpark is fine.”
Then:
“If we could reduce that by even 20–35% with confirmations + reschedule automation, would it be worth a quick 10-minute demo?”

Voicemail:
“Hi {{FirstName}}, Bob here. We help reduce no-shows with two-way SMS confirmations and quick reschedules. Setup in 24–48 hours. If it’s relevant, call me back or email agent_bob_replit+no-show-bot@agentmail.to. Again, agent_bob_replit+no-show-bot@agentmail.to.”

F) COMPLIANT FOLLOW-UP TEXT (only when appropriate/allowed)
“Hi {{FirstName}} — Bob here. I emailed about two-way SMS confirmations to reduce no-shows + fill gaps from a waitlist. If you’re the right person, happy to share details; if not, who should I contact?”

G) REPLY LIBRARY (COPY/PASTE)
Positive:
“Great — what does your appointment volume/week look like, and roughly what’s your no-show %? If you share $/visit too, I’ll estimate recovered revenue on the demo. Here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
What times work for a 10-minute walkthrough?”

Price question:
“Totally fair. Pricing depends on location count + appointment volume. Most locations cover the fee with 1–2 recovered visits/month. If you share appts/week + $/visit + no-show %, I’ll give you a quick estimate and we can decide if it’s worth continuing.”

Already have reminders:
“Makes sense—many do. The difference is two-way confirmation (Y/N), auto-reschedule flow, and waitlist gap-fill. If you’re open, I can show how it complements what you have and quantify recovered revenue.”

Not now:
“No problem—what month should I circle back? If you tell me your no-show % and appt volume, I can send a 2-line estimate you can keep.”

Stop:
“Understood—confirming I will not contact you again. Wishing you the best.”

H) DAILY KPI REPORT (copy/paste)
Date:
Emails sent:
Calls placed:
Texts sent:
Replies (positive/neutral/negative):
Demos booked:
Demos held:
Checkouts sent:
Closed won (# locations):
Notes (top objections, best vertical/city, list quality):

This system is designed to start booking demos immediately once HubSpot is created and the first 200 leads are imported. Every outreach touch must include either the legitimacy URL or the business email so prospects can verify and respond.
