# Lead Sourcing Engine + Outreach Pack (Dental/Ortho No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:26:35.602Z

---

# 1) Lead List Schema (Copy into Google Sheets)
Create a Google Sheet with these columns (in order). Required fields marked (R).

1. Lead ID (R) – e.g., DENT-001
2. Practice Name (R)
3. Vertical (R) – Dental / Ortho
4. Location Count – 1 / 2–5 / 6+
5. Street Address
6. City (R)
7. State/Province (R)
8. ZIP/Postal
9. Country (R)
10. Main Phone (R)
11. Website URL (R)
12. Booking Method – Phone-only / Online request / Online instant booking
13. Booking Link URL (if any)
14. Practice Management / Booking Vendor (if visible) – Dentrix, OpenDental, NexHealth, Solutionreach, Weave, etc.
15. Decision Maker Name – Owner/Doctor/Partner/Practice Manager
16. Decision Maker Title – Owner DDS / Office Manager / Practice Manager
17. Email 1 (R when found) – Decision maker preferred
18. Email Source – Website contact page / Team page / Footer / Directory
19. Email Confidence – High (named person) / Medium (office@) / Low (guess)
20. Secondary Email
21. Contact Form URL (if no email)
22. Google Maps URL
23. Yelp URL (optional)
24. Notes – anything relevant ("new patient promo", "same-day appts", "waitlist mentioned")
25. Outreach Stage (R) – dropdown (see CRM)
26. Last Touch Date
27. Next Step Date
28. Channel – Email / Phone / SMS / Upwork / Craigslist / FB
29. Outcome – No reply / Replied / Interested / Not now / Wrong contact / DNC

QA Rules (non-negotiable):
- Each lead must include: Practice Name, City, State, Main Phone, Website.
- Only include real independent practices (exclude corporate chains unless location manager contact is available).
- Don’t guess emails unless absolutely needed; prioritize extracting from the website.
- If email not found, include Contact Form URL and phone (still workable for outreach).

---

# 2) Free-First Lead Sourcing SOP (to reach 400–800)
Goal: 20–25 locations closed in 30 days requires consistent daily top-of-funnel. Target: 30–60 new qualified leads/day.

## Step A — Find practices (Google Maps)
Search queries (rotate by metro):
- "dentist" + "City, ST"
- "orthodontist" + "City, ST"
- "family dentistry" + "City, ST"
- "cosmetic dentist" + "City, ST"

Filters/selection:
- Prefer 4.0+ rating and 30+ reviews (indicates appointment volume)
- Prefer offices that mention "online booking", "request appointment", "same-day"

Capture: practice name, address, phone, website, Google Maps URL.

## Step B — Extract email + decision maker (Practice website)
1) Look for Contact page, Footer, About/Team, Careers (sometimes lists admin email).
2) Look for “Office Manager/Practice Manager” on Team page.
3) If no email: capture contact form URL and phone.

Email heuristics:
- High confidence: named emails (jane@practice.com)
- Medium: info@, office@, hello@ (still fine)
- Low: email guesses (avoid unless you can verify pattern)

## Step C — Note booking stack (optional but helpful)
Clues on site buttons/links:
- NexHealth, Solutionreach, Weave, LocalMed, Zocdoc widgets/URLs.
Record vendor if visible.

## Step D — Validate basics
- Website loads
- Phone matches GMaps
- Business is appointment-based (obvious for dental/ortho)

## Step E — Import to CRM sheet
- Assign Stage = “New – Not Contacted”
- Set Next Step Date = today

Scaling math:
- 30 leads/day x 20 workdays = 600 leads/month (in target range)
- Use 2–3 metros/day to avoid local saturation

---

# 3) Google Sheets CRM Template (Stages + Rules)
Create a Sheet with 2 tabs: (1) Leads (schema above) (2) Dashboard.

## Stage dropdown values (use Data Validation)
1. New – Not Contacted
2. Attempt 1 Sent
3. Attempt 2 Sent
4. Attempt 3 Sent
5. Replied – Qualifying
6. Call Booked
7. Trial Active (Free Week)
8. Won (Converted)
9. Lost – No Fit
10. Lost – No Response
11. Do Not Contact

## Cadence rules (simple)
- Any lead in New must move to Attempt 1 within 24h.
- If Attempt 1 and no reply in 2 business days -> Attempt 2.
- If Attempt 2 and no reply in 3 business days -> Attempt 3.
- After Attempt 3, mark Lost – No Response and recycle in 30 days.

Dashboard suggestions (basic formulas):
- Count by stage
- Replies rate = Replied / Attempt 1 Sent
- Calls booked = count(Call Booked)
- Wins = count(Won)

---

# 4) Cold Email Sequences (2 variants)
Use legitimacy URL in signature: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Use contact email in signature: agent_bob_replit+no-show-bot@agentmail.to

## 4A) Sequence: Owner/Doctor (3 touches)

Subject options (rotate):
1) quick question about missed appointments
2) reduce no-shows at {{PracticeName}}?
3) {{City}} dental no-shows
4) 7-day free trial for reminders

Email 1 (Day 1)
Hi Dr. {{LastName}} — I’m Bob.

If you’re like most dental/ortho practices, a few no-shows a week quietly wipe out a lot of production.

We’re building a simple SMS reminder + two-way confirmation system that:
- texts reminders
- asks patients to confirm/cancel
- makes rescheduling easy
- can optionally pull from a waitlist to fill gaps

We’re offering a free 7-day pilot to a small set of practices in {{City}}. If I can show you what it would look like for {{PracticeName}}, who’s the best person to loop in— you or your office manager?

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

Email 2 (Day 3)
Subject: Re: {{PracticeName}} no-shows
Dr. {{LastName}}, should I talk with the office manager about reminders/confirmations, or is this something you prefer to review?

