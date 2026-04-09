# Local Lead Response Copilot — Pilot Manual E2E QA Test Plan + Results Template (3 Lead Sources, <60s KPI, Fail-safes)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:16:03.838Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Test Plan + Results Template

## Purpose (Why this exists)
Early churn for agencies/local businesses happens when response is slow, inconsistent, or non-compliant (STOP/HELP). Before investing in full automation, this manual plan verifies core reliability end-to-end during pilots and documents deterministic fallbacks so the system behaves safely even if the LLM or downstream tools fail.

**Primary KPI:** First outbound SMS sent within **< 60 seconds** of lead creation.

**Scope:** End-to-end flows for **3 lead sources**:
1) **Generic webhook JSON** (direct POST)
2) **Real form tool** (choose one for pilots; recommended: Typeform or Jotform)
3) **CRM source** (choose one for pilots; recommended: HubSpot or GoHighLevel)

This plan also covers fail-safe behavior: missing/invalid phone, STOP/HELP, after-hours, concurrency, calendar failures, webhook retries, dedupe, and CRM note formatting.

---

## Preconditions / Test Environment
### Configuration Checklist (must be done once per environment)
- [ ] SMS provider is connected (e.g., Twilio) and can send/receive.
- [ ] A test phone number is available to receive SMS and reply with STOP/HELP.
- [ ] The “from” number is correct and branded message prefix is set (business name or short identifier).
- [ ] Business hours configured (e.g., Mon–Fri 8am–6pm local time). After-hours routing enabled.
- [ ] Appointment booking method configured:
  - [ ] Calendar link OR
  - [ ] Automated scheduling integration OR
  - [ ] “Request preferred time” fallback.
- [ ] Dedupe rule defined (example): treat same phone + same source within 24h as duplicate.
- [ ] Logging enabled (at minimum): lead_received_timestamp, first_sms_sent_timestamp, message_delivery_status.

### Data Needed
- Test lead payloads (examples below).
- At least 1 working form in chosen form tool.
- At least 1 connected CRM pipeline/list where new leads appear.

---

## Lead Sources Under Test
### Source A: Generic Webhook JSON
**Goal:** Validate we can accept arbitrary lead payloads and map name/phone/service.

**Sample payload (valid):**
```json
{
  "source": "webhook_test",
  "lead_id": "wh_001",
  "first_name": "Jamie",
  "last_name": "Lee",
  "phone": "+14155550123",
  "email": "jamie@example.com",
  "service": "water heater repair",
  "zip": "94107",
  "notes": "No hot water since morning"
}
```

### Source B: Real Form Tool (Typeform/Jotform)
**Goal:** Validate native webhook/form integration and field mapping.
- Form fields required: name, phone, service needed, optional email.
- Ensure form tool sends payload consistently.

### Source C: CRM (HubSpot/GoHighLevel)
**Goal:** Validate CRM-triggered lead events, note creation, and dedupe.
- Trigger: new contact created OR form submission in CRM OR pipeline stage change to “New Lead”.
- Ensure we can write back outcomes (qualification summary + booking link + status).

---

## Deterministic Fallback Flow (Must Work Even If LLM Fails)
### Trigger conditions for fallback
- LLM timeout > 5s (configurable)
- LLM error/invalid response
- LLM returns empty/unsafe output

### Deterministic Question Script (short, safe)
**SMS 1 (immediate):**
“Hi {first_name}, it’s {biz_name}. Got your request for {service}. Are you looking to book **today** or **this week**? Reply 1) Today 2) This week”

**If reply = 1 or “today”:**
“Got it—what time works best? Reply 1) Morning 2) Afternoon 3) Evening”

**If reply = 2 or “this week”:**
“Perfect—what day works best? Reply 1) Mon/Tue 2) Wed/Thu 3) Fri/Sat”

**Then:**
“Thanks. Please share the best address/ZIP for the job.”

**Booking step:**
- If calendar link available: “You can grab a time here: {calendar_link}. If you prefer, text your preferred time and we’ll confirm.”
- If calendar link fails/unavailable: “Text your preferred time window and we’ll confirm ASAP.”

**Always:** Write the collected answers to CRM notes in a consistent format (see below).

### Compliance handling
- If lead texts **STOP**: immediately stop messaging, mark contact as DNC in CRM if possible.
- If lead texts **HELP**: reply with a short support + opt-out line.

---

## Test Execution — Core KPI Timing
For every test case below, record:
- T0 = lead created/received timestamp
- T1 = first SMS sent timestamp (from logs/provider)
- Tdiff = T1 - T0 (must be <60s)
- Delivery status (sent/delivered/failed)

**Pass criteria:** ≥ 95% of tests show first SMS sent <60s; no compliance violations; safe fallback is used when LLM fails.

---

## Test Cases (Run Across Sources A/B/C)
Use at least one run per source per test where applicable.

