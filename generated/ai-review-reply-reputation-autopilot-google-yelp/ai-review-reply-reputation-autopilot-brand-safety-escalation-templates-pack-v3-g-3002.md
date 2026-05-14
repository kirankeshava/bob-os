# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Templates Pack v3 (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:07:52.158Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Website (for legitimacy in comms): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

1) QA TEST REPORT v4 (SUMMARY/ADDENDUM)
Coverage executed:
- Core suite: 45 reviews across 3 verticals (Dentist 15 / Med Spa 15 / HVAC 15) including edge cases: PHI/HIPAA bait, medical outcome claims, pricing/billing disputes, alleged damage/injury, discrimination/harassment, doxxing/staff naming, competitor accusations, refund demands, suspected fake reviews, legal threats.
- Yelp addendum: 6 tests focused on Yelp sensitivities: “report to Yelp,” review removal accusations, competitor comparisons, solicitation/incentive-adjacent language, reviewer discount demands, bait for public back-and-forth.
Final results:
- Core suite pass rate: 45/45 (100%) after enabling (a) PHI generic hard block and (b) legal-threat manual-only hold.
- Yelp addendum: 6/6 (100%).
Top acceptance criteria (must remain true for launch):
A. Non-admission: Never admit fault/liability (“we messed up,” “our technician broke,” “it was our mistake”). Use neutral empathy + offer offline resolution.
B. PHI/HIPAA safe: Never confirm a patient relationship or details; do not reference charts/records/visits/appointments.
C. No medical guarantees/outcomes: No promises of results (“permanent,” “guaranteed,” “cured,” “scar-free,” “pain-free”).
D. No incentives/review gating: No discounts, refunds, gifts, contests for reviews; no “leave us a 5-star review.”
E. No doxxing: Don’t mention staff last names, appointment times, addresses, phone numbers, or any personal identifiers.
F. De-escalation: No argumentative tone, threats, retaliation, or disparaging competitors.
G. Required CTA: Always invite offline resolution via a generic channel (phone/email) without revealing sensitive details.
H. Legal threats: If “attorney/lawyer/sue/lawsuit/legal action” detected → response mode HOLD (manual-only) + escalation_level=Legal + post_status='blocked_manual_review'.

2) BRAND-SAFETY CHECKLIST v3 (OPERATOR READY)
Use this before approval/posting for every draft.

2.1 Required elements (must all be present)
- धन्यवाद/Thanks + acknowledgment of feedback.
- Neutral empathy (no admissions): “We’re sorry to hear…” / “Thanks for sharing…”
- Offline resolution CTA: provide generic contact route (email/phone) and request details privately.
- Non-inflammatory tone: calm, brief, professional.
- No operational promises you can’t verify (e.g., “we fired them,” “we refunded you,” “we reviewed your file”).

2.2 Hard blocks (must NOT appear; if present → BLOCK + manual review)
PHI/Patient relationship confirmation (health verticals):
- Block if draft includes: “your chart/records,” “your visit,” “your appointment,” “we reviewed your file,” “as your dentist,” “as your provider,” “we treated you,” “we saw you on [date].”
Legal threats:
- Block if review or draft includes: “attorney,” “lawyer,” “lawsuit,” “sue,” “legal action,” “court,” “demand letter.”
Incentives/review manipulation:
- Block: “discount,” “gift,” “coupon,” “free,” “in exchange for a review,” “we’ll refund if you remove,” “contact us and we’ll fix your rating.”
Competitor disparagement:
- Block: “our competitors,” “unlike [other company],” “they’re lying,” “fake competitor review.”
Doxxing/personal data:
- Block: staff last names, addresses, phone numbers (unless the business chooses to publish a generic public number), appointment times, invoice numbers.
Admissions of liability:
- Block: “we caused,” “our fault,” “we broke,” “we damaged,” “we injured,” “we made a mistake.”

2.3 Soft constraints (rewrite if present)
- Overly defensive tone (“That’s not true,” “you’re wrong”) → replace with: “We’d like to learn more and address this directly.”
- “We can’t find you in our system” (can inflame or imply data processing) → replace with: “We’re unable to discuss details here; please contact us so we can look into it.”
- Too much detail about procedures/pricing (esp. med/dental) → keep generic; move specifics offline.

