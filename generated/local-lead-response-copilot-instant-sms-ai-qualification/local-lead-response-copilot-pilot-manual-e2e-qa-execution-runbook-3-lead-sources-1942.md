# Local Lead Response Copilot — Pilot Manual E2E QA Execution Runbook (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:53:38.905Z

---

## Purpose
Validate that Local Lead Response Copilot reliably sends the *first SMS in under 60 seconds* from lead creation across 3 lead sources, and that it fails safely (deterministic qualification flow + compliance behaviors) when the LLM, calendar, or downstream systems fail.

**Product legitimacy references (use in any customer comms):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

## Lead sources in scope (minimum 3)
1) **Generic Webhook JSON** (acts as “any form/ads platform”)  
2) **Jotform** (real form tool, free tier)  
3) **HubSpot** (CRM, free tier/dev account)

## KPI + evidence requirements
### KPI
- **Primary KPI:** First outbound SMS to the lead is sent **< 60 seconds** after lead creation.
- **Secondary KPIs:**
  - Qualification continues in deterministic mode if LLM fails.
  - STOP/HELP are handled safely.
  - Duplicate/retry events do not double-text.

### Evidence to capture (must be stored per test run)
For each test case record:
- T0 = lead created timestamp (form submit time / webhook received time / CRM create time)
- T1 = first SMS send timestamp (provider log) **or** “attempted send” timestamp in app logs
- Δ = T1 - T0 (seconds)
- Screenshot/URL of the source event (Jotform submission, HubSpot record, webhook request)
- Screenshot/log line showing outbound message send
- Message transcript (at least first 3 messages)

**Pass criteria:** Δ < 60s for 18/20 trials. If any single trial exceeds 60s, record root cause and whether it’s a cold start, queue backlog, provider latency, or error retry.

## Environment + prerequisites (no spend)
- Use free tiers only.
- A test phone number capable of receiving SMS is required (use the operator’s phone during pilot).
- Access to message logs (Twilio/MessageBird/etc.) or internal logs showing send time.

## Deterministic fallback qualification mode (LLM down/timeout)
**Trigger fallback when ANY occurs:**
- LLM call errors OR times out (>5s recommended) OR returns empty/unsafe content.

**Deterministic question flow (copy-paste messages)**
1) **Initial SMS (must send immediately):**
   - "Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—can I ask 2 quick questions so we can help fast? Reply YES to continue." 
2) If YES (or any affirmative):
   - Q1: "What service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other"
3) After Q1 answered:
   - Q2: "What’s your ZIP code?"
4) After ZIP answered:
   - "Thanks—what’s the best time today for a quick call? Reply 1) ASAP 2) Morning 3) Afternoon 4) Evening"
5) Confirmation:
   - "Got it. We’ll reach out shortly. If you prefer, you can book here: {{calendar_link}}"

**Escalation to human (always allowed):**
- If user writes freeform question or dissatisfaction: "I’m looping in a specialist now. If urgent, call us or reply with a good time." + notify internal channel.

**STOP/HELP compliance (hard rules):**
- If inbound contains STOP / UNSUBSCRIBE / CANCEL / END / QUIT: immediately respond: "You’re unsubscribed and will no longer receive messages. Reply START to resubscribe." Ensure no further outbound.
- If inbound contains HELP / INFO: respond: "Help: Reply STOP to unsubscribe. For assistance email agent_bob_replit+lead-copilot@agentmail.to or see https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4"

## Test matrix (must-run scenarios)
Run each scenario at least once per lead source where applicable.

### A) Missing phone
- Input: lead payload without phone (or blank)
- Expected: No SMS attempt; create internal task/CRM note: “Missing phone—cannot text”; optional email if provided.
- Pass: No SMS sent; clear operator-visible reason.

### B) Invalid phone
- Input: "123", "+1 (555) 555-555" (too short), non-E.164
- Expected: Validation fails; no SMS; internal note includes raw value and reason.

### C) STOP
- Flow: submit valid lead, receive first SMS, reply STOP
- Expected: immediate unsubscribe confirmation; no further messages even if webhook retries.

### D) HELP
- Reply HELP at any point
- Expected: help response with support email + website.

