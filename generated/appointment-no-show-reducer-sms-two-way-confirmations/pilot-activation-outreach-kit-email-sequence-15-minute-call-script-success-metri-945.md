# Pilot Activation Outreach Kit (Email Sequence + 15-Minute Call Script + Success Metrics)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** copy
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:22:12.926Z

---

## 1) Pilot Invitation Email (Initial)
**Subject:** Quick pilot: reduce appointment no-shows in 7 days (2 spots)

Hi {{FirstName}},

I’m Bob Smith. We run **Appointment No-Show Reducer** — a lightweight SMS system that sends smart reminders, collects two-way confirmations, automates reschedules, and can fill last-minute gaps from a waitlist.

Legitimacy link (what it is + how it works): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

We’re opening **2 pilot spots** this week for appointment-based businesses. It’s concierge setup (we configure it for you), and the goal is measurable outcomes in **7 days**:
- Fewer no-shows via confirmations
- Faster reschedules when someone can’t make it
- (Optional) Waitlist fill for last-minute cancellations
- A simple weekly report showing estimated recovered revenue

If you’re open to it, reply with:
1) Your appointment type (e.g., dental hygiene, med spa, PT, salon)
2) Approx. appointments/week
3) Your best guess of current no-show %

If it’s a fit, we’ll do a **15-minute setup call** and pick a go-live date (often same day).

— Bob Smith
Appointment No-Show Reducer
Support: agent_bob_replit+no-show-bot@agentmail.to


## 2) Follow-up #1 (48 hours)
**Subject:** Re: reduce no-shows with 2-way SMS confirmations

Hi {{FirstName}},

Wanted to bubble this up. We’re running a small pilot batch right now and still have **{{1 or 2}} pilot slots** available.

If you want to sanity-check it first, here’s the overview link again:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Question: what’s your biggest no-show driver today?
A) people forget
B) they can’t make it but don’t call
C) last-minute cancellations you can’t backfill

Reply A/B/C and I’ll tell you exactly how we’d configure the pilot.

— Bob
agent_bob_replit+no-show-bot@agentmail.to


## 3) Follow-up #2 (4–5 days)
**Subject:** Should I close your file?

Hi {{FirstName}},

No worries if timing isn’t right. Should I close your file for now, or are you open to a 15-minute pilot setup call?

If yes, reply with two times that work and your timezone.

Details/legitimacy link:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob Smith
agent_bob_replit+no-show-bot@agentmail.to


## 4) 15-Minute Pilot Onboarding Call Script (Close + Go-Live)
**Call goal:** In 15 minutes, secure (1) consent/opt-in approach, (2) baseline metrics, (3) configuration inputs, and (4) a go-live date (today/tomorrow).

### Minute 0–2: Frame + outcome
“Thanks {{Name}}. In 15 minutes we’ll confirm fit, pick your reminder + confirmation timing, and set a go-live date. At the end you’ll know exactly what we’ll measure in week 1 and you’ll get a weekly value report.”

### Minute 2–5: Qualify (fast)
1) “How many appointments/week per location?”
2) “What’s your rough no-show % right now?”
3) “Average appointment value (or contribution margin if you know it)?”
4) “Any appointment types we should exclude?”

### Minute 5–9: Configure pilot rules
- Timezone + business hours
- Reminder schedule (recommendation):
  - 24 hours before: reminder + confirm
  - 2 hours before: short reminder
- Two-way confirmation keywords (tell them): YES / NO / RESCHEDULE / STOP
- Reschedule handling:
  - If “NO/RESCHEDULE”: send link or request preferred times (concierge if needed)
- Waitlist (optional):
  - “Do you have a list of clients who want earlier slots?”
  - If yes: define opt-in method + message frequency limits

### Minute 9–12: Consent + compliance (must-have)
“Do you already collect SMS consent in your intake forms? If not, we can use an explicit opt-in message before sending reminders.”
- Confirm STOP/HELP handling
- Confirm what number/messages the business will send from (if known)

### Minute 12–14: Go-live + baseline capture commitment
“Let’s set go-live for {{date}}. Before we start, can you share your last 4 weeks totals (even approximate):
- # scheduled appointments
- # no-shows
- # late cancels
- average $ value/visit
This is how we’ll quantify recovered revenue in the weekly report.”

### Minute 14–15: Close + next steps
“I’ll send a confirmation email summarizing settings, go-live date, and the baseline numbers we’ll use. Support is agent_bob_replit+no-show-bot@agentmail.to. Also here’s our overview link for your records: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”


## 5) ‘Pilot Success Proof’ Minimum Dataset (Week 1)
Collect these to produce a credible value report and sales proof:

**Baseline (pre-pilot, last 4 weeks preferred):**
- Total scheduled appointments
- No-shows count
- Late cancels count (same-day or <24h)
- Average revenue per completed appointment (or average invoice)
- Location timezone + typical operating hours

**During pilot (daily/weekly totals):**
- # reminders sent
- # confirmations received (YES)
- # negative replies (NO) and # reschedule requests
- # reschedules completed (and whether slot stayed filled)
- # STOP/opt-outs
- # waitlist offers sent + # filled slots
- Any incidents (calendar API failure, message delivery issues) + time-to-resolution

**Recovered revenue estimate (simple):**
Recovered Visits = (Reschedules Completed + Waitlist Fills) – (Any pilot-caused failures)
Recovered Revenue = Recovered Visits × Avg Revenue/Visit

This dataset is the minimum needed to send a weekly report that’s hard to dispute and supports conversion to paid.
