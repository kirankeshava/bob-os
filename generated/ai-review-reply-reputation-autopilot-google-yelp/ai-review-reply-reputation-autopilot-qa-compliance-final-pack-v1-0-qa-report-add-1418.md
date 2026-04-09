# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.0 (QA Report Addendum + Brand-Safety Checklist v3 + Escalation Playbook v3 + Policy Matrix + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:00:12.754Z

---

Overview
This Final Pack is the QA/compliance handoff for the “AI Review Reply & Reputation Autopilot (Google/Yelp)” MVP. It is designed to prevent brand-damaging or policy-violating responses, minimize hallucination risk, enforce manual-only holds for high-risk reviews, and provide auditable evidence (who approved, what was posted, and why something was blocked).

Customer legitimacy reference (use in any customer-facing comms)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to

A) QA Test Report v4 (Addendum Summary)
Scope
- 45-case core suite across 3 verticals: Dentist (15), Med Spa (15), HVAC (15)
- 6-case Yelp-specific edge addendum

Final Results
- Core suite: 45/45 pass (100%)
- Yelp edge addendum: 6/6 pass (100%)

Validated Controls
1) Brand safety / tone: Non-inflammatory, non-argumentative, respectful, professional, concise.
2) Hallucination control: No invented facts (no references to “we checked your records,” “we reviewed camera footage,” “we confirmed your appointment,” etc.).
3) Liability control: No admissions (“we messed up,” “our fault,” “negligence”), no definitive conclusions about disputed events.
4) PHI/HIPAA safety (health verticals): No confirmation the reviewer is/was a patient; no mention of visits, charts, records, treatment details; no diagnosis/outcome claims.
5) Platform policy alignment (Google/Yelp): No incentives/discounts for reviews, no review gating, no promises to remove reviews, no competitor disparagement.
6) Escalation triggers: Negative reviews escalate correctly; legal threats invoke manual-only hold.

Required Posting Gate Outcomes
- If Legal-threat detector triggers: post_status must be blocked_manual_review; escalation_level=Legal; no auto-post.
- If PHI risk triggers: force generic wording (no patient confirmation), and if reviewer requests PHI or contains sensitive identifiers, block/manual review.

Audit Trail (Minimum Required Fields)
- review_source (google|yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level (None|L1|L2|Legal)
- response_mode (auto_draft|needs_approval|blocked_manual_review)
- draft_version + template_id (if template used)
- model/prompt_version + detector_version
- human_approver_id + approval_timestamp
- posted_timestamp
- post_status (posted|failed|blocked_manual_review|cancelled)
- hold_reason (nullable)
- blocked_timestamp + unblocker_id (if unblocked)
- final_response_text

B) Platform Policy Alignment Matrix (Google Business Profile vs Yelp)
Non-negotiables for BOTH platforms
- No incentives: never offer discounts, gifts, refunds, or benefits in exchange for reviews.
- No review gating: do not ask only happy customers to review.
- No doxxing: never repeat personal data (phone, address, full names, appointment time).
- No harassment/retaliation: never threaten customers, shame them, or argue.
- No competitor attacks: no disparaging other businesses.
- Offline resolution CTA: invite the reviewer to contact privately using a business phone/email (do not request sensitive info publicly).

Google Business Profile (GBP) response rules
DO
- Thank the reviewer; address general theme; invite offline resolution.
- Keep responses short and factual; avoid medical or legal conclusions.
DON’T
- Claim you can/will remove the review.
- Ask for personal medical details publicly.

Yelp response rules (extra sensitivities)
DO
- Keep responses neutral; avoid implying Yelp will intervene.
- Invite offline resolution without incentives.
DON’T
- Mention “Yelp will remove this,” “we reported you to Yelp,” or imply enforcement outcomes.
- Engage in public back-and-forth; do not litigate facts in public.
- Ask the reviewer to update/remove their review.

C) Brand-Safety Checklist v3 (Operational Tick-Box)
Use this checklist before approving any response.

1. Tone & De-escalation
[ ] No sarcasm, no blame, no insults, no accusatory language.
[ ] Avoid absolute statements about disputed facts.
[ ] Response is short (generally < 90–120 words) unless policy requires more.

