# Lead Sourcing Engine (Dental/Ortho) — Lead List Schema + SOP + Channel Templates + Upwork Pack + Cold Email Setup Checklist

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:44:04.231Z

---

BUSINESS LEGITIMACY LINKS (use in outreach where appropriate)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

A) LEAD LIST (CSV/Sheets) SCHEMA — REQUIRED COLUMNS
Create a Google Sheet with these columns in this exact order for easy import into any CRM later.
1. Lead_ID (format: CITY-ST-###)
2. Business_Name
3. Vertical (Dental or Orthodontics)
4. Location_Count (1–5)
5. Street_Address
6. City
7. State_Province
8. Postal_Code
9. Country (US/CA)
10. Main_Phone (E.164 if possible)
11. Website_URL
12. Booking_Method (Phone / Web form / Online booking link)
13. Booking_Software_Clue (e.g., “NexHealth”, “Solutionreach”, “Doctible”, “Weave”, “Unknown”)
14. Google_Maps_URL
15. Yelp_URL (optional)
16. Decision_Maker_Name (Doctor/Owner if found)
17. Decision_Maker_Title (Owner / Dentist / Orthodontist / Practice Manager / Office Manager)
18. Decision_Maker_Email
19. Generic_Email (info@ / hello@)
20. Contact_Form_URL (if no email)
21. Facebook_Page_URL (optional)
22. Notes (e.g., “mentions no-show fee”, “accepting new patients”, “multi-doc practice”)
23. Source (Google Maps / Yelp / Directory / Website)
24. Last_Verified_Date (YYYY-MM-DD)
25. Outreach_Stage (Prospect / Contacted / Replied / Booked / Won / Lost)
26. Next_Step_Date (YYYY-MM-DD)

VALIDATION / QA RULES
- Must have: Business_Name + City/State + Main_Phone + Website_URL OR Google_Maps_URL.
- Email quality tiers:
  Tier A: named person email (first@domain) + role confirmed.
  Tier B: office manager/practice manager email.
  Tier C: generic info@.
  Tier D: contact form only.
- If only contact form exists, still include lead, but tag Notes = “Form only” and include Contact_Form_URL.
- Deduplicate by (Business_Name + City) and by phone number.

B) DAILY LEAD SOURCING SOP (FREE-FIRST)
Goal: 80–150 qualified leads/day → 400–800/week.

TOOLS (FREE)
- Google Maps in browser
- Yelp (optional)
- Practice website (Contact/About pages)
- State dental association directory (optional)
- Spreadsheet (Google Sheets)

STEP-BY-STEP
1) Pick metro from rotation list (see Section C). Search Google Maps:
   - “dentist near me” + city
   - “orthodontist” + city
   - “family dentistry” + city
   - “cosmetic dentist” + city
2) Open a practice listing → capture:
   Business_Name, address, phone, website, maps URL.
3) Open the Website_URL:
   - Find Contact page; capture emails.
   - Check footer for emails.
   - Check Team/About page for office manager/practice manager names.
   - Capture any booking widget clue (e.g., “Schedule with NexHealth”, “Solutionreach”, “Weave”, “Doctible”).
4) Email heuristics (no paid enrichment):
   - If staff names exist but no emails, look for pattern in site (e.g., info@domain). Do NOT guess emails unless pattern confirmed.
   - If only contact form exists, capture the form URL.
5) Record in sheet, set Last_Verified_Date.
6) QA pass every 25 leads:
   - Confirm phone not blank.
   - Confirm website loads.
   - Confirm not a DSO/corporate chain (skip if clearly corporate >5 locations unless target expands).

DAILY QUOTAS
- 60 dental + 20 ortho minimum per day (adjust based on availability).
- Aim for 30–40% of leads with at least Tier B email (manager/office) by using Contact + Team pages.

C) METRO ROTATION LIST + COPY/PASTE QUERY LIBRARY
Use these 30 metros first (high density, lots of independents):
1 NYC, 2 Los Angeles, 3 Chicago, 4 Houston, 5 Phoenix, 6 Philadelphia, 7 San Antonio, 8 San Diego, 9 Dallas, 10 San Jose,
11 Austin, 12 Jacksonville, 13 Fort Worth, 14 Columbus, 15 Charlotte, 16 San Francisco, 17 Indianapolis, 18 Seattle, 19 Denver, 20 Washington DC,
21 Boston, 22 Nashville, 23 Detroit, 24 Portland, 25 Las Vegas, 26 Miami, 27 Atlanta, 28 Minneapolis, 29 Tampa, 30 Orlando.
Canada add-on metros: Toronto, Vancouver, Calgary, Ottawa, Montreal.

QUERY LIBRARY (paste into Google Maps search)
- dentist {CITY}
- orthodontist {CITY}
- family dentist {CITY}
- cosmetic dentist {CITY}
- pediatric dentist {CITY}

D) CRAIGSLIST POSTING TEMPLATE (COMPLIANT, VALUE-LED)
Category suggestion: “services > small biz ads” or local equivalent (follow each city rules).
Title options:
1) “Dental offices: cut no-shows with 2-way SMS confirmations (simple setup)”
2) “Stop appointment no-shows — reminders + confirm/reschedule via text”

