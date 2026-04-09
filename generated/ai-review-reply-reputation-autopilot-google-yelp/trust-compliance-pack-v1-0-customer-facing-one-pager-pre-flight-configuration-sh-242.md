# Trust & Compliance Pack v1.0 (Customer-Facing): One-Pager + Pre-Flight Configuration Sheet + Incident Response Playbook

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T05:27:23.274Z

---

AI Review Reply & Reputation Autopilot (Google/Yelp)
Customer Trust & Compliance Pack v1.0
Product site (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support email: support@yourdomain.com

SECTION A — TRUST & COMPLIANCE ONE-PAGER (share with prospects)
What this is
Our micro-SaaS helps local businesses respond to Google Business Profile and Yelp reviews quickly and professionally. It drafts brand-safe replies, flags/escalates risky reviews, and produces weekly reputation KPIs.

What we will NOT do (brand safety)
1) No admissions of liability: We avoid “we were at fault,” “we caused,” “we damaged,” etc. We use neutral, service-recovery language.
2) No sensitive/PHI confirmation: For healthcare-adjacent businesses, we do not confirm whether someone is a patient/client or reference records, visits, charts, or treatments.
3) No medical outcome guarantees: No promises or claims about results.
4) No doxxing: No posting personal phone numbers, addresses, appointment details, staff schedules, or any private identifiers.
5) No incentives or review gating: We do not offer discounts, gifts, or compensation in exchange for reviews, and we do not ask for only positive reviews.
6) No competitor attacks: We won’t disparage competitors or engage in back-and-forth arguments.

How we handle negative reviews safely
• We acknowledge the concern without confirming disputed facts.
• We invite the reviewer to take it offline (phone/email) to resolve.
• High-risk scenarios trigger escalation and may be blocked from autoposting for manual review.

Manual-only hold (safety first)
Certain content automatically switches to “manual-only hold,” meaning we will not post publicly until your designated approver reviews it.
Examples: legal threats (“sue,” “attorney”), safety incidents, harassment/discrimination claims, and any potential privacy issue.

Audit trail & transparency
We keep a posting/approval audit trail (what was drafted, what was approved, what was posted, and what was blocked), so you can prove oversight.

Platform policy alignment (Google/Yelp)
Our response rules are designed to respect platform guidelines, including:
• No incentives for reviews
• No promises to remove reviews or claims about platform enforcement
• No harassment, threats, or disclosure of personal/sensitive information

SECTION B — PRE-FLIGHT BRAND SAFETY CONFIGURATION SHEET (intake form)
Purpose: autoposting is only as safe as its configuration. Complete this once per location.

1) Business identity
• Business name:
• Location(s):
• Primary category (dentist / med spa / HVAC / other):
• Primary phone (public):
• Public support email (for offline resolution CTA):
• Website (public):

2) Response mode & approvals
Choose one:
A) Autopost low-risk only + manual approval for anything flagged (recommended)
B) Manual approval for all responses
C) Autopost all (not recommended unless mature processes exist)

Approver(s)
• Primary approver name/role:
• Backup approver name/role:
• Approval SLA target (e.g., within 4 business hours):

3) Escalation contacts (internal)
• Billing disputes → contact:
• Quality/service issue → contact:
• Safety incident / injury allegation → contact:
• Legal threat → contact:
• Privacy/PHI concern → contact:

4) Forbidden content & sensitive topics
Check any that apply (we will tighten filters accordingly):
□ Healthcare/PHI sensitivity (do not acknowledge patient status)
□ Pricing sensitivity (do not quote prices publicly)
□ Staff safety (never mention staff names publicly)
□ Active litigation or recent disputes (manual-only hold on any legal language)
□ Regulated claims (no efficacy/outcome claims)

Add custom blocked phrases (optional):
• Words/phrases to never use in replies:

5) Brand voice constraints
Pick tone (select up to 2):
□ Warm and empathetic □ Professional and concise □ Friendly and upbeat □ Formal

Words/phrases you want included (optional):
• e.g., “Thank you for your feedback,” “We’d like to make this right”

Words/phrases you want avoided (optional):
• e.g., “refund,” “compensation,” “fault,” “policy says”

6) Offline resolution CTA (required)
Preferred CTA line (choose one):
A) “Please contact our team at [PHONE] or [EMAIL] so we can help.”
B) “We’d like to learn more—please reach us at [PHONE]/[EMAIL].”
C) Custom:

7) Special instructions by platform
Yelp notes (optional):
• Any limitations your team follows when replying on Yelp:
Google notes (optional):
• Any limitations your team follows when replying on Google:

SECTION C — INCIDENT RESPONSE & CUSTOMER NOTIFICATION PLAYBOOK (internal + customer-facing guidance)
Goal: prevent accidental policy/privacy issues and protect the brand when reviews become high-risk.

Severity Levels
Level 1 (Standard negative): complaints about wait time, minor dissatisfaction, general service issues.
Level 2 (Sensitive): accusations of discrimination, staff misconduct, property damage, refund demands, suspected fake review.
Level 3 (Critical): legal threats, safety incidents/injury, privacy/PHI mention, harassment/threats.

Default actions
Level 1:
• Allowed: draft response + offline CTA. Can autopost if configured.
• Notify: Ops/GM daily digest.

Level 2:
• Allowed: draft response but route to manual approval.
• Notify: Ops/GM within 24 hours.
• Collect: order/work order ID, timestamps, staff involved (internal only), any photos or invoices.

Level 3:
• Action: manual-only hold (do not post) until reviewed.
• Notify: Owner/GM within 4 hours; Legal same-day for legal threats.
• Collect: full review text, screenshots, customer record references (internal only), incident report, any prior communications.

Customer notification templates (email/Slack) — copy/paste
1) Manual-only hold triggered (legal/privacy/safety)
Subject: Review response paused — manual review required
Body:
A review response has been paused due to a high-risk trigger (e.g., legal, privacy, or safety language). We did not post publicly.
• Platform: [Google/Yelp]
• Review ID: [ID]
• Trigger: [Legal threat / PHI risk / Safety incident]
Next step: Please review the draft and provide guidance. If this involves legal counsel or sensitive customer data, we recommend responding privately first.

2) PHI/privacy risk (healthcare-adjacent)
Subject: Privacy safeguard triggered — no public response posted
Body:
A review appears to reference personal/medical details. To avoid confirming private information, we blocked autoposting.
Recommended approach: respond with a generic invitation to contact the office directly without acknowledging patient status or treatment details.

3) Suspected fake review
Subject: Suspected fake review — recommended manual response
Body:
A review appears potentially inauthentic. We recommend a neutral, non-accusatory response inviting offline contact, and separately using the platform’s reporting tools if appropriate. We will not claim the platform will remove the review.

Public-response guidance (what to say vs. not say)
Do say:
• “We’re sorry to hear this and would like to learn more.”
• “Please contact us at [PHONE]/[EMAIL].”
• “We take feedback seriously.”
Do NOT say:
• “We reviewed your chart/records/visit…”
• “We didn’t treat you / you were never a patient…” (can still confirm status)
• “We will sue you / you’re lying…”
• “Yelp/Google will remove this”
• Any offer of compensation in exchange for changing a review

Where to send prospects to validate legitimacy
Direct prospects to the product site URL above. For security/compliance questions, route to support@yourdomain.com.

Versioning
Trust & Compliance Pack v1.0 — intended for sales + onboarding. For engineering implementation details, refer to the internal QA Launch Verification Runbook v1.2 and detector/unit-test specification.