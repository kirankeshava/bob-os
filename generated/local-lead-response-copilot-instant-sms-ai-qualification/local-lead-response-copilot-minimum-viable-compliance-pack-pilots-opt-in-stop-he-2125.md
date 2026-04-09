# Local Lead Response Copilot — Minimum Viable Compliance Pack (Pilots): Opt‑In + STOP/HELP + Quiet Hours + Consent Logging + Agency Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T19:49:41.058Z

---

Overview (what this pack is)
This is the minimum viable compliance + deliverability setup needed to launch pilots safely for Local Lead Response Copilot (instant SMS + AI qualification). It is designed to remove the most common agency/client objections and prevent carrier/Twilio enforcement issues, without slowing distribution.

Legitimacy links (use in any client-facing materials)
- Product site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Copy/paste opt-in language (minimum viable)
Important: Do not send SMS unless the lead is informed they will receive texts and that message/data rates may apply.

A) Webflow / website form checkbox (recommended)
Add a required checkbox with this label:
“I agree to receive text messages from [Business Name] about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”

Add helper text under the form (or near submit button):
“By submitting, you consent to receive SMS/phone contact from [Business Name] regarding your inquiry. Consent is not a condition of purchase. See our terms & privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (publish Terms/Privacy pages and replace with final URLs when available).”

Store these fields from the form submission:
- sms_opt_in = true
- opt_in_text (the exact checkbox label shown)
- source_url (page URL)
- timestamp
- ip_address (if available)

B) Typeform (statement + required Yes)
Add a statement:
“We’ll text you about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Then add a required multiple choice:
“Do you agree to receive text messages about your request?” Options: “Yes” / “No”
Only send SMS if “Yes”. Log the question text + the answer.

C) Meta/Facebook Lead Ads (question + disclaimer)
In the Lead Form:
- Add a custom question: “Do you agree to receive text messages about your request?” Yes/No
- Add a disclaimer (or in the privacy policy section):
“By submitting, you agree to receive SMS from [Business Name] about your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Only send SMS if Yes. Log: lead_ad_id, form_id, question text, answer, timestamp.

2) Standard first message template (safe + low spam)
Send immediately after submission during allowed hours.

Template:
“Hi {first_name}, this is {agent_name} with {business_name}. Got your request for {service}. What’s the address/zip for the job?”

Then (in the next message or same thread after answer):
“Thanks—when would you like us to come by or call (today/tomorrow/this week)?”

Compliance footer guidance:
- Include STOP/HELP line at least in the first message of a new thread and periodically thereafter. Minimal version to append when needed:
“Reply STOP to opt out, HELP for help.”

Avoid:
- ALL CAPS, excessive punctuation (!!!), “FREE!!!”, “act now”, link shorteners, repeated identical messages across many recipients.

3) STOP / HELP handling (Twilio-ready rules)
Goal: Immediate opt-out honoring and auditable suppression.

A) Keywords to treat as STOP (case-insensitive, trim punctuation)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

B) Behavior on receiving STOP keyword
1) Mark contact as opted_out = true immediately.
2) Add to global suppression list scoped at least to the sending number/service.
3) Send exactly one confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply HELP for help.”
4) Block all future outbound messages to that phone unless they re-consent.

C) HELP keyword
On HELP, respond with:
“{business_name} support: agent_bob_replit+lead-copilot@agentmail.to. Msg frequency varies. Reply STOP to opt out.”
Do not include promotional content.

D) Other carrier keywords
- START / YES (optional): only treat as re-consent if you have a policy allowing it AND you log it. Minimum viable: do not auto-resubscribe; require fresh form opt-in.

E) Logging (minimum viable audit trail)
Log these for every inbound STOP/HELP:
- timestamp
- from_number
- to_number / messaging_service_id
- body
- normalized_intent (STOP/HELP/OTHER)
- action_taken (suppressed/sent_help/none)

4) Quiet hours (minimum viable)
Goal: avoid late-night messages and complaints while preserving speed-to-lead.

Default allowed window (local time): 08:00–20:00
- If lead arrives outside the window, queue first SMS to next allowed time.
- If lead is “hot” (e.g., requested emergency service), allow business override flag emergency_ok=true to send until 21:00; otherwise queue.

Timezone resolution order:
1) If the form collects ZIP/address → map ZIP to timezone.
2) Else if ad platform provides geo → use it.
3) Else default to business timezone and queue to 09:00 next day (safest).

DST: use an IANA timezone (e.g., America/Chicago) not a fixed offset.

5) 15-minute verification checklist (agency-friendly)
Do these tests using a real phone before going live:
1) Submit the form as a test lead during allowed hours → confirm first SMS arrives and uses the business name.
2) Reply “STOP” → confirm you receive the opt-out confirmation and no further messages are sent.
3) Reply “HELP” from a non-stopped number → confirm support message returns with agent_bob_replit+lead-copilot@agentmail.to.
4) Submit a lead outside allowed hours → confirm SMS is queued and sent at next allowed time.
5) Confirm consent logging exists for the lead (opt-in true, source, timestamp).

6) Agency handoff (what to send clients)
When an agency implements this for a client, they should:
- Put the checkbox/consent language on every form that triggers SMS.
- Ensure Meta Lead Ads include an explicit SMS consent question.
- Use the exact STOP/HELP behavior above.
- Enforce quiet hours.
- Keep consent logs for at least 12 months (minimum viable retention).

If the client asks “are you legit / compliant?”
Provide:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to
And explain: “We only message opted-in leads, honor STOP immediately, provide HELP info, respect quiet hours, and maintain consent logs.”
