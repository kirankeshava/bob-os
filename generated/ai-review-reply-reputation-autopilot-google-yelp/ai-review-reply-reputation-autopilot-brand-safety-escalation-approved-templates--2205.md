# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates Pack v3 (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:12:48.562Z

---

Business reference (include in customer/partner comms):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

============================================================
1) BRAND-SAFETY CHECKLIST v3 (TICK-BOX)
============================================================
Use this checklist as (a) LLM prompt constraints, (b) pre-post validation rules, and (c) manual reviewer guidance.

A. Universal “MUST INCLUDE” elements
[ ] Thank the reviewer (neutral, non-sarcastic).
[ ] Keep tone calm, professional, and brief. No arguing.
[ ] Provide an offline resolution CTA (phone/email/DM invitation) WITHOUT incentives.
[ ] Avoid specifics; speak generally about policies/standards.
[ ] If negative: acknowledge feelings/experience without admitting fault.
[ ] No competitor references.
[ ] No claims about review removal, platform reporting outcomes, or penalties.

B. Universal “MUST NOT” elements (hard blocks)
[ ] No admission of liability: avoid “we messed up,” “our fault,” “negligent,” “malpractice,” “we caused,” “we damaged,” “we injured.”
[ ] No PHI / personal data confirmation: never confirm someone is a customer/patient or mention appointment details.
    Hard-block phrases: “your chart,” “your records,” “your visit,” “your appointment on,” “we reviewed your file,” “after reviewing your case.”
[ ] No medical outcome guarantees or definitive claims: “cure,” “guaranteed results,” “permanent,” “risk-free,” “100%,” “no side effects.”
[ ] No incentives or solicitation tied to reviews: “discount,” “coupon,” “free service,” “gift card,” “leave us a review for…,” “we’ll make it right with a discount.”
[ ] No doxxing: do not repeat phone numbers/addresses provided by reviewer; do not name staff unless reviewer already did AND it’s safe/approved (prefer omitting names).
[ ] No threats/retaliation: “we’ll sue,” “defamation,” “we will report you,” “we’ll have this removed.”
[ ] No discriminatory language; do not mirror harassment.

C. Response mode rules (automations)
- Mode: AUTO-POST OK (low risk)
  Conditions: positive/neutral review; no risk flags; no PHI; no legal/safety threats.
- Mode: NEEDS HUMAN APPROVAL
  Conditions: pricing/billing dispute; alleged rudeness; scheduling/no-show claims; suspected fake (but not threatening).
- Mode: HOLD — MANUAL ONLY (block posting)
  Conditions (any):
  [ ] Legal threats (“attorney,” “lawyer,” “lawsuit,” “sue,” “court,” “demand letter,” “small claims”)
  [ ] Safety incident/injury (“hurt,” “injured,” “fire,” “gas leak,” “shock,” “bleeding,” “infection,” “ER”)
  [ ] PHI triggers / patient identity details / medical record references
  [ ] Harassment/hate speech/credible threats
  Required: set escalation_level appropriately and do not allow posting through UI/API until cleared.

D. Safe alternatives (required phrasing patterns)
- Instead of PHI confirmation: “We take feedback seriously and would like to learn more. Please contact us directly…”
- Instead of liability admission: “We’re sorry to hear you felt disappointed. We aim to provide a high standard of service…”
- Instead of removal promises: “If you’re open to it, please reach us directly so we can address your concerns.”

E. Platform policy alignment notes
Google Business Profile (GBP):
- Do not ask for or offer incentives for reviews.
- Do not post private/confidential info.
- Keep responses relevant and non-harassing.
Yelp:
- Do not ask for reviews in a way that implies incentives or gating.
- Avoid discussing Yelp moderation/removal; do not claim you can “get it taken down.”
- Keep responses factual, calm, and offline-oriented.

============================================================
2) ESCALATION PLAYBOOK v3 (SCENARIOS, SLAs, DO-NOT-POST)
============================================================
Purpose: ensure high-risk cases are handled by humans fast, and public responses remain brand-safe.

Escalation Levels
- L0: Auto-Post OK
- L1: Human Approval Required (non-urgent)
- L2: Ops Urgent (service failure, potential refund)
- L3: Safety/Medical Incident (immediate)
- L4: Legal Threat / Litigation (immediate)

