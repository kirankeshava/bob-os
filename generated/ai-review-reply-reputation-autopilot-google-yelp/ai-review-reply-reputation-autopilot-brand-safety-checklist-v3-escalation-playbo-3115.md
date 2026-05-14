# AI Review Reply & Reputation Autopilot — Brand Safety Checklist v3 + Escalation Playbook v3 + Approved Templates Library v3 (Google/Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:26:53.389Z

---

Website for legitimacy/reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4n4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

============================================================
A) BRAND-SAFETY & PLATFORM COMPLIANCE CHECKLIST v3 (TICK-BOX)
============================================================
Scope: Responses drafted/posted to Google Business Profile (GBP) and Yelp for local businesses (Dentist, Med Spa, HVAC). Goal: brand-safe, non-inflammatory, non-liability-admitting, and platform-policy aligned.

A1. Universal “HARD BLOCK / MANUAL-ONLY HOLD” TRIGGERS (DO NOT AUTO-POST)
[ ] PHI/HIPAA risk: reviewer mentions diagnosis, procedure, meds, medical history, appointment details; OR reviewer names a patient other than themselves.
[ ] Response draft contains or attempts to confirm treatment/visit/records: “we reviewed your chart/records/visit,” “according to your file,” “when you came in on…”, “your procedure.”
[ ] Legal threat / litigation: “attorney/lawyer,” “lawsuit,” “sue,” “court,” “legal action,” “served papers,” “demand letter,” “BBB complaint with counsel,” “my lawyer will contact you.”
[ ] Safety incident / injury / hazard: “injured,” “hurt,” “fire,” “gas leak,” “carbon monoxide,” “shock,” “unsafe,” “assault,” “harassment,” “stalker,” “threatened,” “police.”
[ ] Hate speech, discriminatory slurs, or credible threats of violence.
[ ] Extortion or blackmail: “give me a refund or I’ll…,” “remove this or else,” “pay me.”
Expected behavior when any trigger fires:
- escalation_level set (PHI, Legal, Safety, Harassment)
- response_mode = blocked_manual_review
- post_status = blocked_manual_review (cannot post via API/UI)
- audit log event emitted: flagged → blocked
- draft should be either (a) not generated, or (b) generated in “safe stub” form for human-only review

A2. UNIVERSAL RESPONSE REQUIREMENTS (WHEN NOT BLOCKED)
[ ] Tone: calm, appreciative, non-defensive; no sarcasm, no blame, no escalation.
[ ] Never admit liability or wrongdoing (“we messed up,” “our fault,” “negligent,” “malpractice,” “fraud”).
[ ] Never confirm identity or service details. Use generic language: “we can’t find enough info here, but we’d like to help.”
[ ] Always move resolution offline for any neutral/negative review:
    Required CTA: “Please contact [phone/email] so we can learn more and help.”
[ ] No personal data: no full names of staff unless business explicitly approves (default: no names). No addresses. No appointment times. No invoice numbers.
[ ] No incentives or solicitation: do not offer discounts, refunds contingent on review changes, gifts, freebies, “we’ll take care of you if you update this review,” etc.
[ ] No “review gating”: do not ask happy customers to leave reviews while routing unhappy ones offline.
[ ] No promises of removal or platform enforcement: never say “Yelp/Google will remove this,” “we’ll get this taken down.”
[ ] No competitor disparagement: never accuse competitor or reviewer of lying/scam in public.
[ ] No medical outcome guarantees: no “guaranteed results,” “permanent,” “100%,” “cure,” “best in town” if it implies outcomes.
[ ] For Med Spa: avoid regulated claims (weight loss guarantees, pain elimination, “FDA approved” unless verified).
[ ] For Dentist: avoid “we fixed your…,” “your x-ray showed…”; do not mention specific treatments.
[ ] For HVAC: avoid admitting property damage; do not promise reimbursement publicly.

A3. “SOFT BLOCK” (ALLOW DRAFT, REQUIRE EXTRA SAFE WORDING + ESCALATION)
[ ] Billing dispute / refund demand
[ ] Accusation of rudeness/discrimination (non-slur)
[ ] Suspected fake review / competitor
[ ] Allegation of damage (HVAC) without injury
Expected behavior:
- escalation_level = Ops/Billing (or Reputation)
- Draft must include: empathy + offline CTA + no factual debate + no liability admission.

A4. PLATFORM-SPECIFIC RULES
Google Business Profile (GBP)
[ ] Keep responses concise; avoid marketing spam; address experience, invite offline.
[ ] No incentives; no removal promises; avoid personal data.

