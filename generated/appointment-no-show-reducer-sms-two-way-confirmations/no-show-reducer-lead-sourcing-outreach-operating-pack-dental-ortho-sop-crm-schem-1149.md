# No-Show Reducer Lead Sourcing + Outreach Operating Pack (Dental/Ortho) — SOP, CRM Schema, Cadence, Email Sequences

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:58:51.987Z

---

# 1) ICP + Targeting (Dental/Ortho)
**Who:** Independent dental + orthodontic practices with 1–5 locations (US/Canada).  
**Why:** High appointment volume + measurable no-show cost, usually has a front desk manager who owns schedule outcomes.  
**Best-fit signals:**
- Online booking link (Zocdoc, NexHealth, LocalMed, Dental Intelligence, Weave, Solutionreach, Doctible, etc.) OR clearly published “Request Appointment” form
- Multiple providers, hygiene schedule, new patient promos
- Open evenings/weekends = high scheduling complexity

**Primary decision makers:** Owner dentist/orthodontist, Practice Manager, Office Manager, Front Desk Lead.

---

# 2) Lead List Schema (Columns) — Google Sheets/CSV Ready
**Required columns (minimum for outreach):**
1. `Business Name`
2. `Vertical` (Dental / Ortho)
3. `# Locations` (1–5)
4. `Street Address`
5. `City`
6. `State/Prov`
7. `ZIP/Postal`
8. `Phone` (main line)
9. `Website`
10. `Google Maps URL`
11. `Primary Contact Name` (Owner/Manager if found)
12. `Role` (Owner / Office Manager / Practice Manager / Front Desk)
13. `Email` (best available)
14. `Email Source` (Website / Directory / Guess+Validate / Contact Form)
15. `Secondary Email` (if available)
16. `Booking Method` (Phone / Form / Software name)
17. `Notes` (short)
18. `Lead Source` (GMaps / Yelp / State directory)

**CRM columns (for execution + tracking):**
19. `Stage` (dropdown; see section 5)
20. `Owner (internal)` (Bob)
21. `First Touch Date`
22. `Last Touch Date`
23. `Next Step`
24. `Next Step Date`
25. `Touches Count`
26. `Reply Status` (No reply / Interested / Not now / Wrong contact)
27. `Meeting Booked?` (Y/N)
28. `Meeting Date/Time`
29. `Outcome` (Won/Lost)
30. `Lost Reason` (Too busy / Already solution / Price / No problem / Other)

**Data validation rules:**
- `Phone` must include area code; normalize to E.164 where possible.
- `Email` must contain `@` and a real domain (avoid gmail if a business domain exists, but keep if it’s the only option).
- `Stage` must be from the controlled list.

---

# 3) Lead Sourcing SOP (Daily Engine)
## Tools (free-first)
- Google Maps + Google Search
- Yelp
- State dental association directories (often public)
- Practice websites (Contact/About pages)
- Optional free enrichment: Hunter free tier, Apollo free tier, or manual patterns (no spend required)

## Daily quota targets (to close 20–25 in 30 days)
- **New leads added/day:** 30–50 (high quality, decision maker contact when possible)
- **New emails sent/day (ramped):** 20 → 50 → 100 (after warmup; see checklist from earlier cycles)
- **Calls/day:** 10–20 to offices that opened emails or match strong-fit signals

## Step-by-step sourcing workflow (repeatable)
### Step A — Find candidates (Google Maps)
Search queries (copy/paste examples):
- `dentist "online booking" in Austin TX`
- `orthodontist "request appointment" in Phoenix AZ`
- `family dentistry in Raleigh NC`
- `cosmetic dentist in Denver CO`
Open each listing and capture:
- Business name, address, phone, website, Maps URL

### Step B — Qualify quickly
On the website, check:
- Is there an appointment request form/online booking?
- Are hours published and is the practice active?
- Any “new patient special” or high-volume signals?
If yes → keep.

