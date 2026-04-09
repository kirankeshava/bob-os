# Day-1 Outbound Launch Doc (HubSpot Setup + Lead Import CSV + Daily KPI Report) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T09:55:26.469Z

---

Goal (30 days): book 40 demos and close 20–25 locations for the Appointment No-Show Reducer.
Offer: “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”
Legitimacy URL to include in outreach and replies: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email for prospects: agent_bob_replit+no-show-bot@agentmail.to

A) HUBSPOT FREE CRM — EXACT SETUP CHECKLIST (15–25 minutes)
1) Create HubSpot account (free)
- Use: Bob Smith
- Email: agent_bob_replit@agentmail.to
2) Create Pipeline (Deals)
Pipeline name: “No-Show Reducer — Outbound”
Stages (in order) and definitions:
- New Lead (not contacted)
- Attempted Contact (1st touch sent/called)
- Connected (2-way conversation started)
- Qualified (has appts; pain confirmed; decision maker identified)
- Demo Booked (calendar confirmed)
- Demo Held (completed)
- Proposal/Checkout Sent (Stripe link or checkout sent)
- Closed Won
- Closed Lost
3) Create required properties (minimum viable)
Contact properties:
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- Role (Owner/Office Manager/Front Desk)
- City
- State
- Website
- Phone
- Scheduling System (unknown/Calendly/Acuity/Squarespace/Practice Mgmt/Other)
- Appointment Volume per Week (range)
- No-Show Rate (range)
- Value per Visit ($)
- Waitlist? (Y/N)
- Best Next Step (free text)
Deal properties:
- Location Count (1/2–5/6–20)
- Estimated Recovered Revenue/mo ($) (simple calc estimate)
- Close Probability (10/25/50/75)
- Objections (free text)
4) Views & task queues (speed)
- Create a saved view: “Today — Call List” filtered by Stage = Attempted Contact OR Connected, Next Activity Date = today.
- Create a saved view: “Needs Reply” filtered by Last Contacted <= 1 day AND Stage = Connected.
Logging rule: every touch gets (a) Outcome, (b) Next step + date.

B) LEAD CAPTURE → HUBSPOT IMPORT (CSV HEADER + RULES)
Create a spreadsheet/CSV with this exact header row (copy/paste):
Company Name,Website,Vertical,First Name,Last Name,Title,Email,Phone,City,State,Source URL,Notes,Stage

Rules:
- Stage for new rows = “New Lead”
- Source URL = Google Maps listing, Yelp listing, directory page, etc.
- Notes = “Hours, appointment type, any pain signals, staff names, evidence of online booking, etc.”
- Dedupe: dedupe on Website OR Phone OR Email before import.

C) DAY-1 EXECUTION CADENCE (VOLUME FIRST)
Daily targets:
- 50–100 cold emails/day (plain text)
- 20–40 calls/day (or calls + compliant texts)
- Log everything in HubSpot the same day

Day-1 schedule (example):
Block 1 (9:00–10:30): Build 40–60 leads + import to HubSpot
Block 2 (10:30–12:00): Send Email #1 to 50–60 leads
Block 3 (1:00–2:30): Call 20 leads (goal: 3–5 connects)
Block 4 (2:30–3:00): Respond to replies within 30–60 minutes
Block 5 (3:00–4:00): Send Email #1 to remaining 20–40 leads + queue callbacks
Block 6 (4:00–5:00): Call remaining 10–20 leads + leave voicemail

Minimum logging per touch:
- Outcome: No answer / Left VM / Connected / Not a fit / Booked demo
- Next step: “Call back Thu 11am” or “Send case example + booking link”

D) DEMO BOOKING WORKFLOW (FAST QUALIFICATION)
When a prospect is positive, reply with:
- One sentence value + the legitimacy URL
- One clear CTA to book
- Ask 3 qualifiers (volume, no-show rate, decision maker)

Positive reply template (paste-ready):
“Yep—happy to. We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill (done-for-you setup in 24–48 hrs). Quick overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
What does your weekly appointment volume look like, roughly what % no-show, and are you the person who owns scheduling decisions? You can also email me directly at agent_bob_replit+no-show-bot@agentmail.to.”

E) DAILY KPI REPORT (COPY/PASTE)
Date: ____
Emails sent: ____
Calls placed: ____
Texts sent (if compliant): ____
Replies received: ____
Positive replies: ____
Demos booked: ____
Demos held: ____
Closed won: ____
Closed lost: ____
Top objections today (bullets):
1)
2)
3)
Notes / improvements for tomorrow:
- 

F) CITY CLUSTER + VERTICAL ORDER (TO BUILD FIRST 200 LEADS)
Start with two city clusters (nearby metros) and these verticals in order:
1) Chiropractors
2) Med Spas / Aesthetics
3) PT Clinics
4) Dentists
5) Optometry

Free lead sources:
- Google Maps (primary)
- Yelp categories
- Local directories (Chamber of Commerce, healthgrades-like listings where available)
Data capture minimum: Company, website, phone, city/state, contact name/email if shown.

This document is designed so execution can start immediately: create HubSpot, build/import the first 200 leads using the CSV header, then run the daily cadence and report KPIs every day. All outbound messaging should reference the legitimacy URL and route interested prospects to agent_bob_replit+no-show-bot@agentmail.to for replies and coordination.