# Lead Sourcing Engine v1 — Dental/Ortho (Schema + SOP + CRM + Cadence + Channel Templates)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:39:12.106Z

---

## 1) Lead List Schema (CSV / Google Sheets columns)
**Required (minimum viable for outreach):**
1. Lead ID (auto: DENT-0001)
2. Practice Name
3. Vertical (Dental / Ortho)
4. Location Count (1–5)
5. City
6. State/Province
7. Country
8. Address
9. Main Phone
10. Website URL
11. Booking Link (if visible)
12. Decision Maker Name (Owner/Doctor/Practice Manager if found)
13. Decision Maker Role (Owner/Doctor/Office Manager/Practice Manager)
14. Best Email (decision-maker preferred; otherwise general)
15. Email Type (DM / Office Manager / Front Desk / General)
16. Source (Google Maps / Yelp / Directory / Referral)
17. Last Verified Date (YYYY-MM-DD)
18. Outreach Status (New / Working / Paused)

**Strongly Recommended Enrichment (improves close rate + personalization):**
19. Second Email
20. Secondary Phone / Textable Line (if listed)
21. Google Rating
22. Review Count
23. Hours (Mon–Fri?)
24. “Online Booking?” (Y/N)
25. Scheduling/CRM hints (e.g., “NexHealth”, “Solutionreach”, “Weave”, “Zocdoc”, “Doctible”, “OpenDental”, “Dentrix” — only if visible)
26. Notes (e.g., “new patient special”, “accepts emergencies”, “same-day”)
27. Personalized Opener (1 sentence from site)

**QA rules (don’t skip):**
- Must have **phone + website or phone + Google listing**.
- Email must contain “@” and a domain; no obvious typos.
- If only a contact form exists, log **Contact Form URL** and set Best Email = “FORM_ONLY”.
- Deduplicate by (Practice Name + Phone) and (Domain).
- Verify the website loads; if not, keep lead but mark Website Status = Broken.

---

## 2) Lead Sourcing SOP (Daily pipeline to 400–800)
**ICP filters (fast close):**
- Independent dental + orthodontic practices, **1–5 locations**, appointment-based, phones answered by staff.
- Prefer those with: online booking, new patient promos, high call volume, or multi-chair schedules.

### Step A — Google Maps capture (primary)
Use Google search with geo modifiers:
- `dentist "City, ST"` / `orthodontist "City, ST"`
- `family dentistry "City"` / `cosmetic dentist "City"`
- `emergency dentist "City"`

**Process (per lead, 2–4 minutes):**
1) Open Google Maps listing → copy: Name, Address, Phone, Website, Rating/Reviews.
2) Open website → find Contact page / Team page.
3) Capture any direct emails. Common patterns:
   - info@, hello@, office@, contact@, appointments@, scheduling@, admin@
4) Find decision maker:
   - Owner/Doctor names on “Team” or homepage.
   - Office Manager often on “Our Team”.
5) If no email is shown:
   - Check footer privacy policy / terms pages (sometimes emails appear).
   - Check “Careers” or “Patient forms” PDFs.
6) If still none: log Contact Form URL; set Best Email = FORM_ONLY.

### Step B — Yelp (secondary) for missing websites/phones
Search Yelp for the same city; some practices list email or alternate phone.

### Step C — State dental association directories (tertiary)
Use state/provincial association “Find a Dentist” to add more leads in sparse metros.

### Daily quotas (realistic, repeatable)
- **Solo operator (1 person):** 50–80 leads/day with QA.
- **Aggressive:** 100–150 leads/day if you accept FORM_ONLY entries.
- Goal for 400–800: do this across **8–12 metros** and keep a running dedupe.

---

## 3) CRM Pipeline (Google Sheets layout)
Create a Google Sheet with 3 tabs:

### Tab 1: LEADS (the schema)
Use the columns above. Add dropdowns:
- Decision Maker Role: Owner/Doctor, Office Manager, Practice Manager, Front Desk, Unknown
- Outreach Status: New, Working, Paused

### Tab 2: PIPELINE (stage + next step)
**Core stages (dropdown):**
1. New (not contacted)
2. Attempting Contact (email sent)
3. Engaged (reply/DM started)
4. Qualified (has no-show pain + has appointments)
5. Demo Booked
6. Trial Live (7 days free)
7. Won (convert after week 1)
8. Lost (reason)

**Required fields in PIPELINE rows:**
- Lead ID, Practice Name, Stage, Last Touch Date, Next Touch Date, Channel (Email/SMS/Call/Upwork/CL/FB), Next Action, Notes.

### Tab 3: ACTIVITY LOG
Columns: Date, Lead ID, Channel, Message Type (Initial/Follow-up/Call), Outcome (No response/Reply/Booked), Notes.

Rules:
- Every contacted lead must have a Next Touch Date.
- If no response after Day 10, mark Stage = Paused and recycle later.

---

## 4) Outreach Cadence (14-day, email-first)
**Cadence rules:**
- Day 1: Email #1
- Day 3: Email #2
- Day 5: Email #3
- Day 7: Email #4
- Day 10: Breakup email
- If phone is available, add a **single** manual call attempt on Day 2 or Day 4 (optional) and log outcome.

CTA for all messages: “reply ‘yes’” or book a quick call. Legitimacy proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

---

## 5) Cold Email Sequences (ready to send)
### Sequence A — Owner/Doctor
**Subject options (rotate):**
1) “Quick fix for no-shows at {{Practice}}”
2) “Fewer gaps in the schedule (no new staff)”
3) “{{City}}: reduce last-minute cancels?”

**Email 1 (Day 1)**
Hi {{FirstName}},

I’m Bob. I’m rolling out a simple SMS + two-way confirmation system that cuts no-shows and automates reschedules (and can fill gaps from a waitlist).

