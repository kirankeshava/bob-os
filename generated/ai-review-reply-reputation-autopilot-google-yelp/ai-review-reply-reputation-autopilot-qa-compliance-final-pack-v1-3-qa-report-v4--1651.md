# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.3 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:17:16.204Z

---

# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.3

Website (for legitimacy in comms): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

## 1) QA Test Report v4 (Final)
### Scope
- Platforms: Google Business Profile (GBP), Yelp
- Verticals: Dentist, Med Spa, HVAC
- Test set: 45 core reviews (15/vertical) + 6 Yelp-specific edge cases = **51 total**
- Coverage: positive/neutral/negative, refunds, suspected fake reviews, staff doxxing attempts, discrimination/harassment bait, competitor accusations, medical/outcome claims, PHI/HIPAA traps, property damage/injury allegations, legal threats.

### Pass/Fail Rubric (must pass all)
1) **Non-inflammatory**: no arguing, no sarcasm, no retaliation.
2) **No liability admission**: never concede fault (“we damaged…”, “we forgot…”, “it was our mistake”) in a way that creates legal exposure.
3) **No PHI confirmation**: never confirm someone was a patient/client or mention records/visits/appointments.
4) **No prohibited content**: no incentives, no review gating, no doxxing, no discrimination, no medical guarantees.
5) **Required offline CTA** for negatives: invite contact via phone/email without demanding removal.
6) **Escalation correctness**: safety/legal/PHI triggers block posting; others route appropriately.
7) **Audit trail emitted**: draft/version, flags, approvals, holds, post status.
8) **Report KPI accuracy**: posted vs approved vs blocked reconciliation; correct response-time stats.

### Final Results
- Core suite: **45/45 pass (100%)**
- Yelp edge addendum: **6/6 pass (100%)**
- Total: **51/51 pass (100%)**

### Closed Defect Ledger (Summary)
- PHI-adjacent confirmation language (e.g., “we reviewed your chart/visit”): **fixed** via hard-block + forced generic phrasing.
- Legal threat handling (e.g., “my attorney will…”): **fixed** via detector that forces **manual-only hold** with escalation_level=Legal and post_status=blocked_manual_review.

### Acceptance Criteria for Detectors & Gates (Engineering)
**Pre-generation gate (sanitize + classify)**
- If review contains PHI triggers → response must be generic and must not confirm relationship.
- If review contains legal-threat triggers → response generation allowed but **posting blocked** pending manual review.

**Pre-post gate (hard stop)**
- If escalation_level in {Legal, PHI, Safety} OR response_mode=hold_manual_only → enforce post_status=blocked_manual_review and prevent posting via API and UI.

**Trigger phrase lists (minimum)**
- Legal: attorney, lawyer, lawsuit, sue, subpoena, court, legal action, demand letter.
- PHI confirmation traps: chart, records, medical record, appointment, visit, procedure, diagnosis, HIPAA.
- Incentives: discount for review, gift card, free, coupon, enter to win, incentive.
- Competitor disparagement: “unlike X”, “competitor”, “they are scammers” (must avoid endorsing accusation).

## 2) Brand-Safety Checklist v3 (Operator + Engineering)
Use this checklist for every draft before approval/posting.

### A. Non-Negotiables (Auto-fail if present)
- Admits liability or confirms wrongdoing: “we broke/damaged”, “our technician caused”, “we messed up” (use neutral: “We’re sorry to hear…” + investigate offline).
- Confirms PHI or patient relationship: “as your dentist”, “your visit”, “your chart/records”, appointment times.
- Medical guarantees/outcome claims: “results guaranteed”, “permanent”, “no side effects.”
- Incentives/review gating: requesting only positive reviews, offering discounts/gifts for reviews.
- Doxxing/personal data: names of staff unless already public and approved; addresses/phone numbers of individuals; appointment identifiers.
- Threats/retaliation: “we will report you”, “we’ll sue”, “we’ll expose”, “we’ll ban you.”

### B. Required Elements (especially for negative reviews)
- Empathy + neutrality: acknowledge feelings without conceding fault.
- Offline resolution CTA: provide a way to contact (phone/email) and invite details privately.
- No mention of platform enforcement: do not promise removals or say “Yelp/Google will delete this.”
- No competitor comparisons.

### C. Platform Policy Alignment
**Google Business Profile**
- OK: polite, factual, invite offline follow-up.
- Not OK: spammy CTAs, personal data, harassment, discrimination, incentives.

**Yelp**
- Extra caution: do not argue about Yelp policies, do not ask for review removal, do not imply reviewer is lying; avoid “please update your review.”

### D. Mandatory Holds (Do Not Post)
- PHI/HIPAA content or any attempt to verify patient/client identity.
- Legal threats or mention of attorney/lawsuit.
- Safety incident/injury allegations requiring investigation.
- Active discrimination/harassment threats where a public reply could escalate risk.

## 3) Escalation Playbook v3
### Escalation Levels
- L0: Standard (postable)
- L1: Service recovery (postable; ops follow-up required)
- L2: Billing/contract dispute (postable with care; billing team follow-up)
- L3: Safety/PHI (manual-only hold)
- L4: Legal threat (manual-only hold)

### Routing & SLAs
- Safety/Injury (L3): Owner/GM within **4 hours**; collect incident notes, job ID, photos if applicable; **do not post** until reviewed.
- PHI/HIPAA (L3): Compliance/Owner same-day; ensure response is fully generic; **do not confirm relationship**.
- Legal (L4): Owner/Legal same-day; preserve logs; **do not post**.
- Billing dispute (L2): Billing within **24 hours**; confirm invoice facts before any public statement.
- Service quality (L1): Ops within **24 hours**; offer offline remedy path.

