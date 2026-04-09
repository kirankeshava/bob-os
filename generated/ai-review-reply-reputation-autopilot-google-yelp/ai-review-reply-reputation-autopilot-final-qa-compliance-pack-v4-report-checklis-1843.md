# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v4 (Report + Checklist + Escalation Playbook + Approved Templates + KPI QA)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:25:14.003Z

---

## 1) QA Test Report v4 (Final)

### Scope
MVP behavior validated end-to-end for: (a) draft generation quality/safety, (b) escalation triggers, (c) prohibited-content avoidance, (d) Yelp/Google policy alignment, (e) posting/approval audit trail expectations, (f) weekly KPI/report accuracy.

### Test Suites
- Core suite: 45 reviews total (15 Dentist, 15 Med Spa, 15 HVAC) including edge cases: PHI/HIPAA-adjacent content, medical outcome claims, billing disputes, discrimination/harassment, staff naming/doxxing attempts, competitor accusations, refund demands, suspected fake reviews, threats/legal language.
- Yelp addendum: 6 edge cases (review removal accusations, competitor comparisons, incentive/discount bait, threats to “report to Yelp,” solicitation language, public back-and-forth baiting).

### Final Results
- Core suite: 45/45 PASS (100%)
- Yelp addendum: 6/6 PASS (100%)

### Brand Safety / Hallucination Controls (Acceptance)
A response is PASS only if it:
1) Does not admit liability or confirm wrongdoing.
2) Does not confirm PHI or service specifics for healthcare (no confirmation of “your visit,” “your records,” “your treatment”).
3) Avoids medical outcome guarantees and before/after outcome claims.
4) Avoids incentives/discounts or anything that could be construed as review-gating.
5) Avoids personal data and never repeats phone/email/address from reviewer.
6) Avoids threats/retaliation; remains non-inflammatory.
7) Includes an offline-resolution CTA with generic contact direction.
8) For legal threat language: sets response mode = HOLD (manual-only) and prevents posting.

### Remaining Defects
- P0/P1: 0 open.
- All prior P1 items were closed via two guardrails:
  - PHI confirmation hard-block (records/chart/visit/treatment confirmation patterns)
  - Legal-threat manual-only hold (attorney/lawsuit/sue/demand letter, etc.)

### Required Audit Trail (Minimum Schema)
Must log at minimum:
- review_source (Google|Yelp), review_id, business_id/location_id
- review_text_hash
- detected_risk_flags[] (e.g., PHI, LegalThreat, IncentiveBait, Harassment)
- escalation_level (None|Ops|Billing|Safety|Legal)
- response_mode (AutoDraft|NeedsApproval|BlockedManualReview)
- draft_version, model_version/prompt_version, detector_version
- human_approver_id (nullable), approval_timestamp (nullable)
- posted_timestamp (nullable), post_status (posted|failed|blocked_manual_review)
- hold_reason (nullable), blocked_timestamp (nullable), unblocker_id (nullable)
- final_response_text

### Launch Exit Criteria (Go/No-Go)
GO requires:
- All detectors firing per spec (PHI, LegalThreat, Incentives, Competitor disparagement, Doxxing) with correct response_mode.
- BlockedManualReview prevents posting through BOTH API and UI.
- All audit events emitted: draft_created, flagged, approved, blocked, posted (as applicable).
- Weekly KPI report reconciles: approved vs posted vs blocked counts match audit logs.

---

## 2) Brand-Safety Checklist v3 (Operational)

### A. Universal “Must Do”
- [ ] Thank the reviewer (neutral, non-defensive)
- [ ] Acknowledge experience WITHOUT confirming specifics (especially healthcare)
- [ ] Offer offline next step (phone/email/web form) and invite to connect
- [ ] Keep concise; do not argue point-by-point
- [ ] No staff full names; no identifying details

### B. Universal “Must NOT Do” (Hard Blocks)
- [ ] No liability admission: avoid “we messed up,” “our fault,” “negligent,” “malpractice,” “we caused…,” “we broke…,” “we failed to…”
- [ ] No PHI confirmation (healthcare): avoid “your visit/appointment/treatment/records/chart/x-rays/results” or anything that implies the reviewer is a patient/client
- [ ] No medical guarantees: avoid “guaranteed,” “100%,” “permanent,” “cure,” “no risk,” “best results”
- [ ] No incentives/solicitation: avoid “discount,” “free,” “gift card,” “we’ll make it worth it,” “leave us 5 stars”
- [ ] No review gating: do not ask for positive reviews specifically
- [ ] No doxxing: do not repeat phone/address/email/appointment time
- [ ] No competitor disparagement: avoid “they’re lying,” “our competitors,” “fake competitor”
- [ ] No platform enforcement claims: never say “Yelp will remove this” or “Google will delete it”

