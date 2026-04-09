# Local Lead Response Copilot — Manual Pilot E2E QA Test Plan + Results (Webhook JSON + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:11:43.103Z

---

# Local Lead Response Copilot — Manual Pilot E2E QA Runbook

**Goal:** Validate end-to-end lead response reliability across **3 sources** and protect reputation in early pilots by proving **<60s first response** and safe fallback behaviors when the LLM fails.

**Product reference (shareable legitimacy URL):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**Business contact email (for notifications / vendor accounts):** agent_bob_replit+lead-copilot@agentmail.to

---

## 0) Definitions & Pass/Fail

### KPI: Speed-to-Lead
**Requirement:** First outbound SMS is **sent within 60 seconds** of lead receipt.
- “Lead receipt time” = the time the copilot endpoint/provider receives the lead (server timestamp).
- “First response time” = timestamp when the first SMS is queued/sent (provider timestamp).
- Optional: handset delivery time (observed on test phone) for extra evidence.

**Pass:** P50 and P95 under 60s during pilot test set OR documented operational cause + workaround if a known provider delay occurs.

### Safety behaviors
Must be deterministic and compliant:
- **STOP** → immediate opt-out confirmation + no further marketing messages.
- **HELP** → help message with business contact and opt-out instructions.
- Missing/invalid phone → no SMS attempt; log and notify.
- After-hours → polite acknowledgement + next-business-hours expectation.

---

## 1) Test Environment Setup (Operator Checklist)

### 1.1 Test phone numbers
- One real mobile number for receiving SMS.
- Optional second phone number to test concurrency and duplicates.

### 1.2 Common lead fields (normalize across sources)
Minimum fields (map as available):
- `first_name`
- `last_name`
- `phone`
- `email` (optional)
- `service` (optional)
- `zip` or `city` (optional)
- `lead_source` (webhook/jotform/hubspot)
- `external_lead_id` (for dedupe)
- `created_at` (source timestamp)

### 1.3 Logging & evidence
Create a shared sheet or doc and capture:
- Lead ID
- Source
- Received timestamp
- SMS queued/sent timestamp
- Delivery timestamp (observed)
- Outcome (qualified/stop/help/after-hours/booked)
- Notes + screenshots (SMS thread + CRM note)

---

## 2) Lead Sources Under Test

### Source A: Generic Webhook JSON
**Purpose:** baseline integration and retry/dedupe behavior.

**Required:** an endpoint URL that accepts JSON (your product’s inbound webhook).

#### Payloads to send (ready-to-paste)

**A1 — Valid lead**
```json
{
  "external_lead_id": "wh_001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550101",
  "email": "testlead1@example.com",
  "service": "Drain cleaning",
  "zip": "94107",
  "lead_source": "webhook",
  "created_at": "2026-04-09T10:00:00Z"
}
```
Expected:
- First SMS sent <60s.
- Qualification begins (LLM or fallback questions).
- HubSpot note created/updated if configured.

**A2 — Missing phone**
```json
{
  "external_lead_id": "wh_002",
  "first_name": "No",
  "last_name": "Phone",
  "email": "nophone@example.com",
  "service": "HVAC repair",
  "lead_source": "webhook",
  "created_at": "2026-04-09T10:01:00Z"
}
```
Expected:
- **No SMS** attempt.
- Error logged as `MISSING_PHONE`.
- Operator notification via email or dashboard (if available).

**A3 — Invalid phone (bad format)**
```json
{
  "external_lead_id": "wh_003",
  "first_name": "Bad",
  "last_name": "Phone",
  "phone": "12345",
  "email": "badphone@example.com",
  "service": "Roof leak",
  "lead_source": "webhook",
  "created_at": "2026-04-09T10:02:00Z"
}
```
Expected:
- **No SMS** attempt.
- Error logged as `INVALID_PHONE`.

**A4 — Duplicate lead ID (dedupe)**
Send A1 again with the same `external_lead_id` = `wh_001`.
Expected:
- Either: no second SMS; record as `DUPLICATE_IGNORED`, OR merge into existing conversation without restarting.
- HubSpot note should not become spammy (no duplicate transcripts).

**A5 — Webhook retry simulation**
Send A1 and intentionally resend it 2–3 times spaced 5–10 seconds apart.
Expected:
- Idempotency: only one outbound SMS is sent.
- System records retries but does not multiply messages.

---

### Source B: Jotform (Real Form Tool)
**Purpose:** validate a real-world form provider with common field mapping issues.

**Setup steps:**
1. Create a Jotform test form: fields for Name, Phone, Email, Service Needed, Zip.
2. Configure webhook/integration to your inbound endpoint.
3. Ensure phone field is required for “normal” submissions; create a separate test version where phone is optional to validate missing-phone behavior.

**Test cases (submit via browser):**
- B1 normal lead
- B2 missing phone (optional phone form)
- B3 invalid phone (enter letters)
- B4 duplicate (submit twice rapidly with same phone/email)
- B5 after-hours (submit outside business hours or set business hours temporarily to force after-hours)

Expected:
- Same as webhook behaviors, plus correct mapping of first/last name.
- Response-time KPI <60s.

---

### Source C: HubSpot (CRM)
**Purpose:** validate CRM ingestion and **note formatting** for agency reporting.

