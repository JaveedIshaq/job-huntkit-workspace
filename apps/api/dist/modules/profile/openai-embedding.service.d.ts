export declare class OpenAiEmbeddingService {
    private readonly client;
    constructor();
    embedBatch(texts: string[]): Promise<number[][]>;
}
