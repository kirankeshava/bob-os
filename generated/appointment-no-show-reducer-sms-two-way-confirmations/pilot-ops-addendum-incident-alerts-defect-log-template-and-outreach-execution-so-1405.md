# Pilot Ops Addendum: Incident Alerts, Defect Log Template, and Outreach Execution SOP (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:52:46.760Z

---

Below is a ready-to-use addendum to the Pilot Ops/QA Runbook for the Appointment No-Show Reducer (SMS + Two-Way Confirmations). It includes (1) an incident alert/escalation message pack, (2) a defect log template pre-filled with the highest-likelihood pilot edge cases, and (3) a 30-prospect outreach execution SOP.

BUSINESS LEGITIMACY LINKS (include in client comms)
- Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Support/Contact: agent_bob_replit+no-show-bot@agentmail.to

1) INCIDENT ALERT + OWNER ESCALATION MESSAGE PACK
Purpose: If anything critical fails (calendar API errors, SMS delivery issues, reschedule loops), notify the location owner quickly with clear instructions and required context.

1A. Email — Calendar Integration Failure (SEV-1)
Subject: [Action required] Appointment reminder system can’t reach your calendar (fail-safe active)
Body:
Hi {OwnerName},

Quick heads-up: our reminder/confirmation system detected a calendar connection problem at {Timestamp} and has entered fail-safe mode to prevent incorrect messages.

What this means:
- We will NOT send new reminders until the calendar sync is healthy, to avoid wrong times/clients.
- Any incoming client replies (YES/NO/RESCHEDULE/STOP) are being safely logged.

What we need from you:
1) Confirm if any calendar password/token was changed in the last 24 hours.
2) If you can, re-authorize the calendar connection using the same login used at setup.

Context:
- Location: {LocationName}
- Calendar: {CalendarProvider}
- Error: {ErrorMessage}
- Impact window: {StartTime}–{Now}

We’re monitoring closely and will confirm once service is restored.

— Bob (Appointment No-Show Reducer)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

1B. SMS — Calendar Integration Failure (SEV-1)
“Hi {OwnerName} — quick alert from Appointment No-Show Reducer: we can’t reach your calendar right now, so we paused reminders to prevent wrong messages. Please check if your calendar login/authorization changed. Reply ‘CALL’ and I’ll coordinate. Support: agent_bob_replit+no-show-bot@agentmail.to”

1C. Email — High STOP/Complaint Rate (Compliance Risk)
Subject: [Action required] STOP/complaint spike detected — review message wording + consent
Body:
Hi {OwnerName},

We detected an unusual increase in STOP/complaint replies today. To protect deliverability and compliance, we’ve throttled outbound reminders until we confirm consent + wording.

Snapshot:
- STOP rate today: {StopRate}% (normal target <1–2%)
- Most recent message template: {TemplateName}
- Time window: {StartTime}–{EndTime}

Next steps (10 minutes):
1) Confirm patients have opted into SMS reminders (existing consent language is OK; we just need confirmation).
2) Approve one of these safer wordings:
   A) “Reply YES to confirm or NO to reschedule. Reply STOP to opt out.”
   B) “Confirm appointment: reply YES. Need a new time? reply RESCHEDULE. STOP to opt out.”

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

1D. Internal Incident Record (required fields)
- Incident ID:
- Severity (SEV-1/2/3):
- Location:
- Timestamp detected:
- Detection source (monitoring/client reply/log):
- Symptoms:
- Suspected root cause:
- Affected workflows (reminders/confirmations/reschedules/waitlist):
- Mitigation applied (pause/throttle/manual):
- Owner notified (Y/N) + channel:
- Resolution time:
- Verification steps passed:

2) 48-HOUR QA SIMULATION DEFECT LOG TEMPLATE (PRE-FILLED EDGE CASES)
Use this table during internal simulation and live pilots. Copy into Sheets/Notion.

Fields: Defect ID | Area | Scenario | Steps to Reproduce | Expected | Actual | Severity | Workaround | Owner | Status | Verified In

