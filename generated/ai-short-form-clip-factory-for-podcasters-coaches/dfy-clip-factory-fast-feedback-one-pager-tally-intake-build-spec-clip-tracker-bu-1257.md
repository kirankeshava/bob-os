# DFY Clip Factory — Fast Feedback One-Pager + Tally Intake Build Spec + Clip Tracker Build Spec

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:18:57.273Z

---

## 1) Client One-Pager: How to Give Feedback Fast (So We Still Hit 48 Hours)

**Welcome to Clip Factory.** Our promise is **10 ready-to-post vertical clips delivered within 48 hours**. The #1 factor that can delay delivery is slow or unclear feedback. This page shows the fastest way to review so we can keep the SLA.

### Where you’ll review
We’ll deliver clips via a review folder/link (Frame.io or Google Drive) and email you from **agent_bob_replit+clip-factory@agentmail.to**.
You can always verify we’re legit here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

### Your feedback checklist (fastest method)
1) **Watch each clip once** (sound ON). 
2) Leave feedback using **timestamps**. Example:
   - Clip 03 — 0:02 change caption to “Stop doing this…”
   - Clip 03 — 0:11 remove “um”
   - Clip 03 — 0:18 add on-screen text “Step 1”
3) Keep notes **specific and actionable** (what to change + where).

### One consolidated message only
Send **one single message** that includes all notes for all clips (bulleted). Avoid multiple back-and-forth messages—those create delays.

### What counts as “in-scope” revisions (included)
You get **1 revision round** that covers:
- Caption text fixes (typos/wording)
- Caption timing adjustments
- Hook swap from the same clip’s first seconds
- Small trims (remove filler words, tighten pauses)
- Basic b-roll swap (from our suggested cues)
- End-card CTA text update (within the preset style)

### What is out-of-scope (new work)
These require a new quote or reset the deadline:
- New clip selection (new moments not already clipped)
- New style direction (different font/brand overhaul)
- Heavy audio repair beyond basic cleanup
- Adding licensed imagery/music you haven’t provided rights for

### The feedback deadline (protects your 48h delivery)
To stay within the 48-hour SLA:
- **Feedback window:** You must send your consolidated notes within **12 hours** of receiving the review link.
- If we don’t receive feedback within 12 hours, we proceed with **best-effort finalization** and deliver the set as complete to protect turnaround.

### The fastest “approval” option
If you like the clips, reply with:
**“Approved — ship as-is.”**
We’ll export final deliverables immediately.

---

## 2) Tally.so Intake Form (Free Tier) — Build Spec (Copy-Ready)

**Goal:** Create a live intake form from our template with zero paid features. Use it as the single source of truth before production starts.

### Account + form setup
- Platform: **Tally.so** (free)
- Account name: **Bob Smith**
- Email: **agent_bob_replit@agentmail.to**
- Form name: **Clip Factory — Client Intake (10 Clips / 48 Hours)**
- After-submit message:
  “Thanks — we received your intake. Next: please upload your source file(s) or share the link(s). We’ll confirm start time within 4 business hours. Questions: agent_bob_replit+clip-factory@agentmail.to | https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3”

### Sections + fields (exact)
**Section A — Contact & Business**
1. Full name (short text) *required*
2. Email (email) *required*
3. Company/Brand name (short text)
4. Website or social link (short text)

**Section B — Content Source**
5. Content type (multiple choice): Podcast video / Zoom recording / Webinar / YouTube video / Other
6. Source link(s) (long text) — “Drive/Dropbox/YouTube link(s)” *required*
7. Do you approve downloads of this content for editing? (yes/no) *required*
8. Episode title (short text)
9. Approx length of source (number + unit minutes)

**Section C — Goals & Audience**
10. Primary goal (multiple choice): Followers / Leads / Course sales / Newsletter / Brand authority
11. Target audience (long text)
12. Offer / CTA (short text): “Book a call / Download / Follow / Subscribe”
13. CTA link (short text)

**Section D — Platforms & Output**
14. Platforms (checkboxes): TikTok / Instagram Reels / YouTube Shorts
15. Preferred clip length (multiple choice): 20–30s / 30–45s / 45–60s / Mixed
16. Output quantity (multiple choice): 10 clips (standard) / Other (if other, specify)
17. Safe topics to emphasize (long text)
18. Topics to avoid (long text)

**Section E — Style Presets**
19. Choose a style preset (multiple choice): Real Estate / Fitness / B2B / “Use my brand kit”
20. If “Use my brand kit,” upload/share brand assets link (long text)
21. On-screen speaker framing preference (multiple choice): Face big / Captions big / Balanced
22. Caption vibe (multiple choice): Clean / Bold / Aggressive hooks

**Section F — Compliance**
23. Do we need to censor profanity? (yes/no)
24. Must include disclaimer? (yes/no + long text)
25. Music: (multiple choice) No music / Light background / Client-provided track only

**Section G — Approval & Timing**
26. Desired delivery deadline/timezone (short text)
27. Who approves final clips? (short text)
28. Agreement checkbox (required):
   “I confirm I have rights to provide this content and approve Clip Factory to edit it for short-form distribution.”

### Settings
- Require email field.
- Allow long-text for links.
- No payments; no custom domain.
- Enable simple notification to **agent_bob_replit+clip-factory@agentmail.to**.

---

## 3) Google Sheets Clip Tracker (Internal) — Build Spec

**Goal:** A single sheet to manage throughput and SLA for multiple clients/episodes.

### Sheet structure (tabs)
**Tab 1: “Pipeline”** (main working view)
**Tab 2: “Lists”** (dropdown values)
**Tab 3: “QA Rubric”** (checkbox reference + scoring weights)

### Tab 2: Lists (create these dropdown lists)
- Status: Intake / Assets Received / Processing / Select Moments / Draft Edit / Captions / QA / Sent for Review / Revisions / Final Export / Delivered
- Platform: TikTok / Reels / Shorts / Multi
- Style: Real Estate / Fitness / B2B / Custom
- Priority: Normal / Rush

### Tab 1: Pipeline columns (left to right)
1. Client
2. Project ID (e.g., CF-YYYYMMDD-Client)
3. Episode Title
4. Source Link
5. Platform (dropdown)
6. Style Preset (dropdown)
7. Clip # (01–10)
8. Clip Working Title (hook phrase)
9. Timestamp In (hh:mm:ss)
10. Timestamp Out (hh:mm:ss)
11. Hook Text (first 1.5s)
12. Caption Template (Preset name + variant)
13. B-Roll Cues (short)
14. Editor Owner
15. Status (dropdown)
16. QA Pass (checkbox)
17. Review Link (Frame.io/Drive)
18. Client Notes Received (checkbox)
19. Revision Round Used (0/1)
20. Final File Link
21. Delivery Date/Time
22. SLA Due Date/Time
23. Notes

### Conditional formatting (fast SLA visibility)
- If Status ≠ Delivered and NOW() > SLA Due Date/Time: highlight row red.
- If Status = Sent for Review and Client Notes Received is unchecked for 12 hours: highlight amber.

### Operating rule (put at top of Pipeline tab)
- “No clip advances to Delivered unless QA Pass = TRUE and Final File Link is present.”

---

If you want, I can also consolidate these into a single PDF-style ‘Fulfillment Runbook’ layout, but the above is already copy/paste-ready and immediately actionable.