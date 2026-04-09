# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates v2.1 (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:37:56.610Z

---

Business legitimacy reference (share with customers / stakeholders)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

============================================================
A) BRAND-SAFETY & PLATFORM COMPLIANCE CHECKLIST v2.1 (Tick-box)
============================================================
Purpose: Ensure every drafted response is brand-safe, non-inflammatory, avoids admissions of liability, avoids medical/privacy violations, and aligns with Google Business Profile (GBP) + Yelp review response expectations.

A1. Universal “MUST HAVE” (all platforms)
[ ] Polite, calm tone; no sarcasm, no blame, no arguing.
[ ] No admission of fault/liability (e.g., “we messed up”, “our mistake”, “we caused”).
[ ] No confirmation of private relationship or appointment/visit (“we saw you”, “your visit last Tuesday”).
[ ] No personal data (names of staff beyond first name if already public in the review; never patient/client name; no phone/address/email of reviewer).
[ ] Offline CTA included for any neutral/negative review (invite to contact privately).
[ ] No incentives/discounts offered for reviews or for changing/removing a review.
[ ] No mention of policy enforcement or removal promises (“we’ll have Yelp/Google remove this”).
[ ] No competitor disparagement or comparisons.
[ ] No threats, retaliation, or shaming.
[ ] Avoids “absolute” guarantees (especially medical outcomes).
[ ] If the reviewer alleges illegal behavior, injury, discrimination, or safety risk: escalate; keep response minimal and offline.

A2. Hard-blocked phrases (do not output; trigger manual-only hold)
Privacy/PHI confirmation (HIPAA-adjacent)
- Block if response contains: “your chart”, “your records”, “your file”, “your visit”, “your appointment”, “we reviewed your case”, “we looked up your account”, “as your provider”, “as your dentist”, “as your nurse”, “treatment plan details”, or any confirmation they are a patient/client.
Legal threats / litigation
- Block if review contains or response would mention: “attorney”, “lawyer”, “lawsuit”, “sue”, “served”, “court”, “legal action”, “demand letter”. Required mode: blocked_manual_review + escalation_level=Legal.
Incentives / review gating
- Block: “discount”, “coupon”, “free”, “gift card”, “refund if you remove”, “in exchange for”, “we’ll make it right if you update your review”.
Doxxing / personal attacks
- Block: posting staff last names not already publicly known; any address/phone/email; any threats.

A3. Required safe alternatives (approved language patterns)
- Liability-safe: “We’re sorry to hear you were disappointed.” / “We take feedback seriously.”
- Privacy-safe: “We can’t discuss details publicly, but we’d like to learn more.” (Do not imply they are a customer/patient.)
- Offline CTA: “Please contact our office/team at [BUSINESS_PHONE] or [BUSINESS_EMAIL] so we can help.”
- Suspected fake: “We can’t find a record matching this experience. Please contact us directly with details so we can look into it.” (Do not say “you were never a patient.”)

A4. Vertical-specific prohibitions
Dentist + Med Spa
[ ] No outcome guarantees: “pain-free”, “permanent”, “scar-free”, “100%”, “guaranteed results”, “cured”.
[ ] No medical advice in public replies.
[ ] No mention of diagnosis, procedures performed, medications, or confirmation of treatment.
HVAC
[ ] No admission of property damage or negligence (“we damaged”, “our tech broke”).
[ ] Avoid quoting pricing unless reviewer already stated it AND business has verified internally.

A5. Yelp vs Google nuance (testable acceptance criteria)
- Yelp: Do not reference Yelp moderation; do not ask for review edits; do not imply you can remove reviews.
- GBP: Same principles; keep responses concise and non-promotional; avoid soliciting incentives.

============================================================
B) ESCALATION PLAYBOOK v2.1 (Common negative scenarios)
============================================================
Escalation levels
- L0: Auto-reply allowed (positive/neutral/mild negative)
- L1: Service recovery (strong negative; requires manager visibility)
- L2: Sensitive (billing disputes, alleged discrimination/harassment, suspected fake)
- L3: Safety/Legal/Privacy (injury, threats, PHI/HIPAA, litigation) → MANUAL-ONLY HOLD

