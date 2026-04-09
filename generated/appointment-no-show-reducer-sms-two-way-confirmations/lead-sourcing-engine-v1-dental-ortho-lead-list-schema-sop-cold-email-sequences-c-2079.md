# Lead Sourcing Engine v1 — Dental/Ortho Lead List Schema + SOP + Cold Email Sequences + CRM Cadence + Channel Templates

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T19:36:24.855Z

---

## 1) Target ICP (for fastest list-building + close speed)
**Vertical:** Independent Dental + Orthodontic practices (1–5 locations)
**Geo:** US + Canada
**Best-fit signals:** Scheduling-heavy, phone/front-desk staffed, offers cleanings/consults, has online booking or “Request Appointment” form, mentions no-shows/cancellations, uses PMS/booking tools (Dentrix, Eaglesoft, Open Dental, Ortho2, Weave, NexHealth, Solutionreach).

---

## 2) Lead List Schema (CSV / Google Sheets columns)
**Required columns (minimum viable):**
1. Lead ID (auto: YYYYMMDD-###)
2. Practice Name
3. Specialty (Dental / Ortho)
4. # Locations (1 / 2–5 / unknown)
5. Street Address
6. City
7. State/Province
8. ZIP/Postal
9. Country
10. Main Phone
11. Website URL
12. Primary Contact Email (office/admin) (source URL)
13. Decision Maker Name (Owner/Doctor/Practice Manager) (if found)
14. Decision Maker Email (if found) (source URL)
15. Contact Page URL
16. Booking Link (if present)
17. Booking Tool / Vendor (if visible: NexHealth/Weave/Solutionreach/etc.)
18. Google Rating
19. Google Review Count
20. Notes (e.g., “online booking”, “multiple doctors”, “accepting new patients”)
21. Lead Source (Google Maps / Yelp / State Directory / Website)
22. Last Verified Date
23. Outreach Stage (dropdown)
24. Next Step Date
25. Owner (Bob)

**Validation / QA rules (must pass before outreach):**
- Phone: must be present and formatted; if call tracking number, note it but keep.
- Website: must resolve (not dead); if none, keep but mark “No website”.
- Email: prefer domain email. If only form, record “Form only” + contact URL.
- Duplicate handling: de-dupe on (Practice Name + City) and on phone.
- Decision maker: do NOT guess emails. Only record if directly found on site/LinkedIn/state directory.

**Free enrichment heuristics (no paid tools):**
- Check website footer/contact page for emails.
- Look for “Team”, “About”, “Meet the Doctor”, “Practice Manager”.
- If no email on site: check state dental directory listing (often includes email).
- Yelp sometimes lists email/request-a-quote; record contact URL if email absent.

---

## 3) Lead Sourcing SOP (Free-only) — Build 400–800 Leads
### Daily quota model (solo operator)
- 60–100 new leads/day at high accuracy, scaling with repetition.
- Goal week: 400–800 leads = 4–8 working days.

### Source A: Google Maps (primary)
**Search queries (copy/paste):**
- “dentist near me” + city
- “family dentistry” + city
- “orthodontist” + city
- “invisalign provider” + city
- “cosmetic dentist” + city

**Filters (manual):**
- Prioritize independent practices (no big DSOs unless local multi-location 2–5).
- Prefer review count > 30 (signals steady volume).

**Extraction steps per lead (2–4 minutes each):**
1) Open listing → capture Practice Name, phone, address, rating/reviews.
2) Open website → capture website URL, contact page URL, emails.
3) Check for booking link and vendor clues (NexHealth/Weave/Solutionreach).
4) Record in sheet; set “Last Verified Date = today”.

### Source B: Yelp (secondary)
**Search:** category “Dentists” / “Orthodontists” in city.
- Use Yelp to find additional practices not ranking on Maps.
- Capture website/phone; open website for emails.

### Source C: State/Provincial Dental Association directories (decision-maker enrichment)
**Search queries:**
- “<State> dental association member directory”
- “<State> board of dentistry license lookup”
- “<Province> dental college directory”
Use these to confirm doctor/owner names and sometimes emails.

### Target city list (start with high density)
Top metros to start: Phoenix, Dallas, Houston, Atlanta, Miami, Tampa, Orlando, Denver, Las Vegas, San Diego, Los Angeles, Seattle, Chicago, Philadelphia, NYC boroughs, Boston; Canada: Toronto, Vancouver, Calgary, Edmonton, Ottawa.

---

## 4) CRM Pipeline (Google Sheets-ready stages + rules)
**Stage dropdown values:**
1. New (unworked)
2. Researched (validated contact info)
3. Emailed 1
4. Emailed 2
5. Emailed 3
6. Replied – Interested
7. Replied – Not now
8. Booked Demo
9. Trial Active (7 days free)
10. Closed Won (post-week-1 paid conversion)
11. Closed Lost

**Next-step rules:**
- Every row must have a “Next Step Date” or it’s considered stalled.
- After any reply: set stage + next step within 24 hours.
- Booked Demo: add date/time + outcome notes.

---

## 5) Outreach Cadence (14 days, email-first, optional SMS)
**Cadence goal:** 3 emails + 1 “breakup” over 10–14 days.
- Day 1: Email #1
- Day 3: Email #2
- Day 6: Email #3
- Day 10–14: Breakup
Optional: If a direct phone number is available and local compliance is respected, send a short manual SMS only after an email reply or explicit opt-in.

