# Local Lead Response Copilot — Manual E2E Test Plan + Results Evidence Pack (3 Lead Sources, <60s KPI, Deterministic Fail-safe)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:47:28.041Z

---

## Purpose
Validate end-to-end reliability for first pilots (no automation yet) across 3 lead sources while protecting agency reputation. Primary KPI: **first outbound SMS sent < 60 seconds** from lead creation. Secondary: safe compliance (STOP/HELP), graceful degradation (LLM failures), and no duplicate spam.

## Systems Under Test (3 Lead Sources)
1) **Generic Webhook JSON** (any tool that can POST JSON)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (contact created/updated → trigger → copilot)

## Evidence & Timing Method (required to claim <60s)
For each trial, capture these timestamps:
- **T0 (Lead Created):**
  - Webhook: request sent timestamp (Postman/curl time) + server log receipt time
  - Jotform: submission timestamp in Jotform “Submissions” list
  - HubSpot: contact “Create date” or workflow enrollment time
- **T1 (System Received):** app inbound log line that includes lead_id + received_at
- **T2 (First SMS Queued/Sent):** provider log line (or app log) with message_id + sent_at
- **Delta:** T2 - T0 must be **< 60 seconds**

**Evidence checklist per run:**
- Screenshot or copied log lines for T0/T1/T2
- Message transcript (first SMS + user replies)
- CRM note/activity screenshot for HubSpot formatting validation

**Sample size goal for pilots:** minimum **20 runs total** across the 3 sources (e.g., 8 webhook, 6 Jotform, 6 HubSpot). If any P0 failure occurs, stop and fix before continuing.

## Deterministic Fail-safe Mode (LLM down / timeout)
### Trigger conditions
Enter deterministic mode if any occur:
- LLM call errors, times out (>3s configurable), returns empty, or confidence flag is low
- Missing required lead fields prevents prompt completion

### State machine (exact messages)
**State 0: Initial outreach (must send within 60s)**
Message A (immediate):
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out — can I ask 2 quick questions to get you a fast quote?”
If no first_name:
“Hi! It’s {{business_name}}. Thanks for reaching out — can I ask 2 quick questions to get you a fast quote?”

If user replies YES/OK/anything other than STOP/HELP → proceed.

**State 1: Job type**
Message B:
“1) What service do you need? Reply with a number: (1) Repair (2) Install (3) Quote/Estimate (4) Other”

**State 2: Urgency**
Message C:
“2) How soon do you need this? (1) Today (2) This week (3) 1–2 weeks (4) Just researching”

**State 3: Location**
Message D:
“What city/ZIP is the job in?”

**State 4: Booking / Handoff**
If calendar link is healthy:
“Perfect — here’s the fastest way to get on the schedule: {{calendar_link}}. If you prefer, reply with 2 times that work today/tomorrow.”
If calendar link failure detected (HTTP error, provider down, missing config):
“Perfect — our online booking is temporarily down. Reply with 2 times that work today/tomorrow and a good callback number, and we’ll confirm ASAP.”

**Timeout behavior (no response):**
- After 5 minutes idle: “Just checking in — want to get this scheduled? Reply YES and I’ll help.”
- After 30 minutes idle: “If now isn’t a good time, reply LATER and we’ll follow up.”

### STOP/HELP compliance (must override all states)
If inbound message contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT” (case-insensitive):
- Immediately mark lead as **opted_out=true**
- Send: “You’re opted out and will no longer receive messages. Reply HELP for help.”
- Do not send any further messages.

If inbound contains “HELP”:
- Send: “Help: This is {{business_name}} scheduling. Reply STOP to opt out. For support email: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

## After-hours behavior
Define business hours per tenant (e.g., Mon–Fri 8am–6pm). If lead arrives after-hours:
- Still send **Message A** immediately (<60s) but include:
“Hi {{first_name}} — thanks! We’re currently closed. If you answer 2 quick questions, we’ll line this up first thing tomorrow.”
- If user tries to book, provide calendar link if it supports next-day slots; otherwise collect preferred times.

