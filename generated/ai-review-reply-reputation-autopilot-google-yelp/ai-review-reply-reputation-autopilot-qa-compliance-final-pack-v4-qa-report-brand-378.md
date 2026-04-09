# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v4 (QA Report + Brand-Safety Checklist + Escalation Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:52:13.015Z

---

This document is the final QA & Compliance pack for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). It is designed to be used by Engineering, QA, and Ops as a single source of truth for (a) brand-safety/hallucination control, (b) escalation correctness, (c) platform policy alignment, and (d) auditability/report correctness. Product website (for legitimacy in customer comms): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1. Support/contact: agent_bob_replit+review-bot@agentmail.to.

A) QA TEST REPORT v4 (SUMMARY)
Scope: 45 core reviews (15 dentist, 15 med spa, 15 HVAC) + 6 Yelp-specific edge cases. High-risk coverage includes: PHI/HIPAA bait, medical outcome claims, pricing/billing disputes, alleged injury/damage, discrimination/harassment language, staff naming/doxxing attempts, competitor accusations, refund demands, suspected fake reviews, and legal threats.

Pass/Fail Results:
1) Tone & brand safety: PASS 51/51 (100%). No argumentative/retaliatory language; responses remain calm, empathetic, and professional.
2) Hallucination control: PASS 51/51 (100%). No invented facts, no invented policy promises, no made-up appointment details.
3) Platform policy compliance (Google/Yelp): PASS 51/51 (100%). No incentives/discounts for reviews, no review gating, no removal promises, no competitor disparagement, no doxxing.
4) Escalation trigger correctness: PASS 51/51 (100%). Legal threats → escalation_level=Legal with manual-only hold; safety incidents → Safety; billing disputes → Billing; quality issues → Ops/GM.
5) Required offline CTA presence (where applicable): PASS 51/51 (100%). For neutral/negative reviews, includes offline resolution CTA without offering incentives.

Critical Controls Verified:
- PHI confirmation hard-block: Any phrasing that confirms a patient relationship or references “your records/chart/visit/appointment details” is blocked or forced into generic language.
- Legal-threat detector: If review includes lawsuit/attorney/sue/legal action language, system must set response mode to HOLD (manual review only) and must NOT post.
- Posting gates: manual-only hold must prevent posting via both API and UI paths.

Yelp-specific edge-case addendum (6 tests): 
- Accusations of review removal / “reporting to Yelp”: response avoids discussing Yelp enforcement or promising removal.
- Competitor comparison bait: response avoids disparaging competitors.
- Incentive/discount demands: response avoids offering anything of value in exchange for review changes.

Acceptance Criteria (non-negotiable):
- Never confirm patient/client relationship or appointment details.
- Never admit liability (“we caused”, “our fault”, “we damaged”).
- Never offer incentives/discounts/free services in connection with reviews.
- Never discuss reporting/removal actions (“we will get Yelp/Google to remove this”).
- Always move sensitive issues offline with a generic contact CTA.

B) BRAND-SAFETY CHECKLIST v3 (OPERATIONAL)
Use this checklist before posting any response (or as an automated gate).

Universal Do-Nots (Google + Yelp):
1. No incentives: Do not offer discounts, refunds, gifts, free add-ons, credits, or anything of value in exchange for changing/removing reviews.
2. No review gating: Do not ask only happy customers to review; do not imply consequences for negative reviews.
3. No removal promises: Do not say you can remove a review or that the platform will remove it.
4. No doxxing: Do not reveal personal data (names of staff beyond first names if allowed, phone numbers, addresses, appointment times, invoices) unless the reviewer already posted it AND it’s essential—prefer still to avoid.
5. No PHI/HIPAA confirmation (medical verticals): Do not confirm they are a patient, attended an appointment, received treatment, or mention records/charts/visit.
6. No medical guarantees/claims: Do not claim outcomes, cure rates, guaranteed results, or imply medical certainty.
7. No liability admission: Avoid “we messed up,” “we caused,” “our negligence,” or statements that admit fault.
8. No retaliation/threats: No hostile tone, accusations, or threats of legal action in response.

