# Pilot Reliability Pack v1 (Bug Triage + Go-Live Acceptance + Incident Comms + Measurement Plan)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:46:17.664Z

---

Appointment No-Show Reducer — Pilot Reliability Pack v1
Website (share with clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support / Ops email: agent_bob_replit+no-show-bot@agentmail.to

1) Bug Triage Workflow (use during pilots)
Goal: catch edge cases fast, prevent customer-facing failures, and produce a clean “fixed issues” story for sales.

1.1 Severity rubric
- S0 (Critical): Customer harm or compliance risk. Examples: messages sent after STOP, wrong patient/business contacted, double-booking created, reminders sent at wrong day/time due to timezone, PHI leaked into logs.
  Action: immediate rollback/disable automated sends, notify owner, hotfix same day.
- S1 (High): Pilot KPI materially impacted. Examples: confirmations not recorded, reschedule link broken, calendar write-back failing without alert, threading broken so replies not matched.
  Action: fix within 24 hours; apply manual workaround.
- S2 (Medium): Annoying but survivable. Examples: awkward copy, minor delay, duplicate reminder once.
  Action: fix within 72 hours; include in weekly changelog.
- S3 (Low): Cosmetic or backlog. Examples: wording preference, dashboard labeling.

1.2 Required bug report fields (copy/paste)
- Bug title:
- Severity (S0–S3):
- Pilot location:
- Time reported (include timezone):
- Channel (SMS/email/dashboard):
- Steps to reproduce (numbered):
- Expected result:
- Actual result:
- Evidence (message SID/text, screenshot, calendar event ID):
- Impact (appointments affected, revenue risk):
- Temporary workaround:
- Owner notified? (Y/N + timestamp):
- Fix PR/commit link:
- Verification steps + verifier:

1.3 Fix verification checklist
- Reproduced bug on test data
- Fix applied
- Regression tests run: STOP/HELP, YES/NO, RESCHEDULE, timezone
- Verified in pilot with real thread (or controlled test number)
- Logged in changelog + included in next weekly report “Ops improvements” section


2) Go-Live Acceptance Checklist (must-pass before enabling real sends)
If any item fails, do not enable automated reminders; run concierge/manual mode until fixed.

2.1 Business configuration
- Confirm business timezone (IANA format e.g., America/Chicago)
- Confirm business hours and closed days
- Confirm reminder schedule (e.g., 24h + 2h before)
- Confirm reschedule policy (cutoff window, allowed days)
- Confirm waitlist rules (who is eligible, how long to hold a slot)

2.2 Messaging compliance + safety
- STOP works: replying STOP (and variants) immediately suppresses all future messages
- HELP works: user receives support response including agent_bob_replit+no-show-bot@agentmail.to
- Opt-out state persists across new appointments
- Messages do not include sensitive details beyond first name + appointment time (unless client explicitly approves)

2.3 Intent parsing (rule overrides)
- YES/CONFIRM variants set status=confirmed
- NO/CANCEL variants set status=cancelled and notify business
- RESCHEDULE variants trigger reschedule flow
- Edge cases handled: “yes but running late”, “can we do tomorrow”, “stop texting me”, emojis, punctuation
- Unknown intents: fall back to human/owner alert (no automated action)

2.4 Calendar integrity
- Read: appointments ingested correctly (start time, service, provider)
- Write-back: confirmations/reschedules update the calendar event (or internal status) reliably
- Double-book prevention: reschedule cannot create conflicts; if conflict detected, propose alternative times or escalate
- Failure mode: if calendar API fails, system alerts owner and pauses automated actions

2.5 Threading + identity
- Replies map to the correct appointment when multiple upcoming appointments exist
- If ambiguity exists, system asks a clarifying question (no action taken)


3) Incident & Escalation Communications Pack (client-ready)
Use these when something breaks; speed and clarity reduce churn.

3.1 Owner alert email template (calendar/API failure)
Subject: [Action Required] Reminder system paused — calendar connection issue detected

Hi {{OwnerName}},

We detected an issue connecting to your calendar/integration at {{Timestamp}} ({{Timezone}}). To prevent incorrect reminders or reschedules, we’ve automatically paused outbound messages until the connection is restored.

What we need from you (2 minutes):
1) Confirm you can access the calendar normally
2) If you recently changed passwords/permissions, please re-authorize the connection
3) Reply to this email or contact us at agent_bob_replit+no-show-bot@agentmail.to

Status page / product overview for reference:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

We can run reminders in concierge/manual mode in the meantime if you want (we’ll confirm each send with you).

— Bob

3.2 Owner alert SMS template (high urgency)
“Hi {{OwnerName}} — we detected a calendar connection issue at {{Time}}. Automated reminders are PAUSED to avoid errors. Reply here or email agent_bob_replit+no-show-bot@agentmail.to to restore. Ref: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

3.3 Client-facing patient SMS fallback (only if needed; keep generic)
“Hi {{FirstName}} — quick note: we’re having a temporary scheduling system issue. If you need to confirm or reschedule, reply here and our team will assist.”

3.4 Internal incident log entry template
- Incident ID:
- Start time/end time:
- Trigger (API error, message failure, parsing error):
- Scope (locations/users impacted):
- Customer impact:
- Mitigation applied (pause, manual mode, rollback):
- Root cause:
- Preventive fix:


4) 7-Day Pilot Measurement Plan (baseline → outcome → sales proof)
Goal: produce a weekly email report that quantifies recovered revenue and validates reliability.

4.1 Baseline capture (before Day 1)
Collect last 4 weeks (or last 50 appointments) for each location:
- Total appointments scheduled
- No-shows count
- Late cancels count
- Avg appointment value (or gross margin per appointment)
- Current reminder process (none/manual/one-way)
Compute baseline:
- Baseline no-show rate = no-shows / scheduled
- Baseline loss/week = (no-shows per week) * avg value

4.2 During pilot (Day 1–7)
Track daily:
- Reminders sent
- Confirmations received (YES)
- Cancellations received (NO/CANCEL)
- Reschedule requests
- Successful reschedules completed
- Waitlist offers sent
- Waitlist fills completed
- Opt-outs (STOP)
- Incidents (S0–S3) and time-to-resolution

4.3 Outcome calculations (end of week)
- Confirmation rate = confirmations / reminders delivered
- Reschedule save rate = completed reschedules / reschedule requests
- Fill rate = waitlist fills / cancellations
- Estimated recovered appointments = (reschedules completed + waitlist fills) + (no-show reduction estimate)
- Recovered revenue/week (conservative) = (reschedules completed + waitlist fills) * avg appointment value
Optional (if baseline no-show rate known and week volume comparable):
- No-show reduction = (baseline no-show rate − pilot no-show rate) * scheduled appointments

4.4 Weekly report “value proof” bullets (ready to paste)
- “We sent {{N}} reminders and received {{C}} confirmations ({{CR}}%).”
- “{{R}} patients requested reschedules; we successfully rebooked {{RS}} ({{SR}}%).”
- “We filled {{F}} last-minute openings from the waitlist.”
- “Estimated recovered revenue this week: ${{REV}} (conservative, based on avg appt value).”
- “Reliability: {{Incidents}} incidents; median resolution time {{TTR}}; opt-outs {{STOP}}.”

This pack is designed to be used immediately in the first 2–3 concierge pilots to keep operations safe, build credibility, and generate measurable sales assets for scale-up.