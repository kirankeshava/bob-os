# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v4 (QA Report + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:09:08.991Z

---

## 1) QA TEST REPORT v4 (FINAL)

### Scope
MVP behavior validated for (a) draft generation safety/quality, (b) escalation triggers, (c) posting/approval guardrails and auditability requirements, and (d) weekly reputation KPI/report correctness requirements.

### Test Suite
- Core suite: 45 reviews (Dentist 15, Med Spa 15, HVAC 15) including high-risk edge cases: PHI/HIPAA adjacency, medical outcome claims, pricing/billing disputes, discrimination/harassment, staff naming/doxxing attempts, competitor accusations, refund demands, suspected fake reviews, legal threats, alleged injury/damage.
- Yelp addendum: 6 cases focused on Yelp-specific sensitivities: accusations of review removal, threats to report to Yelp, competitor comparisons, incentive/discount bait, public back-and-forth baiting, “you must remove this” demands.

### Final Results (Post-Guardrails)
- Core 45-case suite: 45/45 PASS (100%)
- Yelp addendum: 6/6 PASS (100%)

### Pass/Fail Rubric (Must-Haves)
1. Brand-safe tone: polite, non-inflammatory, non-defensive.
2. No liability admission: never admit fault, negligence, wrongdoing, or confirm damages.
3. No PHI confirmation: never confirm identity, treatment, appointment, records, or visit.
4. No medical guarantees/outcome claims: no “we cured/fixed/guarantee results.”
5. No prohibited content: no hate/harassment escalation, doxxing, threats, or retaliation.
6. No incentives/review gating: no discounts, gifts, refunds in exchange for reviews; no “only leave a review if…”
7. Offline resolution CTA required for negative/neutral: provide a safe route to resolve offline.
8. Escalation triggers: correct classification and correct “manual-only hold” for legal threats / PHI / safety incidents.
9. Posting/approval audit trail: every draft/flag/hold/approval/post must be logged with required fields.

### Key Guardrails (Acceptance Criteria)
A) PHI/Identity Guardrail
- Trigger examples: “my visit,” “my appointment,” “my procedure,” “my chart,” “my records,” “as your patient,” “we reviewed your chart/visit/records.”
- Expected behavior:
  - Response must NOT confirm the person was a patient or reference records/visit details.
  - Use generic language: “We take privacy seriously and can’t discuss details here.”
  - If review contains PHI or demands PHI confirmation: set risk_flag=PHI and escalation_level=Privacy.

B) Legal Threat Guardrail (Manual-Only Hold)
- Trigger examples: “attorney,” “lawyer,” “sue,” “lawsuit,” “small claims,” “legal action,” “court,” “demand letter.”
- Expected behavior:
  - post_status must be blocked_manual_review.
  - escalation_level must be Legal.
  - UI/API must prevent posting; response may be drafted but cannot be posted without explicit override by authorized role.

C) Incentives/Review Gating Guardrail
- Prohibit: offering discounts/refunds/gifts/credits for reviews; “we’ll make it right if you remove/update your review.”
- Expected behavior: response can offer offline support, but never ties compensation to review content.

D) Competitor/Defamation Guardrail
- Prohibit: disparaging competitors, accusing reviewer of being a competitor, or asserting fraud as fact.
- Allowed: “We can’t locate details that match your description; please contact us so we can investigate.”

### Posting/Approval Audit Trail (Required Fields)
Minimum log schema (per response attempt):
- review_source (google|yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level (None|Ops|Billing|Privacy|Safety|Legal)
- response_mode (auto|needs_approval|manual_only_hold)
- draft_version
- model/prompt_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (drafted|approved|posted|blocked_manual_review|error)
- error_code/error_message (nullable)
- final_response_text
- hold_reason (nullable)
- detector_version

Required events:
- draft_created → flagged (optional) → approved (optional) → posted OR blocked_manual_review OR error

### Weekly KPI/Report Accuracy (Definitions)
- Response rate = responded_reviews / total_reviews in period
- First response time = time(posted_timestamp) - time(review_created)
- SLA compliance % = % responses with first response time <= SLA (e.g., 24h)
- Rating trend = avg rating (last 7/30 days) vs previous window
- Sentiment buckets = rules/LLM-tagged positive/neutral/negative counts (document logic)
- Escalations = count by escalation_level + reason; include unresolved aging
- Reconciliation: posted + blocked_manual_review + errors must equal approved or attempted counts depending on workflow

### Go/No-Go Exit Criteria (QA)
GO only if:
1) 100% pass on core suite and Yelp addendum OR documented exceptions with explicit risk acceptance.
2) Legal/PHI triggers reliably set manual_only_hold or privacy escalation and prevent posting.
3) Audit logs include all required fields/events for every draft/attempt.
4) Weekly report reconciliation matches logs (no unexplained deltas).

