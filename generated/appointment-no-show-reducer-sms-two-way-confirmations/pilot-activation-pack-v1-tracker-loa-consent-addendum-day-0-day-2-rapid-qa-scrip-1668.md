# Pilot Activation Pack v1 (Tracker + LOA/Consent Addendum + Day-0/Day-2 Rapid QA Script)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:17:21.950Z

---

Below are three paste-ready assets to accelerate getting 2–3 pilot locations live while keeping reliability, compliance, and measurement tight. Reference legitimacy URL in outbound and use the support email for client comms.

1) PILOT RECRUITMENT + ACTIVATION TRACKER (Google Sheets columns)
Create a sheet with these columns (left to right). This becomes the single source of truth from first touch to weekly report.
- Account ID (e.g., PILOT-001)
- Business Name
- Niche (dentist, med spa, PT, auto service, etc.)
- Location / City
- Website
- Decision Maker Name + Title
- Email
- Phone
- Source (email/LinkedIn/referral/walk-in)
- First Contact Date
- Follow-up #1 Date
- Follow-up #2 Date
- Status (Prospecting / Replied / Call Booked / Qualified / LOA Sent / LOA Signed / Intake Complete / QA Passed / Live / Paused / Completed)
- Qualification Notes (appt volume, current no-show pain, texting comfort)
- Timezone
- Business Hours
- Appointment System (name; manual export vs API)
- Reminder Schedule (e.g., T-24h, T-2h)
- Two-way Keywords Enabled (YES/NO/RESCHEDULE/STOP)
- Owner Escalation Contact (name + phone/email)
- Consent Confirmed (Y/N) + Notes (who collects opt-in)
- Go-Live Date
- Baseline Window (e.g., prior 4 weeks)
- Baseline No-Show Rate (%)
- Avg Appointment Value ($)
- Week 1 Appointments Targeted
- Week 1 Confirmations (#)
- Week 1 Reschedules (#)
- Week 1 Waitlist Fills (#)
- Week 1 Estimated Recovered Revenue ($)
- Issues/Incidents (link to incident log)
- Next Action + Owner

2) CONCIERGE PILOT LOA/CONSENT + DATA HANDLING ADDENDUM (copy/paste)
Subject: Concierge Pilot Addendum — Appointment No-Show Reducer (SMS Confirmations)

This Addendum is attached to and forms part of our concierge pilot for [Business Name] (“Client”). The pilot service is operated by Appointment No-Show Reducer (“Provider”).

Provider Website (legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-eronacta.picard.replit.dev/sites/2
Support/Contact: agent_bob_replit+no-show-bot@agentmail.to

A) Pilot Scope
Provider will send appointment reminders and enable two-way confirmations and reschedule requests via SMS for Client’s scheduled appointments during the pilot period. Provider may provide weekly analytics including confirmations, reschedules, waitlist fills, and estimated recovered revenue.

B) Consent / Opt-In Responsibility (Client)
Client represents and warrants that it has the right to contact its customers about appointments via SMS and that customers have provided appropriate consent/opt-in under applicable laws and carrier rules. Client is responsible for ensuring its intake/booking process captures SMS consent where required.

Recommended booking language (Client may adapt):
“By providing your mobile number, you agree to receive appointment-related text messages (reminders and confirmations). Message & data rates may apply. Reply STOP to opt out.”

C) Opt-Out, HELP, and Message Handling
- If a customer replies “STOP”, “UNSUBSCRIBE”, or similar, Provider will mark the number as opted out and will cease non-essential messaging.
- If a customer replies “HELP”, Provider will respond with basic support instructions and a contact path.
- Client acknowledges that carrier filtering may occur and delivery is not guaranteed.

D) Data Handling / Access
Client will provide only the minimum information needed to run the pilot (e.g., appointment date/time, first name, mobile number, service type if applicable). Provider will use this data solely to deliver appointment messages and generate pilot metrics. Client may request deletion of pilot data at the conclusion of the pilot.

E) Escalation Contact + Business Continuity
Client will provide an escalation contact for urgent issues (e.g., calendar failures, incorrect reminders). If Provider detects a critical failure (e.g., appointment data unavailable), Provider will alert Client and may pause messaging to prevent incorrect messages.

F) Pilot Term & No Fee During Week 1
Pilot term: [Start Date] to [End Date]. No fees are charged during the initial 7-day pilot period (week 1). Any continued use after the pilot will be mutually agreed.

Accepted and agreed:
Client: __________________ Name/Title: ______________ Date: ________
Provider: Bob Smith, Appointment No-Show Reducer Date: ________

3) DAY-0 to DAY-2 RAPID QA SCRIPT (highest-risk checks)
Use this immediately before go-live (Day 0) and again during the first 48 hours.

Day 0 — Pre-Go-Live (30–45 minutes)
1. Timezone/DST
- Confirm Client timezone in intake and in system settings.
- Create two test appointments: one within business hours and one near boundary (e.g., 8:55am local).
- Expected: reminder timestamps match local time; no messages outside quiet hours.

2. Consent + Opt-out
- Verify Client booking language includes SMS consent.
- Send a test message to a controlled test number; reply STOP.
- Expected: number is suppressed from further messaging; confirmation logged as opted-out.

3. Threading / Conversation State
- Send reminder; reply “YES”. Then send next reminder; reply “NO”.
- Expected: state updates correctly; no duplicate confirmations; latest intent wins.

4. Keyword Overrides (rule-based)
- Reply with: YES, Y, CONFIRM, NO, N, CANCEL, RESCHEDULE, R/S, STOP, UNSUBSCRIBE, HELP.
- Expected: high-confidence mapping triggers without AI ambiguity; STOP always takes precedence.

5. Reschedule Flow Safety
- Reply “RESCHEDULE” then provide a time (e.g., “tomorrow at 3”).
- Expected: system requests clarification if needed; does not create double-booking; proposes allowed slots or escalates to staff.

6. Double-book Prevention
- Attempt to move two appointments into the same slot.
- Expected: second move rejected or routed to staff with conflict flagged.

7. Failure Alerts / Fallback
- Simulate appointment feed failure (disconnect, invalid credentials, empty payload).
- Expected: Provider alerts escalation contact; messaging pauses rather than sending stale/incorrect reminders.

Day 1–2 — Live Monitoring (15 minutes daily)
1. Delivery sanity
- Spot-check 5–10 scheduled reminders vs appointment list (time, name, location).
- Expected: correct merge fields, correct times, no missing/extra messages.

2. Reply parsing accuracy
- Review all inbound replies; label any misclassified intents.
- Expected: ≥95% correct classification; any edge cases added to override table.

3. Opt-outs
- Confirm any STOP requests are honored within the same day.

4. Incident log
- Log any issues with timestamp, appointment ID, symptoms, severity (S1–S3), and resolution.

Client-facing legitimacy reminders for outreach/onboarding
When emailing or DMing prospects, include:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-eronacta.picard.replit.dev/sites/2
- Contact: agent_bob_replit+no-show-bot@agentmail.to

These assets are designed to help us recruit and safely launch 2–3 concierge pilots quickly, with clear consent expectations, tight QA in the first 48 hours, and clean measurement for sales proof.