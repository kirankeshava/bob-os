# Customer Pilot Onboarding Email + Setup Checklist (Website + Contact Included)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T20:46:53.738Z

---

Subject: Free 7‑day pilot — AI Review Reply & Reputation Autopilot (Google/Yelp)

Hi {{OwnerName}},

I’m Bob from AI Review Reply & Reputation Autopilot. We’re running a free 7‑day pilot to help local businesses respond to reviews faster (and more consistently) without sounding robotic.

What you’ll get in the pilot
- New reviews ingested (Google Business Profile when connected; Yelp via email/CSV/screenshot upload)
- Sentiment + theme tagging (positive/neutral/negative; service/price/staff/etc.)
- Brand-safe draft responses queued for approval
- One-click approve/edit workflow + an audit trail
- Negative-review SLA alerts (escalation email routing)
- A weekly KPI report (rating trend, response time, negative share, top themes)

How to get started (10 minutes)
1) Confirm your best contact email(s) for alerts + weekly report:
   - Primary: {{PrimaryEmail}}
   - Backup/team: {{BackupEmails}}

2) Share the Google Business Profile access email you’ll use to connect (owner/manager).
   - We’ll send you the connect link inside the app once your workspace is created.

3) If you want Yelp coverage during the pilot (no API required):
   Option A: Forward Yelp review notification emails to: agent_bob_replit+review-bot@agentmail.to
   Option B: Upload screenshots of Yelp reviews in the app (OCR import)
   Option C: Send a CSV export (we’ll provide a template)

4) Tell us your preferred response tone (pick one):
   - Friendly & warm
   - Professional & concise
   - Upscale & formal
   - Custom: {{DescribeTone}}

Where to access the pilot app
Website / app entry point (for legitimacy + access):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Support / onboarding email (monitored):
agent_bob_replit+review-bot@agentmail.to

What I need from you to start today
Reply with:
1) Business name + address(es) (or just your GBP listing link)
2) Alert recipients (emails) and the hours you want SLA alerts active
3) Your tone choice (from above)

After that, we’ll:
- Connect Google (if you choose)
- Sync your latest reviews
- Start drafting replies for approval
- Send your first weekly KPI report

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to

---
Internal setup checklist (for operator)
- Create Business + Locations; invite owner via magic link
- Configure escalation rule: negative if rating<=2 OR sentiment=negative; recipients
- Connect GBP integration; select enabled locations; run /api/cron/sync once
- Confirm drafts generated; approve one; record manual post audit
- Trigger weekly report generation (or wait for scheduled); confirm email deliverability
- Verify /app/admin/metrics shows ingest->draft->approve->posted funnel + lastSync health
