# Local Lead Response Copilot — Manual E2E Pilot QA Runbook (Webhook + Jotform + HubSpot) w/ <60s KPI Proof + Fail-safes + Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:38:45.298Z

---

Business context
Local Lead Response Copilot (Instant SMS + AI Qualification) validates that new leads get a first SMS in <60 seconds, are qualified safely (even if the LLM fails), and are logged cleanly into CRM. Public proof URL (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Ops email: agent_bob_replit+lead-copilot@agentmail.to

Scope (3 lead sources)
A) Generic Webhook JSON (direct POST into our ingest endpoint)
B) Jotform (real form tool) → webhook to our ingest endpoint
C) HubSpot (CRM) (contact creation + note formatting validations; and/or CRM-originated lead injection if supported)

Success criteria
1) KPI: First outbound SMS queued/sent within 60 seconds of lead receipt for >= 19/20 test leads. (One miss allowed if carrier delivery delay; must still show “SMS queued/sent” <60s.)
2) Compliance: STOP immediately suppresses further outreach; HELP returns help text; opt-out is recorded.
3) Safety: If LLM fails/timeout, deterministic fallback flow takes over (no blank/garbled messages).
4) Reliability: Duplicate leads and webhook retries do not spam; concurrency does not delay beyond 60s; after-hours behavior matches settings.
5) CRM logging: HubSpot note format is consistent, readable, and includes key metadata.

Environment & prerequisites
- A phone number you control for receiving SMS (test handset). Use at least two numbers if possible to test concurrency.
- Ability to view server logs or event timestamps (lead received time, sms queued/sent time).
- Calendar/booking link used by the product (or a staging link).
- After-hours window configured (e.g., 6pm–8am local).

KPI timing proof method (<60s)
For each test lead, record these timestamps:
T0 Lead Received: timestamp when our server receives the lead (from logs / webhook event time)
T1 SMS Queued/Sent: timestamp when SMS provider request is made OR message status shows “sent/queued”
T2 Delivered to Handset: timestamp from handset screenshot (optional; carrier latency may vary)
Pass rule: (T1 - T0) <= 60 seconds.
Evidence to capture: screenshot of handset for message + server log line / provider log showing send time.

Deterministic fallback qualification flow (no-LLM)
Trigger conditions: LLM timeout > 3s, error, empty response, or safety classifier flags.
Message 1 (immediate):
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out about {{service}}. Quick question—what’s your ZIP code?”
Branching:
- If ZIP valid (5 digits): ask Q2.
- Else: “What ZIP code are you in? (5 digits)” (max 2 attempts; then route to human).
Q2: “Is this for a new install, repair, or quote?” (accept synonyms)
Q3: “When would you like us to come out? Reply with: 1) ASAP 2) This week 3) Next week”
If user picks 1/2/3: send booking handoff.
Booking handoff message:
“Got it. Here’s the fastest way to lock a time: {{calendar_link}}. If you’d rather, reply with your preferred day/time and we’ll confirm.”
After-hours override:
If outside business hours: “Thanks— we’re currently closed. We’ll text you first thing at {{open_time}}. If urgent, reply URGENT.”
STOP/HELP override: Always supersedes qualification.

Fail-safe behavior matrix (expected)
1) Missing phone: Do not send SMS. Create CRM note: “Missing phone; cannot text.” Route to email notification if available.
2) Invalid phone (non-E.164 / too short): Do not send SMS. Log validation error + CRM note.
3) STOP: Immediately stop all messages; confirm: “You’re opted out. Reply START to re-subscribe.” Record opt-out in CRM.
4) HELP: “Help: Reply STOP to opt out. Msg&Data rates may apply. Support: agent_bob_replit+lead-copilot@agentmail.to”
5) After-hours: Do not spam; either schedule first message at open, or send a single after-hours acknowledgement (per configuration).
6) Concurrent leads (5 at once): All should get first SMS queued within 60s; no cross-talk between conversations.
7) Calendar link failure (HTTP 404/timeout): Send alternate: “Booking link is temporarily down—reply with your preferred day/time.” Create CRM alert note.
8) Webhook retries: Same lead_id retried should be idempotent (no duplicate SMS). Return 200 OK with “already processed” if applicable.
9) Duplicate leads (same phone within X minutes): Dedupe; either suppress or send “Just checking—did you still need help?” once.
10) CRM note formatting: Notes must be readable, structured, and include transcript + metadata.

