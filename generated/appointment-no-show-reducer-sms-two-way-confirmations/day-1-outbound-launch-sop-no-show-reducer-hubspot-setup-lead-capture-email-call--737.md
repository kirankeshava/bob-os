# Day-1 Outbound Launch SOP (No-Show Reducer): HubSpot Setup + Lead Capture + Email/Call/Text + KPI Report + Reply Library

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T09:33:16.167Z

---

Overview
Goal: book demos for appointment-based, multi-location or single-location businesses by offering “two-way SMS confirmations + instant reschedules + waitlist fill,” with done-for-you setup in 24–48 hours.
Legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email to include: agent_bob_replit+no-show-bot@agentmail.to

1) HubSpot Free CRM (setup in ~20 minutes)
Account: create HubSpot free using Bob / agent_bob_replit@agentmail.to.
Pipeline stages (Deals):
1. New Lead (not contacted)
2. Contacted (no reply)
3. Replied – Qualifying
4. Demo Booked
5. Demo Held
6. Trial/Pilot Proposed
7. Closed Won
8. Closed Lost
9. Nurture (future)

Required contact properties (minimum viable):
- First Name
- Last Name
- Business Name
- Role (Owner/Manager/Front Desk)
- Email
- Phone
- Website
- City
- Vertical (Dental/Chiro/Med Spa/PT/Optometry)
- Scheduling system (unknown / NexHealth / Weave / Solutionreach / Vagaro / Mindbody / Jane / Square / other)
- Appointment volume (est.)
- No-show rate (est.)
- Value per visit (est.)
- Last touch date
- Next step (text)
- Status (New/Working/Do Not Contact)

Import columns (CSV header you can paste):
Business Name,Website,Phone,City,State,Vertical,Contact First Name,Contact Last Name,Role,Email,Notes,Source,Status

Task queues (daily):
- Morning Email Sends (50)
- Midday Call Block (20)
- Afternoon Email Sends (50)
- Late Call/Text Block (20)
- Reply Follow-ups (all)

2) Lead Building: 200 leads (free, manual)
Pick 2 city clusters (example): Phoenix AZ + Mesa/Scottsdale; Dallas TX + Plano/Irving.
Pick 5 verticals: dentist, chiropractor, med spa, physical therapy, optometry.

Free sources:
A) Google Maps (primary)
Search queries (copy/paste):
- “dentist Phoenix AZ”
- “chiropractor Phoenix AZ”
- “med spa Phoenix AZ”
- “physical therapy Phoenix AZ”
- “optometrist Phoenix AZ”
Repeat for second city.
Capture: business name, website, phone, city/state. If email is on site, capture it. If no email, capture contact form URL in Notes.

B) Yelp category pages (secondary)
Search “Yelp dentist Phoenix” etc. Capture same fields; prefer businesses with websites listed.

C) Industry directories (optional)
State dental association directories, PT clinic directories, optometry directories.

Dedupe rule:
Dedupe by Website domain OR Phone. Keep the record with an email if available.

3) Day-1 Outreach Targets
- 50–100 cold emails/day (plain text)
- 20–40 calls/day (and follow-up texts only where compliant/appropriate)
- 1 Craigslist post per city cluster (2 total)
- 1–2 FB Group value posts/comments/day (5–10/week)

KPI targets (Day-1):
- Emails sent: 80
- Calls placed: 25
- Positive replies: 2–6
- Demos booked: 1–3

4) Email Sending Rules (deliverability-safe)
- Plain text only, no images, minimal links (use legitimacy URL sparingly; include it in follow-up if cautious)
- Keep it under ~120 words
- Use a real signature: “Bob Smith” + agent_bob_replit+no-show-bot@agentmail.to
- Send in 2 blocks (morning/afternoon) to reduce spam triggers

Email #1 (default)
Subject options:
1) quick question about no-shows
2) two-way confirmations for {{Business}}
3) reducing last-minute cancellations

Body:
Hi {{FirstName}} — Bob here.

Do you have an issue with appointment no-shows or late cancellations at {{Business}}?

We reduce no-shows using two-way SMS confirmations (patients reply Y/N), instant reschedule links, and a waitlist fill to plug gaps. Done-for-you setup in 24–48 hours.

If you’re the right person, can I show you a 10-min demo this week?

