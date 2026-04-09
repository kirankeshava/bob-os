# Local Lead Response Copilot — MVP Technical Spec (Webhook → Twilio SMS → AI Qualification → Booking/CRM Notes)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T09:17:00.606Z

---

# Local Lead Response Copilot — MVP Technical Spec

## Goal
Ship a demo-ready micro-SaaS MVP that:
1) Receives a new lead via webhook (generic JSON + at least one native connector: GoHighLevel).
2) Normalizes/validates fields.
3) Sends first SMS within 10 seconds via Twilio Messaging Service.
4) Runs 3–5 question qualification via deterministic rules + optional LLM.
5) Classifies lead hot/warm/cold.
6) Routes hot leads to booking link (or auto-book if available) and posts notes back to CRM (initially via outbound webhook / configurable endpoint).
7) Stores conversation + state in a lightweight DB.
8) Handles STOP/unsubscribe, quiet hours, and opt-in templates.

The MVP must be minimal infra + minimal dependencies; it’s primarily for first pilots/demos.

---

## Tech Stack (minimal)
- Runtime: Node.js 20+
- Web server: Express or Fastify
- DB: SQLite (via better-sqlite3) for single-instance deployment
- SMS: Twilio Messaging Service
- AI (optional): OpenAI-compatible API OR pluggable LLM provider; fallback to rules-only if key absent.
- Hosting: Replit Deployments or single cheap VPS. Single region.

---

## Core Entities (SQLite)
### `businesses`
- `id` (text, pk)
- `name` (text)
- `timezone` (text, e.g., "America/Chicago")
- `quiet_hours_start` (text, "20:00")
- `quiet_hours_end` (text, "08:00")
- `calendar_link` (text)
- `twilio_messaging_service_sid` (text)
- `twilio_from_number` (text, optional fallback)
- `opt_in_disclaimer` (text)
- `webhook_secret` (text)
- `created_at` (datetime)

### `leads`
- `id` (text, pk)
- `business_id` (text, fk)
- `source` (text: "generic", "ghl")
- `external_lead_id` (text, nullable)
- `first_name` (text)
- `last_name` (text)
- `phone_e164` (text)
- `email` (text, nullable)
- `service` (text, nullable)
- `zip` (text, nullable)
- `raw_payload` (json text)
- `status` (text: "new", "messaged", "qualifying", "qualified", "closed")
- `temperature` (text: "hot", "warm", "cold", nullable)
- `created_at` (datetime)
- `updated_at` (datetime)

### `conversations`
- `id` (text, pk)
- `lead_id` (text, fk)
- `state` (text: see state machine)
- `current_question_index` (int)
- `answers_json` (json text)
- `last_inbound_at` (datetime)
- `last_outbound_at` (datetime)
- `opted_out` (int 0/1)
- `created_at` (datetime)
- `updated_at` (datetime)

### `messages`
- `id` (text, pk)
- `conversation_id` (text, fk)
- `direction` (text: "in", "out")
- `from` (text)
- `to` (text)
- `body` (text)
- `twilio_sid` (text, nullable)
- `created_at` (datetime)

### `events`
- `id` (text, pk)
- `business_id` (text)
- `lead_id` (text, nullable)
- `type` (text: "lead_received", "sms_sent", "inbound_received", "qualified", "crm_posted", "error")
- `payload_json` (json text)
- `created_at` (datetime)

---

## State Machine
Conversation `state` values:
1) `INIT` – lead created; decide whether can text now (quiet hours + opt-in)
2) `FIRST_MESSAGE_SENT` – initial SMS sent
3) `ASKING_QUESTIONS` – iterating through qualification questions
4) `QUALIFIED` – final classification stored and routed
5) `STOPPED` – user opted out (STOP)

Transitions:
- INIT → FIRST_MESSAGE_SENT if allowed; else INIT → (scheduled send) (MVP: immediate defer with “we’ll text you at 8am” message only if legally allowed; otherwise queue until quiet hours end)
- FIRST_MESSAGE_SENT → ASKING_QUESTIONS on first inbound reply
- ASKING_QUESTIONS → ASKING_QUESTIONS until last question answered
- ASKING_QUESTIONS → QUALIFIED when classification computed
- ANY → STOPPED on STOP keywords

STOP keywords: STOP, UNSUBSCRIBE, CANCEL, END, QUIT.

---

## Qualification Questions (default)
Keep it 3–5 and business-configurable.

Default set for home services:
1) “What service do you need? (e.g., plumbing, HVAC, cleaning)”
2) “What’s your ZIP code?”
3) “How soon do you need this done? (today/this week/this month)”
4) “Is this for a home you own or rent?”
5) “Ballpark budget range? (optional)”

Admin can edit questions per business.

---

