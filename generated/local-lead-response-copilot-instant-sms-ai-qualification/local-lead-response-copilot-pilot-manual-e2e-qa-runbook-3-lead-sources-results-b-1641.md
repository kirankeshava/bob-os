# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results + Bugs + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:11:12.034Z

---

## Purpose
Validate that Local Lead Response Copilot reliably sends the first SMS within **<60 seconds** of lead creation across 3 lead sources, and behaves safely when inputs are missing/invalid or when downstream services (LLM, calendar link, CRM) fail. This is **manual** (pre-revenue) and designed to run in <60 minutes during a pilot onboarding.

## Systems/Lead Sources Covered (Minimum 3)
1) **Generic Webhook JSON** (any ad/form tool that can POST JSON)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (create/update contact + add note/activity)

## KPI & Evidence Standard
**KPI:** first outbound SMS to lead occurs within **60 seconds** of lead submission.

### Evidence to capture for each trial
Record these timestamps (ISO or local time with timezone):
- T0 = Lead submitted (form submit time / webhook received time)
- T1 = System accepted lead (server log / webhook intake log)
- T2 = First SMS created (provider log / internal message log)
- T3 = First SMS delivered (if available)

**Pass criterion:** (T2 - T0) ≤ 60 seconds. If only T1/T2 available, use (T2 - T1) ≤ 60 seconds and mark “T0 not available” (still acceptable in pilot if consistent).

### Results table (copy/paste)
| Trial # | Source | Scenario | Phone | T0 | T1 | T2 | Delta (T2-T0) | Pass/Fail | Notes/Evidence link |
|---|---|---|---|---|---|---|---|---|---|

Store evidence as screenshots/links to logs in one shared folder (pilot-specific).

## Pre-flight Setup (15 minutes)
- Confirm the customer-facing legitimacy link is ready to share if needed: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Confirm support contact email for pilots: agent_bob_replit+lead-copilot@agentmail.to
- Ensure there is an SMS sending number connected (pilot environment). (No spend steps in this runbook.)
- Prepare 3 test phone numbers:
  - Valid mobile that can receive SMS
  - Invalid phone string (e.g., “12345”)
  - Valid phone that will send STOP/HELP

## Canonical Lead Data Model (what we expect the intake layer to normalize)
- first_name
- last_name
- phone (E.164 preferred)
- email (optional)
- service_requested (optional)
- zip_or_city (optional)
- lead_source (webhook/jotform/hubspot)
- campaign/adset (optional)
- created_at

## Test Payloads / Source-Specific Steps

### A) Generic Webhook JSON (5 trials)
Use any webhook sender (curl/Postman). Send to the product’s intake endpoint.

**Payload A1 (valid):**
{
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550101",
  "email": "testlead@example.com",
  "service_requested": "Water heater repair",
  "zip_or_city": "94107",
  "lead_source": "webhook",
  "campaign": "FB-Prospecting-1"
}

**Payload A2 (missing phone):**
{
  "first_name": "NoPhone",
  "last_name": "Lead",
  "email": "nophone@example.com",
  "service_requested": "AC tune-up",
  "lead_source": "webhook"
}

**Payload A3 (invalid phone):**
{
  "first_name": "BadPhone",
  "last_name": "Lead",
  "phone": "12345",
  "email": "badphone@example.com",
  "service_requested": "Drain cleaning",
  "lead_source": "webhook"
}

**Payload A4 (duplicate lead same phone within 2 minutes):**
Send A1 twice within 120 seconds.

**Payload A5 (retry simulation):**
Send identical payload with header X-Request-Id fixed (e.g., same UUID) twice.

**Expected behaviors (Generic Webhook):**
- Valid payload: first SMS queued within 60s.
- Missing phone: do **not** attempt SMS; create an internal “Needs phone” task/note; optionally send an email to agent_bob_replit+lead-copilot@agentmail.to (if configured).
- Invalid phone: reject/flag; no SMS attempt; log validation error.
- Duplicate: dedupe rule should prevent double texting (see Dedupe below).
- Retry: idempotency should prevent duplicate SMS and duplicate CRM notes.


### B) Jotform (5 trials)
Create a free Jotform with fields:
- Name
- Phone
- Email
- Service Needed (dropdown)
- City/Zip

Configure Jotform to POST to the intake endpoint (webhook integration).

**Field mapping expectations:**
- Jotform phone must map to canonical phone.
- Service dropdown maps to service_requested.

**Test cases:**
1) Normal submit valid phone
2) Missing phone (if form allows) OR submit with blank
3) Invalid phone (enter short string)
4) After-hours submit (simulate by temporarily setting business hours closed)
5) Concurrency: submit 3 leads within 60 seconds

**Expected behaviors (Jotform):**
- Same as webhook behaviors; additionally, ensure the intake parser correctly extracts phone/name.


### C) HubSpot CRM (5 trials)
Goal: ensure notes/activity formatting is clean and useful for local operators.

**HubSpot actions to validate:**
- Create/Update contact by phone/email
- Add a Note/Engagement with qualification transcript

