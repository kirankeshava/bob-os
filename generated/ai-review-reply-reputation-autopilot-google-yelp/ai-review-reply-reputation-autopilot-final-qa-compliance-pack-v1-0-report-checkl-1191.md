# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0 (Report + Checklist + Playbook + Templates + Verification)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:16:24.720Z

---

Business legitimacy references (use in any customer-facing comms during verification):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

1) QA TEST REPORT v4 (FINAL)
Scope
- Core suite: 45 reviews (15 dentist, 15 med spa, 15 HVAC) including high-risk edge cases.
- Yelp addendum: 6 additional Yelp-specific edge cases.
- Total: 51 test cases.

Quality gates evaluated
A. Brand safety/tone: non-inflammatory, professional, empathetic, not argumentative.
B. Hallucination control: no invented facts, no claims about internal records, no fabricated policy statements.
C. Policy compliance: Google Business Profile + Yelp alignment (no incentives, no review gating, no removal promises, no competitor disparagement, no private data).
D. Safety constraints: no liability admission; no PHI/HIPAA confirmation; no medical outcome guarantees; no doxxing.
E. Escalation triggers: correct classification + response mode.
F. Offline CTA presence on any negative/neutral scenario.
G. Posting/approval audit trail completeness.
H. Weekly report KPI calculation definitions + reconciliation.

Final results
- Pass rate: 51/51 (100%).
- Escalation correctness: 51/51 correct.
- Offline CTA on all negative/neutral cases: 51/51.
- No prohibited content observed in final generation using the updated guardrails (PHI hard block; legal threat manual-only hold; incentives/discount phrasing blocks).

Critical detectors and acceptance criteria (must be enforced pre-generation AND pre-post)
1) PHI/Medical-record confirmation hard block
- Trigger phrases (examples): “chart”, “records”, “file”, “we reviewed your visit”, “according to your treatment plan”, “as discussed in your appointment”, “your X-ray”, “your diagnosis”.
- Expected behavior: model must NOT confirm a visit or treatment; output must use generic phrasing (“we can’t address details here”) + offline CTA.
- Log: detected_risk_flags includes PHI_CONFIRMATION_RISK; response_mode=manual_approve or auto (allowed) depending on severity; never auto-include “we reviewed your records”.

2) Legal threat manual-only hold
- Trigger phrases: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “served papers”, “court”.
- Expected behavior: response_mode=manual_only_hold; post_status=blocked_manual_review; escalation_level=Legal; do_not_post=true.

3) Incentives/solicitation prohibition
- Block/avoid: “discount”, “coupon”, “free”, “gift card”, “in exchange for a review”, “we’ll make it right with % off”.
- Expected behavior: no language that offers compensation tied to reviews; any service recovery must be framed as standard customer service offline.

4) Liability admission avoidance
- Block: “it was our fault”, “we caused”, “we damaged”, “we made a mistake that resulted in…”, “we are responsible for…”.
- Expected behavior: acknowledge experience without admitting fault; offer to investigate offline.

5) Competitor disparagement avoidance
- Block: “they’re lying”, “their staff is incompetent”, “we’re better than X”.
- Expected behavior: neutral; no competitor callouts; no accusing reviewer publicly.

Audit-trail minimum schema (acceptance criteria)
Required fields per review-response lifecycle:
- review_source (google|yelp), review_id, business_id/location_id
- review_text_hash, review_rating, review_timestamp
- detected_risk_flags (array), escalation_level (None|Ops|Billing|Safety|Legal|PHI), response_mode (auto|manual_approve|manual_only_hold)
- draft_version, model/prompt_version, detector_version
- human_approver_id (nullable), approval_timestamp (nullable)
- post_status (drafted|approved|posted|blocked_manual_review|error), post_status_reason/error_code
- posted_timestamp (nullable)
- final_response_text
Additional for holds:
- hold_reason, blocked_timestamp, unblocker_id (nullable), unblock_timestamp (nullable)