B1. Global DO-NOT-POST conditions (must hold)
- Any PHI/privacy confirmation risk (healthcare contexts) → hold
- Any legal threat/litigation language → hold, escalate Legal
- Any threat of violence, harassment, hate speech → hold, escalate Owner/GM
- Any alleged safety incident/injury/property damage with claim language → hold, escalate Owner/GM + Ops

B2. Routing SLAs (internal)
- L3 Safety/Legal/Privacy: Owner/GM within 4 hours; Legal same business day if litigation threat.
- L2 Sensitive: Billing/Ops within 24 hours.
- L1 Service recovery: Location manager within 24 hours.

B3. Scenario guidance + evidence checklist
1) Billing dispute / “overcharged” (L2)
- Public reply: acknowledge frustration, invite offline, no pricing debate.
- Collect: invoice, job notes, call logs, timestamps, any written estimates.
2) Service quality complaint (L1)
- Public reply: apology for experience (not liability), invite offline, commit to listening.
- Collect: staff schedule, service notes, photos (HVAC), appointment history (internally only).
3) Alleged injury / damage (L3)
- Public reply: minimal, empathetic, offline, no admissions.
- Collect: incident report, photos, technician notes, CCTV if applicable.
4) HIPAA/PHI mention (L3)
- Public reply: privacy-safe, do not confirm relationship.
- Collect: internal check only; do not respond with specifics.
5) Discrimination/harassment claim (L3)
- Public reply: take seriously, invite offline, no defensiveness.
- Collect: statements, footage, HR notes.
6) Suspected fake/competitor (L2)
- Public reply: cannot locate matching record, invite offline to verify details.
- Collect: CRM search, schedule logs, name variants.

============================================================
C) APPROVED RESPONSE TEMPLATES v2.1 (Per vertical; Google/Yelp safe)
============================================================
Rules for all templates
- Allowed variables: [BUSINESS_NAME], [BUSINESS_PHONE], [BUSINESS_EMAIL], [SIGNATURE_NAME/ROLE] (generic), optional [GENERAL_SERVICE_CATEGORY] (e.g., “heating repair”).
- Never include: reviewer name (unless already present and safe), staff last names, appointment dates, procedure names, diagnosis, pricing unless verified.
- Always include offline CTA for neutral/negative.

-----------------------------
C1) DENTIST (6 templates)
-----------------------------
DENT-01 Positive (L0)
“Thank you for the kind words. We’re glad you had a great experience with our team at [BUSINESS_NAME]. We appreciate you taking the time to share your feedback.”

DENT-02 Neutral/brief (L0)
“Thanks for sharing your feedback. If there’s anything we can do to improve your experience, please reach us at [BUSINESS_PHONE] or [BUSINESS_EMAIL].”

DENT-03 Mild negative (L1)
“We’re sorry to hear you were disappointed. We take feedback seriously and would like to learn more so we can improve. Please contact [BUSINESS_NAME] at [BUSINESS_PHONE] or [BUSINESS_EMAIL].”

DENT-04 Strong negative / service recovery (L1/L2)
“Thank you for bringing this to our attention. We can’t address details in a public forum, but we’d like to understand what happened and see how we can help. Please reach our office at [BUSINESS_PHONE] or [BUSINESS_EMAIL].”

DENT-05 PHI-sensitive / medical specifics mentioned (L3 HOLD)
“Thank you for your message. To protect privacy, we can’t discuss any details here. Please contact [BUSINESS_NAME] directly at [BUSINESS_PHONE] or [BUSINESS_EMAIL] so our team can assist.”

DENT-06 Suspected fake / no record (L2)
“Thank you for the feedback. We’re not able to find a record that matches the experience described. Please contact [BUSINESS_NAME] at [BUSINESS_PHONE] or [BUSINESS_EMAIL] with any details you’re comfortable sharing so we can look into it.”

-----------------------------
C2) MED SPA (6 templates)
-----------------------------
MSPA-01 Positive (L0)
“Thank you for the wonderful review. We’re happy to hear you enjoyed your experience at [BUSINESS_NAME]. We appreciate your support.”

