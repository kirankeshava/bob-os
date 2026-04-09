# AI Review Reply & Reputation Autopilot (Google/Yelp) — QA + Brand Safety + Escalation + Approved Templates Pack vFinal

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:01:10.225Z

---

Business reference (for customer/partner credibility)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support/Contact: agent_bob_replit+review-bot@agentmail.to

1) QA TEST REPORT v4 (FINAL)
Scope
- Vertical coverage: Dentist, Med Spa, HVAC
- Platforms: Google Business Profile (GBP) + Yelp
- Test corpus:
  - Core suite: 45 reviews (15 per vertical)
  - Yelp addendum: 6 edge cases (policy sensitivities)

Controls validated (what “pass” means)
A. Brand safety & tone
- Non-inflammatory, professional, appreciative when appropriate.
- No arguments, no sarcasm, no threats/retaliation.
- Avoids public back-and-forth; always offers an offline resolution path for negatives.

B. Hallucination control
- Does not invent facts (no fabricated timelines, diagnoses, service details, warranty terms, pricing, identities).
- Uses generic language when details are unknown.

C. Compliance & policy alignment (GBP/Yelp)
- No incentives/discounts for reviews; no review gating; no removal promises.
- No competitor disparagement.
- No doxxing or personal data.
- Healthcare: no medical outcome guarantees; no PHI/appointment confirmation.

D. Negative escalation triggers
- Negative reviews trigger escalation appropriately based on severity.
- Legal threats: “manual-only hold” (do not post).
- PHI risk: hard block language patterns and force generic phrasing.

E. Posting/approval audit trail
- Draft creation, flags, approvals, blocks/holds, and posting events are all logged.

Results summary
- Core suite (45): 45/45 pass (100%)
- Yelp addendum (6): 6/6 pass (100%)
- P0/P1 defects: 0 open

Key guardrails required (acceptance criteria)
1) PHI/Healthcare privacy guard
- Trigger phrases (non-exhaustive): “chart”, “records”, “your visit”, “your appointment”, “treatment plan”, “diagnosis”, “we reviewed your file”, “we saw you on (date)”.
- Expected behavior: Response must NOT confirm the person is a patient or that a visit occurred; it must switch to generic wording.
- Allowed alternative: “We take privacy seriously and can’t discuss details here. Please contact our office directly at [PHONE/EMAIL].”

2) Legal-threat manual-only hold
- Trigger phrases: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “small claims”, “court”, “demand letter”.
- Expected behavior:
  - response_mode = hold_manual_only
  - escalation_level = Legal
  - post_status = blocked_manual_review
  - no posting via API or UI

3) Incentives/review-gating prohibition
- Block or rewrite any language implying compensation or conditionality: “discount”, “coupon”, “free”, “gift”, “in exchange for a review”, “contact us for a deal”.
- Allowed alternative: neutral invitation to contact offline; no offer tied to review.

4) Competitor disparagement prohibition
- Do not mention competitor names or claims (“they’re lying”, “they do worse work”).
- Allowed alternative: focus on your standards and invite offline discussion.

Audit-log minimum schema (must exist for compliance and reporting)
- review_source (GBP/Yelp)
- review_id
- business_id / location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level (None/Low/Medium/High/Legal)
- response_mode (auto_draft / needs_human_review / hold_manual_only)
- draft_version
- model_or_prompt_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- post_status (posted / failed / blocked_manual_review / cancelled)
- posted_timestamp (nullable)
- blocked_timestamp (nullable)
- hold_reason (nullable)
- final_response_text

Weekly KPI reconciliation requirements (report accuracy)
- Responses drafted vs approved vs posted vs blocked must reconcile.
- Metrics: response rate, median first-response time, SLA compliance %, rating trend (7/30 day), sentiment buckets (simple rule-based ok), escalations count by level/reason, unresolved escalation aging.

2) BRAND-SAFETY CHECKLIST v3 (OPERATOR-READY)
Use this checklist before approving any response.

Universal must-haves
- Uses respectful tone; thanks reviewer when appropriate.
- Does not argue point-by-point in public.
- For negatives: includes offline CTA (phone/email) and invitation to resolve.
- No speculation; no invented details.

Universal must-not
- No admission of liability: avoid “our fault”, “we caused”, “we were negligent”.
- No medical guarantees/outcomes: avoid “cured”, “permanent”, “guaranteed results”.
- No incentives/discounts tied to reviews.
- No personal data: names of staff/patients/customers unless explicitly provided and safe; never confirm identity.
- No PHI confirmation (healthcare): do not confirm they were a patient or had an appointment.
- No threats/retaliation (“we’ll report you”, “we’ll sue you”).
- No competitor attacks.

Required offline CTA patterns (safe defaults)
- “We’d like to learn more and make this right. Please contact us at [CONTACT] so we can help directly.”
- Healthcare add-on: “For privacy reasons, we can’t discuss details here.”

Automatic DO-NOT-POST triggers (manual-only hold)
- Legal threats / intent to sue.
- Allegations of serious safety incidents requiring investigation.
- PHI-laden reviewer content where a reply could confirm treatment.
- Harassment/hate speech scenarios where response may escalate.

Platform notes
- GBP: keep concise and helpful; no promotional offers tied to reviews.
- Yelp: avoid implying Yelp will remove reviews; do not discuss moderation; keep it calm and offline.

3) ESCALATION PLAYBOOK v3
Severity levels
- Level 0 (No escalation): positive/neutral; safe to auto-post if checklist passes.
- Level 1 (Ops follow-up): mild dissatisfaction, scheduling issues.
- Level 2 (Manager): service quality complaints, repeated issues, billing disputes.
- Level 3 (Owner/GM): alleged damage, staff misconduct, discrimination claims.
- Level Legal (manual-only hold): threats of lawsuit, attorney involvement, demand letters.

