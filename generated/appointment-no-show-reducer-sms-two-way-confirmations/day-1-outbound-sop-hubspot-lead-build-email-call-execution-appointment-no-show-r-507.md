# Day-1 Outbound SOP (HubSpot + Lead Build + Email/Call Execution) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T07:46:15.762Z

---

Objective (30-day sprint)
Book 40 demos and close 20–25 locations for “Appointment No-Show Reducer” (two-way SMS confirmations + instant reschedules + waitlist fill). Offer positioning: “Done-for-you setup in 24–48 hours.”

Legitimacy + contact
- Website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Reply/booking email: agent_bob_replit+no-show-bot@agentmail.to

A) HubSpot (Free) setup — minimum viable
Pipeline stages (keep it simple, speed > perfection):
1) New Lead (not contacted)
2) Emailed 1
3) Emailed 2
4) Called/SMS Attempted
5) Replied – Working
6) Demo Scheduled
7) Demo Held
8) Closed Won
9) Closed Lost
10) Do Not Contact

Custom properties (create only these to start):
- Vertical (Dental/Chiro/Med Spa/PT/Optometry/Other)
- City Cluster
- Role (Owner/Manager/Front Desk)
- Scheduling System (Unknown/Square/Acuity/Cliniko/ChiroTouch/Dentrix/Other)
- Appts per week (est.)
- No-show rate (est.)
- Value per visit (est.)
- Qualified? (Y/N)
- Next Step Date

Logging rules
- Every touch must be logged as an activity note: “Email #1 sent”, “Call – VM left”, “SMS sent”, “Replied – asked price”, etc.
- If they say stop/unsubscribe: set stage = Do Not Contact and note the date/time.

B) Lead list build (first 200 prospects) — free sources only
Target verticals for batch #1 (highest no-show pain):
1) Chiropractors
2) Med spas/aesthetics
3) Dental (general + orthodontics)

Pick 2 city clusters (example): Phoenix AZ + Dallas TX. (Any two large metros work.)

Free sourcing workflow (fast manual)
1) Google Maps search queries:
- “chiropractor Phoenix AZ”
- “med spa Phoenix AZ” / “aesthetic clinic Phoenix AZ”
- “dentist Phoenix AZ” / “orthodontist Phoenix AZ”
Repeat for Dallas.
2) Open listing → website → find Contact/About/Team pages.
3) Capture owner/manager name + email if listed. If no email listed, capture contact form URL and main phone.
4) Dedupe: remove exact duplicates by domain + phone.

Lead capture columns (sheet + HubSpot import mapping)
- Company Name
- Website
- Location (City, State)
- City Cluster
- Vertical
- Contact First Name
- Contact Last Name
- Title/Role
- Email
- Phone
- Address (optional)
- Notes (e.g., “Uses online booking”, “Multiple locations”, “Open weekends”)
- Source URL (Google Maps / directory link)

Qualification tags (fill if obvious)
- Appts/week: estimate via #providers × typical volume (rough ok)
- Value/visit: vertical defaults if unknown (Chiro $60–$120, Med spa $150–$400, Dental $150–$300)

C) Day-1 sending plan (50–100 emails)
Deliverability basics (free, fast)
- Send plain-text.
- No images, no attachments.
- 1 link max (use legitimacy site only when needed).
- Keep first email link-free if possible; use URL in follow-up or when asked.

Daily schedule (repeatable)
- Block 1: 9:00–10:00am — send 25–50 emails
- Block 2: 1:30–2:30pm — send 25–50 emails
- Call block 1: 11:00–12:00 — 10–20 calls
- Call block 2: 4:00–5:00 — 10–20 calls

D) Cold email sequence (ready to paste)
Use reply-to: agent_bob_replit+no-show-bot@agentmail.to

Subjects (rotate):
1) quick fix for no-shows at {{Clinic}}
2) two-way SMS confirmations (not just reminders)
3) reduce last-minute cancellations?
4) filling gaps from a waitlist
5) question about your appointment reminders
6) {{City}} clinics using a simple confirm/reschedule flow

Email #1 (Day 1)
Hi {{FirstName}} — quick question.

Do you have an easy way for patients to *confirm or reschedule* by text (two-way), or are reminders mostly one-way?

We help appointment-based clinics reduce no-shows using two-way SMS confirmations, instant reschedules, and waitlist fills. Setup is done-for-you in 24–48 hours.

Worth a 10-minute look this week?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

Email #2 (Day 3)
Hi {{FirstName}}, following up.

If you’re doing even ~{{ApptsPerWeek}} appointments/week, a small drop in no-shows usually pays for itself fast.

If helpful, I can show the exact confirm/reschedule flow and the simple analytics that quantify recovered revenue per location.

Do you handle scheduling, or is there an office manager I should speak with?
— Bob

Email #3 (Day 6) — include legitimacy URL
Hi {{FirstName}} — last quick nudge.

Here’s the overview so you can see it’s legit: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

If you want, reply with:
1) appointments/week (rough), and
2) your no-show % (estimate)
…and I’ll tell you if it’s a good fit.
— Bob
agent_bob_replit+no-show-bot@agentmail.to

Email #4 (Day 10) — breakup
{{FirstName}}, should I close the loop?

If no-show reduction isn’t a priority right now, no worries—just reply “not now” and I won’t follow up.

If you *are* open to it, reply “yes” and I’ll send 2 times for a 10-minute demo.
— Bob

E) Call opener + voicemail (for 20–40/day)
Opener:
“Hi, is this {{FirstName}}? This is Bob — quick one. We help clinics reduce no-shows with two-way SMS confirmations and instant reschedules (not just reminders). Who’s the best person to talk to about scheduling and no-shows?”

If gatekeeper:
“Totally—would that be the office manager or owner? What’s their name and best email?”

Voicemail:
“Hi {{FirstName}}, Bob here. We help reduce no-shows using two-way text confirmations + instant reschedules + waitlist fills. Done-for-you setup in 24–48 hours. If you want details, reply to agent_bob_replit+no-show-bot@agentmail.to. Again, agent_bob_replit+no-show-bot@agentmail.to.”

F) Reply handling (fast qualify)
If “How much?”
“Depends on location count and appointment volume. If you reply with (1) appts/week and (2) estimated no-show %, I’ll send the right tier. If it’s a fit, setup is done-for-you in 24–48 hours.”

If “Send info”
“Absolutely—here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. Quick question: what scheduling system are you using today?”

If “Not interested”
“Understood—thanks. I’ll close the loop. If no-shows become a headache later, you can reach me at agent_bob_replit+no-show-bot@agentmail.to.”

KPI targets to hit daily
- Emails sent: 50–100
- Calls placed: 20–40
- Positive replies: 2–6/day (goal)
- Demos booked: 1–2/day
- Demos held: 1/day (lagging)
- Closes: 0.5–1/day after pipeline matures

Definition of “Qualified”
- Appointment-based with 50+ appts/week OR high value/visit ($150+) AND recurring scheduling
- Can identify decision maker for reminders/scheduling
- Acknowledges no-shows or last-minute cancellations as a problem

Close/next step
At demo end: “If you want, we can onboard you concierge-style and have reminders running in 24–48 hours. Want me to send the signup link and we schedule onboarding right after?”

This SOP is designed so a single operator can build 200 leads, send 50–100/day, and log everything in HubSpot without paid tools.