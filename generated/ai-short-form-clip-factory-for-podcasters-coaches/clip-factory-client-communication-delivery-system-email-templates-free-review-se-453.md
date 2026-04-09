# Clip Factory — Client Communication & Delivery System (Email Templates + Free Review Setup + Pre-Flight Checklist)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:16:46.637Z

---

Below are ready-to-paste templates and checklists for consistent, low-refund delivery. Use these as the default for every order.

=================================================================
A) CLIENT DELIVERY EMAIL TEMPLATE (Ready to send)
=================================================================
Subject: Your clips are ready — review link inside (24h revision window)

Hi {{FirstName}},

Your Clip Factory delivery is ready.

Business site (for reference/legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Support email: agent_bob_replit+clip-factory@agentmail.to

1) Review link (timestamp comments)
- Review here: {{ReviewLink}}
- How to comment: leave notes directly on the video at the exact timestamp (e.g., 00:12 “tighten pause”, 00:19 “caption typo”).

2) What you received (Delivery Pack)
Folder link: {{DriveOrDropboxLink}}
Inside you’ll see:
- /FINAL_MP4/  → platform-ready vertical MP4s
- /CAPTIONS_SRT/ → matching .srt caption files
- /BROLL_CUES/ → cue sheet per clip (timestamps + suggested overlays/b-roll)
- /POSTING_SUGGESTIONS/ → per-clip first-line caption + hashtags + posting notes

3) Revision window + what counts as a free revision
- Please send revision notes within 24 hours of this email.
- Included free revisions cover: typos, caption timing, minor caption phrasing, small trimming/tightening, audio balance tweaks, safe-zone/framing fixes, and small subtitle styling adjustments.

4) When revisions are considered a paid change
Examples: new clip selection/topic changes, adding new footage, new brand direction after delivery, switching hook strategy, or major re-edits beyond the original scope.
If anything falls into this category, I’ll quote it first and only proceed after you approve.

If you want to prioritize the top 1–2 clips for fastest posting, reply with the clip numbers and I’ll tell you which are most likely to perform and why.

Thanks,
Bob Smith
Clip Factory
agent_bob_replit+clip-factory@agentmail.to

=================================================================
B) REVIEW LINK SETUP GUIDE (Free options + standard naming)
=================================================================
Goal: Give clients a single place to leave timestamped comments and reduce back-and-forth.

Option 1 (Preferred free): YouTube Unlisted
1) Upload MP4 as “Unlisted”.
2) Title format: “{{Client}} — Clip {{01}} — {{Hook}} (Review)”
3) Turn on comments.
4) Share link as {{ReviewLink}}.
Notes: Easiest for clients; timestamp comments work well.

Option 2: Vimeo (Free tier where available)
1) Upload as unlisted/private.
2) Enable comments.
3) Share review link.

Option 3: Frame.io (Free tier)
1) Create Project: “{{Client}} — {{Month}} Delivery”.
2) Upload clips; share “Review” link.
3) Ask client to comment at timecode.

Storage for delivery pack (Free): Google Drive
- Folder name: “{{Client}}_ClipFactory_Delivery_{{YYYY-MM-DD}}”
- Subfolders:
  - FINAL_MP4
  - CAPTIONS_SRT
  - BROLL_CUES
  - POSTING_SUGGESTIONS
Permissions:
- Client: Viewer
- Internal team: Editor

File naming convention (critical):
- MP4: {{Client}}_C{{01}}_{{Platform}}_9x16_1080x1920.mp4
- SRT: {{Client}}_C{{01}}.srt
- Cue sheet: {{Client}}_C{{01}}_BrollCues.pdf (or .docx)
- Posting: {{Client}}_C{{01}}_Posting.txt

=================================================================
C) PRE-FLIGHT CLIENT CONFIRMATION CHECKLIST (Before editing begins)
=================================================================
Send this as a quick confirmation message once you have the raw long-form.

1) Platforms + format
- Confirm target platforms: TikTok / Reels / Shorts (check all)
- Confirm output: 9:16 vertical, 1080x1920
- Confirm safe-zone priority: avoid UI overlap (captions & faces)

2) Branding + style
- Brand colors (hex if available): ________
- Font preference (or “use default clean sans”): ________
- Caption style: word-by-word / line-by-line / sentence
- On-screen headline: YES/NO
- Watermark/handle to include: ________

3) Content constraints
- Any banned words/topics: ________
- Any required disclaimers (medical/finance/etc.): ________
- Tone: clean / edgy / professional / playful

4) Hook + CTA
- Primary goal: followers / leads / course sales / newsletter
- CTA link/handle: ________
- Hook preference: curiosity / contrarian / pain-point / list

5) Clip selection rules
- Confirm number of clips: ____
- Confirm average clip length target: ____ seconds
- Confirm whether we can lightly rearrange sentences for clarity: YES/NO

6) Review logistics
- Review method: YouTube unlisted / Vimeo / Frame.io
- Revision window: 24h from delivery email

Client sign-off message to capture:
“Confirmed: platforms, branding, banned topics, CTA, and review method. Proceed.”

=================================================================
D) OPTIONAL: REVISION ACK + REVISION COMPLETE EMAILS (Quick templates)
=================================================================
1) Revision received
Subject: Revisions received — turnaround within 24h

Hi {{FirstName}},
Got your timestamp notes on the review link. I’m working through them now. You’ll have updated files within 24 hours. I’ll reply again as soon as the revised delivery pack is uploaded.

Thanks,
Bob
agent_bob_replit+clip-factory@agentmail.to

2) Revision completed
Subject: Revisions complete — updated files uploaded

Hi {{FirstName}},
Revisions are complete.

Updated delivery pack: {{DriveLink}}
Updated review link (if applicable): {{ReviewLink}}

If anything else needs adjustment, please reply within the remaining revision window and include timestamps.

Thanks,
Bob

=================================================================
Usage notes (internal)
- Always include the business website URL + support email in delivery communications to reduce trust friction.
- Always include the revision window in the first delivery email to prevent scope creep.
- Always require timestamp comments for revision requests to reduce ambiguity and editing time.
