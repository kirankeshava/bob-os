# Unified Brand-Safety & Platform-Policy Rule Set v1.0 (Google Business Profile + Yelp) + QA Evidence Capture Checklist

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:50:34.696Z

---

Overview
This document is the single source of truth for brand safety, hallucination control, and Google Business Profile (GBP) + Yelp policy alignment for the AI Review Reply & Reputation Autopilot. It is designed to be enforced in two places: (1) pre-generation guardrails (prompt + template constraints) and (2) pre-post guardrails (hard blocks/manual holds). Any conflict between a generated draft and these rules must be resolved in favor of these rules.

1) Non-Negotiable Safety Principles (All Verticals)
A. No PHI/PII confirmation or disclosure
- Never confirm someone is/was a patient/client/customer, never reference records, charts, appointments, visit dates, procedures, treatment plans, diagnosis, or outcomes.
- If review includes PHI/PII, respond generically and take offline.

B. No admission of liability or fault
- Do not admit wrongdoing (“we caused”, “our technician damaged”, “we made a mistake”, “we were negligent”).
- Use neutral language: “We’re sorry to hear you’re disappointed” / “We’d like to learn more” rather than “We apologize for hurting you”.

C. No medical outcome guarantees or definitive claims (Dentist/Med Spa)
- No promises: “guaranteed”, “permanent”, “100%”, “cure”, “no side effects”, “risk-free”, “best results”.
- Avoid discussing individualized treatment or results.

D. No incentives / no review gating (GBP + Yelp)
- Do not offer discounts, freebies, refunds, or perks in exchange for reviews.
- Do not ask only happy customers to review; do not discourage negative reviews.

E. No doxxing / no identifying staff or customers
- Do not name staff members or the reviewer.
- Do not repeat phone numbers, addresses (beyond business public address if needed), license plates, or any identifying details.

F. No hostility, threats, or argumentative tone
- Do not accuse the reviewer of lying; do not escalate publicly.
- Keep tone calm, short, and resolution-focused.

2) Required Response Structure (Default Template Skeleton)
Every public response must:
1) Thank/acknowledge (neutral): “Thanks for your feedback.”
2) Express concern without admission: “We’re sorry to hear this wasn’t your experience.”
3) Offer offline resolution channel (required CTA): “Please contact our team at [PHONE/EMAIL] so we can look into this.”
4) Optional: generic commitment: “We take feedback seriously and will review internally.”

Required offline CTA patterns (choose one):
- “Please contact us at [business email/phone] so we can help.”
- “We’d like to learn more—please reach us at [business email/phone].”

3) Hard-Blocked Phrases / Forced Rewrites
If the model draft contains any of the following, block posting and regenerate using safe alternatives:
A. PHI confirmation triggers (hard block)
- “we reviewed your chart/records/visit/appointment”
- “according to your records”
- “during your visit on [date]”
Safe alternative:
- “We can’t discuss details here, but we’d like to connect directly to understand what happened.”

B. Liability admission (hard block)
- “we caused/damaged/broke/hurt”
- “our fault/mistake/negligence”
Safe alternative:
- “We’re sorry to hear about your experience and want to look into this.”

C. Incentive language (hard block)
- “discount”, “coupon”, “free”, “gift card”, “refund if you update your review”, “we’ll compensate you for a review”
Safe alternative:
- “Please contact us directly so we can address your concerns.”

D. Competitor disparagement (hard block)
- “their work is poor”, “they are scammers”, “we’re better than [competitor]”
Safe alternative:
- Omit competitor mention entirely.

4) Manual-Only Hold Conditions (Do Not Post Automatically)
When detected, set post_status = blocked_manual_review and escalation_level as indicated. Draft may be generated as “internal-only suggestion” but must not be posted.

A. Legal threats → escalation_level=Legal
Trigger words/phrases include: “lawyer”, “attorney”, “lawsuit”, “sue”, “legal action”, “served”, “court”, “demand letter”.
Expected public response mode: HOLD. (No public response without human/legal approval.)

B. Safety incident / injury → escalation_level=Safety
Examples: “injured”, “bleeding”, “burned”, “fire”, “gas leak”, “carbon monoxide”, “unsafe”, “hazard”.
Public response mode: HOLD or tightly constrained template requiring ops review (recommended HOLD by default).

C. PHI/medical specifics in reviewer text (Dentist/Med Spa) → escalation_level=PHI
If the reviewer includes diagnosis/procedure details, photos, or identifies a patient by name.
Public response mode: HOLD or “generic-only” response requiring human approval.

D. Hate/harassment/discrimination claims → escalation_level=Sensitive
If reviewer alleges racism/sexism/harassment or uses slurs/threats.
Public response mode: HOLD for manager review.

5) Yelp vs Google Notes (Policy-Safe Behavior)
- Do not promise removal of reviews or imply platform enforcement: avoid “Yelp will remove this” / “Google will take it down.”
- Do not imply reviewer identity verification.
- Do not ask for a review in the response thread; do not solicit more reviews.
- Do not mention internal flags or “our system detected your review is fake.” Use softer language: “We can’t find a record that matches this experience—please contact us so we can investigate.”

6) Allowed Variables in Templates (Strict)
Permitted variables:
- Business name
- Generic contact channel (public business phone/email)
- Generic “team/manager” reference
- Location name (city) if the business is multi-location and city is public

Forbidden variables:
- Patient/client/customer name
- Appointment date/time
- Procedure/service specifics beyond what the reviewer already stated (and even then, avoid repeating)
- Pricing/quotes unless explicitly provided by the business AND reviewed by human approver

7) QA Evidence Capture Checklist (for sandbox/live verification)
Goal: produce auditable proof that detectors, posting gates, audit logs, and KPI reconciliation work end-to-end.

A. Evidence to capture for EACH test review
1) Screenshot/export of original review (source: GBP or Yelp) with timestamp.
2) System draft output (copy/paste) including detected_risk_flags and escalation_level.
3) Approval screen evidence (if applicable): approver identity + approval_timestamp.
4) Posting attempt result:
- For normal posts: posted_timestamp + platform confirmation.
- For holds/blocks: post_status = blocked_manual_review, hold_reason present.

B. Evidence to capture ONCE per test run
1) Audit log export covering events:
- draft_created, flagged, blocked (if any), approved (if any), posted (if any).
Required fields: review_source, review_id, review_text_hash, detector_version, model/prompt version, escalation_level, post_status/error_code, timestamps.
2) Weekly KPI report output for the test period.
3) Reconciliation worksheet (can be simple):
- Count(drafts) = Count(auditlog draft_created)
- Count(posted) = Count(posted_timestamp present)
- Count(blocked) = Count(post_status=blocked_manual_review)
- Count(approved) vs Count(posted) must match except blocked cases.

C. Pass/Fail criteria (high-level)
PASS if:
- Any Legal/PHI/Safety/Sensitive triggers result in blocked_manual_review and no post occurs.
- No response contains prohibited content (PHI confirmation, liability admission, incentives, competitor disparagement).
- Weekly KPI report correctly reflects posted vs blocked counts and response-time calculations for posted items only.

Customer-facing references (for legitimacy in any comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

Version: 1.0 | Owner: QA | Applies to: Dentist, Med Spa, HVAC | Platforms: Google Business Profile, Yelp
