# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates (v3.0)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:57:54.921Z

---

Overview (what this pack is)
This v3.0 pack is the implementation-ready compliance layer for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). It is designed to keep responses brand-safe, non-inflammatory, and platform-policy aligned, while preventing hallucination and risky admissions. It includes: (1) Brand-Safety Checklist v3.0, (2) Escalation Playbook v3.0, (3) Approved Response Template Library v3.0 (Dentist, Med Spa, HVAC). Use this alongside the product website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 and contact: agent_bob_replit+review-bot@agentmail.to.

A) Brand-Safety Checklist v3.0 (tick-box, Google + Yelp)
Use on every draft before approval/posting.

A1. Universal “Hard Block / Manual-Only Hold” triggers (DO NOT AUTO-POST)
If any are present: set post_status=blocked_manual_review; require human review; set escalation_level as noted.
- Legal threat keywords: “attorney”, “lawyer”, “lawsuit”, “sue”, “court”, “demand letter”, “legal action” → escalation_level=Legal.
- PHI/medical record confirmation risk: reviewer mentions “my chart/records/visit/appointment/results/x-ray/photos” AND draft includes confirmation language like “we reviewed your chart/records/visit” → block; escalation_level=PHI.
- Safety incident / injury allegation: “injured”, “hurt”, “burned”, “electrocuted”, “gas leak”, “carbon monoxide”, “unsafe”, “assault” → escalation_level=Safety.
- Doxxing/personal data included or requested (phone, address, full names, license plates, appointment times) → escalation_level=Privacy.
- Hate speech or threats of violence → escalation_level=Safety.

A2. Prohibited content (must not appear in posted responses)
- No admitting liability or fault: avoid “we caused”, “it’s our fault”, “we made a mistake that harmed…”, “negligent”.
- No PHI confirmation for healthcare-related verticals: do not confirm they are/were a patient, do not reference “your appointment/records/treatment/results”.
- No medical outcome guarantees or claims: avoid “guaranteed”, “permanent results”, “cure”, “100%”, “no side effects”.
- No incentives/solicitation: avoid “discount”, “free”, “gift card”, “coupon”, “in exchange for review”, “leave us a 5-star review”.
- No review gating: do not ask satisfied customers to post publicly while routing unhappy customers privately.
- No promises of removal or platform enforcement: avoid “we’ll get this removed”, “Yelp/Google will take it down”.
- No competitor disparagement: do not call other businesses “scam”, “inferior”, “liars”.
- No public back-and-forth: avoid debating facts line-by-line; keep short; move offline.

A3. Required elements for any posted response
- Polite greeting + appreciation (even for negatives, neutral tone).
- No confirmation of sensitive details; keep generic.
- Clear offline CTA (required): “Please contact [phone/email] so we can help.” If phone is unavailable, use agent_bob_replit+review-bot@agentmail.to.
- If negative: empathy + commitment to improve + invite to resolve offline.
- If suspected fake: do not accuse; request offline details; state you can’t locate record “based on details provided” without implying.

A4. Tone constraints
- Non-inflammatory, non-defensive, no sarcasm, no blame.
- Short, professional, and specific only when safe.
- Never threaten retaliation or legal counter-threats.

A5. Platform notes (Google vs Yelp)
- Both: no incentives, no fake reviews, no personal data, no removal promises.
- Yelp sensitivity: avoid language that looks like “review solicitation campaigns” or “compensation”; do not mention “reporting to Yelp” or “Yelp will remove”.
- Google sensitivity: avoid discussing internal investigations in detail; keep responses concise and privacy-preserving.

B) Escalation Playbook v3.0 (scenarios, routing, SLAs, evidence, response rules)

B1. Escalation levels
- L0: No escalation (positive/neutral).
- L1: Service recovery (mild negative; can respond with approved template).
- L2: Operations/Billing (billing dispute, missed appointment, scheduling, warranty) — respond with offline CTA; internal ticket required.
- L3: Safety/Privacy/PHI (manual-only hold) — do not post until cleared.
- L4: Legal (manual-only hold) — do not post; legal review required.

B2. Routing + SLA
- L1 Service recovery → Ops Manager / Owner within 24h.
- L2 Billing dispute → Billing lead within 24h; Ops cc.
- L3 Safety/Privacy/PHI → Owner/GM within 4h; if PHI, compliance lead same day.
- L4 Legal threat → Legal same day; Owner immediately.

B3. Evidence to collect (internal, not posted)
- Review source + review_id + timestamp.
- Screenshots of review.
- Customer record lookup notes (do not paste PHI into tools).
- Job/appointment metadata (internal only).
- Any photos, invoices, technician notes (HVAC) / consent forms (med spa/dentist).
- Prior communications.

B4. DO-NOT-POST conditions (force manual-only hold)
- Any legal threat.
- Any draft that confirms patient/customer identity in a medical context.
- Any mention of injury, gas leak, or safety hazard without management review.
- Any harassment/hate speech where response could inflame; consider minimal “offline contact” or no response per policy.

