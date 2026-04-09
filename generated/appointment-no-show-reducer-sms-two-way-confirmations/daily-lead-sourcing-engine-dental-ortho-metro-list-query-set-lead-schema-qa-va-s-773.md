# Daily Lead Sourcing Engine (Dental/Ortho) — Metro List, Query Set, Lead Schema + QA, VA SOP, CRM/Cadence Rules

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T10:19:21.705Z

---

Objective
Build a daily lead pipeline that consistently produces 80–150 qualified independent dental/orthodontic practice leads/day (scaling to 400–800/week) with phone + a decision-maker contact path (direct email when available; otherwise office manager/front desk email + contact-form URL). Output must drop into a CRM sheet where the next action is obvious so outreach/closing stays the priority.

1) Prioritized Metro List (Top 30)
US:
1. New York, NY  2. Los Angeles, CA  3. Chicago, IL  4. Houston, TX  5. Phoenix, AZ
6. Philadelphia, PA  7. San Antonio, TX  8. San Diego, CA  9. Dallas, TX  10. San Jose, CA
11. Austin, TX  12. Jacksonville, FL  13. Fort Worth, TX  14. Columbus, OH  15. Charlotte, NC
16. San Francisco, CA  17. Indianapolis, IN  18. Seattle, WA  19. Denver, CO  20. Washington, DC
21. Boston, MA  22. Nashville, TN  23. Las Vegas, NV  24. Portland, OR  25. Miami, FL
Canada:
26. Toronto, ON  27. Montréal, QC  28. Vancouver, BC  29. Calgary, AB  30. Ottawa, ON

Why these: high clinic density + higher no-show risk (busy schedules) + enough competition that “recovered revenue” framing lands.

2) Standard Query Set (Copy/Paste)
Use Google Maps first; use Yelp second for backfill.
For each metro, run these searches:
A) Primary
- “dentist {CITY, STATE}”
- “dental clinic {CITY, STATE}”
- “family dentist {CITY, STATE}”
B) Higher-ticket / higher no-show niches
- “cosmetic dentist {CITY, STATE}”
- “dental implants {CITY, STATE}”
- “pediatric dentist {CITY, STATE}”
C) Ortho
- “orthodontist {CITY, STATE}”
- “braces {CITY, STATE}”
D) Scheduling-signal modifiers (use when you need better-fit leads)
- “dentist online booking {CITY, STATE}”
- “dentist same day appointments {CITY, STATE}”

Filters (manual):
- Prefer 1–5 locations (independent groups). Exclude obvious DSOs/corporate chains.
- Prefer listings with active phone and website.
- Prefer practices that visibly take appointments (most do) and show “Request appointment” / online booking.

3) Lead List Schema (CSV/Sheets Columns)
Required columns (must be filled):
- Lead_ID (YYYYMMDD-###)
- Business_Name
- Niche (Dental / Ortho)
- City
- State/Prov
- Country
- Phone
- Website_URL
- Source (Google Maps / Yelp / Directory)
- Google_Maps_URL (or Yelp URL)
- Contact_Email (can be blank only if Contact_Form_URL present)
- Contact_Form_URL (required if email missing)
- Contact_Name (if found)
- Contact_Role (Owner/Doctor, Office Manager, Front Desk, Admin)
- Scheduling_Signal (Online booking Y/N; “Request appt” Y/N; software if visible)
- Notes (1 line: anything relevant)

CRM columns (sales ops):
- Stage (dropdown)
- Next_Action (auto rule)
- Next_Action_Date
- Last_Touch_Date
- Touch_Count
- Owner (Bob)

4) QA Rules (Non-Negotiable)
- Phone must be the primary clinic line (not a call-tracking reseller when avoidable).
- Website must load and match practice name (avoid mismatched listings).
- Must have at least one “contact path”: (a) direct email OR (b) contact form URL.
- Exclude:
  - Corporate DSOs (multiple states, corporate careers pages, heavy templated sites)
  - Emergency-only dentists (unless also general dentistry with appointments)
  - Practices without a working phone
- Email validity heuristics (before using any paid verifier):
  - Prefer exact emails on “Contact” page.
  - If staff list exists, capture office manager/admin if named.
  - If only a form exists, record the form URL and a generic email if present.

5) Enrichment Heuristics (Free-first)
On the practice website, check in this order:
1) Footer: often lists info@, office@, appointments@.
2) Contact page: may list frontdesk@, scheduling@.
3) Team/Staff page: look for “Office Manager”, “Practice Manager”.
4) Privacy policy/Terms: sometimes includes a support email.
5) If none: capture Contact_Form_URL and the best named person (Doctor/Owner name) for personalization.

6) VA/Agent Daily SOP (80–150 leads/day)
Timebox: 4–6 hours per day per person.

Step 1 — Pull 40–60 leads from Google Maps (2 hours)
- Pick 1 metro from the list.
- Run queries A–D above.
- Open listing → capture Business_Name, Phone, Website_URL, Maps URL.
- Quick screen for independence (avoid obvious chains).
- Add to sheet immediately.

Step 2 — Website pass + contact path (2–3 hours)
- Open Website_URL.
- Find Contact_Email OR Contact_Form_URL.
- Capture Contact_Name/Role if shown.
- Note Scheduling_Signal (online booking widget; request appointment; vendor mention).

Step 3 — QA + dedupe (30 minutes)
- Dedupe by Website_URL or Phone.
- Ensure every lead has Phone + (Email or Form URL).
- Random-check 10 leads for accuracy.

Step 4 — Handoff to outreach (15 minutes)
- Import into CRM sheet.
- Stage = “New – Not Touched”.
- Next_Action_Date = today.

7) CRM Pipeline Stages + Cadence Rules (simple and execution-first)
Stages (dropdown):
1. New – Not Touched
2. Touched – Awaiting Reply
3. Engaged – Needs Info
4. Demo Booked
5. Trial/Setup Started
6. Won – Paying Location
7. Lost – Not a Fit
8. Nurture – Later

Next-action rules (what happens immediately):
- New → Next_Action = “Call front desk + send Email #1” (same day)
- Touched/no reply after 2 days → “Email #2 + call attempt”
- After 5 days → “Email #3 + voicemail”
- After 9–12 days → “Breakup email + ask who handles scheduling/no-shows”
- Engaged → “Send 2-question qualifier + propose demo times”
- Demo Booked → “Send calendar confirmation + reminder 1 day prior”

Channel compliance note (templates reference legitimacy assets)
Any post/email should include:
- Website legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

This document is designed so sourcing can run in parallel while the closer focuses on demos and conversions; the output is immediately actionable without further cleanup.