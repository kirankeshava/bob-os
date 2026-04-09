# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.3 (Checklist v3 + Playbook v3 + Templates v3 + QA Report v4 Summary)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:26:39.712Z

---

BUSINESS CONTEXT
Product: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Legitimacy URL to reference in comms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-t1iumsb6.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

==============================
A) QA TEST REPORT v4 — EXECUTIVE SUMMARY (for handoff)
==============================
Scope tested:
- 45 core reviews (15 Dentist, 15 Med Spa, 15 HVAC) including high-risk edge cases: PHI/HIPAA mentions, medical outcome demands, pricing/billing disputes, discrimination/harassment language, doxxing attempts, competitor accusations, refund demands, alleged damage/injury, legal threats, suspected fake reviews.
- 6 Yelp-specific edge cases: review removal accusations, competitor comparisons, solicitation/incentive-adjacent language, reviewer discount demands, threats to “report to Yelp,” and baiting for public arguments.

Final results:
- Core suite: 45/45 pass (100%).
- Yelp addendum: 6/6 pass (100%).

Key guardrails required for this result:
1) PHI/medical privacy guardrail: hard block/rewriter on phrases that imply confirmation of a patient relationship or record lookup (e.g., “your chart/records/visit/appointment”). Response must remain generic (“we can’t discuss details here”) and move offline.
2) Legal-threat guardrail: detector for “lawyer/attorney/sue/lawsuit/legal action” etc. that forces response mode = HOLD (manual-only). System must set escalation_level=Legal and post_status=blocked_manual_review.
3) Incentives + review gating ban: no discounts, gifts, “contact us for a refund if you remove/update,” no requests to change ratings.
4) Doxxing prevention: do not repeat addresses, phone numbers, full names of staff, or appointment dates/times from the review.
5) Liability/non-admission: no statements that admit fault (“we broke/damaged/overcharged”) unless the business operator explicitly provides verified facts in an internal note; default to empathy + investigate offline.

Launch gating (objective):
- Posting gate must prevent any auto-post when post_status=blocked_manual_review.
- Audit trail must log draft_created, flagged, approved, blocked, posted events with required fields (see Checklist section C).
- Weekly report reconciliation must match counts: approved vs posted vs blocked, and response-rate calculations must exclude blocked items.

Residual risk notes:
- Prompt/template safety is necessary but not sufficient—enforcement must exist both pre-generation (to steer draft) and pre-post (to block violations).
- Yelp/Google policies can evolve; schedule quarterly policy review and rerun the suite.

==============================
B) BRAND-SAFETY CHECKLIST v3 (Google + Yelp)
==============================
Use this before approving any response. If any “FAIL” item is true, response must be edited or set to HOLD (manual-only) depending on severity.

B1. Universal MUST-HAVES (PASS/FAIL)
[ ] Tone is calm, polite, non-argumentative; no sarcasm or retaliation.
[ ] Includes an offline resolution CTA (phone/email) and avoids prolonged public debate.
[ ] Does NOT ask for incentives or imply incentives for review changes.
[ ] Does NOT request the reviewer to remove/update rating (no review gating).
[ ] Does NOT mention internal policy enforcement (“we will have Yelp remove this”).
[ ] Does NOT include personal data about the reviewer or staff; does not repeat doxxing.
[ ] Does NOT mention protected-class attributes or make discriminatory statements.

B2. PHI / Medical Privacy (Dentist + Med Spa particularly)
FAIL conditions (block or rewrite):
- Any confirmation the reviewer is a patient/customer if the review implies medical treatment.
- Any reference to “your chart/records/visit/appointment/results/x-rays/photos” or similar.
Allowed safe pattern:
- “We can’t discuss any details here, but we take concerns seriously. Please contact [channel] so we can look into this privately.”

B3. Medical / Outcome Claims (Med Spa and Dentist)
FAIL:
- Guarantees or promises of outcomes: “we guarantee results,” “permanent,” “no side effects,” “100% effective.”
- Claims that contradict reviewer’s experience (“that can’t happen”).
Allowed:
- General statements: “Results can vary; we’d like to discuss your concerns offline.”

B4. Liability / Damage / Safety Incidents
FAIL:
- Admitting liability: “We damaged your unit,” “We caused injury,” “We made a mistake,” unless verified and approved by owner/legal.
- Assigning blame to reviewer.
Required:
- Empathy + investigate offline + escalation if alleged damage/injury.