Body:
Hi! I’m Bob.

If you run a dental/ortho office, no-shows and late cancellations quietly drain production every week. We built a simple tool that:
- Sends SMS reminders
- Collects 2-way confirmations (“Confirm / Reschedule”)
- Auto-handles reschedule flows
- Can notify a waitlist to help fill gaps
- Shows basic analytics so you can quantify recovered revenue per location

This is not a marketing blast tool—just operational reminders + confirmations.

If you want, I’ll share a quick walkthrough and estimate how much revenue you’re currently leaking from no-shows.

Website (legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

Reply with your practice name + city and whether you want reminders 24/48 hours before, and I’ll suggest a setup.

E) FACEBOOK GROUP POST TEMPLATE + DM SCRIPT
POST (keep short, ask permission, avoid links if group rules forbid)
Text:
Quick question for dental/ortho office managers: what’s your current no-show rate?

I’m Bob and I’m building a lightweight no-show reducer (2-way SMS reminders that let patients confirm or reschedule, plus optional waitlist gap-filling). If a couple of offices want to beta test, I’ll set it up with your reminder timings and share a simple “recovered revenue” report.

If this is allowed here, comment “info” and I’ll DM details. If links are okay, here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

DM SCRIPT (after someone comments)
Hi — thanks. Are you the office manager/practice manager?
If yes: Roughly how many appointments/week and what % no-show/late cancel do you see?
If you want, I can outline a 2-way reminder flow (Confirm/Reschedule) that typically reduces no-shows without adding front-desk work. You can email me at agent_bob_replit+no-show-bot@agentmail.to or I can send the overview link.

F) UPWORK EXECUTION PACK
PROFILE HEADLINE (paste into Upwork)
“Reduce Appointment No-Shows (2-way SMS Confirmations + Reschedules + Waitlist Fill)”

PROFILE OVERVIEW (paste)
I help appointment-based businesses reduce no-shows using simple 2-way SMS confirmations (Confirm/Reschedule), smart reminders, and lightweight analytics to quantify recovered revenue.

If you already have a booking workflow, I can:
- Map your current scheduling + reminder process
- Implement a confirm/reschedule-by-text flow
- Add optional waitlist gap-filling
- Report on outcomes (confirm rate, reschedules saved, estimated revenue recovered)

Legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

SAVED SEARCH KEYWORDS (create 3 searches)
1) “appointment reminders” OR “sms reminders” OR “no show”
2) “medical receptionist” OR “appointment setting” OR “schedule management”
3) “dental admin” OR “office manager” OR “patient scheduling”

UPWORK PROPOSAL TEMPLATE #1 (No-show reduction)
Subject: Reduce your no-shows with 2-way SMS confirmations (confirm/reschedule)
Message:
Hi [Name] — I can help you reduce no-shows by adding a simple 2-way SMS flow: patients confirm or reschedule by text, and you get a clear report showing what was saved.

A quick question: roughly how many appointments/week and what’s your current no-show/late-cancel rate?

If helpful, here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
You can also reach me at agent_bob_replit+no-show-bot@agentmail.to.

UPWORK PROPOSAL TEMPLATE #2 (Appointment admin / receptionist)
Hi [Name] — I’m an appointment-ops specialist focused on reducing no-shows and cleaning up scheduling workflows. I can implement reminders + confirmation/reschedule-by-text so your front desk spends less time chasing patients.

If you tell me your industry + appointment volume, I’ll recommend reminder timings (24/48/72h) and the confirmation wording.
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

UPWORK PROPOSAL TEMPLATE #3 (Dental/clinic specific)
Hi [Name] — for dental/ortho offices, one of the fastest wins is 2-way confirmations: “Reply 1 to confirm / 2 to reschedule.” It reduces no-shows without increasing front desk calls.

If you share your practice size + schedule system, I’ll outline a setup and how we’ll measure recovered production.
Contact: agent_bob_replit+no-show-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

G) COLD EMAIL SETUP CHECKLIST (FREE-FIRST)
1) Sending identity
- From name: Bob
- Reply-to: agent_bob_replit+no-show-bot@agentmail.to
2) Domain/authentication (if sending from a custom domain later)
- Add SPF record authorizing sender
- Enable DKIM signing
- Publish DMARC (start with p=none then tighten)
3) Warmup plan (no paid tools assumed)
- Days 1–3: 10–15 emails/day, highly personalized, plain-text
- Days 4–7: 20–30/day
- Week 2: 30–50/day if replies/engagement are healthy
4) Sending limits
- Keep under 50/day/inbox early to protect deliverability.
5) Tracking
- Avoid heavy click tracking early; prefer simple “reply to book” CTA.
- Track opens only if necessary; replies matter most.
6) CRM logging
- Every send gets logged with date, template, and next step date.

NOTE: If we decide to scale cold email beyond low volume, a dedicated sending domain + inbox may be needed (may require paid email provider). That would trigger a separate approval request.
