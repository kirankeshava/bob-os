# Daily Lead Pipeline Engine (Dental/Ortho) — SOP + Lead List Schema + CRM + Cold Email Sequences

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:14:39.656Z

---

## Goal
Build a daily lead pipeline capable of producing 400–800 qualified dental/orthodontic practice leads/month (1–5 locations) with phone + decision-maker email (or best available contact) so outreach can close 20–25 locations in 30 days.

Legitimacy URL (include in outreach where appropriate):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact email for replies: agent_bob_replit+no-show-bot@agentmail.to

---

## A) ICP + Filters (tight to move fast)
Target:
- Independent dental + orthodontic practices (single location preferred; up to 5 locations OK)
- Appointment-driven, front desk scheduling; signs of missed appointments (reviews mention “wait”, “no one answered”, “had to reschedule”)
- Has online booking or appointment request form (optional but helpful)
- US & Canada (prioritize dense metros)

Exclude:
- Hospital systems, DSO megagroups (20+ locations), practices with no website and no reachable phone, practices closed permanently

Prioritize:
- Practices that advertise Invisalign/clear aligners, cosmetic dentistry, implants, orthodontics, pediatric dentistry (high-ticket appointments → big recovered revenue story)

---

## B) Lead List Schema (CSV/Sheets columns)
Create columns exactly like this (in order):
1) Lead ID
2) Date Added
3) Business Name
4) Specialty (Dental / Ortho)
5) Website
6) Primary Phone
7) Address
8) City
9) State/Province
10) Postal Code
11) Country
12) Google Maps URL
13) Yelp URL (if any)
14) Decision Maker Name (Owner/Doctor/Office Manager)
15) Role (Owner/Doctor/Office Manager/Front Desk)
16) Email 1
17) Email 1 Source (Website/Google/Yelp/Directory)
18) Email 1 Confidence (High/Med/Low)
19) Email 2 (optional)
20) Email 2 Source
21) Booking Link Present? (Y/N)
22) Booking Software Observed (Zocdoc / NexHealth / Solutionreach / LocalMed / Dentrix / Unknown)
23) Notes (e.g., “reviews mention no-shows”, “has waitlist language”, etc.)
24) Outreach Stage (dropdown)
25) Last Touch Date
26) Next Touch Date
27) Channel (Email/SMS/Call/CL/FB/Upwork)
28) Owner/Manager LinkedIn (optional)

---

## C) Data Quality / QA Rules (non-negotiable)
Minimum viable lead record (must have):
- Business Name
- Phone
- City + State
- Website OR Google Maps URL

Email acceptance rules:
- Prefer role emails found on site: info@, office@, reception@, appointments@, hello@ (Medium confidence)
- Prefer named emails if explicitly listed (High confidence)
- If only a contact form exists: record “Contact Form Only” in Notes; keep phone for SMS/call outreach.
- Reject obvious generic/spam-trap patterns: noreply@, donotreply@, webmaster@ (unless explicitly the only contact)
- If email is guessed (not recommended without enrichment tools): mark Low confidence and do NOT send until verified.

Phone QA:
- Must be the practice’s primary phone (not a call center). Cross-check on website footer.

Dupes:
- De-dupe by (Business Name + Phone) first, then (Address).

---

## D) Lead Sourcing SOP (repeatable daily)
Daily quota target:
- 30–50 new leads/day (1 person) OR 80–120/day (2–3 people)
- Aim: 150–200 seed list in 1–2 days, then scale.

### Step 1 — Choose 5 metros per day
Pick large metros where practices cluster:
Examples: Dallas, Houston, Phoenix, Atlanta, Miami, Tampa, Denver, Chicago, Los Angeles, San Diego, Seattle, Portland, NYC/NJ corridor, Toronto, Vancouver.

### Step 2 — Google Maps search (primary)
Queries (copy/paste):
- “dentist in [city]”
- “cosmetic dentist in [city]”
- “orthodontist in [city]”
- “invisalign [city]”

Open each promising listing → capture:
- Name, phone, website, address, Maps URL
- Scan reviews quickly for signals: “missed appointment”, “had to reschedule”, “couldn’t get through”, “front desk”, “waitlist”. Add to Notes.

### Step 3 — Practice website extraction (for email + role)
On website, check:
- Contact page
- Footer
- Team/About page
- “Request appointment” page
Extract:
- Best email(s)
- Decision maker name if present (doctor/owner or office manager)
- Booking link and/or booking software (often visible in URL or embedded widget)

### Step 4 — Yelp (secondary)
Use Yelp if it shows a distinct email/website or indicates high appointment volume.
Capture Yelp URL for later context.

### Step 5 — Optional directories (gap fill)
Use:
- State dental association directories
- Local chamber directories
Only if Maps is saturated.

### Step 6 — Stage + next step assignment
Immediately set Outreach Stage = “New” and Next Touch Date = today.

---

## E) CRM Pipeline (Google Sheets structure)
Create a Google Sheet with 3 tabs:

### Tab 1: Leads
Contains the schema above.
Add dropdown for “Outreach Stage” with:
- New
- Enriched (has email + phone)
- Contacted – Email 1
- Contacted – Follow-up
- Engaged (replied)
- Qualified
- Demo Scheduled
- Trial/Onboarding
- Won (Paying)
- Lost

### Tab 2: Activity Log
Columns:
- Date
- Lead ID
- Action (Email/SMS/Call/CL Post/FB Post)
- Outcome
- Notes

### Tab 3: Metrics
Track:
- New leads/day
- Emails sent/day
- Replies/day
- Demos booked/week
- Close rate
- Revenue recovered (self-reported by client)

