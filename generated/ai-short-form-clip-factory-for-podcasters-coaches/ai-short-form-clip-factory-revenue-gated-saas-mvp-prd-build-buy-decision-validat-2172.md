# AI Short‑Form Clip Factory — Revenue‑Gated SaaS MVP PRD + Build/Buy Decision + Validation Plan + 2‑Week Build Plan (Do Not Build Until $5k DFY)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T20:02:20.910Z

---

BUSINESS CONTEXT (revenue-gated)
This SaaS MVP is explicitly gated: do not build until the business collects $5,000 in DFY clip-package sales. Until then, only use this document for customer discovery, scoping, and sales enablement.
Legitimacy link for prospects/customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact email: agent_bob_replit+clip-factory@agentmail.to

1) MVP USER STORY (end-to-end)
Primary user: Podcaster/coach/creator who has a long-form episode (YouTube link or uploaded file) and wants consistent vertical clips.
Goal: Generate ready-to-post 9:16 clips with burned-in captions and a strong hook, with minimal editing.

Core flow (MVP):
A. Input
- User pastes a YouTube link OR uploads an MP4/MOV.
- User selects language (default: English).
- User selects output platform preset: TikTok / Reels / Shorts.

B. Transcribe
- System pulls audio, runs transcription, returns: full transcript + word-level timestamps.
- (MVP: single-speaker acceptable; diarization is a paid-tier feature candidate.)

C. Detect highlights
- System proposes 5–20 candidate segments based on rules:
  - Speech energy / keyword triggers / topic boundaries / short story arcs.
  - Segment duration defaults: 20–45s; optional 60–90s.
- UI shows a list of candidates with a title + 1–2 sentence summary + start/end time.

D. Choose template
- User selects a caption style template (2–3 templates for MVP):
  1) Clean: white text + subtle shadow
  2) Bold hook: emphasized first line + highlight words
  3) Podcast: speaker label line (even without diarization)
- User chooses safe area framing (top/bottom) and optional watermark.

E. Export
- System renders 9:16 with:
  - Cropping/reframe to center subject (MVP can be static center crop; smart reframe later)
  - Burned-in captions
  - Optional .SRT download
  - Output formats: MP4 1080x1920; bitrate preset per platform
- User downloads rendered clip(s) and captions.

Non-goals for MVP (explicitly excluded):
- Multi-track timelines, manual editing tools, advanced b-roll library, auto-posting to platforms, complex team workflows.

2) MVP REQUIREMENTS (functional + nonfunctional)
Functional requirements:
- Accept YouTube URL and at least one upload method.
- Transcribe with timestamps.
- Generate candidate highlight segments with start/end.
- Preview segment (basic playback) + allow trimming start/end.
- Render vertical output with captions burned in.
- Export MP4 + SRT.

Nonfunctional requirements:
- Turnaround target: under 15 minutes for a 60-minute episode (best effort).
- Reliability: if highlight detection fails, user can still manually select transcript ranges.
- Simple auth: email magic link or password.
- Logging: store job status (queued/processing/failed/completed) and error messages.

3) FASTEST BUILD PATH (no/low-code) — recommended architecture
Orchestrator/UI: Bubble
- Bubble handles: auth, job creation, status UI, template selection, storage pointers.

Transcription: Whisper API (OpenAI) or equivalent
- Call transcription endpoint; store transcript + word timestamps.

Highlight detection (MVP): simple heuristic + LLM summarization
- Heuristic segmentation options:
  - Chunk transcript into paragraphs based on pauses / punctuation + time thresholds.
  - Score chunks by keyword lists (pain points, results, “how to”, numbers), plus length.
- Optionally use an LLM to generate 10 candidate “best moments” with timestamps (guardrail: must map to real timestamps).

Rendering: FFmpeg (build) OR managed rendering API (buy)
- MVP fastest: managed render API if available on free tier; otherwise FFmpeg in a lightweight worker.
- Rendering steps:
  - Extract segment
  - Crop/scale to 1080x1920
  - Overlay captions (ASS subtitles for styling)
  - Burn watermark

Storage/CDN:
- Use an S3-compatible free tier if possible; otherwise temporary storage with signed URLs.

4) BUILD vs BUY DECISION (speed-first)
A. Transcription
- BUY: Whisper API (fastest, high accuracy, no infra)
- BUILD: self-host Whisper (slower to ship, ops burden)
Decision: BUY for MVP.

B. Highlight detection
- BUY: none truly turnkey; can use LLM prompts + heuristics.
- BUILD: rules + small LLM layer.
Decision: BUILD a simple hybrid: heuristic shortlist + LLM titles/summaries.

