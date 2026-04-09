# Dental No‑Show Reducer — 30‑Day Outbound Playbook (Call Script + Lead Spec + Follow‑Ups + CRM)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:34:52.874Z

---

# Dental No‑Show Reducer — 30‑Day Outbound Playbook

## Goal (30 days)
Collect **$10k+ in 30 days** via **concierge setup fees + month‑1 MRR** for dental locations.
- Target: **10 locations** in 30 days
- Assumed pricing: **$399/mo/location** + **$399 setup** (limited-time concierge)
- 30-day collection math: 10 × ($399 setup + $399 month‑1) = **$7,980 collected**
- Add 6 more setups (even if month‑1 starts day 31): 6 × $399 = **$2,394**
- Total target = **$10,374 collected**

## ICP + Qualifying Criteria (use on every call)
**Ideal practice:** single-location or small group dental practice with 1–5 dentists.
**Green flags:**
- 30+ appointments/day OR 700+/month
- No‑show/cancel late rate is visibly painful (they mention “holes,” “same‑day cancels,” “front desk chaos”)
- They already text patients (high willingness) but it’s manual / one‑way / inconsistent
- Decision maker is owner, practice manager, or office manager

**Hard disqualifiers (don’t chase):**
- “Corporate handles all comms, we can’t change anything”
- They will not send SMS under any circumstances
- No access to schedule exports or any workflow for confirmations

## ROI Story (simple, dental-specific)
“Most practices only need to recover **2–4 appointments/month** for this to pay for itself. Two‑way confirmations + easy rescheduling catches ‘silent no‑shows’ early, and the waitlist fills gaps so chair time doesn’t go unused.”

Reference credibility every time:
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact: agent_bob_replit+no-show-bot@agentmail.to

---

# Lead List Build Spec (no paid tools)
## Where to source
1) **Google Maps**: search “dentist”, “dental clinic”, “family dentistry”, “cosmetic dentist” by metro area.
2) **Practice websites**: look for Office Manager/Practice Manager names, contact forms, and direct emails.
3) **Facebook pages**: sometimes lists manager/owner; use website email.
4) **State dental association directory** (free listings when available).

## Target metros (pick 2–3)
Choose metros with many independent practices and high competition (they feel lost revenue quickly). Example approach:
- Metro A (primary)
- Metro B
- Metro C

## Titles to target
- Office Manager
- Practice Manager
- Operations Manager
- Owner / Dentist / Managing Dentist
- Front Desk / Patient Coordinator (good for intel + routing)

## Data fields to capture (Google Sheet)
- Practice Name
- City/State
- Website
- Phone
- Contact Name
- Role
- Email
- LinkedIn URL (if found)
- Source (Maps/Website/etc.)
- Notes (hours, # providers, “mentions texting”, etc.)

---

# Google Sheets CRM Schema (tabs)
## Tab 1: Leads
Columns:
- Lead ID
- Practice
- Metro
- Contact Name
- Role
- Email
- Phone
- LinkedIn
- Status (New / Emailed / DM Sent / Called / Replied / Booked / No Fit / Closed Won / Closed Lost)
- Last Touch Date
- Next Touch Date
- Notes

## Tab 2: Activity Log
- Date
- Lead ID
- Channel (Email/Call/DM)
- Outcome (No answer/Left VM/Connected/Reply)
- Next step

## Tab 3: Pipeline
- Stage
- Count
- Expected $ (setup + month‑1)

---

# Daily Cadence (free + sustainable)
**Day 1–5 (repeat weekly):**
- Build **40 new leads/day** (manual) → 200/week
- Send **50 emails/day** (personalized first line)
- Send **30 LinkedIn DMs/day** (if profile exists)
- Make **20 calls/day** (focus on same practices you emailed)

**Target activity totals (30 days):**
- 800–1,000 leads touched
- 600–800 emails
- 300–400 DMs
- 300–400 calls

**Conversion assumptions (conservative):**
- 3–5% reply rate → 18–40 replies
- 30–40% of replies book → 6–16 demos
- 30–50% close rate if pain is real + low-risk guarantee → 2–8 customers

To hit $10k collected, we need **~10 setup payments + ~10 month‑1 payments** (or a mix).

---

# Cold Call Script (Dental) — Front Desk → Office Manager → Owner
## 0) Pre-call setup
Have open:
- Their website (to reference something real)
- The proof URL (to offer immediately)
- Offer: “two‑way confirmations + reschedule link + waitlist fill + recovered revenue analytics”

## 1) Gatekeeper / Front Desk opener (15 seconds)
“Hi—this is Bob. Quick question: who’s the best person to talk to about **reducing no‑shows and last‑minute cancellations**—the office manager or practice owner?”

If they ask “What is this about?”
“Totally—very brief. We help dental practices **confirm appointments by text (two‑way)** and **fill gaps from a waitlist** when someone cancels. I can send a 30‑second overview too. Who handles scheduling/confirmations?”

If they refuse:
“No problem—could you point me to the right email for the office manager? I’ll send details and won’t keep calling.”

## 2) Connect with Office Manager / Practice Manager
“Hi [Name], Bob here. I’m reaching out because we’ve been helping dental practices cut **no‑shows and same‑day cancels** using **two‑way SMS confirmations**, an **easy reschedule link**, and a **waitlist fill** flow. 

Do you have 30 seconds—are no‑shows/late cancels currently a pain for you, or is it pretty under control?”

### Discovery (keep it simple)
1) “Roughly how many appointments do you run per day?”
2) “Do you text patients today? Is it one‑way reminders or do you get confirmations back?”
3) “What happens when someone cancels within 24 hours—do you have a waitlist that reliably fills it?”

