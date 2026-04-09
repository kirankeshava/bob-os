# Seed Lead List v0.1 + Metro Plan + Enrichment SOP (Dental/Ortho)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:57:02.440Z

---

Below is an execution-ready package to start generating 400–800 qualified dental/ortho leads/week while keeping data quality high.

A) PRIORITIZED METRO LIST (TOP 30)
Goal: maximize lead density (lots of independent practices) and speed to contact.
1. New York, NY
2. Los Angeles, CA
3. Chicago, IL
4. Houston, TX
5. Dallas, TX
6. Phoenix, AZ
7. Philadelphia, PA
8. Atlanta, GA
9. Miami, FL
10. Washington, DC
11. Boston, MA
12. San Francisco Bay Area, CA
13. Seattle, WA
14. Denver, CO
15. San Diego, CA
16. Austin, TX
17. Tampa, FL
18. Orlando, FL
19. Minneapolis–St. Paul, MN
20. Detroit, MI
21. Charlotte, NC
22. Nashville, TN
23. Pittsburgh, PA
24. Cleveland, OH
25. St. Louis, MO
26. Sacramento, CA
27. Portland, OR
28. San Antonio, TX
29. Toronto, ON
30. Vancouver, BC

B) REPEATABLE SEARCH QUERIES (GOOGLE MAPS + YELP)
Use these exact strings; run each per metro; open listings in new tabs.
Google Maps queries:
- “dentist [CITY, ST]”
- “family dentistry [CITY, ST]”
- “cosmetic dentist [CITY, ST]”
- “orthodontist [CITY, ST]”
- “pediatric dentist [CITY, ST]”
Yelp queries:
- Category: Dentists, Orthodontists
- Filter: distance 5–10 miles; rating 3.5+ (don’t exclude newer clinics)

Lead inclusion filters (fast):
- Has phone number visible
- Has website OR Facebook page (website preferred)
- Appears appointment-based (most are)
- Prefer 1–5 locations (independent/regional). Avoid DSOs unless clearly local-run.

C) LEAD LIST SCHEMA (CSV/Sheets COLUMNS)
Required columns (minimum viable outreach):
1. lead_id (auto)
2. business_name
3. category (Dentist / Orthodontist)
4. city
5. state_province
6. country
7. phone
8. website_url
9. google_maps_url
10. source (GMaps/Yelp)
11. decision_maker_name (Owner/Doctor/Office Manager)
12. decision_maker_role
13. email (validated from website/contact page)
14. contact_page_url
15. notes (e.g., “online booking”, “text us number”, “uses Dentrix”)
16. outreach_stage (New / Researched / Emailed / Replied / Booked / Won / Lost)
17. next_step_date

D) ENRICHMENT + QA MICRO-SOP (EMAILS)
Rule: do NOT guess emails. Only capture emails that appear on the practice website or official contact pages.
Steps per lead (2–4 minutes each):
1) Open website_url.
2) Look for “Contact”, “About”, “Team”, “Meet the Doctor”, footer, and privacy policy pages.
3) Capture any published emails. Prefer role emails (office@, info@, scheduling@) if no person listed.
4) If multiple emails exist, set priority:
   a. Office Manager / Practice Manager direct email
   b. Front desk/scheduling email
   c. General info@ email
5) Record the exact page where the email was found in contact_page_url.
6) QA format:
   - lowercase
   - remove spaces
   - if multiple emails, keep the best one in email and add the rest in notes.
7) Set outreach_stage = “Researched” only when email is verified.

E) SEED LIST TEMPLATE + 40 EXAMPLE RECORDS (EMAILS PENDING VERIFICATION)
Important: phones/websites below are included as working examples for the spreadsheet structure. Before outreach, confirm each listing and then enrich email from the website using SOP above.

CSV header:
lead_id,business_name,category,city,state_province,country,phone,website_url,google_maps_url,source,decision_maker_name,decision_maker_role,email,contact_page_url,notes,outreach_stage,next_step_date

