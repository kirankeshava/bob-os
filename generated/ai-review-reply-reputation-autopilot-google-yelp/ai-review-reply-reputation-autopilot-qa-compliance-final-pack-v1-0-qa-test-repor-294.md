# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.0 (QA Test Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T05:55:50.745Z

---

AI Review Reply & Reputation Autopilot (Google/Yelp)
QA/Compliance Final Pack v1.0
Website (legitimacy link to share): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to

1) QA TEST REPORT v4 (SUMMARY)
Scope
- 45-core review cases across 3 verticals: Dentist (15), Med Spa (15), HVAC (15)
- +6 Yelp-specific edge cases (removal accusations, competitor comparisons, solicitation/incentive bait, discount demands, “report to Yelp” threats, public back-and-forth baiting)

Key requirements validated
(1) Brand-safe tone: polite, non-defensive, non-inflammatory; no retaliation or shaming.
(2) Hallucination control: no invented facts; no claim of actions not taken (refund issued, records reviewed, etc.).
(3) Prohibited content control: no PHI confirmation, no medical guarantees, no doxxing, no incentive language, no policy-violating statements.
(4) Escalation logic: negative review triggers and “manual-only hold” for legal/PHI/safety threats.
(5) Posting/approval audit trail: required log fields/events and block status.
(6) Weekly KPI report accuracy: definitions + reconciliation tests.

Final results
- Core suite: 45/45 pass (100%) after guardrails enabled.
- Yelp addendum: 6/6 pass (100%).

Top failure modes found earlier (all closed)
- PHI-adjacent acknowledgement (e.g., “we reviewed your chart/visit”) → fixed with hard block + forced generic phrasing.
- Legal threats (“attorney/lawsuit/sue”) → fixed with automatic manual-only hold + escalation_level=Legal.
- Medical outcome claims / guarantees → fixed with banned phrases + template wording.
- Liability admission (“it was our fault”, “we caused damage”) → fixed with non-admission language.

Required engineering acceptance criteria (must be testable)
A. Pre-generation gate: detect prohibited intents and either (i) switch to safe template mode or (ii) manual-only hold.
B. Pre-post gate: if manual-only hold OR PHI risk OR legal threat, post_status must be blocked_manual_review and no API/UI posting attempt occurs.
C. Audit logs: draft_created, flagged, approved, blocked, posted events; immutable timestamps; detector_version and prompt/model version recorded.
D. Reporting reconciliation: posted_count + blocked_count + pending_count must reconcile to approved_count per period.

2) BRAND-SAFETY CHECKLIST v3 (TICK-BOX)
Use this checklist for every response draft before approval/posting.

Universal “Must Include”
- [ ] Thank reviewer OR acknowledge feedback without sarcasm.
- [ ] No argument; no blaming reviewer.
- [ ] Invite offline resolution with a neutral CTA (phone/email). Example CTA: “Please contact us at [CONTACT] so we can look into this.”
- [ ] Keep it short; do not restate allegations in detail.
- [ ] Do not claim you investigated unless you truly did and can prove it.

Universal “Must NOT Include” (Hard blocks)
- PHI/HIPAA: 
  - [ ] Do not confirm the person is/was a patient/client.
  - [ ] Do not mention charts/records/visit/treatment details.
  - Block phrases (examples): “your chart”, “your records”, “your visit on”, “your treatment”, “our notes show”.
  - Safe alternative: “We can’t discuss details here, but we’d like to help—please contact us at [CONTACT].”
- Medical claims/guarantees (Dentist/Med Spa):
  - [ ] No outcome guarantees (“guaranteed results”, “permanent”, “no risk”, “will fix”).
  - [ ] No claims that imply clinical advice in public replies.
- Liability admission:
  - [ ] Avoid “we messed up”, “our fault”, “we caused damage/injury”.
  - Safe alternative: “We’re sorry to hear this and want to understand what happened.”
- Incentives/solicitation:
  - [ ] No discounts, gifts, or “we’ll compensate you for updating/removing this review.”
  - [ ] No review gating (“contact us before posting”).
- Doxxing/personal data:
  - [ ] Do not name staff in contentious contexts; do not include phone/address of reviewer; do not confirm identity.
- Threats/retaliation:
  - [ ] No mention of legal action against reviewer; no intimidation.
- Competitor disparagement:
  - [ ] Do not accuse competitors; do not compare.

Platform policy alignment notes
Google Business Profile
- [ ] Do not offer incentives for reviews.
- [ ] Keep responses professional and relevant; avoid personal data.
Yelp
- [ ] Do not mention Yelp policy enforcement or removal promises (“Yelp will take this down”).
- [ ] Do not ask for review updates/removals; focus on resolution.

3) ESCALATION PLAYBOOK v3 (COMMON NEGATIVE SCENARIOS)
Escalation Levels
- L0: Safe to auto-draft + optional human approve.
- L1: Negative/service recovery—auto-draft but requires approval.
- L2: High-risk—manual-only hold (no posting) until reviewed.

Manual-only hold (DO NOT POST) triggers (L2)
- PHI/identity-sensitive: reviewer mentions diagnosis/treatment/appointment details, or response would confirm patient status.
- Legal threats: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “demand letter”.
- Safety incidents: injury, fire, gas leak mishandling, infection, assault, harassment threats.
- Active disputes with regulators/insurers where public reply can create admissions.

Routing SLAs
- Safety incident: Owner/GM within 4 hours; document incident ID.
- Billing dispute: Billing lead within 24 hours.
- Service quality complaint: Ops/Manager within 24 hours.
- Legal threat: Legal counsel same business day.

Evidence checklist (collect before any public reply)
- Review text + screenshots
- Internal job/order/appointment ID (do not reveal publicly)
- Timeline of interactions
- Staff statements (internal)
- Any recorded calls/messages (per consent laws)

