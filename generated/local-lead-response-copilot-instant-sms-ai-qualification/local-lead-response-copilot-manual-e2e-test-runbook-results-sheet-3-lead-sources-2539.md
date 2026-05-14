# Local Lead Response Copilot — Manual E2E Test Runbook + Results Sheet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:32:08.581Z

---

# Local Lead Response Copilot — Manual E2E Test Runbook (Pilot)

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)

**Legitimacy URL to share with agencies/customers (if needed):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
**Support/ops email:** agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal & KPI
**Goal:** Prove we reliably send the first SMS within **<60 seconds** of lead creation across **3 lead sources**, and fail safely when AI/LLM or downstream services fail.

**Primary KPI:** Lead submission timestamp → first outbound SMS timestamp **< 60s**.

**Evidence required:** For each trial, store:
- Lead source + scenario
- Lead submit timestamp (T0)
- “Lead received” timestamp in app logs (T1, if available)
- First SMS queued/sent timestamp (T2)
- Screenshot or log URL/reference for T0/T2

**Minimum sample size for claim:** 20 total trials (suggested: 8 webhook, 6 Jotform, 6 HubSpot). Pass requires **≥ 19/20** under 60s; any STOP/HELP failure is auto-fail (severity critical).

---

## 1) Lead Sources Under Test (3)
1) **Generic Webhook JSON** (simulates any ad platform/form tool)
2) **Jotform** (real form tool, free tier)
3) **HubSpot CRM** (CRM ingestion + note logging)

> Preconditions: You must have (a) the product’s inbound webhook endpoint URL, (b) access to delivery logs (Twilio or SMS provider logs), and (c) a test phone number that can receive SMS.

---

## 2) Deterministic Fail-safe Qualification Mode (LLM Down / Timeout)
### 2.1 When to trigger deterministic mode
Trigger deterministic mode if any occurs:
- LLM request errors, times out, or returns empty/invalid response
- Latency threatens KPI (e.g., LLM call > 8 seconds)
- Model output fails schema validation (missing required fields)

### 2.2 Deterministic script (exact questions)
**Message 1 (immediate, always <60s):**
“Hi {first_name or there}! Thanks for reaching out to {business_name}. I can help get you booked fast. What service do you need? Reply with 1) Repair 2) Install 3) Quote 4) Other.”

**Branch A:** If reply = 1/2/3/4 →
**Message 2:** “Got it. What’s your ZIP code?”

**Message 3:** “What’s the best day/time for a quick call or appointment? (e.g., ‘Today after 3pm’).”

**Message 4 (booking):**
- If calendar link is working: “Perfect—grab a slot here: {calendar_link}. If you prefer, reply with a time window and we’ll confirm.”
- If calendar link failed/unavailable: “Our booking link is temporarily down—reply with your preferred 2-hour window and we’ll confirm ASAP.”

**Escalation-to-human rule:**
- If lead replies with anything unclear 2 times, or asks for pricing/emergency: “Thanks—looping in a specialist now. You’ll get a confirmation shortly.” Create an internal alert / task.

**Timeout rule:** If no reply after 10 minutes → send one follow-up:
“Just checking—still need help with {service}? Reply 1-4 above and we’ll get you booked.”

### 2.3 Compliance messages
- If inbound contains **STOP** (case-insensitive): immediately confirm opt-out: “You’re opted out and will no longer receive messages.” Mark lead as DNC.
- If inbound contains **HELP**: “For help, reply here or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

---

## 3) Test Scenarios (Required)
Run the scenarios below across sources as applicable.

### S1 Missing phone
**Input:** Lead payload has no phone OR empty phone.
**Expected:**
- No SMS attempt
- System logs: “missing phone”
- Optional: create CRM record tagged “missing_phone” or send internal alert

### S2 Invalid phone
**Input:** Phone has letters or too short (e.g., “1234”, “abc”).
**Expected:**
- No SMS attempt
- Clear validation error logged
- No retries that spam provider

### S3 STOP and HELP
**Input:** Recipient replies STOP; separately replies HELP.
**Expected:**
- STOP: immediate opt-out confirmation + DNC flag + no further messages.
- HELP: returns support text including agent_bob_replit+lead-copilot@agentmail.to.

### S4 After-hours routing
**Input:** Lead arrives outside business hours.
**Expected:**
- Still sends first response <60s but with after-hours message: “We’re closed right now—confirming first thing at {open_time}.”
- If configured: offer booking link anyway

### S5 Multiple concurrent leads
**Input:** Submit 5 leads within 30 seconds.
**Expected:**
- Each receives first SMS <60s
- No cross-talk (replies map to correct lead)

