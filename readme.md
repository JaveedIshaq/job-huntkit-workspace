# HuntKit

A job-search assistant: save a job, get a RAG-grounded analysis of how your real experience matches it (strengths, gaps, application bullets and interview prep, each cited to your own profile), plus a separate eligibility verdict for remote work, contract type and pay. Track jobs from saved to applied.

- Web: https://hunt-kit.netlify.app/
- API health: https://job-huntkit-workspace.onrender.com/api/v1/health

Stack: pnpm + Turborepo monorepo, NestJS API, PostgreSQL + pgvector (Supabase), Prisma 7, OpenAI, Next.js web app.