Routing & SLAs (recommended)
- L1 → Location Manager / Owner review within 24h
- L2 → Ops Lead + Owner within 24h; aim first response draft within 4–8h
- L3 → Owner/GM within 4h; incident documentation started same-day
- L4 → Owner + Legal same-day; PUBLIC RESPONSE = usually hold/no-post until counsel guidance

Evidence checklist by scenario
A) Billing/pricing dispute (L1/L2)
- Invoice/receipt ID, date of service, refund policy, any comms history.
- Public response: do not quote prices unless already public and verified; do not argue.
B) Service quality complaint (L2)
- Job notes (HVAC), appointment notes (dentist/med spa), staff roster, timestamps.
- Public response: empathy + offline CTA; no blame.
C) Alleged damage to property / injury (L3)
- Photos, incident report, tech/clinician notes, insurance details (internal only).
- Public response: generic concern + offline CTA; NO admission.
D) Discrimination/harassment allegations (L3)
- Witness notes, policy statement, immediate internal review.
- Public response: respectful, brief, offline CTA.
E) Suspected fake/competitor review (L1)
- Booking records check (internal), pattern analysis, reviewer details (do not publish).
- Public response: non-accusatory; invite offline contact.
F) Legal threat (“my attorney…”) (L4)
- Preserve evidence; freeze public response; counsel review.
- Public response: usually none; if required: “Please contact us directly” only after legal review.

DO-NOT-POST Conditions (hard stop)
- Any PHI/patient-identifying content, or any language that confirms patient/customer status in medical context.
- Any legal threat/litigation mention.
- Any safety incident with potential injury until internal owner review.
- Any harassment/hate speech where response might inflame situation; keep to minimal offline CTA or no response.

============================================================
3) APPROVED RESPONSE TEMPLATES v3 (VERSIONED, PER VERTICAL)
============================================================
Rules for ALL templates:
- Allowed variables only: {business_name}, {contact_channel} (e.g., “call our office at [number]” or “email [address]”), {location_city}.
- Forbidden variables: reviewer name, staff name (unless pre-approved), appointment date/time, procedure name, clinical details, pricing details unless already verified and approved for public posting.
- Required: offline CTA.

------------------------
3A) DENTIST TEMPLATES
------------------------
DENT-POS-001 (Positive)
“Thank you for taking the time to share your experience with {business_name}. We appreciate your feedback and are glad you were pleased with your visit. If there’s anything we can do to support you in the future, please reach out via {contact_channel}.”

DENT-NEU-002 (Neutral / short)
“Thank you for your feedback. We’re always working to improve the experience at {business_name}. If you’re open to sharing more, please contact us directly at {contact_channel} so we can learn from your comments.”

DENT-NEG-MILD-003 (Wait time / front desk / communication)
“We’re sorry to hear the experience didn’t meet expectations. At {business_name}, we aim to be respectful of everyone’s time and communicate clearly. Please contact us at {contact_channel} so we can better understand what happened and work toward a resolution.”

DENT-NEG-STRONG-004 (High dissatisfaction; no PHI confirmation)
“We’re sorry you felt disappointed. We take concerns seriously and would like to learn more, but we can’t address details in a public forum. Please contact {business_name} directly at {contact_channel} so we can review your feedback and help.”

DENT-FAKE-005 (Suspected fake/competitor; non-accusatory)
“Thank you for the note. We want to look into this, but we can’t confirm details publicly. Please contact {business_name} at {contact_channel} with any information you’re comfortable sharing so we can understand and address your concerns.”

DENT-LEGAL-HOLD-006 (Legal threat detected — HOLD, manual-only)
INSTRUCTION: Do not post automatically. Escalation L4.
Suggested minimal draft for legal review only:
“Thank you for your message. Please contact us directly at {contact_channel} so we can route your concerns appropriately.”

------------------------
3B) MED SPA TEMPLATES
------------------------
MEDSPA-POS-001 (Positive)
“Thank you for your kind words about {business_name}. We appreciate you taking the time to share your experience. If you have any questions or would like to share additional feedback, please reach us at {contact_channel}.”

MEDSPA-NEU-002 (Neutral)
“Thank you for your feedback. We’re always looking for ways to improve. If you’re open to it, please contact {business_name} at {contact_channel} so we can learn more.”

MEDSPA-NEG-MILD-003 (Service experience, no outcomes)
“We’re sorry to hear the visit didn’t meet expectations. We aim to provide a professional, welcoming experience at {business_name}. Please contact us directly at {contact_channel} so we can understand your concerns and see how we can help.”

