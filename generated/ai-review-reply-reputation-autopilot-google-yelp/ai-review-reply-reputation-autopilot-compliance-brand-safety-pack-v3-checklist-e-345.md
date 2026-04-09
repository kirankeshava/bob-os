# AI Review Reply & Reputation Autopilot — Compliance & Brand-Safety Pack v3 (Checklist + Escalation Playbook + Approved Templates: Dentist/Med Spa/HVAC)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:26:50.868Z

---

AI Review Reply & Reputation Autopilot (Google/Yelp)
Compliance & Brand-Safety Pack v3
Customer legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/Contact: agent_bob_replit+review-bot@agentmail.to

1) PURPOSE & SCOPE
This pack defines: (a) what responses are allowed to be generated/posted, (b) when negative reviews must escalate, (c) what is prohibited by platform policy and brand safety (including PHI/HIPAA-adjacent handling), and (d) required audit trail evidence. It applies to Google Business Profile (GBP) and Yelp review responses across Dentist, Med Spa, and HVAC.

2) PLATFORM POLICY ALIGNMENT (GOOGLE VS YELP — TESTABLE RULES)
2.1 Universal (GBP + Yelp)
- No incentives/discounts/compensation for reviews; no “we’ll give you X if you update/remove your review.”
- No review gating (“contact us first before leaving a review”).
- No doxxing: never include customer personal data (full name, address, phone, appointment time, invoice #) unless the reviewer already posted it AND it is still avoided in our response.
- No retaliation/threats; no argumentative back-and-forth.
- No admissions of liability (“it was our fault,” “we caused damage,” “we committed malpractice”).
- No PHI confirmation: do not confirm someone is/was a patient or disclose any treatment/visit specifics.
- No medical outcome guarantees or efficacy promises.

2.2 Yelp-specific sensitivities
- Do not mention Yelp moderation/enforcement actions (“Yelp will remove this,” “we reported you to Yelp”).
- Do not accuse reviewer of lying or being a competitor as a statement of fact; if suspected fake, use neutral language and invite offline contact.
- Do not solicit review edits in exchange for resolution.

2.3 Google Business Profile notes
- Keep responses concise, professional, and relevant; avoid promotional CTA beyond offline resolution.

3) BRAND-SAFETY CHECKLIST v3 (TICK-BOX)
Reviewer/Approver must confirm ALL items before posting.

A. Identity/Privacy/HIPAA
[ ] Response does NOT confirm the reviewer is/was a patient/client/customer (no “your visit,” “your appointment,” “your treatment,” “your chart/records,” “we reviewed your file”).
[ ] Response does NOT reference PHI or specifics (procedure names tied to an individual, dates/times, clinician names tied to the case, prescriptions, outcomes).
[ ] If reviewer included details, response still stays generic and invites offline contact.

B. Liability/Legal
[ ] No admission of fault/liability. Use neutral phrasing: “We’re sorry to hear you’re disappointed” rather than “We made a mistake.”
[ ] If legal threat keywords present (attorney/lawyer/lawsuit/sue/legal action/demand letter), response is set to MANUAL-ONLY HOLD and escalated to Legal; do not post automatically.

C. Medical/Clinical Claims (Dentist/Med Spa)
[ ] No guarantees (“results guaranteed,” “permanent,” “100%,” “cure”).
[ ] No medical advice. Provide offline channel only.

D. Incentives/Solicitation
[ ] No discounts/freebies/credits offered for reviews.
[ ] No “contact us before reviewing.”

E. Harassment/Discrimination/Safety
[ ] If threats, hate speech, discrimination allegations, safety incidents, injury/damage claims: escalate appropriately; keep response calm and minimal; invite offline contact.

F. Tone & Content Quality
[ ] Non-inflammatory, professional, empathetic.
[ ] No arguing facts; no blaming the customer.
[ ] Mandatory offline-resolution CTA included (email/phone placeholder allowed).
[ ] No competitor disparagement.

G. Platform formatting
[ ] No mention of internal policies or enforcement (“we will ban you,” “we will get this removed”).
[ ] No request to remove the review.

4) ESCALATION PLAYBOOK v3 (SCENARIOS, SLAs, DO-NOT-POST)

Escalation Levels
- L0: Auto-reply allowed (positive/neutral/mild negative with no risk flags).
- L1: Ops review required (service quality complaints, scheduling, staff rudeness without threats/PHI).
- L2: Manager/Owner urgent (safety incident, injury/damage allegation, discrimination claim, repeated severe complaints).
- L3: Legal same-day + MANUAL-ONLY HOLD (legal threat keywords, demand letter, “my attorney,” “I’m suing”).
- L4: PHI/HIPAA-sensitive + MANUAL-ONLY HOLD (review mentions medical details; any model attempt to confirm records/visit/chart triggers hold).

