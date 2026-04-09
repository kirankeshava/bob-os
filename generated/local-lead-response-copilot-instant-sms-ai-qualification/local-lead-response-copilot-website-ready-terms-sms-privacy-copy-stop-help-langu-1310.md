# Local Lead Response Copilot — Website-Ready Terms (SMS) + Privacy Copy, STOP/HELP Language, Quiet Hours Spec, and Agency Publish Checklist (MVP)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:48:32.306Z

---

Below is MVP, website-ready copy you can paste into two pages: /terms and /privacy (or Webflow pages). Replace bracketed placeholders where noted.

============================================================
TERMS OF SERVICE (INCLUDING SMS TERMS) — MVP
============================================================
Last updated: [Month Day, Year]

Business name: Local Lead Response Copilot
Proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Contact: agent_bob_replit+lead-copilot@agentmail.to

1) Overview
Local Lead Response Copilot (“we”, “us”) provides an automated lead-response service for businesses (“Customers”) that helps respond to inbound leads via SMS and related messaging workflows, including automated qualification and optional booking/appointment routing.

2) Acceptable Use
You agree to use the service only for lawful purposes and in compliance with all applicable laws and carrier requirements, including TCPA and CTIA guidelines. You may not:
- Send messages without the recipient’s prior express consent (or prior express written consent where required).
- Send content that is misleading, deceptive, harassing, discriminatory, or otherwise prohibited.
- Send messages related to restricted content (e.g., hate, unlawful products/services, or other carrier-prohibited categories).

3) Customer Responsibilities (Consent + Compliance)
You (the Customer) are responsible for:
- Ensuring you have appropriate consent to text each lead/recipient.
- Maintaining records of consent (date/time, source, language shown, and recipient phone).
- Including required disclosures in your opt-in flows.
- Honoring opt-out requests immediately.

4) SMS Messaging Disclosures (End-User Facing)
Message frequency varies.
Message and data rates may apply.
To opt out at any time, reply STOP.
For help, reply HELP.

You must ensure your opt-in language presented to end users includes: (a) consent to receive SMS, (b) that consent is not a condition of purchase, (c) message frequency varies, (d) “msg&data rates may apply”, (e) STOP/HELP instructions, and (f) links to your Terms and Privacy pages.

5) Opt-Out / STOP Handling
We treat common opt-out keywords (including STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT) as a revocation of consent for that phone number for the relevant sender.
- Upon receiving an opt-out keyword, the system must: (1) immediately mark the number as opted out/suppressed, and (2) send a single confirmation message: “You’re opted out. No more messages. Reply START to resubscribe.”
- After opt-out, no further messages may be sent unless the user re-subscribes (e.g., by texting START) and such re-subscription is logged.

6) HELP Handling
Upon receiving HELP, the system must send an informational response such as:
“Local Lead Response Copilot: automated messages about your inquiry. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

7) Quiet Hours (Recommended)
To reduce complaints and improve deliverability, we recommend honoring quiet hours based on recipient local time. Default policy for pilots: do not send outbound messages between 8:00 PM and 8:00 AM recipient local time unless the recipient has just submitted a lead form (high-intent) and your business requires after-hours contact.

8) Disclaimer of Warranties
The service is provided “as is” and “as available”. We do not guarantee message delivery (carriers may filter or block messages) or any specific conversion results.

9) Limitation of Liability
To the maximum extent permitted by law, Local Lead Response Copilot will not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits or data.

10) Termination
We may suspend or terminate service for non-compliance, excessive complaints, carrier enforcement actions, or illegal use.

11) Privacy
Our Privacy Policy explains how we collect and use information. See: [YOUR LIVE PRIVACY URL]

============================================================
PRIVACY POLICY — MVP
============================================================
Last updated: [Month Day, Year]

Business name: Local Lead Response Copilot
Proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Contact: agent_bob_replit+lead-copilot@agentmail.to

1) What This Policy Covers
This Privacy Policy describes how Local Lead Response Copilot collects, uses, and discloses information when providing automated lead-response and messaging workflows to our Customers.

2) Information We Collect
We may collect:
- Contact information provided by leads (e.g., name, phone number, email).
- Lead metadata (time submitted, form/ad source, IP/user agent when available via integrations).
- Messaging data (message content, timestamps, delivery status, opt-out status).
- Booking outcomes (e.g., appointment time) if enabled.

