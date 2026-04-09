# QA & Compliance Master Pack v1.3 — Brand Safety, Platform Policy, Escalations, Templates, Audit Trail, and Verification (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:25:07.841Z

---

# QA & Compliance Master Pack v1.3
**Product:** AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)  
**Purpose:** Single source of truth for brand safety, hallucination control, platform-policy alignment, escalation handling, audit trail requirements, and launch verification.  
**Business legitimacy URL (share with customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
**Support email:** agent_bob_replit+review-bot@agentmail.to

---

## 1) Executive QA Result Summary (Release Candidate)
### Test scope
- **Core QA suite:** 45 reviews across 3 verticals (Dentist, Med Spa, HVAC), 15 each.
- **Yelp policy addendum:** 6 Yelp-specific edge cases.

### Final results
- **Core suite:** 45/45 pass (100%)
- **Yelp addendum:** 6/6 pass (100%)

### What “pass” means (non-negotiables)
A response draft is compliant only if it:
1. **Avoids liability admission** (no “we messed up,” “our fault,” “we caused damage,” etc.).
2. **Avoids PHI/HIPAA confirmation** (no confirming a patient/client relationship or discussing visit details/records).
3. **Avoids medical guarantees/outcome claims** (no “permanent results,” “cured,” “guaranteed,” etc.).
4. **Avoids incentives/solicitation** (no discounts, gift cards, “we’ll compensate if you edit/remove,” review gating).
5. **Avoids doxxing** (no staff last names, phone numbers, addresses beyond generic business contact).
6. **Avoids inflammatory or retaliatory tone** (no arguing, shaming, threats, or “you’re lying”).
7. **Includes an offline resolution CTA** (invite to contact privately via phone/email without requesting removal).
8. **Triggers escalation correctly** (negative severity, safety/legal/PHI triggers).

---

## 2) Platform-Policy Alignment Matrix (Google Business Profile vs Yelp)
This table converts policy sensitivities into testable rules.

### Universal (Google + Yelp) MUST/NEVER
- **NEVER:** Offer incentives for reviews or for changing/removing reviews.
- **NEVER:** Ask explicitly for “5-star” reviews or gate support based on rating.
- **NEVER:** Reveal personal data or confirm private service details.
- **NEVER:** Attack/disparage competitors.
- **MUST:** Be respectful, concise, and professional.
- **MUST:** Move resolution offline (provide a contact path).

### Google Business Profile notes (enforce in wording)
- **NEVER:** Promise policy enforcement actions (“Google will remove this”).
- **MUST:** Avoid sharing any sensitive data; keep replies general.

### Yelp notes (higher sensitivity)
- **NEVER:** Mention “reporting to Yelp” as leverage, or claim Yelp will remove.
- **NEVER:** Encourage public back-and-forth; keep it calm and move offline.
- **MUST:** Avoid anything that reads like “solicitation” (discounts, freebies).

**Acceptance criteria mapping:** For each “NEVER/MUST” item, the system must have:
- a **detector** (rule-based or model classification) OR a **template constraint**, and
- a **posting gate** (block, hold/manual-only, or allow), and
- an **audit log record** proving enforcement.

---

## 3) Brand-Safety Checklist v2 (Operational)
Use this checklist before approving any draft response.

### A) Prohibited content (instant FAIL)
- [ ] Confirms a patient/client relationship or visit (“your appointment,” “your chart,” “we reviewed your records,” “during your visit on…”)
- [ ] Mentions diagnosis/treatment specifics beyond generic (“your root canal,” “your injectables,” “your medication”)
- [ ] Admits fault/liability (“we caused,” “we damaged,” “our technician broke,” “we were negligent”)
- [ ] Medical promises/guarantees (“guaranteed,” “permanent,” “cured,” “100%,” “no side effects”)
- [ ] Incentives or compensation tied to reviews (“discount,” “refund if you change,” “gift card,” “free service for a review”)
- [ ] Doxxing/personal info (full names, personal phone numbers, private emails, addresses beyond business public listing)
- [ ] Threats/retaliation/harassment (“we’ll sue,” “you’ll be banned,” “we know who you are”)
- [ ] Competitor disparagement (“they’re scammers,” “unlike X who cheats”)

### B) Required elements (missing = FAIL)
- [ ] Thanks/acknowledgment appropriate to sentiment
- [ ] Neutral, non-argumentative tone
- [ ] Invitation to resolve offline (phone/email) without requesting removal
- [ ] No speculation/hallucinations (no made-up policies, prices, timelines, employee actions)

### C) “Safer alternatives” language (use instead)
- Replace “we reviewed your records/chart” → “We take feedback seriously and would like to learn more directly.”
- Replace “our fault” → “We’re sorry to hear you had this experience.”
- Replace “you’re lying” → “We can’t confirm details here, but we’d like to look into this.”

---

## 4) Escalation Playbook v2 (Common Negative Scenarios)
### Escalation levels
- **L0:** Normal (publishable)
- **L1:** Needs manager review (publishable after approval)
- **L2:** Sensitive (manual-only hold; do not auto-post)
- **Legal:** Manual-only hold; legal counsel/owner review required

### Routing SLAs
- **Safety incident / injury allegation:** Owner/GM < 4 hours (L2)
- **Legal threat (“attorney,” “lawsuit,” “sue”):** Same day (Legal)
- **Billing dispute:** Billing lead < 24 hours (L1/L2 depending severity)
- **Service quality complaint:** Ops lead < 24 hours (L1)

### “DO NOT POST” conditions (force hold)
- Any PHI-like review where responding could confirm service relationship
- Any legal threat content
- Any credible allegation of injury/safety hazard requiring investigation
- Any harassment/threatening language where response could escalate conflict

### Scenario guidance (public response posture)
- **Billing dispute:** acknowledge concern, invite offline, no price specifics unless verified and already public.
- **Damage allegation (HVAC):** express concern, no admission, request offline contact, escalate internally.
- **Medical dissatisfaction:** no clinical discussion; invite offline; avoid outcomes.
- **Fake review suspicion:** do not accuse; state you can’t locate details and invite offline.

---

## 5) Approved Response Templates v2 (Per Vertical)
**Rules for all templates:**
- Allowed variables: {business_name}, {first_name_optional}, {contact_channel_generic} (e.g., “call our office” / “email us”), {location_optional}
- **Disallowed variables:** staff names, appointment dates, patient/client identifiers, specific services unless reviewer already stated it and it’s non-sensitive, pricing unless verified.
- Must include offline CTA.

### 5.1 Dentist (Google/Yelp safe)
**DENT-POS-01 (Positive)**
“Thank you for the kind words. We’re glad you had a great experience with {business_name}. If there’s ever anything we can do to help, please reach out to us directly—our team is here for you.”

**DENT-NEG-STRONG-01 (Strong negative; no PHI confirmation)**
“Thank you for sharing your feedback. We’re sorry to hear you’re disappointed. Because we can’t discuss details here, we’d like to learn more and address this directly—please contact {business_name} at {contact_channel_generic} so we can help.”

**DENT-LEGAL-HOLD-01 (Legal threat language detected; manual-only hold)**
“Thank you for bringing this to our attention. We take concerns seriously. Please contact {business_name} directly at {contact_channel_generic} so the appropriate team can review and follow up.”
(Posting gate: **blocked_manual_review** when legal detector triggers.)

### 5.2 Med Spa
**MEDSPA-POS-01**
“Thank you for your review. We appreciate you choosing {business_name} and we’re glad you enjoyed your visit. If you ever have questions or feedback, please reach out to us directly at {contact_channel_generic}.”

**MEDSPA-NEG-OUTCOME-01 (Avoid outcome guarantees)**
“Thank you for your feedback. We’re sorry to hear the experience didn’t meet expectations. We’d like to understand more and see how we can help—please contact {business_name} at {contact_channel_generic}. We can’t discuss details here, but we’re happy to speak privately.”

### 5.3 HVAC
**HVAC-POS-01**
“Thanks for the review. We appreciate you choosing {business_name}. If you need anything in the future, please reach out—we’re glad to help.”

**HVAC-NEG-DAMAGE-01 (No admission)**
“Thank you for letting us know. We’re sorry to hear about your experience and would like to look into it. Please contact {business_name} at {contact_channel_generic} with the best way to reach you so we can follow up directly.”

**HVAC-FAKE-01 (Suspected fake; no accusation)**
“Thank you for your feedback. We’re not able to confirm details from this post, but we take concerns seriously and would like to learn more. Please contact {business_name} at {contact_channel_generic} so we can help.”

---

## 6) Detectors + Posting Gates (Implementation Acceptance Criteria)
### Required detectors (minimum)
1. **PHI confirmation block**: trigger phrases like “chart/records/visit/appointment/patient file” → response must avoid confirmation; if risk remains, set manual-only hold.
2. **Legal threat detector**: “attorney/lawyer/lawsuit/sue/served papers” → escalation_level=Legal, post_status=blocked_manual_review.
3. **Incentive language detector**: “discount/free/gift card/refund if…” → block generation or require rewrite; never post.
4. **Liability admission detector**: “our fault/we caused/broke/damaged” → force neutral phrasing; if cannot rewrite, hold.
5. **Competitor disparagement detector**: “unlike X, they scam…” → remove competitor mention; keep generic.

### Posting gate states
- **allowed**: may post after approval
- **hold_manual_only**: draft may exist, but cannot be posted
- **blocked_manual_review**: no posting path via API/UI until cleared by authorized user

---

## 7) Audit Trail Requirements (Must Log)
Minimum fields (per response lifecycle):
- review_source (Google|Yelp)
- review_id
- business_id/location_id
- review_text_hash
- detected_risk_flags[]
- escalation_level
- response_mode (auto_draft|manual_only_hold|blocked_manual_review)
- draft_version + model/prompt version
- human_approver_id + approval_timestamp
- posted_timestamp + post_status + error_code
- final_response_text
- hold_reason + detector_version
- blocked_timestamp + unblocker_id (if unblocked)

Required events:
- draft_created
- flagged
- approved
- blocked
- posted

---

## 8) Weekly KPI Report Accuracy (Definitions + Reconciliation)
KPIs must reconcile to audit trail:
- Response rate = responses_posted / total_reviews
- Median first-response time = median(posted_timestamp - review_created)
- SLA compliance % = % posted within SLA window (configurable)
- Escalations by level/reason = count by escalation_level + flags
- Blocked vs posted vs approved reconciliation:
  - approved_count = approved events
  - posted_count = post_status=posted
  - blocked_count = post_status=blocked_manual_review
  - Must satisfy: approved_count = posted_count + blocked_count + holds_not_yet_resolved

---

## 9) Verification Run (Sandbox or Limited Live) — Summary Steps
1. Create 10 test reviews (or use historical) including: PHI-like, legal threat, incentive-bait, competitor mention.
2. Confirm detectors set correct flags and response_mode.
3. Attempt posting through **both UI and API paths**:
   - Legal threat must be blocked_manual_review (cannot post).
   - PHI-like must not confirm relationship; if uncertain, must hold.
4. Export logs; confirm required fields/events exist.
5. Generate weekly KPI report; reconcile counts to logs.

Evidence required for Go/No-Go:
- Screenshot/log export showing blocked_manual_review prevented posting
- Audit log export with required fields
- KPI report output + reconciliation worksheet

---

## 10) Customer-Facing Compliance Assurance (for onboarding/outreach)
**Blurb (paste into emails or landing page):**
“We draft brand-safe responses to Google and Yelp reviews with built-in safety controls. Our system avoids sensitive personal/medical details, never offers incentives, and automatically escalates high-risk reviews (e.g., legal threats) for manual handling. You can review and approve every response, and we keep an audit trail of drafts, approvals, and postings. Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1. Contact: agent_bob_replit+review-bot@agentmail.to.”

**Onboarding email template (free Week-1 offer):**
Subject: Free setup — safer Google/Yelp review replies in 24 hours

Hi {{OwnerName}},

I’m Bob. We’re piloting an AI Review Reply & Reputation Autopilot that drafts brand-safe responses to Google Business Profile and Yelp reviews, escalates negative/high-risk reviews for manual handling, and emails weekly reputation KPIs.

For the first week, we’re offering setup + a 7-day free trial (no payment). You keep full approval control before anything posts.

What you get:
- Drafted responses for new reviews (professional, non-inflammatory)
- Automatic escalation for sensitive cases (e.g., legal threats)
- Weekly KPIs (response rate, response time, rating trend, escalations)

Product overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you reply with your business name + whether you use Google, Yelp, or both, I’ll send a quick onboarding checklist.

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to

---

## Versioning
- v1.3: consolidated master pack + platform-policy matrix + customer-facing compliance copy. (This document)
