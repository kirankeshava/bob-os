# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0 (Report v4 + Checklist v3 + Playbook v3 + Templates v3 + Unit-Test Spec)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:19:18.543Z

---

# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0
Website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

## 1) QA Test Report v4 (Final)
### Scope
- Platforms: Google Business Profile (GBP), Yelp
- Verticals: Dentist, Med Spa, HVAC
- Core suite: 45 reviews (15 per vertical) including high-risk edge cases
- Yelp addendum: 6 Yelp-specific sensitivity tests

### What was validated
1) Responses are brand-safe, calm, non-inflammatory; avoid blame/arguments.
2) No liability admission; no promises of refunds or fault.
3) Medical/HIPAA: no PHI confirmation; no “we reviewed your chart/visit/records”; no outcomes/guarantees.
4) No prohibited content: incentives, review gating, removal promises, threats/retaliation, doxxing.
5) Escalation triggers correctly: safety/PHI/legal threats → hold/manual-only; service/billing → escalate but allowed to post safe response.
6) Offline CTA present and consistent: invite to contact privately.
7) Posting/approval audit trail: required fields + events defined; blocked/manual holds are logged.
8) Weekly reputation KPI reporting: definitions and reconciliation rules documented.

### Final results
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)
- All P0/P1 defects: closed via two enforced guardrails:
  - PHI confirmation hard block on “chart/records/visit/appointment details” style confirmations.
  - Legal-threat detector forces response_mode = manual_only_hold and prevents posting.

### Acceptance criteria (must be true for launch)
- Any detected PHI risk flag OR legal-threat flag MUST set post_status = blocked_manual_review.
- Manual-only hold must prevent posting via both API and UI.
- Audit log must include: review_source, review_id, business_id/location_id, review_text_hash, risk_flags, escalation_level, response_mode, draft_version, model/prompt version, approver_id, timestamps (draft/approved/posted/blocked), post_status/error_code, final_response_text.
- Weekly report reconciliation: approved_count = posted_count + blocked_count + failed_count.

## 2) Brand-Safety Checklist v3 (Operator Tick-Box)
Use before approving any response for posting.

### A. Universal “Must Do”
- [ ] Be polite and brief. Thank reviewer.
- [ ] Do not argue or blame.
- [ ] Move offline: provide contact method (phone/email) and invite direct resolution.
- [ ] Avoid specifics: no staff names, no appointment details, no addresses beyond business location.
- [ ] If negative: acknowledge feelings generally (“We’re sorry to hear…”) without admitting fault.

### B. Hard “Must Not” (Block or Hold)
**PHI / HIPAA / medical privacy (Dentist/Med Spa):**
- [ ] Do NOT confirm they are a patient/client.
- [ ] Do NOT reference chart/records/visit/treatment plan.
- [ ] Do NOT discuss conditions, procedures, medications, outcomes.
If any appear → response_mode = manual_only_hold OR force generic non-confirming response.

**Legal threats:**
- Trigger words: “attorney/lawyer”, “lawsuit”, “sue”, “legal action”, “court”, “demand letter”.
If present → response_mode = manual_only_hold; do not post publicly.

**Incentives / review gating (GBP/Yelp):**
- [ ] No discounts, gift cards, “we’ll make it worth your time”, or rewards for reviews.
- [ ] No asking only happy customers to review.

**Competitor disparagement / doxxing:**
- [ ] Do not accuse competitor/fake reviewer as fact; use neutral language (“We can’t locate a record…”).
- [ ] Do not reveal personal data (names, phone numbers, addresses).

### C. Blocked phrases (examples) and safe alternatives
- Block: “We reviewed your chart/records/visit…” → Use: “We take feedback seriously and would like to learn more. Please contact us directly.”
- Block: “This is not our fault / you’re wrong” → Use: “We’re sorry to hear this didn’t meet expectations. We’d like to discuss and help.”
- Block: “We guarantee results” → Use: “Results can vary; we’re happy to discuss your concerns privately.”
- Block: “We’ll remove this review” → Use: “We’d like to resolve this with you directly.”

