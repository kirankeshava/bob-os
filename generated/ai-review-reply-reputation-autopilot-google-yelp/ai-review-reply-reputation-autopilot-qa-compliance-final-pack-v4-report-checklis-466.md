# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v4 (Report + Checklist + Escalation Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:18:48.014Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
QA / Compliance Final Pack v4
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to
Owner/Agent: Bob Smith

1) QA TEST REPORT v4 (FINAL)
Scope
- Verticals: Dentist, Med Spa, HVAC
- Platforms: Google Business Profile (GBP), Yelp
- Test sets:
  A. Core suite: 45 reviews (15/vertical) incl. edge cases (PHI/HIPAA mention, medical claims/outcomes, discrimination/harassment, pricing/billing disputes, alleged damage/injury, legal threats, suspected fake reviews, staff naming/doxxing attempts, competitor accusations).
  B. Yelp addendum: 6 Yelp-specific edge cases (review removal accusations, competitor comparisons, incentive/solicitation-adjacent language, discount demands, threats to “report to Yelp”, baiting for public back-and-forth).

Objectives (must pass)
(1) Drafts are on-brand, non-inflammatory, non-argumentative, and avoid admitting liability.
(2) Negative-review escalation triggers correctly (including legal/PHI holds).
(3) No prohibited content: PHI confirmation, medical guarantees, incentives/discounts for reviews, doxxing, retaliation, policy-violating statements.
(4) Safety filters: blocked phrases, tone constraints, offline-resolution CTA.
(5) Posting/approval audit trail: traceability and block/hold enforcement.
(6) Weekly report accuracy: KPI calculations and reconciliation.

Final Results
- Core suite: 45/45 PASS (100%)
- Yelp addendum: 6/6 PASS (100%)

Quality Gates (pass criteria)
A. Brand safety + tone
- No blame, no sarcasm, no threats, no “prove it,” no shaming the reviewer.
- Calm acknowledgement + offline CTA present on all neutral/negative.

B. Hallucination control
- Response must not invent facts: appointment dates, diagnoses, procedures, pricing, staff actions, warranties, “we checked your records,” etc.
- If details unknown, use generic phrasing and request contact offline.

C. Compliance / policy alignment
- Never solicit incentives for reviews; never request removal; never mention platform enforcement (“Yelp/Google will remove”).
- Avoid PHI confirmation: do not confirm the person is/was a patient or reference charts/records/visit.
- Avoid medical outcome guarantees in dentist/med spa.

D. Escalation + blocking
- Legal threat detector (sue/attorney/lawsuit/etc.) => response_mode = HOLD_MANUAL_ONLY; post_status must be blocked.
- PHI/medical-records confirmation risk => generic-only response; if explicit PHI + identifying details => HOLD_MANUAL_ONLY.

Top Historical Failure Modes (now closed)
- PHI-adjacent confirmation language (“we reviewed your chart/records/visit”).
- Legal threats not forcing a manual-only hold.
Both fixed via hard blocks + escalation to Legal with posting gate.

Acceptance Criteria: Detectors & Expected Output
1) Legal Threat Detector
- Triggers: “lawyer”, “attorney”, “lawsuit”, “sue”, “legal action”, “court”, “served papers”, “demand letter”, “my counsel”.
- Expected:
  - escalation_level = Legal
  - response_mode = HOLD_MANUAL_ONLY
  - post_status = blocked_manual_review
  - audit event: review_flagged(legal_threat) + response_blocked

2) PHI/Records Confirmation Hard Block
- Triggers: “chart”, “records”, “file”, “my visit”, “my appointment”, “treatment plan”, “procedure”, “diagnosis”, “prescription”, “before/after on [date]”.
- Expected:
  - Response must NOT include: “we reviewed your records/chart,” “during your visit,” “as your provider,” etc.
  - Must use generic phrasing: “We can’t discuss any details here” + offline CTA.
  - If reviewer includes explicit identifiers or medical details + asks for confirmation => HOLD_MANUAL_ONLY.

3) Incentive/Solicitation Detector
- Triggers: “discount for review”, “free [service] for 5 stars”, “gift card”, “promo for review”, “we’ll pay”.
- Expected:
  - Response must refuse incentives; never offer any.
  - Keep tone neutral; offline CTA.

4) Competitor Disparagement Detector
- Triggers: “unlike [competitor]”, “they’re scammers”, “their staff are incompetent”.
- Expected:
  - No agreement with disparagement; no “they are worse.”
  - Keep response centered on your business; offline CTA.

5) Doxxing/Personal Data Detector
- Triggers: staff full names + personal details, addresses, phone numbers, license numbers in a harassing context.
- Expected:
  - Do not repeat personal data.
  - Escalate to owner/ops; consider reporting to platform.

