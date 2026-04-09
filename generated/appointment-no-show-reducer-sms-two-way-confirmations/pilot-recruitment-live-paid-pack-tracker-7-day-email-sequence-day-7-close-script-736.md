# Pilot Recruitment → Live → Paid Pack (Tracker + 7-Day Email Sequence + Day-7 Close Script)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:33:11.618Z

---

Below is a paste-ready pack to recruit, activate, and convert 2–3 concierge pilots for Appointment No-Show Reducer.

====================================================
1) PILOT RECRUITMENT + ACTIVATION TRACKER (copy into a spreadsheet)
====================================================
Columns:
A. Business Name
B. Niche (med spa / dental / PT / salon / etc.)
C. Location/Timezone
D. Decision Maker Name + Title
E. Email
F. Phone
G. Source (Google/website/referral)
H. Stage (Prospecting / Contacted / Replied / Call Booked / Qualified / Onboarding Sent / Baseline Received / Configured / QA Passed / Live Pilot / Day 3 Check / Day 7 Report Sent / Close Call Booked / Converted Paid / Lost)
I. Qualification Notes (volume, no-show pain, ability to text)
J. Baseline Required (Y/N)
K. Baseline: last 4 weeks total appts
L. Baseline: last 4 weeks no-shows
M. Baseline: show rate %
N. Avg appointment value ($)
O. Estimated weekly no-show cost ($) = (No-shows/4)*AvgValue
P. Consent/Opt-in Confirmed (Y/N + notes)
Q. Reminder Timing Rules (e.g., 48h + 3h)
R. Two-way Keywords Enabled (YES/CONFIRM, NO, RESCHEDULE, STOP)
S. Reschedule Policy (min notice, allowed windows)
T. Waitlist Enabled (Y/N) + rules
U. Owner Escalation Contact (email + phone)
V. Integration Type (manual CSV / calendar API / receptionist workflow)
W. QA Gate Status (Timezone/DST OK; Threading OK; STOP/HELP OK; Fail-safe alert OK)
X. Go-Live Date
Y. Pilot Week Notes (incidents/edge cases)
Z. Outcome Week 1: confirmations
AA. Outcome Week 1: reschedules
AB. Outcome Week 1: waitlist fills
AC. Outcome Week 1: est recovered revenue ($)
AD. Testimonial Requested (Y/N)
AE. Paid Plan Selected + Start Date

Baseline backfill method if they can’t export:
- Ask front desk to estimate (or sample) last 10 business days: scheduled vs. no-shows; extrapolate weekly.
- Capture avg appointment value from price list or typical ticket.
- Mark as “estimated” in notes; replace with export once available.

====================================================
2) 7-DAY PILOT KICKOFF EMAIL SEQUENCE (ready to send)
====================================================
From: agent_bob_replit+no-show-bot@agentmail.to
Legitimacy URL to include when helpful: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

-----
Email #0 (Immediately after onboarding call) — Subject: Your no-show reduction pilot — next steps + go-live checklist
Hi {{Name}},

Excited to kick off the 7-day pilot for {{Business}}. Here are the next steps to go live safely and measure results:

1) Baseline numbers (last 4 weeks if available):
- Total appointments scheduled
- Number of no-shows
- Typical $ value per appointment (average ticket)

2) Rules we’re using (reply OK with any edits):
- Reminder timing: {{48h + 3h (example)}}
- Two-way replies enabled: YES/CONFIRM, NO, RESCHEDULE
- Opt-out keywords honored immediately: STOP (and HELP support)

3) Escalation contact (so we never get stuck):
- Best email + phone if anything looks wrong in the schedule

We’ll send you a simple weekly value report showing confirmations, reschedules, and estimated recovered revenue.

If you need anything in the meantime, reply here: agent_bob_replit+no-show-bot@agentmail.to
(Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 )

— Bob

-----
Email #1 (Day 1 morning) — Subject: Pilot is live — what to watch for today
Hi {{Name}},

We’re live for Day 1.

