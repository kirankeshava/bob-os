# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Sources, <60s KPI, Fail-safe Deterministic Mode) — Test Plan + Results + Bug Log + Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:43:55.098Z

---

## 1) Scope & Goal
This pilot QA packet verifies that Local Lead Response Copilot reliably (a) sends the first SMS in <60 seconds after lead creation, (b) qualifies leads safely even when the LLM fails, and (c) behaves correctly across three lead sources:
1) Generic Webhook JSON (any ad platform / form tool)
2) Jotform (real form tool)
3) HubSpot (CRM)

Business legitimacy references for pilot customers:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

## 2) Environments & Preconditions
- One test SMS sending number already configured in the product.
- A calendar booking link configured (Calendly/Google appointment page/any booking URL).
- A deterministic fallback mode available (or at minimum a feature flag/config toggle) for “LLM timeout/error.”
- Access to message logs with timestamps (app logs, Twilio logs, or internal event log).

### Required test data
Use these sample leads (rotate through them):
- Valid phones (US examples): +14155550101, +14155550102, +14155550103
- Invalid phones: 415555010 (too short), +1415ABC0101 (non-numeric), +99999999999 (nonsense)
- Missing phone: null/empty
- Names: “Test Alice”, “Test Bob”, “Test Charlie”
- Service request: “Need a quote for [service] this week”

## 3) KPI: <60s First Response — Measurement Method
### Timestamp points
Record these timestamps for every trial:
T0 = lead created timestamp (form submit time, webhook received time, or HubSpot contact create time)
T1 = first outbound SMS timestamp (when provider accepts message OR when app marks ‘sent’)
Delta = T1 - T0

### Tools
- Preferred: system event log with millisecond timestamps.
- Acceptable: screenshot of Jotform submission time + screenshot of SMS log time.

### Sample size & pass criteria
- Minimum: 20 trials total across sources (recommended distribution: 8 webhook, 6 Jotform, 6 HubSpot)
- Pass: 95% of trials Delta <= 60s AND 100% Delta <= 120s (soft backstop for pilot)
- Any Delta >120s is a P0 reliability incident.

## 4) Lead Sources — End-to-End Test Steps

### A) Generic Webhook JSON
**Goal:** verify webhook ingestion, phone validation, immediate SMS, dedupe, retry handling.

**Setup:** Identify webhook endpoint URL in the product.

**Happy-path payload (example):**
{
  "source": "webhook_test",
  "lead_id": "whk-001",
  "first_name": "Test",
  "last_name": "Alice",
  "phone": "+14155550101",
  "email": "alice@example.com",
  "service": "Plumbing leak",
  "message": "Need help today"
}

**Steps:**
1) Send payload once. Record T0 at webhook receipt.
2) Confirm first SMS sent. Record T1. Compute Delta.
3) Confirm qualification questions start.

**Dedupe test:**
- Re-send the exact same payload (same lead_id, same phone) within 2 minutes.
- Expected: no second ‘new lead’ conversation; either (a) ignore as duplicate, or (b) append note “duplicate webhook received” without re-texting.

**Retry test (webhook retries):**
- Simulate webhook delivery retry by sending same event with header “X-Retry: 1” or by repeating within 30 seconds.
- Expected: system remains idempotent; no duplicate SMS.


### B) Jotform (real form tool)
**Goal:** validate real-world form submission mapping + speed-to-lead.

**Setup:**
1) Create a free Jotform with fields: First Name, Last Name, Phone, Email, “What do you need help with?”
2) Configure Jotform webhook (or integration) to the Copilot webhook endpoint.

**Steps:**
1) Submit the form with valid phone (+14155550102). T0 is Jotform submission time.
2) Verify first SMS received within 60 seconds; record T1.
3) Verify message includes business context and a short first question.

**Missing phone test:**
- Submit with phone blank.
- Expected: no SMS attempt; create an internal task/flag “Missing phone”; optional email to contact if email is present; log reason.

**Invalid phone test:**
- Submit with 415555010.
- Expected: no SMS attempt; log validation failure; if email present, send fallback email OR create CRM note.


### C) HubSpot (CRM)
**Goal:** validate CRM-originated lead creation triggers + note formatting.

**Setup options:**
- Option 1: HubSpot workflow triggers webhook to Copilot when new contact created with phone.
- Option 2: Copilot polls/receives events from HubSpot (implementation-dependent).

**Steps:**
1) Create a new HubSpot contact with phone +14155550103 and lifecycle stage “lead.” Record T0.
2) Verify SMS first response and qualification starts. Record T1.

**CRM note formatting verification:**
Expected note structure (example):
Title: “Lead Copilot Qualification Summary”
Body:
- Source: HubSpot
- First response sent at: [ISO timestamp]
- Lead intent: [High/Med/Low]
- Service: [value]
- Answers:
  Q1 (Job type): …
  Q2 (Urgency): …
  Q3 (Zip/area): …
- Outcome: Booked / Needs follow-up / Unreachable
- Booking link used: [URL] OR Failure reason

Check:
- No broken JSON
- Newlines render correctly
- No markdown artifacts unless HubSpot supports it

## 5) High-Risk Behavioral Test Cases (Must Pass)

