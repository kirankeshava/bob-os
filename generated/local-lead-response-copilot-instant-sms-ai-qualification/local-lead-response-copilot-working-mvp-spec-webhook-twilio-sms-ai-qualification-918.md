# Local Lead Response Copilot — Working MVP Spec (Webhook → Twilio SMS → AI Qualification → Booking + CRM Notes)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T11:32:25.275Z

---

# Local Lead Response Copilot — MVP Spec (Demo-ready)

## Goal
Ship a working MVP that: (1) receives a new lead via webhook, (2) sends first SMS within 10 seconds, (3) qualifies via 3–5 questions, (4) classifies hot/warm/cold, (5) routes hot leads to booking (link), (6) writes a summary “note” payload back to a CRM connector (start with GoHighLevel webhook-style + generic outbound webhook), and (7) notifies the business/agency via email.

Business legitimacy link for pilots/demos: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support email: agent_bob_replit+lead-copilot@agentmail.to

---

## MVP Stack (cheap + fast)
- Runtime: Node.js (Express or Fastify)
- DB: SQLite (via better-sqlite3) for simple state storage
- Hosting: Replit Deployments OR Fly.io/Render free tier (single region)
- SMS: Twilio Messaging Service (recommended) with webhook to `/twilio/inbound`
- AI: OpenAI-compatible chat completions (rules-first fallback if unavailable)

---

## Core Concepts
### Lead lifecycle
1. **Lead ingested** (`/webhook/leads/:businessId`) → normalized fields stored.
2. **First SMS** sent within 10 seconds (queued immediately).
3. **Conversation** continues via inbound SMS webhook.
4. **Qualification** asks 3–5 questions, one at a time.
5. **Classification** hot/warm/cold based on answers + intent signals.
6. **Routing**:
   - Hot: send booking link (Calendly/GHL calendar link) and notify owner.
   - Warm: offer booking link + optional follow-up.
   - Cold: polite close + optional nurture.
7. **CRM Note output**: send summary JSON to configured CRM webhook (generic) + (optional) GoHighLevel note API if credentials provided.

### Quiet hours + compliance
- Enforce business hours with local timezone (default 9am–6pm).
- If lead arrives outside hours: store and send at next open time.
- Respect STOP/UNSUBSCRIBE/CANCEL keywords: mark contact opted_out, stop messaging.
- Include opt-out language in first message: “Reply STOP to opt out.”

---

## Data Model (SQLite)
### `businesses`
- `id` (text, pk)
- `name` (text)
- `timezone` (text, e.g. "America/Chicago")
- `hours_json` (text) // e.g. {mon:{start:"09:00",end:"18:00"},...}
- `twilio_messaging_service_sid` (text)
- `from_phone` (text nullable, if not using Messaging Service)
- `booking_link` (text)
- `owner_notify_email` (text)
- `crm_mode` (text) // "generic_webhook" | "ghl" | "none"
- `crm_webhook_url` (text)
- `ghl_location_id` (text)
- `ghl_api_key` (text encrypted at rest if possible; MVP can store plaintext with warning)
- `qual_questions_json` (text) // array of questions and rules
- `created_at` (datetime)

### `contacts`
- `id` (text, pk)
- `business_id` (text)
- `phone` (text)
- `name` (text)
- `email` (text)
- `opted_out` (int 0/1)
- `last_intent_score` (int)
- `created_at` (datetime)

### `leads`
- `id` (text, pk)
- `business_id` (text)
- `contact_id` (text)
- `source` (text) // typeform/webflow/ghl/hubspot/manual
- `raw_payload_json` (text)
- `normalized_json` (text)
- `status` (text) // new|contacted|qualifying|qualified|booked|closed
- `classification` (text) // hot|warm|cold|unknown
- `created_at` (datetime)

### `conversations`
- `id` (text, pk)
- `business_id` (text)
- `contact_id` (text)
- `lead_id` (text)
- `state` (text) // awaiting_q1|awaiting_q2|...|done
- `answers_json` (text)
- `last_question_index` (int)
- `last_outbound_at` (datetime)
- `created_at` (datetime)

### `messages`
- `id` (text, pk)
- `conversation_id` (text)
- `direction` (text) // inbound|outbound
- `body` (text)
- `twilio_sid` (text)
- `created_at` (datetime)

---

## Normalized Lead Schema (generic)
Inbound webhook accepts any JSON, but we attempt to map to:
```json
{
  "leadId": "external-or-generated",
  "timestamp": "2026-04-09T12:34:56Z",
  "source": "generic",
  "contact": {
    "name": "Jane Doe",
    "phone": "+15551234567",
    "email": "jane@example.com"
  },
  "service": {
    "requested": "water heater repair",
    "address": "123 Main St",
    "notes": "No hot water since yesterday"
  },
  "meta": {
    "utm_source": "facebook",
    "utm_campaign": "spring",
    "page": "/estimate"
  }
}
```
Normalization rules:
- Phone: E.164 required; attempt to coerce US numbers.
- If missing phone → store lead but do not SMS; email notify owner.

