# Local Lead Response Copilot — Pilot E2E Manual QA Operator Packet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:02:25.020Z

---

Purpose
Validate end-to-end lead capture → first SMS → qualification → booking/hand-off across 3 sources while protecting reputation during early pilots. This packet produces timestamped evidence that first response occurs in <60 seconds and confirms safe fallback behavior when the LLM or downstream systems fail.

Product references (for customer comms and legitimacy)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Contact email: agent_bob_replit+lead-copilot@agentmail.to

Lead sources in scope (minimum 3)
A) Generic Webhook JSON (simulate “any form/ad platform”) 
B) Jotform (real form tool; free tier) 
C) HubSpot (CRM; free developer/free CRM)

Definition of “first response <60s”
Start time (T0): Lead event received by our system (webhook received time OR form submission time if that is what is logged).
End time (T1): Timestamp of first outbound SMS sent (provider log) OR first outbound message recorded in system logs.
KPI: T1 − T0 <= 60 seconds for at least 19/20 trials (95%) per source during pilot.
Evidence required: capture T0 and T1 (screenshots/log lines) for each trial.

Operator prerequisites (no paid tools)
- A test phone able to receive SMS.
- Access to app logs or event timeline (whatever exists today).
- Access to SMS sending logs (provider console or app message log).
- A note-taking sheet (Google Sheet or CSV). Suggested columns below.

Results capture table (copy/paste columns)
TrialID | Source | Scenario | InputPhone | T0 (lead received) | T1 (first SMS sent) | DeltaSeconds | Pass/Fail | Transcript link/snippet | CRM Record Link | Notes/Bug ID

Section 1 — Test data and payloads

1A) Generic Webhook JSON payloads (POST to your inbound webhook URL)
Use Content-Type: application/json.

Happy path payload:
{
  "source": "webhook",
  "lead_id": "qa-webhook-001",
  "first_name": "Jamie",
  "last_name": "Lee",
  "phone": "+14155550101",
  "email": "jamie.lee@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "timestamp": "2026-04-09T12:00:00Z"
}

Missing phone:
{
  "source": "webhook",
  "lead_id": "qa-webhook-002",
  "first_name": "Taylor",
  "email": "taylor@example.com",
  "service": "Roof leak",
  "timestamp": "2026-04-09T12:01:00Z"
}

Invalid phone:
{
  "source": "webhook",
  "lead_id": "qa-webhook-003",
  "first_name": "Morgan",
  "phone": "12345",
  "service": "AC repair",
  "timestamp": "2026-04-09T12:02:00Z"
}

Duplicate lead (same lead_id replay): resend the happy path payload unchanged.
Webhook retry simulation: send the same payload 3 times (e.g., at +0s, +10s, +30s). Expected dedupe.

1B) Jotform field mapping (recommended minimal form)
Create a form with fields:
- Name (First/Last)
- Phone
- Email
- Service Needed (dropdown)
- Zip code
- Preferred time (optional)

Expected mapping into our system:
first_name <- Name.First
last_name <- Name.Last
phone <- Phone
email <- Email
service <- Service Needed
zip <- Zip code
source <- "jotform"
lead_id <- Jotform submissionID

Jotform scenario inputs:
- Valid: +1 (real test phone)
- Missing phone: submit blank phone field
- Invalid phone: “555”

1C) HubSpot (CRM + form / record creation)
Two acceptable ways to generate HubSpot leads:
Option 1: HubSpot Form submission (recommended)
- Create a HubSpot form with First name, Last name, Phone number, Email, Service.
- Submit form manually.
Option 2: Create contact in CRM (if that’s your integration trigger)
- Create a contact with Phone and lifecycle stage “lead”.

Expected CRM note formatting (what we verify)
When our system logs qualification, it should write a single consolidated note (or timeline event) that is readable by sales.
Expected note template (exact):
Title: Lead Response Copilot — Qualification Summary
Body:
- Lead Source: {source}
- Lead ID: {lead_id}
- Contact: {first_name} {last_name} ({phone}, {email})
- Service: {service}
- Timing: First SMS in {delta_seconds}s (T0 {T0_iso}, T1 {T1_iso})
- Answers:
  Q1: {q1_text}
  A1: {a1_text}
  Q2: {q2_text}
  A2: {a2_text}
  Q3: {q3_text}
  A3: {a3_text}
- Outcome: {Booked | Needs call back | Not qualified | Opted out}
- Booking: {calendar_link or "N/A"}

Pass criteria: note includes bullets above; no raw JSON; no PII beyond what’s needed; consistent prefix “Lead Response Copilot —”.

Section 2 — Deterministic fallback mode (LLM down / timeout safe behavior)
Trigger conditions (any of these):
- LLM API error, 5xx, timeout > 4 seconds
- LLM returns empty/unsafe output
- LLM confidence flag (if available) below threshold

