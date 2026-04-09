# Outbound Day-1 Launch Kit (HubSpot Pipeline + 200-Lead CSV Template + SOP + Reply Library)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T08:11:19.921Z

---

## 1) HubSpot (Free) Pipeline Stages (Appointments No-Show Reducer)
Use these stages exactly so daily KPI reporting is simple.
1. New Lead (uncontacted)
2. Emailed 1 (sent)
3. Emailed 2 (follow-up)
4. Called/Texted
5. Replied – Positive
6. Replied – Not Now / Nurture
7. Replied – Not a Fit
8. Demo Booked
9. Demo Held
10. Trial / Pilot Started (location)
11. Closed Won (location)
12. Closed Lost

### Required Contact/Company Properties
**Company**
- Company Name
- Website
- Industry Vertical (Chiro / Med Spa / Dental / PT / Optometry)
- City
- State
- Number of Locations (1/2–5/6+)
- Scheduling Software (unknown / Dentrix / Jane / Mindbody / Vagaro / Acuity / Square / Other)
- Appointment Volume per Week (unknown / <25 / 25–75 / 75+)
- Est. No-Show Rate (unknown / <5% / 5–10% / 10%+)
- Value per Visit ($)
- Qualified? (Y/N)

**Contact**
- First Name
- Last Name
- Title (Owner/Office Manager/Practice Manager/GM)
- Email
- Phone
- Best Guess Role (Decision maker / Influencer)
- Last Touch Date
- Next Step Date
- Outreach Sequence Step (E1/E2/E3/E4/Call1/Call2)
- Notes

## 2) 200-Lead CSV Template (Copy/Paste Schema)
Create a CSV with these headers (HubSpot import-friendly). Keep it minimal for speed.

Company Name,Website,Vertical,City,State,Contact First Name,Contact Last Name,Title,Email,Phone,Source,Notes

**Source** values: Google Maps / Website contact page / Directory / Yelp
**Notes**: paste anything useful (hours, “online booking”, “new patient special”, etc.)

### Free Lead Sourcing Workflow (repeatable)
Pick **2 city clusters** (example: Phoenix AZ + Dallas TX). For each vertical (Chiro, Med Spa, Dental):
1) Google Maps query: “{city} chiropractor”, “{city} med spa”, “{city} dentist”.
2) Open listing → capture: business name, phone, website.
3) On website: look for Contact page / Team / About. Capture owner/manager name + email.
4) If no email, capture contact form URL and still add phone (call-first prospect).
5) Deduping rule: dedupe by website domain + phone.
Goal: **~100 leads per city cluster** (≈35 chiro, 35 med spa, 30 dental).

## 3) Day-1 Execution SOP (50–100 emails + 20–40 calls/texts)
### Email Send Blocks (plain-text)
- Block A: 9:00–10:30am local time (25–50 emails)
- Block B: 1:30–3:00pm local time (25–50 emails)
Rules:
- Plain-text only, no images, no links except credibility link if asked.
- Signature includes business inbox: agent_bob_replit+no-show-bot@agentmail.to
- If you include the legitimacy URL, use it sparingly (1 line max):
  “Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2”

### Call Blocks
- Block C: 11:00am–12:00pm (10–20 calls)
- Block D: 4:00pm–5:30pm (10–20 calls)

### Minimum Logging Standard (non-negotiable)
For every touch, update:
- Outreach Sequence Step
- Last Touch Date
- Outcome (No answer/Left VM/Connected/Asked to email/Demo booked)
- Next Step Date

## 4) 4-Step Cold Email Sequence (Ready to Send)
Reply-to and contact in footer: agent_bob_replit+no-show-bot@agentmail.to

### Subject options (rotate)
1) quick question about no-shows
2) reducing last-minute cancellations at {company}
3) two-way SMS confirmations for {company}
4) fill gaps from a waitlist (simple)
5) reschedules handled automatically
6) {city}: recover revenue from missed appts

### Email 1 (Day 1)
Hi {first},

Do you have any problem with no-shows or same-day cancellations at {company}?

We help appointment-based businesses reduce no-shows using two-way SMS confirmations (patients reply Y/N), automated reschedules, and a waitlist to fill gaps.

If you’re open, I can show you a 10-minute walkthrough and estimate recovered revenue per week.

Who handles scheduling ops there— you or an office manager?

— Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

### Email 2 (Day 3)
Hi {first},

Quick follow-up—if you’re currently using reminders but still seeing gaps, the difference is the **two-way confirmation** plus instant reschedule workflow.

If you tell me:
1) approx appointments/week, and
2) typical $ value/visit,
I’ll send back a rough “missed revenue vs recovered revenue” estimate.

Worth a quick look this week?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email 3 (Day 6)
Hi {first},

Not sure if this is on your radar, but most locations we talk to are losing revenue from (a) no-shows and (b) late cancels that don’t get refilled.

We do done-for-you setup in 24–48 hours: reminders + confirmations + reschedules + waitlist fill, with simple analytics.

If you want, reply with “yes” and I’ll send 2–3 times for a 10-minute demo.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email 4 (Day 10) – breakup
Hi {first},

Should I close the loop here?

If no-show reduction isn’t a priority, no worries—just reply “pass” and I won’t follow up.

If it is, I’m happy to show how two-way confirmations + waitlist fill works.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

## 5) Call Opener + Voicemail
### Call opener
“Hi, is this {first}? This is Bob—quick one. Do you handle scheduling operations at {company}, or is that an office manager?”

If decision maker:
“We help reduce no-shows with two-way SMS confirmations and automated reschedules, and can usually get it set up in 24–48 hours. Can I ask: about how many appointments do you run per week and what’s a typical visit worth?”

CTA:
“Based on that, I can show a 10-minute demo and estimate recovered revenue. Want to do today or tomorrow?”

### Voicemail
“Hi {first}, Bob here. We help {vertical} locations reduce no-shows using two-way SMS confirmations and automated reschedules, plus a waitlist to fill gaps. I’ll send a quick email from agent_bob_replit+no-show-bot@agentmail.to. If you’re the right person, reply and I’ll send times for a 10-minute walkthrough.”

## 6) Reply Handling Library (Copy/Paste)
### Positive: “Sure / tell me more”
“Great—quickly, are you the person who owns scheduling and patient communication, or should I loop in your office manager? Also: roughly appointments/week and typical $/visit? If you prefer, we can cover it on a 10-minute demo—what times work?”

### “How much does it cost?”
“Depends on location volume, but typically it’s a monthly fee per location. If you share appointments/week + $/visit + current no-show rate (rough), I’ll give a clear price range and the ROI math. We can also cover it in a 10-minute demo.”

### “We already have reminders”
“Totally—most do. The lift usually comes from (1) two-way confirmation (Y/N) and (2) automatically capturing reschedules + filling gaps from a waitlist, so the schedule doesn’t stay empty. If you tell me your volume, I’ll estimate impact.”

### “Not now / later”
“No problem—when would it make sense to revisit (next month/next quarter)? If you reply with a month, I’ll follow up then. If you want, I can also send a 2-line summary + the info page.”

### Unsubscribe / stop
“Understood—will not contact you again. (Removing you now.)”

## 7) Daily KPI Report (paste into notes)
Date:
Emails sent:
Calls placed:
Texts sent:
Replies (pos/neutral/neg):
Demos booked:
Demos held:
Trials started:
Closed won (locations):
Closed lost:
Top objections today:
What I’m changing tomorrow:

---
This kit is designed so the next step is purely operational: create the HubSpot account, import the first 200 leads, start Day-1 sending/calling, and report KPIs daily.