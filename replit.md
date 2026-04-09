# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **AI**: OpenAI via Replit AI Integrations (gpt-5.2)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

### Bob - Entrepreneur Agent (`artifacts/bob-dashboard`)
- **Path**: `/`
- **Type**: react-vite
- **Description**: "BOB_OS" — Entrepreneur AI agent mission control. Starts with $1000, targets $100k in 30 days.
- **Pages**:
  - `/` — Mission Control dashboard with capital trajectory, 5 business cards, summary stats, agent runs
  - `/businesses/:id` — Business detail + Kanban board + Website & Inbox panel
  - `/businesses/:id/tasks/:taskId` — Task detail with comment thread
  - `/businesses/:id/performance` — Business performance metrics (financials, growth, feedback, competitors)
  - `/agent-runs` — Agent run monitor with live polling
  - `/sites/:id` — Public-facing business website (no admin chrome, AI-generated content)

### API Server (`artifacts/api-server`)
- **Path**: `/api`
- **Type**: Express 5 REST API
- **Routes**:
  - `GET/POST /businesses` — CRUD for business opportunities
  - `GET/POST/PATCH/DELETE /businesses/:id` — Business management
  - `GET/POST /businesses/:id/tasks` — Task management per business
  - `GET/PATCH/DELETE /tasks/:id` — Task CRUD
  - `GET/POST /tasks/:id/comments` — Task comments and feedback
  - `GET /dashboard/summary` — High-level stats
  - `POST /agent/research` — Trigger AI researcher agent (gpt-5.2)
  - `POST /agent/orchestrate/:businessId` — Trigger AI orchestrator agent
  - `GET /agent/runs` — List all agent runs
  - `GET /agent/runs/:id` — Get run status
  - `GET/POST /businesses/:id/site` — Business website CRUD + GET /site/public + POST /site/generate (AI)
  - `GET/POST /businesses/:id/inbox` — AgentMail inbox messages + send email + email log
  - `GET /skills` — List installed skills
  - `GET /skills/search?q=` — Search GitHub for skills (SKILL.md repos)
  - `POST /skills/install` — Install a skill by GitHub source (fetches SKILL.md)
  - `PATCH /skills/:id` — Toggle skill status (active/disabled)
  - `DELETE /skills/:id` — Remove a skill
  - `GET/PATCH /businesses/:id/performance` — Business performance metrics (income, spend, users, health score, etc.)
  - `GET/POST/DELETE /businesses/:id/performance/feedback` — Customer feedback CRUD
  - `GET/POST/DELETE /businesses/:id/performance/competitors` — Competitor tracking CRUD
  - `GET/POST /customers` — Customer management with payment method support
  - `GET /customers/zelle/contact-info` — Get Zelle contact info
  - `POST /customers/:id/mark-paid` — Admin: mark Zelle customer as paid
  - `GET /customers/:id/paypal-checkout` — Redirect to PayPal subscription checkout
  - `POST /customers/:id/paypal-checkout` — Create PayPal checkout session (JSON response)
  - `POST /api/paypal/webhook` — PayPal webhook handler with signature verification
  - `GET /businesses/:id/knowledge-base` — List all KB entries for a business
  - `POST /businesses/:id/knowledge-base/upload` — Upload a file (PDF, DOCX, TXT) to the KB; text is extracted asynchronously
  - `POST /businesses/:id/knowledge-base/url` — Add a URL to the KB; content is crawled asynchronously
  - `DELETE /businesses/:id/knowledge-base/:entryId` — Delete a KB entry
  - `GET /customers/:id/reviews` — List all reviews for a customer
  - `POST /customers/:id/reviews` — Batch import reviews for a customer
  - `GET /customers/:id/reports` — List 7-day report schedule and history

## Database Schema (PostgreSQL via Drizzle)

- `businesses` — Business opportunities with market data, TAM, revenue targets
- `tasks` — Tasks per business with status (open/in_progress/waiting_approval/closed), agent type, priority (critical/high/medium/low)
- `task_comments` — Comments on tasks from user, orchestrator, agents, CEO, or Executive Orchestrator
- `agent_runs` — Tracking AI agent executions (researcher, orchestrator)
- `business_sites` — AI-generated website content per business (slug, hero, services, pricing, howItWorks, accentColor, AgentMail inbox)
- `outreach_emails` — Log of emails sent/received via AgentMail per business
- `skills` — Dynamic skills (SKILL.md packages from GitHub) with name, slug, source, content, status (active/disabled), businessId (null = global)
- `ceo_reviews` — CEO operating assessments per business (mode, oneMetric, runwayStatus, topPriority, weeklyRevenueTarget, taskDirectives JSON)
- `knowledge_base_entries` — Customer-specific knowledge base with entryType (file|url), sourceName, sourceUrl, rawText, status (processing|ready|error), errorMessage
- `customers` — Customer signups with trial/subscription status, Stripe ID, review platform URLs, paymentMethod (stripe|paypal|zelle), paypalSubscriptionId
- `reviews` — Customer reviews (platform, rating, author, text, date, AI-proposed reply text, respondedAt)
- `daily_reports` — 7-day report schedule per customer (dayNumber 1-7, sentAt, emailMessageId, reportData JSON)
- `business_performance` — Per-business performance metrics (income, monthlySpend, netBurnProfit, runwayDays, reached, signups, activeUsers, arpu, churnRate, npsScore, healthScore, topSources, notes)
- `customer_feedback` — Customer feedback entries per business (source, text, sentiment, date)
- `competitors` — Tracked competitors per business (name, strengths, weaknesses, pricing, notes)

