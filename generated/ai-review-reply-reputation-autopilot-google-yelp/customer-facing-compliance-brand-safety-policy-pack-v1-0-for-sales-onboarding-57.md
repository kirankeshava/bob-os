# Customer-Facing Compliance & Brand-Safety Policy Pack v1.0 (for Sales + Onboarding)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T01:35:35.574Z

---

AI Review Reply & Reputation Autopilot — Compliance & Brand-Safety Policy Pack v1.0
Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email: support@yourdomain.com

1) What this product does (and does not do)
We help local businesses respond to Google Business Profile and Yelp reviews with brand-safe draft replies, negative-review escalation, and weekly reputation KPI reporting. We do not write or post fake reviews, do not offer incentives for reviews, and do not attempt to manipulate platform enforcement (e.g., removal promises). We do not provide legal advice or medical advice.

2) Platform policy alignment (Google Business Profile + Yelp)
Our response guidance is designed to align with core platform expectations:
- No incentives: We never ask customers to offer discounts, gifts, or other compensation in exchange for reviews.
- No review gating: We do not suggest filtering who is asked to review based on sentiment.
- No removal promises: We do not claim we can remove reviews or influence platform moderation.
- No competitor disparagement: We avoid comparing or attacking competitors.
- Professional conduct: Responses remain calm, non-argumentative, and focused on resolution.

3) Brand safety rules (applies to all verticals)
All public replies must:
- Avoid admitting liability (no “we caused/damaged/are at fault” language).
- Avoid inflammatory or retaliatory language (no threats, accusations, or shaming).
- Avoid personal data or doxxing (no phone numbers of staff, addresses of individuals, appointment details, invoice numbers, etc.).
- Move resolution offline with a neutral CTA (e.g., “Please contact our office so we can help.”).
- Stay factual and minimal; do not invent details not present in the review.

4) Medical/HIPAA-style constraints (Dentist / Med Spa and any healthcare-adjacent business)
To reduce privacy and compliance risk, public responses must:
- Never confirm someone is/was a patient/client.
- Never reference charts/records/visits/appointments, procedures, diagnoses, treatment outcomes, or any protected health information.
- Never make outcome guarantees (e.g., “permanent results,” “no pain,” “100% success”).
- Use generic language: “We take feedback seriously” rather than any case-specific claim.

5) Escalation & “manual-only hold” policy
Certain reviews are automatically flagged for internal escalation and may be placed into manual-only hold (meaning: no autopost).
Common triggers:
- Legal threats: “attorney,” “lawsuit,” “sue,” “legal action” → manual-only hold + Legal escalation.
- PHI/medical details: anything that could confirm patient status or treatment specifics → manual-only hold + Privacy escalation.
- Safety incidents or injury allegations → escalation to Owner/GM; may require investigation before responding.
- Harassment/discrimination allegations → escalation to Owner/HR.
When a review is on hold, we can still generate an internal draft, but it will not be posted unless a human approver explicitly approves it after review.

6) Approval & posting modes (configurable per customer)
Mode A — Draft-only: We generate drafts; your team posts.
Mode B — Approval required: We generate drafts; a designated approver must approve before posting.
Mode C — Autopost (low-risk only): Only for reviews that do NOT trigger safety flags. Any flagged review is automatically placed into manual-only hold.

7) Audit trail & accountability (what we log)
For transparency and compliance, we maintain an audit trail including:
- Review source (Google/Yelp), review ID, business/location ID
- Risk flags detected and escalation level/reason
- Draft version + model/prompt version (traceability)
- Human approver ID (if applicable), approval time, posted time
- Post status (posted / blocked_manual_review / error) and error codes
This supports internal QA, customer visibility, and weekly KPI reconciliation.

8) Weekly reputation KPI report (what’s measured)
Typical weekly report includes:
- Response rate (% of reviews responded to)
- Response time (avg/median first-response time)
- Rating trend (7/30-day)
- Sentiment buckets (positive/neutral/negative)
- Escalations (counts by reason; unresolved aging)
- Approved vs posted vs blocked reconciliation

9) Customer onboarding intake checklist (copy/paste)
Business details:
- Business name + location(s):
- Platforms used: Google / Yelp (select)
- Primary contacts (Owner/GM, Ops, Billing, Legal/HR):
Brand voice:
- Tone: Friendly / Professional / Luxury / Clinical / Other:
- Phrases you like to use:
- Phrases you never want used (blocked):
Approval + escalation:
- Posting mode (A/B/C):
- Escalation thresholds (e.g., 1–2 star always escalate):
- SLA for escalations (hours):
Compliance constraints:
- Healthcare-adjacent? (Y/N)
- Do not mention staff names? (Y/N)
- Do not mention prices publicly? (Y/N)
Reporting:
- Weekly report recipient emails:
- KPI preferences (response-time SLA, sentiment rules):

10) Email templates for outreach and onboarding (ready to send)

Template 1 — Intro (pilot)
Subject: Safer, faster replies to Google/Yelp reviews — with escalation & audit trail
Hi {Name},
We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses to Google Business Profile and Yelp reviews, escalates negative/high-risk reviews, and sends weekly reputation KPIs.

It’s designed for policy alignment and brand safety: no incentives, no removal promises, no PHI/patient confirmation language, and legal-threat reviews are automatically put on manual-only hold.

You can see the product site here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
If you’re open to a short pilot, reply with your business name + location(s) and which platform matters most (Google or Yelp). We can start in draft-only mode so your team stays in control.

Thanks,
{Your Name}
support@yourdomain.com

Template 2 — Compliance/Safety follow-up
Subject: Our safety controls for public review replies (Google/Yelp)
Hi {Name},
Sharing our safety approach before you decide on a pilot:
- Draft-only, approval-required, or low-risk autopost modes
- Automatic escalation for 1–2 star reviews, safety incidents, and suspected fake reviews
- Manual-only hold for legal threats and any PHI/medical-detail risk
- Audit trail (what was drafted, approved, posted, blocked)

If you tell me your industry (dentist, med spa, HVAC, etc.) and preferred tone, I’ll send a sample set of approved templates.

Best,
{Your Name}
support@yourdomain.com

Template 3 — Pilot kickoff (intake)
Subject: Pilot kickoff — brand voice + escalation contacts
Hi {Name},
To start your pilot, please reply with:
1) Locations to include:
2) Preferred posting mode (draft-only / approval-required / autopost low-risk only):
3) Who should receive escalations (Owner/GM, Ops, Billing, Legal/HR) + emails:
4) Any phrases you never want in public replies (blocked list):
5) Any public-response constraints (no prices, no staff names, etc.):

Once set, we’ll begin generating drafts and a weekly KPI report. You’ll always have an audit trail of what was drafted, approved, posted, or blocked.

Thanks,
{Your Name}
support@yourdomain.com

Operational note: Replace support@yourdomain.com with your real business email before sending.
