# Daily Lead Pipeline Pack (Dental/Ortho) — Metro Targets, Search Queries, Lead/CRM Schema, 14-Day Cadence, Upwork Setup

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:01:08.038Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL (include in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Contact email (include in outreach): agent_bob_replit+no-show-bot@agentmail.to

A) PRIORITIZED METRO LIST (TOP 30)
Goal: Pull 30–60 qualified practices/day by rotating metros; focus on dense metros with high practice counts.
US: New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; Nashville TN; Detroit MI; Oklahoma City OK; Portland OR; Las Vegas NV.
Canada: Toronto ON; Vancouver BC; Montreal QC; Calgary AB.

B) REPEATABLE SEARCH QUERIES (GOOGLE MAPS + YELP)
Use these exact queries per metro; collect results pages until diminishing returns.
Google Maps queries:
1) “dentist near <CITY>”
2) “family dentistry <CITY>”
3) “cosmetic dentist <CITY>”
4) “orthodontist <CITY>”
5) “pediatric dentist <CITY>”
6) “dental implant <CITY>”
7) “invisalign provider <CITY>”
8) “dental clinic <CITY>”
Yelp queries:
1) Category: Dentists + City filter
2) Category: Orthodontists + City filter
3) Keyword: “Invisalign” + Dentists + City
Filtering rules (keep list tight):
- Include: 1–5 locations; has phone; has website or booking link; appears to take appointments (not labs).
- Exclude: corporate chains with >10 locations, emergency-only listings with no scheduling, dentists with no site/contact route.

C) LEAD LIST TEMPLATE (CSV/GOOGLE SHEETS COLUMNS)
Recommended columns (copy/paste into Sheets header row):
1 Lead_ID (auto)
2 Date_Added
3 Source (GMaps/Yelp/Directory)
4 Metro
5 Business_Name
6 Specialty (Dentist/Ortho/Pediatric/Cosmetic)
7 Location_Count (1–5 / unknown)
8 Address
9 City
10 State_Prov
11 Zip
12 Phone
13 Website_URL
14 Booking_URL (if visible)
15 Practice_Email (front desk)
16 Decision_Maker_Name (Dr/Owner/Office Manager)
17 Decision_Maker_Title (Owner/Doctor/Office Manager/Practice Manager)
18 Decision_Maker_Email
19 Contact_Page_URL
20 Notes (hours, languages, “accepts new patients”, etc.)
21 Scheduling_Software_Clue (e.g., “NexHealth”, “Solutionreach”, “Weave”, “Zocdoc”, “LocalMed”, “Doctible”, “Yapi”, “RevenueWell”, “PracticeMojo”, “Dentrix”, “OpenDental”, “unknown”)
22 Last_Touch_Channel
23 Last_Touch_Date
24 Next_Step_Date
25 CRM_Stage (dropdown)

QA + enrichment heuristics (fast, good-enough):
- If no email on listing: open website → Contact page → footer → look for “info@/hello@/appointments@/office@”.
- If multiple emails: prioritize “appointments@”, “schedule@”, “frontdesk@”, “office@”.
- Find decision-maker email by:
  1) Team/About page for Office Manager/Practice Manager names;
  2) Patterns in site emails (e.g., firstname@domain);
  3) If only a form exists, capture Practice_Email as “contact form only” and rely on phone/SMS first.
- Always confirm phone is a real scheduling line (not a corporate hotline).

D) CRM PIPELINE (SHEETS) — STAGES + REQUIRED FIELDS
Stages (dropdown values):
1 New
2 Researched (website checked)
3 Attempted Contact
4 Connected (replied/picked up)
5 Qualified (appointments + no-show pain confirmed)
6 Demo Scheduled
7 Demo Completed
8 Trial/Setup
9 Paying
10 Not Now (follow-up)
11 Dead

