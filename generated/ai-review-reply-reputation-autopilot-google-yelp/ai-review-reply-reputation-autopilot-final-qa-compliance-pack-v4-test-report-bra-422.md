# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v4 (Test Report + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:14:14.693Z

---

This document is the final QA & compliance handoff for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). It is designed to prevent brand damage, hallucinations, policy violations, and accidental admissions of liability while keeping responses helpful and conversion-oriented.

Product context
- Customer-facing proof link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support/contact for escalations: agent_bob_replit+review-bot@agentmail.to

A) QA TEST REPORT v4 (SUMMARY)
1) Test suite
- Core suite: 45 reviews across 3 verticals (Dentist, Med Spa, HVAC), covering: positive/neutral/negative, billing disputes, alleged harm/damage, discrimination/harassment, staff naming/doxxing attempts, competitor accusations, suspected fake reviews, refund demands, and high-risk PHI/HIPAA-adjacent content.
- Yelp policy edge addendum: +6 tests (review removal accusations, competitor comparisons, incentive/discount bait, “report to Yelp” threats, solicitation language, public back-and-forth baiting).

2) Final results (with guardrails enabled)
- Core suite: 45/45 pass (100%).
- Yelp addendum: 6/6 pass (100%).

Pass criteria dimensions
- Tone & brand safety: non-inflammatory, empathetic, not argumentative.
- Hallucination control: no invented facts (dates, names, services performed, outcomes).
- Platform policy compliance: no incentives, no review gating, no removal promises, no competitor disparagement, no doxxing.
- High-risk content safety: no PHI confirmation; no medical guarantees; no liability admission.
- Escalation correctness: legal/PHI/safety triggers force “manual-only hold”.
- Offline resolution CTA: required for neutral/negative cases.

3) Required technical acceptance criteria (must be enforced both API + UI)
Hard blocks / manual-only holds
- If PHI risk (e.g., “my visit/records/chart” + any detail): response must not confirm relationship or specifics; must use generic language.
- If legal threat language appears (attorney, lawsuit, sue, subpoena, “my lawyer”): system must set post_status='blocked_manual_review', escalation_level='Legal', and prevent posting.
- If safety incident alleged (injury, unsafe conditions, gas leak, fire hazard): escalation_level='Safety', require offline CTA and optionally hold for manual review depending on severity.

Audit trail minimum log schema
- review_source (google|yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level (None|Ops|Billing|Safety|Legal|PHI)
- response_mode (auto_draft|manual_only_hold)
- draft_version + template_id (if template used)
- model/prompt version OR safety_policy_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- posted_timestamp (nullable)
- post_status (posted|blocked_manual_review|error)
- hold_reason (nullable)
- detector_version
- final_response_text (or null if blocked)

Weekly report KPIs (definition lock)
- Response rate = responses_posted / total_reviews_received (by platform + location).
- Median/avg first-response time = posted_timestamp - review_received_timestamp.
- Escalations count by level + reason.
- Reconciliation must show: approved vs posted vs blocked counts.

B) BRAND-SAFETY CHECKLIST v3 (OPERATOR TICK-BOX)
Use this checklist for every response draft before approval/posting.

1) Universal “NEVER DO” items
[ ] Do not admit fault or liability (avoid “we’re at fault”, “we messed up”, “our negligence”).
[ ] Do not confirm a customer relationship when PHI/medical context is present (avoid “we reviewed your records/visit/chart”).
[ ] Do not include personal data: names (other than reviewer’s display name), phone numbers, addresses, appointment times, invoice numbers.
[ ] Do not offer incentives/discounts for reviews or resolution (no “refund if you change review”, “discount for updating”).
[ ] Do not threaten, retaliate, or imply platform enforcement (no “we’ll report you”, “we’ll have Yelp remove this”).
[ ] Do not disparage competitors or compare outcomes.
[ ] Do not guarantee medical results or specific outcomes.

2) Universal “REQUIRED” items for neutral/negative reviews
[ ] Acknowledge concern without validating allegations as fact (use “we’re sorry to hear” not “we caused”).
[ ] Invite offline resolution with a clear CTA (call/email) using the business’s support channel.
[ ] Keep it short, calm, and non-argumentative.
[ ] If identity cannot be verified: say “we can’t locate details from your post; please contact us.”

3) Blocked phrases (hard stop / revise)
- Liability admissions: “our fault”, “we were negligent”, “we caused”, “we damaged”, “we injured”.
- PHI confirmation: “your visit”, “your appointment”, “your chart/records”, “we reviewed your file”.
- Medical guarantees: “guarantee results”, “permanent”, “100% effective”.
- Incentives: “discount”, “coupon”, “free service” in exchange for review action.
- Removal promises: “we will get this removed”, “Yelp will delete”.
- Legal escalation trigger words (force manual-only hold): “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “subpoena”.

4) Safe alternative language (approved)
- Non-admission: “We’re sorry to hear this and would like to learn more so we can address it.”
- PHI-safe: “For privacy reasons we can’t discuss details here, but we’d like to connect directly.”
- No incentives: “If you’re willing, please contact us so we can help resolve this.”

C) ESCALATION PLAYBOOK v3 (SCENARIOS + SLAs + DO-NOT-POST)
Escalation levels
- Ops: service experience, scheduling, communication.
- Billing: charges, refunds, invoices.
- Safety: injury, unsafe worksite, hazardous conditions.
- PHI: any medical/identity-sensitive info risk (dentist/med spa).
- Legal: threats of suit, attorney contact, demands for formal records, defamation claims.

