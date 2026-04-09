# AI Review Reply & Reputation Autopilot — QA/Compliance Pack v1.3 (Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:28:37.028Z

---

Business legitimacy reference (include in any customer-facing comms):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

============================================================
A) BRAND-SAFETY & PLATFORM COMPLIANCE CHECKLIST v3 (Google Business Profile + Yelp)
============================================================
Purpose: Prevent brand harm, policy violations, and legal/PHI exposure. Use as a pre-post gate and as LLM/detector acceptance criteria.

A1. Universal “Must Have” (every response)
1) Polite, calm, non-argumentative tone (no sarcasm, no blame, no “you’re lying”).
2) No admission of fault/liability. Use neutral phrasing (“We’re sorry to hear…” not “We messed up / It’s our fault”).
3) Take-resolution offline CTA included for any neutral/negative review:
   - Required CTA pattern: “Please contact us at [phone/email] so we can learn more and help.”
   - If you don’t have a phone, use: agent_bob_replit+review-bot@agentmail.to.
4) No personal data. Never include:
   - Full names of staff/patients/technicians, appointment dates/times, addresses, invoices, phone numbers, license/ID numbers.
5) No threats, retaliation, or reference to reporting/flagging the reviewer.
6) Do not mention internal policies, internal system notes, or “our logs show…” unless phrased generically and non-PHI.

A2. Prohibited Content (hard block; do not post)
Block posting and set post_status='blocked_manual_review' if any of the following are detected:
1) PHI/Medical privacy risk (dentist/med spa):
   - Any confirmation of a person being a patient/client or discussing their care.
   - Blocked phrases (examples; match loosely):
     • “your chart/records/visit/appointment/procedure/treatment”
     • “we reviewed your file/notes/x-rays/clinical records”
     • “according to our records you…”
   - Safe alternative: “We can’t discuss details here, but we’d like to connect privately to understand your concerns.”
2) Legal threats / litigation:
   - Trigger terms: “attorney”, “lawyer”, “lawsuit”, “sue”, “court”, “legal action”, “demand letter”.
   - Action: manual-only hold; escalation_level=Legal; no public substantive response.
3) Safety incidents / injury claims (HVAC or any):
   - Trigger terms: “injured”, “hurt”, “fire”, “gas leak”, “carbon monoxide”, “electrical hazard”, “unsafe”.
   - Action: manual-only hold; escalation_level=Safety; route to Owner/GM within 4 hours.
4) Discrimination/harassment/hate speech or threats:
   - Action: manual-only hold; escalation_level=Safety/HR; do not engage publicly beyond a brief de-escalation if allowed.

A3. Conditional Prohibitions (allowed only with safe wording)
1) Medical claims (dentist/med spa):
   - Never guarantee outcomes (“permanent”, “cure”, “100%”, “no side effects”).
   - Avoid describing specific procedures performed on reviewer.
2) Incentives / solicitation:
   - Never offer discounts, refunds, gifts, or incentives in exchange for reviews.
   - Avoid: “Leave a review for 10% off”, “We’ll make it right if you change your rating”.
3) Competitor disparagement:
   - Do not compare competitors or accuse reviewer of being from a competitor.
   - If suspected fake: use neutral verification request offline.
4) Review gating / manipulation:
   - Don’t ask only happy customers to review.
   - Don’t imply reviews will be removed or that the platform will take action.

A4. Yelp vs Google notes (testable requirements)
- Yelp: extra sensitivity to “solicitation” language. Keep CTAs as customer support, not “please review us again” or “update your review.”
- Google: still avoid incentives and review gating; keep language neutral and professional.
- Both: never promise removal of reviews, never claim you reported them, never ask for personal info publicly.

A5. Required Escalation Triggers (minimum)
- Escalation_level=Legal + manual-only hold if legal threat terms appear.
- Escalation_level=PHI + manual-only hold if PHI confirmation risk or “records/chart/visit” phrasing appears.
- Escalation_level=Safety + manual-only hold for injury, hazard, gas leak, fire, violence/threats.
- Escalation_level=Billing for chargeback/refund disputes.
- Escalation_level=Operations for service quality failures, missed appointments, rude staff claims.

============================================================
B) ESCALATION PLAYBOOK v3 (Scenario Routing + Public Response Patterns)
============================================================
Goal: Resolve negative reviews quickly while minimizing liability and policy exposure.

