# AI Review Reply & Reputation Autopilot — Brand Safety + Escalation + Approved Templates Pack v3.0 (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:31:30.698Z

---

Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

1) BRAND-SAFETY CHECKLIST v3 (TICK-BOX)
A. Universal “MUST INCLUDE” in every response
- [ ] Thank the reviewer (neutral-professional)
- [ ] Keep tone calm; no sarcasm, insults, blame, or arguing
- [ ] If any dissatisfaction is expressed: include an offline CTA (“Please contact us at [phone/email] so we can help.”)
- [ ] Do not request, pressure, or incentivize review edits/removals
- [ ] No mention of internal investigations, disciplinary actions, or confidential processes

B. Universal “MUST NOT” (Hard blocks)
- Liability admission: block phrases like “we are at fault,” “our mistake caused,” “we damaged,” “we neglected,” “malpractice,” “we violated,” “we broke,” “we failed to sterilize,” etc.
  Safe alternative: “We’re sorry to hear about your experience and want to look into this.”
- PHI/PII confirmation (HIPAA): never confirm they are a patient/client or reference visit details.
  Hard-block phrases: “we reviewed your chart/records/visit/appointment,” “according to your file,” “your treatment plan,” dates/times, procedure specifics tied to an identity.
  Safe alternative: “For your privacy, we can’t discuss details here, but we’d like to connect directly.”
- Medical outcome guarantees/claims: block “guaranteed results,” “permanent,” “cure,” “no risk,” “100%,” “FDA-approved results” (unless verified and phrased compliantly).
- Incentives/solicitation: block “discount for review,” “gift card,” “free service,” “we’ll refund if you remove,” “leave us 5 stars.”
- Doxxing: do not repeat staff full names, addresses, phone numbers, license numbers, or any personal data posted by reviewer.
- Threat/retaliation: block “we will sue,” “defamation,” “we’ll report you,” “we will have you removed,” etc.
- Competitor disparagement: block “our competitors are worse,” naming other businesses negatively.

C. “MANUAL-ONLY HOLD” (Do Not Post Automatically)
If any of these are detected, set response_mode=blocked_manual_review and escalation_level accordingly:
- Legal threats: “lawyer/attorney,” “lawsuit,” “sue,” “legal action,” “small claims,” “served papers” → escalation_level=Legal
- Safety/injury allegations: “injured,” “hurt,” “fire,” “gas leak,” “carbon monoxide,” “infection,” “assault,” “unsafe,” “ER” → escalation_level=Safety
- Discrimination/harassment: slurs, protected-class discrimination claims → escalation_level=HR/Legal
- PHI exposure: reviewer posts detailed medical info; any temptation to confirm or rebut specifics → escalation_level=Privacy
- Extortion: “refund or I’ll post,” “pay me or I’ll…” → escalation_level=Owner/Legal

D. Platform policy alignment (testable)
Google Business Profile:
- No incentives, no review gating, no impersonation, no harassment, no private data.
Yelp:
- Do not ask for reviews in a way that violates Yelp guidance; never offer incentives; do not imply Yelp will remove reviews; avoid public back-and-forth.
Acceptance criteria: response contains no incentives, no removal promises, no competitor attacks, no PHI confirmation, and uses offline CTA for negatives.

2) ESCALATION PLAYBOOK v3 (COMMON NEGATIVE SCENARIOS)
Routing SLAs (from detection):
- Safety incidents (injury, gas/electrical hazard, infection): Owner/GM <4 hours; Ops same-day
- Legal threats/extortion: Legal same-day; Owner immediate awareness
- Privacy/PHI: Privacy lead/Owner <4 hours; do not post until reviewed
- Billing disputes: Billing <24 hours
- Service quality / rude staff: Ops/GM <24 hours

Evidence to collect (internal, not in public reply):
- Review source + review_id, timestamps, staff on duty (internal), job/appointment record references (internal only), photos/messages, call logs, invoices, warranty terms.

Public response pattern (when allowed to post):
- Acknowledge feelings without admitting fault.
- State privacy limitation for healthcare.
- Invite offline resolution.
- Do not debate facts; do not accuse reviewer of lying.

Scenario guidance:
A) Billing dispute (all verticals)
Do: “We’d like to review this with our billing team—please contact [channel].”
Don’t: confirm amounts, insurance details, card info, or blame customer.

B) Alleged damage (HVAC)
Do: “We take concerns seriously and want to review what happened—please contact us so we can investigate.”
Don’t: “We didn’t do it,” “you caused it,” or any admission of damage.

C) Medical dissatisfaction (Dentist/Med Spa)
Do: “For your privacy we can’t discuss details here; we’d like to connect.”
Don’t: confirm they were treated; mention procedure, outcomes, complications.

