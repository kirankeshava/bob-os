# Clip Factory — Live Links Publishing Runbook + Finalized Comms (Link-Ready)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:06:42.777Z

---

## 1) Notion: “Clip Factory — What to Expect” (Publish Runbook)

**Goal:** Create a single client-facing page that reduces refunds by setting expectations for QA, review, delivery contents, and revisions.

**Account & workspace**
- Create/login Notion using:
  - Name: Bob Smith
  - Email: agent_bob_replit@agentmail.to
- Workspace name suggestion: **Clip Factory**

**Page title:** Clip Factory — What to Expect (QA, Review, Delivery, Revisions)

**Critical settings (to avoid client confusion):**
1) Click **Share** → toggle **Share to web** = ON.
2) Allow **Duplicate as template** = OFF (unless you want clients to clone it).
3) Editing: ensure **no public edit access**.
4) Copy link and store it as: **NOTION_ONBOARDING_URL**.

### Notion Page Content (paste in this exact structure)

**Header**
- **Clip Factory — What to Expect**
- Legit link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Contact: agent_bob_replit+clip-factory@agentmail.to

---

### A) How the process works (fast overview)
1. **Intake** (you tell us platforms, tone, CTA, banned words, handles)
2. **Pre-flight confirmation** (we confirm specs before editing starts)
3. **First delivery** (MP4s + SRT + cue sheet + posting suggestions)
4. **Review & revisions** (timestamped comments, 24-hour window)
5. **Final delivery** (revised exports + final pack)

---

### B) Quality standards (what we check before you ever see it)
**Captions & readability**
- Captions match spoken words (no meaning changes)
- Proper nouns verified when provided (names/brands/terms)
- Line breaks optimized for mobile (no walls of text)
- Safe margins respected (no captions under UI areas)

**Framing & composition**
- Faces not cropped; eyes not cut off
- Subject centered for vertical; no important elements outside safe zone
- Jump cuts do not create awkward face/body crops

**Audio**
- Clear voice; no clipping/distortion
- Consistent loudness clip-to-clip
- Background audio/music does not overpower voice

**Hook clarity**
- First 1–2 seconds communicate a clear curiosity hook
- Title text/hook text is readable and not contradictory to audio

**Platform formatting**
- 9:16 vertical exports by default
- Correct resolution + codec settings (see Export Specs below)

---

### C) Review flow (how to request changes)
**Where you’ll review:** we provide a review link (Frame.io / Vimeo / unlisted YouTube) with timestamp commenting.

**How to comment:**
- Leave **timestamped notes** like “00:07 change caption to ___” or “00:12 remove ‘um’.”
- If multiple changes, number them.

**Revision window:**
- You have **24 hours** from delivery to submit revision notes for included revisions.
- After 24 hours, changes are treated as a new request (see Revision Policy).

---

### D) What you receive (Delivery Pack contents)
We deliver a folder containing:
1) **Final vertical MP4s** (one file per clip)
2) **SRT caption files** (one per clip)
3) **B-roll cue sheet** (timecoded suggestions and optional overlays)
4) **Posting suggestions** per clip:
   - First-line caption option
   - Hook text option
   - Hashtag set (platform-appropriate)
   - Suggested posting time window (if provided)

---

### E) Export specs (default)
- Format: MP4
- Codec: H.264
- Resolution: 1080x1920 (9:16)
- FPS: match source (or 30fps if mixed)
- Audio: AAC, 48kHz

---

### F) Revision policy (what’s included vs paid)
**Included (free) revisions (within 24h):**
- Caption typos / timing fixes
- Minor hook text changes that don’t change the clip’s concept
- Small cut timing tweaks (tighten pauses, remove a word)
- Reframe adjustments (safe zone / face crop fixes)
- Audio leveling tweaks

**Paid changes (scope change):**
- Changing the clip selection (new moments) after delivery
- New creative direction (different hooks, different target audience angle)
- Major restructuring (rebuild clip from scratch)
- Adding new branded motion package not previously requested
- Revisions requested after the 24h window

**If something is our mistake:**
- We fix it free, always (caption inaccuracies we introduced, missed safe zones, wrong export settings).

---

## 2) Google Form: Client Intake (Build Runbook)

**Goal:** reduce preventable revisions by collecting requirements up front.

**Account:** create/login Google using Bob / agent_bob_replit@agentmail.to (free)

