# HuntKit — RAG-Grounded Job Application Assistant

## Overview
HuntKit is a full-stack job-hunting tool I designed and built to analyze job descriptions against my real resume and project history. A user pastes a job description and gets a match analysis, tailored application bullet points, and interview prep — every suggestion grounded in retrieved chunks from my actual experience, with citations. The goal is to avoid the "generic ChatGPT invents resume bullets" problem by only surfacing claims supported by real profile context.

## Tech Stack
- Backend: NestJS, TypeScript
- Database: PostgreSQL with the pgvector extension (Supabase as Postgres host)
- ORM: Prisma for typed CRUD, plus raw SQL ($executeRaw / $queryRaw) for vector operations
- Auth: NestJS JWT with Passport (bcrypt password hashing)
- AI: OpenAI text-embedding-3-small for embeddings and gpt-4o-mini for structured analysis
- Frontend: Next.js (App Router)
- Deploy: Render (API) and Netlify (web)

## Architecture
I used a single-backend architecture where NestJS owns all secrets, validation, auth, and data access. The Next.js frontend is a thin client that only knows the API URL and never touches the database or AI keys directly. Every request flows through Guard (auth) then Pipe (validation) then a thin Controller then a Service that holds the business logic. Every database query is scoped by user_id to prevent data leaks in a multi-user setting.

## What I Built
- JWT auth module (register, login, me) with bcrypt and a Passport JWT strategy.
- Jobs CRUD module with per-user scoping, status pipeline (saved, applied, screening, interview, offer, rejected, withdrawn), and DTO validation using class-validator.
- Profile ingestion pipeline that saves resume and project sources, chunks the text on markdown headings, embeds each chunk with OpenAI, and stores the vectors in a pgvector column via raw SQL inserts.
- Retrieval service that embeds a query and finds the closest profile chunks using pgvector cosine distance.
- AI analyze feature that embeds a job description, retrieves the top matching profile chunks, and prompts an LLM to return strengths, honest gaps, application bullets, interview questions, and citations as structured JSON.
- Observability via an ai_runs table that logs model, token counts, latency, and status for every AI call.

## AI and RAG Details
RAG stands for Retrieval-Augmented Generation. Instead of asking the model to answer from memory, I first retrieve relevant chunks of my own resume and projects, then pass them to the model as grounding context. I embed text with text-embedding-3-small (1536 dimensions) and store vectors in a pgvector column. Similarity is computed with the cosine-distance operator. If the best retrieval score falls below a configurable threshold, the run is marked low_context so the system refuses to fabricate experience and instead reports the requirement as a gap.

## Challenges and Trade-offs
- Prisma cannot write the pgvector type through normal create calls, so I insert embeddings using tagged-template raw SQL that casts a numeric array string to ::vector while keeping values as safe bound parameters.
- I chose pgvector over a separate vector database to keep the stack simple and avoid extra infrastructure for an MVP.
- I capped job-description length and used gpt-4o-mini to control OpenAI cost.
- Honest gaps are a deliberate product feature: the system lists missing requirements rather than inventing qualifications.

## Outcome
HuntKit doubles as both a portfolio piece demonstrating production RAG and a tool I use for my own job applications — a working example of dogfooding an AI product end-to-end.
