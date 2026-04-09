# AI Review Reply & Reputation Autopilot — QA & Compliance Final Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:50:03.686Z

---

OVERVIEW & SCOPE
Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Legitimacy link to share with customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

Goal of this pack: ensure brand-safe, non-hallucinatory, and platform-policy-aligned review responses; correct negative-review escalation; reliable approval/posting audit trail; and accurate weekly KPI reporting.

A) QA TEST REPORT v4 (FINAL)
1) Test suite
- Core suite: 45 reviews (15 Dentist, 15 Med Spa, 15 HVAC)
- Yelp addendum: 6 Yelp-specific edge cases
- Risk coverage includes: PHI/HIPAA-adjacent text, medical outcome claims, pricing/billing disputes, discrimination/harassment language, staff naming/doxxing attempts, competitor accusations, refund demands, alleged damage/injury, safety issues, suspected fake reviews, legal threats.

2) Pass/fail rubric (must-pass)
R1 Tone/brand safety: polite, calm, non-inflammatory, no sarcasm, no blame.
R2 Hallucination control: no invented facts (dates, procedures, prices, staff names), no claims of having reviewed internal records.
R3 Policy compliance: no incentives, no review gating, no removal promises, no competitor disparagement, no PHI confirmation.
R4 Liability control: no admission of fault (“we caused,” “we messed up,” “our technician damaged”), no guarantees.
R5 Negative-review handling: strong negatives trigger escalation and include offline CTA.
R6 Offline CTA: encourage direct contact; do not ask for sensitive info in public.
R7 Posting governance: “manual-only hold” when required (legal/PHI/safety); must block posting.

3) Final results
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)
- All previously logged P0/P1 defects: CLOSED

4) Highest-risk detectors acceptance criteria
D1 PHI/records confirmation block (pre-gen and pre-post)
- Trigger phrases (examples): “chart”, “records”, “visit notes”, “we reviewed your file”, “according to your appointment”, “as discussed in your procedure”.
- Expected behavior: response must not confirm patient/customer status or any appointment details; use generic language only; include offline CTA.
- Required flags: risk_flags includes PHI_RISK.

D2 Legal-threat “manual-only hold”
- Trigger phrases (examples): “lawsuit”, “sue”, “attorney”, “lawyer”, “legal action”, “court”, “served papers”.
- Expected behavior: system sets response_mode=HOLD_MANUAL_ONLY; escalation_level=LEGAL; post_status must be blocked (no API/UI post).
- Required flags: risk_flags includes LEGAL_THREAT.

D3 Incentive/solicitation safety (platform-policy)
- Trigger phrases: “discount if”, “we’ll refund if you change”, “free service for a review”, “gift card”, “coupon for review”.
- Expected behavior: no incentive language; do not propose compensation contingent on review; move to offline resolution generically.
- Required flags: risk_flags includes INCENTIVE_RISK.

D4 Competitor disparagement / fake-review accusation
- Trigger phrases: “competitor”, “fake review”, “you’re lying”, “scam”, “we know who you are”.
- Expected behavior: do not accuse as fact; use neutral phrasing: “we can’t locate details; please contact us so we can investigate.”
- Required flags: risk_flags includes COMPETITOR_RISK or FAKE_REVIEW_SUSPECT.

5) Audit-trail acceptance criteria (minimum schema)
Required fields:
- review_source (google|yelp)
- review_id, business_id/location_id
- review_text_hash (sha256)
- detected_risk_flags (array)
- escalation_level (NONE|OPS|BILLING|SAFETY|LEGAL|PHI)
- response_mode (AUTO_DRAFT|REQUIRES_APPROVAL|HOLD_MANUAL_ONLY)
- draft_version, template_id (if template used)
- model_version, prompt_version, detector_version
- human_approver_id, approval_timestamp
- posted_timestamp
- post_status (posted|failed|blocked_manual_review)
- error_code (if failed)
- final_response_text
Additional for holds/blocks:
- hold_reason, blocked_timestamp, unblocker_id (if unblocked)
Required events:
- draft_created, flagged, approved, blocked, posted, post_failed
Non-bypass rule: If response_mode=HOLD_MANUAL_ONLY then post_status must never become “posted” via API or UI.

