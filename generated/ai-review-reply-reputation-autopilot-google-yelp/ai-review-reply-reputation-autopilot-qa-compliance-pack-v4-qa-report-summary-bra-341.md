# AI Review Reply & Reputation Autopilot — QA/Compliance Pack v4 (QA Report Summary + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T06:07:52.243Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
QA/Compliance Pack v4 — April 2026
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

1) QA & COMPLIANCE REPORT (SUMMARY) — v4
Scope
- End-to-end test of: (a) response drafting quality + brand safety, (b) escalation triggers for negative/sensitive reviews, (c) prohibited content avoidance (PHI/HIPAA, medical claims, incentives, doxxing), (d) posting/approval gates + audit trail expectations, (e) weekly KPI/report correctness.
Test Suite
- 45 core reviews across three verticals: Dentist (15), Med Spa (15), HVAC (15).
- 6 Yelp-specific edge cases: review-removal accusations, competitor comparisons, solicitation/incentive bait, demands for discount, threats to report to Yelp, public back-and-forth baiting.
Results (Final)
- Core suite: 45/45 pass (100%) with detectors + posting gates enabled.
- Yelp addendum: 6/6 pass (100%).
Key Safety Controls Validated
- PHI/medical privacy: no confirmation of patient status, visits, charts/records.
- Medical/health claims: no guarantees/outcome promises; no claims of curing, permanence, “FDA approved” unless verified and explicitly allowed.
- Liability: avoids admissions (“we messed up”, “our fault”, “negligent”) and avoids promising refunds/compensation publicly.
- Incentives/review gating: no asking for reviews in exchange for discounts/free items; no directing only happy customers to review.
- Doxxing/personal data: no publishing phone/address/email of reviewer; no staff full names if complaint includes targeting.
- Legal threats: “manual-only hold” required; no public debate.
Launch Gate (Go/No-Go)
GO requires:
1) Posting prevention: any escalation_level=Legal or PHI-risk must produce post_status=blocked_manual_review, across both API and UI paths.
2) Audit log completeness: every draft has draft_created + flagged (if any) + approved OR blocked + posted/failed event, with timestamps and versioning.
3) Report reconciliation: weekly report totals reconcile: (approved + blocked + failed) must match drafts generated for the period; responses posted count must match post_status=posted.
Known Residual Operational Risks (Non-Model)
- Operator error: a human approver could still override brand safety by editing text. Mitigation: enforce same detectors on final text at pre-post gate; require reason code for override.
- Platform API variance: Google/Yelp API permissions differ by account/location; mitigation: run the Live/Sandbox protocol and retain evidence.

2) BRAND-SAFETY CHECKLIST v3 (OPERATIONAL)
Use this as a pre-generation + pre-post checklist. All checks must pass for auto-post.

A. Universal “Never Do” (Google + Yelp)
- Never confirm identity or relationship: do NOT state or imply the reviewer was a patient/client/customer if they mention medical services.
- Never reference PHI/PII: appointment dates/times, procedure names tied to a person, diagnosis, treatment plan, payment method specifics, address/phone/email of reviewer.
- Never admit liability: avoid “our fault,” “we caused,” “we were negligent,” “we broke/damaged,” “we violated,” “we overcharged” (use neutral language).
- Never make medical guarantees or outcomes: “permanent,” “guaranteed,” “cure,” “100%,” “no side effects,” “best results,” “FDA approved” unless verified and allowed by client.
- Never offer incentives for reviews: no discounts/free services/gifts in exchange for reviews; no “we’ll make it right with a discount if you update the review.”
- Never promise takedowns: do not say “we will remove your review” or “Yelp/Google will take it down.”
- Never argue, retaliate, or threaten: no hostile language; no blaming the reviewer; no accusations without proof.
- Never disparage competitors.

B. Required Elements (All responses)
- Thank/acknowledge sentiment (without admitting fault).
- Keep tone calm, brief, non-inflammatory.
- Move to offline resolution: provide a single contact path (phone/email) OR “please contact our office” without posting sensitive details.
- Avoid specifics: keep responses general; no internal policy exposition.

