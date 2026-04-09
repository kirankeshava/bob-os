# Pilot Outreach Email + Onboarding Checklist (Free 7-Day MVP Trial)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T19:26:40.283Z

---

Subject: Free 7-day “Review Reply & Reputation Autopilot” pilot (Google reviews) — I’ll set it up for you

Hi {{FirstName}},

I’m Bob (agent_bob_replit+review-bot@agentmail.to). I’m running a free 7‑day pilot of a lightweight tool that helps local businesses respond to Google/Yelp reviews quickly and safely:

• Pulls in new reviews (Google Business Profile sync or simple imports)
• Tags sentiment/themes (positive/neutral/negative; staff/service/price/etc.)
• Drafts brand-safe replies for approval (you can edit/approve in one click)
• Escalates negative reviews immediately (email alerts + routing)
• Sends a weekly KPI report (volume, rating trend, response time, top themes)

It’s a real working MVP you can preview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’re open, I can onboard you in ~10 minutes and run it for free for 7 days. You’ll keep full control: replies are drafted for approval, and posting can be done via guided copy/paste (with an audit trail). If your account supports it, we can also enable API-based ingestion.

Two quick questions:
1) How many locations do you manage in Google Business Profile?
2) Who should receive “negative review” alerts (email addresses)?

If you reply with a good time window, I’ll send a secure invite link and get your first batch of drafts ready the same day.

— Bob
agent_bob_replit+review-bot@agentmail.to


ONBOARDING CHECKLIST (INTERNAL)

Goal (Pilot): Validate end-to-end workflow reliability on a real, non-test GBP with 2+ locations for 48 hours: OAuth connect → location enable → cron sync → tagging/drafting → approval → posting audit → SLA alerts → weekly report → metrics dashboard accuracy.

1) Create Business + Invite
- Admin → Businesses → Create Business (name, timezone, report day)
- Admin → Invite user (owner email); confirm membership created
- Confirm user can login and sees Reviews + Integrations + Metrics

2) Integration Setup (Google)
- Integrations → Google → Connect OAuth
- Fetch accounts/locations; select 2+ locations to enable sync
- Set negative thresholds (rating <=2 OR sentiment=negative)
- Set alert routing recipients (owner + optional manager)

3) Baseline Sync + Verification
- Trigger /api/cron/sync (manual run once) and confirm:
  - Reviews created/upserted per location
  - Raw payload retained
  - Tagging job executed with sentiment + categories
  - Draft replies generated and appear in queue
- Check /api/health/integrations for lastSyncAt/lastError
- Confirm Sentry has no unhandled errors

4) Approval + Posting Flow
- Approve 3 positive, 2 neutral, 2 negative drafts
- Verify guardrail gate blocks if PII/banned phrases appear
- For approved drafts, run manual “copy/paste posted” flow; verify postedAt + audit log

5) SLA Alerts Test
- Ensure at least one negative review triggers alert email
- Verify AlertEvent created and not duplicated (idempotent)

6) Weekly Report Test
- Trigger /api/cron/weekly-reports for the business
- Verify PDF renders, email arrives (Gmail + Outlook), KPIs correct:
  - Volume, avg rating, WoW change
  - Response time excludes rejected/non-posted
  - Negative share
  - Top themes/categories

7) Metrics Dashboard Validation
- Admin → Metrics:
  - Filters by date range + location
  - Funnel numbers match counts from DB
  - Response time median plausible
  - Alerts count matches AlertEvent table
- Export CSV and spot-check totals

8) Edge Cases to Observe (48h)
- Edited review text or rating change: confirm updateTime watermark captures update and draft regenerates (or flags)
- Review already has an owner reply in GBP payload: ensure we don’t draft duplicates; flag mismatch for reconciliation
- Quota/backoff behavior: check logs for 429; ensure retries don’t duplicate reviews

9) Success Criteria (Pilot)
- 0 missed reviews across enabled locations
- <5% draft blocks (guardrails) unless review content truly risky
- Negative review alerts delivered within SLA window
- Owner reports time saved and consistent tone

Follow-up (end of day 7): Send summary email with KPI deltas + recommended ongoing workflow and next automation steps.