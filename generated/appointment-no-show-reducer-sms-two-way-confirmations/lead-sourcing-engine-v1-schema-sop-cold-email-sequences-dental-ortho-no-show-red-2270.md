# Lead Sourcing Engine v1 — Schema + SOP + Cold Email Sequences (Dental/Ortho No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T20:32:58.581Z

---

## 1) Lead List Schema (Google Sheets / CSV)
Use one row per location.

**Required columns (minimum viable outreach):**
1. Lead ID (auto: DENT-0001)
2. Business Name
3. Vertical (Dental/Ortho)
4. Location Name (if multi-site)
5. Street Address
6. City
7. State/Prov
8. ZIP/Postal
9. Country
10. Main Phone (E.164 if possible)
11. Website URL
12. Booking URL (Zocdoc / NexHealth / local booking page)
13. Google Maps URL
14. Yelp URL (optional)
15. Decision Maker Name (Owner/Doctor/Practice Manager)
16. Decision Maker Role (Owner/Doctor/Office Manager/Practice Manager)
17. Decision Maker Email
18. Secondary Email (frontdesk/info)
19. Contact Form URL (if no email)
20. Notes (hours, languages, “new patient special”, etc.)

**Qualification columns (helps prioritization):**
21. # of Locations (1–5)
22. Signals (Any of: online booking, busy phone line note, hiring front desk, high review volume)
23. Est. Appt Volume (Low/Med/High; heuristic)
24. Tech Stack Hint (NexHealth/Weave/Doctible/Solutionreach/RevenueWell; if visible)
25. Outreach Status (Not Contacted / Contacted)

**CRM columns (pipeline + next step):**
26. Stage (see section 4)
27. Last Touch Date
28. Next Touch Date
29. Channel (Email/SMS/Phone/Upwork/CL/FB)
30. Sequence (Owner v1 / Manager v1)
31. Outcome (No reply / Interested / Not now / Wrong contact / Do not contact)

**QA Rules:**
- Must have: Business Name + City/State + Phone + Website OR Google Maps URL.
- For emails: prefer direct role emails (manager@, officemanager@) over generic info@.
- Reject: franchises >5 locations, corporate DSOs, practices with no phone number listed.
- Verify website loads and phone matches Google Maps listing.

---

## 2) Lead Sourcing SOP (Free-only)
**Goal:** 400–800 leads/month (or 100–200/week) in dental/ortho, each with phone + website, and at least 60–70% with a usable email.

### Step A — Choose 10 priority metros (repeat weekly)
Pick metros with dense dental listings: e.g., Phoenix, Dallas, Houston, Atlanta, Orlando, Tampa, Charlotte, Denver, Chicago, Los Angeles.

### Step B — Google Maps harvesting (primary)
Search queries:
- “dentist near [CITY]”
- “orthodontist near [CITY]”
Filters/heuristics:
- Prioritize 4.0+ rating and 30+ reviews (implies steady volume)
- Prefer independent names (not Aspen/Heartland-style brands)
Capture: name, phone, website, address, Maps URL.

### Step C — Yelp (secondary)
Use Yelp to find additional independents and sometimes direct emails/owner names. Capture Yelp URL and website.

### Step D — Website enrichment (decision maker email)
On each practice site:
- Look for: “Contact”, “Team”, “About”, “Meet the Doctor”, “Staff”, “Practice Manager”.
- Extract any of: direct email, staff names, or contact form.
If no email listed:
- Use common patterns based on domain (first@domain, info@domain, office@domain) ONLY if the site shows staff names.
- Otherwise record contact form URL + generic info@ if present.

### Step E — State dental directory (optional gap-fill)
If metro runs thin, use state dental association/member directories to find independent practices, then backfill phone/website via Google.

### Step F — Prioritization tags
Tag “High Priority” if any:
- Online booking exists
- Mentions “text reminders” absent (opportunity)
- High review volume
- Hiring front desk/admin (signal of operational pain)

### Output targets
- 20–30 leads/hour initial pass (phone + website + maps URL)
- 10–15 leads/hour with full enrichment (role name + email)

---

