# Outbound Execution Runbook (Week 1): HubSpot Import CSV + Daily Cadence + KPI Report — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T14:34:24.256Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email (for replies): agent_bob_replit+no-show-bot@agentmail.to

GOAL (30 days): 40 demos booked, 25 locations closed.
Week-1 goal: 10–12 demos booked, 6–8 demos held.

1) HUBSPOT PIPELINE (stages)
A. New Lead (Not Contacted)
B. Emailed 1x
C. Emailed 2x
D. Called 1x
E. Connected / Qualifying
F. Demo Booked
G. Demo Held
H. Closed Won
I. Closed Lost
J. Nurture (Later)
K. Do Not Contact

Required fields to capture quickly:
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City Cluster (e.g., “Phoenix” / “Tampa Bay”)
- Location Count (1 / 2–5 / 6+)
- Scheduling System (Unknown / OpenDental / ChiroTouch / Vagaro / Mindbody / Jane / Other)
- No-show pain (Unknown / Low / Medium / High)
- Next Step Date (for follow-up)
- Last Touch Type (Email/Call/SMS)
- Outcome Notes (free text)

2) HUBSPOT IMPORT CSV (copy/paste schema)
Use this header row for your CSV (HubSpot will map fields):
Company name,Company domain,Website URL,Street address,City,State/Region,Postal code,Country,Industry,Vertical,City Cluster,Location Count,First name,Last name,Job title,Email,Phone number,Mobile phone number,Contact owner,Lead source,Lead source detail,No-show pain,Scheduling System,Last touch type,Last touch date,Last touch outcome,Next step date,Next step description,Notes

Formatting rules:
- Company domain = root domain only (example.com).
- Website URL = full https://… if available.
- Use “Owner” or “Office Manager” in Job title if unknown.
- If you only have a general inbox email (info@), still import; log “decision maker unknown” in Notes.
- Dedupe key suggestion: Company domain + Phone number.

3) WEEK-1 EXECUTION CADENCE (Day 1–7)
Daily (Mon–Fri) targets:
- 50–100 cold emails/day (plain text, no images)
- 20–40 calls/day
- Optional compliant SMS: only when number is clearly a business line and local rules allow; keep it short and non-spammy.
- Log every touch in HubSpot same day.

Day 1 (Launch):
- Build/import first 200 leads.
- Send Email #1 to 80–100 leads.
- Call 20–30 leads (prioritize those with direct numbers).
- If connected: qualify fast (see Qual Questions below) and push to book demo.

Day 2:
- Send Email #1 to next 80–100 leads.
- Send Email #2 to Day-1 non-responders (short bump).
- Call 20–40 leads (mix Day-1 + Day-2).

Day 3:
- Continue new Email #1 batch + Email #2 bumps.
- Call block focused on “opened/replied” and high-value verticals.
- Post 1 Craigslist ad per city cluster (2 ads total if running two clusters).

Day 4:
- Send Email #3 (“breakup / quick question”) to Day-1 non-responders.
- Call focus: attempt to reach owner/manager; ask gatekeeper for best email.

Day 5:
- New Email #1 batch + reply follow-ups.
- Book demos for next week; confirm attendance.

Weekend (Day 6–7):
- Light admin: clean CRM, schedule next week call blocks, prep Craigslist/FB posts.

4) QUALIFYING QUESTIONS (fast)
- Roughly how many appointments per week per location?
- What’s your no-show % (or “how often do people just not show up”)?
- What’s an average visit worth (revenue or gross margin)?
- What system do you schedule in (or are you using texting today)?
- Who owns scheduling decisions (you vs office manager vs corporate)?
If pain is real and they can decide: book demo immediately.

5) DEMO CTA (what we promise)
Offer statement to repeat consistently:
“We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours. You’ll see confirmations and recovered appointments right away, plus simple analytics to quantify recovered revenue per location.”

6) DAILY KPI REPORT TEMPLATE (paste each day)
Date:
City clusters active:
Verticals targeted:

Top-of-funnel activity:
- New leads added:
- Emails sent:
- Calls placed:
- SMS sent (if any):
- Craigslist posts live:
- FB group posts/comments:

Results:
- Email replies (total):
- Positive replies:
- Neutral / questions:
- Objections:
- Unsub/stop:
- Calls connected:
- Demos booked:
- Demos held:
- Closed won:
- Closed lost:

Quality notes (what worked today):
Blockers (what slowed us down):
Tomorrow’s plan (exact volumes + who to follow up with):

7) REPLY ROUTING / LEGITIMACY
When prospects ask “who are you / is this legit?” reply with:
- URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Email: agent_bob_replit+no-show-bot@agentmail.to

This runbook is designed so we can start immediately once HubSpot is created and the first 200 leads are captured/imported. The only moving parts are: (1) CRM live, (2) lead list built, (3) one demo booking link added to templates, then daily execution + KPI reporting.