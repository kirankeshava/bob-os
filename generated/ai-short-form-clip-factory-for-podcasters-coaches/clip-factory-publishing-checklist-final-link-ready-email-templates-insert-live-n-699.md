# Clip Factory — Publishing Checklist + Final Link-Ready Email Templates (Insert Live Notion/Form URLs)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:12:53.936Z

---

Below is the operational publishing checklist plus the finalized client email templates with explicit placeholders for the two live URLs you will generate:

A) PUBLISHING CHECKLIST (NO-SPEND)

1) Notion “What to Expect” Page (Public)
- Create/login to Notion using:
  - Name: Bob Smith
  - Email: agent_bob_replit@agentmail.to
- Create a page titled: “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”
- Paste in the full page copy from the previous artifact (the consolidated QA/review/delivery/revisions one-pager).
- Enable: Share → “Publish to web” → ON.
- Enable: “Allow duplicate as template” → OFF (recommended; keeps your SOP from being forked).
- Copy the public URL and store it as:
  - {NOTION_ONBOARDING_URL}
- Quick QA on the Notion page:
  - Headings render correctly
  - Revision window and instructions are unambiguous
  - Contact email appears: agent_bob_replit+clip-factory@agentmail.to
  - Legitimacy URL appears: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

2) Google Form “Client Intake” (Shareable)
- Create/login to a free Google account using:
  - Name: Bob Smith
  - Email: agent_bob_replit@agentmail.to
- Go to Google Forms → Blank form.
- Title: “Clip Factory — Client Intake Form”
- Description: “This form captures clip goals, formatting, brand constraints, and posting preferences so we can deliver ready-to-post vertical clips with minimal revisions.”
- Build the questions exactly per the prior Form Build Spec (platforms, tone, CTA, hooks, banned words, handles/links, brand kit, reference examples, deadline, etc.).
- Settings:
  - Collect email addresses: ON (recommended)
  - Limit to 1 response: OFF (clients may update)
  - Allow response editing: ON (optional; reduces back-and-forth)
- Get share link and store it as:
  - {GOOGLE_INTAKE_FORM_URL}
- Quick QA:
  - Required fields are enforced
  - File upload permissions work (if using upload questions)
  - Form is accessible without requesting permission

3) Link Insertion Standard
Once you have both live URLs:
- Replace {NOTION_ONBOARDING_URL} and {GOOGLE_INTAKE_FORM_URL} in ALL email templates below.
- Also store both links in your internal ops doc and pin them at the top of your client folder template.

B) FINAL EMAIL TEMPLATES (LINK-READY)

1) INTAKE / ORDER CONFIRMATION EMAIL
Subject: Quick intake for your Clip Factory order (so we nail your style)

Hi {{Client First Name}},

Thanks for the order — we’re ready to start.

Step 1 (2–4 minutes): please fill out the intake form here:
{GOOGLE_INTAKE_FORM_URL}

Step 2: please review “What to Expect” (QA standards, review flow, delivery pack, and revision policy):
{NOTION_ONBOARDING_URL}

To keep everything on track, please also share:
- The source video link/file (or folder)
- Any brand kit (fonts/colors/logo) if applicable
- 2–3 example clips you like (optional but helpful)

If you have questions, reply here or email us at:
agent_bob_replit+clip-factory@agentmail.to

Business site (for reference):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob
Clip Factory


2) DELIVERY EMAIL (WITH REVIEW LINK + REVISION WINDOW)
Subject: Your clips are ready — review link + 24h revision window

Hi {{Client First Name}},

Your Clip Factory delivery is ready.

1) Review link (please leave timestamp comments):
{{REVIEW_LINK}}

2) Delivery folder (MP4s + SRT + cue sheet + posting suggestions):
{{DELIVERY_FOLDER_LINK}}

3) Revision window:
Please submit any revision notes within 24 hours of this email (deadline: {{REVISION_DEADLINE_DATE_TIME}} {{TIMEZONE}}).

How to review quickly:
- Watch each clip once for hook clarity and pacing
- Check captions for names/terms
- Leave notes as timestamped comments (preferred) or reply with “Clip 03 @ 00:12 – change X to Y”

What to expect / our QA & revision policy:
{NOTION_ONBOARDING_URL}

If anything is urgent, reply here or email:
agent_bob_replit+clip-factory@agentmail.to

— Bob
Clip Factory


3) REVISION RECEIVED (ACK)
Subject: Got your revision notes — we’re on it

Hi {{Client First Name}},

Received — thanks for the timestamped notes.

We’re applying the revisions now. If we have any clarification questions, we’ll reply in-thread to avoid delays.

Reminder: the revision window for this delivery closes at {{REVISION_DEADLINE_DATE_TIME}} {{TIMEZONE}}.

Policy reference (what’s included vs. a change request):
{NOTION_ONBOARDING_URL}

— Bob
Clip Factory


4) REVISION COMPLETED (HANDOFF)
Subject: Revisions completed — updated clips inside

Hi {{Client First Name}},

Revisions are complete.

Updated review link (or updated files):
{{UPDATED_REVIEW_LINK_OR_DELIVERY_FOLDER_LINK}}

What was changed (summary):
- {{BULLET_1}}
- {{BULLET_2}}

If you’d like additional rounds or new creative directions (new hooks, different clip selections, new CTA), we can quote that as a paid change request.

Policy reference:
{NOTION_ONBOARDING_URL}

— Bob
Clip Factory


C) INTERNAL OPS NOTE (TO PREVENT REFUNDS)
- Never start editing until (a) intake form is completed OR (b) client confirms in writing “Proceed with default style.”
- Never send files without (a) file names finalized and (b) a quick spot-check of captions for names/brands/claims.
- Always state the exact revision deadline timestamp in the delivery email.
- Keep all links (review + delivery folder) permission-tested in an incognito window before sending.

This artifact is ready to use immediately; once the Notion and Google Form are published, replace the two placeholders and you have a complete, reputation-safe review/delivery system with clear revision boundaries.