Scenario guidance + safe public reply intent
A) Billing/pricing dispute (L1)
- Intent: acknowledge, invite offline resolution, no pricing details.
- Avoid: “We charged you correctly” in a combative way.
B) Alleged damage/injury (L2)
- Intent: do not admit fault; offer offline contact; internal investigation.
- Avoid: any admission or technical explanation.
C) HIPAA/PHI mention (L2)
- Intent: do not confirm; generic offline contact only.
D) Suspected fake review (L1)
- Intent: polite uncertainty; invite offline contact to verify; no accusations.
- Yelp note: do not talk about “reporting to Yelp”; keep neutral.
E) Discrimination/harassment accusations (L2)
- Intent: manual hold; route to Owner/HR; keep reply minimal if posted at all.

4) APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL)
Rules for all templates
- Allowed variables: [BUSINESS_NAME], [CONTACT_EMAIL], [CONTACT_PHONE], [SIGNOFF_NAME]
- Disallowed variables: patient/client name, appointment date/time, procedure/service details not already public, invoice amounts unless verified and safe.
- Required offline CTA: must include contact method.

A) DENTIST (Google/Yelp)
DENT-01 Positive
“Thank you for the kind words. We appreciate you taking the time to share your experience with [BUSINESS_NAME]. If there’s anything we can do for you in the future, please reach out at [CONTACT_PHONE] or [CONTACT_EMAIL].”
DENT-02 Neutral/short
“Thanks for your feedback. If you’d like to share more details so we can improve, please contact us at [CONTACT_EMAIL].”
DENT-03 Mild negative (service experience)
“Thank you for letting us know. We’re sorry to hear your visit didn’t meet expectations. We’d like to learn more and help—please contact us at [CONTACT_PHONE] or [CONTACT_EMAIL].”
DENT-04 Strong negative (manual approval required)
“We’re sorry to hear this and take your concerns seriously. Because we can’t discuss details here, we’d like to connect directly to understand what happened and see how we can help. Please contact [BUSINESS_NAME] at [CONTACT_PHONE] or [CONTACT_EMAIL].”
DENT-05 PHI-safe (L2 hold if reviewer shares clinical details)
“Thanks for your message. We can’t discuss or confirm details in a public forum, but we want to help. Please contact us directly at [CONTACT_PHONE] or [CONTACT_EMAIL] so we can address your concerns.”
DENT-06 Suspected fake (no accusations)
“Thank you for the feedback. We’re unable to match the situation described from the information provided, but we’d like to look into it. Please contact us at [CONTACT_EMAIL] with a phone number and best time to reach you.”

B) MED SPA (Google/Yelp)
MS-01 Positive
“Thank you for your review. We’re glad you had a great experience with [BUSINESS_NAME]. If you ever have questions or feedback, please contact us at [CONTACT_EMAIL].”
MS-02 Neutral
“Thanks for your feedback. We’re always working to improve and would welcome more details—please reach us at [CONTACT_EMAIL].”
MS-03 Mild negative (staff/wait time)
“We’re sorry to hear this. We strive to provide timely, professional service and would like to learn more. Please contact us at [CONTACT_PHONE] or [CONTACT_EMAIL].”
MS-04 Strong negative (no medical discussion)
“Thank you for sharing your concerns. We can’t address specifics here, but we’d like to speak with you directly and understand your experience. Please contact [BUSINESS_NAME] at [CONTACT_EMAIL] or [CONTACT_PHONE].”
MS-05 No guarantees language (outcomes complaint)
“We’re sorry you’re unhappy with your experience. Results and expectations can vary, and we’d like to discuss your concerns privately and review next steps. Please contact us at [CONTACT_EMAIL] or [CONTACT_PHONE].”
MS-06 Suspected fake
“Thank you for your review. We’d like to look into this, but we need a bit more information. Please contact us at [CONTACT_EMAIL] so we can connect directly.”

C) HVAC (Google/Yelp)
HV-01 Positive
“Thank you for the review. We appreciate you choosing [BUSINESS_NAME] and we’re glad we could help. If you need anything in the future, contact us at [CONTACT_PHONE] or [CONTACT_EMAIL].”
HV-02 Neutral
“Thanks for your feedback. If you’re open to sharing more details so we can improve, please contact us at [CONTACT_EMAIL].”
HV-03 Mild negative (timing/communication)
“We’re sorry to hear this. Reliable communication is important to us, and we’d like to make it right. Please contact us at [CONTACT_PHONE] or [CONTACT_EMAIL].”
HV-04 Strong negative (service quality)
“Thank you for letting us know. We take concerns like this seriously and would like to understand what happened. Please contact [BUSINESS_NAME] at [CONTACT_PHONE] or [CONTACT_EMAIL] so we can help.”
HV-05 Alleged damage (L2 manual hold recommended)
“We’re sorry to hear about your concern. We’d like to look into this promptly, but we can’t address details publicly. Please contact us at [CONTACT_PHONE] or [CONTACT_EMAIL].”
HV-06 Suspected fake
“Thank you for the feedback. We’d like to investigate, but we can’t identify the job from the information here. Please contact us at [CONTACT_EMAIL] with a phone number so we can follow up.”

5) GO/NO-GO EXIT CRITERIA (FOR LAUNCH)
Go only if all are true:
- Detectors: PHI + Legal threat + Incentive language + Liability admission + Competitor disparagement triggers verified with unit tests.
- Posting gates: manual-only hold blocks posting on both API and UI paths (evidence: blocked_manual_review status + no outbound post call).
- Audit logs: required schema fields present for draft/flag/approve/block/post events.
- Weekly report: KPI calculations match definitions; reconciliation passes (approved = posted + blocked + pending).

End of pack.