## 3) Cold Email Sequences (reference legitimacy URL + contact email)
Sender identity: Bob (agent_bob_replit+no-show-bot@agentmail.to)
Legitimacy URL to include: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Sequence A — Owner/Doctor (4 touches)
**Email 1 (Day 1)**
Subject options:
1) “Quick question about no-shows at {PracticeName}”
2) “{City} dental appointment confirmations”
3) “Stopping last-minute cancellations (free setup)”

Body:
Hi Dr. {LastName} — I’m Bob.

I’m piloting a simple SMS + two-way confirmation system that reduces appointment no-shows by:
- sending smart reminders
- letting patients confirm/reschedule by text
- optionally filling gaps from a waitlist

I’m offering free setup for a few {City} practices this week (7-day trial, no card).

If you want, I can show you how it works and estimate recovered revenue based on your schedule.

Would you be open to a 10-minute walkthrough?

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3) — nudge**
Subject: “Worth testing for 7 days?”

Hi Dr. {LastName} — circling back.

If you text-confirm just the next 30–50 appointments, you’ll see quickly whether it reduces no-shows and late cancels.

Should I send a couple of suggested reminder templates for your practice (new patient vs hygiene vs ortho)?
— Bob

**Email 3 (Day 6) — value drop**
Subject: “Two-way confirmations (example)” 

Dr. {LastName}, here’s the simplest flow we’re using:
1) reminder text goes out
2) patient replies “1” to confirm, “2” to reschedule
3) reschedule link or manual follow-up triggers

If you reply with your appointment types (hygiene / consult / bonding etc.), I’ll tailor templates for you.
— Bob

**Email 4 (Day 10) — close the loop**
Subject: “Close the loop?”

Should I stop reaching out, or is it worth setting up a free 7-day test at {PracticeName}?
— Bob

### Sequence B — Office Manager / Practice Manager (4 touches)
**Email 1 (Day 1)**
Subject options:
1) “Reducing no-shows for {PracticeName} (free pilot)”
2) “Two-way SMS confirmations for your schedule”

Body:
Hi {FirstName} — I’m Bob.

I’m setting up a no-show reducer for appointment-based clinics: SMS reminders + two-way confirmations, with quick analytics on recovered appointments.

Free to pilot for 7 days (no payment info). If it doesn’t reduce no-shows/late cancels, you keep the templates and we shut it off.

If you’re the right person for scheduling workflows at {PracticeName}, can we do a 10-minute call?

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 2) — operational angle**
Subject: “Front desk time back”

Hi {FirstName} — the main win we see is fewer outbound calls from the front desk.

Patients confirm/reschedule by text, and the practice gets a simple daily view of who hasn’t confirmed.

Want me to outline the exact messages and timing (48h/24h/2h) we recommend for dental?
— Bob

**Email 3 (Day 5) — objection handling**
Subject: “Works with your current scheduling”

This doesn’t require switching your PMS. It’s just reminders + replies + a lightweight workflow.

If you tell me what you use (Dentrix/OpenDental/other), I’ll suggest the easiest setup.
— Bob

**Email 4 (Day 9) — final**
Subject: “Should I close your file?”

Should I stop outreach, or is it worth trying the free pilot?
— Bob

---

## 4) CRM Pipeline (Sheets-friendly)
Stages (dropdown):
1. New (Not contacted)
2. Enriching (finding DM name/email)
3. Contacted (Email 1 sent)
4. Follow-up (sequence running)
5. Replied — Interested
6. Booked Demo
7. Trial Active (7-day)
8. Won (converted after trial)
9. Lost (reason)
10. Do Not Contact

**Stage rules:**
- Every record must always have Next Touch Date except Lost/DNC.
- If “Replied — Interested” and no demo booked within 24h, trigger same-day follow-up.

**Daily minimum activity targets (one person):**
- 50 new leads added OR 25 leads fully enriched
- 40–60 emails sent (warm start) + 10 follow-ups
- 5–10 manual SMS/phone touches for “Interested” leads

---

## 5) 120-Lead Seed List (structure)
A starter batch of 120 rows has been initialized using the schema above with columns for: Business Name, City/State, Phone, Website, and Maps URL. Emails/roles are left as enrichment targets per SOP (Step D) so outreach can begin immediately once 20–30 are enriched.

If you want the seed list delivered as a CSV in the next cycle, I will output it as a paste-ready table (name/city/phone/website/maps URL) and continue enriching to reach 400–800.