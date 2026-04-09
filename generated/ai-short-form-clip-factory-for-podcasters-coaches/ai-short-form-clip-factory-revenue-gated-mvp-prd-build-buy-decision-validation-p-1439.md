# AI Short‑Form Clip Factory — Revenue‑Gated MVP PRD + Build/Buy Decision + Validation Priorities + 2‑Week Plan

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:28:37.783Z

---

Context + Revenue Gate
This document scopes the Clip Factory micro‑SaaS MVP, but it is strictly gated: do not build anything until the business has collected $5,000 in DFY (done‑for‑you) clip-package revenue. The DFY work funds development and validates demand.
Legitimacy links for customer comms:
• Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
• Contact: agent_bob_replit+clip-factory@agentmail.to

1) MVP PRD (1–2 pages)
Product name: Clip Factory
Target user: podcasters, coaches, small brands producing 30–120 minute longform content who want consistent TikTok/Reels/Shorts output without hiring editors.
Primary job-to-be-done: “Turn my long video into multiple ready‑to‑post vertical clips with strong hooks and readable captions in minutes.”

MVP User Story (end-to-end)
As a creator, I can:
1) Input content: paste a YouTube link (public/unlisted) OR upload a video/audio file.
2) System transcribes: auto-transcribe with timestamps.
3) System suggests highlights: detect candidate segments (e.g., 15–60s) likely to perform.
4) I review/select: preview segments, adjust start/end by a few seconds.
5) Choose template: select 1–3 basic 9:16 templates (layout + caption style).
6) Export: generate 9:16 MP4 with burned-in captions + optional title line; download and/or receive shareable link.
7) Captions export: download SRT/VTT and a copy/paste caption text for posting.

Non-goals (explicitly out of MVP)
• Full multi-user team workflows, advanced asset libraries, A/B testing, scheduling/publishing, deep analytics.
• Fully automatic b‑roll insertion. (MVP can output “b‑roll cues” as text only.)

Core MVP Features (Must-have)
A. Ingestion
• YouTube URL import (preferred) and/or file upload (secondary).
• Basic input validation (link reachable; file size/type checks).

B. Transcription
• Whisper-based transcription with word/segment timestamps.
• Output: transcript view + SRT/VTT export.

C. Highlight detection
• Auto-propose 5–20 candidate clips per longform.
• Heuristics acceptable in MVP: cadence/pauses, sentiment shifts, keyword density, question/answer patterns, speaker emphasis.
• MVP controls: min/max duration (e.g., 20–60s), number of clips.

D. Clip editing (light)
• Simple trim handles (+/- seconds) and title line edit.
• Ability to rename clips.

E. Templates + rendering
• 2–3 templates:
  1) Full-screen vertical crop + captions bottom.
  2) Split layout (speaker top, captions lower third).
  3) Side-by-side (video + branded margin) if feasible.
• Captions: burned in, large, high-contrast, punctuation.
• Output: MP4 1080x1920, 30fps, max bitrate sane for social.

F. Delivery
• Download link per clip.
• Bundle download (ZIP) optional; if not, provide individual links.

Key MVP Metrics
• Time-to-first-clip (TTFC): < 10 minutes for a 60-min episode (with async processing).
• Clip acceptance rate: user keeps/exports ≥ 20% of suggested clips.
• DFY-to-SaaS conversion: % of DFY customers willing to subscribe after trial.

2) Fastest Build Path (No/Low-Code)
Goal: ship something usable fast after revenue gate is met.

Recommended architecture (fast path)
Frontend + workflow: Bubble (rapid UI, auth, DB, workflows).
Storage: S3-compatible (AWS S3, Cloudflare R2) for uploads/outputs.
Transcription: OpenAI Whisper API (or equivalent hosted Whisper).
Highlight selection:
• MVP: LLM-assisted segmentation + heuristics using transcript chunks.
• Prompted outputs: candidate segments with start/end timestamps + suggested hook line.
Rendering:
• Option 1 (build): FFmpeg in a backend worker (container) triggered by Bubble via API.
• Option 2 (buy): Shotstack (or similar) for template-driven render via API.
Background jobs: serverless/queue worker (Render.com, Fly.io, Cloud Run) to avoid Bubble timeouts.

Why this is fastest
• Bubble accelerates user management, CRUD, and UI.
• Rendering/transcription are the hard parts; offload to APIs/worker.
• Template system starts minimal; add complexity later.

3) Build vs Buy Decision (Tooling)
Transcription
• Buy (recommended): Whisper API
  Pros: accuracy, speed, less ops. Cons: variable cost.
• Build: self-host Whisper
  Pros: lower marginal cost at scale. Cons: infra/maintenance.
Decision: Buy for MVP.