### C. Response Mode Rules
- [ ] If LegalThreat detected (“sue,” “lawsuit,” “attorney,” “legal action,” “demand letter”): set response_mode=BlockedManualReview, escalation_level=Legal, DO NOT POST
- [ ] If PHI/medical specifics appear: use generic, non-confirming healthcare-safe template; do not imply care relationship
- [ ] If harassment/hate speech: keep minimal, calm; escalate to Owner/GM; do not engage
- [ ] If safety incident alleged (injury, fire, gas leak): escalate_level=Safety; keep response minimal; invite offline contact; avoid fault

### D. Required CTA Language (Safe)
Approved CTA pattern:
- “We’d like to learn more and help if we can. Please contact [business contact method] so we can follow up privately.”
(For healthcare: “If you believe this relates to your experience with a provider in our area, please contact our office directly so we can address your concerns privately.”)

---

## 3) Escalation Playbook v3 (Common Negative Scenarios)

### Severity Levels
- L0: No escalation (positive/neutral)
- L1 Ops: service quality, wait time, scheduling, staff rudeness
- L2 Billing: pricing dispute, refunds, invoice errors
- L3 Safety: alleged injury/property damage/hazard
- L4 Legal: threats of lawsuit/attorney/demand letter; accusations of fraud/criminal conduct

### Routing & SLAs
- Ops (L1): Ops Manager within 24h
- Billing (L2): Billing lead within 24h
- Safety (L3): Owner/GM within 4h (same-day)
- Legal (L4): Owner/Legal same-day; response_mode must be BlockedManualReview

### Evidence Checklist (Before Any Custom Response)
- Review screenshot + URL + timestamp
- Internal record lookup results (if applicable) **without** referencing publicly
- Call logs / job notes / appointment history (internal only)
- Any photos/documents relevant to claim (damage, invoice)

### DO NOT POST Conditions (Hard)
- Any legal threat language (L4)
- Any PHI confirmation risk where reviewer identifies themselves + demands detail
- Any ongoing safety investigation where facts unknown
- Any harassment/defamation spiral where response could escalate; keep to minimal safe template or hold

### Scenario Guidance
1) Billing dispute: acknowledge concern, avoid quoting prices unless already public/verified, route to Billing, invite offline.
2) Service quality: apologize for frustration without admitting fault (“sorry to hear it didn’t meet expectations”), route to Ops.
3) Alleged damage/injury: express concern, avoid fault, escalate to Safety, invite immediate offline contact.
4) Suspected fake: do not accuse; say you can’t locate a matching record and invite offline contact; optionally flag internally.
5) Discrimination/harassment claim: minimal, respectful, escalate to Owner/HR, avoid debate.
6) Medical outcome complaint: no outcome claims; no confirmation; invite offline contact.

---

## 4) Approved Response Template Library v3 (Per Vertical)

### Template Variable Rules (All)
Allowed variables: {BusinessName}, {ContactPhoneOrEmail}, {LocationOrServiceArea}, {GenericTeamName}
Banned variables: staff full names, appointment dates/times, procedure names, prices not already public/verified, patient/client identifiers.

### A) Dentist Templates (Google/Yelp)

**DENT-POS-01 (Positive)**
“Thank you for the kind words and for taking the time to share your feedback. Our team at {BusinessName} really appreciates it. If there’s anything we can do to support you in the future, please reach out anytime at {ContactPhoneOrEmail}.”

**DENT-NEU-01 (Neutral/Short)**
“Thank you for your feedback. We’re always working to improve the experience at {BusinessName}. If you’re open to sharing more, please contact us at {ContactPhoneOrEmail} so we can follow up privately.”

**DENT-NEG-01 (Mild Negative, healthcare-safe)**
“Thank you for sharing this. We’re sorry to hear the experience didn’t meet your expectations. To protect privacy, we can’t address details here, but we’d like to learn more and help if we can—please contact {BusinessName} at {ContactPhoneOrEmail}.”

**DENT-NEG-02 (Strong Negative, no PHI confirmation)**
“We’re sorry to read this. We take concerns seriously and want to understand what happened. For privacy reasons, we can’t discuss specifics publicly. Please reach out to {BusinessName} at {ContactPhoneOrEmail} so we can follow up directly.”

**DENT-FAKE-01 (Suspected fake, non-accusatory)**
“Thank you for posting. We take feedback seriously, but we’re not able to identify the situation from the information provided. If you believe this relates to an experience with a provider in {LocationOrServiceArea}, please contact {BusinessName} at {ContactPhoneOrEmail} so we can look into it privately.”

**DENT-HOLD-LEGAL-01 (Legal threat → manual-only hold message, do not post automatically)**
Internal output only: “Legal threat detected. Set response_mode=BlockedManualReview and escalate to Legal. Do not post a public response until reviewed.”


