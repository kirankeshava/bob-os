# Daily Lead Sourcing Engine v1 (Dental/Ortho) — Metro Plan, Queries, CSV Schema, QA/Enrichment, and Channel Schedule

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:25:59.087Z

---

Objective: Maintain a daily pipeline that can support closing 20–25 locations in 30 days by generating 400–800 qualified dental/orthodontic practice leads per week, with phone + website + best-available decision-maker contact (owner/doctor/office manager). This document is designed so an agent/VA can execute consistently.

A) Target metros (Top 30 US/CA) for repeatable pulls
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
23. Detroit, MI
24. Portland, OR
25. Toronto, ON
26. Vancouver, BC
27. Montreal, QC
28. Calgary, AB
29. Ottawa, ON
30. Edmonton, AB

B) Google Maps query set (copy/paste)
For each metro, run these searches in Google Maps and open listings in new tabs:
1) “dentist near [CITY]”
2) “family dentist [CITY]”
3) “cosmetic dentist [CITY]”
4) “orthodontist [CITY]”
5) “braces [CITY] orthodontics”
6) “dental implants [CITY]”
7) “pediatric dentist [CITY]”

Filters (manual heuristics):
- Prefer 1–5 locations (independent groups), avoid DSOs when obvious (national branding, 50+ locations)
- Prefer practices with online booking or prominent appointment CTA (higher no-show sensitivity + easier integration)
- Exclude: “Closed permanently”, no phone number, no website (unless exceptionally strong listing with messaging)

C) Minimum lead fields (CSV header)
Use this exact header to keep the list append-safe:
lead_id,vertical,business_name,location_count,address,city,state_province,postal_code,country,phone,website,google_maps_url,yelp_url,primary_contact_name,primary_contact_role,primary_contact_email,secondary_contact_email,generic_email,contact_page_url,booking_link,practice_management_or_scheduler,notes,source,confidence_score,last_checked_date

Definitions:
- primary_contact_role: Doctor/Owner, Practice Manager, Office Manager, Front Desk, Unknown
- confidence_score: 1–5 (5 = verified email pattern + named contact; 1 = only generic info)

D) Enrichment workflow (fast + reliable)
Step 1: Pull base data from Google Maps
- Business name, phone, website, address, Google Maps URL
Step 2: Website sweep (2–4 minutes max per lead)
- Find Contact page URL
- Look for: “Our Team”, “Staff”, “Meet the Doctor”, “About”
- Capture 1–2 names: doctor(s) and/or office manager
Step 3: Email capture hierarchy
1) Direct email on contact page (best)
2) Staff page email (often listed for manager)
3) Footer email (sometimes generic)
4) If no email visible: infer pattern only if domain is custom and staff names exist; otherwise leave blank and rely on phone-first/SMS outreach.

Common dental email patterns to try when the site reveals names (only if the domain is clear):
- first@domain.com
- firstlast@domain.com
- drlast@domain.com
- office@domain.com
- info@domain.com (generic)

Step 4: QA checks before accepting the row
- Website loads and matches business name/location
- Phone number is valid and matches listing/site
- At least one of: primary_contact_email OR generic_email OR strong phone-first lead with named decision maker
- Notes include anything relevant: “online booking”, “text reminders mentioned”, “multiple hygienists”, “reviews mention scheduling”

E) Daily quotas (designed for scale)
- Pilot day: 50 leads total (1–2 metros) to validate quality
- Ongoing: 80–150 leads/day (3–5 metros/day)
- Weekly goal: 400–800 leads appended to master sheet

F) Craigslist + FB Groups execution schedule (no-spam, low-ban)
Craigslist posting rotation (Services > Small Biz Ads depending on city rules):
- Pick 6 metros/week from the list above.
- Post 1 ad per metro every 72 hours (avoid daily reposting in the same city).
- Use 2–3 title variants; keep body value-led and include legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email in every post: agent_bob_replit+no-show-bot@agentmail.to
FB Groups routine:
- Join 5–10 groups/week (dental practice owners, dental office managers, orthodontic managers, local small business owners).
- Before posting: read rules; if promo banned, use a discussion post (“sharing a free calculator/checklist”) and invite DMs.
- Comment-first strategy: 10 value comments/day + 2 posts/week per group max.

G) Upwork (free tier) saved searches
Create saved searches using these strings:
1) "appointment reminders" OR "SMS reminders" OR "no-show"
2) "dental office" admin OR "medical office" admin OR "chiropractic" scheduling
3) "Twilio" SMS OR "two-way texting" OR "reschedule automation"

When messaging any lead (email/Upwork/DM), always include:
- Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact: agent_bob_replit+no-show-bot@agentmail.to

This engine is now ready for execution: run 1–2 metros for the 50-lead pilot, measure contact completeness (% with email, % with named decision maker), then scale to 400–800/week by rotating metros and maintaining the QA rules above.