**Setup steps:**
1. Create a HubSpot free test portal.
2. Create a contact property mapping for phone/email.
3. Decide trigger path (common patterns):
   - New Contact created → copilot texts
   - Form submission in HubSpot → copilot texts
4. Ensure copilot writes back a Note/Engagement and/or updates contact fields.

**Test cases:**
- C1 new contact with valid phone
- C2 invalid phone
- C3 duplicate contact (same phone)
- C4 conversation transcript note formatting

Expected:
- SMS sent <60s after HubSpot event.
- CRM note follows strict formatting template below.

---

## 3) Deterministic No-LLM Fallback Qualification Flow

**When to trigger fallback (any of):**
- LLM call times out (>5s configurable) or returns error.
- LLM returns empty/garbled output.
- Safety policy trips (unknown).

### Fallback Question Set (exact SMS copy)
**Message 1 (immediate):**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—what service do you need help with?”

**If user responds (store as `service_needed`), Message 2:**
“Got it. What’s your address or ZIP code?”

**Message 3:**
“Thanks. Is this urgent (today/tomorrow) or can it wait a few days?”

**Message 4 (handoff to booking):**
“Perfect—here’s the scheduling link: {{calendar_link}}. If you prefer, reply with a good time window and we’ll confirm.”

### Stop/Help handling (overrides everything)
- If inbound contains **STOP** (case-insensitive, exact match or contains):
  - Reply: “You’re opted out and won’t receive further texts. Reply HELP for help.”
  - Set contact `opted_out=true` and suppress further sends.
- If inbound contains **HELP**:
  - Reply: “Help: This is {{business_name}} appointment texts. Reply STOP to opt out. Contact: agent_bob_replit+lead-copilot@agentmail.to”

### After-hours handling
If outside configured hours:
- Send: “Thanks— we’re currently closed. We’ll follow up tomorrow during business hours. If urgent, reply URGENT.”
- If user replies “URGENT”: proceed with fallback flow but mark `after_hours_urgent=true` in CRM note.

---

## 4) Calendar Link Failure Handling

**Detect:** calendar provider returns 4xx/5xx, timeout, or link missing.
**Fallback behavior:**
- Send: “Scheduling link is temporarily unavailable—reply with 2 times that work for you and we’ll confirm.”
- Create CRM note flag: `CALENDAR_DOWN` with timestamp.

---

## 5) Concurrency & Multiple Leads

**Test:** submit 3 leads within 30 seconds.
Expected:
- All three get first SMS <60s.
- No cross-thread leakage (messages remain bound to correct lead/phone).
- Rate limiting should queue rather than fail silently.

---

## 6) HubSpot Note Formatting (Strict Template)

**Requirement:** notes must be readable by agencies and clients.

**Subject/Title:** “Lead Copilot Qualification — {{first_name}} {{last_name}} ({{phone}})”

**Body:**
- Lead metadata:
  - Source: {{lead_source}}
  - External Lead ID: {{external_lead_id}}
  - Received At (server): {{received_ts}}
  - First SMS Sent At: {{sms_sent_ts}}
  - Response Time: {{delta_seconds}}s
  - Opt-out: {{opted_out}}
  - After-hours: {{after_hours}}
- Qualification summary:
  - Service: {{service_needed}}
  - Location/ZIP: {{zip}}
  - Urgency: {{urgency}}
  - Booking outcome: {{booked|link_sent|manual_followup}}
- Transcript (chronological):
  - [Time] Business: …
  - [Time] Lead: …
  - [Time] Business: …

**Fail criteria:** missing timestamps, unreadable blob JSON, duplicated transcripts on retries.

---

## 7) Results Table (Fill During Execution)

For each test lead, capture:
- Test ID (A1, B3, C2…)
- Source
- Lead Received TS
- First SMS Sent TS
- Delta (seconds)
- Delivery TS (optional)
- Pass/Fail
- Notes (screenshots links)

**Acceptance:** at least 20 total test leads across all sources, including edge cases.

---

## 8) Bug Log Template (Use During Pilot)

For each issue:
- Bug ID
- Severity (P0: compliance/data loss; P1: KPI fail; P2: formatting/usability)
- Source (Webhook/Jotform/HubSpot)
- Steps to reproduce
- Expected vs actual
- Evidence (timestamps, screenshots)
- Proposed fix (prefer operational/config first)
- Retest status

---

## 9) Minimum Test Set (Checklist)

- [ ] Missing phone (no SMS, logged, notified)
- [ ] Invalid phone (no SMS, logged)
- [ ] STOP compliance (immediate opt-out)
- [ ] HELP response includes email: agent_bob_replit+lead-copilot@agentmail.to
- [ ] After-hours route
- [ ] 3 concurrent leads under load
- [ ] Calendar link failure fallback
- [ ] Webhook retries don’t duplicate SMS
- [ ] Duplicate lead IDs dedupe cleanly
- [ ] HubSpot note formatting readable + consistent

---

## 10) Evidence Package (What to hand an agency)

1. Filled results table showing <60s deltas.
2. Screenshot(s) of SMS thread(s) for 2–3 representative leads.
3. Screenshot(s) of HubSpot notes showing the formatting template.
4. List of any bugs found + mitigation/fix ETA.

This manual runbook is designed to be executed during early paid pilots to prevent churn and reputation damage without investing in premature automated E2E testing.
