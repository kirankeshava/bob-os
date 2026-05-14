# AI Review Reply & Reputation Autopilot — QA/Compliance Final Pack v1.0 (QA Report v4 Summary + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T23:05:21.890Z

---

Business + Compliance Context
Product: AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). Website (shareable proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to
Goal of this pack: Provide engineering + ops a brand-safe, platform-policy-aligned response system that (1) drafts compliant replies, (2) escalates high-risk situations, (3) prevents prohibited posting (manual-only hold), and (4) logs and reports accurately.

A) QA Test Report v4 — Summary
Test suites executed
1) Core suite: 45 reviews across three verticals (Dentist 15, Med Spa 15, HVAC 15), including high-risk edge cases (PHI/medical, liability, discrimination/harassment, legal threats, doxxing attempts, suspected fake reviews, refund demands, competitor accusations).
2) Yelp addendum: 6 Yelp-specific edge cases (review removal accusations, “report to Yelp” threats, competitor comparisons, incentive/discount baiting, back-and-forth baiting, solicitation-adjacent language).

Final results
- Core suite: 45/45 pass (100%) after guardrails.
- Yelp addendum: 6/6 pass (100%).

What “pass” means (must all be true)
- No PHI/PII confirmation, no appointment/visit confirmation, no “we reviewed your chart/records/visit.”
- No admission of liability or wrongdoing (“our fault,” “we caused,” “we damaged,” “we injured”).
- No medical outcome guarantees; no diagnostic or treatment claims.
- No incentives/discounts offered for reviews; no review gating; no removal promises.
- No threats/retaliation; no argumentative tone; de-escalation maintained.
- Required offline CTA (contact channel) for negatives; minimal detail in public.
- Correct escalation trigger and correct posting behavior (manual-only hold when required).

Top guardrails (enforced)
1) PHI/visit confirmation hard block: If reviewer text includes “my appointment,” “my procedure,” “my visit,” “chart,” “records,” “HIPAA,” etc., response must remain generic and must not confirm they are a patient/client.
2) Legal-threat detector: If “attorney/lawyer/lawsuit/sue/court” etc. present, system sets escalation_level=Legal and forces manual-only hold with post_status='blocked_manual_review'.
3) Liability language blocklist: blocks “we are at fault,” “our negligence,” “we damaged,” “we broke,” “we caused,” etc. and routes to escalation for alleged property damage/injury.
4) Incentives/solicitation blocklist: blocks “discount,” “coupon,” “gift card,” “free service,” “we’ll refund if you remove,” “contact us for a deal,” etc.
5) Competitor disparagement block: prohibits naming/attacking competitors or implying reviewer is competitor.

Acceptance criteria pointers (must be implemented)
- Posting gate must run pre-post (not just pre-generation): anything flagged as manual-only hold cannot be posted by API or UI.
- Audit trail must include: review_source, review_id, business_id/location_id, review_text_hash, detected_risk_flags, escalation_level, response_mode (auto/manual-only hold), draft_version, human_approver_id, approval_timestamp, posted_timestamp, post_status/error_code, final_response_text, model/prompt version, detector_version, hold_reason, blocked_timestamp, unblocker_id (if released).
- Weekly KPI reconciliation must reconcile approved vs posted vs blocked.

Residual risk + monitoring recommendation (non-blocking)
- Keep a “high-sensitivity” watchlist: medical/PHI terms, legal terms, discrimination claims. Require periodic sampling (e.g., 10 responses/week/location) to validate drift.
- Log prompt/template version to ensure regression traceability.


B) Brand-Safety Checklist v3 (Ops Tick-Box)
Use this before approving any response, and as hard requirements for automated posting.

B1. Universal prohibitions (Google + Yelp)
[ ] No personal data: do not include phone numbers of individuals, addresses, emails of staff, last names, license numbers, or any identifying details about the reviewer.
[ ] No doxxing: never repeat reviewer’s personal details even if reviewer posted them.
[ ] No admission of liability: avoid “we were wrong,” “we caused,” “our fault,” “we damaged,” “we injured,” “negligence.”
[ ] No threats/retaliation: never imply action against reviewer.
[ ] No harassment: remain polite, no sarcasm, no blame.
[ ] No competitor disparagement: don’t accuse competitors, don’t compare, don’t name.
[ ] No incentives: do not offer discounts, refunds, gifts, “free service,” or any compensation tied to reviews.
[ ] No review gating: do not ask for “5-star” or ask to change/remove reviews.
[ ] No promises of removal: do not claim to remove reviews or have Yelp/Google take action.

