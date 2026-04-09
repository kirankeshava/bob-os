# Day-1 Outbound Ops Pack: Lead List Build + HubSpot Fields + Send/Call Cadence + Reply Handling (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T07:15:48.526Z

---

Business offer (use verbatim in outreach)
We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours. Proof/legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply/contact: agent_bob_replit+no-show-bot@agentmail.to

1) FREE CRM SETUP (HubSpot) — pipeline + required fields
Pipeline stages (minimum viable):
1. New Lead (Uncontacted)
2. Emailed 1
3. Emailed 2
4. Called 1
5. Connected / Qualifying
6. Demo Booked
7. Demo Held
8. Closed Won
9. Closed Lost
10. Nurture (Future)

Contact/Company properties to create/use (columns for import):
- Company Name
- Website
- Industry (Dentist/Chiro/MedSpa/PT/Optometry/etc.)
- City
- State
- Address
- Main Phone
- Owner/Manager Name
- Owner/Manager Title
- Owner/Manager Email
- Secondary Email (optional)
- Notes (free text)
- Lead Source (Google Maps / Website / Yelp / FB)
- Status (stage)
- Last Touch Date
- Next Step (call, follow-up, demo)

Logging standard (speed rules):
- Every touch gets a date + channel + 1-line outcome.
- Every positive reply gets an explicit next step scheduled (demo link + time).

2) FIRST 250 LEADS IN 1–2 HOURS (FREE SOURCES) — city clusters + verticals
Pick 2 city clusters for week 1 (example clusters; choose based on where you want density):
Cluster A: Phoenix metro (Phoenix, Tempe, Mesa, Scottsdale)
Cluster B: Dallas metro (Dallas, Plano, Frisco, Richardson)

Vertical targets (high no-show pain):
- Med spas / aesthetics
- Chiropractic
- Physical therapy
- Dental (esp. multi-op or cosmetic)
- Optometry

Exact Google Maps queries (copy/paste):
- “med spa Phoenix” / “aesthetic clinic Phoenix”
- “chiropractor Tempe”
- “physical therapy Mesa”
- “dentist Scottsdale”
- “optometrist Plano”

What to capture per listing (fast pass):
- Company name, website, phone, city/state, Google rating, #reviews
- From website: look for “Contact”, “Team”, “About”, “Book appointment” pages
- Extract emails (owner/manager/admin). If no email listed: use contact form URL and note “Form Only”.

Dedupe rules:
- Dedup by Website domain first, then by Main Phone.
- If multiple locations under one brand, keep each location as separate Company record but link notes (“part of X brand”).

Priority scoring (simple):
- +2 if online booking exists (more likely to have scheduling workflow)
- +2 if multiple providers (team page shows 3+)
- +1 if 4.0–4.6 rating with high review count (volume signal)

3) DAY-1 EMAIL EXECUTION — 50–100 sends (plain text, manual batches)
Send plan:
- Batch size: 20–25 emails per batch, 2–4 batches/day.
- Avoid links except legitimacy URL once per email. Keep it human.
- Subject lines (rotate):
  A) “quick question about no-shows”
  B) “{City} schedule gaps”
  C) “two-way confirmations (not robocalls)”

Email #1 (short, direct):
Subject: quick question about no-shows
Hi {FirstName} — I’m Bob.

Do you have any issue with no-shows or last‑minute cancels at {BusinessName}?

We reduce no-shows using two-way SMS confirmations + instant reschedules + waitlist fill (done-for-you setup in 24–48 hours). Quick overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you tell me roughly how many appointments/week you run and your average $ per visit, I can estimate what you’d recover.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

Email #2 (48 hours later):
Subject: {BusinessName} — confirmations + reschedules
Hi {FirstName} — following up.

Most clinics I talk to lose 5–15% of the schedule to no-shows/cancels. Our system:
1) texts reminders,
2) asks for a YES/NO confirmation,
3) if NO, auto-offers reschedule options,
4) fills gaps from a waitlist.

Worth a 10-minute look? If yes, reply with 2 times that work.
— Bob

Email #3 (4–5 days later, break-up):
Subject: close the loop?
Hi {FirstName} — should I close the loop, or is reducing no-shows a priority this month?

If you reply with appointment volume + avg visit value, I’ll send a quick recovered-revenue estimate.
— Bob

4) CALL + TEXT CADENCE (20–40/day)
Call opener (gatekeeper friendly):
“Hi, is the person who handles scheduling operations or the owner available? Quick question about reducing no-shows with two-way SMS confirmations.”

If decision maker answers:
“Hi {Name}, Bob here. I’ll be brief — we help clinics reduce no-shows using two-way SMS confirmations, instant reschedules, and waitlist fills. Are no-shows something you’re actively trying to cut right now?”

If yes → qualify (30 seconds):
- “About how many appointments per week?”
- “What’s a typical $ value per visit?”
- “What % no-show / last-minute cancel do you see?”
- “What system do you schedule in (e.g., Dentrix, Jane, Mindbody, etc.)?”
Close to demo:
“Got it. This is usually a 10-minute demo. What’s better — later today or tomorrow?”

Text (only if compliant and business line; keep minimal):
“Hi {Name} — Bob. Quick one: we reduce no-shows for clinics w/ two-way SMS confirmations + instant reschedules + waitlist fill. Want a 10-min demo? Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  Reply YES and I’ll send times. agent_bob_replit+no-show-bot@agentmail.to”

5) REPLY HANDLING SNIPPETS (copy/paste)
If “How much?”
“Depends on appointment volume + # locations. Most single locations land in the $199–$499/mo range. If you share approx. appts/week + avg visit value, I’ll recommend the right tier and estimate recovered revenue.”

If “We already use reminders”
“Totally — most systems do 1-way reminders. The lift usually comes from two-way confirmations + automatic reschedules + filling gaps from a waitlist. That’s where no-shows drop and utilization goes up.”

If “Not interested”
“No worries — before I go, is it because no-shows aren’t a problem, or timing/budget? (Helps me not bother you again.)”

6) DAILY KPI REPORT (paste into a doc each day)
Date:
Leads added:
Emails sent:
Replies:
Positive replies:
Demos booked:
Demos held:
Closes won:
Closes lost:
Key objections heard:
What worked today (subject line / opener):
Top 5 next steps (names + date/time):

Immediate next execution step (tomorrow morning):
- Build first 200–500 leads (2 clusters x 5 verticals), import to HubSpot, then run 2–4 email batches + 20–40 calls/texts with same-day logging.