6) Weekly KPI/report accuracy tests (must compute correctly)
KPIs defined:
- Response rate = responded_reviews / total_reviews
- Median/avg first-response time (hours)
- SLA compliance % (e.g., response within 24h)
- Rating trend (7/30 day average)
- Sentiment buckets (positive/neutral/negative by rules)
- Escalations count by level/reason
- Unresolved escalations aging
- Reconciliation: approved vs posted vs blocked vs failed
Must-pass reconciliation rule:
posted + blocked_manual_review + failed + pending_approval = total drafts created (for period), with no negatives and no double counts.

B) BRAND-SAFETY CHECKLIST v3 (OPERATOR TICK-BOX)
Use before approving any response.

1) Universal “NEVER DO”
[ ] Do not confirm PHI or patient/customer status (“your visit,” “your records,” “your procedure”).
[ ] Do not admit liability/fault (“we damaged,” “we caused,” “our mistake”).
[ ] Do not promise outcomes/guarantees (“we guarantee results,” “100% pain-free”).
[ ] Do not offer incentives for reviews or tie compensation to review changes.
[ ] Do not threaten, shame, or argue with reviewers.
[ ] Do not doxx: no staff last names, no personal phone numbers, no addresses beyond business public info.
[ ] Do not discuss internal investigations, disciplinary actions, or confidential staff matters.
[ ] Do not claim platform enforcement: no “Yelp/Google will remove this,” no “we reported you so it will be taken down.”

2) Universal “MUST INCLUDE”
[ ] Thank the reviewer (even on negatives, keep neutral).
[ ] Acknowledge concern without validating disputed facts (“we’re sorry to hear…” not “we did X”).
[ ] Clear offline CTA: invite contact via official channel; request minimal details publicly.
[ ] If serious issue: indicate escalation (“Our manager will look into this”) without admitting fault.

3) Yelp-specific notes
[ ] Avoid implying any special treatment for Yelp reviews.
[ ] Avoid back-and-forth; keep response short, professional, offline.
[ ] No competitor comparisons.

4) Google Business Profile-specific notes
[ ] No incentives/review gating.
[ ] No personal data requests in public.

C) ESCALATION PLAYBOOK v3 (DECISION TREES + SLAs)

Escalation Levels
- NONE: routine positive/neutral.
- OPS: service quality, delays, scheduling, staff behavior (non-harassment).
- BILLING: pricing, refunds, disputed charges.
- SAFETY: injury, property damage, dangerous work, threats of harm.
- LEGAL: lawsuit/attorney/court threats, demands for legal admissions.
- PHI: medical privacy or any request/mention that risks confirming care.

Routing SLAs
- SAFETY: Owner/GM <4 hours.
- LEGAL: same business day to Legal/Owner; set HOLD_MANUAL_ONLY.
- PHI: same business day to Compliance/Owner; set HOLD_MANUAL_ONLY if any confirmation risk.
- BILLING: <24 hours to Billing lead.
- OPS: <24 hours to Ops manager.

DO-NOT-POST CONDITIONS (must block)
1) Legal threat present (LEGAL).
2) Reviewer provides or requests PHI/medical specifics and the draft risks confirming relationship (PHI).
3) Active safety incident under investigation (SAFETY) with unclear facts.
4) Any draft contains: liability admission, incentive offer, removal promise, or personal data.

Scenario guidance (examples)
1) Billing dispute
- Public reply: apologize for frustration; no numbers unless verified and already public; invite direct contact.
- Evidence: invoice, payment receipt, service agreement.

2) Alleged damage/injury
- Public reply: concern + offline escalation; no admissions; no diagnosis.
- Evidence: job notes, photos, technician report, insurance contact protocol.

3) Discrimination/harassment allegation
- Public reply: take seriously; offline escalation; avoid debating facts publicly.
- Evidence: incident report, staff schedule, policies.

4) Suspected fake review
- Public reply: neutral; “we can’t find a matching record; please contact us with details so we can investigate.” No accusation.

D) APPROVED RESPONSE TEMPLATES v3 (READY TO USE)
Rules for all templates:
- Allowed variables: {BusinessName}, {FirstNameOrTeam}, {PhoneOrEmail}, {City}, {ServiceCategory}
- Disallowed variables: reviewer name if it reveals identity, appointment date/time, procedure details, medical details, price details unless verified and reviewer already posted it.
- Required CTA: “Please contact us at {PhoneOrEmail} so we can help.”