### 5.1 STOP / HELP compliance (SMS)
**STOP:**
- Reply “STOP”.
- Expected: immediate confirmation (carrier/Twilio standard) and no further texts from the system to that number.
- Verify number is added to suppression list.

**HELP:**
- Reply “HELP”.
- Expected: a help response including business identification and contact email: agent_bob_replit+lead-copilot@agentmail.to

### 5.2 After-hours behavior
Define business hours (example): Mon–Fri 8am–6pm local.
- Submit lead outside hours.
- Expected: either (a) acknowledge + set expectation (“We’ll reach out at 8am”), and/or (b) offer booking link; do not spam multiple questions at 2am.

### 5.3 Multiple concurrent leads
- Create 5 leads within 30 seconds (mix sources).
- Expected: all receive first SMS within KPI; conversations do not cross-contaminate (wrong names/service).

### 5.4 Calendar link failure
- Use a broken booking link.
- Expected: system detects failure (if detectable) OR provides alternate action: “Reply with preferred time window” and routes to manual follow-up; logs incident.

### 5.5 LLM failure / timeout — deterministic fallback
Simulate LLM error/timeout (toggle flag or force provider error).
Expected: conversation continues using deterministic questions below, no blank messages, no unsafe content.

## 6) Deterministic Fallback Flow (Exact Script)
**Trigger conditions:**
- LLM returns error, times out > 8 seconds, or confidence < threshold.
- Any downstream tool failure that blocks next step.

**Fallback SMS #1 (sent immediately after lead intake):**
“Hi {first_name}, it’s the scheduling assistant. Quick question so I can get you to the right time: what service do you need help with? (Reply with 1-3 words, e.g., ‘water heater’, ‘roof leak’, ‘cleaning’)”

**If no reply within 3 minutes:**
“Just checking—what service do you need help with? Reply with the service name and I’ll send next steps.”

**Q2 (after service received):**
“Got it. How soon do you need this handled? Reply 1) Today/ASAP 2) This week 3) Flexible”

**Q3:**
“What’s your ZIP code (5 digits) so we can confirm coverage?”

**Decisioning:**
- If ZIP invalid -> “Please reply with a 5-digit ZIP code.”
- If ‘Today/ASAP’ -> offer booking link + option to call.
- Otherwise -> offer booking link.

**Booking message:**
“Thanks. You can grab the next available time here: {booking_link}. If you prefer, reply with two time windows that work and we’ll confirm.”

**Escalation rule:**
- If user replies with anger, confusion, or asks for a human: “No problem—someone will reach out shortly. If urgent, reply ‘CALL’.”

## 7) Results Capture Tables (copy/paste)

### 7.1 KPI Timing Results
| Trial # | Source (Webhook/Jotform/HubSpot) | Scenario | T0 (lead created) | T1 (first SMS) | Delta (sec) | Pass/Fail | Notes |
|---|---|---|---|---|---:|---|---|
| 1 |  | Happy path |  |  |  |  |  |

### 7.2 Behavioral Scenario Checklist
| Scenario | Source | Expected | Actual | Pass/Fail | Evidence link/screenshot |
|---|---|---|---|---|---|
| Missing phone | Jotform | No SMS; logged/flagged |  |  |  |
| Invalid phone | Webhook | No SMS; validation error logged |  |  |  |
| STOP | Any | Suppress further SMS |  |  |  |
| HELP | Any | Help response w/ contact email |  |  |  |
| After-hours | Any | Acknowledge + next steps, no spam |  |  |  |
| Concurrency | Mixed | No cross-talk; all <60s |  |  |  |
| Calendar failure | Any | Alternate manual scheduling prompt |  |  |  |
| Retries | Webhook | Idempotent; no dup SMS |  |  |  |
| Duplicate lead | Webhook/HubSpot | Deduped; note logged |  |  |  |
| CRM note formatting | HubSpot | Clean readable summary |  |  |  |

## 8) Bug Log Template (churn-risk oriented)
| Bug ID | Severity (P0-P3) | Title | Steps to Reproduce | Expected | Actual | Frequency | Suggested Fix | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|
|  | P0 | First SMS >120s |  | <60s target |  |  | Queue prioritization / async worker fix |  |  |

### Severity definitions
- P0: revenue-threatening (missed/late first response, spam/STOP violations)
- P1: major conversion drop (calendar broken with no fallback, wrong lead mapped)
- P2: cosmetic/formatting issues
- P3: minor edge case

## 9) Expected “Verified <60s” Evidence Package (what to share with agencies)
After running 20 trials, compile:
1) Filled KPI Timing Results table
2) 2-3 screenshots showing lead submit time + SMS sent time
3) Note: “95% of trials under 60 seconds; 100% under 120 seconds” (or actual numbers)
4) Confirmation that deterministic fallback works when LLM fails (include one transcript)

## 10) Known Likely Failure Points (pre-bug list)
- Phone normalization (E.164), particularly when forms deliver “(415) 555-0101”
- Idempotency keys missing for webhooks (duplicates cause double texting)
- After-hours logic absent or timezone mismatch
- CRM note rendering (newline/HTML escaping)
- Calendar URL outages (no fallback prompt)

This packet is intentionally manual-first to protect reputation during early pilots while revenue is prioritized. Once 1–2 paying customers exist and integrations stabilize, convert the highest-risk scenarios (STOP, dedupe, retries, <60s KPI) into automated regression checks.
