# Local Lead Response Copilot — Manual E2E QA Runbook (3 Lead Sources) + KPI Evidence + Fail-safe Deterministic Mode

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:23:37.532Z

---

Business reference (use in any customer/pilot comms):
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Contact: agent_bob_replit+lead-copilot@agentmail.to

1) Scope & Goal
Goal: validate end-to-end lead capture → first SMS response within <60 seconds, qualification flow correctness, and fail-safe behaviors across 3 lead sources:
A) Generic inbound webhook (JSON)
B) Jotform (form tool)
C) HubSpot (CRM)
This is a manual pilot packet (no automation) for early agency/customer onboarding.

2) Environments / Free-tier setup
- Jotform: create a free form “Lead Copilot Test Form”.
- HubSpot: create a free developer/test account, one contact pipeline (or just contacts + notes).
- Generic webhook sender: use curl/Postman/Insomnia (free).
- SMS logs: use the product’s internal logs + provider logs (Twilio/etc.) if accessible.

3) KPI Definition & Evidence (must collect)
KPI: First outbound SMS must be initiated within 60 seconds of lead receipt.
Record these timestamps for every trial:
T0 = lead source submission time (Jotform submission timestamp / webhook sent time / HubSpot create time)
T1 = webhook received by Copilot (server log timestamp)
T2 = SMS sent (provider log timestamp)
Metric: T2 - T0 (primary), plus T2 - T1 (diagnostic).
Evidence to store: screenshot or exported logs for at least 20 total trials across all 3 sources.
Pass/Fail: Pass if 95%+ of trials have T2-T0 < 60s, and no single trial exceeds 120s without a documented incident cause.

4) Standard Field Map (Normalization)
Required normalized fields:
- first_name
- last_name (optional)
- phone (E.164 expected)
- email (optional)
- service (job type)
- zip (optional)
- source (webhook/jotform/hubspot)
- consent (boolean or proof text if captured)

Jotform field recommendations:
- Name (First/Last)
- Phone (must capture country; Jotform phone widget)
- Email
- “What do you need help with?” (dropdown)
- “When do you want service?” (dropdown: ASAP / This week / Just pricing)
- Consent checkbox: “I agree to receive texts about my request. Reply STOP to opt out.”

5) Deterministic Fail-safe Qualification Mode (LLM down/timeout)
Trigger conditions:
- LLM API error OR timeout > 3s (configurable) OR model returns empty/invalid output.
Behavior: switch to deterministic script; do not block first response.

Deterministic Script (copy/paste exact messages)
SMS #1 (immediate):
“Hi {first_name}, it’s {business_name}. Got your request for {service}. Quick question so we can help fast—what’s the address or ZIP for the job?”

If ZIP/address provided → SMS #2:
“Thanks. Are you looking for (1) ASAP today/tomorrow, (2) this week, or (3) just a quote?”

If urgency answer provided → SMS #3:
“Great—what’s the best time for a quick call? Reply with a time window (e.g., ‘2–4pm’). If you prefer, here’s the booking link: {calendar_link}”

If calendar link failure detected (HTTP non-200 or missing config) → alternate SMS #3:
“Great—what’s the best time for a quick call? Reply with a time window (e.g., ‘2–4pm’) and we’ll confirm.”

Escalation to human (when):
- No response after 2 prompts OR user asks complex question OR user replies with anger/complaint.
Escalation message:
“Thanks—looping in a specialist to help. You can also email us at agent_bob_replit+lead-copilot@agentmail.to.”

STOP/HELP compliance (always deterministic)
- If inbound contains STOP: send “You’re opted out and won’t receive more texts. Reply START to resubscribe.” and set contact to DNC immediately.
- If inbound contains HELP: send “Help: Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to.”

6) Test Cases (execute across sources)
Run each scenario at least once per lead source where applicable.

A. Missing phone
Input: lead without phone.
Expected: No SMS sent. System creates a task/alert + logs “missing phone” + (optional) email to agent_bob_replit+lead-copilot@agentmail.to. CRM note created if CRM source.

B. Invalid phone
Input: “12345”, “(555) 555-5555” without country if E.164 required.
Expected: Phone validation fails; no SMS; log reason; request corrected phone via email if available.

C. STOP / HELP keywords
Input: user replies STOP or HELP.
Expected: immediate compliant response; DNC persisted; no further messages after STOP.

