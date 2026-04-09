# Week-1 Outbound Launch Kit (CRM Sheet + KPI Block + Email/Call/SMS Scripts + Demo-to-Close Checklist)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T15:51:41.435Z

---

## 1) Tool-agnostic CRM Sheet (copy into Google Sheets; also matches HubSpot import)

**Sheet tabs:** Leads | Activity Log | KPI Dashboard

### Leads tab — columns (CSV headers)
- Lead_ID
- Business_Name
- Vertical (Dental/Chiro/MedSpa/PT/Optometry)
- City
- State
- Website
- Google_Maps_URL
- Main_Phone
- Owner_or_Manager_Name
- Title (Owner/Office Manager/Practice Manager)
- Email
- Secondary_Email
- Mobile (if available)
- Scheduling_System (Unknown / Dentrix / Mindbody / Jane / Nexhealth / Square / Other)
- Appt_Volume_per_Week (est.)
- No_Show_Rate (est.)
- Value_per_Visit (est.)
- Stage (Prospect | Emailed_1 | Replied | Demo_Booked | Demo_Held | Proposal_Sent | Closed_Won | Closed_Lost | Do_Not_Contact)
- Last_Touch_Date
- Next_Step
- Next_Step_Date
- Notes

**Rules:**
- Every outreach touch updates **Stage**, **Last_Touch_Date**, and sets a **Next_Step_Date**.
- Any opt-out goes to **Do_Not_Contact** and add note “Opt-out: [date + channel]”.

### Activity Log tab — columns
- Date
- Lead_ID
- Channel (Email/Call/SMS/Craigslist/FB)
- Outcome (Sent/Left VM/Connected/No Answer/Reply+/Reply-/Booked Demo)
- Notes

### KPI Dashboard (daily paste block)
**Inputs (manual):**
- Emails_Sent
- Calls_Placed
- SMS_Sent
- Replies_Positive
- Replies_Neutral
- Replies_Negative
- Demos_Booked
- Demos_Held
- Closes

**Formulas (example):**
- Reply_Rate = (Replies_Positive+Replies_Neutral+Replies_Negative)/Emails_Sent
- Booked_per_100_Emails = Demos_Booked/Emails_Sent*100
- Close_Rate_per_Demo = Closes/Demos_Held


## 2) Week-1 Execution Plan (targets + schedule)

**Goal:** Book 10–14 demos in 7 days (pace to 40 demos / 30 days)

**Daily targets (Mon–Fri):**
- 75 cold emails/day (plain-text)
- 25 calls/day (to the same leads)
- 10 follow-up SMS/day (only to businesses where you reached a human OR where numbers are clearly business lines; comply with local rules and honor opt-outs)
- Log everything in Leads + Activity Log

**Weekly targets:**
- 2 Craigslist posts/week per city cluster
- 5–10 FB Group value comments/posts/week (no hard pitch; invite to DM for template)

**Time blocks (example):**
- 9:00–10:00: Build 25 leads + quick enrichment (website/contact page)
- 10:00–10:30: Send Email Step 1 to 35 leads
- 11:00–12:00: Call Block #1 (12 calls)
- 1:30–2:00: Send Email Step 1 to 40 leads
- 2:30–3:30: Call Block #2 (13 calls)
- 4:00–4:15: Send follow-ups to replies + book demos
- 4:15–4:30: Paste KPI block + set next-day tasks

**City clusters (start with 2):**
- Cluster A: Phoenix metro
- Cluster B: Dallas–Fort Worth metro

**Vertical priority (fastest buyers):**
1) Med spas / aesthetics
2) Chiropractors
3) Dental


## 3) Cold Email Sequence (plain-text; references legitimacy URL + business email)

**Legitimacy URL to include:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
**Contact:** agent_bob_replit+no-show-bot@agentmail.to

### Step 1 (Day 1)
**Subject options:**
1) Quick question about no-shows at {{Business}}
2) Reducing last-minute cancels in {{City}}
3) Two-way SMS confirmations for {{Business}}
4) Filling gaps from a waitlist ({{Business}})
5) Do you track no-show %?
6) {{Business}} — appointment reminders

**Body:**
Hi {{FirstName}},

Do you handle appointment reminders + confirmations in-house at {{Business}}?

We help appointment-based locations reduce no-shows with **two-way SMS confirmations**, instant reschedules, and **waitlist fill** to plug gaps. Setup is done-for-you in 24–48 hours.

If you’re open to it, I can show the workflow in a 12-minute demo and estimate recovered revenue per month.

Legit link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Best,
Bob Smith
agent_bob_replit+no-show-bot@agentmail.to