### E) After-hours routing
- Configure business hours (e.g., 9am–5pm local). Submit lead outside hours.
- Expected: first SMS still <60s but sets expectation: “We’ll reply tomorrow at 9am”; optionally offer booking link.

### F) Multiple concurrent leads
- Submit 5 leads within 60 seconds.
- Expected: all get first SMS <60s; no cross-contamination of threads.

### G) Calendar link failure
- Simulate broken calendar link/endpoint.
- Expected: SMS should not error-loop; send alternate CTA: “Reply with a good time” and notify operator.

### H) Webhook retries
- Send same webhook payload 3 times with same external_id.
- Expected: dedupe prevents double texting; exactly one conversation created.

### I) Duplicate leads
- Same phone submits twice within 10 minutes.
- Expected: either (a) merge into same thread with a note “duplicate lead,” or (b) allow but do not double-send intro; behavior must be consistent and documented.

### J) CRM note formatting (HubSpot)
- Expected note includes:
  - Lead source
  - Timestamp
  - First response latency (Δ)
  - Answers collected (service type, zip, preferred time)
  - STOP status if unsubscribed

## Execution steps by lead source
### 1) Generic Webhook JSON (ready-to-paste)
Use a webhook tester (or curl) to POST to the product inbound endpoint.

**Base payload (valid):**
```json
{
  "external_id": "qa-001",
  "source": "webhook",
  "first_name": "Taylor",
  "last_name": "QA",
  "phone": "+14155550123",
  "email": "taylor.qa@example.com",
  "service": "Repair",
  "zip": "94107",
  "message": "Need help today",
  "created_at": "2026-04-09T12:00:00Z"
}
```

**Missing phone:** remove phone key.

**Invalid phone:**
```json
{ "external_id": "qa-002", "source": "webhook", "first_name": "Pat", "phone": "123" }
```

**Retry payload:** resend identical JSON with same external_id.

Record T0 as the time the request was sent (terminal timestamp) and T1 from SMS send logs.

### 2) Jotform (free) — test form setup
- Create a Jotform called “Lead Copilot QA Form”.
- Fields: First Name, Last Name, Phone, Email, Service Needed (dropdown), ZIP, Preferred Time, Message.
- Integrations: Webhook to product endpoint (POST JSON).
- Submit form on desktop + mobile.

Record T0 as Jotform submission time. Validate the webhook payload contains a stable submission ID to use as external_id for dedupe.

### 3) HubSpot (free) — CRM lead creation
- Create a test contact in HubSpot with phone and lead source “QA”.
- Trigger: either webhook from HubSpot workflow (if available) or manual export/inbound integration path.
- Validate that the app writes back a Note/Engagement with the expected formatting.

Record T0 as contact create time (or workflow trigger time). Record T1 from SMS send logs.

## Results capture tables (copy into a doc/spreadsheet)
### KPI timing log
Columns:
- Test ID
- Lead Source (Webhook/Jotform/HubSpot)
- Scenario (Valid/Missing phone/STOP/etc.)
- T0 lead created
- T1 first SMS sent
- Δ seconds
- Pass/Fail
- Evidence link(s)
- Notes / suspected cause if fail

### Bug log template (prioritized)
Columns:
- Bug ID
- Severity (P0 churn / P1 high / P2)
- Scenario
- Steps to reproduce
- Expected
- Actual
- Impact
- Suggested fix
- Owner
- Status

## Known high-risk bugs to watch for (pre-filled hypotheses)
1) **Cold start delays** push Δ > 60s on first request after idle.
2) **Deduping missing** causes double-texting on webhook retries.
3) **STOP not respected** across merged threads.
4) **LLM failure path** drops the conversation instead of deterministic questions.
5) **HubSpot note formatting** breaks due to HTML/newlines; must be readable and consistent.

## Definition of done (for pilot QA)
- 20 total trials across 3 sources completed with evidence.
- <60s first response achieved on at least 18/20; all >60s have documented root cause.
- STOP/HELP validated with transcripts.
- Deterministic fallback validated by simulating LLM timeout/error.
- Bug log produced with P0/P1 fixes to protect agency reputation.
