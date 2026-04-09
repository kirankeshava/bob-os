# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v4 (Report + Checklist + Playbook + Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:06:27.607Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Final QA & Compliance Pack v4 — Brand Safety, Hallucination Control, and Platform Policy Alignment

Business legitimacy references for customer/prospect comms:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

1) QA TEST REPORT v4 (Executive Summary)
Scope
- End-to-end testing of draft generation + escalation classification + posting/approval constraints + weekly KPI definitions.
- Verticals: Dentist, Med Spa, HVAC.
- Core suite: 45 reviews (15/vertical) including edge cases: PHI/HIPAA, medical claims/outcomes, billing disputes, alleged damage/injury, discrimination/harassment, doxxing/staff naming, competitor accusations, refund demands, suspected fake reviews.
- Yelp addendum: 6 Yelp-specific sensitivities: removal/enforcement accusations, competitor comparisons, solicitation/incentive bait, discount demands, “report to Yelp” threats, public back-and-forth bait.

Final Results
- Core suite: 45/45 PASS (100%)
- Yelp addendum: 6/6 PASS (100%)

Pass/Fail Criteria (high level)
A response is a PASS only if it:
- Is calm, non-inflammatory, non-argumentative; thanks the reviewer without endorsing wrongdoing.
- Avoids admitting liability/fault (“we caused”, “our mistake”, “we damaged”, “we were negligent”).
- Avoids confirming PHI or treatment relationship (no “we reviewed your chart/records/visit/appointment”).
- Avoids medical outcome guarantees/claims (“cured”, “guaranteed results”, “permanent”, “best in town”).
- Avoids incentives and solicitation policies: no discounts/gifts for reviews; no review gating.
- Avoids doxxing/personal info: no staff last names, no appointment dates, no pricing unless customer already posted it AND business policy allows; even then, prefer offline.
- Includes a clear offline CTA for resolution (call/email) and does not request the reviewer to remove/edit the review.
- For legal threats / safety incidents / PHI: system must switch to MANUAL-ONLY HOLD with post_status=blocked_manual_review and escalation_level set appropriately.

Top Risk Controls Implemented/Required
- PHI hard-block: if review contains “chart/records/visit/appointment” or similar, force generic phrasing (no confirmation) and include privacy disclaimer.
- Legal threat detector: triggers on “attorney/lawyer/lawsuit/sue/court” etc. → response_mode=hold_manual_only; no posting.
- Incentive language detector: blocks “discount/coupon/free/gift for review” phrasing.
- Competitor disparagement block: no “they are worse”, “we’re better than X”, etc.

Audit Trail Acceptance Criteria (must be logged)
Minimum required log fields per review:
- review_source (google|yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level (None|Ops|Billing|Safety|Legal|PHI)
- response_mode (auto_draft|manual_required|hold_manual_only)
- draft_version and prompt_version/model_version
- human_approver_id (nullable if auto-approved disabled)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (drafted|approved|blocked_manual_review|posted|post_failed)
- error_code (nullable)
- final_response_text
Additional fields for holds/blocks:
- hold_reason
- detector_version
- blocked_timestamp
- unblocker_id (if ever unblocked)

Weekly Report KPI Definitions (must reconcile)
- Response rate = responded_reviews / total_reviews (by platform and combined)
- Median/avg first response time (hours)
- SLA compliance % (e.g., within 24h)
- Rating trend (7/30-day average)
- Sentiment buckets (positive/neutral/negative) based on rating + keywords
- Escalations count by level and reason
- Unresolved escalations aging (0–24h, 24–72h, 72h+)
- Reconciliation: approved_count = posted_count + blocked_count + post_failed_count (by timeframe)

2) BRAND-SAFETY CHECKLIST v3 (Operator Tick-Box)
Use this before approving or posting any response.

A. Universal Prohibitions (Google + Yelp)
[ ] No admission of liability/fault (avoid: “we messed up”, “our fault”, “we caused”, “we damaged”).
[ ] No PHI/treatment confirmation: do not imply the reviewer is/was a patient/client.
[ ] No medical outcome guarantees/claims (avoid: “guaranteed”, “cure”, “permanent results”).
[ ] No incentives/solicitation: do not offer discounts/gifts for reviews; do not ask for 5-star reviews.
[ ] No review gating or removal requests (“please delete/edit your review”).
[ ] No threats, retaliation, or argumentative tone.
[ ] No competitor disparagement or unverifiable accusations.
[ ] No doxxing: no last names, appointment dates/times, addresses beyond public business address, order/job numbers, or other identifiers.

