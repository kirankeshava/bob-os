# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet (3 Sources, <60s KPI, Fail-safe Deterministic Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:04:02.278Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)  
**Website (share for legitimacy):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
**Support/ops email:** agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal (what we must prove in first pilots)
1) **Speed-to-lead KPI:** First outbound SMS is sent **<60 seconds** after a lead is created for each of 3 lead sources:
   - **A. Generic Webhook JSON** (any source)
   - **B. Jotform** (real form tool)
   - **C. HubSpot** (CRM source)
2) **Reputation safety:** If the LLM fails (timeout/error), the system continues qualification via **deterministic safe mode**.
3) **Compliance & correctness:** STOP/HELP, after-hours behavior, retries/dedupe, calendar failures, invalid/missing phone handling, concurrent leads, and CRM logging are correct.

## 1) Test environments / prerequisites (free-tier friendly)
- A test SMS-capable sending number exists in the product (no purchase required by this QA doc; use whatever number is configured in the pilot).
- Access to:
  - Product logs (at least: lead_ingested timestamp, sms_send_attempt timestamp, sms_provider_accept timestamp if available)
  - Lead record view (to see status: contacted/qualified/booked)
  - CRM note or activity log (HubSpot)
- Optional but recommended:
  - A stopwatch (phone timer is fine)
  - A spreadsheet (or use the Results table below)

## 2) Evidence capture (how to measure “<60s”)
For each trial, record these timestamps (choose the most reliable sources you have):
- **T0 Lead Created**
  - Webhook: time request was sent (client-side timestamp)
  - Jotform: submission timestamp shown in Jotform
  - HubSpot: form submission / contact create / workflow trigger timestamp
- **T1 Copilot Received**
  - Product log entry “lead_ingested” (or equivalent)
- **T2 First SMS Attempted**
  - Product log entry “sms_send_attempt”
- **T3 First SMS Delivered/Provider Accepted** (if available)
  - SMS provider acceptance timestamp or delivered event

**Primary KPI:** (T2 - T0) < 60 seconds.  
**Secondary KPI:** (T3 - T0) < 90 seconds when delivery receipts exist.

**Pass/Fail rule:** If any source has >5% failures over 20 trials (1+ failures), treat as **P1** unless explained by carrier delays and T2 is still <60s.

## 3) Lead sources: setup + test steps

### A) Generic Webhook JSON (baseline)
**Purpose:** Validate ingestion and SMS response for “any source.”

**Required fields (expected):**
- first_name (string)
- last_name (string, optional)
- phone (E.164 preferred, e.g., +14155550123)
- email (optional)
- service (optional)
- zip (optional)
- consent (optional boolean)
- source (string, e.g., "webhook")

**Test payloads (copy/paste):**
1) Valid lead
```json
{
  "first_name": "Test",
  "last_name": "Webhook",
  "phone": "+14155550123",
  "email": "test.webhook@example.com",
  "service": "Water heater replacement",
  "zip": "94107",
  "source": "generic_webhook"
}
```
2) Missing phone
```json
{
  "first_name": "Test",
  "last_name": "NoPhone",
  "email": "nophone@example.com",
  "service": "Drain cleaning",
  "zip": "94107",
  "source": "generic_webhook"
}
```
3) Invalid phone
```json
{
  "first_name": "Test",
  "last_name": "BadPhone",
  "phone": "123",
  "email": "badphone@example.com",
  "service": "AC repair",
  "zip": "94107",
  "source": "generic_webhook"
}
```

**Steps (per trial):**
1. Start stopwatch.
2. Send payload to the product’s inbound webhook endpoint.
3. Record T0 (send time), then capture T1/T2 from product logs.
4. Confirm first SMS content matches either AI flow or deterministic safe mode.
5. Stop stopwatch once T2 is logged; record elapsed seconds.

**Expected:**
- Valid lead: First SMS sent <60s.
- Missing/invalid phone: **No SMS** attempt; lead marked “needs manual follow-up” + internal alert/email if configured.


### B) Jotform (real form tool)
**Purpose:** Validate common SMB form submissions.

