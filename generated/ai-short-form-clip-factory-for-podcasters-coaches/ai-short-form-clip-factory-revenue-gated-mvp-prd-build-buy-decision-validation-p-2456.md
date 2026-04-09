# AI Short-Form Clip Factory — Revenue-Gated MVP PRD + Build/Buy Decision + Validation Plan + 2-Week Sprint (DO NOT BUILD UNTIL $5K DFY)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T21:29:52.725Z

---

AI Short-Form Clip Factory — SaaS MVP PRD (Revenue-Gated)
Owner: Bob (agent_bob_replit@agentmail.to)
Legitimacy URL to share with customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Customer contact email: agent_bob_replit+clip-factory@agentmail.to

0) Revenue Gate (Non‑negotiable)
This MVP is NOT to be built until $5,000 in DFY clip-package revenue is collected. Until then, use the “Validation & Interview Plan” below to learn what features drive $99–$299/mo subscription willingness-to-pay.

1) MVP Goal + Target User
Goal: Convert a single long-form video/podcast into ready-to-post vertical clips with captions and a simple template system, fast enough that creators don’t need an editor.
Target users: Podcasters, coaches, and small brands producing 30–120 minute episodes who want consistent TikTok/Reels/Shorts output.
MVP Promise: “Paste a link → get 3–10 highlight clips in 9:16 with captions in under X minutes.”

2) Core MVP User Story (Happy Path)
As a creator, I want to paste a YouTube link (or upload a file), automatically get highlight suggestions, choose a template, and export vertical clips with captions.

User flow:
A. Ingest
- User logs in.
- User pastes a YouTube link OR uploads MP4/MOV.
- System verifies length/format and queues a job.

B. Transcribe
- System extracts audio.
- System transcribes to timed words (SRT/VTT + word timestamps).

C. Detect highlights
- System proposes candidate segments (e.g., 20–60s) with a score + short title/hook suggestion.
- User previews segments and adjusts start/end.

D. Choose template
- User selects 1 of 3–5 templates:
  1) Center crop + captions bottom
  2) Speaker + blurred background
  3) Split screen (optional)
- User chooses caption style (font size, safe area, highlights).

E. Export
- System renders 9:16 MP4 with burned-in captions.
- Deliverables:
  - MP4 file(s)
  - SRT file(s)
  - A simple “post copy” text block per clip (hook + CTA) exported as CSV or plain text.

Non-goals for MVP (explicitly excluded until validated):
- Team collaboration, agency workspaces
- Auto b-roll insertion
- Full brand kit management
- Advanced motion graphics

3) Functional Requirements (MVP)
Ingest
- Support YouTube public links.
- Support upload up to a defined limit (set by chosen storage); if limited on free tier, start with link-only.

Transcription
- Output: SRT + word-level timestamps (or close equivalent).
- Language: English first.

Highlights
- Provide at least 5 suggested segments for a 30–90 minute video.
- Allow manual trimming and deletion.

Templates
- Minimum 3 templates.
- Captions burned-in (hard subtitles) + separate SRT export.

Export
- 1080x1920 (9:16).
- Presets for TikTok/Reels/Shorts (mostly metadata + safe zones).

4) Non-Functional Requirements
- Time to first results: target < 15 minutes per 60-minute video (depends on rendering path).
- Reliability: jobs must recover on retry; user notified on failure.
- Privacy: user content not publicly accessible; signed URLs for downloads.

5) Fastest Build Path (Low-code + APIs)
Orchestrator/UI: Bubble
- Bubble handles auth, UI, basic database, job state.
Compute pipeline:
- A lightweight API endpoint (could be serverless) to run:
  - audio extraction
  - Whisper transcription
  - highlight segmentation logic
  - render via FFmpeg or a managed rendering API

Rendering options:
- Build: FFmpeg in a container (more control, more ops).
- Buy: Shotstack (or similar) to render templates without maintaining a render server.

6) Build vs Buy Decision Memo (Default Recommendation)
Transcription:
- Buy Whisper API (fastest, simplest). Alternative: Deepgram/AssemblyAI (speaker diarization advantage).
Recommendation: Start with Whisper API unless diarization is proven to be a paid driver.

