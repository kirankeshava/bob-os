# No-Show Reducer: Lead Sourcing + CRM + Cold Email Sequences (Dental/Ortho) — Week 1 Free Launch Pack

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T06:16:29.411Z

---

## 1) Lead List Schema (400–800 ready)
Use this as your CSV/Google Sheet header row.

**Core identification**
- Lead ID (auto: YYYYMMDD-###)
- Business Name
- Vertical (Dental / Ortho)
- # Locations (1 / 2–5 / 6+ / unknown)
- Street Address
- City
- State/Province
- ZIP/Postal
- Country

**Contact + decision maker**
- Main Phone
- Website URL
- Contact Page URL
- Decision Maker Name (if found)
- Decision Maker Role (Owner/Dentist, Practice Manager, Office Manager)
- Decision Maker Email (best)
- Backup Email (general inbox)
- Source for Email (Website footer / Contact page / Staff page / Directory / WHOIS)

**Appointment ops signals (qualifiers)**
- Online Booking? (Y/N)
- Booking Vendor (Zocdoc / NexHealth / LocalMed / Solutionreach / Other / Unknown)
- SMS Mentioned on site? (Y/N)
- Hours listed (Y/N)
- Reviews Count (Google)
- Rating

**Outreach + CRM**
- Stage (dropdown: New, Researched, Contacted-Email, Contacted-SMS, Replied, Booked, No-Show Risk Audit Sent, Trial Live, Won, Lost)
- Last Touch Date
- Next Step
- Next Step Due Date
- Notes (free text)

### QA rules (minimum quality)
1) **Phone + website required** for every lead. If no website, capture Google Maps listing URL.
2) Email standard: prefer **named email** (manager@, office@, firstname@). If only a form exists, capture form URL and treat as “contact channel”.
3) Decision maker inference: if the site lists “Practice Manager/Office Manager”, use that contact first; otherwise target “Owner/Dentist”.
4) Deduplicate by website domain + phone.

### Enrichment heuristics (fast, free)
- Check: Website footer → “Contact” → “About/Team” pages.
- Search operator: `site:domain.com email` or `site:domain.com "@"`.
- If no email: look for HIPAA/privacy page or job postings (often has HR/office email).

---

## 2) Daily Lead Sourcing SOP (Google Maps + Website)
Goal: **150–200 leads/day (seed), then 400–800/week** with consistent fields.

### Tools (free)
- Google Maps + Google Search
- Spreadsheet (Google Sheets)
- Optional: a simple text expander (browser built-in snippets)

### Timeboxed workflow (per lead: 2–4 minutes)
1) **Find candidates (60–90 sec)**
   - Query examples:
     - “dentist near [CITY]”
     - “orthodontist [CITY]”
     - “family dentistry [CITY]”
   - Open listing, capture: business name, phone, website, address, rating, review count.

2) **Extract contacts (60–120 sec)**
   - Visit website → Contact page.
   - Capture best email(s). If only form: capture form URL and main phone.
   - Check staff/team page for manager name.

3) **Qualify signals (30–60 sec)**
   - Look for “Book Online”, “Request Appointment”, “Text us”, “New patient forms”.
   - Note booking vendor if visible (embedded widget branding).

4) **Log + schedule next step (15 sec)**
   - Stage = New → Researched.
   - Set Next Step Due = today (for first-touch email).

### Daily quotas
- Lead capture: 150–200/day for first week.
- First-touch sends: 50–100/day (keep volume conservative if mailbox is new).

---

## 3) CRM Pipeline (Google Sheets) — Stages + Rules
### Stages (dropdown)
1. New (not yet researched)
2. Researched (phone/website captured; contact channel known)
3. Contacted-Email (sequence started)
4. Contacted-SMS (only after email or explicit opt-in; otherwise skip)
5. Replied
6. Booked (demo/audit scheduled)
7. No-Show Risk Audit Sent
8. Trial Live (7-day free)
9. Won
10. Lost

### Required fields per stage
- Researched: Phone, Website/Maps URL, City/State
- Contacted-Email: Decision maker email OR contact form URL
- Booked: Meeting date/time + channel
- Trial Live: start date + clinic’s appointment volume estimate

### Cadence rule (simple)
- If **no reply** after Day 7 → mark “Cold” in Notes, recycle in 21 days.
- If **positive reply** → respond within 15 minutes (same business day) with booking link and 2 time options.

---

## 4) Cold Email Sequences (copy/paste ready)
Use legitimacy URL and contact email in every sequence:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact: agent_bob_replit+no-show-bot@agentmail.to

### Sequence A: Owner/Dentist (4 touches)
**Target:** owner dentist / orthodontist / principal doctor.

