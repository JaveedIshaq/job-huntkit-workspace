# Project: HuntKit — RAG Job-Hunt Assistant (NestJS + Next.js + pgvector)

**Type:** Indie / learning product + daily job-search tool (solo full-stack ownership)  
**Status (2026):** Live MVP — API on Render, web on Netlify; dogfooded for remote Flutter / Nest / AI job search from Pakistan  
**Live:**
- Web: https://hunt-kit.netlify.app/
- API: https://job-huntkit-workspace.onrender.com (`/api/v1/health`)
**One-liner:** Paste a job description → get RAG-grounded match analysis, application bullets, and interview prep cited from your real resume and projects — plus geo/pay eligibility for remote candidates.

---

## What I built

I designed and shipped **HuntKit** as a Turborepo monorepo:

| App / package | Role |
|---------------|------|
| `apps/api` | NestJS REST API — JWT auth, jobs, profile ingest, RAG analyze, AI run logs |
| `apps/web` | Next.js App Router UI — dashboard, jobs, profile sources, analysis, theme |
| `packages/shared` | Shared TypeScript types/enums (e.g. `JobStatus`) |
| `supabase/migrations` | Postgres schema + pgvector + eligibility column |

**Interview framing:** Generic ChatGPT invents resume bullets. HuntKit only suggests claims grounded in retrieved chunks from my actual profile sources — with citations and logged AI runs.

---

## Problem & product

Job seekers (including me) waste time on roles that fail work-auth / remote / pay filters, and paste JDs into ChatGPT that hallucinate experience.

HuntKit:
1. Stores resume + project write-ups as profile sources  
2. Chunks + embeds them into Postgres (`pgvector`)  
3. On analyze: embeds the JD → cosine similarity retrieval → LLM structured JSON  
4. Returns skill match **and** application eligibility (Pakistan remote, ~$2k floor, worldwide/contractor preference)  
5. Tracks job pipeline status and AI cost/latency observability  

**Not in MVP:** LinkedIn auto-apply, resume designer, billing, Flutter client (scaffold exists; web-first).

---

## Architecture

```
Next.js (Netlify)          NestJS (Render)              Postgres (Supabase host)
apps/web                   apps/api                     + pgvector
  JWT in client  ──HTTPS──►  Auth / Jobs / Profile
  NEXT_PUBLIC_API_URL only     Analyze / Admin            OpenAI
  No DB / OpenAI keys          Prisma + $queryRaw           embed + chat
```

**What / Why / How**
- **What:** UI never holds secrets; Nest owns auth, validation, OpenAI, and SQL.  
- **Why:** Safer deploy split; one place for RAG and eligibility rules.  
- **How:** Login → JWT → `Authorization: Bearer` on `/api/v1/*`; every query scoped by `user_id`.

Auth is **NestJS JWT** (bcrypt + Passport) — Supabase is used as **Postgres host**, not Supabase Auth in the web app.

---

## RAG & AI pipeline (core engineering)

### Profile ingest
1. Create/update source (`resume` | `project` | `notes`) with markdown content  
2. Chunk text → `text-embedding-3-small` (1536-dim) → `profile_chunks.embedding`  
3. Status `processing` → `ready` / `failed`; reindex on content change  
4. Log tokens/latency in `ai_runs` (`profile_ingest`)

### Retrieval
- Embed JD query (truncated for cost)  
- Raw SQL cosine distance (`<=>`) over user’s ready chunks (IVFFlat index)  
- Top-k chunks with scores fed into the analyze prompt  

### Job analyze
- System prompt: strengths/gaps/bullets/questions **only** from PROFILE CONTEXT; cite `chunkId`s  
- Separate **eligibility** object from JD + candidate constraints (geo, work-auth, language, pay vs floor) — does **not** invent skills from profile  
- Skill `overallMatchScore` stays independent of eligibility verdict (`apply` / `apply_low_priority` / `skip`)  
- Persist `job_analyses` (+ `eligibility` JSONB) and `ai_runs` (`job_analyze`) with retrieved chunk IDs  
- Low-context path when no chunks / weak retrieval  

### Extra AI helpers
- **Parse job page:** paste LinkedIn/etc. page text → structured company / title / location / JD fields (`gpt-4o-mini`, logged with `metadata.kind: parse_job_page`)

