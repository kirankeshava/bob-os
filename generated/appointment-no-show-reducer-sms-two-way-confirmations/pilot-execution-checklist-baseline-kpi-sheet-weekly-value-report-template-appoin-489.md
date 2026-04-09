# Pilot Execution Checklist + Baseline KPI Sheet + Weekly Value Report Template (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:34:12.212Z

---

APPOINTMENT NO-SHOW REDUCER — PILOT EXECUTION PACK (CONCIERGE PILOT)

Legitimacy URL (share with clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/Contact Email: agent_bob_replit+no-show-bot@agentmail.to

SECTION A — PILOT EXECUTION CHECKLIST (DAY -3 to DAY 14)

A1) Pre-Flight (Day -3 to Day -1)
1) Pilot Qualification (PASS/FAIL)
- Business has appointment-based revenue with meaningful no-show cost (PASS if avg appt value ≥ $75 OR >10 appts/day).
- Has a workable appointment source of truth (calendar/booking system OR a daily schedule export) (PASS if they can provide schedule reliably).
- Willing to confirm opt-in/consent language for SMS (PASS if they sign off on patient/customer messaging).

2) Intake Fields Collected (REQUIRED)
- Business name, location name, timezone, business hours, closure days.
- Services (or appointment types) + typical duration.
- Reminder policy: when to send (e.g., 24h + 3h), max reminders.
- Confirmation policy: what counts as confirmed, cutoff time.
- Reschedule policy: allowed window, same-day rules, how to propose times.
- Waitlist policy: on/off, max people, how to offer openings.
- Escalation contact: name + phone/email for failures.

3) Compliance + Consent (PASS/FAIL)
- Client approves STOP/HELP language.
- Client confirms they only message customers who have consented to SMS for appointment communications.

A2) Configuration + QA Smoke Test (Day -1)
4) Timezone/DST Correctness (PASS/FAIL)
- Confirm system timezone matches location timezone.
- Create 3 test appointments around boundaries (morning, afternoon, evening).
- If near DST season: create synthetic appointment in the DST transition week.
Expected: reminders send at intended local times, not server time.

5) Message Threading + Identity (PASS/FAIL)
- Confirm outbound messages are consistent sender and include business name.
- Confirm replies map to the correct appointment (by phone + nearest upcoming appt).
Expected: Reply “YES” confirms correct appointment; reply “NO” triggers reschedule flow for that appointment.

6) Opt-Out + Help (PASS/FAIL)
- Reply STOP -> immediately mark phone as opted out; send confirmation of opt-out.
- Reply HELP -> send support info including: agent_bob_replit+no-show-bot@agentmail.to and short instructions.
Expected: no further reminders after STOP.

7) Rule-Based Keyword Overrides (PASS/FAIL)
High-confidence overrides must take precedence over AI intent:
- Confirm: YES, Y, CONFIRM, OK, K, SURE
- Cancel: CANCEL, CXL
- Reschedule: RESCHEDULE, MOVE, CHANGE, LATER, DIFFERENT TIME
- Decline: NO, N
- Opt-out: STOP, UNSUBSCRIBE, END, QUIT
- Help: HELP
Expected: correct routing without “AI uncertainty.” If ambiguous text, route to manual review queue/owner alert.

8) Double-Booking Prevention (PASS/FAIL)
- Attempt reschedule into a time that is already booked.
Expected: system refuses + offers next available times or escalates.

9) Calendar/Source-of-Truth Failure Fail-Safe (PASS/FAIL)
- Simulate API failure / missing schedule fetch.
Expected: (a) do not send confirmations/reminders with stale data; (b) immediately alert owner/escalation contact; (c) log incident with timestamp.

A3) Go-Live (Day 0)
10) Pilot Kickoff Message Review (PASS/FAIL)
- Confirm first reminder copy includes: business name, appointment date/time, simple YES/NO, STOP.
- Confirm links (if any) are correct.

11) Baseline Metrics Captured (REQUIRED)
Collect last 4 weeks (or last 2 weeks if necessary):
- Total scheduled appointments
- No-shows
- Late cancels (define as <24h)
- Average appointment value (or average gross revenue per appointment)
- Existing reminder method (none/manual/automated)

A4) Monitoring + Iteration (Day 1–7)
12) Daily Review (REQUIRED)
- Confirmations count, reschedule count, opt-outs, failures.
- Sample 10 message threads for tone/clarity and misclassification.
- Check incidents: API failures, duplicate sends, incorrect times.

13) Incident Response SLA (REQUIRED)
- Sev 1 (wrong-time messages, opt-out failure, spammy duplicates): mitigate same day; notify client immediately.
- Sev 2 (misclassification, reschedule loop): fix/override within 24–48h.
- Sev 3 (copy tweaks): batch weekly.

A5) Reporting + Conversion (Day 7–14)
14) Weekly Value Report Sent (REQUIRED)
- Send Monday morning covering prior week.
- Include baseline vs pilot delta.

