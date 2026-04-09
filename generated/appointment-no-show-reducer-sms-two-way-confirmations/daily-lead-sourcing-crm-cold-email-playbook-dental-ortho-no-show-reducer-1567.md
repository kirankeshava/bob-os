# Daily Lead Sourcing + CRM + Cold Email Playbook (Dental/Ortho No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T16:40:24.430Z

---

## Goal
Build a daily pipeline that reliably generates enough qualified dental/ortho targets to close 20–25 locations in 30 days for the Appointment No-Show Reducer (SMS + two-way confirmations + reschedules + waitlist fill).

Legitimacy link to include in posts/emails when needed: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Primary contact email: agent_bob_replit+no-show-bot@agentmail.to

---

## A) Lead List Schema (Copy into Google Sheets / CSV)
**Required columns (minimum):**
1. Lead ID (format: DENT-YYYYMMDD-0001)
2. Practice Name
3. Vertical (Dental / Ortho)
4. # Locations (1–5)
5. City
6. State/Prov
7. Country
8. Phone (E.164 if possible)
9. Website URL
10. Booking Method (Phone only / Web form / Online scheduling)
11. Decision Maker Name (Owner/Doctor/Practice Manager/Office Manager)
12. Decision Maker Title
13. Email (DM email)
14. Email Source (Website / Contact page / Directory / Guess)
15. Confidence (High/Med/Low)
16. Yelp URL (optional)
17. Google Maps URL (optional)
18. Notes (e.g., "mentions missed appointments" / "accepting new patients" / "has online booking")
19. Outreach Stage (dropdown)
20. Next Step Date
21. Last Touch Date
22. Channel (Email/SMS/Call/Upwork/CL/FB)
23. Outcome (Booked / Not now / No fit / Bad data)

**QA rules (do not load into outreach until pass):**
- Phone is present and matches website/Google listing.
- Website loads and appears to be the same business.
- Email must be one of:
  - A real staff address from site (preferred), OR
  - A contact form + general email (info@, office@), OR
  - A guessed pattern only if domain exists (flag Confidence=Low).
- Remove duplicates by Website URL + Phone.
- Exclude chains >5 locations (longer sales cycles) unless exceptionally promising.

**Enrichment heuristics (fast):**
- Look for “Contact”, “Team”, “About”, “Request Appointment”, “New Patients” pages.
- Often good targets: practices advertising “same-day appointments,” “walk-ins,” “limited availability,” “waitlist,” “text us,” or “online booking.”

---

## B) Daily Lead Sourcing SOP (60–120 minutes/day)
### Step 1 — Google Maps sourcing (primary)
Use queries like:
- "dentist" + City + "appointment"
- "orthodontist" + City
- "family dentistry" + City
- "cosmetic dentistry" + City

**Filters:** Prefer 4.0+ rating and 20+ reviews (signals active appointment volume). Collect: name, phone, site, address, Google URL.

### Step 2 — Yelp sourcing (secondary)
Yelp often surfaces website + categories. Search:
- Yelp → Dentists / Orthodontists → City
Collect: name, phone, website, Yelp URL.

### Step 3 — Practice website extraction (decision-maker email)
On the practice site, check in order:
1) Contact page → email shown?
2) Footer → email?
3) Team page → practice manager/office manager listed?
4) If only contact form exists, capture the form URL and set Email field to “(contact form)” + put form link in Notes.

### Step 4 — State directory quick pull (optional)
Use state dental association directories to validate legitimacy and sometimes find owner names.

### Output quota plan
- **Daily minimum:** 30 net-new practices with phone + website + at least one outreachable email/contact path.
- **Weekly:** 150 practices.
- **Month:** 600 practices.
This supports multi-touch outreach while keeping list quality high.

---

## C) CRM Pipeline (Google Sheets template layout)
Create a Google Sheet with 3 tabs:

### Tab 1: LEADS (main table)
Use the schema above. Add dropdown for **Outreach Stage**:
1. New
2. Researched (QA pass)
3. Contacted – Email 1
4. Contacted – Email 2
5. Contacted – Email 3
6. Replied – Interested
7. Replied – Not Now
8. Bounced/Bad Data
9. Booked Demo
10. Trial/Pilot
11. Won (Paying)
12. Lost

**Automation-lite formulas (optional):**
- Next Step Date defaulting logic (manual is fine). Example: if Stage is “Contacted – Email 1” then Next Step = Last Touch + 2 days.

### Tab 2: ACTIVITY LOG
Columns: Date, Lead ID, Channel, Message Type, Result, Next Step Date, Notes.

### Tab 3: METRICS
Track: #new leads/week, contact rate, reply rate, booked demos, win rate, recovered revenue estimates.

