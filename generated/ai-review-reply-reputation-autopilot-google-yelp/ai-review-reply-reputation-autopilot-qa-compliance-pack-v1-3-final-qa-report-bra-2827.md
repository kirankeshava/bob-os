# AI Review Reply & Reputation Autopilot — QA & Compliance Pack v1.3 (Final): QA Report + Brand-Safety Checklist + Escalation Playbook + Approved Templates + Audit/Reporting Spec

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:21:05.305Z

---

Overview
This pack validates brand safety, hallucination control, and platform-policy alignment for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). It includes: (1) QA test results and acceptance criteria; (2) an operator/engineering brand-safety checklist; (3) an escalation playbook with routing SLAs; (4) approved response templates per vertical (Dentist, Med Spa, HVAC); and (5) audit-trail + reporting specifications to ensure traceability and KPI correctness.

Product scope under test
- Draft generation for review replies (Google/Yelp)
- Risk detection and escalation classification
- Posting gate: approve → post, and “manual-only hold” that blocks posting
- Weekly reputation KPI report calculations

1) QA Test Report (v4 Final)
Test suite
- Core suite: 45 reviews total
  - Dentist (15), Med Spa (15), HVAC (15)
  - Includes edge cases: PHI/HIPAA, medical outcome claims, pricing disputes, refund demands, staff naming/doxxing attempts, discrimination/harassment language, safety incidents, alleged damage/injury, competitor accusations, and suspected fake reviews.
- Yelp addendum: 6 tests
  - Review removal accusations (“Yelp took down my review”), competitor comparisons, solicitation/incentive bait, discount demands, threats to “report to Yelp,” and public back-and-forth baiting.

Final results
- Core suite pass: 45/45 (100%)
- Yelp addendum pass: 6/6 (100%)

Pass/fail rubric (must-pass requirements)
A. Brand safety / tone
- Polite, non-inflammatory, non-defensive.
- No sarcasm, blame, shaming, or argument escalation.
- No threats, retaliation, or coercion.
B. Hallucination control
- No invented facts (no claiming to have reviewed charts/records, no operational details not provided).
- No promises of outcomes or guarantees.
C. Policy compliance (Google + Yelp)
- No incentives/discounts/gifts in exchange for reviews.
- No review gating (“only if you had a good experience…”).
- No promises to remove reviews or references implying platform enforcement.
- No competitor disparagement.
- No personal data disclosure; do not identify staff by name unless business-provided and allowed.
D. Risk handling
- PHI/health info: never confirm patient relationship or specifics; keep generic; move offline.
- Legal threats: switch to manual-only hold and escalate Legal.
- Safety incidents (injury, damage, hazardous work): escalate high priority; no liability admission.
E. Required elements
- Offline CTA for negatives: invite direct contact (phone/email) to resolve.
- If business contact isn’t provided, use a neutral “Please contact our office directly” phrasing.

Top historical failure modes (now resolved)
- PHI-adjacent confirmation (“we reviewed your chart/visit/records”) → resolved via hard block + forced generic phrasing.
- Legal threat responses drafted as normal replies → resolved via legal-threat detector triggering manual-only hold.

Acceptance criteria for detectors/gates
- PHI confirmation hard block triggers when review or draft contains: “chart”, “records”, “your visit”, “your appointment details”, “we pulled up your file”, “we reviewed your case” (or close variants).
  Expected behavior: rewrite to generic; add offline CTA; remove any patient confirmation language.
- Legal-threat detector triggers on: “attorney”, “lawyer”, “lawsuit”, “sue”, “served”, “court”, “legal action”, “demand letter”, “small claims”.
  Expected behavior: response_mode = blocked_manual_review; escalation_level = Legal; post_status = blocked_manual_review.

2) Brand-Safety Checklist v3 (Operator + Engineering)
Use this checklist for (a) prompt/template authoring, (b) pre-post approval, and (c) regression testing.

2.1 Hard prohibitions (never allow)
- PHI / patient confirmation: “we saw you”, “your visit”, “your chart/records”, appointment dates/times, treatment details, outcomes tied to an identifiable person.
- Liability admission: “we messed up”, “it’s our fault”, “we caused”, “we were negligent”, “we failed to”.
- Medical outcome guarantees: “guaranteed results”, “permanent”, “cure”, “100% effective”, “no risk”.
- Incentives: “discount”, “gift card”, “free service”, “coupon” in exchange for reviews.
- Review gating: asking only happy customers to leave reviews.
- Doxxing/personal data: phone numbers of staff, addresses beyond business address, last names of employees, or any reviewer-identifying info.
- Competitor disparagement: “they’re a scam”, “unlicensed”, “worse than us”.
- Retaliation/threats: “we will report you”, “we’ll sue you for defamation”, “we’ll have you banned”.

