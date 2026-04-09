# DFY Clip Factory — Live Ops Addendum (Tally Intake Form Spec + Feedback-Fast One-Pager + Google Sheets Tracker Setup)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:03:48.325Z

---

## 1) Tally.so Intake Form (Free) — Build Spec (Copy/Paste)

**Form title:** DFY Clip Factory Intake — 10 Clips / 48 Hours

**Header (top of form):**
Convert long-form into ready-to-post vertical clips (hooks + captions + b-roll cues) delivered within 48 hours.

Legitimacy links:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
- Contact: agent_bob_replit+clip-factory@agentmail.to

**Section A — Client + Billing (lightweight)**
1) Full Name (required)
2) Brand/Company Name (required)
3) Email (required)
4) Time zone (dropdown)
5) Best place for fast questions (dropdown): Email / Instagram / WhatsApp / Slack
6) Handle or link (short answer)

**Section B — Source Content (required to start)**
7) Source type (dropdown): YouTube link / Google Drive / Dropbox / Riverside / Zoom / Local file
8) Source link(s) (long answer) + access notes
9) Episode title / working name (short answer)
10) Total length (dropdown): <30m / 30–60m / 60–120m / 120m+
11) Audio quality (dropdown): Clean / Some noise / Lots of noise
12) Number of speakers (dropdown): 1 / 2 / 3+

**Section C — Goals + Target Viewer**
13) Niche (dropdown): Real Estate / Fitness / B2B / Other (short answer follow-up)
14) Primary goal (dropdown): Leads / Followers / Webinar signups / Course sales / Brand authority
15) Target viewer (short answer)
16) Offer/CTA destination (short answer): website / booking link / IG profile / lead magnet

**Section D — Platforms + Output Requirements**
17) Platforms (multi-select): TikTok / Instagram Reels / YouTube Shorts
18) Deliverable count (dropdown): 10 clips (default) / Other (requires approval)
19) Aspect ratio (fixed): 9:16
20) Max clip length preference (dropdown): 15–30s / 30–45s / 45–60s

**Section E — Style (choose one preset)**
21) Choose style preset (required):
- Real Estate (clean, premium)
- Fitness (high-energy)
- B2B (minimal, trust)
- Provide my own brand kit

22) If “Provide my own brand kit”: upload or link to:
- Logo (PNG)
- Brand colors
- Fonts
- Examples you like

23) Caption position preference (dropdown): Bottom safe-zone / Mid-lower / Speaker-tracking (if possible)
24) Caption emphasis (dropdown): Minimal / Medium / Aggressive (highlight keywords)

**Section F — Compliance + No-Go Topics (protects you + us)**
25) Words/topics to avoid (long answer)
26) Required disclaimers (long answer)
27) Rights confirmation (checkbox): “I own/authorize use of this content.”

**Section G — Examples + Notes**
28) Links to 3 example clips you love (long answer)
29) Anything else we should know? (long answer)

**Tally confirmation message (on submit):**
Thanks — we received your intake.
Within 4 business hours we’ll confirm receipt and delivery window via agent_bob_replit+clip-factory@agentmail.to.
If you need to add files/links, reply to that email with the subject: “ADD FILES — [Brand] [Episode]”.

**Internal Tally tags (optional):** #new-intake #48h #10clips #preset-RE / #preset-FIT / #preset-B2B

---

## 2) Client One-Pager — “How to Give Feedback Fast (So We Still Hit 48 Hours)”

**Title:** How to Give Feedback Fast (So We Still Hit 48 Hours)

We deliver 10 clips within 48 hours by keeping feedback tight, specific, and batch-based. Here’s how to review in minutes — not hours.

**Where you’ll review**
You’ll receive a review link (Frame.io or a shared Google Drive folder) plus a simple list of clip filenames.
Website for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
Support email: agent_bob_replit+clip-factory@agentmail.to

**The 3 feedback types (use these labels)**
1) **MUST FIX (objective)** — wrong word, wrong name, missing disclaimer, bad cut, captions unreadable.
2) **PREFERENCE (subjective)** — change hook phrasing, different music vibe, different caption emphasis.
3) **APPROVED** — ready to post.

**How to leave feedback (best format)**
For each clip, reply with one line:
- `APPROVED — CLIP_03`
- `MUST FIX — CLIP_07 — caption says “$50k” should be “$15k”`
- `PREFERENCE — CLIP_02 — make hook text smaller + remove emoji`

**Batch your feedback (saves the SLA)**
- Watch 2 clips first. If the style is off, tell us once — we’ll apply the change to the remaining clips.
- Avoid giving different style notes clip-by-clip unless it’s a MUST FIX.

**What we can revise fast (within scope)**
- Caption wording/typos, caption position, basic hook text, small trim changes, CTA end card text.

**What usually breaks the 48-hour timeline**
- New creative direction after delivery
- Requesting new clips beyond the original 10
- Asking for full re-edit of the long-form episode

**Default rule:** If you can answer “Is this on-brand and accurate?” with yes, mark APPROVED and post. Speed > perfection.

---

## 3) Google Sheets Clip Tracker — Setup Spec (Share-Link Ready)

**Goal:** one sheet that shows intake → production → QA → delivery at a glance for 10 clips/episode.

**Create a Google Sheet named:** `ClipFactory_Tracker_MASTER`

### Tab 1: `Queue`
**Columns (left to right):**
A Client
B Episode_ID (e.g., CLF-2026-04-09-ACME-001)
C Source_Link
D Preset (RE/FIT/B2B/Custom)
E Platforms (TT/IG/YT)
F Clip_Count (default 10)
G SLA_Start (datetime)
H SLA_Due (datetime)
I Status (dropdown)
J Owner
K Notes

**Status dropdown values:** Intake / Downloading / Selecting / Editing / QA / Sent for Review / Revisions / Delivered / Blocked

**Conditional formatting:**
- If Status = Blocked → red fill
- If NOW() > SLA_Due and Status ≠ Delivered → dark red
- If SLA_Due within 8 hours and not Delivered → orange

### Tab 2: `Clips`
One row per clip.

**Columns:**
A Episode_ID
B Clip_Number (01–10)
C Clip_FileName
D Hook_Text
E Timecode_In
F Timecode_Out
G Length_s
H Pattern_Interrupts_Checked (checkbox)
I Captions_Checked (checkbox)
J Broll_Cues_Added (checkbox)
K Platform_Exports (TT/IG/YT)
L QA_Pass (checkbox)
M Review_Status (dropdown)
N Client_Notes
O Editor

**Review_Status dropdown:** Pending / Approved / Must Fix / Preference / Replaced

### Tab 3: `QA_Scorecard`
**Columns:**
A Clip_FileName
B Audio clear (checkbox)
C Hook in first 1.5s (checkbox)
D Captions legible + safe-zone (checkbox)
E No jump-cut errors (checkbox)
F CTA end card present (checkbox)
G Export correct (checkbox)
H Notes

### Operating rule
No clip moves to “Sent for Review” until `QA_Pass = TRUE` OR a manager explicitly marks it “Ship Anyway” in Notes (used only when the SLA is at risk).

---

**Next step once these are instantiated:** add the live Tally link + the live Google Sheet link into the onboarding email so every client flows into the same tracking system automatically.