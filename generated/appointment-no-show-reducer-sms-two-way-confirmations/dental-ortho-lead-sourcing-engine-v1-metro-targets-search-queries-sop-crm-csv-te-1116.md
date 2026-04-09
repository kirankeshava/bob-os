# Dental/Ortho Lead Sourcing Engine v1 (Metro Targets + Search Queries + SOP + CRM CSV Template + Upwork Execution Loop)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:07:32.236Z

---

Goal: generate a steady, qualified pipeline for Appointment No-Show Reducer (SMS + two-way confirmations) to close 20–25 locations in 30 days. Vertical focus: independent dental + orthodontic practices (1–5 locations) in US/Canada.

A) Priority metro list (30)
US: New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; Austin TX; San Jose CA; Jacksonville FL; San Francisco CA; Columbus OH; Charlotte NC; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Nashville TN; Boston MA; Detroit MI; Atlanta GA; Tampa FL.
Canada: Toronto ON; Montreal QC; Vancouver BC; Calgary AB; Edmonton AB; Ottawa ON.

B) Repeatable search query set (Google Maps + Yelp)
Use city + query variants. Run each variant, open results, capture fields, then dedupe.
Core queries (rotate):
1) “dentist near me” (then filter by city via map move)
2) “dental clinic” + {city}
3) “family dentistry” + {city}
4) “cosmetic dentist” + {city}
5) “orthodontist” + {city}
6) “braces” + {city}
7) “pediatric dentist” + {city}
8) “dental implants” + {city}
9) “emergency dentist” + {city}
10) “invisalign provider” + {city}
Yelp equivalents: “Dentists”, “Orthodontists” categories + city.

C) Lead schema (CRM-ready CSV columns)
Required columns:
- Lead_ID (auto)
- Business_Name
- Practice_Type (Dental / Ortho)
- Location_Count_Est (1 / 2–5 / 6+)
- Address
- City
- State_Prov
- Postal_Code
- Country
- Phone
- Website
- Google_Maps_URL
- Yelp_URL
- Primary_Contact_Name (if found)
- Primary_Contact_Role (Owner/DDS/Orthodontist/Office Manager/Practice Manager)
- Primary_Contact_Email
- Secondary_Contact_Email
- Contact_Page_URL
- Booking_Link_Observed (Yes/No + URL)
- Software_Clues (e.g., NexHealth, Solutionreach, Weave, Podium, Doctible, Zocdoc—if visible)
- Outreach_Stage (dropdown: New, Researched, Emailed-1, Emailed-2, Emailed-3, Called, SMS-Sent, Replied, Booked, No-Fit, Closed-Won, Closed-Lost)
- Next_Step
- Next_Step_Due_Date
- Notes

D) Decision-maker email capture rules (fast heuristics)
1) Always capture phone + website first (minimum viable lead).
2) On website, check: Contact, About, Team/Staff, “Meet the Doctor”, “Our Team”, Footer.
3) Look for direct emails. If none, use pattern inference only when domain matches (e.g., drsmith@domain.com; info@domain.com; office@domain.com; hello@domain.com; appointments@domain.com).
4) Prioritize Office Manager/Practice Manager emails if listed; otherwise use front desk/general inbox.
5) Record Contact_Page_URL and any web form existence; if only form exists, still log lead as phone-first and mark email as “FORM_ONLY”.
6) If multiple locations, treat each location as separate lead row only if location has distinct phone.

E) QA + dedupe rules (non-negotiable)
- Deduplicate by (Phone) OR (Website domain) OR (Business_Name + City).
- Validate phone: must be a real local number; avoid call-tracking numbers if clearly marked (note if tracking).
- Website must load; if broken, mark Website as “NONE” and keep Google Maps URL.
- Email quality tiers:
  Tier A: Named contact + direct email
  Tier B: role inbox on domain (info@/office@)
  Tier C: only contact form
Target mix goal: >=30% Tier A/B by end of week 1.

F) Daily production quotas (to hit 400–800/week)
- Per day: 2 metros x (5 query variants each) = ~80–150 new leads/day depending on density.
- Timebox: 60–90 minutes per metro including website checks.
- Weekly: 5 days x 100 leads/day = 500 leads/week (middle of target).

G) Execution loop (load into CRM + assign next step)
1) New leads go to stage “New”.
2) After website/email research: stage “Researched”, Next_Step = “Send Email 1 (Owner)” or “Send Email 1 (Office Manager)”, Due = today.
3) If only phone available: Next_Step = “Call front desk + ask who manages scheduling/no-shows + best email”, Due = today.

H) Channel references for legitimacy (include in outreach where allowed)
Legitimacy URL to share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Contact email: agent_bob_replit+no-show-bot@agentmail.to

I) Upwork execution loop (free-tier, 3 proposals/day)
Profile angle: “Reduce appointment no-shows with SMS reminders + two-way confirmations + reschedule automation (done-for-you setup).”
Saved search definitions:
1) Keywords: “appointment reminders”, “SMS reminders”, “no show”, “calendar management”, “patient scheduling”, “medical receptionist”, “dental admin”.
2) Categories: Admin Support, Customer Support, Sales (appointment setting) + healthcare.
3) Filter: US/Canada preferred; small-budget acceptable for first quick wins.
Daily routine:
- 15 min: scan new posts; shortlist 5.
- Submit 3 highly targeted proposals referencing recovered revenue angle and offering a fast audit.
- CTA: ask for their monthly appointment volume + current no-show rate; share legitimacy URL and offer a 15-min call.

J) Craigslist + FB Groups posting compliance notes (to avoid bans)
- Always value-first: offer a “no-show audit” + checklist, not a hard sell.
- Avoid links in first post if group rules prohibit; otherwise include legitimacy URL.
- Use local posting schedule (1 metro/day) and rotate headlines.
- Never post identical text repeatedly; rotate 3–5 variants.

This playbook is designed so the next operational step is straightforward: compile the first 150–200 leads using the metro/query loop, fill the CSV columns, dedupe, then load into the CRM and begin the day-by-day outreach cadence using the existing email/SMS scripts (all referencing the legitimacy URL and contact email above).