Global rules:
- Use only the deterministic prompts below.
- Max 3 questions.
- If user gives unclear answer twice, escalate to human.
- Always include STOP/HELP compliance.

Deterministic SMS flow (exact copy)
SMS#1 (immediate, sent within 60s):
“Hi {first_name}, this is {BusinessName}. Thanks for reaching out about {service}. Quick questions so we can help fast. Reply STOP to opt out.”

Q1 (if service missing use generic):
“What’s the address or ZIP where you need service?”
If ZIP already known, ask:
“How soon do you need this handled? Reply 1) Today 2) This week 3) Flexible”

Q2:
“Is this for a home or business? Reply 1) Home 2) Business”

Q3:
“Best time for a call? Reply 1) Morning 2) Afternoon 3) Evening”

Escalation message (if calendar/LLM/booking fails or answers ambiguous):
“Got it — a specialist will text/call you shortly to confirm details. If urgent, reply URGENT.”

After-hours behavior (deterministic)
If outside business hours:
“Thanks {first_name}! We’re currently closed. We’ll follow up at {next_open_time}. If this is urgent, reply URGENT.”

STOP/HELP compliance assertions
- If inbound message contains “STOP” (any case): immediately cease messaging; send: “You’re opted out and will no longer receive messages. Reply START to resubscribe.”
- If inbound contains “HELP”: respond: “Help: This is {BusinessName} appointment/lead text line. Reply STOP to opt out. Contact: agent_bob_replit+lead-copilot@agentmail.to”

Section 3 — Required scenarios and pass/fail criteria

S1 Missing phone
Input: lead event without phone.
Expected: No SMS attempted. System marks lead as “Needs phone” and (if CRM enabled) writes a note: “Missing phone — cannot text.”
Fail: attempts SMS, crashes, or silently drops lead.

S2 Invalid phone
Input: phone too short/non-E.164.
Expected: validation error recorded; no SMS; CRM note created.
Fail: SMS attempted or unhandled exception.

S3 STOP and HELP
Input: after receiving SMS#1, reply STOP; separately reply HELP.
Expected: correct compliance messages and suppression on STOP.
Fail: further marketing/qualification texts after STOP.

S4 After-hours
Input: submit lead outside configured hours.
Expected: after-hours message and deferred follow-up marker.
Fail: tries to book immediately without notice, or no response.

S5 Multiple concurrent leads
Input: submit 5 leads within 30 seconds.
Expected: each gets unique conversation thread; no cross-talk; KPI holds.
Fail: mixed transcripts or delayed >60s due to queueing.

S6 Calendar link failures
Input: simulate booking link unreachable/returns error.
Expected: send escalation message; do not loop; create CRM note “Booking link failure.”
Fail: user sees broken link repeatedly or conversation stalls.

S7 Webhook retries
Input: resend same lead_id multiple times.
Expected: dedupe; at most one SMS thread; log “duplicate ignored.”
Fail: multiple SMS threads for same lead.

S8 Duplicate leads (same phone, different lead_id)
Expected: if within dedupe window (suggest 10 min), either merge or suppress second greeting and append note; no spam.
Fail: spams user with multiple greetings.

S9 CRM note formatting
Expected: note matches template; readable and consistent.
Fail: raw JSON dump, missing outcome, or missing timing.

Section 4 — Execution order (fast pilot run)
1) Run 3 happy-path trials per source; confirm timing capture method works.
2) Run STOP/HELP (one per source if possible).
3) Run missing/invalid phone (webhook + form).
4) Run concurrency and retries (webhook easiest).
5) Run calendar failure.
6) Verify HubSpot note formatting on at least 5 trials.

Section 5 — Bug log format (copy/paste)
BugID | Severity (P0-P3) | Scenario | Steps to Reproduce | Expected | Actual | Evidence | Likely Cause | Suggested Fix | Owner | Status
Severity guidance:
P0: Compliance breach (STOP not honored), spamming, wrong contact messaged.
P1: Response >60s or no response, booking broken without fallback.
P2: CRM note unreadable, dedupe imperfect.
P3: Cosmetic/wording.

Exit criteria for early pilots (minimum)
- No P0 bugs.
- >=95% of trials per source achieve <60s first SMS.
- Deterministic mode works for at least 5 forced-fallback trials (simulated LLM failure) without crashes.
- HubSpot notes readable and consistent on 10/10 checked.

Customer-facing reliability promise (optional text for agencies)
“We respond to new leads in under 60 seconds and keep the conversation safe even if AI services are degraded—qualification switches to a deterministic script and escalates to a human when needed. Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4n4nuiq6w8j.picard.replit.dev/sites/4  Contact: agent_bob_replit+lead-copilot@agentmail.to”
