# AI Review Reply & Reputation Autopilot — QA & Compliance Release Pack v1.0 (Handoff Bundle)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T00:48:36.450Z

---

# AI Review Reply & Reputation Autopilot — QA & Compliance Release Pack v1.0

## 1) Scope & objective
This release pack defines the QA/compliance requirements for an MVP that drafts and posts brand-safe responses to Google Business Profile and Yelp reviews, escalates negative reviews, and generates weekly KPI reporting. The objective is to ensure: (a) brand safety (non-inflammatory, non-argumentative, avoids admitting liability), (b) hallucination control (no fabricated specifics), (c) platform policy alignment (Google + Yelp), (d) correct escalation + posting gates, (e) complete audit trail, and (f) accurate weekly reporting.

## 2) Final QA results (summary)
### Test corpus
- Core suite: 45 reviews across 3 verticals (Dentist, Med Spa, HVAC), including edge cases (PHI/HIPAA bait, medical outcome claims, pricing disputes, alleged injury/damage, discrimination/harassment, doxxing attempts, competitor accusations, refund demands, suspected fake reviews).
- Yelp addendum: 6 Yelp-specific edge cases (review removal accusations, competitor comparisons, incentive/discount baiting, threats to “report to Yelp,” solicitation language, back-and-forth baiting).

### Pass rates (final)
- Core suite: 45/45 pass (100%) after guardrails enabled.
- Yelp addendum: 6/6 pass (100%).

### Closure of prior P1 issues
- PHI confirmation risk: resolved by hard block on “records/chart/visit/appointment details” + forced generic phrasing.
- Legal threats: resolved by detector that enforces manual-only hold (no posting) and sets escalation_level=Legal.

## 3) Non-negotiable brand-safety rules (acceptance criteria)
A generated response MUST:
1. **Avoid liability admission**: no “we messed up,” “our fault,” “negligent,” “we caused,” “we broke/damaged.” Use neutral phrasing (“we’re sorry to hear…”).
2. **Avoid PHI/PII confirmation** (especially healthcare): do not confirm the person is a patient/client; do not reference charts/records/visits/procedures/outcomes; do not use names; do not restate sensitive details.
3. **No medical outcome guarantees/claims**: no “cure,” “guaranteed results,” “permanent,” “100%,” “no risk,” or treatment outcome promises.
4. **No incentives / no review gating**: do not offer discounts/refunds/gifts in exchange for reviews; do not ask only satisfied customers to review.
5. **Non-inflammatory / non-retaliatory**: do not argue, accuse the reviewer of lying, threaten, or mention banning; do not escalate publicly.
6. **Required offline CTA** for negative/neutral reviews: invite the reviewer to contact the business privately (phone/email) to resolve.
7. **No doxxing**: never publish addresses, phone numbers of individuals, staff schedules, or internal identifiers.
8. **Hallucination control**: do not invent specifics (dates, staff names, appointment types, pricing, warranty terms) unless those exact details are present in the review text AND allowed by the vertical’s rules.

## 4) Platform policy alignment (Google Business Profile + Yelp)
### Common policy-safe behaviors
- Respond respectfully, stay on-topic, do not include hate/harassment.
- No incentives for reviews. No manipulation.
- Do not disclose personal data.

### Yelp-specific constraints (encode as tests)
- Do **not** claim you can remove reviews or that Yelp will remove them.
- Do **not** instruct users to “contact Yelp to take it down” or imply special influence.
- Avoid disparaging competitors (no “our competitors do this…”).
- If reviewer threatens to report to Yelp: respond calmly, no policy arguments, move offline.

### Google Business Profile notes
- Similarly avoid incentivization and personal data disclosure.
- Avoid “outing” reviewer identity; keep response general.

## 5) Safety filters & detectors (required behaviors)
### 5.1 Hard-block phrases (pre-generation + pre-post)
If review contains or model attempts to generate any of the following, system must either rewrite to safe alternatives or block:
- PHI confirmation phrases: “we reviewed your chart/records/visit/appointment,” “as your dentist,” “during your procedure,” “your treatment plan,” “we saw you on [date].”
- Liability admissions: “our fault,” “we caused,” “we damaged,” “we made a mistake,” “negligent.”
- Incentives: “discount,” “coupon,” “free,” “gift card,” “refund if you update/remove review.”

