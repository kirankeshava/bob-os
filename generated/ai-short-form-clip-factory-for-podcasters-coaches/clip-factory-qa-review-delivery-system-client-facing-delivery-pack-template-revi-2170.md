# Clip Factory — QA + Review/Delivery System (Client-Facing) + Delivery Pack Template + Revision Triage + Live Link Placeholders

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:02:13.647Z

---

Clip Factory — What to Expect (QA, Review, Delivery, Revisions)
Website (proof/legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Support email: agent_bob_replit+clip-factory@agentmail.to

1) Scope: What you receive per clip
For each approved long-form source, we deliver short-form vertical clips (9:16) designed for TikTok/IG Reels/YouTube Shorts. Each clip includes:
- Final MP4 video (ready to post)
- Captions baked into video (burned-in) + separate .SRT caption file
- “B-roll & on-screen cue sheet” (what to overlay and when)
- Posting suggestions (caption first line hook + CTA + hashtag set)

2) QA Standards (what we check before you see it)
A) Safe framing / no cropped faces
- Primary subject’s face stays inside safe zones (top/bottom UI areas avoided)
- No accidental cropping of eyes/forehead/chin during punch-ins
- On-screen text stays within safe margins (no platform UI overlap)

B) Captions accuracy & readability
- Captions match the spoken words (no meaning-changing errors)
- Punctuation supports clarity; no awkward line breaks
- High-contrast caption styling; readable on mobile
- Profanity/“banned words” handled per your intake instructions

C) Audio leveling
- Loudness normalized for short-form listening
- No clipping/distortion; background noise reduced where possible
- Music (if used) stays below voice and is consistent across cuts

D) Jump cuts & pacing
- Cuts are intentional (remove dead air/um/ramble)
- No jarring micro-cuts that reduce comprehension
- Clip length matches platform intent (typically 15–45s unless requested)

E) Hook clarity (first 1–2 seconds)
- First frame and/or first line clearly signals value or curiosity
- Visual + text hook match the spoken hook

F) Export settings (baseline)
- Format: MP4 (H.264)
- Resolution: 1080x1920 (9:16)
- Frame rate: match source (or 30fps if unknown)
- Audio: AAC, consistent level, no peaking

3) Review Flow (fast + timestamped)
We send a review link for each batch using one of:
- Frame.io (preferred for timestamp comments)
- Vimeo review link
- Unlisted YouTube link (as fallback)

How to leave feedback:
- Leave timestamp comments (e.g., “00:07 change caption to…”, “00:14 remove word…”, “00:20 swap hook text…”) 
- If you have multiple requests, list them in one message with timestamps

Revision window:
- You have 24 hours from delivery of the review link to request included revisions.
- After 24 hours, we assume approval and finalize/close the delivery unless you’ve pre-arranged an extension.

4) Delivery Pack (what you get in the final handoff)
Folder structure (per project):
/ClientName_ProjectName_Date/
  /01_REVIEW_LINKS/
    - ReviewLinks.txt
  /02_FINAL_MP4/
    - Clip_01_TitleHook_1080x1920.mp4
    - Clip_02_TitleHook_1080x1920.mp4
  /03_CAPTIONS_SRT/
    - Clip_01.srt
    - Clip_02.srt
  /04_BROLL_CUE_SHEETS/
    - Clip_01_CueSheet.md (or .pdf)
  /05_POSTING_SUGGESTIONS/
    - Clip_01_Posting.md

Posting suggestions format (per clip):
- Platform(s): TikTok / Reels / Shorts
- First-line caption (hook):
- Caption body (optional):
- CTA:
- Hashtags (10–20):
- Best posting note (optional): keep under 2 lines, add pin comment prompt, etc.

5) Issue Triage: what’s a free revision vs. a paid change (Week 1 policy = free service, but we still set boundaries)
Included (free) revisions within the 24-hour window:
- Caption corrections (typos, mishears, punctuation that changes meaning)
- Reframing fixes (cropped face, text outside safe area)
- Audio fixes (levels clearly off, clipping, obvious noise artifact)
- Minor timing trims (remove a short pause, tighten a sentence)
- Swap 1 hook text style or first-line caption (if same message)

Not included (scope change — treated as a new request after Week 1):
- Changing the chosen clip moment/topic (new segment selection)
- Full rewrite of captions to a new tone/voice after editing is complete
- Adding new b-roll sequences beyond the cue plan (new creative direction)
- Replacing music/visual style across all clips after approval
- Major restructuring (new narrative arc) or adding net-new clips beyond agreed count

6) Pre-flight Intake (required before editing starts)
We will request your intake form to avoid preventable revisions. Intake Form Link (to be inserted): {{GOOGLE_FORM_LINK}}
We confirm:
- Platforms (TikTok/Reels/Shorts)
- Your handle, CTA link, and any banned words
- Caption style (clean vs. verbatim), emoji preferences
- Branding: colors/fonts (if any), logo (if provided)
- Content constraints (medical/financial claims, profanity rules)

7) Live Links (to be inserted into emails)
- Public “What to Expect” page: {{NOTION_PAGE_LINK}}
- Client Intake Form: {{GOOGLE_FORM_LINK}}

EMAIL TEMPLATES (paste-ready)

A) Intake / Start Confirmation Email
Subject: Clip Factory — intake received + next steps
Hi {{FirstName}},
Thanks — we’re ready to start your clip batch.

1) Please complete the intake form (required): {{GOOGLE_FORM_LINK}}
2) Here’s exactly what to expect (QA, review, delivery, revisions): {{NOTION_PAGE_LINK}}

Once we have your intake responses, we’ll confirm:
- platforms + caption style
- banned words/claims constraints
- handle/CTA

If you want us to prioritize a specific moment or theme from the episode, reply with 2–3 timestamps.

— Bob
agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

B) Delivery / Review Link Email
Subject: Your clips are ready for review (24h revision window)
Hi {{FirstName}},
Your clips are ready for review.

Review link: {{REVIEW_LINK}}
How to comment: please leave timestamp notes (e.g., 00:07 change caption…)
Revision window: 24 hours from now (until {{REVISION_DEADLINE}})

Delivery pack will include:
- Final MP4s
- .SRT caption files
- B-roll cue sheet(s)
- Posting suggestions (first line caption + hashtags)

Full process (QA/review/delivery/revisions): {{NOTION_PAGE_LINK}}

— Bob
agent_bob_replit+clip-factory@agentmail.to

C) Revision Received (Acknowledgment)
Subject: Revisions received — we’re on it
Hi {{FirstName}},
Got it — thanks for the timestamp notes. We’re applying the requested changes now.

If anything else comes up, please keep it in the same thread with timestamps so nothing is missed.

We’ll send the updated review/delivery shortly.
— Bob

D) Revision Completed (Handoff)
Subject: Updated clips delivered
Hi {{FirstName}},
Revisions are complete.

Updated link/folder: {{DELIVERY_LINK}}
What’s inside:
- Updated MP4(s)
- Updated SRT(s) (if captions changed)
- Posting suggestions (if hook/caption changed)

If everything looks good, reply “Approved” and we’ll mark the batch complete.
— Bob

INTERNAL FINAL QC (editor checklist, quick pass)
- Watch full clip on mobile aspect ratio preview
- Confirm no face cropping + text safe margins
- Verify captions match meaning; scan for names/numbers
- Loudness check: no clipping; voice clear
- Export MP4 settings correct; file plays on phone
- Package: MP4 + SRT + cue sheet + posting suggestions in correct folders
- Links: permissions set to “anyone with link can view/comment” for review; “view/download” for final
