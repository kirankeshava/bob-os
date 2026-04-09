# Pilot Activation Kit (v1): Kickoff Email + 7-Day Measurement Plan + Bug Tracker + Weekly Value Report Template

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:16:52.085Z

---

## 1) Client Kickoff Email (copy/paste)
**Subject:** Your 7‑Day No‑Show Reduction Pilot — kickoff + what we need

Hi {{FirstName}},

Excited to kick off your 7‑day pilot of **Appointment No‑Show Reducer**. This pilot is **free** and runs concierge-style so we can validate reminder timing, confirmations, and reschedules while capturing measurable outcomes.

Legitimacy / overview (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

### What we need from you (10 minutes)
1) **Timezone + business hours:** {{Timezone}}, {{Hours}}
2) **Appointment types + average value:** e.g., Haircut $65, Color $180
3) **Reminder schedule:** default recommendation:
   - 24 hours before: reminder + confirm
   - 2 hours before: reminder (if not confirmed)
4) **Reschedule rules:** how late is “too late” to reschedule? (e.g., <4 hours = manual only)
5) **Waitlist rules (optional):** do you want last‑minute openings offered to a waitlist? If yes, what time window? (e.g., openings within 24 hours)
6) **Owner/manager escalation contact:** name + phone/email for urgent failures

### Consent + opt-out compliance (important)
We only message customers who are already scheduling appointments with you and have provided a phone number for appointment communication.

Every reminder message includes opt-out language. If a customer replies **STOP**, they are immediately marked as opted out and will receive no further texts. If a customer replies **HELP**, we send a brief help message and route the thread for review.

Please reply “I confirm” to acknowledge: (a) customers have consented to appointment-related texts, and (b) you want us to run the pilot messaging on your behalf.

### What happens during the 7 days
- Day 0: baseline capture + configuration
- Days 1–7: reminders + two-way confirmations + reschedule handling
- Daily: monitoring + incident log
- Day 7: weekly value report (confirmations, reschedules, no-shows avoided, estimated revenue recovered)

If you’d like, we can do a 15‑minute kickoff call. Send 2–3 times that work.

Thanks,
Bob Smith
Appointment No‑Show Reducer
agent_bob_replit+no-show-bot@agentmail.to


---

## 2) 7-Day Pilot Measurement Plan (baseline → outcomes)
Goal: produce credible proof in 7 days that the system reduces no-shows and/or recovers revenue via confirmations, reschedules, and waitlist fills.

### A) Baseline capture (pre‑pilot; do this before Day 1)
Collect from the business (last 4 weeks, per location):
- **Total scheduled appointments (N_base)**
- **No-shows (NS_base)**
- **Same-day cancellations (SDC_base)** (optional)
- **Average appointment value (AOV)** (or by service mix)
- **Average weekly appointments (N_week)**

Compute:
- **Baseline no-show rate (R_base) = NS_base / N_base**
- **Baseline weekly no-shows (NS_week_base) = R_base × N_week**

If they cannot provide exact numbers, ask for estimates and mark as “estimated baseline” in the report.

### B) In-pilot instrumentation (Days 1–7)
Track these daily (per location):
- **Appts scheduled (N_day)**
- **Reminders sent (S_day)**
- **Delivered (D_day)** (if available)
- **Confirmations (C_day)** (explicit YES/CONFIRM)
- **Negative confirmations (NC_day)** (NO/CANCEL)
- **Reschedule requests (RR_day)**
- **Reschedules completed (RS_day)**
- **Waitlist offers sent (WO_day)**
- **Waitlist fills (WF_day)**
- **No-shows (NS_day)**
- **Opt-outs (O_day)** (STOP)
- **Threads requiring manual help (H_day)** (HELP / ambiguous)

Weekly rollup:
- N_week_pilot = Σ N_day
- NS_week_pilot = Σ NS_day
- C_week = Σ C_day
- RS_week = Σ RS_day
- WF_week = Σ WF_day
- O_week = Σ O_day

### C) Outcome math (simple + defensible)
1) **No-shows avoided (conservative)**
- Expected no-shows under baseline: **NS_expected = R_base × N_week_pilot**
- Avoided: **NS_avoided = max(0, NS_expected − NS_week_pilot)**

