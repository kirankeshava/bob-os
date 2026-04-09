# AI Short-Form Clip Factory — Revenue-Gated MVP PRD + Build/Buy Decision + Interview Prioritization Summary

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:09:36.134Z

---

Business: AI Short-Form Clip Factory for Podcasters & Coaches
Legitimacy URL (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
Contact email: agent_bob_replit+clip-factory@agentmail.to

IMPORTANT REVENUE GATE
No SaaS build starts until $5,000 in DFY (done-for-you) clip-package revenue is collected. Until then, this document is used to (1) validate demand, (2) support DFY closing, and (3) pre-sell the roadmap.

1) MVP PRD (1–2 pages, scoped)
Problem
Creators want consistent TikTok/Reels output but hate editing. They need fast, repeatable, on-brand short clips from long podcasts/videos.

Target users
1) Podcasters (video podcasts, 30–120 min episodes)
2) Coaches/consultants (Zoom trainings, webinars, IG lives)
3) Small agencies producing clips for multiple clients

Core job-to-be-done
“Turn my long-form video into several ready-to-post vertical clips with captions and a strong hook in under an hour—without hiring an editor.”

MVP user story (happy path)
1) User pastes a YouTube link OR uploads an MP4.
2) System transcribes audio (timestamps).
3) System proposes 8–20 highlight segments (30–90s) with confidence scores and a one-line ‘hook’ suggestion.
4) User selects 3–10 segments.
5) User chooses a template (basic brand settings: font, caption style, safe margins; optional logo).
6) System renders 9:16 vertical exports with burned-in captions.
7) User downloads MP4s + optional caption files (SRT/VTT) + a text file containing “post copy suggestions.”

Non-goals for MVP (explicitly excluded)
- Auto-posting/scheduling to TikTok/Reels/Shorts
- Advanced b-roll library integration
- Fully automated ‘viral’ writing claims
- Multi-user teams, roles/permissions, agency dashboards
- Complex brand kits (beyond basic fonts/colors/logo)

MVP functional requirements (acceptance criteria)
Input
- Accept YouTube URL (public) and/or MP4 upload.
- Show upload/processing status.

Transcription
- Produce timestamped transcript.
- Allow export of transcript (txt + SRT).

Highlight detection
- Output suggested segments with start/end timestamps.
- Allow user to play/preview segment.
- Allow user to edit segment boundaries.

Templates
- At least 2 templates:
  A) Captions lower-third with subtle background
  B) Center captions (karaoke style)
- Basic controls: font size, caption position, highlight words color.

Rendering/export
- Render 9:16 MP4, 1080x1920, <=60fps.
- Burned-in captions.
- Download links valid for a defined window (e.g., 7 days).

Quality bar
- Captions aligned within +/- 300ms for typical speech.
- Render success rate >= 95% on standard 30–120 minute inputs.
- Time to first preview: < 15 minutes for a 60-minute source (target; validate).

2) Fastest build path (no-code/low-code)
Goal: First working self-serve export with minimal engineering.

Recommended v0 stack (fastest to ship)
- Frontend/workflow: Bubble
- Storage: AWS S3 (or Cloudflare R2) for uploads/exports
- Transcription: OpenAI Whisper API (or Deepgram as fallback)
- Highlighting: LLM-based segmentation on transcript + simple heuristics (topic shifts, punchy statements, Q&A boundaries)
- Rendering: Managed API first (Shotstack / Creatomate / Mux templates). Keep FFmpeg as later optimization.

Why managed rendering first
- Removes ops burden (queues, scaling, FFmpeg edge cases).
- Speeds time-to-first-export.
- Lets us validate template preferences and price sensitivity before owning infra.

FFmpeg path (later)
- Use a worker (e.g., serverless container) to generate vertical crops, overlays, captions, and burn-in.
- Pros: lower unit costs at scale, full control.
- Cons: engineering time + maintenance.

3) Build vs Buy decision brief
Transcription
- Buy: Whisper API (fast to integrate, good accuracy)
- Build: self-hosted Whisper (only when volume/cost requires)
Decision: BUY for v0/v1.

Highlight detection
- Buy: none as a complete product; use LLM prompts + heuristics
- Build: small rules engine + iterative prompts using real customer clips
Decision: BUILD lightweight (prompt + heuristics), iterate using paid DFY outputs.

Rendering
- Buy: Shotstack/Creatomate templates for quick vertical exports
- Build: FFmpeg pipeline + worker queue
Decision: BUY first, evaluate switch after usage data and gross margin review.

Auth/Billing
- Buy: Stripe for billing, Bubble auth or Clerk
Decision: BUY (Stripe).

Storage/CDN
- Buy: S3/R2
Decision: BUY (commodity infra; choose cheapest once volume known).

4) What clients will pay $99–$299/mo for (hypotheses to validate)
Price bands
- $99/mo (solo creator): limited minutes/month, basic templates, 20 clips.
- $199/mo (growth): more minutes, brand kit, better highlight suggestions, faster renders.
- $299/mo (pro/agency-lite): multi-brand presets, higher limits, priority queue, team seats.

Likely high-WTP features to test
- Diarization (speaker labels) for podcasts with multiple hosts/guests
- “Brand voice hooks” (hooks + captions using their style examples)
- Niche templates (real estate, fitness, business coaching, therapy, podcasts)
- One-click “clip batches” per episode with consistent formatting
- Agency workflows: client folders + share links

Features that sound nice but may not increase WTP (validate)
- Auto b-roll detection/cues
- Auto posting/scheduling
- Fancy motion graphics packs

5) Customer interview prioritization summary (fill after each call)
Prospect details
- Name/role/company:
- Niche (podcast/coach/etc):
- Current workflow (tools + who edits):
- Volumes (episodes/week, desired clips/episode):
- Current spend ($/mo on editing or software):

Pain & urgency
- Biggest bottleneck today:
- What happens if they do nothing for 30 days?

Willingness-to-pay signal
- Would they pay for self-serve SaaS? (Y/N/Maybe)
- Price anchor they reacted to: $99 / $199 / $299
- Must-have to justify that price:
- Dealbreaker:

Feature ranking (MoSCoW)
Must:
Should:
Could:
Won’t:

Decision + next step
- DFY upsell opportunity (clip package):
- SaaS waitlist / letter of intent possible? (Y/N)
- Exact quote to reuse in copy (verbatim):

6) Gated 2-week build plan (ONLY after $5k DFY revenue collected)
Sprint goal
Working v0: YouTube link/upload → transcript → suggested highlights → template select → export 9:16 with burned captions.

Week 1 acceptance criteria
- Bubble app with auth + job submission UI.
- URL ingest OR upload ingestion works end-to-end.
- Whisper transcription returns timestamped output and can be previewed.
- Highlight suggestion list appears with start/end times and preview playback.

Week 2 acceptance criteria
- Template selection with 2 templates and basic styling controls.
- Render pipeline produces downloadable 9:16 MP4 with burned captions.
- Export page shows clip list + download links + SRT export.
- Minimal logging + failure states (retry, error message).

Exit criteria
- 3 real customer episodes processed successfully.
- At least 10 exported clips meet caption timing and format requirements.
- 1–2 paying DFY clients agree the exports are ‘good enough to post’ without manual editing.

Notes for sales use (now)
When referencing the roadmap in DFY calls, say: “We’re collecting feedback from paying clip-package clients and will open a limited self-serve beta once we hit our first $5k in production revenue.” Share legitimacy URL above and direct replies to agent_bob_replit+clip-factory@agentmail.to.
