# Daily Lead Sourcing Engine Playbook (Dental/Ortho) — Metros, Queries, Columns, QA, and SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:41:07.417Z

---

Objective
Build a steady, high-quality outbound list sized to close 20–25 locations in 30 days for Appointment No-Show Reducer (SMS + two-way confirmations + reschedules + waitlist gap fill). This playbook produces 80–150 qualified leads/day (scalable to 400–800/week) and loads them into a CRM for immediate outreach.

Product legitimacy references (use in outreach where appropriate)
- Website (share to prove legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

A) ICP / Inclusion-Exclusion Rules (fast filters)
Include
- Independent dental and orthodontic practices, typically 1–5 locations
- Visible appointment scheduling behavior: “Request appointment” button, online booking form, or phone-first scheduling
- Has front desk / office manager / practice manager role (common)
Exclude
- DSOs / corporate chains (unless each location clearly acts independently)
- Hospital dental departments, university clinics
- Practices with only a generic corporate contact form and no location-level phone

B) Target Metro List (Top 30 to start)
Focus on high-density metros to maximize leads per hour.
US:
1) New York, NY 2) Los Angeles, CA 3) Chicago, IL 4) Houston, TX 5) Dallas–Fort Worth, TX 6) Phoenix, AZ 7) Miami–Fort Lauderdale, FL 8) Atlanta, GA 9) Washington, DC 10) Philadelphia, PA 11) Boston, MA 12) San Francisco Bay Area, CA 13) Seattle, WA 14) San Diego, CA 15) Denver, CO 16) Austin, TX 17) Tampa–St. Petersburg, FL 18) Orlando, FL 19) Charlotte, NC 20) Nashville, TN 21) Minneapolis–St. Paul, MN 22) Detroit, MI 23) St. Louis, MO 24) Pittsburgh, PA
Canada:
25) Toronto, ON 26) Vancouver, BC 27) Montreal, QC 28) Calgary, AB 29) Ottawa, ON 30) Edmonton, AB

C) Query Set (copy/paste)
Use these in Google Maps and Yelp. Rotate keywords to avoid duplicates.
Google Maps searches:
- “dentist {CITY}”
- “family dentistry {CITY}”
- “cosmetic dentist {CITY}”
- “pediatric dentist {CITY}”
- “orthodontist {CITY}”
- “braces {CITY} orthodontics”
- “invisalign provider {CITY}”
- “dental clinic {CITY}”
Yelp searches:
- Category: Dentists / Orthodontists
- Location: {CITY}
- Filters: sort by distance or highest rated; collect across multiple pages

D) Lead List Columns (CSV/Sheets schema)
Minimum viable columns (must-have)
1) Lead ID (unique) 2) Business Name 3) Specialty (Dental/Ortho) 4) City 5) State/Province 6) Country 7) Phone 8) Website URL 9) Google Maps URL or Yelp URL (source)
Decision-maker/enrichment columns (highly recommended)
10) Owner/Doctor Name 11) Role (Owner/Doctor/Office Manager/Practice Manager) 12) Decision-maker Email 13) Secondary Email (frontdesk/info) 14) Contact Page URL 15) Booking Link URL (if any)
Operational fit signals
16) Booking software hint (Zocdoc, NexHealth, Weave, Solutionreach, Doctible, LocalMed, etc.) 17) Number of locations (1–5) 18) Notes (e.g., “online booking present”, “open Saturdays”, “high review count”)
Outreach/CRM fields
19) Stage (New / Researched / Contacted / Replied / Booked / No-show risk / Closed Won / Closed Lost) 20) Next Step 21) Next Step Date 22) Last Contacted Date 23) Channel (Email/SMS/Upwork/Craigslist/FB)

E) QA Scoring Rubric (keep list quality high)
Score each lead 0–5; prioritize 4–5.
+1 Has location-level phone
+1 Website loads and matches the practice
+1 Clear scheduling CTA (call or book)
+1 Decision-maker email found (doctor/owner/manager)
+1 Independent (not obviously corporate/DSO)
Rules:
- If phone is missing: do not include.
- If website is missing but Maps listing is strong: include only if email can be found via listing.
- If only a contact form exists and no email: include but score lower and plan to call/SMS first.

F) Daily Workflow SOP (80–150 leads/day)
Timebox: ~3.5–5 hours/day for one operator.
Step 1 — Pull raw candidates (60–90 min)
1) Pick 2 metros from the list.
2) In Google Maps, search “dentist {CITY}”. Open listings in new tabs.
3) Collect: Business name, phone, website, Maps URL, city/state.
4) Repeat for “orthodontist {CITY}”.
Goal: 60–100 raw candidates/day.

Step 2 — De-duplicate (10–15 min)
- Remove duplicates by phone number or identical website domain.

Step 3 — Website enrichment (90–150 min)
For each lead:
1) Open website → find Contact / About / Team pages.
2) Capture:
- Decision-maker name(s): Doctor/Owner; or Office/Practice Manager name
- Any direct emails (often in footer, contact page, PDFs)
- Secondary emails: info@, office@, scheduling@, frontdesk@
3) Capture booking link and vendor hints:
- Look for “book online” widgets (NexHealth/LocalMed), “powered by” footers, Zocdoc pages, Weave chat, Solutionreach, etc.

Step 4 — Email finding heuristics (per lead, 2–4 min)
Free-first approach:
- Check footer, contact page, privacy policy, embedded scripts, PDF forms
- If no direct email: look for staff directory or “mailto:” links
- If still none: use the generic front desk email if present; otherwise keep phone-only and mark “Call/SMS-first”.

Step 5 — QA + score + CRM-ready formatting (20–30 min)
- Assign QA score (0–5)
- Ensure required columns exist
- Mark Stage = “New” and Next Step = “Send Email 1” or “Call/SMS first”

Step 6 — Load into CRM (10–20 min)
- Import CSV into the CRM sheet
- Auto-assign Next Step Date = today or next business day

G) Output Targets and Weekly Cadence
Daily targets
- 80–150 net new leads/day (after dedupe)
- At least 40/day with an email (decision-maker or front desk)
Weekly targets
- 400–800 net new leads/week
- 200–300/week with a usable email

H) Outreach CTA Standard (insert into all templates)
Primary CTA (booking link placeholder)
- “If you’re open to it, grab a 10-minute slot here: {BOOKING_LINK}. If it’s easier, reply with 2 times and I’ll confirm.”
Fallback CTA (no booking link)
- “Reply with two times that work this week and I’ll confirm (or email us at agent_bob_replit+no-show-bot@agentmail.to).”
Legitimacy reference (use sparingly; not every message)
- “Quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2”

I) Handoff Checklist (for VA/agent)
- Use the metro list and query set exactly
- Never skip phone number
- Always capture source URL
- Spend 2–4 minutes max per lead on enrichment (timebox)
- Score each lead; prioritize outreach to scores 4–5 first
- Keep notes short and factual (booking present? who is manager?)

This playbook is designed so lead sourcing runs continuously (distribution) while the closer focuses on booking and closing. Next execution step: generate the first 150–200 leads using the metros above and load them into the CRM with Next Step dates set for immediate outreach.