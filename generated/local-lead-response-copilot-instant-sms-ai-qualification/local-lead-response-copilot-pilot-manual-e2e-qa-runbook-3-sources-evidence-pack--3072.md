# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Sources) + Evidence Pack (<60s KPI) + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:19:49.036Z

---

## 0) Purpose (pilot-stage, no automation)
Validate end-to-end reliability for Local Lead Response Copilot across 3 lead sources while protecting agency reputation:
1) Generic Webhook JSON (any form/ads tool)
2) Jotform (real form tool)
3) HubSpot CRM (real CRM)

Primary KPI: **First outbound SMS sent in <60 seconds** from lead receipt.
Secondary: Safe compliance + safe fallbacks when LLM or downstream systems fail.

---

## 1) Environments / Preconditions
- Use business legitimacy links in any pilot communications:
  - Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
  - Support email: agent_bob_replit+lead-copilot@agentmail.to
- You must have access to:
  - The product’s inbound webhook endpoint(s) or integration URL(s)
  - Outbound SMS logs (provider logs or app logs)
  - (For HubSpot tests) a HubSpot test portal with API key/private app token configured in the product
  - A calendar/booking link configured in the product (even if it’s a dummy link for failure testing)

**Evidence rule:** For each trial, capture timestamps in a table + at least one screenshot/log snippet per scenario.

---

## 2) Evidence Capture: How to Prove “<60s First Response”
For every test run, record:
- T0 = inbound lead received timestamp (from: webhook request log / Jotform submission time / HubSpot create time)
- T1 = first SMS send timestamp (from: app outbound log / SMS provider log)
- Δ = T1 - T0 in seconds

**Pass criteria:** Δ ≤ 60s for 19/20 trials. (1 outlier allowed if caused by explicit carrier delay + app still attempted send quickly.)
**Fail criteria:** Any systemic delay >60s on 2+ trials OR any lead with valid phone receives no first message.

Recommended sample size: **20 total trials** across the 3 sources:
- 8 trials Generic Webhook
- 8 trials Jotform
- 4 trials HubSpot

---

## 3) Lead Source A — Generic Webhook JSON (Any Tool)
### 3.1 Endpoint expectations
- Accept JSON POST.
- Idempotency: handle retries (same event delivered multiple times).

### 3.2 Standard payload (valid lead)
POST body:
{
  "source": "webhook",
  "event_id": "evt_2026-05-14_0001",
  "lead": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+14155550101",
    "email": "test.lead@example.com",
    "service": "Water heater repair",
    "zip": "94107",
    "message": "Need someone today"
  },
  "metadata": {
    "submitted_at": "2026-05-14T17:05:00Z",
    "utm_source": "facebook",
    "utm_campaign": "plumbing_emergency"
  }
}
Expected:
- First SMS sent within 60s.
- CRM note (if enabled) includes source + service + message + timestamps.

### 3.3 Negative payloads
A) Missing phone
{
  "source": "webhook",
  "event_id": "evt_2026-05-14_0002",
  "lead": {"first_name":"Test","last_name":"NoPhone","email":"nophone@example.com"}
}
Expected:
- No SMS attempt.
- System logs: “missing phone” with lead identifiers.
- Optional: email alert to agent_bob_replit+lead-copilot@agentmail.to (if supported) OR CRM note marked “NO PHONE”.

B) Invalid phone
Use: "phone": "123" OR "phone": "+1 (000) 000-0000" (if your validator rejects).
Expected:
- No SMS attempt.
- Clear reason stored.

C) Duplicate lead / retry
Send same payload twice with same event_id.
Expected:
- Exactly one conversation initiated.
- Second delivery logged as duplicate, no extra SMS.

D) Webhook retries (simulate 3 rapid retries)
Send 3 times in <10s.
Expected:
- Still one SMS.

---

## 4) Lead Source B — Jotform (Real Form Tool)
### 4.1 Form fields (create free Jotform)
Create a form with these fields:
- First Name (required)
- Last Name
- Phone Number (required)
- Email
- Service Needed (dropdown)
- Preferred time (optional)
- Message (paragraph)

### 4.2 Jotform submission mapping expectations
Map Jotform fields → product lead fields:
- phone must map to E.164 if possible
- service/message must be carried into the first SMS context OR CRM note

### 4.3 Test cases
1) Valid submission during business hours
Expected:
- <60s first SMS.
- Qualification begins (LLM or deterministic).

2) Missing phone
If Jotform enforces required phone, temporarily disable required and submit blank.
Expected:
- No SMS; logged + surfaced to operator.

3) Invalid phone format
Submit (555) 123-ABCD.
Expected:
- Validation fail; no SMS.

4) Multiple concurrent leads
Submit 5 valid leads within 30 seconds.
Expected:
- 5 separate conversations, no cross-talk; all first SMS <60s.

---

## 5) Lead Source C — HubSpot CRM
Goal: ensure CRM-originated leads can trigger the copilot AND notes are formatted consistently.