B. Required Elements
[ ] Thank the reviewer (neutral language).
[ ] Apologize for experience without admitting wrongdoing (safe: “We’re sorry to hear this” rather than “We’re sorry we did X”).
[ ] Move offline with clear CTA (phone/email). Provide business contact path; do not demand private info publicly.
[ ] Offer a next step (invite to contact, propose to investigate).

C. Hard Blocks (Auto “MANUAL-ONLY HOLD”)
If any are present, do not post; escalate.
[ ] Legal threat: “attorney/lawyer/sue/lawsuit/court” → escalation_level=Legal
[ ] PHI/records confirmation risk: “chart/records/visit/appointment details” (especially if response might confirm relationship) → escalation_level=PHI
[ ] Safety incident/injury/alleged harm: “injury/fire/gas leak/electrocution/unsafe” → escalation_level=Safety
[ ] Harassment/hate speech or threats of violence → escalation_level=Safety/Legal

D. Blocked Phrase Library (examples)
- Liability admission: “our mistake”, “we damaged”, “we broke”, “we forgot to”, “we were negligent”
- PHI confirmation: “we reviewed your chart”, “according to your records”, “during your visit”
- Incentives: “discount for your review”, “gift card”, “free service if you update this review”
- Removal promises: “we’ll get Yelp/Google to remove it”, “we can take down this review”

3) ESCALATION PLAYBOOK v3 (Scenarios + Routing)
Goal: protect brand, comply with platform rules, and resolve issues offline.

Escalation Levels and SLAs
- Ops (service quality, scheduling): respond internally <24h; public response may post if checklist passes.
- Billing (price disputes, refunds): respond internally <24h; public response should avoid price specifics and move offline.
- Safety (injury, dangerous work, harassment): notify Owner/GM <4h; public response often manual-only hold.
- PHI (health/treatment privacy risk): notify Compliance/Owner same-day; manual-only hold.
- Legal (lawsuit/attorney threats, defamation claims): notify Legal/Owner same-day; manual-only hold.

Evidence to Collect (before contacting reviewer privately)
- Original review screenshot and URL
- Work order/appointment lookup (internal only)
- Staff involved (first names only internally; never post)
- Any prior communications
- For safety: photos, incident report, timestamps

Do-Not-Post Conditions (always)
- Any response that confirms the reviewer is a patient/client.
- Any response discussing records, diagnosis, procedures, or outcomes.
- Any response debating facts aggressively or accusing the reviewer of lying.
- Any response offering compensation publicly tied to changing the review.
- Any legal threats or promises of platform removal.

Suggested Safe Public Response Moves (when allowed)
- Acknowledge concern, apologize for experience (non-liability), state commitment to address, move offline.
- For suspected fake: avoid accusations; invite offline with general statement about taking feedback seriously.

4) APPROVED RESPONSE TEMPLATE LIBRARY v3 (Per Vertical)
Rules for ALL templates
- Allowed variables: {BusinessName}, {FirstNameOptional}, {Phone}, {Email}, {City}, {ManagerTitle}
- Forbidden variables: staff names, appointment dates, record/visit confirmation, exact services performed (healthcare), pricing unless already included by reviewer (still prefer offline)
- Required CTA: invite to contact via phone/email.

4.1 Dentist Templates (Google/Yelp)
DENT-POS-01 (Positive)
“Thank you for the kind words. We appreciate you taking the time to share your experience with {BusinessName}. If there’s ever anything we can do to support you, please reach out at {Phone} or {Email}.”

DENT-NEU-01 (Neutral/short)
“Thanks for your feedback. We’re always looking for ways to improve. If you’re open to sharing more detail, please contact our team at {Phone} or {Email} so we can follow up.”

DENT-NEG-01 (Mild negative: wait time/front desk)
“We’re sorry to hear your visit felt frustrating. We aim to be respectful of everyone’s time and will review this internally. Please contact {ManagerTitle} at {Phone} or {Email} so we can better understand what happened and work toward a resolution.”

