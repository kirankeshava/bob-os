# Local Lead Response Copilot — Manual E2E QA Execution Packet (Run Steps + Evidence Protocol + Test Payloads + Bug/Fix Punch List)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:53:02.920Z

---

# Local Lead Response Copilot — Manual E2E QA Execution Packet
Website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Contact: agent_bob_replit+lead-copilot@agentmail.to

## Objective
Run end-to-end manual checks (no automation) across **3 lead sources**:
1) Generic Webhook JSON, 2) Jotform (real form tool), 3) HubSpot (CRM)

Prove:
- **Speed-to-lead KPI:** first outbound SMS sent in **<60 seconds** from lead submission.
- **Fail-safe behaviors:** deterministic qualification flow when LLM fails/timeouts.
- **Safety/compliance:** STOP/HELP, invalid/missing phone handling.
- **Operational resilience:** dedupe, retries, concurrency, after-hours, calendar failure handling.

## Tools (free)
- Browser + incognito window
- A stopwatch (phone timer) OR computer clock with seconds
- A simple log doc (Google Doc/Notion) to paste evidence
- Optional: Chrome DevTools Network tab to timestamp webhook POSTs

## Evidence Protocol (so we can show agencies)
Create a folder (or doc section) named: `QA_EVIDENCE_YYYY-MM-DD`.
For each test run, save:
- **T0 screenshot:** lead submitted confirmation (Jotform submit screen / webhook curl terminal output / HubSpot form submit confirmation)
- **T1 proof:** message log line or SMS transcript showing first outbound message time
- **Transcript:** copy/paste the SMS conversation if available

Naming convention per case:
`CASE-<id>_<source>_<scenario>_T0.png`, `..._T1.png`, `..._transcript.txt`
Example: `CASE-03_jotform_invalid-phone_T0.png`

## Measurement: <60s First Response
Record two timestamps per trial:
- **T0 (Lead Received):** moment form is submitted / webhook returns 200 / CRM lead created.
- **T1 (First SMS Sent):** timestamp when outbound SMS is sent (from message logs / Twilio console / app logs).

Compute: `Δ = T1 - T0` in seconds.
Pass if **Δ ≤ 60s**.
Store at least **20 trials total** across the 3 sources (minimum 5/source; remaining can be distributed).

## Deterministic Fallback (LLM Failure Safe Mode)
Trigger conditions (any):
- LLM API error
- LLM timeout > 8s
- LLM returns empty/unsafe output

When triggered, send deterministic questions:
1) “Thanks for reaching out — what service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other”
2) “What’s your ZIP code?”
3) “When do you want this done? Reply 1) ASAP 2) This week 3) Next week”
4) “What’s the best time for a quick call? Reply 1) Morning 2) Afternoon 3) Evening”

Escalation:
- If user replies with anything unclear twice OR no response after 10 minutes: “No worries—what’s the best number/time and we’ll call you shortly.”
- Always include STOP/HELP footer where required by policy.

## Test Dataset (use consistently)
Phones:
- Valid US mobile: `+14155550101` (or your actual test phone during pilot)
- Invalid: `123`, `+199999`, `+1415555ABCD`
- Missing phone: blank

Lead identity fields:
- `lead_id`: `QA-001`..`QA-999`
- Duplicate lead test: resend same `lead_id` and same phone within 2 minutes

After-hours:
- Define “after-hours window” in config (example: 6pm–8am local). Run one test inside window.

## Source 1: Generic Webhook JSON — Execution Steps
Pre-req: product provides an inbound webhook URL. If secret/signature is used, obtain format.

### Payloads
**A) Happy path**
```json
{
  "source": "webhook",
  "lead_id": "QA-001",
  "created_at": "2026-05-14T17:05:00-04:00",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550101",
  "email": "test@example.com",
  "service": "HVAC repair",
  "notes": "Noise from unit."
}
```

**B) Missing phone**
```json
{
  "source": "webhook",
  "lead_id": "QA-002",
  "created_at": "2026-05-14T17:06:00-04:00",
  "first_name": "NoPhone",
  "phone": "",
  "email": "test@example.com",
  "service": "Plumbing"
}
```

**C) Invalid phone**
```json
{
  "source": "webhook",
  "lead_id": "QA-003",
  "created_at": "2026-05-14T17:07:00-04:00",
  "first_name": "BadPhone",
  "phone": "123",
  "service": "Roofing quote"
}
```

