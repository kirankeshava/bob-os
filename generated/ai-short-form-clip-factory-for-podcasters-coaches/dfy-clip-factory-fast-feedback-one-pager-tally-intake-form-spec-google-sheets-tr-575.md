# DFY Clip Factory — Fast Feedback One-Pager + Tally Intake Form Spec + Google Sheets Tracker Spec

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:24:01.810Z

---

# How to Give Feedback Fast (So We Still Hit 48 Hours)

**Clip Factory Website (legitimacy + process):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3  
**Support / send notes to:** agent_bob_replit+clip-factory@agentmail.to

## What you’ll receive
Within **48 hours** of receiving your source video + brand assets, you’ll get:
- **10 vertical clips** (9:16) ready for TikTok / Reels / Shorts
- Burned-in captions + hook titles
- Optional end card CTA
- A review link (Frame.io or Drive)

## Your review window (important)
To keep the **48-hour delivery**, you agree to review within:
- **12 hours** of us sending the first cut/review link

If feedback arrives later, delivery may shift to the next business day.

## What “good feedback” looks like (fastest)
Please leave **timestamped notes** on the review link (preferred), or email us with:
1) **Clip number / filename** (example: `C03_ColdOpen_RealEstate_01.mp4`)  
2) **Timestamp** (example: `00:04–00:07`)  
3) **One clear action** (example: “Replace caption line with: ‘3 ways to raise rents without renovations’”)  

### Great examples
- “C02: 00:00–00:02 change hook text to ‘Stop losing leads to Zillow.’”
- “C05: 00:08 cut 0.5s of pause.”
- “C07: swap end card CTA to ‘Book a consult’.”

### Slow examples (hard to implement)
- “Make it punchier.”
- “I don’t like it.”
- “Can we redo the whole thing?”

## Allowed revisions (keeps scope tight)
Included in your package:
- **1 revision round per clip** (up to 10 clips)
- Revisions include: caption text tweaks, minor timing trims, hook swap from existing footage, end card/CTA change, emoji/underline emphasis adjustments.

Not included (requires a new order or timeline extension):
- New clip selection from scratch across the full episode
- Major storyline restructuring
- New brand design system creation
- Heavy audio repair that requires manual re-editing of the full episode

## The “Priority 3” method (so we fix what matters)
If you have lots of notes, pick your top 3 priorities:
1) **Hook** (first 1–1.5s) — does it stop the scroll?
2) **Clarity** — do captions match the audio and read cleanly?
3) **CTA** — does the last screen tell people what to do?

Send us your “Priority 3” and we’ll optimize those first.

## Approval = ready to post
If you reply with **“Approved”** (or no notes within the review window), we will:
- Finalize exports
- Deliver the final folder
- Close the batch as complete

---

# Tally.so Intake Form Spec (Free Tier) — Copy/Paste Build
Use this to build the real form in ~10 minutes. Account name: **Bob**. Email: **agent_bob_replit@agentmail.to**.

## Form Title
**Clip Factory Intake — 10 Clips in 48 Hours**

## Intro Text (top of form)
Submit this form + your source link. Delivery starts once we have your source + brand assets. Questions? agent_bob_replit+clip-factory@agentmail.to  
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

## Section A — Contact
1. **Full name** (required)
2. **Email** (required)
3. **Company/Brand name** (optional)
4. **Timezone** (required; dropdown: PT/MT/CT/ET/UK/EU/AU/Other)

## Section B — Content Source
5. **Source type** (required; dropdown): Podcast video / Zoom recording / Webinar / YouTube video / Other
6. **Link to source file** (required): Drive/Dropbox/YouTube URL
7. **Length of source** (required; dropdown): <30 min / 30–60 / 60–120 / 120+
8. **Do we have permission to edit + republish this content?** (required; checkbox yes)

## Section C — Output Targets
9. **Platforms** (required; multi-select): TikTok / Instagram Reels / YouTube Shorts
10. **Primary goal** (required; dropdown): Leads / Followers / Sales / Book calls / Newsletter signups
11. **Audience** (required; short text)

## Section D — Style & Brand
12. **Pick a style preset** (required; dropdown): Real Estate / Fitness / B2B / Use my brand kit
13. **Brand kit link (logo, colors, fonts)** (optional, but required if “Use my brand kit”)
14. **On-screen speaker label?** (optional; yes/no)
15. **Caption tone** (required; dropdown): Clean & pro / Bold & punchy / Minimal

## Section E — Compliance / Avoid List
16. **Words/claims to avoid** (optional)
17. **Required disclaimer text (if any)** (optional)

## Section F — CTA & Links
18. **CTA** (required; short text): e.g., “Book a call”
19. **CTA link** (optional)
20. **Handle(s)** (optional): IG/TikTok/YT

## Section G — Turnaround Confirmation
21. **48-hour turnaround starts when we have source + assets** (required; checkbox)
22. **Feedback window: 12 hours after first cut** (required; checkbox)
23. **Revision policy: 1 round per clip** (required; checkbox)

## Final Thank-You Screen
“Thanks—your batch is queued. If you haven’t shared your source link/brand kit yet, please do so now. For support: agent_bob_replit+clip-factory@agentmail.to”

---

# Google Sheets Clip Tracker Spec (Internal)
Create one Google Sheet per client, or one master with a tab per client.

## Tabs
1. **Overview** (dashboard)
2. **Clips** (main tracker)
3. **Notes/Assets** (brand kit + links)

## Tab: Clips — Columns (left to right)
A. Client
B. Episode/Source ID
C. Clip # (C01–C10)
D. Working Title (hook)
E. Timecode In
F. Timecode Out
G. Duration (sec)
H. Hook Type (dropdown): Contrarian / List / Mistake / Secret / Proof / Story
I. Status (dropdown): Intake / Sourcing / Selected / Draft Edit / Captions / QA / Sent for Review / Revisions / Final Delivered
J. Editor Owner
K. QA Owner
L. Due (date/time)
M. First Cut Sent (date/time)
N. Client Feedback Received (date/time)
O. Revision Notes Link (URL)
P. Final Export Link (URL)
Q. Filename (final)
R. Platform Preset (dropdown): TikTok / Reels / Shorts / All
S. QA Pass (checkbox)
T. Issues (short text)

## Data validation (dropdown values)
- **Status:** Intake, Sourcing, Selected, Draft Edit, Captions, QA, Sent for Review, Revisions, Final Delivered
- **Hook Type:** Contrarian, List, Mistake, Secret, Proof, Story
- **Platform Preset:** TikTok, Reels, Shorts, All

## Conditional formatting (suggested)
- If Status ≠ “Final Delivered” AND Due < NOW(): row turns light red
- If Status = “Sent for Review” AND (NOW() - First Cut Sent) > 12 hours: row turns orange
- If QA Pass unchecked AND Status = “QA”: highlight yellow

## Overview tab (simple)
- Client name, batch start time, SLA deadline time
- Counts by status (use COUNTIF)
- “At risk” count = overdue + waiting feedback >12h

## Notes/Assets tab fields
- Intake form link response
- Source link
- Brand kit link
- CTA text + link
- Preset chosen
- Delivery folder link
- Frame.io review link

This spec is designed so we can stand up the tracker in minutes and enforce the SLA mechanically (statuses + due times + conditional alerts).