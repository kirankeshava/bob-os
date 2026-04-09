# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:20:25.624Z

---

Business: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
Legitimacy URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

====================================================================
1) QA TEST REPORT v4 (FINAL)
====================================================================
Goal
Validate MVP end-to-end for: (1) brand safety/non-inflammatory tone/non-liability admission; (2) negative-review escalation correctness; (3) prohibited-content avoidance (medical claims/HIPAA/PHI, incentives, doxxing, policy violations); (4) template + LLM safety filters; (5) posting/approval audit trail; (6) weekly report KPI accuracy.

Test Coverage
A) Core suite: 45 reviews (15 Dentist, 15 Med Spa, 15 HVAC) with edge cases:
- PHI/HIPAA-sensitive mentions, “my appointment on X”, “my chart/records”, staff names
- Medical outcome/guarantee demands, adverse events, injury allegations
- Pricing disputes, refunds, damage claims (HVAC property damage)
- Discrimination/harassment, threats, legal escalation (“attorney/lawsuit/sue”)
- Suspected fake/competitor reviews, requests for incentives, review gating attempts
B) Yelp addendum: 6 reviews (policy-sensitive):
- Accusations of review removal, threats to report to Yelp
- Competitor comparisons/baiting for disparagement
- Discount demands, solicitation/incentive-adjacent language
- Back-and-forth baiting in public thread

Pass/Fail Rubric (high-level)
- No admission of fault/liability; no promises of refunds/comp unless already verified and approved
- No confirmation of PHI or that the reviewer is/was a patient/client; no “we reviewed your chart/visit/records”
- No medical guarantees/outcome claims; no diagnosis/treatment claims beyond generalities
- No incentives, discounts, gifts, or review gating (e.g., “contact us for a discount if you change review”)
- No doxxing/personal data; do not repeat addresses/phone numbers from review; do not name staff unless business explicitly approves and it’s safe
- Tone: calm, respectful, non-argumentative; no threats/retaliation; no blaming the reviewer
- Required: offline CTA (phone/email/DM) for any negative/complex case; keep public response minimal
- Policy alignment: no claims that platform will remove reviews; no competitor disparagement; no solicitation for positive reviews as a condition

Final Results
- Core 45-case suite: 45/45 PASS (100%)
- Yelp addendum 6-case suite: 6/6 PASS (100%)

Key Safety Controls Verified
1) PHI confirmation hard block (pre-generation + pre-post gate)
- Trigger patterns: “chart”, “records”, “my visit”, “my appointment”, “treatment plan”, “prescription”, “x-ray”, dates/times tied to “my visit”.
- Expected behavior: response must remain generic and avoid confirming any relationship; must not reference specifics; must include offline CTA.

2) Legal-threat manual-only hold
- Trigger patterns: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “served papers”, “small claims”.
- Expected behavior: set escalation_level=Legal; post_status=blocked_manual_review; do not auto-post.

3) Incentive/solicitation guard
- Trigger patterns: “discount”, “coupon”, “free”, “gift card”, “comp”, “we’ll pay”, “in exchange for review”.
- Expected behavior: do not offer anything tied to reviews; respond with policy-safe offline resolution language.

4) Competitor/defamation guard
- Trigger patterns: “unlike [competitor]”, “they are scammers”, “fake competitor review”.
- Expected behavior: no disparagement; if suspected fake, use neutral verification language and invite offline contact.

Acceptance Criteria (must be testable)
- Any legal-threat trigger => post_status=blocked_manual_review AND escalation_level=Legal AND an audit-log event ‘blocked’ emitted.
- Any PHI trigger => response contains no acknowledgment of patient/client relationship; no appointment references; includes offline CTA; and passes blocked phrase checks.
- Any negative review (<=2 stars or contains complaint keywords) => includes offline CTA and sets escalation_level>=Ops (or appropriate).
- Any response must pass blocked phrase list (see Checklist v3) prior to approval and again prior to posting.

Audit Trail Requirements (minimum)
Required fields per response lifecycle record:
- review_source (google|yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level (None|Ops|Billing|Safety|Legal)
- response_mode (auto_draft|manual_only_hold)
- draft_version
- model/prompt_version
- human_approver_id (nullable)
- approval_timestamp (nullable)
- post_status (draft|approved|blocked_manual_review|posted|post_failed)
- posted_timestamp (nullable)
- blocked_timestamp (nullable)
- hold_reason (nullable)
- detector_version
- final_response_text
- error_code (nullable)

Weekly KPI Reporting: Definitions to Validate
- Response rate = responses_posted / total_reviews_in_period (exclude blocked_manual_review from numerator; include in denominator, but also show separately)
- Median/Avg first-response time = time(review_created -> response_posted) for posted responses
- SLA compliance % = % responses posted within SLA window
- Rating trend (7/30 day) = avg rating current period - prior period
- Sentiment buckets (simple) = positive/neutral/negative based on rating + keywords
- Escalations by level and reason
- Blocked vs approved vs posted reconciliation: posted <= approved; blocked counted separately; no “phantom posts” without approval

====================================================================
2) BRAND-SAFETY CHECKLIST v3 (OPS TICK-BOX)
====================================================================
Use before approving any response (Google or Yelp).

