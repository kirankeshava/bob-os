# Customer Compliance & Trust Pack v1.0 + Outreach Scripts (Google Business Profile & Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:56:07.642Z

---

# AI Review Reply & Reputation Autopilot — Compliance & Trust Pack v1.0

**Product:** AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)

**Website (for legitimacy):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
**Contact:** agent_bob_replit+review-bot@agentmail.to

## 1) What this does (accurate, policy-safe description)
We help local businesses respond to Google Business Profile and Yelp reviews with:
- **Brand-safe draft replies** tailored to the review’s sentiment.
- **Negative-review escalation** when a review indicates safety issues, legal threats, suspected fake reviews, discrimination/harassment, or sensitive personal information.
- **Weekly reputation KPIs** (response rate/time, rating trend, escalation counts) generated from review + response activity.

**Important:** We do not generate or solicit fake reviews. We do not offer incentives. We do not promise review removal.

## 2) Platform policy alignment (Google Business Profile + Yelp)
### Always
- Respond politely and professionally.
- Invite the reviewer to continue the conversation **offline**.
- Avoid personal data, medical details, or confirming someone was a customer/patient when sensitive.

### Never (hard rules)
- **No incentives**: No discounts, gifts, refunds conditional on removal/editing, or “we’ll give you X for updating your review.”
- **No review gating**: No steering only happy customers to review or discouraging unhappy customers.
- **No removal promises**: Don’t claim “we’ll get this removed” or imply special access to Yelp/Google enforcement.
- **No competitor disparagement**: Don’t accuse competitors or call reviewers liars/scammers publicly.
- **No doxxing/PII**: Don’t share addresses, phone numbers, appointment times, invoices, or staff last names.
- **No PHI/HIPAA confirmation** (medical verticals): Don’t confirm someone is/was a patient or discuss treatment specifics.

## 3) Brand-safety controls (how we prevent unsafe replies)
### Tone constraints
- Calm, non-inflammatory, non-argumentative.
- No sarcasm, threats, or retaliation.
- No admissions of negligence/fault (e.g., “We messed up,” “Our technician broke…”).

### Content constraints (blocked/redirected)
- **PHI/medical record confirmation block:** If a review mentions “chart/records/visit” or similar, the system forces **generic** language and avoids confirming any relationship.
- **Legal threat manual-only hold:** If a review includes “attorney/lawsuit/sue,” the system blocks auto-posting and routes to **Legal escalation**.
- **Incentive language suppression:** Any language resembling discounts, compensation in exchange for edits, or “remove/update your review” is prohibited.

### Offline resolution CTA (required)
Every negative/neutral reply includes an offline CTA such as:
- “Please contact our office at [phone/email] so we can help.”
- “We’d like to look into this—please reach out directly.”

## 4) Escalation rules (what gets held or escalated)
### Auto-escalate (but can still draft a safe reply)
- Billing disputes (non-legal), service dissatisfaction, delays, rude staff claims.

### Manual-only hold (do not post automatically)
- **Legal threats** (“sue,” “attorney,” “lawsuit”).
- **PHI/identity-sensitive medical reviews** where a response could confirm patient status.
- **Safety incidents** (injury, fire, hazardous work allegations) pending internal investigation.
- **Harassment/hate speech** where a response risks amplification.

## 5) Audit trail (approval + posting accountability)
For each review we maintain an audit trail so the business can prove what happened:
- Source (Google/Yelp), review ID, business/location ID
- Review text hash (to avoid storing raw text unnecessarily)
- Detected risk flags + escalation level
- Draft version + model/prompt version
- Human approver (if required), timestamps (drafted/approved/posted)
- Post status: posted / failed / **blocked_manual_review**

## 6) Data handling & retention SOP (plain-language)
- We store the minimum needed to operate: review identifiers, status, timestamps, risk flags, and response text.
- Where possible, we store a **hash** of the review text rather than the full text.
- Access to logs should be role-based (admin/ops/agent) and changes should be recorded.
- Deletion: upon request, we can delete stored response drafts/log metadata associated with a location, except what must be retained for security/audit purposes.

## 7) Approved response templates (short examples per vertical)

### Dentist — Negative (HIPAA-safe)
“Thank you for your feedback. We take concerns seriously, but we can’t discuss details in a public forum. Please contact our office so we can understand what happened and work toward a resolution.”

### Med Spa — Outcome complaint (no guarantees)
“Thank you for sharing this. We’re sorry to hear you’re disappointed. Results and experiences can vary, and we’d like to learn more to see how we can help. Please contact us directly so we can follow up privately.”

### HVAC — Alleged damage (no liability admission)
“Thanks for letting us know. We take this seriously and would like to look into it right away. Please contact us directly with your service details so a manager can review and follow up.”

---

# Outreach Scripts (Policy-Safe)

## A) Cold email to local business owner/manager
**Subject:** We can handle your Google/Yelp review replies safely (with escalation)

Hi [Name],

I’m Bob from **AI Review Reply & Reputation Autopilot**. We help local businesses respond to Google Business Profile and Yelp reviews with **brand-safe, policy-aligned replies**, and we **escalate** risky cases (legal threats, safety issues, PHI-sensitive content) so nothing gets posted automatically when it shouldn’t.

You can see the product overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you reply with your business category (e.g., dental, med spa, HVAC) and your main concerns (slow responses, negative reviews, tone consistency), I can send a sample set of compliant responses and a weekly KPI report example.

Best,
Bob Smith
agent_bob_replit+review-bot@agentmail.to

## B) Short DM script (Yelp/Google-safe wording)
Hi [Name] — I’m Bob. We help businesses reply to Google/Yelp reviews with **professional, brand-safe drafts** and route high-risk reviews (legal/safety/PHI) to **manual review** so nothing unsafe gets posted. If helpful, I can share a quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  — or email me at agent_bob_replit+review-bot@agentmail.to.

## C) Follow-up email (no incentives, no pressure)
**Subject:** Sample compliant replies + escalation rules?

Hi [Name],

If you’d like, I can send:
- Sample replies for your vertical (positive/neutral/negative)
- Our escalation rules (what gets held for manual review)
- Example weekly KPIs (response rate/time, rating trend)

No incentives or review gating—just policy-safe response management.

Best,
Bob
agent_bob_replit+review-bot@agentmail.to

---

# Owner Decision Checklist (to unblock final verification)
1) Do we have a **sandbox/test environment** for Google Business Profile and Yelp posting?
- Yes → provide access details to engineering/QA.
- No → select **one low-risk internal location** for limited live verification.

2) Approve limited live verification scope (if no sandbox):
- Post maximum: **3–5 responses**
- Include at least one **blocked_manual_review** legal-threat test (must NOT post)
- Capture evidence: screenshots + exported audit logs + weekly KPI output

3) Confirm who signs off:
- Engineering owner (posting gates/logging)
- Ops owner (workflow + escalation routing)
- QA owner (runbook pass + KPI reconciliation)
