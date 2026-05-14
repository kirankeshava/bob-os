# No-Show Reducer Lead Sourcing Engine v1 (Schema + SOP + Cold Email Sequences + CRM Ops)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T06:39:22.153Z

---

## 1) Lead List + CRM Schema (Google Sheets ready)

### Tabs
- **Leads** (main table)
- **Activities** (optional log)
- **Templates** (email/SMS copy snippets)
- **Lists** (dropdown values)

### Leads tab columns (copy/paste header row)
1. Lead ID (auto): `=ROW()-1`
2. Date Added
3. Source (Google Maps / Yelp / Directory / Referral / Upwork)
4. Vertical (Dental / Ortho)
5. Practice Name
6. DBA/Brand (if different)
7. # Locations (1 / 2–5 / 6+)
8. City
9. State/Province
10. Country
11. Address
12. Main Phone
13. Secondary Phone
14. Website
15. Booking Link (if visible)
16. Scheduling/CRM Vendor (Zocdoc / NexHealth / Solutionreach / Weave / Doctible / Unknown)
17. Decision Maker Name (Owner/Doctor/Practice Manager)
18. Role (Owner / Dentist / Ortho / Office Manager / Practice Manager)
19. Email 1 (Primary)
20. Email 1 Confidence (High/Med/Low)
21. Email 2 (Backup)
22. Email 2 Confidence
23. Contact Form URL (if no email)
24. LinkedIn (optional)
25. Notes (e.g., "Open Sat", "New patient special")
26. Stage (dropdown)
27. Next Step Date
28. Last Touch Date
29. Touch Count
30. Reply Status (No reply / Positive / Neutral / Negative / OOO)
31. Objection Tag (Already have reminders / Corporate policy / No time / Price later / Not decision maker)
32. Outcome (Booked demo / Trial started / Closed won / Closed lost)

### Stage dropdown (Lists tab)
- S0 To Research
- S1 Researched (missing contact)
- S2 Ready to Contact
- S3 Contacted (Day 0)
- S4 Follow-up (Day 2)
- S5 Follow-up (Day 4)
- S6 Follow-up (Day 7)
- S7 Engaged (replied)
- S8 Demo Scheduled
- S9 Trial Live (7 days free)
- S10 Closed Won (post-week-1 convert)
- S11 Closed Lost

### Validation + QA rules
- **Do not move to S2 Ready to Contact** unless: Practice Name + City/State + Phone + Website OR Google profile link + at least one outreach route (Email or Contact Form).
- **Email Confidence**
  - High: email explicitly listed on site or staff directory.
  - Med: inferred pattern matches multiple staff emails on site.
  - Low: guessed pattern with no confirmation; requires contact form backup.
- **Phone QA**: call not required at sourcing stage; ensure number matches website/Google profile and is not a tracking number if identifiable.

---

## 2) Lead Sourcing SOP (400–800 leads/month minimum; scalable to daily quotas)

### ICP (tight for speed)
- Independent **dental + orthodontic** practices, **1–5 locations**, appointment-based, front desk scheduling.
- Signals: online booking button, “Request an appointment”, new patient offers, heavy reliance on scheduled visits.

### Daily quota (single operator)
- **60 researched locations/day** (Google Maps list)
- **25–35 with verified decision-maker/office email/day**
- Remaining become “missing contact” and routed to contact-form outreach.

### Step-by-step
1. **Pick 5 metros/day** (rotate; focus on high-density).
2. Google Maps queries (copy/paste and vary):
   - “dentist in {city}”
   - “orthodontist in {city}”
   - “family dentistry in {city}”
   - “cosmetic dentist in {city}”
3. Open each listing; capture: name, phone, site, address.
4. Open website in new tab; find **Contact**, **Team**, **About**, **Meet the Doctor**, footer.
5. Capture best email(s):
   - Priority order: office manager/practice manager email > general office email > doctor/owner email.
   - If none, capture **contact form URL**.
6. Identify scheduling vendor if visible (footer badges, embedded widgets, subdomains, or page scripts):
   - Zocdoc, NexHealth, Solutionreach, Weave, Doctible, LocalMed, PatientPop.
   - If unclear, set Unknown.
7. Put record into Leads sheet; set Stage:
   - Has email or contact form => S2 Ready to Contact.
   - Missing both => S1 Researched (missing contact) and flag for enrichment.

### Enrichment heuristics (free-first)
- If domain exists and no email is listed, look for:
  - “mailto:” links in page source
  - PDF forms (often include emails)
  - Staff pages with personal emails
- Email pattern inference (only if you find at least one real email on site):
  - If you find `jane@domain.com`, assume first@domain.
  - If you find `j.smith@domain.com`, assume firstinitiallast@domain.
  - Mark confidence Med/Low accordingly.

### Speed tips
- Time-box: **3 minutes per practice**; if no email found, log contact form and move on.
- Don’t over-enrich early; volume + clean next-step dates wins.

---

## 3) Outreach Cadence Rules (14 days, multi-touch; free trial CTA)

**Goal:** book a 12–15 minute demo; start 7-day free trial.
**CTA link:** provide your booking/demos path (for now: reply to email to schedule). Always include legitimacy URL.

