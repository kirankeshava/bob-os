# AI Review Reply & Reputation Autopilot — CRM Sheet Layout + Post‑Demo Follow‑Up Sequence + Loom Script + Demo Library Index

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T06:00:16.302Z

---

Below are operator-ready assets to run the tight loop from booked call → proposal → payment → activation.

=== A) GOOGLE SHEETS CRM + KPI FUNNEL TRACKER (COPY/PASTE LAYOUT) ===
Create a new Google Sheet named: “Review Reply Autopilot — CRM & KPIs”. Add 5 tabs in this order:

TAB 1: Pipeline
Headers (row 1):
A: Created Date
B: Lead Source (dropdown)
C: Company
D: Contact Name
E: Role
F: Email
G: Phone
H: Website/GBP Link
I: City/Market
J: Vertical (dropdown)
K: # Locations
L: Platform(s) (GBP/Yelp/Both)
M: Avg Reviews / Month
N: Current Response Rate (%)
O: Avg Response Time (days)
P: Rating (GBP)
Q: Biggest Pain (free text)
R: Stage (dropdown)
S: Last Touch Date
T: Next Step
U: Next Step Date
V: Proposed Plan ($/mo)
W: Setup Fee ($)
X: Close Probability (%)
Y: Owner (default: Bob)
Z: Notes

Stage dropdown values (Data validation on column R):
1. New
2. Contacted
3. Discovery Booked
4. Discovery Completed
5. Demo Completed
6. Proposal Sent
7. Closed Won
8. Paid
9. Activated
10. Closed Lost
11. Nurture

Lead Source dropdown values (column B):
Inbound • Cold Email • LinkedIn • Referral • Partner • Other

Vertical dropdown values (column J):
Dentist • Med Spa • Restaurant • HVAC • Plumber • Law Firm • Auto Repair • Salon • Gym • Home Cleaning • Other

Helpful formulas (place these in spare columns or a separate KPI tab; do not overcomplicate Pipeline):
- Add an “Age (days)” column if desired:
AA header: Age (days)
AA2 formula (copy down): =IF(A2="","",TODAY()-A2)

TAB 2: Activity Log
Purpose: capture every touch so follow-up is automatic.
Headers:
A: Date
B: Company
C: Contact
D: Channel (Email/Call/SMS/LinkedIn)
E: Type (Outbound/Inbound)
F: Outcome (Booked/No Reply/Follow-up/Not Fit)
G: Notes
H: Next Step Date

TAB 3: KPI Funnel (Weekly)
Set up weekly rows to measure conversion.
Headers:
A: Week Start (Mon)
B: New Leads
C: Discoveries Booked
D: Discoveries Completed
E: Demos Completed
F: Proposals Sent
G: Closed Won
H: Paid
I: Activated
J: Discovery→Close %
K: Close→Activated %
L: Notes

Formulas (row 2 examples):
J2: =IF(D2=0,"",G2/D2)
K2: =IF(G2=0,"",I2/G2)

TAB 4: Revenue (MRR)
Headers:
A: Company
B: # Locations
C: $/Location (MRR)
D: Total MRR
E: Start Date
F: Status (Active/Paused/Churned)
G: Renewal Date
H: Notes
Formula D2: =IF(OR(B2="",C2=""),"",B2*C2)

TAB 5: Customer Ops (Activation)
Headers:
A: Company
B: Primary Contact Email
C: Platform(s)
D: Access Requested Date
E: Access Granted Date
F: Intake Form Received Date
G: Brand Voice Approved Date
H: First Replies Posted Date
I: Week 1 Report Sent Date
J: Activation Status (dropdown: Not Started / Waiting on Access / Waiting on Intake / In Drafting / Live)
K: Escalation Contact
L: Notes

=== B) POST‑DEMO FOLLOW‑UP EMAIL SEQUENCE (2-TOUCH) ===

EMAIL #1 — send 15–30 minutes after demo
Subject: Next step to start replying to reviews this week (48h activation)

Hi {Name},

Thanks for the time today. As promised, here’s the simple path to launch the AI Review Reply & Reputation Autopilot for {Business}.

Legitimacy / overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

What happens after you say “go”:
1) You forward the access request (Google +/or Yelp) to whoever manages your profiles
2) You fill the 5-minute intake (brand voice + escalation rules)
3) We draft replies for approval (or go live immediately if you prefer)
4) You get a weekly KPI report (response rate, speed, sentiment, escalations)

To start within 48 hours, reply with:
- “Start date: {date}”
- Best escalation contact (name + email + phone)
- Confirm platforms: Google / Yelp / both

If helpful, I can send the forwardable access request email you can paste to your manager/agency.

Reply here or email us at agent_bob_replit+review-bot@agentmail.to.

— Bob


EMAIL #2 — send 48 hours later if no response
Subject: Quick check — want us to take review replies off your plate?

Hi {Name},

Quick check-in. Do you want us to:
A) Launch with approvals for the first 10 replies, then go live
B) Go live immediately with your brand voice + escalation rules
C) Circle back later (tell me when)

If you choose A or B, we can typically activate within 48 hours once access is granted.

Legitimacy / overview page (for your team):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Best email for access + intake: agent_bob_replit+review-bot@agentmail.to

— Bob

=== C) OPTIONAL LOOM SCRIPT (3–4 MIN) FOR ASYNC CLOSE ===
Title: “{Business} — how we’ll respond to reviews + weekly KPIs (48h activation)”

Script:
1) (0:00–0:20) “Hi {Name}, Bob here. Here’s the quick walkthrough of how we’ll manage Google/Yelp review replies safely and consistently.”
2) (0:20–1:20) Show 2 sample replies (one positive, one negative). “Notice: brand-safe tone, thanks + specifics, invitation to return, and for negatives we de-escalate and move offline.”
3) (1:20–2:10) Show escalation rule. “Any review mentioning refund, discrimination, injury, legal threats, or employee names gets escalated to your contact before posting.”
4) (2:10–3:00) Show weekly KPI report bullets. “You’ll see response rate, time-to-first-response, rating trend, top themes, and a list of escalations.”
5) (3:00–3:40) Close: “Next step is access + intake. Once you forward the access request and fill the intake, we can activate within 48 hours.”
6) (3:40–4:00) “Reply to this email or message agent_bob_replit+review-bot@agentmail.to with your start date and escalation contact.”

=== D) DEMO LIBRARY INDEX (PASTE INTO PLAYBOOK) ===
Use this table to instantly pick the right vertical pack during the 5-minute demo.

Vertical → Demo Pack Contents (each pack includes: 1 positive reply, 1 negative reply, 1 escalation note)
1) Dentist → Emphasize empathy, scheduling, anxiety-friendly tone; negative includes chairside discomfort/wait.
2) Med Spa → Emphasize care plan, privacy; negative includes sensitivity/expectations management.
3) Restaurant → Emphasize hospitality, invite back; negative includes wrong order/slow service.
4) HVAC → Emphasize reliability, on-time, warranty; negative includes no-show/reschedule.
5) Plumber → Emphasize urgency, transparency; negative includes pricing surprise.
6) Law Firm → Emphasize confidentiality, professionalism; negative includes ‘no call back’.
7) Auto Repair → Emphasize trust, itemized estimate; negative includes repeat issue.
8) Salon → Emphasize artistry, preferences; negative includes haircut mismatch.
9) Gym → Emphasize community, goals; negative includes billing/cancellation confusion.
10) Home Cleaning → Emphasize consistency, checklist; negative includes missed spots.

Operator note: In the demo, paste the two replies into a doc or chat window and say: “This is the style you’ll see for your business, and we can match your exact tone once your intake is complete.”