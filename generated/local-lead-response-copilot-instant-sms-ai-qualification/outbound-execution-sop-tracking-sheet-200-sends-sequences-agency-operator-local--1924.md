# Outbound Execution SOP + Tracking Sheet (200 Sends) + Sequences (Agency/Operator) — Local Lead Response Copilot

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T18:48:35.612Z

---

Below is a complete, paste-ready outbound operating system to send 200 targeted outreaches and track replies/demos for Local Lead Response Copilot.

==============================
A) DAY-TO-DAY OUTBOUND SOP (7 days)
==============================
Goal: 200 total outreaches, 20 replies, 10 demos booked.
Core offer: 7-day free pilot to prove faster speed-to-lead + higher appointment rate.
Legitimacy links to include: 
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Reply-to/support: agent_bob_replit+lead-copilot@agentmail.to

Daily cadence (recommended):
1) 60–90 min Enrichment block
   - Enrich 30–50 new prospects/day (name + role + direct email or best contact path).
   - Pull a 1-line personalization hook (see Section D).
2) 45–60 min Send block
   - Day 1: 10–20 warmup 1:1 emails only (no links in first 10 if deliverability is uncertain).
   - Days 2–4: 40–60/day (cap at ~50/day if brand new inbox).
   - Keep subject lines short; avoid heavy tracking/URL shorteners.
3) 30 min Follow-up block
   - Send Step-2 follow-ups exactly 48–72 hours after Step-1.
4) 15 min Metrics block (end of day)
   - Update: Sent, Delivered (if known), Reply type, Demo booked, Next step.
   - If reply rate <5% after 50 sends: swap subject + tighten first line.

==============================
B) TRACKING SHEET (GOOGLE SHEETS FORMAT)
==============================
Create a Google Sheet with 4 tabs: Leads, Touches, Outcomes, Dashboard.

TAB 1: Leads (one row per company)
Columns:
- Lead_ID (e.g., A001)
- Segment (Agency | Operator)
- Company
- Niche (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa | Agency-HomeServices)
- Location (City, State)
- Website_URL
- Source_URL (Clutch/UpCity/LinkedIn/Google Maps/Upwork/FB group)
- DecisionMaker_Name
- DecisionMaker_Role (Owner/Founder/GM/Head of Growth)
- Email
- LinkedIn_Profile_URL
- Phone (optional)
- Personalization_Line (1 sentence)
- Status (Not Contacted | Step1 Sent | Step2 Sent | Replied | Demo Booked | Closed/Won | Closed/Lost)
- Last_Touch_Date
- Next_Touch_Date
- Notes

TAB 2: Touches (one row per touch)
Columns:
- Touch_ID
- Lead_ID
- Date
- Channel (Email | LinkedIn | SMS)
- Sequence (Agency S1 | Agency S2 | Operator S1 | Operator S2)
- Subject/Message_Variant
- Result (Sent | Bounced | Replied | No Response)
- Notes

TAB 3: Outcomes (one row per reply/demo)
Columns:
- Lead_ID
- Outcome_Type (Positive Reply | Neutral | Not Now | Objection | Unsubscribe | Demo Booked | No Show | Closed Won | Closed Lost)
- Date
- Key_Objection
- Next_Action
- Notes

TAB 4: Dashboard (manual formulas)
Metrics to track daily:
- Total Leads
- Total Sends (count Touches where Result=Sent)
- Reply Count (count Outcomes where Outcome_Type contains Reply)
- Reply Rate = Reply Count / Total Sends
- Demo Booked Count
- Demo Rate = Demo Booked / Total Sends

==============================
C) 2-STEP OUTREACH SEQUENCES (READY TO SEND)
==============================

SEQUENCE 1 — AGENCIES (FB lead-gen / local)

Email Step 1 (Agency)
Subject options:
1) “Speed-to-lead for your FB leads”
2) “Quick idea to lift booked calls”
3) “Stop losing after-hours leads”

Body:
Hi {{first_name}},

Noticed {{personalization_line}}.

If you’re running FB lead-gen for local/home-service clients, the biggest leak I see is simple: leads wait 5–30 minutes for a human response (especially nights/weekends), and conversion drops fast.

I’m building Local Lead Response Copilot — it instantly texts new leads, asks 2–4 qualification questions, and books calls/appointments automatically.