B5. Legal Threats
Trigger words: attorney, lawyer, lawsuit, sue, legal action, demand letter, court.
Action:
- MUST set HOLD (manual-only). Do not post an auto-response.
- Escalation_level=Legal. Require owner/legal approval for any public reply.

B6. Incentives / Discounts / Solicitation
FAIL:
- “Contact us for a discount,” “we’ll refund you,” “we’ll comp you,” tied to review.
- “We appreciate 5-star reviews.”
Allowed:
- A neutral invitation to contact offline with no mention of compensation.

B7. Competitor/Defamation
FAIL:
- “Our competitor is lying,” “they are scammers.”
Allowed:
- “We can’t speak to other businesses; we’d like to address your experience directly.”

B8. Platform policy alignment notes
Google Business Profile:
- Keep it short, helpful, and professional; no personal data.
Yelp:
- Avoid back-and-forth; never imply ability to influence Yelp moderation/removal.

==============================
C) ESCALATION PLAYBOOK v3 (routing + SLAs + do-not-post)
==============================
Escalation levels
L0 = Normal: can auto-draft + human approve + post.
L1 = Ops follow-up: service quality, scheduling, rude staff; can post with offline CTA.
L2 = Sensitive: billing dispute, refund demand, alleged property damage; post only with cautious non-admission language + notify manager.
L3 = Safety/Privacy: PHI mention, harassment/doxxing, safety incident; restrict public detail; often HOLD.
L4 = Legal: legal threat; MUST HOLD (manual-only).

Routing SLAs (internal)
- Safety incident (injury/fire/gas leak): Owner/GM within 4 hours; Ops same-day.
- PHI/privacy: Compliance/Owner within 4 hours.
- Billing dispute/refund: Billing lead within 24 hours.
- Service quality/scheduling: Ops manager within 24 hours.
- Legal threats: Legal/Owner same-day; HOLD.

Evidence to collect (internal, not public)
- Review screenshot + URL, timestamps, location ID.
- Work order/appointment ID (if known internally), technician notes, call recordings.
- For billing: invoice, payment method, refund policy.
- For alleged damage: photos, pre/post condition notes, technician report.

DO-NOT-POST conditions (auto-block to manual-only hold)
- Any legal threat language (L4).
- Any PHI/medical record confirmation risk that cannot be rewritten safely (L3).
- Active safety investigation (gas leak, fire hazard, injury claim) where facts are unknown (L3 HOLD recommended).
- Threats/harassment/doxxing that could inflame situation; consider a minimal “please contact us” only if safe.

Public response patterns by scenario (safe defaults)
1) Billing dispute (L2): acknowledge concern, state you want to review billing privately, ask for contact, do not argue.
2) Alleged damage (L2/L3): express concern, state you take it seriously, ask for direct contact, do not admit fault.
3) Discrimination claim (L3): take seriously, invite offline + offer owner contact; HOLD if details could escalate.
4) PHI mention (L3): do not confirm they are a patient; generic privacy statement + offline.
5) Suspected fake review (L1/L2): state you can’t find details, invite them to contact with info, avoid accusing.
6) Legal threat (L4): HOLD; internal response only.

==============================
D) APPROVED RESPONSE TEMPLATES LIBRARY v3 (ready to paste)
==============================
Rules for all templates:
- Allowed variables: {BusinessName}, {FirstNameOrTeam} (do not use staff full names), {ContactMethod} (phone/email), {City}, {ServiceCategory}.
- Forbidden variables: appointment date/time, treatment details, pricing details unless explicitly verified and approved, reviewer name if it reveals identity, any PHI.
- Always include offline CTA.

D1) DENTIST TEMPLATES
DENT-01 Positive (Google/Yelp)
“Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. If there’s ever anything we can do to make your next visit even better, please reach us at {ContactMethod}.”

DENT-02 Neutral/short praise
“Thanks for taking the time to leave feedback. We appreciate you choosing {BusinessName}. If you have suggestions we can learn from, please contact us at {ContactMethod} so we can follow up.”

DENT-03 Mild negative (wait time/communication) — L1
“Thank you for sharing this. We’re sorry to hear the experience didn’t meet expectations. We’d like to learn more and address this directly—please contact us at {ContactMethod} so we can help.”

DENT-04 Strong negative (pain/poor bedside manner) — L2
“We’re sorry you felt let down. We take patient concerns seriously, and we’d like to look into what happened. Because we can’t discuss details here, please contact {BusinessName} at {ContactMethod} so we can follow up privately.”

