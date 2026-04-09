# Brand Safety + Escalation + Approved Templates Pack v3 (Google Business Profile & Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:23:05.273Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Brand Safety + Escalation + Approved Templates Pack v3
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

SECTION 1 — BRAND-SAFETY & PLATFORM-POLICY CHECKLIST (v3)
Purpose: Ensure every drafted and posted response is brand-safe, non-inflammatory, avoids liability/PHI, and complies with Google Business Profile (GBP) and Yelp policies.

A) Hard “DO NOT POST” Conditions (Manual-only hold required)
If any condition is true, system must set post_status = blocked_manual_review and require human/legal review before any posting path (UI or API).
1) Legal threat / litigation: “attorney”, “lawyer”, “lawsuit”, “sue”, “served”, “court”, “small claims”, “demand letter”, “my legal team”, “report to the AG”.
2) Safety incident or injury allegation (serious): “injury”, “hospital”, “unsafe”, “fire”, “gas leak”, “electrocute”, “assault”, “sexual harassment”.
3) PHI/HIPAA risk (healthcare): reviewer includes or requests confirmation of appointment/diagnosis/treatment, or response would require confirming status as a patient.
4) Hate/harassment/violence threats in review content.
5) Doxxing/personal data requests: phone numbers, addresses, last names, employee home info.

B) Must-Haves in Every Public Response
1) Appreciation + professionalism: Thank the reviewer (even in negatives) without sarcasm.
2) Offline resolution CTA: Invite direct contact via phone/email (or “contact our office”) and offer to discuss details privately.
3) Neutral language: No blame, no argument, no accusations.
4) No personal data: Do not name staff, confirm identities, appointments, procedures, invoices, or addresses.
5) No policy-violating promises: Do not promise Yelp/Google removal, do not mention reporting to platform as a threat.

C) Prohibited Content (Block or rewrite)
1) Liability admissions: “we were at fault”, “we messed up”, “our technician broke”, “we caused damage”.
Safe alternative: “We’re sorry to hear about your experience; we’d like to look into what happened.”
2) Medical outcome guarantees: “guaranteed results”, “permanent”, “cure”, “no side effects”, “will fix”.
Safe alternative: “Results can vary; we’re happy to discuss concerns directly.”
3) PHI confirmation: “we reviewed your chart/records/visit/appointment”, “according to your file”, “we saw you on Tuesday”.
Safe alternative: “For privacy reasons, we can’t discuss details here; please contact us directly so we can help.”
4) Incentives/solicitation: “discount for review”, “free service for 5-star”, “we’ll refund if you update review”.
Safe alternative: “We appreciate feedback and would like to make this right—please contact us.”
5) Competitor disparagement: “they’re lying”, “competitor planted this”, “fake competitor review” (asserted as fact).
Safe alternative: “We can’t find details matching this experience; please contact us so we can investigate.”

D) Tone Constraints (Always)
- Calm, brief, service-oriented.
- No all-caps, no exclamation-heavy language.
- Do not mirror hostile language.
- Do not threaten consequences (“we’ll sue”, “we’ll ban you”, “we’ll expose you”).

E) Platform Alignment Notes (Testable)
Google Business Profile:
- Avoid promotional/incentive language tied to reviews.
- Avoid content that discloses personal data.
- Keep responses relevant and professional.
Yelp:
- Do not ask for reviews in a way that implies incentives.
- Do not mention or imply Yelp will remove reviews.
- Keep responses factual, non-accusatory, and privacy-preserving.

F) Required Audit Trail Fields (minimum)
review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode (auto|needs_approval|blocked_manual_review), draft_version, model/prompt version, human_approver_id (if applicable), approval_timestamp, posted_timestamp, post_status/error_code, hold_reason, detector_version, final_response_text.

SECTION 2 — ESCALATION PLAYBOOK (v3)
Goal: Correctly route negatives and prevent risky posting.

