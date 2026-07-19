"use client";

import { useCallback, useEffect, useState } from "react";
import { useRequireAuth } from "@/lib/auth";
import { apiFetch, ApiError } from "@/lib/api";
import type { Source } from "@/lib/types";
import { AddSourceForm } from "@/components/add-source-form";
import { Badge, Button, Card, ErrorText } from "@/components/ui";

function statusTone(status: string) {
  if (status === "ready") return "green" as const;
  if (status === "processing") return "amber" as const;
  if (status === "failed") return "red" as const;
  return "neutral" as const;
}

export default function ProfilePage() {
  const { loading: authLoading } = useRequireAuth();
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const { items } = await apiFetch<{ items: Source[] }>("/profile/sources");
      setSources(items);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load sources");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    void (async () => {
      await load();
    })();
  }, [authLoading, load]);

  async function reindex(id: string) {
    setBusyId(id);
    setError("");
    try {
      await apiFetch(`/profile/sources/${id}/reindex`, { method: "POST" });
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Reindex failed");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this source and its embeddings?")) return;
    setBusyId(id);
    setError("");
    try {
      await apiFetch(`/profile/sources/${id}`, { method: "DELETE" });
      setSources((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  if (authLoading) return <p className="text-foreground/60">Loading…</p>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Profile sources</h1>

      <Card>
        <h2 className="mb-4 font-medium">Add a source</h2>
        <AddSourceForm onAdded={(s) => setSources((prev) => [s, ...prev])} />
      </Card>

      <ErrorText>{error}</ErrorText>

      {loading ? (
        <p className="text-foreground/60">Loading sources…</p>
      ) : sources.length === 0 ? (
        <p className="text-foreground/60">
          No sources yet. Add your resume above.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {sources.map((s) => (
            <Card key={s.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{s.title}</span>
                    <Badge tone="blue">{s.sourceType}</Badge>
                    <Badge tone={statusTone(s.status)}>{s.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-foreground/60">
                    {s.chunkCount} chunk{s.chunkCount === 1 ? "" : "s"}
                    {s.errorMessage ? ` · ${s.errorMessage}` : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    disabled={busyId === s.id}
                    onClick={() => reindex(s.id)}
                  >
                    {busyId === s.id ? "…" : "Reindex"}
                  </Button>
                  <Button
                    variant="danger"
                    disabled={busyId === s.id}
                    onClick={() => remove(s.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
