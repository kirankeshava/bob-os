# Clip Factory — Client Feedback Fast Guide (48h SLA Protector) + Build Specs (Tally Intake + Google Sheets Tracker)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:36:31.240Z

---

# Clip Factory — How to Give Feedback Fast (So We Hit 48 Hours)
**From:** Clip Factory (legitimacy page): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3  
**Contact:** agent_bob_replit+clip-factory@agentmail.to

## Why this matters
Our promise is **10 ready-to-post vertical clips delivered within 48 hours**. The only thing that usually breaks this timeline is slow or unclear feedback. This page shows you how to give feedback in a way that’s fast, unambiguous, and keeps revisions inside scope.

## The 3 feedback rules (read this first)
1) **One message, one pass.** Please consolidate your feedback into a single message per revision round (instead of many small DMs). This prevents mismatched changes and saves hours.
2) **Timestamp everything.** Every change request should reference a timestamp and what to do. Example: “Clip 03 at 00:06–00:08: remove ‘crushing it’ phrase, replace with ‘making progress.’”
3) **Decide what you want changed:**
   - **Content** (what’s said / the hook / the claim)
   - **Captions** (typos, emphasis, word choice)
   - **Visuals** (b-roll cue, emoji/graphics, crop, speaker framing)

## Deadlines that keep the 48-hour timeline
- **Feedback window:** We need feedback **within 12 hours** of sending the review link.
- If feedback arrives later than 12 hours, **delivery shifts** by the same amount of time (because we’re waiting on decisions).

## What “good feedback” looks like (copy/paste format)
Use this template:

**Overall:** (Approve / Minor tweaks / Needs rework)  
**Brand/Compliance:** (Any words to avoid? claims to soften?)  

**Clip-by-clip:**
- Clip 01 — APPROVE
- Clip 02 — Change hook text on-screen: “X” → “Y”. Lower music -3db.
- Clip 03 — 00:03–00:05 replace b-roll cue from “laptop” to “gym floor”.
- Clip 04 — Caption typo at 00:07 “their” → “there”.
…

## What counts as a revision (and what doesn’t)
**Revision =** changes to an existing selected clip: captions, pacing trims, safe hook adjustments, b-roll cue swaps, CTA end-card tweaks, minor reframes.

**Not a revision (new work) =** asking for **new clip selections**, changing the topic angle entirely, or requesting additional clips beyond the package.

## Fast approval option (recommended)
If you’re busy, you can simply reply:
- **“Approved as-is.”**
- Or: **“Approve all except Clip 02 + Clip 05. Fix typos only.”**
This keeps the project moving and still improves quality.

## Common feedback mistakes (that slow everything down)
- “Make it more engaging.” (too vague) → Tell us *where* it dips and what to change (hook, pacing, b-roll, captions).
- “Change the vibe.” → Share a reference link OR say “more punchy captions / less emojis / darker color palette.”
- Feedback scattered across IG DMs + email + notes → Please keep it to **one email thread** to agent_bob_replit+clip-factory@agentmail.to.

## Where to send feedback
Reply to the delivery email or send one consolidated note to: **agent_bob_replit+clip-factory@agentmail.to**.

---

# Build Spec — Tally Intake Form (Free Tier) (Implementation Checklist)
Purpose: Collect everything needed to start editing immediately with minimal back-and-forth.

## Form title
**Clip Factory Intake — 10 Clips / 48 Hours**

## Sections + Fields (exact)
### A) Contact + Business
1. Full name (short text)
2. Brand/business name (short text)
3. Email for delivery + review (email)
4. Best channel for urgent questions (dropdown: Email / WhatsApp / Slack / Other)
5. If Other, specify (short text)

### B) Source Content
6. Upload file OR link (long text): “Google Drive/Dropbox/YouTube link to full episode/video”
7. If link, access granted? (checkbox): “Anyone with link can view/download”
8. Episode length (dropdown: <15m / 15–30m / 30–60m / 60m+)
9. Audio quality issues? (checkboxes): background noise / echo / low volume / multiple speakers / none

### C) Platforms + Output
10. Platforms needed (checkboxes): TikTok / Instagram Reels / YouTube Shorts
11. Safe topic boundaries (long text): “Topics/words to avoid, compliance notes”
12. CTA preference (dropdown): Follow / Comment / DM / Link in bio / Book a call / Other
13. If ‘Book a call’ or ‘Link’, provide URL (short text)

### D) Style Preset (choose one)
14. Preset (single select): Real Estate / Fitness / B2B / “Match my existing style”
15. If “Match my existing style” provide 1–3 links (long text)
16. Brand colors (optional) (long text: hex codes if known)
17. Logo upload (optional file upload) OR link (long text)

### E) Clip Selection Preferences
18. Desired vibe (checkboxes): punchy / calm / authoritative / playful
19. Target audience (short text)
20. “Must include” moments (optional) (long text, allow timestamps)
21. “Do NOT include” moments (optional) (long text, allow timestamps)

### F) Approvals + SLA Acknowledgement
22. Confirm 48-hour SLA starts after we have assets + intake completed (required checkbox)
23. Confirm feedback window: 12 hours from review link to keep timeline (required checkbox)
24. Confirm revision policy: 1 revision round on selected clips (required checkbox)

## Logic (optional, free-tier friendly)
- If preset = “Match my existing style” show field #15.
- If CTA = “Other” show a short text field.

## End screen message
“Thanks — we’ll confirm receipt within 2 hours (business hours). If anything is missing we’ll email you at the address provided. For urgent updates: agent_bob_replit+clip-factory@agentmail.to. Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3”

---

# Build Spec — Google Sheets Clip Tracker (Free) (Implementation Checklist)
Purpose: Run 10 clips per episode through a predictable pipeline with SLA visibility.

## Sheet name
**Clip Factory Tracker — Client / Episode**

## Tabs
1) **Tracker** (main)
2) **Presets** (style notes + export presets)
3) **QA** (checklist reference)

## Tracker tab columns (left to right)
A Client  
B Episode ID (e.g., E042)  
C Source Link  
D Clip # (01–10)  
E Candidate Timestamp Start  
F Candidate Timestamp End  
G Hook Text (on-screen)  
H Status (dropdown)  
I Editor Owner  
J Captions (Y/N)  
K B-roll Cues (Y/N)  
L Pattern Interrupts (Y/N)  
M Exported TikTok (Y/N)  
N Exported Reels (Y/N)  
O Exported Shorts (Y/N)  
P QA Pass (Y/N)  
Q Review Link (Frame.io/Drive)  
R Client Notes  
S Revision Needed (Y/N)  
T Final Link  
U Due Date/Time (48h)  
V Delivered Date/Time

## Status dropdown values (in order)
- Intake Received
- Downloading/Transcoding
- Selecting Highlights
- Editing
- Captions Styling
- B-roll Cues Added
- Exporting
- QA
- Sent for Review
- Revising
- Final Delivered

## Lightweight rules
- Conditional formatting: Status = “Sent for Review” highlight yellow; “Final Delivered” green; “Revising” orange.
- Freeze row 1. Add filter view.

## QA tab (paste checklist headers)
- Hook visible in first 1.5s
- Captions readable (safe margins)
- No filler intro (trimmed)
- Pattern interrupts every 2–3s
- No caption typos
- Audio levels consistent
- CTA end card present
- Export settings correct (1080x1920)

This set of docs is ready to paste into onboarding/delivery emails and to build the form + tracker links on free tools next cycle.