**Jotform form fields (minimum):**
- Name
- Phone (required)
- Email (optional)
- “What do you need help with?” (service)
- Consent checkbox (optional)

**Steps:**
1. Create a test Jotform with the above fields.
2. Configure Jotform to POST to the Copilot webhook (or integration route).
3. Submit the form using a test phone number.
4. Record:
   - T0 from Jotform submission time
   - T1/T2 from product logs
5. Confirm CRM note formatting if Jotform also pushes into HubSpot (optional).

**Expected:**
- SMS sent <60s.
- If Jotform resends/webhook retries: Copilot dedupes (no double texting).


### C) HubSpot (CRM)
**Purpose:** Validate agency workflows where leads originate in CRM.

**Trigger options (choose one based on product integration):**
- New contact created with lifecycle stage = Lead
- Form submission event
- Workflow enrollment triggers webhook to Copilot

**Steps:**
1. Create a test contact with valid phone.
2. Trigger the Copilot flow.
3. Record T0 from HubSpot event time, then T1/T2 from product logs.
4. Verify **HubSpot note** is created/updated with correct formatting (see section 6).

**Expected:**
- SMS sent <60s.
- HubSpot note created within 2 minutes.


## 4) High-risk scenarios (must test)
Run these at least once per source where applicable.

### 4.1 Missing phone
**Input:** phone null/empty.
**Expected:**
- No outbound SMS.
- Lead status = “invalid” or “needs info.”
- Log entry clearly states reason.
- If configured: notify operator via email to agent_bob_replit+lead-copilot@agentmail.to.

### 4.2 Invalid phone
**Input:** not parseable / too short / non-E.164.
**Expected:** same as missing phone.

### 4.3 STOP / HELP compliance
**Steps:**
1. After receiving first SMS, reply “STOP”.
2. Ensure no further messages are sent.
3. Reply “HELP” from a different test number (or before STOP) to verify help response.

**Expected:**
- STOP: immediate confirmation (or provider-managed), user is suppressed.
- HELP: responds with short help text and opt-out instructions.
- Suppression persists across future duplicate leads for same phone.

### 4.4 After-hours behavior
**Setup:** Define business hours (e.g., 8am–6pm local).
**Steps:** Submit lead outside hours.
**Expected:**
- First SMS still sent <60s but message should set expectation (“We’ll reach out first thing at 8am”) OR route to emergency path if configured.
- Booking link shown only if allowed after-hours.

### 4.5 Multiple concurrent leads
**Steps:** Fire 5 leads within 10 seconds.
**Expected:**
- All 5 receive first SMS <60s.
- No cross-talk (messages and CRM notes must not mix identities).

### 4.6 Calendar link failures
**Simulate:** booking link endpoint down or returns error.
**Expected:**
- Copilot apologizes and offers alternate: “Reply with 2 times that work” OR “Call us at X”.
- Creates internal task/note for manual booking.

### 4.7 Webhook retries
**Simulate:** resend identical payload 3 times.
**Expected:**
- Exactly one outbound SMS.
- Lead record shows dedupe reason (same external_id or hash within window).

### 4.8 Duplicate leads (same phone)
**Steps:** Submit same phone twice within 15 minutes.
**Expected:**
- Second submission either suppressed or receives a context-aware message (“We just reached out—are you still looking for help?”) but **must not spam**.
- CRM note appended, not duplicated messily.

### 4.9 CRM note formatting
Verify notes are readable, consistent, and agency-friendly.

## 5) Deterministic safe mode (LLM failure fallback)
**When to enter safe mode:**
- LLM API timeout > 5 seconds (configurable)
- LLM returns error/empty output
- Output fails validation (contains disallowed content, too long, missing required question)

**Safe mode rules:**
- Use a fixed question sequence.
- Keep each message <= 320 characters.
- Max 3 questions before escalation.
- Always offer opt-out instructions.

**Deterministic questions (exact copy):**
1) **Message 1 (immediate):**
   "Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—can I ask 2 quick questions to get you the fastest quote? Reply YES to continue or STOP to opt out."
2) If YES:
   **Message 2:**
   "What service do you need? (Reply 1) Repair 2) Install 3) Quote 4) Other)"
