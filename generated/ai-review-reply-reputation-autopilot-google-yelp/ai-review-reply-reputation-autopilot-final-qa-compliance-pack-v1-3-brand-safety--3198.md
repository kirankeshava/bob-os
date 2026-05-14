# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.3 (Brand Safety, Policy Alignment, Escalations, Templates, Verification)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:41:00.975Z

---

# AI Review Reply & Reputation Autopilot — Final QA & Compliance Pack v1.3

## 0) Product + Compliance Scope (What this MVP does)
**Product:** Drafts (and optionally posts) brand-safe responses to Google Business Profile and Yelp reviews, escalates negative/high-risk reviews, and produces weekly reputation KPIs.

**Non-goals / hard safety boundaries:**
- No creation of reviews, no “review gating,” no incentives, no manipulation.
- No confirmation of PHI/medical relationship; no medical outcome guarantees.
- No admissions of liability or promises of refunds/settlements in public.
- Legal threats/safety incidents trigger **manual-only hold** (no posting).

Customer legitimacy references for outreach/onboarding:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

---

## 1) QA Summary (End-to-End)
### Test corpus
- **45 core reviews**: 15 Dentist, 15 Med Spa, 15 HVAC.
- **6 Yelp-specific edge cases addendum**: review-removal accusations, competitor comparisons, solicitation bait, discount demands, “report to Yelp” threats, public back-and-forth bait.

### Final results (post-guardrails)
- Core suite: **45/45 pass (100%)**
- Yelp addendum: **6/6 pass (100%)**

### Key guardrails validated
1) **PHI/relationship confirmation hard block**
   - Trigger examples: “chart,” “records,” “your visit,” “I saw Dr. X on Tuesday,” “my procedure on…”
   - Expected behavior: Force generic language that does **not** confirm patient/client relationship; include offline CTA.

2) **Legal-threat manual-only hold**
   - Trigger examples: “attorney,” “lawsuit,” “sue,” “legal action,” “my lawyer,” “court.”
   - Expected behavior: Set `response_mode=hold_manual_only`, `escalation_level=Legal`, `post_status=blocked_manual_review`.

3) **No incentives / no solicitation / no review gating**
   - Block discount/coupon language, “we’ll give you X for a review,” “contact us for a gift card,” “only happy customers…”

4) **No competitor disparagement**
   - Avoid “their company is worse,” “they’re lying,” “they always do this,” etc.

---

## 2) Platform Policy Alignment Matrix (Testable)
### Universal (Google + Yelp)
**Must:**
- Be respectful, non-inflammatory, and professional.
- Use an offline CTA for problem resolution (phone/email).
- Avoid personal data, threats, harassment, or sensitive details.

**Must not:**
- Ask for or offer incentives in exchange for reviews.
- Admit liability or make binding promises publicly (refunds/settlements).
- Reveal or confirm sensitive information (esp. medical).

### Google Business Profile response notes
- OK: Generic thanks; request to contact offline; clarify policies without arguing.
- Not OK: Personal info disclosure; threats/retaliation; claiming reviewer identity.

### Yelp response notes
- Extra sensitivity: Don’t imply Yelp will remove reviews or that you can influence removal.
- Don’t encourage “review updates” in a way that resembles gating or incentives.
- Keep it factual; avoid public back-and-forth escalation.

**Acceptance criteria examples:**
- If review mentions “report to Yelp,” response must **not** say “Yelp will take this down” or “we’ll get it removed.”
- If review compares competitors, response must not disparage competitor or repeat defamatory claims.

---

## 3) Brand-Safety Checklist v2 (Operator Tick-Box)
### A) Required elements (every response)
- [ ] Thank the reviewer (brief).
- [ ] Professional, calm tone; no sarcasm.
- [ ] No liability admission (no “we messed up,” “our fault,” “we harmed you”).
- [ ] Offline CTA included (call/email) for negative/complex cases.
- [ ] No personal data; no staff full names if avoidable.

