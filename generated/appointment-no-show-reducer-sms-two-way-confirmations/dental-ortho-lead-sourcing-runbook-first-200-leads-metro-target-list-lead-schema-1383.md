# Dental/Ortho Lead Sourcing Runbook (First 200 Leads) + Metro Target List + Lead Schema/QA

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:37:29.440Z

---

Objective: generate a consistent daily pipeline of qualified independent dental + orthodontic practices (1–5 locations) with phone + website, and decision-maker/manager email when available, sized to support 20–25 location closes in 30 days.

A) Target metros (30) for repeatable Google Maps pulls
US: New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; San Francisco CA; Columbus OH; Fort Worth TX; Charlotte NC; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Nashville TN; Boston MA; El Paso TX; Detroit MI; Portland OR.
Canada: Toronto ON; Montréal QC; Vancouver BC; Calgary AB; Ottawa ON.

B) Google Maps query set (copy/paste)
Run per metro (example: “Austin TX”):
1) orthodontist Austin TX
2) orthodontics Austin TX
3) dental clinic Austin TX
4) family dentist Austin TX
5) cosmetic dentist Austin TX
6) pediatric dentist Austin TX
7) emergency dentist Austin TX
Notes: prioritize clinics with open hours, multiple reviews, and evidence of active scheduling ("Book" button, online scheduling, or prominent phone scheduling).

C) Lead list schema (CSV/Sheet columns)
Required (must have):
- Lead ID (auto)
- Practice Name
- Vertical (Dental / Ortho)
- Location Type (Single / Multi)
- Street Address
- City
- State/Province
- ZIP/Postal
- Country
- Main Phone
- Website URL
- Google Maps URL (or Place link)
- Source (GMaps/Yelp/Directory)
- Notes (short)
Decision-maker/contact fields (fill if found):
- Owner/Doctor Name
- Role (Owner / Lead Dentist / Ortho / Practice Manager / Office Manager)
- Email (Primary)
- Email (Secondary)
- Contact Page URL
- Staff Page URL
- LinkedIn URL (optional)
Operational qualifiers:
- Online Booking? (Y/N)
- Booking Software (if visible: NexHealth, Solutionreach, Weave, Doctible, Zocdoc, LocalMed, etc.)
- Hours Listed? (Y/N)
- Review Count
- Last Review Mentioned No-shows/Waitlist? (Y/N, optional)
Outreach tracking fields (for CRM use):
- Stage (New / Researched / Attempted / Connected / Interested / Demo Booked / Trial / Won / Lost)
- Next Step Date
- Last Touch (Email1/Email2/SMS/Call/VM)
- Last Touch Date

D) QA rules (to keep list usable for closing)
1) Phone validation: must be a direct clinic number (not a directory). If multiple numbers, prefer “Appointments”/front desk line.
2) Website validation: must load and match the practice name/location. If only Facebook page exists, still include it but flag “Website missing”.
3) Duplicate control: de-dupe by (Practice Name + Phone) and by Website domain.
4) Contact email heuristics (fast):
   - Check /contact, /about, /team, footer, and “Request Appointment” pages.
   - Look for patterns: info@, hello@, office@, scheduling@, admin@.
   - If staff emails listed, capture practice manager/office manager first.
5) Fit filters (skip/flag):
   - Skip large DSOs/enterprise chains unless location-level contact is available.
   - Flag “Multi-location” if more than 5 locations shown.

E) First-200-leads runbook (timeboxed, repeatable)
Goal: 200 leads in 2–3 workdays solo (or 1 day with VA support), while keeping quality high.

Step 1 — Build the pull list (15 minutes)
- Pick 5 metros from the target list.
- For each metro, plan to collect ~40 leads across the query set above.

Step 2 — Harvest from Google Maps (60–90 minutes per 40 leads)
For each query:
- Open Google Maps and search the query.
- For each result, capture: Practice Name, Address, Phone, Website, Maps URL, Review Count.
- Quick fit check: independent practice vibe + active hours + clear appointment focus.
- Add to sheet immediately.

Step 3 — Website pass for email + qualifiers (2–4 minutes/lead)
- Open the practice website.
- Locate contact email (contact page/footer).
- Capture contact page URL.
- Note if there is online booking and any vendor branding (NexHealth, Weave, Solutionreach, etc.).
- If no email found in 2 minutes, leave blank and proceed (don’t stall the pipeline).

Step 4 — Optional enrichment (only for high-value leads) (2–3 minutes/lead)
Do this for leads that look premium (high reviews, affluent area, strong website):
- Check “Team” page for practice manager/office manager name.
- Capture direct email if listed.
- If only names are listed, record name + role; email can be found later.

Step 5 — QA + stage assignment (20 minutes per 50 leads)
- De-dupe.
- Confirm required fields are filled.
- Assign Stage=New and Next Step Date=Today (so outreach can begin immediately).

Daily quota guidance (so sourcing doesn’t outrank closing)
- If closing/outreach is active: cap sourcing at 60–100 new leads/day.
- If outreach bandwidth is available: scale sourcing to 120–150/day.
Rule: never source more than you can touch within 72 hours.

F) Minimal CRM sheet structure (tabs)
Tab 1: Leads (all columns above)
Tab 2: Pipeline (filtered view by Stage + Next Step Date)
Tab 3: Activity Log (Date, Lead ID, Channel, Message/Outcome, Next Step)
Tab 4: Metro Coverage (metro, # leads collected, date last pulled)

Legitimacy references for outreach (must include in posts/messages)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

Next execution step: compile the first 150–200 leads using the metros above (start with 5 metros x ~40 leads) and export as CSV for immediate outreach.