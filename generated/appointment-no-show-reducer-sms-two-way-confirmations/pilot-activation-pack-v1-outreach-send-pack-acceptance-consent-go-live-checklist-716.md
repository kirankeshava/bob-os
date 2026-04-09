# Pilot Activation Pack v1 (Outreach Send Pack + Acceptance/Consent + Go-Live Checklist + Baseline Questionnaire + Tracker)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:21:38.405Z

---

## 1) Pilot Recruitment Tracker (copy/paste into a spreadsheet)

**Columns**
- Company Name
- Niche (Dental/Chiro/PT/MedSpa/etc.)
- Location (City, State)
- Website
- Decision Maker Name/Title
- Email
- Phone
- Source (Google/LinkedIn/Referral)
- Stage (Prospecting / Contacted / Replied / Call Booked / Pilot Accepted / Baseline Captured / Configured / Live / Week-1 Report Sent / Converted)
- Last Touch Date
- Next Step (exact action)
- Next Step Due Date
- Baseline (4-week no-show %) (Y/N + value)
- Avg Appt Value (value)
- Weekly Appt Volume (value)
- Pilot Start Date
- Reminder Settings (24h/2h/etc.)
- Escalation Contact (name + phone)
- Notes (edge cases, constraints)

---

## 2) Outreach Email — Variant A (concierge pilot offer)

**Subject options**
1) “Quick way to cut appointment no-shows (2-week pilot?)”
2) “Two-way SMS confirmations to reduce no-shows — pilot spot”

**Body**
Hi {{FirstName}},

I’m Bob Smith. We’re running a small number of concierge pilots for an **Appointment No-Show Reducer** that sends smart SMS reminders, collects two-way confirmations, and automates reschedules (with opt-out + basic analytics).

Legitimacy link (overview + proof we’re live):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you’re open to a quick test, we’ll set this up for you concierge-style and report weekly outcomes (confirmations, reschedules saved, and estimated recovered revenue).

Two quick questions:
1) About how many appointments do you have per week?
2) Roughly what % no-show/cancel-last-minute do you see today?

If it’s a fit, can we do a **15-minute call** this week?

– Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## 3) Outreach Email — Variant B (value-first, low friction)

**Subject options**
1) “Do you confirm appointments by text?”
2) “Reducing no-shows without extra front-desk work”

**Body**
Hi {{FirstName}},

Do you currently get patients/clients to **reply-confirm** appointments (two-way text), or is it mostly one-way reminders?

We built a micro-SaaS that:
- texts reminders
- asks for a simple YES/NO
- handles reschedule routing
- optionally fills gaps from a waitlist
- shows weekly analytics (estimated revenue recovered)

Here’s our overview page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you want, I can set up a **short pilot** and you’ll get a weekly report so you can see if it’s paying for itself.

Open to a 15-minute call?

– Bob Smith
agent_bob_replit+no-show-bot@agentmail.to

---

## 4) Follow-up Email (send 2–3 days later)

**Subject:** “Re: cutting no-shows with 2-way confirmations”

Hi {{FirstName}},

Just bumping this—if reducing no-shows is a priority, we can run a quick concierge pilot and show weekly results.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you reply with:
- weekly appointment volume, and
- your rough no-show %,
I’ll tell you whether the pilot is likely to show measurable lift.

– Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## 5) LinkedIn DM (short)

Hi {{FirstName}} — I’m Bob. We’re running a few concierge pilots for a two-way SMS confirmation tool that reduces appointment no-shows + automates reschedules.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Open to a 15-min call? If you share weekly appointment volume + rough no-show %, I’ll estimate potential recovered revenue.

---

## 6) Pilot Acceptance + Consent Confirmation Email (send immediately after verbal yes)

**Subject:** “Pilot confirmation + what we need to go live”

Hi {{FirstName}},

Confirmed — we’ll run a concierge pilot of the Appointment No-Show Reducer.

Overview (for your records):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

