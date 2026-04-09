# AI Review Reply & Reputation Autopilot — Compliance Pack v3 (Brand-Safety Checklist + Escalation Playbook + Approved Templates + Policy Matrix)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:49:48.078Z

---

Compliance Pack v3 — AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

1) POLICY ALIGNMENT MATRIX (TESTABLE RULES)
A. Universal (Google + Yelp)
- No incentives: never offer discounts, refunds, freebies, gift cards, loyalty points, or “we’ll make it right with a credit” in exchange for updating/removing reviews.
- No review gating: never ask only happy customers to review; never discourage unhappy customers from reviewing.
- No PHI/PII: do not confirm identity, appointment, diagnosis, treatment, or “records/chart/visit.” Do not name staff unless business provided and approved.
- No admission of liability: avoid “our fault,” “we caused,” “we damaged,” “we messed up,” “negligent,” etc.
- No harassment/retaliation: never threaten, shame, or accuse the reviewer of lying; keep non-inflammatory tone.
- Take offline CTA required on any neutral/negative review: provide a direct channel to resolve privately.
- No competitor disparagement: do not compare or attack other businesses.

B. Yelp-specific sensitivities
- Do not mention Yelp enforcement or removal promises: avoid “Yelp will remove this,” “we reported you,” “flagged for removal,” “Yelp will take it down.”
- Avoid public back-and-forth bait: keep concise; invite offline.

C. Google Business Profile specifics
- Avoid sharing any private customer details; keep responses general and respectful.
- Do not include promotional or spammy content; keep contact/resolution focused.

2) BRAND-SAFETY CHECKLIST v3 (OPS TICK-BOX)
Use before approving any response for posting.

A. Identity/Privacy
[ ] Response does NOT confirm the reviewer is a customer/patient.
[ ] Response does NOT reference “your visit/appointment/chart/records/treatment/diagnosis.”
[ ] Response contains no names, phone numbers, addresses, license numbers, or uniquely identifying info unless reviewer already posted it AND policy allows AND business explicitly approves.
Blocked phrases (hard block → manual-only hold):
- “we reviewed your chart/records/visit/appointment notes”
- “according to our records” / “our records show”
- “you were seen on (date)”
Required safe alternative: “We take feedback seriously, but we can’t discuss details here. We’d like to connect privately to understand what happened.”

B. Liability / Legal Risk
[ ] No admissions of fault or negligence.
[ ] No promises that imply liability (“we will pay for damages,” “we will cover your medical bills”).
[ ] If legal threat language detected → DO NOT POST (manual-only hold; escalate Legal).
Legal trigger terms (manual-only hold): “attorney,” “lawyer,” “lawsuit,” “sue,” “served,” “legal action,” “court,” “demand letter,” “small claims.”

C. Medical/Health Claims (Dentist/Med Spa)
[ ] No outcome guarantees (e.g., “permanent,” “100%,” “no risk,” “works for everyone”).
[ ] No diagnosis/treatment details.
[ ] Avoid “medical certainty” language: use general service commitment.

D. Incentives / Solicitation
[ ] No discounts, freebies, or incentives tied to reviews.
[ ] No “please change/remove your review” request.
[ ] OK: “If you’re open to it, please contact us to discuss.”

E. Tone / Professionalism
[ ] Non-inflammatory, non-defensive, respectful.
[ ] No accusations (“fake review,” “you’re lying”)—if suspected fake, use neutral verification language.

F. Required elements (by severity)
- Positive reviews: [ ] Thanks + brief brand voice; no marketing spam.
- Neutral/negative reviews: [ ] Thank + acknowledge feelings + invite offline + minimal public detail.
- Strong negative/safety/legal/PHI: [ ] Manual-only hold OR highly generic response that avoids confirmation and requests offline contact (per playbook).

3) ESCALATION PLAYBOOK v3 (SCENARIOS + ROUTING)
Escalation Levels
- L0 Auto-post eligible: low-risk positive/neutral; no policy triggers.
- L1 Needs manager review: mild negative; service dissatisfaction; no PHI/legal/safety.
- L2 Urgent internal escalation: safety incident, alleged discrimination/harassment, property damage, billing fraud.
- L3 Legal hold (manual-only; DO NOT POST): legal threats, active litigation hints, subpoenas, or requests for records.
- L4 PHI/Privacy hold (manual-only; DO NOT POST): any hint of patient identity/medical details/records.

Routing SLAs (suggested)
- L1: Location manager/Ops lead within 24 hours.
- L2: Owner/GM within 4 hours; Ops + HR same day as applicable.
- L3: Legal same day. No public response until approved.
- L4: Privacy officer/Owner within 4 hours. No public response until approved.

Evidence to collect (internal)
- Review source + review_id + screenshots
- Service record lookup (internal only; never mention publicly)
- Staff roster/schedule for the date range (internal only)
- Photos/invoices/messages if dispute about damage/billing

DO-NOT-POST CONDITIONS (automatic block)
- Mentions records/chart/visit/diagnosis/treatment OR reviewer identity confirmation risk
- Legal threats (“attorney/lawsuit/sue” etc.)
- Ongoing safety investigation or threats/harassment that could escalate

Scenario guidance (what to do publicly)
A) Billing dispute
- Public: acknowledge concern; invite offline to resolve; no pricing specifics unless already public and verified.
- Internal: route Billing; collect invoice/contract; document offer(s) made.

B) Service quality complaint (late, rude, poor workmanship)
- Public: apologize for experience without admitting fault; invite offline; commit to review process.
- Internal: route Ops; review call logs/work order; coaching.

C) Alleged damage/injury
- Public: express concern; do not admit liability; request offline contact; escalate L2.
- Internal: incident report; photos; insurance if applicable.

