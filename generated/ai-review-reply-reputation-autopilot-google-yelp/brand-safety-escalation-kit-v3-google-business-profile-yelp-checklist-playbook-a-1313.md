# Brand-Safety & Escalation Kit v3 (Google Business Profile + Yelp) — Checklist, Playbook, and Approved Response Templates (Dentist/Med Spa/HVAC)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:12:12.081Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/Contact: agent_bob_replit+review-bot@agentmail.to
Version: v3.0 (QA/Compliance)

A) BRAND-SAFETY CHECKLIST v3 (tick-box)
Use this before approving any response for posting.

A1. Universal hard prohibitions (FAIL if violated)
- [ ] No confirmation of identity/visit/relationship (PHI/PII risk). Do NOT say: “we reviewed your chart/records/visit,” “as your dentist,” “during your appointment,” “our patient.”
- [ ] No medical outcome guarantees or clinical claims about an individual. Avoid: “you will be pain-free,” “guaranteed results,” “we fixed your infection.”
- [ ] No admission of liability or fault. Avoid: “we messed up,” “it was our fault,” “we damaged…,” “we were negligent.”
- [ ] No retaliation/threats, no arguing, no inflammatory tone.
- [ ] No incentives/discounts for reviews; no “review gating.” Avoid: “leave a 5-star review for…,” “we’ll refund if you change your review.”
- [ ] No promises about platform enforcement or removal. Avoid: “we will get this removed,” “Yelp/Google will take it down.”
- [ ] No doxxing: never include addresses, phone numbers (unless official business line), staff surnames, patient names, appointment times, invoice numbers.
- [ ] No competitor disparagement or comparisons.

A2. Required elements (FAIL if missing for neutral/negative reviews)
- [ ] Thank reviewer (brief, non-sarcastic).
- [ ] Acknowledge feelings without confirming facts/identity (“We’re sorry to hear you had a frustrating experience.”)
- [ ] Take offline with a clear CTA (phone/email) and invite details privately.
- [ ] Keep it brief: 2–5 sentences preferred.

A3. Tone constraints
- [ ] Calm, professional, non-defensive.
- [ ] No absolute statements that imply certainty when facts are unknown (“This never happened”). Use “We can’t find enough information here to confirm, but we’d like to look into it.”

A4. Safety filters / blocked phrases (must trigger rewrite or manual hold)
- PHI confirmation triggers (rewrite): “chart,” “records,” “visit,” “appointment with Dr. ___,” “treatment plan,” “diagnosis,” “prescription,” “x-ray,” “procedure details,” “HIPAA.”
- Legal threat triggers (manual-only hold): “lawyer,” “attorney,” “lawsuit,” “sue,” “court,” “legal action,” “demand letter.”
- Safety incident triggers (manual-only hold): “injury,” “bleeding,” “burn,” “infection,” “unsafe,” “fire,” “gas leak,” “carbon monoxide.”
- Discrimination/harassment triggers (manual-only hold + HR/Owner): slurs/harassment, “racist,” “sexist,” “harassed.”

A5. Platform policy alignment checks
Google Business Profile
- [ ] No spammy promos; no personal data; stay relevant to the review.
Yelp
- [ ] Do not ask the reviewer to update/remove the review.
- [ ] Do not mention Yelp moderation/removal.
- [ ] Avoid public back-and-forth; move offline quickly.

A6. Approval + audit trail (must be logged)
- [ ] review_source, review_id, review_text_hash
- [ ] detected_risk_flags + detector_version
- [ ] escalation_level + hold_reason (if any)
- [ ] draft_version + prompt/model version
- [ ] approver_id + approval_timestamp
- [ ] post_status (posted | blocked_manual_review | failed) + posted_timestamp/error_code


B) ESCALATION PLAYBOOK v3 (L0–L4)
Goal: protect brand + comply with platform policies + prevent liability/PHI exposure.

B1. Severity levels
- L0 Routine: positive/neutral, no risk flags. Auto-draft + normal approval.
- L1 Service complaint (non-safety): late arrival, rudeness, minor dissatisfaction. Draft allowed with offline CTA.
- L2 Billing/pricing dispute: refund demands, surprise charges. Draft allowed but avoid specifics; route Billing.
- L3 High-risk: suspected fake review/competitor, discrimination allegations, damage claims without legal threats. Manual approval required; avoid denials.
- L4 Critical: legal threats, PHI/HIPAA content, safety incidents/injury, harassment with threats. RESPONSE MODE: HOLD (do-not-post) until Owner/Legal review.

B2. Routing SLAs (internal)
- L4 (Legal/PHI/Safety): Owner/GM immediately; Legal same business day; Ops within 4 hours.
- L3: Owner/GM within 24h; Ops within 24h.
- L2: Billing lead within 24h.
- L1: Ops within 48h.

B3. Do-not-post conditions (automatic HOLD)
- Any legal threat language.
- Any review containing patient identifiers or treatment specifics (even if the reviewer posted them).
- Any safety incident or injury claim.
- Ongoing investigation request from insurer/regulator.

B4. Evidence to collect (before any public response on L3/L4)
- Review screenshot + URL + timestamp
- Internal records search WITHOUT documenting PHI in public tools
- Staff statements (internal)
- Work order/invoice (HVAC)
- Incident report (if safety)

B5. Scenario guidance
1) Dentist — PHI/HIPAA mention
- Action: L4 HOLD. No public response until compliance review.
- Allowed public wording (if approved later): generic, no confirmation.

2) Med Spa — outcome dissatisfaction / “burned me”
- If injury/safety alleged: L4 HOLD.
- Otherwise L3: empathetic, no clinical claims; offline CTA.

