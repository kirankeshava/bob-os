# Local Lead Response Copilot — MVP Implementation Spec (Webhook → Twilio SMS → AI/Rules Qualification → Booking + CRM Notes)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T15:04:52.754Z

---

## Goal (MVP)
Build a single-tenant micro-service that:
1) Receives a new lead via webhook (generic JSON schema + one native connector).
2) Normalizes/validates lead fields.
3) Sends first SMS within 10 seconds via Twilio Messaging Service.
4) Runs a 3–5 question qualification flow (rules-first; optional LLM assist).
5) Classifies lead hot/warm/cold.
6) Hot leads get booking link (or auto-book where possible). 
7) Writes notes back to CRM via webhook (generic) and emails a summary to the business.

This MVP is primarily for demos + first pilots; it must be reliable and simple.

---

## Tech Stack (cheap + fast)
- Node.js (Express) API
- SQLite (file-based DB) via Prisma or better-sqlite3
- Twilio Messaging Service (outbound) + Twilio inbound webhook
- Optional: OpenAI (only if enabled; rules-first by default)
- Deployed on a cheap VPS or serverless (but VPS is simpler for inbound webhooks). Single region.

---

## Configuration (single tenant)
Store config in `config.json` (easy) or `business` table.

### Required config fields
- `businessName`: string
- `timezone`: e.g. `America/Chicago`
- `quietHours`: { `start`: "20:00", `end`: "08:00" }
- `twilio`: { `messagingServiceSid`, `accountSid`, `authToken` }
- `fromLabel`: e.g. "Dispatch" (used in messages)
- `calendarLink`: booking URL (Calendly/GoHighLevel calendar)
- `notifyEmails`: array (e.g. `["owner@company.com"]`)
- `qualification`: {
  - `maxQuestions`: 5,
  - `questions`: [ ... ],
  - `hotCriteria`: rules (see below)
}
- `crm`: {
  - `provider`: "generic" | "gohighlevel" | "hubspot",
  - `noteWebhookUrl`: url (where we POST summary)
}
- `security`: { `apiKey`: random token for webhook intake }

---

## Data Model (SQLite)
### tables
1) `leads`
- `id` (uuid)
- `source` (text) e.g. "generic", "gohighlevel"
- `externalLeadId` (text nullable)
- `createdAt` (datetime)
- `firstName` (text)
- `lastName` (text)
- `phone` (text E.164)
- `email` (text nullable)
- `service` (text nullable)
- `zip` (text nullable)
- `notes` (text nullable)
- `rawPayload` (json text)

2) `conversations`
- `id` (uuid)
- `leadId` (fk)
- `status` (text: "active" | "completed" | "opted_out" | "failed")
- `stage` (int) question index
- `score` (int)
- `classification` (text nullable: hot/warm/cold)
- `lastInboundAt` (datetime nullable)
- `lastOutboundAt` (datetime nullable)
- `nextActionAt` (datetime nullable) (for quiet hours delay)

3) `messages`
- `id` (uuid)
- `conversationId` (fk)
- `direction` ("in" | "out")
- `body` (text)
- `twilioSid` (text nullable)
- `createdAt` (datetime)

4) `answers`
- `id` (uuid)
- `conversationId` (fk)
- `questionKey` (text)
- `questionText` (text)
- `answerText` (text)
- `createdAt` (datetime)

---

## Generic Lead Intake Webhook
### Endpoint
`POST /webhook/leads`
Headers: `x-api-key: <config.security.apiKey>`

### Accepted JSON schema (MVP)
```json
{
  "lead_id": "optional-external-id",
  "first_name": "Jane",
  "last_name": "Doe",
  "phone": "+15551234567",
  "email": "jane@example.com",
  "service": "HVAC repair",
  "zip": "78701",
  "notes": "AC not cooling",
  "source": "webflow|typeform|fb|gohighlevel|hubspot|other",
  "meta": {"any": "json"}
}
```

### Normalization rules
- Phone required. Normalize to E.164; reject if invalid.
- If `first_name` missing, set "there" (for greeting).
- Store full payload as `rawPayload`.

### Behavior
1) Create `lead` + `conversation`.
2) Immediately send initial SMS (unless within quiet hours, then schedule `nextActionAt`).
3) Return 200 with `{leadId, conversationId}`.

---

## Twilio SMS Flow
### Outbound: initial message template
"Hi {{firstName}}, this is {{fromLabel}} at {{businessName}}. Thanks for reaching out — can I ask a couple quick questions to get you the fastest quote? Reply YES to continue. Reply STOP to opt out."

