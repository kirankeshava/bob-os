# Brand Safety & Escalation Compliance Pack v3 (Checklist + Playbook + Approved Templates: Dentist / Med Spa / HVAC)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:09:05.057Z

---

This Compliance Pack v3 is the operational reference for drafting, approving, and (where allowed) posting review responses on Google Business Profile (GBP) and Yelp. It is designed to minimize brand risk, prevent hallucination/PHI leakage, and align with platform policies (no incentives, no fake reviews, no removal promises).

SECTION A — BRAND-SAFETY CHECKLIST v3 (tick-box; must pass before approval)
A1. Universal prohibitions (GBP + Yelp)
1) No incentives or solicitation: Do NOT offer discounts, gifts, refunds, or “make it right if you edit/delete your review.”
   - Hard-block phrases: “discount”, “coupon”, “free”, “gift card”, “refund if you remove”, “we’ll compensate you for updating”.
2) No review gating or manipulation: Do NOT ask for only positive reviews or direct unhappy customers elsewhere.
   - Hard-block: “if you had a good experience leave a review”, “contact us instead of leaving a review.”
3) No removal promises / platform threats: Do NOT claim you can remove reviews or that Yelp/Google will take action.
   - Hard-block: “we will have this removed”, “Yelp will delete”, “Google will remove”, “report you to Yelp/Google.”
4) No doxxing / personal data: Do NOT repeat phone numbers, addresses, appointment times, vehicle plates, invoice numbers, or staff last names.
   - Allowed: first name only for the signer (e.g., “— Bob, Office Manager”).
5) No liability admission or definitive fault: Avoid “we caused”, “our mistake”, “we damaged”, “we poisoned”, “we committed malpractice.”
   - Safe alternative: “We’re sorry to hear this. We want to understand what happened and address it appropriately.”
6) No inflammatory tone / arguments: No sarcasm, blame, retaliation, or calling the reviewer a liar.
   - Hard-block: “you’re lying”, “that never happened”, “scam”, “extortion”, “idiot”.
7) Required offline CTA for anything neutral/negative: Provide a way to resolve privately.
   - Required CTA format: “Please contact us at [business_phone/email] so we can look into this.”
8) No hallucinated details: Never invent dates, services, medications, pricing, staff identities, or “our records show…”.
   - Hard-block: “our records show”, “we reviewed your chart/visit/appointment”, “per your invoice”.

A2. Healthcare-specific (Dentist + Med Spa)
9) HIPAA/PHI: Do NOT confirm the person is/was a patient or mention treatment, procedures, diagnoses, prescriptions, outcomes, or appointment details.
   - Hard-block: “your treatment”, “your procedure”, “your records/chart”, “your visit on [date]”, “before/after”.
   - Safe alternative: “We take privacy seriously and can’t discuss details here, but we’d like to talk offline.”
10) No medical outcome guarantees: Avoid “permanent results”, “guaranteed”, “clinically proven for you”, “no risks”.
    - Safe alternative: “Results can vary. We’re happy to discuss concerns privately.”

A3. HVAC / home services
11) Safety + damage claims: If reviewer alleges property damage, injury, gas leak, CO exposure, or unsafe work, escalate and avoid admissions.
    - Required: immediate offline CTA + escalation flag.

A4. Yelp nuance
12) Yelp public responses should be calm, brief, and non-accusatory; avoid extended back-and-forth.
13) Never mention internal enforcement (“Yelp will…”) or imply the reviewer violated rules.

SECTION B — ESCALATION PLAYBOOK v3 (decision trees + SLAs)
B1. Escalation levels
Level 0: Safe to respond with approved template.
Level 1: Ops follow-up needed (service quality, scheduling, rudeness) — respond + route to Ops within 24h.
Level 2: Billing/pricing dispute — respond + route to Billing within 24h.
Level 3: Safety incident / alleged injury / property damage — respond carefully + route to Owner/GM within 4h.
Level 4: PHI/HIPAA risk — HOLD (do-not-post). Route to Privacy lead/Owner within 4h.
Level 5: Legal threat ("attorney", "lawsuit", "sue") — HOLD (do-not-post). Route to Legal/Owner same-day.

B2. Respond vs HOLD rules
Always HOLD (do-not-post) if:
- Reviewer includes or demands discussion of medical details (healthcare) or asks you to confirm they were a patient.
- Legal threats: “my lawyer”, “lawsuit”, “sue”, “served papers”, “demand letter”.
- Harassment/threats/violence: credible threats against staff.
- Active safety investigations (gas leak, CO poisoning, fire hazard) where statements could create liability.

Respond (with escalation) if:
- Service dissatisfaction without legal/safety/PHI: late arrival, rude staff, poor workmanship.
- Billing disputes without legal threat: price higher than expected, estimate mismatch.
- Suspected fake review: respond neutrally, invite offline contact, do NOT accuse.

B3. Evidence to collect internally (not in public response)
- Job/appointment identifiers, internal notes, photos, invoices, call logs.
- For safety/damage: photos, incident report, technician notes, dispatch timeline.
- For discrimination claims: witness statements, policy references, training records.

