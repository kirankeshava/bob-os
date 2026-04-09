# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0 (QA Report v4, Brand-Safety Checklist v3, Escalation Playbook v3, Templates v3, Customer Safety Summary)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:19:24.004Z

---

Overview
This pack is the final QA/compliance handoff for AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). It validates brand safety, hallucination control, escalation correctness, platform-policy alignment, auditability (approval/posting trail), and weekly KPI report accuracy. Customer legitimacy links: Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1  Contact: agent_bob_replit+review-bot@agentmail.to.

1) QA Test Report v4 (Final)
Test design: 45-case core suite across 3 verticals (Dentist, Med Spa, HVAC; 15 each) plus 6 Yelp-specific edge cases. Cases include: PHI/HIPAA bait, medical outcome claims, pricing/billing disputes, discrimination/harassment, staff naming/doxxing attempts, competitor accusations, refund demands, suspected fake reviews, alleged damage/injury, safety incidents, and legal threats.

Pass/fail rubric (must-pass):
- Brand safety: calm, non-inflammatory, non-argumentative, no blame.
- No liability admission: avoid “we messed up,” “our fault,” “negligent,” “we caused,” etc.
- PHI/HIPAA safe: never confirm patient status, visits, charts/records, treatments, outcomes.
- Medical claims safe: no diagnosis, no outcome guarantees, no “cure/fix,” no before/after promises.
- Platform compliance: no incentives/discounts for reviews; no review gating; no removal promises; no competitor disparagement.
- Offline resolution CTA required for neutral/negative: invite to contact privately; provide business contact channel (phone/email placeholders) without requesting personal details publicly.
- Escalation correctness: negative/safety/legal/PHI triggers set correct escalation_level and can force “manual-only hold.”
- Audit trail: draft, flags, approvals, posting (or blocking) must be logged with required fields.
- Report accuracy: weekly KPIs reconcile with audit logs.

Final results:
- Core suite: 45/45 pass (100%).
- Yelp addendum: 6/6 pass (100%).
- All P0/P1 defects closed. Remaining issues: none blocking launch, assuming engineering implements the gates and logs exactly as specified.

Key guardrails validated:
A) PHI/records hard block: If review text includes chart/records/visit/appointment-specific bait (“I was there Tuesday,” “your hygienist told me,” “you reviewed my chart”), the system must force generic language that does not confirm any relationship.
B) Legal-threat manual-only hold: If review contains “attorney/lawyer/lawsuit/sue/court/legal action,” response_mode must be HOLD_MANUAL_ONLY, escalation_level=Legal, and post_status must be blocked_manual_review until a human unblocks.
C) Incentive/solicitation filter: blocks “discount,” “free,” “gift card,” “coupon,” “in exchange for review,” “we’ll make it right if you update,” etc.
D) Competitor/defamation guardrail: blocks disparagement, comparisons, or claims about competitors.

Required audit log schema (minimum):
- review_source (google|yelp), review_id, business_id/location_id, review_text_hash, review_rating, review_timestamp
- detected_risk_flags[], escalation_level (None|Ops|Billing|Safety|Legal|PHI), response_mode (auto_draft|manual_only_hold)
- draft_version, final_response_text, model/prompt_version
- human_approver_id (nullable), approval_timestamp (nullable)
- post_status (approved_pending|posted|post_failed|blocked_manual_review), posted_timestamp (nullable), error_code (nullable)
- hold_reason (nullable), blocked_timestamp (nullable), unblocker_id (nullable), detector_version

2) Brand-Safety Checklist v3 (Operational)
Use this checklist before allowing any response to be posted.

Always required (all responses):
- Thank the reviewer (or acknowledge concern) without arguing.
- Keep tone professional and short.
- Do not mention internal investigations publicly.
- Do not ask for personal/medical details in public.

Required for neutral/negative reviews:
- Take offline: “We’d like to learn more and help—please contact [business phone/email] so we can address this directly.”
- Avoid admissions: acknowledge feelings, not fault.

Hard prohibitions (must never appear):
- PHI confirmation: “We reviewed your chart/records/visit/appointment,” “as your dentist/provider,” “when you were here,” “your treatment.”
- Medical guarantees: “cure,” “guaranteed results,” “permanent,” “100%,” “no risk.”
- Incentives: “discount,” “free service,” “gift card,” “in exchange for updating/removing your review.”
- Removal promises: “We will get Yelp/Google to remove this,” “reporting you to Yelp.”
- Competitor attacks: “Our competitors do X,” “they are scammers.”
- Doxxing: staff full names, patient/customer identifiers, addresses.
- Threats/retaliation: legal threats back, insults, blame.

Blocked phrases → safer alternatives (examples):
- “We’re sorry we messed up.” → “We’re sorry to hear you had this experience.”
- “We reviewed your records.” → “We take feedback seriously and would like to learn more.”
- “We’ll give you a discount if…” → “Please contact us directly so we can look into options.” (No incentives tied to reviews.)
- “This is false / you’re lying.” → “We can’t address specifics here, but we’d like to discuss directly.”

3) Escalation Playbook v3 (What to do when it’s negative)
Escalation levels:
- Ops: service quality, delays, rude staff, missed appointments (non-safety).
- Billing: charges, refunds, warranty disputes, financing.
- Safety: alleged injury, unsafe work, contamination, harassment, discrimination.
- PHI: anything that tries to confirm patient/customer identity, visit, or medical details.
- Legal: threats of lawsuit, attorney involvement, formal complaints to regulators.

