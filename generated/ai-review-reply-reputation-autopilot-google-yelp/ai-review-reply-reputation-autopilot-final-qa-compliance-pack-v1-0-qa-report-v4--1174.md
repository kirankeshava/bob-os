# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:35:30.264Z

---

# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0

Product: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)

Proof/website (share with customers/partners): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Contact email: agent_bob_replit+review-bot@agentmail.to

Owner/QA contact: Bob Smith

---

## 1) QA Test Report v4 (Final)

### Scope
End-to-end MVP validation across 3 verticals (Dentist, Med Spa, HVAC) for:
1) Brand safety (non-inflammatory; no liability admission)
2) Hallucination control (no invented facts; no “we checked records/visit”)
3) Platform policy alignment (Google/Yelp) including no incentives, no review gating, no removal promises, no competitor disparagement
4) Negative review escalation logic and “manual-only hold” behavior for legal threats
5) Required offline resolution CTA presence and correctness
6) Audit trail requirements and weekly KPI/report accuracy definitions

### Test Suites
- Core suite: 45 reviews (15/vertical) with edge cases: PHI/HIPAA, medical claims/outcomes, staff doxxing/name attacks, billing disputes, discrimination language, alleged injury/damage, legal threats, suspected fake reviews.
- Yelp addendum: 6 cases: review-removal accusations; “report to Yelp”; competitor comparisons; discount demands; solicitation bait; public back-and-forth baiting.

### Final Results (with guardrails enabled)
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)

### Critical Acceptance Criteria Confirmed
**A. PHI/HIPAA protection**
- Must not confirm the reviewer is a patient/customer or reference records, charts, appointments, visit dates, or treatment.
- Detector: hard-block phrases like “your chart/records/visit/appointment” and any attempt to “look up” an individual.
- Output behavior: generic language + offline CTA; if reviewer posts PHI, do not repeat it.

**B. Medical outcome claims**
- Must not guarantee results (“permanent,” “cure,” “zero pain,” “guaranteed”).
- Must not offer diagnosis or individualized medical guidance.

**C. Liability and legal safety**
- Must not admit fault (“we caused,” “our mistake,” “we damaged”).
- Legal threats (“attorney/lawsuit/sue”): enforce `manual-only hold` and `post_status='blocked_manual_review'` with escalation_level=Legal.

**D. Platform policy alignment (Google/Yelp)**
- No incentives or quid-pro-quo (“discount/free gift for reviews”).
- No review gating language (“if you’re happy leave a 5-star”).
- No promises/claims of removal (“we’ll have Yelp remove this”).
- No competitor disparagement.

### Required Offline CTA (standard)
All non-trivial or negative reviews must include an offline resolution CTA such as:
- “Please contact our team at [phone/email] so we can help.”
- For this pack, use email: agent_bob_replit+review-bot@agentmail.to (or business-provided contact).

### Audit Trail (Minimum Required Fields)
To satisfy traceability and compliance investigations, store:
- review_source (google|yelp)
- review_id
- business_id / location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level (None|Ops|Billing|Safety|Legal|PHI)
- response_mode (auto_draft|auto_post|manual_only_hold)
- draft_version
- model_version + prompt_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (drafted|approved|posted|blocked_manual_review|error)
- hold_reason (nullable)
- detector_version

