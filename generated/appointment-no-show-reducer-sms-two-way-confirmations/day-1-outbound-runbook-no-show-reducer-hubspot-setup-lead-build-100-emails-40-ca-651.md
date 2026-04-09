# Day-1 Outbound Runbook (No-Show Reducer): HubSpot Setup + Lead Build + 100 Emails + 40 Calls/Text + KPI Logging

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T09:11:02.703Z

---

Objective (Day-1): Launch outbound today with (1) HubSpot free CRM live, (2) first 200 prospects imported, (3) 50–100 cold emails sent, (4) 20–40 calls + optional compliant texts completed, and (5) every touch logged so we can book demos within 24–72 hours.

Legitimacy + reply routing (must be in every template):
- Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact/reply email: agent_bob_replit+no-show-bot@agentmail.to

A) HubSpot CRM setup (30 minutes)
1) Create free HubSpot account using: Bob Smith, agent_bob_replit@agentmail.to.
2) Pipeline stages (Deals):
   - New Lead
   - Contacted (Email)
   - Contacted (Call/Text)
   - Replied / Working
   - Demo Booked
   - Demo Held
   - Closed Won
   - Closed Lost
3) Required properties to add (minimum viable):
   - Vertical (Dental/Chiro/Med Spa/PT/Optometry/etc.)
   - City
   - Website URL
   - Phone
   - Owner/Manager Name
   - Owner/Manager Email
   - Scheduling software (Unknown/Calendly/Acuity/Clinicsense/etc.)
   - Appts per week (estimate)
   - No-show rate (estimate)
   - Value per visit (estimate)
   - Next step (Call back / Send info / Book demo / Not a fit)
   - Last touch date
4) Task queues:
   - “Call today” (all leads with phone + no reply)
   - “Follow-up email” (replied but not booked)

B) Lead list build (first 200 prospects; free sources only)
Pick 2 city clusters (example): Phoenix AZ + Dallas TX.
Pick 3 verticals to start (highest fit): Chiropractors, Med Spas, Dentists.
Lead sources:
1) Google Maps search queries (copy/paste):
   - “chiropractor Phoenix AZ”
   - “medical spa Phoenix AZ”
   - “dentist Phoenix AZ”
   - “chiropractor Dallas TX”
   - “medical spa Dallas TX”
   - “dentist Dallas TX”
2) For each business, capture:
   - Business name, city, phone, website.
3) Find email (free):
   - Check website footer/contact page for owner/manager email.
   - If none, capture contact form URL and use phone-first.
Dedupe rule: dedupe by website domain OR phone number.
Import columns (CSV): Company, Website, City, State, Phone, Contact First Name, Contact Last Name (if known), Contact Email, Vertical, Notes.

C) Cold email sending (50–100/day; plain text)
Send windows: 9:00–10:30am local time; 1:30–3:00pm local time.
From/signature:
- From name: Bob
- Reply-to: agent_bob_replit+no-show-bot@agentmail.to
- Signature block (use every time):
  Bob
  Appointment No-Show Reducer (two-way SMS confirmations)
  Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
  agent_bob_replit+no-show-bot@agentmail.to

Email #1 (initial):
Subject options (rotate):
1) quick question about no-shows
2) reducing no-shows at {{Business}}
3) two-way SMS confirmations?
4) fill last-minute gaps
5) missed appointments
6) appointment confirmations
Body:
Hi {{FirstName}} — Bob here.

Do you ever lose appointments to no-shows/cancellations at {{Business}}?

We reduce no-shows with two-way SMS confirmations + instant reschedules + a waitlist fill that plugs last-minute gaps. Done-for-you setup in 24–48 hours.

If I can show you a 10-minute walkthrough, are you the right person for scheduling/operations?

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Reply here: agent_bob_replit+no-show-bot@agentmail.to

– Bob

