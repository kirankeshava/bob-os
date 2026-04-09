# AI Short-Form Clip Factory — Revenue-Gated MVP PRD + Build/Buy Decision + Validation + 2-Week Gated Plan

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:45:11.910Z

---

# AI Short-Form Clip Factory — MVP PRD (Revenue-Gated)

**Business legitimacy URL (use in outreach/calls):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3  
**Contact email (replies/inbox):** agent_bob_replit+clip-factory@agentmail.to

## 0) Revenue Gate (Non‑negotiable)
**Do not build this SaaS MVP until $5,000 in DFY clip-package revenue is collected.**
Reason: distribution + revenue are the constraint; premature build increases burn and delays sales.

---

## 1) MVP User Story (End-to-End)
### Primary user
Podcaster / coach / creator who records 30–120 min content and needs consistent TikTok/Reels/Shorts output without hiring an editor.

### Core user story
“As a creator, I paste a YouTube link or upload a video, then the system finds highlight moments, adds captions, applies a vertical template, and exports ready-to-post 9:16 clips.”

### MVP flow (happy path)
1. **Ingest**: user pastes a YouTube URL OR uploads an MP4.
2. **Transcribe**: system generates a transcript with timestamps.
3. **Highlight detection**: system proposes 10–30 segments (e.g., 15–60s) with a short title/hook suggestion.
4. **Select + edit**: user chooses 3–10 highlights and can trim start/end.
5. **Template**: user selects a template (fonts/colors/caption style; minimal branding fields).
6. **Export**: system renders 9:16 vertical clips with burned-in captions and downloads (or provides shareable links). Exports should be platform-safe (H.264, AAC, 1080x1920, <60s optional).

### Non-goals for MVP (explicitly out)
- Full multi-user teams/roles
- Auto b-roll retrieval library
- Advanced brand kit management across multiple brands
- Scheduling/posting to platforms
- Complex timeline editor

---

## 2) MVP Requirements (What “done” means)
### Functional requirements
- **YouTube URL ingest**: accept public YouTube URL, fetch video (or audio) for processing.
- **Upload ingest**: accept MP4 (with max file size limit defined; start with e.g., 1–2GB).
- **Transcription**: produce a timestamped transcript.
- **Highlights**: produce ranked segments with timestamps + confidence score.
- **Clip editor (lightweight)**: adjust in/out points; rename title.
- **Caption rendering**: burn captions with word-level or line-level timing (line-level acceptable for MVP).
- **Vertical output**: 9:16 render, with speaker framing (simple center-crop acceptable for MVP).
- **Export & storage**: deliver MP4 downloads and store links for at least 7–30 days.

### Quality requirements
- **Time-to-first-highlight**: target <10 minutes for a 60-min video (best-effort; depends on infra).
- **Caption accuracy**: “good enough” for conversational English; allow user to edit text for a clip.
- **Render reliability**: 95%+ job success; retries on transient failures.

### Constraints
- Must be buildable quickly by 1–2 people.
- Must minimize infra complexity until subscription revenue exists.

---

## 3) Fastest Build Path (Low-code + APIs)
### Recommendation (fastest path)
- **Frontend + workflow orchestration**: Bubble (or similar low-code) for auth, dashboard, job status, template selection.
- **Transcription**: Whisper API (OpenAI) or equivalent hosted speech-to-text.
- **Highlight detection**: LLM prompt + transcript chunking; optionally augment with simple heuristics (topic shifts, sentiment spikes, Q&A patterns).
- **Rendering**:
  - MVP option A: **FFmpeg** on a worker (Replit/Fly.io/Render) triggered via API.
  - MVP option B: **Managed rendering** (Shotstack / Mux / Cloudinary video transformations) to reduce DevOps.
- **Storage/CDN**: S3-compatible object storage (Cloudflare R2/AWS S3) + signed URLs.

### Why this path
- Bubble accelerates user management, UI, and admin tooling.
- Whisper removes custom ASR complexity.
- FFmpeg/managed render is the main risk; managed render can reduce risk at higher per-minute costs.

---

## 4) Build vs Buy (Decision Summary)
### Transcription
- **Buy**: Whisper API (recommended). Fastest, acceptable quality.
- **Build**: self-host Whisper = lower variable cost but higher ops complexity. Not MVP.

### Highlight detection
- **Buy**: none perfectly fits; use LLM prompts + heuristics.
- **Build**: custom model later (not MVP).

### Rendering
- **Build**: FFmpeg pipeline (cheapest variable cost, most engineering risk).
- **Buy**: Shotstack/Mux/Cloudinary (faster reliability, higher unit costs).

### Storage
- **Buy**: S3/R2 (recommended). Minimal effort.

### Authentication/Billing
- MVP can delay billing until after gate; once building: Stripe.

**MVP default recommendation:** Whisper API + Bubble + managed render *if cost acceptable*; otherwise Bubble + FFmpeg worker.

---

## 5) What Clients Will Pay For ($99–$299/mo) — Hypotheses to Validate
### Base subscription candidates
- **$99/mo**: 30 clips/month, 1 brand template, captions, 9:16 export.
- **$199/mo**: 60 clips/month, 3 templates, faster turnaround, basic hook/title suggestions.
- **$299/mo**: 120 clips/month, team seat, diarization/speaker labeling, brand voice hooks.

