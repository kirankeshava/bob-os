# Pilot QA: 48-hour Simulation Defect Log + SMS Parsing Rules + Daily Monitoring SOP + Pilot Recruitment Email Sequence

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:36:39.891Z

---

Below are pilot-ready operational artifacts to (1) catch edge cases fast, (2) prevent reply-parsing mistakes during pilots, (3) monitor live pilots safely, and (4) recruit pilot locations. Legitimacy URL to share with prospects: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2  | Support: agent_bob_replit+no-show-bot@agentmail.to

1) 48-HOUR QA SIMULATION DEFECT LOG (copy/paste into Sheet/Notion)
Fields:
- Defect ID: (SIM-001…)
- Date/Time detected:
- Environment: (staging/pilot), Business/location:
- Timezone under test:
- Scenario: (DST shift, late confirmation, reschedule loop, STOP, double-book, calendar API fail, etc.)
- Severity: S0 (critical: could send wrong msg/violate opt-out), S1 (high: missed reminders/incorrect status), S2 (medium: confusing UX), S3 (low: copy/format)
- Steps to Reproduce: numbered steps with exact sample messages and timestamps
- Expected Result:
- Actual Result:
- Impact: (how many patients/appointments affected)
- Mitigation (immediate): (pause messages, manual confirmation, switch to fallback, etc.)
- Root Cause Hypothesis:
- Owner:
- Status: Open / In Progress / Mitigated / Fixed / Verified
- Fix Verification Steps:
- Notes/Attachments: (screenshots, logs, message thread IDs)

2) RULE-BASED SMS REPLY PARSING MATRIX (use as overrides before AI)
Precedence order (highest first): OPT-OUT > HELP/INFO > RESCHEDULE > CANCEL > CONFIRM > NEGATIVE.
A) OPT-OUT / STOP (Always honor, no AI needed)
- Match (case-insensitive, trim punctuation): STOP, STOPALL, UNSUBSCRIBE, CANCEL (when used as opt-out), END, QUIT.
- Also match phrases: “stop texting”, “don’t text”, “remove me”, “opt out”.
Action: mark phone as opted-out immediately; send one confirmation: “You’re opted out and will no longer receive texts.” No further messages.

B) HELP / INFO
- Match: HELP, INFO, SUPPORT, “who is this”, “what is this”, “why am I getting this”.
Action: send help message with business name + contact + legitimacy link (if appropriate) and stop further automation until user replies with confirm/reschedule.

C) CONFIRM (YES)
- Strong matches: YES, Y, YEP, YEAH, OK, K, CONFIRM, CONFIRMED, I’LL BE THERE, “see you”, “sounds good”.
- Edge: “Yes but I’ll be 10 min late” => treat as CONFIRM + note “late”.
Action: mark appointment confirmed; optionally notify staff if “late” detected.

D) NEGATIVE (NO)
- Strong matches: NO, N, NOPE, CAN’T, CANNOT, WON’T MAKE IT, NOT COMING.
If message contains scheduling intent words (tomorrow/next week/another time) => route to RESCHEDULE.
Action: if no reschedule intent, offer quick reschedule link/options; do not cancel automatically unless policy says.

E) RESCHEDULE
- Match: RESCHEDULE, CHANGE, MOVE, “another time”, “different day”, “push it”, “need to reschedule”.
- Also: “Can we do Tuesday instead?” (day-of-week detection).
Action: switch thread to reschedule flow; present 2–3 slots or ask preferred times; lock current slot until confirmed (to prevent double-book).

F) CANCEL (appointment cancel, not opt-out)
- Match: “cancel my appointment”, “please cancel”, “I need to cancel”.
Guardrail: if user text is exactly “CANCEL” alone, treat as OPT-OUT (safer) unless business explicitly wants CANCEL=cancel appt.
Action: confirm cancellation intent: “Do you want to cancel just this appointment (reply 1) or stop all texts (reply 2)?”

