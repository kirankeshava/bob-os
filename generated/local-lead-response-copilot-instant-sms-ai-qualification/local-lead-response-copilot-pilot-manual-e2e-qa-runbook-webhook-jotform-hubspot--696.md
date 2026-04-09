# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:36:52.462Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)

**Legitimacy link (share with pilot agencies/customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**Support/ops email:** agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal and success criteria
This runbook validates end-to-end lead intake and first-response reliability for early pilots **without automated test infrastructure**.

### Primary KPI
- **First-response time:** first outbound SMS to the lead must be sent within **<60 seconds** of lead receipt across all lead sources.

### Secondary criteria (reputation-protection)
- Safe handling of edge cases: **missing/invalid phone**, **STOP/HELP compliance**, **after-hours behavior**, **calendar/booking link failure**, **webhook retries**, **duplicate leads**, **multiple concurrent leads**, and **clean HubSpot note formatting**.
- **Fail-safe behavior when LLM fails:** deterministic question flow must activate automatically (no broken/empty messages).

## 1) Lead sources in scope (3)
1. **Generic Webhook JSON** (direct POST to our endpoint)
2. **Jotform** (real form tool)
3. **HubSpot** (CRM)

## 2) Preconditions / environment checklist
Before executing tests, confirm:
- A test phone number exists that can receive SMS (use a real handset for delivery time proof).
- System has configured sending number and can send outbound SMS.
- An “after-hours” window is configured (e.g., 6pm–8am) and timezone is known.
- A booking route is configured (calendar link, call booking page, or “we’ll call you” path).
- CRM integration (HubSpot) is connected to a test portal or sandbox.

**Evidence to collect:**
- Screenshot of system settings: business hours + timezone.
- Screenshot/log excerpt showing webhook receipt timestamp.
- Screenshot of SMS send log (queued/sent timestamp) and handset delivery time.

## 3) Deterministic fallback qualification flow (No-LLM)
This flow must trigger if the LLM errors, times out, returns empty output, or confidence is below a threshold.

### Trigger conditions
Activate fallback if any of the following occur:
- LLM API error/timeout
- Empty or non-parseable response
- Response exceeds max latency budget (recommend: 5–8s)
- Safety/compliance filter blocks response

### Fallback message templates (exact text)
**Message 1 (immediate):**
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—can I ask 2 quick questions to get you a fast quote?”

If they reply **YES/OK/GO** (or any non-stop message), proceed.

**Q1 (service type):**
“1/2 What do you need help with? Reply with the number: (1) Repair (2) Replace (3) Estimate (4) Other”

**Q2 (timing/urgency):**
“2/2 How soon do you need this? (1) Today (2) This week (3) This month”

**Handoff (booking/call):**
“Got it—thanks. What’s the best time for a quick call? You can also book here: {{calendar_link}}”

### After-hours variant
If outside business hours:
“Thanks {{first_name}}—we’re closed right now but I can get this queued. What’s the job type? (1) Repair (2) Replace (3) Estimate (4) Other. We’ll text you first thing in the morning.”

### STOP/HELP compliance
- If inbound message contains **STOP** (or variants: STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT):
  - Immediately mark as opted out; send confirmation: “You’re unsubscribed and will no longer receive messages. Reply START to resubscribe.”
  - Do **not** send additional qualification messages.
- If inbound contains **HELP**:
  - Send: “Help: You can reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to. Msg/data rates may apply.”

## 4) KPI measurement method (<60s)
For each test lead, capture three timestamps:
1. **T0 Lead Received** (server/webhook receive time OR form submit time if that is authoritative)
2. **T1 SMS Queued/Sent** (our provider log)
3. **T2 Handset Delivered** (phone notification timestamp; screenshot)

**Pass rule:** T1 − T0 < 60 seconds.

**Notes:** Carrier delivery time (T2) may vary; record it but do not fail KPI unless grossly delayed repeatedly.

## 5) Results table (copy/paste)
Use the table below during execution.

| Test ID | Source | Scenario | Lead ID/Email | T0 Received | T1 SMS Sent | Delta (sec) | T2 Delivered | Expected Behavior Met? | Evidence Link | Notes/Bug # |
|---|---|---|---|---|---|---:|---|---|---|---|

## 6) Test cases (execute at least 20 total)
Run a mix across sources; suggested minimum distribution:
- Webhook JSON: 8 tests
- Jotform: 6 tests
- HubSpot: 6 tests

### A) Generic Webhook JSON tests
**Setup:** Identify the webhook endpoint URL in the app. Use curl/Postman.

**A1 Valid lead (baseline)**
Payload:
```json
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550100",
  "email": "testlead1@example.com",
  "source": "webhook",
  "service": "HVAC repair",
  "message": "My AC stopped working"
}
```
Expected:
- SMS goes out <60s.
- Qualification begins (LLM or fallback).
- CRM logging (if enabled) creates a note with the transcript template.

**A2 Missing phone**
```json
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "email": "nophone@example.com",
  "source": "webhook",
  "message": "Need an estimate"
}
```
Expected:
- No SMS attempt.
- System flags lead “missing phone” and logs reason.
- If email fallback exists, send an email asking for phone (optional).

**A3 Invalid phone** (too short or non-E164)
```json
{
  "lead_id": "qa-webhook-003",
  "first_name": "BadPhone",
  "phone": "1234",
  "email": "badphone@example.com",
  "source": "webhook",
  "message": "Need service"
}
```
Expected:
- No SMS attempt; validation error logged.

**A4 Duplicate lead (same lead_id)**
Send A1 twice.
Expected:
- Second submission should not trigger a second SMS within a dedupe window (recommend 24h) OR should annotate “duplicate suppressed”.

**A5 Webhook retry (same payload, different delivery id)**
Add header/field `delivery_attempt: 2` or resend after 10 seconds.
Expected:
- Treated as retry; no duplicate SMS.

**A6 Concurrent leads burst**
Fire 5 valid payloads in <10 seconds (lead_ids 010–014).
Expected:
- All get first SMS <60s.
- No cross-talk (messages to correct numbers only).

**A7 After-hours baseline**
Submit during configured closed hours.
Expected:
- After-hours variant message sent.
- No booking link if policy forbids; or booking link allowed but phrased “book for tomorrow”.

**A8 Calendar link failure simulation**
Temporarily set booking link to invalid URL (or simulate in config).
Expected:
- System sends alternative CTA: “Reply with best time” and flags “calendar_link_error”.

### B) Jotform tests (real form tool)
**Setup steps (operator):**
1. Create a Jotform form with fields: First Name, Last Name, Phone, Email, Service Needed (dropdown), Notes.
2. Configure webhook or integration to our endpoint.
3. Confirm submission includes the phone field mapping.

**B1 Valid submission**
Expected:
- <60s SMS.
- Correct personalization (first name).

**B2 Phone field left blank**
Expected:
- No SMS; logs missing phone.

**B3 Invalid phone formatting**
Enter “(415) 555-0100” or “415.555.0100” depending on validator.
Expected:
- Either normalization to E164 and send OR reject with clear log. (Document actual behavior.)

**B4 Duplicate submission**
Resubmit same email+phone within 2 minutes.
Expected:
- Deduped or suppressed based on rule; no spam.

**B5 After-hours submission**
Expected:
- After-hours variant message.

**B6 STOP compliance via Jotform-originated lead**
Flow:
- Submit valid lead.
- From handset, reply STOP.
Expected:
- Immediate unsubscribe confirmation.
- Any subsequent automated messages must cease.

### C) HubSpot tests (CRM)
**Setup steps (operator):**
1. Create a test HubSpot portal (free) or developer test account.
2. Create a test contact pipeline/property mapping as needed.
3. Ensure our system can either ingest “new contact” or “new form submission” events and can write back notes.

**C1 New contact created (valid phone)**
Expected:
- <60s SMS.
- HubSpot note created with transcript template (see section 7).

**C2 Missing phone on contact**
Expected:
- No SMS. HubSpot note indicates missing phone and next step.

**C3 Duplicate contact event**
Trigger contact update that might fire again.
Expected:
- No duplicate SMS; note indicates “event deduped”.

**C4 CRM note formatting**
Validate the note is readable, consistent, and includes required metadata.

**C5 Multiple concurrent contacts**
Create 3 contacts quickly.
Expected:
- All SMS <60s and notes mapped to correct contacts.

**C6 Calendar link failure with CRM logging**
Expected:
- System logs failure and writes note with fallback CTA and status “booking_link_failed”.

## 7) HubSpot note formatting (strict template)
Every lead interaction should create/update a note using this template:

**Title:** Lead Copilot Transcript — {{lead_id}} — {{status}}

**Body:**
- Lead Source: {{source}}
- Received At (T0): {{timestamp_received}}
- First SMS Sent (T1): {{timestamp_first_sms}}
- Phone: {{phone_e164_or_blank}}
- Email: {{email_or_blank}}
- After-hours: {{true/false}}
- Opt-out: {{true/false}} (STOP received at {{timestamp_stop}} if applicable)
- Booking: {{booked/attempted/failed/not_offered}}
- Booking Link: {{calendar_link}} (if used)

**Transcript:**
- Outbound 1: “…” (time)
- Inbound 1: “…” (time)
- Outbound 2: “…” (time)

**Outcome:**
- Qualified: {{yes/no/unknown}}
- Service Type: {{value}}
- Urgency: {{value}}
- Next Step: {{call_scheduled / call_requested / waiting_on_customer / opted_out / invalid_phone}}

## 8) Bug log template (use during pilots)
| Bug # | Severity (P0/P1/P2) | Source | Scenario | Steps to Reproduce | Expected | Actual | Evidence | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|

**Severity definitions:**
- P0: Compliance or spam risk (STOP ignored), wrong recipient, repeated messages, or cannot respond to leads.
- P1: KPI breach (>60s) or booking broken, CRM logging missing.
- P2: Formatting issues, minor copy, intermittent delays.

## 9) Known high-risk areas to watch (pilot notes)
- **Phone normalization** (E164 formatting) varies by source; ensure consistent validation.
- **Deduping**: must suppress both webhook retries and CRM update events.
- **Concurrency**: queue/backpressure could push T1 beyond 60s.
- **LLM outage**: fallback must be immediate and deterministic.
- **After-hours**: avoid offering immediate calls; set expectations.
- **STOP/HELP**: must be global across all entry sources.

## 10) What to send agencies as proof
After running 20 tests:
1. Export the results table with deltas and at least 5 screenshots showing <60s logs.
2. Provide a short summary: pass rate, worst delta, and any mitigations.
3. Share the legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
4. Provide support email: agent_bob_replit+lead-copilot@agentmail.to

---
**Operator instruction:** Run this checklist during onboarding for each new pilot account. If any P0/P1 bugs appear, stop the pilot rollout until mitigations are in place (workaround or fix) to protect reputation.