---

## D) Outreach Cadence Rules (14 days)
**Principles:**
- Keep initial outreach short, specific, and value-led.
- Mention a quick audit and "recovered revenue" angle.
- Always include legitimacy URL when it helps trust.
- Always include contact email agent_bob_replit+no-show-bot@agentmail.to.

**Cadence (Email-first, light-touch):**
- Day 1: Email #1
- Day 3: Email #2
- Day 6: Email #3
- Day 9: Email #4 (case-style + numbers)
- Day 12: Breakup email
If phone is available and you’re allowed to text/call, add Day 4 and Day 10 SMS/call touches.

---

## E) Cold Email Sequences (ready to send)

### Sequence 1: Practice Owner / Doctor
**Email 1 (Day 1)**
Subject options:
- “quick question about missed appointments at {{Practice}}”
- “{{City}} no-shows”
- “2-way SMS confirmations for {{Practice}}?”

Body:
Hi Dr. {{LastName}} — I’m Bob.

If you’re like most independent dental practices, no-shows and late cancellations quietly eat a lot of chair time.

We built a simple system that sends smart SMS reminders, collects **two-way confirmations**, auto-handles reschedules, and can fill gaps from a waitlist — with basic analytics that estimates recovered revenue.

If I take 10 minutes and show you what this would look like for {{Practice}}, would you be open to a quick call this week?

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3)**
Subject: “worth a look?”

Hi Dr. {{LastName}} — quick follow-up.

Most clinics we talk to want two things:
1) fewer no-shows via confirmations that require a reply, and
2) fewer empty slots via one-click reschedule + waitlist fill.

If you tell me your average appointment value and typical weekly no-show count, I’ll estimate the monthly revenue being lost (and what’s recoverable).

Open to a 10-minute call?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 3 (Day 6)**
Subject: “who handles scheduling at {{Practice}}?”

Hi Dr. {{LastName}},

Who’s the right person to speak with about scheduling workflow and reminders—office manager or practice manager?

I’m happy to send a 3-bullet summary + a screenshot of the confirmation/reschedule flow.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

**Email 4 (Day 9)**
Subject: “example numbers (dental)”

Hi Dr. {{LastName}},

Example math (conservative): if a practice has 6 missed/late-cancel appointments per week at $220 average, that’s ~$5,280/month of chair time.

Our reminder + two-way confirmation + reschedule + waitlist flow aims to recover a meaningful portion of that without adding front-desk workload.

Want me to run the estimate for {{Practice}}?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Breakup (Day 12)**
Subject: “close the loop”

Hi Dr. {{LastName}},

Should I close the loop on this, or is reducing no-shows something you want to revisit later?

Either way is fine — just reply with “later” and I’ll check back.

— Bob


### Sequence 2: Office Manager / Practice Manager
**Email 1 (Day 1)**
Subject options:
- “reducing no-shows without more front-desk work”
- “two-way SMS confirmations for {{Practice}}”

Body:
Hi {{FirstName}} — I’m Bob.

We help appointment-based clinics reduce no-shows by sending SMS reminders that require a reply (Y/N), automatically handling reschedules, and filling last-minute openings from a waitlist.

If it helps, here’s the overview link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Are you the right person to talk to about reminders + scheduling workflow? If yes, I can show you a quick 10-minute walkthrough.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3)**
Subject: “quick audit for {{Practice}}”

Hi {{FirstName}},

If you answer two questions, I’ll send back a quick estimate of recoverable revenue:
1) average production per appointment?
2) typical weekly no-shows/late cancels?

No pitch needed if it’s not a fit.
— Bob

**Email 3 (Day 6)**
Subject: “does {{Practice}} use online booking?”

Hi {{FirstName}},

Does {{Practice}} rely mostly on phone scheduling, or do you use online booking software?

Either way, the flow is the same: reminders → confirmation replies → auto reschedule → waitlist fill.

If you want, I can send the exact message templates we use.
— Bob

**Reply handling snippets**
- If “interested”: “Great — what does your schedule look like Tue/Wed for 10 minutes? Also, what’s the best number to reach you?”
- If “not now”: “Understood. When would it be sensible to follow up—30/60/90 days?”
- If “send info”: “Sure — is it better to send a 1-page overview or a 2-minute demo video? Here’s the link as well: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

---

## F) Daily execution targets (to hit 20–25 closes)
- Source/QA: 30 new leads/day
- Send: 30 Email #1/day (only to QA-pass leads)
- Follow-ups: 30–60/day (from prior cohorts)
- Goal: 1–3 booked demos/day (depending on reply rate)

If reply rates are low, improve list quality first (owner/manager emails from websites beat generic directories).
