# Local Lead Response Copilot — Pilot Manual E2E QA Execution Pack (3 Lead Sources + <60s KPI + Fail-safe Behaviors)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:28:58.105Z

---

## Purpose
Run fast, manual end-to-end checks during early pilots (no automation) to protect reputation: prove speed-to-lead (<60s to first SMS), ensure compliance (STOP/HELP), and prevent embarrassing failures when the LLM or downstream systems fail.

## Scope: 3 Lead Sources (minimum)
1) **Generic Webhook JSON** (any ad platform/form tool) – POST to our intake endpoint.
2) **Jotform** (real form tool) – form submit triggers webhook to our intake endpoint.
3) **HubSpot CRM** – lead created/updated triggers qualification and a **well-formatted note** is written back.

## KPI to Verify: <60 seconds first response
### Timing definition
- **T0 (Start):** moment lead is submitted (form submit click) OR moment the webhook request is sent (timestamp from Postman/curl) OR HubSpot record creation time.
- **T1 (End):** first outbound SMS sent timestamp (from SMS provider logs) OR the first message event in our internal logs.
- **Pass:** T1 − T0 < 60s for at least **p50 and p95** across a minimum of **20 trials**.

### Evidence to save for each trial
- Screenshot or exported log line showing **T0** (Postman console timestamp / Jotform submission timestamp / HubSpot create time).
- Screenshot/export showing **T1** (SMS send timestamp + message body).
- The lead identifier (phone/email) and the source label.

### Manual p50/p95 method (no spreadsheet required)
- Write all 20 elapsed seconds in a list, sort ascending.
- p50 = 10th value (for 20). p95 ≈ 19th value.

## Fail-safe principles (must always hold)
1) **Never send to missing/invalid phone.** Log it and fall back to email/CRM note.
2) **STOP immediately stops messaging** and records opt-out.
3) **HELP replies with a clear help message** (who we are + how to stop).
4) **LLM failure does not stop qualification.** Use deterministic scripted flow below.
5) **After-hours**: acknowledge and schedule; do not promise immediate call.
6) **Dedupe/retries**: do not spam—idempotency keys or dedupe window.

---
# A) Generic Webhook JSON — Test Payloads (Ready to Send)
Assume intake endpoint:
- `POST https://<YOUR-ENDPOINT>/webhook/lead`
Headers:
- `Content-Type: application/json`

### Payload 1 — Valid lead (baseline)
```json
{
  "source": "webhook",
  "lead_id": "wh_001",
  "first_name": "Alex",
  "last_name": "Rivera",
  "phone": "+14155550101",
  "email": "alex@example.com",
  "service": "Water heater replacement",
  "zip": "94110",
  "submitted_at": "2026-05-14T15:00:00Z"
}
```
**Expected:** First SMS within 60s. Starts qualification (LLM or deterministic). CRM note created if connected.

### Payload 2 — Missing phone
```json
{
  "source": "webhook",
  "lead_id": "wh_002",
  "first_name": "Jamie",
  "email": "jamie@example.com",
  "service": "Roof leak repair",
  "submitted_at": "2026-05-14T15:01:00Z"
}
```
**Expected:** No SMS attempt. Create CRM note: “Missing phone; cannot text.” If email follow-up exists, send email.

### Payload 3 — Invalid phone (too short)
```json
{
  "source": "webhook",
  "lead_id": "wh_003",
  "first_name": "Taylor",
  "phone": "55501",
  "service": "AC tune-up",
  "submitted_at": "2026-05-14T15:02:00Z"
}
```
**Expected:** Validation fail; no SMS; log reason; CRM note indicates invalid.

### Payload 4 — Invalid phone (non-numeric)
```json
{
  "source": "webhook",
  "lead_id": "wh_004",
  "first_name": "Morgan",
  "phone": "CALLMEPLZ",
  "service": "Garage door repair",
  "submitted_at": "2026-05-14T15:03:00Z"
}
```
**Expected:** Same as above.

### Payload 5 — Duplicate lead same lead_id (dedupe)
Send Payload 1 again within 2 minutes.
**Expected:** Second attempt is ignored or merged; no second “intro” SMS. Log: deduped by `lead_id`.

### Payload 6 — Duplicate lead different lead_id but same phone within window
```json
{
  "source": "webhook",
  "lead_id": "wh_006",
  "first_name": "Alex",
  "phone": "+14155550101",
  "service": "Water heater replacement",
  "submitted_at": "2026-05-14T15:00:30Z"
}
```
**Expected:** Deduped by phone+time window; do not spam.

### Payload 7 — Webhook retry with idempotency key
```json
{
  "source": "webhook",
  "lead_id": "wh_007",
  "idempotency_key": "idem-abc-123",
  "first_name": "Casey",
  "phone": "+14155550102",
  "service": "Drain cleaning",
  "submitted_at": "2026-05-14T15:05:00Z"
}
```
Send it twice (simulate retry).
**Expected:** Only one SMS thread starts. Log indicates idempotent handling.

### Payload 8 — After-hours lead
```json
{
  "source": "webhook",
  "lead_id": "wh_008",
  "first_name": "Riley",
  "phone": "+14155550103",
  "service": "Emergency plumber",
  "submitted_at": "2026-05-14T03:30:00Z"
}
```
**Expected:** After-hours message template + option to book or request callback next business day.

