# Clip Factory — Onboarding Kit (Notion Page Copy + Google Form Build Spec + Final Email Templates + Triage Rules)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:05:38.899Z

---

# Clip Factory — What to Expect (Client Page Copy for Notion/Doc)

**Clip Factory** converts your long-form video/podcast into ready-to-post vertical clips (TikTok / Reels / Shorts) with strong hooks, accurate captions, b-roll cues, and platform-safe formatting.

**Proof / Website:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

**Contact:** agent_bob_replit+clip-factory@agentmail.to

---

## 1) What you’ll receive (Delivery Pack)
For each batch/order we deliver a **single folder** containing:

1) **Final MP4 clips (vertical)**
- One MP4 per clip, finalized and ready to post.
- File names are consistent and sortable (example below).

2) **Captions file (SRT)**
- One SRT per clip.
- Matches the spoken words as closely as possible.

3) **B-roll Cue Sheet (Google Doc or .txt)**
- Timestamped cue list for b-roll overlays, cutaways, on-screen text moments, and emphasis notes.

4) **Posting Suggestions (per clip)**
- A suggested first-line caption (hook line)
- Suggested hashtags (light + relevant)
- Any platform-specific notes (e.g., “best as Reel”, “cut first 0.5s for TikTok”, etc.)

**Standard folder structure:**
```
/ClientName_ProjectName_YYYY-MM-DD/
  /01_Final_MP4/
  /02_SRT_Captions/
  /03_BRoll_Cue_Sheets/
  /04_Posting_Suggestions/
  /05_Review_Link_and_Notes/
```

---

## 2) Our QA standards (what we check before you see anything)
We run a final QC pass on every clip to protect your brand and avoid rework.

### A) Safe zones / framing (vertical)
- Subject’s face is not cropped (forehead/chin/cheeks) unless intentionally framed.
- Headroom is consistent and not awkward.
- **No critical text** (captions, handles, CTA) in areas likely covered by platform UI (bottom buttons, top overlays).
- If multi-person/podcast layout: speaker faces remain visible and centered.

### B) Captions accuracy + readability
- Captions reflect the spoken words (no meaning changes).
- Correct punctuation where needed for clarity.
- Proper names/brands corrected when obvious.
- Line breaks are readable on mobile.
- No offensive/unsafe auto-caption mistakes.

### C) Audio
- No clipping/distortion.
- Loudness is consistent within a clip.
- Dialogue is clearly intelligible.
- Noise reduction used only if it improves clarity without artifacts.

### D) Hook clarity (first 1–2 seconds)
- Strong opening line or intriguing setup.
- No dead air at the start.
- First frame supports the hook (face/emotion/topic context).

### E) Edits / pacing
- Removes filler (“um”, dead pauses) when it improves flow.
- Jump cuts are clean and not jarring.
- Punch-ins/zoom cuts are consistent and not random.

### F) Platform compliance
- Avoids prohibited claims or risky phrasing when obvious.
- No accidental on-screen copyrighted elements added by us.

### G) Export settings (baseline)
- Vertical 9:16
- MP4 (H.264)
- 1080x1920 preferred
- 30fps (or matches source when needed)
- Audio AAC

---

## 3) Review flow (fast + timestamped)
We send you a **review link** where you can leave **timestamped comments**.

**Free review options we can use:**
- Frame.io (free tier)
- Vimeo review link
- Unlisted YouTube + timestamp notes

### How to request changes
Please leave notes as:
- **Clip name + timestamp + exact change**
- Example: “CF_Clip03_0m12s: replace ‘marketing’ with ‘sales’ in captions”

### Revision window
You have **24 hours** from delivery of the review link to request included revisions.
- If we don’t hear back in 24 hours, we assume approved and close the delivery.

---

## 4) What counts as a free revision vs. a paid change (triage rules)
We want to be generous on quality issues while preventing scope creep.

### Included (free) revisions — within 24 hours
These are issues where we missed the spec or made a clear mistake:
- Caption errors (wrong words, missing words, obvious name errors)
- Cropped faces / unsafe zones violated
- Incorrect clip start/end that cuts off key words
- Audio leveling mistakes (too loud/quiet, clipping) caused by our edit chain
- Export/format mistakes (wrong aspect ratio, corrupted file, etc.)
- Implementing a **small** change to match your stated preferences from the intake form (e.g., “no emojis” if you specified that)

### Not included (paid change) requests
These are new creative directions or additional work beyond the agreed delivery:
- “Can you make 10 more clips?”
- Major style change after delivery (new font package, full rebrand, different caption style)
- Re-cutting the clip to tell a different story angle (new narrative) when the delivered clip meets the original brief
- Adding new assets we didn’t have (new b-roll library, new music choices, sourcing images)
- Changing the hook entirely after you approved the selection criteria

### Edge cases (we decide quickly)
If it’s ambiguous, we ask one question: **Did we fail the intake requirements or deliverable definition?**
- If yes → treat as free.
- If no → treat as paid change or a new mini-order.

---

# Google Form — Client Intake (Build Spec)
Use this to create a Google Form titled: **“Clip Factory Intake — Project Details”**

