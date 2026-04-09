# Local Lead Response Copilot — MV Compliance + Deliverability Addendum (Agency Implementation Checklist + Website SMS Terms/Privacy Blocks + Verification Evidence Pack)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:16:33.795Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Addendum (v1)

**Business proof URL (share with customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
**Support/Compliance email:** agent_bob_replit+lead-copilot@agentmail.to

This addendum is the “last mile” for agencies: publish real Terms/Privacy URLs, deploy compliant opt-in text on forms/ads, and verify STOP/HELP + quiet hours with auditable evidence.

---

## 1) Minimum-Viable Agency Implementation Checklist (<60 minutes)

### A. Publish Terms + Privacy pages (required)
1. Create two pages on the website:
   - **/terms** (or /terms-of-service)
   - **/privacy** (or /privacy-policy)
2. Paste the **SMS Program** blocks in Section 2 below into each page.
3. Confirm both URLs load publicly.
4. Update every opt-in snippet to link to these final URLs.

**Pass condition:** You can open Terms/Privacy in an incognito window and the links work.

### B. Place opt-in language on lead sources (required)
For each lead source you connect (Typeform, Webflow, Meta Lead Ads), ensure:
- Consent text is visible **at the point of data capture** (not buried elsewhere).
- Includes: “automated” + “marketing” language (if applicable), message frequency, “Msg&data rates may apply”, STOP/HELP instructions, and links to Terms/Privacy.

**Pass condition:** Screenshot proof of the form/lead ad showing consent language.

### C. Configure STOP/HELP globally (required)
- STOP must immediately suppress the phone number **across all future sends** for that business.
- HELP must respond with support contact + link.

**Pass condition:** A real inbound STOP blocks all future texts; HELP returns correct info.

### D. Quiet hours by recipient timezone (recommended for pilots; required at scale)
- Do not send marketing/qualification texts outside permitted window.
- If outside window, queue and send at next allowed start time.

**Pass condition:** A lead captured at 11pm local time does not receive an immediate text; it receives queued text at next window.

---

## 2) Paste-Ready Website Content Blocks (Terms/Privacy “SMS Program”)

### 2.1 Add to TERMS OF SERVICE page (SMS Program section)
**Section Title:** SMS Program Terms

Local Lead Response Copilot (“we,” “us”) provides SMS messages on behalf of participating businesses to respond to customer inquiries and follow up on leads.

**Consent to receive messages.** By submitting your phone number through a form, lead ad, chat widget, or other intake method that includes an SMS consent disclosure, you authorize the business you contacted to send you text messages using an automated system. Message types may include: (a) confirmations and responses to your inquiry, (b) appointment scheduling and reminders, (c) questions to qualify your request, and (d) service-related updates. If the business also sends marketing messages, those will be described at the point of opt-in.

**Message frequency.** Message frequency varies based on your interaction and the business’s process. Typical ranges are 1–6 messages per inquiry, unless you continue the conversation.

**Costs.** Message and data rates may apply.

**Opt-out.** Reply **STOP** at any time to opt out of further messages. After you opt out, you may receive one final confirmation message. If you opt out, you will no longer receive messages unless you later re-consent.

**Help.** Reply **HELP** for assistance or contact us at **agent_bob_replit+lead-copilot@agentmail.to**.

**Carrier disclaimer.** Carriers are not liable for delayed or undelivered messages.

**Privacy.** We process phone numbers and message content as described in our Privacy Policy. Please review the Privacy Policy at: **[PASTE YOUR PRIVACY URL HERE]**.

**Contact.** For compliance requests, email **agent_bob_replit+lead-copilot@agentmail.to** and include the phone number and business name.

### 2.2 Add to PRIVACY POLICY page (SMS/Phone Data section)
**Section Title:** SMS & Phone Number Data

We collect phone numbers and related lead information when you submit them through a business’s intake form, lead ad, or similar channel that includes an SMS consent notice. We use this information to send and manage text messages related to your inquiry, including automated messages that help route, qualify, and schedule requests.

**What we collect.** We may collect your phone number, name, inquiry details, timestamps, and message content exchanged via SMS.

**How we use it.** We use the information to (a) respond to your inquiry, (b) ask follow-up questions to qualify your request, (c) schedule or confirm appointments, and (d) provide service updates. If marketing messages are sent, that will be disclosed at the point of consent.

**Opt-out and preferences.** You can opt out at any time by replying **STOP**. You can request help by replying **HELP** or emailing **agent_bob_replit+lead-copilot@agentmail.to**.

**Service providers.** We may use third-party providers to deliver messages and operate the service (e.g., messaging carriers and SMS platform providers). These providers process data under contractual obligations to provide the service.

**Retention.** We retain consent and messaging logs for compliance and dispute handling for a reasonable period (commonly 2–4 years) unless a longer period is required by law or a client agreement.

**Contact.** For privacy requests, contact **agent_bob_replit+lead-copilot@agentmail.to**.

---

## 3) Copy/Paste Opt-In Snippet (Universal)
Use wherever the lead enters their phone number (forms/ads). Keep it visible and unambiguous.

> By submitting, you agree to receive text messages (including automated messages) from **[Business Name]** about your request, scheduling, and service updates. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: **[TERMS URL]** Privacy: **[PRIVACY URL]**. Support: agent_bob_replit+lead-copilot@agentmail.to

For Meta Lead Ads, place in disclaimer/custom question area; ensure the lead ad includes the consent line.

---

## 4) STOP/HELP Handling — Verification Evidence Pack (What to test + what to save)

### Required keyword handling
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT → opt-out
- HELP, INFO → help response
- START, YES, UNSTOP → optional opt-back-in (only if you implement explicit re-consent)

### Required behaviors (pass/fail)
1. **Inbound STOP**
   - System immediately sets contact as **suppressed=true** (global for that business)
   - System sends: “You’re opted out. No more messages. Reply HELP for help.”
   - All future outbound sends to that number are blocked (must be blocked even if a new lead arrives)

2. **Inbound HELP**
   - System sends: “Support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. Terms: [TERMS URL] Privacy: [PRIVACY URL]”

3. **Edge cases**
   - Mixed-case “Stop”, “hElP” works
   - STOP during quiet hours still processes immediately (suppression should not wait)
   - STOP after opt-out does not restart messaging

### Evidence to capture (store in client folder)
- Screenshot or export of:
  1. The inbound STOP message
  2. The outbound opt-out confirmation
  3. The suppression list entry with timestamp
  4. A blocked outbound attempt log line
  5. The inbound HELP message
  6. The outbound HELP response

**Minimum log fields to show:** business_id, phone_e164, inbound_keyword, event_type, timestamp_utc, suppression_state_before/after, message_sid (if Twilio), delivery_status.

---

## 5) Quiet Hours by Recipient Timezone — Implementation Spec (Agency-readable)

### Goal
Do not send non-critical automated qualification/booking messages outside allowed local times.

### Recommended allowed window (default)
- **Mon–Fri:** 8:00am–8:00pm recipient local time
- **Sat:** 9:00am–6:00pm
- **Sun:** 10:00am–6:00pm
(Agencies can adjust per client vertical.)

### Timezone resolution order
1. Lead-provided timezone (explicit field)
2. Business configured service-area timezone (single TZ)
3. Phone number lookup (NPA-NXX / carrier lookup approximation)
4. Default to business timezone

### Behavior
- If lead arrives within window: send immediately.
- If outside window: create a scheduled job for the next window start; do not send until then.
- STOP/HELP processing is **always immediate** regardless of quiet hours.

### Required audit logs
quiet_hours_decision: allowed|deferred, recipient_tz, local_time, next_send_time_utc.

---

## 6) Twilio Deliverability Notes (Minimum Viable)

### Sending route decision (simple)
- **Low volume pilots (single area, low throughput):** 10DLC is usually fine.
- **Higher volume / aggressive outreach / scaling:** consider Toll-Free verification + strong opt-in.

### Messaging Service requirements
- Use a Twilio **Messaging Service** (not direct-from-number) so you can manage:
  - Sticky sender
  - Smart encoding
  - Fallback behavior
  - Compliance keywords handling (STOP/HELP)

### Content guidelines (to avoid filtering)
- Keep first message short; state business name + reason + ask a single question.
- Avoid ALL CAPS, excessive punctuation, link shorteners, “FREE/guarantee/act now” phrasing.
- Use full domains when linking; keep link count low.

---

## 7) Customer-Facing HELP Template (copy/paste)
“Help: Email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. Terms: [TERMS URL] Privacy: [PRIVACY URL].”

---

### Where agencies should send questions
agent_bob_replit+lead-copilot@agentmail.to (include client name + Twilio account SID if relevant).
