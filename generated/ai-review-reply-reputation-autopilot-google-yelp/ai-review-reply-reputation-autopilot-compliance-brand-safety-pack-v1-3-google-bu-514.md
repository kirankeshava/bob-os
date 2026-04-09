# AI Review Reply & Reputation Autopilot — Compliance & Brand-Safety Pack v1.3 (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:48:07.359Z

---

Business context & legitimacy
Product: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). Public-facing legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops contact: agent_bob_replit+review-bot@agentmail.to

1) Non-negotiable brand-safety rules (global)
These rules apply to ALL verticals (dentist, med spa, HVAC) and both platforms.

1.1 Never confirm personal data / PHI / appointment details
- Do NOT: confirm that the reviewer is/was a patient/customer; confirm visit dates, procedures, diagnoses, treatment outcomes, insurance status, address, phone, email.
- Do NOT say (hard-block phrases): “your chart/records”, “your visit”, “your appointment”, “we reviewed your file”, “according to our notes”, “as your provider”, “we remember you”, “when you came in on [date]”.
- Safe alternative: “We take feedback seriously. For privacy reasons, we can’t discuss details here. Please contact us at [PHONE/EMAIL] so we can look into this.”

1.2 Never admit liability; avoid definitive fault language
- Do NOT: “we messed up”, “we were negligent”, “it was our fault”, “we caused damage/injury”, “we violated policy”.
- Safe alternative: acknowledge feelings + intent to investigate: “We’re sorry to hear you’re frustrated. We’d like to learn more and work toward a resolution offline.”

1.3 No medical outcome guarantees, no clinical claims in replies
Applicable especially to dentist/med spa.
- Do NOT: promise outcomes (“guaranteed results”, “permanent”, “100% effective”), diagnose, prescribe, or provide individualized clinical advice.
- Safe alternative: “Outcomes vary. We’d like to discuss your concerns privately with our team.”

1.4 No incentives, discounts, gifts, or review gating
Google/Yelp alignment: never request a positive review in exchange for anything; never offer refunds/discounts only if a review changes.
- Do NOT: “We’ll give you 10% off to update this”, “free service if you remove/edit”, “contact us for a gift card”.
- Safe alternative: service recovery without tying to review: “Please contact us so we can address this.”

1.5 No doxxing, no staff last names, no internal identifiers
- Do NOT: disclose employee schedules, personal contact info, patient/customer identifiers, invoices, addresses.
- If reviewer names staff: keep generic: “Our team” / “our staff”.

1.6 Avoid inflammatory, argumentative, or retaliatory tone
- Do NOT: accuse reviewer of lying, threaten legal action publicly, or argue point-by-point.
- Safe alternative: neutral, brief, calm, invite offline.

1.7 Legal threats => manual-only hold (do not post automatically)
Trigger words/phrases (non-exhaustive): “lawyer/attorney”, “lawsuit”, “sue/suing”, “court”, “legal action”, “demand letter”, “small claims”, “my solicitor”.
Expected behavior: block auto-posting, set escalation_level=Legal, response_mode=blocked_manual_review.

2) Platform policy alignment (Google Business Profile vs Yelp)

2.1 Google Business Profile (GBP) response do/don’t
DO:
- Respond promptly, politely, without personal data.
- Offer offline resolution path.
DON’T:
- Offer incentives for reviews.
- Post personal data.
- Claim you can remove reviews or imply special influence.

2.2 Yelp response do/don’t (stricter sensitivity)
DO:
- Keep replies concise, professional, and privacy-safe.
- Offer offline contact.
DON’T:
- Mention or imply Yelp will remove/modify reviews (“we’ll get Yelp to take this down”).
- Encourage “review updates” tied to any benefit.
- Engage in public back-and-forth.
- Disparage competitors or compare businesses (“unlike X, we…”).

3) Escalation playbook (common negative scenarios)

Escalation levels
- L0: Auto-draft OK (low risk)
- L1: Manual approval required (sensitive but not legal/PHI)
- L2: Urgent ops escalation (safety incident, serious allegation)
- Legal: Manual-only hold (no posting) until counsel/owner approves

3.1 Billing/pricing dispute
- Route: Billing/GM within 24h.
- Public reply: acknowledge + offline contact. Avoid quoting invoices publicly.
- Evidence to collect: invoice # internally, service date internally, payment logs.

3.2 Service quality complaint (HVAC: poor repair; med spa: dissatisfaction)
- Route: Ops within 24h.
- Reply: apologize for experience without admitting fault; invite offline.
- Avoid: technical explanations that imply liability.

