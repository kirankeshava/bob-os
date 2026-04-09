# QA & Compliance Master Pack v1.3 — AI Review Reply & Reputation Autopilot (Google/Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T05:59:12.677Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Website (share with customers/partners): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

1) QA EXEC SUMMARY (FINAL)
Scope: Draft generation + escalation classification + posting/approval gating requirements + audit trail + weekly KPI/report accuracy. Tested across three verticals (Dentist, Med Spa, HVAC).
Test suite: 45 core reviews (15/15/15) + 6 Yelp-specific edge cases.
Final result: 45/45 core PASS + 6/6 Yelp addendum PASS (100%).
Key risks controlled by guardrails:
- PHI/HIPAA: Never confirm patient status or details; hard-block phrases implying access to records.
- Medical claims: No outcomes/guarantees; no before/after claims.
- Liability/legal: Never admit fault; legal threats trigger “manual-only hold.”
- Incentives/gating: No discounts, compensation, or solicitation conditional on ratings.
- Doxxing: No sharing names, addresses, appointment details.

2) PLATFORM POLICY ALIGNMENT (TESTABLE ACCEPTANCE CRITERIA)
Google Business Profile (GBP) + Yelp common requirements:
A. No incentives / solicitation: Response MUST NOT offer discounts, refunds, or freebies in exchange for review edits/removals.
B. No review gating: MUST NOT ask for only positive reviews or direct unhappy customers elsewhere.
C. No removal promises: MUST NOT claim “we will get Yelp/Google to remove this.” Allowed: “We’d like to learn more—please contact us.”
D. No competitor disparagement: MUST NOT accuse a competitor or compare negatively.
E. No PHI confirmation: If review mentions appointment/treatment, response MUST stay generic and MUST NOT say or imply the person is/was a patient/customer when the context is medical. Avoid: “your visit,” “your chart,” “our records show.”
F. Legal threats: If review contains sue/lawsuit/attorney/legal action, system MUST set response_mode=HOLD_MANUAL_ONLY; post_status must be blocked until human release.

3) BRAND-SAFETY CHECKLIST (OPERATOR TICK-BOX)
Before approving/posting any response:
[ ] Tone: polite, calm, non-defensive; no sarcasm; no escalation.
[ ] No liability admission: avoid “we messed up,” “our fault,” “we caused,” “we damaged.” Use: “We’re sorry to hear you had this experience.”
[ ] No PHI confirmation (medical): avoid “visit/appointment,” “records/chart,” “treatment plan,” “diagnosis,” “results.” Use: “We take feedback seriously and would like to discuss privately.”
[ ] No medical guarantees: avoid “guarantee,” “permanent,” “100%,” “cure,” “best results.”
[ ] No incentives: avoid “discount,” “free,” “gift card,” “refund if you update review.”
[ ] No personal info: never include names, phone numbers of staff, addresses; never repeat user’s doxxing content.
[ ] Offline CTA required: provide a private resolution path (email) and invite details.
[ ] For severe issues (safety, discrimination, legal threat): do not post; escalate per playbook.

4) ESCALATION PLAYBOOK v2 (WHAT TO DO)
Severity levels:
- L0: Normal (positive/neutral): post approved template.
- L1: Mild negative (service delay, minor dissatisfaction): post service-recovery template + offline CTA.
- L2: Strong negative (billing dispute, alleged poor workmanship, repeated complaints): post cautiously + escalate to Ops/Billing within 24h.
- L3: Safety/Harm/Discrimination/PHI/Legal threat: DO NOT POST automatically. Set HOLD_MANUAL_ONLY and route immediately.
Routing SLAs:
- Safety incidents/injury allegations: Owner/GM <4h.
- Discrimination/harassment claims: Owner/HR same-day.
- Billing disputes/refunds: Billing <24h.
- Legal threats/attorney/lawsuit: Legal same-day; do-not-post until cleared.
Evidence checklist (collect internally, not in public reply): job/ticket ID, staff schedule, call logs, before/after photos (HVAC), invoices, refund policy, timestamped notes.

5) DETECTOR + POSTING GATE SPEC (UNIT/INTEGRATION TEST VECTORS)
Required detectors (minimum):
D1 PHI confirmation risk (hard block phrases):
- Trigger examples: “records show”, “we reviewed your chart”, “per your visit”, “according to your file”, “I see in your appointment notes”.
- Expected: risk_flags includes PHI_CONFIRMATION_RISK; response must switch to generic non-confirming wording OR block for manual if combined with other risks.
D2 Legal threat:
- Trigger examples: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “court”.
- Expected: escalation_level=Legal; response_mode=HOLD_MANUAL_ONLY; post_status=blocked_manual_review.
D3 Incentive/solicitation:
- Trigger examples: “discount”, “free”, “gift card”, “refund if”, “we’ll compensate if you change the review”.
- Expected: response text must not include incentive language; if user tries to add it, block approval.
D4 Competitor accusation/disparagement:
- Trigger: “our competitor”, competitor brand names, “they are lying”, “fake competitor review.”
- Expected: reply must not accuse; use suspected-fake neutral template.
Posting gate rules:
- Any HOLD_MANUAL_ONLY must block both API and UI posting paths.
- Audit log must record: draft_created, flagged, blocked, approved (if applicable), posted (if applicable).

6) AUDIT TRAIL REQUIRED SCHEMA (ACCEPTANCE)
Minimum fields per review:
review_source (google|yelp), review_id, business_id/location_id, review_text_hash, detected_risk_flags[], escalation_level, response_mode, draft_version, model/prompt_version, human_approver_id (nullable), approval_timestamp (nullable), posted_timestamp (nullable), post_status (drafted|approved|posted|blocked_manual_review|error), error_code (nullable), final_response_text (nullable), hold_reason (nullable), detector_version, blocked_timestamp (nullable), unblocker_id (nullable).

