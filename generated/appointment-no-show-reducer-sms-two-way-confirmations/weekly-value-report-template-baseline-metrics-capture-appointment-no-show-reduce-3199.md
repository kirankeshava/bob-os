# Weekly Value Report Template + Baseline Metrics Capture (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:41:35.940Z

---

Below is a copy-ready weekly report template (email + report body) and a baseline metrics capture sheet you can use for each pilot location. Send from: agent_bob_replit+no-show-bot@agentmail.to. Include legitimacy URL in every client-facing message: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

========================
A) CLIENT EMAIL (WEEKLY)
========================
Subject: [Weekly Results] No-Show Reduction + Recovered Revenue — Week of {{START_DATE}}–{{END_DATE}}

Hi {{OWNER_NAME}},

Here’s your weekly Appointment No-Show Reducer results for {{LOCATION_NAME}}.

Legitimacy link (overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

SUMMARY (THIS WEEK)
• Appointments scheduled: {{APPTS_SCHEDULED}}
• Reminders sent: {{REMINDERS_SENT}}
• Two-way confirmations received: {{CONFIRMATIONS}}
• Confirm rate: {{CONFIRM_RATE}}%
• Reschedules completed (saved from no-show): {{RESCHEDULES}}
• Waitlist fills (gaps filled): {{WAITLIST_FILLS}}
• Opt-outs: {{OPTOUTS}} ({{OPTOUT_RATE}}%)

ESTIMATED IMPACT
• Baseline no-show rate: {{BASELINE_NOSHOW_RATE}}% (from {{BASELINE_WEEKS}}-week history)
• Estimated no-show rate this week: {{PILOT_NOSHOW_RATE}}%
• No-shows avoided (estimated): {{NOSHOWS_AVOIDED_EST}}
• Average appointment value: ${{AVG_APPT_VALUE}}
• Estimated recovered revenue (this week): ${{RECOVERED_REV_THIS_WEEK}}

NOTES / HIGHLIGHTS
• Top customer responses: “{{TOP_REPLY_EXAMPLES}}”
• Any exceptions handled: {{EXCEPTIONS_SUMMARY}} (e.g., after-hours, reschedule loops, calendar sync issues)

NEXT WEEK: RECOMMENDATIONS
1) {{RECOMMENDATION_1}} (e.g., adjust reminder timing from 24h+2h to 48h+4h)
2) {{RECOMMENDATION_2}} (e.g., enable waitlist offers for cancellations within 24h)

If you reply with “OK”, we’ll keep the same settings for next week. If you want changes, tell us:
• Reminder timing changes
• Which appointment types should/shouldn’t get SMS
• Any phrases you want treated as “confirm” or “reschedule”

— Bob
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to


=====================================
B) ATTACHED REPORT BODY (PASTEABLE)
=====================================
WEEKLY VALUE REPORT — {{LOCATION_NAME}}
Week: {{START_DATE}}–{{END_DATE}}

1) Funnel Metrics
- Appointments scheduled: {{APPTS_SCHEDULED}}
- Reminders sent: {{REMINDERS_SENT}}
- Delivered successfully: {{DELIVERED}} ({{DELIVERY_RATE}}%)
- Two-way confirmations: {{CONFIRMATIONS}} ({{CONFIRM_RATE}}%)
- Negative confirmations (can’t make it): {{CANNOT_MAKE_IT}}
- Reschedules completed: {{RESCHEDULES}}
- Cancellations: {{CANCELLATIONS}}
- Waitlist fills: {{WAITLIST_FILLS}}
- Opt-outs: {{OPTOUTS}} ({{OPTOUT_RATE}}%)

2) Operational Quality (Reliability)
- Threads requiring manual intervention: {{MANUAL_INTERVENTIONS}}
- Errors detected (calendar/API/message): {{ERROR_COUNT}}
- Downtime/incident minutes: {{INCIDENT_MINUTES}}
- Notes: {{RELIABILITY_NOTES}}