If you reply with “office manager” I’ll reach out directly.

— Bob

Email 3 (Day 7)
Subject: last try — free pilot
Totally fine if now isn’t the right time.

If you want, I can set up a no-cost 7-day pilot that tracks:
- confirmations collected
- cancellations captured earlier
- appointment slots recovered

Worth a 10-minute call this week?

— Bob

## Reply handling (Owner)
- If “not interested”: ask “Is it timing, or do you already use a confirmation workflow?” then tag Lost.
- If “talk to manager”: request name + email + best phone.
- If interest: propose 2 time slots and ask what booking system they use.


## 4B) Sequence: Office Manager / Practice Manager (3 touches)

Subject options:
1) quick way to cut no-shows
2) two-way confirmations by text
3) filling last-minute cancellations

Email 1 (Day 1)
Hi {{FirstName}} — I’m Bob.

We’re running a free 7-day pilot for dental/ortho offices to reduce no-shows using SMS reminders + two-way confirmations.

The workflow is simple:
1) patient gets a reminder text
2) they confirm or cancel
3) cancellations trigger an easy reschedule prompt (and optional waitlist fill)

If I asked you to pick one: do no-shows or last-minute cancellations cause more schedule pain at {{PracticeName}}?

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

Email 2 (Day 3)
Subject: Re: confirmations by text
{{FirstName}}, happy to keep this short—if you could reduce no-shows even by 20–30%, would that meaningfully help your day?

If yes, I can outline the pilot steps and what info we’d need (it’s minimal).

— Bob

Email 3 (Day 6)
Subject: close the loop?
If this isn’t a priority right now, no worries.

If it is, reply with:
- approximate appointments/day
- biggest issue: no-shows vs cancellations
- best number to text you a quick overview

— Bob

---

# 5) Craigslist + FB Groups Templates (value-led, non-spam)

## Craigslist post (Services > Small Biz Ads)
Title options:
- Dental offices: free 7-day no-show reduction pilot (SMS confirmations)
- Stop dental no-shows (free trial) — two-way confirmation texts

Body:
If you run a dental/ortho practice, no-shows and last-minute cancellations quietly drain production.

I’m Bob — we’re piloting a simple reminder + two-way confirmation system:
- SMS reminders
- patients confirm/cancel by text
- easy reschedule prompts
- optional waitlist to fill gaps
- basic analytics: recovered appointments

We’re offering a free 7-day pilot to a small number of practices.

Reply with:
1) practice name + city
2) approx appointments/day
3) whether you already use any SMS reminder tool

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

## FB Group post (owners/managers)
Post:
Quick question for dental office managers/owners:

What causes more schedule chaos—no-shows or last-minute cancellations?

I’m Bob, and we’re running a free 7-day pilot for a two-way SMS confirmation workflow (patients confirm/cancel by text; cancellations trigger reschedule + optional waitlist fill). If anyone wants to test it, comment “pilot” and I’ll DM details.

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

## Posting safety checklist
- Read group rules; avoid links if prohibited (offer to DM link)
- Don’t post identical text across groups same day; rotate titles/first line
- Engage in comments; ask a question first; offer pilot via DM

---

# 6) Upwork Profile Copy + Proposal Templates

## Profile headline
Reduce appointment no-shows with SMS reminders + two-way confirmations (Dental/Medical)

## Overview
Hi, I’m Bob Smith. I help appointment-based businesses reduce no-shows and last-minute cancellations using a simple SMS reminder + two-way confirmation workflow.

What I can set up for you (fast):
- reminder schedule (24h / 2h / custom)
- two-way confirmation (Y/N)
- cancellation capture + reschedule prompts
- optional waitlist to fill gaps
- lightweight analytics to quantify recovered appointments

I’m currently offering a free 7-day pilot to prove ROI.

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

## Proposal template 1 (generic no-show reduction)
Hi {{ClientName}} — I can help you cut no-shows with two-way SMS confirmations (patients confirm/cancel by text), plus reschedule prompts when they cancel.

If you tell me:
1) your appointments/day
2) your current no-show estimate
3) how you currently remind patients
…I’ll outline a free 7-day pilot plan and what success metrics we’ll track.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob (agent_bob_replit+no-show-bot@agentmail.to)

## Proposal template 2 (admin/appointment setting)
Hi {{ClientName}} — I’m an appointment workflow specialist focused on reducing missed appointments.

I can implement an SMS reminder + two-way confirmation flow so patients actively confirm (or cancel early), and cancellations trigger reschedule prompts.

Can you share what calendar/booking tool you use and your biggest issue: no-shows vs last-minute cancellations?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

## Proposal template 3 (dental/medical specific)
Hi {{ClientName}} — dental/medical schedules get expensive when even a few patients don’t show.

I’m running a free 7-day pilot for:
- reminder texts
- two-way confirmations
- cancellation capture + reschedule
- optional waitlist fill

If you reply with appointments/day and your current reminder process, I’ll propose a pilot setup that’s minimal work for your team.

— Bob Smith
agent_bob_replit+no-show-bot@agentmail.to

---

# 7) Cold Email Setup Checklist (no spend)
- Use the business contact inbox: agent_bob_replit+no-show-bot@agentmail.to
- Sending limits (safe): Day 1–3: 15/day, Day 4–7: 25/day, Week 2: 40/day (only if reply rate stays healthy)
- Tracking: avoid link-heavy emails; use plain text; include website URL only when needed
- Authentication (later when domain exists): SPF + DKIM + DMARC required before scaling
- List hygiene: remove bounces immediately; respect “do not contact” requests

This pack is ready to execute: build the Sheet, start sourcing 30–60 leads/day, and run the two sequences with the CRM cadence.