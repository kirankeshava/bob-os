# Lead Sourcing Engine + CRM Spec + Cold Email Cadences (Dental/Ortho No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:55:45.678Z

---

## A) Lead List Schema (400–800 target) — Required Columns
Create a spreadsheet with these columns (left to right). Required fields marked (R).
1) Lead ID (R): city-state + business + date (e.g., AUS-TX_SmileCare_2026-04-09)
2) Business Name (R)
3) Vertical (R): Dental / Ortho
4) Location Count (R): 1 / 2–5 / 6+
5) Address (R)
6) City (R)
7) State/Prov (R)
8) ZIP/Postal
9) Phone (R)
10) Website URL (R)
11) Google Maps URL (R)
12) Yelp URL (optional)
13) Decision Maker Name (R when available): Dr/Owner/Practice Manager
14) Decision Maker Title (R when available): Owner / Dentist / Orthodontist / Office Manager / Practice Manager
15) Email 1 (R goal): direct (firstname@domain)
16) Email 1 Source (R): website / contact page / staff page / google / yelp
17) Email Confidence (R): High / Med / Low
18) Secondary Email
19) Booking/CRM Tool Clues: “NexHealth / SolutionReach / Weave / Dentrix / OpenDental / Doctible / LocalMed / Jane / Zocdoc / none seen”
20) Online Booking? (R): Yes/No
21) Hours posted? Yes/No
22) Reviews Count (proxy size)
23) Notes: “New patient promo”, “same-day”, “multiple hygienists”, etc.
24) Outreach Stage (R): New / Researched / Contacted / Replied / Qualified / Demo Scheduled / Trial / Won / Lost
25) Last Touch Date (R)
26) Next Touch Date (R)
27) Channel (R): Email / Phone / SMS / Upwork / Craigslist / FB
28) Outcome/Reason (Lost reason dropdown)

### Validation / QA rules
- Must have: Business Name, City/State, Phone, Website, Maps URL.
- Email quality: High = email explicitly published on site OR staff directory OR “mailto:” link. Medium = inferred pattern matches staff names (e.g., j.smith@domain) with supporting evidence. Low = generic form-only (no email) or third-party directory only.
- Reject leads if: corporate chain > 10 locations (unless explicitly targeted), no phone, no website (unless strong listing + email exists).

## B) Free-First Lead Sourcing SOP (Google Maps + Websites)
Goal: 80–150 new qualified leads/day per operator (scales to 400–800/week).

### Step 1 — Choose metros & quotas
Pick 10–20 metros/states with high density (example rotation): TX (Austin, Dallas, Houston, San Antonio), FL (Miami, Tampa, Orlando), CA (San Diego, Sacramento), AZ (Phoenix), CO (Denver), NC (Charlotte), GA (Atlanta).
Daily quota example: 100 leads/day = 5 metros × 20 leads.

### Step 2 — Google Maps search queries
For each metro, run searches:
- “dentist + [city]”
- “orthodontist + [city]”
- “family dentistry + [city]”
Filter by:
- Independent practice feel (site matches brand name, not DSO chain)
- Has phone + website
- Reviews > 15 (optional but helps ensure active)

### Step 3 — Capture baseline fields
From Maps listing:
- Business name, phone, address, website, maps URL, review count
Paste into sheet immediately.

### Step 4 — Find decision maker email on website (2–4 minutes/lead)
Open website:
1) Check footer for email
2) Contact page
3) Team/Staff page (often has office manager name)
4) Look for “mailto:” in page source if needed
If only contact form exists:
- Record “Form only” + set Email Confidence = Low
- Still keep lead if phone is strong and office manager name is findable.

### Step 5 — Decision maker target priority
1) Practice Manager / Office Manager (best for scheduling/no-show ops)
2) Owner Dentist / Lead Orthodontist (final approval)
If only generic email exists (info@, hello@): keep it, but mark as Medium and add phone-first.

### Step 6 — Enrich booking software clues
On site look for logos/phrases:
- “Book Online” button (often reveals vendor in URL)
- Widgets: NexHealth, LocalMed, Zocdoc, Weave, SolutionReach, Doctible, RevenueWell
Record clues; these help personalize outreach.

### Step 7 — QA pass (end of day)
- Remove duplicates (same phone/domain)
- Ensure Next Touch Date set
- Ensure Stage = New or Researched

## C) CRM Pipeline in Google Sheets (no-cost) — Template Spec
Create a Google Sheet with 3 tabs:

### Tab 1: LEADS
Columns = schema above.
Add Data Validation dropdowns:
- Outreach Stage: New, Researched, Contacted, Replied, Qualified, Demo Scheduled, Trial, Won, Lost
- Email Confidence: High, Med, Low
- Lost Reason: Already solved, Not enough volume, No budget, Can’t change process, Not decision maker, No response, Bad timing

Recommended formulas:
- Days Since Last Touch: =TODAY()-[Last Touch Date]
- Overdue Flag: =IF(TODAY()>[Next Touch Date],"OVERDUE","")

### Tab 2: ACTIVITIES (log)
Columns: Date, Lead ID, Channel, Action (Email1/Email2/Call/SMS/VM), Result, Notes, Next Touch Date.
Rule: every touch gets a row.

### Tab 3: DASHBOARD
- Total New leads this week
- Contacts attempted
- Reply rate (Replied/Contacted)
- Demos scheduled
- Wins
This can be simple COUNTIFs.

