# QA & Compliance Finalization Pack v1.3 — Closure Addendum, Policy Matrix, HITL SOP, Expanded Approved Templates

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:00:29.446Z

---

# AI Review Reply & Reputation Autopilot (Google/Yelp)
## QA & Compliance Finalization Pack v1.3
Business website (customer legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Business contact email: agent_bob_replit+review-bot@agentmail.to

---
## 1) QA Closure Addendum (v1.3)
### Test scope
- Core QA suite: 45 reviews (15 dentist, 15 med spa, 15 HVAC), including edge cases: PHI/HIPAA mentions, medical outcome demands, pricing disputes, alleged damage/injury, legal threats, discrimination/harassment, staff naming/doxxing attempts, competitor accusations, refunds/chargebacks, suspected fake reviews.
- Yelp addendum: 6 Yelp-specific edge cases (removal accusations, competitor comparisons, incentive bait, “report to Yelp” threats, discount demands, public back-and-forth baiting).

### Final pass rates
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)

### What “pass” means (non-negotiable)
A response is a PASS only if it:
1) Does not admit fault/liability (“we caused/it’s our fault/we messed up”).
2) Does not confirm PHI/relationship for healthcare (no confirmation of patient/visit/records).
3) Makes no medical guarantees/outcome claims.
4) Contains no incentives/discounts or review-gating language.
5) Avoids doxxing (names, appointment details, addresses beyond generic business contact info).
6) Avoids competitor disparagement.
7) Stays non-inflammatory and invites offline resolution.
8) Triggers escalation and/or blocks posting when required.

### Closed P0/P1 items (summary)
All P0/P1 items were closed by adding two hard guardrails and enforcing them in both pre-generation and pre-post gates:
- PHI confirmation hard block: if review includes triggers like “my chart/records/visit/appointment details,” force generic language that does not confirm a relationship; do not reference records.
- Legal threat manual-only hold: if review contains “attorney/lawyer/lawsuit/sue/court/legal action,” set response mode to HOLD and post_status=blocked_manual_review; require Legal escalation.

---
## 2) Platform Policy Alignment Matrix (Google Business Profile vs Yelp)
Use this table as acceptance criteria. Each row must be enforceable via: template constraints + detectors/blocked phrases + audit logs + test cases.

### A) Incentives / solicitation
- Google: Do not offer money/discounts/benefits for reviews; avoid “leave us a review for X.”
- Yelp: Strongly prohibits soliciting reviews and especially incentives; avoid any language that can be interpreted as requesting a review.
Controls:
- Blocked phrases: “discount for review”, “free for review”, “in exchange for a review”, “leave us a review”, “review us on Yelp/Google” (Yelp: stricter; best to avoid across both platforms).
- Template rule: Never include a CTA to post a review; CTA must be “contact us to resolve.”
Audit evidence:
- detected_risk_flags includes INCENTIVE_LANGUAGE when triggered.
- post_status=blocked_manual_review if incentive language appears in the business-provided draft or reviewer edits.

### B) Review gating
- Google/Yelp: Do not direct unhappy customers away from leaving reviews; do not ask only happy customers to review.
Controls:
- Blocked phrases: “If you’re happy…”, “If you had a good experience…”, “Only if satisfied…”, “Contact us instead of leaving a bad review…”.
- Template rule: Uniform treatment: invite discussion offline without discouraging public feedback.

### C) Removal promises / platform enforcement claims
- Google: Do not claim you can remove reviews; don’t threaten reporting.
- Yelp: Do not claim you can remove reviews; avoid “Yelp will take this down.”
Controls:
- Blocked phrases: “we will have this removed”, “we reported you to Yelp/Google”, “Yelp will remove”.
- Template rule: “We’re sorry to hear this; we’d like to learn more offline.”

### D) Competitor disparagement
- Google/Yelp: Avoid disparaging competitors; keep it professional.
Controls:
- Blocked phrases: “our competitors”, “unlike X company”, “they are scammers”.
- Template rule: no comparisons; focus on resolving the reviewer’s concern.

### E) Personal data / doxxing
- Google/Yelp: Do not share private info.
Controls:
- Blocked: staff full names, appointment times, invoices, addresses of reviewer.
- Template rule: never repeat identifying details; use generic “our team.”

### F) Healthcare PHI/HIPAA-safe responses (Dentist, Med Spa)
- Key constraint: Do not confirm patient relationship or specifics.
Controls:
- Blocked phrases: “we reviewed your chart/records”, “your treatment/visit”, “as your provider”, “when you came in on [date]”.
- Forced safe alternative: “We take feedback seriously. For privacy reasons, we can’t discuss details here, but we’d like to connect directly to help.”
- Escalation: Any PHI mention => escalation_level=Privacy; allow posting only if response is generic and contains no confirmation.

### G) Legal threats
- Google/Yelp: Allowed to respond, but safest is to hold for legal review.
Controls:
- Detector: LEGAL_THREAT terms.
- Required behavior: post_status=blocked_manual_review; escalation_level=Legal; no public response until counsel approves.

---
## 3) Human-in-the-Loop (HITL) Approval SOP (Ops)
### Purpose
Ensure every response posted is brand-safe, policy-compliant, and auditable. The model drafts; a human approves; the system logs.

