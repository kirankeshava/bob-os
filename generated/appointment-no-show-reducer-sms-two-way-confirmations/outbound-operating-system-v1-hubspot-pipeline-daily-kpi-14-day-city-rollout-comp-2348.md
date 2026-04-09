# Outbound Operating System v1 (HubSpot Pipeline + Daily KPI + 14-Day City Rollout + Compliance Language)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T20:56:51.682Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL (include in outreach where appropriate): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email (include in footer/signature): agent_bob_replit+no-show-bot@agentmail.to

GOAL (30 days): 40 demos booked, 25 locations closed.
Week 1 policy: free setup / free trial (no spend).

1) HUBSPOT FREE CRM — PIPELINE (copy exactly)
Pipeline name: No-Show Reducer — Outbound
Stages (in order):
1. New Lead (Uncontacted)
2. Attempting Contact (Email/Call 1–2)
3. Engaged (Reply/Conversation)
4. Demo Scheduled
5. Demo Held
6. Trial/Setup In Progress (Free)
7. Won (Location Live)
8. Lost — No Fit
9. Lost — No Response
10. Do Not Contact

Required properties (create as custom fields if needed):
- Vertical (Dentist / Chiro / Med Spa / PT / Optometry / Other)
- City Cluster (e.g., “Phoenix AZ”)
- Location Count (1, 2–5, 6–20, 21+)
- Scheduling System (Text: “NexHealth”, “Zocdoc”, “Mindbody”, “SimplePractice”, “Unknown”)
- Monthly Appointments (Number)
- Est. No-Show Rate % (Number)
- Value per Visit ($) (Number)
- Decision Maker Name (Text)
- Decision Maker Role (Owner/Manager/Office Manager)
- Best Phone (Text)
- Best Email (Text)
- Last Touch Date (Date)
- Next Step (Text)
- Next Step Date (Date)
- Objection Tag (Price/Timing/Already have reminders/Not decision maker/Other)
- Compliance Status (OK / Opt-out Requested)

Task queues (simple):
- Daily Email Sends (today)
- Daily Call Block (today)
- Replies to Handle (same day)
- Demo Confirmations (24h + 2h)

2) LEAD CAPTURE SHEET (for import) — COLUMNS
Use this exact header row for a CSV import:
Company Name | Website | Address | City | State | Phone | Generic Email | Contact Name | Contact Role | Contact Email | Vertical | City Cluster | Notes | Source URL | Last Touch Date | Next Step | Next Step Date | Compliance Status

Rules:
- If no contact name/email exists, still import with Generic Email + Phone + “Contact Role = Front Desk/Office”.
- Notes should include: “Offers online booking?”, “Hours”, and any mention of missed appointments/no-show policy.
- Deduplicate by Website OR Phone.

3) DAILY KPI REPORT (copy/paste every day)
Date:
City clusters worked:
Verticals worked:

EMAIL
- New emails sent:
- Follow-ups sent:
- Total delivered (estimate):
- Replies (total):
  - Positive:
  - Neutral/questions:
  - Negative:
  - Unsubscribe/stop:
- Demos booked from email:

PHONE/SMS
- Calls placed:
- Connects:
- Voicemails:
- Texts sent (only where compliant):
- Demos booked from calls/texts:

FUNNEL
- Demos scheduled (total):
- Demos held:
- Trials started:
- Locations live (won):
- Lost:

NOTES (top 5 learnings):
1.
2.
3.
4.
5.

4) 14-DAY CITY CLUSTER ROLLOUT (free + fast)
Objective: prevent list burn and keep learning loops tight. Run 2 city clusters at a time; rotate every 2–3 days.
Day 1–2: Cluster A + B (Dentist, Chiro, Med Spa, PT, Optometry)
Day 3–4: Cluster C + D
Day 5–6: Cluster E + F
Day 7: Review messaging, refine ICP; re-hit best-performing vertical in Cluster A
Day 8–9: Back to A + B with refined script (new leads only)
Day 10–11: C + D
Day 12–13: E + F
Day 14: Best-performing cluster + vertical only (push for demo volume)

How to choose clusters (quick heuristic):
- Pick metro areas with high density of appointment businesses + higher customer value (med spa, dental, PT).
- Avoid spreading too thin: better 200 leads across 2 clusters than 600 across 8.

5) COMPLIANCE-FORWARD CALL/TEXT LANGUAGE (use verbatim)
CALL opener (permission-based):
“Hi — is this the office manager or owner? I’ll be brief. We help appointment-based clinics reduce no-shows using two-way SMS confirmations + instant reschedules + waitlist fill. If I’m calling the wrong person, who handles scheduling outcomes?”

TEXT (only after a call attempt or where you have an existing inquiry; keep it minimal):
“Hi {Name}, Bob here. Quick question—do you currently confirm appointments by text and collect a YES/NO reply? We help reduce no-shows with two-way confirmations + reschedules + waitlist fill. If you’d rather not get texts, reply STOP. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

Opt-out handling (immediate):
- If they say STOP / unsubscribe / don’t contact: set HubSpot stage = Do Not Contact; Compliance Status = Opt-out Requested; do not message again.

6) MINI “DONE-FOR-YOU IN 24–48H” CLOSE (for replies)
“If you’re open to it, we can do a 12-minute demo and if it’s a fit we’ll set it up for you in 24–48 hours (free to start this week). You’ll see confirmations, auto-reschedules, and waitlist fill in action. What does your calendar look like tomorrow or Thursday?”

Execution checklist for Day-1 (non-negotiable):
- Import first 200 leads into HubSpot
- Send 50–100 plain-text emails (no images/attachments)
- Place 20–40 calls
- Log every touch + set Next Step Date for every engaged lead
- Post 1 Craigslist ad per city cluster and track inbound in HubSpot

Owner dependency (needed to accelerate):
- Decide first two city clusters (or confirm two metros you want first)
- Confirm who will host demos and what calendar link to use (HubSpot Meetings can be created free)
