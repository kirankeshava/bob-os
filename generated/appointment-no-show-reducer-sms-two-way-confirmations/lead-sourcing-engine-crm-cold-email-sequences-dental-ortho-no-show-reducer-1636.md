# Lead Sourcing Engine + CRM + Cold Email Sequences (Dental/Ortho No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T17:08:47.972Z

---

# 1) Lead List Template (Sheets/CSV Columns)
Use one row per *location*.

**Core identifiers**
1. Lead ID (e.g., DENT-YYYYMMDD-001)
2. Business Name
3. Location Name (if multi-site)
4. Address
5. City
6. State/Province
7. ZIP/Postal
8. Country
9. Google Maps URL
10. Website URL
11. Yelp URL (optional)

**Contact + decision maker**
12. Main Phone
13. Scheduling Phone (if different)
14. Contact Page URL
15. Decision Maker Name (Doctor/Owner/Practice Manager)
16. Decision Maker Title (Owner / Dentist / Orthodontist / Practice Manager / Office Manager)
17. Decision Maker Email
18. Secondary Email (front desk / info@)
19. Contact Form? (Y/N)
20. SMS-capable number? (Y/N/Unknown)

**Signals (to prioritize)**
21. Online booking? (Y/N; paste URL)
22. New patient offer on site? (Y/N)
23. Reviews count (approx)
24. Hours listed? (Y/N)
25. Uses reminder language already? (None/Basic/Strong)
26. Waitlist mention? (Y/N)

**Outreach operations**
27. Lead Source (Maps/Yelp/Directory)
28. Sourced By
29. Date Sourced
30. QA Score (0–5)
31. Notes (any personalization hook)

**CRM fields (can live in same sheet)**
32. Stage (dropdown)
33. Next Step
34. Next Step Due Date
35. Last Touch Date
36. Touch Count
37. Outcome (Interested/Not now/No/Bad contact)
38. Booked Call? (Y/N)
39. Demo Date/Time

## QA Scoring (0–5)
- +2 = Decision-maker email found (named person or manager)
- +1 = Website + phone verified and match Maps listing
- +1 = Online booking exists OR clear appointment-based intake
- +1 = Personalization hook found (offer, reviews, “same-day,” etc.)
**Rule:** Only QA ≥3 goes into Day-1 send list. Lower scores require enrichment.

---

# 2) Daily Lead Sourcing SOP (No Paid Tools)
Goal: **100–150 leads/day per sourcer**; scale to 400–800/week.

## Step A — Choose geo batch
Pick 5–10 metros per day (e.g., “Austin TX”, “Phoenix AZ”). Work metro-by-metro to reduce context switching.

## Step B — Google Maps harvesting
Search queries (copy/paste variations):
- “orthodontist {city}”
- “dentist {city}”
- “family dentistry {city}”
- “cosmetic dentist {city}”

Open each listing in a new tab and capture:
- Business name, address, phone, website, maps URL.

**Filters (skip fast):**
- Hospitals/large DSOs if clearly corporate (unless you want multi-location deals later)
- No phone number
- Closed permanently

## Step C — Website decision-maker capture
From the website:
1) Check footer/contact page for emails.
2) Check “Team”, “About”, “Our Doctors”, “Leadership”. Capture owner/doctor names.
3) If no emails, use common patterns:
   - info@domain
   - office@domain
   - scheduling@domain
   - manager@domain
   - firstname@domain (if pattern appears)
4) If only a contact form exists, mark Contact Form=Y and store contact URL.

## Step D — Enrichment heuristic (free)
- If doctor name is available but no email: capture name + title anyway.
- If Facebook page is linked on site, check About section for email.

## Step E — Prioritization note
Write 1 quick hook:
- “Has online booking + new patient special”
- “Mentions waitlist / limited openings”
- “High reviews, busy practice”

## Step F — QA + staging
- Assign QA score.
- If QA ≥3: Stage = “Ready to Contact”.
- If QA ≤2: Stage = “Needs Enrichment”.

---

# 3) CRM Pipeline (Google Sheets-ready)
**Stages (dropdown):**
1. New (unworked)
2. Ready to Contact (QA≥3)
3. Contacted – Awaiting Reply
4. Replied – Qualifying
5. Booked Demo
6. Trial Started (7 days free)
7. Won (convert after trial)
8. Lost – Not a Fit
9. Lost – No Response (aged out)

**Rules**
- Every row must have: Business, City/State, Phone, Website or Maps URL, Stage, Next Step Due Date.
- Touch Count increments on every email/call/SMS attempt.
- If no reply after Day 14: move to “Lost – No Response”, set a 30-day recycle date.

---

