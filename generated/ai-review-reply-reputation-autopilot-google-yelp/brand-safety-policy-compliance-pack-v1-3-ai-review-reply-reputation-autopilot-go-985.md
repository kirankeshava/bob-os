# Brand Safety & Policy Compliance Pack v1.3 — AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:06:33.020Z

---

Overview & scope
This pack is the operational source-of-truth for drafting/approving/posting review responses for Google Business Profile (GBP) and Yelp. It is designed to prevent brand damage, policy violations, and legal/PHI exposure while maintaining helpful, empathetic tone. Applies to three target verticals: Dentist, Med Spa, HVAC.

Hard rules (apply to all responses)
1) No PHI/HIPAA confirmation: Never confirm someone is/was a patient/client or reference visit details, charts, records, treatment plans, diagnoses, procedures, medications, appointment dates/times, insurance, billing codes, or any “we reviewed your chart/records/visit.” Even if the reviewer volunteers details, do not validate them.
2) No liability admission: Do not admit fault (“we messed up,” “our technician broke…,” “we caused…”). Use non-admission language (“We’re sorry to hear this,” “We’d like to learn more,” “We take concerns seriously”).
3) No medical outcome guarantees (dentist/med spa): Avoid promises like “guaranteed,” “permanent,” “zero pain,” “results assured,” or any individualized medical advice.
4) No incentives or review gating: Do not offer discounts, refunds, gifts, or “contact us and we’ll make it right if you change your review.” Do not ask only happy customers to review.
5) No doxxing/personal data: Never include phone numbers/emails of staff, last names, addresses, schedules, or identifying details of any individual. Avoid naming staff unless the business explicitly wants that and it’s low-risk; default to “our team.”
6) No threats/retaliation, no arguing: Keep calm, concise, empathetic. Do not accuse the reviewer of lying or threaten legal action.
7) Required offline CTA: For neutral/negative reviews, include a private-resolution CTA (call/email) without implying incentives. Use the business contact email if needed: agent_bob_replit+review-bot@agentmail.to.
8) Platform-safe wording: Do not mention or promise platform actions (e.g., “we will have Yelp remove this,” “Google will take it down”).

Manual-only hold (DO NOT POST) matrix
If any trigger below is detected, system must set post_status='blocked_manual_review', escalation_level as specified, and require human approver override.
A) PHI/HIPAA risk (Escalation: Privacy)
- Triggers: “my appointment,” “my procedure,” “my treatment,” “my x-rays,” “my chart/records,” “as your patient,” “when I visited on [date],” insurance details.
- Response mode: Generic, non-confirming OR hold if highly specific.
- Required log fields: detected_risk_flags includes 'PHI_RISK'; hold_reason='PHI_RISK'.
B) Legal threat (Escalation: Legal)
- Triggers: “attorney,” “lawsuit,” “sue,” “legal action,” “court,” “demand letter,” “BBB complaint” (treat as legal-adjacent).
- Response mode: Hold. No public back-and-forth.
- Log: 'LEGAL_THREAT'.
C) Safety incident / injury / property damage (Escalation: Safety/Ops)
- Triggers: “injury,” “hurt,” “bleeding,” “burn,” “fire,” “gas leak,” “carbon monoxide,” “flood,” “electrical hazard,” “damage to my home.”
- Response mode: Usually hold or very brief safety-first CTA + internal escalation.
- Log: 'SAFETY_INCIDENT'.
D) Discrimination/harassment/hate speech (Escalation: Owner/HR)
- Triggers: slurs, harassment, sexual misconduct allegations.
- Response mode: Hold; coordinate internal response.
- Log: 'HARASSMENT_DISCRIMINATION'.
E) Doxxing / staff identity attack (Escalation: Owner)
- Triggers: reviewer posts staff full name + identifiable info, or requests punishment.
- Response mode: Generic; do not repeat details.
- Log: 'DOXXING_RISK'.
F) Extortion/incentive demand (Escalation: Owner)
- Triggers: “refund or I’ll post,” “discount or I’ll remove,” “pay me.”
- Response mode: Calm, no incentive, offline CTA.
- Log: 'EXTORTION'.

Brand-safety checklist (ops tick-box)
Before approving any response:
- [ ] No PHI confirmation; no acknowledgement of patient/client relationship.
- [ ] No admission of fault or liability.
- [ ] No medical claims/guarantees; no individualized advice.
- [ ] No incentives, discounts, gifts, refunds tied to reviews.
- [ ] No competitor disparagement or comparisons.
- [ ] No platform removal promises.
- [ ] No staff personal data; no doxxing.
- [ ] Tone: calm, empathetic, brief; avoids arguing.
- [ ] Includes offline CTA for neutral/negative (email/phone) and invites resolution.
- [ ] If any hold trigger present → blocked_manual_review + escalation assigned.

Escalation playbook (common scenarios)
1) Billing/pricing dispute
- Internal route: Billing lead <24h.
- Public response goal: acknowledge concern + invite offline review of account; no price debate.
- Do: “We’d like to look into this—please contact us at agent_bob_replit+review-bot@agentmail.to with a way to reach you.”
- Don’t: disclose invoices, insurance, itemized charges.

2) Alleged poor quality/service failure (non-safety)
- Internal route: Ops manager <24h.
- Public: apologize for experience (not fault), invite offline.
- Collect: job ID, date, tech name (internal only), photos.

