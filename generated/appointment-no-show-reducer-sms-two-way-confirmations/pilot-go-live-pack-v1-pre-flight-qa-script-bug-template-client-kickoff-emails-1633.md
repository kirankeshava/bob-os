# Pilot Go-Live Pack v1 — Pre-Flight QA Script + Bug Template + Client Kickoff Emails

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:06:55.607Z

---

Below is a pilot go-live pack you can use immediately when a location agrees to a concierge pilot for Appointment No-Show Reducer.

1) PRE-FLIGHT QA SCRIPT (20–30 minutes)
Goal: verify reminders + two-way confirmations + opt-out + reschedule loop work safely before sending real patient/client messages.

A. Business + timezone sanity
- Confirm location address + timezone (e.g., America/New_York). Ask: “Are you ever open past midnight local time?”
- Verify business hours configured match the location’s actual hours.
- DST check: schedule a test appointment 48–72 hours ahead that crosses no DST boundary; then create another synthetic test that would cross a DST boundary (if near change) or manually verify offset matches expected local time.
Expected: reminder send times display in correct local time; no messages go out outside business quiet hours.

B. Reminder cadence safety
- Confirm reminder schedule (example: T-24h + T-2h). Ensure not too aggressive for the niche.
- Ensure same appointment cannot trigger duplicate reminders if updated.
Expected: 1 reminder per configured checkpoint; updates do not create doubles.

C. Two-way confirmation parsing (rule-based overrides)
Send test inbound replies from a test number:
- “YES” / “Y” / “Confirm” => Confirmed
- “NO” / “Can’t make it” => Not attending -> offer reschedule
- “RESCHEDULE” / “Need to move” => reschedule flow
- “STOP” / “UNSUBSCRIBE” => opt-out (no further messages)
- “HELP” => support/help response
Expected: high-confidence keywords override AI. STOP always wins. HELP returns support instructions.

D. Threading + identification
- Reply with ambiguous content: “Sure” / “Ok” to ensure appointment context is correctly inferred or a clarification question is asked.
Expected: if ambiguity risk is high, system asks: “To confirm, are you confirming your appointment on [date/time]?”

E. Calendar write-back / reschedule loop
- Attempt a reschedule: pick 2 alternate times.
- Attempt an invalid time (outside hours).
- Attempt a double-book time slot.
Expected: invalid times rejected; double-book prevented; successful reschedule updates calendar and sends updated confirmation.

F. Failure-mode + escalation
- Simulate calendar API failure (disconnect integration or force error in staging).
Expected: system does NOT silently fail; it alerts owner/manager via email/SMS with clear instruction: “Calendar sync issue—messages paused for safety” or “Reply handling degraded—manual action needed.”

G. Compliance checks
- Ensure first outbound includes business name + opt-out language (where required): “Reply STOP to opt out.”
- Confirm opt-out is honored immediately.

2) PILOT BUG / DEFECT TEMPLATE (copy/paste into a doc or spreadsheet)
Fields:
- Defect ID:
- Date/time detected:
- Pilot location:
- Severity: S1 (data loss/compliance), S2 (wrong scheduling), S3 (message quality), S4 (cosmetic)
- Environment: prod/pilot/staging
- Summary (one line):
- Steps to reproduce:
- Expected result:
- Actual result:
- Impact (who/how many appointments):
- Workaround (if any):
- Owner:
- Status: Open / In progress / Fixed / Verified / Won’t fix
- Fix notes:
- Verification steps:
- Verified by + date:

3) CLIENT EMAIL — PILOT KICKOFF (“What to expect”)
Subject: Pilot kickoff — reduce no-shows with two-way SMS confirmations

Hi {{FirstName}},

Excited to get your 7-day pilot live.

Quick overview of how Appointment No-Show Reducer works:
- We send SMS reminders to upcoming appointments.
- Clients can reply to confirm or request a reschedule.
- When someone cancels, we can help fill gaps from a waitlist (if you have one).
- You’ll get a weekly report showing confirmations, reschedules, filled gaps, and estimated recovered revenue.

For legitimacy/reference, our info:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support: agent_bob_replit+no-show-bot@agentmail.to

Before we switch on messages, please confirm:
1) Your location timezone:
2) Business hours:
3) Reminder timing preference (example: 24h + 2h):
4) Reschedule rules (same-day allowed? minimum notice?):
5) Escalation contact (name + phone) if we detect an integration issue.

Once confirmed, we’ll run a quick pre-flight test and then go live.

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

4) CLIENT EMAIL — BASELINE METRICS REQUEST (needed for recovered revenue)
Subject: Quick baseline numbers (2 minutes) for your weekly pilot report

Hi {{FirstName}},

To quantify results in week 1, can you reply with best estimates for the past 4 weeks (or last month):
1) Approx. appointments per week (per location):
2) Approx. no-shows per week (or no-show %):
3) Average revenue per kept appointment ($):
4) If relevant: your typical lead time for scheduling (same day / 1–3 days / 1+ week)

We’ll use these only to compute your “estimated recovered revenue” in the weekly report.

Reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to