15) Conversion Ask (REQUIRED)
- If metrics show value: propose paid continuation.
- If mixed: propose “Week 2 optimization plan” + extend pilot with defined fixes.


SECTION B — BASELINE KPI SHEET (COPY/PASTE STRUCTURE + FORMULAS)

B1) Inputs (per location)
- Location_Name:
- Timezone:
- Baseline_Period_Days (e.g., 28):
- Baseline_Scheduled_Appts:
- Baseline_NoShows:
- Baseline_LateCancels:
- Avg_Appt_Value_USD:
- Pilot_Week_Scheduled_Appts:
- Pilot_Week_NoShows:
- Pilot_Week_LateCancels:
- Pilot_Week_Confirmed (YES):
- Pilot_Week_Rescheduled (moved successfully):
- Pilot_Week_Waitlist_Fills:

B2) Calculations
- Baseline_NoShow_Rate = Baseline_NoShows / Baseline_Scheduled_Appts
- Pilot_NoShow_Rate = Pilot_Week_NoShows / Pilot_Week_Scheduled_Appts
- NoShow_Rate_Delta = Baseline_NoShow_Rate - Pilot_NoShow_Rate

Recovered appointments estimate (conservative):
- Expected_NoShows_ThisWeek = Baseline_NoShow_Rate * Pilot_Week_Scheduled_Appts
- NoShows_Avoided = MAX(0, Expected_NoShows_ThisWeek - Pilot_Week_NoShows)

Recovered revenue estimate (weekly):
- Revenue_Recovered_NoShows = NoShows_Avoided * Avg_Appt_Value_USD
- Revenue_Recovered_Waitlist = Pilot_Week_Waitlist_Fills * Avg_Appt_Value_USD
- Total_Recovered_Revenue_Weekly = Revenue_Recovered_NoShows + Revenue_Recovered_Waitlist

Quality/engagement:
- Confirmation_Rate = Pilot_Week_Confirmed / Pilot_Week_Scheduled_Appts
- Reschedule_Rate = Pilot_Week_Rescheduled / Pilot_Week_Scheduled_Appts
- OptOut_Rate = OptOuts / Unique_Phones_Messaged (track if available)

Notes column (required): data caveats, holidays, staffing changes.


SECTION C — WEEKLY VALUE REPORT TEMPLATE (EMAIL-READY)

Subject: Weekly No-Show Reduction Report — {Location Name} — Week of {Dates}

Hi {Owner/Manager Name},

Here’s your weekly performance summary from the Appointment No-Show Reducer pilot.
Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

1) Topline impact (this week)
- Scheduled appointments: {Pilot_Week_Scheduled_Appts}
- Confirmed by text (YES): {Pilot_Week_Confirmed}  (Confirmation rate: {Confirmation_Rate})
- Rescheduled successfully (saved slots): {Pilot_Week_Rescheduled}
- Waitlist fills (openings backfilled): {Pilot_Week_Waitlist_Fills}

2) No-show reduction (baseline vs pilot)
- Baseline no-show rate: {Baseline_NoShow_Rate}
- This week no-show rate: {Pilot_NoShow_Rate}
- Estimated no-shows avoided: {NoShows_Avoided}

3) Estimated recovered revenue (conservative)
- From avoided no-shows: ${Revenue_Recovered_NoShows}
- From waitlist fills: ${Revenue_Recovered_Waitlist}
- Total estimated recovered revenue this week: ${Total_Recovered_Revenue_Weekly}

4) Notable customer interactions (examples)
- {Example 1: e.g., “Customer replied ‘Running late’ → rescheduled to 3:30pm and slot was filled.”}
- {Example 2}

5) Reliability + incidents
- Incidents: {0 / list incidents}
- Any follow-ups needed from your team: {None / list}

6) Next week optimization plan
- {Copy tweak / reminder timing adjustment / reschedule rules / waitlist expansion}

If you’d like, we can do a 10-minute review call to go over results and lock in the best reminder timing for your clients.

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to


SECTION D — 30-PROSPECT OUTREACH SEND PLAN (TRACKING FIELDS)

Batch size: 30 prospects over 2 days.
Day 1: 20 emails + 10 LinkedIn DMs. Day 2: follow-up to opens/replies; SMS only if number is publicly posted and consent/compliance is clear.

Tracker fields (one row per prospect):
- Business_Name | Niche | City | Contact_Name | Role | Email | Phone (public?) | LinkedIn URL | Outreach_Channel | Date_Sent | Status (No response / Interested / Call booked / Onboarding / Live / Dropped) | Consent confirmed (Y/N) | Baseline received (Y/N) | Go-live date | Week-1 report sent (Y/N) | Notes

This pack is designed so any positive reply can be onboarded within 24–48 hours, while maintaining safety (STOP/HELP, timezone correctness, fail-safes) and producing credible weekly recovered-revenue proof for sales.