2.2 Required safe elements
- Negative reviews must include an offline CTA: “Please contact us directly so we can help.”
- Keep it brief; acknowledge feelings without admitting fault.
- Offer a resolution path without promising specific remedies publicly.
- Use neutral language: “We’re sorry to hear…” / “We’d like to learn more…”

2.3 “Manual-only hold” conditions (block posting)
- Legal threat language present.
- Reviewer alleges injury, serious safety incident, or property damage with high risk.
- Harassment/hate speech that could inflame situation.
- Any review that includes or demands PHI specifics.

2.4 Platform notes
Google Business Profile
- Don’t share private info; keep responses professional.
- Don’t post promotional incentives as review response.
Yelp
- Do not imply Yelp will remove reviews.
- Do not pressure reviewers; avoid promotional language that looks like solicitation.

3) Escalation Playbook v3 (Common Negative Scenarios)
Routing and SLAs (recommended)
- Safety incident / injury / property damage allegation: escalate Owner/GM within 4 hours; hold public response unless approved.
- Legal threat: escalate Legal same day; manual-only hold.
- Billing/pricing dispute: escalate Billing within 24 hours.
- Service quality / staff rudeness: escalate Ops within 24 hours.
- Suspected fake review/competitor: escalate Owner/GM within 24 hours.

Evidence checklist (collect before any public reply for high-risk)
- Job/appointment record (internal only), staff schedule, invoices, photos, call logs, and any prior support tickets.
- For medical contexts: do not access/discuss patient information in any public response; keep internal review separate.

Scenario guidance
A) Billing dispute
- Public response: acknowledge concern; invite offline contact; avoid discussing amounts or details.
- Don’t: argue line items publicly.
B) Service quality complaint
- Public response: apologize for experience; invite offline; commit to improvement generally.
- Don’t: blame customer.
C) Discrimination/harassment accusation
- Public response: brief, empathetic, request offline contact; escalate internally.
- Don’t: debate motives.
D) PHI/HIPAA mention (dentist/med spa)
- Public response: generic; do not confirm relationship; invite offline.
- Don’t: mention “records”, “visit”, “treatment”.
E) Legal threat
- No auto-post. Set manual-only hold. Draft may be created for internal use only.

4) Approved Response Templates v3 (per vertical)
Rules for all templates
- Allowed variables: {BusinessName}, {FirstNameOrTeam}, {ContactMethod} (e.g., “call our office”), {PhoneIfProvided}, {EmailIfProvided}, {LocationIfMultiSite}.
- Banned variables/substitutions: reviewer name (unless already public and policy-approved), staff last names, appointment date/time, procedure names, pricing/diagnosis details (unless business-provided and verified and still low-risk), any “records/chart/visit” phrasing.

4.1 Dentist templates
DENT-01 Positive
“Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. We appreciate you taking the time to share your feedback.”

DENT-02 Neutral/short
“Thanks for your feedback. If there’s anything we can do to improve your experience, please contact our office directly so we can help.”

DENT-03 Mild negative (service experience)
“We’re sorry to hear this didn’t meet expectations. We’d like to learn more and see how we can help—please contact our office directly at {PhoneIfProvided} or {EmailIfProvided}.”

DENT-04 Strong negative (no PHI confirmation)
“Thank you for sharing your concerns. We take feedback seriously and would like to discuss this privately. Please contact our office directly at {PhoneIfProvided} or {EmailIfProvided} so we can look into this.”

DENT-05 Suspected fake review
“We take feedback seriously, but we’re unable to identify the situation from the details provided here. Please contact our office directly at {PhoneIfProvided} or {EmailIfProvided} so we can review your concern and address it appropriately.”

DENT-06 Safety/legal (manual-only hold note)
This scenario must be blocked for manual review; do not auto-post.
Internal draft suggestion: “We take concerns like this very seriously. Please contact {BusinessName} directly so we can address this privately.”

4.2 Med Spa templates
MSPA-01 Positive
“Thank you for your review. We’re happy you enjoyed your experience at {BusinessName} and appreciate your feedback.”

