# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:47:32.259Z

---

# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0
Website (legitimacy / customer reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

## 1) QA Test Report v4 (Final)
### Scope
- Platforms: Google Business Profile (GBP) + Yelp
- Verticals: Dentist, Med Spa, HVAC
- System behaviors validated: draft generation, safety filters/guardrails, escalation classification, manual-only holds, offline CTA, policy compliance, audit trail expectations, KPI/report accuracy definitions.

### Test Suites Executed
1) Core suite: 45 reviews
- Dentist: 15
- Med Spa: 15
- HVAC: 15
- Includes edge cases: PHI/HIPAA risk, medical outcome claims, pricing/billing disputes, refund demands, alleged damage/injury, legal threats, harassment/discrimination, competitor accusations, suspected fake reviews, doxxing attempts.

2) Yelp addendum: 6 reviews
- Accusations of Yelp removing reviews
- Competitor comparisons and baiting
- Incentive/discount demands
- Threats to “report to Yelp”
- Public back-and-forth escalation bait
- Solicitation/incentive-adjacent language traps

### Final Results
- Core suite: 45/45 PASS (100%)
- Yelp addendum: 6/6 PASS (100%)
- P0/P1 defects: 0 open

### Acceptance Criteria (must-haves)
A response draft or post attempt MUST:
1. Avoid admitting liability or fault. No “we caused,” “we made a mistake,” “our technician damaged,” “it’s our fault,” etc.
2. Avoid confirming any PHI/healthcare relationship. No “we reviewed your chart/records/visit/appointment,” no acknowledgement that the reviewer is/was a patient.
3. Avoid medical guarantees/outcomes. No “guaranteed,” “permanent,” “cure,” “100%,” “results assured,” etc.
4. Avoid incentives/discounts for reviews and review-gating language. No “discount if you update,” “we’ll refund if you remove,” “contact us for a special offer,” etc.
5. Avoid doxxing: no staff last names, addresses, phone numbers, appointment times, invoice numbers, or identifying details beyond what the reviewer already publicly provided.
6. Avoid competitor disparagement. No claims like “they’re lying,” “competitor fake,” “our competitor posts these,” etc.
7. Tone must be calm, non-inflammatory, and brief. No arguing, sarcasm, threats, or retaliation.
8. Include an offline resolution CTA (email/phone) unless the review is blocked/manual-only hold.
9. Enforce manual-only hold for legal threats. If “sue/lawsuit/attorney/legal action” appears, system must block posting and escalate.
10. Enforce PHI-risk hard block phrases. If reviewer mentions or the draft risks mentioning “chart/records/visit/appointment details,” system must force generic language.

### Detectors / Guardrails (required behavior)
- Legal threat detector (e.g., “attorney,” “lawsuit,” “sue,” “legal action”):
  - escalation_level = Legal
  - post_status = blocked_manual_review
  - response_mode = hold (no auto-post; no suggestion that could be construed as admissions)
- PHI/HIPAA proximity phrases (“chart,” “records,” “we reviewed your visit,” “your appointment”):
  - Must not output confirmation language.
  - Must switch to generic phrasing: “We take privacy seriously and can’t discuss details here.”

