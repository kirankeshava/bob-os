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

## Database Schema (PostgreSQL via Drizzle)

- `businesses` — Business opportunities with market data, TAM, revenue targets
- `tasks` — Tasks per business with status (open/in_progress/waiting_approval/closed), agent type, priority (critical/high/medium/low)
- `task_comments` — Comments on tasks from user, orchestrator, agents, CEO, or Executive Orchestrator
- `agent_runs` — Tracking AI agent executions (researcher, orchestrator)
- `business_sites` — AI-generated website content per business (slug, hero, services, pricing, howItWorks, accentColor, AgentMail inbox)
- `outreach_emails` — Log of emails sent/received via AgentMail per business
- `skills` — Dynamic skills (SKILL.md packages from GitHub) with name, slug, source, content, status (active/disabled), businessId (null = global)
- `ceo_reviews` — CEO operating assessments per business (mode, oneMetric, runwayStatus, topPriority, weeklyRevenueTarget, taskDirectives JSON)

## AI Integration

- Provider: OpenAI via Replit AI Integrations (no API key required)
- Model: gpt-5.2 for researcher, orchestrator, and CEO review agents; gpt-4.1-mini for auto-orchestrator decisions
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
