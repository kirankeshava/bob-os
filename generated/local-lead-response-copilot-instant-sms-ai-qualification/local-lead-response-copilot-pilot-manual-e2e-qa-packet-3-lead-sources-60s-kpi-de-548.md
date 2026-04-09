# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Lead Sources, <60s KPI, Deterministic Fail-safe) — Test Plan + Results Tables + Bug/Fix Log + Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:07:15.814Z

---

## 0) Purpose + Scope (Pilot-Stage, No Automation)
This packet is designed to protect agency/customer trust in the first month by verifying the end-to-end path from lead capture → instant SMS → qualification → booking/escalation, with special attention to response time (<60s) and safe behaviors when AI or downstream systems fail.

**Lead sources covered (3):**
1) **Generic Webhook JSON** (any form/ads tool hitting our endpoint)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (real CRM)

**Business legitimacy references (use in any customer comms during pilot):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact email: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) KPI Definition + Evidence Requirements
### 1.1 KPI: First Response Time (<60s)
**Definition:** Time from *lead received by our system* to *first outbound SMS queued/sent*.

**Timestamp points to capture (minimum):**
- **T0 (Lead Received):** Timestamp when webhook hits our server OR when we log “lead ingested” (preferred is server log). If only external tool timestamp exists, record both.
- **T1 (First SMS Out):** Timestamp when first SMS is submitted to provider (e.g., Twilio “queued/sent” event) OR our internal “sms send attempt” log.
- **Delta:** T1 - T0 must be **<= 60 seconds**.

**Evidence to save for each run:**
- Screenshot/export of provider log OR app logs showing T0 and T1
- Message transcript (body, to/from, timestamps)
- Lead payload (redact PII as needed) or lead ID

### 1.2 Sample Size (Pilot)
- Minimum: **20 total trials** across the three sources.
- Recommended distribution: Webhook 8, Jotform 6, HubSpot 6.

### 1.3 Pass/Fail Gates
- **Hard fail:** Any scenario where system texts the wrong person, ignores STOP, loops indefinitely, sends outside after-hours rules (if configured), or duplicates messages >1 extra send.
- **Performance fail:** >10% of trials exceed 60s response time OR any single delay >180s without a clear provider outage.

---

## 2) Preconditions + Setup Checklist (Do Before Testing)
1) Confirm **sending number** is active and can deliver SMS to a test phone.
2) Confirm environment (prod vs staging) and where logs can be viewed.
3) Confirm after-hours window configured (example for testing):
   - Business hours: 9am–5pm local time
   - After-hours behavior: send acknowledgement + next-step expectation (no booking link unless desired)
4) Confirm calendar/booking link (or booking API) and what constitutes “calendar failure” (404, timeout, invalid token).
5) Confirm deterministic fallback mode can be triggered by:
   - LLM error
   - LLM timeout (e.g., >8s)
   - Empty/invalid AI output

---

## 3) Lead Source Config (3 Sources)
### 3.1 Generic Webhook JSON
**Expected endpoint behavior:** Accept JSON payload with name/phone/service/zip (at minimum phone) and return 2xx quickly.

**Canonical payload for tests (valid):**
```json
{
  "source": "webhook_test",
  "lead_id": "qa-001",
  "full_name": "Test Lead",
  "phone": "+14155550123",
  "email": "test@example.com",
  "service": "Roof repair",
  "zip": "94110",
  "notes": "Leak started yesterday"
}
```

**Variants:** missing phone, invalid phone, duplicate lead_id, retry events.

### 3.2 Jotform
**Form fields required:**
- Name
- Phone (require + country code if possible)
- Service needed
- Zip
- Preferred time (optional)

**Integration:** Jotform webhook → our webhook endpoint.

### 3.3 HubSpot CRM
**Trigger:** New contact created OR new form submission creating contact.

**Expected behavior:**
- Our system sends SMS to contact phone
- System writes a **CRM note** (or timeline event) containing qualification transcript + status + next step.

---

## 4) Test Matrix (Scenarios + Expected Results)
For each test, record: Lead source, Case ID, T0, T1, Delta, transcript, outcome.

