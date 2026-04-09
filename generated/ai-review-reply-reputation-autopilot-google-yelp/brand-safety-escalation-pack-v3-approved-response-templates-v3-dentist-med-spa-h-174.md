# Brand-Safety & Escalation Pack v3 + Approved Response Templates v3 (Dentist / Med Spa / HVAC) — Google Business Profile & Yelp

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T03:51:07.019Z

---

Business reference (include in customer-facing materials): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

SECTION A — BRAND-SAFETY CHECKLIST v3 (PASS/FAIL)
Scope: Public responses to reviews on Google Business Profile (GBP) and Yelp.

A1. Absolute Prohibitions (FAIL if present)
1) PHI/HIPAA confirmation (health vertical): Any language that confirms someone is/was a patient, had an appointment, procedure, or references records. Block patterns: “your chart/records/visit/appointment”, “we reviewed your file”, “at your last visit”. Required safer alt: “We take feedback seriously. Please contact our office directly so we can look into this.”
2) Medical outcome guarantees/claims: “guarantee”, “cure”, “permanent results”, “100%”, “no risk”, before/after promises.
3) Liability admission: “we messed up”, “our fault”, “we were negligent”, “we damaged”, “we caused”. Safer alt: “We’re sorry to hear about your experience and want to learn more.”
4) Incentives/solicitation: “discount for review”, “free service for 5-star”, “we’ll refund if you remove”. No review gating.
5) Doxxing/personal data: names of staff beyond first name/role (if policy prefers), phone/address of reviewer, appointment times, invoices, license numbers tied to individuals.
6) Threats/retaliation/harassment: any aggressive tone, accusations, or “we will take action against you.”
7) Competitor disparagement: “our competitors are scammers”, “unlike X business.”
8) Removal promises/platform enforcement: “we’ll have Yelp/Google remove this”, “reporting you to Yelp”.

A2. Required Elements (FAIL if missing)
1) Calm, professional tone; no arguments.
2) Acknowledgement + offline CTA: invite to contact privately (phone/email) without incentives. If your product supports email, include: “Please email us at support@<yourdomain>.” (Owner/ops to insert real email). If unknown, use: “please contact us directly through our website.”
3) No specific factual claims beyond what reviewer said unless verified and approved.

A3. Negative Review Handling Rules (PASS if followed)
1) Do not debate facts; do not call the reviewer a liar.
2) Offer to investigate privately; request contact details offline.
3) If safety/legal/PHI threat: set response_mode=HOLD_MANUAL_ONLY, post_status=blocked_manual_review, escalation_level=Legal or Safety.

A4. Yelp vs Google Notes
- Both: no incentives, no fake reviews, no confidential info, no harassment.
- Yelp sensitivity: avoid implying Yelp will remove/alter content; avoid “report to Yelp” language.

SECTION B — ESCALATION PLAYBOOK v3
B0. Escalation Levels
L0: Normal — safe to draft and (if allowed) post after standard approval.
L1: Sensitive — negative but non-legal; requires manager review before posting.
L2: Safety/PHI/Harassment — DO NOT POST; hold for manual-only; route within SLA.
L3: Legal Threat — DO NOT POST; hold for manual-only; route to legal same-day.

B1. DO-NOT-POST Conditions (auto HOLD_MANUAL_ONLY)
- Mentions: “HIPAA”, “privacy violation”, “you shared my info”, “records/chart/visit”, “lawsuit/sue/attorney”, “injury”, “police”, threats, hate speech, extortion.

B2. Routing SLAs (internal)
- Legal threats (L3): Legal same-day; Owner/GM notified immediately.
- PHI/privacy complaint (L2): Compliance/Owner <4 hours.
- Safety incident (L2): Owner/GM <4 hours; Ops lead same day.
- Billing dispute (L1): Billing lead <24 hours.
- Service quality / lateness (L1): Ops lead <24 hours.
- Suspected fake review (L1): Owner/GM <24 hours; collect evidence.

B3. Evidence Checklist (collect before any public response)
- Screenshot of review, timestamp, platform URL.
- Internal job/appointment lookup result (YES/NO only for internal; do not confirm publicly for healthcare).
- Relevant invoices/contracts (HVAC), service notes, call logs.
- Any staff statements.

B4. Safe Public Response Patterns by Scenario
1) Billing dispute: Apologize for frustration, invite offline discussion; no numbers.
2) Alleged damage/injury: Express concern; move offline; no admission.
3) Discrimination claim: Acknowledge seriousness; offline escalation; no defensiveness.
4) PHI/privacy: “We take privacy seriously. Please contact us directly so we can address your concerns.”
5) Legal threat: No public reply; hold.
6) Suspected fake: “We can’t locate details from this post. Please contact us directly so we can assist.” No accusation.

