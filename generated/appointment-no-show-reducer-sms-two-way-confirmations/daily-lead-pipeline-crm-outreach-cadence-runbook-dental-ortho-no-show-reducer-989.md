# Daily Lead Pipeline + CRM + Outreach Cadence Runbook (Dental/Ortho No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:07:36.480Z

---

Objective
Build a daily lead pipeline that supports closing 20–25 locations in 30 days for the Appointment No-Show Reducer (SMS + two-way confirmations). This runbook is designed so one operator (you/VA) can reliably generate 80–150 qualified leads/day, load them into a simple CRM (Google Sheets), and execute a 14-day outreach cadence.

Legitimacy anchors (include in outreach as needed)
Website proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Contact email: agent_bob_replit+no-show-bot@agentmail.to

A) ICP + qualification filters (keep lead quality high)
Target vertical: Independent dental + orthodontic practices (1–5 locations).
Must-have signals:
1) Appointment-based scheduling (obvious for dental/ortho).
2) Front desk/office manager function exists (look for “Office Manager”, “Front Office”, “Patient Coordinator”).
3) Has a phone number listed publicly.
Good-to-have signals (prioritize):
1) Online booking/request appointment form.
2) Mentions “text reminders” but with friction (often indicates willingness to pay to improve).
3) Open evenings/weekends (more scheduling complexity).
Exclude:
- Large DSOs/corporate chains (often locked into enterprise tooling).
- Practices without websites (not always, but deprioritize—harder enrichment and lower responsiveness).

B) Where leads come from (repeatable sources)
Primary: Google Maps
Secondary: Yelp
Tertiary: State dental association directories (for email enrichment if practice site is thin)

C) Metro list + search queries (repeatable pulls)
Daily metro rotation: pick 3–5 metros/day.
Suggested starting metros (rotate): New York, Los Angeles, Chicago, Dallas, Houston, Phoenix, Philadelphia, Atlanta, Miami, Seattle, Denver, Boston, San Diego, San Jose, Austin, Charlotte, Orlando, Tampa, Nashville, Indianapolis, Columbus, Minneapolis, Detroit, St. Louis, Pittsburgh, Portland, Sacramento, Las Vegas, Kansas City.
Add Canada if desired: Toronto, Vancouver, Calgary, Montreal, Ottawa.

Google Maps queries (copy/paste)
1) “dentist near me” + set map to metro
2) “orthodontist” + metro
3) “cosmetic dentist” + metro
4) “pediatric dentist” + metro
5) “dental clinic” + metro

Yelp queries
Use the same terms. Sort by location and “Open Now” occasionally to find actively managed listings.

D) Lead list schema (minimum viable + enrichment fields)
Create a sheet with these columns (in order):
1. Lead ID (auto; e.g., DENT-0001)
2. Business Name
3. Specialty (Dental / Ortho / Pediatric / Cosmetic)
4. Locations Count (1 / 2–5 / unknown)
5. Street Address
6. City
7. State/Province
8. ZIP/Postal
9. Country
10. Main Phone
11. Website URL
12. Google Maps URL
13. Yelp URL (if used)
14. Decision Maker Name (Doctor/Owner)
15. Decision Maker Title (DDS/Owner/Partner)
16. Decision Maker Email
17. Office Manager Name
18. Office Manager Email
19. Contact Page URL
20. Appointment/Booking URL (request appointment / book online)
21. Scheduling Software Hint (Zocdoc, NexHealth, Solutionreach, LocalMed, unknown)
22. Notes (e.g., “accepting new patients”, “has waitlist form”)
23. Lead Source (GMaps/Yelp/Directory)
24. Added Date
25. Status/Stage (dropdown; see CRM stages below)
26. Next Step Date
27. Last Touch Date
28. Touch Count
29. Reply Status (No reply / Interested / Not now / Wrong contact / Unsubscribe)
30. Outcome (Won/Lost)

E) Email/phone enrichment rules (fast + accurate)
Goal: get at least one valid email whenever possible; prefer office manager for ops pain.

Step 1: Practice website
- Check header/footer for email.
- Check Contact page.
- Check “Meet the Team”, “Our Team”, “Staff”, “About”.

Step 2: Pattern-based guess (only if domain is clear)
Common formats:
- firstname@domain.com
- firstinitiallastname@domain.com
- frontdesk@domain.com
- office@domain.com
- info@domain.com
- scheduling@domain.com
When guessing, only do so if you can verify later (via a free verifier or by sending a first email with low volume and monitoring bounces).

