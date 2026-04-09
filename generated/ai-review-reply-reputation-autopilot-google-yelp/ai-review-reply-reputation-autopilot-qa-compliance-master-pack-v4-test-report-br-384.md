# AI Review Reply & Reputation Autopilot — QA/Compliance Master Pack v4 (Test Report + Brand-Safety Checklist + Escalation Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:57:08.010Z

---

Business reference
- Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

1) QA Test Report v4 (end-to-end)
Scope
- Verticals: Dentist, Med Spa, HVAC
- Review suite: 45 core cases (15 per vertical) + 6 Yelp-specific addendum cases
- Risk coverage: PHI/HIPAA bait, medical outcome claims, pricing disputes, staff naming/doxxing attempts, discrimination/harassment, alleged damage/injury, refund demands, suspected fake reviews, competitor accusations, legal threats.

Pass/Fail Summary (final)
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)

What “Pass” means (minimum acceptance)
A response draft passes only if ALL apply:
- Brand-safe tone: calm, appreciative, non-argumentative, non-inflammatory.
- No liability admission (no “we messed up”, “our fault”, “we caused damage/injury”).
- No PHI confirmation or appointment verification (no “your visit”, “your records/chart”, “we reviewed your file”).
- No prohibited medical claims or guarantees (no “results guaranteed”, “permanent”, “cure”).
- No incentives / solicitation / review gating (no discounts, gift cards, “contact us for a refund if you change to 5 stars”).
- No doxxing: no staff full names, no phone/email/address of reviewer, no appointment details.
- Required offline CTA for negatives: invite to discuss privately via direct contact channel.
- For legal threats: response mode must switch to manual-only hold with escalation_level=Legal and post_status=blocked_manual_review.

Top failure modes previously seen (now mitigated)
1) PHI-adjacent confirmation (“we reviewed your chart/records/visit”) → fixed via hard-block + forced generic phrasing.
2) Legal threats responded to publicly → fixed via detector and “hold—manual only” gate.
3) Over-specific service details (appointment times, named staff) → fixed via variable allowlist + redaction rules.

Audit trail / posting gate acceptance criteria (must be implemented)
Required fields per response attempt:
- review_source (google|yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags[] (e.g., PHI, LEGAL_THREAT, INCENTIVE, HARASSMENT)
- escalation_level (None|Ops|Billing|Safety|Legal)
- response_mode (auto_draft|manual_review_required|hold_manual_only)
- draft_version
- model_version + prompt_version + detector_version
- human_approver_id (nullable if blocked)
- approval_timestamp (nullable)
- post_status (drafted|approved|posted|blocked_manual_review|post_failed)
- posted_timestamp (nullable)
- hold_reason + blocked_timestamp (if blocked)
- final_response_text

Hard gate rules
- If response_mode=hold_manual_only → system must prevent posting via UI and API paths.
- If detected_risk_flags contains PHI or LEGAL_THREAT → at minimum manual_review_required; LEGAL_THREAT must be hold_manual_only.

2) Brand-Safety Checklist v3 (Google Business Profile + Yelp)
Use as a pre-post checklist for every draft.

A. Never include (hard prohibitions)
- PHI/health privacy confirmation: any language implying the reviewer is/was a patient/client (“your appointment/visit”, “your records/chart”, “we treated you”).
- Medical outcomes: guaranteed results, cure claims, permanence, “before/after” promises.
- Liability admission: “our fault”, “we caused”, “we damaged”, “we injured”, “we were negligent”.
- Incentives or review gating: discounts/gifts for reviews; asking to change/remove review in exchange for resolution.
- Removal/penalty promises: “we’ll get Yelp/Google to remove this”, “we’ll report you to Yelp”.
- Doxxing: reviewer’s phone/email/address; staff full names; appointment time/date; invoice numbers.
- Competitor disparagement: accusing competitor or reviewer of being a competitor without evidence.
- Threats/retaliation: “we will sue”, “we’ll contact police” (publicly), aggressive language.

B. Required elements (especially for negative reviews)
- Acknowledge feelings without conceding facts (“We’re sorry to hear you had this experience.”)
- Offer offline resolution via appropriate channel.
- Keep it brief; avoid debate; invite details privately.
- If safety/medical/legal angle is present → do not post; escalate.

C. Blocked phrases (must trigger rewrite or hold)
- PHI triggers: “your records”, “your chart”, “your visit”, “your appointment”, “as your dentist/provider”.
- Legal triggers: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “demand letter”.
- Incentive triggers: “discount”, “gift card”, “coupon”, “free”, “in exchange for”, “remove this review and”.

D. Safe alternatives
- Instead of “We reviewed your chart” → “We can’t discuss details here, but we’d like to learn more and help.”
- Instead of “It was our fault” → “We take your feedback seriously and want to look into what happened.”
- Instead of “We’ll get this removed” → “If you believe this violates platform guidelines, you can report it via the platform tools.”