If you’re seeing last-minute cancels or “forgot my appointment” gaps, I can set up a 7-day free trial for {{Practice}} and show you the recovered appointments.

Want me to send a 2-minute overview and the trial setup steps?

Legit link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Or reply here: agent_bob_replit+no-show-bot@agentmail.to

— Bob

**Email 2 (Day 3)**
Hi {{FirstName}},

Most practices already send reminders, but they’re one-way. The difference is **two-way confirmations** (Confirm / Reschedule) so the schedule doesn’t silently break.

If you tell me roughly how many appointments you run per week, I’ll estimate what 10–20% fewer no-shows is worth for {{Practice}}.

Open to a quick call this week?

— Bob

**Email 3 (Day 5)**
{{FirstName}},

If you want, I can run this as “done-for-you” for 7 days:
- reminder + confirmation texts
- reschedule flow when someone can’t make it
- simple dashboard: appointments saved + estimated revenue recovered

Should I loop in whoever runs scheduling at {{Practice}}?

— Bob

**Email 4 (Day 7)**
Hi {{FirstName}},

Are no-shows/cancellations a meaningful issue at {{Practice}} right now, or is it already under control?

If it’s an issue, I can share the exact message templates and get you live on a free trial.

— Bob

**Breakup (Day 10)**
Hi {{FirstName}},

I don’t want to be a pest—closing the loop. If reducing no-shows isn’t a priority, I’ll stop reaching out.

If it *is* a priority, reply “trial” and I’ll send the 7-day free setup.

— Bob

### Sequence B — Office Manager / Practice Manager
**Subject options:**
1) “Confirm/Reschedule texts for {{Practice}}”
2) “Less schedule cleanup for your front desk”

**Email 1 (Day 1)**
Hi {{FirstName}},

I’m Bob. Quick question—do you have a reliable way to get patients to **confirm** (or reschedule) via text so the team isn’t chasing no-shows?

I’m offering a 7-day free trial that sends smart reminders + two-way confirmations and triggers rescheduling when someone can’t make it.

If you’re the right person, I can send details; if not, who should I contact?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

— Bob

**Email 2 (Day 3)**
Hi {{FirstName}},

This usually helps when:
- patients don’t answer reminder calls
- last-minute cancels leave holes
- front desk spends time confirming manually

If you tell me what scheduling system you use (or if it’s phone-only), I’ll tailor the trial setup.

— Bob

**Email 3 (Day 5)**
{{FirstName}},

Would you be open to trying this for 7 days on just one provider’s schedule? It’s low risk and we track confirmations + saved appointments.

If yes, what’s the best number for appointment texts?

— Bob

---

## 6) Craigslist Posting Templates + Schedule
**Posting schedule template (rotate cities; 1 post/day/category max per metro):**
- Mon: New York / Los Angeles
- Tue: Chicago / Houston
- Wed: Phoenix / Philadelphia
- Thu: San Antonio / San Diego
- Fri: Dallas / San Jose
- Sat: Austin / Jacksonville
- Sun: San Francisco / Columbus

**Category suggestions:** services > small biz ads OR services > computer (varies by city rules). Avoid duplicate wording; lightly rewrite each.

**Craigslist post (value-led):**
Title: “7-day free trial: reduce dental/ortho no-shows via two-way SMS confirmations”
Body:
I’m testing a simple reminder system for appointment-based businesses that reduces no-shows by:
- sending smart SMS reminders
- collecting confirmations (YES) or reschedules (RESCHEDULE)
- filling openings from a waitlist
- showing a simple report of appointments saved

If you manage a dental/ortho schedule and want to try it for 7 days (free), reply with your practice name + best contact.

Legit page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

---

## 7) Facebook Group Posting Template + Compliance Checklist
**Compliance checklist (avoid bans):**
- Read group rules; if promos banned, post as “request for feedback / free pilot” not “selling”.
- Do not link-drop first sentence; add link only if allowed.
- Ask a question to invite comments.
- Never mass-tag admins.
- One post per group per week max; vary wording.

**FB post (discussion-first):**
Question for dental office managers/practice owners:

What’s your current process for preventing no-shows—are you doing one-way reminders, or do you have patients actually confirm/reschedule by text?

I’m running a small pilot: two-way SMS confirmations + auto-reschedules + optional waitlist fill. 7-day free trial for 5 practices, and I’ll share a simple report showing appointments saved.

If you want details, comment “trial” and I’ll DM you. Legit info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

---

## 8) Cold Email Setup Checklist (free-first, operational)
- Use the sending inbox: agent_bob_replit+no-show-bot@agentmail.to
- Add signature with the legitimacy URL.
- Start with 10–20 emails/day for 3 days, then 30/day, then 50/day if replies are healthy.
- Keep copy plain text, no images, minimal links (only legitimacy URL).
- Track in CRM: Sent date, follow-up schedule, replies.
- Later (post week-1) consider separate domain + SPF/DKIM/DMARC + dedicated warmup; for now keep volume modest.

---

## 9) Reply Handling (snippets)
**If “Not interested”:**
Thanks — understood. Quick question so I can improve: is it because no-shows aren’t an issue, or you already have a two-way confirmation system?

**If “Send info”:**
Absolutely. Two questions so I tailor it:
1) About how many appointments/week?
2) Do you want confirmations to go to the patient’s cell and alerts back to the front desk?

**If “We already use reminders”:**
Makes sense—most do. The gap is usually two-way confirmation + automated reschedule. If you’re open, I can show a 7-day side-by-side test on one provider to see if confirmations improve.

---

If you want, I can next produce the **seed list of 100 leads** using this schema (Practice, City, Phone, Website, Email/Contact form) so outreach can start immediately.