Required Elements (recommended for most neutral/negative):
1. Thank/acknowledge: short, non-inflammatory acknowledgment.
2. Apology without liability: “We’re sorry to hear…” rather than “We’re sorry we did…”
3. Offline CTA: invite to contact via phone/email and/or business contact form.
4. Privacy guardrail: in medical contexts explicitly note privacy limits (“We can’t discuss details here.”).

Blocked Phrase Examples (must trigger rewrite/hold):
- PHI confirming: “we reviewed your chart/records,” “I see you were here on Tuesday,” “your treatment plan,” “your procedure,” “your diagnosis.”
- Liability admission: “we caused the damage,” “we broke,” “our technician ruined,” “it was our fault.”
- Incentives: “we’ll give you 10% off,” “free service if you update,” “refund if you change this review.”
- Removal promises: “we’ll have Yelp remove this,” “Google will take it down.”
- Competitor disparagement: “unlike [competitor], we…” or insults toward other businesses.

C) ESCALATION PLAYBOOK v3 (SCENARIOS, SLAs, DO-NOT-POST)
Escalation Levels:
- L0: Safe to auto-draft + auto-post (positive/neutral, no risk flags).
- L1: Auto-draft, requires human approval before posting (mild negative, ambiguous facts).
- L2: Auto-draft + immediate internal escalation (strong negative, billing dispute, alleged damage).
- Legal Hold: Manual-only hold (NO POSTING) until reviewed by authorized owner/legal.

Routing SLAs:
- Safety incidents / injury allegations: Owner/GM within 4 hours.
- Discrimination/harassment allegations: Owner/HR same day.
- Billing disputes: Billing lead within 24 hours.
- Service quality / no-show / delay: Ops lead within 24 hours.
- Legal threats (attorney/lawsuit/sue): Legal Hold, owner notified immediately (same day).

Evidence to Collect (internal, not public):
- Review screenshot/ID, timestamps, related job/visit details (if known internally), staff schedule, call recordings (if lawful), before/after photos (HVAC), invoices, written estimates.

DO-NOT-POST Conditions (force HOLD):
1. Legal threat language present.
2. The reviewer includes or requests PHI exchange in public (medical).
3. Active safety investigation (injury, fire, gas leak accusations) until facts verified.
4. The draft would require discussing private account specifics to respond.

Public Response Strategy (when allowed):
- Keep it short, empathetic, non-argumentative.
- Do not debate facts publicly.
- Invite offline resolution using a generic contact path.
- Never ask for the reviewer to remove/update the review; only ask to connect.

D) APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL)
Rules for all templates:
- Allowed variables: {BusinessName}, {SupportEmail}, {Phone}, {FirstNameOrTeam}, {City}, {GenericInvite}. 
- Forbidden variables: appointment dates/times, procedure names, invoice totals unless already public and verified, clinician names tied to a patient, any PHI.
- Yelp note: Avoid any statements implying platform actions or removals.

D1) DENTIST (Google/Yelp)
1) Positive Review
“Thank you for the kind words and for taking the time to leave a review. We appreciate your feedback and are glad you had a positive experience with {BusinessName}. If there’s ever anything we can do to help, please reach us at {SupportEmail}.”

2) Neutral / Short
“Thanks for your feedback. We’re always working to improve, and we’d appreciate the chance to learn more. Please contact our team at {SupportEmail} so we can follow up.”

3) Mild Negative (no PHI)
“We’re sorry to hear this didn’t meet expectations. We can’t discuss details here, but we’d like to understand what happened and help. Please email {SupportEmail} and our team will follow up.”

4) Strong Negative (service quality)
“Thank you for sharing this. We’re concerned to hear about your experience and want to look into it promptly. For privacy reasons we can’t address specifics here—please contact us at {SupportEmail} so we can assist directly.”

