# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:01:33.223Z

---

## Purpose (pilot-stage, revenue-safe)
Validate that Local Lead Response Copilot reliably texts new leads in under 60 seconds, qualifies them safely, and writes clean CRM notes across three lead sources—without building automated QA before revenue.

**Product proof links to use in any pilot comms:**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Contact email: agent_bob_replit+lead-copilot@agentmail.to

---

## Lead sources covered (minimum 3)
1) **Generic Webhook JSON** (baseline integration / Zapier-like)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM: contact creation + note logging)

---

## KPI definition: “First response <60s”
A lead **passes** if the first outbound SMS is **sent** (provider queued/sent) within **60 seconds** of lead receipt.

### Timing capture protocol (do this for every test lead)
Capture these timestamps:
1. **T0: Lead received** (server receive time or integration receive log)
2. **T1: SMS queued/sent** (SMS provider log timestamp or internal event)
3. **T2: Delivered to handset** (optional; carrier dependent, record if available)

Compute:
- **Response latency = T1 − T0** (must be <60s)
- Track delivery latency separately (T2 − T1) but don’t fail the KPI solely on carrier delay.

**Operator tip:** Use a stopwatch as backup and screenshot provider logs.

---

## Deterministic fallback qualification flow (NO LLM)
Trigger this flow when:
- LLM errors, times out, returns empty output, or JSON parsing fails
- Any “safety” rule requires deterministic behavior (STOP/HELP)

### Message templates (exact text)
**Message 1 (immediate):**
“Hi {{first_name}}, it’s {{biz_name}}. Thanks for reaching out—what can we help with today? Reply with 1) Quote 2) Schedule service 3) Other”

**If reply = 1 (Quote):**
Q2: “Got it—what service do you need? (e.g., plumbing repair, water heater, AC tune-up)”
Q3: “What’s your ZIP code?”
Q4: “Best time for a quick call? 1) Now 2) Today 3) Tomorrow”
Then: “Thanks—here’s the booking link: {{calendar_link}}. If you prefer, reply with a time window and we’ll confirm.”

**If reply = 2 (Schedule service):**
Q2: “What address/ZIP is the job at?”
Q3: “What day works best? 1) Today 2) Tomorrow 3) This week”
Then booking link message as above.

**If reply = 3 (Other):**
Q2: “Tell me a bit more about what you need.”
Q3: “What’s the best time to reach you?”
Then booking link message.

### After-hours deterministic behavior
If outside business hours (configure window per customer):
Immediate SMS:
“Thanks {{first_name}}—we’re currently closed. We’ll text you back at {{next_open_time}}. If urgent, reply URGENT.”
If user replies “URGENT”: route to on-call / notify human immediately.

### STOP / HELP compliance (hard rules)
- If inbound body contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”: immediately mark opt-out and respond:
  “You’re opted out and will no longer receive messages. Reply START to re-subscribe.”
- If inbound contains “HELP”: respond:
  “Help: This is {{biz_name}} lead follow-up. Reply STOP to opt out. For support email {{support_email}}.”
  (Use agent_bob_replit+lead-copilot@agentmail.to for pilot unless customer provides their own.)

---

## Fail-safe behavior matrix (expected outcomes)
1) **Missing phone**
- Expected: Do not send SMS. Create CRM note: “No phone provided—unable to text.” If email exists, send email fallback (optional) or flag for manual follow-up.

2) **Invalid phone (non-E.164 / too short / letters)**
- Expected: Reject SMS send; log validation error; create CRM note “Invalid phone: {{raw}}”.

3) **STOP / HELP**
- Expected: See compliance rules above. Ensure no further outbound beyond required compliance messages.

4) **After-hours**
- Expected: Immediate closed message + schedule follow-up at next open. Do not spam multiple reminders.

5) **Multiple concurrent leads (burst)**
- Expected: Queue without dropping messages; each lead gets first SMS <60s under moderate burst (define pilot target: 10 leads in 2 minutes).

6) **Calendar link failures (calendar down / 404)**
- Expected: Replace booking link with fallback: “Reply with 2–3 times that work and we’ll confirm.” Log incident in CRM note.

7) **Webhook retries**
- Expected: Idempotency: repeated payload with same lead_id should not trigger duplicate SMS. If no lead_id provided, dedupe by phone+timestamp window (e.g., 10 minutes).

8) **Duplicate leads across sources**
- Expected: If the same phone submits Jotform and then arrives from HubSpot sync, dedupe by phone; create CRM note “Duplicate detected; no new SMS sent.”

9) **CRM note formatting**
- Expected: Notes are readable, consistent, and include transcript + outcomes (see template below).

---

## HubSpot CRM note template (strict)
Create a note on the Contact record (or Deal) with:

