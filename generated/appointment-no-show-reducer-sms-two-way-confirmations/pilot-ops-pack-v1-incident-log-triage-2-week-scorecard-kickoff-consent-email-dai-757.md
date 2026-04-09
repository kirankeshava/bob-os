# Pilot Ops Pack v1 — Incident Log + Triage, 2-Week Scorecard, Kickoff/Consent Email, Daily Monitoring Checklist

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:44:53.262Z

---

# Pilot Ops Pack v1 — Appointment No-Show Reducer (SMS + Two-Way Confirmations)

Business legitimacy URL (share with prospects/clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  
Support/ops email: agent_bob_replit+no-show-bot@agentmail.to

---

## 1) Incident / Bug Log Template (single source of truth)
Use this log for internal QA simulation and live pilots. Goal: every issue has reproducible steps, clear owner, and verification notes.

**Log columns (copy into Sheet/Notion):**
1. Incident ID (e.g., PILOT-001)
2. Date/Time detected (include timezone)
3. Pilot location name
4. Detected by (Bob / Client / Automated alert)
5. Severity (S0–S3)
6. Category (Timezone/DST, Calendar Read, Calendar Write-back, Double-booking, Opt-out/HELP, Threading, Reply Parsing, Waitlist, Delivery failure, Analytics)
7. Symptom (what happened)
8. Expected behavior
9. Steps to reproduce (minimal)
10. Scope/impact (# appointments affected, patient impact, revenue risk)
11. Current workaround (if any)
12. Root cause hypothesis
13. Owner (eng/ops)
14. Status (New, Investigating, Fix in progress, Ready to verify, Verified, Closed)
15. Fix/PR link (if applicable)
16. Verification steps
17. Verification result + timestamp
18. Client communication needed? (Y/N) + message sent

### Severity rubric
- **S0 (Critical / Stop-ship):** Incorrect confirmations/reschedules that can cause patient harm, repeated spam, or compliance risk (e.g., STOP not honored). Immediate rollback/disable automation.
- **S1 (High):** Calendar inconsistencies (write-back failure), double-booking risk, wrong timezone reminders, message threading broken leading to wrong appointment actions.
- **S2 (Medium):** Misclassification edge cases with safe fallback, minor analytics inaccuracies, delayed reminders (but still sent).
- **S3 (Low):** Cosmetic/wording issues, non-blocking dashboard/report formatting.

### Required fail-safe actions
- If **calendar API read/write fails** for a location for >15 minutes or >3 consecutive attempts: **pause automation for that location** and email owner + internal ops at agent_bob_replit+no-show-bot@agentmail.to.
- If **STOP/opt-out fails** even once: treat as **S0**, immediately disable outbound to that number and investigate.

---

## 2) Baseline Capture + 2-Week Pilot Scorecard
Purpose: produce measurable outcomes and a weekly proof report that quantifies recovered revenue.

### Baseline (capture before go-live)
Collect last **4 weeks** (or best available) per location:
- Avg appointments/week
- No-show rate (%)
- Late-cancel rate (%)
- Average appointment value ($) OR gross margin estimate ($)
- Current reminder process (none / manual / existing tool)
- Reschedule process (phone-only / online / both)
- Waitlist process (none / paper / digital)

**Baseline calculations:**
- Baseline no-shows/week = avg appts/week * no-show rate
- Baseline lost revenue/week = baseline no-shows/week * avg appointment value

### Pilot success metrics (track daily; roll up weekly)
**Week 1 and Week 2 (per location):**
1. Reminders sent
2. Delivery rate (%) (if available)
3. Confirmations received (count, % of reminders)
4. Negative responses (“No” / “Cancel”) captured early (count)
5. Reschedule requests (count)
6. Reschedules completed (count)
7. Waitlist invitations sent (count)
8. Waitlist fills completed (count)
9. Opt-outs (count) + opt-out rate
10. Human escalations triggered (count) (e.g., ambiguous replies, calendar failure)
11. Actual no-shows (count) and no-show rate (%)

### Recovered revenue estimate (weekly)
- **Avoided no-shows/week** = (Baseline no-shows/week) − (Pilot no-shows/week)
- **Revenue recovered from avoided no-shows** = avoided no-shows/week * avg appointment value
- **Revenue recovered from waitlist fills** = waitlist fills completed * avg appointment value
- **Total recovered revenue/week** = recovered (avoided) + recovered (waitlist)

**Notes:**
- If baseline data is weak, use a conservative estimate and document it.
- If appointment values vary, use weighted average or top service average and document.

---

## 3) Client Email Template — Pilot Kickoff + Consent/Opt-in Confirmation
Subject: Pilot kickoff — appointment reminder confirmations (and consent checklist)

Hi {{OwnerName}},

Excited to kick off the no-show reduction pilot for {{BusinessName}}. For reference, here’s our product/legitimacy page you can share with staff:  
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

**What goes live:**
- SMS reminders to upcoming appointments
- Two-way confirmations (patients can reply YES/NO/RESCHEDULE)
- Automated reschedule capture + optional waitlist fill
- Weekly report quantifying confirmations, reschedules, filled gaps, and estimated recovered revenue

**Consent + compliance (please confirm by replying to this email):**
1) You confirm you have consent to text your customers/patients for appointment-related messages, consistent with your current intake/consent process.  
2) You confirm your staff will honor opt-outs and that patients can opt out anytime by replying STOP.  
3) You confirm the sending number/message content will be used only for appointment operations for {{BusinessName}}.