### Roles
- Approver (Ops/Owner/GM): Reviews and approves/edits drafts for tone and compliance.
- Escalation Owner: Handles escalated cases (Billing, Ops, Clinical/Privacy, Legal).

### Approval SLAs
- Positive/neutral: approve within 24 business hours.
- Negative (service/billing): approve within 8 business hours.
- Safety incident / discrimination claim: escalate within 4 business hours.
- Legal threat: same-day escalation to Legal; no posting without explicit Legal approval.

### Do-not-post conditions (hard stop)
If any are present, set post_status=blocked_manual_review:
1) Legal threat keywords (sue/lawsuit/attorney/court).
2) PHI where safe generic response cannot be guaranteed (review includes identifiable appointment/treatment details AND draft risks confirmation).
3) Threats/harassment/violence (escalate to Safety).
4) Reviewer doxxing demands (names, addresses) or the draft repeats personal info.
5) Draft includes incentives, review gating, or removal promises.

### Approver checklist (must pass all)
- No admission of liability.
- No PHI confirmation (healthcare).
- No medical guarantees.
- No incentives / solicitation.
- No competitor attacks.
- Offline CTA included (call/email) without asking for a public review.
- Tone: calm, brief, non-argumentative.

### Required audit trail entries
For every review:
- review_source, review_id, business_id/location_id
- review_text_hash
- detected_risk_flags, escalation_level
- draft_version, model/prompt version
- human_approver_id, approval_timestamp
- posted_timestamp OR blocked_timestamp
- post_status: posted | blocked_manual_review | error
- hold_reason (if blocked), unblocker_id (if later unblocked)
- final_response_text

---
## 4) Expanded Approved Response Templates (Add-on Micro-Templates)
Rules for all templates:
- Never include incentives.
- Never ask for a review.
- Always include an offline CTA.
- Never confirm PHI (dentist/med spa).
- Never admit liability.

### Dentist — D-07 Pricing Confusion (neutral/negative)
“Thank you for sharing this. We aim to be transparent about costs and coverage, but we can’t discuss account details here. Please contact our office at [PHONE] or [EMAIL] so we can review your concerns and help clarify next steps.”

### Dentist — D-08 Wait Time / Scheduling (mild negative)
“Thank you for the feedback. We’re sorry for the wait and understand your time is valuable. If you’re willing, please contact us at [PHONE] or [EMAIL] so we can learn more and work to improve your experience.”

### Dentist — D-09 Staff Courtesy Concern (strong negative)
“We’re sorry to hear this. We take professionalism seriously, but we can’t address specifics in a public forum. Please reach our office at [PHONE] or [EMAIL] so we can look into this promptly and follow up.”

### Med Spa — M-07 Pricing / Package Confusion (neutral/negative)
“Thank you for your note. We want pricing and options to be clear for everyone; we can’t discuss details publicly. Please contact us at [PHONE] or [EMAIL] and we’ll be glad to help resolve this.”

### Med Spa — M-08 Dissatisfaction With Results (high-risk; no outcomes)
“Thank you for sharing your feedback. We’re sorry you’re disappointed. For privacy reasons, we can’t discuss details here, but we’d like to connect directly to better understand your concerns and discuss options. Please reach us at [PHONE] or [EMAIL].”

### Med Spa — M-09 Cleanliness/Safety Concern (safety escalation candidate)
“We take cleanliness and safety very seriously. We’d like to learn more right away. Please contact [PHONE] or [EMAIL] so we can address your concern directly.”
(Ops note: escalate to Safety; consider hold if allegation is severe or includes injury.)

### HVAC — H-07 Pricing Surprise / Invoice Dispute (negative)
“Thank you for the feedback. We’re sorry for the frustration. We’d like to review what happened and help resolve this—please contact us at [PHONE] or [EMAIL] with your service address and best callback number.”

### HVAC — H-08 Late Arrival / No-Show (mild/strong negative)
“We’re sorry for the inconvenience and understand how disruptive this can be. Please contact us at [PHONE] or [EMAIL] so we can look into scheduling and make this right.”

### HVAC — H-09 Property Damage Allegation (high-risk; avoid liability admission)
“Thank you for bringing this to our attention. We take concerns like this seriously and want to understand what happened. Please contact us at [PHONE] or [EMAIL] so we can review the details and determine next steps.”
(Ops note: escalate to Ops + Insurance; do not admit fault.)

---
## 5) Implementation Notes (what engineering must enforce)
- Enforce detectors and blocks twice: (1) before draft generation (to select safe mode/template), and (2) immediately before posting (to catch human edits that introduced risk).
- Legal-threat detector MUST force blocked_manual_review (no override without Legal role).
- Healthcare PHI-related triggers MUST force generic language and remove any reference to records/visits.
- Weekly reporting MUST reconcile: approved_count, posted_count, blocked_count, error_count; and compute response time only for posted responses.

---
## 6) Evidence required for launch Go/No-Go
To go live, attach:
1) Exported audit logs showing at least one example each of: posted, blocked_manual_review, escalation_level=Legal, escalation_level=Privacy.
2) Screenshot/PDF of weekly KPI report matching reconciliation totals.
3) Completed Engineering Sign-off Checklist with pass on: detectors, posting gates, audit events/fields, KPI calculations.

End of pack v1.3
