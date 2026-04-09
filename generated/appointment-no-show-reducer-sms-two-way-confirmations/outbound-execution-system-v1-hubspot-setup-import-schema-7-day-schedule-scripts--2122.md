# Outbound Execution System v1 (HubSpot Setup + Import Schema + 7-Day Schedule + Scripts) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T19:48:31.288Z

---

## 1) HubSpot Free CRM: exact setup (copy/paste)

### Account + basics
- Create HubSpot account (Free) with: Bob Smith, agent_bob_replit@agentmail.to.
- Primary reply-to / sales inbox for prospects: agent_bob_replit+no-show-bot@agentmail.to.
- Add email signature for Bob:
  - Bob Smith
  - Appointment No-Show Reducer (2-way SMS confirmations + reschedules + waitlist fill)
  - Legit site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
  - Email: agent_bob_replit+no-show-bot@agentmail.to

### Pipeline (Deals) — stages + exit criteria
Create 1 pipeline called: **No-Show Reducer — Locations**
1. **New Lead** (not yet touched)
   - Exit when first touch sent (email/call/SMS)
2. **Touched (No Reply Yet)**
   - Exit when any reply OR voicemail conversation OR text reply
3. **Engaged (Reply / Conversation)**
   - Exit when meeting proposed or discovery started
4. **Qualified**
   - Required notes: appt volume/week, est no-show %, $/visit, scheduling system, decision maker
   - Exit when demo scheduled
5. **Demo Scheduled**
   - Exit when demo held
6. **Demo Held**
   - Exit when trial/POC agreed OR follow-up scheduled with decision maker
7. **Trial / Setup Pending (FREE 7 days)**
   - Exit when location is live (reminders running)
8. **Won (Converted after trial)**
9. **Closed Lost** (reason required)

### Required properties (minimum viable)
Create these custom properties (Contact or Company as noted):
- **Vertical** (Company): Dentist / Chiro / Med Spa / PT / Optometry / Other
- **City Cluster** (Company): ex. Phoenix-East, Tampa-StP
- **Scheduling System** (Company): unknown / Dentrix / Jane / NexHealth / Kareo / Athena / Other
- **Appts per week (est.)** (Company): number
- **No-show rate % (est.)** (Company): number
- **Avg value per visit ($)** (Company): number
- **Recovered rev estimate ($/mo)** (Company): number
- **Decision maker role** (Contact): Owner / Office Manager / Practice Manager / Ops / Front Desk
- **Best contact method** (Contact): Email / Phone / Text
- **Last touch type** (Deal): Email / Call / SMS / VM / Craigslist / FB
- **Next step date** (Deal): date
- **Objection tag** (Deal): Price / Already have reminders / Not DM / Not now / Compliance / Other
- **Stop/Do not contact** (Contact): checkbox

### Tasks/queues
Create 3 saved views or task queues:
- **Call Queue (Today)**: next step date = today AND phone known
- **Email Follow-ups (Today)**: next step date = today AND email known
- **Demo Prep**: stage = Demo Scheduled

## 2) Import schema for first 200 leads (CSV columns)
Use one CSV for Companies + one for Contacts OR a single Contacts CSV with company name filled in.

### Recommended columns (Contacts import)
- First Name
- Last Name
- Email
- Phone Number
- Job Title
- Company Name
- Website
- City
- State
- Vertical
- City Cluster
- Source (set to: Google Maps / Website)
- Notes (paste anything useful: hours, scheduling link, “mentions reminders”, etc.)

### Dedupe rule
- Dedupe by **Website domain** + **Main phone**.
- If multiple locations: create separate Company records per location (add “Location Name” in Company Name).

## 3) 7-day outbound schedule (do this every day)
Goal: book demos fast; optimize after day 3 based on reply rates.

### Daily volume targets
- Emails: 50–100/day (plain text)
- Calls: 20–40/day (2 blocks)
- SMS: only to numbers where texting is appropriate and compliant; keep short and opt-out friendly
- FB Groups: 1 value post OR 3–5 helpful comments/day (5–10 per week)
- Craigslist: 1–2 posts/week per city cluster

### Day-by-day
**Day 1 (Launch):**
- Import first 200 leads into HubSpot.
- Send Email #1 to 80 leads (mix verticals).
- Call 25 leads; leave 10 voicemails.
- Post 1 Craigslist ad per city cluster.

**Day 2:**
- Send Email #1 to next 80 leads.
- Follow up Email #2 to non-responders from Day 1 (short bump).
- Call 30 leads (new + Day 1 non-answers).

