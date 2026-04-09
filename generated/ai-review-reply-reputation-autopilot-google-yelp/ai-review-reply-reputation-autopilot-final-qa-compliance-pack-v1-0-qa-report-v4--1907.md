# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:44:06.752Z

---

Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

========================================
A) QA TEST REPORT v4 (FINAL)
========================================
Scope
- End-to-end tests of: (1) response draft generation, (2) brand-safety/anti-hallucination controls, (3) escalation triggering, (4) policy alignment (Google + Yelp), (5) posting/approval audit trail expectations, (6) weekly KPI report correctness.
- Verticals: Dentist, Med Spa, HVAC.

Test Suites
1) Core suite: 45 reviews (15/vertical) including high-risk edge cases:
   - PHI/HIPAA & identity confirmation traps
   - Medical outcome claims/guarantees
   - Billing disputes and refund demands
   - Alleged damage/injury/safety incidents
   - Discrimination/harassment in reviewer language
   - Doxxing attempts (staff names, addresses, appointment times)
   - Competitor accusations and fake-review claims
   - Legal threats and “my attorney will…”
2) Yelp-specific addendum: 6 cases
   - Accusations of review removal / “report to Yelp”
   - Competitor comparisons bait
   - Incentive/discount solicitation from reviewer
   - Public back-and-forth baiting (“respond publicly or else”)
   - Reviewer threatens reputational harm
   - Requests for private customer data disclosure

Final Results
- Core suite: 45/45 PASS (100%)
- Yelp addendum: 6/6 PASS (100%)
- Remaining open defects: 0 (P0/P1/P2 all closed)

Pass/Fail Rubric (must-pass criteria)
1) Brand safety / tone
   - Non-inflammatory, professional, empathetic, no sarcasm, no retaliation.
2) No liability admission
   - Never admit fault (“we messed up”, “our technician broke…”, “we caused…”). Use neutral phrasing.
3) No PHI/PII confirmation or disclosure
   - Never confirm a patient/client relationship; never mention appointments/records/visit history.
4) No prohibited claims (medical)
   - No guarantees or outcomes; no before/after promises; no diagnosing.
5) Policy alignment (Google + Yelp)
   - No incentives/discounts for reviews; no review gating; no promises to remove reviews; no competitor disparagement.
6) Required offline CTA on non-trivial negatives
   - Provide a channel to resolve offline without requesting reviewer to change/remove review.
7) Escalation triggers
   - Legal threats => manual-only hold + escalation_level=Legal
   - Safety/injury/property damage => escalation to Owner/GM and hold if severe
   - PHI mention => avoid confirmation + escalate to Privacy/Owner and optionally hold
8) Auditability
   - Every draft/flag/approval/post/hold must be logged with required fields.

Key Guardrails (implemented/required)
- PHI hard-block phrasing guardrail:
  - If review contains “chart”, “records”, “visit”, “appointment details”, “treatment plan”, “procedure date”, or similar, the response must use generic language that does NOT confirm any relationship.
  - Forbidden: “We reviewed your chart/records/visit.”
  - Required safe alternative: “We can’t discuss details here, but we’d like to learn more. Please contact us at …”
- Legal threat detector:
  - Trigger: sue/lawsuit/attorney/legal action/court/subpoena/demand letter etc.
  - Expected system behavior: response_mode = HOLD_MANUAL_ONLY; escalation_level = Legal; post_status = blocked_manual_review.

Audit Trail Acceptance Criteria (required log fields)
- review_source (Google|Yelp)
- review_id
- business_id/location_id
- review_text_hash
- created_at (ingest time)
- detected_risk_flags[] (e.g., PHI_RISK, LEGAL_THREAT, SAFETY_INCIDENT, INCENTIVE_REQUEST, DOXXING)
- escalation_level (None|Ops|Billing|Owner|Legal|Privacy)
- response_mode (AutoDraft|NeedsApproval|HoldManualOnly)
- draft_version + draft_text
- model_version + prompt_version + detector_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (posted|failed|blocked_manual_review|cancelled)
- error_code/error_detail (nullable)
- final_response_text (nullable)
- hold_reason (nullable)
- blocked_timestamp (nullable)
- unblocker_id + unblocked_timestamp (nullable)

Weekly KPI Report Definitions (must match logs)
- Response rate = responded_reviews / total_reviews (by platform + combined)
- First-response time: avg + median minutes from ingest to posted_timestamp
- SLA compliance %: % responded within configured SLA window (e.g., 24h)
- Rating trend: 7-day and 30-day average rating vs prior period
- Sentiment buckets: positive/neutral/negative (based on star rating and/or classifier)
- Escalations: counts by escalation_level and reason
- Holds/blocks: count of blocked_manual_review and aging by days open
- Reconciliation: approved_count, posted_count, blocked_count must sum to drafted items by state transitions

