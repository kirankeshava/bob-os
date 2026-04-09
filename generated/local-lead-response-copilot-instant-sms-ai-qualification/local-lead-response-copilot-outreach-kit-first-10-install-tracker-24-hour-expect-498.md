# Local Lead Response Copilot — Outreach Kit + First-10 Install Tracker + 24-Hour Expectation Sheet + HVAC/Plumbing/Roofing SMS Flows

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** copy
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T07:39:06.532Z

---

# 1) Internal Tracker — “First 10 Installs” (copy into Google Sheet)

**Tab name:** Installs_Tracker

**Columns (left → right):**
1. Account # (1–10)
2. Company Name
3. Primary Contact Name
4. Phone
5. Email
6. Website
7. Industry (HVAC/Plumbing/Roofing/Other)
8. Lead Sources (FB Lead Ads / Web Form / Google LSA / CallRail / Other)
9. Booking Link Type (Calendly/Acuity/Housecall Pro/ServiceTitan/Other)
10. Intake Received? (Y/N + date)
11. Tech Setup Status (Not Started / In Progress / Waiting on Customer / QA / Live)
12. Lead Source Connected? (Y/N)
13. SMS Number Provisioned? (Y/N)
14. Routing Rules Set? (Y/N)
15. Questions/Flow Confirmed? (Y/N)
16. Test Lead Submitted? (Y/N)
17. Go-Live Date/Time
18. Time-to-Live (hrs) (Go-live minus intake timestamp)
19. Blockers (credentials, form access, ad permissions, booking link issues, etc.)
20. Notes
21. Week 1 KPIs: Speed-to-Lead (sec)
22. Week 1 KPIs: Contact Rate (%)
23. Week 1 KPIs: Booked Appts (#)
24. Week 1 KPIs: Booked Rate (%)
25. Renewal Risk (Low/Med/High)
26. Next Action + Owner

**Definition reminders:**
- *Speed-to-Lead (sec):* time from form submission → first SMS sent.
- *Contact Rate:* % of new leads who reply at least once.
- *Booked Rate:* % of new leads who book an appointment/call (or request one).

---

# 2) Customer-Facing One-Pager — “What to Expect in the First 24 Hours”

**Subject:** What to expect after you sign up (we go live in <24 hours)

Thanks for joining **Local Lead Response Copilot**. Our goal is simple: **text every new lead instantly**, ask a few qualifying questions, and **book the right leads** into your calendar—without you lifting a finger.

## Timeline (typical <24 hours)
**Hour 0–1: Intake + access**
You’ll fill out a short configuration form (5–8 minutes). We’ll confirm:
- where leads come from (web form / Facebook Lead Ads / other)
- your business hours + service area
- 3–5 qualification questions
- booking link (Calendly/Acuity/ServiceTitan/Housecall Pro, etc.)
- who gets notified and when

**Hour 1–6: Connection + message flow setup**
We connect your lead source to the Copilot and configure:
- instant SMS response (speed-to-lead)
- qualification flow + answer capture
- routing rules (after-hours, emergency, out-of-area, etc.)

**Hour 6–24: Testing + go-live**
We run test leads end-to-end and confirm:
- lead arrives correctly
- SMS sends within seconds
- answers are captured
- appointment/call booking works
- notifications go to the right people

## What we need from you
1) Access/permissions for your lead source (or your agency can provide)
2) Your booking link and preferred meeting duration
3) Your top qualification questions (or pick one of our proven templates)

## Communication
- We’ll email you from: **agent_bob_replit+lead-copilot@agentmail.to**
- You can reference our site here anytime: **https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4**

## Important notes (SMS compliance)
We only message leads who submit their info to you. Your forms/ads should include consent language for SMS. If you want, we’ll provide a suggested sentence for your form/FB ad.

---

# 3) Niche SMS Qualification Flows (copy/paste)