# 4) Cold Email Sequences (include legitimacy URL + contact email)
Legitimacy URL to include: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact email to include: agent_bob_replit+no-show-bot@agentmail.to

## Sequence A — Owner/Doctor (4 touches)
### Email 1 (Day 1)
**Subject options:**
1) “Quick idea to cut no-shows at {Practice}”
2) “{City} appointment confirmations”
3) “2-way SMS confirmations for {Practice}”

Hi Dr. {LastName},

I’m Bob. I’m building a simple SMS + two-way confirmation system to reduce appointment no-shows for dental/ortho practices.

It sends smart reminders, asks patients to confirm (Y/N), and automatically flags reschedules so your team isn’t chasing the schedule all day. It also tracks estimated revenue recovered.

Would you be open to a 10-minute call this week to see if it fits {Practice}?

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Or reply here and I’ll send details: agent_bob_replit+no-show-bot@agentmail.to

— Bob

### Email 2 (Day 3)
**Subject:** “Worth testing for 7 days (free)?”

Hi Dr. {LastName},

If no-shows are even 3–5% at {Practice}, a basic two-way confirmation flow usually pays for itself quickly.

I’m offering a **7-day free trial** to set this up for one location, measure confirmations/reschedules, and show the recovered-appointments estimate.

Should I send a quick checklist of what I’d need to start (it’s minimal), or would you prefer a 10-minute walkthrough?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Email 3 (Day 7)
**Subject:** “Who owns schedule confirmations?”

Hi Dr. {LastName},

Who’s the best person on your team to speak with about appointment reminders/confirmations—office manager or front desk lead?

If you point me to the right person, I’ll reach out with a short, non-salesy summary.

— Bob (agent_bob_replit+no-show-bot@agentmail.to)

### Email 4 (Day 14)
**Subject:** “Close the loop?”

Hi Dr. {LastName},

I don’t want to be a distraction. If reducing no-shows isn’t a priority right now, just reply “not now” and I’ll circle back later.

If it *is* a priority, reply “info” and I’ll send the 1-page overview + next steps.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

## Sequence B — Office Manager (4 touches)
### Email 1 (Day 1)
**Subject options:**
1) “Reducing no-shows (two-way texts)”
2) “Confirmations + reschedules via SMS”
3) “Fewer reminder calls for your front desk”

Hi {FirstName},

I’m Bob. I’m working with appointment-based clinics to cut no-shows using **two-way SMS confirmations** (patients reply Y to confirm / N to reschedule). The goal is fewer reminder calls and fewer holes in the schedule.

I can set up a **7-day free trial** for {Practice} and share simple analytics (confirm rate, reschedule rate, estimated revenue recovered).

Would you be the right person to talk to about this? If yes, what’s a good time for a quick 10-minute call?

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

— Bob

### Email 2 (Day 3)
**Subject:** “What system do you use for reminders now?”

Hi {FirstName},

Quick question: what are you using today for reminders/confirmations—your PMS, calls, or texts?

If you tell me your current flow, I’ll reply with the simplest way to add two-way confirmations without creating extra work.

— Bob

### Email 3 (Day 7)
**Subject:** “I can do the setup”

Hi {FirstName},

If it helps: I’ll handle the setup and message wording. Your team just sees the confirmations and reschedule requests.

Want to test it for 7 days on one provider’s schedule?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email 4 (Day 14)
**Subject:** “Should I stop reaching out?”

Hi {FirstName},

Should I close this out, or is reducing no-shows something you want to revisit later?

If you’d like, reply with the best month to circle back.

— Bob

---

# 5) Reply-Handling Macros (paste-ready)
**If interested:**
“Great — easiest next step is a 10-minute call so I can understand your current reminder flow + no-show pain. What times work this week? If you prefer, reply with your current process (calls/texts/PMS) and I’ll suggest the simplest trial setup.”

**If ‘send info’:**
“Absolutely. Here’s the overview link (includes what it does + how the trial works): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 — If you share your appointment volume per week and typical no-show %, I can estimate recovered appointments.”

**If wrong person:**
“Thanks—who’s the best person to speak with about scheduling confirmations and no-shows? If you can share their name/email, I’ll reach out directly.”

**If not now:**
“No problem. What’s a better month to follow up? I’ll set a reminder and won’t bug you until then.”

---

# 6) Operating Targets (to close 20–25 locations/30 days)
- **Lead sourcing:** 150/day (single sourcer) or 400–800/week (team/parallel metros)
- **Outreach volume:** 50–100 new emails/day + follow-ups (keep deliverability safe)
- **Daily goal:** 3–5 replies, 1–2 demos booked
- **Weekly goal:** 8–12 demos, 5–7 trials started (7-day free)

This package is ready to paste into Google Sheets and start compiling real leads today.