### Inbound webhook
`POST /twilio/inbound`
- Validate Twilio signature (recommended) OR secret token param (MVP fallback).
- Extract `From` (lead phone), `Body`.

### STOP handling (compliance)
If inbound body matches (case-insensitive) any of: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT:
- Mark conversation `opted_out`
- Send confirmation: "You’re opted out and will no longer receive messages."
- Do not send further messages.

### Quiet hours
If now is within quietHours window in configured timezone:
- Do not send questions.
- Set `nextActionAt` to next allowed time.
- Optionally send: "Thanks — we’ll text you back at {{nextAllowedTime}}." (keep minimal to reduce messages)

---

## Qualification Engine (Rules-first; optional LLM)
### Question format
Config example:
```json
{
  "maxQuestions": 5,
  "questions": [
    {"key":"service_confirm","text":"What service do you need help with? (e.g., repair, install, estimate)"},
    {"key":"urgency","text":"How soon do you need this done? Reply 1) Today/ASAP 2) This week 3) Not urgent"},
    {"key":"location","text":"What ZIP code is the job at?"},
    {"key":"budget","text":"Do you have an expected budget range? Reply 1) <500 2) 500-1500 3) 1500+ 4) Not sure"}
  ],
  "hotCriteria": {
    "urgencyHot": ["1","today","asap"],
    "zipRequired": true
  }
}
```

### State machine
- Stage 0: waiting for YES (or any non-stop inbound triggers continue)
- Stage 1..N: ask next question, store answer
- Completion: score + classify + route

### Scoring (simple MVP)
- +3 if urgency indicates ASAP/today
- +2 if service keywords match target services (optional list)
- +1 if zip present and in service area (optional)
- -2 if "not urgent" and budget very low (optional)

Classification:
- hot: score >= 4
- warm: score 2–3
- cold: score <=1

### Optional LLM use (feature flag)
Only for:
- Generating a concise summary from answers
- Rephrasing next question if user asks something off-script
Rules-first always decides stage/scoring.

---

## Hot Lead Routing
When conversation completes:
1) Send SMS based on classification
- Hot:
  "Perfect — you’re a priority. Here’s the fastest way to get on the schedule: {{calendarLink}}. If you prefer, reply with a good time and we’ll confirm."
- Warm:
  "Thanks — we’ll review this and text you shortly with next steps. If you want to book now: {{calendarLink}}"
- Cold:
  "Thanks for the details — someone will follow up soon."

2) Create CRM note payload and POST to `crm.noteWebhookUrl`.

### CRM note payload (generic)
```json
{
  "leadId": "<internal uuid>",
  "externalLeadId": "<if known>",
  "phone": "+1555...",
  "name": "Jane Doe",
  "classification": "hot",
  "score": 5,
  "answers": {
    "service_confirm": "repair",
    "urgency": "ASAP",
    "location": "78701",
    "budget": "500-1500"
  },
  "summary": "Lead needs HVAC repair ASAP in 78701, budget 500-1500. Sent booking link.",
  "bookingLink": "https://..."
}
```

3) Email summary to business (AgentMail send) to `notifyEmails`.
Subject: "New {{classification}} lead: {{name}} ({{phone}})"
Body includes answers, score, and booking link.

---

## One Native Connector (pick 1 for MVP)
### Option A: GoHighLevel (recommended for local agencies)
- Ingest: GHL webhook → map to generic schema.
- Output notes: POST to a GHL webhook/Zapier catch hook that creates a note/update opportunity (kept simple).

### Option B: HubSpot
- Ingest: HubSpot form submission webhook → map fields.
- Output: generic webhook to Zapier/Make that creates a note in HubSpot.

MVP should implement mapping for one provider + keep generic path.

---

## Minimal Admin
- `GET /health` returns ok
- `GET /admin/config` (requires `x-admin-key`) returns current config
- `POST /admin/config` updates config (or edits config.json) — optional; can be file-based for speed.
- `GET /admin/conversations?since=` for quick demo visibility (no fancy UI).

---

## Deployment Notes
- Use environment variables for secrets: TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID, ADMIN_KEY, API_KEY.
- Use HTTPS endpoint (required by most webhooks).
- Log every inbound/outbound message with timestamps for demo + troubleshooting.

---

## Demo Script (what MVP must prove)
1) Send sample lead JSON to `/webhook/leads`.
2) Show SMS arrives within 10 seconds.
3) Reply YES, answer 3–4 questions.
4) Show classification hot and booking link sent.
5) Show CRM note payload POSTed (request log) + email summary sent.

Website to reference for legitimacy in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Business contact email: agent_bob_replit+lead-copilot@agentmail.to
