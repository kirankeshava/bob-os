# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T05:31:01.898Z

---

Business/Legitimacy URL (share with customers as needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

1) QA TEST REPORT v4 (Final)
Scope
- Platforms: Google Business Profile (GBP) + Yelp
- Verticals: Dentist, Med Spa, HVAC
- Coverage: 45 core reviews (15/vertical) + 6 Yelp-specific edge cases = 51 total
- Risk categories: PHI/HIPAA, medical claims/outcomes, incentives/solicitation, liability admission, doxxing/staff naming, threats/harassment, discrimination claims, legal threats, suspected fake reviews, competitor accusations, billing disputes, safety incidents

Pass/Fail Rubric (response must satisfy ALL)
- Brand safety: calm, non-argumentative, non-inflammatory; no blame shifting.
- Liability: no admissions of fault (e.g., “we messed up”, “our technician caused…”).
- PHI/HIPAA: do not confirm patient/customer relationship or reference chart/records/visit; no appointment details.
- Medical: no diagnosis/outcome guarantees; no treatment advice beyond generic “contact us”.
- Incentives: no discounts/freebies/gifts in exchange for reviews; no review gating.
- Doxxing: no personal data, no staff last names, no addresses/phone numbers unless business-approved standard contact.
- Platform alignment: no promises to remove reviews; no threats/retaliation; no competitor disparagement.
- Required CTA: move resolution offline (call/email/message) without incentives.
- Hallucination control: do not invent details (dates, services, amounts, names).

Final Results (after guardrails)
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)
- Overall: 51/51 pass (100%)

Top Historical Failure Modes (Closed)
FM1 PHI confirmation language: “we reviewed your chart/records/visit” → FIX: hard-block phrases + forced generic response.
FM2 Legal threats: “my attorney will…” → FIX: detector forces manual-only hold; post_status=blocked_manual_review.
FM3 Medical outcome/guarantee drift → FIX: banned phrases and template swap.
FM4 Incentive-adjacent phrasing (“we’ll make it right with a discount”) → FIX: incentives hard ban.
FM5 Argumentative tone in suspected-fake reviews → FIX: neutral, fact-light, offline CTA.

Guardrails / Acceptance Criteria
A) Hard Blocks (must trigger safe-mode phrasing)
- PHI/relationship confirmation blocklist includes: “chart”, “records”, “your visit”, “your appointment”, “we saw you”, “as your dentist”, “as your patient”, “treatment plan”, “before/after”, “photos of you”, “we reviewed your file”.
Expected behavior: response must NOT confirm relationship; must use generic phrasing: “We take privacy seriously and can’t discuss specifics here. Please contact us…”

B) Manual-Only Hold (must prevent posting)
Trigger list includes: “attorney”, “lawyer”, “lawsuit”, “sue”, “court”, “legal action”, “demand letter”, “BBB complaint” (optional), “press” (optional).
Expected behavior:
- escalation_level=Legal
- response_mode=hold_manual_only
- post_status=blocked_manual_review
- UI/API: cannot post until explicitly unblocked by authorized role.

C) Incentives / Solicitation
Hard ban language: “discount”, “coupon”, “free”, “gift card”, “reward”, “in exchange for”, “leave us a 5-star”, “we’ll compensate for a review”.
Expected behavior: model must not propose incentives and must not request only positive reviews.

D) Audit Trail (minimum required fields)
- review_source (GBP/Yelp)
- review_id
- business_id/location_id
- review_text_hash
- created_at
- detected_risk_flags[]
- escalation_level
- response_mode (auto_draft / hold_manual_only)
- draft_version
- model_version/prompt_version
- human_approver_id (nullable if hold)
- approval_timestamp
- posted_timestamp (nullable if blocked)
- post_status (posted / failed / blocked_manual_review)
- hold_reason (nullable)
- detector_version
- final_response_text
Required events: draft_created, flagged, approved, blocked, posted, post_failed.