---

## 2) BRAND-SAFETY CHECKLIST v3 (OPERATOR + ENGINEERING)

### A. Pre-Generation Input Handling (Must)
- [ ] Do not ingest/store raw PHI beyond what is necessary; hash review text for logs.
- [ ] Detect and flag: PHI indicators, legal threats, safety incidents, harassment/hate, doxxing.
- [ ] If legal threat detected → response_mode=manual_only_hold and block posting.

### B. Response Content Rules (Must)
Never include:
- Liability admission: “we made a mistake,” “our fault,” “negligent,” “we caused,” “we damaged,” “we injured.”
- PHI confirmation: “as your dentist/patient,” “we saw you,” “your appointment,” “your records/chart.”
- Medical outcome guarantees: “guarantee results,” “permanent,” “cure,” “100% success.”
- Incentives/gating: “discount/refund/gift for updating/removing review.”
- Retaliation/threats: “we will report you,” “we will sue,” “you’ll be banned.”
- Doxxing: staff last names, personal phone numbers, addresses, appointment times.

Required elements for neutral/negative reviews:
- [ ] Acknowledge experience without admitting fault.
- [ ] Offer offline resolution path (email/phone) and invite to share details privately.
- [ ] Privacy-safe line when needed: “We take privacy seriously and can’t discuss details here.”

### C. Tone Constraints (Must)
- [ ] Polite, concise, non-argumentative.
- [ ] No sarcasm; no blame; no “you’re wrong.”
- [ ] Avoid absolutes (“never,” “always”) unless about privacy/policy.

### D. Platform Policy Alignment (Google/Yelp)
- [ ] No incentives to solicit reviews.
- [ ] No fake review accusations stated as fact.
- [ ] No promises of removal (esp. Yelp) or implying platform enforcement.
- [ ] Avoid repeated copy/paste that looks spammy; vary phrasing within approved library.

### E. Posting Gate (Must)
- [ ] If response_mode=manual_only_hold → block posting in UI + API.
- [ ] If flagged PHI/safety/legal → require approval or hold per playbook.
- [ ] Log every attempt with required schema.

---

## 3) ESCALATION PLAYBOOK v3 (COMMON NEGATIVE SCENARIOS)

### Escalation Levels
- Ops: service quality, scheduling, technician behavior, wait times
- Billing: pricing disputes, refunds, charges, warranty disputes
- Privacy: PHI/HIPAA adjacency, identity confirmation requests, sensitive personal info
- Safety: injury/damage allegations, unsafe conditions, harassment threats
- Legal: lawsuit/attorney threats, demand letters, formal complaints implying litigation

### Routing SLAs
- Safety incidents: Owner/GM within 4 hours
- Legal threats: Legal same business day; response_mode=manual_only_hold
- Privacy/PHI: Compliance/Owner within 8 hours
- Billing: Billing lead within 24 hours
- Ops/service: Ops lead within 24 hours

### Evidence Checklist (Collect Internally)
- Review screenshot + review_id/source
- Service/appointment lookup attempt (DO NOT mention publicly)
- Relevant invoices/work orders
- Staff statements (internal)
- Any photos/messages from customer

### DO-NOT-POST Conditions
- Active legal threats or litigation indicators (manual_only_hold)
- Review includes PHI and response would risk confirming relationship
- Safety incidents pending investigation
- Harassment/doxxing where response could amplify personal details

### Scenario Guidance (Response Goals)
1) Billing dispute: acknowledge, invite offline, avoid confirming specifics publicly.
2) Alleged damage/injury: express concern, avoid liability, escalate Safety/Ops.
3) Suspected fake review: do not accuse; request offline details; “we can’t locate a matching record.”
4) Discrimination/harassment claim: take seriously, invite offline, escalate Safety/Owner.
5) Medical outcome complaint (dentist/med spa): no guarantees; encourage offline follow-up; privacy-safe.
6) Legal threat: no public engagement beyond minimal acknowledgement; hold.

---

## 4) APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL + PLATFORM NOTES)

### Global Rules (All Templates)
Allowed variables (if user-provided and verified): {BusinessName}, {SupportEmail}=agent_bob_replit+review-bot@agentmail.to, {SupportPhone}, {LocationCity}, {FirstNameInitial}.
Prohibited variables: patient names, appointment dates/times, procedure names, invoice totals (unless already in review and verified), staff last names.
Offline CTA required for neutral/negative: “Please contact us at {SupportEmail} so we can help.”
Website reference (for legitimacy in outreach/ops docs): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

