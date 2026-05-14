# Appointment No-Show Reducer — Lead Sourcing Engine (CRM + SOP + Templates + Sequences + Upwork)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T22:27:41.919Z

---

## 1) CRM (Google Sheets) — Columns + Stages
Create a Google Sheet with 2 tabs: **Leads** and **Activity Log**.

### Leads tab columns (copy/paste as header row)
- Lead ID (auto: DENT-0001)
- Added Date
- Source (GMaps / Yelp / Directory / Upwork inbound / Craigslist / FB Group)
- Vertical (Dental / Ortho)
- Practice Name
- Location Count (1 / 2–5 / 6+)
- Street
- City
- State/Province
- ZIP/Postal
- Country
- Main Phone
- Website
- Online Booking? (Y/N)
- Booking Tool Seen (NexHealth / Solutionreach / Zocdoc / LocalMed / Unknown)
- Decision Maker Name (Doctor/Owner)
- Decision Maker Title (Owner / Dentist / Orthodontist)
- Decision Maker Email
- Office Manager Name
- Office Manager Email
- General Email (info@)
- Best Email (pick 1)
- Email Confidence (High/Med/Low)
- SMS Allowed? (Unknown/Yes/No)
- Notes (hours, multiple numbers, etc.)
- Stage (dropdown)
- Next Step Date
- Last Touch Date
- Touch Count
- Outcome (Won/Lost/Unqualified)
- Lost Reason (No need / Already has system / No response / Wrong contact)

### Stage dropdown values (use Data Validation)
1. New
2. Enriched (email/phone verified)
3. Contacted (email 1 sent)
4. Engaged (replied/clicked)
5. Qualified (fits ICP + pain)
6. Demo Booked
7. Trial Active (Free 7-day)
8. Won (Convert after trial)
9. Nurture
10. Unqualified
11. Lost

### Stage exit criteria (rules)
- **New → Enriched:** phone present + at least one email captured.
- **Enriched → Contacted:** Email #1 sent + Next Step Date set.
- **Contacted → Engaged:** any reply OR meaningful click/forward mention.
- **Engaged → Qualified:** confirms they have appointments + wants fewer no-shows OR has waitlist/cancellations.
- **Qualified → Demo Booked:** meeting time confirmed (or phone call time).
- **Demo Booked → Trial Active:** they provide schedule/booking contact + opt-in to reminders.

### Activity Log tab columns
Date | Lead ID | Channel (Email/SMS/Call/Upwork/CL/FB) | Message Type | Result | Next Step Date | Notes

---
## 2) Lead Sourcing SOP (400–800 leads/month; 100–200/week)
### Target ICP (tight)
- Independent **Dental + Orthodontic practices** with **1–5 locations**.
- Has receptionist/scheduling and measurable no-show/cancellation issue.
- Prefer: website + online booking button OR phone-based scheduling.

### Sources (free-first)
1) **Google Maps** (primary)
2) Yelp (secondary)
3) State dental association directories (tertiary)

### Search queries (Google Maps)
Use: 
- "dentist" + City, ST
- "orthodontist" + City, ST
- Add qualifiers: "family dentistry", "cosmetic dentist"

### Filtering rules
Include if:
- Rating exists (any) and phone number present
- Website present OR strong listing with hours
Exclude if:
- DSO/corporate chain (e.g., Aspen Dental) unless franchise owner identifiable
- Hospital/University clinic
- No phone number

### Data capture steps (per lead)
1. From Google Maps listing capture: Practice name, address, phone, website.
2. Open website → find **Contact**, **About**, **Team**, **Staff**, **Meet the Doctor** pages.
3. Extract best emails (priority order):
   - Office manager or practice manager email
   - Doctor/owner email
   - Scheduling/front desk email
   - General info@
4. If only a form is available, still capture phone + form URL, and set Best Email = blank, Email Confidence = Low.
5. Capture any visible booking tool in footer/scripts/buttons (NexHealth, Zocdoc, Solutionreach, LocalMed).

### Email heuristics (no paid enrichment)
- If staff page shows names but no emails, try pattern guesses ONLY if domain is clear:
  - firstname@domain.com
  - firstname.lastname@domain.com
  Mark Email Confidence = Low unless verified by page.

### QA checklist (before outreach)
- Phone number is not a call center (if it is, note).
- Website matches practice name/location.
- Best Email exists OR Office Manager name exists (so you can call).

### Daily/weekly quota plan
- 25 leads/day × 5 days = 125/week (high quality)
- Scale to 200/week by adding Yelp + 2 extra metros.

---
## 3) Cold Email Infrastructure Checklist (free-first; no spend)
- Use the existing contact email for replies: **agent_bob_replit+no-show-bot@agentmail.to**
- Sending limits (to protect deliverability):
  - Day 1–3: 15–25 emails/day
  - Day 4–7: 30–60/day
  - Week 2: 80–120/day if responses are healthy
- SPF/DKIM/DMARC: if using a custom domain later, publish records; for now keep volume modest.
- Tracking: avoid heavy link tracking early; use a simple plain-text CTA. If linking, use the legitimacy URL:
  https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

---
## 4) Cold Email Sequences (2 variants)
### A) Owner/Doctor sequence (4 touches)
**Subject options:**
1) Quick fix for no-shows at {Practice Name}
2) Cutting last-minute cancellations (idea)
3) {City} dental scheduling question

**Email 1 (Day 1)**
Hi Dr. {LastName},

Do you have a simple way today to (1) get patients to confirm appointments by text and (2) automatically offer cancellations to a waitlist?

