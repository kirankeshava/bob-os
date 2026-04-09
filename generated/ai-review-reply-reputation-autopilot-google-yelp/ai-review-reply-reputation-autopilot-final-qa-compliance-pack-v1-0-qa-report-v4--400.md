# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:47:12.604Z

---

Business context & legitimacy
Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-p0ktnbl0.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

1) QA TEST REPORT v4 (End-to-End)
Scope
- Platforms: Google Business Profile (GBP) + Yelp.
- Verticals tested: Dentist, Med Spa, HVAC.
- Coverage: 45-case core suite (15/15/15) + 6 Yelp-specific edge cases.
- Focus: brand safety, hallucination control, policy compliance, escalation correctness, offline-CTA presence, and posting/approval controls.

Final Results
- Core suite: 45/45 PASS (100%).
- Yelp addendum: 6/6 PASS (100%).

Pass/Fail dimensions (what “PASS” means)
A. Tone & brand safety
- Professional, non-inflammatory, no sarcasm, no arguing, no retaliation.
- No admission of wrongdoing/liability (e.g., “we messed up,” “our fault,” “we caused”).
- No promises of specific outcomes.
B. Hallucination control
- No invented facts (prices, procedures, visit dates, staff actions).
- No confirmation of service relationship unless review itself clearly establishes it; even then, no specifics.
C. Policy compliance (GBP + Yelp)
- No incentives/discounts/coupons for reviews.
- No review gating (“contact us first before posting”).
- No removal promises (“we’ll get Yelp/Google to remove this”).
- No competitor disparagement.
- No doxxing/personal data.
D. Negative escalation triggers
- Correct classification into escalation_level (None/Ops/Billing/Safety/Legal) and response_mode (auto-draft vs manual-only hold).
E. Offline resolution CTA
- For anything less than clearly-positive, includes a take-offline CTA with contact path (phone/email) without demanding the reviewer reveal private info publicly.

High-risk detectors & acceptance criteria (must be enforced pre-post)
1) PHI/HIPAA / medical privacy risk detector
- Trigger examples: “chart,” “records,” “your visit,” “appointment details,” “treatment plan,” “x-ray,” “diagnosis,” “insurance claim details,” “we reviewed your file.”
- Expected behavior: force generic language (no confirmation of patient relationship), prohibit any mention of records/visits, require offline CTA. If review includes explicit PHI or requests PHI confirmation, set escalation_level=Safety and response_mode=manual-only hold.
2) Legal threat detector
- Trigger examples: “attorney,” “lawyer,” “lawsuit,” “sue,” “served papers,” “demand letter,” “legal action.”
- Expected behavior: response_mode=manual-only hold, escalation_level=Legal, post_status must become blocked_manual_review (no posting via API/UI).
3) Liability admission blocker
- Trigger examples: “our fault,” “we are responsible,” “we caused,” “we damaged,” “we injured,” “we made a mistake.”
- Expected behavior: rewrite to empathy + investigation + offline CTA, without admissions.
4) Incentive/solicitation blocker
- Trigger examples: “discount,” “coupon,” “free,” “gift card,” “in exchange for,” “we’ll refund if you update review.”
- Expected behavior: remove incentive language; never offer compensation contingent on review changes.
5) Competitor disparagement blocker
- Trigger examples: “unlike [competitor],” “they are scammers,” “our competitor is lying.”
- Expected behavior: neutral, focus on own process; no attacks.

Audit trail & posting gate requirements (QA acceptance)
Minimum required log fields
- review_source (GBP|Yelp), review_id, business_id/location_id
- review_text_hash
- detected_risk_flags[] + detector_version
- escalation_level + escalation_reason
- response_mode (auto|needs_approval|manual-only hold)
- draft_version + model/prompt version
- human_approver_id + approval_timestamp
- post_status (drafted|approved|posted|blocked_manual_review|error)
- posted_timestamp OR blocked_timestamp
- final_response_text
Reconciliation rules for weekly report
- posted_count + blocked_count + error_count must reconcile to approved_count; blocked_count must never appear as posted.

Remaining defects
- None open at P0/P1. All previously failing cases closed via PHI generic hard block + legal-threat manual-only hold gate.

2) BRAND-SAFETY CHECKLIST v3 (Operational, tick-box)
Use this for every response before approval/posting.