Yelp
[ ] Do not mention Yelp policy enforcement/removal.
[ ] Avoid back-and-forth bait. One response max recommended; move offline.
[ ] No incentives; no “please update/remove your review.”

A5. REQUIRED SAFE PHRASES (APPROVED)
- “Thank you for the feedback.”
- “We’re sorry to hear you had a frustrating experience.”
- “We’d like to learn more and see how we can help—please contact us at [contact].”
- “For your privacy, we can’t discuss details here.” (Use ONLY if reviewer introduces medical/private details; do not confirm they were a patient.)

A6. BANNED / BLOCKED PHRASES (NON-EXHAUSTIVE)
- PHI confirmation: “chart,” “records,” “your visit,” “your appointment on,” “your treatment,” “your procedure,” “as your provider,” “our patient.”
- Liability admission: “our fault,” “we were negligent,” “we failed,” “malpractice,” “we damaged,” “we broke,” “we caused.”
- Incentives: “discount,” “coupon,” “gift,” “free,” “refund if you change,” “we’ll compensate you for updating.”
- Retaliation/threat: “we will sue,” “defamation,” “we’ll report you,” “you’ll be hearing from our lawyer” (these should force manual-only hold).

A7. AUDIT TRAIL MINIMUM FIELDS (FOR EVERY DRAFT/POST)
[ ] review_source (GBP/Yelp)
[ ] review_id
[ ] business_id/location_id
[ ] review_text_hash
[ ] detected_risk_flags (array)
[ ] escalation_level
[ ] response_mode (auto_ok / needs_human / blocked_manual_review)
[ ] draft_version
[ ] model_version + prompt/safety_rules_version
[ ] human_approver_id (nullable)
[ ] approval_timestamp (nullable)
[ ] posted_timestamp (nullable)
[ ] post_status (posted / error / blocked_manual_review / awaiting_approval)
[ ] hold_reason + blocked_timestamp + unblocker_id (if blocked)

A8. QA SIGN-OFF EVIDENCE CHECKLIST (WHAT TO ATTACH)
[ ] Screenshot or export proving blocked_manual_review cannot post via UI
[ ] API log snippet proving blocked_manual_review cannot post via API
[ ] Sample audit log rows for: draft_created, flagged, blocked, approved, posted
[ ] Weekly KPI export showing reconciliation: approved vs posted vs blocked counts

====================================
B) ESCALATION PLAYBOOK v3 (OPS READY)
====================================
Severity Levels
- L0 Auto OK: positive/neutral; mild issues without sensitive triggers.
- L1 Needs Human: billing dispute, rude staff claim, suspected fake, competitor comparison.
- L2 Safety/PHI/Legal: manual-only hold; do not post until reviewed by owner/legal/clinical lead.

Routing + SLAs (default; adjust per customer)
- Billing disputes: Billing Lead within 24h
- Service quality / scheduling: Ops/GM within 24h
- Alleged damage (HVAC): Ops + Owner within 12h; collect job notes/photos
- Safety incident/injury: Owner/GM within 4h; incident report; consider insurer
- PHI/HIPAA mention: Compliance/Owner same-day; do not confirm patient relationship
- Legal threats: Owner + Legal same-day; do not respond publicly until advised
- Harassment/hate/threats: Owner within 4h; consider platform report + law enforcement guidance

Evidence to Collect (before any public response for L1/L2)
- Review URL + screenshot
- Internal ticket/job/appointment logs (do not paste into public response)
- Staff statements
- Any photos/videos
- Prior communications

Approved Response Strategy by Scenario (public)
1) Billing dispute (L1)
- Do: acknowledge, invite offline, avoid pricing specifics unless verified and customer-approved.
- Don’t: argue line items publicly or admit wrongdoing.

2) Service quality complaint (L1)
- Do: apologize for experience (not fault), invite offline, commit to learning.
- Don’t: say “we were short-staffed and messed up.”

3) Suspected fake/competitor (L1)
- Do: state you can’t locate experience from the info provided; invite offline; keep neutral.
- Don’t: accuse them of lying, threaten, or mention reporting to Yelp/Google.

4) PHI/medical details mentioned by reviewer (L2)
- Do: generic privacy line + offline contact.
- Don’t: confirm they are a patient or refer to records/visits.

5) Legal threat (L2)
- Do: block auto-post; human review only; often no public response or minimal neutral response.
- Don’t: debate facts or threaten countersuit.

6) Safety incident (L2)
- Do: block auto-post; investigate; provide a minimal neutral holding statement if approved.
- Don’t: admit liability or promise compensation publicly.

“DO NOT POST” Conditions (always)
- Any PHI confirmation language
- Any legal threat content before legal review
- Any credible safety/injury allegation before incident review
- Any hate speech/threats (avoid engagement; consider platform report)

