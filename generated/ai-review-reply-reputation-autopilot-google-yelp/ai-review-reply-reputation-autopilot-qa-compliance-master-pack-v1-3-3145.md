# AI Review Reply & Reputation Autopilot — QA & Compliance Master Pack v1.3

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:31:32.896Z

---

# AI Review Reply & Reputation Autopilot — QA & Compliance Master Pack v1.3

**Product:** AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)  
**Business website (share with customers/partners):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
**Business contact email:** agent_bob_replit+review-bot@agentmail.to  
**Owner/Agent identity:** Bob Smith

## 0) Purpose
This Master Pack is the single handoff artifact to ship a brand-safe, policy-aligned MVP. It consolidates: (1) QA test results, (2) safety checklist, (3) escalation playbook, (4) approved response templates per vertical, (5) detector + posting gate acceptance criteria, (6) audit trail schema requirements, and (7) a step-by-step verification runbook and Go/No-Go launch rubric.

## 1) Final QA status (Release Candidate)
### 1.1 Test suite coverage
- **Core suite:** 45 reviews (15 Dentist, 15 Med Spa, 15 HVAC) including edge cases: PHI/HIPAA, medical outcome claims, pricing disputes, discrimination/harassment, doxxing attempts, competitor accusations, refund demands, suspected fake reviews, property damage, injury, legal threats.
- **Yelp addendum:** 6 Yelp-specific edge cases: removal accusations, competitor comparisons, incentive-adjacent bait, “report to Yelp” threats, public back-and-forth baiting, discount demands.

### 1.2 Final pass rates
- **Core suite:** 45/45 pass (100%)
- **Yelp addendum:** 6/6 pass (100%)

### 1.3 Closed critical issues (P0/P1)
All previously observed P1 issues were resolved by two guardrails:
1) **PHI confirmation hard block** on phrases implying record access/visit confirmation (e.g., “chart/records/your visit”).
2) **Legal threat manual-only hold**: if “attorney/lawsuit/sue” etc. detected, response mode becomes **blocked_manual_review** and escalation_level=Legal.

## 2) Non-negotiable brand-safety rules (Brand-Safety Checklist v2)
Use as a tick-box checklist for any draft before approval/posting.

### 2.1 Prohibited content (must be absent)
- **No PHI/HIPAA confirmation:** Do not confirm someone is/was a patient/client; do not reference appointments, charts, records, treatment details.
- **No admission of liability:** No “we caused,” “our fault,” “we made a mistake,” “we damaged,” “we injured.”
- **No medical guarantees/outcome claims:** No “cure,” “permanent,” “guaranteed results,” “100% safe,” “clinically proven” unless verified and compliant.
- **No incentives or solicitation tied to reviews:** No discounts, gifts, refunds, or “contact us for a deal” in exchange for review changes.
- **No doxxing or personal data:** No names of staff/customers, phone numbers, addresses beyond official business contact, no identifying details.
- **No threats/retaliation:** No legal threats back to reviewer; no intimidation.
- **No competitor disparagement:** No “they’re lying,” “other company is terrible,” “we’re better than X.”
- **No policy promises:** Do not claim Yelp/Google will remove a review or that you can “get it taken down.”

### 2.2 Required elements (must be present in most replies)
- **Professional, calm tone** (no sarcasm, no arguing).
- **Offline CTA** to resolve: invite reviewer to contact the business directly.
- **Non-confirmation wording for sensitive categories** (healthcare): “We can’t discuss details publicly” / “Please contact our office so we can look into this.”

### 2.3 Mandatory gating
- If any of the detectors in Section 5 trigger **Legal / PHI / Safety incident**, system must set **post_status='blocked_manual_review'** (no auto-post).

## 3) Escalation Playbook v2 (common negative scenarios)
### 3.1 Escalation levels
- **L0 (Auto-OK):** Mild negative tone, no allegations of harm, no protected classes, no legal threat, no PHI, no safety incident.
- **L1 (Ops Review <24h):** Service quality complaints, scheduling/no-show disputes, workmanship dissatisfaction, staff professionalism (non-harassment).
- **L2 (Owner/GM <4h):** Safety issues, alleged injury/damage, discrimination claims, harassment/hate speech, credible threats.
- **L3 (Legal same-day):** Legal threat keywords, demand letters, attorney involvement, explicit intent to sue.
- **PHI Hold (Manual-only):** Any review that includes patient identifiers or requests/mentions record details; any draft risk of confirming relationship.

