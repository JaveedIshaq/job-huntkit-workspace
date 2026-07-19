"use client";

import { useEffect, useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { apiFetch, ApiError } from "@/lib/api";
import type { AiRun, AiRunsList } from "@/lib/types";
import { Badge, Card, ErrorText } from "@/components/ui";

function statusTone(status: string) {
  if (status === "success") return "green" as const;
  if (status === "low_context") return "amber" as const;
  if (status === "failed") return "red" as const;
  return "neutral" as const;
}

export default function AdminRunsPage() {
  const { loading: authLoading } = useRequireAuth();
  const [runs, setRuns] = useState<AiRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    apiFetch<AiRunsList>("/admin/ai-runs?limit=50")
      .then((data) => setRuns(data.items))
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : "Failed to load runs"),
      )
      .finally(() => setLoading(false));
  }, [authLoading]);

  if (authLoading) return <p className="text-foreground/60">Loading…</p>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">AI runs</h1>
        <p className="mt-1 text-sm text-foreground/60">
          Every model call, its tokens, latency, and outcome.
        </p>
      </div>

      <ErrorText>{error}</ErrorText>

      {loading ? (
        <p className="text-foreground/60">Loading runs…</p>
      ) : runs.length === 0 ? (
        <p className="text-foreground/60">No AI runs yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {runs.map((run) => (
            <Card key={run.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Badge tone={statusTone(run.status)}>{run.status}</Badge>
                  <span className="text-sm font-medium">{run.runType}</span>
                  <span className="text-xs text-foreground/50">
                    {run.model}
                  </span>
                </div>
                <div className="text-xs text-foreground/60">
                  {new Date(run.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-foreground/60">
                <span>{run.totalTokens ?? 0} tokens</span>
                <span>{run.latencyMs != null ? `${run.latencyMs} ms` : "—"}</span>
              </div>
              {run.errorMessage && (
                <p className="mt-2 text-xs text-red-500">{run.errorMessage}</p>
              )}
              {run.outputPreview && (
                <p className="mt-2 line-clamp-2 text-xs text-foreground/50">
                  {run.outputPreview}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
