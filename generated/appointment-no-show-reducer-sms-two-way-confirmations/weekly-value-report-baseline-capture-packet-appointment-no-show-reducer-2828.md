# Weekly Value Report + Baseline Capture Packet (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:21:38.773Z

---

Below are two ready-to-send templates: (1) a Baseline Capture Sheet to complete during onboarding (Day 0), and (2) a Weekly Value Report (send every 7 days). These are written to be client-facing, quantify recovered revenue, and reinforce legitimacy by referencing the website URL https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 and support email agent_bob_replit+no-show-bot@agentmail.to.

============================
1) BASELINE CAPTURE SHEET (Day 0)
============================
Subject: Quick baseline questions (so we can prove results in Week 1)

Hi {{OwnerName}},

Before we turn on the Appointment No-Show Reducer, we capture a simple baseline so your Week 1 report shows a clear before/after impact.

Legitimacy link (overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

A) Location details
- Business name / location name: {{BusinessName}}
- Timezone: {{Timezone}}
- Business hours (by day): {{Hours}}
- Primary service types (top 3): {{Services}}

B) Appointment baseline (last 4 weeks, best estimate is OK)
- Total scheduled appointments: {{ApptCount4w}}
- No-shows (count or %): {{NoShowCountOrRate4w}}
- Late cancels (<24h) (count or %): {{LateCancelCountOrRate4w}}
- Average appointment value ($): {{AvgTicket}}
- Typical lead time (same day / 1–3 days / 4–7 / 8+): {{LeadTime}}

C) Current reminder process
- Do you send reminders today? (Y/N). If yes: SMS/email/calls? {{CurrentReminders}}
- Reminder timing (e.g., 24h + 2h): {{ReminderTiming}}
- Do you require confirmation? (Y/N). If yes, how? {{CurrentConfirmProcess}}
- Current reschedule process (how do clients do it today?): {{RescheduleProcess}}

D) Pilot goal settings (Week 1)
- What counts as success to you? (e.g., “reduce no-shows by 20%”, “fill 3 cancellations/week”): {{SuccessDefinition}}
- Preferred confirmation language: “Reply YES to confirm” or “Reply C to confirm” etc.: {{PreferredCopy}}
- Escalation contact if anything looks off (name + mobile + email): {{EscalationContact}}

Reply to this email with answers, or paste what you have—partial data is fine.

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to


============================
2) WEEKLY VALUE REPORT (send every 7 days)
============================
Subject: Week {{WeekNumber}} results — confirmations, saved appointments, and estimated recovered revenue

Hi {{OwnerName}},

Here’s your weekly Appointment No-Show Reducer report for {{LocationName}} covering {{StartDate}}–{{EndDate}}.

Overview / legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

1) Executive summary (1 minute)
- Appointments with reminders sent: {{RemindersSent}}
- Confirmed (two-way): {{ConfirmedCount}} ({{ConfirmedRate}}%)
- Rescheduled (before becoming a no-show): {{RescheduledCount}}
- Cancellations captured early: {{CancelCount}}
- Waitlist fills completed: {{WaitlistFills}}
- Opt-outs: {{OptOutCount}} ({{OptOutRate}}% of recipients)

2) Estimated revenue impact (conservative)
Baseline (from your last 4 weeks):
- Baseline no-show rate: {{BaselineNoShowRate}}%
- Avg appointment value: ${{AvgTicket}}

This week observed:
- No-show rate on reminded appointments: {{PilotNoShowRate}}%
- Estimated no-shows avoided: {{NoShowsAvoided}}

Recovered revenue estimate (conservative):
- (No-shows avoided x avg appointment value) = {{NoShowsAvoided}} x ${{AvgTicket}} = ${{RecoveredRevenueFromAvoidedNoShows}}
- (Waitlist fills x avg appointment value) = {{WaitlistFills}} x ${{AvgTicket}} = ${{RecoveredRevenueFromWaitlistFills}}
- Total estimated recovered revenue this week: ${{RecoveredRevenueTotal}}

Note: This is intentionally conservative and only counts appointments we can tie directly to confirmations/reschedules/fills.

3) Notable conversations (examples)
- Confirmations that prevented ambiguity: {{ExampleThread1}}
- Reschedule flow that saved an appointment: {{ExampleThread2}}
- Any escalations / edge cases: {{ExampleThread3}}

4) Reliability / safety checks
- Calendar sync health: {{CalendarHealth}} (OK / degraded / outage)
- Delivery health (SMS): {{DeliveryHealth}} (OK / issues)
- Owner alerts triggered: {{AlertCount}} ({{AlertSummary}})
- Compliance: STOP handled within 1 message? {{StopComplianceYesNo}}

5) Next-week optimization (pick 1–3)
- Adjust reminder timing (e.g., 24h + 3h) to increase confirmations
- Add/clean waitlist list so gaps fill faster
- Update reschedule rules (same-day cutoff, offer next 3 slots)
- Improve message wording for your tone/brand

If you want, we can do a 10-minute check-in and tune timing + wording based on replies we saw this week.

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to


============================
3) PILOT ANALYTICS EVENT CHECKLIST (internal, but shareable on request)
============================
To generate the weekly report, ensure these events are captured per location with timestamps + appointment IDs:
- reminder_sent (with scheduled time, template version)
- delivered / failed_delivery (error code)
- inbound_reply_received (raw text)
- parsed_intent (confirm/cancel/reschedule/stop/help/unknown)
- confirmation_recorded (yes/no)
- reschedule_initiated / reschedule_completed (old time/new time)
- cancellation_recorded
- waitlist_offered / waitlist_accepted / waitlist_filled
- opt_out (STOP) and confirmation of opt-out
- escalation_alert_sent (reason: calendar_error, ambiguous_reply, double_book_risk, etc.)

This packet is designed so every pilot produces measurable proof within 7 days and a repeatable report format that supports conversion to paid.