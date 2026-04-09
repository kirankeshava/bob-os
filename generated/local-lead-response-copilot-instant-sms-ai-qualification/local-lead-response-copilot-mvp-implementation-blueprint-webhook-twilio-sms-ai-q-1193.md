# Local Lead Response Copilot — MVP Implementation Blueprint (Webhook → Twilio SMS → AI Qualification → Booking/CRM Notes)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T13:45:09.788Z

---

# Local Lead Response Copilot — MVP Blueprint

## Goal (demo-ready in 1–2 days)
A single multi-tenant service that:
1) Receives a new lead via webhook (generic JSON).  
2) Normalizes + validates fields.  
3) Sends the first SMS within 10 seconds via Twilio Messaging Service.  
4) Runs a 3–5 question qualification over SMS (stateful).  
5) Scores hot/warm/cold and routes:
   - Hot → booking link + owner notification + CRM note output.
   - Warm/Cold → polite close + owner summary.
6) Stores conversation state in a lightweight DB.
7) Handles STOP/HELP, quiet hours, and opt-in language.

This blueprint assumes **Node.js + Express** and **SQLite** for speed (can swap to Postgres later). It intentionally keeps “admin” minimal.

---

## Tech stack
- Runtime: Node.js 20+
- Web: Express
- DB: SQLite (better-sqlite3) for MVP
- SMS: Twilio Messaging Service (Messaging Service SID)
- LLM (optional): OpenAI (or can ship rules-only first)
- Deploy: Replit or $5–$10 VPS (Fly.io/Render free tier also possible)

