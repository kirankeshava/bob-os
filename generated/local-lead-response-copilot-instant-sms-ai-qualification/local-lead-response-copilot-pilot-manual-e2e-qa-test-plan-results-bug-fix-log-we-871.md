# Local Lead Response Copilot — Pilot Manual E2E QA Test Plan + Results + Bug/Fix Log (Webhook JSON + Jotform + HubSpot, <60s KPI, Fail-safes)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:09:02.867Z

---

Business: Local Lead Response Copilot (Instant SMS + AI Qualification)
Proof/legitimacy URL to share with pilots: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Business contact email: agent_bob_replit+lead-copilot@agentmail.to

Goal of this runbook (pilot stage)
1) Verify <60 seconds to first SMS response across 3 lead sources.
2) Validate fail-safe behaviors that protect reputation: missing/invalid phone, STOP/HELP compliance, after-hours routing, concurrency, calendar failures, webhook retries, duplicate leads, and clean HubSpot note formatting.
3) Document deterministic fallback if LLM fails (timeout/error) so the conversation never becomes unsafe or incoherent.

Scope: 3 lead sources to test
A) Generic Webhook JSON (direct POST into our endpoint)
B) Jotform (real form tool)
C) HubSpot (CRM lead/contact creation/update trigger)

Pre-flight checklist (do before running any timed tests)
- Confirm SMS sending is enabled in the environment under test.
- Confirm the system has a defined business timezone and “after-hours” window (example: 6pm–8am local).
- Confirm an appointment/booking destination exists (calendar link OR manual booking instruction message).
- Confirm a dedupe key strategy exists (phone + lead_source + external_lead_id OR phone + day bucket).
- Prepare 2 physical handsets for concurrency tests (or 1 handset + 1 teammate handset). If only 1 handset is available, use one real number and one test number if supported.

KPI definition: <60s first response
We measure TTFM (time-to-first-message):
TTFM = (handset receives first SMS timestamp) – (lead received timestamp).
Acceptance: median < 30s; max <= 60s during the run.

How to capture timestamps (repeatable method)
For each test lead submission, record:
1) Lead received timestamp (server-side): capture from request logs/webhook logs OR integration “submission received” time.
2) SMS queued/sent timestamp (provider-side): capture from messaging logs if available.
3) Handset delivery timestamp (user-side): read from phone message timestamp.
If server/provider timestamps aren’t visible in pilot stage, minimum acceptable proof is: (form submit time on screen) + (handset SMS time). Record both with a screen recording.

Results table (copy/paste into a sheet)
Columns:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario
- External Lead ID (if any)
- Lead Received Time
- SMS Sent/Queued Time
- Handset Received Time
- TTFM (sec)
- Expected Behavior Pass/Fail
- Notes

Deterministic fallback qualification flow (NO-LLM)
Trigger condition: LLM timeout (>5s), LLM error, or “model unavailable” response.
Principles: short, clear, compliant, minimal branching.

Message 0 (immediate auto-response, always deterministic)
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out — quick question so I can help: what service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other”

Branch A: user replies 1/2/3/4 (or any text)
Message 1:
“Got it. What’s your ZIP code?”

Message 2 (after ZIP):
“Thanks — when do you want this done? Reply 1) ASAP 2) This week 3) Next week”

Message 3 (after timing):
If during business hours:
“Perfect. Want to book a quick call? Reply YES and I’ll send a booking link, or reply NO and tell me your preferred time.”
If after-hours:
“Thanks — we’re currently closed. Reply YES to get a booking link now, or reply TOMORROW and we’ll text you first thing in the morning.”

Booking handoff:
- If booking link available: “Here’s the link to pick a time: {{calendar_link}}. If it doesn’t load, reply CALL and we’ll schedule manually.”
- If booking link not available (calendar failure): “Our booking link is temporarily down. Reply with a good time window (e.g., ‘Tomorrow 10–12’) and we’ll confirm.”

STOP/HELP compliance (always deterministic)
- If inbound message contains “STOP” (any case): immediately stop all outbound messages and mark contact opted-out. Reply once: “You’re opted out and will no longer receive messages. Reply HELP for help.”
- If inbound message contains “HELP”: reply once: “Help: You can reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to. More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

Fail-safe behavior matrix (expected outcomes)
1) Missing phone
- Expected: no SMS attempt. Create internal/CRM note: “No phone provided; cannot text.” If email exists, send email fallback (optional). Flag to ops.
2) Invalid phone (too short, letters, non-E.164 if required)
- Expected: no SMS attempt. Normalize if possible; else mark invalid and create CRM note.
3) STOP
- Expected: opt-out immediately; suppress all future messages; log opt-out timestamp and source.
4) HELP
- Expected: send help message; continue normal flow unless STOP later.
5) After-hours
- Expected: do NOT spam multiple questions. Send after-hours version and offer booking link or morning follow-up.
6) Multiple concurrent leads (5 leads within 30 seconds)
- Expected: all get Message 0 within <60s. No cross-talk (each lead has correct thread state).
7) Calendar link failures
- Expected: detect failure (link unavailable/config missing) and switch to manual scheduling prompt; never loop.
8) Webhook retries
- Expected: idempotent handling: same external_lead_id does not trigger another Message 0; return 200 OK with “duplicate” note.
9) Duplicate leads (same phone, different source)
- Expected: if within dedupe window (e.g., 30–120 minutes), either suppress or send a single message that references latest intent; must avoid double-texting within seconds.
10) CRM note formatting
- Expected: notes are readable, consistent, and include required metadata and transcript.

