# Local Lead Response Copilot — Manual E2E Pilot QA Execution Script (3 Lead Sources) + <60s KPI Evidence + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:28:59.622Z

---

## Purpose
Validate end-to-end lead response across 3 lead sources (Generic Webhook JSON, Jotform, HubSpot) with a hard KPI of **<60 seconds to first SMS** and safe, deterministic behavior when the LLM fails. This is designed for first agency pilots (manual, no automation).

**Legitimacy link to share if a partner asks:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
**Support contact (use in messages/escalations):** agent_bob_replit+lead-copilot@agentmail.to

---

## System Under Test (SUT) assumptions
1. A lead comes in via webhook/form/CRM.
2. System normalizes phone, checks compliance (STOP/HELP), dedupes, routes based on hours.
3. System sends first SMS to lead, then qualifies via 2–4 questions.
4. System logs activity to CRM (HubSpot) as a note (or engagement) with consistent formatting.
5. If LLM errors/timeouts, system switches to **deterministic fallback** flow below.

If any assumption is false, record as a **Blocker** in the Bug Log.

---

## KPI & Evidence Standard (<60s)
### Required timestamps (capture for every trial)
- **T0 Lead received:** timestamp when SUT receives the lead event (webhook received time OR form submit time OR CRM event time).
- **T1 First outbound SMS queued/sent:** timestamp in SMS provider logs OR SUT logs.
- **Δ = T1 - T0** must be **<= 60 seconds**.

### Evidence to store per trial
- Screenshot or copied log lines for T0 and T1
- The exact inbound payload (or a redacted version)
- The first SMS content
- Outcome status: PASS/FAIL with reason

### Sample size gate (pilot readiness)
- Minimum **20 trials total** across 3 sources.
- Minimum **5 trials per source**.
- Include at least **3 edge-case trials** (invalid/missing phone, STOP, after-hours, dedupe/retry).

---

## Lead Sources Covered
### Source A: Generic Webhook JSON
Used for “any form tool / FB lead ads / Zapier”-style integrations.

### Source B: Jotform (real form tool)
Test using a free Jotform form that posts to SUT webhook.

### Source C: HubSpot (CRM)
Test using HubSpot form submission or contact creation trigger that results in the SUT receiving lead data and writing a note back.

---

## Pre-flight Checklist (15 minutes)
1. **Config:** Confirm SUT has a test route/pipeline for the business and a calendar/booking destination (even if it’s a dummy link).
2. **Hours:** Set business hours for testing: 9am–5pm local.
3. **Deterministic mode switch:** Confirm there is a toggle or rule: “LLM timeout/error => deterministic flow.” If no toggle exists, simulate by blocking LLM key or setting timeout low.
4. **STOP/HELP keywords:** Confirm the system respects STOP and HELP at any point.
5. **Test phone numbers:** Have at least 2 test mobiles available.

---

## Canonical Normalized Lead Schema (what SUT should output internally)
- lead_id (string)
- source (webhook|jotform|hubspot)
- full_name
- phone_e164 (validated)
- email
- service_category (optional)
- job_type (optional)
- zip (optional)
- consent (true/false/unknown)
- received_at (T0)

Acceptance: phone must be E.164 or the lead must be **soft-failed** with no outbound SMS.

---

## Test Data & Payloads (copy/paste)
### A1. Generic Webhook JSON — Valid Lead
POST to /webhook (or the SUT endpoint)
```json
{
  "lead_id": "webhook-001",
  "source": "webhook",
  "full_name": "Pat Garcia",
  "phone": "+14155550123",
  "email": "pat@example.com",
  "service": "Plumbing",
  "zip": "94107",
  "message": "Need a quote for a leaking water heater"
}
```
Expected: First SMS within 60s, qualification starts.

### A2. Missing phone
```json
{
  "lead_id": "webhook-002",
  "source": "webhook",
  "full_name": "Sam Lee",
  "email": "sam@example.com",
  "service": "HVAC",
  "zip": "94110"
}
```
Expected: **No SMS sent.** Create internal alert/log entry. Optional: email internal team at agent_bob_replit+lead-copilot@agentmail.to (if supported) with “Missing phone”.

### A3. Invalid phone
```json
{
  "lead_id": "webhook-003",
  "source": "webhook",
  "full_name": "Jordan Kim",
  "phone": "12345",
  "email": "jordan@example.com"
}
```
Expected: **No SMS.** Log validation failure.

### A4. Duplicate lead (same lead_id)
Send A1 again (same lead_id).
Expected: Deduped—no second SMS. Add CRM note “Duplicate suppressed” (if CRM connected) or log.

### A5. Webhook retry (same payload, new delivery id)
Add header simulation (if applicable) or include:
```json
{ "lead_id": "webhook-001", "delivery_id": "retry-2", "phone": "+14155550123", "full_name": "Pat Garcia" }
```
Expected: Suppress if same lead_id/phone within dedupe window.

---

### B. Jotform Field Mapping (spec)
Create a Jotform with fields:
- Name (first + last)
- Phone
- Email
- Service Needed (dropdown)
- Zip
- Details (textarea)

**Mapping acceptance:**
- Jotform phone must normalize to E.164.
- Name must be concatenated.
- Service Needed maps to service.

