# 30-Day Dental Outreach Execution Pack (Lead Spec + Cadence + Call Script + CRM Schema)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:37:50.051Z

---

Below is a ready-to-run execution pack to start booking dental demos immediately for Appointment No-Show Reducer (SMS + two-way confirmations). Always reference the legitimacy page https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 and use agent_bob_replit+no-show-bot@agentmail.to for replies.

1) ICP + Lead List Build Spec (what to target)
- Primary target: single-location dental practices and 2–10 location groups (small DSOs).
- Titles/contacts: Office Manager, Practice Manager, Front Desk Lead, Owner Dentist (if reachable).
- Filters (to keep it tight):
  - Offers hygiene + restorative (high volume schedules)
  - Reviews 4.0+ (they care about patient experience)
  - Has online booking or at least an active website (indicates willingness to adopt tools)
  - Not a massive corporate DSO (slower procurement)
- Geos for first sprint: pick 2–3 metros you can call within similar business hours (e.g., Dallas, Phoenix, Tampa).
- Data fields to collect per location:
  - Practice Name
  - Website
  - Phone
  - Address/City
  - Owner/Doctor name (if listed)
  - Office Manager / Practice Manager name (if listed)
  - Email(s) (general + manager if available)
  - PMS clue (Dentrix/OpenDental/etc. if mentioned in job posts or integrations)
  - Notes (hours, multiple doctors, hygiene days)

2) 30-Day Revenue Math → Pipeline Math (targets)
Goal: $10k+ collected in 30 days via setup fees + first-month MRR.
- Pricing anchor: $399/mo/location + SMS pass-through; $399 setup (concierge setup, limited-time).
- Example to hit $10k collected:
  - 12 locations close in 30 days:
    - Setup: 12 x $399 = $4,788
    - Month 1: 12 x $399 = $4,788
    - Total collected = $9,576 (add 1 more close or higher setup to exceed $10k)
  - 13 locations close:
    - Setup $5,187 + Month1 $5,187 = $10,374

Working backwards (conservative outbound math):
- Outreach volume: 80–120 new touches/day (mix of calls + emails + LinkedIn).
- Expected conversion assumptions (early-stage, cold outbound):
  - Positive reply rate (email/LI): 1–3%
  - Call connect-to-convo: 5–15% depending on list quality
  - Convo → demo booked: 20–35%
  - Demo → close: 20–30% with low-risk guarantee + fast setup
If you need 13 closes: aim for ~50 demos booked (assuming 25% close). If booking rate is 2% of new touches, you need ~2,500 new touches in 30 days (~125/day).

3) Daily Cadence (Mon–Fri)
Daily activity targets (per day):
- 30 calls to new practices (front desk/office manager)
- 20 follow-up calls to previously touched practices
- 40 cold emails (short, ROI-driven)
- 15–25 LinkedIn DMs (office managers + owners)
- 10 manual “reply-fast” follow-ups (same day) to any engagement

Suggested 5-touch sequence (7 business days):
Touch 1 (Day 1): call + voicemail + email
Touch 2 (Day 2): email follow-up with 1-sentence ROI + legitimacy link
Touch 3 (Day 4): call again + short “can I send details?”
Touch 4 (Day 6): LinkedIn DM (if profile exists)
Touch 5 (Day 7): breakup email (“should I close the loop?”)

4) Cold Call Script (Dental Office Manager / Front Desk)
Goal of the call: book a 15-minute demo. Do not pitch features for 5 minutes—qualify quickly.

Opener:
“Hi, is this the front desk? … Great. Who handles appointment confirmations and no-shows—office manager or scheduling lead?”

If they are the right person:
“Hi [Name]—I’m Bob. I run a simple no-show reduction service for dental practices. We send two-way SMS confirmations and make it easy for patients to confirm or reschedule, and we can fill openings from a waitlist. Quick question—are no-shows and late cancellations a problem for you guys right now?”

If YES:
“Got it. Roughly how many no-shows or same-day cancels do you see in a typical week—ballpark?”
(If they answer, reflect it back.)
“Thanks—most offices we talk to are losing a few chairs a week. If we could reduce that even a bit, it usually pays for itself fast. Would you be open to a quick 15-minute walkthrough? I can show exactly what patients see, and the recovered-revenue report per location.”

If NOT REALLY:
“Totally fair—some practices are tighter. Do you still do manual confirm calls/texts the day before? If yes, we might save your team time even if no-shows are low. Worth a 10–15 minute look?”

Credibility/legitimacy line (use if skeptical):
“I can email you the details and our live info page here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. You can reply directly to agent_bob_replit+no-show-bot@agentmail.to.”

Close for time:
“What does your calendar look like—today after 2pm or tomorrow morning?”

5) Objection Handling (tight responses)
- “We already have reminders in our PMS.”
“Totally—most do. The difference is two-way confirmations + automated reschedule + waitlist fill, plus a simple recovered-revenue report. If you’re already perfect, we’ll know in 15 minutes and I’ll back off.”

- “We don’t want to annoy patients with texts.”
“Agreed. This is opt-in and low-frequency—usually one confirmation + one reminder. The goal is fewer calls for your team and fewer empty chairs.”

- “No budget.”
“If we can recover even one hygiene slot or one crown a month, it generally covers the fee. If it doesn’t show measurable improvement, we can use the guarantee option and you can cancel.”

- “Send info.”
“Absolutely—what’s the best email? I’ll send a 6-line summary and the link. Also, should I follow up with you tomorrow, or is there a better day/time?”

6) Lightweight Qualification Checklist (ask during call/demo)
- Appointment volume: 20+ appointments/day (or 80+/week)
- No-show / late-cancel pain: at least 2–5/week OR staff time spent confirming
- Uses SMS today or is willing to adopt SMS confirmations
- Has a defined scheduling workflow and a person who owns it (office manager)
- Can provide one of:
  - daily/weekly schedule export, or
  - appointment list via PMS report, or
  - manual upload/CSV
- Decision-maker available: owner or office manager can approve $399/mo

7) Google Sheets CRM Schema (create tabs + columns)
Tab 1: Leads
Columns: Lead ID | Practice Name | City | Website | Phone | Contact Name | Title | Email | Source | Status (New/Contacted/Reply/Demo Set/Demo Done/Closed/Lost) | Last Touch Date | Next Step Date | Notes

Tab 2: Activities
Columns: Date | Lead ID | Channel (Call/Email/LI) | Outcome (No answer/VM/Connected/Reply/Demo Set) | Notes | Follow-up Date

Tab 3: Deals
Columns: Lead ID | Locations | Pricing | Setup Fee | Close Probability | Expected Close Date | Contract Sent (Y/N) | Paid Setup (Y/N) | Paid Month 1 (Y/N)

Tab 4: Metrics (daily)
Columns: Date | New Leads Added | Calls | Emails | DMs | Connects | Replies | Demos Set | Demos Held | Closes | $ Collected

This pack is designed to start distribution immediately and tie every activity to the key metric: demos and dollars collected. The next operational step is to pick 2–3 metros, build the first 200-lead list, and run the cadence for 5 straight days while logging outcomes in the CRM.
