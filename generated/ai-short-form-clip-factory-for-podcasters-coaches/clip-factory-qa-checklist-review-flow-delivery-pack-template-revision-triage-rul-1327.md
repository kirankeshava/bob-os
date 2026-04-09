# Clip Factory — QA Checklist + Review Flow + Delivery Pack Template + Revision Triage Rules (Client & Internal SOP)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:01:02.935Z

---

Below is the standardized, repeatable Quality Assurance + Review + Delivery system for Clip Factory. Use it for every order to prevent refunds, avoid missed deadlines, and keep client trust high.

BUSINESS ID (use in all client comms)
- Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
- Support email: agent_bob_replit+clip-factory@agentmail.to

1) CLIENT INTAKE (HARD GATE — DO NOT START WITHOUT IT)
Goal: reduce misunderstandings that cause revisions/refunds.
Client must provide (via Intake Form) before any editing begins:
- Platforms: TikTok / Reels / Shorts (choose all that apply)
- Goal: leads / awareness / sales / authority / webinar signups
- Target audience + offer (1-2 sentences)
- Hook style: direct benefit / curiosity / contrarian / story / question
- Caption style: word-for-word / cleaned up / highlight-only
- Brand terms & spelling: names, product names, taglines (must be exact)
- Banned words/topics + compliance constraints
- Examples they like (links)
- Delivery urgency: standard or deadline date/time
Internal rule: If client refuses intake, get written waiver: “Proceeding without intake may increase revision time; captions/terms may be less accurate.”

2) PRODUCTION WORKFLOW (SIMPLE, REPEATABLE)
A) Clip selection
- Create clips around one clear “moment” each. 1 clip = 1 idea.
- Prefer: strong opinion, emotional spike, tactical list, surprising insight, clear transformation, story beat.
B) Hook writing
- First 1–2 seconds must communicate a promise or curiosity gap.
- On-screen hook text must match audio (no clickbait mismatch).
C) Captions + formatting
- Captions must be readable on mobile, high contrast, safe margins.
- Identify speaker(s) correctly; avoid wrong attributions.
D) B-roll cues
- Add only when it increases clarity or retention (not random).
- Note exact timestamp ranges for b-roll overlays.

3) QA CHECKLIST (EDITOR MUST COMPLETE BEFORE SENDING REVIEW)
A) “Safe Zone” / Framing
- No cropped faces: forehead/chin not cut; eyes not at very top edge.
- Subject placed center or rule-of-thirds; not drifting off frame.
- Captions and hook text inside safe margins (avoid bottom UI overlays on TikTok/Reels).
- If source is 16:9, ensure vertical reframing follows speaker movement.

B) Captions Accuracy
- Names, brands, and numbers verified (especially prices, dates, %).
- No missing words that change meaning; remove filler only if agreed.
- Punctuation improves clarity; do not invent claims.
- Profanity policy followed per intake (bleep/remove if requested).

C) Audio QA
- No clipping/peaking; dialogue consistently audible.
- Background music (if used) is low enough not to mask speech.
- No harsh sibilance; no sudden volume jumps between cuts.
- If original audio is bad: reduce noise carefully; do not over-process.

D) Editing / Jump Cuts / Flow
- Cuts feel intentional; no mid-word cuts unless stylistic and clean.
- Remove long pauses, “umm,” dead air, but keep natural rhythm.
- Pattern interrupts (zoom, b-roll, text emphasis) are purposeful.
- Clip length fits platform and point (generally 15–45s unless requested).

E) Hook Clarity + Payoff
- Hook promises a payoff that appears in the clip.
- The first line is understandable without context.
- Ending has a natural stop (or designed loop) and optional CTA.

F) Visual Consistency
- Brand colors/fonts consistent (if provided).
- No distracting artifacts; no accidental overlays.
- If subtitles animate, animation is smooth and not jittery.

G) Export Settings (Minimum Standard)
- Format: MP4 (H.264)
- Resolution: 1080x1920 (9:16)
- Frame rate: match source when possible (typically 30fps)
- Audio: AAC, 48kHz preferred
- File naming matches template (see Delivery Pack)

