# Local Lead Response Copilot — Pilot Proof Pack (Manual E2E QA): 3 Lead Sources, <60s KPI Evidence, Deterministic Fallback + Bug/Fix List

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:25:35.651Z

---

# Local Lead Response Copilot — Pilot Proof Pack (Manual E2E QA)

Business site (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
Contact for pilots/support: agent_bob_replit+lead-copilot@agentmail.to

## 0) Purpose (what success looks like)
Run a **manual end-to-end proof** (no automation) that demonstrates:
1) **First SMS response time < 60 seconds** from lead creation for 3 sources: **Generic Webhook JSON**, **Jotform**, **HubSpot CRM**.
2) **Fail-safe behavior** when LLM fails/timeouts: system continues with a deterministic qualification flow and/or escalates safely.
3) **Reputation-protecting behaviors**: missing/invalid phone handling, STOP/HELP compliance, after-hours routing, concurrency, retries/dedupes, calendar link failure behavior, and correct CRM note formatting.

## 1) Scope: 3 lead sources under test
### A) Generic Webhook JSON (baseline)
Use a direct HTTP POST from curl/Postman to the ingestion endpoint.

### B) Jotform (real form tool)
Use a free Jotform form with a webhook to the ingestion endpoint.

### C) HubSpot (CRM)
Use a HubSpot dev/free account and create a test contact/deal; use the integration path your product supports (webhook, workflow, or app). Validate note formatting written back into HubSpot.

## 2) KPI definition + how to measure (<60s)
**KPI:** First outbound SMS is sent (or queued with provider timestamp) within **60 seconds** of lead creation event.

### Required timestamps (capture all 4 if possible)
T0 = Lead creation time (form submit / CRM event / webhook request received)  
T1 = Ingestion acknowledged time (HTTP 2xx response time; or server log timestamp)  
T2 = SMS provider accepted time (Twilio/message provider “created/queued/sent” timestamp)  
T3 = Lead received first SMS time (on handset screenshot time if available)

**Primary measurement:** T2 - T0 (provider accepted minus lead creation).  
**Secondary measurement:** T3 - T0 (handset received minus lead creation).

### Pass/Fail
PASS if p95 (95th percentile) of (T2-T0) across 20 runs is **<= 60s**, and max is **<= 90s**.  
FAIL if any scenario exceeds 90s without explicit “after-hours defer” rules.

## 3) Test data standards
### Phone normalization rules (expected)
- Accept E.164 or 10-digit US numbers; normalize to +1XXXXXXXXXX.
- Reject non-dialable numbers; do not attempt SMS.

### “Duplicate lead” definition (expected)
Treat as duplicate if **same normalized phone + same source + within 10 minutes** (configurable). Duplicate should **not** trigger a second conversation; should append a CRM note like “Duplicate received; conversation already active.”

## 4) Deterministic fallback qualification flow (LLM-safe mode)
Use this scripted flow when:
- LLM call errors/timeouts
- LLM confidence below threshold
- Vendor outage incident mode

### Global compliance strings
- Every outbound must include business identification minimally in first message.
- STOP/HELP must be supported.

### Conversation script (copy/paste ready)
**Message 1 (immediate):**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out about {{service}}. A quick question so we can help fast—what’s your address or ZIP code?”

If no response in 3 minutes:
“Just checking—what ZIP code should we use to confirm availability?”

**Branch A: ZIP provided**
Message 2:
“Got it. What’s the best day/time for service? (e.g., today, tomorrow AM, this weekend)” 

**Branch B: asks price first**
Message 2:
“Happy to help. Pricing depends on a few details. What’s the issue and when do you need service?”

**Branch C: wants to book directly**
Message 2:
“Great—here’s the booking link: {{calendar_link}}. If the link doesn’t load, reply with a day/time window and we’ll confirm.”

**Calendar failure fallback (if link check fails OR user says it’s broken):**
“Sorry about that—our booking link is having trouble. Reply with 2 time windows that work for you and we’ll lock one in.”

**Escalation-to-human (after 2 unanswered questions OR user confusion/anger):**
“Thanks—looping a team member in now to finish this up. If you need immediate help call {{business_phone}}.”

### STOP / HELP deterministic behavior (must override everything)
If inbound contains “STOP” (case-insensitive exact word match allowed with punctuation):
- Immediately respond: “You’re opted out and will no longer receive texts. Reply START to re-subscribe.”
- Mark contact as DNC/opted-out; no further messages.

If inbound contains “HELP”:
- Respond: “Help: This is {{business_name}} appointment texts. Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to.”

### After-hours deterministic behavior
If outside business hours:
- First message still within 60s: “Thanks— we’re currently closed. We’ll follow up at {{next_open_time}}. What’s your ZIP code so we can route you?”
- Do not attempt booking confirmation; collect minimal info + schedule follow-up.

## 5) E2E test cases (must-run list)
Run each scenario at least once per lead source, unless noted.

### 5.1 Missing phone
Input lead payload has no phone.
- Expected: no SMS attempt; log error; if email present, send email: “Missing phone; please provide.”
- Expected CRM note: “Lead missing phone; cannot text.”

### 5.2 Invalid phone
Phone = “123”, “+199999”, letters.
- Expected: reject; no SMS; store validation reason.

