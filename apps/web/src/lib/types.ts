export type User = {
  id: string;
  email: string;
  displayName: string | null;
  headline: string | null;
};

export type AuthResponse = { accessToken: string; user: User };

export type Job = {
  id: string;
  company: string;
  roleTitle: string;
  jobUrl: string | null;
  location: string | null;
  status: string;
  jdText: string;
  notes: string | null;
  appliedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type JobsList = {
  items: Job[];
  countsByStatus: Record<string, number>;
};

export type LatestAnalysis = {
  analysisId: string;
  runId: string | null;
  requirementSummary: string;
  strengths: Strength[];
  gaps: Gap[];
  applicationBullets: Bullet[];
  interviewQuestions: Question[];
  citations: Citation[];
  overallMatchScore: number;
  createdAt: string;
} | null;

export type Source = {
  id: string;
  sourceType: string;
  title: string;
  status: string;
  chunkCount: number;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Strength = { text: string; chunkId?: string };
export type Gap = { text: string; suggestion?: string };
export type Bullet = { text: string; chunkIds?: string[]; confidence?: string };
export type Question = {
  question: string;
  whyLikely?: string;
  prepHint?: string;
};
export type Citation = {
  chunkId: string;
  sourceTitle: string;
  excerpt: string;
  score: number;
};

export type AnalysisResult = {
  analysisId: string | null;
  runId: string;
  status: "success" | "low_context" | "failed" | string;
  message?: string;
  bestScore?: number;
  requirementSummary?: string;
  strengths?: Strength[];
  gaps?: Gap[];
  applicationBullets?: Bullet[];
  interviewQuestions?: Question[];
  citations?: Citation[];
  overallMatchScore?: number;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  latencyMs?: number;
};

export type Stats = {
  jobsTotal: number;
  appliedCount: number;
  analysesCount: number;
  tokensThisWeek: number;
};

export type AiRun = {
  id: string;
  runType: string;
  model: string;
  promptTokens: number | null;
  completionTokens: number | null;
  totalTokens: number | null;
  latencyMs: number | null;
  status: string;
  errorMessage: string | null;
  inputPreview: string | null;
  outputPreview: string | null;
  createdAt: string;
};

export type AiRunsList = {
  items: AiRun[];
  total: number;
  limit: number;
  offset: number;
};

import { JobStatus } from "@huntkit/shared";

export const JOB_STATUSES = Object.values(JobStatus);
