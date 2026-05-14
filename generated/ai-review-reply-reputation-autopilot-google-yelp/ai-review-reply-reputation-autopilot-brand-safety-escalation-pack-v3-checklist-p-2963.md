# AI Review Reply & Reputation Autopilot — Brand Safety & Escalation Pack v3 (Checklist + Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:50:31.865Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Brand Safety & Escalation Pack v3
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

1) Brand-Safety Checklist v3 (Operational, Tick-Box)
Use this checklist for every response draft BEFORE approval and again BEFORE posting.

A. Universal “DO NOT” (Hard Block / Manual-Only Hold)
If any item is true, do not auto-post. Set post_status=blocked_manual_review, record hold_reason, and escalate.
[ ] PHI/HIPAA risk: The response would confirm or imply patient/client status, treatment, appointment, chart/records, diagnosis, procedure, or any visit details (e.g., “we reviewed your chart/records/visit”).
[ ] Legal threat: Reviewer mentions attorney/lawyer, lawsuit, sue/sued, legal action, demand letter, subpoena.
[ ] Safety incident: fire/carbon monoxide/electrical hazard, injury, assault, “unsafe,” negligence causing harm.
[ ] Harassment/hate or threats of violence in the review (respond with minimal de-escalation; do not engage).
[ ] Doxxing: review contains personal data (phone/email/address) or names of staff; response must not repeat it.

B. Universal Prohibited Content (Must Not Appear)
[ ] Admitting liability or fault: “we were at fault,” “we caused,” “our mistake caused damage,” “we broke.”
[ ] Medical/clinical guarantees or outcome promises: “cure,” “guaranteed results,” “permanent,” “no pain,” “works for everyone.”
[ ] Incentives/solicitation: offering discounts, gifts, refunds in exchange for reviews; asking for 5-star reviews.
[ ] Review gating: asking happy customers to review while routing unhappy customers elsewhere.
[ ] Retaliation/threats: “we’ll report you,” “we’ll sue,” “we’ll have you removed,” “we know who you are.”
[ ] Competitor disparagement or accusations; do not imply reviewer is a competitor.
[ ] Claims about platform enforcement: “Yelp/Google will remove this,” “we’ll get this taken down.”

C. Required Elements (Should Appear in Nearly All Responses)
[ ] Thank the reviewer (even if negative) with calm, non-judgmental language.
[ ] No confirmation of customer relationship if sensitive: use generic phrasing (“we aim to provide…”).
[ ] Take it offline: provide a single, clear CTA to contact the business (phone/email) without revealing private info.
[ ] Keep it short; no point-by-point arguments; avoid defensiveness.
[ ] If the reviewer is angry: acknowledge feelings without validating disputed facts (“we’re sorry to hear…”).

D. Platform Notes (Google Business Profile vs Yelp)
Google Business Profile:
- OK to invite them to contact you to resolve.
- Avoid discussing policy enforcement or removal.
Yelp:
- Extra caution: no mention of “reporting to Yelp,” removal requests, or public back-and-forth.
- Avoid promotional language that can look like solicitation.

E. Tone Constraints (Must Pass)
[ ] Neutral-professional, not sarcastic, not “fight the reviewer.”
[ ] No absolutes (“always/never”) and no “you” blame.
[ ] Avoid diagnosing motives (“you’re lying,” “fake,” “extortion”). If suspected fake: keep generic.

F. Audit Trail (Must Be Logged)
For every review and response attempt:
[ ] review_source (Google/Yelp), review_id, business_id/location_id
[ ] review_text_hash
[ ] detected_risk_flags (PHI, Legal, Safety, Incentive, Doxxing, Harassment, Competitor)
[ ] escalation_level and hold_reason when applicable
[ ] draft_version + model/prompt/detector_version
[ ] approver_id + approval_timestamp
[ ] post_status + posted_timestamp OR blocked_timestamp + unblocker_id

2) Escalation Playbook v3 (Common Negative Scenarios)
Purpose: ensure dangerous categories are routed internally and prevent unsafe/public replies.

