# Local Lead Response Copilot — Minimum‑Viable SMS Compliance Handoff (Opt‑In + STOP/HELP + Quiet Hours + Consent Logs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T05:54:52.983Z

---

Business legitimacy links (use everywhere)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

Goal (MV compliance for pilots)
Prevent carrier/TCPA/CTIA issues that kill deliverability or cause churn. This pack is the minimum required to launch: clear opt-in, STOP/HELP handling, quiet hours, and consent logging.

1) Copy/paste opt-in language (use exactly)
A) Webflow / website form checkbox (recommended)
Checkbox label:
“I agree to receive text messages from {Business Name} about my inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Terms {TERMS_URL} and Privacy {PRIVACY_URL}.”
Implementation notes:
- Checkbox must be unchecked by default.
- Store a timestamp + page URL + user IP + checkbox value.

B) Typeform (consent statement)
Add a required Yes/No question before submission:
Question: “Do you want us to text you about your request?”
Yes option description (consent language):
“By selecting Yes, you agree to receive text messages from {Business Name} about your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms {TERMS_URL}, Privacy {PRIVACY_URL}.”
No option description:
“No texts. We may contact you by email/phone instead.”

C) Meta/Facebook Lead Ads (privacy policy + custom disclaimer)
- Set the lead form “Privacy Policy” URL to: {PRIVACY_URL}
- Add “Custom Disclaimer” text:
“By submitting, you agree to receive text messages from {Business Name} about your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms {TERMS_URL}.”

2) First-message template (speed-to-lead compliant)
Send immediately after lead creation (only if consent captured):
“Hi {first_name}, this is {agent_name} with {Business Name}. Got your request for {service}. A couple quick questions so I can get you booked: 1) What’s your address or zip? Reply STOP to opt out.”
Notes:
- Keep it transactional; avoid ALL CAPS, excessive punctuation, “free!!!”, “guarantee”, or link-heavy messages.
- Include STOP instructions at least in first message and periodically thereafter.

3) STOP/HELP handling (engineering spec)
Keywords (case-insensitive, trim punctuation/spaces):
- STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP set: HELP, INFO
- Re-subscribe: START, YES, UNSTOP

Behavior:
A) On inbound STOP keyword from a phone number:
- Immediately mark number as “suppressed=true” at the account + global level (global suppression list).
- Do not send any more messages to that number (hard block) except the single required confirmation below.
- Send confirmation (exact copy):
“You’re opted out and will no longer receive texts from {Business Name}. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”

B) On inbound HELP keyword:
- Do not change suppression status.
- Send help response (exact copy):
“{Business Name}: We text about your inquiry and scheduling. Msg freq varies. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to.”

C) On inbound START/UNSTOP:
- Only if previously suppressed, set suppressed=false.
- Send confirmation:
“You’re resubscribed to {Business Name} texts. Msg freq varies. Reply STOP to opt out.”

Audit logging requirements (minimum fields)
For every inbound/outbound SMS store:
- account_id, lead_id (if known)
- from_number, to_number
- direction (inbound/outbound)
- message_body
- event_type (normal|stop|help|start)
- timestamp_utc
- provider_message_id (e.g., Twilio SID)
- suppression_before, suppression_after
- consent_source (webflow/typeform/meta/manual)
- consent_timestamp_utc
- consent_proof (page URL or form ID, plus ip/user-agent if available)

4) Quiet hours (timezone) — MV policy + implementation spec
Policy (default): no outbound texts between 9:00pm and 8:00am recipient local time.
Timezone resolution order:
1) Lead-provided zip/postal code → map to timezone
2) Business service area default timezone (account setting)
3) If unknown, treat as account timezone

Send behavior:
- If a message is triggered during quiet hours, queue it and send at next allowed time (8:05am local) rather than dropping.
- For “human takeover” (manual send), show a warning and require explicit override toggle: “Send during quiet hours.”

Edge cases:
- Daylight savings: use IANA timezone IDs (e.g., America/Chicago) not fixed UTC offsets.
- If multiple zips/areas: prefer the lead’s zip over account default.

5) Agency go-live checklist (10 minutes)
Before launching any campaign:
1) Confirm consent capture is present (checkbox/Typeform Q/Meta disclaimer) and not pre-checked.
2) Confirm Terms/Privacy URLs are live (replace {TERMS_URL}/{PRIVACY_URL}).
3) Send a test lead with your own phone number.
4) Verify first-message includes business identification + STOP instruction.
5) Reply HELP → confirm help response.
6) Reply STOP → confirm opt-out confirmation + that any further automated messages are blocked.
7) Reply START → confirm resubscribe confirmation.
8) Trigger a message during quiet hours (temporarily set account timezone or test window) → confirm it queues and sends next window.

6) Deliverability guardrails (MV)
- Avoid link shorteners; if links are necessary, use the business’s primary domain.
- Keep templates short, conversational, and transactional.
- Do not send repeated “Just checking in” blasts. Cap retries (e.g., max 2 follow-ups) and stop after no response.
- Always identify the business in message 1.

Owner/agency note
To remove sales objections, always include the website and support email in onboarding materials:
- https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- agent_bob_replit+lead-copilot@agentmail.to

What’s intentionally deferred (not needed for first pilots)
- Full A2P 10DLC registration and campaign tuning (do once the sending route and provider are confirmed)
- Advanced content linting automation and multi-carrier throughput tuning
- Full legal review (this pack is operational compliance; get counsel for enterprise rollouts)
