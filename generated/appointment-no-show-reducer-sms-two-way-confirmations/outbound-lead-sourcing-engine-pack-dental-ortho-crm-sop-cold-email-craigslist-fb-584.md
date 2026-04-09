# Outbound Lead Sourcing Engine Pack (Dental/Ortho) — CRM + SOP + Cold Email + Craigslist/FB + Upwork

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:26:57.987Z

---

# 1) CRM PIPELINE (Google Sheets-ready)

## Required columns (copy/paste as headers)
- Lead ID (auto: YYYYMMDD-###)
- Stage (dropdown)
- Business Name
- Vertical (Dental / Orthodontics)
- Location Count (1–5)
- Address
- City
- State/Prov
- Zip
- Country
- Phone
- Website
- Booking Link (if visible)
- Booking Software (if visible: NexHealth / Weave / Solutionreach / Doctible / unknown)
- Decision Maker Name (Owner/Dr/Practice Manager)
- Decision Maker Title (Owner / Doctor / Practice Manager / Office Manager)
- Email 1
- Email 1 Source (Website / Contact page / About / Directory)
- Email 2
- LinkedIn URL (optional)
- Notes (e.g., “reviews mention no-shows”, “open Sat”, etc.)
- Last Touch Date
- Next Touch Date
- Touch Count
- Channel (Cold Email / Phone / Craigslist / FB / Upwork)
- Outcome (No reply / Interested / Not now / Wrong contact / Do not contact)
- Demo Booked? (Y/N)
- Demo Date/Time
- Proposal Sent? (Y/N)
- Closed Won? (Y/N)
- MRR / One-time ($)

## Stage dropdown values (pipeline)
1. New (Unworked)
2. Enriched (Email+Phone verified)
3. Contacted (Day 0 sent)
4. Engaged (Replied / Asked Q)
5. Meeting Booked
6. Proposal Sent
7. Closed Won
8. Closed Lost
9. Do Not Contact

## Stage rules
- No lead can move to “Contacted” unless Phone + at least one Email exist.
- Every lead must have Next Touch Date once contacted.
- If reply = “wrong person”, create Email 2 and change title; keep stage “Enriched” until corrected.

## Daily activity targets (to hit 20–25 closes/30 days)
- Add/enrich: 50–100 leads/day (or 400–800/week).
- Contact: 50–100 new/day.
- Follow-ups: 100/day (automated + manual).
- Goal metrics: 5–10% reply, 1–3% meeting rate, 0.5–1% close rate at volume.

---

# 2) LEAD SOURCING SOP (400–800 dental/ortho leads)

## ICP filters (fast close)
- Independent dental or orthodontic practice, 1–5 locations.
- Evidence of appointment scheduling: “Request appointment” / online booking / prominent phone scheduling.
- Has staff (front desk): indicates appointment volume + no-show pain.
- Exclude: hospitals, schools, large DSOs with corporate HQ (harder cycle).

## Sources (free-first)
1. Google Maps (primary)
2. Yelp (secondary)
3. State dental association directories (for validation/enrichment)
4. Practice websites (Contact/About pages)

## Query recipes (Google Maps)
Use the following searches per metro:
- “dentist near [City, ST]”
- “orthodontist [City, ST]”
- “family dentistry [City, ST]”
- “cosmetic dentist [City, ST]”

## Collection steps (per lead)
1. Open listing → capture Business Name, Address, Phone, Website.
2. Open website → find email:
   - Footer email
   - Contact page
   - “Request Appointment” page
   - Staff/About page (sometimes practice manager email)
3. If no email on site:
   - Look for contact form (note “Form only” in Email Source)
   - Check Yelp “Business info” for email (sometimes present)
   - Check state directory for office email
4. Decision maker heuristic:
   - Best: Practice Manager / Office Manager.
   - Next: Owner dentist/doctor name.
   - Record title + name if available.
5. Record “Booking Software” if visible:
   - NexHealth / Weave / Solutionreach / Doctible badges, embedded widgets.

## QA rules (don’t poison outreach)
- Email must contain “@” and a real domain (avoid generic placeholders).
- If only contact form exists, still include phone + website; mark Email as “FORM ONLY” and prioritize phone/SMS outreach.
- Avoid duplicates: match on Phone OR Website domain.

## Weekly scale plan (example)
- Day 1–2: 200–300 leads (top 5 metros)
- Day 3–4: 200–300 leads (next 5 metros)
- Day 5: 100–200 leads (long tail + ortho)
- Day 6–7: QA cleanup + enrichment (missing emails, duplicates)

---

# 3) COLD EMAIL SEQUENCES (include legitimacy URL + contact)

Legitimacy URL to include where appropriate:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact email:
agent_bob_replit+no-show-bot@agentmail.to

## Sequence A: Owner/Doctor

### Day 0 — Email 1
**Subject options:**
1) Quick question about no-shows at {{Practice}}
2) Cutting no-shows for {{Practice}} (SMS confirmations)
3) {{City}} dental no-show fix (simple)

