# Brand-Safety & Compliance Kit v3 — Checklist + Escalation Playbook + Approved Templates (Google Business Profile + Yelp)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:35:43.880Z

---

# AI Review Reply & Reputation Autopilot — Brand-Safety & Compliance Kit v3
**Scope:** Google Business Profile (GBP) + Yelp review responses for three verticals (Dentist, Med Spa, HVAC). This kit is designed to be *enforced* via detectors/gates and to be *usable* by ops for consistent, brand-safe approvals.

---
## 1) Brand-Safety & Platform-Policy Checklist v3 (Tick-box)
**How to use:** For every draft, check the items below before approval. If any **Hard Block** triggers, response must be set to **manual-only hold** and **not posted**.

### A. Universal “Must Include”
- [ ] **Polite, calm, non-inflammatory tone** (no sarcasm, blame, or arguing).
- [ ] **Offline CTA included** (move to private channel): e.g., “Please contact us at [phone/email] so we can help.”
- [ ] **No fabricated details**: no invented appointment dates, services, staff actions, prices, diagnoses, or outcomes.
- [ ] **No promises of platform actions** (no “we’ll remove this review,” “Yelp/Google will take it down”).

### B. Universal “Never Do” (Hard Blocks)
- [ ] **PHI/PII confirmation or disclosure** (especially healthcare): do not confirm they were a patient, visited, had a procedure, or reference “chart/records/visit.”
  - **Hard-block phrases** (examples): “your chart,” “your records,” “your visit,” “we reviewed your file,” “according to your appointment.”
  - **Safe alternative:** “We can’t discuss details here, but we’d like to talk privately to understand what happened.”
- [ ] **Admit liability/fault** in a way that creates legal exposure: “We caused…,” “It was our fault,” “We damaged…,” “We made a mistake that…”
  - **Safe alternative:** “We’re sorry to hear this happened and want to look into it.”
- [ ] **Medical outcome guarantees/claims** (Med Spa/Dentist): “guaranteed results,” “permanent,” “no risk,” “100% effective.”
  - **Safe alternative:** “Results can vary; we’d like to discuss your concerns privately.”
- [ ] **Incentives / review gating** (GBP/Yelp): discounts, refunds, freebies, contests, “contact us and we’ll compensate you for updating/removing,” or any quid-pro-quo.
  - **Safe alternative:** “We appreciate feedback and want to make things right—please contact us.”
- [ ] **Doxxing / personal data**: names of staff tied to wrongdoing, addresses, phone numbers of individuals, license numbers unless already public and necessary.
- [ ] **Harassment/retaliation**: threats, shaming, “you’re lying,” “we’ll report you,” “defamation.”
- [ ] **Competitor disparagement**: “Our competitor X does this,” “They’re scammers.”

### C. “Manual-Only Hold” (Do Not Post) Conditions
If any of the following appear, set `post_status=blocked_manual_review` and escalate:
- [ ] **Legal threat** keywords: “attorney,” “lawyer,” “lawsuit,” “sue,” “court,” “legal action,” “demand letter.” → `escalation_level=Legal`
- [ ] **Safety incident / injury** claims: “hurt,” “injured,” “unsafe,” “fire,” “gas leak,” “bleeding,” “infection,” “hospital.” → `escalation_level=Safety`
- [ ] **PHI/medical privacy risk** in healthcare contexts (even if reviewer self-discloses). → `escalation_level=Privacy`
- [ ] **Extortion/blackmail**: “refund or I’ll post,” “pay me or I’ll…” → `escalation_level=Legal`

### D. Yelp vs Google Notes (Operational)
- [ ] **No incentive language on either platform** (Yelp is especially strict; avoid anything that resembles compensation).
- [ ] **Do not claim platform enforcement** (“Yelp will remove,” “Google will delete”).
- [ ] **Do not encourage public back-and-forth**; keep it short and move offline.

### E. Hallucination & Liability Control Rules (Deterministic)
- [ ] Never introduce new facts (dates, staff, procedures, invoices, “we called you twice,” etc.).
- [ ] If reviewer alleges a specific event, respond **generically** (“we’d like to learn more”) unless business has verified details.
- [ ] For healthcare: never acknowledge patient relationship; use privacy-forward language.

---
## 2) Escalation Playbook v3 (Scenarios, SLAs, Evidence)
**Escalation Levels:**
- **L0** = Standard response OK (auto-draft + optional human approval)
- **L1 Ops** = Service quality/experience recovery
- **L2 Billing** = Pricing, refunds, charges, warranty disputes
- **L3 Safety** = Safety risk, injury, hazardous conditions
- **L4 Privacy** = PHI/PII/HIPAA risk
- **L5 Legal** = Threats, claims, litigation, extortion

### Routing SLAs
- **L1 Ops:** notify Ops/GM within **24h**
- **L2 Billing:** notify Billing/Owner within **24h**
- **L3 Safety:** notify Owner/GM within **4h** (same-day)
- **L4 Privacy:** notify Owner/Compliance within **4h** (same-day)
- **L5 Legal:** notify Owner + Legal contact **same-day** (immediate if possible)

### Evidence Collection (before any public response on L3–L5)
- Screenshot of review + metadata (platform, review_id, timestamp)
- Internal job/appointment record lookup (internal only; do not reference publicly)
- Staff statements + any photos/invoices/estimates
- Call logs / email thread summary (internal)
- For healthcare: privacy impact assessment note (internal)

### Do-Not-Post Conditions (Hard)
- Any L4/L5 review → **manual-only hold**; no auto-posting.
- Any review containing threats/harassment/extortion → **manual-only hold**.
- Any review where a response would confirm identity/patient status → **manual-only hold**.

