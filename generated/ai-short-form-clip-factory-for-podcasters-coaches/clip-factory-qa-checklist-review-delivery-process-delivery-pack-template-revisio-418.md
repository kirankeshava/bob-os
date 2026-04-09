# Clip Factory — QA Checklist + Review/Delivery Process + Delivery Pack Template + Revision Triage Rules

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:14:08.613Z

---

Below is the standardized system for producing, reviewing, and delivering short-form vertical clips for podcasters/coaches. It is designed to minimize refunds, avoid public mistakes, and keep turnaround predictable.

1) QA CHECKLIST (RUN ON EVERY CLIP)

A. Safe Zones + Cropping (Vertical 9:16)
- Canvas: 1080x1920 (9:16). No letterboxing.
- Subject framing: face/eyes in upper-middle area; do not crop chin, forehead, or sides of face.
- Ensure on-screen captions and any lower-thirds remain inside “safe zones” (avoid extreme bottom where UI overlays appear).
- Platform UI checks:
  - TikTok: avoid bottom ~15% (caption/buttons) and right side where icons sit.
  - Reels: avoid bottom ~20% and top where username overlay may appear.
  - Shorts: avoid bottom area where title/CTA overlays appear.
- If screen-share/Zoom is used: crop to emphasize speaker; avoid tiny face box. Prefer punch-in (110–140%) rather than full wide shot.

B. Hook Clarity (First 1–2 seconds)
- First frame should communicate topic instantly (visual + caption).
- Add a hook line (captioned) that is short and curiosity-driven; remove filler.
- No slow fade-ins; start on action/strong statement.
- If needed, reorder: pull the strongest sentence to the front, then backfill context.

C. Jump Cuts + Pacing
- Remove long pauses, repeated words, “um/uh” when distracting.
- Keep cuts tight but natural; avoid cutting mid-word.
- Pattern interrupts every 2–5 seconds when possible (punch-in, b-roll, text emphasis).
- Avoid excessive shake/zoom spam; ensure style fits client brand.

D. Captions Accuracy (Non-Negotiable)
- Target accuracy: 99%+ (names, brand terms, numbers).
- Spot-check at least: first 10 seconds, any stats/claims, any CTA, any proper nouns.
- Ensure captions match the exact spoken words (unless client explicitly requests “cleaned” captions).
- Line breaks: 1–2 lines max; do not cover mouth/face.
- Timing: captions should appear synced; avoid late captions.
- Profanity handling: follow client preference (bleep, asterisks, or verbatim).

E. Audio Leveling + Cleanup
- Loudness target: around -14 LUFS integrated for social (acceptable range -16 to -14 depending on client).
- Peaks: keep below -1 dBTP to avoid clipping on mobile.
- Consistent volume across cuts; no sudden jumps.
- Remove/attenuate hums, harsh sibilance, plosives when possible.
- If music bed is used: keep it subtle and duck under voice; ensure it’s license-safe.

F. Visual Quality
- No blurry upscales beyond reason; avoid heavy artifacts.
- Color: consistent, no blown highlights, no extreme saturation unless brand style.
- Stabilization only if needed; don’t warp faces.

G. B-Roll + On-Screen Text
- B-roll must match the sentence it supports; avoid misleading visuals.
- Avoid copyrighted logos/footage unless clearly fair-use approved by client.
- Text: spellcheck. Keep font consistent. Ensure readability on mobile.

H. Compliance / Risk Checks
- No medical/financial claims that could be misleading without context.
- If clip includes “before/after” or sensitive topics, ensure captions don’t overpromise.
- If client provided restricted words/claims list, confirm compliance.

I. Export Settings (Delivery-Ready)
- Format: MP4 (H.264) unless client requests otherwise.
- Resolution: 1080x1920.
- Frame rate: match source where possible (typically 30fps). Avoid mixed FPS.
- Bitrate: 8–16 Mbps (enough for crisp text).
- Audio: AAC 48kHz, 320kbps (or 192kbps acceptable).
- Filename includes: ClientName_EpisodeOrSource_Clip##_(HookKeyword)_v1.mp4

2) REVIEW FLOW (CLIENT-FRIENDLY, TIMESTAMPED)

Goal: fast approvals with minimal confusion.

A. Tools (Free-first options)
- Preferred: Frame.io (free tier if available) for timestamp comments.
- Alternative: Vimeo (unlisted review link) with comments.
- Fallback: Unlisted YouTube links with timestamp notes in email.

B. Standard Review Steps
1) Internal QC: editor completes QA checklist above.
2) Upload “Review Draft v1” to review platform.
3) Send client a single review link + clear instructions:
   - “Please leave timestamped comments on the video (e.g., 00:12 change caption wording).”
   - “Consolidate feedback into one round if possible.”
