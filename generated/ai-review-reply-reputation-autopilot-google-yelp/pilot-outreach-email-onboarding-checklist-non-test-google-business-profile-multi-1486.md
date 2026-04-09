# Pilot Outreach Email + Onboarding Checklist (Non-test Google Business Profile, Multi-location)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T15:59:17.922Z

---

Subject: Free 7‑day pilot: we’ll draft your Google/Yelp review replies + weekly reputation report

Hi {{FirstName}},

I’m Bob. We built an AI Review Reply & Reputation Autopilot that helps local businesses respond faster to reviews (without risky language) and keeps owners informed with a weekly KPI report.

If you’re open to it, I’d like to run a free 7‑day pilot for {{BusinessName}}. During the pilot we will:
- Ingest your new Google reviews automatically (Google Business Profile integration)
- Draft brand‑safe replies with a human approval step (you approve/edit in one click)
- Escalate negative reviews immediately (email alerts to you/your team)
- Send a weekly reputation KPI report (volume, avg rating trend, response time, negative share, top themes)

You can see the app here (live MVP):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you want to try it, reply “YES” and I’ll send the onboarding link (or you can email us directly at agent_bob_replit+review-bot@agentmail.to).

—
Onboarding checklist (what we need from you)
1) Confirm business name + primary location(s) you want included in the pilot.
2) Provide the best email(s) for:
   - Negative review escalation alerts
   - Weekly KPI report recipients
3) Choose your reply style:
   - Tone: warm/professional OR upbeat/friendly OR concise/formal
   - Signature: owner name OR team name
4) Connect Google Business Profile:
   - We’ll provide a secure “Connect Google” button.
   - You’ll select which locations to enable for syncing.
5) (Optional) Yelp ingestion fallback:
   - If Yelp API isn’t available, forward Yelp notification emails to the provided ingest address, or upload a CSV / screenshot imports.

Pilot success criteria (we track this in the dashboard)
- Response time: reduce time-to-first-reply by 50%+
- Negative review SLA: alert sent within minutes + draft ready same day
- Coverage: 90%+ of new reviews have a draft ready for approval

Common questions
- Do you auto-post replies? If API posting isn’t available, we provide a guided copy/paste flow with an audit trail so you can post safely.
- Can it say the wrong thing? Drafts are guarded by policies (no PII, no incentives, no admissions of fault, etc.) and require approval before posting.

If you’d like, share the best time for a 10‑minute setup call and we’ll get you live the same day.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to

Internal pilot runbook (for us)
- Day 0: Create Business + Locations, set escalation rules, invite owner via magic link.
- Day 1: Connect GBP, enable 2+ locations, run manual sync, verify drafts appear.
- Day 1-2: Confirm owner can approve/edit, validate manual post audit works.
- Day 2-7: Monitor cron sync health and error alerts; ensure weekly report sends on schedule.
- End of pilot: Export metrics CSV, summarize KPI improvements, propose paid plan + onboarding for additional locations.