Escalation Levels
Level 0: Normal (safe to respond using templates)
Level 1: Ops Follow-up (service quality, scheduling, rude staff)
Level 2: Billing/Refund (pricing disputes, charges, warranty)
Level 3: Safety Incident (injury/hazard) — manual-only hold
Level 4: PHI/Medical Privacy risk — manual-only hold
Level 5: Legal Threat/Defamation — manual-only hold

Routing + SLA (internal)
- Level 1 Ops: notify Ops Manager; respond within 24h.
- Level 2 Billing: notify Billing/Owner; respond within 24h.
- Level 3 Safety: notify Owner/GM immediately; initial acknowledgment within 4h, but only after internal review.
- Level 4 PHI: notify Owner + Compliance lead (if any) same-day; do not confirm relationship publicly.
- Level 5 Legal: notify Owner + Legal counsel same-day; no public response until reviewed.

Evidence to Collect (before any manual response)
- Screenshot of review, timestamp, platform link, reviewer handle
- Work order / appointment lookup (internal only) without copying details into public response
- Staff statements; relevant photos; call logs; invoice/receipt
- Prior communications with reviewer (email/SMS) stored internally

Scenario Guidance (what to do and what not to do)
A) Billing Dispute / “You overcharged me” (Level 2)
DO: acknowledge concern, invite offline contact, offer to review account privately.
DON’T: quote line-item pricing publicly unless reviewer already posted it and you can verify.

B) Service Quality / “Technician was late/rude” (Level 1)
DO: apologize for experience, state you take feedback seriously, invite offline.
DON’T: blame reviewer; don’t argue.

C) Alleged Damage / “They broke my equipment” (Level 3)
DO: acknowledge and escalate internally; invite offline contact for investigation.
DON’T: admit fault, promise payment publicly, or describe internal findings.

D) Medical Outcome Complaint (Dentist/Med Spa) (Level 4 if PHI risk; else Level 1)
DO: generic empathy; offline CTA.
DON’T: confirm treatment, outcomes, or “we reviewed your chart.” No guarantees.

E) Discrimination / Harassment Claim (Level 3 or 5 depending on legal language)
DO: neutral acknowledgment; escalate; offline CTA.
DON’T: debate publicly; don’t name staff.

F) Suspected Fake Review (Level 1)
DO: keep generic: “We can’t locate details; please contact us.”
DON’T: call them a liar/competitor; don’t threaten.

“DO NOT POST” Conditions (Always Manual-Only Hold)
- Any PHI confirmation risk
- Any legal threat language
- Any safety incident with injury/hazard
- Any review containing personal data or staff names (response must not repeat)

3) Approved Response Template Library v3 (Per Vertical)
Rules for all templates
- Allowed variables: {BusinessName}, {SupportEmail}, {SupportPhone}, {FirstNameOptional} (only if reviewer name is public), {CityOptional}
- Never insert: appointment dates, procedure names, diagnosis, chart/records, staff last names, pricing not verified.
- Always include offline CTA. For Yelp, avoid anything that reads like a promotion.

3.1 Dentist Templates (Google/Yelp)
DENT-01 Positive
“Thank you for the kind words. We’re glad you had a good experience with {BusinessName}. If there’s anything we can do to help in the future, feel free to reach us at {SupportPhone} or {SupportEmail}.”

DENT-02 Neutral/Short
“Thanks for your feedback. If you’re open to sharing more details, please contact us at {SupportEmail} so we can follow up.”

DENT-03 Mild Negative (service/friction)
“Thank you for letting us know. We’re sorry to hear your visit didn’t meet expectations. We’d like to learn more and see how we can make it right—please contact us at {SupportPhone} or {SupportEmail}.”

DENT-04 Strong Negative (no PHI confirmation)
“We’re sorry to hear about your experience. We take concerns like this seriously and would like to look into it. For privacy reasons, we can’t discuss details here—please contact our office at {SupportPhone} or {SupportEmail} so we can help.”