Test cases (execute in this order)
A. Webhook JSON (10 tests)
A1 Valid lead
Payload:
{ "source":"webhook", "lead_id":"wh_001", "first_name":"Test", "last_name":"User", "phone":"+1XXXXXXXXXX", "service":"plumbing quote", "zip":"94107", "created_at":"{{now}}" }
Expected: SMS Message 1 sent in <60s; qualification proceeds.

A2 Missing phone
{ "source":"webhook", "lead_id":"wh_002", "first_name":"NoPhone", "phone":"", "service":"roof repair" }
Expected: no SMS; CRM note created; error logged.

A3 Invalid phone
{ "source":"webhook", "lead_id":"wh_003", "first_name":"BadPhone", "phone":"123", "service":"HVAC" }
Expected: no SMS; CRM note w/ validation failure.

A4 STOP compliance
Use valid lead (wh_004). After receiving first SMS, reply “STOP”.
Expected: immediate opt-out confirmation; no further questions; status stored.

A5 HELP compliance
Use valid lead (wh_005). Reply “HELP”.
Expected: help text with support email.

A6 After-hours
Submit lead during after-hours window (wh_006).
Expected: after-hours acknowledgement OR scheduled first send (per config). No repeated messages.

A7 Concurrency
Submit 5 leads within 10 seconds (wh_007a–wh_007e).
Expected: all first SMS queued <60s; no mixing of threads.

A8 Calendar link failure
Temporarily set calendar_link to invalid URL and submit lead (wh_008).
Expected: fallback booking instruction; CRM alert note.

A9 Webhook retry (idempotency)
POST wh_009 twice (same lead_id).
Expected: only one initial SMS; second request returns idempotent response; CRM shows single conversation.

A10 Duplicate lead by phone
Submit wh_010 then submit again with different lead_id but same phone within 2 minutes.
Expected: dedupe behavior (suppress or single gentle check-in), not two full sequences.

B. Jotform (5 tests)
Setup spec (create form):
- Fields: First name, Last name, Phone, Email, Service Needed (dropdown), ZIP, Preferred Time (optional)
- Hidden fields: source=jotform, lead_id (populate with submissionID if available), campaign/adset
- Validation: phone required for “text me” path; ZIP optional.
Test submissions:
B1 Normal
B2 Missing phone (leave blank)
B3 Invalid phone (letters)
B4 After-hours submission
B5 Duplicate submit (submit twice with same phone)
Expected: same as webhook; ensure mapping matches and does not drop phone/name.

C. HubSpot (5 tests)
Goal: verify contact creation/update + note formatting.
C1 New contact created from lead
Expected: contact exists with phone, source, and a note.
C2 Existing contact updated (same phone)
Expected: no duplicate contact; note appended.
C3 Opt-out recorded
After STOP test, confirm HubSpot property/flag and note.
C4 Note formatting (transcript)
Expected note template (verbatim structure):
Title: “Lead Copilot Transcript — {{date}}”
Body:
- Lead: {{first_name}} {{last_name}} | {{phone}} | {{email}}
- Source: {{source}} | Lead ID: {{lead_id}}
- Service: {{service}} | ZIP: {{zip}}
- Status: {{qualified/unqualified}} | Opt-out: {{yes/no}} | After-hours: {{yes/no}}
- Booking: {{booked link / requested time / failed link}}
- Transcript:
  1) System: …
  2) Lead: …
  3) System: …
C5 Special characters + multiline
Submit values with quotes/newlines; ensure note renders cleanly.

Results table (fill during execution)
For each test ID (A1…C5): record T0, T1, delta seconds, pass/fail, evidence link/screenshot filename, and notes.

Bug log template (fill during execution)
- Bug ID:
- Severity (P0 reputation/compliance, P1 KPI, P2 UX, P3 cosmetic):
- Source (Webhook/Jotform/HubSpot):
- Steps to reproduce:
- Expected:
- Actual:
- Evidence (screenshots/log lines):
- Suspected cause:
- Proposed fix (smallest change first):
- Retest status:

Operator checklist (quick)
1) Confirm after-hours config.
2) Confirm calendar_link.
3) Confirm dedupe window + idempotency logic.
4) Run A1–A10 capturing T0/T1.
5) Run B1–B5.
6) Run C1–C5 and verify note format.
7) Summarize KPI pass rate and list P0/P1 bugs first.
