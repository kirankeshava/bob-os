# Second-Pilot Onboarding Email + Execution Checklist (Multi-Location GBP)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T14:09:42.110Z

---

Subject: Quick setup for your AI Review Reply & Reputation Autopilot (Google/Yelp) pilot

Hi {{FirstName}},

Thanks for joining the pilot for AI Review Reply & Reputation Autopilot. This helps you respond faster to Google/Yelp reviews with brand-safe drafts, escalation alerts for negatives, and a weekly KPI report.

1) Confirm your pilot access
- Please reply to this email with:
  - Your business name
  - The best owner/manager email(s) to receive negative-review alerts and weekly reports
  - Your timezone

2) Connect your Google Business Profile (2 minutes)
- Go to: {{AppBaseUrl}}/app/integrations/google/connect
- Sign in with the Google account that manages your Google Business Profile.
- When prompted, approve access.
- Select the locations you want enabled for syncing.

If you prefer, we can start with a manual import instead:
- Forward review notification emails to: agent_bob_replit+review-bot@agentmail.to
- Or upload a CSV / screenshot in the app under Reviews → Import.

3) Confirm escalation settings (1 minute)
- In the app, open Admin → Escalation.
- Set who should be notified when:
  - sentiment = negative, or
  - rating <= 2 stars
- You can add multiple recipients (owner + manager + front desk).

4) Review the draft queue (5 minutes)
- Open Reviews → Queue.
- You’ll see:
  - New reviews ingested
  - Auto-tagged sentiment + category (service/price/staff/etc.)
  - A drafted reply that follows brand-safe rules (no incentives, no PII, no admissions of fault)
- Action options:
  - Approve (one click)
  - Edit then approve
  - Reject (if you don’t want to respond)

5) Posting replies
- If the platform API doesn’t allow direct posting for your account, we’ll use the guided “copy/paste” flow.
- The app records an audit trail (who approved, when posted) so response-time KPIs remain accurate.

6) What you’ll receive during the pilot
- Immediate email alerts for negative reviews (based on your thresholds)
- Weekly KPI report (PDF + email) covering:
  - Review volume and average rating trend
  - Response-time metrics
  - Negative share
  - Top themes and categories

Reference website (for legitimacy / overview):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Support / direct contact:
agent_bob_replit+review-bot@agentmail.to

---
INTERNAL EXECUTION CHECKLIST (for operator)

A) Pre-flight
- [ ] Confirm Business record exists and owner is invited (magic link accepted)
- [ ] Confirm at least 1 escalation recipient configured
- [ ] Confirm weekly report schedule (weekday + timezone) configured

B) Google Business Profile integration
- [ ] Complete OAuth connect
- [ ] Sync accounts + locations
- [ ] Enable 2+ locations (multi-location test)
- [ ] Verify per-location watermark fields initialized (Location.lastGbpReviewSyncUpdateTime)

C) First sync validation
- [ ] Trigger /api/cron/sync manually (admin-only) OR wait for cron
- [ ] Confirm new Review rows created with rawPayload retained
- [ ] Confirm tagging job ran: sentiment + categories persisted
- [ ] Confirm DraftReply created for each new review

D) Workflow validation
- [ ] Approve 1 positive draft (ensure guardrails don’t block)
- [ ] Attempt to approve a draft containing PII in review text (verify redaction/block + AuditLog)
- [ ] Mark 1 draft as posted_manual via guided flow (verify postedAt + audit event)

E) SLA/alerting validation
- [ ] Ingest or create a negative review (rating<=2 or negative sentiment)
- [ ] Confirm AlertEvent created and email delivered
- [ ] Verify dedupe behavior (no spam on repeated sync)

F) Weekly report validation
- [ ] Trigger /api/cron/weekly-reports manually (admin-only) OR wait
- [ ] Confirm WeeklyReport row created + PDF generated
- [ ] Verify email layout in Gmail + Outlook

G) Metrics dashboard validation
- [ ] Open /app/admin/metrics and confirm:
  - Sync health shows lastSyncAt/lastError per location
  - Funnel counts match the DB state
  - Response-time excludes rejected/unposted
  - CSV export downloads and opens cleanly

H) 72-hour stability watch
- [ ] Monitor Sentry for sync/ingest errors
- [ ] Confirm backoff behavior on 429/5xx
- [ ] Watch for edge cases: edited reviews, deleted reviews, duplicate IDs, pagination gaps

Success criteria for pilot:
- Reliable ongoing ingestion (no missed reviews across locations)
- Draft queue usable by owner (approve/edit in <30 seconds per review)
- Negative alerts received within SLA
- Weekly report delivered and matches metrics dashboard
