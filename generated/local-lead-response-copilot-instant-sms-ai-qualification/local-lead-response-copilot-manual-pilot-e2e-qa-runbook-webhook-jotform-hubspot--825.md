# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:43:49.822Z

---

# Local Lead Response Copilot — Manual Pilot E2E QA Runbook
Website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal + Scope (pilot-safe, no automation)
**Goal:** Prove (a) first-response SMS is sent within **<60 seconds** of lead creation across **3 lead sources**, and (b) the system behaves safely under failure/edge conditions (LLM failure, missing phone, STOP/HELP, after-hours, duplicates, retries, calendar failure, concurrency) while producing clean CRM notes.

**Lead sources in scope (3):**
1) **Generic Webhook JSON** (direct POST)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

**Definition of “first response”:** Timestamp difference between **Lead Received (server)** and **First outbound SMS queued/sent (provider)**. If handset delivery timestamp is available, capture it too.

---
## 1) Preconditions / Setup Checklist
Fill these before testing:
- [ ] Test phone number available (real handset) to receive SMS.
- [ ] Test opt-in language present on form (Jotform) stating user consents to SMS.
- [ ] After-hours window configured (e.g., 6pm–8am) and timezone confirmed.
- [ ] Booking link / calendar route configured (even if it may fail for testing).
- [ ] Deduplication key confirmed (recommended: `(phone + source + last 24h)` or explicit `lead_id`).
- [ ] HubSpot connection configured (API key/private app token) to create/update contact and attach note.

**Critical safety:** If STOP received, system must immediately suppress future automated messages to that number and record opt-out.

---
## 2) Deterministic Fallback Qualification Flow (No-LLM)
This flow triggers when **LLM times out**, returns error, or confidence below threshold. It must be deterministic and safe.

### 2.1 Trigger conditions
Fallback activates if any:
- LLM request fails (timeout, 5xx, network)
- LLM latency > configured max (recommend 3–5s)
- LLM output fails validation (empty, too long, includes prohibited content)

### 2.2 Exact SMS copy + branching rules
**Message 1 (immediate):**
“Hi {first_name}, this is {business_name}. Thanks for reaching out—can I ask 2 quick questions to help you faster? Reply YES to continue.”

If reply is STOP: handle STOP (Section 6.3). If HELP: handle HELP (Section 6.4).

**If YES:**
**Q1:** “What service do you need? Reply 1) Repair 2) Install 3) Quote/Estimate 4) Other”
- If 1/2/3/4 -> proceed
- Else: “Got it—please reply with 1, 2, 3, or 4.” (max 1 retry)

**Q2:** “What’s your zip code?”
- If 5-digit US zip -> proceed
- Else: “Please reply with a 5-digit zip code.” (max 1 retry)

**Handoff / Booking:**
“Thanks. What’s the best time today for a quick call? Reply 1) Morning 2) Afternoon 3) Evening”
- If selection valid: “Perfect—someone will text/call you shortly. If you prefer to book now: {calendar_link}”
- If calendar link is down/unavailable: “Perfect—someone will text/call you shortly to schedule.”

**After 2 invalid replies total:**
“Thanks—someone from our team will follow up shortly to help schedule.”

### 2.3 Data captured to CRM note (even in fallback)
- Service type selection
- Zip code
- Preferred time
- Whether calendar link was shown
- Opt-out status

---
## 3) KPI Timing Proof Method (<60s)
For each test, capture:
1) **Lead Received (server timestamp)**
2) **SMS Queued/Sent (provider/app timestamp)**
3) Optional: **Handset Delivery (human timestamp)**

**How to capture:**
- Lead Received: app logs / webhook ingestion timestamp.
- SMS Queued/Sent: messaging provider send log timestamp (or app event log).
- Handset Delivery: record time visible on phone (note carrier variation).

### 3.1 Results Table Template (copy/paste)
| Test ID | Source | Scenario | Lead Received (UTC/local) | SMS Queued/Sent | Handset Received | Delta (Received->Sent) | Pass (<60s) | Notes |
|---|---|---|---|---|---|---:|---|---|
| 1 | Webhook | Valid |  |  |  |  |  |  |

**Pass criteria:** Delta < 60 seconds for ≥ 95% of tests. Any outlier requires root-cause note.

---
## 4) Lead Source #1 — Generic Webhook JSON
### 4.1 Minimum required fields
- `lead_id` (string, unique) OR generated hash
- `first_name`
- `last_name` (optional)
- `phone`
- `email` (optional)
- `source` = `webhook`
- `created_at` (optional; server should stamp its own receive time)

### 4.2 Ready-to-paste test payloads
**A) Valid lead**
```json
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550101",
  "email": "testlead@example.com",
  "service": "Estimate",
  "source": "webhook"
}
```
Expected:
- First SMS sent <60s
- CRM note created (if HubSpot enabled) with standardized format

**B) Missing phone**
```json
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "source": "webhook"
}
```
Expected:
- No SMS attempted
- Create CRM note/task: “Missing phone—manual follow-up required”
- Return 200/202 to avoid endless retries OR 400 if you want sender to correct (choose and document)

**C) Invalid phone**
```json
{
  "lead_id": "qa-webhook-003",
  "first_name": "BadPhone",
  "phone": "123",
  "source": "webhook"
}
```
Expected:
- No SMS attempted
- CRM note: invalid phone

**D) Duplicate lead (same lead_id)**
```json
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "phone": "+15555550101",
  "source": "webhook"
}
```
Expected:
- Deduped: do not send second “first” SMS
- CRM note: “Duplicate suppressed”