Would you be open to a 7-day free pilot on one client? If it doesn’t increase booked appointments, you can drop it.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply here or email: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Email Step 2 (Agency) — 48–72h later
Subject: “Worth testing on 1 account?”

Hi {{first_name}},

Quick follow-up — if you want, I can set this up on one campaign so every new lead gets an instant SMS + short qualification flow, then pushes booked calls to your preferred booking method.

Two questions:
1) Are most of your leads coming from FB lead forms or landing pages?
2) Do you lose the most leads after-hours or during busy hours?

If you send me your best-performing niche (HVAC/plumbing/roofing/etc.), I’ll tailor the qualification questions.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Email: agent_bob_replit+lead-copilot@agentmail.to

— Bob

LinkedIn connect note (Agency)
“{{first_name}} — saw you run lead-gen for local/home services. I’m building an instant SMS + AI qualifier that books calls fast. Open to a 7-day free pilot on 1 account?”


SEQUENCE 2 — LOCAL OPERATORS (HVAC/plumbing/roofing/pest/water damage/med spa)

Email Step 1 (Operator)
Subject options:
1) “Missing leads after-hours?”
2) “Instant text-back for new inquiries”
3) “Quick way to book more jobs”

Body:
Hi {{first_name}},

Noticed {{personalization_line}}.

When someone requests a quote/consult, the company that replies first usually wins. Local Lead Response Copilot instantly texts new leads, asks a few quick questions (service + urgency + location), and helps you book the call/appointment automatically.

I’m offering a 7-day free pilot to prove it lifts booked appointments (especially after-hours). If it doesn’t help, you can drop it.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Email: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Email Step 2 (Operator) — 48–72h later
Subject: “Should I set this up for your lead form?”

Hi {{first_name}},

If you tell me where leads come in (website form, FB lead ads, Google LSA, etc.), I can set up the instant text-back + 2–4 questions and route only qualified leads to you.

What’s the best number/email for new leads today?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Email: agent_bob_replit+lead-copilot@agentmail.to

— Bob

LinkedIn connect note (Operator)
“{{first_name}} — quick idea: instant SMS response + short qualifier for new inquiries so you book faster (esp. after-hours). I’m offering a 7-day free pilot. Want details?”

Optional SMS follow-up (only where compliant/appropriate; ideally inbound leads or explicit opt-in)
“Hi {{first_name}} — Bob here. Sent you a note about an instant text-back + quick qualifier for new leads to book faster. Want me to share the 7-day pilot details? Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (reply STOP to opt out)” 

==============================
D) PERSONALIZATION LIBRARY (1-LINERS)
==============================
Use ONE line only (keep it fast):
Agencies:
- “Saw you run Facebook lead-gen for {{vertical}} companies and highlight appointment booking on your site.”
- “Noticed your case study for a {{city}} {{vertical}} business — curious how fast leads get contacted today.”
- “Looks like you manage PPC/FB + landing pages for home services — speed-to-lead is usually the biggest unlock.”

Operators:
- “Saw you offer {{service}} in {{city}} and have a ‘Request a Quote’ form — do you reply instantly after-hours?”
- “Noticed you run specials for {{service}} — curious if leads ever wait >10 minutes for a response.”
- “Saw your Google reviews mention fast service — thought instant text-back could help you book even more.”

==============================
E) DAY-1 SEND LIST BLUEPRINT (HOW TO PICK THE FIRST 50)
==============================
Pick:
- 30 agencies: explicit FB lead-gen / home services positioning (Clutch/UpCity/LinkedIn headlines).
- 20 operators: high ticket + urgent response verticals (water damage, HVAC, roofing, plumbing).

Enrichment checklist per prospect (60 seconds):
1) Find decision maker (Owner/Founder/Head of Growth/GM).
2) Capture direct email OR best contact path.
3) Write 1 personalization line from website/case study/review.
4) Assign Segment + Niche.
5) Set Status=Not Contacted.

Execution checklist:
- Send Step 1 to 10–20 warmups first.
- Then send remaining Day-1 batch.
- Log every send in Touches, update Leads Status/Last Touch.

This system is ready to run: fill Leads for the top 50, send Step-1, and track replies/demos daily until 200 touches are completed.