# Customer Trust & Compliance Pack v1 (Website One-Pager + Onboarding Email/Checklist) — AI Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T05:36:22.884Z

---

## Website One-Pager: Trust, Safety & Platform Compliance

**AI Review Reply & Reputation Autopilot** helps local businesses respond to Google Business Profile and Yelp reviews quickly and professionally—without risking brand-safety issues or platform policy violations.

### What we do (and what we don’t)
We **draft** brand-safe review responses and help you manage reputation operations (escalations + weekly reporting). Depending on your configuration, responses are either **human-approved before posting** or **auto-posted only for low-risk reviews**.

We will **never**:
- Offer or suggest incentives for reviews (discounts, refunds, freebies) or any “review gating.”
- Generate or request fake reviews.
- Promise review removal, threaten a reviewer, or imply special access to Google/Yelp enforcement.
- Disparage competitors or argue publicly.
- Confirm sensitive personal details (including appointment/visit confirmation) or disclose private information.

### Brand-safety controls (hallucination + risk reduction)
Our system is designed to keep responses neutral, professional, and policy-safe:
- **Tone constraints:** calm, appreciative, non-inflammatory language.
- **No admission of liability:** we avoid “we caused this,” “our fault,” or similar language in negative scenarios.
- **Required offline resolution CTA:** negative or complex situations are redirected to a private channel (call/email) to resolve.
- **Blocked phrases & content filters:** medical outcome guarantees, incentives, doxxing/personal data, threats/retaliation, and PHI/record references are blocked.
- **Manual-only holds:** certain risk signals (e.g., legal threats) force a **manual review** and prevent posting.

### Medical / privacy-sensitive businesses (dentist, med spa)
We keep responses **generic** and privacy-safe. If a review mentions health information, we do not confirm the person is a patient/client and we do not reference records, charts, or visit details. We can escalate these reviews for manual handling.

### Escalation for negative reviews
When a review is negative or high-risk, the system flags it and can route it for fast internal attention:
- Billing disputes → Billing/Office Manager
- Service quality complaints → Ops/GM
- Safety incidents → Owner/GM (priority)
- Legal threats (“lawsuit,” “attorney,” “sue”) → **Legal hold / manual-only**

### Audit trail & accountability
Every draft and action can be recorded for traceability:
- Review source (Google/Yelp), review ID, timestamps
- Draft version + model/prompt version
- Risk flags + escalation level
- Who approved (if applicable)
- Posted/blocked status and reason

### Weekly reputation KPIs
You receive a weekly summary of reputation performance (varies by plan/config):
- Response rate and response time
- Rating trend (7/30-day)
- Sentiment buckets
- Escalations and unresolved aging
- Approved vs posted vs blocked reconciliation

**Learn more:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Support:** [INSERT SUPPORT EMAIL]

---

## Onboarding Email Template (Customer Communication)
**Subject:** Quick setup for your Review Reply Autopilot (Google/Yelp)

Hi {{FirstName}},

Thanks for choosing AI Review Reply & Reputation Autopilot. To start responding to Google Business Profile and Yelp reviews safely and consistently, please reply with the items below.

1) **Business details**
- Business name + location(s):
- Primary phone number for offline resolution CTA:
- Preferred support email for customers to contact you: (we can use this in replies)

2) **Brand voice** (pick one)
- Warm & friendly
- Professional & clinical
- Premium & concierge
- Straightforward & practical

3) **Do-not-use words/phrases** (optional)
List any sensitive topics, promises, or phrases you never want used in public.

4) **Escalation contacts**
- Billing disputes → name + email/phone:
- Service issues → name + email/phone:
- Safety incidents → name + email/phone:
- Legal threats → name + email/phone:

5) **Posting mode preference**
- (A) Human approval required for every response
- (B) Auto-post for low-risk reviews only; anything negative/high-risk is held for approval

Important: We do not offer incentives for reviews, do not promise review removal, and do not confirm private customer/patient details in public replies.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: [INSERT SUPPORT EMAIL]

Best,
{{YourName}}
AI Review Reply & Reputation Autopilot

---

## Customer Setup Checklist (Internal / Ops)
- [ ] Confirm customer’s preferred offline CTA channel (phone/email) and store it as an allowed variable
- [ ] Confirm posting mode (Approval-only vs Low-risk auto-post)
- [ ] Confirm escalation routing contacts and SLA expectations
- [ ] Enable hard blocks: PHI/record-reference block, incentive language block, legal-threat manual-only hold
- [ ] Ensure templates used match vertical (Dentist / Med Spa / HVAC) and platform notes (Google vs Yelp)
- [ ] Verify audit log fields emitted: review_id/source, text hash, flags, draft_version, approval/posted/blocked events, timestamps
- [ ] Verify weekly KPI report reconciliation (approved vs posted vs blocked) before first customer report

---

## Short “Offline CTA” Snippets (Policy-safe)
Use one of these in negative or complex situations:
- “We’d like to learn more and help. Please contact us at {{phone}} / {{email}} so we can look into this privately.”
- “Thank you for sharing this. Please reach out to {{email}} so our team can follow up directly.”
- “We’re sorry to hear this. Please contact {{phone}} so we can address your concerns offline.”

(Do not add discounts, refunds, or incentives in public replies.)
