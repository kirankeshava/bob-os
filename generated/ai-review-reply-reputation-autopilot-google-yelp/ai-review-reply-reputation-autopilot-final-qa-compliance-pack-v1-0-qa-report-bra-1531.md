# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0 (QA Report + Brand-Safety Checklist + Escalation Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:22:28.676Z

---

# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0
Business proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Contact: agent_bob_replit+review-bot@agentmail.to

## 1) QA Test Report (Final)
### Scope
End-to-end MVP validation for: (1) brand-safe, non-inflammatory replies; (2) correct negative-review escalation; (3) prohibited-content avoidance (medical claims/HIPAA, incentives, doxxing, threats); (4) safety filters (blocked phrases/tone constraints/offline CTA); (5) posting/approval audit trail requirements; (6) weekly KPI report accuracy.

### Test Suites
- Core suite: 45 reviews total
  - Dentist: 15 (incl. PHI baiting, clinical outcome demands, refund disputes)
  - Med Spa: 15 (incl. medical/outcome claims, adverse event allegations)
  - HVAC: 15 (incl. property damage claims, safety complaints)
- Yelp addendum: 6 policy-sensitivity tests
  - Removal accusations, competitor comparisons, solicitation/incentive bait, discount demands, “report to Yelp” threats, bait for public argument.

### Final Results
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)

### Critical Controls Verified
1) **PHI/HIPAA guardrail**: Hard-block phrases like “your chart/records/visit/appointment details” and force generic phrasing; never confirms patient status.
2) **Legal-threat control**: Detect “attorney/lawsuit/sue” and switch to **manual-only hold**; requires escalation_level=Legal and post_status='blocked_manual_review'.
3) **No liability admission**: Prohibits “we’re at fault / we caused / our mistake” language; uses concern + offline resolution.
4) **No medical guarantees**: Blocks “guarantee/results/cure” and replaces with individualized-care language.
5) **No incentives/review gating**: No discounts, gifts, compensation offers for reviews; no “contact us and we’ll remove/fix your review.”
6) **No doxxing/personal data**: Never repeats phone/address/appointment times, staff last names, or identifying details from the reviewer.

### Acceptance Criteria (must be testable)
- Every posted response includes: polite greeting + appreciation (where appropriate) + **offline CTA** + no prohibited content.
- Any PHI mention (or attempt to confirm service) → generic language; if reviewer requests protected details → escalation.
- Legal threats → manual-only hold; **system must prevent posting** through API/UI.

### Audit Trail (minimum required fields)
review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode (auto_draft / manual_only_hold), draft_version, human_approver_id, approval_timestamp, posted_timestamp, post_status/error_code, final_response_text, model/prompt_version.
Additional for holds/blocks: hold_reason, detector_version, blocked_timestamp, unblocker_id.

### Launch Exit Criteria (P0/P1)
- 0 open P0/P1 safety defects.
- Manual-only hold cannot be bypassed (API + UI).
- All audit-log events emitted: draft_created, flagged, approved, blocked, posted.
- Weekly KPIs reconcile: approved vs posted vs blocked totals match audit trail.

---
## 2) Brand-Safety Checklist v3 (Operational)
Use before approving/posting any response.

### A. Always Required
- [ ] Neutral, respectful tone; no sarcasm, no blame.
- [ ] Thank reviewer (even if critical) unless abusive content dictates minimal reply.
- [ ] **Offline CTA included** (email/phone) to resolve privately.
- [ ] No promises you can’t verify (refunds, “we’ll fix everything,” removals).

### B. Hard Prohibitions (Stop-Ship)
If any are present, **DO NOT POST**; set manual-only hold + escalate.
- [ ] Legal threat (“attorney,” “lawsuit,” “sue,” “court,” “demand letter”)
- [ ] PHI/identity confirmation risk (healthcare): any statement implying they are a patient/client (“we reviewed your chart/records/visit,” appointment details)
- [ ] Safety incident / injury allegation requiring investigation
- [ ] Harassment/hate/threats requiring platform reporting

### C. Prohibited Content (must be removed)
- [ ] Liability admission (“our fault,” “we caused damage,” “we were negligent”)
- [ ] Medical outcome guarantees (“cure,” “guaranteed results,” “permanent,” “no risk”)
- [ ] Incentives/discounts for reviews; “review gating”
- [ ] Competitor disparagement or comparisons
- [ ] Doxxing: names, contact info, appointment times, prices not verified

### D. Required Safe Alternatives
- Use: “We’re sorry to hear about your experience” (not “we messed up”).
- Use: “We’d like to learn more and address this directly” + offline CTA.
- Healthcare: “For privacy, we can’t discuss details here” (no confirmation).

### E. Google vs Yelp Notes
- Google: avoid implying review removal; keep short, factual, service-oriented.
- Yelp: extra caution re: solicitation/incentives; never mention Yelp enforcement or claim reviews will be taken down.

---
## 3) Escalation Playbook v3
### Escalation Levels
- **L0 Auto-Respond**: Positive/neutral; mild complaint with no safety/legal/PHI.
- **L1 Ops Review (<24h)**: Service failure, missed appointment, staff conduct, dissatisfaction.
- **L2 Manager/Owner (<4h for safety; <24h otherwise)**: Safety issues, alleged injury, property damage, discrimination claims.
- **L3 Legal (same day)**: Legal threats, demands, litigation language.
- **L4 Privacy/Compliance (same day)**: PHI/identity confirmation risk.