Highlight detection:
- Build a simple heuristic first (speed): combine transcript chunking + keyword density + sentiment/spikes + “question/answer” patterns.
- Upgrade later to LLM-based summarization/scoring if users pay for better hit rate.
Recommendation: Hybrid heuristic + LLM titles (cheap) once validated.

Rendering:
- Buy (Shotstack) is fastest to ship and easiest to template.
- Build (FFmpeg) is cheaper at scale but slower to implement.
Recommendation: If MVP must be shipped in 2 weeks, prefer managed rendering unless cost becomes the bottleneck after product-market pull.

Storage:
- Buy: Cloudflare R2 or S3-compatible storage for video assets.
- Keep downloads behind signed URLs.
Recommendation: S3-compatible storage; start link-only to reduce storage needs if required.

Auth:
- Bubble built-in auth is fine for MVP.

7) Validation: What People Will Pay $99–$299/mo For (Hypotheses)
$99/mo (“Solo Creator”)
- X videos/month processed
- basic highlights + 3 templates
- caption styles

$199/mo (“Pro”)
- more processing volume
- brand kit (fonts/colors), saved templates
- hook suggestions tailored to niche

$299/mo (“Teams/Agency Lite”)
- multi-brand workspaces
- speaker diarization + per-speaker styling
- bulk processing + faster queue

Features to validate as paid drivers:
- Speaker diarization (separate captions per speaker)
- “Brand voice hook rewriting” (niche hooks + CTAs)
- Niche-specific templates (real estate, fitness, biz coaching)
- Clip performance predictions / scoring
- Auto b-roll cues (not insertion) that editors can follow

Interview questions (use on calls while selling DFY first):
- “How many long videos do you publish per month?”
- “How many clips do you need weekly to feel consistent?”
- “What’s the most painful part: finding moments, captions, formatting, or posting?”
- “Would you pay $99/mo if it reliably produced 10 usable clips per episode? What would have to be true?”
- “Which would you pay extra for: diarization, brand templates, hook rewriting, b-roll cues?”
- “What would make you cancel after month one?”

8) Gated 2-Week Build Plan (Start ONLY after $5K DFY is collected)
Sprint goal: A working MVP where a user can paste a YouTube link, get highlight candidates, select a template, and export at least one 9:16 clip with burned captions.

Week 1 (Days 1–7)
- Day 1: Finalize scope and pick rendering path (FFmpeg vs Shotstack) based on interview signals.
Acceptance: architecture decision locked; job state model defined.
- Days 2–3: Bubble app skeleton (auth, dashboard, job submission, job list).
Acceptance: user can submit link and see “processing” state.
- Days 4–5: Transcription pipeline integrated.
Acceptance: for a test link, system produces SRT/VTT and stores it; user can download transcript.
- Days 6–7: Highlight candidate generation v1.
Acceptance: system returns at least 5 segments with timestamps; user can preview transcript snippets and adjust start/end.

Week 2 (Days 8–14)
- Days 8–10: Template system v1.
Acceptance: at least 3 selectable templates with consistent caption placement and safe-zone awareness.
- Days 11–12: Rendering/export.
Acceptance: user exports an MP4 9:16 with burned captions; download link works.
- Day 13: Platform presets + basic post copy export.
Acceptance: per clip export includes MP4 + SRT + a text hook/CTA block.
- Day 14: QA, failure handling, timeouts, retry.
Acceptance: 90%+ success on 10 test jobs; clear error messages and retry path.

Definition of Done (MVP)
- Link ingest works for YouTube.
- Transcript generated with timestamps.
- 5+ highlight segments suggested; user can trim.
- 3 templates available.
- Export produces 1080x1920 MP4 + SRT.
- Basic logging + job status visible to user.

9) How This PRD Supports Immediate Revenue (Now)
Until the $5k gate is hit, use this PRD as credibility on DFY sales calls: “We’re building a self-serve version after we prove demand. For now we can do it DFY free/fast and learn your preferences.” Always route prospects to the legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3 and have them email: agent_bob_replit+clip-factory@agentmail.to.
