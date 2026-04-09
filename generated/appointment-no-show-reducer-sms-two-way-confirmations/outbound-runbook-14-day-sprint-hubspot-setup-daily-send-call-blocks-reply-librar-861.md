# Outbound Runbook (14-Day Sprint): HubSpot Setup + Daily Send/Call Blocks + Reply Library + Craigslist/FB Distribution (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T11:05:42.755Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Primary inbox for replies: agent_bob_replit+no-show-bot@agentmail.to

GOAL (30 days): 40 demos booked, 25 locations closed. This runbook covers the first 14 days to create momentum.

1) HUBSPOT (FREE) SETUP — DO THIS FIRST (30–45 min)
Pipeline: “No-Show Reducer Outbound”
Stages (with exit criteria):
1. New Lead (record created)
2. Touched (at least 1 email or call completed)
3. Connected (2-way contact: replied or live conversation)
4. Demo Booked (calendar invite sent)
5. Demo Held (attended)
6. Trial/Setup Pending (verbal yes; collecting scheduling details)
7. Closed Won (paid)
8. Closed Lost (reason required)
9. Nurture (timing/decision later)

Required properties (simple, fast):
- Vertical (Dental/Chiro/Med Spa/PT/Optometry/Other)
- City
- Website
- Main Phone
- Contact Name
- Contact Role (Owner/Manager/Front Desk)
- Contact Email
- Scheduling System (unknown / Dentrix / Jane / Mindbody / Square / Other)
- Appts per week (range)
- No-show rate (unknown / <5% / 5–10% / 10–20% / 20%+)
- Value per visit (unknown / <$100 / $100–250 / $250+)
- Next Step (call/email/demo date)
- Last Touch Date (auto if possible)
- Outcome of last touch (No answer/Left VM/Interested/Not now/Stop)

Task queues:
- “Call Today (New/Touched)”
- “Follow-up Today (Connected/Demo Booked)”
- “No-Reply Follow-ups (Day 3/5/8)”

Logging rule: Every touch gets an activity note with: channel + quick outcome + next step date.

2) DAILY EXECUTION BLOCKS (MON–FRI)
Block A (Email Send 1): 9:00–10:00 local time — send 25–50 new emails.
Block B (Calls): 10:30–12:00 — call 10–20 prospects; leave VM; log outcomes.
Block C (Email Send 2): 1:30–2:30 — send 25–50 new emails + follow-ups.
Block D (Calls/SMS): 3:30–5:00 — call 10–20 + send follow-up texts where compliant.
Daily KPI minimum: 50 emails sent, 20 calls completed, all logged.

3) 14-DAY CADENCE (EMAIL + CALL + SMS)
Day 1: Email #1 + Call attempt #1 (if phone). If no answer: leave VM.
Day 2: Call attempt #2 + optional short SMS (“Quick question on no-shows—ok to send details?”).
Day 3: Email #2 (value + question) + Call attempt #3.
Day 5: Email #3 (case-style math + CTA) + Call attempt #4.
Day 8: Email #4 (breakup / permission) + Call attempt #5.
Day 12: Nurture bump if “Not now”: “Still worth reducing no-shows this quarter?”

Voicemail (10–15 sec):
“Hi {{Name}}, Bob here. Quick question—are no-shows a problem at {{Business}}? We use two-way SMS confirmations to reduce them and help reschedule instantly. I’ll send a quick email too. You can reach me at agent_bob_replit+no-show-bot@agentmail.to.”

SMS (only where appropriate; keep it neutral):
“Hi {{Name}}, Bob—quick question: do you handle appointment reminders at {{Business}}? We help reduce no-shows with two-way SMS confirmations. OK to send 2 details?”

4) REPLY → DEMO CONVERSION LIBRARY (COPY/PASTE)
Always include: legitimacy URL + a concrete time question + keep it short.

A) Positive reply (“Yes / interested”)
“Perfect. This is exactly what we do: two-way SMS confirmations + instant reschedules + waitlist fill. Quick 12–15 min walkthrough—what’s better: today 3:30p or tomorrow 10:30a? 
(Info/legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2)
You can also reply here: agent_bob_replit+no-show-bot@agentmail.to.”

B) “Send info”
“Will do—2 quick questions so I send the right info:
1) About how many appointments/week?
2) Rough no-show rate (5–10% / 10–20% / 20%+)?
Here’s the overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2”

C) “What’s the price?”
“Depends on appointment volume + # locations. Typical range is less than the revenue from 1–3 saved appointments/month. If you share appts/week + avg value/visit, I’ll quote in 1 email. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2”

D) “We already use reminders (Solution X)” 
“Totally—most do. The difference is two-way confirmation + auto-reschedule + waitlist fill (so cancellations turn into filled slots). Worth 10 minutes to compare? What system are you on now?”

E) “Not now”
“No worries. When should I circle back—30 days or next quarter? If helpful, I can send a 1-page ‘recovered revenue’ calculator. (Reply here: agent_bob_replit+no-show-bot@agentmail.to)”

F) “Stop / remove”
“Understood—I'll remove you from outreach. If you ever want the calculator later, you can reach me at agent_bob_replit+no-show-bot@agentmail.to.”

5) CRAIGSLIST (2 POSTS/WEEK PER CITY CLUSTER)
Category: Small Biz Ads or Services > Creative/Computer (varies by city). Avoid spammy claims.
Post copy (paste):
Title: “Reduce appointment no-shows (two-way SMS confirmations + reschedules)”
Body:
“If you run an appointment-based business (dental, chiro, med spa, PT, optometry), no-shows and last-minute cancels quietly drain revenue.
We help reduce no-shows using:
- Two-way SMS confirmations (patients reply Y/N)
- Automatic reschedule options
- Waitlist fill to backfill cancellations
- Simple analytics to show recovered revenue
Done-for-you setup in 24–48 hours.
See overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to”

6) FB GROUPS (5–10 VALUE COMMENTS/WEEK)
Comment template (value-first):
“I’ve seen no-shows drop when reminders become *two-way* (patients confirm Y/N) and you offer an instant reschedule link. If anyone wants it, I can share a simple calculator to estimate recovered revenue per week. Overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2 (or email me: agent_bob_replit+no-show-bot@agentmail.to).”

7) DAILY KPI REPORT (END OF DAY)
- Emails sent:
- Calls completed:
- SMS sent:
- Replies (positive/neutral/negative):
- Demos booked:
- Demos held:
- Closed won:
- Notes: top objections + which vertical/city responded best.

If we execute this exactly for 10 business days with 50–100 emails/day + 20–40 calls/day, we will have enough reply volume to book demos; then we tighten targeting to the best-responding vertical/city cluster and increase send volume safely.