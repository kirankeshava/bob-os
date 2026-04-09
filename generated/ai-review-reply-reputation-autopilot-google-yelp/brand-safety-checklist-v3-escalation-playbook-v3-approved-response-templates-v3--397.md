# Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Response Templates v3 (Dentist/Med Spa/HVAC) — Google Business Profile & Yelp

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:50:37.284Z

---

AI Review Reply & Reputation Autopilot — Brand Safety & Policy Alignment
Version: v3.0 (Launch-ready)
Scope: Google Business Profile (GBP) + Yelp review responses (drafting + posting/approval)

1) Brand-Safety & Compliance Checklist v3 (Tick-box)

A. Universal “Never Do” Prohibitions (GBP + Yelp)
[ ] Do not confirm or imply a reviewer is/was a customer/patient/client (PHI/PII-adjacent). Avoid: “your visit/appointment/procedure,” “your chart/records,” “we reviewed your account.”
[ ] Do not disclose personal data (names of staff beyond first name if business-approved, addresses, phone numbers, appointment times, invoice #s, vehicle plates, etc.).
[ ] Do not admit liability or fault in a way that creates legal exposure. Avoid: “we caused,” “our technician broke,” “we made a mistake that injured.” Use neutral empathy + investigation language.
[ ] Do not argue, retaliate, threaten, shame, or diagnose the reviewer.
[ ] Do not make medical outcome guarantees or claims (“guaranteed results,” “permanent,” “cure,” “100% safe”).
[ ] Do not offer incentives/discounts/free items in exchange for reviews or revisions; no “review gating” (“if you had a good experience…”).
[ ] Do not promise platform enforcement actions (removal, banning, reporting to Yelp/Google) or imply inside access.
[ ] Do not disparage competitors or compare by name.
[ ] Do not encourage contacting via public comments; always route resolution offline.

B. Required Elements in Every Response
[ ] Polite, calm, non-inflammatory tone.
[ ] Thank the reviewer (even if critical) without validating specific allegations.
[ ] If negative/critical: include an offline resolution CTA (phone/email) and invite details privately.
[ ] Keep it short; avoid point-by-point rebuttals.
[ ] If reviewer contains harassment/hate speech: keep response minimal, do not echo slurs.
[ ] If suspected fake: do not accuse directly; invite offline verification.

C. Detector / Gate Requirements (Product Controls)
Pre-generation gate (before draft):
[ ] If review contains legal-threat keywords (e.g., sue/lawsuit/attorney/court) ⇒ escalation_level=Legal and response_mode=HOLD_MANUAL_ONLY (no auto-post).
[ ] If review contains PHI-risk phrases (chart/records/visit/appointment/procedure/patient) ⇒ force “generic non-confirming” template variant; prohibit any second-person confirmation.

Pre-post gate (before posting):
[ ] If response contains any blocked phrases (see Section D) ⇒ block_manual_review.
[ ] If escalation_level in {Legal, Safety, PHI} ⇒ block_manual_review.

D. Blocked Phrase List (Minimum)
Liability admission:
- “we are at fault,” “our fault,” “we caused,” “we broke/damaged,” “we injured”
PHI confirmation:
- “your visit,” “your appointment,” “your procedure,” “your treatment,” “your chart/records,” “as your dentist/clinician”
Incentives:
- “discount,” “coupon,” “free,” “gift card,” “in exchange for,” “update your review and we’ll…”
Removal promises:
- “we’ll have this removed,” “Yelp/Google will take it down,” “we reported you and it will be removed”
Competitor disparagement:
- “unlike [competitor],” “they’re scammers,” “their reviews are fake”

E. Platform Notes (GBP vs Yelp)
[ ] GBP: Avoid any medical/health claims; keep responses general and privacy-safe.
[ ] Yelp: Do not discuss Yelp moderation, do not ask for review removal/changes, do not incentivize.
[ ] Both: No fake reviews; no asking staff/friends to post; no review gating.

F. Audit Trail Requirements (Acceptance)
For each review processed, log:
- review_source (GBP/Yelp), review_id, business_id/location_id
- review_text_hash, timestamps (received, draft_created)
- detected_risk_flags (PHI, LegalThreat, Incentive, Competitor, Harassment)
- escalation_level and hold_reason if any
- draft_version + model/prompt version
- human_approver_id + approval_timestamp
- posted_timestamp + post_status (posted / blocked_manual_review / error_code)
- final_response_text_hash + final_response_text

2) Escalation Playbook v3 (Ops-ready)

