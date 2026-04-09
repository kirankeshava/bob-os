# AI Review Reply & Reputation Autopilot — QA/Compliance Deliverables Pack v2.1 (Brand-Safety Checklist + Escalation Playbook + Approved Templates + KPI QA Appendix)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:56:28.607Z

---

Version: v2.1
Owner: QA Agent (Bob)
Scope: Google Business Profile (GBP) + Yelp review response drafting/posting workflows
Website (legitimacy link to share): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/Contact email: agent_bob_replit+review-bot@agentmail.to

============================
A) BRAND-SAFETY CHECKLIST v2.1 (Operator Tick-Box)
============================
Goal: Every public response must be brand-safe, non-inflammatory, policy-aligned, and not create legal/PHI risk. If any “DO NOT POST” item triggers, set post_status=blocked_manual_review and escalate.

A1. Required elements (must be present)
[ ] Polite greeting + thanks (even for negative reviews, unless abusive/harassing)
[ ] Non-admission of liability: uses neutral wording (“sorry to hear”, “we aim to”, “we’d like to learn more”)
[ ] Offline CTA: invites customer to contact privately (phone/email) to resolve
[ ] No confidential details; no mention of internal records, appointments, invoices unless customer already publicly included AND it is safe AND verified
[ ] No threats, retaliation, or argumentative tone

A2. Hard “DO NOT POST” conditions (block + escalate)
[ ] PHI/medical privacy risk: reviewer mentions patient status/visit details AND response would confirm/deny or reference records
[ ] Response includes any confirmation of care (e.g., “as your dentist…”, “during your visit…”) when identity is not verified
[ ] Legal threat: reviewer says “attorney/lawyer/lawsuit/sue/legal action/demand letter” or similar
[ ] Safety incident/injury: allegations of harm, unsafe practice, or serious misconduct requiring investigation
[ ] Discrimination/harassment allegations involving protected classes
[ ] Doxxing: reviewer includes staff last names, private phone numbers, addresses, license numbers with intent to harm
[ ] Extortion: “remove this review or I’ll…” / blackmail / bribe demands

A3. Prohibited content (never include)
Privacy/PHI
- Never say: “We reviewed your chart/records/visit/appointment notes.”
- Never say: “According to our records you were here on…”
- Never say: “We can’t find you in our system.” (implies record access and invites debate)
Medical claims (Dentist/Med Spa)
- Never guarantee outcomes: “permanent”, “cure”, “100%”, “no risk”, “best results”, “pain-free guaranteed”.
- Never provide medical advice tailored to reviewer; keep generic.
Incentives / solicitation
- Never offer discounts, refunds, free services, gift cards in exchange for review edits/removal.
- Never ask for a positive review to “make up for it” (review gating).
Competitors
- Never mention competitors negatively or accuse competitor review brigading publicly.
Platform enforcement promises
- Yelp: do not say you will “have Yelp remove” a review or imply special relationship.
- GBP: do not claim Google will remove unless factual and not used as a threat.

A4. Blocked phrase list (replace with safer alternatives)
Blocked: “we reviewed your chart/records/visit/appointment”, “as your provider”, “you were a patient here”, “we treated you”
Use: “We take feedback seriously. We’d like to learn more so we can address this appropriately.”

Blocked: “that never happened”, “you’re lying”, “fake review”, “scam”
Use: “We can’t confirm details here, but we’d like to look into this. Please contact us directly so we can review and respond appropriately.”

Blocked: “we will sue”, “defamation”, “you’ll hear from our lawyer”
Use: (DO NOT POST; legal hold)

A5. Tone constraints
[ ] No sarcasm, no moral judgments, no shaming
[ ] Keep to 2–5 sentences (avoid extended back-and-forth)
[ ] Avoid caps, exclamation density, and emotional intensifiers

A6. Platform-specific notes
Yelp
[ ] Avoid discussing Yelp moderation/removal or “reporting you to Yelp”
[ ] Avoid asking reviewer to change/remove review; focus on resolution
GBP
[ ] Avoid posting personal data; no appointment details; keep generic

