# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + <60s KPI Evidence + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:33:36.997Z

---

## Purpose
Validate end-to-end reliability for early pilots (agency/customer onboarding) without automation. We must protect reputation by proving: (1) first-response time < 60 seconds, (2) safe behavior in edge cases, (3) deterministic fallback qualification works when LLM fails, and (4) clean CRM logging.

**Product/legitimacy link to share with pilot stakeholders:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
**Support contact for pilots:** agent_bob_replit+lead-copilot@agentmail.to

## Scope (3 lead sources)
1) **Generic Webhook JSON** (any lead form/ad platform that can POST JSON)
2) **Jotform** (real form tool; free tier)
3) **HubSpot CRM** (real CRM; free/dev environment)

## KPI & Evidence: <60s First Response
### Definition
**First response time** = time from lead submission accepted by our system (server receives webhook or form submission event) to first outbound SMS message *successfully queued/sent*.

### Evidence to capture (every test)
- Lead source (Webhook/Jotform/HubSpot)
- Lead identifier (email/phone or internal lead_id)
- Timestamps (UTC preferred):
  - T0: form submit or webhook send time
  - T1: our endpoint receives lead (server log timestamp)
  - T2: outbound SMS queued/sent (provider log timestamp)
- Computed: T2 - T1 (must be < 60s), and optionally T2 - T0
- Proof artifacts: screenshot of logs + SMS transcript (or provider event log export)

### Pass/Fail gates
- **PASS:** 95% of trials have T2-T1 < 60s and 100% < 120s.
- **FAIL:** Any scenario where no first response is sent when a valid phone exists, or STOP is ignored, or after-hours rules violated.

## Pre-flight checklist (15 minutes)
- Confirm environment variables/config: SMS sender number, webhook endpoint URL, calendar/booking link, after-hours schedule, dedupe window.
- Confirm deterministic fallback toggle exists OR simulated LLM failure mode can be triggered (timeout/force error).
- Ensure logging is on for inbound lead receipt + outbound message attempt.

## Test Data Set
Use consistent sample leads so results are comparable.
- Valid phone: +1 4155550101
- Invalid phone formats: "4155550101" (no country), "123", "+1(415)555-0101x99" (extension), "abcdef"
- Missing phone: null/""
- Duplicate lead: same phone + same source within 5 minutes
- Concurrency batch: 10 leads in 60 seconds with different phones

## Deterministic Fallback Qualification Flow (LLM-safe mode)
Trigger conditions: LLM timeout > 8s, LLM error/5xx, malformed prompt/response, or explicit "SAFE_MODE" flag.

### Message templates (exact copy)
1) **Initial speed-to-lead message (sent immediately upon valid lead):**
"Hi {{first_name}}, this is {{business_name}} — thanks for reaching out. Quick question so we can help fast: what service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other"

2) **If reply = 1/2/3/4 or free text:**
"Got it. What’s your ZIP code?"

3) **ZIP received:**
"Thanks. When do you want this handled? Reply 1) ASAP 2) This week 3) Just pricing"

4) **Timing received:**
"Perfect — what’s the best time for a quick call? Reply with a time window (e.g., ‘today 3–5pm’) or type BOOK for a link."

5) **If user types BOOK:**
"Here’s the booking link: {{calendar_link}}. If the link doesn’t work, reply CALL and we’ll schedule manually."

6) **If calendar link fails (detected) OR user says it failed:**
"Sorry about that — our booking link is having trouble. Reply with your preferred day/time and we’ll lock it in, or call us at {{business_phone}}."

7) **Escalation-to-human (if any ambiguity after 4 messages or user frustration):**
"Thanks — I’m looping in a human to confirm details. If urgent, call {{business_phone}}."

### Timeouts & retries
- If no reply after 3 minutes: send one nudge
  - "Just checking — what service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other"
- If no reply after 15 minutes: stop automation; mark as "No Response".

### STOP/HELP compliance
- Any inbound message containing "STOP", "UNSUBSCRIBE", "CANCEL": immediately cease messages and mark Do-Not-Contact.
  - Optional confirmation (depending on provider compliance defaults): "You’re opted out and will no longer receive texts. Reply START to resubscribe."
- Any inbound "HELP":
  - "Help: Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to or visit https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4"

