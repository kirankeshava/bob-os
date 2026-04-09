# Pilot Activation Pack v1 (Agreement + Consent Email, Demo Script, Tracker Schema, Baseline & Daily Ops Checklist)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:01:55.241Z

---

Below is a client-ready Pilot Activation Pack you can paste into email and use during calls. It references our legitimacy URL and support email.

1) PILOT AGREEMENT + CONSENT EMAIL (send after prospect says “interested”)
Subject: 14-day concierge pilot to reduce no-shows (two-way SMS confirmations)

Hi {{FirstName}},

Thanks for your interest in our Appointment No-Show Reducer pilot. Here’s the simple plan and what we need to launch.

What this is:
• 14-day concierge pilot where we send smart appointment reminders, collect two-way confirmations, help automate reschedules, and optionally offer open slots to a waitlist.
• You’ll receive a weekly value report that estimates recovered revenue.

Legitimacy / product page:
• https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support contact:
• agent_bob_replit+no-show-bot@agentmail.to

Consent & compliance (important):
By replying “I AGREE” to this email, you confirm:
1) You have the right to message your customers regarding appointments they requested/scheduled with you.
2) You will only include customers who have provided their phone number for appointment-related communication (transactional/operational messaging).
3) Every message will include clear opt-out language (e.g., “Reply STOP to opt out”) and we will honor STOP immediately. Customers can reply HELP for support.
4) You will provide your business name that should appear in messages.

Data handling:
• We use appointment data only to deliver reminders/confirmations/reschedules and to produce aggregated analytics (confirmations, reschedules, waitlist fills, estimated recovered revenue).
• If any integration fails (calendar/API issues), we pause automation and alert you immediately.

What we need to start (reply with these):
A) Location name + timezone:
B) Booking calendar type (e.g., Google Calendar, Outlook, Calendly, etc.):
C) Typical appointment value ($) and average no-shows/week (estimate is OK):
D) Reminder schedule preference (recommended): 24 hours + 2 hours before
E) Reschedule rules: allowed hours, cutoff (e.g., no reschedules inside 2 hours)
F) Owner/manager escalation contact (name + phone + email):
G) Your preferred SMS signature (e.g., “— {{BusinessName}}”)

If you reply “I AGREE” + the details above, we can typically go live within 24–48 hours.

Best,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to


2) 10-MINUTE LIVE DEMO SCRIPT (use on a call)
Goal: Show two-way confirmations + reschedule + waitlist fill, then close into the pilot agreement.

0:00–1:00 — Context
“Quick overview: we reduce no-shows by sending appointment reminders that customers can reply to. We capture confirmations, automate reschedules, and can fill cancellations from a waitlist. You’ll get a weekly report showing recovered revenue. Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2.”

1:00–4:00 — Two-way confirmations
“Here’s the reminder message style:
‘{{BusinessName}} reminder: You’re booked for {{Day}} at {{Time}}. Reply YES to confirm, NO to cancel, or R to reschedule. Reply STOP to opt out.’
When they reply YES, we mark confirmed. If NO, we cancel per your rules and attempt to fill the slot.”

4:00–7:00 — Reschedule loop (fail-safe)
“If they reply RESCHEDULE or ‘R’, we offer the next available times you approve. If the calendar write-back fails, we stop and alert your escalation contact so you never double-book.”

7:00–9:00 — Waitlist fill
“When a slot opens, we message the waitlist in order (or by priority) with a short timer window. First YES wins, then we stop contacting others.”

9:00–10:00 — Close
“If you’re open to it, I’ll run a 14-day concierge pilot. You’ll give me timezone, reminder timing, reschedule rules, and an escalation contact. I’ll send a short agreement/consent email from agent_bob_replit+no-show-bot@agentmail.to—reply ‘I AGREE’ and we’ll schedule go-live within 24–48 hours.”


3) PILOT RECRUITMENT TRACKER SCHEMA (Sheet columns)
Use these columns in a Google Sheet:
• Business Name
• Niche (med spa, dental, PT, salon, etc.)
• Location/City
• Website
• Decision Maker Name
• Role/Title
• Email
• Phone
• Source (Google Maps, referral, LinkedIn, etc.)
• Outreach Date 1 (Email)
• Outreach Date 2 (Follow-up)
• LinkedIn Sent (Y/N)
• Status (Not Contacted / Contacted / Interested / Call Booked / Agreed / Live / Paused / Converted / Lost)
• Pilot Start Date
• Timezone
• Calendar System
• Baseline No-shows/week
• Avg Appointment Value ($)
• Consent Captured (Y/N + date)
• Escalation Contact
• Notes / Risks (opt-in uncertainty, shared line, multiple providers, etc.)


4) BASELINE METRICS CAPTURE (per pilot location)
Capture BEFORE go-live:
• Past 4 weeks: total appointments scheduled
• Past 4 weeks: no-shows count
• Past 4 weeks: late cancels count
• Average appointment value ($)
• Typical lead time (days between booking and appointment)
• Current reminder method (none / manual / one-way / email)
Define pilot success targets (week 1):
• Confirmation rate (% of appointments confirmed)
• No-show reduction vs baseline (absolute count and %)
• Reschedules successfully completed (#)
• Waitlist fills (#)
• Estimated recovered revenue = (no-shows avoided + waitlist fills) * avg appointment value


5) DAILY CONCIERGE OPS CHECKLIST (Pilot Days 1–14)
Morning (9–10am local):
• Check system health: message send queue, delivery errors, inbound reply backlog
• Confirm timezone alignment for today’s appointments (spot-check 5)
• Verify opt-outs processed (STOP) and HELP responses are correct

Mid-day (12–2pm local):
• Review exceptions: ambiguous replies, reschedule requests not resolved, duplicate booking risk
• Confirm calendar write-backs succeeded for any reschedules/cancels
• If calendar/API failure: pause automation, notify escalation contact, log incident with timestamp and affected appointments

End of day (4–6pm local):
• Record daily counts: reminders sent, YES confirmations, NO cancels, reschedules completed, waitlist offers sent, waitlist fills
• Log any incidents with severity and resolution
• Note message quality issues (confusing wording, wrong business name, wrong time formatting) for next-day fix

Escalation triggers (immediate):
• Any suspected double-booking
• Any reminder sent with incorrect time/date
• Any STOP not honored within 5 minutes
• Calendar integration/write-back failures

Support contact (always include in internal notes):
• agent_bob_replit+no-show-bot@agentmail.to

End of pack.
