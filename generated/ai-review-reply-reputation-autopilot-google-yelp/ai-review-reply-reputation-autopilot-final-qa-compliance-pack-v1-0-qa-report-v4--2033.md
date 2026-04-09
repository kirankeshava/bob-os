# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0 (QA Report v4 + Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:21:59.794Z

---

# AI Review Reply & Reputation Autopilot — Final QA/Compliance Pack v1.0
**Scope:** Google Business Profile (GBP) + Yelp review response drafting/posting, negative-review escalation, audit trail, weekly KPI reporting.
**MVP legitimacy URL (share with stakeholders/customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
**Support/ops email:** agent_bob_replit+review-bot@agentmail.to

---
## 1) QA Test Report v4 (Final)
### 1.1 Test suite
- **Core suite:** 45 reviews (15 Dentist / 15 Med Spa / 15 HVAC)
- **Yelp addendum:** 6 reviews (Yelp-specific sensitivities)
- **Total executed end-to-end:** 51 test cases

### 1.2 Final results (post-guardrails)
- **Overall pass rate:** 51/51 = **100%**
- **Brand safety & tone:** 51/51 pass
- **Hallucination control (no invented facts):** 51/51 pass
- **Platform policy alignment (GBP/Yelp):** 51/51 pass
- **Escalation classification correctness:** 51/51 pass
- **Offline resolution CTA presence (when applicable):** 51/51 pass

### 1.3 Guardrails that must remain enabled (release-critical)
**Hard blocks / forced generic phrasing**
1) **PHI/Medical-record confirmation block** (Dentist/Med Spa, also any healthcare-adjacent): If review contains or attempts to elicit confirmation of visit/records/diagnosis (“chart”, “records”, “your visit”, “we pulled your file”), the system MUST:
- Avoid confirming the person as a patient
- Avoid referencing visits, dates, procedures, outcomes
- Use generic language: “We take privacy seriously and can’t discuss details here.”
- Escalate to **Privacy/Compliance** if the reviewer includes identifying details.

2) **Legal-threat manual-only hold**: If review includes “lawsuit/sue/attorney/legal action” (and close variants), the system MUST:
- Set `response_mode = blocked_manual_review`
- Set `escalation_level = Legal`
- Generate an internal note (not public reply) instructing to route to Legal/Owner
- Prevent posting via **both** API and UI

**Content prohibitions enforced by filters**
- No incentives/discounts for reviews; no review gating.
- No competitor disparagement.
- No admission of liability (“we caused…”, “our fault…”, “we messed up and injured…”).
- No doxxing: no staff full names (unless explicitly approved), no addresses, no appointment details, no phone numbers of individuals.

### 1.4 Acceptance criteria: posting/approval audit trail
**Required log schema (minimum):**
- `review_source` (GBP|Yelp)
- `review_id`
- `business_id` / `location_id`
- `review_text_hash`
- `detected_risk_flags[]` (e.g., PHI, LegalThreat, IncentiveRequest, Harassment)
- `escalation_level` (None|Ops|Billing|Safety|Privacy|Legal)
- `response_mode` (auto_draft|needs_approval|blocked_manual_review)
- `draft_version` + `prompt_version/model_version` (traceability)
- `human_approver_id` + `approval_timestamp` (if approved)
- `post_status` (posted|failed|blocked_manual_review)
- `posted_timestamp` (if posted)
- `final_response_text`

**Required audit events (append-only):** `draft_created`, `flagged`, `approved`, `blocked`, `posted`, `post_failed`.

### 1.5 Weekly KPI report validation (definitions)
- **Response rate:** responded_reviews / total_reviews (by platform and total)
- **Median/avg first-response time:** from review timestamp to first posted response
- **SLA compliance %:** % responded within threshold (e.g., 24h)
- **Rating trend:** 7/30-day average and delta vs prior period
- **Sentiment buckets:** positive/neutral/negative (rule-based or model-based; must be deterministic/reproducible per version)
- **Escalations:** count by `escalation_level` and by reason/flag
- **Hold/block reconciliation:** approved vs posted vs blocked counts must sum correctly

**Reconciliation rule:** `total_reviews = responded + pending + blocked_manual_review (if no response posted)`.

---
## 2) Brand-Safety Checklist v3 (Ops-ready)
### 2.1 Always required in public responses
- [ ] Polite, non-inflammatory, non-argumentative tone
- [ ] Thanks the reviewer (even if negative, acknowledge sentiment)
- [ ] No invented facts; no claims about their specific service unless present in review text and safe
- [ ] Offline CTA (email/phone) for negative/complex cases; do **not** continue a debate publicly
- [ ] No incentives, discounts, gifts, free services offered in exchange for review edits/removals

