# Day-1 Outbound Operator Runbook (HubSpot + Lead Capture + Send/Call SOP + Reply Library) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T08:58:10.820Z

---

Business offer (one-liner)
“We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”
Legitimacy URL (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact inbox (use in outreach + replies): agent_bob_replit+no-show-bot@agentmail.to

A) HubSpot Free CRM — Day-0/Day-1 setup checklist (fast)
1) Create HubSpot account (free) using:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
2) Create a pipeline named: “No-Show Reducer Outbound”
3) Pipeline stages (in order):
   - New Lead (Not Touched)
   - Attempted Contact (Email 1 Sent)
   - Attempted Contact (Call/SMS Attempt)
   - Connected (Two-way)
   - Demo Scheduled
   - Demo Held
   - Trial / Pilot Proposed
   - Closed Won (Location Live)
   - Closed Lost
4) Minimum custom properties (create as text/number/dropdown):
   - Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
   - City Cluster
   - Appt volume per week (number)
   - No-show rate % (number)
   - Value per visit $ (number)
   - Scheduling system (Zocdoc/Square/Acuity/Calendly/Other/Unknown)
   - Primary contact role (Owner/Office Manager/Front Desk)
   - Best phone (text ok?) (text)
   - Last touch date (date)
   - Next step (text)
   - Objection noted (dropdown: price, time, already have reminders, not decision-maker, no-shows low, other)
5) Default activity logging rule (speed standard):
   - Every touch = one note line beginning with: [E1], [E2], [CALL], [VM], [SMS], [REPLY]
   - Always set a next task date/time for any lead not closed.

B) Lead-capture sheet (copy/paste schema for 200 leads)
Create a sheet with these columns (exact order for easy import):
1. Company Name
2. Website
3. Location Address
4. City
5. State
6. Phone
7. Contact First Name
8. Contact Last Name
9. Title/Role
10. Email
11. Vertical
12. City Cluster
13. Notes (e.g., “online booking on site”, “reviews mention no-shows”, “multiple locations”)
14. Source URL (Google Maps link or directory page)
15. Status (New Lead)

Free list-building sources (fastest):
- Google Maps for each vertical + city (“chiropractor Austin TX”, “med spa Scottsdale”, “physical therapy clinic Tampa”, “dentist Charlotte”, “optometrist San Diego”).
- Practice website “Contact” / “Appointments” page for email + booking system clues.
- Facebook page “About” for phone/email.

Two city clusters (example to start today; swap as needed):
Cluster 1: Austin, TX + suburbs
Cluster 2: Tampa, FL + suburbs
Verticals to pull in each: Dentist, Chiropractor, Med Spa, Physical Therapy, Optometry
Target: 20 leads per vertical per cluster = 200 total.
Dedupe rule: If same phone or same domain, keep only one record; note “multi-location” in Notes.

C) Day-1 execution schedule (time-blocked)
Block 1 (60–90 min): Build/import leads
- Capture first 50 leads into sheet, then import into HubSpot (don’t wait for all 200).
- After import, immediately start sending Email 1.

Block 2 (60–90 min): Send 50–100 cold emails (plain text)
- Goal: 100 sends if list supports it; minimum 50.
- Personalization (10 seconds max): mention city + their business name.
- Log in HubSpot as [E1] Sent.

Block 3 (60–90 min): Call block (20–40 calls)
- Call the same leads emailed today (boost connect rate).
- If voicemail: leave a 12–18 sec VM.
- Log outcomes as [CALL], [VM].

Block 4 (30–45 min): SMS follow-up (where compliant)
- Only if you reached a human OR the business publicly lists texting / you have reason to believe it’s a business line.
- Log as [SMS].

End of day (15 min): KPI report
- Sends, replies, connects, demos scheduled, demos held, closes, notes.

D) Cold email (Email 1) — master template (ready to paste)
Subject options:
1) quick no-show question
2) reducing no-shows at {{Business}}
3) two-way SMS confirmations for {{City}}
4) fill last-minute cancellations?

Body:
Hi {{FirstName}} — Bob here.

Do you currently text patients/clients to confirm appointments, or is it mostly one-way reminders?

We help appointment-based locations reduce no-shows using two-way SMS confirmations (Y/N), instant reschedules, and a waitlist to fill gaps. Setup is done-for-you in 24–48 hours.

If you want to see how it works, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Worth a 10-minute look this week?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

E) Call opener + voicemail (short)
Opener:
“Hi, is this the office manager or whoever owns scheduling for {{Business}}? I’m Bob — quick question: do you guys confirm appointments by text two-way (so clients reply Y/N), or is it mostly one-way reminders?”

If interest:
“We run two-way confirmations, auto-reschedules, and waitlist fill to reduce no-shows. It’s done-for-you and usually live in 24–48 hours. Can we book a 10-minute demo?”

Voicemail:
“Hi this is Bob. I’m calling because we help reduce no-shows with two-way SMS confirmations and instant reschedules. If you handle scheduling, call me back or email agent_bob_replit+no-show-bot@agentmail.to. Also feel free to check the overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Thanks.”

F) SMS (only where appropriate)
“Hi {{FirstName}} — Bob here. Quick question: do you confirm appointments via two-way text (reply Y/N), or just send reminders? We reduce no-shows with two-way confirmations + instant reschedules + waitlist fill. If you want, I can send a 60-sec overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

G) Reply library (copy/paste)
1) Positive — book demo
“Great — what does your calendar look like for a quick 10-minute demo? If you prefer, reply with 2 times that work and I’ll confirm. Here’s the overview link as well: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

2) Not decision maker
“Who’s best to speak with about scheduling/no-shows (owner or office manager)? If you can intro me (name + email), I’ll keep it brief. My email is agent_bob_replit+no-show-bot@agentmail.to.”

3) Already have reminders
“Makes sense. Quick distinction: do you have two-way confirmations (they reply Y/N) + auto-reschedule + waitlist fill? If not, that’s where we typically recover the most. Open to a 10-min compare?”

4) Price
“Totally fair — before price, can I ask roughly how many appointments per week and your typical value per visit? Then I can tell you if it’s even worth considering. If it doesn’t pencil, I’ll say so.”

5) Stop
“Understood — I won’t reach out again. If you ever want the overview later: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

H) Daily KPI report template (paste into notes)
Date:
Leads added:
Emails sent:
Calls placed:
SMS sent:
Replies (total):
Positive replies:
Demos booked:
Demos held:
Closed won:
Notes / biggest objection today:
Top next step for tomorrow:

This runbook is the minimum viable system to start booking demos within 48–72 hours: build/import leads continuously, send daily, call the same day, and log every next step in HubSpot to prevent leaks.