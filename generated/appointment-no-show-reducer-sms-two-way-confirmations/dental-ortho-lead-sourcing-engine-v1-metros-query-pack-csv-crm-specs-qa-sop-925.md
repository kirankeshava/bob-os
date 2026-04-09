# Dental/Ortho Lead Sourcing Engine v1 (Metros + Query Pack + CSV/CRM Specs + QA SOP)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:36:16.332Z

---

Goal: produce 400–800 qualified dental/orthodontic practice leads/week (phone + website + best-available decision-maker contact) to feed outbound for the Appointment No-Show Reducer (SMS + two-way confirmations). Legitimacy URL to reference when needed: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2  | Contact: agent_bob_replit+no-show-bot@agentmail.to

A) Priority metro list (top 30) for repeatable pulls
US: New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; Nashville TN; Detroit MI; Oklahoma City OK.
Canada: Toronto ON; Montreal QC; Vancouver BC; Calgary AB; Ottawa ON; Edmonton AB.

B) Query pack (copy/paste)
Use in Google Maps (and repeat similarly in Yelp) per metro. Rotate synonyms to avoid duplicates and capture more practices.
1) "dentist" + {city}
2) "dental clinic" + {city}
3) "family dentist" + {city}
4) "orthodontist" + {city}
5) "braces" + {city}
6) "invisalign" + {city}
7) "pediatric dentist" + {city}
8) "cosmetic dentist" + {city}
9) "emergency dentist" + {city}
10) "dental implants" + {city}

Optional qualifier queries (to find tech-forward / higher no-show sensitivity):
11) "dentist online booking" + {city}
12) "dentist same day appointment" + {city}
13) "orthodontist free consultation" + {city}

C) Daily workflow (80–150 leads/day, free-first)
Step 1 — Pull list (Google Maps):
- Search one query + city.
- Open each result in a new tab.
- Capture: Business Name, Address/City, Phone, Website, Rating, Review Count.
- Skip: chains with many locations (e.g., 20+), hospitals/university clinics, clearly closed businesses.

Step 2 — Website scrape (2–3 minutes per practice):
- On the practice website, locate Contact / About / Team pages.
- Capture best decision-maker email in this priority order:
  (1) Office Manager / Practice Manager email
  (2) Owner dentist/doctor email
  (3) General front desk email (fallback)
- Capture the name/title when available (e.g., “Sarah K., Office Manager”).
- Note booking software signals if visible: “NexHealth”, “Solutionreach”, “Weave”, “Doctible”, “Zocdoc”, “Calendly”, “Online Scheduling”.

Step 3 — Enrichment heuristics (no paid tools required):
- If no email is shown, try common patterns using the domain:
  info@domain, office@domain, hello@domain, appointments@domain.
- Check site footer and privacy policy for an email.
- If only a contact form exists, record “Contact Form Only = Yes” and still keep phone.

Step 4 — QA rules (prevent garbage leads):
- Must have: business name + city + phone.
- Website strongly preferred; if none, keep only if listing looks active (recent reviews, open hours, real phone).
- Email quality flags:
  - Green: email on site AND matches domain.
  - Yellow: generic email guessed (info@) without proof.
  - Red: no email; contact form only.
- Duplicate check: de-dupe by phone number and domain.

D) Lead list CSV template (headers)
Use exactly these columns so the CRM import is clean:
- Lead_ID
- Vertical (Dental / Ortho)
- Practice_Name
- Website
- Phone
- Street_Address
- City
- State_Province
- Country
- Google_Maps_URL
- Yelp_URL
- Decision_Maker_Name
- Decision_Maker_Title (Owner/Doctor, Office Manager, Practice Manager, Front Desk)
- Decision_Maker_Email
- Email_Proof (On-site / Guessed / None)
- Contact_Form_URL
- Booking_Software_Signal (free text)
- Notes (free text)
- Source (Google Maps / Yelp / Directory)
- Added_Date

E) CRM pipeline spec (Google Sheets-ready)
Tabs:
1) Leads (raw) — paste/import CSV
2) Pipeline — working view with stages + next steps
3) Activity Log — date-stamped touches

Pipeline stage dropdown (in order):
- New (unworked)
- Researched (website checked)
- Contact Found (email/role captured)
- Attempted (Touch 1 sent)
- Engaged (reply/answered)
- Qualified (has appointments + no-show pain)
- Demo Scheduled
- Trial/Setup
- Won (Paying)
- Lost

Required fields to advance stage:
- To move to “Attempted”: Phone OR Email must exist.
- To move to “Qualified”: Confirmed appointment-based business + decision maker identified.
- To move to “Demo Scheduled”: meeting date/time + channel (email/SMS/phone).

Next-step rules (anti-stall):
- Every record in Attempted/Engaged/Qualified must have Next_Step and Next_Step_Date filled.
- If Next_Step_Date is today or past due, it appears in Today Queue.

F) Operator note (how to position when asked)
If a lead asks “who are you?”, respond with: “We help appointment-based clinics reduce no-shows with SMS reminders + two-way confirmations and easy rescheduling, plus simple analytics showing recovered revenue. Quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2  You can reach us at agent_bob_replit+no-show-bot@agentmail.to.”

This SOP is designed so a single operator can reliably pull 80–150 leads/day from 2–3 metros (rotating queries), maintain quality via QA flags, and keep the CRM from stalling by enforcing next-step dates.