B4. Public response structure (when allowed)
1) Thank/acknowledge feeling.
2) No admissions; no specifics.
3) Commitment to address.
4) Offline CTA.
5) Sign-off with role (no full names).

SECTION C — APPROVED RESPONSE TEMPLATES LIBRARY v3
Usage rules (all templates)
- Variables allowed: {business_name}, {phone_or_email}, {signer_role}.
- Never use variables: {patient_name}, {staff_last_name}, {appointment_date}, {procedure}, {price}, {invoice_id} unless user-provided AND verified AND non-sensitive.
- For Yelp and GBP, keep it short; one offline CTA.
- If escalation Level 4/5: do-not-post; internal note only.

C1. DENTIST (GBP/Yelp)
DENT-01 Positive
“Thank you for taking the time to leave a review. We’re glad you had a good experience at {business_name}. If there’s ever anything we can do to help, please reach us at {phone_or_email}. — {signer_role}”

DENT-02 Neutral/short compliment
“Thanks for your feedback. We appreciate you choosing {business_name}. If you’d like to share anything else, please contact us at {phone_or_email}. — {signer_role}”

DENT-03 Mild negative (no PHI)
“We’re sorry to hear you felt disappointed. We take feedback seriously and would like to learn more so we can improve. Please contact us at {phone_or_email}. — {signer_role}”

DENT-04 Strong negative (no PHI; de-escalating)
“Thank you for bringing this to our attention. We take concerns seriously, but we can’t discuss details publicly. Please contact us at {phone_or_email} so we can address this appropriately. — {signer_role}”

DENT-05 Suspected fake / wrong business
“We’re concerned this may be about a different office, but we’d like to confirm. Please contact {business_name} at {phone_or_email} so we can look into it. — {signer_role}”

DENT-06 PHI bait (HOLD template; internal note only)
INTERNAL ONLY: “PHI risk detected. Do not post. Route to Privacy/Owner. Provide private contact path if needed.”

C2. MED SPA (GBP/Yelp)
MED-01 Positive
“Thank you for your kind words. We appreciate you and are glad you had a great experience at {business_name}. If you need anything, reach us at {phone_or_email}. — {signer_role}”

MED-02 Neutral
“Thanks for the feedback. We’re always working to improve and appreciate you sharing your experience. Please contact us at {phone_or_email} if you’d like to discuss further. — {signer_role}”

MED-03 Mild negative
“We’re sorry to hear this wasn’t what you expected. We’d like to learn more and help if we can. Please contact us at {phone_or_email}. — {signer_role}”

MED-04 Strong negative / outcome complaint (no guarantees)
“Thank you for reaching out. We can’t discuss specifics in a public forum, but we take concerns seriously and would like to speak privately. Please contact us at {phone_or_email}. — {signer_role}”

MED-05 Pricing/billing concern (no specifics)
“We’re sorry for any confusion. We’d like to review your concerns and make sure you have clear information going forward. Please contact us at {phone_or_email}. — {signer_role}”

MED-06 PHI/medical details request (HOLD)
INTERNAL ONLY: “Potential PHI. Do not post. Route to Privacy/Owner; prepare private outreach script.”

C3. HVAC (GBP/Yelp)
HVAC-01 Positive
“Thanks for the review and for choosing {business_name}. We appreciate the opportunity to help. If you need anything in the future, contact us at {phone_or_email}. — {signer_role}”

HVAC-02 Neutral
“Thank you for the feedback. We’re always working to improve and appreciate you taking the time to share this. Please contact us at {phone_or_email} if you’d like to discuss further. — {signer_role}”

HVAC-03 Mild negative (service quality)
“We’re sorry to hear you had a frustrating experience. We’d like to understand what happened and see how we can help. Please contact us at {phone_or_email}. — {signer_role}”

HVAC-04 Scheduling/late arrival
“Thanks for sharing this. We’re sorry for the inconvenience and want to learn more so we can improve our scheduling and communication. Please contact us at {phone_or_email}. — {signer_role}”

HVAC-05 Damage/safety allegation (respond + escalate Level 3)
“We’re very concerned to hear this and take safety seriously. We’d like to look into what happened right away—please contact us at {phone_or_email} so we can address this promptly. — {signer_role}”

HVAC-06 Suspected fake / competitor bait
“Thank you for the feedback. We’d like to understand more about your experience, but we can’t find enough information here to investigate. Please contact us at {phone_or_email}. — {signer_role}”

SECTION D — OPERATOR NOTES (posting/approval audit trail requirements)
Every drafted response must be stored with: source (GBP/Yelp), review_id, review_text_hash, risk_flags, escalation_level, response_mode (auto/needs_approval/blocked_manual_review), template_id (if used), final_response_text, approver_id, timestamps (draft/approve/post), and post_status. If response_mode is blocked_manual_review, the system must not post through any UI/API path.

If you need to provide legitimacy in outreach or support communications, reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to