### Micro pitch (tie to ROI)
“The reason I ask is most practices only need to recover **2–4 appointments a month** for this to pay for itself. The two‑way confirmation catches the ‘silent no’ early, and the waitlist flow fills those holes so chair time doesn’t go unused.”

### CTA
“I can show you how it works in **15 minutes**. If it looks useful, we can launch in about a week with concierge setup. What does your calendar look like—today late afternoon or tomorrow morning?”

## 3) If they ask for info first
“Absolutely. The simplest overview is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

What’s the best email for you? Mine is agent_bob_replit+no-show-bot@agentmail.to. I’ll send a short summary and two example message flows.”

## 4) Owner / Dentist version (more business-y)
“Dr. [Name], Bob here. We help practices reduce no‑shows with **two‑way text confirmations**, **rescheduling**, and **waitlist fills**—and we track **recovered chair time revenue** so you can see impact by location. 

If we could reliably save even **a few chair hours a month**, would that matter for you right now?”

CTA: “If yes, 15 minutes and I’ll show you the workflow and pricing—no commitment.”

---

# Objection Handling (short, non-pushy)
## “We already send reminders.”
“Totally—most practices do. The difference is **two‑way confirmations + automated rescheduling + waitlist fill**. One‑way reminders still leave you guessing until the patient doesn’t show. Are you currently getting confirmations back in a structured way?”

## “Our software does that.”
“Some PMS tools have reminders, yes. The gap is usually **rescheduling and waitlist fill**—and the reporting on how much revenue you recovered. If you’re open, I can show you the flow in 15 minutes and you can decide if it’s redundant.”

## “We’re too busy.”
“That’s exactly why this is set up to reduce front desk workload. If it doesn’t save time and recover appointments, you shouldn’t keep it. Can we do a quick 15 minutes so you can decide fast?”

## “What does it cost?”
“It’s **$399/month per location** plus SMS pass‑through, and right now **$399 concierge setup** to launch quickly. If it doesn’t reduce no‑show pain measurably, you can cancel—no long contract.”

## “Send me an email.”
“Happy to. What’s the best email? I’ll send the overview link and pricing. Also—so I don’t spam you—should I follow up in two days, or is next week better?”

---

# Follow-Up Sequence (Email + LinkedIn) — 7 touches
All messages should include:
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Reply-to: agent_bob_replit+no-show-bot@agentmail.to

## Touch 1 (Email) — after first call attempt
Subject: Quick question about no-shows at [Practice]

Hi [Name] — Bob here.

Do no‑shows / same‑day cancellations cause chair gaps at [Practice]?
We help dental practices reduce it with **two‑way SMS confirmations**, an **easy reschedule link**, and **waitlist fill** when someone drops.

30‑second overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Worth a 15‑minute look this week?
—Bob
agent_bob_replit+no-show-bot@agentmail.to

## Touch 2 (LinkedIn DM) — day 2
Hi [Name]—Bob here. We help dental practices cut no‑shows with **two‑way text confirmations + rescheduling + waitlist fill**. 
If chair gaps are an issue, I can show the workflow in 15 minutes. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

## Touch 3 (Email) — day 3 (ROI angle)
Subject: Recovering 2–4 appointments/month at [Practice]

Hi [Name] — most practices only need to recover **2–4 appointments/month** for this to pay for itself.

Are you currently getting structured confirmations back by text (yes/no) and automatically filling cancellations from a waitlist?
If not, I can walk you through what we set up in ~15 minutes.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
—Bob (agent_bob_replit+no-show-bot@agentmail.to)

## Touch 4 (Call) — day 4
“Hi [Name], Bob—calling quickly because I sent a short note about reducing no‑shows with two‑way confirmations + waitlist fill. Is that a priority right now or should I close the loop?”

## Touch 5 (Email) — day 6 (implementation reassurance)
Subject: Launch in ~1 week (concierge setup)

Hi [Name] — if this is interesting, we can usually launch in about **a week** with concierge setup.

If you reply with (1) your appointment volume ballpark and (2) whether you have a waitlist today, I’ll tell you in one email if we’re a fit.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
—Bob
agent_bob_replit+no-show-bot@agentmail.to

## Touch 6 (LinkedIn DM) — day 8
Circling back—should I talk with you or someone else about scheduling/confirmations? If you point me to the right person, I’ll send a concise overview.

## Touch 7 (Breakup Email) — day 10
Subject: Close the loop?

Hi [Name] — should I close the loop on this?
If reducing no‑shows / last‑minute cancels becomes a priority later, the overview is here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you want, reply with “later” and I’ll follow up next month.
—Bob
agent_bob_replit+no-show-bot@agentmail.to

---

# What to say on the demo (2-minute structure)
1) Their current process (confirmations, reschedules, waitlist)
2) Show two‑way confirmation flow (YES confirmed / NO triggers reschedule)
3) Show waitlist fill (broadcast to opted-in list)
4) Show simple analytics: recovered appointments → estimated recovered revenue
5) Close: “If you want this live, it’s $399/mo + $399 setup right now. Cancel anytime / 14‑day risk-free option.”
