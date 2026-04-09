# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results + Bug Log + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:45:37.168Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook
Business proof URL (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal (what this protects)
Validate end-to-end behavior for first pilots across 3 lead sources:
1) Generic Webhook JSON (any ad/form tool)
2) Jotform (real form tool)
3) HubSpot (CRM)

Success criteria:
- **First outbound SMS to a valid lead is sent in <60 seconds** from lead receipt.
- System behaves safely under common failures: missing/invalid phone, STOP/HELP, after-hours, duplicates, retries, LLM failure, calendar outage, concurrency.
- CRM notes are consistently formatted and useful for agencies.

## 1) Environments & prerequisites (free-tier friendly)
- A sending phone number exists in the product (Twilio or provider) and inbound replies are received.
- Access to message logs (provider console or app logs).
- Ability to view lead-receipt timestamps (webhook request logs or app logs).
- Calendar/booking destination configured (or a test link).

### Test identities (use these consistently)
Create 6 test leads (names/emails) and at least 3 phone variants:
- VALID_MOBILE_1: +1 (555) 010-1001 (replace with a real device for reply tests)
- VALID_MOBILE_2: second real device number
- INVALID_SHORT: 12345
- INVALID_ALPHA: +1-ABC-DEFG
- MISSING_PHONE: null/""

## 2) KPI measurement method (<60s first response)
For every test submission, capture four timestamps:
T0 = lead submitted (form submit click time OR webhook request received time)
T1 = app acknowledges/creates lead (internal log time if available)
T2 = provider accepted outbound SMS (Twilio message created/queued time)
T3 = SMS received on handset (device clock time)

Primary KPI gate: **T2 - T0 < 60 seconds** for valid phone numbers.
Secondary (nice-to-have): **T3 - T0 < 75 seconds** (carrier variance).

Evidence to store per run:
- Screenshot or export of provider log showing message SID + created time
- Screenshot of inbound/outbound transcript for STOP/HELP tests
- Copy of webhook request payload (for webhook tests)
- HubSpot record screenshot showing note content + timestamp

Sample size for pilots:
- Minimum: 20 total submissions across 3 sources (at least 5 per source)
- Include at least 5 “edge/failure” scenarios.

## 3) Lead source A — Generic Webhook JSON
### A1) Webhook endpoint requirements (expected)
The product should accept a POST with JSON and map fields:
- first_name, last_name
- phone (E.164 preferred)
- email
- service/need
- zip or address
- source (string)
- consent (boolean, optional)

### A2) Ready-to-paste test payloads
#### A2.1 Valid payload
POST /webhook/lead (example)
Content-Type: application/json
{
  "first_name": "Test",
  "last_name": "WebhookValid",
  "phone": "+15550101001",
  "email": "test.webhook.valid@example.com",
  "service": "Water heater install",
  "zip": "94107",
  "source": "qa_webhook",
  "consent": true
}
Expected:
- Outbound SMS sent <60s (T2-T0).
- Conversation begins with deterministic or LLM-driven first message.
- Lead stored with source=qa_webhook.

#### A2.2 Missing phone
{
  "first_name": "Test",
  "last_name": "WebhookNoPhone",
  "phone": "",
  "email": "test.webhook.nophone@example.com",
  "service": "AC repair",
  "zip": "94107",
  "source": "qa_webhook"
}
Expected:
- **No SMS sent**.
- Lead marked “needs phone” (or error) and a CRM/admin note created.
- If notifications exist: internal alert to operator (email/slack) with the payload.

#### A2.3 Invalid phone
{
  "first_name": "Test",
  "last_name": "WebhookBadPhone",
  "phone": "12345",
  "email": "test.webhook.badphone@example.com",
  "service": "Roof leak",
  "zip": "94107",
  "source": "qa_webhook"
}
Expected:
- No SMS sent.
- Clear validation error stored; dedupe key should not be created from invalid phone alone.

#### A2.4 Duplicate lead payload (same phone within 10 minutes)
Send A2.1 twice.
Expected:
- Second event either:
  - Does not send a new SMS (preferred), OR
  - Sends a “we already reached out” message but does not spam.
- A single conversation thread per phone.
- CRM note indicates duplicate detected with timestamps.

#### A2.5 Retry simulation (same payload, different request-id)
Send same payload 3 times with headers:
- X-Request-ID: uuid-1, uuid-2, uuid-3
Expected:
- Idempotency by request-id (ideal) or by phone+time window.
- Only one outbound SMS.

## 4) Lead source B — Jotform (real form tool)
### B1) Create the form (fields)
Build a simple “Service Request” form with:
- First Name (required)
- Last Name (required)
- Phone (required)
- Email (optional)
- Service Needed (dropdown: Plumbing, HVAC, Roofing, Electrical)
- ZIP Code (required)
- Preferred time (optional)
- Consent checkbox (required): “I agree to receive SMS about my request.”

### B2) Integration setup
Use Jotform webhook (or integration) to POST to the product webhook.
Mapping must preserve phone and consent.

