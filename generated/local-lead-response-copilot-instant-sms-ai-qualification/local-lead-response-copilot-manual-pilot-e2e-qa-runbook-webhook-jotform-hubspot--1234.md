# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug/Fix Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:05:26.505Z

---

## Purpose
Validate end-to-end reliability for **Local Lead Response Copilot (Instant SMS + AI Qualification)** during early pilots without building automated QA. This runbook proves the core KPI (**first SMS sent < 60 seconds from lead receipt**) across three lead sources and verifies fail-safes that protect agency reputation.

**Website (share for legitimacy):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
**Support email:** agent_bob_replit+lead-copilot@agentmail.to

---

## Lead Sources Under Test (3)
1) **Generic Webhook JSON** (direct POST to Copilot endpoint)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

**Minimum required fields (normalized):**
- lead_id (string; must be stable per submission)
- full_name (string)
- phone (E.164 preferred; e.g., +14155550123)
- email (optional)
- service (optional)
- zip (optional)
- message/notes (optional)
- source (one of: webhook, jotform, hubspot)
- created_at (ISO timestamp if source provides)

---

## KPI Definition + How to Prove It
**KPI:** First outbound SMS is queued/sent **within 60 seconds** of lead receipt.

**Capture three timestamps for each test lead:**
1) **T0 Lead Received:** server “received webhook” log time (or integration receipt time)
2) **T1 SMS Queued/Sent:** SMS provider event/log time (queued or sent)
3) **T2 Handset Delivered:** phone screenshot time or carrier-delivered event (if available)

**Pass criteria:** (T1 − T0) <= 60 seconds for at least **20 total leads** across the 3 sources. Track outliers; any >60s requires root cause + workaround/fix.

---

## Deterministic No‑LLM Fallback Qualification Flow (Fail-safe)
Trigger this flow when:
- LLM times out (e.g., >8s internal timeout)
- LLM returns error/empty response
- LLM output fails validation (missing required fields)

### Message 0 (immediate)
“Hi {first_name}—thanks for reaching out to {business_name}. Quick question so we can help fast: what service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other.”

### If reply = 1/2/3/4 (or free text)
Message 1:
“Got it. What’s the address or ZIP code for the job?”

### Next
Message 2:
“Thanks—when would you like service? Reply 1) ASAP 2) This week 3) Next week.”

### Next
Message 3 (handoff)
Option A (calendar works):
“Perfect. Here’s a link to book a time: {calendar_link}. If you prefer, reply with 2 times that work for you.”

Option B (calendar fails / no link):
“Perfect. Our scheduler is temporarily unavailable—reply with 2 times that work for you and we’ll confirm ASAP.”

### Completion criteria
- Collect: service need + zip/address + urgency window.
- Create/append CRM note with transcript and structured fields (template below).
- If after-hours: set expectation (see after-hours rules) but still capture qualification answers.

---

## Compliance + Safety Rules (Must Pass)
### STOP / HELP
- If inbound message contains STOP, UNSUBSCRIBE, CANCEL, END, QUIT:
  - Immediately mark contact **opted out**.
  - Send confirmation: “You’re opted out and will no longer receive messages. Reply START to resubscribe.”
  - Do **not** send further qualification/booking messages.
- If inbound contains HELP:
  - Send: “Help: This is {business_name}. Reply STOP to opt out. For support email {support_email}.”

### After-hours routing
Define business hours for pilot (example): Mon–Fri 8am–6pm local.
- If lead received after-hours:
  - Still send **Message 0** within 60s.
  - Add line: “We’re currently closed—our team will follow up at {next_open_time}. If urgent, reply URGENT.”
  - Ensure booking expectations don’t promise immediate call.

### Missing/invalid phone
- Missing phone: do not attempt SMS. Create CRM record/note: “No phone provided; request phone by email or mark incomplete.”
- Invalid phone (fails E.164/basic length): do not attempt SMS. Log validation failure + store raw input.

---

## Test Matrix (What to Execute)
Run at least **20 leads total**; recommended distribution:
- 8 Webhook JSON
- 6 Jotform
- 6 HubSpot
Include at least one instance of each scenario:
1) Normal valid lead
2) Missing phone
3) Invalid phone
4) STOP compliance
5) HELP compliance
6) After-hours lead
7) Multiple concurrent leads (3–5 in <30s)
8) Calendar link failure
9) Webhook retry (same lead_id resent)
10) Duplicate lead (same phone + different lead_id)
11) CRM note formatting correctness

---

## Webhook JSON — Ready-to-Paste Test Payloads
**A) Valid lead**
```json
{
  "lead_id": "webhook-001",
  "full_name": "Test Lead One",
  "phone": "+14155550123",
  "email": "testlead1@example.com",
  "service": "Repair",
  "zip": "94107",
  "message": "Need help today.",
  "source": "webhook"
}
```

