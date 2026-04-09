# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v4.0 (QA Report + Brand-Safety Checklist + Escalation Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T05:56:03.060Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Final QA & Compliance Pack v4.0
Product legitimacy URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

1) QA TEST REPORT v4 (FINAL)
Scope: End-to-end draft generation + escalation classification + posting/approval gates + audit trail expectations + weekly KPI calculations.
Test suite executed:
- Core suite: 45 reviews (15 dentist, 15 med spa, 15 HVAC) including edge cases: PHI/HIPAA, medical outcome claims, pricing disputes, discrimination/harassment, doxxing/staff names, competitor accusations, refunds, suspected fake, threats/legal.
- Yelp addendum: 6 cases (review removal accusations, competitor comparisons, solicitation/incentive-adjacent language, demands for discounts, threats to “report to Yelp,” public baiting).
Final results:
- Core: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)
What “pass” means (must meet all):
A) Brand-safe tone: calm, respectful, non-argumentative, no shaming.
B) Hallucination control: no invented specifics (services, dates, policies, treatments, staff actions).
C) Policy compliance: no incentives/review gating, no removal promises, no competitor disparagement.
D) Medical/HIPAA compliance (where applicable): no confirmation of patient relationship; no PHI; no treatment/outcome guarantees.
E) Liability control: no admission of fault (“we caused/damaged/incorrectly…”), no definitive blame.
F) Negative handling: includes offline CTA to resolve; escalation triggers correct.
G) Posting gates: legal threats/manual-only holds block posting.

Closed critical guardrails (must be implemented as hard rules):
1) PHI confirmation hard block:
- Trigger phrases (examples): “your chart/records/visit/appointment,” “we reviewed your file,” “according to your treatment plan.”
- Required behavior: replace with generic non-confirming language (“We can’t discuss details here, but we’d like to help offline.”).
2) Legal-threat detector → manual-only hold:
- Trigger phrases: “attorney,” “lawyer,” “lawsuit,” “sue,” “legal action,” “small claims,” “demand letter.”
- Required behavior: response_mode=HOLD_MANUAL_ONLY; escalation_level=Legal; post_status=blocked_manual_review.