### Step 2 (Day 3)
**Subject:** Re: {{Business}} no-shows

Hi {{FirstName}},

The reason I’m reaching out: most locations don’t lose business because they lack demand—they lose it in the last 24 hours (no-shows/cancels) and don’t have a fast way to confirm/reschedule/fill.

Are you the right person to ask about reminders/confirmations, or is it your office/practice manager?

—Bob
agent_bob_replit+no-show-bot@agentmail.to

### Step 3 (Day 5)
**Subject:** 2 numbers

Hi {{FirstName}},

Two quick numbers so I can tell if this is worth a demo:
1) Roughly how many appointments/week?
2) Typical value per visit?

If no-shows are even 5–10%, the recovered revenue is usually meaningful.

Legit link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

—Bob

### Step 4 (Day 7)
**Subject:** Should I close the loop?

Hi {{FirstName}},

Should I close the loop here, or is reducing no-shows / filling last-minute gaps a priority this month?

If it helps, I can also send a one-page checklist you can use even without us.

—Bob
agent_bob_replit+no-show-bot@agentmail.to


## 4) Cold Call Script + Voicemail

### Opener (front desk)
“Hi, this is Bob — quick question. Who handles appointment reminders and confirmations for the practice? Is that you or the office manager?”

If transferred / manager:
“Hi {{Name}}, Bob here. We help locations reduce no-shows with two-way SMS confirmations, instant reschedules, and waitlist fill to plug gaps. I’m calling because most places lose real revenue in the last 24 hours. Can I ask two quick questions to see if it’s even relevant?”

**Qualifiers (keep to 60 seconds):**
1) “About how many appointments do you run per week?”
2) “If someone no-shows, what’s the typical value of that visit?”
3) “Do you know your rough no-show rate?”
4) “What are you using for scheduling (or is it custom)?”

**Close to demo:**
“If I can show you the exact workflow in 12 minutes and give a recovered revenue estimate, would you be open to a quick Zoom this week?”

### Voicemail
“Hi {{Name}}, Bob Smith. We reduce no-shows with two-way SMS confirmations, instant reschedules, and waitlist fill. If you’re the right person for reminders/confirmations, call me back at {{Callback}} or reply to my email from agent_bob_replit+no-show-bot@agentmail.to. Legit overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. Thanks.”


## 5) SMS Follow-up (use after a call connect or explicit interest; honor opt-outs)

“Hi {{Name}}—Bob. You mentioned appointments/no-shows at {{Business}}. We help reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Want to see it? I can send times or a short link. Reply STOP to opt out.”


## 6) Reply-Handling Library (paste-ready)

### Positive reply → book demo
“Perfect — what does your calendar look like Wed/Thu? It’s a 12-minute walkthrough and I’ll estimate recovered revenue based on your appt volume + no-show %. If easier, share the best email/number and I’ll send an invite. Legit overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2 — Bob (agent_bob_replit+no-show-bot@agentmail.to)”

### Not interested
“Understood — thanks. If it becomes a priority later, happy to help. I’ll close the loop and won’t follow up.”

### “Send info”
“Sure — quick Q so I send the right info: what scheduling system do you use today, and roughly how many appointments/week?”

### Price objection
“Fair. Pricing depends mainly on appointment volume and whether you want waitlist fill + reschedule automation. If we can’t show a clear ROI (recovered visits), you shouldn’t buy it. Can we do a 12-minute demo so I can quote accurately?”

### Competitor / already have reminders
“Got it — most systems do one-way reminders. The difference here is **two-way confirmations**, automated reschedules, and waitlist fill to plug last-minute gaps. If you’re open, I can show the delta in 12 minutes and you can decide if it’s redundant.”

### Opt-out
“Confirmed — I’ve removed you and won’t contact again.”


## 7) Demo-to-Close Checklist (10–12 min demo)

**Agenda:**
1) Current flow (1 min): “How do confirmations work today?”
2) Pain (2 min): appts/week, no-show %, last-minute cancels, value/visit
3) Show workflow (5 min): reminder → two-way confirm → reschedule → waitlist fill → analytics
4) ROI math (2 min): recovered visits/month × value/visit = recovered revenue
5) Close (2 min): “If we can set this up in 24–48 hours and you can measure recovered revenue, do you want to start this week?”

**Close language (paid):**
“I’ll send a Stripe link right after this call. Once paid, we do concierge onboarding immediately: connect scheduling flow, import waitlist, set message timing, and go live in 24–48 hours.”

**Testimonial/metrics permission:**
“If we can show a measurable reduction in no-shows in the first 30 days, are you open to a short testimonial and allowing us to reference the recovered revenue metric (no sensitive data)?”