**E) Webhook retry simulation**
Send payload A twice within 10s, with same `lead_id`.
Expected: same as duplicate; idempotent.

---
## 5) Lead Source #2 — Jotform
### 5.1 Jotform setup (manual)
- Create form fields:
  - First name (required)
  - Phone (required)
  - Service type dropdown
  - Consent checkbox text: “I agree to receive text messages about my request.” (required)
- Configure integration/webhook to Lead Response Copilot endpoint.

### 5.2 Test cases (Jotform)
1) Valid submission (consent checked) -> first SMS <60s.
2) Consent unchecked -> block submission OR tag lead “no SMS consent”; expected: **no SMS**, CRM note created.
3) Phone with formatting variations: `(555) 555-0101`, `555-555-0101`, `+1 555 555 0101` -> normalize and send.

---
## 6) Lead Source #3 — HubSpot (CRM)
### 6.1 HubSpot setup assumptions
- On lead creation (contact created or form submission), system either:
  A) Receives webhook from HubSpot, or
  B) Polls/ingests from HubSpot list.

### 6.2 Required behaviors
- Create/update contact by phone/email.
- Attach a **single standardized note** per lead conversation.
- Prevent duplicate notes on retries.

### 6.3 STOP compliance test
Steps:
1) Submit valid lead to trigger SMS.
2) Reply “STOP”.
Expected:
- Immediate suppression of future automation to that number
- CRM note includes “Opt-out: STOP at {timestamp}”
- If user submits another lead later: no SMS, create CRM task/flag

### 6.4 HELP compliance test
Reply “HELP”.
Expected:
- Send: “For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
- Do not break conversation state; continue qualification only if they answer.

### 6.5 CRM Note Formatting (strict template)
**Title:** “Lead Response Copilot — Qualification Transcript”

**Body (example):**
- Lead Source: Jotform
- Lead ID: qa-jotform-007
- Received At: 2026-04-09 14:02:11 local
- First SMS Sent At: 2026-04-09 14:02:32 local (Delta: 21s)
- Phone: +15555550101
- Opt Status: Opted-in (consent checkbox)
- After-hours: No
- Outcome: Booking link sent / Requested callback

Transcript:
1) System: Hi Test… Reply YES to continue.
2) Lead: YES
3) System: What service…
4) Lead: 3
5) System: What’s your zip code?
6) Lead: 94107
7) System: Best time today…
8) Lead: 2

Errors/Fallbacks:
- LLM: Timeout -> Deterministic fallback used
- Calendar link: OK / Failed (if failed, note)

---
## 7) Edge Case Matrix (Expected Fail-safe Behaviors)
### 7.1 Missing phone
- No SMS
- CRM note/task created
- Return appropriate status to source (avoid infinite retry)

### 7.2 Invalid phone
- No SMS
- CRM note + flag

### 7.3 After-hours
- Send modified first SMS: “Thanks—our office is currently closed. We’ll text you at {next_open_time}. If urgent, reply URGENT.”
- Do not route to immediate booking unless policy allows.

### 7.4 Multiple concurrent leads
- Submit 5 leads within 30s.
Expected:
- No queue lockups; all first SMS deltas <60s
- Separate CRM notes per lead_id

### 7.5 Calendar link failures
Expected:
- If link generation fails, send fallback copy: “Someone will follow up shortly to schedule.”
- Create internal alert/email to agent_bob_replit+lead-copilot@agentmail.to if available

### 7.6 Duplicate leads
Expected:
- Same phone + same lead_id within 24h suppressed
- Record suppression in CRM

### 7.7 Webhook retries
Expected:
- Idempotent processing (no duplicate SMS)

---
## 8) Execution Plan (20-test minimum)
Run at least:
- 8 tests via Webhook JSON (valid + missing/invalid + duplicate + retry)
- 6 tests via Jotform (valid + consent off + phone formats)
- 6 tests via HubSpot-triggered path (valid + STOP + HELP + after-hours)

Record each in Results Table and compute pass rate.

---
## 9) Bug Log + Fix List Template
| Bug ID | Severity (P0/P1/P2) | Scenario | Steps to Reproduce | Expected | Actual | Evidence (timestamps/logs) | Proposed Fix / Workaround |
|---|---|---|---|---|---|---|---|
| 1 | P0 | STOP compliance |  | Suppress all future SMS |  |  | Add opt-out table check before send |

### Severity definitions
- **P0:** Legal/compliance risk (STOP), spamming, sends to wrong person, >60s consistently.
- **P1:** Broken booking/qualification causing lost leads.
- **P2:** Formatting/reporting issues (CRM note aesthetics).

---
## 10) “Results” Section (to be filled during pilot)
After executing tests, paste the filled Results Table here and summarize:
- Total tests:
- Pass <60s:
- Failures:
- Worst delta:
- Root causes:
- Workarounds applied:

---
## 11) Known Likely Issues (pre-emptive fix list)
1) **Phone normalization**: must E.164 normalize; reject obviously invalid.
2) **Idempotency**: lead_id + phone-based dedupe to avoid double texting on retries.
3) **LLM timeout**: cap at 3–5s; fall back immediately to deterministic flow.
4) **STOP state**: must be checked before every send; stored persistently.
5) **After-hours logic**: timezone correctness; prevent booking spam at night.
6) **CRM note duplication**: ensure note upsert/dedupe on retries.

End of runbook.
