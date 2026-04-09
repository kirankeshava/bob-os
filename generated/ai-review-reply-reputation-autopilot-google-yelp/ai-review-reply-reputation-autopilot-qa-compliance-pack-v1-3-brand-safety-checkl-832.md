# AI Review Reply & Reputation Autopilot — QA & Compliance Pack v1.3 (Brand-Safety Checklist v3, Escalation Playbook v3, Approved Templates v3, Audit-Trail Requirements)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:50:32.396Z

---

Overview
This pack defines the compliance/brand-safety operating standard for the AI Review Reply & Reputation Autopilot MVP. It is designed to be directly testable and implementable (detectors + posting gates + audit logs) and aligned with Google Business Profile and Yelp response norms. Use this as (1) launch gate criteria, (2) reviewer training, and (3) regression checklist for future prompt/model changes.

1) Brand-Safety Checklist v3 (tick-box)
A. Universal prohibitions (never include)
- [ ] No PHI/HIPAA confirmation: do not confirm the reviewer is/was a patient/client, and do not reference records: “chart/records/visit/appointment/treatment plan/X-rays/labs/photos before/after.”
- [ ] No medical outcome guarantees: no “cure,” “guaranteed results,” “permanent,” “best,” or outcome certainty.
- [ ] No liability admission: avoid “we messed up,” “our fault,” “we caused,” “we damaged,” “negligent,” “malpractice,” “illegal,” “fraud.” Use neutral language.
- [ ] No incentives or review gating: never offer discounts, refunds, credits, freebies, or “contact us and we’ll remove/replace the review.” Never ask only happy customers to review.
- [ ] No doxxing/personal data: never restate phone numbers, addresses, emails, appointment dates/times, staff schedules; never name staff unless the business explicitly allows it.
- [ ] No competitor disparagement: no negative comparisons (“unlike X,” “they’re worse,” etc.).
- [ ] No promises about platform enforcement: do not claim Yelp/Google will remove reviews; do not threaten to report users.

B. Required safe elements (must include)
- [ ] Calm, non-inflammatory tone; thank the reviewer when possible.
- [ ] Invite offline resolution with a clear CTA: “Please contact us at agent_bob_replit+review-bot@agentmail.to so we can help.”
- [ ] If negative: acknowledge feelings without confirming specifics; avoid debating facts.
- [ ] If safety/legal/PHI present: switch to ‘manual-only hold’ (do not post) and escalate.

C. Platform notes
- Google Business Profile: keep concise; avoid extended back-and-forth; do not reveal customer relationship.
- Yelp: do not mention Yelp rules/enforcement; no “we’ll get this removed”; keep responses professional and non-transactional.

Reviewer sign-off (required)
- [ ] Response reviewed by human approver
- [ ] No prohibited content present
- [ ] Offline CTA included (unless manual-only hold)
- [ ] Escalation correctly set

2) Escalation Playbook v3 (scenarios, routing, SLAs, do-not-post)
Escalation levels
- Level 0: Normal (auto-draft OK, can post after approval)
- Level 1: Service Recovery (ops follow-up needed; safe public response OK)
- Level 2: Billing/Refund Dispute (billing follow-up; response must avoid admitting fault)
- Level 3: Safety/Harassment/Discrimination (owner/GM review; response may be limited; sometimes hold)
- Level 4: PHI/Medical Sensitivity (HOLD—manual-only; compliance/owner review)
- Level 5: Legal Threat (HOLD—manual-only; legal review)

Routing + SLAs
- Service quality, delays, missed appointment, rude staff (Level 1): Ops manager response within 24h; public response can post if checklist passes.
- Billing dispute/price mismatch/refund demand (Level 2): Billing lead within 24h; public response: acknowledge concern, move offline, no numbers/prices unless verified.
- Alleged injury/damage/safety issue (Level 3): Owner/GM within 4h; collect incident details internally; public response: empathetic + offline; avoid fault.
- Discrimination/harassment claims or profanity/slurs (Level 3): Owner/GM within 4h; consider holding response if it escalates conflict.
- PHI/HIPAA or “I’m your patient / my procedure / my records” (Level 4): DO NOT POST. Notify compliance/owner same-day.
- Legal threats (“lawsuit,” “attorney,” “sue,” “demand letter”) (Level 5): DO NOT POST. Notify legal/owner same-day.

Evidence checklist (internal)
- Review source, review_id, screenshots, timeline, staff on duty, any communications logs, relevant policies, and proposed resolution steps.

DO-NOT-POST conditions
- Any PHI confirmation risk; any mention of records/visits; any legal threat; any active safety investigation; any response that could be interpreted as admission of wrongdoing.

