# DFY Clip Factory — Delivery & Review Templates + 48h Schedule + Failure-Mode Playbook

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:01:25.069Z

---

# 1) Client Delivery Email Template (10 Clips / 48 Hours)

**Subject:** Your 10 short-form clips are ready (Review + downloads)

Hi {{FirstName}},

Your **Clip Factory** delivery for **{{ShowName}} — {{EpisodeTitle}}** is ready.

**What you’re getting (10 clips):**
- Vertical 9:16 exports optimized for **{{Platforms}}**
- Burned-in captions (brand style applied)
- Hook-first structure + pattern interrupts
- Optional b-roll cues included (if requested)

**Review link (preferred):**
{{FrameOrDriveReviewLink}}

**Download folder:**
{{DownloadFolderLink}}

**Clip list:**
{{PasteClipListWithFilenames}}

## How to review (fastest)
1) Open the review link and play each clip.
2) Leave comments **timestamped** (e.g., “0:04 change caption wording”).
3) Approve clips that are good as-is.

## Revision policy (reminder)
- Includes **1 revision round** covering **text/caption tweaks, trimming, or swaps from the same source episode**.
- Requests that change the **visual style**, require **new sourcing**, or add **net-new clips** are treated as add-ons.

If anything is urgent, reply here or email us at **agent_bob_replit+clip-factory@agentmail.to**.

Legitimacy / business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

— Bob (Clip Factory)

---

# 2) Frame.io / Drive Invite + Review Instructions (Template)

**Subject:** Clip review access — {{ShowName}} / {{EpisodeTitle}}

Hi {{FirstName}},

I’ve invited you to review your clips here:
**{{FrameOrDriveReviewLink}}**

## Leave feedback like this (so we can revise quickly)
- Use **timestamped notes**: “0:07 replace ‘clients’ with ‘buyers’”
- If you want a different moment from the episode, specify:
  - **Start/stop timestamp** in the long-form
  - Desired angle (e.g., “more contrarian hook” / “more tactical steps”)
- If you approve a clip, comment: **APPROVED**

## What not to do (slows delivery)
- Vague notes like “make it pop” (tell us what to change: hook, captions, pacing, b-roll)
- New brand/style changes after delivery (that becomes a new scope)

Questions: agent_bob_replit+clip-factory@agentmail.to
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

— Bob

---

# 3) Internal 48-Hour Production Schedule (Timeboxed)

**Goal:** 10 clips delivered within 48 hours of receiving usable source + brand assets.

## Day 0 (Intake + Setup) — 0 to 3 hours from asset receipt
**Owner: PM/Producer**
1. Verify assets: source file/link works, audio OK, episode title, platforms, style preset.
2. Create folder structure (Client/Episode) and tracking row.
3. Start transcription (OpusClip/Whisper). If diarization needed, enable.
4. If brand assets missing, request immediately (logo/colors/fonts) while work continues.

## Day 1 (Selection + Assembly) — Hours 3 to 24
**Owner: Editor/AI Operator**
1. Generate highlights (OpusClip) and shortlist **20 candidates**.
2. Apply highlight rules:
   - Hook in **first 1.5s**
   - Pattern interrupt every **2–3s** (zoom/cut/b-roll/title beat)
   - One clear takeaway per clip; no multi-topic rambles
3. Pick top **12**; build timeline versions.
4. Apply style preset (Real Estate/Fitness/B2B) and caption template.
5. Add b-roll cues (lightweight) where it clarifies context or boosts retention.

## Day 2 (QA + Export + Delivery) — Hours 24 to 48
**Owner: QA + Producer**
1. Run QA checklist on all clips (see below).
2. Export presets per platform (TikTok/Reels/Shorts).
3. Upload to Frame.io/Drive and send delivery email.
4. If revision round requested, schedule within **24 hours** of receiving timestamped feedback.

---

# 4) Failure-Mode Playbook (Keep SLA Intact)

## A) Tool outage (OpusClip/Descript/CapCut)
**Symptoms:** Upload fails, processing stuck, exports bugging.
**Fallback:**
- Transcribe with **Whisper** (local/hosted) and manually select highlights using transcript search (keywords, high-energy segments).
- Edit in **CapCut Desktop** (or Descript if CapCut fails).
- Captions: use CapCut Auto Captions; apply saved caption style preset.
**SLA protection:** Prioritize delivery of 10 “clean” clips over advanced b-roll; add b-roll cues only where critical.

## B) Bad audio / heavy noise
**Fallback:**
- Run quick noise reduction (CapCut/Descript).
- If still poor: switch to clips with clearer audio; avoid whispered/overlapped segments.
- Use larger captions and tighter cuts to maintain watchability.
**Client comms:** Flag within 2 hours; confirm acceptable segments.

## C) Missing brand assets (logo/colors/fonts)
**Fallback:**
- Use a neutral default style (high-contrast captions, no logo) to avoid delays.
- Apply brand pack retroactively during revision round if client sends assets late.
**Client comms:** Email immediately requesting brand kit; proceed with neutral preset.

## D) Upload/download too large or slow
**Fallback:**
- Ask for an alternate source (YouTube private link, Drive link).
- Create proxy transcode (1080p, optimized) for editing.
**SLA protection:** Start transcript from proxy; swap to final export from original if needed.

## E) Client feedback is vague or late
**Fallback:**
- Require timestamped notes. If not provided, offer 2 choices: “Approve as-is” or “Send timestamps by {{deadline}} for revision by {{date}}.”
**SLA protection:** Revision clock starts when clear feedback arrives.

---

# 5) Internal QA Mini-Checklist (for speed)
- [ ] 9:16 framing; safe margins for UI
- [ ] Hook lands in first 1.5s (no dead air)
- [ ] Captions: accurate, no weird punctuation, no line overflow
- [ ] Pattern interrupts every 2–3s (cuts/zoom/b-roll/title beat)
- [ ] No banned claims / sensitive statements (as per client compliance)
- [ ] Audio level consistent; no clipping
- [ ] End card CTA present (if requested)
- [ ] Filename matches naming convention

These templates are ready to paste into Gmail/Frame.io/Drive notes and run immediately for the 10-clips/48-hour promise.