Goal: Resolve negative sentiment quickly while preventing policy/legal/PHI violations.
Escalation Levels
- L0: Normal (auto-draft OK, auto-post only if enabled + passes gates)
- L1: Service Recovery (manual approval recommended)
- L2: Billing/Refund/Contract (manual approval required)
- L3: Safety/Harassment/Discrimination (manual-only hold; owner/GM)
- L4: PHI/Privacy (manual-only hold; privacy lead)
- L5: Legal Threat (manual-only hold; legal counsel)

Routing SLAs
- L5 Legal Threat: same business day to Legal/Owner
- L4 PHI/Privacy: within 4 hours to Privacy lead/Owner
- L3 Safety/Discrimination/Harassment: within 4 hours to Owner/GM
- L2 Billing/Refund/Contract: within 24 hours to Billing/Ops
- L1 Service Recovery: within 24 hours to Ops/GM

Evidence to Collect (internal, never posted publicly)
- Screenshot/export of original review + timestamp + platform link
- Any relevant work order/invoice IDs (internal only)
- Staff statements + timeline
- Photos (HVAC property damage claims), call logs, appointment logs (do not reference publicly)

Do-Not-Post Conditions (Hard Stops)
- Any legal threat language present in review or draft response.
- Any PHI/identity confirmation risk (“your appointment/visit/records”).
- Any admission of liability beyond generic apology.
- Any incentives/discounts to influence reviews.
- Any personal details about reviewer/staff.

Scenario Guidance (What to say / what not to say)
A) Billing dispute / “Overcharged me” (L2)
- Say: “We’d like to look into this—please contact us directly so we can review the details and help.”
- Don’t: Quote invoice totals unless business verified; don’t imply reviewer is a customer.

B) Service quality / “Rude staff” (L1)
- Say: “We’re sorry to hear this. Please contact our manager so we can understand what happened and improve.”
- Don’t: Name staff, blame reviewer, or argue.

C) Alleged damage (HVAC) / “They broke my wall” (L2 or L3 if safety)
- Say: “We’re sorry to hear this concern. Please reach out so we can review and make it right.”
- Don’t: Admit fault; don’t promise reimbursement publicly.

D) Safety incident / injury claim (L3)
- Say: “We take safety concerns seriously. Please contact us directly so we can address this promptly.”
- Don’t: Discuss incident specifics publicly.

E) Discrimination/harassment allegations (L3)
- Say: “We take these concerns seriously. Please contact us directly so our leadership team can review.”
- Don’t: Debate intent or facts publicly.

F) Medical outcome complaint (Dentist/Med Spa) (L4 if PHI phrasing; otherwise L1/L2)
- Say: “We’re sorry to hear you’re unhappy. We’d like to connect privately to better understand and help.”
- Don’t: Mention procedures/results/diagnosis; no guarantees.

G) PHI mention or patient-identifying language (L4)
- Response must be generic and non-confirming: “For privacy reasons, we can’t discuss details here. Please contact us directly.”

H) Legal threat (L5)
- Public response: HOLD. If business insists on public response, use only an attorney-approved minimal statement.

3) Approved Response Templates v3 (Ready to paste)
Rules for ALL templates:
- Allowed variables: {BusinessName}, {SupportEmail}, {SupportPhone}, {ManagerNameOptional}
- Never insert: reviewer name, appointment date/time, procedure/service specifics, invoice totals, staff full names, medical details.
- Always keep offline CTA.

A) Dentist Templates (GBP + Yelp)
DENT-01 Positive
“Thank you for your kind words. We appreciate you taking the time to share your experience with {BusinessName}. If there’s anything we can do to support you, please reach us at {SupportPhone} or {SupportEmail}.”

