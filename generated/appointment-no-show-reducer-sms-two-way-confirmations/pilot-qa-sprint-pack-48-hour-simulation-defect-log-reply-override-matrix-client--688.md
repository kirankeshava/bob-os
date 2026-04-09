# Pilot QA Sprint Pack (48-Hour Simulation + Defect Log + Reply Override Matrix + Client Comms Templates)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:33:26.673Z

---

# Pilot QA Sprint Pack — Appointment No-Show Reducer

## 1) 48-Hour QA Simulation Plan (run before/alongside first pilots)
**Goal:** Validate reliability + message quality + measurable outcomes with edge cases before scaling installs.

### Test data setup (synthetic)
Create 30 appointments across:
- Timezones: America/New_York, America/Chicago, America/Los_Angeles
- Business hours: one location 9–5, one 10–7, one weekend-heavy
- Appointment types: 30-min consult, 60-min service, “must-confirm” type
- Lead times: same-day, next-day, 7-day out

### Core scenarios (expected outcome)
1. **Timezone correctness:** Reminder send time matches location timezone (not server timezone). 
2. **DST boundary:** Appointments spanning DST change still send at correct local time.
3. **Two-way confirmation threading:** Replies attach to the correct appointment thread.
4. **YES confirmation:** Marks confirmed; no further “please confirm” prompts.
5. **NO / can’t make it:** Triggers reschedule flow and frees slot.
6. **RESCHEDULE keyword:** Offers next available times OR requests preferred times.
7. **Late reply:** Reply after appointment start triggers “too late” handling + owner alert option.
8. **Double-book prevention:** If user tries to reschedule into occupied slot, system rejects and offers alternatives.
9. **Calendar update failures:** If calendar API fails (create/update/cancel), system alerts owner with manual steps.
10. **Opt-out STOP:** Immediately suppresses future messages and confirms opt-out.
11. **HELP:** Returns compliant help text + support email.
12. **Waitlist fill:** When cancellation occurs, message next waitlist contact(s) and book first confirmer.

### Pass/Fail rules
- **P0 fail:** Any STOP not honored immediately; wrong recipient/threading; incorrect timezone causing missed/early reminders; calendar failures without owner alert.
- **P1 fail:** Reschedule loop; duplicate/conflicting confirmations; unclear/confusing messaging.
- **P2 fail:** Analytics counters wrong or missing; minor copy issues.

---

## 2) Defect / Incident Log Template (copy-paste)
Use this to log internal simulation issues and live pilot incidents.

**Record ID:** 
**Date/Time (UTC + local):** 
**Location:** 
**Severity:** P0 / P1 / P2
**Category:** Timezone/DST | Threading | Opt-out | Calendar | Reschedule | Waitlist | Analytics | Copy/UX | Other
**Environment:** Simulation | Pilot Live
**Reproduction steps:**
1)
2)
3)
**Expected result:**
**Actual result:**
**Impact (customer-facing?):** Yes/No (describe)
**Immediate mitigation (concierge action):**
**Owner notified (Y/N) + how:** 
**Root cause hypothesis:**
**Fix owner:** 
**Fix status:** Open | In progress | Waiting | Fixed | Verified
**Verification steps:**
**Verification result:** Pass/Fail
**Notes / links:**

---

## 3) Deterministic Reply Override Matrix (high-confidence routing)
**Purpose:** Reduce AI misclassification risk during pilots. Apply these rules BEFORE any AI intent parsing.

### Global rules (apply first)
1. **STOP / UNSUBSCRIBE / CANCEL SMS / END / QUIT** (case-insensitive, ignore punctuation)
   - Action: Set contact to **opted_out=true** immediately.
   - Response: “You’re opted out and won’t receive texts from us. Reply START to re-subscribe. Support: agent_bob_replit+no-show-bot@agentmail.to”
   - Log: opt_out_event

2. **HELP / INFO**
   - Action: Send help text.
   - Response: “This is an automated appointment reminder/confirmation. Reply YES to confirm, NO to cancel, or RESCHEDULE to pick a new time. To opt out, reply STOP. Support: agent_bob_replit+no-show-bot@agentmail.to”

