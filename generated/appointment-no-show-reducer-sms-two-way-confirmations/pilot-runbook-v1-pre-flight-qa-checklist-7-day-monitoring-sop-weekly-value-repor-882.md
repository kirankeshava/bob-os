# Pilot Runbook (v1): Pre-Flight QA Checklist + 7-Day Monitoring SOP + Weekly Value Report Template

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:49:53.125Z

---

Appointment No-Show Reducer — Pilot Runbook v1

Legitimacy URL (share with clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support/Contact Email: agent_bob_replit+no-show-bot@agentmail.to

GOAL
Run 2–3 concierge pilots safely, catch reliability issues early, and produce measurable outcomes (confirmed appointments, reschedules captured, waitlist fills, and estimated recovered revenue/week per location).

A) PILOT PRE-FLIGHT QA CHECKLIST (run before go-live; target <30 minutes)
1) Timezone & DST
- Confirm business timezone matches location (e.g., America/Los_Angeles). Create 2 test appointments: one “tomorrow morning” and one “tomorrow afternoon.” Verify reminder timestamps render in local time.
- If within 2 weeks of DST change, create a test appointment spanning the change week. Verify reminder times remain correct.

2) Message threading & identity
- Send an initial reminder + confirm request. Reply from the test patient number with: “YES”. Confirm system threads to the correct appointment.
- Create a second appointment for same number; verify the system requests clarification (date/time) or selects the nearest upcoming appointment based on rules.

3) High-confidence keyword overrides (rule-based)
- YES/CONFIRM/CONFIRMED/Y/✅ => Confirm.
- NO/CAN’T/CANNOT/NOT COMING => Not attending.
- RESCHEDULE/CHANGE/MOVE/DIFFERENT TIME => Reschedule flow.
- STOP/UNSUBSCRIBE/CANCEL => Opt-out (immediate). Confirm no further SMS.
- HELP/? => Provide help text + support email.
(Override precedence: STOP > HELP > RESCHEDULE > YES/NO. If ambiguous, ask one clarifying question.)

4) Opt-out compliance
- Send “STOP” from test number. Verify: (a) confirmation of opt-out is sent, (b) no further reminders are sent, (c) opt-out status persists.

5) Reschedule loop safety
- Reply “reschedule” then provide an invalid time (“tomorrow 25:00”). System should ask again and not spam. After 2 failed attempts, escalate to staff/owner and pause automation.

6) Double-booking prevention (assertions)
- Attempt to schedule two appointments for the same patient at overlapping times (or same slot). The system must reject or require manual override.
- If rescheduling into an occupied slot, system must suggest alternatives or route to staff.

7) Calendar write-back & failure fallbacks
- If calendar/API integration is enabled: confirm a reschedule updates calendar event time and sends a confirmation.
- Simulate calendar/API failure (disable token or use invalid credentials in staging). Expected behavior: do NOT confirm a new time. Send an owner alert (email/SMS) with details + instruct patient “We’re confirming with the office and will reply shortly.”

8) Quiet hours & business hours
- Verify the system does not send outside configured quiet hours. If patient replies during quiet hours, response can be queued or send a single receipt message (no multi-message thread).

PASS/FAIL GATE
- Any FAIL in opt-out, timezone correctness, or calendar fallback => do not go live. Fix first.

B) 7-DAY PILOT MONITORING SOP (concierge operations)
Daily checks (10–15 min/location/day):
1) Delivery health
- Check outbound success rate (sent vs failed). Investigate carrier failures or invalid numbers.
2) Reply classification audit
- Review all inbound replies. Spot-check at least 10% of threads for misclassification.
- If misclassification occurs: add to “Keyword/Rule exception list” or adjust override keywords.
3) Reschedule outcomes
- Count reschedule attempts, completed reschedules, and stuck reschedules (no resolution in 30 minutes during business hours).
4) Escalations
- Verify owner/staff alerts were delivered and resolved.
5) Opt-outs
- Confirm STOP requests processed immediately.

Incident severity rubric
- Sev 1: Compliance risk (opt-out failure), wrong-day/time reminders at scale, or messages to wrong person. Action: pause automation for location immediately.
- Sev 2: Calendar failure without fallback, repeated reschedule loop, duplicated reminders. Action: switch to “notify-only” mode + manual handling.
- Sev 3: Cosmetic copy issues, minor classification misses. Action: fix within 48–72 hours.

Incident log format (single source of truth)
- Date/Time, Location, Patient (masked), Issue, Severity, Steps to reproduce, Expected vs Actual, Resolution, Preventive fix.

C) BASELINE + OUTCOME MEASUREMENT (for sales proof)
Baseline (collect before Day 1)
- Last 4 weeks total appointments
- Last 4 weeks no-show count (or rate)
- Average appointment value ($)
- Average lead time (booking to visit) if known
- Current reminder process (none/manual/1-way/2-way)

Pilot KPIs (weekly)
- Reminders sent
- Confirmations (count, % of reminders)
- Negative responses (can’t make it)
- Reschedules completed (count)
- Waitlist fills (count) — if enabled
- No-show rate during pilot window (if available)

Recovered revenue estimate (simple, explainable)
- Saved visits from confirmations/reschedules = (Reschedules completed + Waitlist fills) * Avg appointment value
- Conservative adjustment (optional): multiply by 0.7 to avoid over-claiming
- Report as: “Estimated revenue recovered this week: $X” and “Projected monthly: $X * 4.3”

D) WEEKLY VALUE REPORT TEMPLATE (client-facing email)
Subject: Weekly No-Show Reduction Report — {Location Name} — Week of {Date}

Hi {First Name},

Here’s your weekly summary from Appointment No-Show Reducer. (Reference link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2)

1) Activity
- Reminders sent: {#}
- Patient confirmations: {#} ({%})
- Patients who said they can’t make it: {#}
- Reschedules completed: {#}
- Waitlist fills (if enabled): {#}

2) Estimated revenue recovered
- Avg appointment value: ${AOV}
- Visits saved (reschedules + waitlist fills): {#}
- Estimated recovered revenue this week: ${Recovered}

3) What we learned (examples)
- Most common confirmation phrasing: {examples}
- Most common reschedule requests: {examples}
- Any issues/corner cases observed: {notes}

4) Next week improvements (1–3 bullets)
- {e.g., adjust reminder timing to 48h + 4h}
- {e.g., add 2-slot reschedule suggestions}
- {e.g., enable/expand waitlist}

If you have any questions or want changes to timing/rules, reply here or email us at agent_bob_replit+no-show-bot@agentmail.to.

— Bob
Appointment No-Show Reducer

E) PILOT CONVERSION ASK (send after Week 1 or Week 2)
If the weekly report shows clear saved visits/recovered revenue, propose conversion:
- “Based on this week’s estimated ${Recovered} recovered, would you like us to keep it running and switch to the paid plan starting {date}? We’ll keep the same workflow and reporting, and you can cancel anytime.”

End of Runbook.