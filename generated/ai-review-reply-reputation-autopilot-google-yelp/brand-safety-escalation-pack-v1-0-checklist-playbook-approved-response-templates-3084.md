# Brand-Safety & Escalation Pack v1.0 — Checklist + Playbook + Approved Response Templates (Dentist / Med Spa / HVAC)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:22:04.617Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Website (legitimacy link for customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

1) BRAND-SAFETY CHECKLIST (Operational, tick-box)
Use this checklist before approving any response. If any “Hard Stop” triggers, do not post; escalate.

A. Hard Stops — DO NOT POST (Manual-only hold)
- PHI/HIPAA risk (healthcare): The draft confirms or implies the reviewer is/was a patient/client, references records/chart/visit, appointment details, treatment plan, or outcomes tied to the reviewer.
- Legal threat: reviewer mentions attorney, lawsuit, “sue”, “legal action”, “court”, “demand letter”.
- Safety incident: injury, property damage, fire, gas leak, hazardous condition, negligence allegations.
- Harassment/hate speech/threats: any threats of violence, slurs, or targeted harassment.
- Doxxing/personal data: includes staff last names, phone numbers, addresses, license numbers, or customer identifiers.

B. Prohibited Content (Google/Yelp alignment)
- No incentives: do not offer discounts, free services, gifts, refunds in exchange for reviews; no “DM us for a coupon”.
- No review gating: do not ask only happy customers to review or imply conditions.
- No fake reviews: never claim a review is “fake” as a fact; use neutral language (“we can’t locate this experience”) and move offline.
- No competitor disparagement: do not compare to or insult competitors.
- No admission of liability: avoid “we messed up”, “our fault”, “we were negligent”; use non-committal service recovery language.
- No medical guarantees/outcomes: avoid “guaranteed results”, “permanent”, “cure”, “100% effective”.

C. Required Elements (must be present)
- Thank the reviewer (even if negative) in a neutral tone.
- Invite offline resolution with a direct contact path (phone/email) without demanding personal info publicly.
- Keep it short, calm, non-argumentative; no point-by-point disputes.
- For healthcare: include privacy-forward phrasing (e.g., “to protect privacy, we can’t discuss details here”).

D. Blocked Phrases (replace with safe alternatives)
- Block: “we reviewed your chart/records/visit/appointment” → Use: “We take feedback seriously; to protect privacy we can’t discuss details here.”
- Block: “you are wrong/that didn’t happen” → Use: “We’re sorry to hear this was your impression; we’d like to learn more.”
- Block: “we’ll remove this review / Yelp will remove” → Use: “If you believe a review violates platform guidelines, you may report it through the platform.” (Do not promise outcomes.)
- Block: “call us for a discount” → Use: “Please contact us so we can help resolve this.”

2) ESCALATION PLAYBOOK (Common scenarios)
Severity Levels
- L0: Standard (positive/neutral). Auto-draft allowed.
- L1: Mild negative (service dissatisfaction, wait time, minor billing confusion). Auto-draft allowed, requires offline CTA.
- L2: Strong negative (refund demand, repeated issues, allegations of rudeness/discrimination, suspected fake). Draft allowed but human approval required.
- L3: Hard stop (PHI risk, legal threats, safety incidents, harassment/threats). Manual-only hold; do not post.

Routing & SLAs (internal)
- L1 → Ops Manager (respond within 24h)
- L2 → Owner/GM + Ops (respond within 12–24h)
- L3 Legal threat → Legal/Owner same-day; response may be “no public reply” or a minimal privacy-safe acknowledgement only if counsel approves
- L3 Safety incident → Owner/GM same-day; collect evidence before any public response

Evidence to collect before responding (as applicable)
- Billing dispute: invoice, payment logs, written estimates, call notes
- Service quality: work order, tech notes, timestamps, photos (HVAC)
- Healthcare: DO NOT pull or reference chart in public response; internal review only
- Discrimination claim: staff statements, CCTV if available, contemporaneous notes

DO-NOT-POST conditions
- Any PHI confirmation language or any detail that could identify a patient/customer
- Any legal threat scenario without owner/legal review
- Any safety incident without incident review and approved wording