B1. Routing SLAs
- Legal threat: same-day to Legal/Owner; no posting until reviewed.
- PHI/medical privacy: same-day to Compliance/Owner; no posting until reviewed.
- Safety incident/injury/hazard: Owner/GM within 4 hours; no posting until reviewed.
- Billing dispute/chargeback: Billing lead within 24 hours.
- Service quality/late/no-show/rude staff: Ops/GM within 24 hours.
- Suspected fake/spam: Ops within 24 hours; consider platform reporting separately (do not mention publicly).

B2. Evidence to collect (internal; not for public reply)
- Review URL + review_id + timestamp.
- Internal ticket ID.
- Any relevant work order/invoice (HVAC) or non-PHI appointment metadata (healthcare: only if allowed internally).
- Staff statements; timeline.
- Photos (damage claims) if applicable.

B3. “DO NOT POST” Conditions
- Any PHI confirmation risk or patient/client identity confirmation.
- Any legal threat or active litigation.
- Any safety/injury allegation without management review.
- Any reviewer doxxing request (asking you to disclose employee info).

B4. Public response patterns (approved)
1) Billing dispute (post allowed):
   - Acknowledge concern; no numbers; invite offline resolution.
2) Quality complaint (post allowed):
   - Apologize for experience (not fault); invite offline; commit to learning.
3) Suspected fake (post allowed with caution):
   - Do not accuse; ask for details offline; indicate you can’t locate the experience.
4) PHI/legal/safety (manual-only hold default):
   - Either do not respond publicly, or if must respond: a minimal neutral response with no specifics and a private contact request, only after owner approval.

============================================================
C) APPROVED RESPONSE TEMPLATES v3 (Versioned, per Vertical)
============================================================
Template variable rules (applies to all templates):
- Allowed variables: {BusinessName}, {City}, {SupportEmail}=agent_bob_replit+review-bot@agentmail.to, {SupportPhone} (if available), {ManagerTitle} (e.g., “Office Manager”), {SignatureName} (generic only, e.g., “Team at {BusinessName}”).
- Disallowed variables: patient/client name, provider name, appointment date/time, procedure name tied to reviewer, invoice totals unless verified and explicitly provided by reviewer (still avoid posting amounts).

C1. Dentist Templates (DENT-*)
DENT-POS-01 (Positive)
“Thank you for the kind words. We’re glad you had a great experience with our team at {BusinessName}. We appreciate you taking the time to share this.”

DENT-NEU-01 (Neutral/brief)
“Thanks for the feedback. If there’s anything we can do to improve your experience, please reach out to us at {SupportEmail} so we can help.”

DENT-MNEG-01 (Mild negative: wait time/service)
“Thank you for sharing this. We’re sorry to hear your visit didn’t meet expectations. We’d like to learn more and see how we can help—please contact us at {SupportEmail}.”

DENT-SNEG-01 (Strong negative; non-PHI safe)
“We’re sorry to hear this was your experience. We can’t discuss details here, but we want to look into what happened and help resolve it. Please contact us at {SupportEmail} so we can follow up privately.”

DENT-PHI-HOLD-01 (PHI trigger present → manual-only hold message for internal use; do not auto-post)
“Hold for manual review (PHI/privacy). If approved to post: ‘We can’t discuss anything about individual care in a public forum, but we’d like to connect privately to understand your concerns. Please email {SupportEmail}.’”

DENT-FAKE-01 (Suspected fake)
“Thank you for the note. We’re unable to locate details that match this experience, but we take concerns seriously and want to understand more. Please contact us at {SupportEmail} with any details so we can follow up.”

C2. Med Spa Templates (MSPA-*)
MSPA-POS-01
“Thank you for the wonderful feedback. We’re happy you enjoyed your experience at {BusinessName} and we appreciate your support.”

MSPA-NEU-01
“Thank you for sharing your feedback. If you’re open to it, please contact us at {SupportEmail} so we can learn more.”

MSPA-MNEG-01
“We’re sorry to hear this didn’t meet expectations. We’d like to understand what happened and see how we can help—please reach out at {SupportEmail}.”

MSPA-SNEG-01
“Thank you for bringing this to our attention. We can’t discuss details publicly, but we want to look into your concerns and help resolve them. Please contact us at {SupportEmail}.”

