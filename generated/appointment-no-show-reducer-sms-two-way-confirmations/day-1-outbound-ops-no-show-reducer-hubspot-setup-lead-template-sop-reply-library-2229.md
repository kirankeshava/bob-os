# Day-1 Outbound Ops (No-Show Reducer): HubSpot Setup + Lead Template + SOP + Reply Library

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T20:19:43.317Z

---

Business proof to include in all outreach:
- Website (legitimacy URL): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

1) HubSpot Free CRM — Setup Checklist (do this once)
A. Account
- Create HubSpot Free account with: Bob Smith, agent_bob_replit@agentmail.to
- Connect team inbox/forwarding if available so replies can be handled quickly (if not, log manually).

B. Pipeline stages (Deals pipeline: “No-Show Reducer – Locations”)
1. New Lead (not contacted)
2. Contacted (attempted)
3. Connected (2-way conversation)
4. Demo Booked
5. Demo Held
6. Trial/Setup In Progress (free 7-day)
7. Closed Won (location)
8. Closed Lost
9. Nurture

C. Required properties (minimum viable; keep it fast)
Create custom deal/contact properties as needed:
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City + State
- Location count (1, 2–5, 6+)
- Appointment volume per week (numeric)
- No-show % (estimate)
- Value per visit ($)
- Scheduling system (e.g., Dentrix, Jane, Mindbody, Acuity, Google Calendar, “unknown”)
- Primary scheduling owner (Owner/Office Manager/Front Desk)
- Phone
- Best email
- Last touch date
- Next step (text)
- Objection category (price/timing/permission/already-have-solution/other)

D. Task queues (create 3 repeating task types)
- “Email Touch 1 Sent” (log + set follow-up in 2 biz days)
- “Call Attempt” (same day as email if phone exists)
- “Follow-up / Book Demo” (after any reply)

2) Lead Capture + Import Template (copy/paste columns)
Use this exact column header row in a Sheet/CSV for HubSpot import:
- Company Name
- Website
- City
- State
- Vertical
- Address
- Main Phone
- Contact First Name
- Contact Last Name
- Title (Owner/Office Manager/Front Desk)
- Email
- Source URL (Google Maps/Directory page)
- Notes (e.g., “mentions no-show policy”, “online booking”, etc.)
- Scheduling system (if found)
- Last Touch Date
- Next Step
- Status (New Lead/Contacted/etc.)

Dedupe rules (fast):
- If same Website OR same Main Phone, treat as duplicate.
- Keep the record with a real person email/title vs generic info@.

Free lead sources (no paid tools):
- Google Maps results (business name, phone, site)
- Business website “Contact” page (email)
- Facebook business page (sometimes email)
- Niche directories (state dental association, Chiro directory, PsychologyToday for therapists if expanded)

3) Day-1 Outbound SOP (Daily execution blocks)
Goal: start booking demos immediately. Minimum viable: 50–100 emails/day + 20–40 calls/day.

A. Daily schedule (example)
- 9:00–10:30: Build 40–60 new leads (city cluster A/B)
- 10:30–12:00: Send 50–100 plain-text cold emails (Touch 1)
- 12:00–1:00: Log sends + set tasks (follow-up dates)
- 1:00–3:00: Call block (20–40 calls) + voicemail drop
- 3:00–4:00: Handle replies, book demos, update CRM notes
- 4:00–4:15: KPI tally (sends, replies, demos booked)

B. Sending rules (deliverability + speed)
- Plain text only, no attachments, no tracking links besides the legitimacy URL if needed.
- Keep first email under ~120 words.
- Use real signature with the contact email: agent_bob_replit+no-show-bot@agentmail.to

C. Call + SMS compliance note (keep conservative)
- Prioritize calling business lines during business hours.
- Only text if the number is clearly a business line and you have reason to believe it’s used for business communications; always include opt-out language: “Reply STOP to opt out.”

D. Qualification (fast)
Ask 4 questions in <3 minutes:
1) “About how many appointments per week?”
2) “Rough no-show or late-cancel rate?”
3) “What’s an average visit worth?”
4) “Who owns scheduling changes and reminders today?”
If they have meaningful volume and any no-show pain, book demo.

4) Copy — Touch 1 Cold Email (paste-ready)
Subject options:
- Quick question about no-shows at {{Company}}
- Reducing no-shows (2-way SMS confirmations)
- {{City}} appointment reminders

Body:
Hi {{FirstName}} — I’m Bob.

We help appointment-based locations reduce no-shows using two-way SMS confirmations (patients confirm/cancel), instant reschedules, and waitlist fills to backfill gaps.

If you’re open to it, I can show a 10-minute demo and estimate recovered revenue based on your weekly appointment volume.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Worth a quick look this week?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

5) Call opener + voicemail
Call opener:
“Hi, is this {{FirstName}}? I’m Bob — quick one: do you handle appointment reminders/scheduling? We’re helping practices cut no-shows with two-way SMS confirmations and instant reschedules. If I can show you in 10 minutes and estimate recovered revenue, would you be open to a quick demo?”

Voicemail:
“Hi {{FirstName}}, Bob here. We reduce no-shows with two-way SMS confirmations plus instant reschedules and waitlist fill. If you want, I can walk you through a 10-minute demo. You can reach me at agent_bob_replit+no-show-bot@agentmail.to. Again, agent_bob_replit+no-show-bot@agentmail.to.”

6) SMS (only where appropriate)
“Hi {{FirstName}} — Bob here. We help {{Vertical}} offices reduce no-shows with 2-way SMS confirmations + instant reschedules + waitlist fill. Want a quick 10-min demo? Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 Reply STOP to opt out.”

7) Reply handling library (copy/paste)
A) Positive
“Great — what does your calendar look like tomorrow or Thursday? If you share your weekly appointment volume + typical no-show %, I’ll come to the demo with a recovered-revenue estimate. (Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2) You can also reach me at agent_bob_replit+no-show-bot@agentmail.to.”

B) ‘Send info’
“Absolutely. Here’s the overview link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
If it helps, reply with (1) appts/week and (2) no-show %, and I’ll send a quick recovered-revenue estimate. If it looks meaningful, we can do a 10-min demo.”

C) Already have reminders
“Makes sense. The difference is we do two-way confirmations (confirm/cancel), automate reschedules, and backfill from a waitlist so cancellations turn into filled slots. If you’re open, I can show the flow in 10 minutes and you can compare it to what you have now.”

D) Not interested
“Understood — I won’t follow up. If no-shows become a priority later, you can find the overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 or email me at agent_bob_replit+no-show-bot@agentmail.to.”

E) Price
“We’re doing a free 7-day pilot during launch. The goal is to quantify no-shows prevented and filled gaps per location, then decide if it’s worth keeping. If you share appts/week and typical no-show %, I’ll estimate the upside before we even book time.”

8) Daily KPI snapshot (paste into a doc each day)
Date:
Leads added:
Emails sent:
Calls placed:
Texts sent:
Replies (pos/neutral/neg):
Demos booked:
Demos held:
Trials started:
Closed won (locations):
Notes (what worked / objections / next change):
