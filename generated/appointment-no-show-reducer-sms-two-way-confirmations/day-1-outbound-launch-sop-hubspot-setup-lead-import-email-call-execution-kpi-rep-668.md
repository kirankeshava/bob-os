# Day-1 Outbound Launch SOP (HubSpot Setup + Lead Import + Email/Call Execution + KPI Report)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T09:21:24.870Z

---

Goal: Book demos for Appointment No-Show Reducer (two-way SMS confirmations + instant reschedules + waitlist fill). Offer positioning to use everywhere: “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”

Legitimacy + contact routing (always include):
- Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Reply inbox: agent_bob_replit+no-show-bot@agentmail.to

A) HubSpot CRM Free setup (15–25 min)
1) Create account (free) using: Bob Smith, agent_bob_replit@agentmail.to.
2) Create Pipeline: “No-Show Reducer – Outbound”.
Stages (in order):
- New Lead (not contacted)
- Emailed – Attempt 1
- Emailed – Attempt 2
- Emailed – Attempt 3
- Called/Texted
- Replied – Interested
- Replied – Not now
- Demo Scheduled
- Demo Held
- Closed Won (Location)
- Closed Lost
3) Required custom properties (create as Deal or Contact properties; keep it minimal for speed):
- Vertical (Dental / Chiro / Med Spa / PT / Optometry / Other)
- City Cluster (e.g., Phoenix / Dallas)
- Appointment Volume (est. per week)
- No-show rate (est. %)
- Value per visit ($)
- Scheduling system (Zocdoc / NexHealth / Dentrix / Jane / Mindbody / Other)
- Decision maker role (Owner / Office Manager / Ops)
- Last Touch (auto via notes; but add a simple dropdown if needed)
- Next Step Date (date)
4) Minimum logging standard: every touch gets a note with date + channel + outcome (e.g., “2026-04-09 Email #1 sent” / “Call: VM left”). Every positive reply gets a Next Step Date and Demo Scheduled stage.

B) Lead list build + import (first 200 leads)
Target city clusters (start with 2): pick two large metros with dense appointment businesses. Example: Phoenix AZ + Dallas TX.
Target verticals (start with 3): Chiropractic, Med Spa, Dental.
Free sourcing method:
- Google Maps search strings:
  - “chiropractor Phoenix AZ”
  - “med spa Phoenix AZ”
  - “dentist Phoenix AZ”
  - Repeat for Dallas TX
- For each result capture: business name, website, phone, address, owner/manager name if visible, and an email from the website (Contact page). If no email, capture contact form URL.
- Dedupe rule: dedupe on Website Domain OR Main Phone.

CSV columns (ready for HubSpot import):
- Company Name
- Website
- First Name
- Last Name
- Title
- Email
- Phone
- City
- State
- Vertical
- City Cluster
- Source URL (maps listing or directory)
- Notes (anything relevant: “online booking”, “mentions no-show fee”, etc.)

C) Day-1 execution schedule (repeat daily)
Volume targets:
- 50–100 cold emails/day (plain text)
- 20–40 calls/day (or calls + compliant texts)
- KPI logging same day

Suggested blocks:
1) 9:00–10:15: Send Email Attempt #1 to 50 prospects (batch 1)
2) 10:30–11:30: Call block #1 (10–20 calls)
3) 1:30–2:30: Send Email Attempt #1 to 25–50 prospects (batch 2)
4) 3:00–4:00: Call block #2 (10–20 calls) + follow-up texts to warm leads where allowed

D) Cold email sequence (paste-ready, plain text)
From: Bob (agent_bob_replit+no-show-bot@agentmail.to)
Signature (use on all emails):
Bob Smith
Appointment No-Show Reducer
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Subjects (rotate):
1) quick question about no-shows
2) two-way confirmations for {{Business}}
3) fill last-minute cancellations?
4) reduce no-shows in {{City}}
5) confirmation + instant reschedule
6) waitlist to backfill gaps

Email #1:
Hi {{FirstName}} — I’m Bob.

We help appointment-based practices reduce no-shows using two-way SMS confirmations (patients confirm/cancel), instant reschedules, and a waitlist to fill last-minute gaps. Done-for-you setup in 24–48 hours.

If I could show you a simple way to recover a few appointments/week at {{Business}}, who’s the right person to talk to about scheduling/operations?

– Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Email #2 (2 days later):
Hi {{FirstName}} — checking back.

Do you have any sense of your current no-show rate (roughly) and whether confirmations are manual today?
If you point me to the right person, I’ll send a 2-minute overview.

– Bob

Email #3 (2 days later):
{{FirstName}}, if you’re already happy with reminders/confirmations, no worries.

If not, want me to estimate the $ impact? (I only need: appts/week + avg value/visit + your best guess at no-show %.)

– Bob

Email #4 (final, 4–6 days later):
Last try — should I close the loop?

If you want, I can share the link with details here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

– Bob

E) Call opener + voicemail (fast qualification)
Opener:
“Hi, is this {{Business}}? This is Bob. I’m calling because we help practices reduce no-shows with two-way SMS confirmations and instant rescheduling. Who handles scheduling operations for the office?”
If decision maker comes on:
“Quick one—about how many appointments do you run in a typical week, and do you know your rough no-show rate?”
CTA:
“If this is worth 10 minutes, I can show you the workflow and how it recovers appointments. What does your calendar look like later today or tomorrow?”
Voicemail:
“Hi {{Name}}, Bob here. We reduce no-shows using two-way SMS confirmations + instant reschedules + a waitlist to backfill cancellations. I’ll email a quick note too. You can also see a short overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2”

F) Reply handling snippets (copy/paste)
- Interested: “Great—two quick questions so I tailor it: about how many appointments/week and your best guess at no-show %? If you share those, I’ll bring a recovered-revenue estimate to the demo. Here’s the overview link as well: (URL).”
- Not the right person: “Thanks—who is best to reach for scheduling/ops? If you can share their email/role I’ll reach out and keep it brief.”
- Price: “Depends on location volume, but the goal is to pay for itself by recovering a handful of appointments/month. If you share appts/week + avg $/visit + no-show %, I’ll estimate ROI before we talk.”
- Stop: “Understood—I'll stop. Thanks.” (Mark Closed Lost / Do Not Contact)

G) Daily KPI report (post end-of-day)
Track:
- New leads added
- Emails sent
- Calls placed
- Texts sent
- Replies (positive/neutral/negative)
- Demos booked
- Demos held
- Closed won
- Notes: top objections + what worked

This SOP is the day-1 minimum viable system: create HubSpot, import 200 leads, start sending/calling the same day, and log everything to compound into demos and closes.