### B3) Test cases
1) Normal submission (valid phone): expect <60s.
2) Phone provided but not mobile (if testable): expect either delivery failure handling or alternate contact message.
3) Missing phone (attempt to bypass required field): expect Jotform blocks; confirm product also rejects missing.
4) After-hours: submit during configured after-hours window; confirm after-hours messaging behavior (below).
5) Concurrency: submit 3-5 times quickly with different phones; ensure no cross-talk.

## 5) Lead source C — HubSpot (CRM)
### C1) Expected behavior
When a lead is created/updated in HubSpot (or when triggered), the copilot should:
- Start SMS outreach/qualification
- Write back a **single structured note** on the contact/deal with transcript + qualification data

### C2) CRM note formatting acceptance criteria
A single note per lead lifecycle stage, formatted:
- Title line: “Lead Copilot Qualification Summary”
- Source + timestamps
- Contact info
- Answers captured
- Outcome (Booked / Needs follow-up / Disqualified / Stopped)
- Next action

Example note body:
Lead Copilot Qualification Summary
Source: HubSpot
Lead received: 2026-04-09T14:03:12Z
First SMS sent: 2026-04-09T14:03:40Z (28s)
Contact: Test HubSpotValid, +15550101001, test.hubspot.valid@example.com
Service: Plumbing
ZIP: 94107
Answers:
- Job type: Water heater install
- Urgency: This week
- Property: Single-family
Outcome: Booked
Booking link used: https://cal.example/booking
Transcript (last 6 messages):
[Customer] ...
[Copilot] ...
Next action: Confirm appointment; send reminder 24h prior.

### C3) HubSpot test cases
1) New contact with valid phone triggers SMS <60s.
2) Contact updated with same phone should not retrigger spam (dedupe).
3) Missing phone: no SMS; note indicates missing phone.
4) Invalid phone: no SMS; note indicates invalid.

## 6) Fail-safe behaviors (must-pass)
### 6.1 LLM failure → deterministic mode
Trigger: LLM timeout (>8s), error, or low-confidence.
Behavior: switch to deterministic script immediately.

Deterministic question flow (exact copy):
Message 1 (immediate):
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out — I can help get you a quick quote. What service do you need? Reply 1) Plumbing 2) HVAC 3) Electrical 4) Roofing”

If reply 1-4:
“Got it. What’s the ZIP code for the job?”

Then:
“Thanks. How soon do you need help? Reply 1) Today 2) This week 3) Flexible”

Then:
“Last question — is this for a home or business? Reply 1) Home 2) Business”

Then outcome routing:
- If Today: “We can prioritize this. Here’s the booking link: {{calendar_link}}. If you prefer, reply with a good time and we’ll call you.”
- Else: “Great — here’s the booking link: {{calendar_link}}. Or reply with a good time for a call.”

Timeout handling:
- If no reply within 5 minutes: “Just checking — do you still need help? Reply YES and I’ll send the booking link.”
- If still no reply within 60 minutes: mark “No response”; create CRM note.

### 6.2 STOP / HELP compliance
- On inbound “STOP”: immediately confirm opt-out and stop all outbound messages to that phone.
Reply: “You’re opted out and will no longer receive texts. Reply START to opt back in.”
- On inbound “HELP”: provide support contact.
Reply: “For help, reply with your question or email us at agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

### 6.3 After-hours behavior
If lead arrives outside business hours:
- Send immediate acknowledgement (still <60s):
“Thanks — we’re currently closed, but we got your request. What service do you need? Reply 1) Plumbing 2) HVAC 3) Electrical 4) Roofing”
- Do not promise immediate calls.
- If booking is allowed after-hours, include link; otherwise queue for next open.

### 6.4 Calendar link failures
If booking link returns error/unreachable or provider outage detected:
- Send fallback:
“Our booking link is temporarily down. Reply with a good time (today/tomorrow) and the best number to reach you, and we’ll confirm ASAP.”
- Create internal alert + CRM note.

## 7) Execution results table (fill during pilot)
Columns:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario
- T0, T2, Delta (sec)
- Pass/Fail
- Evidence link (screenshot/URL)
- Notes

## 8) Bug log template (fill immediately when found)
Fields:
- Bug ID
- Severity (S0 blocker, S1 high, S2 medium, S3 low)
- Scenario / Source
- Steps to reproduce
- Expected vs Actual
- Impact on revenue/churn (1 sentence)
- Suggested fix
- Owner
- Status

Severity guidance:
- S0: Sends SMS to wrong person, ignores STOP, spams duplicates, >60s consistently.
- S1: Calendar failure not handled, invalid phone causes crash, concurrency cross-talk.
- S2: CRM note formatting inconsistent, minor delays.

## 9) “Verified <60s” criteria for agencies
To claim “<60s first response,” store:
- At least 20 runs, with >=90% under 60s (T2-T0)
- Evidence screenshots for 5 representative runs (one per lead source + one after-hours + one concurrency)
- One STOP and one HELP transcript stored

End of runbook.