## Knowledge Base System

Enables operators to ground AI reply suggestions in business-specific content:
- **File upload**: Accepts PDF (via pdf-parse), DOCX (via mammoth), TXT files up to 20 MB; text extracted asynchronously after 201 response
- **URL ingestion**: Crawls websites via axios + cheerio, strips navigation/scripts, saves up to 100k chars of plain text; processed asynchronously
- **AI integration**: Before generating email replies in `monitorInboxes()`, top-3 relevant KB entries are keyword-scored against the inbound message and injected into the OpenAI prompt
- **Mission Control UI**: "Knowledge Base" tab on business detail page with URL input, file upload widget, entry list with type badge / status chip / source name / delete button; status auto-refreshes every 5s

## Daily Review Reports System

Delivers automated 7-day email series to each new customer during their trial:
- **Review seeding**: 12 realistic sample reviews auto-seeded on customer signup (so day-1 report is non-empty)
- **7-day schedule**: On signup, 7 `daily_reports` rows created (days 1-7); sent when `daysSinceSignup >= dayNumber`
- **Report generation**: `services/report-generator.ts` computes avg rating, star distribution, trend; selects 3 newest + 3 lowest-rated reviews; calls OpenAI (gpt-4.1-mini) to generate proposed reply for each
- **Email rendering**: Polished HTML email with inline CSS — sections: Summary stats, Latest Reviews, Needs Attention, Proposed Replies (copy-paste ready)
- **Scheduler**: `sendDueReportEmails()` runs hourly in the orchestrator loop; sends via AgentMail; persists sentAt + reportData
- **Dashboard**: "View Reports" toggle on each customer row — shows stats, 7-day schedule buttons, report preview, and recent reviews with AI replies

## AI Integration

- Provider: OpenAI via Replit AI Integrations (no API key required)
- Model: gpt-5.2 for researcher, orchestrator, and CEO review agents; gpt-4.1-mini for auto-orchestrator decisions and review reply generation
- Researcher agent: Finds top 5 business ideas, saves to DB
- Orchestrator agent: Creates 5-8 tasks per business with agent assignments

## Skills System

Dynamic skill acquisition from GitHub repositories (skills.sh ecosystem):
- **Skills API**: `GET /api/skills`, `GET /api/skills/search?q=`, `POST /api/skills/install`, `PATCH /api/skills/:id`, `DELETE /api/skills/:id`
- **Skill injection**: Before each task execution, active skills matching the task's title/agentType are injected into the agent's system prompt
- **Orchestrator suggestions**: When creating task plans, orchestrator checks installed skills and logs which ones will augment each task as comments
- **Skills UI**: `/skills` page in Bob dashboard with installed skills list (toggle/remove) and GitHub search to discover/install new ones
- Skills source from GitHub via `https://raw.githubusercontent.com/{source}/main/SKILL.md` or `master/SKILL.md`

## Agent Architecture

Bob OS uses a two-layer agent system:

### CEO Layer (Bob)
- Runs `ceoReviewTick()` every 5 minutes
- Produces strategic assessment: mode (wartime/peacetime), runwayStatus (alive/at_risk/dead), oneMetric, topPriority
- Sets `weeklyRevenueTarget` — concrete dollar milestone for the 7-day window
- Produces `taskDirectives` — JSON array of `{taskId, priority, reason}` for task re-prioritization
- Applies directives to DB immediately, posts CEO priority comment on each reprioritized task
- Focuses on distribution → revenue → product fire hierarchy

### Executive Orchestrator Layer
- Runs `autoOrchestratorTick()` on every orchestrator tick (every 30s) when tasks are in `waiting_approval`
- Uses AI to classify: is this a GENUINE financial spend (>$10 real money) or false alarm?
- Non-financial blocks → auto-approved immediately, task resumes, orchestrator posts explanation comment
- Genuine financial decisions → escalated to Bob with a comment flagging the amount
- Prevents Bob from being a bottleneck on non-financial task approvals

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
