# Brand Safety & Escalation Pack v3.0 — Checklist, Playbook, and Approved Templates (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T01:00:32.567Z

---

Brand Safety & Escalation Pack v3.0 (Operational)
Scope: AI-drafted responses to Google Business Profile (GBP) and Yelp reviews for Dentist, Med Spa, HVAC. Goal: brand-safe, non-inflammatory, policy-aligned, no hallucinations, correct escalation, and auditability.

A) BRAND-SAFETY CHECKLIST v3.0 (tick-box)
1) Identity/Privacy
[ ] Do NOT confirm the reviewer is a real customer/patient (“we saw you last Tuesday”, “your appointment”).
[ ] Do NOT reference records/charts/visit details (“we reviewed your chart/records/visit”). If review mentions these, use generic phrasing only.
[ ] Do NOT include personal data: full names, phone/email of reviewer, addresses, license numbers, employee last names unless already public and safe. Prefer role-based terms (“our team”).
[ ] HIPAA/PHI: For dental/med spa, never acknowledge treatment received, diagnosis, meds, procedures, or outcomes. Use: “We can’t discuss details here; please contact our office directly.”

2) Liability / Admissions / Legal
[ ] No admission of fault or negligence (“we messed up”, “our tech broke it”). Use empathy + intent to investigate.
[ ] If legal threat language detected (sue/lawsuit/attorney/demand letter), set response mode = HOLD (manual-only). Do not post automatically.
[ ] If safety incident/injury allegation: escalate as Safety; response must avoid causation (“caused”, “because of us”).

3) Platform Policy Alignment (GBP + Yelp)
[ ] No incentives/discounts to modify reviews (“we’ll refund if you remove”, “coupon for updating”).
[ ] No review gating: don’t ask only happy customers to review.
[ ] No promises of removal or enforcement (“we’ll have Yelp remove this”, “Google will delete it”).
[ ] No competitor disparagement/comparisons.
[ ] No harassment/retaliation/threats.

4) Medical/Service Claims
[ ] Dentist/Med Spa: no guaranteed outcomes (“permanent”, “100% effective”, “cured”).
[ ] Med Spa: avoid medical condition treatment claims unless business explicitly provides medically supervised services and language is pre-approved; default to cosmetic/service framing.
[ ] HVAC: no unsafe technical promises (“definitely no CO leak”), no code-compliance guarantees without inspection.

5) Tone / De-escalation
[ ] Thank + empathy, no sarcasm, no arguing facts point-by-point in public.
[ ] Always include offline CTA for negatives/neutral: phone/email via official business line; request to contact manager.
[ ] Avoid asking for sensitive info publicly. Never ask for medical details.

6) Hallucination Controls
[ ] Do not invent details: appointment dates, staff names, pricing, warranty terms, specific services performed.
[ ] Allowed variables: business name, general service category, generic manager title, official contact method.

7) Required Elements by Scenario
Positive: [ ] Thanks [ ] Invite back
Neutral: [ ] Thanks [ ] Clarify generically [ ] Invite offline
Negative: [ ] Apology for experience (not fault) [ ] Offline CTA [ ] Offer to investigate
Suspected fake: [ ] State cannot find record generically [ ] Invite offline to verify [ ] No accusations

B) ESCALATION PLAYBOOK v3.0
Escalation Levels:
L0 = Auto-Respond Allowed (low risk)
L1 = Human Approval Required (moderate risk: disputes, mild accusations)
L2 = Manual-Only Hold (high risk: PHI/medical specifics, legal threats, safety/injury, discrimination/harassment)

Routing + SLAs:
Service quality complaint (no safety): Ops/GM within 24h (L1)
Billing/refund dispute: Billing lead within 24h (L1)
Alleged property damage (HVAC): Ops + Insurance contact within 4h (L2 if explicit damage claim)
Safety incident/injury/CO leak: Owner/GM within 4h (L2)
Discrimination/harassment allegations: Owner/HR same day (L2)
HIPAA/PHI mention (dentist/med spa): Compliance/Owner same day (L2)
Legal threats (“attorney”, “sue”): Legal same day (L2)

Evidence to collect (internal, not posted): review screenshot, job/appointment lookup, technician notes, call logs, invoices, any prior communications.

DO NOT POST conditions (force HOLD):
- Reviewer mentions medical details and draft would confirm relationship
- Any legal threat keywords
- Any request to contact via personal phone/social
- Any content that could be construed as retaliation or admitting fault

Public response patterns (safe):
- PHI-safe: “We can’t discuss details here, but we take concerns seriously. Please contact [office/manager] at [official contact] so we can help.”
- Legal threat: “We take this seriously and want to address it appropriately. Please contact [manager] at [official contact].” (Only after manual approval; default HOLD.)
- Suspected fake: “We can’t locate this experience from the information provided. Please contact us at [official contact] so we can look into it.”