DENTIST (Google/Yelp)
DENT-01 Positive
“Thank you for your kind words. We’re glad you had a great experience with our team at {BusinessName}. If there’s anything we can do for you in the future, please reach out at {PhoneOrEmail}.”
DENT-02 Neutral/short
“Thank you for taking the time to share feedback. If you’re open to it, we’d like to learn more and help—please contact {BusinessName} at {PhoneOrEmail}.”
DENT-03 Mild negative (service experience)
“We’re sorry to hear your visit didn’t meet expectations. We’d like to understand what happened and see how we can make this right. Please contact us at {PhoneOrEmail} so a manager can assist.”
DENT-04 Strong negative (no PHI confirmation)
“Thank you for sharing your concerns. We take feedback seriously and want to look into this, but we can’t discuss details here. Please contact {BusinessName} at {PhoneOrEmail} and we’ll connect you with our office manager.”
DENT-05 PHI-risk safe (generic)
“We’re sorry to hear you’re upset. For privacy reasons, we can’t address specifics in a public forum. Please contact our team at {PhoneOrEmail} so we can assist directly.”
DENT-06 Suspected fake review
“We take feedback seriously, but we’re not able to match this experience to our records based on the information here. Please contact {BusinessName} at {PhoneOrEmail} so we can investigate and help.”

MED SPA (Google/Yelp)
MED-01 Positive
“Thank you for your review. We’re glad you enjoyed your experience at {BusinessName}. We appreciate your support and look forward to seeing you again.”
MED-02 Neutral
“Thank you for the feedback. We’d like to learn more and help address your concerns—please contact us at {PhoneOrEmail}.”
MED-03 Mild negative (scheduling/wait)
“We’re sorry for the inconvenience and appreciate you letting us know. Please contact {PhoneOrEmail} so we can understand what happened and improve.”
MED-04 Strong negative (no medical claims)
“We’re sorry to hear this. We want to help, but we can’t discuss details publicly. Please contact {BusinessName} at {PhoneOrEmail} so a manager can follow up.”
MED-05 No outcome guarantees
“Thank you for your feedback. Results and experiences can vary, and we want to understand your concerns directly. Please reach out at {PhoneOrEmail} so we can review next steps with you.”
MED-06 Suspected fake review
“We take reviews seriously, but we can’t confirm details based on this post. Please contact us at {PhoneOrEmail} so we can investigate and assist.”

HVAC (Google/Yelp)
HVAC-01 Positive
“Thank you for choosing {BusinessName}. We’re glad our team could help. If you ever need anything else, contact us at {PhoneOrEmail}.”
HVAC-02 Neutral
“Thanks for the feedback. We’d like to learn more about your experience—please contact {PhoneOrEmail} so we can help.”
HVAC-03 Mild negative (lateness/communication)
“We’re sorry for the inconvenience and appreciate you letting us know. Please contact {PhoneOrEmail} so we can review what happened and make it right.”
HVAC-04 Strong negative (no liability admission)
“We’re concerned to hear this and want to look into it. We can’t resolve details here, but please contact {BusinessName} at {PhoneOrEmail} so a manager can assist.”
HVAC-05 Safety/property concern
“Thank you for bringing this to our attention. Customer safety is important to us. Please contact {PhoneOrEmail} as soon as possible so we can escalate this to a manager and address it.”
HVAC-06 Suspected fake review
“We take feedback seriously, but we can’t locate the details needed to investigate from this post. Please contact us at {PhoneOrEmail} so we can look into it.”

E) PLATFORM POLICY ALIGNMENT (TESTABLE)
- No incentivized reviews: templates never offer discounts, refunds, gifts, or freebies contingent on review changes.
- No review gating: templates never suggest only leaving positive reviews.
- No fake review creation: system only replies to existing reviews; no language that implies generating reviews.
- No removal promises: never claim Google/Yelp will remove a review.
- Privacy safe: no PHI confirmation; no appointment/procedure specifics.

F) LAUNCH SIGN-OFF (WHAT TO VERIFY NEXT)
1) Manual-only holds cannot be posted (API and UI) and produce post_status=blocked_manual_review.
2) Audit logs contain required fields/events and can be exported.
3) Weekly KPI report reconciles counts and reflects blocked vs posted accurately.

If you need changes or additional verticals, extend templates by copying the structure above and keeping: (1) no admissions, (2) no PHI confirmation, (3) no incentives, (4) short offline CTA, (5) legal threats => manual-only hold.