D. After-hours behavior
Config: business hours (e.g., 8am–6pm local).
Input: lead arrives outside hours.
Expected: immediate acknowledgement SMS + set expectation (“We’ll text/call you at 8am”). Optional: still ask 1 qualifying question. No calendar booking if staff unavailable (config dependent).

E. Multiple concurrent leads
Input: submit 5 leads within 30 seconds.
Expected: all receive first SMS <60s; no cross-contamination of variables (name/service); logs show distinct conversation IDs.

F. Calendar link failure
Input: remove/invalid calendar URL.
Expected: fallback message asks for time window; no broken link sent; error logged.

G. Webhook retries
Input: send same webhook with same idempotency key 3 times.
Expected: only one conversation created; subsequent retries return 200/202 with “duplicate ignored”.

H. Duplicate leads (same phone within 24h)
Input: same phone submits twice.
Expected: either (a) append to existing thread with “Looks like you reached out earlier…” or (b) create new thread but dedupe CRM notes. Must not spam (rate limit: max 1 new intro per X minutes).

I. CRM note formatting (HubSpot)
Expected note template (single note per lead, appended updates allowed):
Title: “Lead Copilot Intake — {service}”
Body:
- Source: {source}
- Lead name: {first_name} {last_name}
- Phone: {phone}
- Email: {email}
- Submitted: {ISO timestamp}
- First SMS sent: {ISO timestamp} (T2)
- Qualification answers:
  - ZIP/address: …
  - Urgency: …
  - Preferred time: …
- Status: {Qualified / Needs follow-up / Opted-out}
Formatting: plain text with bullets; no broken JSON; keep under HubSpot limits.

7) Source-specific execution steps

Source 1: Generic Webhook JSON
Use curl (edit URL to your inbound endpoint):
curl -X POST https://{YOUR_ENDPOINT}/lead \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: qa-001' \
  -d '{
    "source":"webhook",
    "first_name":"Test",
    "last_name":"One",
    "phone":"+15555550101",
    "email":"test1@example.com",
    "service":"HVAC repair",
    "zip":"78701",
    "consent":true,
    "submitted_at":"2026-05-14T12:00:00Z"
  }'
Repeat with changed idempotency key for new leads; reuse same key to test retries.

Source 2: Jotform
- Create form with the recommended fields.
- Configure webhook integration to Copilot endpoint.
- Submit the form on mobile (to simulate real users) and record the Jotform submission time.

Source 3: HubSpot
Two acceptable patterns:
- (A) HubSpot form submission → webhook to Copilot; or
- (B) New contact created in HubSpot triggers workflow/webhook → Copilot.
Record HubSpot create timestamp (T0) and ensure CRM note is written back per template.

8) Results Capture Tables (paste into a doc/sheet)
Trial log (minimum 20 rows):
- Trial ID
- Source (webhook/jotform/hubspot)
- Scenario (normal/missing phone/STOP/etc.)
- T0 lead submitted
- T1 received
- T2 SMS sent
- T2-T0 (sec)
- Pass/Fail
- Evidence link (screenshot/log URL)
- Notes

Bug log format:
- Bug ID
- Severity (S1 compliance / S2 revenue / S3 annoyance)
- Scenario
- Steps to reproduce
- Expected
- Actual
- Impact (churn/reputation)
- Suggested fix
- Owner
- Status

9) Known high-risk bugs to watch (pre-filled fix list)
- Phone normalization: enforce E.164; reject obviously invalid; auto-prepend country only if explicitly configured.
- STOP compliance: ensure global across conversations; do-not-contact persists across duplicates.
- Dedupe/idempotency: require stable lead_id or idempotency key; hash of (source+phone+submitted_at minute).
- Concurrency: isolate session state by conversation ID; avoid shared globals.
- After-hours: timezone correctness; don’t schedule during closed hours.
- Calendar outage: never send broken links; degrade to “reply with time window”.
- HubSpot notes: sanitize newlines; avoid markdown that renders poorly; ensure one canonical note updated.

10) Definition of Done for this QA packet
- 20+ trials executed with stored evidence.
- KPI met (95% <60s, none >120s without incident report).
- STOP/HELP verified with transcript evidence.
- Deterministic mode tested by forcing LLM failure and confirming qualification continues.
- Bug list prioritized with fixes assigned.