### Payload 9-11 — Concurrency burst (3 leads in <10s)
```json
{ "source":"webhook","lead_id":"wh_009","first_name":"Sam","phone":"+14155550104","service":"Fence repair","submitted_at":"2026-05-14T15:06:00Z" }
```
```json
{ "source":"webhook","lead_id":"wh_010","first_name":"Pat","phone":"+14155550105","service":"House cleaning","submitted_at":"2026-05-14T15:06:03Z" }
```
```json
{ "source":"webhook","lead_id":"wh_011","first_name":"Quinn","phone":"+14155550106","service":"Tree removal","submitted_at":"2026-05-14T15:06:06Z" }
```
**Expected:** All receive first SMS within 60s; no cross-talk between threads; correct personalization.

### Payload 12 — Calendar link failure simulation flag
```json
{
  "source": "webhook",
  "lead_id": "wh_012",
  "first_name": "Jordan",
  "phone": "+14155550107",
  "service": "Kitchen remodel estimate",
  "simulate": { "calendar_down": true },
  "submitted_at": "2026-05-14T15:07:00Z"
}
```
**Expected:** System offers alternative: “Reply with 2 times that work” and alerts human.

---
# B) STOP/HELP Compliance Tests (SMS inbound)
Run with a test handset.
1) Lead receives first outbound message.
2) Reply **STOP**.
   - **Expected:** Immediate confirmation message (or silent opt-out depending on provider), no further messages, opt-out stored.
3) Reply **HELP** from a non-opted-out number.
   - **Expected HELP response (example):**
     “You’re chatting with Local Lead Response Copilot on behalf of <Business Name>. Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

---
# C) Deterministic Fallback Qualification Flow (LLM down / timeout)
## Trigger conditions
- LLM API error, timeout > 8s, malformed output, or confidence below threshold.

## Deterministic script (copy/paste)
**SMS 1 (immediate):**
“Hi {first_name}, it’s the scheduling assistant for {business}. Quick questions so we can help fast. What’s the service you need? (Reply 1: Repair, 2: Install, 3: Estimate, 4: Other)”

**If 1/2/3/4 received:**
**SMS 2:** “Thanks. What’s your ZIP code?”

**On ZIP received (5 digits) else:**
- If invalid ZIP twice: “No worries—what city are you in?”

**SMS 3:** “When do you want this done? (Reply 1: Today, 2: This week, 3: Next week, 4: Just pricing)”

**SMS 4:**
- If calendar is available: “Got it. Here’s the fastest way to pick a time: {calendar_link}. If you prefer, reply with 2 times that work.”
- If calendar fails/down: “Our booking link is temporarily down. Reply with 2 times that work for you and we’ll confirm ASAP.”

## Stop conditions / escalation
- If user requests human (“call me”, “agent”, profanity, medical/legal): create urgent task + notify human.
- If no response after 2 messages: send one final nudge 15 minutes later: “Checking back—want to book a quick call or appointment? Reply 1 for a call, 2 for an appointment, or STOP to opt out.”

---
# D) HubSpot CRM Note Formatting Spec (What to Verify)
When a lead is created/updated in HubSpot, create a note on the contact (or deal) with consistent formatting.

## Required fields in order
1) Source + lead_id
2) Timestamp (UTC) + response time (seconds)
3) Contact info (phone, email)
4) Service requested + location
5) Qualification answers (scripted)
6) Next step + booking link status
7) Compliance flags (STOP status)

## Example note body
**Title:** Lead Copilot Qualification — New Lead

**Body:**
Source: Jotform | lead_id: jf_10492
Received (UTC): 2026-05-14T15:00:00Z
First SMS sent (UTC): 2026-05-14T15:00:22Z (22s)

Contact:
- Name: Alex Rivera
- Phone: +14155550101
- Email: alex@example.com

Need:
- Service: Water heater replacement
- ZIP: 94110
- Timing: This week

Conversation summary:
- Q1 Service type: Install
- Q2 ZIP: 94110
- Q3 Timing: This week
- Booking: Calendar link sent (OK)

Next step:
- Awaiting booked slot OR customer provided times

Compliance:
- STOP: No

**Verification:** Ensure line breaks preserved, no JSON blobs, and phone is normalized to E.164.

---
# E) Pilot Coordination Email Template (Customer-facing)
Subject: 30-min pilot QA check (speed-to-lead + STOP/HELP + fallback) for your lead source

Hi {Name},

I’m Bob from Local Lead Response Copilot. To make sure your first pilot is rock-solid, I’d like to run a quick 30-minute end-to-end check that verifies:
- First SMS goes out in under 60 seconds
- STOP/HELP compliance works correctly
- Safe fallback questions run even if the AI model fails
- CRM notes are clean and readable

To confirm we’re legit, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

What I need from you (any one is enough to start):
1) A test form submission link (Jotform/Typeform/etc.), or
2) Your CRM sandbox access (HubSpot test portal), or
3) A sample webhook payload you can send.

Reply with a time window today/tomorrow, and we’ll run the check live. If you prefer async, send the test link and I’ll return a short results note with timestamps.

Thanks,
Bob Smith
agent_bob_replit+lead-copilot@agentmail.to

---
# F) Results Table (to fill during execution)
For each trial record:
- Trial #
- Source (Webhook/Jotform/HubSpot)
- Lead ID
- Phone
- T0
- T1
- Elapsed seconds
- Pass/Fail (<60s)
- Notes (dedupe, after-hours, calendar down, STOP/HELP)

---
# G) Bug/Fix Log (minimum fields)
- Bug ID
- Severity (P0 compliance/spam, P1 conversion risk, P2 cosmetic)
- Scenario (e.g., invalid phone)
- Steps to reproduce
- Expected
- Actual
- Evidence (screenshots/log lines)
- Suggested fix
- Owner + status
