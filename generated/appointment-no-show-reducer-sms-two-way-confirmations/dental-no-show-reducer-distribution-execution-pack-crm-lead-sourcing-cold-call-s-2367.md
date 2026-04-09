# Dental No-Show Reducer — Distribution Execution Pack (CRM + Lead Sourcing + Cold Call Script + 5-Day Cadence)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T21:03:30.319Z

---

Business proof URL (use in every touch): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business email (use for replies): agent_bob_replit+no-show-bot@agentmail.to

1) Google Sheets CRM Template (create 1 spreadsheet with these tabs)

TAB A — LEADS
Columns (left to right):
- Lead ID
- Practice Name
- Location (City, State)
- Website
- Phone
- Owner Name
- Owner Email
- Office Manager Name
- Office Manager Email
- Source (Google Maps / Website / Facebook / LinkedIn)
- Specialty (General / Ortho / Perio / Pediatric)
- # Providers (1 / 2–3 / 4+)
- Multi-location? (Y/N)
- Tech clues (online booking? text opt-in? forms?)
- Notes (anything relevant)
- Status (Not Contacted / Touched 1 / Touched 2 / Replied / Booked / No Fit / Closed Won / Closed Lost)
- Last Touch Date
- Next Step
- Next Step Date

TAB B — ACTIVITY LOG
Columns:
- Date
- Lead ID
- Channel (Email / Call / LinkedIn)
- Touch # (1–5)
- Outcome (No answer / Left VM / Gatekept / Connected / Replied)
- Next action

TAB C — PIPELINE
Columns:
- Lead ID
- Stage (Replied / Qualified / Demo Scheduled / Proposal Sent / Closed Won)
- Demo Date/Time
- Decision Maker (Owner/OM)
- Pain score (1–5)
- Expected no-show volume (est.)
- Offer presented (Y/N)
- Price quoted
- Close likelihood (Low/Med/High)

TAB D — METRICS
Manual rollups (simple):
- Leads added (count)
- Touches sent (count)
- Replies (count)
- Reply rate
- Demos booked (count)
- Demo rate per reply
- Closed won (count)
- $ Collected (Setup + Month 1)
- Target pace (daily)

2) Free Lead List Build Spec (first 200 dental locations)

Goal: 200 single-location + small group dental practices in 2–3 metro areas where you can call during business hours (local time zones).

Pick metros (example): Phoenix AZ, Dallas TX, Tampa FL (choose 2–3).

Step-by-step (no paid tools):
A) Google Maps search queries (copy/paste):
- “dentist near me” (zoom into target neighborhoods)
- “family dentistry [city]”
- “cosmetic dentist [city]”
- “dental implants [city]” (higher ticket; often cares about schedule utilization)
Exclude: “dental school”, “free clinic”, “mobile dentistry”, “Medicaid only” if stated.

B) Qualification quick filter (before adding):
- Has a real practice website (or at least active Google Business profile)
- Has 1–5 locations (small DSO acceptable)
- Appears to book appointments regularly (hours posted, reviews, operatories implied)

C) Find decision-maker contacts (free enrichment order):
1. Practice website → “Team”, “About”, “Contact” pages (look for Office Manager / Practice Manager)
2. Website footer/contact → general email (frontdesk@, info@). Capture it even if you don’t find a name.
3. Facebook business page → “About” section sometimes lists email.
4. LinkedIn (manual) → search “{Practice Name} office manager” or “practice manager” + city.

D) What to enter in CRM if you can’t find direct email:
- Put the main contact email you can find (info@) and prioritize calling.
- Capture owner name from “Dr. First Last” on website even if no email.

E) Daily build target:
- Day 1: 50 leads loaded
- Day 2: +50 (100 total)
- Day 3: +50 (150 total)
- Day 4: +50 (200 total)

3) Cold Call Script (Dental) — receptionist to office manager + booking

Purpose: book a 15-minute call/demo. Keep it short, respectful, and ROI-based.

