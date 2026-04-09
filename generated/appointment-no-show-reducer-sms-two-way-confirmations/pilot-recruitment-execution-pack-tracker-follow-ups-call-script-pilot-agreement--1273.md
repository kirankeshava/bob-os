# Pilot Recruitment Execution Pack (Tracker + Follow-ups + Call Script + Pilot Agreement Email)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:55:24.583Z

---

Below is a ready-to-use execution pack to recruit and convert 2–3 rapid pilots for the Appointment No-Show Reducer. Use this legitimacy URL in every message: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support/contact email to include: agent_bob_replit+no-show-bot@agentmail.to

1) Outreach Tracker (copy into Google Sheet)
Columns:
- Company Name
- Niche (dentist/chiro/medspa/etc.)
- Location (City, State)
- Website
- Decision Maker Name
- Title
- Email
- Phone
- Channel (Email/LinkedIn/Call)
- Date 1st Touch
- Message Variant (A/B)
- Status (Not Contacted / Sent / Replied / Booked / Qualified / Live Pilot / Disqualified)
- Next Step
- Next Follow-up Date
- Notes (no-show pain, current reminder process, software used)

Status definitions:
- Qualified = appointment-based, meaningful no-show rate, has SMS consent process (or willing to implement), and can share baseline metrics.
- Live Pilot = reminders + two-way confirmations running for at least one provider/location.

2) Follow-up Sequence (2 touches)

Follow-up #1 (Day 2 after initial email)
Subject: Quick question about reducing no-shows at {{BusinessName}}
Body:
Hi {{FirstName}} — quick follow-up.

We’re running a small number of concierge pilots for an SMS + two-way confirmation system that reduces appointment no-shows and makes rescheduling automatic.

If you’re open to it, I can do a 15-minute walkthrough and show the workflow + reporting we send weekly.
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Would it be crazy to test this for 7 days at one location/provider?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

Follow-up #2 (Day 5 after initial email)
Subject: Close the loop? (7-day pilot)
Body:
Hi {{FirstName}} — closing the loop.

If no-shows aren’t a priority right now, no worries. If they are, we can run a 7-day concierge pilot and quantify impact (confirmations, reschedules, waitlist fills, and estimated recovered revenue/week).

You can see what we’re building here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Reply with either:
1) “Pilot” and I’ll send the 2-minute intake, or
2) “Later” and I’ll check back next month.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

3) 15-Minute Discovery + Qualification Call Script (goal: book pilot start date)

Prep (before call):
- Pull their hours, services, and booking flow from website.
- Confirm they’re appointment-based and have phone numbers on file.

Call agenda (15 minutes):
A) Context (1 min)
“Thanks {{Name}}. I’ll be quick: I want to understand your current reminder process, confirm you’re a fit for a 7-day pilot, and if yes, lock a start date.”

B) Pain + baseline (5 mins)
1. “Roughly how many appointments per week per location?”
2. “What’s your best guess on no-show rate? (even a range is fine)”
3. “Do you track no-shows in your system? Could you pull the last 4 weeks?”
4. “What’s the average appointment value? If it varies, what’s a conservative average?”
5. “What are no-shows costing you operationally (staff idle time, gaps you can’t fill)?”

C) Current workflow + constraints (4 mins)
1. “Do you send reminders today? If yes: manual, software, or receptionist?”
2. “Do clients typically reply to confirm? Do you currently capture confirmations?”
3. “If someone can’t make it, what happens today? (calls, voicemails, missed reschedules)”
4. “Do you keep a waitlist? How do you fill last-minute gaps?”
5. “What scheduling system are you using? (e.g., Square, Acuity, Calendly, Jane, etc.)”

D) Pilot offer (3 mins)
“Here’s the pilot: we run SMS reminders + two-way confirmations. If someone replies ‘No’ or ‘Reschedule’, we automate the next step and alert your team when needed. We track confirmations/reschedules and send a weekly report quantifying recovered revenue. Pilot is concierge-managed for 7 days at one provider/location.”

E) Consent + success criteria + start date (2 mins)
1. “Do you already have SMS consent language in intake? If not, we’ll provide a short addendum.”
2. “Success for week 1 is: higher confirmation rate, fewer no-shows, and at least some recovered slots from reschedules/waitlist.”
3. “Are you comfortable starting {{Date}}? If yes, I’ll email the intake + pilot terms today.”

Close:
“I’ll send a short intake and a simple pilot agreement by email from agent_bob_replit+no-show-bot@agentmail.to. You’ll also have the legitimacy link for your team: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2.”

4) Pilot Agreement (Email Format, lightweight)
Subject: 7-Day No-Show Reduction Pilot — Summary + Next Steps
Body:
Hi {{FirstName}},

Thanks for the time today. Here’s a simple summary of the 7-day concierge pilot for {{BusinessName}}.

What we do (our responsibilities)
- Configure SMS reminders + two-way confirmations for your appointments
- Handle common replies (Confirm / Can’t make it / Reschedule / Questions)
- Provide fail-safes: if automation fails or we can’t safely interpret a reply, we alert your team
- Send a weekly value report with: confirmations, reschedules, waitlist fills (if applicable), and estimated recovered revenue/week

What you do (client responsibilities)
- Confirm your timezone, business hours, and reminder timing preferences
- Provide baseline metrics (last ~4 weeks if available): no-show count/rate, weekly appointment volume, and a conservative average appointment value
- Confirm you have consent to text patients/clients (and add/update consent language if needed)
- Provide one escalation contact (name + phone/email) for urgent issues

Compliance + opt-out
- Every message includes opt-out language. If someone replies STOP, we immediately stop messaging that number.

Pilot scope
- 7 days, 1 location/provider to start (we can expand after week 1 if results are strong)

Success criteria (week 1)
- Measurable confirmation rate
- Fewer no-shows vs. baseline trend
- Faster rescheduling and fewer unfilled gaps

Reference link (for internal review):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you reply “Approved”, I’ll send the 2-minute intake immediately and we’ll confirm the start date/time.

— Bob Smith
agent_bob_replit+no-show-bot@agentmail.to
