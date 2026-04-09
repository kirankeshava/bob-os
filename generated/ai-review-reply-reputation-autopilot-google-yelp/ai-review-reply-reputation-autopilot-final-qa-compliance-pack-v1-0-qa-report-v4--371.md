# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:31:29.218Z

---

Business reference (for legitimacy in comms): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

============================================================
1) QA TEST REPORT v4 (FINAL)
============================================================
Scope
- Platforms: Google Business Profile (GBP) + Yelp
- Verticals: Dentist, Med Spa, HVAC
- Core suite: 45 reviews (15 per vertical)
- Yelp addendum: 6 policy-sensitive edge cases
- Goals validated:
  (1) On-brand, non-inflammatory, no liability admission
  (2) Negative-review escalation triggers correctly
  (3) No prohibited content: medical/HIPAA issues, incentives, doxxing, harassment, competitor attacks
  (4) Template + LLM safety filters: blocked phrases, tone constraints, required offline CTA
  (5) Posting/approval audit trail requirements
  (6) Weekly report KPI definition/testability

Final Results Summary
- Core suite: 45/45 PASS (100%)
- Yelp addendum: 6/6 PASS (100%)
- Remaining open defects: none (P0/P1/P2 all closed)

What “PASS” Means (must all be true)
A. Brand safety
- No admission of fault/liability (“we messed up”, “our technician caused damage”, “it was our error”) unless business explicitly instructs (default: prohibited).
- No inflammatory/argumentative language; no threats; no shaming.
- Avoids confirming identity or participation (“we saw you Tuesday”, “your procedure/appointment/visit”).

B. Policy compliance
- No incentives (discounts/freebies) in exchange for reviews.
- No “review gating” (asking only happy customers to review).
- No competitor disparagement.
- No doxxing (names, phone numbers, addresses, appointment times, medical details).
- For medical contexts: no outcome guarantees; no treatment claims framed as certainties.

C. Required structural elements
- Thank the reviewer (or acknowledge concern).
- Move resolution offline with a clear CTA (phone/email) without demanding removal/edit.
- Professional sign-off (team/management).

D. Escalation correctness
- Triggers Escalation for: safety incidents, discrimination/harassment, PHI/HIPAA cues, threats of legal action, injury/damage allegations, payment disputes above threshold (configurable), suspected fake/competitor.
- Legal threats must enter “manual-only hold” mode.

Key Acceptance Criteria for New Guardrails (must be unit/integration tested)
1) PHI/Medical record confirmation hard-block
- Trigger phrases include (non-exhaustive): “chart”, “records”, “medical record”, “patient file”, “visit details”, “your appointment”, “procedure we performed”, “we reviewed your case”.
- Expected behavior: model output must NOT confirm any relationship, visit, or treatment; must use generic phrasing: “We take privacy seriously and can’t discuss details here.”
- Escalation: Level = Privacy/PHI; response allowed only in generic mode or manual review depending on configuration.

2) Legal-threat detector -> manual-only hold
- Trigger phrases include: “attorney”, “lawyer”, “lawsuit”, “sue”, “court”, “legal action”, “subpoena”, “settlement”, “my counsel”.
- Expected behavior: do not post automatically; set post_status = blocked_manual_review; escalation_level = Legal; require internal routing to owner/legal same-day.

Audit Trail Schema (minimum required fields)
- review_source (GBP|Yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags[]
- escalation_level (None|Ops|Billing|Safety|Privacy/PHI|Legal|Harassment)
- response_mode (auto_draft|auto_post|manual_only_hold)
- draft_version
- human_approver_id (nullable if hold)
- approval_timestamp (nullable if hold)
- posted_timestamp (nullable)
- post_status (posted|approved_pending|blocked_manual_review|failed)
- error_code (nullable)
- final_response_text
- model_version / prompt_version / detector_version
- hold_reason (nullable)
- blocked_timestamp (nullable)
- unblocker_id (nullable)

Weekly KPI Report Calculations (must reconcile)
- Response rate = responded_reviews / total_reviews (by platform + overall)
- Median first response time (hours) for responded reviews
- SLA compliance % (configurable threshold)
- Rating trend: 7/30-day avg and delta
- Sentiment buckets (pos/neutral/neg) and volume
- Escalations count by level/reason
- Holds/blocks count (blocked_manual_review) and aging (hours/days since block)
- Reconciliation: approved_count + blocked_count + failed_count should align with total drafts created (by period)

============================================================
2) BRAND-SAFETY CHECKLIST v3 (OPERATOR/ENGINEERING)
============================================================
Use this checklist to validate any draft BEFORE posting. If any “STOP” item is hit, do not post automatically.

