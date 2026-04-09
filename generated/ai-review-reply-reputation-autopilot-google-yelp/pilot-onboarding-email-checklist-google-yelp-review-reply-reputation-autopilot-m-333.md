# Pilot Onboarding Email + Checklist (Google/Yelp Review Reply & Reputation Autopilot MVP)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:21:20.444Z

---

Subject: Get set up: AI Review Reply & Reputation Autopilot (Google/Yelp) — 10 minutes

Hi {{OwnerName}},

Thanks for trying AI Review Reply & Reputation Autopilot. This MVP helps you respond faster to reviews (brand-safe drafts), escalate negative reviews immediately, and send a weekly KPI report.

You can verify we’re a real product here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
If anything looks off or you want changes to tone/brand voice, reply to this email: agent_bob_replit+review-bot@agentmail.to

Step-by-step setup (10 minutes)

1) Connect Google Business Profile (recommended)
- Log in to the app and go to Integrations → Google → Connect.
- Choose the Google account that manages your Google Business Profile.
- Approve permissions.
- Select which locations you want to enable for syncing.

2) (Optional) Yelp ingestion fallback
If Yelp API access isn’t available for your account, we can still ingest reviews:
- Option A: Forward Yelp review notification emails to your unique ingest address (we’ll provide it in-app).
- Option B: Import via CSV (template available in Import).
- Option C: Upload a screenshot of a review (OCR import). You’ll confirm extracted fields before saving.

3) Configure negative-review escalation
- Go to Admin → Escalation.
- Set what counts as “negative” (example: rating ≤ 2 OR sentiment = negative).
- Add recipients (owner/manager). These people will get an email alert as soon as a negative review is ingested.

4) Approve/edit replies (human-in-the-loop)
- Go to Reviews → Queue.
- You’ll see drafted replies ready for approval.
- Click a review to edit the draft if needed, then Approve.

5) Post replies (fast + auditable)
Because platform posting permissions vary, the MVP supports:
- Manual posting flow: Copy/paste the approved reply into Google/Yelp and then click “Mark as Posted” to keep an audit trail and response-time KPI accurate.

6) Weekly KPI report
- We’ll send a weekly report PDF via email with volume, rating trend, response time, negative share, and top themes.
- If you want it sent to additional people, reply with their email addresses.

What we measure (so you know what to expect)
- Ingested reviews: new reviews pulled from Google sync or imported via email/CSV/OCR.
- Drafted: reviews with an AI draft created.
- Approved: drafts approved by a human.
- Posted: drafts marked as posted (manual flow) so response-time KPIs reflect reality.
- Response time: time from review createdAt to postedAt (excludes rejected or never-posted items).

Quick verification checklist (2 minutes)
- Confirm at least one location shows “Last Sync” updated in Admin → Metrics.
- Confirm a test review appears in Reviews → Queue.
- Approve one reply and mark it posted after you paste it into Google.
- Confirm you received a negative-review alert email (if you imported a negative review).

If you reply with your preferred brand voice (e.g., “warm and short”, “formal and detailed”) and any banned phrases, I’ll tune the templates and guardrails.

— Bob
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1