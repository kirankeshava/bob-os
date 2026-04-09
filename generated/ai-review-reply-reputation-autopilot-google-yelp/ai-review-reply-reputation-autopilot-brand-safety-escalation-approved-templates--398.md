# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates (v3.0)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:07:50.860Z

---

OVERVIEW
This document is the operational compliance layer for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). It is intended to be enforced via (1) prompt constraints, (2) pre-generation detectors (to choose a safe template/response mode), and (3) pre-post gates (to block/hold unsafe output). It supports safe operations across Dentist, Med Spa, and HVAC.

Public legitimacy link (share with customers as needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Business contact email for escalations/support: agent_bob_replit+review-bot@agentmail.to

1) BRAND-SAFETY CHECKLIST v3 (tick-box)
Use this checklist before approving any response for posting. If any “HOLD/BLOCK” item is true, do not post; escalate per Playbook.

A. Universal (Google + Yelp) REQUIRED ELEMENTS (must be true)
[ ] Tone is calm, professional, non-argumentative, and non-sarcastic
[ ] Response thanks the reviewer (even if negative) without patronizing language
[ ] Response avoids blaming the reviewer or staff-shaming
[ ] Response includes an offline CTA (take it offline) for any neutral/negative review
[ ] Response does not include personal data (phone/address/email of reviewer) and does not repeat doxxing content
[ ] Response uses generic references ("our team", "our office") instead of individual staff names unless already public and explicitly approved by business
[ ] Response does not include operational promises that cannot be verified (refunds, free services, guaranteed outcomes)

B. UNIVERSAL PROHIBITIONS (HARD BLOCK if present)
[ ] PHI / privacy confirmation: Any language implying confirmation of a patient/customer relationship (especially dental/med spa). BLOCK if response references: "your visit", "your appointment", "your treatment", "your chart/records", "we reviewed your file" unless phrased in a purely hypothetical/general way AND does not confirm the person was a patient.
[ ] Medical guarantees/claims: BLOCK if response implies outcomes or certainty: "guaranteed", "cure", "permanent", "100%", "clinically proven for you", before/after claims, or diagnosing.
[ ] Liability admission: BLOCK if response admits fault in a way that creates liability: "we caused", "we damaged", "it was our mistake" (Use neutral regret language instead.)
[ ] Legal threats or litigation: BLOCK + manual-only hold if review contains (or response references) "attorney", "lawyer", "lawsuit", "sue", "legal action", "court", "demand letter".
[ ] Harassment/hate/discrimination: HOLD for manual review if reviewer uses slurs, threats, or alleges discrimination; do not engage on details publicly.
[ ] Incentives/review gating: BLOCK if response suggests discounts, freebies, gift cards, or preferential treatment in exchange for reviews, or asks only happy customers to review.
[ ] Competitor disparagement: BLOCK if response insults or accuses competitors or invites comparisons.
[ ] Confidential internal info: BLOCK if response reveals staff schedules, internal investigations, CCTV details, or identifies employees involved.

C. PLATFORM-SPECIFIC RULES
Google Business Profile (GBP)
[ ] Do not ask for removal or claim Google will remove the review
[ ] Do not offer compensation in exchange for review changes
[ ] Avoid sharing contact details that look like solicitation spam; use a single official channel (business phone/site) if provided by client; otherwise generic “please contact us directly”

Yelp
[ ] Do not imply Yelp will remove a review or that you can “report them to Yelp” as retaliation
[ ] Do not ask the reviewer to update or change their Yelp review
[ ] Avoid promotional language and incentives; keep it service-recovery only

D. REQUIRED OFFLINE CTA SAFE PATTERNS (choose one)
- “We’d like to learn more and help. Please contact us directly so we can look into this and make it right.”
- “We can’t address specifics here, but we’d appreciate the chance to follow up privately.”
- “Please reach out to our office directly and ask for the manager so we can review the details.”

E. HALLUCINATION CONTROL RULES (must be true)
[ ] Response does not invent facts: dates, appointment details, invoices, staff actions, policies, warranties, diagnoses, or investigations
[ ] Response does not claim to have reviewed records, footage, charts, call logs, or messages unless that has actually happened and is safe to disclose (generally avoid)
[ ] Response does not cite laws/regulations (HIPAA, OSHA) in a way that appears like legal advice; keep it general

