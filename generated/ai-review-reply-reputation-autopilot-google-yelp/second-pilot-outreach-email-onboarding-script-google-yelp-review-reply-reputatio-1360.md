# Second-Pilot Outreach Email + Onboarding Script (Google/Yelp Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** script
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T15:23:50.352Z

---

Subject: Can I take review replies off your plate this week? (Google/Yelp)

Hi {{FirstName}},

I’m Bob Smith. I’m piloting a lightweight “AI Review Reply & Reputation Autopilot” for local businesses that want faster, brand‑safe responses to Google (and Yelp) reviews—without having to log in daily.

What it does:
- Ingests new reviews from Google Business Profile (API when allowed; otherwise email/CSV/screenshot import)
- Tags sentiment + themes (service/price/staff/etc.)
- Drafts brand‑safe replies for approval (one-click approve/edit)
- Escalates negative reviews immediately (SLA alerts)
- Sends a weekly KPI report (volume, rating trend, response time, negative share, top themes)

If you’re open to a 15-minute setup, I can onboard you and have drafts ready the same day.

How the pilot works (low risk):
1) You connect Google Business Profile (or forward review notification emails).
2) You approve/edit replies in a simple queue.
3) For posting: if API posting isn’t enabled for your account yet, we use guided copy/paste with an audit trail.
4) You get weekly KPI reports by email.

You can see the web app here (live MVP):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

If you want to try it, reply with:
- Your business name
- The best email(s) for alerts/reports
- Whether you’d prefer Google OAuth connect or email-forward ingestion first

Or book time by replying with two windows that work for you this week.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
Contact: agent_bob_replit+review-bot@agentmail.to

---

Follow-up (2 days later)

Subject: Quick follow-up — faster review responses (no extra work)

Hi {{FirstName}},

Circling back—most businesses we talk to know reviews matter, but responding consistently is the hard part.

If you want, I can set you up in ~15 minutes and you’ll start seeing:
- Draft replies queued for approval
- Instant alerts for negative reviews
- A weekly KPI report you can forward to your team

Same link (MVP):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Reply “yes” and I’ll send the onboarding steps.

—Bob
agent_bob_replit+review-bot@agentmail.to

---

Onboarding script (call / Loom walkthrough)

1) Confirm goals + guardrails (2 minutes)
- Ask: preferred tone (friendly/professional), any phrases to avoid, and escalation contacts.
- Confirm SLA: e.g., negative reviews alerted within 5 minutes.

2) Connect ingestion (5 minutes)
Option A: Google Business Profile connect
- Have them log into the web app and go to Integrations → Google → Connect.
- Grant requested scopes.
- Select locations to enable syncing.

Option B: Email-forward ingestion
- Ask them to forward Google/Yelp notification emails to agent_bob_replit+review-bot@agentmail.to (or the business-specific inbound address shown in the app).

Option C: Imports
- Provide CSV template or screenshot import page.

3) Approval workflow (5 minutes)
- Show Reviews Queue filters (negative first).
- Demonstrate approve/edit.
- Explain posting method: API when available; otherwise guided copy/paste with “Posted” confirmation + audit trail.

4) Alerts + weekly report (3 minutes)
- Set recipients.
- Confirm weekly report day/time + timezone.
- Confirm what counts as “negative” (sentiment or rating threshold).

5) Define success criteria (1 minute)
- Targets: response time < 24h, 100% response coverage, reduced negative share, consistent tone.

Close
- “I’ll monitor the first week, and we’ll review the KPI report together after 7 days.”
