# Pilot Ops Kit v1 — Outreach Tracker + 15-min Demo Script + Consent Email + 7-Day Activation Checklist + Defect Template

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:37:44.008Z

---

# Pilot Ops Kit v1 (Appointment No-Show Reducer)

Business legitimacy URL to share with prospects: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  
Business contact email: agent_bob_replit+no-show-bot@agentmail.to

## 1) Pilot Outreach Tracker (Spreadsheet Schema)
Create a Google Sheet with these columns (one row per location/prospect):
- Prospect ID
- Business Name
- Niche (med spa/dental/chiro/salon/clinic/etc.)
- City/State
- Website
- Decision Maker Name
- Role (Owner/Office Manager/Practice Manager)
- Email
- Phone (public)
- Source (Google Maps/website/referral)
- Lead Quality (A/B/C)
- Current booking system (unknown / Square / Calendly / Jane / Mindbody / etc.)
- Appointment volume per week (est.)
- Avg appointment value (est.)
- Estimated no-show rate (est.)
- Outreach Channel 1 (Email/LinkedIn/SMS)
- Touch 1 Date
- Touch 1 Message ID/Subject
- Response? (Y/N)
- Touch 2 Date
- Touch 3 Date
- Booked call? (Y/N)
- Call date/time
- Outcome (Not now / Follow-up / Qualified / Pilot agreed)
- Baseline captured? (Y/N)
- Pilot start date
- Pilot status (Pending setup / Live / Paused / Completed)
- Notes (objections, constraints, consent details)

Operating rule: do not text unless the number is publicly listed and the message is clearly business-related and includes opt-out instructions.

## 2) 15-Min Pilot Demo + Onboarding Call Script (Concierge)
Goal: qualify quickly, capture baseline, secure approval to run a 7-day free pilot, and schedule Day 0 setup.

**0:00–1:30 — Intro + legitimacy**
“Hi, this is Bob. Thanks for taking 15 minutes. We help appointment-based businesses reduce no-shows using SMS reminders with two-way confirmations and rescheduling. For legitimacy, here’s our info you can reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. If anything comes up, our support email is agent_bob_replit+no-show-bot@agentmail.to.”

**1:30–5:00 — Qualification (fast)**
1) “Roughly how many appointments do you have per week?”
2) “What’s your typical no-show rate or how often do no-shows happen?”
3) “What’s the average value of an appointment (or first visit)?”
4) “What system do you use for scheduling? (Calendly/Square/Jane/Mindbody/Google Calendar/other)”
5) “Do you already send reminders? If yes, are they one-way or can clients confirm/reschedule?”

Decision gates:
- If volume is very low (<10/week): “We can still help, but it may take longer to show measurable results. Want to proceed or revisit later?”
- If they already have 2-way confirmations that work well: “We may not be additive unless we add reschedule automation/waitlist fills. Is that a problem today?”

**5:00–9:00 — Explain pilot (what they get)**
“For 7 days we’ll run a concierge pilot: reminders + two-way confirmations. Clients can reply YES to confirm, NO to cancel, or RESCHEDULE to move the appointment. We’ll also support STOP to opt out immediately. We track confirmations, reschedules, and no-show prevention, then send a weekly value report showing estimated recovered revenue.”

**9:00–12:00 — Collect implementation details (minimum viable)**
- Business timezone + business hours
- Appointment types (if different reminder timing by type)
- Reminder cadence preference (recommended): 24 hours before + 2 hours before
- Reschedule rules: “How soon is ‘too late’ to reschedule? Same-day allowed?”
- Owner/staff escalation contact (who gets alerted when something fails or is ambiguous)
- Waitlist: “Do you have people who want earlier times? How do you track them today?”

**12:00–14:00 — Consent + safety**
“We only message people who already booked with you and provided their number for appointment communication. Every message includes opt-out instructions. For the pilot, we’ll keep it simple and safe: if anything is unclear or the system can’t update the calendar, we alert your staff rather than guessing.”

