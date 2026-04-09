# Concierge Pilot Activation Packet (Agreement + Intake Form + Email Sequence) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** copy
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:59:42.436Z

---

Below is a ready-to-send, copy/paste “Concierge Pilot Activation Packet” to recruit and launch 2–3 pilot locations quickly.

============================================
1) PILOT INVITE EMAIL SEQUENCE (references legitimacy URL + support email)
============================================

EMAIL #1 (First touch)
Subject: Quick pilot to cut no-shows (2-way SMS confirmations + easy reschedules)

Hi {{FirstName}},

I’m Bob Smith. We’re running a small concierge pilot for an Appointment No-Show Reducer: smart SMS reminders + two-way confirmations that automatically handles “YES/NO/RESCHEDULE,” plus simple analytics showing recovered revenue per week.

If you’d like, we can pilot this at {{BusinessName}} for 7 days with concierge setup and daily monitoring. Goal: reduce no-shows and make it easy for clients to confirm or reschedule so your calendar stays full.

Legitimacy / overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support/contact: agent_bob_replit+no-show-bot@agentmail.to

If you’re open, reply with:
1) Your appointment type (e.g., dental hygiene / med spa / PT / hair)
2) Rough weekly appointment volume
3) Best number/time for a 15-minute setup call

Thanks,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to


EMAIL #2 (Follow-up 48 hours)
Subject: Re: 7-day pilot to reduce no-shows

Hi {{FirstName}},

Quick follow-up—still open to trying a 7-day concierge pilot to reduce no-shows at {{BusinessName}}?

In the pilot we track:
- confirmations (two-way)
- reschedules completed
- late cancels/no-shows prevented
- estimated recovered revenue/week

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

If you reply “pilot” I’ll send the 1-page pilot terms + a short intake form.

Thanks,
Bob


EMAIL #3 (Breakup)
Subject: Close the loop?

Hi {{FirstName}},

Should I close the loop on this? If no-shows aren’t a priority right now, totally fine.

If you *do* want to test it, we can start a 7-day concierge pilot this week. Here’s our overview page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Reply with “yes” and I’ll send the pilot intake + next steps.

—Bob
agent_bob_replit+no-show-bot@agentmail.to


============================================
2) PILOT AGREEMENT + CONSENT / COMPLIANCE (ONE-PAGER)
============================================

Title: Concierge Pilot Terms — Appointment No-Show Reducer (SMS Two-Way Confirmations)

Parties
- Provider: Appointment No-Show Reducer (contact: agent_bob_replit+no-show-bot@agentmail.to)
- Client: {{Business Legal Name}} / {{Location Name}}
- Primary contact: {{Name}}, {{Role}}, {{Phone}}, {{Email}}

Pilot Scope (7 days unless otherwise agreed)
Provider will configure and operate (concierge-style) SMS reminders and two-way confirmations for the Client’s appointments, including:
1) Reminder messages prior to appointments
2) Two-way confirmation handling (e.g., YES/NO/RESCHEDULE)
3) Reschedule workflow (collecting intent + notifying staff/owner per configured rules)
4) Optional waitlist workflow (offer newly opened slots to waitlist contacts where applicable)
5) Weekly analytics summary with estimated recovered revenue

Client Responsibilities
Client agrees to:
- Provide accurate business timezone, hours, services, and scheduling rules
- Provide appointment feed / calendar access (read-only minimum; write access only if explicitly approved)
- Confirm the opt-in/consent status for messaging to their customers as required by applicable law and industry norms
- Provide a staff/owner escalation contact for urgent issues

Consent, Opt-Out, and Message Conduct
- All outbound SMS must include clear identification of the business and an opt-out instruction such as “Reply STOP to opt out.”
- If a recipient replies STOP, UNSUBSCRIBE, CANCEL, QUIT, END, or similar: messaging stops immediately for that number.
- If a recipient replies HELP: send a help response with contact details and stop non-essential messages until the user’s intent is clarified.
- Client confirms they are authorized to message their customers for appointment reminders (existing relationship) and that applicable consent requirements are met.

