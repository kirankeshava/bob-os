# Lead Sourcing Engine Pack (Dental/Ortho) — Lead Schema + CRM Pipeline + Cold Email Setup + Craigslist/FB Templates + Upwork Templates

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T21:16:17.469Z

---

BUSINESS
Offer: Appointment No-Show Reducer (SMS + two-way confirmations + reschedules + waitlist gap fill + analytics).
Legitimacy URL (use in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact email (use in outreach): agent_bob_replit+no-show-bot@agentmail.to

A) ICP (CHOSEN VERTICAL)
Primary: Independent dental & orthodontic practices, 1–5 locations.
Who to contact: Practice owner (DDS), practice administrator/office manager, front desk lead, operations manager.
Why this vertical: high appointment volume + costly chair time + frequent no-shows; clear ROI language (recovered production).

B) LEAD LIST SCHEMA (400–800 LEADS TARGET)
Create a single spreadsheet with these columns (in this order):
1. Lead_ID (auto: YYYYMMDD-###)
2. Date_Added
3. Source (Google Maps / Yelp / State directory / Referral)
4. Practice_Name
5. Specialty (Dental / Ortho / Pediatric / Cosmetic)
6. Locations_Count (1–5)
7. Address
8. City
9. State
10. ZIP
11. Country
12. Phone_Main (E.164 if possible)
13. Website
14. Booking_Method (Call / Web form / Online booking)
15. Booking_Software_Clue (Zocdoc, NexHealth, Solutionreach, Weave, Lighthouse360, etc. if visible)
16. Decision_Maker_Name
17. Decision_Maker_Title (Owner / Office Manager / Practice Admin)
18. Email_1
19. Email_1_Type (Direct / Role)
20. Email_1_Confidence (High/Med/Low)
21. Email_2 (optional)
22. LinkedIn_URL (optional)
23. Google_Rating
24. Google_Reviews_Count
25. Notes (e.g., “mentions missed appts policy”, “offers Invisalign”, “open Sat”)
26. Outreach_Stage (see CRM stages)
27. Last_Touch_Date
28. Next_Touch_Date
29. Next_Action (Email #2 / Call / FB message / Upwork follow-up)
30. Owner_Reply_Status (No reply / Interested / Not now / Unqualified)

C) LEAD SOURCING SOP (DAILY QUOTA)
Goal: 400–800 qualified leads total; daily target 60–120 net-new until list complete.
Sources & method:
1) Google Maps: search queries by metro
- “dentist + [city]”, “orthodontist + [city]”, “pediatric dentist + [city]”, “cosmetic dentist + [city]”.
Filters (manual): exclude chains with >5 locations unless franchisee is clearly local; prefer businesses with phone + website.
Capture: name, address, phone, website, rating/reviews.
2) Yelp: repeat same searches; use website/phone.
3) Practice website enrichment:
- Find “Contact”, “Team”, “About”, “Meet the Doctor”, “Staff”.
- Look for office manager / practice administrator email.
- If no direct email, record role email patterns (info@, office@, appointments@).
4) Confidence scoring:
- High: direct named email on website OR clearly listed office manager email.
- Medium: role email on site (info@) + DM name found.
- Low: no email; only contact form (still keep phone).
QA rules:
- Must have Phone_Main AND (Website OR physical address). If neither, drop.
- Deduplicate by website domain + phone.
- Ensure City/State present.
- Keep notes on booking method (online booking indicates automation readiness).

D) CRM PIPELINE (STAGES + NEXT-STEP RULES)
Use these stage values (dropdown) in Outreach_Stage:
0 New (not touched)
1 Researched (DM identified)
2 Contacted – Email 1
3 Contacted – Email 2
4 Contacted – Email 3 / Breakup
5 Attempted – Phone/SMS
6 Engaged (replied / asked question)
7 Booked (demo scheduled)
8 Demo Done
9 Trial Active (7-day free)
10 Won (convert after week 1; for week 1 mark “Trial Active”)
11 Lost (no fit / wrong timing)
12 Nurture (quarterly follow-up)

Cadence rules (simple):
- If no reply after Email 1: Next_Touch_Date = +2 business days.
- After Email 2: Next_Touch_Date = +2 business days.
- After Email 3: Next_Touch_Date = +5 business days; add a phone attempt.
- If engaged: respond same day; aim to book within 48 hours.