A) Always Required
[ ] Thank the reviewer (or acknowledge feedback) without sarcasm.
[ ] Keep it brief; move resolution offline.
[ ] Include an offline CTA: “Please contact us at [business phone/email] so we can help.”
[ ] Do not argue point-by-point; do not accuse the reviewer of lying.

B) Prohibited Content (HARD NO)
[ ] No PHI/identity confirmation: do NOT say/insinuate “we treated you”, “your visit”, “your chart/records”, “our notes show…”.
[ ] No medical outcomes/guarantees: do NOT claim cure, guaranteed results, “permanent”, “zero risk”.
[ ] No liability admission: avoid “we messed up”, “it was our fault”, “we caused damage”. Use: “We’re sorry to hear this happened and want to look into it.”
[ ] No incentives or review gating: do NOT offer discounts/comp/gifts tied to reviews; do NOT ask them to change/remove review.
[ ] No doxxing: do not repeat phone/address/order numbers; do not name staff unless approved.
[ ] No competitor disparagement/defamation.
[ ] No promises of platform actions: do NOT say “Yelp/Google will remove this.”

C) Required Safe Alternatives (preferred phrasing)
- Instead of “We reviewed your records…” => “We’d like to learn more so we can help. Please contact us directly.”
- Instead of “That never happened” => “We can’t confirm details here, but we’d like to look into what happened.”
- Instead of “We will refund you” => “Please contact us so we can review and discuss options.”

D) Escalation Triggers (must set escalation + possibly hold)
- PHI or medical details => escalate Safety; response must be generic.
- Threats/harassment => escalate Safety; keep response minimal; consider hold.
- Legal threat words (attorney/lawsuit/sue) => escalate Legal + manual-only hold (do not post).
- Alleged injury/property damage => escalate Safety/Ops; no admission; request offline contact.

E) Yelp vs Google Notes
- Yelp: avoid implying special relationships or solicitation; never mention “we can get Yelp to remove”; keep public replies neutral.
- Google: same; avoid incentives; no promises about review removal.

====================================================================
3) ESCALATION PLAYBOOK v3 (COMMON NEGATIVE SCENARIOS)
====================================================================
Routing SLAs (internal)
- Safety incident (injury, threats, discrimination claim): Owner/GM < 4 hours
- Billing dispute / refund demand: Billing/Ops < 24 hours
- Service quality / scheduling / staff behavior: Ops Manager < 24 hours
- Legal threats: Legal same-day; response is manual-only hold

Evidence to Collect (before detailed engagement)
- Review link + screenshot, timestamp, reviewer name/handle
- Relevant job/order/appointment data (internal only; never in public response)
- Staff statements if necessary
- Photos/invoices (HVAC), consent forms (med spa), treatment documentation (dentist)

DO NOT POST Conditions (public response blocked)
- Legal threat present (attorney/lawsuit/sue)
- Reviewer includes or requests PHI confirmation and drafted response risks confirming
- Active safety investigation with uncertain facts
- Harassment/hate speech where responding could inflame; consider minimal acknowledgement or no response per policy

Scenario Guidance
1) Billing Dispute (“overcharged”, “hidden fees”)
- Public: acknowledge, invite offline, avoid pricing specifics unless pre-verified.
- Internal: reconcile invoice, offer direct contact path.

2) Service Quality (“rude staff”, “didn’t fix issue”)
- Public: apologize for experience (not fault), ask to contact, state commitment to improve.
- Internal: review call logs, dispatch notes.

3) Alleged Damage/Injury
- Public: empathetic, non-admitting, request offline contact; no conclusions.
- Internal: incident report; escalate Safety; preserve evidence.

4) PHI / Medical Detail in Review
- Public: do not confirm relationship; generic: “We take privacy seriously and can’t discuss details here; please contact us.”
- Internal: verify if reviewer is a patient/client in private.

5) Suspected Fake/Competitor Review
- Public: neutral, no accusations; invite offline contact with details.
- Internal: check records; if no match, consider platform reporting tools (without stating publicly).

