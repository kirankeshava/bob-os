# Day-1 Outbound Execution SOP + HubSpot Import Schema + Reply Library (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T11:26:14.995Z

---

## Goal (30-day sprint)
Book 40 demos and close 20–25 locations for: **Appointment No-Show Reducer** (two-way SMS confirmations, instant reschedules, waitlist fill, simple analytics). Legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Business inbox for replies: agent_bob_replit+no-show-bot@agentmail.to

---

## A) HubSpot (Free) setup: pipeline + required fields
**Pipeline stages**
1) New Lead (not contacted)
2) Emailed – Attempt 1
3) Emailed – Attempt 2
4) Called/Texted – Attempt 1
5) Connected / Conversation
6) Demo Scheduled
7) Demo Held
8) Closed Won (Location)
9) Closed Lost
10) Do Not Contact

**Custom properties to add (minimum viable):**
- Vertical (Dental / Chiro / Med Spa / PT / Optometry)
- City Cluster (e.g., Phoenix AZ / Dallas TX)
- Scheduling System (Unknown / Dentrix / Jane / Mindbody / Athena / Other)
- Appt Volume per Week (Unknown / 0–25 / 26–75 / 76–150 / 150+)
- No-Show Rate (Unknown / <5% / 5–10% / 10–20% / 20%+)
- Value per Visit ($) (Unknown / <100 / 100–250 / 250–500 / 500+)
- Decision Maker (Owner / Office Manager / Ops / Front Desk / Unknown)
- Last Touch Date
- Next Step (free text)
- Next Step Date
- Objection Tag (Price / Already have reminders / Too busy / Not decision maker / Other)
- Source (Google Maps / Directory / Referral / Craigslist / FB Group)

**Logging rules (speed standard):**
- Every touch gets: Stage update + Last Touch Date + Next Step + Next Step Date.
- If bounced email: set stage = Closed Lost and tag Objection = Bad Email.
- If “stop/unsubscribe”: stage = Do Not Contact.

---

## B) Lead import schema (CSV columns to paste into a sheet)
Use these exact columns for quick HubSpot import:
1. Company Name
2. Website
3. Main Phone
4. City
5. State
6. Vertical
7. Decision Maker (name/title if found)
8. Decision Maker Email
9. Decision Maker Phone (if direct)
10. Source URL (Google Maps listing or directory page)
11. Notes (e.g., “mentions online booking”, “multiple locations”, etc.)
12. City Cluster
13. Scheduling System (if known)
14. Appt Volume per Week (estimate/unknown)
15. No-Show Rate (unknown)
16. Value per Visit ($) (estimate/unknown)
17. Stage
18. Last Touch Date
19. Next Step
20. Next Step Date

**Dedupe rules:**
- Primary key: Website domain. If no website, use Company Name + Main Phone.
- If multiple locations: create separate records per location (Company Name + City).

---

## C) Day-1 execution schedule (repeat daily)
**Daily targets:** 75 emails (range 50–100) + 25 calls (range 20–40) + 5–10 meaningful follow-ups.

**Block 1 (09:00–10:15): Email send + task creation**
- Send 35–50 new cold emails (plain text).
- Immediately create a call task for each email sent (same day or next day).

**Block 2 (10:30–11:30): Call block #1**
- Call 10–15 leads from the morning email batch.
- If no answer: voicemail + mark “Called Attempt 1” + set Next Step to “Call again + email follow-up tomorrow.”

**Block 3 (14:00–15:00): Email follow-ups**
- Send 15–25 follow-ups to non-responders from prior days.
- Send 10–15 “reply handling” emails to responders (objections/interest).

**Block 4 (15:15–16:15): Call block #2**
- Call 10–15 leads (mix of new + warm responders).
- Push to book demo on the spot.

**KPI to record end of day:**
- Emails sent
- Replies (positive/neutral/negative)
- Calls placed
- Conversations
- Demos booked
- Demos held
- Closes

---

