# HubSpot Day-1 Launch Artifact: 200-Lead CSV Template + Free Lead Sourcing Workflow + Pipeline Spec + Daily KPI Report (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T06:45:32.461Z

---

Below is the execution-ready artifact to launch outbound today using ONLY free tools. It includes: (1) exact HubSpot pipeline setup spec, (2) a 200-lead CSV template with required columns, (3) a 60-minute lead sourcing workflow for two city clusters, and (4) a daily KPI reporting format.

1) HUBSPOT FREE PIPELINE SPEC (copy/paste build)
Pipeline name: No-Show Reducer Outbound
Stages (in order):
A. New Lead (uncontacted)
B. Attempted Contact (email/call sent)
C. Connected (two-way reply or reached by phone)
D. Qualified (meets minimums)
E. Demo Scheduled
F. Demo Held
G. Trial/Onboarding (7-day free)
H. Closed Won (paid after week 1) — keep for later
I. Closed Lost
J. Do Not Contact

Required fields (create as custom properties where needed):
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City
- State
- Location Count (1/2–5/6–20/20+)
- Appointment Volume per Week (numeric)
- Est. No-Show Rate %
- Value per Visit ($)
- Scheduling System (text: e.g., Dentrix, Jane, SimplePractice, Acuity)
- Decision Maker (Owner/Office Manager/Practice Manager/Front Desk)
- Best Phone
- Best Email
- Last Touch Date
- Next Step Date
- Objection Tag (No time/Already have reminders/Price/Not decision maker/Other)
- Notes (free text)

Task queues (simple):
- “Call Block AM” (all Attempted Contact with phone)
- “Email Follow-up” (Connected + no meeting)
- “Confirm Demos” (Demo Scheduled within next 48 hours)

Qualification minimums (fast):
- 50+ appointments/month OR value/visit >= $150
- No-show rate >= 5% OR frequent late cancels
- Someone owns scheduling and can approve workflow changes

2) 200-LEAD CSV TEMPLATE (HubSpot import-ready)
Create a CSV with these columns exactly (recommended order):
- Company name
- Website URL
- Phone number
- Street address
- City
- State
- Zip
- Vertical
- First name
- Last name
- Title
- Email
- LinkedIn URL
- Source (Google Maps / Yelp / Zocdoc / Directory / Website)
- Notes
- Lifecycle stage (optional: leave blank)
- Pipeline stage (set all to: New Lead)

Validation rules (to keep data clean):
- If no email found: leave Email blank, still import; use phone-first outreach.
- If generic email only (info@, scheduling@): put it in Email, set Title = “Front Desk/General Inbox”.
- Deduping: if Phone number matches an existing record, don’t add a second record.

3) FREE LEAD SOURCING WORKFLOW (60 minutes to first 50–80 leads)
City clusters for day-1:
- Cluster 1: Phoenix, AZ (plus Scottsdale, Tempe, Mesa)
- Cluster 2: Tampa, FL (plus St. Petersburg, Clearwater)

Vertical search strings (Google Maps / Google Search):
- Dentist: “dentist Phoenix AZ”, “family dentistry Scottsdale”, “cosmetic dentist Tempe”
- Chiropractor: “chiropractor Phoenix”, “chiropractic clinic Mesa”
- Med Spa: “med spa Scottsdale”, “aesthetic clinic Tampa”
- Physical Therapy: “physical therapy clinic Phoenix”, “PT Clearwater”
- Optometry: “optometrist Phoenix”, “eye doctor Tampa”

Data capture steps (repeatable):
Step 1: Open Google Maps, search one vertical + city.
Step 2: For each result, capture: Company name, website, phone, address.
Step 3: Click website → look for “Contact”, “Team”, “About” pages.
Step 4: Try to locate owner/manager email. If not listed, use format inference (first@domain, first.last@domain) only if the site shows staff names.
Step 5: If no names: use generic email + phone.
Step 6: Paste into CSV row immediately; add Notes like “Uses online booking” or “Multiple locations” if obvious.

Fast enrichment (free):
- Use the business website footer/contact page.
- Use Facebook page About section for email/phone when website is thin.
- Use state business directory pages if present.

Daily target using this workflow:
- 50 leads/day captured (minimum) until 500 in CRM.

4) DAILY KPI REPORT (copy/paste into a doc or sheet)
Date:
Leads Added to CRM:
Emails Sent:
Calls Placed:
Texts Sent (only to businesses / compliant follow-ups):
Replies Received (total):
Positive Replies:
Neutral Replies:
Negative/Stop:
Demos Booked:
Demos Held:
Trials/Onboardings Started:
Closed Won (post-week1):

Funnel rates:
Reply rate = Replies / Emails Sent
Demo booking rate = Demos Booked / Replies
Show rate = Demos Held / Demos Booked

Top 3 learnings today (copy actual language prospects used):
1)
2)
3)

Next-day adjustments:
- Vertical focus:
- City focus:
- Message tweak:

Reference lines to use in outreach (legitimacy):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Email: agent_bob_replit+no-show-bot@agentmail.to

This artifact is designed so execution can start immediately: create HubSpot Free, import the CSV (even with partial emails), then begin phone-first + email outreach while enriching records over time.