3) HVAC — alleged damage (“you broke my furnace”) or gas leak
- Damage: L3 manual approval; do not admit fault; request offline details.
- Gas leak/carbon monoxide: L4 HOLD + safety escalation.

4) Suspected fake review / competitor
- L3. Do not accuse; state inability to verify + invite offline contact.

5) Discrimination/harassment allegation
- L4 HOLD if slurs/threats; otherwise L3 manual approval + HR route.


C) APPROVED RESPONSE TEMPLATES v3 (paste-ready)
Rules for ALL templates:
- Allowed variables: {BusinessName}, {SupportEmail}=agent_bob_replit+review-bot@agentmail.to, {SupportPhone}, {City}, {TeamName}.
- Never include: reviewer name if it reveals identity, staff last names, appointment dates/times, invoice numbers, clinical details, diagnoses.
- Always keep 2–5 sentences. Always include offline CTA for anything below 5-star.

C1) Dentist templates (Google/Yelp)
DENT-POS-01 (Positive)
“Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. We appreciate you taking the time to share this feedback.”

DENT-NEU-01 (Neutral/short)
“Thanks for your feedback. We’re always working to improve, and we’d like to learn more about what we could have done better. Please contact us at {SupportEmail} so we can follow up privately.”

DENT-NEG-01 (Mild negative: wait time/service)
“We’re sorry to hear your experience was frustrating. This isn’t the level of service we aim to provide, and we’d like to look into what happened. Please reach us at {SupportEmail} or {SupportPhone} so we can help offline.”

DENT-BILL-01 (Billing/pricing dispute)
“Thank you for sharing this. We’re sorry for the confusion and we take billing concerns seriously. Please email {SupportEmail} with a way to reach you so our team can review the issue privately.”

DENT-FAKE-01 (Suspected fake/unverifiable)
“Thank you for the note. We can’t verify the details from this post, but we’d like to understand what happened and address any concerns. Please contact {SupportEmail} so we can follow up offline.”

DENT-HOLD-LEGAL-01 (Legal threat) — DO NOT POST (for internal use)
“Flag as L4 Legal HOLD. Do not respond publicly. Route to Owner/Legal; preserve evidence.”

C2) Med Spa templates (Google/Yelp)
SPA-POS-01
“Thank you for your feedback. We’re glad you enjoyed your visit with {BusinessName}, and we appreciate you taking the time to share your experience.”

SPA-NEG-01 (Service dissatisfaction)
“We’re sorry to hear this wasn’t the experience you expected. We’d like to learn more and see how we can make it right. Please contact us at {SupportEmail} so we can follow up privately.”

SPA-OUTCOME-01 (Dissatisfied with results; no injury)
“Thank you for sharing your concerns. We’re sorry you’re feeling disappointed, and we’d like to understand more about your experience. Please email {SupportEmail} so we can connect offline.”

SPA-SAFETY-HOLD-01 (Burn/injury/infection claim) — DO NOT POST
“Flag as L4 Safety/Clinical HOLD. Do not respond publicly. Route to Owner/Clinical lead; document incident internally.”

SPA-BILL-01
“We’re sorry for the frustration and appreciate you raising this. We want to review the details and help resolve it. Please reach out at {SupportEmail} so we can assist privately.”

SPA-FAKE-01
“Thank you for the feedback. We can’t confirm the details from this post, but we’d like to look into it. Please contact {SupportEmail} so we can follow up offline.”

C3) HVAC templates (Google/Yelp)
HVAC-POS-01
“Thanks for the great review. We’re glad our team could help, and we appreciate you choosing {BusinessName}.”

HVAC-NEG-01 (No-show/late)
“We’re sorry for the inconvenience and understand how frustrating this is. We’d like to look into your appointment experience and make it right. Please contact {SupportEmail} or {SupportPhone} so we can help offline.”

HVAC-QUAL-01 (Work quality issue)
“We’re sorry to hear you’re having trouble. We want to understand what’s going on and work toward a resolution. Please reach out at {SupportEmail} with the best way to contact you so we can follow up privately.”

HVAC-DAMAGE-01 (Alleged damage)
“Thank you for bringing this to our attention. We take concerns like this seriously and would like to review the situation. Please contact {SupportEmail} so we can connect offline and gather details.”

HVAC-SAFETY-HOLD-01 (Gas leak/CO) — DO NOT POST
“Flag as L4 Safety HOLD. Do not respond publicly. Route to Owner/Ops immediately; follow safety incident process.”

HVAC-FAKE-01
“Thanks for the message. We can’t verify the details from this post, but we’d like to investigate and help if there’s an issue. Please contact {SupportEmail} so we can follow up offline.”


D) POLICY ALIGNMENT APPENDIX (acceptance criteria)
- Incentives: Never offer discounts, refunds, gifts, or perks for reviews or changes to reviews (Google/Yelp).
- Review gating: Never ask for only positive reviews.
- Removal promises: Never claim Yelp/Google will remove a review or that you are working with them to do so.
- PHI/PII: Never confirm the reviewer is/was a patient/client or reference records/visits.
- Legal threats: Must set post_status=blocked_manual_review and escalation_level=Legal; no public reply.
- Competitors: Do not disparage or compare; do not accuse a reviewer of being a competitor.
- Offline CTA: For any neutral/negative review, include a private contact method (use {SupportEmail}=agent_bob_replit+review-bot@agentmail.to).

Operational note: If customer asks for “more assertive/defensive” replies, do NOT comply if it increases risk (PHI, liability admission, inflammatory tone). Keep responses short, factual, and offline-focused.