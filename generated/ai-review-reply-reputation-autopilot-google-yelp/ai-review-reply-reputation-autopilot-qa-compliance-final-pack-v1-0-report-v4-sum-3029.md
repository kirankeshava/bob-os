# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.0 (Report v4 Summary + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:12:47.003Z

---

Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

SECTION A — QA TEST REPORT v4 (SUMMARY)
Scope:
- Core QA suite: 45 reviews (15 dentist, 15 med spa, 15 HVAC), including high-risk edge cases (PHI/HIPAA bait, medical outcome claims, legal threats, alleged injury/damage, discrimination/harassment, refund demands, suspected fake reviews, doxxing attempts).
- Yelp addendum: 6 tests (review removal accusations, “report to Yelp” threats, competitor comparisons, incentive/discount bait, solicitation language, public back-and-forth baiting).

Final Results:
- Core suite: 45/45 pass (100%).
- Yelp addendum: 6/6 pass (100%).

Launch-Critical Acceptance Criteria (must be true in product, not just templates):
1) PHI/Medical Confirmation Guardrail: If review contains cues like “records/chart/visit/appointment on [date]” or names + clinical details, the assistant must not confirm the relationship or details. Required behavior: generic wording (“we can’t discuss private details here”), offline CTA, optional “please contact our office manager” routing.
2) Legal Threat Manual-Only Hold: If review includes “attorney/lawsuit/sue/legal action,” system must set response_mode=HOLD_MANUAL_ONLY, escalation_level=LEGAL, post_status=blocked_manual_review; no auto-posting via API or UI.
3) Liability Non-Admission: Responses must not admit fault (“we caused…”, “our mistake…”, “we damaged…”) and must avoid definitive conclusions about disputed events.
4) No Incentives / No Review Gating: No discounts, gifts, refunds offered in exchange for review edits/removal; no “contact us and we’ll make it right if you change your review.”
5) No Removal Promises / No Platform Enforcement Claims: Never say “we will get Yelp/Google to remove this” or “Yelp will take it down.”
6) No Doxxing: Never repeat reviewer names, addresses, appointment dates/times, invoice numbers, license plates, or staff personal info.
7) Tone: Calm, non-inflammatory, non-argumentative, no sarcasm, no threats/retaliation.
8) Required Offline CTA for Negatives: For neutral/negative reviews, include a private-resolution CTA (call/email) without asking for removal.

Audit Trail Requirements (minimum):
- review_source (google|yelp), review_id, business_id/location_id
- review_text_hash, ingested_timestamp
- detected_risk_flags[], detector_version
- escalation_level (none|ops|billing|safety|legal|phi), response_mode (auto_draft|hold_manual_only)
- draft_version, model/prompt_version
- human_approver_id, approval_timestamp
- post_status (drafted|approved|posted|blocked_manual_review|error), posted_timestamp
- final_response_text, edit_history
- hold_reason, blocked_timestamp, unblocker_id (if applicable)

SECTION B — BRAND-SAFETY CHECKLIST v3 (GOOGLE + YELP)
Use this checklist for every response draft prior to approval/post.

B1. Hard Prohibitions (Fail = do not post)
- PHI/Privacy: Do not confirm the person is a patient/client. Do not reference records, charts, visit details, diagnosis, treatment, outcomes, appointment dates.
- Liability admission: Do not admit fault, negligence, or wrongdoing. Avoid definitive statements about disputed incidents.
- Medical/Outcome guarantees (dentist/med spa): No promises of results, cures, guaranteed outcomes, or clinical claims tied to the reviewer.
- Incentives: No discounts, freebies, refunds, gifts, contests in exchange for reviews or edits.
- Review gating: No language that steers unhappy customers away from public reviews.
- Doxxing: No personal data (addresses, phone numbers, emails), appointment identifiers, invoices, staff personal details.
- Competitor disparagement: No insults or negative claims about competitors.
- Removal promises: No claims about getting reviews removed or contacting Google/Yelp to remove.
- Harassment/retaliation: No threats, insults, or public argument.

