# Pilot Conversion Pack (Demo Script + Pilot LOI + Baseline Form + QA Go-Live Gate) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:17:14.733Z

---

## 1) 15-minute Pilot Recruitment Call Script (book demo + qualify)

**Goal:** book a pilot onboarding call and confirm they’re a fit (appointment-based, SMS-friendly, measurable baseline). If they’re not a fit, exit quickly.

**Opener (30s):**
“Hi — this is Bob. We run a simple Appointment No-Show Reducer that texts smart reminders, collects two-way confirmations, and automates reschedules + waitlist fills. It’s designed to reduce no-shows without your staff chasing people. Quick question: are you the person who owns scheduling/no-show performance?”

**If yes:**
“Great. I’ll keep this to 2 minutes. Roughly how many appointments do you run per week, and do no-shows meaningfully impact revenue?”

**Qualify (2–3 min):**
1) “What booking system or calendar do you use? (Google Calendar / Outlook / practice mgmt / CRM)”
2) “Do you currently send SMS reminders? If yes, are replies handled by staff?”
3) “What’s your approximate no-show rate, and average appointment value?”
4) “Do you have a waitlist or could you fill last-minute gaps if someone cancels?”

**Value framing (30–45s):**
“The pilot is concierge: we configure your reminder timings, handle common reply intents (confirm, reschedule, cancel), and produce a weekly report showing confirmations, reschedules, waitlist fills, and estimated recovered revenue. We also make sure opt-out compliance is handled correctly.”

**Close (book next step):**
“Would you be open to a 15-minute onboarding call this week? If it looks like a fit, we can run a short pilot and you’ll get a weekly value report. I’ll also share our legitimacy link and the pilot agreement so it’s all transparent.”

**Send after call:**
- Website legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Pilot contact email: agent_bob_replit+no-show-bot@agentmail.to

**Voicemail (20s):**
“Hi, this is Bob — we help appointment-based businesses reduce no-shows using two-way SMS confirmations and automated reschedules. If no-shows are costing you money, I can set up a short concierge pilot and send a weekly recovered-revenue report. Text or email me at agent_bob_replit+no-show-bot@agentmail.to. Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2.”

---

## 2) Concierge Pilot LOI (Lightweight Agreement Template)

**Document title:** Appointment No-Show Reducer — Concierge Pilot Letter of Intent (LOI)

**Parties:**
- Provider: Appointment No-Show Reducer (Operator: Bob Smith; Contact: agent_bob_replit+no-show-bot@agentmail.to)
- Client: __________________________ (Business name)

**Legitimacy URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### 1) Pilot purpose
Client agrees to a short pilot to reduce appointment no-shows by sending SMS reminders, collecting two-way confirmations, facilitating reschedules, and optionally using a waitlist to fill gaps.

### 2) Pilot duration + scope
- Duration: ____ days (recommended 14) starting on ____/____/______
- Scope: ____ location(s), ____ staff calendars (if applicable), appointment reminders for eligible appointments booked at least ____ hours before start time.
- Message types: reminder(s), confirmation request, reschedule flow, cancellation acknowledgment, opt-out handling.

### 3) Client responsibilities (critical for compliance + outcomes)
- **Consent/opt-in:** Client confirms they have appropriate permission to contact clients via SMS (e.g., booking terms, written consent, or compliant opt-in). Client will provide their standard consent language if available.
- **Accurate appointment data:** Client ensures calendar/booking data reflects real appointments, times, and phone numbers.
- **Business rules:** Client supplies hours, timezone, buffer rules, and reschedule constraints (e.g., minimum notice).
- **Escalation contact:** Client provides an owner/manager contact for urgent issues: Name/Phone/Email.

### 4) Provider responsibilities
- Configure reminders, reply handling, and reschedule rules per client instructions.
- Enforce opt-out keywords (STOP, UNSUBSCRIBE, etc.) and stop messaging opted-out numbers.
- Provide a weekly value report: confirmations, reschedules, cancellations, waitlist fills, and estimated recovered revenue.