## Test Cases (Pass/Fail)
### 1) Missing phone number (P0)
Input: lead payload missing phone.
Expected: No SMS attempt. Create CRM note: “Missing phone — cannot text. Request phone via email/alternate channel.”
Pass: System does not error-loop; lead marked needs_contact.

### 2) Invalid phone number (P0)
Input: phone=“12345”, or non-E.164.
Expected: validation failure; no SMS sent; CRM note includes invalid value.

### 3) STOP (P0)
Input: user replies STOP after first SMS.
Expected: opted_out set, confirmation sent, no further messages.

### 4) HELP (P1)
Input: user replies HELP at any time.
Expected: help message includes business identity, opt-out instruction, support email, website URL.

### 5) After-hours (P1)
Input: lead created outside hours.
Expected: first SMS <60s + after-hours copy; no booking promises that require immediate human.

### 6) Multiple concurrent leads (P1)
Input: submit 5 leads within 10 seconds.
Expected: each gets first SMS <60s; no cross-talk (replies map to correct lead thread).

### 7) Calendar link failure (P0)
Input: calendar endpoint returns error / link not configured.
Expected: fallback copy asks for 2 times; does not dead-end.

### 8) Webhook retries (P0)
Input: resend identical payload 3 times (same external_id).
Expected: dedupe prevents multiple first SMS; at most 1 conversation started; log “duplicate suppressed”.

### 9) Duplicate leads (P0)
Input: same phone + same source within 5 minutes.
Expected: do not spam; attach to existing thread or send a single “Still want help?” message (configurable) once.

### 10) CRM note formatting (HubSpot) (P1)
Expected note template:
- Title: “Lead Copilot Qualification”
- Body includes:
  - Source (Webhook/Jotform/HubSpot)
  - Timestamps (received_at, first_sms_at)
  - Answers captured (service, urgency, zip)
  - Status (booked / needs follow-up / opted out)
Pass: readable, no JSON blobs dumped to notes.

## Sample Payloads (copy/paste)
### A) Generic Webhook JSON
{
  "external_id": "test-001",
  "source": "webhook",
  "first_name": "Jamie",
  "last_name": "Lee",
  "phone": "+14155550123",
  "email": "jamie@example.com",
  "service_requested": "Water heater install",
  "created_at": "2026-05-14T12:00:00Z"
}

### B) Jotform-style submission JSON (normalized example)
{
  "external_id": "jotform-98765",
  "source": "jotform",
  "form_id": "241234567890123",
  "answers": {
    "name": "Jamie Lee",
    "phone": "+14155550123",
    "email": "jamie@example.com",
    "service": "Plumbing repair"
  },
  "created_at": "2026-05-14T12:05:00Z"
}

### C) HubSpot contact-created payload (minimal fields)
{
  "external_id": "hubspot-vid-123456",
  "source": "hubspot",
  "objectType": "contact",
  "properties": {
    "firstname": "Jamie",
    "lastname": "Lee",
    "phone": "+14155550123",
    "email": "jamie@example.com",
    "lifecyclestage": "lead"
  },
  "created_at": "2026-05-14T12:10:00Z"
}

## Results Table (fill during pilot)
Columns:
- Run #, Source, external_id, T0, T1, T2, Delta(sec), Scenario (normal/STOP/etc), Pass/Fail, Evidence link (screenshot/log), Notes

## Bug/Fix List (prioritized)
P0 (blocks pilots): phone validation issues, STOP not honored, dedupe/retries spamming, calendar failure dead-end, >60s first SMS.
P1: HELP content missing identity, after-hours copy wrong, CRM notes unreadable.
P2: copy tweaks, minor formatting.

## Operator notes
If a test requires customer-facing identity/support references, use:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to