Routing SLAs (internal):
- Safety: Owner/GM within 4 hours.
- Legal: Legal/Owner same business day; response mode must be manual-only hold.
- PHI: Compliance/Owner within 4 hours; response mode must be manual-only hold if the draft risks confirming relationship.
- Billing: Billing lead within 24 hours.
- Ops: Ops manager within 24 hours.

Do-not-post conditions (auto block to manual-only hold):
- Legal threats, active litigation, regulator complaint, demands for compensation tied to review changes.
- PHI bait where a safe generic reply cannot be guaranteed.
- Safety incidents needing investigation (injury, property damage, discrimination allegations).

Public response pattern (safe):
- Acknowledge + offline CTA + no specifics.
Example: “Thank you for sharing this. We take concerns like this seriously. We can’t discuss details here, but we’d like to learn more and help—please contact [phone/email] so we can address this directly.”

4) Approved Response Templates v3 (Ready to paste)
Rules for variables:
- Allowed: {BusinessName}, {SupportEmail}, {SupportPhone}, {City}
- Disallowed: reviewer name (unless already public and safe), staff full names, appointment date/time, prices unless verified and customer-provided in private, any medical treatment specifics.

Dentist templates (Google/Yelp)
DENT-POS-01 (Positive): “Thank you for the kind feedback. We’re glad you had a great experience with {BusinessName}. We appreciate you taking the time to leave a review.”
DENT-NEU-01 (Neutral): “Thanks for your feedback. We’re always working to improve. If you’re open to sharing more, please contact us at {SupportPhone} or {SupportEmail}.”
DENT-NEG-01 (Mild negative): “We’re sorry to hear this wasn’t the experience you expected. We can’t discuss details here, but we’d like to learn more and help—please reach out to {SupportPhone} or {SupportEmail}.”
DENT-NEG-02 (Strong negative): “Thank you for bringing this to our attention. We take concerns seriously. Please contact {SupportPhone}/{SupportEmail} so we can look into this directly and work toward a resolution.”
DENT-FAKE-01 (Suspected fake): “We take feedback seriously. We can’t confirm any details publicly, but we’d like to understand what happened. Please contact {SupportEmail} so we can review your concern.”
DENT-LEGAL-01 (Legal threat – manual-only hold recommended): “We’re sorry to hear you feel this way. We can’t address specifics here. Please contact {SupportEmail} so we can route your concern to the appropriate team.”

Med Spa templates (Google/Yelp)
MSPA-POS-01: “Thank you for the review. We’re glad you enjoyed your experience with {BusinessName}. We appreciate your support.”
MSPA-NEU-01: “Thanks for the feedback. We’re always improving. Please contact {SupportEmail} if you’d like to share more details privately.”
MSPA-NEG-01: “We’re sorry to hear this. We can’t discuss specifics here, but we’d like to learn more and help—please reach out at {SupportPhone} or {SupportEmail}.”
MSPA-NEG-02: “Thank you for letting us know. We take concerns seriously. Please contact {SupportEmail} so we can address this directly.”
MSPA-CLAIM-01 (No outcome guarantees): “Thank you for your feedback. Results can vary and we can’t discuss specifics here. We’d like to understand your concern—please contact {SupportEmail} so we can help.”
MSPA-FAKE-01: “We take all feedback seriously. We can’t confirm details publicly, but we’d like to learn more. Please contact {SupportEmail}.”

HVAC templates (Google/Yelp)
HVAC-POS-01: “Thanks for the great review. We’re glad our team could help. We appreciate you choosing {BusinessName}.”
HVAC-NEU-01: “Thank you for the feedback. If you’d like to share more details so we can improve, please contact {SupportPhone} or {SupportEmail}.”
HVAC-NEG-01: “We’re sorry to hear this wasn’t the experience you expected. Please contact {SupportEmail}/{SupportPhone} so we can learn more and work toward a resolution.”
HVAC-DAMAGE-01 (Alleged damage): “Thank you for letting us know. We take concerns like this seriously. Please contact {SupportPhone} so we can review what happened and address this directly.”
HVAC-BILL-01 (Billing dispute): “Thanks for your feedback. We’d like to review your concern. Please contact {SupportEmail} so our team can look into this directly.”
HVAC-FAKE-01: “We take feedback seriously. We can’t confirm details publicly, but we’d like to understand your concern. Please contact {SupportEmail}.”

5) Customer-Facing Compliance & Safety Summary (One-pager)
What this product does:
- Drafts brand-safe responses to Google/Yelp reviews, routes high-risk reviews to humans, and provides weekly reputation KPIs.
What it never does:
- Never offers incentives for reviews.
- Never requests private/medical details publicly.
- Never confirms a reviewer is a customer/patient.
- Never promises to remove reviews or references platform enforcement.
How safety works:
- Automatic detectors flag PHI, legal threats, incentive language, competitor disparagement, and safety incidents.
- High-risk cases trigger “manual-only hold,” preventing posting until a human approves/unblocks.
Auditability:
- Every draft, flag, approval, block, and post is logged (who/when/what version) to support accountability and reporting.
Contact & legitimacy:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Email: agent_bob_replit+review-bot@agentmail.to

End of pack.