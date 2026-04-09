# Lead Sourcing Engine v1 — Dental/Ortho (SOP + Lead Schema + CRM Sheet + Cold Email Sequences)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T17:17:47.776Z

---

## 1) ICP (so the list stays tight)
**Vertical:** Independent dental + orthodontic practices (1–5 locations)
**Geo:** US (start with top metros; expand statewide)
**Best-fit signals:**
- Answers phone / has front desk staff
- Online booking OR “Request Appointment” form
- Uses PMS/booking tools (often visible in page source or footer: NexHealth, Weave, Solutionreach, Doctible, YAPI, LocalMed, Dental Intel, Zocdoc)
**Decision makers to target:** Practice Owner/Dentist, Practice Manager, Office Manager, Operations/Regional Manager (multi-location)

---

## 2) Lead list schema (copy into Sheets / CSV)
Required columns (minimum viable):
1. Lead ID (auto: YYYYMMDD-###)
2. Practice Name
3. Vertical (Dental / Ortho)
4. Website
5. Google Maps URL
6. Address
7. City
8. State
9. ZIP
10. Phone
11. Location Count (1 / 2–5 / unknown)
12. Primary Contact Name
13. Primary Contact Title (Owner / Practice Manager / Office Manager)
14. Primary Contact Email
15. Secondary Contact Name
16. Secondary Contact Title
17. Secondary Contact Email
18. Contact Source (Website / Google / Yelp / Directory)
19. Booking Method (Call-only / Form / Online scheduler)
20. Suspected Software (Weave/Solutionreach/etc.)
21. No-show pain hint (notes from reviews / “missed appt fee” mention / “text reminders” mention)
22. Outreach Status (Not Started / Attempting / Valid)
23. First Touch Date
24. Next Touch Date
25. Last Touch Channel (Email/SMS/VM/CL/FB/Upwork)
26. Owner/Manager LinkedIn (optional)
27. Notes

### QA / validation rules (to keep deliverability high)
- **No generic emails unless nothing else exists** (info@, hello@ are acceptable only as fallback; prioritize named emails).
- Email must pass quick checks: contains @, domain matches website domain when possible, avoid obvious typos.
- Phone must be direct practice number (not call tracking if avoidable; if tracking, still okay).
- If website missing, still acceptable if Google listing + phone present, but mark “Website missing.”

---

## 3) Free-tool lead sourcing SOP (repeatable daily)
### Step A — Choose a metro + quota
Start with 10 metros/week. Target **40–80 leads per metro**.
Recommended initial metros: NYC, LA, Chicago, Houston, Phoenix, Philly, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, SF, Columbus, Charlotte, Seattle.

### Step B — Google Maps collection (fastest)
Search queries (rotate):
- “dentist near [CITY]”
- “orthodontist [CITY]”
- “family dentistry [CITY]”
Open listings → capture: name, phone, website, address, maps URL.
Filter out: chains (Aspen Dental, Heartland, Smile Brands, etc.) unless location manager contact is obtainable.

### Step C — Yelp as secondary source
Search “Dentists” and “Orthodontists” in same city.
Capture: website + phone + business name. Use Yelp only to locate; confirm details on practice site.

### Step D — Decision-maker email extraction (free)
1) Go to practice website.
2) Look for: “Contact”, “Team”, “About”, “Meet the Doctor”, “Leadership”, “Practice Manager”, “Office Manager”.
3) Check footer + privacy policy for emails.
4) If only a form exists:
- Check page source for mailto:
- Check “/contact”, “/about”, “/team” URLs manually.
5) Pattern inference (only if you have at least one real email on site):
- Derive format: first@domain, first.last@domain, initiallast@domain.
- Use the same format for manager name found on the team page.

### Step E — State dental directories (gap filler)
Use “[STATE] dental board license lookup” and “[STATE] dental association find a dentist”.
These often provide practice name/address; use Maps to retrieve phone + website.

### Step F — Booking + software hints
- Look for “Book Online” buttons and note vendor (NexHealth/LocalMed/Zocdoc).
- Look for site scripts/widgets (Weave, Solutionreach, Doctible, YAPI).
Log in “Suspected Software.” This helps personalization.

### Step G — Final QA before outreach
- Ensure at least **phone + one email** OR **phone + website**.
- If only phone+website: keep lead, but set Outreach Status = Attempting and plan to call for email.

---

## 4) CRM in Google Sheets (tabs + dropdowns)
### Tab 1: LEADS (master)
Use the schema above.

### Tab 2: PIPELINE (operational view)
Columns:
- Lead ID
- Practice Name
- Primary Contact
- Email
- Phone
- Stage (dropdown)
- Next Step (text)
- Next Touch Date
- Last Touch Date
- Last Touch Outcome (dropdown)
- Notes

