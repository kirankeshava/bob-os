# Lead Sourcing Engine v1 — Dental/Ortho (Schema + SOP + QA + Cold Email Sequences + Sheets CRM Setup)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T19:54:48.211Z

---

## 1) ICP (to keep leads tight)
**Vertical:** Independent Dental + Orthodontic practices (single location to 5 locations)
**Geo:** US + Canada
**Must have:** Public phone number and a working website (or a strong directory profile)
**Priority signals:** Online booking button, “Request Appointment” form, multiple hygienists/providers, evening/weekend hours, active Google reviews.
**Decision makers:** Owner dentist/orthodontist, Practice Manager, Office Manager, Front Desk Lead.

---

## 2) Lead List Schema (copy into Sheets as columns)
**A. Lead ID** (auto: yyyy-mm-dd + source + row#)
**B. Practice Name**
**C. Specialty** (Dental | Ortho | Pediatric | Cosmetic | Implant)
**D. Location Count** (1 | 2–5 | Unknown)
**E. Address**
**F. City**
**G. State/Province**
**H. ZIP/Postal**
**I. Country**
**J. Google Maps URL**
**K. Yelp URL** (if present)
**L. Website URL**
**M. Main Phone** (format +1XXXXXXXXXX)
**N. Secondary Phone** (optional)
**O. Booking Link** (if visible)
**P. Booking Software Clue** (Zocdoc | Solutionreach | NexHealth | Doctolib | Calendly | Jane | Weave | Unknown)
**Q. Contact Name (DM)**
**R. Contact Title** (Owner | Practice Manager | Office Manager | Front Desk)
**S. Contact Email (Primary)**
**T. Email Source** (Website | Directory | Hunter-style guess | Other)
**U. Confidence Score** (High if on website; Medium if directory; Low if guessed)
**V. Contact Form URL** (if no email)
**W. SMS-OK?** (Yes if they publicly list mobile or allow texting; otherwise Unknown)
**X. Notes** (hours, reviews, any pain signal)
**Y. Stage** (Prospect | Contact Found | Attempting Contact | Replied | Booked | Trial Active | Won | Lost)
**Z. Next Step Date**
**AA. Last Touch** (Email1 | Email2 | Call | VM | SMS | CL Post | FB Post)
**AB. Owner/Manager LinkedIn** (optional)

**Validation rules (QA):**
- Website must load (no parked domains). If no website, require strong Google profile + phone.
- Phone must match at least one of: website header/footer, Google listing, Yelp listing.
- Emails: prefer exact email found on site. If only contact form exists, capture form URL + name.
- Avoid DSOs (corporate chains) unless 2–5 locations and local decision maker is clear.

---

## 3) Free-Only Lead Sourcing SOP (to hit 400–800 leads/week)
### Daily quota target (Week 1)
- **Google Maps:** 30–50 new practices/day
- **Yelp:** 10–20/day (only if it adds missing email/website)
- **State directory pull:** 10–20/day (fills gaps, adds legitimacy)
**Goal:** 50–80 leads/day × 5 days = 250–400/week (scale to 800 by adding metros and using faster enrichment).

### Step-by-step process
**Step 1 — Choose metro batch (15–30 min):**
Pick 3–5 metros/day (e.g., Phoenix, Charlotte, Columbus, Austin, Nashville). Track metros in a separate tab to avoid duplicates.

**Step 2 — Google Maps search (primary source):**
Search queries:
- “dentist near me” + city
- “orthodontist” + city
- “family dentistry” + city
- “cosmetic dentist” + city
Open listings in new tabs. For each listing:
- Capture Practice Name, Address, Phone, Website, Google URL.
- Look for booking/appointment link.
- Add quick note: hours, review count, any signals.

**Step 3 — Website extraction (decision-maker contact):**
On the practice website, check in this order:
1) Footer (often lists email)
2) Contact page
3) “Team” / “Meet the Doctor” / “Our Staff”
4) Privacy policy / Terms (sometimes shows email)
Capture:
- Any listed emails (general + staff)
- Practice manager/office manager name if listed
- Contact form URL if no email
- Booking software clue (widget branding, URL patterns)

**Step 4 — Yelp (only when helpful):**
Use Yelp when Google listing has no website or phone mismatch. Capture Yelp URL + website/phone.

**Step 5 — State/provincial dental directory (trust + extra contacts):**
Search: “{State} dental association directory dentist” or “{Province} dental college register”. Add directory link to Notes when it confirms practice/doctor name.

**Step 6 — De-duplication:**
Before adding a row, search your sheet for phone or website domain. If match, update existing row rather than adding a duplicate.

**Step 7 — Confidence scoring:**
- **High:** email appears on practice website
- **Medium:** email only on directory/Yelp
- **Low:** no email; only contact form

---

## 4) Outreach cadence rules (operational)
- Always set **Next Step Date** on every row.
- Don’t touch a lead more than once per day.
- If no email exists, route to **contact form** + phone call attempt.
- When a lead replies, move to **Replied** within 1 hour and propose 2 time slots.

---

## 5) Cold Email Sequences (reference legitimacy URL + business email)
Sender identity: Bob (No-Show Reducer)
Reply-to: agent_bob_replit+no-show-bot@agentmail.to
Legitimacy URL (include in follow-ups or signature when needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Sequence A: Owner/Doctor (4 touches)
**Email 1 (Day 1) — Subject options:**
1) “quick question about your no-shows”
2) “{PracticeName} appointment confirmations”
3) “idea to reduce last-minute cancels”

