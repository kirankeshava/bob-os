# Outbound Lead Engine Playbook (Dental/Ortho) — Lead Schema, CRM, SOP, and Cold Email Sequences

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T06:33:00.307Z

---

## 1) ICP + Targeting Filters (Dental/Ortho)
**Best-fit:** Independent dental + orthodontic practices (1–5 locations) that book by phone and/or online. Ideal signals: “Request Appointment” form, online booking widget, multiple operatories/providers, high review volume (busy), and mentions of “same-day appointments.”
**Avoid (for speed):** Hospital systems, DSO/corporate chains, practices with no working phone, or only insurance call centers.

## 2) Lead List Schema (400–800 scale-ready)
Create one row per location.

**Core identity**
- Lead_ID (auto: YYYYMMDD-###)
- Business_Name
- Location_Name (if multi-location)
- Address
- City
- State
- Zip
- Country
- Google_Maps_URL
- Yelp_URL (optional)
- Website_URL
- Main_Phone

**Decision maker + contacts**
- Owner/Doctor_Name (if found)
- Office_Manager_Name (if found)
- Primary_Email (best guess decision-maker)
- Secondary_Email (fallback)
- Contact_Page_URL
- Email_Source (Website/Google/Yelp/Directory/Guess)

**Ops + tooling signals (optional but useful)**
- Booking_Method (Phone/Online/Both)
- Booking_Tool (Zocdoc / NexHealth / Solutionreach / LocalMed / unknown)
- Hours_Listed (Y/N)
- Reviews_Count
- Notes (e.g., “offers Invisalign; open Sat; ‘walk-ins welcome’”)

**Outreach + CRM**
- Stage (dropdown; see section 4)
- Last_Touch_Date
- Next_Touch_Date
- Channel_Last (Email/SMS/Call/Upwork/FB/CL)
- Outcome_Tag (No reply / Interested / Not now / Wrong contact / Do not contact)
- Meeting_Link_Sent (Y/N)

### QA Rules (non-negotiable)
1) **Phone must be valid** (matches website footer or Google). If mismatch: verify by calling later; mark “Phone_Unverified.”
2) **Website must load** (if no website, keep lead only if Google listing has email or strong signals).
3) **Email quality tier:**
   - Tier A: direct email on site (info@, office@, manager@, doctor@)
   - Tier B: contact form only (still viable; note Contact_Page_URL)
   - Tier C: guessed email (only if domain exists and format inferred; mark Email_Source=Guess)

## 3) Lead Sourcing SOP (Daily Engine)
**Goal:** 80–120 fresh leads/day per operator; scale to 400–800/week with consistency.

### Step A — Build city batches
Pick 10–20 metros/states per day. Example search set:
- “dentist near me” + city
- “orthodontist” + city
- “cosmetic dentistry” + city

### Step B — Google Maps collection (fast)
For each listing:
1) Open listing → capture Business_Name, Address, Phone, Website, Reviews_Count, Maps URL.
2) If website exists, open it in a new tab.
3) Add row to sheet immediately (don’t wait).

### Step C — Website scrape (contact capture)
On the practice site, check in this order:
1) Footer (often has main email)
2) Contact page
3) Team/About page (office manager name sometimes)
4) Privacy policy (occasionally lists admin email)
Capture:
- Primary_Email / Secondary_Email
- Owner/Doctor name (DDS/DMD)
- Office manager name (if visible)
- Contact_Page_URL

### Step D — Booking/No-show signal capture
Look for:
- Online booking widget (Zocdoc/NexHealth/LocalMed/etc.)
- “Text us” buttons
- “Missed appointment” / cancellation policy
- Waitlist mentions
Record Booking_Method and Booking_Tool if obvious.

### Step E — Enrichment + validation (free-first)
- If only a contact form exists, keep lead (still outreachable).
- If domain exists and no email is published, you may infer format ONLY if staff emails appear (e.g., jane@domain). Otherwise leave blank.
- Do quick deliverability sanity check: domain is correct, no typos, not a parked domain.

### Step F — Dedup + handoff
- Deduplicate by Phone + Address.
- Set Stage=“New—Not Contacted” and Next_Touch_Date = today.

## 4) CRM Pipeline (Google Sheets-friendly)
**Stages (dropdown):**
1. New—Not Contacted
2. Contacted—Awaiting Reply
3. Engaged—Questions
4. Demo Booked
5. Trial Live (Free 7-day)
6. Won (Convert after trial)
7. Lost—Not a Fit
8. Lost—No Response (30d)
9. Do Not Contact

**Stage rules:**
- Every touch updates Last_Touch_Date and sets Next_Touch_Date per cadence.
- If reply = “not now,” move to Engaged—Questions and set Next_Touch_Date +30 days.
- If hard bounce/wrong email, keep lead but set Outcome_Tag=Wrong contact; attempt alternate channel (call/contact form).

## 5) Cold Email Sequences (Owner + Office Manager)
**Legitimacy references (include in signatures):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact: agent_bob_replit+no-show-bot@agentmail.to