Env vars:
- `BASE_URL` (public URL for webhooks)
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_MESSAGING_SERVICE_SID`
- `OPENAI_API_KEY` (optional)
- `ADMIN_API_KEY` (simple shared secret)

---

## Data model (SQLite)

### `businesses`
- `id` TEXT PK (uuid)
- `name` TEXT
- `timezone` TEXT (e.g. "America/Chicago")
- `quiet_hours_start` TEXT ("20:00")
- `quiet_hours_end` TEXT ("08:00")
- `calendar_link` TEXT (booking URL)
- `owner_notify_phone` TEXT
- `owner_notify_email` TEXT
- `questions_json` TEXT (JSON array)
- `scoring_json` TEXT (JSON rules)
- `created_at` INTEGER

### `leads`
- `id` TEXT PK (uuid)
- `business_id` TEXT FK
- `source` TEXT ("generic", "ghl")
- `external_id` TEXT (optional)
- `first_name` TEXT
- `last_name` TEXT
- `phone_e164` TEXT
- `email` TEXT
- `service` TEXT
- `zip` TEXT
- `raw_payload_json` TEXT
- `status` TEXT ("new","contacted","qualifying","qualified","stopped")
- `classification` TEXT ("hot","warm","cold", null)
- `score` INTEGER
- `summary` TEXT
- `created_at` INTEGER

### `conversations`
- `id` TEXT PK (uuid)
- `lead_id` TEXT FK
- `business_id` TEXT
- `state` TEXT ("idle","q1","q2","q3","done")
- `current_question_index` INTEGER
- `answers_json` TEXT
- `last_inbound_at` INTEGER
- `last_outbound_at` INTEGER

### `messages`
- `id` TEXT PK (uuid)
- `conversation_id` TEXT
- `direction` TEXT ("in","out")
- `from_phone` TEXT
- `to_phone` TEXT
- `body` TEXT
- `twilio_sid` TEXT
- `created_at` INTEGER

### `events`
- `id` TEXT PK
- `business_id` TEXT
- `lead_id` TEXT
- `type` TEXT ("lead_received","sms_sent","inbound_received","qualified","stop")
- `payload_json` TEXT
- `created_at` INTEGER

---

## Webhook intake: generic schema

### POST `/webhook/lead`
Headers:
- `x-business-id: <uuid>` (or `?businessId=`)
- Optional: `x-signature` (future)

Body (generic JSON):
```json
{
  "source": "typeform|webflow|ghl|hubspot|generic",
  "lead": {
    "firstName": "Jane",
    "lastName": "Doe",
    "phone": "+14155551212",
    "email": "jane@example.com",
    "service": "Roof repair",
    "zip": "94107",
    "message": "Need an estimate",
    "consent": true
  },
  "meta": {
    "externalId": "abc-123",
    "pageUrl": "https://...",
    "adId": "...",
    "utm": {"source":"fb","campaign":"..."}
  }
}
```

Normalization rules:
- Phone: parse to E.164; reject if invalid.
- Consent: if missing, assume true only for internal demos; for production require explicit opt-in.
- Ensure `businessId` exists.

Response:
```json
{ "ok": true, "leadId": "...", "conversationId": "..." }
```

Immediately enqueue/send first SMS (within request or background job). For MVP, do it inline but guard with timeout.

---

## Twilio inbound webhook

### POST `/twilio/inbound`
Twilio sends form-urlencoded fields:
- `From`, `To`, `Body`, `MessageSid`

Steps:
1) Verify Twilio signature (recommended): use `twilio.validateRequest` with Auth Token.
2) Find business by `To` mapping:
   - Simplest MVP: store a single Messaging Service; inbound “To” can vary. Alternative: require `businessId` param in webhook path: `/twilio/inbound/:businessId` and set Twilio webhook per business.
3) Find active conversation by `From` phone + business.
4) STOP/HELP handling:
   - If body matches `STOP|UNSUBSCRIBE|CANCEL|END|QUIT` → set lead.status="stopped" and do not send further.
   - If `HELP` → respond with support message and business email.

---

## Qualification engine (state machine)

### Default questions (3–5)
Store in `businesses.questions_json`:
```json
[
  {"key":"service","question":"Quick question—what service are you looking for?"},
  {"key":"timing","question":"When do you need this done? (today/this week/this month)"},
  {"key":"location","question":"What ZIP code is the job in?"},
  {"key":"budget","question":"Do you have a rough budget range?"},
  {"key":"owner","question":"Are you the property owner/decision maker? (yes/no)"}
]
```
MVP can ship with 3 questions (service, timing, zip) to reduce friction.

### Routing/scoring rules
Store in `businesses.scoring_json`:
```json
{
  "hot": {
    "timing": ["today","this week"],
    "owner": ["yes"],
    "minScore": 70
  },
  "warm": {"minScore": 40}
}
```

Scoring approach (rules-only MVP):
- timing: today/this week +30; this month +15; later +5
- zip present +10
- service present +10
- owner yes +20
- budget present +10

Classification:
- score >= 70 → hot
- 40–69 → warm
- < 40 → cold

Optional LLM enhancement (if OPENAI_API_KEY present):
- After each inbound answer, call LLM to normalize answer into canonical values (e.g., timing) and detect spam.
- At end, call LLM to produce a 2–4 sentence summary + recommended classification; then combine with rules for safety (rules win).

---

## Outbound SMS copy (compliance + speed)
First SMS template (sent immediately):
"Hi {{firstName}}, this is {{businessName}}. Got your request for {{service}}. A couple quick questions so we can help fast—what’s the best time for us to call you? Reply STOP to opt out."

Then ask Q1..Qn sequentially. Keep each under 160 chars where possible.

HELP response:
"Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to"

STOP response (optional):
"You’re unsubscribed and won’t receive more messages."

Quiet hours:
- If current time in business timezone is within quiet hours, do not send; instead store an event `sms_deferred` and send at quiet_hours_end.
- MVP implementation: a simple cron-like interval that checks deferred sends every minute.

---

## Hot-lead routing
When classified hot:
1) Send SMS to lead:
"Perfect—here’s the fastest way to lock in a time: {{calendar_link}}. If you prefer, reply with a good time window and we’ll confirm."
2) Notify owner (SMS and/or email):
"NEW HOT LEAD: {{name}} {{phone}} | {{service}} | {{timing}} | ZIP {{zip}} | Summary: {{summary}}"
3) CRM note output:
- MVP: POST to configured webhook URL (GoHighLevel inbound webhook) with a JSON payload.

### GoHighLevel connector (simple)
Store per business:
- `ghl_webhook_url`

POST payload:
```json
{
  "leadId": "...",
  "name": "Jane Doe",
  "phone": "+14155551212",
  "email": "jane@example.com",
  "classification": "hot",
  "score": 80,
  "answers": {"service":"roof repair","timing":"this week","zip":"94107"},
  "summary": "High-intent roof repair request, wants service this week in 94107. Ready to schedule."
}
```
If no CRM configured, log event and email owner.

---

## API endpoints (minimum set)

### Health
- `GET /health` → `{ok:true}`

### Lead intake
- `POST /webhook/lead` (generic)
- `POST /webhook/ghl` (optional native): parse GHL payload → map to generic → call same handler

### Twilio inbound
- `POST /twilio/inbound/:businessId` (recommended for multi-tenant)

### Admin config (minimal, API-key protected)
Use header `x-admin-key: ADMIN_API_KEY`
- `POST /admin/business` create business
- `PUT /admin/business/:id` update business fields (calendar link, hours, questions)
- `GET /admin/business/:id` view config

No UI required for MVP; use curl / Postman.

---

## Core logic pseudocode

### `handleNewLead(businessId, payload)`
1) normalize lead fields
2) create lead row + conversation row state=q1 index=0
3) send first SMS + first question (or combine into one)
4) set lead.status="qualifying"

### `handleInboundSms(businessId, fromPhone, body)`
1) if STOP → mark stopped; return
2) load conversation by businessId+fromPhone
3) store inbound message
4) update answers_json for current question key
5) if more questions → increment question index, send next question
6) else → finalize:
   - compute score/classification
   - generate summary (rules-only or LLM)
   - update lead
   - route based on classification

---

## Demo checklist (what to show prospects)
1) Submit sample lead via curl to `/webhook/lead`.
2) Show SMS arrives immediately.
3) Answer 3 questions.
4) Show classification result and owner notification.
5) Show CRM webhook payload logged.

Include legitimacy reference in emails/collateral:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

---

## What to implement first (strict MVP order)
1) DB + models + migrations
2) `/webhook/lead` → create lead + conversation
3) Twilio outbound SMS
4) `/twilio/inbound/:businessId` → state machine Q&A
5) scoring + classification + summary
6) hot routing: booking link + owner notify
7) GHL webhook output
8) quiet hours + STOP/HELP

This keeps scope shippable while still demoing the full “speed-to-lead → qualify → book” loop.