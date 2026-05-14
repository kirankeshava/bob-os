# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results + Bug/Fix List + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:42:38.786Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)

**Proof URL (shareable):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**Support/ops email:** agent_bob_replit+lead-copilot@agentmail.to

## 1) Goal + KPI
Validate end-to-end reliability for early pilots (manual, no automation) across **3 lead sources**:
1) **Generic Webhook JSON** (any ads/form tool)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

**Primary KPI:** First outbound SMS to lead sent **< 60 seconds** from lead creation/receipt.

**Success =** (a) KPI met, (b) safe fallbacks for all edge cases, (c) compliance handling (STOP/HELP), (d) stable dedupe/retry behavior, (e) correct HubSpot note formatting.

## 2) Preconditions (What must exist before running)
- Access to product logs for: inbound lead receipt time, outbound SMS send initiation time, and delivery status (if available).
- A test phone number you control that can receive SMS (use a real device). If the sending number is already live, STOP/HELP tests must be done carefully (see compliance section).
- A calendar/booking link configured (even if it is a placeholder) so we can simulate outages.
- For Jotform: a free Jotform form with a phone field.
- For HubSpot: a free HubSpot developer/test portal or free CRM with Contacts enabled.

## 3) Evidence to capture (for agencies / churn reduction)
For each test run store:
- **T0:** Timestamp when lead is created/submitted (form submission time, webhook received time, or CRM record created time)
- **T1:** Timestamp when first SMS is sent (from product log; if only device timestamp exists, record both)
- **Δ:** T1 - T0 in seconds
- Screenshot or copy of: form submission confirmation / webhook request payload / HubSpot contact record, plus SMS transcript.

**Target sample size:** 20 total runs across sources (minimum), with at least:
- 8 webhook runs
- 6 Jotform runs
- 6 HubSpot runs

## 4) Lead source setup + execution steps

### A) Generic Webhook JSON (source #1)
**Purpose:** verify we can accept a typical ad/form webhook and respond instantly.

**Test payloads** (send using curl/Postman; adapt URL/headers to product endpoint):

**A1: Valid lead (baseline)**
```json
{
  "source": "webhook",
  "lead_id": "wh_001",
  "first_name": "Jamie",
  "last_name": "Test",
  "phone": "+14155550101",
  "email": "jamie.test@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "submitted_at": "2026-05-14T12:00:00Z"
}
```
Expected:
- SMS starts within 60s.
- First message references service and next-step question.
- A note/event is created (if configured) with source=webhook.

**A2: Missing phone**
```json
{
  "source": "webhook",
  "lead_id": "wh_002",
  "first_name": "Jamie",
  "service": "Drain cleaning",
  "submitted_at": "2026-05-14T12:05:00Z"
}
```
Expected:
- **No SMS attempt**.
- System creates an internal task/alert: “Missing phone; cannot text.”
- If email exists, optional email fallback; otherwise mark as “needs contact info.”

**A3: Invalid phone**
```json
{
  "source": "webhook",
  "lead_id": "wh_003",
  "first_name": "Jamie",
  "phone": "12345",
  "service": "AC tune-up",
  "submitted_at": "2026-05-14T12:10:00Z"
}
```
Expected:
- Validation error recorded; no SMS.
- Normalized-phone field not created.

**A4: Duplicate lead (same lead_id)**
Send A1 again with same `lead_id=wh_001`.
Expected:
- No second outbound SMS.
- Log indicates dedupe: “duplicate lead_id ignored.”

**A5: Duplicate lead (different lead_id, same phone within 10 min window)**
Change lead_id to wh_004 but keep phone + service.
Expected:
- Either (preferred) suppress or merge; or (acceptable) send a single “continuing our convo” message, not a full restart.
- Dedupe key recommendation: phone + source + time window.

**A6: Webhook retries**
Simulate same request delivered 3 times within 30 seconds.
Expected:
- Idempotent processing; at most one conversation started.

### B) Jotform (source #2)
**Purpose:** verify a real form tool path.

**Form fields to include:** name, phone, service needed, zip, preferred time.

**Test cases:**
- J1 Baseline valid submission
- J2 Missing phone (leave blank if allowed)
- J3 Invalid phone (enter short string)
- J4 After-hours submission (submit during configured after-hours or simulate by changing schedule)
- J5 Duplicate submission (submit twice quickly)

Expected across J tests:
- <60s first SMS.
- Correct extraction of phone and name.
- After-hours uses the after-hours template (below).

