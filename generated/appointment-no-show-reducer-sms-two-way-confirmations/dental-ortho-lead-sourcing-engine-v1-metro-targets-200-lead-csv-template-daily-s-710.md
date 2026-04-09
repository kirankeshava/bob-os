# Dental/Ortho Lead Sourcing Engine v1 — Metro Targets + 200-Lead CSV Template + Daily SOP + CRM Next-Step Rules

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:45:47.668Z

---

Below is an execution-ready lead sourcing engine for Appointment No-Show Reducer (SMS + two-way confirmations). It is designed to generate 80–150 qualified dental/ortho practice leads per day and scale to 400–800/week while keeping data usable for immediate outbound.

A) Target metros (start here; rotate weekly)
Prioritize dense metros with many independent practices (not DSOs):
US: New York NY, Los Angeles CA, Chicago IL, Houston TX, Dallas TX, Phoenix AZ, Philadelphia PA, San Antonio TX, San Diego CA, San Jose CA, Austin TX, Jacksonville FL, San Francisco CA, Columbus OH, Fort Worth TX, Charlotte NC, Indianapolis IN, Seattle WA, Denver CO, Washington DC, Boston MA, Nashville TN, Detroit MI, Oklahoma City OK, Portland OR.
Canada: Toronto ON, Montreal QC, Vancouver BC, Calgary AB, Edmonton AB.

B) Repeatable search queries (Google Maps + Yelp)
Use Google Maps first (higher phone/website coverage), then Yelp to fill gaps.
Google Maps queries (copy/paste):
- “dentist near [CITY]”
- “family dentistry [CITY]”
- “cosmetic dentist [CITY]”
- “orthodontist [CITY]”
- “pediatric dentist [CITY]”
Add qualifiers to avoid chains:
- “private practice dentist [CITY]” (sometimes helpful)
- exclude brand DSOs manually (Aspen, Heartland, Smile Brands, etc.).
Yelp queries:
- Category: Dentists / Orthodontists
- Filter: “Open Now” off (doesn’t matter), focus on businesses with websites/phone.

C) 200-lead CSV template (columns)
Create a spreadsheet with exactly these columns (in this order) so it can be imported into any CRM:
1) Lead_ID (CITY-SEQ, e.g., DALLAS-001)
2) Vertical (Dental / Ortho)
3) Practice_Name
4) Location_Name (if multi-location)
5) Street_Address
6) City
7) State_Province
8) Postal_Code
9) Country
10) Main_Phone
11) Secondary_Phone
12) Website_URL
13) Booking_URL (if visible)
14) Contact_Page_URL
15) Facebook_Page_URL (optional)
16) Google_Maps_URL
17) Yelp_URL
18) Decision_Maker_Name (Doctor/Owner/Practice Manager)
19) Decision_Maker_Title (Owner Dentist / Orthodontist / Office Manager / Practice Manager)
20) Decision_Maker_Email
21) Generic_Email (info@ / office@)
22) Contact_Form_URL (if no email)
23) Software_Clue (e.g., “NexHealth”, “Solutionreach”, “Weave”, “Doctible”, “LocalMed”, “Zocdoc”, “Dentrix”, “OpenDental” if seen)
24) No_Show_Pain_Clue (e.g., “24h cancellation policy”, “late cancellation fee”, “waitlist form”) 
25) Outreach_Priority (A/B/C)
26) Data_Quality (1–5)
27) Last_Verified_Date
28) Source (GMaps / Yelp / Directory)
29) Notes
30) Stage (New / To Research / Ready to Email / Contacted / Replied / Booked / Closed Won / Closed Lost)
31) Next_Step_Date

D) Data quality rules (non-negotiable)
- Must have: Practice_Name + City/State + Main_Phone + Website OR Google_Maps_URL.
- Email rule: provide at least one of (Decision_Maker_Email, Generic_Email). If neither is available, include Contact_Form_URL and set Stage=To Research.
- Validate phones: ensure 10-digit (US/CA), no obvious call tracking duplicates across many practices.
- Reject leads that are clearly DSOs/chains unless independently owned with local decision-maker contact.
- Data_Quality scoring:
  5 = verified decision-maker email + direct phone + website
  4 = generic email + phone + website
  3 = contact form + phone + website
  2 = phone only + maps listing (needs research)
  1 = missing phone/website (do not include)

E) Enrichment heuristics (fast ways to find owner/manager email)
1) Practice website → “Contact”, “About”, “Team”, “Meet the Doctor”.
2) Look for patterns: firstname@domain, drfirstname@domain, office@domain.
3) If doctor name is listed but no email, record Decision_Maker_Name + Title and use generic email/contact form.
4) If there is a Facebook page, sometimes email is listed under About.

F) Daily execution checklist (80–150 leads/day)
1) Pick 2 metros/day.
2) Pull 60–80 listings from Google Maps across dentist + orthodontist queries.
3) For each listing: capture phone, website, address, maps URL.
4) Visit website: collect contact page URL + any email(s) + decision maker name.
5) Tag Software_Clue when visible (booking widgets, footer badges).
6) Assign Outreach_Priority:
   A = has booking widget + decision-maker name/email (high intent)
   B = website + generic email (still workable)
   C = contact form only (slower)
7) Set Stage:
   Ready to Email if email exists; To Research if only contact form.
8) Set Next_Step_Date:
   - Ready to Email: today
   - To Research: tomorrow
9) QA pass (15 minutes end-of-day): remove duplicates, check 10 random rows for missing fields.

G) CRM next-step rules (Sheets-friendly)
If using a simple CRM sheet, apply these rules manually or via formula:
- New → Next_Step_Date = today
- Ready to Email (after adding email) → Next_Step_Date = today
- Contacted (no reply) → Next_Step_Date = today+2
- Replied (needs follow-up) → Next_Step_Date = today+1
- Booked → Next_Step_Date = meeting date
- Closed Won/Lost → Next_Step_Date blank

H) Compliance + legitimacy reference (for templates/outreach)
When posting or emailing, reference:
- Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

This engine is ready for immediate execution: start building the first 200-lead seed list using the template above, prioritize A/B leads, and hand to the closer for same-day outreach and booking.