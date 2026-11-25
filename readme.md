# HuntKit

A job-search assistant: save a job, get a RAG-grounded analysis of how your real experience matches it (strengths, gaps, application bullets and interview prep, each cited to your own profile), plus a separate eligibility verdict for remote work, contract type and pay. Track jobs from saved to applied.

## Try it live

Open **https://hunt-kit.netlify.app/** and log in with the demo account:

| Email | Password |
|---|---|
| `demo@huntkit.app` | `demopassword123` |

The API runs on Render's free tier, so the first request after a quiet period can take up to a minute while the server wakes up.

- API health: https://job-huntkit-workspace.onrender.com/api/v1/health

Stack: pnpm + Turborepo monorepo, NestJS API, PostgreSQL + pgvector (Supabase), Prisma 7, OpenAI, Next.js web app.