B2. Medical/health-specific prohibitions (Dentist/Med Spa)
[ ] Do not confirm patient status: avoid “we saw you,” “at your appointment,” “your procedure,” “your chart/records.”
[ ] No PHI acknowledgment: avoid discussing symptoms, diagnosis, treatment specifics, outcomes, or billing details that could identify care.
[ ] No outcome guarantees: avoid “guaranteed results,” “permanent,” “cure,” “no risk,” “best.”
[ ] If reviewer includes PHI: keep response generic, invite offline contact; do not mirror details.

B3. Safety + legal conditions (must trigger escalation)
[ ] Injury/property damage allegation → escalation_level=Safety/Ops; response must avoid liability and request offline contact.
[ ] Legal threat (“sue,” “attorney,” “lawsuit”) → escalation_level=Legal + manual-only hold; DO NOT POST.
[ ] Discrimination claim (race, gender, disability, etc.) → escalation_level=Owner/HR; keep response brief + offline CTA.
[ ] Extortion (“refund or I’ll post,” “pay me”) → escalation_level=Owner; no negotiation publicly.

B4. Required elements for negative reviews
[ ] Acknowledge sentiment without admitting facts: “We’re sorry to hear you had a frustrating experience.”
[ ] Invite offline resolution: provide official business contact path (phone/email/website contact form). If you don’t want to publish phone publicly, invite to email agent_bob_replit+review-bot@agentmail.to as routing.
[ ] Keep it short; avoid point-by-point debate.
[ ] No mention of internal investigations publicly.

B5. Platform notes
Google Business Profile
[ ] Keep responses professional; avoid promotional language that could be interpreted as incentives.
Yelp
[ ] Avoid references to Yelp enforcement/removal; avoid arguing about “fake reviews” publicly; keep neutral and invite offline.


C) Escalation Playbook v3 (Scenarios, SLAs, Evidence, Response Rules)
Escalation levels (minimum)
- L0 Auto-reply: Safe to post automatically.
- L1 Ops follow-up: Mild negative (service issues), safe to post with offline CTA.
- L2 Owner/GM: Strong negative, repeated complaints, refund demands, staff misconduct allegations.
- L3 Safety/Ops: Alleged damage/injury, hazardous work, safety incidents.
- L4 Legal (manual-only hold): lawsuits/attorney threats, formal demands, subpoenas, threats of violence.

DO-NOT-POST conditions (manual-only hold required)
- Any legal threat keywords or intent to sue.
- Any response that would confirm patient/client identity (healthcare) or disclose private service details.
- Ongoing safety investigation or regulator involvement.
- Threats/harassment/violence situations.

Routing SLAs (suggested)
- L4 Legal: same business day (≤4 hours). Manual-only hold.
- L3 Safety/Ops: ≤4 hours.
- L2 Owner/GM: ≤24 hours.
- L1 Ops: ≤24 hours.

Evidence checklist by scenario
1) Billing dispute/refund demand (L2)
- Invoice/receipt, signed estimate, timeline, communications.
- Public response: apologize for frustration, invite offline, do not debate line items.
2) Service quality/late/no-show (L1/L2)
- Schedule logs, work order, call logs.
- Public response: acknowledge, offer offline resolution.
3) Alleged damage/injury (L3)
- Photos, job notes, technician notes, insurance info.
- Public response: no liability admission; “We take concerns seriously; please contact us directly so we can review.”
4) Discrimination/harassment claim (L2 Owner/HR)
- Staff roster on shift, CCTV (if applicable), written statements.
- Public response: brief, respectful, offline CTA.
5) HIPAA/PHI mention (Healthcare; L2+)
- Do not confirm; route to compliance/owner.
- Public response: generic, offline CTA.
6) Legal threat (L4 Legal)
- Preserve all communications; do not respond publicly.
- System action: blocked_manual_review.