### 5) Success metrics (measurable)
Pilot will track (at minimum):
- Confirmation rate (% confirmed)
- Reschedule completions (#)
- Same-week filled gaps from waitlist (#)
- No-show rate trend vs. baseline (if available)
- Estimated recovered revenue/week = (shows gained + gaps filled) × avg appointment value (client-provided)

### 6) Data handling + privacy
Provider will use appointment data only to operate reminders and reporting during the pilot. Provider will not sell client/customer data. Client may request deletion of pilot data after pilot ends, except aggregated metrics.

### 7) Reliability + fail-safe behavior
If calendar/booking integration fails or messages cannot be delivered, Provider will alert Client’s escalation contact and may pause messaging to avoid incorrect reminders.

### 8) Commercial terms (choose one)
- Option A (Free pilot): $0 during pilot; post-pilot pricing offered based on location volume.
- Option B (Discounted pilot): $____ during pilot credited toward first paid month.

### 9) Termination
Either party may terminate with written notice. Provider will stop messages within 1 business day of termination confirmation.

**Signatures:**
Client: _____________________  Date: ____/____/______
Provider (Bob Smith): _____________________  Date: ____/____/______

---

## 3) Baseline Metrics Capture Form (copy/paste into email or form)

Subject: Baseline info for your No-Show Reducer pilot

Please reply with the following so we can quantify impact in the weekly report:

1) Business name + location(s):
2) Timezone:
3) Booking system/calendar type (Google/Outlook/other):
4) Appointments per week (approx):
5) Average appointment value ($):
6) Estimated no-show rate over last 4 weeks (%):
7) Current reminder process (none / manual calls / existing SMS / email):
8) Typical lead time (how far ahead people book):
9) Reschedule policy constraints (min notice, fees, etc.):
10) Do you maintain a waitlist? (Y/N). If yes, how do you contact waitlist clients today?
11) Escalation contact (name + phone + email):
12) Any excluded appointment types? (e.g., first-time clients only, procedures, etc.)

Include legitimacy URL in the email footer:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

---

## 4) QA Go-Live Gate (minimum pass before enabling reminders)

**A. Compliance + opt-out (must pass)**
- STOP/UNSUBSCRIBE/CANCEL opt-out keywords immediately stop future messages.
- HELP returns a short help message with support email agent_bob_replit+no-show-bot@agentmail.to.
- Messages include business identification and opt-out language at least once early in the sequence.

**B. Time + timezone safety (must pass)**
- Location timezone is explicitly set and verified.
- DST edge check: reminder scheduling remains correct across DST boundaries.
- No reminders sent outside allowed quiet hours (client-defined).

**C. Calendar/booking correctness (must pass)**
- Appointment time/date parsed correctly and matches source.
- If appointment is moved/canceled in the calendar, reminders update or cancel accordingly.
- Double-booking prevention: reschedule flow respects existing availability and buffers.

**D. Reply handling (must pass)**
- YES/CONFIRM → appointment marked confirmed.
- NO/CAN’T → reschedule offered (or staff notified) per client rules.
- RESCHEDULE → reschedule flow triggered.
- Ambiguous replies route to human escalation (do not guess).

**E. Failure modes (must pass)**
- If calendar API fails, system alerts escalation contact and pauses automated changes.
- If SMS delivery fails, log event and optionally notify staff for manual follow-up.

**F. Analytics instrumentation (must pass)**
- Every appointment has an ID, status timeline (scheduled → reminded → confirmed/rescheduled/canceled/no-response).
- Weekly rollup can compute: confirmation rate, reschedules completed, gaps filled, and estimated recovered revenue.

This pack is ready to paste into outreach/onboarding emails and use during the first 2–3 concierge pilots to ensure reliability and measurable outcomes.