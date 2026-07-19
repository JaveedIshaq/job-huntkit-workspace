"use client";

import { useState } from "react";
import { Button } from "./ui";

export function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard blocked (e.g. insecure context) — ignore
    }
  }

  return (
    <Button variant="secondary" onClick={copy} className="shrink-0 px-3 py-1">
      {copied ? "Copied ✓" : label}
    </Button>
  );
}
