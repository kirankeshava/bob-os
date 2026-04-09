# Clip Factory — Publishing & Link Insertion SOP (Notion Onboarding Page + Google Intake Form + Email Template Updates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:00:36.093Z

---

Purpose
Turn the existing onboarding assets into live, shareable links (Notion page + Google Form) and insert those links into the client emails so every order has a single source of truth. This reduces missed expectations, revision churn, and refund risk.

Brand references to use everywhere
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Client contact email: agent_bob_replit+clip-factory@agentmail.to

Part A — Publish the Notion “What to Expect” page (free)
1) Create/login to Notion
- Go to https://www.notion.so/
- Sign up/login using:
  - Name: Bob Smith
  - Email: agent_bob_replit@agentmail.to
- Use the free plan.

2) Create the page
- Create a new page titled exactly:
  “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”
- Paste in the full copy from the previously prepared “Publish-Ready Notion Page Copy” (keep headings intact).
- Ensure the page includes:
  - The website URL above (legitimacy)
  - The support email agent_bob_replit+clip-factory@agentmail.to
  - The 24-hour revision window policy and how to leave timestamped comments

3) Publish + capture URL
- Click Share → toggle “Publish to web” ON.
- Optional but recommended: enable “Allow duplicate as template” OFF (prevents clients duplicating internal process language).
- Copy the public page URL.
- Save it as:
  NOTION_ONBOARDING_URL = <paste URL>

Part B — Create the Google Form intake (free)
Goal: collect all requirements before editing begins to prevent avoidable revisions.

1) Google account access
- If you already have a Google account for agent_bob_replit@agentmail.to, use it.
- If not, create one at https://accounts.google.com/signup using:
  - First name: Bob
  - Last name: Smith
  - Email: agent_bob_replit@agentmail.to (or closest allowed)

2) Create the form
- Go to https://forms.google.com → Blank form
- Form title:
  “Clip Factory — Client Intake (Clips & Posting Preferences)”
- Form description (paste):
  “This 3–5 minute intake ensures your clips match your brand, platforms, and goals. If anything changes after editing begins, it may be treated as a paid change depending on scope. Questions? agent_bob_replit+clip-factory@agentmail.to | Legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”

3) Build fields (minimum required set)
Set required = YES unless noted.
- Contact email (Short answer)
- Brand / Channel name (Short answer)
- Primary platform(s) (Checkboxes): TikTok, Instagram Reels, YouTube Shorts, LinkedIn, Other
- Clip goal (Multiple choice): Followers, Leads, Course/coaching sales, Podcast growth, Awareness
- CTA (Short answer): e.g., “Follow for more,” “DM ‘COACH’,” “Link in bio,” etc.
- Preferred tone (Multiple choice): High-energy, Calm/authoritative, Funny, Educational, Other
- Hook style (Checkboxes): Contrarian, Curiosity gap, Clear promise, Story, Statistic, Question
- Caption style (Multiple choice): Word-for-word, Cleaned-up (light polish), Condensed highlights
- Branding (Short answer, optional): handle, URL, preferred on-screen text, brand colors
- Banned words/topics (Paragraph)
- Examples you like (Links) (Paragraph, optional)
- Source file link (Short answer): Drive/Dropbox link to long video/podcast
- Deadline / target posting date (Date)

4) Confirmation message
Set confirmation message to:
“Thanks — we’ve received your intake. Next: we’ll confirm specs before editing starts. If you have urgent changes, email agent_bob_replit+clip-factory@agentmail.to.”

5) Share settings + capture URL
- Click Send → Link icon → copy link.
- Ensure form can accept responses.
- Save it as:
  GOOGLE_INTAKE_FORM_URL = <paste URL>

Part C — Insert links into client emails (finalize templates)
Replace placeholders in all templates as follows:
- {{NOTION_ONBOARDING_URL}} → NOTION_ONBOARDING_URL
- {{GOOGLE_INTAKE_FORM_URL}} → GOOGLE_INTAKE_FORM_URL

1) Intake email (send immediately after purchase)
Subject: Next step — Clip Factory intake (so your clips match your brand)
Body (insert links):
“Thanks for your order. Please complete this intake form first: {{GOOGLE_INTAKE_FORM_URL}}

What to expect (QA standards, review steps, delivery pack, revision window): {{NOTION_ONBOARDING_URL}}

Questions anytime: agent_bob_replit+clip-factory@agentmail.to
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”

2) Delivery email (send with review link + folder link)
Add a “How review works” line:
“How review works (timestamp comments + 24h revision window): {{NOTION_ONBOARDING_URL}}”

3) Revision Received (ack)
Add:
“Revision policy & timeline: {{NOTION_ONBOARDING_URL}}”

4) Revision Completed (handoff)
Add:
“For future orders, our full workflow is here: {{NOTION_ONBOARDING_URL}}”

Part D — QA gate before sending any link to a client (1-minute check)
- Notion page opens without login in an incognito window
- Google Form opens without login in an incognito window
- Both pages show the correct contact email: agent_bob_replit+clip-factory@agentmail.to
- Both pages reference the legitimacy website URL
- Links pasted into templates are correct (no extra characters)

Owner-ready output checklist
You are done when you have:
1) NOTION_ONBOARDING_URL saved
2) GOOGLE_INTAKE_FORM_URL saved
3) Intake + Delivery + Revision templates updated with live links
4) Confirmed both links work in incognito

No paid tools required. If later you want branded domains, advanced review tooling, or automation (Zapier/Make), that would be optional and would require separate spend approval.