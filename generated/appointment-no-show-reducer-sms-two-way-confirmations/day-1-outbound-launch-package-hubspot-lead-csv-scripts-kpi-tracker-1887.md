# Day-1 Outbound Launch Package (HubSpot + Lead CSV + Scripts + KPI Tracker)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T18:38:41.690Z

---

Below is the execution-ready Day-1 package to start booking demos for Appointment No-Show Reducer.

A) HUBSPOT (FREE) CRM SETUP (15–25 min)
1) Create HubSpot account (free) and create ONE pipeline named: “No-Show Reducer – Outbound”.
2) Pipeline stages (in order):
   - New Lead (Uncontacted)
   - Attempted – Email Sent
   - Attempted – Called/Texted
   - Engaged (Replied / Picked Up)
   - Demo Booked
   - Demo Held
   - Trial/Setup Started (Free 7-day)
   - Won (Location Live)
   - Lost (Reason)
3) Required fields/properties (create as custom where needed):
   - Location Name
   - Website
   - City
   - Vertical (Dentist/Chiro/Med Spa/PT/Optometry/etc.)
   - Primary Contact Name
   - Role (Owner/Practice Manager/Front Desk)
   - Email
   - Phone
   - Scheduling System (Unknown / Dentrix / Jane / Nextech / Mindbody / Square / Other)
   - Appointment Volume per week (estimate)
   - No-show rate (estimate)
   - Avg value per visit (estimate)
   - Next Step (dropdown: Call / Email / Demo / Follow-up / Close)
   - Last Touch Date
   - Notes
4) Logging rule: every touch becomes an Activity (email/call/SMS note) + move stage accordingly.

B) LEAD CAPTURE / HUBSPOT IMPORT CSV (copy headers exactly)
Use this header row in a spreadsheet and export as CSV:
Location Name,Website,City,State,Vertical,Primary Contact Name,Role,Email,Phone,Scheduling System,Appointment Volume per week,No-show rate,Avg value per visit,Lead Source,Notes

Minimum viable capture if you’re moving fast:
Location Name | Website | City/State | Vertical | Phone | Email (if on site) | Notes

Free sourcing method (repeatable):
1) Google Maps: search “{city} {vertical}” (e.g., “Mesa AZ chiropractor”).
2) Open each listing → visit website → scrape contact email + contact form + manager/owner name if listed.
3) Record phone from listing and any scheduling cues (e.g., “Book with Jane”, “Powered by Mindbody”).

C) DAY-1 SEND/CALL CADENCE (minimum viable)
Goal for Day-1:
- 50–100 cold emails (plain text)
- 20–40 calls
- 10–20 follow-up texts ONLY to businesses where you reached voicemail and the number is clearly a business line (keep it minimal; comply with local rules; stop if asked)

Recommended blocks:
- 9:00–10:15am: Calls (20)
- 10:30–12:00pm: Send Emails (50)
- 1:30–2:30pm: Calls (20)
- 3:00–4:00pm: Send Emails (25–50)
- 4:00–4:30pm: Text follow-ups to voicemail outcomes (10–20)

D) READY-TO-SEND COLD EMAILS (plain text)
Signature (use in all emails):
Bob Smith
Appointment No-Show Reducer (SMS + two-way confirmations)
Proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply here: agent_bob_replit+no-show-bot@agentmail.to

Email Variant 1 (general):
Subject: quick fix for no-shows at {{Location}}

Hi {{FirstName}} — I’m Bob.

We help appointment-based locations reduce no-shows using two-way SMS confirmations (Y/N), instant reschedules, and a waitlist fill to backfill last-minute gaps.

If you’re open to it, I can set this up done-for-you in 24–48 hours and show simple analytics for “recovered revenue” per location.

Worth a 10-minute look this week?

Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
—Bob (agent_bob_replit+no-show-bot@agentmail.to)

Email Variant 2 (numbers-driven):
Subject: cut {{vertical}} no-shows (2-way SMS confirmations)

Hi {{FirstName}},

Most locations I speak with lose a meaningful number of slots to no-shows/cancel-late.

Our system texts patients to confirm and automatically handles reschedules; if a slot opens up, we ping a waitlist to fill it. Setup is done-for-you in 24–48 hours.

If you tell me roughly: (1) appointments/week and (2) average value/visit, I’ll estimate what you could recover.

Open to a quick call?

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Bob (agent_bob_replit+no-show-bot@agentmail.to)

E) CALL OPENER + VOICEMAIL
Call opener:
“Hi, is this {{Location}}? — I’m Bob. Quick question: who handles your appointment scheduling process and reducing no-shows — practice manager or owner?”

If decision maker:
“We help reduce no-shows with two-way SMS confirmations and instant reschedules, plus a waitlist fill for last-minute openings. Setup is done-for-you in 24–48 hours. Can I ask: about how many appointments do you have in a week and what’s an average visit worth?”

Close for demo:
“Got it. Next step is a 10–15 minute screen share to show the workflow and estimate recovered revenue. What day/time works?”

Voicemail (20 seconds):
“Hi, this is Bob. We help appointment-based locations cut no-shows with two-way SMS confirmations and quick rescheduling, plus a waitlist fill for gaps. If you want to see it, reply to my email or reach me at agent_bob_replit+no-show-bot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Thanks.”

F) COMPLIANT FOLLOW-UP TEXT (only after a call/voicemail; stop if asked)
“Hi {{FirstName}} — Bob here. I just called re: reducing no-shows at {{Location}} with two-way SMS confirmations + easy reschedules + waitlist fill. Want me to send a 1-min overview + book a 10-min demo? (You can reply STOP anytime.)”

G) REPLY HANDLING SNIPPETS
Positive:
“Perfect—what does your calendar look like tomorrow or Thu for a quick 10–15 min? If you prefer, reply with 2 times and I’ll send an invite. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

Need more info:
“Totally. In one line: we text to confirm (two-way), automate reschedules, and backfill openings from a waitlist. If you share approx appointments/week + avg value/visit, I’ll estimate monthly recovery. Want a 10-min walkthrough?”

Not interested:
“Understood—thanks. If it helps later, we can still run a quick estimate (appointments/week + avg value/visit) to see if it’s material. If not, I won’t follow up.”

Stop:
“Confirmed—removing you from outreach. Thank you.”

H) DAILY KPI TRACKER (paste into notes or sheet)
Date:
- New leads added:
- Emails sent:
- Calls placed:
- Texts sent:
- Replies (positive/neutral/negative):
- Demos booked:
- Demos held:
- Trials started (free):
- Won locations live:
- Notes: top objection + what we changed tomorrow

This package is sufficient to: (1) create HubSpot free, (2) capture/import leads from free sources, and (3) begin Day-1 outbound immediately using the legitimacy URL and the business inbox agent_bob_replit+no-show-bot@agentmail.to.