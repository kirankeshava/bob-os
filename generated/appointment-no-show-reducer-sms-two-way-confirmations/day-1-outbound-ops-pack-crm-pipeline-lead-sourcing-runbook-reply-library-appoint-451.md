# Day-1 Outbound Ops Pack: CRM Pipeline + Lead Sourcing + Runbook + Reply Library (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T07:16:23.522Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL to reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Primary reply inbox: agent_bob_replit+no-show-bot@agentmail.to

1) HUBSPOT (FREE) CRM SETUP — EXACT SPEC
Pipeline name: No-Show Reducer – Outbound
Deal stages (in order):
1. New Lead (not contacted)
2. Contacted (email/call/SMS sent)
3. Replied – Interested
4. Replied – Not Now
5. Demo Booked
6. Demo Held
7. Proposal/Checkout Sent
8. Closed Won (Location Live)
9. Closed Lost

Required custom properties (Company or Deal level):
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City + State
- Locations (#)
- Appointment volume per month (est.)
- No-show rate (est.)
- Avg value per visit ($)
- Current scheduler/EMR (Square, Mindbody, Jane, Dentrix, etc.)
- Decision maker (Owner/GM/Office Manager)
- Last touch (date)
- Next step (text)
- Next step date
- Source (Google manual / Craigslist / FB Groups)

Activity logging rule: Every outbound touch is a HubSpot Activity note with the format:
[Channel] [Result] — 1 sentence summary — Next step + date.
Example: “Email #1 Sent — Offered 24–48h done-for-you setup; asked for 15 min demo — Follow up in 2 days.”

Daily KPI (track in a simple spreadsheet or HubSpot report):
- Emails sent
- Unique prospects contacted
- Replies (total)
- Positive replies
- Demos booked
- Demos held
- Checkouts sent
- Closed won
- Closed lost

2) FIRST 200 LEADS IN 1 DAY — MANUAL LIST BUILD (FAST + FREE)
Goal: 2 city clusters × 5 verticals × ~20 leads each = 200 leads.
City cluster guidance: pick adjacent metros so Craigslist + calling blocks are efficient.
Recommended starter clusters (choose 2):
- Cluster A: Phoenix + Mesa + Tempe
- Cluster B: Austin + Round Rock + Cedar Park
(Alternatives: Tampa/St. Pete/Clearwater, Charlotte/Concord/Gastonia, Denver/Aurora/Lakewood)

Verticals (pick 5): Dentist, Chiropractor, Med Spa, Physical Therapy, Optometry.

Google search operators (copy/paste, swap city):
Dentist:
- "dentist" "Phoenix" "call" "appointment"
- site:facebook.com "Dental" "Phoenix" "book"
- "Phoenix" "family dentistry" "contact" "email"

Chiropractor:
- "chiropractic" "Phoenix" "book an appointment" "contact"
- "Phoenix" "chiropractor" "request appointment"

Med Spa:
- "med spa" "Phoenix" "book" "contact"
- "aesthetics" "Phoenix" "book now" "phone"

Physical Therapy:
- "physical therapy" "Phoenix" "schedule" "contact"
- "PT clinic" "Phoenix" "request an appointment"

Optometry:
- "optometry" "Phoenix" "book" "contact"
- "eye doctor" "Phoenix" "schedule an appointment" "contact"

Lead capture format (copy/paste rows into a sheet, then import to HubSpot):
Company Name | Vertical | City | Website | Contact Name | Title | Email | Phone | Notes (scheduler/booking link/yelp) | Source URL

Where to find emails quickly (in order):
1) Website contact page (often office manager email)
2) “Appointments” or “Request Appointment” page (often has practice email + scheduler vendor)
3) Yelp/Google Business profile (phone; sometimes website reveals email)
4) Facebook page (sometimes has email)
If no email found: capture phone + contact form URL; still add to HubSpot and call first.