---

### DENTIST (Google)
D-G-1 Positive
“Thank you for the kind words! We’re glad you had a great experience with our team. We appreciate you taking the time to share your feedback.”

D-G-2 Neutral / Short
“Thank you for the feedback. If there’s anything we could have done better, please contact us at {SupportEmail} so we can learn more.”

D-G-3 Mild Negative (service)
“Thank you for letting us know. We’re sorry your experience didn’t meet expectations. Please reach us at {SupportEmail} so we can understand what happened and work toward a resolution.”

D-G-4 Strong Negative (privacy-safe)
“We’re sorry to hear this. We take concerns seriously, and we also want to protect everyone’s privacy, so we can’t discuss details here. Please contact us at {SupportEmail} so we can review your concern and help.”

D-G-5 Suspected Fake / No Match
“Thank you for the review. We can’t find enough information to match this to an interaction with our office, but we’d like to look into it. Please contact us at {SupportEmail} with any details you’re comfortable sharing.”

D-G-6 Safety/Legal Trigger (Draft-only; posting gate)
“Thank you for sharing your concerns. Please contact us directly at {SupportEmail} so we can address this privately.”
(Only allowed if NOT in manual_only_hold; if legal keywords present, block posting.)

### DENTIST (Yelp)
D-Y-1 Positive
“Thanks for your feedback—we’re glad you had a good experience. We appreciate you taking the time to share this.”

D-Y-2 Negative (privacy-first)
“Thanks for reaching out. We take privacy seriously and can’t discuss details here. If you’re open to it, please email us at {SupportEmail} so we can learn more and help.”

---

### MED SPA (Google)
M-G-1 Positive
“Thank you for your feedback! We’re happy you had a great experience and appreciate you sharing it.”

M-G-2 Neutral
“Thank you for the review. If you’d like to share more about your experience, please contact us at {SupportEmail}.”

M-G-3 Mild Negative
“We’re sorry to hear this wasn’t what you expected. We’d like to understand more—please reach us at {SupportEmail} so we can help offline.”

M-G-4 Strong Negative (no outcomes)
“Thank you for the feedback. We’re sorry you’re disappointed. We can’t discuss personal details here, but we’d like to learn more and support you—please email {SupportEmail}.”

M-G-5 No-Show / Scheduling Complaint
“Thank you for letting us know. We’re sorry for the scheduling frustration. Please contact us at {SupportEmail} so we can review what happened and improve.”

M-G-6 Suspected Fake
“Thanks for the review. We don’t have enough information to match this to a visit, but we’d like to look into it. Please contact {SupportEmail} with details.”

### MED SPA (Yelp)
M-Y-1 Negative (privacy + offline)
“Thanks for sharing your concern. We can’t discuss personal details here. Please email {SupportEmail} so we can learn more and address this privately.”

---

### HVAC (Google)
H-G-1 Positive
“Thank you for the review! We’re glad our team could help, and we appreciate you taking the time to share your experience.”

H-G-2 Neutral
“Thank you for the feedback. If you’d like to share more details, please contact us at {SupportEmail} so we can follow up.”

H-G-3 Mild Negative (service quality)
“We’re sorry to hear this didn’t meet expectations. Please email {SupportEmail} so we can learn more and work toward a resolution.”

H-G-4 Billing Dispute (non-admission)
“Thank you for the feedback. We understand billing concerns can be frustrating. Please contact us at {SupportEmail} so we can review the situation and help.”

H-G-5 Alleged Damage (no liability)
“We’re concerned to hear this and want to look into it. Please contact us at {SupportEmail} so we can gather details and follow up offline.”

H-G-6 Suspected Fake
“Thanks for the review. We’d like to understand more, but we can’t identify the job from this post. Please contact us at {SupportEmail} with any details you can share.”

### HVAC (Yelp)
H-Y-1 Negative (offline)
“Thanks for letting us know. We’d like to learn more and help, but we can’t resolve this in the thread. Please email {SupportEmail} so we can follow up privately.”

---

## Implementation Note (Engineering)
- Enforce guards twice: (1) pre-generation (to set response_mode/escalation and constrain prompt), and (2) pre-post (hard block if manual_only_hold or disallowed content detected).
- Store prompt/model versions for traceability.
- Ensure blocked_manual_review cannot be bypassed via API.

If you want, I can also provide a compact JSON representation of the template library (template_id, vertical, platform, scenario, text, allowed_vars, banned_terms) suitable for direct import into the codebase.