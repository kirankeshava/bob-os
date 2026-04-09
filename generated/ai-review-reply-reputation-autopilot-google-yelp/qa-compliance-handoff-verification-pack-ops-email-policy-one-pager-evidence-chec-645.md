# QA/Compliance Handoff & Verification Pack — Ops Email + Policy One-Pager + Evidence Checklist (v1.3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:44:42.291Z

---

## 1) QA/Compliance Handoff Email (Ready to Send)
**Subject:** Launch Verification: Google/Yelp Review Reply Autopilot — Compliance Sign-off Needed (Runbook + Evidence)

Hi team,

We’re ready for end-to-end verification of the **AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)** prior to launch. This pass is focused on **brand safety, hallucination control, and platform policy alignment** with objective pass/fail evidence.

**Product proof URL (shareable):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**QA contact:** agent_bob_replit+review-bot@agentmail.to

### What needs to be verified (must-pass)
1) **Posting gate works:** When content is flagged for PHI/legal threats/etc., system sets `post_status = blocked_manual_review` and **cannot post** via API or UI.
2) **Audit trail completeness:** Draft/flag/approve/block/post events are logged with required fields (see Evidence Checklist below).
3) **Policy alignment:** No incentives, no removal promises, no competitor disparagement, no PHI confirmation, no liability admissions, offline resolution CTA present.
4) **Weekly KPI reconciliation:** Approved vs posted vs blocked counts reconcile, response-time metrics correct.

### Attach/Link the following artifacts
- QA Launch Verification Runbook v1.2 (execution steps + test cases)
- Engineering Sign-off Checklist v1.1 (one-page pass/fail)
- Detector/Unit-Test Spec (trigger phrases → expected flags/modes)
- Approved Response Templates v2 (Dentist/Med Spa/HVAC)
- Policy Alignment One-Pager (Google vs Yelp)
- Regression Evidence Checklist (what screenshots/log exports to capture)

### Output required for sign-off
Please reply with:
- Exported audit logs for the test run (or DB extracts) + 3–5 screenshots for key steps
- Weekly KPI report output generated from the same dataset
- Completed Engineering Sign-off Checklist (pass/fail, signed by implementer)

### Environment question (blocking)
Do we have a **sandbox/test environment** for Google Business Profile and Yelp posting? If not, we must use a **limited live test** (3–5 responses max) on a designated low-risk internal location per the runbook.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot QA
agent_bob_replit+review-bot@agentmail.to

---

## 2) Google Business Profile vs Yelp — Policy Alignment One-Pager (Release Gate)
**Goal:** Every automated response must be compliant, non-inflammatory, and brand-safe across industries (dentist, med spa, HVAC).

### Universal must-do (Google + Yelp)
- **Be polite, professional, and brief.** No arguments, no sarcasm, no blame.
- **Move resolution offline.** Required CTA: “Please contact us at [phone/email] so we can help.”
- **No personal data.** Do not include names, phone numbers, addresses, appointment times, treatment details, invoice numbers.
- **No PHI confirmation (healthcare).** Do not confirm they are/were a patient or reference “your visit/records/chart.”
- **No admission of liability.** Avoid “we caused,” “our fault,” “we damaged,” “we infected,” etc.
- **No incentives.** Never offer discounts, freebies, gift cards, refunds in exchange for reviews/updates.
- **No review gating.** Do not ask only happy customers to review; do not condition service on review.

### Universal must-not-do
- **Do not promise removal** of reviews or imply platform enforcement: “We’ll get this taken down,” “Yelp/Google will remove it.”
- **Do not accuse the reviewer of lying** or being a competitor; if suspected fake, keep neutral and request offline verification.
- **Do not disclose internal actions** that imply facts you can’t prove (hallucination risk): “We checked the cameras,” “We reviewed your file,” unless the human provided verified facts and you’re in manual mode.

### Yelp-specific sensitivities
- Avoid any implication of manipulating Yelp’s systems or policies.
- Avoid prolonged back-and-forth; provide one calm response and take offline.

### Google Business Profile-specific sensitivities
- Keep responses factual and not promotional; still okay to invite offline contact.

### Mandatory “manual-only hold” triggers (must block autopost)
- **Legal threats:** “attorney,” “lawyer,” “lawsuit,” “sue,” “court,” “settlement,” “demand letter,” “BBB complaint” (configure list).
- **PHI risk phrases (healthcare):** “my records,” “my chart,” “my visit,” “my treatment,” “diagnosis,” “procedure,” “HIPAA” — response must be generic and non-confirming.
- **Safety incidents:** alleged injury, fire, gas leak, biohazard, assault.

---

## 3) Final Regression Evidence Checklist (What to Capture for Go/No-Go)
**Purpose:** Provide objective proof that guardrails, posting gates, logging, and reporting work.

### A) Posting Gate Evidence (blocked_manual_review)
Capture evidence for at least 3 cases:
1) **Legal threat review** → detector flags → response mode set to HOLD → `post_status=blocked_manual_review`.
2) **PHI/HIPAA-adjacent review** → generic non-confirming response → no appointment/records language.
3) **High-risk liability allegation** (damage/injury) → escalates to Safety/Ops and uses non-admission language.

For each case, capture:
- Screenshot or exported record of the **original review text** (or hashed ID reference).
- Screenshot of the UI/API attempt to post that results in **blocked** state.
- Log/event record showing **block occurred** (timestamp + reason).

### B) Audit Trail Completeness (Schema + Events)
For each tested review, verify presence of:
- Identifiers: `review_source`, `review_id`, `business_id/location_id`, `review_text_hash`
- Detection: `detected_risk_flags`, `detector_version`, `escalation_level`, `hold_reason`
- Drafting: `draft_version`, `model/prompt_version`
- Approvals: `human_approver_id`, `approval_timestamp`
- Posting lifecycle: `post_status`, `posted_timestamp` OR `blocked_timestamp`, `error_code` if any
- Content: `final_response_text`

Events (minimum):
- `draft_created`
- `flagged` (if any flags)
- `approved` (if approved)
- `blocked` (if manual-only hold)
- `posted` (if successfully posted)

### C) Weekly KPI Report Reconciliation (Math Checks)
From the same test dataset/week window, validate:
- **Responses posted** = count(post_status=posted)
- **Responses blocked** = count(post_status=blocked_manual_review)
- **Responses approved** = count(approved) and ensure approved ≥ posted; approved-posted = blocked + failed
- **Response rate** denominator matches total eligible reviews (exclude filtered/test as specified)
- **Response time**: median/avg computed from review_created_at → first_response_posted_at
- **Escalations** count by level/reason matches log flags

### D) Content Compliance Spot Checks (at least 10 responses)
Confirm:
- Contains offline CTA
- No incentives/discounts
- No PHI confirmation
- No liability admission
- No competitor disparagement
- No promises of review removal

### Go/No-Go rule
- **NO-GO** if any blocked_manual_review case can be posted, or if audit logs are missing required fields/events, or if KPI reconciliation fails.
- **GO** only with complete evidence attached and sign-off checklist fully passed.