Pre-filled high-likelihood defects to test:
D-001 | Timezone/DST | Appointment created near DST shift; reminder timing off by 1 hour | Create appt at 9am local around DST week; schedule reminder -24h | Reminder sends exactly -24h local | TBD | SEV-1 | Temporarily pin to business TZ; avoid floating timestamps | Eng | Open | 
D-002 | Threading | Client replies “Yes” to older thread after reschedule | Send reminder; reschedule; client replies “YES” from old message | YES applies to latest appt only | TBD | SEV-2 | Include appointment date/time in each message | Eng | Open |
D-003 | Opt-out | Client replies “Stop” / “STOP ALL” with punctuation | Send message; reply “Stop!!!” | Must opt-out immediately and confirm opt-out | TBD | SEV-1 | Rule-based STOP matcher case-insensitive | Eng | Open |
D-004 | Reschedule loop | Client replies “reschedule” repeatedly; system keeps asking questions | Trigger RESCHEDULE; respond with vague text | System should offer a fixed set of options or handoff to staff after N turns | TBD | SEV-2 | Hard cap turns; escalate to owner | Eng/Ops | Open |
D-005 | Double-book prevention | Two patients accept same waitlist opening | Create opening; notify waitlist; both reply YES quickly | Only first confirmed gets slot; second gets apology + alternative times | TBD | SEV-1 | Atomic locking / first-come record | Eng | Open |
D-006 | Calendar failure | Calendar API down; system continues sending reminders with stale data | Simulate API fail; attempt to fetch next day appts | System enters fail-safe pause + alerts owner | TBD | SEV-1 | Pause outbound; log inbound | Eng/Ops | Open |
D-007 | Ambiguous reply | “Ok” / “k” / “sure” misclassified | Reply “sure” to confirmation request | Should map to YES with high confidence or request explicit YES/NO | TBD | SEV-3 | Add keyword synonyms list | Eng | Open |
D-008 | Non-English | Reply in Spanish “sí” | Reply “sí” | Should either confirm or ask for YES/NO in English | TBD | SEV-3 | Add “sí/si” => YES override | Eng | Open |
D-009 | Wrong-number | “Wrong number” reply | Reply “wrong number” | Immediately opt-out + mark invalid + notify owner | TBD | SEV-1 | Add keyword override WRONG NUMBER | Eng/Ops | Open |
D-010 | Quiet hours | Reminder scheduled outside business hours | Set reminder at 6am local | Should defer to allowed window | TBD | SEV-2 | Quiet-hours enforcement | Eng | Open |

3) PILOT SUCCESS METRICS ONE-PAGER (SEND TO PROSPECTS)
Subject line (email): 2-week pilot: reduce no-shows with two-way SMS confirmations (measured weekly)
Body:
Hi {OwnerName},

We run a lightweight 2-week pilot that reduces no-shows by sending smart SMS reminders and collecting two-way confirmations (YES/NO/RESCHEDULE), plus optional waitlist fills.

What we measure (and report every week):
- Confirmation rate (% of appointments that reply YES)
- Reschedules saved (# of patients who would have no-showed but moved to a new time)
- Waitlist fills (# of gaps filled from cancellations)
- Estimated recovered revenue/week (based on your average appointment value)

If anything breaks (calendar sync/SMS delivery), we pause to prevent wrong messages and alert you immediately.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

4) 30-PROSPECT OUTREACH EXECUTION SOP (FREE CHANNELS)
Goal: recruit 2–3 pilots quickly and route positives into kickoff/consent + baseline capture.

4A. Targeting
- Prioritize: dental, physical therapy, chiropractic, med spa, IV therapy, optometry, vet, counseling practices.
- Require: appointment-based, visible phone number, at least 15 appointments/week per location.

4B. Send schedule (per prospect)
Day 1: Email #1 (value + 2-week pilot + metrics + legitimacy URL)
Day 3: Email #2 follow-up (short, 3 lines + book time)
Day 6: LinkedIn DM (if profile found)
Day 8: Final email (close the loop)
SMS: Only if number is publicly posted for business contact and message is strictly business inquiry (no marketing blast). Keep it short and include opt-out line.

4C. Routing rules
- Positive reply => send Pilot Kickoff Email + Consent confirmation + request baseline (last 4 weeks no-show rate + avg appointment value).
- Concern about compliance => send STOP/opt-out explanation and confirm they already have consent for appointment reminders.
- No response after Day 8 => mark ‘No response’ and recycle in 30 days with new subject.

4D. Minimum data needed to go live
- Business timezone + hours
- Reminder timing rules (e.g., 24h + 2h)
- Reschedule options (link/phone or staff handoff)
- Waitlist enablement (Y/N) and max offers per opening
- Escalation contact (owner cell + email)

This addendum is ready to paste into your runbook and use immediately as soon as the first pilot says yes.