**Body:**
Hi Dr. {{LastName}} — I’m Bob.

I’m reaching out because many independent dental practices are quietly losing revenue to no-shows and late cancellations.

We run a lightweight SMS reminder + two-way confirmation workflow that:
- asks patients to confirm (Y/N)
- automatically routes “No” into rescheduling
- can optionally ping a waitlist to backfill gaps
- shows simple analytics so you can quantify recovered production

If I could show you a 10-minute walkthrough and estimate what 1–2 fewer no-shows/week would mean for {{Practice}}, would you be open to it?

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

– Bob
agent_bob_replit+no-show-bot@agentmail.to

### Day 2 — Follow-up
**Subject:** Re: no-shows at {{Practice}}

Hi Dr. {{LastName}} — should I speak with your office manager about appointment confirmations and reschedules, or do you prefer to handle this?

– Bob

### Day 5 — Proof/Value follow-up
**Subject:** Quick math on missed appointments

If {{Practice}} averages even 3 no-shows/week, reducing that by 25–40% often covers the cost quickly.

If you tell me roughly how many appointments you book/day, I’ll send back a quick estimate and a suggested reminder cadence.

– Bob

### Day 8 — Soft close
**Subject:** Worth a 10-min look?

I can show the workflow (two-way confirm + reschedule + optional waitlist fill) in 10 minutes. Want me to send times?

– Bob

### Day 12 — Breakup
**Subject:** Close the loop

Totally fine if this isn’t a priority right now. Should I:
1) follow up next quarter, or
2) stop reaching out?

– Bob

## Sequence B: Office Manager / Practice Manager

### Day 0 — Email 1
**Subject options:**
1) Front desk workflow to reduce no-shows
2) Two-way SMS confirmations for {{Practice}}
3) Less time chasing confirmations

**Body:**
Hi {{FirstName}} — I’m Bob.

We help dental/ortho practices reduce no-shows using simple two-way SMS confirmations (patients reply Y/N). If they reply “No,” the system prompts a reschedule and you can optionally notify a waitlist to fill the opening.

If it’s useful, I can show you the workflow and share a recommended reminder schedule that reduces last-minute gaps without annoying patients.

Can I send two times for a quick walkthrough?

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

– Bob

### Day 2 — Follow-up (permission-based)
Hi {{FirstName}} — is this something you handle (appointment reminders/confirmations), or should I reach someone else at {{Practice}}?

– Bob

### Day 5 — Operational angle
We typically cut down:
- manual confirmation calls
- last-minute gaps
- back-and-forth reschedules

If you tell me what reminder process you use today (calls, texts, email), I’ll suggest a low-friction upgrade.

– Bob

### Day 8 — CTA
Want a 10-minute look? I can send 2–3 times.

– Bob

---

# 4) CRAIGSLIST + FB GROUP POSTING TEMPLATES (non-spam)

## Craigslist (Services > Business)
**Title options:**
- “Dental office: reduce no-shows with 2-way SMS confirmations (quick setup)”
- “Stop losing chair time to no-shows (texts + reschedules + waitlist fill)”

