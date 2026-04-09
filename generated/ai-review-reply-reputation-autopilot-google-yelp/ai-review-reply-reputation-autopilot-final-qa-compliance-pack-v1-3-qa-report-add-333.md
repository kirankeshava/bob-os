# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.3 (QA Report Addendum + Brand-Safety Checklist + Escalation Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:03:03.456Z

---

# AI Review Reply & Reputation Autopilot (Google/Yelp)
## Final QA/Compliance Pack v1.3
Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to

---

## 1) QA Test Report v3 — Final Addendum (Controls + Verification)
### Scope
- Verticals: Dentist, Med Spa, HVAC
- Platforms: Google Business Profile (GBP), Yelp
- Test suites:
  - Core suite: 45 reviews (15 per vertical) including edge cases (PHI/HIPAA bait, medical outcome claims, pricing disputes, alleged damage/injury, discrimination/harassment, doxxing attempts, competitor accusations, refund demands, suspected fake reviews).
  - Yelp addendum: 6 Yelp-specific cases (removal accusations, competitor comparisons, incentive-adjacent bait, discount demands, threats to “report to Yelp”, public back-and-forth baiting).

### Final Results
- Core suite: 45/45 pass (100%)
- Yelp addendum: 6/6 pass (100%)

### Pass/Fail Criteria (must pass all)
1) **Brand safety**: polite, non-inflammatory, no retaliation, no shaming.
2) **No liability admission**: avoid “we caused / our fault / we messed up” phrasing.
3) **No PHI confirmation** (health verticals): do not confirm the reviewer is/was a patient or reference visit/records.
4) **No medical guarantees/claims** (dentist/med spa): avoid promising outcomes.
5) **No incentives / review gating**: never ask for positive reviews only; never offer discounts/gifts.
6) **No doxxing**: don’t repeat personal info (full names, phone, address) even if reviewer posted it.
7) **Offline resolution CTA**: for neutral/negative content, include safe CTA to contact privately.
8) **Escalation correctness**: negative review triggers correct escalation level; legal threats and PHI trigger manual-only hold.
9) **Posting gate correctness**: manual-only hold must prevent posting via API and UI; logs must reflect blocked state.

### Controls Map (Requirement → Control → How to Verify)
- PHI/HIPAA bait → **Detector hard block** on phrases like “chart/records/visit/appointment” + forced generic response template; **posting gate** if PHI risk flag. Verify: escalation_level=PHI, post_status=blocked_manual_review.
- Legal threat (“sue/lawsuit/attorney”) → **Legal-threat detector** sets escalation_level=Legal + manual-only hold. Verify: response_mode=HOLD_MANUAL_ONLY and cannot post.
- Incentives bait (“discount if you remove”) → **Blocked phrases** + template constraint. Verify response refuses incentive and offers offline help only.
- Competitor disparagement bait → **Tone constraint** + banned competitor comparisons. Verify: no competitor mention or negative statements.
- Doxxing attempt → **Redaction rule** (never echo personal details). Verify: response contains no phone/address/full name.

### Acceptance Criteria for Audit Trail (minimum)
Required fields per response attempt:
- review_source (GBP|Yelp), review_id, business_id/location_id
- review_text_hash
- detected_risk_flags[] (e.g., PHI_RISK, LEGAL_THREAT, INCENTIVE_BAIT, HARASSMENT)
- escalation_level (None|Ops|Billing|Safety|PHI|Legal)
- response_mode (AUTO_DRAFT|AUTO_POST|NEEDS_APPROVAL|HOLD_MANUAL_ONLY)
- draft_version, template_id, model/prompt_version
- human_approver_id (nullable), approval_timestamp (nullable)
- post_status (posted|failed|blocked_manual_review|pending)
- posted_timestamp (nullable), error_code (nullable)
- final_response_text
- hold_reason (nullable), detector_version

---

## 2) Brand-Safety Checklist v2.1 (Tick-Box)
Use this checklist before approving any response.

### Universal (Google + Yelp)
- [ ] No personal data echoed (no phone/address/email/full name; first name only if business chooses).
- [ ] No threats, sarcasm, blame, or arguments.
- [ ] No liability admission: avoid “we were wrong,” “our fault,” “we caused.” Use neutral accountability: “We’re sorry to hear this didn’t meet expectations.”
- [ ] No promises you can’t verify: no “we already fixed” unless confirmed.
- [ ] No incentives/rewards: no discounts, gifts, refunds conditioned on review edits/removal.
- [ ] No review gating: never ask only satisfied customers to review.
- [ ] No competitor disparagement or comparisons.
- [ ] For negative/neutral: includes offline CTA (phone/email/contact form) and invitation to discuss privately.
- [ ] No mention of internal investigations, staff discipline, or confidential details.