### 1) Happy path (valid phone)
**Steps:** Submit lead -> observe SMS -> respond -> observe qualification -> booking prompt -> CRM note.
**Expected:** <60s first SMS; coherent follow-up; CRM updated.

### 2) Missing phone
**Input:** phone is null/empty.
**Expected:** No SMS attempt; create CRM task/note “Missing phone”; optional email follow-up if email present; mark lead as “Needs Contact Info”.

### 3) Invalid phone
**Input:** phone = “12345” or non-E.164.
**Expected:** No SMS attempt OR immediate validation failure; create CRM note; do not spam.

### 4) STOP compliance
**Steps:** Submit valid lead -> receive SMS -> reply “STOP”.
**Expected:** Confirm opt-out per carrier rules; no further messages; CRM flagged DNC.

### 5) HELP handling
**Steps:** Reply “HELP”.
**Expected:** Provide brief help + business contact + how to opt out; continue only if user continues (depending on policy).

### 6) After-hours behavior
**Setup:** Set test time outside business hours.
**Expected:** Immediate SMS acknowledging receipt + setting expectation (e.g., “We’ll reach out at 8am”); optionally offer booking link; no aggressive multi-step qualification after-hours unless configured.

### 7) Multiple concurrent leads (load)
**Steps:** Send 10 leads within 60 seconds.
**Expected:** All get first SMS <60s; no cross-talk between conversations; correct lead mapping.

### 8) Calendar link failure
**Setup:** Use an invalid/expired booking link or simulate 500.
**Expected:** Fallback to “text preferred time window”; create internal alert/task; no dead-end.

### 9) Webhook retries
**Steps:** Send same lead_id multiple times (simulate retries) and also send identical payload without lead_id.
**Expected:** Dedupe prevents duplicate texting; logs show idempotent handling.

### 10) Duplicate leads (real-world)
**Steps:** Same phone submits twice within 10 minutes.
**Expected:** Either suppress second SMS or send a gentle confirmation (“Still need help?”) depending on policy; must not spam.

### 11) CRM note formatting
**Steps:** Complete qualification; inspect CRM record.
**Expected:** Note uses consistent template (below), no broken markdown, no missing fields.

---

## CRM Note Template (Standardized)
**Title:** Lead Qualification — Local Lead Response Copilot

**Body (example):**
- Source: {source}
- Lead ID: {lead_id}
- Received: {T0_iso}
- First SMS Sent: {T1_iso} (Δ {seconds}s)
- Contact: {first_name} {last_name} | {phone} | {email}
- Service Requested: {service}
- Location/ZIP: {zip_or_address}
- Urgency: {today/this_week/unknown}
- Preferred Time: {morning/afternoon/evening or time window}
- Booking: {booked_link / pending / failed_calendar_link}
- Conversation Transcript (last 6 messages):
  1) …
  2) …

---

## Results Log (Fill During Pilot)
| Test ID | Source (A/B/C) | Scenario | T0 | T1 | Δ seconds | Delivery | Pass/Fail | Notes |
|---|---|---|---|---|---:|---|---|---|
| 001 | A | Happy path |  |  |  |  |  |  |
| 002 | B | Missing phone |  |  |  |  |  |  |
| 003 | C | STOP |  |  |  |  |  |  |

**KPI Summary:**
- Total tests: __
- <60s first response: __ / __ (__%)
- Failures >60s: __ (list IDs)

---

## Bug / Fix Log (Use This to Drive Engineering)
| Bug ID | Severity (P0/P1/P2) | Source | Description | Steps to Reproduce | Expected | Actual | Proposed Fix | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|
| B-001 | P0 | A/B/C | SMS sent to invalid phone format | Submit phone=12345 | Validate & stop | Attempted send | Add E.164 validation + normalize | Eng | Open |

### Common P0/P1 issues to look for
- P0: Messaging after STOP
- P0: >60s first SMS consistently
- P0: Wrong lead mapped to wrong conversation (cross-talk)
- P1: Calendar failures cause dead-end
- P1: Dedupe missing leading to spam
- P2: CRM note formatting inconsistencies

---

## “Verified <60s First Response” Procedure
To claim verification, we need evidence:
1) Provider logs screenshot/export showing timestamps OR system logs with UTC.
2) At least 20 lead events across 3 sources (minimum 5 per source).
3) Report includes min/median/p95 response times.

**Response time calculations:**
- Δ seconds = first_sms_sent_timestamp - lead_received_timestamp
- Report min/median/p95 to detect tail latency.

---

## Go/No-Go Criteria for Early Agencies
**Go if:**
- STOP/HELP compliant
- Dedupe prevents spam
- After-hours behavior is safe
- p95 first SMS <60s across tested sources

**No-Go if:**
- Any STOP violation
- Cross-talk between leads
- Frequent >60s delays without clear mitigation
