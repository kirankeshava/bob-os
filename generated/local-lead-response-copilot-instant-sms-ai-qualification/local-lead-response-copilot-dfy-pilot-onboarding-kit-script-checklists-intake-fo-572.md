# Local Lead Response Copilot — DFY Pilot Onboarding Kit (Script + Checklists + Intake Form Questions + Delivery SOP)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T08:19:27.298Z

---

# Local Lead Response Copilot — DFY Pilot Onboarding Kit

Website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
Contact: agent_bob_replit+lead-copilot@agentmail.to

## 1) Client-Facing Promise (what we do in the pilot)
**Goal:** respond to every new lead instantly by SMS, ask 3–5 short qualification questions, then **book a call/appointment** or route to the right person—within the customer’s business hours and service area.

**Pilot pricing:** $499 setup + $499/mo (or $0 setup on annual).  
**Setup turnaround:** <24 hours after intake is complete.

---

## 2) 30-Minute Onboarding Call Script (run-of-show)
**Outcome of call:** we end with (1) intake link completed or being completed live, (2) confirmed go-live date/time (within 24h), (3) routing + booking confirmed, (4) who gets notified confirmed.

### Minute 0–3: Set frame + outcome
“Thanks for taking the time. In the next 30 minutes we’ll lock in: your lead source connection, business hours, service area, the 3–5 questions your leads will get, and how we book or route them. When we hang up, we’ll have a go-live time within 24 hours. If anything’s missing, I’ll tell you exactly what we need.”

### Minute 3–8: Lead sources + volume + current leak
1) “Where do your leads come from today—website form, FB Lead Ads, Google LSAs, call tracking, something else?”
2) “Roughly how many leads/week?”
3) “How fast are you currently responding? Who responds?”
4) “What’s the definition of a ‘good lead’ for you?”

### Minute 8–15: Booking + conversion goal
1) “What’s the ideal next step—phone call, in-person estimate, or calendar booking?”
2) “Do you already use a booking link? (Calendly, Housecall Pro, ServiceTitan, Jobber, Google Calendar booking, etc.)”
3) “If we can only do one thing first, is it: qualify out bad leads, book more appointments, or speed response time?”

### Minute 15–22: Qualifying questions (3–5)
Guidelines (tell them):
- Keep it **short** (multiple choice when possible)
- Ask what disqualifies/qualifies quickly: job type, zip code, urgency, budget range (optional), owner/decision maker

**Prompt them with examples (pick 3–5):**
- “What service do you need? (A/B/C)”
- “What ZIP code is the job in?”
- “How soon do you need this done? (Today/This week/This month)”
- “Is this residential or commercial?”
- “Do you own the property? (Yes/No)”

Confirm disqualifiers:
- “Any ZIP codes you do not service?”
- “Any job types you don’t take?”

### Minute 22–26: Routing rules + notifications
1) “During business hours, should we route to: (a) book automatically, (b) text the team to call, (c) both?”
2) “After hours: should we still text and collect info, then schedule next business day? Or pause entirely?”
3) “Who gets notified when a lead is qualified / books?” (names + phone + email)

### Minute 26–30: Close next steps + go-live
“Perfect. Next step is the configuration intake form. We can do it now together or you can complete it right after this call.”
- Send intake link (immediately after call)
- Confirm go-live: “Once intake is complete, we go live within 24 hours. Let’s set a target: tomorrow at 2pm.”
- Confirm success metric: “In week one, we’ll measure response time and % of leads that reach a booked call/appointment.”

---

## 3) Client Checklist (send after demo / at close)
**To launch within 24 hours, please provide:**
1) Lead source details (website form/FB lead ads/etc.)
2) Business hours + time zone
3) Service area (ZIPs/cities) + exclusions
4) 3–5 qualification questions + answer choices (if any)
5) Booking link (Calendly/ServiceTitan/Jobber/etc.) OR the team member who will call
6) Routing rules (business hours vs after hours)
7) Notification recipients (name, phone, email)
8) Compliance note: confirm you have consent to contact leads from your form/ad

Website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
Support: agent_bob_replit+lead-copilot@agentmail.to

---

## 4) Configuration Intake Form (copy/paste fields)
Use these exact questions in Google Forms (or Typeform).

### Section A — Business Info
1) Business name
2) Primary contact name + role
3) Best email for notifications
4) Best phone for notifications
5) Website URL
6) Time zone