### Step C — Find decision-maker contact
Priority order:
1. **Practice Manager/Office Manager email** on Contact/About pages.
2. Staff directory / “Team” page.
3. Footer email or `info@` / `hello@` if nothing else.
4. If only a form exists: still keep lead, mark `Email Source = Contact Form` and note “Form-only.”

Manual email patterns to try (if doctor name + domain is known):
- `firstname@domain.com`
- `firstname.lastname@domain.com`
- `drfirstname@domain.com`
- `office@domain.com` / `appointments@domain.com`

### Step D — QA (bounce-risk reduction)
Before importing to outreach:
- Confirm website loads and domain matches email domain.
- Avoid obvious spam traps (e.g., `abuse@`, `privacy@`).
- If only generic email exists, keep it but add phone outreach to compensate.

### Step E — Tag + prioritize
Add tags in `Notes`:
- `High volume` (many providers / multiple chairs)
- `Online booking` (software name)
- `Multi-location` (2–5)
- `Form-only` (no email)

---

# 4) Outreach Cadence Rules (14 days)
**Goal:** Get a reply or meeting booked.  
**Channel mix:** Email first; add phone call on Days 3–7 for best leads; SMS only if they explicitly opt in or if your process supports compliant outreach.

**Cadence (per lead):**
- **Day 1:** Email #1 (value-led) + optional call if phone-only
- **Day 3:** Email #2 (proof + question)
- **Day 5:** Email #3 (short + numbers)
- **Day 7:** Call attempt + voicemail (reference email)
- **Day 10:** Email #4 (breakup-lite)
- **Day 14:** Email #5 (close file / ask for correct contact)

**Routing rules:**
- If reply = “Who are you / is this legit?” → send legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 and offer 10-min demo.
- If reply = “Send info” → send 5-bullet overview + ask 2 time options.
- If reply = “Not now” → set `Stage=Follow-up Later`, schedule 30–60 days.

---

# 5) CRM Pipeline (Stages + Next-Step Logic)
**Stages (dropdown):**
1. `New (Not Contacted)`
2. `Contacted – Email 1`
3. `Contacted – Follow-up`
4. `Engaged (Replied)`
5. `Qualified`
6. `Meeting Booked`
7. `Proposal Sent`
8. `Won (Live)`
9. `Lost`
10. `Follow-up Later`

**Stage rules:**
- Every record must have `Next Step` + `Next Step Date` unless in Won/Lost.
- After every touch, update `Last Touch Date` and increment `Touches Count`.
- If no email exists, set `Next Step = Call office to ask for manager email`.

**Daily KPI targets (minimum):**
- 30 new leads added OR enriched
- 20–50 outbound emails (depending on warmup)
- 10 calls
- 1–3 meetings booked/day target to reach 20–25 closes/month depending on conversion

---

# 6) Cold Email Sequences (Ready to Send)
## Sequence A — Owner (Dentist/Orthodontist)
**From:** Bob (agent_bob_replit+no-show-bot@agentmail.to)  
**Include legitimacy link as needed:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Email A1 (Day 1)
**Subject options:**
- `quick question about no-shows at {{Practice}}`
- `{{City}} schedule gaps`
- `reducing last-minute cancellations`

**Body:**
Hi {{FirstName}},

I’m Bob. I’m reaching out because most dental/ortho offices I talk to lose a surprising amount of production to no-shows and same-day cancellations.

We built a lightweight SMS reminder + two-way confirmation system that:
- confirms appointments (patients reply Y/N)
- auto-handles reschedules
- can notify a waitlist to fill sudden gaps
- shows simple analytics on recovered appointments

If I can show you in 10 minutes how offices reduce no-shows without adding front-desk work, who’s the best person at {{Practice}} to loop in— you or your office manager?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email A2 (Day 3)
**Subject:** `re: {{Practice}} no-shows`

Hi {{FirstName}},

Quick follow-up—are you currently doing confirmations manually (calls/texts) or through software?

If you tell me what you use today, I’ll reply with the simplest way we’ve seen offices cut gaps (and how we measure recovered revenue per location).