**How it works (high level)**
- We send SMS reminders before appointments.
- We ask patients/clients to reply with a simple confirmation (e.g., YES) or reschedule intent.
- We support opt-out: replying STOP opts out of texts.
- We provide a weekly value report (confirmations, reschedules saved, gaps filled if waitlist is enabled, and estimated recovered revenue).

**Consent + compliance notes (please confirm by replying “I agree”)**
1) You confirm you have consent to text your customers (or will only message those who have consent under your normal intake/booking process).
2) You agree that any recipient can opt out at any time by replying STOP.
3) You agree to provide an escalation contact if anything looks wrong (so we can pause messages immediately).

**What we need from you (reply in-line)**
- Business timezone:
- Business name as it should appear in texts:
- Primary services (optional):
- Reminder schedule (pick one): (A) 24h + 2h, (B) 48h + 3h, (C) other
- Reschedule handling preference: (A) send a reschedule link, (B) route to front desk, (C) propose 2–3 times
- Escalation contact (name + mobile number):

Baseline metrics (so we can show impact):
- Approx. appointments/week:
- Rough no-show % last month:
- Average appointment value ($):

If easiest, you can also email us any baseline numbers to:
agent_bob_replit+no-show-bot@agentmail.to

– Bob Smith

---

## 7) Pilot Go-Live Checklist (one-page)

**A) Pre-flight (before first message is sent)**
1. Timezone verified (business location + calendar timezone match)
2. Business hours set (no messages outside allowed window)
3. Reminder schedule configured (24h/2h etc.)
4. Message templates reviewed (brand name, tone, who to contact)
5. Opt-out handling confirmed (STOP, UNSUBSCRIBE, CANCEL = opt-out)
6. HELP handling confirmed (HELP = short support message + contact email)
7. Reply parsing overrides enabled:
   - YES / Y / CONFIRM / CONFIRMED → Confirmed
   - NO / N / CAN’T / CANT → Not coming
   - RESCHEDULE / CHANGE / MOVE → Reschedule intent
   - STOP / UNSUBSCRIBE → Opt-out
8. Double-book prevention rule defined (if slot filled, do not confirm a second reschedule into same slot)
9. Failure alerts configured (if calendar/integration fails, alert owner/escalation contact)

**B) Live checks (Day 1)**
1. Send internal test appointment reminders to staff phone(s)
2. Verify threading (replies map to correct appointment)
3. Verify confirmed appointment status is updated (or logged) correctly
4. Verify reschedule flow works end-to-end
5. Verify opt-out suppresses future texts immediately

**C) Monitoring (Days 2–7)**
1. Daily dashboard review: reminders sent, confirmations, reschedules, opt-outs, failures
2. Incident log updated with any edge cases + resolution
3. End of week: generate weekly value report + send to client

---

## 8) Week-0 Baseline Capture Questionnaire (send before pilot start)

1) What booking tool/calendar do you use? (e.g., Google Calendar, Acuity, Calendly, Jane, Mindbody, etc.)
2) Where do appointments live today? (single calendar vs multiple providers)
3) Timezone and typical business hours:
4) Average weekly appointment volume (last 4 weeks):
5) No-show rate estimate (last 4 weeks):
6) Same-day cancellation rate estimate (last 4 weeks):
7) Average appointment value ($):
8) Current reminder process (none / manual calls / one-way SMS / email reminders / other):
9) Any special rules?
   - “Do not text before 9am”
   - “Do not text minors”
   - “Only text for certain appointment types”
   - “Reschedules must go to front desk”
10) Who should receive escalation alerts if anything fails? (name + phone + email)

**How we compute recovered revenue (for transparency):**
Recovered Revenue/week ≈ (No-shows avoided + late-cancels avoided + gap-fills) × Avg Appointment Value
(We’ll show the underlying counts each week in the report.
Support contact: agent_bob_replit+no-show-bot@agentmail.to)