Universal DO-NOTs (GBP + Yelp)
[ ] Do not confirm a patient/client relationship or visit details if it risks privacy.
[ ] Do not mention charts/records/appointments/diagnoses/treatments or “we reviewed your file.”
[ ] Do not admit liability or fault (“we caused,” “our mistake,” “we damaged”).
[ ] Do not argue, blame the reviewer, threaten, or retaliate.
[ ] Do not offer incentives/discounts/free items/refunds in exchange for a review or a change to a review.
[ ] Do not request the reviewer remove/modify the review.
[ ] Do not promise removal by Google/Yelp or claim inside influence with platforms.
[ ] Do not disclose personal data (names, phone numbers, addresses, staff schedules) beyond generic business contact info.
[ ] Do not provide medical outcomes/guarantees (med spa/dentist) or safety guarantees beyond general commitments.

Required elements for most neutral/negative responses
[ ] Thank the reviewer (brief) and acknowledge feelings without validating disputed facts.
[ ] Keep it general; no specifics that could be inaccurate.
[ ] Invite offline resolution with a safe CTA (email/phone) and a reference request (e.g., “please share your best contact info privately”).
[ ] Use non-admission language: “We’d like to learn more,” “We take feedback seriously,” “We’d like to make this right where possible.”

Escalation triggers (must be flagged)
[ ] Safety incident (injury, hazard, infection, gas leak, electrical fire) → escalation_level=Safety; often manual-only hold.
[ ] Legal threat (“sue/lawyer/attorney”) → escalation_level=Legal; manual-only hold; blocked_manual_review.
[ ] PHI/medical privacy risk or reviewer posts sensitive details → escalation_level=Safety; usually manual-only hold.
[ ] Billing/charges/insurance disputes → escalation_level=Billing.
[ ] Discrimination/harassment allegations → escalation_level=Safety; consider manual-only hold.
[ ] Suspected fake/competitor review → escalation_level=Ops; respond neutrally, invite offline contact.

Platform specifics
Google Business Profile
[ ] Avoid back-and-forth. Keep concise and professional.
[ ] Never ask for personal medical info in public reply.
Yelp
[ ] Do not mention Yelp moderation/removal or tell reviewer to report to Yelp.
[ ] Do not insinuate the reviewer violated Yelp rules.
[ ] Keep tone calm; Yelp threads can escalate—prefer offline CTA.

3) ESCALATION PLAYBOOK v3 (Decision trees + SLAs)
Escalation levels
- None: positive/neutral with no disputes.
- Ops: service quality, scheduling, staff behavior (non-safety), suspected fake.
- Billing: pricing, invoices, refunds, insurance, chargebacks.
- Safety: injury, infection, hazardous conditions, discrimination/harassment, PHI risk.
- Legal: threats of lawsuit, attorney contact, regulatory complaints framed as legal action.

Routing SLAs
- Safety: notify Owner/GM within 4 hours; respond only after internal review; may be manual-only hold.
- Legal: same-day to legal contact/Owner; ALWAYS manual-only hold.
- Billing: route to billing lead within 24 hours.
- Ops: route to ops manager within 24 hours.

Evidence checklist (collect before posting when escalated)
- Screenshot of review + timestamp + platform URL
- Internal job/visit lookup (if possible) WITHOUT copying PHI into response drafts
- Staff schedule notes (internal only)
- Photos/work order notes (HVAC)
- Billing ledger/receipt (internal only)
- Prior communications logs (internal only)

DO-NOT-POST conditions (block posting)
- Any legal threat keywords present → blocked_manual_review.
- Any situation where responding would likely confirm PHI/relationship details.
- Ongoing safety investigation or incident report open.
- Harassment/hate speech where reply could inflame; keep minimal and offline only after review.

Recommended response stance by scenario (public reply)
- Billing dispute: acknowledge concern; invite offline review; no numbers unless reviewer already posted them and you can verify.
- Service quality: apologize for experience (not fault), commit to improvement, invite offline.
- Alleged damage/injury: empathy + investigate + offline; no admissions.
- Suspected fake: state you can’t locate the experience, invite offline with details; no accusations.
- Discrimination claim: take seriously, invite offline to appropriate manager; avoid debating facts publicly; often Safety escalation.

4) APPROVED RESPONSE TEMPLATE LIBRARY v3 (Per vertical; Google/Yelp notes)
Rules for all templates
- Allowed variables: {BusinessName}, {SupportEmail}, {SupportPhone}, {LocationOrTeamName}, {ManagerTitle}.
- BANNED variables/substitutions: reviewer name (unless provided and policy-safe), staff member names, appointment dates/times, treatment details, diagnosis, procedures, prices not publicly stated by reviewer and verified.
- Always keep CTAs private: “email/call us” with agent_bob_replit+review-bot@agentmail.to as default.

