# Local Lead Response Copilot — Pilot Manual E2E QA Test Plan + Results (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:30:14.266Z

---

## 1) Purpose (pilot-stage, revenue-friendly)
This manual end-to-end (E2E) QA packet is designed to protect reputation during the first agency/customer pilots by verifying: (a) speed-to-lead (<60 seconds to first outbound SMS), (b) safe failovers when the LLM fails, (c) compliance behaviors (STOP/HELP), and (d) correct CRM logging and dedupe behavior across three lead sources.

**Business proof link to include in any pilot comms:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
**Business contact email:** agent_bob_replit+lead-copilot@agentmail.to

## 2) Lead sources under test (minimum 3)
1) **Generic Webhook JSON** (simulates any form/ads tool that can POST JSON)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (real CRM logging + note formatting expectations)

## 3) KPI: “first response <60s” — evidence + how to measure
### 3.1 Required timestamp points
Capture these timestamps for each trial:
- **T0 Lead Created**: when the lead is submitted (form submit timestamp / webhook send timestamp)
- **T1 Webhook Received**: server log timestamp for receipt (if available)
- **T2 SMS Requested**: app log timestamp when SMS send is initiated (if available)
- **T3 SMS Delivered/Sent**: Twilio/message provider timestamp OR device receipt time (fallback)

**KPI definition:** `T3 - T0 <= 60 seconds` for 95%+ of trials (pilot gate). If provider delivery timestamps are unavailable, use `T2 - T0` (send initiated) plus screenshot proof of phone receipt.

### 3.2 Evidence storage checklist
For each trial, store:
- Screenshot of lead submit confirmation (or webhook client “sent” log)
- Screenshot/export of app logs showing receipt and send
- Screenshot of SMS received on the test phone (time visible)
- If HubSpot is enabled: screenshot of the CRM contact + note

## 4) Deterministic fallback mode (LLM down/timeout)
### 4.1 When to trigger fallback
Trigger deterministic mode if any of the following occurs:
- LLM call errors (5xx/4xx) or times out (e.g., >6 seconds)
- LLM returns empty/unsafe output
- Content filter blocks generation

### 4.2 Safe initial SMS (always deterministic)
Send immediately on lead creation (no LLM required):
> “Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—what service do you need help with? (Reply 1) Repair 2) Install/Replace 3) Quote/Estimate 4) Other”

If no first name:
> “Hi—thanks for reaching out to {{business_name}}. What service do you need help with? (Reply 1) Repair 2) Install/Replace 3) Quote/Estimate 4) Other”

### 4.3 Deterministic question flow (branching)
**Q1 (service type):** user replies 1/2/3/4
- If invalid response: repeat once: “Sorry—reply 1, 2, 3, or 4 so I can route this correctly.”

**Q2 (urgency):**
> “Got it. Is this urgent? Reply 1) Today 2) This week 3) Not urgent”

**Q3 (job location):**
> “What’s the job ZIP code?”
- Validate 5-digit US ZIP. If invalid twice: “No worries—what city are you in?”

**Q4 (best time):**
> “When’s a good time for a quick call? Reply 1) Morning 2) Afternoon 3) Evening”

**Booking step:**
- If calendar link is available: “Perfect—grab a time here: {{calendar_link}}. If you prefer, reply with a specific time window.”
- If calendar link fails/unavailable: “I can’t pull up the scheduling link right now—reply with 2–3 times that work and we’ll confirm ASAP.”

**Escalation-to-human rule:**
Escalate to a human (notify internal channel/email) if:
- lead replies with complaint/angry sentiment
- user asks pricing that requires context
- user is ready to book and calendar is down
- after 4 total messages without a valid scheduling outcome

