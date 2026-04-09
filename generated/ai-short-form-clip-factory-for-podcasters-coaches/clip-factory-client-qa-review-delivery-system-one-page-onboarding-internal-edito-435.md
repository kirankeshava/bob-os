# Clip Factory — Client QA/Review/Delivery System + One-Page Onboarding + Internal Editor SOP

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:15:49.591Z

---

## Clip Factory — Client QA/Review/Delivery System (Client-Facing)

**Business proof:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3  
**Support email:** agent_bob_replit+clip-factory@agentmail.to

### 1) What you receive (Delivery Pack)
For each batch/order, you’ll receive a **Delivery Pack** containing:
1) **Final vertical MP4 clips** (ready to post)
2) **Caption files (SRT)** for each clip
3) **B-roll cue sheet** (what to overlay + where + search prompts)
4) **Posting suggestions** per clip: hook text, first-line caption, recommended hashtags, and platform notes

**Standard folder structure**
- /ClientName_Project_Date/
  - 01_FINAL_MP4/
  - 02_SRT_CAPTIONS/
  - 03_BROLL_CUE_SHEETS/
  - 04_POSTING_SUGGESTIONS/
  - 05_REVIEW_EXPORTS/ (optional; watermark versions)

### 2) QA checklist (what we check before you ever see it)
We run QC on every clip to prevent common issues that cause low performance, takedowns, or rework.

**A) Framing & Safe Zones (Vertical-first)**
- Export is **9:16** (1080×1920) unless otherwise requested.
- Subject face is not cropped (no cut-off chin/forehead; no “half-face” in frame).
- Key visuals stay inside “safe zones”:
  - Avoid bottom ~15% where platform UI/captions can cover.
  - Avoid right-side overlays where icons appear.
- No awkward zooms that pixelate or distort.

**B) Hook & Clarity (first 1–2 seconds)**
- Hook is immediately understandable without context.
- Clip starts with the “payoff” moment (no long lead-in).
- If needed, on-screen text clarifies who/what/why in under 8 words.

**C) Captions accuracy & readability**
- Captions match the spoken audio (names/terms corrected).
- No missing lines; no repeated/duplicated lines.
- Line breaks are readable (no 1-word-per-line “staircase”).
- Punctuation used for clarity (not perfect grammar, but natural reading).
- Style consistency: font, size, outline/shadow, highlight rules.

**D) Audio leveling & cleanliness**
- Dialogue is clearly audible over any music.
- No clipping/distortion on loud words.
- Noise reduction applied if needed without “robotic” artifacts.
- Loudness is consistent across clips in the batch.

**E) Jump cuts & pacing**
- Cuts feel intentional; no mid-word cuts.
- Dead air removed.
- If jump cuts are used, they are rhythmically consistent.
- No jarring flashes/frames.

**F) B-roll / overlays / graphics**
- B-roll enhances meaning; doesn’t distract.
- Any on-screen facts/claims are consistent with the audio.
- No copyrighted logos/footage inserted unless client supplied or explicitly allowed.

**G) Platform compliance**
- No banned words displayed unnecessarily.
- Avoids misleading or risky medical/financial certainty phrasing (unless supplied by client and approved).
- No unlicensed music added by default (client can request platform-native trending audio instructions).

**H) Export settings (baseline)**
- Format: **MP4 (H.264)**
- Resolution: **1080×1920**
- FPS: 30 (or matched to source)
- Audio: AAC, 48kHz (or matched), clean peak headroom
- Filename includes clip number and short title

### 3) Review flow (fast approvals, fewer revisions)
We use a timestamped review method to reduce back-and-forth.

**Step 1 — Review link**
You receive either:
- Frame.io review link (free-tier), **or**
- Vimeo review link, **or**
- Unlisted YouTube link

**Step 2 — Leave timestamp comments**
Please comment like this:
- `00:03 — Change caption “their” to “there”`
- `00:11 — Crop is too tight; zoom out slightly`
- `00:19 — Remove filler word cut; feels abrupt`

**Step 3 — Revision window (24 hours)**
- You have **24 hours** from delivery of the review link to request included revisions.
- After 24 hours, the order is treated as approved and files are finalized/archived (you can still request changes; see revision rules below).

