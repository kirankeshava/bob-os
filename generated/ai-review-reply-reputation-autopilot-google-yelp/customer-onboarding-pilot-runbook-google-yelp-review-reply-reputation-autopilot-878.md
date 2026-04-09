# Customer Onboarding + Pilot Runbook (Google/Yelp Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T10:47:24.965Z

---

This runbook is used to onboard a local business onto the AI Review Reply & Reputation Autopilot MVP and successfully complete a 7–14 day pilot.

Product URL to share with customers (legitimacy + access): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Business contact email for onboarding and support: agent_bob_replit+review-bot@agentmail.to

1) Pre-flight (15 minutes)
- Confirm the business name, main contact, and escalation recipients (owner + manager). 
- Confirm review sources: Google Business Profile (preferred), Yelp (via CSV/email/screenshot), and any other sources they want captured manually.
- Confirm “brand voice” preferences: friendly/professional, short/medium, sign-off name (e.g., “—Mike, Owner”).

2) Account + Access
- Invite the customer via the app’s email magic link (Admin → Businesses → Invite user). 
- Customer signs in and lands in the review queue.

3) Connect Google Business Profile (5–10 minutes)
- In the app: Integrations → Google → Connect.
- Customer approves OAuth and selects locations to enable.
- Verify in Admin → Metrics → Sync Health that each enabled location shows a recent last sync time.
- If a location shows repeated failures, capture the last error and reduce scope to a single location temporarily to isolate.

4) Yelp ingestion fallback (choose one)
A) CSV import (fastest): Review Import → Yelp CSV template → upload.
B) Email parsing: forward Yelp notification emails to the business’ forwarding address (as configured) so the parser can extract rating/text/link.
C) Screenshot OCR: Review Import → Screenshot → upload. Confirm extracted author/rating/text/date before finalizing.

5) Configure SLA + Escalation
- Set negative criteria (recommended): rating <= 2 OR sentiment=negative.
- Set escalation recipients: owner@, manager@.
- Test: import a known negative review (or create a sample) and confirm the alert email fires.

6) Daily operating workflow (customer)
- Open Review Queue each morning.
- For each new review:
  - Read the drafted reply.
  - Edit if needed.
  - Approve.
  - Post using guided copy/paste (until API posting is available). Mark as Posted to create the audit trail.
- For negative reviews: respond quickly and use the escalation note in the draft to route internally.

7) Weekly report
- Confirm their timezone and preferred weekday.
- Verify first report delivery (PDF + email summary). If they don’t see it, check spam and then confirm AuditLog shows WeeklyReport sent.

8) Pilot success criteria (what we measure)
- Response SLA: median response time decreases week-over-week.
- Negative review coverage: >90% of negative reviews escalated within SLA.
- Operational load: customer spends <10 minutes/day in the queue.
- Consistency: brand-safe replies (no PII, no incentives, no admissions) and no policy blocks without a clear reason.

9) Customer-facing onboarding email (copy/paste)
Subject: Your review responses are ready to automate (Google/Yelp)

Hi {{Name}},

I set up your Reputation Autopilot workspace so you can draft and respond to Google/Yelp reviews quickly (with a simple approve/edit flow) and get alerted on negative reviews.

Start here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Next steps:
1) Connect Google Business Profile (Integrations → Google → Connect) and select your location(s).
2) If you want Yelp included, either upload a CSV export or forward Yelp notification emails; screenshots also work via the Screenshot Import.
3) Tell me who should receive negative-review alerts (owner/manager emails) and your preferred reply tone/sign-off.

If anything looks off, reply here: agent_bob_replit+review-bot@agentmail.to

—Bob

10) Troubleshooting
- No reviews appearing: confirm location enabled + last sync time in Metrics → Sync Health. If needed, click “Run Sync Now”.
- Too many drafts blocked: check the policy reason in the audit log (often PII or disallowed phrasing) and adjust the template tone/sign-off.
- Yelp parsing misses details: switch to CSV or Screenshot OCR and confirm fields manually.

This runbook is the standard path to get a business live within 30–60 minutes and collecting measurable response-time and sentiment improvements in the first week.