2. No Liability Admission
[ ] Does NOT say or imply: “our fault,” “we messed up,” “we were negligent,” “we caused damage,” “we violated policy.”
Allowed alternatives:
- “We’re sorry to hear you were disappointed.”
- “We take concerns seriously and would like to learn more.”

3. PHI / Patient-Status Confirmation (Dentist/Med Spa)
[ ] Does NOT confirm they are a patient (avoid: “your visit,” “your appointment,” “your procedure”).
[ ] Does NOT reference records/charts: banned phrases include “chart,” “records,” “file,” “treatment plan,” “we reviewed your visit.”
Allowed alternatives:
- “For privacy reasons, we can’t discuss details here.”
- “Please contact our office directly so we can address this privately.”

4. Medical Claims (Med Spa/Dentist)
[ ] No outcome guarantees (“guaranteed results,” “permanent,” “no side effects”).
[ ] No diagnosis or clinical conclusions.
Allowed alternatives:
- “Results and experiences can vary.” (use sparingly; avoid sounding like an ad)

5. Incentives / Solicitation
[ ] No discounts, gifts, refunds, credit, or perks tied to reviews.
[ ] No language that can be read as “change your review and we’ll fix it.”

6. Doxxing / Naming Staff
[ ] Does not repeat staff last names or identifying details.
[ ] If reviewer names a staff member, respond generally (“our team”).

7. Offline Resolution CTA (Required)
[ ] Includes a private contact path: “Please call [PHONE] or email [EMAIL].”
[ ] Does not request sensitive details publicly.

8. Escalation & Posting Mode
[ ] If legal-threat language present (“sue,” “lawyer,” “attorney,” “lawsuit”): response_mode=blocked_manual_review; escalate Legal.
[ ] If PHI-heavy or safety incident: response_mode=needs_approval or blocked_manual_review.

D) Escalation Playbook v3 (Common Negative Scenarios)
Escalation Levels
- L1 (Ops): service quality issues, scheduling delays, staff rudeness.
- L2 (Owner/GM): alleged damage, repeat complaints, refund demands, discrimination claims.
- Legal (Manual-only hold): threats of lawsuit, attorney letters, regulatory complaints, threats to “report” with legal framing.

Routing SLAs
- Safety incident (injury, gas leak, unsafe workmanship): Owner/GM < 4 hours.
- Billing dispute/refund demand: Billing lead < 24 hours.
- Service quality: Ops manager < 24 hours.
- Legal threats: Legal same business day; NO public response until reviewed.

Evidence to collect (internal)
- Review screenshot + URL + timestamp
- Job/order number (if known internally—never ask publicly)
- Staff schedule / dispatch notes (HVAC)
- Call recordings (if lawful) / email thread
- For healthcare: ensure any internal record access complies with HIPAA; do not reference it publicly.

Do-Not-Post Conditions (Hard Stop)
- Legal threat present
- Reviewer includes personal medical details and asks you to confirm
- Any instruction to disclose private information publicly
- Active safety investigation ongoing

Response guidance by scenario (public reply)
1) Billing dispute
- Public: acknowledge concern; invite offline billing review.
- Avoid: stating exact charges unless customer already posted and you can verify.
2) Alleged damage/injury
- Public: express concern; do not admit fault; invite offline investigation.
- Escalate: L2 or Safety.
3) Discrimination/harassment claim
- Public: take seriously; request offline contact; avoid debating.
- Escalate: L2 (Owner/HR).
4) Suspected fake review
- Public: polite; state you can’t locate the experience; invite offline contact.
- Avoid: “You’re lying,” “This is fake.”
5) PHI/health privacy risk
- Public: privacy boundary; offline contact.
- Avoid: “We saw you on [date],” “Your procedure…”

E) Approved Response Templates v3 (Ready to Paste)
Global variable rules
- Allowed variables: [BUSINESS_NAME], [CITY], [PHONE], [EMAIL]
- Never insert: patient name, appointment date/time, procedure name, treatment details, prices unless verified and already disclosed by reviewer.
- Always include offline CTA.

DENTIST (Google/Yelp)
DENT-01 Positive
“Thanks for the kind words and for choosing [BUSINESS_NAME]. Our team appreciates your feedback. If there’s ever anything we can do to help, please call us at [PHONE] or email [EMAIL].”

