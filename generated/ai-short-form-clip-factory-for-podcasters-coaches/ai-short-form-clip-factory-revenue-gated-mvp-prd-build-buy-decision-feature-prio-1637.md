# AI Short-Form Clip Factory — Revenue-Gated MVP PRD + Build/Buy Decision + Feature Prioritization + 2-Week Plan

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T17:09:39.386Z

---

REVENUE GATE (NON-NEGOTIABLE)
This MVP is NOT to be built until $5,000 in DFY clip-package sales is collected. Until then, use DFY fulfillment + customer interviews to validate demand and lock requirements. If revenue gate not met, action = outreach + interviews only.

PRODUCT: AI Short-Form Clip Factory (Micro-SaaS)
Goal: Convert a long-form podcast/video into ready-to-post vertical clips (9:16) with burned-in captions, strong hooks, and platform-ready exports.
Legitimacy links to share in customer comms: Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3 | Email: agent_bob_replit+clip-factory@agentmail.to

1) MVP USER STORY (PRIMARY FLOW)
User (podcaster/coach) wants consistent TikTok/Reels content without an editor.

MVP user story:
- As a creator, I paste a YouTube link (or upload an MP4) and the system automatically:
  1) Ingests the source video
  2) Transcribes audio
  3) Detects highlight segments (30–90s)
  4) Lets me choose a simple template (caption style + safe margins)
  5) Exports 9:16 vertical clips with burned-in captions and downloadable files

In-scope (MVP):
- Input: YouTube URL OR file upload (limit: 1 hour max, 1GB max for MVP)
- Output: 3–10 suggested highlights; user selects up to 5 to render
- Captions: word-level timing, burned-in, 2–3 styles
- Export: 1080x1920 MP4, H.264, platform-safe margins
- Simple clip editor: start/end trim slider, caption toggle, template dropdown
- Delivery: downloadable links + email notification when renders complete

Out-of-scope (post-MVP):
- Auto b-roll insertion, dynamic zooms, multi-speaker layouts, heavy brand kits, team workspaces, scheduling/posting, full transcript editor, analytics, multi-language.

2) FASTEST BUILD PATH (NO-CODE/LOW-CODE)
Constraint: fastest time-to-demo and iteration; minimal engineering; keep costs low until validated.

Recommended architecture (fast path):
- Frontend/App: Bubble (rapid UI + auth + workflows)
- Storage: S3-compatible (or Cloudflare R2) for originals/exports; signed URLs
- Transcription: OpenAI Whisper API (fast integration; acceptable quality)
- Highlight detection: heuristics + LLM summarization/classification (cheap baseline)
  - Heuristics: detect high-energy moments via punctuation bursts, keywords, topic shift, long monologues
  - Optional: LLM to propose 5–10 “clip-worthy” segments given transcript + timestamps
- Rendering:
  Option A (build): FFmpeg on a worker (Render.com / Fly.io / Railway) triggered by Bubble webhook
  Option B (buy): Shotstack (templates + rendering) or Mux (more infra heavy; better for scaling)

Template approach (MVP):
- 2–3 hardcoded templates:
  - Template 1: Bottom captions, bold highlighted current word
  - Template 2: Center captions, subtle shadow
  - Template 3: Speaker top + captions bottom (if facecam)
- Safe area guides for TikTok/Reels UI.

3) BUILD VS BUY DECISION (DEFAULTS)
Transcription:
- Build: self-host Whisper = more ops, cheaper at scale, slower to start.
- Buy/Use API (default): Whisper API = fastest, good enough.
Decision: Use Whisper API for MVP.

Highlight detection:
- Build advanced ML = slow.
- MVP: heuristic + LLM prompt = fastest.
Decision: Start heuristic + LLM; validate with users.

Rendering:
- Build with FFmpeg = flexible, low marginal cost, but ops complexity.
- Buy (Shotstack) = fastest template rendering, less ops.
Decision: If team has FFmpeg comfort, build FFmpeg worker; otherwise use Shotstack for MVP demo speed.