**Step 4 — Final delivery**
Once revisions are applied, you receive the complete Delivery Pack (MP4 + SRT + cue sheets + posting suggestions).

### 4) Revision / Issue triage rules (protects speed + fairness)
We separate **fixes (our responsibility)** from **changes (scope additions)**.

**A) Free revisions (included)**
Included if requested within the 24-hour window and within the original brief:
- Caption typos, timing fixes, readability fixes
- Audio leveling tweaks, minor noise cleanup
- Safe-zone/cropping fixes (faces, text, UI overlap)
- Removing obvious filler/dead air that slipped through
- Minor pacing tweaks that don’t change the selected segment
- Re-export fixes (wrong resolution/FPS, missing file)

**B) Paid changes (scope change)**
These require a new quote because they change the original task:
- Picking entirely new moments/segments after delivery
- New creative direction (different style, new templates, different tone)
- Adding new b-roll style (heavy motion graphics, custom animation, advanced masking)
- Major rewrites of captions to be different messaging vs transcription
- Adding licensed music/assets not provided by client
- Creating additional clips beyond the agreed count

**C) Fast resolution rule (avoid delays)**
If something is objectively wrong (export, cropped face, missing SRT), we fix it immediately and prioritize it.

---

# One-Page Client Onboarding: “What to Expect” (Paste into Notion / PDF)

**Welcome to Clip Factory.** We turn your long video/podcast into short-form vertical clips that are ready to post (hooks, captions, b-roll cues, formatting).

**Proof/site:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3  
**Email:** agent_bob_replit+clip-factory@agentmail.to

## Timeline
1) You send source video(s) + any notes (target audience, offers, taboo topics).
2) We deliver a **review link** with draft clips.
3) You leave **timestamp comments**.
4) We apply included revisions (requested within **24 hours**).
5) You receive the full **Delivery Pack** (MP4 + SRT + b-roll cue sheet + posting suggestions).

## How to review quickly
Comment with timestamps (example): `00:14 — Make caption shorter` or `00:07 — Zoom out; face is cropped.`

## What’s included vs not
**Included:** caption corrections, audio leveling, safe-zone fixes, small pacing tweaks within the same selected moment.  
**Not included (requires quote):** selecting totally new moments, new style direction, additional clips beyond scope, heavy custom graphics.

## What you’ll receive
- Ready-to-post MP4 vertical clips
- SRT captions
- B-roll cue sheet
- Posting suggestions (hook/first line + hashtags)

---

# Internal Editor SOP Addendum (Consistency + QA)

## A) File naming conventions
**Client_Project_Date_Clip##_ShortTitle**
- Example MP4: `AcmeCo_PodcastEp12_2026-04-09_Clip03_StopOverthinking.mp4`
- Example SRT: `AcmeCo_PodcastEp12_2026-04-09_Clip03_StopOverthinking.srt`

## B) Mandatory QC steps before sending review link
1) Watch full clip once **with audio** (no skipping)
2) Watch again **muted** to verify captions fully communicate the moment
3) Check safe zones: no cropped faces, no UI overlap risk
4) Confirm captions: proper nouns, brand/product terms, numbers
5) Audio pass: consistent loudness; no clipping on peaks
6) Export verification: open exported MP4 and scrub for glitches

## C) Review export vs final export
- **Review exports** may be watermarked if needed, but must be the same framing/captions as final.
- **Final exports** must match approved review version (no surprise template changes).

## D) Packaging checklist (Delivery Pack)
- MP4 folder includes all clips, numbered sequentially
- SRT folder has matching filenames to MP4
- Each clip has:
  - B-roll cue sheet row(s) with timestamped prompts
  - Posting suggestion: hook line + first-line caption + hashtags + platform note
- Zip folder or share drive link is tested (permissions correct)

## E) Revision handling rules
- If client comment is a **fix** (caption error, crop issue, export issue), do immediately.
- If client comment is a **scope change**, flag it clearly in the reply: “This is a new segment/style request; we can quote it.”
- Always confirm the 24-hour window and summarize what was changed in the revision pass.
