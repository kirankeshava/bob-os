# Pilot QA Execution Bundle v1 (Synthetic Simulation Plan + Incident/Defect Log + Client Kickoff Comms + Daily Data-Capture Checklist)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:29:06.952Z

---

Below is a pilot-ready QA execution bundle you can use before and during the first 2–3 concierge pilots for Appointment No-Show Reducer.

1) 48-Hour Synthetic QA Simulation Plan (run BEFORE any live pilot)
Goal: Identify reliability + message-quality failures without risking real customers.

A. Test Data Setup (synthetic appointments)
Create at least 20 appointments across:
- Same-day, next-day, and 7-days-out
- Multiple staff/providers (2–3) and multiple services
- Varying durations (15/30/60 min)
- At least 3 timezones if product supports multi-location (e.g., America/New_York, America/Chicago, America/Los_Angeles)
- DST edge (if near DST dates, simulate by changing server clock or using a test date scenario)

B. Scenarios + Expected Outcomes
S1 Timezone correctness
- Input: Appointment at 10:00 local time for each location/timezone.
- Expect: Reminder shows correct local time in message; confirmation updates the correct appointment.

S2 Reminder schedule accuracy
- Input: Rules: 24h + 2h reminders.
- Expect: Messages sent within acceptable tolerance (define: ±2 minutes). No duplicate sends.

S3 Two-way confirmation “YES”
- Reply variants: “Yes”, “YES”, “y”, “confirm”, “yep”, “✅ yes”.
- Expect: Appointment marked confirmed; no additional ‘nag’ reminders unless configured.

S4 Decline / Can’t make it “NO”
- Reply variants: “No”, “can’t”, “cannot make it”, “need to cancel”.
- Expect: System offers reschedule flow (or cancels if rules say so), logs decline.

S5 Reschedule intent
- Reply variants: “reschedule”, “move it”, “different time”, “later today”, “tomorrow morning”.
- Expect: System asks 1 clarifying question at most, proposes options, prevents loops.

S6 Ambiguous replies
- Reply variants: “maybe”, “not sure”, “what time is it?”, “who is this?”.
- Expect: System answers and asks for confirmation; does not mark confirmed/declined.

S7 STOP / opt-out compliance (non-negotiable)
- Reply variants: “STOP”, “Unsubscribe”, “stop texting me”, “cancel texts”.
- Expect: Immediate opt-out confirmation; no further messages. Audit entry created.

S8 HELP compliance
- Reply variants: “HELP”, “help”, “support”.
- Expect: Returns support instructions including website + email:
  Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
  Email: agent_bob_replit+no-show-bot@agentmail.to

S9 Message threading integrity
- Input: Multiple back-and-forth messages for same appointment.
- Expect: System keeps context; does not confuse with other appointments.

S10 Double-booking prevention
- Input: Two reschedule requests into same slot.
- Expect: Second attempt is rejected or offered alternatives; no calendar collision.

S11 Calendar write-back failure
- Simulate: Force calendar API error/timeout.
- Expect: Fail-safe triggers: (a) customer receives a polite ‘we’re checking’ message, (b) owner alert sent, (c) system does NOT falsely confirm a reschedule.

S12 Late confirmation
- Input: Customer replies YES after appointment start time.
- Expect: System responds appropriately (e.g., “It looks like this appointment time has passed—would you like to reschedule?”) and logs late reply.

S13 Waitlist fill
- Input: One cancellation and a waitlist contact.
- Expect: First waitlist offer sent; on acceptance, slot booked; on no response, next waitlist invited.

Pass/Fail Gate (before live pilot)
- STOP/HELP must pass 100%
- No duplicate reminders
- Timezone correctness must pass
- No double-booking
- Calendar failure must alert owner and avoid incorrect confirmations

2) Pilot Incident + Defect Log (single source of truth)
Use one shared sheet/table with these columns:
- Incident ID
- Date/Time (include timezone)
- Pilot Location
- Environment (Synthetic / Live)
- Category (Messaging / Calendar / Reschedule / Waitlist / Opt-out / Analytics / Other)
- Severity:
  Sev-0: Compliance risk (STOP failures, consent issues)
  Sev-1: Revenue-impacting (wrong time sent, double-booking, missed reminders)
  Sev-2: Degrades experience (confusing copy, delayed responses)
  Sev-3: Cosmetic/cleanup
- Description (what happened)
- Steps to Reproduce
- Expected vs Actual
- Evidence (message screenshots/IDs, logs)
- Owner (who is fixing)
- Status (New / Investigating / Fix in progress / Fixed / Verified / Won’t fix)
- Fix Notes
- Verification Steps + Date

Triage SLA (during live pilots)
- Sev-0: immediate stop-ship, same day
- Sev-1: within 24 hours
- Sev-2: within 72 hours
- Sev-3: backlog

3) Client-Facing Pilot Kickoff Message (email template)
Subject: Pilot kickoff — Appointment reminder confirmations (what to expect)

Hi [Owner Name],

Thanks for joining the 7-day pilot of Appointment No-Show Reducer. Starting [Go-Live Date], your customers will receive smart SMS reminders and can confirm or reschedule by replying directly.

What to expect this week:
- Customers will get reminders based on the schedule we agreed (e.g., 24h + 2h before).
- They can reply YES to confirm, or RESCHEDULE to request a new time.
- If someone replies STOP, they will be opted out immediately (no more texts).

Your support + escalation path:
- Website (for legitimacy/reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to

To measure results, we’ll send a weekly value report summarizing confirmations, reschedules, waitlist fills (if enabled), and estimated recovered revenue.

Reply to this email with your preferred ‘owner alert’ phone number (for urgent issues like calendar sync failures), and confirm your business timezone.

— Bob
Appointment No-Show Reducer

4) Client-Facing Pilot Kickoff (SMS-safe short version)
“Hi—this is Bob from Appointment No-Show Reducer. We’re live for the pilot. Reply YES to confirm, RESCHEDULE to move, STOP to opt out. Support: agent_bob_replit+no-show-bot@agentmail.to | https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

5) Daily Data-Capture Checklist (so weekly report is always possible)
Collect daily (per location):
- # reminders sent
- # confirmations received
- # reschedule requests
- # successful reschedules completed
- # cancellations
- # STOP opt-outs (and confirm no further sends)
- # waitlist offers sent (if enabled)
- # waitlist fills (slot rebooked)
- # owner alerts triggered (calendar failures, ambiguous replies needing manual help)
- Any notable incidents (link to incident ID)

Weekly recovered revenue estimate (simple):
Recovered Revenue = (Confirmed appointments that otherwise would likely no-show * avg appointment value * assumed no-show reduction factor)
Track assumptions explicitly so claims remain credible in sales proof.

This bundle is designed to be run in under 48 hours before go-live, then reused daily during pilots to surface edge cases fast and generate consistent, client-facing proof of value.