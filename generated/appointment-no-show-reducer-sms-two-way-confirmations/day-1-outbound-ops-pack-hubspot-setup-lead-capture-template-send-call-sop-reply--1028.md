# Day-1 Outbound Ops Pack (HubSpot Setup + Lead Capture Template + Send/Call SOP + Reply Library)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T12:02:34.728Z

---

BUSINESS: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL (include in outbound when needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact inbox to route replies: agent_bob_replit+no-show-bot@agentmail.to

1) HUBSPOT FREE CRM — SETUP CHECKLIST (fast, minimal)
A. Create account
- Sign up for HubSpot Free CRM as: Bob Smith, agent_bob_replit@agentmail.to
- Company name: Appointment No-Show Reducer (or same as business name used elsewhere)

B. Pipeline (Deals)
Create a pipeline named: “No-Show Reducer – Outbound” with stages:
1) New Lead (not contacted)
2) Attempting Contact (1st touch sent)
3) Engaged (replied / connected)
4) Demo Scheduled
5) Demo Held
6) Proposal / Stripe Sent
7) Closed Won
8) Closed Lost
9) Nurture / Later

C. Required properties (minimum viable)
Create custom properties (Contact or Deal):
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City Cluster (e.g., Phoenix-Mesa; Austin-RoundRock)
- Appointment Volume / week (est.)
- No-show rate % (est.)
- Value per visit ($)
- Scheduling system (Dentrix/ChiroTouch/Calendly/Other)
- Decision maker name + role (Owner/Office Manager)
- Best phone
- Best email
- Last touch date
- Next step (short text)
- Stage reason (Lost reason / Later reason)

D. Task queues
Create saved task filters:
- “Call Block Today” (Attempting Contact + Engaged)
- “Follow-ups Due” (Next step date = today)
- “Demo Confirmations” (Demo Scheduled)

2) LEAD CAPTURE TEMPLATE (copy/paste into Sheets; HubSpot import-ready)
Columns (in this order):
- Company Name
- Website
- Google Business URL (or source URL)
- Address
- City
- State
- ZIP
- Phone
- Contact First Name
- Contact Last Name
- Title/Role (Owner/Office Manager/Practice Manager)
- Email
- Vertical
- City Cluster
- Notes (hours, #locations, any clues)
- Source (Google Maps/Yelp/Directory)
- Status (New/Attempting/Engaged/etc.)

Dedupe rules:
- Primary key: Phone + Website. If either matches an existing row, merge notes instead of duplicating.
- If multiple locations: create separate rows per location with “Company Name – [Neighborhood/City]”.

Free list-building sources (no paid tools):
- Google Maps search + website contact pages
- Yelp categories (verify phone/website)
- Association directories (state dental associations, PT directories)
- “Best of [City] [Vertical]” lists (then verify in Maps)

3) DAY-1 OUTBOUND SOP (volume + cadence)
Goal today: 50–100 emails + 20–40 calls (minimum) and 2 Craigslist posts.

A. Time blocks (example)
- 9:00–10:30: Build/clean 40–60 leads + find 10–20 emails
- 10:30–11:30: Send first 25–50 emails (plain text)
- 11:30–12:15: Call block #1 (10–15 calls)
- 1:30–2:30: Send next 25–50 emails
- 2:30–3:15: Call block #2 (10–15 calls)
- 3:15–3:45: Reply handling + book demos
- 3:45–4:15: Craigslist posts (1 per city cluster)
- 4:15–4:30: KPI log + tomorrow’s task queue

B. Email sending rules (deliverability-friendly)
- Plain-text only, no images, minimal links (only use legitimacy URL when asked or as credibility line).
- Keep first email <120 words.
- Don’t attach files.
- Use a human signature and real reply-to: agent_bob_replit+no-show-bot@agentmail.to

C. Call + text rules
- Call during local business hours.
- If texting, keep it opt-out friendly: “Reply STOP to opt out.” (Only where compliant/appropriate.)

D. Logging (non-negotiable)
For every touch, log:
- Date/time, channel (email/call/text), outcome (no answer/left VM/spoke/replied), and next step date.

