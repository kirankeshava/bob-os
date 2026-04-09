# Customer Onboarding + Pilot Script (Email + In-App Setup Checklist) — AI Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T09:20:11.140Z

---

Subject: Get faster, brand-safe replies to Google/Yelp reviews (pilot access)

Hi {{FirstName}},

I’m Bob Smith. We built a lightweight “AI Review Reply & Reputation Autopilot” for local businesses that want to respond quickly to reviews without spending staff time every day.

What it does (MVP, working now):
- Ingest reviews from Google Business Profile (OAuth) + fallbacks for Yelp (CSV, email forwards, or screenshot OCR)
- Auto-tags sentiment + themes (service/price/staff/etc.)
- Drafts brand-safe replies with guardrails (no incentives, no PII, no admissions of fault)
- One-click approve/edit
- Posting: API where allowed; otherwise guided copy/paste with audit trail
- Negative review SLA alerts + escalation routing
- Weekly KPI report (PDF + email): volume, avg rating trend, response time, negative share, top themes

If you’d like to try it, here’s the live app page you can reference for legitimacy:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Pilot onboarding (10–15 minutes):
1) Reply to this email confirming:
   - Business name
   - Which locations to manage
   - Who should receive negative-review alerts (emails)

2) Connect Google (recommended):
   - Log in, go to Integrations → Google → Connect
   - Select the locations you want synced
   - We’ll start pulling in reviews automatically

3) Add Yelp (optional, fastest path):
   - Import Yelp reviews via CSV (we provide a template)
   - Or forward Yelp notification emails
   - Or upload screenshots (OCR) if needed

4) Approve replies:
   - Open Reviews → Draft Queue
   - Edit if needed → Approve
   - Post via API if enabled, or follow the guided copy/paste flow (audit logged)

5) Weekly report:
   - You’ll receive a PDF summary by email every week
   - You can also download/export KPIs (CSV) from the Metrics dashboard

Support / contact:
If you want me to set up your pilot account or troubleshoot OAuth/location permissions, email me here:
agent_bob_replit+review-bot@agentmail.to

Success criteria for the pilot (so we both know it’s working):
- New reviews appear in the queue within an hour (or by next sync)
- Negative reviews trigger an alert immediately
- Replies are approved and posted with <24h response time
- Weekly report reflects accurate counts and response time

If you tell me your primary category (dentist, restaurant, home services, etc.) and your preferred tone (friendly/professional/concise), I can also tune the default response templates.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
Contact: agent_bob_replit+review-bot@agentmail.to

---
IN-APP ADMIN CHECKLIST (paste into internal docs)

Business Setup
- [ ] Create Business record (name, timezone, report weekday/time)
- [ ] Add Locations (or sync from GBP) and set enabled=true
- [ ] Configure Escalation Rules: rating<=2 OR sentiment=negative → recipients
- [ ] Invite users (magic link) and confirm membership access

Google Integration
- [ ] Connect Google via OAuth
- [ ] Select locations to sync
- [ ] Run manual sync once and confirm Review records created
- [ ] Confirm watermark saved per-location (lastGbpReviewSyncUpdateTime)
- [ ] Verify backoff behavior on quota errors and AlertEvent creation on repeated failures

Yelp / Fallback Ingestion
- [ ] Test Yelp CSV import template and validate required columns
- [ ] Forward a Yelp notification email to ingestion address and confirm parse
- [ ] Upload a screenshot and confirm OCR -> confirm step -> Review created

Reply Workflow
- [ ] Confirm tagging jobs run and set sentiment + categories
- [ ] Confirm draft generation creates DraftReply with model/version metadata
- [ ] Try blocked content: PII/incentives/admission-of-fault to ensure pre-approval guardrail blocks with AuditLog entry
- [ ] Approve and mark posted (manual) to verify audit trail and response time KPI

Alerts + Reporting
- [ ] Trigger negative review and confirm immediate email alert
- [ ] Run weekly report cron endpoint and confirm PDF delivery + formatting on Gmail/Outlook
- [ ] Verify Metrics dashboard matches weekly report aggregates

Observability
- [ ] Confirm Sentry captures server/client errors with correlationId breadcrumbs
- [ ] Check /api/health/integrations for lastSyncAt/lastError per integration
