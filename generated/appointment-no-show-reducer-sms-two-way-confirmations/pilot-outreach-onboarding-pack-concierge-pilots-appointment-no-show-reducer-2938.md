# Pilot Outreach + Onboarding Pack (Concierge Pilots) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:45:44.797Z

---

## 1) Pilot Recruitment Email (copy/paste)
**Subject:** Free 7-day pilot to reduce appointment no‑shows (two‑way SMS confirmations)

Hi {{FirstName}},

I’m Bob from Appointment No‑Show Reducer. We’re running a few concierge pilots with appointment-based businesses to cut no‑shows using smart SMS reminders + two‑way confirmations + easy rescheduling.

What you get for the 7‑day pilot (free):
- Automated reminders with “Reply YES to confirm / NO to reschedule”
- Two‑way message handling (confirmations, reschedules, opt‑outs)
- Simple weekly report showing confirmations/reschedules and estimated recovered revenue

If you’re open to it, I can set this up concierge‑style (we do the config) and you only approve the wording + timing.

Legitimacy link (overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Best email for details: agent_bob_replit+no-show-bot@agentmail.to

Can we do a quick 15‑minute call this week to confirm fit (your no‑show rate, appointment value, and reminder timing)?

Thanks,
Bob Smith
Appointment No‑Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

---

## 2) LinkedIn DM (short)
Hi {{FirstName}} — I’m Bob. We’re running a free 7‑day concierge pilot to reduce no‑shows via two‑way SMS confirmations + rescheduling. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
If helpful, I can share a sample weekly value report. Contact: agent_bob_replit+no-show-bot@agentmail.to. Open to a 15‑min call?

---

## 3) Call/SMS Opener (use only where compliant)
Hi {{Name}}, this is Bob. We help reduce appointment no‑shows by sending two‑way SMS confirmations and making reschedules easy. We’re offering a free 7‑day pilot with a weekly report that estimates recovered revenue. Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 — email: agent_bob_replit+no-show-bot@agentmail.to. Would you like to try it for one location?

---

## 4) Pilot Qualification (must-have checks)
A location is a good pilot if:
1) They schedule appointments (calendar/booking system or manual schedule).
2) No‑show or late-cancel is a meaningful problem (even 5–10%+).
3) They can share baseline numbers (last 4 weeks) OR approximate them.
4) They can approve SMS wording and confirm they have consent to text customers.
5) They have a single owner/manager contact who can respond to escalations.

Disqualifiers (for week‑1 pilots):
- No customer phone numbers captured reliably.
- High regulatory burden without existing consent practices.
- Refuses to share any baseline metrics (no proof = weak case study).

---

## 5) Onboarding Intake Form (collect on call)
**Business & location**
- Business name:
- Location name (if multi-site):
- Address:
- Primary timezone (critical):
- Main contact (name/role):
- Escalation contact (after-hours):

**Appointments & operations**
- Typical appointment types (list):
- Avg appointment value ($):
- Avg duration:
- Business hours:
- Lead time (how far in advance people book):
- Current reminder method (none/email/SMS/manual calls):

**Baseline metrics (last 4 weeks if possible)**
- Total scheduled appointments/week:
- No‑shows/week:
- Late cancels/week (how defined?):
- Avg revenue per kept appointment ($):

**Messaging rules (pilot defaults)**
- Reminder schedule (suggest): 48h + 24h + 2h before
- Confirmation question: “Reply YES to confirm or NO to reschedule.”
- Reschedule flow: If NO/RESCHEDULE -> offer link or ask for preferred times
- Waitlist: Do you have a waitlist? If yes, how many people?
- Cutoff time for same-day fill attempts:

**Compliance & consent**
- Do you have customer consent to text appointment reminders? (Yes/No)
- If “No”, can you update intake forms to include consent language during the pilot? (Yes/No)
- Required opt-out keyword: STOP (we must honor immediately)

**Owner alerts / fail-safes**
- If calendar integration fails or conflict detected, where should we alert you? (email/SMS)
- Best alert email/phone:

---

