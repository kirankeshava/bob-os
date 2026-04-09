# Pilot Activation + Consent Pack + 14-Day Scorecard + 3-Touch Outreach Sequence (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:18:58.531Z

---

## 1) Pilot Activation + Consent Pack (Client-Ready)

**Product:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)

**Legitimacy URL to share with staff/owners:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

**Support/Contact:** agent_bob_replit+no-show-bot@agentmail.to

### What this pilot does (plain English)
We send appointment reminders via SMS, ask patients/clients to confirm, and handle common replies (confirm, cancel, reschedule, questions). When appropriate, we can notify a waitlist to fill last-minute gaps. You’ll receive weekly reporting showing confirmations/reschedules and estimated revenue recovered.

### What we need from you (15 minutes)
1) **Business details:** business name, address, timezone, business hours, closure days.
2) **Appointment types + average value:** e.g., “Initial consult $150, Follow-up $90”.
3) **Reminder timing rules:** e.g., 24 hours + 2 hours before.
4) **Reschedule rules:** lead time allowed, same-day handling, minimum notice.
5) **Waitlist rules (optional):** how to prioritize, max messages, cutoff time.
6) **Escalation contacts:** owner/manager name + phone/email for urgent alerts.
7) **Baseline metrics:** last 4 weeks scheduled appts, no-shows, cancels, average ticket.

### Opt-in, STOP/HELP compliance (required)
- **Consent:** You confirm you have customer consent to text appointment reminders OR you will obtain consent as part of your intake/booking process.
- **STOP:** Any message containing “STOP”, “UNSUBSCRIBE”, “CANCEL”, or “END” will immediately opt the person out of future SMS.
- **HELP:** Any message containing “HELP” triggers a support response directing them to: agent_bob_replit+no-show-bot@agentmail.to.
- **Quiet hours:** We will not initiate messages outside your configured business hours (except time-sensitive reminders if you explicitly approve).

### Fail-safes (what happens if something breaks)
- If calendar sync/API fails or appointment data looks inconsistent, we **pause automation** and alert your escalation contact.
- If the system is uncertain about a reply (ambiguous), we **route to manual review** and notify your team (concierge mode) rather than guessing.

### Go-live timeline (concierge pilot)
- **Day 0:** onboarding intake + baseline capture + message approval.
- **Day 1:** soft launch (small subset or all appointments depending on comfort).
- **Days 1–7:** daily monitoring + incident log; rule tweaks as needed.
- **Day 7:** first weekly value report (baseline vs pilot week).
- **Day 14:** pilot outcome review + decision to continue paid.

### Message quality: default templates (editable)
**Reminder #1 (24h):**
“Hi {FirstName}—reminder of your appointment with {BusinessName} on {Day} at {Time}. Reply YES to confirm, NO to cancel, or R to reschedule.”

**Reminder #2 (2h):**
“Hi {FirstName}—we’ll see you at {Time}. Reply YES to confirm or R to reschedule.”

**Confirmation received:**
“Thanks—you're confirmed for {Day} at {Time}. Reply STOP to opt out.”

**Reschedule prompt:**
“No problem—reply with a preferred day/time (e.g., ‘tomorrow after 3’). If urgent call {BusinessPhone}.”

**Opt-out confirmation:**
“You’re opted out and will no longer receive texts from {BusinessName}. Reply START to re-subscribe.”

---

## 2) 14-Day Pilot Scorecard (Baseline + Outcomes)

### Baseline (last 4 weeks)
- Location/Business:
- Timezone:
- Avg appointments/week (scheduled):
- Avg no-shows/week:
- Avg late cancels/week:
- Avg completed/week:
- Avg revenue per appointment ($):
- Current reminder method (none/manual/automated):

### Week 1 (Days 1–7)
- Total reminders sent:
- Unique customers messaged:
- Confirmations (YES):
- Cancellations (NO):
- Reschedule requests:
- Reschedules completed:
- Waitlist messages sent (if enabled):
- Slots filled from waitlist:
- Opt-outs (STOP):
- Conversations requiring manual review:

**Estimated recovered revenue (Week 1):**
1) Prevented no-shows = (Baseline no-shows/week − Pilot no-shows/week)
2) Added filled slots = Waitlist fills
3) Recovered appts = Prevented no-shows + Added filled slots
4) Estimated recovered revenue = Recovered appts × Avg revenue/appointment

### Week 2 (Days 8–14)
(Repeat Week 1 metrics)

### Success criteria (pilot “win”)
- ≥20–30% improvement in confirmations OR measurable reduction in no-shows
- Evidence of at least 1–3 recovered appointments/week for the location
- Opt-out rate within acceptable range (typically low single digits)
- No critical failures (wrong timezone, messaging outside rules, broken STOP)

---

## 3) 3-Touch Outreach Sequence (Email + Voicemail + SMS)

**Target:** appointment-based SMBs (clinics, dentists, med spas, PT/OT, salons, auto services)

### Touch 1 (Day 1) — Email
**Subject:** Quick pilot to reduce no-shows at {BusinessName}

Hi {OwnerName},

I’m Bob. We run a simple SMS confirmation + reschedule flow that helps appointment-based businesses cut no-shows and fill last-minute gaps.

If you’re open to a **14-day concierge pilot**, we’ll set it up with your existing workflow and send you a weekly report showing confirmations/reschedules and **estimated revenue recovered**.

Legitimacy link (safe to forward): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you reply with your timezone + average appointment value, I can tell you what “1 recovered appointment/week” typically means in dollars.

Best,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to

### Touch 2 (Day 3) — Voicemail script (20–25 sec)
“Hi {OwnerName}, this is Bob. We run a lightweight SMS confirmation + reschedule system that reduces no-shows for appointment businesses. We’re offering a short concierge pilot and send a weekly report showing recovered appointments and estimated revenue. You can see the product here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Call/text me back or email agent_bob_replit+no-show-bot@agentmail.to.”

### Touch 3 (Day 7) — Email follow-up
**Subject:** Worth trying for 14 days?

Hi {OwnerName},

Checking back—are no-shows or last-minute cancellations a meaningful issue at {BusinessName}?

If yes, we can run a **14-day pilot** where customers confirm by text and reschedules are handled automatically (with manual review when ambiguous). We track confirmations, reschedules, waitlist fills, and provide a weekly value report.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Would a quick 15-minute setup call tomorrow work?

—Bob

### Optional SMS (only if the business publicly lists a number and local rules allow)
“Hi {OwnerName}—Bob here. We run a 14-day concierge pilot to reduce no-shows via SMS confirmations/reschedules + weekly recovered revenue report. Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Reply YES and I’ll send setup options; STOP to opt out.”
