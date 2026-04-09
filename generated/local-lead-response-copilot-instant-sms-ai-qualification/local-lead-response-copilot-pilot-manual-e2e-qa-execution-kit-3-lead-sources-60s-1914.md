# Local Lead Response Copilot — Pilot Manual E2E QA Execution Kit (3 Lead Sources, <60s KPI Proof, Fail-safe Deterministic Qualification) + Customer/Agency Comms

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:46:25.124Z

---

## 0) Purpose (Week 1 / pre-revenue)
Run a **manual end-to-end QA session** during early pilots to protect reputation and reduce churn: prove **<60s first response** and validate fail-safes across **3 lead sources**:
1) **Generic Webhook JSON** (any ad/form tool)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (real CRM)

Store timestamped proof + message transcripts + CRM notes. No automation.

---
## 1) Test Environment & Evidence Capture
**Required artifacts to save per test run:**
- Lead submission timestamp (UTC + local time) + screenshot/log line
- First outbound SMS timestamp + screenshot/log line
- Conversation transcript for STOP/HELP + qualification questions
- CRM record screenshot showing **note formatting** and dedupe behavior

**Timing measurement definition (KPI):**
- **T0 =** lead received by system (webhook received timestamp OR form submit timestamp)
- **T1 =** first SMS sent timestamp (provider send log)
- **Pass gate:** T1 - T0 **<= 60 seconds** for at least **19/20** trials; no single trial > 120s without documented external outage.

**Sample size:**
- Minimum **20 leads total** in one session: 8 webhook JSON, 6 Jotform, 6 HubSpot.

**Concurrency block:**
- Send 5 leads within 30 seconds (mixed sources) and verify first response for each is <60s.

---
## 2) Lead Source Setups (Manual)
### A) Generic Webhook JSON
Use a consistent JSON payload so pass/fail is deterministic.
**Payload (valid):**
```json
{
  "source": "webhook",
  "lead_id": "qa-{{timestamp}}-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "testlead+001@example.com",
  "service": "Roof repair",
  "zip": "94107",
  "notes": "QA run webhook valid"
}
```
**Variants:** missing phone, invalid phone, duplicate lead_id, changed phone with same email.

### B) Jotform (free)
Create a form named: **LLRC QA Intake** with fields:
- Full name (required)
- Phone (required)
- Email (optional)
- Service needed (dropdown)
- Preferred time (optional)

Submission triggers should hit the same ingestion as webhook.

### C) HubSpot (free)
Two inbound patterns:
1) **New contact created** triggers immediate SMS
2) **Existing contact updated** triggers SMS only if it represents a net-new lead event (define below)

---
## 3) High-Risk Test Cases (Steps + Expected Results)
Each test should record T0/T1 and outcomes.

### 3.1 Missing phone
**Input:** phone field empty/null.
**Expected:**
- No SMS attempt.
- CRM note created: `Status: Unable to contact (missing phone)`
- Internal alert path (email/slack) is triggered if available.
- Lead marked `needs_followup=true`.

### 3.2 Invalid phone
**Input:** phone = `12345` or `+1 (000) 000-0000`.
**Expected:**
- No SMS send.
- CRM note: `Invalid phone; needs correction`.
- System should request correction via email if email exists; otherwise queue for manual.

### 3.3 STOP compliance
**User reply:** `STOP`
**Expected:**
- Immediate confirmation: `You’re opted out and will receive no further messages. Reply START to resubscribe.`
- All future automated messages blocked for that phone.
- CRM note includes: `Opt-out: STOP received at {timestamp}`

### 3.4 HELP compliance
**User reply:** `HELP`
**Expected:**
- Reply includes business identity + contact:
  `Local Lead Response Copilot support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.`
- CRM note logs HELP interaction.

### 3.5 After-hours routing
Define after-hours (example): **Mon–Fri 6pm–8am, Sat/Sun**.
**Expected:**
- First SMS still sent <60s, but copy changes:
  `Thanks—got it. We’re currently closed. What’s the best time tomorrow for a quick call? (Morning/Afternoon/Evening)`
- If calendar booking is enabled: offer link only if it is confirmed healthy; otherwise collect preferred time.

### 3.6 Multiple concurrent leads
**Input:** 5 submissions in 30 seconds.
**Expected:**
- Each lead gets unique first SMS within 60s.
- No cross-talk: replies map to the correct lead thread.
- CRM notes remain separated per contact.