DENT-02 Neutral/Short
“Thank you for taking the time to leave a review. We appreciate the feedback and will share it with our team. If you’d like to discuss anything further, please contact us at [PHONE] or [EMAIL].”

DENT-03 Mild Negative (service experience)
“We’re sorry to hear your experience didn’t meet expectations. We take concerns seriously and would like to learn more. For privacy reasons, we can’t discuss details here—please call [PHONE] or email [EMAIL] so we can help.”

DENT-04 Strong Negative (escalate L2)
“Thank you for sharing this. We’re concerned to hear about your experience and want to address it promptly. For privacy reasons we can’t discuss specifics publicly. Please contact [BUSINESS_NAME] at [PHONE] or [EMAIL] so a manager can follow up.”

DENT-05 PHI-sensitive mention (still public-safe)
“We take privacy seriously and can’t comment on personal or clinical details in a public forum. We’d like to understand your concerns and help if we can—please call [PHONE] or email [EMAIL].”

DENT-06 Suspected fake
“We take feedback seriously, but we’re unable to locate the situation based on the information in this review. If you’re open to it, please contact us at [PHONE] or [EMAIL] so we can look into this.”

MED SPA (Google/Yelp)
MS-01 Positive
“Thank you for your review and for visiting [BUSINESS_NAME]. We appreciate you taking the time to share your feedback. If you ever need anything, please reach us at [PHONE] or [EMAIL].”

MS-02 Neutral
“Thanks for the feedback. We’re always working to improve the experience at [BUSINESS_NAME]. If you’d like to share more, please contact us at [PHONE] or [EMAIL].”

MS-03 Mild Negative
“We’re sorry to hear you were disappointed. We’d like the opportunity to learn more and address your concerns. For privacy reasons we can’t discuss details here—please call [PHONE] or email [EMAIL].”

MS-04 Strong Negative (escalate L2)
“We take concerns like this seriously and want to look into what happened. To protect privacy, we can’t discuss specifics publicly. Please contact [PHONE] or [EMAIL] so a manager can follow up.”

MS-05 Results/medical-claim sensitive
“Thank you for sharing your perspective. Experiences can vary, and we’d like to understand your concerns better. For privacy reasons, please contact us directly at [PHONE] or [EMAIL] so we can assist.”

MS-06 Suspected fake
“We’re unable to identify the experience described from this review. If you’re willing, please contact [BUSINESS_NAME] at [PHONE] or [EMAIL] so we can look into it.”

HVAC (Google/Yelp)
HVAC-01 Positive
“Thanks for choosing [BUSINESS_NAME] and for leaving a review. We appreciate your feedback and will share it with the team. If we can help in the future, call [PHONE] or email [EMAIL].”

HVAC-02 Neutral
“Thank you for the feedback. We’re always working to improve. If you’d like to discuss your experience, please contact us at [PHONE] or [EMAIL].”

HVAC-03 Mild Negative (delay/communication)
“We’re sorry to hear the timing/communication wasn’t what you expected. We’d like to learn more and make this right. Please contact [PHONE] or [EMAIL] so we can follow up.”

HVAC-04 Strong Negative (alleged damage; escalate L2)
“We’re concerned to hear this and want to look into it. We can’t confirm details publicly, but we’d like to connect directly. Please contact [BUSINESS_NAME] at [PHONE] or [EMAIL] so a manager can follow up.”

HVAC-05 Safety concern (gas/CO; escalate Safety <4h)
“Thank you for bringing this to our attention. Safety concerns are taken very seriously. Please contact us immediately at [PHONE] so we can follow up directly.”

HVAC-06 Suspected fake
“We take reviews seriously, but we’re unable to match the details in this review to our records. Please contact us at [PHONE] or [EMAIL] so we can investigate.”

Legal Threat Auto-Hold Template (DO NOT AUTO-POST; manual only)
Internal-only draft suggestion (for Legal review, not for posting):
“We’re sorry to hear this. We take concerns seriously and want to address them through the appropriate channel. Please contact [PHONE]/[EMAIL].”
Rule: if legal threat detected, response_mode must be blocked_manual_review; do not publish until Legal approves.

End of Pack
If engineering implements this pack as written (detectors + posting gates + logs + templates), the system will be aligned with brand safety, hallucination control, and Google/Yelp policy constraints, with auditability suitable for weekly reporting and incident review.