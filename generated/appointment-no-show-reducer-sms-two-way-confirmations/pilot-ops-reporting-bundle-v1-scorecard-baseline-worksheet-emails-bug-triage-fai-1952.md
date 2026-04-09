# Pilot Ops + Reporting Bundle v1 (Scorecard, Baseline Worksheet, Emails, Bug Triage, Fail-safes)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:57:24.420Z

---

Below is a ready-to-use bundle for running 2–3 concierge pilots and producing measurable proof.

1) PILOT SCORECARD (2-WEEK)
Location: ______  Timezone: ______  Go-live date: ______  Owner contact: ______
Baseline period used (last 4 weeks): ____/____ to ____/____

A. Baseline metrics (pre-pilot)
- Total appointments/week (avg): ____
- No-shows/week (avg): ____
- No-show rate: ____%  (= no-shows / total)
- Avg appointment value ($): ____
- Est. baseline revenue lost/week ($): ____ (= no-shows * avg value)

B. Pilot week metrics (week 1 / week 2)
For each week:
- Appointments monitored: ____
- Reminders sent: ____
- Confirmations received (YES): ____
- Cancellations received (NO/CANCEL): ____
- Reschedule requests: ____
- Reschedules completed: ____
- Waitlist offers sent: ____
- Waitlist fills completed: ____
- Opt-outs (STOP): ____
- Manual interventions by staff: ____
- Incidents (by severity): Sev1 __ / Sev2 __ / Sev3 __

C. Outcome calculations
- Prevented no-shows (estimate): ____
  Method: (Baseline no-show rate * monitored appts) – (actual no-shows during pilot)
- Recovered revenue from prevented no-shows ($): ____ (= prevented no-shows * avg value)
- Recovered revenue from waitlist fills ($): ____ (= waitlist fills * avg value)
- Total recovered revenue/week ($): ____
- ROI narrative (plain English): “This week we recovered approximately $____ by confirming visits, enabling reschedules, and filling last-minute gaps.”

2) BASELINE CAPTURE WORKSHEET (ASK ON KICKOFF)
Required to start:
- Business name + location: ______
- Appointment types/services included: ______
- Typical lead time (how far in advance people book): ______
- Business hours + closed days: ______
- Reminder schedule preference:
  ( ) 48h + 24h + 2h  ( ) 24h + 3h  ( ) Custom: ______
- Confirmation policy:
  - Confirm by: ( ) Reply YES  ( ) Tap link  ( ) Either
  - If not confirmed by X hours before: ______ (e.g., 4 hours)
- Reschedule rules:
  - Allowed window: ______ (e.g., up to 2 hours before)
  - Same-day reschedule allowed? Yes/No
- Waitlist rules:
  - Who is eligible: ______
  - How many offers to send per opening: ____
  - Offer expiry time: ____ minutes
- Consent/opt-in method used today:
  ( ) Existing consent language in intake forms  ( ) Manual opt-in script at booking  ( ) Other: ______
- Owner escalation contact (for failures): Name/phone/email ______

3) CLIENT EMAIL: PILOT KICKOFF + CONSENT CONFIRMATION
Subject: Pilot kickoff — appointment reminders + 2-way confirmations (next steps)

Hi {{FirstName}},

Thanks for joining the free pilot of Appointment No-Show Reducer. Here’s what we’re turning on and what we need from you to go live smoothly.

What this pilot does:
- Sends SMS reminders before appointments
- Collects confirmations (two-way) and handles common replies (YES / NO / RESCHEDULE)
- Supports opt-out (STOP) and help (HELP)
- Tracks confirmations, reschedules, waitlist fills, and estimated recovered revenue

Legitimacy / info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

To confirm before we start:
1) Timezone for this location: {{Timezone}}
2) Reminder timing: {{ReminderTiming}}
3) Reschedule rules: {{RescheduleRules}}
4) Waitlist rules (if applicable): {{WaitlistRules}}
5) Consent: Please reply confirming that your customers have agreed to receive SMS reminders related to their appointments (or confirm the exact opt-in script you use at booking).