============================
B) ESCALATION PLAYBOOK v2.1 (Scenarios + Routing + Public Response Pattern)
============================
Escalation levels
- L0: Routine (positive/neutral/mild complaint) → Auto-draft allowed
- L1: Service recovery (strong dissatisfaction, billing confusion) → Draft allowed + notify Ops/Billing
- L2: Sensitive (safety incident, discrimination allegation, staff misconduct, extortion, suspected fake) → Draft allowed ONLY if generic + no specifics; often manual review
- L3: Legal/PHI (lawsuit/attorney threats, PHI risk, regulatory complaint) → DO NOT POST; blocked_manual_review

Routing SLAs
- Safety incident/injury: Owner/GM within 4 hours
- Service failure/quality: Ops within 24 hours
- Billing dispute/refund demand: Billing within 24 hours
- Discrimination/harassment claim: Owner/HR same day
- Legal threat: Legal/Owner same day (immediate hold)
- PHI/medical privacy: Compliance lead/Owner same day (immediate hold)

Evidence collection checklist (internal)
- Review text + timestamp + platform + reviewer handle
- Related ticket/job/appointment identifiers (internal only; never in public response)
- Staff on duty, call recordings, invoices, photos (HVAC), treatment notes (Dentist/Med Spa) — internal only
- Prior communications with customer (email/SMS)

Scenario guidance (public response patterns)
1) Billing dispute (L1)
Do: acknowledge, invite offline, commit to investigating.
Don’t: post line-item pricing unless already public and verified.

2) Alleged damage (HVAC) / injury (any) (L2→often L3 if serious)
Do: express concern, invite immediate offline contact.
Don’t: admit fault; don’t debate facts.

3) Discrimination claim (L2)
Do: state you take concerns seriously and want to investigate; route to owner.
Don’t: argue about protected class details.

4) PHI mention (Dentist/Med Spa) (L3)
Action: blocked_manual_review.
If allowed generic reply (only after compliance approval): do not confirm care; invite offline.

5) Legal threat (L3)
Action: blocked_manual_review; no public response until legal advises.

6) Suspected fake review (L2)
Do: “We can’t confirm details here; please contact us” + optionally “We take integrity seriously.”
Don’t: call them a liar; don’t claim you checked records.

“DO NOT POST” examples (always hold)
- “Our lawyer will contact you.”
- “We checked your chart and you’re wrong.”
- “We can confirm you were not a patient.”

============================
C) APPROVED RESPONSE TEMPLATE LIBRARY v2.1
============================
Rules for all templates
- Allowed variables: {business_name}, {support_email}, {support_phone}, {manager_name_optional}, {city_optional}
- Prohibited variables: reviewer name if it contains full name, staff last names, appointment dates, procedure names, invoice amounts (unless user-provided and verified), any PHI.
- Mandatory offline CTA: must include either phone or email.

C1) DENTIST TEMPLATES (GBP/Yelp)
DENT-01 (Positive)
“Thank you for the kind words. We appreciate you taking the time to share your experience. If there’s ever anything we can do to help, please reach us at {support_phone} or {support_email}.”

DENT-02 (Neutral/short)
“Thank you for your feedback. We’re always working to improve and appreciate you sharing this. If you’re open to it, please contact us at {support_phone} or {support_email} so we can learn more.”

DENT-03 (Mild negative—wait time/communication)
“Thank you for letting us know. We’re sorry to hear your experience didn’t meet expectations, and we’d like to understand what happened. Please contact {business_name} at {support_phone} or {support_email} so we can follow up.”

DENT-04 (Strong negative—service quality)
“We’re sorry to hear this and take your concerns seriously. We can’t address details here, but we’d like to connect and see how we can make this right. Please reach out to us at {support_phone} or {support_email}.”

DENT-05 (PHI risk trigger—MANUAL ONLY HOLD note)
System behavior: If review includes medical details, “chart/records/visit”, or identity-sensitive info → blocked_manual_review (no auto-post).
If compliance approves a generic response, use:
“Thank you for your feedback. We take privacy seriously and can’t discuss details here. Please contact {business_name} at {support_phone} or {support_email} so we can address your concerns privately.”

DENT-06 (Suspected fake)
“Thank you for the note. We can’t confirm details in a public forum, but we’d like to look into this. Please contact us at {support_phone} or {support_email} so we can review and follow up.”

C2) MED SPA TEMPLATES (GBP/Yelp)
MSPA-01 (Positive)
“Thank you for your review. We’re glad you had a great experience and appreciate your feedback. If you need anything, contact us at {support_phone} or {support_email}.”