Routing SLAs
- L1: Ops Manager within 24h.
- L2: Owner/GM within 4h (business hours).
- L3: Legal same-day; no posting until cleared.
- L4: Compliance/Owner within 4h; post only a fully generic response if approved.

DO-NOT-POST Conditions (always block + manual review)
- Any PHI confirmation language (e.g., “we reviewed your chart/records,” “during your visit on…”)
- Legal threats (attorney/lawsuit/sue)
- Active investigation language (“OSHA,” “board complaint,” “police report”)—route L2/L3 depending on content
- Threats/harassment with credible safety risk

Evidence Collection (internal)
- Billing dispute: invoice, payment records, call logs, service agreement.
- Service failure: job notes, technician report, before/after photos (HVAC), appointment logs.
- Injury/damage: incident report, photos, timeline, witness statements; do not admit liability.
- Discrimination: staff schedules, CCTV if applicable, written statements.
- PHI: do not retrieve or reference patient records in public reply; document internal case ID only.

Recommended Response Posture by Scenario
A) Billing/Price dispute (L1)
- Acknowledge frustration, invite offline, avoid confirming specifics.
- Never state “you were charged X” unless customer already posted it AND you can verify; still prefer generic.

B) Service quality complaint (L1)
- Apologize for experience (not fault), invite offline, commit to learn.

C) Injury/damage allegation (L2)
- Express concern, invite immediate offline contact, state you want to understand; no liability admission.

D) Discrimination claim (L2)
- Take seriously, invite offline to investigate, state commitment to respectful service; avoid arguing.

E) Suspected fake/competitor review (L1)
- Neutral: “We can’t locate this experience based on the details provided. Please contact us…” No accusations.

F) Legal threat (L3 HOLD)
- If anything is posted (only if Legal approves): minimal, polite, offline contact; no discussion.

G) PHI/clinical details (L4 HOLD)
- If posted after approval: generic privacy-respecting message; do not acknowledge they are a patient.

5) REQUIRED TEMPLATE SAFETY FILTERS (ENGINEERING RULES)
Hard blocks (must prevent auto-post; set post_status=blocked_manual_review)
- PHI confirmation phrases: “chart,” “records,” “file,” “your visit,” “your appointment,” “we reviewed,” “treatment plan,” “procedure we performed,” “as your provider,” “as your dentist.”
- Legal threat phrases: “attorney,” “lawyer,” “lawsuit,” “sue,” “legal action,” “demand letter,” “court.”
- Incentive phrases: “discount,” “coupon,” “free,” “gift card,” “refund if you change your review.”

Soft blocks (allow draft but require human approval)
- Injury/damage, discrimination claims, harassment, extortion (“I’ll post this everywhere”).
- Competitor/fake-review suspicion.

Mandatory elements in any posted response
- Empathy line + neutral stance.
- Offline CTA (phone/email) without incentives.
- No personal data; no specifics.

6) APPROVED RESPONSE TEMPLATES v3
Notes:
- Replace [BUSINESS_NAME], [SUPPORT_EMAIL], [PHONE], [SIGN_OFF_NAME/TEAM].
- Allowed variables: BUSINESS_NAME, SUPPORT_EMAIL (agent_bob_replit+review-bot@agentmail.to), PHONE, SIGN_OFF_NAME.
- Banned substitutions: customer name, appointment date/time, clinician name tied to the reviewer, invoice number, treatment details.
- Yelp/GBP: same wording generally safe; do not mention platform enforcement.

6.1 DENTIST (6 templates)
D1 Positive
“Thank you for the kind words and for taking the time to share your experience. We’re glad to hear you had a great visit with our team. If there’s ever anything we can do to help, please reach us at [SUPPORT_EMAIL]. — [BUSINESS_NAME]”

D2 Neutral/Short
“Thank you for your feedback. We appreciate you taking the time to share it. If you’d like to tell us more, please contact us at [SUPPORT_EMAIL] so we can help. — [BUSINESS_NAME]”

D3 Mild Negative (service/frustration)
“Thank you for the feedback, and we’re sorry to hear you left disappointed. We’d like to understand what happened and see how we can make things right. Please contact our team at [SUPPORT_EMAIL]. — [BUSINESS_NAME]”

D4 Strong Negative (non-legal, non-PHI)
“We’re sorry to hear this and appreciate you raising the concern. We take feedback seriously and would like to look into it directly. Please reach us at [SUPPORT_EMAIL] so we can follow up offline. — [BUSINESS_NAME]”

D5 PHI/Clinical-details mentioned by reviewer (MANUAL-ONLY HOLD default; if approved to post)
“Thank you for your message. To protect everyone’s privacy, we can’t discuss details here. We’d like to connect and help offline—please email [SUPPORT_EMAIL] and a manager will follow up. — [BUSINESS_NAME]”

