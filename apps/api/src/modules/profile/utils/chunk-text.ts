export type Chunk = { index: number; content: string };

// Rough rule of thumb: 1 token ≈ 4 characters.
const MAX_CHARS = 2000; // ~500 tokens per chunk
const OVERLAP_CHARS = 320; // ~80 tokens repeated between neighbours

export function chunkText(raw: string): Chunk[] {
  // 1. Prefer splitting on markdown H2 headings ("## ...").
  const sections = raw
    .split(/\n(?=##\s)/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const parts = sections.length ? sections : [raw.trim()];

  // 2. Any section longer than MAX_CHARS is sliced with overlap.
  const pieces: string[] = [];
  for (const part of parts) {
    if (part.length <= MAX_CHARS) {
      pieces.push(part);
      continue;
    }
    let start = 0;
    while (start < part.length) {
      const end = Math.min(start + MAX_CHARS, part.length);
      pieces.push(part.slice(start, end).trim());
      if (end === part.length) break;
      start = end - OVERLAP_CHARS; // step back to create overlap
    }
  }

  return pieces.filter(Boolean).map((content, index) => ({ index, content }));
}