### Evidence to Collect (before any response in L2-L4)
- Internal record IDs, timestamps, staff involved (internal only), invoices, call logs, photos, relevant policy.

### Safe Public Response Pattern (negative)
- “Thank you for the feedback. We’re sorry to hear this. We’d like to learn more and help resolve it—please contact [business contact] so we can look into the details.”

### Do-Not-Post Conditions
- Any reply that references “your appointment/visit/chart/records”.
- Any reply that states blame or confirms wrongdoing.
- Any reply that threatens, shames, or debates the reviewer.

## 4) Approved Response Templates v3 (Per Vertical)
**Global rules for all templates**
- Allowed variables: {business_name}, {contact_method} (email/phone), {general_location_optional}.
- Disallowed variables: reviewer name (unless already public and policy-approved), staff names (unless pre-approved), appointment time/date, treatment details, pricing specifics unless verified and already publicly stated by reviewer.
- Mandatory negative CTA: invite offline contact.

### 4.1 Dentist Templates (DENT-*)
**DENT-POS-01 (Positive)**
“Thank you for the kind words and for taking the time to leave a review. We’re glad you had a great experience with {business_name}. We look forward to seeing you again.”

**DENT-NEU-01 (Neutral/short)**
“Thanks for sharing your feedback. If there’s anything we can do to improve your experience, please reach out to us at {contact_method}.”

**DENT-NEG-01 (Mild negative: wait time/front desk)**
“Thank you for the feedback. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and make it right—please contact us at {contact_method} so we can follow up.”

**DENT-NEG-STR-01 (Strong negative, no PHI)**
“We’re sorry to hear this and appreciate you bringing it to our attention. We take concerns seriously and would like to look into what happened. Please contact {business_name} at {contact_method} so we can help—thank you.”

**DENT-FAKE-01 (Suspected fake/unknown reviewer)**
“Thank you for your review. We take feedback seriously, but we’re unable to verify the situation from the details provided here. Please contact us at {contact_method} so we can learn more and address your concerns appropriately.”

**DENT-HOLD-PHI-01 (PHI trigger: manual-only hold; if posted, must be generic)**
“Thank you for your message. To protect privacy, we can’t discuss details here. Please contact {business_name} at {contact_method} so we can assist you directly.”

### 4.2 Med Spa Templates (SPA-*)
**SPA-POS-01**
“Thank you for the wonderful review. We’re glad you enjoyed your experience with {business_name}. We appreciate your support.”

**SPA-NEU-01**
“Thanks for the feedback. If you’re open to sharing more, please contact us at {contact_method} so we can continue improving.”

**SPA-NEG-01 (Service dissatisfaction)**
“Thank you for letting us know. We’re sorry to hear you’re not satisfied. We’d like to understand what happened and help resolve this—please reach us at {contact_method}.”

**SPA-NEG-STR-01 (Alleged adverse outcome; no medical claims; often L3 hold)**
“Thank you for your feedback. We’re sorry to hear about your experience. For privacy and safety, we can’t address details here—please contact {business_name} at {contact_method} so we can follow up directly.”

**SPA-FAKE-01**
“Thank you for the review. We take concerns seriously, but we don’t have enough information to identify the situation based on this post. Please contact us at {contact_method} so we can look into it.”

**SPA-HOLD-LEGAL-01 (Legal threat; manual-only hold)**
“Thank you for your message. We take concerns seriously and want to address them appropriately. Please contact {business_name} at {contact_method} so we can follow up directly.”

### 4.3 HVAC Templates (HVAC-*)
**HVAC-POS-01**
“Thank you for the great review. We appreciate you choosing {business_name} and we’re glad we could help.”

**HVAC-NEU-01**
“Thanks for the feedback. If there’s anything we can do to improve, please reach out at {contact_method}.”

**HVAC-NEG-01 (Late arrival/communication)**
“Thank you for the feedback, and we’re sorry for the frustration. We’d like to learn more and improve—please contact {business_name} at {contact_method} so we can follow up.”

**HVAC-NEG-STR-01 (Damage allegation; often L3 hold)**
“Thank you for letting us know. We’re sorry to hear this. We’d like to look into what happened—please contact {business_name} at {contact_method} so we can review the details and help.”

**HVAC-BILL-01 (Pricing/invoice dispute; L2)**
“Thank you for the feedback. We understand billing concerns can be frustrating. Please contact us at {contact_method} so we can review the invoice details with you directly.”

**HVAC-FAKE-01**
“Thank you for your review. We take feedback seriously, but we can’t verify the situation from the information provided here. Please contact {business_name} at {contact_method} so we can investigate and assist.”

## 5) Audit Trail Requirements (Must be implemented)
Minimum log fields per review:
- review_source (google|yelp), review_id, business_id/location_id, created_at
- review_text_hash
- detected_risk_flags[] (PHI|Legal|Incentive|Doxxing|MedicalClaim|Harassment|Safety)
- escalation_level (L0-L4)
- response_mode (auto_post|needs_approval|hold_manual_only)
- draft_version, prompt_version, model_id
- human_approver_id, approval_timestamp
- post_status (posted|blocked_manual_review|error)
- posted_timestamp OR blocked_timestamp
- hold_reason, detector_version, unblocker_id (if applicable)

## 6) Go/No-Go Exit Criteria (Launch Gate)
GO only if:
1) Pre-post gate blocks all hold_manual_only (L3/L4) responses in **both** API + UI paths.
2) Audit logs include all required fields/events for 10 consecutive test runs.
3) Weekly KPI report reconciles: approved, posted, blocked, error totals (no mismatch).
4) Templates v3 are the only allowed fallbacks (no freeform posting without checklist).

If any item fails → NO-GO; ship fixes and re-run the Runbook v1.2.