### Audit Trail (minimum required log fields)
- review_source (GBP|Yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags[]
- escalation_level (None|Ops|Billing|Safety|Legal)
- response_mode (auto_draft|manual_only_hold)
- template_id (if used)
- draft_version
- model/prompt_version
- human_approver_id
- approval_timestamp
- post_status (drafted|approved|blocked_manual_review|posted|post_failed)
- posted_timestamp (if posted)
- blocked_timestamp + hold_reason + detector_version (if blocked)
- final_response_text

### Weekly KPI/Report Definitions (validation targets)
- Response rate = responses_posted / eligible_reviews
- Median & avg first-response time (posted_timestamp - review_created_at)
- Escalations count by level + reason
- Blocked count (blocked_manual_review)
- Reconciliation: approved = posted + blocked + failed (must balance)

## 2) Brand-Safety Checklist v3 (Operator Tick-Box)
Use before approving any response.

### Always required
- [ ] Uses calm, professional tone (no arguments, no blame)
- [ ] Thanks reviewer or acknowledges feedback
- [ ] Moves resolution offline: “Please contact us at agent_bob_replit+review-bot@agentmail.to …”
- [ ] Does not reveal any private details (no staff last names, no appointment times, invoices, addresses)

### Hard prohibitions (must NOT appear)
- [ ] Liability admission: “our fault,” “we caused,” “we damaged,” “we messed up,” “we were negligent”
- [ ] PHI confirmation: “we reviewed your chart/records/visit/appointment,” “as your provider/patient”
- [ ] Medical guarantees: “guaranteed,” “permanent,” “cure,” “100% results,” “no risk”
- [ ] Incentives/review manipulation: “discount,” “refund if you change/remove review,” “free service for 5 stars,” review gating
- [ ] Competitor attacks: “competitor fake,” “they’re lying,” “we’re better than X”
- [ ] Threats/retaliation: “we’ll report you,” “we’ll take action,” “defamation,” “we will sue”

### Special handling triggers
- [ ] If legal threat present → DO NOT POST. Escalate Legal. post_status must be blocked_manual_review.
- [ ] If PHI/medical privacy risk → Use privacy-safe generic response; do not confirm relationship.
- [ ] If safety incident/injury/alleged damage → Escalate Safety/Ops; avoid admissions; invite offline contact.
- [ ] If harassment/hate/discrimination claims → Escalate Owner/GM; keep response minimal and de-escalating.

### Platform notes
- Yelp: never imply Yelp will remove reviews; no “reporting to Yelp” promises.
- GBP: same prohibitions; keep response concise and factual.

## 3) Escalation Playbook v3
### Escalation levels
- None: routine positive/neutral feedback
- Ops: service quality, delays, missed appointments, professionalism
- Billing: pricing disputes, invoices, refunds
- Safety: damage allegations, injury, unsafe work
- Legal: any threat of lawsuit/attorney/legal action

### Routing SLAs
- Legal: same business day (immediate notification)
- Safety: <4 hours to Owner/GM
- Ops: <24 hours
- Billing: <24 hours

### Evidence checklist (collect before any substantive response)
- Original review text + timestamp + platform URL
- Internal job/visit record (DO NOT quote publicly)
- Staff statements (internal only)
- Photos/docs if damage claimed
- Prior customer communications

### DO NOT POST conditions (always manual-only hold)
- Legal threats (lawsuit/attorney)
- Any scenario requiring PHI discussion
- Active safety investigation or police/insurance involvement
- Harassment threats where any reply could escalate

### Response posture by scenario (public response)
- Billing dispute: acknowledge, no numbers unless verified and already public, invite offline resolution.
- Service complaint: apologize for experience (not fault), commit to follow-up, take offline.
- Suspected fake: do not accuse; say “We can’t locate details; please contact us so we can help.”
- Damage/injury: express concern, no admissions, escalate Safety, invite offline contact.

## 4) Approved Response Templates v3 (paste-ready)
Rules for all templates:
- Allowed variables: {business_name}, {contact_email}=agent_bob_replit+review-bot@agentmail.to, {contact_phone} (optional), {signoff_name} (optional, first name only).
- Prohibited variables: staff last names, appointment date/time, invoice/job numbers, any medical details, any PHI.
- Required offline CTA: email (and phone if available).

### A) Dentist Templates (GBP/Yelp)
DENT-01 Positive
"Thanks for the kind words! We’re glad you had a great experience at {business_name}. If there’s ever anything we can do to help, please reach us at {contact_email}."

DENT-02 Neutral/Short
"Thank you for the feedback. If you’re open to sharing details so we can improve, please contact us at {contact_email}."

DENT-03 Mild Negative (service/communication)
"Thanks for letting us know. We’re sorry your experience didn’t meet expectations. We’d like to learn more and help—please contact us at {contact_email} so we can follow up." 

DENT-04 Strong Negative (no PHI confirmation)
"We take feedback seriously and want to address this appropriately. For privacy reasons, we can’t discuss details here, but we’d like to connect directly. Please email {contact_email} and our team will follow up." 

DENT-05 Suspected Fake/Can’t Identify
"Thank you for the review. We can’t confirm details publicly and we’re not able to locate enough information to understand what happened. Please contact us at {contact_email} so we can look into this and help." 

DENT-06 Safety/Clinical concern wording (still no PHI confirmation)
"We’re sorry to hear you’re concerned. We take safety and quality seriously. For privacy reasons we can’t discuss details here, but we’d like to connect directly—please contact {contact_email}." 

### B) Med Spa Templates (GBP/Yelp)
MED-01 Positive
"Thank you for sharing this! We appreciate you choosing {business_name}. If you ever need anything, contact us at {contact_email}."

MED-02 Neutral
"Thanks for the feedback. We’re always working to improve—please email {contact_email} if you’d like to share more details." 

MED-03 Mild Negative
"We’re sorry your experience fell short of expectations. We’d like the chance to make this right—please contact us at {contact_email}." 

MED-04 Strong Negative (no outcomes, no PHI)
"Thank you for raising this. We can’t discuss details here, but we want to address your concerns. Please email {contact_email} so a manager can follow up." 

MED-05 Suspected Fake
"Thanks for the review. We’re unable to confirm details publicly and can’t identify what this refers to. Please contact {contact_email} so we can investigate and assist." 

MED-06 Results/expectations complaint (no guarantees)
"We’re sorry to hear you’re disappointed. Individual experiences can vary, and we’d like to understand what happened and discuss options directly. Please contact us at {contact_email}." 

### C) HVAC Templates (GBP/Yelp)
HVAC-01 Positive
"Thanks for the great review! We appreciate you choosing {business_name}. If you need anything in the future, reach us at {contact_email}." 

HVAC-02 Neutral
"Thank you for the feedback. If you can share more details, we’d like to improve—please contact {contact_email}." 

HVAC-03 Scheduling/No-show complaint
"We’re sorry for the inconvenience. We’d like to look into what happened and help resolve this—please contact us at {contact_email}." 

HVAC-04 Work quality complaint (no admissions)
"We’re sorry to hear this wasn’t the experience you expected. We want to review the situation and make sure next steps are clear—please contact us at {contact_email}." 

HVAC-05 Pricing dispute
"Thank you for the feedback. We’d like to review your concerns and clarify options directly. Please contact us at {contact_email}." 

HVAC-06 Alleged damage (escalate Safety/Ops; no liability admission)
"We’re concerned to hear this and want to address it promptly. We can’t discuss details here, but please contact {contact_email} so a manager can follow up." 

## Platform Policy Alignment Summary (Google + Yelp)
- No incentives for reviews; no conditional refunds/discounts for changes.
- No promises of removal or platform enforcement.
- No PHI confirmation; keep healthcare replies privacy-safe and generic.
- No harassment/retaliation; do not argue.
- Keep responses helpful and direct users to offline resolution.

End of Pack.