**D) Duplicate lead** (send QA-001 again)
Same as payload A with same `lead_id` and phone.

### How to send
Use curl or Postman:
- Start timer at Enter key (T0)
- Capture terminal output/screenshot as T0 evidence

### Expected results
- Happy path: outbound SMS begins within 60s; qualification proceeds.
- Missing phone: no SMS attempt; create internal alert + CRM note (if configured) stating missing phone.
- Invalid phone: no SMS; response indicates invalid phone; log includes normalized parse error.
- Duplicate: dedupe rule prevents a second concurrent conversation and logs “duplicate suppressed” (or merges).

## Source 2: Jotform — Execution Steps (Free)
Goal: real form tool sending leads.

1) Create Jotform with fields: First name, Last name, Phone, Email, Service dropdown, Notes.
2) Configure webhook integration to product inbound endpoint.
3) Run cases:
   - CASE-JF-01 Happy path
   - CASE-JF-02 Missing phone
   - CASE-JF-03 Invalid phone
   - CASE-JF-04 Concurrency: submit 3 leads within 30s
   - CASE-JF-05 Duplicate: submit same phone + same email twice quickly

Evidence:
- Screenshot submit confirmation (T0)
- Screenshot/log of first outbound SMS (T1)

Expected:
- <60s for each valid lead even under concurrency.
- Form submissions with invalid data do not cause SMS send attempts.

## Source 3: HubSpot — Execution Steps (Free)
Goal: CRM ingestion + correct note formatting.

1) Create a HubSpot test account (free).
2) Decide the integration type (based on product capabilities):
   - A) HubSpot form submission webhook → product
   - B) HubSpot workflow/webhook action → product
   - C) Product writes back to HubSpot: create/update contact + add note

Run cases:
- CASE-HS-01 Happy path: lead created in HS, triggers SMS <60s
- CASE-HS-02 CRM note formatting: verify note includes structured fields (see below)
- CASE-HS-03 Retry: if HubSpot webhook retries, ensure idempotent processing

### Expected HubSpot note format (copy/paste spec)
Title: `Lead Response Copilot — Qualification Summary`
Body:
- Lead ID: <lead_id>
- Source: HubSpot
- First response sent at: <timestamp>
- Response time (sec): <Δ>
- Qualification path: LLM | Deterministic (fallback)
- Answers:
  - Service: <value>
  - ZIP: <value>
  - Timing: <value>
  - Call preference: <value>
- Disposition:
  - Booked: Yes/No
  - Calendar link used: <url or “N/A (fallback)”>
- Transcript link/log ref: <internal reference>

## Scenario Tests (Cross-source)
1) STOP: user replies “STOP” → ensure immediate confirmation + suppress further messages.
2) HELP: user replies “HELP” → provide support message + business identity.
3) After-hours: if outside business hours → send acknowledgment + schedule next-day follow-up OR offer calendar link.
4) Calendar link failure: simulate by using a broken URL → system apologizes, offers manual scheduling text, and creates CRM note “calendar failed”.
5) Webhook retries: resend same payload multiple times → only one conversation created; log idempotency key.

## Results Table (paste into sheet)
Columns:
- Case ID | Source | Scenario | T0 | T1 | Δ seconds | Pass/Fail | Evidence links | Notes

## Bug/Fix Punch List (prioritized)
P0 (reputation killers):
- Sends SMS to invalid numbers (carrier errors, spam flags) → add E.164 validation + blocklist.
- STOP not honored immediately → enforce global suppression keyed by phone.
- Duplicate leads create multiple threads → idempotency key = source + lead_id (+ phone) within TTL.

P1 (conversion killers):
- >60s first response under concurrency → queue prioritization + warm worker; alert on backlog.
- After-hours messaging confusing → explicit business-hours copy + next steps.

P2 (ops quality):
- HubSpot note formatting inconsistent → use deterministic markdown template above.

## Agency-facing “Proof Pack” summary (1 paragraph)
After executing 20+ trials across webhook/Jotform/HubSpot, provide: median response time, worst-case response time, STOP/HELP transcript screenshots, and at least one deterministic fallback transcript. This becomes a shareable reliability assurance during pilot onboarding.
