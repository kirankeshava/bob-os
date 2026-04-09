# Day-1 Outbound Ops: HubSpot Setup + Lead Capture Template + Send/Call SOP + Reply Library (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T07:26:32.185Z

---

Business offer (use in all outreach)
- “We reduce appointment no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”
- Legitimacy URL to include: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Business contact email: agent_bob_replit+no-show-bot@agentmail.to

A) HubSpot Free CRM setup (exact pipeline + fields)
1) Pipeline name: “No-Show Reducer – Outbound”
2) Stages (in order):
   1. New Lead (Not Contacted)
   2. Emailed – Touch 1
   3. Called/Texted – Attempted
   4. Engaged (Replied / Live Connect)
   5. Demo Booked
   6. Demo Held
   7. Closed Won
   8. Closed Lost
   9. Nurture / Follow-up Later
3) Required custom properties (create as contact/company properties):
   - Vertical (Dentist / Chiro / Med Spa / PT / Optometry / Other)
   - City Cluster (e.g., “Phoenix AZ”)
   - Role (Owner / Office Manager / Practice Manager / Front Desk)
   - Scheduling System (Unknown / Dentrix / ChiroTouch / Jane / MindBody / Square / Other)
   - Appts per Week (range)
   - Est No-Show Rate (range)
   - Value per Visit ($)
   - Best Phone (yes/no)
   - SMS Opt-in Mentioned (yes/no)
   - Last Touch Type (Email/Call/Text)
   - Next Step Date
   - Outcome Notes (free text)
4) Minimum logging standard (fast): every touch gets (a) date, (b) channel, (c) 1-line result, (d) next step.

B) Lead capture template (copy/paste into Sheets then import to HubSpot)
Use these columns (in this exact order for easy mapping):
1. Company Name
2. Website
3. Location Address
4. City
5. State
6. Phone
7. Contact First Name
8. Contact Last Name
9. Title/Role
10. Contact Email
11. Vertical
12. City Cluster
13. Source URL (directory listing / Google Maps)
14. Notes (e.g., “Online booking present”, “Mentions missed appt fee”, “Multi-location”) 
15. Status (New / Emailed / Called / Engaged / Demo Booked)

Free sourcing workflow (repeatable):
- Google Maps: search “{city} dentist”, “{city} chiropractor”, “{city} med spa”, “{city} physical therapy”, “{city} optometrist”.
- Open listing → capture phone, site, address.
- On website: look for Contact page (office manager/practice manager email). If none, use general emails (info@, hello@, appointments@).
- Dedupe rule: same phone or same domain = one record.

C) Day-1 outbound execution SOP (daily blocks + volumes)
Goal today: 50–100 emails + 20–40 calls (+ optional compliant texts) + log 100% of activity.

1) Pre-send checklist (10 minutes)
- Use plain-text emails (no images, no links except the legitimacy URL).
- Signature:
  Bob Smith
  Appointment No-Show Reducer
  https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
  agent_bob_replit+no-show-bot@agentmail.to
- Keep to 80–120 words.

2) Email send schedule (example)
- 9:00–10:00am: send 30–40 emails
- 12:00–1:00pm: send 20–30 emails
- 3:30–4:30pm: send 20–30 emails

3) Call blocks (example)
- 10:30–11:30am: 10–15 calls
- 2:00–3:00pm: 10–15 calls
- 4:30–5:30pm: 5–10 calls

4) Text rule (compliance-first)
- Only text if the business publicly lists the number as a mobile/business text line OR you received an inbound reply requesting text.
- Keep to one message + one follow-up maximum.

D) First-touch email templates (rotate 3 variants)
Template 1 (direct)
Subject: quick question about no-shows at {Business}
Hi {FirstName} — I’m Bob. We help appointment-based clinics reduce no-shows using two-way SMS confirmations + instant reschedules + a waitlist fill when someone cancels.

It’s done-for-you and typically set up in 24–48 hours.

