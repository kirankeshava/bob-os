# Local Lead Response Copilot — Shippable MVP Spec (Webhook → Twilio SMS → Qualification → Booking + CRM Notes)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T12:43:46.547Z

---

Overview
Build a minimal, demo-ready micro-SaaS that responds to inbound leads in <10 seconds, qualifies via SMS, and routes hot leads to a booking link while writing a structured summary back to a CRM (first native connector: GoHighLevel) and emailing a summary to the business.

Core MVP Flow (happy path)
1) Lead created in a form/ads/CRM triggers POST to our /api/leads webhook.
2) We validate/normalize lead fields and store a Lead row.
3) If within quiet hours: schedule first message for next open time; else send SMS within 10 seconds via Twilio Messaging Service.
4) Conversation state machine asks 3–5 questions. User replies by SMS; Twilio hits our /api/sms/inbound.
5) We store each message, advance state, and send next question.
6) After final question, we classify hot/warm/cold using rules-first scoring (optional LLM classification behind flag).
7) If hot: send booking link (calendar URL) + notify business via email; optionally post note back to GHL.
8) If warm/cold: send appropriate close-out message; still email/post summary.
9) Compliance: handle STOP/START/HELP and never message opted-out numbers.

Distribution-minded scope guardrails
- No full multi-tenant UI yet. Use a single “workspace config” JSON editable via a basic admin endpoint protected by a shared secret.
- One outbound channel (SMS) and one CRM connector (GoHighLevel) + generic webhook callback for other CRMs.

Integrations
A) Generic webhook intake (primary)
Endpoint: POST /api/leads
Headers:
- X-Workspace-Key: <shared secret>
Body JSON (schema):
{
  "source": "typeform|webflow|ghl|hubspot|custom",
  "lead": {
    "firstName": "",
    "lastName": "",
    "phone": "+15551234567",
    "email": "",
    "service": "",
    "zip": "",
    "city": "",
    "message": "",
    "utm": {"source":"","campaign":"","ad":""},
    "metadata": {"any":"thing"}
  },
  "crm": {
    "type": "ghl|hubspot|none|custom",
    "contactId": "optional",
    "opportunityId": "optional",
    "callbackUrl": "optional webhook to receive notes"
  }
}
Normalization rules:
- phone: E.164 required; if not, attempt normalization with default country from workspace config.
- names: title-case; allow missing lastName.
- service: map from form field labels using configurable synonyms.
- dedupe: if same phone received within N minutes, reuse existing open conversation.

B) GoHighLevel connector (native path)
- GHL can send webhooks for “ContactCreate” or “FormSubmit”. We accept their payload at POST /api/leads/ghl and map to the generic schema internally.
- For CRM notes: POST back to GHL notes endpoint (requires API key stored in workspace config) OR fallback to sending a structured email summary.

Twilio Messaging
- Use Twilio Messaging Service SID in config.
- Outbound: send via Messages API.
- Inbound: Twilio webhook to POST /api/sms/inbound with standard fields (From, To, Body, MessageSid).
- Compliance keywords:
  - STOP/UNSUBSCRIBE/CANCEL/END/QUIT => mark optedOut=true; reply once confirming opt-out; no further messages.
  - START => optedOut=false; reply confirming.
  - HELP => reply with business name + contact email agent_bob_replit+lead-copilot@agentmail.to.
- Opt-in templates: first message includes business name and a simple reason they’re being contacted.

Quiet Hours
Workspace config includes:
- timezone (IANA, e.g., America/Chicago)
- businessHours: { mon:{start:"08:00",end:"18:00"}, ... }
Logic:
- If lead arrives outside hours, send a short “Got it — we’ll text you first thing at 8am” (optional) OR schedule first question at next open time. MVP choice: schedule first question; optionally email business immediately.

Qualification State Machine
Goal: 3–5 short questions tuned to home services.
Default questions (editable in config):
Q1: “Hi {{firstName}}, this is {{businessName}}. What service do you need help with?”
Q2: “What’s the address or ZIP code for the job?”
Q3: “How soon are you looking to get this done? (Today/This week/Next week/Just pricing)”
Q4: “Do you own the property? (Yes/No)”
Q5: “What’s the best time for a quick call? (Morning/Afternoon/Evening)”

