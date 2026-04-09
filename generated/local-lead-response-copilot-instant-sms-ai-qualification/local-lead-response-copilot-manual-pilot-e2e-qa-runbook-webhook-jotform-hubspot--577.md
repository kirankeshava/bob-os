# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:25:07.153Z

---

Purpose
Validate end-to-end lead capture → first SMS response (<60s) → qualification → booking handoff across 3 lead sources (Generic Webhook JSON, Jotform, HubSpot). Ensure safe fallbacks for LLM failure and compliance behaviors (STOP/HELP, after-hours). This is designed for the first 1–3 paid pilots (manual execution; no automation required).

Business legitimacy references (use in any customer-facing comms)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

Scope
Lead sources (minimum 3):
1) Generic Webhook JSON (direct POST)
2) Jotform (real form tool)
3) HubSpot (real CRM)

KPIs
KPI-1: First outbound SMS is sent/queued within 60 seconds of lead receipt for valid mobile numbers during business hours.
KPI-2: If LLM fails (timeout/error), system switches to deterministic question flow (no hallucinations; fixed copy).
KPI-3: STOP/HELP compliance: STOP immediately suppresses further messages; HELP returns help copy.
KPI-4: Safe handling of missing/invalid phone: no SMS attempt; log/CRM note created; optional email fallback (if available).
KPI-5: Idempotency/deduping: duplicate lead events do not create duplicate conversations/notes.

Pre-flight checklist (do this once per pilot)
A) Business hours
- Define business hours window and timezone (e.g., Mon–Fri 8am–6pm local). Record it here: ____________
- Define after-hours behavior: (a) delayed next-business-hour text, or (b) immediate “we’ll follow up at X” text. Choose one and keep consistent.

B) Phone/SMS test assets
- You need 2 test phones:
  1) A valid mobile phone that can receive SMS.
  2) Optional second phone to test concurrency and STOP.
- Keep a stopwatch ready (phone timer is fine).

C) Logging/timing sources (what to capture)
For each test submission, capture these timestamps:
- T0 Lead submitted (local time shown on form submit / API client)
- T1 Server received (if available in app logs)
- T2 SMS queued/sent (from messaging provider log or app log)
- T3 SMS delivered/received on handset (read from phone notification time)
Compute:
- Response time = T2 – T0 (primary) and T3 – T0 (secondary “real world”)
Pass criteria for KPI-1: median <60s; and no single valid lead >90s without documented provider outage.

Lead Source 1: Generic Webhook JSON
Setup
- Identify webhook endpoint URL in the product admin. Paste here: __________________________
- Authentication method (if any): __________________________

Standard payload schema (minimum fields)
- lead_id (string; required for dedupe)
- first_name (string)
- last_name (string)
- phone (E.164 preferred, e.g., +14155551234)
- email (optional)
- service (optional)
- zip (optional)
- source (e.g., "webhook")
- created_at (optional ISO8601)

Ready-to-paste test payloads
1) Valid lead
{
  "lead_id": "wh_001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550101",
  "email": "testlead@example.com",
  "service": "Water Heater Repair",
  "zip": "94107",
  "source": "webhook",
  "created_at": "2026-04-09T12:00:00Z"
}
Expected: first SMS within 60s; qualification begins.

2) Missing phone
{
  "lead_id": "wh_002",
  "first_name": "NoPhone",
  "last_name": "Lead",
  "email": "nophone@example.com",
  "service": "HVAC Tune Up",
  "source": "webhook"
}
Expected: no SMS attempt; create internal log + CRM note (if connected) stating “missing phone”; optionally email fallback if configured.

3) Invalid phone
{
  "lead_id": "wh_003",
  "first_name": "BadPhone",
  "last_name": "Lead",
  "phone": "12345",
  "email": "badphone@example.com",
  "service": "Plumbing",
  "source": "webhook"
}
Expected: validation failure; no SMS; log/CRM note “invalid phone”; request correct number via email if available.

4) Duplicate lead ID (idempotency)
Send payload #1 again with same lead_id "wh_001".
Expected: no duplicate conversation; note should say “duplicate event ignored” (or equivalent).

5) Retry simulation (webhook resend)
Send payload with lead_id "wh_004" twice within 10 seconds.
Expected: only one outbound SMS thread; second event is safely ignored/merged.

Lead Source 2: Jotform
Setup (free tier is fine)
- Create a form named: “Lead Copilot Test Form”
- Fields (exact types):
  1) First Name (Short Text) required
  2) Last Name (Short Text) required
  3) Phone (Phone) required
  4) Email (Email) optional
  5) Service Needed (Dropdown) required: Plumbing, HVAC, Roofing, Electric, Other
  6) ZIP (Short Text) optional
  7) Consent checkbox (Single Checkbox) required: “I agree to receive SMS about my request. Reply STOP to opt out.”
- Integrate: configure Jotform Webhook to point to the product’s Jotform ingestion endpoint (or Zapier/Make-free if already used). Endpoint: ______________________

Jotform test cases
J1 Normal
- Submit with a valid mobile number.
Expected: <60s first SMS; qualification begins.

J2 Invalid phone
- Enter obviously invalid number (if Jotform blocks, use a borderline format that passes form validation but fails backend normalization).
Expected: backend rejects; no SMS; log/CRM note.

J3 Duplicate lead
- Submit same phone + same name twice within 1 minute.
Expected: either new conversation flagged as duplicate or merged; no double-booking.