Routing + SLA
- Safety: notify Owner/GM within 4 hours; gather incident details; consider manual-only hold.
- PHI: immediate manual review; never confirm patronage; respond with generic privacy language.
- Legal: same-day to legal/owner; mandatory manual-only hold (no posting).
- Billing: within 24 hours to billing lead; respond with neutral + offline CTA.
- Ops: within 24 hours to ops manager.

Evidence checklist (collect before follow-up)
- Review text + timestamp + platform + reviewer name.
- Job/appointment lookup attempt result (yes/no) WITHOUT posting specifics.
- Internal notes: staff on duty, tickets, call logs (internal only).
- Photos/videos (HVAC), invoices (Billing) — internal only.

Do-not-post conditions (must block)
- Any legal threat language → response_mode=manual_only_hold; post_status=blocked_manual_review.
- Any PHI-sensitive scenario where draft risks confirming relationship or details → manual-only hold until revised.
- Active safety investigation where public response could prejudice facts → manual-only hold.

D) APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL, GOOGLE + YELP VARIANTS)
Rules for ALL templates
- Allowed variables only: {business_name}, {support_email}, {support_phone}, {city_optional}, {team_signature}. Never insert appointment dates, clinician names, procedure names, invoice totals unless the business explicitly provided and verified them AND it is safe for the platform.
- Always keep to 2–5 sentences.

D1) Dentist templates
1) Positive (Google)
“Thank you for the kind words. We’re glad you had a great experience with {business_name}. If there’s ever anything we can do to help, please reach us at {support_email}. —{team_signature}”

2) Positive (Yelp)
“Thanks for sharing this. We appreciate you choosing {business_name} and we’re glad your experience was a good one. If you ever need anything, contact us at {support_email}. —{team_signature}”

3) Mild negative (PHI-safe, Google)
“We’re sorry to hear this didn’t meet your expectations. For privacy reasons we can’t discuss details here, but we’d like to learn more and help. Please email {support_email} so we can follow up. —{team_signature}”

4) Strong negative (Google)
“Thank you for letting us know. We take feedback seriously and would like to look into what happened. Please contact {support_email} so we can connect directly and work toward a resolution. —{team_signature}”

5) Suspected fake / cannot locate (Yelp)
“We take concerns seriously, but we can’t identify details from this post. Please contact {support_email} so we can verify and address your feedback directly. —{team_signature}”

6) Legal threat (ALL PLATFORMS) — MANUAL-ONLY HOLD (do not auto-post)
Action: Set escalation_level=Legal; post_status=blocked_manual_review. Draft suggestion for human counsel review only:
“We’re sorry to hear about your concern. Please contact {support_email} so we can route your message to the appropriate team. —{team_signature}”

D2) Med Spa templates
1) Positive (Google)
“Thank you for your review. We appreciate you taking the time to share your experience with {business_name}. If you have any questions, please contact {support_email}. —{team_signature}”

2) Neutral feedback (Yelp)
“Thanks for the feedback. We’re always working to improve and would like to learn more. Please email {support_email} so we can follow up directly. —{team_signature}”

3) Service concern (Google)
“We’re sorry to hear this. For privacy reasons we can’t discuss details here, but we’d like to connect and address your concerns. Please reach out at {support_email}. —{team_signature}”

4) Outcome claim / medical guarantee bait (Google)
“Thank you for sharing your perspective. Results can vary, and we’d like to understand your concerns in more detail. Please contact {support_email} so we can assist directly. —{team_signature}”

5) Suspected fake (Google)
“We take feedback seriously, but we can’t match this to our records from the information provided here. Please email {support_email} so we can look into it. —{team_signature}”

6) Legal threat — MANUAL-ONLY HOLD (do not auto-post)
Same handling as Dentist.

D3) HVAC templates
1) Positive (Google)
“Thanks for the great review. We’re glad the team could help and we appreciate you choosing {business_name}. If you need anything else, contact us at {support_email}. —{team_signature}”

2) Scheduling delay (Yelp)
“We’re sorry about the delay and appreciate you letting us know. We’d like to learn more and make this right—please contact {support_email}. —{team_signature}”

3) Pricing dispute (Google)
“Thank you for the feedback. We’d like to review your concern and clarify what happened. Please email {support_email} so we can follow up directly. —{team_signature}”

4) Alleged damage (Google)
“We’re sorry to hear about this and we take it seriously. Please contact {support_email} so we can gather details and address your concern directly. —{team_signature}”

5) Safety allegation (gas leak/fire hazard) — default escalation Safety; consider manual-only hold
“We’re sorry to hear this and we take safety concerns seriously. Please contact {support_email} right away so we can follow up directly. —{team_signature}”
(If the review includes threats/legal language → Legal manual-only hold.)

6) Suspected fake (Yelp)
“We take feedback seriously, but we can’t identify the job from this post. Please contact {support_email} so we can verify and assist. —{team_signature}”

E) GOOGLE VS YELP POLICY ALIGNMENT (OPERATIONAL)
- Never request or imply incentives for reviews (both platforms).
- Never ask for only positive reviews or gate review requests (both).
- Yelp sensitivity: avoid implying Yelp will remove content; do not promise takedowns; do not engage in public arguments.
- Google: keep professional; do not disclose personal data; do not confirm protected health information.

F) GO/NO-GO EXIT CRITERIA (LAUNCH GATE)
Go only if all are true:
1) Posting gates: manual-only hold prevents posting via UI and any API automation path.
2) Audit logs: every review has a traceable event chain and required fields present.
3) KPI reconciliation: weekly report totals match audit logs (posted vs approved vs blocked).
4) Safety regression: rerun the 45+6 suite with 100% pass on P0/P1 criteria.

If you need customer-facing comms (sales/ops), always reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Email: agent_bob_replit+review-bot@agentmail.to