**Stage dropdown values:**
1. New (Not Contacted)
2. Contacted — Awaiting Reply
3. Engaged — Questions
4. Demo Scheduled
5. Trial Live (Free 7 days)
6. Won (Paid / Convert)
7. Lost
8. Nurture

**Outcome dropdown values:**
- Opened (if tracked) / Replied / OOO / Bounce / Wrong Person / Call Connected / VM Left / Not Interested / Interested Later

### Tab 3: ACTIVITY LOG
- Date
- Lead ID
- Channel
- Message ID / Subject
- Outcome
- Next step

### Tab 4: METROS + QUOTAS
- Metro
- Target leads
- Leads collected
- Leads contacted
- Replies
- Demos

---

## 5) Outreach cadence rules (simple, repeatable)
**Day 1:** Email 1 (value + question) + same-day call (optional) 
**Day 3:** Email 2 (case-style math + CTA) 
**Day 5:** Email 3 (two-way confirmation angle) 
**Day 8:** Breakup email (permission + close the loop) 
If phone is available and you’re calling: Day 2 and Day 6 quick calls (VM okay).

CTA always points to legitimacy + reply-based booking:
- Website legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-eronacta.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

---

## 6) Cold email sequences (ready to send)
### Sequence A — Practice Owner / Dentist
**Subject options (rotate):**
1) Quick question about missed appointments
2) Reducing no-shows at {Practice}
3) Two-way confirmations for appointments
4) {City} dental no-shows

**Email 1 (Day 1):**
Hi {FirstName} — I’m reaching out because most dental offices lose a meaningful amount of chair time to last‑minute cancels + no‑shows.

We built a lightweight appointment no‑show reducer that:
- sends SMS reminders,
- collects two‑way confirmations (“Confirm / Reschedule”),
- auto-handles reschedules, and
- can pull from a waitlist to fill gaps.

If you tell me your average no‑show rate (roughly), I’ll send back a quick estimate of recovered revenue for {PracticeName}.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-eronacta.picard.replit.dev/sites/2

Open to a 10‑minute walkthrough this week? If easier, just reply “yes” and I’ll propose times.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3):**
Hi {FirstName} — quick follow up.

Even a small improvement (e.g., 2–4 recovered appointments/week) is often worth thousands/month for a single location.

Would it be unreasonable to test this free for 7 days at {PracticeName}? If you reply with your appointment volume/day and typical no-show %, I’ll do the math and send it back.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 3 (Day 5):**
{FirstName}, the big difference vs. “generic reminders” is two-way replies.

Patients can confirm or reschedule by texting back, and staff doesn’t have to chase. If you already use reminders, this usually plugs the gap where reminders don’t get a response.

Should I speak with whoever owns scheduling operations (practice manager/office manager), or is that you?

— Bob

**Email 4 (Day 8 breakup):**
Totally fine if this isn’t a priority right now.

If you’d like, reply with “later” and I’ll circle back next month. Otherwise I’ll close the loop.

— Bob

### Sequence B — Office Manager / Practice Manager
**Subject options:**
1) Quick way to confirm/reschedule via SMS
2) Less time chasing confirmations
3) No-show reduction at {Practice}

**Email 1 (Day 1):**
Hi {FirstName} — quick question.

Do you currently have a process for two-way confirmations (patients can text back “confirm” or “reschedule”), or is it mainly one-way reminders?

We built a simple no-show reducer that automates:
- reminders,
- two-way confirmations,
- reschedules, and
- waitlist fills for last-minute openings.

If you want to sanity-check it, here’s the legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-eronacta.picard.replit.dev/sites/2

If you reply with your current no-show % (rough), I’ll send back a quick estimate of openings recovered per week.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3):**
Hi {FirstName} — following up.

The goal is: fewer inbound/outbound calls, fewer surprises, and a cleaner schedule.

Is it okay if I send 2–3 questions to understand your current reminders + reschedule workflow?

— Bob

**Email 3 (Day 5):**
If you’re the right person: would you be open to a 10‑minute walkthrough? Free 7-day trial, no card.

If not, who’s best to talk to about appointment reminders/no-shows?

— Bob

---

## 7) Daily pipeline sizing (to close 20–25 locations in 30 days)
Assumptions (conservative):
- 2% reply rate → 8 replies per 400 emails
- 30–40% of replies convert to a demo → ~3 demos
- 30% of demos convert to trial → ~1 trial/day
- 60% of trials convert → ~0.6 wins/day (~18 wins/month)

To reach 20–25, increase either volume (600–800/wk) or add Craigslist/FB/Upwork inbound.

---

## 8) What “good” looks like for the first seed list (150–200)
- 70%+ have direct email (named or manager)
- 95% have phone
- 80% have website
- At least 25% have a software/booking clue for personalization

This is ready to paste into Google Sheets and start compiling leads immediately using only free sources.