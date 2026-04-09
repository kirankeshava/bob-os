# Clip Factory — QA + Review/Delivery System (Client-Facing) + Delivery Pack Template + Revision Triage + Intake Form Spec + Email Templates

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:56:09.856Z

---

# Clip Factory — What to Expect (QA • Review • Delivery • Revisions)

**Business website (legitimacy link):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3  
**Contact:** agent_bob_replit+clip-factory@agentmail.to

## 1) What we deliver (Delivery Pack)
For each order, you receive a **Delivery Pack** containing:
1. **Final vertical MP4 clips** (ready-to-post)
2. **Caption file(s)**: `.srt` per clip (plus burned-in captions on the MP4)
3. **B-Roll / On-screen cue sheet** (simple table: timestamp → suggestion)
4. **Posting suggestions** per clip:
   - “First line” caption (hook line to use as the post caption)
   - Hashtag set (platform-appropriate)
   - Suggested title (optional)
   - CTA suggestion (optional)

### Delivery folder structure (template)
```
/CLIENTNAME_Order-####_YYYY-MM-DD/
  /01_REVIEW_LINKS/
    ReviewLinks.txt
  /02_FINAL_MP4/
    CLIENTNAME_Clip01_HookKeywords_1080x1920.mp4
    CLIENTNAME_Clip02_HookKeywords_1080x1920.mp4
  /03_CAPTIONS_SRT/
    CLIENTNAME_Clip01.srt
    CLIENTNAME_Clip02.srt
  /04_BROLL_CUE_SHEETS/
    CLIENTNAME_BrollCueSheet.csv
  /05_POSTING_SUGGESTIONS/
    CLIENTNAME_PostingSuggestions.docx (or .txt)
```

## 2) Our QA standards (what we check before you ever see a draft)
We run QC against the following to minimize back-and-forth and protect your brand.

### A) Safe zones + framing
- No cropped faces (forehead/chin not cut off unless intentional comedic zoom).
- Subject’s eyes remain in a comfortable upper-third zone.
- On-screen captions stay within **platform-safe zones**:
  - Keep captions away from bottom UI overlays (TikTok/Reels buttons).
  - Avoid placing key text near extreme edges.
- Avoid awkward headroom; maintain consistent framing across jump cuts.

### B) Hook clarity + pacing
- First 1–2 seconds must clearly communicate a hook (question, bold claim, tension, surprising outcome).
- Clip starts as close to the point as possible (trim dead air).
- Jump cuts remove filler words, long pauses, and repeated phrases.
- Maintain logical continuity: no “missing steps” that confuse the viewer.

### C) Captions: accuracy + readability
- Captions match spoken words closely (no meaning changes).
- Correct names/brands/terms when provided by client.
- Line breaks are readable (no single-word orphan lines unless needed).
- Avoid blocking faces with captions.
- Profanity policy matches client preference (bleep/mask/replace if requested).

### D) Audio leveling + clarity
- Dialogue is clearly audible over music.
- Loudness is consistent across clips (no sudden spikes).
- Remove/limit distracting breaths, plosives, or background noise where possible.
- If source audio is unusable, we flag it before final export.

### E) Visual consistency
- Color/contrast looks natural (no crushed blacks / blown highlights).
- Brand styling consistent across clips in the order (caption font, size, color).
- B-roll cues enhance context (not random).

### F) Export settings (platform-ready)
- Format: **MP4 (H.264)**
- Aspect ratio: **9:16**
- Resolution: **1080×1920**
- Frame rate: match source when possible (typically 30fps)
- Bitrate: high enough to avoid macro-blocking text and faces
- Audio: AAC, clean stereo/mono

## 3) Review flow (timestamped comments)
We use a review link that supports timestamp comments (choose one):
- **Frame.io** (preferred if available)
- **Vimeo review link**
- **Unlisted YouTube link** (fallback)

### How to leave feedback (required format)
Please leave comments as **timestamped notes** in the review link.
- Good: “00:12 — replace caption ‘their’ → ‘there’”
- Good: “00:21 — crop is tight; give more headroom”
- Good: “00:33 — remove ‘um’ and tighten pause”

### Revision window (important)
- You have **24 hours** after delivery of the review link to request included revisions.
- If we don’t hear back within 24 hours, we assume the delivery is accepted so we can keep timelines predictable.

## 4) Revision & issue triage rules (protects scope and prevents misunderstandings)
We want you happy, but we also need clear boundaries.

### A) Free revisions (included)
These are included if requested within the 24-hour window:
- Caption typos / mis-hears / punctuation fixes
- Minor timing adjustments (caption sync, small trim)
- Small audio leveling tweaks
- Minor crop/safe-zone fixes (prevent face cropping, reposition captions)
- Swap the selected hook line **within the same chosen segment** (micro-adjustments)

### B) Not free (scope change / new request)
These typically require a new order or a paid change later (week 2+), because they materially change the work:
- “Choose totally different moments” or “make 10 new clips from scratch”
- Re-editing the entire narrative of a clip (new storyline)
- New branding package after delivery (new fonts/colors/layout)
- Adding new assets not provided initially (logos, overlays, custom animations)
- Multiple rounds beyond the included revision pass

### C) Source problems (not a revision)
If the source file has issues (corruption, extreme noise, missing audio), we’ll flag it immediately. We’ll propose the best workaround, but we can’t guarantee perfection if the source is unusable.

## 5) What we need from you (Intake)
To start fast and avoid preventable revisions, please complete the intake form:
**Client intake form (placeholder):** [INSERT GOOGLE FORM LINK]

If you prefer email, send:
- Platforms: TikTok / Reels / Shorts
- Tone: clean / bold / educational / comedic
- Your @handles and link-in-bio URL
- Words to avoid / compliance constraints
- Preferred CTA