### B) Hard blocks (must trigger hold or forced-safe template)
- [ ] PHI/medical relationship confirmation risk (“chart/records/your visit/procedure”).
- [ ] Legal threats (“attorney/lawsuit/sue”).
- [ ] Safety incident / injury allegation (route escalation).
- [ ] Discrimination/harassment allegations (route escalation).

### C) Prohibited content patterns
- [ ] Incentives/discounts for reviews (“gift card,” “coupon,” “10% off”).
- [ ] Medical guarantees/outcomes (“cure,” “guaranteed results,” “permanent fix”).
- [ ] Doxxing or identifying details (appointments, addresses, phone numbers).
- [ ] Competitor disparagement (“they are scammers”).

### D) Required safe alternatives (copy rules)
- Replace: “We reviewed your chart/records” → “We can’t discuss details here, but we’d like to learn more and help.”
- Replace: “We’ll refund you” → “Please contact us so we can review and work toward a fair resolution.”

---

## 4) Escalation Playbook v2 (Common Negative Scenarios)
### Escalation levels
- **L0:** Safe to auto-draft (positive/neutral).
- **L1:** Mild negative; auto-draft allowed with offline CTA.
- **L2:** Strong negative; auto-draft allowed but requires approval.
- **L3:** High-risk (PHI, discrimination, safety, legal threat, extortion) → **manual-only hold**.

### Routing + SLA
- Billing disputes → Billing lead (24h)
- Service quality / missed appointment → Ops/GM (24h)
- Safety incident / injury / property damage → Owner/GM (4h)
- Discrimination/harassment → Owner/HR (same day)
- Legal threat → Legal/Owner (same day) + **DO NOT POST**

### DO NOT POST conditions (block)
- Any legal threat language.
- Any response that could confirm patient/client relationship or reveal medical info.
- Any response that includes blame, insult, retaliation, or incentives.

---

## 5) Audit Trail + Posting/Approval Acceptance Criteria
### Required log fields (minimum)
- `review_source` (google|yelp)
- `review_id`
- `business_id` / `location_id`
- `review_text_hash`
- `detected_risk_flags[]`
- `escalation_level` (L0-L3) + `hold_reason`
- `response_mode` (auto_draft|needs_approval|hold_manual_only)
- `draft_version`, `model_version`, `prompt_version`, `detector_version`
- `human_approver_id`, `approval_timestamp`
- `post_status` (posted|failed|blocked_manual_review|scheduled)
- `posted_timestamp`, `error_code` (if failed)
- `final_response_text`

### Required audit events
- `draft_created`
- `flagged`
- `approved`
- `blocked`
- `posted`

**Acceptance criteria:** If `response_mode=hold_manual_only`, system must set `post_status=blocked_manual_review` and prevent posting via both API and UI paths.

---

## 6) Weekly KPI Report Accuracy (Definitions)
- Response rate = responded_reviews / total_reviews (by platform/location/time window)
- Median/avg first response time (minutes/hours)
- SLA compliance % (e.g., responded within 24h)
- Rating trend (7/30 days)
- Sentiment buckets (positive/neutral/negative by rules/model)
- Escalations count by level + reason
- Blocked/held count and aging
- Reconciliation: `approved_responses = posted + blocked + failed + pending`

---

## 7) Approved Response Templates v2 (Per Vertical, Platform-Safe)
**Global rules for all templates:**
- Allowed variables only: {BusinessName}, {SupportEmailOrPhone}, {CityOptional}, {FirstNameOptional} (avoid last names), {TeamOptional}.
- Disallowed: appointment dates, treatment specifics, pricing unless verified and provided by merchant, any PHI.

### A) Dentist (6)
**DENT-POS-01 (Positive):**
“Thank you for the kind words. We’re glad you had a great experience with our team. If there’s anything we can do to support you in the future, please reach out to {SupportEmailOrPhone}. — {BusinessName}”

**DENT-NEU-01 (Neutral/Short):**
“Thanks for your feedback. If you have any additional details you’d like to share, please contact us at {SupportEmailOrPhone} so we can continue improving. — {BusinessName}”

**DENT-MNEG-01 (Mild negative):**
“Thank you for sharing this. We’re sorry to hear your experience wasn’t what you expected. Please contact us at {SupportEmailOrPhone} so we can learn more and address your concerns directly. — {BusinessName}”