3) DAY-1 OUTBOUND RUNBOOK (EMAIL + CALLS + CRAIGSLIST)

A) Email sending (50–100/day)
- Use plain text only. No links except the legitimacy URL when asked or in signature.
- Personalize 1 line: city/vertical + a specific observation (e.g., “saw online booking on your site”).
- Send window: 9:00–11:00am local time + 2:00–4:00pm.
- Cadence Day-1: Email #1 to all 50–100 prospects.

Signature (use every email):
Bob Smith
Appointment No-Show Reducer (Two-way SMS confirmations)
agent_bob_replit+no-show-bot@agentmail.to
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

B) Calls (20–40/day)
Call blocks:
- 11:00am–12:30pm: 10–20 calls
- 4:00pm–5:30pm: 10–20 calls
Call goal: identify decision maker + confirm appointment volume + offer 15-min demo.
If gatekept: ask “Who handles scheduling and no-shows?” then request email to send overview.

C) Craigslist (1 post per cluster per week)
Post in “services” (business/marketing) or relevant category. Offer: “done-for-you setup in 24–48h” and a short CTA to email.
Track each post URL in HubSpot as a note.

D) Lead status rules (so pipeline doesn’t get messy)
- If any outbound attempted: move to Contacted.
- If they ask a question / show pain: Replied – Interested.
- If they give a time/date: Demo Booked (include meeting time in Next step).
- If demo completed: Demo Held (and immediately create Deal amount estimate).
- If checkout link sent: Proposal/Checkout Sent.

4) REPLY LIBRARY (COPY/PASTE) — ALWAYS INCLUDE LEGITIMACY URL + EMAIL

A) Positive reply → book demo
Subject: Re: no-shows
“Perfect — happy to show you. It’s a quick 15 minutes: two-way SMS confirmations, instant reschedules, and waitlist fill (plus simple reporting on recovered revenue).

What’s the best email/number for the person who owns scheduling/no-shows? And are mornings or afternoons better this week?

If helpful, here’s our overview/proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

– Bob (agent_bob_replit+no-show-bot@agentmail.to)”

B) “Send info” reply
“Yep — here’s the 60-second overview: we reduce no-shows using two-way SMS confirmations (patients confirm/cancel), automate reschedules, and fill openings from a waitlist. Done-for-you setup in 24–48 hours.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you answer 3 quick questions, I’ll tell you if it’s worth a demo:
1) Roughly how many appointments/month?
2) Typical no-show %?
3) Avg value per visit?

– Bob (agent_bob_replit+no-show-bot@agentmail.to)”

C) Price objection
“Totally fair. We usually price based on location + appointment volume, but the typical math is: if we prevent even a few no-shows per week, it’s net-positive.

If you share (1) appointments/month and (2) avg value per visit, I’ll estimate recovered revenue and we’ll decide if it’s worth continuing.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
– Bob (agent_bob_replit+no-show-bot@agentmail.to)”

D) Not interested
“No worries — thanks for the quick reply. If no-shows become a focus later, this is the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If you tell me who owns scheduling/no-shows (owner vs office manager), I’ll make sure I don’t bother the wrong person.
– Bob (agent_bob_replit+no-show-bot@agentmail.to)”

E) Compliance/stop
“Understood — I won’t contact you again. – Bob (agent_bob_replit+no-show-bot@agentmail.to)” 

5) DAY-1 CHECKLIST (EXECUTION ORDER)
1) Pick 2 city clusters.
2) Build 200 leads using the capture format.
3) Create HubSpot free account + pipeline + fields.
4) Import leads and assign owners (Bob).
5) Send 50–100 Email #1 and log.
6) Make 20–40 calls; log outcomes; book demos.
7) Post 1 Craigslist ad per cluster (if time) and log URLs.
8) End of day KPI entry + next-day follow-up list.

Definition of success for Day-1: 50–100 emails sent, 20–40 calls placed, 3–8 positive replies started, and 1–3 demos booked within 72 hours.