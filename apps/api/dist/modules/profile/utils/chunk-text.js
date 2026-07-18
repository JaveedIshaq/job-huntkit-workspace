"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkText = chunkText;
const MAX_CHARS = 2000;
const OVERLAP_CHARS = 320;
function chunkText(raw) {
    const sections = raw
        .split(/\n(?=##\s)/g)
        .map((s) => s.trim())
        .filter(Boolean);
    const parts = sections.length ? sections : [raw.trim()];
    const pieces = [];
    for (const part of parts) {
        if (part.length <= MAX_CHARS) {
            pieces.push(part);
            continue;
        }
        let start = 0;
        while (start < part.length) {
            const end = Math.min(start + MAX_CHARS, part.length);
            pieces.push(part.slice(start, end).trim());
            if (end === part.length)
                break;
            start = end - OVERLAP_CHARS;
        }
    }
    return pieces.filter(Boolean).map((content, index) => ({ index, content }));
}
//# sourceMappingURL=chunk-text.js.map