Body:
Hi Dr. {LastName} — I’m Bob.

I’m building a simple SMS reminder + two-way confirmation tool that reduces no-shows (patients reply CONFIRM / RESCHEDULE). It also offers a waitlist text to fill gaps when someone cancels.

Would it be crazy to run a free 7‑day pilot for {PracticeName} to measure how many appointments we recover?

If you’re open, tell me who handles scheduling (office manager/practice manager) and I’ll send details.

— Bob
agent_bob_replit+no-show-bot@agentmail.to
(legit page) https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

**Email 2 (Day 3) — Subject:** “re: confirmations at {PracticeName}”
Hi Dr. {LastName} — following up.

Most practices already remind patients, but the big lift is **two-way**: (1) confirm, (2) reschedule automatically, (3) offer that slot to a waitlist.

Want me to map this onto your current process and run it free for 7 days?

— Bob

**Email 3 (Day 6) — Subject:** “who owns scheduling?”
Hi Dr. {LastName} — who’s the best person on your team for appointment reminders and confirmations?

If you point me to them, I’ll reach out once with the 7-day pilot plan.

— Bob

**Email 4 (Day 10) — Subject:** “close the loop”
Hi Dr. {LastName} — should I close the loop on this, or is reducing no-shows something you want to tackle this month?

— Bob

### Sequence B: Office Manager / Practice Manager (5 touches)
**Email 1 (Day 1) — Subject options:**
1) “Cut no-shows with 2-way SMS (free pilot)”
2) “{PracticeName}: confirmations + reschedules by text”
3) “Filling last-minute gaps from a waitlist”

Body:
Hi {FirstName} — Bob here.

I’m testing a lightweight system for dental/ortho offices:
- SMS reminders
- patient replies CONFIRM or RESCHEDULE
- auto-offer cancelled slots to a waitlist
- simple analytics: recovered appointments → recovered revenue

Could I run this free for 7 days at {PracticeName} and report the results?

If yes, what’s the best way you currently track no-shows/cancels (Dentrix/OpenDental notes, spreadsheet, etc.)?

— Bob
agent_bob_replit+no-show-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

**Email 2 (Day 2) — Subject:** “2 quick setup questions”
Hi {FirstName} — to see if this fits, two quick questions:
1) Roughly how many appointments/day do you run?
2) Do you have a short-notice list (patients who want earlier times)?

If you answer those, I can tell you what results are realistic.

— Bob

**Email 3 (Day 4) — Subject:** “sample message flow?”
Hi {FirstName} — want me to send the exact text message flow (reminder → confirm/reschedule → waitlist fill) so you can see if it matches your tone?

— Bob

**Email 4 (Day 7) — Subject:** “still worth trying free for 7 days?”
Hi {FirstName} — still worth trying the free 7‑day pilot, or should I circle back later?

— Bob

**Email 5 (Day 12) — Subject:** “last ping”
Hi {FirstName} — last ping from me. If you’d like, reply with “pilot” and I’ll send 2 time options for a 10‑minute setup call.

— Bob

**Reply handling macros (use manually):**
- If “we already send reminders”: ask if they do two-way confirmations + reschedule + waitlist; offer the analytics + gap-fill angle.
- If “not interested”: ask permission to check back in 60 days.
- If “send info”: respond with 3 bullets + link + propose 2 times.

---

## 6) Google Sheets CRM Setup (free)
Create a single Google Sheet with tabs:
1) **LEADS** (columns A–AB above)
2) **LOOKUPS** (dropdown lists: Stage values, Specialty values, Confidence values, Last Touch values)
3) **DASHBOARD** (simple pivots: leads by stage, touches/day, replies, booked)

**Dropdown stages:** Prospect; Contact Found; Attempting Contact; Replied; Booked; Trial Active; Won; Lost.

**Required fields to move stages:**
- To move to Contact Found: must have Phone + Website/Google URL.
- To move to Attempting Contact: must have Email or Contact Form URL.
- To move to Booked: must have meeting date/time in Notes + Next Step Date.

**Daily operating view:** Filter LEADS where Next Step Date = today and Stage not in (Won, Lost).

---

## 7) Pipeline math (to ensure 20–25 location closes is plausible)
Assumptions for Week 1–2 outbound:
- 2,000 outbound emails over 2 weeks (manually paced)
- 3% reply rate → 60 replies
- 40% of replies book a call → 24 calls
- 50% convert to trial → 12 trials
- 60% of trials convert to paid in later weeks → ~7 wins

To reach 20–25 wins in 30 days, increase top-of-funnel via Craigslist + FB + Upwork + higher daily lead volume, and prioritize fast-close segments (practice managers who feel the pain).

---

## 8) What to do next (execution order)
1) Produce **Seed List v1 (150–200)** using the SOP.
2) Start sending Sequence B (Office Manager) to High-confidence emails first.
3) Post Craigslist value post 1×/day per metro + engage FB groups 3×/week.
4) Stand up Upwork profile + 3 proposals/day using the existing no-show positioning.

All customer-facing references should include:
- Website legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to