**14:00–15:00 — Close (clear next step)**
“If you’re good with it, I’ll email a quick summary and consent confirmation. Once you reply ‘Approved’, we’ll schedule Day 0 setup and go live within 24–48 hours.”

## 3) Pilot Consent + Compliance Confirmation Email (Send After Call)
Subject: Quick confirmation to start your 7-day no-show reduction pilot

Hi {{Name}},

Thanks for the call today. As discussed, we’ll run a 7-day free concierge pilot of Appointment No-Show Reducer to reduce no-shows using SMS reminders with two-way confirmations and rescheduling.

Reference/legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Please reply with **“Approved”** to confirm:
1) You authorize us to send appointment-related SMS reminders to your customers **who have already booked with you** and provided their phone number for appointment communication.
2) Messages will include opt-out language (e.g., “Reply STOP to opt out”). If a customer replies STOP, we will immediately stop messaging that number.
3) Two-way replies will be interpreted using high-confidence keywords (YES/NO/RESCHEDULE/STOP). If a reply is ambiguous or if a calendar update fails, we will alert your staff instead of taking risky automated action.
4) You will provide the correct business timezone and an escalation contact for operational questions.

Day 0 setup checklist (we can do this on a 15-minute follow-up):
- Timezone + business hours
- Reminder schedule (e.g., 24h + 2h)
- Reschedule rules (same-day allowed? cutoff?)
- Escalation contact

Once you reply Approved, we’ll schedule Day 0 setup and start monitoring daily.

Thanks,  
Bob Smith  
Appointment No-Show Reducer  
agent_bob_replit+no-show-bot@agentmail.to

## 4) 7-Day Pilot Activation Checklist (Day 0–Day 7)
**Day 0 (Setup & Baseline)**
- Capture baseline (last 4 weeks if possible):
  - Total scheduled appointments/week
  - No-shows/week
  - No-show rate (%)
  - Avg appointment value ($)
- Confirm timezone and business hours
- Confirm reminder cadence
- Confirm reschedule policy + cutoff
- Confirm opt-out wording included
- Set escalation contact + backup contact
- Verify threading expectations (one conversation per appointment)

**Day 1 (Go-live)**
- Send first reminders to a small subset (if possible) to validate flow
- Validate keyword overrides: YES/NO/RESCHEDULE/STOP
- Log any ambiguous replies and outcomes

**Day 2–3 (Stabilize)**
- Monitor daily:
  - Delivery failures
  - Opt-outs
  - Confirmations
  - Reschedules
  - Any calendar update failures
- If calendar update fails: alert staff + record incident + provide workaround

**Day 4–5 (Optimize)**
- Identify common reply patterns and add rule-based overrides if needed
- Check for double-booking risk: ensure reschedules don’t create conflicts
- Validate that late replies (e.g., 10 minutes before) are handled safely

**Day 6 (Pre-report)**
- Prepare weekly rollup numbers
- Pull 2–3 examples of “saves” (confirmed after reminder, rescheduled instead of no-show)

**Day 7 (Report + Convert)**
- Send weekly value report with:
  - Baseline vs pilot deltas
  - Estimated recovered revenue
  - Next steps to continue (post-pilot)

## 5) Pilot Defect/Bug Intake Template (Copy/Paste)
- Defect ID:
- Date/Time:
- Pilot location:
- Severity: S0 (critical outage) / S1 (major incorrect behavior) / S2 (minor) / S3 (cosmetic)
- Area: timezone/DST | reminders | reply parsing | opt-out | calendar update | waitlist | analytics | alerts
- Description (what happened):
- Expected behavior:
- Steps to reproduce:
- Affected users/appointments:
- Customer impact (lost confirmation? double-book risk? compliance risk?):
- Logs/Message examples (redact PII if needed):
- Workaround used:
- Owner notified? (Y/N) + when
- Fix applied (Y/N) + version/date
- Verification steps + result:

This kit is designed to move from outreach to “pilot live” fast, while preserving compliance, safety, and clean baseline/outcome measurement for sales proof.