### Section B — Lead Source / Connection
7) Where do leads come from? (Website form / FB Lead Ads / Google LSA / Other)
8) If website form: what platform? (WordPress, Webflow, Wix, custom, other)
9) If FB Lead Ads: confirm page name + ad account contact
10) Do you have Zapier/Make/Webhook access already? (Yes/No/Not sure)
11) Send a sample lead payload or screenshot of form fields (file upload or paste)

### Section C — Hours + After-hours behavior
12) Business hours (Mon–Sun)
13) After-hours handling: (Still text + collect info / Text only next business day / Do nothing)

### Section D — Service Area + Rules
14) Cities/Counties served
15) ZIP codes served (optional)
16) Excluded ZIP codes / areas
17) Jobs you do NOT take

### Section E — Qualification Questions (3–5)
18) Q1 (text)
19) Q1 answer choices (optional)
20) Q2
21) Q2 answer choices
22) Q3
23) Q3 answer choices
24) Q4 (optional)
25) Q4 answer choices (optional)
26) Q5 (optional)
27) Q5 answer choices (optional)

### Section F — Booking / Handoff
28) Desired outcome: (Book appointment / Book call / Send to team to call)
29) Booking link (if applicable)
30) If team callback: who calls? (name/role)
31) Any qualification threshold before booking? (e.g., only certain ZIPs/job types)

### Section G — Notifications + CRM
32) Send qualified lead summary to: (emails)
33) Send SMS alerts to: (phone numbers)
34) CRM you use (optional): ServiceTitan / Jobber / Housecall Pro / HubSpot / Other

### Section H — Compliance
35) Confirm: these leads opted in to be contacted via SMS at submission (Yes/No)
36) Any required disclaimer text to include in first message?

---

## 5) Internal DFY Setup Checklist (first 10 accounts, <24h)
**Intake → Build → QA → Go-live → Hypercare**

### A) Intake validation (15–30 min)
- Confirm intake complete; if missing, email agent_bob_replit+lead-copilot@agentmail.to requesting the missing items
- Verify lead source type and required connection method
- Confirm time zone + business hours
- Confirm service area rules + exclusions
- Confirm booking method (booking link vs team callback)

### B) Build (60–120 min)
- Create client configuration record (business name, vertical, recipients)
- Configure inbound lead capture (webhook/Zapier/FB leads)
- Configure SMS first message (business name + purpose + opt-out line)
- Configure AI qualification flow (3–5 Qs) + branching for disqualifiers
- Configure routing: qualified → booking link or notify callback owner
- Configure notifications: email summary + SMS alert
- Set hours/after-hours behavior

### C) QA (20–30 min)
- Test lead injection (at least 3 test leads)
- Confirm first SMS sends instantly (<60 seconds)
- Confirm questions render correctly and capture answers
- Confirm disqualifier path works (out-of-area or excluded job type)
- Confirm booking link works and confirmation triggers notifications
- Confirm opt-out keyword works

### D) Go-live (10 min)
- Flip from test → live mode
- Send “Live” confirmation email to client with what to expect
- Provide escalation path: agent_bob_replit+lead-copilot@agentmail.to

### E) 48-hour hypercare
- Monitor first 20 leads for delivery/response issues
- Adjust wording for clarity if drop-off occurs
- Deliver quick wins report: response time + booked count + common disqualifiers

---

## 6) Close-to-Onboard Handoff Messages (ready to paste)
### A) After demo — send intake link
Subject: Next step to launch your instant lead response (go-live in 24h)

“Thanks for the call. To launch Local Lead Response Copilot within 24 hours, please complete this configuration intake form. Once submitted, we’ll build, QA, and confirm go-live time.

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
If you hit any issues, reply here: agent_bob_replit+lead-copilot@agentmail.to”

### B) Scheduling the 30-min onboarding
“Want to knock this out today? I can do a 30-minute onboarding at [2 options]. We’ll finalize your questions, routing, and booking, and then go live within 24 hours.”

### C) Missing info nudge
“Quick check—before we can flip you live, we still need: (1) booking link or callback owner, (2) service area ZIPs/cities, and (3) your 3–5 qualifying questions. You can reply here or complete via the intake form. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | Support: agent_bob_replit+lead-copilot@agentmail.to”
