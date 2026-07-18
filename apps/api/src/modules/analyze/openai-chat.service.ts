import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

const CHAT_MODEL = 'gpt-4o-mini';

export type ChatResult = {
  content: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
};

@Injectable()
export class OpenAiChatService {
  private readonly client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is not set');
    this.client = new OpenAI({ apiKey });
  }

  async completeJson(system: string, user: string): Promise<ChatResult> {
    try {
      const res = await this.client.chat.completions.create({
        model: CHAT_MODEL,
        response_format: { type: 'json_object' },
        temperature: 0.2,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      });

      return {
        content: res.choices[0]?.message?.content ?? '{}',
        model: res.model,
        usage: {
          promptTokens: res.usage?.prompt_tokens ?? 0,
          completionTokens: res.usage?.completion_tokens ?? 0,
          totalTokens: res.usage?.total_tokens ?? 0,
        },
      };
    } catch (err) {
      throw new InternalServerErrorException(
        `Chat completion failed: ${String(err)}`,
      );
    }
  }
}
