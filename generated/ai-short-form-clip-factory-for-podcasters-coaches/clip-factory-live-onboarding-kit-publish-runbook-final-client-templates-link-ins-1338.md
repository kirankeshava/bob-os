# Clip Factory — Live Onboarding Kit (Publish Runbook + Final Client Templates + Link Insertion Plan)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:26:48.174Z

---

## 0) Canonical business references (use everywhere)
- Legitimacy/website URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Support/contact email: agent_bob_replit+clip-factory@agentmail.to
- Account identity for signups: Bob Smith, agent_bob_replit@agentmail.to

---

## 1) Publish Runbook (turn drafts into live links)
### A) Notion: “Clip Factory — What to Expect” (public page)
Goal: A single URL you can paste into every onboarding + delivery email so clients always know how review/revisions work.

Steps:
1) Create/login to Notion using: Bob Smith / agent_bob_replit@agentmail.to.
2) Create a new page titled: **Clip Factory — What to Expect (QA, Review, Delivery, Revisions)**.
3) Paste the full section text from **Section 2** of this document (below).
4) At the top of the page, add a small callout:
   - “Questions: agent_bob_replit+clip-factory@agentmail.to | Website: [the URL above]”
5) Click **Share → Publish** (public).
6) Enable: “Search engine indexing” = OFF (optional), “Duplicate as template” = OFF (optional).
7) Copy the public URL and store it as:
   - **NOTION_EXPECTATIONS_URL = <paste URL>**

### B) Google Form: “Clip Factory — Client Intake” (share link)
Goal: collect requirements once so editors don’t guess (reduces refunds).

Steps:
1) Create/login to a Google account using Bob Smith / agent_bob_replit@agentmail.to (if Google requires phone verification and blocks creation, use an existing business Google account instead).
2) Go to Google Forms → New form.
3) Title: **Clip Factory — Client Intake (Short-Form Clips)**
4) Description (paste):
   “This form collects the info we need to produce clips that match your brand and platforms. If something changes after we start editing, it may count as a paid change (see revision policy on our expectations page). Questions: agent_bob_replit+clip-factory@agentmail.to | Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”
5) Build the form using **Section 3** below (questions + required fields).
6) Settings:
   - Collect email addresses = ON (recommended)
   - Allow response editing = OFF
   - Limit to 1 response = OFF
7) Click **Send → Link** and copy the share URL:
   - **GOOGLE_INTAKE_FORM_URL = <paste URL>**

### C) Link insertion: update templates in one pass
Once you have live URLs, replace the placeholders in Section 4 templates:
- {{NOTION_EXPECTATIONS_URL}} → NOTION_EXPECTATIONS_URL
- {{GOOGLE_INTAKE_FORM_URL}} → GOOGLE_INTAKE_FORM_URL

---

## 2) Notion page content (paste into Notion verbatim)
# Clip Factory — What to Expect (QA, Review, Delivery, Revisions)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Support: agent_bob_replit+clip-factory@agentmail.to

## Overview
We convert your long video/podcast into ready-to-post vertical clips optimized for TikTok/Reels/Shorts. Every order follows the same QA and review system to prevent missed details and keep turnaround reliable.

## What you’ll receive (Delivery Pack)
For each clip, we deliver:
1) **Final vertical MP4** (platform-safe export settings)
2) **Captions file (SRT)** matching the final video timing
3) **B-roll cue sheet** (timestamps + what to show/overlay)
4) **Posting suggestions**: first-line caption options + hashtag starters + recommended hook text

## QA standards we check before you see drafts
### Framing & safe zones
- Subject’s face is never cropped awkwardly.
- Captions and key text stay inside “safe zones” (not covered by UI buttons).
- Any on-screen text is readable on a phone.

### Captions accuracy
- Captions match spoken words (names/terms verified when provided).
- No distracting punctuation, missed words, or timing drift.
- Profanity/banned words handled per your preferences.

### Audio quality
- Loudness is consistent (no sudden jumps).
- Voice is clear; background noise reduced where possible.
- No clipping/distortion; music (if used) sits under voice.

### Editing quality
- Hook is clear in the first 1–2 seconds.
- Jump cuts feel intentional; no jarring mid-word cuts.
- Pacing matches the point (no dead air unless stylistic).

### Export/format
- Vertical 9:16, high-quality bitrate.
- Compatible with TikTok/Reels/Shorts.

## Review process (timestamp comments)
1) We send a review link (Frame.io/Vimeo/YouTube unlisted) with numbered clips.
2) Please leave **timestamped comments** (e.g., “Clip 3 @ 00:07: change caption line 2”).
3) We collect all changes into one revision pass whenever possible.

## Revision window (24 hours)
- You have **24 hours from delivery of the review link** to submit revision notes.
- If we don’t receive notes within 24 hours, we treat the delivery as accepted so we can stay on schedule for all clients.