===============================================
C) APPROVED RESPONSE TEMPLATES LIBRARY v3
===============================================
Rules for variables:
Allowed variables: {business_name}, {city}, {phone}, {email}, {signature_name_or_team}.
BANNED variables: reviewer name, staff names, appointment dates, invoice numbers, procedure names, diagnosis, prices (unless business verified + explicitly approves for that response).
Every neutral/negative template includes an offline CTA.

C1) DENTIST TEMPLATES (Google/Yelp)
DENT-01 Positive (Auto OK)
“Thanks for the kind words and for choosing {business_name}. We appreciate you taking the time to share your experience. We look forward to seeing you again.”

DENT-02 Neutral/Short (Auto OK)
“Thank you for the feedback. If there’s anything we could have done to make your experience even better, please reach us at {phone} or {email}.”

DENT-03 Mild Negative (Needs Human optional)
“Thank you for letting us know. We’re sorry to hear your visit didn’t meet expectations. We’d like to learn more and see how we can help—please contact us at {phone} or {email}.”

DENT-04 Strong Negative (Needs Human)
“We’re sorry to hear you had a frustrating experience. We take feedback seriously and would like to look into what happened. Please contact {business_name} at {phone} or {email} so we can learn more and work toward a resolution.”

DENT-05 PHI Mention (Manual-only hold suggested; if approved, use this minimal version)
“Thank you for your message. For privacy reasons, we can’t discuss details here. If you’re willing, please contact {business_name} at {phone} or {email} so we can address your concerns directly.”

DENT-06 Suspected Fake (Needs Human)
“Thank you for the review. We’re not able to match this feedback to an experience based on the information provided, but we want to help. Please contact us at {phone} or {email} so we can learn more.”

C2) MED SPA TEMPLATES (Google/Yelp)
SPA-01 Positive (Auto OK)
“Thank you for the great feedback. We’re glad you had a positive experience with {business_name}. We appreciate your support and hope to see you again soon.”

SPA-02 Neutral (Auto OK)
“Thanks for taking the time to share your feedback. If there’s anything we can do to improve your next visit, please contact us at {phone} or {email}.”

SPA-03 Mild Negative (Needs Human optional)
“We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and help—please reach out to {business_name} at {phone} or {email}.”

SPA-04 Strong Negative (Needs Human)
“Thank you for bringing this to our attention. We aim to provide a professional, respectful experience every time, and we’d like to understand what happened. Please contact {phone} or {email} so we can follow up directly.”

SPA-05 Medical/outcome claim in review (Manual-only hold if it risks regulated claims; if approved, keep generic)
“Thank you for your feedback. We can’t address personal details here, but we’d like to connect and help. Please contact {business_name} at {phone} or {email}.”

SPA-06 Suspected Fake/Competitor (Needs Human)
“Thanks for the note. We’re not able to identify this experience from the details shared, but we want to look into it. Please contact {phone} or {email} so we can learn more.”

C3) HVAC TEMPLATES (Google/Yelp)
HVAC-01 Positive (Auto OK)
“Thank you for the review and for choosing {business_name}. We’re glad we could help, and we appreciate you taking the time to share your experience.”

HVAC-02 Neutral (Auto OK)
“Thanks for your feedback. If you have any additional details to share, please reach us at {phone} or {email}.”

HVAC-03 Mild Negative (Needs Human optional)
“We’re sorry to hear this wasn’t a 5-star experience. We’d like to learn more and make it right—please contact {business_name} at {phone} or {email}.”

HVAC-04 Strong Negative / Service failure (Needs Human)
“Thank you for the feedback. We’re sorry to hear about your experience and we’d like to look into this. Please contact us at {phone} or {email} so we can learn more and help.”

HVAC-05 Alleged damage (Needs Human; avoid liability)
“We’re sorry to hear about your concern. We’d like to review the situation and understand the details. Please contact {business_name} at {phone} or {email} so we can follow up directly.”

HVAC-06 Suspected Fake (Needs Human)
“Thank you for the review. We’re not able to match this to a service call from the information provided, but we want to help. Please contact {phone} or {email} so we can learn more.”

===========================
D) IMPLEMENTATION NOTES
===========================
1) Enforce hard blocks at two gates: (a) pre-generation classifier, and (b) pre-post gate. Pre-post gate is the final authority.
2) If response_mode=blocked_manual_review, UI must disable “Post” and API must reject with deterministic error_code.
3) Always log detector_version and safety_rules_version for traceability.
4) Weekly report reconciliation must include counts for posted, approved-not-posted, blocked, and errors, plus median response time computed only for posted responses.
