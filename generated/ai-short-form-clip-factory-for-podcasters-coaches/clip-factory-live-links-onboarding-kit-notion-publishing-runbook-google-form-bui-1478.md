# Clip Factory — Live Links Onboarding Kit (Notion Publishing Runbook + Google Form Build Steps + Link-Inserted Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** plan
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:56:18.990Z

---

Below is the operational “link-ready” onboarding kit. It includes: (1) a runbook to publish the Notion onboarding page and capture the URL, (2) steps to build the Google Form intake and capture its URL, and (3) updated email templates with link placeholders to be replaced immediately after URLs are created.

========================
1) NOTION PUBLISHING RUNBOOK (PUBLIC SHARE URL)
========================
Goal: Publish a client-facing page titled “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)” and get a public URL to include in onboarding + delivery emails.

A. Create/Access Notion
- Log into Notion with: agent_bob_replit@agentmail.to (Name: Bob Smith)
- Workspace name recommendation: “Clip Factory”

B. Create the page
- New Page → Title: “Clip Factory — What to Expect”
- Paste the full one-page onboarding copy (from the previously prepared draft) including:
  - Business legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
  - Contact: agent_bob_replit+clip-factory@agentmail.to
  - Review instructions (timestamp comments), 24-hour revision window, and delivery pack contents.

C. Publish to web
- Click “Share” (top right)
- Toggle ON: “Publish to web”
- Recommended toggles:
  - Allow duplicate as template: OFF (unless you want clients to duplicate)
  - Search engine indexing: OFF (keep private-ish)
- Copy the public URL.

D. Quality check the live page (must-do)
- Open the URL in an incognito/private window.
- Verify:
  - Page loads without login
  - Links work (website + email)
  - Revision window + review steps are visible
  - No internal notes/ops-only content is present

Output: NOTION_ONBOARDING_URL = [PASTE LIVE URL HERE]

Fallback if Notion publishing fails: host the same content as a simple “/onboarding” page on the Replit site and link to it instead.

========================
2) GOOGLE FORM INTAKE — BUILD STEPS (FREE)
========================
Goal: Create a standardized intake form to reduce revision churn and missed requirements.

A. Account
- Use an existing Google account if available.
- If none exists, create one using:
  - Name: Bob Smith
  - Email: agent_bob_replit@agentmail.to (if Google permits; if not, create a dedicated Gmail alias like clipfactory.intake (free) and forward to agent_bob_replit+clip-factory@agentmail.to)

B. Create the form
- Google Forms → Blank form
- Title: “Clip Factory — Client Intake (Short-Form Clips)”
- Description (paste):
  “This form collects the details we need to produce platform-ready vertical clips (hooks, captions, framing, and posting suggestions). If anything changes after submission, email us at agent_bob_replit+clip-factory@agentmail.to. Business page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”

C. Questions (minimum viable)
1) Your name (Short answer) — Required
2) Brand / channel name (Short answer) — Required
3) Best email for delivery/review (Short answer) — Required
4) Content type (Multiple choice): Podcast / Coaching call / Webinar / YouTube video / Other — Required
5) Link to source video(s) (Short answer) — Required
6) Platforms you’re posting to (Checkboxes): TikTok / Instagram Reels / YouTube Shorts / LinkedIn / Other — Required
7) Clip style (Multiple choice): High-energy jump cuts / Clean & minimal / Story-driven / Educational list / Other — Required
8) Caption style (Multiple choice): Word-for-word / Cleaned-up (light edit) / Highlights only — Required
9) On-screen text preferences (Short answer) — Optional
10) CTA (Short answer): Follow / Visit site / Book call / Comment keyword / Other — Required
11) Any banned words/topics or compliance constraints? (Paragraph) — Required
12) Brand handles + links to include (Short answer) — Optional
13) Examples you like (links) (Paragraph) — Optional
14) Approval contact (Short answer) — Optional

D. Settings
- Collect email addresses: ON (recommended)
- Allow response editing: OFF
- Confirmation message:
  “Thanks — we’ve got your intake. Next: we’ll confirm pre-flight details and send a review link. For updates, email agent_bob_replit+clip-factory@agentmail.to.”

E. Share
- Click Send → Link icon → Copy
Output: INTAKE_FORM_URL = [PASTE LIVE URL HERE]

========================
3) UPDATED CLIENT EMAIL TEMPLATES (INSERT LINKS)
========================
Replace placeholders once URLs are live:
- {NOTION_ONBOARDING_URL}
- {INTAKE_FORM_URL}

-----------------------------------
A) INTAKE / ONBOARDING EMAIL
Subject: Quick intake for your Clip Factory order (so we nail the first cut)

Hi {FirstName},

To make sure your clips match your brand and platforms, please fill out this short intake form:
{INTAKE_FORM_URL}

Here’s exactly what to expect (QA standards, review flow, delivery pack, and revision policy):
{NOTION_ONBOARDING_URL}

If you prefer, you can also reply with your platform targets (TikTok/Reels/Shorts), desired tone, CTA, and any banned words.

Business page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

-----------------------------------
B) DELIVERY EMAIL (FINAL PACK + REVIEW LINK)
Subject: Your clips are ready — review link + delivery pack inside

Hi {FirstName},

Your Clip Factory delivery is ready.

1) Review link (timestamp comments): {REVIEW_LINK}
- Please leave feedback as timestamped comments.
- Revision window: 24 hours from now ({REVISION_DEADLINE_LOCAL}).

2) Delivery pack (download): {FOLDER_LINK}
Included:
- Final vertical MP4 clips (ready-to-post)
- Captions file(s) (.SRT)
- B-roll cue sheet (what/when to overlay)
- Posting suggestions (first-line caption + hashtag set per clip)

What to expect (QA/revisions): {NOTION_ONBOARDING_URL}

If anything is access-blocked (Drive permissions, etc.), email us immediately:
agent_bob_replit+clip-factory@agentmail.to

Business page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)

-----------------------------------
C) REVISION RECEIVED (ACK)
Subject: Got it — revision notes received (we’re on it)

Hi {FirstName},

Confirmed — we received your revision notes on the review link: {REVIEW_LINK}

We’ll implement the requested fixes and return an updated cut. If anything is unclear, we’ll reply with 1–2 clarification questions before making changes.

Reminder: revisions are fastest when left as timestamped comments.

What’s included in free revisions vs paid changes: {NOTION_ONBOARDING_URL}
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

-----------------------------------
D) REVISION COMPLETED (HANDOFF)
Subject: Revision complete — updated clips uploaded

Hi {FirstName},

Your revisions are complete.

Updated files:
- Review link: {REVIEW_LINK}
- Download folder: {FOLDER_LINK}

If anything still looks off (caption timing, framing, audio level), leave a timestamped note and we’ll address it within the revision window.

Process + policy: {NOTION_ONBOARDING_URL}
Business page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

========================
4) INTERNAL NOTE (OPS)
========================
When the live links are created, update:
- Your canned responses/snippets
- Your proposal/offer message on marketplaces
- Your delivery folder “README_START_HERE.txt” with:
  - Notion onboarding link
  - Review link instructions
  - Revision deadline

This ensures every client sees the same expectations, review method, and revision boundaries—reducing refunds and missed-deadline reputation damage.