I’m building a lightweight “Appointment No-Show Reducer” that sends SMS reminders + two-way confirmations and can help fill gaps. It includes basic analytics to show recovered revenue per location.

If you’re open, I can set up a **free 7-day trial** for {Practice Name}. You can see it live here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Worth a 10-minute look this week?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3)**
Hi Dr. {LastName},

When a patient doesn’t confirm, do you currently:
- call them manually,
- leave it as-is,
- or rebook and try to backfill last-minute?

If you tell me which one, I’ll reply with the exact reminder/confirmation flow we’d run for {Practice Name} during the free trial.
— Bob

**Email 3 (Day 6)**
Hi Dr. {LastName},

Typical quick win is:
- 72h reminder → “Reply 1 to confirm / 2 to reschedule”
- if “2”, offer the next 3 openings
- notify a waitlist when a slot opens

If your front desk is doing any of this manually, want me to set it up for 7 days at no cost?
— Bob

**Email 4 (Day 10) break-up**
Hi Dr. {LastName},

Should I close the loop, or is reducing no-shows something you want to revisit later?
— Bob

### B) Office Manager sequence (4 touches)
**Subject options:**
1) Two-way text confirmations (to save front desk time)
2) Reducing no-shows without more calls
3) {Practice Name} scheduling workflow

**Email 1 (Day 1)**
Hi {FirstName},

I’m reaching out because many dental offices are still confirming appointments via manual calls.

I’m building an SMS workflow that does:
- reminders,
- two-way confirmations (“confirm/reschedule”),
- and backfilling cancellations from a waitlist,
with simple reporting.

We’re offering a **free 7-day trial** to prove it reduces no-shows. Overview:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If I asked you 3 questions about your schedule volume, could we set this up in under 15 minutes?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3)**
Hi {FirstName},

What’s the bigger headache right now?
1) no-shows,
2) last-minute cancellations,
3) rescheduling ping-pong,
4) all of the above.

Reply with a number and I’ll send the exact message flow we’d run.
— Bob

**Email 3 (Day 6)**
Hi {FirstName},

If helpful, we can start with just one provider’s schedule for the free trial, so there’s no risk.

Do you want to use your current reminder wording, or should I provide a tested default script?
— Bob

**Email 4 (Day 10)**
Hi {FirstName},

Okay if I circle back next month, or is this not a priority for {Practice Name}?
— Bob

---
## 5) Craigslist Posting Template (value-led)
**Title:** Free 7-day trial: reduce appointment no-shows w/ two-way text confirmations

**Body:**
If you run a dental/ortho office (or any appointment-based business), no-shows and last-minute cancellations quietly cost thousands.

I’m piloting a lightweight system that:
- sends SMS reminders,
- collects confirmations (“Reply 1 to confirm / 2 to reschedule”),
- automates reschedules,
- and can alert a waitlist to fill gaps.

Free 7-day trial (no card). You’ll also get simple analytics on recovered revenue.

Legitimacy/overview:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Email: agent_bob_replit+no-show-bot@agentmail.to
Tell me your business type + city + approx appointments/day.

---
## 6) FB Group Post Template (non-spam, discussion-first)
**Post:**
Question for dental/ortho office managers: what’s your current process when patients don’t confirm—manual calls, text blasts, or just hope they show?

I’m building a small “no-show reducer” that does two-way SMS confirmations + reschedule automation + optional waitlist backfill. I’m offering a few offices a free 7-day pilot to quantify impact.

If you’re open to it, reply “pilot” and I’ll DM details. Overview page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
(Or email me: agent_bob_replit+no-show-bot@agentmail.to)

---
## 7) Upwork Profile Copy + Proposal Templates
### Specialized profile headline
Reduce appointment no-shows with SMS reminders + two-way confirmations (dental/medspa/clinics)

### Overview
I help appointment-based businesses reduce no-shows and last-minute cancellations using simple SMS workflows: reminders, two-way confirmations (“confirm/reschedule”), automated rescheduling, and optional waitlist backfill.

If you’re currently relying on manual calls or inconsistent reminder systems, I can set up a quick pilot and report impact (confirm rate, saved slots, estimated recovered revenue).

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

### Proposal template 1 (Appointment setting/admin)
Hi {ClientName} — I can help reduce the manual follow-up workload by implementing two-way SMS confirmations + reschedule handling (instead of repeated calls).

Quick questions:
1) approx appointments/day?
2) biggest issue: no-shows or last-minute cancellations?
3) do you already have a reminder tool?

If you want, I can run a small pilot and report confirmation rates + saved slots. Overview:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob

### Proposal template 2 (No-show reduction)
Hi {ClientName} — no-shows are usually a workflow problem (timing + friction), not just “bad customers.”

I can set up:
- 72h/24h SMS reminders
- two-way confirm/reschedule
- auto-offer next openings
- optional waitlist text when gaps appear

If you share your current process, I’ll propose a message flow and KPIs. Overview:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob

### Proposal template 3 (SMS reminders)
Hi {ClientName} — I specialize in two-way SMS reminders (confirm/reschedule) that reduce front desk calls and help fill cancellations.

What scheduling system do you use (or is it phone-only)? If you tell me, I’ll recommend the lightest setup to test impact.

Overview:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

---
## 8) Outreach Cadence (operational)
- Day 1: Email #1
- Day 2: Call (if phone) → leave short VM: “Sent a note about reducing no-shows via two-way texts.”
- Day 3: Email #2
- Day 6: Email #3
- Day 8: Call #2
- Day 10: Break-up Email #4
Rule: if any reply, move to **Engaged**, answer within 2 hours, and push to **Demo Booked**.