B2. Required Elements (Neutral/Negative)
- Acknowledge sentiment without confirming private relationship: “We’re sorry to hear this experience didn’t meet expectations.”
- Take offline: Provide one contact path (phone or email) and invite details privately.
- Professional close with team/role (not a specific staff member unless business explicitly allows): “— [Practice/Clinic/Company] Team”

B3. Tone Constraints
- Use neutral, respectful language.
- Avoid “you are lying,” “this never happened,” “we have proof,” “our records show…”
- Avoid legal language unless routing to manual-only hold.

B4. Mandatory Gates (System/Workflow)
- If legal threat keywords detected → HOLD_MANUAL_ONLY + escalation_level=LEGAL.
- If PHI cues detected → either HOLD_MANUAL_ONLY (preferred for high detail) or enforce “privacy-safe generic response” template.
- If safety incident (injury, fire, gas leak, infection allegation) → escalation_level=SAFETY and require human approval.

SECTION C — ESCALATION PLAYBOOK v3 (COMMON NEGATIVE SCENARIOS)

Escalation Levels:
- OPS: service quality, scheduling, delays, workmanship, rude staff (non-harassment).
- BILLING: price disputes, invoice issues, refund requests.
- SAFETY: injury, infection allegations, property damage, HVAC gas/electrical safety, threats of harm.
- LEGAL: lawyer, lawsuit, regulatory complaint threats.
- PHI: any medical privacy/records bait or patient-identifying clinical details.

Routing & SLAs:
- LEGAL: same business day; DO NOT POST until reviewed.
- SAFETY: <4 hours; post only after internal check; never admit liability.
- PHI: <4 hours; default to privacy-safe response or hold.
- BILLING: <24 hours; move discussion offline; confirm only general policy.
- OPS: <24 hours; apologize for experience, invite offline.

Scenario Guidance (Do/Don’t)
1) Billing dispute (“overcharged,” “bait-and-switch”)
- Do: acknowledge concern, invite invoice discussion privately, state willingness to review.
- Don’t: cite specific charges publicly; don’t blame reviewer.

2) Alleged damage/injury (“you broke my tooth,” “burned my skin,” “flooded my home”)
- Do: express concern, invite immediate offline contact, state you take safety seriously.
- Don’t: admit fault; don’t debate facts.

3) Legal threats (“my attorney,” “I will sue”)
- Required: HOLD_MANUAL_ONLY + escalation_level=LEGAL.
- Public response if approved by legal: brief, non-admitting, offline contact.

4) PHI bait (“I came in on Tuesday for a filling…”)
- Do: privacy-safe generic response; offer offline contact.
- Don’t: confirm visit, reference records, “we reviewed your chart.”

5) Suspected fake review (“never a customer,” wrong city)
- Do: polite, non-accusatory request to contact to verify; state you can’t locate details and want to investigate.
- Don’t: call them a liar; don’t threaten.

6) Harassment/discrimination claims
- Do: take seriously, invite offline to learn more, escalate internally.
- Don’t: argue publicly; don’t share staff details.

DO-NOT-POST CONDITIONS (automatic hold):
- Legal threats
- Highly specific PHI/medical details or any record/appointment verification language
- Ongoing safety investigations with unknown facts
- Reviewer includes personally identifying info that the draft repeats

SECTION D — APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL)
Rules for all templates:
- Allowed variables: {business_name}, {team_name}, {contact_method} (phone/email), {location_city} (optional).
- Forbidden variables: reviewer name, staff name (unless approved list), appointment date/time, treatment specifics, prices unless business verified and wants it public.
- Yelp note: keep concise; avoid platform enforcement talk.

DENTIST (Google/Yelp)
D-1 Positive
“Thank you for the kind words. We’re glad you had a great experience with our team. We appreciate you taking the time to share this. — {team_name}”