D6 Suspected Fake/Unmatched (no accusation)
“Thank you for the feedback. We can’t identify the situation based on what was shared here, but we want to help. Please contact us at [SUPPORT_EMAIL] so we can look into this offline. — [BUSINESS_NAME]”

6.2 MED SPA (6 templates)
M1 Positive
“Thank you for the wonderful review. We’re glad you enjoyed your experience with our team. If you ever have questions or need assistance, please contact us at [SUPPORT_EMAIL]. — [BUSINESS_NAME]”

M2 Neutral
“Thanks for taking the time to leave feedback. We appreciate it and would be happy to hear more—please reach out at [SUPPORT_EMAIL]. — [BUSINESS_NAME]”

M3 Mild Negative (scheduling/wait)
“Thank you for sharing this, and we’re sorry for the frustration. We’re always working to improve the experience and would like to learn more. Please email us at [SUPPORT_EMAIL] so we can follow up. — [BUSINESS_NAME]”

M4 Strong Negative (service quality)
“We’re sorry to hear you’re unhappy. We take concerns seriously and would like to address this directly. Please contact [SUPPORT_EMAIL] so we can connect offline. — [BUSINESS_NAME]”

M5 Medical outcome expectations (no guarantees)
“Thank you for the feedback. We understand results and expectations can vary, and we’d like to learn more about your concerns. Please contact us at [SUPPORT_EMAIL] so we can follow up privately. — [BUSINESS_NAME]”

M6 Suspected fake/competitor (neutral)
“Thank you for your message. We’re unable to confirm the situation from the details shared here, but we want to help. Please email [SUPPORT_EMAIL] so we can look into it offline. — [BUSINESS_NAME]”

6.3 HVAC (6 templates)
H1 Positive
“Thank you for the great review. We appreciate the opportunity to help and we’re glad you had a good experience with our team. If you need anything else, contact us at [SUPPORT_EMAIL]. — [BUSINESS_NAME]”

H2 Neutral
“Thanks for the feedback. We appreciate you taking the time to share it. Please reach us at [SUPPORT_EMAIL] if you’d like a manager to follow up. — [BUSINESS_NAME]”

H3 Mild Negative (timing/communication)
“Thank you for sharing this, and we’re sorry for the inconvenience. We’d like to learn more and improve. Please contact us at [SUPPORT_EMAIL] so we can follow up offline. — [BUSINESS_NAME]”

H4 Strong Negative (work quality) (no liability admission)
“We’re sorry to hear you’re dissatisfied. We take this seriously and want to understand what happened. Please email [SUPPORT_EMAIL] and we’ll have a manager reach out to address this offline. — [BUSINESS_NAME]”

H5 Damage allegation (L2; if approved to post)
“We’re concerned to hear this and would like to look into it right away. Please contact us at [SUPPORT_EMAIL] so we can connect offline and gather details. — [BUSINESS_NAME]”

H6 Suspected fake/unmatched
“Thank you for the feedback. We can’t confirm the details from this post, but we want to help. Please contact us at [SUPPORT_EMAIL] so we can investigate offline. — [BUSINESS_NAME]”

7) AUDIT TRAIL — REQUIRED FIELDS (MINIMUM)
Every review must have immutable logs:
- review_source (GBP|Yelp), review_id, business_id/location_id
- review_text_hash
- detected_risk_flags[] (e.g., PHI_RISK, LEGAL_THREAT, INCENTIVE, COMPETITOR_MENTION, DAMAGE_ALLEGATION)
- escalation_level (L0-L4) + hold_reason (nullable)
- response_mode (auto_post|needs_approval|blocked_manual_review)
- draft_version, prompt_version/model_version, detector_version
- human_approver_id, approval_timestamp (if approved)
- posted_timestamp, post_status (posted|failed|blocked_manual_review) + error_code
- final_response_text

8) QA EXIT CRITERIA (GO/NO-GO)
GO only if:
- Detectors: unit tests passing for PHI confirmation + legal threat + incentives + competitor disparagement rules.
- Posting gates: any blocked_manual_review cannot post via API or UI.
- Logging: all required fields/events present for 100% of reviewed cases.
- Reporting: weekly KPIs reconcile (approved vs posted vs blocked) with zero mismatches in test set.

9) CUSTOMER-FACING SAFETY STATEMENT (OPTIONAL SNIPPET)
“We respond to reviews with privacy-first, brand-safe messaging and route sensitive issues to a human. We never offer incentives for reviews and we do not discuss private details in public replies. For support, contact us at agent_bob_replit+review-bot@agentmail.to or learn more at https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1.”