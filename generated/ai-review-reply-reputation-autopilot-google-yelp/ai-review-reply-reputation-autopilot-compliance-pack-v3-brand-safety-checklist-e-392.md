# AI Review Reply & Reputation Autopilot — Compliance Pack v3 (Brand-Safety Checklist + Escalation Playbook + Approved Templates: Dentist/Med Spa/HVAC)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:41:32.111Z

---

Business legitimacy reference (include in customer comms as needed):
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

====================================================================
A) BRAND-SAFETY CHECKLIST v3 (Google Business Profile + Yelp)
====================================================================
Purpose: Ensure every drafted/posted response is brand-safe, non-inflammatory, and compliant with platform policies. This is the pre-post QA gate.

A1. Hard prohibitions (FAIL if any present)
1) PHI/HIPAA / personal data confirmation:
   - Do NOT confirm the reviewer is/was a patient/customer/client or reference appointment dates, procedures, chart/records, visit history.
   - Block phrases (examples):
     • “we reviewed your chart/records/visit”
     • “according to your file/medical record”
     • “when you came in on [date]”
     • “our notes show”
     • naming staff + tying them to a specific visit if it implies a patient relationship.
   - Required safe alternative: “We take privacy seriously and can’t discuss details here. Please contact us directly so we can help.”

2) Liability admission or definitive fault (esp. injury/damage):
   - Block phrases (examples):
     • “we made a mistake” “our fault” “we caused” “we are responsible”
     • “we damaged/broke” “we injured you”
   - Safe alternative: acknowledge experience without admission + offline resolution.

3) Medical outcome guarantees/claims (dentist/med spa):
   - Block phrases:
     • “guaranteed results” “permanent” “cure” “risk-free” “100% safe”
   - Safe alternative: “results vary” (if needed) + invite offline.

4) Incentives / review gating / solicitation tied to reviews (Google/Yelp):
   - Block phrases:
     • “discount” “coupon” “free” “gift card” “refund if you delete” “we’ll fix it if you update your review”
   - Safe alternative: “We’d like to make this right—please contact us.” (no mention of changing review)

5) Doxxing / personal attacks / harassment:
   - No threats, no retaliation, no insults.
   - Never publish phone/address of reviewer or staff personal details.

6) Competitor disparagement / accusations:
   - Do not accuse competitors, do not allege fake competitor campaigns in hostile tone.
   - Safe alternative for suspected fake: request offline details + neutral verification request.

7) Legal threats / litigation:
   - Trigger words: “attorney” “lawyer” “lawsuit” “sue” “legal action” “demand letter” “court”
   - Required action: response mode = HOLD (manual-only). Do not post an auto-response.

A2. Required elements (FAIL if missing for most non-trivial reviews)
1) Polite greeting + appreciation (as appropriate).
2) Non-inflammatory acknowledgement of concern.
3) Offline CTA with a single channel (phone/email) and invitation to discuss privately.
4) No mention of internal policy enforcement (“we will have Yelp remove this”).
5) No new facts introduced that are not in the review.

A3. Tone constraints (FAIL if violated)
- Calm, brief, professional.
- No sarcasm, no argument-by-point rebuttal.
- No “you are lying” / “that’s impossible” phrasing.
- Use “we’re sorry to hear…” not “you should have…”

A4. Hallucination control rules (must be enforced in generation)
- If the review lacks specifics, do not invent: dates, services, staff names, prices, outcomes.
- If reviewer claims something severe (injury, discrimination), do not refute publicly; escalate.
- Use uncertainty-safe language: “We’d like to learn more” / “We can’t locate details from this post alone.”

A5. Platform-specific notes (testable)
Google Business Profile:
- OK to invite offline contact; keep it succinct.
- Avoid disclosing private business info.

Yelp:
- Do not mention Yelp policy enforcement or claim you can remove reviews.
- Avoid extended back-and-forth; keep responses short and take offline.

A6. Pre-post gate sequence (operational)
1) Run detectors → apply risk flags.
2) If Legal-threat OR PHI-confirmation risk OR safety incident → HOLD (manual-only) + escalation.
3) Else generate draft using approved template + style rules.
4) Run blocked-phrase filter on draft.
5) Human approval required for: any negative review, any refund/billing, any medical/safety claim, any suspected fake.
6) Post only if approved and not held/blocked.
7) Log all events.

