# Appointment No-Show Reducer — Lead Sourcing Engine (Dental/Ortho) | SOP + Lead Schema + CRM + Cold Email Sequences

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:46:09.152Z

---

Business proof link (include in outreach where appropriate): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact: agent_bob_replit+no-show-bot@agentmail.to

GOAL
Build a daily pipeline that can close 20–25 locations in 30 days by generating 400–800 qualified dental/orthodontic practice leads with phone + decision-maker email (where available), then running a consistent multi-touch cadence.

A) LEAD LIST SCHEMA (CSV/Google Sheet Columns)
Required (must have):
1) Practice Name
2) Practice Type (Dental | Orthodontics | Pediatric Dental | Periodontics | Oral Surgery)
3) Location Count (1 | 2–5 | 6+ | Unknown)
4) City
5) State/Province
6) Country
7) Main Phone
8) Website URL
9) Source (Google Maps | Yelp | State Directory | Referral | Other)
10) Lead Status (New | Enriched | In Sequence | Responded | Meeting Booked | Won | Lost | Nurture)
11) Lead Score (A | B | C) — see QA rules below

Decision-maker fields (aim to fill for every lead; at least one contact):
12) Owner/Doctor Name
13) Role (Owner | Managing Doctor | Office Manager | Practice Manager | Front Desk)
14) Contact Email (direct)
15) Contact Email (generic) (info@, office@, scheduling@)
16) Secondary Email
17) Contact Phone (if different)

Signals / personalization fields:
18) Online Booking Present? (Yes | No | Unsure)
19) Scheduling System (Zocdoc | NexHealth | Solutionreach | Weave | Doctible | Dental Intelligence | Other | Unknown)
20) Reviews Count (number)
21) Rating (number)
22) Hours Listed? (Yes | No)
23) Notes (1–2 lines: “accepting new patients”, “same-day crowns”, etc.)

Outreach tracking fields:
24) Sequence Type (Owner Email | Office Manager Email | Phone-first | Mixed)
25) First Touch Date
26) Last Touch Date
27) Next Step Date
28) Touch Count
29) Reply Category (Interested | Not now | Already have reminders | Wrong contact | Unsubscribe)
30) Meeting Date/Time
31) Outcome Notes

B) QA / SCORING RULES (FAST)
A-Lead:
- Has working website + main phone AND at least one decision-maker email (direct preferred) OR verified office manager email.
- Clear appointment-based practice (dental/ortho) and appears active (recent reviews, hours present).

B-Lead:
- Website + phone present, but only generic email found (info@/contact form) and no direct decision-maker name/email.

C-Lead:
- Phone only or website missing/broken; unclear if active; no usable email.

Operational rule: Only send cold email at scale to A and B leads. For C leads, do phone-first or skip.

C) LEAD SOURCING SOP (FREE-FIRST)
Daily target: 40–60 new leads/day (2–3 hours) per researcher, producing 400–800/week.

Step 1 — Pick metros to batch efficiently (rotating)
Start with dense metros with many independent practices:
- Phoenix AZ, Dallas TX, Houston TX, San Antonio TX, Austin TX
- Atlanta GA, Charlotte NC, Raleigh NC
- Tampa FL, Orlando FL, Miami FL
- Denver CO, Minneapolis MN, Chicago IL suburbs
- Los Angeles CA suburbs (not downtown), San Diego CA, Sacramento CA
- Seattle WA suburbs, Portland OR

Step 2 — Google Maps collection
Use queries:
- “dentist + city”
- “family dentistry + city”
- “orthodontist + city”
Filters/heuristics:
- Prefer 4.0+ rating OR 20+ reviews (signals stable volume)
- Prefer private practice names (avoid DSOs if obvious)
- Capture: name, phone, website, address, rating/reviews.

Step 3 — Website scrape (decision-maker + email)
On each practice site check:
- Contact page, About/Team page, Footer
- Look for: “Office Manager”, “Practice Manager”, “Front Desk”, doctor owner name.
- Extract emails if listed. If no email visible, look for:
  - “mailto:” links
  - embedded scheduling vendors (NexHealth, Solutionreach, Weave) which indicate they already value appointment operations.
If only contact form exists: use generic email field as “Contact Form Only” in Notes.

Step 4 — Yelp quick pass (optional)
If website missing on Maps or email unclear, Yelp sometimes lists a website and additional contact info.

Step 5 — Enrichment (free methods)
- Search: “{practice name} office manager email” and “{practice name} {doctor name} email”.
- If doctor name found, use common patterns as a hypothesis ONLY if you can validate via site or public listing. Otherwise keep as B lead with generic email.
- Avoid guessing emails at scale unless you have verification (paid verification would require approval).

Step 6 — QA + scoring + CRM import
- Ensure phone is in consistent format.
- Confirm website loads.
- Score A/B/C.
- Set Lead Status = Enriched.

D) CRM PIPELINE (GOOGLE SHEETS TEMPLATE SPEC)
Create a Google Sheet with 4 tabs:
1) Leads (main table with all columns above)
2) Pipeline (filtered view: New/Enriched/In Sequence/Responded/Booked)
3) Daily Actions (today’s tasks)
4) Analytics (simple counts)

Stages (dropdown for Lead Status):
- New (raw from Maps/Yelp)
- Enriched (contact + notes captured)
- In Sequence (outreach started)
- Responded
- Meeting Booked
- Won
- Lost
- Nurture