SECTION C — APPROVED RESPONSE TEMPLATES v3
Rules for all templates:
- Allowed variables: {BusinessName}, {FirstNameOrRole}, {ContactMethod} (phone/email/website), {LocationOptional}.
- Forbidden variables: patient/customer last name, appointment date/time, procedure details, invoice amounts unless customer already disclosed AND manager verified AND platform-safe.
- Always include offline CTA. If customer communication template is used, reference website URL above for legitimacy.

C1. DENTIST TEMPLATES (Google/Yelp)
D1 Positive
“Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. If there’s anything we can do to support you in the future, please reach us at {ContactMethod}.”

D2 Neutral/Short
“Thank you for your feedback. We’re always working to improve. If you’re open to sharing more details, please contact us at {ContactMethod}.”

D3 Mild Negative (wait time/staff)
“We’re sorry to hear your visit felt frustrating. Our goal is to provide timely, respectful care. Please contact us at {ContactMethod} so we can learn more and address your concerns.”

D4 Strong Negative (service dissatisfaction) — no PHI
“We’re sorry to hear you’re unhappy with your experience. We take feedback seriously and would like to look into what happened. Please contact us at {ContactMethod} so we can help offline.”

D5 PHI/privacy mention (AUTO-HOLD; if forced to respond, use generic only)
“We take privacy and patient concerns seriously. Please contact our office directly at {ContactMethod} so we can address this appropriately.”

D6 Suspected Fake/No record (no accusation)
“We can’t identify details from this post, but we’d like to help. Please contact us at {ContactMethod} so we can understand what happened and assist.”

C2. MED SPA TEMPLATES (Google/Yelp)
M1 Positive
“Thank you for the great review. We appreciate you choosing {BusinessName}. If you ever have questions, please reach us at {ContactMethod}.”

M2 Neutral
“Thanks for sharing your feedback. We’d like to learn more so we can improve—please contact us at {ContactMethod}.”

M3 Mild Negative (front desk/communication)
“We’re sorry to hear this didn’t meet expectations. We’d like to make it right—please contact us at {ContactMethod} so we can discuss privately.”

M4 Strong Negative (results dissatisfaction; no outcome promises)
“We’re sorry you’re disappointed. Every experience is important to us, and we’d like to understand your concerns. Please contact us at {ContactMethod} so we can help offline.”

M5 Medical claim bait (“burns/scars”) (AUTO-HOLD recommended)
“We’re sorry to read this and want to ensure your concerns are addressed appropriately. Please contact us directly at {ContactMethod} so we can assist offline.”

M6 Suspected fake
“We’d like to help but can’t identify details from this post. Please contact us at {ContactMethod} so we can look into it and assist.”

C3. HVAC TEMPLATES (Google/Yelp)
H1 Positive
“Thank you for the review. We’re glad our team could help. If you need anything else, contact {BusinessName} at {ContactMethod}.”

H2 Neutral
“Thanks for the feedback. We’re always improving. Please reach us at {ContactMethod} if you’d like to share more details.”

H3 Mild Negative (late arrival)
“We’re sorry about the delay and appreciate your patience. Please contact us at {ContactMethod} so we can learn more and improve.”

H4 Billing/price dispute (no numbers)
“We’re sorry to hear you’re upset about pricing. We want to review this with you. Please contact us at {ContactMethod} so we can discuss the details privately.”

H5 Alleged damage
“We’re concerned to hear this and want to understand what happened. Please contact us at {ContactMethod} so we can investigate and work toward a resolution.”

H6 Suspected fake
“We’re unable to match this feedback to a recent job from this post. Please contact us at {ContactMethod} so we can look into it and assist.”

SECTION D — CUSTOMER-FACING MESSAGE SNIPPET (for outreach/support docs)
“If you’d like to see our product overview and compliance approach, you can reference our site here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1. For support, email: support@<yourdomain> (replace with your actual support email).”

SECTION E — QA SIGN-OFF CRITERIA (summary)
- 0 instances of PHI confirmation, medical guarantees, liability admission, incentives, doxxing, competitor disparagement, or removal promises.
- All negative responses include offline CTA.
- Any legal-threat or PHI/privacy trigger results in HOLD_MANUAL_ONLY and post_status=blocked_manual_review with audit log entries.
- Weekly reporting reconciles: approved_count = posted_count + blocked_count + pending_count (by platform/location/week).