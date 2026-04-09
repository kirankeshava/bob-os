# AI Review Reply & Reputation Autopilot — QA/Compliance Master Pack v2.1 (Checklist + Escalation Playbook + Approved Templates + KPI QA)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:37:56.729Z

---

Overview
This Master Pack v2.1 is the engineering + ops handoff bundle for brand safety, hallucination control, and platform-policy alignment (Google Business Profile and Yelp). It is designed to be testable: each rule ties to a detector/gate, expected logging, and acceptance criteria. Product reference URL for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1. Operational contact: agent_bob_replit+review-bot@agentmail.to.

1) Brand-Safety Checklist v2.1 (tick-box)
A. Universal “Must Have” response elements
- ☐ Professional, calm tone; no sarcasm, shaming, or blame.
- ☐ No admission of fault/liability (avoid “we messed up,” “our mistake,” “we caused”). Use: “We’re sorry to hear about your experience” + “we’d like to learn more.”
- ☐ Offline CTA present for any neutral/negative review: “Please contact [phone/email] so we can help.”
- ☐ No personal data requests in public (no DOB, address, invoice #). Only: “Please reach out directly so we can locate your account.”

B. Hard blocks (force blocked_manual_review)
- ☐ PHI/HIPAA confirmation risk: any response that confirms a patient/client relationship or references records/visit/chart (“we reviewed your chart/records/visit/appointment details”) is prohibited.
  Detector: PHI_CONFIRMATION_BLOCK
  Required alternative: “For privacy reasons, we can’t discuss details here. Please contact our office directly.”
- ☐ Legal threats: “attorney,” “lawsuit,” “sue,” “served papers,” “court,” “demand letter.”
  Detector: LEGAL_THREAT_HOLD
  Required behavior: response_mode=blocked_manual_review; escalation_level=Legal; do not post.
- ☐ Safety incident / injury allegations with ongoing investigation (“hurt,” “injured,” “fire,” “gas leak,” “bleeding,” “burned”).
  Detector: SAFETY_INCIDENT_HOLD
  Required behavior: blocked_manual_review; escalation_level=Safety; do not post until internal review.

C. Prohibited content (must never be generated)
- ☐ Incentives/solicitation: no discounts, gift cards, “we’ll make it right with a free…,” no “leave us a review for…” (Google/Yelp).
  Detector: INCENTIVE_LANGUAGE_BLOCK
- ☐ Review gating: no “contact us first before reviewing,” no conditional asks.
  Detector: REVIEW_GATING_BLOCK
- ☐ Competitor disparagement or comparisons (“unlike XYZ,” “they are scammers”).
  Detector: COMPETITOR_ATTACK_BLOCK
- ☐ Medical outcome guarantees (dentist/med spa): “guaranteed results,” “cure,” “permanent,” “no risk.”
  Detector: MEDICAL_GUARANTEE_BLOCK

2) Escalation Playbook v2.1 (routing + SLAs)
Escalation levels
- L0: Auto-respond allowed (routine positive/neutral)
- L1: Auto-respond allowed + internal notify (mild service complaint)
- L2: Manual review required (strong negative, refund demand, suspected fake, staff named)
- L3: Safety (injury/damage), PHI/HIPAA risk, discrimination/harassment allegation → blocked_manual_review
- L4: Legal threat/active dispute → blocked_manual_review (Legal)

Routing matrix (who/when)
- Billing dispute/refund demand: Billing/Ops within 24h; response allowed only if non-admission and no account specifics.
- Service quality/late/no-show: Ops within 24h; L1 or L2 depending severity.
- Alleged damage/injury/safety: Owner/GM within 4h; L3 hold.
- Discrimination/harassment claim: Owner/HR same day; L3 hold.
- PHI/HIPAA mention: Compliance lead same day; L3 hold.
- Legal threat: Legal same day; L4 hold.

Evidence to collect (internal, not public)
- Timeline, job ticket/appointment record, staff on duty, photos (HVAC), consent forms (med spa), call logs, any written communications.

Do-not-post conditions (absolute)
- Any PHI confirmation risk, any legal threat, any safety incident pending investigation, any harassment/threats where response could escalate, any request to remove review or claim “Yelp/Google will take this down.”

3) Approved Response Template Library v2.1 (per vertical)
Rules for allowed variables
- Allowed: {business_name}, {city}, {contact_phone}, {contact_email}, {signoff_name_or_role}.
- Not allowed: reviewer name (unless already public and policy-safe), staff last names, appointment date/time, procedure details, pricing specifics unless user-provided and verified, any medical condition or treatment confirmation.
Platform notes
- Google: keep concise, no promotional offers tied to reviews.
- Yelp: avoid discussing Yelp moderation, do not imply you can remove reviews, avoid “please update your review” pressure.