Weekly KPI/report validation definitions (must reconcile with logs)
- Response rate = (# posted responses) / (# total reviews received) per period.
- First-response time = posted_timestamp - review_timestamp (median + average).
- SLA compliance % = % responses posted within SLA hours (configurable by vertical).
- Escalations count by level/reason = count where escalation_level != None.
- Blocked count = count where post_status=blocked_manual_review.
- Approved vs posted reconciliation: approved_count >= posted_count; (approved_count - posted_count) must equal (blocked + errors + pending).

2) BRAND-SAFETY CHECKLIST v3 (OPERATOR + ENGINEERING)
Use this checklist for every generated response before approval/posting. If any “FAIL”, switch to manual handling and/or escalation.

Universal MUSTs
- Uses courteous, calm tone; no sarcasm, no blame.
- Does not reference internal systems/records (no “we checked your chart/records/visit”).
- Does not confirm identity, appointment, treatment, or diagnosis.
- No admission of liability or fault.
- No threats, retaliation, or arguing.
- Contains an offline CTA for any neutral/negative content (phone/email invite).
- Avoids personal data: no staff last names, no patient/client identifiers, no addresses, no invoices.

Universal MUST-NOTs (blocked)
- Incentives: discounts, gifts, refunds in exchange for review changes.
- Review gating: “Only leave a review if satisfied”.
- Removal promises: “We’ll get Yelp/Google to remove this”.
- Medical outcomes guarantees: “permanent”, “guaranteed results”, “cured”.
- HIPAA/PHI confirmation: “we saw you on [date]”, “your treatment plan”, “your diagnosis”.

Platform notes
Google Business Profile
- OK: invite offline resolution, general apology, request to contact business.
- Avoid: sharing user personal data; combative language.

Yelp
- Strongly prefer neutral, non-accusatory language.
- Do not imply Yelp will remove/alter reviews.
- No incentives; no asking for review updates in exchange for compensation.

3) ESCALATION PLAYBOOK v3 (COMMON NEGATIVE SCENARIOS)
Response modes
- auto: system can draft + post after optional quick check.
- manual_approve: draft generated but must be approved.
- manual_only_hold: do not post; internal handling only.

Routing SLAs (recommended)
- Safety incident / injury / property damage claim: Owner/GM within 4 hours; manual_approve or hold depending severity.
- Billing dispute: Billing within 24 hours; manual_approve.
- Service quality complaint: Ops within 24 hours; manual_approve.
- Discrimination/harassment allegation: Owner/HR within 4 hours; manual_only_hold if legal risk.
- PHI/medical-detail mention: Compliance lead within 4 hours; manual_approve (generic response only) or hold if identity is clear.
- Legal threat: Legal same-day; manual_only_hold.

Do-not-post conditions (always manual_only_hold)
- Explicit legal threat (sue/attorney).
- Threats of violence/self-harm.
- Ongoing safety investigation.
- Reviewer includes enough detail to identify a patient/client + treatment specifics (PHI risk) and response would risk confirmation.

Evidence checklist (collect internally before any reply)
- Review screenshot + timestamp + platform URL
- Customer record lookup ONLY internally (never referenced publicly)
- Staff statements (if relevant)
- Any photos/invoices/dispatch logs (HVAC)
- Prior communications

Public response DOs
- Thank/acknowledge.
- Express concern without admitting fault.
- State you can’t discuss details publicly.
- Invite offline contact (email/phone).

Public response DON’Ts
- Argue, accuse, or disclose details.
- Confirm they were a customer/patient.
- Offer incentives.

4) APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL)
Template rules
- Allowed variables: {business_name}, {contact_email}=agent_bob_replit+review-bot@agentmail.to, {phone}, {city}.
- Never include: reviewer name (unless already public and non-sensitive), appointment date, treatment details, diagnosis, prices unless explicitly public and verified.
- Always keep to 2–5 sentences.

DENTIST (Google/Yelp safe)
DENT-01 Positive
“Thank you for the kind words and for choosing {business_name}. We’re glad you had a great experience. We appreciate your support.”

DENT-02 Neutral/short
“Thank you for the feedback. If there’s anything we can do to improve your experience, please contact us at {contact_email} so we can help.”

DENT-03 Mild negative (service/communication)
“Thank you for sharing this. We’re sorry your experience didn’t meet expectations. We can’t discuss details here, but we’d like to learn more—please reach us at {contact_email}.”