### Recommended Response Shapes by Scenario
1) **Service quality complaint (L1 Ops)**
- Acknowledge, apologize for experience (not for fault), invite offline resolution.
- Avoid arguing details.

2) **Billing/pricing dispute (L2 Billing)**
- Acknowledge concern, state you want to review privately, provide contact path.
- Never discuss line items publicly.

3) **Damage/injury/safety (L3 Safety)**
- **Hold for manual review** if injury or hazardous allegation is present.
- If posted after review: neutral, empathetic, request offline contact; no admissions.

4) **Healthcare privacy/PHI (L4 Privacy)**
- Always generic privacy language; never confirm relationship.
- Encourage calling main line; optionally provide privacy email.

5) **Legal threat/extortion (L5 Legal)**
- **Always hold**. If counsel approves a response: minimal, non-escalatory, offline only.

---
## 3) Approved Response Template Library v3 (Dentist / Med Spa / HVAC)
**Global variable rules (all templates):**
- Allowed variables: `{business_name}`, `{location_city}`, `{support_email}`, `{support_phone}`, `{hours_url}`, `{website_url}`
- **Banned variables:** patient name, procedure name, appointment time/date, invoice amount, staff names, internal record references.
- Default contact: `agent_bob_replit+review-bot@agentmail.to`
- Public legitimacy URL (use only when helpful, not as a defensive move): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### A) Dentist Templates
**DENT-PO-01 (Positive)**
“Thank you for the kind words and for choosing {business_name}. We’re glad you had a great experience. If you ever need anything, we’re here to help.”

**DENT-NEU-02 (Neutral/short)**
“Thanks for your feedback. We appreciate you taking the time to share it.”

**DENT-MN-03 (Mild negative — service experience)**
“Thanks for letting us know. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and help—please contact us at {support_phone} or {support_email} so we can follow up.”

**DENT-SN-04 (Strong negative — privacy-safe, no confirmation)**
“Thank you for the feedback. We take concerns seriously and can’t address details in a public forum. Please contact our office at {support_phone} or {support_email} so we can look into this and help.”

**DENT-FK-05 (Suspected fake/unknown reviewer)**
“Thank you for posting. We’re unable to locate enough information to understand the situation from this review. Please reach out to {support_email} with a way to contact you so we can look into it.”

**DENT-HOLD-06 (PHI/legal/safety trigger — manual-only macro; DO NOT POST)**
“INTERNAL: HOLD — Do not post. Escalate to Privacy/Legal per playbook. Draft (if counsel approves): ‘Thanks for the feedback. We can’t discuss anything publicly. Please contact {support_email} so we can address your concerns directly.’”

### B) Med Spa Templates
**SPA-PO-01 (Positive)**
“Thank you for your review and for visiting {business_name}. We appreciate your feedback and hope to see you again.”

**SPA-MN-02 (Mild negative — no outcomes)**
“Thank you for sharing this. We’re sorry to hear you’re disappointed. We’d like to learn more and see how we can help—please contact us at {support_phone} or {support_email}.”

**SPA-SN-03 (Strong negative — results vary)**
“Thanks for the feedback. We take concerns seriously. Because results and experiences can vary and we can’t discuss details publicly, please contact {support_email} so we can follow up directly.”

**SPA-BI-04 (Billing/pricing dispute)**
“Thank you for letting us know. We’d like to review your concern privately. Please contact {support_email} or {support_phone} so our team can follow up.”

**SPA-FK-05 (Suspected fake)**
“Thanks for posting. We want to understand what happened, but we don’t have enough information from this review to identify the situation. Please contact {support_email} so we can follow up.”

**SPA-HOLD-06 (Medical/privacy/legal trigger — manual-only macro; DO NOT POST)**
“INTERNAL: HOLD — Do not post. Escalate to Privacy/Legal. Never confirm client relationship or treatment. Minimal approved public response only if authorized.”

### C) HVAC Templates
**HVAC-PO-01 (Positive)**
“Thanks for the review and for choosing {business_name}. We appreciate it and are glad we could help.”

**HVAC-MN-02 (Mild negative — scheduling/communication)**
“Thanks for the feedback. We’re sorry for the frustration and want to make this right. Please contact us at {support_phone} or {support_email} so we can look into it.”

**HVAC-SN-03 (Strong negative — alleged poor work)**
“Thank you for sharing this. We take concerns seriously and would like to understand the situation. Please reach out at {support_email} or {support_phone} so we can follow up directly.”

**HVAC-DM-04 (Alleged damage)**
“Thanks for letting us know. We’d like to review this promptly. Please contact {support_phone} or {support_email} so we can gather details and help resolve it.”

**HVAC-FK-05 (Suspected fake)**
“Thank you for posting. We’re not able to identify the job from this review alone. Please contact {support_email} with details so we can look into it.”

**HVAC-HOLD-06 (Safety/legal threat — manual-only macro; DO NOT POST)**
“INTERNAL: HOLD — Do not post. Escalate to Safety/Legal. If safety (gas leak/fire) is alleged, prioritize customer safety instructions privately and document internally.”

---
## 4) Post-Launch QA Sampling Plan (10 reviews/week)
**Goal:** detect drift in tone/safety/policy compliance and detector failures.
- Weekly sample: 4 positive, 4 negative, 2 edge/high-risk (privacy/legal/safety)
- Score each with checklist v3; record: pass/fail, triggered flags, whether offline CTA present, and whether any banned phrases appear.
- Any failure in L4/L5 handling (privacy/legal) is a **P0**: immediate rollback to manual-only approvals.

---
## 5) Customer-Comms Footnote (for approvals/UI help text)
If customers ask what this tool is or request proof of legitimacy, use:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support email: agent_bob_replit+review-bot@agentmail.to

**End of Kit v3**