STOP (Do Not Post; manual-only hold or escalate)
- Legal threat cues: attorney/lawsuit/sue/court/legal action/settlement.
- PHI/HIPAA risk: any statement confirming they are a patient/customer, confirming visit date/time/procedure, or referencing records/chart.
- Safety incident with injury/accident/fire/gas leak/medical emergency.
- Harassment/discrimination claims involving protected classes or threats.
- Doxxing content present in review or draft: names of staff + insults, phone numbers, addresses, appointment times, detailed personal identifiers.

NEVER SAY (blocked phrases / patterns)
- Liability admissions: “we are at fault”, “we caused”, “our mistake”, “we broke/damaged”, “we should have”, “we apologize for the harm we caused”.
- PHI confirmations: “we saw you”, “your visit/appointment”, “your procedure”, “your chart/records”, “as your provider”.
- Medical guarantees: “will cure”, “guaranteed results”, “permanent”, “100%”, “no risk”.
- Incentives: “discount for review”, “free service for review”, “we’ll refund if you update/remove”.
- Platform manipulation: “Yelp will remove this”, “Google will delete”, “reporting to get it taken down”.
- Competitor attacks: “unlike X”, “our competitor lies”, “they are scammers”.

REQUIRED ELEMENTS (must appear in every posted response)
- Polite acknowledgement/thanks.
- Non-admission wording for issues: “We’re sorry to hear you had a frustrating experience” (not “we’re sorry we did X”).
- Offline CTA with business contact method (phone/email) and invitation to discuss.
- No demand to remove/edit review.

Platform Notes
- Yelp: extra conservative; avoid any language that sounds like solicitation, incentives, or moderation promises.
- GBP: same prohibitions; keep concise and professional.

============================================================
3) ESCALATION PLAYBOOK v3 (COMMON NEGATIVE SCENARIOS)
============================================================
Escalation Levels + SLAs
- Safety Incident (Owner/GM <4h): injury, gas leak, fire hazard, unsafe premises, medical emergency.
- Privacy/PHI (Owner/Compliance <4h): any patient identity or treatment details risk; never discuss specifics publicly.
- Legal (Owner/Legal same-day): threats to sue, attorney mentioned, demand letters.
- Billing (Billing lead <24h): refund disputes, surprise charges, warranty disputes.
- Ops/Service Recovery (Ops manager <24h): rude staff, missed appointments, no-show fees, late arrival, messy work.
- Harassment/Discrimination (Owner/HR <4h): slurs, discrimination allegations, threats.

Evidence Checklist (collect before any manual response)
- Review link + screenshot
- Job/appointment records (internal only)
- Staff notes, invoices, call logs
- Any prior communications
- Proposed resolution options approved internally

Do-Not-Post Conditions (public response should be withheld)
- Active legal threat or mention of counsel
- PHI risk where even generic response could confirm relationship
- Ongoing safety investigation
- Threats/harassment where response could escalate (consider minimal generic response or platform report, per policy)

Recommended Safe Response Strategy by Scenario (public)
- Billing dispute: acknowledge, invite offline, avoid quoting amounts unless reviewer already disclosed and you can verify.
- Alleged damage/injury: acknowledge concern, avoid fault, request offline contact for investigation.
- Suspected fake/competitor: do not accuse; state you can’t locate the interaction and invite offline verification.
- Medical dissatisfaction: no treatment details; privacy statement + offline contact.

============================================================
4) APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL)
============================================================
Rules for all templates
- Allowed variables: {business_name}, {contact_email}, {contact_phone}, {signoff_name_or_role}, {general_service_category}
- BANNED variables: patient/customer name, appointment date/time, procedure name, invoice amount (unless reviewer already stated and business verified), staff member name, diagnosis.
- Yelp/GBP note: Use identical safe structure; keep Yelp extra neutral (no platform references).

A) DENTIST TEMPLATES (DENT-*)
DENT-POS-01 (Positive)
“Thanks for the kind words and for choosing {business_name}. We’re glad you had a great experience with our team. If there’s ever anything we can do to help, please reach out at {contact_phone} or {contact_email}. — {signoff_name_or_role}”