Today’s quick checks:
- Confirm reminders are going out at the expected times for your timezone.
- If a client replies STOP, they should be opted out immediately.
- If a client replies RESCHEDULE, we’ll capture intent and route per your rule (automated options or escalation).

If you see anything off (wrong time, wrong patient/client, duplicate messages), email me immediately and we’ll pause messages while we fix: agent_bob_replit+no-show-bot@agentmail.to

— Bob

-----
Email #2 (Day 2) — Subject: Quick question: any edge cases so far?
Hi {{Name}},

Any weird replies or scheduling edge cases so far? Examples:
- “Running late”
- “Can I come tomorrow?”
- “I already canceled”

Forward anything you see; we use these to harden the automation (rule-based overrides + safer fallbacks).

— Bob (agent_bob_replit+no-show-bot@agentmail.to)

-----
Email #3 (Day 3) — Subject: Mid-week checkpoint — early numbers
Hi {{Name}},

Mid-week checkpoint. So far we’re tracking:
- Confirmations: {{#}}
- Reschedules: {{#}}
- Opt-outs (STOP): {{#}}
- Any incidents: {{none / summary}}

If you can share how many no-shows you saw in the last 2 days (even a rough count), I’ll add it to the week-1 recovered revenue estimate.

— Bob

-----
Email #4 (Day 5) — Subject: Waitlist/gap fills — do you want us to run this?
Hi {{Name}},

If you have cancellations creating gaps, we can fill from a waitlist during the pilot.

Reply with:
1) YES — enable waitlist fills
2) NO — confirmations + reschedules only

If YES, tell me:
- Which services/time blocks are eligible
- How much notice is required

— Bob

-----
Email #5 (Day 7 morning) — Subject: Week-1 report coming today (confirm best time)
Hi {{Name}},

Today’s Day 7. I’ll send the Week-1 value report showing confirmations, reschedules, any gap fills, and estimated recovered revenue.

What’s the best time today for a 10-minute review + next steps?

— Bob

-----
Email #6 (Day 7 after report) — Subject: Week-1 results + next step (keep it running?)
Hi {{Name}},

Attached/Below is your Week-1 pilot report.

If you want to keep the system running, reply “KEEP GOING” and we’ll convert you from pilot to paid and continue sending weekly reports.

Support: agent_bob_replit+no-show-bot@agentmail.to
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob

====================================================
3) DAY-7 PILOT CLOSE CALL SCRIPT (10 minutes)
====================================================
Goal: convert to paid using measurable recovered revenue + reliability proof.

1) Set agenda (30 sec)
“Thanks for doing the pilot. I’ll recap week-1 results, confirm anything that felt off, then align on keeping it running going forward.”

2) Re-state baseline (1 min)
“Before the pilot, your baseline was roughly {{no-shows/week}} no-shows/week and average appointment value about ${{value}}, so no-shows were costing about ${{baseline_cost}}/week.”

3) Present week-1 outcomes (2 min)
“This week we saw:
- {{confirmations}} confirmations
- {{reschedules}} reschedules (prevented likely no-shows)
- {{waitlist_fills}} gap fills
Estimated recovered revenue: ${{recovered}} for the week.”

4) Reliability + safety (1 min)
“We also honored STOP immediately, handled HELP, and we have fail-safes: if calendar integration fails or messages can’t be delivered, you get an alert and we pause rather than spam clients.”

5) Ask for decision (2 min)
“Do you want to keep it running? If yes, we’ll start the paid plan on {{date}} and continue the weekly report so you can see ROI every week.”

6) Objection handlers (2 min)
- Price: “If we recover even 1–2 appointments/week, it pays for itself. We’ll keep reporting that weekly.”
- Control: “You can change timing/rules any time. And you can pause instantly.”
- Staff workflow: “We can route reschedules to your preferred channel—text thread, email, or receptionist queue.”

7) Close + testimonial (1 min)
“Great — I’ll send a simple confirmation email. Also, if this saved you even a couple of appointments, can I use a 1–2 sentence testimonial? I’ll draft it for approval.”

====================================================
This pack is designed to get 2–3 pilots live quickly, reduce pilot churn, and produce week-1 measurable proof for sales.
