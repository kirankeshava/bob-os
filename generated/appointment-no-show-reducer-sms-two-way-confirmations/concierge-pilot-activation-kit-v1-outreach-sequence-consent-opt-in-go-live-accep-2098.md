# Concierge Pilot Activation Kit (v1): Outreach Sequence + Consent/Opt-In + Go-Live Acceptance Checklist

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:41:58.616Z

---

## 1) Pilot Invite Email (Day 0)
**Subject options:**
1) Quick pilot to cut no-shows at {{BusinessName}} (free setup)
2) Can we reduce your no-shows in 7 days? (concierge pilot)
3) {{BusinessName}}: two-way SMS confirmations to reduce no-shows

**Email body:**
Hi {{FirstName}},

I’m Bob from Appointment No-Show Reducer. We help appointment-based businesses reduce no-shows using two-way SMS reminders (customers confirm, reschedule, or cancel by replying).

I’m recruiting 2–3 local pilot locations this week. It’s concierge-style (we set it up with you), and we’ll run it for 7 days so you can see measurable results: confirmations, reschedules captured, and estimated recovered revenue.

Here’s our info/legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you’re open, reply with:
1) Your business timezone
2) Average appointment value (rough is fine)
3) Rough weekly appointment volume

Or book a quick 15-minute setup call by replying with 2 times that work.

Thanks,
Bob Smith
Appointment No-Show Reducer
Support: agent_bob_replit+no-show-bot@agentmail.to

---

## 2) Follow-up Email (Day 2)
**Subject:** Re: quick pilot to reduce no-shows?

Hi {{FirstName}},

Just bumping this—still offering a concierge 7-day pilot for two-way SMS confirmations.

If no-shows are painful at {{BusinessName}}, we can usually get a basic flow live quickly (reminder timing + confirm/reschedule + STOP/HELP compliance). We’ll send you a simple weekly value report showing confirmations, reschedules, and estimated recovered revenue.

Details page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Want to try it this week? Reply “pilot” and your timezone.

– Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## 3) Follow-up Email (Day 5) — Close the loop
**Subject:** Should I close your file?

Hi {{FirstName}},

Should I close the loop for now, or would a 7-day pilot be useful?

If helpful, reply with one number:
1) Yes, let’s do a 7-day pilot
2) Not now
3) Check back next month

Thanks,
Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## 4) Pilot Consent + Messaging Compliance Language (copy/paste)
**A) Client-facing statement (for the business to approve):**
“During this pilot, {{BusinessName}} will send appointment-related SMS messages (reminders and two-way confirmations) to customers who have provided their mobile number to {{BusinessName}} for appointment communication. Customers can reply STOP to opt out at any time and HELP for help. Message and data rates may apply.”

**B) Recommended customer consent checkbox (best practice, if client has online booking):**
☐ “I agree to receive appointment-related text messages from {{BusinessName}} at the number provided, including reminders and confirmation requests. Reply STOP to opt out; reply HELP for help. Message & data rates may apply.”

**C) If client collects consent verbally/in-person (script):**
“Can we text you appointment reminders and allow you to confirm/reschedule by text? You can opt out anytime by replying STOP.”

**D) STOP/HELP handling requirements (non-negotiable):**
- Any inbound message containing “STOP”, “UNSUBSCRIBE”, “CANCEL SMS”, or “END” => immediately mark as opted out; stop all future messages.
- Any inbound “HELP” => send a help response: “You’re receiving appointment messages from {{BusinessName}}. Reply STOP to opt out. For support email agent_bob_replit+no-show-bot@agentmail.to.”

**E) Data handling + responsibility note (pilot):**
- We only use appointment details to send/route reminders, confirmations, and reschedule requests.
- The business remains the system of record for appointments; if calendar sync fails, we alert the business/owner escalation contact.

---

## 5) Go-Live Acceptance Checklist (must pass before enabling reminders)
**Business + policy prerequisites**
1. ☐ Timezone confirmed (e.g., America/Chicago). Validate with a test reminder scheduled around local business hours.
2. ☐ Business hours + closed days captured (prevents 2am reschedule pings).
3. ☐ Owner/manager escalation contact captured (name + phone/email) for incident alerts.
4. ☐ Approved consent/opt-in language (Section 4) and acknowledged STOP/HELP behavior.

**Workflow prerequisites**
5. ☐ Reminder schedule defined (e.g., 24h + 2h before). Include exception rules for same-day bookings.
6. ☐ Confirmation keywords finalized (YES/Y/CONFIRM) and negative keywords (NO/N/CAN’T).
7. ☐ Reschedule path defined:
   - ☐ What counts as “reschedule request” keywords (RESCHEDULE, MOVE, LATER, DIFFERENT TIME).
   - ☐ Who handles reschedules during pilot (concierge vs. client staff) and response SLA.
8. ☐ Cancellation path defined (CANCEL) and how cancellations are recorded.
9. ☐ Waitlist policy (optional): criteria to invite waitlist, max messages, and how quickly a slot must be claimed.

**Safety + failure handling**
10. ☐ Double-booking prevention rule confirmed (never confirm a replacement slot until the calendar is updated/verified).
11. ☐ Calendar/API failure fallback confirmed:
   - ☐ If calendar read fails: pause outgoing messages and alert escalation contact.
   - ☐ If calendar write-back fails: do not promise a new time; route to human.
12. ☐ Message threading tested: inbound replies map to the correct appointment (or correct client/location).
13. ☐ Opt-out tested: send STOP from a test number; confirm suppression of future messages.
14. ☐ Help tested: send HELP from a test number; confirm help response.

**Measurement prerequisites (for sales proof)**
15. ☐ Baseline captured (last 4 weeks if possible): approximate no-show rate, avg appointment value, weekly appointment count.
16. ☐ Pilot metrics enabled: confirmations, reschedules, cancellations, opt-outs, waitlist fills.
17. ☐ Weekly report recipient confirmed (email) + report send day/time.

---

## 6) Pilot Recruitment Tracker (fields)
Use a spreadsheet/CRM with these columns:
- Business Name
- Niche (dental, med spa, PT, salon, etc.)
- City/Timezone
- Contact Name + Role
- Email/Phone
- Source (Google Maps, referral, website form, etc.)
- Outreach date (Day 0)
- Follow-up Day 2 sent (Y/N)
- Follow-up Day 5 sent (Y/N)
- Status (Contacted / Replied / Call booked / Qualified / Live pilot / Not fit)
- Qualification notes (volume, current no-show pain, booking system)
- Baseline captured (Y/N)
- Go-live checklist pass (Y/N)
- Pilot start date
- Week 1 report sent (Y/N)

This kit is ready to paste into email and onboarding workflows immediately, using the legitimacy URL and the support inbox for responses.
