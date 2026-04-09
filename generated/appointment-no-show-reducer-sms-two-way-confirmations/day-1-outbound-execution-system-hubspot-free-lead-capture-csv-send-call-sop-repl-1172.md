# Day-1 Outbound Execution System (HubSpot Free + Lead Capture CSV + Send/Call SOP + Reply Library)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T13:07:51.505Z

---

Overview
Goal: start booking demos immediately for the Appointment No-Show Reducer (two-way SMS confirmations + reschedules + waitlist fill). Use this legitimacy URL in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Primary reply inbox: agent_bob_replit+no-show-bot@agentmail.to

A) HubSpot Free CRM Setup (15–45 min)
1) Create account: HubSpot (free). User: Bob Smith. Email: agent_bob_replit@agentmail.to
2) Pipeline stages (Deals pipeline recommended; alternatively use Contacts + Tasks):
   - New Lead (unworked)
   - Contacted (attempted)
   - Replied (needs response)
   - Qualified (fit confirmed)
   - Demo Booked
   - Demo Held
   - Closed Won
   - Closed Lost
   - Nurture (later)
3) Required properties (create as custom fields if needed):
   - Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
   - City
   - State
   - Contact Role (Owner/GM/Office Manager/Front Desk)
   - Scheduling Software (unknown/other)
   - Est. Appointments per week (number)
   - Est. No-show rate % (number)
   - Value per visit ($)
   - Current reminder method (none/email/SMS/manual/other)
   - Next step (text)
   - Last touch date
   - Outcome (No answer/Left VM/Interested/Not now/Not a fit/Do not contact)
4) Task queues: create queues for “Call Block AM” and “Call Block PM” and “Email Follow-ups”.

B) Lead Capture Template (CSV Columns)
Create a spreadsheet with these exact columns (copy/paste header row):
Business Name,Website,Phone,General Email,Owner/Manager Name,Owner/Manager Email,Role,Vertical,City,State,Address,Google Maps URL,Notes (hours/booking link/etc.),Source,Status,Last Touch Date,Next Step

Formatting rules:
- One business per row.
- Use general email if no direct contact is available; capture phones always.
- Put “Owner/Manager Email” = blank if unknown; still import and call.
- Keep Status values standardized: New Lead / Contacted / Replied / Qualified / Demo Booked / Demo Held / Closed Won / Closed Lost / Nurture.

C) Free Lead Sourcing (build first 200 leads today)
Pick 2 city clusters to start (example: Phoenix AZ + Scottsdale AZ; or Austin TX + Round Rock TX). For each city, pull 20 leads per vertical × 5 verticals = 100/city cluster.
Free sources:
- Google Maps (best): search queries:
  1) “dentist + {city}”
  2) “chiropractor + {city}”
  3) “med spa + {city}” or “medical spa + {city}”
  4) “physical therapy + {city}”
  5) “optometrist + {city}”
- Yelp category pages (backup)
- Local associations directories (dental society, chiropractic association)
Process per lead (2–4 minutes each):
1) Capture business name, phone, website, address.
2) Open website → find Contact/About → capture email(s) and any office manager name.
3) Add notes: “online booking?”, “hours”, “multiple locations?”
4) Paste Google Maps URL for fast calling context.

D) Day-1 Send Plan (50–100 emails)
Send window: 9:15–11:30am local time (primary) and 1:30–3:30pm (secondary). Keep emails plain text.
Volume ramp (if deliverability is uncertain): start 40–60/day for 2 days, then 80–100/day.

Email Template #1 (owner/manager)
Subject: quick fix for no-shows at {{Business}}
Body:
Hi {{Name}} — Bob here.

We help appointment-based clinics reduce no-shows using two-way SMS confirmations (patients confirm/cancel by text), instant reschedules, and waitlist fill for last-minute gaps.

If you’re open to it, I can show you a 10-minute walkthrough and estimate recovered revenue for {{Business}}.
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Worth a quick demo this week?
—Bob
agent_bob_replit+no-show-bot@agentmail.to

Email Template #2 (front desk/office manager)
Subject: reduce last-minute cancels/no-shows?
Body:
Hi {{Name}} — I’m Bob.

We reduce no-shows with two-way SMS confirmations + auto-reschedules + waitlist fill. Setup is done-for-you in 24–48 hours.

Who’s the right person to talk to about scheduling and reminders at {{Business}}?
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
—Bob (agent_bob_replit+no-show-bot@agentmail.to)

Follow-up (48 hours later)
Subject: Re: no-shows at {{Business}}
Body:
Checking back — if you tell me roughly (1) appts/week and (2) typical no-show %, I’ll reply with a quick recovered-revenue estimate.
—Bob

E) Call Block SOP (20–40 calls/day)
Two daily blocks:
- 11:30am–12:30pm: 10–20 calls
- 4:00pm–5:30pm: 10–20 calls
Opening:
“Hi — is this the person who handles scheduling/reminders? I’m Bob. We help clinics reduce no-shows using two-way SMS confirmations and quick rescheduling. Can I ask 2 quick questions to see if it’s relevant?”
Qualifiers:
1) “About how many appointments do you have in a typical week?”
2) “What % no-show or late cancels do you usually see?”
3) “Do you remind by text today, or mainly calls/emails?”
If fit:
“Got it. We typically recover several visits/month per location. I can show you in 10 minutes and give a conservative estimate. What’s better, tomorrow morning or Thursday afternoon?”
Voicemail:
“Hi this is Bob — we reduce no-shows with two-way SMS confirmations and instant reschedules. Quick 10-minute demo. You can reach me at agent_bob_replit+no-show-bot@agentmail.to. Again, agent_bob_replit+no-show-bot@agentmail.to.”

F) SMS (only where compliant and as a follow-up to a call / existing public business number)
“Hi {{Name}}, Bob here — tried reaching you re: reducing no-shows with two-way SMS confirmations + auto-reschedules. Worth a 10-min demo? Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  Reply STOP to opt out.”

G) Reply Library (copy/paste)
1) Positive / book demo:
“Perfect — what does your calendar look like Wed/Thu? If you share 2 times, I’ll send an invite. (If easier, reply with appts/week + no-show % and I’ll include a recovered-revenue estimate.)”
2) “Who are you?”
“Totally fair. We’re a small tool that reduces no-shows for appointment-based locations via two-way SMS confirmations + instant reschedules + waitlist fill. Quick overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  Happy to do a 10-min demo.”
3) Price question:
“Depends on location volume, but it’s typically far less than the value of 1–2 recovered visits/month. If you share appts/week + typical no-show %, I’ll quote accurately and show ROI on a short demo.”
4) Already have reminders:
“Makes sense — most places do. The difference is two-way confirmations (confirm/cancel by text), automatic reschedules, and waitlist fill to backfill gaps. If you want, we can benchmark your current reminder flow and see if there’s incremental lift.”
5) Not interested:
“No worries — thanks for the quick reply. If it becomes a priority later, you can reach me at agent_bob_replit+no-show-bot@agentmail.to.”
6) Stop:
“Understood — I won’t reach out again. (Removed.)”

H) Daily KPI Report (paste into notes)
Date:
Leads added:
Emails sent:
Calls placed:
Texts sent:
Replies:
Demos booked:
Demos held:
Closes:
Top objections:
What to change tomorrow:

Minimum viable rule: If it’s not logged in HubSpot (Status + Last Touch Date + Next Step), it didn’t happen.