D) Suspected fake review
Do: “We can’t locate a record matching this description; please contact us with details so we can investigate.”
Don’t: accuse fraud; threaten; disclose internal records.

E) Legal threat
Action: manual-only hold. Only post after Legal approval; often best response is minimal and offline CTA.

3) APPROVED RESPONSE TEMPLATE LIBRARY v3 (READY TO USE)
Rules for variables:
- Allowed variables: {BusinessName}, {GenericContactMethod} (phone/email), {LocationName} (if multi-location), {GeneralServiceCategory} (broad: “dental care,” “aesthetic services,” “heating and cooling service”).
- Forbidden substitutions: reviewer name if it reveals identity, appointment date/time, procedure/treatment details, diagnosis, invoice amounts unless already public and verified, staff last names.

3.1 Dentist Templates
DENT-POS-01 (Positive)
“Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. We appreciate you taking the time to share your feedback.”

DENT-NEU-02 (Neutral/short)
“Thank you for your feedback. If there’s anything we can do to improve your experience with {BusinessName}, please reach out at {GenericContactMethod}.”

DENT-MNEG-03 (Mild negative)
“We’re sorry to hear your visit didn’t meet expectations. For your privacy we can’t discuss details here, but we’d like to learn more and help—please contact us at {GenericContactMethod}.”

DENT-SNEG-04 (Strong negative—non-legal)
“Thank you for raising this. We take concerns seriously. For privacy reasons we can’t address specifics publicly, but we want to look into what happened and work toward a resolution. Please contact {BusinessName} at {GenericContactMethod}.”

DENT-FAKE-05 (Suspected fake)
“Thank you for the note. We can’t find enough information to match this experience to our records. For privacy, we can’t discuss details here, but we’d like to investigate—please contact us at {GenericContactMethod} with any information you’re comfortable sharing.”

DENT-RECOV-06 (Service recovery)
“We appreciate the feedback and the chance to improve. Please reach out at {GenericContactMethod} so our team can understand your concerns and help.”

3.2 Med Spa Templates
SPA-POS-01
“Thank you for your review. We’re happy you enjoyed your experience with {BusinessName}, and we appreciate your support.”

SPA-NEU-02
“Thanks for the feedback. If you’d like to share more about your visit, please contact us at {GenericContactMethod}.”

SPA-MNEG-03
“We’re sorry to hear this wasn’t what you expected. For privacy reasons we can’t discuss details here, but we’d like to connect and help—please reach us at {GenericContactMethod}.”

SPA-SNEG-04
“We take your concerns seriously and want to understand what happened. For your privacy we can’t address specifics publicly. Please contact {BusinessName} at {GenericContactMethod} so we can look into this.”

SPA-FAKE-05
“Thank you for your message. We’re unable to identify this experience based on what’s shared here. Please contact us at {GenericContactMethod} so we can investigate and assist.”

SPA-RECOV-06
“We appreciate the opportunity to improve. Please contact {GenericContactMethod} so we can learn more and work toward a resolution.”

3.3 HVAC Templates
HVAC-POS-01
“Thank you for the great review. We’re glad our team could help with your heating and cooling needs. We appreciate you choosing {BusinessName}.”

HVAC-NEU-02
“Thank you for the feedback. If you have details you’d like us to review, please contact us at {GenericContactMethod}.”

HVAC-MNEG-03
“We’re sorry to hear this wasn’t the experience you expected. We’d like to learn more and help—please contact {BusinessName} at {GenericContactMethod}.”

HVAC-SNEG-04
“We take this seriously and want to look into what happened. Please contact us at {GenericContactMethod} so we can review the situation and work toward a resolution.”

HVAC-FAKE-05
“Thank you for the note. We can’t identify this service experience from the information provided. Please contact {BusinessName} at {GenericContactMethod} so we can investigate.”

HVAC-RECOV-06
“We appreciate the feedback and the chance to improve. Please reach out at {GenericContactMethod} so we can make this right.”

4) GOOGLE vs YELP RESPONSE DO/DON’T MATRIX (OPERATIONAL)
DO (both): be brief, professional, offline CTA for negatives, protect privacy, no admissions, log everything.
DON’T (both): incentives, review gating, threats, arguments, doxxing, competitor attacks.
Extra Yelp sensitivity: avoid implying Yelp will remove reviews; avoid prolonged back-and-forth; do not request reviews.

5) AUDITABILITY REQUIREMENT (FOR OPS/ENGINEERING)
Every response must record: review_source, review_id, business/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode (auto|manual|blocked_manual_review), draft_version, model/prompt/detector versions, approver_id + timestamps, post_status/error_code, final_response_text. Holds/blocks must include hold_reason and unblocker_id if overridden.

This v3 pack is the “approved language + rules of engagement” baseline. Any copy outside these constraints must be treated as manual-only and require documented approval in the audit log.