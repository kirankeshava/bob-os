# Pilot Outreach + Onboarding Email (Google/Yelp Review Reply & Reputation Autopilot) + Pilot Checklist

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:32:17.189Z

---

Subject: Quick pilot: we’ll draft your Google/Yelp review replies + alert you on negatives (1 week)

Hi {{FirstName}},

I’m Bob Smith. We built an MVP called “AI Review Reply & Reputation Autopilot” that helps local businesses respond to Google Business Profile and Yelp reviews quickly, consistently, and safely.

What it does in the pilot:
- Ingests new reviews (Google Business Profile API when connected; Yelp via email/CSV or screenshots)
- Tags sentiment + themes (service/price/staff/etc.)
- Drafts brand-safe replies using templates + guardrails (no PII, no incentives, no admissions of fault)
- Lets you approve/edit with one click
- Tracks what was posted (API where available; otherwise guided copy/paste with an audit trail)
- Alerts you immediately on negative reviews and routes escalations
- Sends a weekly KPI report (volume, rating trend, response time, negative share, top themes)

Legitimacy / demo URL:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Support/contact email:
agent_bob_replit+review-bot@agentmail.to

If you’re open to a 7-day pilot, here’s the setup:

1) Google reviews (fastest): Connect Google Business Profile
- You’ll click “Connect Google,” sign in, and select locations.
- After that, new reviews sync automatically on a schedule.

2) Yelp reviews (fallbacks):
- Forward Yelp notification emails to the address we provide, OR
- Import via CSV, OR
- Upload screenshots (we OCR and you confirm the extracted text)

3) Approvals + posting:
- You’ll see a queue of drafted replies.
- Click Approve/Edit.
- For platforms without posting API access, we provide a guided copy/paste step and record the timestamp for KPI accuracy.

4) Negative review escalation:
- We’ll configure your “negative” threshold (e.g., rating ≤ 2 or sentiment = negative).
- Alerts go to {{OwnerEmail}} and optional team emails.

Reply with:
- Business name
- Primary location name/city
- Best email(s) for alerts and weekly report
- Whether you want a “friendly” or “formal” reply tone

I can get you live the same day.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to

---
Pilot checklist (internal)

A) Pre-pilot (15 minutes)
- Create Business + Location records in admin
- Invite owner via magic link
- Configure escalation rules (threshold + recipients)
- Confirm weekly report schedule + timezone

B) Google Business Profile integration (15–30 minutes)
- Owner connects via OAuth
- Select 1–3 locations for pilot
- Run manual sync once (verify reviews appear)
- Verify incremental watermark updates per location

C) Yelp ingestion fallback (10 minutes)
- Ask owner to forward one Yelp notification email OR provide one screenshot OR CSV
- Verify OCR/manual confirmation flow if screenshot used

D) Reply workflow validation (30 minutes)
- Confirm: ingest → tagging → draft creation
- Confirm guardrails: try a review containing phone/email; ensure approval is blocked/redacted appropriately
- Approve/edit 3 drafts
- Mark as posted via guided manual flow; confirm audit trail + response-time KPI updates

E) Alerting + SLA (15 minutes)
- Inject a negative review sample (rating 1–2)
- Confirm alert email delivered + AlertEvent recorded
- Confirm metrics dashboard shows alert volume and sync health

F) Weekly report (scheduled test)
- Trigger /api/cron/weekly-reports for business
- Confirm PDF + email renders correctly on Gmail/Outlook
- Verify KPIs: volume, avg rating trend, response time excludes rejected/unposted

G) Success criteria for pilot (end of week)
- ≥ 80% of new reviews drafted within 10 minutes of ingest
- ≥ 60% approved and posted within 24 hours
- 100% of negative reviews alerted within 5 minutes of ingest
- Weekly report delivered on schedule with correct totals