Step 3: Google “site:” search
Search:
- site:practicewebsite.com email
- site:practicewebsite.com “@practicewebsite.com”
- “Practice Name” office manager email

Step 4: Directory backfill
If the state association directory lists a practice email, add it with Source=Directory.

QA rules
- Phone must be present.
- Website must be present OR Google Maps URL must be present.
- If email is missing, still keep the lead but mark “Email Missing = Yes” in Notes and prioritize for call/SMS-first outreach.
- Normalize names (First Last) and titles.

F) CRM pipeline (Google Sheets-friendly)
Stages (dropdown values)
1) New (unworked)
2) Enriched (has phone + website + at least 1 contact path)
3) Contacted – Email 1
4) Contacted – Follow-up
5) Engaged (positive reply / asked question)
6) Demo Booked
7) Trial/Onboarding
8) Won (paying)
9) Lost
10) Do Not Contact

Required fields per stage
- Enriched: Phone + Website/Maps URL
- Contacted: Last Touch Date + Touch Count
- Demo Booked: Meeting date/time + contact confirmed
- Won: Plan/price + start date + notes on integration

Activity logging (simple)
In the lead row keep Last Touch Date + Touch Count. In a separate “Activity Log” tab capture:
Date | Lead ID | Channel (Email/SMS/Call/Upwork) | Template used | Outcome | Next step date.

G) 14-day outreach cadence (ties to stage changes)
Core principle: short, respectful, value-led, with a single CTA: “Should I send the 2-minute breakdown?” or “Open to a quick 10-min demo?”

Day 1 (Email 1) → Stage: Contacted – Email 1
- Use Owner/Doctor or Office Manager variant. Include legitimacy URL and contact email in signature.

Day 3 (Email 2) → Stage: Contacted – Follow-up
- One line + new angle: “two-way confirmations + auto-reschedule + waitlist fill.”

Day 5 (Call attempt #1, optional) → Stay in Follow-up
- If answered: ask who handles appointment reminders/no-shows.
- If voicemail: 20 seconds max; reference “reducing no-shows” and that you emailed.

Day 7 (Email 3) → Stage: Contacted – Follow-up
- Mini case math: “If you miss 3 hygiene appts/week at $150…” (keep generic, not fake claims).

Day 10 (SMS or call attempt #2, optional if number is a business line and compliant) → Follow-up
- “Is this the right person for appointment reminders/no-shows?”

Day 14 (Breakup email) → Move to Lost or Parked
- “Should I close the loop?” + offer to reconnect later.

Reply handling rules
- Interested: propose 2 time options + ask best number; move to Engaged then Demo Booked.
- Wrong person: ask for the correct contact; update fields.
- Not now: set Next Step Date for 30–60 days; keep in pipeline.
- Unsubscribe: move to Do Not Contact immediately.

H) Craigslist + FB Groups posting guardrails
- Post value-first: “free checklist / calculator” framing, not “buy my software.”
- Mention legitimacy URL once.
- Use contact email: agent_bob_replit+no-show-bot@agentmail.to
- Never paste large blocks repeatedly; vary copy between posts.

I) Upwork daily execution (quick revenue while outbound ramps)
Profile positioning (summary guidance)
- Niche: appointment-based businesses losing revenue to no-shows.
- Offer: audit + reminder workflow + confirmation/reschedule + basic reporting.

Saved searches (keywords)
1) “appointment reminders”
2) “no show”
3) “sms scheduling”
4) “medical admin” / “dental admin”
5) “appointment setting” (filter for small businesses)

Daily routine (30–45 minutes)
- Apply to 3 posts/day maximum (high relevance only).
- Use a short proposal that asks 2 questions: current no-show rate? current reminder process?
- Link legitimacy URL if allowed; otherwise mention you can share a demo link on request.

J) Daily quota plan (what to do each day)
- 80–150 new leads added/day (3–5 metros).
- Minimum enrichment threshold: phone + website/maps.
- Contact 30–60/day (start lower if inbox is cold; scale carefully).
- Log everything in the Activity Log tab.

If this pipeline runs 20 business days/month at 100 leads/day, it yields ~2,000 leads/month. Even a 1–2% meeting rate supports 20–40 demos/month, which can support the 20–25 location close target if the product delivers.
