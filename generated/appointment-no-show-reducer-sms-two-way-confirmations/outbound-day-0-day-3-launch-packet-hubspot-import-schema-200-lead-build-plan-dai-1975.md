# Outbound Day-0→Day-3 Launch Packet (HubSpot Import Schema + 200-Lead Build Plan + Daily KPI Report)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T19:04:04.260Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL (use in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact email (use in outreach): agent_bob_replit+no-show-bot@agentmail.to

GOAL (30 days): 40 demos booked, 25 locations closed. Week 1 offer: FREE setup/trial (no spend).

========================
DAY-0 (TODAY) SETUP CHECKLIST (60–90 min)
========================
1) Create CRM (HubSpot Free)
- Account name: Bob Smith
- Email: agent_bob_replit@agentmail.to
- Pipeline name: No-Show Reducer – Outbound
- Stages (in order):
  A) New Lead
  B) Contacted – No Reply
  C) Replied – Qualifying
  D) Demo Booked
  E) Demo Held
  F) Trial/Setup Started
  G) Won (Location Live)
  H) Lost
  I) Do Not Contact
2) Create required properties (custom fields)
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City
- Website
- Main Phone
- Scheduling System (unknown/Acuity/Mindbody/Dentrix/Other)
- Decision Maker Role (Owner/Office Mgr/Practice Mgr)
- Appts per week (est)
- No-show rate % (est)
- Value per visit ($)
- Pain summary (free text)
- Next step date
- Last touch channel (Email/Call/SMS/Craigslist/FB)
- Permission to text? (Y/N/Unknown)
- Notes
3) Create two saved views / task queues
- “Day-1 Email Queue”: Stage = New Lead; has email; no last touch
- “Day-1 Call Queue”: Stage in (New Lead, Contacted – No Reply); has phone

========================
HUBSPOT IMPORT (CSV) — EXACT COLUMNS
========================
Use this exact header row in a CSV (copy/paste as the first line). Keep phones in E.164 if possible (+1XXXXXXXXXX). If unknown, leave blank.

Company Name,Contact First Name,Contact Last Name,Contact Email,Main Phone,Website,City,State,Vertical,Decision Maker Role,Scheduling System,Appts per week (est),No-show rate % (est),Value per visit ($),Stage,Last touch channel,Next step date,Notes

Formatting rules:
- Stage should match the pipeline stage text exactly (start all as “New Lead”).
- If you only have a generic email (info@), still include it; note “Generic inbox” in Notes.
- If contact name unknown, leave blank; do NOT invent names.
- Notes should include where you found them (e.g., “Google Maps listing; website contact page”).

========================
FIRST 200 LEADS — 2 CITY CLUSTERS (FREE SOURCES)
========================
City Cluster 1: Austin, TX
City Cluster 2: Phoenix, AZ
Verticals (aim 20 per vertical per city = 200): Dentist, Chiropractor, Med Spa, Physical Therapy, Optometry

Primary free source: Google Maps + business websites
How to capture quickly (manual, fast):
1) Search Google Maps using the strings below.
2) Open listing → copy Company Name, Phone, Website.
3) Open website → find Contact page → capture email (or form URL) + any owner/manager name.
4) Put into CSV. Deduplicate by Website domain.

Google Maps search strings (copy/paste):
AUSTIN
- “dentist austin tx”
- “chiropractor austin tx”
- “med spa austin tx”
- “physical therapy austin tx”
- “optometrist austin tx”

PHOENIX
- “dentist phoenix az”
- “chiropractor phoenix az”
- “med spa phoenix az”
- “physical therapy phoenix az”
- “optometrist phoenix az”

Extra free sources (if you need more volume):
- Yelp (free pages): search by city + category; use website link + phone.
- Industry directories: “top dentists in Austin”, “best chiropractors Phoenix” blog lists.

========================
DAY-1 OUTBOUND EXECUTION (VOLUME BLOCKS)
========================
Target: 50–100 cold emails + 20–40 calls (and optional compliant texts)

Block schedule (example):
- 9:00–10:15 Lead build (finish CSV to at least 100 leads)
- 10:15–11:30 Send 50–75 emails (plain text)
- 11:30–12:30 Call block #1 (10–20 dials)
- 2:00–3:00 Call block #2 (10–20 dials)
- 3:00–3:30 Reply handling + demo booking
- 3:30–4:00 KPI report + update stages

Email signature (append to all outbound):
Bob Smith
Appointment No-Show Reducer (SMS confirmations + reschedules + waitlist fill)
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

Call opener (15 seconds):
“Hi, this is Bob. Quick question—are you the person who owns scheduling and appointment reminders there? We help [dentists/chiro/etc.] reduce no-shows using two-way SMS confirmations and instant reschedules. If I can ask 2 questions, I’ll know in 30 seconds if it’s even relevant.”

Qualification (fast):
1) “About how many appointments a week do you run?”
2) “Roughly what % no-show or late cancels?”
3) “What’s an average visit worth?”
4) “What system do you schedule in today?”
Close for demo:
“If we could cut no-shows even 20–30% with two-way confirmations + reschedules, would it be worth a 12-minute walkthrough? I can do [two time options] or you can grab a time here: [meeting link once created].”

Compliance note (SMS): Only text if they’re a business line where messaging is reasonably expected or you have implied/explicit permission. If unsure, do call + voicemail and email.

========================
DAY-1 KPI REPORT TEMPLATE (COPY/PASTE DAILY)
========================
DATE:
CITY CLUSTERS TARGETED:
VERTICALS TARGETED:

TOP OF FUNNEL ACTIVITY
- New leads added today:
- Total leads in CRM:
- Cold emails sent:
- Calls placed:
- Voicemails left:
- Texts sent (compliant):
- Craigslist posts live:
- FB posts/comments:

RESPONSE + CONVERSION
- Email replies (total):
  - Positive:
  - Neutral/questions:
  - Not now:
  - Unsubscribe/stop:
- Calls connected:
- Demos booked today:
- Demos held today:
- Trials/setups started today:
- Wins today (locations live):

PIPELINE COUNTS (END OF DAY)
- New Lead:
- Contacted – No Reply:
- Replied – Qualifying:
- Demo Booked:
- Demo Held:
- Trial/Setup Started:
- Won:
- Lost:

NOTES
- Top objections heard today:
- Best-performing subject line/script:
- What to change tomorrow (1–3 bullets):
- Priority follow-ups (names + next step date):

========================
DAY-2 / DAY-3 (KEEP MOMENTUM)
========================
Day-2 targets:
- Add 50–100 new leads (expand to 1 more nearby city if needed: Round Rock TX / Tempe AZ)
- Send 75–100 emails (including follow-ups to Day-1 non-responders)
- 20–40 calls
- Book 1–3 demos

Day-3 targets:
- Repeat Day-2 volumes
- Run first demos; push for “Trial/Setup Started” same day
- Ask every demo: “If we show recovered revenue, can we use anonymized metrics as a testimonial?”

If anything blocks execution, the only acceptable blockers are: (a) no CRM account created yet, (b) no meeting link. Everything else can run with manual CSV + plain-text emails.
