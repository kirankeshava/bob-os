# Clip Factory — Live Onboarding Kit (Notion Publish Layout + Google Intake Form Setup + Updated Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T21:11:05.547Z

---

Below is the final, execution-ready onboarding kit. It is designed so an operator can publish a public Notion page + create a Google Intake Form on free tiers, then drop the links into the email templates with zero ambiguity.

========================================
A) NOTION PAGE — PASTE LAYOUT (Client-Facing)
Page title:
“Clip Factory — What to Expect (QA, Review, Delivery & Revisions)”

Top banner (first block):
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

Section 1 — Overview
We turn long-form podcast/video episodes into ready-to-post vertical clips (TikTok/Reels/Shorts) with:
• Strong hook (first 1–2 seconds)
• Burned-in captions (readable, platform-safe)
• Clean jump cuts and pacing
• Optional b-roll cues (what to overlay and when)
• Delivery pack: MP4 + SRT + cue sheet + posting suggestions

Section 2 — What you send us
• Source video link/file (best quality available)
• Any “must include” moments or timestamps
• Your target platforms (TikTok / IG Reels / YT Shorts)
• Brand details (fonts/colors if any), handle(s), CTA, forbidden words

Section 3 — Our QA Standards (what we check before you ever see it)
Framing & Safe Zones
• Subject’s face never cropped; eyes/forehead/chin stay in frame
• No UI elements covered by captions
• Safe zones respected for each platform (top/bottom overlays avoided)

Captions
• Accurate transcription (names/brands corrected)
• Punctuation and line breaks optimized for readability
• Caption placement avoids covering faces
• Consistent style across all clips

Audio
• Voice is clear and consistent across jump cuts
• No clipping/distortion; reduced background noise
• Music (if used) stays below voice and doesn’t trigger obvious distraction

Editing & Hook
• Hook clarity in first 1–2 seconds (intrigue + context)
• Tight pacing; dead air removed
• Jump cuts feel intentional (no jarring audio pops)

Export & Platform Formatting
• Vertical 9:16 output
• Correct resolution (1080x1920 preferred)
• MP4 (H.264) for universal upload compatibility

Section 4 — Review Flow (timestamp comments)
You’ll receive:
1) A private review link (Frame.io / Vimeo / unlisted YouTube) for timestamped comments
2) A delivery folder with the full delivery pack

How to request changes:
• Leave timestamped comments directly on the review link
• Or reply by email with timestamps (mm:ss) and exact text changes

Revision window:
• 24 hours from the time we send the first review link

Section 5 — What’s in your Delivery Pack
Folder contains:
• Final MP4(s) — ready to post
• SRT caption file(s) — for platforms that accept uploads
• B-roll cue sheet — suggested overlays and timestamps
• Posting suggestions — first-line caption + hashtag set + CTA options

Section 6 — Revisions & Scope (to protect deadlines)
Free revisions (within 24 hours):
• Caption text fixes (misheard word, punctuation)
• Minor timing tweaks (caption sync, cut timing)
• Small crop/position adjustments (face safe)
• Audio balance tweaks (voice/music levels)

Not free / considered a new request:
• New creative direction after approval (“change the style entirely”)
• Swapping to a different clip selection/topic after delivery
• Major restructuring (new hook concept, new storyline)
• Additional clips beyond the agreed quantity

If something is our mistake (missed requirement you provided before editing), we fix it.

Section 7 — How to get the best results (client tips)
• Tell us your audience and the outcome you want (leads, followers, awareness)
• Share examples of clips you like
• Provide your CTA (follow, comment, book call, download)

Closing block:
Questions? Email agent_bob_replit+clip-factory@agentmail.to

========================================
B) NOTION — PUBLISHING SOP (Internal)
Goal: produce a public URL to paste into onboarding emails.

1) Create/Log in to Notion
• Use email: agent_bob_replit@agentmail.to
• Name: Bob Smith

2) Create new page
• Title exactly as above
• Paste the page content using the section layout

3) Turn on sharing
• Click “Share” (top right)
• Toggle “Share to web” ON
• Allow “Duplicate as template” OFF (prevents client copying internal ops)
• Indexing by search engines: OFF (keep it semi-private)

4) Copy public link
• Confirm link opens in an incognito window without login
• Save as: NOTION_EXPECTATIONS_URL

========================================
C) GOOGLE INTAKE FORM — BUILD SPEC + SETTINGS (Client-Facing)
Form title:
“Clip Factory — Client Intake (Clips)” 
Form description:
“Fill this out once per project so we can match your brand, platforms, and CTA. If anything changes later, email agent_bob_replit+clip-factory@agentmail.to.”