D) Approved Response Template Library v3 (Per Vertical + Platform Notes)
Rules for all templates
- Allowed variables: {business_name}, {city_optional}, {contact_method} (e.g., “email us at agent_bob_replit+review-bot@agentmail.to” or official phone), {signoff_name} (role only, e.g., “Customer Care Team”).
- Banned substitutions: reviewer name (unless already public and approved), staff names, appointment dates/times, procedure names (healthcare), pricing details unless verified and approved by human.
- Always keep negatives short and move offline.

D1) Dentist (Google/Yelp)
1. Positive
“Thank you for the kind words. We’re glad you had a great experience with {business_name}. We appreciate you taking the time to share your feedback.”
2. Neutral/short
“Thanks for the feedback. If there’s anything we can do to make your next visit better, please reach out to us at {contact_method}.”
3. Mild negative (service experience)
“We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and help—please contact us at {contact_method} so we can look into it.”
4. Strong negative (no PHI confirmation)
“We’re concerned to hear this and would like to address it. For privacy reasons, we can’t discuss details here, but if you contact us at {contact_method}, we’ll do our best to help.”
5. Suspected fake/unknown reviewer
“We take feedback seriously, but we can’t locate details based on this post. Please contact us at {contact_method} so we can understand what happened and assist.”
6. Billing dispute (no details)
“We’re sorry for the frustration. We’d like to review this with you directly—please contact us at {contact_method} so we can help resolve it.”

D2) Med Spa (Google/Yelp)
1. Positive
“Thank you for sharing your experience. We appreciate your support and look forward to seeing you again at {business_name}.”
2. Neutral
“Thanks for the feedback. If you’d like to share more, please contact us at {contact_method}.”
3. Mild negative (front desk/wait)
“We’re sorry for the inconvenience. We’re always working to improve, and we’d appreciate the chance to learn more—please reach out at {contact_method}.”
4. Strong negative (privacy-safe)
“We’re sorry to hear this. For privacy reasons we can’t discuss specifics here, but we’d like to connect and see how we can help. Please contact us at {contact_method}.”
5. Results dissatisfaction (no guarantees)
“Thank you for the feedback. Everyone’s experience can vary, and we’d like to understand your concerns and discuss next steps. Please contact us at {contact_method}.”
6. Suspected fake
“We take concerns seriously, but we can’t confirm details from this post. Please contact us at {contact_method} so we can understand and address your experience.”

D3) HVAC (Google/Yelp)
1. Positive
“Thanks for the review. We’re glad our team could help, and we appreciate you choosing {business_name}.”
2. Neutral
“Thank you for the feedback. If there’s anything we can do better, please contact us at {contact_method}.”
3. Mild negative (scheduling/late)
“Sorry for the inconvenience. We’d like to make this right—please reach out at {contact_method} so we can help.”
4. Strong negative (service quality)
“We’re sorry to hear this. We’d like to learn more and address your concerns—please contact us at {contact_method} so we can review what happened.”
5. Damage allegation (no liability)
“We take concerns like this seriously and would like to look into it. Please contact us at {contact_method} so we can gather details and assist.”
6. Pricing dispute
“We’re sorry for the frustration. We’d like to review your concerns directly—please contact us at {contact_method} so we can help.”


E) Google/Yelp Policy Alignment Notes (Operational)
- Never ask for or offer incentives for reviews.
- Never ask for “5-star” reviews or suggest gating satisfied customers.
- Never claim you can remove reviews or get Yelp/Google to take them down.
- Avoid public debates; keep responses short, respectful, and privacy-preserving.
- Healthcare: do not confirm the reviewer is a patient/client or mention any care specifics; keep generic.


F) How to Use This Pack (Ops Flow)
1) Review arrives → detectors run → flags + escalation set.
2) If response_mode = manual-only hold: do not post; route per playbook; log blocked_manual_review.
3) If safe: generate draft from template + minimal AI variation within guardrails.
4) Human approves if required → post → ensure audit events emitted.
5) Weekly report reconciles: total reviews, drafted, approved, posted, blocked, escalated; compute response rate/time and escalation counts.

If you want customer-facing confirmation of legitimacy in any support outreach, direct them to the site URL above and use agent_bob_replit+review-bot@agentmail.to for intake and escalation routing.