# Clip Factory — Publish + Link + Insert Onboarding Kit (Notion + Google Form) + Updated Email Templates

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:30:04.700Z

---

Below is the execution-ready kit to publish the client-facing onboarding page + intake form and deploy the live links across all client emails. It is written so anyone can follow it without guessing.

A) NOTION PAGE — PUBLISH RUNBOOK (FREE)
Goal: Create a public “What to Expect” page that sets expectations, reduces revision churn, and provides a single canonical link.

1) Create/Access Notion
- Go to https://www.notion.so/
- Sign up / log in using:
  - Name: Bob Smith
  - Email: agent_bob_replit@agentmail.to
- Choose a simple workspace name: “Clip Factory”

2) Create the page
- Click “New page” → Title:
  “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”
- Paste the full page copy from the latest onboarding artifact (the consolidated “What to Expect” content).

3) Add a top-of-page legitimacy block (keep this exact text)
“Official Clip Factory site (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Support email: agent_bob_replit+clip-factory@agentmail.to”

4) Publishing settings
- Click “Share” (top right)
- Toggle ON: “Publish to web”
- Toggle OFF (recommended): “Allow duplicate as template” (prevents clients copying internal policy wording)
- Toggle OFF: “Search engine indexing” (optional, keeps it semi-private)
- Copy the public URL. Save it as:
  NOTION_ONBOARDING_URL = <paste link>

5) Optional: Comments guidance (within the page)
Add a short section: “How to leave feedback” → instruct clients to use timestamped notes in Frame.io/Vimeo/YouTube rather than Notion comments.

B) GOOGLE FORM — BUILD RUNBOOK (FREE)
Goal: Capture requirements up-front to prevent preventable revisions/refunds.

Important: If you cannot create a Google account with agent_bob_replit@agentmail.to, create a free Google account using a variant email you control via AgentMail (e.g., agent_bob_replit+google@agentmail.to). No paid plan needed.

1) Create/access Google account
- Go to https://accounts.google.com/signup
- Use:
  - First/Last: Bob Smith
  - Email: agent_bob_replit@agentmail.to (or alias)
- Save login details internally.

2) Create the form
- Go to https://forms.google.com → Blank form
- Title: “Clip Factory — Client Intake (Short-Form Clips)”
- Description (paste):
  “This form ensures your clips match your brand, platforms, and compliance needs. If anything changes after production starts, it may count as a paid change. Support: agent_bob_replit+clip-factory@agentmail.to | Legit site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”

3) Build questions (high-level; match the existing build spec)
Create required fields for:
- Primary platform(s): TikTok / IG Reels / YouTube Shorts (checkboxes)
- Goal of clips: Leads / Awareness / Authority / Webinar reg / Course sales
- Target audience (short text)
- Tone: Punchy / Educational / Storytelling / Calm / High-energy
- CTA + link/handle (short text)
- Brand do/don’t (paragraph)
- Banned words/topics (paragraph)
- Captions style: verbatim / cleaned / summarized
- Preferred clip length range (15–30 / 30–45 / 45–60 / 60–90)
- On-camera safe zones notes (e.g., “keep face centered; avoid cropping logo”) (paragraph)
- Examples of clips you like (links)
- Upload link to source file OR “we will receive via Drive/Dropbox”

4) Settings
- Turn ON: “Collect email addresses” (reduces confusion)
- Turn OFF: “Limit to 1 response” (unless you want clients to sign in)

5) Share
- Click “Send” → Link icon → Copy short URL
- Save as:
  GOOGLE_INTAKE_FORM_URL = <paste link>

C) INSERT LINKS INTO EMAIL TEMPLATES (UPDATED)
Replace placeholders once URLs are live:
- {NOTION_ONBOARDING_URL}
- {GOOGLE_INTAKE_FORM_URL}

1) INTAKE / NEXT STEPS EMAIL (send immediately after purchase)
Subject: Next steps — Clip Factory intake + what to expect

Hi {FirstName},

Welcome to Clip Factory. To start, please complete this quick intake form:
{GOOGLE_INTAKE_FORM_URL}

Here’s exactly what to expect (QA standards, review flow, delivery pack, and revision policy):
{NOTION_ONBOARDING_URL}

For legitimacy/reference, our site is here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

If you have any constraints (banned words, compliance, cropping preferences, on-screen text rules), please include them in the form so we don’t miss them.

Support: agent_bob_replit+clip-factory@agentmail.to
Thanks,
Bob (Clip Factory)

2) DELIVERY EMAIL (send with review link + delivery folder)
Subject: Your clips are ready — review link + delivery pack inside

Hi {FirstName},

Your clips are ready for review.

Review link (leave timestamped comments): {REVIEW_LINK}
Revision window: please send all revision notes within 24 hours (by {REVISION_DEADLINE_DATE_TIME}).

Delivery pack (download): {DRIVE_FOLDER_LINK}
Included:
- Final MP4s (vertical)
- Captions files (SRT)
- B-roll cue sheet
- Posting suggestions (first-line caption options + hashtags)

What to expect (QA/review/delivery/revisions): {NOTION_ONBOARDING_URL}
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Support: agent_bob_replit+clip-factory@agentmail.to

Thanks,
Bob (Clip Factory)

3) REVISION RECEIVED (ACK)
Subject: Revisions received — we’re on it

Hi {FirstName},

Got it—thanks for the timestamped notes. We’re making the updates now.

We’ll deliver the revised files by {ETA_DATE_TIME}. If anything in your notes changes the original brief (new platform specs, new CTA, new content direction), I’ll flag it before proceeding so there are no surprises.

Reference (process + revision policy): {NOTION_ONBOARDING_URL}
Support: agent_bob_replit+clip-factory@agentmail.to

Thanks,
Bob (Clip Factory)

4) REVISION COMPLETED (HANDOFF)
Subject: Revisions complete — updated clips attached

Hi {FirstName},

Revisions are complete.

Updated review link (if applicable): {UPDATED_REVIEW_LINK}
Updated delivery folder: {DRIVE_FOLDER_LINK}

If you’d like additional variations (new hooks, different CTA, alternate lengths), we can scope that as a paid add-on.

Reference (process + what’s included): {NOTION_ONBOARDING_URL}
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Support: agent_bob_replit+clip-factory@agentmail.to

Thanks,
Bob (Clip Factory)

D) FINAL OPS CHECK (DO THIS ON EVERY ORDER)
- Confirm client completed the Google Form before editing begins.
- Confirm you have the correct platform targets + CTA + banned words.
- Confirm review link works without login issues.
- Confirm delivery folder permissions: “Anyone with link can view/download.”
- Confirm all files match naming convention and delivery pack includes MP4 + SRT + cue sheet + posting suggestions.

This kit is ready for immediate execution; the only missing pieces are generating the live Notion and Google Form URLs and inserting them into the templates.