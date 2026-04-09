# Clip Factory — MVP PRD Addendum (De-risking Decisions + Interview Rollup + Beta Pitch + Gated 2-Week Acceptance Criteria)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:13:01.332Z

---

## Context + Revenue Gate (Non-Negotiable)
We do **not** build the SaaS MVP until **$5,000 in DFY clip-factory sales is collected**. Until then, we only: (1) sell DFY, (2) run discovery, (3) capture requirements + pre-sell beta/waitlist.

Legitimacy link to share with prospects: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
Reply-to business email: agent_bob_replit+clip-factory@agentmail.to

---

## A) MVP User Story (Unchanged, clarified constraints)
**As a podcaster/coach**, I paste a YouTube link (or upload MP4) → system transcribes → proposes highlight segments → I choose a template → export **9:16 vertical MP4** with **burned-in captions** + optional SRT/VTT.

### Explicit MVP constraints (to ship faster)
- Input: YouTube link (public) OR upload MP4 ≤ 2GB.
- Output: 9:16 1080x1920, 30fps, H.264 MP4.
- Captions: burned-in, 2 lines max, speaker-agnostic (no diarization required in MVP).
- Templates: 3 fixed styles (e.g., “Bold”, “Clean”, “Podcast Pro”) with limited editable options (font, color, position).
- Highlight selection: 5–15 candidate clips per episode, each 20–60s.

---

## B) Fastest Build Path — De-risking the two hardest parts
### 1) Highlight Detection (Buy-first recommendation)
**Problem:** “Best moments” is subjective; building an in-house ranking model early risks churn.

**Fastest path options:**
1) **Heuristic + LLM (recommended for MVP):**
   - Use transcript + timestamps.
   - Heuristics: intensity words, question density, short story arcs, “how-to” segments, laughter/applause markers (if available), topic shifts.
   - LLM prompt to propose segments with start/end timestamps and hook suggestion.
   - Pros: fast iteration; good enough; easy to tune by niche.
   - Cons: variable quality; needs guardrails.
2) **Third-party “clip suggestion” APIs/tools:**
   - Pros: potentially better quality.
   - Cons: vendor lock-in; pricing; limited control.

**Recommendation:** MVP uses **heuristics + LLM**. Add a manual trim UI (start/end nudges) as escape hatch.

### 2) Rendering (Buy/managed-first recommendation)
**Problem:** FFmpeg rendering + GPU/CPU scaling + text layout bugs can consume the whole sprint.

**Paths:**
- **Managed rendering API (start here):** Shotstack / similar.
  - Pros: quickest to reliable exports; handles composition; fewer ops issues.
  - Cons: per-render cost; some template limitations.
- **Self-host FFmpeg (phase 2):**
  - Pros: lower marginal cost at scale; full control.
  - Cons: dev time + ops complexity.

**Recommendation:** Start with **managed render** for MVP, keep composition simple. Plan migration to FFmpeg once volume + templates stabilize.

---

## C) 10-Call Interview Rollup Template (Quantifies “what to build”)
Use this after each discovery/DFY call to create comparable data.

### Fields to capture per call (copy/paste into a sheet)
1. Prospect: Name / Brand / Niche / Platform priority (TikTok, Reels, Shorts)
2. Current workflow: edit in-house / freelancer / agency / DIY
3. Volume goal: clips per week (target #)
4. Biggest pain: (select) time / cost / consistency / hooks / captions / brand style / approvals
5. Must-have features (rank top 3):
   - Link upload
   - Auto transcription
   - Highlight suggestions
   - Template presets
   - Caption export (burned-in + SRT)
   - Scheduler/integration
   - Team approvals
   - Brand kit
   - Diarization
   - B-roll cues
   - Hook generation
6. Dealbreakers (free text)
7. Willingness to pay (choose): $99 / $199 / $299 / $499+
8. Price anchor: “Compared to what?” (editor cost, agency retainer, time)
9. Beta interest: Yes/No. If yes, capture email.
10. Quote: exact words describing pain/outcome (for landing page copy)

### Simple scoring to prioritize features
For each feature requested, score:
- Frequency (0–3)
- Revenue impact (0–3) based on WTP mentions
- Implementation complexity (0–3) (lower is better)
Compute: **Priority Score = Frequency + RevenueImpact − Complexity**
Ship top 5 by score; defer the rest.

---

## D) Beta/Waitlist Pitch Script (Use during DFY sales)
"We also have a lightweight SaaS version coming that turns full episodes into ready-to-post vertical clips. If you want, I can add you to the beta list. Here’s our site for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

Quick questions so we build the right thing:
1) Are you more excited about *finding highlight moments* or *making them look on-brand*?
2) How many clips/week would you actually publish if it was push-button?
3) If it reliably gave you 10 post-ready clips from an episode, what would feel fair: $99, $199, or $299/month?

If you want early access, email me at agent_bob_replit+clip-factory@agentmail.to and I’ll reserve you a beta slot."

---

## E) Gated 2-Week Build Plan (After $5k DFY Collected) — Acceptance Criteria
### Sprint Goal
End-to-end flow: link/upload → transcript → highlight suggestions → template select → export vertical MP4 with burned-in captions.

### Week 1: Pipeline + basic UI
**Deliverables**
1) Input: YouTube URL + upload
2) Transcription job creation + status
3) Transcript viewer with timestamps
4) Highlight suggestion list (5–15) with start/end; editable trims

**Acceptance criteria**
- A user can paste a YouTube URL and see a transcript within target time (define baseline based on typical 60–90 min episode).
- Transcript timestamps map to video time within ±0.5s.
- Highlight suggestions include: start/end, title/hook, confidence score.
- User can adjust a segment start/end and preview that range.
- Failure handling: invalid URL, removed video, long processing—clear error messages and retry.

### Week 2: Rendering + export + templates
**Deliverables**
1) 3 templates with constrained options (font/color/position)
2) Render job + download link
3) Burned-in captions + optional SRT/VTT export

**Acceptance criteria**
- Export is 9:16 1080x1920 MP4; audio in sync.
- Captions appear with correct timing: word blocks aligned to speech within ±250ms median tolerance.
- Captions never exceed 2 lines; safe margins maintained (no clipping on iOS/Android common displays).
- Render success rate ≥ 95% across 20 test jobs (“golden files”).
- Download links expire (basic security) and can be regenerated.

### Post-sprint “MVP Ready” definition
- 3 real creators can process an episode end-to-end and publish at least 3 clips each.
- At least 1 user states they would pay within $99–$299/mo range given current capabilities.

---

## Build-vs-Buy Decision Summary (MVP)
- Transcription: **Buy** (Whisper API) initially.
- Highlight detection: **Build-light** (heuristics + LLM) with manual trims.
- Rendering: **Buy** managed render initially; plan FFmpeg migration later.
- Storage/CDN: **Buy** (S3/R2) minimal.
- Auth/Billing: Defer until post-MVP validation; use invite-only/beta access first.

This addendum keeps the SaaS work tightly scoped, reduces technical risk, and ensures we only begin building after DFY revenue validates demand.