### 4.4 STOP/HELP compliance (must be deterministic)
If inbound message contains `STOP`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`:
- Immediately set contact as **Do Not Contact**
- Respond once: “You’re unsubscribed and will no longer receive messages. Reply HELP for help.”
- Do not send additional messages.

If inbound contains `HELP`:
- Respond: “Help: This is {{business_name}} appointment/text follow-up. Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to”

## 5) Test setup (common prerequisites)
- A test phone number capable of receiving SMS (and sending replies)
- Access to application logs (even basic request logs)
- If HubSpot is used: a test portal with permission to create contacts/notes
- Known “business_name” (can use “Local Lead Response Copilot Demo” for tests)

## 6) Lead Source #1: Generic Webhook JSON (E2E)
### 6.1 Endpoint expectations
- Accept POST JSON
- Return 2xx quickly (under 2 seconds)
- Support idempotency/dedupe via `lead_id` or hashed (phone+source+time window)

### 6.2 Canonical payloads
**Valid lead (control):**
```json
{
  "source": "webhook_test",
  "lead_id": "wh_001",
  "created_at": "2026-04-09T12:00:00Z",
  "first_name": "Jamie",
  "last_name": "Lee",
  "phone": "+14155550123",
  "email": "jamie@example.com",
  "service": "HVAC repair",
  "notes": "No heat",
  "utm": {"campaign": "spring", "adset": "a1"}
}
```

**Missing phone:**
```json
{ "source":"webhook_test", "lead_id":"wh_002", "first_name":"Jamie", "email":"jamie@example.com" }
```
Expected: no outbound SMS; create an internal alert + optional email fallback (if supported). Log as “uncontactable: missing phone”.

**Invalid phone:**
```json
{ "source":"webhook_test", "lead_id":"wh_003", "first_name":"Jamie", "phone":"123", "email":"jamie@example.com" }
```
Expected: no SMS attempt; log validation failure.

**Duplicate lead (same lead_id):** send payload `wh_001` again.
Expected: dedupe prevents second outbound sequence.

**Webhook retry simulation:** send same payload with same `lead_id` rapidly 3x.
Expected: still single conversation created; subsequent receives return 2xx but do not re-trigger messages.

### 6.3 Pass/fail
- PASS if first SMS is received within 60s (T3-T0) and dedupe works.
- FAIL if multiple SMS threads start for duplicates or retries.

## 7) Lead Source #2: Jotform (real form tool)
### 7.1 Form fields to create
- First Name (required)
- Last Name (optional)
- Phone (required)
- Email (optional)
- Service Needed (dropdown)
- Preferred Time (dropdown)
- Consent checkbox (optional depending on jurisdiction)

### 7.2 Field mapping expectations
- Jotform phone should normalize to E.164 if possible
- If Jotform phone missing/blank: treat as missing phone scenario

### 7.3 Jotform-specific test cases
1) Valid submission (control)
2) Missing phone (force by removing requirement temporarily)
3) Invalid phone formatting (enter text)
4) High concurrency: submit the form 5 times within 60 seconds with different names/phones
Expected: each lead gets its own conversation; no cross-talk.

## 8) Lead Source #3: HubSpot CRM logging + note formatting
### 8.1 What to verify
- Contact creation/update rules (same phone/email updates existing)
- Note appended with a readable qualification transcript
- No HTML garbage; consistent formatting; timestamps

### 8.2 Expected note format (copy/paste standard)
Title: `Lead Copilot Qualification — {{source}} — {{YYYY-MM-DD}}`
Body:
- Lead received: {{timestamp}}
- First SMS sent: {{timestamp}} (delta {{seconds}}s)
- Qualification (deterministic or AI): {{mode}}
- Responses:
  - Service: {{value}}
  - Urgency: {{value}}
  - ZIP/City: {{value}}
  - Preferred time: {{value}}
- Booking:
  - Calendar link: {{url or “unavailable”}}
  - Outcome: {{booked / requested times / no response}}
- Compliance:
  - STOP/HELP flags: {{none / STOP at time / HELP at time}}

### 8.3 HubSpot edge tests
- Duplicate lead: submit same phone twice; ensure it appends note rather than creating two contacts.
- STOP: user texts STOP; ensure HubSpot note shows opt-out and no more messages sent.

## 9) Global high-risk scenarios (run across at least one source each)
1) **STOP**: user replies STOP after first message → verify DNC + confirmation message.
2) **HELP**: verify help message includes opt-out + support email.
3) **After-hours routing**: if outside business hours, message should set expectation:
   > “Thanks—our office is currently closed. We’ll follow up at {{next_open_time}}. If urgent, reply URGENT.”
   And optionally route to on-call.
4) **Calendar link failures**: simulate calendar URL unreachable → system offers manual time collection.
5) **LLM failure**: force timeout/error → deterministic Q1-Q4 flow continues.
6) **Multiple concurrent leads**: 5 leads within 1 minute → no thread mixing; KPI still <60s.
7) **Webhook retries**: repeated deliveries → idempotent behavior.
8) **CRM note formatting**: verify standardized note body, no broken placeholders.

## 10) Results capture table (fill during pilot)
Columns:
- Trial #
- Source (Webhook/Jotform/HubSpot)
- Scenario (control/STOP/etc.)
- T0 lead created
- T1 received
- T2 send initiated
- T3 received on phone
- Delta (T3-T0)
- Pass/Fail
- Evidence links (screenshots/log URLs)
- Bug ID (if fail)

## 11) Bug log template (prioritized by churn risk)
Fields:
- Bug ID
- Severity: P0 (reputation/compliance) / P1 (conversion loss) / P2 (cosmetic)
- Source + scenario
- Steps to reproduce
- Expected vs actual
- Evidence
- Suggested fix
- Owner
- Status

## 12) Current “results” status
**Not yet executed**: Real timestamped results require the live webhook endpoint + SMS provider logs and (optionally) a HubSpot sandbox integration. This packet is ready to run during first pilot onboarding; once executed, we will confirm (or fail) the <60s KPI with stored evidence and produce a concrete bug list.