**Form description:**
“Answering these helps us cut clips that match your brand and reduce revisions. If you’re unsure, leave blank and we’ll choose defaults.”

## Section 1: Contact & Project
1) Full name (Short answer) **Required**
2) Email (Short answer) **Required**
3) Brand / Channel name (Short answer) **Required**
4) Website or primary profile link (Short answer) Optional
5) Upload link to source content (Long answer) **Required**
- Helper text: “Google Drive/Dropbox/YouTube link. Ensure permissions allow viewing/downloading.”
6) Source type (Multiple choice) **Required**
- Podcast video
- Podcast audio only
- Coaching call
- Webinar
- Other

## Section 2: Platforms & goals
7) Target platforms (Checkboxes) **Required**
- TikTok
- Instagram Reels
- YouTube Shorts
- LinkedIn
- Other
8) Primary goal (Multiple choice) **Required**
- Followers/awareness
- Leads
- Sales
- Authority
9) Desired CTA (Short answer) Optional
- Examples: “Follow for part 2”, “Comment ‘guide’”, “Book a call”, “Link in bio”

## Section 3: Style preferences
10) Caption style (Multiple choice) **Required**
- Clean (minimal emphasis)
- Punchy (more emphasis words)
- No captions (not recommended)
11) Emphasis words in captions? (Multiple choice) **Required**
- Yes
- No
12) Emojis allowed? (Multiple choice) **Required**
- Yes
- No
13) Tone (Checkboxes) Optional
- Educational
- Direct/contrarian
- Inspirational
- Funny
- Premium/clean
14) Music (Multiple choice) **Required**
- No music
- Subtle background music OK
- Trending music OK (platform-posted only)

## Section 4: Compliance & constraints
15) Banned words/topics (Paragraph) Optional
16) Must-include phrases/handles (Paragraph) Optional
17) Any compliance notes (Paragraph) Optional
- Example: “No earnings claims, no medical claims.”

## Section 5: Clip selection
18) How many clips do you want from this source? (Multiple choice) **Required**
- 3
- 5
- 10
- Not sure (choose best)
19) Preferred clip length (Multiple choice) **Required**
- 15–30s
- 30–45s
- 45–60s
- 60–90s
20) Examples you like (Links) (Paragraph) Optional

---

# Pre-flight Checklist (Ops use before editing)
- Source link works + download/view permissions confirmed
- Platforms selected + aspect ratio confirmed (default 9:16)
- Caption style + emphasis + emoji policy confirmed
- CTA provided or default chosen
- Banned topics/words noted and visible to editor
- Clip count + length targets confirmed
- Any special brand requirements captured (fonts/colors if provided)

---

# Email Templates (ready to send)

## 1) Intake Confirmation Email
**Subject:** Clip Factory — Intake received (next steps)

Hi {{FirstName}},

Thanks — we received your Clip Factory intake. If you need to update anything, reply here within the next few hours.

**Quick links:**
- What to expect (QA, review, delivery, revisions): {{NOTION_LINK}}
- Your intake form submission (if you want to re-submit): {{GOOGLE_FORM_LINK}}

**What happens next:**
1) We confirm your source link access.
2) We cut clips to match your platform + style preferences.
3) You’ll receive a review link with timestamped comments enabled.

Proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob
Clip Factory
agent_bob_replit+clip-factory@agentmail.to


## 2) Delivery Email (Review Link + Folder)
**Subject:** Your clips are ready — review link inside (24h revisions)

Hi {{FirstName}},

Your clips are ready.

**Review link (timestamp comments):** {{REVIEW_LINK}}
**Delivery folder (MP4 + SRT + cue sheet + posting suggestions):** {{DRIVE_FOLDER_LINK}}

**What’s included:**
- Final MP4 clips (ready to post)
- SRT captions files
- B-roll cue sheet
- Posting suggestions (first-line caption + hashtags)

**Revision window:** Please leave timestamped notes within **24 hours** so we can include revisions fast.

If you need help leaving notes, see: {{NOTION_LINK}}

— Bob
Clip Factory
agent_bob_replit+clip-factory@agentmail.to
Proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3


## 3) Revision Received (Acknowledgment)
**Subject:** Revisions received — we’re on it

Hi {{FirstName}},

Got your revision notes — thank you.

We’ll apply the changes and send an updated review link/final files. If anything is unclear (timestamp or requested change), we’ll reply with a quick question so we don’t waste your time.

Reminder: revisions are based on timestamped notes inside the 24-hour review window.

— Bob
agent_bob_replit+clip-factory@agentmail.to


## 4) Revision Completed (Handoff)
**Subject:** Revisions done — updated files delivered

Hi {{FirstName}},

Revisions are complete.

**Updated review link (if applicable):** {{UPDATED_REVIEW_LINK}}
**Updated delivery folder:** {{DRIVE_FOLDER_LINK}}

If everything looks good, you’re cleared to post. If there’s any remaining issue that falls under our QA standards (captions/framing/audio/export), reply within the remaining review window and include clip name + timestamp.

— Bob
Clip Factory
agent_bob_replit+clip-factory@agentmail.to

