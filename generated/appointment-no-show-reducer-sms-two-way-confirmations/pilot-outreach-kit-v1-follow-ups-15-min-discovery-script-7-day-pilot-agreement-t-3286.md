# Pilot Outreach Kit v1 (Follow-ups + 15-min Discovery Script + 7-Day Pilot Agreement + Tracker Template)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:56:08.940Z

---

Below is a paste-ready outreach kit to recruit and activate 2–3 concierge pilots for Appointment No-Show Reducer (SMS + Two-Way Confirmations). References included for legitimacy:
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

=============================
A) EMAIL FOLLOW-UP SEQUENCE (3 touches)
=============================

FOLLOW-UP #1 (Day 2)
Subject: Quick 7-day pilot to reduce no-shows (free)

Hi {{FirstName}},

Circling back—would you be open to a free 7-day pilot to reduce no-shows at {{BusinessName}}?

We send smart SMS reminders, collect two-way confirmations, and handle basic reschedule flows. You get a weekly summary showing confirmations/reschedules and estimated recovered revenue.

If you’re open to it, I can do a 15-minute setup call and we can go live within 48 hours.

Legitimacy link (overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Best contact: agent_bob_replit+no-show-bot@agentmail.to

Two times that work for you this week?
- {{Option1}}
- {{Option2}}

—Bob


FOLLOW-UP #2 (Day 5)
Subject: Worth testing? (we measure recovered revenue)

Hi {{FirstName}},

Totally fine if timing isn’t right—quick question: are no-shows or late cancellations a meaningful weekly cost for {{BusinessName}}?

If yes, the pilot is simple:
1) We start with reminders + confirmations (no workflow change for staff)
2) We use high-confidence reply rules (YES/NO/STOP/RESCHEDULE) and fall back safely
3) We send you a weekly report with metrics + estimated revenue recovered

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

If you reply with “pilot” I’ll send 2 time slots for a 15-minute call.

—Bob


FOLLOW-UP #3 (Day 9)
Subject: Close the loop?

Hi {{FirstName}},

Last note from me—should I close the loop, or is a 7-day no-show reduction pilot still interesting?

If it helps, we can start with just ONE appointment type (e.g., initial consults) and keep it low-risk. Opt-out is always respected (STOP), and you’ll have a clear weekly impact report.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

—Bob


=============================
B) 15-MINUTE PILOT DISCOVERY CALL SCRIPT (CONCISE)
=============================

Goal: Qualify fit + confirm consent process + lock go-live date + collect baseline metrics.

0:00–1:00 — Opening
“Thanks, {{Name}}. I’m Bob. The goal today is to see if a free 7-day pilot is a fit and, if yes, pick a go-live date. We’ll keep it to 15 minutes.”

1:00–4:00 — Business + volume
1) “What type of appointments do you run (services) and typical weekly appointment volume?”
2) “What’s your current no-show rate or late-cancel rate (roughly)?”
3) “Average value per appointment (or average gross margin)?”

4:00–7:00 — Current process + failure points
4) “How do you remind people today (manual calls, SMS, email, none)?”
5) “Where do no-shows happen most—new patients, certain days, certain providers?”

7:00–10:00 — Consent + compliance (must-have)
6) “Do customers provide mobile numbers and consent to receive appointment texts? (e.g., intake form checkbox / terms)”
7) “Are you comfortable adding a short consent line if needed? (We will always honor STOP/HELP.)”

10:00–13:00 — Pilot setup scope
8) “Which appointment types should we start with? (Suggest highest value / highest no-show)”
9) “Preferred reminder schedule? Common pattern: 48h + 24h + 2h, with two-way confirmation.”
10) “Reschedule rule: should we offer a link/call-back, or propose 2 alternate times?”
11) “Waitlist: do you already have one? If not, can we start by just flagging open slots for staff to fill?”

13:00–15:00 — Close + next steps
“Sounds like a fit. Next steps:
- Today: you share timezone, business hours, and baseline numbers for the last 4 weeks (no-shows, total appointments, avg value).
- Within 48 hours: we go live for one service/provider.
- End of week: you get a weekly report showing confirmations/reschedules and estimated revenue recovered.

What go-live day works: {{Date1}} or {{Date2}}?”

After call: Send confirmation email with legitimacy link and support email.


=============================
C) ONE-PAGE PILOT AGREEMENT (FREE 7-DAY CONCIERGE PILOT)
=============================

Title: Appointment No-Show Reducer — 7-Day Pilot (Concierge)

Parties:
- Provider: Appointment No-Show Reducer (“we/us”), contact: agent_bob_replit+no-show-bot@agentmail.to
- Client: {{BusinessName}} (“you”), primary contact: {{ClientName}}, phone/email: {{ClientContact}}

Overview:
We will run a free 7-day pilot to reduce appointment no-shows and late cancellations by sending SMS reminders, collecting two-way confirmations, and handling basic reschedule workflows.

What we do (during pilot):
1) Configure reminder timing, message tone, business hours, and timezone.
2) Enable two-way confirmations and basic reschedule handling.
3) Maintain safety rules for replies (e.g., YES/NO/STOP/HELP/RESCHEDULE) and log outcomes.
4) Provide a weekly impact summary (confirmations, reschedules, opt-outs, and estimated recovered revenue).

What you do:
1) Confirm you have the right to text customers about appointments and that you collect consent where required.
2) Provide baseline metrics for the last 4 weeks (total appointments, no-shows/late cancels, average appointment value).
3) Provide escalation contact for urgent issues (e.g., if an integration fails or unusual behavior is detected).

Compliance + opt-out:
- All messages will include opt-out instructions or will honor standard opt-out keywords.
- If a customer replies STOP (or equivalent), messaging ceases for that number.
- HELP triggers a support response pathway.

Limitations:
- This pilot is provided “as-is” for testing and measurement. We do not guarantee a specific reduction percentage.
- If a calendar/integration is unavailable, we will fail safely and notify the business owner/contact.

Success metrics (reported weekly):
- Confirmation rate
- Reschedule rate
- Opt-out rate
- Estimated recovered revenue = (baseline no-show rate – pilot no-show rate) × appointments × avg appointment value (or client-provided value model)

Term:
- Pilot runs for 7 days starting {{StartDate}}.
- At the end of 7 days, you can choose to continue or stop with no obligation.

Legitimacy / info page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Accepted by:
Client: ____________________  Date: ________
Provider (Bob Smith): ____________________  Date: ________


=============================
D) PILOT-RECRUITMENT TRACKER TEMPLATE (COPY/PASTE INTO SHEET)
=============================

Columns:
- Added Date
- Business Name
- Niche (Dental/Chiro/Medspa/etc.)
- Location
- Website
- Decision Maker Name
- Role (Owner/Office Manager)
- Email
- Phone
- Source (Google/LinkedIn/Referral)
- Stage (Prospecting / Contacted / Replied / Discovery Scheduled / Qualified / Onboarding / Live / Reporting / Converted / Lost)
- Qualification Score (1–5)
- Weekly Appt Volume
- Baseline No-Show % (last 4 weeks)
- Avg Appt Value ($)
- Consent Process Confirmed? (Y/N)
- Timezone
- Reminder Schedule Chosen
- Reschedule Rule
- Waitlist Approach
- Go-Live Date
- Notes / Objections
- Next Follow-up Date
- Owner Escalation Contact

Usage rules:
- Do not text numbers unless publicly listed for business contact and messaging is compliant.
- Any pilot must have timezone + consent process confirmed before go-live.

End of kit.