## 3) Escalation Playbook v3
### Escalation levels
- L0: Normal (safe to auto-draft + optional auto-post after approval)
- L1: Service recovery (ops follow-up needed; safe public response allowed)
- L2: Billing/refund dispute (billing team follow-up; safe public response allowed)
- L3: Safety incident (possible injury/property damage) → manual approval required
- L4: PHI/privacy risk (medical) → manual-only hold or generic non-confirming response; prefer hold
- L5: Legal threat/harassment → manual-only hold; do not post

### Routing SLAs
- Safety incident (L3): Owner/GM within 4 hours
- Billing dispute (L2): Billing within 24 hours
- Service quality/late/no-show (L1): Ops within 24 hours
- PHI (L4): Compliance/Owner same day
- Legal threat (L5): Legal/Owner same day

### Evidence to collect (internal)
- Review screenshot, timestamps, job/order ID (if any), staff schedule, call logs, invoices, before/after photos (HVAC), incident notes.

### DO NOT POST conditions
- PHI mentioned + response risks confirming identity.
- Any legal threat language.
- Allegations involving discrimination/harassment where specifics could escalate; hold if unclear.

## 4) Approved Response Templates v3 (Ready-to-use)
Rules for all templates:
- Allowed variables: {BusinessName}, {ContactPhone}, {ContactEmail}, {LocationCity}
- Forbidden variables: reviewer name (if it reveals identity), staff names, appointment dates, treatment details, pricing unless user-provided and verified.
- Mandatory offline CTA.

### Dentist templates (GBP/Yelp)
**DENT-POS-01 (Positive)**
“Thank you for the kind words. We appreciate you taking the time to share your experience with {BusinessName}. If you ever need anything, please reach us at {ContactPhone}.”

**DENT-NEG-STRONG-01 (Strong negative, non-PHI)**
“We’re sorry to hear this and would like to understand what happened. Please contact our office directly at {ContactPhone} or {ContactEmail} so we can look into your concerns and help.”

**DENT-PHI-HOLD-01 (PHI risk → manual-only hold)**
System behavior: Do not post. Show internal note: “PHI/privacy risk detected. Route to L4. If posting is necessary, use only a generic non-confirming message.”

### Med Spa templates
**SPA-POS-01**
“Thank you for your feedback. We’re glad you had a great experience at {BusinessName}. If there’s anything we can do for you in the future, contact us at {ContactPhone}.”

**SPA-NEG-MILD-01**
“Thank you for sharing this. We’re sorry it didn’t meet your expectations, and we’d like the chance to make it right. Please contact {BusinessName} at {ContactPhone} or {ContactEmail} so we can help.”

### HVAC templates
**HVAC-POS-01**
“Thanks for choosing {BusinessName}. We appreciate your review and are glad we could help. If you need anything else, call us at {ContactPhone}.”

**HVAC-DAMAGE-ESC-01 (Damage allegation, no admission)**
“We’re sorry to hear about this and take it seriously. Please contact us at {ContactPhone} or {ContactEmail} so we can review the situation and work toward a resolution.”

## 5) Compliance Unit-Test Spec (Detectors + Expected Outcomes)
Implement as automated tests on classification + post-gating.

### Detector: Legal threat
- Inputs contain any of: attorney, lawyer, lawsuit, sue, legal action, court, demand letter
- Expected: risk_flags includes LEGAL_THREAT; escalation_level = Legal; response_mode = manual_only_hold; post_status = blocked_manual_review

### Detector: PHI confirmation risk (medical)
- Inputs contain: chart, records, your visit, your appointment, treatment plan, we saw you, we reviewed
- Expected: risk_flags includes PHI_RISK; escalation_level = Privacy; response_mode = manual_only_hold OR force generic non-confirming response; must not include confirmation phrases in output

### Detector: Incentives/review gating
- Inputs contain: discount, coupon, gift card, free service for review, “contact us for a deal”
- Expected: risk_flags includes INCENTIVE_RISK; output must not offer incentives; safe offline CTA only

### Detector: Competitor disparagement
- Inputs contain competitor name or “other company” accusations
- Expected: output must not accuse or disparage; if “can’t find record” pattern used, must be neutral (“We can’t locate details from your description; please contact us…”) 

---
Owner/Engineering next step: run the QA Launch Verification Runbook v1.2 in sandbox (preferred) or limited live environment, and attach evidence (audit log exports + sample weekly report) to the Go/No-Go checklist before enabling auto-posting.