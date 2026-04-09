# Dental/Ortho Lead Sourcing Engine (400–800/wk) — Schema, QA Rules, Metro Plan, and Execution SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:59:19.148Z

---

Objective: generate a steady pipeline of qualified independent dental + orthodontic practices (1–5 locations) with usable contact paths (phone + email) so outreach can book demos and close 20–25 locations in 30 days.

1) ICP + inclusion/exclusion rules
In-scope: independent dental/ortho practices in US/Canada; single location or small group (1–5); appointment-based; has receptionist/office manager; has online booking or actively answers phones; not DSO mega-chains.
Exclude: purely cosmetic product sellers, labs, suppliers; hospitals; practices with no phone listed; locations permanently closed.

2) Lead list schema (CSV/Sheets columns)
A. Account fields: Practice Name; Location Name (if multi); Street; City; State/Prov; ZIP/Postal; Country; Google Maps URL; Website URL; Yelp URL (optional); Main Phone; Secondary Phone (optional).
B. Decision maker/contact fields: Decision Maker Name; Role (Owner/Doctor/Office Manager/Practice Manager); Best Email; Secondary Email; Contact Page URL; “Email Source” (website/contact/about/Google/Yelp/LinkedIn); Confidence Score (High/Med/Low).
C. Operational qualifiers: Specialty (Dental/Ortho); # Locations (1–5); Online Booking (Y/N/Unknown); Booking Vendor (Zocdoc/LocalMed/Doctible/etc if visible); Hours listed (Y/N); Reviews count; Rating.
D. Outreach/CRM fields: Lead Source (GMaps/Yelp/Directory); Date Added; Stage (New/Researched/Contacted/Responded/Booked/No-Show/Closed Won/Closed Lost); Next Action Date; Next Action Type (Email/SMS/Call/VM); Last Touch Date; Notes.

3) QA + validation rules (non-negotiable)
- Every row must have: Practice Name + City/State + Main Phone + Website OR Google Maps URL.
- Email validity heuristics: prefer unique domain emails (name@practice.com). Avoid generic webforms unless no email exists.
- If only generic inbox exists (info@, hello@): set Confidence=Med and Role=Office Manager.
- If only contact form exists: capture Contact Page URL; set Best Email = “FORM ONLY”; Confidence=Low.
- De-duplication key: (Website domain) OR (Practice Name + Main Phone). Never keep duplicates.
- Deliverability flags: free email (gmail/yahoo) acceptable but mark as Med; “noreply@” invalid (do not use).

4) Metro-first sourcing plan (fastest path to volume)
Prioritize metros with high density of practices and strong appointment volume: Los Angeles, Dallas, Houston, Phoenix, Atlanta, Chicago, Miami, Tampa, Orlando, NYC/NJ, DC/NOVA, Seattle, Denver, San Diego, San Jose, Austin, Charlotte, Nashville, Minneapolis, St. Louis; Canada: Toronto, Vancouver, Calgary, Edmonton, Montreal, Ottawa.

5) Source workflow (per lead)
Step 1: Google Maps search query patterns:
- “dentist + [city]”, “family dentistry + [city]”, “orthodontist + [city]”, “braces + [city]”.
Filter quickly: open/active, rating >3.5 (or high review count), independent branding.
Step 2: Open website from Maps. Capture phone + domain.
Step 3: Find decision-maker contact:
- Check /contact, /about, /team, footer.
- Look for office manager/practice manager email. If none, capture info@.
- If only form: record URL.
Step 4: Optional Yelp cross-check for phone/website if missing.
Step 5: Assign Confidence Score + role guess.
Step 6: Load into CRM with Stage=New, Next Action Date=today, Next Action Type=Email.

6) Daily quotas (per operator)
- Research + capture: 80–150 leads/day.
- Minimum “usable” standard: phone + at least one outreach path (email or form). Target: 60%+ with an actual email.
- Weekly target: 400–800 leads, depending on staffing.

7) CRM loading + next-step assignment SOP
- At end of each session, batch-import rows into CRM sheet.
- Auto-assign next action: Email Day 1 (owner or office manager sequence), then follow the defined cadence.
- Notes discipline: if front desk answers and asks for details, log it and schedule a call-back; if asked to email, set Next Action=Email with subject “No-show revenue (quick question)”.

8) Compliance + legitimacy references (for templates/outreach)
When posting or messaging, always include the legitimacy URL and contact email:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact: agent_bob_replit+no-show-bot@agentmail.to

This engine is designed so sourcing never blocks revenue: new leads enter CRM daily with a next action already scheduled, allowing outbound execution to run continuously while the list scales to 400–800/week.