**Info we need (reply with answers):**
- Location timezone: {{Timezone}}  
- Business hours (for reminders/reschedules): {{Hours}}  
- Reminder schedule (recommended): 48 hours + 3 hours before appointment (confirm or propose your preference)  
- Average appointment value (rough estimate is fine): ${{AvgValue}}  
- Escalation contact (name + phone/email) if our system detects a calendar failure: {{EscalationContact}}

**Support:** If anything looks off (wrong appointment, timing, or a customer complaint), email us immediately at agent_bob_replit+no-show-bot@agentmail.to and we will pause automation for safety.

Thanks,  
Bob

---

## 4) Daily Monitoring Checklist (Day 0–14)
Use this to keep pilots safe and produce clean metrics.

### Day 0 (pre go-live)
- [ ] Confirm location timezone set correctly (test with a known appointment time)
- [ ] Send internal test reminder to staff number (verify wording + links + reply handling)
- [ ] Verify STOP/HELP behaviors (STOP blocks future sends; HELP returns support message)
- [ ] Verify calendar read works for next 7 days (appointments visible)
- [ ] Verify calendar write-back works (if enabled): confirmation/reschedule updates calendar correctly
- [ ] Verify double-book prevention (reschedule flow cannot book occupied slot)
- [ ] Enable alerting path for calendar API errors (email to agent_bob_replit+no-show-bot@agentmail.to + owner contact)

### Days 1–7 (daily, <10 minutes)
- [ ] Check reminders sent count vs expected upcoming appointments
- [ ] Spot-check 5 message threads: correct patient, correct appointment time, correct location
- [ ] Review all “No/Cancel/Reschedule” replies: ensure system action matches intent
- [ ] Confirm no STOP violations (any outbound to opted-out numbers is S0)
- [ ] Confirm reschedule loop protection (no repeated prompts beyond configured max)
- [ ] Review any calendar failures/latency; if repeated, pause automation and escalate
- [ ] Log metrics: confirmations, reschedules requested/completed, waitlist fills, opt-outs

### Days 8–14 (daily + weekly report prep)
- [ ] Same checks as Days 1–7
- [ ] Validate weekly totals against raw event counts (avoid reporting discrepancies)
- [ ] Prepare weekly value report: baseline vs pilot no-show rate, recovered revenue estimate, notable saves (2–3 examples)

---

## 5) Quick rule-based reply handling (ops reference)
High-confidence overrides (apply before AI):
- STOP / UNSUBSCRIBE / CANCEL ALL / END → opt-out immediately, send confirmation
- HELP → send support message + route to agent_bob_replit+no-show-bot@agentmail.to
- YES / Y / CONFIRM → confirm appointment
- NO / N / CAN’T / CANNOT → mark not-confirmed; offer reschedule options
- RESCHEDULE / CHANGE / MOVE → start reschedule flow

Ambiguous replies (route to human escalation):
- “Running late”, “on my way”, “who is this”, “what time”, profanity, multi-intent messages

This pack is designed so 2–3 pilots can go live with consistent QA coverage, fast triage, and standardized weekly proof of value.
