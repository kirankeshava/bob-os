# Local Lead Response Copilot — MVP Compliance + Deliverability Pack (Pilot Launch Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T05:39:13.286Z

---

# Local Lead Response Copilot — MVP Compliance + Deliverability Pack (Pilot Launch)
Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
Support: agent_bob_replit+lead-copilot@agentmail.to

## 1) Minimum Viable Compliance Checklist (ship this for pilots)
**Must-have before sending any SMS:**
1. **Express written consent language** at the lead capture point (form/ad) that mentions automated texts, optional consent, and STOP/HELP.
2. **Consent logging**: store timestamp, source, IP/user agent (if available), form/ad identifier, and the exact consent text version.
3. **STOP handling**: recognize standard keywords and immediately suppress further texts to that number.
4. **HELP handling**: provide business/product identification + support email.
5. **Quiet hours**: do not initiate outbound texts during local quiet hours; queue until next window.
6. **Message content**: identify the business early; avoid misleading claims; no excessive punctuation/caps.

## 2) Copy/Paste Opt‑In Snippets (use one)
### A) Webflow / Website form checkbox (recommended)
**Checkbox label (paste):**
“I agree to receive **automated SMS text messages** from [BUSINESS NAME] about my inquiry and appointment scheduling. Msg & data rates may apply. Msg frequency varies. Reply **STOP** to opt out, **HELP** for help. Consent is not a condition of purchase.”

**Helper text under checkbox (paste):**
“By submitting, you agree to our Terms and Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (add /terms and /privacy when published).”

**Required fields to capture:** phone number, first name (optional), service need, preferred timeframe, and a consent checkbox value.

### B) Typeform (statement + required yes/no)
**Statement:**
“We can text you right away to confirm details and schedule. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to buy.”

**Required question (Yes/No):**
“Do you agree to receive automated SMS texts from [BUSINESS NAME] about your request?”

**If Yes → submit. If No → submit but do NOT text; route to email/call.**

### C) Meta/Facebook Lead Ads (Privacy policy + custom disclaimer)
**Custom disclaimer (paste):**
“By submitting this form, you agree to receive automated text messages from [BUSINESS NAME] regarding your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”

**Privacy Policy URL:** point to your published privacy page (until then use the website link above).

## 3) Message Templates (pilot-safe)
### First SMS (send immediately after lead)
“Hi {{first_name}}, it’s {{agent_name}} with {{business_name}}. Got your request for {{service}}. What’s the address/ZIP for the job?”

### Qualification follow-up (keep it short)
“Thanks—when would you like us to come out? Reply with: 1) ASAP 2) This week 3) Next week”

### Booking prompt
“Perfect. What’s the best time for a quick call to confirm details—morning, afternoon, or evening?”

### If no response (1 nudge, then stop)
“Quick check—do you still want help with {{service}}? Reply YES and we’ll get you scheduled. Reply STOP to opt out.”

**Content rules (deliverability):**
- Avoid “FREE!!!”, “guaranteed”, all-caps, repeated links.
- Use the business name early.
- Keep links minimal; if needed, use one plain URL.

## 4) STOP / HELP Handling (implementation rules)
### Keywords to treat as opt-out (case-insensitive, trim punctuation)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

**Behavior:**
1. Immediately add phone to **Global Suppression List** (do-not-text).
2. Send confirmation (exact copy):
“You’re unsubscribed and will no longer receive texts from {{business_name}}. Reply START to re-subscribe.”
3. Block all future outbound messages unless user texts START/UNSTOP.

### HELP keywords
HELP, INFO

**HELP response (exact copy):**
“{{business_name}} SMS support. Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to. Msg&data rates may apply.”

### START / UNSTOP re-subscribe
START, YES, UNSTOP

**Re-subscribe response:**
“You’re re-subscribed. Reply STOP to opt out. How can we help with your request?”

### Logging (minimum)
For every inbound STOP/HELP/START store: phone, keyword, timestamp (UTC), conversation/lead id, and action taken (suppressed / help-sent / resubscribed).

## 5) Quiet Hours (simple rule set for pilots)
**Default quiet hours:** 8pm–8am recipient local time (Mon–Sun).

**Timezone resolution order:**
1) Lead-provided ZIP → map to timezone.
2) Area code → approximate timezone.
3) If unknown → use business timezone and be conservative (treat as quiet hours if near boundary).

**When a lead arrives during quiet hours:**
- Do **not** send SMS immediately.
- Queue the “First SMS” to send at **8:05am local time**.
- Optionally send an internal alert (email/slack) so the owner can call in the morning.

## 6) Twilio Deliverability (minimum viable configuration)
- Use a **Messaging Service** with:
  - Sticky sender enabled
  - Opt-out keywords enabled (if relying on Twilio, still keep app-level suppression)
- If using 10DLC long code at scale: plan for A2P registration; for pilots keep volume low and content clean.
- Monitor: delivery statuses, error codes, opt-out rates.

## 7) Agency Handoff — Go‑Live Steps (copy/paste checklist)
1) Paste the opt-in snippet into the client’s form/ad. Make consent checkbox/yes-no required.
2) Ensure the webhook sends: phone, name, service, consent=true/false, source, timestamp.
3) Turn on STOP/HELP handling with suppression.
4) Turn on quiet hours with queueing.
5) Send test lead + verify:
   - First SMS received
   - Reply STOP → suppression + confirmation
   - Reply HELP → help message
   - Lead during quiet hours → queued for morning

If you need assistance, send the form/ad screenshot + webhook payload to: agent_bob_replit+lead-copilot@agentmail.to.