### 5.2 Legal-threat detector (MANDATORY manual-only hold)
Trigger phrases include: “lawyer,” “attorney,” “lawsuit,” “sue,” “court,” “legal action,” “demand letter,” “small claims,” “my attorney will,” “I’m filing.”
- Expected behavior: set `escalation_level=Legal` and `post_status='blocked_manual_review'`. Response draft may be generated for internal viewing only, but cannot be posted until manual clearance.

### 5.3 Escalation levels (minimum)
- Level 0: normal (publishable).
- Level 1: negative (publishable with offline CTA).
- Level 2: high-risk (damage/injury, discrimination, safety, PHI bait) → publishable only if it meets safe template rules; otherwise manual review.
- Level 3: Legal → **always manual-only hold**.

## 6) Posting & approval audit trail (required fields)
Every draft/post event must be traceable:
- Identifiers: `review_source` (Google|Yelp), `review_id`, `business_id`, `location_id`.
- Integrity: `review_text_hash`.
- Risk: `detected_risk_flags[]`, `escalation_level`, `hold_reason`.
- Drafting: `draft_version`, `final_response_text`, `model_version`, `prompt_version`, `detector_version`.
- Workflow: `human_approver_id`, `approval_timestamp`.
- Posting: `posted_timestamp`, `post_status` (posted|failed|blocked_manual_review|scheduled), `error_code`.
- Hold lifecycle: `blocked_timestamp`, `unblocker_id`, `unblocked_timestamp`.

Minimum audit events:
- `draft_created`, `flagged`, `approved`, `blocked`, `posted`, `post_failed`.

## 7) Weekly KPI report — definitions & reconciliation rules
KPI calculations must be deterministic and reconcilable with audit logs:
- Response rate = responded reviews / total reviews received (by source/location/time window).
- Response time (avg/median) = time from review creation to `posted_timestamp` (exclude `blocked_manual_review` from posted-time stats; include in “pending holds”).
- SLA compliance % = % posted within configured SLA (e.g., 24h) among publishable reviews.
- Rating trend = average rating by 7/30-day windows.
- Sentiment buckets = counts based on review stars and/or classifier output (must document mapping).
- Escalations count = by `escalation_level` and `hold_reason`.
- Reconciliation table must show: approved vs posted vs blocked vs failed.

## 8) Escalation Playbook v2 (operational excerpts)
### Do-not-post conditions (absolute)
- Any PHI confirmation needed to respond (healthcare).
- Active litigation or explicit legal threats.
- Safety incidents under investigation (fire, gas, injury) where facts are unclear.
- Harassment/threats: do not engage publicly; escalate.

### Routing & SLAs
- Safety incident (injury, gas leak, fire risk): Owner/GM <4h.
- Service failure (missed appointment, rude staff): Ops <24h.
- Billing dispute: Billing/Finance <24h.
- Legal threats: Legal same-day; maintain hold.

### Evidence checklist (collect internally)
- Review link/screenshot, work order/appointment ID (internal only), staff notes, photos, timestamps, any prior communications.

## 9) Approved response templates v2 — index (engineering-ready)
Templates are scenario-based and parameterized. Allowed variables (strict): `{business_name}`, `{contact_phone}`, `{contact_email}`, `{city}`. Banned substitutions: patient/client names, appointment dates, procedure names, pricing not stated in review, staff identities.

Per vertical (Dentist / Med Spa / HVAC): 6 templates each:
1. Positive praise
2. Neutral/short
3. Mild negative
4. Strong negative (service recovery)
5. Suspected fake/unknown customer
6. Safety/quality escalation (publishable only if no legal/PHI flags)

All negative/neutral templates include an offline CTA and neutral language.

## 10) Engineering Implementation Checklist v1 (ship criteria)
1. Enforce safety gates **twice**: (a) before generation (prompt shaping + risk flags), (b) before posting (final text scan + hold).
2. Implement `blocked_manual_review` as a hard stop in **both** API and UI pathways.
3. Log every state transition with required fields (Section 6).
4. Unit tests: detector trigger lists (PHI/legal/incentive) and expected escalation/hold outcomes.
5. Integration tests: “approve then block” is impossible; blocked items cannot be posted without explicit unblock event.
6. Reporting tests: weekly report matches audit log totals and reconciles posted vs blocked.

## 11) Open item requiring human approval
We need confirmation of a **sandbox/test environment** for Google Business Profile and Yelp posting. If none exists, approve a limited live test on a designated internal business/location to validate: (a) blocked_manual_review prevents posting, (b) audit logs capture block/approve/post, and (c) weekly KPI reconciliation counts blocked vs posted correctly.