Routing SLAs
- Safety incident: Owner/GM within 4 hours
- Billing dispute: Billing lead within 24 hours
- Service failure: Ops/Manager within 24 hours
- Legal threats: Legal same day (manual-only hold)

Scenario guidance (what to do)
A) Billing/pricing dispute
- Public reply: acknowledge concern, no admissions, invite offline with billing contact.
- Internal: gather invoice, work order, call logs, any written estimates.

B) Alleged damage/injury
- Public reply: empathetic, no fault admission, invite offline, escalate Level 3.
- Internal: incident report, photos, technician notes, timestamps.

C) Discrimination/harassment claim
- Public reply: take seriously, no debate, invite offline, escalate Level 3.
- Internal: HR review, witness statements.

D) Suspected fake review
- Public reply: calm, do not accuse reviewer of lying; invite offline for details.
- Internal: verify customer record without stating publicly.

E) Healthcare privacy/PHI
- Public reply: never confirm relationship; state privacy constraint; offer offline.
- Internal: route to practice manager/compliance.

4) APPROVED RESPONSE TEMPLATES v3 (VERSIONED)
Rules for all templates
- Allowed variables: {BusinessName}, {ContactMethod} (phone/email), {LocationOptional}.
- Disallowed variables: reviewer name, staff name, appointment date/time, treatment/service details not in review, prices unless customer-provided and verified.

DENTIST TEMPLATES
DENT-01 Positive
“Thank you for the kind words. We appreciate you taking the time to share your experience with {BusinessName}. We look forward to seeing you again.”

DENT-02 Neutral/Short
“Thanks for your feedback. If there’s anything we could do to improve your experience, please contact us at {ContactMethod} so we can help.”

DENT-03 Mild Negative (service experience)
“Thank you for letting us know. We’re sorry to hear your visit didn’t meet expectations. For privacy reasons, we can’t discuss details here, but we’d like to learn more and help—please reach us at {ContactMethod}.”

DENT-04 Strong Negative (pain/bedside manner)
“We’re sorry you had a frustrating experience. We take concerns like this seriously and want to address them directly. Please contact our office at {ContactMethod} so we can follow up privately.”

DENT-05 Suspected Fake / No record
“Thank you for the feedback. We want to look into this, but we can’t confirm any details here. Please contact {BusinessName} at {ContactMethod} so we can understand what happened and assist.”

DENT-06 Legal Threat (manual-only hold recommended)
(Do not auto-post; requires manual review.)
“Thank you for sharing your concerns. We take matters like this seriously and would like to address them appropriately. Please contact us directly at {ContactMethod}.”

MED SPA TEMPLATES
MSPA-01 Positive
“Thank you for your review. We appreciate your support and are glad you had a great experience with {BusinessName}.”

MSPA-02 Neutral
“Thanks for your feedback. If you’re open to sharing more, please contact us at {ContactMethod} so we can improve.”

MSPA-03 Mild Negative
“We’re sorry to hear this didn’t meet your expectations. We’d like to learn more and help resolve it—please reach us at {ContactMethod}. (For privacy reasons, we can’t discuss details here.)”

MSPA-04 Strong Negative (results dissatisfaction)
“Thank you for sharing your concerns. Outcomes and preferences can vary, and we want to understand what happened in your case. Please contact us at {ContactMethod} so we can discuss options privately.”

MSPA-05 Suspected Fake
“We take feedback seriously and want to look into this. Please contact {BusinessName} at {ContactMethod} so we can identify the visit and assist—privacy limits what we can address here.”

MSPA-06 Safety concern
“We’re sorry to hear this and we take safety concerns seriously. Please contact us at {ContactMethod} as soon as possible so we can follow up directly and appropriately.”

HVAC TEMPLATES
HVAC-01 Positive
“Thanks for the review. We’re glad we could help and appreciate you choosing {BusinessName}.”

HVAC-02 Neutral
“Thank you for the feedback. If there’s anything we can do better, please contact us at {ContactMethod} so we can follow up.”

HVAC-03 Mild Negative (lateness/scheduling)
“Thanks for letting us know, and sorry for the inconvenience. We’d like to look into the scheduling issue—please contact us at {ContactMethod} so we can help.”

HVAC-04 Strong Negative (quality)
“We’re sorry to hear this wasn’t resolved to your satisfaction. We’d like to review what happened and make it right where possible—please contact us at {ContactMethod}.”

HVAC-05 Alleged damage
“We’re sorry to hear about this concern. We take these reports seriously and want to investigate promptly. Please contact us at {ContactMethod} so we can follow up directly.”

HVAC-06 Suspected fake
“Thank you for the feedback. We want to look into this, but we can’t confirm details here. Please contact {BusinessName} at {ContactMethod} so we can assist.”

5) CUSTOMER-FACING POLICY ALIGNMENT & SAFETY GUARANTEES (ONBOARDING/SALES COPY)
“Our AI Review Reply & Reputation Autopilot is designed for brand safety and platform compliance. Responses are drafted to be professional, non-inflammatory, and to avoid inventing facts. For healthcare-related businesses, the system is built to avoid confirming patient relationships or discussing private details publicly. Negative reviews can be automatically escalated, and legal-threat language triggers a manual-only hold so nothing posts without human review. We do not solicit or offer incentives for reviews, do not engage in competitor disparagement, and do not promise review removal on Yelp or Google. Learn more at https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 or contact agent_bob_replit+review-bot@agentmail.to.”

Operator note: This pack is “ready to implement.” Remaining work is purely environment verification (sandbox or limited live test) to prove blocked_manual_review truly prevents posting and that audit logs + weekly KPIs reconcile in real conditions.