Follow-up #1 (2 days later):
Hi {{FirstName}} — quick follow-up. If you’re already happy with confirmations, no worries.

If no-shows are even 5–10%, we usually recover meaningful revenue by (1) two-way confirms, (2) auto-reschedule flows, and (3) texting waitlist to fill gaps.

Open to a 10-minute look this week?
– Bob

Follow-up #2 (4 days later):
{{FirstName}}, should I speak with the office manager or whoever owns the schedule?
If you tell me who that is, I’ll reach out directly.
– Bob

Follow-up #3 (7 days later; breakup):
I’ll close this out after today. If you want, I can send a 1-page estimate of recovered revenue based on your weekly appointments and average visit value.
Want that?
– Bob

D) Call block (20–40/day)
Call windows: 11:00am–12:30pm; 4:00–5:30pm local.
Opener (15 seconds):
“Hi, is this {{Business}}? I’m looking for whoever manages the appointment schedule. Quick question: do you currently do two-way SMS confirmations (where patients text back to confirm)?”

If gatekeeper:
“I’m not trying to sell the front desk anything—this is about reducing no-shows and filling gaps from a waitlist. Who owns scheduling/operations?”

If decision maker:
“We help appointment-based locations reduce no-shows using two-way SMS confirmations + instant reschedules + waitlist fill. Setup is done-for-you in 24–48 hours. If you’re open, I can do a 10-minute demo and show how many appointments you’d likely recover. What does your schedule look like this week?”

Voicemail (20 seconds):
“Hi {{Name}}, this is Bob. We help clinics reduce no-shows using two-way SMS confirmations plus instant reschedules and waitlist fill. Quick overview is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. You can reach me at agent_bob_replit+no-show-bot@agentmail.to. I’ll try you again tomorrow.”

E) Optional compliant text (only if business has published SMS consent language or you have an existing relationship; otherwise avoid)
“Hi {{Name}}—Bob here. Quick question: do you use two-way SMS confirmations to reduce no-shows at {{Business}}? If not relevant, reply STOP.”

F) Reply-handling snippets (paste-ready)
Positive:
“Great—happy to show you. Are you available for a 10-minute walkthrough Tue/Wed? If you share a good time window, I’ll send an invite. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2”
Price:
“It depends on appointment volume, but it’s usually far less than the value of 1–2 recovered appointments/month. If you tell me approx. weekly appointments + avg visit value, I’ll quote it and show the ROI on a quick demo.”
Already have reminders:
“Totally—most do. The lift usually comes from two-way confirmations + auto-reschedule + waitlist fill (not just 1-way reminders). Worth a 10-minute look?”
Not the person:
“No problem—who’s best to speak with for scheduling/operations? If you intro me (or share their email), I’ll reach out directly.”
Stop/opt-out:
“Understood—thanks. I won’t reach out again.” (Mark Closed Lost: Opt-out)

G) KPI logging (end of day, 10 minutes)
Record daily totals:
- Emails sent
- Calls placed
- Connects
- Replies (positive/neutral/negative)
- Demos booked
- Demos held
- Closes
Rules:
- Every outreach touch gets logged same day.
- Every reply gets a next step + date.
- Any lead with interest but no booked time gets a follow-up task within 48 hours.

Definition of a qualified demo:
- They do appointments (>=30/week location OR meaningful revenue per visit), have measurable no-shows/cancels, and we can identify who owns scheduling. If they can’t quantify yet, still book demo if they feel pain and have authority.

Close path (after demo):
- Offer: “Done-for-you setup in 24–48 hours” + start date.
- Ask: “If we can reduce no-shows even slightly, do you want to start this week?”
- Collect: scheduling tool, business texting number preference, hours, waitlist process, and permission to track recovered appointments for testimonial/metrics.

This runbook is designed so any operator can execute Day-1 without additional decisions: build/import 200 leads, send 50–100 emails, place 20–40 calls, and log outcomes to drive demos immediately.