2) ESCALATION PLAYBOOK v3 (scenarios, SLAs, do-not-post)
Escalation levels:
- L0: Safe to auto-draft + post after standard approval
- L1 Ops: Needs manager review within 24h (service quality, scheduling, mild disputes)
- L2 Billing: Billing/charge dispute; billing lead review within 24h
- L3 Safety: Alleged injury, safety hazard, property damage; owner/GM review <4h
- L4 Legal: Legal threats, attorney, lawsuit; same-day legal review; MANUAL-ONLY HOLD
- L5 Privacy/PHI: Mentions medical details/records/visit confirmation; MANUAL-ONLY HOLD; privacy officer/owner review <4h

DO NOT POST (hard stop) conditions:
- Any PHI confirmation risk (even if reviewer disclosed their own condition)
- Any litigation/legal threat language
- Any request to take action that violates platform rules (incentives, gating)
- Any credible safety allegation requiring investigation
- Any reviewer doxxing: respond minimally without repeating personal info; likely hold

Scenario guidance (public response goal + internal action):
A) Billing dispute (L2)
Public: acknowledge frustration; no debate on numbers; invite offline contact.
Internal: pull invoice, authorization, scope, any signed approvals; document outcome.

B) Service quality / rude staff (L1)
Public: apologize for experience without admitting fault; invite private follow-up.
Internal: identify shift/team; coach; log corrective action.

C) Alleged damage/injury (L3)
Public: express concern; do not admit liability; request offline contact; indicate you take safety seriously.
Internal: incident report; photos; technician notes; timeline; insurance/claims workflow.

D) Discrimination allegation / harassment (L3 or L4 depending on threat)
Public: short, serious, non-defensive; invite offline escalation to owner.
Internal: preserve evidence; interview staff; consult counsel if threat.

E) PHI/medical details mentioned (L5)
Public: do not confirm they are a patient; use generic language; invite offline contact.
Internal: privacy review; confirm identity before any discussion; document.

F) Suspected fake review / not a customer (L1; can become L4 if defamation)
Public: polite; state you can’t find a record without implying records review; invite them to contact to verify.
Internal: check CRM cautiously; report to platform if truly fraudulent (outside the public response).

3) APPROVED RESPONSE TEMPLATE LIBRARY v3
Rules for templates:
- Allowed variables: {BusinessName}, {TeamName} (optional), {GenericContactInstruction}
- Banned variables: reviewer name (unless explicitly provided and approved), staff names, appointment dates, treatment details, invoice totals, diagnoses, addresses, phone numbers of reviewer
- All negatives must include offline CTA.

3.1 Dentist Templates (Google/Yelp)
DENT-01 Positive (L0)
“Thank you for the kind words. We appreciate you taking the time to share your experience with {BusinessName}. We’re glad our team could help, and we look forward to seeing you again.”

DENT-02 Neutral/short (L0)
“Thanks for your feedback. If there’s anything we can do to improve your experience, we’d appreciate the chance to learn more. Please contact us directly so we can follow up.”

DENT-03 Mild negative (L1)
“Thank you for letting us know. We’re sorry to hear this didn’t meet expectations. We can’t address specifics here, but we’d like to understand what happened and help—please reach out to our office directly so we can follow up.”

DENT-04 Strong negative, no PHI confirmation (L5 if PHI cues; otherwise L1)
“We’re concerned to hear this and would like to look into it. To protect privacy, we can’t discuss details here, but we’d appreciate the opportunity to speak with you directly and work toward a resolution. Please contact our office and ask for the manager.”

DENT-05 Suspected fake / not a patient (L1)
“Thank you for the note. We take feedback seriously, but we’re unable to confirm details in a public forum. If you believe this relates to an interaction with {BusinessName}, please contact us directly so we can understand and address your concerns.”

DENT-06 Legal threat in review (L4 MANUAL-ONLY HOLD)
(Only allowed output is a HOLD note to internal team; do not post.)
Internal draft: “HOLD—Legal threat detected. Do not post publicly. Escalate to Legal same-day with review text + timestamps.”