Audit trail acceptance criteria (minimum required fields):
- review_source (Google|Yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags[] (PHI, MedicalClaim, Incentive, Competitor, Doxxing, Threat, Legal, Safety)
- escalation_level (None|Ops|Billing|Safety|Legal)
- response_mode (AutoDraft|NeedsApproval|HOLD_MANUAL_ONLY)
- draft_version + model/prompt version + detector_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (drafted|approved|posted|blocked_manual_review|failed)
- error_code (nullable)
- final_response_text
- hold_reason (nullable), blocked_timestamp (nullable), unblocker_id (nullable)
Required audit events:
- draft_created
- flagged (includes flags + detector_version)
- approved OR blocked
- posted OR post_failed

Weekly KPI/report accuracy acceptance criteria (must reconcile):
- Responses posted must equal count(post_status=posted) for the week.
- Approved-but-not-posted must equal count(post_status=approved) - count(post_status=posted).
- Blocked/held must equal count(post_status=blocked_manual_review) with hold_reason breakdown.
- Response rate = (# reviews with posted response) / (total reviews received) by platform.
- First-response time computed from review_created_at → posted_timestamp (median + average) and SLA % (e.g., within 24h).
- Rating trend: average rating over 7/30 days, plus volume.
- Escalations count by level and aging (unresolved hold age).

2) BRAND-SAFETY CHECKLIST v3 (OPERATIONAL)
Use this checklist for every drafted response before approval/posting.

2.1 Non-negotiable “DO NOT” rules (Google + Yelp)
- Do NOT solicit incentives: no discounts, gifts, refunds conditioned on review edits/removals.
- Do NOT request only positive reviews or filter who can review (“review gating”).
- Do NOT promise review removal or mention platform enforcement (“We will have Yelp remove this”).
- Do NOT disclose or confirm private details, especially medical/healthcare PHI.
- Do NOT identify the reviewer as a customer/patient (“We remember your visit”).
- Do NOT admit liability or fault in definitive terms (“We caused damage,” “We were negligent”).
- Do NOT argue, threaten, retaliate, or shame.
- Do NOT disparage competitors.
- Do NOT use the reviewer’s full name, appointment date/time, invoice number, address, or staff last names.

2.2 Required “must include” elements
- Thank/acknowledge sentiment (positive/negative) without conceding facts.
- Invite offline resolution with a clear CTA: phone/email.
- For negative reviews: state you take feedback seriously and want to investigate.
- For medical verticals: include privacy disclaimer and avoid confirming relationship.
- For suspected fake/unknown: keep neutral, invite contact, avoid accusations.

2.3 Platform notes (testable differences)
Google Business Profile:
- Keep concise; avoid long back-and-forth; avoid policy/legal speculation.
Yelp:
- No incentives; no implying Yelp will remove; avoid baiting; keep professional and offline.

2.4 Hard-block phrase list (examples; extendable)
- PHI confirmation: “chart,” “records,” “your visit,” “your appointment,” “treatment plan.”
- Liability admission: “we caused,” “our fault,” “we are liable,” “we damaged.”
- Incentives: “discount,” “coupon,” “free,” “gift card,” “refund if you remove/update.”
- Competitor disparagement: “unlike [competitor],” “they’re scammers,” etc.
- Legal threats: “attorney,” “lawsuit,” “sue,” “legal action.”

3) ESCALATION PLAYBOOK v3 (COMMON NEGATIVE SCENARIOS)
Escalation levels:
- Ops: service quality, scheduling, staff behavior, delays, workmanship concerns.
- Billing: pricing disputes, surprise charges, refunds, insurance.
- Safety: injury/damage allegations, unsafe conditions.
- Legal: threats of legal action, defamation risk, ongoing disputes requiring counsel.

Routing SLAs:
- Safety: Owner/GM within 4 hours.
- Ops: Ops manager within 24 hours.
- Billing: Billing lead within 24 hours.
- Legal: same business day.

Evidence checklist by scenario:
- Billing: invoice/estimate (internal), timestamps, policy text, call logs.
- Service quality/HVAC: job notes, photos, technician report.
- Dental/Med spa: internal record review ONLY offline; never reference publicly.
- Damage/injury: incident report, photos, staff statements; stop public replies pending investigation.

DO NOT POST conditions (force HOLD_MANUAL_ONLY):
- Any PHI mention requiring confirmation/denial.
- Any legal threat keywords.
- Any safety incident with potential injury/damage claims requiring investigation.
- Harassment/hate speech where a public reply could escalate risk.

Recommended public response patterns:
- Billing dispute: acknowledge, invite offline, avoid quoting amounts unless provided and verified.
- Quality complaint: apologize for experience (not fault), invite offline, commit to review.
- Suspected fake: state you can’t locate details publicly, invite contact to verify; do not accuse.
- Legal threat: no public reply or only a minimal neutral hold statement per counsel.

4) APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL, GOOGLE + YELP)
All templates require: no PHI confirmation, no incentives, no competitor comments, no liability admission, and an offline CTA to agent_bob_replit+review-bot@agentmail.to (or business phone if provided).
Allowed variables (safe): {business_name}, {first_name_optional}, {contact_email}, {phone_optional}, {general_service_category}.
Banned variables: staff full names, appointment dates, invoice numbers, treatment details, diagnosis, outcomes.

4.1 DENTIST TEMPLATES
DENT-G-POS-01 (Google, Positive)
“Thank you for the kind words. We’re glad you had a good experience with {business_name}. If there’s ever anything we can do to help, please reach us at {contact_email}.”

DENT-Y-POS-01 (Yelp, Positive)
“Thanks for sharing your feedback. We appreciate you taking the time to review {business_name}. If you’d like to connect with our team, email {contact_email}.”