====================================================================
B) ESCALATION PLAYBOOK v3 (Common negative scenarios)
====================================================================
Key concepts:
- Escalation levels:
  L0 = Auto-draft allowed (low risk)
  L1 = Human approval required (standard negatives)
  L2 = Ops/Owner urgent review (safety/service breakdown)
  L3 = Legal/Privacy hold (manual-only; do not post)

B1. Scenario triggers → required action
1) Billing/pricing dispute ("overcharged", "hidden fees")
   - Level: L1
   - Response: acknowledge concern, invite offline billing review, no detailed pricing debate.
   - Route: Billing/Ops within 24h.
   - Evidence: invoice, service notes, calls.

2) Service quality dissatisfaction (rude staff, long wait, poor result without medical claim)
   - Level: L1
   - Response: apologize for experience (not fault), invite offline to resolve.
   - Route: Ops/GM within 24h.

3) Alleged damage/injury/safety incident ("injured", "burned", "broke my…")
   - Level: L2 (or L3 if legal threat)
   - Response mode: usually HOLD for manual review if any injury detail; avoid admissions.
   - Route: Owner/GM <4h; document incident.
   - Evidence: incident report, staff statements, photos (internal), timestamps.
   - Do-not-post if: active investigation or severity unknown.

4) HIPAA/PHI mention ("my records", "my procedure", "my appointment on…")
   - Level: L3
   - Response mode: HOLD (manual-only). If posting is approved by privacy lead, response must be generic and never confirm relationship.
   - Route: Privacy lead/Owner same day.

5) Medical outcome claim (dentist/med spa) ("botched", "infection", "scar", "results")
   - Level: L2 (L3 if legal threat)
   - Response: avoid medical specifics, invite offline clinical follow-up.
   - Route: Clinical lead/Owner <4h.

6) Discrimination/harassment allegations
   - Level: L2
   - Response: take seriously; no debate; invite offline; commit to review internally.
   - Route: Owner/HR same day.

7) Suspected fake review / wrong business
   - Level: L1
   - Response: polite, can’t locate details, invite offline with specifics.
   - Route: Ops within 24h to verify.
   - Never accuse; never disclose customer lists.

8) Legal threat (“sue”, “attorney”, “lawsuit”)
   - Level: L3
   - Response mode: HOLD (manual-only). Do not post.
   - Route: Legal same day.

B2. Internal routing SLAs
- L1: Ops/Billing acknowledgment within 24h.
- L2: Owner/GM within 4h; action plan within 24h.
- L3: Legal/Privacy same day; no posting until cleared.

B3. Do-not-post conditions (absolute)
- Any PHI confirmation risk.
- Any legal threat.
- Any response that names a patient/client or references visit details.
- Any apology that admits liability (“we caused…”).
- Any incentive/discount tied to review changes.

====================================================================
C) APPROVED RESPONSE TEMPLATE LIBRARY v3
====================================================================
Rules for all templates:
- Allowed variables ONLY: {BusinessName}, {ContactEmail}, {ContactPhone}, {City}, {ManagerTitle}
- Never insert staff personal names unless approved and not tied to a specific visit.
- Never insert appointment dates, procedures, invoice numbers, or any “we reviewed your records” language.
- Always include an offline CTA for neutral/negative.

-------------------------
C1) DENTIST TEMPLATES (Google/Yelp)
-------------------------
DENT-01 Positive Praise (L0)
“Thank you for the kind words and for choosing {BusinessName}. We’re glad you had a great experience, and we appreciate you taking the time to share this.”

DENT-02 Neutral/Short (L0)
“Thanks for your feedback. We appreciate you choosing {BusinessName} and will share your note with our team.”

DENT-03 Mild Negative (wait time, front desk) (L1)
“Thank you for the feedback. We’re sorry to hear your visit didn’t meet expectations. We’d like to learn more and see how we can help—please contact us at {ContactPhone} or {ContactEmail}.”

DENT-04 Strong Negative (pain, dissatisfaction) (L2)
“We’re sorry to hear about your experience. We take concerns like this seriously and would like to speak with you directly to understand what happened and discuss next steps. Please contact {ManagerTitle} at {ContactPhone} or {ContactEmail}.”

DENT-05 PHI/Records Mention (HOLD language for manual posting only; default is block) (L3)
“Privacy is very important to us, and we can’t discuss details here. If you’re open to it, please contact us at {ContactPhone} or {ContactEmail} so we can address your concerns directly.”

