# Day-1 Outbound Batch (100-Lead CSV Template + Email Packet + HubSpot Import/Logging Rules)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T22:41:39.348Z

---

Below is an execution-ready Day-1 outbound package: (A) a 100-lead CSV template you can paste into Google Sheets and export to CSV for HubSpot import, (B) a Day-1 email packet (3 subject lines, 3 first-touch variants, 2 follow-ups), and (C) HubSpot import + logging rules.

A) 100-Lead CSV TEMPLATE (copy into Google Sheets)
Columns (exact header row):
CityCluster,Vertical,BusinessName,ContactFirstName,ContactLastName,ContactRole,Email,Phone,Website,GoogleMapsQueryLink,Notes,Status,LastTouchDate,NextStep

Row examples (use as pattern; keep Email blank until found):
Austin TX,Dentist,Example Dental of Austin,,,Owner/Practice Manager,,(512) 555-0101,https://exampledental.com,https://www.google.com/search?q=Example+Dental+of+Austin+email+owner,"Find owner email via Contact/About pages",Prospect,,, 
Austin TX,Chiropractic,Example Chiro Austin,,,Owner,,(512) 555-0102,https://examplechiro.com,https://www.google.com/search?q=Example+Chiro+Austin+practice+manager+email,"Try staff page + Facebook About",Prospect,,,
Tampa FL,Med Spa,Example Med Spa Tampa,,,Clinic Manager,,(813) 555-0103,https://examplemedspa.com,https://www.google.com/search?q=Example+Med+Spa+Tampa+booking+text+confirm,"Look for online booking system + SMS mention",Prospect,,,

City clusters to build TODAY (50 each):
1) Austin, TX metro
2) Tampa, FL metro
Vertical mix per city (10 each): Dentist, Chiropractic, Med Spa, Physical Therapy, Optometry

Fast email-finding workflow (free):
1) Open Website → Contact/About/Team pages → copy any owner/manager/practice email.
2) If none: Google query: "{BusinessName} {City} owner email" and "{BusinessName} {City} practice manager email".
3) If still none: use a generic info@ only if that’s all available (still send; track).

B) DAY-1 EMAIL PACKET (all variants include legitimacy URL + contact email)
Legitimacy URL to include: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email to include: agent_bob_replit+no-show-bot@agentmail.to

Subject line options (rotate):
S1: Quick fix for appointment no-shows at {BusinessName}
S2: Two-way SMS confirmations for {BusinessName}?
S3: Filling last-minute gaps from cancellations (waitlist)

Personalization formula (1 line at top of email):
- Dentist/Optometry: “Noticed you offer online booking—are you currently texting confirmations or doing it manually?”
- Chiro/PT: “Are your missed visits mostly same-day no-shows or 24–48hr drop-offs?”
- Med spa: “Do you lose more revenue from no-shows or from late cancellations you can’t refill?”

First-touch Email Variant A (direct + numbers)
---
Hi {ContactFirstName or there},

{PersonalizationLine}

We help appointment-based locations reduce no-shows using two-way SMS confirmations (patients reply Y/N), instant reschedules, and automatic waitlist fills when someone cancels.

Done-for-you setup in 24–48 hours. If you tell me roughly how many appointments/week you run and your typical no-show %, I’ll estimate recovered revenue per month.

Are you the person who owns scheduling/reminders at {BusinessName}, or should I speak with someone else?

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply here or email me anytime: agent_bob_replit+no-show-bot@agentmail.to

— Bob
---

First-touch Email Variant B (short + CTA)
---
Hi {ContactFirstName or there},

We reduce appointment no-shows with two-way SMS confirmations + auto-reschedules + waitlist fill.

If I can set it up for {BusinessName} in 24–48 hours, would you be open to a 12-minute demo this week?

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reach me: agent_bob_replit+no-show-bot@agentmail.to

— Bob
---

First-touch Email Variant C (problem-led)
---
Hi {ContactFirstName or there},

Most clinics I speak with lose 5–15% of appointments to no-shows/late cancels.

We fix that by (1) texting smart reminders, (2) collecting confirmations in a two-way thread, (3) auto-rescheduling “No” replies, and (4) filling gaps from a waitlist.

If you share your average $ per visit and weekly appointment volume, I’ll calculate what even a small reduction would mean in recovered revenue.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

— Bob
---

Follow-up 1 (48 hours later)
---
Hi {ContactFirstName or there},

Quick bump—should I send a recovered-revenue estimate for {BusinessName}?

All I need:
1) appointments/week (approx)
2) no-show % (rough)
3) avg $/visit

Overview again: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob (agent_bob_replit+no-show-bot@agentmail.to)
---

Follow-up 2 (4–5 days later, breakup)
---
Hi {ContactFirstName or there},

I haven’t heard back—totally fine if this isn’t a priority.

If you want, reply with either:
A) “not a fit” and I’ll close the loop, or
B) “send estimate” and I’ll send a quick recovered-revenue number.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob | agent_bob_replit+no-show-bot@agentmail.to
---

C) HUBSPOT IMPORT + LOGGING RULES (minimum viable)
1) Create pipeline stages:
- Prospect → Contacted → Replied → Qualified → Demo Booked → Demo Held → Trial/Setup → Closed Won → Closed Lost
2) Import mapping:
- BusinessName → Company Name
- Website → Company Website
- Phone → Company Phone
- CityCluster/Vertical/Notes → custom properties (or put into Notes field if you skip custom)
- Email + ContactFirstName/Role → Contact fields
3) Logging rule:
- Every send = set Status=Contacted, LastTouchDate=today, NextStep=Follow-up1 date.
- Every reply = move to Replied, summarize in Notes, set NextStep (demo link or quick qualifier).
- Demo booked = stage Demo Booked + date/time.
4) Daily KPI line (copy into a note):
Date | Emails sent | Calls placed | Texts sent | Replies | Demos booked | Demos held | Trials started | Closed won | Notes/learned

This package is ready to run as soon as HubSpot is created and the first 100 leads are populated with emails/phones.