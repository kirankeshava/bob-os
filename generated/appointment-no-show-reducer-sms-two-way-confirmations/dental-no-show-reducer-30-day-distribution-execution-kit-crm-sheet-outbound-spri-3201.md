# Dental No‑Show Reducer — 30‑Day Distribution Execution Kit (CRM Sheet + Outbound Sprint + Call Script)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:41:42.334Z

---

# Dental No‑Show Reducer — 30‑Day Distribution Execution Kit

## 1) 30‑Day revenue math → activity math
**Goal (30 days): $10,000 collected** (setup fees + first month MRR).
- Offer: **$399/mo/location + SMS pass‑through**
- Setup: **$399 one‑time concierge setup** (limited-time)

**Target closes:** 10 locations in 30 days
- Collected per close in month 1 ≈ **$399 setup + $399 month 1 = $798**
- 10 closes → **$7,980** collected
- Add 3 more closes OR slightly higher setup ($499 for multi-provider) → surpass **$10k**

**Pipeline assumptions (conservative for cold outbound to dental):**
- Positive reply rate: 3–6%
- Demo booking rate from positive replies: 30–40%
- Close rate from demos: 20–30% (with low-risk guarantee)

**Activity target to hit ~13 closes:**
- Need ~45 demos (at 28% close)
- Need ~120 positive replies (at 37% demo set)
- Need ~2,400 outbound touches (at 5% positive)

**Daily cadence (Mon–Fri, 4 weeks):**
- **120 emails/day** + **30 LinkedIn DMs/day** + **20 calls/day**
- 20 workdays → 2,400 emails + 600 DMs + 400 calls

## 2) ICP quick filter (who to target first)
**Best-fit dental practices** (fastest close + highest no-show pain):
- 1–5 locations OR small DSO (5–20)
- 8+ operatories or high hygiene volume
- Uses PMS with appointment exports (Dentrix / Eaglesoft / Open Dental / Curve, etc.)
- Has recurring “holes” in hygiene schedule and same-day cancellations

**Buyer titles:** Owner dentist, Practice manager, Office manager.

## 3) Google Sheet CRM template (copy/paste structure)
Create a Google Sheet with these tabs:

### Tab A: **Leads** (one row per location)
Columns:
1. Lead ID
2. Practice Name
3. Website
4. Location (City, State)
5. Phone
6. Owner Name
7. Office Manager Name
8. Email (Office Manager)
9. Email (Owner)
10. LinkedIn URL (Owner)
11. LinkedIn URL (Office Manager)
12. PMS (if known)
13. Notes (no-show clues, hours, hygiene focus)
14. Stage (Prospect / Contacted / Replied / Demo Booked / Proposal Sent / Closed Won / Closed Lost)
15. Last Touch Date
16. Next Follow-up Date
17. Channel (Email/LinkedIn/Call)
18. Outcome (No reply/Positive/Not now/Wrong person)
19. Personalized Hook (1 sentence)
20. Created By (Bob)

### Tab B: **Outreach Log** (one row per touch)
Columns:
1. Date
2. Lead ID
3. Practice Name
4. Channel
5. Message Type (Email #1 / Follow-up #1 / DM #1 / Call #1, etc.)
6. Result (Sent / Delivered / Opened / Replied / Voicemail / Connected)
7. Reply Text (paste key line)
8. Next Step

### Tab C: **Pipeline** (auto rollups)
- Metric cells:
  - Total Prospects
  - Contacted
  - Replies
  - Demos Booked
  - Demos Held
  - Closed Won
- Formulas (example using COUNTIF):
  - Replies: `=COUNTIF(Leads!N:N,"Replied")`
  - Demos: `=COUNTIF(Leads!N:N,"Demo Booked")`

### Tab D: **Revenue**
Columns:
1. Lead ID
2. Practice Name
3. Close Date
4. Setup Fee ($)
5. MRR ($)
6. Month 1 Collected (=Setup + MRR)
7. Notes

## 4) 5‑Day outbound sprint checklist (Week 1)
**Day 0 (prep, 2–3 hours):**
- Pick 2 metros (e.g., Phoenix + Dallas) and build first **50 leads**.
- For each lead add a **personalized hook** (e.g., “saw you’re booking hygiene 6 months out—holes are expensive”).
- Ensure every email includes legitimacy links:
  - Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
  - Contact: agent_bob_replit+no-show-bot@agentmail.to

**Days 1–5 (daily):**
- Send **120 emails** (mix owner + office manager)
- Send **30 LinkedIn DMs**
- Make **20 calls** to offices already emailed (same day)
- Log everything in Outreach Log
- Same-day replies: offer **2 time slots** for a 15-min demo

## 5) Cold call script (front desk → office manager)
**Goal:** book a 15-min demo, not sell.

**Opener (to front desk):**
“Hi — this is Bob. Quick question: who’s the best person there to handle appointment confirmations and last‑minute cancellations — the office manager?”

If they ask “what is this about?”
“Totally — we help dental practices cut no‑shows using two‑way text confirmations and easy rescheduling. I just need 30 seconds with the office manager to see if it’s relevant.”

**With office manager:**
“Hi [Name] — Bob here. I’ll be brief. We help dental practices reduce no‑shows and same‑day cancellations using two‑way SMS confirmations + a reschedule link + a waitlist fill. Practices usually recover a few appointments per week.

Can I ask: on a typical week, do you lose more appointments to no‑shows/cancels than you’d like — especially hygiene?”

If YES:
“Got it. If I could show you a simple workflow that confirms patients by text and automatically offers open slots to your waitlist, would a **15‑minute walk‑through** tomorrow or Thursday be better?”

If NO / “we’re fine”:
“Understood. Quick last question — do you currently text patients with a way for them to confirm ‘YES’ or reschedule without calling? If not, that’s usually where we find quick wins. Want to see it in 15 minutes and decide after?”

**Voicemail script (20 seconds):**
“Hi this is Bob — I help dental practices reduce no‑shows with two‑way text confirmations and easy rescheduling. If you want, I can share a 15‑minute demo and a quick estimate of recovered production. Email me at agent_bob_replit+no-show-bot@agentmail.to — proof page here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2.”

## 6) Objection handling (short)
**“We already text.”**
“Most do. The difference is **two‑way confirmation + reschedule + waitlist fill** so you’re not chasing patients manually. Are patients able to reply ‘C’ to confirm and ‘R’ to reschedule—and does it fill openings from a waitlist automatically?”

**“No budget.”**
“Totally fair. The intent is that it pays for itself by recovering even **1–2 appointments/month**. Also, we’re doing a **risk‑free start**—cancel anytime / first 14 days risk‑free. Want to sanity-check the ROI in 15 minutes?”

**“Too busy.”**
“That’s exactly who this is for. The setup is concierge; we do the configuration. Your part is just confirming the message wording and how you want waitlist offers handled.”

## 7) Demo booking close (email you can send immediately)
Subject: 15‑min demo — cut no‑shows + fill holes (dental)

“Hi [Name] — if helpful, here’s the overview and proof page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

We do two‑way text confirmations (patients reply YES/NO), send a reschedule link, and offer openings to a waitlist to fill gaps. If you want, I can show the workflow in 15 minutes.

Would **[Tomorrow 11:30am]** or **[Thu 2:00pm]** work?

— Bob
agent_bob_replit+no-show-bot@agentmail.to”
