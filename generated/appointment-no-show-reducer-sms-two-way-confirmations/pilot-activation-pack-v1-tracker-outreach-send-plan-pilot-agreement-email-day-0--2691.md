# Pilot Activation Pack v1 (Tracker + Outreach Send Plan + Pilot Agreement Email + Day-0 Smoke Test)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:53:08.894Z

---

Below is a ready-to-use Pilot Activation Pack for launching 2–3 concierge pilots quickly while keeping reliability high.

1) Pilot Recruitment + Activation Tracker (copy into Google Sheets/Airtable)
Columns:
- Company | Niche | Location/Timezone | Website | Decision Maker | Role | Email | Phone | Source
- Stage (Lead / Contacted / Replied / Call Booked / Qualified / Onboarding Sent / Onboarded / Live / Week-1 Report Sent / Converted / Lost)
- Last Touch Date | Next Touch Date | Channel (Email/LinkedIn/SMS) | Notes
- Baseline no-show rate (%) | Avg appt value ($) | Appts/week | Baseline no-shows/week (calc)
- Pilot start date | Reminder schedule (e.g., T-24h, T-2h) | Reschedule rules | Waitlist enabled (Y/N)
- Week-1 confirmations | Week-1 reschedules | Week-1 filled gaps | Week-1 opt-outs | Incidents (count)
- Est. recovered revenue/week (calc) | Outcome summary | Testimonial permission (Y/N)

Stage gates (definition of “Live”): reminders sending; two-way replies processed; STOP works; owner escalation contact configured; timezone validated.

2) Outreach Send Plan (to get 2–3 pilots live fast)
Goal: 2–3 pilots live within 7–10 days via free channels.
Daily cadence (5 days):
- Day 1: Send 30 emails (primary). Log every send + next follow-up date.
- Day 2: Follow-up #1 to Day-1 non-responders (short bump) + send 30 new emails.
- Day 3: LinkedIn DMs to the warmest 15 leads (if profiles available) + send 30 new emails.
- Day 4: Follow-up #2 to Day-1 leads + send 20 new emails.
- Day 5: Final follow-up to the most qualified 20 leads. Offer 15-min setup call.

Niche priority (highest likelihood): dental, chiropractic/physical therapy, med spas, massage, IV hydration, auto service, pet grooming/vet clinics, salons with high booking volume.
Qualification filter: 20+ appointments/week, staff complains about no-shows, uses any calendar/PMS, willing to allow reminder texts and capture consent.

3) Pilot Agreement Email (send when a prospect says “yes”)
Subject: Confirming your free 7-day no-show reduction pilot (concierge setup)

Hi <Name>,

Confirmed — we’ll run a free 7-day pilot of Appointment No-Show Reducer for <Business> to reduce no-shows using SMS reminders + two-way confirmations + assisted rescheduling.

What you’ll get during the pilot:
- Smart SMS reminders (timing we agree on)
- Two-way confirmations (customers can reply to confirm)
- Reschedule handling (we capture intent and route per your rules)
- Basic weekly outcomes summary (confirmations, reschedules, filled gaps, estimated recovered revenue)

Important compliance + expectations:
- Customers can opt out any time by replying STOP (we treat STOP as immediate opt-out).
- We only message customers who have provided consent to receive appointment texts (your existing consent language is fine; we can provide suggested wording if needed).
- If an integration/API fails, we will immediately alert you and pause messaging rather than risk incorrect reminders.

What we need from you to start (please reply with answers, or we can cover on a 15-minute call):
1) Location timezone + business hours:
2) Appointment system/calendar used (e.g., Google Calendar, Calendly, Acuity, Jane, etc.):
3) Reminder schedule preference (e.g., 24h + 2h before):
4) Your reschedule rules (same-day allowed? minimum notice?):
5) Waitlist (do you have one? how should we contact them?):
6) Escalation contact (name + phone/email) if something looks wrong:
7) Baseline estimate (last 4 weeks): appointments/week, no-show rate, average appointment value.

Legitimacy/overview page (feel free to share internally):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Support email for anything during the pilot:
agent_bob_replit+no-show-bot@agentmail.to

If you reply with your availability, I’ll send a calendar invite for the 15-minute onboarding.

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

4) Day-0 Go-Live QA Smoke Test (run immediately after setup)
Objective: verify the pilot won’t harm operations and can measure outcomes.

A. Timezone/DST
- Confirm business timezone in system matches location.
- Create a test appointment at “tomorrow 10:00am local” and ensure reminder schedule computes correctly.

B. Threading + reply capture
- Send a test reminder to a staff test number.
- Reply “YES” → expected: status=Confirmed; confirmation timestamp stored.
- Reply “NO” → expected: status=Declined/Cancellation flow triggered per rules.
- Reply “Reschedule” → expected: reschedule flow triggered; request new time.

C. High-confidence keyword overrides
- Reply “STOP” → expected: immediate opt-out; no further messages.
- Reply “HELP” → expected: help message or escalation; no loop.

D. Reschedule loop prevention
- Reply “reschedule” then provide an invalid time (“next month”) → expected: asks a clarifying question and flags for human review after 1–2 tries.

E. Double-booking prevention
- Attempt to reschedule into an already-booked slot → expected: reject and propose alternatives.

F. Failure alert + safe fallback
- Simulate calendar write failure (disconnect token / deny permission): expected: pause outbound messages + alert owner escalation contact with clear instructions.

G. Analytics sanity check
- Confirm events are recorded: reminder_sent, customer_reply, confirmation, reschedule_requested, opt_out.
- Confirm weekly rollup fields can be computed from logs.

Pass criteria to declare “Live”: A/B/C/F/G all pass; any failure triggers pause + fix before proceeding.
