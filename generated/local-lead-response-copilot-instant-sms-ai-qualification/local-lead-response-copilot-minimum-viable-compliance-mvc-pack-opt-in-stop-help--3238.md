# Local Lead Response Copilot — Minimum Viable Compliance (MVC) Pack (Opt‑In + STOP/HELP + Quiet Hours + Consent Logging) — Agency Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:47:43.983Z

---

# Local Lead Response Copilot — Minimum Viable Compliance (MVC) Pack

Use this pack to launch pilots safely (reduce carrier/TCPA/CTIA objections) without overbuilding. Website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
Support: agent_bob_replit+lead-copilot@agentmail.to

## 1) What we must have for pilots (MVC)
1) **Explicit opt-in language at the lead source** (form/FB lead ad) stating automated texts, not required for purchase, message frequency, STOP/HELP.
2) **STOP/HELP handling**: STOP-family keywords immediately suppress all future texts; HELP returns support info.
3) **Quiet hours**: do not initiate outbound texts during late-night hours in the lead’s timezone; queue to next window.
4) **Consent logging**: store what they opted into + when + source.

## 2) Copy/paste opt‑in snippets
### A) Webflow / website form (below the phone field)
**Checkbox label (recommended):**
> I agree to receive text messages from [BUSINESS NAME] about my inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.

**Required behavior:** checkbox must be **unchecked by default**.

**Micro-copy (optional, below checkbox):**
> By submitting, you confirm you are the account holder or have permission to use this number.

**Link line (optional if you have legal pages live):**
> Privacy/Terms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

### B) Typeform (add as “Legal” / statement + required Yes checkbox)
**Statement:**
> By checking “Yes” and submitting this form, you consent to receive automated text messages from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not required to purchase.

**Answer choices:** Yes (required)

### C) Meta/Facebook Lead Ads (Custom Disclaimer)
Add to the lead form disclaimer/custom:
> By submitting this form, you agree to receive automated SMS from [BUSINESS NAME] regarding your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.

Also ensure the ad’s **call-to-action** and context matches the service requested (avoid bait-and-switch).

## 3) Message templates (pilot-safe)
Keep messages short, directly tied to the user’s request, and avoid “marketing blast” language.

### First message (immediate)
> Hi {{first_name}}, it’s {{agent_name}} with {{business_name}}. Thanks for reaching out about {{service}}. What’s the address (or ZIP) for the job?

### Qualification follow-up (if no reply in ~5–10 min during allowed hours)
> Just making sure I have this right—are you looking for help with {{service}} in the next (a) 24–48 hrs, (b) this week, or (c) not sure yet?

### Booking offer (after qualification)
> Great—want to book a quick call? I have {{slot_1}} or {{slot_2}}. Which works?

### Confirmation
> You’re set for {{appt_time}}. Reply STOP to opt out, HELP for help.

### Missed-call text back (if you support it)
> Sorry we missed you—this is {{business_name}}. What’s the best time today to call you back?

## 4) STOP/HELP handling (implementation requirements)
### Keywords
- STOP keywords (case-insensitive, trim punctuation): **STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT**
- HELP keywords: **HELP, INFO**

### Required behaviors
**On inbound STOP-keyword:**
1) Immediately set **do_not_text = true** for that phone number (global suppression list).
2) Send one final confirmation text:
   > You’re opted out and will no longer receive texts from {{business_name}}. Reply HELP for help.
3) Block any future outbound texts to that number across all campaigns/flows.
4) Log the event (see consent logging below).

**On inbound HELP-keyword:**
Send:
> {{business_name}} support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.

**Re-consent:** Do not auto-resubscribe. Require a fresh opt-in via form/ad (or explicit “START” flow if you implement it later).

## 5) Quiet hours (pilot minimum)
Goal: avoid initiating texts at night in the lead’s local time.

### Default schedule (recommended)
- Allowed send window: **8:00 AM – 8:00 PM** lead-local time

### Timezone resolution (minimum viable)
1) If lead has ZIP/address → map to timezone.
2) Else use area code heuristic.
3) Else default to business timezone.

### Behavior
- If a lead arrives outside the window: **queue the first message** for the next allowed time (e.g., 8:05 AM).
- If a conversation is already active (lead texting you), you may reply even during quiet hours only if your policy allows; otherwise queue.

## 6) Consent + event logging (minimum schema)
Store these fields per lead:
- phone_e164
- consent_status (opted_in / opted_out)
- consent_timestamp
- consent_source (webflow/typeform/fb_lead_ads/other)
- consent_text_version (store the exact snippet version ID)
- ip_address (if captured)
- user_agent (if captured)
- stop_timestamp (if opted out)
- last_help_timestamp (optional)
- message_history pointer (IDs)

This is what you show if an agency/client asks, “How do you prove consent?”

## 7) Go-live verification checklist (what agencies/pilots should test)
1) Submit the form with checkbox unchecked → **no SMS should send**.
2) Submit with checkbox checked → first SMS sends immediately (within quiet hours).
3) Reply “STOP” → receive opt-out confirmation; system sets do_not_text.
4) After STOP, attempt to trigger another outbound → **must be blocked**.
5) Reply “HELP” → receive support/help text.
6) Submit lead at 11:30 PM lead-local time → first message **queues** to next morning.

## 8) Content guardrails (deliverability basics)
- Don’t use link shorteners; if links are needed, use your own domain later.
- Avoid spammy phrases (“FREE!!!”, “ACT NOW”, “guaranteed”, excessive caps/punctuation).
- Keep personalization tied to the user’s request (service + location).
- Include business name early.
- Don’t send large batches; this is conversational, lead-triggered messaging.

---
If you need help implementing any of the above, point agencies to the live site for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 and support email: agent_bob_replit+lead-copilot@agentmail.to.