## What counts as a free revision vs a paid change
### Free revisions (included)
- Fixing caption typos, missed words, timing issues
- Minor framing/safe-zone adjustments
- Small audio leveling tweaks
- Minor on-screen text corrections
- Small cut refinements that do not change the core chosen segment

### Paid changes (scope change)
- Choosing entirely new segments after drafts are made
- New creative direction (different style, new hook strategy, new CTA) after work starts
- Major restructuring (adding/removing large sections, new storyline)
- Adding new brand kit elements after editing started (new fonts/colors/logos)
- Extra revisions beyond the included pass (unless we made an error)

If you’re not sure, email us at agent_bob_replit+clip-factory@agentmail.to and we’ll confirm before proceeding.

---

## 3) Google Form build spec (copy into Google Forms)
Form title: Clip Factory — Client Intake (Short-Form Clips)

Required fields unless noted.
1) Email (collect automatically if enabled)
2) Client name / brand name
3) Link to long-form source video/podcast (Drive/Dropbox/YouTube/Vimeo)
4) Platforms needed (checkboxes): TikTok / Instagram Reels / YouTube Shorts / Other (short answer)
5) Target audience (short answer)
6) Tone (checkboxes): Professional / Casual / High-energy / Calm / Other
7) Clip style preference (checkboxes):
   - Clean captions only
   - Captions + emojis
   - Captions + kinetic words
   - Minimal text (hook only)
   - Other
8) CTA to include (short answer) (e.g., “Follow for more”, “Book a call”, “Link in bio”)
9) Handle(s) + URL(s) to display (short answer)
10) Brand kit (optional file/link): logo, colors, fonts (short answer)
11) Banned words/topics (short answer)
12) Profanity handling (multiple choice): Keep / Bleep / Replace words / Remove those segments
13) Examples you like (optional): links (paragraph)
14) Anything to avoid in edits (paragraph)
15) Approval confirmation (required checkbox):
   - “I confirm I’ve reviewed the revision policy and provided accurate requirements.”

---

## 4) Final client email templates (with link placeholders)
### A) Intake / Start Confirmation
Subject: Quick intake for your Clip Factory order (links)

Hi {{ClientName}},

To start your clip batch, please fill out our 2-minute intake form:
{{GOOGLE_INTAKE_FORM_URL}}

What to expect (QA standards, review process, delivery pack, 24h revision window):
{{NOTION_EXPECTATIONS_URL}}

If you have questions, reply here or email: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

Thanks,
Bob

### B) Delivery Email (Review link + revision deadline)
Subject: Your clips are ready — review link inside (24h revision window)

Hi {{ClientName}},

Your clips are ready for review.

Review link (timestamp comments preferred):
{{REVIEW_LINK}}

Revision window: please send all notes within **24 hours** (by {{REVISION_DEADLINE_DATE_TIME}}). Our full review/revision policy is here:
{{NOTION_EXPECTATIONS_URL}}

Delivery Pack (final files once approved / or included if already final):
- MP4 vertical clips
- SRT captions
- B-roll cue sheet
- Posting suggestions (first-line caption + hashtag starters)

If anything is urgent, email: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

Thanks,
Bob

### C) Revision Received (ack)
Subject: Got your revision notes — we’re on it

Hi {{ClientName}},

Received your revision notes—thank you. We’ll apply the requested changes and send an updated review link/files.

If you want to add anything else, please send it in the same thread before {{CUT_OFF_TIME}} so we can keep this to one clean revision pass.

Reference (process + revision policy): {{NOTION_EXPECTATIONS_URL}}
Support: agent_bob_replit+clip-factory@agentmail.to

Thanks,
Bob

### D) Revision Completed (handoff)
Subject: Revisions completed — updated clips attached/linked

Hi {{ClientName}},

Revisions are complete.

Updated review/final link:
{{UPDATED_LINK}}

If anything looks off due to an error on our side (caption mismatch, audio level issue, cropping/safe-zone issue), reply with timestamps and we’ll fix it.

Process reference: {{NOTION_EXPECTATIONS_URL}}
Support: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

Thanks,
Bob

---

## 5) Internal ops checklist (fast, consistent delivery)
Before sending any review link:
- Confirm clip count and naming (Clip_01, Clip_02…)
- Run QA: captions accuracy, safe zones, audio consistency, no cropped faces, hook clarity
- Export MP4s consistently (same FPS/resolution per batch)
- Generate SRT for each clip, ensure it matches the final cut
- Create B-roll cue sheet with timestamps per clip
- Create posting suggestions per clip (first-line caption + 5–10 hashtag starters)
- Upload to Drive folder with correct permissions (viewer access)
- Send Delivery Email with review link + revision deadline

This kit prevents missed requirements, shortens revision cycles, and protects marketplace ranking by setting clear expectations and deadlines.