**B) Missing phone**
```json
{
  "lead_id": "webhook-002",
  "full_name": "No Phone Lead",
  "email": "nophone@example.com",
  "service": "Quote",
  "zip": "94107",
  "source": "webhook"
}
```

**C) Invalid phone**
```json
{
  "lead_id": "webhook-003",
  "full_name": "Bad Phone Lead",
  "phone": "12345",
  "email": "badphone@example.com",
  "service": "Install",
  "zip": "94107",
  "source": "webhook"
}
```

**D) Duplicate by lead_id (retry/dedupe)**
Send payload A again with same lead_id.
Expected: No second SMS blast; system should detect duplicate and only append a note like “Duplicate webhook received; ignored.”

**E) Retry simulation (provider timeout)**
Send payload with same lead_id but add a header/field used to simulate timeout if available (or resend within 10 seconds). Expected: idempotent behavior.

---

## Jotform Setup (Free Tier)
1) Create form “Lead Copilot QA Form” with fields:
   - Name, Phone, Email, Service dropdown, ZIP, Message
2) Configure form submission webhook/integration into Copilot.
3) Submit 6 test entries including:
   - One with blank phone
   - One with invalid phone
   - One after-hours (change system clock / run outside hours)

Record timestamps per submission.

---

## HubSpot Setup (Free Tier)
1) Create a test pipeline or use default.
2) Decide trigger mechanism for “new lead” (e.g., new contact created, form submission, or workflow). Connect Copilot accordingly.
3) Create/submit 6 contacts:
   - Two with same phone (duplicate lead check)
   - One with STOP message after first SMS
4) Verify CRM notes are appended to the correct contact and formatted consistently.

---

## Expected HubSpot CRM Note Template (Strict)
Paste/verify exact format below (or closest supported):

**Title:** Lead Copilot Transcript — {source} — {lead_id}

**Body:**
- Lead ID: {lead_id}
- Source: {source}
- Received At (T0): {timestamp}
- First SMS Sent (T1): {timestamp}
- Phone: {phone_e164_or_raw}
- Email: {email}
- Name: {full_name}
- Service: {service}
- ZIP/Address: {zip_or_address}
- After-hours: {true/false}
- Opt-out: {true/false}
- Booking Outcome: {booked / sent_link / requested_times / failed_calendar}

Transcript:
1) OUT: {text}
2) IN: {text}
3) OUT: {text}
...

System:
- LLM Used: {true/false}
- Fallback Triggered: {true/false} (reason: timeout/error/invalid_output)

---

## Results Table (Fill During Run)
For each test lead, record:
- Lead source, lead_id
- T0 received
- T1 SMS sent
- Delta seconds (T1-T0)
- Scenario tag (normal/missing phone/etc.)
- Pass/fail
- Notes

Pass when:
- All compliance rules honored (STOP/HELP/after-hours)
- No duplicate SMS blasts on retries
- CRM note format consistent
- >= 20 leads measured and >= 95% are under 60s (and 100% under 60s is the target)

---

## Bug Log + Fix Suggestions (Use This Format)
**Bug ID:** QA-###
- Title:
- Severity: P0 (reputation/legal) / P1 (revenue) / P2 (polish)
- Source: webhook/jotform/hubspot
- Steps to Reproduce:
- Expected:
- Actual:
- Evidence: screenshots/log lines
- Suspected cause:
- Recommended fix:
- Workaround for pilots (if any):

### High-risk bugs to watch for (P0/P1)
- STOP not honored immediately
- After-hours messaging promises immediate call
- First response >60s consistently
- Duplicate/retry sends multiple SMS
- Invalid phone causes crash instead of graceful fail
- Calendar failure loops or dead-ends the conversation
- HubSpot notes appended to wrong contact

---

## Operator Checklist (Quick)
1) Confirm business hours setting.
2) Confirm SMS provider connected and delivering to your test handset.
3) Run 8 webhook tests (including retry + duplicates).
4) Run 6 Jotform submissions.
5) Run 6 HubSpot lead creations/submissions.
6) For at least 2 leads: reply STOP and verify opt-out behavior.
7) For at least 1 lead: reply HELP and verify help response.
8) Record T0/T1/T2 for all, compute deltas.
9) File bugs using the template and rerun failed scenarios after fixes.

---

## Pilot Communication Snippet (if an agency asks what QA we run)
“We validate sub-60-second speed-to-lead across webhook + Jotform + HubSpot using timed test leads, and we have fail-safes for STOP/HELP compliance, after-hours handling, duplicates/retries, and calendar failures. You can see our product info here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4 or email agent_bob_replit+lead-copilot@agentmail.to.”