4) Revision window: 24 hours from delivery of review link.
5) Turnaround for revisions: 24–48 hours depending on volume (state per order).
6) If no response within 24 hours: default to “approved” and deliver finals, or extend once (choose policy per client; recommended: send 1 reminder then proceed to final if silence).

C. Client Message Snippet (paste into email)
“Your review links are ready. Please add feedback as timestamped comments directly on the video. We include 1 revision round within 24 hours of receiving this link. If we don’t hear back within 24 hours, we’ll assume approval and send final exports to keep the schedule on track.
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to”

3) DELIVERY PACK (WHAT THE CLIENT RECEIVES)

A. Folder Structure (per order)
/CLIENTNAME_Project_Date/
  /01_Final_MP4/
  /02_Captions_SRT/
  /03_BRoll_Cue_Sheets/
  /04_Posting_Suggestions/
  /05_Review_Links_(optional)/

B. File Deliverables
1) Final MP4s
- Naming: Client_Ep###_Clip01_HookKeyword_FINAL.mp4
- Include multiple aspect variants only if sold (e.g., 1:1 feed, 16:9 shorts).

2) Caption Files (SRT)
- One SRT per clip.
- Naming: Client_Ep###_Clip01_FINAL.srt

3) B-Roll Cue Sheet (per clip; text or CSV)
Include:
- Clip filename
- Timestamp ranges
- What to show (b-roll idea)
- Source (stock / client-provided / screen recording)
- Notes (e.g., “blur logo”, “use generic chart animation”)

Example format:
Clip: Client_Ep12_Clip01_FINAL.mp4
- 00:00–00:02: On-screen text hook only, punch-in 120%
- 00:03–00:06: B-roll: “calendar / scheduling” (stock), quick cuts
- 00:07–00:10: Overlay: 3-bullet list; keep face visible

4) Posting Suggestions (per clip)
Provide a short doc for each platform:
- Suggested first-line caption (1–2 lines)
- 5–12 hashtags (niche + broad mix)
- CTA suggestion (comment prompt)
- Best posting notes (optional): “Use ‘new post’ sticker on IG story”, “Pin comment: …”

Template:
Clip: Client_Ep12_Clip01_FINAL.mp4
TikTok:
- Caption: “Stop doing this if you want more sales calls…”
- Hashtags: #coaching #podcastclips #leadgen #businessgrowth #salescalls #creator
- CTA: “Comment ‘SCRIPT’ and I’ll share the opener.”
IG Reels:
- Caption: “Most coaches waste their first 10 seconds. Here’s the fix.”
- Hashtags: #coach #reelscontent #marketingtips #contentstrategy #personalbrand
YouTube Shorts:
- Title (optional): “Your hook is killing your reach (do this instead)”

4) ISSUE TRIAGE RULES (FREE REVISION VS PAID CHANGE)

A. Free Revisions (always included; do not argue)
These are quality defects or missed requirements:
- Captions inaccurate (misspellings, wrong words, wrong timing beyond minor).
- Cropped face / unsafe-zone text / unreadable captions.
- Audio issues: clipping, major loudness mismatch, distracting noise introduced in edit.
- Export wrong (wrong resolution, wrong aspect ratio, corrupted file).
- Missed instructions from the original brief (wrong style, wrong clip length, missing requested CTA).
- Broken links / missing files in Delivery Pack.

B. Included Round Policy (recommended)
- Include: 1 consolidated revision round per batch (or per clip pack), requested within 24 hours.
- Minor typo fixes after the window: discretionary (goodwill) but not guaranteed.

C. Paid Changes (scope change; quote before work)
These are new requests beyond the agreed brief:
- New clip selection (finding additional moments) after clips were approved.
- New format set (e.g., “Also make 1:1 and 16:9 versions” if not included).
- Rewriting hooks/captions for a different audience angle after approval.
- Adding new b-roll style packages, motion graphics, brand redesign.
- Re-editing due to client changing their mind on tone (“make it more aggressive/softer”) after approval.
- Rush delivery requests earlier than agreed timeline.

D. Borderline Cases (use a rule)
- If it’s clearly our mistake: free.
- If it’s a preference change (“I don’t like this hook anymore”): paid.
- If client provides new brand guidelines after we started: offer 1 courtesy adjustment, then paid.

E. Refund Protection Language (internal guideline)
- If a clip fails because of a defect we caused: fix immediately, prioritize, and offer an extra clip (low cost, high goodwill).
- If client is unresponsive beyond the review window: document reminders; deliver finals; changes after that are paid.

This system can be pasted into onboarding emails and used as an internal QC SOP. For client communication, always include:
- Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Contact: agent_bob_replit+clip-factory@agentmail.to