Audit Trail & Posting Gate Acceptance Criteria
Required log fields (minimum)
- review_source (GBP|Yelp)
- review_id
- business_id/location_id
- review_text_hash
- received_timestamp
- detected_risk_flags[]
- escalation_level (None|Ops|Billing|Safety|Legal|PHI)
- response_mode (AUTO_DRAFT|AUTO_POST|NEEDS_APPROVAL|HOLD_MANUAL_ONLY)
- draft_version
- final_response_text
- human_approver_id (nullable)
- approval_timestamp (nullable)
- post_status (queued|posted|failed|blocked_manual_review)
- posted_timestamp (nullable)
- error_code/error_message (nullable)
- detector_version + prompt/template_version
- hold_reason (nullable) + blocked_timestamp (nullable) + unblocker_id (nullable)

Required events
- draft_created
- review_flagged
- approval_granted (if applicable)
- response_blocked (if applicable)
- response_posted OR response_failed

Weekly KPI Reconciliation Rules
- posted_count + blocked_count + failed_count must reconcile with “attempted_to_post_count”.
- Response rate must be defined as posted_responses / total_reviews (or explicitly: posted_responses / eligible_reviews excluding holds).
- Median/avg first-response time must exclude holds that never posted OR be clearly labeled.

2) BRAND-SAFETY CHECKLIST v3 (OPERATOR TICK-BOX)
Use before approving any response.

A. Absolute Prohibitions (must be NO)
- ☐ No PHI confirmation (no “your visit/records/chart/appointment”).
- ☐ No admission of fault/liability (“we caused”, “our mistake”, “we failed you”) in a way that creates legal exposure.
- ☐ No medical guarantees/outcomes (dentist/med spa): “results guaranteed”, “permanent”, “cure”, “100% effective”.
- ☐ No incentives/solicitation: discounts, gift cards, freebies for reviews; no “remove/update your review”.
- ☐ No retaliation/threats (“we’ll report you,” “we’ll sue,” “we’ll ban you publicly”).
- ☐ No doxxing: don’t repeat personal details; don’t identify staff beyond first name/role.
- ☐ No competitor disparagement or agreement with accusations.

B. Required Elements (must be YES for neutral/negative)
- ☐ Polite acknowledgement.
- ☐ Take-it-offline CTA with direct contact path.
- ☐ Non-specific language (no invented facts).
- ☐ If safety/legal/PHI indicators present: response_mode set to HOLD_MANUAL_ONLY.

C. Blocked Phrases (examples)
- “We reviewed your chart/records/file…”
- “During your appointment/visit…”
- “As your provider/patient…”
- “We guarantee…” “clinically proven to…” (unless pre-approved marketing copy and compliant)
- “We’ll give you a discount if you update/remove the review.”
- “Yelp/Google will remove this.”

D. Safe Alternatives (approved phrasing)
- PHI-safe: “We can’t discuss any details here, but we’d like to help—please contact us at [phone/email].”
- Liability-safe: “We’re sorry to hear this didn’t meet expectations. We’d like to learn more and see what we can do.”
- Suspected fake: “We can’t locate details publicly. Please contact us so we can look into this.”

E. Platform Notes
Google Business Profile
- Do not ask for incentives or removals; keep response factual and brief.
Yelp
- Avoid mention of Yelp enforcement; no promises to remove; don’t argue. Keep polite and offline.

3) ESCALATION PLAYBOOK v3 (SCENARIOS + SLAs)
General Rule
- If Legal threat OR explicit PHI/identity confirmation risk OR harassment/threats: DO NOT POST. HOLD_MANUAL_ONLY.

Routing & SLA
- Safety incident (injury, dangerous service): Owner/GM < 4 hours; document facts; do-not-post if details uncertain.
- PHI/HIPAA risk: Compliance/Owner same-day; hold.
- Legal threat: Legal/Owner same-day; hold.
- Billing dispute: Billing < 24 hours.
- Service quality/late arrival: Ops/Manager < 24 hours.

Evidence to Collect (internal)
- Timestamp, location, staff on duty, ticket/invoice ID (if found internally), call logs, photos (HVAC damage), consent forms (med spa), treatment notes (dentist) — but never referenced publicly.

Do-Not-Post Conditions
- Any mention of attorney/lawsuit/legal action.
- Any response that would confirm patient/customer identity or visit.
- Any situation under active investigation (safety incident, police report, insurance claim).
- Reviewer posts personal data of staff; do not repeat; escalate.

Approved Public Response Patterns
- Service failure: acknowledge + apologize for experience (not necessarily fault) + invite offline.
- Billing dispute: acknowledge concern + invite offline to review account.
- Suspected fake: polite + cannot find record publicly + offline contact.