DENT-05 Suspected Fake/Unknown Reviewer
“Thank you for the review. We’re unable to locate enough information to understand what happened from this post, but we’d like to help. Please contact {BusinessName} at {SupportEmail} or {SupportPhone} so we can look into your concern.”

DENT-06 Medical Outcome/Complication (auto-hold if PHI terms appear)
“We’re sorry to hear you’re feeling this way. We’d like to discuss your concerns directly and privately. Please contact us at {SupportPhone} or {SupportEmail} so we can assist.”

3.2 Med Spa Templates (Google/Yelp)
MEDSPA-01 Positive
“Thank you for your feedback. We’re happy you enjoyed your experience at {BusinessName}. If you have any questions, reach us anytime at {SupportEmail}.”

MEDSPA-02 Neutral
“Thanks for sharing your experience. If you’d like to provide more detail, please contact us at {SupportEmail}.”

MEDSPA-03 Mild Negative (service expectation)
“We’re sorry to hear this wasn’t what you expected. We’d like to learn more and address your concerns—please reach out at {SupportPhone} or {SupportEmail}.”

MEDSPA-04 Strong Negative (privacy-safe)
“Thank you for bringing this to our attention. We take feedback seriously. For privacy reasons we can’t discuss details publicly, but we’d like to speak with you directly. Please contact {SupportEmail} or {SupportPhone}.”

MEDSPA-05 No-Show / Cancellation Dispute (avoid blame)
“We’re sorry for any frustration around scheduling. We’d like to review what happened and help find a resolution—please contact us at {SupportEmail}.”

MEDSPA-06 Outcome/Reaction Complaint (no medical advice)
“We’re sorry to hear you’re concerned. We want to make sure you get support promptly. Please contact us directly at {SupportPhone} or {SupportEmail} so we can assist privately.”

3.3 HVAC Templates (Google/Yelp)
HVAC-01 Positive
“Thank you for choosing {BusinessName}. We appreciate the review and we’re glad we could help. If you ever need us, contact {SupportPhone}.”

HVAC-02 Neutral
“Thanks for the feedback. If you’re willing to share more details, please reach us at {SupportEmail} so we can follow up.”

HVAC-03 Mild Negative (timing/communication)
“We’re sorry to hear this. We work hard to communicate clearly and arrive on time. Please contact us at {SupportPhone} or {SupportEmail} so we can learn more and address it.”

HVAC-04 Strong Negative (damage allegation—no liability)
“Thank you for letting us know. We’re sorry to hear about your experience and we’d like to look into this right away. Please contact {BusinessName} at {SupportPhone} or {SupportEmail} so we can review the details privately.”

HVAC-05 Suspected Fake/Unknown Job
“We take feedback seriously, but we can’t identify the job from this post. Please contact us at {SupportEmail} with any details you can share so we can investigate.”

HVAC-06 Safety Concern (manual-only hold recommended)
“Thank you for raising this. Safety is extremely important to us. Please contact us at {SupportPhone} or {SupportEmail} as soon as possible so we can address your concern directly.”

4) Ongoing QA / Regression Cadence (Ops Ready)
- Weekly: sample 10% of posted responses for checklist compliance; verify offline CTA present and no forbidden language.
- Monthly: re-run the 45-case suite + 6 Yelp edge cases; confirm detector versions unchanged or re-validated.
- Any model/prompt change: run full suite before release; require Go/No-Go sign-off.

5) Release/Go-No-Go (Summary)
GO only if:
- Manual-only holds cannot be posted via API or UI (blocked_manual_review enforced)
- Audit logs contain all required fields/events
- Weekly KPI report reconciles counts: approved vs posted vs blocked
- 45+6 suite passes at 100% with current model/prompt/detectors

This pack is ready for engineering implementation and ops execution; it is designed to keep responses brand-safe, non-inflammatory, privacy-preserving, and aligned with Google Business Profile and Yelp policies (no incentives, no fake reviews, no removal promises, no doxxing, no PHI confirmation).