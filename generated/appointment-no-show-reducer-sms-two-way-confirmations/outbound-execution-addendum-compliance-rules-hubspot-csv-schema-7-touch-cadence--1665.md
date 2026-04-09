# Outbound Execution Addendum: Compliance Rules + HubSpot CSV Schema + 7-Touch Cadence + Daily KPI Checklist (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T17:26:24.635Z

---

Below is the execution addendum to run outbound safely and consistently for the Appointment No-Show Reducer (SMS + Two-Way Confirmations). Always reference the legitimacy URL https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 and route replies to agent_bob_replit+no-show-bot@agentmail.to.

1) COMPLIANCE-AWARE CONTACT POLICY (practical, not legal advice)
A) Cold email (US): Use plain-text, accurate subject lines, real reply-to email, and include a simple opt-out line in every cold email after the first touch (or in every touch if you prefer). Honor opt-outs immediately. Do not email harvested personal emails if clearly consumer-only; prioritize business domains and “contact/us” business addresses.
Opt-out line (copy/paste): “If you’re not the right person or prefer I don’t reach out again, reply ‘stop’ and I won’t follow up.”

B) Cold calls: Call during local business hours (typically 9am–5pm). If asked not to call again, mark DNC in CRM and stop.

C) SMS texting: Only text where (1) number is clearly a business line that publicly invites contact or the prospect explicitly engaged (returned call, requested info, replied to email), and (2) local rules allow. Keep first text informational, identify business, and include opt-out language. If they reply STOP/UNSUBSCRIBE, do not text again.
Opt-out line for SMS: “Reply STOP to opt out.”

D) Craigslist/FB groups: Do not claim guarantees. Use outcome language like “typically reduces no-shows” and “we’ll quantify impact.”

2) HUBSPOT IMPORT: CSV SCHEMA + DEDUPE/NAMING RULES
A) Required columns for CSV import (minimum viable):
- Company Name
- Company Domain
- Website URL
- Industry / Vertical (Dentist, Chiro, Med Spa, PT, Optometry)
- City
- State
- Phone (Main)
- Contact First Name
- Contact Last Name
- Contact Title
- Contact Email
- Contact Phone (Direct, if available)
- Source (Google Maps, Yelp, Directory, Website)
- Notes (e.g., “Online booking available”, “Uses Mindbody”, “2 locations”)
- Lead Status (New)
- Owner (Bob)

B) Dedupe rules:
- Primary key = Company Domain. If no domain, use Website URL. If neither, use normalized Company Name + City + Phone.
- If multiple contacts per company, keep one Company record and multiple Contacts.
- Standardize names: “Company Name (City)” only if there are multiple same-brand locations.

C) Pipeline stages (deal-based) to use in HubSpot:
1 New Lead → 2 Contacted → 3 Replied → 4 Demo Scheduled → 5 Demo Held → 6 Trial/Setup Started → 7 Closed Won → 8 Closed Lost

3) 7-TOUCH CADENCE (email-first + call + optional text)
Goal: book a 12–15 minute demo. Personalize only 1 line per message: city + vertical + quick observation (online booking, new patient promo, multiple locations, etc.).

Touch 1 (Day 1) – Email
Subject options: “Quick no-show question” | “Confirmations + reschedules via SMS” | “Reducing gaps in the schedule”
Body:
Hi {{FirstName}} — I’m Bob.
We help appointment-based clinics reduce no-shows using two-way SMS confirmations + instant reschedules + waitlist fill. Setup is done-for-you in 24–48 hours.
If you’re open to it, I can show a 12-min demo and estimate recovered revenue per location.
Legitimacy/info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Best person to speak with about scheduling + no-shows?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

Touch 2 (Day 2) – Call + voicemail
Call opener: “Hi {{FirstName}}, it’s Bob — quick one. We reduce no-shows with two-way SMS confirmations and fast reschedules. Who owns scheduling/no-show reduction there?”
Voicemail (if no answer): “{{FirstName}}, Bob here. We help clinics reduce no-shows with two-way SMS confirmations + reschedules + waitlist fill. I’ll email details—if you’re the right person, reply with a good time for a 12-min demo.”

Touch 3 (Day 3) – Email follow-up
Subject: “Worth a quick look?”
Body:
Hi {{FirstName}} — following up. Most places already send reminders; the difference is we collect a YES/NO confirmation and automatically reschedule NOs while offering openings to a waitlist.
If you tell me (1) appts/week and (2) typical no-show rate, I’ll estimate impact.
If you’d prefer I don’t follow up, reply “stop”.
— Bob | agent_bob_replit+no-show-bot@agentmail.to

Touch 4 (Day 5) – Optional SMS (only if compliant)
“Hi {{FirstName}} — Bob here. I emailed about reducing no-shows via 2-way SMS confirmations + instant reschedules + waitlist fill. Who should I talk to about scheduling? Reply STOP to opt out.”

Touch 5 (Day 7) – Call
Same opener, but add: “Not trying to sell software—this is done-for-you setup and we quantify recovered revenue per location.”

Touch 6 (Day 10) – Email (proof + soft CTA)
Subject: “I can send the exact workflow”
Body:
{{FirstName}} — if helpful, I can send the exact reminder/confirmation/reschedule workflow we implement (screens + message examples). If it looks useful, we do a quick demo.
Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply “stop” if you’d like me to close the loop.
— Bob

Touch 7 (Day 14) – Breakup email
Subject: “Close the loop?”
Body:
Hi {{FirstName}} — should I close the loop on this? If reducing no-shows and filling last-minute gaps is a priority, I’m happy to show the 12-min demo.
If not, reply “stop” and I won’t follow up.
— Bob

4) DAILY KPI SCOREBOARD + ACTIVITY CHECKLIST (run every weekday)
A) KPIs to record daily:
- New leads added
- Emails sent
- Replies (positive/neutral/negative)
- Calls placed
- Conversations
- Demos booked
- Demos held
- Trials/setups started
- Closed won
- Closed lost

B) Daily blocks (minimum viable):
Block 1 (60–90 min): Add 30–50 new leads + dedupe + assign Owner=Bob.
Block 2 (45–60 min): Send 50–100 emails (Touch 1 + follow-ups due today).
Block 3 (60 min): 20–40 calls (prioritize replied/engaged leads).
Block 4 (15 min): Log outcomes + schedule follow-ups in HubSpot tasks.

C) Outcome logging rules (fast):
- If “Not interested”: mark Lead Status=Disqualified + reason.
- If “Send info”: move to Replied and schedule next touch in 2 days.
- If “Talk later”: set Demo Scheduled if a time is set; otherwise next call date.
- If “Stop/Unsubscribe”: mark DNC/Opt-out immediately.

This addendum is designed so Day-1 can start with zero paid tools: free HubSpot CRM, plain-text email, manual lead sourcing, and consistent follow-ups to drive demo volume.