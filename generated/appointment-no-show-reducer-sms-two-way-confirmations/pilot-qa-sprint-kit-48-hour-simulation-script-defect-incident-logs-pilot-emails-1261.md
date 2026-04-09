# Pilot QA Sprint Kit (48-hour Simulation Script + Defect/Incident Logs + Pilot Emails)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:22:32.836Z

---

# Pilot QA Sprint Kit — Appointment No-Show Reducer (SMS + Two-Way Confirmations)

Legitimacy URL (share with prospects/clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Support / Contact Email: agent_bob_replit+no-show-bot@agentmail.to

## 1) 48-hour Internal QA Simulation Script (Step-by-step)
Goal: validate reliability + safety before first 2–3 pilots. Execute in two timezones if possible.

### Setup (T0)
1) Create synthetic “Business A” profile:
- Timezone: America/New_York
- Business hours: Mon–Fri 9a–5p
- Reminder schedule: 24h + 2h before appointment
- Confirmation keywords: YES/CONFIRM, NO/CANCEL, RESCHEDULE
- Opt-out keyword: STOP (plus UNSUBSCRIBE)
- Help keyword: HELP
2) Create 15 synthetic appointments across 3 days:
- Mix of new/returning patients
- Mix of morning/afternoon
- Include 2 same-day appointments
- Include 2 appointments within 15 minutes of each other (to test double-book prevention)
3) Create a waitlist:
- 5 people with preferred times (morning/afternoon) + “earliest available”

### Test Cases (execute + record outcomes)
Record every case in the Defect Log (section 2) as Pass/Fail.

TC-01 Timezone correctness
- Action: schedule appointment at 3:00pm ET; trigger reminder logic.
- Expected: message states correct local time; no UTC leakage; confirmations update correct appointment.

TC-02 DST edge case (if applicable)
- Action: create appointment that falls on DST change week (or simulate by shifting timezone to America/Los_Angeles and verifying time rendering).
- Expected: reminder time remains correct locally; no off-by-one-hour reminders.

TC-03 Message threading / identification
- Action: send a reminder; reply “YES”.
- Expected: system ties reply to correct upcoming appointment for that phone; marks confirmed.

TC-04 Ambiguous multi-appointment customer
- Action: same phone has two appointments (two different days). Reply “YES”.
- Expected: system confirms the nearest upcoming appointment, and (if supported) asks a clarifying question when ambiguity exists (or escalates to owner).

TC-05 High-confidence keyword override: YES
- Action: reply “Yes”, “YES!”, “y”, “confirm”, “I’ll be there”.
- Expected: rule-based override triggers confirmation without AI misclassifying.

TC-06 High-confidence keyword override: NO/CANCEL
- Action: reply “No”, “can’t make it”, “cancel”.
- Expected: appointment marked canceled OR flagged for reschedule flow (per rules). Waitlist fill flow triggers.

TC-07 Reschedule intent parsing
- Action: reply “reschedule to next Tuesday afternoon”
- Expected: system enters reschedule flow; proposes options consistent with business hours; prevents double-book.

TC-08 Reschedule loop safety
- Action: user keeps changing mind (“Actually Thursday… no Friday”).
- Expected: no infinite loop; after N turns (recommend 3) escalate to owner or offer to call.

TC-09 STOP compliance
- Action: reply “STOP”.
- Expected: user opted out immediately; no further messages; confirmation sent (if required). Audit log entry created.

TC-10 HELP compliance
- Action: reply “HELP”.
- Expected: returns short help message including support email agent_bob_replit+no-show-bot@agentmail.to and basic instructions; does not expose internal info.

TC-11 Wrong-number / hostile reply
- Action: reply “wrong number” / profanity.
- Expected: immediate opt-out + apology; stop future messages; escalate flag to owner.

TC-12 Double-book prevention
- Action: attempt to reschedule into a slot already booked.
- Expected: system refuses and offers next available times; no calendar conflict created.

TC-13 Calendar update propagation
- Action: confirm appointment then reschedule.
- Expected: calendar event updated; old slot freed; new slot booked; reminders align to new time.

