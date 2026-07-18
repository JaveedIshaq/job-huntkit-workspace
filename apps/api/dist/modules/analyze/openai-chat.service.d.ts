export type ChatResult = {
    content: string;
    model: string;
    usage: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
};
export declare class OpenAiChatService {
    private readonly client;
    constructor();
    completeJson(system: string, user: string): Promise<ChatResult>;
}
