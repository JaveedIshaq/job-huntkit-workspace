"use client";

import { useState, type FormEvent } from "react";
import { apiFetch, ApiError } from "@/lib/api";
import type { Source } from "@/lib/types";
import { Button, ErrorText, Field, Input, Select, Textarea } from "./ui";

const SOURCE_TYPES = ["resume", "project", "notes"] as const;

export function AddSourceForm({ onAdded }: { onAdded?: (s: Source) => void }) {
  const [sourceType, setSourceType] =
    useState<(typeof SOURCE_TYPES)[number]>("resume");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // API chunks + embeds synchronously, then returns the ready source.
      const { source } = await apiFetch<{ source: Source }>(
        "/profile/sources",
        {
          method: "POST",
          body: JSON.stringify({ sourceType, title, content }),
        },
      );
      setTitle("");
      setContent("");
      onAdded?.(source);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to add source");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
        <Field label="Type">
          <Select
            value={sourceType}
            onChange={(e) =>
              setSourceType(e.target.value as (typeof SOURCE_TYPES)[number])
            }
          >
            {SOURCE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Title">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Senior Engineer Resume"
            required
          />
        </Field>
      </div>
      <Field label="Content">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          placeholder="Paste your resume or project write-up here…"
          required
        />
      </Field>
      <ErrorText>{error}</ErrorText>
      <Button type="submit" disabled={loading} className="self-start">
        {loading ? "Embedding…" : "Add & embed source"}
      </Button>
    </form>
  );
}
