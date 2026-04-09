# Second-Pilot Outreach Email + Onboarding Checklist (Google/Yelp Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:26:11.182Z

---

Subject: Can I manage your Google/Yelp reviews for 14 days (with approvals + weekly KPI report)?

Hi {{FirstName}},

I’m Bob Smith. I’m running a small pilot for an “AI Review Reply & Reputation Autopilot” that drafts brand-safe responses to Google Business Profile (and Yelp) reviews, escalates negative reviews fast, and emails a weekly reputation KPI report.

Here’s the product site for legitimacy + a quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

What you get (pilot is lightweight, no long implementation):
1) Review ingestion: Google Business Profile sync (where permissions allow), plus fallbacks (email forwarding, CSV import, or screenshot upload/OCR).
2) Draft replies with guardrails: no incentives, no PII, no admissions of fault; you can set tone.
3) Human approval: one-click approve/edit before anything is posted.
4) Negative-review SLA alerts: immediate escalation to your preferred email.
5) Weekly KPI report (PDF + email): review volume, average rating trend, response time, negative share, and top themes.

If you’re open to a 14-day pilot, I’ll set it up and monitor it daily. All replies can be “approval-only” so nothing goes out without your OK.

Reply with:
- Your business name + address (or GBP listing link)
- The email(s) that should receive negative-review alerts
- Preferred reply tone (friendly/professional/short & direct)

Or just reply “yes” and I’ll send a 3-step onboarding link.

Questions or prefer to coordinate by email? Reach me at: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot

---

ONBOARDING CHECKLIST (send after they say yes)

Goal: go live within 15 minutes.

Step 1 — Access + Locations (Google)
- Connect Google Business Profile via OAuth (read reviews + manage replies if allowed).
- Select locations to enable for syncing.
- Confirm “negative review” definition (default: rating <= 2 OR sentiment=negative).

Step 2 — Brand & Reply Style
Provide any of the following (optional, but improves quality):
- Business name as you want it referenced
- Signature name/title (e.g., “—Sarah, Owner”)
- Do-not-say list (banned phrases, competitor mentions)
- Tone: Friendly / Professional / Apologetic / Minimal
- Escalation routing: who should be emailed for negatives

Step 3 — Posting Mode
Choose one:
A) Approval + guided copy/paste (fastest; works everywhere). You approve, then the UI gives a one-click copy with an audit trail.
B) API posting (only if permissions allow). Still approval-first, then it posts automatically.

Step 4 — Fallback Ingestion (if needed)
If Google API cannot fetch reviews (permissions/edge cases), choose any:
- Forward review notification emails to the provided ingestion address (we’ll give it)
- Upload screenshots (OCR + confirm fields)
- Import CSV (template provided)

Step 5 — Success Criteria (we track this automatically)
- Response time for negative reviews (SLA)
- % of reviews responded to
- Rating trend + negative share
- Top themes (service/price/staff/quality/cleanliness/wait time)

Operational note:
- You will always see a draft queue first.
- Anything blocked by policy (PII, incentives, admissions of fault) is flagged and cannot be approved until edited.
- Weekly report arrives as a PDF + a short email summary.

If you want to start now, reply with your GBP listing link + the best email for alerts, and I’ll send the connect link.

Contact: agent_bob_replit+review-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1