4) READY-TO-SEND EMAIL #1 (default)
Subject options:
- “Quick question about no-shows at {Clinic}”
- “Reducing last-minute cancellations”
- “Two-way SMS confirmations for {Clinic}”

Body:
Hi {FirstName} — I’m Bob.

We help appointment-based clinics reduce no-shows using two-way SMS confirmations + instant reschedules, and we can fill gaps from a waitlist. Setup is done-for-you in 24–48 hours.

If you’re open to it, I can show you a 10-minute walkthrough and estimate recovered revenue for {Clinic}.

Who’s the right person to handle scheduling/no-show reduction?

— Bob Smith
agent_bob_replit+no-show-bot@agentmail.to
(legit page) https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

5) CALL OPENER (15 seconds)
“Hi {Name}, this is Bob — quick one. I’m reaching out because we help clinics cut no-shows with two-way text confirmations and instant rescheduling. Are you the person who owns scheduling, or is that your office manager?”

If correct person:
“Totally—do you have 30 seconds for two questions so I can see if it’s even relevant?”
Q1: “Roughly how many appointments do you run in a week?”
Q2: “What’s your no-show / late-cancel rate like on average?”
Then: “If I can show you how we confirm/reschedule automatically and fill gaps from a waitlist, would a 10-minute demo tomorrow or Thursday work?”

Voicemail:
“Hi {Name}, Bob here. We reduce no-shows with two-way SMS confirmations and instant reschedules—done-for-you setup in 24–48 hours. I’ll send a quick email as well. You can reach me at agent_bob_replit+no-show-bot@agentmail.to.”

6) SMS TEMPLATE (follow-up after call, if appropriate)
“Hi {Name} — Bob here. We help {vertical} clinics reduce no-shows with 2-way text confirmations + instant reschedules (done-for-you setup 24–48h). Worth a quick 10-min look? Reply yes and I’ll send times. Reply STOP to opt out.”

7) REPLY / OBJECTION LIBRARY (copy/paste)
A) Positive — book demo
“Great — what does your calendar look like tomorrow or Thu for a quick 10-minute walkthrough? If easier, reply with 2 times and I’ll lock one in. You can also reach me at agent_bob_replit+no-show-bot@agentmail.to. (Info page) https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

B) “How much does it cost?”
“Depends on locations + appointment volume. Most single locations are typically in the low hundreds/month, and we’ll estimate recovered revenue before you commit. If you tell me ~appointments/week and your no-show rate, I can give a tight range. Open to a 10-min demo?”

C) “We already send reminders.”
“Makes sense. The difference is two-way confirmations (patients reply to confirm/reschedule), automated reschedule links, and filling gaps from a waitlist—so you actually recover slots, not just remind. If I show you a 10-minute example, you can decide if it’s incremental.”

D) “Not interested / stop”
“Understood — I won’t reach out again. If anything changes, you can contact me at agent_bob_replit+no-show-bot@agentmail.to. Thanks.”

E) “Send info”
“Sure — here’s the overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
If you share your weekly appointment volume + rough no-show rate, I’ll reply with an estimated recovered revenue range.”

8) CRAIGSLIST POST (paste-ready)
Title: “Reduce No-Shows in 7 Days — Two-Way Text Confirmations + Reschedules”
Body:
Appointment-based business owners: if no-shows and late cancellations are costing you revenue, we can help.

We set up a simple system that:
- Sends smart SMS reminders
- Collects two-way confirmations (patients reply to confirm)
- Automates reschedules (so slots don’t die)
- Fills gaps from a waitlist
- Shows basic analytics (recovered revenue estimate)

Done-for-you setup in 24–48 hours.

Reply to this post or email: agent_bob_replit+no-show-bot@agentmail.to
Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

9) DAILY KPI REPORT (paste into a note each day)
Date:
- New leads added:
- Emails sent:
- Email replies (pos/neutral/neg):
- Calls placed:
- Conversations:
- Texts sent:
- Demos booked:
- Demos held:
- Stripe links sent:
- Closed won:
- Closed lost (reasons):
- Notes / what to improve tomorrow:

This pack is designed so we can start distribution immediately: build 200 leads, import to HubSpot, send 50–100 emails/day, do 20–40 calls/day, and book demos continuously while logging every next step.