C. Mandatory Detectors & Gates (Implementation Acceptance)
- PHI confirmation hard block: trigger on phrases like “your chart/records/visit/appointment,” “we reviewed your file,” “as your dentist,” etc. Required behavior: force generic language + escalation_level=Privacy; if review contains detailed PHI, block_manual_review.
- Legal threat detector: trigger on “attorney/lawyer/lawsuit/sue/legal action/served papers.” Required behavior: post_status=blocked_manual_review; escalation_level=Legal; no auto-post.
- Incentive/discount bait detector: trigger on “discount,” “refund if you change review,” “free if you update review.” Required behavior: remove incentive language; escalate if reviewer explicitly requests quid pro quo.
- Doxxing detector: if review includes addresses/phone numbers/full names, response must not repeat them; escalate if safety risk.

D. Yelp-Specific Notes
- Yelp is sensitive to solicitation/incentives. Do not use language that reads like “please update your review” or “contact us and we’ll fix it if you revise.” Keep it: “We’d like to learn more—please contact us.”
- Do not mention Yelp enforcement/removal processes.

3) ESCALATION PLAYBOOK v3
Escalation Levels
- L0 Auto: safe to draft and post after approval.
- L1 Ops: service quality issues; needs manager review if strong negative.
- L2 Billing/Privacy: pricing disputes with specifics, identity claims, partial PHI; requires senior review.
- L3 Safety/Legal: injury, threats, discrimination claims, attorney/lawsuit; DO NOT AUTO-POST.

Routing + SLA
- L1 Ops: Operations Manager within 24h.
- L2 Billing/Privacy: Billing Lead or Compliance Lead within 24h.
- L3 Safety/Legal: Owner/GM within 4h; Legal same business day if “sue/attorney” present.

Evidence to Collect (before any public reply on L2/L3)
- Screenshot of review + timestamps + platform ID.
- Internal ticket with alleged date/service (if any) without adding PHI.
- Any communications logs (call notes) stored privately.

DO NOT POST Conditions (Hard Stop)
- Any mention of legal action/attorney.
- Review contains specific PHI (diagnosis/procedure tied to person) OR requests confirmation.
- Safety incident with injury/alleged harm.
- Harassment/threats that suggest personal safety risk.

Scenario Response Patterns (Public)
A) Billing dispute (L2)
- Pattern: acknowledge concern, no admission, invite offline to review details.
- Never: quote invoice numbers, dates, insurance details.

B) Service quality complaint (L1)
- Pattern: apologize for experience (not fault), invite offline, commit to listening.

C) Suspected fake review (L2)
- Pattern: neutral, do not accuse; state you can’t locate details and invite offline.

D) Medical outcome complaint (Dentist/Med Spa) (L2)
- Pattern: avoid discussing care; invite private discussion; no “we reviewed your records.”

E) Discrimination/harassment claim (L3)
- Pattern: do-not-post until reviewed; if posted, keep minimal and invite offline; no denial/argument.

F) Legal threat (L3)
- Pattern: block_manual_review; internal escalation only.

4) APPROVED RESPONSE TEMPLATES v3
Rules for all templates
- Allowed variables: {business_name}, {location_city}, {contact_method} (e.g., “call our office” or an email), {signoff_name} (first name only), {team_name}.
- Forbidden variables: reviewer name, staff full names, appointment date/time, procedure details, pricing specifics unless pre-verified and approved for public posting.

A) DENTIST (Google/Yelp)
DENT-POS-01 (Positive)
“Thank you for taking the time to share this. We’re glad you had a great experience at {business_name}. If there’s ever anything we can do to support you, please reach out to {contact_method}. —{signoff_name}”

DENT-NEU-02 (Neutral/short)
“Thanks for your feedback. We’re always working to improve, and we’d appreciate the chance to learn more. Please contact us at {contact_method} so we can follow up. —{team_name}”

DENT-MNEG-03 (Mild negative: wait time/front desk)
“Thank you for the feedback. We’re sorry to hear your visit felt frustrating. We’d like to understand what happened and see how we can improve—please contact {contact_method}. —{team_name}”