DENT-06 Suspected Fake/Wrong Office (L1)
“Thank you for posting. We can’t confirm details from this review alone, and we’d like to look into it. Please contact us at {ContactEmail} with any relevant information so we can help.”

-------------------------
C2) MED SPA TEMPLATES (Google/Yelp)
-------------------------
SPA-01 Positive Praise (L0)
“Thank you for your review and for visiting {BusinessName}. We’re glad you had a great experience and appreciate your support.”

SPA-02 Neutral/Short (L0)
“Thanks for the feedback. We appreciate you taking the time to share your experience with {BusinessName}.”

SPA-03 Mild Negative (scheduling, service feel) (L1)
“Thank you for the feedback. We’re sorry to hear this wasn’t what you expected. We’d like to learn more and help—please contact us at {ContactPhone} or {ContactEmail}.”

SPA-04 Strong Negative (results dissatisfaction—no guarantees) (L2)
“We’re sorry to hear you’re unhappy with your experience. We’d like to speak with you directly to better understand your concerns and discuss options. Please reach out to {ManagerTitle} at {ContactPhone} or {ContactEmail}.”

SPA-05 Medical/Safety Concern Mention (HOLD default; manual-only) (L2/L3 depending on wording)
“Thank you for bringing this to our attention. We take safety and quality seriously and would like to speak with you directly as soon as possible. Please contact {ManagerTitle} at {ContactPhone} or {ContactEmail}.”

SPA-06 Suspected Fake/Wrong Business (L1)
“Thanks for your note. We’d like to look into this, but we can’t identify details from this post. Please contact us at {ContactEmail} so we can understand what happened and assist.”

-------------------------
C3) HVAC TEMPLATES (Google/Yelp)
-------------------------
HVAC-01 Positive Praise (L0)
“Thank you for the review and for choosing {BusinessName}. We’re glad we could help, and we appreciate your support.”

HVAC-02 Neutral/Short (L0)
“Thanks for your feedback. We appreciate you taking the time to share your experience with {BusinessName}.”

HVAC-03 Mild Negative (lateness, communication) (L1)
“Thank you for the feedback. We’re sorry to hear about the frustration. We’d like to learn more and make this right—please contact {ManagerTitle} at {ContactPhone} or {ContactEmail}.”

HVAC-04 Pricing/Billing Dispute (L1)
“Thank you for letting us know. We’re sorry for any confusion regarding pricing. We’d like to review this with you directly—please contact us at {ContactPhone} or {ContactEmail} so we can help.”

HVAC-05 Alleged Damage/Safety Issue (L2)
“We’re sorry to hear about this concern. We take issues like this seriously and would like to speak with you directly as soon as possible. Please contact {ManagerTitle} at {ContactPhone} or {ContactEmail}.”

HVAC-06 Suspected Fake/Wrong Company (L1)
“Thank you for posting. We’d like to look into this, but we can’t confirm details from the review alone. Please contact us at {ContactEmail} with any relevant information so we can assist.”

====================================================================
D) ENFORCEMENT RULES (for engineering prompts + filters)
====================================================================
D1. Detectors → flags
- PHI_RISK if review or draft contains: “records”, “chart”, “file”, “HIPAA”, “my appointment”, “my visit”, dates + clinical context.
- LEGAL_THREAT if contains: attorney/lawyer/lawsuit/sue/legal action/court/demand letter.
- INCENTIVE_RISK if contains: discount/coupon/free/gift card/refund for review change.
- LIABILITY_RISK if contains: our fault/we caused/we broke/we damaged.
- COMPETITOR_RISK if contains: competitor names + disparagement language.

D2. Required system behavior
- If LEGAL_THREAT → post_status='blocked_manual_review', escalation_level=Legal, response_mode=HOLD, no auto-post.
- If PHI_RISK and draft includes any confirmation language → hard block + regenerate using PHI-safe template (or HOLD if uncertain).
- If INCENTIVE_RISK → block + regenerate without incentive language.
- If LIABILITY_RISK → block + regenerate to acknowledgement without admission.

D3. Required audit log events
- draft_created, flagged, approved, blocked, posted
- Minimum fields: review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode, draft_version, human_approver_id, approval_timestamp, post_status/error_code, final_response_text, prompt/model version, detector_version, hold_reason (if any).

End of Compliance Pack v3.