Required fields by stage:
- Researched+: Phone + Website_URL
- Attempted Contact+: Last_Touch_Channel + Last_Touch_Date + Next_Step_Date
- Qualified+: Decision_Maker_Title + Notes (pain + current reminder process)
- Demo Scheduled+: Meeting_DateTime + Attendee + Confirmation status

E) 14-DAY OUTREACH CADENCE (MAPS TO CRM)
CTA for all messages: “Can I show you a 10-min demo and estimate recovered revenue per month for your location?”
Include legitimacy URL + contact email in signature. Booking link placeholder: <BOOKING_LINK> (insert once chosen).

Day 0 (Stage: Attempted Contact)
- Email 1 (intro) to Decision_Maker_Email or Practice_Email
- Optional: SMS to practice phone ONLY if it’s clearly a mobile/textable line (otherwise call/VM)

Day 2
- Email 2 (case-style value, ask who handles scheduling/no-shows)
- Call + voicemail script (20 seconds): “Hi, this is Bob—quick question about reducing appointment no-shows with two-way confirmations. If you can point me to whoever handles scheduling/no-show policy, I’ll send a 1-minute summary. Bob, agent_bob_replit+no-show-bot@agentmail.to.”

Day 4
- Email 3 (problem/solution + quantified angle: ‘recover X appts/month’)

Day 6
- Email 4 (breakup-lite): “Should I close the loop or is no-show reduction a priority this quarter?”

Day 9
- Re-touch via alternate channel: call again OR send short SMS if appropriate

Day 14 (Stage moves to Not Now or Dead)
- Email 5 (final): offer a free no-show rate benchmark + ask to re-engage later

Operational rule: every touch sets Next_Step_Date; after Demo Scheduled, stop prospecting touches and move to Demo workflow.

F) CRAIGSLIST + FB GROUP POSTING (RULES, NOT FULL COPY)
Posting rules to avoid bans:
- Don’t post identical text in multiple metros same day; rotate headline and first 2 lines.
- Use value-led language (“free no-show audit / revenue recovery estimate”), not “SMS blasting”.
- Always include legitimacy URL + contact email; avoid link shorteners.
- If group rules disallow promos, ask admin first; otherwise post as a question + offer to DM the audit.

G) UPWORK FREE-TIER SETUP RUNBOOK
Profile positioning (paste into Upwork overview):
“I help appointment-based businesses reduce no-shows using two-way SMS confirmations, smart reminders, and automated rescheduling workflows. Outcome: fewer empty chair slots and a clear estimate of recovered revenue per location. I can set up messaging templates, confirmation flows, and a simple tracking dashboard, and I’ll tailor it to your booking process.

If you want to validate quickly, I’ll start with a free 10-minute ‘no-show leak’ audit and a draft reminder/confirmation script you can use immediately.

Legitimacy/demo: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to”

Portfolio item text (single item is enough to start):
“Appointment No-Show Reducer — two-way confirmations + reschedule automation. Includes simple analytics to quantify recovered revenue per location.”

3 saved search definitions (create searches for daily proposals):
1) Keywords: “appointment setting”, “scheduling”, “admin assistant”, “receptionist”, “medical office”
2) Keywords: “sms reminders”, “no show”, “calendar management”, “patient scheduling”, “front desk”
3) Keywords: “chiropractic”, “dental”, “med spa”, “clinic”, “practice manager” + “automation”

Daily Upwork operating target: 3 proposals/day. Prioritize posts mentioning missed appointments, rescheduling, or inbound calls.

H) DAILY LEAD QUOTA PLAN (TO HIT 400–800/MONTH FAST)
- 5 days/week: 40 leads/day = 200/week
- 4 weeks: 800 leads
Workflow timing target per lead (3–5 min): listing capture (1 min) + website email check (2–3 min) + notes/software clue (1 min).

If you want, I can convert this pack into an actual Google Sheet layout (tabs + dropdowns) and begin filling the first 150–200 real leads next cycle.