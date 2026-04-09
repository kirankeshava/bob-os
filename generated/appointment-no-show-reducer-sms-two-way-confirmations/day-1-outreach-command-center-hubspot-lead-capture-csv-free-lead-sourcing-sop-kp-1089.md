# Day-1 Outreach Command Center (HubSpot + Lead Capture CSV + Free Lead Sourcing SOP + KPI Tracking)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T12:29:24.711Z

---

Objective (30-day sprint): book 40 demos and close 25 locations for the Appointment No-Show Reducer (two-way SMS confirmations + instant reschedules + waitlist fill). Legitimacy URL to reference in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Business contact email for replies: agent_bob_replit+no-show-bot@agentmail.to.

1) HubSpot Pipeline (Free)
Stages (left-to-right):
- New Lead (not yet touched)
- Contacted (email/call/SMS sent)
- Replied (any response)
- Demo Booked (calendar invite set)
- Demo Held (completed)
- Closed Won (paid / committed)
- Closed Lost (not a fit / declined)
- Nurture / No Response (after 3+ touches, no reply)
Logging standard (fast): Every touch gets a dated note: “2026-04-09 EMAIL #1 sent – Subject X” or “CALL – VM left” or “TEXT – asked to confirm appt volume”. Next step always set (task due date).

2) Lead Capture / Import CSV Template
Create a CSV with these headers (exact):
- Company Name
- Website
- Main Phone
- City
- State
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry)
- Contact First Name
- Contact Last Name
- Contact Title (Owner/Practice Manager/Office Manager)
- Contact Email
- Source URL (Google Maps / directory link)
- Notes (hours, #locations, anything observed)
Formatting rules: one company per row; if no email, leave blank but keep phone + website; dedupe by website and phone before import.

3) Free Lead Sourcing SOP (200 leads = 2 clusters x 5 verticals x ~20 each)
Pick 2 city clusters (example: “Phoenix AZ metro” and “Tampa FL metro” or any two with dense clinics).
For each vertical, run Google queries and pull from Google Maps profiles + clinic websites:
- Dentist: “dentist {city} appointment”, “family dentistry {city}”, “cosmetic dentist {city}”
- Chiropractor: “chiropractor {city} online booking”, “chiropractic clinic {city}”
- Med spa: “med spa {city} book appointment”, “aesthetic clinic {city}”
- Physical therapy: “physical therapy {city} schedule”, “PT clinic {city} appointment”
- Optometry: “optometrist {city} book appointment”, “eye exam {city} appointment”
Data capture steps (per lead):
1) Open Google Maps listing → copy business name, phone, website.
2) Open website → look for “Contact”, “Team”, “About”, footer email, or booking page.
3) If no direct email, look for “office manager” or “practice manager” on staff page; otherwise capture generic email (info@/frontdesk@) if present.
4) Put the best-fit contact title in CSV: Owner / Practice Manager / Office Manager.

4) Day-1 Execution Schedule (repeat daily)
Email sends (50–100/day):
- Block A (morning): 25–40 new leads
- Block B (midday): 25–40 new leads
- Block C (late afternoon): 10–20 follow-ups
Rules: plain-text, minimal links (only include the legitimacy URL when asked or in P.S.), personalize first line with city/vertical.
Call/SMS (20–40/day):
- Call Block 1: 10–15 dials (late morning)
- Call Block 2: 10–15 dials (late afternoon)
Text: only where clearly business lines and local compliance norms allow; keep it short and value-based; stop immediately if asked.
Craigslist: 1–2 posts/week per city cluster (Services > Small Biz Ads). Route inbound to agent_bob_replit+no-show-bot@agentmail.to and log as New Inbound in HubSpot.
FB Groups: 5–10 value comments/posts weekly (no hard selling). Offer a no-show calculator + free audit.

5) Qualifying Questions (fast)
- Roughly how many appointments/week per location?
- Current no-show or late-cancel rate?
- Average value per visit?
- What scheduling system (Sheets, Calendly, Square, Jane, Practice Management software)?
- Who owns scheduling decisions (owner, office manager, marketing)?
Close criteria: if recovered revenue math > $500/mo/location and they have authority, push to demo + Stripe.

6) KPI Tracking (daily)
Record daily totals:
- New leads added
- Emails sent
- Calls placed
- Texts sent
- Replies
- Demos booked
- Demos held
- Closed won
- Closed lost
- Top objections + notes

7) Reply Routing + Legitimacy
All templates should include a simple reply path: “Reply here or email agent_bob_replit+no-show-bot@agentmail.to.” If legitimacy is questioned, share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2.

Operating rule: distribution first. Every day ends with (1) all touches logged, (2) next steps scheduled, (3) KPI row updated.