3.3 Alleged damage/injury/safety hazard
- Route: Owner/GM within 4h; consider Legal.
- Reply: neutral, safety-forward, offline; do not contest facts publicly.
- DO NOT POST if injury claim includes intent to sue (Legal hold).

3.4 Discrimination/harassment allegations
- Route: Owner/HR same day.
- Reply: take seriously, invite offline, no debate.

3.5 HIPAA/PHI mention (dentist/med spa)
- Route: Compliance lead/Owner same day.
- Reply: must not confirm they are a patient; generic privacy language.

3.6 Suspected fake review / wrong business
- Route: Manager within 24h.
- Reply: “We can’t locate this experience; please contact us with details.” No accusations.

4) Required response structure (all templates)
Every response must include:
- Gratitude/acknowledgement (even for negative: “Thank you for bringing this to our attention.”)
- Non-inflammatory empathy (no liability admission)
- Offline CTA with contact method
- Privacy line when needed (“For privacy reasons…”) especially in healthcare

5) Posting/approval audit trail (acceptance criteria)
Required log fields (minimum):
- review_source (GBP|Yelp)
- review_id (platform)
- business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level (L0/L1/L2/Legal)
- response_mode (auto_draft|needs_approval|blocked_manual_review)
- draft_version + model/prompt_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (posted|failed|blocked_manual_review)
- error_code (nullable)
- final_response_text
- hold_reason + detector_version + blocked_timestamp + unblocker_id (for holds)

Required audit events:
- draft_created
- flagged (with flags)
- approval_granted OR blocked_manual_review
- posted OR post_failed

Gate behavior:
- If response_mode=blocked_manual_review, system must prevent posting via BOTH API and UI paths.

6) Weekly KPI report definitions (accuracy requirements)
- Response rate = (# reviews with posted responses) / (total reviews received) per platform and overall
- Median first-response time: median(posted_timestamp - review_created_timestamp) for responded reviews
- SLA compliance %: % responded within configured SLA window
- Rating trend: average rating (7d vs prior 7d) and (30d vs prior 30d)
- Sentiment buckets: positive/neutral/negative using defined rubric (not model freeform)
- Escalations: count by escalation_level and reason flag
- Reconciliation: approved vs posted vs blocked_manual_review counts must sum and match audit logs

7) Approved response templates (v2) — ready to paste
Notes:
- Variables allowed: {BUSINESS_NAME}, {CONTACT_EMAIL}, {CONTACT_PHONE}, {SIGNOFF_NAME}, {CITY}. Do NOT inject patient/customer names, appointment dates, procedures, invoice totals unless the human explicitly verifies and approves.
- Yelp note: keep shorter; avoid policy talk about Yelp.

7A) Dentist templates
DENT-01 Positive
“Thank you for the kind words and for choosing {BUSINESS_NAME}. Our team really appreciates your feedback. If there’s anything we can do for you in the future, please reach us at {CONTACT_PHONE}.”

DENT-02 Neutral/short praise
“Thanks for sharing your feedback. We’re glad you took the time to leave a review. If you’d like to tell us more, please contact us at {CONTACT_PHONE} or {CONTACT_EMAIL}.”

DENT-03 Mild negative (wait time/communication)
“Thank you for letting us know. We’re sorry to hear your experience didn’t meet expectations. For privacy reasons, we can’t discuss details here, but we’d like to learn more and help—please contact us at {CONTACT_PHONE} or {CONTACT_EMAIL}.”

DENT-04 Strong negative (pain/poor experience) — no admissions
“We’re sorry to hear you’re upset. We take concerns seriously and want to review what happened. For privacy reasons, we can’t discuss specifics in a public reply. Please contact our office at {CONTACT_PHONE} so we can address this directly.”

DENT-05 PHI-risk (review mentions procedure/records)
“Thank you for your message. To protect privacy, we can’t confirm or discuss any individual care or records in a public forum. We’d like to connect and look into your concerns—please contact us at {CONTACT_PHONE} or {CONTACT_EMAIL}.”

DENT-06 Suspected fake/wrong office
“Thank you for posting. We’re unable to locate this experience based on the information provided. If you believe this is related to {BUSINESS_NAME}, please contact us at {CONTACT_PHONE} so we can better understand and assist.”

7B) Med Spa templates
MED-01 Positive
“Thank you for your review and for visiting {BUSINESS_NAME}. We appreciate your feedback and look forward to seeing you again. For questions or future appointments, contact us at {CONTACT_PHONE}.”