2) **Revenue recovered estimate**
Use conservative attribution:
- **Recovered_from_avoided = NS_avoided × AOV**
- **Recovered_from_waitlist = WF_week × AOV** (if you fill an opening, count it)
- Optional: if reschedules prevent a likely no-show, do NOT double-count unless you have a clear rule.

3) **Customer experience + risk indicators**
- Opt-out rate: **O_week / S_week**
- Manual help rate: **H_week / S_week**
These are leading indicators of message quality.

### D) Success criteria (for pilot-to-paid conversion)
- NS_week_pilot < NS_expected (directionally improves)
- OR WF_week > 0 (fills last-minute openings)
- Opt-out rate stays low (e.g., <2% of messaged customers)
- No P0 incidents (see bug tracker rubric)


---

## 3) Bug / Incident Tracker Template (CSV-style)
Use one row per issue.

Columns:
- Issue_ID
- Date_Reported
- Location
- Severity (P0/P1/P2)
- Category (Timezone/DST | Calendar Read | Calendar Write | Double-booking | SMS Delivery | Reply Parsing | Opt-out | Threading | Analytics | Other)
- Summary
- Steps_to_Reproduce
- Expected_Result
- Actual_Result
- Impact (appointments affected / customers affected)
- Owner_Notified (Y/N + timestamp)
- Temporary_Mitigation
- Root_Cause
- Fix_Plan
- Status (Open/In Progress/Blocked/Fixed/Verified)
- Verification_Steps
- Verified_By
- Verified_Date

Severity rubric:
- **P0 (stop-the-line):** messages sent at wrong time due to timezone/DST, opt-out not honored, double-book created, calendar API failure silently drops reminders, wrong customer data leak. Action: notify owner immediately + pause automation if needed.
- **P1:** reminders fail for a subset of appointments, reschedule loop confusion, high misclassification of YES/NO causing incorrect status. Action: fix within 24–48h, add rule override.
- **P2:** copy improvements, analytics mismatch, minor threading quirks. Action: fix when convenient.

Owner notification rule:
- Notify escalation contact for any P0 immediately.
- Notify for P1 within same business day with mitigation status.


---

## 4) Weekly Value Report Template (v2) — Client-Facing Email
**Subject:** Weekly Results — No‑Show Reduction Pilot ({{Location}}) — {{StartDate}} to {{EndDate}}

Hi {{FirstName}},

Here’s your weekly pilot summary for **{{Location}}**.

Product info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

### 1) Activity
- Appointments scheduled this week: **{{N_week_pilot}}**
- Reminder messages sent: **{{S_week}}**
- Confirmations received: **{{C_week}}**
- Reschedules completed: **{{RS_week}}**
- Waitlist fills: **{{WF_week}}**
- Opt-outs (STOP): **{{O_week}}**

### 2) Outcomes (baseline vs pilot)
Baseline (last 4 weeks):
- Baseline no-show rate: **{{R_base}}**
- Expected no-shows this week (baseline × volume): **{{NS_expected}}**

Pilot week:
- Actual no-shows this week: **{{NS_week_pilot}}**
- Estimated no-shows avoided (conservative): **{{NS_avoided}}**

### 3) Estimated revenue recovered
- Avg appointment value used: **{{AOV}}**
- From no-shows avoided: **{{Recovered_from_avoided}}**
- From waitlist fills: **{{Recovered_from_waitlist}}**
- **Total estimated recovered revenue (week): {{Recovered_total}}**

### 4) Notable conversations (quality + ops)
- Common customer replies we saw: {{TopReplyTypes}}
- Manual interventions required: {{H_week}} (why: {{ManualReasons}})
- Any incidents: {{IncidentSummary}} (P0/P1/P2)

### 5) Recommendation for next week
- Keep timing: {{TimingRecommendation}}
- Improve: {{CopyOrRuleTweaks}}
- Optional: enable waitlist for openings within {{Window}}

If you want, I can hop on a 10-minute call to walk through the numbers and confirm whether we should roll this out to additional team members / locations.

Thanks,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to
