"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiChatService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = __importDefault(require("openai"));
const CHAT_MODEL = 'gpt-4o-mini';
let OpenAiChatService = class OpenAiChatService {
    client;
    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey)
            throw new Error('OPENAI_API_KEY is not set');
        this.client = new openai_1.default({ apiKey });
    }
    async completeJson(system, user) {
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
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(`Chat completion failed: ${String(err)}`);
        }
    }
};
exports.OpenAiChatService = OpenAiChatService;
exports.OpenAiChatService = OpenAiChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OpenAiChatService);
//# sourceMappingURL=openai-chat.service.js.map