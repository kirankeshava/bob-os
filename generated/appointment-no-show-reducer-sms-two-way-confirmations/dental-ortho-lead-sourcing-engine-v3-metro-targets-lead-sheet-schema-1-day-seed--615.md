# Dental/Ortho Lead Sourcing Engine v3 — Metro Targets + Lead Sheet Schema + 1-Day Seed Batch SOP (150–200 Leads) + Free Enrichment Rules

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:47:01.339Z

---

Business context (use in outreach + notes)
- Product: Appointment No-Show Reducer (SMS + two-way confirmations + reschedules + waitlist fill)
- Legitimacy URL to reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email to reference: agent_bob_replit+no-show-bot@agentmail.to

1) Target metros (repeatable Google Maps pulls)
Goal: choose 5–10 metros/day to pull 30–60 practices/metro depending on density.
US (high density dental/ortho):
1. New York, NY
2. Los Angeles, CA
3. Chicago, IL
4. Houston, TX
5. Phoenix, AZ
6. Philadelphia, PA
7. San Antonio, TX
8. San Diego, CA
9. Dallas, TX
10. San Jose, CA
11. Austin, TX
12. Jacksonville, FL
13. San Francisco, CA
14. Columbus, OH
15. Fort Worth, TX
16. Charlotte, NC
17. Seattle, WA
18. Denver, CO
19. Washington, DC
20. Nashville, TN
21. Boston, MA
22. Las Vegas, NV
23. Portland, OR
24. Detroit, MI
25. Minneapolis, MN
Canada:
26. Toronto, ON
27. Montréal, QC
28. Vancouver, BC
29. Calgary, AB
30. Ottawa, ON

Suggested daily pull plan (to reach 150–200/day)
- Day plan example: pick 6 metros; pull ~30 leads each = 180 leads.
- Mix: 4 US metros + 2 Canada metros (optional) to diversify.

2) Lead list sheet schema (CSV header + standards)
Use this exact header row (copy/paste into Google Sheets or export CSV):
Lead_ID,Date_Added,Business_Name,Category(Dental/Ortho),Website,Google_Maps_URL,Address,City,State_Province,Postal_Code,Country,Main_Phone,Secondary_Phone,Decision_Maker_Name,Role(Owner/Doctor/Office_Manager/Practice_Manager),Decision_Maker_Email,Generic_Email,Contact_Page_URL,Booking_URL,Booking_Method(Phone/Form/Online),Scheduling_Software(if known),Locations_Count(1-5),Review_Count,Rating,Notes,Source(GMaps/Yelp/Directory),Status(New/Queued/Contacted/Replying/Booked/Won/Lost),Next_Step_Date,Last_Contact_Channel,Last_Contact_Date

Field standards / validation rules
- Category: only Dental or Ortho.
- Locations_Count: if website indicates multiple locations, note 2–5; otherwise default 1.
- Decision_Maker_Email: must be a direct email when possible (name@domain). If unknown, leave blank and populate Generic_Email.
- Generic_Email acceptable examples: info@, office@, hello@, contact@, scheduling@, appointments@.
- Booking_Method:
  - Phone = “Call us to schedule” primary
  - Form = request appointment form only
  - Online = embedded scheduler (Zocdoc / NexHealth / Solutionreach / LocalMed / Dental Intelligence / etc.)
- Status: start all as New; move to Queued once ready to send.

3) Google Maps sourcing queries (copy/paste)
For each metro, run these queries and pull top results (avoid big DSOs where possible):
- “dentist in {City, State}”
- “family dentistry in {City, State}”
- “cosmetic dentist in {City, State}”
- “orthodontist in {City, State}”
- “invisalign in {City, State}”
Exclusion heuristics (skip if any):
- Corporate/DSO obvious branding across many states
- No website and no reachable phone
- Emergency-only clinics if they clearly don’t schedule appointments

