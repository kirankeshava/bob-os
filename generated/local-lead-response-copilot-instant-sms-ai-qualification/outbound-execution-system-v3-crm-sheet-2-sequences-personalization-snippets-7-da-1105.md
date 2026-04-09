# Outbound Execution System v3 — CRM Sheet + 2 Sequences + Personalization Snippets + 7-Day Pilot (Lead Response Copilot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T12:35:57.174Z

---

Business proof URL (use in all outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply-to / contact: agent_bob_replit+lead-copilot@agentmail.to

====================================================
1) TRACKING SHEET / CRM (GOOGLE SHEETS READY)
Create a Google Sheet with 4 tabs: Leads, Touches, Replies, Demos.

TAB A — Leads (one row per prospect)
Columns:
- Lead_ID (A0001…)
- Segment (Agency | Operator)
- Niche (HVAC | Plumbing | Roofing | Pest | Water Damage | Med Spa | Other)
- Company
- Website
- Source (Clutch | UpCity | Google Maps | LinkedIn | Upwork | FB Group)
- Source_URL
- Location (City, State)
- Decision_Maker_Name
- Title/Role (Owner | Founder | Head of Growth | Marketing Director | GM)
- Email
- Phone
- LinkedIn_Profile_URL
- Company_LinkedIn_URL
- Personalization_Line (1 sentence)
- Fit_Signals (e.g., “FB Lead Ads”, “24/7 emergency”, “booking link”, “multi-location”)
- Status (Not Contacted | Attempted | Replied | Demo Set | Pilot | Won | Lost)
- Last_Touch_Date
- Next_Touch_Date
- Notes

TAB B — Touches (one row per touch)
Columns:
- Touch_ID
- Lead_ID
- Date
- Channel (Email | LinkedIn | SMS)
- Step (E1 | E2 | LI1 | LI2 | SMS1)
- Subject (if email)
- Message_Variant (Agency v1 | Operator v1 | Custom)
- Result (Sent | Bounced | Opened (optional) | Clicked (optional))

TAB C — Replies (one row per reply)
Columns:
- Reply_ID
- Lead_ID
- Date
- Reply_Type (Interested | Not now | Already have system | Wrong person | Unsubscribe)
- Key_Objection
- Next_Action

TAB D — Demos
Columns:
- Demo_ID
- Lead_ID
- Date_Booked
- Date_Held
- Outcome (Pilot Offered | Pilot Started | No-show | Closed-won | Closed-lost)
- Pilot_Start_Date
- Monthly_Price_Quoted

Daily KPI targets:
- 50 sends/day (after warmup)
- Reply rate goal: 8–12% on agencies; 5–10% on operators
- Demo booking goal: 10 demos / 7 days

====================================================
2) OUTREACH SEQUENCES (READY TO SEND)

SEQUENCE A — AGENCY (FB lead-gen for home services)

Email 1 (Day 1)
Subject options:
1) "Speed-to-lead for your {home service} clients"
2) "{AgencyName} — quick idea to lift booked calls"
3) "Instant SMS follow-up for FB leads"

Body:
Hi {FirstName} — {Personalization_Line}

Quick idea: we built a lightweight “Lead Response Copilot” that texts new leads instantly (from forms/FB leads), asks 2–4 short qualification questions, and routes the good ones straight to a booked call/appointment.

Agencies like this because it reduces lead leakage after-hours and improves speed-to-lead without adding SDR headcount.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Would you be open to a 15-min chat to see if it fits 1–2 of your accounts? If it’s not useful, I’ll disappear.

– Bob
agent_bob_replit+lead-copilot@agentmail.to

Email 2 (Day 3-4)
Subject: "Worth a 7-day pilot?"

Hi {FirstName} — circling back.

We can run a 7-day pilot on one client:
- Instant SMS response to every inbound lead
- AI qualification (budget/timeline/job type)
- Handoff to calendar or your client’s dispatcher
- Simple daily summary of qualified vs unqualified