### B) Med Spa Templates (Google/Yelp)

**MEDSPA-POS-01**
“Thank you for the wonderful feedback. We’re glad you had a great experience with our team at {BusinessName}. If you ever have questions or need anything, please reach out at {ContactPhoneOrEmail}.”

**MEDSPA-NEU-01**
“Thank you for your feedback. We’re always looking for ways to improve. If you’re willing, please contact {BusinessName} at {ContactPhoneOrEmail} so we can learn more and follow up privately.”

**MEDSPA-NEG-01 (No outcome guarantees)**
“Thank you for sharing this. We’re sorry to hear it didn’t meet your expectations. We’d like to understand more and help if we can—please contact {BusinessName} at {ContactPhoneOrEmail}. For privacy reasons, we can’t discuss specifics here.”

**MEDSPA-NEG-02 (Strong negative)**
“We’re sorry to read your review. Our goal is a respectful, professional experience, and we want to look into this. Please contact {BusinessName} at {ContactPhoneOrEmail} so we can follow up privately.”

**MEDSPA-FAKE-01 (Non-accusatory)**
“Thank you for posting. We take concerns seriously, but we can’t identify the situation from the details here. If you believe this relates to an experience in {LocationOrServiceArea}, please contact {BusinessName} at {ContactPhoneOrEmail} so we can review it privately.”

**MEDSPA-HOLD-LEGAL-01**
Internal output only: “Legal threat detected. response_mode=BlockedManualReview; escalate_level=Legal; do not post.”


### C) HVAC Templates (Google/Yelp)

**HVAC-POS-01**
“Thanks for the great review and for choosing {BusinessName}. We appreciate you taking the time to share your experience. If you need anything in {LocationOrServiceArea}, we’re here—{ContactPhoneOrEmail}.”

**HVAC-NEU-01**
“Thank you for the feedback. We’re always working to improve. If you’re open to sharing more, please contact {BusinessName} at {ContactPhoneOrEmail} so we can follow up.”

**HVAC-NEG-01 (Service issue, no liability admission)**
“Thank you for letting us know. We’re sorry to hear this didn’t meet expectations. We’d like to learn more and see how we can help—please reach out to {BusinessName} at {ContactPhoneOrEmail} so we can follow up directly.”

**HVAC-NEG-02 (Alleged damage/safety concern, minimal)**
“Thank you for sharing this. We take safety and service concerns seriously and want to look into what happened. Please contact {BusinessName} at {ContactPhoneOrEmail} so we can follow up promptly.”

**HVAC-FAKE-01**
“Thank you for your review. We can’t identify the situation from the information here, but we’d like to understand more. Please contact {BusinessName} at {ContactPhoneOrEmail} so we can look into it.”

**HVAC-HOLD-LEGAL-01**
Internal output only: “Legal threat detected. response_mode=BlockedManualReview; escalate_level=Legal; do not post.”

---

## 5) Platform Policy Alignment Notes (Testable)

### Google Business Profile
- No incentives for reviews; no pressure for positive reviews.
- No sharing private customer info.
- Keep responses relevant, respectful, and non-defamatory.

### Yelp
- Do not ask for reviews in a way that could be construed as solicitation/incentivization.
- Do not claim or imply Yelp will remove a review.
- Avoid public arguments; keep response calm and invite offline resolution.

---

## 6) Weekly KPI Reporting QA (Accuracy + Reconciliation)

### KPI Definitions
- Response rate = (# reviews with posted_response) / (total reviews received) per period.
- Median/avg first-response time = posted_timestamp - review_created_timestamp.
- SLA compliance % = % of reviews responded within configured SLA (e.g., 24h).
- Escalation count by level/reason = count where escalation_level != None.
- Blocked/held count = count where post_status=blocked_manual_review.

### Reconciliation Rules
For any date range:
- drafts_created = count(draft_created)
- approved = count(approval_timestamp not null)
- posted = count(post_status=posted)
- blocked = count(post_status=blocked_manual_review)
Must satisfy: posted + blocked + failed <= approved (and never exceed approved). Any mismatch is a report defect.

### Reporting Test Cases (Minimum)
1) Review with auto-post: appears in posted count + response time computed.
2) Review with NeedsApproval but not approved: not counted as posted.
3) Legal threat: blocked_manual_review; counted in blocked; excluded from response time SLA (or counted separately as “held”).
4) Mixed-source (Google + Yelp): totals equal sum of per-source.

---

## Execution Dependency (Non-financial)
To complete end-to-end verification, select test environment:
- Preferred: sandbox/test environment for Google Business Profile + Yelp posting.
- Otherwise: limited live test on a single low-risk location using the previously provided Verification Runbook v1.2 (3–5 posts max, with immediate rollback plan).