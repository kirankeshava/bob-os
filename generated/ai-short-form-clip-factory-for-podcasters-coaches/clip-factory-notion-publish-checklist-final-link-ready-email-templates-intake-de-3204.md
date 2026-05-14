# Clip Factory — Notion Publish Checklist + Final Link-Ready Email Templates (Intake/Delivery/Revisions)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:42:19.117Z

---

## 1) Notion Page Publish Checklist (Public Share URL)

**Goal:** Create a single public “What to Expect” page that clients can view without logging in. Use it as the canonical source for QA standards, review flow, delivery pack contents, and revision policy.

### A. Page setup (one-time)
1. In Notion, create a new page titled: **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**.
2. Paste in the full prepared copy (sections: Overview, Timeline, QA Standards, Review, Delivery Pack, Revisions/Triage, Contact).
3. Confirm the page includes these legitimacy + contact references:
   - Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
   - Contact: agent_bob_replit+clip-factory@agentmail.to
4. Add a short top banner line: **“Save this link — it covers review + revisions + delivery contents.”**

### B. Publishing (every time you update)
1. Click **Share** (top right).
2. Toggle **“Publish” / “Share to web”** ON.
3. Settings:
   - **Allow duplicate as template:** OFF (prevents clients copying your SOP unless you want that)
   - **Search engine indexing:** OFF (keeps it from showing up in Google)
   - **Allow comments:** OFF (all comments should happen on Frame.io/Vimeo/YouTube review links, not on the SOP)
4. Copy the **public link** and store it as:
   - **NOTION_ONBOARDING_URL = [paste URL]**
5. QA the link in an incognito window (must load without login).

### C. Permission pitfalls to avoid
- If the page asks clients to request access, publishing is not properly enabled.
- If clients can edit, you accidentally gave edit permission—turn it off.

---

## 2) Link Insertion Map (Where the Notion + Form URLs go)

You will end up with two canonical URLs:
- **NOTION_ONBOARDING_URL** (public Notion page)
- **INTAKE_FORM_URL** (Google Form)

Insert them in:
- Intake email (start of project)
- Pre-flight confirmation (before editing begins)
- Delivery email (handoff)
- Revision Received + Revision Completed emails

---

## 3) Client Email Templates (Link-ready)

### 3.1 Intake / Welcome Email (Send immediately after a client says “yes”)
**Subject:** Clip Factory — quick intake + what to expect

Hey [Client Name] — Bob here.

To start your Clip Factory batch, please do these two steps:

1) **Fill out the 2-minute intake form:** [INTAKE_FORM_URL]
2) **Read “What to Expect” (QA, review, delivery, revisions):** [NOTION_ONBOARDING_URL]

**What I need from you to begin:**
- Your long-form source link/file (YouTube/Drive/Dropbox) OR upload location
- Your preferred platforms (TikTok / Reels / Shorts)
- Any banned words/topics + your CTA + handles

Once you submit the intake form, I’ll confirm:
- Clip count + target length
- Branding/style constraints
- Delivery date + review link format

Website (legitimacy/overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob

---

### 3.2 Pre-Flight Confirmation (Send after intake form is received, before editing starts)
**Subject:** Clip Factory — pre-flight confirmed ✅

Hey [Client Name],

Got your intake — thank you. Here’s what I’m producing for this batch:
- **# of clips:** [X]
- **Platforms:** [TikTok/Reels/Shorts]
- **Style notes:** [hook style / pacing / profanity rules]
- **CTA + handle(s):** [@handle / link]
- **Deadline for first delivery:** [date/time + timezone]

For review + revisions policy, please reference: [NOTION_ONBOARDING_URL]

If anything above is wrong, reply within **2 hours** so we don’t bake the wrong assumptions into the edits.

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

### 3.3 Delivery Email (Send when final pack is ready)
**Subject:** Your Clip Factory delivery — review link + download pack

Hey [Client Name],

Your clips are ready.

**1) Review link (timestamp comments):**
[REVIEW_LINK]

**How to request changes:**
- Leave **timestamped comments** on the review link (Frame.io/Vimeo/YouTube)
- Group feedback per clip (e.g., “Clip 03: change first caption line; tighten pause at 0:04”)

**2) Download / Delivery Pack:**
[DRIVE_FOLDER_LINK]

Inside the folder you’ll find:
- **Final MP4(s)** (vertical 9:16)
- **SRT caption file(s)**
- **B-roll cue sheet** (timestamps + suggested overlays)
- **Posting suggestions** (first line caption + hashtags + hook notes)

**Revision window:** Please send revision notes within **24 hours** of delivery.
Policy details: [NOTION_ONBOARDING_URL]

If you have any access issues, email me: agent_bob_replit+clip-factory@agentmail.to

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

---

### 3.4 Revision Received (Acknowledgment)
**Subject:** Revisions received — I’m on it

Hey [Client Name],

Confirmed — I received your revision notes on:
- Clip(s): [list]
- Key timestamps: [list]

I’ll turn these around within **24 hours** (usually faster). If anything looks like a scope change vs a correction, I’ll flag it before editing.

Reminder of revision policy: [NOTION_ONBOARDING_URL]

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

### 3.5 Revision Completed (Handoff)
**Subject:** Revisions done — updated files inside

Hey [Client Name],

Revisions are complete.

**Updated files:**
- Review link (if applicable): [UPDATED_REVIEW_LINK]
- Download folder: [DRIVE_FOLDER_LINK]

What changed:
- [Bullet 1]
- [Bullet 2]

If anything else is needed, reply within the remaining revision window (see policy): [NOTION_ONBOARDING_URL]

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

## 4) Ops Note (Internal): Minimum QA before sending Delivery Email
- Verify each MP4 plays on mobile, audio peaks not clipping, captions align to spoken words, faces not cropped in safe zones.
- Confirm filenames match the folder index (Clip_01, Clip_02…).
- Confirm the Drive folder permission is **“Anyone with the link can view”** (or client email added) to avoid delivery friction.
- Confirm review link opens without login (or client explicitly invited).
