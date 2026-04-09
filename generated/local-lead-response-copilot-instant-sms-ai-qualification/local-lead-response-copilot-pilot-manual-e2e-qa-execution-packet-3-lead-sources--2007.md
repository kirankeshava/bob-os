# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) — v1.1

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:12:55.562Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet (v1.1)

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)

**Proof URL to include in any customer comms:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**Support/ops email:** agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal (what “done” means)
During the first agency pilot onboarding, run manual end-to-end tests across **3 lead sources**:
1) **Generic Webhook JSON** (any tool that can POST)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

…and produce:
- Timestamped evidence that **first outbound SMS is sent <60 seconds** after lead creation (P95 target; at minimum 20 trials)
- Verified safe behavior for: missing phone, invalid phone, STOP/HELP, after-hours, concurrency, calendar link failures, webhook retries, duplicates, CRM note formatting
- A prioritized bug list (severity tied to churn/reputation)
- A documented **deterministic fallback** qualification flow used when the LLM fails/timeouts

## 1) Environments & prerequisites (free tier only)
- A sending phone number exists in the product (pilot will use real number; no spend by QA agent).
- Access to product logs (even basic request logs) or at minimum an “outbound message sent” timestamp.
- Test phones:
  - **Phone A:** QA tester’s real mobile
  - **Phone B:** second real mobile (for concurrency tests)
  - **Phone STOP:** can be Phone A after resetting opt-in (or a third device)

## 2) KPI measurement method (<60s first response)
**We measure “Speed-to-Lead” from the moment the lead is received/created to the moment the first SMS is sent.**

For each trial capture these timestamps:
- **T0 (Lead created):**
  - Webhook: timestamp when POST is made (curl time) or server receives request
  - Jotform: timestamp on submission confirmation
  - HubSpot: timestamp when contact/form submission is created
- **T1 (First SMS sent):** timestamp in provider logs/product logs OR the received SMS timestamp on device (use both when possible)

**Pass criteria:** T1 - T0 <= 60 seconds.
**Evidence required:** screenshot/log snippet per 5 trials minimum + a completed results table for all trials.

Recommended tools:
- Use a simple stopwatch and record times in the Results Table.
- If available, use any request logging/console output to avoid relying only on handset timestamps.

## 3) Deterministic Fail-Safe Qualification Mode (LLM-down safe behavior)
**Trigger conditions:**
- LLM API error, timeout > 6 seconds, empty response, or malformed tool output.

**Behavior:** Immediately switch to deterministic script below for the rest of the conversation until completion or escalation.

### 3.1 Deterministic SMS script (exact copy)
**Message 1 (immediate):**
> “Hi {first_name if available} — this is {BusinessName}. Got your request. What type of help do you need? Reply with 1) Repair 2) Install 3) Quote”

If user replies **1/2/3**:
**Message 2:**
> “Thanks. What’s your ZIP code?”

If ZIP appears valid (5 digits):
**Message 3:**
> “Got it. When do you want service? Reply 1) Today 2) This week 3) Just researching”

Then:
- If **Today** and **after-hours** (see Section 5.5):
  - Send: 
  > “We’re currently closed, but I can get you on the priority list for tomorrow. What time window works best? Reply 1) Morning 2) Afternoon 3) Evening”
- Else (in hours):
  - Send booking prompt:
  > “Perfect. Here’s a quick link to book a time: {calendar_link}. If you prefer, reply with a good time window and we’ll confirm.”

**Escalation rule:** if user replies with free-text that doesn’t match expected options twice in a row:
> “No problem — I’m looping in a human to help. What’s the best time to reach you?”

**Safety rule:** never claim “appointment confirmed” unless calendar booking succeeded or staff confirmed.

### 3.2 STOP/HELP compliance behavior (must always override)
- If inbound message contains **STOP** (or STOP ALL/UNSUBSCRIBE/CANCEL/END/QUIT):
  - Immediately respond:
  > “You’re opted out and will no longer receive texts. Reply START to resubscribe.”
  - Mark number as opted-out (do not text again unless START).

- If inbound message contains **HELP**:
  - Respond:
  > “Help: Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

## 4) Lead sources under test + setup notes
### 4.1 Source A — Generic Webhook JSON
**Purpose:** verify we can accept a standard JSON payload, validate phone, dedupe, handle retries.

**Canonical payload (valid):**
```json
{
  "source": "webhook",
  "lead_id": "qa-001",
  "first_name": "Jamie",
  "last_name": "Lee",
  "phone": "+14155550123",
  "email": "jamie.lee@example.com",
  "service": "HVAC repair",
  "zip": "94107",
  "timestamp": "2026-04-09T12:00:00Z"
}
```

