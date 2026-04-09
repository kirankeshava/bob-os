# Local Lead Response Copilot — Minimum Viable Compliance (MVC) Pack (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:21:56.234Z

---

Purpose (MVC): This is the minimum compliance + deliverability layer required to launch paid pilots safely and avoid common carrier/TCPA/CTIA objections. It is optimized for speed-to-lead use cases (home services/local high-intent). Share legitimacy links as needed: Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | Support: agent_bob_replit+lead-copilot@agentmail.to

1) REQUIRED OPT-IN FIELDS (what every form/ad must capture)
- Phone number (required)
- Checkbox or equivalent consent statement (required; pre-checked NOT allowed)
- Optional: “Preferred contact method” (SMS/Call/Email) to reduce complaints
- Optional: Zip/City (helps timezone)

2) COPY/PASTE OPT-IN SNIPPETS
A) Webflow (near submit button + checkbox label)
Checkbox label: “I agree to receive text messages from [Business Name] about my request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase.”
Below button microcopy (optional): “By submitting, you confirm you are the owner/authorized user of this number. See Privacy Policy and Terms: [INSERT LINKS].”

B) Typeform (Statement / Legal) 
“By submitting this form, you agree that [Business Name] may contact you by SMS about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Privacy/Terms: [INSERT LINKS].”

C) Meta/Facebook Lead Ads (Custom disclaimer / Privacy Policy field)
Custom disclaimer text:
“By tapping Submit, you agree to receive automated text messages from [Business Name] about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase.”
- Add Privacy Policy URL: [INSERT LINK]
- Add Website URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

3) DEFAULT FIRST MESSAGE TEMPLATE (fast + compliant, low-spam)
“Hi {{first_name}}, this is {{agent_name}} with {{business_name}}. We got your request for {{service}}. What’s the address/ZIP for the job?”
(Do NOT include links in the first message unless necessary. Avoid ALL CAPS, excessive punctuation, “FREE”, “CLICK HERE”, or multiple URLs.)

4) STOP / HELP HANDLING (MUST IMPLEMENT)
Keywords (case-insensitive, trim punctuation):
- STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP set: HELP, INFO
Behavior:
A) On STOP keyword from a phone number:
- Immediately mark number as “suppressed=true” in a global suppression list.
- Send exactly one confirmation (no marketing content):
  “You’re opted out and will no longer receive texts from {{business_name}}. Reply START to opt back in.”
- Block ALL future outbound messages to that number (including transactional) unless your policy explicitly allows certain transactional messages; for MVC, block everything until re-consent.
B) On HELP keyword:
- Respond:
  “{{business_name}}: Support {{support_email}}. Msg frequency varies. Reply STOP to opt out. Msg & data rates may apply.”
C) START / UNSTOP (optional but recommended)
- If user texts START (or UNSTOP): set suppressed=false and log resubscribe event.
- Respond: “You’re opted back in. Reply STOP to opt out.”
Audit logging (minimum fields per event): timestamp_utc, from_number, to_number, keyword, action_taken (suppressed/help/resubscribe), message_sid/provider_id, lead_id (if known).

5) QUIET HOURS (MUST IMPLEMENT)
Rule (MVC): Only send outbound SMS between 8:00am–8:00pm recipient local time, Mon–Sat. Sundays: 10:00am–6:00pm. (Adjust per client, but keep a default.)
Timezone resolution order:
1) Lead-provided ZIP/address → timezone lookup
2) Client’s business timezone (fallback)
3) Area-code-based inference (last resort)
If outside window:
- Queue message and send at next allowed time.
- If lead is “hot” (e.g., just submitted): send an internal notification to the business (email/CRM) instead of texting immediately.
Overrides:
- Manual “send anyway” allowed only for a user action with explicit confirmation and logged override_reason.
Logging: store computed_timezone, send_scheduled_for_local, send_scheduled_for_utc, and actual_sent_utc.

6) CONSENT LOGGING (MVC MINIMUM)
Store for each lead:
- consent_status: opted_in / opted_out / unknown
- consent_source: webflow/typeform/meta/manual
- consent_text_version: hash or version string of the opt-in language
- consent_timestamp_utc
- consent_ip (if available)
- consent_form_url (landing page/ad)
- proof: raw payload snapshot (redact as needed)

7) AGENCY GO-LIVE CHECKLIST (DO THIS BEFORE FIRST LEAD)
- Confirm the form/ad includes the opt-in snippet (no pre-checked box).
- Confirm a working support contact: agent_bob_replit+lead-copilot@agentmail.to and website URL are present in proposal/onboarding docs.
- Send test messages:
  1) Submit a test lead → confirm first SMS is received.
  2) Reply HELP → confirm HELP response.
  3) Reply STOP → confirm opt-out confirmation.
  4) After STOP, attempt another outbound → must be blocked and logged.
  5) Test after-hours lead submission → message must be queued (not sent immediately).
- Confirm consent logs are created for the test lead.

8) DELIVERABILITY GUIDELINES (MVC)
- Keep messages short, specific, and conversational.
- Limit links; avoid URL shorteners.
- Avoid spammy phrasing (“guaranteed”, “act now”, “free offer”) and repeated templates across many clients without customization.
- Use consistent brand identification (“this is {{business_name}}”).

If Twilio is the provider: use a Messaging Service (one place to manage compliance, sticky sender, and number pool). A2P 10DLC registration may be required for US long-code at scale; do not begin paid steps without owner approval, but prepare brand/campaign details early.

Owner-facing note: This MVC pack is intentionally small. It is sufficient to remove the main pilot objections (consent language, STOP/HELP, quiet hours, proof) while we prioritize distribution and closing.