**Email 1 (Day 1)**
Subject options:
- “Quick question about no-shows at {{Practice}}”
- “Filling last-minute gaps at {{Practice}}”

Body:
Hi {{FirstName}},

I’m Bob. I’m running a simple SMS + two-way confirmation system that helps appointment-based clinics cut no-shows and fill gaps (confirmations, smart reminders, easy reschedules, optional waitlist fills).

If you’re open to it, I can set up a **free 7-day trial** for {{Practice}} and share a small report showing how many appointments (and $) were recovered.

Worth a 10-minute look this week?

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply here or reach me at agent_bob_replit+no-show-bot@agentmail.to.

— Bob

**Email 2 (Day 3)**
Subject: “Re: no-shows at {{Practice}}”

Hi {{FirstName}},

Most clinics I talk to don’t need “more reminders”—they need **two-way confirmations** so the schedule is either confirmed or reopened early enough to fill.

If you tell me roughly how many appointments/day you run, I’ll estimate the $ impact and set up the free trial.

Open to a quick call?
— Bob

**Email 3 (Day 5)**
Subject: “Should I talk to your office manager?”

Hi {{FirstName}},

If you’re not the right person for scheduling/no-show processes, who should I reach out to (office manager / practice manager)?

I can keep this lightweight: free 7-day trial + a before/after no-show rate snapshot.

Thanks,
Bob

**Email 4 (Day 7)**
Subject: “Last note — free trial”

Hi {{FirstName}},

I’m going to close the loop. If reducing no-shows (and filling cancellations) is a priority in the next month, reply “trial” and I’ll send the 2-minute setup steps.

Website (legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

— Bob

### Sequence B: Office Manager / Practice Manager (4 touches)
**Target:** office manager, front desk lead, practice manager.

**Email 1 (Day 1)**
Subject options:
- “Confirmations + reschedules (free trial for {{Practice}})”
- “Reducing no-shows without extra front-desk work”

Body:
Hi {{FirstName}},

I’m Bob. I help clinics reduce no-shows using SMS reminders that **collect a yes/no confirmation**, and if a patient can’t make it, it automates a reschedule path so the slot can be refilled early.

I’m offering a **free 7-day trial** to a few practices. Minimal setup: you send us the daily schedule export (or basic appointment list), and we handle the messaging and reporting.

Would you be the right person to approve a quick pilot at {{Practice}}?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

— Bob

**Email 2 (Day 3)**
Subject: “How do you handle confirmations today?”

Hi {{FirstName}},

Quick one: do you confirm by phone calls, texts, or only email reminders today?

If you reply with “calls” / “texts” / “emails”, I’ll send the simplest setup option for a free trial.

— Bob

**Email 3 (Day 5)**
Subject: “I can draft the patient messages for you”

Hi {{FirstName}},

If helpful, I can use your clinic’s tone and draft:
- 72h reminder
- 24h reminder
- 2h reminder
- two-way confirm/cancel flow

You’d only need to approve the wording.

Want me to send a draft?
— Bob

**Email 4 (Day 7)**
Subject: “Close the loop?”

Hi {{FirstName}},

Should I keep this on hold, or is it okay to run a free 7-day trial for {{Practice}}?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

— Bob

### Reply handling snippets
- **Positive:** “Great — what’s the best number to text for confirmations, and do you prefer patients confirm 24h before? I can start the free trial tomorrow. Also, who should receive the daily confirmation report?”
- **Not now:** “Understood. When is a better time? I can follow up in 30 days. In the meantime, want a one-page checklist to reduce no-shows without new software?”
- **Wrong person:** “Thanks—who handles scheduling/confirmations? I’ll reach out and keep you CC’d.”

---

## 5) Craigslist + FB Groups Execution Rules (anti-ban)
### Craigslist
- Post **value-first** (free audit + free 7-day trial), no exaggerated claims.
- Rotate metros and categories (small biz / services / admin support where allowed).
- Change titles and first paragraph each time (3–5 variants).
- Include legitimacy URL and email; avoid URL shorteners.

### FB Groups
- Only post where promotions are allowed; follow each group’s rules.
- Prefer: “Ask a question + offer free resource” instead of direct pitch.
- DM only when someone comments/opts in.

---

## 6) What to do next (execution order)
1) Create Google Sheet with the schema + stage dropdowns.
2) Compile first 150–200 leads using SOP.
3) Start Sequence A/B (low volume) and track replies in CRM.
4) In parallel: create Upwork account and send 3 proposals/day (use the same legitimacy URL + email).

If you want, I can also generate the first batch of 150–200 leads in a ready-to-import CSV format once you confirm the target metros/states to start with (e.g., CA/TX/FL/NY or top 20 metros).