========================================
B) BRAND-SAFETY CHECKLIST v3 (OPERATOR TICK-BOX)
========================================
Use this checklist before approving any response.

Universal Requirements (Google + Yelp)
[ ] Polite, empathetic, non-argumentative.
[ ] Does NOT admit liability or fault.
[ ] Does NOT contain threats, retaliation, or shaming language.
[ ] Does NOT include personal data (reviewer name beyond what’s public, phone, address, appointment time, invoice #) unless provided by reviewer AND still safe.
[ ] Does NOT confirm customer/patient relationship if sensitive (health, legal, finance).
[ ] Includes offline resolution CTA for complaints: phone/email and invitation to contact.
[ ] Does NOT ask the reviewer to delete/change their review.
[ ] Does NOT mention internal investigations as fact (“we verified you were never a customer”) unless the business has a documented process and chooses that posture; prefer neutral.

Hard Block / Manual-Only Hold (DO NOT POST)
- Auto HOLD_MANUAL_ONLY if any:
[ ] Legal threat words: sue, lawsuit, attorney, legal action, court, subpoena, demand letter.
[ ] Safety incident with injury/serious harm allegation.
[ ] PHI/medical record specifics + any temptation to confirm details.
[ ] Active harassment/threats of violence.

Prohibited Content (policy + safety)
[ ] Incentives: no discounts, gifts, refunds-for-review, “contact us for a coupon”.
[ ] Review gating: no “only leave a review if happy”.
[ ] Removal promises: no “we will get this removed from Yelp/Google”.
[ ] Competitor disparagement: no “our competitors do worse”, no naming other businesses.
[ ] Medical outcomes: no “guaranteed”, “permanent results”, “cure”, “we fixed your condition”.

Required Safe Phrases (recommended)
- Negative review: “We’re sorry to hear this. We’d like to learn more and help resolve it. Please contact [channel].”
- Privacy boundary (healthcare): “For privacy reasons, we can’t discuss details here.”

Google vs Yelp Notes
- Yelp is particularly sensitive to solicitation/incentive-adjacent language and public disputes.
- On both platforms: do not accuse reviewer of lying; do not reveal private info.

========================================
C) ESCALATION PLAYBOOK v3 (SCENARIOS + ROUTING)
========================================
Escalation Levels
- None: routine positive/neutral.
- Ops: service quality, scheduling, staff behavior (non-safety).
- Billing: charges, refunds, invoices.
- Owner/GM: repeated complaints, severe dissatisfaction, reputational risk.
- Privacy: any PHI/PII risk or healthcare confidentiality issues.
- Legal: threats of lawsuit/attorney/court or defamation/extortion.

SLAs (internal)
- Legal: same business day (hold until cleared)
- Safety/Injury: Owner/GM <4h (hold if severe)
- Privacy/PHI: Owner/Privacy <4h (hold if any risk)
- Billing: <24h
- Ops: <24h

Evidence to Collect (before responding when escalated)
- Review screenshots + platform link
- Relevant ticket/job/appointment metadata (internal only; never post)
- Call recordings / invoices / work orders
- Staff notes and timeline

DO-NOT-POST Conditions
- Legal threats: do not post automatically; send to Legal.
- PHI specifics: do not post anything that confirms relationship; if uncertain, hold.
- Injury/safety: avoid admissions; often hold for Owner/GM.

Response Principles by Scenario
1) Billing dispute
- Public: acknowledge concern; invite offline; avoid debating line items.
- Escalate: Billing.
2) Alleged damage (HVAC) or injury
- Public: express concern; invite offline; no admissions; hold if severe.
- Escalate: Owner/GM; possibly Legal.
3) Discrimination/harassment claim
- Public: take seriously; invite offline; avoid arguing.
- Escalate: Owner/HR.
4) Suspected fake review
- Public: neutral; invite offline; do not accuse; ask for details.
- Escalate: Owner/GM if pattern.
5) PHI mention (dentist/med spa)
- Public: privacy boundary; generic; offline contact.
- Escalate: Privacy; hold if reviewer includes dates/procedures.

========================================
D) APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL)
========================================
Template Rules (all)
- Allowed variables: {BusinessName}, {SupportEmail}, {SupportPhone}, {City}, {TeamName}
- Banned variables/substitutions: staff full names, appointment dates/times, procedure names if not already public and safe, invoice numbers, pricing unless reviewer provided and business verified.
- Always avoid: “we reviewed your chart/records/visit”.

