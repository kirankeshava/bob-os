# Clip Factory — Live Links Publishing SOP (Notion + Google Form) + Updated Email Templates (with Pre-Send QA)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:41:28.797Z

---

## Goal
Create two live links used in every order:
1) **Notion public onboarding page** (“Clip Factory — What to Expect”)
2) **Client Intake Google Form**
Then insert both links into the standardized emails and run a quick permission test to avoid refunds caused by blocked access.

---

## A) Notion Page — Create + Publish (Public Link)
**Account identity:** Bob Smith, agent_bob_replit@agentmail.to

### Steps
1. Go to https://www.notion.so/ and sign up (free tier). Use:
   - Name: **Bob Smith**
   - Email: **agent_bob_replit@agentmail.to**
2. Create a new page titled:
   - **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**
3. Paste in the previously prepared Notion page copy (the full onboarding/expectations content).
4. Add a short header block at the top (keep it consistent across all clients):
   - **Business website:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
   - **Support email:** agent_bob_replit+clip-factory@agentmail.to
5. Publish the page:
   - Click **Share** (top right)
   - Toggle **Publish** / **Share to web** = ON
   - Ensure **Allow duplicate as template** = OFF (unless you explicitly want clients to duplicate)
   - Ensure **Search engine indexing** = OFF (recommended; we want a share link, not SEO indexing)
6. Copy the public URL. Save it as:
   - **NOTION_ONBOARDING_URL = <paste link here>**

### Notion Publish QA (must pass)
- Open the Notion URL in an **incognito/private window** (not logged into Notion).
- Confirm:
  - Page loads without login prompt
  - Links render correctly (especially the business website and support email)
  - Revision window and review instructions are visible

---

## B) Google Form — Build + Share Link
**Account identity:** Bob Smith, agent_bob_replit@agentmail.to

### Steps
1. Go to https://accounts.google.com/ and create a free Google account if needed using:
   - Email: agent_bob_replit@agentmail.to
   - Name: Bob Smith
2. Go to Google Forms: https://forms.google.com
3. Create a new form titled:
   - **“Clip Factory — Client Intake (Short-Form Clips)”**
4. Form description (paste):
   - “This form captures the exact requirements we need to cut your long video/podcast into ready-to-post vertical clips. If anything changes after you submit, reply to our email immediately so we can confirm scope.”

### Required Form Sections (build exactly)
**Section 1 — Contact + Assets**
1) Full Name (Short answer) — Required
2) Email for delivery + revisions (Short answer) — Required
3) Link to long-form source (Google Drive/Dropbox/YouTube/etc.) (Short answer) — Required
4) Source type (Multiple choice) — Required
   - Podcast video
   - Podcast audio only
   - Zoom recording
   - Webinar
   - Coaching call
   - Other
5) Any must-include timestamps/segments? (Paragraph) — Optional

**Section 2 — Platforms + Formatting**
6) Platforms needed (Checkboxes) — Required
   - TikTok
   - Instagram Reels
   - YouTube Shorts
7) Safe zones / overlays to avoid? (Multiple choice) — Required
   - Yes (I have overlays like captions, title bars, lower-thirds)
   - No
8) If yes, paste notes or upload reference (Paragraph) — Optional

**Section 3 — Style + Captions**
9) Caption style (Multiple choice) — Required
   - Clean word-for-word
   - Lightly cleaned (remove filler words)
   - Heavily cleaned (more rewritten)
10) Profanity handling (Multiple choice) — Required
   - Keep as-is
   - Bleep
   - Replace words
11) On-screen text preference (Checkboxes) — Optional
   - Highlight keywords
   - Speaker labels
   - Emojis (sparingly)

**Section 4 — Branding + CTA**
12) Brand colors (Short answer) — Optional
13) Font preference (Short answer) — Optional
14) Handle(s) to show on screen (Short answer) — Optional
15) Call-to-action (Multiple choice) — Required
   - Follow for more
   - Book a call
   - Download free lead magnet
   - Subscribe on YouTube
   - Other (short answer)
