# Pilot Onboarding Email + 15-Min Setup Script (Google/Yelp Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** script
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T13:59:04.585Z

---

Subject: Set up your Review Reply & Reputation Autopilot (15 minutes)

Hi {{FirstName}},

I’m Bob from AI Review Reply & Reputation Autopilot. This tool drafts brand-safe responses to your Google/Yelp reviews, escalates negative reviews immediately, and emails you a weekly KPI report.

Legitimacy / product link:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you want help, reply here: agent_bob_replit+review-bot@agentmail.to

---
15-minute setup (recommended order)

1) Connect Google Business Profile (best automation)
- Log in to the app and go to Integrations → Google → Connect.
- Approve access.
- Select which locations you want synced.
What happens next: we sync your latest reviews and start generating draft replies automatically.

2) Yelp ingestion (fastest reliable options)
Because Yelp API access is limited, you can use any of these:
A) Forward Yelp review notification emails to your unique ingest email (shown in the app).
B) Import CSV (there’s a template in Reviews → Import → Yelp CSV).
C) Upload screenshot (Reviews → Import → Screenshot). You’ll be able to confirm/edit extracted fields before importing.

3) Set escalation alerts (negative reviews)
- In Admin → Escalation, set who should be alerted (owner/manager emails).
- Default trigger: rating ≤ 2 OR sentiment = negative.
When a negative review arrives, we email the escalation list immediately with the review + suggested next steps.

4) Approve replies (human-in-the-loop)
- Go to Reviews → Queue.
- Open each review, edit if needed, then Approve.
Posting options:
- If API posting is available for that source/account, you’ll see “Post”.
- Otherwise, use Guided Copy/Paste: we provide the reply text and record an audit trail (who/when) after you confirm it was posted.

5) Weekly KPI report
- In Admin → Businesses, choose report day/time + timezone.
- Every week you’ll receive a PDF + email summary including: review volume, average rating trend, response time, negative share, and top themes.

---
What I need from you (reply with answers)
1) Business name + primary location(s)
2) Who should receive negative-review alerts?
3) Preferred reply tone (friendly/professional/short & direct), and anything to avoid (e.g., refunds language)

If you’d like, I can also send a “house style” template pack (greeting/closing, escalation phrasing, and do-not-say list) tailored to your brand.

Thanks,
Bob
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to

---
Internal 15-minute live call script (for Bob)
1) Confirm goal: “Reduce time-to-response + protect rating + catch negatives fast.”
2) Verify login, open Integrations → Google connect, select locations.
3) Trigger manual sync (or wait for cron) and show 1-2 ingested reviews.
4) Show a draft reply, edit once, approve, and demonstrate Guided Copy/Paste audit.
5) Set escalation recipients and trigger a test alert (if supported) or show a recent AlertEvent.
6) Set weekly report schedule and show sample PDF.
7) Close: agree on SLA expectations (e.g., negatives responded within 4 business hours) and next check-in.

Notes on positioning (keep concise)
- “Brand-safe drafts + human approval” (reduces risk)
- “Escalate negatives immediately” (protects revenue)
- “Weekly KPIs” (accountability)