If you reply with the best client type (HVAC/plumbing/roofing/etc.) + the CRM/booking tool they use, I’ll tell you the fastest setup path.

Want to test it this week?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
agent_bob_replit+lead-copilot@agentmail.to

LinkedIn (optional, same day as Email 1)
Connection note (<=300 chars):
{FirstName} — saw {AgencyName} runs lead-gen for local/home services. We built an instant SMS + AI qualifier to cut lead leakage + book more calls. Sharing details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

====================================================
SEQUENCE B — LOCAL OPERATOR (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa)

Email 1 (Day 1)
Subject options:
1) "Missed leads after-hours = lost jobs"
2) "Instantly text new leads (and qualify them)"
3) "Quick fix for slow lead response at {Company}"

Body:
Hi {FirstName} — {Personalization_Line}

If you’re getting leads from your site / FB ads, the biggest leak is response time (especially nights/weekends). We built “Lead Response Copilot” to:
1) instantly text new leads,
2) ask a few quick questions to qualify, and
3) book a call/appointment automatically.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Open to a 15-min walkthrough? If it’s not a fit, no worries.

– Bob
agent_bob_replit+lead-copilot@agentmail.to

Email 2 (Day 3-4)
Subject: "Can I set up a 7-day pilot for you?"

Hi {FirstName} — I can set up a 7-day pilot so every new lead gets an instant text + 2–4 qualifier questions.

If you reply with:
- where leads come from (website form / FB / Google LSAs)
- and how you book (call only / calendar / dispatcher)
…I’ll tell you the simplest setup.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
agent_bob_replit+lead-copilot@agentmail.to

LinkedIn (optional)
Connection note:
{FirstName} — quick idea: instant SMS response + short AI qualification for inbound leads to book more jobs faster. Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

====================================================
3) OPTIONAL SMS FOLLOW-UP (COMPLIANCE-FRIENDLY)
Use ONLY for leads where you have an established business relationship or explicit permission to text (e.g., they provided a number on a contact form or opted in). Keep it low frequency.

SMS 1 (Day 2-3 after Email 1):
Hi {FirstName} — Bob here. Sent you a quick note about an instant SMS + AI qualifier that responds to new inbound leads and books calls automatically. If you want, I can share a 7-day pilot outline. (Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4)

====================================================
4) PERSONALIZATION SNIPPET LIBRARY (COPY/PASTE)
Agency angles:
- “Noticed you run lead-gen for {niche} — speed-to-lead is usually the biggest conversion lever after CPL.”
- “Saw your case study for {client/niche}; this is specifically for reducing lead leakage after-hours.”
- “If you’re sending leads to clients via email/CRM, this plugs into the gap before a human responds.”

Operator angles by niche:
HVAC: “Saw you offer emergency/after-hours HVAC — instant response usually matters most when units are down.”
Plumbing: “Noticed you handle emergency plumbing calls — this is built to catch and qualify leads when you’re on another job.”
Roofing: “Saw you do roof replacement/insurance work — qualifier questions help filter tire-kickers and schedule real inspections.”
Pest: “If you’re running promos for pest control, instant SMS helps lock appointments before prospects keep shopping.”
Water damage: “For water damage/restoration, every minute counts — instant text + triage questions can route to dispatch fast.”
Med spa: “If you run FB/IG offers, instant SMS plus a few questions helps book consults while intent is high.”

====================================================
5) 7-DAY PILOT OFFER (INSERT INTO REPLIES / FOLLOW-UP)
“Happy to run a 7-day pilot:
- Connect your lead source (form/FB lead ads)
- Instant SMS reply in <10 seconds
- 2–4 qualification questions tailored to your service
- Auto-handoff to booking (calendar or call)
- End-of-week report: lead count, response rate, qualified %, booked appointments
If it doesn’t measurably improve speed-to-lead/appointments, we stop.”

Use this exact proof link and email in all outreach:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nanuiq6w8j.picard.replit.dev/sites/4
agent_bob_replit+lead-copilot@agentmail.to