**Global rules across all niches**
- First SMS must send immediately.
- Keep messages short (1–2 questions max per message).
- Always provide a “book now” link early.
- Always offer human handoff: “Reply ‘CALL’ if you want us to call you.”

## A) HVAC (Repair / Replacement)

**SMS 1 (instant):**
Hi {{first_name}} — this is {{company_name}}. Thanks for reaching out. I can help you get scheduled fast. What do you need today?
1) No A/C / not cooling
2) Heating issue
3) New system estimate
4) Other

**If 1 or 2:**
Got it. What’s your address or ZIP so I can confirm we service your area?

**If in service area:**
Thanks — is this an **emergency** (no heat/air + vulnerable occupants) or can we schedule standard service?
Reply: EMERGENCY or STANDARD

**If EMERGENCY:**
Understood. Please reply with the best phone number to reach you now, and we’ll prioritize a call.

**If STANDARD:**
What’s the earliest you’d like us to come out?
1) Today
2) Tomorrow
3) This week

**Booking CTA (after preference):**
Perfect — you can lock in a time here: {{booking_link}}
If you prefer, reply CALL and we’ll call you to book.

**If 3 (new system estimate):**
Great — roughly how big is the home (sq ft) and what city/ZIP?

**Then:**
Thanks. Here’s our estimate booking link: {{booking_link}} (choose “New System Estimate”).

**Out-of-area handling:**
Thanks — it looks like you may be outside our service area. What’s the nearest cross-street/city? If we can’t cover it, I’ll let you know quickly.

---

## B) Plumbing (Drain / Leak / Water Heater)

**SMS 1 (instant):**
Hi {{first_name}} — {{company_name}} here. Quick questions so we can get you scheduled. What’s going on?
1) Leak / burst pipe
2) Clogged drain / sewer
3) Water heater
4) Other

**If 1 (leak):**
Is the water currently shut off?
Reply YES or NO

**If NO:**
Please shut off the main water valve if possible. What’s your address or ZIP?

**If YES or after address/ZIP:**
Thanks. Is there active flooding/water damage risk?
Reply YES or NO

**If YES:**
Understood — reply with the best phone number and we’ll call ASAP.

**If NO:**
Got it. When would you like us to come out?
1) Today
2) Tomorrow
3) This week

**Booking CTA:**
You can book the fastest slot here: {{booking_link}}
Or reply CALL and we’ll book it for you.

**If 3 (water heater):**
Is it:
1) No hot water
2) Leaking
3) Replacement quote

**Then:**
Thanks — what’s the address/ZIP and tank size if you know it (40/50/etc.)?

---

## C) Roofing (Repair / Leak / Replacement)

**SMS 1 (instant):**
Hi {{first_name}} — this is {{company_name}}. Thanks for requesting roofing help. What do you need?
1) Active leak
2) Storm/wind damage
3) Replacement estimate
4) Other

**If 1 (active leak):**
Sorry to hear that. What’s your address or ZIP?

**Then:**
Is the leak happening right now?
Reply YES or NO

**If YES:**
Understood — reply with your best phone number and we’ll call ASAP.

**If NO:**
Thanks. When can we inspect?
1) Today
2) Tomorrow
3) This week

**Booking CTA:**
Lock in an inspection time here: {{booking_link}}
Prefer a call? Reply CALL.

**If 2 (storm damage):**
Did the damage happen in the last 72 hours?
Reply YES or NO

**Then:**
Do you plan to file an insurance claim?
Reply YES / NO / NOT SURE

**Then:**
Thanks — book an inspection here: {{booking_link}}

---

# 4) Outbound Sequences (Email + LinkedIn DM)

## Sequence 1: Owner/Operator (Home Services)

### Email 1 (Day 1) — “Speed-to-lead = booked jobs”
**Subject:** You’re paying for leads — are you texting them in 10 seconds?

Hi {{first_name}},

Leads go cold fast in home services. If you’re running forms or FB lead ads, the fastest shop usually wins.

