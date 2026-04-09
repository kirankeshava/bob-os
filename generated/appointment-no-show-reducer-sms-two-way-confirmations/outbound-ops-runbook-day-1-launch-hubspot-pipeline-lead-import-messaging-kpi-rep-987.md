# Outbound Ops Runbook (Day-1 Launch): HubSpot Pipeline + Lead Import + Messaging + KPI Report

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T12:07:29.003Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Business contact inbox (reply-to): agent_bob_replit+no-show-bot@agentmail.to

GOAL (30 days): Book 40 demos, close 20–25 locations.
Day-1 output target: 50–100 cold emails + 20–40 calls/texts, with every touch logged.

1) HUBSPOT (FREE) PIPELINE SETUP
Pipeline name: No-Show Reducer Outbound
Stages + exit criteria:
1. New Lead (not contacted)
2. Attempted Contact (email/call attempt logged)
3. Connected – Qualifying (two-way conversation started)
4. Demo Booked (meeting scheduled)
5. Demo Held (completed demo)
6. Proposal/Checkout Sent (Stripe link or checkout instructions sent)
7. Closed Won (paid location)
8. Closed Lost (not moving forward)
9. Nurture (timing not now; follow-up date set)

Required properties (create as custom where needed):
- Vertical (Dental/Chiro/Med Spa/PT/Optometry/Other)
- City Cluster (e.g., Phoenix, Dallas)
- Locations (#)
- Appts per week (range)
- No-show rate (self-reported)
- Avg value per visit ($)
- Scheduling system (e.g., Dentrix, Jane, Mindbody, Vagaro, manual)
- Decision maker role (Owner/Practice Manager/Front Desk)
- Best phone
- Best email
- Last touch date
- Next step (text)
- Next follow-up date
- Outcome code (No answer / Gatekeeper / Interested / Not a fit / Wrong contact / Do not contact)

Task queues:
- First touch email
- First call
- Second touch follow-up
- Demo prep / pre-qual

2) LEAD LIST (CSV) TEMPLATE — READY TO IMPORT
Use these columns (exact headers) in your sheet/CSV:
Company Name | Website | Google Maps URL | Address | City | State | ZIP | Phone | Contact First Name | Contact Last Name | Title/Role | Email | Vertical | City Cluster | Locations | Notes (hours, booking link, etc.) | Source | Status (New/Attempted/Connected/etc.) | Last Touch Date | Next Follow-Up Date

Validation rules:
- One row per location.
- Deduplicate by Phone + Website.
- If no email found, still import (phone-first calling).
- Always capture booking link if present (often reveals software + volume).

Free sourcing workflow (repeatable):
- Google Maps queries by city + vertical:
  - “chiropractor Phoenix AZ”, “med spa Phoenix AZ”, “dentist Phoenix AZ”, “physical therapy Phoenix AZ”, “optometrist Phoenix AZ”
- Directory backups: Yelp, Healthgrades, Zocdoc (where applicable), local chamber directories.
- On each website, look for: Owner/Practice Manager/Office Manager + email, contact form, and online booking link.

3) DAY-1 EXECUTION SCHEDULE (TIMEBLOCKS)
Block A (Email send 1): 9:00–10:30am local time
- Send 25–50 emails (plain text). Log “Attempted Contact”.

Block B (Calls): 10:30am–12:00pm
- Call 10–20 locations. Leave voicemail + same-day email follow-up.

Block C (Email send 2): 2:00–3:30pm
- Send 25–50 emails. Prioritize the best-fit leads not yet contacted.

Block D (Calls + texts where compliant): 3:30–5:00pm
- Call 10–20. If they answer and are interested, offer to text the legitimacy URL + book demo.

Craigslist (weekly 1–2 posts per city cluster):
- Post under “services” (small biz ads). Include the legitimacy URL and the contact inbox.

4) CORE MESSAGE (ONE-LINER)
“We reduce appointment no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”