3) APPROVED RESPONSE TEMPLATES (Versioned)
Usage rules (all verticals)
- Allowed variables: {BusinessName}, {FirstNameOrTeam} (optional), {SupportEmail}=agent_bob_replit+review-bot@agentmail.to, {SupportPhone} (if provided by business), {Location} (city only)
- Disallowed variables: appointment times, procedure/service specifics not already in review, staff last names, pricing unless the reviewer already posted it AND business verified
- Always keep offline CTA. Never request sensitive info publicly.

3A) Dentist Templates
DENT-01 Positive
“Thank you for the kind words! We’re glad you had a great experience at {BusinessName}. If there’s ever anything we can do to help, please reach us at {SupportEmail}.”

DENT-02 Neutral/Short
“Thanks for taking the time to leave a review. We appreciate the feedback and will share it with our team. If you’d like to tell us more, contact us at {SupportEmail}.”

DENT-03 Mild Negative (wait time/communication)
“Thanks for the feedback, and we’re sorry to hear this didn’t meet expectations. We’re always working to improve. Please email {SupportEmail} so we can learn more and help.”

DENT-04 Strong Negative (no PHI; privacy-forward)
“We’re sorry to hear you’re upset. To protect everyone’s privacy, we can’t discuss details here, but we’d like to understand what happened and see how we can help. Please contact {SupportEmail}.”

DENT-05 Suspected Fake / Can’t Locate
“Thank you for the review. We take concerns seriously, but we’re unable to identify this experience from the details provided. Please contact {SupportEmail} so we can look into it.”

DENT-06 Service Recovery (no liability admission)
“Thank you for bringing this to our attention. We want every visit to feel respectful and professional. Please email {SupportEmail} so our team can follow up directly.”

3B) Med Spa Templates
SPA-01 Positive
“Thank you for the wonderful review! We’re happy you enjoyed your experience at {BusinessName}. If you ever need anything, reach us at {SupportEmail}.”

SPA-02 Neutral
“Thanks for your feedback. We appreciate you taking the time to share it and will pass it along to our team. If you’d like to connect directly, email {SupportEmail}.”

SPA-03 Mild Negative (scheduling/wait)
“Thanks for letting us know. We’re sorry this was frustrating and we’re working to improve. Please contact {SupportEmail} so we can help.”

SPA-04 Strong Negative (outcomes dissatisfaction; no guarantees)
“We’re sorry to hear you’re disappointed. Results and experiences can vary, and we’d like to understand your concerns and discuss options privately. Please email {SupportEmail}.”

SPA-05 Suspected Fake
“Thank you for the review. We can’t match this to a visit based on what’s shared here. Please reach out to {SupportEmail} so we can look into it.”

SPA-06 Sensitive/Privacy-forward
“To protect privacy, we can’t discuss details publicly. We’d like to help address your concerns—please contact {SupportEmail} and our team will follow up.”

3C) HVAC Templates
HVAC-01 Positive
“Thanks for the great review! We’re glad our team could help. If you need anything in the future, contact us at {SupportEmail}.”

HVAC-02 Neutral
“Thank you for the feedback. We appreciate it and will share it with the team. If you’d like to provide more detail, please email {SupportEmail}.”

HVAC-03 Mild Negative (late arrival)
“Thanks for letting us know, and we’re sorry for the inconvenience. We aim to communicate clearly about timing. Please contact {SupportEmail} so we can make this right.”

HVAC-04 Strong Negative (pricing dispute; no blame)
“We’re sorry to hear this was frustrating. We’d like to review what happened and address your concerns directly. Please reach out at {SupportEmail} with a good callback number (no need to post it here).”

HVAC-05 Suspected Fake
“Thank you for the review. We’re unable to locate this job from the details provided, but we take concerns seriously. Please contact {SupportEmail} so we can investigate.”

HVAC-06 Safety Concern (hard stop indicator)
“Thanks for raising this. Safety is important to us. Please contact {SupportEmail} right away so we can follow up directly.”
NOTE: If the review alleges injury/fire/gas leak/property damage → L3 Manual-only hold; do not post without owner review.

4) Platform Notes (Google Business Profile vs Yelp)
- Both: do not solicit incentives, do not mention private customer data, do not argue.
- Yelp-sensitive: avoid implying Yelp will remove reviews; avoid calling a review “fake” as a fact; keep responses professional and brief.
- Google-sensitive: avoid promotional language that could be read as incentivizing; keep CTAs clear and non-transactional.

This pack is intended to be hard-coded into product guardrails (blocked phrases + manual-only holds) and used by human approvers. For questions or incident escalation, contact agent_bob_replit+review-bot@agentmail.to.