### S6 Calendar link failure
**Input:** Simulate calendar link 404 / API failure.
**Expected:**
- Message switches to “booking link temporarily down” copy
- Creates internal task to manually book

### S7 Webhook retries
**Input:** Send same event 3 times with same event_id (simulate retries).
**Expected:**
- Only one SMS thread created/sent
- Deduped by event_id or fingerprint

### S8 Duplicate leads
**Input:** Same phone submits twice within 5 minutes.
**Expected:**
- Either (a) continue same thread and note as duplicate, or (b) suppress second intro; never spam intros repeatedly

### S9 CRM note formatting (HubSpot)
**Input:** A qualified conversation completes.
**Expected note format (example):**
Title: “Lead Copilot Qualification Summary”
Body:
- Source: Jotform / Webhook / HubSpot
- First response time: 00:00:34
- Service: Repair
- ZIP: 94110
- Preferred time: Tomorrow 10–12
- Booking outcome: Booked via link / Requested callback / Calendar down fallback
- Transcript (last 5 messages) with timestamps

---

## 4) Execution Steps by Lead Source

### 4.1 Generic Webhook JSON
**Tooling:** curl / Postman.

**Sample payload (valid):**
```json
{
  "event_id": "evt_001",
  "source": "webhook_test",
  "submitted_at": "2026-05-14T12:00:00Z",
  "lead": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+14155550123",
    "email": "test@example.com",
    "service": "Repair",
    "zip": "94110"
  }
}
```

**Steps:**
1. Record T0 (time you hit send).
2. POST to inbound webhook endpoint.
3. Confirm app receives lead (T1, if UI/log exists).
4. Confirm first SMS sent (T2) in SMS logs.
5. Compute T2 - T0.

**Retry test:** resend same payload 3 times (same event_id). Expect only one SMS.


### 4.2 Jotform (Real Form Tool)
**Form fields (exact):**
- First Name (text)
- Last Name (text)
- Phone (phone)
- Email (email)
- Service Needed (dropdown: Repair/Install/Quote/Other)
- ZIP (text)
- Consent checkbox (optional, if using)

**Webhook mapping:** configure Jotform “Webhook” integration to send submission JSON to inbound endpoint.

**Steps:**
1. Submit the form; record T0 from submission confirmation time.
2. Verify the webhook request delivered (Jotform has submission log). Capture as evidence.
3. Verify first SMS time (T2).
4. Run missing phone + invalid phone by submitting with empty/garbage values.


### 4.3 HubSpot (CRM)
**Objective:** Ensure ingestion triggers response (if HubSpot is a source) and notes are formatted correctly.

**Steps:**
1. Create a test contact/lead in HubSpot with phone.
2. Trigger “new lead” event (e.g., form submission, workflow, or webhook depending on integration).
3. Confirm first SMS <60s.
4. After conversation completes, confirm note is written with the expected format.
5. Run duplicate lead by re-creating/updating the same contact.

---

## 5) Results Capture Table (paste into sheet)
| Trial # | Source | Scenario | Lead Identifier (event_id/phone) | T0 submit | T2 first SMS sent | Delta (s) | Pass (<60s) | Evidence (link/screenshot/log ref) | Notes |
|---:|---|---|---|---|---|---:|---|---|---|
| 1 | Webhook | Valid | evt_001 / +1415… | 12:00:00 | 12:00:34 | 34 | PASS | twilio-log-… | |

**STOP/HELP evidence:** include full inbound/outbound transcript snippets with timestamps.

---

## 6) Bug / Fix Log (pilot-friendly)
| Bug ID | Severity (Blocker/Critical/Major/Minor) | Scenario | Steps to Reproduce | Expected | Actual | Impact (churn/reputation) | Suggested Fix | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|

**Severity rules:**
- **Blocker:** STOP fails, messages sent without phone validation, or >60s consistently.
- **Critical:** Duplicate spam, calendar failure not handled, cross-talk between concurrent leads.

---

## 7) Pass/Fail Gate for Pilot Readiness
Pilot-ready if:
1. **First SMS <60s** in ≥ 95% of trials (≥19/20)
2. **STOP/HELP** compliant 100%
3. Missing/invalid phone causes **no SMS** attempts
4. Dedupe works for webhook retries and repeated submissions
5. Calendar failure triggers safe fallback copy + internal task
6. HubSpot note formatting matches expected template

---

## 8) Known Unknowns (must be filled during first run)
- Actual inbound webhook endpoint URL + auth requirements
- Where to read “lead received” timestamps (app logs/UI)
- SMS provider log access method
- Business hours configuration source
- How dedupe is implemented (event_id, phone+window, etc.)

When these are known, run the 20-trial set and attach evidence. If an agency asks for reliability proof, share the KPI table + STOP/HELP transcript evidence and reference the product URL above.