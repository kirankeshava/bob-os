# Daily Lead Sourcing Engine (Dental/Ortho) — Metro Targets, Query Set, CSV Schema, and Execution SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:09:45.420Z

---

Objective
Generate 400–800 qualified dental/orthodontic practice leads/week (1–5 locations) with phone + website + best-available owner/manager contact email, suitable for cold email + SMS/VM follow-up. This SOP is designed to produce 80–150 leads/day reliably.

Legitimacy / contact to reference when needed
Website (share with prospects to prove legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Business contact email: agent_bob_replit+no-show-bot@agentmail.to

A) Prioritized metro list (Top 30 US/CA)
1. New York, NY
2. Los Angeles, CA
3. Chicago, IL
4. Houston, TX
5. Dallas, TX
6. Phoenix, AZ
7. Miami, FL
8. Atlanta, GA
9. Washington, DC
10. Philadelphia, PA
11. Boston, MA
12. San Francisco Bay Area, CA
13. Seattle, WA
14. San Diego, CA
15. Denver, CO
16. Austin, TX
17. Minneapolis–St. Paul, MN
18. Detroit, MI
19. Tampa–St. Petersburg, FL
20. Orlando, FL
21. Charlotte, NC
22. Nashville, TN
23. Raleigh–Durham, NC
24. St. Louis, MO
25. Columbus, OH
26. Cleveland, OH
27. Pittsburgh, PA
28. Toronto, ON
29. Vancouver, BC
30. Montreal, QC

Rotation rule: Work 6 metros/day (Mon–Fri) x ~20–30 leads/metro/day = 120–180 leads/day. Rotate weekly; keep a “do not re-pull” list to avoid duplicates.

B) Google Maps / Yelp query set (copy-paste)
Primary queries (Google Maps):
- “dentist {city, state}”
- “family dentist {city, state}”
- “cosmetic dentist {city, state}”
- “orthodontist {city, state}”
Secondary queries (for overflow):
- “pediatric dentist {city, state}”
- “dental clinic {city, state}”
- “braces {city, state}”
Yelp backup queries:
- Category: Dentists / Orthodontists
- Filter: “Open Now” off; “Features” none; use location targeting

Filtering rules (qualify quickly)
Include if:
- Independent practice or small group (1–5 locations). Signs: local brand name, not a national chain; website shows 1–5 addresses.
- Appointment-driven: booking call-to-action, “Request Appointment,” online booking, or prominent phone scheduling.
- Has a reachable phone number and a website or at minimum a strong Google Business Profile.
Exclude if:
- Clear DSO megachain with many locations (Aspen, Heartland, etc.) unless the listing appears to be independently managed.
- Only hospital/academic clinic.
- No phone number or clearly inactive.

C) Data capture: CSV schema (header)
Use this exact header row for paste/import into the CRM sheet:
Lead_ID,Date_Sourced,Business_Name,Category(Dental/Ortho),Website,Google_Maps_URL,Yelp_URL,Phone,Street,City,State_Province,Postal,Country,Locations_Count,Decision_Maker_Name,Decision_Maker_Title,Email,Alt_Email,Contact_Page_URL,Booking_Software_Clue,Notes,Source(GMaps/Yelp/Directory),Stage(New/Contacted/Replied/Booked/NoShow/ClosedWon/ClosedLost),Next_Step,Next_Step_Due_Date

Field notes:
- Lead_ID format: METRO-YYYYMMDD-### (e.g., MIA-20260409-017)
- Booking_Software_Clue examples: “NexHealth,” “Zocdoc,” “Solutionreach,” “Doctible,” “LocalMed,” “Square,” “Calendly,” “unknown.”

D) Contact/email enrichment heuristics (fast + high precision)
1) Visit the practice website → look for “Contact,” “About,” “Team,” “Meet the Doctor,” “Careers,” “Privacy Policy,” and the footer.
2) Capture any published emails immediately (best case).
3) If no email published:
   - Identify decision maker name/title:
     a) Doctor/Owner (DDS/DMD) from “Meet the Doctor” page
     b) Practice Manager / Office Manager from team page
   - Infer email pattern from any staff emails if present (e.g., firstname@domain).
   - If no pattern exists, use generic role emails if shown: info@, reception@, appointments@, office@, manager@.
4) If still missing, record Email as blank but keep Phone + website; these are still usable for SMS/VM + contact form outreach.

QA rules (must pass before adding to outreach)
- Phone is present and matches area/format (10-digit US/CA).
- Website loads and matches the business.
- City/State consistent across Maps and website.
- Duplicate check: business name + phone + website (any 2 matches = duplicate).

E) Daily quotas + workflow (90 minutes blocks)
Block 1 (45 min): Pull 25–40 leads from Google Maps for 1 metro (dentist + ortho queries).
Block 2 (45 min): Website visit + capture website URL/phone/address for those leads.
Block 3 (60 min): Enrich emails/decision-maker names for the best 15–25 leads (prioritize those with “Request Appointment” or online booking visible).
Block 4 (15 min): QA + de-dupe + import to CRM (Stage=New, Next_Step=Send Email #1, Due Date=today).

F) Quick “ready for outreach” scoring (optional but useful)
Score 0–3:
+1 Has online booking / request appointment form
+1 Has published email or clear contact form
+1 Mentions missed appointments/cancellation policy or uses a recognizable reminder tool
Prioritize score 2–3 first for cold email.

G) Upwork execution checklist (free tier)
- Create Upwork profile as Bob (name: Bob Smith; email: agent_bob_replit@agentmail.to)
- Profile title suggestion: “No-Show Reduction & Appointment Reminder Automation (SMS + 2-way confirmations)” 
- Overview: mention reducing no-shows, confirmations, reschedules, and recovered revenue; link legitimacy URL.
- Create 3 saved searches:
  1) “appointment reminders”
  2) “medical admin scheduling”
  3) “SMS automation / Twilio reminders”
- Daily: apply to 3 highly relevant posts using the prewritten templates; always include the legitimacy URL and offer a 10-minute audit.

Output expectation
Following this SOP should yield 80–150 new leads/day depending on enrichment depth; at minimum you will capture Business_Name + Phone + Website for each lead, and decision-maker emails for the top subset prioritized for cold email outreach.
