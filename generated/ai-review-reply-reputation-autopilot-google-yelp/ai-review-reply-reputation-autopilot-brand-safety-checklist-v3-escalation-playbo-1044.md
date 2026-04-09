# AI Review Reply & Reputation Autopilot — Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3 (Dentist/Med Spa/HVAC)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:09:41.560Z

---

AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)
QA/Compliance Operational Pack v3
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

SECTION A — BRAND-SAFETY CHECKLIST v3 (Tick-box)

A1. Universal hard prohibitions (MUST NOT appear)
[ ] Admit liability or fault: “we messed up”, “our negligence”, “we’re at fault”, “we caused”, “we damaged”, “we injured”.
[ ] Confirm private relationship/attendance/records (PHI/PII confirmation): “we reviewed your chart/records/visit”, “as your dentist”, “you were seen on”, “your treatment”, “your procedure”, “your appointment”.
[ ] Share personal data: names of staff beyond first name/role, phone/email/address of reviewer, appointment dates/times, invoices, photos, video, license plates.
[ ] Medical outcome guarantees or comparative claims: “guaranteed results”, “permanent”, “cure”, “no risk”, “best in town”, “100% safe”.
[ ] Incentives/solicitation or review gating: “discount for reviews”, “free gift if you update”, “contact us and we’ll remove this”, “only leave a review if…”.
[ ] Threats/retaliation: “we will take action”, “we will report you”, “we’ll sue”, “defamation”.
[ ] Competitor disparagement: “our competitor lies”, “they’re scammers”, “unlike X who…”.
[ ] Promising platform enforcement/removal: “we’ll have Yelp remove this”, “Google will take it down”.

A2. Required elements for any negative/neutral response
[ ] Acknowledge feelings without admitting facts: “We’re sorry to hear you had a frustrating experience.”
[ ] Invite offline resolution with neutral CTA: “Please contact our team at [PHONE/EMAIL] so we can look into this.”
[ ] Avoid debating details; keep it short (2–5 sentences).
[ ] Use brand-safe tone: calm, non-accusatory, non-sarcastic.

A3. PHI/PII & sensitive services (Dentist/Med Spa)
[ ] If review mentions a procedure/diagnosis/outcome, respond generically and do NOT confirm they are a patient.
[ ] Use phrasing like: “We can’t discuss any details here, but we’d like to help.”
[ ] If reviewer requests clinical advice, respond: “Please contact our office directly for personalized guidance.”

A4. Legal threat / safety incident handling (Manual-only hold)
Trigger terms include: “attorney”, “lawyer”, “lawsuit”, “sue”, “legal action”, “court”, “police report”, “BBB complaint”, “regulator”.
[ ] System must set response mode = HOLD (manual-only) and escalation_level=Legal/Safety.
[ ] No auto-posting. Only internal notification + evidence collection.

A5. Yelp vs Google notes (testable)
Yelp:
[ ] Do not imply Yelp will remove reviews or that business can influence Yelp moderation.
[ ] Do not use language that sounds like “review gating” or incentive offers.
Google Business Profile:
[ ] Avoid sharing any personal/transaction details; keep responses general.
Both:
[ ] Never request reviewer to change rating in exchange for resolution.

A6. Response variables allowed (safe substitution list)
Allowed: business name, general team/role (“manager”), generic phone/email, generic invitation to call, store hours link.
Not allowed: reviewer name (unless explicitly shown and approved), staff full names, appointment dates, procedure details, invoice numbers, pricing unless the business provides verified public pricing context.

SECTION B — ESCALATION PLAYBOOK v3 (Scenario matrix)

B1. Escalation levels
Level 0: Standard (auto-draft + optional approve)
Level 1: Negative service experience (auto-draft + approve recommended; route Ops)
Level 2: Billing/refund dispute or alleged property damage (auto-draft + approve required; route Billing/Ops)
Level 3: Safety incident, discrimination/harassment, PHI/PII risk, or legal threat (HOLD manual-only; route Owner + Legal/Safety)

B2. Routing SLAs (internal)
Service failure (late/no-show, rude staff, poor quality): Ops Lead within 24h.
Billing dispute/refund: Billing within 24h; Ops copied.
Property damage (HVAC): Ops Lead within 4h; gather photos/invoice; do not admit fault publicly.
Safety incident (injury, contamination, unsafe install): Owner/GM within 4h; HOLD response.
Discrimination/harassment allegation: Owner/HR same day; HOLD response.
Legal threat: Legal/Owner same day; HOLD response.
PHI/PII mention (dentist/med spa): Compliance/Owner same day; HOLD response unless generic response approved.

B3. Do-not-post conditions (automatic HOLD)
- Mentions of attorney/lawsuit/police/regulators
- Explicit PHI/medical records references (“chart”, “records”, “visit”, “procedure details”) paired with identifiable details
- Threats/harassment or doxxing
- Active safety investigation language (“reported to OSHA”, “board complaint”) 

B4. Evidence checklist per scenario
Billing dispute:
- Invoice/estimate, payment receipt, comms timeline, policy text.
Property damage:
- Photos before/after, work order, technician notes, warranty terms.
Medical/dental complaint:
- Do NOT paste charts into tooling; reference internally. Collect consent status and internal notes.
Suspected fake review:
- Internal appointment search result (yes/no), date ranges checked, staff on duty, any matching ticket.
Legal threat:
- Screenshot of review, internal incident report, preserve logs, pause public engagement.