**Missing phone payload:**
```json
{ "source":"webhook", "lead_id":"qa-002", "first_name":"NoPhone", "email":"nophone@example.com" }
```
Expected: do **not** send SMS; create lead record; flag as incomplete; (optional) send internal alert email.

**Invalid phone payload:**
```json
{ "source":"webhook", "lead_id":"qa-003", "first_name":"BadPhone", "phone":"12345" }
```
Expected: do **not** send SMS; record validation error; no crash.

**Duplicate lead payload:** send qa-001 twice.
Expected: second event should not trigger a second SMS within dedupe window; should append a note “duplicate event ignored” (or similar).

**Webhook retry simulation:** send same payload 3x spaced 5 seconds.
Expected: at most 1 outbound SMS; idempotency keyed by lead_id and/or phone+timestamp hash.

### 4.2 Source B — Jotform
**Purpose:** test a real form tool and mapping.

Minimum fields in Jotform:
- First Name
- Last Name
- Phone
- Email
- Service Needed (dropdown)
- ZIP

Expected mapping:
- Phone normalized to E.164
- UTM/source fields (if present) stored but not required

### 4.3 Source C — HubSpot
**Purpose:** validate CRM lead capture and note formatting.

**Expected HubSpot timeline note format (single canonical note):**
Title: `Lead Copilot — Qualification Transcript`
Body (plain text):
- `Lead received: {ISO timestamp}`
- `First SMS sent: {ISO timestamp} (Δ {seconds}s)`
- `Source: {Webhook|Jotform|HubSpot}`
- `Phone: +1...` `Email: ...`
- `Transcript:`
  - `Bot: ...`
  - `Lead: ...`
  - `Bot: ...`
- `Outcome: Booked | Needs follow-up | Opted-out | Invalid phone | After-hours queued`
- `Booking link used: Yes/No` + `Calendar event id (if any)`

Pass criteria: note is readable, not duplicated, and appended once per lead.

## 5) Test cases (manual) — steps + expected results
### 5.1 Missing phone
Steps: submit lead via webhook or form without phone.
Expected: no SMS attempt; lead marked “missing phone”; internal log entry created.

### 5.2 Invalid phone
Steps: submit lead with phone `12345`.
Expected: no SMS; validation error; system continues processing other leads.

### 5.3 STOP
Steps: submit a valid lead to Phone A, receive initial SMS, reply `STOP`.
Expected: opt-out confirmation message; no further messages even if lead submits again (unless `START`).

### 5.4 HELP
Steps: reply `HELP`.
Expected: help message includes support email + proof URL.

### 5.5 After-hours routing
Define business hours for test (example): Mon–Fri 9am–5pm local.
Steps: run a lead outside hours.
Expected: message acknowledges closed; offers next-day windows; no “we’ll call now” language.

### 5.6 Multiple concurrent leads
Steps: submit 5 leads within 10 seconds (mix Phone A/Phone B or unique numbers).
Expected: each valid lead gets first SMS <60s; no cross-talk; correct personalization.

### 5.7 Calendar link failure
Steps: set calendar_link to invalid URL OR simulate booking API down.
Expected: bot offers manual scheduling fallback; does not claim booking success; CRM note indicates “calendar failure.”

### 5.8 Webhook retries
Steps: send same lead payload 3 times.
Expected: 1 conversation only; retries logged; no spam.

### 5.9 Duplicate leads
Steps: same phone submits new lead within dedupe window.
Expected: either merge into existing open conversation or create a new thread but do not double-text within a short window; CRM note reflects dedupe decision.

### 5.10 CRM note formatting
Steps: run any successful lead through HubSpot path.
Expected: single canonical note with transcript; timestamps present; no broken JSON dumped into CRM.

## 6) Results table (paste into a doc/sheet during pilot)
Columns:
- Trial #
- Source (Webhook/Jotform/HubSpot)
- Scenario (Normal/MissingPhone/InvalidPhone/STOP/AfterHours/Concurrency/CalendarFail/Retry/Duplicate)
- T0 lead created (time)
- T1 first SMS sent (time)
- Δ seconds
- Pass <60s (Y/N)
- Notes / evidence link

## 7) Bug log template (severity tied to churn)
For each bug:
- ID
- Severity: P0 (compliance/spam), P1 (missed leads), P2 (UX), P3 (cosmetic)
- Scenario + source
- Steps to reproduce
- Expected vs actual
- Evidence (screenshots/logs)
- Suggested fix

## 8) Exit criteria for first agency pilot
- 20 trials run; **P95 <60s** or documented bottlenecks
- STOP/HELP verified with transcripts
- Dedupe/retry proven not to spam
- Deterministic fallback executed at least once (force LLM failure) and shown to complete qualification without hallucinations
- HubSpot note format accepted by agency (readable, not duplicated)