Rules:
- If no reply after Day 10 → set stage “Nurture” (optional) or keep in “Contacted – Follow-up” and recycle monthly.
- If “Interested, later” → set Next Touch Date +14 days.

---

## F) Cold Email Sequences (ready to send)
IMPORTANT: Include legitimacy URL and reply email.

### Sequence 1: Owner/Doctor (4 touches)
**Email 1 (Day 1)**
Subject options:
1) “quick idea to cut no-shows at {{Practice}}”
2) “{{City}} practices using 2-way confirmations”
3) “reduce last-minute gaps (no new staff)”

Body:
Hi Dr. {{LastName}} —

I’m Bob. We built a simple appointment no-show reducer for practices like {{Practice}}.

It sends SMS reminders + 2-way confirmations (Y/N), auto-handles reschedules, and can pull from a waitlist to fill gaps. Most clinics don’t need new software training—front desk just sees fewer holes in the day.

If I can show you a 10-minute walkthrough, would you want to see what it could recover per month for {{Practice}}?

Legit info: {{LegitimacyURL}}

– Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3)**
Subject: “re: no-shows at {{Practice}}”

Hi Dr. {{LastName}} —

Quick follow-up. The main win is getting a confirmation *reply* (not just a reminder):
- “Reply 1 to confirm, 2 to reschedule”
- if reschedule → opens slot + waitlist fill
- basic analytics: recovered appts → estimated revenue

Worth a quick look, or should I talk with your office manager/front desk lead?

– Bob
{{LegitimacyURL}}

**Email 3 (Day 6)**
Subject: “who handles scheduling?”

Hi Dr. {{LastName}},

Who’s the best person to speak with about appointment reminders / schedule utilization at {{Practice}}?

If you point me to the right person, I’ll send a 3-bullet summary and pricing.

– Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 4 (Day 10)**
Subject: “close the loop?”

Hi Dr. {{LastName}} —

Should I close the loop on this, or is reducing no-shows a priority this quarter?

If it is, I can share a quick estimate calculator and a demo link.

– Bob
{{LegitimacyURL}}


### Sequence 2: Office Manager / Front Desk Lead (5 touches)
**Email 1 (Day 1)**
Subject options:
1) “2-way SMS confirmations for {{Practice}}”
2) “fewer no-shows, fewer reminder calls”

Body:
Hi {{FirstName}} —

I’m Bob. We help dental/ortho practices reduce no-shows by sending smart SMS reminders that collect a confirmation reply (Y/N). If someone can’t make it, it triggers an automated reschedule flow and can offer the slot to a waitlist.

If you’re the right person for scheduling ops, I can do a 10-minute demo and show the simple analytics (recovered appointments → estimated revenue).

Can I send over times?

Legit site: {{LegitimacyURL}}

– Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 2)**
Subject: “what are you using today?”

Hi {{FirstName}} —

Quick question: are you currently using any reminders tool (Solutionreach / NexHealth / Weave / other), or is it mostly manual calls/texts?

Either way, 2-way confirmations usually cut the "day-of" surprises.

– Bob

**Email 3 (Day 4)**
Subject: “fill cancellations automatically”

Hi {{FirstName}},

The feature most teams like is filling last-minute cancellations:
1) patient texts to reschedule
2) slot opens
3) waitlist gets offered that slot automatically

If you want, I can show exactly what the patient sees (screenshots) and how you’d manage it.

– Bob
{{LegitimacyURL}}

**Email 4 (Day 7)**
Subject: “ok to send details?”

Hi {{FirstName}} —

Ok if I send:
- pricing
- setup steps
- what numbers we track (confirm rate, reschedule rate, recovered slots)

Or is there someone else I should loop in?

– Bob

**Email 5 (Day 11)**
Subject: “should I stop reaching out?”

Hi {{FirstName}} —

Should I stop reaching out, or is this worth revisiting later?

If later, tell me the right month and I’ll follow up then.

– Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## G) Reply Handling Macros (copy/paste)
**If interested:**
“Great — what does your weekly appointment volume look like, and roughly what % no-show/cancel within 24h? If you share that, I’ll tailor the demo and show the recovered revenue estimate. Also: who should join (doctor/owner vs office manager)?”

**If already using a tool:**
“Makes sense. Most practices that already have reminders still add 2-way confirmations + waitlist fill because it changes behavior (patients must reply). If you tell me what you’re using, I’ll be direct about whether we’re redundant.”

**If ‘not now’:**
“No problem. When is a better time to revisit? I can follow up then and send a 1-page overview in the meantime.”

---

## H) Craigslist + FB Groups distribution plan (operating rules)
Craigslist:
- Post in Services > Small Biz Ads or Services > Computer/Creative (varies by city rules)
- 1 post per metro every 48–72 hours (avoid duplicates)
- Rotate headlines and first 2 lines to avoid flags
- Always provide legitimacy URL and contact email; keep salesy language minimal

FB Groups:
- Only post in groups that allow promotions (read rules)
- Lead with “free checklist / calculator” rather than “buy my SaaS”
- Comment value on 5 threads/day; post 2–3x/week/group max

---

## I) Next execution step (to produce the 150–200 seed list)
1) Pick 5 metros (example: Dallas, Phoenix, Atlanta, Tampa, Denver).
2) Collect 30–40 practices per metro via Google Maps.
3) Visit each website; extract best email + role.
4) De-dupe; ensure minimum viable record.
5) Export CSV and start outreach in CRM.

This pack is ready for immediate use to generate leads daily and run outreach with consistent data quality and follow-up discipline.