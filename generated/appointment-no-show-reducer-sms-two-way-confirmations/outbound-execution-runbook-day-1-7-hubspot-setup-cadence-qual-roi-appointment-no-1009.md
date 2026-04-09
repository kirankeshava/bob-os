# Outbound Execution Runbook (Day 1–7): HubSpot Setup + Cadence + Qual/ROI (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T12:16:43.739Z

---

Business reference (use in outreach):
Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Contact email (reply-to): agent_bob_replit+no-show-bot@agentmail.to

GOAL (7 days): book 10–12 demos from 200–300 targeted locations (chiro, med spa, dental). Daily KPI: 50–100 emails sent, 20–40 calls, 3–8 positive replies/week, 1–3 demos booked/day once momentum starts.

1) HUBSPOT (FREE) SETUP — DO THIS FIRST (30–45 min)
A. Pipeline stages (Deals) — keep simple:
1. New Lead (not contacted)
2. Attempting Contact
3. Engaged (replied / spoke)
4. Demo Scheduled
5. Demo Held
6. Trial/Setup Started
7. Closed Won
8. Closed Lost
9. Nurture (timing/low priority)

B. Required Properties (minimum viable)
Company:
- Vertical (Chiro/MedSpa/Dental/Other)
- City
- Website
- Scheduling system (unknown/Zenoti/Mindbody/ChiroTouch/Dentrix/Other)
- Est appts/week (unknown)
- Est no-show % (unknown)
Contact:
- Role (Owner/Office Manager/GM)
- Phone
- Email
Deal:
- Source (Cold Email/Cold Call/Craigslist/FB Group)
- Last touch date
- Next step (text field)
- Potential ROI/mo (numeric)

C. Task queues (HubSpot Tasks)
Create 3 saved filters/lists for speed:
- “Call Today” = Attempting Contact AND phone exists AND last touch > 1 day
- “Email Follow-ups Due” = Engaged OR Attempting Contact AND follow-up date = today
- “Demo Confirmations” = Demo Scheduled AND meeting date within 24 hours

Logging rule: every touch = one note with (date + channel + 1-line outcome + next step).

2) MEETINGS LINK (FREE)
Use HubSpot Meetings (free) as the single booking link.
Meeting type: 15 minutes “No-Show Reduction Quick Audit”. Availability: 2 blocks/day (e.g., 11:00–1:00 and 3:00–5:00 local).
Confirmation email should include:
- “Reply here if you want to add a second staff member.”
- Reference legitimacy URL above.

3) LIST BUILDING (FIRST 200 LEADS)
Target: 2 city clusters × 100 leads each.
Recommended clusters to start (example): Phoenix AZ + Dallas TX (swap if you prefer).
Vertical priority order: Chiropractor, Med Spa, Dental.
Free sources:
- Google Maps results
- Yelp category pages
- Local association directories
Capture columns (CSV for import):
Company Name | Website | City | State | Phone | Contact Name (if found) | Role | Email | Vertical | Notes (hours, #locations, booking link)
Dedupe rule: same phone or same domain = one record.

4) DAY 1–7 OUTREACH CADENCE (MULTI-TOUCH)
All messages should include one of:
- “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”
And the legitimacy URL when relevant.

DAY 1 (Email + Calls)
A) Email #1 (to 50–100 contacts)
Subject options: “quick question about no-shows”, “confirmations for {Business}”, “reduce no-shows in 48 hours?”
Body (plain text):
Hi {FirstName} — I’m Bob.

If you’re like most {vertical} clinics, no-shows and last-minute cancels quietly drain revenue.
We reduce no-shows using two-way SMS confirmations + instant reschedules + waitlist fill (done-for-you setup in 24–48 hours).

Worth a 15-min quick audit to estimate recovered visits for {Business}?
If yes, who owns scheduling there?

Legit info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob
Reply to: agent_bob_replit+no-show-bot@agentmail.to

