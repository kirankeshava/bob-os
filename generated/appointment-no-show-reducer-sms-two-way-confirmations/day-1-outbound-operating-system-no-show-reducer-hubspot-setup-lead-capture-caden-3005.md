# Day-1 Outbound Operating System (No-Show Reducer): HubSpot Setup + Lead Capture + Cadence + Scripts + KPI Report

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T22:08:23.982Z

---

## Goal (30-day sprint)
Book 40 demos and close 20–25 locations for: Appointment No-Show Reducer (two-way SMS confirmations + reschedules + waitlist fill + analytics).
Legitimacy URL to include everywhere: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email: agent_bob_replit+no-show-bot@agentmail.to

---

## 1) HubSpot Free CRM: minimum setup (15–25 minutes)
### Pipeline stages (Deals)
1. New Lead (unqualified)
2. Contacted (touch 1–2 sent)
3. Engaged (reply/call connect)
4. Demo Booked
5. Demo Held
6. Trial / Pilot Live (7 days free)
7. Closed Won
8. Closed Lost
9. Nurture / Later

### Required fields (Contacts / Companies)
- First Name
- Last Name
- Job Title (Owner/Practice Manager/Office Manager)
- Email
- Phone
- Company Name
- Website
- City
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/etc.)
- Source (Google Maps / Yelp / Assoc / Craigslist inbound / FB group)
- Appointment volume per month (estimate)
- No-show rate (estimate)
- Value per visit ($)
- Scheduling system (unknown/Zenoti/Mindbody/Calendly/Dentrix/etc.)
- Next step (free text)
- Last touch date

### Deal fields (to quantify ROI)
- Est. monthly appts
- Est. no-show %
- Est. $/visit
- Est. recovered revenue = appts × no-show% × $/visit × expected reduction (use 30% as conservative)

### Daily task queues
Create task filters:
- “Call today” (phone exists, stage Contacted/Engaged)
- “Follow-up today” (Engaged, no reply 48h)
- “Demo booked – prep” (Demo Booked)

---

## 2) Lead capture template (CSV columns)
Copy these column headers into a sheet. Export CSV to import into HubSpot.

Company Name | Website | Vertical | City | State | Address | Main Phone | Contact First | Contact Last | Title | Email | Secondary Phone | Notes (hours, booking link, clues) | Source URL | Last Touch Date | Stage

Dedupe rules:
- Deduplicate by Website domain first.
- If no website, dedupe by Company Name + Phone.

Free lead sources (fastest):
- Google Maps (query: “{city} dentist”, “{city} chiropractic”, “{city} med spa”, “{city} physical therapy”, “{city} optometrist”)
- Yelp category lists
- Professional associations member directories (state dental association, PT clinics, etc.)
- Clinic websites (contact page often has office manager email)

Target initial city clusters:
- Cluster A: 1 major metro + surrounding suburbs
- Cluster B: 1 different metro in same time zone
(Choose where you can call during business hours.)

---

## 3) Day-1 execution schedule (repeat daily)
### Email block (50–100/day)
- 25 emails at 9:00–10:00 local
- 25 emails at 11:30–12:30
- 25 emails at 2:00–3:00
- Optional 25 emails at 4:00–5:00

Rules:
- Plain text, no attachments, no tracking links.
- Personalize 1 line: city + vertical + a specific observation (hours, online booking, multiple locations).
- Always include legitimacy URL + contact email.

### Call block (20–40/day)
- 10–15 calls at 10:00–11:00
- 10–15 calls at 1:00–2:00
- 10 calls at 3:30–4:30

Optional 1:1 text follow-up (only when you have clear opt-in context such as “text us” on website or after a live call). Keep it manual, low volume, and include opt-out language.

### Posting (weekly)
- Craigslist: 1–2 posts/week per city cluster.
- FB Groups: 5–10 value comments/posts/week (no pitch-first; offer a checklist + invite to see demo).

---

## 4) Cold email templates (paste-ready)
### Email #1 (initial)
Subject: quick fix for no-shows at {{Company}}

Hi {{FirstName}} — I’m Bob.

We help appointment-based clinics reduce no-shows using two-way SMS confirmations (patients reply Y/N), instant reschedules, and a waitlist to fill gaps.

If you’re doing even ~{{appts}} appointments/month, a small no-show reduction can mean real recovered revenue.

Open to a 12-minute demo this week? If you reply with your scheduling system (or “not sure”), I’ll tailor it.

Legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Or email me anytime: agent_bob_replit+no-show-bot@agentmail.to

— Bob

### Email #2 (bump, 2 days later)
Subject: {{Company}} — confirm by text?

Hi {{FirstName}}, checking back.

Most clinics already send reminders, but they’re one-way. The lift comes from two-way confirmations + automated reschedules + waitlist fill.

Worth a quick look? I can also estimate recovered revenue if you tell me:
1) appts/month 2) rough no-show % 3) average visit value

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

### Email #3 (permission + close the loop, 4–6 days later)
Subject: should I close the loop?

Hi {{FirstName}} — should I close the loop here, or is reducing no-shows a priority right now?

If it is, I can set you up with a 7-day free pilot (done-for-you in 24–48 hours): two-way confirmations, reschedules, waitlist fill, and simple analytics.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

---

## 5) Cold call script + voicemail
### Opener
“Hi, is this {{FirstName}}? Hey {{FirstName}}, it’s Bob. I’ll be brief—are you the person who owns scheduling / reducing no-shows?”

If yes:
“We help clinics reduce no-shows using two-way SMS confirmations (patients reply Y/N), instant reschedules, and a waitlist to fill gaps. Quick question: about how many appointments do you run in a typical week?”

Qualify:
- “Rough no-show rate?”
- “What’s an average visit worth?”
- “What system do you schedule in (or who handles it)?”

Close for demo:
“Got it. This is usually a 12-minute demo. Want to do today/tomorrow?”

### Voicemail
“Hi {{FirstName}}, Bob here. We reduce no-shows with two-way SMS confirmations plus instant reschedules and waitlist fill. If you want to see it, reply to my email or contact me at agent_bob_replit+no-show-bot@agentmail.to. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Thanks.”

---

## 6) Reply-handling snippets
Positive:
“Great — what scheduling system are you on, and what days/times work for a 12-min demo? Here’s the overview link as well: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

Price objection:
“Totally fair. We can start with a 7-day free pilot so you can see actual no-show reduction and recovered revenue before paying. What’s your appt volume/no-show % roughly?”

Not interested:
“Understood — should I circle back in 90 days, or is this a ‘never’?”

Stop:
“Confirmed — I won’t reach out again. Thank you.”

---

## 7) Daily KPI report (paste into notes)
Date:
- Emails sent:
- Email replies:
- Calls placed:
- Connects:
- Demos booked:
- Demos held:
- Trials started:
- Closed won:
- Closed lost:
Notes: top objection + what copy/cadence change we’ll test tomorrow.

This document is the day-1 operating system: set up HubSpot, capture/import leads, execute email + call blocks daily, log everything, and drive every engaged prospect to a short demo that ends in a 7-day free pilot with done-for-you setup in 24–48 hours.