MSPA-02 (Neutral)
“Thanks for sharing your feedback. We’re always working to improve and would value the chance to learn more. Please reach out at {support_phone} or {support_email}.”

MSPA-03 (Mild negative—front desk/scheduling)
“Thank you for letting us know. We’re sorry this was frustrating and want to understand what happened. Please contact us at {support_phone} or {support_email} so we can help.”

MSPA-04 (Strong negative—results dissatisfaction; no medical guarantees)
“We’re sorry to hear you’re disappointed. We can’t discuss specifics here, but we’d like to connect and review your concerns privately. Please reach out to {business_name} at {support_phone} or {support_email}.”

MSPA-05 (No medical/outcome claims reminder)
Operator check: response must not promise outcomes (“guaranteed results”, “permanent”, “no side effects”). Keep generic and service-focused.

MSPA-06 (Suspected fake)
“Thank you for your feedback. We can’t confirm details publicly, but we take concerns like this seriously and want to look into it. Please contact {support_phone} or {support_email}.”

C3) HVAC TEMPLATES (GBP/Yelp)
HVAC-01 (Positive)
“Thank you for the review. We appreciate your business and are glad we could help. If you need anything in the future, contact us at {support_phone} or {support_email}.”

HVAC-02 (Neutral)
“Thanks for your feedback. We’re always working to improve and would like to learn more about your experience. Please contact us at {support_phone} or {support_email}.”

HVAC-03 (Mild negative—late arrival)
“Thank you for letting us know, and we’re sorry for the inconvenience. We’d like to review what happened and improve. Please contact us at {support_phone} or {support_email} so we can follow up.”

HVAC-04 (Strong negative—quality concern)
“We’re sorry to hear this and take it seriously. We can’t address job details here, but we’d like to connect and make this right if possible. Please contact {business_name} at {support_phone} or {support_email}.”

HVAC-05 (Alleged damage—often L2)
“Thank you for bringing this to our attention. We’re concerned to hear this and want to investigate promptly. Please contact us at {support_phone} or {support_email} so we can gather details and follow up.”

HVAC-06 (Suspected fake)
“Thank you for the note. We can’t confirm job details publicly, but we’d like to look into this. Please contact {support_phone} or {support_email} so we can review and respond appropriately.”

============================
D) KPI / WEEKLY REPORT QA APPENDIX (Definitions + Reconciliation)
============================
Purpose: Ensure weekly reporting is accurate and consistent with audit trail and posting gates.

Key KPIs and definitions
1) Response Rate (%)
- Numerator: count(review_id where post_status==posted)
- Denominator: count(all reviews received in period)
- Exclude: none (but break out “blocked_manual_review” as separate bucket)

2) Median/Avg First Response Time
- For posted responses only: posted_timestamp - review_created_timestamp
- Report separate metric for “time-to-draft” and “time-to-approval” if available

3) Escalations
- Count by escalation_level and escalation_reason
- Must include blocked_manual_review items as escalations (L3)

4) Blocked/Held accounting
- blocked_count: post_status==blocked_manual_review
- held_count (if implemented): post_status==held_pending_approval
- posted_count: post_status==posted
Reconciliation rule: drafts_created = posted + blocked + pending (within period, by location)

5) Rating trend
- 7-day and 30-day average star rating (platform-provided) OR computed average from reviews in window
- Must state clearly which method is used

Data integrity checks
- Every posted response must have: review_text_hash, final_response_text, model/prompt version, approval_timestamp, posted_timestamp
- Every blocked_manual_review must have: hold_reason, detector_version, blocked_timestamp
- No response should include prohibited phrases listed in checklist A4 (spot-check via automated scan)

============================
E) FINAL QA STATUS
============================
- Core suite: 45/45 pass (post-guardrails)
- Yelp edge addendum: 6/6 pass
- Required controls locked: PHI hard-block + legal-threat manual-only hold + incentives/competitor language constraints + offline CTA requirement

Hand-off note
Engineering should treat this pack as the “policy contract.” Any prompt/template changes require rerunning the suite and verifying: (1) zero PHI confirmation, (2) legal threats never post, (3) no incentives/review gating, (4) audit logs complete, (5) weekly KPI reconciliation matches rules above.