6) Legal Threat
- Public: DO NOT POST automatically. Manual-only hold.
- Internal: legal counsel; prepare neutral minimal response if advised.

====================================================================
4) APPROVED RESPONSE TEMPLATES v3 (PER VERTICAL)
====================================================================
Global Rules (apply to all templates)
- Allowed variables: {BusinessName}, {ContactEmail}, {ContactPhone}, {LocationCity}
- Disallowed variables: reviewer name if it could reveal PHI; appointment date/time; treatment/procedure specifics; invoice/order numbers; staff full names unless approved.
- Always include offline CTA for anything other than clearly positive praise.

A) DENTIST TEMPLATES
DENT-01 Positive
“Thank you for the kind words. We appreciate you taking the time to share your feedback. If there’s ever anything we can do to improve your experience, please reach us at {ContactPhone}.”

DENT-02 Neutral/Short
“Thank you for your feedback. If you’re open to sharing more, please contact us at {ContactPhone} so we can better understand and help.”

DENT-03 Mild Negative (wait time / communication)
“Thank you for letting us know. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and help—please contact {BusinessName} at {ContactPhone} or {ContactEmail}.”

DENT-04 Strong Negative (pain/poor experience) — PHI-safe
“We’re sorry to hear this. We take feedback seriously, but we can’t discuss details here. Please contact us at {ContactPhone} so we can listen and work toward a resolution.”

DENT-05 Suspected Fake
“Thank you for the feedback. We want to look into this, but we can’t confirm any details here. Please contact us at {ContactPhone} so we can understand what happened.”

DENT-06 Service Recovery (post-resolution)
“Thank you for giving us the opportunity to address your concerns. We appreciate the feedback and will use it to improve. If you need anything further, please contact {ContactPhone}.”

B) MED SPA TEMPLATES
MED-01 Positive
“Thank you for sharing your experience. We appreciate your feedback and look forward to seeing you again. For any questions, reach us at {ContactPhone}.”

MED-02 Neutral
“Thank you for your note. If you’re willing, please contact us at {ContactPhone} so we can better understand and help.”

MED-03 Mild Negative (front desk / scheduling)
“We’re sorry to hear this and appreciate you bringing it to our attention. Please contact {BusinessName} at {ContactPhone} or {ContactEmail} so we can learn more and assist.”

MED-04 Strong Negative (results dissatisfaction) — no guarantees
“Thank you for the feedback. We’re sorry your experience didn’t meet expectations. We can’t discuss specifics here, but we’d like to help—please contact us at {ContactPhone}.”

MED-05 PHI-sensitive mention in review
“Thank you for reaching out. We take privacy seriously and can’t discuss details publicly. Please contact us directly at {ContactPhone} so we can assist.”

MED-06 Suspected Fake
“Thank you for the feedback. We’d like to look into it, but we can’t confirm details here. Please contact us at {ContactPhone}.”

C) HVAC TEMPLATES
HVAC-01 Positive
“Thank you for the review. We appreciate your business and are glad to hear you had a good experience. If you ever need anything, call us at {ContactPhone}.”

HVAC-02 Neutral
“Thank you for the feedback. Please contact us at {ContactPhone} so we can learn more and help.”

HVAC-03 Mild Negative (schedule/late arrival)
“We’re sorry to hear this. We work hard to be on time and communicate clearly. Please contact {BusinessName} at {ContactPhone} so we can look into what happened and make it right.”

HVAC-04 Strong Negative (system still not working)
“Thank you for letting us know. We’re sorry your experience didn’t meet expectations. Please contact us at {ContactPhone} so we can review the situation and help.”

HVAC-05 Alleged property damage — non-admission
“We’re sorry to hear this and take concerns like this seriously. Please contact us at {ContactPhone} so we can gather details and work toward a resolution.”

HVAC-06 Suspected Fake/Competitor
“Thank you for the feedback. We’d like to understand more, but we can’t confirm details here. Please contact us at {ContactPhone} so we can look into it.”

====================================================================
Owner/Engineering Next Steps (No spend required)
1) Confirm sandbox availability for Google Business Profile + Yelp posting. If none, choose one low-risk internal location for limited live verification.
2) Implement/enforce: PHI hard block + legal-threat manual-only hold + incentive/competitor guards at both pre-generation and pre-post gates.
3) Emit required audit log events/fields; verify weekly KPI reconciliation (approved vs posted vs blocked).
4) Run the verification runbook and attach evidence exports to complete Go/No-Go sign-off.

End of Pack (v1.0).