4) Free enrichment rules (no paid tools) to find owner/manager emails
Step A — Website scrape (fast)
1. Open the practice website.
2. Check header/footer for email.
3. Visit /contact, /about, /team, /meet-the-doctor.
4. Look for doctor name(s) and office manager/practice manager.
5. Capture:
   - Decision_Maker_Name (ex: “Dr. Jane Doe” or “Sarah Smith”)
   - Role (Owner/Doctor or Office Manager)
   - Any direct email found.

Step B — Email pattern inference (use cautiously)
If no email is listed but domain is known, infer likely format ONLY if you have at least one staff email on site. Common formats:
- firstname@domain.com
- firstinitiallastname@domain.com
- firstname.lastname@domain.com
If you cannot confirm a pattern from the site, do not invent emails—use Generic_Email.

Step C — Generic email fallback (still usable)
If no direct email, use the best generic inbox:
Priority: scheduling@ / appointments@ > office@ > contact@ > info@.

Step D — Decision-maker identification without email
If you can’t find a direct email, still capture:
- Decision_Maker_Name + Role (from Team/About page)
- Use main phone and generic email for first touch; ask for office manager email in reply.

5) One-day seed batch SOP (150–200 leads)
Objective: produce a clean, QA’d lead CSV ready to load into CRM.
Time budget: ~6–7 hours total.

Tools (free)
- Google Maps in browser
- Google Sheets
- Practice websites
- Optional: Yelp for cross-check (free)

Workflow (repeat per metro)
A) Pull from Google Maps (45–60 minutes per metro)
1. Search query (e.g., “dentist in Austin TX”).
2. Open each listing in a new tab.
3. Record: Business_Name, Main_Phone, Address, Rating, Review_Count, Google_Maps_URL, Website.
4. Quick filter: skip if no phone; skip if website obviously corporate multi-state.
5. Add to sheet as “New”.
Target speed: 1–2 minutes per lead on this pass.

B) Website enrichment pass (60–90 minutes per 50 leads)
1. Open the website.
2. Find Contact_Page_URL and any email.
3. Find Decision_Maker_Name (Doctor/Owner) and/or Office Manager.
4. Note Booking_URL and Booking_Method (Phone/Form/Online).
5. Note Scheduling_Software if visible (logos, URLs, embedded widgets).
Target speed: 2–3 minutes/lead.

C) QA pass (30–45 minutes for 150–200 leads)
Checklist:
- Phone present for 95%+
- Website present for 80%+ (some may not have)
- City/State filled for 100%
- No duplicates (same phone/domain)
- At least 30–40% with an email (direct or generic) initially; improve over time.

D) Export
- Save as CSV.
- Keep Lead_ID consistent (e.g., DENT-YYYYMMDD-0001).

Daily quota guidance to reach 400–800/week
- 150–200 leads/day x 4 days = 600–800/week.
- Alternatively 100/day x 5 days = 500/week.

6) Minimal CRM import mapping (if using the schema above)
- Import all columns; ensure Status=New.
- Sort by Booking_Method=Online first (often more process-driven; easier to quantify no-show impact).
- Prioritize multi-location (2–5) next (higher revenue upside per close).

7) Upwork free-tier daily workflow (quick-paying clients)
Goal: 3 targeted proposals/day on posts mentioning any of:
- appointment setting, scheduling, reminders, missed appointments, no-shows, admin support, dental front desk.
Checklist:
1. Create account as Bob (use agent_bob_replit@agentmail.to).
2. Profile headline suggestion: “No-Show Reduction + Appointment Confirmation (SMS / Two-Way / Reschedule + Waitlist Fill)”
3. Portfolio link: include legitimacy URL above.
4. Saved searches (examples):
   - “no show”
   - “appointment reminders”
   - “medical admin scheduling”
5. Proposal rule: always include the legitimacy URL + contact email, and a 2-line ROI hook (e.g., ‘recover 5–15 appointments/month’).

If you want, I can convert this schema into a copy-paste Google Sheets template layout (tabs + dropdown validations) next, then start producing the first 150–200 leads as the seed batch.