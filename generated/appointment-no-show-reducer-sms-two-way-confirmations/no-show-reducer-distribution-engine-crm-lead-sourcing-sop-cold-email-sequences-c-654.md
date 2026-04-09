# No-Show Reducer Distribution Engine: CRM + Lead Sourcing SOP + Cold Email Sequences + Craigslist/FB + Upwork Templates

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:48:35.966Z

---

## 1) Google Sheets CRM (copy/paste schema)
Create a Google Sheet with these tabs: **Leads**, **Pipeline**, **Activity Log**, **Templates**, **Dashboard**.

### Tab: Leads (one row per location)
Columns (in order):
1. Lead ID (auto: DENT-0001)
2. Date Added
3. Vertical (Dental/Ortho)
4. Business Name
5. Location Name (if multi)
6. Address
7. City
8. State/Province
9. ZIP
10. Country
11. Main Phone
12. Website
13. Google Maps URL
14. Yelp URL
15. Online Booking? (Y/N)
16. Booking tool observed (NexHealth, Solutionreach, Weave, PatientPop, unknown)
17. Decision Maker Name (Owner/Doctor/Practice Manager)
18. Title (Owner/Doctor/Office Manager/Practice Manager)
19. Email 1
20. Email 1 Source (Website/Contact page/About/Staff/Directory)
21. Email 1 Confidence (High/Med/Low)
22. Email 2
23. Email 2 Source
24. Email 2 Confidence
25. SMS-capable main line? (Assume Y; mark N only if landline-only noted)
26. Lead Score (A/B/C)
27. Stage (dropdown)
28. Next Step Date
29. Last Touch Date
30. Touch Count
31. Channel Primary (Email/SMS/Phone/Upwork/FB/CL)
32. Notes (hours, pain points, software, staff count)

**Stage dropdown values:** New → Enriched → Contacted → Replied → Qualified → Demo Scheduled → Demo Done → Trial/POC → Won → Lost → Nurture.

### Tab: Activity Log
Columns: Date, Lead ID, Channel, Action (Sent/Call/SMS/Posted), Template Used, Outcome, Next Step.

### Tab: Dashboard (simple)
Metrics: #New leads/week, % with email, % with phone, Replies, Demos booked, Wins, Lost reasons.

## 2) Lead sourcing SOP (400–800 leads total; 150–200/day pace)
### ICP filters (Dental/Ortho)
- Independent practices, 1–5 locations.
- Must have a receptionist/office manager (implied by hours/phone).
- Prefer: online booking widget OR explicit “Request Appointment” form.
- Exclude: hospitals, universities, mega DSOs if obvious.

### Sources & queries
1) **Google Maps**
- Query patterns (rotate):
  - “dentist near {City, ST}”
  - “orthodontist {City, ST}”
  - “cosmetic dentist {City, ST}”
- Open each listing → capture business name, phone, website, address, Maps URL.

2) **Yelp**
- Category: Dentists / Orthodontists; filter by city.
- Capture Yelp URL + phone if listed.

3) **Practice website enrichment (required for email)**
- Visit website → find emails on: Contact, About, Team, Footer, Privacy Policy.
- If no email: look for “Request appointment” form (still keep lead, score B/C).

### Email capture heuristics (decision maker priority)
- Prefer role emails: info@, scheduling@, appointments@, office@ (good for office manager).
- Prefer named emails: first@domain.com, office.manager@domain.com.
- If only contact form exists: record “Contact Form Only” and keep phone as primary.

### QA rules (do not skip)
- Phone present: required.
- Website present: required (unless Maps has no website; then score C).
- Email confidence:
  - High: email found on the practice’s domain website.
  - Medium: role email + corroborating context.
  - Low: third-party directory email.
- Duplicate control: de-dupe by phone + domain.

### Lead scoring
- **A**: phone + website + at least 1 high-confidence email + online booking.
- **B**: phone + website + email (med/high) but no online booking.
- **C**: phone only or contact-form-only.

## 3) Cold email infrastructure checklist (free-first)
- Use a sending inbox on your domain (preferred) OR start with existing inbox for very low volume.
- DNS records for sending domain:
  - SPF: include your email provider.
  - DKIM: enabled in provider.
  - DMARC: p=none initially, then move to quarantine.
- Sending limits (warm-up):
  - Days 1–3: 10/day
  - Days 4–7: 20/day
  - Week 2: 30–40/day
- Tracking: avoid click tracking early; use plain text + one reply CTA.

## 4) Cold email sequences (14-day cadence)
### Sequence A: Owner/Doctor
**Email 1 (Day 1) – Subject options:**
- “Quick question about no-shows at {Practice}”
- “Filling last-minute gaps for {City} dental schedules”

Body:
Hi {FirstName},

I’m Bob. We run a simple no-show reducer for appointment-based offices: smart SMS reminders + two-way confirmations, auto-reschedules, and a waitlist to fill gaps.

If you’re open to it, I can show you a 10-minute walkthrough and estimate how much revenue you’re losing to no-shows each month.

Would you like me to send details or a quick demo time?

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply here or email: agent_bob_replit+no-show-bot@agentmail.to