## D) Outreach Cadence Rules (14 days)
Daily minimums per 100 new leads added:
- Day 0–2: Email + (optional) call for High confidence leads
- Day 3–7: follow-ups + 1 phone attempt per lead (for High/Med)
- Day 8–14: final follow-ups + “close the loop” email

Stage change rules:
- If any reply: Stage → Replied
- If they confirm interest + have no-show pain: Stage → Qualified
- If time set: Stage → Demo Scheduled (put date/time in Notes)
- If trial started: Stage → Trial
- If paying: Stage → Won

CTA rule (consistent everywhere): “Want me to show you what this looks like? Reply YES and I’ll send details, or email agent_bob_replit+no-show-bot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

## E) Cold Email Sequence #1 — Owner/Doctor (Dentist/Orthodontist)

### Email 1 (Day 1)
Subject options:
1) “Quick fix for last‑minute no‑shows at {{Practice}}”
2) “Reduce no‑shows without changing your schedule template”
3) “{{City}} practices: confirmations + waitlist fill”

Body:
Hi Dr. {{LastName}},

If {{Practice}} loses a few appointments/month to no‑shows or late cancels, we built a simple SMS + two‑way confirmation flow that:
- confirms patients (Y/N),
- auto-prompts reschedule if “No,”
- and can fill gaps from a waitlist.

It’s a lightweight micro‑SaaS (not an agency). Here’s our live page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Worth a 10‑minute look to see if it can recover a few chair hours/week at {{Practice}}?

Reply “YES” and I’ll send how it works + typical setup time. Or email me at agent_bob_replit+no-show-bot@agentmail.to.

— Bob

### Email 2 (Day 3)
Subject: “Re: confirmations + gap fill for {{Practice}}”

Hi Dr. {{LastName}},

Two quick questions so I don’t waste your time:
1) Do you currently text appointment reminders from your PMS/vendor?
2) Do you have a waitlist or “call list” to fill same‑week openings?

If you answer those two, I’ll tell you whether we can improve it (or not). Same link if helpful: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob (agent_bob_replit+no-show-bot@agentmail.to)

### Email 3 (Day 6)
Subject: “Example: 2-way confirmation message”

Hi Dr. {{LastName}},

Example flow:
- “Reply 1 to confirm / 2 to reschedule”
- If 2: patient gets a link or quick options to move it
- If no reply: a second reminder triggers

If you want, I can tailor the message timing to your schedule (hygiene vs. treatment blocks). Open to a 10‑minute walkthrough?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Email 4 (Day 10)
Subject: “Should I talk to your office manager?”

Hi Dr. {{LastName}},

Often the office manager owns reminders/confirmations. If you point me to the right person at {{Practice}}, I’ll send a 5‑line summary and stop bothering you.

Thanks,
Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email 5 (Day 14 — close the loop)
Subject: “Close the loop?”

Hi Dr. {{LastName}},

I didn’t hear back — totally fine. Should I:
A) follow up next month, or
B) close this out?

If it’s useful later, page is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob

## F) Cold Email Sequence #2 — Office Manager / Practice Manager

### Email 1 (Day 1)
Subject options:
1) “Two‑way confirmations to cut no‑shows ({{Practice}})”
2) “Filling last‑minute holes from a waitlist”
3) “Appointment reminder workflow (quick question)”

Body:
Hi {{FirstName}},

Quick question — do you handle appointment reminders/confirmations at {{Practice}}?

We built a small system that texts reminders, collects 2‑way confirmations (Y/N), prompts reschedules automatically, and can notify a waitlist to fill openings.

Live page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you tell me your current process (vendor or manual), I can suggest the simplest way to reduce no‑shows without adding staff work.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email 2 (Day 2)
Subject: “Who owns reminders at {{Practice}}?”

Hi {{FirstName}},

If it’s not you, who’s best for reminders + confirmations? I’ll send a short summary.

— Bob

### Email 3 (Day 5)
Subject: “Timing question (24h vs 48h)”

Hi {{FirstName}},

Do you see more no‑shows on:
- hygiene recalls, or
- longer treatment blocks?

We usually adjust timing (48h + 24h, or morning-of) and use 2‑way confirmation to force a clear yes/no.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Email 4 (Day 9)
Subject: “Can I send a sample message set?”

Hi {{FirstName}},

Want me to send a sample set of SMS reminders/confirmations you can copy/paste (even if you don’t use our tool)?

If yes, reply with the appointment types you want covered (new patient, hygiene, treatment).

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email 5 (Day 14)
Subject: “Ok to close this out?”

Hi {{FirstName}},

No worries if timing’s off — should I close this out for now?

— Bob

## G) Reply Handling (quick playbook)
- Positive: “Yes / interested” → ask 2 qualifiers: (1) appts/day, (2) no-show/late cancel estimate. Then offer 2 time slots and send legitimacy link + email.
- “We already use reminders” → ask: “Do you get 2-way confirmations + auto-reschedule + waitlist fill?” If not, position as incremental.
- “Send info” → send 5-bullet summary + link; ask 2 times.
- No decision maker → ask to be routed to office manager/practice manager.

## H) What’s still required to finish the deliverable fully
- Produce an actual seed lead list (50–100 real practices) to prove the SOP and schema in practice, then scale to 400–800.
- Cold email infrastructure execution (domain/inbox/warmup) likely requires spend; keep free-first until approval.