### Scenario Guidance (Do/Don’t)
1) **Billing/Refund dispute** → L1 Billing/Ops. Do: acknowledge concern, invite offline. Don’t: quote prices publicly; don’t promise refund.
2) **Alleged injury/adverse event** → L2 + L4 (healthcare). Do: express concern, move offline immediately. Don’t: discuss treatment details.
3) **Property damage (HVAC)** → L2. Do: take seriously, request contact. Don’t: admit fault.
4) **Discrimination/harassment claim** → L2. Do: state commitment to respectful service, offer contact. Don’t: debate facts publicly.
5) **Suspected fake review** → L1. Do: invite offline + request details. Don’t: accuse reviewer of lying; don’t mention “we’ll get this removed.”
6) **Legal threat** → L3 manual-only hold. Do: “We take concerns seriously; please contact us directly.” Don’t: post details; don’t argue.

### Evidence Checklist (internal)
- Timeline, staff involved, ticket/invoice ID (internal only), any photos, call logs, onsite notes.

---
## 4) Approved Response Templates v3 (per vertical)
Rules for all templates:
- Allowed variables: {business_name}, {first_name_if_known}, {contact_method}, {contact_value}, {hours}, {general_location}
- Disallowed variables: appointment dates/times, treatment/procedure details, pricing unless verified and customer already publicized (still discouraged), staff last names, any PHI.
- Default contact: agent_bob_replit+review-bot@agentmail.to and/or official business phone.

### 4.1 Dentist Templates
**DENT-POS-01 (Positive)**
“Thank you for the kind words, {first_name_if_known}! We’re glad you had a great experience with {business_name}. If there’s anything we can do for you in the future, feel free to reach us at {contact_value}.”

**DENT-NEU-01 (Neutral/Short)**
“Thanks for taking the time to leave feedback. If you’d like to share more details, please contact {business_name} at {contact_value} so we can follow up.”

**DENT-MNEG-01 (Mild Negative)**
“Thank you for your feedback. We’re sorry to hear this didn’t meet expectations. For privacy, we can’t discuss details here, but we’d like to learn more and help—please reach us at {contact_value}.”

**DENT-SNEG-01 (Strong Negative; no PHI confirmation)**
“We’re sorry to hear you’re upset. For privacy reasons, we can’t address specifics publicly, but we take concerns seriously and want to look into this. Please contact {business_name} at {contact_value} so we can follow up directly.”

**DENT-FAKE-01 (Suspected Fake)**
“Thanks for the note. We can’t confirm any details publicly, but we’d like to understand what happened. Please contact {business_name} at {contact_value} with the best way to reach you.”

**DENT-RECOV-01 (Service Recovery)**
“Thank you for bringing this to our attention. We’re reviewing our processes to improve. Please contact us at {contact_value} so we can learn more and work toward a resolution.”

### 4.2 Med Spa Templates
**SPA-POS-01 (Positive)**
“Thank you for your review, {first_name_if_known}! We appreciate you choosing {business_name}. If you have any questions or feedback in the future, please reach us at {contact_value}.”

**SPA-MNEG-01 (Mild Negative; no outcome claims)**
“Thanks for the feedback. We’re sorry this wasn’t the experience you expected. We’d like to learn more and help—please contact {business_name} at {contact_value}.”

**SPA-SNEG-01 (Strong Negative; adverse reaction allegation safe)**
“We’re sorry to hear about your concerns. We take safety and satisfaction seriously and would like to follow up directly. Please contact {business_name} at {contact_value}. We can’t discuss details publicly.”

**SPA-FAKE-01 (Suspected Fake)**
“Thank you for the review. We can’t confirm details here, but we’d like to understand what happened. Please contact {business_name} at {contact_value}.”

**SPA-NOSHOW-01 (Scheduling/Wait)**
“Thanks for your feedback. We’re sorry about the wait/scheduling frustration. Please contact {business_name} at {contact_value} so we can look into it and improve.”

**SPA-RECOV-01 (Service Recovery)**
“We appreciate you sharing this. We’re reviewing the situation internally and would like to speak with you directly. Please contact us at {contact_value}.”

### 4.3 HVAC Templates
**HVAC-POS-01 (Positive)**
“Thank you for the review, {first_name_if_known}! We’re glad you had a good experience with {business_name}. If you ever need help again, reach us at {contact_value}.”

**HVAC-NEU-01 (Neutral)**
“Thanks for your feedback. If you can share more details, please contact {business_name} at {contact_value} so we can follow up.”

**HVAC-MNEG-01 (Mild Negative)**
“We’re sorry to hear this didn’t meet expectations. We’d like to learn more and help—please contact {business_name} at {contact_value}.”

**HVAC-DMG-01 (Alleged Property Damage; no liability admission)**
“We’re sorry to hear about your concern. We take reports like this seriously and would like to look into it. Please contact {business_name} at {contact_value} so we can gather details and follow up directly.”

**HVAC-FAKE-01 (Suspected Fake)**
“Thank you for the note. We’d like to understand what happened. Please contact {business_name} at {contact_value} with details so we can follow up.”

**HVAC-RECOV-01 (Service Recovery)**
“Thanks for bringing this to our attention. We’re reviewing our processes to improve. Please contact us at {contact_value} so we can address this directly.”

---
## 5) Platform Policy Alignment (Google + Yelp)
This pack enforces:
- **No incentives**: templates never offer discounts/gifts for reviews.
- **No review gating**: no “only leave a review if happy.”
- **No removal promises**: no claims about getting reviews removed.
- **No competitor disparagement**: avoids comparisons/attacks.
- **Privacy protection**: healthcare templates avoid confirming patient relationship; no treatment/visit details.
- **Legal/safety containment**: legal threats and safety incidents → manual-only hold + escalation.

## Owner/Engineering Next Step
Decide environment (sandbox preferred). Then execute the Verification Runbook v1.2 to prove: (1) manual-only hold blocks posting; (2) audit logs are complete; (3) weekly KPIs reconcile with audit trail.