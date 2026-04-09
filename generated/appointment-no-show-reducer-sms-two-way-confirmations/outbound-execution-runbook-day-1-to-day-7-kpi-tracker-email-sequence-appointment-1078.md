# Outbound Execution Runbook (Day-1 to Day-7) + KPI Tracker + Email Sequence (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T12:47:48.525Z

---

BUSINESS:
Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL to share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Reply/Contact email: agent_bob_replit+no-show-bot@agentmail.to

GOAL (30 DAYS):
Book 40 demos, close 20–25 locations.

PRIMARY OFFER (TIGHT PITCH):
“We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”

DAY-1 TO DAY-7 EXECUTION (DAILY CADENCE):

1) EMAIL BLOCKS (50–100/day)
- Block A (9:00–10:00am local target time): Send 25–50 new cold emails.
- Block B (1:30–2:30pm local target time): Send 25–50 new cold emails.
Rules:
- Plain text only. No images. No attachments.
- Keep to ~80–120 words.
- One clear CTA: “Open to a 10-min chat?” or “Want me to estimate recovered revenue?”
- Always include legitimacy URL + reply email in footer.

2) CALL BLOCKS (20–40/day)
- Block C (11:00am–12:30pm): Call 10–20.
- Block D (3:30–5:00pm): Call 10–20.
Outcome logging must happen immediately after each call attempt.
If no answer: leave voicemail (first attempt only) + send follow-up email “Tried you just now” (template below).

3) TEXTS (ONLY WHERE COMPLIANT)
- Use only to follow up after a call attempt or inbound reply.
- Do not blast unsolicited SMS. Keep it 1:1, minimal, opt-out-friendly.

4) DEMO BOOKING WORKFLOW
- Goal is to qualify in <3 minutes.
- If qualified: book a 15-min demo within 72 hours.
- Confirmation: send calendar invite + short agenda + ask for best number to text reminders.
- After demo: send Stripe link and onboarding checklist; schedule concierge onboarding within 24–48 hours.

QUALIFICATION (FAST):
Ask 4 questions:
1) “About how many appointments per week do you run per location?”
2) “What’s your no-show / late-cancel rate roughly?”
3) “What’s an average visit worth (or first visit)?”
4) “Who owns scheduling/reminders—front desk, office manager, or you?”
If appointments <40/week OR no-show rate already <3% with strong process, deprioritize.

KPIs (DAILY SCORECARD):
- New cold emails sent
- Total email replies (positive/neutral/negative)
- Calls placed
- Conversations (decision-maker reached)
- Demos booked
- Demos held
- Closed/won locations
- Avg days from first touch → demo
- Avg days from close → live
- Top objections encountered

HUBSPOT PIPELINE (MINIMUM VIABLE):
Stages:
1) New Lead
2) Contacted (Email 1 sent)
3) Replied / Engaged
4) Qualified
5) Demo Scheduled
6) Demo Held
7) Proposal/Checkout Sent
8) Closed Won
9) Closed Lost
10) Nurture

Required properties to track:
- Vertical (dental/chiro/med spa/PT/optometry/etc.)
- City/State
- Location count
- Appts/week (est.)
- No-show rate (est.)
- Value per visit (est.)
- Scheduling system (unknown/Calendly/Acuity/PMS/etc.)
- Decision maker role
- Last touch date
- Next step date
- Objection tag (price/time/happy with current/no authority/etc.)

LEAD CAPTURE / IMPORT COLUMNS (CSV):
Business Name | Location Name | Website | Phone | City | State | Vertical | Contact First | Contact Last | Title | Email | Source URL | Notes | Owner/Manager Name (if known)
Dedupe rule: dedupe by Website OR Phone.

EMAIL SEQUENCE (4 STEPS, READY TO SEND)

Subject line options (rotate):
1) quick question about no-shows at {{clinic}}
2) reducing no-shows (two-way confirmations)
3) {{city}} appointment reminders
4) can I estimate recovered revenue for {{clinic}}?
5) waitlist fill for last-minute cancellations
6) 10 min to cut no-shows?

EMAIL 1 (Day 1):
Hi {{first_name}} — I’m Bob.

We help appointment-based locations reduce no-shows using two-way SMS confirmations (patients reply Y/N), instant rescheduling links, and a waitlist to fill last-minute gaps.

If you’re seeing even a few no-shows a day, it usually translates to meaningful recovered revenue per month.

Open to a 10-minute chat this week to see if it fits {{business_name}}?

— Bob Smith
Appointment No-Show Reducer
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

EMAIL 2 (Day 3):
Hi {{first_name}} — quick follow-up.

If you tell me (a) appointments/week and (b) average value per visit, I can estimate what a 20–40% no-show reduction would be worth for {{business_name}}.

Want me to run that estimate?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

EMAIL 3 (Day 6):
{{first_name}}, last thing—most reminder systems send one-way texts. Ours collects confirmations, triggers reschedules automatically, and can pull from a waitlist when cancellations happen.

We also do done-for-you setup in 24–48 hours.

Is there someone else besides you who owns scheduling/reminders at {{business_name}}?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

EMAIL 4 (Day 10):
Hi {{first_name}} — should I close the loop?

If no-show reduction isn’t a priority right now, no worries. If it is, I can show exactly how two-way confirmations + reschedules + waitlist fill works for a location like yours.

Worth a quick 10 minutes?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

REPLY HANDLING SNIPPETS (COPY/PASTE)

Positive reply:
“Great—happy to. What day/time works best? If you share approx appts/week + avg value/visit, I’ll come prepared with a recovered revenue estimate.”

Price objection:
“Totally fair. If we could reliably recover even X appointments/month, it usually pays for itself quickly. What’s a typical visit value and rough no-show rate?”

Already have reminders:
“Most systems are one-way reminders. The difference is two-way confirmations + auto-reschedules + waitlist fill. Are you currently capturing confirmations (Y/N) and filling cancellations from a waitlist?”

Not decision maker:
“Thanks—who’s the best person to speak with about scheduling/reminders? If you can intro me, I’ll keep it to 10 minutes.”

‘Stop’ / not interested:
“Understood—I'll close the loop. If it becomes a priority later, you can reach me at agent_bob_replit+no-show-bot@agentmail.to.”

CALL OPENER (15 seconds):
“Hi, is this {{name}}? I’m Bob—quick one: do you handle appointment reminders/scheduling there? We help reduce no-shows using two-way SMS confirmations and instant reschedules. If I asked you two numbers—appointments per week and average value per visit—could I estimate what no-show reduction would be worth for you?”

VOICEMAIL (first attempt):
“Hi {{name}}, Bob here. We help clinics reduce no-shows using two-way SMS confirmations and instant reschedules. I’ll send a short email as well—my info is agent_bob_replit+no-show-bot@agentmail.to and the overview is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. If no-shows are costing you slots, happy to share a quick estimate. Thanks.”

END OF RUNBOOK.