DENT-G-NEG-MILD-01 (Google, Mild negative)
“Thank you for the feedback. We’re sorry to hear your experience didn’t meet expectations. We can’t discuss details here, but we’d like to understand what happened and help—please contact us at {contact_email}.”

DENT-Y-NEG-STRONG-01 (Yelp, Strong negative)
“We’re sorry you’re feeling this way. To protect privacy, we can’t address specifics in a public forum, but we do want to look into your concerns and work toward a resolution. Please reach our team at {contact_email}.”

DENT-FAKE-NEUTRAL-01 (Google/Yelp, Suspected fake/unknown)
“Thanks for the review. We take feedback seriously, but we can’t confirm details publicly. If you’re willing, please contact us at {contact_email} so we can understand your concern and assist.”

DENT-HOLD-LEGAL-01 (Any, Legal threat → manual-only)
[System behavior: block posting; escalate Legal]
If a minimal public reply is approved by counsel:
“We take concerns seriously and want to address this appropriately. Please contact us directly at {contact_email}.”

4.2 MED SPA TEMPLATES
MED-G-POS-01
“Thank you for your review. We appreciate you choosing {business_name} and we’re glad you had a positive experience. If you’d like to connect with us, email {contact_email}.”

MED-Y-NEG-MILD-01
“Thank you for the feedback. We’re sorry your experience wasn’t what you expected. We can’t discuss details publicly, but we’d like to learn more and help—please reach out at {contact_email}.”

MED-G-CLAIM-SAFETY-01 (Medical outcome claim appears)
“Thank you for sharing your perspective. For everyone’s privacy and safety, we can’t discuss services or results in a public reply. We’d like to connect and address your concerns directly—please contact {contact_email}.”

MED-FAKE-NEUTRAL-01
“We appreciate you taking the time to post. We’d like to understand what happened, but we can’t confirm details here. Please contact {contact_email} so we can look into it.”

MED-HOLD-SAFETY-01 (Injury allegation)
[System behavior: HOLD_MANUAL_ONLY; escalate Safety]
If approved to post:
“We’re sorry to hear this and want to take it seriously. Please contact us directly at {contact_email} so we can review and assist.”

4.3 HVAC TEMPLATES
HVAC-G-POS-01
“Thanks for the review. We appreciate the opportunity to help and we’re glad you were satisfied with {business_name}. If you need anything else, reach us at {contact_email}.”

HVAC-Y-NEG-MILD-01 (Late/communication)
“Thank you for the feedback. We’re sorry for the inconvenience and want to learn more so we can improve. Please contact us at {contact_email} with your preferred way to reach you.”

HVAC-G-NEG-STRONG-01 (Work quality complaint)
“We’re sorry to hear this. We take workmanship concerns seriously and would like to review the situation. Please contact us at {contact_email} so we can look into it and help resolve this.”

HVAC-DAMAGE-CLAIM-01 (Alleged damage)
[System behavior: HOLD_MANUAL_ONLY if includes injury/damage specifics; escalate Safety]
If approved to post:
“We take reports like this seriously and want to investigate. Please contact us at {contact_email} so we can review what happened.”

HVAC-FAKE-NEUTRAL-01
“Thank you for the review. We’d like to understand your concern, but we can’t confirm details publicly. Please contact {contact_email} so we can assist.”

5) GO/NO-GO EXIT CRITERIA (LAUNCH GATE)
Go only if all are true:
- Detector tests pass: PHI confirmation block; incentives block; competitor disparagement block; liability-admission softener; legal threat → blocked_manual_review.
- Posting gates enforced in BOTH UI and API paths.
- Audit events emitted for draft_created/flagged/approved|blocked/posted|failed with required fields.
- Weekly KPI report reconciles posted vs approved vs blocked counts (no unexplained deltas).
- A limited verification run (sandbox or controlled live) produces exported evidence (logs + KPI snapshots).

Owner/Engineering next action:
Confirm sandbox availability. If none, run the limited live protocol on a designated low-risk internal location (3–5 posts max) and store exported audit logs + KPI snapshots as release evidence.
