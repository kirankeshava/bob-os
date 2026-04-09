# Outbound Execution Pack v3 — 220-Target CRM Table + Day-1 Send Queue + Sequences (Agency + Operator) + LinkedIn/SMS (Local Lead Response Copilot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T09:17:45.302Z

---

Below is a complete, paste-ready outbound execution pack to start sending immediately.

1) TRACKING/CRM (Google Sheet structure)
Create 4 tabs:
A) Leads
Columns: Lead_ID | Segment (Agency/Operator) | Company | Website | Source_URL | City/State | Niche | Decision_Maker_Name | Title | Email | LinkedIn_URL | Contact_Path (email/form/LI) | Personalization_1L | Sequence (A1/A2/O1/O2) | Status (Queued/Sent1/Replied/Booked/NoFit/Bounce) | Last_Touch_Date | Next_Touch_Date | Notes
B) Touch_Log
Columns: Touch_ID | Lead_ID | Date | Channel (Email/LinkedIn/SMS) | Step (1/2) | Subject | Result (Sent/Reply/Bounce)
C) Replies
Columns: Lead_ID | Reply_Date | Reply_Type (Interested/Not now/No fit/Question) | Next_Action | Notes
D) Demos
Columns: Lead_ID | Booked_Date | Demo_Date | Outcome (Pilot/No show/Lost/Won) | $ Potential | Notes

2) TARGET LIST (220 total) — enrichment-ready structure
Use the Leads tab above. Build to 220 rows split:
- 132 Agencies: “Facebook ads”, “lead gen”, “home services marketing”, “PPC”, “Google + FB”, “performance marketing”.
- 88 Operators: roofing, HVAC, plumbing, pest control, water damage/restoration, med spa.
Required per row: Company, Website, Source_URL, Contact_Path, Niche, Location. Optional: Decision maker + direct email.

Example rows (copy format; replace with your collected rows — this is the exact schema to use):
Lead_0001 | Agency | BluePeak Marketing | https://bluepeak.example | https://clutch.co/profile/bluepeak | Austin, TX | Home services FB lead gen | (blank) | Owner | hello@bluepeak.example | https://linkedin.com/company/bluepeak | email | “Saw you run FB lead ads for HVAC—curious how you handle <5 min response after hours.” | A1 | Queued |  |  | 
Lead_0002 | Operator | Summit Roofing Co | https://summitroof.example | https://maps.google.com/?q=summit+roofing | Tampa, FL | Roofing | (blank) | GM | info@summitroof.example | https://linkedin.com/company/summitroof | email | “Noticed you’re advertising storm repair—do new form leads get a text in under 60 sec?” | O1 | Queued |  |  | 

3) DAY-1 SEND QUEUE (60 targets) — selection rules
Queue 35 agencies + 25 operators using these filters:
- Agency signals: case studies mentioning “Facebook lead ads”, “home services”, “appointment setting”, “GHL”, “HubSpot”, “Calendly”, “lead response”.
- Operator signals: “Request a quote” form, “Schedule online”, phone number prominent, mentions “financing”, “same-day”, “emergency”, “24/7”.
For each queued lead, write ONE line personalization:
Template prompts:
- Agencies: “Saw you run FB lead ads for {niche}. How are you handling <5 min speed-to-lead, especially nights/weekends?”
- Operators: “Noticed {offer} + {service area}. Do new web/FB leads get an instant text + 3 quick questions before a human calls?”

4) EMAIL SEQUENCE — AGENCY (2 steps)
Step 1 (A1)
Subject options (rotate):
1) “<5-min speed-to-lead for your home services clients”
2) “Quick question about your FB lead flow”
3) “Idea to lift booked calls (no new ad spend)”

Body:
Hi {FirstName} — {Personalization_1L}

I’m Bob. We built Local Lead Response Copilot: it instantly texts new leads from forms/FB ads, asks 2–4 short qualifying questions, and routes to a booked call/appointment.

Why agencies care: most leaks happen in the first 5 minutes. If you’re driving leads, this is an easy “conversion layer” without touching ads.

If it helps, here’s the live proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Offer: 7-day pilot for 1 client (we’ll set it up, measure speed-to-lead + qualified conversations + booked calls).

Open to a 15-min walkthrough this week? If easier, reply and tell me what CRM you’re using (GHL/HubSpot/Sheets/etc.).

— Bob
agent_bob_replit+lead-copilot@agentmail.to

Step 2 (A2) — send 48–72h later
Subject: “Worth a 7-day pilot?”
Body:
Hi {FirstName} — circling back.

If you’re already getting leads for {Niche}, the fastest win is usually: instant SMS + 2–4 qualifiers + auto-booking. It prevents “lead goes cold” and makes your reporting look better.

Want me to map this onto one client’s funnel and run it for 7 days? If you reply with the intake source (FB lead ads / website form) I’ll tell you the exact setup.

Proof page again: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

— Bob
agent_bob_replit+lead-copilot@agentmail.to

5) EMAIL SEQUENCE — OPERATOR (2 steps)
Step 1 (O1)
Subject options:
1) “Do your new leads get a text in 60 seconds?”
2) “More booked jobs from the same leads”
3) “Stop losing after-hours form leads”

Body:
Hi {FirstName} — {Personalization_1L}

I’m Bob. We built Local Lead Response Copilot: when someone fills your form or FB lead ad, it instantly texts them, asks a few quick questions (job type, urgency, zip), and then helps book a call/appointment.

Most local companies lose leads because response is slow (especially nights/weekends). This fixes that automatically.

Here’s the proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Can we run a 7-day pilot on your next leads and measure: response time + qualified conversations + booked jobs?

— Bob
agent_bob_replit+lead-copilot@agentmail.to

Step 2 (O2) — send 48–72h later
Subject: “Should I close the loop?”
Body:
Hi {FirstName} — should I close the loop?

If you’re open, I can set up instant texting + quick qualification for your {web form/FB leads} and route only qualified leads to your phone/booking.

If you tell me what you use today (website form provider / CRM), I’ll reply with a simple setup plan.

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

— Bob
agent_bob_replit+lead-copilot@agentmail.to

6) LINKEDIN MICRO-SEQUENCE (optional)
Connection note (Agency):
“{FirstName} — saw you run lead-gen for home services. Quick idea to lift booked calls via <5 min SMS response. Mind if I connect?”

Connection note (Operator):
“{FirstName} — quick question: do your new web/FB leads get an instant text in under 60 sec? Mind if I connect?”

After acceptance (short DM):
“Thanks {FirstName}. We built a simple ‘instant SMS + 2–4 qualifiers + booking’ layer for new leads. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 — open to a 15-min look?”

7) OPTIONAL SMS FOLLOW-UP (only where compliant/opt-in exists)
“Hi {FirstName} — Bob here. Quick one: do new {FB/web} leads get an instant text + 2–3 qualifiers, or is it manual? If you want, I can show a 7-day pilot. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 Reply STOP to opt out.”

Execution rule for deliverability: day 1 send 10–20 1:1 warm-ups; day 2 send 30–40; day 3+ ramp to 50/day if bounce rate <3% and replies >2%. Log every touch in Touch_Log and move Status accordingly.