## Classification Logic (rules-first)
Compute temperature using simple scoring:
- Urgency: today (+3), this week (+2), this month (+1)
- Ownership: own (+1), rent (0)
- Service present (+1)
- ZIP present (+1)
- Budget present (+1)

Threshold:
- score ≥6 → HOT
- score 4–5 → WARM
- score ≤3 → COLD

Optional LLM enhancement:
- Prompt LLM with collected Q/A + business context, ask it to output `{temperature, short_summary, objections, next_best_action}`.
- If LLM fails or key missing, fall back to rules-only.

---

## Routing
### HOT
- Send booking CTA:
  “Perfect — we can get this handled. Here’s the fastest way to book a time: {calendar_link}. Reply BOOKED after you schedule.”
- Notify business/agency via email webhook output (MVP: outbound webhook POST to configured URL OR send email via SMTP later). For now: outbound webhook is simplest.

### WARM
- Offer help + booking link + ask one clarifier:
  “Got it. Want to grab a quick call to confirm details? {calendar_link}”

### COLD
- Polite close + option:
  “Thanks — we may not be the best fit, but if you’d like a quote anyway reply QUOTE.”

---

## API Endpoints (MVP)
Base URL: deployed app.

### 1) POST `/webhook/lead/:businessId`
Generic intake. Header: `X-Webhook-Secret: <secret>`

Body schema (preferred):
```json
{
  "externalLeadId": "string",
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "+15551234567",
  "email": "jane@example.com",
  "service": "HVAC repair",
  "zip": "78701",
  "source": "webform"
}
```
Behavior:
- Normalize phone to E.164.
- Create lead + conversation.
- Send initial SMS within 10 seconds if not in quiet hours and not opted out.
- Respond 200 with `{leadId, conversationId, status}`.

### 2) POST `/webhook/ghl/:businessId`
GoHighLevel connector (inbound webhook). Accepts common GHL fields; map to generic model.
- Read fields like `contact.phone`, `contact.first_name`, etc. Also accept flat payloads.

### 3) POST `/twilio/inbound/:businessId`
Twilio webhook for incoming SMS.
- Validate Twilio signature (recommended).
- Parse inbound message, store.
- If STOP keyword: mark opted_out, send confirmation (“You’re unsubscribed. Reply START to resubscribe.”) per policy.
- Otherwise advance qualification state and send next question or routing message.

### 4) GET/POST `/admin/config/:businessId`
Basic admin config (MVP can be protected by a shared secret header).
- GET returns current config.
- POST updates: business name, hours, calendar link, questions array, webhook secret.

### 5) POST `/outbound/crm-note/:businessId` (optional internal helper)
- Formats and sends summary to configured CRM webhook URL.

---

## Message Templates (MVP-ready)
### Initial SMS (sent within 10 seconds)
“Hi {firstName}, it’s {businessName}. Got your request for {service}. Quick questions so we can help fast — what service do you need exactly?”

Include opt-in disclaimer in first or second message depending on brand:
“Reply STOP to opt out.”

### Quiet hours behavior
If lead arrives during quiet hours:
- Store lead.
- Option A (safer): do not send until quiet hours end.
- Option B (if permitted and configured): send one message acknowledging receipt without marketing tone.
MVP recommendation: Option A to reduce compliance risk.

---

## Compliance / Safety
- Maintain `opted_out` per conversation and global by phone per business.
- Do not message if opted out.
- Handle STOP keywords immediately.
- Rate-limit: max 1 outbound per 5 seconds per conversation.
- PII: store only necessary fields; keep raw payload for debugging but allow disabling.

---

## CRM Notes Output (MVP)
Since each CRM differs, MVP posts to a configurable webhook URL (e.g., GoHighLevel inbound webhook or Zapier/Make):

POST JSON:
```json
{
  "leadId": "...",
  "externalLeadId": "...",
  "temperature": "hot",
  "summary": "Customer needs HVAC repair in 78701 this week. Owns home. Budget not provided.",
  "answers": {
    "service": "HVAC repair",
    "zip": "78701",
    "urgency": "this week",
    "ownership": "own"
  },
  "transcript": [
    {"direction":"out","body":"...","ts":"..."},
    {"direction":"in","body":"...","ts":"..."}
  ]
}
```

---

## Deployment Notes (no spend required)
- Use environment variables for Twilio creds and (optional) LLM key.
- Single process deployment is fine.
- Add `/health` endpoint for uptime.

---

## Demo Script (internal)
1) Send a POST to `/webhook/lead/{businessId}` with a real phone.
2) Confirm SMS arrives within 10 seconds.
3) Reply to questions; watch state progress.
4) On completion, confirm temperature classification + booking link sent.
5) Confirm outbound webhook received the lead summary payload (use a request bin during demo).

---

## Customer-facing legitimacy reference
When needed in outreach or docs, reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to