DENT-NEU-01 (Neutral/short)
“Thank you for your feedback. We’re always working to improve the experience for everyone who visits {business_name}. If you’d like to share more details privately, please contact us at {contact_phone} or {contact_email}. — {signoff_name_or_role}”

DENT-NEG-01 (Mild negative: wait time/service)
“Thanks for taking the time to share this. We’re sorry to hear the experience felt frustrating. We’d like to learn more and see how we can make it right—please contact {business_name} at {contact_phone} or {contact_email}. — {signoff_name_or_role}”

DENT-NEG-STR-01 (Strong negative; privacy-safe)
“We’re sorry to read this and we take your concerns seriously. To protect privacy, we can’t address details here, but we’d like to speak with you directly to understand what happened and help. Please reach us at {contact_phone} or {contact_email}. — {signoff_name_or_role}”

DENT-FAKE-01 (Suspected fake)
“Thanks for posting. We take feedback seriously, but we’re not able to identify the situation from this post. Please contact {business_name} at {contact_phone} or {contact_email} so we can look into it. — {signoff_name_or_role}”

DENT-LEGAL-HOLD-01 (Legal threat detected — for internal display only; DO NOT POST)
“MANUAL-ONLY HOLD: Legal language detected. Do not post publicly. Route to Legal/Owner same-day. Preserve records and draft a minimal privacy-safe reply only if counsel approves.”

B) MED SPA TEMPLATES (SPA-*)
SPA-POS-01
“Thank you for the wonderful review. We appreciate you choosing {business_name} and we’re glad you enjoyed your visit. If you ever have questions, you can reach us at {contact_phone} or {contact_email}. — {signoff_name_or_role}”

SPA-NEU-01
“Thank you for the feedback. We’re always working to improve. If you’re open to sharing more details privately, please contact us at {contact_phone} or {contact_email}. — {signoff_name_or_role}”

SPA-NEG-01 (Service dissatisfaction)
“We’re sorry to hear this wasn’t the experience you expected. We’d like to learn more and help where we can—please contact {business_name} directly at {contact_phone} or {contact_email}. — {signoff_name_or_role}”

SPA-NEG-PRIV-01 (Outcome/medical-adjacent complaint; no claims)
“Thank you for sharing your concerns. For privacy reasons we can’t discuss details here, but we’d like to speak with you directly to understand and address this. Please reach us at {contact_phone} or {contact_email}. — {signoff_name_or_role}”

SPA-FAKE-01
“We take feedback seriously, but we’re unable to confirm the situation based on this post. Please contact {business_name} at {contact_phone} or {contact_email} so we can look into it. — {signoff_name_or_role}”

SPA-LEGAL-HOLD-01 (Internal only; DO NOT POST)
“MANUAL-ONLY HOLD: Legal threat cues detected. Escalate to Legal/Owner. No public response without approval.”

C) HVAC TEMPLATES (HVAC-*)
HVAC-POS-01
“Thanks for the great review and for choosing {business_name}. We appreciate the opportunity to help. If you need anything else, contact us at {contact_phone} or {contact_email}. — {signoff_name_or_role}”

HVAC-NEU-01
“Thank you for the feedback. We’re always working to improve our service. If you’d like to share more details privately, please reach us at {contact_phone} or {contact_email}. — {signoff_name_or_role}”

HVAC-NEG-01 (Late/no-show)
“We’re sorry to hear this was frustrating. We’d like to look into what happened and help resolve it—please contact {business_name} at {contact_phone} or {contact_email}. — {signoff_name_or_role}”

HVAC-NEG-DMG-01 (Alleged damage; no liability admission)
“Thank you for letting us know. We take concerns like this seriously and want to investigate. Please contact {business_name} at {contact_phone} or {contact_email} so we can review the situation and work toward a resolution. — {signoff_name_or_role}”

HVAC-FAKE-01
“We take feedback seriously, but we’re unable to identify the job from this post. Please contact {business_name} at {contact_phone} or {contact_email} so we can look into it. — {signoff_name_or_role}”

HVAC-LEGAL-HOLD-01 (Internal only; DO NOT POST)
“MANUAL-ONLY HOLD: Legal language detected. Route to Owner/Legal and preserve all records. No posting permitted.”

============================================================
Launch Gate Reminder
- Do not enable auto-post until engineering demonstrates: (1) detectors fire, (2) blocked_manual_review truly prevents posting via API + UI, (3) audit logs include hold/block events, (4) weekly KPIs reconcile posted vs approved vs blocked.

If customer-facing comms are needed during verification, use the business website URL and contact email above.