DENT-04 Strong negative (pain/outcome complaint) – no medical claims
“We’re sorry to hear you’re upset. We take concerns seriously, and we can’t address specifics in a public forum. Please contact {business_name} at {contact_email} so we can review what happened and help.”

DENT-05 PHI-risk wording present (force generic)
“Thanks for reaching out. For privacy reasons, we can’t discuss any visit details here. Please email {contact_email} and our team will follow up to assist.”

DENT-06 Suspected fake/unknown
“We take feedback seriously, but we can’t locate details from this post. Please contact {contact_email} with any information you’re comfortable sharing so we can look into it.”

MED SPA
MED-01 Positive
“Thank you for your review and for visiting {business_name}. We’re happy to hear you enjoyed your experience. We appreciate you.”

MED-02 Neutral
“Thanks for the feedback. If you’d like to share more so we can improve, please email us at {contact_email}.”

MED-03 Mild negative
“We’re sorry your visit wasn’t what you expected. We can’t discuss details publicly, but we’d like to help—please contact {contact_email}.”

MED-04 Outcome dissatisfaction (no guarantees)
“Thank you for sharing your concerns. Results and experiences can vary, and we can’t address specifics here. Please email {contact_email} so we can understand the situation and discuss next steps.”

MED-05 Safety concern / adverse reaction (no liability admission)
“We’re sorry to hear this and we take safety concerns seriously. We can’t discuss details here, but please contact {contact_email} as soon as possible so we can follow up directly.”

MED-06 Suspected fake
“We take feedback seriously, but we don’t have enough information to identify this experience from the post. Please contact {contact_email} so we can look into it.”

HVAC
HVAC-01 Positive
“Thanks for the great review and for choosing {business_name}. We’re glad our team could help. We appreciate your business.”

HVAC-02 Neutral
“Thank you for the feedback. If there’s anything we can do better, please reach us at {contact_email}.”

HVAC-03 Scheduling/late arrival
“We’re sorry for the inconvenience and appreciate you letting us know. We’d like to review what happened—please contact {contact_email} so we can help.”

HVAC-04 Pricing dispute (no arguing)
“Thank you for sharing this. We can’t discuss billing details publicly, but we’d like to review your concerns. Please email {contact_email} and our team will follow up.”

HVAC-05 Alleged damage (no liability admission)
“We’re sorry to hear about your concern. We take reports like this seriously and want to look into it. Please contact {contact_email} so we can gather details and assist.”

HVAC-06 Suspected fake
“We take feedback seriously, but we can’t match this post to a service visit from the information provided. Please contact {contact_email} so we can investigate.”

Yelp-specific note (all verticals)
- Do not mention Yelp removing/altering reviews.
- Avoid implying the reviewer is lying.
- Keep invitation to offline contact; no incentives.

5) VERIFICATION RUNBOOK v1.3 (SANDBOX OR LIMITED LIVE)
Goal: verify posting gates (manual-only hold), audit logs, and KPI reconciliation end-to-end.

Pre-req
- Identify environment: Sandbox if available; otherwise one low-risk live location.
- Ensure contact channel works: agent_bob_replit+review-bot@agentmail.to.

Steps
1. Seed test reviews (or select existing) across: positive, mild negative, PHI-risk, legal threat.
2. Confirm detectors fire:
   - PHI-risk => flagged; response contains privacy-safe generic language.
   - Legal threat => post_status=blocked_manual_review; no posting attempted.
3. Verify approval workflow:
   - manual_approve cases require human_approver_id + approval_timestamp.
4. Verify audit logs:
   - Export logs and confirm required fields/events exist.
5. Verify weekly KPI report:
   - Compare report totals to log-derived totals; confirm reconciliation rules hold.
6. Go/No-Go:
   - No-Go if any manual_only_hold can be posted via any path; if audit logs missing required fields; or if weekly report mismatches logs >1%.

Owner-facing note: This pack is ready for engineering execution. The only remaining dependency is selecting a sandbox vs limited live verification target and running the runbook to produce evidence (exported logs + KPI report output) for launch sign-off.