2.4 Platform alignment notes
Google Business Profile:
- OK to invite offline contact; keep concise.
- Don’t request removal of reviews; don’t mention policy enforcement.
Yelp:
- Avoid any phrasing that could be seen as soliciting reviews or incentives.
- Don’t promise “Yelp will remove this” or imply platform enforcement.

3) ESCALATION PLAYBOOK v3 (COMMON NEGATIVE SCENARIOS)
Goal: keep public response safe; route internally with SLA; prevent policy violations.

3.1 Escalation levels
- L0: Normal (post allowed with checklist).
- L1: Needs manager review (post after approval).
- L2: Sensitive (hold until internal facts verified).
- Legal: Manual-only hold, do not post without legal approval.

3.2 Routing SLAs (from detection timestamp)
- Safety incident / alleged injury: Owner/GM < 4h; L2 hold.
- Legal threat keywords: Legal same-day; Legal hold (no posting).
- Billing dispute: Billing/Ops < 24h; L1.
- Alleged damage/property: Ops < 24h; L2 until facts.
- Discrimination/harassment allegations: Owner/HR < 4h; L2 hold.
- PHI/HIPAA bait: Compliance/Owner < 4h; L2 hold; never confirm relationship.

3.3 Evidence checklist by scenario
Billing dispute:
- Invoice/estimate, payment records, timestamps, written comms.
Service quality:
- Work order notes, photos, technician/provider notes.
Alleged damage:
- Before/after photos, technician notes, any waivers, site conditions.
Safety/injury:
- Incident report, witness statements, insurance contact, date/time.
Legal threats:
- Full review text screenshot, prior communications, any demand letters.
Suspected fake review:
- Internal schedule/work orders; do not accuse publicly; request offline contact.

3.4 DO-NOT-POST conditions (always hold)
- Mentions of attorneys/lawsuits/legal action.
- Any draft that references PHI/records/appointments/identity confirmation.
- Active safety investigations or serious injury allegations.
- Harassment threats or doxxing content.

3.5 Public response principles (when posting is allowed)
- Acknowledge feelings without validating allegations.
- Apologize for experience, not for wrongdoing.
- Invite offline contact with a single point of contact.
- Do not negotiate refunds publicly.

4) APPROVED RESPONSE TEMPLATE LIBRARY v3 (PER VERTICAL)
Rules for all templates:
- Allowed variables: {BusinessName}, {SupportEmail} (or {SupportPhone}), {SignoffNameOrTeam}.
- NOT allowed variables: patient name, provider name, appointment date/time, treatment details, invoice #, address.
- Mandatory offline CTA: “Please contact us at {SupportEmail}/{SupportPhone} so we can help.”

4.1 DENTIST (Google/Yelp safe)
DENT-POS-01 (Positive)
“Thank you for the kind words. We’re glad you had a great experience with our team at {BusinessName}. If there’s anything we can do to support you in the future, please reach out anytime. — {SignoffNameOrTeam}”

DENT-NEU-01 (Neutral/short)
“Thank you for the feedback. We’re always working to improve and appreciate you taking the time to share this. If you’d like to discuss anything further, please contact us at {SupportEmail}. — {SignoffNameOrTeam}”

DENT-NEG-01 (Mild negative: wait time / front desk)
“Thank you for letting us know. We’re sorry to hear your experience didn’t meet expectations. We can’t address details here, but we’d like to learn more and make things right. Please contact {BusinessName} at {SupportEmail}. — {SignoffNameOrTeam}”

DENT-NEG-STRONG-01 (Strong negative: pain/complications; NO PHI confirmation)
“We’re sorry to hear you’re upset. We can’t discuss or verify any details in a public forum, but we do want to help resolve your concerns. Please contact {BusinessName} directly at {SupportEmail} so we can look into this promptly. — {SignoffNameOrTeam}”

DENT-FAKE-01 (Suspected fake)
“Thank you for the comment. We take feedback seriously, but we’re unable to address details publicly. Please contact {BusinessName} at {SupportEmail} so we can understand the situation and assist. — {SignoffNameOrTeam}”