TC-14 Calendar/API failure fail-safe
- Action: simulate calendar API failure during confirm/reschedule.
- Expected: system does NOT tell user “confirmed” unless booking succeeded; instead informs user “We’re having trouble updating the schedule—someone will confirm shortly.” Sends owner alert via email.

TC-15 Quiet hours / after-hours behavior
- Action: send reschedule request at 2am local.
- Expected: no outbound messages during configured quiet hours (if policy exists) OR sends a single acknowledgement and delays actions until business hours.

Exit Criteria for pilots:
- 0 open Severity-1 defects
- STOP/HELP 100% correct
- No confirmed message sent without backend/calendar success
- Threading works for single-appointment customers

## 2) Defect Log Template (copy/paste)
Use for any bug found during simulation or live pilot.

- Defect ID:
- Date/Time:
- Environment: Simulation | Pilot (Location name)
- Severity: S1 Critical (compliance/data loss) | S2 Major (core flow broken) | S3 Minor | S4 Cosmetic
- Title:
- Description (what happened):
- Expected behavior:
- Steps to reproduce:
1)
2)
3)
- Inputs (phone reply text, timestamps, timezone):
- Affected component: SMS | Intent parsing | Scheduling | Waitlist | Analytics | Reporting
- Screenshots/logs:
- Temporary mitigation (if any):
- Owner notified? (Y/N) How:
- Fix status: Open | In progress | Fixed | Verified
- Verification steps + result:

## 3) Incident Log Template (live pilots)
Use when something impacts a client or patient experience.

- Incident ID:
- Location:
- Start time / End time:
- Impact summary (who/what affected):
- Severity: Sev-1 (messages wrong/STOP failure) | Sev-2 (missed reminders) | Sev-3 (minor)
- Trigger/cause (known/unknown):
- Immediate actions taken:
- Client communication sent (paste message):
- Prevent recurrence (follow-up task):

## 4) Pilot Recruitment Email (send to prospects)
Subject: Quick pilot to cut no-shows with 2-way SMS confirmations (concierge setup)

Hi [Name] — Bob here.

We’re running 2–3 rapid pilots of a simple system that reduces appointment no-shows by sending smart SMS reminders, collecting two-way confirmations, and automating reschedules (plus optional waitlist gap-fills).

If it’s helpful, here’s our live info page you can share internally: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Pilot offer (7–14 days):
- Concierge setup (we configure timings + reply handling)
- Two-way confirmations (YES/NO/RESCHEDULE)
- Weekly value report showing confirmations, reschedules saved, and estimated recovered revenue

All we need to start:
- Your timezone + business hours
- Reminder timing preference (ex: 24h + 2h)
- Baseline: typical weekly appointments + approximate no-show rate

If you’re open to it, reply with “pilot” and the best number/email for scheduling, or email us directly at agent_bob_replit+no-show-bot@agentmail.to.

Thanks,
Bob

## 5) Pilot Kickoff + Consent Email (send after they agree)
Subject: Pilot kickoff — reminder timing + consent + baseline (No-Show Reducer)

Hi [Name],

Excited to get your pilot live. Quick recap of what we’re enabling: SMS reminders + two-way confirmations + reschedule handling, with a weekly report on reduced no-shows and estimated recovered revenue.

Reference page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Please confirm these setup items:
1) Location timezone:
2) Business hours:
3) Reminder schedule (default: 24h + 2h):
4) Reschedule rules: (same-day allowed? minimum notice?)
5) Waitlist enabled? (Y/N) If yes, any restrictions?
6) Owner escalation contact (name + phone/email) for edge cases:

Consent/opt-in:
- You confirm that patients/clients receiving messages have provided consent to be contacted by SMS for appointment-related notifications, and every message includes STOP/HELP handling.

Baseline (last 4 weeks if possible):
- Avg weekly appointments:
- Estimated no-show rate:
- Avg appointment value (or range):

Reply with the answers above and we’ll schedule go-live.

Thanks,
Bob