Escalation Levels
- L0: Auto-respond OK (positive/neutral, low risk)
- L1: Mild negative—auto draft + human approval recommended
- L2: Strong negative—human approval required
- L3: Safety/PHI/legal—blocked_manual_review (do not post)

Routing SLAs (internal)
- L3 (legal/safety/PHI): Owner/GM within 4 hours; Legal same-day if threat.
- L2: Ops lead within 24 hours.
- Billing disputes: Billing owner within 24 hours.

Scenario Guidance
1) Billing/price dispute
- Public response: acknowledge concern, invite offline review of account, no price specifics unless provided and verified.
- Evidence to collect: invoice #, scope, signed estimate, call logs.
2) Service quality complaint (HVAC, dental, med spa)
- Public response: apologize for experience (not admitting fault), invite offline, offer to review.
- Evidence: job notes, before/after photos, appointment log.
3) Alleged damage to property
- If “you broke/ruined/damaged”: L2 minimum; if legal/safety undertone: L3.
- Public response: do not admit; request offline contact.
- Evidence: photos, technician notes, insurance steps.
4) HIPAA/PHI mention (dentist/med spa)
- Always avoid confirming patient relationship.
- If reviewer reveals details: respond with privacy statement + offline CTA; do not restate details.
- If reviewer demands details publicly: L3 blocked.
5) Discrimination/harassment allegations
- L3 if severe/credible. Keep response neutral, invite offline, state commitment to respectful service.
- Evidence: incident report, staff statements.
6) Suspected fake review
- Do not accuse. Ask for offline details; state you can’t locate the experience.
- Optionally flag internally for platform reporting (never promise removal publicly).

“Do Not Post” Examples (force blocked_manual_review)
- “We checked your chart and…”
- “Our lawyer will be contacting you.”
- “We’ll have Yelp remove this.”

SECTION 3 — APPROVED RESPONSE TEMPLATE LIBRARY (v3)
Rules across all templates:
- Allowed variables: {BusinessName}, {ContactMethod} (phone/email), {Location} (city only), {TeamName} (generic), {ReviewerFirstName if provided by platform}.
- Disallowed variables: staff full names, appointment dates/times, diagnosis/procedure, invoice amounts unless reviewer already posted and business verified.
- Each template includes offline CTA.

A) DENTIST TEMPLATES (Google/Yelp)
DEN-POS-001 (Positive)
“Thank you for the kind words, {ReviewerFirstName}. We’re glad you had a great experience at {BusinessName}. If you ever have questions or need anything, please reach out to us directly at {ContactMethod}.”

DEN-NEU-002 (Neutral/short)
“Thank you for your feedback, {ReviewerFirstName}. We appreciate you taking the time to share your experience. If there’s anything we can do to help, please contact {BusinessName} at {ContactMethod}.”

DEN-MNEG-003 (Mild negative)
“Thanks for letting us know, {ReviewerFirstName}. We’re sorry to hear your visit didn’t meet expectations. For privacy reasons we can’t discuss details here, but we’d like to learn more and help—please contact us at {ContactMethod}.”

DEN-SNEG-004 (Strong negative)
“We’re sorry to hear about your experience. We take concerns seriously and want to address this appropriately. Please contact {BusinessName} at {ContactMethod} so we can look into what happened and work toward a resolution.”

DEN-PHI-005 (PHI-safe generic; use when reviewer shares medical details but no legal threat)
“Thank you for your message. To protect privacy, we can’t discuss health or visit details here. We’d like to help—please contact {BusinessName} at {ContactMethod} so we can follow up privately.”

DEN-HOLD-006 (Legal threat hold — do not post; internal note text)
“INTERNAL ONLY: Detected legal-threat language. Set response_mode=blocked_manual_review; escalation_level=Legal. Do not post publicly until reviewed by Owner/Legal.”

B) MED SPA TEMPLATES (Google/Yelp)
MS-POS-001
“Thank you, {ReviewerFirstName}. We appreciate you choosing {BusinessName}. We’re happy you had a positive experience—please reach us anytime at {ContactMethod}.”

