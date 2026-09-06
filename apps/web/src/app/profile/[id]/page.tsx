"use client";

import { use, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRequireAuth } from "@/lib/auth";
import { apiFetch, ApiError } from "@/lib/api";
import type { Source } from "@/lib/types";
import {
  Badge,
  Button,
  Card,
  ErrorText,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/ui";

function statusTone(status: string) {
  if (status === "ready") return "green" as const;
  if (status === "processing") return "amber" as const;
  if (status === "failed") return "red" as const;
  return "neutral" as const;
}

export default function ProfileSourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { loading: authLoading } = useRequireAuth();
  const [source, setSource] = useState<Source | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [sourceType, setSourceType] = useState("resume");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (authLoading) return;
    let active = true;
    void (async () => {
      try {
        const { source: s } = await apiFetch<{ source: Source }>(
          `/profile/sources/${id}`,
        );
        if (!active) return;
        setSource(s);
        setTitle(s.title);
        setSourceType(s.sourceType);
        setContent(s.content ?? "");
      } catch (err) {
        if (active) {
          setError(
            err instanceof ApiError ? err.message : "Failed to load source",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [authLoading, id]);

  function startEdit() {
    if (!source) return;
    setTitle(source.title);
    setSourceType(source.sourceType);
    setContent(source.content ?? "");
    setError("");
    setEditing(true);
  }

  function cancelEdit() {
    if (!source) return;
    setTitle(source.title);
    setSourceType(source.sourceType);
    setContent(source.content ?? "");
    setError("");
    setEditing(false);
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const { source: updated } = await apiFetch<{ source: Source }>(
        `/profile/sources/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ title, sourceType, content }),
        },
      );
      setSource(updated);
      setTitle(updated.title);
      setSourceType(updated.sourceType);
      setContent(updated.content ?? "");
      setEditing(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (authLoading || loading) {
    return <p className="text-muted-foreground">Loading…</p>;
  }

  if (!source) {
    return (
      <div className="flex flex-col gap-4">
        <ErrorText>{error || "Source not found"}</ErrorText>
        <Link href="/profile">
          <Button variant="secondary" type="button">
            ← Back to profile
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href="/profile"
            className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
          >
            ← Profile sources
          </Link>
          {!editing ? (
            <>
              <h1 className="mt-2 text-2xl font-semibold">{source.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge tone="blue">{source.sourceType}</Badge>
                <Badge tone={statusTone(source.status)}>{source.status}</Badge>
                <span className="text-sm text-muted-foreground">
                  {source.chunkCount} chunk
                  {source.chunkCount === 1 ? "" : "s"}
                </span>
              </div>
              {source.errorMessage && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {source.errorMessage}
                </p>
              )}
            </>
          ) : (
            <h1 className="mt-2 text-2xl font-semibold">Edit source</h1>
          )}
        </div>
        <div className="flex gap-2">
          {!editing ? (
            <Button variant="secondary" type="button" onClick={startEdit}>
              Edit
            </Button>
          ) : null}
          <Link href="/profile">
            <Button variant="secondary" type="button">
              Back
            </Button>
          </Link>
        </div>
      </div>

      <ErrorText>{error}</ErrorText>

      {editing ? (
        <Card>
          <form onSubmit={onSave} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Type">
                <Select
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value)}
                  disabled={saving}
                >
                  <option value="resume">resume</option>
                  <option value="project">project</option>
                  <option value="notes">notes</option>
                </Select>
              </Field>
              <Field label="Title">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={saving}
                />
              </Field>
            </div>
            <Field label="Content">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={18}
                required
                disabled={saving}
                className="min-h-[50vh] font-mono text-xs leading-relaxed"
              />
            </Field>
            <p className="text-xs text-foreground/50">
              Saving content re-chunks and re-embeds this source (uses OpenAI).
            </p>
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving & embedding…" : "Save"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={saving}
                onClick={cancelEdit}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground/50">
            Source content
          </h2>
          <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap wrap-break-word font-sans text-sm leading-relaxed text-foreground/90">
            {source.content?.trim() ? source.content : "(empty)"}
          </pre>
        </Card>
      )}
    </div>
  );
}
