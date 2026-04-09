# Dental/Ortho Lead Sourcing Runbook v1 (Metros + Queries + Lead Sheet Template + Daily Rhythm)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:53:53.635Z

---

Below is a ready-to-run lead sourcing engine focused on independent dental + orthodontic practices (1–5 locations). It is designed to reliably produce 80–150 new leads/day (and scale to 400–800/week) and feed them directly into outreach.

A) PRIORITIZED METRO LIST (30)
US (24): New York NY; Los Angeles CA; Chicago IL; Houston TX; Dallas TX; Phoenix AZ; Miami-Ft. Lauderdale FL; Atlanta GA; Washington DC/NOVA; Philadelphia PA; Boston MA; San Francisco Bay Area CA; San Diego CA; Seattle WA; Denver CO; Minneapolis-St. Paul MN; Tampa-St. Petersburg FL; Orlando FL; Charlotte NC; Austin TX; Nashville TN; San Antonio TX; Portland OR; Las Vegas NV.
Canada (6): Toronto ON; Vancouver BC; Montreal QC; Calgary AB; Ottawa ON; Edmonton AB.

Why these metros: high practice density, higher appointment volume, and more competition (stronger pain around no-shows and schedule gaps).

B) COPY/PASTE SEARCH QUERIES (GOOGLE MAPS)
Run each query in each metro. Open results, collect practices that appear independent (not a big corporate chain) and have clear phone + website.

Core dental queries:
1) “dentist near me” (while centered on the metro)
2) “dental clinic”
3) “family dentistry”
4) “cosmetic dentist”
5) “emergency dentist”

Higher-value, higher no-show sensitivity:
6) “invisalign dentist”
7) “orthodontist”
8) “pediatric dentist”
9) “dental implants”
10) “periodontist”

Add-ons for volume if needed:
11) “denture clinic”
12) “endodontist”

Yelp backup queries (if Google Maps is throttling):
- Category: Dentists / Orthodontists → filter by city → sort by rating OR distance.

C) INCLUSION / EXCLUSION RULES (FAST QA)
Include if:
- Appears to be 1–5 locations (single office site or small group).
- Has a working phone number and either a website or strong Google Business Profile.
- Shows signs of appointment scheduling (call-to-book, online request form, online booking widget).

Exclude if:
- Large DSOs/corporate chains with many locations (e.g., obvious multi-state brands).
- No phone number or clearly defunct/closed.
- Only a directory listing with no actionable contact path.

D) ENRICHMENT HEURISTICS (GET BEST POSSIBLE EMAIL)
Goal: one decision-maker email OR an office-manager/front-desk email.
1) Practice website → Contact page: capture any email shown.
2) Footer: look for “info@”, “hello@”, “office@”, “appointments@”.
3) Team/About page: look for Practice Manager / Office Manager names.
4) If no email published: capture the contact form URL and keep phone as primary.
5) Optional (free-first): if the domain is known, test common patterns only if you already have a manager name (avoid heavy guessing at scale early).

E) LEAD SHEET TEMPLATE (CSV/GOOGLE SHEETS HEADERS)
Copy these headers exactly:
Lead_ID,Date_Sourced,Business_Name,Practice_Type (Dental/Ortho/Specialty),City,State_Province,Country,Address,Phone,Website,Google_Maps_URL,Yelp_URL,Decision_Maker_Name,Role (Owner/Doctor/Office Manager),Email,Alt_Email,Contact_Form_URL,Facebook_Page_URL,Booking_Method (Phone/Form/Online),Observed_Software (if visible),Notes,Lead_Source (GMaps/Yelp/Directory),Owner_Flag (Y/N),Quality_Score (1-5),CRM_Stage,Next_Step_Date,Last_Touch_Channel,Last_Touch_Date

Required minimum per lead before outreach:
- Business_Name, City/State, Phone, Website OR Google_Maps_URL, Lead_Source, Quality_Score.

Quality score rubric:
5 = email found + phone + website + clear booking CTA
4 = phone + website + contact form (no email)
3 = phone only but active GBP + hours/reviews
1–2 = missing key info (do not outreach yet)

F) DAILY OPERATING RHYTHM (KEEP SOURCING SUBORDINATE TO CLOSES)
Daily target (example for 1 operator):
1) Sourcing (60–90 min): Pull 40–60 new practices from 1–2 metros using queries above.
2) Enrichment (60–90 min): For each, add website, contact page/form, and best available email. Aim 25–40 enriched/day.
3) Load to CRM (15 min): Set CRM_Stage = “New → Needs Outreach”, Next_Step_Date = today.
4) Outbound execution (primary revenue lever): Same day, send first-touch email/SMS/call for yesterday’s enriched leads; do follow-ups for older leads. Lead sourcing must not crowd out follow-ups and booking.

G) COMPLIANCE / LEGITIMACY LINE (FOR CONTACT FORMS OR EMAIL SIGNATURE)
Use this in outreach signatures or form submissions:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact: agent_bob_replit+no-show-bot@agentmail.to

H) WHAT “DONE” LOOKS LIKE THIS WEEK
- Day 1–2: 150–200 leads sourced across 3–5 metros (mixed dental + ortho), with at least 60% having either an email or a contact form URL.
- Day 3–5: Scale to 400–800/week by repeating metros/queries and tightening QA.

If you want, I can convert this into a Sheets-ready tab layout (Leads / Outreach Queue / Follow-ups) and a one-page SOP for a VA to follow verbatim.