MSPA-02 Neutral (L0)
“Thanks for taking the time to share your thoughts. If you’d like to provide more feedback, please reach us at [BUSINESS_PHONE] or [BUSINESS_EMAIL].”

MSPA-03 Mild negative (L1)
“We’re sorry to hear your visit didn’t meet expectations. We’d like to learn more and address your concerns. Please contact [BUSINESS_NAME] at [BUSINESS_PHONE] or [BUSINESS_EMAIL].”

MSPA-04 Strong negative / dissatisfaction with results (L2)
“Thank you for letting us know. We can’t discuss details publicly, but we want to understand your concerns and help where we can. Please contact [BUSINESS_NAME] at [BUSINESS_PHONE] or [BUSINESS_EMAIL].”

MSPA-05 Medical claim / adverse reaction mentioned (L3 HOLD)
“Thank you for reaching out. For privacy and safety, we can’t discuss this publicly. Please contact [BUSINESS_NAME] at [BUSINESS_PHONE] or [BUSINESS_EMAIL] as soon as possible so our team can assist.”

MSPA-06 Suspected fake / competitor (L2)
“Thank you for the feedback. We’re not able to verify the experience described from the information provided. Please contact [BUSINESS_NAME] at [BUSINESS_PHONE] or [BUSINESS_EMAIL] so we can look into it.”

-----------------------------
C3) HVAC (6 templates)
-----------------------------
HVAC-01 Positive (L0)
“Thanks for the great review. We’re glad our team at [BUSINESS_NAME] could help. We appreciate you choosing us.”

HVAC-02 Neutral (L0)
“Thank you for your feedback. If there’s anything we can do to improve, please contact [BUSINESS_NAME] at [BUSINESS_PHONE] or [BUSINESS_EMAIL].”

HVAC-03 Mild negative (L1)
“We’re sorry to hear this wasn’t the experience you expected. We’d like to learn more and address your concerns. Please reach us at [BUSINESS_PHONE] or [BUSINESS_EMAIL].”

HVAC-04 Strong negative / missed appointment / delay (L1)
“Thank you for bringing this to our attention. We aim to be on time and communicate clearly, and we’re sorry to hear that didn’t happen here. Please contact [BUSINESS_NAME] at [BUSINESS_PHONE] or [BUSINESS_EMAIL] so we can follow up.”

HVAC-05 Alleged damage / safety risk (L3 HOLD)
“Thank you for letting us know. We take concerns like this seriously. We can’t address details publicly, but we’d like to review what happened. Please contact [BUSINESS_NAME] at [BUSINESS_PHONE] or [BUSINESS_EMAIL] so we can assist.”

HVAC-06 Suspected fake / no matching job (L2)
“Thank you for the feedback. We’re not able to find a job that matches the experience described. Please contact [BUSINESS_NAME] at [BUSINESS_PHONE] or [BUSINESS_EMAIL] with any details so we can look into it.”

============================================================
D) AUDIT TRAIL + WEEKLY REPORTING ACCEPTANCE CRITERIA (for engineering)
============================================================
D1. Required log fields (minimum)
- review_source (Google|Yelp)
- review_id, business_id/location_id
- review_text_hash
- detected_risk_flags[] (e.g., PHI_RISK, LEGAL_THREAT, INCENTIVE_LANGUAGE, HARASSMENT)
- escalation_level (L0-L3)
- response_mode (auto_draft|requires_approval|blocked_manual_review)
- draft_version + prompt/model version identifiers
- human_approver_id (nullable), approval_timestamp (nullable)
- post_status (drafted|approved|blocked_manual_review|posted|post_failed)
- posted_timestamp (nullable), error_code (nullable)
- final_response_text
- hold_reason (nullable), blocked_timestamp (nullable), unblocker_id (nullable)

D2. Events required
- draft_created
- flagged (with flags)
- approval_requested
- approved OR blocked_manual_review
- posted OR post_failed

D3. Weekly KPI reconciliation rules
- Responses drafted count = #draft_created
- Responses approved count = #approved
- Responses posted count = #posted
- Responses blocked/held count = #blocked_manual_review
- Response rate must be computed from posted (not drafted) and broken out by platform.
- Median/avg response time must exclude blocked_manual_review unless/until unblocked and posted.

End of v2.1 pack.
