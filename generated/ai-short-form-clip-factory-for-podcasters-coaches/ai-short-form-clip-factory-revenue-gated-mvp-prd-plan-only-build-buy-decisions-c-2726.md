# AI Short-Form Clip Factory — Revenue-Gated MVP PRD (Plan Only) + Build/Buy Decisions + Client-Validated Feature Prioritization + 2-Week Build Plan

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T05:59:34.882Z

---

Business: AI Short-Form Clip Factory for Podcasters & Coaches
Website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

IMPORTANT REVENUE GATE (non-negotiable):
Do NOT build the SaaS MVP until $5,000 in DFY (done-for-you) clip-package revenue is collected. This document is a scoped plan only.

1) MVP PRD (1–2 pages equivalent)
Goal / Job-to-be-done:
Help a creator turn 30–90 minutes of video/podcast into 5–20 ready-to-post vertical clips (9:16) with captions and hooks, in minutes, without hiring an editor.

Primary user:
Podcasters, coaches, course creators, and small brands producing long-form content weekly.

Core user story (MVP):
As a creator, I paste a YouTube link or upload a video → the app transcribes it → detects highlight segments → I choose a clip template → export a 9:16 video file (or downloadable package) with burned-in captions.

MVP scope (must-have):
- Input: YouTube link OR file upload (start with YouTube link if it reduces storage complexity).
- Transcription: automatic transcript generation.
- Highlight detection: 5–15 suggested segments with timestamps + 1-line rationale.
- Clip selection UI: select/deselect segments; set clip length bounds.
- Templates: 2–3 caption styles (clean, bold, subtitle) and safe margins for Reels/TikTok.
- Export: 9:16 video with burned-in captions + optional .srt/.vtt export.
- Basic queue/status: processing → ready → failed (with retry).

Non-goals (explicitly out of MVP):
- Multi-user teams, roles/permissions
- Advanced motion graphics and custom animations
- Full brand kit management (fonts, colors, logos) beyond 1 simple upload
- Auto-posting to TikTok/IG/YT Shorts (export first)
- Payments/subscription management (validate demand first via DFY + pre-sell)

Success metrics (to justify building after gate):
- At least 5 DFY customers explicitly state they would pay $99–$299/mo for the tool AND identify their must-have features.
- Time-to-first-clip < 20 minutes end-to-end for a 60-min video.
- Export reliability > 95% on typical creator content.

2) Fastest build path (no-code/low-code) — Bubble + APIs
Recommended fastest path (MVP):
- Frontend/workflow orchestrator: Bubble (rapid UI + user auth + job status pages).
- Transcription: OpenAI Whisper API (or Deepgram as an alternative).
- Highlight detection: LLM prompt on transcript + heuristics (topic shifts, emphasis words, Q&A sections).
- Rendering:
  Option A (fastest buy): Shotstack (or similar managed rendering API) to generate 9:16 clips and burn captions.
  Option B (build): FFmpeg pipeline on a serverless/container setup; more control, more devops.
- Storage/CDN:
  If link-only: minimal storage; store only outputs.
  If uploads: use S3-compatible (Cloudflare R2/S3) + signed URLs.

Why Bubble for MVP:
- Fast UI iteration for segment selection, template selection, and export downloads.
- Can call external APIs and manage async job status.

3) Build vs Buy — Decision (keep scope minimal)
A) Transcription
- Buy: Whisper API (recommended) — fastest, good quality, simple.
- Build: self-host Whisper — cheaper at scale but ops-heavy.
Decision for MVP: Buy.

B) Highlight detection
- Buy: none perfect; use LLM + prompt + heuristics.
- Build: train custom model — too slow.
Decision for MVP: Build lightweight (LLM-based) logic.

C) Rendering
- Buy: Shotstack (recommended for speed) — reduces FFmpeg complexity and queue management.
- Build: FFmpeg — more control, but increases time-to-MVP.
Decision for MVP: Start with Buy (managed rendering). Revisit after usage proves volume economics.

D) Upload/storage
- Buy: YouTube link-first avoids storage.
- Build: storage pipeline adds complexity.
Decision for MVP: Start with YouTube link-first; add upload later if customers demand.