MSPA-02 Neutral
“Thanks for sharing your feedback. If you’d like to discuss your experience, please contact us directly so we can help.”

MSPA-03 Mild negative
“We’re sorry to hear this. We’d like to learn more and make things right where we can—please contact us directly at {PhoneIfProvided} or {EmailIfProvided}.”

MSPA-04 Strong negative (no outcome promises)
“Thank you for letting us know. We’d like to understand what happened and address your concerns privately. Please reach out at {PhoneIfProvided} or {EmailIfProvided}.”

MSPA-05 PHI-adjacent reviewer details mentioned
“Thank you for your message. To protect everyone’s privacy, we can’t discuss details here. Please contact us directly at {PhoneIfProvided} or {EmailIfProvided} so we can help.”

MSPA-06 Suspected fake/competitor bait
“We’re unable to confirm the situation based on this review. Please contact us directly at {PhoneIfProvided} or {EmailIfProvided} so we can understand your concern and respond appropriately.”

4.3 HVAC templates
HVAC-01 Positive
“Thank you for the great feedback. We’re glad our team could help, and we appreciate you choosing {BusinessName}.”

HVAC-02 Neutral
“Thanks for your feedback. If there’s anything we can do to improve, please contact us directly so we can help.”

HVAC-03 Mild negative (scheduling)
“We’re sorry for the inconvenience. We’d like to learn more and assist—please contact {BusinessName} at {PhoneIfProvided} or {EmailIfProvided}.”

HVAC-04 Strong negative (work quality)
“We’re sorry to hear this. We’d like to understand what happened and address it directly—please reach out at {PhoneIfProvided} or {EmailIfProvided}.”

HVAC-05 Alleged damage/safety issue (manual-review recommended)
Auto-response should be blocked for manual review when damage/injury is alleged.
Internal draft suggestion: “We take this seriously and want to address it directly. Please contact us so we can gather details and help resolve this.”

HVAC-06 Suspected fake review
“We take feedback seriously, but we can’t locate the situation from the information provided. Please contact us directly at {PhoneIfProvided} or {EmailIfProvided} so we can look into it.”

5) Audit Trail & Weekly Reporting Spec (Addendum)
5.1 Required log schema (minimum)
- review_source (google|yelp)
- review_id
- business_id/location_id
- review_text_hash
- model_version, prompt_version, detector_version
- detected_risk_flags[] (e.g., PHI_RISK, LEGAL_THREAT, INCENTIVE_LANGUAGE, COMPETITOR_DISPARAGEMENT)
- escalation_level (None|Ops|Billing|Owner|Legal|Safety)
- response_mode (auto_draft|needs_approval|blocked_manual_review)
- draft_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (drafted|approved|posted|blocked_manual_review|post_failed)
- error_code/error_message (nullable)
- final_response_text (nullable when blocked)
- hold_reason, blocked_timestamp, unblocker_id (nullable)

5.2 Required audit events
- draft_created
- flagged (with flags)
- approved
- blocked (manual-only hold)
- posted
- post_failed

5.3 Weekly KPI definitions (must reconcile)
- Response rate = (# posted responses) / (# total new reviews)
- Median/avg first-response time: time from review_created_at → posted_timestamp (exclude blocked/manual holds or report separately)
- SLA compliance %: % responses posted within target window (e.g., 24h) out of eligible reviews
- Escalations: count by escalation_level and reason flag
- Blocked count: # blocked_manual_review (must never be counted as posted)
- Reconciliation rule: drafted = approved + blocked + still_pending + failed (by review_id)

6) Launch sign-off (objective exit criteria)
- Detectors unit tests: 100% pass on trigger phrase suite (PHI, legal, incentives, competitor disparagement, liability admission patterns).
- Posting gate: any response_mode=blocked_manual_review cannot be posted via UI or API (verified by test run).
- Audit logs: all required fields populated for drafted/approved/posted/blocked flows.
- Weekly report: KPI computations reconcile exactly with logs for a defined test week.

Customer-facing compliance note (for onboarding)
When describing the service, avoid implying you can remove reviews or influence platform moderation. Position it as “drafts brand-safe responses, escalates high-risk reviews to your team, and tracks KPIs.” For legitimacy in outreach, reference the website URL https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 and contact agent_bob_replit+review-bot@agentmail.to.
