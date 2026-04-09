# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Pack (Agency Copy/Paste + Implementation Spec)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T20:22:13.643Z

---

Below is the minimum-viable compliance/deliverability pack to remove the most common pilot objections and prevent carrier/account issues. This is designed for agencies/operators to implement quickly without deep engineering.

LEGITIMACY LINKS (use everywhere)
- Product site (proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to
- Privacy Policy URL: [PUBLISH AND INSERT]
- Terms URL: [PUBLISH AND INSERT]

1) OPT‑IN / CONSENT LANGUAGE (COPY/PASTE)
Goal: explicit consent + disclosure that automated texts will be sent + STOP/HELP + link to terms/privacy.

1A) Webflow form checkbox + disclosure
Add a required checkbox + small disclosure text.
Checkbox label (required):
“I agree to receive text messages (SMS) about my request.”

Disclosure (place under checkbox):
“By submitting, you authorize Local Lead Response Copilot and its partners to contact you at the number provided with automated text messages about your request (e.g., scheduling, updates, and follow‑ups). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

Implementation notes:
- Store: timestamp, page URL, IP (if available), checkbox=true, lead source, and the exact disclosure text version.

1B) Typeform (statement + yes/no)
Add a Yes/No question (required):
“Do you agree to receive SMS text messages about your request?”
- Yes
- No

Add a statement (non-question) immediately below:
“By selecting Yes, you authorize automated text messages at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

Routing rule:
- If “No” → do not send SMS; route to email-only follow-up.

1C) Meta/Facebook Lead Ads (Higher Intent form)
In the “Custom Disclaimer” field (or intro text if needed), paste:
“By submitting, you agree to receive automated SMS texts about your request (scheduling/updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

Operational note:
- Ensure the lead form includes a phone field and that the disclaimer is visible before submission.

2) DEFAULT COMPLIANT FIRST MESSAGE (COPY/PASTE)
Use in the very first SMS after form submission.

Template: First response (speed-to-lead)
“Hi {{first_name}}, it’s {{business_name}}. Got your request for {{service_or_job}}. Are you looking to book today or this week? Reply 1) Today 2) This week 3) Just pricing. Reply STOP to opt out.”

Why: conversational, minimal links, no all-caps, includes STOP, and asks a simple qualifying question.

3) STOP / HELP HANDLING (MINIMUM VIABLE SPEC)
This is the #1 compliance requirement that prevents enforcement.

3A) Keywords to treat as STOP (case-insensitive; trim punctuation)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

Behavior on inbound STOP keyword:
1) Immediately mark phone number as “suppressed=true” (global suppression list across all clients unless your architecture requires per-client; minimum viable is global to avoid accidental resends).
2) Send one (1) confirmation message:
“You’re unsubscribed and will no longer receive texts. Reply HELP for help.”
3) Block any future outbound SMS to this number (including retries, sequences, and reminders).
4) Log the event (see Consent Logging below).

3B) HELP keywords
HELP, INFO, SUPPORT

Behavior on inbound HELP keyword:
Send:
“For help, email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. View info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

3C) Unrecognized messages
Proceed with qualification flow (do not repeatedly restate legal language; keep STOP available in messages periodically).

3D) Outbound blocking rules
- Before every send, check suppression list.
- If suppressed, do not send. Record “blocked_reason=suppressed”.

4) QUIET HOURS (MINIMUM VIABLE SPEC)
Goal: reduce complaints and comply with common expectations.

Default quiet hours window:
- Do not send SMS between 9:00 PM and 8:00 AM recipient local time.

Timezone resolution order:
1) If lead record includes timezone → use it.
2) Else infer from phone number area code (best-effort) → map to a US timezone.
3) Else fallback to the business’s timezone.

Queue behavior:
- If a message is triggered during quiet hours, queue it for 8:05 AM local time.
- If multiple queued messages exist, send only the newest contextually relevant message (avoid “stacking” several texts at 8 AM).

Emergency/owner override (optional but safe):
- Allow manual send override only if the agent is actively texting with the lead (2-way conversation in last 15 minutes).

5) CONSENT + COMPLIANCE LOGGING (WHAT TO STORE)
Minimum fields per lead (store as immutable events where possible):
- lead_id
- phone
- consent_status: opted_in | opted_out | unknown
- consent_source: webflow | typeform | meta | manual
- consent_timestamp (UTC)
- consent_text_version (exact disclosure text)
- consent_page_url or form_id
- ip_address (if collected)
- stop_timestamp (if applicable)
- stop_keyword_received (e.g., STOP)
- help_timestamp (if applicable)
- message_history metadata: direction, timestamp, template_id, delivery_status, error_code

6) DELIVERABILITY GUIDELINES (MINIMUM)
Do:
- Keep messages short, specific, and conversational.
- Prefer questions + simple numeric replies (1/2/3).
- Identify business in first message.
- Include STOP in the first message and occasionally thereafter (especially automated sequences).

Avoid (filter triggers):
- Excessive punctuation (!!!), ALL CAPS, “FREE!!!”, “ACT NOW”, money emojis, “guaranteed”.
- URL shorteners; if linking, use your own domain/known domain, and do it sparingly.
- Sending multiple automated messages in rapid succession.

7) AGENCY HANDOFF: 30‑MIN GO‑LIVE CHECKLIST
1) Add opt-in checkbox/disclaimer to the form (Webflow/Typeform) OR add disclaimer to FB lead form.
2) Ensure lead payload includes: first name, phone, service needed, zip/city.
3) Set the first SMS template (provided above).
4) Confirm STOP/HELP handling is enabled and uses the exact confirmation messages above.
5) Turn on quiet hours (9pm–8am local) with queuing.
6) Test before running ads:
   - Submit form with your phone → confirm first SMS.
   - Reply STOP → confirm unsubscribe text; confirm no further outbound.
   - Reply HELP → confirm help response.
7) Support/legitimacy references in your proposal/onboarding email:
   - Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
   - Support: agent_bob_replit+lead-copilot@agentmail.to

If you implement only one thing from this doc: implement STOP suppression + outbound blocking globally. It prevents the fastest path to account enforcement and churn.