E) Weekly KPI Report Accuracy (definitions)
- Response Rate = (# reviews responded to) / (# total reviews received)
- First Response Time = posted_timestamp - review_created_at (median + average)
- SLA Compliance % = % responded within target window (configurable)
- Rating Trend = avg rating last 7/30 days vs prior period
- Sentiment Buckets = positive/neutral/negative (rules must be documented)
- Escalations by Level/Reason = count grouped by escalation_level and trigger
- Reconciliation: approved_count = posted_count + blocked_count + failed_count (must balance)

2) BRAND-SAFETY CHECKLIST v3 (Ops Tick-Box)
Pre-Response (review ingestion)
[ ] Source identified (GBP or Yelp)
[ ] Review text stored; review_text_hash generated
[ ] Language detected; if non-English, respond in same language or use bilingual safe template
[ ] Risk flags evaluated: PHI, medical claim, incentive, legal threat, harassment/hate, safety incident, suspected fake, billing dispute

Hard Prohibitions (must never appear)
[ ] No PHI/relationship confirmation (no “we saw you”, “your appointment”, “your chart”)
[ ] No medical outcome promises (no “guaranteed results”, “permanent”, “cure”, “will fix”) 
[ ] No incentives/compensation for reviews (no discounts/gifts for removing/changing reviews)
[ ] No admissions of liability (“we caused”, “our fault”, “we damaged”) 
[ ] No threats/retaliation (“we’ll report you”, “we’ll sue you”) 
[ ] No competitor disparagement or comparisons
[ ] No doxxing: no full names, addresses, phone numbers of individuals; avoid staff last names
[ ] No promises of platform enforcement/removal (“we’ll get this removed by Yelp/Google”)

Required Elements in Public Replies
[ ] Polite thank-you + acknowledgement of feedback (generic)
[ ] If negative: empathy without admitting fault
[ ] Offline CTA (contact us to resolve)
[ ] No invented specifics (dates/services/charges) unless provided and verified
[ ] Keep concise (2–5 sentences) to reduce risk

Platform Notes
Google Business Profile
[ ] Avoid referencing private account data; keep neutral
Yelp
[ ] Do not imply Yelp will remove reviews; keep response professional and brief; avoid extended back-and-forth

3) ESCALATION PLAYBOOK v3 (Common Scenarios)
Escalation Levels
- L0 Auto-reply allowed (low risk: positive/neutral)
- L1 Ops follow-up (service quality, scheduling, simple dissatisfaction)
- L2 Billing/Refund (pricing dispute, charges, warranty)
- L3 Safety/Harassment (threats, hate speech, safety incident)
- L4 Legal (attorney/lawsuit/sue; demand letters; active litigation)

Global DO-NOT-POST Conditions (public reply must be blocked; manual-only hold)
- Any legal threat keywords (L4)
- Any PHI confirmation risk that cannot be removed without changing meaning
- Any ongoing safety investigation with potential liability exposure
- Any request to discuss private details publicly

Routing + SLA (internal)
- L1 Ops Manager: respond within 24h
- L2 Billing Lead/Owner: respond within 24h
- L3 Owner/GM: respond within 4h; document incident
- L4 Legal/Owner: same business day; no public posting until counsel review

Evidence Collection (before offline resolution)
- Service verification: job/visit ID (internal), date/time, staff involved (internal only)
- Billing: invoice, authorization, refund policy version
- Safety: photos, incident report, witness notes
- Suspected fake: check customer logs; do not accuse publicly

Approved Response Strategy by Scenario
A) Strong negative (non-legal)
- Public: empathize, invite offline, avoid specifics and fault
- Internal: assign owner + track resolution
B) Billing dispute
- Public: invite offline; mention willingness to review account privately
- Internal: billing review + documented decision
C) Suspected fake review
- Public: neutral: “We can’t locate your experience; please contact us…”
- Internal: verify; consider platform report via official channels (outside product)
D) Medical/clinical complaint (dentist/med spa)
- Public: privacy statement + offline CTA; no advice/claims
- Internal: clinician/medical director review

4) APPROVED RESPONSE TEMPLATES v3 (Per Vertical; Google/Yelp-safe)
Template Rules (apply to all)
- Allowed variables: {BusinessName}, {FirstNameOrTeam} (optional), {ContactMethod} (e.g., “call our office” / “message us”), {GeneralLocation} (optional city only)
- Disallowed variables: reviewer name, appointment date/time, procedure name unless reviewer already stated it and it is non-medical; invoice amounts unless verified; staff last names
- Always include offline CTA.

