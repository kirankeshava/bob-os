# Brand Safety & Escalation Pack v3 — Checklist, Playbook, and Approved Response Templates (Dentist / Med Spa / HVAC)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:55:58.671Z

---

AI Review Reply & Reputation Autopilot (Google/Yelp)
Brand Safety & Escalation Pack v3 (Ops + Engineering)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/Contact: agent_bob_replit+review-bot@agentmail.to

1) BRAND-SAFETY CHECKLIST v3 (Tick-box)
Use this checklist for (a) prompt/template design, (b) pre-post review, and (c) audits.

A. Required components (must be present)
[ ] Polite, calm tone; no sarcasm, no argument, no blame.
[ ] Thanks/acknowledgment (even for negative reviews).
[ ] Offline CTA: invite the reviewer to contact the business directly (phone/email) to resolve.
[ ] Non-admission wording for negative scenarios (e.g., “We’d like to look into this” vs “We caused/We failed”).
[ ] If identity/service cannot be verified: use generic language (“We can’t confirm details here; please contact us”).
[ ] No promises about platform actions (no “we’ll get it removed”).

B. Prohibited content (hard blocks / do-not-post)
[ ] PHI/HIPAA confirmation (health): never confirm they are a patient/client, appointment date, procedure, diagnosis, “chart/records/visit,” or outcomes.
    - Block phrases: “your records,” “your chart,” “your visit,” “according to our notes,” “we reviewed your file,” “as discussed in your appointment.”
[ ] Medical/health guarantees or outcome claims: “guaranteed,” “cure,” “permanent results,” “100%,” “no risk,” before/after assertions.
[ ] Liability admission: “it’s our fault,” “we caused,” “we were negligent,” “we damaged,” “we broke,” “we messed up.”
[ ] Incentives or solicitation: discounts, freebies, gifts in exchange for reviews; “leave us a 5-star review.”
[ ] Review gating: “Contact us before posting,” or any attempt to filter negative reviews.
[ ] Doxxing/personal data: staff full names (unless already public + approved), phone numbers of individuals, addresses, license numbers, any personal identifiers.
[ ] Threats/retaliation: “we’ll sue,” “we’ll report you,” “we’ll ban you,” “defamation.”
[ ] Competitor disparagement: “Our competitor is worse,” “they’re scammers.”
[ ] Discriminatory language, slurs, or escalation of harassment.

C. Conditional rules (must route/escalate)
[ ] Legal threats (“attorney,” “lawsuit,” “sue,” “legal action”): response mode must be MANUAL-ONLY HOLD; escalation_level=Legal.
[ ] Safety/injury/alleged damage: escalate Ops/Owner; do not debate details; request offline contact.
[ ] HIPAA/PHI mentioned by reviewer: do not mirror details; do not confirm; generic offline CTA only.
[ ] Allegations of fraud/scam/theft: escalate Owner/Ops; keep response minimal and non-accusatory.

D. Platform policy alignment checks
Google Business Profile:
[ ] No incentives for reviews; no fake engagement.
[ ] Do not include private customer info.
[ ] Keep responses relevant and professional.
Yelp:
[ ] No asking for reviews in a way that violates Yelp guidance; no incentives.
[ ] Avoid public back-and-forth; take offline.
[ ] Do not claim you can remove reviews; do not encourage “Yelp will take this down.”

2) ESCALATION PLAYBOOK v3 (Scenarios + SLAs + Do/Don’t)
Escalation Levels:
L0: Safe to auto-respond (positive/neutral; mild negative without safety/legal/PHI).
L1: Needs human approval (strong negative, billing disputes, suspected fake, sensitive tone).
L2: Manual-only hold (PHI/HIPAA risk, legal threats, safety/injury, discrimination/harassment).

Routing SLAs (recommended):
- L2 Safety/Incident: Owner/GM < 4 hours
- L2 Legal threat: Legal contact same-day (or Owner if no counsel)
- L1 Billing dispute: Billing/Office Manager < 24 hours
- L1 Service quality/operations: Ops Manager < 24 hours

Evidence checklist (collect before responding where relevant):
- Review source + ID + timestamp
- Any internal ticket/order number (do not post publicly)
- Staff schedule/dispatch logs (HVAC)
- Call recordings/messages (if policy allows)
- For healthcare: confirm you do NOT verify patient identity publicly
- Photos/invoices (HVAC), payment receipt (billing)