### 5.3 STOP and HELP
- Send STOP from handset; confirm opt-out response and suppression.
- Send HELP; confirm help response includes opt-out guidance + support email.

### 5.4 After-hours
- Submit lead outside configured hours.
- Expected: first SMS under 60s; message indicates closed and follow-up time.

### 5.5 Multiple concurrent leads
- Fire 5 leads within 30 seconds from same source.
- Expected: each lead gets unique conversation state; no cross-talk; all first SMS <60s.

### 5.6 Calendar link failures
- Simulate calendar endpoint returns 500 OR set bad link.
- Expected: send “link having trouble” fallback + collect time windows.

### 5.7 Webhook retries
- Send same webhook with same idempotency key 3 times.
- Expected: only one conversation; retries acknowledged but deduped.

### 5.8 Duplicate leads
- Same phone submits twice within 10 minutes.
- Expected: no second SMS thread; append CRM note; optionally send single message “We’re on it—reply here to continue.”

### 5.9 CRM note formatting (HubSpot)
- Expected note structure (single note per lead, appended updates):
  - Title: “Lead Copilot Qualification”
  - Body includes:
    - Source: Jotform / Webhook / HubSpot
    - Lead name/phone (normalized)
    - Timestamps: T0/T2
    - Transcript (last 5 messages)
    - Outcome: booked / needs human / opted out / invalid phone

## 6) Exact sample payloads (Generic Webhook JSON)
Use these to test ingestion quickly.

### 6.1 Valid lead (happy path)
```json
{
  "event_id": "evt_001",
  "source": "webhook",
  "submitted_at": "2026-04-09T18:30:00Z",
  "lead": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "(415) 555-2671",
    "email": "test.lead@example.com",
    "service": "water heater repair",
    "city": "San Francisco",
    "zip": "94107"
  },
  "meta": {
    "page_url": "https://example.com/quote",
    "gclid": "TEST_GCLID"
  }
}
```

### 6.2 Missing phone
```json
{
  "event_id": "evt_002",
  "source": "webhook",
  "submitted_at": "2026-04-09T18:31:00Z",
  "lead": {
    "first_name": "NoPhone",
    "last_name": "Lead",
    "email": "nophone@example.com",
    "service": "roof repair"
  }
}
```

### 6.3 Duplicate (same event_id)
Send payload from 6.1 again with same event_id.

### 6.4 Invalid phone
```json
{
  "event_id": "evt_003",
  "source": "webhook",
  "submitted_at": "2026-04-09T18:32:00Z",
  "lead": {
    "first_name": "Bad",
    "last_name": "Phone",
    "phone": "123ABC",
    "service": "pest control"
  }
}
```

## 7) Jotform setup checklist (free tier)
1) Create form fields (exact names recommended):
- first_name (Short Text)
- last_name (Short Text)
- phone (Phone)
- email (Email)
- service (Dropdown)
- zip (Short Text)
- preferred_time (Short Text)
2) Enable Webhooks in Jotform settings:
- POST to ingestion endpoint
- Ensure it sends submission data JSON
3) Mapping assertions:
- Confirm phone arrives in a consistent field; if Jotform splits country/area, normalize.
4) Run scenarios:
- normal submit
- missing phone (remove required)
- invalid phone (if allowed)

## 8) HubSpot manual test checklist (free/dev)
1) Create a test Contact (with phone, email, name) and/or Deal.
2) Trigger the integration path used (workflow webhook, form, app).
3) Confirm:
- Conversation starts once per lead
- Notes are written back with expected formatting
- Opt-out is persisted (if HubSpot subscription types are used)

## 9) Results + Evidence table (fill during pilot)
Minimum sample size: **20 total runs** (suggested: 8 webhook, 6 Jotform, 6 HubSpot).

Columns:
- Run #
- Source (Webhook/Jotform/HubSpot)
- Scenario (Happy/MissingPhone/InvalidPhone/STOP/HELP/AfterHours/Concurrency/CalendarFail/Retry/Duplicate)
- T0 lead created (ISO)
- T2 provider accepted (ISO)
- Latency seconds (T2-T0)
- Pass/Fail
- Evidence link (screenshot/log URL)
- Notes

Compute:
- p50 latency
- p95 latency
- max latency

## 10) Pre-filled bug/fix list (prioritized by churn risk)
### P0 (must-fix before agency rollout)
1) SMS sent to invalid phone due to weak validation → add strict normalization + rejection.
2) STOP not fully suppressing future messages → enforce global opt-out gate at send layer.
3) Duplicate lead triggers multiple parallel threads → implement idempotency key + phone/time-window dedupe.
4) LLM outage causes silent failure (no message) → deterministic mode must always send Message 1.

### P1 (fix soon)
5) After-hours messaging not clear or schedules wrong follow-up → use explicit next_open_time and queue.
6) Calendar link broken creates dead-end → fallback asks for 2 time windows and escalates.

### P2 (nice-to-have)
7) CRM note formatting inconsistent → standard template with transcript + timestamps.
8) Webhook retries spam logs/CRM → reduce noise by consolidating retry notes.

## 11) What to deliver to agencies after running this
- A one-page KPI screenshot/table: p50/p95 and confirmation “first response <60s”.
- Transcript examples (happy path + after-hours + fallback mode).
- A short bug list (if any) with fix ETA.

End of proof pack.
