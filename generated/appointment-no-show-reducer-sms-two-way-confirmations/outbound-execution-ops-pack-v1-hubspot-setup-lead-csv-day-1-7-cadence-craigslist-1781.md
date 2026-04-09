# Outbound Execution Ops Pack v1 (HubSpot Setup + Lead CSV + Day-1–7 Cadence + Craigslist/FB Posts)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T18:07:54.048Z

---

## 1) HubSpot Free CRM Setup (copy/paste checklist)
**Account:** Create HubSpot free using Bob / agent_bob_replit@agentmail.to.

### Pipeline (Deals)
Create 1 pipeline: **No-Show Reducer – Locations**
Stages (in order):
1. New Lead (unworked)
2. Contacted (sent email/called)
3. Engaged (replied / picked up)
4. Demo Booked
5. Demo Held
6. Trial Live (7-day free)
7. Closed Won (Location)
8. Closed Lost

### Required Contact Properties (custom)
Create these custom fields (Contacts):
- **Vertical** (dropdown: Dental, Chiro, Med Spa, PT, Optometry, Other)
- **City Cluster** (text)
- **Scheduling System** (text)
- **Appointment Volume / month** (number)
- **No-show %** (number)
- **Avg value per visit ($)** (number)
- **Decision Maker Role** (dropdown: Owner, Practice Manager, Office Manager, Front Desk, Other)
- **Best Call Window** (text)
- **Do Not Contact** (checkbox)
- **Source** (dropdown: Google Maps, Yelp, Facebook, Craigslist, Referral, Other)

### Views + Task Queues
Create saved views:
- **Today – Call List**: Phone known AND Do Not Contact = false AND (Stage in New Lead/Contacted)
- **Today – Email List**: Email known AND Do Not Contact = false AND Stage = New Lead
- **Needs Follow-up**: Next Step Date <= today

Create tasks:
- “Call Attempt 1/2/3”
- “Send Email 1/2/3”
- “Text Follow-up (only if compliant/opt-in)”

### Logging rule (minimum viable)
Every touch must record:
- Date
- Channel (email/call/text)
- Outcome (no answer/left VM/replied/not interested/booked demo)
- Next step + date


## 2) Lead Capture Template (CSV columns for HubSpot import)
Copy these headers exactly into a spreadsheet (row 1). Export CSV for HubSpot import.

**Company Name, Website, Location Address, City, State, Zip, Phone, General Email, Contact First Name, Contact Last Name, Contact Title, Contact Email, Vertical, City Cluster, Source, Notes, Last Touch Date, Next Step Date, Stage**

### Fast capture rules
- If no direct contact email is visible, use **General Email** from website contact page.
- Put “Unknown” in Contact First/Last if needed; still import.
- **Dedupe:** unique key = (Website OR Phone). If duplicates, keep the one with an email.

### Free sources (no paid tools)
- Google Maps results + business websites (contact page)
- Yelp listing phone/website
- Facebook pages (often list email/phone)
- Local directories (chamber of commerce)


## 3) Day-1 to Day-7 Outbound Cadence (volume + exact actions)
**Daily KPI targets (minimum):**
- 50–100 cold emails/day (plain text)
- 20–40 calls/day
- 5–10 meaningful FB comments/posts/week
- 1–2 Craigslist posts/week per city cluster

### Day 1
- Build/import 60–120 leads.
- Send Email #1 to all with emails.
- Call top 20 (best-looking websites + multi-location + clear appointment booking).
- If live connect: qualify in 3 minutes; book demo.

### Day 2
- Send Email #1 to newly sourced leads.
- Call 20–40 (Attempt 1 for new, Attempt 2 for yesterday).
- Send Email #2 to non-responders from Day 1.

### Day 3
- Repeat lead build (60–120 new).
- Call block first, then email block.
- Email #3 to Day-1 non-responders.

### Days 4–7
- Keep daily sends/calls.
- Only pursue “Engaged” with faster follow-up (same day).
- Move any booked demos immediately to **Demo Booked** and set task reminders.


## 4) Email #1 (plain text, legitimacy URL included)
**Subject options:**
- Quick fix for no-shows at {{Business}}
- Two-way SMS confirmations (reduces no-shows)
- Can I help cut your no-shows?

**Body:**
Hi {{FirstName}} — I’m Bob.

We help appointment-based businesses reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.

If you want to sanity-check we’re legit first, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Quick question: about how many appointments do you run per week, and what % typically no-shows?

If it’s a fit, I can show you the workflow in 10 minutes. Reply here or email me at agent_bob_replit+no-show-bot@agentmail.to.

— Bob


## 5) Cold call opener (15 seconds)
“Hi, is this {{Name}}? I’m Bob — quick one: we help clinics cut no-shows using two-way SMS confirmations and instant reschedules. Who owns scheduling and reminders there — you, or a manager?”

If decision maker: “Roughly how many appointments a week, and what’s your current no-show rate?”
Close: “If I can show you a simple flow that recovers a few visits/week, can we book a 10-minute demo?”


## 6) Craigslist post (template per city cluster)
**Title:** Reduce appointment no-shows (2-way SMS confirmations + instant reschedules)

**Body:**
If you run a clinic/salon/studio with appointments, no-shows quietly drain revenue.

We set up a simple two-way SMS reminder system that:
- Sends smart reminders
- Collects confirmations (Y/N)
- Auto-reschedules cancellations
- Fills gaps from a waitlist
- Tracks recovered revenue per location

**Done-for-you setup in 24–48 hours.**
See our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Reply here or email: agent_bob_replit+no-show-bot@agentmail.to


## 7) FB Group value post (non-spammy)
**Post:**
If you’re seeing last-minute cancels/no-shows: a small change that often helps is switching reminders from “one-way” to **two-way confirmation** (patients text back Y/N). The key is having a quick reschedule path + a waitlist to backfill openings.

If anyone wants, I can share the exact message timing + templates we’re using. (Site for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 | contact: agent_bob_replit+no-show-bot@agentmail.to)

**Comment template:**
“Happy to share the reminder timing we’ve seen work best (and the Y/N wording). What kind of appointments do you run and how far out are you typically booked?”