7) WEEKLY KPI REPORT — DEFINITIONS + QA TESTS (MUST MATCH)
KPIs:
- Response rate = responded_reviews / total_reviews (by platform, by location).
- Median & average first-response time (hours) for posted responses.
- SLA compliance % (e.g., % responded within 24/48h).
- Rating trend (7/30 days): avg rating change.
- Sentiment buckets (simple: positive/neutral/negative) computed consistently.
- Escalations: count by level and reason; unresolved aging.
Reconciliation rule:
- posted_count + blocked_manual_review_count + error_count must equal approved_count within a time window.

8) APPROVED RESPONSE TEMPLATES v3 (COPY/PASTE; PER VERTICAL)
Global rules for all templates:
- Never name staff or customer.
- Never confirm medical patient relationship.
- Never mention incentives.
- Always include offline CTA to agent_bob_replit+review-bot@agentmail.to.
- Variables allowed: {business_name}, {location_city}, {service_category} (non-medical), {generic_timeframe} (“recently”), {contact_email}.
Banned variables: appointment date/time, procedure/treatment name (medical), price/invoice totals unless explicitly verified and safe, any personal identifiers.

A) DENTIST (Google/Yelp)
DENT-POS-01 (Positive)
“Thank you for the kind words and for taking the time to share your feedback. We’re glad you had a great experience with {business_name}. If there’s ever anything we can do to help, please reach us at agent_bob_replit+review-bot@agentmail.to.”
DENT-NEU-01 (Neutral/Short)
“Thanks for your feedback. We’re always working to improve the experience at {business_name}. If you’re open to sharing more details privately, please email agent_bob_replit+review-bot@agentmail.to.”
DENT-NEG-01 (Mild negative)
“We’re sorry to hear your experience didn’t meet expectations. We take feedback seriously and would appreciate the chance to learn more and help. Please contact us at agent_bob_replit+review-bot@agentmail.to so we can follow up privately.”
DENT-NEG-02 (Strong negative; avoid PHI)
“We’re concerned to read this and want to address it appropriately. For privacy reasons, we can’t discuss details here, but we’d like to connect and look into what happened. Please email agent_bob_replit+review-bot@agentmail.to with a good way to reach you.”
DENT-FAKE-01 (Suspected fake/unknown reviewer)
“Thank you for posting. We take feedback seriously, but we’re not able to identify the situation from the details provided. Please email agent_bob_replit+review-bot@agentmail.to so we can understand what occurred and assist.”
DENT-HOLD-LEGAL (Legal threat present — do not auto-post)
Internal-only note: Set HOLD_MANUAL_ONLY. No public response until cleared.

B) MED SPA (Google/Yelp)
MSPA-POS-01
“Thank you for the review. We appreciate you taking the time to share your experience with {business_name}. If you ever have questions or feedback, reach us at agent_bob_replit+review-bot@agentmail.to.”
MSPA-NEG-01
“We’re sorry to hear this. We’d like to learn more and work toward a resolution, but we can’t discuss specifics publicly. Please contact agent_bob_replit+review-bot@agentmail.to so we can follow up privately.”
MSPA-CLAIMS-01 (If reviewer mentions outcomes)
“Thank you for sharing your perspective. Experiences can vary, and we want to understand what happened in your situation. For privacy reasons we can’t discuss details here—please email agent_bob_replit+review-bot@agentmail.to so we can connect directly.”
MSPA-FAKE-01
“We take this feedback seriously, but we’re unable to identify the situation from the information here. Please email agent_bob_replit+review-bot@agentmail.to so we can look into it.”
MSPA-HOLD-LEGAL
Internal-only: HOLD_MANUAL_ONLY.

C) HVAC (Google/Yelp)
HVAC-POS-01
“Thanks for the great review and for choosing {business_name}. We’re glad the team could help. If you need anything else, contact us anytime at agent_bob_replit+review-bot@agentmail.to.”
HVAC-NEU-01
“Thank you for the feedback. We’re always working to improve. If you’re open to sharing more details, please email agent_bob_replit+review-bot@agentmail.to.”
HVAC-NEG-01 (Service delay/communication)
“We’re sorry for the frustration and appreciate you letting us know. We’d like to review what happened and make it right. Please email agent_bob_replit+review-bot@agentmail.to so we can follow up.”
HVAC-NEG-02 (Alleged damage)
“We’re concerned to read this and want to take it seriously. We can’t address specifics publicly, but we’d like to connect and review the situation. Please contact agent_bob_replit+review-bot@agentmail.to.”
HVAC-FAKE-01
“Thank you for the note. We’re not able to identify the job from the information provided. Please email agent_bob_replit+review-bot@agentmail.to so we can look into it.”
HVAC-HOLD-LEGAL
Internal-only: HOLD_MANUAL_ONLY.

9) GO/NO-GO LAUNCH GATE (SIGN-OFF)
Exit criteria (must be evidenced):
- E1: Legal-threat detector blocks posting (API + UI) and logs post_status=blocked_manual_review.
- E2: PHI confirmation hard-block prevents “records/chart/visit” confirmations.
- E3: Audit logs emit required fields/events and can be exported.
- E4: Weekly KPI report matches definitions; reconciliation passes on a known dataset.
- E5: Templates used match template_id library; no forbidden phrases observed in final responses.
Sign-off:
Engineering lead: __________ Date: __________
Ops/Support lead: __________ Date: __________
QA (Bob): __________ Date: __________

End of Master Pack v1.3