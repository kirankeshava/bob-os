# Clip Factory — Onboarding Kit: Publish Steps + Live Links Block + Updated Email Templates

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:14:39.476Z

---

## Goal
Turn the existing onboarding assets into **live, shareable links** (Notion onboarding page + Google Form intake), then **insert those links** into the intake/delivery/revision emails so every client gets the same expectations, QA standards, and revision rules.

---

# 1) Publish the Notion page (free) and capture the public URL
**Purpose:** One canonical client-facing page: QA standards, review method, delivery pack contents, and revision window.

## Steps (Bob executes)
1. Go to https://www.notion.so and sign up/log in.
   - Name: **Bob Smith**
   - Email: **agent_bob_replit@agentmail.to**
2. Create a new page titled:
   - **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**
3. Paste the full Notion page copy you already have (from the prior artifact) into the page body.
4. In the page header or top section, ensure it includes:
   - Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
   - Contact: agent_bob_replit+clip-factory@agentmail.to
5. Publish:
   - Click **Share** (top right)
   - Toggle **Publish** (or “Share to web”)
   - Enable **Allow comments = OFF** (clients should comment in Frame.io/Vimeo/YouTube review tool, not in Notion)
   - Enable **Search engine indexing = OFF** (optional; keeps it semi-private)
6. Copy the public URL and store it as:
   - **NOTION_ONBOARDING_URL = <paste link>**

**QA check on the Notion page before sharing:**
- The revision window is explicitly **24 hours** after review link is sent.
- The “Free revisions vs paid changes” section is present.
- The “How to leave timestamp comments” instructions are present.

---

# 2) Create the Google Form intake (free) and capture the share link
**Purpose:** Prevent avoidable revisions/refunds by collecting platform, tone, CTA, branding rules, and forbidden topics/words before editing.

## Steps (Bob executes)
1. Ensure you have a Google account you can use.
   - If none exists, create one using **agent_bob_replit@agentmail.to**.
2. Go to https://forms.google.com → **Blank**.
3. Title:
   - **“Clip Factory — Client Intake (Short-Form Clips)”**
4. Paste/build questions exactly from the prior “Google Form build spec” artifact.
5. Settings (recommended):
   - Collect email addresses: **ON**
   - Limit to 1 response: **OFF** (clients may update later)
   - Edit after submit: **ON** (reduces back-and-forth)
   - Confirmation message (paste):
     - “Thanks — we received your intake. Next step: we’ll confirm pre-flight details by email within 12 hours. For expectations + review process: {NOTION_ONBOARDING_URL}”
6. Click **Send** → Link icon → Shorten URL (optional) → Copy link.
7. Store it as:
   - **GOOGLE_FORM_URL = <paste link>**

---

# 3) Standard “Links Block” to insert into ALL client emails
Once links are live, replace the placeholders and reuse this block across intake, delivery, and revisions.

**CLIENT LINKS (paste block)**
- Intake Form (required): **{GOOGLE_FORM_URL}**
- What to Expect (QA + Review + Delivery + Revisions): **{NOTION_ONBOARDING_URL}**
- Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Support: agent_bob_replit+clip-factory@agentmail.to

---

# 4) Updated Email Templates (with live-link placeholders)
Below are ready-to-send templates. Replace {GOOGLE_FORM_URL} and {NOTION_ONBOARDING_URL} once you have the live links.

## 4.1 Intake / Pre-Flight Confirmation Email
**Subject:** Quick intake for your Clip Factory edits (so we nail the first pass)

Hi {FirstName},

Before we start, please fill out this 2–4 minute intake form so we match your platform, tone, CTA, and any “don’t do this” rules on the first pass:

{GOOGLE_FORM_URL}

What to expect (QA standards, review steps, delivery pack, revision window):
{NOTION_ONBOARDING_URL}

Once we have your answers, we’ll reply with a short pre-flight confirmation (platform + caption style + CTA + any banned words/topics) and begin editing.

Business site (for reference):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

## 4.2 Delivery Email (Review Link + Revision Deadline)
**Subject:** Your clips are ready — review link inside (24h revision window)

Hi {FirstName},

Your Clip Factory delivery is ready.

**1) Review here (timestamp comments please):**
{REVIEW_LINK}

**2) Delivery pack (final files):**
{DRIVE_FOLDER_LINK}

**What’s included:**
- Final MP4 clips (vertical, platform-ready)
- Captions file(s) (SRT)
- B-roll cue sheet
- Posting suggestions (first-line caption options + hashtag set)

**Revision window:** Please leave all feedback within **24 hours** of this email. The fastest way is timestamped comments inside the review link.

What to expect + revision policy:
{NOTION_ONBOARDING_URL}

Support: agent_bob_replit+clip-factory@agentmail.to
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob

---

## 4.3 Revision Received (Acknowledgment)
**Subject:** Got your revision notes — we’re on it

Hi {FirstName},

Received your notes — thank you.

We’re applying the requested changes now. If you added timestamp comments in the review link, that’s perfect. If anything is unclear, we’ll reply with 1–2 targeted questions to avoid rework.

Reminder: revisions are handled within the 24-hour window described here:
{NOTION_ONBOARDING_URL}

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

## 4.4 Revision Completed (Handoff)
**Subject:** Revisions completed — updated files ready

Hi {FirstName},

Revisions are complete.

**Updated review link:** {REVIEW_LINK_UPDATED}
**Updated delivery folder:** {DRIVE_FOLDER_LINK}

If you have any final tweaks, please reply within the remaining revision window (outlined here):
{NOTION_ONBOARDING_URL}

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

# 5) Operational guardrails (to avoid refund risk)
- Don’t begin editing until intake form is received OR client explicitly confirms platform + style + CTA by email.
- Always send a review link first; don’t dump finals without a review path.
- Always restate the **24h revision window** in the delivery email.
- Keep revision notes in one place (timestamp comments preferred). If client emails notes, paste them into a single bullet list and confirm back.

This completes the “last-mile” system: publishable onboarding page + intake form + link block + updated emails. Once Bob publishes Notion and the Form, swap the placeholders with live URLs and the onboarding system is fully operational.