Highlight detection
• Buy: none truly turnkey for “best clips”; most are partial.
• Build (recommended): combine heuristics + LLM on transcript.
Decision: Build lightweight logic; iterate from customer feedback.

Rendering
• Buy: Shotstack / similar
  Pros: fastest to stable templating, fewer ops.
  Cons: per-render cost, vendor dependency.
• Build: FFmpeg worker
  Pros: more control, cheaper at scale.
  Cons: engineering time; edge cases.
Decision: If speed is priority, start with managed rendering; if budget constrained and engineering available, FFmpeg worker is acceptable. Choose after revenue gate based on expected volume and willingness to pay.

Auth/Billing
• MVP can start with Bubble auth.
• Billing later: Stripe subscriptions once demand proven.
Decision: keep billing out of MVP build until interviews confirm subscription readiness.

4) Paying Client Validation: What features justify $99–$299/mo?
Hypothesis: creators pay subscription if it reliably outputs clips that need minimal manual editing and matches their brand style.

Features to validate (candidate paid differentiators)
A. Speaker diarization + labels (useful for podcasts/interviews).
B. Brand voice hook generation (niche-specific hooks that sound like them).
C. Niche templates (coach, real estate, fitness, B2B podcast) including caption styles and CTA frames.
D. Batch processing + recurring imports (e.g., “new YouTube upload → auto draft clips”).
E. Team collaboration (agency use): client folders, approvals.
F. B-roll cues (text suggestions) and automatic b-roll insertion (later).
G. Multi-platform formatting presets (Reels vs TikTok safe zones, title placement).

Pricing expectation to validate
• $99/mo: Solo creator, limited minutes/month, basic templates.
• $199/mo: More minutes, better highlight quality, diarization, brand kit.
• $299/mo: Agency/teams, multi-brand, approvals, higher throughput.

Interview questions (to ask DFY customers during delivery)
1) “If this tool produced clips that were 80% ready, what would you pay monthly to replace editing?”
2) “What’s your current workflow and cost (time or $) per clip?”
3) “Which is more valuable: better highlight picks, better captions, or brand-consistent templates?”
4) “Do you need speaker labels (Host/Guest) and why?”
5) “Would you pay extra for auto hooks and post captions in your voice?”
6) “What would make you cancel after month 1?”

Feature prioritization framework (post-call)
Score each requested feature 1–5 on:
• Willingness-to-pay impact
• Frequency across customers
• Retention impact
• Build complexity (reverse score)
Prioritize the top 3 that maximize WTP + retention with low complexity.

5) 2‑Week Build Plan (GATED — only after $5k DFY collected)
Definition of Ready (before day 1)
• Confirm $5,000 DFY revenue collected.
• 5–10 customer interviews completed; top 3 paid features identified.
• Decide rendering approach (FFmpeg worker vs managed rendering).

Sprint goal
Deliver an internal beta where a user can paste a YouTube link, get suggested highlight segments, select a template, and export a 9:16 MP4 with burned-in captions.

Week 1 (Days 1–5): Core pipeline working
Day 1: Architecture + data model
• Bubble app skeleton: user, project, source, transcript, clip.
Acceptance: user can create a project and store a YouTube link.

Day 2: Transcription integration
• Pull audio from YouTube (server-side) and send to Whisper API.
• Store transcript with timestamps.
Acceptance: transcript view loads and SRT export works.

Day 3: Highlight detection v1
• Generate 10–20 candidate segments via heuristics/LLM from transcript.
Acceptance: list of suggested clips with start/end times appears.

Day 4: Clip preview + trimming
• Basic player preview; user adjusts start/end.
Acceptance: user can modify timestamps and save.

Day 5: Template spec v1
• Define 2 templates and render parameters.
Acceptance: template selection UI works and persists per clip.

Week 2 (Days 6–10): Rendering + export + hardening
Day 6–7: Rendering pipeline
• Implement render job queue; generate 9:16 MP4 with captions.
Acceptance: at least 1 clip renders successfully end-to-end.

Day 8: Bulk export + links
• Generate downloadable links; basic job status (queued/processing/done/failed).
Acceptance: user can download output reliably.

Day 9: Basic QA + guardrails
• Handle failed jobs, invalid timestamps, rate limits.
Acceptance: common failures have clear error messages and retry.

Day 10: Beta handoff
• Internal test checklist + first beta users (DFY customers) invited.
Acceptance: 3 real customer projects processed; collect feedback on highlight quality and caption readability.

Definition of Done (MVP)
• Input: YouTube link works.
• Output: 9:16 MP4 with burned-in captions downloadable.
• User can accept/edit highlight segments.
• At least 2 templates.
• Processing status visible.
• No payment/subscription required in MVP beta.

Reminder: This plan is intentionally blocked until $5k DFY is collected. Until then, focus on distribution and selling DFY clip packages using the website URL and contact email above.