---

# Internal: QC Handoff Checklist (Editor/Operator)
Use before sending any review link.

1. **File naming** matches template (Client_Clip##_*_1080x1920.mp4)
2. **No cropped faces** at any point; captions not covering mouth/eyes.
3. **Captions**: 2x spot-check for accuracy; check proper nouns.
4. **Audio**: listen on speakers + earbuds; check loudness consistency.
5. **Hook**: first 2 seconds punchy; remove dead air.
6. **Export**: H.264 MP4, 1080×1920, clean AAC audio.
7. **Delivery pack** complete: MP4 + SRT + cue sheet + posting suggestions.
8. **Review link** opens without permissions issues; comment permissions enabled.
9. **Email** includes 24-hour revision window and timestamp instructions.

---

# Google Form — Client Intake (Build Spec)
**Form title:** Clip Factory — Client Intake (Short-Form Clips)

## Section 1: Basics
1) *Email (required)*
- Short answer

2) *Brand/Channel name (required)*
- Short answer

3) *Primary platform(s) (required)*
- Checkbox: TikTok / Instagram Reels / YouTube Shorts / Other

4) *Goal for these clips (required)*
- Multiple choice: Grow following / Drive leads / Sell offer / Podcast listens / Other

## Section 2: Style & Branding
5) *Caption style preference (required)*
- Multiple choice: Clean minimal / Bold high-contrast / Word-by-word emphasis / No preference

6) *Tone (required)*
- Checkbox: Educational / High-energy / Calm authority / Funny / Direct / Other

7) *Do you want profanity? (required)*
- Multiple choice: Keep as-is / Bleep / Remove/replace / No profanity in captions

8) *Banned words/topics (optional)*
- Paragraph

9) *Brand colors / font notes (optional)*
- Paragraph

## Section 3: CTA & Posting
10) *Preferred CTA (required)*
- Multiple choice: Follow / Comment / DM keyword / Visit link in bio / Subscribe / Other

11) *Your handle(s) to display (optional)*
- Short answer

12) *Link to drive traffic to (optional)*
- Short answer

## Section 4: Content Constraints
13) *Compliance constraints (optional)*
- Checkbox: Medical claims / Financial claims / Client confidentiality / “No guarantees” language / Other

14) *Any examples you like? (optional)*
- Short answer (links)

## Section 5: Source Material
15) *Link to source video/audio (required)*
- Short answer (Drive/Dropbox/YouTube link)

16) *Notes on best moments/time ranges (optional)*
- Paragraph

### Pre-flight mapping (internal)
- Platform(s) → export + safe zones
- Caption style + tone → template choice
- Profanity/banned words → caption pass rules
- CTA + link/handle → posting suggestions block
- Compliance constraints → avoid risky cuts/claims

---

# Email Templates (Ready to Send — insert links)

## 1) Intake / Onboarding email
**Subject:** Clip Factory — Quick intake to start your clips

Hi {{FirstName}},

Thanks for working with Clip Factory. To start editing fast and avoid preventable revisions, please complete our intake form:
**Intake form:** [INSERT GOOGLE FORM LINK]

What to expect (QA standards, review flow, delivery pack, revisions):
**Guide:** [INSERT NOTION LINK]

If you have any constraints (banned words, compliance, CTA, handle), include them in the form.

Business link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob
agent_bob_replit+clip-factory@agentmail.to

## 2) Pre-flight confirmation (before editing)
**Subject:** Clip Factory — Pre-flight check (please confirm)

Hi {{FirstName}},

Quick pre-flight before we cut clips:
- Platforms: {{Platforms}}
- Caption style: {{CaptionStyle}}
- Tone: {{Tone}}
- CTA: {{CTA}}
- Constraints/banned words: {{Constraints}}

If anything above is off, reply with corrections today so we don’t bake the wrong assumptions into every clip.

Guide: [INSERT NOTION LINK]

— Bob
agent_bob_replit+clip-factory@agentmail.to

## 3) Delivery email (review link + revision window)
**Subject:** Your Clip Factory clips are ready — review link inside (24h revisions)

Hi {{FirstName}},

Your clips are ready. Review here (timestamp comments preferred):
**Review link:** {{ReviewLink}}

Delivery pack includes:
- Final MP4s (9:16, 1080×1920)
- SRT caption files
- B-roll cue sheet
- Posting suggestions (first line caption + hashtags)

**Revision window:** Please send any included revision requests within **24 hours** of this email using timestamp comments (example: “00:12 — fix caption typo”).

What to expect / standards: [INSERT NOTION LINK]

— Bob
agent_bob_replit+clip-factory@agentmail.to

## 4) Revision received (ack)
**Subject:** Got your revision notes — we’re on it

Hi {{FirstName}},

Got your revision notes—thank you. We’ll apply the updates based on your timestamp comments and send an updated review/delivery link.

Reminder: included revisions are handled within the 24-hour window after delivery; if any request turns into a scope change (new clip selections, new branding package, extra rounds), we’ll flag it clearly before proceeding.

— Bob
agent_bob_replit+clip-factory@agentmail.to

## 5) Revision completed
**Subject:** Revisions complete — updated clips attached/linked

Hi {{FirstName}},

Revisions are complete. Updated assets:
- Updated review/delivery link: {{UpdatedLink}}

If anything looks off, reply with timestamp notes ASAP (within the remaining revision window) so we can close this out cleanly.

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

# Operator note: Free review tool options (zero spend)
- **YouTube unlisted**: fastest fallback; enable comments; ask for timestamp notes.
- **Vimeo**: use review link if free tier allows.
- **Frame.io**: best UX for timestamped feedback (free tier where possible).
- **Google Drive**: host MP4/SRT/cue sheets; ensure share permissions = “Anyone with the link can view.”