4) REVIEW FLOW (TIMESTAMPED COMMENTS + 24H REVISION WINDOW)
Goal: fast, clear feedback; avoid endless revision loops.
A) Provide review link using one of:
- Frame.io (preferred if available on free tier)
- Vimeo review link
- Unlisted YouTube link (fallback)
B) Client instructions (must be included with review link):
- “Please leave timestamped comments directly on the video.”
- “Consolidate feedback in one pass per clip if possible.”
- “Revision window: 24 hours from delivery of review link.”
C) What client should review:
- Captions accuracy (names/numbers)
- Hook text and first 2 seconds
- Any brand terms/banned words
- Cropping/framing
- CTA line (if included)

5) FINAL DELIVERY PACK (WHAT CLIENT RECEIVES)
Deliver via Google Drive/Dropbox link (client preference) with this exact structure:

[ClientName]_[ProjectName]_Delivery_
  00_README.txt
  01_FINAL_MP4/
    [Client]_[Project]_Clip01_1080x1920.mp4
    [Client]_[Project]_Clip02_1080x1920.mp4
  02_CAPTIONS_SRT/
    [Client]_[Project]_Clip01.srt
    [Client]_[Project]_Clip02.srt
  03_BROLL_CUE_SHEETS/
    [Client]_[Project]_Broll_Cues.csv
  04_POSTING_SUGGESTIONS/
    [Client]_[Project]_Posting_Suggestions.docx (or .txt)

00_README.txt (copy/paste template)
“Thanks for working with Clip Factory.
Support: agent_bob_replit+clip-factory@agentmail.to
Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

What’s included:
- Final MP4s (ready to post)
- SRT caption files (optional upload/edit inside TikTok/Reels)
- B-roll cue sheet (timestamps + suggested visuals)
- Posting suggestions (caption first line + hashtags + CTA ideas)

Revisions:
- Included revisions must be requested within 24 hours of delivery (unless otherwise agreed).
- Please reply with timestamps and the exact change requested.”

B-roll cue sheet CSV columns
- ClipFilename
- StartTime
- EndTime
- BrollSuggestion
- OnScreenText (if any)
- Notes (brand/compliance)

Posting Suggestions doc template (per clip)
For each clip include:
- Clip name
- Recommended first line caption (1–2 options)
- Suggested CTA (comment/DM/link in bio)
- Hashtags (5–12; niche-specific)
- Best platform fit (TikTok/Reels/Shorts)
- Optional posting note (e.g., “use auto-captions and keep ours off”)

6) ISSUE TRIAGE RULES (FREE REVISION VS PAID CHANGE)
Purpose: protect margins and prevent scope creep while being fair.

A) Always FREE (Clip Factory fault)
- Caption mistakes: misheard words, wrong names, wrong numbers (if provided in intake)
- Cropping errors: face cut off, captions out of safe zone
- Audio problems introduced in editing: clipping, uneven levels caused by processing
- Export wrong: wrong resolution, wrong file, missing SRT, broken link
- Missed explicit intake requirement (platform format, banned word list, brand spelling)

B) FREE within 24 hours (reasonable tweaks)
- Minor hook text rewrite (same idea) if client requests a different phrasing
- Small trimming to remove a pause, tighten intro, remove one sentence
- Caption styling small adjustments (size/position) within the same style direction

C) PAID change (scope change or new creative direction)
- Changing the clip selection (new moments from source) after review is delivered
- New captions style beyond agreed direction (e.g., switching from word-for-word to heavy rewrite across all clips)
- Replacing music style, adding extensive b-roll, heavy motion graphics not included
- New brand package implementation after work started (new fonts/colors/logos)
- Adding more clips than originally agreed

D) “Client caused” rework (paid unless we choose goodwill)
- They provided wrong spelling/terms/numbers in intake
- They changed offer/positioning after delivery

Policy phrasing to use with clients:
“Happy to revise. If the request is a correction to meet the original brief (captions accuracy, safe zone, export, meeting the intake requirements), it’s included. If it’s a new direction or additional work beyond the original brief (new clip moments, new style, extra b-roll/graphics), I can quote a quick add-on price before starting.”

7) INTERNAL QC SIGN-OFF (FINAL GATE BEFORE SENDING ANYTHING)
Editor checks and initials each:
- Intake form received and reviewed
- All clips named correctly and exported 1080x1920 MP4
- Captions checked for names/numbers and safe margins
- Audio levels consistent; no clipping
- Review link tested in incognito; comments enabled
- Delivery pack folders created; SRT + cue sheet included

This SOP should be referenced in every onboarding, review email, and final delivery email to set expectations, reduce refund requests, and speed up approvals.