## After-hours behavior
Define business hours per customer (example 8am–6pm local).
- If lead arrives after-hours:
  - Send immediate message:
    "Thanks for reaching out — we’re closed right now but will text you first thing in the morning. If this is urgent, reply URGENT."
  - If URGENT: escalate-to-human/on-call policy (customer-specific). If none exists, provide phone number.
- Ensure follow-up at next opening time with initial qualification message.

## End-to-End Test Matrix (minimum viable pilot run)
Run **at least 20 total trials** across the 3 sources.

### A) Generic Webhook JSON (8 trials)
1. Valid lead -> immediate SMS (<60s)
2. Missing phone -> no SMS; create internal alert/CRM note “No phone provided”
3. Invalid phone -> no SMS; error logged; CRM note formatted
4. Duplicate lead within dedupe window -> no second SMS; note “Duplicate suppressed”
5. Webhook retry (same payload resent) -> dedupe prevents double SMS
6. Calendar link failure -> fallback message + escalation path
7. LLM forced failure -> deterministic flow starts, completes through ZIP/timing
8. Concurrency: 5 leads in <30s -> each gets first SMS <60s; no cross-talk

**Sample webhook payload (copy/paste):**
{
  "source": "webhook_test",
  "lead_id": "test-{{uuid}}",
  "first_name": "Taylor",
  "last_name": "Ng",
  "phone": "+14155550101",
  "email": "taylor@example.com",
  "service": "Install",
  "notes": "QA test lead",
  "submitted_at": "{{iso_timestamp}}"
}

### B) Jotform (6 trials)
- Create a Jotform with fields: First Name, Last Name, Phone, Email, Service Needed (dropdown), Zip, Notes.
- Configure webhook/integration to POST to our inbound endpoint.
Tests:
1. Valid submit -> first SMS <60s
2. Missing phone -> handled safely
3. Invalid phone -> handled safely
4. After-hours submission -> after-hours message
5. Duplicate submission -> dedupe
6. LLM failure -> deterministic flow

### C) HubSpot CRM (6 trials)
Goal: ensure contact/deal notes formatting is readable, consistent, and appended rather than overwritten.
Tests:
1. New contact created in HubSpot triggers SMS <60s
2. Existing contact updates do not spam (dedupe by recent activity)
3. STOP response writes CRM note “Opted out via STOP”
4. HELP response writes CRM note
5. Calendar failure logs correct note
6. Transcript note formatting (line breaks, timestamps, message direction)

## CRM Note Formatting Spec (HubSpot)
Write a single engagement note per lead qualification session, appended with transcript.

**Header example:**
"[Lead Copilot] Session started: 2026-05-14 18:22:10Z\nSource: Jotform\nLead ID: test-123\nFirst response: 12s\nStatus: Qualified (Booking link sent)\n\nTranscript:\nOUT 18:22:22Z: Hi Taylor, this is Acme Plumbing…\nIN  18:22:40Z: 1\nOUT 18:22:41Z: Got it. What’s your ZIP code?\nIN  18:22:55Z: 94107\nOUT 18:22:56Z: Thanks. When do you want this handled?…"

Rules:
- Use \n for line breaks (avoid HTML unless HubSpot requires it).
- Always include direction (IN/OUT), timestamp, message body.
- If dedupe suppresses outreach, create note: "Duplicate lead suppressed (window: X minutes)."

## Results Capture Table (fill during pilot)
Columns:
- Trial # | Source | Scenario | Phone Valid? | T1 Received (log) | T2 First SMS (provider) | Delta (sec) | Outcome (Pass/Fail) | Evidence link/screenshot | Notes

## Bug/Fix Log (prioritized)
Fields:
- Bug ID | Severity (P0/P1/P2) | Scenario | Steps to reproduce | Expected | Actual | Suspected cause | Fix recommendation | Owner | Status

Severity rubric:
- **P0:** Compliance or revenue-killing (STOP ignored, messages sent without consent, no response to valid lead)
- **P1:** Material conversion hit (<60s breached frequently, dedupe broken, after-hours wrong)
- **P2:** Cosmetic/formatting (CRM note minor formatting, copy tweaks)

## Exit Criteria (what “done” looks like for pilots)
- 20+ trials completed across the 3 sources with stored evidence.
- Demonstrated <60s T2-T1 in at least 95% of trials; no trial exceeds 120s.
- STOP/HELP handled correctly 100% of times.
- Deterministic fallback successfully completes first 3 questions (service, ZIP, timing) when LLM is forced to fail.
- HubSpot notes readable and consistently formatted with transcript.