### 4.1 Core Happy Path (All Sources)
**Case HP-1:** Valid phone, within business hours.
- Expected: First SMS <=60s. First message acknowledges request + asks Q1. Qualification proceeds to booking/escalation.
- CRM: note created with correct formatting (see Section 6).

### 4.2 Missing Phone
**Case PH-0:** Payload missing phone OR blank.
- Expected: No SMS attempt. System logs validation error. If email exists, optionally send email to agent/admin (implementation-specific). No crash.
- CRM: if applicable, note indicates “No phone; unable to text.”

### 4.3 Invalid Phone
**Case PH-1:** Phone is malformed (e.g., “555-ABC-1234” or too short).
- Expected: No SMS attempt. Clear error logged. No repeated retries.

### 4.4 STOP / HELP Compliance
**Case CMP-STOP:** Lead replies “STOP”.
- Expected: Immediate confirmation (if provider handles automatically, verify). System must mark lead as opted-out and **never text again** unless re-opt-in.

**Case CMP-HELP:** Lead replies “HELP”.
- Expected: Return help message (business name + contact email agent_bob_replit+lead-copilot@agentmail.to + how to stop). No qualification prompts until user continues.

### 4.5 After-Hours Behavior
**Case AH-1:** Lead arrives outside business hours.
- Expected: First SMS <=60s but message content is after-hours safe: acknowledges receipt, states next contact time window, offers option to leave details.
- Must not book into closed times if calendar logic exists.

### 4.6 Multiple Concurrent Leads
**Case CON-5:** Submit 5 leads within 30 seconds.
- Expected: All receive first SMS <=60s; no cross-talk (wrong name/service); no rate-limit crash.

### 4.7 Calendar/Booking Link Failures
**Case CAL-FAIL:** Booking link returns error/timeout.
- Expected: System falls back to “we’ll call you” or “reply with preferred time” flow. Must not loop sending broken link repeatedly.

### 4.8 Webhook Retries
**Case RET-1:** Resend identical webhook 3x (simulate provider retry).
- Expected: Dedup prevents duplicate SMS beyond first attempt OR sends at most one extra with clear idempotency rule.

### 4.9 Duplicate Leads
**Case DEDUPE-1:** Same phone submits twice within 10 minutes.
- Expected: Either merge into same conversation or send a polite “Got it—continuing” message; must not restart from scratch if mid-qualification.

### 4.10 CRM Note Formatting (HubSpot)
**Case CRM-NOTE-1:** Validate note is readable, includes key fields, and doesn’t exceed limits.
- Expected: Note appears on correct contact, includes timestamps, lead source, transcript, and final status.

---

## 5) Results Capture Tables (Copy/Paste)
### 5.1 KPI Timing Table
| Trial # | Source | Case ID | Lead ID | T0 Lead Received | T1 First SMS Out | Delta (sec) | Pass/Fail | Evidence Link/Notes |
|---:|---|---|---|---|---|---:|---|---|
| 1 | Webhook | HP-1 | qa-001 |  |  |  |  |  |
| 2 | Jotform | HP-1 |  |  |  |  |  |  |
| 3 | HubSpot | CRM-NOTE-1 |  |  |  |  |  |  |

### 5.2 Transcript/Outcome Table
| Trial # | Key Messages (summary) | Qualification Outcome | Booking Outcome | Escalation? | Any Compliance Flags |
|---:|---|---|---|---|---|
| 1 |  |  |  |  |  |

---

## 6) Deterministic Fallback Qualification Flow (LLM Failure Safe Mode)
**When to trigger deterministic mode:**
- LLM API returns error
- LLM latency > 8 seconds
- LLM response empty/invalid
- Output contains disallowed content (policy/guardrail trip)

**Tone:** concise, professional, local-business friendly.

### 6.1 Message 1 (Always within 60s)
“Hi {first_name}, it’s {business_name}. Thanks for reaching out about {service}. Quick questions so we can get you the fastest quote—are you looking for help **today**, **this week**, or **just researching**?”