### C) HubSpot CRM (source #3)
**Purpose:** verify CRM-triggered lead creation and note formatting.

Create/Update a Contact to trigger:
- H1 New Contact created with phone present
- H2 Contact created with missing phone
- H3 Duplicate (same phone already exists)

**Expected HubSpot note formatting (required):**
Every conversation should append a Note to the Contact (or Engagement) with:
- Source, lead timestamp, first-response latency
- Transcript summary
- Booking outcome and link

**Note template (copy/paste format):**
Title: `Lead Copilot Qualification — {YYYY-MM-DD HH:MM} — {Outcome}`
Body (example):
- Source: {Webhook/Jotform/HubSpot}
- Lead ID: {id}
- Lead Created (T0): {timestamp}
- First SMS Sent (T1): {timestamp}
- First Response Latency: {XX}s
- Collected: Service={...}; ZIP={...}; Urgency={...}; Preferred time={...}
- Outcome: {Booked / Needs human follow-up / Invalid phone / Opt-out}
- Booking link used: {url or “failed”}
- Transcript (last 6 messages):
  1) Copilot: ...
  2) Lead: ...

## 5) Required edge-case behavior tests (all sources)

### STOP / HELP compliance
**STOP:** When lead replies “STOP”, “UNSUBSCRIBE”, or “CANCEL”
Expected:
- Immediate confirmation message: “You’re opted out. Reply START to re-subscribe.”
- Lead is marked opted-out; no further outbound messages.

**HELP:** When lead replies “HELP”
Expected:
- Provide business identity + contact email: agent_bob_replit+lead-copilot@agentmail.to
- Example: “This is an automated text from Local Lead Response Copilot. Reply STOP to opt out. For help: agent_bob_replit+lead-copilot@agentmail.to”

### After-hours
Expected:
- If outside configured window, send after-hours message and do not start a long qualification.
- After-hours copy (safe):
  - “Thanks for reaching out — we’re currently closed. What’s the best time tomorrow for a quick call, morning or afternoon?”
- Optionally offer booking link if available.

### Multiple concurrent leads
Create 5 leads within 1 minute.
Expected:
- All receive first SMS <60s.
- No cross-talk (messages never go to wrong lead).

### Calendar/booking link failures
Simulate booking link returning 404 or timeout.
Expected:
- Copilot acknowledges issue and offers manual scheduling:
  - “Booking link is temporarily unavailable. What time works for you today/tomorrow? I’ll have the team confirm.”
- Creates internal follow-up task.

## 6) Deterministic fallback flow (LLM fails / times out)
**Trigger conditions:** LLM error, timeout > 3s, empty response, policy refusal.

**Fallback mode rules:**
- Use fixed question set; do not hallucinate.
- Max 4 questions; then escalate.
- If lead is angry/opt-out keywords appear, immediately comply.

**Deterministic questions (exact copy):**
1) “Thanks — what service do you need? (e.g., repair, install, estimate)”
2) “What’s your ZIP code?”
3) “How soon do you need help? (today / this week / just pricing)”
4) “Best time for a quick call? (morning / afternoon / evening)”

**Escalation message:**
- “Got it. I’m flagging this for a quick follow-up. If you prefer, share a good callback number and time.”

**Data capture:** persist answers in structured fields (service, zip, urgency, preferred_time). If any answer missing after 2 attempts, stop asking and escalate.

## 7) Results capture table (fill during execution)
Record each run:
- Run ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (Baseline/Missing phone/Invalid phone/STOP/HELP/etc.)
- T0 lead created
- T1 first SMS sent
- Latency seconds
- Pass/Fail (<60s)
- Notes + evidence link

## 8) Bugs/Fixes list (prioritized; update with findings)
**P0 (must fix before agencies):**
- Any case where STOP does not immediately opt-out.
- Any case where SMS sent to wrong number (identity mix-up).
- Any case where missing/invalid phone still triggers outbound send attempts.
- Any case where first response exceeds 60s consistently under normal load.

**P1 (fix soon):**
- Dedupe failures causing double-texting on webhook retries.
- After-hours message not used or qualification continues too long.
- Calendar link failure causes dead-end (no escalation).

**P2 (nice-to-have):**
- HubSpot note formatting inconsistent.
- Minor personalization errors.

## 9) Current execution results
**Status:** Not executed yet in live Jotform/HubSpot because integration endpoints/credentials are not available in this QA context. Once endpoints exist, this runbook can be executed in ~45–60 minutes and will produce timestamped evidence to prove the <60s KPI.