5) EMAIL TEMPLATE (PLAIN TEXT) + FOLLOW-UPS
Subject options:
1) quick question about no-shows
2) reducing last-minute cancels at {Clinic}
3) two-way SMS confirmations for {City}
4) can I send a 30-sec idea?
5) fill gaps from your waitlist
6) reschedules + confirmations (done-for-you)

Email #1:
Hi {FirstName} — Bob here.

If you’re like most {Vertical} clinics, no-shows + late cancels quietly cost a lot each month.

We help reduce no-shows using two-way SMS confirmations (Y/N), instant reschedules, and waitlist fills to backfill openings. Setup is done-for-you in 24–48 hours.

If it’s helpful, here’s our info: {LegitimacyURL}

Worth a 10-minute look this week to see if it can recover visits for {ClinicName}?
– Bob
Reply to: agent_bob_replit+no-show-bot@agentmail.to

Email #2 (2 days later):
Hi {FirstName} — do you currently confirm appointments by text, phone, or both?

If you tell me approx. (a) appts/week and (b) typical no-show %, I can estimate recovered revenue per month for {ClinicName}.

Info: {LegitimacyURL}
– Bob (agent_bob_replit+no-show-bot@agentmail.to)

Email #3 (4–5 days later):
{FirstName}, should I speak with the person who owns scheduling + confirmations?

We typically help when clinics do 50+ appts/week and no-shows are 5%+.

If you’re not the right contact, who should I email?
– Bob

Email #4 (breakup, 7–10 days later):
I haven’t heard back, so I’ll close the loop.

If reducing no-shows / filling gaps becomes a priority later, you can reach me at agent_bob_replit+no-show-bot@agentmail.to.

Info: {LegitimacyURL}
– Bob

6) CALL OPENER + QUALIFY (60 seconds)
“Hi {Name}, this is Bob. I’ll be brief — we help {vertical} clinics reduce no-shows with two-way SMS confirmations and automatic rescheduling + waitlist fill. I’m calling to see if no-shows are a problem worth fixing at {Clinic}?”

Qualify fast:
- “Roughly how many appointments do you run per week?”
- “What % no-show / late cancel would you estimate?”
- “What’s an average visit worth?”
- “Who owns scheduling/confirmations — you or someone else?”

Close to demo:
“If you’re open, I can show how it works in 10–15 minutes and estimate recovered revenue. What does your calendar look like tomorrow or Thursday?”

7) TEXT (ONLY IF COMPLIANT / THEY CONSENT)
“Thanks {Name} — here’s the overview I mentioned: {LegitimacyURL}. If you want, reply YES and I’ll send 2 times for a quick 10-min demo. – Bob (agent_bob_replit+no-show-bot@agentmail.to)”

8) REPLY / OBJECTION HANDLING SNIPPETS
- Interested:
“Great — easiest next step is a 10–15 min demo. If you share appts/week + no-show %, I’ll come with a recovered revenue estimate. You can also review this first: {LegitimacyURL}. What time works?”

- Price question:
“Totally fair. Pricing depends on location count + appointment volume. Most clinics cover it by saving 1–3 visits/month. If you reply with appts/week + avg visit value, I’ll give a tight range before we book time.”

- Already have reminders:
“Most do — the difference is two-way confirmations + auto-reschedule + waitlist fill (so cancellations get backfilled). If you’re open, I can show the workflow in 10 minutes.”

- Not now:
“No problem — when would it make sense to revisit? If you tell me your typical no-show %, I can send a one-page estimate of what it’s costing per month.”

9) DAILY KPI REPORT (PASTE-FORMAT)
Date:
Emails sent:
Calls placed:
Texts sent (consented):
Email replies:
Call connects:
Demos booked:
Demos held:
Proposals/checkout sent:
Closed won (# locations):
Closed lost:
Notes (top objections + what’s working):

Operating rule: If it’s not logged, it didn’t happen. Every touch gets a “Last touch date” and a “Next follow-up date.”