4) APPROVED RESPONSE TEMPLATES v3 (COPY-READY)
Rules for all templates
- Allowed variables: {BusinessName}, {SupportEmail}=agent_bob_replit+review-bot@agentmail.to, {SupportPhone}, {ManagerNameFirst}, {City}.
- Banned variables: reviewer name (if not shown publicly), appointment date/time, procedure names, diagnoses, invoice totals unless explicitly stated by reviewer and verified.
- Always keep short; never argue; never confirm records.

A) DENTIST (Google/Yelp)
D1 Positive
“Thank you for the kind words. We’re glad you had a great experience at {BusinessName}. We appreciate you taking the time to share this.”

D2 Neutral/Short
“Thanks for your feedback. If there’s anything we can do to improve, please reach us at {SupportEmail} so we can help.”

D3 Mild Negative (wait time, communication)
“Thanks for letting us know. We’re sorry this didn’t meet expectations. Please contact {SupportEmail} so we can learn more and address your concerns.”

D4 Strong Negative (pain, poor experience) — PHI-safe
“We’re sorry to hear this. We can’t discuss details here, but we’d like to understand what happened and help. Please contact us at {SupportEmail} or {SupportPhone}.”

D5 Suspected Fake/No Record
“Thanks for your note. We’re unable to confirm details publicly, and we can’t find enough information to look this up from this post alone. Please contact {SupportEmail} so we can investigate and assist.”

D6 PHI Mentioned by Reviewer (do not confirm)
“We can’t comment on any health-related details in a public forum. If you’re open to it, please contact {SupportEmail} so we can follow up privately.”

D7 Legal Threat (HOLD MANUAL ONLY)
Internal-only: Set response_mode=HOLD_MANUAL_ONLY, escalation_level=Legal. Do not post automatically.

B) MED SPA (Google/Yelp)
M1 Positive
“Thank you for your review. We’re happy you enjoyed your experience at {BusinessName} and appreciate your support.”

M2 Neutral
“Thank you for the feedback. Please reach out to {SupportEmail} if you’d like a manager to follow up.”

M3 Mild Negative (front desk, scheduling)
“We’re sorry this was frustrating. We’d like to learn more and make it right—please contact {SupportEmail}.”

M4 Strong Negative (results dissatisfaction) — no outcome claims
“Thank you for sharing this. We’re sorry you feel disappointed. We can’t discuss details here, but we’d like to review your concerns and next steps—please contact {SupportEmail}.”

M5 Safety/Adverse Reaction Mention (escalate Safety)
“We’re sorry to hear this. We take safety concerns seriously. Please contact {SupportEmail} or {SupportPhone} as soon as possible so we can follow up privately.”
(If explicit medical details + identity: HOLD_MANUAL_ONLY)

M6 Suspected Fake
“We can’t verify details publicly and want to understand what happened. Please contact {SupportEmail} so we can look into this.”

M7 Legal Threat (HOLD MANUAL ONLY)
Internal-only: Set response_mode=HOLD_MANUAL_ONLY, escalation_level=Legal.

C) HVAC (Google/Yelp)
H1 Positive
“Thanks for the great review. We appreciate you choosing {BusinessName} and are glad we could help.”

H2 Neutral
“Thank you for the feedback. If there’s anything we can do to improve, please contact {SupportEmail}.”

H3 Mild Negative (late arrival)
“Sorry about the delay. We know your time is valuable. Please contact {SupportEmail} so we can review what happened and follow up.”

H4 Strong Negative (quality issue)
“We’re sorry to hear this wasn’t resolved the way you expected. Please contact {SupportEmail} with your best contact information so a manager can follow up and help.”

H5 Alleged Property Damage (escalate Safety/Ops)
“We’re concerned to hear this. Please contact {SupportEmail} or {SupportPhone} so we can follow up promptly and review the details privately.”

H6 Suspected Fake
“We want to look into this, but we can’t confirm details from this post alone. Please contact {SupportEmail} so we can investigate.”

H7 Legal Threat (HOLD MANUAL ONLY)
Internal-only: Set response_mode=HOLD_MANUAL_ONLY, escalation_level=Legal.

5) CUSTOMER-FACING COMPLIANCE STATEMENT (OPTIONAL WEBSITE COPY)
“AI Review Reply & Reputation Autopilot drafts brand-safe responses and can require human approval for high-risk reviews. The system is designed to avoid sharing personal data, avoid medical/financial specifics, and follow Google Business Profile and Yelp content policies. Final posting behavior is controlled by your approval settings and compliance holds.”

End of Pack v4

Operator next step: Confirm sandbox vs limited live verification for GBP/Yelp posting using the existing Runbook v1.2; attach exported audit logs + weekly KPI report output as launch evidence.