Edge cases to run in Jotform:
- Phone empty
- Phone with punctuation (e.g., (415) 555-0123)
- Duplicate submit (submit same data twice)

Expected: same as webhook tests; <60s first SMS.

---

### C. HubSpot Mapping & Note Formatting
Trigger: HubSpot form submission or contact creation leading to SUT processing.

**Required HubSpot note template (exact format):**
Title: `Lead Copilot Qualification — {STATUS}`
Body:
```
Source: {source}
Lead ID: {lead_id}
Received: {ISO8601}
First SMS Sent: {ISO8601}
Speed-to-Lead: {seconds}s

Contact:
- Name: {full_name}
- Phone: {phone_e164}
- Email: {email}
- Zip: {zip}

Transcript:
1) System: {msg1}
2) Lead: {reply1}
3) System: {msg2}
...

Outcome:
- Qualified: {yes/no}
- Job Type: {value/unknown}
- Urgency: {emergency/today/this week/quote}
- Preferred time: {value/unknown}
- Booking: {booked link or 'not booked'}

Fallback Used: {true/false}
Errors: {none or summary}
```
Acceptance:
- Note must be readable (line breaks preserved)
- Must include Speed-to-Lead seconds
- Transcript must be ordered and labeled

---

## Deterministic Fallback Qualification Flow (LLM down / timeout)
### When to trigger fallback
- LLM error
- LLM timeout > 8 seconds
- Empty/invalid LLM output

### Global compliance rules (always)
- If inbound contains `STOP`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT` => immediately send:  
  `You’re opted out and won’t receive more texts. Reply HELP for help.`  
  Set contact to DNC; no further messages.
- If inbound contains `HELP` => send:  
  `This is an automated text from Lead Response Copilot. Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to.`

### After-hours rule
If outside business hours:
- First SMS: `Thanks for reaching out—our team will text you back during business hours. To help us prepare: what service do you need? Reply 1) Plumbing 2) HVAC 3) Electrical 4) Other.`
- Do not attempt booking; collect 1–2 details only.

### Deterministic question state machine (business hours)
**Message 1 (immediate):**
`Hi {first_name}, got your request. To get you the fastest help: what service do you need? Reply 1) Plumbing 2) HVAC 3) Electrical 4) Other.`

**If reply 4/Other:**
`Got it—briefly describe what you need help with.`

**Message 2:**
`How soon do you need this? Reply 1) Emergency 2) Today 3) This week 4) Just a quote.`

**Message 3:**
`What’s the job address ZIP code?` (skip if already provided)

**Message 4 (handoff/booking):**
If booking link available:
`Thanks—want to grab a time now? Book here: {calendar_link}. If you prefer, reply with a good time window (e.g., “tomorrow 2–4”).`
If calendar link fails/unavailable:
`Thanks—our scheduler link is temporarily unavailable. Reply with a good time window (e.g., “tomorrow 2–4”) and we’ll confirm.`

**Escalation rule:**
- If no response after 2 minutes: send one nudge: `Quick check—what service do you need? Reply 1, 2, 3, or 4.`
- If still no response after 10 minutes: stop.

Acceptance:
- Flow must proceed without LLM.
- All messages are short, deterministic, and safe.

---

## Test Cases Matrix (what to execute)
For each source (Webhook, Jotform, HubSpot), execute:
1. Valid lead => <60s SMS (PASS/FAIL)
2. Missing phone => no SMS, logged (PASS/FAIL)
3. Invalid phone => no SMS, logged (PASS/FAIL)
4. STOP => opt-out confirmation, no more texts (PASS/FAIL)
5. HELP => help message with support email (PASS/FAIL)
6. After-hours => after-hours message + limited questions (PASS/FAIL)
7. Concurrency => submit 5 leads in 60s, verify no cross-talk (PASS/FAIL)
8. Calendar link failure => booking fallback message (PASS/FAIL)
9. Webhook retries => dedupe within window (PASS/FAIL)
10. Duplicate lead_id => dedupe (PASS/FAIL)
11. CRM note formatting (HubSpot) => matches template (PASS/FAIL)

---

## Results Table (paste into doc/sheet)
Columns:
- Trial #
- Source
- Scenario
- Lead ID
- T0
- T1
- Δ seconds
- First SMS text
- Outcome (PASS/FAIL)
- Evidence link/screenshot
- Notes

---

## Bug Log Template (prioritized for churn risk)
Fields:
- Bug ID
- Severity (Blocker/High/Med/Low)
- Scenario
- Source
- Steps to reproduce
- Expected
- Actual
- Evidence
- Suggested fix
- Customer impact (why it causes churn)

Severity guidance:
- Blocker: sends SMS to wrong/missing/invalid phone; violates STOP; >60s consistently; cross-talk between leads
- High: after-hours wrong behavior; booking failures without fallback; duplicates spamming
- Med: CRM note messy/unstyled; minor formatting
- Low: copy tweaks

---

## Pilot “Go/No-Go” gates
GO if:
- >= 90% of valid-lead trials meet <60s
- 100% STOP compliance
- No cross-talk in concurrency
- Dedupe suppresses duplicates/retries
- Deterministic fallback works end-to-end
NO-GO if any Blocker remains.
