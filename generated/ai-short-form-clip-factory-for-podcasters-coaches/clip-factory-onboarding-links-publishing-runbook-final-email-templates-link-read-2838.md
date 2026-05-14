# Clip Factory — Onboarding Links Publishing Runbook + Final Email Templates (Link-Ready)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:23:26.197Z

---

## 1) Notion publishing runbook (free)
Goal: publish a single client-facing page: **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”** and get a public URL.

### A. Create Notion account (if not already)
1. Go to https://www.notion.so/
2. Sign up with:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
3. Verify email via AgentMail inbox.

### B. Create the page
1. In Notion, click **New page** → choose **Empty page**.
2. Title: **Clip Factory — What to Expect**
3. Paste the full “publish-ready Notion page copy” we already drafted (the consolidated QA/review/delivery/revisions content).
4. At the very top add a short header block:
   - Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
   - Support: agent_bob_replit+clip-factory@agentmail.to

### C. Publish publicly
1. Click **Share** (top right).
2. Toggle **Publish** (or **Share to web**) → ON.
3. Enable: **Allow duplicate as template** = OFF (recommended), **Search engine indexing** = OFF.
4. Copy the public URL. Save it as:
   - **NOTION_ONBOARDING_URL = <paste link>**

### D. QA the public page
Open in an incognito window:
- Confirms page loads without login
- Confirms website + support email appear
- Confirms revision window (24h) is clearly stated

---

## 2) Client Intake Form creation runbook (Google Forms free)
Goal: collect requirements cleanly to reduce revisions/refunds.

### A. Create Google account (if needed)
1. Go to https://accounts.google.com/signup
2. Use:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to (or create a new Gmail if required)
3. If Google requires phone verification and blocks signup:
   - **Fallback (no spend): use Tally.so (free) or Jotform free** with the same questions.

### B. Build the form
1. Go to https://forms.google.com → **Blank**
2. Title: **Clip Factory — Client Intake (Short-Form Clips)**
3. Description (paste):
   “This intake helps us match your brand, avoid avoidable revisions, and deliver clips ready to post. Need help? Email agent_bob_replit+clip-factory@agentmail.to or see expectations: [NOTION_ONBOARDING_URL].”
4. Create questions (all Required unless noted):
   1) Full name
   2) Brand / business name
   3) Best email for delivery + review
   4) Source content link (YouTube/Drive/Dropbox) + any access notes
   5) Platforms (checkbox): TikTok, Instagram Reels, YouTube Shorts, LinkedIn, Other
   6) Target audience (short answer)
   7) Tone (multiple choice): Educational, High-energy, Calm/authoritative, Funny, Luxury/premium, Other
   8) CTA preference (short answer)
   9) On-screen text style (multiple choice): Minimal, Medium, Heavy captions
   10) Captions accuracy priority (multiple choice): Verbatim, Cleaned-up (recommended)
   11) Brand kit link (optional)
   12) Handle(s) + website to include (short answer)
   13) Words/topics to avoid (short answer)
   14) Examples you like (links) (optional)
   15) Any required disclaimers (optional)
   16) Confirm you reviewed “What to Expect” (checkbox): Yes

### C. Form settings
- Settings → Responses: collect email addresses = ON (optional if you already ask)
- Limit to 1 response = OFF
- Confirmation message:
  “Thanks — we’ll confirm pre-flight within 1 business day. If anything is missing, we’ll email you. Support: agent_bob_replit+clip-factory@agentmail.to”

### D. Publish + capture link
Click **Send** → Link icon → copy short URL.
Save:
- **INTAKE_FORM_URL = <paste link>**

---

## 3) Update email templates with live links (copy/paste)
Replace placeholders:
- [NOTION_ONBOARDING_URL]
- [INTAKE_FORM_URL]
- [REVIEW_LINK]
- [DELIVERY_FOLDER_LINK]
- [REVISION_DEADLINE_DATE_TIME]

All templates must include:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Support: agent_bob_replit+clip-factory@agentmail.to

---

# FINAL EMAIL TEMPLATES (Link-Ready)

## Template 1 — Intake / Next step (send immediately after lead says “yes”)
**Subject:** Clip Factory intake — 2 minutes to get your clips started

Hi [First Name],

To start your Clip Factory order, please fill out this quick intake form:
[INTAKE_FORM_URL]

It captures your platforms, tone, CTA, handles, and any “avoid” topics so we can deliver clips that are ready-to-post with minimal revisions.

What to expect (QA standards, review flow, delivery pack, revision window):
[NOTION_ONBOARDING_URL]

If you have any trouble with links or access, reply here or email: agent_bob_replit+clip-factory@agentmail.to

Website (for reference):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)

---

## Template 2 — Pre-flight confirmation (send after intake review, before editing)
**Subject:** Pre-flight confirmed — we’re clipping your content next

Hi [First Name],

Pre-flight check is confirmed. Here’s what we’re producing based on your intake:
- Source content: [Source link]
- Platforms: [Platforms]
- Caption style: [Verbatim/Cleaned-up]
- Tone: [Tone]
- CTA/handles: [CTA/handles]

If anything above is wrong, reply within **12 hours** so we don’t bake incorrect assumptions into the edits.

Review + revision policy reminder (24-hour revision window after delivery):
[NOTION_ONBOARDING_URL]

Support: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)

---

## Template 3 — Delivery email (includes review link + folder link)
**Subject:** Your clips are ready — review link + delivery pack inside

Hi [First Name],

Your Clip Factory clips are ready.

1) **Review link (timestamp comments):**
[REVIEW_LINK]

2) **Download / Delivery folder:**
[DELIVERY_FOLDER_LINK]

**What’s included in the Delivery Pack**
- Final vertical MP4s (platform-ready)
- SRT caption files (one per clip)
- B-roll cue sheet (timestamps + suggestions)
- Posting suggestions (first-line caption + hashtags + hook notes)

**Revision window:** Please leave timestamped comments within **24 hours**, by:
[REVISION_DEADLINE_DATE_TIME]

How to review + what counts as a free revision vs scope change:
[NOTION_ONBOARDING_URL]

Support: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)

---

## Template 4 — Revision received (acknowledgment)
**Subject:** Revisions received — working on updates now

Hi [First Name],

Got your revision notes — thank you.

We’re applying the changes based on your timestamped comments here:
[REVIEW_LINK]

We’ll send an updated review link / updated files once complete. Reminder: the revision window is 24 hours from delivery time (details here):
[NOTION_ONBOARDING_URL]

Support: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)

---

## Template 5 — Revision completed (handoff)
**Subject:** Revisions complete — updated clips attached/in folder

Hi [First Name],

Revisions are complete.

Updated deliverables:
- Updated review link (if applicable): [REVIEW_LINK]
- Updated files folder: [DELIVERY_FOLDER_LINK]

If you have any final notes, please reply with timestamped comments as soon as possible (policy details):
[NOTION_ONBOARDING_URL]

Support: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)