3) Safety incident/property damage/injury
- Internal route: Owner/GM <4h; safety lead immediate.
- Public: often HOLD. If posting is necessary, keep to safety-first + offline contact; no facts.
- Collect: incident report, photos, witness notes, insurer notification status.

4) PHI/medical details mentioned (dentist/med spa)
- Internal route: Privacy officer/Owner same-day.
- Public: generic non-confirming language or HOLD if specific.
- Do: “For privacy reasons, we can’t discuss details here, but we’d like to help—please email…”

5) Legal threat
- Internal route: Legal same-day.
- Public: HOLD. No debate.
- Collect: screenshots, timestamps, prior communications.

6) Suspected fake review
- Internal route: Owner/Ops <24h.
- Public: do not accuse; invite offline to verify details.
- Do: “We can’t locate this experience based on the details provided. Please contact us so we can look into it.”

Approved response templates (final, versioned) — variables allowed: {BusinessName}, {ContactMethod}, {ContactEmail}
Rules for variables: never insert patient/job specifics, appointment dates, procedure names, pricing unless verified and approved; never insert staff last names.

A) Universal positive (GBP/Yelp)
Template ID: GEN-POS-01
“Thank you for the kind words and for choosing {BusinessName}. We’re glad you had a great experience, and we appreciate you taking the time to leave a review.”

B) Universal neutral/short (GBP/Yelp)
Template ID: GEN-NEU-01
“Thanks for the feedback. We’re always working to improve, and we’d like to learn more about your experience. Please reach us at {ContactEmail} so we can follow up.”

C) Universal mild negative (GBP/Yelp)
Template ID: GEN-NEG-01
“We’re sorry to hear your experience didn’t meet expectations. We take feedback seriously and would like the chance to make this right offline. Please contact us at {ContactEmail}.”

D) Universal strong negative (GBP/Yelp)
Template ID: GEN-NEG-02
“Thank you for bringing this to our attention. We’d like to understand what happened and address your concerns. For privacy and accuracy, please contact us directly at {ContactEmail} so we can help.”

E) Suspected fake (GBP/Yelp)
Template ID: GEN-FAKE-01
“Thanks for the review. We’re not able to match this experience to our records based on the information provided. Please contact us at {ContactEmail} so we can look into this and help resolve any issue.”

F) Legal threat (GBP/Yelp) — MANUAL-ONLY HOLD DEFAULT
Template ID: GEN-LEGAL-HOLD
“Thank you for your feedback. We take concerns seriously and want to address them appropriately. Please contact us directly at {ContactEmail}.”
(Posting note: only use if Legal approves; otherwise block.)

Vertical-specific notes & templates

1) Dentist
Key restrictions: no confirming patient status; no discussing treatment, x-rays, diagnoses; no outcomes guaranteed.
Dentist positive
Template ID: DEN-POS-01
“Thank you for the kind review. We appreciate you choosing {BusinessName} and we’re glad you had a great experience with our team.”
Dentist negative (privacy-forward)
Template ID: DEN-NEG-01
“We’re sorry to hear this. For privacy reasons we can’t discuss details here, but we’d like to help and learn more. Please contact us at {ContactEmail}.”

2) Med Spa
Key restrictions: no guarantees (“permanent,” “no downtime”), no individualized guidance, avoid mentioning specific procedures in response.
Med spa positive
Template ID: SPA-POS-01
“Thank you for your review. We appreciate you choosing {BusinessName} and we’re happy you had a positive experience with our team.”
Med spa negative (no clinical discussion)
Template ID: SPA-NEG-01
“We’re sorry to hear this didn’t meet expectations. We’d like to learn more and address your concerns offline. Please email us at {ContactEmail}.”

3) HVAC
Key restrictions: avoid admitting property damage; avoid arguing about diagnosis; prioritize safety language if hazards are mentioned.
HVAC positive
Template ID: HVAC-POS-01
“Thanks for the review and for choosing {BusinessName}. We appreciate the feedback and we’re glad our team could help.”
HVAC negative (service recovery)
Template ID: HVAC-NEG-01
“We’re sorry to hear this. We’d like to understand what happened and help resolve it. Please contact us at {ContactEmail} so we can follow up.”
HVAC safety mention (consider HOLD)
Template ID: HVAC-SAFE-01
“Thank you for flagging this. Your safety is important to us. Please contact us directly at {ContactEmail} so we can follow up promptly.”

Google vs Yelp policy alignment (operational reminders)
- Both: no incentives, no fake reviews, no harassment, no sharing personal data.
- Yelp: avoid language implying you can remove reviews or that Yelp will act; do not ask for review updates in a transactional way; keep it factual and calm.
- GBP: similarly avoid removal promises; keep responses professional; do not solicit incentives.

Audit trail requirements (minimum)
Each review response must be traceable with: review_source, review_id, review_text_hash, detected_risk_flags, escalation_level, response_mode (auto/needs_approval/blocked_manual_review), draft_version, human_approver_id, approval_timestamp, posted_timestamp, post_status/error_code, final_response_text, model/prompt/detector_version, and (if blocked) hold_reason + blocked_timestamp + unblocker_id.

Customer legitimacy reference
When sharing documentation externally, reference the business website URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1 and contact email: agent_bob_replit+review-bot@agentmail.to.

Versioning
Pack version: v1.3 (2026-04-09). Any template edits must increment template version and update detector/unit tests accordingly.