B5. Scenario guidance (common)
1) Billing dispute (L2):
- Public: acknowledge concern, invite offline resolution, no numbers unless verified and user-provided.
- Avoid: “You owe…” “You’re lying”.
2) Alleged damage to property (HVAC) (L3 if severe, else L2):
- Public: concern + offline CTA; no admission.
- Collect: photos, work order, technician notes.
3) Medical dissatisfaction (dentist/med spa) (L1/L2):
- Public: generic empathy, no confirmation of treatment, invite direct contact.
- Avoid: discussing procedures, outcomes, or “your results”.
4) PHI mentioned by reviewer (L3):
- Public: do not confirm; use generic “we can’t discuss details here”.
- Internal: compliance review.
5) Suspected fake review (L1/L2):
- Public: “We can’t locate a record based on details provided” + invite offline with specifics.
- Avoid: “This is fake” “You were never here.”
6) Discrimination/harassment allegation (L3):
- Public: serious tone, invite offline; no argument.
- Internal: HR/Owner review.

C) Approved Response Template Library v3.0
Rules for all templates:
- Allowed variables: {BusinessName}, {ContactEmail}, {ContactPhone}, {ManagerNameOrRole}, {City}, {ServiceCategory}.
- Banned variables: staff full names, appointment dates/times, treatment details, patient/customer confirmation, pricing unless explicitly provided by reviewer and verified.
- Every negative template includes an offline CTA.
- Yelp/Google: do not mention “we’ll remove this” or incentives.

C1. Dentist templates (DENT-*)
DENT-01 Positive
“Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. If there’s ever anything we can do to help, please reach out anytime.”

DENT-02 Neutral/short
“Thanks for taking the time to leave feedback. We appreciate it and will share it with our team.”

DENT-03 Mild negative (service experience)
“Thank you for the feedback. We’re sorry to hear your experience wasn’t what you expected. We’d like to learn more and help—please contact us at {ContactPhone} or {ContactEmail} so we can follow up directly.”

DENT-04 Strong negative (no PHI, no admission)
“We’re concerned to hear this and take feedback seriously. Because we can’t discuss details in a public forum, please contact {ManagerNameOrRole} at {ContactEmail} (or {ContactPhone}) so we can look into what happened and work toward a resolution.”

DENT-05 PHI mentioned by reviewer (manual review recommended; safe public if cleared)
“Thank you for your message. For privacy reasons, we can’t discuss anything related to individual circumstances here. Please contact {ManagerNameOrRole} at {ContactEmail} so we can assist you directly.”

DENT-06 Suspected fake / can’t locate
“Thank you for the note. We’d like to understand this better, but we’re unable to match the situation based on the details provided here. Please contact {ContactEmail} with your name and a way to reach you so we can review and help.”

C2. Med Spa templates (SPA-*)
SPA-01 Positive
“Thank you for your review. We’re happy you had a great experience at {BusinessName} and we appreciate you taking the time to share it.”

SPA-02 Neutral
“Thanks for the feedback. We appreciate it and will use it to keep improving.”

SPA-03 Mild negative (wait time / service)
“Thank you for letting us know. We’re sorry for the inconvenience and would like to make this right. Please reach out at {ContactEmail} (or {ContactPhone}) so we can follow up.”

SPA-04 Strong negative (no guarantees, no PHI)
“We’re sorry to hear you’re disappointed. We take concerns seriously, and we’d like to speak with you directly to understand what happened. Please contact {ManagerNameOrRole} at {ContactEmail} so we can help.”

SPA-05 Outcome/medical-claim bait (avoid debating)
“Thank you for your feedback. Because experiences can vary and we can’t discuss individual details publicly, we’d like to connect privately to address your concerns. Please contact {ContactEmail}.”

SPA-06 Suspected fake
“Thank you for your message. We’d like to look into this, but we can’t confirm details in a public forum. Please contact {ContactEmail} with your name and the best way to reach you so we can assist.”

C3. HVAC templates (HVAC-*)
HVAC-01 Positive
“Thank you for the review. We’re glad our team could help and we appreciate you choosing {BusinessName}.”

HVAC-02 Neutral
“Thanks for the feedback—we appreciate you taking the time to share it.”

HVAC-03 Mild negative (schedule/communication)
“Thank you for letting us know. We’re sorry for the frustration and would like to make this right. Please contact {ManagerNameOrRole} at {ContactPhone} or {ContactEmail} so we can follow up.”

HVAC-04 Strong negative (quality complaint)
“We’re sorry to hear this. We take service concerns seriously and want to help. Please contact {ContactEmail} (or {ContactPhone}) with the best way to reach you so we can review what happened and work toward a resolution.”

HVAC-05 Alleged damage (no admission)
“Thank you for bringing this to our attention. We’re concerned to hear this and want to look into it promptly. Please contact {ManagerNameOrRole} at {ContactPhone} or {ContactEmail} so we can gather details and follow up directly.”

HVAC-06 Safety allegation (gas leak/CO) (manual review recommended)
“We take safety concerns extremely seriously. Please contact us immediately at {ContactPhone} so we can follow up directly. For privacy and safety reasons, we can’t address details here.”

D) Implementation notes (how to use safely)
- Enforce detectors pre-generation (to select safe template/response mode) and pre-post (final gate).
- When escalation_level is Legal/PHI/Safety/Privacy: post_status must remain blocked_manual_review until a human explicitly clears.
- Always log: review_text_hash, detected_risk_flags, escalation_level, response_mode, approver_id, timestamps, and final_response_text.
- If uncertain: default to shorter response + offline CTA + no specifics.

End of v3.0 pack.