DENT-02 Neutral / Short
“Thanks for the feedback. We’re always working to improve. If you’re open to sharing more details privately, please contact us at {SupportPhone} or {SupportEmail}.”

DENT-03 Mild Negative (service/communication)
“Thank you for letting us know. We’re sorry to hear this didn’t meet your expectations. We’d like to understand what happened and help—please reach out at {SupportPhone} or {SupportEmail}.”

DENT-04 Strong Negative (no PHI confirmation)
“We’re sorry to hear about your concerns. For privacy reasons, we can’t discuss specifics here, but we’d like to connect and address this directly. Please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

DENT-05 Suspected Fake / Not in records (non-accusatory)
“Thank you for the review. We take feedback seriously and would like to look into this. Please contact us at {SupportPhone} or {SupportEmail} so we can better understand the situation.”

DENT-06 Harassment/Profanity (minimal)
“We’re sorry to hear you feel this way. We’re committed to respectful communication and would be glad to discuss any concerns directly. Please contact us at {SupportPhone} or {SupportEmail}.”

B) Med Spa Templates (GBP + Yelp)
SPA-01 Positive
“Thank you for your feedback. We’re glad you had a great experience with {BusinessName}. If you ever have questions, reach us at {SupportPhone} or {SupportEmail}.”

SPA-02 Neutral
“Thanks for sharing your thoughts. We’re always improving. If you’d like to discuss further, please contact us at {SupportPhone} or {SupportEmail}.”

SPA-03 Mild Negative (wait time/scheduling)
“Thank you for the feedback. We’re sorry for the frustration and want to improve. Please contact us at {SupportPhone} or {SupportEmail} so we can learn more and help.”

SPA-04 Results dissatisfaction (no medical claims)
“We’re sorry to hear you’re disappointed. We’d like to understand your concerns and discuss options privately. Please contact {BusinessName} at {SupportPhone} or {SupportEmail}.”

SPA-05 PHI-risk / mentions treatment details
“Thanks for reaching out. To protect privacy, we can’t discuss details here, but we’d like to connect directly and help. Please contact us at {SupportPhone} or {SupportEmail}.”

SPA-06 Suspected Fake
“Thank you for the review. We take concerns seriously and would like to look into this. Please contact us at {SupportPhone} or {SupportEmail} with any details you can share privately.”

C) HVAC Templates (GBP + Yelp)
HVAC-01 Positive
“Thank you for the review. We appreciate you choosing {BusinessName} and are glad to hear you had a good experience. If you need anything else, contact us at {SupportPhone} or {SupportEmail}.”

HVAC-02 Neutral
“Thanks for the feedback. We’re always working to improve. If you’d like to share more details, please contact us at {SupportPhone} or {SupportEmail}.”

HVAC-03 Mild Negative (late arrival/communication)
“Thank you for letting us know. We’re sorry for the inconvenience. Please contact us at {SupportPhone} or {SupportEmail} so we can learn more and work toward a better experience.”

HVAC-04 Strong Negative (quality complaint)
“We’re sorry to hear about your concerns. We’d like to understand what happened and see how we can help. Please reach out to {BusinessName} at {SupportPhone} or {SupportEmail}.”

HVAC-05 Alleged damage (no liability admission)
“Thank you for raising this concern. We take it seriously and would like to review the details directly. Please contact us at {SupportPhone} or {SupportEmail} so we can look into it and follow up.”

HVAC-06 Suspected Fake / competitor bait
“Thank you for the review. We’d like to understand your concern and address it appropriately. Please contact us directly at {SupportPhone} or {SupportEmail}.”

4) Mandatory Offline Contact Info (use consistently)
Website for legitimacy (share with customers as needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-65mml106.picard.replit.dev/sites/1
Business contact email for ops/escalations: agent_bob_replit+review-bot@agentmail.to

Operational Note: Templates are intentionally generic to avoid PHI/PII confirmation and liability. If a business requests highly specific replies, require human approval and ensure the response does not confirm customer identity or disclose service details. For Legal Threat or PHI-risk reviews, enforce HOLD_MANUAL_ONLY with blocked_manual_review post_status until an authorized human approves.