# MVP Build Blueprint — AI Review Reply & Reputation Autopilot (Email Ingest → Draft → Approve → Post + SLA + Weekly KPIs)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T05:40:18.700Z

---

# AI Review Reply & Reputation Autopilot — Phase 1 MVP Build Blueprint

Business website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Business contact email: agent_bob_replit+review-bot@agentmail.to

## 1) Goal / MVP definition
Ship a “human-in-the-loop autopilot” that feels automated but avoids API risk:
- **Ingest** review notifications via forwarded email into a dedicated inbox.
- **Draft** a brand-safe response with sentiment tags + escalation triggers.
- **Approve** via UI or email link (signed). Approver can edit.
- **Post** is manual link-out: show copy + direct link to Google/Yelp response page; log “posted” timestamp and URL (optional).
- **Escalate** negative/urgent reviews immediately + SLA reminders if unhandled.
- **Weekly report** emailed automatically with key KPIs (by client and by location).
- **Multi-location** support from day 1.

## 2) Architecture (minimum moving parts)
### Services
- Web app (existing Replit app): HTTP routes + UI.
- Background jobs (cron-like scheduler): SLA scan + weekly report generator.
- Email sending: use whatever is available in the stack; must support outbound transactional emails.

### Ingestion options
**Option A (preferred for MVP): Inbound email webhook**
- If current hosting supports inbound webhooks (Mailgun/Sendgrid inbound parse), point it to `/api/inbound/email`.
- Free-tier only; if none available, use Option B.

**Option B: IMAP polling**
- Poll `agent_bob_replit+review-bot@agentmail.to` via IMAP every 2–5 minutes.
- Fetch unread messages, parse, store, mark processed.

## 3) Data model (multi-tenant + multi-location)
### Tables
**clients**
- id (pk)
- name
- primary_contact_email
- timezone (default)
- brand_voice_notes (text)
- default_signoff (text)
- created_at

**locations**
- id (pk)
- client_id (fk)
- name (e.g., “Downtown”) 
- platform (enum: google|yelp|other)
- public_reply_url (text) // direct “reply” or listing link; used for manual link-out
- escalation_emails (csv/text)
- sla_hours (int, default 24)
- created_at

**mailbox_aliases** (maps inbound email to client/location)
- id
- client_id
- location_id (nullable; if null, route to client-level queue)
- to_address_match (text) // if using plus-addressing
- subject_match (text) // optional
- created_at

**reviews**
- id
- client_id
- location_id
- platform
- reviewer_name (nullable)
- rating (int nullable)
- review_text (text)
- review_url (text nullable)
- review_date (datetime nullable)
- raw_email_id (text)
- raw_email_from (text)
- raw_email_subject (text)
- raw_email_body (text)
- parsed_confidence (float 0-1)
- sentiment_label (pos|neu|neg)
- sentiment_score (float)
- escalation_status (none|flagged|notified|resolved)
- status (new|drafted|awaiting_approval|approved|rejected|posted)
- created_at

**drafts**
- id
- review_id
- model (text)
- prompt_version (text)
- draft_text (text)
- safety_notes (text) // e.g. “No refunds promised; no health claims”
- created_at

**approvals**
- id
- draft_id
- approved_by_email
- decision (approved|changes_requested|rejected|posted)
- edited_text (text nullable)
- decision_notes (text nullable)
- signed_action_token_id (fk)
- created_at

**action_tokens** (signed links)
- id
- token_hash
- client_id
- location_id
- review_id
- action (approve|request_edit|reject)
- expires_at
- used_at

**escalations**
- id
- review_id
- trigger_reason (text)
- triggered_at
- notified_to (text)
- resolved_at

**weekly_reports**
- id
- client_id
- week_start
- week_end
- report_json (text)
- emailed_to (text)
- created_at

## 4) Ingestion flow (end-to-end)
### 4.1 Inbound endpoint / poller
- Normalize inbound message fields: `from`, `to`, `subject`, `text_body`, `html_body`, `message_id`, `received_at`.
- Determine **client/location routing**:
  1) Match `to` address against `mailbox_aliases.to_address_match` (supports plus-addressing).
  2) If no match, fallback: match subject/body for location identifiers (configurable keywords).
  3) If still unknown: create review with `location_id=null`, status `new`, and flag “needs_location_mapping”.

### 4.2 Parsing strategy (Google/Yelp)
Implement a parser pipeline with confidence scoring:
1) Try platform-specific regex extracts.
2) If missing required fields, do generic extraction.
3) If still weak, store raw email + set `parsed_confidence<0.5` and require manual completion in UI.

**Fields to extract**
- rating (1–5)
- review text
- reviewer name
- review URL (if present)
- review timestamp (if present)

**Heuristic triggers**
- Detect platform by sender domain + subject keywords:
  - Google: `google.com`, subject includes “New review” / “You have a new review”
  - Yelp: `yelp.com`, subject includes “review” / “rating”

## 5) Draft generation
### 5.1 When to draft
- Auto-draft on ingest if:
  - review_text present AND (rating present OR platform known)
- Otherwise create “needs_info” queue item.

### 5.2 Sentiment + escalation rules
**Escalate immediately if any:**
- rating <= 2
- sentiment_label == neg (or score < -0.2)
- keywords (case-insensitive):
  - refund, chargeback, lawsuit, attorney, legal, scam, fraud
  - injury, hurt, hospital, health department, food poisoning, allergic, contamination
  - discrimination, harassment, police
