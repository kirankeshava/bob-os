# QA Closure Memo + Brand-Safety Checklist v3 + Escalation Playbook v3 + Templates Library v3 (Google Business Profile & Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:25:39.653Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
QA Closure Memo & Compliance Handoff Pack v1.3

Website (for legitimacy in comms): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

1) QA CLOSURE MEMO (v1.3)

Scope validated
- Draft generation: brand-safe, non-inflammatory, non-argumentative, no admissions of liability.
- Escalation triggers: negative review classification + “manual-only hold” on legal threats.
- Policy compliance: no incentives, no review gating, no removal promises, no competitor disparagement, no PHI confirmation.
- Audit trail: acceptance criteria defined for draft→flag→approve→post/blocked events, with required fields.
- Weekly KPI reporting: response rate/time, rating trend, sentiment buckets, escalation counts/aging, and reconciliation (approved vs posted vs blocked).

Final test results
- Core 45-case suite across Dentist / Med Spa / HVAC: 45/45 PASS.
- Yelp-specific addendum (6 edge cases): 6/6 PASS.
- Launch blockers status: all P0/P1 closed in QA; remaining risk is implementation fidelity (posting gate + logs + KPI math) which must be verified using the runbook.

Non-negotiable launch-blocking conditions (must be enforced in both API and UI)
A) Manual-only hold MUST prevent posting
- If legal-threat detector triggers (e.g., “attorney”, “lawsuit”, “sue”), system sets:
  - response_mode = MANUAL_ONLY
  - escalation_level = LEGAL
  - post_status = blocked_manual_review
  - hold_reason populated
- Any attempt to post while blocked must fail closed (no “best effort” posting).

B) PHI/HIPAA-safe response rule
- If review text includes PHI-adjacent triggers (“chart”, “records”, “your visit”, “appointment details”, “diagnosis”, “treatment plan”), response must:
  - Avoid confirming the person is a patient/client
  - Avoid referencing visit dates, procedures, outcomes, or any personal details
  - Use generic phrasing and route offline

C) Prohibited content MUST be blocked or rewritten
- Incentives: no discounts/credits/gift cards in exchange for reviews.
- Review gating: no asking only happy customers to review.
- Removal promises: do not claim to remove reviews or influence Yelp/Google enforcement.
- Competitor attacks: no disparagement or comparisons.
- Doxxing: no names/phone/email/address of reviewer; no staff last names; no identifying appointment details.

Evidence required for Go/No-Go sign-off (attach artifacts)
1) Audit log export containing: draft_created, flagged, approved, blocked, posted events.
2) Screenshot/export of weekly KPI report plus raw counts demonstrating reconciliation:
   - posted_responses + blocked_responses + pending_approvals = total_approved_or_attempted_actions (per defined rule)
3) Runbook execution checklist signed by QA/ops + engineering.

2) BRAND-SAFETY CHECKLIST v3 (single master checklist)

Use this checklist for every response generation and before enabling auto-post.

2.1 Content prohibitions (hard rules)
- [ ] No admission of fault or liability. BANNED: “we are at fault”, “our mistake”, “we caused”, “negligent”, “malpractice”.
  SAFE ALTS: “We’re sorry to hear you had a frustrating experience.” / “We’d like to learn more and address your concerns.”
- [ ] No PHI confirmation or patient/client confirmation in healthcare. BANNED: “we reviewed your chart/records/visit”, “as your dentist/doctor”, “during your appointment on…”.
  SAFE ALTS: “For privacy reasons, we can’t discuss details here, but we’d like to connect directly.”
- [ ] No medical outcome guarantees. BANNED: “guaranteed results”, “permanent”, “cure”, “100%”.
  SAFE ALTS: “Results can vary; we’re happy to discuss your concerns privately.”
- [ ] No incentives or solicitation tied to reviews. BANNED: “discount”, “coupon”, “gift card”, “free service for a review”.
- [ ] No review gating. BANNED: “If you’re happy, please leave a review; if not, contact us.”
- [ ] No removal promises or claims of influence. BANNED: “we’ll get this removed”, “Yelp will take it down”, “Google will delete it”.
- [ ] No competitor disparagement. BANNED: “unlike [competitor]”, “they’re scammers”, “they lie”.
- [ ] No threats/retaliation. BANNED: “we will sue”, “defamation”, “we’ll report you” (unless internal hold).
- [ ] No personal data or doxxing. BANNED: phone numbers of individuals, addresses, staff last names, appointment times.

2.2 Required response elements (soft rules, required unless manual-only hold)
- [ ] Polite opening + thanks/acknowledgment.
- [ ] Neutral, de-escalating tone (no sarcasm, no arguing point-by-point).
- [ ] Offline CTA: invite to contact business directly using official channel.
  Example CTA: “Please contact our team at [business phone/email] so we can look into this.”
- [ ] No specifics that could be construed as confirming identity in healthcare.