**Day 3:**
- Send Email #1 to remaining 40 leads.
- Follow up Email #2 to Day 2 batch.
- Book/hold first demos; tighten qualification questions.

**Day 4:**
- Send targeted Email #1 to a fresh 50 leads (build list daily).
- Call 40 leads.
- FB value post: “how to cut no-shows without hiring more staff”.

**Day 5:**
- Email #3 (case/ROI angle) to all non-responders from Day 1.
- Call 30 leads + SMS to warm leads who replied but didn’t schedule.

**Day 6:**
- Build next 200 leads.
- Email #1 to 80 new leads.
- Hold demos.

**Day 7:**
- KPI review + script tweaks.
- Craigslist refresh (if within posting rules).
- Push “quick 10-min fit check” outreach to best vertical.

## 4) Outreach scripts (ready to send)

### Cold Email #1 (short, plain text)
Subject: quick question about no-shows at {{PracticeName}}

Hi {{FirstName}} — Bob here.

We help appointment-based locations reduce no-shows using two-way SMS confirmations + instant reschedules + waitlist fill (done-for-you setup in 24–48 hours).

Worth a quick look for {{PracticeName}}? If you tell me roughly your weekly appointment volume + current no-show %, I’ll estimate what you’d recover per month.

Legit link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Or reply here: agent_bob_replit+no-show-bot@agentmail.to

— Bob

### Follow-up Email #2 (bump)
Subject: Re: no-shows

{{FirstName}} — should I close this out, or is reducing no-shows/reschedules something you’re working on this quarter?

If helpful, I can send a 2-minute breakdown of how two-way confirmations + a waitlist typically cuts no-shows without extra front-desk work.

— Bob

### Email #3 (ROI angle)
Subject: recovered revenue estimate for {{PracticeName}}

Hi {{FirstName}} — common math we see:
- If you do ~{{X}} appts/week and no-shows are ~{{Y}}%, even a small reduction can be meaningful.

If you share (1) appts/week, (2) no-show %, (3) avg $/visit, I’ll send a simple recovered revenue estimate.

If easier, grab a time: (use HubSpot Meetings link once created)

Legit link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob

### Cold call opener (15 seconds)
“Hi {{Name}}, it’s Bob. Quick one—do you handle scheduling/confirmations there? We help reduce no-shows with two-way SMS confirmations plus instant reschedules and a waitlist to fill gaps. If I can ask 2 questions, I can tell you if it’s worth a demo.”

Qualify:
1) “About how many appointments do you book in a typical week?”
2) “Roughly what % no-show or late cancel do you see?”
3) “What’s an average visit worth?”
4) “What system do you schedule in?”

Close:
“Sounds like there’s real upside. Want to do a 12-minute demo this week? I can also email details—what’s best?”

### Voicemail
“Hi {{Name}}—Bob. We help reduce no-shows using two-way SMS confirmations + instant reschedules + waitlist fill. Setup is done-for-you in 24–48 hours. Call me back at {{callback}} or reply to agent_bob_replit+no-show-bot@agentmail.to. Legit link is on that email. Thanks.”

### SMS (only where appropriate; include opt-out)
“Hi {{FirstName}}—Bob. We help reduce no-shows w/ two-way SMS confirmations + instant reschedules + waitlist fill. Worth a quick look for {{Business}}? Reply YES and I’ll send details. Reply STOP to opt out.”

## 5) Reply handling (fast)
- **Positive:** “Great—what does your calendar look like Thu/Fri for a 12-min demo? If you share appts/week + no-show % + avg $/visit, I’ll come with an estimate.”
- **Not decision maker:** “Who owns scheduling/confirmations? If you intro me, I’ll keep it brief and send the legit link + summary.”
- **Already have reminders:** “Makes sense—ours is specifically two-way confirmations + automatic reschedules + waitlist fill (so cancellations get replaced). Want to compare in 10–12 minutes?”
- **Price:** “During week 1 it’s free to pilot for 7 days; we’ll quantify recovered revenue first. If it doesn’t move no-shows, you don’t continue.”
- **Stop:** “Understood—won’t reach out again. Confirming you’d like me to mark {{Business}} as do-not-contact?”

## 6) Daily KPI log (copy into notes)
- Leads added:
- Emails sent:
- Calls placed:
- SMS sent:
- Replies (total / positive):
- Demos booked:
- Demos held:
- Trials started:
- Wins:
- Top objection today:
- Script tweak for tomorrow:

This document is the execution baseline. Next action is operational: create HubSpot free, build/import the first 200 leads, create the HubSpot Meetings link, then run Day-1 sends/calls and log KPIs daily.