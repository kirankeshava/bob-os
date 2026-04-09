# AI Review Reply & Reputation Autopilot — QA/Compliance Handoff Pack v1.3 (Checklist + Escalation Playbook + Approved Templates + Verification/Sign-off)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:01:10.608Z

---

Overview
This handoff pack is the operational + engineering-ready compliance bundle for the AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). It ensures responses are brand-safe, non-inflammatory, and policy-aligned; that negative reviews escalate correctly; that prohibited content is blocked; and that posting/approval/audit trails and weekly KPIs are trustworthy.

Product/legitimacy references for any customer-facing communication
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

A) Brand-Safety & Platform Policy Checklist v2.3 (per-response)
Use this before approving/posting any draft.

1) Required elements (must be present)
- Thanks/acknowledgement appropriate to sentiment (positive/neutral/negative).
- Offline resolution CTA for any negative/neutral dispute: “Please contact us at [PHONE/EMAIL] so we can help.”
- Professional, non-argumentative tone; no sarcasm, threats, or retaliation.
- No sensitive operational details (internal investigations, employee discipline, security footage, etc.).

2) Hard prohibitions (must NOT appear)
- PHI/HIPAA confirmation or implication (healthcare): do not confirm the reviewer is/was a patient, visited, received treatment, has a condition, or that you reviewed their chart/records/visit.
  Blocked examples: “We reviewed your chart/records/visit,” “As your dentist,” “During your appointment on…,” “We confirmed your treatment plan…”.
  Safe alternative: “We take feedback seriously. For privacy reasons, we can’t discuss details here; please contact our office so we can help.”
- Liability admission: “It was our fault,” “We caused damage,” “We made a mistake that harmed you,” “We’re legally responsible.”
  Safe alternative: “We’re sorry to hear about your experience. We’d like to learn more and work toward a resolution offline.”
- Medical outcome guarantees/claims (med spa/dentist): no promises of results, cures, permanence, or universal outcomes.
  Blocked examples: “Guaranteed results,” “Permanent fix,” “100% effective.”
- Incentives/solicitation: no discounts, gifts, contests, or offers in exchange for reviews; no review gating.
  Blocked examples: “Leave a review for 10% off,” “We’ll refund if you remove this,” “Contact us and we’ll make it right if you update your review.”
- Doxxing/personal data: do not name staff members, reveal identities, appointment times, addresses beyond public business address, or any personal contact details of the reviewer.
- Competitor disparagement: do not accuse competitors, do not call the reviewer a competitor, do not use inflammatory claims.
  Safe alternative: “We can’t verify details here; please contact us so we can look into it.”
- Promises about platform enforcement: do not claim Yelp/Google will remove reviews; do not threaten reporting.

3) Yelp-specific sensitivities
- Do not mention “Yelp policy,” “Yelp will remove,” or argue about moderation in public.
- Avoid prompting actions that resemble review solicitation incentives.

4) Google Business Profile specifics
- Avoid posting any content that could be construed as personal data or medical info; keep responses generic and respectful.

5) Escalation triggers (if any are true, do NOT auto-post)
- Legal threat keywords: “sue,” “lawsuit,” “attorney,” “legal action,” “court,” “demand letter.”
  Required action: response_mode=blocked_manual_review; escalation_level=Legal.
- Safety incident/injury/property damage claim.
  Required action: escalation_level=Safety/Incident; Owner/GM response within SLA.
- PHI mention or healthcare-specific identifying details.
  Required action: response_mode=blocked_manual_review; escalation_level=Privacy.

B) Escalation Playbook v2.3 (what to do for common negative scenarios)
General rule: respond politely, do not debate facts, move offline, and do not admit liability. If a “DO NOT POST” condition is present, hold for manual review and route internally.

Routing SLAs
- Safety/Incident (injury, fire, gas leak, property damage): Owner/GM within 4 hours.
- Legal threat: Legal same-day; do not post until cleared.
- Privacy/PHI (healthcare): Compliance/Owner same-day; do not post.
- Service failure (rude staff, delays, missed appointment, workmanship): Ops within 24 hours.
- Billing dispute/chargeback/refund: Billing within 24 hours.

Scenario guidance
1) Billing dispute / “You overcharged me”
- Public reply: acknowledge, invite offline to review account; do not quote prices unless the business has verified they are correct and non-sensitive.
- Collect: invoice ID, date range, communications, refund policy.

2) Service quality / workmanship (HVAC)
- Public reply: apologize for experience, offer inspection/follow-up offline; no liability admission.
- Collect: job number, tech notes, photos (if any), warranty terms.

3) Medical dissatisfaction (Dentist/Med Spa)
- Public reply: do not confirm treatment occurred; use privacy-protecting language; invite offline.
- Collect internally: only after identity verified privately.

4) Alleged injury/damage / safety concern
- Public reply: express concern, ask to contact directly; do not discuss details publicly.
- Collect: incident report, timestamps, witnesses, insurance contact (internal), photos.

5) Discrimination/harassment allegation
- Public reply: take seriously, invite offline, state commitment to respectful service without debating.
- Collect: staff schedule, any relevant policies/training records (internal).

6) Suspected fake review / cannot find record
- Public reply: do not call them a liar; do not accuse competitor; say you can’t locate details and invite them to contact with information.
- Internal: consider platform flagging via official tools, but do not promise removal.

DO NOT POST conditions (always manual-only hold)
- Legal threats; PHI/healthcare identifying details; active investigations; threats/harassment; requests to publicly share private records.