## D) Email copy (plain-text core)
**Subject options:**
1) quick idea to cut no-shows at {{Clinic}}
2) two-way SMS confirmations for {{Clinic}}?
3) filling last-minute cancellations
4) reduce no-shows (done-for-you setup)
5) question about your appointment reminders
6) {{City}} clinics recovering revenue from no-shows

**Email #1 (cold):**
Hi {{FirstName}} — I’m Bob.

We help appointment-based locations reduce no-shows using **two-way SMS confirmations**, instant reschedules, and a **waitlist fill** so gaps get refilled automatically.

If you’re seeing even ~5–15% no-shows, this usually pays for itself quickly. We can get you set up **done-for-you in 24–48 hours**.

Open to a 12-minute demo this week?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email #2 (bump, 2 days later):**
Hi {{FirstName}} — should I talk with you or whoever owns scheduling and reminders for {{Clinic}}?

The quick win is two-way confirmations + auto-reschedule link + waitlist fill. Setup is 24–48 hours.

Worth a 12-minute look?

**Email #3 (value, 4–5 days later):**
Most locations we talk to underestimate no-shows because it’s spread across the week.

If you share (1) appts/week and (2) average visit value, I’ll estimate what no-shows cost and what you could recover with confirmations + reschedules + waitlist fill.

Want me to run the numbers for {{Clinic}}?

**Email #4 (breakup, 7–10 days later):**
I haven’t heard back — totally fine.

If reducing no-shows isn’t a priority right now, I can close the loop. If it is, reply “demo” and I’ll send times.

---

## E) Call opener + voicemail (fast qualify)
**Opener:**
“Hi, is this {{Name}}? This is Bob. Quick one — we help clinics cut no-shows using two-way SMS confirmations and instant reschedules. Who handles your appointment reminders and scheduling workflow?”

**If decision maker:**
“Are you currently seeing more like 5%, 10%, or 20% no-shows? And roughly how many appointments per week?”

**Close for demo:**
“If we could reduce that meaningfully with two-way confirmations + waitlist fill, would you be open to a 12-minute demo? I can do {{two time options}}.”

**Voicemail:**
“Hi {{Name}}, Bob here. We help reduce no-shows with two-way SMS confirmations and instant reschedules. Done-for-you setup in 24–48 hours. I’ll email details as well. You can also reach me at agent_bob_replit+no-show-bot@agentmail.to.”

---

## F) Reply-handling library (copy/paste)
**Positive (“sure / interested”):**
“Great — what day/time is best for a quick 12-minute demo? If easier, tell me who owns scheduling/reminders and I’ll coordinate. Info here too: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2”

**Not decision maker:**
“Thanks — who’s the best person to speak with about appointment reminders/no-show reduction? If you can intro by email, I’ll take it from there (agent_bob_replit+no-show-bot@agentmail.to).”

**‘We already have reminders’ objection:**
“Totally — most places do. The difference is **two-way confirmations** (not just reminders), plus **auto-reschedule** + **waitlist fill** to recover canceled slots. Worth a 12-minute compare?”

**Price push:**
“Happy to share pricing, but it depends on location volume. If you tell me approx appts/week and avg visit value, I’ll recommend the right tier and estimate recovered revenue first. Open to a quick demo?”

**Stop/unsubscribe:**
“Understood — I won’t reach out again. Thank you.”

---

## G) Lead sourcing workflow (free)
Pick 2 city clusters and 3 verticals to start (Chiro, Med Spa, Dental).

**Google queries:**
- “chiropractor {{City}}”
- “med spa {{City}}”
- “cosmetic dentist {{City}}”

For each result: capture Company, website, phone, city/state, and any booking/scheduling tool hints. Find an email on Contact/About pages (owner/manager). If none, log main phone + contact form URL and call first.

---

## H) Compliance + quality guardrails
- Use plain-text emails, minimal links (only the legitimacy URL when needed).
- Honor DNC/stop immediately.
- Keep claims simple: “reduce no-shows” + “two-way confirmations” + “setup in 24–48 hours.” Avoid medical claims.

This SOP is designed so we can launch outbound the same day as HubSpot + meeting link setup, with consistent tracking toward 40 demos / 25 closes.