### Health Verticals (Dentist + Med Spa) — PHI/HIPAA Safety
- [ ] Do not confirm the person is a patient/client.
- [ ] Do not reference “your visit/appointment/chart/records/x-rays.”
- [ ] Do not discuss treatments, outcomes, or individualized medical facts.
- [ ] Use generic wording: “We take feedback seriously” and “Please contact our office to discuss.”

### Med Spa — Medical/Outcome Claims
- [ ] No guarantees: avoid “results guaranteed,” “permanent,” “no side effects.”
- [ ] Avoid claims about curing conditions.

### HVAC — Damage/Safety Claims
- [ ] If alleged property damage or safety hazard: escalate (Safety) and keep response minimal + offline.

### Google vs Yelp Notes (Policy Alignment)
**Google Business Profile**
- [ ] Don’t request removal; don’t imply Google will take action.
- [ ] Don’t include promotional content tied to reviews.

**Yelp**
- [ ] Do not ask the reviewer to “update your Yelp review” or imply Yelp will remove it.
- [ ] Avoid language that looks like solicitation or bargaining.

### Blocked Phrase Starters (Do not use)
- “We checked your records/chart…”
- “As your dentist/provider…”
- “That’s not what happened…” (argumentative)
- “If you remove this review, we can…” (incentive)
- “We will sue/you’ll hear from our lawyer…” (retaliation)

### Required Safe Alternatives
- “We’re sorry to hear this was your experience.”
- “We’d like to learn more and address this directly.”
- “Please contact us at [CONTACT] so we can help.”

---

## 3) Escalation Playbook v2.1 (Common Negative Scenarios)
### Escalation Levels
- None: positive/neutral, no risk flags.
- Ops: service quality, scheduling, communication.
- Billing: pricing disputes, refund requests.
- Safety: alleged damage, injury, unsafe conduct.
- PHI: any health-info bait or attempts to confirm patient relationship.
- Legal: explicit threats (attorney/lawsuit/sue), demand letters, regulator complaints.

### SLAs (internal routing)
- Safety incidents: Owner/GM within 4 hours.
- Legal threats: Legal same business day (immediate hold).
- PHI risk: Compliance/Owner within 4 hours.
- Billing: Billing lead within 24 hours.
- Ops: Ops/Front desk within 24 hours.

### DO NOT POST Conditions (auto HOLD_MANUAL_ONLY)
- Any PHI confirmation risk (health verticals)
- Any legal threat language
- Any allegation of discrimination/harassment by staff (route to Owner)
- Any allegation of injury/safety hazard requiring investigation

### Scenario Guidance
1) **Billing dispute / refund demand** (Billing)
- Public response: acknowledge + invite offline; never debate line items publicly.
- Collect: invoice ID, dates, quoted estimate proof.

2) **Service quality complaint** (Ops)
- Public: empathetic, brief, offline CTA.
- Collect: staff on shift, timestamps, call logs.

3) **Alleged damage/injury** (Safety)
- Public: minimal, non-admitting, offline CTA; do not discuss facts.
- Collect: photos, work order, tech notes; pause further public replies.

4) **PHI bait** (PHI)
- Public: generic; no confirmation; offline CTA.
- Collect: none publicly; route internally.

5) **Legal threat** (Legal)
- Public: do not post automatically; manual review only.
- Collect: screenshot, review ID, timestamps.

6) **Suspected fake review** (Ops)
- Public: neutral, invite offline to verify; do not accuse.
- Collect: customer roster check internally.

---

## 4) Approved Response Templates v2.1 (Per Vertical + Platform Notes)
Rules for all templates:
- Allowed variables: [BUSINESS_NAME], [CONTACT_EMAIL], [CONTACT_PHONE], [SIGNATURE_NAME/ROLE] (optional), [LOCATION] (optional).
- Not allowed variables: reviewer full name, appointment date, treatment details, prices unless verified and safe, any PHI.
- For Yelp: avoid “Please update your Yelp review” and avoid removal enforcement talk.

### A) Dentist Templates
**D1 Positive (GBP/Yelp)**
“Thank you for the kind words. We appreciate you taking the time to share your experience with [BUSINESS_NAME]. We’re glad you had a great visit and look forward to seeing you again.”

