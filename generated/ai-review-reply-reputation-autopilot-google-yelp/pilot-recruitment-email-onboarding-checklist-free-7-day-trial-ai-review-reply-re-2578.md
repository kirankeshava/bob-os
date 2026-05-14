# Pilot Recruitment Email + Onboarding Checklist (Free 7-Day Trial) — AI Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T05:34:18.987Z

---

Subject: Free 7-day “Review Reply Autopilot” pilot for your Google reviews (we’ll draft replies + weekly KPI report)

Hi {{FirstName}},

I’m Bob Smith. I’m running a small pilot for an AI-assisted “Review Reply & Reputation Autopilot” built for local businesses that don’t have time to keep up with Google/Yelp reviews.

What you get for 7 days (free):
- New reviews automatically pulled into a reply queue (Google Business Profile integration, or email/CSV fallback)
- Brand-safe reply drafts for each review (you can edit)
- One-click approve flow + an audit trail of what was posted
- Fast negative-review escalation: email alerts when rating is low/negative sentiment is detected
- A weekly KPI report (PDF + email) showing: review volume, average rating trend, response time, negative share, and top themes

If you’re open to a quick pilot, I can onboard you in ~10 minutes and you’ll start seeing drafts the same day.

How it works:
1) You connect Google Business Profile (OAuth) OR forward review emails / upload CSV/screenshots.
2) We draft responses and place them in an approval queue.
3) You approve/edit; posting can be guided copy/paste (works even when APIs are limited).
4) You receive escalation alerts + a weekly report.

To verify legitimacy, here’s the live app:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Reply with:
- Your business name
- The best email to receive alerts/reports
- Whether you want Google integration or prefer email/CSV first

Or email me directly at: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot

---
Onboarding checklist (internal / for the call)

A) Preflight
- Confirm decision-maker email for alerts/reports
- Confirm locations count + primary timezone
- Confirm preferred brand voice: friendly / professional / brief
- Confirm escalation recipients (owner, GM, support inbox)

B) Connect + Ingest
Option 1: Google Business Profile
- In Integrations → Google: click Connect
- Select locations to enable sync
- Verify lastSyncAt updates and reviews appear in queue

Option 2: Email/CSV/Screenshot fallback
- Email forwarding: forward review notification emails to the provided ingest address (or upload .eml)
- CSV import: upload template with rating/author/text/date/source/url
- Screenshot OCR: upload screenshot, confirm extracted fields, finalize import

C) Configure SLA + Routing
- Negative rule: sentiment=negative OR rating ≤ 2
- SLA: alert immediately; reminder at 4h if not approved
- Routing: who gets alerted, and who approves

D) Verify workflow
- Confirm at least 1 review ingested
- Confirm draft created and appears in approval queue
- Approve + mark posted (manual audit)
- Trigger weekly report “send now” (if enabled) and confirm delivery

E) Success criteria for pilot
- Response time reduced (baseline vs this week)
- Negative reviews escalated within SLA
- At least 70% of reviews have drafted replies; at least 30% posted (manual OK)
- Weekly KPI report received and readable on mobile
