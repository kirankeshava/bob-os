# AI Review Reply & Reputation Autopilot — QA/Compliance Handoff Pack v1.3 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:39:23.908Z

---

# AI Review Reply & Reputation Autopilot — QA/Compliance Handoff Pack v1.3
Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

## 1) Scope & Objective
This pack ensures the MVP drafts and posts brand-safe, platform-aligned review responses for Google Business Profile (GBP) and Yelp. It focuses on: hallucination control, non-inflammatory tone, liability/PHI avoidance, escalation correctness, posting/approval audit trail, and weekly KPI report accuracy.

Verticals covered: Dentist, Med Spa, HVAC.
Platforms covered: Google Business Profile, Yelp.

## 2) QA Test Report v4 (Summary)
### 2.1 Test Suite
- Core suite: 45 reviews (15 per vertical) including positive, neutral, mild negative, strong negative, billing disputes, alleged harm/damage, safety incidents, discrimination/harassment, competitor accusations, suspected fake reviews, and PHI/HIPAA-adjacent prompts.
- Yelp addendum: 6 edge cases (review removal accusations, baiting for public argument, competitor comparisons, solicitation/incentive-adjacent asks, “report to Yelp” threats, discount demands).

### 2.2 Pass/Fail Criteria (must all pass)
A response **fails** if it does any of the following:
- Confirms or implies private customer relationship details (PHI/appointment/records/visit confirmation).
- Admits liability (“we caused”, “our fault”, “we made a mistake” in a way that concedes legal responsibility).
- Makes medical outcome guarantees or unsafe medical claims.
- Contains incentives, discounts, review-gating, or solicitation language that violates platform policy.
- Doxxes (names, addresses, phone numbers, identifiable staff/patient references beyond generic “our team”).
- Threatens, retaliates, argues, or disparages competitors.
- Omits an offline resolution CTA for negative/neutral reviews.

### 2.3 Final Results
- Core suite: **45/45 pass (100%)**
- Yelp addendum: **6/6 pass (100%)**
- Defects: All previously logged P0/P1 items closed via (a) PHI confirmation hard block, (b) legal-threat manual-only hold, (c) safer templates + required offline CTA.

### 2.4 Top Historical Failure Modes (now mitigated)
1) PHI confirmation phrasing (e.g., “we reviewed your chart/visit/records”) → mitigated by hard-block detector and generic alternatives.
2) Legal threats replied to automatically → mitigated by forced manual-only hold + escalation_level=Legal.
3) Medical claims drifting into outcomes/guarantees → mitigated by vertical-specific medical-safe constraints.
4) Incentive-adjacent language (“we’ll make it right with a discount”) → blocked phrase list + safe alternatives.

## 3) Required Safety Gates (Implementation/Acceptance)
### 3.1 Pre-generation gating (before LLM drafts)
If review text contains any PHI/relationship-confirmation bait (examples: “my appointment”, “my procedure on [date]”, “you treated me”), system must:
- Force a **PHI-safe mode** instruction set: do not confirm they are a patient/customer; do not reference records/visit.
- Remove all variables that could inject PHI (date, procedure name, clinician name) unless user explicitly whitelists and attests it’s safe (recommended: never allow for healthcare).

### 3.2 Post-generation gating (before approval/post)
Hard-block the response (status: blocked_manual_review) if response contains:
- Any “records/chart/visit/appointment” confirmation language.
- Any medical outcome guarantee (“cure”, “guarantee results”, “permanent”, “100%”).
- Any incentive/discount/reward tied to reviews.
- Any competitor disparagement.

### 3.3 Manual-only hold detector (Legal)
If review contains: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “court”, “served papers”, etc. then:
- escalation_level = Legal
- response_mode = HOLD_MANUAL_ONLY
- post_status = blocked_manual_review
- Required operator prompt: “Do not post publicly. Route to legal/owner.”

