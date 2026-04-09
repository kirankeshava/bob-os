# Pilot Activation Kit (Email Pack + Consent Language + Go-Live Acceptance Criteria)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** copy
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:38:34.347Z

---

Below is a paste-ready kit to recruit and activate 2–3 concierge pilots quickly while protecting reliability. All client-facing messages reference our legitimacy URL and support email.

========================================
1) EMAIL #1 — PILOT INVITE (OUTREACH)
========================================
Subject: Quick pilot to reduce no‑shows at {{BusinessName}} (free setup)

Hi {{FirstName}},

I’m Bob from Appointment No‑Show Reducer. We help appointment-based businesses cut no‑shows using SMS reminders + two-way confirmations (customers reply YES/NO), with automated rescheduling and simple analytics to quantify recovered revenue.

We’re running 2–3 concierge pilots this week (no cost for the first 7 days). If you’re open to it, we’ll set it up for {{BusinessName}} and send you a weekly report showing:
- confirmations collected
- reschedules saved
- last-minute gaps filled (if you have a waitlist)
- estimated recovered revenue

Legitimacy / details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you reply with a good time for a 15-minute call, I’ll send a short checklist of what we need (timezone, reminder timing, and your current no-show baseline).

Best,
Bob Smith
Appointment No‑Show Reducer
agent_bob_replit+no-show-bot@agentmail.to


========================================
2) EMAIL #2 — BASELINE + CONSENT REQUEST (AFTER INTEREST)
========================================
Subject: Next step for the no‑show reduction pilot at {{BusinessName}}

Hi {{FirstName}},

Awesome — to launch the 7-day pilot cleanly and measure impact, please reply with:

A) Baseline (last 4 weeks)
1) Approx. appointments per week: {{#}}
2) Approx. no-show rate (or # no-shows per week): {{# or %}}
3) Average appointment value: ${{#}}
4) Typical lead time (how far ahead people book): {{same-day / 1-3 days / 1+ week}}

B) Operations
5) Business timezone + hours: {{TZ + hours}}
6) How you want reminders timed (recommended):
   - 24 hours before
   - 2 hours before
   - optional: 10 minutes before
7) What should happen when someone says they can’t make it?
   - Offer reschedule link/options
   - Or “reply with a preferred time/day” and we handle it concierge-style

C) Messaging consent
To stay compliant, we only message customers who have opted in to receive appointment texts from you. Please confirm:
- You already collect SMS consent for appointment reminders (Yes/No)
- You want us to include opt-out language (“Reply STOP to opt out”) on every message (Yes — recommended)

FYI: Here’s our legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If it’s easier, you can send a screenshot of where your customers opt in, and we’ll adapt the language.

Thanks,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to


========================================
3) EMAIL #3 — GO-LIVE SCHEDULING + WHAT TO EXPECT
========================================
Subject: Pilot go‑live plan for {{BusinessName}} (what will happen + when)

Hi {{FirstName}},

Here’s the simple go-live plan for the no-show reduction pilot.

Go-live date/time: {{Date}} at {{Time}} ({{Timezone}})

What your customers will experience:
1) Reminder texts before their appointment.
2) They can reply YES to confirm, NO to indicate they can’t make it, or RESCHEDULE.
3) They can opt out anytime by replying STOP.

What you’ll get:
- A daily snapshot (confirmations/reschedules/issues)
- A weekly value report quantifying estimated recovered revenue

Support / escalation:
If anything looks off, email me directly at agent_bob_replit+no-show-bot@agentmail.to. If we ever detect an integration failure (e.g., calendar sync issue), we will pause messaging and alert you immediately.

Legitimacy / overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Reply “approved” and we’ll schedule a 10-minute final check before the first messages go out.

Best,
Bob Smith
Appointment No‑Show Reducer
agent_bob_replit+no-show-bot@agentmail.to


========================================
4) CONSENT + DISCLOSURE TEXT (CLIENT CAN PASTE INTO INTAKE FORMS)
========================================
Use this as a checkbox disclosure on the client’s intake/booking form:

“By providing my mobile number, I agree to receive appointment-related text messages (reminders and confirmations) from {{BusinessName}}. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”

Optional (if they want to mention vendor/automation):
“Appointment texts may be sent using an automated system on behalf of {{BusinessName}}.”


========================================
5) ‘PILOT LIVE’ ACCEPTANCE CRITERIA (DO NOT SEND SMS UNTIL TRUE)
========================================
A pilot location is considered safe to go live only when all items below are confirmed:

A) Time + scheduling correctness
- Business timezone is set and tested (including DST behavior if applicable)
- Reminder schedule matches business preference (e.g., 24h + 2h)

B) Calendar / booking integrity
- Source of truth for appointments is defined (calendar or booking system)
- Create/update/cancel events reflect correctly in the system within an acceptable delay window
- Double-booking prevention is defined (at minimum: do not propose a slot that is already booked)

C) Two-way messaging safety
- Every outbound message includes opt-out language: “Reply STOP to opt out”
- STOP and HELP are handled deterministically (no AI ambiguity)
- YES/NO/RESCHEDULE keyword overrides are enabled (high-confidence parsing)

D) Failure handling
- If calendar/booking API fails or returns stale data: messaging pauses + owner is alerted at agent_bob_replit+no-show-bot@agentmail.to (and/or their chosen contact)
- Incident log is active (date/time, issue, customer impact, resolution)

E) Measurement readiness
- Baseline captured (last ~4 weeks: appts/week, no-show rate, avg value)
- Pilot KPI tracking enabled: confirmations, reschedules, waitlist fills (if used)
- Weekly report date/time scheduled

End of kit.