**Form title:** Clip Factory — Client Intake
**Form description:** “Please complete this so we can match your platform specs, tone, and branding from day 1. If you have questions email agent_bob_replit+clip-factory@agentmail.to.”

**Settings (important):**
- Collect email addresses: ON
- Allow response editing: OFF (optional)
- Limit to 1 response: OFF (clients may have multiple projects)
- File upload question: only if necessary (requires Google sign-in); alternative: ask for Drive/Dropbox link instead.

### Questions (recommended, required unless marked optional)
1) **Your name**
2) **Brand / channel name**
3) **Primary email (confirm)**
4) **Social handles (TikTok/IG/YT)**
5) **Primary platform(s)** (checkbox): TikTok / Instagram Reels / YouTube Shorts / LinkedIn / Other
6) **Goal** (multiple choice): Leads / Course sales / Podcast growth / Newsletter / Brand awareness / Other
7) **Target audience (1 sentence)**
8) **Tone** (checkbox): high-energy / calm-authoritative / comedic / educational / contrarian / motivational
9) **Call-to-action** (short answer) + **Link/offer** (short answer)
10) **Banned words/topics** (paragraph)
11) **Must-include phrases** (optional)
12) **Caption style** (multiple choice): word-for-word / cleaned-up / summarized
13) **On-screen text style** (multiple choice): minimal / medium / bold
14) **Branding assets link** (short answer): “Paste Google Drive/Dropbox link”
15) **Source video/podcast link(s)** (paragraph)
16) **Clip length preference** (checkbox): 15–25s / 25–45s / 45–60s / 60–90s
17) **Competitors/creators you like (links)** (optional)
18) **Anything else / constraints** (paragraph)

After building: click **Send** → copy link → store as **GOOGLE_INTAKE_FORM_URL**.

---

## 3) Link insertion points (make the system ‘live’)
Once the Notion page + Google Form are published, paste the URLs into these templates.

### A) Intake Confirmation Email (after client orders)
**Subject:** Clip Factory — Intake form + what to expect (timeline & revisions)

Hi {{FirstName}},

Thanks for the order — we’re ready to start.

1) **Complete this intake form (required):** {{GOOGLE_INTAKE_FORM_URL}}
2) **What to expect (QA, review, delivery, revisions):** {{NOTION_ONBOARDING_URL}}

If you already have your source video/podcast link ready, reply to this email with it as well.

Business site (legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

### B) Delivery Email (first delivery)
**Subject:** Your clips are ready — review link + 24h revision window

Hi {{FirstName}},

Your Delivery Pack is ready.

- **Review link (timestamp comments):** {{REVIEW_LINK}}
- **Download folder (MP4s + SRT + cue sheet + posting suggestions):** {{DRIVE_FOLDER_LINK}}
- **Revision window:** Please send revision notes within **24 hours** (by {{REVISION_DEADLINE}}).

How to request changes: leave timestamp notes like “00:07 change caption to ___”.
Revision policy & QA standards: {{NOTION_ONBOARDING_URL}}

— Bob (Clip Factory)
agent_bob_replit+clip-factory@agentmail.to

### C) Revision Received (ack)
**Subject:** Revisions received — we’re on it

Hi {{FirstName}},

Got your revision notes — thank you. We’ll implement these and send an updated pack.

If anything falls outside included revisions, we’ll flag it before making changes.
(Policy reference: {{NOTION_ONBOARDING_URL}})

— Bob

### D) Revision Completed (handoff)
**Subject:** Revisions complete — updated clips attached/in folder

Hi {{FirstName}},

Revisions are complete.

- Updated Delivery Pack folder: {{DRIVE_FOLDER_LINK}}
- Updated review link (if applicable): {{REVIEW_LINK}}

If you need additional changes, please reply with timestamp notes.

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

## 4) Internal “Don’t Miss” QA gate (before sending any delivery email)
- Confirm filenames match naming convention and count matches order
- Scrub first 3 seconds of every clip: hook clarity + no awkward crop
- Check captions on mute: readability, no off-screen text
- Quick audio pass: no clipping, voice is dominant
- Export spec check: 1080x1920, H.264, AAC
- Delivery Pack present: MP4 + SRT + cue sheet + posting suggestions
- Review link permissions: anyone with link can view/comment
- Revision deadline computed + included in email

This runbook makes the onboarding assets publishable on free tiers and wires them into email templates so delivery/revision expectations are consistently enforced (refund prevention + reputation protection).