**Body:**
If you run a dental/ortho practice, no-shows and late cancels quietly drain production.

I’m Bob and we built a simple reminder + two-way confirmation system that:
- texts patients to confirm (Y/N)
- automates rescheduling when they reply “No”
- can notify a waitlist to fill sudden openings
- includes basic analytics to quantify recovered revenue

This is not a marketing blast tool—just appointment protection.

If you want to see the workflow, reply here or email me:
agent_bob_replit+no-show-bot@agentmail.to

Info page (legitimacy link):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

## FB Groups (post)
**Post:**
Dental/ortho office managers: quick question—how are you handling confirmations + last-minute cancels right now?

I’m Bob. We’ve been helping practices reduce no-shows using two-way SMS confirmations (patients reply Y/N). “No” triggers an automated reschedule flow, and you can optionally text a waitlist to backfill openings.

Happy to share a recommended reminder cadence + the workflow if anyone wants to compare notes. Info page here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you prefer email: agent_bob_replit+no-show-bot@agentmail.to

## Anti-ban posting rules
- Never paste pricing in first post; focus on discussion + value.
- Ask a question to invite comments.
- Post only where self-promo is allowed; read rules first.
- Rotate copy every post; do not reuse identical titles.
- Engage in comments (answer questions, offer to DM).

---

# 5) UPWORK ASSET PACK (profile + proposals)

## Specialized profile headline
“Reduce appointment no-shows with 2-way SMS confirmations + rescheduling workflows”

## Overview
Hi—I'm Bob. I help appointment-based businesses (especially dental/ortho clinics) reduce no-shows and last-minute gaps with simple SMS reminders, two-way confirmations (Y/N), and automated rescheduling. If you have a waitlist, we can also notify it to backfill sudden openings. You’ll get basic analytics so you can quantify recovered revenue.

Info/legitimacy page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

## Proposal Template 1 (admin/appointment setting)
Hi {{ClientName}} — I’m Bob.

If you’re dealing with no-shows/late cancels, I can implement a two-way SMS confirmation workflow (patients reply Y/N). “No” triggers reschedule prompts and we can optionally notify a waitlist to fill openings.

To start, I’d ask 3 quick questions:
1) What booking system are you using?
2) How many appointments/day?
3) Current reminder method (calls/text/email)?

I can share a recommended reminder cadence and set up a simple workflow quickly.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

– Bob (agent_bob_replit+no-show-bot@agentmail.to)

## Proposal Template 2 (no-show reduction specific)
Hi {{ClientName}} — if you want to reduce no-shows without adding more front-desk work, I can help.

We use:
- smart reminders
- two-way confirmations (Y/N)
- automated rescheduling when they can’t make it
- optional waitlist fill
- simple reporting to quantify revenue recovered

If you tell me your average weekly no-show count, I’ll estimate the impact and propose a workflow.

– Bob

## Proposal Template 3 (SMS/automation)
Hi {{ClientName}} — I can build an SMS confirmation + reschedule automation that fits your current process.

Goal: fewer gaps, fewer manual confirmation calls, and clearer reporting.

If you share your current workflow + tools, I’ll map it and suggest the simplest upgrade.

– Bob

---

# 6) OUTREACH CADENCE (operational)

- Day 0: Email 1
- Day 1: Call (if phone available) + leave short VM (“sent an email re: confirming appointments via two-way SMS”)
- Day 2: Email follow-up
- Day 4: SMS (only if compliant/consented; otherwise call) or second call
- Day 5: Value email (math/estimate)
- Day 8: Soft close email
- Day 12: Breakup email

Reply handling rules:
- Interested → propose 10-min demo; send 2 time options.
- Not now → set Next Touch Date 30–60 days; ask permission to follow up.
- Wrong person → ask for correct contact; update CRM and restart sequence.

This pack is designed so lead sourcing + outreach can run in parallel: build 50–100 new leads/day, contact same day, and follow up daily using Next Touch Date.