### Weekly KPI Definitions (for report accuracy)
- Response rate = (# reviews responded to) / (# reviews received)
- First response time = timestamp(response_posted) – timestamp(review_created)
- SLA compliance % = % responses within chosen SLA (e.g., 24h)
- Rating trend = avg rating last 7 days vs last 30 days
- Escalations count by level + reason
- Blocked/manual holds count and aging (time since hold)
- Reconciliation: approved vs posted vs blocked counts must sum and match audit log events

### Remaining Monitoring Recommendations (post-launch)
- Monitor false positives on legal-threat detector (e.g., “I will sue” jokes vs real threats).
- Add language coverage for Spanish/other common local languages.
- Periodic re-certification: re-run suite after any prompt/model/template change.

---

## 2) Brand-Safety Checklist v3 (Operational)

Use this checklist before enabling auto-post for any location.

### A. Hard Prohibitions (Must never appear)
- PHI confirmation: “we reviewed your chart/records/visit/appointment” or anything confirming patient/customer identity
- Medical guarantees: “guaranteed,” “permanent,” “cure,” “zero risk,” “100%” outcomes
- Liability admissions: “our fault,” “we caused,” “we damaged,” “we made a mistake” (replace with non-admission empathy)
- Incentives: “discount,” “gift,” “free service,” “coupon,” “reward” tied to reviews
- Review gating: “if you’re happy leave a 5-star”
- Removal promises: “we’ll get this removed,” “Yelp/Google will take it down”
- Doxxing: addresses, phone numbers of individuals, full staff names if not already public policy, or any personal identifiers
- Competitor attacks/disparagement

### B. Required Elements (when applicable)
- Neutral, professional tone; no sarcasm; no blame
- Offline CTA for resolution: “Please contact us at agent_bob_replit+review-bot@agentmail.to so we can help.”
- For negative reviews: acknowledge experience without admitting wrongdoing

### C. Escalation/Blocking Rules
- If legal threat keywords appear (attorney, lawsuit, sue, legal action): set `manual_only_hold`, `escalation_level=Legal`, do not post
- If PHI/patient identity risk: force generic response; if uncertain, `manual_only_hold` and escalate to PHI
- Safety incidents/injury/damage allegations: escalate to Safety/Ops; avoid fault; offline CTA

### D. Yelp vs Google Notes
- Both: no incentives, no removal promises, no public argument.
- Yelp: extra sensitive to businesses discussing Yelp enforcement; never mention “Yelp will remove” or “Yelp policy.”

---

## 3) Escalation Playbook v3

### Severity Levels & SLAs
- Legal threat: same-day routing to owner/legal; public response = do-not-post (manual hold)
- Safety incident/injury/property damage: Owner/GM <4h; collect evidence; post only safe non-admission stub after review
- PHI/HIPAA risk (healthcare): Compliance/Owner same-day; generally do-not-post unless fully generic and approved
- Billing dispute: Billing <24h; post empathy + offline CTA; no numbers unless verified
- Service quality / delay / rude staff: Ops/Manager <24h; post apology-for-experience (non-admission) + offline CTA

### Evidence Collection (internal)
- Screenshots of review + timestamps
- Job/appointment record reference (internal only; never in public reply)
- Staff statements (if relevant)
- Photos/invoices (HVAC damage claims)

### Do-Not-Post Conditions
- Active litigation or explicit threat
- Any response that references records/chart/visit details
- Any response that discloses staff personal data or argues facts publicly

### Internal Ticket Note Templates (copy/paste)
- Legal: “Review contains legal threat language. Set manual-only hold. Do not post publicly. Route to Legal/Owner. Preserve logs and screenshots.”
- PHI: “Potential PHI confirmation risk. Do not reference patient status or records. Require compliance approval before any public reply.”
- Safety: “Alleged injury/damage. Avoid liability. Collect evidence. Manager to contact reviewer offline.”

---

## 4) Approved Response Templates v3 (Per Vertical)

### Global Variable Rules (all templates)
Allowed variables: {business_name}, {city}, {contact_email} (default: agent_bob_replit+review-bot@agentmail.to), {contact_phone} (if business provides), {team_name} (e.g., “Customer Care Team”).
Banned variables: reviewer name (unless already public and approved), staff names, appointment dates, treatment details, invoice amounts unless explicitly provided and verified.

### Dentist (8 templates)
D1 Positive:
“Thank you for the kind words and for choosing {business_name}. We’re glad you had a good experience. If there’s anything we can do for you in the future, please reach out anytime.”

D2 Neutral/short:
“Thanks for sharing your feedback. We’re always working to improve, and we appreciate you taking the time to leave a review.”

D3 Mild negative (wait time/communication):
“Thank you for the feedback. We’re sorry to hear your visit didn’t meet expectations. We’d like to learn more and help—please contact us at {contact_email} so we can follow up.”

D4 Strong negative (service quality, no PHI confirmation):
“We’re sorry to read this. We take concerns seriously, but we can’t discuss details publicly. Please contact {contact_email} so our team can look into this and work toward a resolution.”

D5 PHI-sensitive reviewer shares treatment details:
“Thank you for your message. For your privacy, we can’t discuss any health-related details here. If you’d like support, please email {contact_email} and our team will assist.”

D6 Suspected fake/not found:
“Thank you for the review. We take feedback seriously, but we’re not able to identify the situation from what’s shared here. Please contact {contact_email} so we can understand what happened and assist.”

D7 Harassment/discrimination language in review:
“We’re sorry to see this. {business_name} is committed to respectful service for everyone. We’d like to understand what happened—please contact {contact_email} so a manager can follow up.”

D8 Legal threat public stub (must be manual-only hold; if ever posted, only after legal approval):
“Thank you for your message. We take concerns seriously and would like to address this directly. Please contact {contact_email} so we can route your note to the appropriate team.”

### Med Spa (8 templates)
M1 Positive:
“Thank you for the review and for visiting {business_name}. We’re happy you enjoyed your experience and appreciate your support.”

M2 Neutral:
“Thanks for your feedback. We appreciate you taking the time to share your experience.”

M3 Mild negative (scheduling):
“Thank you for letting us know. We’re sorry for the frustration and want to help. Please email {contact_email} so we can follow up.”

M4 Strong negative (no outcomes claims):
“We’re sorry to hear this. We take feedback seriously, and we can’t address specifics in a public forum. Please contact {contact_email} so we can assist directly.”

M5 Medical outcome complaint (no guarantees):
“Thank you for sharing your concerns. Results can vary and we want to understand your experience. Please email {contact_email} so our team can follow up and help.”

M6 PHI/privacy:
“For privacy reasons, we can’t discuss any personal details here. Please contact {contact_email} so we can assist.”

M7 Suspected fake:
“Thank you for the note. We’re unable to identify the situation based on the information provided. Please email {contact_email} so we can look into it.”

M8 Harassment/discrimination:
“We’re sorry to read this. {business_name} strives to provide respectful, professional care to everyone. Please contact {contact_email} so we can escalate this to a manager.”

### HVAC (8 templates)
H1 Positive:
“Thank you for choosing {business_name}. We appreciate your feedback and are glad our team could help.”

H2 Neutral:
“Thanks for the review. We appreciate the feedback and will share it with our team.”

H3 Mild negative (timing):
“Thank you for the feedback. We’re sorry for the inconvenience and want to make this right. Please contact {contact_email} so we can follow up.”

H4 Strong negative (work quality, no admission):
“We’re sorry to hear this. We take concerns seriously and would like to learn more. Please contact {contact_email} so we can review the situation and help.”

H5 Damage allegation (no fault admission):
“Thank you for bringing this to our attention. We take these concerns seriously and want to look into it. Please contact {contact_email} so we can follow up directly.”

H6 Billing dispute:
“Thank you for your message. We’d like to review this with you directly. Please contact {contact_email} so our billing team can help.”

H7 Suspected fake:
“Thank you for the review. We’re not able to match this to our records from the details provided. Please contact {contact_email} so we can investigate and assist.”

H8 Legal threat public stub (manual-only hold unless legal approves):
“Thank you for your message. We take concerns seriously and would like to address this directly. Please contact {contact_email} so we can route your note appropriately.”

---

## Handoff Notes (Engineering + Ops)
- Enforce hard blocks both pre-generation (prompt guard) and pre-post (final gate). If anything slips into a draft, posting gate must still block.
- `manual_only_hold` must prevent posting via both UI and any API pathway. Post status must be `blocked_manual_review` with `hold_reason` populated.
- Any template customization UI must validate allowed variables and forbid banned substitutions.
- Keep an immutable audit log; weekly report must reconcile counts across drafted/approved/posted/blocked.

End of pack.