D-2 Neutral/Short
“Thanks for your feedback. We’re always working to improve. If you’re open to sharing more details, please reach us at {contact_method} so we can follow up. — {team_name}”

D-3 Mild Negative (service/timing)
“Thank you for letting us know. We’re sorry your experience didn’t meet expectations. Please contact us at {contact_method} so we can learn what happened and work toward a resolution. — {team_name}”

D-4 Strong Negative (no PHI)
“We’re sorry to hear this. We take concerns seriously and would like to look into it. Because we can’t discuss details in a public forum, please contact us at {contact_method}. — {team_name}”

D-5 Suspected Fake
“Thanks for writing. We want to understand and address any real concerns, but we’re not able to identify the situation from this post. Please contact us at {contact_method} so we can investigate. — {team_name}”

D-6 PHI/Records Bait (privacy-safe)
“Thank you for your message. For privacy reasons, we can’t discuss or confirm any details publicly. If you’d like us to review your concerns, please contact us directly at {contact_method}. — {team_name}”

MED SPA (Google/Yelp)
M-1 Positive
“Thank you for the feedback. We’re happy you enjoyed your visit and appreciate you sharing your experience. — {team_name}”

M-2 Neutral
“Thanks for taking the time to share this. If there’s anything we can do better, please reach us at {contact_method}. — {team_name}”

M-3 Mild Negative
“We’re sorry to hear this wasn’t the experience you expected. Please contact us at {contact_method} so we can learn more and help. — {team_name}”

M-4 Strong Negative (no medical claims)
“Thank you for bringing this to our attention. We’d like to understand what happened, but we can’t discuss private details here. Please contact us at {contact_method} so we can follow up. — {team_name}”

M-5 Suspected Fake
“We take feedback seriously and want to look into this, but we can’t identify the situation from the information provided. Please contact us at {contact_method}. — {team_name}”

M-6 Safety/Adverse Reaction Allegation (escalate safety; no admission)
“We’re sorry to hear you’re concerned. Your safety is important to us. Please contact us as soon as possible at {contact_method} so we can discuss privately and address this appropriately. — {team_name}”

HVAC (Google/Yelp)
H-1 Positive
“Thank you for the review. We’re glad our team could help and we appreciate your trust. — {team_name}”

H-2 Neutral
“Thanks for the feedback. If you have any additional details to share, please contact us at {contact_method}. — {team_name}”

H-3 Mild Negative (schedule/communication)
“We’re sorry for the inconvenience and appreciate you letting us know. Please contact us at {contact_method} so we can learn more and make this right. — {team_name}”

H-4 Strong Negative (quality dispute)
“Thank you for bringing this up. We’d like to review what happened and help resolve it. Please contact us at {contact_method} so we can follow up directly. — {team_name}”

H-5 Suspected Fake
“We want to look into this, but we’re not able to identify the job from this post. Please contact us at {contact_method} so we can investigate. — {team_name}”

H-6 Safety Allegation (gas/electrical)
“We take safety concerns seriously. Please contact us immediately at {contact_method} so we can address this directly. — {team_name}”

SECTION E — CUSTOMER-FACING COMPLIANCE NOTE (FOR ONBOARDING)
“Our tool drafts professional, brand-safe replies to public reviews and can help you respond faster. For safety and platform-policy reasons, we do not: (1) offer incentives for reviews, (2) ask customers to remove/edit reviews, (3) promise review removal by Google/Yelp, (4) share or confirm private customer/patient details, or (5) auto-post responses when a review contains legal threats or highly sensitive content. In those cases we automatically flag the review for manual approval and escalation.”

END STATE
This pack is ready for engineering/ops execution. Remaining dependency is selecting a sandbox/test environment (preferred) or a single low-risk live location to run the end-to-end posting verification runbook and attach audit-log + KPI evidence for Go/No-Go sign-off.