**Local Lead Response Copilot** instantly texts every new lead, asks 3–5 quick questions to qualify (zip/service, urgency, job type), then **books them into your calendar** or triggers a call.

- Instant SMS reply (seconds)
- Qualification flow (no manual follow-up)
- Booking link + routing rules (after-hours, emergencies)

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

If you want, I can show a 2-minute demo and we can go live in <24 hours.

Are you free for 15 minutes this week?

— Bob Smith
agent_bob_replit+lead-copilot@agentmail.to

### Follow-up (Day 3)
**Subject:** Want me to set this up for you (DFY in <24h)?

Hi {{first_name}},

If you already have leads coming in, we can set up an instant SMS qualifier + booking flow quickly.

Pilot offer:
- **$499 setup + $499/mo** (done-for-you)
- or **$0 setup on annual**

Reply with your lead source (FB lead ads / web form / other) and booking system (Calendly/Acuity/etc.) and I’ll tell you the fastest path.

— Bob
agent_bob_replit+lead-copilot@agentmail.to

### Breakup (Day 6)
**Subject:** Close the loop?

Hi {{first_name}},

Should I close this out, or is improving speed-to-lead a priority right now?

If you want, I can send a short “HVAC/Plumbing/Roofing” example flow so you can see exactly what the texts look like.

— Bob

## LinkedIn DM (Owner)
Hi {{first_name}} — quick one: are you currently texting new leads instantly when they submit a form/FB lead ad? We built Local Lead Response Copilot to respond in seconds, qualify, and book calls automatically. Quick demo? Legit site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

---

## Sequence 2: Agency/Marketer (runs ads for local businesses)

### Email 1 (Day 1) — “Increase booked rate without changing ads”
**Subject:** Add instant SMS qualification to your client funnels (white-label friendly)

Hi {{first_name}},

If you run lead gen for home services, you already know the problem: clients don’t follow up fast enough and the lead quality looks worse than it is.

**Local Lead Response Copilot** solves the gap between lead submit → first contact:
- instant SMS response
- AI-driven qualification questions
- booking link to calendar
- routing rules + notifications

Most agencies position it as “speed-to-lead + appointment setting” and keep the ad spend exactly the same.

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

If you have 1–2 clients who’d pilot this, we can do DFY setup in <24 hours.

Open to a 15-minute walkthrough?

— Bob Smith
agent_bob_replit+lead-copilot@agentmail.to

### Follow-up (Day 3)
**Subject:** 3 pilot slots (DFY setup)

Hi {{first_name}},

We’re opening **3 paid pilot slots** this week:
- $499 setup + $499/mo (or $0 setup annual)
- done-for-you integration (FB lead ads/web forms)
- agency stays primary contact if you want

If you reply with a client niche + lead source, I’ll send a recommended question flow and setup checklist.

— Bob

## LinkedIn DM (Agency)
Hi {{first_name}} — we help agencies boost booked appointments by responding to new leads in seconds via SMS, qualifying, and pushing to a booking link. DFY setup in <24h. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

---

# 5) First 3 Paid Pilots — Scope + Scheduling Template

**Email to prospect after interest (send from agent_bob_replit+lead-copilot@agentmail.to):**

Subject: Quick setup questions + pick a go-live time (we can launch in <24h)

Hi {{first_name}},

Awesome — to get you live quickly, reply with:
1) Lead source: (FB Lead Ads / website form / other)
2) Booking link: (Calendly/Acuity/ServiceTitan/Housecall Pro/etc.)
3) Business hours + after-hours handling (text only vs call)
4) Service area (ZIPs or cities)
5) Top 3–5 questions you want leads to answer (or tell me your niche and I’ll send a proven set)
6) Who gets notified (names + phone/email)

Once I have that, we’ll schedule a **15-minute go-live confirmation call** and you’ll be live within 24 hours.

Reference link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

— Bob Smith
agent_bob_replit+lead-copilot@agentmail.to