### Sequence A — Practice Owner / Doctor (DDS/DMD)
**Email A1 (Day 1)**
**Subject options:**
1) Quick win on no-shows at {{Practice}}
2) Reduce last-minute cancellations?
3) {{City}} dental no-show question

Body:
Hi Dr. {{LastName}} — I’m Bob.

I’m reaching out because most dental practices I talk to lose a surprising amount of chair time to “forgot / running late / last-minute cancel.”

I’m running a **free 7-day pilot** that sends smart SMS reminders, collects two-way confirmations (Y/N), and auto-prompts reschedules so the team spends less time chasing patients.

If you’re open to it, I can share a simple baseline estimate of what no-shows are costing per week at {{Practice}} and what we typically recover.

Worth a 10-minute look this week?
— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

**Email A2 (Day 3)**
**Subject:** Re: {{Practice}} no-shows

Hi Dr. {{LastName}}, quick follow-up.

If you tell me your average appointment value (or just ballpark), I’ll send back a one-page estimate of revenue recovered if you reduce no-shows by even 20–30%.

Also: the pilot is **no cost** and doesn’t require changing your booking flow—just adding confirmations + reschedule prompts.

Open to trying it for 7 days?
— Bob

**Email A3 (Day 6)**
**Subject:** Should I talk to your office manager?

Hi Dr. {{LastName}} — totally fine if you’re not the right person to route this.

Who handles scheduling and confirmations at {{Practice}}? If you point me to the office manager, I’ll send a short overview and we can set up the free pilot.

— Bob

**Email A4 (Day 10)**
**Subject:** Closing the loop

Hi Dr. {{LastName}}, I don’t want to be a pest.

If reducing no-shows and last-minute cancellations isn’t a priority right now, reply “not now” and I’ll close the loop.

If it is, reply “pilot” and I’ll send next steps for the free 7-day trial.

— Bob

### Sequence B — Office Manager / Front Desk
**Email B1 (Day 1)**
**Subject options:**
1) Cutting no-shows without more calls
2) Confirmations + easy reschedules (free pilot)
3) Front desk time-saver at {{Practice}}

Body:
Hi {{FirstName}} — I’m Bob.

Quick question: do you handle appointment confirmations at {{Practice}}?

I’m offering a **free 7-day pilot** that reduces no-shows by sending SMS reminders, collecting two-way confirmations, and prompting reschedules automatically (so your team isn’t stuck calling/texting all day).

If you want, I can send a 3-bullet breakdown and you can decide if it’s worth testing.

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

**Email B2 (Day 3)**
**Subject:** Re: confirmations at {{Practice}}

Hi {{FirstName}}, following up.

Most offices use the pilot for:
1) Confirming patients automatically (Y/N)
2) Catching reschedules earlier (instead of day-of cancellations)
3) Filling gaps from a short waitlist

If I send a setup checklist, would you be the right person to coordinate, or should I loop in the doctor?

— Bob

**Email B3 (Day 6)**
**Subject:** OK to send details?

Hi {{FirstName}} — can I send details here, or is there a better email for scheduling/operations?

If you prefer, I can send the overview via your contact form instead.

— Bob

**Email B4 (Day 10)**
**Subject:** Last touch

Hi {{FirstName}}, last note from me.

Reply “pilot” if you want to run the free 7-day test, or “no” and I’ll stop reaching out.

— Bob

## 6) Outreach Cadence Rules (14 days)
**Daily target (per operator):** 60 new leads touched/day + 60 follow-ups/day once pipeline fills.

**Cadence (email-first; call optional):**
- Day 1: Email 1 (A1 or B1)
- Day 3: Follow-up (A2/B2)
- Day 4: Optional call to main line: “Who handles confirmations/scheduling?” log name/email
- Day 6: Follow-up (A3/B3)
- Day 8: Optional contact form submission if no email reply
- Day 10: Breakup email (A4/B4)
- Day 14: If still no response → Stage = Lost—No Response (or recycle in 30 days)

**Stop conditions:**
- If they say “not interested” → Lost—Not a Fit (do not continue)
- If they ask timing → set Next_Touch_Date per their timeline
- If they book a call → Demo Booked, pause outbound

## 7) Reply Handling (quick scripts)
**If interested:**
“Great — want to run the free 7-day pilot? If you share (1) your scheduling email/number and (2) typical reminder timing, I’ll send setup steps. You can also reach me at agent_bob_replit+no-show-bot@agentmail.to and see the overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

**If ‘we already use reminders’:**
“Totally — most offices do. The difference here is **two-way confirmations + automated reschedule prompts + basic recovered revenue analytics**. Open to a free 7-day side-by-side test?”

**If ‘send info’:**
Send 5 bullets max + link + ask one question: “Who should coordinate scheduling for the pilot?”

## 8) What to execute next (operator checklist)
1) Start a city batch (50 leads) from Google Maps.
2) Fill lead schema fields; enforce QA rules.
3) Load into CRM sheet; set Stage + Next_Touch_Date.
4) Send Day-1 emails (owner/manager variant).
5) Book demos and move stages daily.

This playbook is designed to run immediately using only free tools and organic outreach while we compile the first 150–200 leads, then scale to 400–800 per week.