Required settings (to prevent access friction):
• Do NOT require sign-in
• Collect email addresses: ON (if available without login requirement)
• Allow response editing: OFF
• Limit to 1 response: OFF
• Confirmation message: “Thanks — we received your intake. We’ll confirm pre-flight before editing starts.”

Questions (suggested types):
1) Your name (Short answer) — Required
2) Business/brand name (Short answer) — Optional
3) Best email for delivery/review links (Short answer) — Required
4) Source link(s) to long video/podcast (Paragraph) — Required
5) What platforms do you want clips for? (Checkboxes) — Required
   - TikTok
   - Instagram Reels
   - YouTube Shorts
6) Target audience (Paragraph) — Required
7) Goal of these clips (Multiple choice) — Required
   - Drive followers
   - Drive comments/engagement
   - Drive leads/book calls
   - General awareness
8) Desired tone (Multiple choice) — Required
   - High-energy
   - Calm/authoritative
   - Educational
   - Storytelling
   - Other (short answer)
9) CTA to include (Short answer) — Required
10) Your handle(s) and links to include (Paragraph) — Required
11) Banned words / topics / compliance notes (Paragraph) — Optional
12) Caption style preference (Multiple choice) — Required
   - Clean (minimal, readable)
   - Bold (bigger, more emphasis)
   - Karaoke-style (word-by-word emphasis)
13) Examples you like (links) (Paragraph) — Optional
14) “Must include” moments (timestamps or descriptions) (Paragraph) — Optional
15) Anything we should avoid in framing (e.g., show logo, avoid background) (Paragraph) — Optional

Save and capture:
• GOOGLE_INTAKE_FORM_URL

========================================
D) UPDATED CLIENT EMAIL TEMPLATES (Drop-in)
IMPORTANT: Replace placeholders before sending.
Placeholders:
{{NOTION_EXPECTATIONS_URL}} and {{GOOGLE_INTAKE_FORM_URL}}

D1) Intake / Kickoff Email
Subject: Clip Factory — Quick intake to start your clips

Hi {{ClientName}},

To start your Clip Factory order, please complete this intake form:
{{GOOGLE_INTAKE_FORM_URL}}

What to expect (QA standards, review flow, delivery pack, revisions):
{{NOTION_EXPECTATIONS_URL}}

Once we receive your intake, we’ll run a quick pre-flight check (platform format, caption style, CTA, banned words) and confirm we’re aligned before editing begins.

If you have must-include moments, drop timestamps in the form (mm:ss) or reply to this email.

Thanks,
Bob
agent_bob_replit+clip-factory@agentmail.to
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

D2) Delivery Email (Review Link + Delivery Pack)
Subject: Your clips are ready — review link + delivery pack

Hi {{ClientName}},

Your clips are ready.

1) Review link (leave timestamped comments):
{{REVIEW_LINK}}

2) Delivery folder (MP4s + SRT + cue sheet + posting suggestions):
{{DELIVERY_FOLDER_LINK}}

Revision window:
Please send any revision notes within 24 hours (by {{REVISION_DEADLINE_LOCAL_TIME}}). The fastest way is timestamped comments on the review link.

What’s included in your pack:
• Final MP4(s)
• SRT captions
• B-roll cue sheet
• Posting suggestions (first-line caption + hashtags)

What to expect / revision policy:
{{NOTION_EXPECTATIONS_URL}}

Thanks,
Bob
agent_bob_replit+clip-factory@agentmail.to
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

D3) Revision Received (Acknowledgment)
Subject: Revisions received — we’re on it

Hi {{ClientName}},

Got your revision notes — thank you.
We’re working through the timestamped comments/notes now and will send an updated version as soon as they’re complete.

Reminder: revision notes are handled within the 24-hour window from initial delivery. If you think anything is out of scope (new direction/new clip selection), reply here and we’ll confirm the best path.

Thanks,
Bob
agent_bob_replit+clip-factory@agentmail.to

D4) Revision Completed (Updated Deliverables)
Subject: Revisions complete — updated clips attached/linked

Hi {{ClientName}},

Revisions are complete.

Updated review link (if applicable):
{{UPDATED_REVIEW_LINK}}

Updated delivery folder:
{{DELIVERY_FOLDER_LINK}}

If everything looks good, you’re clear to post.

Thanks,
Bob
agent_bob_replit+clip-factory@agentmail.to

========================================
E) INTERNAL FINAL QC HANDOFF (1-minute checklist)
Before sending Delivery Email:
• Review link opens (incognito) + timestamp comments enabled
• Delivery folder permissions set to “Anyone with link can view”
• Filenames match: Client_Project_Clip01_TT-IG-YTS_v1.mp4
• MP4 plays on mobile; captions readable; no cropped face
• SRT present and matches clip count
• Cue sheet and posting suggestions included
• Revision deadline calculated and inserted

End of kit.
