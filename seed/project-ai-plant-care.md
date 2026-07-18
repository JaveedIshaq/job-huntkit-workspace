# AI Plant Detection and Care App

## Overview
A full-stack plant-care product that helps users identify plants and get diagnosis support, care recommendations, and automated follow-up guidance. I built it end-to-end: a Flutter mobile app for users, a Next.js admin panel for operators, and a NestJS backend with PostgreSQL, enhanced with practical AI features.

## Tech Stack
- Mobile: Flutter, Dart
- Frontend (admin): Next.js, TypeScript
- Backend: NestJS, TypeScript
- Database: PostgreSQL, Supabase, pgvector
- AI: OpenAI API, structured outputs, RAG-style semantic search

## What I Built
- A NestJS backend exposing REST APIs consumed by both the Flutter mobile app and the Next.js admin dashboard.
- PostgreSQL schema and data flows for plants, diagnoses, care plans, and user history.
- pgvector-based semantic search so users could find relevant plant care information by meaning rather than exact keywords.
- OpenAI structured outputs to produce reliable, machine-readable diagnosis support and care recommendations.
- Automated follow-up workflows that scheduled and delivered care reminders and next steps.

## AI and Retrieval Details
I used pgvector to store embeddings of plant care content and performed semantic search to retrieve the most relevant material for a given user query or diagnosis. OpenAI structured outputs constrained the model to return well-formed data that the app could parse and act on directly, which made the AI features dependable enough for production use rather than free-form text.

## My Role and Ownership
I owned end-to-end delivery: database schema, backend APIs, background processing, mobile UI, and admin panel. This project combined my long mobile background (Flutter) with modern TypeScript full-stack work (NestJS, Next.js, PostgreSQL) and applied AI integration in a real product.

## Outcome
The app delivered intelligent diagnosis support and smart recommendations to real users, demonstrating a complete pipeline from data model to AI feature to shipped mobile and web interfaces.