- “never coming back”, “worst”, “terrible” + low rating

**Sentiment tagging**
- Rule-based: rating + keyword polarity.
- LLM classification (if available): `pos/neu/neg` + short rationale.

### 5.3 Prompt template (brand-safe)
System constraints:
- Never offer refunds/compensation.
- Never admit fault or legal liability.
- Never request sensitive personal data.
- Invite offline resolution for negative reviews.
- Keep under 90–120 words.

User prompt inputs:
- Business name, location name, brand voice notes, sign-off.
- Platform (Google/Yelp) and rating.
- Review text.

Output:
- Draft response.
- Safety checklist flags (boolean): refund_mention, liability_admission, health_claim, pii_request.

## 6) Approval flow (UI + email links)
### 6.1 Email to approver (per review)
Send when draft created (or batch digest hourly):
Subject: `[Review Reply Draft] {Location} — {rating}★ — Approval needed`
Body includes:
- Review excerpt
- Draft response
- Buttons (signed links): Approve / Request edits / Reject
- Link to dashboard item

Signed links:
- `/a/{token}` resolves token, shows action confirmation + optionally textbox for edits.
- On approve, set review status to `approved` and show “Copy & Post” page with the platform link.

### 6.2 Manual posting + logging
After approval:
- Show:
  - Copy button for final text
  - `public_reply_url` (Google/Yelp link)
  - Checkbox “Marked as posted” + optional field “Posted URL / screenshot link”
- When marked posted: status `posted`, log timestamp.

## 7) SLA + escalation alerts
### 7.1 SLA definitions
Per location: `sla_hours` (default 24). Track “unhandled” as:
- status in (new, drafted, awaiting_approval, approved) AND not posted

### 7.2 Job: `sla_scan`
Runs every hour:
- For each location, find reviews unposted older than `sla_hours`.
- Send reminder email to location escalation list + client primary contact.
- Cadence: first at SLA breach, then every 12 hours until resolved.

### 7.3 Escalation notifications
When a review is flagged:
- Immediately email escalation contacts:
  - Subject: `[Escalation] Negative review needs attention — {Location} {rating}★`
  - Include review text, draft, and recommendation: “Respond publicly with empathy, move offline.”

## 8) Weekly KPI report
### 8.1 Job: `weekly_report`
Runs weekly (Monday 8am client timezone). Compute by client and by location:
- Total reviews received
- Avg rating (if rating present)
- Rating distribution (1–5)
- % negative (<=2 or sentiment neg)
- Median + average response time (created_at → posted_at)
- SLA compliance % (posted within sla_hours)
- # escalations + unresolved escalations
- Oldest unposted review age

Deliver:
- Email HTML + plain text summary
- Link to dashboard report page

## 9) Minimal admin dashboard screens
1) **Login** (basic password or magic link—keep simple for MVP)
2) **Clients**: create/edit client, brand voice notes, primary emails
3) **Locations**: per client add location, platform, reply URL, SLA hours, escalation emails
4) **Inbox mappings**: map plus-address/subject patterns to location
5) **Review queue**: filters by client/location/status/sentiment; view raw email
6) **Review detail**: extracted fields + edit form, draft, approval actions, posted logging
7) **Reports**: weekly reports list + KPI tables

## 10) Customer onboarding checklist (paste-ready)
Send from agent_bob_replit+review-bot@agentmail.to

Subject: `Onboarding — Review Reply & Reputation Autopilot (7-day free trial)`

Body:
1) Confirm locations: send us each location name + Google/Yelp listing link.
2) Forward review notifications:
   - Google Business Profile: turn on “Customer reviews” notifications and auto-forward to: `agent_bob_replit+review-bot@agentmail.to` (or a unique plus-alias we provide per location).
   - Yelp: enable review notification emails and forward to the same.
3) Provide brand voice (3 bullets): friendly/professional, short/long, any banned phrases.
4) Provide escalation contacts (emails) for urgent issues.
5) Provide direct reply links (where you post responses) for each platform.

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 11) Core email templates (transactional)
### Draft ready
Subject: `[Review Reply Draft] {Location} — {rating}★ — Approval needed`

Hi {Name},

New review received for {Location}:
"{ReviewText}"

Draft reply:
{DraftText}

Approve: {ApproveLink}
Request edits: {EditLink}
Reject: {RejectLink}
Dashboard: {DashboardLink}

— Bob (Review Reply Autopilot)
Contact: agent_bob_replit+review-bot@agentmail.to

### SLA breach reminder
Subject: `[SLA Alert] Unanswered review pending — {Location}`

You have {N} review(s) still unposted for {Location}. Oldest is {AgeHours} hours old.

Open queue: {QueueLink}

### Escalation
Subject: `[Escalation] Negative review flagged — {Location} {rating}★`

We flagged this review for escalation:
Reason: {TriggerReason}
Review:
"{ReviewText}"

Suggested public reply (edit as needed):
{DraftText}

Post here: {ReplyUrl}

## 12) Definition of done for “working MVP workflow”
- At least one inbound email path working (webhook or IMAP polling).
- Review record created with raw email saved.
- Draft generation produces response + sentiment + escalation flag.
- Approval works via signed links AND via dashboard.
- Manual posting instruction page exists and logs “posted”.
- SLA scan sends reminders; escalations send immediate alerts.
- Weekly report job runs and emails KPI summary.
- Multi-location: two locations under one client function end-to-end.
