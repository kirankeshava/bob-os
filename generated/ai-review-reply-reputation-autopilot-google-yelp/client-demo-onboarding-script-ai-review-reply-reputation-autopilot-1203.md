# Client Demo + Onboarding Script (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** script
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T13:22:16.344Z

---

Below is a ready-to-use demo and onboarding script you can use on a call or in an email to a local business owner/manager. It references the live legitimacy URL and the support email.

---

Subject: We’ll respond to your Google/Yelp reviews (brand-safe) — with approval + weekly KPI report

Hi {{FirstName}},

I’m Bob. We built a lightweight “Review Reply & Reputation Autopilot” that drafts brand-safe responses to Google Business Profile and Yelp reviews, escalates negative reviews fast, and sends a weekly reputation KPI report.

Legitimacy / preview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support contact: agent_bob_replit+review-bot@agentmail.to

What you get (MVP, working now):
1) Review ingestion
   • Google Business Profile: connect once via OAuth, select locations, and reviews sync automatically.
   • Yelp fallback: forward Yelp notification emails, import CSV, or upload a screenshot (OCR + confirm).

2) Auto-tagging and prioritization
   • Each review is tagged (positive/neutral/negative) plus themes like service, staff, price, quality, cleanliness, wait time.

3) Draft replies with guardrails
   • Replies follow brand-safe rules (no incentives, no PII, no admissions of fault, professional tone).
   • If the content is risky (PII, disallowed phrasing), approval is blocked and it’s flagged.

4) Human approval (one click)
   • You (or your team) see a queue: Edit → Approve. Nothing posts without approval.

5) Posting
   • Where API posting is unavailable, we provide a guided copy/paste workflow and keep an audit trail (who posted, when).

6) Negative review SLA alerts
   • If a review is negative (or rating ≤ your threshold), we email the right person immediately so it’s handled within hours.

7) Weekly KPI report (PDF + email)
   • Volume, rating trend, negative share, response time, top themes, and per-location breakdown.

---

Live demo script (10–12 minutes):

Step 1 — Show legitimacy + what they’re buying
• Open the preview URL. Explain: “This is a simple reputation ops tool—ingest reviews, draft safe replies, approve quickly, and track KPIs.”

Step 2 — Connect Google Business Profile (or use a fallback)
• In Integrations → Google: click “Connect”, authorize, then select locations to sync.
• If they don’t want to connect yet: import a CSV or forward a Yelp email; alternatively upload a screenshot.

Step 3 — Show the review queue
• Navigate to Reviews.
• Filter by sentiment=Negative and show that negative items are at the top.
• Open one review: point out sentiment + category tags.

Step 4 — Show draft generation + guardrails
• Open a drafted reply. Emphasize: “We keep replies short, polite, and policy-safe. We don’t offer discounts, we avoid collecting personal info, and we don’t admit fault.”
• If there is blocked content, show the ‘blocked’ reason (PII/banned phrases) and explain this prevents risky posting.

Step 5 — Approve/edit workflow
• Edit one sentence to match their voice.
• Click Approve.
• Show the audit log entry (approved by X at time Y).

Step 6 — Posting + audit trail
• Use guided copy/paste flow and mark as posted.
• Show that the system records posted_manual timestamp and user.

Step 7 — Alerts
• Show escalation settings (who gets emailed for negative reviews).
• Explain SLA: “We alert immediately; you can respond same day.”

Step 8 — Weekly report
• Open the latest weekly report record.
• Explain the KPIs: average rating trend, response time (posted replies only), negative share, top themes.

Step 9 — Metrics dashboard (operational proof)
• Go to Admin → Metrics.
• Show Sync Health (last sync per location + errors), Funnel (ingested→drafted→approved→posted), and Alerts count.
• This is your “ops cockpit” during the first 2 weeks.

---

Onboarding checklist (send after call):
1) Decide who should approve replies (owner, manager, front desk).
2) Connect Google Business Profile (OAuth) and select locations.
3) For Yelp: forward notification emails to the ingestion address we provide, or upload screenshots/CSV.
4) Set escalation recipients and negative thresholds (e.g., rating ≤2 or sentiment=negative).
5) Confirm weekly report recipients + day/timezone.

If you want, reply with:
• Your business name + primary email
• Whether you’re Google-only or Google+Yelp
• Which locations you want covered

And we’ll get you set up.

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
