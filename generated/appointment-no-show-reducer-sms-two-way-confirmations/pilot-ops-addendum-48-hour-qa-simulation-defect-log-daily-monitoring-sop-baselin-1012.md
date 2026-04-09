# Pilot Ops Addendum: 48-hour QA Simulation Defect Log + Daily Monitoring SOP + Baseline/Go-Live Client Emails

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:18:56.277Z

---

Below is an operator-ready addendum you can use to (1) QA the system in 48 hours before any live pilot, (2) run daily monitoring during pilots with clear escalation, and (3) collect baseline metrics + confirm go-live with clients.

LEGITIMACY + SUPPORT (include in all client comms)
- Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to

A) 48-HOUR QA SIMULATION: DEFECT LOG TEMPLATE (copy/paste into a sheet)
Columns:
1) Defect ID
2) Date/Time (UTC) + Local Timezone under test
3) Test Case ID
4) Preconditions (calendar state, patient/lead state, consent state)
5) Steps to Reproduce (numbered)
6) Expected Result
7) Actual Result
8) Impacted Metric (confirmations/reschedules/waitlist fills/opt-out)
9) Severity (S0 Critical, S1 High, S2 Medium, S3 Low)
10) Frequency (Always/Intermittent)
11) Evidence (SMS screenshots, logs, webhook payloads)
12) Owner (Eng/Ops)
13) Fix/Mitigation
14) Status (New/Triaged/In Fix/Ready to Verify/Closed)
15) Verification Steps + Pass/Fail

Test cases (minimum set to run in 48 hours):
TC-01 Timezone correctness: appointment created in business timezone; reminder times match local hours.
TC-02 DST boundary: appointment on DST change weekend; reminder schedule remains correct.
TC-03 Two-way YES confirmation: user replies “YES”; appointment marked confirmed; no further nag reminders.
TC-04 Two-way NO cancellation: user replies “NO”; appointment flagged; reschedule flow begins.
TC-05 Reschedule keyword: “reschedule”, “can we move it to Friday”, “later today”; system offers options or triggers owner handoff.
TC-06 Late confirmation: user replies after appointment start time; expected: do not mark confirmed for past appointment; log.
TC-07 Threading: multiple messages in same thread; ensure the correct appointment context.
TC-08 STOP/UNSUBSCRIBE: user replies STOP; confirm opt-out recorded; no further messages; send compliance confirmation.
TC-09 HELP: user replies HELP; provide support instructions + support email.
TC-10 Ambiguous replies: “maybe”, “ok”, emoji; expected: ask clarifying question or handoff.
TC-11 Double-book prevention: attempt to reschedule into an occupied slot; expected: reject and offer alternatives.
TC-12 Calendar update failure: simulate calendar API timeout; expected: (1) do not send misleading confirmation, (2) alert owner/operator, (3) retry with backoff.
TC-13 Waitlist fill: cancellation occurs; waitlist contacted in order; first YES gets slot; others get polite closeout.
TC-14 Quiet hours: reminders suppressed outside allowed hours.
TC-15 Multi-location: verify location routing uses the correct sender profile/rules.

Severity definitions:
- S0 Critical: compliance breach (STOP ignored), wrong-person texting, mass wrong-time reminders, double-book created, or failure that blocks confirmations/reschedules.
- S1 High: misclassification that causes lost appointment, failure to update calendar, repeated reminders after confirmation.
- S2 Medium: minor timing drift, unclear copy leading to extra staff work, missing analytics event.
- S3 Low: formatting/typos, non-blocking UI issues.

B) DAILY PILOT MONITORING SOP (CONCIERGE MODE)
Objective: ensure reminders are sent on time, replies are handled correctly, and failures are surfaced to the owner immediately.

Daily schedule (15–20 minutes per location):
1) Delivery sanity check (morning):
   - Confirm today’s reminders scheduled for the correct local timezone.
   - Spot-check last 10 outbound messages for failures/bounces.
2) Reply queue check (2–3x/day during business hours):
   - Review all inbound replies since last check.
   - Tag each as: Confirmed / Cancel / Reschedule / STOP / HELP / Unknown.
   - For Unknown: send clarifying question (“Reply YES to confirm, NO to cancel, or RESCHEDULE to move it.”).
3) Calendar sync health:
   - Verify last successful calendar read/write timestamps.
   - If any write failures: switch to “owner handoff” mode (manual reschedules only) until resolved.
4) Opt-out compliance audit:
   - Ensure STOP requests are recorded and no further messages were sent.
5) Incident logging + escalation:
   - Log any S0/S1 in the defect log immediately.
   - Escalation rules:
     * S0: email business owner within 15 minutes + internal fix owner immediately.
     * S1: email owner within 4 business hours with workaround.
     * S2/S3: include in weekly summary unless trending.

Calendar/API failure fail-safe (must follow):
- If calendar update fails, do NOT send “You’re all set/confirmed/rescheduled” language.
- Send: “We received your message and are confirming the schedule now. If you need immediate help, reply HELP.”
- Alert owner/operator with: appointment ID, client name/number (redact if needed), desired change, error payload, and retry ETA.

C) CLIENT EMAIL #1 — WEEK-0 BASELINE REQUEST (send immediately after pilot agrees)
Subject: Quick baseline request for your no-show reduction pilot (5 minutes)

Hi {{OwnerName}},

Excited to get your location set up for the Appointment No-Show Reducer pilot.

To measure results credibly in week 1, can you reply with these baseline numbers from the last 4 weeks (rough estimates are OK):
1) Total scheduled appointments:
2) No-shows (count or %):
3) Average appointment value (or revenue per visit):
4) Typical lead time (same-day / 1–3 days / 1+ week):
5) Timezone + business hours:

Once we have that, we’ll send the first Weekly Value Report showing confirmations, reschedules saved, waitlist fills, and estimated recovered revenue.

For reference, here’s our product page you can share internally: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob

D) CLIENT EMAIL #2 — DAY-0 GO-LIVE CONFIRMATION
Subject: You’re live — reminders + two-way confirmations start {{StartDate}}

Hi {{OwnerName}},

We’re live for your pilot. Starting {{StartDate}}, patients will receive SMS reminders and can reply to confirm or reschedule.

Your current rules:
- Reminder timing: {{e.g., 24h + 2h before}}
- Quiet hours: {{e.g., no texts after 7pm local}}
- Reschedule handling: {{auto options / staff handoff}}
- Waitlist (if enabled): {{on/off}}

If a patient replies STOP, they will be opted out immediately. If anything looks off (timing, wording, incorrect appointment), email us at agent_bob_replit+no-show-bot@agentmail.to and we’ll fix it fast.

Product page for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Thanks,
Bob

E) OUTREACH TRACKER SCHEMA (for 30-prospect batch)
Fields:
- Prospect Name | Niche | City | Decision Maker | Email | Phone | Source
- Status (Not Contacted / Contacted / Replied / Qualified / Pilot Offered / Consent Sent / Baseline Received / Configured / Live / Week-1 Report Sent / Converted / Closed)
- Date Contacted | Next Follow-up Date | Notes
- Consent Collected (Y/N) | Timezone | Reminder Rules Confirmed (Y/N)
- Go-Live Date | Week-1 Report Date | Key Result (Recovered $ estimate)

Use this addendum to (1) run QA fast, (2) prevent pilot fires, and (3) produce clean before/after proof for sales.