Go-live plan:
- Day 1: enable reminders + confirmations, monitor replies closely
- Days 2–7: daily checks + quick rule tweaks
- End of week: we send a 1-page results summary with recovered revenue estimate

Reply to this email with the confirmations above and we’ll schedule go-live.

— Bob
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

4) CLIENT EMAIL: WEEK 1 RESULTS (VALUE REPORT EMAIL)
Subject: Week 1 results — confirmations, reschedules, and recovered revenue

Hi {{FirstName}},

Here are your Week 1 pilot results for {{LocationName}}.

Overview
- Appointments monitored: {{ApptsMonitored}}
- Confirmed (YES): {{Confirmed}}
- Reschedule requests: {{ReschedReq}}
- Reschedules completed: {{ReschedDone}}
- Waitlist fills: {{WaitlistFills}}
- Opt-outs (STOP): {{OptOuts}}

Estimated impact
- Baseline no-show rate (pre-pilot): {{BaselineNoShowRate}}%
- Actual no-show rate (pilot week): {{PilotNoShowRate}}%
- Prevented no-shows (est.): {{PreventedNoShows}}
- Estimated recovered revenue: ${{RecoveredRevenue}}

Notes / improvements we made
- {{OperationalNote1}}
- {{OperationalNote2}}

Legitimacy / info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

If you’d like, we can adjust reminder timing or add a tighter waitlist flow to capture more last-minute openings.

— Bob

5) BUG / DEFECT TRIAGE LOG (LIVE PILOTS)
Columns (copy into Sheet/Notion):
- Date/time detected
- Location
- Channel (SMS / calendar / internal)
- Severity (Sev1/Sev2/Sev3)
- Issue summary (1 line)
- Steps to reproduce
- Expected behavior
- Actual behavior
- Impact (# patients affected, revenue risk)
- Workaround applied (if any)
- Owner notified? (Y/N) + when
- Fix owner (engineering/ops)
- Fix deployed date
- Verification steps + verifier
- Status (Open / Monitoring / Resolved)

Severity definitions:
- Sev1: Customer-impacting outage or wrong messages sent (risk/compliance) — pause automations + notify owner immediately.
- Sev2: Partial failure (missed reminders, reschedule not written back) — notify within same day + apply workaround.
- Sev3: Cosmetic/reporting/edge-case with no immediate impact — batch fix.

Fix verification checklist:
- Reproduce on test appointment
- Confirm expected SMS wording + correct threading
- Confirm STOP/HELP behavior
- Confirm calendar write-back (if used)
- Confirm analytics counters update correctly
- Confirm no duplicate reminders

6) FAIL-SAFE + ESCALATION PLAYBOOK (CONCIERGE PILOTS)
If calendar integration fails (read or write):
1) Immediately pause outgoing automations for that location.
2) Email owner: “Integration issue detected; reminders paused to prevent incorrect messaging. We’re investigating.”
3) Switch to manual daily import (if available) OR run reminders only for the next 24 hours after verifying appointment list.
4) Log as Sev1 if any customer-facing message could be incorrect; Sev2 if only analytics impacted.

If SMS delivery fails (provider outage / high bounce):
1) Pause reminders for affected numbers.
2) Notify owner with affected appointment count.
3) If possible, fall back to email reminders (only if client confirms consent) or staff call list.

If reply parsing uncertain:
- High-confidence overrides: YES/NO/STOP/HELP/RESCHEDULE keywords always win.
- If ambiguous (e.g., “maybe”, “running late”): tag for manual review; do not auto-cancel.

Owner escalation rules:
- Sev1: notify immediately via email + (if provided) phone/text.
- Sev2: notify same business day.
- Sev3: include in weekly summary.

Support contact used in all comms: agent_bob_replit+no-show-bot@agentmail.to
Info page for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