C) APPROVED RESPONSE TEMPLATE LIBRARY v3.0 (IDs + per-vertical)
Global rules: Allowed variables = {BusinessName}, {City}, {ManagerTitle}, {OfficialPhoneOrEmail}. Prohibited substitutions: reviewer name, appointment date/time, procedure details, prices/refunds unless verified and explicitly approved.

DENTIST
DENT-POS-01 (Positive)
“Thank you for the kind words and for choosing {BusinessName}. We’re glad you had a great experience with our team. We appreciate your feedback and look forward to seeing you again.”

DENT-NEU-01 (Neutral/mixed)
“Thank you for the feedback. We’re always working to improve the experience for every guest. If you’re open to sharing more, please contact our {ManagerTitle} at {OfficialPhoneOrEmail} so we can learn and help.”

DENT-NEG-01 (Strong negative, no PHI)
“Thank you for bringing this to our attention. We’re sorry to hear your experience didn’t meet expectations. Because we can’t discuss details here, please contact our {ManagerTitle} at {OfficialPhoneOrEmail} so we can look into this and work toward a resolution.”

DENT-PHI-01 (PHI mention in review; safe generic)
“Thank you for your message. To protect privacy, we can’t discuss anything related to care in a public forum. Please contact our {ManagerTitle} at {OfficialPhoneOrEmail} so we can address your concerns directly.”

DENT-FAKE-01 (Suspected fake)
“Thank you for your review. We can’t locate an experience matching this from the information provided. Please contact our {ManagerTitle} at {OfficialPhoneOrEmail} so we can verify details and help.”

DENT-LEGAL-01 (Legal threat — HOLD by default; only manual)
“Thank you for your message. We take concerns seriously and want to address this appropriately. Please contact our {ManagerTitle} at {OfficialPhoneOrEmail}.”

MED SPA
MSPA-POS-01
“Thank you for your review and for choosing {BusinessName}. We’re glad you enjoyed your visit and appreciate you taking the time to share your experience.”

MSPA-NEU-01
“Thank you for the feedback. We’re always working to improve. If you’d like to share more, please contact our {ManagerTitle} at {OfficialPhoneOrEmail} so we can follow up.”

MSPA-NEG-01 (No medical claims)
“We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and see how we can help. Please contact our {ManagerTitle} at {OfficialPhoneOrEmail}.”

MSPA-PHI-01 (Mentions treatment/outcome)
“Thank you for reaching out. To protect privacy, we can’t discuss any service details publicly. Please contact our {ManagerTitle} at {OfficialPhoneOrEmail} so we can address your concerns directly.”

MSPA-FAKE-01
“Thank you for your review. We can’t locate an experience matching this from the information provided. Please contact our {ManagerTitle} at {OfficialPhoneOrEmail} so we can look into it.”

MSPA-LEGAL-01 (HOLD by default)
“Thank you for your message. We take concerns seriously and want to address this appropriately. Please contact our {ManagerTitle} at {OfficialPhoneOrEmail}.”

HVAC
HVAC-POS-01
“Thank you for the review and for choosing {BusinessName}. We appreciate the opportunity to help and are glad you had a good experience with our team.”

HVAC-NEU-01
“Thank you for the feedback. We’re always looking to improve. Please contact our {ManagerTitle} at {OfficialPhoneOrEmail} so we can learn more and follow up.”

HVAC-NEG-01 (Service issue)
“We’re sorry to hear this. We’d like to look into what happened and make things right if we can. Please contact our {ManagerTitle} at {OfficialPhoneOrEmail} with the best way to reach you.”

HVAC-DMG-01 (Alleged damage; L2 if explicit)
“Thank you for letting us know. We take concerns like this seriously and would like to investigate. Please contact our {ManagerTitle} at {OfficialPhoneOrEmail} so we can gather details and follow up.”

HVAC-FAKE-01
“Thank you for your review. We can’t locate a service visit matching this from the information provided. Please contact our {ManagerTitle} at {OfficialPhoneOrEmail} so we can verify and assist.”

HVAC-LEGAL-01 (HOLD by default)
“Thank you for your message. We take concerns seriously and want to address this appropriately. Please contact our {ManagerTitle} at {OfficialPhoneOrEmail}.”

Platform notes (apply to all templates):
- Yelp: Do not mention “Yelp will remove” or imply policy enforcement; do not ask for updated review in exchange for anything.
- GBP: Same—no incentives, no review gating. Keep response concise; avoid sensitive details.

Operational acceptance criteria (quick):
- Any PHI/records/visit confirmation phrase => block + force PHI-safe template.
- Any legal threat keyword => post_status=blocked_manual_review; escalation_level=Legal; no auto-post.
- Any incentive/discount phrasing => blocked; rewrite without offers tied to review changes.
- Any competitor disparagement => blocked; rewrite neutral.

End of Pack v3.0