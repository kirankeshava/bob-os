# Local Lead Response Copilot — Pilot Launch Compliance Sheet (MVP Opt‑In + STOP/HELP + Quiet Hours + Consent Logging + Agency Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:13:54.920Z

---

Purpose: This is the minimum viable compliance/deliverability setup to safely launch pilots for Local Lead Response Copilot (instant SMS + AI qualification) without creating carrier/TCPA issues or onboarding objections.

Support + legitimacy:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to
- Terms URL: [PASTE LIVE TERMS URL]
- Privacy URL: [PASTE LIVE PRIVACY URL]

1) REQUIRED OPT‑IN LANGUAGE (copy/paste)
A) Webflow/Website form (checkbox + short disclosure)
- Checkbox label (unchecked by default):
  “I agree to receive text messages about my request.”
- Disclosure under checkbox (small text):
  “By submitting, you agree to receive text messages (SMS) from {BUSINESS NAME} about your inquiry, including appointment scheduling and service updates. Msg & data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS LINK] Privacy: [PRIVACY LINK].”
- Implementation notes:
  - Must store: timestamp, page URL, form name, IP (if available), checkbox=true, phone number, and the exact disclosure text version.

B) Typeform (statement + required ‘Yes’ question)
- Question: “Do you agree to receive text messages about your request?” (Yes/No)
- Description:
  “Texts may include scheduling and follow-up about your inquiry. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS LINK] Privacy: [PRIVACY LINK].”
- Only send SMS if answer == Yes.

C) Meta/Facebook Lead Ads (primary text + privacy policy + custom disclaimer)
- Lead form ‘Disclaimer’ (custom):
  “By submitting, you agree to receive text messages from {BUSINESS NAME} about your request. Msg & data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS LINK] Privacy: [PRIVACY LINK].”
- Ensure the lead form links to your Privacy Policy.

2) FIRST MESSAGE TEMPLATE (MVP compliant)
Send immediately after lead capture (speed-to-lead), but only if consent captured.
Template:
“Hi {first_name} — it’s {agent_name} with {business_name}. Got your request for {service}. A couple quick questions so we can help you faster. Is this for (A) repair, (B) replacement, or (C) quote? Reply A/B/C. Reply STOP to opt out.”
Guidelines:
- Avoid ALL CAPS, excessive punctuation, repeated links, and “free/guarantee/urgent act now” phrasing.
- Keep links to a minimum; if needed, use one branded domain.

3) STOP / HELP HANDLING (MVP rules)
A) Keywords (case-insensitive, strip punctuation):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
B) On receiving STOP keyword:
- Immediately mark phone as ‘Do Not Text’ (global suppression across all locations/subaccounts).
- Send one confirmation text (only once per STOP event):
  “You’re unsubscribed and will no longer receive texts from {business_name}. Reply START to re-subscribe.”
- Block all future outbound messages to that phone unless START received with new consent basis.
C) HELP keyword:
- Do not unsubscribe.
- Respond:
  “{business_name} texting support. For help email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
D) START keyword (optional re-subscribe):
- Only re-enable if you have a valid consent record or you capture fresh consent.
- Confirmation:
  “You’re re-subscribed. Message frequency varies. Reply STOP to opt out.”

4) QUIET HOURS (MVP spec)
Objective: do not send marketing/qualification texts during typical quiet hours; queue and send next allowed window.
- Default sending window (local time of the lead): 8:00am–8:00pm.
- Timezone resolution order:
  1) Explicit timezone from form (if collected)
  2) Area code lookup (phone → likely timezone)
  3) Lead IP geo (if available)
  4) Fallback: business’s timezone
- If a lead arrives outside window:
  - Send nothing immediately.
  - Queue the first message for next local 8:00am.
  - Store “queued_due_to_quiet_hours=true” in message metadata.
- Exception (optional for true emergencies): allow manual override by business user only (never automatic).

5) CONSENT LOGGING (MVP schema)
Store a consent record per lead with:
- phone_e164
- consent_status: granted/denied/unknown
- consent_source: webflow/typeform/meta/other
- consent_timestamp_utc
- consent_language_version (store the full text shown to user)
- form_url_or_ad_id
- capture_method: checkbox/yes_no/meta_disclaimer
- lead_timezone (resolved) and resolution_method
- STOP status + timestamp if applicable
Purpose: if a carrier, Twilio, or customer disputes consent, you can produce records quickly.

6) AGENCY GO‑LIVE CHECKLIST (30 minutes)
- Step 1: Put the opt-in checkbox/Yes question/live disclaimer in the lead source (Webflow/Typeform/Meta).
- Step 2: Ensure the form passes consent=true into the webhook/Zapier payload.
- Step 3: Paste the first message template (Section 2) into the campaign/workflow.
- Step 4: Verify STOP/HELP:
  - Text “HELP” → receives help response.
  - Text “STOP” → receives unsubscribe confirmation.
  - After STOP, attempt outbound → must be blocked.
- Step 5: Verify quiet hours:
  - Set a test lead timezone and simulate after-hours lead → message must queue for next 8:00am.
- Step 6: Confirm support/legitimacy fields are visible in proposals/onboarding:
  - Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
  - Support: agent_bob_replit+lead-copilot@agentmail.to

7) TWILIO DELIVERABILITY NOTE (do-now vs later)
- Pilot safe: use a Messaging Service, consistent sender(s), and the content guidelines above.
- Scale step: register A2P 10DLC Brand + Campaign if using long codes for US traffic. Do this before high volume to reduce filtering and account risk.

This sheet is intentionally minimal: it covers the exact items that most commonly create pilot churn (unclear consent, missing STOP handling, after-hours texting) while keeping implementation lightweight.