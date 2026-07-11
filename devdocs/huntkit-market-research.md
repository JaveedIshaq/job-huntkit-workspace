# HuntKit — Market Research & Backend Choice

**Purpose:** Answer whether HuntKit already exists as open source, and whether FastAPI or NestJS is the better backend for this project.

**Related:** [huntkit-mvp-spec.md](./huntkit-mvp-spec.md)

**Date:** 9 July 2026

---

## Is HuntKit Already Built and Open Source?

**Your exact project (`HuntKit` as described in the spec) does not appear to exist as an open-source repo.** Nobody has shipped that name + that NestJS/pgvector/Next.js stack as a public OSS project.

But three important caveats:

### 1. The name "HuntKit" is already taken commercially

[HuntKit.gg](https://www.huntkit.gg/) is a **proprietary SaaS** — not open source — that does job tracking, AI resume scoring, cover letters, interview prep, and a Chrome extension. Feature overlap with your spec is high. That is a **brand collision risk**, not a reason to stop building, but you may want a different public name (e.g. `HuntProfile`, `JDMatch`, `ApplyGrounded`).

### 2. A GitHub repo named `huntkit` exists — wrong product

[`assafkip/huntkit`](https://github.com/assafkip/huntkit) is an **OSINT / investigation toolkit** for Claude Code. Unrelated to job hunting.

### 3. The *concept* is crowded in open source

Many OSS projects cover 60–90% of your MVP:

| Project | Stack | Overlap with your spec |
|---------|-------|------------------------|
| [wihlarkop/applykit](https://github.com/wihlarkop/applykit) | Docker, BYOK AI | JD analysis, tailored CV/cover letter, kanban tracker |
| [Gsync/jobsync](https://github.com/Gsync/jobsync) | Next.js | Application tracker + AI resume/job matching |
| [harshitwandhare/job-sentinel](https://github.com/harshitwandhare/job-sentinel) | Python, local-first | Profile↔job match, ATS docs, pipeline |
| [humancto/mr-jobs](https://github.com/humancto/mr-jobs) | Python | AI scoring, tailored applications, pipeline |
| [AdrianZaplata/job-rag](https://github.com/AdrianZaplata/job-rag) | **FastAPI + pgvector** | Very close: RAG, skill gaps, structured extraction, observability |
| [MohamedGamal04/Matchr](https://github.com/MohamedGamal04/Matchr) | FastAPI + pgvector + React | Resume↔job semantic match with citations-style explain |
| [p-s-vishnu/rag-job-application-assistant](https://github.com/p-s-vishnu/rag-job-application-assistant) | Python/Streamlit | Basic RAG cover letters from CV + JD |
| [Blakeinstein/HuntOS](https://github.com/Blakeinstein/HuntOS) | SvelteKit + agents | Auto-apply + resume tailoring (your spec explicitly cuts this) |

**Bottom line:** The idea is not novel. Your differentiation is narrow but real:

- **RAG with citations** from *your* resume/projects (not generic ChatGPT bullets)
- **AI run observability** (tokens, latency, retrieved chunks) as a demo story
- **Your stack** (NestJS + pgvector + Next.js) as contractor portfolio proof
- **"I built the tool I used to land interviews"** — the product *is* the case study

Do not pitch this as "nobody has done this." Pitch it as **grounded, cited, observable AI on a stack clients hire for**.

---

## FastAPI vs NestJS for This Backend

For **this specific MVP**, the RAG pipeline is simple:

```
chunk → embed → pgvector search → structured LLM JSON → log ai_runs
```

That does not need Python's ML ecosystem. Both frameworks handle it fine.

### FastAPI — technically strong for AI prototypes

**Pros:**

- Most similar OSS projects use Python ([job-rag](https://github.com/AdrianZaplata/job-rag), [Matchr](https://github.com/MohamedGamal04/Matchr))
- Rich AI tooling (Instructor, LangChain, RAGAS eval)
- Fastest path if AI/RAG is the *only* goal

**Cons:**

- Splits your stack: Next.js (TS) + API (Python)
- Does not strengthen your **NestJS contractor credibility gap**
- Harder to sell as one TypeScript full-lifecycle story

### NestJS — better choice **for you**

**Pros:**

- **Locked in your spec and AGENTS.md** — this is your contractor bridge stack
- Same language across API, Next.js admin, and AI glue code
- OpenAI SDK + Zod/class-validator structured outputs work well
- pgvector via Prisma `$executeRaw` is enough for MVP
- Deploy story matches remote job postings (NestJS + PostgreSQL + Next.js)
- Interview line writes itself: *"I shipped RAG in NestJS with pgvector and AI observability"*

**Cons:**

- Less AI tutorial content than Python
- You build chunking/embedding helpers yourself (still ~1 day of work)

### Verdict

| Criterion | Winner |
|-----------|--------|
| Fastest AI prototype | FastAPI |
| Simplest single-language stack with Next.js | NestJS |
| Best for **your** portfolio + contracting goal | **NestJS** |
| Best for **this** MVP complexity | Tie — both are fine |

**Use NestJS.** FastAPI would be rational if you were building a research RAG platform or joining a Python/ML team. You are building a **7-day portfolio weapon** for Full-Stack Mobile Product Engineer contracts. The backend choice is a positioning decision, not a technical bottleneck.

The only case to switch: if you already have a working FastAPI RAG pipeline you can fork in 2 hours. Otherwise, ship the spec as written.

---

## Strategic Note

The crowded OSS landscape is not a blocker — **shipping in 7 days is**. [job-rag](https://github.com/AdrianZaplata/job-rag) and [ApplyKit](https://github.com/wihlarkop/applykit) prove demand. Your edge is:

1. **You** using it on real applications this week
2. A **deployed demo URL** + Loom
3. **Citations + AI run logs** as the interview story
4. **NestJS** on the resume, not Python

Consider renaming away from `HuntKit` before you publish — [huntkit.gg](https://www.huntkit.gg/) already owns that brand in this space.