---

## Endpoints
### 1) Ingest lead (generic)
`POST /webhook/leads/:businessId?key=API_KEY`
- Validates business + API key.
- Stores raw + normalized payload.
- Creates/updates contact.
- Creates conversation and schedules immediate outbound if within hours.
Response: `200 {"ok":true,"lead_id":"..."}`

### 2) Twilio inbound SMS
`POST /twilio/inbound`
- Twilio posts `From`, `To`, `Body`, `MessageSid`.
- Find business by Messaging Service SID mapping OR by `To` number.
- Find contact by `From`.
- STOP handling: if Body matches STOP keywords → set `opted_out=1` and respond with Twilio-friendly message.
- Otherwise route to state machine.

### 3) Twilio status callback (optional)
`POST /twilio/status`
- Stores delivered/failed states (nice-to-have for debugging).

### 4) Admin config (MVP)
`GET /admin/:businessId` (basic password or API key gated)
`POST /admin/:businessId` to update:
- business name, timezone, hours
- booking link
- owner notify email
- questions
- CRM webhook URL

---

## Qualification Flow (3–5 questions)
### Default questions (home services)
Q1: “What service do you need help with?”
Q2: “What’s your address or zip code?”
Q3: “How soon do you need this done—today, this week, or just gathering quotes?”
Q4: “Is this for a residential or commercial property?” (optional)
Q5: “What’s the best time for a quick call?” (optional)

### State machine
- `awaiting_q1` → store answer → ask Q2
- `awaiting_q2` → store answer → ask Q3
- `awaiting_q3` → store answer → classify lead
- `done` → if user texts again, respond with helpful booking/callback prompt

### Classification rules (rules-first)
Hot if any:
- urgency contains: “today”, “asap”, “now”, “urgent”
- service is high intent (repair, install) AND timeframe <= “this week”
Warm if:
- timeframe “this week” or “soon” or “getting quotes” but has clear service need
Cold if:
- “just curious”, “maybe later”, no clear need, price shopping without timeframe

Then (optional) LLM refinement:
Provide the normalized lead + answers and ask model to output:
```json
{ "classification":"hot|warm|cold", "intent_score":0-100, "summary":"...", "next_message":"..." }
```
Fallback if LLM fails: apply rules and use templated next_message.

---

## Messaging Templates (safe + compliant)
### First outbound (must send within 10 seconds)
“Hi {{first_name}}, it’s {{business_name}} — got your request for {{service}}. A couple quick questions so we can help fast. What service do you need exactly? Reply STOP to opt out.”

### Hot lead booking push
“Thanks — we can help. The fastest way is to grab a time here: {{booking_link}}. If you prefer, reply with a good time and we’ll call you.”

### Warm lead
“Got it. If you’d like, you can book a quick call here: {{booking_link}}. Or tell me your best time and we’ll reach out.”

### Cold lead
“Thanks for the info. If you want an estimate later, just reply here anytime. Reply STOP to opt out.”

---

## CRM Notes Output (generic webhook)
After qualification completes, POST to `business.crm_webhook_url`:
```json
{
  "businessId":"...",
  "leadId":"...",
  "contact": {"name":"...","phone":"...","email":"..."},
  "classification":"hot",
  "intentScore": 85,
  "answers": {
    "service":"water heater repair",
    "location":"78704",
    "timeframe":"today"
  },
  "summary":"Lead needs water heater repair in 78704, urgent today. Sent booking link.",
  "bookingLink":"...",
  "conversationTranscript":[{"dir":"outbound","body":"..."},{"dir":"inbound","body":"..."}]
}
```
If CRM mode = `ghl` and creds exist, additionally create a note on the contact (MVP can skip if too complex; keep generic webhook as guaranteed output).

---

## Operational Notes
- Ensure first SMS is dispatched immediately (no LLM dependency on first send).
- Queue/schedule messages outside business hours.
- Log every inbound/outbound message for demo and debugging.
- Provide a simple “demo business” seeded in DB for live demos.

---

## Minimum Demo Script (what we can show)
1) Submit a sample webhook payload via curl/Postman.
2) Show SMS received instantly.
3) Answer 3 questions.
4) See classification + booking link.
5) Show stored transcript + generated CRM note JSON.

This spec is intentionally narrow so we can ship quickly, demo reliably, and fulfill first paid pilots with minimal infra cost.