### Confirmation intents
3. **Affirm / Confirm**
   - Match examples: YES, Y, YEA, YEP, CONFIRM, CONFIRMED, OK, OKAY, I’LL BE THERE, SEE YOU
   - Action: Mark appointment **confirmed**.
   - Response: “Confirmed—see you {Day} at {Time}. If you need to reschedule, reply RESCHEDULE. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2”

4. **Negative / Can’t make it**
   - Match: NO, N, CAN’T, CANT, WON’T, NOT COMING, CANCEL, NEED TO CANCEL
   - Action: If policy allows, **cancel** and offer reschedule; else route to concierge.
   - Response: “No problem. Reply RESCHEDULE to choose a new time, or tell us what day/time works.”

### Reschedule intents
5. **RESCHEDULE / MOVE / CHANGE TIME / DIFFERENT TIME**
   - Action: Start reschedule flow (offer next 3 slots or ask preference).
   - Response: “Sure—what works best? Reply with a day/time, or choose: (1) {slot1} (2) {slot2} (3) {slot3}.”

### Ambiguity / escalation rules
6. If message contains **profanity, threats, legal language, or payment disputes** → **Escalate to owner/concierge**, do not attempt AI.
7. If message length > 240 chars OR contains multiple intents (“yes but can we move it”) → Use AI parsing but require **high confidence**; otherwise ask a clarifying question.
8. If appointment is within **<2 hours** and any reschedule/cancel intent occurs → alert owner + provide manual handling steps.

---

## 4) Client Comms Templates (use during pilots)

### A) Pilot Daily Monitoring Update (Day 1–7) — email
**To:** Owner/Manager
**Subject:** Daily Pilot Update — confirmations, reschedules, and any issues (Day {N})

Hi {Name},

Quick daily check-in on the Appointment No-Show Reducer pilot.

**Today’s activity (local time {TZ}):**
- Reminders sent: {#}
- Confirmations received: {#} ({%})
- Reschedules completed: {#}
- Cancellations: {#}
- Waitlist fills: {#}

**Notes / exceptions:**
- {Any threading/timezone/reschedule issues}
- {Any opt-outs and how they were handled}

**If you need anything:** reply here or email support at agent_bob_replit+no-show-bot@agentmail.to.

Reference page (for your team): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Thanks,
Bob

### B) Calendar Failure Alert (owner escalation)
**Subject:** ACTION NEEDED: Calendar update failed for {ClientName} {ApptDateTime}

Hi {Name},

We attempted to {create/update/cancel} an appointment but the calendar integration returned an error.

**Appointment:** {ClientName}, {Service}, {LocalDateTime} ({TZ})
**Requested change:** {details}
**Error:** {error_summary}

**What to do now (manual workaround):**
1) Update the appointment in your calendar manually.
2) Reply “DONE” and we will confirm the client by text.

Support: agent_bob_replit+no-show-bot@agentmail.to
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

—Bob

---

## 5) Week-1 Pilot Results One-Pager (sales-proof structure)
**Title:** Week 1 Results — {Business Name} ({Location})

**Baseline (previous 4 weeks):**
- Avg weekly appointments: {#}
- No-show rate: {#%}
- Avg revenue per appointment: ${#}

**Week 1 with Appointment No-Show Reducer:**
- Reminders sent: {#}
- Confirmation rate: {#%}
- Reschedules saved (would-have-been no-shows): {#}
- Waitlist fills: {#}
- No-shows observed: {#} ({#%})

**Estimated recovered revenue (Week 1):**
- (Baseline expected no-shows – Actual no-shows + Waitlist fills) × Avg revenue/appt
- Estimated recovered revenue: **${#}**

**What we improved:**
- Faster confirmations, fewer last-minute surprises, and fewer dead slots.

**Next step:**
If you’d like to continue, we’ll keep this running and send a weekly report every Monday. Reply “GO” and we’ll convert you to the standard plan.

Support: agent_bob_replit+no-show-bot@agentmail.to | Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