MS-MNEG-002
“Thank you for your feedback. We’re sorry to hear this wasn’t the experience you expected. We’d like to learn more and assist—please contact {BusinessName} at {ContactMethod}. For privacy reasons, we can’t discuss details here.”

MS-SNEG-003
“We take your concerns seriously and would like to address them directly. Please contact {BusinessName} at {ContactMethod} so we can look into your experience and work toward a resolution.”

MS-OUT-004 (Avoid outcome guarantees)
“Thank you for sharing your concerns. Every individual’s experience can vary, and we’d like to understand what happened in your case. Please contact {BusinessName} at {ContactMethod} so we can discuss privately.”

MS-FAKE-005 (Suspected fake)
“Thank you for the feedback. We’re unable to locate details that match this experience, but we want to look into it. Please contact {BusinessName} at {ContactMethod} with any information you can share privately.”

MS-HOLD-006 (Legal threat hold — internal only)
“INTERNAL ONLY: Legal threat detected. response_mode=blocked_manual_review; do not post.”

C) HVAC TEMPLATES (Google/Yelp)
HV-POS-001
“Thank you, {ReviewerFirstName}. We appreciate you choosing {BusinessName}. If we can help with anything in the future, please contact us at {ContactMethod}.”

HV-ONTIME-002 (Neutral)
“Thanks for your feedback. We’re always working to improve. If you’re open to sharing more, please contact {BusinessName} at {ContactMethod} so we can follow up.”

HV-MNEG-003
“Thanks for letting us know. We’re sorry to hear this didn’t meet expectations. We’d like to look into the details—please contact {BusinessName} at {ContactMethod} so we can help.”

HV-DAMAGE-004 (No liability admission)
“We’re sorry to hear about your concern. We take issues like this seriously and want to understand what happened. Please contact {BusinessName} at {ContactMethod} so we can review the situation and work toward a resolution.”

HV-FAKE-005
“Thank you for your review. We’re unable to match this to our records, but we want to investigate. Please contact {BusinessName} at {ContactMethod} with details so we can follow up privately.”

HV-HOLD-006 (Safety/legal)
“INTERNAL ONLY: Safety incident or legal threat detected. response_mode=blocked_manual_review; escalation_level=Safety or Legal; do not post.”

SECTION 4 — POLICY ALIGNMENT MATRIX (Google vs Yelp)
Risk Area: Incentives
- Google: No offering discounts/freebies for reviews.
- Yelp: Strongly discourages solicitation; never tie incentives to review changes.
Acceptance criteria: response contains no “discount”, “free”, “coupon”, “refund if you update”.

Risk Area: Removal promises
- Google/Yelp: Do not promise removal; do not claim platform action.
Acceptance criteria: response contains no “we’ll have this removed”, “Yelp will delete”, “Google will take it down”.

Risk Area: PHI/Privacy
- Both: do not confirm private info; healthcare must avoid confirming patient relationship.
Acceptance criteria: no “your appointment/visit/chart/records”. Must include privacy statement + offline CTA.

Risk Area: Competitor disparagement
- Both: avoid accusing competitor/fraud as fact.
Acceptance criteria: allowed phrasing “we can’t locate details” but no “competitor planted this”.

SECTION 5 — QA EVIDENCE PACKAGING CHECKLIST
When engineering/ops runs the verification runbook, attach:
1) Audit log export showing: one L0 post success, one L2 approval-required, and one L3 blocked_manual_review (legal trigger) with hold_reason.
2) Screenshot or log proving blocked_manual_review prevented posting via both UI and API.
3) Weekly KPI report export demonstrating: posted vs approved vs blocked counts reconcile, response rate computed correctly, escalations counted by level.
4) Detector test output: unit/integration test results for PHI phrases, legal threats, incentives, competitor disparagement.

END OF PACK v3
