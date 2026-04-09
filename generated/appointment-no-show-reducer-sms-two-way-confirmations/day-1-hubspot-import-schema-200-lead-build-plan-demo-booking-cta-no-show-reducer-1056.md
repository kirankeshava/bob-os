# Day-1 HubSpot Import Schema + 200-Lead Build Plan + Demo Booking CTA (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T12:38:46.241Z

---

Below is the exact, ready-to-use setup content to operationalize Day-1 outbound (200 prospects) for the Appointment No-Show Reducer.

A) HubSpot Import CSV Schema (copy these column headers exactly)
1. Company Name
2. Company Domain Name (no https://)
3. Company Phone Number
4. Company City
5. Company State
6. Industry (use: Chiropractor | Med Spa | Dentist)
7. Contact First Name
8. Contact Last Name
9. Contact Job Title (Owner | Office Manager | Practice Manager | GM)
10. Contact Email
11. Contact Phone Number
12. Lead Source (use: Google Maps | Website Contact Page | Directory)
13. Location Count (default 1 unless clear)
14. Appt/Week (estimate if unknown; leave blank if unsure)
15. Notes (1 line: e.g., “Uses online booking; multiple providers; has SMS reminders?”)
16. Last Touch (date)
17. Next Step (e.g., “Email Step 1”, “Call attempt 1”)
18. Status (New | Attempting Contact | Replied | Demo Booked | Demo Held | Won | Lost)

Formatting rules:
- One row per location (not per brand). If a brand has multiple locations, create one row per location with a unique Company Name like “Brand – North Phoenix”.
- Prefer domain-based email (info@, office@, scheduling@) if owner email not visible. If none found, leave Contact Email blank and rely on calls.
- Normalize phones to (###) ###-####.

B) Day-1 200-Lead Build Plan (free sources only)
Goal: 200 total prospects across 2 city clusters × 3 verticals (roughly 33 per vertical per city).
City Cluster 1: Phoenix, AZ
City Cluster 2: Dallas, TX
Verticals (priority order): Chiropractor, Med Spa, Dentist

Step-by-step extraction workflow (repeat per vertical per city):
1) Google Maps query (copy/paste):
- “chiropractor Phoenix AZ”
- “medical spa Phoenix AZ”
- “dentist Phoenix AZ”
- Repeat for Dallas TX
2) Open top results → capture:
- Company Name, Phone, Website, City/State
3) Find email (free):
- Click Website → Contact / Book / About pages
- Look for “info@ / office@ / appointments@ / support@”
- If only a form exists, still add record (email blank) and mark Lead Source = Website Contact Form; plan calls.
4) Identify decision-maker:
- Look for “Owner”, “Practice Manager”, “Office Manager” on About/Team pages
- If unknown, set Contact First Name = “Practice”, Last Name = “Manager”, Job Title = “Office Manager” (temporary) and update after first call.
5) Quick qualification note (1 line max):
- “Online booking present” / “Multiple providers” / “Open late/weekends” / “Mentions text reminders” etc.

Volume targets (same day):
- Phoenix: 35 chiro + 35 med spa + 30 dental = 100
- Dallas: 35 chiro + 35 med spa + 30 dental = 100
Total = 200

C) Demo Booking CTA Block (use in all replies + signatures)
Use this exact copy (add your HubSpot Meetings link once created):

“Open to a 12-minute walkthrough to see if we can reduce your no-shows with two-way SMS confirmations + instant reschedules + waitlist fill? If yes, grab any time that works: {{MEETINGS_LINK}}

For legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Or just reply here and I’ll coordinate. —Bob (agent_bob_replit+no-show-bot@agentmail.to)”

D) Day-1 Send/Call Execution (how to use the schema fields)
- Set Status = New for all 200.
- Batch 1 (morning): email Step 1 to 50–60 records with Contact Email present; set Last Touch = today; Next Step = “Call attempt 1 (tomorrow)”
- Call block (midday): call 15–20 with no email + 10–15 with email (voicemail + ask best number for scheduling manager).
- Batch 2 (afternoon): email Step 1 to next 50–60; update Last Touch/Next Step.
- End-of-day KPI tally: emails sent, calls placed, connects, conversations, positive replies, demos booked.

If a prospect asks “who are you / is this legit?” reply with:
“Totally fair—here’s our overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. Happy to do a quick 12-minute walkthrough; if it’s not a fit I’ll tell you fast. Reply here or email me at agent_bob_replit+no-show-bot@agentmail.to.”