G) Ambiguous / Unknown
- If no rule matches: route to AI intent parsing, but with safe fallback: ask a clarifying question: “Reply YES to confirm, or RESCHEDULE to change your time.”

3) DAILY PILOT MONITORING SOP (concierge operations)
Frequency: 2 checks/day during first 7 days (morning + late afternoon). After stability: daily.
Checklist:
A) Message delivery health
- Review outbound queue: any failed sends? (carrier errors, invalid numbers)
- Confirm reply threading: replies linked to correct appointment and patient.
- Spot-check 10 random message threads for correct personalization and appointment details.

B) Timezone/DST correctness
- Verify today’s reminders are scheduled in location timezone.
- Run one “known appointment” spot-check: appointment at 3pm local should not message at 3pm UTC.
- If DST week: run two sample appointments across boundary.

C) Opt-out compliance audit (non-negotiable)
- Confirm STOP/opt-out numbers received zero additional reminders.
- Verify opt-out confirmation message sent once.

D) Calendar reliability + fail-safes
- Check calendar sync status: last successful sync timestamp.
- If calendar API fails: immediately (1) pause automation for that location if risk of wrong reminders, (2) email owner escalation contact with clear next steps.
Owner alert email subject line: “Action needed: Appointment reminders paused (calendar sync error)”

E) Double-booking prevention
- During reschedule flows: ensure original slot stays reserved until new slot confirmed OR explicit cancel is processed.
- Confirm staff notified if a reschedule request is pending > 30 minutes.

F) Incident thresholds (trigger escalation)
- S0 incident: any opt-out violation, wrong patient info, wrong appointment time/date sent => pause automation + notify owner within 15 minutes.
- S1 incident: reminders not sending for >2 hours, reschedule loop, mis-threaded replies => mitigate within same business day.

4) PILOT RECRUITMENT EMAIL SEQUENCE (ready to send)
Target: appointment-based SMBs (dental, medspa, PT, chiro, salons, clinics). Offer: concierge pilot with measurable baseline.

Email 1 (initial)
Subject: Quick pilot to cut no-shows at {{BusinessName}} (two-way SMS confirmations)
Hi {{FirstName}},
I’m Bob. We’re running a small pilot of a two-way SMS reminder + confirmation system that reduces appointment no-shows by collecting confirmations, handling reschedule replies, and optionally filling gaps from a waitlist.

Here’s our product page for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

If you’re open to it, we’ll set up a 7–14 day concierge pilot for {{BusinessName}}:
- Smart reminders (in your timezone)
- Two-way replies (YES/NO/RESCHEDULE) with safety rules
- Weekly report showing confirmations, reschedules saved, and estimated recovered revenue

All I need to confirm fit is:
1) What scheduling system/calendar you use
2) Rough weekly appointment volume
3) Your current no-show % (even a guess)

Want to do a 15-minute kickoff this week?
– Bob
agent_bob_replit+no-show-bot@agentmail.to

Email 2 (follow-up, +2 days)
Subject: Re: two-way confirmations pilot for {{BusinessName}}
Hi {{FirstName}},
Checking in—if no-shows or late cancellations are costing you even a few appointments/week, a lightweight SMS confirmation flow usually pays for itself quickly.

If you reply with:
- your timezone,
- typical appointment value,
- and your reminder timing preference (e.g., 24h + 2h),
I can outline exactly what your first-week report will measure.

Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to
– Bob

Email 3 (breakup, +5 days)
Subject: Should I close the loop?
Hi {{FirstName}},
No worries if now isn’t a priority. Should I close the loop, or is reducing no-shows something you’d like to revisit later?

If you want, reply with just “pilot” and I’ll send a 3-question intake.
– Bob
agent_bob_replit+no-show-bot@agentmail.to

These artifacts are designed to get 2–3 pilots live safely while producing clean, credible metrics (confirmation rate, reschedules saved, waitlist fills, estimated recovered revenue) for sales proof.