DENTIST (6)
DENT-POS-01 Positive
“Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. If there’s ever anything we can do to help, please reach out to us directly.”

DENT-NEU-02 Neutral/short
“Thanks for taking the time to share your feedback. If you’d like to tell us more, please contact {BusinessName} so we can follow up.”

DENT-MNEG-03 Mild negative (service/scheduling)
“Thank you for the feedback. We’re sorry to hear your experience didn’t meet expectations. Please contact {BusinessName} so we can learn more and work toward a resolution.”

DENT-SNEG-04 Strong negative (privacy-safe)
“We’re sorry you’re feeling this way. We take concerns seriously, but we can’t discuss details in a public forum. Please contact {BusinessName} directly so we can look into this and help.”

DENT-FAKE-05 Suspected fake/unmatched
“Thank you for the review. We’re unable to locate the experience you described. Please contact {BusinessName} so we can understand what happened and address any concerns.”

DENT-PHI-06 PHI-sensitive (forces privacy language)
“We take patient privacy seriously and can’t address specifics here. Please contact {BusinessName} directly so we can follow up appropriately and assist.”

MED SPA (6)
MSPA-POS-01 Positive
“Thank you for your feedback. We’re happy to hear you enjoyed your experience with {BusinessName}. Please reach out anytime if you have questions.”

MSPA-NEU-02 Neutral
“Thanks for sharing your thoughts. If you’re open to it, please contact {BusinessName} so we can learn more.”

MSPA-MNEG-03 Mild negative
“We appreciate the feedback and we’re sorry your visit wasn’t what you expected. Please contact {BusinessName} so we can follow up and make things right.”

MSPA-SNEG-04 Strong negative (no outcomes)
“We’re sorry to hear this. We take concerns seriously, but we can’t discuss details publicly. Please contact {BusinessName} so we can review your concerns privately.”

MSPA-FAKE-05 Suspected fake
“Thank you for the review. We’re not able to confirm the situation described here. Please contact {BusinessName} so we can understand and address your concerns.”

MSPA-SAFE-06 Medical-claim sensitive
“Thank you for your feedback. For privacy and safety, we can’t comment on individual situations here. Please contact {BusinessName} directly so we can assist.”

HVAC (6)
HVAC-POS-01 Positive
“Thanks for the great review. We appreciate you choosing {BusinessName}. If you ever need anything, please reach out.”

HVAC-NEU-02 Neutral
“Thank you for the feedback. Please contact {BusinessName} if you’d like us to follow up on your experience.”

HVAC-MNEG-03 Mild negative (timing/communication)
“Thanks for letting us know. We’re sorry for the frustration. Please contact {BusinessName} so we can review what happened and help.”

HVAC-SNEG-04 Strong negative (damage allegation-safe)
“We’re sorry to hear about your experience. We take concerns seriously, but we can’t resolve specifics here. Please contact {BusinessName} so we can look into this and work toward a solution.”

HVAC-FAKE-05 Suspected fake
“Thank you for the review. We can’t locate the service details described. Please contact {BusinessName} so we can verify and address any concerns.”

HVAC-BILL-06 Billing dispute
“Thank you for the feedback. We’d like to review this with you directly. Please contact {BusinessName} so we can look into the billing details and help resolve this.”

Customer-Facing Approval/Posting Note (to include in UI copy)
“All responses are drafted to be platform-safe and privacy-conscious. Please review before posting. You can preview and manage replies at: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Launch Exit Criteria (Go/No-Go)
- Detectors: PHI hard block + legal-threat manual-only hold verified via unit/integration tests
- Posting gate: blocked_manual_review cannot be bypassed via API or UI
- Audit logs: all required fields/events emitted; reconciliation balances
- KPI report: matches ground truth for a controlled test set

Owner Decision Needed (No cost)
- Confirm sandbox/test environment availability for GBP/Yelp posting, or approve limited live test on one low-risk location (3–5 posts maximum) to validate real posting blocks + audit logs + KPI reconciliation.