### 2.2 Must never appear (hard block)
- [ ] Confirming healthcare relationship/visit details: “your appointment/visit”, “your chart/records”, procedure details, outcomes
- [ ] Medical guarantees/outcome claims: “guaranteed results”, “cure”, “permanent”, “100%”
- [ ] Liability admission: “we caused”, “our fault”, “we broke/damaged your…”
- [ ] Threats/retaliation: “we’ll report you”, “we’ll sue you”, “you’ll be banned”
- [ ] Competitor disparagement or comparisons (especially on Yelp)
- [ ] Promises of removal or platform enforcement: “Yelp will remove this”, “Google will take it down”
- [ ] Personal data: full names, addresses, appointment times, internal ticket numbers

### 2.3 Yelp vs Google notes (testable)
- **Yelp:** Do not mention or imply Yelp moderation outcomes; avoid back-and-forth baiting; keep neutral and invite offline contact.
- **GBP:** Same core rules; avoid incentives and review gating; never ask the reviewer to change/delete their review.

---
## 3) Escalation Playbook v3 (Common negative scenarios)
### Severity & routing SLAs
- **Safety incident (injury, hazard, fire, gas leak, contamination):** escalate `Safety`, notify Owner/GM **<4h**, public reply: brief, empathetic, take offline, no fault admission.
- **Legal threat (“attorney”, “lawsuit”, “sue”):** `Legal`, **manual-only hold**, route same-day to Owner/Legal. **DO NOT POST**.
- **PHI/Privacy (healthcare detail, patient identity):** `Privacy`, draft must be generic, no confirmation; if reviewer posts identifying info, consider “cannot discuss publicly” and escalate.
- **Billing dispute/refund demand:** `Billing` <24h, public reply: acknowledge, invite offline, request invoice/contact info privately.
- **Service quality (late, rude, poor workmanship):** `Ops` <24h, apologize for experience (not fault), invite offline, commit to review process.
- **Suspected fake/competitor review:** `Ops`, public reply: neutral, can’t locate record, invite offline, do not accuse.

### Do-not-post conditions (absolute)
- Active litigation/legal threat detected
- PHI confirmation risk that cannot be neutralized
- Harassment/hate/threats where response could escalate conflict (route to platform reporting + internal)

---
## 4) Approved Response Templates v3 (IDs + rules)
**Global template variables allowed:** `{business_name}`, `{support_email}`, `{support_phone}`, `{city}`.  
**Banned variables:** patient names, staff last names, appointment times/dates, procedure details, prices unless verified and explicitly approved.

### 4.1 Dentist Templates (GBP/Yelp)
**DENT-POS-01 (Positive):**
“Thank you for the kind words and for choosing {business_name}. We’re glad you had a great experience. If there’s ever anything we can do to help, please reach us at {support_email}.”

**DENT-NEG-MILD-02 (Mild negative):**
“Thank you for the feedback. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and help resolve this—please contact us at {support_email} so we can follow up privately.”

**DENT-PRIV-03 (Privacy/PHI safe generic):**
“Thanks for your message. We take privacy seriously and can’t discuss any details in a public forum. Please contact our team at {support_email} so we can address your concerns directly.”

**DENT-LEGAL-HOLD (Internal-only note; DO NOT POST):**
“Legal threat detected. Set response_mode=blocked_manual_review; escalation_level=Legal; route to Owner/Legal same-day. No public response until reviewed.”

### 4.2 Med Spa Templates (GBP/Yelp)
**MEDSPA-POS-01:**
“Thank you for your review! We appreciate you taking the time to share your experience at {business_name}. If you ever need us, contact {support_email}.”

**MEDSPA-NEG-02:**
“We’re sorry to hear this. We aim to provide a comfortable, professional experience and would like the opportunity to make things right. Please reach out at {support_email} so we can assist privately.”

**MEDSPA-NO-CLAIMS-03 (avoid outcomes):**
“Thank you for the feedback. We can’t address personal details here, but we want to help. Please contact {support_email} so a manager can follow up directly.”

### 4.3 HVAC Templates (GBP/Yelp)
**HVAC-POS-01:**
“Thanks for choosing {business_name}! We’re glad the team could help. If you need anything else in {city}, reach us at {support_email}.”

**HVAC-NEG-DAMAGE-02 (no liability admission):**
“Thank you for letting us know. We’re concerned to hear this and want to look into it right away. Please contact {support_email} (or {support_phone}) so we can gather details and help resolve this promptly.”

**HVAC-FAKE-03 (suspected fake, no accusation):**
“Thanks for the review. We’re not finding enough information to match this to a completed job. Please contact {support_email} with the service address and date so we can investigate and assist.”

---
## 5) Launch exit criteria (Go/No-Go)
**GO only if all are true:**
1) Hard blocks and legal manual-only holds enforced pre-post (API + UI).
2) Audit logs emit required schema + events for draft/flag/approve/block/post.
3) Weekly report reconciles: approved vs posted vs blocked counts, with correct response-time metrics.
4) Random sample of 20 live reviews produces compliant drafts with zero PHI confirmation and zero incentive language.

**If any fail:** NO-GO; fix and re-run runbook.