Storage/CDN:
- S3/R2 signed URLs = straightforward.
Decision: S3-compatible with signed URLs.

Auth/Billing:
- MVP gated behind revenue; do not implement billing until demand proven.
Decision: Bubble auth only; Stripe later.

4) CLIENT VALIDATION: FEATURES WORTH $99–$299/MO
Hypothesis: creators pay for time savings + consistent output. Validate willingness-to-pay via DFY clients.

Feature candidates to test (rank by “paid pull”):
A) High-confidence highlights (saves thinking time)
- “Give me 10 clips/week that are actually post-worthy.”
B) Brand voice hooks + on-screen text variants
- Auto-generate 3 hook overlays per clip: curiosity, contrarian, authority.
C) Diarization (multi-speaker) + speaker labels
- Especially for podcasts with 2–4 hosts/guests.
D) Niche templates
- Real estate, fitness, business coaching, therapy, SaaS founders.
E) Team seats + client workspaces (for agencies)
F) Workflow integrations
- Zapier/webhook export to Google Drive/Dropbox/Notion.
G) Batch processing
- “Upload 4 episodes, wake up to 40 clips.”

Pricing validation targets:
- $99/mo: solo creator, 30 clips/mo, basic templates, captions, highlight suggestions.
- $199/mo: 60 clips/mo, better highlights, diarization, hook variants.
- $299/mo: 120 clips/mo, team seat, niche templates, integrations, priority rendering.

Interview questions (must capture):
- Current workflow cost/time (hours per week; editor spend)
- What “good clip” means (examples)
- Biggest failure mode (bad highlights? captions? formatting?)
- Would they pay $99/$199/$299 for: (1) accurate highlights, (2) ready-to-post templates, (3) brand voice hooks, (4) team seats
- What is the must-have to switch from editor/VA?

Prioritization rubric (log after each call):
- Pain intensity (1–5)
- Frequency (1–5)
- Willingness-to-pay signal (1–5)
- Complexity (1–5; reverse score)
Compute: (Pain + Frequency + WTP) – Complexity.

5) GATED 2-WEEK BUILD PLAN (ONLY AFTER $5K DFY COLLECTED)
Definition of Done for MVP: A user can input a YouTube URL, receive suggested highlights, select a template, and export at least 1 vertical 9:16 clip with burned-in captions, delivered via download link.

Week 1 (Days 1–5): Core pipeline
- Day 1: Bubble app skeleton + auth + project model
  Acceptance: user can create project, paste YouTube URL/upload, see “processing” status.
- Day 2: Ingestion + transcription integration
  Acceptance: transcript stored with timestamps; user can view transcript text.
- Day 3: Highlight proposal
  Acceptance: system outputs 5–10 segments with start/end timestamps + titles; user can play preview (even without render) and adjust start/end.
- Day 4–5: Rendering path (FFmpeg worker or Shotstack)
  Acceptance: render 1 clip to 9:16 with captions burned in; downloadable MP4.

Week 2 (Days 6–10): UX + reliability
- Day 6: Templates (2–3) + caption styles
  Acceptance: user chooses template; output reflects style selection.
- Day 7: Queue + retries + job status
  Acceptance: jobs move through states (queued/running/failed/done) with visible errors.
- Day 8: Delivery and notifications
  Acceptance: email sent to user when clip complete with download link.
- Day 9: Basic limits + housekeeping
  Acceptance: file size/time limits enforced; old assets expire or can be deleted.
- Day 10: Demo readiness + bug bash
  Acceptance: run 5 real episodes end-to-end with <15% failure rate and consistent output format.

KPIs to confirm post-build (first 10 users):
- Time-to-first-clip < 15 minutes
- 70%+ of users export at least 1 clip
- 30%+ request recurring/batch usage (subscription pull)

Owner operating note:
Until the $5k DFY gate is met, the only “product” work is: capturing customer requirements in their own words and validating which features justify $99–$299/mo. Do not build pipelines yet; use DFY fulfillment + interviews to avoid building the wrong thing.