**Models:** `text-embedding-3-small`, `gpt-4o-mini`.

---

## NestJS API modules

| Module | Responsibility |
|--------|----------------|
| **auth** | Register/login, JWT issue/validate |
| **jobs** | CRUD application pipeline; paste-page parse; status enum from shared package |
| **profile** | Sources CRUD, chunk/embed ingest, retrieval search, view/edit source content |
| **analyze** | RAG job analysis + eligibility; OpenAI chat JSON completion |
| **admin** | Owner observability — AI runs list/stats (tokens, latency, status) |
| **health** | Liveness + DB check |

Validation via class-validator DTOs; Prisma for CRUD; `$queryRaw` / `$executeRaw` for vectors.

---

## Data model (high level)

- `users` — email, password_hash, display_name, headline  
- `profile_sources` / `profile_chunks` — RAG corpus + `vector(1536)` + IVFFlat  
- `jobs` — company, role, JD text, URL, location, status (`saved` → `offer` / `rejected` / …)  
- `job_analyses` — strengths, gaps, bullets, interview Qs, citations, match score, **eligibility**  
- `ai_runs` — run_type, model, tokens, latency, status, retrieved_chunk_ids, metadata  

Migrations under `supabase/migrations/` (schema + eligibility column).

---

## Next.js web (`apps/web`)

- Login / register, dashboard, jobs list + detail (analyze / re-analyze, status, eligibility card)  
- Profile sources: add, view, edit + re-embed  
- Paste job page → AI fill create form  
- AI Runs observability  
- Light/dark theme (semantic CSS tokens, Plus Jakarta Sans)  
- Talks only to Nest via `NEXT_PUBLIC_API_URL`  

Stack: Next.js 16, React 19, TypeScript, Tailwind CSS v4.

---

## Engineering practices

- Monorepo: pnpm + Turborepo; shared package for cross-app types  
- Secrets only on API (OpenAI, JWT, `DATABASE_URL`); web is thin client  
- Structured LLM JSON outputs with parse/fallback eligibility defaults  
- Explicit anti-hallucination rules in prompts (cite chunks or list gaps)  
- Candidate constraints as injectable prompt section (Pakistan remote / pay floor) — tunable without UI hardcoding  
- Deploy: Render (API) + Netlify (web); local `./run-front-back-dev` for parallel API+web  
- Learn-and-build doc as architecture + phase tracker (`devdocs/huntkit-learn-and-build.md`)

---

## Skills demonstrated (for job matching)

NestJS, TypeScript, REST APIs, JWT authentication, Passport, Prisma, PostgreSQL, pgvector, RAG, embeddings, OpenAI API, structured outputs / JSON mode, prompt engineering, retrieval evaluation (score thresholds), Next.js App Router, React, Tailwind CSS, monorepo (pnpm, Turborepo), Render, Netlify, AI observability / cost logging, product thinking for developer tools, end-to-end ownership from schema to production deploy.

---

## Role summary (resume-style bullets)

- Built HuntKit end-to-end: NestJS API + Next.js UI + Postgres/pgvector RAG to analyze job descriptions against real profile chunks with citations.  
- Implemented profile ingest (chunk → embed → IVFFlat search) and job analyze pipeline with `gpt-4o-mini` structured JSON, AI run logging (tokens, latency, retrieved IDs).  
- Separated skill match score from application eligibility (remote scope, work-auth, language, pay floor) so geo filters don’t fake a low skills score.  
- Added job-page paste extraction, profile source edit/reindex, and owner AI-run observability; deployed API to Render and web to Netlify.  
- Designed auth and data access so the browser never holds DB or OpenAI secrets — Nest owns validation, RAG, and multi-tenant `user_id` scoping.

---

## How to add this to HuntKit Profile

1. Open HuntKit → **Profile** → Add source  
2. Type: **project**  
3. Title: `HuntKit — NestJS RAG job analyzer (pgvector + OpenAI)`  
4. Paste this entire file (or Role summary + Architecture + RAG pipeline if shorter)  
5. Click **Add & embed source**

File path in this repo: `profile-sources/huntkit-project.md`
