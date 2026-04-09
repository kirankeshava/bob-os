# DFY Clip Factory — Fast Feedback One-Pager + Tally Intake Form Schema + Clip Tracker Spec

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:24:44.420Z

---

# How to Give Feedback Fast (So We Still Hit 48 Hours)

**Clip Factory** delivers 10 ready-to-post vertical clips within 48 hours when feedback is fast and specific.

**Official website (for reference + legitimacy):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3  
**Support email:** agent_bob_replit+clip-factory@agentmail.to

## The 10-minute feedback method (best results)
For each clip, reply with one of the following:
1) **APPROVE** (no changes)
2) **MINOR** (small tweaks that don’t change the chosen moment)
3) **REPLACE** (swap the clip moment entirely)

If MINOR or REPLACE, include **one sentence** answering these 3 prompts:
- **What to change?** (hook text, caption style, remove filler words, tighten pauses, etc.)
- **Where exactly?** Provide timestamp like **00:12–00:18**.
- **What’s the preferred version?** Provide the exact replacement phrase or direction.

### Examples of “fast feedback” we can act on immediately
- “Clip 03: **MINOR** — change hook to ‘3 mistakes first-time buyers make’ at 00:00; remove the ‘um’ at 00:06.”
- “Clip 07: **REPLACE** — choose a moment about ‘pricing objections’ instead of ‘cold outreach’; keep it ~25–35s.”

## What slows delivery (please avoid)
- Vague notes like “make it punchier” without timestamps
- Multiple rounds of small edits over many days
- New brand assets mid-project (fonts/colors/logo) after editing has started

## Revision rules (so the SLA stays protected)
- **Included:** 1 revision round per batch (10 clips), up to **3 clips** revised, **minor** changes only (captions, hook text, small trims, emoji removal, safe-word censoring).
- **Not included:** new clip selection across the whole episode, major re-edits, new b-roll sourcing, new brand kit after delivery.

## Best timeline to keep the 48-hour promise
- We deliver the first pass within 48 hours.
- You send feedback within **12 hours** of receipt.
- We deliver revisions within **24 hours** after feedback (if within scope).

---

# Tally Intake Form Schema (Free Tier) — Copy/Paste Build
**Form title:** Clip Factory Intake — 10 Clips / 48 Hours  
**Intro text:** Provide the info below so we can deliver 10 vertical clips in 48 hours with consistent quality.

## Section A — Contact + Project Basics
1. **Full name** (short text) — required
2. **Email** (email) — required
3. **Brand / Channel name** (short text) — required
4. **Time zone** (dropdown) — required
5. **Primary platform** (multiple choice) — TikTok / Instagram Reels / YouTube Shorts / All three
6. **Secondary platform** (optional)

## Section B — Source Content
7. **Source type** (multiple choice) — Podcast (audio) / Video podcast / Webinar / Coaching call / Course lesson / Other
8. **Source link** (URL) — required (Drive/Dropbox/YouTube unlisted/etc.)
9. **Length of source** (number or dropdown) — <30 min / 30–60 / 60–120 / 120+
10. **Do we have permission to edit/use this content?** (checkbox required) — “Yes, I own or have rights to repurpose this content.”

## Section C — Goals + Audience
11. **Audience** (short text) — required
12. **Primary goal** (multiple choice) — Leads / Book calls / Course sales / Followers / Authority / Other
13. **Offer / CTA** (long text) — what should people do after watching? (follow, DM keyword, book call, download lead magnet)
14. **Any compliance requirements?** (long text) — disclaimers, banned claims, regulated industries

## Section D — Style Preset (choose one)
15. **Choose your preset** (multiple choice) — Real Estate / Fitness / B2B / “Match my existing style”
16. **If matching existing style:** provide 1–3 reference links (URL list)
17. **Brand kit upload or link** (file upload or URL) — logo, colors, fonts (optional but recommended)

## Section E — Content Boundaries
18. **Topics to avoid** (long text)
19. **Words/phrases to censor** (long text)
20. **Name pronunciation notes** (long text)

## Section F — Delivery + Review
21. **Preferred delivery method** (multiple choice) — Google Drive / Frame.io / Other
22. **Reviewer name + email** (short text)
23. **Fast feedback acknowledgement** (checkbox required): “I can provide consolidated feedback within 12 hours to keep the 48-hour timeline.”
24. **Revision scope acknowledgement** (checkbox required): “I understand 1 revision round is included for up to 3 clips (minor edits).”

**Final message / thank you screen:**
“Thanks — we’ll confirm receipt within 2–4 business hours. If anything is missing, email us at agent_bob_replit+clip-factory@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3”

---

# Google Sheets Clip Tracker Spec (Internal) — Build in 5 Minutes
**Workbook name:** Clip Factory — Tracker (Master)

## Tab 1: “Queue” (one row per episode/source)
**Columns:**
- Client
- Episode ID
- Source Link
- Received (date/time)
- SLA Due (date/time = Received + 48h)
- Preset (RE/Fitness/B2B/Custom)
- Platform(s)
- Assigned Editor
- Status (dropdown): Intake / Downloading / Selecting / Editing / QA / Delivered / Revisions / Complete / Blocked
- Blocker Reason
- Notes

**Simple rules:**
- Conditional formatting: SLA Due within 12h = yellow; overdue = red.

## Tab 2: “Clips” (one row per clip)
**Columns:**
- Episode ID (data validation from Queue)
- Clip # (01–10)
- Working Title / Hook
- Timecodes In/Out
- Duration (sec)
- Export Aspect (9:16)
- Captions Style (preset)
- B-roll cues added? (checkbox)
- QA Passed? (checkbox)
- Exported? (checkbox)
- File Name
- Drive/Frame Link
- Client Decision (dropdown): Pending / Approved / Minor / Replace
- Revision Notes

## Tab 3: “QA Checklist” (optional quick reference)
A checklist list (static) matching the internal scorecard: hook timing, safe margins, caption accuracy, audio levels, no truncated words, no watermark, correct end card, correct export preset.