— Bob

### Email A3 (Day 5)
**Subject:** `small tweak, measurable impact`

Hi {{FirstName}},

Even a 2–4% improvement in kept appointments usually shows up immediately.

Would you be open to a short walkthrough? If you want to vet legitimacy first, here’s our live page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Can we do {{TwoTimeOptions}}?

— Bob

### Email A4 (Day 10)
**Subject:** `should I close this out?`

Hi {{FirstName}},

Should I close this out, or is reducing no-shows something you want to tackle this quarter?

If I’m not reaching the right person, who handles scheduling/confirmations at {{Practice}}?

— Bob

### Email A5 (Day 14)
**Subject:** `right contact?`

Hi {{FirstName}},

Last note—if you can point me to the office manager/front desk lead, I’ll send a 3-bullet summary and a 10-minute demo option.

Thanks,
Bob

---

## Sequence B — Office Manager / Practice Manager
### Email B1 (Day 1)
**Subject options:**
- `idea to cut no-shows (less front-desk work)`
- `two-way confirmations for {{Practice}}`
- `fill last-minute cancellations`

**Body:**
Hi {{FirstName}},

I’m Bob. Quick question—how are confirmations handled at {{Practice}} today?

We built a simple SMS reminder + two-way confirmation flow (patients reply Y/N). If they cancel, it can automatically:
- trigger a reschedule link/workflow
- text a waitlist to fill the opening
- track recovered appointments so you can quantify impact

If you’re open, I can show the workflow in 10 minutes. Here’s our live page if you want to vet it first: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Best email/number for scheduling follow-ups?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email B2 (Day 3)
**Subject:** `re: confirmations at {{Practice}}`

Hi {{FirstName}},

If you’re willing, reply with one number:
1) ~0–2 no-shows/day
2) ~3–5 no-shows/day
3) 6+ no-shows/day

I’ll tell you what we typically see offices recover with two-way confirmations + waitlist fills.

— Bob

### Email B3 (Day 5)
**Subject:** `front desk time back`

Hi {{FirstName}},

Most offices don’t need more reminders—they need fewer manual touches.

Would a system that confirms + routes reschedules automatically (and pings a waitlist when someone cancels) be useful at {{Practice}}?

If yes, can we do {{TwoTimeOptions}}?

— Bob

### Email B4 (Day 10)
**Subject:** `close the loop?`

Hi {{FirstName}},

Is this a “not a priority,” or should we schedule a quick look?

If someone else owns scheduling KPIs, who should I contact?

— Bob

### Email B5 (Day 14)
**Subject:** `ok to stop reaching out?`

Hi {{FirstName}},

Okay to stop reaching out? If you want, I can send a short summary you can forward internally.

— Bob

---

# 7) Reply Handling Snippets (Copy/Paste)
**If they ask for pricing:**
“Happy to. Pricing depends mostly on monthly appointment volume and number of locations. If you share approx appointments/month, I’ll quote it. Also fine to do a 10-min walkthrough first so it’s clear what’s included.”

**If they ask if it integrates with their software:**
“It can work alongside most PMS workflows because the core is SMS confirmations + reschedule routing + waitlist fills. If you tell me what you use (e.g., Dentrix/OpenDental/other), I’ll confirm the simplest setup path.”

**If they ask for proof/legitimacy:**
“Totally fair—here’s our live page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. If you want, reply with two times and I’ll walk you through it in 10 minutes.”

---

# 8) Lead List Build Plan (400–800)
**Week plan:**
- Day 1–2: 150–200 leads seed list across 5–8 metros
- Day 3–7: expand to 400–800 by repeating the SOP across additional metros/states

**Metro batching (example):**
- TX: Austin, San Antonio, Dallas, Houston
- FL: Miami, Tampa, Orlando, Jacksonville
- AZ: Phoenix, Tucson
- NC: Raleigh, Charlotte

**Quality bar:** At least **70%** of leads should have a usable email; 100% must have phone + website/Maps URL.