### 5.1 HubSpot trigger options (one must be true)
- New Contact created with phone → triggers SMS
OR
- New Form Submission creates/updates Contact → triggers SMS
OR
- Workflow/automation sends webhook to product

### 5.2 HubSpot note formatting spec (must verify)
When writing back to HubSpot, create a Note/Engagement with EXACT structure:
Title: Lead Copilot — Qualification Transcript
Body (markdown-like plain text):
- Source: <webhook|jotform|hubspot>
- Submitted: <ISO timestamp>
- First SMS Sent: <ISO timestamp> (Δ=<seconds>)
- Status: <Qualified | Not qualified | Needs human | After-hours>
- Service: <service>
- Transcript:
  1) Q: <question>
     A: <answer>
  2) Q: <question>
     A: <answer>
- Booking:
  - Booking Link Sent: <yes/no>
  - Booking Outcome: <booked|not booked|link failed>
- Compliance:
  - STOP received: <yes/no>
  - HELP received: <yes/no>

Pass criteria:
- Note is readable, consistently formatted, and attached to the correct Contact.
- No HTML garbage, no missing line breaks.

---

## 6) Compliance & Safety Scenarios (Required)
### 6.1 STOP
If user replies “STOP” (or “Stop”, “unsubscribe”):
Expected:
- Immediately confirm opt-out: “You’re opted out and won’t receive more texts. Reply START to opt back in.”
- Set contact status = Do Not Text.
- No further messages, including follow-ups.

### 6.2 HELP
If user replies “HELP”:
Expected:
- Provide brand + contact email:
  “Lead Response Copilot support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

---

## 7) After-hours Behavior
Define business hours (example): Mon–Fri 8am–6pm local.
Test by forcing after-hours mode.
Expected first message (within 60s):
“Thanks for reaching out—our team is currently closed. I can take a few details now and we’ll follow up first thing in the morning. What service do you need help with?”
Rules:
- Still qualify lightly.
- Do not promise immediate dispatch.
- If emergency category detected, offer escalation instructions (call line) if the business provides it; otherwise “We’ll prioritize you first thing.”

---

## 8) Calendar/Booking Link Failure Handling
Simulate booking link outage (use an invalid URL or force 500 response).
Expected:
- System sends fallback:
  “Booking link is having trouble right now. What’s the best time window for a call tomorrow (morning/afternoon/evening)?”
- Escalate to human with summary.
- Log calendar failure event.

---

## 9) LLM Failure Safe Mode (Deterministic Qualification Flow)
Trigger: LLM timeout/error OR confidence below threshold OR rate-limit.

### 9.1 Deterministic questions (exact wording)
Q1: “What service do you need help with?”
Q2: “What’s your address or ZIP code?”
Q3: “When would you like someone to come out—today, tomorrow, or later?”
Q4: “Is this an emergency (e.g., no heat, active leak)?” (Yes/No)
Q5: “What’s the best email to send confirmation?” (optional)

### 9.2 Branching
- If Q4 = Yes → tag Emergency; send: “Understood. I’m alerting the team now. If you don’t hear back shortly, reply with a good callback number/time.”
- If phone missing/invalid → do NOT proceed; request corrected number via form/email path instead.

### 9.3 Timeouts & retries
- If no reply within 5 minutes: send 1 follow-up: “Just checking—what service do you need help with?”
- If still no reply after 30 minutes: stop.

### 9.4 Escalation payload (to human/CRM)
Include: service, zip/address, timeframe, emergency flag, and transcript so far.

---

## 10) Test Execution Table (copy/paste)
Columns:
- Trial #
- Source (Webhook/Jotform/HubSpot)
- Scenario (valid/missing phone/STOP/etc.)
- T0 inbound timestamp
- T1 first SMS timestamp
- Δ seconds
- Pass/Fail
- Evidence link (screenshot/log export)
- Notes

---

## 11) Pilot Bug/Fix List (prioritized)
P0 (must fix before any agency rollout):
1) Duplicate leads create multiple SMS threads (dedupe missing)
2) STOP not honored immediately
3) Valid phone lead receives no message or >60s consistently
4) Concurrency cross-talk (messages routed to wrong lead)
5) After-hours sends “we’ll call now” messaging

P1:
6) Calendar failure doesn’t fallback to manual scheduling
7) Invalid phone causes repeated retries / spammy behavior
8) HubSpot notes unreadable / wrong contact

P2:
9) HELP response missing support email
10) Transcript missing key fields (service/zip/timeframe)

---

## 12) Results Summary Template (to fill after running)
- Total trials: __
- Pass <60s: __ / __
- Median Δ: __ seconds
- Worst Δ (non-carrier): __ seconds
- STOP compliance: Pass/Fail (evidence)
- After-hours messaging: Pass/Fail
- Dedupe/retry: Pass/Fail
- Calendar failure fallback: Pass/Fail
- HubSpot note formatting: Pass/Fail

If any P0 fails → do not onboard next agency until fixed or mitigated via manual ops.