3) Next:
   **Message 3:**
   "What’s your address or ZIP code?"
4) Next:
   **Message 4:**
   "When would you like service? (Reply 1) ASAP 2) Today 3) This week 4) Just pricing)"

**Escalation-to-human triggers:**
- User answers with free-text that doesn’t map to options twice
- User asks pricing details requiring context
- Calendar/booking failure detected

**Escalation message (exact copy):**
"Got it—thanks. I’m looping a specialist in to confirm details and times. If you prefer, reply with the best time to call you today."

**Logging requirement:** Each safe-mode conversation must set `qualification_mode = deterministic` and capture Q/A pairs for CRM note.

## 6) HubSpot note format (expected)
Create one note per lead, append updates as conversation continues.

**Subject:** Lead Response Copilot — New Lead Qualified (or In Progress)

**Body template (copy/paste):**
- Source: {{source}}  
- Lead Name: {{first_name}} {{last_name}}  
- Phone: {{phone_e164}}  
- Email: {{email}}  
- Created: {{t0_iso}}  
- First SMS Sent: {{t2_iso}} ({{t2_minus_t0_seconds}}s)  
- Mode: {{ai_or_deterministic}}  

**Qualification Q/A:**
1. Service needed: {{service_answer}}  
2. ZIP/Address: {{zip_answer}}  
3. Timing: {{timing_answer}}  

**Outcome:** {{booked / wants_call / needs_followup / opted_out}}  
**Opt-out status:** {{true/false}}  
**Errors (if any):** {{calendar_error / llm_timeout / sms_failed}}

**Pass criteria:** No markdown glitches, no JSON blobs, no missing timestamps.

## 7) Results capture table (20 trials minimum)
Copy into a doc/spreadsheet and fill as you test.

| Trial | Source | Scenario | T0 Lead Created | T2 First SMS Attempt | T2-T0 (sec) | First SMS content OK? | STOP/HELP OK? | Dedupe OK? | CRM Note OK? | Pass/Fail | Notes |
|------:|--------|----------|-----------------|----------------------|-------------|------------------------|--------------|------------|--------------|----------|------|
| 1 | Webhook | Valid | | | | | | | | | |
| 2 | Webhook | Missing phone | | | | | | | | | |
| 3 | Webhook | Invalid phone | | | | | | | | | |
| 4 | Jotform | Valid | | | | | | | | | |
| 5 | HubSpot | Valid | | | | | | | | | |
| … | … | … | | | | | | | | | |

**KPI acceptance:** All “Valid” trials must be <60s at T2-T0.

## 8) Bug/Fix log template (agency reputation-focused)
| Bug ID | Severity (P0/P1/P2) | Scenario | Steps to Reproduce | Expected | Actual | Evidence (links/screenshots/log ids) | Suggested Fix | Owner | Status |
|-------:|----------------------|----------|--------------------|----------|--------|--------------------------------------|--------------|-------|--------|
| 1 | P0 | STOP compliance | Reply STOP after first SMS | Suppress forever | Still texts | | Add suppression table + provider opt-out sync | | Open |

**Severity definitions:**
- **P0:** compliance/legal risk (STOP ignored), spamming duplicates, texting wrong person.
- **P1:** breaks booking/qualification or misses <60s KPI often.
- **P2:** formatting issues, edge-case copy improvements.

## 9) Expected issues to watch (common early-stage failures)
- Phone normalization: accepts (415) 555-0123 but fails to convert to E.164
- Duplicate suppression window too short
- Concurrency: shared state causing cross-lead mixups
- After-hours logic uses wrong timezone
- Calendar failures not caught (user receives broken link)
- CRM notes appended repeatedly without separators

## 10) Operator run time
- Setup: 10–15 min (Jotform + HubSpot triggers)
- Execution: 30–45 min (20 trials including edge cases)
- Output: 5–10 min (summarize KPI + file bugs)

**Output required for pilot sign-off:**
1) Completed Results table with at least 20 trials.  
2) Evidence that all valid trials meet **<60s first SMS attempt** (T2-T0).  
3) Bug log with at least P0/P1 items addressed before scaling.