3) Approved Response Templates v3 (Dentist, Med Spa, HVAC)
Rules for all templates
- Allowed variables: {business_name}, {contact_email}=agent_bob_replit+review-bot@agentmail.to, {phone_optional_if_business_provides}, {generic_team_name} (e.g., “our team”).
- Banned variables: patient name, appointment date/time, procedure names tied to identity, pricing unless verified, staff member names unless approved policy.
- Required: offline CTA for neutral/negative; for PHI/legal threat use HOLD and internal note (no posting).

A) Dentist templates
DENT-PO-01 Positive
“Thank you for the kind words and for taking the time to share your feedback. We’re glad you had a great experience with {business_name}. If there’s ever anything we can do to help, please reach out at {contact_email}.”
DENT-MN-02 Mixed/Neutral
“Thanks for your feedback. We’re always working to improve the experience at {business_name}. If you’re open to sharing more details privately, please contact us at {contact_email} so we can follow up.”
DENT-NE-03 Mild Negative (wait time, communication)
“Thank you for letting us know. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and see how we can help—please contact us at {contact_email}.”
DENT-SN-04 Strong Negative (pain, bad experience) — no PHI
“We’re sorry to hear you’re upset. While we can’t address details publicly, we take concerns seriously and would like to speak with you directly. Please contact {business_name} at {contact_email}.”
DENT-SF-05 Suspected Fake/Not a customer
“Thank you for the note. We take feedback seriously, but we’re not able to locate details from your post. Please contact us at {contact_email} so we can understand the situation and assist.”
DENT-HOLD-06 PHI/legal trigger
Status: HOLD—manual-only. Internal note: escalate Level 4 (PHI) or Level 5 (Legal). Do not post.

B) Med Spa templates
MS-PO-01 Positive
“Thank you for the wonderful feedback. We’re glad you enjoyed your experience at {business_name}. If you ever have questions or need support, reach us at {contact_email}.”
MS-MN-02 Mixed/Neutral
“Thanks for sharing your experience. We appreciate the feedback and would like to learn more. Please contact us at {contact_email} so we can follow up privately.”
MS-NE-03 Mild Negative
“We’re sorry to hear this didn’t meet your expectations. We’d like to make things right if we can—please reach out at {contact_email} so our team can connect with you directly.”
MS-SN-04 Strong Negative (results dissatisfaction) — avoid outcome promises
“We’re sorry you’re feeling disappointed. We can’t discuss details here, but we’d like to understand what happened and help. Please contact us at {contact_email}.”
MS-SF-05 Suspected Fake
“Thank you for your message. We want to look into this, but we don’t have enough information from the review to identify the situation. Please contact us at {contact_email} so we can assist.”
MS-HOLD-06 PHI/legal trigger
Status: HOLD—manual-only. Internal note: escalate Level 4/5. Do not post.

C) HVAC templates
HVAC-PO-01 Positive
“Thank you for choosing {business_name} and for the great review. We appreciate your support. If you need anything in the future, contact us anytime at {contact_email}.”
HVAC-MN-02 Mixed/Neutral
“Thanks for the feedback. We’re always working to improve. Please contact us at {contact_email} so we can learn more and follow up.”
HVAC-NE-03 Mild Negative (late arrival)
“Thank you for letting us know. We’re sorry your experience didn’t meet expectations. Please contact us at {contact_email} so we can review what happened and help.”
HVAC-SN-04 Strong Negative (damage allegation) — no admission
“We’re sorry to hear about your concern. We take issues like this seriously and would like to look into it. Please contact us at {contact_email} so we can follow up directly.”
HVAC-SF-05 Suspected Fake
“Thank you for the note. We’d like to understand more, but we don’t have enough details to identify the job. Please contact us at {contact_email} so we can assist.”
HVAC-HOLD-06 Legal threat trigger
Status: HOLD—manual-only. Internal note: escalate Level 5 Legal. Do not post.

4) Posting/Approval Audit Trail Requirements (acceptance criteria)
Required events
- draft_created, draft_flagged, draft_edited, approved, blocked_manual_review, posted, post_failed
Required fields (minimum)
- review_source (Google|Yelp), review_id, business_id/location_id, review_text_hash
- detected_risk_flags[] (PHI, Legal, Incentive, Liability, Harassment, Competitor)
- escalation_level, response_mode (auto|approve_required|hold_manual_only)
- draft_version, prompt_version/model_version, detector_version
- human_approver_id, approval_timestamp
- posted_timestamp, post_status (posted|blocked_manual_review|failed), error_code
- final_response_text, hold_reason, blocked_timestamp, unblocker_id (if applicable)
Reporting reconciliation rules
- Weekly KPIs must reconcile: approved_count = posted_count + blocked_count + failed_count (per platform, per location).

Customer-facing legitimacy reference (for outreach/materials)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

End of pack. Version: v1.3