**Accepted replies map:**
- today → urgency=today
- this week → urgency=week
- researching/quote → urgency=research
- anything else/no response → reprompt once, then escalate

### 6.2 Message 2 (Job Type / Scope)
“Got it. What’s the main issue? Reply with **1** urgent repair, **2** replacement/install, or **3** inspection/estimate.”

### 6.3 Message 3 (Location)
“What’s the job ZIP code?”
- If invalid zip: “Please reply with a 5-digit ZIP.” (max 2 attempts)

### 6.4 Message 4 (Permission to Call / Book)
“Thanks. Would you like to **book a time** or have us **call you**? Reply **BOOK** or **CALL**.”

**If BOOK:** Send booking link. If link fails (CAL-FAIL):
“Booking is having trouble right now—reply with a good time window (e.g., ‘today 3–5pm’), and we’ll confirm ASAP.”

**If CALL:**
“Perfect—what’s the best time window today/tomorrow? (Example: ‘tomorrow 9–11am’)”

### 6.5 Escalation-to-Human Rules
Escalate (create internal alert / CRM task) if:
- User gives free-text that doesn’t map after 2 prompts
- Any complaint, profanity, legal threats
- High urgency + after-hours

Escalation message to lead:
“Thanks—one of our team will jump in and text/call you shortly.”

### 6.6 STOP/HELP Handling (Always On)
- If inbound contains “STOP” (any case): mark opted-out and stop.
- If inbound contains “HELP”: “You can reach us at agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to stop messages.”

---

## 7) HubSpot CRM Note Format (Required Fields)
**Title:** “Lead Copilot Qualification — {date}”

**Body template:**
- Lead Source: {source}
- Lead ID: {lead_id}
- Phone: {e164_phone}
- Received (T0): {timestamp}
- First SMS (T1): {timestamp} (Delta: {sec}s)
- Status: {Qualified / Needs follow-up / Opted-out / Invalid phone / After-hours}
- Key Answers:
  - Urgency: {today/week/research}
  - Job type: {repair/install/inspection}
  - ZIP: {zip}
  - Preferred time: {time_window}
- Transcript (last 6 messages):
  1) OUT: ...
  2) IN: ...
  3) OUT: ...

**Pass criteria:** Readable, consistent line breaks, no JSON blobs, no markdown that HubSpot renders poorly.

---

## 8) Bug/Fix Log (Pilot)
Use this to triage issues by churn risk.

| Bug ID | Severity (P0/P1/P2) | Scenario | Steps to Reproduce | Expected | Actual | Evidence | Likely Cause | Suggested Fix | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| BUG-001 | P0 | CMP-STOP | Lead texts STOP | System never texts again | Follow-up SMS sent | screenshot | opt-out flag not persisted | persist opt-out by phone; block sends |  | Open |

**Severity guidance:**
- P0: compliance breach (STOP), texting wrong person, duplicate spam, major outages
- P1: response time >60s frequently, calendar failures without fallback
- P2: cosmetic note formatting, minor copy tweaks

---

## 9) Quick Pilot Execution Checklist (60-minute run)
1) Run HP-1 for each source (3 trials). Confirm Delta <=60s.
2) Run PH-0 and PH-1 (2 trials). Confirm no SMS + clear logs.
3) Run CMP-STOP and CMP-HELP (2 trials). Confirm compliance behavior.
4) Run AH-1 (1 trial). Confirm correct after-hours messaging.
5) Run CON-5 (5 trials). Confirm no cross-talk; all <=60s.
6) Run CAL-FAIL (1 trial). Confirm fallback prompt.
7) Run RET-1 and DEDUPE-1 (2 trials). Confirm idempotency/dedup.
8) Run CRM-NOTE-1 (HubSpot) verify formatting + content.
9) Fill results tables + open bugs with evidence.

This packet is ready to execute as soon as endpoints and tool connections (Jotform webhook + HubSpot trigger) are available; it will generate timestamped proof of <60s first response and a prioritized fixes list without building automated tests pre-revenue.