# Customer Compliance & Escalation Communications Pack v1.0 (Google Business Profile + Yelp) — Safety Overview + Escalation Emails

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T05:28:27.553Z

---

Customer Compliance & Escalation Communications Pack v1.0
Product: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Website (for verification): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

1) Customer-Facing Compliance & Brand-Safety Overview (One-Pager)

What this tool does
- Drafts brand-safe responses to Google Business Profile and Yelp reviews.
- Flags risky reviews (e.g., legal threats, safety incidents, medical/PHI content) for escalation.
- Supports an approval workflow and keeps an audit trail of drafts, approvals, blocks, and posting outcomes.
- Produces weekly reputation KPIs (response rate/time, rating trend, escalations, and resolution status).

What we will not do (hard safety boundaries)
- No fake reviews, no review gating, no soliciting incentives (discounts, gift cards) for reviews.
- No “we can get this removed” promises or instructions to manipulate Yelp/Google moderation.
- No competitor attacks or disparaging language.
- No disclosure of private data (names, phone numbers, appointment times, invoices) unless the business explicitly provides it and it’s safe—and even then, we default to generic wording.

HIPAA/PHI & sensitive information handling (especially for dentists/med spas)
- We avoid confirming a person is a patient/customer when the review contains medical details.
- We do not reference “chart/records/your visit/your treatment” or anything that could be construed as verifying PHI.
- We route suspected PHI scenarios to manual review with a “take this offline” response that does not confirm any relationship.

Liability and legal safety
- We avoid admitting fault (“we caused,” “our mistake,” “we damaged”) and avoid definitive conclusions about incidents.
- Reviews containing legal threats (e.g., “attorney,” “lawsuit,” “sue”) are automatically placed into a manual-only hold. These are escalated with a Legal flag and must not be posted automatically.

Medical and outcome claims (dentist / med spa)
- No promises/guarantees of results (“permanent,” “100%,” “guaranteed,” “no risk”).
- No medical advice in public replies. We use neutral language and direct to offline support.

Platform policy alignment (Google + Yelp)
- We do not request, offer, or imply incentives for reviews.
- We do not encourage only positive reviews or discourage negative reviews.
- We do not claim special relationships with Yelp/Google or promise removal.
- We keep replies respectful, non-inflammatory, and focused on resolution.

Approval + audit trail (trust & accountability)
- You can require approval before posting.
- Every action is logged: review source (Google/Yelp), review ID, detected risk flags, escalation level, draft version, approver, timestamps, post status, and the final response.

2) Escalation Notification Email Templates (Owner/GM + Optional Legal/Ops)

Template A — Escalation: Strong Negative (Service Failure / Billing / Staff Conduct)
Subject: Action needed: Review escalation flagged (Reply held for approval)

Hi [Owner/Manager Name],

A new review was flagged by the Reputation Autopilot as needing attention before any response is posted.

Source: [Google/Yelp]
Rating: [1–3 stars]
Flag reason(s): [billing dispute / service quality / staff conduct / safety concern]
Recommended action: Approve an edited response OR provide details for a tailored resolution note.

Draft response is prepared but is currently set to: HOLD (approval required).

Suggested next steps (15 minutes):
1) Confirm whether we should offer a direct contact path (phone/email) for resolution.
2) Share any safe, non-private context (avoid patient/medical details; avoid personal data).
3) Approve the response or request revision.

You can review product details here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Thanks,
[Your Name]
[Your Email]

Template B — Escalation: Potential PHI / HIPAA-Sensitive Content (Healthcare Verticals)
Subject: Manual review required: Potential PHI in public review (No auto-post)

Hi [Owner/Manager Name],

We detected potentially sensitive medical/patient-related content in a public review. To protect privacy and stay compliant, the system has blocked auto-posting.

Source: [Google/Yelp]
Flag reason(s): Potential PHI / patient identification risk
Status: BLOCKED — manual review only

Recommended response approach (public):
- Do not confirm they are a patient.
- Do not reference records/visits/treatment.
- Use a neutral, generic invitation to contact your office directly.

If you’d like, reply with the preferred offline contact info to include (front desk phone or a generic support email). Avoid sharing any patient-specific details over email.

Product overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Thanks,
[Your Name]
[Your Email]

Template C — Escalation: Legal Threat Detected (Auto ‘Manual-Only Hold’)
Subject: Legal threat detected in review — posting blocked, escalation to Legal

Hi [Owner/Manager Name],

A review contains legal-threat language (e.g., attorney/lawsuit/sue). Our policy is to block any automated response and require manual handling.

Source: [Google/Yelp]
Status: BLOCKED — manual-only hold
Escalation level: LEGAL

Do not post publicly until reviewed by designated leadership/legal counsel.

Recommended immediate steps:
1) Assign internal owner: [Legal Contact / Owner].
2) Gather documentation (work order/receipt/photos/communication logs) without including personal sensitive data in public replies.
3) Decide if the public response should be: no response OR a short neutral offline contact request (no admissions).

Product overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Thanks,
[Your Name]
[Your Email]

3) Internal Handoff Notes (copy/paste into ticketing or Slack)

Handoff Note — Ops (Service Recovery)
- Review source: [Google/Yelp]; Review ID: [id]
- Risk flags: [service failure/billing/staff conduct]
- What to collect: appointment/work order date range (internal), staff roster on shift, invoice/estimate, any before/after photos (HVAC), call logs.
- Public reply constraints: no admissions; no personal data; invite offline contact; keep calm tone.
- SLA: Ops response within 24h; provide safe summary for public response within 1 business day.

Handoff Note — Legal (Threat/Defamation)
- Review source: [Google/Yelp]; Review ID: [id]
- Trigger phrase(s): [attorney/lawsuit/sue/etc.]
- Status: BLOCKED manual-only hold (must not post automatically)
- What to collect: contract/estimate, communications log, timeline, any safety incident notes.
- Guidance needed: whether to respond publicly at all; if yes, legal-approved neutral language only.
- SLA: same-day review.

End of Pack (v1.0)
Change log:
- v1.0: Added customer one-pager + escalation email templates aligned to manual-only holds, PHI constraints, and Google/Yelp policy-safe wording.