### Features to test for willingness-to-pay
1. **Diarization / speaker switching** (esp. interview podcasts)
2. **Brand voice hooks** (generate “scroll-stopping” openers in their tone)
3. **Niche templates** (coach vs real estate vs fitness vs B2B SaaS)
4. **Auto face tracking / better reframing**
5. **B-roll cues list** (not full b-roll insertion; just “insert X here” prompts)
6. **Clip score** (predict virality/retention proxy)

---

## 6) Customer Validation (Discovery Call Script — 20 minutes)
Use legitimacy URL + email in follow-ups: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3 and agent_bob_replit+clip-factory@agentmail.to.

**Goal:** confirm their workflow, pain severity, and exact features they’d pay $99–$299/mo for.

1. What long-form content do you publish (podcast, coaching calls, webinars)? Length/frequency?
2. How do you currently get short clips made? (DIY, VA, editor, agency)
3. What’s the #1 bottleneck—time, cost, consistency, ideation, captions, formatting?
4. If you could press a button and get 10 ready-to-post clips, what must be true for you to trust it?
5. Which is more valuable: better highlight picking or faster editing?
6. Would you pay **$99/mo** for 30 clips? What would have to be included?
7. Would you pay **$199/mo** for 60 clips + templates + hook suggestions?
8. Would you pay **$299/mo** for diarization + brand voice hooks + team seat?
9. Dealbreakers? (caption accuracy, framing, turnaround, file formats, watermarking)
10. If we offered a DFY pilot first (weekly clips), would you start this week? What’s a fair deposit?

---

## 7) Outreach Templates (Ready to Send)
### Cold email
Subject: Turn your episodes into 10+ Reels/TikToks (done-for-you → SaaS next)

Hey {{Name}} — I’m Bob.

We run **Clip Factory**: we take a long podcast/video and turn it into ready-to-post vertical clips (hooks + captions + 9:16 formatting). Example site for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

If you send 1 episode link, I’ll reply with 3 sample clip ideas (timestamps + hook angles) so you can see if it matches your style.

Worth doing for your next episode?
— Bob
agent_bob_replit+clip-factory@agentmail.to

### LinkedIn DM
Hey {{Name}} — I’m Bob. We help podcasters/coaches turn long videos into ready-to-post Reels/TikToks (hooks + captions + vertical formatting). Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

If you share one episode, I can send back 3 clip angles + timestamps. Want that?

### Follow-up (48 hours)
Bumping this in case it got buried—happy to send 3 clip angles + timestamps from your latest episode. Reply with a link or email it to agent_bob_replit+clip-factory@agentmail.to.

---

## 8) Gated 2-Week Build Plan (ONLY after $5k DFY revenue collected)
### Sprint goal
Deliver a working MVP where a user can submit a YouTube link/upload and export at least 1 vertical clip with captions using a template.

### Week 1
**Day 1:** Finalize scope + success metrics from interviews; lock build-vs-buy decisions.  
*Acceptance:* PRD frozen; top 3 paid features chosen; explicit non-goals listed.

**Day 2:** Bubble app skeleton: auth, dashboard, “new job” form, job status table.  
*Acceptance:* user can create an ingest job and see status placeholders.

**Day 3:** Ingest pipeline: YouTube fetch OR upload storage + background job trigger.  
*Acceptance:* video stored; processing job enqueued; error states shown.

**Day 4:** Transcription integration (Whisper API) + transcript storage.  
*Acceptance:* transcript with timestamps viewable in admin/user UI.

**Day 5:** Highlight detection v1 (LLM prompt + heuristics) producing segments.  
*Acceptance:* at least 10 suggested segments with start/end + title.

### Week 2
**Day 6:** Segment picker + trim UI (basic).  
*Acceptance:* user can adjust in/out points and save selection.

**Day 7:** Template system v1 (2 templates: subtitles style A/B).  
*Acceptance:* user selects a template; settings persisted.

**Day 8-9:** Rendering pipeline (FFmpeg worker or managed render) for 9:16 + burned captions.  
*Acceptance:* a selected segment exports to MP4 1080x1920 with captions; retries on failure.

**Day 10:** Export delivery: download links + expiration policy + basic usage limits.  
*Acceptance:* user downloads file; link works for defined retention period.

**Day 11:** QA + performance checks; define clip length limits; handle common errors.  
*Acceptance:* 95% success on test set; clear user-facing errors.

**Day 12:** Minimal analytics + admin tooling (job logs, rerun, delete).  
*Acceptance:* admin can troubleshoot failed jobs quickly.

**Day 13:** Security + privacy pass; ToS/Privacy draft; watermark off by default.  
*Acceptance:* signed URLs, basic access controls.

**Day 14:** Pilot onboarding (3–5 paying users), collect bug list + must-fix.  
*Acceptance:* at least 3 users successfully export clips; NPS-style feedback collected.

---

## 9) Acceptance Criteria Checklist (MVP “ready”)
- [ ] Paste YouTube URL OR upload MP4
- [ ] Transcript generated and stored with timestamps
- [ ] Highlights suggested (ranked list)
- [ ] User can select + trim segment
- [ ] User can pick 1 of 2 caption templates
- [ ] System exports 9:16 MP4 with burned captions
- [ ] User can download or access a share link
- [ ] Errors are visible; jobs can be retried

**Reminder:** Do not start any of the above build work until $5k DFY revenue is collected.