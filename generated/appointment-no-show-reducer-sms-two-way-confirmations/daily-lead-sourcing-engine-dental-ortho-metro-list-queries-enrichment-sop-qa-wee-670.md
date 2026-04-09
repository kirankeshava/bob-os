# Daily Lead Sourcing Engine (Dental/Ortho) — Metro List, Queries, Enrichment SOP, QA + Weekly Output Plan

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:22:50.596Z

---

Objective: produce a steady, qualified lead pipeline for Appointment No-Show Reducer (SMS + two-way confirmations) sized to support closing 20–25 locations in 30 days. Target ICP: independent dental + orthodontic practices (1–5 locations) in US/Canada that schedule appointments (high no-show sensitivity). Use this legitimacy URL and contact email in any outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2 | agent_bob_replit+no-show-bot@agentmail.to.

A) Top metros to pull (rotate weekly)
US: New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; San Francisco CA; Columbus OH; Fort Worth TX; Charlotte NC; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; Nashville TN; El Paso TX; Detroit MI.
Canada: Toronto ON; Montreal QC; Vancouver BC; Calgary AB; Edmonton AB; Ottawa ON.

B) Repeatable search queries (Google Maps + Yelp)
Google Maps queries (copy/paste):
1) “dentist {city}”
2) “family dentistry {city}”
3) “cosmetic dentist {city}”
4) “orthodontist {city}”
5) “pediatric dentist {city}”
Filters/selection rules: prioritize clinics with (i) 10+ reviews OR visible busy hours, (ii) phone number present, (iii) website present, (iv) single location or small group (avoid large DSOs unless local manager email is obvious). Exclude: hospital dental departments, academic clinics, clearly corporate multi-state chains.
Yelp queries:
- Category: Dentists / Orthodontists; Location: {city}; Sort by rating or most reviewed; open business pages and capture phone + website.

C) Lead list output format (CSV/Sheets headers)
Required columns (minimum viable for outreach):
- Practice Name
- Specialty (Dental/Ortho)
- City
- State/Province
- Country
- Phone
- Website URL
- Google Maps URL
- Source (GMaps/Yelp/Directory)
- Decision Maker Name (Owner/Doctor/Office Manager) (if found)
- Decision Maker Title (Owner/Doctor/Office Manager/Practice Manager)
- Email (best available)
- Secondary Email (optional)
- Contact Page URL
- Notes (booking link present? online scheduling tool? language?)
- Lead Status (dropdown: New, Enriched, Ready-to-Contact, Contacted, Replied, Booked, Won, Lost)
- Next Step Date

D) Manual enrichment mini-SOP (find owner/manager email fast)
1) Open website → look for top nav: “Contact”, “About”, “Team”, “Meet the Doctor”, “New Patients”, “Request Appointment”.
2) Check footer for direct emails. Common patterns: info@, office@, hello@, appointments@.
3) If no email displayed: check “Privacy Policy” and “Terms” pages (often includes webmaster/contact emails).
4) Check domain in Google: search `"@domain.com" dentist "contact"` or `site:domain.com email`.
5) If still missing: use directory cross-check (DentalTown listings, local chamber of commerce, state dental association member directory where available). Capture any staff email shown.
6) Decision-maker identification: on “Team/Doctors” page, capture owner/lead dentist name; if email not available, still keep name for personalization and use general inbox email.
7) Phone QA: confirm phone number matches Google listing and website.

E) QA rules (to keep bounce + junk low)
- Do not add leads without a phone number.
- Prefer leads with a website; if none, keep only if Google listing is robust (hours + reviews) and phone is present.
- Emails: accept role-based (info@/office@) as valid; mark as “Role-based” in Notes. If a personal email is found, store it as primary.
- Deduplicate by website domain + phone.
- If the practice is clearly a multi-location chain, only keep if local location page shows direct local contact info.

F) Daily quota + weekly output plan
- Daily target per operator: 80–150 new leads added as “New”, then enrich 40–80 to “Enriched/Ready-to-Contact”.
- Week-1 seed list: 150–200 leads across 6–8 metros (mix dental + ortho) to start outreach immediately.
- Scaling: 400–800 leads/week by running 2 operators OR one operator 5 days/week at 100–150/day.

G) CRM stage rules (operational)
- New: listing captured, minimal fields complete.
- Enriched: website checked, contact page URL added, email added (role-based acceptable).
- Ready-to-Contact: phone + email present, city/state correct, notes include “online booking yes/no”.
- Contacted: first email/SMS sent; set Next Step Date = +2 business days.

H) Upwork execution plan (free)
- Profile positioning (headline): “Reduce appointment no-shows (SMS reminders + 2-way confirmations) for dental/ortho clinics.”
- Proof/legitimacy in proposals: include website URL above and contact email agent_bob_replit+no-show-bot@agentmail.to.
- Saved searches (3):
  1) Keywords: “appointment reminders”, “SMS reminders”, “no show”, “reduce no-shows”
  2) Keywords: “dental office admin”, “medical scheduling”, “receptionist”, “appointment setting”
  3) Keywords: “Twilio”, “GoHighLevel”, “CRM automation”, “clinic automation”
- Daily cadence: 3 targeted proposals/day; prioritize posts mentioning missed appointments, reschedules, or front-desk overload.

This engine keeps distribution stocked while sales runs: every day should produce new “Ready-to-Contact” leads and assign next steps immediately so outbound never stalls.