MEDSPA-NEG-STRONG-004 (Dissatisfaction; avoid medical claims)
“Thank you for sharing your concerns. We take feedback seriously, and we’d like to discuss this privately. Please contact {business_name} at {contact_channel}.”

MEDSPA-OUTCOME-CLAIM-SAFE-005 (Reviewer alleges harm/side effects; HOLD)
INSTRUCTION: If injury/complication implied → Escalation L3 and HOLD.
Draft for manual review:
“We’re sorry to hear you’re having concerns. Because we can’t discuss details publicly, please contact us directly at {contact_channel} so we can route your message to the appropriate team.”

MEDSPA-FAKE-006 (Suspected fake)
“Thank you for the message. We’d like to look into this, but we can’t address specifics publicly. Please contact {business_name} at {contact_channel} so we can understand and assist.”

------------------------
3C) HVAC TEMPLATES
------------------------
HVAC-POS-001 (Positive)
“Thank you for choosing {business_name} and for sharing your experience. We appreciate your feedback and are glad we could help. If you ever need anything else, please contact us at {contact_channel}.”

HVAC-NEU-002 (Neutral)
“Thank you for your feedback. We’re always working to improve our service. If you’re willing, please reach out to {business_name} at {contact_channel} so we can learn more.”

HVAC-NEG-MILD-003 (Scheduling/late arrival)
“We’re sorry the timing didn’t meet expectations. We aim to be reliable and communicate clearly. Please contact us at {contact_channel} so we can understand what happened and work toward a resolution.”

HVAC-NEG-BILLING-004 (Pricing dispute)
“Thank you for sharing your concern. We’d like to review this with you directly. Please contact {business_name} at {contact_channel} so we can look into the details and help resolve the issue.”

HVAC-DAMAGE-CLAIM-HOLD-005 (Alleged property damage; HOLD)
INSTRUCTION: Escalation L3 (or L2 if minor) + HOLD for owner review.
Draft for manual review:
“We’re sorry to hear about your concern and would like to look into it. Please contact {business_name} directly at {contact_channel} so we can gather details and assist.”

HVAC-FAKE-006 (Suspected fake)
“Thank you for the note. We want to understand what happened, but we can’t confirm details publicly. Please contact {business_name} at {contact_channel} so we can look into your concern.”

============================================================
4) AUDIT TRAIL + WEEKLY REPORTING QA APPENDIX (ACCEPTANCE)
============================================================
A. Required audit log events (minimum)
- review_ingested
- risk_flags_detected
- draft_created
- draft_edited (optional)
- approval_requested
- approved OR rejected
- posting_attempted
- posted_success OR posted_failed
- blocked_manual_review (if HOLD)
- unblocked (if applicable)

B. Required fields (minimum)
review_source (google|yelp)
review_id
business_id + location_id
review_text_hash
review_rating
review_created_at
detected_risk_flags[] (e.g., PHI, LEGAL_THREAT, INCENTIVE, COMPETITOR, SAFETY)
escalation_level (L0-L4)
response_mode (auto|needs_approval|hold_manual_only)
draft_version + prompt_version + model_id
final_response_text
human_approver_id (nullable)
approval_timestamp (nullable)
post_status (posted_success|posted_failed|blocked_manual_review|not_posted)
post_error_code (nullable)
blocked_timestamp + hold_reason + detector_version (if blocked)

C. Weekly KPI reconciliation rules
- Responses Posted Count = count(post_status=posted_success)
- Responses Approved Count = count(approved)
- Blocked Manual Review Count = count(post_status=blocked_manual_review)
- “Approved vs Posted” delta must be explainable by (posted_failed + blocked_manual_review + not_posted).
- Median first-response time must use review_created_at → posted_timestamp (or approval_timestamp if measuring “time to draft/approval”; define both explicitly).

============================================================
5) IMPLEMENTATION NOTES (GUARDRAILS SUMMARY)
============================================================
Hard-block / HOLD triggers (must be enforced both pre-generation and pre-post):
- PHI confirmation cues: “chart/records/file/visit/appointment on [date]” → force generic language; disallow mention of attendance.
- Legal threats: “attorney/lawyer/lawsuit/sue/court” → response_mode=hold_manual_only; post_status=blocked_manual_review.
- Incentives: “discount/free/gift card/coupon” in relation to reviews → remove/replace; if user insists, require manual approval.
- Competitor disparagement phrases → remove; maintain neutral tone.

End of Pack v3.