D) Discrimination/harassment allegation
- Public: take seriously; invite offline; escalate L2; no debate.
- Internal: HR/Owner; preserve evidence.

E) Suspected fake review
- Public: neutral verification: “We can’t locate the experience; please contact us with details.” No accusations.
- Internal: search internal records; flag to platform per internal SOP (do not mention publicly on Yelp).

F) PHI/medical details mentioned (Dentist/Med Spa)
- Public: DO NOT POST or post only an ultra-generic privacy-safe line approved by privacy owner; escalate L4.
- Internal: privacy review.

G) Legal threat
- Public: DO NOT POST; escalate L3.
- Internal: legal counsel; preserve logs.

4) APPROVED RESPONSE TEMPLATES LIBRARY v3
Rules for all templates
- Allowed variables: {BusinessName}, {ContactMethod} (phone/email), {ContactHours}, {LocationCity}, {TeamSignature}.
- Banned variables: patient/customer name, appointment date/time, diagnosis/treatment, invoice numbers, staff member names (unless pre-approved), any private identifiers.
- Required offline CTA for neutral/negative: “Please contact us directly at {ContactMethod} so we can help.”
- Default ContactMethod: agent_bob_replit+review-bot@agentmail.to (or business phone if provided by customer).

A) DENTIST (Google/Yelp)
DENT-01 Positive
“Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. We appreciate you taking the time to share your feedback.”

DENT-02 Neutral / mixed
“Thank you for your feedback. We’re always working to improve the experience at {BusinessName}. If you’re open to it, please contact us at {ContactMethod} so we can learn more and help address your concerns.”

DENT-03 Mild negative (wait time, front desk)
“Thanks for sharing this. We’re sorry the experience didn’t meet expectations. We can’t discuss details here, but we’d like to understand what happened and make it right—please reach us at {ContactMethod}.”

DENT-04 Strong negative (pain, poor care claim) — privacy-safe
“We’re sorry to hear you’re upset. We take concerns seriously, but we can’t address or confirm any details in a public forum. Please contact {BusinessName} at {ContactMethod} so we can look into this promptly.”

DENT-05 Suspected fake / wrong office
“Thanks for the note. We can’t find enough information to identify the situation, and we want to make sure feedback reaches the right place. Please contact us at {ContactMethod} with any details you’re comfortable sharing so we can assist.”

DENT-06 PHI-sensitive mention (manual-only hold recommended)
If allowed to post (only with privacy approval):
“We take privacy seriously and can’t discuss details here. If you’d like support, please contact us directly at {ContactMethod}.”

B) MED SPA (Google/Yelp)
MED-01 Positive
“Thank you for the wonderful review. We’re glad you enjoyed your experience at {BusinessName}. We appreciate your support.”

MED-02 Neutral
“Thank you for the feedback. We’re always working to improve. Please contact us at {ContactMethod} so we can better understand your experience and help.”

MED-03 Service dissatisfaction
“We’re sorry to hear this wasn’t what you expected. We can’t discuss details publicly, but we’d like to connect and make things right. Please reach out at {ContactMethod}.”

MED-04 Outcome/expectations complaint (no guarantees)
“Thank you for sharing your concerns. Results and experiences can vary, and we take feedback seriously. We can’t discuss details here, but please contact us at {ContactMethod} so we can review your concerns and help.”

MED-05 Suspected fake
“We take feedback seriously. We can’t verify the situation from this post, but we’d like to look into it. Please contact {BusinessName} at {ContactMethod} so we can assist.”

MED-06 Safety/cleanliness concern (L2)
“We’re concerned to hear this and take it seriously. We can’t discuss details publicly, but please contact us at {ContactMethod} so we can follow up promptly.”

C) HVAC (Google/Yelp)
HVAC-01 Positive
“Thank you for the review. We’re glad we could help and appreciate you choosing {BusinessName}.”

HVAC-02 Neutral
“Thanks for the feedback. We’re always looking to improve. Please contact us at {ContactMethod} so we can learn more and help address any concerns.”

HVAC-03 Scheduling/late arrival
“Sorry for the frustration. We aim to be on time and communicate clearly. Please contact us at {ContactMethod} so we can look into what happened and help.”

HVAC-04 Billing/price dispute
“Thank you for raising this. We want billing to be clear and fair. We can’t discuss account details publicly, but please contact us at {ContactMethod} so we can review and assist.”

HVAC-05 Alleged damage
“We’re sorry to hear this concern. We take it seriously and want to investigate. Please contact us at {ContactMethod} so we can gather details and follow up.”

HVAC-06 Suspected fake
“We take feedback seriously and want to ensure we’re addressing the correct situation. Please contact us at {ContactMethod} with any details so we can assist.”

5) AUDIT / APPROVAL REQUIREMENTS (OPS + ENGINEERING)
Minimum audit fields per response
- review_source (google|yelp), review_id, business_id/location_id
- review_text_hash, detected_risk_flags[], escalation_level
- response_mode (auto|needs_review|blocked_manual_review)
- draft_version, model/prompt_version, detector_version
- human_approver_id, approval_timestamp
- posted_timestamp, post_status (posted|failed|blocked_manual_review), error_code
- final_response_text

Required events
- draft_created → flagged (optional) → approved OR blocked → posted/failed

6) QUICK GO/NO-GO LAUNCH GATES (OBJECTIVE)
GO only if ALL true:
- Manual-only hold prevents posting via UI and API paths (verified)
- Audit logs contain required fields/events for 20 consecutive drafts
- Weekly KPI report reconciles: approved vs posted vs blocked counts (no unexplained deltas)
- 0 instances of: PHI confirmation, incentives language, liability admission, competitor disparagement, removal promises

If any failure: NO-GO; fix detector/gate/logging; rerun verification.

End of Compliance Pack v3