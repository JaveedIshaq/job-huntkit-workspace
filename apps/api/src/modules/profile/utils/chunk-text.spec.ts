import { chunkText } from './chunk-text';

describe('chunkText', () => {
  it('splits on ## headings', () => {
    const md = '## Experience\nBuilt NestJS APIs.\n\n## Projects\nHuntKit.';
    const chunks = chunkText(md);
    expect(chunks).toHaveLength(2);
    expect(chunks[0].index).toBe(0);
    expect(chunks[0].content).toContain('Experience');
  });

  it('returns one chunk when there are no headings', () => {
    expect(chunkText('Just a plain paragraph.')).toHaveLength(1);
  });
});