— Bob Smith
agent_bob_replit+no-show-bot@agentmail.to
(Info) https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Follow-up #1 (2 days later)
Subject: Re: {{Business}} no-shows
Body:
{{FirstName}}, should I talk to whoever owns scheduling/confirmations?

If you tell me: (1) approx appts/week, (2) typical no-show %, (3) value per visit, I’ll estimate recovered revenue per month.

— Bob

Follow-up #2 (4–5 days later)
Subject: last try — confirmations + reschedules
Body:
If no-shows aren’t a priority, I’ll close the loop.

If they are: we run two-way SMS confirms + automated reschedules + waitlist fill, and you can see recovered revenue in simple analytics.

Want a 10-min walkthrough?
— Bob

5) Cold Call Script (30–45 seconds)
“Hi, is this {{FirstName}}? This is Bob. Quick one—do you handle appointment confirmations/scheduling for {{Business}}?

(If yes)
We help clinics reduce no-shows with two-way SMS confirmations (patients reply yes/no), automatic reschedules, and waitlist fill to plug gaps. We can usually set it up in 24–48 hours. Are no-shows or late cancellations something you’re trying to improve right now?

(If interest)
Great—can we book a 10-minute demo? What’s better, later today or tomorrow?”

Voicemail:
“Hi {{FirstName}}, Bob for {{Business}}—calling because we help reduce no-shows with two-way SMS confirmations and instant reschedules. If you want a quick 10-minute look, reply to my email or call me back. Again, Bob—agent_bob_replit+no-show-bot@agentmail.to.”

6) Optional SMS (only after a call/where appropriate)
“Hi {{FirstName}}—Bob here. I emailed about reducing no-shows at {{Business}} with two-way SMS confirmations + auto reschedules + waitlist fill. Open to a 10-min demo this week?”

7) Qualification (fast)
Ask these 5:
1) About how many appointments per week?
2) Rough no-show / late cancel rate?
3) Average value per visit?
4) Who owns scheduling/confirmations?
5) What system do you use (NexHealth/Weave/Solutionreach/Vagaro/Mindbody/Jane/Square/other)?

If: 50+ appts/week OR high value per visit OR 2+ locations => prioritize.

8) Reply Library (copy/paste)
A) Positive — book demo
“Perfect. Here are two times that work on my side: {{Time1}} or {{Time2}}. Which do you prefer? If easier, tell me your availability and I’ll send a calendar invite. 

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob (agent_bob_replit+no-show-bot@agentmail.to)”

B) Not the right person
“Thanks—who’s best to speak with about scheduling/confirmations? If you can share their email or name, I’ll reach out and won’t bug you again.”

C) Price objection
“Totally fair. If you share approx appointments/week and value per visit, I’ll estimate the recovered revenue so you can see if it’s worth it. Most clinics only need to save a few appointments/month for this to pay for itself.”

D) Already have reminders
“Makes sense—most places do. The difference is two-way confirmation (Y/N), auto-reschedule when someone cancels, and waitlist fill to plug last-minute gaps. Worth a 10-minute compare?”

E) Stop / Do not contact
“Understood—sorry about that. I’ll mark you as do-not-contact. — Bob”

9) Daily KPI Report (paste into notes)
Date:
Emails sent:
Calls placed:
Texts sent:
Replies (total):
Positive replies:
Demos booked:
Demos held:
Closed won:
Key learnings (top objections + which vertical responded):
Next-day adjustments:

10) Craigslist Post (per city cluster)
Title: “Reduce appointment no-shows (two-way SMS confirmations + auto reschedule)”
Body:
“Appointment-based business in {{City}}? We reduce no-shows with two-way SMS confirmations (patients reply Y/N), instant reschedules, and a waitlist fill to plug gaps. Done-for-you setup in 24–48 hours. Reply with your business name + approx appointments/week and we’ll share an estimate of recovered revenue.
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to”

Execution order for Day-1
1) Build 50 leads (City #1, 2 verticals) and send first 40 emails.
2) Call block #1 (10–15 calls) to businesses you emailed.
3) Build next 50 leads and send next 40 emails.
4) Call/text block #2 (10–15).
5) Post Craigslist for both city clusters.
6) Log KPIs and set tasks for follow-ups.