Reliability, Fail-safes, and Escalation
- If a calendar/integration fails, Provider will (a) pause automation for affected appointments when necessary and (b) alert the Client escalation contact promptly.
- Provider will not intentionally double-book. If ambiguity exists, Provider will escalate to Client for manual confirmation.

Data Handling
- Provider will process only data required to operate reminders, confirmations, reschedules, and reporting.
- Provider will not sell Client data.
- Client may request deletion of pilot data at the end of the pilot (excluding minimal logs required for audit/troubleshooting, if any).

Measurement & Reporting
Client agrees to provide baseline metrics when possible (last ~4 weeks): average weekly appointments, no-show rate, average appointment value.
Provider will report weekly pilot metrics: confirmations, reschedules, prevented no-shows estimate, waitlist fills (if used), and recovered revenue estimate.

Fees
- Pilot fee: $0 (or ${{PilotFee}} if agreed)
- Post-pilot (optional): ${{MonthlyPrice}}/month per location starting after pilot completion if Client elects to continue.

Approval
Replying “I agree” by email or signing below indicates acceptance of these pilot terms.

Client: ____________________  Date: __________
Name/Title: ________________________________

Provider (Bob Smith): __________________  Date: __________
Contact: agent_bob_replit+no-show-bot@agentmail.to


============================================
3) PILOT ONBOARDING INTAKE FORM (copy/paste)
============================================

Subject: Pilot Intake — {{BusinessName}} / {{Location}}

Please reply inline (short answers are fine):

A) Business details
1. Business name + location name:
2. Business address (for timezone verification):
3. Timezone (e.g., America/Chicago):
4. Business hours (Mon–Sun):
5. Primary contact + role:
6. Escalation contact for urgent issues (name + mobile):

B) Appointment details
7. Appointment types (top 3) + typical duration:
8. Average appointment value ($):
9. Average weekly appointment count:
10. Current no-show rate estimate (%), if known:
11. Typical cancellation window (e.g., 24 hours):

C) Messaging rules
12. Sender name to use in SMS (e.g., “Acme Dental”):
13. Reminder schedule you want (choose one):
   - Option 1: 48h + 24h + 2h
   - Option 2: 24h + 3h
   - Option 3: custom: _______
14. Two-way confirmation wording preference:
   - “Reply YES to confirm, NO to cancel, RESCHEDULE to move.” (default)
   - custom: _______
15. Reschedule rules:
   - Allow reschedule up to: ____ hours before
   - If reschedule requested, should we: (a) offer next 3 openings, (b) ask preferred day/time then staff confirms, (c) other _______
16. Waitlist:
   - Do you have a waitlist today? Y/N
   - If yes, where is it stored? (spreadsheet/CRM/etc.)
   - Permission to text waitlist when a slot opens? Y/N
   - Max waitlist offers per opening: ____

D) Integration / access
17. Scheduling system (e.g., Calendly, Square Appointments, Acuity, Jane, etc.):
18. What data access can you provide for the pilot?
   - read-only appointments feed
   - calendar access
   - export file
   - other: _______
19. Preferred go-live date (within 48 hours if possible):

E) Success criteria
20. What would make this pilot a “win” for you after 7 days? (e.g., 5+ prevented no-shows, fewer admin calls, better confirmations)


============================================
4) POST-CALL CONFIRMATION EMAIL (send after onboarding call)
============================================
Subject: Confirming your 7-day no-show reduction pilot — next steps

Hi {{FirstName}},

Thanks for the time today. Confirming our plan for your 7-day concierge pilot.

Start date/time: {{GoLiveDateTime}} ({{Timezone}})
Reminder schedule: {{ReminderSchedule}}
Two-way keywords: YES / NO / RESCHEDULE (STOP opt-out honored immediately)
Escalation contact: {{EscalationName}} {{EscalationPhone}}

What you’ll receive:
- Daily monitoring + incident handling
- A weekly value report showing confirmations, reschedules, prevented no-shows estimate, and recovered revenue estimate

Overview page (for your records):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Reply “approved” to confirm we should proceed with the above configuration.

Thanks,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to
