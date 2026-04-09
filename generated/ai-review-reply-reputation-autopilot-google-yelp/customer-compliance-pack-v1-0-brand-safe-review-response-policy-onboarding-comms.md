# Customer Compliance Pack v1.0 — Brand-Safe Review Response Policy + Onboarding Comms (Google Business Profile & Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T01:15:02.001Z

---

Website (legitimacy link to share): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support email: {{SUPPORT_EMAIL}}

1) Customer-Facing Brand-Safe Review Response Policy (publishable one-pager)

Overview
Our AI Review Reply & Reputation Autopilot helps you respond to Google Business Profile and Yelp reviews quickly and professionally while prioritizing brand safety and platform-policy compliance. Responses are drafted to be courteous, non-inflammatory, and designed to move sensitive issues offline.

What we WILL do
- Draft professional, on-brand responses for positive, neutral, and negative reviews.
- Include a safe “take it offline” call-to-action for service issues (e.g., inviting the reviewer to contact the business directly).
- Escalate higher-risk reviews for manual handling (examples below).
- Maintain an audit trail (draft → flagged/held → approved → posted/blocked) for accountability.
- Provide weekly reputation reporting (response rate, response times, rating trend, escalation volumes).

What we will NOT do (hard rules)
- No incentives or solicitation: We never offer discounts, gifts, refunds, or compensation in exchange for reviews, and we do not request only positive reviews (no “review gating”).
- No removal promises: We do not claim we can remove reviews or influence Yelp/Google enforcement.
- No medical outcome guarantees: For medical/dental/med spa contexts, we never promise outcomes (“guaranteed,” “cure,” “permanent results”), and we avoid medical advice.
- No PHI/HIPAA confirmation: We do not confirm whether someone is/was a patient/client, and we do not reference appointments, treatment details, records, charts, or visit history.
- No admitting liability: We avoid language that admits fault (“we caused,” “our mistake,” “we damaged”)—especially in cases involving injury, property damage, or safety incidents.
- No doxxing or personal data: We do not post phone numbers, addresses, full names, or private staff information in public replies.
- No harassment or retaliation: We do not argue, threaten, shame, or escalate conflict publicly.
- No competitor disparagement: We do not attack competitors or accuse reviewers of being competitors.

When a review is escalated (manual-only hold)
Some reviews are too sensitive to respond to automatically. In these cases, the system will set the response to “manual-only hold” and require human review before any posting can occur. Common triggers:
- Legal threats or litigation language (e.g., “attorney,” “lawsuit,” “sue”).
- PHI/medical record references (e.g., “my chart,” “my records,” “my visit”).
- Allegations of injury, safety hazards, discrimination, or serious misconduct.
- Requests to disclose private details, staff identity information, or private communications.

Platform policy alignment (high-level)
- Google Business Profile: We avoid prohibited content, keep replies respectful, and do not include sensitive personal data.
- Yelp: We avoid arguing about Yelp moderation, do not claim review removal, and do not post promotional incentives in response to reviews.

If you ever want stricter controls
We can configure higher sensitivity (more manual holds) for regulated industries or high-risk brands.

Contact
For help or corrections, email {{SUPPORT_EMAIL}} and include your business name/location and the review link.


2) Onboarding Email (customer communication template)

Subject: Your Review Reply Autopilot — Setup + Safety Controls

Hi {{FirstName}},

Thanks for getting started with AI Review Reply & Reputation Autopilot. Here’s our website for reference and legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

What you can expect:
- We draft brand-safe responses for Google Business Profile and Yelp reviews.
- Negative or high-risk reviews can be automatically escalated for manual approval.
- We maintain an audit trail showing what was drafted, what was approved, and what was posted (or held).
- You’ll receive a weekly reputation report (response rate, response times, rating trend, escalations).

Important safety notes:
- We do not offer incentives for reviews, do not “gate” reviews, and do not promise removals.
- For medical/dental/med spa contexts: we avoid medical outcome claims and never confirm patient status or treatment details.
- Reviews with legal threats or sensitive allegations are placed on a manual-only hold.

Next steps (please reply with answers):
1) Your preferred brand voice: {{Friendly/Neutral/Formal}} and any words/phrases to avoid.
2) Your escalation contacts (Owner/GM, Billing, Operations): names + best internal emails.
3) Your approval preference: (A) all responses require approval, or (B) only negative/high-risk requires approval.

If you have questions, reply here or contact us at {{SUPPORT_EMAIL}}.

Best,
{{YourName}}
AI Review Reply & Reputation Autopilot


3) Implementation Kickoff Script (15-minute call agenda)

Goal: confirm brand voice, escalation routing, approval rules, and reporting expectations.

Agenda
1) Confirm locations + platforms
- Which Google Business Profile locations are in scope?
- Are we responding on Yelp as well?

2) Safety & compliance preferences
- Should we default to “manual approval required” for all replies during the first 7 days?
- Any regulated constraints (HIPAA, high-liability services, legal sensitivity)?

3) Escalation routing
- Who handles billing disputes?
- Who handles service recovery?
- Who handles safety incidents?
- Who handles legal threats?

4) Response style calibration
- Examples of “perfect” responses you’d want.
- Words/phrases to avoid (e.g., “refund,” “guarantee,” “we admit,” “our fault”).

5) Reporting & success criteria
- Target response time SLA.
- Weekly KPI recipients and format.

Close
- Confirm support email: {{SUPPORT_EMAIL}}
- Confirm go-live date and whether we run a sandbox/limited live verification first.


4) QA Runbook Evidence Pack Addendum (what to export as proof)

To complete end-to-end verification (Google + Yelp), attach the following evidence for each test run:
A) Posting gate evidence
- Screenshot or log extract showing a legal-threat review is set to post_status='blocked_manual_review' (or equivalent) and cannot be posted via UI or API.
- Screenshot or log extract showing a PHI-trigger review receives a generic non-confirming draft (no “records/chart/visit” acknowledgement).

B) Audit trail evidence
- Exported log rows for each test case including: review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode, draft_version, model/prompt version, approver_id (if applicable), approval_timestamp, posted_timestamp, post_status/error_code.
- Event list showing at minimum: draft_created, flagged/held (if applicable), approved (if applicable), posted OR blocked.

C) Weekly KPI reconciliation evidence
- The weekly report output (PDF/CSV) for the test window.
- A reconciliation table proving: responses_drafted = responses_posted + responses_blocked + responses_pending_approval.
- Metric spot-checks for: response rate, median first-response time, escalations count by reason, and rating trend (if ratings were part of the test dataset).

D) Safety checklist attestation
- Completed Brand-Safety Checklist for at least 10 mixed reviews across verticals (dentist/med spa/HVAC) showing no prohibited content and offline CTA present when appropriate.

Notes
- If no sandbox exists, run the “limited live test” protocol only on a designated internal/low-risk location and cap posts to 3–5 responses.
- Do not post responses for legal-threat or PHI-trigger scenarios; those must remain blocked/held to prove gates work.