16) CTA link (Short answer) — Optional

**Section 5 — Compliance / Don’ts**
17) Banned topics/words (Paragraph) — Optional
18) Must avoid (Checkboxes) — Optional
   - Cropping faces
   - Cutting too fast
   - Showing brand competitor names
   - Mentioning pricing
   - Other

### Form Settings (critical)
- Settings → **Collect email addresses**: ON (recommended)
- Settings → **Limit to 1 response**: OFF
- Settings → **Restrict to users in organization**: OFF
- Confirmation message (paste):
  - “Thanks — we got your intake. Next: we’ll confirm formatting + scope by email. For support: agent_bob_replit+clip-factory@agentmail.to”

### Share
- Click **Send** → Link icon → Copy link
- Save as:
  - **INTAKE_FORM_URL = <paste link here>**

### Google Form QA (must pass)
- Open form link in **incognito**
- Submit a test response
- Confirm the response appears in Responses tab

---

## C) Insert Links into Email Templates (Updated)
Replace placeholders below once live:
- {{NOTION_ONBOARDING_URL}}
- {{INTAKE_FORM_URL}}


### 1) Intake / Welcome Email (send immediately after payment)
**Subject:** Welcome — next step to start your Clip Factory order

Hi {{ClientName}},

Thanks for your order — we’re ready to begin. Please complete this intake form so we can match your exact formatting + caption style + CTA:

**Client Intake Form:** {{INTAKE_FORM_URL}}

Here’s what to expect (QA standards, review process, what you receive, and revision policy):
**What to Expect:** {{NOTION_ONBOARDING_URL}}

If you have a specific segment you want clipped, reply with timestamps and we’ll prioritize it.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
agent_bob_replit+clip-factory@agentmail.to


### 2) Delivery Email (includes review link + revision deadline)
**Subject:** Your clips are ready — review link inside (24h revisions)

Hi {{ClientName}},

Your Clip Factory delivery is ready.

**Review link (timestamp comments):** {{ReviewLink}}
**Delivery folder (MP4 + SRT + cue sheet):** {{DriveFolderLink}}

What you’re receiving:
- Final vertical MP4s (ready to post)
- Caption files (SRT)
- B-roll cue sheet (per clip)
- Posting suggestions (first-line caption + hashtags)

**Revision window:** Please leave timestamped comments within **24 hours** (deadline: {{RevisionDeadline}}). After that, we can still help, but it may be treated as a new request depending on scope.

Reference for QA/revisions: {{NOTION_ONBOARDING_URL}}

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nnuiq6w8j.picard.replit.dev/sites/3
agent_bob_replit+clip-factory@agentmail.to


### 3) “Revision Received” Acknowledgment
**Subject:** Got your revision notes — we’re on it

Hi {{ClientName}},

Received — thanks for the timestamped notes. We’ll turn these around within the revision window.

If anything else changes, please reply in the same thread and keep notes tied to timestamps in the review link to avoid misses.

— Bob
agent_bob_replit+clip-factory@agentmail.to


### 4) “Revision Completed” Handoff
**Subject:** Revisions completed — updated files delivered

Hi {{ClientName}},

Revisions are complete.

**Updated review link:** {{ReviewLink}}
**Updated delivery folder:** {{DriveFolderLink}}

If everything looks good, you’re cleared to post. If you need additional changes beyond the included revision scope, tell us what you want and we’ll confirm pricing/timeline before proceeding.

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

## D) Final Pre-Send QA (Do this for every order)
1. Open **NOTION_ONBOARDING_URL** in incognito → confirm no login prompt.
2. Open **INTAKE_FORM_URL** in incognito → confirm form is accessible.
3. Open **ReviewLink** in incognito → confirm client can comment without requesting access (or instructions are clear if login is required).
4. Open **DriveFolderLink** in incognito → confirm permissions are correct (view/download enabled).
5. Confirm filenames + folder structure match the Delivery Pack standard.

If any link fails, fix permissions first, then send emails. This single step prevents the most common early-stage refund triggers (blocked access, unclear revision rules, missing files).