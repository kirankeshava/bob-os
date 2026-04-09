# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Fallback Flow

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:13:15.574Z

---

# Local Lead Response Copilot — Manual Pilot E2E QA Runbook

Business proof URL (share with testers/customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

Support/contact (use in HELP and escalation copy): agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal + Success Criteria
**Goal:** Validate that new leads from 3 sources receive an initial SMS in **<60 seconds**, are qualified safely, and are handled correctly in edge cases.

**Lead sources under test (3):**
1) Generic Webhook JSON (direct POST)
2) Jotform (real form tool)
3) HubSpot (CRM)

**Must-pass criteria:**
- First outbound SMS attempt occurs within **60s** of lead receipt timestamp.
- STOP/HELP compliant.
- If LLM fails/timeout → deterministic fallback question flow starts within 60s.
- After-hours behavior is correct (no unwanted calls; safe message + next steps).
- Dedupe prevents double-texting on retries/duplicate submissions.
- Calendar/booking failure falls back to manual scheduling path.
- HubSpot notes are clean, consistent, and agency-reporting friendly.

## 1) Pre-flight Setup Checklist (15 minutes)
1. **Phone/test devices:**
   - Use at least 2 test phone numbers (A and B). Ensure they can receive SMS.
   - Have one device ready to send “STOP” and “HELP”.
2. **Timekeeping:**
   - Use a stopwatch (phone timer) + record timestamps in a Results table.
   - If product logs exist, capture: `lead_received_at`, `sms_queued_at/sent_at`, and if available `carrier_delivered_at`.
3. **Environment toggles to confirm before testing:**
   - After-hours window (e.g., 6pm–8am local) configured.
   - LLM timeout threshold known (e.g., 10–15s) and fallback enabled.
   - Dedupe key configured (phone + source lead_id/email) and dedupe window (e.g., 24h).
   - Webhook retry behavior known (idempotency key or event_id).

## 2) Deterministic Fallback Qualification Flow (No-LLM)
Trigger conditions: LLM error/timeout, empty response, policy block, or upstream outage.

**Fallback SMS #1 (sent immediately):**
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out — quick question so we can help: What service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other.”

**Branching:**
- If reply 1/2/3/4 received:
  - SMS #2: “Got it. What’s your ZIP code?”
- If ZIP received:
  - SMS #3: “When do you need this? Reply 1) ASAP 2) This week 3) Just researching”
- If timeframe received:
  - SMS #4 (booking handoff):
    - If calendar link healthy: “Perfect — book a time here: {{calendar_link}}. If you’d rather text, reply with 2 time windows that work.”
    - If calendar link unhealthy: “Our booking link is temporarily down. Reply with 2 time windows that work (e.g., ‘tomorrow 2–4’), and we’ll confirm.”

**STOP/HELP overrides (apply at any step):**
- If inbound message contains “STOP”/“UNSUBSCRIBE”:
  - Reply once: “You’re opted out and won’t receive further messages.”
  - Set contact opt-out flag; do not send further messages.
- If inbound message contains “HELP”:
  - Reply: “Support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

**After-hours behavior (override):**
If after-hours, first message becomes:
“Hi {{first_name}} — thanks for reaching out to {{business_name}}. We’re closed right now, but we’ll text you first thing when we open. If urgent, reply ‘URGENT’.”
- If URGENT: notify internal channel and/or send a single additional message: “We’ll do our best to respond ASAP. What’s the issue + address/ZIP?”

## 3) HubSpot CRM Note Formatting (Strict Template)
For every lead conversation, create/append a single note using this format:

**Title:** Lead Copilot Transcript — {{source}} — {{YYYY-MM-DD HH:MM TZ}}

**Body:**
- Lead Source: {{Webhook|Jotform|HubSpot}}
- Lead ID / Event ID: {{id}}
- Name: {{first}} {{last}}
- Phone: {{E.164}} (Valid: {{yes/no}})
- Email: {{email or blank}}
- Received At: {{timestamp}}
- First SMS Sent At: {{timestamp}}
- First Response Latency: {{N}} seconds
- Status: {{Qualified|Unqualified|OptedOut|AfterHoursPending|BookingLinkDown|NeedsHuman}}
- Qualification Summary:
  - Service: {{value}}
  - ZIP/Area: {{value}}
  - Timeframe: {{value}}
- Booking:
  - Calendar Link: {{url}} (Success: {{yes/no}})
  - Appointment Time: {{time or blank}}