**Expected note format (exact template):**
Title: Lead Copilot Qualification — {Service Requested} — {Status}
Body:
- Lead Source: {lead_source}
- Submitted: {T0}
- First SMS Sent: {T2} (Δ {seconds}s)
- Name: {first_name} {last_name}
- Phone: {phone}
- Email: {email}
- Requested: {service_requested}
- Location: {zip_or_city}
- Outcome: {Booked / Needs Follow-up / Opted-out / Invalid Phone / After-hours}
- Transcript:
  Q1: …
  A1: …
  Q2: …
  A2: …
- Booking Link Used: {url or “N/A”}

**Test cases:**
1) New lead creates new contact + note
2) Existing contact (same phone) updates and appends new note (no duplicate contacts)
3) STOP opt-out results in note “Opted-out” and stops automation
4) Calendar link failure results in note “Booking link failed” and human escalation
5) Duplicate lead should not create duplicate notes if idempotency key matches


## High-Risk Scenario Tests (Must Pass)

### 1) STOP / HELP compliance
- When lead replies “STOP”: system must confirm opt-out (provider-dependent) and set internal flag “Do Not Text”. No further messages except required compliance acknowledgments.
- When lead replies “HELP”: send a single help message: who you are + how to contact + how to stop.

**Pass criteria:** no further qualification questions after STOP; HELP response contains business identification and agent_bob_replit+lead-copilot@agentmail.to.

### 2) After-hours handling
Define “after-hours” window (customer-configured). If lead arrives after-hours:
- Send immediate first SMS acknowledging receipt and setting expectation: “We’ll follow up at {open_time}.”
- Optionally ask 1 low-friction question (service + urgency) but do not attempt booking until open.

**Pass criteria:** still meets <60s; no booking spam late night.

### 3) Calendar link failure
If booking link is unreachable/returns error:
- Switch to fallback: collect 2 preferred time windows + send “We’ll confirm shortly.”
- Create CRM note “Booking link failed” and tag human follow-up.

### 4) Multiple concurrent leads
Submit 3+ leads within 60 seconds.
**Pass criteria:** all first SMS messages are sent within 60s; no cross-talk (answers from lead A do not affect lead B).

### 5) Webhook retries / idempotency
If same request id or same payload is delivered multiple times:
**Pass criteria:** only one conversation/SMS sequence created; only one CRM note per unique lead event.

### 6) Duplicate leads (same phone)
Dedupe rule recommendation for pilots:
- If same phone + same service_requested within 10 minutes: treat as duplicate, do not restart full flow; send a single message: “Got it—still working on this. Want to add anything?”
- If same phone but different service_requested: start new thread but reference prior.


## Deterministic Fallback Qualification Flow (LLM down/timeout safe mode)
Trigger fallback when:
- LLM returns error, times out > 5s, or confidence below threshold
- Any downstream dependency is unavailable

**Message 1 (immediate, always within 60s):**
“Hi {first_name}, this is {BusinessName}. Thanks for reaching out—can I ask 2 quick questions to get you scheduled?”

**Q1 (service/intent):**
“What service do you need? Reply with 1) Repair 2) Install 3) Estimate 4) Other”
- If “Other”: ask “Briefly describe what you need.”

**Q2 (timing):**
“When do you want us to come out? Reply 1) ASAP 2) This week 3) Just researching”

**Branching:**
- If ASAP: “Got it. What’s your address or zip code?” then “Best time today: morning/afternoon/evening?”
- If This week: “What day works best?” then “Morning/afternoon?”
- If researching: “No problem—want an estimate range or to book a quick call?”

**Booking attempt:**
- If calendar link available: send link + instructions.
- If not available: collect two time windows and escalate.

**Escalation-to-human:**
If any of these occur: missing phone (cannot text), repeated non-answers (3 tries), profanity, or booking failure.
Create CRM note and email alert (if configured) to agent_bob_replit+lead-copilot@agentmail.to with transcript.

**Timeout rules:**
- If no reply after 5 minutes: send one gentle reminder.
- If no reply after 60 minutes: stop automation; log “No response.”


## Bug Log Template (copy/paste)
| ID | Date | Source | Severity (P0-P3) | Scenario | Steps to Reproduce | Expected | Actual | Evidence | Suggested Fix | Owner |
|---|---|---|---|---|---|---|---|---|---|---|

Severity guide:
- P0: compliance risk (STOP not honored), wrong-recipient texting, data leak
- P1: KPI breach (>60s) or duplicate spam texts
- P2: CRM note messy/unusable, booking failures not handled
- P3: cosmetic copy issues

## Pilot Execution Checklist (quick)
1) Run 5 webhook trials (including retry + duplicate)
2) Run 5 Jotform trials (including concurrency + after-hours)
3) Run 5 HubSpot verification trials (note formatting + existing contact)
4) Run STOP + HELP on a real device
5) Confirm at least 15/15 first responses meet <60s; if any fail, file P1 bug and retest after fix

## “Verified <60s” Sign-off Criteria (what we can claim)
We can claim “<60s first response” for pilots when:
- At least 20 total trials across the 3 sources are recorded
- 95%+ of trials show (T2 - T0) ≤ 60s (or documented exception outside our control)
- Any failure has a documented root cause + mitigation plan

Contact for pilot support: agent_bob_replit+lead-copilot@agentmail.to. Legitimacy link for agencies/customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