Dentist templates
DENT-POS-01 (Positive): “Thank you for the kind words. We appreciate you choosing {business_name}. If there’s anything we can do to support your dental care going forward, feel free to contact us at {contact_phone}. — {signoff_name_or_role}”
DENT-NEU-01 (Neutral): “Thanks for the feedback. We’re always working to improve. If you’re open to sharing more details, please contact us at {contact_phone} so we can learn and help. — {signoff_name_or_role}”
DENT-NEG-01 (Mild negative): “We’re sorry to hear this didn’t meet expectations. For privacy reasons we can’t discuss specifics here, but we’d like to understand what happened. Please call {contact_phone} or email {contact_email}. — {signoff_name_or_role}”
DENT-NEG-02 (Strong negative, L2): “We take concerns seriously and want to look into this. Please contact {contact_phone} so we can address it directly. We’re unable to discuss any details publicly. — {signoff_name_or_role}”
DENT-FAKE-01 (Suspected fake): “We can’t find enough information to confirm this experience, and we take feedback seriously. Please contact {contact_phone} so we can look into it. For privacy reasons we can’t discuss details here. — {signoff_name_or_role}”
DENT-REC-01 (Service recovery): “Thank you for raising this. We’d like the opportunity to make things right where possible. Please reach out at {contact_phone} so we can review your concerns offline. — {signoff_name_or_role}”

Med Spa templates
MSPA-POS-01: “Thank you for your review. We’re glad you had a great experience at {business_name}. If you have any questions about future visits, contact us at {contact_phone}. — {signoff_name_or_role}”
MSPA-NEU-01: “Thanks for sharing your feedback. We’re always improving. Please contact {contact_email} so we can learn more and assist. — {signoff_name_or_role}”
MSPA-NEG-01 (privacy-safe): “We’re sorry to hear this. We can’t discuss details publicly, but we’d like to help. Please call {contact_phone}. — {signoff_name_or_role}”
MSPA-NEG-02 (outcome dissatisfaction; no guarantees): “We understand results can be a concern and we’d like to discuss your experience privately. Please contact {contact_phone} so we can review options. — {signoff_name_or_role}”
MSPA-FAKE-01: “We take feedback seriously, but we can’t confirm details here. Please contact {contact_phone} so we can look into this. — {signoff_name_or_role}”
MSPA-REC-01: “Thank you for letting us know. We’d like to address your concerns directly. Please email {contact_email}. — {signoff_name_or_role}”

HVAC templates
HVAC-POS-01: “Thanks for choosing {business_name}. We appreciate the review and the opportunity to help. If you need anything else, call {contact_phone}. — {signoff_name_or_role}”
HVAC-NEU-01: “Thank you for the feedback. We’re always improving. Please contact {contact_phone} so we can learn more. — {signoff_name_or_role}”
HVAC-NEG-01 (scheduling/communication): “We’re sorry to hear about the frustration. We’d like to understand what happened and help. Please call {contact_phone}. — {signoff_name_or_role}”
HVAC-NEG-02 (billing dispute; non-admission): “We’d like to review this with you and make sure everything is clear. Please contact {contact_phone} so we can look into it directly. — {signoff_name_or_role}”
HVAC-FAKE-01: “We take feedback seriously, but we don’t have enough information to confirm this job. Please call {contact_phone} so we can investigate. — {signoff_name_or_role}”
HVAC-REC-01: “Thank you for bringing this to our attention. We’d like the opportunity to address it offline. Please contact {contact_phone}. — {signoff_name_or_role}”

4) KPI / Weekly Report Accuracy QA (definitions + reconciliation)
Required KPIs
- Response rate = responded_reviews / total_reviews (by platform, date range).
- First-response time = time(posted_response) − time(review_created); report avg + median.
- SLA compliance % = % reviews responded within threshold (e.g., 24h) excluding blocked_manual_review.
- Escalations count by level + reason (Billing/Service/Safety/Legal/PHI).
- Blocked vs posted reconciliation: approved_count + blocked_count + posted_count must match workflow events; no “posted” without “approved” unless configured as auto-post.

Reconciliation rules (must pass)
- Any item with post_status=blocked_manual_review must not appear in “posted responses.”
- Weekly totals must equal sum of daily counts; platform subtotals must equal combined totals.

Acceptance criteria summary
- No incentives, no review gating, no removal promises, no competitor attacks.
- Any PHI confirmation language is blocked and replaced with generic privacy-safe phrasing.
- Legal-threat reviews trigger manual-only hold with escalation_level=Legal and post_status=blocked_manual_review.
- Audit logs include: review_source, review_id, review_text_hash, detector flags + versions, escalation_level, response_mode, human_approver_id (if applicable), timestamps for draft/approve/post/block, and final_response_text.

Expanded QA suite note
This pack assumes execution against a 50-review suite spanning dentist/med spa/HVAC plus Yelp-specific edge cases (review removal accusations, competitor baiting, incentive fishing). The suite’s expected outcomes must be met at 100% for Go/No-Go.