### Operating rules
- Every lead in S2 gets Day 0 email + same-day alternate route if no email (contact form submission).
- If email bounces: switch to contact form + phone call (manual) if possible; update Email Confidence.
- When a reply arrives: move to S7 Engaged within same day; respond within 2 hours.

---

## 4) Cold Email Sequence A (Owner/Doctor)

**From:** agent_bob_replit+no-show-bot@agentmail.to
**Include in signature:**
- Website legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Day 0
**Subject options (rotate):**
1) Quick fix for last‑minute cancellations at {{Practice}}
2) {{City}} dental no‑shows — 7‑day free trial
3) Can we reduce no‑shows by 20–40% at {{Practice}}?

**Body:**
Hi Dr. {{LastName}} — I’m Bob.

I’m reaching out because most independent dental practices lose a surprising amount of chair time to no‑shows and last‑minute cancels.

We built a simple SMS reminder + **two‑way confirmation** system that:
- texts patients to confirm (Y/N)
- automatically prompts reschedules when they can’t make it
- can notify a small waitlist to fill gaps
- shows basic analytics so you can quantify recovered production

If I can show you a 10–minute walkthrough and set up a **7‑day free trial** for {{Practice}}, would you be open to it this week?

Legitimacy/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Day 2 (follow-up)
**Subject:** Re: no‑shows at {{Practice}}

Hi Dr. {{LastName}} — quick follow-up.

If you already use reminders (Weave/Solutionreach/etc.), the gap is usually **two‑way confirmation** + automated reschedule flow.

Do you handle confirmations manually today, or is it automated?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Day 4
**Subject:** 1 question (then I’ll close the loop)

Hi Dr. {{LastName}},

What’s a "bad week" of no‑shows for you—more than 5? more than 10?

If you reply with a rough number, I’ll send back the simplest setup I’d use for {{Practice}} during a 7‑day free trial.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Day 7
**Subject:** Should I talk to your office manager?

Hi Dr. {{LastName}},

Totally fine if you’re not the right person for this. Should I share this with your office manager/practice manager instead?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Day 10
**Subject:** Last note — free trial still available

Hi Dr. {{LastName}},

Last note from me. If reducing no‑shows/cancellations is on the list, I can set up a 7‑day free trial that runs alongside whatever you do today.

Want me to send 2 available times?

— Bob

---

## 5) Cold Email Sequence B (Office Manager / Practice Manager)

### Day 0
**Subject options:**
1) Quick win for your schedule this week (no‑shows)
2) Two‑way confirmations for {{Practice}}
3) Fill last‑minute gaps (7‑day free trial)

**Body:**
Hi {{FirstName}} — I’m Bob.

Quick question: when patients don’t confirm or cancel last minute, do you usually find out by phone the day-of?

We built a lightweight SMS system for dental practices that collects **two‑way confirmations** and automates the reschedule prompt when a patient can’t make it. If you keep a small waitlist, it can help fill gaps too.

I can set it up as a **7‑day free trial** for {{Practice}}. If it doesn’t reduce no‑shows, you don’t keep it.

Is there a good time for a 10–12 minute walkthrough?

Legitimacy/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Day 2
**Subject:** Re: confirmations at {{Practice}}

Hi {{FirstName}} — if it helps, typical outcomes we’re targeting:
- fewer no‑shows via explicit confirm (Y/N)
- faster reschedules when someone replies “No”
- fewer “dead slots” when cancellations happen

Are reminders/confirmations currently handled by your software, or manually by the front desk?

— Bob

### Day 4
**Subject:** Can I send a sample message flow?

Hi {{FirstName}},

If you reply “sample,” I’ll send the exact SMS wording + timing we’d run for your appointment types (hygiene vs treatment), and we can decide if it’s worth a free trial.

— Bob

### Day 7
**Subject:** OK to close this out?

Hi {{FirstName}},

Should I close this out for now, or is reducing no‑shows/cancels something you’re actively trying to improve this month?

— Bob

---

## 6) Reply Handling (copy/paste)

### Positive
Awesome — happy to set up a quick walkthrough. What’s the best email/number to coordinate and the appointment types you want to start with (hygiene, consults, treatment)?

### “We already use reminders”
That makes sense. The main difference is two‑way confirmation + automated reschedule when a patient can’t make it (instead of one-way reminders). If I show you the flow in 10 minutes, you can tell me if it’s redundant.

### “Not interested”
Understood — I’ll stop reaching out. If it becomes a priority later, you can reach me at agent_bob_replit+no-show-bot@agentmail.to and the info is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

---

## 7) CRM Operating Cadence (minimum viable)

### Daily (Mon–Fri)
- 30 min: add new leads until you have **25–35 Ready to Contact/day**
- 60 min: send Day 0 emails + contact forms
- 30 min: process replies; schedule demos; update stages
- 30 min: send follow-ups due today (Next Step Date = today)

### Stage SLAs
- S2 -> S3 same day (send initial)
- Any reply -> S7 within 2 hours
- Demo scheduled -> S8 immediately + confirm by email
- Trial live -> S9 with start date + success metric (baseline no-show rate)

### KPI targets (to hit 20–25 locations)
- 500–800 leads total in 30 days
- 35–45% with usable email; rest via contact form + phone
- 8–12% reply rate (multi-touch)
- 2–4% demo booking rate

This engine is ready to run as soon as the first lead batch is populated into the Leads tab and next-step dates are assigned.