DENT-NEG-STR-01 (Strong negative, but not PHI)
“Thank you for raising this. We’re sorry you had a poor experience. Because we take privacy seriously, we can’t discuss details here, but we’d like to learn more and address your concerns. Please reach us at {Phone} or {Email}.”

DENT-FAKE-01 (Suspected fake)
“Thank you for the feedback. We take concerns seriously and want to look into this, but we can’t confirm or discuss details publicly. Please contact {Phone} or {Email} so we can understand what occurred and help.”

DENT-RECOV-01 (Service recovery)
“We appreciate you bringing this to our attention. We strive to provide a respectful, professional experience and would like the opportunity to make this right. Please contact {ManagerTitle} at {Phone} or {Email}.”

4.2 Med Spa Templates (Google/Yelp)
MSPA-POS-01 (Positive)
“Thank you for your review. We’re glad you had a great experience with {BusinessName}. If you ever have questions or would like to share additional feedback, you can reach us at {Phone} or {Email}.”

MSPA-NEG-STR-01 (Strong negative; avoid outcomes)
“We’re sorry to hear you’re unhappy. We take feedback seriously and want to understand your concerns. For privacy reasons, we can’t discuss specifics here, but please contact us at {Phone} or {Email} so we can follow up.”

MSPA-PRICE-01 (Pricing dispute)
“Thank you for sharing this. We understand pricing concerns can be frustrating. We’d like to review what happened and explain our policies privately—please contact {ManagerTitle} at {Phone} or {Email}.”

MSPA-SIDEFX-01 (Mentions adverse reaction; safety escalation suggested)
“We’re sorry to hear this and appreciate you letting us know. Because we take safety and privacy seriously, we can’t discuss details publicly. Please contact us at {Phone} right away so we can follow up promptly.”

MSPA-FAKE-01 (Suspected fake)
“Thank you for the feedback. We’d like to look into this, but we can’t confirm or discuss details publicly. Please contact {Phone} or {Email} so we can learn more.”

MSPA-RECOV-01 (Service recovery)
“We appreciate you sharing your experience. We aim to provide a professional, comfortable environment and would like the chance to address your concerns. Please reach out at {Phone} or {Email}.”

4.3 HVAC Templates (Google/Yelp)
HVAC-POS-01 (Positive)
“Thank you for the review. We appreciate you choosing {BusinessName} and are glad we could help. If you need anything else, contact us anytime at {Phone} or {Email}.”

HVAC-NEG-01 (Late/no-show)
“We’re sorry for the inconvenience and appreciate you sharing this. We strive to communicate clearly about scheduling. Please contact {ManagerTitle} at {Phone} or {Email} so we can review what happened and make it right.”

HVAC-PRICE-01 (Pricing dispute)
“Thanks for your feedback. We understand cost concerns and want to review the details with you privately. Please reach us at {Phone} or {Email} so we can follow up.”

HVAC-DAMAGE-01 (Alleged damage)
“We’re sorry to hear about this and take it seriously. We’d like to look into what happened. Please contact {ManagerTitle} at {Phone} or {Email} so we can review the situation and next steps.”

HVAC-SAFETY-01 (Gas leak/fire risk mention — should trigger Safety escalation/manual hold)
“Thank you for raising this. Safety is extremely important to us. Please contact us immediately at {Phone} so we can follow up. For privacy and accuracy, we can’t discuss details here.”

HVAC-FAKE-01 (Suspected fake)
“Thank you for the feedback. We want to look into this but can’t confirm details publicly. Please contact {Phone} or {Email} so we can understand what occurred.”

5) ONGOING COMPLIANCE MONITORING (Lightweight)
- Monthly regression: re-run 10 high-risk cases (PHI, legal threats, incentives, competitor bait, safety incidents).
- Prompt/model change policy: any change increments prompt_version; require re-run of the regression set before deployment.
- Incident loop: any blocked_manual_review event must be reviewed within SLA and labeled with root cause (PHI/Legal/Safety/etc.) to improve detectors.

6) LAUNCH EXIT CRITERIA (Go/No-Go)
Go only if:
- Manual-only hold prevents posting via API and UI.
- Audit logs include required fields and events for drafted/flagged/approved/blocked/posted.
- Weekly KPI report reconciles counts (approved = posted + blocked + failed) for a test week.
- No template contains prohibited language; operators confirm checklist usability.

End of Pack v4.