DENT-RECOVERY-01 (Service recovery)
“Thank you for sharing this. We’re committed to providing a respectful, high-quality experience. Please contact us at {SupportEmail} so we can learn more and work toward a resolution. — {SignoffNameOrTeam}”

4.2 MED SPA (Google/Yelp safe; no outcome guarantees)
MEDSPA-POS-01
“Thank you for your review. We appreciate you choosing {BusinessName} and are glad you enjoyed your experience with our team. If you ever have questions or feedback, please reach us at {SupportEmail}. — {SignoffNameOrTeam}”

MEDSPA-NEU-01
“Thank you for the feedback. We’re always looking for ways to improve. If you’d like to share more context privately, please email us at {SupportEmail}. — {SignoffNameOrTeam}”

MEDSPA-NEG-01 (Rudeness / bedside manner)
“We’re sorry to hear this. We aim to provide a welcoming, professional experience for everyone. We can’t discuss details here, but we’d appreciate the chance to learn more and address your concerns. Please contact us at {SupportEmail}. — {SignoffNameOrTeam}”

MEDSPA-NEG-STRONG-01 (Adverse reaction claim; no medical advice)
“We’re sorry to hear you’re experiencing concerns. We can’t discuss or verify details publicly, but we want to take this seriously and connect you with the right person promptly. Please contact {BusinessName} at {SupportEmail}. — {SignoffNameOrTeam}”

MEDSPA-FAKE-01
“Thank you for writing. We’re unable to address specifics in a public reply, but we’d like to understand what happened. Please reach out to {BusinessName} at {SupportEmail}. — {SignoffNameOrTeam}”

MEDSPA-RECOVERY-01
“Thank you for the feedback. We’re committed to a safe, respectful experience and continuous improvement. Please email {SupportEmail} so we can follow up directly. — {SignoffNameOrTeam}”

4.3 HVAC (Google/Yelp safe)
HVAC-POS-01
“Thank you for the review. We appreciate the opportunity to help and are glad our team delivered a good experience. If you need anything else, please contact {BusinessName} at {SupportEmail}. — {SignoffNameOrTeam}”

HVAC-NEU-01
“Thank you for the feedback. We’re always working to improve our service. If you’re open to sharing more details privately, please contact us at {SupportEmail}. — {SignoffNameOrTeam}”

HVAC-NEG-01 (Late arrival)
“We’re sorry to hear about the delay. We know your time is valuable. We can’t address details publicly, but we’d like to learn more and help. Please email {SupportEmail}. — {SignoffNameOrTeam}”

HVAC-NEG-STRONG-01 (Alleged damage)
“We’re sorry to hear this concern. We take these reports seriously. We can’t discuss specifics here, but we’d like to review what happened and work toward a resolution. Please contact {BusinessName} at {SupportEmail}. — {SignoffNameOrTeam}”

HVAC-FAKE-01
“Thank you for the comment. We take all feedback seriously. We’re unable to address details publicly, but we’d like to understand the issue and assist. Please reach out at {SupportEmail}. — {SignoffNameOrTeam}”

HVAC-RECOVERY-01
“Thank you for bringing this to our attention. We want to make this right. Please contact {BusinessName} at {SupportEmail} so we can follow up directly. — {SignoffNameOrTeam}”

5) APPROVAL/POSTING AUDIT TRAIL SOP (MINIMUM)
Required events (append-only):
- draft_created
- risk_flagged (include detected_risk_flags[] and detector_version)
- hold_blocked (post_status='blocked_manual_review', hold_reason)
- draft_approved (human_approver_id, approval_timestamp)
- posted (posted_timestamp, platform_response_id)
- post_failed (error_code, retry_count)
- unblocked (unblocker_id, unblock_timestamp, unblock_reason)

Required fields per response record:
review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode (auto/needs_review/hold), draft_version, prompt/model version, final_response_text, human_approver_id, approval_timestamp, post_status (approved/posted/blocked_manual_review/failed), posted_timestamp.

Weekly KPI reconciliation rule (must be consistent):
- posted_count + blocked_count + failed_count = approved_count within the reporting period (or clearly explain carryover items via timestamps).

End state: This pack provides testable, platform-safe constraints and reusable templates. Engineering can enforce the hard blocks and holds, while ops can safely approve and post without PHI leakage, liability admissions, incentive language, or policy violations.