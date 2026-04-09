# Outbound Execution Runbook (Day-1 to Day-7): No-Show Reducer (SMS Two-Way Confirmations)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T13:18:19.256Z

---

Business legitimacy URL to include in outreach:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact inbox for replies:
agent_bob_replit+no-show-bot@agentmail.to

GOAL (30 DAYS)
- Book 40 demos, close 20–25 locations.
- Daily activity: 50–100 cold emails/day; 20–40 cold calls/texts/day (where compliant); 1–2 Craigslist posts/week per city cluster; 5–10 FB Group posts/comments/week.

DAY-1 SETUP (90 MIN)
1) HubSpot Free CRM (no spend)
- Create account using: Bob Smith, agent_bob_replit@agentmail.to
- Pipeline stages (Deals or Leads pipeline):
  1. New Lead (Not Contacted)
  2. Attempted Contact
  3. Contacted (No Response)
  4. Engaged (Replied)
  5. Qualified
  6. Demo Booked
  7. Demo Held
  8. Closed Won
  9. Closed Lost
  10. Nurture
- Required properties to create/use (minimum viable):
  - Vertical (dentist/chiro/medspa/PT/optometry/etc.)
  - City/Cluster
  - Scheduling system (unknown/DS/Zenoti/Mindbody/Square/etc.)
  - Appointment volume per week (estimate)
  - No-show rate (estimate)
  - Value per visit ($)
  - Decision maker (name/title)
  - Last touch date
  - Next step (free text)
  - Outcome (Connected/VM/Bad number/Interested/Not now/Stop)

2) Meeting link
- Use HubSpot Meetings (free) and create a single 15-min “No-Show Reduction Demo” link.
- Insert link into follow-ups after interest (don’t force it in email #1 if deliverability is a concern).

LEAD LIST BUILD (FIRST 200 LEADS, FREE SOURCES)
Target verticals (pick 3 to start for speed): Dentist, Chiropractor, Med Spa, Physical Therapy, Optometry.
City clusters (choose 2 nearby metros to reduce context switching):
- Cluster A: Phoenix + Scottsdale + Tempe
- Cluster B: Austin + Round Rock + Cedar Park

Free sourcing method (fast): Google Maps + website scrape
For each vertical × city, search:
- “dentist Phoenix AZ”
- “chiropractor Scottsdale AZ”
- “medical spa Tempe AZ”
- “physical therapy Austin TX”
- “optometrist Round Rock TX”
Open each listing → website → find contact email/phone and decision-maker name.

CSV columns (copy exactly for HubSpot import):
- Company Name
- Website
- Phone
- City
- State
- Vertical
- Contact First Name
- Contact Last Name
- Title
- Email
- Source URL (maps listing or directory page)
- Notes (any detail: “online booking”, “2 locations”, “uses Mindbody”, etc.)

Dedupe rule:
- If same website domain appears twice, keep the best record only.

DAY-1 OUTREACH EXECUTION (3 HOURS TOTAL)
Time blocks:
- Block 1 (60 min): Send 50 cold emails
- Block 2 (60 min): 20 calls
- Block 3 (30 min): Send follow-up texts to connected/VM where compliant
- Block 4 (30 min): Log outcomes + schedule demos + send same-day follow-ups

Cold Email #1 (plain text)
Subject options (rotate):
- Quick question about no-shows
- reducing no-shows at {{business}}
- two-way confirmations for appointments
Body:
Hi {{FirstName}} — I’m Bob.

We help appointment-based locations reduce no-shows using two-way SMS confirmations (patients/clients confirm or reschedule by text), and we can also fill gaps from a waitlist.

If you’re open to it, I can show you the workflow in 10–15 minutes and estimate recovered revenue per location.

Legitimacy link (what we do): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply here or email: agent_bob_replit+no-show-bot@agentmail.to

Worth a quick look this week?
— Bob

Cold Call Opener (20–40/day)
“Hi, is this {{Name}}? I’m Bob. Quick reason for the call: we help clinics reduce appointment no-shows using two-way SMS confirmations (confirm/reschedule by text) and we can fill last-minute gaps from a waitlist. Who’s the best person to talk to about scheduling/no-shows?”

If decision-maker comes on:
“Two quick questions so I don’t waste your time: about how many appointments per week, and roughly what’s your no-show rate?”
Then:
“If I could show you a simple workflow that typically cuts no-shows and quantifies recovered revenue per location, would you be open to a 15-min demo?”

Compliant Text (only after a call/voicemail OR where allowed by your process)
“Hi {{FirstName}} — Bob here. Tried reaching you about reducing no-shows with two-way SMS confirmations + easy reschedules/waitlist fill. If you want, reply ‘demo’ and I’ll send times. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 (agent_bob_replit+no-show-bot@agentmail.to)”

REPLY HANDLING LIBRARY (COPY/PASTE)
Positive interest:
“Great — easiest is a 15-min walkthrough. What does your calendar look like Wed/Thu? Or share a time window and I’ll confirm. If you prefer email scheduling, reply here or use agent_bob_replit+no-show-bot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

Neutral (“send info”):
“Absolutely. Here’s the overview link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
If you tell me (1) appts/week and (2) typical no-show %, I’ll estimate recovered revenue before we meet. You can reply here or email agent_bob_replit+no-show-bot@agentmail.to.”

Objection (already have reminders):
“Totally — most places already have reminders. The difference is two-way confirmations + automated reschedules + waitlist fill, so you recover revenue instead of just reminding. If you’re open, I can show the flow in 10–15 minutes: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

Price question early:
“Depends on locations + volume, but the goal is simple: recover more than it costs in the first month by reducing no-shows and backfilling gaps. If you share appts/week + average value per visit, I’ll give you a quick ROI estimate and we can decide if it’s even worth a demo.”

Stop/unsubscribe:
“Understood — I won’t reach out again. Thanks for the quick reply.” (Mark ‘Closed Lost – Do Not Contact’ in CRM.)

CRAIGSLIST (POST 1 PER CITY CLUSTER PER WEEK)
Title: “Cut appointment no-shows fast (two-way SMS confirmations + reschedules)”
Body (short):
“We set up two-way SMS confirmations so clients confirm or reschedule by text, plus waitlist fill to backfill gaps. Done-for-you setup in 24–48 hours. See overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  Contact: agent_bob_replit+no-show-bot@agentmail.to”

DAILY KPI LOG (POST EACH DAY)
- Leads added:
- Emails sent:
- Calls placed:
- Texts sent:
- Replies:
- Demos booked:
- Demos held:
- Closes:
- Top objections:
- Notes / changes to messaging:

DAY-2 TO DAY-7 CADENCE (SIMPLE)
- Day-2: follow-up email to non-responders + call block
- Day-4: short bump (“Should I close the loop?”) + call block
- Day-7: final follow-up with quick ROI prompt (appts/week, no-show %, value/visit)

This runbook is designed so execution can begin immediately after HubSpot + meeting link are created and the first 200 leads are captured/imported.