3) How We Use Information
We use information to:
- Send and manage messages on behalf of the Customer in response to a lead’s inquiry.
- Provide qualification workflows and route leads to booking/calls.
- Prevent abuse, fraud, and unwanted messaging.
- Maintain compliance records (consent logs, opt-out logs).

4) Consent & SMS
We send SMS messages only when the Customer indicates they have collected appropriate consent from the recipient. End users can opt out at any time by replying STOP; they can request help by replying HELP.

5) Sharing / Disclosure
We may share information with:
- Messaging providers (e.g., SMS carriers and platform providers) to deliver messages.
- Scheduling/CRM/integration providers the Customer connects (e.g., webhook endpoints).
We do not sell end-user personal information.

6) Data Retention
We retain consent logs, opt-out logs, and messaging audit records for a minimum of 24 months (recommended) or longer if required to resolve disputes, comply with legal obligations, or enforce our agreements.

7) Security
We implement reasonable administrative and technical safeguards; however, no method of transmission or storage is 100% secure.

8) Your Choices
End users: reply STOP to opt out of SMS; reply HELP for information. Customers can request access to relevant compliance logs by contacting agent_bob_replit+lead-copilot@agentmail.to.

9) Updates
We may update this policy from time to time by posting a new “Last updated” date.

============================================================
COPY/PASTE STOP/HELP DISCLOSURE BLOCK (USE IN FORMS/ADS)
============================================================
By submitting, you agree to receive text messages about your inquiry from [BUSINESS NAME] via Local Lead Response Copilot. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [YOUR LIVE TERMS URL] Privacy: [YOUR LIVE PRIVACY URL]
Support: agent_bob_replit+lead-copilot@agentmail.to

============================================================
QUIET HOURS IMPLEMENTATION SPEC (TIMEZONE + DEFERRAL) — MVP
============================================================
Goal: avoid sending messages at night in the recipient’s local time while still responding quickly when appropriate.

A) Timezone resolution order (deterministic)
1) If lead payload includes explicit timezone (e.g., from form) => use it.
2) Else if lead includes postal code/city/state => geocode to timezone.
3) Else if phone number is US/CA => infer timezone from area code as a fallback.
4) Else default to Customer’s business timezone.

B) Default quiet hours window
- Quiet hours: 8:00 PM to 8:00 AM recipient local time.
- Allowed window: 8:00 AM to 8:00 PM.

C) Decision logic
On event: NEW_LEAD_RECEIVED at time T (UTC)
1) Resolve recipient_tz.
2) Convert now_local = T in recipient_tz.
3) If now_local within allowed window => send immediately.
4) Else defer:
   - Compute next_allowed = next occurrence of 8:00 AM in recipient_tz.
   - Enqueue message with run_at_utc = next_allowed converted to UTC.
   - Log event QUIET_HOURS_DEFERRED with recipient_tz, now_local, run_at_utc.

D) Overrides (explicit)
- If lead indicates “urgent/emergency” or Customer toggles “after-hours enabled” => allowed window becomes 7:00 AM–9:00 PM.
- No override may bypass STOP/opt-out suppression.

E) Required audit logs
- TIMEZONE_RESOLVED (method: explicit|geo|area_code|default)
- QUIET_HOURS_EVALUATED (now_local, allowed_window)
- QUIET_HOURS_DEFERRED (run_at_utc) when deferred
- MESSAGE_SENT / MESSAGE_BLOCKED (with reason)

============================================================
AGENCY PUBLISH CHECKLIST (TERMS/PRIVACY + SNIPPETS)
============================================================
1) Create two public pages:
- /terms
- /privacy

2) Paste the Terms copy into /terms and Privacy copy into /privacy.
- Ensure both pages show “Contact: agent_bob_replit+lead-copilot@agentmail.to”
- Keep “Reply STOP to opt out, HELP for help” disclosures intact.

3) Update every opt-in snippet to link to the LIVE URLs:
- Terms: https://[yourdomain]/terms
- Privacy: https://[yourdomain]/privacy

4) Confirm your lead sources show the disclosure near the submit button (not hidden behind another click).

5) Confirm the first outbound SMS includes STOP language (recommended):
Example: “Thanks for reaching out to [Business]. A quick question: what service do you need? Reply STOP to opt out.”

6) Verification:
- Send HELP inbound => verify info reply includes support email.
- Send STOP inbound => verify opt-out confirmation and suppression.
- Attempt outbound after STOP => verify blocked + logged.

End of MVP pack.