E) Auth
- Bubble native auth is sufficient for MVP.

4) Paying-client validation: what features justify $99–$299/mo
Use these 10 interview questions (run on DFY calls too):
1. How many long-form episodes/videos do you publish per week/month?
2. How many short clips do you want per episode to feel “consistent”?
3. What’s your current workflow (editor/VA/DIY) and what does it cost in time or dollars?
4. If you had “link → clips” in 20 minutes, what would you use it for immediately?
5. Which is more valuable: (a) better clip selection, (b) better captions/templates, (c) faster turnaround?
6. Would you rather approve suggested highlights or manually pick timestamps?
7. What kills clips for you today: wrong hook, bad captions, no context, poor framing, b-roll, branding?
8. Which add-ons would you pay extra for? (diarization, brand kit, hook rewrites, niche templates, auto b-roll cues)
9. Pricing sensitivity: At what price is it a no-brainer ($99/$149)? At what price do you hesitate ($299)?
10. If we delivered 40 clips/month reliably, what would you pay monthly instead of hiring an editor?

Feature scoring sheet (after every call):
- Must-have / Should / Could / Won’t (MoSCoW)
- Willingness-to-pay score (1–5)
- Frequency score (how often they’d use it weekly)
- Impact score (does it replace editor cost?)
- Complexity score (1–5; lower is better)
Prioritize: high WTP + high frequency + high impact + low complexity.

Most likely $99–$299/mo “paid” features to validate:
- Diarization (speaker labeling) for podcasts/interviews
- Brand kit templates (fonts/colors/logo safe zones) + reusable presets
- Brand voice hooks: auto-generate 3 hook options per clip in their tone
- Niche templates: real estate, fitness coach, business podcast (lower cognitive load)
- B-roll cues: timestamps + suggested b-roll keywords (export as notes)
- Batch processing + queue: “process my last 10 episodes”

5) Gated 2-week build plan (starts only after $5k DFY collected)
Sprint goal: link → transcript → highlight suggestions → template selection → 9:16 export with captions.

Week 0 (pre-sprint checklist, 0–1 day):
- Confirm from interviews: top 3 must-haves + minimum acceptable output quality.
- Choose rendering approach (managed vs FFmpeg) based on speed-to-launch.

Week 1 (Foundations + pipeline)
Day 1–2: Bubble app skeleton
- Pages: Login, New Project, Project Status, Clip Review, Export
Acceptance criteria:
- User can create a project by pasting a YouTube link.
- Project status displays processing state.

Day 2–3: Transcription integration
- Send video/audio to transcription provider; store transcript + timestamps.
Acceptance criteria:
- Transcript text is saved and viewable; timestamps align to playback.

Day 3–5: Highlight detection (MVP)
- LLM prompt returns 5–15 highlight candidates with start/end timestamps + 1-line “why”.
Acceptance criteria:
- Candidates appear in UI; user can select/deselect.
- Guardrails: clips within min/max length (e.g., 20–60s default).

Week 2 (Templates + rendering + export)
Day 6–8: Template selection + caption styling
- Implement 2–3 caption presets; safe margins for UI overlays.
Acceptance criteria:
- User can preview caption styling on sample frame.

Day 8–10: Rendering + caption burn-in
- Managed render API or FFmpeg pipeline generates 9:16 clip(s).
Acceptance criteria:
- Exported MP4 playable; correct aspect ratio; captions visible and not cut off.

Day 10–12: Export packaging
- Download links + optional .srt/.vtt + a “posting notes” text block.
Acceptance criteria:
- User can download each clip and the caption file.

Day 12–14: Reliability + QA
- Retry logic, failure states, basic logging.
Acceptance criteria:
- 95%+ successful renders in test set of 20 jobs; clear error message on failure.

Out-of-scope for the 2-week sprint:
- Payments/subscriptions, auto-posting, advanced brand kits, team accounts.

How to use this PRD during DFY sales (to pre-sell without building):
- Position as: “We’re doing DFY clip production now; we’re also building a self-serve version for clients who want volume. If you want early access at $99–$299/mo later, tell me what features matter most.”
- Always route interest to the business inbox: agent_bob_replit+clip-factory@agentmail.to and reference the website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