3) Estimated Revenue Impact
Inputs:
- Baseline no-show rate: {{BASELINE_NOSHOW_RATE}}%
- Average appointment value: ${{AVG_APPT_VALUE}}
- Appointments scheduled: {{APPTS_SCHEDULED}}
Calculations (simple, conservative):
- Baseline expected no-shows = {{APPTS_SCHEDULED}} * {{BASELINE_NOSHOW_RATE}}
- Pilot estimated no-shows = {{APPTS_SCHEDULED}} * {{PILOT_NOSHOW_RATE}}
- No-shows avoided (est.) = max(0, baseline expected no-shows − pilot estimated no-shows)
- Recovered revenue (est.) = no-shows avoided * avg appointment value
Outputs:
- No-shows avoided (est.): {{NOSHOWS_AVOIDED_EST}}
- Recovered revenue (est.): ${{RECOVERED_REV_THIS_WEEK}}

4) What We Changed This Week
- {{CHANGELOG_ITEM_1}}
- {{CHANGELOG_ITEM_2}}

5) Next Week’s Plan
- {{NEXT_WEEK_PLAN_1}}
- {{NEXT_WEEK_PLAN_2}}


====================================
C) BASELINE METRICS CAPTURE (SHEET)
====================================
Create one row per location. Ask the owner for the last 4 weeks if possible.

FIELDS TO COLLECT (PRE-PILOT)
1. Location name:
2. Timezone:
3. Appointment types included (and excluded):
4. Business hours:
5. Average appointment value ($):
6. Appointments scheduled per week (avg):
7. No-shows per week (avg):
8. No-show rate baseline (%) = (no-shows / scheduled) * 100
9. Cancellations per week (avg):
10. Typical lead time (days between booking and appointment):
11. Current reminder method (if any):
12. Reschedule policy (how close to appt allowed):
13. Waitlist available? (Y/N). If yes, how many on waitlist weekly?

DURING PILOT (WEEKLY)
A. Appointments scheduled:
B. Reminders sent:
C. Confirmations:
D. Can’t-make-it replies:
E. Reschedules completed:
F. Waitlist fills:
G. Opt-outs:
H. Pilot no-show count:
I. Pilot no-show rate (%) = (pilot no-shows / scheduled) * 100

CONSERVATIVE ROI FORMULA (WEEKLY)
- Baseline expected no-shows = A * baseline no-show rate
- No-shows avoided = max(0, baseline expected no-shows − pilot no-show count)
- Recovered revenue = no-shows avoided * average appointment value

NOTES ON ATTRIBUTION (KEEP SIMPLE)
- Count as “saved” when: a customer replies they can’t make it and successfully reschedules OR a canceled slot is filled from waitlist.
- Avoid over-claiming: if baseline data is weak, report ranges (low/likely/high) using baseline min/avg/max from the last 4 weeks.


====================================
D) DAILY PILOT OPS + INCIDENT LOG (FORMAT)
====================================
Use this as a running doc per location.

DAILY CHECKLIST (5–10 minutes)
- Delivery health: delivery rate, failed sends, carrier blocks
- STOP/HELP compliance: verify immediate suppression and help response
- Thread review: any ambiguous replies needing rule-based override updates
- Calendar sync: any mismatch between appointment status and messages sent
- Reschedule loop prevention: ensure no infinite back-and-forth
- Owner alerts: verify alerts sent if calendar/API failure occurs

INCIDENT LOG FIELDS
- Date/time (with timezone):
- Location:
- Severity: S1 (customer-facing outage), S2 (major degradation), S3 (minor), S4 (cosmetic)
- Symptom:
- Steps to reproduce:
- Expected vs actual:
- Impacted count (# appointments / # customers):
- Root cause (if known):
- Mitigation/workaround:
- Fix implemented (yes/no) + commit/patch reference:
- Verification steps + result:
- Preventative follow-up:
