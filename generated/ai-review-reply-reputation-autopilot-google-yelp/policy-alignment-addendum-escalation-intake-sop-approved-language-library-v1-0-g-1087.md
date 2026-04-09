# Policy Alignment Addendum + Escalation Intake SOP + Approved Language Library (v1.0) — Google Business Profile & Yelp

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:28:36.262Z

---

# AI Review Reply & Reputation Autopilot — Compliance Operations Pack v1.0

Website (legitimacy reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Contact email: agent_bob_replit+review-bot@agentmail.to

## 1) Platform Policy Alignment Addendum (Testable Requirements)

### 1.1 Universal requirements (apply to Google Business Profile + Yelp)
**U-REQ-01 No incentives / solicitation-for-reviews:** Never offer discounts, gifts, refunds, store credit, or “make it right if you update your review.” Responses must not imply a benefit contingent on review content.
- **Detector:** `INCENTIVE_LANGUAGE` (block or rewrite) on phrases like “discount,” “coupon,” “free,” “refund if you change,” “we’ll comp.”
- **Acceptance:** Generated response contains no incentive language; template uses neutral offline resolution.

**U-REQ-02 No doxxing / personal data:** Do not include customer phone, email, address, appointment time, invoice number, or any identifying details. Do not request PHI/medical details publicly.
- **Detector:** `PII_REQUEST_OR_DISCLOSURE`.
- **Acceptance:** Response contains no customer identifiers; requests move offline and are generic.

**U-REQ-03 No liability admission / fault confession:** Avoid “we caused,” “our technician damaged,” “it was our mistake” unless explicitly approved by humans with facts verified. Use neutral language: “We’re sorry to hear…” “We’d like to learn more.”
- **Detector:** `LIABILITY_ADMISSION` with hard-block list.
- **Acceptance:** Response does not admit wrongdoing; offers offline resolution.

**U-REQ-04 No inflammatory/retaliatory tone:** No arguing, sarcasm, accusations (“you’re lying”), threats, or escalation in public.
- **Detector:** `HOSTILE_TONE` (rewrite or hold).
- **Acceptance:** Tone stays calm, brief, and solution-oriented.

**U-REQ-05 Required offline CTA for negatives:** For neutral/negative reviews, include a call to take it offline with a safe contact channel.
- **Required element:** “Please contact [business contact] so we can help.”
- **Acceptance:** CTA present in all negative/mixed templates.

### 1.2 Google Business Profile (GBP) specific requirements
**G-REQ-01 No promises about Google actions:** Do not claim you can remove reviews or that Google will delete them. Avoid “reporting you to Google.”
- **Detector:** `REMOVAL_PROMISE`.
- **Acceptance:** Response never mentions removal promises.

**G-REQ-02 Avoid disallowed content in replies:** No hate/harassment, explicit content, or disclosure of private info. (Enforced by Universal + tone policy.)

### 1.3 Yelp specific requirements
**Y-REQ-01 No asking reviewers to edit/remove reviews:** Yelp is sensitive to businesses pressuring reviewers. Do not request “please update/remove your review.”
- **Detector:** `PRESSURE_TO_EDIT`.
- **Acceptance:** Response invites offline contact without asking for changes.

**Y-REQ-02 No mention of Yelp enforcement/removal:** Do not say “Yelp will take this down,” “we’ll have Yelp remove it,” or “this violates Yelp policy.”
- **Detector:** `YELP_ENFORCEMENT_REFERENCE`.
- **Acceptance:** Response remains business-focused.

**Y-REQ-03 Competitor disparagement avoidance:** Never compare to or attack competitors (“unlike X”).
- **Detector:** `COMPETITOR_DISPARAGEMENT`.
- **Acceptance:** Neutral language only.

### 1.4 High-risk domain constraints
**MED-REQ-01 (Dentist/Med Spa) No PHI confirmation:** Never confirm someone is/was a patient or discuss records, visits, procedures, outcomes. Even “we reviewed your chart/records/visit” is forbidden.
- **Detector:** `PHI_CONFIRMATION` (hard block + forced generic response).
- **Acceptance:** Response is fully generic, does not confirm relationship.

**MED-REQ-02 No outcome guarantees:** No “guaranteed results,” “permanent,” “cure,” “100%,” “no side effects.”
- **Detector:** `MEDICAL_OUTCOME_GUARANTEE`.
- **Acceptance:** Response avoids medical guarantees.

**LEGAL-REQ-01 Legal threats = manual-only hold:** If review includes “attorney,” “lawsuit,” “sue,” “court,” “settlement,” “insurance claim,” automatically block posting and escalate.
- **Detector:** `LEGAL_THREAT` → response_mode = `HOLD_MANUAL_ONLY`, post_status=`blocked_manual_review`, escalation_level=`Legal`.

## 2) Escalation Intake Form + Internal Routing SOP (Ops)

### 2.1 When to escalate (auto/escalation levels)
**Level 0 (Auto-Reply OK):** Positive, neutral, mild dissatisfaction without safety/legal/PHI.

**Level 1 (Ops Review within 24h):** Service quality complaints, scheduling, cleanliness (non-safety), non-legal refund request, rude staff allegations (no discrimination).

**Level 2 (Owner/GM within 4h):** Safety incident claim, property damage allegation, discrimination/harassment allegation, repeated pattern accusations, media/social threat (non-legal).

**Level 3 (Legal same-day):** Any legal threat language, demand letter mention, “my lawyer,” “lawsuit,” “sue,” injury claims with intent to litigate, or regulator complaint with legal framing.

**Hard DO-NOT-POST (always hold):**
1) PHI confirmation risk (dentist/med spa)  
2) Active legal threat  
3) Threats/harassment involving staff safety  
4) Ongoing safety investigation where facts not confirmed

### 2.2 Escalation Intake Form (copy/paste into ticket)
**Ticket Title:** [Platform] Review Escalation — [Business/Location] — [Level]

**Required fields:**
- Platform: Google / Yelp
- Review ID/URL:
- Location ID:
- Review date/time:
- Star rating:
- Review text (verbatim):
- Detected risk flags (from system):
- Suggested escalation level (L1/L2/L3):
- Proposed response template_id (if any):
- **DO NOT POST?** Yes/No (reason)

**Evidence to collect (as applicable):**
- Work order/appointment record (internal only; do not reference publicly)
- Photos (before/after) (internal)
- Call recording/chat transcript (internal)
- Staff statements (internal)
- Refund/payment history (internal)

**Routing:**
- L1 → Ops Manager queue
- L2 → Owner/GM + Ops
- L3 → Legal + Owner/GM (manual-only hold)

**SLA:**
- L1: acknowledgement within 24h; resolution plan within 48h
- L2: acknowledgement within 4h; resolution plan within 24h
- L3: no public response until Legal approves; internal response within same business day

### 2.3 Public response rules during escalation
- Use only approved templates.
- No admissions of fault.
- No PHI or service confirmation for medical verticals.
- Always move offline: provide business contact channel and invite discussion.

## 3) Approved Language Library (Safe Phrases + Forbidden Phrases)

### 3.1 Required safe building blocks
**Empathy (safe):**
- “Thank you for taking the time to share your feedback.”
- “We’re sorry to hear your experience didn’t meet expectations.”
- “We take concerns like this seriously.”

**Neutral responsibility (safe):**
- “We’d like to learn more about what happened.”
- “We’d like the chance to discuss this and see how we can help.”

**Offline CTA (safe; choose one):**
- “Please contact our team at agent_bob_replit+review-bot@agentmail.to so we can follow up.”
- “If you’re willing, please email agent_bob_replit+review-bot@agentmail.to with a best way to reach you.”

**Medical-specific non-confirmation (safe):**
- “To protect privacy, we can’t discuss details here, but we’d like to help offline.”
- “Please reach out directly so we can address your concerns privately.”

**HVAC/service verification (safe):**
- “We’d like to look into your concern and make sure it’s addressed.”

### 3.2 Forbidden phrases (hard block) + safer alternatives
**PHI confirmation (FORBIDDEN):**
- “We reviewed your chart/records/visit.”
- “As your dentist/provider…”
- “When you came in on [date]…”
**Use instead:** “To protect privacy, we can’t discuss details here. Please contact us directly…"

**Liability admission (FORBIDDEN):**
- “It was our fault.” “We caused…” “We damaged…” “We made a mistake.”
**Use instead:** “We’re sorry to hear this and would like to learn more and help resolve it.”

**Incentives (FORBIDDEN):**
- “Discount/coupon/free service if you…” “Refund if you update your review.”
**Use instead:** “Please contact us so we can review the situation.”

**Review edit pressure (FORBIDDEN, especially Yelp):**
- “Please update/remove your review.”
**Use instead:** No mention of editing; just offline resolution.

**Removal/enforcement promises (FORBIDDEN):**
- “We’ll have Google/Yelp remove this.” “This will be taken down.”
**Use instead:** “We’d like to discuss your concerns directly.”

**Competitor disparagement (FORBIDDEN):**
- “Unlike [competitor]…” “They always…”
**Use instead:** Focus on your business only.

**Legal engagement (FORBIDDEN publicly):**
- “Our lawyer will contact you.” “See you in court.”
**Use instead:** Trigger manual-only hold; no posting until Legal approves.

## 4) Audit Trail Linkage (what must be logged for compliance)
For every review processed:
- review_source, review_id, business_id/location_id
- review_text_hash
- detected_risk_flags, escalation_level, response_mode
- draft_version + prompt/template_id used
- human_approver_id + approval_timestamp (or explicit “auto-approved policy” flag)
- post_status (`posted` / `blocked_manual_review` / `error`) + posted_timestamp
- hold_reason, blocked_timestamp, detector_version
- final_response_text + model/version

## 5) Quick Go/No-Go Criteria (operational)
**GO only if:**
- Legal-threat reviews always result in `blocked_manual_review` and cannot be posted via UI or API.
- Medical PHI-confirmation triggers always force generic non-confirming language.
- Audit logs include required fields for 100% of processed reviews.
- Weekly KPIs reconcile: approved vs posted vs blocked counts match audit events.

**NO-GO if any:**
- Any public reply contains PHI confirmation, incentive language, or explicit liability admission.
- Any legal-threat review is posted.
- Missing audit logs for holds/blocks.
