# Outbound Pilot Onboarding Email + Checklist (Non-test Google Business Profile, Multi-location)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** script
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T11:45:24.378Z

---

Subject: Free 7-day pilot: AI Review Reply & Reputation Autopilot for your Google reviews

Hi {{FirstName}},

I’m Bob. We built an AI Review Reply & Reputation Autopilot that helps local businesses respond faster (and more consistently) to Google reviews.

What it does:
- Pulls new Google Business Profile reviews into a single queue
- Tags sentiment/themes (service, staff, price, etc.)
- Drafts brand-safe reply suggestions (you can edit)
- One-click approve + an audit trail of what was posted
- Escalates negative reviews immediately
- Sends a weekly KPI report (volume, rating trend, response time, negative share, top themes)

Pilot offer (7 days): we’ll set this up for 1–3 locations and prove it reduces response time + catches negatives fast. No long-term commitment.

To verify we’re real, here’s the live app URL we’ll use during onboarding:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you want to try it, reply to this email with:
1) Your business name
2) The best email(s) for alerts + weekly reports
3) How you like to sound in replies (friendly/formal/short)

Or you can book a quick 15-minute setup call and we’ll connect Google in real time.

— Bob
agent_bob_replit+review-bot@agentmail.to

---

Pilot Onboarding Checklist (internal)

Goal: Validate the full workflow on a real, non-test Google Business Profile with multiple locations, and confirm cron-based sync stability.

A) Pre-flight
1. Confirm business owner has Manager/Owner access to Google Business Profile.
2. Confirm stakeholder emails for:
   - Negative review SLA alerts
   - Weekly KPI report
   - Optional: secondary escalation recipient
3. Collect brand reply preferences:
   - Tone (warm/professional)
   - Signing style (e.g., “– The {{BusinessName}} Team”)
   - Any phrases to avoid

B) Connect Google & enable locations
1. In app: Integrations → Google → Connect.
2. Complete OAuth and verify scopes granted.
3. Select locations to enable for syncing.
4. Verify locations appear in admin and have gbpLocationId stored.

C) Ingestion validation
1. Trigger manual sync (or wait for /api/cron/sync).
2. Confirm new reviews created with:
   - rating, author, text, createdAt
   - raw payload stored
3. Confirm per-location watermark updated (lastGbpReviewSyncUpdateTime).
4. Force a second sync and ensure no duplicates (upsert by gbpReviewId).

D) Tagging & draft generation
1. Confirm sentiment + category tags populated.
2. Confirm DraftReply created for each review (unless blocked).
3. Verify guardrail gate:
   - PII redaction
   - banned phrases / incentive language blocks approval

E) Approval → posting flow
1. Approve one positive review and mark as posted via guided copy/paste.
2. Approve one negative review and verify escalation email is sent immediately.
3. Confirm AuditLog entries for approve/edit/post events.

F) Metrics + reporting
1. Open Admin → Metrics and verify:
   - Sync health shows lastSyncAt and any lastError per location
   - Funnel counts (ingested/drafted/approved/posted)
   - Median/p90 response time and negative share
2. Generate a weekly report on demand (or wait for cron) and confirm PDF email renders well on Gmail + Outlook.
3. Export CSV and spot-check data correctness.

G) Stability (48-hour mini soak)
1. Leave cron sync enabled.
2. Watch for:
   - quota/backoff warnings
   - pagination edge cases
   - edited/deleted review behavior
3. Confirm no repeated failures without AlertEvents.

Success criteria for pilot
- New reviews appear in queue within expected sync window.
- Drafts generated reliably, with guardrails preventing risky approvals.
- Negative reviews trigger alerts within SLA.
- Weekly report matches dashboard metrics and is deliverable.

If any step fails, capture:
- locationId, gbpLocationId
- correlationId from logs
- timestamp + error message
- raw payload (if available)

This checklist is designed to be run end-to-end in <30 minutes for setup, then passively monitored for 48 hours for stability.