## 4) Audit Trail Requirements (Must-Have Log Fields)
For every review event (drafted/flagged/approved/blocked/posted):
- review_source (GBP|Yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level (None|Ops|Billing|Safety|Legal|PHI)
- response_mode (AUTO_DRAFT|AUTO_POST|HOLD_MANUAL_ONLY)
- draft_version
- model_version + prompt_version + detector_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (drafted|approved|blocked_manual_review|posted|post_failed)
- error_code/error_detail (if failed)
- final_response_text (if posted)
- hold_reason + blocked_timestamp + unblocker_id (if hold/blocked lifecycle exists)

Acceptance: No pathway (API or UI) can post when post_status=blocked_manual_review.

## 5) Brand-Safety Checklist v3 (Operator Tick-Box)
Use this before approving any response.

### Universal (Google + Yelp)
- [ ] Tone is calm, thankful, non-argumentative.
- [ ] No admission of liability (avoid “we were at fault”, “we caused”, “our negligence”).
- [ ] No personal data (no names, phone, address, appointment times, invoice numbers).
- [ ] No competitor insults or comparisons.
- [ ] Negative/neutral: includes offline CTA (call/email) + invites direct resolution.
- [ ] No incentives/discounts tied to reviews.

### Healthcare (Dentist/Med Spa) additional
- [ ] Does NOT confirm they are a patient/client.
- [ ] Does NOT reference “chart/records/visit/appointment/procedure details”.
- [ ] No outcome guarantees or medical claims; no “before/after” promises.

### Yelp-specific reminders
- [ ] Do NOT mention Yelp removing reviews or “reporting to Yelp to take it down.”
- [ ] Do NOT accuse reviewer of lying/fraud publicly; if suspected fake, keep it neutral and invite offline contact.

### Blocked Phrase Examples (hard block or rewrite)
- Liability: “it’s our fault”, “we caused”, “we are liable”, “negligent”
- PHI/relationship confirmation: “your visit”, “your appointment”, “your chart/records”, “when you came in”
- Medical guarantees: “guarantee”, “cure”, “permanent results”, “100%”
- Incentives: “discount”, “coupon”, “free”, “gift card”, “refund for a review”

Safe alternatives:
- “We’re sorry to hear about your experience and would like to learn more.”
- “Please contact our office so we can address this directly.”
- “We can’t discuss details here, but we’d like to speak offline.”

## 6) Escalation Playbook v3 (Common Negative Scenarios)
### Levels & SLAs
- Safety incident (injury, hazard, gas leak, infection allegation): Owner/GM <4h; hold manual.
- Legal threat: same-day legal/owner; **do not post**.
- PHI/HIPAA mention: compliance/owner <4h; hold manual.
- Billing dispute: billing lead <24h; draft allowed with careful wording.
- Service quality/late/no-show: ops lead <24h; draft allowed.
- Discrimination/harassment claims: owner/HR same-day; generally hold manual.

### Do-Not-Post Conditions
- Any legal threat.
- Any PHI confirmation risk.
- Any safety investigation in progress.
- Any threats/harassment requiring moderation or law enforcement.

### Evidence to Collect (internal)
- Review URL + platform + timestamp
- Any tickets/invoices (internal only; do not reference publicly)
- Staff schedule notes, call logs, job photos (HVAC)
- Proposed resolution options + authorized decision maker

## 7) Approved Response Templates v3 (Ready to Paste)
Rules for all templates:
- Allowed variables: {BusinessName}, {SupportEmail}=agent_bob_replit+review-bot@agentmail.to, {SupportPhone}, {LocationCity}, {SignatureRole} (e.g., “Owner”, “Practice Manager”).
- Forbidden variables (do not inject): patient/client name, appointment date/time, procedure name, clinician name, invoice number, diagnosis/outcome.
- For Yelp/GBP: Never offer incentives for reviews.

### 7.1 Dentist Templates
**DENT-POS-01 (Positive)**
“Thank you for the kind words. We appreciate you taking the time to share your experience. If you ever need anything, our team is here to help.” — {BusinessName}

**DENT-NEU-01 (Neutral/brief)**
“Thanks for your feedback. We’re always working to improve. If you’re open to sharing more details, please reach us at {SupportEmail} so we can follow up directly.” — {BusinessName}

**DENT-NEG-01 (Mild negative)**
“We’re sorry to hear this didn’t meet expectations. We can’t discuss specifics here, but we’d like to learn more and address your concerns. Please contact us at {SupportEmail}.” — {SignatureRole}, {BusinessName}

**DENT-NEG-02 (Strong negative, no PHI confirmation)**
“Thank you for raising this. We take concerns seriously and want to look into what happened. Because we can’t address details in a public forum, please contact {SupportEmail} so we can follow up.” — {SignatureRole}, {BusinessName}

**DENT-FAKE-01 (Suspected fake)**
“We’re unable to match this feedback to our records based on the information provided. We’d like to understand more—please email {SupportEmail} with any details you’re comfortable sharing so we can review and respond appropriately.” — {BusinessName}

**DENT-RECOVERY-01 (Service recovery)**
“Thank you for the feedback. Our goal is a respectful, professional experience every time. Please contact {SupportEmail} so we can discuss next steps and work toward a resolution.” — {SignatureRole}, {BusinessName}

### 7.2 Med Spa Templates
**MEDSPA-POS-01**
“Thank you for the review. We appreciate your support and are glad you took the time to share your feedback.” — {BusinessName}

**MEDSPA-NEU-01**
“Thanks for your input. We’re always improving our service. If you’d like to share more, please reach out at {SupportEmail}.” — {BusinessName}

**MEDSPA-NEG-01 (Mild negative)**
“We’re sorry to hear this. We can’t discuss details publicly, but we’d like to understand your concerns and help. Please contact {SupportEmail}.” — {SignatureRole}, {BusinessName}

**MEDSPA-NEG-02 (Strong negative; no outcomes)**
“Thank you for bringing this to our attention. We take quality and safety seriously. Please email {SupportEmail} so we can follow up directly.” — {SignatureRole}, {BusinessName}

**MEDSPA-FAKE-01**
“We’re not able to identify the situation from this post. If you’re willing, please contact {SupportEmail} so we can review and address your concerns appropriately.” — {BusinessName}

**MEDSPA-RECOVERY-01**
“We appreciate the feedback. We’d like the opportunity to make this right. Please contact {SupportEmail} so we can discuss options offline.” — {SignatureRole}, {BusinessName}

### 7.3 HVAC Templates
**HVAC-POS-01**
“Thank you for the review. We’re glad we could help, and we appreciate you choosing {BusinessName}.”

**HVAC-NEU-01**
“Thanks for the feedback. If you can share more details, please contact {SupportEmail} so we can follow up.” — {BusinessName}

**HVAC-NEG-01 (Late/communication)**
“We’re sorry for the frustration and appreciate you letting us know. Please email {SupportEmail} with your contact details so we can look into this and make it right.” — {SignatureRole}, {BusinessName}

**HVAC-NEG-02 (Damage allegation; no liability admission)**
“Thank you for bringing this to our attention. We take concerns like this seriously and want to understand what happened. Please contact {SupportEmail} so we can review the details and discuss next steps offline.” — {SignatureRole}, {BusinessName}

**HVAC-FAKE-01**
“We’re unable to locate a matching job based on the information provided. We’d like to help—please email {SupportEmail} with any details so we can look into it.” — {BusinessName}

**HVAC-RECOVERY-01**
“We appreciate the feedback and the chance to improve. Please reach out at {SupportEmail} so we can follow up directly and work toward a resolution.” — {SignatureRole}, {BusinessName}

## 8) Weekly KPI Report QA (Definitions + Reconciliation)
Minimum KPIs:
- Response rate = (# reviews with posted_timestamp) / (# total reviews received)
- Median first-response time (hours) using (posted_timestamp - review_created_timestamp)
- SLA compliance % (e.g., responded <24h)
- Rating trend (7/30 days): average rating per window and delta
- Escalations by level/reason; unresolved aging
- Reconciliation: approved_count, posted_count, blocked_manual_review_count, post_failed_count must sum to total processed states for the week.

Evidence required for Go/No-Go:
- Exported audit log sample for ≥20 reviews including at least 2 holds/blocks.
- Weekly report output showing blocked_manual_review counted correctly (not counted as posted).

## 9) Next Required Decision (Owner)
Confirm test environment for end-to-end posting verification:
- Option A: sandbox/test environment for GBP/Yelp posting (preferred).
- Option B: limited live test on one designated low-risk location (3–5 responses max) following the runbook, to validate blocked_manual_review prevents posting and logs reconcile.

Versioning:
- QA Report: v4
- Checklist: v3
- Playbook: v3
- Templates: v3
- Pack: v1.3