— Bob

**Email 2 (Day 3) – Subject:** “Is this a priority right now?”
Hi {FirstName},

Curious—are no-shows/cancellations a meaningful issue at {Practice}? If not, I’ll close the loop.

If it is, we typically:
1) confirm appointments by SMS (two-way),
2) auto-offer reschedule links,
3) pull from a waitlist to fill gaps.

Open to a 10-min look?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

**Email 3 (Day 6) – Subject:** “Waitlist fill-in for last-minute openings”
Hi {FirstName},

When a patient cancels same-day, most offices don’t have a fast way to backfill. Our waitlist text goes out automatically and logs recovered appointments.

If you tell me your avg production per appointment (roughly), I’ll estimate the monthly upside.

Worth a quick chat?
— Bob

**Email 4 (Day 10) – Subject:** “Who owns scheduling ops?”
Hi {FirstName},

Who’s the best person on your team to speak with about reminders/confirmations and the scheduling workflow—office manager or front desk lead?

I can send a short summary + example messages.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 5 (Day 14) – Subject:** “Close the loop”
Hi {FirstName},

Should I:
A) send a 2-minute overview + pricing,
B) schedule a 10-min demo,
C) reach back out later?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Sequence B: Office Manager/Practice Manager
**Email 1 (Day 1) – Subject:** “Reducing no-shows (2-way SMS confirms)”
Hi {FirstName},

I’m Bob—reaching out because a lot of dental offices are losing chair time to late cancels/no-shows.

We provide SMS reminders with two-way confirmation (Y/N), automatic reschedule prompts, and a waitlist blast to fill openings—plus simple reporting on recovered appointments.

If you’re the right person: open to a 10-minute walkthrough? If not, who should I speak with?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3) – Subject:** “Can I send example reminder texts?”
Hi {FirstName},

If helpful, I can send the exact SMS templates we use (confirm, reschedule, waitlist fill) so you can judge if it fits your workflow.

Want me to send them?
— Bob

**Email 3 (Day 6) – Subject:** “Workflow question”
Hi {FirstName},

Quick workflow question: when a patient replies to a reminder with “no” or “need to move,” does your team have to call them back manually, or do you have an automated reschedule link?

We’re built to reduce that back-and-forth.
Open to a quick look?
— Bob

**Email 4 (Day 10) – Subject:** “Last-minute openings”
Hi {FirstName},

Do you keep a waitlist today? If yes, is it a spreadsheet or just notes?

We automate the outreach and stop once the slot is filled.

— Bob

## 5) Craigslist + FB Groups posting rules checklist
- Do not post “software for sale.” Post value: “free no-show audit” and “templates.”
- Rotate 3–5 versions of copy; change title and first 2 lines each time.
- Craigslist frequency: max 1 post / category / metro per 48–72 hours.
- FB Groups: read rules; avoid links if prohibited; offer to DM the overview.
- Always include legitimacy URL + contact email when allowed:
  - https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
  - agent_bob_replit+no-show-bot@agentmail.to

## 6) Upwork profile + proposals
### Profile headline
“Reduce appointment no-shows with 2-way SMS confirmations + waitlist fill (ops + automation)”

### Overview (paste)
I help appointment-based businesses reduce no-shows and last-minute cancellations using two-way SMS confirmations, automated reschedules, and waitlist fill-ins. The goal is simple: recover lost revenue by keeping the calendar full—without adding admin work for your front desk.

What I can do quickly:
- Audit your current reminder/confirmation workflow
- Implement 2-way confirmation flows (Y/N)
- Set up reschedule prompts and waitlist outreach
- Provide lightweight reporting on recovered appointments

Overview/proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

### Proposal template 1 (no-show reduction)
Hi {ClientName} — I can help cut no-shows by adding two-way SMS confirmations (Y/N), automatic reschedule links, and a waitlist fill flow for last-minute openings.

To scope this fast, 3 questions:
1) Approx # appointments/week?
2) Current reminder method (manual calls/texts/software)?
3) Biggest pain: no-shows vs late cancels vs underfilled schedule?

If you want, I’ll do a quick no-show audit and outline the exact message sequence.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob (agent_bob_replit+no-show-bot@agentmail.to)

### Proposal template 2 (admin / appointment setting)
Hi {ClientName} — I specialize in appointment operations: confirmations, reschedules, and reducing no-shows so your team spends less time chasing patients.

I can set up a workflow where:
- reminders go out automatically,
- confirmations are tracked via two-way SMS,
- cancellations trigger reschedule prompts,
- openings are filled from a waitlist.

Open to a 10-minute call to map your current process?
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Proposal template 3 (quick win)
Hi {ClientName} — quick win: I’ll implement a confirmation + reschedule flow and give you a simple weekly report on recovered appointments.

If you tell me your average value per appointment, I can estimate ROI immediately.

Can I ask: what scheduling software do you use today?
— Bob (agent_bob_replit+no-show-bot@agentmail.to)

---
If you want, I can next produce the first 150–200 real leads (dental/ortho) as a CSV with phone + email confidence scoring, ready to upload into the CRM and start outreach immediately.