B5. Public response posture (safe defaults)
- Acknowledge, apologize for frustration (not wrongdoing), invite offline contact.
- Never challenge motives; never accuse reviewer of lying.
- Never discuss money amounts publicly; move to offline.

SECTION C — APPROVED RESPONSE TEMPLATE LIBRARY v3
Rules for all templates:
- Keep 2–5 sentences.
- Include offline CTA.
- No PHI/PII confirmation.
- No liability admission.
- No incentives.

C1. DENTIST TEMPLATES (Google/Yelp)

DENT-POS-01 (Positive)
“Thank you for the kind words. We’re glad you had a great experience with our team. If there’s ever anything we can do to help, please reach us at [PHONE] or [EMAIL].”

DENT-NEU-01 (Neutral/short)
“Thanks for your feedback. We’re always working to improve the experience for everyone. If you’re open to sharing more details, please contact our office at [PHONE] or [EMAIL].”

DENT-NEG-01 (Mild negative: wait time/communication)
“We’re sorry to hear your visit felt frustrating. We aim to be respectful of everyone’s time and communicate clearly. Please contact our office at [PHONE] or [EMAIL] so we can learn more and address this directly.”

DENT-NEG-02 (Strong negative: quality concern; NO clinical specifics)
“We’re sorry to hear you’re disappointed. We can’t discuss any details in a public forum, but we take concerns seriously and want to help. Please contact our office manager at [PHONE] or [EMAIL] so we can look into this promptly.”

DENT-PHI-01 (PHI/records mention → generic, no confirmation)
“Thank you for reaching out. For privacy reasons, we can’t address anything related to records or care in public. Please contact our office at [PHONE] or [EMAIL] so our team can assist you directly.”

DENT-FAKE-01 (Suspected fake / no record; non-accusatory)
“We take feedback seriously and want to make sure we connect you with the right team. Please contact us at [PHONE] or [EMAIL] with any details you’re comfortable sharing so we can look into this.”

C2. MED SPA TEMPLATES (Google/Yelp)

MSPA-POS-01
“Thank you for the wonderful review. We’re glad you enjoyed your experience with our team. If you ever need anything, please reach us at [PHONE] or [EMAIL].”

MSPA-NEU-01
“Thank you for your feedback. We’re always working to improve. Please contact us at [PHONE] or [EMAIL] so we can learn more and help.”

MSPA-NEG-01 (Service experience)
“We’re sorry to hear your experience didn’t meet expectations. We’d like the chance to make this right. Please contact our manager at [PHONE] or [EMAIL] so we can discuss privately.”

MSPA-NEG-02 (Outcome dissatisfaction; avoid guarantees)
“We’re sorry you feel disappointed. Results and preferences can vary, and we want to understand your concerns. Please contact us at [PHONE] or [EMAIL] so we can review next steps privately.”

MSPA-PHI-01 (Mentions treatment details/records)
“For privacy reasons, we can’t address any treatment-related details here. Please contact our team at [PHONE] or [EMAIL] so we can help directly.”

MSPA-FAKE-01
“We want to make sure we address the right situation. Please contact us at [PHONE] or [EMAIL] with any details you’re comfortable sharing so we can look into this.”

C3. HVAC TEMPLATES (Google/Yelp)

HVAC-POS-01
“Thank you for the review. We appreciate the opportunity to help and are glad you had a good experience with our team. If you ever need support again, call us at [PHONE] or email [EMAIL].”

HVAC-NEU-01
“Thanks for your feedback. We’re always working to improve our scheduling and service. Please contact us at [PHONE] or [EMAIL] so we can learn more.”

HVAC-NEG-01 (Late/no-show)
“We’re sorry to hear this was frustrating. We aim to communicate clearly about scheduling and timing. Please contact our office at [PHONE] or [EMAIL] so we can look into what happened and help.”

HVAC-NEG-02 (Work quality concern; no fault admission)
“We’re sorry you’re unhappy with the service. We’d like to understand the issue and review options with you directly. Please contact us at [PHONE] or [EMAIL] so we can assist.”

HVAC-DAMAGE-01 (Alleged property damage)
“We’re sorry to hear about your concern. We take this seriously and want to review the details directly. Please contact our manager at [PHONE] or [EMAIL] so we can look into this promptly.”

HVAC-FAKE-01
“We want to make sure we’re addressing the right situation. Please contact us at [PHONE] or [EMAIL] with any details you’re comfortable sharing so we can look into this.”

SECTION D — QA EVIDENCE LOG (Attach to Runbook execution)
For each test run, capture:
1) Environment: Sandbox/Live, business_id/location_id, platform (Google/Yelp)
2) Test case ID(s) executed
3) Screenshot/export: review as seen in UI, draft output, final response (if posted)
4) Audit log export for each: draft_created, flagged (if any), blocked (if hold), approved, posted
5) Weekly KPI report export showing counts: approved vs posted vs blocked_manual_review; escalations by level
6) Exceptions: any mismatch with expected log schema or KPI reconciliation

Owner/Engineering next action required:
- Confirm sandbox availability; otherwise select one low-risk location for limited live verification.
- Run Runbook v1.2 with this v3 checklist/playbook/templates, attach Evidence Log, and complete Go/No-Go sign-off.
