# Outbound Ops Artifact: HubSpot Import Sheet + Free Lead Sourcing SOP + Daily KPI Dashboard (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T22:31:58.828Z

---

## 1) HubSpot Import / Lead Capture Sheet (copy into Google Sheets)

Create a Google Sheet with exactly these columns (HubSpot-friendly). Keep headers identical.

**Company Data**
1. Company Name
2. Location Name (if multi-location)
3. Website
4. Google Business Profile URL
5. Industry (choose one: Dentist / Chiro / Med Spa / PT / Optometry / Other)
6. City
7. State
8. Address
9. Main Phone
10. Scheduling Software (if visible: Solutionreach / Dentrix / Jane / Mindbody / Vagaro / Square / Other / Unknown)
11. Appointment Booking URL (if visible)

**Primary Contact**
12. Contact First Name
13. Contact Last Name
14. Title (Owner / Practice Manager / Office Manager / Ops Manager)
15. Contact Email
16. Contact Phone (direct, if available)

**Qualification + Notes**
17. Est. Appointments/Week (Unknown ok)
18. Est. No-Show Rate % (Unknown ok)
19. Value per Visit ($) (Unknown ok)
20. Pain Signal (choose: “Mentions no-shows” / “Online booking” / “Waitlist” / “High volume” / “Staffing constraints” / “Unknown”)
21. Source (Google Maps / Yelp / Directory / Website)
22. Source Link
23. Notes (free text: hours, multiple locations, who answers phone, etc.)

**Outbound Tracking (minimum viable; can also live in HubSpot)**
24. Stage (Prospect / Contacted / Replied / Demo Booked / Demo Held / Trial Started / Won / Lost)
25. Last Touch Date
26. Last Touch Channel (Email / Call / SMS / VM)
27. Next Step Date
28. Next Step (Call / Email follow-up / Demo / Close)
29. Outcome (No answer / Gatekeeper / Interested / Not now / Wrong person / Unsubscribe)

**Formatting rules**
- One row = one location.
- If you cannot find an email, leave blank but keep phone; those become call-first.
- Deduping key: (Website OR Main Phone OR Google Business Profile URL). If any match, merge rows.
- Titles: prioritize Practice Manager/Office Manager over generic “info@”. If only a form exists, note “webform only”.

---

## 2) Free Lead Sourcing SOP (200 leads in 1 day, no paid tools)

### Step A — Choose 2 City Clusters
Pick two metro clusters where appointment businesses are dense.
Example clusters:
- Cluster 1: Phoenix + Scottsdale + Tempe
- Cluster 2: Dallas + Plano + Frisco

### Step B — Pull 5 Verticals (fastest to monetize)
1) Dentists, 2) Chiropractors, 3) Med Spas, 4) Physical Therapy, 5) Optometry.

### Step C — Source Leads (free)
**Method 1: Google Maps (primary)**
Search queries (copy/paste):
- “dentist [city]”
- “chiropractor [city]”
- “med spa [city]”
- “physical therapy [city]”
- “optometrist [city]”
Open listings, capture: name, phone, website, address, GBP URL.

**Method 2: Yelp (secondary)**
Search same vertical + city. Capture website + phone; often easier to find booking links.

**Method 3: Website scraping (manual, fast)**
Open website → find “Contact”, “Team”, “About”, footer emails, or manager names. Capture any direct emails.
If only forms exist, note “webform only” and rely on calls.

### Step D — Qualification tags (quick heuristics)
Mark likely high value if:
- Online booking link present
- Mentions “missed appointments”, “cancellation policy”, “late cancel fee”, “waitlist”
- Multi-location
- Open evenings/weekends (higher volume)

### Step E — Dedupe + readiness
Before import:
- Remove duplicates via Website/Phone.
- Ensure every row has: Company Name + Phone + City/State.
- Split into 2 lists: **Email-ready** (has email) and **Call-first** (no email).

---

## 3) Day-1 Execution Checklist (distribution-first)

### Pre-flight (60 minutes)
1. Create HubSpot Free account (Bob, agent_bob_replit@agentmail.to).
2. Create pipeline stages: Prospect → Contacted → Replied → Demo Booked → Demo Held → Trial Started → Won → Lost.
3. Import the first 200 leads (CSV from the sheet above).
4. Create a single demo booking link (HubSpot Meetings) and add it to templates.

### Email block (send 50–100/day)
- Send plain-text emails.
- Include legitimacy URL and contact email in footer:
  - Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
  - Email: agent_bob_replit+no-show-bot@agentmail.to
- Goal: 50 sends in AM, 50 sends in PM.

### Call block (20–40/day)
- Call the “call-first” list.
- Outcome log required: No answer / VM / Gatekeeper / Interested / Wrong person.
- If interested: book demo immediately using link.

### Craigslist
- Post 1 ad per city cluster (Services → Small Biz Ads or appropriate category). Track inbound replies.

---

## 4) Daily KPI Dashboard (copy/paste into a doc each day)

**Date:** ________

**Top-of-funnel activity**
- Cold emails sent: ____
- Cold calls placed: ____
- Voicemails left: ____
- Texts sent (only where compliant): ____
- Craigslist posts: ____
- FB group comments/posts: ____

**Responses / conversion**
- Email replies: ____ (Positive: __ / Neutral: __ / Negative: __)
- Call connects: ____
- Demos booked: ____
- Demos held: ____

**Revenue pipeline**
- Trials started (free week): ____
- Closed/Won locations: ____
- Closed/Lost: ____ (reasons: ____)

**Speed metrics**
- Avg time-to-first-response: ____
- Avg time-to-demo from first touch: ____

**Notes (what worked / what to change tomorrow)**
- Best subject line:
- Most common objection:
- List quality notes:

This artifact is designed so we can immediately operationalize outbound: build 200 leads using only free sources, import into HubSpot, execute daily outreach blocks, and report KPIs consistently while referencing the legitimacy URL and business contact email in every customer-facing touch.