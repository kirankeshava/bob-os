# Pilot Launch Kit (Comms + QA Defect Log + Reply Parsing Rules + Daily Monitoring Checklist)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:35:42.836Z

---

Below is a ready-to-run Pilot Launch Kit for Appointment No-Show Reducer (SMS + Two-Way Confirmations). It is designed for concierge pilots where we control setup and monitoring, and it explicitly references our legitimacy URL and support email.

1) CLIENT EMAIL — PILOT ACTIVATION + DATA REQUEST (paste-ready)
Subject: Quick pilot setup — reduce no-shows with 2-way SMS confirmations (7-day test)

Hi {{FirstName}},

I’m Bob from Appointment No-Show Reducer. We help appointment-based businesses reduce no-shows by sending smart SMS reminders, collecting confirmations, automating reschedules, and (optionally) filling gaps from a waitlist.

Legitimacy / overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

To start your 7-day pilot, please reply with:
A) Location name + timezone (e.g., America/Chicago)
B) Booking system / calendar used (Google Calendar, Outlook, Jane, Acuity, etc.)
C) Reminder schedule (default suggestion):
   - 24 hours before (confirm)
   - 2 hours before (confirm)
D) Reschedule rules:
   - Earliest reschedule allowed (e.g., next business day)
   - Cutoff for same-day reschedule (e.g., 3 hours)
E) Waitlist (optional): do you want us to offer last-minute openings to a waitlist? If yes, how far in advance (e.g., <24h)?
F) Escalation contact (name + phone/email) if the calendar/integration fails

CONSENT / OPT-IN CONFIRMATION (required):
Please confirm: “We have permission to text our customers for appointment reminders/confirmations and include opt-out language (STOP to opt out).”

Baseline metrics (so we can quantify value):
- Approx. appointments per week:
- Typical no-show rate (%):
- Average appointment value ($):

Once I have the above, we can go live within 24 hours and you’ll receive a weekly value report (confirmations, reschedules saved, waitlist fills, and estimated recovered revenue).

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to


2) RULE-BASED SMS REPLY PARSING — DECISION TABLE (use before/alongside AI)
Goal: reduce misclassification risk by applying deterministic rules for high-confidence keywords before AI intent parsing.

2.1 Normalization
- Lowercase
- Trim whitespace
- Remove punctuation except numbers and “/”
- Collapse repeated spaces

2.2 Global compliance rules (highest priority)
- If message contains any of: "stop", "unsubscribe", "cancel texts", "do not text", "opt out" => INTENT=OPTOUT
  Action: mark number opted-out immediately; send confirmation: “You are opted out. Reply START to re-subscribe.” (if allowed)
- If message contains: "help", "info" => INTENT=HELP
  Action: respond with brief help + support email.

2.3 Confirmation intent (second priority)
- If exact match or contains standalone tokens:
  YES SET = {"yes","y","yep","yeah","confirm","confirmed","ok","okay","k","sure","ill be there","i'll be there","i will be there"}
  => INTENT=CONFIRM

2.4 Cancellation / cannot make it
- NO SET = {"no","n","cant","can't","cannot","won't","will not","not coming","cancel","need to cancel"}
  => INTENT=CANCEL (or NOT_CONFIRMED depending on product model)

2.5 Reschedule intent
- RESCHEDULE SET = {"reschedule","re-schedule","change","move","another time","different time","later","tomorrow","next week","new time"}
  => INTENT=RESCHEDULE_REQUEST

2.6 Tie-breakers / ambiguity
- If both CONFIRM and RESCHEDULE keywords appear (e.g., “yes but can we move it”) => INTENT=RESCHEDULE_REQUEST
- If both OPTOUT and anything else => OPTOUT wins
- If message length < 3 characters and not in {"y","n","ok","k"} => INTENT=UNKNOWN (ask clarifying question)
- If contains a time/date pattern (e.g., “3pm”, “04/12”) but no reschedule keyword => INTENT=RESCHEDULE_REQUEST (high likelihood)

2.7 Escalation conditions (handoff to human / owner)
- If user sounds upset/threatening/compliance-sensitive (“lawsuit”, “report”, “spam”) => INTENT=ESCALATE
- If repeated loop: 2+ UNKNOWN replies within 30 minutes => ESCALATE


3) QA SIMULATION DEFECT LOG TEMPLATE (copy into Sheets/Notion)
Fields:
- Defect ID:
- Date/time observed (with timezone):
- Environment (pilot/sandbox/synthetic):
- Location:
- Severity (S0 Blocker / S1 High / S2 Medium / S3 Low):
- Feature area (Timezone/DST, Calendar Sync, Reminders, Two-way Replies, Reschedule Flow, Waitlist Fill, Opt-out, Analytics, Reporting):
- Steps to reproduce (numbered):
- Input data (appointment time, customer phone, timezone, reminder schedule):
- Expected result:
- Actual result:
- Evidence (screenshots/log lines/message IDs):
- Customer impact description:
- Suspected cause:
- Mitigation/workaround:
- Owner (eng/ops):
- Status (New/In Progress/Fixed/Verified/Won’t Fix):
- Verification steps:
- Verified by + date:

Severity definitions:
- S0 Blocker: opt-out broken, messages sent at wrong day/timezone broadly, double-booking created, or calendar sync failing without alert.
- S1 High: message threading breaks frequently, confirmations not recorded, reschedule fails, or analytics materially wrong.
- S2 Medium: occasional edge-case misparse, minor timing offsets, cosmetic but confusing copy.
- S3 Low: typos, non-blocking UX improvements.


4) DAILY PILOT MONITORING CHECKLIST + ESCALATION
Run daily (morning + late afternoon) for each pilot location:

A) Delivery & compliance
- Check for delivery failures/bounces (carrier errors) and retry logic behavior.
- Verify opt-out keywords processed immediately (STOP/UNSUBSCRIBE).
- Ensure every outbound message includes opt-out language if required by your jurisdiction/policy.

B) Timezone/DST correctness
- Spot-check 5 upcoming appointments: reminder send times match location timezone and business hours.
- Verify no reminders sent during quiet hours (define per pilot).

C) Two-way threading & intent correctness
- Review all inbound replies from last 24h:
  - Confirmations recorded correctly
  - Reschedule requests routed correctly
  - Unknowns received a clarifying question
  - Escalations flagged

D) Calendar integrity / double-book prevention
- Verify rescheduled appointments update the calendar (and old slot released).
- Confirm no duplicates created for the same customer/appointment.

E) Fail-safes
- If calendar API fails, confirm an alert is generated to owner + support.
- If analytics pipeline fails, log incident and annotate report to avoid misleading numbers.

F) Daily mini-metrics (for weekly report)
- Outbound reminders sent:
- Replies received:
- Confirmed:
- Rescheduled:
- Cancelled/not coming:
- Waitlist fills (if enabled):
- Incidents opened today (count + severity):

Escalation protocol
- S0/S1: notify pilot owner contact within 30 minutes via agreed channel + email agent_bob_replit+no-show-bot@agentmail.to; pause sending if compliance-risk.
- S2: same-day notification; deploy workaround.
- S3: batch for weekly maintenance.

This kit enables rapid pilot go-live with controlled risk, measurable outcomes, and consistent reporting for conversion to paid installs.