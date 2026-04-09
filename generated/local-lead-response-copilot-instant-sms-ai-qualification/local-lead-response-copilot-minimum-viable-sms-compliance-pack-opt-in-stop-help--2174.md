# Local Lead Response Copilot — Minimum‑Viable SMS Compliance Pack (Opt‑In + STOP/HELP + Quiet Hours + Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T20:03:30.909Z

---

Business legitimacy links (use in all customer-facing copy)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

Goal (wartime/MVC)
Ship only what prevents carrier enforcement and customer objections during pilots:
1) Explicit opt-in disclosure at point of capture
2) STOP/HELP handling with global suppression
3) Quiet hours by lead timezone + queued send
4) Consent logging fields sufficient for an audit

A) Copy/paste opt-in language (by channel)

1) Webflow form (below submit button)
By submitting this form, you agree to receive SMS text messages from [BUSINESS NAME] about your request, including appointment scheduling and follow-ups. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.

Optional (recommended) links line:
Privacy: [PRIVACY_URL]  Terms: [TERMS_URL]

2) Typeform (Disclaimer block right before Submit)
Consent to text messages: By submitting, you agree that [BUSINESS NAME] may text you about your request (including scheduling). Msg frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL]

3) Meta/Facebook Lead Ads ("Custom disclaimer" / "Privacy policy")
Add to the question/description area:
By tapping Submit, you agree to receive SMS texts from [BUSINESS NAME] about your inquiry, including scheduling. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.

Set the required “Privacy Policy” URL to: [PRIVACY_URL]
(Also include Terms URL in the ad text if possible: [TERMS_URL])

B) First-message templates (safe defaults)

1) Immediate first response (after form submission)
Hi {{first_name}} — this is {{agent_name}} with {{business_name}}. Got your request for {{service}}. What’s the address (or ZIP) for the job?
Reply STOP to opt out, HELP for help.

2) Qualification follow-up (if no response after 3–5 minutes)
Quick question so we can book you correctly: is this needed today, this week, or later?
Reply STOP to opt out, HELP for help.

3) Booking prompt (after qualifying)
Thanks — we can get you scheduled. What day/time works best?
Reply STOP to opt out, HELP for help.

Content do’s/don’ts (deliverability)
- Do: short, specific, conversational; reference “your request” not “promotion”.
- Avoid: ALL CAPS, excessive punctuation!!!, shortened/obfuscated links, “free/guarantee/act now”, and repeated identical messages across many leads.
- If including links, use your own domain when possible; keep to 0–1 link per message.

C) STOP/HELP handling (implementation spec)

1) Keywords to recognize (case-insensitive; trim punctuation)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP, INFO

2) STOP behavior (must be global)
When inbound body matches any STOP keyword:
- Immediately mark recipient phone as “suppressed=true” (global across all clients/campaigns in your system to prevent accidental re-texting).
- Send ONE confirmation message:
  “You’re opted out and will no longer receive texts from {{business_name}}. Reply START to re-subscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
- Block all future outbound messages to that number unless they explicitly re-opt-in.

3) HELP behavior
When inbound body matches HELP/INFO:
- Send:
  “{{business_name}} texting help: we text about your request/appointments. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

4) START (optional re-subscribe)
If inbound body equals START/YES (choose one policy and document):
- Only re-enable if there is a recorded prior opt-in OR you immediately send a confirmation requiring explicit consent.
- Suggested confirmation:
  “You’re re-subscribed for texts about your request. Reply STOP to opt out.”

5) Logging (minimum fields)
For every inbound/outbound message store:
- timestamp (UTC)
- to_number, from_number
- message_body
- direction (inbound/outbound)
- channel/source (webflow/typeform/meta/manual)
- opt_in_status at send time (true/false)
- suppression_reason (STOP/Carrier/etc.)
- related_lead_id

D) Quiet hours by timezone (implementation spec)

Default rule (pilot-safe)
- Do not send automated outbound messages between 9:00 PM and 8:00 AM in the LEAD’S local timezone.
- If a lead submits during quiet hours: queue the first message and send at 8:05 AM local time.

Timezone resolution order
1) Explicit timezone captured from form (preferred)
2) Infer from lead ZIP/postal code (US)
3) Infer from area code (fallback)
4) If unknown: treat as business timezone and apply quiet hours conservatively

Edge cases
- DST: rely on timezone database (IANA tz). Store tz name (e.g., America/Chicago), not offset.
- Manual user send: allow override only for authenticated staff and log “quiet_hours_override=true”.

E) Agency handoff (what partners do in 15 minutes)

1) Update the client’s lead form
- Add the opt-in disclosure snippet (Section A).
- Ensure form captures: first name, phone, service needed, address/ZIP.

2) Connect the form to Lead Response Copilot
- Route form submissions into the system (Zapier/webhook/native). Include “source” and timestamp.

3) Verify compliance in 10 minutes (go-live checklist)
- Submit a test lead with your own phone → confirm first message includes STOP/HELP line.
- Reply HELP → confirm help message returns.
- Reply STOP → confirm opt-out confirmation returns.
- Trigger another message attempt → confirm it is blocked and logged as suppressed.
- Submit after 9 PM in your timezone → confirm message is queued for morning.

If any step fails, pause sending and email agent_bob_replit+lead-copilot@agentmail.to with:
- your test phone number
- approximate timestamps
- screenshots of messages

F) Twilio/A2P note (non-spend, pilot guidance)
- Use a Twilio Messaging Service (even in pilots) for opt-out management consistency.
- If using US 10DLC long codes at scale, plan to complete A2P Brand + Campaign registration before ramping volume. For pilots, keep volume low, keep templates consistent, and avoid link-heavy messaging.

This MVC pack is sufficient to answer the common agency/customer objections (“Do you have consent language?”, “Do you handle STOP?”, “Do you avoid texting at night?”, “Can you prove consent?”) and keep deliverability stable during first pilots.