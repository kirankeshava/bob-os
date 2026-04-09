# Day-1 Outbound Launch Packet (HubSpot Meetings Setup + 200-Lead CSV Template + KPI Report + SMS Follow-ups)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T11:00:11.906Z

---

# Day-1 Outbound Launch Packet — Appointment No-Show Reducer

## 1) HubSpot Meetings (Free) — Setup Checklist + Copy
**Goal:** a single booking link for all cold email/call follow-ups.

**Setup steps (15 minutes):**
1. In HubSpot (free), go to **Sales → Meetings**.
2. Connect the calendar you will use for demos.
3. Create meeting type: **“15-min No-Show Reduction Demo”**.
4. Availability: Mon–Fri, 10am–5pm local time. Add **15-min buffer** between meetings.
5. Questions on booking form (keep short):
   - Business name
   - Role (Owner/Manager/Front Desk)
   - Scheduling system (e.g., Dentrix, Jane, Mindbody, Acuity, Squarespace, “not sure”)
   - Avg appointments per week (number)
   - Best number for SMS (optional)
6. Confirmation email subject: **“Confirmed: No-Show Reduction Demo”**
7. Confirmation email body (paste):

**Confirmation email body:**
Hi {{contact.firstName}},

You’re booked. Here’s the meeting link and details.

What we’ll cover (15 minutes):
1) Your current reminder/confirmation process
2) Where no-shows are happening
3) How two-way SMS confirmations + instant reschedules + waitlist fill works
4) Expected recovered revenue per location

If you want to preview what we do, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you need to reschedule, reply to this email: agent_bob_replit+no-show-bot@agentmail.to

— Bob

**Link to use in outbound:**
- “Open slots here: {{MEETINGS_LINK}}”

## 2) 200-Lead CSV Template (Ready to Import to HubSpot)
**How to use:** Copy this into Google Sheets → export CSV → import to HubSpot.

**Columns (header row):**
Company Name,Website,City,State,Vertical,Contact First Name,Contact Last Name,Title/Role,Email,Phone,Source URL,Notes,Status,Last Touch Date,Next Step,Owner

**Example rows (replace with real data; format is correct):**
Bright Smile Dental,https://example.com,Austin,TX,Dentist,Sarah,Jones,Office Manager,sarah@example.com,512-555-0101,https://maps.google.com,"Mentions ""family dentistry"". Ask about Dentrix reminders.",New,,,Bob
ATX Chiropractic,https://example2.com,Austin,TX,Chiropractor,Mark,Lee,Owner,mark@example2.com,512-555-0102,https://www.yelp.com,"Has online booking. Likely high volume.",New,,,Bob
ClearSkin Med Spa,https://example3.com,Austin,TX,Med Spa,Jamie,Patel,Manager,jamie@example3.com,512-555-0103,https://www.facebook.com,"Runs promos; ask about cancellations + waitlist.",New,,,Bob
River PT Clinic,https://example4.com,Austin,TX,Physical Therapy,Alex,Kim,Front Desk,alex@example4.com,512-555-0104,https://example-directory.com,"Multiple therapists; ask appointment value and no-show %.",New,,,Bob
North Optometry,https://example5.com,Austin,TX,Optometry,Taylor,Reed,Owner,taylor@example5.com,512-555-0105,https://maps.google.com,"Has 2 locations; mention per-location analytics.",New,,,Bob

**HubSpot import mapping:**
- Company Name → Company name
- Website → Website URL
- City/State → Company city/state
- Vertical → Custom property “Vertical”
- Status → Custom property “Lifecycle/Outreach status” (or use Deal stage if you prefer)
- Last Touch Date/Next Step → Custom properties (or Tasks)

## 3) Day-1 Cadence (to hit volume without chaos)
**Block A (AM):**
- Build 25–40 leads (Google Maps + site contact page)
- Send 25–40 emails (personalized first line + template)

**Block B (Midday):**
- Calls: 10–20 (log outcome immediately)
- If you reach a decision maker: offer 15-min demo + book via {{MEETINGS_LINK}}

**Block C (PM):**
- Send next 25–60 emails
- Calls: 10–20
- Reply handling + booking

**End-of-day CRM hygiene (15 minutes):**
- Every touched lead gets: Status, Last Touch Date, Next Step, and a Task if follow-up required.

## 4) Daily KPI Report (copy/paste template)
**Date:** ____
- New leads added: ____
- Emails sent: ____
- Email replies: ____ (Positive: __ / Neutral: __ / Objections: __ / Unsub: __)
- Calls placed: ____
- Connects (decision maker): ____
- Demos booked: ____
- Demos held: ____
- Closed/won locations: ____
- Notes (patterns/objections/what’s working):
  - ____

## 5) Compliance-Safe SMS Follow-up Micro-Scripts (Two-way)
**Rules:** Identify yourself, keep it short, include opt-out, don’t spam.

**If call goes to voicemail (send SMS only where permissible):**
“Hi {{firstName}}—Bob here. Quick question: are no-shows/cancellations hurting your schedule at {{company}}? We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Preview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  Reply YES and I’ll send details. Reply STOP to opt out.”

**If they replied “sure / what is this?”**
“Thanks—this is Bob. We plug into your current scheduling and text patients to confirm, reschedule if needed, and fill gaps from a waitlist. 15-min walkthrough? Book: {{MEETINGS_LINK}}  Or tell me 2 times that work. STOP to opt out.”

**If they say they already have reminders:**
“Totally—most do. Difference: two-way confirmations + automated reschedules + waitlist fill (not just 24/48hr reminders). Worth a 15-min compare? {{MEETINGS_LINK}}  STOP to opt out.”

**If price asked by SMS:**
“Depends on appointment volume + locations. Typically it’s far less than 1–2 recovered visits/month. If you share approx appts/week + avg $/visit, I’ll estimate ROI. Or quick demo: {{MEETINGS_LINK}}  STOP to opt out.”

## 6) Paste-ready Email Signature (use on all outbound)
Bob Smith
No-Show Reducer (Two-way SMS confirmations + reschedules + waitlist fill)
Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

---
**Execution note:** Once HubSpot is created, the fastest path to revenue is (1) import 200 leads, (2) send 50–100 plain-text emails/day, (3) call 20–40/day, (4) book 15-min demos via a single meeting link, (5) close with paid pilot per location.
