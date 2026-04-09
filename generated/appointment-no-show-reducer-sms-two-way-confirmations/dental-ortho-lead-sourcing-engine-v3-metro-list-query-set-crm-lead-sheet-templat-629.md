# Dental/Ortho Lead Sourcing Engine v3 — Metro List, Query Set, CRM/Lead Sheet Template, QA + Cadence Rules

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:58:11.651Z

---

Business legitimacy references to include everywhere:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

1) PRIORITIZED METRO LIST (30) FOR DENTAL/ORTHO LEAD PULLS
Goal: dense, appointment-heavy markets with many independent practices.
US:
1. New York, NY  2. Los Angeles, CA  3. Chicago, IL  4. Houston, TX  5. Dallas, TX
6. Phoenix, AZ  7. Philadelphia, PA  8. Atlanta, GA  9. Miami, FL  10. Washington, DC
11. Boston, MA  12. San Francisco Bay Area, CA  13. Seattle, WA  14. Denver, CO  15. San Diego, CA
16. Austin, TX  17. Tampa, FL  18. Orlando, FL  19. Charlotte, NC  20. Minneapolis, MN
21. Detroit, MI  22. St. Louis, MO  23. Nashville, TN  24. Portland, OR  25. Las Vegas, NV
Canada:
26. Toronto, ON  27. Vancouver, BC  28. Montreal, QC  29. Calgary, AB  30. Ottawa, ON

2) COPY/PASTE QUERY SET (GOOGLE MAPS + YELP)
Use these per metro. Start with Google Maps; use Yelp to backfill.
Primary:
- “dentist” + {city}
- “family dentist” + {city}
- “cosmetic dentist” + {city}
- “orthodontist” + {city}
- “pediatric dentist” + {city}
Secondary (often high no-show):
- “dental implants” + {city}
- “invisalign” + {city}
- “emergency dentist” + {city}
Filters/selection rules:
- Prefer 1–5 locations (avoid large DSOs unless local/regional)
- Must show phone number on listing
- Prefer practices with website + online booking or “Request appointment”
- Exclude: dental schools, free clinics, corporate chains with >20 locations

3) LEAD LIST + CRM TEMPLATE (SHEETS/CSV COLUMNS)
Tab A: Lead_List (raw leads)
Required columns:
- Lead_ID (auto): {metro}-{source}-{#}
- Source (GoogleMaps/Yelp/Directory)
- Practice_Name
- Specialty (Dental / Ortho / Pedo / Implant)
- Address
- City
- State/Province
- ZIP/Postal
- Phone
- Website
- Google_Rating
- Review_Count
- Hours_Notes (optional)
- Online_Booking? (Y/N/Unknown)
- Booking_Link (if found)
- Tech_Notes (Doctible, NexHealth, SolutionReach, Weave, Yapi, unknown)
Decision-maker/contact columns:
- Primary_Contact_Role (Owner/Doctor/Office Manager/Practice Manager)
- Primary_Contact_Name
- Primary_Email
- Secondary_Email
- Contact_Page_URL
- Facebook_Page_URL (optional)
Qualification + ops:
- Fit_Score (A/B/C)
- NoShow_Pain_Clues (mentions cancellations, missed appts, waitlist, “text us”)
- Last_Touched_Date
- Next_Step_Date
- Stage (dropdown)
- Notes

Tab B: CRM_Pipeline (working view)
Stages (dropdown values):
1) New  2) Researched  3) Contact Found  4) Attempting Contact  5) Replied
6) Interested  7) Demo Booked  8) Demo Done  9) Trial/Setup  10) Won
11) Lost  12) Nurture
Rules:
- Every row must have Next_Step_Date populated (no orphan leads)
- If Stage = Attempting Contact, Next_Step_Date must be within 48 hours
- If Stage = Interested, CTA must be “Book demo” (add booking link once chosen)

Tab C: Activity_Log
- Date, Lead_ID, Channel (email/sms/phone/FB), Message_Type (S1/FU1/etc.), Outcome, Next_Step_Date

4) QA / VALIDATION RULES (TO KEEP LIST CLEAN)
Minimum viable lead:
- Practice name + City + Phone required.
- Website strongly preferred; if missing, still keep if reviews > 30 and phone works.
Email validation heuristics (free-first):
- Prefer direct emails from site (contact/team pages).
- If only a form exists, use generic email patterns if domain is known: info@, office@, admin@, appointments@, scheduling@.
- Avoid role emails that look like ticketing (support@) unless no alternative.
De-duplication:
- De-dupe by Phone + Website domain.
- If multiple listings for same practice, keep the one with correct website.

5) DECISION MAKER ENRICHMENT PLAYBOOK (FAST)
Where to find emails fast:
- Website footer: “Contact”, “Locations”, “Team”, “Privacy Policy” (often lists email)
- “New Patients” or “Request Appointment” page
- PDF forms (new patient forms sometimes contain admin email)
Role targeting (best to worst):
1) Practice Manager / Office Manager (operational owner of scheduling)
2) Owner/Doctor (if solo practice)
3) Front desk/Reception (still useful for routing)
If no email:
- Capture contact form URL + phone; mark Primary_Email = “FORM ONLY” and proceed with call/SMS.

6) OUTREACH CADENCE RULES (14 DAYS, MULTI-TOUCH)
Objective: book demos quickly while keeping sourcing running.
Assets to reference in messaging:
- Website legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Reply-to/contact: agent_bob_replit+no-show-bot@agentmail.to

Cadence (email-first; SMS/VM optional where appropriate and compliant):
Day 1: Email #1 (value + 1-line CTA)
Day 2: Email #2 (short bump + question)
Day 4: Email #3 (mini-case: “recover X appts/week” framing)
Day 6: Optional call/VM + Email #4 (“should I close your file?”)
Day 9: Email #5 (waitlist/gap-fill angle)
Day 12: Final email (breakup + offer to send a 1-page estimate)
Rules:
- Stop cadence immediately if they reply; move to Replied/Interested stage.
- If wrong person, ask for the office manager/practice manager email and update record.
- Every touch updates Last_Touched_Date and sets Next_Step_Date.

7) DAILY QUOTAS (TO HIT 400–800/WEEK)
Per operator (single person):
- Pull 80–120 raw leads/day from Google Maps across 2 metros.
- Enrich 40–60/day with at least one email or contact form URL.
- QA 10% sample/day (phone present, website correct, no duplicates).
Weekly target: 400–800 leads added; 200–300 enriched to “Contact Found” stage.

If you want me to execute the seed batch next, I’ll start with the top 3 metros (NYC, LA, Chicago) and produce the first 150–200 rows in the exact schema above, ready for upload into the CRM tab.