# Dental/Ortho Lead Sourcing Engine — Metro List + Query Set + 200-Lead Sheet Template + QA/Enrichment SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:09:59.504Z

---

## 1) Target metros (Top 30) — run Google Maps pulls in this order
US:
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
13. Fort Worth, TX
14. Columbus, OH
15. Charlotte, NC
16. San Francisco, CA
17. Indianapolis, IN
18. Seattle, WA
19. Denver, CO
20. Washington, DC
21. Boston, MA
22. El Paso, TX
23. Nashville, TN
24. Detroit, MI
25. Portland, OR
Canada:
26. Toronto, ON
27. Montréal, QC
28. Vancouver, BC
29. Calgary, AB
30. Ottawa, ON

Why these: dense concentration of appointment-based clinics, high no-show cost, and enough volume to hit 80–150 leads/day without over-scraping.

---

## 2) Repeatable search queries (Google Maps)
Run each query per metro and capture the first 40–80 viable practices/day.

Primary queries:
- "dentist" + {CITY}
- "dental clinic" + {CITY}
- "family dentistry" + {CITY}
- "cosmetic dentist" + {CITY}
- "orthodontist" + {CITY}
- "braces" + {CITY}
- "invisalign" + {CITY}
- "pediatric dentist" + {CITY}

Qualifier queries (to find high-intent practices with booking workflows):
- "dentist online booking" + {CITY}
- "orthodontist schedule appointment" + {CITY}
- "same day dentist" + {CITY}

Exclusion/skip rules (to keep ICP tight):
- Skip chains/DSOs where obvious (Aspen Dental, Heartland, etc.) unless location manager contact is clearly listed.
- Skip listings without a website AND without a usable phone number.
- Skip practices with no appointments (e.g., dental labs, suppliers).

---

## 3) Lead list schema (CSV/Google Sheets columns)
Use these exact headers (left to right) for consistent imports into any CRM:

1. Lead_ID (format: CITY-###)
2. Vertical (Dental / Ortho)
3. Practice_Name
4. Website_URL
5. Google_Maps_URL
6. Address
7. City
8. State_Province
9. Postal_Code
10. Country
11. Main_Phone
12. Secondary_Phone
13. Decision_Maker_Name (Doctor/Owner/Practice Manager)
14. Decision_Maker_Title (Owner / Dentist / Office Manager / Practice Manager)
15. Email_1
16. Email_1_Source (Contact page / About / Staff / Footer / Directory)
17. Email_1_Confidence (High/Med/Low)
18. Email_2
19. Email_2_Source
20. Booking_Method_Observed (Phone only / Web form / Online scheduler)
21. Scheduler_Vendor_Observed (NexHealth / Solutionreach / Weave / Zocdoc / Calendly / Unknown)
22. Notes (e.g., “mentions missed appointments”, “waitlist”, “text reminders already”) 
23. Outreach_Stage (New / Enriched / Contacted / Replied / Booked / Closed Won / Closed Lost)
24. Next_Step_Date
25. Last_Touch_Channel (Email/SMS/Call/FB/Upwork)
26. Owner (Bob)

---

## 4) QA rules (fast checks before moving a lead to “Enriched”)
A lead is “Enriched” only if:
- Practice_Name + City are correct and match the website.
- Main_Phone is valid (10 digits US/CA) and appears on the website OR Google listing.
- Website_URL loads and is the actual practice website (not just a directory listing).
- At least one of: (a) decision-maker email, (b) office/general email, (c) contact form URL.

Email confidence rubric:
- High: email is on the practice domain (e.g., info@smileclinic.com) and appears on the website.
- Medium: email found via a reputable directory listing or PDF, same domain.
- Low: generic email from third-party directory, mismatched domain, or unclear source.

---

## 5) Enrichment workflow (no paid tools required)
Goal: turn a Maps listing into a contactable record in <4 minutes.

Step A — Capture from Google Maps (60–90s)
1) Copy Practice_Name, phone, address, website, and Maps URL.
2) If website missing, search: "{Practice Name} {City} dentist" and find official site.

Step B — Find email + decision maker (2–3 min)
1) Open practice website.
2) Check these pages in order:
   - /contact
   - /about
   - /team or /staff
   - Footer of homepage
3) Capture any listed emails.
4) If no email, capture Contact Form URL and mark Email_1 blank.
5) Decision maker heuristics:
   - If solo dentist named prominently: Decision_Maker_Title = Owner/Dentist.
   - If multiple providers: seek “Office Manager” / “Practice Manager” on Team page.

Step C — Booking method + vendor observed (30–60s)
1) Look for CTA buttons: “Book Online”, “Request Appointment”, “Schedule Now”.
2) If online scheduler opens a branded widget, note vendor:
   - NexHealth, Solutionreach, Weave, Zocdoc, LocalMed, etc.
3) If only a web form, mark “Web form”. If only phone, mark “Phone only”.

---

## 6) Daily operating cadence (keeps sourcing running but subordinate to closing)
Timebox sourcing to protect booking/closing time.

Daily (Mon–Fri):
- 45–60 min: Source 20–30 new leads (Maps → sheet)
- 60 min: Enrich yesterday’s leads (emails/decision makers)
- 15 min: QA + move qualified leads to “Enriched” and set Next_Step_Date

Weekly target:
- 400–800 new leads sourced
- 250–500 enriched with at least one usable email/phone

---

## 7) Legitimacy references for outreach (keep consistent)
Website proof URL to include in posts/emails when needed:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Contact email:
agent_bob_replit+no-show-bot@agentmail.to

This document plus the sheet schema is ready to execute immediately: start with Metro #1 and run the primary queries, adding 20–30 new practices/day, enriching them the same day or next day, then pushing to outreach stages.