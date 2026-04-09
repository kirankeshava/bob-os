# Day-1 Outbound Launch Artifact: HubSpot Meetings + CRM Fields + 200-Lead CSV + Free Sourcing Workflow + KPI Log

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T16:04:27.507Z

---

## 1) Single Demo Booking Link (HubSpot Meetings — free)
Use HubSpot Meetings as the only scheduling link in every email/SMS/call follow-up. Meeting name: “No-Show Reduction Demo (15 min)”. Duration: 15 minutes. Meeting description (paste):

“Quick walkthrough of our Appointment No-Show Reducer: two-way SMS confirmations, instant reschedule links, and waitlist fill. We’ll estimate your recovered revenue per month and outline a 24–48 hour done-for-you setup. If you want to vet legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Replies: agent_bob_replit+no-show-bot@agentmail.to.”

## 2) HubSpot Free CRM Pipeline (stages)
Pipeline name: “No-Show Reducer Outbound”. Stages:
1. New Lead (uncontacted)
2. Attempted Contact (email/call sent)
3. Engaged (replied/meaningful conversation)
4. Demo Booked
5. Demo Held
6. Trial/Pilot Proposed
7. Closed Won (Location)
8. Closed Lost

Minimum required properties (create as custom fields if needed):
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City Cluster
- Role (Owner/Manager/Front desk/Unknown)
- Scheduling System (Zocdoc, Mindbody, NexHealth, Jane, Dentrix, etc.)
- Appt Volume / week (estimate)
- No-show rate % (estimate)
- Value per visit ($)
- Primary Pain (no-shows / late cancels / reschedules)
- Last Touch Date
- Next Step (call back / send details / demo link / not now)

## 3) CSV Headers for First 200 Leads (copy/paste into a sheet, export CSV)
Company Name,Website,Google Maps URL,Address,City,State,Phone,General Email,Owner/Manager Name,Owner/Manager Email,Vertical,City Cluster,Notes (hours/offer/reviews),Source URL,Status,Last Touch Date,Next Step

Rules:
- If you can’t find owner/manager email, keep General Email + Phone and set Role=Unknown.
- Always store the Google Maps URL; it’s a fast callback reference.

## 4) Free Lead Sourcing Workflow (fast, repeatable, no paid tools)
Goal: build 200 leads in 1 day across 2 city clusters.

Choose City Clusters (example):
- Cluster A: Phoenix, Scottsdale, Tempe
- Cluster B: Austin, Round Rock, Cedar Park

For each vertical, run Google Maps searches:
- “dentist Phoenix AZ”
- “chiropractor Scottsdale AZ”
- “med spa Tempe AZ”
- “physical therapy Austin TX”
- “optometrist Round Rock TX”

Process per lead (90–150 seconds each):
1) Open Google Maps result → copy Business Name, Phone, Address, Website.
2) Open Website → look for Contact page. Capture general email.
3) Check About/Team page for owner/lead doctor name; search site for “@” (Ctrl+F) to find emails.
4) Add “Notes”: number of locations, any online booking widget, and review count (social proof helps in calls).
5) Deduplicate: if same phone or same domain already exists, skip or note as second location.

Quality filter:
- Must be appointment-based.
- Prefer: 2+ providers OR high review count OR online booking present.

## 5) Day-1 Outreach Execution Schedule (minimum viable)
Morning (60–90 min): Build 25 new leads + prep tasks.
Block 1 (Email send): 25–40 emails (plain text). Log as “Attempted Contact”.
Block 2 (Calls): 10–15 calls to the same list. If gatekeeper answers, ask for “office manager who owns scheduling/no-show follow-up”.
Midday (60 min): Build 25 more leads.
Block 3 (Email send): another 25–40 emails.
Block 4 (Calls): another 10–15 calls.
End of day (30 min): Reply handling + book demos + set next-step tasks.

Craigslist: 1 post per city cluster (weekly 1–2). FB groups: 1 value post + 2–3 comments/day (where allowed).

## 6) KPI Log (daily)
Track daily in a simple sheet:
Date | New Leads Added | Emails Sent | Calls Placed | Texts Sent | Replies | Positive Replies | Demos Booked | Demos Held | Proposals Sent | Closed Won (locations) | Closed Lost | Notes/Blockers

## 7) Reply-to-Book Snippet (paste into any thread)
“Happy to show you. Here’s my 15-min demo link: [HUBSPOT MEETINGS LINK]. We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours. Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Or reply here: agent_bob_replit+no-show-bot@agentmail.to.”

## 8) Compliance note (calls/texts)
Calls are generally permissible B2B; for SMS, only text numbers that are clearly business lines and keep messages non-promotional/opt-out friendly (e.g., “Reply STOP to opt out”). If uncertain, use email + calls only.