Scenario guidance:
A) Billing/pricing dispute
- Do: acknowledge concern, invite offline resolution, offer to review account privately.
- Don’t: post itemized charges, admit fault, accuse reviewer of lying.

B) Service quality complaint (late, rude, poor work)
- Do: apologize for experience (not liability), invite offline, request date/time details privately.
- Don’t: argue facts publicly; name staff.

C) Safety/injury/alleged damage
- Escalate L2. Post minimal response only if approved.
- Do: take seriously, request offline contact immediately.
- Don’t: deny, admit, or diagnose; do not discuss insurance.

D) HIPAA/PHI mention (dentist/med spa)
- Escalate L2.
- Do: “We can’t discuss anything about a person’s care here. Please contact us directly.”
- Don’t: confirm they were a patient, confirm procedures/outcomes.

E) Suspected fake/competitor
- Escalate L1.
- Do: say you can’t find a matching record and invite offline contact.
- Don’t: accuse competitor; threaten; claim removal.

F) Legal threat
- Escalate L2 Legal; MANUAL-ONLY HOLD.
- Do: acknowledge, request direct contact, end.
- Don’t: debate, admit fault, mention attorneys unless counsel approves.

3) APPROVED RESPONSE TEMPLATE LIBRARY v3
Rules for all templates:
- Allowed variables only: {BusinessName}, {SupportEmailOrPhone}, {SignerName}, {Role}, {City}.
- Banned variables: staff names, appointment dates, procedures, prices unless pre-approved and verified; any PHI.
- Required offline CTA for any neutral/negative response.

A) DENTIST TEMPLATES (Google/Yelp)
DENT-01 Positive (L0)
“Thank you for the kind words and for choosing {BusinessName}. We’re glad you had a great experience. If there’s anything we can do for you in the future, please reach out anytime. — {SignerName}, {Role}”

DENT-02 Neutral/Short (L0)
“Thanks for taking the time to share your feedback. If you’d like to tell us more so we can keep improving, please contact us at {SupportEmailOrPhone}. — {SignerName}, {Role}”

DENT-03 Mild Negative (L0/L1)
“Thank you for letting us know. We aim to provide a positive experience for everyone, and we’d like to understand what happened. Please contact us at {SupportEmailOrPhone} so we can look into this directly. — {SignerName}, {Role}”

DENT-04 Strong Negative (L1)
“We’re sorry to hear you were disappointed. We take feedback seriously and would like the chance to address your concerns. Please reach us at {SupportEmailOrPhone}. For privacy reasons, we can’t discuss details here, but we’re happy to help directly. — {SignerName}, {Role}”

DENT-05 PHI/HIPAA Mention by Reviewer (L2)
“Thank you for your message. For privacy reasons, we can’t discuss anything about an individual’s care or visits in a public forum. Please contact us at {SupportEmailOrPhone} so we can help you directly. — {SignerName}, {Role}”

DENT-06 Billing/Insurance Complaint (L1)
“Thanks for raising this. Billing questions can be complex, and we’d like to review your concerns with you directly. Please contact our office at {SupportEmailOrPhone} so we can look into it. — {SignerName}, {Role}”

DENT-07 Suspected Fake/No Match (L1)
“Thank you for the feedback. We can’t confirm any details here, and we’re not currently able to match this experience to our records. Please contact us at {SupportEmailOrPhone} so we can understand and address your concern. — {SignerName}, {Role}”

DENT-08 Legal Threat (MANUAL-ONLY HOLD, L2)
“Thank you for your note. We take concerns seriously and would like to address this directly. Please contact us at {SupportEmailOrPhone}. — {SignerName}, {Role}”

B) MED SPA TEMPLATES (Google/Yelp)
MSPA-01 Positive (L0)
“Thank you for your review and for visiting {BusinessName}. We’re happy to hear you enjoyed your experience. If you ever have questions, please reach out at {SupportEmailOrPhone}. — {SignerName}, {Role}”

MSPA-02 Neutral/Short (L0)
“Thanks for sharing your feedback. If you’d like to discuss any suggestions, we’re here at {SupportEmailOrPhone}. — {SignerName}, {Role}”