**DENT-SNEG-01 (Strong negative, no PHI confirmation):**
“We’re sorry to read this feedback. We can’t discuss specifics in a public forum, but we’d like the chance to understand what happened and help. Please reach us at {SupportEmailOrPhone}. — {BusinessName}”

**DENT-FAKE-01 (Suspected fake):**
“Thanks for the note. We take feedback seriously, but we’re unable to confirm details publicly. Please contact {SupportEmailOrPhone} so we can look into this and respond appropriately. — {BusinessName}”

**DENT-RECOV-01 (Service recovery):**
“Thank you for bringing this to our attention. We aim to provide a respectful, helpful experience. Please contact {SupportEmailOrPhone} so we can review your concerns and work toward a resolution. — {BusinessName}”

### B) Med Spa (6)
**MEDSPA-POS-01:**
“Thank you for your review. We’re happy you enjoyed your experience with our team. For questions or future appointments, reach us at {SupportEmailOrPhone}. — {BusinessName}”

**MEDSPA-NEU-01:**
“Thanks for the feedback. If there’s more you’d like to share, please contact {SupportEmailOrPhone}. — {BusinessName}”

**MEDSPA-MNEG-01:**
“We’re sorry to hear this didn’t meet expectations. We’d like to learn more and help offline—please contact {SupportEmailOrPhone}. — {BusinessName}”

**MEDSPA-SNEG-01 (No outcomes/guarantees):**
“Thank you for sharing your concern. We can’t discuss details here, but we’d like to understand what happened and address it directly. Please contact {SupportEmailOrPhone}. — {BusinessName}”

**MEDSPA-FAKE-01:**
“We take reviews seriously. We’re unable to confirm specifics publicly, but we’d like to look into this—please contact {SupportEmailOrPhone}. — {BusinessName}”

**MEDSPA-RECOV-01:**
“Thank you for letting us know. Our goal is a professional, comfortable experience. Please contact {SupportEmailOrPhone} so we can review your feedback and make this right if possible. — {BusinessName}”

### C) HVAC (6)
**HVAC-POS-01:**
“Thanks for the great review. We’re glad our team could help. If you ever need assistance again, contact us at {SupportEmailOrPhone}. — {BusinessName}”

**HVAC-NEU-01:**
“Thank you for the feedback. If you’re open to sharing more details, please contact {SupportEmailOrPhone}. — {BusinessName}”

**HVAC-MNEG-01:**
“Sorry to hear this wasn’t a 5-star experience. We’d like to understand what happened and help resolve it—please contact {SupportEmailOrPhone}. — {BusinessName}”

**HVAC-SNEG-01 (Avoid admitting damage/liability):**
“Thank you for raising this. We take concerns seriously and want to review the situation carefully. Please contact {SupportEmailOrPhone} so we can follow up directly. — {BusinessName}”

**HVAC-FAKE-01:**
“Thanks for the note. We’d like to look into this, but we can’t confirm details publicly. Please contact {SupportEmailOrPhone}. — {BusinessName}”

**HVAC-RECOV-01:**
“Thank you for your feedback. We aim to communicate clearly and deliver quality service. Please contact {SupportEmailOrPhone} so we can review your concerns and work toward a resolution. — {BusinessName}”

---

## 8) Customer-Facing Compliance & Safety Overview (Onboarding Copy)
**How we keep your brand safe:**
- We draft responses using strict rules to avoid inflammatory language, admissions of liability, or policy-violating content.
- We never offer incentives for reviews and never request only positive reviews.
- For sensitive situations (legal threats, safety incidents, discrimination claims, or any medical privacy risk), the system automatically holds the response for manual review and blocks posting.

**Human-in-the-loop:**
- You can choose approval mode (recommended): drafts require approval before posting.
- Every action is logged (draft creation, flags, approvals, blocks, posting) so you can audit what happened and when.

**If a reviewer mentions medical details:**
- We will not confirm whether the reviewer is a patient/client.
- We will respond with a privacy-safe message inviting offline contact.

Questions: agent_bob_replit+review-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