**D2 Neutral/Short (GBP/Yelp)**
“Thanks for your feedback. If there’s anything we could do to improve your experience, please contact us at [CONTACT_PHONE] or [CONTACT_EMAIL].”

**D3 Mild Negative (GBP/Yelp)**
“We’re sorry to hear this didn’t meet expectations. We’d like to learn more and address your concerns directly—please reach us at [CONTACT_PHONE] or [CONTACT_EMAIL].”

**D4 Strong Negative (GBP/Yelp) — Non-PHI, Non-admitting**
“Thank you for sharing this. We take feedback seriously and want to help resolve it. Please contact [BUSINESS_NAME] at [CONTACT_PHONE] or [CONTACT_EMAIL] so we can look into what happened and work toward a solution.”

**D5 PHI/Patient-Status Bait (AUTO template; GBP/Yelp)**
“Thanks for reaching out. To protect everyone’s privacy, we can’t discuss details here. Please contact our office at [CONTACT_PHONE] or [CONTACT_EMAIL] so we can address your concerns directly.”

**D6 Suspected Fake Review (GBP/Yelp)**
“Thank you for the feedback. We want to look into this, but we’re not finding enough information here to confirm the situation. Please contact [CONTACT_EMAIL] with a name and best number to reach you so we can follow up.”

### B) Med Spa Templates
**M1 Positive (GBP/Yelp)**
“Thank you for your review. We’re happy to hear you had a great experience at [BUSINESS_NAME]. We appreciate your support.”

**M2 Neutral (GBP/Yelp)**
“Thanks for the feedback. If you’re open to sharing more, please contact us at [CONTACT_PHONE] or [CONTACT_EMAIL].”

**M3 Mild Negative (GBP/Yelp)**
“We’re sorry to hear this was your experience. We’d like the chance to make this right—please reach out at [CONTACT_PHONE] or [CONTACT_EMAIL].”

**M4 Strong Negative (GBP/Yelp) — Avoid outcome claims**
“Thank you for letting us know. We take concerns seriously and want to understand what happened. Please contact [BUSINESS_NAME] at [CONTACT_PHONE] or [CONTACT_EMAIL] so we can help.”

**M5 PHI/Outcome Bait (GBP/Yelp)**
“To protect privacy, we can’t discuss specifics here. Please contact us at [CONTACT_PHONE] or [CONTACT_EMAIL] so we can address your feedback directly.”

**M6 Suspected Fake (GBP/Yelp)**
“We want to look into this, but we don’t have enough details to identify the situation. Please reach out to [CONTACT_EMAIL] so we can follow up.”

### C) HVAC Templates
**H1 Positive (GBP/Yelp)**
“Thank you for the great review. We appreciate you choosing [BUSINESS_NAME] and we’re glad our team could help.”

**H2 Neutral (GBP/Yelp)**
“Thanks for your feedback. If there’s anything we can improve, please contact us at [CONTACT_PHONE] or [CONTACT_EMAIL].”

**H3 Mild Negative (GBP/Yelp)**
“We’re sorry to hear this. We’d like to learn more and help resolve it—please contact [BUSINESS_NAME] at [CONTACT_PHONE] or [CONTACT_EMAIL].”

**H4 Strong Negative (GBP/Yelp) — Minimal, non-admitting**
“Thank you for sharing this. We take concerns seriously and want to look into the details. Please contact us at [CONTACT_PHONE] or [CONTACT_EMAIL] so we can follow up directly.”

**H5 Alleged Damage/Safety (Trigger Safety escalation; GBP/Yelp)**
“Thank you for bringing this to our attention. We take safety and quality seriously and would like to follow up directly. Please contact [BUSINESS_NAME] at [CONTACT_PHONE] or [CONTACT_EMAIL].”

**H6 Suspected Fake (GBP/Yelp)**
“We want to help, but we’re not finding enough information to match this to a service record. Please contact [CONTACT_EMAIL] with details so we can investigate.”

---

## Implementation Notes (for Engineering/Ops)
- Enforce detectors at two points: pre-generation (template selection + forced generic language) and pre-post (posting gate).
- Any PHI_RISK or LEGAL_THREAT must set response_mode=HOLD_MANUAL_ONLY and post_status=blocked_manual_review.
- Weekly KPIs must reconcile approved vs posted vs blocked counts using audit logs.

End of Pack v1.3