HubSpot note formatting template (strict)
Subject: “Lead Copilot Transcript — {{lead_source}} — {{phone}} — {{status}}”
Body:
Lead Source: {{lead_source}}
External Lead ID: {{external_lead_id}}
Name: {{first_name}} {{last_name}}
Phone: {{phone}}
Email: {{email}}
Received At: {{received_at_iso}}
First SMS Sent At: {{first_sms_sent_at_iso}}
Opt-out: {{true/false}} (STOP at {{stop_time_iso}} if true)
After-hours: {{true/false}}
Booking Outcome: {{Booked / Link Sent / Manual Requested / No Response / Invalid Phone / Missing Phone}}
Calendar Link: {{calendar_link_or_missing}}
--- Transcript ---
[Outbound {{t0}}] {{msg0}}
[Inbound  {{t1}}] {{reply1}}
[Outbound {{t2}}] {{msg1}}
...
--- System Notes ---
LLM Used: {{true/false}}
Fallback Triggered: {{none / timeout / error / disabled}}
Dedupe: {{none / suppressed duplicate / merged}}

Test execution steps by source

A) Generic Webhook JSON
1) Identify the inbound endpoint URL used by the product for generic webhooks.
2) Use curl/Postman to send the payloads below.
3) For each payload, start a stopwatch at “send” and record timestamps per KPI method.

Webhook payloads (ready to paste)
A1 Valid lead:
{
  "external_lead_id": "qa-webhook-001",
  "source": "webhook",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550101",
  "email": "test@example.com",
  "service": "Quote",
  "notes": "QA run: valid lead"
}
Expected: Message 0 within <60s; HubSpot note created/updated if connected.

A2 Missing phone:
{
  "external_lead_id": "qa-webhook-002",
  "source": "webhook",
  "first_name": "NoPhone",
  "last_name": "Lead",
  "email": "nophone@example.com",
  "service": "Repair"
}
Expected: No SMS; internal/CRM note “Missing phone”.

A3 Invalid phone:
{
  "external_lead_id": "qa-webhook-003",
  "source": "webhook",
  "first_name": "BadPhone",
  "phone": "555-ABC",
  "service": "Install"
}
Expected: No SMS; note “Invalid phone”; does not crash.

A4 Duplicate lead ID (idempotency): send A1 again unchanged.
Expected: No second Message 0; response indicates duplicate handled.

A5 Retry simulation: send A1 twice rapidly (within 2–5 seconds).
Expected: still only one outbound SMS.

B) Jotform (real form tool)
Setup
1) Create a Jotform with fields: First Name, Last Name, Phone, Email, Service Needed (dropdown), ZIP, Preferred Time.
2) Connect Jotform submission webhook/integration to Lead Copilot intake.

Execution
- Submit 10 forms:
  - 5 normal (unique phones)
  - 1 missing phone
  - 1 invalid phone
  - 1 duplicate submission (same phone + same name) within 60 seconds
  - 2 after-hours (run by changing system “after-hours” window or performing test outside hours)
Expected: same behaviors as matrix; verify TTFM per submission.

C) HubSpot (CRM)
Setup
1) Create a test pipeline/contact or use a sandbox.
2) Configure trigger: new contact OR new form submission in HubSpot that flows into Lead Copilot.

Execution (at least 10)
- Create/update contacts:
  - Normal new contact with phone
  - Update existing contact with new lead event (ensure dedupe behavior)
  - Contact with missing phone
  - Contact with invalid phone
Expected: first SMS <60s for valid phones; HubSpot note created in strict format template.

STOP/HELP specific test cases (run on any valid lead)
- After receiving Message 0, reply “HELP”. Expected: help message with email + website URL.
- Reply “STOP”. Expected: opt-out confirmation and then silence.
- After STOP, submit a new lead for same phone. Expected: NO SMS, but a CRM note: “Suppressed due to opt-out.”

Concurrency test
- Submit 5 leads in <30 seconds from mixed sources (e.g., 2 webhook, 2 Jotform, 1 HubSpot).
Expected: all get Message 0 within <60 seconds; no message mix-ups.

Calendar failure test
- Temporarily remove/blank calendar_link config (or point to invalid URL).
- Submit 1 valid lead.
Expected: flow switches to manual scheduling prompt; no broken-link loop; note indicates “calendar missing/down”.

Known likely bugs to watch (and smallest fixes)
1) Phone normalization gaps (e.g., “(415) 555-0101” fails)
Fix: normalize to E.164 with a strict library; reject clearly invalid.
2) Duplicate texts on webhook retries
Fix: enforce idempotency key on external_lead_id; store “first_message_sent_at”.
3) STOP not globally enforced
Fix: central opt-out flag checked before any send, regardless of source.
4) After-hours still asks multiple questions
Fix: cap to 1 message after-hours + offer booking or morning follow-up.
5) HubSpot notes messy/unstructured
Fix: enforce template exactly; escape newlines; limit transcript length.

Bug log template (copy/paste)
- Bug ID:
- Title:
- Severity (P0/P1/P2):
- Source (Webhook/Jotform/HubSpot):
- Scenario:
- Steps to reproduce:
- Expected behavior:
- Actual behavior:
- Evidence (screenshots/timestamps/log snippets):
- Suspected cause:
- Proposed fix (smallest change):
- Retest result:

Exit criteria for pilot QA sign-off
- At least 20 total leads tested across the 3 sources.
- No P0 issues in: STOP compliance, missing/invalid phone handling, duplicate/retry dedupe, or after-hours behavior.
- Measured TTFM: max <= 60 seconds for all valid-phone leads in the run.
- HubSpot note formatting matches template on 10/10 CRM tests.

Notes
This runbook is intentionally manual (CEO directive: focus distribution/revenue first). Once there are 1–3 paying pilots and stable integration patterns, the highest-risk cases (STOP, dedupe, retries, after-hours) should be converted into lightweight regression scripts.