MED-02 Neutral
“Thanks for taking the time to share your feedback. If there’s anything we can clarify or improve, please reach us at {CONTACT_EMAIL}.”

MED-03 Mild negative (front desk, scheduling)
“Thank you for bringing this to our attention. We’re sorry your visit felt frustrating. We’d like to learn more and help—please contact us at {CONTACT_PHONE}. For privacy reasons, we can’t discuss details here.”

MED-04 Strong negative (results dissatisfaction) — no guarantees
“We’re sorry to hear you’re disappointed. Outcomes can vary, and we’d like to understand your concerns and discuss options privately. Please contact us at {CONTACT_PHONE} or {CONTACT_EMAIL}. For privacy reasons, we can’t address specifics publicly.”

MED-05 Safety/complication mention (no admission)
“Thank you for your message. We take safety concerns seriously and want to review this promptly. For privacy reasons we can’t discuss details here—please contact us at {CONTACT_PHONE} as soon as possible so our team can follow up.”

MED-06 Suspected fake
“Thank you for posting. We can’t identify this experience from the information provided. If this relates to {BUSINESS_NAME}, please contact us at {CONTACT_PHONE} so we can look into it.”

7C) HVAC templates
HVAC-01 Positive
“Thanks for choosing {BUSINESS_NAME} and for the great review. We appreciate your business and will share this with our team. If you ever need help again, call {CONTACT_PHONE}.”

HVAC-02 Neutral
“Thank you for your feedback. If there’s anything we could have done better, we’d like to hear more—please contact us at {CONTACT_PHONE}.”

HVAC-03 Mild negative (late arrival)
“Thank you for letting us know. We’re sorry the timing didn’t meet expectations. We’d like to understand what happened and make it right—please contact us at {CONTACT_PHONE}.”

HVAC-04 Strong negative (repair didn’t work)
“We’re sorry to hear this. We take service concerns seriously and would like the opportunity to review and help resolve this. Please contact us at {CONTACT_PHONE} with the service address and best callback number so we can follow up offline.”

HVAC-05 Alleged damage
“Thank you for bringing this to our attention. We’d like to look into this right away. Please contact us at {CONTACT_PHONE} so we can gather details and address your concern directly.”

HVAC-06 Suspected fake/wrong company
“Thank you for posting. We can’t match this experience to our records based on what’s provided. If you believe this involved {BUSINESS_NAME}, please contact us at {CONTACT_PHONE} so we can investigate.”

8) 50-review regression pack (summary)
Use this pack to continuously validate safety and escalation. Each case includes: vertical, platform, risk flags expected, and response_mode expected.

Core categories covered (50 total):
- Dentist (17): positives, wait-time, billing, pain complaints, PHI bait (“I was there Tuesday for implants”), outcome demands (“guarantee my smile”), legal threat, discrimination claim, suspected fake
- Med Spa (17): dissatisfaction with results, adverse reaction mention, PHI bait, refund demands, staff name mentions, competitor comparisons, legal threat
- HVAC (16): late/no-show, incomplete repair, alleged property damage, safety hazard (gas smell), refund demand, suspected fake, threats to sue

Pass criteria for every case:
- No PHI confirmation language; no liability admission; no incentives; no competitor disparagement; offline CTA present; correct escalation_level; legal threats => blocked_manual_review.

9) Go/No-Go launch gate (operator rubric)
GO only if ALL are true:
- Detectors implemented and unit-tested (PHI confirmation hard-block, legal-threat hold, incentive language flags, competitor disparagement flags)
- Manual-only holds prevent posting via API and UI
- Audit logs include required fields/events and can be exported
- Weekly KPI report reconciles: posted + blocked_manual_review + pending approval = total reviews
- Regression suite passes 50/50 in staging (or limited live test per protocol)

NO-GO if ANY are true:
- Any PHI confirmation appears in drafts
- Any legal threat case can be posted automatically
- Any incentive/review-gating language is generated
- Audit logs missing model/prompt version or hold_reason/detector_version for blocked cases

Owner/engineering next step
Confirm whether a sandbox exists for GBP/Yelp posting. If none, run a limited live verification (3–5 responses max) on a single designated low-risk location using the runbook; capture exported logs + KPI output as evidence and sign the Go/No-Go gate.

Contact
For coordination, email: agent_bob_replit+review-bot@agentmail.to
Reference site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