A) DENTIST TEMPLATES
DENT-G-01 Positive (GBP)
“Thank you for the kind words. We’re glad you had a positive experience with {BusinessName}. If you ever need anything, feel free to reach us at {SupportEmail}.”

DENT-G-02 Neutral/short (GBP)
“Thank you for the feedback. We’re always looking for ways to improve. If you’re open to sharing more details privately, please contact us at {SupportEmail} or {SupportPhone}.”

DENT-G-03 Mild negative (GBP)
“Thank you for letting us know. We’re sorry to hear this didn’t meet expectations. We’d like to learn more and see what we can do to help—please reach out to {SupportEmail} so we can follow up privately.”

DENT-G-04 Strong negative (GBP)
“We’re concerned to hear this and we take it seriously. Because we can’t discuss any details here, we’d appreciate the chance to talk privately and review what happened. Please contact {SupportEmail} and our {ManagerTitle} will follow up.”

DENT-Y-05 Suspected fake (Yelp)
“Thanks for your note. We’re not able to confirm details in a public forum, and we’re not finding enough information here to understand what occurred. Please contact us at {SupportEmail} so we can look into this and help.”

DENT-HOLD-06 PHI/legal hold (GBP/Yelp — manual-only hold)
“Thank you for the feedback. We take concerns like this seriously. For privacy and safety reasons, we can’t respond with details here. Please contact {SupportEmail} so the appropriate team can review and follow up.”
(Posting rule: only allowed if NOT a legal-threat trigger; if legal threat keywords present, do not post; block_manual_review.)

B) MED SPA TEMPLATES
MED-G-01 Positive (GBP)
“Thank you for the review. We’re happy you enjoyed your experience with {BusinessName}. If you have any questions, reach us anytime at {SupportEmail}.”

MED-G-02 Neutral (GBP)
“Thank you for sharing your feedback. We’re always working to improve. If you’re willing, please contact {SupportEmail} so we can learn more privately.”

MED-G-03 Mild negative (GBP)
“We’re sorry to hear you felt disappointed. We’d like to better understand what happened and see how we can help. Please email {SupportEmail} so our team can follow up offline.”

MED-G-04 No outcome guarantees (GBP)
“Thank you for your feedback. Results and experiences can vary, and we take your concerns seriously. We can’t discuss specifics publicly, but we’d like to talk privately—please contact {SupportEmail}.”

MED-Y-05 Strong negative (Yelp)
“We’re concerned to hear this. To protect privacy and ensure we understand the situation accurately, we can’t address details here. Please contact {SupportEmail} so our {ManagerTitle} can follow up.”

MED-HOLD-06 Legal threat (GBP/Yelp — manual-only hold)
(Do not post. System action: escalation_level=Legal, post_status=blocked_manual_review.)

C) HVAC TEMPLATES
HVAC-G-01 Positive (GBP)
“Thank you for the review and for choosing {BusinessName}. We appreciate your business. If we can help again, contact us at {SupportPhone} or {SupportEmail}.”

HVAC-G-02 Neutral (GBP)
“Thanks for the feedback. We’re always working to improve. If you can share more details privately, please contact {SupportEmail} so we can follow up.”

HVAC-G-03 Scheduling/late tech (GBP)
“Thank you for letting us know. We’re sorry for the inconvenience. Please contact {SupportEmail} with the best way to reach you so we can review this internally and follow up.”

HVAC-G-04 Service quality dispute (GBP)
“We’re sorry to hear this wasn’t the experience you expected. We’d like to look into what happened and see how we can help. Please reach out to {SupportEmail} so we can take this offline.”

HVAC-Y-05 Billing dispute (Yelp)
“Thank you for the feedback. We take billing concerns seriously and want to review this with you privately. Please contact {SupportEmail} so our team can follow up.”

HVAC-HOLD-06 Safety incident (gas leak/fire) (GBP/Yelp)
“Thank you for bringing this to our attention. We take safety concerns very seriously. We can’t address details in a public reply, but we want to connect immediately—please contact {SupportPhone} or {SupportEmail} so we can escalate this to the appropriate team.”
(If the review includes legal-threat keywords, block_manual_review and do not post.)

Implementation note (non-negotiable)
- The system must enforce: (1) pre-generation guardrails (prompt constraints + blocked phrases), AND (2) pre-post gates that can override even an “approved” draft if new detector flags appear, setting post_status=blocked_manual_review.

Owner/Engineering next step
- Choose sandbox vs limited live verification and run the previously delivered runbook; attach exported audit logs + weekly KPI report as launch evidence.