Worth a 10-minute call to see if it pencils for {BusinessName}? If helpful, here’s our overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Best person for scheduling + confirmations?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

Template 2 (numbers prompt)
Subject: how many no-shows/week at {Business}?
Hi {FirstName} — quick one: roughly how many no-shows do you see in a normal week?

We reduce them with two-way SMS confirmations (patients confirm/cancel), auto-reschedule links, and a waitlist to backfill gaps. Setup is done-for-you in 24–48 hours.

If you tell me your appts/week + avg value/visit, I’ll estimate recovered revenue. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Open to a quick chat?
— Bob (agent_bob_replit+no-show-bot@agentmail.to)

Template 3 (ops pain)
Subject: reducing last-minute cancels at {Business}
Hi {FirstName} — many {Vertical} offices lose time to last-minute cancels and “forgot” appointments.

We run two-way SMS reminders so patients confirm/cancel, then we automatically offer reschedules and ping a waitlist to fill the slot.

If you handle scheduling ops, I can show you a simple workflow. https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Who should I coordinate with?
— Bob

E) Cold call opener + voicemail
Opener:
“Hi, is this {BusinessName}? — I’m Bob. Quick question: who handles appointment confirmations and no-shows there?”
If gatekeeper: “Totally—what’s the best way to reach them? We help reduce no-shows with two-way SMS confirmations and fast reschedules. Done-for-you setup in 24–48 hours.”
If decision maker:
“We reduce no-shows by sending two-way SMS confirmations so patients confirm/cancel, then we push instant reschedule links and can pull from a waitlist to fill gaps. If I asked you how many no-shows you see weekly, what would you guess?”
Close for demo:
“Open to a 10-minute screen share this week? If it’s not a fit, I’ll tell you in 10 minutes.”

Voicemail:
“Hi {Name}, Bob here. We help clinics reduce no-shows using two-way SMS confirmations plus instant reschedules and waitlist fill. Done-for-you setup in 24–48 hours. You can see a quick overview at https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Reply to agent_bob_replit+no-show-bot@agentmail.to and I’ll send times.”

F) Text message (only where allowed)
“Hi {FirstName} — Bob here. We help {BusinessName} reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Want a 10-min overview this week? https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 (reply YES and I’ll send times)”

G) Reply library (paste-ready)
1) Positive: “Yes, interested”
“Great — what does your schedule look like for a 10-minute overview? If you prefer, tell me (1) appts/week, (2) typical no-show rate, (3) avg value/visit and I’ll estimate recovered revenue first. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 — Bob (agent_bob_replit+no-show-bot@agentmail.to)”

2) Neutral: “Send info”
“Absolutely. Here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Two quick questions so I send the right details: what scheduling system do you use, and roughly how many appointments/week?”

3) Objection: “We already send reminders”
“Makes sense — most do. The difference is two-way confirmation (patients confirm/cancel) + automatic reschedule link + optional waitlist fill to backfill gaps. If you’re open, I can show the workflow in 10 minutes and you can compare it to what you have.”

4) Price ask: “How much?”
“Depends mostly on appointment volume and how many locations. If you share appts/week and avg value/visit, I’ll recommend the cheapest tier that still recovers meaningful revenue. Happy to cover it on a 10-minute call; setup is done-for-you in 24–48 hours.”

5) Not now
“No problem — when would it make sense to revisit? If you tell me your appts/week and no-show rate, I can also send a quick recovered-revenue estimate you can keep on file.”

6) Stop / unsubscribe
“Understood — I won’t reach out again. Thanks for confirming.”

H) Daily KPI report (end of day)
- New leads added:
- Emails sent:
- Calls placed:
- Texts sent (compliant):
- Replies received:
- Live connects:
- Demos booked:
- Demos held:
- Closed won:
- Closed lost:
- Notes on best-performing vertical/city/subject line:

Primary execution rule: distribution beats perfection. If we can’t log it, it didn’t happen.