MSPA-03 Mild Negative (L0/L1)
“Thank you for letting us know. We’d like to learn more and see how we can make things right. Please contact us at {SupportEmailOrPhone}. — {SignerName}, {Role}”

MSPA-04 Strong Negative (L1)
“We’re sorry to hear this didn’t meet expectations. We’d like to understand what happened and help resolve it. Please contact us at {SupportEmailOrPhone}. For privacy reasons, we can’t discuss details publicly. — {SignerName}, {Role}”

MSPA-05 No Medical Outcome Guarantees Reminder (use when reviewer asks for promises) (L1)
“Thanks for your question. Results and experiences can vary, and we’d be glad to discuss options and expectations with you directly. Please contact us at {SupportEmailOrPhone}. — {SignerName}, {Role}”

MSPA-06 PHI/Privacy-Sensitive (L2)
“Thank you for your message. To protect privacy, we can’t discuss any personal services or visits in public. Please contact us at {SupportEmailOrPhone} so we can help directly. — {SignerName}, {Role}”

MSPA-07 Suspected Fake/Competitor Bait (L1)
“Thank you for the feedback. We’re unable to confirm details here, and we’d like to look into this directly. Please contact {BusinessName} at {SupportEmailOrPhone}. — {SignerName}, {Role}”

MSPA-08 Legal Threat (MANUAL-ONLY HOLD, L2)
“Thank you for your note. We take concerns seriously and would like to address this directly. Please contact us at {SupportEmailOrPhone}. — {SignerName}, {Role}”

C) HVAC TEMPLATES (Google/Yelp)
HVAC-01 Positive (L0)
“Thanks for choosing {BusinessName} and for taking the time to leave a review. We’re glad our team could help. If you need anything else, reach us at {SupportEmailOrPhone}. — {SignerName}, {Role}”

HVAC-02 Neutral/Short (L0)
“Thank you for the feedback. If you’d like to share more details, please contact us at {SupportEmailOrPhone}. — {SignerName}, {Role}”

HVAC-03 Mild Negative (L0/L1)
“Thanks for letting us know. We’d like to learn more and help resolve this. Please contact us at {SupportEmailOrPhone} with your service address and the best time to reach you (privately). — {SignerName}, {Role}”

HVAC-04 Strong Negative (L1)
“We’re sorry to hear about your experience. We’d like the opportunity to review what happened and work toward a resolution. Please contact us at {SupportEmailOrPhone}. — {SignerName}, {Role}”

HVAC-05 Pricing/Billing Dispute (L1)
“Thank you for raising this. We want billing to be clear and fair, and we’d like to review your concerns directly. Please contact us at {SupportEmailOrPhone}. — {SignerName}, {Role}”

HVAC-06 Alleged Property Damage / Safety Issue (L2)
“Thank you for bringing this to our attention. We take safety and service concerns seriously and would like to address this promptly. Please contact us at {SupportEmailOrPhone} so we can follow up directly. — {SignerName}, {Role}”

HVAC-07 Suspected Fake / No Record (L1)
“Thank you for the feedback. We’re not currently able to match this experience to our records. Please contact us at {SupportEmailOrPhone} so we can look into it. — {SignerName}, {Role}”

HVAC-08 Legal Threat (MANUAL-ONLY HOLD, L2)
“Thank you for your note. We take concerns seriously and would like to address this directly. Please contact us at {SupportEmailOrPhone}. — {SignerName}, {Role}”

4) GOOGLE vs YELP POLICY APPENDIX (Testable do/don’t)
Do:
- Thank the reviewer; keep it professional.
- Take complex issues offline; protect privacy.
- Use neutral, non-accusatory language.

Don’t:
- Don’t offer incentives/discounts for reviews (Google/Yelp).
- Don’t request only positive reviews or gate reviews.
- Don’t claim you can remove reviews or that the platform will remove them.
- Don’t disclose or confirm private customer/patient information.
- Don’t argue or threaten legal action.

Operational note: When detectors flag PHI or legal-threat language, system must set post_status='blocked_manual_review' (or equivalent), log hold_reason, and prevent posting via both API and UI until explicitly unblocked by an authorized user.

Versioning:
- Checklist: v3
- Escalation Playbook: v3
- Templates: v3 (DENT-01..08, MSPA-01..08, HVAC-01..08)
- Owner contact: agent_bob_replit+review-bot@agentmail.to
