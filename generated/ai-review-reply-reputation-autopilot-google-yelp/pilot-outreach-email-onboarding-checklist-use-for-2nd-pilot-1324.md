# Pilot Outreach Email + Onboarding Checklist (Use for 2nd Pilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T14:18:27.378Z

---

Subject: 7‑day pilot: we’ll respond to your Google/Yelp reviews faster (with approval)

Hi {{FirstName}},

I’m Bob. We built a lightweight “AI Review Reply & Reputation Autopilot” that drafts brand-safe responses to your Google Business Profile (and Yelp) reviews, escalates negatives fast, and sends a weekly KPI report.

Website (for legitimacy + overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’re open to a 7‑day pilot, here’s what we do:
- Ingest new reviews (Google API where available; otherwise email/CSV/screenshot)
- Tag sentiment + themes (service/price/staff/etc.)
- Draft a response using guardrails (no incentives, no PII, no admissions of fault)
- You approve/edit in one click
- You post (copy/paste with audit trail) or we post via API when allowed
- Negative reviews trigger immediate escalation alerts
- Weekly report: volume, rating trend, response times, negative share, top themes

What we need from you (15 minutes total):
1) Confirm which locations you want monitored.
2) Connect Google Business Profile (OAuth) OR forward review notification emails.
3) Provide your preferred “brand voice” in 3 bullets (friendly/professional/apologetic/etc.).
4) Add the escalation recipients for negative reviews (owner/manager emails).

Pilot success criteria (what we measure):
- Response-time improvement (hours to first approved reply)
- Coverage: % of reviews with a drafted reply and % posted
- Negative-review SLA compliance (alerts sent within X minutes)
- Sentiment/theme accuracy (quick thumbs up/down)

If you want to try it, reply with:
- Your business name
- # of locations
- Best email(s) for escalation

Or book a time and I’ll set it up live.

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to

---

ONBOARDING CHECKLIST (Internal)

A) Pre-flight
- [ ] Confirm pilot business meets ICP: local service business, 20+ reviews/mo or meaningful lead flow from ratings
- [ ] Confirm they have access to Google Business Profile manager account
- [ ] Identify 1–3 locations to start (avoid overwhelming)

B) Technical setup (15–30 min)
1) Create Business + Location records
- [ ] Admin → Businesses: create business, set timezone, weekly report day/time
- [ ] Admin → Locations: create/import locations, set negative threshold (rating<=2 OR sentiment=negative)

2) Connect ingestion path
Option 1: Google Business Profile API
- [ ] Integrations → Google: start OAuth
- [ ] Select locations to sync; enable toggles
- [ ] Trigger “Sync now” (or run cron) and verify reviews appear
- [ ] Verify watermark works: run sync twice; confirm no duplicates; confirm updateTime changes update existing reviews

Option 2: Fallbacks
- [ ] Email forwarding: confirm inbound parser extracts rating/text/link
- [ ] CSV import: import template validated; verify mapping
- [ ] Screenshot OCR: upload 1–2 screenshots; confirm parse and human confirm step

C) Brand voice + policy
- [ ] Collect brand voice bullets + do-not-say list
- [ ] Ensure guardrails are enabled: PII redaction, banned phrases, max length
- [ ] Create 2–3 response templates per sentiment (positive/neutral/negative)

D) Workflow validation (same day)
- [ ] Confirm tagging runs and DraftReply created for each new review
- [ ] Approve/edit 3 drafts; ensure policy gate blocks if needed
- [ ] Post manually and record audit trail (posted_manual)
- [ ] Force negative review scenario (or use existing) → verify escalation email + AlertEvent stored

E) Monitoring (48 hours)
- [ ] Dashboard: /app/admin/metrics validates funnel counts and response-time stats
- [ ] Sync health: lastSyncAt updates for each location; failures create AlertEvents
- [ ] Weekly report cron: generate + email report; compare to dashboard for same date window

F) Debrief (end of week)
- [ ] Ask 3 questions: time saved, voice quality, any risky replies
- [ ] Capture testimonial if positive
- [ ] Convert to paid plan (define next steps: posting automation, multi-user approvals, additional locations)

NOTES FOR PILOT COMMUNICATION
- Always share the website URL above when asked “who are you?”
- Use agent_bob_replit+review-bot@agentmail.to for all pilot communication so threads remain searchable
- If Google API posting is not available for their account, position manual posting as a compliance-safe interim step with full audit trail.
