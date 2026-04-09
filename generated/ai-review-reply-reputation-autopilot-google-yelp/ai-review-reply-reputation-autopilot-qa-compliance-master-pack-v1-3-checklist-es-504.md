# AI Review Reply & Reputation Autopilot — QA/Compliance Master Pack v1.3 (Checklist + Escalation Playbook + Approved Templates + QA Acceptance Criteria)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:44:07.317Z

---

# AI Review Reply & Reputation Autopilot — QA/Compliance Master Pack v1.3

Business website (customer legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1  
Business contact email: agent_bob_replit+review-bot@agentmail.to

## 1) Scope & goal
This pack defines brand-safety and platform-policy controls for drafting and posting responses to Google Business Profile (GBP) and Yelp reviews. It is designed to prevent: (a) PHI/HIPAA confirmation, (b) medical outcome guarantees, (c) liability admissions, (d) incentives/review gating, (e) doxxing/personal data, (f) competitor disparagement, and (g) unsafe posting when legal/safety threats are present.

**Launch exit criteria:**
- Draft generation: safe response produced for all non-blocked reviews.
- Escalation logic: correct escalation_level + response_mode.
- Posting gates: manual-only holds cannot post via API or UI.
- Audit trail: required fields/events emitted for every review.
- Reporting: weekly KPIs reconcile (approved vs posted vs blocked/held).

---
## 2) Brand-Safety & Platform Compliance Checklist v3 (tick-box)
### 2.1 Universal prohibitions (GBP + Yelp)
- [ ] **No PHI/PII confirmation**: do not confirm the person was a patient/client, visited, had an appointment, procedure, treatment plan, chart/records, payment method, or diagnosis.
- [ ] **No medical guarantees/outcome claims** (dentist/med spa): no “guarantee”, “permanent”, “cured”, “results assured”, “0 pain”, “best outcome”, “FDA-approved results” unless the customer explicitly provided verifiable factual statement and it’s non-claim; even then prefer avoiding.
- [ ] **No admitting liability/fault**: avoid “we messed up”, “our mistake”, “we caused”, “we failed you”, “we were negligent”. Use neutral language: “we’re sorry to hear you had a frustrating experience.”
- [ ] **No incentives or solicitation**: do not offer discounts, refunds, gifts, future perks in exchange for reviews; do not ask for “5 stars.”
- [ ] **No review gating**: do not direct only happy customers to review; do not mention filtering.
- [ ] **No doxxing / personal data**: no staff last names, schedules, specific timestamps, addresses beyond business address already public, phone numbers of individuals, or internal ticket IDs.
- [ ] **No threats/retaliation**: never imply legal action against reviewer or threaten consequences.
- [ ] **No competitor disparagement**: do not mention competitor wrongdoing; avoid “unlike X” comparisons.
- [ ] **No platform enforcement promises**: do not claim Yelp/Google will remove the review; do not say “we reported you to Yelp/Google”.

### 2.2 Required response elements
- [ ] **Professional, calm tone** (non-inflammatory).
- [ ] **Offline CTA**: ask them to contact the business directly to resolve (no incentives). Use neutral phrasing and provide official contact channel.
- [ ] **No back-and-forth baiting**: do not argue point-by-point publicly.

### 2.3 Hard-block / manual-only hold triggers (must NOT auto-post)
If any trigger is detected, set: `response_mode=hold_manual_only`, `post_status=blocked_manual_review`, and escalate.
- [ ] **Legal threat keywords**: “attorney”, “lawyer”, “lawsuit”, “sue”, “court”, “legal action”, “demand letter”.  
  → `escalation_level=Legal`.
- [ ] **PHI confirmation risk phrases** in the draft or intended draft: “your chart/records”, “your visit”, “your appointment”, “as your provider”, “we reviewed your file”, “we confirmed…”.  
  → `escalation_level=Compliance`.
- [ ] **Safety incident**: injury, fire, electrical hazard, carbon monoxide, severe adverse reaction, “unsafe”, “nearly died”.  
  → `escalation_level=Safety`.
- [ ] **Discrimination/harassment** allegations (protected class).  
  → `escalation_level=HR/Owner`.

### 2.4 Yelp-specific sensitivity notes
- [ ] Do not ask reviewer to “update” or “remove” their Yelp review.
- [ ] Avoid language implying Yelp will enforce on your behalf.
- [ ] Keep CTA off-platform (call/email) but do not mention “we can make it right if you change your review.”

---
## 3) Escalation Playbook v3 (common negative scenarios)
### Routing SLAs
- **Legal threats**: same business day; do not post publicly. Owner/Legal.
- **Safety incidents**: <4 hours. Owner/GM + Ops.
- **PHI/HIPAA/identity-sensitive**: same day. Compliance owner.
- **Billing dispute/refund demand**: <24 hours. Billing lead.
- **Service quality / staff conduct**: <24 hours. Ops/GM.
- **Suspected fake/competitor review**: <24 hours. Owner/Marketing.

### DO-NOT-POST conditions (always hold)
- Any legal threat, active litigation mention, or demand letter.
- Any review where responding would confirm customer relationship in regulated contexts (health/med spa/dentistry).
- Any ongoing safety investigation or injury claim.
- Any review with hate speech/violent threats: respond only if policy allows; otherwise hold and document.

### Evidence checklist (collect internally before response)
- Review ID, platform, timestamp, star rating.
- Relevant internal records **without referencing them publicly**.
- Photos, invoices, work order notes (HVAC), staff schedule (internal).
- Prior communications (email/text) for context.

### Scenario response guidance (public)
- **Billing dispute**: empathize; invite offline resolution; avoid admitting error; never disclose transaction details.
- **Alleged damage/injury**: acknowledge concern; invite offline; state you take safety seriously; hold if severe.
- **Discrimination**: acknowledge seriousness; escalate; avoid details publicly.
- **PHI/HIPAA**: respond generically; do not confirm relationship; “We can’t address details here.”
- **Suspected fake**: polite, non-accusatory; invite offline; optionally state you can’t locate details but want to help.

---
## 4) Approved Response Template Library v3 (platform-safe)
**Global rules for variables:**
- Allowed: `{business_name}`, `{contact_phone}`, `{contact_email}`, `{website_url}`, `{location_city}`, `{first_name_if_provided_by_reviewer}` (first name only and only if reviewer used it), `{general_service_category}`.
- Not allowed: appointment dates, procedure names tied to person, pricing details unless reviewer publicly stated and business verifies without adding new info, staff last names.

### 4.1 Dentist templates (GBP/Yelp)
**DENT-POS-01 (Positive)**
“Thank you for the kind words. We appreciate you taking the time to share your experience with {business_name}. If there’s anything we can do to support you in the future, please reach us at {contact_phone} or {contact_email}.”

**DENT-NEU-01 (Neutral/short)**
“Thanks for the feedback. We’re always working to improve, and we appreciate you sharing this with {business_name}. If you’d like to provide more detail, please contact us at {contact_email} so we can follow up.”

**DENT-NEG-01 (Mild negative)**
“We’re sorry to hear this was frustrating. We’d like to understand what happened and see how we can help. Please contact our office at {contact_phone} or {contact_email}.”

**DENT-NEG-02 (Strong negative; no PHI confirmation)**
“Thank you for bringing this to our attention. We can’t discuss details in a public forum, but we take feedback seriously and want to address your concerns directly. Please contact {business_name} at {contact_phone} or {contact_email}.”

**DENT-FAKE-01 (Suspected fake/unknown)**
“Thanks for the note. We’re not able to locate enough information to understand what this refers to, but we want to help if you reached out to us. Please contact {business_name} at {contact_email} with any details you’re comfortable sharing so we can look into it.”

**DENT-HOLD-LEGAL-01 (Legal threat → hold manual only; do not auto-post)**
“(HOLD — manual review required) We take concerns seriously and want to address them appropriately. Please contact {business_name} at {contact_email} so we can route this to the right team.”

### 4.2 Med Spa templates (GBP/Yelp)
**SPA-POS-01**
“Thank you for your review. We appreciate you choosing {business_name} and we’re glad you had a positive experience. If you ever need assistance, reach us at {contact_phone} or {contact_email}.”

**SPA-NEG-OUTCOME-01 (Avoid outcome debate)**
“We’re sorry to hear you’re disappointed. We can’t address specifics publicly, but we’d like to understand your concerns and discuss options directly. Please contact {business_name} at {contact_phone} or {contact_email}.”

**SPA-HIPAA-01 (PHI-sensitive generic)**
“Thanks for your message. To protect everyone’s privacy, we can’t discuss details here. Please contact {business_name} at {contact_email} so we can follow up privately.”

**SPA-FAKE-01**
“We take feedback seriously, but we don’t have enough information to identify what this refers to. If you’re willing, please contact {business_name} at {contact_email} so we can look into it.”

**SPA-NEG-STAFF-01**
“We’re sorry to hear this. Professional, respectful service is important to us. Please reach out to {business_name} at {contact_email} so we can review your concerns privately.”

**SPA-HOLD-LEGAL-01 (manual-only)**
“(HOLD — manual review required) Please contact {business_name} at {contact_email} so we can route your message to the appropriate team.”

### 4.3 HVAC templates (GBP/Yelp)
**HVAC-POS-01**
“Thank you for the review and for choosing {business_name}. We appreciate the opportunity to help. If you need anything else, contact us at {contact_phone} or {contact_email}.”

**HVAC-NEG-01 (Scheduling/late arrival)**
“We’re sorry the timing didn’t meet your expectations. We’d like to learn more and see how we can make this right. Please contact {business_name} at {contact_phone} or {contact_email}.”

**HVAC-NEG-02 (Work quality dispute)**
“Thanks for the feedback. We take concerns seriously and want to understand what happened. Please contact {business_name} at {contact_email} so we can review this with you directly.”

**HVAC-SAFETY-01 (Possible hazard → escalate)**
“Thank you for raising this. Safety is extremely important to us. Please contact {business_name} at {contact_phone} immediately so we can address this directly.”  
(If severe injury/fire/CO: hold manual-only + Safety escalation.)

**HVAC-FAKE-01**
“We’re not finding enough details to identify this job, but we’d like to help if you reached out to us. Please contact {business_name} at {contact_email} with the service address and date (privately) so we can look into it.”

**HVAC-HOLD-LEGAL-01 (manual-only)**
“(HOLD — manual review required) Please contact {business_name} at {contact_email} so we can route this to the appropriate team.”

---
## 5) QA Acceptance Criteria (must be testable)
### 5.1 Draft safety checks (automated)
- Draft must contain an offline CTA in >= 95% of non-blocked negative reviews.
- Draft must not contain blocked phrases (liability admissions, PHI confirmation, incentives) with 0 tolerance.
- Draft must not include medical outcome guarantees (0 tolerance).

### 5.2 Escalation classification
- Legal keywords → `escalation_level=Legal`, `response_mode=hold_manual_only`.
- PHI-risk phrases → `escalation_level=Compliance`, `response_mode=hold_manual_only`.
- Severe safety → `escalation_level=Safety`, `response_mode=hold_manual_only`.

### 5.3 Posting/approval audit trail (required fields)
Minimum log fields per review event: `review_source`, `review_id`, `business_id/location_id`, `review_text_hash`, `detected_risk_flags`, `escalation_level`, `response_mode`, `draft_version`, `model/prompt_version`, `human_approver_id` (if approved), `approval_timestamp`, `post_status`, `error_code` (if any), `posted_timestamp` (if posted), `final_response_text`, plus for holds: `hold_reason`, `detector_version`, `blocked_timestamp`, `unblocker_id`.

### 5.4 Weekly report reconciliation
- Counts must reconcile: `drafted = approved + blocked + pending_approval` and `posted <= approved`.
- KPI definitions locked: response rate, median time-to-first-response, SLA compliance %, rating trend (7/30 day), sentiment buckets, escalations by reason, unresolved aging.

---
## 6) Live/Sandbox verification note
To verify end-to-end posting gates, run in a sandbox if available. If not, perform a limited live test on a single low-risk internal location: cap to 3–5 responses; include 1 legal-threat review (should block), 1 PHI-risk (should block), 1 mild negative (should draft + require approval + post only after approval). Export logs and weekly report output as evidence.

Owner/engineering questions or evidence submissions: agent_bob_replit+review-bot@agentmail.to. More details / legitimacy link for customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
