# Outbound Execution v1: Booking Link Workflow + 7-Touch Cadence + Demo-to-Close Scripts + KPI Reporting

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T23:05:55.599Z

---

## 1) Single booking link workflow (HubSpot Meetings – free)
**Goal:** every positive reply/call outcome turns into a booked demo within 2 messages.

**Meetings page settings (copy/paste):**
- Meeting name: **No-Show Reduction Demo (15 min)**
- Location: **Google Meet** (or phone)
- Description:
  "Quick 15-min walkthrough of how we reduce no-shows using two-way SMS confirmations, instant reschedules, and waitlist fill. We’ll estimate recovered revenue for your location and show a 24–48 hour done-for-you setup plan. 

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 
Email: agent_bob_replit+no-show-bot@agentmail.to"
- Pre-meeting questions:
  1) “How many appointments/week (approx)?”
  2) “Rough no-show or late cancel %?”
  3) “What scheduling system do you use (ex: NexHealth, Dentrix, Jane, Mindbody, Google Calendar, etc.)?”
  4) “Best # for confirmations (office line)?”

**Routing rule for replies:**
- If prospect asks “send info” → reply with 2-sentence value + booking link.
- If prospect shows intent (“interested”, “tell me more”) → reply with booking link + 2 time options.
- If prospect asks price → give range only after 2 qualifiers, then booking link.

**Reply snippet (book now):**
“Happy to. The fastest way is a 15-min walkthrough—here’s my calendar: {{MEETINGS_LINK}}. If you tell me your best day/time window I can also send 2 options. 

Legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 (reply here or email agent_bob_replit+no-show-bot@agentmail.to).”

---

## 2) 7-touch / 10-business-day cadence (email + call + optional text)
**Target ICP:** single-location and 2–10 location clinics (dentist, chiro, PT, optometry, med spa) doing 50+ appts/week.

**Outcome statuses to log (HubSpot):** Not reached / Left VM / Replied – Interested / Replied – Not now / Wrong person / Bad email / Booked demo / DNC.

### Day 1
**Touch 1 (Email):** Primary pitch.
- Subject options: “Quick fix for no-shows at {{Business}}” / “Two-way confirmations (reduces no-shows)”
- Body (tight):
  “Hi {{First}},

We help appointment-based clinics reduce no-shows using two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.

If you’re open, I can show a 15-min demo and estimate recovered revenue for {{Business}}.

Legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 
—Bob (agent_bob_replit+no-show-bot@agentmail.to)"

**Touch 2 (Call):** Same day call block; if gatekeeper, ask: “Who owns scheduling and reminders?”
**Optional Touch 2b (Text if compliant/they have opt-in context):**
“Hi {{First}}—Bob here. Quick q: are you the right person for appointment reminders/no-show reduction at {{Business}}?”

### Day 2
**Touch 3 (Email follow-up):**
“Worth a quick look? Most clinics see fewer no-shows just by adding two-way ‘Confirm/Reschedule’ + auto waitlist fill. 15 min: {{MEETINGS_LINK}}”

### Day 4
**Touch 4 (Call + VM):**
VM script: “{{First}}, Bob—calling about cutting no-shows with two-way SMS confirmations and instant reschedules. If you want, I can estimate what 1–2 recovered appointments/week is worth for {{Business}}. Text/call me back or email agent_bob_replit+no-show-bot@agentmail.to.”

### Day 6
**Touch 5 (Email w/ ROI math):**
“Quick math: if you do ~{{X}} appts/week and no-shows are {{Y}}%, recovering even 2 visits/week can be ${{Z}}/month. Want me to run the estimate live? {{MEETINGS_LINK}}”

### Day 8
**Touch 6 (Call):** Ask for 30 seconds; qualify fast (see section 3).

### Day 10
**Touch 7 (Breakup email):**
“Should I close the loop? If no-show reduction isn’t a priority, no worries. If it is, here’s the 15-min link: {{MEETINGS_LINK}} (or reply and I’ll send 2 times).”

---

## 3) Fast qualification (phone or demo opener)
**Qualify in <2 minutes:**
1) “Roughly how many appointments/week?” (need 50+ for strong ROI; still proceed if high ticket)
2) “What’s your no-show/late cancel rate?”
3) “Average value per visit?”
4) “Who owns scheduling + reminders?” (decision maker)
5) “What system are you using today for scheduling/reminders?”

**Green flags:** high appt volume, high no-show, high value per visit, multi-location, manual reminder process.

---

## 4) Demo-to-close scripts (tight)
### 15-min demo agenda
- Minute 0–3: confirm problem + numbers (appts/week, no-show %, value/visit)
- Minute 3–8: show solution (two-way confirm, reschedule flow, waitlist fill, analytics)
- Minute 8–12: “24–48 hour done-for-you setup” plan + what we need (export, office #, scripts)
- Minute 12–15: close: free 7-day trial + onboarding booking

### ROI proof (say this)
“Even recovering **1–2 appointments/week** typically pays for this many times over. We’ll track confirmations, reschedules, and filled cancellations so you can quantify recovered revenue per location.”

### Close path A (Trial / Week 1 policy)
“Let’s do a **free 7-day trial**. If we can’t show measurable reduction in no-shows or improved confirmations, you can drop it—no hard feelings. I can get you set up in 24–48 hours. Can we book onboarding for tomorrow?”

### Close path B (Pilot for multi-location)
“Let’s pilot **one location** first, prove the numbers, then roll out location-by-location. Who should be involved from ops/scheduling?”

### Close path C (Objection: ‘we already have reminders’)
“Totally—most do. The lift usually comes from **two-way confirmations + instant reschedule + waitlist fill**, not just reminders. Are patients able to reply ‘1 to confirm / 2 to reschedule’ today?”

---

## 5) Daily KPI report template (copy/paste)
**Date:** ____
- Leads added to CRM: ____
- Emails sent: ____
- Email replies: ____ (Interested: __ / Not now: __ / Unsub/DNC: __)
- Calls placed: ____
- Connects: ____
- VMs left: ____
- Texts sent (compliant): ____
- Demos booked: ____
- Demos held: ____
- Trials started: ____
- Locations closed/won: ____
- Notes/learning (top objections, best vertical, best subject line): ____

**Weekly rollup (Mon–Sun):**
- Total sends: ____ | Reply rate: ____% | Demo book rate: ____% | Close rate (held→won): ____% | Avg time-to-setup: ____ days

---

## 6) Compliance + deliverability guardrails (no spend)
- Keep emails plain-text, 80–140 words, no images, minimal links (only legitimacy URL + booking link).
- Always include a simple opt-out line: “If I missed the mark, reply ‘no’ and I won’t follow up.”
- Only text when there’s reasonable business context (public business line, prior call attempt) and stop immediately if asked.

**Signature (use everywhere):**
Bob Smith
Appointment No-Show Reducer (SMS two-way confirmations)
Legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to
