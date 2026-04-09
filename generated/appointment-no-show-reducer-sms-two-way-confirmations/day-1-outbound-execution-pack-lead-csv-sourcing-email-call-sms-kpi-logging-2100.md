# Day-1 Outbound Execution Pack (Lead CSV + Sourcing + Email/Call/SMS + KPI Logging)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T19:42:11.019Z

---

Business / legitimacy references to include in every touch:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Email: agent_bob_replit+no-show-bot@agentmail.to

1) HubSpot Import CSV Template (copy these columns exactly)
Use one row per Contact. If you only have a company phone at first, still create the contact and log the source.

CSV columns:
- Company Name
- Website
- Industry Vertical (Dentist/Chiro/Med Spa/PT/Optometry)
- City
- State
- Address
- Primary Phone
- Contact First Name
- Contact Last Name
- Contact Title (Owner/Office Manager/Practice Manager/Front Desk)
- Contact Email
- Contact Mobile (if available)
- Source URL (Google Maps listing or directory URL)
- Notes (e.g., “online booking on site”, “multiple locations”, “mentions no-show policy”)
- Stage (New / Contacted / Replied / Demo Booked / Demo Held / Trial Started / Closed Won / Closed Lost)
- Last Touch Date
- Next Step (e.g., “Call Tues 10am”, “Send follow-up #1”, “Book demo link”)

2) Free Lead Sourcing Plan (200 leads total)
City clusters:
A) Dallas–Fort Worth, TX (DFW)
B) Phoenix–Mesa–Scottsdale, AZ

Vertical targets per cluster (goal 20 leads each = 100 per cluster):
- Dentists (20)
- Chiropractors (20)
- Med Spas (20)
- Physical Therapy (20)
- Optometry (20)

Google Maps search strings (copy/paste):
- “dentist near Dallas TX” / “dentist near Fort Worth TX”
- “chiropractor near Dallas TX”
- “medical spa near Dallas TX”
- “physical therapy near Dallas TX”
- “optometrist near Dallas TX”
Repeat for Phoenix/Mesa/Scottsdale.

Process (zero-cost, fast):
1) Open Google Maps results, pick practices with decent review volume (social proof) and clear appointment scheduling.
2) Open website → find Contact page → capture email (office manager / front desk / info@) and phone.
3) If no email, still capture phone + website and note “email missing—call-first”.
4) Dedupe rule: if same website/phone, keep one record; if multi-location, create separate records per location but tie notes (“multi-location”).

3) Day-1 Execution Runbook (targets: 50–100 emails; 20–40 calls)
Morning block (60–90 min):
- Build 25–50 new leads (DFW Dentists + Chiro).
- Import to HubSpot.

Midday email block (60 min):
- Send 50–100 plain-text emails (manually or via CRM sequences if available). Keep it simple. No images. No attachments.
- Log in HubSpot: Stage=Contacted, Last Touch Date=Today, Next Step=“Follow-up #1 in 2 business days”.

Afternoon call block (60–90 min):
- Call 20–40 numbers.
- Outcomes to log: Answered (pitched), Gatekeeper, VM left, Wrong number, Not interested.
- If they answer and show interest: book demo immediately (same week).

Optional SMS (only if compliant and after a call or if they provided mobile publicly):
- Send short text referencing the call and offering the demo link.

Daily KPI log (end of day):
- Emails sent
- Calls placed
- Connects
- Replies
- Demos booked
- Demos held
- Trials started
- Closed won
Notes: what objections appeared + which vertical responded best.

4) Cold Email Templates (ready to paste)

Email #1 (short, owner/manager)
Subject: quick fix for appointment no-shows
Hi {{FirstName}} — I’m Bob.
We help appointment-based locations reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill.

If you’re doing {{Vertical}} appointments, what’s your typical no-show rate right now?
If it’s worth it, we can set this up done-for-you in 24–48 hours (free to try this week).

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply here or email me: agent_bob_replit+no-show-bot@agentmail.to

— Bob

Email #1 (more quantified)
Subject: reduce no-shows (confirm + reschedule by text)
Hi {{FirstName}},
Many practices lose revenue to last-minute no-shows because patients don’t confirm, can’t reschedule fast, and there’s no waitlist backfill.

Our system:
1) sends SMS reminders
2) asks “Confirm / Reschedule”
3) auto-reschedules and offers open slots to a waitlist
4) shows simple analytics (recovered visits / revenue)

Open to a 10-minute demo this week?
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob (agent_bob_replit+no-show-bot@agentmail.to)

Follow-up #1 (2 business days later)
Subject: Re: reduce no-shows
Hi {{FirstName}} — checking if you’re the right person for appointment scheduling/no-show prevention.
If not, who should I contact?

If yes: what’s your average appointments/day and what do no-shows cost per visit?
— Bob

Follow-up #2 (soft close)
Subject: should I close the loop?
Hi {{FirstName}}, last note from me.
If no-show reduction isn’t a priority, tell me and I’ll stop. If it is, I can show you the two-way confirmation + reschedule flow in 10 minutes.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob | agent_bob_replit+no-show-bot@agentmail.to

5) Call Script (front desk → manager)
“Hi, this is Bob. Quick question—who handles appointment reminders and no-show prevention for the practice?”
If manager/owner:
“We help reduce no-shows using two-way SMS confirmations—patients can confirm or reschedule by text—and if a slot opens we can fill it from a waitlist. If you’re open, I can show the flow in 10 minutes. What does a no-show cost you per visit?”
Close:
“Want to book a quick demo? I can do {{two time options}}. Or I can send details: agent_bob_replit+no-show-bot@agentmail.to.”

Voicemail:
“Hi {{Name}}, Bob here. We help reduce appointment no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. It’s done-for-you in 24–48 hours and free to try this week. Call me back at {{your number}} or email agent_bob_replit+no-show-bot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2.”

6) SMS (after a call/voicemail; keep it compliant)
“Hi {{FirstName}}—Bob here (no-show reduction). We send two-way SMS confirmations (Confirm/Reschedule) + can fill cancellations from a waitlist. Want a 10-min demo? Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 — agent_bob_replit+no-show-bot@agentmail.to”

7) Reply Handling Snippets
Positive:
“Great—what’s best for you, {{Option A}} or {{Option B}}? Also, roughly appointments/day and avg $ per visit?”

Price push:
“Totally fair. This week is free to try; after that it’s based on location volume. The goal is to quantify recovered visits so it pays for itself. Can we do a 10-min demo and I’ll estimate ROI from your numbers?”

Not interested:
“Understood—before I go, is it because no-shows aren’t an issue, or you already have a confirmation/reschedule system in place?”

Stop:
“Got it—sorry about that. I’ll stop reaching out.”