- Compliance:
  - STOP Flag: {{yes/no}}
  - HELP Requested: {{yes/no}}

**Transcript:**
- Outbound 1: “…”
- Inbound 1: “…”
- Outbound 2: “…”
…

## 4) Results Table (Fill During Execution)
Record at least **20 total leads** across sources and edge cases.

Columns:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (Normal/MissingPhone/InvalidPhone/STOP/HELP/AfterHours/Duplicate/Retry/Concurrency/CalendarFail)
- Lead Submitted At (hand timestamp)
- Lead Received At (system/log timestamp if available)
- First SMS Sent At (system/log)
- Delivered At (handset)
- Latency (Receive→Sent) seconds
- Pass/Fail (<60s)
- Expected Behavior Met (Y/N)
- Notes (screenshots/log IDs)

## 5) Test Cases (What to Run)
### A) Generic Webhook JSON
**A1 Normal payload** (expect first SMS <60s, qualification begins)
```json
{
  "event_id": "evt_001",
  "source": "webhook",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15555550101",
  "email": "testlead@example.com",
  "service": "Quote",
  "submitted_at": "{{ISO8601}}"
}
```

**A2 Missing phone** (expect no SMS; create CRM note; request phone via email if available; mark NeedsHuman)
```json
{
  "event_id": "evt_002",
  "source": "webhook",
  "first_name": "NoPhone",
  "last_name": "Lead",
  "email": "nophone@example.com"
}
```

**A3 Invalid phone** (expect validation fail; no SMS; log reason; NeedsHuman)
```json
{
  "event_id": "evt_003",
  "source": "webhook",
  "first_name": "BadPhone",
  "last_name": "Lead",
  "phone": "123",
  "email": "badphone@example.com"
}
```

**A4 Duplicate lead (same event_id)** (expect dedupe → no second SMS)
Send A1 twice with same `event_id`.

**A5 Retry scenario (new event_id, same phone within dedupe window)**
Send A1 with `event_id: evt_004` then again with `event_id: evt_005` but same phone/email → expect dedupe by phone/email rules (configure expected).

### B) Jotform
Create a form with fields: First Name, Last Name, Phone, Email, Service Type (dropdown), ZIP, Message.

**B1 Normal submission** (expect SMS <60s)
**B2 Missing phone** (expect no SMS; note logged)
**B3 Invalid phone** (expect validation error or internal validation fail)
**B4 Concurrency:** submit 5 leads within 60 seconds (use multiple browsers/incognito). Expect no queue stall; all first SMS <60s.

### C) HubSpot
Test HubSpot lead creation triggers (new contact / form submission / deal stage move—whichever integration supports first).

**C1 New Contact with phone** (expect SMS <60s + note created)
**C2 Duplicate contact update** (expect dedupe; no second SMS)
**C3 Note formatting** verify strict template and transcript order.

## 6) Edge/Compliance Scenarios
1. **STOP:** From phone A, reply STOP after first outbound. Confirm opt-out flag set and no further messages.
2. **HELP:** From phone A, reply HELP. Confirm response includes support email agent_bob_replit+lead-copilot@agentmail.to and STOP instructions.
3. **After-hours:** Temporarily set after-hours window to “now” and submit a lead. Confirm after-hours copy is used and no booking push unless user requests.
4. **Calendar link failure:** Use an invalid calendar link or simulate downtime; confirm fallback asks for 2 time windows and sets Status=BookingLinkDown.
5. **LLM failover:** Simulate LLM timeout (disconnect key / force error). Confirm deterministic fallback flow triggers and still achieves <60s first message.

## 7) Bug Log Template (File Every Failure)
- Bug ID:
- Title:
- Severity (P0 compliance / P1 KPI / P2 formatting / P3 cosmetic):
- Source:
- Scenario:
- Steps to Reproduce:
- Expected:
- Actual:
- Evidence (timestamps, logs, screenshots):
- Suspected Cause:
- Proposed Fix (smallest change first):
- Re-test Result:

## 8) “Definition of Verified <60s”
A test counts as verified if:
- `Lead Received At` is captured from system logs OR server receipt timestamp, and
- `First SMS Sent At` is captured from provider/logs, and
- (optional but preferred) handset delivery time recorded.

Pass requires `First SMS Sent At - Lead Received At <= 60 seconds`.

## 9) Operator Notes
- If any P0 (STOP/HELP) or P1 (<60s KPI) fails, pause further testing and fix/configure before continuing.
- During pilots, share business proof URL when asked: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

End of runbook.