### 3.7 Calendar link failure
**Simulate:** booking link 404 / scheduling API down.
**Expected:**
- Do not send broken link repeatedly.
- Switch to fallback: collect preferred time window + confirm a human will follow up.
- CRM note: `Calendar unavailable; collected preferred time: X`.

### 3.8 Webhook retries
**Simulate:** resend identical payload 3 times.
**Expected:**
- Dedup: only one outbound SMS.
- CRM note shows `Duplicate suppressed` with count.

### 3.9 Duplicate leads (same phone)
**Input:** same phone submits twice within 10 minutes.
**Expected:**
- If conversation active: do not restart full qualification; send a short continuity message.
- CRM note appends to the same contact with a new “Lead event” section (see formatting).

### 3.10 HubSpot note formatting (verification)
**Expected CRM Note Template (exact):**
```
[Lead Response Copilot]
Event: New lead
Source: {source}
Received: {T0}
First SMS Sent: {T1}
Speed-to-Lead: {delta_seconds}s
Lead Data: name={name} phone={phone} email={email} service={service} zip={zip}
Conversation Summary:
- Q1: {question}
  A1: {answer}
- Q2: {question}
  A2: {answer}
Outcome: {booked | needs_manual_followup | opted_out | invalid_phone | after_hours_pending}
Dedupe: {none | suppressed_duplicate} (key={dedupe_key})
```
**Pass:** formatting matches, includes delta seconds, outcome field, and dedupe field.

---
## 4) Deterministic Qualification Fallback (LLM Down / Timeout)
Trigger fallback if:
- LLM call errors, times out (>3s), or returns empty
- Confidence below threshold (if available)

**Rules:**
- Ask max **3 questions**
- If user non-responsive: 2 reminders then stop
- Always respect STOP/HELP

**Fallback Script (copy/paste):**
1) **Msg 1 (immediate):**
   `Hi {first_name}, thanks for reaching out about {service}. Quick 3 questions so we can get you a quote today. First—what city/ZIP is the job in?`
2) If answer received, **Msg 2:**
   `Got it. What’s the best time for a quick call? Reply 1) Now 2) Today later 3) Tomorrow`
3) If answer received, **Msg 3:**
   `Last one—what’s the main issue? Reply A) Emergency/urgent B) Estimate C) Other`

**Escalation:**
- After Q3 or if user asks for human: `Thanks—someone will reach out shortly to confirm details.`
- Create CRM note with collected fields and set outcome:
  - If “Now”: `Outcome: needs_manual_followup (priority=high)`
  - If after-hours: `Outcome: after_hours_pending`

**STOP:** `You’re opted out and will receive no further messages. Reply START to resubscribe.`
**HELP:** `Support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4`

---
## 5) Results Table (to fill during run)
For each trial record:
- Trial ID, Source, Scenario, T0, T1, Delta(s), First message text, Pass/Fail, Evidence link, Notes.

**Minimum completion to claim verified KPI:**
- 20 trials total
- 19/20 under 60s
- STOP and HELP each pass once
- At least 1 calendar failure pass
- At least 1 retry/dedupe pass

---
## 6) Bugs/Fixes Log (prioritized)
Fields: Severity (P0–P3), Scenario, Steps, Expected, Actual, Evidence, Suggested Fix.
**P0 examples:** STOP not honored; >120s response; wrong-thread replies; duplicate SMS spam.

---
## 7) Customer/Agency Coordination Templates (Email + SMS)
### Email (to agency/client technical contact)
Subject: 60-second speed-to-lead QA run (free pilot) — Local Lead Response Copilot

Hi {Name},

I’m Bob from Local Lead Response Copilot (site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4). For the free pilot, I’d like to run a 45–60 minute end-to-end QA session to prove:
- First response <60 seconds
- Correct handling of STOP/HELP
- After-hours messaging
- Dedupe/retries (no spam)
- Clean CRM notes (HubSpot)

We can test 3 inbound paths: a generic webhook payload, a Jotform submission, and a HubSpot contact create/update. No spend required.

To schedule, reply with a 2-hour window that works today/tomorrow. If you want, send one test phone number we can use for transcripts.

Support/contact: agent_bob_replit+lead-copilot@agentmail.to

Thanks,
Bob Smith

### SMS (when coordinating a test number)
`Hi—this is Bob with Local Lead Response Copilot. We’re about to run a quick test. You may receive a few automated messages. Reply STOP anytime to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to`