CTA for all: “Reply ‘yes’ and I’ll set it up” or “book a 10-min demo”.
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

---

## 6) Cold Email Sequences (ready to send)
### Sequence A — Practice Owner / Doctor
**Subject options (rotate):**
1) “Quick idea to cut no‑shows at {{PracticeName}}”
2) “{{City}} practices: fewer gaps next week”
3) “2‑way confirmations for appointments?”

**Email #1 (Day 1):**
Hi Dr. {{LastName}},

I’m Bob. I’m building a simple SMS + two-way confirmation system that reduces no‑shows and last‑minute cancellations for appointment-based practices.

It works like: smart reminders → patient replies YES/NO → if NO, it triggers a reschedule link and can offer the slot to a small waitlist. You also get a basic report showing recovered appointments.

If you’re open to it, I’ll set this up free for 7 days for {{PracticeName}} (no payment collection during the trial). Would you like to see it?

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

– Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email #2 (Day 3):**
Hi Dr. {{LastName}},

Curious—how are you currently confirming appointments? (manual calls/texts, automated reminders, or mostly hope-for-the-best?)

If you want, reply with your appointment volume per day and whether you have a waitlist. I’ll tell you what no‑show reduction is realistic and how many slots you could likely recover.

– Bob
agent_bob_replit+no-show-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

**Email #3 (Day 6):**
Dr. {{LastName}},

Most offices I’m speaking with don’t need “more reminders”—they need **two-way confirmations** + an automatic path when a patient says “NO”. That’s where the gaps get filled.

If I could set up:
- 2-way confirmation texts
- reschedule automation for “NO”
- same-day gap fill from a mini waitlist

…would you try it free for 7 days?

– Bob
agent_bob_replit+no-show-bot@agentmail.to

**Breakup (Day 10–14):**
Hi Dr. {{LastName}},

I haven’t heard back, so I’ll assume reducing no‑shows isn’t a priority right now.

If you want to revisit later, reply “later” and I’ll follow up in a month. If you want the free 7‑day setup now, reply “yes” and I’ll send times for a 10‑minute walkthrough.

– Bob


### Sequence B — Office Manager / Front Desk
**Subject options:**
1) “Cutting no‑shows (less calling for confirmations)” 
2) “Filling last‑minute gaps at {{PracticeName}}”

**Email #1 (Day 1):**
Hi {{FirstName}},

I’m Bob. I’m setting up a lightweight SMS reminder + **two-way confirmation** workflow for practices to reduce no‑shows and last‑minute cancels.

Patients reply YES/NO. If NO, it automatically offers rescheduling and can message a small waitlist to fill the opening—so your team spends less time chasing confirmations.

If you’re the right person for scheduling workflows at {{PracticeName}}, are you open to a 10‑minute look? I can set it up free for 7 days.

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

– Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email #2 (Day 3):**
Hi {{FirstName}},

Two quick questions:
1) Do you confirm mainly by phone calls, texts, or an automated system?
2) When someone cancels late, do you have a waitlist process?

If you reply with those, I’ll suggest a setup that fits your workflow.

– Bob

**Email #3 (Day 6):**
Hi {{FirstName}},

If it helps, the free 7-day trial includes:
- reminder schedule (e.g., 48h + 24h + 2h)
- YES/NO confirmations
- auto-reschedule prompt for NO
- simple “recovered appointments” report

Want me to set it up for {{PracticeName}}?

– Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## 7) Craigslist + FB Group Templates (value-led, low-ban risk)
### Craigslist post (Services > Small Biz Ads / etc.)
**Title:** “Free 7‑day setup: reduce appointment no‑shows (2‑way SMS confirmations)”

**Body:**
If you run a dental/ortho office and deal with last‑minute cancels/no‑shows, I’m offering a free 7‑day setup of a simple system:
- smart SMS reminders
- patients confirm YES/NO
- if NO → reschedule prompt + optional waitlist message
- basic analytics showing recovered appointments

No payment collected during the 7‑day trial.

See details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

### FB Group post (no-link version; add link only if rules allow)
Post:
Dental/ortho office managers — quick question: how are you confirming appointments right now?

I’m building a two‑way SMS confirmation workflow (patients reply YES/NO; NO triggers reschedule and can ping a waitlist). I’m offering a free 7‑day setup to a few practices to get feedback.

If you want details, comment “info” and I’ll DM (or email me: agent_bob_replit+no-show-bot@agentmail.to). If links are allowed in this group, here’s the info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

**Posting rules checklist:**
- Read group rules: links allowed? promos allowed certain days?
- Prefer question-led posts; offer DM.
- Avoid repeated identical copy; rotate 3 variants.
- Reply quickly to comments; move to DM/email.

---

## 8) Cold Email Setup Checklist (free-first, execution order)
1) Use a dedicated sending address (separate from main support inbox).
2) Ensure SPF/DKIM/DMARC are configured for the sending domain (later, when domain exists).
3) Start low volume: 10–20/day for 3 days → 30/day → 50/day, only after replies.
4) Plain-text emails, no images/attachments, 1 link max (the legitimacy URL).
5) Track manually in CRM (stage + next step). Avoid heavy tracking pixels early.

Note: Purchasing a domain/inboxes would be a paid step later; for Week 1, keep volume low and use direct, manual outreach while the seed list is built.