### 3.2 “DO NOT POST” conditions
If any are present, **do not post** until human/legal clears:
- Mentions of “attorney/lawsuit/sue/demand letter.”
- Requests to reveal medical records, appointment times, or treatment.
- Allegations of injury, unsafe conduct, or criminal behavior.
- Harassment/hate speech that may require platform reporting.

### 3.3 Evidence checklist by scenario
- **Billing dispute:** invoice, signed estimate, payment records, call logs.
- **Quality complaint:** job notes, photos before/after, technician notes.
- **Medical complaint:** internal incident report; do not discuss publicly.
- **Damage/injury:** photos, incident timeline, witness notes, insurance contact.

## 4) Approved response templates v2 (per vertical)
**Global rules for all templates:**
- Allowed variables: {BusinessName}, {ContactChannel} (phone/email), {LocationOrTeam} (non-personal), {GeneralServiceCategory}.  
- Disallowed variables: staff names, appointment date/time, procedure names, pricing unless explicitly stated by reviewer and independently verified.
- Platform note: keep length concise; avoid policy/legal talk.

### 4.1 Dentist (6 templates)
**DENT-POS-01 (Positive)**
“Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. If there’s anything we can do for you in the future, please reach out to us at {ContactChannel}.”

**DENT-NEU-02 (Neutral/short praise)**
“Thanks for your feedback. We appreciate you taking the time to share it, and we’ll use it to keep improving at {BusinessName}. If you’d like to tell us more, please contact us at {ContactChannel}.”

**DENT-MNEG-03 (Mild negative: wait time/communication)**
“Thank you for letting us know. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and see how we can help—please contact {BusinessName} at {ContactChannel}.”

**DENT-SNEG-04 (Strong negative, no PHI confirmation)**
“Thank you for your feedback. We take concerns like this seriously, but we can’t discuss details in a public forum. Please contact {BusinessName} at {ContactChannel} so our team can look into this and work toward a resolution.”

**DENT-FAKE-05 (Suspected fake/unrecognized reviewer)**
“Thank you for posting. We take feedback seriously, but we’re not able to identify the experience described. Please contact {BusinessName} at {ContactChannel} so we can review what happened and address any concerns.”

**DENT-RECOV-06 (Service recovery without liability)**
“Thank you for sharing your concerns. We aim to provide a respectful, high-quality experience, and we’d like the opportunity to make this right. Please contact {BusinessName} at {ContactChannel} so we can help.”

### 4.2 Med Spa (6 templates)
**SPA-POS-01**
“Thank you for the wonderful review. We’re happy you enjoyed your visit with {BusinessName}. If you have any questions or need anything, please reach us at {ContactChannel}.”

**SPA-NEU-02**
“Thanks for your feedback. We appreciate you taking the time to share your experience. If you’d like to discuss further, please contact {BusinessName} at {ContactChannel}.”

**SPA-MNEG-03 (Results dissatisfaction—no outcomes promises)**
“Thank you for sharing this. We’re sorry to hear you’re not satisfied. We’d like to understand more and discuss next steps—please contact {BusinessName} directly at {ContactChannel}. We can’t address specifics publicly.”

**SPA-SNEG-04 (Strong negative; safety language)**
“Thank you for bringing this to our attention. We take concerns seriously, and we want to address them appropriately. Please contact {BusinessName} at {ContactChannel} so we can review the matter directly.”

**SPA-FAKE-05**
“Thank you for the review. We’re not able to match the situation described from the information provided. Please contact {BusinessName} at {ContactChannel} so we can look into it and assist.”

**SPA-RECOV-06**
“We appreciate your feedback. Our goal is to provide a professional, comfortable experience, and we’d like the chance to improve this for you. Please contact {BusinessName} at {ContactChannel} so we can help.”

### 4.3 HVAC (6 templates)
**HVAC-POS-01**
“Thanks for the great review. We’re glad {BusinessName} could help. If you ever need service again, please reach out at {ContactChannel}.”

**HVAC-NEU-02**
“Thank you for the feedback. We appreciate you sharing your experience and will use it to improve. If you’d like to provide more details, contact us at {ContactChannel}.”

**HVAC-MNEG-03 (Scheduling/delay)**
“Thank you for letting us know. We’re sorry for the frustration and would like to understand what happened. Please contact {BusinessName} at {ContactChannel} so we can look into this.”

**HVAC-SNEG-04 (Work quality complaint; avoid liability)**
“Thank you for your feedback. We take workmanship concerns seriously and want to address this directly. Please contact {BusinessName} at {ContactChannel} so we can review the situation and help.”

**HVAC-FAKE-05**
“Thank you for posting. We’re not able to identify the job described from the information here. Please contact {BusinessName} at {ContactChannel} so we can investigate and assist.”