C) Approved Response Templates v2.3 (Dentist / Med Spa / HVAC)
Rules for variables (all verticals)
- Allowed: {BUSINESS_NAME}, {PHONE}, {EMAIL}, {SIGNOFF_NAME}, {CITY(optional)}
- Not allowed: reviewer name, staff name, appointment date/time, procedure name (healthcare), diagnosis, chart/records references, pricing details unless verified and non-sensitive.
- Required offline CTA for neutral/negative: include {PHONE} or {EMAIL}.

C1) Dentist — Google/Yelp-safe templates
DENT-POS-01 (Positive)
“Thank you for the kind words and for choosing {BUSINESS_NAME}. We’re glad you had a great experience. If there’s anything we can do to help in the future, please reach out at {PHONE}.”

DENT-NEU-01 (Neutral/short)
“Thank you for your feedback. We’re always working to improve. If you’d like to share more so we can better understand your experience, please contact {BUSINESS_NAME} at {PHONE} or {EMAIL}.”

DENT-NEG-01 (Mild negative)
“We’re sorry to hear this didn’t meet your expectations. For privacy reasons we can’t discuss details here, but we’d like to help. Please contact {BUSINESS_NAME} at {PHONE} or {EMAIL} so we can look into it.”

DENT-NEG-STRONG-01 (Strong negative)
“Thank you for bringing this to our attention. We take concerns seriously and want to address this directly. For privacy reasons we can’t discuss specifics in a public forum—please contact {BUSINESS_NAME} at {PHONE} or {EMAIL}. We’ll do our best to help.”

DENT-FAKE-01 (Suspected fake / cannot verify)
“Thank you for the feedback. We’re unable to identify the situation based on what’s shared here. Please contact {BUSINESS_NAME} at {PHONE} or {EMAIL} with additional information so we can look into it.”

DENT-LEGAL-HOLD-01 (Legal threat detected — manual-only hold wording if approved by legal)
“We’re sorry to hear about your concern. Please contact {BUSINESS_NAME} directly at {EMAIL} so we can route this appropriately.”

C2) Med Spa — Google/Yelp-safe templates
MSPA-POS-01
“Thank you for your review and for choosing {BUSINESS_NAME}. We appreciate you taking the time to share your experience. If you need anything else, contact us anytime at {PHONE}.”

MSPA-NEU-01
“Thank you for the feedback. We’d like to learn more so we can improve. Please reach out to {BUSINESS_NAME} at {PHONE} or {EMAIL}.”

MSPA-NEG-01 (No outcome claims)
“We’re sorry to hear you’re disappointed. We can’t discuss details here, but we’d like to understand what happened and see how we can help. Please contact {BUSINESS_NAME} at {PHONE} or {EMAIL}.”

MSPA-NEG-STRONG-01 (Safety/complications implied—still no PHI confirmation)
“Thank you for sharing this. We take concerns seriously. For privacy reasons we can’t address specifics here—please contact {BUSINESS_NAME} at {PHONE} or {EMAIL} so we can follow up directly.”

MSPA-FAKE-01
“We’re unable to match the details in this post to our records based on the information provided. Please contact {BUSINESS_NAME} at {PHONE} or {EMAIL} so we can look into it.”

MSPA-SERVICE-RECOVERY-01
“We appreciate the chance to make this right. Please contact {BUSINESS_NAME} at {PHONE} or {EMAIL} so we can understand your concerns and work toward a resolution.”

C3) HVAC — Google/Yelp-safe templates
HVAC-POS-01
“Thanks for choosing {BUSINESS_NAME} and for the great review. We’re glad we could help. If you ever need anything else, call us at {PHONE}.”

HVAC-NEU-01
“Thank you for the feedback. We’d like to learn more so we can improve. Please contact {BUSINESS_NAME} at {PHONE} or {EMAIL}.”

HVAC-NEG-01 (Service issue)
“We’re sorry to hear about your experience. We’d like to understand what happened and help resolve it. Please contact {BUSINESS_NAME} at {PHONE} or {EMAIL} so we can follow up.”

HVAC-NEG-STRONG-01 (Alleged damage/injury—no liability admission)
“Thank you for bringing this to our attention. We take concerns like this seriously and want to review what happened. Please contact {BUSINESS_NAME} at {PHONE} or {EMAIL} so we can follow up directly.”

HVAC-FAKE-01
“Thanks for the feedback. We’re unable to identify the job based on this post. Please contact {BUSINESS_NAME} at {PHONE} or {EMAIL} with more details so we can look into it.”

HVAC-BILLING-01
“We’re sorry for any confusion regarding billing. Please contact {BUSINESS_NAME} at {PHONE} or {EMAIL} so we can review the details and help.”

D) Verification & Engineering Sign-off (summary)
Objective: prove the system prevents unsafe/public posting, records an audit trail, and produces accurate weekly KPIs.

Minimum audit-log fields
review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode (auto | needs_approval | blocked_manual_review), draft_version, approver_id, approval_timestamp, posted_timestamp, post_status/error_code, final_response_text, model/prompt versions, detector_version, hold_reason, blocked_timestamp, unblocker_id.

Required audit events
draft_created, flagged, held(blocked_manual_review), approved, posted, failed_post, edited_after_approval.

Go/No-Go exit criteria
- Posting gates: legal-threat and PHI triggers must result in blocked_manual_review (no posting via API or UI).
- Templates: only approved template IDs allowed for auto-mode.
- Weekly KPIs reconcile: posted + failed + blocked/held == approved decisions for the period; response time calculations match timestamps.

If customer-facing support/outreach is needed
Use: agent_bob_replit+review-bot@agentmail.to and link the website above to establish legitimacy. Do not promise review removal, do not offer incentives, and do not discuss private details in public replies.