J4 After-hours
- Submit outside business hours.
Expected: after-hours behavior triggers (either delayed send or immediate “we’ll follow up at X”). No booking spam.

Lead Source 3: HubSpot (CRM)
Setup
- Confirm whether HubSpot is:
  (A) a source (new contact/form submission in HubSpot triggers Copilot), or
  (B) a sink (Copilot writes notes/transcripts back to HubSpot).
Mark choice: ____

Minimum mapping (recommended)
- HubSpot Contact fields:
  - firstname
  - lastname
  - phone (mobile)
  - email
  - lead source (optional)
Expected: when Copilot runs, it appends a note to the Contact timeline (or engagement) with a standard transcript.

Strict HubSpot note formatting (copy/paste template)
Title: Lead Copilot Qualification Transcript
Body:
- Lead ID: {{lead_id}}
- Source: {{source}} (Webhook/Jotform/HubSpot)
- Received At: {{received_timestamp}}
- First SMS Sent At: {{first_sms_timestamp}}
- Response Time (sec): {{response_time_seconds}}
- Phone: {{phone_e164_or_masked}}
- Opt-out status: {{opt_status}} (e.g., ACTIVE / STOPPED)
- After-hours: {{yes_no}}
- Outcome: {{Booked / Needs Follow-up / No Response / Invalid Phone / Missing Phone}}
- Booking link used: {{link_or_none}}

Transcript (chronological):
1) OUTBOUND {{timestamp}}: {{message}}
2) INBOUND  {{timestamp}}: {{message}}
3) OUTBOUND {{timestamp}}: {{message}}
...

Errors/Flags:
- LLM fallback used: {{yes_no}}
- Calendar failure: {{yes_no}} (details)
- Duplicate/retry detected: {{yes_no}} (details)

Deterministic fallback qualification flow (NO-LLM)
Trigger conditions
- LLM timeout (>5s or configured threshold)
- LLM error/5xx
- Empty/invalid LLM output
Behavior: switch immediately to this fixed question flow; do not attempt “creative” follow-ups.

Exact outbound copy + branching
Message 1 (immediate on lead receipt; business hours)
“Hi {{first_name}}, it’s the team at {{business_name}}—got your request for {{service}}. Can I ask 2 quick questions to get you the fastest time slot? Reply 1) YES or 2) NO.”

If YES:
Q1: “Great—what’s the address or ZIP for the job?”
- If ZIP provided → continue
- If user refuses/blank → “No problem—what city are you in?”

Q2: “What’s the best time window? Reply 1) ASAP, 2) Today, 3) Tomorrow, or 4) This week.”

Handoff:
- If booking calendar is healthy: “Perfect. Here’s the booking link to grab the fastest slot: {{calendar_link}}. If you’d rather, reply with a preferred time and we’ll confirm.”
- If calendar link fails: “Thanks—our booking link is temporarily down. Reply with your preferred day/time and we’ll confirm by text, or call us at {{phone_number_if_available}}.”

If NO:
“Understood—reply with what you need and the best time to reach you, and we’ll follow up shortly.”

STOP/HELP compliance (hard rules)
- If inbound contains STOP (case-insensitive, exact token match acceptable):
  - Immediately mark contact as STOPPED.
  - Send only: “You’re opted out and will no longer receive messages. Reply START to opt back in.” (if START supported) Otherwise send nothing further.
- If inbound contains HELP:
  - Send: “Help: This is {{business_name}} appointment texting. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

After-hours behavior (choose one)
Option A (recommended for trust): immediate acknowledgement + next-hours follow-up
Message: “Thanks {{first_name}}—we’re currently closed. We’ll text you at {{next_open_time}} to get you scheduled. If urgent, reply URGENT.”
Then schedule Message 1 at next open.

Concurrency + duplicate handling expectations
- Multiple concurrent leads: system must queue per-number; no cross-contamination of transcripts.
- Deduping policy (recommended): If same phone + same source + within 10 minutes, treat as duplicate unless lead_id differs and user re-engages.

Test execution: 20-lead timed run (minimum)
Run at least:
- 8 normal leads (mix of sources)
- 3 missing/invalid phone
- 2 STOP
- 2 HELP
- 2 after-hours
- 2 duplicate/retry
- 1 calendar failure simulation

Results table (fill during run)
Columns:
Test ID | Source | Scenario | T0 Submit | T2 SMS Sent | T3 Received | RT Sent (sec) | RT Received (sec) | Pass/Fail | Notes

Bug log template
Bug ID | Severity (P0/P1/P2) | Source | Scenario | Steps to Reproduce | Expected | Actual | Screenshots/Logs | Proposed Fix | Status

Known high-risk bugs to watch for (triage guidance)
P0: Any STOP not honored; any first-response >90s on valid leads; wrong-recipient texting; double-booking.
P1: Dedupe failures creating multiple threads; after-hours spamming; calendar failure not handled.
P2: CRM note formatting inconsistent; minor copy issues.

Exit criteria (pilot-ready)
- Demonstrated <60s median first SMS sent time across all valid leads in this run.
- STOP/HELP and after-hours behaviors verified.
- Deterministic fallback verified by forcing LLM failure once (disconnect API key or use invalid key in staging) and confirming the exact copy/branching above.
- HubSpot note formatting matches the strict template and includes response-time metrics.