**HVAC-RECOV-06**
“We appreciate you bringing this to our attention. We aim to deliver reliable service and would like the chance to resolve this. Please contact {BusinessName} at {ContactChannel} so we can help.”

## 5) Detectors + posting gates (acceptance criteria)
### 5.1 Detector triggers (minimum)
- **PHI risk:** “chart,” “records,” “your visit,” “your appointment,” “treatment plan,” “diagnosis,” “procedure,” “prescription.”
  - Expected: risk_flag=PHI, response must avoid confirmation language; may force generic template.
- **Legal threat:** “attorney,” “lawyer,” “lawsuit,” “sue,” “legal action,” “demand letter.”
  - Expected: escalation_level=Legal; post_status='blocked_manual_review'.
- **Incentive language:** “discount,” “coupon,” “gift,” “free,” “refund if you change review.”
  - Expected: block incentives wording; rewrite or manual review.
- **Competitor disparagement bait:** “unlike X company,” “your competitor is…”
  - Expected: neutralize; no competitor mention.
- **Safety incident:** “injured,” “fire,” “leak caused damage,” “hazard,” “unsafe.”
  - Expected: escalation_level=Owner/GM; likely manual review.

### 5.2 Posting gates
- If post_status='blocked_manual_review', system must prevent posting via **all paths** (API and UI) until unblocked by authorized user.

## 6) Audit trail schema (required fields)
Minimum required logging fields:
- review_source (Google/Yelp), review_id, business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level, hold_reason
- draft_version, model/prompt version, detector_version
- human_approver_id, approval_timestamp
- posted_timestamp
- post_status (posted | blocked_manual_review | failed)
- error_code (if failed)
- final_response_text
- blocked_timestamp, unblocker_id (if applicable)

Required events:
- draft_created, flagged, approved, blocked, posted, post_failed, unblocked

## 7) Weekly KPI report definitions (must reconcile)
- Response rate = (# reviews with posted response) / (total reviews ingested)
- Median/avg first response time (from review_created_at to posted_timestamp)
- SLA compliance % (responses within target window)
- Rating trend (7/30-day)
- Sentiment buckets (positive/neutral/negative; rule-based or model-based but versioned)
- Escalations: count by level + reason
- Unresolved escalations aging (days since flagged without resolution)
- Reconciliation: approved vs posted vs blocked vs failed must sum correctly

## 8) Verification Runbook summary (execute before launch)
1) Ingest sample reviews including PHI + legal threat + incentive bait.
2) Confirm detector flags match expected.
3) Confirm drafts use approved template IDs and include offline CTA.
4) Attempt to post a legal-threat case: must be blocked_manual_review.
5) Approve + post a safe case: must post successfully; audit log must include all required fields.
6) Generate weekly report: verify KPI calculations and reconciliation.
7) Attach evidence: audit log export + KPI export + screenshots.

## 9) Google Business Profile vs Yelp policy alignment appendix (testable)
### 9.1 Universal (both)
- No incentives for reviews; no “update your review and we’ll…”
- No fake reviews; no astroturfing; no suggesting employees/agents pose as customers.
- No sharing personal data; no PHI.

### 9.2 Yelp-specific sensitivities
- Do not claim Yelp will remove reviews; do not discuss “Yelp filtering” mechanics.
- Avoid public back-and-forth; invite offline resolution.
- No competitor disparagement.

### 9.3 Google Business Profile sensitivities
- Keep responses relevant; avoid spam and promotional content.
- Avoid personal data and medical details.

## 10) Ops Daily Review Triage SOP (one-page)
1) **Classify** each new review: positive / neutral / negative.
2) **Run detectors**: PHI, legal, incentives, safety, harassment.
3) If **PHI or Legal** → set **blocked_manual_review** + escalate per playbook.
4) If L1/L2 → assign to owner/ops/billing with SLA; collect evidence.
5) Post only after checklist pass; use approved templates; keep offline CTA.
6) Log everything; never reference records/appointments; never offer incentives.

## 11) Go/No-Go launch rubric
**Go** only if:
- Posting gates enforce blocked_manual_review across API + UI.
- Audit logs contain all required fields and events.
- Weekly KPI report reconciles posted/blocked/failed counts.
- Templates used are versioned and match approved library.
- Evidence attached (exports + screenshots) for at least 10 test cases including PHI and legal.

**No-Go** if any:
- Any PHI confirmation appears in a draft.
- Legal threat case can be posted.
- Missing audit fields or inability to reconcile KPIs.

---
**Document control:** v1.3 (master consolidation). Update version with any detector/template/reporting changes; re-run regression suite on any prompt/model change.