**Title:** “Lead Copilot — SMS Qualification Transcript”

**Body (exact headings):**
- Lead Source: {{source}} (Webhook/Jotform/HubSpot)
- Lead Received At: {{T0_iso}}
- First SMS Sent At: {{T1_iso}} (Latency: {{seconds}}s)
- Phone: {{e164_or_raw}}
- Opt Status: {{opted_in|opted_out|unknown}}
- After-hours: {{yes|no}}
- Booking Outcome: {{booked|link_sent|requested_times|no_response|opted_out|failed}}
- Transcript:
  - OUT: “….”
  - IN:  “….”
  - OUT: “….”
- Errors/Warnings (if any): {{validation_error|calendar_error|llm_timeout|dedupe_suppressed}}

---

## Test execution plan (20 total leads minimum)
Run at least:
- 8 leads via Generic Webhook
- 6 leads via Jotform
- 6 leads via HubSpot

Include edge cases:
- 2 missing phone
- 2 invalid phone
- 2 STOP
- 1 HELP
- 2 after-hours
- 2 duplicates (same lead repeated)
- 2 webhook retries (same lead_id)
- 3 concurrency/burst (send 5 leads quickly)
- 2 calendar link failure simulations (use a broken link)

---

## Webhook JSON test payloads (ready to paste)
### A) Valid lead
{
  "lead_id": "qa-001",
  "source": "webhook",
  "first_name": "Test",
  "last_name": "User",
  "phone": "+14155550100",
  "email": "test.user@example.com",
  "service": "Plumbing repair",
  "submitted_at": "2026-04-09T12:00:00Z"
}

### B) Missing phone
{
  "lead_id": "qa-002",
  "source": "webhook",
  "first_name": "NoPhone",
  "email": "nophone@example.com",
  "service": "AC tune-up",
  "submitted_at": "2026-04-09T12:01:00Z"
}

### C) Invalid phone
{
  "lead_id": "qa-003",
  "source": "webhook",
  "first_name": "BadPhone",
  "phone": "555-ABCD",
  "service": "Water heater",
  "submitted_at": "2026-04-09T12:02:00Z"
}

### D) Duplicate lead_id (dedupe)
{
  "lead_id": "qa-001",
  "source": "webhook",
  "first_name": "Test",
  "phone": "+14155550100",
  "service": "Plumbing repair",
  "submitted_at": "2026-04-09T12:03:00Z"
}

### E) Retry simulation (same lead_id, new submitted_at)
{
  "lead_id": "qa-004",
  "source": "webhook",
  "first_name": "Retry",
  "phone": "+14155550101",
  "service": "Drain cleaning",
  "submitted_at": "2026-04-09T12:04:00Z"
}

(Resend payload E 2–3 times; expect only one SMS.)

---

## Jotform test form requirements
Fields:
- First name (required)
- Last name (optional)
- Phone (required for primary path)
- Email (optional)
- Service needed (dropdown)
- Consent checkbox: “I agree to receive texts about my request.”

Edge-case submissions:
- Leave phone blank (if form allows) or submit invalid phone formats
- Submit twice with same phone within 2 minutes

---

## HubSpot test requirements
- Create or select a test Contact with a phone number.
- Trigger lead-copilot ingestion via:
  - new contact created
  - form submission synced into HubSpot
  - manual workflow enrollment (if used)

Validation:
- Note is created with the strict template
- Dedupe suppresses double-sends if the same contact re-triggers within window

---

## Results table (fill during run)
For each test, record:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (valid/missing phone/STOP/etc.)
- T0 lead received
- T1 SMS sent
- Latency seconds
- Pass/Fail (<60s)
- Expected behavior match? (Y/N)
- Notes / screenshot links

---

## Initial bug/fix list (common, high-risk)
1) Phone normalization: ensure E.164 conversion and validation before send.
2) STOP/HELP compliance: ensure global interception before LLM + before any other outbound.
3) After-hours routing: ensure immediate acknowledgment + scheduled follow-up; avoid “dead silence.”
4) Dedupe/idempotency: enforce lead_id-based idempotency; fallback to phone+time window.
5) Calendar fallback: if booking link unavailable, switch to “reply with times” path and log in CRM.
6) Concurrency: ensure queue/worker doesn’t exceed provider rate limits; log and retry safely.
7) HubSpot note formatting: ensure consistent headings and transcript formatting; avoid raw JSON dumps.

---

## Definition of “verified” for pilots
- At least **20 timed leads** run end-to-end across the 3 sources.
- At least **90%** of valid-phone leads show **T1 − T0 <60 seconds**.
- **0 compliance violations** for STOP/HELP.
- Deterministic fallback is triggered successfully at least once (simulate by disabling LLM) and still completes qualification safely.
