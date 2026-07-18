export type Chunk = {
    index: number;
    content: string;
};
export declare function chunkText(raw: string): Chunk[];