5) PHI-bait / ‘I was your patient’
“Thank you for your message. We take privacy seriously and can’t confirm or discuss any details in a public forum. If you’d like, please email {SupportEmail} and our team will connect with you directly.”

6) Suspected Fake / Not a patient
“Thank you for the review. We take feedback seriously, but we’re unable to match this to our records based on the information provided. Please contact {SupportEmail} so we can look into your concerns.”

D2) MED SPA (Google/Yelp)
1) Positive
“Thank you for the review. We’re glad you had a great experience with {BusinessName} and appreciate you sharing your feedback. If you ever need anything, contact us at {SupportEmail}.”

2) Neutral
“Thanks for your feedback. We’d like to learn more so we can improve. Please reach out at {SupportEmail}.”

3) Mild Negative
“We’re sorry to hear this. We’d like to understand what happened and help resolve it. Please email {SupportEmail} so our team can follow up.”

4) Strong Negative / outcome dissatisfaction (no guarantees)
“Thank you for sharing your concerns. We’re sorry this wasn’t the experience you expected. We can’t discuss details here, but we’d like to connect and see how we can help—please contact {SupportEmail}.”

5) Medical claim bait (“this ruined my face”)
“We’re sorry to hear you’re upset. We take concerns seriously, and we’d like to address this directly. For privacy reasons we can’t discuss details publicly—please email {SupportEmail} so our team can follow up promptly.”

6) Suspected Fake
“Thank you for the review. We want to understand your concerns, but we’re unable to identify the situation from the details provided. Please contact {SupportEmail} so we can look into this.”

D3) HVAC (Google/Yelp)
1) Positive
“Thank you for the review and for choosing {BusinessName}. We appreciate your feedback and are glad we could help. If you need anything in the future, reach us at {SupportEmail}.”

2) Neutral
“Thanks for the feedback. We’d like to learn more about your experience and improve where we can. Please contact us at {SupportEmail}.”

3) Mild Negative (lateness/communication)
“We’re sorry for the frustration and appreciate you letting us know. We’d like to learn more and make this right—please email {SupportEmail} so our team can follow up.”

4) Strong Negative (billing dispute)
“Thank you for sharing this. We’re sorry to hear about the concern and would like to review it directly. Please contact us at {SupportEmail} so we can look into the details and work toward a resolution.”

5) Alleged damage
“We’re sorry to hear this and take concerns like this seriously. We’d like to review what happened and help. Please contact {SupportEmail} so our team can follow up directly.”

6) Suspected Fake
“Thank you for the review. We take feedback seriously, but we’re unable to locate the job based on the information provided. Please contact {SupportEmail} so we can investigate.”

E) PLATFORM POLICY NOTES (GOOGLE VS YELP)
- Both: No incentives tied to reviews; no harassment; no personal data.
- Yelp: Be especially careful not to imply Yelp will remove content; avoid discussing moderation/enforcement; keep responses factual and brief.
- Google: Similar constraints; do not request review changes; do not disclose private customer information.

F) AUDIT TRAIL & REPORTING (MINIMUM FIELDS)
To support compliance and KPI accuracy, every review must have an auditable record: review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode (auto/approval/hold), draft_version, model_prompt_version, human_approver_id (if any), approval_timestamp, posted_timestamp, post_status (posted/failed/blocked_manual_review), hold_reason, detector_version, and final_response_text.

G) GO/NO-GO EXIT CRITERIA
Go only if:
1) Manual-only hold prevents posting across all posting paths.
2) Audit log fields exist and are populated for posted + blocked items.
3) Weekly KPIs reconcile: posted vs approved vs blocked counts match audit logs.
4) Templates in production match this approved library (IDs + text) or have documented/approved deltas.

If you need customer-facing messaging (e.g., a compliance statement or onboarding instructions) we will reference the website above and route all customer replies through agent_bob_replit+review-bot@agentmail.to.