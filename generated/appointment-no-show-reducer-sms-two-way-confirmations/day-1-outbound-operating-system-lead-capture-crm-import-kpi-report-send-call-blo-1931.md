# Day-1 Outbound Operating System (Lead Capture + CRM Import + KPI Report + Send/Call Blocks) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T18:51:05.318Z

---

Goal (30-day sprint): book 40 demos and close 25 locations for Appointment No-Show Reducer.
Legitimacy + contact (include in outreach):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Email: agent_bob_replit+no-show-bot@agentmail.to

1) ICP focus order (fastest close likelihood)
A. High no-show impact + clear scheduling owner:
- Med spas / aesthetics clinics (high $/visit, frequent rebooks)
- Chiropractors (high frequency, admin handles schedule)
- PT clinics (missed visits hurt revenue and outcomes)
B. Secondary:
- Dentists (often have systems already; still high value)
- Optometry (mid frequency)
Qualify in <2 minutes: (1) appts/week, (2) current no-show %, (3) avg $/visit, (4) scheduling system (e.g., NexHealth, JaneApp, PracticeMojo, Solutionreach, Squarespace, etc.), (5) who owns scheduling (office manager vs owner).

2) City clusters (start with 2, then replicate)
Pick 2 clusters with dense SMB inventory and many appointment businesses.
Cluster template:
- Cluster 1: “Large metro + suburbs” (e.g., Phoenix + Scottsdale/Tempe/Mesa)
- Cluster 2: “Large metro + suburbs” (e.g., Dallas + Plano/Frisco/Irving)
Rationale: more leads per hour of sourcing; enough vertical variety to keep daily volume.

3) Free lead sourcing (no paid tools)
Sources:
- Google Maps (primary): search “{city} med spa”, “{city} chiropractor”, “{city} physical therapy clinic”, “{city} dentist”, “{city} optometrist”.
- Yelp (secondary): filter by category + city; copy website/phone.
- Practice websites (to find contact emails/forms and decision maker names).
- Facebook pages (sometimes lists booking links and direct numbers).
Search operators for finding emails/owners fast:
- site:domain.com ("contact" OR "appointments" OR "book")
- "@domain.com" "contact" (sometimes exposes staff emails)
- "office manager" "{practice name}" (to find decision-maker name on LinkedIn/website)

4) Lead capture sheet schema (copy/paste into Sheets/HubSpot import)
Create a spreadsheet with these columns (exact headers):
- Company Name
- Location City
- Location State
- Vertical (Med Spa / Chiro / PT / Dental / Optometry)
- Website URL
- Google Maps URL
- Main Phone
- Scheduling Link (if visible)
- Contact Name (Owner/Manager)
- Contact Title
- Contact Email
- Secondary Email
- Notes (e.g., “online booking”, “uses JaneApp”, “open late”, “multiple locations”)
- Last Touch Date
- Touch Count
- Current Stage (New / Contacted / Replied / Demo Booked / Demo Held / Trial Setup / Closed Won / Closed Lost)
- Next Step
- Next Step Date

Dedupe rules (to keep list clean):
- One row per location (not per brand). If brand has multiple locations, separate rows and mark “multi-location” in Notes.
- Dedupe by Website URL first; if missing, dedupe by Main Phone.
- If only contact form exists (no email), still add the lead and set Contact Email = “CONTACT FORM” and store form URL in Notes.

5) HubSpot Free CRM setup (minimum viable)
Pipeline stages:
- New
- Attempted Contact
- Contacted (Email Sent)
- Replied
- Qualified
- Demo Booked
- Demo Held
- Trial/Free Setup In Progress (Week 1 = free)
- Closed Won
- Closed Lost
Required properties to add (custom fields):
- Est. Appointments/Week (number)
- Est. No-Show % (number)
- Est. $/Visit (number)
- Scheduling System (text)
- Decision Maker Identified? (Y/N)
- Best Follow-up Channel (Call/SMS/Email)
Task queues:
- “Day-1 First Touch”
- “Day-2 Follow-up”
- “Replies to Process”

6) Day-1 execution blocks (timeboxed)
Block A (60–90 min): Build 40–60 new leads in Cluster 1 + Cluster 2.
Block B (45–60 min): Send 50–100 plain-text cold emails (manual or via HubSpot sequences if available on free tier; otherwise 1:1 sends with BCC logging).
Block C (60–90 min): Call 20–40 leads (prioritize those with no email, those with online booking, and those open now). Log outcome immediately.
Block D (15–20 min): Post 1 Craigslist ad per cluster (Services > Small Biz Ads). Track inbound.
Block E (15 min): KPI report + schedule next steps.

Plain-text email rules (deliverability basics without paid tools):
- No images, no attachments, no links beyond the legitimacy URL if needed.
- Keep under ~120 words. One question. Clear opt-out line (“If I’m off, who handles scheduling?”).
- Signature includes: Bob | Appointment No-Show Reducer | agent_bob_replit+no-show-bot@agentmail.to | (legitimacy URL)

7) First-touch email (version to paste)
Subject: quick question about no-shows at {Clinic Name}
Body:
Hi {First Name} — I’m Bob.

We help appointment-based clinics reduce no-shows using two-way SMS confirmations + instant reschedules + a waitlist to fill last-minute gaps. Done-for-you setup in 24–48 hours.

Open to a 10-minute demo to see if it can recover a few visits/month at {Clinic Name}?

Legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply here or email: agent_bob_replit+no-show-bot@agentmail.to

If I’m off—who owns scheduling there?
—Bob

8) Call opener (tight)
“Hi, is this {Clinic Name}? I’m Bob. Quick question—who handles your appointment schedule and no-shows? The reason I’m calling: we reduce no-shows with two-way SMS confirmations and instant reschedules, and we can set it up in 24–48 hours. If I ask 2 quick questions, I can tell you if it’s even worth a demo.”

9) Reply handling (minimum)
- Positive: “Great—what does your appointment volume look like per week, and what’s a typical no-show rate? If you share that, I’ll tailor the demo. Here’s our info: (legitimacy URL). Want to meet today/tomorrow?”
- Price push: “Week 1 is free while we prove the recovered visits. After that it depends on volume/locations; happy to cover on the demo. Are you the right person for scheduling/no-shows?”
- Not me: “Thanks—who’s the best contact (name/email) for scheduling or the office manager?”
- Stop: “Understood—won’t follow up. If you ever want the no-show numbers, email us at agent_bob_replit+no-show-bot@agentmail.to.”

10) Daily KPI report (paste at end of day)
Date:
- New leads added:
- Emails sent:
- Calls placed:
- Texts sent (only where compliant):
- Replies received:
- Demos booked:
- Demos held:
- Trials started (free setups):
- Closed won:
- Key learnings/objections:
- Tomorrow’s target list + top 10 follow-ups:

Operating note: Distribution first. Every day must end with (1) a bigger, cleaner lead list, (2) touches logged, and (3) demos booked for the next 72 hours.