OPENER (Receptionist/front desk)
“Hi — can you help me out? This is Bob Smith. Quick question: who handles missed-appointment and confirmation workflows there — is that the office manager or the owner?”

IF THEY ASK “WHAT IS THIS ABOUT?”
“Totally—super quick. We help dental practices reduce no-shows using two-way text confirmations and automated reschedules, and we track the recovered revenue per location. I’m not trying to sell you over the phone—just aiming to get 15 minutes with the right person to see if it’s relevant.”

TRANSFER REQUEST
“Could you transfer me to {Office Manager Name if known}? If they’re not available, what’s the best email to send a 3-sentence summary and a link to our info page?”

IF YOU GET THE OFFICE MANAGER
“Hi {Name} — Bob Smith here. I’ll be brief. We help dental practices cut no-shows by sending smart reminders and two-way SMS confirmations, and if a patient can’t make it we automatically route them to reschedule and can fill gaps from a waitlist. We also report recovered revenue so you can quantify the impact.

Would it be crazy to do a quick 15-minute look at your current confirmation process this week and see if we can recover a few appointments per month?”

QUALIFYING QUESTIONS (pick 2–3)
- “Roughly how many appointments do you have per day?”
- “Do no-shows or late cancels hit you more—hygiene, doctor chair time, or both?”
- “What are you using today for reminders—PMS texts, a third-party tool, or mainly manual calls?”

BOOKING CTA
“If it’s helpful, I can send a short overview to your email and we can pick a time. What’s better—tomorrow morning or Thursday afternoon?”

CREDIBILITY LINE (use if needed)
“You can see a quick overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 and you can reach me at agent_bob_replit+no-show-bot@agentmail.to.”

OBJECTION HANDLING (short)
- “We already send texts.”
“Totally—most offices do. The difference is two-way confirmations + automated reschedule routing + waitlist fill, plus we quantify recovered revenue. If you’re already getting near-zero no-shows, we’ll know in 15 minutes and I’ll get out of your hair.”

- “We don’t have budget.”
“Understood. Our goal is to pay for ourselves by recovering even a small number of appointments. If we can’t see a clear ROI path, we won’t push it. Can we do 15 minutes to sanity-check the math?”

- “Send me info.”
“Happy to. What’s the best email? I’ll send a 3-sentence summary, the link, and two example outcomes. If it looks relevant, what day should I follow up—Wednesday or Friday?”

4) 5-Day Outreach Cadence (Email + LinkedIn + Call)

Daily activity targets (per day for 5 business days):
- 40–60 emails
- 20–30 LinkedIn connection/DM attempts (manual)
- 15–25 calls (same leads as emails)

Day 1 (Touch 1):
- Email #1 (owner or OM template) + include proof URL and reply email.
- Call same day (or next morning): use receptionist script; ask for OM.
- LinkedIn: connection request to OM/owner with 1-line note.

Day 2 (Touch 2):
- Follow-up email: 2–3 lines, restate outcome (“confirm/reschedule/waitlist; recovered revenue tracking”).
- Call again at a different time block.

Day 3 (Touch 3):
- LinkedIn DM (if connected) OR second connection attempt to alternate contact (OM if you tried owner first).
- Short email with a single question: “Are no-shows/late cancels a priority this month, or should I close the loop?”

Day 4 (Touch 4):
- Call with a direct scheduling ask: “15 minutes to see if you can recover 2–5 appointments/month?”
- Email with 3 bullets + CTA to book.

Day 5 (Touch 5 breakup):
- Breakup email: polite close-the-loop; offer to send info and disappear.
Include: proof URL + “If the timing changes, reply ‘later’ and I’ll follow up next month.”

Operational rule: every lead must have a Next Step Date in the CRM. No ‘stale’ leads.

If you want, I can turn this into: (a) a filled 50-lead starter list for a chosen metro, and (b) a one-page call sheet for printing.