E) COLD EMAIL INFRASTRUCTURE CHECKLIST (FREE-FIRST)
Note: Domain purchase is paid. For week 1, use the business contact email for manual outreach and Upwork/Craigslist/FB distribution. Prepare infra steps now:
1) Sending identity
- From name: Bob
- Email signature includes: website URL + contact email.
2) DNS (when domain available)
- SPF: authorize sending provider.
- DKIM: enable for the sending domain.
- DMARC: start at p=none, then move to quarantine after stable.
3) Volume limits (warmup plan)
- Days 1–3: 10–20/day manual/low automation
- Days 4–7: 25–40/day
- Week 2+: increase gradually; keep bounce rate low.
4) Tracking (free-first)
- Avoid heavy link tracking early; use plain-text CTAs.
- If using links, use only the legitimacy URL above.

F) CRAIGSLIST POST TEMPLATE (VALUE-LED, NON-SPAM)
Title options:
1) “Dental offices: reduce no-shows with 2-way text confirmations (free setup)”
2) “Last-minute cancellations? I’ll help fill gaps from a waitlist (free trial)” 
Post body:
Hi — I’m Bob. I’m helping dental/ortho practices reduce no-shows using simple two-way SMS confirmations + smart reminders.

What it does:
• Text reminders that ask patients to confirm/cancel
• Auto-reschedule flow when they can’t make it
• Optional waitlist to fill last-minute gaps
• Basic analytics showing estimated recovered production

No cost this week: I’ll set it up free for 7 days so you can see if it reduces no-shows.

See details/legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply to this post or email: agent_bob_replit+no-show-bot@agentmail.to

G) FACEBOOK GROUP POST TEMPLATE (FOLLOW GROUP RULES)
Text:
Quick question for dental office managers/owners: what % of appointments are you losing to no-shows or late cancels right now?

I’m testing a lightweight reminder + two-way confirmation flow (patients reply CONFIRM/CANCEL). If they cancel, we can optionally trigger a reschedule message and/or ping a waitlist to fill the gap.

I’m offering a free 7-day setup for a few practices to get real numbers on recovered chair time.
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
If you want to try it, comment “details” or email me: agent_bob_replit+no-show-bot@agentmail.to

H) UPWORK PROFILE POSITIONING + PROPOSAL TEMPLATES
Profile headline:
“Reduce appointment no-shows with 2-way SMS confirmations + reschedule automation (Dental/Clinics)”
Overview (paste-ready):
I help appointment-based businesses (especially dental/ortho clinics) cut no-shows using two-way SMS confirmations, smart reminders, simple reschedule flows, and a waitlist to fill last-minute gaps. I focus on measurable results (estimated recovered revenue/chair time) and fast setup.
Legitimacy/info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

Proposal template #1 (no-show reduction):
Hi [Name] — I can help reduce your no-shows with a 2-way SMS confirmation flow (patients reply CONFIRM/CANCEL). When they cancel, we can automatically send a reschedule prompt and optionally text a waitlist to fill the opening.

If you tell me your average daily appointments + typical no-show rate, I’ll estimate the upside and set up a free 7-day trial so you can validate results.
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Proposal template #2 (appointment admin / front desk support angle):
Hi [Name] — instead of more manual reminder calls, I’ll implement two-way text confirmations + automated reschedule prompts so your team spends less time chasing patients.

Free 7-day setup available this week. Share your scheduling tool + appointment types and I’ll map the workflow.
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Proposal template #3 (clinic operations / revenue recovery angle):
Hi [Name] — no-shows are a hidden revenue leak. I can put in place confirmations + cancellations capture + waitlist gap fill so you recover production without adding staff time.

If you want, I’ll start with a single-provider workflow and send basic weekly analytics on recovered appointments.
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

I) OUTREACH CTA (BOOKING LINK PLACEHOLDER)
Until a booking link exists, CTA = “Reply with best number + two times you’re free.”
Once booking link exists, replace CTA with “Book here: [link]”.

This pack is ready to execute immediately for manual outreach and to scale once the first 100–200 leads are compiled and the CRM sheet is created.