DENT-05 PHI-sensitive mention in review — L3 (public-safe)
“Thank you for your feedback. To protect privacy, we can’t discuss anything specific in a public forum. We’d like to understand your concerns and help—please contact us at {ContactMethod} so we can speak privately.”

DENT-06 Suspected fake/can’t locate — L1/L2
“Thank you for posting. We take feedback seriously, but we’re not able to identify the situation from the information here. Please contact us at {ContactMethod} with details so we can look into it directly.”

DENT-07 Legal threat — L4 (HOLD / internal-only marker)
SYSTEM ACTION: post_status=blocked_manual_review, escalation_level=Legal. No auto-post.
Suggested internal draft (NOT for posting without approval): “We’d like to address your concerns. Please contact {ContactMethod} so we can route this to the appropriate person.”

D2) MED SPA TEMPLATES
SPA-01 Positive
“Thank you for the review. We’re happy you enjoyed your experience at {BusinessName}. If you have any questions before your next visit, reach us at {ContactMethod}.”

SPA-02 Neutral
“Thanks for your feedback. We appreciate you choosing {BusinessName}. If there’s anything we could have done better, please contact us at {ContactMethod}.”

SPA-03 Mild negative (front desk, scheduling) — L1
“We’re sorry to hear this and appreciate you letting us know. We’d like to make it right—please contact us at {ContactMethod} so we can follow up.”

SPA-04 Outcome dissatisfaction (no guarantees) — L2
“Thank you for sharing your concerns. Results and experiences can vary, and we’d like to understand what happened and discuss options privately. Please contact {BusinessName} at {ContactMethod}.”

SPA-05 Safety/side-effect mention — L3 recommended
“We’re sorry to hear you’re dealing with this. We take safety concerns seriously and want to follow up directly. Because we can’t discuss details here, please contact us at {ContactMethod} as soon as you can.”

SPA-06 PHI/privacy mention — L3
“To protect everyone’s privacy, we can’t discuss any specifics publicly. We’d like to help—please contact us at {ContactMethod} so we can follow up privately.”

SPA-07 Legal threat — L4 HOLD
SYSTEM ACTION: blocked_manual_review + escalation_level=Legal.

D3) HVAC TEMPLATES
HVAC-01 Positive
“Thank you for the review. We’re glad we could help and appreciate you choosing {BusinessName}. If you ever need anything else, reach us at {ContactMethod}.”

HVAC-02 Neutral
“Thanks for the feedback. We appreciate the opportunity to serve you. If you’d like to share more details, please contact us at {ContactMethod}.”

HVAC-03 Mild negative (lateness/no-show) — L1
“We’re sorry about the inconvenience and appreciate you letting us know. We’d like to look into this and improve—please contact us at {ContactMethod} so we can follow up.”

HVAC-04 Pricing dispute — L2
“Thank you for your feedback. We understand billing concerns can be frustrating. We’d like to review this with you directly—please contact us at {ContactMethod} so we can look into the details.”

HVAC-05 Alleged damage — L2/L3
“We’re sorry to hear this and take the concern seriously. We’d like to investigate and address it promptly. Please contact {BusinessName} at {ContactMethod} so we can follow up directly.”

HVAC-06 Suspected fake/can’t locate
“Thanks for posting. We’re not able to identify the job from the information here, but we want to help. Please contact us at {ContactMethod} with details so we can look into it.”

HVAC-07 Safety incident (gas leak/fire hazard) — L3 HOLD recommended
SYSTEM ACTION: escalation_level=Safety, consider blocked_manual_review unless facts verified.
Public-safe variant if allowed: “We take safety concerns very seriously. Please contact us at {ContactMethod} immediately so we can follow up directly.”

==============================
E) IMPLEMENTATION NOTES (minimal, for engineering)
==============================
- Enforce guardrails at two points: (1) pre-generation steering (prompt/template selection) and (2) pre-post gate (hard block if flags present).
- Required log fields for compliance traceability: review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode (AUTO vs HOLD), draft_version, model/prompt version, human_approver_id, approval_timestamp, post_status (approved/posted/blocked_manual_review/error), posted_timestamp, error_code, hold_reason, detector_version.
- Weekly KPI reconciliation: response_rate uses posted responses only; blocked_manual_review counted separately; median response time computed only for posted items.