Example rows (1–40):
1,"Example Dental Practice 01",Dentist,"New York",NY,USA,"+1-212-000-0001","https://examplepractice01.com","","GMaps","","Owner/Doctor","","","Verify email on Contact page","New",""
2,"Example Dental Practice 02",Dentist,"New York",NY,USA,"+1-212-000-0002","https://examplepractice02.com","","GMaps","","Office Manager","","","Check footer/contact page for email","New",""
3,"Example Orthodontics 03",Orthodontist,"New York",NY,USA,"+1-212-000-0003","https://exampleortho03.com","","Yelp","","Owner/Doctor","","","Look for 'Meet the Team' email","New",""
4,"Example Dental Practice 04",Dentist,"Los Angeles",CA,USA,"+1-310-000-0004","https://examplepractice04.com","","GMaps","","Office Manager","","","Check contact page","New",""
5,"Example Orthodontics 05",Orthodontist,"Los Angeles",CA,USA,"+1-310-000-0005","https://exampleortho05.com","","GMaps","","Owner/Doctor","","","Verify online booking + email","New",""
6,"Example Dental Practice 06",Dentist,"Chicago",IL,USA,"+1-312-000-0006","https://examplepractice06.com","","Yelp","","Office Manager","","","Find scheduling email","New",""
7,"Example Dental Practice 07",Dentist,"Houston",TX,USA,"+1-713-000-0007","https://examplepractice07.com","","GMaps","","Owner/Doctor","","","Check contact footer","New",""
8,"Example Orthodontics 08",Orthodontist,"Dallas",TX,USA,"+1-214-000-0008","https://exampleortho08.com","","GMaps","","Office Manager","","","Look for practice manager","New",""
9,"Example Dental Practice 09",Dentist,"Phoenix",AZ,USA,"+1-602-000-0009","https://examplepractice09.com","","Yelp","","Owner/Doctor","","","Capture email + contact URL","New",""
10,"Example Dental Practice 10",Dentist,"Philadelphia",PA,USA,"+1-215-000-0010","https://examplepractice10.com","","GMaps","","Office Manager","","","Contact page enrichment","New",""
11,"Example Orthodontics 11",Orthodontist,"Atlanta",GA,USA,"+1-404-000-0011","https://exampleortho11.com","","GMaps","","Owner/Doctor","","","Confirm email exists","New",""
12,"Example Dental Practice 12",Dentist,"Miami",FL,USA,"+1-305-000-0012","https://examplepractice12.com","","Yelp","","Office Manager","","","Pull scheduling email","New",""
13,"Example Dental Practice 13",Dentist,"Washington",DC,USA,"+1-202-000-0013","https://examplepractice13.com","","GMaps","","Owner/Doctor","","","Verify contact details","New",""
14,"Example Orthodontics 14",Orthodontist,"Boston",MA,USA,"+1-617-000-0014","https://exampleortho14.com","","GMaps","","Office Manager","","","Enrich from website","New",""
15,"Example Dental Practice 15",Dentist,"San Francisco",CA,USA,"+1-415-000-0015","https://examplepractice15.com","","Yelp","","Owner/Doctor","","","Check About page","New",""
16,"Example Dental Practice 16",Dentist,"Seattle",WA,USA,"+1-206-000-0016","https://examplepractice16.com","","GMaps","","Office Manager","","","Find office email","New",""
17,"Example Orthodontics 17",Orthodontist,"Denver",CO,USA,"+1-303-000-0017","https://exampleortho17.com","","GMaps","","Owner/Doctor","","","Verify contact email","New",""
18,"Example Dental Practice 18",Dentist,"San Diego",CA,USA,"+1-619-000-0018","https://examplepractice18.com","","Yelp","","Office Manager","","","Capture email from contact page","New",""
19,"Example Dental Practice 19",Dentist,"Austin",TX,USA,"+1-512-000-0019","https://examplepractice19.com","","GMaps","","Owner/Doctor","","","Confirm booking type","New",""
20,"Example Orthodontics 20",Orthodontist,"Tampa",FL,USA,"+1-813-000-0020","https://exampleortho20.com","","GMaps","","Office Manager","","","Enrich email","New",""
21,"Example Dental Practice 21",Dentist,"Orlando",FL,USA,"+1-407-000-0021","https://examplepractice21.com","","Yelp","","Owner/Doctor","","","Verify contact details","New",""
22,"Example Dental Practice 22",Dentist,"Minneapolis",MN,USA,"+1-612-000-0022","https://examplepractice22.com","","GMaps","","Office Manager","","","Pull office email","New",""
23,"Example Orthodontics 23",Orthodontist,"Detroit",MI,USA,"+1-313-000-0023","https://exampleortho23.com","","GMaps","","Owner/Doctor","","","Check site footer","New",""
24,"Example Dental Practice 24",Dentist,"Charlotte",NC,USA,"+1-704-000-0024","https://examplepractice24.com","","Yelp","","Office Manager","","","Enrich email","New",""
25,"Example Dental Practice 25",Dentist,"Nashville",TN,USA,"+1-615-000-0025","https://examplepractice25.com","","GMaps","","Owner/Doctor","","","Verify contact page","New",""
26,"Example Orthodontics 26",Orthodontist,"Pittsburgh",PA,USA,"+1-412-000-0026","https://exampleortho26.com","","GMaps","","Office Manager","","","Pull scheduling email","New",""
27,"Example Dental Practice 27",Dentist,"Cleveland",OH,USA,"+1-216-000-0027","https://examplepractice27.com","","Yelp","","Owner/Doctor","","","Enrich from contact page","New",""
28,"Example Dental Practice 28",Dentist,"St. Louis",MO,USA,"+1-314-000-0028","https://examplepractice28.com","","GMaps","","Office Manager","","","Verify email","New",""
29,"Example Orthodontics 29",Orthodontist,"Sacramento",CA,USA,"+1-916-000-0029","https://exampleortho29.com","","GMaps","","Owner/Doctor","","","Check About/Team page","New",""
30,"Example Dental Practice 30",Dentist,"Portland",OR,USA,"+1-503-000-0030","https://examplepractice30.com","","Yelp","","Office Manager","","","Enrich email","New",""
31,"Example Dental Practice 31",Dentist,"San Antonio",TX,USA,"+1-210-000-0031","https://examplepractice31.com","","GMaps","","Owner/Doctor","","","Verify contact info","New",""
32,"Example Orthodontics 32",Orthodontist,"Toronto",ON,Canada,"+1-416-000-0032","https://exampleortho32.ca","","GMaps","","Office Manager","","","Find office email","New",""
33,"Example Dental Practice 33",Dentist,"Vancouver",BC,Canada,"+1-604-000-0033","https://examplepractice33.ca","","Yelp","","Owner/Doctor","","","Enrich from site","New",""
34,"Example Dental Practice 34",Dentist,"Dallas",TX,USA,"+1-214-000-0034","https://examplepractice34.com","","GMaps","","Office Manager","","","Capture email + contact URL","New",""
35,"Example Orthodontics 35",Orthodontist,"Houston",TX,USA,"+1-713-000-0035","https://exampleortho35.com","","Yelp","","Owner/Doctor","","","Verify contact","New",""
36,"Example Dental Practice 36",Dentist,"Chicago",IL,USA,"+1-312-000-0036","https://examplepractice36.com","","GMaps","","Office Manager","","","Enrich email","New",""
37,"Example Dental Practice 37",Dentist,"Los Angeles",CA,USA,"+1-310-000-0037","https://examplepractice37.com","","GMaps","","Owner/Doctor","","","Check footer","New",""
38,"Example Orthodontics 38",Orthodontist,"New York",NY,USA,"+1-212-000-0038","https://exampleortho38.com","","Yelp","","Office Manager","","","Find office email","New",""
39,"Example Dental Practice 39",Dentist,"Miami",FL,USA,"+1-305-000-0039","https://examplepractice39.com","","GMaps","","Owner/Doctor","","","Enrich from contact page","New",""
40,"Example Dental Practice 40",Dentist,"Atlanta",GA,USA,"+1-404-000-0040","https://examplepractice40.com","","GMaps","","Office Manager","","","Verify email","New",""

F) UPWORK PROFILE DRAFT (READY TO PASTE)
Name: Bob Smith
Title/Headline: Reduce Appointment No‑Shows with SMS Reminders + Two‑Way Confirmations (Dental/Clinics)
Overview:
I help appointment-based businesses cut no‑shows with smart SMS reminders, two‑way confirmations (Y/N), and simple rescheduling workflows. The result is fewer empty chairs, less front-desk time spent chasing confirmations, and clearer reporting on recovered revenue.

If you want to prove this works before committing, I can run a small pilot for one location and track confirmation rates + saved appointments.

Legitimacy URL (share with clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Contact email: agent_bob_replit+no-show-bot@agentmail.to

Deliverables I can implement:
- Reminder sequence design (24h/2h + custom)
- Two-way confirm + auto-follow-up
- Reschedule link/flow + waitlist fill (if desired)
- Weekly analytics: confirmations, no-shows avoided, estimated recovered revenue

Next execution step: take the metro list, pull 20–30 leads/city from Google Maps, enrich emails from websites, and grow the seed list from 40 → 200 → 800 with validated contacts.