B) Call block #1 (10–20 calls)
Opener: “Hi, is this {Name}? Bob here. Quick one—do you handle scheduling/confirmations for the clinic?”
If yes: “Reason I’m calling: we help reduce no-shows with two-way SMS confirmations and instant reschedules. If I could show you a 2-minute example and estimate ROI, would you be open to a 15-min quick audit this week?”
Voicemail (if no answer): “{Name}, Bob. We help {vertical} clinics cut no-shows using two-way SMS confirmations + waitlist fill. If you want, I’ll email details and a quick audit link. Reply to my email or call me back.”

DAY 2
- Email #2 to non-responders (short bump):
“{FirstName} — should I speak with you or someone else about reducing no-shows / last-minute cancels? If you tell me what scheduling tool you use, I’ll send a quick ROI estimate.”
- Call block #2 to yesterday’s emails (reference email): “I sent a note yesterday—did you see it?”

DAY 3
- Email #3 (proof/offer):
“Common outcome: fewer no-shows + more same-week fills from a waitlist. Setup is 24–48 hours; we track recovered revenue per location. Want me to run the quick audit for {Business}?”
- Optional compliant SMS only if there’s an established relationship or inbound interest:
“Hi {Name} — Bob here (no-show reduction). OK to send a 15-min audit link to estimate recovered visits for {Business}?”

DAY 4
- Call block to reach decision-maker / office manager.
- If gatekept: “Totally fine—who’s best to talk to about confirmations/no-shows? I’ll keep it to 15 minutes.”

DAY 5
- Email #4 (close-the-loop):
“Last note from me—should I close the loop, or is reducing no-shows something you want to revisit later? If later, what month should I circle back?”

DAY 6–7
- Move non-responders to Nurture.
- Re-hit engaged leads with specific time options: “Can you do Tue 11:30 or Wed 3:00 for the 15-min audit?”

5) QUALIFICATION (FAST) — ASK THESE ON EVERY LIVE CONVO
1) “About how many appointments per week per location?”
2) “Roughly what % no-show or cancel within 24 hours?”
3) “Average value per visit (or first visit)?”
4) “Do you have a waitlist or wish you did?”
5) “What system handles scheduling (or texting) today?”
6) “Who is the final decision-maker on patient/client communications?”

Minimum-fit thresholds (rule of thumb):
- 80+ appts/week OR high value per visit ($150+) OR frequent last-minute cancels.
- If appts are low and value low, deprioritize unless multi-location.

6) ROI FRAME (SAY THIS OUT LOUD)
“If you do 150 appts/week and even 8% no-show, that’s 12 missed appts/week. If we recover just 4–6 of those via confirmations + reschedules + waitlist fills, that’s 16–24 visits/month. At $150/visit that’s $2,400–$3,600/month recovered—per location.”

7) DEMO CLOSE + NEXT STEP
Close line: “If we can implement in 24–48 hours and you see confirmations + reschedules working in week one, are you comfortable starting with one location?”
Next step immediately after demo: book onboarding call + request access to scheduling/export + confirm texting number.
Send follow-up email from agent_bob_replit+no-show-bot@agentmail.to including the legitimacy URL and the meeting recap.

8) CRAIGSLIST + FB GROUPS (DISTRIBUTION BOOST)
Craigslist (1–2 posts/week per city cluster):
Headline: “Reduce Appointment No-Shows (Two-Way SMS Confirmations) — Setup in 48 Hours”
Body includes: what it does, who it’s for, and contact email: agent_bob_replit+no-show-bot@agentmail.to plus legitimacy URL.
FB groups: 5–10 touches/week. Comment with value: “script for confirmation texts”, “how to measure recovered revenue”, “waitlist fill workflow”, then offer 15-min audit.

DAILY KPI LOG (copy into notes):
Date | Emails sent | Calls placed | Conversations | Replies | Demos booked | Demos held | Trials started | Closed won | Notes/learning

Owner-ready execution order today:
(1) Create HubSpot free + pipeline/properties → (2) Create HubSpot meetings link → (3) Build/import first 200 leads → (4) Start Day-1 sends + calls + logging.