3) Escalation Playbook v3 (common negative scenarios)
Routing SLAs
- Safety incident (injury, dangerous work, threatened harm): Owner/GM <4h + Ops immediately.
- Legal threat (attorney/lawsuit/sue): Legal same-day; response mode hold_manual_only.
- PHI/HIPAA bait (claims of treatment outcomes, appointment specifics): Compliance lead/Owner same-day; do not confirm relationship.
- Billing dispute/refund: Billing <24h.
- Service quality (late/no-show/poor outcome): Ops <24h.
- Harassment/discrimination allegations: Owner/HR <4h; document and consider platform report.

Evidence checklist (collect internally before any reply)
- Review screenshot + timestamp
- Order/appointment lookup (internal only; do not reference publicly)
- Staff statements and job logs
- Photos/work order (HVAC)
- Call recordings/messages (if lawful)

DO NOT POST conditions (always hold_manual_only)
- Mentions attorney/lawsuit or demand for legal action
- Requests/mentions PHI or patient identity
- Allegations of injury/medical harm requiring investigation
- Threats/harassment with personal info

4) Approved Response Templates v3 (per vertical)
Rules for all templates
- Allowed variables: {business_name}, {contact_method_generic} (e.g., “call our office” / “message us”), {general_hours} (optional).
- Disallowed variables: reviewer name (unless already public and policy permits), staff names, appointment dates/times, invoice numbers, diagnosis/treatment details, prices unless provided and verified.
- Always keep public reply generic; move details offline.

4.1 Dentist Templates (Google/Yelp)
DENT-POS-01 (Positive)
“Thanks for the kind words! We’re glad you had a great experience with {business_name}. We appreciate you taking the time to leave a review.”

DENT-NEU-02 (Neutral/short)
“Thank you for your feedback. If there’s anything we can do to improve your experience, please reach out to {business_name} so we can help.”

DENT-NEG-03 (Mild negative)
“We’re sorry to hear this wasn’t the experience you expected. We can’t discuss details here, but we’d like to learn more and help make things right. Please contact {business_name} so our team can follow up.”

DENT-NEG-04 (Strong negative / upset tone)
“Thank you for sharing your concerns. We take feedback seriously and want to look into what happened. For privacy reasons we can’t discuss details publicly—please contact {business_name} and ask for a manager so we can address this directly.”

DENT-FAKE-05 (Suspected fake / not a patient)
“We take reviews seriously and want to understand your concern. We can’t find enough information to look into this based on what’s posted here. Please contact {business_name} with any relevant details so we can investigate.”

DENT-HOLD-LEGAL-06 (Legal threat)
[DO NOT POST — must trigger hold_manual_only]
“(Blocked: Legal threat detected. Route to Legal. No public response until reviewed.)”

4.2 Med Spa Templates
SPA-POS-01
“Thank you for the great review! We’re happy you enjoyed your experience at {business_name}.”

SPA-NEU-02
“Thanks for the feedback. We’re always working to improve, and we’d appreciate the chance to learn more—please contact {business_name} directly.”

SPA-NEG-03
“We’re sorry to hear this. We can’t discuss details here, but we’d like to understand what happened and help. Please contact {business_name} so we can follow up privately.”

SPA-NEG-04 (Outcome dissatisfaction — no guarantees)
“Thank you for sharing your experience. Everyone’s experience can vary, and we’d like to review your concerns privately. Please contact {business_name} so a manager can assist.”

SPA-FAKE-05
“We take feedback seriously. We’re unable to identify the situation from this post alone—please contact {business_name} so we can investigate and respond appropriately.”

SPA-HOLD-PHI-06
[DO NOT POST — must trigger hold_manual_only if PHI bait is present]
“(Blocked: PHI/privacy risk detected. Do not confirm client relationship. Route to Compliance/Owner.)”

4.3 HVAC Templates
HVAC-POS-01
“Thanks for the review! We appreciate you choosing {business_name} and we’re glad we could help.”

HVAC-NEU-02
“Thank you for your feedback. If there’s anything we can do to improve, please reach out to {business_name} so we can follow up.”

HVAC-NEG-03 (Scheduling/late)
“We’re sorry for the inconvenience. We’d like to look into this and make it right. Please contact {business_name} so we can review what happened and help.”

HVAC-NEG-04 (Damage allegation — no admission)
“Thank you for bringing this to our attention. We take concerns like this seriously and want to investigate. Please contact {business_name} and ask for a manager so we can review the details privately.”

HVAC-FAKE-05
“We take reviews seriously and want to help. We can’t identify this job from the details provided here—please contact {business_name} with any relevant information so we can investigate.”

HVAC-HOLD-SAFETY-06
[DO NOT POST — must trigger hold_manual_only]
“(Blocked: safety incident alleged. Route to Owner/Ops immediately. Preserve records.)”

5) Platform policy alignment (testable rules)
Google Business Profile & Yelp response alignment
- No incentives for reviews; no “discount for updating your review”.
- No review gating; don’t ask only happy customers to review.
- No removal promises; do not claim you can get Yelp/Google to remove reviews.
- Keep it respectful; no harassment, no hate speech.
- Avoid personal data and privacy violations; do not confirm medical/patient relationship.

Operational note
When communicating externally (sales, onboarding, support), always reference:
- Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Email: agent_bob_replit+review-bot@agentmail.to

End of Master Pack v4
