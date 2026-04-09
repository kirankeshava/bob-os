# Concierge Pilot Activation Pack (Client-Facing): Offer + Consent + Baseline Intake + Ops Checklist + Follow-ups

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:58:05.472Z

---

# Appointment No-Show Reducer — Concierge Pilot Activation Pack (v1)

Legitimacy page (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  
Support / contact: agent_bob_replit+no-show-bot@agentmail.to

## 1) Pilot Offer (Client-Facing One-Pager)
**What this is:** A 7-day concierge pilot to reduce appointment no-shows using SMS reminders + two-way confirmations (Yes/No/Reschedule), with optional waitlist fills for last-minute openings.

**Who it’s for:** Any appointment-based business with consistent bookings (clinic, dental, medspa, PT/chiro, salon/barber, home services with scheduled windows, etc.).

**What you get during the pilot (7 days):**
1) Smart reminders sent before each appointment (timing based on your preference).
2) Two-way confirmation handling (CONFIRM / CANCEL / RESCHEDULE workflows).
3) Escalation for edge cases (we alert you if something needs human review).
4) Weekly value summary: confirmations, reschedules, cancellations saved, openings filled, and estimated revenue recovered.

**What we need from you (minimum):**
- Business timezone + business hours
- Your reminder timing preference (e.g., 24h and 2h before)
- Appointment feed access (calendar export, scheduling system access, or a daily CSV—whatever is easiest)
- Your average appointment value (or range)
- A contact for operational escalations

**Pilot success criteria (simple):**
- Reduced no-shows vs baseline OR a measurable increase in confirmations/reschedules handled before appointment time.
- Clean compliance: opt-outs respected immediately; no reminder sent outside agreed quiet hours.

**Pricing during pilot:** $0 for 7 days (concierge setup included). If you continue after the pilot, we’ll agree a monthly plan based on appointment volume.

## 2) Consent + Compliance Notes (Plain-English)
We only message people who have an appointment scheduled with your business and have provided a phone number in your booking process.

**Customer opt-out:** Any reply containing STOP / UNSUBSCRIBE / CANCEL will be treated as an opt-out. After opt-out, we do not message them again (unless they re-opt-in through your normal booking process).

**Help requests:** HELP triggers a short response with support contact: agent_bob_replit+no-show-bot@agentmail.to.

**Quiet hours:** We will not send messages outside the quiet hours you approve in onboarding.

**Data handling:** We only use appointment data to send and track reminders/confirmations for your business and to produce aggregated metrics in your weekly report.

## 3) Baseline Metrics Intake Form (Copy/Paste)
Please reply with the following (rough estimates are OK):

**Business name:**
**Main location address (or city):**
**Timezone:**
**Business hours + days closed:**
**Services with appointments (top 3):**

**Scheduling system (e.g., Calendly, Square, Acuity, Jane, etc.):**
**How appointments are currently confirmed:** (none / calls / email / SMS / mixed)
**Current reminder timing (if any):**

**Volume + value:**
- Avg appointments per day (or week):
- Avg appointment value ($):
- Typical lead time between booking and appointment:

**Baseline (last 4 weeks if possible):**
- Estimated no-show rate (%):
- Estimated late cancellations (%):
- Estimated same-day cancellations (%):

**Rescheduling rules:**
- Can clients reschedule by text? (yes/no)
- Minimum notice required:
- Any policies we should reference (deposit, cancellation fee, etc.):

**Waitlist (optional):**
- Do you keep a waitlist today? (yes/no)
- If yes, where is it stored (CRM/spreadsheet/notes) and how quickly can someone take an opening?

**Escalation contact for edge cases:**
- Name:
- Role:
- Phone:
- Email:

## 4) Day-by-Day Pilot Ops Checklist (Internal/Concierge)
### Day 0 (Setup + Safety)
- Confirm timezone and quiet hours.
- Confirm reminder schedule (e.g., T-24h and T-2h).
- Confirm message templates (brand name, location, reply keywords).
- Verify opt-out handling: STOP/UNSUBSCRIBE/CANCEL → opt-out flag set.
- Verify HELP handling routes to agent_bob_replit+no-show-bot@agentmail.to.
- Run 5 synthetic tests: YES, NO, RESCHEDULE, STOP, random text (“running late”).
- Verify calendar/schedule feed ingestion works; if it fails, configure immediate owner alert.

### Day 1 (First Live Sends)
- Confirm appointments imported correctly (spot-check 10).
- Confirm send times align with timezone.
- Monitor replies hourly for first 4 hours after sends.
- Manually audit 20 replies: ensure YES/NO/RESCHEDULE/STOP classified correctly.
- If misclassification found: add rule-based override keyword and re-test.

### Day 2–3 (Stability)
- Check failed send rate; investigate any spikes.
- Check duplicate reminders (should be zero unless configured).
- Check reschedule loop prevention (no infinite back-and-forth).
- Confirm opt-out list is respected.

### Day 4–5 (Value Capture)
- Track confirmations count and confirmation rate.
- Track reschedules completed before appointment time.
- Track cancellations that opened slots (potential waitlist fill opportunities).

### Day 6 (Pre-Report)
- Pull pilot metrics and compare to baseline assumptions.
- Calculate estimated recovered revenue: (avoided no-shows + filled gaps) × avg appointment value.

### Day 7 (Report + Conversion)
- Send weekly value report to owner.
- Ask for continuation decision and convert to paid if value is clear.

## 5) Follow-up Emails (Free Distribution)
### Follow-up #1 (48 hours after no reply)
Subject: Quick 7-day no-show reduction pilot (no setup fee)

Hi {{Name}} — Bob here.

If you’re open to it, we can run a 7-day concierge pilot to reduce no-shows using SMS reminders + two-way confirmations (Yes/No/Reschedule) and a simple weekly value report.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you reply with your timezone + the best number/email to coordinate, I’ll send a 1-minute intake form and we can go live this week.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Follow-up #2 (Breakup, 4–5 days later)
Subject: Should I close the loop?

Hi {{Name}} — checking once more.

Do you want to try a 7-day concierge pilot to reduce no-shows (SMS reminders + two-way confirmations + weekly recovered revenue report), or should I close the loop for now?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Reply “yes” and I’ll send the intake; reply “no” and I won’t follow up again.

— Bob
agent_bob_replit+no-show-bot@agentmail.to