C. Rendering
- BUY: Shotstack / Mux-based workflows / other render APIs (faster, less DevOps).
- BUILD: FFmpeg worker (more control, more ops).
Decision: Start with BUY if free tier supports; if not, BUILD FFmpeg worker after revenue gate.

D. Auth/UI
- BUY: Bubble built-ins.
Decision: BUY (Bubble native).

E. Storage
- BUY: S3-compatible.
Decision: BUY (managed storage) when spending is approved; for MVP testing, keep short-lived storage.

5) WHAT CLIENTS WILL PAY $99–$299/MO FOR (hypotheses to validate)
Likely $99/mo (Creator)
- X minutes processed/month
- 30 exports/month
- 3 caption templates
- Brand kit: font/color/logo

Likely $199/mo (Pro)
- Diarization + speaker labels
- Brand voice hooks (auto-generated hook text options)
- Niche templates (podcast, coaching, real estate, fitness)
- Faster processing queue

Likely $299/mo (Team/Agency Lite)
- 3–5 seats
- Client workspaces
- Shared template library
- Usage-based overages

Feature candidates to validate explicitly:
- Diarization (speaker separation)
- Auto hook generation + A/B hook variants
- Smart reframing/face tracking
- B-roll cues (timecoded suggestions, not full auto-insert)
- One-click “clip packs” (e.g., 10 clips per episode)
- Team approvals

6) CUSTOMER VALIDATION PLAN (paying clients only)
Objective: Confirm which features drive willingness-to-pay, not just interest.
Method: 10 interviews with DFY buyers + 5 with non-buyers who match ICP.

Interview questions (20 minutes):
1) “How many long-form episodes do you publish per month?”
2) “How many short clips do you need weekly to feel consistent?”
3) “What’s your current workflow and what does it cost (time/$)?”
4) “What’s the most annoying step today?”
5) “If you could press a button and get 10 ready-to-post clips, what would have to be true for you to trust it?”
6) “Which of these would you pay extra for: diarization, brand-kit templates, hook variants, smart reframe, b-roll cues, team seats?”
7) “At $99/mo, would you use it monthly? What would block you?”
8) “At $199/mo, what must be included to feel obvious?”
9) “At $299/mo, what would make it a ‘no-brainer’ for a small team?”
10) “If we could only build one feature first beyond export + captions, what should it be and why?”

Scoring rubric after each call (1–5 scale each):
- Revenue impact (does it change willingness-to-pay?)
- Frequency (how often they need it)
- Differentiation (is it unique vs editors/tools?)
- Complexity (implementation difficulty)
Pick top 3 features by (impact + frequency + differentiation) minus complexity.

7) 2-WEEK BUILD PLAN (GATED) + ACCEPTANCE CRITERIA
Gate condition (must be true before Day 1): $5,000 collected in DFY sales.

Week 1 — Core pipeline working end-to-end (thin slice)
Day 1: Bubble app skeleton
- Auth, dashboard, “new job” form (YouTube URL/upload), job status table.
Acceptance: user can create a job and see it listed with status.

Day 2–3: Transcription integration
- Call Whisper API; store transcript + timestamps.
Acceptance: transcript view loads for a job; timestamps present.

Day 4–5: Highlight candidates v1
- Generate 10 candidate segments with start/end; show list + preview.
Acceptance: candidates appear with playable previews; user can trim start/end.

Week 2 — Templates + rendering + exports
Day 6–8: Template system
- 2–3 caption templates; generate styled subtitles.
Acceptance: user can switch templates and see caption styling in preview mock (or metadata).

Day 9–11: Rendering integration
- Render 9:16 MP4 for chosen segment with burned-in captions.
Acceptance: exported MP4 downloads; meets 1080x1920; captions readable.

Day 12–13: Exports + SRT
- Provide MP4 + SRT downloads; store rendered file link.
Acceptance: both assets downloadable; SRT timestamps match clip.

Day 14: QA + failure handling
- Retry on failure; clear error messages.
Acceptance: failed jobs show reason + retry; successful jobs persist.

Definition of Done (MVP):
- A user can paste a YouTube link or upload a file, receive highlights, select a template, and export a vertical clip with captions + SRT—without manual editing outside the app.

IMPORTANT: This document is a scope/plan only. Building is prohibited until the $5k DFY gate is met. Until then, the team should focus on DFY distribution and use validation calls to tighten these requirements and confirm the $99–$299/mo value drivers.