# Customer Compliance & Brand-Safety + Onboarding QA Pack v1

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:40:22.297Z

---

AI Review Reply & Reputation Autopilot — Customer Compliance & Brand-Safety + Onboarding QA Pack v1

Purpose
This pack is used (1) to explain our safety/compliance posture to prospective customers and (2) to onboard each location with the right constraints before enabling any posting. It is designed to align with Google Business Profile (GBP) and Yelp response expectations and to reduce risk from hallucinations, PHI/HIPAA issues, liability admissions, and incentive/policy violations.

A) Customer-Facing Compliance & Brand-Safety Overview (copy-ready)
What we do
We help local businesses respond to Google Business Profile and Yelp reviews quickly and professionally. We draft brand-safe replies, route high-risk reviews for human handling, and provide weekly reputation KPIs.

How we keep replies brand-safe
1) No medical/clinical or outcome guarantees
- We avoid promising results (e.g., “guaranteed,” “cure,” “permanent,” “100%”) and avoid advice that could be interpreted as medical direction.
- For healthcare-adjacent niches, replies remain general and invite offline follow-up.

2) PHI/HIPAA-safe behavior (healthcare contexts)
- We do not confirm a reviewer is a patient or discuss visits, charts, records, diagnoses, treatment details, or appointment specifics.
- If a review contains personal health information, we respond with generic language and move the conversation offline.

3) No admissions of liability
- Replies avoid statements that admit fault or legal responsibility (e.g., “we were negligent,” “we caused damage,” “our mistake” in a legally meaningful way).
- For safety incidents, alleged injury/damage, or legal threats, the system triggers a manual-only hold.

4) Non-inflammatory tone and offline resolution
- Replies remain calm, polite, and non-argumentative.
- For negative reviews, we use a consistent offline CTA (phone/email) and do not escalate publicly.

5) Platform policy alignment (GBP + Yelp)
- No incentives: We do not offer discounts, gifts, refunds-for-reviews, or any quid pro quo for reviews.
- No review gating: We do not encourage only positive reviewers to post.
- No removal promises: We do not claim we can remove reviews or influence Yelp/Google enforcement.
- No competitor disparagement: We do not attack competitors or accuse reviewers of being a competitor.

6) Human-in-the-loop controls and audit trail
- You can choose “draft-only” mode (nothing posts without approval).
- For high-risk reviews (legal/PHI/safety), the system can enforce “blocked_manual_review,” preventing posting until a human clears it.
- We maintain an audit trail: what review came in, what was drafted, what flags were triggered, who approved, and what was posted.

Contact
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

B) Ops Onboarding QA Script (first 48 hours)
Goal: Configure each location so replies match the brand voice, comply with platform rules, and safely route high-risk items before any posting is enabled.

Step 1 — Access & scope confirmation
- Confirm platforms: Google Business Profile, Yelp, or both.
- Confirm locations covered (single vs multi-location).
- Confirm posting mode: (a) Draft-only (recommended default) or (b) Auto-post for low-risk only.

Step 2 — Brand voice intake (required)
Collect:
- Brand name as it should appear in replies.
- Tone: warm/professional, friendly/brief, premium/concierge, etc.
- Words/phrases to avoid (e.g., “cheap,” “guarantee,” “we messed up”).
- Preferred offline CTA channel(s): phone + email + hours.
- Signature format (e.g., “— The [Brand] Team” vs first name role only).

Step 3 — Safety constraints (required)
Confirm defaults:
- Never include staff last names, personal phone numbers, addresses beyond public business address.
- Never mention specific appointment dates/times, procedures, pricing specifics unless provided by the business and verified.
- Healthcare: enable PHI/records/chart/visit hard block; require generic phrasing.
- Legal threats: enable manual-only hold + escalation_level=Legal.

Step 4 — Escalation routing (required)
Collect escalation contacts:
- Owner/GM (name, email, phone)
- Billing disputes contact
- Ops/service recovery contact
- Legal contact (or “Owner acts as legal liaison”)
Define SLA targets:
- Safety incidents: <4h
- Legal threats: same-day
- Billing disputes: <24h
- Service failures: <24h

Step 5 — Template fit check (required)
- Run 6 sample reviews (2 positive, 2 neutral, 2 negative) through the system.
- Verify: non-inflammatory tone, offline CTA on negatives, no incentives, no PHI confirmation, no liability admission.
- If any failure: switch to draft-only; adjust forbidden phrases / tone constraints; re-test.

Step 6 — Approval + posting gate verification
- Confirm audit-log events appear for: draft_created, flagged, approved, blocked (if applicable), posted.
- Confirm blocked_manual_review cannot be posted via UI or API until explicitly cleared.

Step 7 — KPI report verification (required)
- Validate weekly KPIs match raw counts: reviews received, responses approved, responses posted, responses blocked/held, median response time.
- Ensure reconciliation rules are correct: approved != posted when blocked/held.

C) Evidence Capture Template (for Go/No-Go file)
Use this to document compliance verification.

1) Environment
- Platform(s): GBP / Yelp
- Location(s):
- Posting mode:
- Date/time window tested:

2) Audit-log export evidence (attach)
Required fields present:
- review_source, review_id, business_id/location_id
- review_text_hash
- detected_risk_flags + detector_version
- escalation_level + hold_reason (if held)
- draft_version + model/prompt version
- human_approver_id + approval_timestamp
- posted_timestamp + post_status/error_code
- blocked_timestamp + unblocker_id (if applicable)

3) Detector tests (attach screenshots/log lines)
- PHI/records/chart/visit trigger => generic safe response + no PHI confirmation
- Legal threat trigger => post_status=blocked_manual_review + escalation_level=Legal
- Incentive language detection => rewrite without incentives
- Competitor disparagement prevention => neutral wording

4) KPI report evidence (attach)
- Response rate
- Median first-response time
- Escalations count by level/reason
- Approved vs posted vs blocked reconciliation

5) Final decision
- Go / No-Go
- Remaining issues and owner:
- Next retest date:

End of Pack