2.3 Platform policy alignment checks
Google Business Profile
- [ ] No promotional incentives for reviews.
- [ ] No harassment/hate content.
- [ ] Avoid sharing private info.

Yelp
- [ ] Do not ask for reviews in a way that suggests incentives.
- [ ] Do not mention “reporting to Yelp” or imply special removal powers.
- [ ] Keep responses factual, calm, and non-accusatory.

2.4 Escalation and hold gating
- [ ] If legal-threat terms present → escalation_level=LEGAL + blocked_manual_review.
- [ ] If safety incident (injury, fire, carbon monoxide, assault) → escalation_level=SAFETY + manual review required.
- [ ] If PHI/identity-sensitive context → force generic privacy-safe template.

3) ESCALATION PLAYBOOK v3 (common negative scenarios)

Routing SLAs (from detection time)
- Safety incident: Owner/GM < 4 hours; Ops < 4 hours; manual-only hold if any ambiguity.
- Legal threat: Legal same-day; manual-only hold required.
- Billing/refund dispute: Billing < 24 hours.
- Service quality/late/no-show: Ops < 24 hours.
- Discrimination/harassment allegation: Owner/HR < 4 hours; manual-only hold recommended.

Do-not-post conditions (automatic hold)
- Any explicit legal threat (“I’ll sue”, “attorney”, “lawsuit”) → DO NOT POST.
- Any PHI confirmation risk (review includes enough detail that a response could confirm identity) → DO NOT POST unless response is fully generic and approved by trained staff.
- Any ongoing safety investigation, police involvement, or serious injury claim → DO NOT POST.

Scenario guidance (what to do + safe public language)
A) Billing/refund dispute
- Internal: Pull invoice, service record, any signed approvals; identify whether refund policy applies.
- Public response: acknowledge + invite offline; do not quote exact amounts unless already public and verified.

B) Alleged damage (HVAC: property damage; healthcare: injury)
- Internal: Capture photos, job notes, staff statements; escalate to insurer if needed.
- Public response: empathy + offline contact; no fault admission.

C) HIPAA/PHI mention (Dentist/Med Spa)
- Internal: Confirm whether reviewer is identifiable; instruct staff not to reply with details.
- Public response must be generic: “For privacy reasons we can’t discuss details here…”

D) Suspected fake review
- Internal: Check CRM/schedule; if no match, flag as suspected fake.
- Public response: do not accuse; say “We can’t locate a record; please contact us so we can investigate.”

E) Discrimination/harassment allegation
- Internal: Immediate Owner/HR review; preserve logs/cameras if applicable.
- Public response: neutral, respectful; invite offline; avoid debating.

4) APPROVED RESPONSE TEMPLATES LIBRARY v3 (INDEX + RULES)

Global rules for variables
- Allowed variables: {BusinessName}, {SupportPhone}, {SupportEmail}, {City}, {TeamName}.
- Disallowed: reviewer name, staff full name, appointment dates/times, procedure names (healthcare), diagnoses, pricing unless user-provided and verified.
- Required offline CTA for negatives (unless manual-only hold): include {SupportPhone} or {SupportEmail}.

Template IDs (use these as immutable keys)

DENTIST
- DEN-POS-01 (Positive): “Thanks for the kind words… we appreciate you choosing {BusinessName}…”
- DEN-NEU-01 (Neutral/short): “Thank you for the feedback… we’re always working to improve…”
- DEN-MNEG-01 (Mild negative): “We’re sorry to hear this… For privacy reasons we can’t discuss details here. Please contact {SupportPhone}/{SupportEmail}…”
- DEN-SNEG-01 (Strong negative): “We take concerns seriously… we’d like to look into this promptly… contact {SupportPhone}…”
- DEN-FAKE-01 (Suspected fake): “We can’t locate enough information to identify the visit… please contact us so we can investigate…”
- DEN-PRIV-01 (PHI-sensitive): “For privacy reasons, we can’t confirm or discuss any care here. If you believe this involves our office, please contact {SupportPhone}/{SupportEmail}…”

MED SPA
- MSP-POS-01
- MSP-NEU-01
- MSP-MNEG-01 (no outcome claims; privacy-safe)
- MSP-SNEG-01 (service recovery; no liability)
- MSP-FAKE-01
- MSP-PRIV-01 (avoid confirming client; no treatment details)

HVAC
- HVAC-POS-01
- HVAC-NEU-01
- HVAC-MNEG-01
- HVAC-SNEG-01 (no fault admission; schedule offline)
- HVAC-FAKE-01
- HVAC-SAFE-01 (safety issue claim: acknowledge seriousness + immediate offline contact; may require manual review depending on severity)

Platform notes
- Google: keep concise; no salesy language; no incentives.
- Yelp: avoid referencing Yelp enforcement/removal; avoid public back-and-forth; keep calm and short.

End of pack. Next execution step is to run the Verification Runbook v1.2 in either a sandbox environment (preferred) or a limited live test (0 cost) and attach audit/KPI evidence to this memo for final Go/No-Go sign-off.