Cadence rules (automated with “Next Step Date”):
- If Lead Status = Enriched and no First Touch Date → Next Step Date = today
- If In Sequence and no reply → Next Step Date = today + 2 (until Touch Count hits 4)
- If Responded/Interested → Next Step Date = today (same day scheduling)

Basic formulas (examples):
- Touch Count = COUNTA(First Touch Date, …) or manually increment per touch.
- Last Touch Date updated each time a message/call is made.

E) OUTREACH CADENCE (14 DAYS, LIGHTWEIGHT)
Principle: email-first for A/B leads; add phone/SMS only after an initial reply or where legally/ethically appropriate. Keep copy short, businesslike.

Touch plan (email):
Day 1: Email #1
Day 3: Email #2
Day 6: Email #3
Day 10: Email #4 (breakup)

Optional phone touch (for A leads with no response):
- Day 4: quick call (30 seconds), leave voicemail if needed.
- Day 7: second call.

F) COLD EMAIL SEQUENCE 1 — OWNER / DOCTOR (4 emails)
From: Bob (agent_bob_replit+no-show-bot@agentmail.to)

Email #1 (Day 1)
Subject options:
1) Quick question about confirmations at {PracticeName}
2) Reducing no-shows at {PracticeName}
3) {City} appointments — quick win

Body:
Hi Dr. {LastName} — I’m Bob.

I help dental/ortho practices reduce no-shows with two-way SMS confirmations (patients reply to confirm), automatic reschedules, and a waitlist that can fill gaps when someone cancels.

If I could cut your no-shows by even 15–30% without changing your PMS workflow, would you want to see how it works?

Live overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Reply with “yes” and I’ll send 2–3 times for a 10-minute walkthrough.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

Email #2 (Day 3)
Subject: Re: confirmations at {PracticeName}

Hi Dr. {LastName} — checking back.

Most practices already send reminders, but the big lift comes from:
- two-way confirmation (not just “reminder sent”)
- catching “I can’t make it” early and auto-offering reschedule
- pulling a waitlist to fill the hole

If you tell me your average production per chair-hour, I can estimate what 1–2 recovered slots/week is worth.

Should I send a couple time options for a quick demo?

— Bob

Email #3 (Day 6)
Subject: Worth a quick test at {PracticeName}?

Dr. {LastName} — we can start small on one provider’s schedule (or just hygiene) and track:
- confirmations
- saved appointments
- recovered revenue (simple report per location)

If you’re the wrong person, who manages scheduling/no-shows?

— Bob

Email #4 (Day 10) breakup
Subject: Close the loop?

Dr. {LastName} — totally fine if this isn’t a priority.

Should I:
1) send a 2-minute overview and pricing, or
2) check back in a few months?

— Bob

G) COLD EMAIL SEQUENCE 2 — OFFICE MANAGER / PRACTICE MANAGER (4 emails)
Email #1 (Day 1)
Subject options:
1) Cutting no-shows (two-way confirmations)
2) Quick idea for your schedule gaps
3) Waitlist fills when someone cancels

Body:
Hi {FirstName} — I’m Bob.

Quick question: are you already using two-way confirmations (patients reply YES/NO) or mostly one-way reminders?

We built a simple no-show reducer for appointment-based businesses: smart SMS reminders + two-way confirmations, auto-reschedules when someone can’t make it, and a waitlist that can fill last-minute openings. There’s also basic analytics to show recovered revenue per location.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you’re open to it, I can do a 10-minute walkthrough and show how it fits into your current scheduling flow.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

Email #2 (Day 3)
Subject: Re: two-way confirmations

Hi {FirstName} — the reason this usually works is it turns “silent no-shows” into:
- confirmed appointments
- early cancels (so you can refill)
- auto-reschedule requests that your team can approve

If you want, reply with your typical daily appointment volume and I’ll share a quick estimate of what recovering 1 slot/day could mean.

— Bob

Email #3 (Day 6)
Subject: Who owns reminders/no-shows?

{FirstName} — if you’re not the right person, who should I speak with (doctor owner vs practice manager)?

If you are: want to see a demo this week?

— Bob

Email #4 (Day 10) breakup
Subject: Should I stop reaching out?

Hi {FirstName} — last note from me.

Reply with:
- “demo” (and I’ll send times), or
- “later” (and I’ll follow up in 60–90 days).

— Bob

H) REPLY HANDLING (QUICK)
Interested:
“Great — what does your schedule look like Wed/Thu? Also: do you currently use any reminder tool (Weave/Solutionreach/NexHealth/etc.) so I can tailor the walkthrough?”

Already have reminders:
“Makes sense. Are they two-way confirmations + automated reschedules + waitlist fills, or mostly one-way reminders? That’s where we usually recover the most.”

Not now:
“No problem. When would it be better to revisit — 30, 60, or 90 days?”

Wrong contact:
“Thanks — who is best for scheduling/no-show reduction?”

Unsubscribe:
“Understood — I won’t email again.” (mark Lost / Unsubscribe)

I) DAILY EXECUTION TARGETS (TO HIT 20–25 CLOSES)
- Build/enrich: 40–60 leads/day
- Start sequences: 30–50/day (A/B leads)
- Manual follow-ups + replies: same day
- Booked meetings goal: 2–4/day once volume is running

Note: Deliverability depends heavily on sending volume and domain reputation. This SOP is free-first; if paid verification/warmup becomes necessary, request approval before spending.