## 6) QA Go-Live Checklist (pilot-specific)
1) Timezone verified (location timezone, DST behavior tested).
2) Reminder offsets verified (e.g., 48h/24h/2h) against a test appointment.
3) Two-way parsing verified:
   - YES/CONFIRM -> confirmed state
   - NO/CAN’T/RESCHEDULE -> reschedule path
   - STOP/UNSUBSCRIBE -> opt-out immediately
   - HELP -> help message + escalation path
4) Threading verified: replies attach to correct appointment.
5) Double-book prevention: reschedule suggestions do not create conflicts.
6) Calendar update flow verified: reschedules write back correctly; cancellations reflect.
7) Fail-safe verified: if API fails, create an incident + alert owner within X minutes.

---

## 7) Incident Log Template (copy into Sheet)
Columns:
- Date/Time
- Location
- Severity (S1 critical / S2 high / S3 medium / S4 low)
- Issue summary
- Customer impact (missed reminder? wrong time? opt-out failure?)
- Steps to reproduce
- Expected vs actual
- Root cause (if known)
- Mitigation/rollback taken
- Owner notified (Y/N) + timestamp
- Fix shipped (Y/N) + date
- Verification steps + result

Severity definitions:
- S1: Compliance risk (opt-out not honored), wrong-customer texting, large-scale outage.
- S2: Missed reminders for many appointments, wrong timezone, reschedule causing conflicts.
- S3: Minor parsing mistakes handled by fallback, delayed reminders but still sent.
- S4: Typos, minor analytics/report formatting.

---

## 8) Baseline + Outcomes Calculator (weekly)
Inputs:
- Appointments scheduled (week): A
- Baseline no-show rate (last 4 weeks): B%
- Avg kept appointment value: $V
- Pilot confirmations: C
- Pilot reschedules completed: R
- Waitlist fills: W
- Pilot no-shows (week): N

Core calculations:
- Baseline no-shows expected: A * B%
- No-shows avoided: (A * B%) - N (floor at 0)
- Estimated recovered revenue: (No-shows avoided + W) * V
Notes:
- Track “late cancel saved” separately if policy differs.
- Record any manual interventions (concierge assists) to attribute correctly.

---

## 9) Weekly Client Value Report Email (send Day 7)
**Subject:** Weekly no‑show reduction report — {{Location}} ({{StartDate}}–{{EndDate}})

Hi {{OwnerName}},

Here’s your weekly snapshot from the Appointment No‑Show Reducer pilot.

**Volume**
- Scheduled appointments: {{A}}
- Confirmed via SMS: {{C}}
- Reschedules completed: {{R}}
- Waitlist fills: {{W}}

**Outcome (estimated)**
- Baseline no‑shows expected: {{BaselineExpected}}
- Actual no‑shows this week: {{N}}
- Estimated no‑shows avoided: {{Avoided}}
- Estimated recovered revenue: ${{RecoveredRevenue}}

**Notable reply reasons (from messages)**
- {{TopReason1}}
- {{TopReason2}}

**Any issues / incidents**
- {{IncidentSummaryOrNone}}

If you want, next week we can tune reminder timing (e.g., add a same‑day confirmation for high no‑show slots) and expand to additional providers.

Overview link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob Smith
Appointment No‑Show Reducer

---

## 10) Post-Onboarding Confirmation Email (send immediately after call)
**Subject:** Pilot confirmed — next steps for {{Location}}

Hi {{OwnerName}},

Thanks for the time today. Confirming the 7‑day free pilot for {{Location}}.

**What we’ll do**
1) Configure reminder timing + message wording you approved.
2) Enable two‑way confirmations (YES to confirm, NO to reschedule).
3) Monitor daily and send your weekly value report on {{ReportDay}}.

**What we need from you (today/tomorrow)**
- Confirm timezone + business hours
- Baseline metrics (last 4 weeks): scheduled/week, no‑shows/week, avg appointment value
- Escalation contact for urgent issues

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

Reply here with the baseline numbers whenever convenient and we’ll schedule the go‑live.

Thanks,
Bob Smith
Appointment No‑Show Reducer
agent_bob_replit+no-show-bot@agentmail.to