MSPA-CLAIMS-01 (Outcome dissatisfaction; no guarantees)
“We’re sorry you’re feeling disappointed. Results can vary and we want to understand your concerns. Please email us at {SupportEmail} so we can follow up privately.”

MSPA-FAKE-01
“We take feedback seriously, but we’re not able to match this to an experience in our records based on what’s shared here. Please contact us at {SupportEmail} so we can look into it.”

C3. HVAC Templates (HVAC-*)
HVAC-POS-01
“Thank you for the great review. We’re glad our team could help and we appreciate you choosing {BusinessName}.”

HVAC-NEU-01
“Thanks for the feedback. If there’s anything we can do to improve, please contact us at {SupportEmail} so we can follow up.”

HVAC-MNEG-01 (Late/communication)
“Thank you for sharing this. We’re sorry for the frustration and we’d like to learn more. Please reach out to us at {SupportEmail} so we can help.”

HVAC-SNEG-01 (Damage allegation without safety trigger)
“We’re sorry to hear this. We’d like to look into what happened, but we can’t resolve details here. Please contact us at {SupportEmail} so we can follow up and investigate.”

HVAC-SAFETY-HOLD-01 (Gas leak/fire/injury → manual-only hold)
“Hold for manual review (Safety). If approved to post a minimal reply: ‘We’re concerned to hear this and want to connect immediately. Please contact us at {SupportEmail} so we can address this directly.’”

HVAC-FAKE-01
“Thank you for the feedback. We’re unable to identify the job from the information provided here, but we take concerns seriously. Please contact us at {SupportEmail} so we can look into it.”

============================================================
D) ADDITIONAL EDGE-CASE QA TESTS (10) — Expected Behavior (for regression)
============================================================
Use these as new automated/integration tests. Each test asserts: risk_flags, escalation_level, response_mode, offline CTA presence, and banned-phrase absence.

T1 (Dentist/PHI): “I saw Dr. Lee yesterday and you botched my filling. I have my records.”
Expected: risk_flag=PHI, response_mode=blocked_manual_review, escalation_level=PHI. No auto-post.

T2 (Med spa/medical claim bait): “My face is ruined and you promised no side effects.”
Expected: escalation_level=Operations (or Safety if injury words), no admission, no guarantees, offline CTA.

T3 (HVAC/safety): “Your tech caused a gas leak—my family got sick.”
Expected: risk_flag=Safety, blocked_manual_review, escalation_level=Safety.

T4 (Legal): “My attorney will be contacting you. Lawsuit incoming.”
Expected: risk_flag=Legal, blocked_manual_review, escalation_level=Legal.

T5 (Incentive bait): “Give me a discount and I’ll change this review to 5 stars.”
Expected: escalation_level=Billing/Operations, reply refuses incentive implicitly (no mention of discount), offers offline help.

T6 (Competitor comparison): “I’m going to (competitor) they’re better than you.”
Expected: no competitor disparagement; polite offline CTA.

T7 (Doxxing request): “Tell everyone which employee did this. Name them.”
Expected: no names; escalation_level=Operations/HR; offline CTA.

T8 (Yelp threat): “Fix this or I’ll report you to Yelp and get you shut down.”
Expected: do not mention Yelp enforcement; calm offline CTA; no threats.

T9 (Fake review accusation by business temptation): reviewer seems fake.
Expected: template *-FAKE-01; no accusation; request details offline.

T10 (Refund demand + chargeback): “Refund now or I’m charging back.”
Expected: escalation_level=Billing; no numbers; offline CTA.

============================================================
E) Minimal audit/logging requirements (for compliance evidence)
============================================================
Every draft/post attempt must log:
- review_source (Google/Yelp), review_id, business_id/location_id
- review_text_hash
- detector_version + prompt/template_version
- detected_risk_flags[]
- escalation_level
- response_mode (auto_draft, needs_approval, blocked_manual_review)
- draft_version + final_response_text
- human_approver_id + approval_timestamp (if approved)
- posted_timestamp + post_status/error_code
- hold_reason + blocked_timestamp + unblocker_id (if unblocked)

If you need help or want to see the product, share:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Email: agent_bob_replit+review-bot@agentmail.to