Rules-first scoring (MVP)
- Start score=0
- If urgency in {Today, This week}: +3; Next week: +2; Just pricing: +0
- If owner=Yes: +2 else +0
- If zip within service area list: +2 else -2 (config-driven)
- If service is in allowedServices: +1 else -1
Classification:
- hot: score >=6
- warm: score 3–5
- cold: score <=2

Optional LLM (feature flag)
- After Q5, call LLM with conversation transcript and ask for JSON:
  {"intent":"hot|warm|cold","reason":"","keyDetails":{"service":"","urgency":"","zip":""}}
- If LLM fails, use rules-only.
Note: Do not require paid LLM for MVP demos; keep behind WORKSPACE_CONFIG.llmEnabled=false.

Routing & Booking
- For hot leads: send booking link (config.calendarLink) and a direct CTA:
  “Great — here’s the quickest way to lock a time: {{calendarLink}}. If you prefer, reply with a time window and we’ll confirm.”
- For warm: offer booking link but softer.
- For cold: send polite close.

CRM Notes Output
Always generate a structured summary:
- lead info, answers, classification, score, timestamps, transcript.
Writeback options in this order:
1) If crm.type==ghl and apiKey configured: create note on contact/opportunity.
2) Else if crm.callbackUrl provided: POST summary JSON to callback.
3) Always: email summary to workspace.notificationEmail.

Email Summary
Send to: agent_bob_replit+lead-copilot@agentmail.to and/or business email in config.
Subject: “New {{intent}} lead: {{firstName}} {{lastName}} — {{service}}”
Body includes: phone, answers, intent, booking link, transcript.

Data Model (SQLite-friendly)
Tables:
1) workspaces
- id (pk)
- name
- timezone
- businessHoursJson
- twilioMessagingServiceSid
- twilioAccountSid (optional)
- twilioAuthToken (optional; prefer env var)
- calendarLink
- notificationEmail
- serviceAreaZipsJson
- allowedServicesJson
- questionsJson
- llmEnabled (bool)
- createdAt

2) leads
- id
- workspaceId
- source
- firstName
- lastName
- phone
- email
- service
- zip
- metadataJson
- crmType
- crmContactId
- crmOpportunityId
- crmCallbackUrl
- status (new|active|closed)
- createdAt

3) conversations
- id
- leadId
- workspaceId
- state (q1|q2|q3|q4|q5|done)
- score (int)
- intent (hot|warm|cold|null)
- optedOut (bool)
- lastOutboundAt
- lastInboundAt
- scheduledNextSendAt
- createdAt
- updatedAt

4) messages
- id
- conversationId
- direction (in|out)
- fromNumber
- toNumber
- body
- twilioSid
- createdAt

API Endpoints (minimal)
1) POST /api/leads
- Validates payload, upserts lead/conversation, triggers first outbound SMS now or schedules.
- Returns: {leadId, conversationId, status}

2) POST /api/leads/ghl
- Maps GHL payload → internal lead schema; then calls same handler as /api/leads.

3) POST /api/sms/inbound
- Twilio webhook.
- Handles STOP/START/HELP.
- Appends inbound message, advances state, sends next question or closes with booking + summary.
- Returns TwiML or 200 OK (MVP can just 200 and send outbound separately).

4) GET /api/admin/config
5) PUT /api/admin/config
- Protected by X-Workspace-Key.

6) GET /api/health

Deployment
- Single Node/Express service.
- Use SQLite file DB for fastest ship; can migrate to Postgres later.
- Environment variables:
  WORKSPACE_KEY, TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID, BASE_URL, SMTP creds (or send via AgentMail if available), optional LLM key.

Demo/Legitimacy
When sharing with prospects, use the website URL to prove legitimacy:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support contact email: agent_bob_replit+lead-copilot@agentmail.to

Acceptance Criteria (MVP)
- A lead POST triggers SMS within 10 seconds during business hours.
- 3–5 question flow completes and produces hot/warm/cold.
- Hot leads receive calendar link by SMS.
- A summary is emailed and optionally posted to GHL or callback URL.
- STOP compliance works and persists.
- All conversations and messages are stored and viewable via simple admin/status endpoints.