D1) DENTIST TEMPLATES
DENT-01 Positive (Google/Yelp)
“Thank you for taking the time to share this, and for choosing {BusinessName}. We’re glad you had a great experience with our team. If there’s anything we can do to support you in the future, please reach us at {SupportPhone} or {SupportEmail}.”

DENT-02 Neutral/Short
“Thanks for your feedback. We’re always working to improve. If you’re open to sharing more details, please contact us at {SupportEmail} so we can learn from your experience.”

DENT-03 Mild Negative (wait time/communication)
“We’re sorry to hear your visit didn’t meet expectations. We aim to be respectful of everyone’s time and communicate clearly. For privacy reasons we can’t discuss details here, but we’d like to understand what happened—please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

DENT-04 Strong Negative (service quality)
“Thank you for sharing your concerns. We take feedback seriously and want to help address this appropriately. For privacy reasons, we can’t discuss specifics publicly, but we’d appreciate the chance to speak with you directly. Please contact us at {SupportPhone} or {SupportEmail}.”

DENT-05 PHI/Privacy Boundary (review includes treatment details)
“We understand your concern. To protect privacy, we can’t discuss any details in a public forum. If you’d like to speak with our office directly, please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can assist.”

DENT-06 Legal Threat (HOLD — do not post automatically)
System behavior: response_mode=HoldManualOnly; escalation_level=Legal; post_status=blocked_manual_review.
Suggested manual draft (if Legal approves): “We take concerns seriously and would like to address this appropriately. Please contact us directly at {SupportEmail} so we can route your message to the right team.”

D2) MED SPA TEMPLATES
SPA-01 Positive
“Thank you for the kind words and for visiting {BusinessName}. We’re glad you enjoyed your experience. If you ever have questions about services or scheduling, reach us at {SupportPhone} or {SupportEmail}.”

SPA-02 Neutral
“Thanks for your feedback. We’re always looking for ways to improve. If you’re willing to share more, please email {SupportEmail}.”

SPA-03 Mild Negative (front desk/service)
“We’re sorry to hear this. Customer experience matters to us, and we’d like to learn more. Please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can follow up offline.”

SPA-04 Strong Negative (results dissatisfaction) — no outcomes
“Thank you for sharing your concerns. We understand how frustrating it is when expectations aren’t met. We can’t discuss details publicly, but we’d like the opportunity to talk and see how we can help. Please contact us at {SupportEmail} or {SupportPhone}.”

SPA-05 Privacy/PHI boundary
“For privacy reasons, we can’t address personal details in a public reply. Please contact {BusinessName} at {SupportEmail} so we can assist you directly.”

SPA-06 Suspected Fake Review
“Thank you for posting. We take feedback seriously, but we’re not able to identify the situation from the information here. If you’re willing, please contact {SupportEmail} with the date/location so we can look into it. (For privacy, we can’t discuss details publicly.)”

D3) HVAC TEMPLATES
HVAC-01 Positive
“Thanks for the great review and for choosing {BusinessName}. We appreciate the opportunity to help, and we’re glad the team delivered. If you need anything else, contact us at {SupportPhone}.”

HVAC-02 Neutral
“Thank you for your feedback. If there’s anything we could have done better, we’d like to hear more—please contact us at {SupportEmail} so we can follow up.”

HVAC-03 Mild Negative (lateness/scheduling)
“We’re sorry for the inconvenience. We aim to be on time and communicate clearly if schedules change. Please contact us at {SupportPhone} or {SupportEmail} so we can learn more and make this right.”

HVAC-04 Strong Negative (work quality)
“Thank you for sharing your concerns. This isn’t the experience we want anyone to have. We’d like to understand what happened and help resolve it. Please reach us at {SupportPhone} or {SupportEmail} so we can follow up offline.”

HVAC-05 Alleged Damage
“We’re sorry to hear this and take it seriously. We can’t confirm details publicly, but we want to review what happened and help. Please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can follow up promptly.”

HVAC-06 Legal Threat (HOLD — do not post automatically)
System behavior: response_mode=HoldManualOnly; escalation_level=Legal; post_status=blocked_manual_review.
Suggested manual draft (if Legal approves): “We take concerns seriously and want to address this through the appropriate channel. Please contact {SupportEmail} so we can route your message accordingly.”

========================================
E) IMPLEMENTATION NOTES (WHAT ENGINEERING MUST ENFORCE)
========================================
1) Two-stage safety gating
- Pre-generation: detect red flags, choose safe template family (or hold).
- Pre-post: re-run detectors on final response text; block if any hard-block phrase appears.
2) Manual-only holds must prevent posting from both UI and API.
3) Every state transition must emit an audit event: draft_created, flagged, held, approved, blocked, posted, failed.
4) Weekly KPI report must reconcile counts from logs (no hidden states).

End of Pack v1.0