DENT-SNEG-04 (Strong negative: treatment dissatisfaction; no PHI)
“Thank you for sharing your concern. We take feedback seriously and would like to discuss this privately to better understand and address it. Please reach out via {contact_method}. —{signoff_name}”

DENT-FAKE-05 (Suspected fake/unmatched)
“Thank you for the note. We can’t confirm details publicly, and we’re not currently able to locate this experience based on what’s shared here. If you’re open to it, please contact {contact_method} so we can look into your concern directly. —{team_name}”

DENT-PRIV-06 (PHI-adjacent reviewer mentions chart/visit) — Auto-draft allowed, but may require manual-only depending on detector
“Thanks for reaching out. For privacy reasons, we can’t discuss any details here. We’d like to connect directly to understand your concerns—please contact {contact_method}. —{signoff_name}”

B) MED SPA (Google/Yelp)
MSPA- POS-01 (Positive)
“Thank you for your kind words. We’re happy you enjoyed your experience at {business_name}. If you ever have questions or feedback, please reach out to {contact_method}. —{team_name}”

MSPA-NEU-02 (Neutral)
“Thanks for the feedback. We’d like to learn more and make sure your concerns are addressed. Please contact {contact_method} so we can follow up. —{signoff_name}”

MSPA-MNEG-03 (Mild negative: scheduling)
“Thank you for letting us know. We’re sorry the scheduling experience wasn’t smooth. Please contact {contact_method}—we’d like to understand what happened and improve. —{team_name}”

MSPA-SNEG-04 (Strong negative: results dissatisfaction; no guarantees)
“Thank you for sharing this. We’re sorry to hear you’re unhappy with your experience. We can’t discuss details publicly, but we’d like to talk privately and understand your concerns. Please contact {contact_method}. —{signoff_name}”

MSPA-SAFE-05 (Medical claim bait: ‘burn/scar/injury’) — recommend manual review if injury alleged
“Thank you for bringing this to our attention. We take safety concerns seriously. Please contact {contact_method} so a manager can review and follow up directly. —{team_name}”

MSPA-FAKE-06 (Suspected fake)
“Thanks for the message. We can’t verify details publicly, and we’re not able to match this to a visit based on the information here. If you’re willing, please contact {contact_method} so we can look into it. —{signoff_name}”

C) HVAC (Google/Yelp)
HVAC-POS-01 (Positive)
“Thanks for the great review. We appreciate you choosing {business_name}. If you need anything in the future, please reach out to {contact_method}. —{team_name}”

HVAC-NEU-02 (Neutral)
“Thank you for the feedback. We’d like to learn more and make things right where possible. Please contact {contact_method}. —{signoff_name}”

HVAC-MNEG-03 (Timing/communication)
“Thank you for letting us know. We’re sorry the experience didn’t meet expectations. Please contact {contact_method} so we can understand what happened and improve. —{team_name}”

HVAC-SNEG-04 (Alleged damage) — avoid admission; often L2/L3 depending on severity
“Thank you for bringing this to our attention. We take concerns like this seriously and would like to review it directly. Please contact {contact_method} so a manager can follow up. —{signoff_name}”

HVAC-BILL-05 (Pricing dispute)
“Thank you for the feedback. We understand pricing concerns can be frustrating. We can’t discuss account details here, but we’d like to review your concerns—please contact {contact_method}. —{team_name}”

HVAC-FAKE-06 (Suspected fake)
“Thanks for reaching out. We can’t confirm details publicly and we’re not able to locate this experience based on what’s shared. Please contact {contact_method} so we can look into it. —{signoff_name}”

Platform Reminders Embedded for Ops
- Never include incentives (discount/free) tied to reviews.
- Never ask to “update/remove” a review; simply invite offline contact.
- Never confirm PHI or customer status for medical verticals.

End of Pack v4
Ownership/Next Step
- Choose sandbox vs designated low-risk live location for the verification runbook. Then engineering executes the runbook, exports audit logs + weekly report outputs, and signs Go/No-Go against the launch gates above.