3.2 Med Spa Templates (Google/Yelp)
MED-01 Positive (L0)
“Thank you for the review. We appreciate you choosing {BusinessName} and we’re glad you had a great experience. Our team looks forward to welcoming you back.”

MED-02 Neutral (L0)
“Thanks for your feedback. We’re always working to improve. If you’re open to it, please contact us directly so we can learn more and follow up.”

MED-03 Mild negative (L1)
“We’re sorry to hear this wasn’t what you expected. We can’t discuss specifics here, but we’d like to understand what happened and help. Please reach out to us directly so we can follow up privately.”

MED-04 Strong negative / outcome expectations (L1; escalate if safety) 
“Thank you for sharing your concern. We understand how important results and comfort are. We can’t address details publicly, but we’d appreciate the chance to speak with you directly and review next steps. Please contact our team so we can follow up.”

MED-05 PHI-sensitive (L5)
“To protect privacy, we can’t comment on individual situations here. If you have concerns, we’d like to help—please contact {BusinessName} directly so we can follow up privately.”

MED-06 Suspected fake (L1)
“We take feedback seriously, and we’d like to understand more. We can’t confirm details publicly, but if you believe this relates to an interaction with {BusinessName}, please contact us directly so we can follow up.”

3.3 HVAC Templates (Google/Yelp)
HVAC-01 Positive (L0)
“Thank you for the review and for choosing {BusinessName}. We’re glad our team could help and we appreciate your support.”

HVAC-02 Neutral (L0)
“Thanks for the feedback. If there’s anything we can do better, we’d appreciate the opportunity to learn more. Please contact us directly so we can follow up.”

HVAC-03 Mild negative (L1)
“We’re sorry to hear this was frustrating. We’d like to learn more and help resolve it. Please contact us directly so we can review what happened and work toward a solution.”

HVAC-04 Scheduling/no-show (L1)
“Thanks for letting us know. We understand how disruptive scheduling issues can be. Please contact us directly so we can look into what happened and see how we can make it right.”

HVAC-05 Alleged damage (L3)
“We’re concerned to hear this and take it seriously. We can’t review details here, but we’d like to follow up promptly. Please contact us directly and ask for the manager so we can investigate and respond.”

HVAC-06 Suspected fake (L1)
“Thank you for the message. We want to help, but we can’t confirm details publicly. Please contact {BusinessName} directly with any relevant information so we can look into this.”

4) GOOGLE/YELP POLICY ALIGNMENT NOTES (operational)
- Never ask for incentives or offer anything of value in exchange for reviews.
- Never ask only satisfied customers to leave reviews (no gating).
- Never imply you can get reviews removed; avoid “Yelp will remove this” / “Google will take this down.”
- Keep responses focused on service recovery and offline resolution.

5) ENGINEERING-READY SAFETY MICRO-POLICY (translate to detectors + gates)
Pre-generation detectors set response_mode and escalation_level:
- PHI detector: triggers on “chart/records/visit/appointment/treatment/procedure” + medical context => response_mode = template_only_privacy_safe; escalation_level = Privacy/PHI; post_status must be blocked_manual_review if PHI confirmation risk is non-zero.
- Legal detector: triggers on “attorney/lawyer/sue/lawsuit/court/demand letter” => response_mode = hold_manual_only; escalation_level = Legal; post_status = blocked_manual_review.
- Incentive detector: triggers on “discount/free/gift card/coupon/credit” in context of review => block + manual review.
- Competitor detector: triggers on competitor name comparisons/insults => block or force neutral template.

Pre-post gates (last check before API submission):
- If escalation_level in {Legal, Privacy/PHI, Safety} => must not post without explicit approver role.
- If output contains any blocked phrases (liability admission; PHI confirmation) => block.
- Require audit log fields: review_source, review_id, review_text_hash, detected_risk_flags, escalation_level, response_mode, draft_version, approver_id, approval_timestamp, post_status, posted_timestamp (if posted), final_response_text, model/prompt version.

END OF v3.0
This package is designed to keep responses brand-safe, non-inflammatory, and aligned with Google Business Profile and Yelp norms while preventing hallucinated specifics, PHI confirmation, liability admissions, incentives, and legal-risk posting.